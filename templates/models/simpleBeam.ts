import type { AppConfig } from "../data-model";

// A 6 m simply supported beam with a mid-span point load
export const simpleBeam: AppConfig = {
  points: [
    [0, 0, 0],
    [3, 0, 0],
    [6, 0, 0],
  ],
  lines: [
    [1, 2],
    [2, 3],
  ],

  loadCases: ["Dead", "Live"],
  loadCombinations: [
    { name: "ULS", factors: { Dead: 1.35, Live: 1.5 } },
    { name: "SLS", factors: { Dead: 1, Live: 1 } },
  ],

  supports: [
    {
      name: "Pinned",
      templateId: "point-support",
      geometry: [1],
      params: { type: "pinned" },
    },
    {
      name: "Roller",
      templateId: "point-support",
      geometry: [3],
      params: { type: "x-roller" },
    },
  ],

  loads: [
    {
      name: "Mid-span Load",
      templateId: "point-load",
      geometry: [2],
      params: { Fx: 0, Fy: 0, Fz: -50, Mx: 0, My: 0, Mz: 0 },
      loadCase: "Live",
    },
  ],

  mesh: [
    {
      name: "Beam Mesh",
      templateId: "line-mesh",
      geometry: [1, 2],
      params: { divisions: 8 },
    },
  ],

  design: [
    {
      name: "Concrete Beam",
      templateId: "concrete-member",
      geometry: [1, 2],
    },
  ],
};
