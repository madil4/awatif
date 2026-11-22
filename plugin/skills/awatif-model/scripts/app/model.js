// Pure helpers of the live app: the authored model (plain AppConfig shape) and
// the edits made to it. No DOM and no awatif imports, so they run anywhere.

export const COMPONENT_FIELDS = [
  "gridLines",
  "loads",
  "supports",
  "releases",
  "localAxes",
  "imperfections",
  "mesh",
  "design",
];

export const FIELD_LABELS = {
  gridLines: "Grid lines",
  loads: "Loads",
  supports: "Supports",
  releases: "Releases",
  localAxes: "Local axes",
  imperfections: "Imperfections",
  mesh: "Mesh",
  design: "Design",
};

// The exported AppConfig: `--export <name>`, the default export, or the only config
export function pickConfig(module, name) {
  if (name) {
    if (!(name in module)) throw new Error(`"${name}" is not exported by the model`);
    return module[name];
  }
  if (module.default) return module.default;
  const configs = Object.values(module).filter(
    (v) => v && typeof v === "object" && ("points" in v || "lines" in v),
  );
  if (configs.length !== 1)
    throw new Error(
      `Expected one exported AppConfig, found ${configs.length}; pass --export <name>`,
    );
  return configs[0];
}

// Ided<T> -> [id, T][] (a plain list gets 1-based ids, like awatif's toIdedMap)
export function toPairs(ided) {
  if (!ided) return [];
  if (ided instanceof Map) return [...ided.entries()];
  const pairs =
    ided.length > 0 && ided.every((e) => Array.isArray(e) && e.length === 2 && Array.isArray(e[1]));
  return pairs ? ided.map(([id, v]) => [id, [...v]]) : ided.map((v, i) => [i + 1, [...v]]);
}

// The authored model the app edits: geometry as [id, value] pairs, component
// entries with load case names. It is what model.live.json holds.
export function normalize(config) {
  const model = {
    points: toPairs(config.points),
    lines: toPairs(config.lines),
    polygons: toPairs(config.polygons),
    loadCases: [...(config.loadCases ?? [])],
    loadCombinations: (config.loadCombinations ?? []).map((c) => ({
      name: c.name,
      factors: { ...c.factors },
    })),
  };
  for (const field of COMPONENT_FIELDS)
    model[field] = (config[field] ?? []).map((e) => ({
      ...e,
      geometry: [...(e.geometry ?? [])],
      ...(e.params ? { params: { ...e.params } } : {}),
    }));
  return model;
}

const nextId = (pairs) => pairs.reduce((m, [id]) => Math.max(m, id), 0) + 1;

// Drop geometry ids of `kind` from every entry that refers to that kind
function dropFromEntries(model, kind, ids, kindOf) {
  const out = { ...model };
  for (const field of COMPONENT_FIELDS)
    out[field] = model[field].map((e) =>
      kindOf(e) === kind && e.geometry.some((g) => ids.has(g))
        ? { ...e, geometry: e.geometry.filter((g) => !ids.has(g)) }
        : e,
    );
  return out;
}

// Geometry edits from the viewer's edit mode. Returns the new model, and the
// id of what was created, if anything.
export function applyEdit(model, op, kindOf) {
  switch (op.type) {
    case "move-point":
      return {
        model: { ...model, points: model.points.map(([id, p]) => [id, id === op.id ? op.xyz : p]) },
      };
    case "add-point": {
      const id = nextId(model.points);
      return { model: { ...model, points: [...model.points, [id, op.xyz]] }, created: "point-" + id };
    }
    case "add-line": {
      let points = model.points;
      let to = op.to;
      if (to === undefined) {
        to = nextId(points);
        points = [...points, [to, op.xyz]];
      }
      if (to === op.from) return { model };
      const exists = model.lines.some(
        ([, [a, b]]) => (a === op.from && b === to) || (a === to && b === op.from),
      );
      if (exists) return { model: { ...model, points } };
      const id = nextId(model.lines);
      return {
        model: { ...model, points, lines: [...model.lines, [id, [op.from, to]]] },
        created: "line-" + id,
      };
    }
    case "delete-line": {
      const gone = new Set([op.id]);
      const next = { ...model, lines: model.lines.filter(([id]) => id !== op.id) };
      return { model: dropFromEntries(next, "line", gone, kindOf) };
    }
    case "delete-point": {
      const goneLines = new Set(
        model.lines.filter(([, l]) => l.includes(op.id)).map(([id]) => id),
      );
      const gonePolygons = new Set(
        model.polygons.filter(([, p]) => p.includes(op.id)).map(([id]) => id),
      );
      let next = {
        ...model,
        points: model.points.filter(([id]) => id !== op.id),
        lines: model.lines.filter(([id]) => !goneLines.has(id)),
        polygons: model.polygons.filter(([id]) => !gonePolygons.has(id)),
      };
      next = dropFromEntries(next, "point", new Set([op.id]), kindOf);
      next = dropFromEntries(next, "line", goneLines, kindOf);
      next = dropFromEntries(next, "polygon", gonePolygons, kindOf);
      return { model: next };
    }
    default:
      throw new Error(`Unknown edit "${op.type}"`);
  }
}

