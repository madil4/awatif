// The live Awatif app: the awatif-ui design system (StructViewer components,
// AwatifUI helpers, the three.js AwatifViewer) on top of Awatif's analysis
// engine (`createEngine`). Nothing here uses awatif's own UI (`@awatif/ui`,
// `createApp`); awatif only runs the mesh -> solve -> design pipeline.
//
// The app edits the authored model (plain AppConfig shape). Every edit
// re-runs the analysis and is autosaved to model.live.json.
import "./globals.js";
import "../../../awatif-ui/assets/tokens.css";
import "../../../awatif-ui/assets/components/bundle.css";
import "../../../awatif-ui/assets/components/bundle.js";
import "../../../awatif-ui/assets/awatif-ui.js";
import logoUrl from "../../../awatif-ui/assets/logo.svg?url";
import { createViewer } from "../../../awatif-ui/assets/awatif-viewer.js";
import { createRoot } from "react-dom/client";
import { ComponentsType, initTriangleMesh } from "@awatif/components";
import { createEngine } from "../engine.ts";
import { modelModule, exportName, modelName } from "virtual:awatif-app-config";
import {
  COMPONENT_FIELDS,
  FIELD_LABELS,
  allNames,
  applyEdit,
  assignGeometry,
  assignLoad,
  assignToEntry,
  assignToField,
  duplicateEntry,
  formatIdList,
  normalize,
  parseIdList,
  pickConfig,
  removeLoads,
  renameLoadCase,
  summarize,
  unassignFromField,
  uniqueName,
  utilizationStatus,
} from "./model.js";

const React = window.React;
const SV = window.StructViewer;
const UI = window.AwatifUI;
const h = React.createElement;
const F = React.Fragment;
const { useState, useEffect, useRef, useMemo } = React;

const FIELD_TYPE = {
  gridLines: ComponentsType.GRID_LINES,
  loads: ComponentsType.LOADS,
  supports: ComponentsType.SUPPORTS,
  releases: ComponentsType.RELEASES,
  localAxes: ComponentsType.LOCAL_AXES,
  imperfections: ComponentsType.IMPERFECTIONS,
  mesh: ComponentsType.MESH,
  design: ComponentsType.DESIGN,
};

// ---------- engine ----------

const config = pickConfig(modelModule, exportName);
// Polygons drawn in the app need the Triangle mesher even if the file has none
await initTriangleMesh();
const initialModel = normalize(config);
const engine = await createEngine({ ...config, ...initialModel });
const extra = config.extraComponents ? { extraComponents: config.extraComponents } : {};
const workPlane = config.display?.workPlane ?? "XZ";
const workPlaneOffset = config.display?.workPlaneOffset ?? 0;

const templatesOf = (field) => engine.templates.get(FIELD_TYPE[field]) ?? new Map();
const templateById = new Map();
COMPONENT_FIELDS.forEach((f) => templatesOf(f).forEach((t, id) => templateById.set(id, t)));
const templateLabel = (id) => UI.TEMPLATE_NAMES[id] ?? templateById.get(id)?.name ?? id;

// Which geometry an entry's ids refer to, from its template
function kindOf(entry) {
  if (entry.templateId === "grid-system") return null;
  return templateById.get(entry.templateId)?.geometryKind ?? "line";
}

function primitiveDefaults(templateId) {
  const out = {};
  Object.entries(templateById.get(templateId)?.defaultParams ?? {}).forEach(([k, v]) => {
    if (["number", "string", "boolean"].includes(typeof v)) out[k] = v;
  });
  return out;
}

// An entry's params with template defaults filled in (how assignments compare entries)
const paramsOf = (e) => ({ ...primitiveDefaults(e.templateId), ...e.params });

// The model as the inspector shows it: template defaults filled in, so every param is editable
function withDefaults(model) {
  const out = { ...model };
  COMPONENT_FIELDS.forEach((f) => {
    out[f] = model[f].map((e) => (e.templateId === "grid-system" ? e : { ...e, params: paramsOf(e) }));
  });
  return out;
}

// ---------- autosave ----------

let saveTimer;
function save(model) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fetch("/__awatif/live", { method: "POST", body: JSON.stringify(model) }).catch(() => {});
  }, 500);
}

// ---------- layout (per viewer, in this browser) ----------

const LAYOUT_KEY = "awatif.layout";
const DEFAULT_LAYOUT = {
  collapsed: { left: false, right: false, bottom: false },
  sizes: {},
  panels: { view: true, display: true, assign: true, inspector: true },
  groups: {},
};
function loadLayout() {
  try {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || "{}");
    return {
      collapsed: { ...DEFAULT_LAYOUT.collapsed, ...saved.collapsed },
      sizes: { ...saved.sizes },
      panels: { ...DEFAULT_LAYOUT.panels, ...saved.panels },
      groups: { ...saved.groups },
    };
  } catch {
    return DEFAULT_LAYOUT;
  }
}

// ---------- formatting ----------

const num = (v, d = 2) => (v == null || Number.isNaN(v) ? "" : (Math.abs(v) < 1e-9 ? 0 : v).toFixed(d).replace("-", "−"));
const asNumber = (v) => (typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v)) ? Number(v) : typeof v === "number" ? v : null);
const KIND_LABEL = { point: "Points", line: "Lines", polygon: "Polygons" };
const KINDS = ["point", "line", "polygon"];
const EMPTY_SELECTION = { point: [], line: [], polygon: [] };
const PLANE_NORMAL = { XY: "z", XZ: "y", YZ: "x" };
const AXIS = { x: 0, y: 1, z: 2 };
const POINT_LOAD_KEYS = ["Fx", "Fy", "Fz", "Mx", "My", "Mz"];
const SUPPORT_TYPES = UI.ENUMS["point-support.type"];
const RELEASE_TYPES = UI.ENUMS["releases.type"];
const UDL_DIRECTIONS = UI.ENUMS["distributed-load.direction"];
const dim = { color: "var(--ink-muted)" };
// Line results drawn on the members (brand book: Display options > Line results)
const LINE_RESULTS = [
  { value: "N", label: "Axial", unit: "kN", note: "Compression is positive" },
  { value: "Vy", label: "Shear Y", unit: "kN", note: "Signed with Bending Z" },
  { value: "Vz", label: "Shear Z", unit: "kN", note: "Signed with Bending Y" },
  { value: "Mx", label: "Torsion", unit: "kN·m" },
  { value: "My", label: "Bending Y", unit: "kN·m", note: "Sagging is negative; drawn on the tension side" },
  { value: "Mz", label: "Bending Z", unit: "kN·m", note: "Sagging is negative; drawn on the tension side" },
];

// Hover tooltip from the results: a line's governing internal forces, a point's displacement and reactions
function hoverText(id, summary) {
  const p = summary && UI.parseId(id);
  if (!p) return null;
  const rows = (pairs) => pairs.filter(([, v]) => Math.abs(v) >= 0.005).map(([k, v, unit]) => `${k}  ${num(v)} ${unit}`);
  if (p.kind === "line") {
    const r = summary.lines.find((x) => x.line === p.id);
    const out = r && rows(LINE_RESULTS.map((l) => [l.label, r[l.value], l.unit]));
    return out?.length ? [`Line ${p.id}`, ...out].join("\n") : null;
  }
  if (p.kind === "point") {
    const d = summary.displacements.find((x) => x.point === p.id);
    const r = summary.reactions.find((x) => x.point === p.id);
    const reaction = r ? rows(["Fx", "Fy", "Fz", "Mx", "My", "Mz"].map((k) => [k, r[k], k.startsWith("F") ? "kN" : "kN·m"])) : [];
    const out = [`Point ${p.id}`];
    if (d) out.push(...["ux", "uy", "uz"].map((k) => `${k}  ${num(d[k], 5)} m`));
    if (reaction.length) out.push("Reaction", ...reaction);
    return out.length > 1 ? out.join("\n") : null;
  }
  return null;
}

// Next grid line id after `id`: A -> B, 3 -> 4, Z2 -> Z3
function nextGridId(id, taken) {
  let next = String(id ?? "A");
  const step = (s) => {
    const m = /^(.*?)(\d+)$/.exec(s);
    if (m) return m[1] + (Number(m[2]) + 1);
    if (/^[A-Y]$/i.test(s)) return String.fromCharCode(s.charCodeAt(0) + 1);
    return s + "'";
  };
  do next = step(next);
  while (taken.includes(next));
  return next;
}

// ---------- small form pieces (built from the design-system classes) ----------

function Chevron({ dir = "right" }) {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return h(
    "svg",
    { width: 12, height: 12, viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { transform: `rotate(${rot}deg)` } },
    h("path", { d: "M4.2 2.4L7.8 6L4.2 9.6" }),
  );
}

function CollapseButton({ dir, label, onClick }) {
  return h("button", { type: "button", className: "sv-collapse-btn", title: label, "aria-label": label, onClick }, h(Chevron, { dir }));
}

function Row({ label, unit, children }) {
  return h(
    "div",
    { className: "sv-props__row" },
    h("span", { className: "ui sv-props__label" }, label),
    h("span", { className: "sv-props__valuewrap" }, children, unit ? h("span", { className: "caption sv-props__unit" }, unit) : null),
  );
}

function Section({ title, open, onToggle, children }) {
  return h(
    "div",
    { className: "sv-props__group" },
    h("button", { type: "button", className: "sv-props__title sv-props__toggle overline sv-caps", "aria-expanded": open, onClick: () => onToggle(!open) }, h(Chevron, { dir: open ? "down" : "right" }), title),
    open ? children : null,
  );
}

function Actions({ children }) {
  return h("div", { style: { display: "flex", flexWrap: "wrap", gap: "var(--space-2)", padding: "var(--space-2) var(--space-3)", borderBottom: "1px solid var(--border)" } }, children);
}

