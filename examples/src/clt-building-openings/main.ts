import van from "vanjs-core";
import {
  CLTLayup,
  Element,
  Mesh,
  Node,
  createShellPatchCoupler,
  deform,
} from "awatif-fem";
import { getMesh as getAwatifMesh } from "awatif-mesh";
import { getViewer } from "awatif-ui";

import "./styles.css";

type SupportDof = [boolean, boolean, boolean, boolean, boolean, boolean];
type LoadDof = [number, number, number, number, number, number];
type Opening = { center: Node; width: number; height: number };
type Surface = {
  type: "wall" | "floor" | "roof";
  boundary_nodes: [number, number, number, number];
  thickness: number;
  openings?: Opening[];
};

type Member = { start_node: number; end_node: number };
type ElementInputs = {
  cltLayups: Map<number, CLTLayup>;
  elasticities: Map<number, number>;
  shearModuli: Map<number, number>;
  areas: Map<number, number>;
  momentsOfInertiaY: Map<number, number>;
  momentsOfInertiaZ: Map<number, number>;
  torsionalConstants: Map<number, number>;
};

const MM_PER_M = 1e3;
const KNM2_TO_NM2 = 1e3;
const EPS = 1e-8;
const TOL = 1e-4;

const meshSizeState = van.state(0.5);
const qState = van.state(4.335); // kN/m2

const nodesById = new Map<number, Node>([
  [1, [0, 0, 0]],
  [2, [6, 0, 0]],
  [3, [10, 0, 0]],
  [4, [0, 4, 0]],
  [5, [6, 4, 0]],
  [6, [10, 4, 0]],
  [7, [0, 0, 3]],
  [8, [6, 0, 3]],
  [9, [10, 0, 3]],
  [10, [0, 4, 3]],
  [11, [6, 4, 3]],
  [12, [10, 4, 3]],
  [13, [0, 0, 6]],
  [14, [6, 0, 6]],
  [15, [10, 0, 6]],
  [16, [0, 4, 6]],
  [17, [6, 4, 6]],
  [18, [10, 4, 6]],
]);

const surfaces: Surface[] = [
  {
    type: "wall",
    boundary_nodes: [1, 2, 8, 7],
    thickness: 0.2,
    openings: [{ center: [3, 0, 1.5], width: 2.5, height: 1.2 }],
  },
  {
    type: "wall",
    boundary_nodes: [7, 8, 14, 13],
    thickness: 0.2,
    openings: [{ center: [3, 0, 4.5], width: 2.5, height: 1.2 }],
  },
  {
    type: "wall",
    boundary_nodes: [4, 1, 7, 10],
    thickness: 0.2,
    openings: [{ center: [0, 2, 1.5], width: 1.0, height: 1.0 }],
  },
  {
    type: "wall",
    boundary_nodes: [10, 7, 13, 16],
    thickness: 0.2,
    openings: [{ center: [0, 2, 4.5], width: 1.0, height: 1.0 }],
  },
  { type: "wall", boundary_nodes: [5, 4, 10, 11], thickness: 0.2 },
  { type: "wall", boundary_nodes: [11, 10, 16, 17], thickness: 0.2 },
  { type: "wall", boundary_nodes: [2, 5, 11, 8], thickness: 0.2 },
  { type: "wall", boundary_nodes: [8, 11, 17, 14], thickness: 0.2 },
  { type: "floor", boundary_nodes: [7, 9, 12, 10], thickness: 0.25 },
  { type: "roof", boundary_nodes: [13, 15, 18, 16], thickness: 0.25 },
  { type: "wall", boundary_nodes: [3, 6, 18, 15], thickness: 0.2 },
];

const members: Member[] = [
  { start_node: 3, end_node: 15 },
  { start_node: 6, end_node: 18 },
];

const fixedNodeIds = [3, 6];
const pinnedLines: [number, number][] = [
  [1, 2],
  [2, 5],
  [5, 4],
  [4, 1],
];
const WALL_LAYER_RATIOS = [0.2, 0.15, 0.3, 0.15, 0.2];
const WALL_LAYER_ANGLES = [0, 90, 0, 90, 0];
const SLAB_LAYER_RATIOS = [0.1, 0.14, 0.12, 0.28, 0.12, 0.14, 0.1];
const SLAB_LAYER_ANGLES = [0, 90, 0, 90, 0, 90, 0];

