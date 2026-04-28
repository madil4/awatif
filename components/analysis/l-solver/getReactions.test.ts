import { describe, test, expect } from "vitest";
import type { Mesh } from "../../data-model";
import { getPositionsAndForces } from "./getPositionsAndForces";
import { getReactions } from "./getReactions";

describe("getReactions", () => {
  test("1- Cantilever column: single vertical member with horizontal tip load", () => {
    const genericMemberProps = {
      elasticity: 32_836_000,
      area: 0.0625,
      momentInertiaZ: 0.00032552,
      momentInertiaY: 0.00032552,
      shearModulus: 0,
      torsionalConstant: 0,
    };
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base, fixed
      [0, 0, 3], // top, free
    ];
    const elements: Mesh["elements"]["val"] = [[0, 1]];
    const supports: Mesh["supports"]["val"] = new Map([
      [0, [true, true, true, true, true, true]],
    ]);
    const loads: Mesh["loads"]["val"] = new Map([
      [1, [10, 0, -2000, 0, 0, 0]], // 10 kN in +X, 2000 kN downward at tip
    ]);
    const elementsProps: Mesh["elementsProps"]["val"] = new Map(
      elements.map((_, i) => [i, { ...genericMemberProps }]),
    );

    const { internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
    );
    const reactions = getReactions(
      nodes,
      elements,
      internalForces,
      loads,
      supports,
    );

    expect(reactions[0][0]).toBeCloseTo(-10); // Fx: horizontal reaction
    expect(reactions[0][2]).toBeCloseTo(2000); // Fz: vertical reaction
    expect(reactions[0][4]).toBeCloseTo(-30); // My: base moment = 10 kN × 3 m
  });
});
