import { subtract, add, cross, norm } from "mathjs";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  createShellPatchCoupler,
} from "awatif-fem";
import { getMesh as getAwatifMesh } from "awatif-mesh";
import { Building } from "./data-model";

export function getMesh(
  points: Building["points"]["val"],
  stories: Building["stories"]["val"],
  columns: Building["columns"]["val"],
  slabs: Building["slabs"]["val"],
  columnsByStory: Building["columnsByStory"]["val"],
  slabsByStory: Building["slabsByStory"]["val"],
  columnData: Building["columnData"]["val"],
  slabData: Building["slabData"]["val"]
): {
  nodes: Node[];
  elements: Element[];
  nodeInputs: NodeInputs;
  elementInputs: ElementInputs;
} {
  const shellNodeMergeTolerance = 1e-4;

  let nodes: Node[] = [];
  let elements: Element[] = [];
  const nodeInputs: NodeInputs = {
    supports: new Map(),
    loads: new Map(),
  };
  const elementInputs: ElementInputs = {
    elasticities: new Map(),
    cltLayups: new Map(),
    thicknesses: new Map(),
    poissonsRatios: new Map(),
    shearModuli: new Map(),
    areas: new Map(),
    torsionalConstants: new Map(),
    momentsOfInertiaY: new Map(),
    momentsOfInertiaZ: new Map(),
  };
  const bottomColumnNodesIndicesByStory: Map<
    number,
    Map<number, number>
  > = new Map(
    stories.map((_, story) => [story, new Map() as Map<number, number>])
  );
  const topColumnNodesIndicesByStory: Map<
    number,
    Map<number, number>
  > = new Map(
    stories.map((_, story) => [story, new Map() as Map<number, number>])
  );
  const shellNodeCoupler = createShellPatchCoupler(shellNodeMergeTolerance);

  // slabs
  for (let story = 0; story < stories.length; story++) {
    // slab geometry
    const pointIndex = stories[story];
    const elevation = points[pointIndex][2];

    const slabsIndices: number[] = slabsByStory.get(story) ?? [];
    slabsIndices.forEach((slabIndex) => {
      const slab: number[] = slabs[slabIndex];
      const boundaryPoints = slab.map((s) => points[s] as Node);
      const polygon = boundaryPoints.map((_, i) => i);

      // Collect column points for the current and next story (if any)
      const getColumnPoints = (storyNum: number) => {
        const indices = columnsByStory.get(storyNum) ?? [];
        return new Map(
          indices.map((columnIndex) => [
            columnIndex,
            points[columns[columnIndex]] as Node,
          ])
        );
      };

      const columnPointsCurrent = getColumnPoints(story);
      const columnPointsNext =
        story < stories.length - 1
          ? getColumnPoints(story + 1)
          : (new Map() as Map<number, Node>);

      // Merge current and next story column points
      const columnPoints = new Map([
        ...columnPointsCurrent,
        ...columnPointsNext,
      ]);

      const meshSize = slabData.get(slabIndex)?.analysisInput?.meshSize ?? 0.5;
      const slabPoints = getUniqueSlabPoints(
        boundaryPoints,
        Array.from(columnPoints.values())
      );
      const { nodes: meshNodes, elements: meshElements } = getAwatifMesh({
        points: slabPoints,
        polygon,
        maxMeshSize: meshSize,
      });
      const {
        nodeMap: slabsNodesIndices,
        elementMap: slabElementsIndices,
        elementsGlobal: slabElements,
      } = shellNodeCoupler.appendPatch({
        nodes: convertMeshNodesTo3d(meshNodes, elevation),
        elements: meshElements,
      });
      ({ nodes, elements } = shellNodeCoupler.getMesh());

      // get intersection of column points and slab points as indices
      for (const columnIndex of columnPointsCurrent.keys()) {
        const columnPointCurrent = columnPointsCurrent.get(columnIndex);
        const columnNodeIndex = getColumnNodeIndex(
          nodes,
          slabsNodesIndices,
          columnPointCurrent,
          elevation
        );
        if (columnNodeIndex !== null) {
          topColumnNodesIndicesByStory
            .get(story)
            .set(columnIndex, columnNodeIndex);
        }
      }

      for (const columnIndex of columnPointsNext.keys()) {
        const columnPointNext = columnPointsNext.get(columnIndex);
        const columnNodeIndex = getColumnNodeIndex(
          nodes,
          slabsNodesIndices,
          columnPointNext,
          elevation
        );
        if (columnNodeIndex !== null) {
          bottomColumnNodesIndicesByStory
            .get(story + 1)
            .set(columnIndex, columnNodeIndex);
        }
      }

      // slab element properties
      const slabInput = slabData.get(slabIndex)?.analysisInput;
      const slabElasticity = slabInput?.material?.elasticity ?? 1;
      const slabThickness = slabInput?.thickness ?? 1;
      const slabPoissonsRatio = slabInput?.material?.poissonsRatio ?? 1;
      const slabCltLayup = slabInput?.cltLayup;

      slabElementsIndices.forEach((elementIndex) => {
        if (slabCltLayup) {
          elementInputs.cltLayups?.set(elementIndex, slabCltLayup);
        } else {
          elementInputs.elasticities.set(elementIndex, slabElasticity);
          elementInputs.thicknesses.set(elementIndex, slabThickness);
          elementInputs.poissonsRatios.set(elementIndex, slabPoissonsRatio);
        }
      });

      // slab loads
      const areaLoad = slabData.get(slabIndex)?.analysisInput?.areaLoad ?? 0;
      nodeInputs.loads = getNodalLoadsFromSlabAreaLoad(
        nodes,
        slabElements,
        nodeInputs.loads,
        areaLoad,
        slabsNodesIndices
      );
    });
  }

  // columns
  for (let story = 0; story < stories.length; story++) {
    const columnsIndices: number[] = columnsByStory.get(story) ?? [];
    columnsIndices.forEach((columnIndex) => {
      // add bottom nodes for first story columns
      if (story === 0) {
        const columnPoint = points[columns[columnIndex]] as Node;
        const columnBottomNode: Node = [columnPoint[0], columnPoint[1], 0];
        bottomColumnNodesIndicesByStory
          .get(story)
          .set(columnIndex, nodes.length);
        nodes.push(columnBottomNode);
      }

      const columnTopNodeIndex = topColumnNodesIndicesByStory
        .get(story)
        .get(columnIndex);
      const columnBottomNodeIndex = bottomColumnNodesIndicesByStory
        .get(story)
        .get(columnIndex);
      if (
        columnTopNodeIndex === undefined ||
        columnBottomNodeIndex === undefined
      ) {
        throw new Error(
          `Column ${columnIndex} at story ${story} is not fully connected to slab nodes.`
        );
      }
      const { nodes: intermediateColumnNodes, elements: columnElements } =
        meshMember(nodes, columnTopNodeIndex, columnBottomNodeIndex);

      // column node supports
      if (story === 0) {
        nodeInputs.supports.set(
          columnBottomNodeIndex,
          columnData.get(columnIndex)?.analysisInput?.support ?? [
            true,
            true,
            true,
            true,
            true,
            true,
          ]
        );
      }

      const lastIndex = elements.length;
      columnElements.forEach((_, elementIndex) => {
        const currentElementIndex = lastIndex + elementIndex;
        elementInputs.elasticities.set(currentElementIndex, 1e6);
        elementInputs.shearModuli.set(currentElementIndex, 1e6);
        elementInputs.areas.set(currentElementIndex, 1e6);
        elementInputs.torsionalConstants.set(currentElementIndex, 1e6);
        elementInputs.momentsOfInertiaY.set(currentElementIndex, 1e6);
        elementInputs.momentsOfInertiaZ.set(currentElementIndex, 1e6);
      });

      nodes.push(...intermediateColumnNodes);
      elements.push(...columnElements);
    });
  }

  return { nodes, elements, nodeInputs, elementInputs };
}