const layupCache = new Map<number, CLTLayup>();

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

van.derive(() => {
  meshSizeState.val;
  qState.val;
  recompute();
});

document.body.append(
  getViewer({
    mesh,
    settingsObj: {
      deformedShape: true,
      shellResults: "displacementZ",
      shellResultScales: {
        displacementX: MM_PER_M,
        displacementY: MM_PER_M,
        displacementZ: MM_PER_M,
      },
      shellResultUnits: {
        displacementX: "mm",
        displacementY: "mm",
        displacementZ: "mm",
      },
      showFrameResults: false,
      nodes: false,
      nodesIndexes: false,
      elementsIndexes: false,
      orientations: false,
      customNumbers: [
        {
          folder: "Model",
          label: "mesh size [m]",
          state: meshSizeState,
          min: 0.2,
          max: 1.2,
          step: 0.05,
        },
        {
          folder: "Analysis Inputs",
          label: "q [kN/m2]",
          state: qState,
          min: -20,
          max: 20,
          step: 0.1,
        },
      ],
    },
  }),
);

function recompute() {
  const maxMeshSize = Math.max(0.2, meshSizeState.val);
  const coupler = createShellPatchCoupler(TOL);

  const cltLayups = new Map<number, CLTLayup>();
  const loadedShellElements: number[] = [];

  surfaces.forEach((surface) => {
    const b = expandBoundary(surface.boundary_nodes);
    const layup = getLayup(surface.thickness);
    const isLoadedSurface = surface.type !== "wall";

    const patches = surface.openings?.length
      ? meshWallWithOneOpening(b, surface.openings[0], coupler, maxMeshSize)
      : [appendPatch(coupler, b, maxMeshSize)];

    patches.forEach((patch) => {
      patch.elementMap.forEach((e) => cltLayups.set(e, layup));
      if (isLoadedSurface) {
        loadedShellElements.push(...patch.elementMap);
      }
    });
  });

  const global = coupler.getMesh();
  const nodes = [...global.nodes];
  const elements = [...global.elements];

  const modelNodeIndex = new Map<number, number>();
  nodesById.forEach((coord, id) => modelNodeIndex.set(id, findOrAddNode(nodes, coord)));

  const frameIndices: number[] = [];
  members.forEach((member) => {
    const chain = lineNodeChain(member.start_node, member.end_node);
    for (let i = 0; i < chain.length - 1; i++) {
      const n1 = modelNodeIndex.get(chain[i])!;
      const n2 = modelNodeIndex.get(chain[i + 1])!;
      if (n1 === n2) continue;
      frameIndices.push(elements.length);
      elements.push([n1, n2]);
    }
  });

  const supports = new Map<number, SupportDof>();

  fixedNodeIds.forEach((id) => {
    const idx = modelNodeIndex.get(id);
    if (idx !== undefined) supports.set(idx, [true, true, true, true, true, true]);
  });

  pinnedLines.forEach(([aId, bId]) => {
    const a = node(aId);
    const b = node(bId);
    nodes.forEach((p, i) => {
      if (!pointOnSegment(p, a, b)) return;
      const s = supports.get(i) ?? [false, false, false, false, false, false];
      supports.set(i, [true, true, true, s[3], s[4], s[5]]);
    });
  });

  const loads = new Map<number, LoadDof>();
  addAreaLoad(nodes, elements, loadedShellElements, qState.val * KNM2_TO_NM2, [0, 0, -1], loads);

  const elementInputs = createElementInputs(cltLayups);
  assignCircularColumnProperties(elementInputs, frameIndices, 0.15, 13e9, 0.8e9);

  const deformOutputs = deform(
    nodes,
    elements,
    { supports, loads },
    elementInputs,
    { includeReactions: true },
  );

  mesh.nodes!.val = nodes;
  mesh.elements!.val = elements;
  mesh.nodeInputs!.val = { supports, loads };
  mesh.elementInputs!.val = elementInputs;
  mesh.deformOutputs!.val = deformOutputs;
  mesh.analyzeOutputs!.val = {};
}

