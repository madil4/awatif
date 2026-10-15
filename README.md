# Awatif

The open-source harness for agentic structural engineering.

Model, solve, and report 3D frames in the browser. MIT-licensed, no install required. Try it at [awatif.co/app](https://awatif.co/app/).

**Want an AI agent for your own workflow?** In the four-week course [Become an Agentic Structural Engineer](https://awatif.co/course/) you build one, on a repetitive workflow from your own projects. [More below](#learn-to-build-your-own-agent).

## Status

Awatif 3.4 is a **linear static 3D frame** tool:

- 3D frames of two-node beam elements with six DOF per node, end moment releases, local axes, and line meshing.
- Point and distributed loads in dead, live, and wind load cases, with ULS combinations; fixed, pinned, and roller point supports; initial imperfections.
- Generic sections (E, A, I<sub>y</sub>, I<sub>z</sub>, G, J) with a per-member report of the section properties.
- A C++/WASM linear solver drives the app; a TypeScript solver with the same results serves as a readable reference.

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

## Learn to build your own agent

**[Become an Agentic Structural Engineer](https://awatif.co/course/)** (€399): in four weeks you take one repetitive workflow from your own projects and turn it into an AI agent that designs, reviews, or optimizes it. Every engineering decision stays yours.

- Four live Saturday sessions, 16:00–18:00 Amsterdam time, all recorded. A new small-group cohort starts every month.
- Two private 30-minute reviews of your project.
- The target is one run of your workflow in at least 30% less time than it takes you today.

See what that looks like: [an agent designs a timber roof](https://awatif.co/examples/agentic/), from IFC to report and drawings.

Questions? [Book a call](https://awatif.co/30min-with-mo) or message me on [LinkedIn](https://www.linkedin.com/in/madil4/).

## Contributing

- Keep it simple. Focus on core features and a minimum viable product — the system is already complex.
- Use types. Functions should fully describe inputs and outputs.
- Avoid global state. If unavoidable, use reactive objects with the signal approach.

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting (default settings) and the [lit-html extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) for HTML string highlighting.

## License

MIT © Mohamed Adil
