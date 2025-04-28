import { subtract, divide, add, multiply, cross, norm } from "mathjs";
import { Node, Element, NodeInputs } from "awatif-fem";
import { getMesh as getMeshCore } from "awatif-mesh";
import { Building } from "./data-model";

// Todo: Mesh the column from the point on the story to the story below not above
// Todo: Optimize how nodes and elements are accumulated
export function getMesh(
  building: Building,
  frameMeshDensity: number = 3
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
  for (let story in building.stories.val) {
    // slab geometry
    const pointIndex = building.stories.val[story];
    const elevation = building.points.val[pointIndex][2];
    const slabsIndices: number[] = building.slabsByStory.val.get(Number(story));
    slabsIndices.forEach((slabIndex) => {
      const slab: number[] = building.slabs.val[slabIndex];
      const boundaryPoints = slab.map((s) => building.points.val[s] as Node);
      const polygon = boundaryPoints.map((_, i) => i);
      const columnPoints = building.columnsByStory.val
        .get(Number(story))
        .map(
          (columnIndex) =>
            building.points.val[building.columns.val[columnIndex]] as Node
        );
      const points = [...boundaryPoints, ...columnPoints];

      const { nodes: meshNodes, elements: meshElements } = getMeshCore({
        points,
        polygon,
      });

      const numExistingNodes = nodes.length;

      const slabElements = meshElements.map((e) =>
        e.map((i) => i + numExistingNodes)
      );

      const slabsNodesIndices = meshNodes.map((_, i) => i + numExistingNodes);

      nodes = [...nodes, ...convertMeshNodesTo3d(meshNodes, elevation)];
      elements = [...elements, ...slabElements];

      // slab loads
      const areaLoad =
        building.slabData.val.get(slabIndex)["analysisInput"]?.areaLoad ?? 0;
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
  for (let story = 0; story < building.stories.val.length; story++) {
    const pointIndex = building.stories.val[story];
    const elevation = building.points.val[pointIndex][2];
    const belowElevation =
      story > 0
        ? building.points.val[building.stories.rawVal[story - 1]][2]
        : elevation;
    const columnsIndices: number[] = building.columnsByStory.val.get(story);

    columnsIndices.forEach((columnIndex) => {
      const referenceNode: Node =
        building.points.val[building.columns.val[columnIndex]];
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
        nodes.length,
        frameMeshDensity
      );

      nodes = [...nodes, ...columnNodes];
      elements = [...elements, ...columnElements];
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
  meshDensity: number
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
