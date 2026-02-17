import { CLTLayup, DeformOutputs, ElementInputs, Node } from "../../data-model";
import {
  recoverLaminateInPlaneStressProfile,
} from "../stress/inPlane";
import {
  getLayerPointStressComponent,
  recoverCltInPlaneStressProfiles,
  recoverCltTransverseShearProfiles,
} from "../stress/recover";
import { recoverLaminateTransverseResultantFromProfile } from "../stress/transverse";

describe("CLT in-plane mesh recovery", () => {
  test("matches direct laminate profile on a single shell element", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
    ];
    const elements = [[0, 1, 2]];

    const layup = makeLayup();
    const eps0: [number, number, number] = [1.1e-3, -3.5e-4, 2.8e-4];
    const kappa: [number, number, number] = [2.4e-3, -1.6e-3, 9e-4];

    const elementInputs: ElementInputs = {
      cltLayups: new Map([[0, layup]]),
    };
    const deformOutputs: DeformOutputs = {
      deformations: buildNodalDofs(nodes, eps0, kappa),
      reactions: new Map(),
    };

    const profiles = recoverCltInPlaneStressProfiles(
      nodes,
      elements,
      elementInputs,
      deformOutputs,
      { mode: "coupled" },
    );
    const profile = profiles.get(0);
    expect(profile).toBeDefined();

    const expected = recoverLaminateInPlaneStressProfile(
      layup,
      eps0,
      kappa,
      { mode: "coupled" },
    );

    expect(profile?.length).toBe(expected.length);
    expect(profile?.[0].points[0].stressShell[0]).toBeCloseTo(
      expected[0].points[0].stressShell[0],
      10,
    );
    expect(profile?.[0].points[1].stressShell[1]).toBeCloseTo(
      expected[0].points[1].stressShell[1],
      10,
    );
    expect(profile?.[0].points[2].stressShell[2]).toBeCloseTo(
      expected[0].points[2].stressShell[2],
      10,
    );
  });

  test("returns component helper values and skips non-CLT elements", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
    ];
    const elements = [[0, 1, 2]];

    const profiles = recoverCltInPlaneStressProfiles(
      nodes,
      elements,
      {},
      { deformations: new Map(), reactions: new Map() },
    );
    expect(profiles.size).toBe(0);

    const layup = makeLayup();
    const eps0: [number, number, number] = [8e-4, 0, 0];
    const kappa: [number, number, number] = [0, 0, 0];
    const direct = recoverLaminateInPlaneStressProfile(layup, eps0, kappa);
    const sigmaX = getLayerPointStressComponent(direct, 0, "mid", "sigmaX");
    expect(sigmaX).toBeDefined();
    expect(sigmaX as number).toBeGreaterThan(0);
  });

  test("recovers mesh-level transverse shear profile and keeps top/bottom zero", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
    ];
    const elements = [[0, 1, 2]];
    const layup = {
      ...makeLayup(),
      options: { ...makeLayup().options, shearCoupling: false },
    };

    const elementInputs: ElementInputs = {
      cltLayups: new Map([[0, layup]]),
    };
    const deformOutputs: DeformOutputs = {
      deformations: new Map([
        [0, [0, 0, 0, 0, 0, 0]],
        [1, [0, 0, 0.02, 0, 0, 0]],
        [2, [0, 0, 0, 0, 0, 0]],
      ]),
      reactions: new Map(),
    };

    const profiles = recoverCltTransverseShearProfiles(
      nodes,
      elements,
      elementInputs,
      deformOutputs,
      { mode: "uncoupled" },
    );
    const elementProfile = profiles.get(0);
    expect(elementProfile).toBeDefined();

    const firstLayer = elementProfile?.[0];
    const top = firstLayer?.points.find((p) => p.point === "top");
    const mid = firstLayer?.points.find((p) => p.point === "mid");
    const bot = firstLayer?.points.find((p) => p.point === "bottom");

    expect(top?.tauShell[0]).toBeCloseTo(0, 12);
    expect(top?.tauShell[1]).toBeCloseTo(0, 12);
    expect(bot?.tauShell[0]).toBeCloseTo(0, 12);
    expect(bot?.tauShell[1]).toBeCloseTo(0, 12);
    expect(Math.hypot(mid?.tauShell[0] ?? 0, mid?.tauShell[1] ?? 0)).toBeGreaterThan(0);
  });

  test("transverse recovery scales linearly with displacement amplitude", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
    ];
    const elements = [[0, 1, 2]];
    const layup = {
      ...makeLayup(),
      options: { ...makeLayup().options, shearCoupling: false },
    };
    const elementInputs: ElementInputs = {
      cltLayups: new Map([[0, layup]]),
    };

    const run = (scale: number) =>
      recoverCltTransverseShearProfiles(
        nodes,
        elements,
        elementInputs,
        {
          deformations: new Map([
            [0, [0, 0, 0, 0, 0, 0]],
            [1, [0, 0, 0.01 * scale, 0, 0, 0]],
            [2, [0, 0, 0, 0, 0, 0]],
          ]),
          reactions: new Map(),
        },
        { mode: "uncoupled" },
      ).get(0) ?? [];

    const profile1 = run(1);
    const profile2 = run(2);
    const q1 = recoverLaminateTransverseResultantFromProfile(profile1);
    const q2 = recoverLaminateTransverseResultantFromProfile(profile2);

    expect(q2[0]).toBeCloseTo(2 * q1[0], 9);
    expect(q2[1]).toBeCloseTo(2 * q1[1], 9);
  });
});

function makeLayup(): CLTLayup {
  return {
    layers: [
      {
        thickness: 0.03,
        thetaDeg: 0,
        Ex: 11e9,
        Ey: 370e6,
        nuXY: 0.2,
        Gxy: 690e6,
        Gxz: 690e6,
        Gyz: 69e6,
      },
    ],
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
    },
  };
}

function buildNodalDofs(
  nodes: Node[],
  eps0: [number, number, number],
  kappa: [number, number, number],
): NonNullable<DeformOutputs["deformations"]> {
  const [epsX0, epsY0, gammaXY0] = eps0;
  const [kappaX, kappaY, kappaXY] = kappa;
  const map: NonNullable<DeformOutputs["deformations"]> = new Map();

  nodes.forEach(([x, y], nodeIndex) => {
    const ux = epsX0 * x + 0.5 * gammaXY0 * y;
    const uy = epsY0 * y + 0.5 * gammaXY0 * x;

    const rx = kappaY * y + 0.5 * kappaXY * x;
    const ry = -(kappaX * x + 0.5 * kappaXY * y);

    map.set(nodeIndex, [ux, uy, 0, rx, ry, 0]);
  });

  return map;
}
