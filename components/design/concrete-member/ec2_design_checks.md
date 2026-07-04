# Eurocode 2 (EN 1992-1-1:2004) — Concrete Design Checks Implementation Guide

This document specifies the minimum set of design checks for reinforced concrete members per EN 1992-1-1:2004. Implement each step as a standalone module. Every formula reference (e.g. `Expr. 6.2a`) maps to the official expression number in the standard.

---

## Step 0: Material Properties (Section 3, Table 3.1)

### 0.1 Input
- **Concrete class** string, e.g. `"C30/37"` → extract `fck` (characteristic cylinder strength in MPa).
- **Steel grade** `fyk` in MPa (default 500 MPa), `Es = 200 000 MPa`.

### 0.2 Derived Concrete Properties (from `fck`)

| Property | Symbol | Formula | Unit |
|---|---|---|---|
| Mean compressive strength | `fcm` | `fck + 8` | MPa |
| Mean tensile strength | `fctm` | `0.30 × fck^(2/3)` for fck ≤ 50; `2.12 × ln(1 + fcm/10)` for fck > 50 | MPa |
| Tensile strength 5% fractile | `fctk_005` | `0.7 × fctm` | MPa |
| Tensile strength 95% fractile | `fctk_095` | `1.3 × fctm` | MPa |
| Secant modulus of elasticity | `Ecm` | `22 × (fcm / 10)^0.3` | GPa |
| Ultimate compressive strain (parabola-rectangle) | `εcu2` | `3.5‰` for fck ≤ 50; `2.6 + 35×((90−fck)/100)^4` ‰ for fck > 50 | ‰ |
| Strain at peak stress | `εc2` | `2.0‰` for fck ≤ 50; `2.0 + 0.085×(fck−50)^0.53` ‰ for fck > 50 | ‰ |
| Exponent (parabola-rectangle) | `n` | `2.0` for fck ≤ 50; `1.4 + 23.4×((90−fck)/100)^4` for fck > 50 | — |

### 0.3 Partial Safety Factors (Table 2.1N — persistent & transient)

| Factor | Symbol | Value |
|---|---|---|
| Concrete | `γc` | 1.5 |
| Reinforcing steel | `γs` | 1.15 |
| Long-term effects on compressive strength | `αcc` | 1.0 (recommended; some NAs use 0.85) |
| Long-term effects on tensile strength | `αct` | 1.0 |

### 0.4 Design Strengths

```
fcd  = αcc × fck / γc                — Expr. (3.15)
fctd = αct × fctk_005 / γc           — Expr. (3.16)
fyd  = fyk / γs
```

### 0.5 Rectangular Stress Block Parameters (Section 3.1.7, Figure 3.5)

These define the simplified compression block used in bending design:

```
λ = 0.8                            for fck ≤ 50 MPa     — Expr. (3.19)
λ = 0.8 − (fck − 50) / 400        for 50 < fck ≤ 90    — Expr. (3.20)

η = 1.0                            for fck ≤ 50 MPa     — Expr. (3.21)
η = 1.0 − (fck − 50) / 200        for 50 < fck ≤ 90    — Expr. (3.22)
```

- `λ` = ratio of the depth of the rectangular stress block to the neutral axis depth (`x`). The block depth is `λ × x`.
- `η` = effective strength factor. The uniform design stress in the block is `η × fcd`.

---

## Step 1: Concrete Cover & Durability (Section 4.4)

### 1.1 Input
- Exposure class (e.g. `XC1`, `XC3`, `XD1`, `XS2`, ...)
- Structural class (default `S4` for 50-year design life)
- Bar diameter `φ` (mm)
- Whether stainless steel, additional protection, or slab geometry applies (for structural class adjustments)

### 1.2 Structural Class Adjustments (Table 4.3N)

Starting from the default class S4, modify based on:

| Criterion | Adjustment |
|---|---|
| Design working life 100 years | +2 |
| Strength class ≥ threshold per exposure class (see table below) | −1 |
| Slab geometry (rebar position not affected by construction) | −1 |
| Special quality control of concrete production | −1 |

Strength class thresholds for the −1 adjustment:

