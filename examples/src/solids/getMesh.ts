import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
  AnalyzeOutputs,
} from "awatif-fem";
import { Building, MeshReference, SlabData, ColumnData } from "./data-model";
import { Mesh } from "awatif-fem";
import { getMesh as getMeshCore } from "awatif-mesh";
import { subtract, divide, add, multiply, cross, norm } from "mathjs";

/**
 * This function mutates the building object.
 */
export function getMesh(building: Building, frameMeshDensity: number = 3) {
  const nodesState: State<Node[]> = van.state([]);
  const elementsState: State<Element[]> = van.state([]);
  const nodeInputsState: State<NodeInputs> = van.state({
    supports: new Map(),
    loads: new Map(),
  });
  const elementInputsState: State<ElementInputs> = van.state({
    nodes: new Map(),
    elements: new Map(),
    elasticities: new Map(),
    shearModuli: new Map(),
    areas: new Map(),
    momentsOfInertiaZ: new Map(),
    momentsOfInertiaY: new Map(),
    torsionalConstants: new Map(),
    thicknesses: new Map(),
    poissonsRatios: new Map(),
  });
  const deformOutputsState: State<DeformOutputs> = van.state({
    deformations: new Map(),
    reactions: new Map(),
  });
  const analyzeOutputsState: State<AnalyzeOutputs> = van.state({
    normals: new Map(),
    shearsY: new Map(),
    shearsZ: new Map(),
    torsions: new Map(),
    bendingsY: new Map(),
    bendingsZ: new Map(),
  });

  // slabs
  van.derive(() => {
    for (let story in building.stories.val) {
      // slab geometry --------------------------------
      const pointIndex = building.stories.val[story];
      const elevation = building.points.val[pointIndex][2];
      const slabsIndices: number[] = building.slabsByStory.val.get(
        Number(story)
      );
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

        const { nodes, elements, boundaryIndices } = getMeshCore({
          points,
          polygon,
        });

        const numExistingNodes = nodesState.val.length;
        const numExistingElements = elementsState.val.length;

        const slabElements = elements.map((e) =>
          e.map((i) => i + numExistingNodes)
        );

        const slabsNodesIndices = nodes.map((_, i) => i + numExistingNodes);
        const slabElementsIndices = elements.map(
          (_, i) => i + numExistingElements
        );

        nodesState.val = [
          ...nodesState.val,
          ...convertMeshNodesTo3d(nodes, elevation),
        ];
        elementsState.val = [...elementsState.val, ...slabElements];

        const slabMeshReference: MeshReference = {
          nodesIndices: slabsNodesIndices,
          elementsIndices: slabElementsIndices,
        };
        const existingSlabData = building.slabData.val.get(slabIndex) || {};
        const updatedSlabData: SlabData = {
          ...existingSlabData,
          meshReference: slabMeshReference,
        };
        building.slabData.val = building.slabData.val.set(
          slabIndex,
          updatedSlabData
        );

        // slab loads ----------------------------------------------------------------
        const areaLoad =
          building.slabData.val.get(slabIndex)["analysisInput"]?.areaLoad ?? 0;
        nodeInputsState.val = getNodalLoadsFromSlabAreaLoad(
          nodesState.val,
          slabElements,
          nodeInputsState.val,
          areaLoad,
          slabsNodesIndices
        );
      });
    }
  });

  // columns
  van.derive(() => {
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
          nodesState.val.length,
          frameMeshDensity
        );

        const numExistingNodes = nodesState.val.length;
        const numExistingElements = elementsState.val.length;

        const columnNodesIndices = columnNodes.map(
          (_, i) => i + numExistingNodes
        );
        const columnElementsIndices = columnElements.map(
          (_, i) => i + numExistingElements
        );
        nodesState.val = [...nodesState.val, ...columnNodes];
        elementsState.val = [...elementsState.val, ...columnElements];

        const columnMeshReference: MeshReference = {
          nodesIndices: columnNodesIndices,
          elementsIndices: columnElementsIndices,
        };
        const existingColumnData =
          building.columnData.val.get(columnIndex) || {};
        const updatedColumnData: ColumnData = {
          ...existingColumnData,
          meshReference: columnMeshReference,
        };
        building.columnData.val = building.columnData.val.set(
          columnIndex,
          updatedColumnData
        );
      });
    }
  });

  const mesh: Mesh = {
    nodes: nodesState,
    elements: elementsState,
    nodeInputs: nodeInputsState,
    elementInputs: elementInputsState,
    deformOutputs: deformOutputsState,
    analyzeOutputs: analyzeOutputsState,
  };
}

// Utils ---------------------------------------
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

  return { nodes: nodes, elements: elements };
}

function getNodalLoadsFromSlabAreaLoad(
  nodes: Node[],
  storySlabElements: Element[],
  nodeInputs: NodeInputs,
  areaLoad: number,
  slabsNodeIndices: number[]
): NodeInputs {
  nodeInputs = structuredClone(nodeInputs);
  // 1. iterate over elements
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
        const existingLoad = nodeInputs.loads.get(n) ?? [0, 0, 0, 0, 0, 0];
        nodeInputs.loads.set(n, add(existingLoad, loadVector));
      }
    });
  });

  return nodeInputs;
}

function getTriangleArea(n1: Node, n2: Node, n3: Node): number {
  const a = subtract(n2, n1);
  const b = subtract(n3, n1);

  return (norm(cross(a, b)) as number) / 2;
}
