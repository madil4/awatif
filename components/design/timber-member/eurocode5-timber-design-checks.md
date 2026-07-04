# Eurocode 5 (EN 1995-1-1) Timber Design Checks — Implementation Spec

## Overview

Implement cross-section and stability design checks for timber members according to EN 1995-1-1:2004+A1:2008 (Eurocode 5). Each step builds on the previous. All checks produce a **utilization ratio** (demand / capacity). A ratio ≤ 1.0 means the member passes.

---

## Step 1 — Material Property Lookup (EN 338)

Store timber strength classes as a static data table (JSON or equivalent).

### Required strength classes

Solid timber (EN 338:2016): C14, C16, C18, C20, C22, C24, C27, C30, C35, C40, C45, C50.
Glulam (EN 14080:2013): GL20h, GL22h, GL24h, GL26h, GL28h, GL30h, GL32h (homogeneous); GL20c, GL22c, GL24c, GL26c, GL28c, GL30c, GL32c (combined). Resawn variants GL28hs, GL28cs also exist.

### Properties to store per class (strengths and stiffness in N/mm², density in kg/m³)

| Property | Symbol   | Description                                      |
| -------- | -------- | ------------------------------------------------ |
| fm,k     | fm_k     | Characteristic bending strength                  |
| ft,0,k   | ft_0_k   | Characteristic tension parallel                  |
| ft,90,k  | ft_90_k  | Characteristic tension perpendicular             |
| fc,0,k   | fc_0_k   | Characteristic compression parallel              |
| fc,90,k  | fc_90_k  | Characteristic compression perp.                 |
| fv,k     | fv_k     | Characteristic shear strength                    |
| E0,mean  | E0_mean  | Mean modulus of elasticity parallel              |
| E0,05    | E0_05    | 5th percentile modulus parallel                  |
| E90,mean | E90_mean | Mean modulus perpendicular                       |
| Gmean    | G_mean   | Mean shear modulus                               |
| G0,05    | G0_05    | 5th percentile shear modulus (for LTB, Eq. 6.31) |
| ρk       | rho_k    | Characteristic density (kg/m³)                   |
| ρmean    | rho_mean | Mean density (kg/m³)                             |

> **Note on G0,05:** The general LTB formula (Eq. 6.31) requires G0,05. For solid timber, EN 338 gives G0,05 ≈ G_mean / 1.2 approximately. For glulam, refer to EN 14080. The simplified rectangular softwood formula (Eq. 6.32) used in Step 5b does not require G0,05, but the general formula is needed for non-rectangular sections or non-softwood species.

---

## Step 2 — Design Strength Calculation

### Core formula (Eq. 2.14 / 2.17)

```
f_d = k_mod × f_k / γ_M
```

### Inputs from the user

1. **Service class** (1, 2, or 3) — relates to moisture conditions.
2. **Load-duration class** — one of: permanent, long-term, medium-term, short-term, instantaneous.

### k_mod table (EN 1995-1-1, Table 3.1)

| Material     | Service class | Permanent | Long-term | Medium-term | Short-term | Instantaneous |
| ------------ | ------------- | --------- | --------- | ----------- | ---------- | ------------- |
| Solid timber | 1             | 0.60      | 0.70      | 0.80        | 0.90       | 1.10          |
| Solid timber | 2             | 0.60      | 0.70      | 0.80        | 0.90       | 1.10          |
| Solid timber | 3             | 0.50      | 0.55      | 0.65        | 0.70       | 0.90          |
| Glulam       | 1             | 0.60      | 0.70      | 0.80        | 0.90       | 1.10          |
| Glulam       | 2             | 0.60      | 0.70      | 0.80        | 0.90       | 1.10          |
| Glulam       | 3             | 0.50      | 0.55      | 0.65        | 0.70       | 0.90          |

### γ_M (partial safety factor for material — Table 2.3)

| Material     | γ_M  |
| ------------ | ---- |
| Solid timber | 1.3  |
| Glulam       | 1.25 |
| LVL          | 1.2  |

### Critical rule: k_mod for load combinations (clause 3.1.3(2))

When a load combination consists of actions belonging to different load-duration classes, the k_mod value used shall correspond to the action with the **shortest duration** in that combination. For example, if a combination includes permanent load (k_mod = 0.60) and short-term wind (k_mod = 0.90), use k_mod = 0.90 for the entire combination. Each load combination must be checked separately with its own k_mod.

---