function appendPatch(
  coupler: ReturnType<typeof createShellPatchCoupler>,
  boundary: Node[],
  maxMeshSize: number,
) {
  const { nodes, elements } = getAwatifMesh({
    points: boundary,
    polygon: boundary.map((_, i) => i),
    maxMeshSize,
  });
  return coupler.appendPatch({ nodes, elements });
}

function expandBoundary(boundaryIds: number[]): Node[] {
  const ids: number[] = [];
  const entries = Array.from(nodesById.entries());

  for (let i = 0; i < boundaryIds.length; i++) {
    const aId = boundaryIds[i];
    const bId = boundaryIds[(i + 1) % boundaryIds.length];
    const a = node(aId);
    const b = node(bId);
    const ab = sub(b, a);
    const ab2 = dot(ab, ab);

    ids.push(aId);
    if (ab2 < EPS) continue;

    const mids = entries
      .filter(([id]) => id !== aId && id !== bId)
      .map(([id, p]) => {
        const ap = sub(p, a);
        const t = dot(ap, ab) / ab2;
        const proj = add(a, scale(ab, t));
        return { id, t, off: norm(sub(p, proj)) };
      })
      .filter((x) => x.t > EPS && x.t < 1 - EPS && x.off <= TOL)
      .sort((m1, m2) => m1.t - m2.t)
      .map((x) => x.id);

    ids.push(...mids);
  }

  return ids.map((id) => node(id));
}

function meshWallWithOneOpening(
  boundary: Node[],
  opening: Opening,
  coupler: ReturnType<typeof createShellPatchCoupler>,
  maxMeshSize: number,
) {
  const p0 = boundary[0];
  const p1 = boundary[1];
  const p3 = boundary[3];

  const u = sub(p1, p0);
  const v = sub(p3, p0);
  const uLen = norm(u);
  const vLen = norm(v);
  if (uLen < EPS || vLen < EPS) return [appendPatch(coupler, boundary, maxMeshSize)];

  const uHat = scale(u, 1 / uLen);
  const vHat = scale(v, 1 / vLen);
  const rel = sub(opening.center, p0);

  const uc = dot(rel, uHat);
  const vc = dot(rel, vHat);
  const o = {
    u0: clamp(uc - opening.width / 2, 0, uLen),
    u1: clamp(uc + opening.width / 2, 0, uLen),
    v0: clamp(vc - opening.height / 2, 0, vLen),
    v1: clamp(vc + opening.height / 2, 0, vLen),
  };

  const rects = [
    { u0: 0, u1: o.u0, v0: 0, v1: vLen },
    { u0: o.u1, u1: uLen, v0: 0, v1: vLen },
    { u0: o.u0, u1: o.u1, v0: 0, v1: o.v0 },
    { u0: o.u0, u1: o.u1, v0: o.v1, v1: vLen },
  ].filter((r) => r.u1 - r.u0 > EPS && r.v1 - r.v0 > EPS);

  return rects.map((r) => {
    const patch: Node[] = [
      add(p0, add(scale(uHat, r.u0), scale(vHat, r.v0))),
      add(p0, add(scale(uHat, r.u1), scale(vHat, r.v0))),
      add(p0, add(scale(uHat, r.u1), scale(vHat, r.v1))),
      add(p0, add(scale(uHat, r.u0), scale(vHat, r.v1))),
    ];
    return appendPatch(coupler, patch, maxMeshSize);
  });
}

function getLayup(thickness: number): CLTLayup {
  const key = Math.round(thickness * 1e6);
  const cached = layupCache.get(key);
  if (cached) return cached;

  const ratios = thickness <= 0.2 ? WALL_LAYER_RATIOS : SLAB_LAYER_RATIOS;
  const angles = thickness <= 0.2 ? WALL_LAYER_ANGLES : SLAB_LAYER_ANGLES;

  const layup: CLTLayup = {
    layers: ratios.map((r, i) => layer(thickness * r, angles[i])),
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
    },
  };

  layupCache.set(key, layup);
  return layup;
}

function layer(thickness: number, thetaDeg: number) {
  return {
    thickness,
    thetaDeg,
    Ex: 11000e6,
    Ey: 370e6,
    nuXY: 0.2,
    Gxy: 690e6,
    Gxz: 690e6,
    Gyz: 69e6,
  };
}

