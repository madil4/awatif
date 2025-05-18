import { subtract, divide, add, multiply, cross, norm } from "mathjs";
import { Node, Element, NodeInputs } from "awatif-fem";
import { getMesh as getAwatifMesh } from "awatif-mesh";
import { Building } from "./data-model";

// Todo: Add reference mesh
// Todo: Optimize how nodes and elements are accumulated
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
} {
  let nodes: Node[] = [];
  let elements: Element[] = [];
  const nodeInputs: NodeInputs = {
    supports: new Map(),
    loads: new Map(),
  };

  // slabs
  for (let story in stories) {
    // slab geometry
    const pointIndex = stories[story];
    const elevation = points[pointIndex][2];

    const slabsIndices: number[] = slabsByStory.get(Number(story));
    slabsIndices.forEach((slabIndex) => {
      const slab: number[] = slabs[slabIndex];
      const boundaryPoints = slab.map((s) => points[s] as Node);
      const polygon = boundaryPoints.map((_, i) => i);
      const columnPoints = columnsByStory
        .get(Number(story))
        .map((columnIndex) => points[columns[columnIndex]] as Node);
      const slabPoints = mergeUniquePoints(boundaryPoints, columnPoints); // more stable
      const { nodes: meshNodes, elements: meshElements } = getAwatifMesh({
        points: slabPoints,
        polygon,
        maxMeshSize: 1,
      });

      const numExistingNodes = nodes.length;
      const numExistingElements = elements.length;

      const slabElements = meshElements.map((e) =>
        e.map((i) => i + numExistingNodes)
      );
      const slabsNodesIndices = meshNodes.map((_, i) => i + numExistingNodes);
      const slabElementsIndices = elements.map(
        (_, i) => i + numExistingElements
      );

      nodes = [...nodes, ...convertMeshNodesTo3d(meshNodes, elevation)];
      elements = [...elements, ...slabElements];

      // Todo: Reference
      const slabMeshReference = {
        nodesIndices: slabsNodesIndices,
        elementsIndices: slabElementsIndices,
      };

      // slab loads
      const areaLoad = slabData.get(slabIndex)["analysisInput"]?.areaLoad ?? 0;
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
    const pointIndex = stories[story];
    const elevation = points[pointIndex][2];
    const belowElevation = story > 0 ? points[stories[story - 1]][2] : 0;
    const columnsIndices: number[] = columnsByStory.get(story);

    columnsIndices.forEach((columnIndex) => {
      const referenceNode: Node = points[columns[columnIndex]];
      const columnTopNode: Node = [
        referenceNode[0],
        referenceNode[1],
        elevation,
      ];
      const columnBottomNode: Node = [
        referenceNode[0],
        referenceNode[1],
        belowElevation,
      ];
      const { nodes: columnNodes, elements: columnElements } = meshMember(
        columnTopNode,
        columnBottomNode,
        nodes.length
      );

      // column node supports
      if (story === 0) {
        nodeInputs.supports.set(
          nodes.length + columnNodes.length - 1,
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

      nodes = [...nodes, ...columnNodes];
      elements = [...elements, ...columnElements];

      // Todo: Reference
      const numExistingNodes = nodes.length;
      const numExistingElements = elements.length;
      const columnNodesIndices = columnNodes.map(
        (_, i) => i + numExistingNodes
      );
      const columnElementsIndices = columnElements.map(
        (_, i) => i + numExistingElements
      );

      const columnMeshReference = {
        nodesIndices: columnNodesIndices,
        elementsIndices: columnElementsIndices,
      };
    });
  }

  return { nodes, elements, nodeInputs };
}

// Utils
function convertMeshNodesTo3d(nodes: Node[], elevation: number): Node[] {
  return nodes.map((p) => [p[0], p[1], elevation]);
}

function meshMember(
  node1: Node,
  node2: Node,
  startIndex: number,
  meshDensity: number = 3
): { nodes: Node[]; elements: Element[] } {
  let nodes: Node[] = [[...node1]];
  let elements: Element[] = [];

  const vecMember = subtract(node2, node1);
  const vecSegment = divide(vecMember, meshDensity);

  for (let i = 0; i < meshDensity; i++) {
    nodes.push(add(node1, multiply(vecSegment, i + 1)) as Node);
    elements.push([startIndex + i, startIndex + i + 1]);
  }

  return { nodes, elements };
}

function getNodalLoadsFromSlabAreaLoad(
  nodes: Node[],
  storySlabElements: Element[],
  loads: NodeInputs["loads"],
  areaLoad: number,
  slabsNodeIndices: number[]
): NodeInputs["loads"] {
  storySlabElements.forEach((e) => {
    const [n1, n2, n3] = e.map((i) => nodes[i]);
    const elementArea = getTriangleArea(n1, n2, n3);
    const nodalLoad = (areaLoad * elementArea) / 3;
    e.forEach((n) => {
      if (slabsNodeIndices.includes(n)) {
        const loadVector = [0, 0, -nodalLoad, 0, 0, 0] as [
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

  function getTriangleArea(n1: Node, n2: Node, n3: Node): number {
    const a = subtract(n2, n1);
    const b = subtract(n3, n1);

    return (norm(cross(a, b)) as number) / 2;
  }
}

// Utils
function mergeUniquePoints(boundaryPts: Node[], columnPts: Node[], tol = 1e-2) {
  const tol2 = tol * tol;
  // Copy boundary points into the result
  const slabPts = boundaryPts.slice();

  for (const pt of columnPts) {
    let isDuplicate = false;

    // check against all boundary points
    for (const b of boundaryPts) {
      const dx = pt[0] - b[0];
      const dy = pt[1] - b[1];
      const dz = pt[2] - b[2];
      if (dx * dx + dy * dy + dz * dz <= tol2) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      slabPts.push(pt);
    }
  }

  return slabPts;
}
