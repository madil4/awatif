import { AnalyzeOutputs, DeformOutputs, Element, Node } from "../../data-model";
import {
  maxAbsSectionLineValue,
  meanNodalScalarsByElement,
  sampleScalarFieldAlongX,
} from "../stress/sections";

export type OneWaySectionMetrics = {
  specificSupportShearKnPerM: number;
  maxSpecificBendingMomentKnmPerM: number;
  maxDownwardDeflectionMm: number;
};

export type OneWayBeamReference = {
  specificSupportShearKnPerM: number;
  maxSpecificBendingMomentKnmPerM: number;
};

export function getOneWaySectionMetrics(
  nodes: Node[],
  elements: Element[],
  analyzeOutputs: AnalyzeOutputs,
  deformations?: DeformOutputs["deformations"],
  reactions?: DeformOutputs["reactions"],
  options?: {
    xMin?: number;
    xMax?: number;
    supportX?: number;
    supportTolerance?: number;
    stripSamples?: number;
    slabWidth?: number;
  },
): OneWaySectionMetrics {
  const xMin = options?.xMin ?? getMinX(nodes);
  const xMax = options?.xMax ?? getMaxX(nodes);
  const slabWidth = options?.slabWidth ?? getSpanWidthY(nodes);
  const supportX = options?.supportX ?? xMin;

  return {
    specificSupportShearKnPerM: getSpecificSupportShearKnPerM(
      nodes,
      reactions,
      slabWidth,
      supportX,
      options?.supportTolerance,
    ),
    maxSpecificBendingMomentKnmPerM: getMaxSpecificBendingMomentKnmPerM(
      nodes,
      elements,
      analyzeOutputs,
      xMin,
      xMax,
      options?.stripSamples,
    ),
    maxDownwardDeflectionMm: getMaximumDownwardDeflectionMm(deformations),
  };
}

export function getSimplySupportedBeamReference(
  loadKnPerM2: number,
  spanLengthM: number,
): OneWayBeamReference {
  const absLoad = Math.abs(loadKnPerM2);
  return {
    specificSupportShearKnPerM: (absLoad * spanLengthM) / 2,
    maxSpecificBendingMomentKnmPerM: (absLoad * spanLengthM ** 2) / 8,
  };
}

export function getRelativeErrorPercent(actual: number, reference: number): number {
  if (Math.abs(reference) < 1e-12) return 0;
  return (Math.abs(actual - reference) / Math.abs(reference)) * 100;
}

export function getSpecificSupportShearKnPerM(
  nodes: Node[],
  reactions: DeformOutputs["reactions"] | undefined,
  slabWidth: number,
  supportX: number,
  supportTolerance = 1e-6,
): number {
  if (!reactions?.size || slabWidth <= 0) return 0;

  let supportReactionZ = 0;
  reactions.forEach((reaction, nodeIndex) => {
    if (Math.abs(nodes[nodeIndex][0] - supportX) <= supportTolerance) {
      supportReactionZ += reaction[2] ?? 0;
    }
  });

  return Math.abs(supportReactionZ / slabWidth);
}

export function getMaxSpecificBendingMomentKnmPerM(
  nodes: Node[],
  elements: Element[],
  analyzeOutputs: AnalyzeOutputs,
  xMin: number,
  xMax: number,
  stripSamples = 16,
): number {
  const bendingByElement = meanNodalScalarsByElement(analyzeOutputs.bendingXX);
  const sectionCurve = sampleScalarFieldAlongX(
    nodes,
    elements,
    bendingByElement,
    stripSamples,
    { xMin, xMax },
  );
  return maxAbsSectionLineValue(sectionCurve);
}

export function getMaximumDownwardDeflectionMm(
  deformations?: DeformOutputs["deformations"],
): number {
  if (!deformations?.size) return 0;

  let minWz = 0;
  deformations.forEach((dof) => {
    minWz = Math.min(minWz, dof[2] ?? 0);
  });

  return -minWz * 1000;
}

function getMinX(nodes: Node[]): number {
  return nodes.reduce(
    (minX, node) => Math.min(minX, node[0]),
    Number.POSITIVE_INFINITY,
  );
}

function getMaxX(nodes: Node[]): number {
  return nodes.reduce(
    (maxX, node) => Math.max(maxX, node[0]),
    Number.NEGATIVE_INFINITY,
  );
}

function getSpanWidthY(nodes: Node[]): number {
  const minY = nodes.reduce(
    (minValue, node) => Math.min(minValue, node[1]),
    Number.POSITIVE_INFINITY,
  );
  const maxY = nodes.reduce(
    (maxValue, node) => Math.max(maxValue, node[1]),
    Number.NEGATIVE_INFINITY,
  );
  return Math.max(0, maxY - minY);
}
