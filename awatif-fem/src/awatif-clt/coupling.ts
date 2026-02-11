import { Element, Node } from "../data-model";

export type CLTWallMesh = {
  nodes: Node[];
  elements: Element[];
};

export type CoupledShellMesh = {
  nodes: Node[];
  elements: Element[];
  nodeMaps: number[][];
  elementMaps: number[][];
};

export type ShellPatchAppendResult = {
  nodeMap: number[];
  elementMap: number[];
  elementsGlobal: Element[];
};

export type ShellPatchCoupler = {
  appendPatch: (patch: CLTWallMesh) => ShellPatchAppendResult;
  getMesh: () => { nodes: Node[]; elements: Element[] };
};

type SpatialHashIndex = {
  tolerance: number;
  buckets: Map<string, number[]>;
};

/**
 * Couples multiple shell patches by welding coincident nodes within tolerance.
 * This enables displacement compatibility across touching CLT wall panels.
 */
export function coupleShellPatches(
  patches: CLTWallMesh[],
  tolerance = 1e-4,
): CoupledShellMesh {
  const coupler = createShellPatchCoupler(tolerance);
  const nodeMaps: number[][] = [];
  const elementMaps: number[][] = [];
  patches.forEach((patch) => {
    const result = coupler.appendPatch(patch);
    nodeMaps.push(result.nodeMap);
    elementMaps.push(result.elementMap);
  });
  const { nodes, elements } = coupler.getMesh();

  return { nodes, elements, nodeMaps, elementMaps };
}

/**
 * Convenience helper for coupling exactly two CLT walls.
 */
export function coupleTwoCLTWalls(
  wallA: CLTWallMesh,
  wallB: CLTWallMesh,
  tolerance = 1e-4,
): {
  nodes: Node[];
  elements: Element[];
  wallANodeMap: number[];
  wallBNodeMap: number[];
  wallAElementMap: number[];
  wallBElementMap: number[];
} {
  const coupled = coupleShellPatches([wallA, wallB], tolerance);

  return {
    nodes: coupled.nodes,
    elements: coupled.elements,
    wallANodeMap: coupled.nodeMaps[0] ?? [],
    wallBNodeMap: coupled.nodeMaps[1] ?? [],
    wallAElementMap: coupled.elementMaps[0] ?? [],
    wallBElementMap: coupled.elementMaps[1] ?? [],
  };
}

export function createShellPatchCoupler(tolerance = 1e-4): ShellPatchCoupler {
  const nodes: Node[] = [];
  const elements: Element[] = [];
  const spatialIndex = createNodeSpatialIndex(tolerance);

  function appendPatch(patch: CLTWallMesh): ShellPatchAppendResult {
    const nodeMap = patch.nodes.map((node) => {
      const existingNodeIndex = findCoincidentNodeIndex(nodes, node, spatialIndex);
      if (existingNodeIndex !== null) return existingNodeIndex;

      const newNodeIndex = nodes.length;
      nodes.push(node);
      addNodeToSpatialIndex(node, newNodeIndex, spatialIndex);
      return newNodeIndex;
    });

    const elementMap: number[] = [];
    const elementsGlobal: Element[] = [];

    patch.elements.forEach((element) => {
      const mappedElement = element.map((nodeIndex) => nodeMap[nodeIndex]);
      if (hasDuplicatedNodeIndex(mappedElement)) return;

      elementMap.push(elements.length);
      elementsGlobal.push(mappedElement);
      elements.push(mappedElement);
    });

    return {
      nodeMap,
      elementMap,
      elementsGlobal,
    };
  }

  function getMesh() {
    return { nodes, elements };
  }

  return { appendPatch, getMesh };
}

function hasDuplicatedNodeIndex(element: number[]): boolean {
  const uniqueNodeCount = new Set(element).size;
  return uniqueNodeCount !== element.length;
}

function createNodeSpatialIndex(tolerance: number): SpatialHashIndex {
  return {
    tolerance,
    buckets: new Map(),
  };
}

function findCoincidentNodeIndex(
  nodes: Node[],
  node: Node,
  spatialIndex: SpatialHashIndex,
): number | null {
  const candidateBucketKeys = getNeighborBucketKeys(node, spatialIndex.tolerance);
  const toleranceSquared = spatialIndex.tolerance * spatialIndex.tolerance;

  for (const key of candidateBucketKeys) {
    const indices = spatialIndex.buckets.get(key);
    if (!indices?.length) continue;

    for (const index of indices) {
      const existing = nodes[index];
      const dx = existing[0] - node[0];
      const dy = existing[1] - node[1];
      const dz = existing[2] - node[2];
      if (dx * dx + dy * dy + dz * dz <= toleranceSquared) {
        return index;
      }
    }
  }

  return null;
}

function addNodeToSpatialIndex(
  node: Node,
  nodeIndex: number,
  spatialIndex: SpatialHashIndex,
): void {
  const key = getBucketKey(node, spatialIndex.tolerance);
  const bucket = spatialIndex.buckets.get(key) ?? [];
  bucket.push(nodeIndex);
  spatialIndex.buckets.set(key, bucket);
}

function getNeighborBucketKeys(node: Node, tolerance: number): string[] {
  const [ix, iy, iz] = getBucketCoordinates(node, tolerance);
  const keys: string[] = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        keys.push(`${ix + dx}:${iy + dy}:${iz + dz}`);
      }
    }
  }

  return keys;
}

function getBucketKey(node: Node, tolerance: number): string {
  const [ix, iy, iz] = getBucketCoordinates(node, tolerance);
  return `${ix}:${iy}:${iz}`;
}

function getBucketCoordinates(
  node: Node,
  tolerance: number,
): [number, number, number] {
  return [
    Math.floor(node[0] / tolerance),
    Math.floor(node[1] / tolerance),
    Math.floor(node[2] / tolerance),
  ];
}