## Step 3 — Cross-Section Checks (ULS)

These checks use internal forces from the analysis model (N, V, M) and the cross-section geometry (b × h for rectangular sections).

### 3a. Size effect factor k_h (EN 1995-1-1, clauses 3.2 and 3.3)

The characteristic bending strength f_m,k and tension strength f_t,0,k may be increased by k_h for small sections:

```
Solid timber (h < 150 mm, ρ_k ≤ 700 kg/m³):       — Eq. 3.1
  k_h = min((150 / h)^0.2, 1.3)

Glulam (h < 600 mm):                                — Eq. 3.2
  k_h = min((600 / h)^0.1, 1.1)

If h ≥ 150 mm (solid timber) or h ≥ 600 mm (glulam): k_h = 1.0
```

Where h is the depth for bending members or width (maximum cross-sectional dimension) for tension members, in mm.

Apply k_h to f_m,k and f_t,0,k **before** calculating design values (Step 2).

### 3b. Section properties for rectangular section (b × h)

```
A = b × h
W_y = b × h² / 6
W_z = h × b² / 6
I_y = b × h³ / 12
I_z = h × b³ / 12
```

### 3c. Stresses from internal forces

```
σ_m,y,d = M_y,d / W_y
σ_m,z,d = M_z,d / W_z
σ_t,0,d = N_t,d / A          (if tension)
σ_c,0,d = N_c,d / A          (if compression)
τ_d     = 1.5 × V_d / A_eff  (rectangular section)
```

Where `A_eff = k_cr × b × h` and `k_cr = 0.67` (recommended value for solid timber and glulam, per Eq. 6.13a and Amendment A1; accounts for drying cracks). For other wood-based products per EN 13986 and EN 14374: `k_cr = 1.0`. Note: some National Annexes may override the k_cr value.

### 3d. Bending check — Eq. 6.11 and 6.12

```
Check 1: (σ_m,y,d / f_m,y,d) + k_m × (σ_m,z,d / f_m,z,d) ≤ 1.0
Check 2: k_m × (σ_m,y,d / f_m,y,d) + (σ_m,z,d / f_m,z,d) ≤ 1.0
```

Where `k_m = 0.7` for rectangular sections, `k_m = 1.0` for other shapes (solid timber, glulam, LVL). For other wood-based structural products, `k_m = 1.0` for all cross-sections.

For uniaxial bending about y-axis only (most common): simplifies to `σ_m,y,d / f_m,y,d ≤ 1.0`.

### 3e. Shear check — Eq. 6.13

```
τ_d / f_v,d ≤ 1.0
```

### 3f. Tension parallel check — Eq. 6.1

```
σ_t,0,d / f_t,0,d ≤ 1.0
```

### 3g. Compression parallel check — Eq. 6.2

```
σ_c,0,d / f_c,0,d ≤ 1.0
```

### 3h. Bearing / compression perpendicular to grain — Eq. 6.3 (Section 6.1.5)

At supports and load application points, check bearing stress:

```
σ_c,90,d / (k_c,90 × f_c,90,d) ≤ 1.0
```

Where:

- `σ_c,90,d = F_c,90,d / A_ef` — design bearing stress.
- `A_ef = b × l_ef` — the effective contact area perpendicular to the grain.
- `l_ef` = effective contact length, determined by increasing the actual contact length `l` by 30 mm on each side, but not more than `a`, `l`, or `l₁/2` (see Figure 6.2 of the code).
- `k_c,90` = factor accounting for load configuration (EN 1995-1-1, 6.1.5(2)–(4)):
  - `k_c,90 = 1.0` as a conservative default.
  - For members on **continuous** supports, provided `l₁ ≥ 2h`:
    - `k_c,90 = 1.25` for solid softwood timber.
    - `k_c,90 = 1.50` for glulam softwood timber.
  - For members on **discrete** supports, provided `l₁ ≥ 2h`:
    - `k_c,90 = 1.50` for solid softwood timber.
    - `k_c,90 = 1.75` for glulam softwood timber, provided `l ≤ 400 mm`.
  - The limiting value of `k_c,90` shall not exceed **1.75**.

---

## Step 4 — Combined Bending + Axial Checks (ULS)

### 4a. Combined bending + tension — Eq. 6.17 and 6.18

