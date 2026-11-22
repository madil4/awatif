---
type: llm
focus: {source: file, path: models/civ312-building/model.ts}
---
Judge the columns. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- There is a vertical column line in every storey at every active grid intersection, one line per storey.
- Storeys 1 and 2 have 20 columns each (5 lines by 4 rows). Storeys 3 and 4 have 12 each (lines 2 to 4 by 4 rows). That is 64 columns.
- No column continues above z = 7.4 on lines 1 and 5.
- Supports sit on every column base point at z = 0 and are fixed.
