---
type: llm
focus: {source: file, path: models/braced-frame/model.ts}
---
Judge the end connections of the 4 diagonal braces. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- A releases entry with type both-ends is assigned to exactly the 4 diagonal lines, so the braces are pin-ended.
- The columns and beams have no releases.
