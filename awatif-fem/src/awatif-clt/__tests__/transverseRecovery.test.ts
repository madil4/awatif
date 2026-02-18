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

  test("default mode follows layup shearCoupling option", () => {
    const gamma: [number, number] = [1.6e-4, -1.1e-4];

    const uncoupledLayup = makeLayup();
    const uncoupledProfile = recoverLaminateTransverseShearProfile(
      uncoupledLayup,
      gamma,
    );
    const uncoupledResultant = recoverLaminateTransverseResultantFromProfile(
      uncoupledProfile,
    );
    const uncoupledConstitutive =
      recoverLaminateTransverseResultantFromConstitutive(
        uncoupledLayup,
        gamma,
      );
    expect(uncoupledResultant[0]).toBeCloseTo(uncoupledConstitutive[0], 9);
    expect(uncoupledResultant[1]).toBeCloseTo(uncoupledConstitutive[1], 9);

    const coupledLayup = makeCoupledLayup();
    const coupledProfile = recoverLaminateTransverseShearProfile(coupledLayup, gamma);
    const coupledResultant = recoverLaminateTransverseResultantFromProfile(
      coupledProfile,
    );
    const coupledConstitutive = recoverLaminateTransverseResultantFromConstitutive(
      coupledLayup,
      gamma,
    );
    expect(coupledResultant[0]).toBeCloseTo(coupledConstitutive[0], 8);
    expect(coupledResultant[1]).toBeCloseTo(coupledConstitutive[1], 8);
  });

  test("uncoupled mode enforces zero shell traction at every layer boundary", () => {
    const layup = makeLayup();
    const profile = recoverLaminateTransverseShearProfile(layup, [2e-4, 1e-4], {
      mode: "uncoupled",
    });

    profile.forEach((layer) => {
      const top = getPoint(layer, "top");
      const bottom = getPoint(layer, "bottom");
      expect(top).toBeDefined();
      expect(bottom).toBeDefined();
      expect(norm2(top?.tauShell ?? [0, 0])).toBeCloseTo(0, 12);
      expect(norm2(bottom?.tauShell ?? [0, 0])).toBeCloseTo(0, 12);
    });
  });

  test("coupled mode keeps shell traction continuous across layer interfaces", () => {
    const layup = makeCoupledLayup();
    const profile = recoverLaminateTransverseShearProfile(layup, [2.6e-4, 0.9e-4], {
      mode: "coupled",
    });

    let sawNonZeroInterface = false;
    for (let i = 0; i < profile.length - 1; i++) {
      const bottom = getPoint(profile[i], "bottom");
      const topNext = getPoint(profile[i + 1], "top");
      expect(bottom).toBeDefined();
      expect(topNext).toBeDefined();

      const shellGap = norm2(sub2(bottom?.tauShell ?? [0, 0], topNext?.tauShell ?? [0, 0]));
      expect(shellGap).toBeLessThan(1e-8);
      if (norm2(bottom?.tauShell ?? [0, 0]) > 1e-6) sawNonZeroInterface = true;
    }

    expect(sawNonZeroInterface).toBe(true);
  });

  test("coupled mode shows layer-local jump at orthotropic interfaces", () => {
    const layup = makeCoupledLayup();
    const profile = recoverLaminateTransverseShearProfile(layup, [3.1e-4, -1.2e-4], {
      mode: "coupled",
    });

    const bottomLayer0 = getPoint(profile[0], "bottom");
    const topLayer1 = getPoint(profile[1], "top");
    expect(bottomLayer0).toBeDefined();
    expect(topLayer1).toBeDefined();

    const shellGap = norm2(
      sub2(bottomLayer0?.tauShell ?? [0, 0], topLayer1?.tauShell ?? [0, 0]),
    );
    const layerGap = norm2(
      sub2(bottomLayer0?.tauLayer ?? [0, 0], topLayer1?.tauLayer ?? [0, 0]),
    );
    const layerRef = Math.max(
      norm2(bottomLayer0?.tauLayer ?? [0, 0]),
      norm2(topLayer1?.tauLayer ?? [0, 0]),
      1e-12,
    );

    expect(shellGap).toBeLessThan(1e-8);
    expect(layerGap / layerRef).toBeGreaterThan(0.1);
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
  const base = makeLayup();
  return {
    ...base,
    options: {
      ...base.options,
      shearCoupling: true,
    },
  };
}

function getPoint(
  layer: {
    points: Array<{ point: "top" | "mid" | "bottom"; tauShell: [number, number]; tauLayer: [number, number] }>;
  } | undefined,
  point: "top" | "mid" | "bottom",
) {
  return layer?.points.find((p) => p.point === point);
}

function sub2(a: [number, number], b: [number, number]): [number, number] {
  return [a[0] - b[0], a[1] - b[1]];
}

function norm2(v: [number, number]): number {
  return Math.hypot(v[0], v[1]);
}
