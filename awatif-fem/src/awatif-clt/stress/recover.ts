import { multiply } from "mathjs";
import {
  CLTLayup,
  DeformOutputs,
  Element,
  ElementInputs,
  Node,
} from "../../data-model";
import { getTransformationMatrix } from "../../utils/getTransformationMatrix";
import { getShellLinearKinematics } from "./kinematics";
import {
  InPlaneRecoveryMode,
  LayerInPlaneStressProfile,
  recoverLaminateInPlaneStressProfile,
} from "./inPlane";

export type CltInPlaneStressProfiles = Map<number, LayerInPlaneStressProfile[]>;

export function recoverCltInPlaneStressProfiles(
  nodes: Node[],
  elements: Element[],
  elementInputs: ElementInputs,
  deformOutputs: DeformOutputs,
  options?: {
    mode?: InPlaneRecoveryMode;
  },
): CltInPlaneStressProfiles {
  const profiles: CltInPlaneStressProfiles = new Map();
  const deformations = deformOutputs.deformations;
  if (!deformations) return profiles;

  elements.forEach((element, elementIndex) => {
    if (element.length !== 3) return;
    const layup = elementInputs.cltLayups?.get(elementIndex);
    if (!layup) return;

    const elementNodes = element.map((nodeIndex) => nodes[nodeIndex]);
    const elementGlobalDofs = getElementGlobalDofs(element, deformations);
    const transform = getTransformationMatrix(elementNodes);
    const elementLocalDofs = multiply(transform, elementGlobalDofs) as number[];
    const localNodes = getElementLocalNodes(elementNodes, transform);

    const kinematics = getShellLinearKinematics(localNodes, elementLocalDofs);
    const elementProfiles = recoverLaminateInPlaneStressProfile(
      layup,
      kinematics.membraneStrain,
      kinematics.curvature,
      { mode: options?.mode },
    );

    profiles.set(elementIndex, elementProfiles);
  });

  return profiles;
}

export function getLayerPointStressComponent(
  profile: LayerInPlaneStressProfile[],
  layerIndex: number,
  point: "top" | "mid" | "bottom",
  component: "sigmaX" | "sigmaY" | "tauXY",
): number | undefined {
  const layer = profile[layerIndex];
  if (!layer) return undefined;
  const pointValue = layer.points.find((it) => it.point === point);
  if (!pointValue) return undefined;

  const componentIndex = component === "sigmaX" ? 0 : component === "sigmaY" ? 1 : 2;
  return pointValue.stressShell[componentIndex];
}

function getElementGlobalDofs(
  element: number[],
  deformations: NonNullable<DeformOutputs["deformations"]>,
): number[] {
  const dofs: number[] = [];
  element.forEach((nodeIndex) => {
    const nodeDofs = deformations.get(nodeIndex) ?? [0, 0, 0, 0, 0, 0];
    dofs.push(...nodeDofs);
  });
  return dofs;
}

function getElementLocalNodes(elementNodes: Node[], transform: number[][]): Node[] {
  const [originX, originY, originZ] = elementNodes[0];
  const rotation = [
    [transform[0][0], transform[0][1], transform[0][2]],
    [transform[1][0], transform[1][1], transform[1][2]],
    [transform[2][0], transform[2][1], transform[2][2]],
  ];

  return elementNodes.map(([x, y, z]) => {
    const relative = [x - originX, y - originY, z - originZ];
    const local = mul3x3Vec(rotation, relative);
    return [local[0], local[1], local[2]];
  });
}

function mul3x3Vec(m: number[][], v: number[]): [number, number, number] {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}
