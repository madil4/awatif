import { AnalyzeOutputs, Element, Node } from "../../data-model";
import { getOneWaySectionMetrics } from "../benchmark/oneWay";

describe("one-way benchmark helpers", () => {
  test("extracts shear, bending, and deflection metrics", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [2, 0, 0],
      [2, 1, 0],
      [0, 1, 0],
    ];
    const elements: Element[] = [
      [0, 1, 3],
      [1, 2, 3],
    ];
    const analyzeOutputs: AnalyzeOutputs = {
      bendingXX: new Map([
        [0, [10, 10, 10]],
        [1, [10, 10, 10]],
      ]),
    };
    const deformations = new Map<number, [number, number, number, number, number, number]>([
      [0, [0, 0, 0, 0, 0, 0]],
      [1, [0, 0, -0.003, 0, 0, 0]],
      [2, [0, 0, -0.004, 0, 0, 0]],
      [3, [0, 0, -0.002, 0, 0, 0]],
    ]);
    const reactions = new Map<number, [number, number, number, number, number, number]>([
      [0, [0, 0, 6, 0, 0, 0]],
      [3, [0, 0, 4, 0, 0, 0]],
    ]);

    const metrics = getOneWaySectionMetrics(
      nodes,
      elements,
      analyzeOutputs,
      deformations,
      reactions,
      { slabWidth: 1, xMin: 0, xMax: 2, supportX: 0 },
    );

    expect(metrics.specificSupportShearKnPerM).toBeCloseTo(10);
    expect(metrics.maxSpecificBendingMomentKnmPerM).toBeCloseTo(10);
    expect(metrics.maxDownwardDeflectionMm).toBeCloseTo(4);
  });
});
