import { Element, Node } from "../../data-model";

export type ScalarByElement = Map<number, number>;
export type NodalScalarByElement = Map<number, [number, number, number]>;

export type SectionLineSample = {
  x: number;
  value: number;
};

export type SectionSampleOptions = {
  halfBand?: number;
  areaWeighted?: boolean;
};

export type SectionLineOptions = SectionSampleOptions & {
  xMin?: number;
  xMax?: number;
};

export function meanNodalScalarsByElement(
  nodalScalarsByElement?: NodalScalarByElement,
): ScalarByElement {
  const scalarsByElement: ScalarByElement = new Map();
  if (!nodalScalarsByElement) return scalarsByElement;

  nodalScalarsByElement.forEach((values, elementIndex) => {
    scalarsByElement.set(elementIndex, (values[0] + values[1] + values[2]) / 3);
  });

  return scalarsByElement;
}

export function sampleScalarFieldAtX(
  nodes: Node[],
  elements: Element[],
  scalarsByElement: ScalarByElement,
  x: number,
  options?: SectionSampleOptions,
): number | undefined {
  const halfBand = options?.halfBand ?? 0;
  const areaWeighted = options?.areaWeighted ?? true;

  let weightSum = 0;
  let weightedValueSum = 0;

  elements.forEach((element, elementIndex) => {
    if (element.length !== 3) return;

    const scalar = scalarsByElement.get(elementIndex);
    if (scalar === undefined) return;

    const centroidX = getTriangleCentroidX(nodes, element);
    if (Math.abs(centroidX - x) > halfBand) return;

    const weight = areaWeighted ? getTriangleAreaXY(nodes, element) : 1;
    weightSum += weight;
    weightedValueSum += scalar * weight;
  });

  if (weightSum <= 0) return undefined;
  return weightedValueSum / weightSum;
}

export function sampleScalarFieldAlongX(
  nodes: Node[],
  elements: Element[],
  scalarsByElement: ScalarByElement,
  samples: number,
  options?: SectionLineOptions,
): SectionLineSample[] {
  if (samples < 2) return [];

  const xMin = options?.xMin ?? getMinX(nodes);
  const xMax = options?.xMax ?? getMaxX(nodes);
  const dx = (xMax - xMin) / (samples - 1);
  const halfBand = options?.halfBand ?? dx * 0.5;

  return Array.from({ length: samples }, (_, i) => {
    const x = xMin + i * dx;
    const value = sampleScalarFieldAtX(nodes, elements, scalarsByElement, x, {
      halfBand,
      areaWeighted: options?.areaWeighted,
    });
    return { x, value: value ?? 0 };
  });
}

export function maxAbsSectionLineValue(samples: SectionLineSample[]): number {
  return samples.reduce((maxValue, sample) => {
    return Math.max(maxValue, Math.abs(sample.value));
  }, 0);
}

function getTriangleAreaXY(nodes: Node[], element: Element): number {
  const n1 = nodes[element[0]];
  const n2 = nodes[element[1]];
  const n3 = nodes[element[2]];
  return (
    Math.abs(
      (n2[0] - n1[0]) * (n3[1] - n1[1]) - (n3[0] - n1[0]) * (n2[1] - n1[1]),
    ) * 0.5
  );
}

function getTriangleCentroidX(nodes: Node[], element: Element): number {
  const n1 = nodes[element[0]];
  const n2 = nodes[element[1]];
  const n3 = nodes[element[2]];
  return (n1[0] + n2[0] + n3[0]) / 3;
}

function getMinX(nodes: Node[]): number {
  return nodes.reduce((min, node) => Math.min(min, node[0]), Number.POSITIVE_INFINITY);
}

function getMaxX(nodes: Node[]): number {
  return nodes.reduce((max, node) => Math.max(max, node[0]), Number.NEGATIVE_INFINITY);
}
