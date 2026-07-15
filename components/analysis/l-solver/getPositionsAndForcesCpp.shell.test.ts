import { beforeAll, describe, expect, test } from "vitest";
import type { ElementProps, Mesh } from "../../data-model";
import { getPositionsAndForces } from "./getPositionsAndForces";
import {
  getPositionsAndForcesCpp,
  initPositionsAndForcesCpp,
} from "./getPositionsAndForcesCpp";

const shellProps: ElementProps = {
  elasticity: 30_000_000,
  poissonRatio: 0.2,
  thickness: 0.2,
  area: 0,
  momentInertiaZ: 0,
  momentInertiaY: 0,
  shearModulus: 0,
  torsionalConstant: 0,
};

const frameProps: ElementProps = {
  elasticity: 30_000_000,
  area: 0.04,
  momentInertiaZ: 0.0001,
  momentInertiaY: 0.0001,
  shearModulus: 12_500_000,
  torsionalConstant: 0.00005,
};

function supportsWithFreeDofs(
  nodeCount: number,
  freeDofs: Array<[number, number]>,
): NonNullable<Mesh["supports"]["val"]> {
  const supports = new Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]>();
  for (let node = 0; node < nodeCount; node++) {
    supports.set(node, [true, true, true, true, true, true]);
  }
  for (const [node, dof] of freeDofs) supports.get(node)![dof] = false;
  return supports;
}

function expectCppToMatchTs(
  nodes: Mesh["nodes"]["val"],
  elements: Mesh["elements"]["val"],
  loads: Mesh["loads"]["val"],
  supports: Mesh["supports"]["val"],
  elementsProps: Mesh["elementsProps"]["val"],
): ReturnType<typeof getPositionsAndForcesCpp> {
  const expected = getPositionsAndForces(
    nodes,
    elements,
    loads,
    supports,
    elementsProps,
  );
  const actual = getPositionsAndForcesCpp(
    nodes,
    elements,
    loads,
    supports,
    elementsProps,
  );
  expect(actual.positions).toHaveLength(expected.positions.length);
  actual.positions.forEach((position, index) =>
    expect(position).toBeCloseTo(expected.positions[index], 9),
  );
  return actual;
}

describe("getPositionsAndForcesCpp shell elements", () => {
  beforeAll(async () => {
    await initPositionsAndForcesCpp();
  });

  test("matches membrane response for a shell-only model", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
    ];
    const result = expectCppToMatchTs(
      nodes,
      [[0, 1, 2]],
      new Map([[1, [100, 0, 0, 0, 0, 0]]]),
      supportsWithFreeDofs(nodes.length, [[1, 0]]),
      new Map([[0, shellProps]]),
    );
    expect(result.internalForces.size).toBe(0);
  });

  test("matches out-of-plane bending and transverse shear response", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
    ];
    expectCppToMatchTs(
      nodes,
      [[0, 1, 2]],
      new Map([[1, [0, 0, -25, 0, 2, 0]]]),
      supportsWithFreeDofs(nodes.length, [
        [1, 2],
        [1, 4],
      ]),
      new Map([[0, shellProps]]),
    );
  });

  test("matches a rotated shell and reversed node ordering", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [1, 2, 3],
      [3, 2, 4],
      [1, 5, 4],
    ];
    const loads = new Map([
      [
        1,
        [4, -3, 7, 0, 0, 0] as [
          number,
          number,
          number,
          number,
          number,
          number,
        ],
      ],
    ]);
    const supports = supportsWithFreeDofs(nodes.length, [
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
    expectCppToMatchTs(nodes, [[0, 1, 2]], loads, supports, new Map([[0, shellProps]]));
    expectCppToMatchTs(nodes, [[0, 2, 1]], loads, supports, new Map([[0, shellProps]]));
  });

  test("assembles a mixed shell/frame model and reports frame forces only", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
      [3, 0, 0],
    ];
    const elements: Mesh["elements"]["val"] = [
      [0, 1, 2],
      [1, 3],
    ];
    const supports = supportsWithFreeDofs(nodes.length, [
      [1, 0],
      [3, 0],
    ]);
    const result = expectCppToMatchTs(
      nodes,
      elements,
      new Map([[3, [50, 0, 0, 0, 0, 0]]]),
      supports,
      new Map([
        [0, shellProps],
        [1, frameProps],
      ]),
    );
    expect(Array.from(result.internalForces.keys())).toEqual([1]);
  });

  test("rejects a loaded degenerate shell instead of returning non-finite positions", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0],
      [1, 0, 0],
      [2, 0, 0],
    ];
    expect(() =>
      getPositionsAndForcesCpp(
        nodes,
        [[0, 1, 2]],
        new Map([[1, [1, 0, 0, 0, 0, 0]]]),
        supportsWithFreeDofs(nodes.length, [[1, 0]]),
        new Map([[0, shellProps]]),
      ),
    ).toThrow("Linear solver failed with status 3");
  });

  test("rejects a loaded shell with invalid material properties", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 0],
    ];
    expect(() =>
      getPositionsAndForcesCpp(
        nodes,
        [[0, 1, 2]],
        new Map([[1, [1, 0, 0, 0, 0, 0]]]),
        supportsWithFreeDofs(nodes.length, [[1, 0]]),
        new Map([[0, { ...shellProps, thickness: 0 }]]),
      ),
    ).toThrow("Linear solver failed with status 3");
  });
});
