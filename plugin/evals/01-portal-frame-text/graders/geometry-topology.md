---
type: llm
focus: {source: file, path: models/portal-frame/model.ts}
---
Judge the geometry of the model for a single-storey portal frame, 3 m tall, 6 m span, fixed supports. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- It has exactly 4 points: (0,0,0), (0,0,3), (6,0,3) and (6,0,0). There are no extra or duplicate points.
- It has exactly 3 lines: a left column from (0,0,0) to (0,0,3), a beam from (0,0,3) to (6,0,3) and a right column from (6,0,3) to (6,0,0). Each line index refers to the correct points.
- Supports sit on the two base points, (0,0,0) and (6,0,0), and are fixed. Nothing is supported at the eaves points.
- gridLines (a grid-system entry) place gridlines at x = 0 and 6 and at z = 0 and 3. Extra gridlines, such as at midspan, are fine.
