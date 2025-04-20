import { Node, Element, NodeInputs, ElementInputs } from "./data-model";
import { analyze } from "./analyze";
import { deform } from "./deform";

describe("analyze", () => {
  test("Bars from Logan's book example 3.9", () => {
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
        [0, [-20.52631578947368, 20.52631578947368]],
        [1, [-4.210526315789472, 4.210526315789472]],
        [2, [5.289408221642573, -5.289408221642573]],
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
    });
  });

  test("Frames from Logan's book example 5.8", () => {
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
        [0, [-873.3267207374236, 873.3267207374236]],
        [1, [28253.938846523837, -28253.938846523837]],
        [2, [167822.08635631742, -167822.08635631742]],
      ]),
      shearsY: new Map([
        [0, [1299.1563606221894, -1299.1563606221894]],
        [1, [30878.75728306041, -30878.75728306041]],
        [2, [-752.309997779818, 752.309997779818]],
      ]),
      shearsZ: new Map([
        [0, [215.4362388440581, -215.4362388440581]],
        [1, [-121.01672295760542, 121.01672295760542]],
        [2, [-28469.375085367898, 28469.375085367898]],
      ]),
      torsions: new Map([
        [0, [1801.0349678696236, -1801.0349678696236]],
        [1, [47.69008978276496, -47.69008978276496]],
        [2, [-8.234260106376679, 8.234260106376679]],
      ]),
      bendingsY: new Map([
        [0, [-324.1903659309171, -214.40023117922806]],
        [1, [96.37583632116224, 206.1659710728513]],
        [2, [23579.819070912377, 47593.61864250736]],
      ]),
      bendingsZ: new Map([
        [0, [1941.8793826628362, 1306.0115188926368]],
        [1, [26591.54681802802, 50605.346389623]],
        [2, [-622.4535653396727, -1258.3214291098723]],
      ]),
    });
  });
});
