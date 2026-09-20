import type { AppConfig } from "../data-model";

// The showcase model: a meshed line member next to a meshed shell panel, with
// three load cases combined into two ULS combinations
export const demo: AppConfig = {
  points: [
    [3.5, 0, 2],
    [3.5, 0, 8],
    [5.5, 0, 2],
    [6.5, 0, 2],
    [6.5, 0, 8],
    [5.5, 0, 8],
  ],
  lines: [[1, 2]],
  polygons: [[3, 4, 5, 6]],

  loadCases: ["Dead", "Live", "Wind"],
  loadCombinations: [
    { name: "ULS-1", factors: { Dead: 1.35, Live: 1.5, Wind: 0.9 } },
    { name: "ULS-2", factors: { Dead: 1.35, Live: 1.05, Wind: 1.5 } },
  ],

  loads: [
    {
      name: "Column Load",
      templateId: "point-load",
      geometry: [2],
      params: { Fx: 800, Fy: 0, Fz: -4000, Mx: 0, My: 0, Mz: 0 },
      loadCase: "Dead",
    },
    {
      name: "Wall Load",
      templateId: "point-load",
      geometry: [6],
      params: { Fx: 4000, Fy: 0, Fz: -4000, Mx: 0, My: 0, Mz: 0 },
      loadCase: "Dead",
    },
  ],

  supports: [
    {
      name: "Fixed Support",
      templateId: "point-support",
      geometry: [1, 3, 4],
      params: { type: "fixed" },
    },
  ],

  mesh: [
    {
      name: "Line Mesh",
      templateId: "line-mesh",
      geometry: [1],
      params: { divisions: 8 },
    },
    {
      name: "Triangle Mesh",
      templateId: "triangle-mesh",
      geometry: [1], // polygon id
      params: { maxTriangleArea: 0.25 },
    },
  ],

  design: [
    {
      name: "Concrete Frame",
      templateId: "concrete-member",
      geometry: [1],
    },
    {
      name: "Generic Shell",
      templateId: "generic-shell",
      geometry: [1], // polygon id
    },
  ],
};