// Add or remove geometry ids of one component entry (assign mode)
export function assignGeometry(model, field, index, ids, add) {
  const list = model[field].map((e, i) => {
    if (i !== index) return e;
    const set = new Set(e.geometry);
    ids.forEach((id) => (add ? set.add(id) : set.delete(id)));
    return { ...e, geometry: [...set].sort((a, b) => a - b) };
  });
  return { ...model, [field]: list };
}

// Rename a load case everywhere it is referenced
export function renameLoadCase(model, from, to) {
  const out = {
    ...model,
    loadCases: model.loadCases.map((n) => (n === from ? to : n)),
    loadCombinations: model.loadCombinations.map((c) => {
      if (!(from in c.factors)) return c;
      const factors = {};
      Object.entries(c.factors).forEach(([k, v]) => (factors[k === from ? to : k] = v));
      return { ...c, factors };
    }),
  };
  for (const field of COMPONENT_FIELDS)
    out[field] = model[field].map((e) => (e.loadCase === from ? { ...e, loadCase: to } : e));
  return out;
}

export function uniqueName(taken, base) {
  const names = new Set(taken);
  if (!names.has(base)) return base;
  for (let i = 2; ; i++) if (!names.has(`${base} ${i}`)) return `${base} ${i}`;
}

export function allNames(model) {
  return [
    ...model.loadCases,
    ...model.loadCombinations.map((c) => c.name),
    ...COMPONENT_FIELDS.flatMap((f) => model[f].map((e) => e.name)),
  ];
}

// Results per authored point and line, in the model's own ids (as analyze.mjs reports them)
export function summarize(results, model) {
  if (!results || !results.status?.success) return null;
  const { pointToNodes, lineToElements } = results.geometryMapping;
  const supported = new Set(model.supports.flatMap((s) => s.geometry));

  const displacements = [];
  const reactions = [];
  pointToNodes.forEach((nodes, point) => {
    const node = nodes[0];
    const d = results.displacements.slice(node * 3, node * 3 + 3);
    if (d.length === 3) displacements.push({ point, ux: d[0], uy: d[1], uz: d[2] });
    const r = results.reactions[node];
    if (supported.has(point) && r) {
      const [Fx, Fy, Fz, Mx, My, Mz] = r;
      reactions.push({ point, Fx, Fy, Fz, Mx, My, Mz });
    }
  });

  // Signed value of the largest magnitude along each line
  const lines = [];
  lineToElements.forEach((elements, line) => {
    const forces = elements.map((e) => results.internalForces.get(e)).filter(Boolean);
    if (!forces.length) return;
    const row = { line };
    for (const key of ["N", "Vy", "Vz", "Mx", "My", "Mz"]) {
      const values = forces.flatMap((f) => f[key] ?? []);
      row[key] = values.reduce((g, v) => (Math.abs(v) > Math.abs(g) ? v : g), 0);
    }
    lines.push(row);
  });

  const designs = [];
  results.designs?.forEach((design, line) => designs.push({ line, design }));

  let maxDisplacement = { u: 0, point: null };
  results.nodes.forEach((_, node) => {
    const [ux, uy, uz] = results.displacements.slice(node * 3, node * 3 + 3);
    const u = Math.hypot(ux, uy, uz);
    if (u > maxDisplacement.u) maxDisplacement = { u, node };
  });

  return { displacements, reactions, lines, designs, maxDisplacement };
}

// Pass / near limit / fail, from a design's utilization
export function utilizationStatus(design) {
  const u = design && typeof design.utilization === "number" ? design.utilization : null;
  if (u === null) return { status: "neutral", word: "No check", u };
  if (u > 1) return { status: "fail", word: "Fail", u };
  if (u > 0.9) return { status: "warn", word: "Near limit", u };
  return { status: "ok", word: "Pass", u };
}

// ---------- id lists ("1, 3, 5-8") ----------

// Parse typed ids: numbers and ranges separated by commas or spaces. `valid` (a Set or
// array of existing ids) rejects the rest. Returns sorted unique ids and the bad tokens.
export function parseIdList(text, valid) {
  const ok = valid ? new Set(valid) : null;
  const ids = new Set();
  const bad = [];
  String(text ?? "")
    .split(/[\s,;]+/)
    .filter(Boolean)
    .forEach((token) => {
      const m = /^(\d+)(?:\s*[-–…]\s*|\.\.)?(\d+)?$/.exec(token);
      if (!m) return bad.push(token);
      const a = Number(m[1]);
      const b = m[2] === undefined ? a : Number(m[2]);
      const [lo, hi] = a <= b ? [a, b] : [b, a];
      if (hi - lo > 100000) return bad.push(token);
      let any = false;
      for (let i = lo; i <= hi; i++) {
        if (ok && !ok.has(i)) continue;
        ids.add(i);
        any = true;
      }
      if (!any) bad.push(token);
    });
  return { ids: [...ids].sort((x, y) => x - y), bad };
}

