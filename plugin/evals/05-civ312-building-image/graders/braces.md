---
type: llm
focus: {source: file, path: models/civ312-building/model.ts}
---
Judge the bracing geometry. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- Chevron (V-shaped) braces are on row D (y = 0) between lines 2 and 4 (x = 7 to 21), in every one of the 4 storeys, meeting at line 3 (x = 14). That is at least 8 brace lines. Braces on row A (y = 21) are also acceptable, since the plan shows bold lines there, but they are not required.
- Each brace line joins two active grid points at different levels.
