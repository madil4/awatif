import { Node, Element, NodeInputs, ElementInputs } from "./data-model";
import { analyze } from "./analyze";
import { deform } from "./deform";
import { mean, matrix } from "mathjs";

describe("analyze", () => {
  test("Bar: from Logan's book example 3.9", () => {
    const nodes: Node[] = [
      [12, -3, -4],
      [0, 0, 0],
      [12, -3, -7],
      [14, 6, 0],
    ];
    const elements: Element[] = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const nodeInputs: NodeInputs = {
      supports: new Map(),
      loads: new Map(),
    };
    const elementInputs: ElementInputs = {
      elasticities: new Map(),
      areas: new Map(),
    };

    nodeInputs.supports?.set(1, [true, true, true, false, false, false]);
    nodeInputs.supports?.set(2, [true, true, true, false, false, false]);
    nodeInputs.supports?.set(3, [true, true, true, false, false, false]);
    nodeInputs.loads?.set(0, [20, 0, 0, 0, 0, 0]);

    elements.forEach((_, i) => {
      elementInputs.elasticities?.set(i, 210e6);
      elementInputs.areas?.set(i, 10e-4);
    });

    const deformOutputs = deform(nodes, elements, nodeInputs, elementInputs);

    const analyzeOutputs = analyze(
      nodes,
      elements,
      elementInputs,
      deformOutputs
    );

    expect(analyzeOutputs).toEqual({
      normals: new Map([
        [0, [-20.526315789473685, 20.526315789473685]],
        [1, [-4.210526315789473, 4.210526315789473]],
        [2, [5.289408221642574, -5.289408221642574]],
      ]),
      shearsY: new Map([
        [0, [0, 0]],
        [1, [0, 0]],
        [2, [0, 0]],
      ]),
      shearsZ: new Map([
        [0, [0, 0]],
        [1, [0, 0]],
        [2, [0, 0]],
      ]),
      torsions: new Map([
        [0, [0, 0]],
        [1, [0, 0]],
        [2, [0, 0]],
      ]),
      bendingsY: new Map([
        [0, [0, 0]],
        [1, [0, 0]],
        [2, [0, 0]],
      ]),
      bendingsZ: new Map([
        [0, [0, 0]],
        [1, [0, 0]],
        [2, [0, 0]],
      ]),
      bendingXX: new Map(),
      bendingYY: new Map(),
      bendingXY: new Map(),
      membraneXX: new Map(),
      membraneYY: new Map(),
      membraneXY: new Map(),
      tranverseShearX: new Map(),
      tranverseShearY: new Map(),
    });
  });

  test("Frame: from Logan's book example 5.8", () => {
    const nodes: Node[] = [
      [2.5, 0, 0],
      [0, 0, 0],
      [2.5, 0, -2.5],
      [2.5, -2.5, 0],
    ];
    const elements: Element[] = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const nodeInputs: NodeInputs = {
      supports: new Map(),
      loads: new Map(),
    };
    const elementInputs: ElementInputs = {
      elasticities: new Map(),
      shearModuli: new Map(),
      torsionalConstants: new Map(),
      areas: new Map(),
      momentsOfInertiaY: new Map(),
      momentsOfInertiaZ: new Map(),
    };

    nodeInputs.supports?.set(1, [true, true, true, true, true, true]);
    nodeInputs.supports?.set(2, [true, true, true, true, true, true]);
    nodeInputs.supports?.set(3, [true, true, true, true, true, true]);
    nodeInputs.loads?.set(0, [0, -200e3, 0, -100e3, 0, 0]);
    elements.forEach((_, i) => {
      elementInputs.elasticities?.set(i, 200e9);
      elementInputs.shearModuli?.set(i, 60e9);
      elementInputs.momentsOfInertiaZ?.set(i, 40e-6);
      elementInputs.momentsOfInertiaY?.set(i, 40e-6);
      elementInputs.torsionalConstants?.set(i, 20e-6);
      elementInputs.areas?.set(i, 6.25e-3);
    });

    const deformOutputs = deform(nodes, elements, nodeInputs, elementInputs);

    const analyzeOutputs = analyze(
      nodes,
      elements,
      elementInputs,
      deformOutputs
    );

    expect(analyzeOutputs).toEqual({
      normals: new Map([
        [0, [-873.3267207374233, 873.3267207374233]],
        [1, [28253.93884652384, -28253.93884652384]],
        [2, [167822.0863563174, -167822.0863563174]],
      ]),
      shearsY: new Map([
        [0, [1299.1563606221894, -1299.1563606221894]],
        [1, [30878.75728306041, -30878.75728306041]],
        [2, [-752.3099977798178, 752.3099977798178]],
      ]),
      shearsZ: new Map([
        [0, [215.43623884405804, -215.43623884405804]],
        [1, [-121.0167229576055, 121.0167229576055]],
        [2, [-28469.375085367898, 28469.375085367898]],
      ]),
      torsions: new Map([
        [0, [1801.0349678696236, -1801.0349678696236]],
        [1, [47.69008978276494, -47.69008978276494]],
        [2, [-8.234260106376682, 8.234260106376682]],
      ]),
      bendingsY: new Map([
        [0, [-324.19036593091715, -214.40023117922803]],
        [1, [96.37583632116228, 206.1659710728514]],
        [2, [23579.819070912377, 47593.61864250736]],
      ]),
      bendingsZ: new Map([
        [0, [1941.8793826628362, 1306.0115188926368]],
        [1, [26591.54681802802, 50605.346389623]],
        [2, [-622.4535653396724, -1258.3214291098718]],
      ]),
      bendingXX: new Map(),
      bendingYY: new Map(),
      bendingXY: new Map(),
      membraneXX: new Map(),
      membraneYY: new Map(),
      membraneXY: new Map(),
      tranverseShearX: new Map(),
      tranverseShearY: new Map(),
    });
  });

  test("Plate: Simply Supported Beam", () => {
    // Geometry parameters
    const a = 5;
    const b = 1;
    const p0 = -10;

    const numDivisionsA = 30;
    const numDivisionsB = 5;

    // Generate nodes
    const nodes: Node[] = [];
    for (let j = 0; j < numDivisionsB; j++) {
      for (let i = 0; i < numDivisionsA; i++) {
        nodes.push([
          (i * a) / (numDivisionsA - 1),
          (j * b) / (numDivisionsB - 1),
          0,
        ]);
      }
    }

    // Generate triangular elements
    const elements: Element[] = [];
    for (let j = 0; j < numDivisionsB - 1; j++) {
      for (let i = 0; i < numDivisionsA - 1; i++) {
        const bl = j * numDivisionsA + i;
        const br = bl + 1;
        const tl = (j + 1) * numDivisionsA + i;
        const tr = tl + 1;
        elements.push([bl, br, tl]);
        elements.push([br, tr, tl]);
      }
    }

    const nodeIndices = nodes.map((_, i) => i);
    const nodeInputs: NodeInputs = {
      supports: new Map(
        nodeIndices
          .filter((i) => nodes[i][0] == 0 || nodes[i][0] == a)
          .map((i) => [i, [true, true, true, false, false, false]])
      ),
      loads: new Map([
        [getCenterNodeIndex([a / 2, b / 2, 0], nodes), [0, 0, p0, 0, 0, 0]],
      ]),
    };
    const elementInputs: ElementInputs = {
      elasticities: new Map(elements.map((_, i) => [i, 100])),
      thicknesses: new Map(elements.map((_, i) => [i, 1])),
      poissonsRatios: new Map(elements.map((_, i) => [i, 0.3])),
    };

    const deformOutputs = deform(nodes, elements, nodeInputs, elementInputs);
    const analyzeOutputs = analyze(
      nodes,
      elements,
      elementInputs,
      deformOutputs
    );

    let maxBendingXX = 0;
    analyzeOutputs.bendingXX.forEach((values) => {
      maxBendingXX = Math.max(maxBendingXX, ...values);
    });

    expect(maxBendingXX).toBeCloseTo(-(p0 * a) / 4 / b, 1);

    function getCenterNodeIndex(centroid: Node, nodes: Node[]): number {
      let minDist = Infinity;
      let minIdx = -1;
      nodes.forEach((node, idx) => {
        const dist = Math.sqrt(
          node.reduce((sum, val, i) => sum + (val - centroid[i]) ** 2, 0)
        );
        if (dist < minDist) {
          minDist = dist;
          minIdx = idx;
        }
      });
      return minIdx;
    }
  });
});
