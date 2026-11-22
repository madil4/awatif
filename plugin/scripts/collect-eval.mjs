// Copies the kept eval temp dirs (from --keep-temp) into the results folder, so they live in this repo.
// Usage: node scripts/collect-eval.mjs [result-dir-name]   (default: the latest evals/results/<timestamp>)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resultsDir = path.join(root, "evals", "results");

const name =
  process.argv[2] ??
  fs
    .readdirSync(resultsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .at(-1);
if (!name) throw new Error(`No results found in ${resultsDir}`);

const resultDir = path.join(resultsDir, name);
const aggregate = JSON.parse(
  fs.readFileSync(path.join(resultDir, "aggregate-result.json"), "utf8"),
);

const skip = new Set([".git", "node_modules"]);
const copy = (from, to) => {
  if (!fs.existsSync(from)) return false;
  fs.cpSync(from, to, {
    recursive: true,
    filter: (src) => !skip.has(path.basename(src)),
  });
  return true;
};

let copied = 0;
let missing = 0;
for (const c of aggregate.cases) {
  for (const [arm, runs] of Object.entries(c.arms)) {
    runs.forEach((run, i) => {
      const label = `${c.name}/${arm}-${i + 1}`;
      // tracePath is <temp>/claude-eval-XXXX/out/trace.jsonl
      const temp = run.tracePath && path.dirname(path.dirname(run.tracePath));
      if (!temp || !fs.existsSync(temp)) {
        console.warn(`skip  ${label}: temp dir gone (was --keep-temp passed?)`);
        missing++;
        return;
      }
      const dest = path.join(resultDir, "runs", c.name, `${arm}-${i + 1}`);
      fs.rmSync(dest, { recursive: true, force: true });
      // Newer Claude Code moves home/ and tmp/ into a mode-000 sealed/ dir after the run.
      const sealed = path.join(temp, "sealed");
      let base = temp;
      if (fs.existsSync(sealed)) {
        fs.chmodSync(sealed, 0o500);
        base = sealed;
      }
      copy(path.join(base, "home", "cwd"), path.join(dest, "cwd"));
      copy(path.join(temp, "out"), path.join(dest, "out"));
      copy(path.join(base, "tmp"), path.join(dest, "tmp"));
      console.log(`copy  ${label}`);
      copied++;
    });
  }
}

console.log(
  `\n${copied} run(s) copied to ${path.relative(root, path.join(resultDir, "runs"))}, ${missing} skipped`,
);
