import { ComponentsType, Geometry } from "../data-model";
import { ImperfectionsParams } from "./imperfections";

export function applyImperfections(
  imperfectionComponents: {
    geometry: number[];
    params?: Record<string, unknown>;
    templateId: string;
  }[],
  templates: Map<ComponentsType, Map<string, any>>,
  geometry: {
    points: Geometry["points"]["val"];
    lines: Geometry["lines"]["val"];
  },
  allNodes: number[][],
  allElements: number[][],
  lineToElements: Map<number, number[]>,
  pointToNodes: Map<number, number[]>,
): void {
  if (imperfectionComponents.length === 0) return;

  const template = templates
    .get(ComponentsType.IMPERFECTIONS)
    ?.get("imperfections");
  if (!template) return;

  for (const component of imperfectionComponents) {
    const params = ({ ...template.defaultParams, ...component.params }) as ImperfectionsParams;
    const selectedLineIds = component.geometry;
    if (selectedLineIds.length === 0) continue;

    const sign = params.direction.includes("negative") ? -1 : 1;

    // Global inclination: offset each line's nodes along local Y by θ₀ × (distance from base)
    if (params.globalInclination) {
      for (const lineId of selectedLineIds) {
        const line = geometry.lines.get(lineId);
        if (!line) continue;
        const [startPtId, endPtId] = line;
        const startNi = (pointToNodes.get(startPtId) ?? [])[0];
        const endNi = (pointToNodes.get(endPtId) ?? [])[0];
        if (startNi === undefined || endNi === undefined) continue;
        const p0 = allNodes[startNi];
        const p1 = allNodes[endNi];
        const dx = p1[0] - p0[0], dy = p1[1] - p0[1], dz = p1[2] - p0[2];
        const L = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (L < 1e-10) continue;
        const axes = getLocalAxes(p0, p1);
        if (!axes) continue;
        const localDir = params.direction.startsWith("z") ? axes.localZ : axes.localY;
        const elementIndices = lineToElements.get(lineId);
        if (!elementIndices) continue;
        const lineNodeSet = new Set<number>();
        for (const ei of elementIndices) {
          for (const ni of allElements[ei]) lineNodeSet.add(ni);
        }
        for (const ni of lineNodeSet) {
          const px = allNodes[ni][0] - p0[0];
          const py = allNodes[ni][1] - p0[1];
          const pz = allNodes[ni][2] - p0[2];
          const t = (px * dx + py * dy + pz * dz) / (L * L);
          const offset = sign * params.theta0 * t * L;
          allNodes[ni][0] += offset * localDir[0];
          allNodes[ni][1] += offset * localDir[1];
          allNodes[ni][2] += offset * localDir[2];
        }
      }
    }

    // Local bow: offset internal nodes perpendicular to chord by e₀·sin(πt)
    if (params.localBow) {
      const d = params.bowRatioDenominator;
      for (const lineId of selectedLineIds) {
        applyLocalBow(
          lineId,
          d,
          sign,
          params.direction.startsWith("z"),
          geometry,
          allNodes,
          allElements,
          lineToElements,
          pointToNodes,
        );
      }
    }
  }
}


function applyLocalBow(
  lineId: number,
  d: number,
  sign: number,
  useLocalZ: boolean,
  geometry: {
    points: Geometry["points"]["val"];
    lines: Geometry["lines"]["val"];
  },
  allNodes: number[][],
  allElements: number[][],
  lineToElements: Map<number, number[]>,
  pointToNodes: Map<number, number[]>,
): void {
  const line = geometry.lines.get(lineId);
  if (!line) return;

  const [startPtId, endPtId] = line;

  // Get endpoint node indices
  const startNodeIndices = new Set(pointToNodes.get(startPtId) ?? []);
  const endNodeIndices = new Set(pointToNodes.get(endPtId) ?? []);

  // Collect all node indices for this line's elements
  const elementIndices = lineToElements.get(lineId);
  if (!elementIndices) return;

  const allLineNodeIndices: number[] = [];
  for (const ei of elementIndices) {
    for (const ni of allElements[ei]) {
      if (!allLineNodeIndices.includes(ni)) {
        allLineNodeIndices.push(ni);
      }
    }
  }

  // Identify internal nodes (not at endpoints)
  const internalNodeIndices = allLineNodeIndices.filter(
    (ni) => !startNodeIndices.has(ni) && !endNodeIndices.has(ni),
  );
  if (internalNodeIndices.length === 0) return;

  // Get chord endpoints
  const startNi = startNodeIndices.values().next().value;
  const endNi = endNodeIndices.values().next().value;
  if (startNi === undefined || endNi === undefined) return;

  const p0 = allNodes[startNi];
  const p1 = allNodes[endNi];
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], dz = p1[2] - p0[2];
  const L = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (L < 1e-10) return;

  const e0 = L / d;
  const axes = getLocalAxes(p0, p1);
  if (!axes) return;
  const localDir = useLocalZ ? axes.localZ : axes.localY;

  // Offset each internal node by e₀·sin(π·t) along local Y or Z
  for (const ni of internalNodeIndices) {
    const px = allNodes[ni][0] - p0[0];
    const py = allNodes[ni][1] - p0[1];
    const pz = allNodes[ni][2] - p0[2];
    const t = (px * dx + py * dy + pz * dz) / (L * L);
    const bow = e0 * Math.sin(Math.PI * t) * sign;
    allNodes[ni][0] += bow * localDir[0];
    allNodes[ni][1] += bow * localDir[1];
    allNodes[ni][2] += bow * localDir[2];
  }
}

function getLocalAxes(
  p0: number[],
  p1: number[],
): { localY: [number, number, number]; localZ: [number, number, number] } | null {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], dz = p1[2] - p0[2];
  const L = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (L < 1e-9) return null;
  const l = dx / L, m = dy / L, n = dz / L;
  const D = Math.sqrt(l * l + m * m);
  if (Math.abs(n - 1) < 1e-9) return { localY: [0, 1, 0], localZ: [-1, 0, 0] };
  if (Math.abs(n + 1) < 1e-9) return { localY: [0, 1, 0], localZ: [1, 0, 0] };
  return {
    localY: [-m / D, l / D, 0],
    localZ: [(-l * n) / D, (-m * n) / D, D],
  };
}
