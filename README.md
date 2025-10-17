## Awatif

We are preparing for Awatif v3.0, which will be a complete rewrite of the codebase. No libraries have been removed.

For the latest stable v2 release, see:
https://github.com/madil4/awatif/tree/v2.0.0

## Getting Started

Requirements: Node.js 22+

```bash
git clone https://github.com/madil4/awatif.git
cd awatif
npm install
npm run dev -w examples
```

## Coding Style

- Keep it simple. Focus on core features and minimum viable product. The system is already complex—avoid adding more.
- Use types. Functions should fully describe inputs and outputs.
- Avoid global state. If unavoidable, use reactive objects with the signal approach.

## Code Formatting

Install the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for automatic code formatting with default settings.