// Utils
function convertMeshNodesTo3d(nodes: Node[], elevation: number): Node[] {
  return nodes.map((p) => [p[0], p[1], elevation]);
}

function meshMember(
  existingNodes: Node[],
  node1Index: number,
  node2Index?: number
): { nodes: Node[]; elements: Element[] } {
  const node1 = existingNodes[node1Index];
  const node2 = existingNodes[node2Index];

  if (!node1 || !node2) return { nodes: [], elements: [] };

  return { nodes: [], elements: [[node1Index, node2Index]] };
}

function getNodalLoadsFromSlabAreaLoad(
  nodes: Node[],
  storySlabElements: Element[],
  loads: NodeInputs["loads"],
  areaLoad: number,
  slabsNodeIndices: number[]
): NodeInputs["loads"] {
  const slabNodeSet = new Set(slabsNodeIndices);

  storySlabElements.forEach((e) => {
    const [n1, n2, n3] = e.map((i) => nodes[i]);
    const elementArea = getTriangleArea(n1, n2, n3);
    const nodalLoad = (areaLoad * elementArea) / 3;
    e.forEach((n) => {
      if (slabNodeSet.has(n)) {
        const loadVector = [0, 0, nodalLoad, 0, 0, 0] as [
          number,
          number,
          number,
          number,
          number,
          number
        ];
        const existingLoad = loads.get(n) ?? [0, 0, 0, 0, 0, 0];
        loads.set(n, add(existingLoad, loadVector));
      }
    });
  });

  return loads;
}