| Exposure | XO | XC1 | XC2/XC3 | XC4 | XD1 | XD2/XS1 | XD3/XS2/XS3 |
|---|---|---|---|---|---|---|---|
| Threshold | ≥C30/37 | ≥C30/37 | ≥C35/45 | ≥C40/50 | ≥C40/50 | ≥C40/50 | ≥C45/55 |

Minimum structural class = S1.

### 1.3 Minimum Cover for Durability `cmin,dur` (Table 4.4N)

Reinforcement steel — values in mm:

| Structural Class | XO | XC1 | XC2/XC3 | XC4 | XD1/XS1 | XD2/XS2 | XD3/XS3 |
|---|---|---|---|---|---|---|---|
| S1 | 10 | 10 | 10 | 15 | 20 | 25 | 30 |
| S2 | 10 | 10 | 15 | 20 | 25 | 30 | 35 |
| S3 | 10 | 10 | 20 | 25 | 30 | 35 | 40 |
| S4 | 10 | 15 | 25 | 30 | 35 | 40 | 45 |
| S5 | 15 | 20 | 30 | 35 | 40 | 45 | 50 |
| S6 | 20 | 25 | 35 | 40 | 45 | 50 | 55 |

### 1.4 Minimum Cover for Bond `cmin,b` (Table 4.2)

```
cmin,b = φ              for separated bars
cmin,b = φn             for bundled bars (φn = equivalent diameter per 8.9.1)
```

Add 5 mm if nominal max aggregate size > 32 mm.

### 1.5 Compute Nominal Cover

```
cmin = max(cmin,b;  cmin,dur + Δcdur,γ − Δcdur,st − Δcdur,add;  10 mm)   — Expr. (4.2)
cnom = cmin + Δcdev                                                        — Expr. (4.1)
```

Recommended values:
- `Δcdur,γ = 0 mm` (additive safety element)
- `Δcdur,st = 0 mm` (reduction for stainless steel)
- `Δcdur,add = 0 mm` (reduction for additional protection)
- `Δcdev = 10 mm` (design deviation allowance)

### 1.6 Effective Depth

```
d = h − cnom − φlink − φ/2
```

Where `h` = section total depth, `φlink` = link/stirrup diameter, `φ` = main bar diameter.

---

## Step 2: ULS Bending with or without Axial Force (Section 6.1)

### 2.1 Scope
Applies to beams, slabs, and similar members where plane sections remain plane.

### 2.2 Design Assumptions
- Plane sections remain plane
- Strain in bonded reinforcement equals strain in surrounding concrete
- Tensile strength of concrete is ignored
- Concrete stress block: use the rectangular stress block (Step 0.5)
- Steel: design stress `fyd = fyk / γs` with horizontal top branch (no strain limit check needed)
- Maximum concrete compressive strain: `εcu2` from Table 3.1 (= 3.5‰ for fck ≤ 50)

### 2.3 Rectangular Section — Bending Only (no axial force)

**Goal**: Given `MEd`, `b`, `d`, `fcd`, `fyd`, `λ`, `η` → find required `As`.

Using the rectangular stress block, the compression force is:
```
Fc = η × fcd × b × (λ × x)
```
acting at depth `λx/2` from the top fibre. Equilibrium with lever arm `z = d − λx/2` gives:

**Algorithm:**

```
1. Compute normalised moment:
   K = MEd / (b × d² × η × fcd)

2. Check if singly reinforced design is sufficient:
   K_max = λ × (x/d)_max × (1 − λ × (x/d)_max / 2)

   The maximum x/d comes from clause 5.5 (redistribution limits).
   For no redistribution (δ = 1.0) and fck ≤ 50 MPa:
     (x/d)_max = (δ − k1) / k2 = (1.0 − 0.44) / 1.25 = 0.448    — Expr. (5.10a)
     K_max     = 0.8 × 0.448 × (1 − 0.8 × 0.448 / 2) = 0.295

   For redistribution ratio δ < 1.0 and fck ≤ 50 MPa:
     (x/d)_max = (δ − 0.44) / 1.25                                — Expr. (5.10a)

   If K ≤ K_max → singly reinforced (proceed to step 3).
   If K > K_max → compression reinforcement needed (see 2.7).

3. Neutral axis depth ratio:
   x/d = (1 − √(1 − 2 × K)) / λ

4. Lever arm:
   z = d × (1 − λ × x / (2 × d))
   Practical upper limit: z ≤ 0.95 × d

5. Required tension steel:
   As = MEd / (z × fyd)
```

