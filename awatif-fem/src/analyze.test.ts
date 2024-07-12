import { analyze } from "awatif-fem";
import { Node, Element, AnalysisInput } from "awatif-data-structure";

describe("bars", () => {
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

describe("beams", () => {
  describe("nodal forces", () => {
    test("compute deformations and forces of Logan's book example 4.1", () => {
      const L = 5;
      const P = 1;
      const E = 3;
      const I = 7;

      const nodes: Node[] = [
        [0, 0, 0],
        [L, 0, 0],
        [2 * L, 0, 0],
      ];
      const elements: Element[] = [
        [0, 1],
        [1, 2],
      ];
      const analysisInputs: AnalysisInput[] = [
        {
          node: 1,
          support: [false, true, false, false, false, false],
        },
        {
          node: 2,
          support: [false, true, false, false, false, true],
        },
        {
          node: 0,
          load: [0, -P, 0, 0, 0, 0],
        },
        {
          element: 0,
          momentOfInertiaZ: I,
          elasticity: E,
        },
        {
          element: 1,
          momentOfInertiaZ: I,
          elasticity: E,
        },
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          {
            node: 0,
            deformation: [0, -3.472222222222221, 0, 0, 0, 0.8928571428571423],
          },
          { node: 1, deformation: [0, 0, 0, 0, 0, 0.29761904761904745] },
          { node: 1, reaction: [0, 2.5, 0, 0, 0, -1.7763568394002505e-15] },
          { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 2,
            reaction: [0, -1.4999999999999991, 0, 0, 0, 2.4999999999999987],
          },
          {
            element: 0,
            normal: [0, 0],
            shearY: [-1.0000000000000009, 1.0000000000000009],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [-1.3322676295501878e-15, -4.999999999999999],
          },
          {
            element: 1,
            normal: [0, 0],
            shearY: [1.4999999999999991, -1.4999999999999991],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [4.999999999999997, 2.4999999999999987],
          },
        ],
      });
    });

    test("compute deformations and forces of Logan's book example 4.2", () => {
      const nodes: Node[] = [
        [0, 0, 0],
        [3, 0, 0],
        [2 * 3, 0, 0],
        [3 * 3, 0, 0],
        [4 * 3, 0, 0],
      ];
      const elements: Element[] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ];
      const analysisInputs: AnalysisInput[] = [
        {
          node: 0,
          support: [true, true, false, false, false, true],
        },
        {
          node: 4,
          support: [true, true, false, false, false, true],
        },
        {
          node: 2,
          support: [false, true, false, false, false, false],
        },
        {
          node: 1,
          load: [0, -50e3, 0, 0, 0, 0],
        },
        {
          node: 3,
          load: [0, -50e3, 0, 0, 0, 0],
        },
        ...elements.map((_, i) => ({
          element: i,
          momentOfInertiaZ: 2e-4,
          elasticity: 210e9,
        })),
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          { node: 0, deformation: [0, 0, 0, 0, 0, 0] },
          { node: 0, reaction: [0, 25000, 0, 0, 0, 37500.00000000001] },
          { node: 1, deformation: [0, -0.0013392857142857145, 0, 0, 0, 0] },
          { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
          { node: 2, reaction: [0, 50000, 0, 0, 0, -5.115907697472721e-13] },
          {
            node: 3,
            deformation: [
              0, -0.0013392857142857145, 0, 0, 0, -1.8271098919545435e-20,
            ],
          },
          { node: 4, deformation: [0, 0, 0, 0, 0, 0] },
          { node: 4, reaction: [0, 25000, 0, 0, 0, -37500.00000000001] },
          {
            element: 0,
            normal: [0, 0],
            shearY: [25000, -25000],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [37500.00000000001, 37500.00000000001],
          },
          {
            element: 1,
            normal: [0, 0],
            shearY: [-25000, 25000],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [-37500.00000000001, -37500.00000000001],
          },
          {
            element: 2,
            normal: [0, 0],
            shearY: [25000, -25000],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [37500.00000000001, 37500.00000000001],
          },
          {
            element: 3,
            normal: [0, 0],
            shearY: [-25000, 25000],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [-37500.00000000001, -37500.00000000001],
          },
        ],
      });
    });

    test("compute deformations and forces of Logan's book example 4.4", () => {
      const L = 3;
      const E = 210e9;
      const I = 4e-4;

      const nodes: Node[] = [
        [0, 0, 0],
        [L, 0, 0],
        [2 * L, 0, 0],
      ];
      const elements: Element[] = [
        [0, 1],
        [1, 2],
      ];
      const analysisInputs: AnalysisInput[] = [
        {
          node: 0,
          support: [false, true, false, false, false, true],
        },
        {
          node: 2,
          support: [false, true, false, false, false, true],
        },
        {
          node: 1,
          load: [0, -10e3, 0, 0, 0, 20e3],
        },
        {
          element: 0,
          momentOfInertiaZ: I,
          elasticity: E,
        },
        {
          element: 1,
          momentOfInertiaZ: I,
          elasticity: E,
        },
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          { node: 0, deformation: [0, 0, 0, 0, 0, 0] },
          { node: 0, reaction: [0, 10000, 0, 0, 0, 12500] },
          {
            node: 1,
            deformation: [
              0, -0.00013392857142857144, 0, 0, 0, 0.00008928571428571429,
            ],
          },
          { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
          { node: 2, reaction: [0, 9.094947017729282e-13, 0, 0, 0, -2500] },
          {
            element: 0,
            normal: [0, 0],
            shearY: [10000, -10000],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [12500, 17500],
          },
          {
            element: 1,
            normal: [0, 0],
            shearY: [0, 9.094947017729282e-13],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [2500, -2500],
          },
        ],
      });
    });
  });

  describe("rotated beams", () => {
    test("compute deformations and forces of Logan's book example 5.1", () => {
      const nodes: Node[] = [
        [0, 0, 0],
        [0, 3, 0],
        [3, 3, 0],
        [3, 0, 0],
      ];
      const elements: Element[] = [
        [0, 1],
        [1, 2],
        [2, 3],
      ];
      const analysisInputs: AnalysisInput[] = [
        {
          node: 0,
          support: [true, true, false, false, false, true],
        },
        {
          node: 3,
          support: [true, true, false, false, false, true],
        },
        {
          element: 0,
          momentOfInertiaZ: 80e-6,
          elasticity: 200e9,
          area: 6500e-6,
        },
        {
          element: 1,
          momentOfInertiaZ: 40e-6,
          elasticity: 200e9,
          area: 6500e-6,
        },
        {
          element: 2,
          momentOfInertiaZ: 80e-6,
          elasticity: 200e9,
          area: 6500e-6,
        },
        {
          node: 1,
          load: [40e3, 0, 0, 0, 0, 0],
        },
        {
          node: 2,
          load: [0, 0, 0, 0, 0, 500],
        },
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          { node: 0, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 0,
            reaction: [
              -19965.753424657494, -14814.223697650643, 0, 0, 0,
              37576.60965900339,
            ],
          },
          {
            node: 1,
            deformation: [
              0.0049530533159097825, 0.00003418667007150149, 0, 0, 0,
              -0.0014302461603782149,
            ],
          },
          {
            node: 2,
            deformation: [
              0.0049068204391974546, -0.00003418667007150149, 0, 0, 0,
              -0.0013930030096932827,
            ],
          },
          { node: 3, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 3,
            reaction: [
              -20034.246575342444, 14814.223697650643, 0, 0, 0,
              37480.71924804451,
            ],
          },
          {
            element: 0,
            normal: [-14814.223697650643, 14814.223697650643],
            shearY: [19965.753424657494, -19965.753424657494],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [37576.60965900339, 22320.650614969098],
          },
          {
            element: 1,
            normal: [20034.246575342026, -20034.246575342026],
            shearY: [-14814.223697650646, 14814.223697650646],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [-22320.65061496912, -22122.020477982816],
          },
          {
            element: 2,
            normal: [14814.223697650643, -14814.223697650643],
            shearY: [20034.246575342444, -20034.246575342444],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [22622.02047798282, 37480.71924804451],
          },
        ],
      });
    });

    test("compute deformations and forces of Logan's book example 5.2", () => {
      const nodes: Node[] = [
        [0, 0, 0],
        [9, 9, 0],
        [9 + 12, 9, 0],
      ];
      const elements: Element[] = [
        [0, 1],
        [1, 2],
      ];
      const analysisInputs: AnalysisInput[] = [
        {
          node: 0,
          support: [true, true, false, false, false, true],
        },
        {
          node: 2,
          support: [true, true, false, false, false, true],
        },
        {
          element: 0,
          momentOfInertiaZ: 3.6e-4,
          elasticity: 200e9,
          area: 0.06,
        },
        {
          element: 1,
          momentOfInertiaZ: 3.6e-4,
          elasticity: 200e9,
          area: 0.06,
        },
        {
          element: 1,
          distributedLoad: [-13e3, 0],
        },
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          { node: 0, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 0,
            reaction: [
              80326.50901658912, 67851.52308239831, 0, 0, 0,
              -37225.195702533565,
            ],
          },
          {
            node: 1,
            deformation: [
              0.00008032650901658911, -0.00023749304599669695, 0, 0, 0,
              -0.0033432434648677733,
            ],
          },
          { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 2,
            reaction: [
              -80326.5090165891, 88148.47691760167, 0, 0, 0,
              -196831.40071640338,
            ],
          },
          {
            element: 0,
            normal: [104777.69132007193, -104777.69132007193],
            shearY: [-8821.147149273089, 8821.147149273089],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [-37225.195702533565, -75049.67770518335],
          },
          {
            element: 1,
            normal: [80326.5090165891, -80326.5090165891],
            shearY: [67851.52308239833, 88148.47691760167],
            shearZ: [0, 0],
            torsion: [0, 0],
            bendingY: [0, 0],
            bendingZ: [75049.67770518336, -196831.40071640338],
          },
        ],
      });
    });

    test.todo(
      "compute deformations and forces of Logan's book example 5.3 - inclined loads"
    );
  });

  describe("torsion", () => {
    test("compute deformations and forces of Logan's book example 5.5", () => {
      const nodes: Node[] = [
        [6, 0, 3],
        [0, 0, 6],
        [0, 0, 0],
        [6, 0, 0],
      ];
      const elements: Element[] = [
        [0, 1],
        [0, 2],
        [0, 3],
      ];
      const analysisInputs: AnalysisInput[] = [
        {
          node: 1,
          support: [false, true, false, true, false, true],
        },
        {
          node: 2,
          support: [false, true, false, true, false, true],
        },
        {
          node: 3,
          support: [false, true, false, true, false, true],
        },
        ...elements.map((_, i) => ({
          element: i,
          elasticity: 200e9,
          shearModulus: 80e9,
          momentOfInertiaZ: 150e-6,
          torsionalConstant: 40e-6,
        })),
        {
          node: 0,
          load: [0, -400e3, 0, 0, 0, 0],
        },
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          {
            node: 0,
            deformation: [
              0, -0.07070355168544526, 0, 0.029509818780225034, 0,
              -0.016931989978404328,
            ],
          },
          { node: 1, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 1,
            reaction: [
              0, 76529.94520297505, 0, 104196.98176888595, 0, 244625.0040025449,
            ],
          },
          { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 2,
            reaction: [
              0, -29047.592071077866, 0, -21142.65244663097, 0,
              22208.325478540035,
            ],
          },
          { node: 3, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 3,
            reaction: [
              0, 352517.6468681027, 0, -823874.6581044045, 0, 18060.78931029795,
            ],
          },
          {
            element: 0,
            normal: [0, 0],
            shearY: [76529.94520297505, -76529.94520297505],
            shearZ: [0, 0],
            torsion: [-16203.013874955604, 16203.013874955604],
            bendingY: [0, 0],
            bendingZ: [247980.917329112, 265397.56203544646],
          },
          {
            element: 1,
            normal: [0, 0],
            shearY: [-29047.592071077874, 29047.592071077874],
            shearZ: [0, 0],
            torsion: [-8978.698150836424, 8978.698150836424],
            bendingY: [0, 0],
            bendingZ: [-224176.1831544885, 29319.011793646234],
          },
          {
            element: 2,
            normal: [0, 0],
            shearY: [-352517.6468681027, 352517.6468681027],
            shearZ: [0, 0],
            torsion: [18060.78931029795, -18060.78931029795],
            bendingY: [0, 0],
            bendingZ: [-233678.2824999038, -823874.6581044045],
          },
        ],
      });
    });

    test("compute deformations and forces of Logan's book example 5.6", () => {
      const nodes: Node[] = [
        [0, 0, 3],
        [3, 0, 3],
        [3, 0, 0],
      ];
      const elements: Element[] = [
        [0, 1],
        [1, 2],
      ];
      const analysisInputs: AnalysisInput[] = [
        {
          node: 0,
          support: [false, true, false, true, false, true],
        },
        {
          node: 2,
          support: [false, true, false, true, false, true],
        },
        ...elements.map((_, i) => ({
          element: i,
          elasticity: 210e9,
          shearModulus: 84e9,
          momentOfInertiaZ: 16.6e-5,
          torsionalConstant: 4.6e-5,
        })),
        {
          node: 1,
          load: [0, -22e3, 0, 0, 0, 0],
        },
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          { node: 0, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 0,
            reaction: [
              0, 11000.000000000004, 0, -1646.4208242950122, 0,
              31353.579175705014,
            ],
          },
          {
            node: 1,
            deformation: [
              0, -0.002627398344540233, 0, 0.0012782770374961275, 0,
              -0.0012782770374961275,
            ],
          },
          { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 2,
            reaction: [
              0, 11000.000000000004, 0, -31353.579175705014, 0,
              1646.4208242950122,
            ],
          },
          {
            element: 0,
            normal: [0, 0],
            shearY: [11000.000000000004, -11000.000000000004],
            shearZ: [0, 0],
            torsion: [-1646.4208242950122, 1646.4208242950122],
            bendingY: [0, 0],
            bendingZ: [31353.579175705014, 1646.4208242950117],
          },
          {
            element: 1,
            normal: [0, 0],
            shearY: [-11000.000000000004, 11000.000000000004],
            shearZ: [0, 0],
            torsion: [1646.4208242950122, -1646.4208242950122],
            bendingY: [0, 0],
            bendingZ: [-1646.4208242950117, -31353.579175705014],
          },
        ],
      });
    });
  });

  describe("frame", () => {
    test("compute deformations and forces of Logan's book example 5.8", () => {
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
      const analysisInputs: AnalysisInput[] = [
        {
          node: 1,
          support: [true, true, true, true, true, true],
        },
        {
          node: 2,
          support: [true, true, true, true, true, true],
        },
        {
          node: 3,
          support: [true, true, true, true, true, true],
        },
        ...elements.map((_, i) => ({
          element: i,
          elasticity: 200e9,
          shearModulus: 60e9,
          momentOfInertiaZ: 40e-6,
          momentOfInertiaY: 40e-6,
          torsionalConstant: 20e-6,
          area: 6.25e-3,
        })),
        {
          node: 0,
          load: [0, -200e3, 0, -100e3, 0, 0],
        },
      ];

      const analysisOutputs = analyze(nodes, elements, analysisInputs);

      expect(analysisOutputs).toEqual({
        default: [
          {
            node: 0,
            deformation: [
              0.0000017466534414748466, -0.0003356441727126348,
              -0.00005650787769304768, -0.003752156183061716,
              0.000017154708554951422, -0.00009935435371409363,
            ],
          },
          { node: 1, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 1,
            reaction: [
              -873.3267207374233, 1299.1563606221894, 215.43623884405804,
              1801.0349678696236, -324.19036593091715, 1941.8793826628362,
            ],
          },
          { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 2,
            reaction: [
              121.0167229576055, 30878.75728306041, 28253.93884652384,
              -26591.54681802802, 96.37583632116228, 47.69008978276494,
            ],
          },
          { node: 3, deformation: [0, 0, 0, 0, 0, 0] },
          {
            node: 3,
            reaction: [
              752.3099977798178, 167822.0863563174, -28469.375085367898,
              -23579.819070912377, -8.234260106376682, -622.4535653396724,
            ],
          },
          {
            element: 0,
            normal: [-873.3267207374233, 873.3267207374233],
            shearY: [1299.1563606221894, -1299.1563606221894],
            shearZ: [215.43623884405804, -215.43623884405804],
            torsion: [1801.0349678696236, -1801.0349678696236],
            bendingY: [-324.19036593091715, -214.40023117922803],
            bendingZ: [1941.8793826628362, 1306.0115188926368],
          },
          {
            element: 1,
            normal: [28253.93884652384, -28253.93884652384],
            shearY: [30878.75728306041, -30878.75728306041],
            shearZ: [-121.0167229576055, 121.0167229576055],
            torsion: [47.69008978276494, -47.69008978276494],
            bendingY: [96.37583632116228, 206.1659710728514],
            bendingZ: [26591.54681802802, 50605.346389623],
          },
          {
            element: 2,
            normal: [167822.0863563174, -167822.0863563174],
            shearY: [-752.3099977798178, 752.3099977798178],
            shearZ: [-28469.375085367898, 28469.375085367898],
            torsion: [-8.234260106376682, 8.234260106376682],
            bendingY: [23579.819070912377, 47593.61864250736],
            bendingZ: [-622.4535653396724, -1258.3214291098718],
          },
        ],
      });
    });
  });
});
