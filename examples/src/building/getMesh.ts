import { subtract, divide, add, multiply, cross, norm } from "mathjs";
import { Node, Element, NodeInputs, ElementInputs } from "awatif-fem";
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
  elementInputs: ElementInputs;
} {
  let nodes: Node[] = [];
  let elements: Element[] = [];
  const nodeInputs: NodeInputs = {
    supports: new Map(),
    loads: new Map(),
  };
  const elementInputs: ElementInputs = {
    elasticities: new Map(),
    thicknesses: new Map(),
    poissonsRatios: new Map(),
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

      // slab element properties
      const slabInput = slabData.get(slabIndex)?.analysisInput;
      const slabElasticity = slabInput?.material?.elasticity ?? 1;
      const slabThickness = slabInput?.thickness ?? 1;
      const slabPoissonsRatio = slabInput?.material?.poissonsRatio ?? 1;

      slabElementsIndices.forEach((elementIndex) => {
        elementInputs.elasticities.set(elementIndex, slabElasticity);
        elementInputs.thicknesses.set(elementIndex, slabThickness);
        elementInputs.poissonsRatios.set(elementIndex, slabPoissonsRatio);
      });

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

  return { nodes, elements, nodeInputs, elementInputs };
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

export function getNodalLoadsFromSlabAreaLoad(
  nodes: Node[],
  storySlabElements: Element[],
  loads: NodeInputs["loads"],
  areaLoad: number,
  slabsNodeIndices: number[]
): NodeInputs["loads"] {
  // Step 1: Compute dual areas for each node
  const dualAreas = new Map<number, number>();
  slabsNodeIndices.forEach((n) => dualAreas.set(n, 0));

  storySlabElements.forEach((e) => {
    const [n1, n2, n3] = e.map((i) => nodes[i]);
    const [i, j, k] = e; // Node indices

    // Compute edge lengths
    const l_ij = norm(subtract(n1, n2)) as number;
    const l_ik = norm(subtract(n1, n3)) as number;
    const l_jk = norm(subtract(n2, n3)) as number;

    // Compute angles using the law of cosines
    const cosAlpha_jk = (l_ij ** 2 + l_ik ** 2 - l_jk ** 2) / (2 * l_ij * l_ik);
    const cosAlpha_ki = (l_ij ** 2 + l_jk ** 2 - l_ik ** 2) / (2 * l_ij * l_jk);
    const cosAlpha_ij = (l_ik ** 2 + l_jk ** 2 - l_ij ** 2) / (2 * l_ik * l_jk);

    // Avoid division by zero and ensure numerical stability
    const cotAlpha_jk = cosAlpha_jk / Math.sqrt(1 - cosAlpha_jk ** 2 + 1e-10);
    const cotAlpha_ki = cosAlpha_ki / Math.sqrt(1 - cosAlpha_ki ** 2 + 1e-10);
    const cotAlpha_ij = cosAlpha_ij / Math.sqrt(1 - cosAlpha_ij ** 2 + 1e-10);

    // Contribution to dual area of node i
    if (slabsNodeIndices.includes(i)) {
      const contrib_i = (l_ij ** 2 * cotAlpha_jk + l_ik ** 2 * cotAlpha_ki) / 8;
      dualAreas.set(i, dualAreas.get(i) + contrib_i);
    }
    // Contribution to dual area of node j
    if (slabsNodeIndices.includes(j)) {
      const contrib_j = (l_ij ** 2 * cotAlpha_ki + l_jk ** 2 * cotAlpha_ij) / 8;
      dualAreas.set(j, dualAreas.get(j) + contrib_j);
    }
    // Contribution to dual area of node k
    if (slabsNodeIndices.includes(k)) {
      const contrib_k = (l_ik ** 2 * cotAlpha_ij + l_jk ** 2 * cotAlpha_jk) / 8;
      dualAreas.set(k, dualAreas.get(k) + contrib_k);
    }
  });

  // Step 2: Distribute loads based on dual areas
  storySlabElements.forEach((e) => {
    const [n1, n2, n3] = e.map((i) => nodes[i]);
    const elementArea = getTriangleArea(n1, n2, n3);
    const totalLoad = areaLoad * elementArea;

    // Get dual areas for the three nodes
    const [i, j, k] = e;
    const dualArea_i = dualAreas.get(i) || 1e-10; // Avoid division by zero
    const dualArea_j = dualAreas.get(j) || 1e-10;
    const dualArea_k = dualAreas.get(k) || 1e-10;
    const totalDualArea = dualArea_i + dualArea_j + dualArea_k;

    // Distribute load proportional to dual areas
    const nodalLoad_i = (totalLoad * dualArea_i) / totalDualArea;
    const nodalLoad_j = (totalLoad * dualArea_j) / totalDualArea;
    const nodalLoad_k = (totalLoad * dualArea_k) / totalDualArea;

    // Apply loads to nodes
    e.forEach((n, idx) => {
      if (slabsNodeIndices.includes(n)) {
        const nodalLoad =
          idx === 0 ? nodalLoad_i : idx === 1 ? nodalLoad_j : nodalLoad_k;
        const loadVector = [0, 0, -nodalLoad, 0, 0, 0];
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
