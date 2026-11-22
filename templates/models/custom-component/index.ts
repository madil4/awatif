import { ComponentsType, definePlugin } from "@awatif/components";
import type { AppConfig } from "../../data-model";
import { snowLoad } from "./snowLoad";

// What a third-party package exports: a name and its templates, keyed by
// component type. Published as `awatif-plugin-snow`, this file would be the
// package entry point — nothing here imports from the core library except
// its public API.
export const snowPlugin = definePlugin({
  name: "awatif-plugin-snow",
  templates: {
    // Template ids are global, so they carry the plugin's namespace
    [ComponentsType.LOADS]: { "snow:snow-load": snowLoad },
  },
});

// An 8 m duopitch portal frame at 5 m centres, with the snow on the rafters
// coming from the plugin rather than the built-in components
export const customComponent: AppConfig = {
  points: [
    [0, 0, 0], // 1 base left
    [0, 0, 4], // 2 eaves left
    [4, 0, 5.5], // 3 apex
    [8, 0, 4], // 4 eaves right
    [8, 0, 0], // 5 base right
  ],
  lines: [
    [1, 2], // left column
    [2, 3], // left rafter
    [3, 4], // right rafter
    [4, 5], // right column
  ],

  plugins: [snowPlugin],

  loadCases: ["Dead", "Snow"],
  loadCombinations: [
    { name: "ULS", factors: { Dead: 1.35, Snow: 1.5 } },
  ],

  supports: [
    {
      name: "Pinned Bases",
      templateId: "point-support",
      geometry: [1, 5],
      params: { type: "pinned" },
    },
  ],

  loads: [
    {
      name: "Roof Self Weight",
      templateId: "distributed-load",
      geometry: [2, 3],
      params: { w: -3, direction: "global-z" },
      loadCase: "Dead",
    },
    {
      // Referenced exactly like a built-in load, ids and params included
      name: "Snow on Rafters",
      templateId: "snow:snow-load",
      geometry: [2, 3],
      params: { sk: 0.9, pitch: 21, spacing: 5, Ce: 1, Ct: 1 },
      loadCase: "Snow",
    },
  ],

  mesh: [
    {
      name: "Frame Mesh",
      templateId: "line-mesh",
      geometry: [1, 2, 3, 4],
      params: { divisions: 8 },
    },
  ],

  design: [
    {
      name: "Steel Frame",
      templateId: "steel-member",
      geometry: [1, 2, 3, 4],
      params: { profile: "IPE 300", steelGrade: "S235" },
    },
  ],

  display: { activeLoadCase: "Snow" },
};
