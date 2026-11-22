#!/usr/bin/env node
// Runs a model through the Awatif engine for every load case and load
// combination and prints a summary.
//
// Usage: node analyze.mjs <path/to/model.ts> [--export <name>]
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

// Vite and awatif come from the plugin's own dependencies
const { runnerImport } = await import("vite").catch((e) => {
  // Print the cause: a "native binding" error means node_modules was installed
  // on another OS (e.g. Windows) than the one running this script (e.g. WSL)
  console.error(`Cannot load vite: ${e.message}`);
  console.error(`Run \`npm install\` in ${pluginRoot} on the OS that runs this script.`);
  process.exit(2);
});

const args = process.argv.slice(2);
const option = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? undefined : args.splice(i, 2)[1];
};
const exportName = option("--export");
const modelPath = args[0] && resolve(args[0]);
if (!modelPath) {
  console.error("Usage: node analyze.mjs <model.ts> [--export <name>]");
  process.exit(2);
}

// Under Node, Vite's `?url` imports (the Triangle mesher's wasm) are root-relative
// paths, so fetch serves them from disk
const nodeFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const file = typeof input === "string" && input.startsWith("/") && join(pluginRoot, input);
  if (file && existsSync(file))
    return Promise.resolve(
      new Response(readFileSync(file), { headers: { "Content-Type": "application/wasm" } }),
    );
  return nodeFetch(input, init);
};

const viteConfig = { root: pluginRoot, configFile: false, logLevel: "error" };
const { module: engineModule } = await runnerImport(
  join(pluginRoot, "skills/awatif-model/scripts/engine.ts"),
  viteConfig,
);
const { module: modelModule } = await runnerImport(modelPath, viteConfig);

const config = pickConfig(modelModule, exportName);
const engine = await engineModule.createEngine(config);

// Every load case and combination by name; a model without either still runs
// once with every load applied
const loadNames = [
  ...(config.loadCases ?? []),
  ...(config.loadCombinations ?? []).map((c) => c.name),
];
const runs = [];
for (const name of loadNames.length ? loadNames : [null]) {
  const current = engine.getAll();
  const results = current.activeLoad === name ? current : await setAndWait(engine, name);
  runs.push(summarize(results, config));
}

print(runs);
process.exit(runs.every((r) => r.status.success) ? 0 : 1);

function setAndWait(engine, name) {
  const next = engine.next();
  engine.setActiveLoad(name);
  return next;
}

function pickConfig(module, name) {
  if (name) {
    if (!(name in module)) throw new Error(`"${name}" is not exported by ${modelPath}`);
    return module[name];
  }
  if (module.default) return module.default;
  const configs = Object.values(module).filter(
    (v) => v && typeof v === "object" && ("points" in v || "lines" in v),
  );
  if (configs.length !== 1)
    throw new Error(
      `Expected one exported AppConfig in ${modelPath}, found ${configs.length}; pass --export <name>`,
    );
  return configs[0];
}

// Results per authored point and line, in the model's own ids
function summarize(results, config) {
  const { pointToNodes, lineToElements } = results.geometryMapping;
  const supported = new Set(
    (config.supports ?? []).flatMap((s) => s.geometry),
  );

  const displacements = [];
  pointToNodes.forEach((nodes, pointId) => {
    const node = nodes[0];
    const d = results.displacements.slice(node * 3, node * 3 + 3);
    if (d.length === 3) displacements.push({ point: pointId, ux: d[0], uy: d[1], uz: d[2] });
  });

  const reactions = [];
  pointToNodes.forEach((nodes, pointId) => {
    if (!supported.has(pointId)) return;
    const r = results.reactions[nodes[0]];
    if (!r) return;
    const [Fx, Fy, Fz, Mx, My, Mz] = r;
    reactions.push({ point: pointId, Fx, Fy, Fz, Mx, My, Mz });
  });

  const lines = [];
  lineToElements.forEach((elements, lineId) => {
    const forces = elements.map((e) => results.internalForces.get(e)).filter(Boolean);
    if (!forces.length) return;
    const envelope = {};
    for (const key of ["N", "Vy", "Vz", "Mx", "My", "Mz"]) {
      const values = forces.flatMap((f) => f[key]);
      envelope[key] = { min: Math.min(...values), max: Math.max(...values) };
    }
    lines.push({ line: lineId, ...envelope });
  });

  const designs = [];
  results.designs.forEach((design, lineId) => designs.push({ line: lineId, ...design }));

  // Over every mesh node, since peaks fall between authored points
  const maxDisplacement = { position: null, u: 0 };
  results.nodes.forEach((position, node) => {
    const [ux, uy, uz] = results.displacements.slice(node * 3, node * 3 + 3);
    const u = Math.hypot(ux, uy, uz);
    if (u > maxDisplacement.u) Object.assign(maxDisplacement, { position, u, ux, uy, uz });
  });

  return {
    load: results.activeLoad,
    analysis: results.analysis,
    status: results.status,
    maxDisplacement,
    reactions,
    displacements,
    lines,
    designs,
  };
}

function print(runs) {
  const f = (n) => (Math.abs(n) < 1e-9 ? 0 : n).toFixed(3);
  for (const run of runs) {
    const label = run.load ?? "All loads";
    if (!run.status.success) {
      console.log(`\n## ${label}: FAILED - ${run.status.error}`);
      continue;
    }
    console.log(`\n## ${label} (${run.analysis})`);
    if (run.status.unassignedLines?.length)
      console.log(`Warning: lines without a design entry: ${run.status.unassignedLines.join(", ")}`);
    const m = run.maxDisplacement;
    console.log(
      m.position === null
        ? "Max displacement: 0 mm"
        : `Max displacement: ${(m.u * 1000).toFixed(2)} mm at (${m.position.map((c) => c.toFixed(2)).join(", ")}) m`,
    );
    console.log("Reactions [kN, kNm]:");
    const sum = [0, 0, 0];
    for (const r of run.reactions) {
      console.log(
        `  Point ${r.point}: Fx ${f(r.Fx)}  Fy ${f(r.Fy)}  Fz ${f(r.Fz)}  Mx ${f(r.Mx)}  My ${f(r.My)}  Mz ${f(r.Mz)}`,
      );
      sum[0] += r.Fx;
      sum[1] += r.Fy;
      sum[2] += r.Fz;
    }
    console.log(`  Sum: Fx ${f(sum[0])}  Fy ${f(sum[1])}  Fz ${f(sum[2])}`);
    console.log("Line force envelopes [kN, kNm] (min / max):");
    for (const l of run.lines) {
      const cell = (k) => `${k} ${f(l[k].min)}/${f(l[k].max)}`;
      console.log(`  Line ${l.line}: ${["N", "Vz", "My", "Vy", "Mz", "Mx"].map(cell).join("  ")}`);
    }
  }
}
