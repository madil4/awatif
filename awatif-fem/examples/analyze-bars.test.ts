import { analyze } from "../src/analyze";
import { Node, Element, AnalysisInput } from "../src";

describe("analyze bars", () => {
  test("compute deformations and forces of Logan's book example 3.1", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [0.6, 0, 0],
      [2 * 0.6, 0, 0],
      [3 * 0.6, 0, 0],
    ];
    const elements: Element[] = [
      [0, 1],
      [1, 2],
      [2, 3],
    ];
    const analysisInputs: AnalysisInput[] = [
      {
        node: 0,
        support: [true, false, false],
      },
      {
        node: 3,
        support: [true, false, false],
      },
      {
        node: 1,
        load: [15000, 0, 0],
      },
      {
        element: 0,
        area: 6e-4,
        elasticity: 2e11,
      },
      {
        element: 1,
        area: 6e-4,
        elasticity: 2e11,
      },
      {
        element: 2,
        area: 12e-4,
        elasticity: 1e11,
      },
    ];

    const analysisOutput = analyze(nodes, elements, analysisInputs);

    expect(analysisOutput).toEqual({
      default: [
        { node: 0, deformation: [0, 0, 0] },
        { node: 0, reaction: [-10000, 0, 0] },
        { node: 1, deformation: [0.00005000000000000001, 0, 0] },
        { node: 2, deformation: [0.000025, 0, 0] },
        { node: 3, deformation: [0, 0, 0] },
        { node: 3, reaction: [-5000.000000000001, 0, 0] },
        { element: 0, normal: [10000, 10000] },
        { element: 1, normal: [-5000.000000000001, -5000.000000000001] },
        { element: 2, normal: [-5000.000000000001, -5000.000000000001] },
      ],
    });
  });

  test("compute deformations and forces of Logan's book example 3.5", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [0, 3, 0],
      [3, 3, 0],
      [3, 0, 0],
    ];
    const elements: Element[] = [
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    const analysisInputs: AnalysisInput[] = [
      {
        node: 1,
        support: [true, true, false],
      },
      {
        node: 2,
        support: [true, true, false],
      },
      {
        node: 3,
        support: [true, true, false],
      },
      {
        node: 0,
        load: [0, -50, 0],
      },
      ...elements.map((_, i) => ({
        element: i,
        area: 6e-4,
        elasticity: 200e6,
      })),
    ];

    const analysisOutput = analyze(nodes, elements, analysisInputs);

    expect(analysisOutput).toEqual({
      default: [
        {
          node: 0,
          deformation: [0.00025888347648318446, -0.0009911165235168156, 0],
        },
        { node: 1, deformation: [0, 0, 0] },
        { node: 1, reaction: [0, 39.644660940672615, 0] },
        { node: 2, deformation: [0, 0, 0] },
        { node: 2, reaction: [10.355339059327376, 10.355339059327376, 0] },
        { node: 3, deformation: [0, 0, 0] },
        { node: 3, reaction: [-10.355339059327376, 0, 0] },
        { element: 0, normal: [39.644660940672615, 39.644660940672615] },
        { element: 1, normal: [14.644660940672624, 14.644660940672624] },
        { element: 2, normal: [-10.355339059327376, -10.355339059327376] },
      ],
    });
  });

  test("compute deformations and forces of Logan's book example 3.8", () => {
    const nodes: Node[] = [
      [1800, 0, 0],
      [0, 900, 0],
      [0, 900, 1800],
      [0, 0, -1200],
    ];
    const elements: Element[] = [
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    const analysisInputs: AnalysisInput[] = [
      {
        node: 0,
        support: [false, true, false],
      },
      {
        node: 1,
        support: [true, true, true],
      },
      {
        node: 2,
        support: [true, true, true],
      },
      {
        node: 3,
        support: [true, true, true],
      },
      {
        node: 0,
        load: [0, 0, -5000],
      },
      {
        element: 0,
        area: 200,
        elasticity: 8e3,
      },
      {
        element: 1,
        area: 500,
        elasticity: 8e3,
      },
      {
        element: 2,
        area: 125,
        elasticity: 8e3,
      },
    ];

    const analysisOutput = analyze(nodes, elements, analysisInputs);

    expect(analysisOutput).toEqual({
      default: [
        {
          node: 0,
          deformation: [-2.0331802718832606, 0, -7.375035974654121],
        },
        {
          node: 0,
          reaction: [-4.547473508864641e-13, -1112.046566532909, -5000],
        },
        { node: 1, deformation: [0, 0, 0] },
        { node: 1, reaction: [1293.1781115569704, -646.5890557784852, 0] },
        { node: 2, deformation: [0, 0, 0] },
        {
          node: 2,
          reaction: [-3517.271244622789, 1758.6356223113944, 3517.271244622789],
        },
        { node: 3, deformation: [0, 0, 0] },
        { node: 3, reaction: [2224.093133065818, 0, 1482.7287553772119] },
        { element: 0, normal: [-1445.8170822280963, -1445.8170822280963] },
        { element: 1, normal: [5275.906866934184, 5275.906866934184] },
        { element: 2, normal: [-2673.02727755872, -2673.02727755872] },
      ],
    });
  });

  test("compute deformations and forces of Logan's book example 3.9", () => {
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
    const analysisInputs: AnalysisInput[] = [
      {
        node: 1,
        support: [true, true, true],
      },
      {
        node: 2,
        support: [true, true, true],
      },
      {
        node: 3,
        support: [true, true, true],
      },
      {
        node: 0,
        load: [20, 0, 0],
      },
      ...elements.map((_, i) => ({
        element: i,
        area: 10e-4,
        elasticity: 210e6,
      })),
    ];

    const analysisOutput = analyze(nodes, elements, analysisInputs);

    expect(analysisOutput).toEqual({
      default: [
        {
          node: 0,
          deformation: [
            0.001383724933236592, -0.00005156643246716525,
            0.00006015037593984962,
          ],
        },
        { node: 1, deformation: [0, 0, 0] },
        {
          node: 1,
          reaction: [
            -18.947368421052634, 4.736842105263158, 6.3157894736842115,
          ],
        },
        { node: 2, deformation: [0, 0, 0] },
        { node: 2, reaction: [0, 0, -4.2105263157894735] },
        { node: 3, deformation: [0, 0, 0] },
        {
          node: 3,
          reaction: [
            -1.0526315789473686, -4.7368421052631575, -2.105263157894737,
          ],
        },
        { element: 0, normal: [20.526315789473685, 20.526315789473685] },
        { element: 1, normal: [4.2105263157894735, 4.2105263157894735] },
        { element: 2, normal: [-5.289408221642574, -5.289408221642574] },
      ],
    });
  });
});
