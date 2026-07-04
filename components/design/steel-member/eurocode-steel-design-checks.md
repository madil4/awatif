# Eurocode Steel Design Checks — EN 1993-1-1:2005

Implementation guide for adding steel member design checks to a 2D structural analysis app.

> **Safety note:** This guide covers the most common cases for rolled doubly symmetric
> I- and H-sections (IPE, HEA, HEB, HEM). It does not cover Class 3/4 sections,
> hollow sections, channels, angles, or welded sections.
> National Annex values may override the recommended values used here.

---

## Inputs Available from the Analysis Engine

Each member already has these results from the 2D analysis:

- Axial force N_Ed (positive = tension, negative = compression)
- Shear force V_Ed
- Bending moment M_y,Ed (major axis)
- Member length L
- Buckling length L_cr,y and L_cr,z (from buckling analysis or user input)
- Steel grade → yields f_y and f_u (e.g. S235: f_y = 235 MPa, S355: f_y = 355 MPa)
- Cross-section profile (e.g. IPE 300, HEA 200)

Each profile in the section library provides:

- A — cross-section area (mm²)
- I_y, I_z — second moments of area (mm⁴)
- W_pl,y, W_pl,z — plastic section moduli (mm³)
- W_el,y, W_el,z — elastic section moduli (mm³)
- i_y, i_z — radii of gyration (mm)
- h — overall depth (mm)
- b — flange width (mm)
- t_w — web thickness (mm)
- t_f — flange thickness (mm)
- r — root radius (mm)
- h_w — clear web height = h - 2 × t_f (mm)
- I_t — torsion constant (mm⁴)
- I_w — warping constant (mm⁶)

**Constants:**

- E = 210000 MPa (modulus of elasticity)
- G = 80770 MPa (shear modulus)
- γ_M0 = 1.0 (cross-section resistance) — **check National Annex**
- γ_M1 = 1.0 (member buckling resistance) — **check National Annex, some countries use 1.1**

---

## Step 1 — Cross-Section Classification (EN 1993-1-1, Table 5.2)

**Purpose:** Determine if the section can develop its full plastic capacity or is limited by local buckling.

**Procedure:**

1. Compute the material factor:

   ```
   ε = sqrt(235 / f_y)
   ```

2. Classify the **compression flange** (outstand element in I-sections):
   - c_f = (b - t_w - 2r) / 2
   - Ratio = c_f / t_f
   - Class 1: c_f / t_f ≤ 9ε
   - Class 2: c_f / t_f ≤ 10ε
   - Class 3: c_f / t_f ≤ 14ε
   - Class 4: c_f / t_f > 14ε

3. Classify the **web** (internal element):
   - c_w = h - 2 × t_f - 2r (the straight portion of the web)
   - Ratio = c_w / t_w

   **Web in pure bending** (when N_Ed is zero or negligible):
   - Class 1: c_w / t_w ≤ 72ε
   - Class 2: c_w / t_w ≤ 83ε
   - Class 3: c_w / t_w ≤ 124ε

   **Web in pure compression** (entire web in compression):
   - Class 1: c_w / t_w ≤ 33ε
   - Class 2: c_w / t_w ≤ 38ε
   - Class 3: c_w / t_w ≤ 42ε

   **Web in combined bending and compression:** Table 5.2 provides α-dependent limits
   (α is the proportion of the web in compression). For the MVP, use the pure compression
   limits conservatively when N_Ed is significant (more than ~10% of N_pl,Rd). This is
   conservative but safe.

4. The **overall section class** is the worst (highest number) of the flange and web classes.

**MVP scope:** Support Class 1 and 2 only. If a section classifies as Class 3 or 4,
flag it as "section class not supported" and skip design checks. This avoids effective
section property calculations entirely.

---

## Step 2 — Cross-Section Resistance Checks (Section 6.2)

All checks produce a unity check (utilization ratio). Values ≤ 1.0 pass.

### 2a. Bending Resistance (Clause 6.2.5)

