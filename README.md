# Awatif

Awatif is a web-based tool for analyzing and designing frames, beams, and columns. It combines real-time results, AI-assisted modeling, nonlinear 2nd-order analysis, and transparent reports that show every code clause and formula so reviewers can sign off faster.

## Quick Start

**Hosted version** — skip the setup and start modeling at [app.awatif.co](https://app.awatif.co) ($25/mo). Includes AI-assisted modeling, transparent reports, and managed infrastructure.

**Self-hosted / development** — requires Node.js 22+:

```bash
git clone https://github.com/madil4/awatif.git
cd awatif
npm install
npm run dev
```

## Coding Style

- Keep it simple. Focus on core features and minimum viable product. The system is already complex.
- Use types. Functions should fully describe inputs and outputs.
- Avoid global state. If unavoidable, use reactive objects with the signal approach.

## Code Formatting

Install the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for automatic code formatting with default settings.

## Syntax Highlighting

For better syntax highlighting of HTML strings, we recommend the [lit-html VS Code extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html).
