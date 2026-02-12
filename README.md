# Awatif

Awatif is the first open-source structural analysis and design tool built for the modern web. It is super-fast, transparent, and effortlessly accessible. Whether designing individual members like columns and beams or analyzing complex 2D frames, Awatif delivers a clean user interface and comprehensive structural reports.

> **Note:** We are currently preparing for **Awatif v3.0**, which involves a complete rewrite of the codebase. No libraries have been removed.

For the latest stable v2 release, please see:
https://github.com/madil4/awatif/tree/v2.0.0

## Getting Started

Requirements: Node.js 22+

```bash
git clone https://github.com/madil4/awatif.git
cd awatif
npm install
npm run dev
```

## Coding Style

- Keep it simple. Focus on core features and minimum viable product. The system is already complex
- Use types. Functions should fully describe inputs and outputs.
- Avoid global state. If unavoidable, use reactive objects with the signal approach.

## Code Formatting

Install the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for automatic code formatting with default settings.

## Syntax Highlighting

For better syntax highlighting of HTML strings, we recommend the [lit-html VS Code extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html).