For Class 1 and 2 sections:

```
M_c,Rd = W_pl,y × f_y / γ_M0
Unity_bending = M_y,Ed / M_c,Rd
```

### 2b. Shear Resistance (Clause 6.2.6)

Shear area for rolled I- and H-sections:

```
A_v = A - 2 × b × t_f + (t_w + 2r) × t_f
```

Apply the minimum check from clause 6.2.6(3):

```
A_v = max(A_v,  η × h_w × t_w)
```

where η = 1.0 (conservative; some National Annexes allow η = 1.2 for f_y ≤ 460 MPa).

Plastic shear resistance:

```
V_pl,Rd = A_v × (f_y / sqrt(3)) / γ_M0
Unity_shear = V_Ed / V_pl,Rd
```

### 2c. Tension Resistance (Clause 6.2.3)

Plastic resistance of the gross section:

```
N_pl,Rd = A × f_y / γ_M0
Unity_tension = N_Ed / N_pl,Rd
```

Note: Net section check at bolt holes (N_u,Rd) is a connection design issue and can be
deferred to a later phase.

### 2d. Compression Resistance (Clause 6.2.4)

For Class 1, 2, and 3 sections (squash load — no buckling):

```
N_c,Rd = A × f_y / γ_M0
Unity_compression = N_Ed / N_c,Rd
```

Buckling is handled separately in Step 3.

### 2e. M + V Interaction (Clause 6.2.8)

Only applies when shear is high:

```
If V_Ed ≤ 0.5 × V_pl,Rd → no reduction needed, skip this check.

If V_Ed > 0.5 × V_pl,Rd:
  ρ = (2 × V_Ed / V_pl,Rd - 1)²
```

Reduce the yield strength of the shear area (web) by (1 - ρ) and recalculate M_c,Rd.
For I-sections, a conservative approximation:

```
M_V,Rd = (W_pl,y - ρ × A_w² / (4 × t_w)) × f_y / γ_M0
```

where A_w = h_w × t_w (web area). Then:

```
Unity_MV = M_y,Ed / M_V,Rd
```

### 2f. M + N Interaction (Clause 6.2.9)

For doubly symmetric I- and H-sections, Class 1 and 2, major axis bending:

**No reduction is needed** (clause 6.2.9.1(4)) when BOTH of these are satisfied:

```
N_Ed ≤ 0.25 × N_pl,Rd
AND
N_Ed ≤ 0.5 × h_w × t_w × f_y / γ_M0
```

If either condition is not met, compute the reduced moment capacity (equation 6.36):

```
n = N_Ed / N_pl,Rd
a = min((A - 2 × b × t_f) / A,  0.5)

M_N,y,Rd = M_pl,y,Rd × (1 - n) / (1 - 0.5 × a)
```

Cap: M_N,y,Rd ≤ M_pl,y,Rd (the formula can give values > M_pl,y,Rd at low n).

```
Unity_MN = M_y,Ed / M_N,y,Rd
```

**Implementation note:** For simplicity, you can always compute the formula and apply
the cap, skipping the no-reduction criteria. The formula naturally returns ≥ M_pl,y,Rd
when axial force is small, and the cap handles it.

---

## Step 3 — Flexural (Column) Buckling (Clause 6.3.1)

**Purpose:** Check compression members for global buckling about each axis.

**Applies when:** N_Ed is compressive. Skip this check for pure tension members.

**Procedure:**

1. **Non-dimensional slenderness** for each axis:

   ```
   λ̄_y = (L_cr,y / i_y) × (1 / π) × sqrt(f_y / E)
   λ̄_z = (L_cr,z / i_z) × (1 / π) × sqrt(f_y / E)
   ```

   If λ̄ ≤ 0.2 for an axis, buckling cannot govern for that axis (χ = 1.0). The member
   capacity is the squash load N_c,Rd from Step 2d for that axis.

