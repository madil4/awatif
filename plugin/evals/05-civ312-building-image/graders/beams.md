---
type: llm
focus: { source: file, path: models/civ312-building/model.ts }
---

Judge the floor and roof beams. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.

- At each of the levels z = 3.7, 7.4, 11.1 and 14.8, beams run along every active grid line in both the x and the y direction, joining adjacent active points.
- There are no beams at the base level z = 0.
- At z = 11.1 and 14.8 there are no beams on lines 1 and 5 (x = 0 and 28).