```
Check 1: (σ_t,0,d / f_t,0,d) + (σ_m,y,d / f_m,y,d) + k_m × (σ_m,z,d / f_m,z,d) ≤ 1.0
Check 2: (σ_t,0,d / f_t,0,d) + k_m × (σ_m,y,d / f_m,y,d) + (σ_m,z,d / f_m,z,d) ≤ 1.0
```

### 4b. Combined bending + compression — Eq. 6.19 and 6.20

```
Check 1: (σ_c,0,d / f_c,0,d)² + (σ_m,y,d / f_m,y,d) + k_m × (σ_m,z,d / f_m,z,d) ≤ 1.0
Check 2: (σ_c,0,d / f_c,0,d)² + k_m × (σ_m,y,d / f_m,y,d) + (σ_m,z,d / f_m,z,d) ≤ 1.0
```

Note: the compression term is squared in these equations.

---

## Step 5 — Stability Checks (ULS)

### 5a. Column buckling — Eq. 6.21 to 6.29

#### Inputs

- Effective (buckling) length: `L_ef,y` and `L_ef,z` (from analysis model or user input as `β × L`).
- `β_c = 0.2` for solid timber, `β_c = 0.1` for glulam and LVL (Eq. 6.29).

#### Procedure

```
1. Slenderness ratios:
   λ_y = L_ef,y / i_y    where i_y = √(I_y / A) = h / √12
   λ_z = L_ef,z / i_z    where i_z = √(I_z / A) = b / √12

2. Relative slenderness (Eq. 6.21 and 6.22):
   λ_rel,y = (λ_y / π) × √(f_c,0,k / E0,05)
   λ_rel,z = (λ_z / π) × √(f_c,0,k / E0,05)

3. If both λ_rel,y ≤ 0.3 and λ_rel,z ≤ 0.3 → no buckling check needed;
   use section checks Eq. 6.19 and 6.20 only (clause 6.3.2(2)).

4. Instability factors (Eq. 6.27 and 6.28):
   k_y = 0.5 × (1 + β_c × (λ_rel,y - 0.3) + λ_rel,y²)
   k_z = 0.5 × (1 + β_c × (λ_rel,z - 0.3) + λ_rel,z²)

   Buckling reduction factors (Eq. 6.25 and 6.26):
   k_c,y = 1 / (k_y + √(k_y² - λ_rel,y²))
   k_c,z = 1 / (k_z + √(k_z² - λ_rel,z²))
```

#### Combined buckling + bending — Eq. 6.23 and 6.24

```
Check 1: (σ_c,0,d / (k_c,y × f_c,0,d)) + (σ_m,y,d / f_m,y,d) + k_m × (σ_m,z,d / f_m,z,d) ≤ 1.0
Check 2: (σ_c,0,d / (k_c,z × f_c,0,d)) + k_m × (σ_m,y,d / f_m,y,d) + (σ_m,z,d / f_m,z,d) ≤ 1.0
```

### 5b. Lateral-torsional buckling (LTB) — Eq. 6.30 to 6.35

#### Applies when

A beam is loaded in bending (or combined bending and compression) and the compression edge is not braced laterally (clause 6.3.3(1)P).

#### Procedure

```
1. Critical bending stress — general formula (Eq. 6.31):
   σ_m,crit = (M_y,crit / W_y) = (π × √(E0,05 × I_z × G0,05 × I_tor)) / (L_ef × W_y)

   For softwood with solid rectangular cross-section — simplified formula (Eq. 6.32):
   σ_m,crit = (0.78 × b² × E0,05) / (h × L_ef)

   where L_ef is the effective lateral buckling length from Table 6.1 below.
```

#### Effective length for LTB (EN 1995-1-1, Table 6.1)

For beams with torsionally restrained supports, loaded at centre of gravity:

| Beam type        | Load type                        | L_ef / L |
| ---------------- | -------------------------------- | -------- |
| Simply supported | Constant moment                  | 1.0      |
| Simply supported | Uniformly distributed load (UDL) | 0.9      |
| Simply supported | Concentrated force at midspan    | 0.8      |
| Cantilever       | Uniformly distributed load (UDL) | 0.5      |
| Cantilever       | Concentrated force at free end   | 0.8      |

If load is applied at the **compression edge** (top-loaded): increase L_ef by **+2h**.
If load is applied at the **tension edge**: decrease L_ef by **−0.5h**.

