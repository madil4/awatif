import { describe, test, expect } from "vitest";
import type { Mesh } from "../../data-model";
import { getPositionsAndForces } from "./getPositionsAndForces";

describe("positions and forces", () => {
  test("Bar: from Logan's book example 3.9", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [12, -3, -4],
      [0, 0, 0],
      [12, -3, -7],
      [14, 6, 0],
    ];
    const elements: Mesh["elements"]["val"] = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const supports: Mesh["supports"]["val"] = new Map([
      [1, [true, true, true, false, false, false]],
      [2, [true, true, true, false, false, false]],
      [3, [true, true, true, false, false, false]],
    ]);
    const loads: Mesh["loads"]["val"] = new Map([[0, [20, 0, 0, 0, 0, 0]]]);

    const elementsProps: Mesh["elementsProps"]["val"] = new Map(
      elements.map((_, i) => {
        return [i, { elasticity: 210e6, area: 10e-4 }];
      }),
    );

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
    );

    expect(positions.length).toBe(nodes.length * 3);
    expect(positions[0]).toBeCloseTo(12.001383724933236);
    expect(positions[1]).toBeCloseTo(-3.00005156643246716524);
    expect(positions[2]).toBeCloseTo(-4 + 0.00006015037593984961);

    expect(internalForces.get(0)?.N[0]).toBeCloseTo(-20.526315789473685);
    expect(internalForces.get(0)?.N[1]).toBeCloseTo(-20.526315789473685);
    expect(internalForces.get(1)?.N[0]).toBeCloseTo(-4.210526315789473);
    expect(internalForces.get(1)?.N[1]).toBeCloseTo(-4.210526315789473);
    expect(internalForces.get(2)?.N[0]).toBeCloseTo(5.289408221642574);
    expect(internalForces.get(2)?.N[1]).toBeCloseTo(5.289408221642574);
  });

  test("Frame: from Logan's book example 5.8", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [2.5, 0, 0],
      [0, 0, 0],
      [2.5, 0, -2.5],
      [2.5, -2.5, 0],
    ];
    const elements: Mesh["elements"]["val"] = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const supports: Mesh["supports"]["val"] = new Map([
      [1, [true, true, true, true, true, true]],
      [2, [true, true, true, true, true, true]],
      [3, [true, true, true, true, true, true]],
    ]);
    const loads: Mesh["loads"]["val"] = new Map([
      [0, [0, -200e3, 0, -100e3, 0, 0]],
    ]);

    const elementsProps: Mesh["elementsProps"]["val"] = new Map(
      elements.map((_, i) => {
        return [
          i,
          {
            elasticity: 200e9,
            shearModulus: 60e9,
            momentInertia: 40e-6,
            torsionalConstant: 20e-6,
            area: 6.25e-3,
          },
        ];
      }),
    );

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
    );

    expect(positions[0]).toBeCloseTo(2.5 + 0.0000017466534414748466);
    expect(positions[1]).toBeCloseTo(0 - 0.0003356441727126348);
    expect(positions[2]).toBeCloseTo(0 - 0.00005650787769304768);

    expect(internalForces).toEqual(
      new Map([
        [
          0,
          {
            N: [-873.3267207374233, -873.3267207374233],
            Vy: [1299.1563606221894, 1299.1563606221894],
            Vz: [215.43623884405804, 215.43623884405804],
            Mx: [1801.0349678696236, 1801.0349678696236],
            My: [-324.19036593091715, 214.40023117922803],
            Mz: [1941.8793826628362, -1306.0115188926368],
          },
        ],
        [
          1,
          {
            N: [28253.93884652384, 28253.93884652384],
            Vy: [30878.75728306041, 30878.75728306041],
            Vz: [-121.0167229576055, -121.0167229576055],
            Mx: [47.69008978276494, 47.69008978276494],
            My: [96.37583632116228, -206.1659710728514],
            Mz: [26591.54681802802, -50605.346389623],
          },
        ],
        [
          2,
          {
            N: [167822.0863563174, 167822.0863563174],
            Vy: [-752.3099977798178, -752.3099977798178],
            Vz: [-28469.375085367898, -28469.375085367898],
            Mx: [-8.234260106376682, -8.234260106376682],
            My: [23579.819070912377, -47593.61864250736],
            Mz: [-622.4535653396724, 1258.3214291098718],
          },
        ],
      ]),
    );
  });
});