2. **Select buckling curve** from Table 6.2 based on section type and axis.

   For **rolled I-sections** with t_f ≤ 40 mm:

   | Condition | y-y axis | z-z axis |
   | --------- | -------- | -------- |
   | h/b > 1.2 | curve a  | curve b  |
   | h/b ≤ 1.2 | curve b  | curve c  |

   For **rolled I-sections** with 40 < t_f ≤ 100 mm:

   | Condition | y-y axis | z-z axis |
   | --------- | -------- | -------- |
   | h/b > 1.2 | curve b  | curve c  |
   | h/b ≤ 1.2 | curve c  | curve d  |

   Typical mapping: IPE profiles → h/b > 1.2. HEA/HEB profiles → h/b ≤ 1.2.

3. **Imperfection factor** α from Table 6.1:

   | Curve | α    |
   | ----- | ---- |
   | a0    | 0.13 |
   | a     | 0.21 |
   | b     | 0.34 |
   | c     | 0.49 |
   | d     | 0.76 |

4. **Reduction factor** χ:

   ```
   Φ = 0.5 × (1 + α × (λ̄ - 0.2) + λ̄²)
   χ = 1 / (Φ + sqrt(Φ² - λ̄²))
   ```

   Cap: χ ≤ 1.0.

5. **Buckling resistance:**

   ```
   N_b,Rd = χ × A × f_y / γ_M1
   Unity_buckling = N_Ed / N_b,Rd
   ```

6. Check both axes. The axis with the **lower N_b,Rd** governs.

---

## Step 4 — Lateral-Torsional Buckling (Clause 6.3.2)

**Purpose:** Check beams against lateral-torsional buckling. Uses the method
of clause 6.3.2.3, valid for rolled or equivalent welded I-sections.

**Applies when:** The member has bending moment and the compression flange is not
continuously restrained laterally.

**Procedure:**

1. **Elastic critical moment** M_cr (not given in the code — use the well-established
   analytical formula for doubly symmetric sections with end moment loading):

   ```
   M_cr = C_1 × (π² × E × I_z / L²) × sqrt(I_w / I_z + L² × G × I_t / (π² × E × I_z))
   ```

   where:
   - L = unbraced length between points of lateral restraint (NOT necessarily the member
     system length — only the distance between lateral restraints)
   - C_1 = moment distribution factor along the unbraced length:
     - C_1 = 1.0 for uniform moment (conservative for all other cases)
     - C_1 ≈ 1.13 for triangular moment (zero at one end)
     - C_1 ≈ 1.35 for parabolic moment (UDL, pinned-pinned)

   **MVP:** Use C_1 = 1.0 for all cases. This is always conservative (gives the lowest
   M_cr). Refine later with C_1 lookup based on the moment diagram shape.

   **Important:** This formula assumes load applied at the shear center. Top-flange
   loading reduces M_cr further. For the MVP this is acceptable; flag it as a known
   limitation.

2. **Non-dimensional slenderness:**

   ```
   λ̄_LT = sqrt(W_pl,y × f_y / M_cr)
   ```

   **Early exit:** If λ̄_LT ≤ λ̄_LT,0 = 0.4, no LTB can occur. Set χ_LT = 1.0 and
   M_b,Rd = M_c,Rd. Skip to the unity check.

3. **Select LTB buckling curve** (Table 6.5, clause 6.3.2.3):

   | Condition | Curve | α_LT |
   | --------- | ----- | ---- |
   | h/b ≤ 2   | b     | 0.34 |
   | h/b > 2   | c     | 0.49 |

4. **Reduction factor** χ_LT (clause 6.3.2.3, equation 6.57):

   Parameters (recommended values — check National Annex):

   ```
   λ̄_LT,0 = 0.4     (plateau length)
   β = 0.75
   ```

   Compute:

   ```
   Φ_LT = 0.5 × (1 + α_LT × (λ̄_LT - λ̄_LT,0) + β × λ̄_LT²)
   χ_LT = 1 / (Φ_LT + sqrt(Φ_LT² - β × λ̄_LT²))
   ```

   Caps: χ_LT ≤ 1.0 AND χ_LT ≤ 1 / λ̄_LT² (both must be enforced).

