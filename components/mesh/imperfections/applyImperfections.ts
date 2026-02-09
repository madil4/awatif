import { Components, ComponentsType, Geometry } from "../../data-model";
import { ImperfectionsParams, computeThetaI } from "./imperfections";

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

  const template = templates.get(ComponentsType.MESH)?.get("imperfections");
  if (!template) return;

  for (const component of imperfectionComponents) {
    const params = (component.params ??
      template.defaultParams) as ImperfectionsParams;
    const selectedLineIds = component.geometry;
    if (selectedLineIds.length === 0) continue;

    const sign = params.direction === "negative" ? -1 : 1;

    // Global inclination: offset x by θᵢ × (y - y_base) for all nodes of selected lines
    // This creates a rotation about the base, keeping bottom nodes fixed
    if (params.globalInclination) {
      const thetaI = computeThetaI(params);
      const nodeIndices = collectNodesFromLines(
        selectedLineIds,
        lineToElements,
        allElements,
      );

      // Find the base (minimum y-coordinate) of the structure
      let y_base = Infinity;
      for (const ni of nodeIndices) {
        y_base = Math.min(y_base, allNodes[ni][1]);
      }

      // Apply inclination relative to the base
      for (const ni of nodeIndices) {
        allNodes[ni][0] += sign * thetaI * (allNodes[ni][1] - y_base);
      }
    }

    // Local bow: offset internal nodes perpendicular to chord by e₀·sin(πt)
    if (params.localBow) {
      const d = Number(params.bowRatioDenominator);
      for (const lineId of selectedLineIds) {
        applyLocalBow(
          lineId,
          d,
          sign,
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

function collectNodesFromLines(
  lineIds: number[],
  lineToElements: Map<number, number[]>,
  allElements: number[][],
): Set<number> {
  const nodeIndices = new Set<number>();
  for (const lineId of lineIds) {
    const elementIndices = lineToElements.get(lineId);
    if (!elementIndices) continue;
    for (const ei of elementIndices) {
      for (const ni of allElements[ei]) {
        nodeIndices.add(ni);
      }
    }
  }
  return nodeIndices;
}

function applyLocalBow(
  lineId: number,
  d: number,
  sign: number,
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

  const x0 = allNodes[startNi][0];
  const y0 = allNodes[startNi][1];
  const x1 = allNodes[endNi][0];
  const y1 = allNodes[endNi][1];

  const dx = x1 - x0;
  const dy = y1 - y0;
  const L = Math.sqrt(dx * dx + dy * dy);
  if (L < 1e-10) return;

  const e0 = L / d;

  // Perpendicular normal to the chord
  const nx = (-dy / L) * sign;
  const ny = (dx / L) * sign;

  // Offset each internal node by e₀·sin(π·t)
  for (const ni of internalNodeIndices) {
    const px = allNodes[ni][0] - x0;
    const py = allNodes[ni][1] - y0;
    const t = (px * dx + py * dy) / (L * L);

    const bow = e0 * Math.sin(Math.PI * t);
    allNodes[ni][0] += bow * nx;
    allNodes[ni][1] += bow * ny;
  }
}
