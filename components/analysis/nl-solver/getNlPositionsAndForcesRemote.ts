import type { Mesh } from "../../data-model";

const NL_SOLVE_ENDPOINT =
  "https://phdoimejezjrvplwdcnb.supabase.co/functions/v1/nl-solve";

type MapEntry<T> = [number, T];

export type SimSettings = {
  tol: number;
  maximum_iter: number;
};

type RemoteInternalForce = {
  N: [number, number];
  Vy: [number, number];
  Vz: [number, number];
  Mx: [number, number];
  My: [number, number];
  Mz: [number, number];
};

type RemoteNlSolveResponse = {
  positions: number[];
  internalForces: MapEntry<RemoteInternalForce>[];
  iterationCount: number;
};

type Vec3 = [number, number, number];
type Support = Mesh["supports"]["val"] extends Map<number, infer T>
  ? T
  : never;

export async function getNlPositionsAndForcesRemote(
  nodes: Mesh["nodes"]["val"],
  elements: Mesh["elements"]["val"],
  loads: Mesh["loads"]["val"],
  supports: Mesh["supports"]["val"],
  elementsProps: Mesh["elementsProps"]["val"],
  releases?: Mesh["releases"]["val"],
  simSettings: SimSettings = {
    tol: 1e-3,
    maximum_iter: 1000,
  },
): Promise<{
  positions: number[];
  internalForces: Mesh["internalForces"]["val"];
  iterationCount: number;
}> {
  if (!nodes || nodes.length === 0) {
    throw new Error("Nodes array is null, undefined or empty");
  }

  const originalNodeCount = nodes.length;
  const originalElementCount = elements?.length || 0;

  const { newNodes, newElements, newSupports, newElementsProps } =
    addFixedSupports(nodes, elements, supports, elementsProps);

  const response = await fetch(NL_SOLVE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nodes: newNodes,
      elements: newElements,
      loads: mapToEntries(loads),
      supports: mapToEntries(newSupports),
      elementsProps: mapToEntries(newElementsProps ?? elementsProps),
      releases: mapToEntries(releases),
      simSettings,
      originalNodeCount,
      originalElementCount,
    }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data = await readJson<RemoteNlSolveResponse>(response);
  if (!data) {
    throw new Error("Nonlinear solver returned no data.");
  }

  return {
    positions: data.positions,
    internalForces: new Map(data.internalForces),
    iterationCount: data.iterationCount,
  };
}

function mapToEntries<T>(map: Map<number, T> | undefined): MapEntry<T>[] {
  return map ? Array.from(map.entries()) : [];
}

function addFixedSupports(
  nodes: Mesh["nodes"]["val"],
  elements: Mesh["elements"]["val"],
  supports: Mesh["supports"]["val"],
  elementsProps: Mesh["elementsProps"]["val"],
  lengthFactor: number = 0.01,
): {
  newNodes: Mesh["nodes"]["val"];
  newElements: Mesh["elements"]["val"];
  newSupports: Mesh["supports"]["val"];
  newElementsProps?: Mesh["elementsProps"]["val"];
} {
  if (!nodes || !elements || !supports || !elementsProps) {
    return {
      newNodes: nodes,
      newElements: elements,
      newSupports: supports,
      newElementsProps: elementsProps,
    };
  }

  const newNodes = nodes.map((node) => [...node]);
  const newElements = elements.map((element) => [...element]);
  const newSupports: Mesh["supports"]["val"] = new Map(
    Array.from(supports, ([index, support]) => [
      index,
      [...support] as Support,
    ]),
  );
  const newElementsProps: Mesh["elementsProps"]["val"] = new Map(
    Array.from(elementsProps, ([index, props]) => [index, { ...props }]),
  );

  supports.forEach((support, nodeIndex) => {
    if (!support.every((value) => value === true)) return;

    const node = nodes[nodeIndex] as Vec3 | undefined;
    if (!node) return;

    elements.forEach((element, originalElementIndex) => {
      if (!element.includes(nodeIndex)) return;

      const otherNodeIndex = element[0] === nodeIndex ? element[1] : element[0];
      const otherNode = nodes[otherNodeIndex] as Vec3 | undefined;
      if (!otherNode) return;

      const newNode = getNewNodeForFixity(node, otherNode, lengthFactor);
      const newNodeIndex = newNodes.length;
      newNodes.push(newNode);
      newElements.push([nodeIndex, newNodeIndex]);
      newSupports.set(newNodeIndex, [true, true, true, true, true, true]);

      const originalElementProps = elementsProps.get(originalElementIndex);
      newElementsProps.set(newElements.length - 1, {
        elasticity: originalElementProps?.elasticity ?? 0,
        area: originalElementProps?.area ?? 0,
        momentInertiaZ: originalElementProps?.momentInertiaZ ?? 0,
        momentInertiaY: originalElementProps?.momentInertiaY ?? 0,
        shearModulus: originalElementProps?.shearModulus ?? 0,
        torsionalConstant: originalElementProps?.torsionalConstant ?? 0,
      });
    });
  });

  return { newNodes, newElements, newSupports, newElementsProps };
}

function getNewNodeForFixity(
  node: Vec3,
  otherNode: Vec3,
  lengthFactor: number,
): Vec3 {
  const direction = subtract(otherNode, node);
  const length = norm(direction);
  const unit = divide(direction, length);
  return add(node, multiply(unit, -lengthFactor));
}

function subtract(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function multiply(a: Vec3, factor: number): Vec3 {
  return [a[0] * factor, a[1] * factor, a[2] * factor];
}

function divide(a: Vec3, factor: number): Vec3 {
  return [a[0] / factor, a[1] / factor, a[2] / factor];
}

function norm(a: Vec3): number {
  return Math.hypot(a[0], a[1], a[2]);
}

async function readErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("Content-Type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      const body = await response.json();
      if (typeof body?.error === "string") return body.error;
      return JSON.stringify(body);
    }

    const text = await response.text();
    return text || response.statusText;
  } catch {
    return response.statusText || `Request failed with status ${response.status}`;
  }
}

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
