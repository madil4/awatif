import { CLTLayup } from "../../data-model";
import {
  recoverLaminateTransverseResultantFromConstitutive,
  recoverLaminateTransverseResultantFromProfile,
  recoverLaminateTransverseShearProfile,
} from "../stress/transverse";

describe("CLT transverse shear recovery", () => {
  test("returns parabolic layer profile with zero top/bottom and max at mid", () => {
    const layup = makeLayup();
    const gamma: [number, number] = [2e-4, -3e-4];

    const profile = recoverLaminateTransverseShearProfile(layup, gamma, {
      mode: "uncoupled",
    });

    const first = profile[0];
    const top = first.points.find((p) => p.point === "top");
    const mid = first.points.find((p) => p.point === "mid");
    const bot = first.points.find((p) => p.point === "bottom");

    expect(top?.tauLayer[0]).toBeCloseTo(0, 12);
    expect(top?.tauLayer[1]).toBeCloseTo(0, 12);
    expect(bot?.tauLayer[0]).toBeCloseTo(0, 12);
    expect(bot?.tauLayer[1]).toBeCloseTo(0, 12);

    expect(Math.abs(mid?.tauLayer[0] ?? 0)).toBeGreaterThan(0);
    expect(Math.abs(mid?.tauLayer[1] ?? 0)).toBeGreaterThan(0);
  });

  test("integrated profile resultant matches constitutive S*gamma", () => {
    const layup = makeLayup();
    const gamma: [number, number] = [3e-4, -2e-4];
    const profile = recoverLaminateTransverseShearProfile(layup, gamma, {
      mode: "uncoupled",
    });

    const fromProfile = recoverLaminateTransverseResultantFromProfile(profile);
    const fromConstitutive = recoverLaminateTransverseResultantFromConstitutive(
      layup,
      gamma,
      { mode: "uncoupled" },
    );

    expect(fromProfile[0]).toBeCloseTo(fromConstitutive[0], 9);
    expect(fromProfile[1]).toBeCloseTo(fromConstitutive[1], 9);
  });

  test("coupled mode recovers resultant equilibrium (Eq.45/46 style)", () => {
    const layup = makeCoupledLayup();
    const gamma: [number, number] = [2.2e-4, -1.9e-4];

    const profile = recoverLaminateTransverseShearProfile(layup, gamma, {
      mode: "coupled",
    });
    const fromProfile = recoverLaminateTransverseResultantFromProfile(profile);
    const fromConstitutive = recoverLaminateTransverseResultantFromConstitutive(
      layup,
      gamma,
      { mode: "coupled" },
    );

    expect(fromProfile[0]).toBeCloseTo(fromConstitutive[0], 8);
    expect(fromProfile[1]).toBeCloseTo(fromConstitutive[1], 8);

    const topGlobal = profile[0]?.points.find((p) => p.point === "top");
    const bottomGlobal = profile[profile.length - 1]?.points.find(
      (p) => p.point === "bottom",
    );
    expect(Math.hypot(topGlobal?.tauShell[0] ?? 0, topGlobal?.tauShell[1] ?? 0)).toBeCloseTo(0, 9);
    expect(
      Math.hypot(bottomGlobal?.tauShell[0] ?? 0, bottomGlobal?.tauShell[1] ?? 0),
    ).toBeCloseTo(0, 9);

    const interfacePoint = profile[0]?.points.find((p) => p.point === "bottom");
    expect(Math.hypot(interfacePoint?.tauShell[0] ?? 0, interfacePoint?.tauShell[1] ?? 0)).toBeGreaterThan(0);
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
      {
        thickness: 0.04,
        thetaDeg: 90,
        Ex: 11e9,
        Ey: 370e6,
        nuXY: 0.2,
        Gxy: 690e6,
        Gxz: 690e6,
        Gyz: 69e6,
      },
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
      shearCoupling: false,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
    },
  };
}

function makeCoupledLayup(): CLTLayup {
  return {
    ...makeLayup(),
    options: {
      ...makeLayup().options,
      shearCoupling: true,
    },
  };
}
