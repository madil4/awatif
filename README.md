# Awatif

The open-source 3D frame analysis toolset, in the browser — model, solve, and report.

AI-native, MIT-licensed, and no install required. Try it at [awatif.co/app](https://awatif.co/app/).

## Status

Awatif 3.4 is a **linear static 3D frame** tool:

- 3D frames of two-node beam elements with six DOF per node, end moment releases, local axes, and line meshing.
- Point and distributed loads in dead, live, and wind load cases, with ULS combinations; fixed, pinned, and roller point supports; initial imperfections.
- Generic sections (E, A, I<sub>y</sub>, I<sub>z</sub>, G, J) with a per-member report of the section properties.
- A C++/WASM linear solver drives the app; a TypeScript solver with the same results serves as a readable reference.

Shell elements, nonlinear analysis, and Eurocode member checks are no longer part of the open-source library. Second-order frame and shell analysis is available as a licensed solver, below.

## What's inside

- **`components/`** — the engineering core: `analysis` (C++/WASM linear solver and its TypeScript reference), `design` (generic section properties plus report generation), `mesh`, `loads`, `supports`, `releases`, `local-axes`, and `imperfections`.
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

- **[Solver APIs](https://awatif.co/api/)** (€499 per solver, perpetual licence) — let AI build the tool your workflow needs, and run a validated solver behind it, with C++, Python, JS, and C# APIs. Every solver ships with its paper, benchmarks, and a browser demo.
  - **[3D analysis](https://awatif.co/api/buckling/)** — second-order 3D frame and shell analysis, benchmarked against Abaqus: the work you do today in SAP2000 or ETABS.
  - **[2D excavation](https://awatif.co/api/soil/)** — staged excavation with retaining walls, struts, and groundwater, cross-validated against OpenGeoSys: the work you do today in PLAXIS.
  - **Eurocode design** — coming soon: EC2, EC3, and EC5 member checks with national annexes and a calculation report.
- **[Course — Become an Agentic Structural Engineer](https://awatif.co/course/)** (€399) — in four weeks, turn one repetitive workflow from your own projects into an AI agent, with two private reviews.

Not sure which fits? [Book a call](https://awatif.co/30min-with-mo).

Prefer a direct message? Find me on [LinkedIn](https://www.linkedin.com/in/madil4/).

## Contributing

- Keep it simple. Focus on core features and a minimum viable product — the system is already complex.
- Use types. Functions should fully describe inputs and outputs.
- Avoid global state. If unavoidable, use reactive objects with the signal approach.

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting (default settings) and the [lit-html extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) for HTML string highlighting.

## License

MIT © Mohamed Adil
