import { describe, test, expect } from "vitest";
import type { Mesh } from "../../data-model";
import { getPositionsAndForces } from "./getPositionsAndForces";
import { getReactions } from "../getReactions";

describe("getPositionsAndForces", () => {
  // Generic member default props (converted to analysis units)
  const genericMemberProps = {
    elasticity: 32_836_000, // kN/m² (32836 MPa × 1e3)
    area: 0.0625, // m² (625 cm² / 1e4)
    momentInertiaZ: 0.00032552,
    momentInertiaY: 0.00032552, // m⁴ (32552 cm⁴ / 1e8)
    shearModulus: 0,
    torsionalConstant: 0,
  };

  test("1- Cantilever column: single vertical member with horizontal tip load", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base, fixed
      [0, 0, 3], // top, free
    ];
    const elements: Mesh["elements"]["val"] = [[0, 1]];
    const supports: Mesh["supports"]["val"] = new Map([
      [0, [true, true, true, true, true, true]], // fixed
    ]);
    const loads: Mesh["loads"]["val"] = new Map([
      [1, [10, 0, -2000, 0, 0, 0]], // 10 kN in +X, 2000 kN downward at tip
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
    // Node 1: deflects due to 10 kN in +X and 2000 kN downward
    expect(positions[3]).toBeCloseTo(0.008420048355177607);
    expect(positions[4]).toBeCloseTo(0);
    expect(positions[5]).toBeCloseTo(2.997076379583384);

    const f0 = internalForces.get(0)!;
    expect(f0.N[0]).toBeCloseTo(2000); // axial = applied downward load
    expect(f0.N[1]).toBeCloseTo(2000);
    expect(f0.Vy[0]).toBeCloseTo(0);
    expect(f0.Vy[1]).toBeCloseTo(0);
    expect(f0.Vz[0]).toBeCloseTo(10); // shear = applied horizontal load (now in Vz plane)
    expect(f0.Vz[1]).toBeCloseTo(10);
    expect(f0.Mx[0]).toBeCloseTo(0);
    expect(f0.Mx[1]).toBeCloseTo(0);
    const reactions = getReactions(
      nodes,
      elements,
      internalForces,
      loads,
      supports,
    );
    expect(reactions[0][0]).toBeCloseTo(-10);
    expect(reactions[0][1]).toBeCloseTo(2000);
    expect(reactions[0][5]).toBeCloseTo(30);
    reactions[1].forEach((value) => expect(value).toBeCloseTo(0));
    expect(f0.My[0]).toBeCloseTo(-30); // moment at base = P × L = 10 × 3 (now My)
    expect(f0.My[1]).toBeCloseTo(0); // moment at free end = 0
    expect(f0.Mz[0]).toBeCloseTo(0);
    expect(f0.Mz[1]).toBeCloseTo(0);
  });

  test("2- Portal frame: pin and roller supports with horizontal and vertical loads", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base left, pin
      [0, 0, 4], // top left
      [6, 0, 4], // top right
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
      [1, [10, 0, -500, 0, 0, 0]], // 10 kN in +X, 500 kN downward at top left
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
    // Node 1: top left, sways under load
    expect(positions[3]).toBeCloseTo(0.049264214577594834);
    expect(positions[4]).toBeCloseTo(0);
    expect(positions[5]).toBeCloseTo(3.9990384537296464);
    // Node 2: top right
    expect(positions[6]).toBeCloseTo(6.049264214577595);
    expect(positions[7]).toBeCloseTo(0);
    expect(positions[8]).toBeCloseTo(3.9999870061314815);
    // Node 3: roller, free in X
    expect(positions[9]).toBeCloseTo(6.064865557699131);
    expect(positions[10]).toBeCloseTo(0);
    expect(positions[11]).toBeCloseTo(0);

    // Left column: carries 10 kN shear, pin at base (My=0), moment at top
    const f0 = internalForces.get(0)!;
    expect(f0.N[0]).toBeCloseTo(493.3333333333349);
    expect(f0.N[1]).toBeCloseTo(493.3333333333349);
    expect(f0.Vz[0]).toBeCloseTo(9.999999999997627);
    expect(f0.Vz[1]).toBeCloseTo(9.999999999997627);
    expect(f0.My[0]).toBeCloseTo(0); // pin support: My at base = 0
    expect(f0.My[1]).toBeCloseTo(39.99999999999049);

    // Beam: transfers moment and vertical load
    const f1 = internalForces.get(1)!;
    expect(f1.N[0]).toBeCloseTo(0);
    expect(f1.N[1]).toBeCloseTo(0);
    expect(f1.Vz[0]).toBeCloseTo(-6.666666666665087);
    expect(f1.Vz[1]).toBeCloseTo(-6.666666666665087);
    expect(f1.My[0]).toBeCloseTo(39.999999999990514);
    expect(f1.My[1]).toBeCloseTo(0);

    // Right column: roller support, no moment anywhere
    const f2 = internalForces.get(2)!;
    expect(f2.N[0]).toBeCloseTo(6.6666666666650825);
    expect(f2.N[1]).toBeCloseTo(6.6666666666650825);
    expect(f2.Vz[0]).toBeCloseTo(0);
    expect(f2.Vz[1]).toBeCloseTo(0);
    expect(f2.My[0]).toBeCloseTo(0);
    expect(f2.My[1]).toBeCloseTo(0);
  });

  test("3- 2-story frame: fixed supports with releases on beams", () => {
    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base left, fixed
      [6, 0, 0], // base right, fixed
      [0, 0, 4], // 1st floor left
      [6, 0, 4], // 1st floor right
      [0, 0, 8], // 2nd floor left
      [6, 0, 8], // 2nd floor right
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
      [2, [10, 0, -500, 0, 0, 0]], // 10 kN in +X, 500 kN downward at 1st floor left
      [4, [10, 0, -500, 0, 0, 0]], // 10 kN in +X, 500 kN downward at roof left
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
    expect(positions[3]).toBeCloseTo(6);
    expect(positions[4]).toBeCloseTo(0);
    expect(positions[5]).toBeCloseTo(0);
    // 1st floor nodes
    expect(positions[6]).toBeCloseTo(0.023267154105259393);
    expect(positions[7]).toBeCloseTo(0);
    expect(positions[8]).toBeCloseTo(3.9980610563981953);
    expect(positions[9]).toBeCloseTo(6.023233100725922);
    expect(positions[10]).toBeCloseTo(0);
    expect(positions[11]).toBeCloseTo(3.999989863324061);
    // 2nd floor nodes
    expect(positions[12]).toBeCloseTo(0.05807289754970511);
    expect(positions[13]).toBeCloseTo(0);
    expect(positions[14]).toBeCloseTo(7.997096652935262);
    expect(positions[15]).toBeCloseTo(6.058072905791333);
    expect(positions[16]).toBeCloseTo(0);
    expect(positions[17]).toBeCloseTo(7.999979726648122);

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
    expect(f0.N[0]).toBeCloseTo(994.7992517009686);
    expect(f0.Vz[0]).toBeCloseTo(8.35514435598531);
    expect(f0.My[0]).toBeCloseTo(-42.22736355047718);
    expect(f0.My[1]).toBeCloseTo(-8.80678612653594);

    const f1 = internalForces.get(1)!;
    expect(f1.N[0]).toBeCloseTo(5.200748299031218);
    expect(f1.Vz[0]).toBeCloseTo(11.64485564401214);
    expect(f1.My[0]).toBeCloseTo(-46.568146655322266);
    expect(f1.My[1]).toBeCloseTo(0.011275920726276922);

    const f3 = internalForces.get(3)!;
    expect(f3.N[0]).toBeCloseTo(494.7992517009686);
    expect(f3.Vz[0]).toBeCloseTo(10.002818980180823);
    expect(f3.My[0]).toBeCloseTo(-8.806786126535933);
    expect(f3.My[1]).toBeCloseTo(31.204489794187324);

    const f4 = internalForces.get(4)!;
    expect(f4.N[0]).toBeCloseTo(5.200748299031218);
    expect(f4.Vz[0]).toBeCloseTo(-0.0028189801815585724);
    expect(f4.My[0]).toBeCloseTo(0.011275920726291133);
    expect(f4.My[1]).toBeCloseTo(0);

    expect(roofBeam.N[0]).toBeCloseTo(-0.0028189801814733073);
    expect(roofBeam.Vz[0]).toBeCloseTo(-5.200748299031219);
    expect(roofBeam.My[0]).toBeCloseTo(31.20448979418731);
    expect(roofBeam.My[1]).toBeCloseTo(0);
  });

  test("4- 3D portal frame: out-of-plane bending and torsion", () => {
    // Same geometry as case 2 but both bases fixed and 3D loads applied at top-left node:
    // Fz=10 kN (out-of-plane), Fy=-500 kN (axial compression), Mx=20 kN·m (torsion).
    // Section properties match a 0.25 m × 0.25 m square (physical values):
    //   A = a², I = a⁴/12, J = 0.140577 a⁴, G = E / (2(1+ν)) with ν = 0.2
    const props3D = {
      elasticity: 32_836_000, // kN/m²
      area: 0.0625, // m² (0.25²)
      momentInertiaZ: 0.00032552,
      momentInertiaY: 0.0003255208333333333, // m⁴ (0.25⁴/12, symmetric: Iy = Iz)
      shearModulus: 13_681_666.666666666, // kN/m² (E / (2*(1+0.2)))
      torsionalConstant: 0.000549128125, // m⁴ (0.140577 × 0.25⁴)
    };

    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0], // base left, fixed
      [0, 0, 4], // top left
      [6, 0, 4], // top right
      [6, 0, 0], // base right, fixed
    ];
    const elements: Mesh["elements"]["val"] = [
      [0, 1], // left column
      [1, 2], // beam
      [2, 3], // right column
    ];
    const supports: Mesh["supports"]["val"] = new Map([
      [0, [true, true, true, true, true, true]], // fixed
      [3, [true, true, true, true, true, true]], // fixed
    ]);
    const loads: Mesh["loads"]["val"] = new Map([
      [1, [0, 10, -500, 20, 0, 0]], // Fz=-500 kN, Fy=10 kN, Mx=20 kN·m
    ]);
    const elementsProps: Mesh["elementsProps"]["val"] = new Map(
      elements.map((_, i) => [i, { ...props3D }]),
    );

    const { positions, internalForces } = getPositionsAndForces(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
    );

    expect(positions.length).toBe(nodes.length * 3);
    // Node 0: fixed base, no displacement
    expect(positions[0]).toBeCloseTo(0);
    expect(positions[1]).toBeCloseTo(0);
    expect(positions[2]).toBeCloseTo(0);
    // Node 1: top left — settles in Z, displaces in Y (out-of-plane)
    expect(positions[3]).toBeCloseTo(-0.0002597571124434302);
    expect(positions[4]).toBeCloseTo(0.004530214794008334);
    expect(positions[5]).toBeCloseTo(3.9990256853447326);
    // Node 2: top right — displaces in Y (torsion/shear carried through beam)
    expect(positions[6]).toBeCloseTo(5.999740242887556);
    expect(positions[7]).toBeCloseTo(0.00045944349054136054);
    expect(positions[8]).toBeCloseTo(3.9999997745163953);
    // Node 3: fixed base, no displacement
    expect(positions[9]).toBeCloseTo(6);
    expect(positions[10]).toBeCloseTo(0);
    expect(positions[11]).toBeCloseTo(0);

    // Left column: Fy → Vy and Mz (out-of-plane bending); Mx (torsion) from applied Mx
    const f0 = internalForces.get(0)!;
    expect(f0.N[0]).toBeCloseTo(499.88431281813973); // axial ≈ 500 kN
    expect(f0.N[1]).toBeCloseTo(499.88431281813973);
    expect(f0.Vy[0]).toBeCloseTo(-9.638712896366025); // out-of-plane shear
    expect(f0.Vy[1]).toBeCloseTo(-9.638712896366025);
    expect(f0.Vz[0]).toBeCloseTo(0); // no in-plane horizontal load
    expect(f0.Vz[1]).toBeCloseTo(0);
    expect(f0.Mx[0]).toBeCloseTo(1.08386131090193); // torsion
    expect(f0.Mx[1]).toBeCloseTo(1.08386131090193);
    expect(f0.My[0]).toBeCloseTo(0.347061545580747);
    expect(f0.My[1]).toBeCloseTo(0.3470615455807513);
    expect(f0.Mz[0]).toBeCloseTo(-18.904422865950487); // major-axis moment at base
    expect(f0.Mz[1]).toBeCloseTo(19.650428719513613); // at top

    // Beam: Mx constant; Mz antisymmetric from Fy path
    const f1 = internalForces.get(1)!;
    expect(f1.Vy[0]).toBeCloseTo(0.36128710363397687);
    expect(f1.Vy[1]).toBeCloseTo(0.36128710363397687);
    expect(f1.Vz[0]).toBeCloseTo(-0.11568718186025043);
    expect(f1.Vz[1]).toBeCloseTo(-0.11568718186025043);
    expect(f1.Mx[0]).toBeCloseTo(0.34957128048638864);
    expect(f1.Mx[1]).toBeCloseTo(0.34957128048638864);
    expect(f1.Mz[0]).toBeCloseTo(1.0838613109019302);
    expect(f1.Mz[1]).toBeCloseTo(-1.0838613109019306);

    // Right column: Vy and Mz from Fy path; Mx torsion continues to base
    const f2 = internalForces.get(2)!;
    expect(f2.N[0]).toBeCloseTo(0.1156871818602505); // minimal axial
    expect(f2.N[1]).toBeCloseTo(0.1156871818602505);
    expect(f2.Vy[0]).toBeCloseTo(0.3612871036339762);
    expect(f2.Vy[1]).toBeCloseTo(0.3612871036339762);
    expect(f2.Vz[0]).toBeCloseTo(0);
    expect(f2.Vz[1]).toBeCloseTo(0);
    expect(f2.Mx[0]).toBeCloseTo(1.08386131090193); // torsion
    expect(f2.Mx[1]).toBeCloseTo(1.08386131090193);
    expect(f2.Mz[0]).toBeCloseTo(0.3495712804863882);
    expect(f2.Mz[1]).toBeCloseTo(-1.0955771340495164);
  });

});
