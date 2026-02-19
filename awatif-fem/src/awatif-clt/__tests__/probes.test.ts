import { Element, Node } from "../../data-model";
import { LayerInPlaneStressProfile } from "../stress/inPlane";
import { LayerTransverseStressProfile } from "../stress/transverse";
import {
  findClosestElementByCentroid,
  sampleClosestInPlaneStressMpa,
  sampleClosestTransverseStressMpa,
} from "../stress/probes";

describe("CLT stress probes", () => {
  test("findClosestElementByCentroid supports weighted search", () => {
    const { nodes, elements } = makeWeightedSearchMesh();
    const target: [number, number] = [0.8, 0.8];

    const nearestXWeighted = findClosestElementByCentroid(nodes, elements, target, {
      search: { weightX: 10, weightY: 1 },
    });
    const nearestYWeighted = findClosestElementByCentroid(nodes, elements, target, {
      search: { weightX: 1, weightY: 10 },
    });

    expect(nearestXWeighted).toBe(1);
    expect(nearestYWeighted).toBe(0);
  });

  test("samples closest in-plane stress in MPa", () => {
    const { nodes, elements } = makeMesh();

    const profiles: Map<number, LayerInPlaneStressProfile[]> = new Map([
      [0, [
        {
          layerIndex: 0,
          thetaDeg: 0,
          thickness: 0.1,
          zTop: 0.05,
          zBot: -0.05,
          points: [
            { point: "top", zGlobal: 0.05, zLocal: 0.05, strainShell: [0, 0, 0], stressShell: [2500, 0, 0], strainLayer: [0, 0, 0], stressLayer: [3200, 50, 10] },
            { point: "mid", zGlobal: 0, zLocal: 0, strainShell: [0, 0, 0], stressShell: [2000, 0, 0], strainLayer: [0, 0, 0], stressLayer: [2600, 40, 8] },
            { point: "bottom", zGlobal: -0.05, zLocal: -0.05, strainShell: [0, 0, 0], stressShell: [1500, 0, 0], strainLayer: [0, 0, 0], stressLayer: [2100, 30, 6] },
          ],
        },
      ]],
    ]);

    const sigmaTopMpa = sampleClosestInPlaneStressMpa(
      nodes,
      elements,
      profiles,
      [0.1, 0.1],
      0,
      "top",
      "sigmaX",
    );

    expect(sigmaTopMpa).toBeCloseTo(2.5, 12);

    const sigma1TopMpa = sampleClosestInPlaneStressMpa(
      nodes,
      elements,
      profiles,
      [0.1, 0.1],
      0,
      "top",
      "sigma1",
    );
    expect(sigma1TopMpa).toBeCloseTo(3.2, 12);
  });

  test("samples closest transverse stress in MPa", () => {
    const { nodes, elements } = makeMesh();

    const profiles: Map<number, LayerTransverseStressProfile[]> = new Map([
      [1, [
        {
          layerIndex: 0,
          thetaDeg: 0,
          thickness: 0.1,
          zTop: 0.05,
          zBot: -0.05,
          points: [
            { point: "top", zGlobal: 0.05, zLocal: 0.05, tauShell: [0, 0], tauLayer: [0, 0] },
            { point: "mid", zGlobal: 0, zLocal: 0, tauShell: [80, 120], tauLayer: [95, 140] },
            { point: "bottom", zGlobal: -0.05, zLocal: -0.05, tauShell: [0, 0], tauLayer: [0, 0] },
          ],
        },
      ]],
    ]);

    const tauMpa = sampleClosestTransverseStressMpa(
      nodes,
      elements,
      profiles,
      [1.8, 1.5],
      0,
      "mid",
      "tauYZ",
    );

    expect(tauMpa).toBeCloseTo(0.12, 12);

    const tau23Mpa = sampleClosestTransverseStressMpa(
      nodes,
      elements,
      profiles,
      [1.8, 1.5],
      0,
      "mid",
      "tau23",
    );
    expect(tau23Mpa).toBeCloseTo(0.14, 12);
  });
});

function makeMesh(): { nodes: Node[]; elements: Element[] } {
  const nodes: Node[] = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [2, 1, 0],
    [1, 2, 0],
    [2, 2, 0],
  ];

  const elements: Element[] = [
    [0, 1, 2],
    [3, 4, 5],
  ];

  return { nodes, elements };
}

function makeWeightedSearchMesh(): { nodes: Node[]; elements: Element[] } {
  const nodes: Node[] = [
    [0.0, 0.9, 0],
    [0.3, 1.1, 0],
    [0.0, 1.0, 0],
    [0.9, 0.0, 0],
    [1.1, 0.3, 0],
    [1.0, 0.0, 0],
  ];

  const elements: Element[] = [
    [0, 1, 2], // centroid ~= [0.1, 1.0]
    [3, 4, 5], // centroid ~= [1.0, 0.1]
  ];

  return { nodes, elements };
}
