# ULS Load Combination — Eq. 6.10 Spec

EN 1990:2002 Annex A1, Table A1.2(B) — Persistent & Transient Design Situations

## Formula

```
Ed = Σ γ_G,j · G_k,j  +  γ_Q,1 · Q_k,1  +  Σ γ_Q,i · ψ_0,i · Q_k,i
         ↑                    ↑                       ↑
    all permanent        leading variable      all other variable
      actions               action            actions (accompanying)
```

## Partial Factors

| Symbol     | Value      | Applies to                              |
|------------|------------|-----------------------------------------|
| γ_G,sup    | 1.35       | Permanent — unfavourable                |
| γ_G,inf    | 1.00       | Permanent — favourable                  |
| γ_Q        | 1.50       | Variable — unfavourable (leading)       |
| γ_Q * ψ_0 | 1.50 * ψ_0 | Variable — unfavourable (accompanying) |
| —          | 0.00       | Variable — favourable                   |

## ψ_0 Values (EN 1990 Table A1.1)

Only categories relevant to the MVP are listed. Full table in EN 1990.

| Category                   | ψ_0 |
|----------------------------|------|
| A — Domestic / Residential | 0.7  |
| B — Office                 | 0.7  |
| C — Congregation areas     | 0.7  |
| D — Shopping areas         | 0.7  |
| E — Storage areas          | 1.0  |
| Wind                       | 0.6  |

## Predefined Load Cases

| ID  | Default Name       | Type      | ψ_0 | Group | Notes                                                        |
|-----|--------------------|-----------|------|-------|--------------------------------------------------------------|
| G1  | Self-weight        | permanent | —    | —     | Structure only. Can be auto-calculated from geometry + 25 kN/m3. |
| G2  | Superimposed dead  | permanent | —    | —     | Finishes, partitions, fixed equipment.                       |
| Q1  | Imposed            | variable  | 0.7  | —     | Default Cat B (office). User picks category, ψ_0 auto-updates. |
| W1  | Wind +X            | variable  | 0.6  | wind  | Lateral in positive X direction.                             |
| W2  | Wind -X            | variable  | 0.6  | wind  | Lateral in negative X direction.                             |

W1 and W2 are **mutually exclusive** — they share the group "wind". Only one
wind direction can appear in any single combination. The algorithm handles this.

User selects from this list when assigning loads to members/nodes. The user
can rename them but the type and ψ_0 stay locked to the category.

## Data Model

```
LoadCase {
  id:       string                    // "G1", "G2", "Q1", "W1", "W2"
  name:     string                    // user-editable label
  type:     "permanent" | "variable"
  category: string                    // "self-weight" | "super-dead" | "imposed" | "wind"
  psi0:     number | null             // null for permanent, auto-set from category for variable
  group:    string | null             // null = independent, "wind" = mutually exclusive
}

LoadCombination {
  id:       string
  name:     string                    // e.g. "ULS-1: Imposed leading"
  entries:  [ { loadCaseId, factor } ]
}
```

## Algorithm

```
function generateULSCombinations(loadCases) -> LoadCombination[]

  permanent = loadCases where type == "permanent"
  variable  = loadCases where type == "variable"

  if variable is empty:
    return [ combine all permanent at 1.35 ]

  combinations = []

  for each V_lead in variable:

    entries = []

    // 1. All permanent actions at gamma_G,sup
    for each G in permanent:
      entries.append({ loadCaseId: G.id, factor: 1.35 })

    // 2. Leading variable action at full gamma_Q
    entries.append({ loadCaseId: V_lead.id, factor: 1.50 })

    // 3. Accompanying variable actions at gamma_Q * psi_0
    //    SKIP any action in the same mutually exclusive group as V_lead
    for each V_acc in variable where V_acc != V_lead:
      if V_acc.group != null AND V_acc.group == V_lead.group:
        continue   // e.g. skip W2 when W1 is leading
      factor = 1.50 * V_acc.psi0
      if factor > 0:
        entries.append({ loadCaseId: V_acc.id, factor: factor })

    combinations.append({
      id:      "ULS-" + (index + 1)
      name:    "ULS: " + V_lead.name + " leading"
      entries: entries
    })

  return combinations
```

## Worked Example

Using all 5 predefined load cases:

| ID | Name              | Type      | ψ_0 | Group |
|----|-------------------|-----------|------|-------|
| G1 | Self-weight       | permanent | —    | —     |
| G2 | Superimposed dead | permanent | —    | —     |
| Q1 | Imposed (Cat B)   | variable  | 0.7  | —     |
| W1 | Wind +X           | variable  | 0.6  | wind  |
| W2 | Wind -X           | variable  | 0.6  | wind  |

3 variable actions, but W1/W2 are mutually exclusive -> **4 combinations**:

**ULS-1: Imposed leading (with W1)**

| Load case         | Factor             | Value |
|-------------------|--------------------|-------|
| G1 Self-weight    | gamma_G,sup        | 1.35  |
| G2 Super. dead    | gamma_G,sup        | 1.35  |
| Q1 Imposed        | gamma_Q            | 1.50  |
| W1 Wind +X        | gamma_Q * psi_0    | 0.90  |

**ULS-2: Imposed leading (with W2)**

| Load case         | Factor             | Value |
|-------------------|--------------------|-------|
| G1 Self-weight    | gamma_G,sup        | 1.35  |
| G2 Super. dead    | gamma_G,sup        | 1.35  |
| Q1 Imposed        | gamma_Q            | 1.50  |
| W2 Wind -X        | gamma_Q * psi_0    | 0.90  |

**ULS-3: Wind +X leading**

| Load case         | Factor             | Value |
|-------------------|--------------------|-------|
| G1 Self-weight    | gamma_G,sup        | 1.35  |
| G2 Super. dead    | gamma_G,sup        | 1.35  |
| Q1 Imposed        | gamma_Q * psi_0    | 1.05  |
| W1 Wind +X        | gamma_Q            | 1.50  |

**ULS-4: Wind -X leading**

| Load case         | Factor             | Value |
|-------------------|--------------------|-------|
| G1 Self-weight    | gamma_G,sup        | 1.35  |
| G2 Super. dead    | gamma_G,sup        | 1.35  |
| Q1 Imposed        | gamma_Q * psi_0    | 1.05  |
| W2 Wind -X        | gamma_Q            | 1.50  |

Note: ULS-1 and ULS-2 are mirrors (same factors, opposite wind). In a
symmetric frame they give mirrored results. In an asymmetric frame both
matter.

## Key Rules

1. **Each variable action gets a turn as leading.** Mutually exclusive
   actions (same group) are never combined — each gets its own combo.

2. **Favourable variable actions = 0.** A variable action that reduces
   the design effect should be excluded. In the MVP, handle this by
   convention: if the user only applies wind where it is unfavourable,
   the combinations are already correct.

3. **Permanent actions always 1.35.** Without pattern loading, all
   permanent loads are treated as unfavourable (gamma_G,sup = 1.35).

4. **Each combination is a single linear superposition.** The factored
   result for a combination is:
   ```
   F_combo = Sum( factor_i * F_loadcase_i )
   ```
   where F is any force/moment/displacement from the first-order analysis
   of each individual load case.

## Envelope

After generating all combinations, the **envelope** at each section is:

```
M_Ed  = max( |M_combo_1|, |M_combo_2|, ..., |M_combo_N| )
N_Ed  = corresponding axial force from the SAME governing combination
```

For column design you need the (N_Ed, M_Ed) pair from the same
combination — not independent maxima. Track which combination governs
at each section.
