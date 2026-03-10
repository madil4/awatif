import { describe, test, expect } from "vitest";
import type { Mesh } from "../../data-model";
import { getPositionsAndForces } from "./getPositionsAndForces";

describe("getPositionsAndForces", () => {
  // Generic member default props (converted to analysis units)
  const genericMemberProps = {
    elasticity: 32_836_000, // kN/m² (32836 MPa × 1e3)
    area: 0.0625, // m² (625 cm² / 1e4)
    momentInertia: 0.00032552, // m⁴ (32552 cm⁴ / 1e8)
  };

  test("Cantilever column: single vertical member with horizontal tip load", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base, fixed
      [0, 3, 0], // top, free
    ];
    const elements: Mesh["elements"]["val"] = [[0, 1]];
    const supports: Mesh["supports"]["val"] = new Map([
      [0, [true, true, true, true, true, true]], // fixed
    ]);
    const loads: Mesh["loads"]["val"] = new Map([
      [1, [100, 0, 0, 0, 0, 0]], // 100 kN in +X at tip
    ]);
    const elementsProps: Mesh["elementsProps"]["val"] = new Map(
      elements.map((_, i) => [i, { ...genericMemberProps }]),
    );

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
    );

    expect(positions.length).toBe(nodes.length * 3);
    // Node 0: fixed, no displacement
    expect(positions[0]).toBeCloseTo(0);
    expect(positions[1]).toBeCloseTo(0);
    expect(positions[2]).toBeCloseTo(0);
    // Node 1: deflects in X due to 100 kN horizontal load
    expect(positions[3]).toBeCloseTo(0.08420048355177608);
    expect(positions[4]).toBeCloseTo(3);
    expect(positions[5]).toBeCloseTo(0);

    const f0 = internalForces.get(0)!;
    expect(f0.N[0]).toBeCloseTo(0);
    expect(f0.N[1]).toBeCloseTo(0);
    expect(f0.Vy[0]).toBeCloseTo(100); // shear = applied load
    expect(f0.Vy[1]).toBeCloseTo(100);
    expect(f0.Vz[0]).toBeCloseTo(0);
    expect(f0.Vz[1]).toBeCloseTo(0);
    expect(f0.Mx[0]).toBeCloseTo(0);
    expect(f0.Mx[1]).toBeCloseTo(0);
    expect(f0.My[0]).toBeCloseTo(0);
    expect(f0.My[1]).toBeCloseTo(0);
    expect(f0.Mz[0]).toBeCloseTo(300); // moment at base = P × L = 100 × 3
    expect(f0.Mz[1]).toBeCloseTo(0); // moment at free end = 0
  });

  test("Portal frame: pin and roller supports with horizontal and vertical loads", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base left, pin
      [0, 4, 0], // top left
      [6, 4, 0], // top right
      [6, 0, 0], // base right, roller
    ];
    const elements: Mesh["elements"]["val"] = [
      [0, 1], // left column
      [1, 2], // beam
      [2, 3], // right column
    ];
    const supports: Mesh["supports"]["val"] = new Map([
      [0, [true, true, true, false, false, false]], // pin
      [3, [false, true, true, false, false, false]], // horizontal-roller
    ]);
    const loads: Mesh["loads"]["val"] = new Map([
      [1, [50, 0, 0, 0, 0, 0]], // 50 kN horizontal at top left
      [2, [0, -30, 0, 0, 0, 0]], // 30 kN downward at top right
    ]);
    const elementsProps: Mesh["elementsProps"]["val"] = new Map(
      elements.map((_, i) => [i, { ...genericMemberProps }]),
    );

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
    );

    expect(positions.length).toBe(nodes.length * 3);
    // Node 0: pin support, no translation
    expect(positions[0]).toBeCloseTo(0);
    expect(positions[1]).toBeCloseTo(0);
    expect(positions[2]).toBeCloseTo(0);
    // Node 1: top left, sways under horizontal load
    expect(positions[3]).toBeCloseTo(0.2496085216231015);
    expect(positions[4]).toBeCloseTo(4.000064969342591);
    expect(positions[5]).toBeCloseTo(0);
    // Node 2: top right
    expect(positions[6]).toBeCloseTo(6.249608521623101);
    expect(positions[7]).toBeCloseTo(3.9998765582490763);
    expect(positions[8]).toBeCloseTo(0);
    // Node 3: roller, free in X
    expect(positions[9]).toBeCloseTo(6.324327788495652);
    expect(positions[10]).toBeCloseTo(0);
    expect(positions[11]).toBeCloseTo(0);

    // Left column: carries 50 kN shear, pin at base (Mz=0), moment at top
    const f0 = internalForces.get(0)!;
    expect(f0.N[0]).toBeCloseTo(-33.333333333325314);
    expect(f0.N[1]).toBeCloseTo(-33.333333333325314);
    expect(f0.Vy[0]).toBeCloseTo(49.999999999988034);
    expect(f0.Vy[1]).toBeCloseTo(49.999999999988034);
    expect(f0.Mz[0]).toBeCloseTo(0); // pin support: Mz at base = 0
    expect(f0.Mz[1]).toBeCloseTo(-199.99999999995185);

    // Beam: transfers moment and vertical load
    const f1 = internalForces.get(1)!;
    expect(f1.N[0]).toBeCloseTo(0);
    expect(f1.N[1]).toBeCloseTo(0);
    expect(f1.Vy[0]).toBeCloseTo(-33.33333333332531);
    expect(f1.Vy[1]).toBeCloseTo(-33.33333333332531);
    expect(f1.Mz[0]).toBeCloseTo(-199.9999999999518);
    expect(f1.Mz[1]).toBeCloseTo(0);

    // Right column: roller support, no moment anywhere
    const f2 = internalForces.get(2)!;
    expect(f2.N[0]).toBeCloseTo(63.33333333332531);
    expect(f2.N[1]).toBeCloseTo(63.33333333332531);
    expect(f2.Vy[0]).toBeCloseTo(0);
    expect(f2.Vy[1]).toBeCloseTo(0);
    expect(f2.Mz[0]).toBeCloseTo(0);
    expect(f2.Mz[1]).toBeCloseTo(0);
  });

  test("2-story frame: fixed supports with releases on beams", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base left, fixed
      [8, 0, 0], // base right, fixed
      [0, 4, 0], // 1st floor left
      [8, 4, 0], // 1st floor right
      [0, 8, 0], // 2nd floor left
      [8, 8, 0], // 2nd floor right
    ];
    const elements: Mesh["elements"]["val"] = [
      [0, 2], // left column, ground to 1st floor
      [1, 3], // right column, ground to 1st floor
      [2, 3], // 1st floor beam
      [2, 4], // left column, 1st to 2nd floor
      [3, 5], // right column, 1st to 2nd floor
      [4, 5], // roof beam
    ];
    const supports: Mesh["supports"]["val"] = new Map([
      [0, [true, true, true, true, true, true]], // fixed
      [1, [true, true, true, true, true, true]], // fixed
    ]);
    const loads: Mesh["loads"]["val"] = new Map([
      [2, [80, 0, 0, 0, 0, 0]], // 80 kN horizontal at 1st floor left
      [4, [40, -20, 0, 0, 0, 0]], // 40 kN horizontal + 20 kN downward at roof left
    ]);
    const elementsProps: Mesh["elementsProps"]["val"] = new Map(
      elements.map((_, i) => [i, { ...genericMemberProps }]),
    );
    const releases: Mesh["releases"]["val"] = new Map([
      [2, [true, true, true, true]], // both-ends on 1st floor beam
      [5, [false, false, true, true]], // end release on roof beam
    ]);

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
      releases,
    );

    expect(positions.length).toBe(nodes.length * 3);
    // Nodes 0 and 1: fixed bases, no displacement
    expect(positions[0]).toBeCloseTo(0);
    expect(positions[1]).toBeCloseTo(0);
    expect(positions[2]).toBeCloseTo(0);
    expect(positions[3]).toBeCloseTo(8);
    expect(positions[4]).toBeCloseTo(0);
    expect(positions[5]).toBeCloseTo(0);
    // 1st floor nodes
    expect(positions[6]).toBeCloseTo(0.1301618401584386);
    expect(positions[7]).toBeCloseTo(3.9999933090545716);
    expect(positions[8]).toBeCloseTo(0);
    expect(positions[9]).toBeCloseTo(8.129896394476514);
    expect(positions[10]).toBeCloseTo(3.999967709339874);
    expect(positions[11]).toBeCloseTo(0);
    // 2nd floor nodes
    expect(positions[12]).toBeCloseTo(0.3205277894007078);
    expect(positions[13]).toBeCloseTo(7.999986618109143);
    expect(positions[14]).toBeCloseTo(0);
    expect(positions[15]).toBeCloseTo(8.320532486375086);
    expect(positions[16]).toBeCloseTo(7.999935418679748);
    expect(positions[17]).toBeCloseTo(0);

    // Verify releases: moments at released DOFs must be zero
    const beam1 = internalForces.get(2)!;
    expect(beam1.My[0]).toBeCloseTo(0);
    expect(beam1.Mz[0]).toBeCloseTo(0);
    expect(beam1.My[1]).toBeCloseTo(0);
    expect(beam1.Mz[1]).toBeCloseTo(0);

    const roofBeam = internalForces.get(5)!;
    expect(roofBeam.My[1]).toBeCloseTo(0);
    expect(roofBeam.Mz[1]).toBeCloseTo(0);

    // Internal forces regression values
    const f0 = internalForces.get(0)!;
    expect(f0.N[0]).toBeCloseTo(3.432873188960432);
    expect(f0.Vy[0]).toBeCloseTo(53.10980811721004);
    expect(f0.Mz[0]).toBeCloseTo(244.72190081388828);
    expect(f0.Mz[1]).toBeCloseTo(32.28266834504814);

    const f1 = internalForces.get(1)!;
    expect(f1.N[0]).toBeCloseTo(16.567126811039568);
    expect(f1.Vy[0]).toBeCloseTo(66.89019188280238);
    expect(f1.Mz[0]).toBeCloseTo(262.7410846978674);
    expect(f1.Mz[1]).toBeCloseTo(-4.819682833342085);

    const f3 = internalForces.get(3)!;
    expect(f3.N[0]).toBeCloseTo(3.432873188960432);
    expect(f3.Vy[0]).toBeCloseTo(41.204920708341206);
    expect(f3.Mz[0]).toBeCloseTo(32.28266834504802);
    expect(f3.Mz[1]).toBeCloseTo(-132.5370144883167);

    const f4 = internalForces.get(4)!;
    expect(f4.N[0]).toBeCloseTo(16.567126811039568);
    expect(f4.Vy[0]).toBeCloseTo(-1.2049207083355213);
    expect(f4.Mz[0]).toBeCloseTo(-4.819682833342085);
    expect(f4.Mz[1]).toBeCloseTo(0);

    expect(roofBeam.N[0]).toBeCloseTo(-1.2049207083327929);
    expect(roofBeam.Vy[0]).toBeCloseTo(-16.567126811039568);
    expect(roofBeam.Mz[0]).toBeCloseTo(-132.53701448831654);
    expect(roofBeam.Mz[1]).toBeCloseTo(0);
  });
});
