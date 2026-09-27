import { describe, expect, it } from "vitest";
import { ComponentsType, type ComponentEntry } from "../data-model";
import { getGridOrdinates } from "./getGridOrdinates";

const line = (id: string, ordinate: number, visible = true) => ({
  id,
  ordinate,
  visible,
  bubble: "end" as const,
});

const system = (params: object): ComponentEntry => ({
  name: "Grid",
  templateId: "grid-system",
  geometry: [],
  params,
});

const get = (...entries: ComponentEntry[]) =>
  getGridOrdinates(new Map([[ComponentsType.GRID_LINES, entries]]));

describe("getGridOrdinates", () => {
  it("is empty without grid systems", () => {
    expect(getGridOrdinates(new Map())).toEqual({ x: [], y: [], z: [] });
  });

  it("sorts by ordinate", () => {
    const { x } = get(system({ x: [line("B", 5), line("A", 0)] }));

    expect(x.map((l) => l.id)).toEqual(["A", "B"]);
  });

  it("drops hidden lines", () => {
    const { y } = get(system({ y: [line("1", 0), line("2", 3, false)] }));

    expect(y.map((l) => l.id)).toEqual(["1"]);
  });

  it("merges systems and collapses equal ordinates", () => {
    const { x } = get(
      system({ x: [line("A", 0), line("B", 5)] }),
      system({ x: [line("C", 5), line("D", 8)] }),
    );

    expect(x.map((l) => l.id)).toEqual(["A", "B", "D"]);
  });
});
