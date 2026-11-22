---
type: llm
focus: {source: file, path: models/braced-frame/model.ts}
---
Judge the X-bracing geometry in the model. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- There are exactly 4 diagonal lines, all in the first bay (x = 0 to 5). In each of the 2 storeys there is one from bottom-left to top-right and one from bottom-right to top-left, so they cross as an X. The second bay (x = 5 to 10) has no diagonals.
- The 4 diagonals are connected to the frame at the corner points of their bay.