function Hint({ children }) {
  return h("p", { className: "caption", style: { margin: 0, padding: "var(--space-2) var(--space-3)", borderBottom: "1px solid var(--border)", ...dim } }, children);
}

function TextInput({ value, onChange, numeric, label, placeholder, invalid, wide }) {
  return h("input", {
    className: "sv-input " + (numeric ? "data is-num" : "ui"),
    style: { ...(wide ? { maxWidth: "none" } : {}), ...(invalid ? { borderColor: "var(--status-fail)" } : {}) },
    value,
    placeholder,
    "aria-label": label,
    "aria-invalid": invalid || undefined,
    onChange: (e) => onChange(e.target.value),
  });
}

// Typed geometry ids ("1, 3, 5-8"), kept in step with ids picked in the viewer
function IdsInput({ ids, valid, onChange, label }) {
  const [text, setText] = useState(formatIdList(ids));
  const [bad, setBad] = useState([]);
  const key = ids.join(",");
  const last = useRef(key);
  useEffect(() => {
    if (key === last.current) return;
    last.current = key;
    setText(formatIdList(ids));
    setBad([]);
  }, [key]);
  return h(
    "span",
    { title: bad.length ? "Not in the model: " + bad.join(", ") : undefined, style: { display: "flex", flex: 1 } },
    h(TextInput, {
      value: text,
      label,
      wide: true,
      placeholder: "e.g. 1, 3, 5-8",
      invalid: bad.length > 0,
      onChange: (v) => {
        setText(v);
        const r = parseIdList(v, valid);
        setBad(r.bad);
        last.current = r.ids.join(",");
        onChange(r.ids);
      },
    }),
  );
}

// Editable grid lines of a grid-system entry: id, ordinate, shown; add and remove per axis
function GridEditor({ entry, onChange }) {
  const p = entry.params || {};
  const all = ["x", "y", "z"].flatMap((a) => (p[a] || []).map((g) => g.id));
  const update = (axis, list, key) => onChange({ ...p, [axis]: list }, key);
  return h(
    F,
    null,
    ["x", "y", "z"].map((axis) => {
      const lines = p[axis] || [];
      return h(
        "div",
        { key: axis, className: "sv-props__group" },
        h("div", { className: "sv-props__title overline sv-caps" }, axis.toUpperCase() + " grid lines"),
        lines.map((g, i) =>
          h(
            "div",
            { key: i, className: "sv-props__row", style: { gap: "var(--space-1)" } },
            h("input", { className: "sv-input ui", style: { maxWidth: 56 }, defaultValue: g.id, "aria-label": `${axis} grid line ${i + 1} id`, onChange: (e) => e.target.value.trim() && update(axis, lines.map((x, j) => (j === i ? { ...x, id: e.target.value.trim() } : x)), `${axis}${i}id`) }),
            h("input", {
              className: "sv-input data is-num",
              defaultValue: String(g.ordinate),
              "aria-label": `${axis} grid line ${g.id} ordinate`,
              onChange: (e) => {
                const v = asNumber(e.target.value);
                if (v !== null) update(axis, lines.map((x, j) => (j === i ? { ...x, ordinate: v } : x)), `${axis}${i}ord`);
              },
            }),
            h("span", { className: "caption sv-props__unit" }, "m"),
            h(SV.Checkbox, { defaultChecked: g.visible !== false, onChange: (v) => update(axis, lines.map((x, j) => (j === i ? { ...x, visible: v } : x))) }),
            h(SV.Button, { size: "sm", variant: "ghost", "aria-label": `Remove grid line ${g.id}`, title: "Remove", onClick: () => update(axis, lines.filter((_, j) => j !== i)) }, "×"),
          ),
        ),
        h(
          Actions,
          null,
          h(
            SV.Button,
            {
              size: "sm",
              variant: "secondary",
              onClick: () => {
                const last = lines[lines.length - 1];
                const prev = lines[lines.length - 2];
                const ordinate = last ? last.ordinate + (prev ? last.ordinate - prev.ordinate || 5 : 5) : 0;
                const first = axis === "x" ? "A" : axis === "y" ? "1" : "Z1";
                const id = last ? nextGridId(last.id, all) : all.includes(first) ? nextGridId(first, all) : first;
                update(axis, [...lines, { id, ordinate, visible: true, bubble: last?.bubble ?? (axis === "y" ? "start" : "end") }]);
              },
            },
            "Add " + axis.toUpperCase() + " line",
          ),
        ),
      );
    }),
  );
}

