---
type: llm
focus: {source: file, path: models/cornerstone-truss/model.ts}
---
Judge how the truss is modelled. The model may compute coordinates with constants, loops or helper functions. Evaluate the expressions to the numbers they produce and judge those numbers, not the source text. Tolerance is 1% or 0.02 m, whichever is larger.
- It is built from separate line members: a top chord, a bottom chord, vertical members and diagonal web members. It is not a single beam and not just two sloping chords.
- The web members connect the top and bottom chords at shared points, so the truss is one connected structure.
- The two columns are separate lines from the truss chords, and they connect to the truss.
- Every line has a design entry, and none is a steel-member, since W16x67 and HSS are not supported sections.
