// Eval inspector: serves collected eval runs (see collect-eval.mjs) with Vite and a small UI to browse them.
import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resultsDir = path.join(root, "evals", "results");

const rel = (p) => path.relative(root, p).split(path.sep).join("/");
const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
};

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.name !== "node_modules" && e.name !== ".git")
    .flatMap((e) =>
      e.isDirectory()
        ? listFiles(path.join(dir, e.name))
        : [path.join(dir, e.name)],
    );
}

function scan() {
  if (!fs.existsSync(resultsDir)) return { results: [] };
  const results = fs
    .readdirSync(resultsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .reverse()
    .flatMap((id) => {
      const dir = path.join(resultsDir, id);
      const aggregate = readJson(path.join(dir, "aggregate-result.json"));
      if (!aggregate) return [];
      const cases = aggregate.cases.map((c) => ({
        id: c.name,
        prompt: c.promptMarkdown,
        runs: Object.entries(c.arms).flatMap(([arm, runs]) =>
          runs.map((run, i) => {
            const runId = `${arm}-${i + 1}`;
            const runDir = path.join(dir, "runs", c.name, runId);
            const cwd = path.join(runDir, "cwd");
            const html = path.join(cwd, "platform.html");
            return {
              id: runId,
              score: run.score,
              passed: run.passed,
              error: run.error,
              graders: run.graders,
              collected: fs.existsSync(runDir),
              html: fs.existsSync(html) ? "/" + rel(html) : null,
              trace: fs.existsSync(path.join(runDir, "out", "trace.jsonl"))
                ? rel(path.join(runDir, "out", "trace.jsonl"))
                : null,
              files: listFiles(cwd).map(rel),
            };
          }),
        ),
      }));
      return [{ id, report: rel(path.join(dir, "report.html")), cases }];
    });
  return { results };
}

const server = await createServer({
  root,
  configFile: path.join(root, "vite.config.mjs"),
  server: { open: process.env.NO_OPEN ? false : "/scripts/inspect-eval.html" },
  plugins: [
    {
      name: "eval-inspector-api",
      configureServer(s) {
        s.middlewares.use("/api/runs", (_req, res) => {
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(scan()));
        });
        // Raw text of a file under /evals, for the source and trace panes
        s.middlewares.use("/api/file", (req, res) => {
          const p = new URL(req.url, "http://x").searchParams.get("p") ?? "";
          const full = path.resolve(root, p);
          if (
            !full.startsWith(path.join(root, "evals") + path.sep) ||
            !fs.existsSync(full)
          ) {
            res.statusCode = 404;
            return res.end("not found");
          }
          res.setHeader("content-type", "text/plain; charset=utf-8");
          res.end(fs.readFileSync(full, "utf8"));
        });
      },
    },
  ],
});
await server.listen();
server.printUrls();
