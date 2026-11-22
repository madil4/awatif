/* Awatif viewer: the default, required three.js viewport for structural viewer apps.
 *
 * ES module. Needs "three" and "three/addons/" to resolve: through a bundler (Vite resolves them from
 * node_modules), or an import map (the starter pins three@0.183.2):
 *   <script type="importmap">{ "imports": {
 *     "three": "https://cdn.jsdelivr.net/npm/three@0.183.2/build/three.module.js",
 *     "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.183.2/examples/jsm/" } }</script>
 *
 * Exposes window.AwatifViewer = { createViewer } and exports createViewer.
 *
 *   const viewer = AwatifViewer.createViewer(element, model, {
 *     onSelect: (id) => ..., onHover: (id) => ...,
 *     onSelectionChange: (sel) => ...,  // view mode, Shift+click / Shift+drag: { point: [], line: [], polygon: [] }
 *     onAssign: (ids, add) => ...,      // assign mode: geometry ids of the active kind, add or remove
 *     onEdit: (op) => ...,              // edit mode: { type: 'move-point' | 'add-point' | 'add-line' | 'delete-point' | 'delete-line', ... }
 *     onModeExit: () => ...,            // right-click (no drag) in assign mode, or Escape
 *     hoverInfo: (id) => string | null, // text of a tooltip at the cursor for the hovered id ('\n' breaks lines)
 *     geometryKind: (entry) => 'point' | 'line' | 'polygon' | null,  // which geometry an entry's ids refer to
 *     workPlane: 'XY' | 'XZ' | 'YZ', workPlaneOffset: 0,             // where new points go in edit mode (default XZ, 0)
 *     snap: 0.1,                        // edit mode grid step in m; grid-line ordinates snap first
 *   });
 *   viewer.select('line-2' | 'supports-0' | 'loads-1' | null);  // highlight, same ids as AwatifUI.buildTree
 *   viewer.setSelection({ point: [1, 2], line: [], polygon: [] }); // the multi-selection (geometry ids)
 *   viewer.setSelectionFilter({ point, line, polygon });           // kinds Shift+click / Shift+drag pick (all on)
 *   viewer.setLoadSelection('Dead' | 'ULS' | null);  // which loads to draw (null: all)
 *   viewer.setModel(model);                          // redraw after the model changes
 *   viewer.setMode('view' | 'assign' | 'edit', { kind: 'point' | 'line' | 'polygon' });  // kind: assign only
 *   viewer.setView(null | { plane: 'XY' | 'XZ' | 'YZ', offset });  // null: 3D; else a 2D view of that plane
 *   viewer.setResults({ nodes, elements, displacements, reactions, internalForces, lineToElements } | null,
 *                     { deformed, reactions, scale, diagram, diagramScale, diagramLabels });
 *     // diagram: null | 'N' | 'Vy' | 'Vz' | 'Mx' | 'My' | 'Mz', a line result drawn on the members
 *   viewer.setDisplay({ loads, loadLabels, supports, gridLines, mesh });  // toggle model layers (all on by default)
 *   viewer.setWorkPlane(plane, offset);              // where edit mode puts new points
 *   viewer.diagramRange();                           // { key, min, max, scale } of the drawn line result, or null
 *   viewer.fit();                                    // frame the model (or the plane, in a plane view)
 *   viewer.dispose();
 *
 * Interaction, every mode: left-drag orbits (pans in a plane view), right-drag pans, wheel zooms, double-click
 * frames the model. Z is up.
 *   view:   click a point, line, polygon or load arrow to select it, click empty space to clear. Shift+click
 *           toggles geometry in the multi-selection; Shift+drag a box left to right adds what it touches, right
 *           to left removes it. Escape clears.
 *   assign: drag a box left to right to add what it touches, right to left to remove; click toggles one item.
 *           Right-click (without dragging) or Escape leaves the mode.
 *   edit:   drag a point to move it, click empty space to add a point, click a point then a point or empty space
 *           to draw a line, right-click a point or line to delete it, Escape cancels a line in progress.
 *           New positions lie on the work plane (dragged points stay in their own plane parallel to it).
 *
 * Plane view: an orthographic camera looks straight at the plane. Geometry off the plane is drawn faint and
 * cannot be picked; the plane becomes the work plane. Grid lines are drawn at every level in 3D.
 *
 * Colors come from the elem-* and viewport tokens and follow data-theme on <html>. Results draw into their own
 * group on `three.scene`; `three.root` is cleared on every redraw, so app drawings belong in a group of their own
 * on `three.scene` (call `render()` after changing it).
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

/* Which geometry an entry's ids refer to, by template. Unknown templates default to lines. */
const POINT_TEMPLATES = new Set(['point-load', 'point-support']);
const POLYGON_TEMPLATES = new Set(['triangle-mesh', 'generic-shell']);
const COMPONENT_FIELDS = ['gridLines', 'loads', 'supports', 'releases', 'localAxes', 'imperfections', 'mesh', 'design'];
const KINDS = ['point', 'line', 'polygon'];
const PICK_PX = 8;
const DRAG_PX = 4;
const GHOST = 0.15;
const AXIS_INDEX = { x: 0, y: 1, z: 2 };
const PLANE_NORMAL_AXIS = { XY: 'z', XZ: 'y', YZ: 'x' };
const PLANE_AXES = { XY: ['x', 'y'], XZ: ['x', 'z'], YZ: ['y', 'z'] };

function entries(ided) {
  if (!ided) return [];
  if (ided instanceof Map) return [...ided.entries()];
  const pairs = ided.length > 0 && ided.every((e) => Array.isArray(e) && e.length === 2 && typeof e[0] === 'number' && Array.isArray(e[1]));
  return pairs ? ided.slice() : ided.map((e, i) => [i + 1, e]);
}

function defaultGeometryKind(entry) {
  if (entry.templateId === 'grid-system') return null;
  if (POINT_TEMPLATES.has(entry.templateId)) return 'point';
  if (POLYGON_TEMPLATES.has(entry.templateId)) return 'polygon';
  return 'line';
}

function token(name) {
  return getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim() || '#808080';
}

/* Local member axes: x along the member, z towards global Z (global X for vertical members). */
function localAxes(a, b) {
  const x = new THREE.Vector3().subVectors(b, a).normalize();
  const ref = Math.abs(x.z) > 0.999 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1);
  const z = ref.clone().sub(x.clone().multiplyScalar(ref.dot(x))).normalize();
  const y = new THREE.Vector3().crossVectors(z, x).normalize();
  return { x, y, z };
}

/* The solver's member axes (awatif getTransformationMatrix): x along the member, y horizontal, z = x × y;
 * a vertical member takes y = global Y. Internal forces are reported in these axes. */
function solverAxes(a, b) {
  const x = new THREE.Vector3().subVectors(b, a);
  if (x.length() < 1e-9) return null;
  x.normalize();
  const D = Math.hypot(x.x, x.y);
  if (D < 1e-9) return { x, y: new THREE.Vector3(0, 1, 0), z: new THREE.Vector3(-Math.sign(x.z), 0, 0) };
  return { x, y: new THREE.Vector3(-x.y / D, x.x / D, 0), z: new THREE.Vector3((-x.x * x.z) / D, (-x.y * x.z) / D, D) };
}

/* Line result diagrams: the local axis each force is drawn along. Bending lands on the tension side
 * (My along +z, Mz along -y, since sagging is negative); each shear is drawn on the side of its moment's slope. */
const DIAGRAM_AXIS = { N: ['z', 1], Vy: ['y', 1], Vz: ['z', 1], Mx: ['z', 1], My: ['z', 1], Mz: ['y', -1] };
const DIV_STOPS = ['div-neg-2', 'div-neg-1', 'div-mid', 'div-pos-1', 'div-pos-2'];