```
2. Relative slenderness for bending (Eq. 6.30):
   λ_rel,m = √(f_m,k / σ_m,crit)

3. Critical factor k_crit (Eq. 6.34):
   λ_rel,m ≤ 0.75       → k_crit = 1.0
   0.75 < λ_rel,m ≤ 1.4 → k_crit = 1.56 - 0.75 × λ_rel,m
   λ_rel,m > 1.4         → k_crit = 1 / λ_rel,m²

   Note: k_crit may be taken as 1.0 for a beam where lateral displacement of its
   compressive edge is prevented throughout its length and torsional rotation is
   prevented at its supports (clause 6.3.3(5)).

4. LTB check — pure bending (Eq. 6.33):
   σ_m,d / (k_crit × f_m,d) ≤ 1.0

5. LTB check — combined bending + compression (Eq. 6.35):
   (σ_m,d / (k_crit × f_m,d))² + (σ_c,0,d / (k_c,z × f_c,0,d)) ≤ 1.0

   where k_c,z is given by Eq. 6.26 (the column buckling reduction factor about the z-axis).
```

---

## Step 6 — Serviceability Limit State (SLS) — Deflection

### Inputs

- Instantaneous deflection from analysis: `u_inst` (from characteristic load combination).
- Span length: `L`.
- `k_def` factor (from Table 3.2):

| Material     | Service class 1 | Service class 2 | Service class 3 |
| ------------ | --------------- | --------------- | --------------- |
| Solid timber | 0.60            | 0.80            | 2.00            |
| Glulam       | 0.60            | 0.80            | 2.00            |

> **Note (clause 3.2(4)):** For timber installed at or near its fibre saturation point that is likely to dry out under load, the values of k_def should be increased by 1.0.

### Final deflection (Eq. 2.2 to 2.5)

For a single variable action:

```
u_fin = u_inst,G × (1 + k_def) + u_inst,Q1 × (1 + ψ_2,1 × k_def)
```

For multiple variable actions, add for each additional variable action Q_i:

```
+ u_inst,Qi × (ψ_0,i + ψ_2,i × k_def)
```

Net final deflection (Eq. 7.2 — if precamber u_c is applied):

```
u_net,fin = u_fin - u_c
```

Where:

- `u_inst,G` = instantaneous deflection from permanent loads.
- `u_inst,Q1` = instantaneous deflection from the leading variable action.
- `u_inst,Qi` = instantaneous deflection from accompanying variable actions.
- `ψ_0`, `ψ_2` = combination factors from EN 1990 (e.g. ψ_2 = 0.3 for residential floors, 0.0 for snow at ≤1000m, 0.0 for wind).
- `u_c` = precamber (if any).

### Deflection limits (EN 1995-1-1, Table 7.2 — recommended ranges, check National Annex)

| Check                             | Beam on two supports | Cantilevering beams |
| --------------------------------- | -------------------- | ------------------- |
| Instantaneous deflection (w_inst) | L/300 to L/500       | L/150 to L/250      |
| Net final deflection (w_net,fin)  | L/250 to L/350       | L/125 to L/175      |
| Final deflection (w_fin)          | L/150 to L/300       | L/75 to L/150       |

Note: Table 7.2 gives ranges depending on the level of deformation deemed acceptable. The first value in each range is the least strict recommended limit. The National Annex and project requirements may impose stricter limits.

Using the least strict limits for beams on two supports:

```
u_inst,Q / (L/300) ≤ 1.0          (instantaneous from variable actions)
u_net,fin / (L/250) ≤ 1.0         (net final deflection)
u_fin / (L/150) ≤ 1.0             (total final deflection)
```

---

## Implementation Priority

| Priority | Step      | What it covers                         | Complexity |
| -------- | --------- | -------------------------------------- | ---------- |
| 1        | Steps 1–3 | Simple beams, ties, and bearing checks | Low        |
| 2        | Step 4    | Beam-columns, combined loading         | Low        |
| 3        | Step 5    | Buckling and LTB                       | Medium     |
| 4        | Step 6    | Deflection / serviceability            | Low        |

---

## Output Per Member

For each checked member, produce:

1. **Member ID** and description.
2. **Material**: strength class, service class, load-duration class.
3. **Section**: b × h, computed section properties.
4. **Design strengths**: f_m,d, f_t,0,d, f_c,0,d, f_v,d with k_mod and γ_M shown.
5. **Utilization ratios** for each applicable check (bending, shear, tension, compression, bearing, combined, buckling, LTB, deflection).
6. **Governing check**: the check with the highest utilization ratio.
7. **Pass / Fail** status.
