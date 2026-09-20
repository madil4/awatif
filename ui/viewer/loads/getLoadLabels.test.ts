import { describe, expect, it } from "vitest";
import {
  getLineLoadLabelsData,
  getPointLoadLabelsData,
} from "./getLoadLabels";

// A plugin template: the numbers the viewer shows have to come out of
// `getLoad`, since nothing else knows what a custom load means
const pressureLoad = {
  name: "Pressure",
  geometryKind: "line" as const,
  defaultParams: { pressure: 2, spacing: 3 },
  getLoad: ({ params }: any) => ({
    load: [0, 0, -params.pressure * params.spacing, 0, 0, 0],
    coordinateSystem: "global" as const,
  }),
};

describe("getPointLoadLabelsData", () => {
  const pointLoad = {
    geometryKind: "point" as const,
    getLoad: ({ params }: any) => ({
      load: [params.Fx, 0, params.Fz, 0, 0, params.Mz ?? 0],
    }),
  };

  it("labels every non-zero component along the axis it acts on", () => {
    const labels = getPointLoadLabelsData({
      template: pointLoad,
      params: { Fx: 10, Fz: -4.567, Mz: 5 },
      position: [1, 2, 3],
      displayScale: 2,
    });

    expect(labels.map((l) => l.text)).toEqual([
      "FX: 10 kN",
      "FZ: 4.57 kN",
      "MZ: 5 kNm",
    ]);
    // Along +X for the positive force, -Z for the negative one
    expect(labels[0].position).toEqual([1 + 1.7, 2, 3]);
    expect(labels[1].position).toEqual([1, 2, 3 - 1.7]);
  });

  it("says nothing about a load with no components", () => {
    expect(
      getPointLoadLabelsData({
        template: pointLoad,
        params: { Fx: 0, Fz: 0 },
        position: [0, 0, 0],
        displayScale: 1,
      }),
    ).toEqual([]);
  });

  it("prefers the template's own wording", () => {
    const labels = getPointLoadLabelsData({
      template: { ...pointLoad, getLabel: () => "Crane: 10 kN" },
      params: { Fx: 10, Fz: 0 },
      position: [0, 0, 0],
      displayScale: 1,
    });

    expect(labels.map((l) => l.text)).toEqual(["Crane: 10 kN"]);
  });
});

describe("getLineLoadLabelsData", () => {
  it("labels a plugin's load from getLoad alone", () => {
    const labels = getLineLoadLabelsData({
      template: pressureLoad,
      params: pressureLoad.defaultParams,
      startPosition: [0, 0, 0],
      endPosition: [4, 0, 0],
      displayScale: 1,
    });

    expect(labels.map((l) => l.text)).toEqual(["6 kN/m (Global Z)"]);
    // Midspan, on the side the load pushes towards
    expect(labels[0].position).toEqual([2, 0, -0.45]);
  });

  it("names local components in the system the template declared", () => {
    const labels = getLineLoadLabelsData({
      template: {
        geometryKind: "line" as const,
        getLoad: () => ({ load: [0, 3, 0, 0, 0, 0] }),
      },
      params: {},
      startPosition: [0, 0, 0],
      endPosition: [2, 0, 0],
      displayScale: 1,
    });

    expect(labels.map((l) => l.text)).toEqual(["3 kN/m (Local Y)"]);
  });

  it("keeps the viewer rendering when a template throws", () => {
    expect(
      getLineLoadLabelsData({
        template: {
          geometryKind: "line" as const,
          getLoad: () => {
            throw new Error("bad params");
          },
        },
        params: {},
        startPosition: [0, 0, 0],
        endPosition: [1, 0, 0],
        displayScale: 1,
      }),
    ).toEqual([]);
  });
});