### 2.4 Minimum Eccentricity (Clause 6.1(4))
For cross-sections loaded by compression force:
```
e0 = max(h/30, 20 mm)
```
The design moment must be at least `MEd = NEd × e0`.

### 2.5 Minimum and Maximum Reinforcement (Section 9.2.1.1)

```
As,min = max(0.26 × (fctm / fyk) × bt × d,  0.0013 × bt × d)   — Expr. (9.1N)
As,max = 0.04 × Ac                                                (outside lap locations)
```

Where `bt` = mean width of tension zone. For T-beams with flange in compression, only the web width is used for `bt`.

### 2.6 Flanged Sections (T-beams, L-beams)
If the stress block falls within the flange (`λ × x ≤ hf`), treat as a rectangular section of width `beff`.
If `λ × x > hf`, split into flange and web contributions:

```
Moment from flanges: Mf = η × fcd × (beff − bw) × hf × (d − hf/2)
Remaining moment:    Mw = MEd − Mf  (design the web as a rectangular section of width bw)
Total steel:         As = Mf / ((d − hf/2) × fyd) + Mw / (zw × fyd)
```

Effective flange width `beff` is determined per clause 5.3.2.1.

### 2.7 Doubly Reinforced Sections (when K > K_max)

When the applied moment exceeds the singly-reinforced limit:

```
1. Moment capacity at the limit:
   M_lim = K_max × b × d² × η × fcd

2. Excess moment:
   ΔM = MEd − M_lim

3. Lever arm at limit:
   z_lim = d × (1 − λ × (x/d)_max / 2)

4. Compression steel (at depth d2 from compression face):
   As2 = ΔM / ((d − d2) × fyd)
   (Verify compression steel has yielded: εs2 = εcu2 × (x − d2)/x ≥ fyd/Es)

5. Tension steel:
   As1 = M_lim / (z_lim × fyd) + As2
```

---

## Step 3: ULS Shear (Section 6.2)

### 3.1 Members Without Shear Reinforcement (Clause 6.2.2)

**Concrete shear resistance** `VRd,c`:

```
VRd,c = max(VRd,c1, VRd,c2)

VRd,c1 = [CRd,c × k × (100 × ρl × fck)^(1/3) + k1 × σcp] × bw × d   — Expr. (6.2a)
VRd,c2 = (vmin + k1 × σcp) × bw × d                                     — Expr. (6.2b)
```

Where:
```
CRd,c = 0.18 / γc                                — (= 0.12 for γc = 1.5)
k     = min(1 + √(200 / d),  2.0)                — d in mm
ρl    = min(Asl / (bw × d),  0.02)
σcp   = min(NEd / Ac,  0.2 × fcd)                — NEd positive for compression, in MPa
k1    = 0.15
vmin  = 0.035 × k^(3/2) × fck^(1/2)             — Expr. (6.3N)
```

- `Asl` = area of tension reinforcement extending ≥ (`lbd` + `d`) beyond the section considered
- `bw` = smallest width of the cross-section in the tensile area (mm)
- Units: `fck` in MPa, `bw` and `d` in mm → `VRd,c` in N. Convert to kN by dividing by 1000.

**Decision**: If `VEd ≤ VRd,c` → provide minimum shear reinforcement only (see Step 3.3).

### 3.2 Members With Shear Reinforcement — Variable Angle Truss (Clause 6.2.3)

For **vertical stirrups** (α = 90°):

**Steel capacity:**
```
VRd,s = (Asw / s) × z × fywd × cot θ                           — Expr. (6.8)
```

**Concrete strut capacity:**
```
VRd,max = αcw × bw × z × ν1 × fcd / (cot θ + tan θ)           — Expr. (6.9)
```

Where:
```
z     = 0.9 × d                       (approximate lever arm)
fywd  = fyk / γs                       (= fyd, design yield of shear reinforcement)
θ     = strut angle, limited by:
        1.0 ≤ cot θ ≤ 2.5             (i.e. 21.8° ≤ θ ≤ 45°)     — Expr. (6.7N)
ν1    = 0.6 × (1 − fck / 250)         (fck in MPa)               — Expr. (6.6N)
αcw   = 1.0                            (for non-prestressed structures)
```

