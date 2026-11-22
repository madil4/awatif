---
type: llm
focus: {source: file, path: models/cornerstone-truss/model.ts}
---
Judge the dimensions against the Cornerstone Pressure Washing section drawing: 70'-0" between column lines A and B, column height 19'-6 3/4", truss underside at 16'-8" at the columns, roof pitch 4:12. Column height and truss underside are measured from the top of footing (the column base). 1 ft = 0.3048 m. The z datum may be the column base (base at z = 0) or the floor, which is 2'-0" (0.61 m) below the column base (base at z = 0.61). Judge heights relative to the column base. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- The model is in the XZ plane (y = 0). Columns are at x = 0 and x = 21.34.
- The column top is about 5.96 m above the column base, and the truss underside at the columns is about 5.08 m above the column base.
- The roof is symmetric about mid-span (x about 10.67). The pitch is 4:12, so the ridge is about 3.56 m higher than the eaves level (the top of the columns).
- Supports are on the two column base points and nowhere else, and are fixed.
- No dimension is left in feet or inches.
- Overhangs beyond the column lines, such as 8" on the left and 5'-0" on the right, are fine if present and are not required.
