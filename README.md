# Awatif

Awatif is an AI-native platform for building structural engineering automation tools.

It combines super-fast FEM, AI-assisted modeling, design checks, reports, and drawings into simple web-based tools that help engineers automate the work they repeat every week.

Awatif is the foundation behind my work helping structural engineering firms turn manual calculations, reports, model checks, and BIM workflows into practical internal tools.

## Examples

Awatif can be used to build tools such as:

- IFC to analytical model
- Sketch to analytical model
- Beam, frame, and column design tools
- Automated design checks
- Calculation report generators
- Drawing and documentation tools
- BIM, Excel, PDF, and calculation workflows connected in one place

## Quick Start

**Work with me** — I help small structural engineering firms automate repetitive engineering tasks using Awatif: calculations, reports, internal tools, model checks, BIM workflows, and training. DM me on [LinkedIn](https://www.linkedin.com/in/madil4/) to discuss your automation project.

**Join a workshop** — I run workshops for engineers who want to learn how to build their own structural engineering automation tools. DM me on [LinkedIn](https://www.linkedin.com/in/madil4/) to join the next one.

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
