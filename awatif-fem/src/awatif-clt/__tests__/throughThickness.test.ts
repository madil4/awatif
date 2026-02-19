import { CLTLayup } from "../../data-model";
import { recoverLaminateInPlaneStressProfile } from "../stress/inPlane";
import { recoverLaminateTransverseShearProfile } from "../stress/transverse";
import {
  getThroughThicknessExtrema,
  sampleInPlaneThroughThickness,
  sampleTransverseThroughThickness,
} from "../stress/throughThickness";

describe("CLT through-thickness sampling", () => {
  test("returns expected sample counts with and without interface duplicates", () => {
    const layup = makeLayup({ shearCoupling: true });
    const inPlane = recoverLaminateInPlaneStressProfile(
      layup,
      [1.2e-4, -8e-5, 5e-5],
      [3.4e-3, -2.6e-3, 1.7e-3],
      { mode: "coupled" },
    );

    const withDuplicates = sampleInPlaneThroughThickness(inPlane, "sigmaX", {
      includeInterfaceDuplicates: true,
    });
    const withoutDuplicates = sampleInPlaneThroughThickness(inPlane, "sigmaX", {
      includeInterfaceDuplicates: false,
    });

    expect(withDuplicates).toHaveLength(9);
    expect(withoutDuplicates).toHaveLength(7);
  });

  test("tracks extrema and z locations", () => {
    const layup = makeLayup({ shearCoupling: true });
    const inPlane = recoverLaminateInPlaneStressProfile(
      layup,
      [0, 0, 0],
      [1e-2, 0, 0],
      { mode: "coupled" },
    );
    const samples = sampleInPlaneThroughThickness(inPlane, "sigmaX", {
      includeInterfaceDuplicates: false,
    });

    const extrema = getThroughThicknessExtrema(samples);
    expect(extrema.max).toBeGreaterThan(0);
    expect(extrema.min).toBeLessThan(0);
    expect(extrema.maxAbs).toBeCloseTo(
      Math.max(Math.abs(extrema.min), Math.abs(extrema.max)),
      12,
    );
    expect(extrema.zAtMax).toBeDefined();
    expect(extrema.zAtMin).toBeDefined();
  });

  test("captures coupled shell continuity and layer-local interface jump", () => {
    const layup = makeLayup({ shearCoupling: true });
    const profile = recoverLaminateTransverseShearProfile(layup, [2.5e-4, -1.3e-4], {
      mode: "coupled",
    });

    const shell = sampleTransverseThroughThickness(profile, "tauYZ", {
      includeInterfaceDuplicates: true,
    });
    const layer = sampleTransverseThroughThickness(profile, "tau23", {
      includeInterfaceDuplicates: true,
    });

    // Interface between layers 0 and 1 corresponds to entries 2 and 3.
    expect(Math.abs(shell[2].zGlobal - shell[3].zGlobal)).toBeLessThan(1e-12);
    expect(Math.abs(shell[2].value - shell[3].value)).toBeLessThan(1e-8);

    const layerDiff = Math.abs(layer[2].value - layer[3].value);
    const layerRef = Math.max(Math.abs(layer[2].value), Math.abs(layer[3].value), 1e-12);
    expect(layerDiff / layerRef).toBeGreaterThan(0.1);
  });
});

function makeLayup(options: Partial<CLTLayup["options"]>): CLTLayup {
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
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
      ...options,
    },
  };
}
