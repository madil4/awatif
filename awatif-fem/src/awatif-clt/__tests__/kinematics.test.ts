import { Node } from "../../data-model";
import {
  getShellLinearKinematics,
  getShellTransverseShearStrain,
} from "../stress/kinematics";

describe("shell linear kinematics", () => {
  const nodes: Node[] = [
    [0, 0, 0],
    [2, 0, 0],
    [0, 1, 0],
  ];

  test("recovers constant membrane strains from linear in-plane displacement field", () => {
    const epsX = 1.1e-3;
    const epsY = -4.0e-4;

    const displacements = buildShellDofs(nodes, (x, y) => ({
      ux: epsX * x,
      uy: epsY * y,
    }));

    const kinematics = getShellLinearKinematics(nodes, displacements);

    expect(kinematics.membraneStrain[0]).toBeCloseTo(epsX, 12);
    expect(kinematics.membraneStrain[1]).toBeCloseTo(epsY, 12);
    expect(kinematics.membraneStrain[2]).toBeCloseTo(0, 12);

    expect(kinematics.curvature[0]).toBeCloseTo(0, 12);
    expect(kinematics.curvature[1]).toBeCloseTo(0, 12);
    expect(kinematics.curvature[2]).toBeCloseTo(0, 12);
  });

  test("recovers constant curvatures from linear rotation field", () => {
    const kappaX = 2.3e-3;
    const kappaY = -1.7e-3;
    const kappaXY = 8.0e-4;

    const displacements = buildShellDofs(nodes, (x, y) => ({
      rx: kappaY * y + 0.5 * kappaXY * x,
      ry: -(kappaX * x + 0.5 * kappaXY * y),
    }));

    const kinematics = getShellLinearKinematics(nodes, displacements);

    expect(kinematics.membraneStrain[0]).toBeCloseTo(0, 12);
    expect(kinematics.membraneStrain[1]).toBeCloseTo(0, 12);
    expect(kinematics.membraneStrain[2]).toBeCloseTo(0, 12);

    expect(kinematics.curvature[0]).toBeCloseTo(kappaX, 12);
    expect(kinematics.curvature[1]).toBeCloseTo(kappaY, 12);
    expect(kinematics.curvature[2]).toBeCloseTo(kappaXY, 12);
  });

  test("returns zero strains and area for degenerate triangles", () => {
    const degenerateNodes: Node[] = [
      [0, 0, 0],
      [1, 0, 0],
      [2, 0, 0],
    ];

    const kinematics = getShellLinearKinematics(
      degenerateNodes,
      buildShellDofs(degenerateNodes, () => ({})),
    );

    expect(kinematics.elementArea).toBe(0);
    expect(kinematics.membraneStrain).toEqual([0, 0, 0]);
    expect(kinematics.curvature).toEqual([0, 0, 0]);
  });

  test("transverse shear strain scales linearly with displacement amplitudes", () => {
    const d1 = buildShellDofs(nodes, (x) => ({
      uz: 0.01 * x,
    }));
    const d2 = buildShellDofs(nodes, (x) => ({
      uz: 0.02 * x,
    }));

    const g1 = getShellTransverseShearStrain(nodes, d1);
    const g2 = getShellTransverseShearStrain(nodes, d2);

    expect(g2[0]).toBeCloseTo(2 * g1[0], 12);
    expect(g2[1]).toBeCloseTo(2 * g1[1], 12);
  });
});

function buildShellDofs(
  nodes: Node[],
  atNode: (
    x: number,
    y: number,
    z: number,
    nodeIndex: number,
  ) => Partial<{ ux: number; uy: number; uz: number; rx: number; ry: number; rz: number }>,
): number[] {
  const dofs = Array(nodes.length * 6).fill(0);

  nodes.forEach(([x, y, z], nodeIndex) => {
    const d = atNode(x, y, z, nodeIndex);
    dofs[nodeIndex * 6 + 0] = d.ux ?? 0;
    dofs[nodeIndex * 6 + 1] = d.uy ?? 0;
    dofs[nodeIndex * 6 + 2] = d.uz ?? 0;
    dofs[nodeIndex * 6 + 3] = d.rx ?? 0;
    dofs[nodeIndex * 6 + 4] = d.ry ?? 0;
    dofs[nodeIndex * 6 + 5] = d.rz ?? 0;
  });

  return dofs;
}
