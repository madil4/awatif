import { describe, expect, it } from "vitest";
import { ComponentsType } from "./data-model";
import { templates } from "./templates";
import { definePlugin, resolveTemplates } from "./plugins";

const windLoad = definePlugin({
  name: "awatif-plugin-wind",
  templates: {
    [ComponentsType.LOADS]: { "wind:area-load": { name: "Area Load" } },
  },
});

describe("resolveTemplates", () => {
  it("keeps the built-ins reachable", () => {
    const resolved = resolveTemplates([windLoad]);

    expect(resolved.get(ComponentsType.LOADS)?.get("point-load")).toBe(
      templates.get(ComponentsType.LOADS)?.get("point-load"),
    );
  });

  it("adds plugin templates alongside them", () => {
    const resolved = resolveTemplates([windLoad]);

    expect(resolved.get(ComponentsType.LOADS)?.get("wind:area-load")).toEqual({
      name: "Area Load",
    });
  });

  it("adds component types the built-ins do not have", () => {
    const resolved = resolveTemplates([
      definePlugin({
        name: "awatif-plugin-special",
        templates: {
          [ComponentsType.SPECIAL]: { "special:thing": { name: "Thing" } },
        },
      }),
    ]);

    expect(resolved.get(ComponentsType.SPECIAL)?.get("special:thing")).toEqual({
      name: "Thing",
    });
  });

  it("leaves the built-in registry untouched", () => {
    resolveTemplates([windLoad]);

    expect(templates.get(ComponentsType.LOADS)?.has("wind:area-load")).toBe(
      false,
    );
  });

  it("rejects a plugin that shadows a built-in", () => {
    const shadow = definePlugin({
      name: "awatif-plugin-shadow",
      templates: {
        [ComponentsType.LOADS]: { "point-load": { name: "Mine" } },
      },
    });

    expect(() => resolveTemplates([shadow])).toThrow(/awatif already defines/);
  });

  it("rejects two plugins claiming the same id", () => {
    const other = definePlugin({
      name: "awatif-plugin-other",
      templates: {
        [ComponentsType.LOADS]: { "wind:area-load": { name: "Theirs" } },
      },
    });

    expect(() => resolveTemplates([windLoad, other])).toThrow(
      /"awatif-plugin-wind" already defines/,
    );
  });
});
