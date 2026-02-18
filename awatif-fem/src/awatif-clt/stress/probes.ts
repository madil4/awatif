import { Element, Node } from "../../data-model";
import { ThroughThicknessPoint } from "./inPlane";
import {
  CltInPlaneStressProfiles,
  CltTransverseStressProfiles,
  getLayerPointStressComponent,
  getLayerPointTransverseStressComponent,
} from "./recover";

export type ProbePoint2D = [number, number];

export type InPlaneProbeComponent = "sigmaX" | "sigmaY" | "tauXY";
export type TransverseProbeComponent = "tauXZ" | "tauYZ";

export type ElementSearchOptions = {
  weightX?: number;
  weightY?: number;
};

export function findClosestElementByCentroid(
  nodes: Node[],
  elements: Element[],
  target: ProbePoint2D,
  options?: {
    search?: ElementSearchOptions;
    includeElement?: (elementIndex: number) => boolean;
  },
): number | undefined {
  const weightX = options?.search?.weightX ?? 1;
  const weightY = options?.search?.weightY ?? 1;

  let closestElement: number | undefined;
  let minDistance = Number.POSITIVE_INFINITY;

  elements.forEach((element, elementIndex) => {
    if (element.length !== 3) return;
    if (options?.includeElement && !options.includeElement(elementIndex)) return;

    const n1 = nodes[element[0]];
    const n2 = nodes[element[1]];
    const n3 = nodes[element[2]];
    const cx = (n1[0] + n2[0] + n3[0]) / 3;
    const cy = (n1[1] + n2[1] + n3[1]) / 3;

    const dx = cx - target[0];
    const dy = cy - target[1];
    const distance = Math.hypot(weightX * dx, weightY * dy);

    if (distance < minDistance) {
      minDistance = distance;
      closestElement = elementIndex;
    }
  });

  return closestElement;
}

export function sampleClosestInPlaneStressMpa(
  nodes: Node[],
  elements: Element[],
  profilesByElement: CltInPlaneStressProfiles,
  target: ProbePoint2D,
  layerIndex: number,
  point: ThroughThicknessPoint,
  component: InPlaneProbeComponent,
  search?: ElementSearchOptions,
): number | undefined {
  const elementIndex = findClosestElementByCentroid(nodes, elements, target, {
    search,
    includeElement: (idx) => profilesByElement.has(idx),
  });
  if (elementIndex === undefined) return undefined;

  const profile = profilesByElement.get(elementIndex);
  if (!profile) return undefined;

  const value = getLayerPointStressComponent(profile, layerIndex, point, component);
  if (value === undefined) return undefined;

  // Internal stresses are kN/m^2 (kPa); convert to MPa.
  return value / 1000;
}

export function sampleClosestTransverseStressMpa(
  nodes: Node[],
  elements: Element[],
  profilesByElement: CltTransverseStressProfiles,
  target: ProbePoint2D,
  layerIndex: number,
  point: ThroughThicknessPoint,
  component: TransverseProbeComponent,
  search?: ElementSearchOptions,
): number | undefined {
  const elementIndex = findClosestElementByCentroid(nodes, elements, target, {
    search,
    includeElement: (idx) => profilesByElement.has(idx),
  });
  if (elementIndex === undefined) return undefined;

  const profile = profilesByElement.get(elementIndex);
  if (!profile) return undefined;

  const value = getLayerPointTransverseStressComponent(
    profile,
    layerIndex,
    point,
    component,
  );
  if (value === undefined) return undefined;

  // Internal stresses are kN/m^2 (kPa); convert to MPa.
  return value / 1000;
}
