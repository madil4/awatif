---
type: llm
focus: {source: file, path: models/hibbler-frame/model.ts}
---
Judge the supports against the Hibbler frame drawing. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- A (the wall at x = 0, z = 4.877) has a fixed support.
- The column bases E (3.658, 0, 0) and D (8.534, 0, 0) have supports that are pinned or fixed.
- No other point has a support. In particular B, C and the load point are free.
