import type { AppConfig } from "../data-model";

// A 5 m x 4 m slab panel in the XY work plane, meshed into shell elements and
// pinned along its corners
export const flatSlab: AppConfig = {
  points: [
    [0, 0, 0],
    [5, 0, 0],
    [5, 4, 0],
    [0, 4, 0],
  ],
  polygons: [[1, 2, 3, 4]],

  loadCases: ["Dead"],

  supports: [
    {
      name: "Corner Supports",
      templateId: "point-support",
      geometry: [1, 2, 3, 4],
      params: { type: "pinned" },
    },
  ],

  mesh: [
    {
      name: "Slab Mesh",
      templateId: "triangle-mesh",
      geometry: [1], // polygon id
      params: { maxTriangleArea: 0.25 },
    },
  ],

  design: [
    {
      name: "Slab Shell",
      templateId: "generic-shell",
      geometry: [1], // polygon id
    },
  ],

  display: { workPlane: "XY", view2D: false },
};
