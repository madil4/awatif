import {
  extractInPlaneStressField,
  extractTransverseStressField,
  getFieldExtrema,
} from "../stress/fields";
import { LayerInPlaneStressProfile } from "../stress/inPlane";
import { LayerTransverseStressProfile } from "../stress/transverse";

describe("CLT stress field extraction", () => {
  test("extracts in-plane shell and layer components as element scalar fields", () => {
    const profiles = new Map<number, LayerInPlaneStressProfile[]>([
      [
        5,
        [
          {
            layerIndex: 0,
            thetaDeg: 0,
            thickness: 0.03,
            zTop: 0.015,
            zBot: -0.015,
            points: [
              {
                point: "top",
                zGlobal: 0.015,
                zLocal: 0.015,
                strainShell: [0, 0, 0],
                stressShell: [10, 20, 30],
                strainLayer: [0, 0, 0],
                stressLayer: [100, 200, 300],
              },
              {
                point: "mid",
                zGlobal: 0,
                zLocal: 0,
                strainShell: [0, 0, 0],
                stressShell: [11, 21, 31],
                strainLayer: [0, 0, 0],
                stressLayer: [101, 201, 301],
              },
              {
                point: "bottom",
                zGlobal: -0.015,
                zLocal: -0.015,
                strainShell: [0, 0, 0],
                stressShell: [12, 22, 32],
                strainLayer: [0, 0, 0],
                stressLayer: [102, 202, 302],
              },
            ],
          },
        ],
      ],
    ]);

    const shell = extractInPlaneStressField(profiles, 0, "mid", "sigmaX");
    const layer = extractInPlaneStressField(profiles, 0, "mid", "sigma1");

    expect(shell.get(5)).toEqual([11, 11, 11]);
    expect(layer.get(5)).toEqual([101, 101, 101]);
  });

  test("extracts transverse shell and layer components as element scalar fields", () => {
    const profiles = new Map<number, LayerTransverseStressProfile[]>([
      [
        3,
        [
          {
            layerIndex: 0,
            thetaDeg: 0,
            thickness: 0.04,
            zTop: 0.02,
            zBot: -0.02,
            points: [
              {
                point: "top",
                zGlobal: 0.02,
                zLocal: 0.02,
                tauShell: [0, 0],
                tauLayer: [0, 0],
              },
              {
                point: "mid",
                zGlobal: 0,
                zLocal: 0,
                tauShell: [5, -6],
                tauLayer: [50, -60],
              },
              {
                point: "bottom",
                zGlobal: -0.02,
                zLocal: -0.02,
                tauShell: [0, 0],
                tauLayer: [0, 0],
              },
            ],
          },
        ],
      ],
    ]);

    const shell = extractTransverseStressField(profiles, 0, "mid", "tauYZ");
    const layer = extractTransverseStressField(profiles, 0, "mid", "tau23");

    expect(shell.get(3)).toEqual([-6, -6, -6]);
    expect(layer.get(3)).toEqual([-60, -60, -60]);
  });

  test("computes extrema for element scalar fields", () => {
    const field = new Map<number, [number, number, number]>([
      [0, [-2, 3, -1]],
      [1, [5, -7, 4]],
    ]);
    const ex = getFieldExtrema(field);

    expect(ex.min).toBe(-7);
    expect(ex.max).toBe(5);
    expect(ex.maxAbs).toBe(7);
  });
});