/* 2D screen-space helpers for box selection */
function inRect(p, r) { return p.x >= r.x0 && p.x <= r.x1 && p.y >= r.y0 && p.y <= r.y1; }
function cross(a, b, c) { return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x); }
function segsCross(a, b, c, d) {
  const d1 = cross(c, d, a), d2 = cross(c, d, b), d3 = cross(a, b, c), d4 = cross(a, b, d);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
}
function rectCorners(r) { return [{ x: r.x0, y: r.y0 }, { x: r.x1, y: r.y0 }, { x: r.x1, y: r.y1 }, { x: r.x0, y: r.y1 }]; }
function segTouchesRect(a, b, r) {
  if (inRect(a, r) || inRect(b, r)) return true;
  const c = rectCorners(r);
  for (let i = 0; i < 4; i++) if (segsCross(a, b, c[i], c[(i + 1) % 4])) return true;
  return false;
}
function pointInPolygon(p, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i], b = ring[j];
    if ((a.y > p.y) !== (b.y > p.y) && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}
/* Screen distance from m to segment pq, and where along it (0..1) */
function segDistance(m, p, q) {
  const dx = q.x - p.x, dy = q.y - p.y, len2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((m.x - p.x) * dx + (m.y - p.y) * dy) / len2));
  return { d: Math.hypot(p.x + t * dx - m.x, p.y + t * dy - m.y), t };
}

const clean = (n) => (Math.abs(n) < 1e-9 ? 0 : Math.round(n * 1e6) / 1e6);
const fmt = (v, d = 1) => (Math.abs(v) < 1e-9 ? 0 : v).toFixed(d).replace('-', '−');
const emptySel = () => ({ point: new Set(), line: new Set(), polygon: new Set() });

/* Fade an object (and its children) for geometry off the viewed plane. Materials must not be shared. */
function fade(obj) {
  obj.traverse((o) => {
    if (!o.material) return;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      m.transparent = true;
      m.opacity = (m.opacity ?? 1) * GHOST;
      m.depthWrite = false;
    });
  });
  if (obj.isCSS2DObject) obj.element.style.opacity = String(GHOST);
  return obj;
}

