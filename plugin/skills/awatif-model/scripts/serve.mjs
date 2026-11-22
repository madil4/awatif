#!/usr/bin/env node
// Serves a model as the live Awatif app. The interface is the awatif-ui design
// system (skills/awatif-ui: StructViewer components, AwatifUI helpers and the
// three.js AwatifViewer); Awatif is only the engine (`createEngine`, which runs
// the mesh -> solve -> design pipeline in the browser). Awatif's own UI
// (`@awatif/ui`, `createApp`) is never loaded. Every edit (box-selecting
// geometry for an entry, moving or drawing points and lines, changing a
// parameter) re-runs the analysis. Saving model.ts reloads the app.
//
// Usage: node serve.mjs <path/to/model.ts> [--export <name>] [--port <n>] [--open]
//
// Edits made in the app are saved to `model.live.json` next to the model, in
// the AppConfig shape of model.ts, so they can be folded back into it. They do
// not overwrite model.ts.
import { existsSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

const { createServer } = await import("vite").catch((e) => {
  // Print the cause: a "native binding" error means node_modules was installed
  // on another OS (e.g. Windows) than the one running this script (e.g. WSL)
  console.error(`Cannot load vite: ${e.message}`);
  console.error(`Run \`npm install\` in ${pluginRoot} on the OS that runs this script.`);
  process.exit(2);
});
// The viewer is three.js (awatif-ui's AwatifViewer) and the UI is React; both are required
for (const dep of ["three", "react", "react-dom"])
  await import(dep).catch((e) => {
    console.error(`${dep} is required for the live app: ${e.message}`);
    console.error(`Run \`npm install\` in ${pluginRoot} on the OS that runs this script.`);
    process.exit(2);
  });

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? false : (args.splice(i, 1), true);
};
const option = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args.splice(i, 2)[1];
};
const open = flag("--open");
const exportName = option("--export");
const port = Number(option("--port") ?? 5173);
const modelPath = args[0] && resolve(args[0]);
if (!modelPath || !existsSync(modelPath)) {
  console.error("Usage: node serve.mjs <model.ts> [--export <name>] [--port <n>] [--open]");
  process.exit(2);
}
const livePath = join(dirname(modelPath), "model.live.json");
const modelName =
  exportName ?? (basename(modelPath).replace(/\.[^.]+$/, "") === "model" ? basename(dirname(modelPath)) : basename(modelPath).replace(/\.[^.]+$/, ""));

const toUrl = (path) => path.replaceAll("\\", "/");
// Served from the plugin root (Vite's root)
const APP_ENTRY = "/skills/awatif-model/scripts/app/app.js";
const CONFIG = "virtual:awatif-app-config";

const html = `<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Awatif</title>
    <style>
      html, body, #root { height: 100%; margin: 0; }
      body { background: var(--surface-canvas); color: var(--ink); font-family: var(--font-sans); }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import(${JSON.stringify(APP_ENTRY)}).catch((e) => {
        const p = document.createElement("p");
        p.className = "ui";
        p.style.cssText = "margin: 0; padding: var(--space-4, 16px);";
        p.textContent = "The app failed to load: " + e.message + ". The terminal running serve.mjs has the details.";
        document.getElementById("root").replaceChildren(p);
      });
    </script>
  </body>
</html>`;

// What the app needs to know about the model it serves
const configModule = `
export * as modelModule from ${JSON.stringify(toUrl(modelPath))};
export const exportName = ${JSON.stringify(exportName ?? null)};
export const modelName = ${JSON.stringify(modelName)};
`;

// The interface is awatif-ui only: awatif's bundled UI must never reach the
// browser. Type-only imports of it (`import type`) are erased before
// resolution, so they pass. Runs on the app's modules and on pre-bundled deps.
const isAwatifUi = (source) =>
  source === "@awatif/ui" ||
  source.startsWith("@awatif/ui/") ||
  source === "awatif/templates" ||
  /(^|\/)awatif\/templates\/(createApp|index)(\.ts)?$/.test(source) ||
  /\/awatif\/ui\//.test(toUrl(source));
const uiGuard = {
  name: "awatif-ui-guard",
  resolveId(source, importer) {
    if (isAwatifUi(source))
      throw new Error(
        `${importer ?? "The app"} imports awatif's UI (${source}). The live app uses the awatif-ui viewer and components; import awatif for analysis only (createEngine, @awatif/components), and import its types with \`import type\`.`,
      );
  },
};

const awatifApp = {
  name: "awatif-app",
  enforce: "pre",
  async resolveId(source, importer, options) {
    if (source === CONFIG) return "\0" + CONFIG;
    uiGuard.resolveId(source, importer);
    // The model lives in the user's project, which has no node_modules of its own:
    // resolve its bare imports (awatif, vanjs-core, ...) from the plugin
    const bare = !/^([./\\]|\0|[a-zA-Z]:|\/)/.test(source) && !source.startsWith("virtual:");
    if (
      bare &&
      importer &&
      !importer.startsWith("\0") &&
      !toUrl(importer).startsWith(toUrl(pluginRoot))
    )
      return this.resolve(source, join(pluginRoot, "package.json"), { ...options, skipSelf: true });
  },
  load(id) {
    if (id === "\0" + CONFIG) return configModule;
  },
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url?.split("?")[0];
      if (req.method === "POST" && url === "/__awatif/live") {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        writeFileSync(livePath, JSON.stringify(JSON.parse(Buffer.concat(chunks).toString()), null, 2));
        res.statusCode = 204;
        return res.end();
      }
      if (url === "/" || url === "/index.html") {
        res.setHeader("Content-Type", "text/html");
        return res.end(await server.transformIndexHtml(req.url, html));
      }
      next();
    });
    // Reload when the model changes, even though it sits outside the plugin root
    server.watcher.add(modelPath);
  },
};

const server = await createServer({
  root: pluginRoot,
  configFile: join(pluginRoot, "vite.config.mjs"),
  logLevel: "error",
  plugins: [awatifApp],
  // Scan only the app (the plugin root holds other HTML files), and pre-bundle
  // React, which ships as CommonJS
  optimizeDeps: {
    entries: [APP_ENTRY.slice(1)],
    include: ["react", "react-dom", "react-dom/client"],
    rolldownOptions: { plugins: [uiGuard] },
  },
  server: { port, strictPort: false, open, fs: { allow: [pluginRoot, dirname(modelPath)] } },
});
await server.listen();
const [url] = server.resolvedUrls.local;
console.log(`Awatif app for ${modelPath}\n  ${url}\nEdits in the app are saved to ${livePath}\nPress Ctrl+C to stop.`);
