---
type: llm
focus: {source: file, path: models/hibbler-frame/model.ts}
---
Judge the loads against the Hibbler frame drawing: a 2 k/ft distributed load on A to B only and a 10 k point load 8 ft left of C. Conversions: 1 k = 4.448 kN, 1 k/ft = 14.594 kN/m. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- The distributed load is 2 k/ft, about 29.19 kN/m in magnitude, and acts downward. A downward load in the global z direction has a negative value. A positive value with global-z acts upward and fails this check.
- The distributed load is assigned to the beam line from A to B only, and not to the other beam segments or the columns.
- The point load is 10 k, about 44.48 kN in magnitude, and acts downward, so Fz is negative. It is applied at the load point at x = 6.096 m.
- Both loads belong to a load case that exists in loadCases.
- There are exactly these two loads. There are no other loads.
