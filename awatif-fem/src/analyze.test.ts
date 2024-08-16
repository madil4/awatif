import { Node, Element, AnalysisInputs } from "awatif-data-structure";
import { analyze } from "awatif-fem";

describe("analyze", () => {
  test("3D bars from Logan's book example 3.9", () => {
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
    const analysisInputs: AnalysisInputs = {
      materials: new Map(),
      sections: new Map(),
      pointSupports: new Map(),
      pointLoads: new Map(),
    };

    analysisInputs.materials?.set(0, { elasticity: 2e11 });
    analysisInputs.sections?.set(0, { area: 6e-4 });
    analysisInputs.materials?.set(1, { elasticity: 2e11 });
    analysisInputs.sections?.set(1, { area: 6e-4 });
    analysisInputs.materials?.set(2, { elasticity: 1e11 });
    analysisInputs.sections?.set(2, { area: 12e-4 });
    analysisInputs.pointSupports?.set(1, [
      true,
      true,
      true,
      false,
      false,
      false,
    ]);
    analysisInputs.pointSupports?.set(2, [
      true,
      true,
      true,
      false,
      false,
      false,
    ]);
    analysisInputs.pointSupports?.set(3, [
      true,
      true,
      true,
      false,
      false,
      false,
    ]);
    analysisInputs.pointLoads?.set(0, [20, 0, 0, 0, 0, 0]);

    elements.forEach((_, i) => {
      analysisInputs.materials?.set(i, { elasticity: 210e6 });
      analysisInputs.sections?.set(i, { area: 10e-4 });
    });

    const analysisOutput = analyze(nodes, elements, analysisInputs);

    expect(analysisOutput).toEqual({
      nodes: new Map([
        [
          0,
          {
            deformation: [
              0.001383724933236592, -0.00005156643246716525,
              0.00006015037593984962, 0, 0, 0,
            ],
          },
        ],
        [
          1,
          {
            deformation: [0, 0, 0, 0, 0, 0],
            reaction: [
              -18.947368421052634, 4.736842105263158, 6.3157894736842115, 0, 0,
              0,
            ],
          },
        ],
        [
          2,
          {
            deformation: [0, 0, 0, 0, 0, 0],
            reaction: [0, 0, -4.2105263157894735, 0, 0, 0],
          },
        ],
        [
          3,
          {
            deformation: [0, 0, 0, 0, 0, 0],
            reaction: [
              -1.0526315789473686, -4.7368421052631575, -2.105263157894737, 0,
              0, 0,
            ],
          },
        ],
      ]),
      elements: new Map([
        [
          0,
          {
            normal: [-20.526315789473685, 20.526315789473685],
          },
        ],
        [
          1,
          {
            normal: [-4.2105263157894735, 4.2105263157894735],
          },
        ],
        [
          2,
          {
            normal: [5.289408221642574, -5.289408221642574],
          },
        ],
      ]),
    });
  });

  test("3D frames from Logan's book example 5.8", () => {
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
    const analysisInputs: AnalysisInputs = {
      materials: new Map(),
      sections: new Map(),
      pointSupports: new Map(),
      pointLoads: new Map(),
    };

    analysisInputs.pointSupports?.set(1, [true, true, true, true, true, true]);
    analysisInputs.pointSupports?.set(2, [true, true, true, true, true, true]);
    analysisInputs.pointSupports?.set(3, [true, true, true, true, true, true]);
    analysisInputs.pointLoads?.set(0, [0, -200e3, 0, -100e3, 0, 0]);
    elements.forEach((_, i) => {
      analysisInputs.materials?.set(i, {
        elasticity: 200e9,
        shearModulus: 60e9,
      });
      analysisInputs.sections?.set(i, {
        momentOfInertiaZ: 40e-6,
        momentOfInertiaY: 40e-6,
        torsionalConstant: 20e-6,
        area: 6.25e-3,
      });
    });

    const analysisOutputs = analyze(nodes, elements, analysisInputs);

    expect(analysisOutputs).toEqual({
      nodes: new Map([
        [
          0,
          {
            deformation: [
              0.0000017466534414748466, -0.0003356441727126348,
              -0.00005650787769304768, -0.003752156183061716,
              0.000017154708554951422, -0.00009935435371409363,
            ],
          },
        ],
        [
          1,
          {
            deformation: [0, 0, 0, 0, 0, 0],
            reaction: [
              -873.3267207374233, 1299.1563606221894, 215.43623884405804,
              1801.0349678696236, -324.19036593091715, 1941.8793826628362,
            ],
          },
        ],
        [
          2,
          {
            deformation: [0, 0, 0, 0, 0, 0],
            reaction: [
              121.0167229576055, 30878.75728306041, 28253.93884652384,
              -26591.54681802802, 96.37583632116228, 47.69008978276494,
            ],
          },
        ],
        [
          3,
          {
            deformation: [0, 0, 0, 0, 0, 0],
            reaction: [
              752.3099977798178, 167822.0863563174, -28469.375085367898,
              -23579.819070912377, -8.234260106376682, -622.4535653396724,
            ],
          },
        ],
      ]),
      elements: new Map([
        [
          0,
          {
            normal: [-873.3267207374233, 873.3267207374233],
            shearY: [1299.1563606221894, -1299.1563606221894],
            shearZ: [215.43623884405804, -215.43623884405804],
            torsion: [1801.0349678696236, -1801.0349678696236],
            bendingY: [-324.19036593091715, -214.40023117922803],
            bendingZ: [1941.8793826628362, 1306.0115188926368],
          },
        ],
        [
          1,
          {
            normal: [28253.93884652384, -28253.93884652384],
            shearY: [30878.75728306041, -30878.75728306041],
            shearZ: [-121.0167229576055, 121.0167229576055],
            torsion: [47.69008978276494, -47.69008978276494],
            bendingY: [96.37583632116228, 206.1659710728514],
            bendingZ: [26591.54681802802, 50605.346389623],
          },
        ],
        [
          2,
          {
            normal: [167822.0863563174, -167822.0863563174],
            shearY: [-752.3099977798178, 752.3099977798178],
            shearZ: [-28469.375085367898, 28469.375085367898],
            torsion: [-8.234260106376682, 8.234260106376682],
            bendingY: [23579.819070912377, 47593.61864250736],
            bendingZ: [-622.4535653396724, -1258.3214291098718],
          },
        ],
      ]),
    });
  });
});
