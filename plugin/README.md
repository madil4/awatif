# awatif-plugin

Claude Code (and Codex) plugin for Awatif structural analysis.

## Install

On Claude Code 2.1.275 or later, install in one step from the marketplace:

```
/plugin install awatif-structural --marketplace kaison428/awatif-plugin
```

The scripts need the plugin's own dependencies: run `npm install` in the plugin root once.

## Skills

| Skill | Use it for |
| --- | --- |
| `awatif-model` | Building a structural model, running the analysis and launching it as a live app. |
| `awatif-ui` | The design system (tokens, React components, three.js viewer) that the live app and any custom viewer are built with. |

Awatif itself is only the analysis engine (`createEngine`). Its bundled UI (`createApp`, `@awatif/ui`) is never used.

## What `awatif-model` produces

For a request like "model a 6 m portal frame", the skill creates one folder per model:

```
models/<model-name>/
  model.ts         written by Claude: exports the AppConfig; the source of truth
  model.live.json  written by the live app: the model as edited in the browser
```

and hands over a URL to the live app. Nothing else is written (no `models/index.ts`, no static images or HTML).

1. **Author** `model.ts` (see `skills/awatif-model/references/data-model.md`).
2. **Check** it headlessly. Runs every load case and combination and prints a summary:
   ```
   node skills/awatif-model/scripts/analyze.mjs models/<name>/model.ts [--export <name>]
   ```
3. **Launch** the live app, the deliverable:
   ```
   node skills/awatif-model/scripts/serve.mjs models/<name>/model.ts [--port <n>] [--open] [--export <name>]
   ```
   Box-select nodes and members for loads and supports, draw and move geometry, edit parameters in the inspector; the analysis re-runs on every change and reactions, displacements, line forces and design utilization show in the results drawer, and the Display panel draws internal force diagrams (N, V, M) on the members. Edits are autosaved to `model.live.json`; `model.ts` is never overwritten, and saving `model.ts` reloads the app from it (discarding in-app edits).

## Layout

- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`: Claude Code manifest and marketplace
- `.codex-plugin/plugin.json`: Codex manifest (keep its version in step with the Claude one)
- `skills/awatif-model/`: `SKILL.md`, `references/` (data model, engine), `scripts/` (`analyze.mjs`, `serve.mjs`, `engine.ts`, the live app in `app/`), `assets/templates/` (example models)
- `skills/awatif-ui/`: design system (`assets/`, `references/`, `scripts/scaffold.py`)
- `evals/`: plugin eval cases (`prompt.md` + `graders/`, image cases add `case.yaml`, `fixture.sh`, `resources/`)
- `scripts/`: eval helpers (below)
- `agents/`, `commands/`: placeholder examples only; `hooks/hooks.json` is empty

`skills/awatif-model/references/data-model.md` and `skills/awatif-ui/references/awatif-data-model.md` are the same file, so each skill is self-contained. Edit both together.

## Dev

```
claude --plugin-dir .
```

## Evals

Each case in `evals/` checks the files above (`model.ts`) and the final reply; the negative cases check that no `models/` folder is created.

Run evals on Linux or macOS. On Windows, run them in WSL, since the shell sandbox needs Linux.

```
npm run eval           # run every case
npm run eval:collect   # copy the kept sandbox dirs into evals/results/<timestamp>/runs
npm run eval:inspect   # browse collected runs
```

`node_modules` holds native binaries for the OS that installed it (Vite's Rolldown, lightningcss). On Windows, install it from WSL and never from PowerShell or cmd in the same folder. Otherwise the sandbox can't load Vite and the analysis fails. If that happens, delete `node_modules` and run `npm install` again from WSL. For speed, clone the repo inside the WSL filesystem (e.g. `~/code/awatif-plugin`) rather than under `/mnt/c`.
