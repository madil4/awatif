---
type: llm
focus: {source: file, path: models/braced-frame/model.ts}
---
Judge the geometry of the 2D frame in the XZ plane (y = 0): 2 storeys of 3.5 m and 2 bays of 5 m. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- It has 9 points on a grid of x = 0, 5, 10 and z = 0, 3.5, 7, and no other points.
- It has 6 vertical column lines (3 grid lines times 2 storeys), each joining vertically adjacent points.
- It has 4 horizontal beam lines (2 bays times 2 floor levels, at z = 3.5 and z = 7), each joining horizontally adjacent points.
- The model also has 4 diagonal brace lines. They are expected and are checked by a separate grader. Do not count them against the columns and beams, and do not fail this check because the total number of lines is more than 10.
- Supports sit on the 3 base points (z = 0) and are fixed. Nothing else is supported.
- gridLines (a grid-system entry) place gridlines at x = 0, 5, 10 and z = 0, 3.5, 7.