**Design algorithm:**

```
1. Define capacity constant:
   C = αcw × bw × z × ν1 × fcd

2. Compute VRd,max at the shallowest strut angle (cot θ = 2.5):
   VRd,max_min = C / (2.5 + 1/2.5) = C / 2.9

3. If VEd ≤ VRd,max_min:
     Use cot θ = 2.5 (most economical in reinforcement)
     Asw/s = VEd / (z × fywd × 2.5)

4. If VEd > VRd,max_min:
     Need a steeper strut angle. Solve for cot θ from VRd,max = VEd:
     
     R = VEd / C

     Check R ≤ 0.5. If R > 0.5 the section is INSUFFICIENT — VRd,max
     cannot be satisfied at any angle. Increase section size or fck.

     cot θ = (1 + √(1 − 4 × R²)) / (2 × R)

     Then clamp: 1.0 ≤ cot θ ≤ 2.5
     Asw/s = VEd / (z × fywd × cot θ)

5. Verify VEd ≤ VRd,max at the chosen θ.
```

### 3.3 Minimum Shear Reinforcement (Clause 9.2.2)

Always required for beams (may be omitted for slabs where transverse redistribution is possible):

```
ρw,min = 0.08 × √fck / fyk                              — Expr. (9.5N)
(Asw/s)_min = ρw,min × bw                                (for vertical stirrups)
```

Maximum longitudinal spacing of stirrups:
```
sl,max = 0.75 × d × (1 + cot α)                          — Expr. (9.6N)
       = 0.75 × d              for vertical stirrups (α = 90°)
```

Maximum transverse spacing of stirrup legs:
```
st,max = min(0.75 × d,  600 mm)                           — Expr. (9.8N)
```

### 3.4 Additional Longitudinal Tensile Force from Shear (Clause 6.2.3(7))

The shear truss model shifts tensile force demand outward:
```
ΔFtd = 0.5 × VEd × (cot θ − cot α)                      — Expr. (6.18)
     = 0.5 × VEd × cot θ             for vertical stirrups
```

Check that `(MEd / z) + ΔFtd ≤ MEd,max / z`, where `MEd,max` is the maximum moment in the beam.

### 3.5 Loads Near Supports (Clause 6.2.2(6))

For loads applied on the upper side within `0.5d ≤ av ≤ 2d` from the support face:
```
VEd,reduced = β × VEd     where β = av / (2d)
```
This reduction applies only when checking against `VRd,c` (Expression 6.2a). The unreduced `VEd` must always satisfy:
```
VEd ≤ 0.5 × bw × d × ν × fcd                             — Expr. (6.5)
where ν = 0.6 × (1 − fck/250)                             — Expr. (6.6N)
```

---

## Step 4: SLS Crack Control (Section 7.3)

### 4.1 Approach: Simplified Tabular Method (Clause 7.3.3)

This avoids the full crack width calculation (Expr. 7.8). Check either the **maximum bar diameter** (Table 7.2N) OR the **maximum bar spacing** (Table 7.3N) — satisfying one is sufficient.

### 4.2 Inputs
- Target crack width `wk` (from Table 7.1N, based on exposure class)
- Steel stress `σs` under the **quasi-permanent** load combination, calculated on a **cracked section**
- Actual bar diameter `φ` and actual bar spacing used

### 4.3 Recommended Crack Width Limits (Table 7.1N)

| Exposure Class | Reinforced members — quasi-permanent combination |
|---|---|
| XO, XC1 | wk = 0.4 mm (note: this limit is for appearance, can be relaxed) |
| XC2, XC3, XC4, XD1, XD2, XD3, XS1, XS2, XS3 | wk = 0.3 mm |

### 4.4 Maximum Bar Diameter φ*s (Table 7.2N)

| Steel stress σs (MPa) | wk = 0.4 mm | wk = 0.3 mm | wk = 0.2 mm |
|---|---|---|---|
| 160 | 40 | 32 | 25 |
| 200 | 32 | 25 | 16 |
| 240 | 20 | 16 | 12 |
| 280 | 16 | 12 | 8 |
| 320 | 12 | 10 | 6 |
| 360 | 10 | 8 | 5 |
| 400 | 8 | 6 | 4 |
| 450 | 6 | 5 | — |

