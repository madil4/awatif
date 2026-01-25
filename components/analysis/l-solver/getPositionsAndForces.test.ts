import { describe, test, expect } from "vitest";
import { getPositionsAndForces } from "./getPositionsAndForces";
import type { Elements, Mesh, Nodes } from "../../data-model";

describe("positions and forces", () => {
  test("Bar: from Logan's book example 3.9", () => {
    const nodes: Nodes = [
      [12, -3, -4],
      [0, 0, 0],
      [12, -3, -7],
      [14, 6, 0],
    ];
    const elements: Elements = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const supports: Mesh["supports"] = new Map([
      [1, [true, true, true, false, false, false]],
      [2, [true, true, true, false, false, false]],
      [3, [true, true, true, false, false, false]],
    ]);
    const loads: Mesh["loads"] = new Map([[0, [20, 0, 0, 0, 0, 0]]]);

    const elementsProps: Mesh["elementsProps"] = new Map(
      elements.map((_, i) => {
        return [i, { elasticity: 210e6, area: 10e-4 }];
      })
    );

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps
    );

    expect(positions.length).toBe(nodes.length * 3);
    expect(positions[0]).toBeCloseTo(12.001383724933236);
    expect(positions[1]).toBeCloseTo(-3.00005156643246716524);
    expect(positions[2]).toBeCloseTo(-4 + 0.00006015037593984961);

    const normals = internalForces.normals ?? new Map();

    expect(normals.get(0)[0]).toBeCloseTo(-20.526315789473685);
    expect(normals.get(0)[1]).toBeCloseTo(20.526315789473685);
    expect(normals.get(1)[0]).toBeCloseTo(-4.210526315789473);
    expect(normals.get(1)[1]).toBeCloseTo(4.210526315789473);
    expect(normals.get(2)[0]).toBeCloseTo(5.289408221642574);
    expect(normals.get(2)[1]).toBeCloseTo(-5.289408221642574);

  });

  test("Frame: from Logan's book example 5.8", () => {
    const nodes: Nodes = [
      [2.5, 0, 0],
      [0, 0, 0],
      [2.5, 0, -2.5],
      [2.5, -2.5, 0],
    ];
    const elements: Elements = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const supports: Mesh["supports"] = new Map([
      [1, [true, true, true, true, true, true]],
      [2, [true, true, true, true, true, true]],
      [3, [true, true, true, true, true, true]],
    ]);
    const loads: Mesh["loads"] = new Map([[0, [0, -200e3, 0, -100e3, 0, 0]]]);

    const elementsProps: Mesh["elementsProps"] = new Map(
      elements.map((_, i) => {
        return [
          i,
          {
            elasticity: 200e9,
            shearModulus: 60e9,
            momentOfInertia: 40e-6,
            torsionalConstant: 20e-6,
            area: 6.25e-3,
          },
        ];
      })
    );

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps
    );

    expect(positions[0]).toBeCloseTo(2.5 + 0.0000017466534414748466);
    expect(positions[1]).toBeCloseTo(0 - 0.0003356441727126348);
    expect(positions[2]).toBeCloseTo(0 - 0.00005650787769304768);

    expect(internalForces).toEqual({
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
    });
  });
});
