# CLT One-Way Benchmark Report (Chapter 6.2)

This note documents how Awatif v2 compares against the one-way CLT benchmark
for a `10 m x 2.45 m` slab with 7-layer layup.

## Reference values used

- Specific support shear, FEM-Design style: `21.67 kN/m`
- Max specific bending moment, FEM-Design style: `54.25 kNm/m`
- Max extreme-fiber normal stress: `8.75 MPa`
- Max transverse shear stress (4th layer mid-plane): `0.1224 MPa`
- Max deflection (SLS): `47.00 mm`

## Extraction convention in Awatif

- `Vmax`: sum left support reactions in `z`, divide by slab width.
- `Mmax`: `Mxx` sampled strip-wise along `x`, maximum absolute value.
- `sigmaMax`: at slab mid-span (`x = L/2, y = W/2`), top of layer 1 vs bottom
  of layer 7, take larger absolute value.
- `tauMax`: `tauYZ` at layer 4 mid-point, sampled at `x = 1.0 m` and `y = W/2`
  (interior section to avoid support boundary singularity).
- `wFin`: maximum downward nodal deflection.

## Why interior shear probe is used

At the support line (`x = 0`) shell stress recovery is sensitive to boundary
singularity behavior, so direct point probes can overestimate `tau` compared to
the benchmark section interpretation. Probing at `x = 1.0 m` gives a stable and
consistent comparison.

## Implementation pointers

- Metrics helper:
  `/Users/musaabmahjoub/Documents/Personal/awatif/awatif/awatif/awatif-fem/src/awatif-clt/benchmark/oneWay.ts`
- Benchmark test:
  `/Users/musaabmahjoub/Documents/Personal/awatif/awatif/awatif/awatif-fem/src/awatif-clt/__tests__/cltPlate.test.ts`
- Example panel:
  `/Users/musaabmahjoub/Documents/Personal/awatif/awatif/awatif/examples/src/clt-plate/main.ts`