// [1, 3, 5, 6, 7, 8] -> "1, 3, 5–8"
export function formatIdList(ids) {
  const s = [...new Set(ids)].sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < s.length; i++) {
    let j = i;
    while (j + 1 < s.length && s[j + 1] === s[j] + 1) j++;
    out.push(j - i >= 2 ? `${s[i]}–${s[j]}` : j > i ? `${s[i]}, ${s[j]}` : `${s[i]}`);
    i = j;
  }
  return out.join(", ");
}

// ---------- assigning components to geometry ----------

function sameParams(a = {}, b = {}) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) return false;
  return true;
}

// Fields whose entries are dropped once a reassignment or removal leaves them without geometry.
// Design entries (sections) and grid systems are kept: they are definitions, not assignments.
export const PRUNED_FIELDS = new Set(["loads", "supports", "releases", "localAxes", "imperfections", "mesh"]);

function unassign(model, field, ids, kind, kindOf, keep) {
  const gone = new Set(ids);
  const emptied = new Set();
  let list = model[field].map((e, i) => {
    if (!(keep(e, i) && kindOf(e) === kind && e.geometry.some((g) => gone.has(g)))) return e;
    const geometry = e.geometry.filter((g) => !gone.has(g));
    if (!geometry.length) emptied.add(i);
    return { ...e, geometry };
  });
  if (PRUNED_FIELDS.has(field)) list = list.filter((_, i) => !emptied.has(i));
  else emptied.clear();
  return { model: { ...model, [field]: list }, emptied };
}

// Remove geometry ids of `kind` from the entries of `field` that `keep(entry, index)` selects
export function unassignFromField(model, field, ids, kind, kindOf, keep = () => true) {
  return unassign(model, field, ids, kind, kindOf, keep).model;
}

// Add geometry ids to entry `index` of `field`. `exclusive` first removes them from the field's other
// entries of the same kind (a line has one design member, one support per point...). Returns the model
// and the entry's index (entries left empty before it may have been dropped).
export function assignToEntry(model, field, index, ids, kind, kindOf, exclusive) {
  let next = model;
  if (exclusive) {
    const r = unassign(model, field, ids, kind, kindOf, (_, i) => i !== index);
    next = r.model;
    index -= [...r.emptied].filter((i) => i < index).length;
  }
  return { model: assignGeometry(next, field, index, ids, true), index };
}

// Assign geometry to the entry of `field` with this template, params (compared with `paramsOf`, e.g.
// with template defaults filled in) and load case; a new entry named after `name` when none matches.
// Returns the model and the entry's index.
export function assignToField(model, field, spec, kindOf) {
  const { templateId, params = {}, ids, kind, exclusive, loadCase, name, paramsOf = (e) => e.params ?? {} } = spec;
  let index = model[field].findIndex(
    (e) =>
      e.templateId === templateId &&
      (field !== "loads" || e.loadCase === loadCase) &&
      sameParams(paramsOf(e), paramsOf({ templateId, params })),
  );
  let next = model;
  if (index === -1) {
    const entry = { name: uniqueName(allNames(model), name ?? templateId), templateId, geometry: [], params: { ...params } };
    if (field === "loads" && loadCase) entry.loadCase = loadCase;
    next = { ...model, [field]: [...model[field], entry] };
    index = next[field].length - 1;
  }
  return assignToEntry(next, field, index, ids, kind, kindOf, exclusive);
}

// Loads of one template in one load case are additive; `replace` first clears that template and
// case from the target geometry.
export function assignLoad(model, { templateId, loadCase, params, ids, replace, name, paramsOf }, kindOf) {
  const kind = templateId === "point-load" ? "point" : "line";
  let next = model;
  if (replace) next = removeLoads(next, { templateId, loadCase, ids }, kindOf);
  return assignToField(next, "loads", { templateId, loadCase, params, ids, kind, name, paramsOf }, kindOf);
}

export function removeLoads(model, { templateId, loadCase, ids }, kindOf) {
  const kind = templateId === "point-load" ? "point" : "line";
  return unassignFromField(
    model,
    "loads",
    ids,
    kind,
    kindOf,
    (e) => e.templateId === templateId && (!loadCase || e.loadCase === loadCase),
  );
}

// A copy of an entry under a new name, placed after it. Returns the model and the copy's index.
export function duplicateEntry(model, field, index) {
  const e = model[field][index];
  const copy = {
    ...e,
    name: uniqueName(allNames(model), e.name + " copy"),
    geometry: [...(e.geometry ?? [])],
    ...(e.params ? { params: JSON.parse(JSON.stringify(e.params)) } : {}),
  };
  const list = [...model[field]];
  list.splice(index + 1, 0, copy);
  return { model: { ...model, [field]: list }, index: index + 1 };
}
