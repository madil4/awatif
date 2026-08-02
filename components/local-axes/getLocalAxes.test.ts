import { describe, test, expect } from "vitest";
import { ComponentsType, ElementProps, Mesh } from "../data-model";
import { templates } from "../templates";
import { getLocalAxes, getLocalAxesByLine } from "./getLocalAxes";
import { applyLocalAxesToForces, applyLocalAxesToProps } from "./applyLocalAxes";

// ── Helpers ──────────────────────────────────────────────────────────
function getComponents(
  entries: { geometry: number[]; angle?: 0 | 90 }[],
): Map<ComponentsType, any[]> {
  return new Map([
    [
      ComponentsType.LOCAL_AXES,
      entries.map((e, i) => ({
        name: `Local Axes ${i}`,
        templateId: "local-axes",
        geometry: e.geometry,
        ...(e.angle === undefined ? {} : { params: { angle: e.angle } }),
      })),
    ],
  ]);
}

const props = (momentInertiaZ: number, momentInertiaY: number): ElementProps => ({
  elasticity: 210e6,
  area: 0.01,
  momentInertiaZ,
  momentInertiaY,
  shearModulus: 81e6,
  torsionalConstant: 1e-6,
});

const forces = (): NonNullable<
  ReturnType<Mesh["internalForces"]["val"]["get"]>
> => ({
  N: [1, 2],
  Vy: [3, 4],
  Vz: [5, 6],
  Mx: [7, 8],
  My: [9, 10],
  Mz: [11, 12],
});

// ── getLocalAxesByLine ───────────────────────────────────────────────
describe("getLocalAxesByLine", () => {
  test("records only rotated lines", () => {
    const result = getLocalAxesByLine({
      components: getComponents([
        { geometry: [1, 2], angle: 90 },
        { geometry: [3], angle: 0 },
      ]) as any,
      templates,
    });

    expect([...result.entries()]).toEqual([
      [1, 90],
      [2, 90],
    ]);
  });

  test("falls back to the template default when params are absent", () => {
    const result = getLocalAxesByLine({
      components: getComponents([{ geometry: [1] }]) as any,
      templates,
    });

    expect(result.size).toBe(0);
  });

  test("returns an empty map when there are no local-axes components", () => {
    const result = getLocalAxesByLine({
      components: new Map() as any,
      templates,
    });

    expect(result.size).toBe(0);
  });
});

// ── getLocalAxes ─────────────────────────────────────────────────────
describe("getLocalAxes", () => {
  test("expands line IDs to element indices", () => {
    const result = getLocalAxes({
      components: getComponents([{ geometry: [1, 2], angle: 90 }]) as any,
      geometryMapping: {
        lineToElements: new Map([
          [1, [0, 1, 2]],
          [2, [3]],
          [3, [4]],
        ]),
      },
      templates,
    });

    expect([...result.keys()].sort((a, b) => a - b)).toEqual([0, 1, 2, 3]);
    expect(result.get(0)).toBe(90);
  });

  test("ignores lines that were never meshed", () => {
    const result = getLocalAxes({
      components: getComponents([{ geometry: [9], angle: 90 }]) as any,
      geometryMapping: { lineToElements: new Map([[1, [0]]]) },
      templates,
    });

    expect(result.size).toBe(0);
  });
});

// ── applyLocalAxesToProps ────────────────────────────────────────────
describe("applyLocalAxesToProps", () => {
  test("swaps Iz/Iy only for rotated elements", () => {
    const elementsProps = new Map([
      [0, props(100, 5)],
      [1, props(100, 5)],
    ]);

    const result = applyLocalAxesToProps(
      elementsProps,
      new Map([[0, 90 as const]]),
    );

    expect(result.get(0)?.momentInertiaZ).toBe(5);
    expect(result.get(0)?.momentInertiaY).toBe(100);
    expect(result.get(1)?.momentInertiaZ).toBe(100);
    expect(result.get(1)?.momentInertiaY).toBe(5);
  });

  test("leaves every other property untouched", () => {
    const original = props(100, 5);
    const result = applyLocalAxesToProps(
      new Map([[0, original]]),
      new Map([[0, 90 as const]]),
    );

    expect(result.get(0)).toEqual({
      ...original,
      momentInertiaZ: 5,
      momentInertiaY: 100,
    });
  });

  test("does not mutate the shared ElementProps reference", () => {
    // getElementsProps assigns the same object to every element of a line
    const shared = props(100, 5);
    const elementsProps = new Map([
      [0, shared],
      [1, shared],
    ]);

    applyLocalAxesToProps(elementsProps, new Map([[0, 90 as const]]));

    expect(shared.momentInertiaZ).toBe(100);
    expect(shared.momentInertiaY).toBe(5);
    expect(elementsProps.get(1)).toBe(shared);
  });

  test("returns the input map when nothing is rotated", () => {
    const elementsProps = new Map([[0, props(100, 5)]]);

    expect(applyLocalAxesToProps(elementsProps, new Map())).toBe(elementsProps);
  });
});

// ── applyLocalAxesToForces ───────────────────────────────────────────
describe("applyLocalAxesToForces", () => {
  test("re-expresses forces in the section frame (y' = z, z' = -y)", () => {
    const internalForces = new Map([[0, forces()]]);

    const result = applyLocalAxesToForces(
      internalForces,
      new Map([[0, 90 as const]]),
    );

    expect(result.get(0)).toEqual({
      N: [1, 2],
      Mx: [7, 8],
      Vy: [5, 6],
      Vz: [-3, -4],
      My: [11, 12],
      Mz: [-9, -10],
    });
  });

  test("leaves unrotated elements alone", () => {
    const unrotated = forces();
    const result = applyLocalAxesToForces(
      new Map([
        [0, forces()],
        [1, unrotated],
      ]),
      new Map([[0, 90 as const]]),
    );

    expect(result.get(1)).toBe(unrotated);
  });

  test("applied twice is a 180° rotation", () => {
    const localAxes = new Map([[0, 90 as const]]);
    const once = applyLocalAxesToForces(new Map([[0, forces()]]), localAxes);
    const twice = applyLocalAxesToForces(once, localAxes);

    expect(twice.get(0)).toEqual({
      N: [1, 2],
      Mx: [7, 8],
      Vy: [-3, -4],
      Vz: [-5, -6],
      My: [-9, -10],
      Mz: [-11, -12],
    });
  });

  test("returns the input map when nothing is rotated", () => {
    const internalForces = new Map([[0, forces()]]);

    expect(applyLocalAxesToForces(internalForces, new Map())).toBe(
      internalForces,
    );
  });
});