5. **LTB resistance:**

   ```
   M_b,Rd = χ_LT × W_pl,y × f_y / γ_M1
   Unity_LTB = M_y,Ed / M_b,Rd
   ```

---

## Step 5 — Combined N + M Member Interaction (Clause 6.3.3, Annex B)

**Purpose:** Check beam-columns (members with both axial compression and bending) against
combined in-plane and out-of-plane buckling. This ties together Steps 3 and 4.

**Applies when:** The member has both N_Ed (compression) and M_y,Ed simultaneously.

**Simplification for 2D analysis:** Since M_z,Ed = 0 in a 2D frame, the full interaction
equations reduce to two checks involving only k_yy and k_zy. The k_yz and k_zz factors
(which multiply M_z,Ed) drop out.

### Interaction Equations

Both must be satisfied (equations 6.61 and 6.62):

```
Eq 6.61:  N_Ed / (χ_y × N_Rk / γ_M1)  +  k_yy × M_y,Ed / (χ_LT × M_y,Rk / γ_M1)  ≤  1.0
Eq 6.62:  N_Ed / (χ_z × N_Rk / γ_M1)  +  k_zy × M_y,Ed / (χ_LT × M_y,Rk / γ_M1)  ≤  1.0
```

where:

- N_Rk = A × f_y (characteristic axial resistance)
- M_y,Rk = W_pl,y × f_y (characteristic bending resistance, Class 1 and 2)
- χ_y, χ_z = flexural buckling reduction factors from Step 3
- χ_LT = lateral-torsional buckling reduction factor from Step 4

### Equivalent Uniform Moment Factor C_my (Annex B, Table B.3)

For members loaded by **end moments only** (no transverse loads between lateral restraints):

```
ψ_y = M_y,Ed,smaller / M_y,Ed,larger
```

Sign convention: ψ_y is **positive** for single curvature (both end moments have the same
sign) and **negative** for double curvature (end moments have opposite signs). The "larger"
moment is the one with the greater absolute value. Range: -1 ≤ ψ_y ≤ 1.

```
C_my = 0.6 + 0.4 × ψ_y       (but C_my ≥ 0.4)
```

For members with **transverse loads** between lateral restraints, C_my depends on the
moment diagram shape. MVP: use C_my = 0.9 as a conservative default for transverse
loading cases, or look up from Table B.3 if the moment shape is known.

For the LTB interaction factor:

```
C_mLT = 0.6 + 0.4 × ψ_y      (but C_mLT ≥ 0.4)
```

Same formula as C_my for the end-moments-only case.

### Interaction Factors k_yy and k_zy (Annex B)

Determine whether the member is **susceptible to torsional deformations**:

- **Not susceptible:** Compression flange is continuously restrained laterally, or the
  section is a closed hollow section.
- **Susceptible:** Open I-section without continuous lateral restraint of the compression
  flange (this is the common case for unbraced beams).

Define shorthand:

```
n_y = N_Ed / (χ_y × N_Rk / γ_M1)
n_z = N_Ed / (χ_z × N_Rk / γ_M1)
```

#### k_yy — same for both cases (Table B.1 and B.2, Class 1 and 2)

For Class 1 and 2 sections, the k_yy factor is the same regardless of whether the member
is susceptible to torsional deformations (Table B.2 refers back to Table B.1 for k_yy):

```
k_yy = C_my × (1 + (λ̄_y - 0.2) × n_y)
       but k_yy ≤ C_my × (1 + 0.8 × n_y)
```

#### k_zy — depends on torsional susceptibility

**Members NOT susceptible to torsional deformations (Table B.1):**

```
k_zy = 0.6 × k_yy
```

**Members susceptible to torsional deformations (Table B.2, Class 1 and 2):**

```
k_zy = 1 - 0.1 × λ̄_z / (C_mLT - 0.25) × n_z
       but k_zy ≥ 1 - 0.1 / (C_mLT - 0.25) × n_z
```