export function createViewer(element, model, options = {}) {
  const onSelect = options.onSelect || (() => {});
  const onHover = options.onHover || (() => {});
  const onSelectionChange = options.onSelectionChange || (() => {});
  const onAssign = options.onAssign || (() => {});
  const onEdit = options.onEdit || (() => {});
  const onModeExit = options.onModeExit || (() => {});
  const hoverInfo = options.hoverInfo || (() => null);
  const kindOf = (entry) => {
    const k = options.geometryKind ? options.geometryKind(entry) : undefined;
    return k === undefined ? defaultGeometryKind(entry) : k;
  };

  element.textContent = '';
  if (getComputedStyle(element).position === 'static') element.style.position = 'relative';

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.touchAction = 'none';
  element.appendChild(renderer.domElement);

  const labels = new CSS2DRenderer();
  // zIndex 0 makes a stacking context: CSS2DRenderer's per-label z-index sorting stays below the viewport's panes
  Object.assign(labels.domElement.style, { position: 'absolute', inset: '0', pointerEvents: 'none', zIndex: '0' });
  element.appendChild(labels.domElement);

  // Selection box (assign mode, Shift+drag in view mode): solid when adding (left to right), dashed when removing
  const box = document.createElement('div');
  Object.assign(box.style, { position: 'absolute', display: 'none', pointerEvents: 'none', borderWidth: '1px', borderColor: 'var(--elem-selected)' });
  element.appendChild(box);

  // Hover tooltip: above the labels, below the viewport's panes (zIndex 0, after the labels layer)
  const tip = document.createElement('div');
  tip.className = 'caption data';
  Object.assign(tip.style, {
    position: 'absolute', display: 'none', pointerEvents: 'none', zIndex: '0', whiteSpace: 'pre', color: 'var(--ink)',
    background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-float)', padding: 'var(--space-1) var(--space-2)',
  });
  element.appendChild(tip);
  function showTip(id, ev) {
    const text = id && state.mode === 'view' ? hoverInfo(id) : null;
    if (!text) { tip.style.display = 'none'; return; }
    if (tip.textContent !== text) tip.textContent = text;
    tip.style.display = 'block';
    const rect = element.getBoundingClientRect();
    const x = ev.clientX - rect.left, y = ev.clientY - rect.top;
    // Below right of the cursor, flipped to stay inside the viewport
    const left = x + 14 + tip.offsetWidth > rect.width ? x - 10 - tip.offsetWidth : x + 14;
    const top = y + 18 + tip.offsetHeight > rect.height ? y - 8 - tip.offsetHeight : y + 18;
    tip.style.left = Math.max(0, left) + 'px';
    tip.style.top = Math.max(0, top) + 'px';
  }

  const scene = new THREE.Scene();
  const perspective = new THREE.PerspectiveCamera(45, 1, 0.01, 10000);
  perspective.up.set(0, 0, 1);
  perspective.position.set(10, -15, 10);
  const ortho = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.01, 10000);
  ortho.up.set(0, 0, 1);
  let camera = perspective;
  let orthoHalfHeight = 10;
  let savedPerspective = null; // { position, target } to restore when leaving a plane view

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.addEventListener('change', render);

  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.4);
  sun.position.set(1, -2, 3);
  scene.add(sun);

  const root = new THREE.Group();
  scene.add(root);
  const resultsGroup = new THREE.Group();
  scene.add(resultsGroup);
  const previewGroup = new THREE.Group();
  scene.add(previewGroup);

  let state = {
    model, loadSelection: null, selected: null, hovered: null,
    multi: emptySel(),
    filter: { point: true, line: true, polygon: true },
    mode: 'view', assignKind: 'line',
    view: null,        // null (3D) or { plane, offset }
    lineStart: null,   // edit mode: point id a new line starts from
    dragPoint: null,   // edit mode: { id, pos } while a point is dragged
    display: { loads: true, loadLabels: true, supports: true, gridLines: true, mesh: true },
    workPlane: options.workPlane || 'XZ',
    workPlaneOffset: options.workPlaneOffset || 0,
    snap: options.snap === undefined ? 0.1 : options.snap,
  };
  let results = null;
  let resultOptions = { deformed: true, reactions: true, scale: 1, diagram: null, diagramScale: 1, diagramLabels: true };
  // { points, lines, polygons, box, extent, ghost: {point,line,polygon: Set}, loadArrows: [{ id, tail, tip }] }
  let draw = null;
  const lineMaterials = new Set();

  function resolutionFor(mat) {
    mat.resolution.set(element.clientWidth || 1, element.clientHeight || 1);
    lineMaterials.add(mat);
    return mat;
  }

  function lineMat(color, width, dashed) {
    const m = new LineMaterial({ color, linewidth: width, dashed: !!dashed, dashSize: 0.4, gapSize: 0.2 });
    return resolutionFor(m);
  }

  function clearGroup(g) {
    const seen = new Set();
    g.traverse((o) => {
      if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (seen.has(m)) return; seen.add(m); lineMaterials.delete(m); m.dispose(); });
      if (o.isCSS2DObject) o.element.remove();
    });
    g.clear();
  }

  // Geometry ids highlighted: the single selection (a geometry id or an entry's geometry) and the multi-selection
  function selectedGeometry() {
    const ids = emptySel();
    KINDS.forEach((k) => state.multi[k].forEach((g) => ids[k].add(g)));
    const id = state.selected;
    if (!id) return ids;
    let m;
    if ((m = /^(point|line|polygon)-(\d+)$/.exec(id))) ids[m[1]].add(Number(m[2]));
    else if ((m = /^([A-Za-z]+)-(\d+)$/.exec(id)) && COMPONENT_FIELDS.includes(m[1])) {
      const entry = (state.model[m[1]] || [])[Number(m[2])];
      const kind = entry && kindOf(entry);
      if (kind) (entry.geometry || []).forEach((g) => ids[kind].add(g));
    }
    return ids;
  }

  function loadVisible(entry) {
    const sel = state.loadSelection;
    if (!sel) return true;
    const combo = (state.model.loadCombinations || []).find((c) => c.name === sel);
    if (combo) return !!(combo.factors && combo.factors[entry.loadCase]);
    return (entry.loadCase || (state.model.loadCases || [])[0]) === sel;
  }

  function label(text, at, border) {
    const div = document.createElement('div');
    div.className = 'data';
    div.textContent = text;
    Object.assign(div.style, { color: 'var(--ink)', background: 'var(--surface-raised)', border: '1px solid ' + border, borderRadius: 'var(--radius-pill)', padding: '0 var(--space-2)', whiteSpace: 'nowrap' });
    const o = new CSS2DObject(div);
    o.position.copy(at);
    return o;
  }

  /* ---------- plane view ---------- */
  function planeTol(extent) { return 1e-3 * Math.max(1, extent || 1); }
  // Is a position on the viewed plane? Always true in 3D.
  function onPlane(v, extent) {
    if (!state.view) return true;
    const a = PLANE_NORMAL_AXIS[state.view.plane];
    return Math.abs(v[a] - state.view.offset) <= planeTol(extent);
  }

  /* ---------- drawing ---------- */
  function drawGridLines(mdl, bbox, s, C) {
    const ords = { x: [], y: [], z: [] };
    (mdl.gridLines || []).forEach((entry) => {
      const p = entry.params || {};
      ['x', 'y', 'z'].forEach((a) => (p[a] || []).forEach((g) => { if (g.visible !== false && typeof g.ordinate === 'number') ords[a].push(g); }));
    });
    if (!ords.x.length && !ords.y.length && !ords.z.length) return;
    const pad = s * 3;
    const span = {};
    ['x', 'y', 'z'].forEach((a) => {
      const vals = ords[a].map((g) => g.ordinate).concat([bbox.min[a], bbox.max[a]]);
      span[a] = [Math.min(...vals) - pad, Math.max(...vals) + pad];
    });
    const color = C('elem-gridline');
    const segs = [];
    const add = (from, to, text, bubble, faded) => {
      segs.push({ from, to, faded });
      if (text != null) {
        const at = bubble === 'start' ? from : to;
        const l = label(text, at, 'var(--elem-gridline)');
        root.add(faded ? fade(l) : l);
      }
    };
    const vec = (o) => new THREE.Vector3(o.x, o.y, o.z);

    if (state.view) {
      // Plane view: the grid lines that lie in the plane (lines along one in-plane axis at the other's ordinates)
      const n = PLANE_NORMAL_AXIS[state.view.plane];
      const [u, v] = PLANE_AXES[state.view.plane];
      [[u, v], [v, u]].forEach(([a, along]) => ords[a].forEach((g) => {
        const from = { [n]: state.view.offset, [a]: g.ordinate, [along]: span[along][0] };
        const to = { [n]: state.view.offset, [a]: g.ordinate, [along]: span[along][1] };
        add(vec(from), vec(to), g.id, g.bubble);
      }));
    } else {
      // 3D: x and y grid lines on every level, level lines at the grid intersections, level labels
      const levels = ords.z.length ? ords.z.slice().sort((a, b) => a.ordinate - b.ordinate) : [{ id: null, ordinate: bbox.min.z }];
      levels.forEach((lvl, li) => {
        const z = lvl.ordinate;
        const bubbles = li === 0;
        ords.x.forEach((g) => add(new THREE.Vector3(g.ordinate, span.y[0], z), new THREE.Vector3(g.ordinate, span.y[1], z), bubbles ? g.id : null, g.bubble, !bubbles));
        ords.y.forEach((g) => add(new THREE.Vector3(span.x[0], g.ordinate, z), new THREE.Vector3(span.x[1], g.ordinate, z), bubbles ? g.id : null, g.bubble, !bubbles));
        if (lvl.id != null) root.add(label(lvl.id + ' ' + (z >= 0 ? '+' : '') + fmt(z, 2), new THREE.Vector3(span.x[0], span.y[0], z), 'var(--elem-gridline)'));
      });
      if (levels.length > 1) {
        const z0 = levels[0].ordinate, z1 = levels[levels.length - 1].ordinate;
        const xs = ords.x.length ? ords.x.map((g) => g.ordinate) : [span.x[0]];
        const ys = ords.y.length ? ords.y.map((g) => g.ordinate) : [span.y[0]];
        xs.forEach((x) => ys.forEach((y) => add(new THREE.Vector3(x, y, z0), new THREE.Vector3(x, y, z1), null, null, true)));
      }
    }
    const strong = segs.filter((g) => !g.faded), weak = segs.filter((g) => g.faded);
    [[strong, false], [weak, true]].forEach(([list, faded]) => {
      if (!list.length) return;
      const seg = new LineSegments2(new LineSegmentsGeometry().setPositions(list.flatMap((g) => [...g.from.toArray(), ...g.to.toArray()])), lineMat(color, 1, true));
      seg.computeLineDistances();
      if (faded) { seg.material.transparent = true; seg.material.opacity = 0.45; }
      root.add(seg);
    });
  }

  function rebuild() {
    clearGroup(root);
    const mdl = state.model;
    const pts = new Map(entries(mdl.points).map(([id, p]) => [id, new THREE.Vector3(p[0], p[1], p[2] || 0)]));
    if (state.dragPoint && pts.has(state.dragPoint.id)) pts.set(state.dragPoint.id, state.dragPoint.pos.clone());
    const lines = new Map();
    entries(mdl.lines).forEach(([id, l]) => { if (pts.has(l[0]) && pts.has(l[1])) lines.set(id, [pts.get(l[0]), pts.get(l[1])]); });
    const polygons = new Map();
    entries(mdl.polygons).forEach(([id, ids]) => {
      const ring = ids.map((n) => pts.get(n)).filter(Boolean);
      if (ring.length >= 3) polygons.set(id, ring);
    });

    const bbox = new THREE.Box3();
    pts.forEach((p) => bbox.expandByPoint(p));
    if (bbox.isEmpty()) bbox.set(new THREE.Vector3(-1, -1, 0), new THREE.Vector3(1, 1, 1));
    const extent = Math.max(bbox.getSize(new THREE.Vector3()).length(), 1);
    const s = extent * 0.03; // symbol size

    // Off-plane geometry (plane view only): drawn faint, never picked
    const ghost = emptySel();
    if (state.view) {
      pts.forEach((p, id) => { if (!onPlane(p, extent)) ghost.point.add(id); });
      lines.forEach(([a, b], id) => { if (!onPlane(a, extent) || !onPlane(b, extent)) ghost.line.add(id); });
      polygons.forEach((ring, id) => { if (ring.some((p) => !onPlane(p, extent))) ghost.polygon.add(id); });
    }
    const maybeFade = (obj, faded) => (faded ? fade(obj) : obj);
    draw = { points: pts, lines, polygons, box: bbox, extent, ghost, loadArrows: [] };

    const sel = selectedGeometry();
    const C = (n) => new THREE.Color(token(n));
    renderer.setClearColor(C('viewport'));
    const deformedShown = !!(results && resultOptions.deformed && results.displacements && results.displacements.length);

    // Ground grid: on the XY plane under the model in 3D, on the viewed plane in a plane view
    const gridSpan = Math.ceil(extent * 1.5);
    const grid = new THREE.GridHelper(gridSpan * 2, gridSpan * 2, C('viewport-grid'), C('viewport-grid'));
    const center = bbox.getCenter(new THREE.Vector3());
    const plane = state.view ? state.view.plane : 'XY';
    if (plane === 'XY') grid.rotation.x = Math.PI / 2;
    else if (plane === 'YZ') grid.rotation.z = Math.PI / 2;
    grid.position.set(Math.round(center.x), Math.round(center.y), state.view ? Math.round(center.z) : bbox.min.z);
    if (state.view) grid.position[PLANE_NORMAL_AXIS[plane]] = state.view.offset;
    root.add(grid);

    if (state.display.gridLines) drawGridLines(mdl, bbox, s, C);

    // Polygons: outline + 20% face
    polygons.forEach((ring, id) => {
      const on = sel.polygon.has(id), hov = state.hovered === 'polygon-' + id, faded = ghost.polygon.has(id);
      const color = C(on ? 'elem-selected' : hov ? 'elem-hover' : 'elem-polygon');
      const shapeGeom = new THREE.BufferGeometry().setFromPoints(ring);
      const idx = [];
      for (let i = 1; i < ring.length - 1; i++) idx.push(0, i, i + 1);
      shapeGeom.setIndex(idx);
      root.add(maybeFade(new THREE.Mesh(shapeGeom, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false })), faded));
      const lg = new LineGeometry().setPositions([...ring, ring[0]].flatMap((v) => v.toArray()));
      root.add(maybeFade(new Line2(lg, lineMat(color, on ? 3 : 1.5)), faded));
    });

    // Lines: solid, heaviest; dashed in elem-undeformed under a deformed shape
    lines.forEach(([a, b], id) => {
      const on = sel.line.has(id), hov = state.hovered === 'line-' + id;
      const g = new LineGeometry().setPositions([...a.toArray(), ...b.toArray()]);
      const base = deformedShown ? 'elem-undeformed' : 'elem-line';
      const line = new Line2(g, lineMat(C(on ? 'elem-selected' : hov ? 'elem-hover' : base), on ? 5 : deformedShown ? 1.5 : 3, deformedShown && !on && !hov));
      if (deformedShown) line.computeLineDistances();
      root.add(maybeFade(line, ghost.line.has(id)));
    });

    // Mesh: dots at division nodes
    if (state.display.mesh) (mdl.mesh || []).forEach((entry) => {
      if (kindOf(entry) !== 'line') return;
      const n = Math.max(1, Math.round((entry.params || {}).divisions || 1));
      const pos = [];
      (entry.geometry || []).forEach((lid) => {
        const l = lines.get(lid);
        if (l && !ghost.line.has(lid)) for (let i = 1; i < n; i++) pos.push(...new THREE.Vector3().lerpVectors(l[0], l[1], i / n).toArray());
      });
      if (!pos.length) return;
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      root.add(new THREE.Points(g, new THREE.PointsMaterial({ color: C('elem-mesh'), size: 4, sizeAttenuation: false })));
    });

    // Points: filled dots
    const dot = new THREE.SphereGeometry(s * 0.25, 16, 12);
    pts.forEach((p, id) => {
      const start = state.lineStart === id;
      const on = sel.point.has(id) || start, hov = state.hovered === 'point-' + id;
      const m = new THREE.Mesh(dot, new THREE.MeshBasicMaterial({ color: C(on ? 'elem-selected' : hov ? 'elem-hover' : 'elem-point') }));
      m.scale.setScalar(on || hov ? 1.5 : 1);
      m.position.copy(p);
      root.add(maybeFade(m, ghost.point.has(id)));
    });

    // Supports: fixed = block, pinned = pyramid (tip at the point), roller = pyramid on rollers and a plate.
    // A roller's plate lies along its free direction: x/y-rollers sit on a horizontal plate below the point,
    // a z-roller bears sideways against a vertical plate.
    const ROLLER_FRAME = {
      'x-roller': [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1)],
      'y-roller': [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)],
      'z-roller': [new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)],
    };
    if (state.display.supports) (mdl.supports || []).forEach((entry) => {
      const type = (entry.params || {}).type || 'pinned';
      (entry.geometry || []).forEach((pid) => {
        const p = pts.get(pid);
        if (!p) return;
        const mat = new THREE.MeshStandardMaterial({ color: C('elem-support') });
        const g = new THREE.Group();
        if (type === 'fixed') {
          const b = new THREE.Mesh(new THREE.BoxGeometry(s * 1.4, s * 1.4, s * 0.5), mat);
          b.position.z = -s * 0.25;
          g.add(b);
        } else {
          // Built in a local frame: x = free direction, z = away from the bearing surface, tip at the origin.
          const h = type === 'pinned' ? s : s * 0.8;
          const c = new THREE.Mesh(new THREE.ConeGeometry(s * 0.6, h, 4), mat);
          c.rotation.x = Math.PI / 2; // cone tip (+y) turned to +z, so it points up at the node
          c.position.z = -h / 2;
          g.add(c);
          const frame = ROLLER_FRAME[type];
          if (frame) {
            const r = s * 0.15;
            [-0.3, 0.3].forEach((x) => {
              const roller = new THREE.Mesh(new THREE.CylinderGeometry(r, r, s * 0.9, 16), mat); // axis along local y
              roller.position.set(x * s, 0, -h - r);
              g.add(roller);
            });
            const plate = new THREE.Mesh(new THREE.BoxGeometry(s * 1.6, s * 1.0, s * 0.08), mat);
            plate.position.z = -h - 2 * r - s * 0.04;
            g.add(plate);
            const [free, up] = frame;
            g.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(free, up.clone().cross(free), up));
          }
        }
        g.position.copy(p);
        root.add(maybeFade(g, ghost.point.has(pid)));
      });
    });

    // Releases: hinge ring near the released end
    (mdl.releases || []).forEach((entry) => {
      const type = (entry.params || {}).type || 'both-ends';
      (entry.geometry || []).forEach((lid) => {
        const l = lines.get(lid);
        if (!l) return;
        const ends = type === 'start' ? [0.08] : type === 'end' ? [0.92] : [0.08, 0.92];
        ends.forEach((t) => {
          const m = new THREE.Mesh(new THREE.TorusGeometry(s * 0.3, s * 0.08, 8, 24), new THREE.MeshBasicMaterial({ color: C('elem-release') }));
          m.position.lerpVectors(l[0], l[1], t);
          m.lookAt(m.position.clone().add(localAxes(l[0], l[1]).y));
          root.add(maybeFade(m, ghost.line.has(lid)));
        });
      });
    });

    // Loads: arrows, tips on the geometry, value labels. Arrows of the selected load entry are highlighted.
    const arrow = (entryId, tip, dir, len, color, faded) => {
      const d = dir.clone().normalize();
      const tail = tip.clone().sub(d.clone().multiplyScalar(len));
      root.add(maybeFade(new THREE.ArrowHelper(d, tail, len, color, len * 0.3, len * 0.18), faded));
      if (!faded) draw.loadArrows.push({ id: entryId, tail, tip: tip.clone() });
      return tail;
    };
    if (state.display.loads) (mdl.loads || []).forEach((entry, index) => {
      if (!loadVisible(entry)) return;
      const entryId = 'loads-' + index;
      const color = C(state.selected === entryId ? 'elem-selected' : state.hovered === entryId ? 'elem-hover' : 'elem-load');
      const p = entry.params || {};
      if (entry.templateId === 'point-load') {
        const f = new THREE.Vector3(p.Fx || 0, p.Fy || 0, p.Fz || 0);
        const parts = [];
        ['Fx', 'Fy', 'Fz'].forEach((k) => { if (p[k]) parts.push(k + ' ' + fmt(p[k]) + ' kN'); });
        ['Mx', 'My', 'Mz'].forEach((k) => { if (p[k]) parts.push(k + ' ' + fmt(p[k]) + ' kN·m'); });
        if (!parts.length) return;
        (entry.geometry || []).forEach((pid) => {
          const at = pts.get(pid);
          if (!at) return;
          const faded = ghost.point.has(pid);
          const tail = f.lengthSq() > 0 ? arrow(entryId, at, f, s * 2.5, color, faded) : at;
          if (state.display.loadLabels) root.add(maybeFade(label(parts.join(', '), tail, 'var(--elem-load)'), faded));
        });
      } else if (entry.templateId === 'distributed-load') {
        if (!p.w) return;
        const dir = p.direction || 'local-z';
        (entry.geometry || []).forEach((lid) => {
          const l = lines.get(lid);
          if (!l) return;
          const faded = ghost.line.has(lid);
          let axis;
          if (dir.startsWith('global-')) axis = new THREE.Vector3(dir === 'global-x' ? 1 : 0, dir === 'global-y' ? 1 : 0, dir === 'global-z' ? 1 : 0);
          else axis = localAxes(l[0], l[1])[dir === 'local-y' ? 'y' : 'z'];
          const f = axis.multiplyScalar(Math.sign(p.w));
          const n = Math.max(3, Math.round(l[0].distanceTo(l[1]) / (s * 2)));
          let mid = null;
          for (let i = 0; i <= n; i++) {
            const tail = arrow(entryId, new THREE.Vector3().lerpVectors(l[0], l[1], i / n), f, s * 1.5, color, faded);
            if (i === Math.round(n / 2)) mid = tail;
          }
          if (state.display.loadLabels && mid) root.add(maybeFade(label('w ' + fmt(p.w) + ' kN/m', mid, 'var(--elem-load)'), faded));
        });
      }
    });

    render();
  }

  /* Results: deformed shape (elem-deformed over the dashed undeformed geometry) and reaction arrows. */
  let lastDeformationScale = 0;
  function drawResults() {
    clearGroup(resultsGroup);
    lastDeformationScale = 0;
    lastDiagram = null;
    if (!results || !draw) { render(); return; }
    const C = (n) => new THREE.Color(token(n));
    const nodes = results.nodes || [];
    const disp = results.displacements || [];
    const s = draw.extent * 0.03;
    const nodeOnPlane = (n) => !!nodes[n] && onPlane({ x: nodes[n][0], y: nodes[n][1], z: nodes[n][2] }, draw.extent);

    if (resultOptions.deformed && disp.length) {
      let max = 0;
      for (let i = 0; i < nodes.length; i++) max = Math.max(max, Math.hypot(disp[i * 3] || 0, disp[i * 3 + 1] || 0, disp[i * 3 + 2] || 0));
      const k = max > 0 ? ((draw.extent * 0.05) / max) * (resultOptions.scale || 1) : 0;
      lastDeformationScale = k;
      const at = (n) => new THREE.Vector3(nodes[n][0] + k * (disp[n * 3] || 0), nodes[n][1] + k * (disp[n * 3 + 1] || 0), nodes[n][2] + k * (disp[n * 3 + 2] || 0));
      const pos = [], faint = [];
      (results.elements || []).forEach((el) => {
        const edges = el.length === 2 ? [[el[0], el[1]]] : el.map((n, i) => [n, el[(i + 1) % el.length]]);
        edges.forEach(([a, b]) => {
          if (!nodes[a] || !nodes[b]) return;
          (nodeOnPlane(a) && nodeOnPlane(b) ? pos : faint).push(...at(a).toArray(), ...at(b).toArray());
        });
      });
      if (pos.length) resultsGroup.add(new LineSegments2(new LineSegmentsGeometry().setPositions(pos), lineMat(C('elem-deformed'), 2.5)));
      if (faint.length) resultsGroup.add(fade(new LineSegments2(new LineSegmentsGeometry().setPositions(faint), lineMat(C('elem-deformed'), 2.5))));
    }

    if (resultOptions.reactions && results.reactions && results.reactions.length) {
      const color = C('elem-reaction');
      const forces = [];
      results.reactions.forEach((r, n) => {
        if (!r || !nodes[n] || !nodeOnPlane(n)) return;
        const f = new THREE.Vector3(r[0] || 0, r[1] || 0, r[2] || 0);
        if (f.length() > 1e-6) forces.push([n, f]);
      });
      const maxF = forces.reduce((m, [, f]) => Math.max(m, f.length()), 0);
      forces.forEach(([n, f]) => {
        const tip = new THREE.Vector3(...nodes[n]);
        const len = s * (1.5 + 2.5 * (f.length() / maxF));
        const d = f.clone().normalize();
        const tail = tip.clone().sub(d.clone().multiplyScalar(len + s * 0.6));
        resultsGroup.add(new THREE.ArrowHelper(d, tail, len, color, len * 0.3, len * 0.18));
        resultsGroup.add(label(f.length().toFixed(2) + ' kN', tail, 'var(--elem-reaction)'));
      });
    }

    if (resultOptions.diagram && results.internalForces) drawDiagram(resultOptions.diagram, nodes, C);
    render();
  }

  /* One line result (N, Vy, Vz, Mx, My, Mz) as a filled diagram on the undeformed members: colored with the
   * diverging ramp (symmetric about zero), outlined in ink-muted, one value per geometry line labelled: at
   * midspan when the force is uniform along the line (equal to the shown 2 decimals), otherwise at the
   * governing (largest magnitude) location. Members off the viewed plane are faint and unlabelled. */
  let lastDiagram = null;
  function drawDiagram(key, nodes, C) {
    const forces = results.internalForces;
    const lineToElements = results.lineToElements || new Map();
    let maxAbs = 0, min = 0, max = 0;
    forces.forEach((f) => (f[key] || []).forEach((v) => {
      maxAbs = Math.max(maxAbs, Math.abs(v));
      min = Math.min(min, v);
      max = Math.max(max, v);
    }));
    lastDiagram = { key, min, max, scale: 0 };
    if (maxAbs < 1e-9) return;
    const k = ((draw.extent * 0.08) / maxAbs) * (resultOptions.diagramScale || 1);
    lastDiagram.scale = k;
    const [axisName, sign] = DIAGRAM_AXIS[key];
    const stops = DIV_STOPS.map((n) => C(n));
    const colorOf = (v) => {
      const t = Math.max(0, Math.min(1, (v / maxAbs + 1) / 2)) * (stops.length - 1);
      const i = Math.min(stops.length - 2, Math.floor(t));
      return stops[i].clone().lerp(stops[i + 1], t - i);
    };
    const nodeOnPlane = (n) => !!nodes[n] && onPlane({ x: nodes[n][0], y: nodes[n][1], z: nodes[n][2] }, draw.extent);
    const sets = { on: { fill: [], fillColor: [], edge: [] }, off: { fill: [], fillColor: [], edge: [] } };
    const tri = (set, ...pv) => pv.forEach(([p, v]) => { set.fill.push(p.x, p.y, p.z); const c = colorOf(v); set.fillColor.push(c.r, c.g, c.b); });
    const edge = (set, a, b) => set.edge.push(a.x, a.y, a.z, b.x, b.y, b.z);
    const labelled = [];

    // Every element of a geometry line, in order; mesh elements outside any line are drawn unlabelled
    const groups = [...lineToElements.entries()].map(([line, els]) => ({ line, els }));
    const inLine = new Set(groups.flatMap((g) => g.els));
    forces.forEach((_, e) => { if (!inLine.has(e)) groups.push({ line: null, els: [e] }); });

    groups.forEach(({ line, els }) => {
      let hi = null, lo = null, gov = null, on = true, first = null, last = null;
      els.forEach((e) => {
        const f = forces.get(e);
        const el = (results.elements || [])[e];
        if (!f || !f[key] || !el || el.length !== 2 || !nodes[el[0]] || !nodes[el[1]]) return;
        const a = new THREE.Vector3(...nodes[el[0]]), b = new THREE.Vector3(...nodes[el[1]]);
        const ax = solverAxes(a, b);
        if (!ax) return;
        const dir = ax[axisName].multiplyScalar(sign * k);
        const [va, vb] = f[key];
        const da = a.clone().addScaledVector(dir, va), db = b.clone().addScaledVector(dir, vb);
        const elOn = nodeOnPlane(el[0]) && nodeOnPlane(el[1]);
        on = on && elOn;
        const set = sets[elOn ? 'on' : 'off'];
        if (va * vb < 0) {
          // Split where the diagram crosses the member, so each part keeps its own side
          const t = va / (va - vb);
          const z = a.clone().lerp(b, t);
          tri(set, [a, va], [da, va], [z, 0]);
          tri(set, [z, 0], [db, vb], [b, vb]);
        } else {
          tri(set, [a, va], [da, va], [db, vb]);
          tri(set, [a, va], [db, vb], [b, vb]);
        }
        edge(set, da, db);
        if (!first) first = { p: a, d: da, set };
        last = { p: b, d: db, set };
        [[da, va], [db, vb]].forEach(([p, v]) => {
          if (!hi || v > hi.v) hi = { p, v };
          if (!lo || v < lo.v) lo = { p, v };
          if (!gov || Math.abs(v) > Math.abs(gov.v)) gov = { p, v };
        });
      });
      // Close the diagram at the line's ends
      if (first) edge(first.set, first.p, first.d);
      if (last) edge(last.set, last.p, last.d);
      if (line !== null && on && hi && resultOptions.diagramLabels !== false) {
        const shown = (v) => v.toFixed(2);
        if (Math.abs(gov.v) > maxAbs * 1e-3) {
          const uniform = shown(hi.v) === shown(lo.v);
          labelled.push(uniform ? { p: first.d.clone().lerp(last.d, 0.5), v: gov.v } : gov);
        }
      }
    });

    const ink = C('ink-muted');
    ['on', 'off'].forEach((which) => {
      const s = sets[which];
      const objs = [];
      if (s.fill.length) {
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(s.fill, 3));
        g.setAttribute('color', new THREE.Float32BufferAttribute(s.fillColor, 3));
        const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: 0.75, depthWrite: false }));
        mesh.renderOrder = 1;
        objs.push(mesh);
      }
      if (s.edge.length) objs.push(new LineSegments2(new LineSegmentsGeometry().setPositions(s.edge), lineMat(ink, 1.25)));
      objs.forEach((o) => resultsGroup.add(which === 'on' ? o : fade(o)));
    });
    labelled.forEach(({ p, v }) => resultsGroup.add(label(v.toFixed(2).replace('-', '−'), p, 'var(--' + (v < 0 ? 'div-neg-2' : 'div-pos-2') + ')')));
  }

  function refresh() { rebuild(); drawResults(); }

  /* ---------- cameras ---------- */
  function useCamera(next) {
    if (camera === next) return;
    camera = next;
    controls.object = next;
  }

  function updateOrtho() {
    const aspect = (element.clientWidth || 1) / (element.clientHeight || 1);
    ortho.left = -orthoHalfHeight * aspect;
    ortho.right = orthoHalfHeight * aspect;
    ortho.top = orthoHalfHeight;
    ortho.bottom = -orthoHalfHeight;
    ortho.updateProjectionMatrix();
  }

  function fit() {
    if (!draw) return;
    if (state.view) { fitPlane(); return; }
    const c = draw.box.getCenter(new THREE.Vector3());
    const r = draw.extent * 0.5;
    const dist = r / Math.sin((perspective.fov * Math.PI) / 360) * 1.1;
    const dir = new THREE.Vector3(0.6, -1, 0.55).normalize();
    perspective.near = dist / 1000;
    perspective.far = dist * 100;
    perspective.position.copy(c).add(dir.multiplyScalar(dist));
    perspective.updateProjectionMatrix();
    controls.target.copy(c);
    controls.update();
    render();
  }

  // Frame the viewed plane: look along its normal, size the frustum to the geometry on it (else the model)
  function fitPlane() {
    const { plane, offset } = state.view;
    const n = PLANE_NORMAL_AXIS[plane];
    const [u, v] = PLANE_AXES[plane];
    const onIt = new THREE.Box3();
    draw.points.forEach((p, id) => { if (!draw.ghost.point.has(id)) onIt.expandByPoint(p); });
    const b = onIt.isEmpty() ? draw.box : onIt;
    const c = b.getCenter(new THREE.Vector3());
    c[n] = offset;
    const size = b.getSize(new THREE.Vector3());
    const aspect = (element.clientWidth || 1) / (element.clientHeight || 1);
    orthoHalfHeight = Math.max(1, Math.max(size[v], size[u] / aspect) / 2 * 1.2 + draw.extent * 0.05);
    const dist = draw.extent * 2 + 10;
    const dir = plane === 'XY' ? new THREE.Vector3(0, 0, 1) : plane === 'XZ' ? new THREE.Vector3(0, -1, 0) : new THREE.Vector3(1, 0, 0);
    ortho.up.set(plane === 'XY' ? 0 : 0, plane === 'XY' ? 1 : 0, plane === 'XY' ? 0 : 1);
    ortho.position.copy(c).add(dir.multiplyScalar(dist));
    ortho.near = 0.01;
    ortho.far = dist + draw.extent * 4;
    ortho.zoom = 1;
    ortho.lookAt(c);
    updateOrtho();
    controls.target.copy(c);
    controls.update();
    ortho.lookAt(c);
    render();
  }

  function setView(view) {
    const next = view && PLANE_AXES[view.plane] ? { plane: view.plane, offset: Number(view.offset) || 0 } : null;
    if (next) {
      if (!state.view) savedPerspective = { position: perspective.position.clone(), target: controls.target.clone() };
      state.view = next;
      state.workPlane = next.plane;
      state.workPlaneOffset = next.offset;
      useCamera(ortho);
      controls.enableRotate = false;
      controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
      rebuild();
      drawResults();
      fitPlane();
    } else {
      const was = state.view;
      state.view = null;
      useCamera(perspective);
      controls.enableRotate = true;
      controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
      rebuild();
      drawResults();
      if (was && savedPerspective) {
        perspective.position.copy(savedPerspective.position);
        controls.target.copy(savedPerspective.target);
        controls.update();
        render();
      } else fit();
    }
  }

  function render() {
    renderer.render(scene, camera);
    labels.render(scene, camera);
  }

  function resize() {
    const w = element.clientWidth || 1, h = element.clientHeight || 1;
    renderer.setSize(w, h);
    labels.setSize(w, h);
    perspective.aspect = w / h;
    perspective.updateProjectionMatrix();
    updateOrtho();
    lineMaterials.forEach((m) => m.resolution.set(w, h));
    render();
  }

  /* ---------- screen-space picking (off-plane geometry is never picked) ---------- */
  function screenOf(v, rect) {
    const p = v.clone().project(camera);
    return { x: (p.x + 1) / 2 * rect.width, y: (1 - p.y) / 2 * rect.height, behind: p.z > 1 || p.z < -1 };
  }
  function mouseOf(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top, rect };
  }

  function pickPoint(ev) {
    if (!draw) return null;
    const m = mouseOf(ev);
    let best = null, bestD = PICK_PX;
    draw.points.forEach((v, id) => {
      if (draw.ghost.point.has(id)) return;
      const p = screenOf(v, m.rect);
      const d = Math.hypot(p.x - m.x, p.y - m.y);
      if (!p.behind && d < bestD) { bestD = d; best = id; }
    });
    return best;
  }

  function pickLine(ev) {
    if (!draw) return null;
    const m = mouseOf(ev);
    let best = null, bestD = PICK_PX;
    draw.lines.forEach(([a, b], id) => {
      if (draw.ghost.line.has(id)) return;
      const p = screenOf(a, m.rect), q = screenOf(b, m.rect);
      if (p.behind || q.behind) return;
      const { d } = segDistance(m, p, q);
      if (d < bestD) { bestD = d; best = id; }
    });
    return best;
  }

  function pickPolygon(ev) {
    if (!draw) return null;
    const m = mouseOf(ev);
    let best = null;
    draw.polygons.forEach((ring, id) => {
      if (draw.ghost.polygon.has(id)) return;
      const scr = ring.map((v) => screenOf(v, m.rect));
      if (scr.some((p) => p.behind)) return;
      if (pointInPolygon(m, scr)) best = id;
    });
    return best;
  }

  // A load arrow's shaft (not its tip, which sits on the geometry): the load entry id
  function pickLoad(ev) {
    if (!draw || !state.display.loads) return null;
    const m = mouseOf(ev);
    let best = null, bestD = PICK_PX;
    draw.loadArrows.forEach((a) => {
      const p = screenOf(a.tail, m.rect), q = screenOf(a.tip, m.rect);
      if (p.behind || q.behind) return;
      const { d, t } = segDistance(m, p, q);
      if (t < 0.8 && d < bestD) { bestD = d; best = a.id; }
    });
    return best;
  }

  // Nearest point, then a load arrow, then nearest line, then a polygon under the cursor
  function pick(ev, filter) {
    const f = filter || { point: true, line: true, polygon: true, load: true };
    const p = f.point ? pickPoint(ev) : null;
    if (p !== null) return 'point-' + p;
    const ld = f.load ? pickLoad(ev) : null;
    if (ld !== null) return ld;
    const l = f.line ? pickLine(ev) : null;
    if (l !== null) return 'line-' + l;
    const g = f.polygon ? pickPolygon(ev) : null;
    return g !== null ? 'polygon-' + g : null;
  }

  function pickOfKind(ev, kind) {
    if (kind === 'point') return pickPoint(ev);
    if (kind === 'polygon') return pickPolygon(ev);
    return pickLine(ev);
  }

  // Ids of `kind` the screen rectangle touches
  function boxSelect(r, kind, rect) {
    const out = [];
    const g = draw.ghost[kind];
    if (kind === 'point') draw.points.forEach((v, id) => { if (g.has(id)) return; const p = screenOf(v, rect); if (!p.behind && inRect(p, r)) out.push(id); });
    else if (kind === 'line') draw.lines.forEach(([a, b], id) => {
      if (g.has(id)) return;
      const p = screenOf(a, rect), q = screenOf(b, rect);
      if (!p.behind && !q.behind && segTouchesRect(p, q, r)) out.push(id);
    });
    else draw.polygons.forEach((ring, id) => {
      if (g.has(id)) return;
      const scr = ring.map((v) => screenOf(v, rect));
      if (scr.some((p) => p.behind)) return;
      const touches = scr.some((p) => inRect(p, r)) ||
        scr.some((p, i) => segTouchesRect(p, scr[(i + 1) % scr.length], r)) ||
        pointInPolygon({ x: (r.x0 + r.x1) / 2, y: (r.y0 + r.y1) / 2 }, scr);
      if (touches) out.push(id);
    });
    return out;
  }

  function multiOut() {
    const out = {};
    KINDS.forEach((k) => { out[k] = [...state.multi[k]].sort((a, b) => a - b); });
    return out;
  }

  /* ---------- work plane ---------- */
  const raycaster = new THREE.Raycaster();
  function planeNormal() {
    return state.workPlane === 'XY' ? new THREE.Vector3(0, 0, 1) : state.workPlane === 'YZ' ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  }
  // Where the cursor ray meets the work plane, or the plane parallel to it through `through`
  function planeHit(ev, through) {
    const m = mouseOf(ev);
    const ndc = new THREE.Vector2((m.x / m.rect.width) * 2 - 1, -(m.y / m.rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const normal = planeNormal();
    const plane = new THREE.Plane(normal, through ? -normal.dot(through) : -state.workPlaneOffset);
    const hit = new THREE.Vector3();
    return raycaster.ray.intersectPlane(plane, hit) ? hit : null;
  }
  function gridOrdinates() {
    const out = { x: [], y: [], z: [] };
    (state.model.gridLines || []).forEach((e) => ['x', 'y', 'z'].forEach((a) => ((e.params || {})[a] || []).forEach((g) => { if (typeof g.ordinate === 'number') out[a].push(g.ordinate); })));
    return out;
  }
  // Snap the in-plane coordinates to grid-line ordinates (within 2% of the model size), else to the snap step
  function snap(v) {
    const fixed = state.workPlane === 'XY' ? 'z' : state.workPlane === 'YZ' ? 'x' : 'y';
    const ords = gridOrdinates();
    const tol = (draw ? draw.extent : 10) * 0.02;
    ['x', 'y', 'z'].forEach((a) => {
      if (a === fixed) return;
      let near = null;
      ords[a].forEach((o) => { if (Math.abs(o - v[a]) <= tol && (near === null || Math.abs(o - v[a]) < Math.abs(near - v[a]))) near = o; });
      if (near !== null) v[a] = near;
      else if (state.snap > 0) v[a] = Math.round(v[a] / state.snap) * state.snap;
    });
    return [clean(v.x), clean(v.y), clean(v.z)];
  }

  function drawPreview(to) {
    clearGroup(previewGroup);
    if (state.lineStart !== null && to && draw && draw.points.has(state.lineStart)) {
      const a = draw.points.get(state.lineStart);
      const seg = new LineSegments2(new LineSegmentsGeometry().setPositions([...a.toArray(), ...to.toArray()]), lineMat(new THREE.Color(token('elem-selected')), 2, true));
      seg.computeLineDistances();
      previewGroup.add(seg);
    }
    render();
  }

  /* ---------- pointer handling ---------- */
  let down = null;   // { x, y, button, boxing, dragId, shift }

  // Capture phase, so OrbitControls never sees a box drag or a point drag
  const onDownCapture = (ev) => {
    down = { x: ev.clientX, y: ev.clientY, button: ev.button, boxing: false, dragId: null, shift: ev.shiftKey || ev.ctrlKey || ev.metaKey };
    if (ev.button !== 0) return;
    if (state.mode === 'assign' || (state.mode === 'view' && ev.shiftKey)) {
      down.boxing = true;
      controls.enabled = false;
    } else if (state.mode === 'edit') {
      const id = pickPoint(ev);
      if (id !== null) { down.dragId = id; controls.enabled = false; }
    }
  };

  const onMove = (ev) => {
    if (down && down.boxing) {
      const m = mouseOf(ev);
      const x0 = down.x - m.rect.left, y0 = down.y - m.rect.top;
      if (Math.hypot(m.x - x0, m.y - y0) > DRAG_PX) {
        const removing = m.x < x0;
        Object.assign(box.style, {
          display: 'block', left: Math.min(x0, m.x) + 'px', top: Math.min(y0, m.y) + 'px',
          width: Math.abs(m.x - x0) + 'px', height: Math.abs(m.y - y0) + 'px', borderStyle: removing ? 'dashed' : 'solid',
        });
      }
      return;
    }
    if (down && down.dragId !== null) {
      if (Math.hypot(ev.clientX - down.x, ev.clientY - down.y) <= DRAG_PX && !state.dragPoint) return;
      const origin = entries(state.model.points).find(([id]) => id === down.dragId);
      if (!origin) return;
      const hit = planeHit(ev, new THREE.Vector3(...origin[1]));
      if (!hit) return;
      const p = snap(hit);
      state.dragPoint = { id: down.dragId, pos: new THREE.Vector3(p[0], p[1], p[2]) };
      rebuild();
      return;
    }
    if (ev.buttons) { tip.style.display = 'none'; return; }
    const id = state.mode === 'assign'
      ? (() => { const k = pickOfKind(ev, state.assignKind); return k === null ? null : state.assignKind + '-' + k; })()
      : state.mode === 'edit' ? pick(ev, { point: true, line: true, polygon: true, load: false }) : pick(ev);
    renderer.domElement.style.cursor = state.mode === 'edit' ? (id && id.startsWith('point-') ? 'move' : 'crosshair') : id ? 'pointer' : 'default';
    if (id !== state.hovered) { state.hovered = id; rebuild(); onHover(id); }
    showTip(id, ev);
    if (state.mode === 'edit' && state.lineStart !== null) {
      const pid = pickPoint(ev);
      const hit = pid !== null ? draw.points.get(pid) : planeHit(ev);
      drawPreview(hit && (pid !== null ? hit : new THREE.Vector3(...snap(hit))));
    }
  };

  const onUp = (ev) => {
    if (!down) return;
    const d = down;
    down = null;
    controls.enabled = true;
    const moved = Math.hypot(ev.clientX - d.x, ev.clientY - d.y) > DRAG_PX;

    if (d.button === 2) {
      if (moved) return; // that was a pan
      if (state.mode === 'assign') { onModeExit(); return; }
      if (state.mode === 'edit') {
        if (state.lineStart !== null) { state.lineStart = null; drawPreview(null); rebuild(); return; }
        const pid = pickPoint(ev);
        if (pid !== null) { onEdit({ type: 'delete-point', id: pid }); return; }
        const lid = pickLine(ev);
        if (lid !== null) onEdit({ type: 'delete-line', id: lid });
      }
      return;
    }
    if (d.button !== 0) return;

    if (state.mode === 'assign') {
      box.style.display = 'none';
      if (moved) {
        const m = mouseOf(ev);
        const x0 = d.x - m.rect.left, y0 = d.y - m.rect.top;
        const r = { x0: Math.min(x0, m.x), y0: Math.min(y0, m.y), x1: Math.max(x0, m.x), y1: Math.max(y0, m.y) };
        const ids = boxSelect(r, state.assignKind, m.rect);
        if (ids.length) onAssign(ids, m.x >= x0);
      } else {
        const id = pickOfKind(ev, state.assignKind);
        if (id !== null) onAssign([id], !selectedGeometry()[state.assignKind].has(id));
      }
      return;
    }

    if (state.mode === 'edit') {
      if (d.dragId !== null && state.dragPoint) {
        const { id, pos } = state.dragPoint;
        state.dragPoint = null;
        onEdit({ type: 'move-point', id, xyz: [clean(pos.x), clean(pos.y), clean(pos.z)] });
        return;
      }
      if (moved) return; // orbit
      const pid = pickPoint(ev);
      if (state.lineStart !== null) {
        const from = state.lineStart;
        state.lineStart = null;
        drawPreview(null);
        if (pid === from) { rebuild(); return; }
        if (pid !== null) { onEdit({ type: 'add-line', from, to: pid }); return; }
        const hit = planeHit(ev);
        if (hit) onEdit({ type: 'add-line', from, xyz: snap(hit) });
        else rebuild();
        return;
      }
      if (pid !== null) {
        state.lineStart = pid;
        rebuild();
        onSelect('point-' + pid);
        return;
      }
      const hit = planeHit(ev);
      if (hit) onEdit({ type: 'add-point', xyz: snap(hit) });
      return;
    }

    // View mode. Shift+drag: box into the multi-selection; Shift/Ctrl+click: toggle one item.
    if (d.boxing) {
      box.style.display = 'none';
      if (moved) {
        const m = mouseOf(ev);
        const x0 = d.x - m.rect.left, y0 = d.y - m.rect.top;
        const r = { x0: Math.min(x0, m.x), y0: Math.min(y0, m.y), x1: Math.max(x0, m.x), y1: Math.max(y0, m.y) };
        const add = m.x >= x0;
        KINDS.forEach((k) => { if (state.filter[k]) boxSelect(r, k, m.rect).forEach((id) => (add ? state.multi[k].add(id) : state.multi[k].delete(id))); });
        rebuild();
        onSelectionChange(multiOut());
        return;
      }
    }
    if (moved) return; // that was an orbit (or a pan in a plane view)
    if (d.shift) {
      const id = pick(ev, { ...state.filter, load: false });
      const m = id && /^(point|line|polygon)-(\d+)$/.exec(id);
      if (!m) return;
      // Start from what is highlighted, so Shift+click extends a single selection
      if (!KINDS.some((k) => state.multi[k].size)) {
        const cur = state.selected && /^(point|line|polygon)-(\d+)$/.exec(state.selected);
        if (cur) state.multi[cur[1]].add(Number(cur[2]));
      }
      const set = state.multi[m[1]], gid = Number(m[2]);
      if (set.has(gid)) set.delete(gid); else set.add(gid);
      state.selected = null;
      rebuild();
      onSelectionChange(multiOut());
      return;
    }
    const id = pick(ev);
    state.selected = id;
    state.multi = emptySel();
    rebuild();
    onSelect(id);
  };

  const onLeave = () => {
    tip.style.display = 'none';
    if (state.hovered) { state.hovered = null; rebuild(); onHover(null); }
  };
  const onDbl = () => { if (state.mode === 'view') fit(); };
  const onKey = (ev) => {
    if (ev.key !== 'Escape') return;
    if (/^(INPUT|SELECT|TEXTAREA)$/.test((ev.target && ev.target.tagName) || '')) return;
    if (state.mode === 'edit' && state.lineStart !== null) { state.lineStart = null; drawPreview(null); rebuild(); }
    else if (state.mode === 'assign') onModeExit();
    else if (state.mode === 'view' && (state.selected || KINDS.some((k) => state.multi[k].size))) {
      state.selected = null;
      state.multi = emptySel();
      rebuild();
      onSelectionChange(multiOut());
      onSelect(null);
    }
  };
  renderer.domElement.addEventListener('pointerdown', onDownCapture, true);
  renderer.domElement.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  renderer.domElement.addEventListener('pointerleave', onLeave);
  renderer.domElement.addEventListener('dblclick', onDbl);
  window.addEventListener('keydown', onKey);

  const ro = new ResizeObserver(resize);
  ro.observe(element);
  const themeWatch = new MutationObserver(refresh);
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', refresh);

  resize();
  rebuild();
  fit();

  return {
    three: { THREE, scene, get camera() { return camera; }, renderer, controls, root },
    select(id) { if (id !== state.selected) { state.selected = id || null; rebuild(); } },
    setSelection(sel) {
      const next = emptySel();
      KINDS.forEach((k) => ((sel && sel[k]) || []).forEach((g) => next[k].add(g)));
      const same = KINDS.every((k) => next[k].size === state.multi[k].size && [...next[k]].every((g) => state.multi[k].has(g)));
      if (same) return;
      state.multi = next;
      rebuild();
    },
    setSelectionFilter(f) { state.filter = Object.assign({}, state.filter, f); },
    setLoadSelection(name) { state.loadSelection = name || null; rebuild(); },
    setModel(next) { state.model = next; state.dragPoint = null; refresh(); },
    setMode(mode, opts = {}) {
      state.mode = mode || 'view';
      if (opts.kind) state.assignKind = opts.kind;
      state.lineStart = null;
      state.dragPoint = null;
      box.style.display = 'none';
      clearGroup(previewGroup);
      renderer.domElement.style.cursor = state.mode === 'edit' ? 'crosshair' : 'default';
      rebuild();
    },
    setView,
    getView() { return state.view ? { ...state.view } : null; },
    setResults(next, opts) {
      results = next || null;
      if (opts) resultOptions = Object.assign({}, resultOptions, opts);
      refresh();
    },
    setDisplay(opts) { state.display = Object.assign({}, state.display, opts); rebuild(); },
    setWorkPlane(plane, offset) { state.workPlane = plane || 'XZ'; state.workPlaneOffset = offset || 0; },
    // Scale applied to the drawn displacements (0 when none are drawn)
    deformationScale() { return lastDeformationScale; },
    // The drawn line result: { key, min, max, scale } (scale: m per unit of force), or null
    diagramRange() { return lastDiagram ? { ...lastDiagram } : null; },
    fit,
    render,
    dispose() {
      ro.disconnect();
      themeWatch.disconnect();
      media.removeEventListener('change', refresh);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('keydown', onKey);
      controls.dispose();
      clearGroup(root);
      clearGroup(resultsGroup);
      clearGroup(previewGroup);
      renderer.dispose();
      element.textContent = '';
    },
  };
}

if (typeof window !== 'undefined') window.AwatifViewer = { createViewer };