function lineNodeChain(startId: number, endId: number): number[] {
  const start = node(startId);
  const end = node(endId);
  const d = sub(end, start);
  const d2 = dot(d, d);

  const hits = Array.from(nodesById.entries())
    .map(([id, p]) => {
      const r = sub(p, start);
      const t = d2 < EPS ? 0 : dot(r, d) / d2;
      const proj = add(start, scale(d, t));
      return { id, t, off: norm(sub(p, proj)) };
    })
    .filter((x) => x.t >= -TOL && x.t <= 1 + TOL && x.off <= TOL)
    .sort((a, b) => a.t - b.t)
    .map((x) => x.id);

  return hits;
}

function findOrAddNode(nodes: Node[], target: Node): number {
  for (let i = 0; i < nodes.length; i++) {
    if (dist2(nodes[i], target) <= TOL * TOL) return i;
  }
  nodes.push(target);
  return nodes.length - 1;
}

function pointOnSegment(p: Node, a: Node, b: Node): boolean {
  const ab = sub(b, a);
  const ap = sub(p, a);
  const ab2 = dot(ab, ab);
  if (ab2 < EPS) return norm(sub(p, a)) <= TOL;
  const t = clamp(dot(ap, ab) / ab2, 0, 1);
  const proj = add(a, scale(ab, t));
  return norm(sub(p, proj)) <= TOL;
}

function addAreaLoad(
  nodes: Node[],
  elements: Element[],
  indices: number[],
  pressure: number,
  dir: Node,
  loads: Map<number, LoadDof>,
) {
  if (Math.abs(pressure) < EPS) return;
  indices.forEach((idx) => {
    const e = elements[idx];
    if (!e || e.length !== 3) return;
    const area = triangleArea(nodes[e[0]], nodes[e[1]], nodes[e[2]]);
    const nodal = (pressure * area) / 3;
    e.forEach((n) => {
      const v = loads.get(n) ?? [0, 0, 0, 0, 0, 0];
      const next: LoadDof = [
        v[0] + nodal * dir[0],
        v[1] + nodal * dir[1],
        v[2] + nodal * dir[2],
        v[3],
        v[4],
        v[5],
      ];
      loads.set(n, next);
    });
  });
}

function createElementInputs(cltLayups: Map<number, CLTLayup>): ElementInputs {
  return {
    cltLayups,
    elasticities: new Map<number, number>(),
    shearModuli: new Map<number, number>(),
    areas: new Map<number, number>(),
    momentsOfInertiaY: new Map<number, number>(),
    momentsOfInertiaZ: new Map<number, number>(),
    torsionalConstants: new Map<number, number>(),
  };
}

function assignCircularColumnProperties(
  elementInputs: ElementInputs,
  frameIndices: number[],
  radius: number,
  elasticity: number,
  shearModulus: number,
) {
  const area = Math.PI * radius * radius;
  const inertia = (Math.PI * radius ** 4) / 4;
  const torsion = (Math.PI * radius ** 4) / 2;

  frameIndices.forEach((idx) => {
    elementInputs.elasticities.set(idx, elasticity);
    elementInputs.shearModuli.set(idx, shearModulus);
    elementInputs.areas.set(idx, area);
    elementInputs.momentsOfInertiaY.set(idx, inertia);
    elementInputs.momentsOfInertiaZ.set(idx, inertia);
    elementInputs.torsionalConstants.set(idx, torsion);
  });
}

function triangleArea(a: Node, b: Node, c: Node): number {
  return 0.5 * norm(cross(sub(b, a), sub(c, a)));
}

function dist2(a: Node, b: Node): number {
  const x = a[0] - b[0];
  const y = a[1] - b[1];
  const z = a[2] - b[2];
  return x * x + y * y + z * z;
}

function add(a: Node, b: Node): Node {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a: Node, b: Node): Node {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(v: Node, s: number): Node {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function dot(a: Node, b: Node): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a: Node, b: Node): Node {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function norm(v: Node): number {
  return Math.hypot(v[0], v[1], v[2]);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function node(id: number): Node {
  const p = nodesById.get(id);
  if (!p) throw new Error(`Missing model node ${id}`);
  return p;
}
