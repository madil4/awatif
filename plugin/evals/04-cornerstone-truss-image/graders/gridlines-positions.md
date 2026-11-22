---
type: llm
focus: {source: file, path: models/cornerstone-truss/model.ts}
weight: 0.5
---
Judge the gridLines (a grid-system entry). The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- Gridlines are at the column lines x = 0 and x = 21.34 m. They are also at the column base, the truss underside (5.08 m above the base) and the column top (5.96 m above the base). The datum may be the column base or the floor 0.61 m below it, and an extra gridline at the floor or the ridge is fine.