Interpolate linearly for intermediate stress values.

**Adjustment for actual section proportions** — the table values assume `fct,eff = 2.9 MPa`, `hcr = 0.5h`, `(h−d) = 0.1h`, `kc = 0.4`. For actual sections, adjust:

Bending (at least part of section in compression):
```
φs = φ*s × (fct,eff / 2.9) × kc × hcr / (2 × (h − d))   — Expr. (7.6N)
```

Tension (uniform axial tension):
```
φs = φ*s × (fct,eff / 2.9) × hcr / (8 × (h − d))         — Expr. (7.7N)
```

Where:
- `φ*s` = maximum bar diameter from Table 7.2N (before adjustment)
- `φs` = adjusted maximum bar diameter (compare actual bar diameter against this)
- `fct,eff` = mean tensile strength effective at time of cracking (typically `fctm` for t ≥ 28 days)
- `kc` = stress distribution coefficient from clause 7.3.2 (= 0.4 for rectangular sections in bending)
- `hcr` = depth of tensile zone immediately prior to cracking
- `h` = overall section depth
- `d` = effective depth

### 4.5 Maximum Bar Spacing (Table 7.3N)

| Steel stress σs (MPa) | wk = 0.4 mm | wk = 0.3 mm | wk = 0.2 mm |
|---|---|---|---|
| 160 | 300 | 300 | 200 |
| 200 | 300 | 250 | 150 |
| 240 | 250 | 200 | 100 |
| 280 | 200 | 150 | 50 |
| 320 | 150 | 100 | — |
| 360 | 100 | 50 | — |

Interpolate linearly for intermediate stress values.

### 4.6 Minimum Reinforcement for Crack Control (Clause 7.3.2)

```
As,min × σs = kc × k × fct,eff × Act                      — Expr. (7.1)
```

Where:
- `fct,eff` = `fctm` (or `fctm(t)` if cracking expected before 28 days)
- `k` = coefficient for non-uniform self-equilibrating stresses:
  - `k = 1.0` for `h ≤ 300 mm` (or flange width ≤ 300 mm)
  - `k = 0.65` for `h ≥ 800 mm` (or flange width ≥ 800 mm)
  - Interpolate linearly between
- `kc` = stress distribution coefficient:
  - `kc = 1.0` for pure tension
  - `kc = 0.4` for rectangular sections and webs in bending (as derived from Expr. 7.2)
- `Act` = area of concrete within the tensile zone just before cracking
- `σs` = maximum stress in reinforcement immediately after cracking (may be taken as `fyk`, or a lower value to satisfy crack width limits via Tables 7.2N/7.3N)

---

## Step 5: SLS Deflection Control (Section 7.4)

### 5.1 Approach: Simplified Span-to-Depth Ratio (Clause 7.4.2)

No detailed deflection calculation is required if `l/d ≤ (l/d)_limit`.

### 5.2 Basic Span-to-Depth Ratio (Expressions 7.16a and 7.16b)

Define reference reinforcement ratio:
```
ρ0 = 10^(−3) × √fck
```

If `ρ ≤ ρ0` (lightly reinforced):
```
l/d = K × [11 + 1.5 × √fck × ρ0/ρ + 3.2 × √fck × (ρ0/ρ − 1)^(3/2)]   — Expr. (7.16a)
```

If `ρ > ρ0` (heavily reinforced):
```
l/d = K × [11 + 1.5 × √fck × ρ0/(ρ − ρ') + (1/12) × √fck × √(ρ'/ρ0)]   — Expr. (7.16b)
```

Where:
- `ρ` = required tension reinforcement ratio at mid-span (at support for cantilevers) = `As,req / (b × d)`
- `ρ'` = required compression reinforcement ratio at mid-span (at support for cantilevers)
- `K` = structural system factor (Table 7.4N):

| Structural System | K |
|---|---|
| Simply supported beam or one/two-way slab | 1.0 |
| End span of continuous beam or one-way continuous slab | 1.3 |
| Interior span of continuous beam or one/two-way slab | 1.5 |
| Flat slab (based on longer span) | 1.2 |
| Cantilever | 0.4 |

