---
type: llm
focus: {source: file, path: models/civ312-building/model.ts}
---
Judge the plan and levels of the 3D building against the CIV312 drawings. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- It is genuinely 3D: points have distinct x, y and z values.
- Plan lines 1 to 5 are at x = 0, 7, 14, 21, 28. Rows D, C, B, A are at y = 0, 7, 14, 21, with A at the north (y = 21) and D at the south (y = 0).
- There are 4 storeys of 3.7 m, so levels are at z = 0, 3.7, 7.4, 11.1 and 14.8.
- Levels z = 0, 3.7 and 7.4 cover all 5 lines, 20 points each. Levels z = 11.1 and 14.8 cover lines 2 to 4 only (x = 7 to 21), 12 points each. That is 84 points in total, with no points outside these.
