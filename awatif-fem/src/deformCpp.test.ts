import { Node, Element, NodeInputs, ElementInputs } from "./data-model";
import { deformCpp } from "./deformCpp";

describe("deformCpp", () => {
  test.only("Bars from Logan's book example 3.9", () => {
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

    const deformOutputs = deformCpp(nodes, elements, nodeInputs, elementInputs);

    expect(deformOutputs).toEqual({
      deformations: new Map([
        [
          0,
          [
            0.0013837249332365918, -0.000051566432467165236,
            0.000060150375939849595, 0, 0, 0,
          ],
        ],
        [1, [0, 0, 0, 0, 0, 0]],
        [2, [0, 0, 0, 0, 0, 0]],
        [3, [0, 0, 0, 0, 0, 0]],
      ]),
      reactions: new Map([
        [
          1,
          [-18.94736842105263, 4.7368421052631575, 6.315789473684209, 0, 0, 0],
        ],
        [2, [0, 0, -4.210526315789472, 0, 0, 0]],
        [
          3,
          [
            -1.0526315789473684, -4.7368421052631575, -2.1052631578947367, 0, 0,
            0,
          ],
        ],
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

    const deformOutputs = deformCpp(nodes, elements, nodeInputs, elementInputs);

    const expectedDeformations = new Map([
      [
        0,
        [
          0.000001746653441474847, -0.00033564417271263484,
          -0.000056507877693047675, -0.003752156183061716,
          0.000017154708554951415, -0.00009935435371409366,
        ],
      ],
      [1, [0, 0, 0, 0, 0, 0]],
      [2, [0, 0, 0, 0, 0, 0]],
      [3, [0, 0, 0, 0, 0, 0]],
    ]);
    const expectedReactions = new Map([
      [
        1,
        [
          -873.3267207374236, 1299.1563606221894, 215.4362388440581,
          1801.0349678696236, -324.1903659309171, 1941.8793826628362,
        ],
      ],
      [
        2,
        [
          121.01672295760542, 30878.75728306041, 28253.938846523837,
          -26591.54681802802, 96.37583632116224, 47.69008978276496,
        ],
      ],
      [
        3,
        [
          752.309997779818, 167822.08635631742, -28469.375085367898,
          -23579.819070912377, -8.234260106376679, -622.4535653396727,
        ],
      ],
    ]);
  });

  test("Plate", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [0, 5, 0],
      [5, 0, 0],
      [10, 5, 0],
      [10, 0, 0],
    ];
    const elements: Element[] = [
      [0, 1, 2],
      [2, 3, 4],
    ];

    const fixedSupport = [true, true, true, true, true, true] as [
      boolean,
      boolean,
      boolean,
      boolean,
      boolean,
      boolean
    ];
    const nodeInputs: NodeInputs = {
      supports: new Map([
        [0, fixedSupport],
        [1, fixedSupport],
        [3, fixedSupport],
        [4, fixedSupport],
      ]),
      loads: new Map([[2, [0, 0, -1, 0, 0, 0]]]),
    };

    const elementInputs: ElementInputs = {
      elasticities: new Map(elements.map((_, i) => [i, 10])),
      thicknesses: new Map(elements.map((_, i) => [i, 1])),
      poissonsRatios: new Map(elements.map((_, i) => [i, 0.3])),
    };

    const deformOutputs = deformCpp(nodes, elements, nodeInputs, elementInputs);

    // Expected results from the original TS implementation
    const expectedDeformations = new Map([
      [0, [0, 0, 0, 0, 0, 0]],
      [1, [0, 0, 0, 0, 0, 0]],
      [
        2,
        [
          0, 0, -1.3467100041517626, 0.20068292565742002, -0.08312558954401492,
          0,
        ],
      ],
      [3, [0, 0, 0, 0, 0, 0]],
      [4, [0, 0, 0, 0, 0, 0]],
    ]);
    const expectedReactions = new Map([
      [
        0,
        [0, 0, 0.36780676281428193, 0.11886720202236686, 0.9739614221402424, 0],
      ],
      [
        1,
        [0, 0, 0.1321932371857181, 0.1429860312813887, 0.5624946747141106, 0],
      ],
      [
        3,
        [
          0, 0, 0.1321932371857181, -0.29663740653764703, -0.4988501912056905,
          0,
        ],
      ],
      [
        4,
        [
          0, 0, 0.36780676281428193, -0.6046429215987721, -0.7727465308201458,
          0,
        ],
      ],
    ]);
  });
});