### 5.3 Correction Factors

Apply these multipliers to the basic `l/d` from Step 5.2:

1. **Steel stress correction** (the formulas assume σs = 310 MPa at SLS cracked section):
```
factor = 310 / σs                                                 — Expr. (7.17)
```
Conservative estimate:
```
factor = 500 × As,prov / (fyk × As,req)
```

2. **Flanged sections** where flange width / rib width > 3:
```
factor = 0.8
```

3. **Beams/slabs with span > 7 m** supporting brittle partitions:
```
factor = 7 / leff             — leff in metres
```

4. **Flat slabs with longer span > 8.5 m** supporting brittle partitions:
```
factor = 8.5 / leff           — leff in metres
```

### 5.4 Verification

```
(l/d)_actual ≤ (l/d)_basic × correction_factor_1 × correction_factor_2 × ...
```

If this passes → deflection is OK. If not → either increase section depth or perform a detailed deflection calculation per clause 7.4.3.

### 5.5 Reference Values (Table 7.4N, C30/37, σs = 310 MPa)

| Structural System | K | ρ = 1.5% (highly stressed) | ρ = 0.5% (lightly stressed) |
|---|---|---|---|
| Simply supported | 1.0 | 14 | 20 |
| End span continuous | 1.3 | 18 | 26 |
| Interior span continuous | 1.5 | 20 | 30 |
| Flat slab | 1.2 | 17 | 24 |
| Cantilever | 0.4 | 6 | 8 |

Note 1: For 2-way spanning slabs, check based on the shorter span.
Note 2: For flat slabs, use the longer span.

---

## Implementation Summary

### Recommended execution order:

```
1. materialProperties(concreteClass, steelGrade)
   → returns { fck, fcd, fctm, fctd, fyd, Ecm, εcu2, λ, η, ... }

2. coverAndEffectiveDepth(exposureClass, structuralClass, barDiam, linkDiam, sectionDepth)
   → returns { cnom, cmin, d }

3. bendingCheck(MEd, b, d, fcd, fyd, fctm, fyk, λ, η, [NEd=0])
   → returns { As_required, As_min, x_over_d, z, K, utilisation }

4. shearCheck(VEd, bw, d, z, fck, fcd, fyd, Asl, [NEd=0])
   → returns { VRd_c, needsShearReinf, Asw_s_required, Asw_s_min, theta, VRd_max }

5. crackCheck(σs, barDiam, barSpacing, wk_target, fct_eff, kc, hcr, h, d)
   → returns { maxBarDiam, maxBarSpacing, passBarDiam, passBarSpacing, overallPass }

6. deflectionCheck(l, d, K, ρ, ρ_prime, fck, fyk, As_req, As_prov, [flanged=false])
   → returns { ld_limit, ld_actual, pass }
```

### Key design constraints to always enforce:
- `x/d ≤ (x/d)_max` in bending (from clause 5.5; = 0.448 for δ=1.0 and fck ≤ 50)
- `As,min ≤ As ≤ As,max` (min for robustness, max for constructability)
- `VEd ≤ VRd,max` in shear (cannot be exceeded by adding more stirrups — must enlarge section or increase fck)
- `1.0 ≤ cot θ ≤ 2.5` for the shear strut angle
- `sl,max = 0.75d` for maximum stirrup spacing
- `cnom ≥ cmin,b` and `cnom ≥ cmin,dur + Δcdev` for cover

### Units convention:
- Forces in **kN**
- Moments in **kNm**
- Stresses in **MPa** (= N/mm²)
- Dimensions in **mm** (except span in metres for the deflection check)
- Areas in **mm²**
- When using the formulas in this document: `fck` is always in MPa, `bw` and `d` are always in mm. Expressions (6.2a), (6.2b), (6.8), (6.9) yield forces in N when inputs are in MPa and mm — divide by 1000 to get kN.

### National Annex notes:
All values in this document use the **recommended** Eurocode values. Many parameters (`αcc`, `cmin,dur`, `CRd,c`, `vmin`, `cot θ` limits, `K` factors, etc.) may be overridden by the applicable National Annex. Build the system so that NA-specific values can be injected as configuration overrides.
