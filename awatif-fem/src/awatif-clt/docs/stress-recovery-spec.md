# CLT Stress Recovery Spec (v2 / awatif-clt-v2)

This document fixes conventions for through-thickness CLT stress recovery.

## Scope

- Applies to shell elements (`3-node Reissner-Mindlin`) using CLT ESL inputs.
- Defines only stress recovery conventions. Solver and stiffness assembly remain unchanged.
- References equations from the provided chapter:
  - Eq. 42, Eq. 13a (in-plane, with coupling)
  - Eq. 43, Eq. 44 (in-plane, without coupling)
  - Eq. 45, Eq. 46 (transverse shear, with coupling)
  - Eq. 47 (transverse shear, without coupling)

## Coordinate Systems

- `shell local (x', y', z')`: shell calculation axes.
- `layer local (1, 2, 3)`: material orthotropy axes for each layer.
- Stress and strain vectors must always be evaluated in the same coordinate system as the active constitutive matrix.

## Sign Convention

- Membrane resultants per unit length: `N = [Nx, Ny, Nxy]`.
- Bending resultants per unit length: `M = [Mx, My, Mxy]`.
- Transverse shear resultants per unit length: `Q = [Qx, Qy]`.
- Thickness coordinate:
  - `z = 0` at laminate mid-surface
  - positive toward the laminate top surface
  - bottom at `-t/2`, top at `+t/2`

## Kinematics for In-Plane Recovery

At any through-thickness coordinate `z`:

- `eps(z) = eps0 + z * kappa` (Eq. 42)
- `sigma(z) = Qbar_layer * eps(z)` (Eq. 13a)

Where:

- `eps0 = [epsx0, epsy0, gammaxy0]`
- `kappa = [kappax, kappay, kappaxy]`
- `Qbar_layer` is the in-plane reduced stiffness for the layer in the chosen axes.

## Recovery Modes

### With shear coupling between layers

- In-plane stresses use Eq. 42 + Eq. 13a across laminate thickness.
- Transverse shear stresses use Eq. 45/46 with laminate shear distribution functions.

### Without shear coupling between layers

- In-plane stresses use Eq. 43 within each layer-local `z'` limits (Eq. 44).
- Transverse shear stresses follow Eq. 47 and layer-wise parabolic profiles.

## Sampling Points

Layer stresses are evaluated at:

- `top`
- `mid`
- `bottom`

for each layer `k`.

## Units

- Internal calculations:
  - lengths: `m`
  - forces: `kN`
  - stress: `kN/m^2` (`kPa`)
- UI/report presentation:
  - `MPa` for stresses
  - `mm` for displacements

## Validation Rules

Recovered stresses must satisfy equilibrium against FE resultants (per element, within tolerance):

- `integral(sigma dz) ~ N`
- `integral(z * sigma dz) ~ M`
- `integral(tau dz) ~ Q`

These checks are mandatory regression tests for stress recovery implementation.

## Implemented API Surface (awatif-clt-v2)

Core recovery functions:

- `recoverLaminateInPlaneStressProfile(...)`
- `recoverLaminateInPlaneResultants(...)`
- `recoverLaminateTransverseShearProfile(...)`
- `recoverLaminateTransverseResultantFromProfile(...)`
- `recoverLaminateTransverseResultantFromConstitutive(...)`

Mesh-level recovery functions:

- `recoverCltInPlaneStressProfiles(...)`
- `recoverCltTransverseShearProfiles(...)`

Post-processing utilities:

- `extractInPlaneStressField(...)`
- `extractTransverseStressField(...)`
- `findClosestElementByCentroid(...)`
- `sampleClosestInPlaneStressMpa(...)`
- `sampleClosestTransverseStressMpa(...)`
- `sampleClosestInPlaneThroughThicknessMpa(...)`
- `sampleClosestTransverseThroughThicknessMpa(...)`
- `sampleInPlaneThroughThickness(...)`
- `sampleTransverseThroughThickness(...)`
- `getThroughThicknessExtrema(...)`

Supported stress components:

- In-plane shell local: `sigmaX`, `sigmaY`, `tauXY`
- In-plane layer local: `sigma1`, `sigma2`, `tau12`
- Transverse shell local: `tauXZ`, `tauYZ`
- Transverse layer local: `tau13`, `tau23`

Mode behavior:

- `coupled`:
  - in-plane recovery via Eq. 42 + Eq. 13a
  - transverse recovery via Eq. 45/46 style shape functions
- `uncoupled`:
  - in-plane recovery via Eq. 43 / Eq. 44
  - transverse recovery via Eq. 47 (layerwise parabolic)
