---
type: llm
focus: {source: file, path: models/hibbler-frame/model.ts}
---
Judge the geometry against the Hibbler frame drawing: a beam A-B-C in the XZ plane (y = 0) at 16 ft, cantilevered from a wall at A, carried by two 16 ft columns at B (12 ft from A) and C (28 ft from A), with a 10 k load 8 ft left of C. Lengths are converted from feet to metres (1 ft = 0.3048 m). The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- It has exactly 6 points: A (0, 0, 4.877), B (3.658, 0, 4.877), the load point (6.096, 0, 4.877), C (8.534, 0, 4.877), E (3.658, 0, 0) and D (8.534, 0, 0).
- It has exactly 5 lines: the beam in 3 segments (A to B, B to load point, load point to C) and 2 vertical columns (E to B and D to C).
- Dimensions are in metres. No coordinate is left in feet.