function App() {
  const [model, setModelState] = useState(initialModel);
  const [results, setResults] = useState(() => engine.getAll());
  const [pending, setPending] = useState(false);
  const [engineError, setEngineError] = useState(null);
  const [selId, setSelId] = useState(null);
  const [selection, setSelection] = useState(EMPTY_SELECTION);
  const [filter, setFilter] = useState({ point: true, line: true, polygon: true });
  const [hoverId, setHoverId] = useState(null);
  const [mode, setMode] = useState({ mode: "view", entry: null });
  const [activeLoad, setActiveLoad] = useState(() => engine.getAll().activeLoad);
  const [analysis, setAnalysis] = useState(() => engine.getAll().analysis);
  const [tab, setTab] = useState("reactions");
  const [display, setDisplay] = useState({ deformed: true, reactions: true, loads: true, loadLabels: true, scale: 1, diagram: "", diagramScale: 1, diagramLabels: true });
  const [view, setView] = useState(null); // null: 3D, else { plane, offset }
  const [diagram, setDiagram] = useState(null); // the drawn line result's { key, min, max } (viewer.diagramRange)
  const [layout, setLayout] = useState(loadLayout);
  const [version, setVersion] = useState(0);
  // Assign panel forms
  const [loadForm, setLoadForm] = useState({ type: "point-load", loadCase: "", Fx: "0", Fy: "0", Fz: "-10", Mx: "0", My: "0", Mz: "0", w: "-10", direction: "global-z" });
  const [supportType, setSupportType] = useState("fixed");
  const [releaseType, setReleaseType] = useState("both-ends");
  const [section, setSection] = useState("");
  const [other, setOther] = useState({ field: "mesh", templateId: "", params: {} });

  const host = useRef(null);
  const viewer = useRef(null);
  const modelRef = useRef(model);
  const history = useRef([]);
  const coalesce = useRef(null);
  const activeLoadRef = useRef(activeLoad);
  activeLoadRef.current = activeLoad;
  const latest = useRef({});
  // The inspector remounts (refreshing its inputs) on a new selection or an outside edit,
  // but not when renaming a case or combination changes its id under the cursor
  const inspector = useRef({ sel: null, n: 0, renaming: false });
  if (selId !== inspector.current.sel) {
    if (!inspector.current.renaming) inspector.current.n++;
    inspector.current.sel = selId;
    inspector.current.renaming = false;
  }

  // Record an edit. Edits with a coalesce key (typing in the inspector) merge into one undo step.
  function commit(next, key) {
    const now = Date.now();
    const merge = key && coalesce.current && coalesce.current.key === key && now - coalesce.current.t < 1500;
    if (!merge) history.current.push(modelRef.current);
    if (history.current.length > 200) history.current.shift();
    coalesce.current = key ? { key, t: now } : null;
    modelRef.current = next;
    setModelState(next);
    if (!key) setVersion((v) => v + 1);
  }

  function undo() {
    const prev = history.current.pop();
    if (!prev) return;
    coalesce.current = null;
    modelRef.current = prev;
    setModelState(prev);
    setVersion((v) => v + 1);
  }

  // One item (tree, table, viewer click): a geometry item also becomes the multi-selection
  function select(id) {
    setSelId(id);
    const p = id && UI.parseId(id);
    setSelection(p && KINDS.includes(p.kind) ? { ...EMPTY_SELECTION, [p.kind]: [p.id] } : EMPTY_SELECTION);
    if (mode.mode === "assign" && id !== mode.entry) setMode({ mode: "view", entry: null });
  }

  // The multi-selection (Shift+click / Shift+drag in the viewer, typed ids in the Assign panel)
  function changeSelection(next) {
    const sel = { ...EMPTY_SELECTION, ...next };
    setSelection(sel);
    const all = KINDS.flatMap((k) => sel[k].map((id) => k + "-" + id));
    setSelId(all.length === 1 ? all[0] : null);
  }

  latest.current = { model, mode, commit, select, changeSelection, summary: null };

  // ---------- viewer ----------
  useEffect(() => {
    viewer.current = createViewer(host.current, initialModel, {
      geometryKind: kindOf,
      workPlane,
      workPlaneOffset,
      onSelect: (id) => latest.current.select(id),
      onSelectionChange: (sel) => latest.current.changeSelection(sel),
      onHover: setHoverId,
      hoverInfo: (id) => hoverText(id, latest.current.summary),
      onModeExit: () => setMode({ mode: "view", entry: null }),
      onAssign: (ids, add) => {
        const { model, mode, commit } = latest.current;
        const p = mode.entry && UI.parseId(mode.entry);
        if (!p || p.kind !== "entry") return;
        commit(assignGeometry(model, p.field, p.index, ids, add));
      },
      onEdit: (op) => {
        const { model, commit } = latest.current;
        const { model: next, created } = applyEdit(model, op, kindOf);
        commit(next);
        if (created) latest.current.select(created);
        else if (op.type === "move-point") latest.current.select("point-" + op.id);
      },
    });
    viewer.current.setLoadSelection(activeLoadRef.current);
    if (window.onViewerReady) window.onViewerReady(host.current, viewer.current);
    const unsubscribe = engine.subscribe((r) => {
      setResults(r);
      setPending(false);
    });
    return () => {
      unsubscribe();
      viewer.current.dispose();
    };
  }, []);

  // Every model change: redraw, re-run the analysis, autosave
  const firstRun = useRef(true);
  useEffect(() => {
    viewer.current?.setModel(model);
    save(model);
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    // The toolbar's load selection is the source of truth; it falls back to all
    // loads when its case or combination was deleted
    let want = activeLoadRef.current;
    if (want && !model.loadCases.includes(want) && !model.loadCombinations.some((c) => c.name === want)) {
      want = null;
      setActiveLoad(null);
    }
    try {
      engine.setModel({ ...model, ...extra });
      engine.setActiveLoad(want);
      setEngineError(null);
      setPending(true);
    } catch (e) {
      setEngineError(e instanceof Error ? e.message : String(e));
    }
  }, [model]);

  // Drop selected ids that no longer exist (deleted geometry, undo)
  useEffect(() => {
    const exists = { point: new Set(model.points.map(([id]) => id)), line: new Set(model.lines.map(([id]) => id)), polygon: new Set(model.polygons.map(([id]) => id)) };
    if (KINDS.some((k) => selection[k].some((id) => !exists[k].has(id))))
      setSelection((s) => Object.fromEntries(KINDS.map((k) => [k, s[k].filter((id) => exists[k].has(id))])));
  }, [model]);

  useEffect(() => viewer.current?.select(mode.mode === "assign" ? mode.entry : selId), [selId, mode]);
  useEffect(() => viewer.current?.setSelection(mode.mode === "assign" ? EMPTY_SELECTION : selection), [selection, mode]);
  useEffect(() => viewer.current?.setSelectionFilter(filter), [filter]);
  useEffect(() => {
    const p = mode.entry && UI.parseId(mode.entry);
    const entry = p && p.kind === "entry" ? model[p.field]?.[p.index] : null;
    viewer.current?.setMode(mode.mode, { kind: entry ? kindOf(entry) : undefined });
  }, [mode]);
  useEffect(() => viewer.current?.setLoadSelection(activeLoad), [activeLoad]);
  useEffect(() => viewer.current?.setDisplay({ loads: display.loads, loadLabels: display.loadLabels }), [display.loads, display.loadLabels]);
  useEffect(() => viewer.current?.setView(view), [view?.plane, view?.offset]);
  useEffect(() => {
    const ok = results.status?.success;
    viewer.current?.setResults(
      ok
        ? { nodes: results.nodes, elements: results.elements, displacements: results.displacements, reactions: results.reactions, internalForces: results.internalForces, lineToElements: results.geometryMapping?.lineToElements }
        : null,
      { deformed: display.deformed, reactions: display.reactions, scale: display.scale, diagram: display.diagram || null, diagramScale: display.diagramScale, diagramLabels: display.diagramLabels },
    );
    setDiagram(viewer.current?.diagramRange() ?? null);
  }, [results, display.deformed, display.reactions, display.scale, display.diagram, display.diagramScale, display.diagramLabels]);

  useEffect(() => {
    try {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
    } catch {}
  }, [layout]);

  const setCollapsed = (region, value) => setLayout((l) => ({ ...l, collapsed: { ...l.collapsed, [region]: value } }));
  const setPanel = (name, value) => setLayout((l) => ({ ...l, panels: { ...l.panels, [name]: value } }));
  const setGroup = (name, value) => setLayout((l) => ({ ...l, groups: { ...l.groups, [name]: value } }));
  const groupOpen = (name) => layout.groups[name] !== false;
  const maximised = layout.collapsed.left && layout.collapsed.right && layout.collapsed.bottom;
  function toggleMaximise() {
    const v = !maximised;
    setLayout((l) => ({ ...l, collapsed: { left: v, right: v, bottom: v } }));
  }
  const toggleMaximiseRef = useRef(toggleMaximise);
  toggleMaximiseRef.current = toggleMaximise;

  // Ctrl+Z undoes and M maximises the view (outside text fields, which keep their own keys)
  useEffect(() => {
    const onKey = (ev) => {
      const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(ev.target.tagName);
      if (typing) return;
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "z" && !ev.shiftKey) {
        ev.preventDefault();
        undo();
      } else if (!ev.ctrlKey && !ev.metaKey && !ev.altKey && ev.key.toLowerCase() === "m") {
        ev.preventDefault();
        toggleMaximiseRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const summary = useMemo(() => summarize(results, model), [results]);
  latest.current.summary = summary;

  // ---------- load selection and analysis ----------
  function chooseLoad(value) {
    const name = value || null;
    try {
      engine.setActiveLoad(name);
      setActiveLoad(name);
      setPending(true);
    } catch (e) {
      setEngineError(e instanceof Error ? e.message : String(e));
    }
  }

  function chooseAnalysis(value) {
    engine.setAnalysis(value);
    setAnalysis(value);
    setPending(true);
  }

  // ---------- plane views ----------
  // Where a plane can sit: grid ordinates on its normal axis, then the points' own coordinates
  function planeLocations(plane) {
    const axis = PLANE_NORMAL[plane];
    const out = new Map();
    model.gridLines.forEach((e) => (e.params?.[axis] || []).forEach((g) => typeof g.ordinate === "number" && !out.has(g.ordinate) && out.set(g.ordinate, g.id)));
    model.points.forEach(([, p]) => {
      const v = Math.round((p[AXIS[axis]] ?? 0) * 1e6) / 1e6;
      if (!out.has(v)) out.set(v, null);
    });
    return [...out.entries()].sort((a, b) => a[0] - b[0]).map(([value, id]) => ({ value, id }));
  }

  // Open a plane at the location holding the most lines (the busiest level or frame)
  function choosePlane(plane) {
    if (!plane) return setView(null);
    if (view?.plane === plane) return;
    const axis = AXIS[PLANE_NORMAL[plane]];
    const pts = new Map(model.points);
    const locs = planeLocations(plane);
    let best = plane === workPlane ? workPlaneOffset : locs[0]?.value ?? 0;
    let bestCount = -1;
    locs.forEach(({ value }) => {
      const count = model.lines.filter(([, [a, b]]) => [a, b].every((id) => Math.abs((pts.get(id)?.[axis] ?? NaN) - value) < 1e-6)).length;
      if (count > bestCount) [best, bestCount] = [value, count];
    });
    setView({ plane, offset: best });
  }

  function stepPlane(dir) {
    if (!view) return;
    const locs = planeLocations(view.plane).map((l) => l.value);
    const next = dir > 0 ? locs.find((v) => v > view.offset + 1e-9) : [...locs].reverse().find((v) => v < view.offset - 1e-9);
    if (next !== undefined) setView({ ...view, offset: next });
  }

  // ---------- creating and deleting ----------
  function addItem(value) {
    if (!value) return;
    if (value === "case") {
      const name = uniqueName(allNames(model), "Case");
      commit({ ...model, loadCases: [...model.loadCases, name] });
      select("case-" + name);
      return;
    }
    if (value === "combo") {
      const name = uniqueName(allNames(model), "Combination");
      const factors = Object.fromEntries(model.loadCases.map((n) => [n, 1]));
      commit({ ...model, loadCombinations: [...model.loadCombinations, { name, factors }] });
      select("combo-" + name);
      return;
    }
    const [field, templateId] = value.split("|");
    const entry = {
      name: uniqueName(allNames(model), templateLabel(templateId)),
      templateId,
      geometry: [],
      params: templateId === "grid-system" ? { x: [], y: [], z: [] } : primitiveDefaults(templateId),
    };
    if (field === "loads") {
      const loadCase = model.loadCases.includes(activeLoad) ? activeLoad : model.loadCases[0];
      if (loadCase) entry.loadCase = loadCase;
    }
    // Start with what is selected, when it is the geometry the entry takes
    const kind = kindOf(entry);
    if (kind && selection[kind].length) entry.geometry = [...selection[kind]];
    const next = { ...model, [field]: [...model[field], entry] };
    commit(next);
    const id = field + "-" + (next[field].length - 1);
    select(id);
    if (kind && !entry.geometry.length) setMode({ mode: "assign", entry: id });
  }

  function deleteSelected() {
    const p = UI.parseId(selId);
    if (!p) return;
    if (p.kind === "entry") commit({ ...model, [p.field]: model[p.field].filter((_, i) => i !== p.index) });
    else if (p.kind === "combo") commit({ ...model, loadCombinations: model.loadCombinations.filter((c) => c.name !== p.name) });
    else if (p.kind === "case")
      commit({
        ...model,
        loadCases: model.loadCases.filter((n) => n !== p.name),
        loadCombinations: model.loadCombinations.map((c) => {
          const factors = { ...c.factors };
          delete factors[p.name];
          return { ...c, factors };
        }),
      });
    else if (p.kind === "point") commit(applyEdit(model, { type: "delete-point", id: p.id }, kindOf).model);
    else if (p.kind === "line") commit(applyEdit(model, { type: "delete-line", id: p.id }, kindOf).model);
    else if (p.kind === "polygon") commit({ ...model, polygons: model.polygons.filter(([id]) => id !== p.id) });
    select(null);
    setMode({ mode: "view", entry: null });
  }

  // Delete every selected point, line and polygon (with what hangs off them)
  function deleteSelection() {
    let next = model;
    selection.polygon.forEach((id) => (next = { ...next, polygons: next.polygons.filter(([g]) => g !== id) }));
    selection.line.forEach((id) => (next = applyEdit(next, { type: "delete-line", id }, kindOf).model));
    selection.point.forEach((id) => (next = applyEdit(next, { type: "delete-point", id }, kindOf).model));
    commit(next);
    select(null);
  }

  // ---------- assigning to the selection ----------
  const caseOptions = [...model.loadCases.map((n) => ({ value: n, label: n })), { value: "__new", label: "New load case…" }];
  const loadCase = model.loadCases.includes(loadForm.loadCase) ? loadForm.loadCase : model.loadCases.includes(activeLoad) ? activeLoad : model.loadCases[0] ?? "";
  const loadType = selection.point.length && !selection.line.length ? "point-load" : selection.line.length && !selection.point.length ? "distributed-load" : loadForm.type;
  const loadKind = loadType === "point-load" ? "point" : "line";

  function chooseLoadCase(value) {
    if (value !== "__new") return setLoadForm((f) => ({ ...f, loadCase: value }));
    const name = uniqueName(allNames(model), "Case");
    commit({ ...model, loadCases: [...model.loadCases, name] });
    setLoadForm((f) => ({ ...f, loadCase: name }));
  }

  function loadParams() {
    if (loadType === "point-load") {
      const out = {};
      for (const k of POINT_LOAD_KEYS) {
        const v = asNumber(loadForm[k]);
        if (v === null) return null;
        out[k] = v;
      }
      return out;
    }
    const w = asNumber(loadForm.w);
    return w === null ? null : { w, direction: loadForm.direction };
  }

  function applyLoad(how) {
    const ids = selection[loadKind];
    if (!ids.length) return;
    let next = model;
    let lc = loadCase;
    if (!lc) {
      lc = uniqueName(allNames(model), "Case");
      next = { ...next, loadCases: [...next.loadCases, lc] };
    }
    if (how === "remove") return commit(removeLoads(next, { templateId: loadType, loadCase: lc, ids }, kindOf));
    const params = loadParams();
    if (!params) return;
    const r = assignLoad(next, { templateId: loadType, loadCase: lc, params, ids, replace: how === "replace", name: (loadType === "point-load" ? "Point load" : "Distributed load") + " " + lc, paramsOf }, kindOf);
    commit(r.model);
  }

  // Supports, releases: one type per item; "" removes
  function applyTyped(field, templateId, kind, type) {
    if (selection[kind].length) applyTypedTo(field, templateId, kind, selection[kind], type);
  }

  const sectionKind = selection.line.length ? "line" : selection.polygon.length ? "polygon" : null;
  const designTemplates = [...templatesOf("design").keys()].filter((id) => primitiveKind(id) === sectionKind);
  function primitiveKind(templateId) {
    return kindOf({ templateId });
  }
  const sectionOptions = sectionKind
    ? [
        ...model.design.map((e, i) => (kindOf(e) === sectionKind ? { value: String(i), label: e.name } : null)).filter(Boolean),
        ...designTemplates.map((id) => ({ value: "new|" + id, label: "New " + templateLabel(id) + "…" })),
      ]
    : [];
  const sectionValue = sectionOptions.some((o) => o.value === section) ? section : sectionOptions[0]?.value ?? "";

  function applySection() {
    if (!sectionKind || !sectionValue) return;
    const ids = selection[sectionKind];
    let next = model;
    let index;
    if (sectionValue.startsWith("new|")) {
      const templateId = sectionValue.slice(4);
      next = { ...model, design: [...model.design, { name: uniqueName(allNames(model), templateLabel(templateId)), templateId, geometry: [], params: primitiveDefaults(templateId) }] };
      index = next.design.length - 1;
      setSection(String(index));
    } else index = Number(sectionValue);
    commit(assignToEntry(next, "design", index, ids, sectionKind, kindOf, true).model);
  }

  // Mesh, local axes, imperfections: any template of the field, with its parameters
  const OTHER_FIELDS = ["mesh", "localAxes", "imperfections"].filter((f) => templatesOf(f).size);
  const otherField = OTHER_FIELDS.includes(other.field) ? other.field : OTHER_FIELDS[0];
  const otherTemplates = otherField ? [...templatesOf(otherField).keys()] : [];
  const otherTemplate = otherTemplates.includes(other.templateId) ? other.templateId : otherTemplates[0];
  const otherKind = otherTemplate ? primitiveKind(otherTemplate) : null;
  const otherDefaults = otherTemplate ? primitiveDefaults(otherTemplate) : {};
  const otherValue = (k) => (other.templateId === otherTemplate && other.params[k] !== undefined ? other.params[k] : otherDefaults[k]);
  function applyOther(remove) {
    const ids = otherKind ? selection[otherKind] : [];
    if (!ids.length) return;
    if (remove) return commit(unassignFromField(model, otherField, ids, otherKind, kindOf, (e) => e.templateId === otherTemplate));
    const params = {};
    for (const [k, d] of Object.entries(otherDefaults)) {
      const v = otherValue(k);
      if (typeof d === "number") {
        const n = asNumber(String(v));
        if (n === null) return;
        params[k] = n;
      } else params[k] = typeof d === "boolean" ? !!v : v;
    }
    commit(assignToField(model, otherField, { templateId: otherTemplate, params, ids, kind: otherKind, exclusive: true, name: templateLabel(otherTemplate), paramsOf }, kindOf).model);
  }

  // ---------- inspector edits ----------
  function onInspectorChange(key, value) {
    const p = UI.parseId(selId);
    if (!p) return;
    const coalesceKey = selId + "|" + key;

    // Loads shown on a point or line: __load:<index>:<param>
    if (key.startsWith("__load:")) {
      const [, i, param] = key.split(":");
      const v = asNumber(value);
      if (v === null) return;
      commit({ ...model, loads: model.loads.map((e, j) => (j === Number(i) ? { ...e, params: { ...e.params, [param]: v } } : e)) }, coalesceKey);
      return;
    }

    if (p.kind === "point") {
      if (key === "__support") return applyTypedTo("supports", "point-support", "point", [p.id], value);
      const axis = { __x: 0, __y: 1, __z: 2 }[key];
      const v = asNumber(value);
      if (axis === undefined || v === null) return;
      commit(
        { ...model, points: model.points.map(([id, pt]) => [id, id === p.id ? pt.map((c, i) => (i === axis ? v : c)) : pt]) },
        coalesceKey,
      );
      return;
    }

    if (p.kind === "line") {
      if (key === "__start" || key === "__end") {
        const pid = Number(value);
        const line = model.lines.find(([id]) => id === p.id)?.[1];
        if (!line) return;
        const next = key === "__start" ? [pid, line[1]] : [line[0], pid];
        if (next[0] === next[1]) return;
        commit({ ...model, lines: model.lines.map(([id, l]) => [id, id === p.id ? next : l]) });
      } else if (key === "__design") {
        if (value === "") return commit(unassignFromField(model, "design", [p.id], "line", kindOf));
        commit(assignToEntry(model, "design", Number(value), [p.id], "line", kindOf, true).model);
      } else if (key === "__release") applyTypedTo("releases", "releases", "line", [p.id], value);
      else if (key === "__mesh") {
        const n = asNumber(value);
        if (n === null || n < 1) return;
        commit(assignToField(model, "mesh", { templateId: "line-mesh", params: { divisions: Math.round(n) }, ids: [p.id], kind: "line", exclusive: true, name: "Line mesh", paramsOf }, kindOf).model, coalesceKey);
      }
      return;
    }

    if (p.kind === "polygon") {
      if (key === "__polygon") {
        const valid = new Set(model.points.map(([id]) => id));
        const ring = String(value).split(/[\s,;]+/).filter(Boolean).map(Number);
        if (ring.length < 3 || ring.some((id) => !valid.has(id)) || new Set(ring).size !== ring.length) return;
        commit({ ...model, polygons: model.polygons.map(([id, r]) => [id, id === p.id ? ring : r]) }, coalesceKey);
      } else if (key === "__design") {
        if (value === "") return commit(unassignFromField(model, "design", [p.id], "polygon", kindOf));
        commit(assignToEntry(model, "design", Number(value), [p.id], "polygon", kindOf, true).model);
      }
      return;
    }

    if (key === "__name") {
      const name = String(value).trim();
      if (!name) return;
      if (p.kind === "case") {
        if (allNames(model).includes(name)) return;
        commit(renameLoadCase(model, p.name, name), coalesceKey + name);
        if (activeLoad === p.name) setActiveLoad(name);
        inspector.current.renaming = true;
        setSelId("case-" + name);
      } else if (p.kind === "combo") {
        if (allNames(model).includes(name)) return;
        commit(
          { ...model, loadCombinations: model.loadCombinations.map((c) => (c.name === p.name ? { ...c, name } : c)) },
          coalesceKey + name,
        );
        if (activeLoad === p.name) setActiveLoad(name);
        inspector.current.renaming = true;
        setSelId("combo-" + name);
      } else if (p.kind === "entry") {
        commit({ ...model, [p.field]: model[p.field].map((e, i) => (i === p.index ? { ...e, name } : e)) }, coalesceKey);
      }
      return;
    }

    if (p.kind === "combo") {
      const v = asNumber(value);
      if (v === null) return;
      commit(
        {
          ...model,
          loadCombinations: model.loadCombinations.map((c) =>
            c.name === p.name ? { ...c, factors: { ...c.factors, [key]: v } } : c,
          ),
        },
        coalesceKey,
      );
      return;
    }

    if (p.kind !== "entry") return;
    const entry = model[p.field][p.index];
    if (!entry) return;
    let next;
    if (key === "loadCase") next = { ...entry, loadCase: value };
    else if (key === "__geometry") {
      const kind = kindOf(entry);
      const valid = model[kind + "s"].map(([id]) => id);
      next = { ...entry, geometry: parseIdList(value, valid).ids };
    } else if (key === "__template") {
      if (value === entry.templateId) return;
      // A different kind of geometry cannot keep the ids
      const sameKind = primitiveKind(value) === kindOf(entry);
      commit({ ...model, [p.field]: model[p.field].map((e, i) => (i === p.index ? { ...e, templateId: value, params: primitiveDefaults(value), geometry: sameKind ? e.geometry : [] } : e)) });
      return;
    } else {
      const current = { ...primitiveDefaults(entry.templateId), ...entry.params }[key];
      let v = value;
      if (typeof current === "number") {
        v = asNumber(value);
        if (v === null) return;
      }
      next = { ...entry, params: { ...entry.params, [key]: v } };
    }
    commit({ ...model, [p.field]: model[p.field].map((e, i) => (i === p.index ? next : e)) }, coalesceKey);
  }

  function applyTypedTo(field, templateId, kind, ids, type) {
    if (!type) return commit(unassignFromField(model, field, ids, kind, kindOf, (e) => e.templateId === templateId));
    const name = UI.humanize(type) + (field === "supports" ? " support" : " release");
    commit(assignToField(model, field, { templateId, params: { type }, ids, kind, exclusive: true, name, paramsOf }, kindOf).model);
  }

  // ---------- regions ----------
  const loadOptions = [{ value: "", label: "All loads" }, ...UI.loadSelectionOptions(model)];
  const editing = mode.mode === "edit";

  const toolbar = h(
    F,
    null,
    h("img", { src: logoUrl, alt: "", style: { height: "var(--space-5)", width: "auto" } }),
    h("span", { className: "h3", style: { whiteSpace: "nowrap" } }, modelName),
    h("span", { className: "sv-toolbar__sep" }),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: analysis === "linear", onClick: () => chooseAnalysis("linear") }, "Linear"),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: analysis === "nonlinear", onClick: () => chooseAnalysis("nonlinear") }, "Nonlinear"),
    h(SV.Select, { "aria-label": "Load selection", options: loadOptions, value: activeLoad ?? "", onChange: chooseLoad }),
    h("span", { className: "sv-toolbar__sep" }),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: !editing, onClick: () => setMode({ mode: "view", entry: null }) }, "Select"),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: editing, onClick: () => setMode({ mode: editing ? "view" : "edit", entry: null }) }, "Edit geometry"),
    h("span", { className: "sv-toolbar__spacer" }),
    h(SV.Button, { size: "sm", variant: "ghost", disabled: !history.current.length, onClick: undo }, "Undo"),
    h(SV.Button, { size: "sm", variant: "ghost", onClick: () => viewer.current?.fit() }, "Fit view"),
    h("span", { className: "sv-toolbar__sep" }),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: !layout.collapsed.left, title: "Show or hide the model tree", onClick: () => setCollapsed("left", !layout.collapsed.left) }, "Tree"),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: !layout.collapsed.bottom, title: "Show or hide the results", onClick: () => setCollapsed("bottom", !layout.collapsed.bottom) }, "Results"),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: !layout.collapsed.right, title: "Show or hide the assign panel and inspector", onClick: () => setCollapsed("right", !layout.collapsed.right) }, "Inspector"),
    h(SV.Button, { size: "sm", variant: "ghost", pressed: maximised, title: "Hide every panel (M)", onClick: toggleMaximise }, maximised ? "Restore" : "Maximise"),
    h("span", { className: "sv-toolbar__sep" }),
    h(
      SV.Button,
      {
        size: "sm",
        variant: "ghost",
        onClick: () => {
          const r = document.documentElement;
          r.dataset.theme = r.dataset.theme === "dark" ? "light" : "dark";
        },
      },
      "Theme",
    ),
  );

  // Model tree, with an "Add" menu for load cases, combinations and component entries
  const tree = UI.buildTree(model);
  const addOptions = [
    { value: "", label: "Add" },
    { label: "Loading", options: [{ value: "case", label: "Load case" }, ...(model.loadCases.length ? [{ value: "combo", label: "Load combination" }] : [])] },
    ...COMPONENT_FIELDS.map((f) => ({
      label: FIELD_LABELS[f],
      options: [...templatesOf(f).keys()].map((id) => ({ value: f + "|" + id, label: templateLabel(id) })),
    })).filter((g) => g.options.length),
  ];
  const left = h(
    SV.Panel,
    {
      title: "Model",
      flush: true,
      actions: h(
        F,
        null,
        h(SV.Select, { "aria-label": "Add to model", options: addOptions, value: "", onChange: addItem }),
        h(CollapseButton, { dir: "left", label: "Hide model tree", onClick: () => setCollapsed("left", true) }),
      ),
    },
    h(SV.TreeView, {
      key: tree.map((g) => g.id).join(","),
      nodes: tree,
      selectedId: mode.mode === "assign" ? mode.entry : selId,
      defaultExpanded: tree.map((g) => g.id).filter((id) => id !== "geometry"),
      onSelect: (id) => select(id),
    }),
  );

  // ---------- Assign panel: the selection, then what to give it ----------
  const valid = { point: model.points.map(([id]) => id), line: model.lines.map(([id]) => id), polygon: model.polygons.map(([id]) => id) };
  const selCount = KINDS.reduce((n, k) => n + selection[k].length, 0);
  const kindsShown = KINDS.filter((k) => k !== "polygon" || model.polygons.length);
  const num4 = (k, unit) =>
    h(Row, { key: k, label: k, unit }, h(TextInput, { numeric: true, label: k, value: loadForm[k], invalid: asNumber(loadForm[k]) === null, onChange: (v) => setLoadForm((f) => ({ ...f, [k]: v })) }));

  const assignBody = h(
    F,
    null,
    h(
      Section,
      { title: "Selection", open: groupOpen("a:selection"), onToggle: (v) => setGroup("a:selection", v) },
      kindsShown.map((k) =>
        h(Row, { key: k, label: KIND_LABEL[k] }, h(IdsInput, { ids: selection[k], valid: valid[k], label: KIND_LABEL[k] + " ids", onChange: (ids) => changeSelection({ ...selection, [k]: ids }) })),
      ),
      h(
        Row,
        { label: "Pick in view" },
        h(
          "span",
          { style: { display: "flex", flexWrap: "wrap", gap: "var(--space-2)", justifyContent: "flex-end" } },
          kindsShown.map((k) => h(SV.Checkbox, { key: k, checked: filter[k], onChange: (v) => setFilter((f) => ({ ...f, [k]: v })) }, KIND_LABEL[k])),
        ),
      ),
      h(
        Actions,
        null,
        h(SV.Button, { size: "sm", variant: "secondary", onClick: () => changeSelection({ point: valid.point, line: [], polygon: [] }) }, "All points"),
        h(SV.Button, { size: "sm", variant: "secondary", onClick: () => changeSelection({ point: [], line: valid.line, polygon: [] }) }, "All lines"),
        h(SV.Button, { size: "sm", variant: "ghost", disabled: !selCount, onClick: () => select(null) }, "Clear"),
        h(SV.Button, { size: "sm", variant: "danger", disabled: !selCount, onClick: deleteSelection }, "Delete"),
      ),
      h(Hint, null, "Shift+click toggles an item in the view; Shift+drag left to right adds, right to left removes. Or type ids."),
    ),
    h(
      Section,
      { title: "Loads", open: groupOpen("a:loads"), onToggle: (v) => setGroup("a:loads", v) },
      selection.point.length && selection.line.length
        ? h(
            Row,
            { label: "Type" },
            h(SV.Select, {
              "aria-label": "Load type",
              options: [{ value: "point-load", label: "Point load (points)" }, { value: "distributed-load", label: "Distributed load (lines)" }],
              value: loadType,
              onChange: (v) => setLoadForm((f) => ({ ...f, type: v })),
            }),
          )
        : !selCount
          ? h(
              Row,
              { label: "Type" },
              h(SV.Select, {
                "aria-label": "Load type",
                options: [{ value: "point-load", label: "Point load" }, { value: "distributed-load", label: "Distributed load" }],
                value: loadType,
                onChange: (v) => setLoadForm((f) => ({ ...f, type: v })),
              }),
            )
          : h(Row, { label: "Type" }, h("span", { className: "ui sv-props__value" }, loadType === "point-load" ? "Point load" : "Distributed load (UDL)")),
      h(Row, { label: "Load case" }, h(SV.Select, { "aria-label": "Load case", options: caseOptions, value: loadCase || "__new", onChange: chooseLoadCase })),
      loadType === "point-load"
        ? POINT_LOAD_KEYS.map((k) => num4(k, k.startsWith("F") ? "kN" : "kN·m"))
        : h(
            F,
            null,
            num4("w", "kN/m"),
            h(Row, { label: "Direction" }, h(SV.Select, { "aria-label": "Direction", options: UDL_DIRECTIONS.map((v) => ({ value: v, label: UI.humanize(v) })), value: loadForm.direction, onChange: (v) => setLoadForm((f) => ({ ...f, direction: v })) })),
          ),
      h(
        Actions,
        null,
        h(SV.Button, { size: "sm", variant: "primary", disabled: !selection[loadKind].length || !loadParams(), onClick: () => applyLoad("add") }, "Add"),
        h(SV.Button, { size: "sm", variant: "secondary", disabled: !selection[loadKind].length || !loadParams(), title: "Replace this case's " + (loadKind === "point" ? "point" : "distributed") + " loads on the selection", onClick: () => applyLoad("replace") }, "Replace"),
        h(SV.Button, { size: "sm", variant: "ghost", disabled: !selection[loadKind].length, title: "Remove this case's loads of this type from the selection", onClick: () => applyLoad("remove") }, "Remove"),
      ),
      h(Hint, null, selection[loadKind].length ? `Applies to ${selection[loadKind].length} ${KIND_LABEL[loadKind].toLowerCase()}. Gravity is a negative ${loadType === "point-load" ? "Fz" : "w on global z"}.` : `Select ${KIND_LABEL[loadKind].toLowerCase()} to load.`),
    ),
    h(
      Section,
      { title: "Support", open: groupOpen("a:support"), onToggle: (v) => setGroup("a:support", v) },
      h(Row, { label: "Type" }, h(SV.Select, { "aria-label": "Support type", options: SUPPORT_TYPES.map((v) => ({ value: v, label: UI.humanize(v) })), value: supportType, onChange: setSupportType })),
      h(
        Actions,
        null,
        h(SV.Button, { size: "sm", variant: "primary", disabled: !selection.point.length, onClick: () => applyTyped("supports", "point-support", "point", supportType) }, "Assign to " + selection.point.length + " points"),
        h(SV.Button, { size: "sm", variant: "ghost", disabled: !selection.point.length, onClick: () => applyTyped("supports", "point-support", "point", "") }, "Remove"),
      ),
    ),
    h(
      Section,
      { title: "Section", open: groupOpen("a:section"), onToggle: (v) => setGroup("a:section", v) },
      sectionKind
        ? h(
            F,
            null,
            h(Row, { label: "Design member" }, h(SV.Select, { "aria-label": "Design member", options: sectionOptions, value: sectionValue, onChange: setSection })),
            h(Actions, null, h(SV.Button, { size: "sm", variant: "primary", onClick: applySection }, "Assign to " + selection[sectionKind].length + " " + KIND_LABEL[sectionKind].toLowerCase())),
            h(Hint, null, "Each line has one design member: assigning moves it from its current one. Edit the member's properties by selecting it in the tree."),
          )
        : h(Hint, null, "Select lines or polygons to assign a section."),
    ),
    h(
      Section,
      { title: "Release", open: groupOpen("a:release"), onToggle: (v) => setGroup("a:release", v) },
      h(Row, { label: "Type" }, h(SV.Select, { "aria-label": "Release type", options: RELEASE_TYPES.map((v) => ({ value: v, label: UI.humanize(v) })), value: releaseType, onChange: setReleaseType })),
      h(
        Actions,
        null,
        h(SV.Button, { size: "sm", variant: "primary", disabled: !selection.line.length, onClick: () => applyTyped("releases", "releases", "line", releaseType) }, "Assign to " + selection.line.length + " lines"),
        h(SV.Button, { size: "sm", variant: "ghost", disabled: !selection.line.length, onClick: () => applyTyped("releases", "releases", "line", "") }, "Remove"),
      ),
    ),
    otherField
      ? h(
          Section,
          { title: "Mesh and other", open: groupOpen("a:other"), onToggle: (v) => setGroup("a:other", v) },
          h(Row, { label: "Component" }, h(SV.Select, { "aria-label": "Component", options: OTHER_FIELDS.map((f) => ({ value: f, label: FIELD_LABELS[f] })), value: otherField, onChange: (v) => setOther({ field: v, templateId: "", params: {} }) })),
          otherTemplates.length > 1 ? h(Row, { label: "Template" }, h(SV.Select, { "aria-label": "Template", options: otherTemplates.map((id) => ({ value: id, label: templateLabel(id) })), value: otherTemplate, onChange: (v) => setOther({ field: otherField, templateId: v, params: {} }) })) : null,
          Object.entries(otherDefaults).map(([k, d]) =>
            h(
              Row,
              { key: otherTemplate + k, label: UI.humanize(k), unit: UI.UNITS[k] },
              typeof d === "boolean"
                ? h(SV.Checkbox, { checked: !!otherValue(k), onChange: (v) => setOther({ field: otherField, templateId: otherTemplate, params: { ...(other.templateId === otherTemplate ? other.params : {}), [k]: v } }) })
                : UI.ENUMS[otherTemplate + "." + k]
                  ? h(SV.Select, { "aria-label": k, options: UI.ENUMS[otherTemplate + "." + k].map((v) => ({ value: v, label: UI.humanize(v) })), value: String(otherValue(k)), onChange: (v) => setOther({ field: otherField, templateId: otherTemplate, params: { ...(other.templateId === otherTemplate ? other.params : {}), [k]: typeof d === "number" ? Number(v) : v } }) })
                  : h(TextInput, { numeric: typeof d === "number", label: k, value: String(otherValue(k)), onChange: (v) => setOther({ field: otherField, templateId: otherTemplate, params: { ...(other.templateId === otherTemplate ? other.params : {}), [k]: v } }) }),
            ),
          ),
          h(
            Actions,
            null,
            h(SV.Button, { size: "sm", variant: "primary", disabled: !otherKind || !selection[otherKind].length, onClick: () => applyOther(false) }, "Assign to " + (otherKind ? selection[otherKind].length + " " + KIND_LABEL[otherKind].toLowerCase() : "")),
            h(SV.Button, { size: "sm", variant: "ghost", disabled: !otherKind || !selection[otherKind].length, onClick: () => applyOther(true) }, "Remove"),
          ),
        )
      : null,
  );

  const assignPanel = h(
    SV.Panel,
    { title: "Assign", flush: true, collapsible: true, open: layout.panels.assign, onToggle: (v) => setPanel("assign", v), actions: h(CollapseButton, { dir: "right", label: "Hide inspector", onClick: () => setCollapsed("right", true) }) },
    assignBody,
  );

  const inspectorPanel = h(
    SV.Panel,
    { title: "Inspector", flush: true, collapsible: true, open: layout.panels.inspector, onToggle: (v) => setPanel("inspector", v) },
    inspectorBody(),
  );

  const right = h(F, null, assignPanel, inspectorPanel);

  // Rows for the loads on one point or line, editable in place
  function loadRows(kind, id) {
    const rows = [];
    model.loads.forEach((e, i) => {
      if (kindOf(e) !== kind || !e.geometry.includes(id)) return;
      const params = paramsOf(e);
      const keys = e.templateId === "point-load" ? POINT_LOAD_KEYS.filter((k) => params[k]) : e.templateId === "distributed-load" ? ["w"] : Object.keys(params).filter((k) => typeof params[k] === "number");
      const shared = e.geometry.length > 1 ? ` · ${e.geometry.length} ${KIND_LABEL[kind].toLowerCase()}` : "";
      (keys.length ? keys : ["Fz"]).forEach((k) =>
        rows.push({ label: `${e.name} (${e.loadCase ?? model.loadCases[0] ?? ""}${shared}) ${k}`, value: String(params[k] ?? 0), unit: UI.UNITS[k], numeric: true, control: "input", key: `__load:${i}:${k}` }),
      );
    });
    return rows;
  }

  function inspectorBody() {
    const msg = (text) => h("p", { className: "ui", style: { margin: 0, padding: "var(--space-3)", ...dim } }, text);
    if (!selId) {
      if (!selCount) return msg("Select an item in the model tree or the viewport.");
      return h(
        F,
        null,
        h("div", { style: { padding: "var(--space-3)", borderBottom: "1px solid var(--border)" } }, h("div", { className: "h3" }, selCount + " items selected"), h("div", { className: "caption", style: dim }, kindsShown.filter((k) => selection[k].length).map((k) => `${KIND_LABEL[k]}: ${formatIdList(selection[k])}`).join(" · "))),
        msg("Use the Assign panel to give the selection loads, supports, sections, releases or mesh."),
      );
    }
    const ins = UI.inspector(withDefaults(model), selId);
    const p = UI.parseId(selId);
    if (!p || !ins.groups) return null;
    if (ins.title === "Nothing selected") return msg("This item no longer exists.");
    let groups = ins.groups.map((g) => ({ ...g, rows: [...g.rows] }));
    const nameRow = { label: "Name", value: ins.title, control: "input", key: "__name" };
    let entry = null;
    let kind = null;

    if (p.kind === "point") {
      groups[0].rows = groups[0].rows.map((r) => ({ ...r, control: "input", key: "__" + r.label }));
      const support = model.supports.find((e) => kindOf(e) === "point" && e.geometry.includes(p.id));
      groups.push({
        title: "Assigned",
        rows: [
          { label: "Support", value: support ? paramsOf(support).type ?? "" : "", control: "select", key: "__support", options: [{ value: "", label: "None" }, ...SUPPORT_TYPES.map((v) => ({ value: v, label: UI.humanize(v) }))] },
          ...loadRows("point", p.id),
        ],
      });
      const d = summary?.displacements.find((x) => x.point === p.id);
      if (d) groups.push({ title: "Displacement", rows: ["ux", "uy", "uz"].map((k) => ({ label: k, value: num(d[k], 5), unit: "m", numeric: true })) });
      const r = summary?.reactions.find((x) => x.point === p.id);
      if (r)
        groups.push({
          title: "Reaction",
          rows: [
            ...["Fx", "Fy", "Fz"].map((k) => ({ label: k, value: num(r[k]), unit: "kN", numeric: true })),
            ...["Mx", "My", "Mz"].map((k) => ({ label: k, value: num(r[k]), unit: "kN·m", numeric: true })),
          ],
        });
    } else if (p.kind === "line") {
      const pointOptions = model.points.map(([id]) => ({ value: String(id), label: "Point " + id }));
      groups[0].rows = groups[0].rows.map((r) =>
        r.label === "Start point" ? { ...r, control: "select", key: "__start", options: pointOptions } : r.label === "End point" ? { ...r, control: "select", key: "__end", options: pointOptions } : r,
      );
      const designIndex = model.design.findIndex((e) => kindOf(e) === "line" && e.geometry.includes(p.id));
      const release = model.releases.find((e) => kindOf(e) === "line" && e.geometry.includes(p.id));
      const mesh = model.mesh.find((e) => e.templateId === "line-mesh" && e.geometry.includes(p.id));
      groups.push({
        title: "Assigned",
        rows: [
          {
            label: "Design member",
            value: designIndex === -1 ? "" : String(designIndex),
            control: "select",
            key: "__design",
            options: [...(designIndex === -1 ? [{ value: "", label: "None" }] : []), ...model.design.map((e, i) => (kindOf(e) === "line" ? { value: String(i), label: e.name } : null)).filter(Boolean)],
          },
          { label: "Release", value: release ? paramsOf(release).type ?? "" : "", control: "select", key: "__release", options: [{ value: "", label: "None" }, ...RELEASE_TYPES.map((v) => ({ value: v, label: UI.humanize(v) }))] },
          ...(templateById.has("line-mesh") ? [{ label: "Mesh divisions", value: mesh ? String(paramsOf(mesh).divisions ?? "") : "", placeholder: "1", numeric: true, control: "input", key: "__mesh" }] : []),
          ...loadRows("line", p.id),
        ],
      });
      const f = summary?.lines.find((x) => x.line === p.id);
      if (f)
        groups.push({
          title: "Internal forces (governing)",
          rows: [
            ...["N", "Vy", "Vz"].map((k) => ({ label: k, value: num(f[k]), unit: "kN", numeric: true })),
            ...["Mx", "My", "Mz"].map((k) => ({ label: k, value: num(f[k]), unit: "kN·m", numeric: true })),
          ],
        });
      const d = summary?.designs.find((x) => x.line === p.id);
      groups.push({ title: "Design", rows: designRows(d && d.design, designIndex === -1 ? null : model.design[designIndex]) });
    } else if (p.kind === "polygon") {
      groups[0].rows = groups[0].rows.map((r) => (r.label === "Points" ? { ...r, control: "input", key: "__polygon" } : r));
      const designIndex = model.design.findIndex((e) => kindOf(e) === "polygon" && e.geometry.includes(p.id));
      groups.push({
        title: "Assigned",
        rows: [
          {
            label: "Design member",
            value: designIndex === -1 ? "" : String(designIndex),
            control: "select",
            key: "__design",
            options: [...(designIndex === -1 ? [{ value: "", label: "None" }] : []), ...model.design.map((e, i) => (kindOf(e) === "polygon" ? { value: String(i), label: e.name } : null)).filter(Boolean)],
          },
        ],
      });
    } else if (p.kind === "case" || p.kind === "combo") {
      groups.unshift({ title: "General", rows: [nameRow] });
    } else if (p.kind === "entry") {
      entry = model[p.field]?.[p.index];
      kind = entry && kindOf(entry);
      if (entry?.templateId === "grid-system") groups = groups.filter((g) => !["X", "Y", "Z"].includes(g.title));
      let assign = groups.find((g) => g.title === "Assignment");
      if (!assign) {
        assign = { title: "Assignment", rows: [] };
        groups.unshift(assign);
      }
      // Geometry ids, editable, whatever template the entry has
      assign.rows = assign.rows.filter((r) => r.key !== "__geometry");
      if (kind) assign.rows.unshift({ label: KIND_LABEL[kind], value: formatIdList(entry.geometry), control: "input", key: "__geometry", placeholder: "None, e.g. 1, 3, 5-8" });
      const templates = [...templatesOf(p.field).keys()].filter((id) => (id === "grid-system") === (entry.templateId === "grid-system"));
      if (templates.length > 1) assign.rows.unshift({ label: "Template", value: entry.templateId, control: "select", key: "__template", options: templates.map((id) => ({ value: id, label: templateLabel(id) })) });
      assign.rows.unshift(nameRow);
      if (p.field === "design" && summary) {
        const ds = summary.designs.filter((x) => entry.geometry.includes(x.line) && kind === "line");
        const worst = ds.reduce((w, x) => (utilizationStatus(x.design).u ?? -1) > (utilizationStatus(w?.design).u ?? -1) ? x : w, null);
        groups.push({ title: "Design", rows: designRows(worst && worst.design, entry, worst && worst.line) });
      }
    }
    groups = groups.map((g) => ({ ...g, collapsible: true, open: groupOpen("i:" + g.title) }));

    const assigning = mode.mode === "assign" && mode.entry === selId;
    const caseInUse = p.kind === "case" && model.loads.some((e) => e.loadCase === p.name);
    const actions = h(
      "div",
      { style: { display: "flex", flexWrap: "wrap", gap: "var(--space-2)", padding: "var(--space-3)", borderBottom: "1px solid var(--border)" } },
      kind
        ? h(SV.Button, { size: "sm", variant: assigning ? "primary" : "secondary", pressed: assigning, onClick: () => setMode(assigning ? { mode: "view", entry: null } : { mode: "assign", entry: selId }) }, assigning ? "Done" : "Pick " + KIND_LABEL[kind].toLowerCase())
        : null,
      kind && entry.geometry.length
        ? h(SV.Button, { size: "sm", variant: "secondary", title: "Select this entry's geometry, to assign more to it", onClick: () => changeSelection({ ...EMPTY_SELECTION, [kind]: [...entry.geometry] }) }, "Select geometry")
        : null,
      p.kind === "entry"
        ? h(SV.Button, { size: "sm", variant: "secondary", onClick: () => { const r = duplicateEntry(model, p.field, p.index); commit(r.model); select(p.field + "-" + r.index); } }, "Duplicate")
        : null,
      h(SV.Button, { size: "sm", variant: "danger", disabled: caseInUse, title: caseInUse ? "Remove or move its loads first" : undefined, onClick: deleteSelected }, "Delete"),
    );

    return h(
      F,
      null,
      h(
        "div",
        { style: { padding: "var(--space-3)", borderBottom: "1px solid var(--border)" } },
        h("div", { className: "h3" }, ins.title),
        h("div", { className: "caption", style: dim }, ins.sub),
      ),
      actions,
      assigning
        ? h(Hint, null, `Drag left to right to add ${KIND_LABEL[kind].toLowerCase()}, right to left to remove. Click toggles one. Right-click or Esc to finish.`)
        : null,
      h(SV.PropertyGrid, { key: inspector.current.n + ":" + version, groups, onChange: onInspectorChange, onGroupToggle: (title, open) => setGroup("i:" + title, open) }),
      entry?.templateId === "grid-system"
        ? h(GridEditor, {
            key: "grid:" + inspector.current.n + ":" + version,
            entry,
            onChange: (params, key) => commit({ ...model, [p.field]: model[p.field].map((e, i) => (i === p.index ? { ...e, params } : e)) }, key && selId + "|" + key),
          })
        : null,
    );
  }

  function designRows(design, entry, line) {
    const st = utilizationStatus(design);
    const rows = [];
    if (entry) rows.push({ label: "Member", value: entry.name });
    if (line != null) rows.push({ label: "Governing line", value: "Line " + line });
    rows.push({ label: "Utilization", value: st.u === null ? "–" : num(st.u), numeric: true });
    rows.push({ label: "Status", value: h(SV.StatusBadge, { status: st.status }, st.word) });
    return rows;
  }

  // Results drawer
  const designEntryOf = (line) => model.design.find((e) => kindOf(e) === "line" && e.geometry.includes(line));
  const tabs = [
    { id: "reactions", label: "Reactions", meta: summary?.reactions.length ?? 0 },
    { id: "displacements", label: "Displacements", meta: summary?.displacements.length ?? 0 },
    { id: "forces", label: "Line forces", meta: summary?.lines.length ?? 0 },
    { id: "design", label: "Design", meta: summary?.designs.length ?? 0 },
  ];
  const kN = (key) => ({ key, label: key, unit: "kN", numeric: true, render: (v) => num(v) });
  const kNm = (key) => ({ key, label: key, unit: "kN·m", numeric: true, render: (v) => num(v) });
  const m = (key) => ({ key, label: key, unit: "m", numeric: true, render: (v) => num(v, 5) });
  let table;
  if (!summary)
    table = h("p", { className: "ui", style: { margin: 0, padding: "var(--space-3)", ...dim } }, results.status?.error ? "No results: " + results.status.error : "No results yet.");
  else if (tab === "reactions")
    table = h(SV.DataTable, {
      density: "compact",
      columns: [{ key: "label", label: "Point" }, kN("Fx"), kN("Fy"), kN("Fz"), kNm("Mx"), kNm("My"), kNm("Mz")],
      rows: summary.reactions.map((r) => ({ ...r, id: "point-" + r.point, label: "Point " + r.point })),
      selectedId: selId,
      onSelect: select,
    });
  else if (tab === "displacements")
    table = h(SV.DataTable, {
      density: "compact",
      columns: [{ key: "label", label: "Point" }, m("ux"), m("uy"), m("uz")],
      rows: summary.displacements.map((r) => ({ ...r, id: "point-" + r.point, label: "Point " + r.point })),
      selectedId: selId,
      onSelect: select,
    });
  else if (tab === "forces")
    table = h(SV.DataTable, {
      density: "compact",
      columns: [{ key: "label", label: "Line" }, kN("N"), kN("Vy"), kN("Vz"), kNm("Mx"), kNm("My"), kNm("Mz")],
      rows: summary.lines.map((r) => ({ ...r, id: "line-" + r.line, label: "Line " + r.line })),
      selectedId: selId,
      onSelect: select,
    });
  else
    table = h(SV.DataTable, {
      density: "compact",
      columns: [
        { key: "label", label: "Line" },
        { key: "member", label: "Member" },
        { key: "template", label: "Template" },
        { key: "u", label: "Utilization", numeric: true, render: (v) => (v === null ? "–" : num(v)) },
        { key: "status", label: "Status", render: (_, r) => h(SV.StatusBadge, { status: r.st.status }, r.st.word) },
      ],
      rows: summary.designs.map(({ line, design }) => {
        const e = designEntryOf(line);
        const st = utilizationStatus(design);
        return { id: "line-" + line, label: "Line " + line, member: e?.name ?? "", template: e ? templateLabel(e.templateId) : "", u: st.u, st };
      }),
      selectedId: selId,
      onSelect: select,
    });
  const bottom = h(
    F,
    null,
    h(
      "div",
      { style: { display: "flex", alignItems: "stretch", flex: "none", background: "var(--surface-panel)" } },
      h("div", { style: { flex: 1, minWidth: 0 } }, h(SV.Tabs, { tabs, value: tab, onChange: setTab })),
      h("div", { style: { display: "flex", alignItems: "center", padding: "0 var(--space-2)", borderBottom: "1px solid var(--border)" } }, h(CollapseButton, { dir: "down", label: "Hide results", onClick: () => setCollapsed("bottom", true) })),
    ),
    h("div", { style: { flex: 1, minHeight: 0, overflow: "auto" } }, table),
  );

  // ---------- floating panels over the viewport ----------
  const floating = (node) => h("div", { className: "ui", style: { boxShadow: "var(--shadow-float)", borderRadius: "var(--radius-md)", minWidth: 200, maxWidth: 280 } }, node);

  // View: 3D or a plane (orientation) at a location on its normal axis
  const locs = view ? planeLocations(view.plane) : [];
  const axisName = view ? PLANE_NORMAL[view.plane].toUpperCase() : "";
  const viewPanel = floating(
    h(
      SV.Panel,
      { title: "View", collapsible: true, open: layout.panels.view, onToggle: (v) => setPanel("view", v) },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "var(--space-2)" } },
        h(
          "div",
          { style: { display: "flex", gap: "var(--space-1)" } },
          h(SV.Button, { size: "sm", variant: "ghost", pressed: !view, onClick: () => choosePlane(null) }, "3D"),
          ["XY", "XZ", "YZ"].map((pl) => h(SV.Button, { key: pl, size: "sm", variant: "ghost", pressed: view?.plane === pl, title: pl + " plane", onClick: () => choosePlane(pl) }, pl)),
        ),
        view
          ? h(
              F,
              null,
              h(
                "div",
                { style: { display: "flex", alignItems: "center", gap: "var(--space-1)" } },
                h("span", { className: "ui", style: dim }, axisName + " ="),
                h(SV.Select, {
                  "aria-label": axisName + " location",
                  options: [...(locs.some((l) => Math.abs(l.value - view.offset) < 1e-9) ? [] : [{ value: String(view.offset), label: num(view.offset) + " m" }]), ...locs.map((l) => ({ value: String(l.value), label: num(l.value) + " m" + (l.id ? " (" + l.id + ")" : "") }))],
                  value: String(locs.find((l) => Math.abs(l.value - view.offset) < 1e-9)?.value ?? view.offset),
                  onChange: (v) => setView({ ...view, offset: Number(v) }),
                }),
                h(SV.Button, { size: "sm", variant: "ghost", title: "Previous location", "aria-label": "Previous location", onClick: () => stepPlane(-1) }, h(Chevron, { dir: "down" })),
                h(SV.Button, { size: "sm", variant: "ghost", title: "Next location", "aria-label": "Next location", onClick: () => stepPlane(1) }, h(Chevron, { dir: "up" })),
              ),
              h(
                "div",
                { style: { display: "flex", alignItems: "center", gap: "var(--space-1)" } },
                h("span", { className: "caption", style: dim }, "At"),
                h("input", {
                  key: String(view.offset),
                  className: "sv-input data is-num",
                  defaultValue: String(view.offset),
                  "aria-label": axisName + " location in m",
                  onKeyDown: (e) => {
                    if (e.key !== "Enter") return;
                    const v = asNumber(e.target.value);
                    if (v !== null) setView({ ...view, offset: v });
                  },
                  onBlur: (e) => {
                    const v = asNumber(e.target.value);
                    if (v !== null && v !== view.offset) setView({ ...view, offset: v });
                  },
                }),
                h("span", { className: "caption", style: dim }, "m"),
              ),
              h("span", { className: "caption", style: dim }, "Off-plane items are faint and not picked. Edit geometry draws on this plane."),
            )
          : null,
      ),
    ),
  );

  // Display options
  const toggle = (key, text) => h(SV.Checkbox, { checked: display[key], onChange: (v) => setDisplay((d) => ({ ...d, [key]: v })) }, text);
  const scale = viewer.current?.deformationScale() ?? 0;
  const displayPanel = floating(
    h(
      SV.Panel,
      { title: "Display", collapsible: true, open: layout.panels.display, onToggle: (v) => setPanel("display", v) },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "var(--space-2)" } },
        toggle("deformed", "Deformed shape"),
        toggle("reactions", "Reactions"),
        toggle("loads", "Loads"),
        display.loads ? toggle("loadLabels", "Load values") : null,
        display.deformed
          ? h(SV.Select, {
              "aria-label": "Deformation scale",
              options: [0.5, 1, 2, 5, 10].map((v) => ({ value: String(v), label: "Scale ×" + v })),
              value: String(display.scale),
              onChange: (v) => setDisplay((d) => ({ ...d, scale: Number(v) })),
            })
          : null,
        display.deformed && scale ? h("span", { className: "caption", style: dim }, "Displacements drawn ×" + num(scale, 0)) : null,
        h(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "var(--space-1)" } },
          h("span", { className: "caption", style: dim }, "Line results"),
          h(SV.Select, {
            "aria-label": "Line results",
            options: [{ value: "", label: "None" }, ...LINE_RESULTS.map((r) => ({ value: r.value, label: `${r.label} (${r.value})` }))],
            value: display.diagram,
            onChange: (v) => setDisplay((d) => ({ ...d, diagram: v })),
          }),
        ),
        display.diagram
          ? h(
              F,
              null,
              h(SV.Select, {
                "aria-label": "Diagram scale",
                options: [0.25, 0.5, 1, 2, 4].map((v) => ({ value: String(v), label: "Diagram ×" + v })),
                value: String(display.diagramScale),
                onChange: (v) => setDisplay((d) => ({ ...d, diagramScale: Number(v) })),
              }),
              toggle("diagramLabels", "Diagram values"),
            )
          : null,
      ),
    ),
  );

  // Legend of the drawn line result: diverging, symmetric about zero; the extremes go in the note
  const lineResult = LINE_RESULTS.find((r) => r.value === display.diagram);
  let legend = null;
  if (lineResult && summary && diagram?.key === lineResult.value && (diagram.min || diagram.max)) {
    const span = Math.max(Math.abs(diagram.min), Math.abs(diagram.max));
    legend = h(SV.ContourLegend, {
      title: lineResult.label,
      unit: lineResult.unit,
      scale: "diverging",
      min: -span,
      max: span,
      decimals: 2,
      height: 112,
      note: [lineResult.note, `Min ${num(diagram.min)}, max ${num(diagram.max)}`].filter(Boolean).join("\n"),
    });
  }

  // Status bar: status = icon + word + color
  const status = results.status ?? {};
  let badge;
  if (engineError) badge = h(SV.StatusBadge, { status: "fail" }, "Failed: " + engineError);
  else if (pending || status.loading) badge = h(SV.StatusBadge, { status: "info" }, "Running");
  else if (!status.success) badge = h(SV.StatusBadge, { status: "fail" }, "Failed: " + (status.error ?? "analysis error"));
  else badge = h(SV.StatusBadge, { status: "ok" }, "Analysed" + (status.iterations ? ` (${status.iterations} iterations)` : ""));
  const hint =
    mode.mode === "assign"
      ? "Box left to right adds, right to left removes; right-click or Esc to finish"
      : editing
        ? "Drag a point to move it, click to add a point, click a point then a target to draw a line, right-click to delete"
        : view
          ? "Drag or right-drag to pan, scroll to zoom, Shift+drag to box-select, double-click to fit"
          : "Drag to orbit, right-drag to pan, scroll to zoom, Shift+drag to box-select, double-click to fit";
  const maxU = summary?.maxDisplacement;
  const statusbar = h(
    F,
    null,
    badge,
    status.unassignedLines?.length && !engineError
      ? h(SV.StatusBadge, { status: "warn" }, "No design entry: lines " + status.unassignedLines.join(", "))
      : null,
    maxU && maxU.u > 0 ? h("span", { className: "data" }, "Max displacement " + num(maxU.u, 5) + " m") : null,
    h("span", null, view ? `View: ${view.plane} @ ${PLANE_NORMAL[view.plane].toUpperCase()} = ${num(view.offset)} m` : "View: 3D"),
    h("span", null, selId ? "Selected: " + selId : selCount ? `Selected: ${selCount} items` : "Nothing selected"),
    hoverId ? h("span", { style: dim }, "Hover: " + hoverId) : null,
    h("span", { style: { flex: 1 } }),
    h("span", { style: dim }, hint),
    h("span", null, "Units: m, kN"),
  );

  return h(
    SV.AppShell,
    {
      toolbar,
      left,
      right,
      bottom,
      statusbar,
      bottomLabel: "Results",
      rightLabel: "Inspector",
      collapsed: layout.collapsed,
      onToggle: (r) => setCollapsed(r, !layout.collapsed[r]),
      onResize: (r, px) => setLayout((l) => ({ ...l, sizes: { ...l.sizes, [r]: px } })),
      leftWidth: layout.sizes.left ? layout.sizes.left + "px" : undefined,
      rightWidth: layout.sizes.right ? layout.sizes.right + "px" : undefined,
      bottomHeight: layout.sizes.bottom ? layout.sizes.bottom + "px" : undefined,
      overlays: { topLeft: viewPanel, topRight: displayPanel, ...(legend ? { bottomLeft: legend } : {}) },
    },
    h("div", { id: "viewport", ref: host, style: { position: "absolute", inset: 0, background: "var(--viewport)" } }),
  );
}

document.title = modelName + " · Awatif";
createRoot(document.getElementById("root")).render(h(App));