function getTriangleArea(n1: Node, n2: Node, n3: Node): number {
  const a = subtract(n2, n1);
  const b = subtract(n3, n1);

  return (norm(cross(a, b)) as number) / 2;
}

// Utils
function getUniqueSlabPoints(
  boundaryPts: Node[],
  columnPts: Node[],
  tol = 1e-2
): Node[] {
  const tol2 = tol * tol;
  // Copy boundary points into the result
  const slabPts = boundaryPts.slice();

  for (const pt of columnPts) {
    let isDuplicate = false;

    // Check against points already added to slab points (boundary + accepted columns).
    for (const b of slabPts) {
      const dx = pt[0] - b[0];
      const dy = pt[1] - b[1];
      const dz = pt[2] - b[2];
      if (dx * dx + dy * dy + dz * dz <= tol2) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate && isNodeInPolygon(pt, boundaryPts)) {
      slabPts.push(pt);
    }
  }

  return slabPts;
}

function getColumnNodeIndex(
  nodes: Node[],
  slabNodeIndices: number[],
  columnPoint: Node,
  elevation: number,
  tolerance: number = 1e-2
): number | null {
  const columnNode: Node = [columnPoint[0], columnPoint[1], elevation];
  let closestNodeIndex: number | null = null;
  let minDistanceSquared = Number.POSITIVE_INFINITY;

  for (const i of slabNodeIndices) {
    const node = nodes[i];
    const dx = node[0] - columnNode[0];
    const dy = node[1] - columnNode[1];
    const dz = node[2] - columnNode[2];
    const distanceSquared = dx * dx + dy * dy + dz * dz;

    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared;
      closestNodeIndex = i;
    }
  }

  return minDistanceSquared <= tolerance * tolerance ? closestNodeIndex : null;
}

/**
 * Ray-casting algorithm to check if a node is inside a polygon
 **/
function isNodeInPolygon(node: Node, polygon: Node[]): boolean {
  let intersections = 0;
  const x = node[0];
  const y = node[1];

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      intersections++;
    }
  }

  return intersections % 2 !== 0;
}