For stocky members with low minor-axis slenderness (λ̄_z < 0.4), use the simplified formula:

```
k_zy = 0.6 + λ̄_z
       but k_zy ≤ 1 - 0.1 × λ̄_z / (C_mLT - 0.25) × n_z
```

### Unity Check

```
Unity_6_61 = N_Ed / (χ_y × N_Rk / γ_M1) + k_yy × M_y,Ed / (χ_LT × M_y,Rk / γ_M1)
Unity_6_62 = N_Ed / (χ_z × N_Rk / γ_M1) + k_zy × M_y,Ed / (χ_LT × M_y,Rk / γ_M1)

Governing_unity = max(Unity_6_61, Unity_6_62)
```

---

## Reporting Output Per Member

For each member, produce a result object:

```json
{
  "member_id": "M1",
  "profile": "IPE 300",
  "steel_grade": "S355",
  "section_class": 1,
  "checks": {
    "bending": {
      "M_y_Ed": 150.0,
      "M_c_Rd": 265.1,
      "unity": 0.57,
      "clause": "6.2.5"
    },
    "shear": {
      "V_Ed": 80.0,
      "V_pl_Rd": 520.3,
      "unity": 0.15,
      "clause": "6.2.6"
    },
    "tension": {
      "N_Ed": 0.0,
      "N_pl_Rd": 1920.0,
      "unity": 0.0,
      "clause": "6.2.3"
    },
    "compression": {
      "N_Ed": 200.0,
      "N_c_Rd": 1920.0,
      "unity": 0.1,
      "clause": "6.2.4"
    },
    "flexural_buckling": {
      "N_Ed": 200.0,
      "N_b_Rd_y": 1780.0,
      "N_b_Rd_z": 1450.0,
      "unity": 0.14,
      "governing_axis": "z-z",
      "clause": "6.3.1"
    },
    "LTB": {
      "M_y_Ed": 150.0,
      "M_b_Rd": 230.0,
      "unity": 0.65,
      "clause": "6.3.2"
    },
    "interaction_6_61": { "unity": 0.72, "clause": "6.3.3 Eq 6.61" },
    "interaction_6_62": { "unity": 0.68, "clause": "6.3.3 Eq 6.62" }
  },
  "governing_check": "interaction_6_61",
  "governing_unity": 0.72,
  "status": "PASS"
}
```

Display as a utilization bar (0–100%) per member with the governing clause labeled.

---

## Implementation Order

| Phase   | Steps     | What users can do                                                   | Complexity |
| ------- | --------- | ------------------------------------------------------------------- | ---------- |
| Phase 1 | Steps 1–2 | Simple beam and section design (short spans, no stability concerns) | Low        |
| Phase 2 | Steps 3–4 | Column and beam design with buckling                                | Medium     |
| Phase 3 | Step 5    | Full beam-column design (portal frames, braced frames)              | High       |

Ship Phase 1 first. It covers a useful subset of real design tasks and gives immediate
value.

---

## Known MVP Limitations (Document for Users)

1. Only Class 1 and 2 cross-sections are supported.
2. Only rolled doubly symmetric I- and H-sections (IPE, HEA, HEB, HEM with t_f ≤ 40 mm).
3. LTB check uses C_1 = 1.0 (conservative) and assumes shear center loading.
4. Combined interaction uses Annex B (not Annex A).
5. Biaxial bending uses the linear safe-side interaction (Eq. 6.41): M_y,Ed/M_c,y,Rd + M_z,Ed/M_c,z,Rd ≤ 1.0. The full exponent form (α, β per §6.2.9(6)) and the combined beam-column interaction (Eq. 6.61/6.62, Annex B) are not yet implemented.
6. Web combined bending+compression classification uses conservative pure compression limits.
7. Net section checks at connections are not included.
8. National Annex parameters use the EN recommended values (γ_M0 = 1.0, γ_M1 = 1.0, λ̄_LT,0 = 0.4, β = 0.75).
