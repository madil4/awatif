# Awatif

The open-source toolset for structural analysis and design — FEM, Eurocode checks, and reports, in the browser.

AI-native, MIT-licensed, and no install required: model frames and shells, solve, check, and generate reports in one place. Awatif is also the foundation behind the custom automation work at [awatif.co](https://awatif.co).

## What's inside

- **`components/`** — the engineering core: `analysis` (C++/WASM linear solver, remote nonlinear solver), `design` (Eurocode concrete, steel, timber, and shell checks plus report generation), `mesh`, `loads`, `supports`, `releases`, and `imperfections`.
- **`ui/`** — the interface: 3D viewer, canvas and canvas bar, layout, display controls, analysis status, and undo.
- **`main.ts`** — the app entry point that wires components and UI together.

## Quick start

Requires Node.js 22+.

```bash
git clone https://github.com/madil4/awatif.git
cd awatif
npm install
npm run dev
```

`npm test` runs the test suite, `npm run build` produces a production bundle.

## Work with me

I help structural engineering teams turn repetitive work — reports, model checks, BIM handovers, calculations — into internal tools. See [awatif.co](https://awatif.co) for dates and details.

- **Course — Agentic Structural Engineer** (€399) — turn your repetitive workflows into AI agents over four weeks. Monthly cohorts, with private reviews.
- **Workshop — Quick Start** (€50) — build your first structural engineering app in two hours. Live, no coding required.
- **Custom automation** (pilots from €2,000) — I build the tool your team runs on. [Book a call](https://awatif.co).

Prefer a direct message? Find me on [LinkedIn](https://www.linkedin.com/in/madil4/).

## Contributing

- Keep it simple. Focus on core features and a minimum viable product — the system is already complex.
- Use types. Functions should fully describe inputs and outputs.
- Avoid global state. If unavoidable, use reactive objects with the signal approach.

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting (default settings) and the [lit-html extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) for HTML string highlighting.

## License

MIT © Mohamed Adil
