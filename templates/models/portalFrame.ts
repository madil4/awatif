import type { AppConfig } from "../data-model";

// A 6 m x 4 m portal frame in the XZ work plane, with dead, live and wind
// cases combined into two ULS combinations
export const portalFrame: AppConfig = {
  points: [
    [0, 0, 0], // 1 base left
    [0, 0, 4], // 2 eaves left
    [6, 0, 4], // 3 eaves right
    [6, 0, 0], // 4 base right
  ],
  lines: [
    [1, 2], // left column
    [2, 3], // beam
    [3, 4], // right column
  ],

  gridLines: [
    {
      name: "Frame Grid",
      templateId: "grid-system",
      geometry: [],
      params: {
        x: [
          { id: "A", ordinate: 0, visible: true, bubble: "end" },
          { id: "B", ordinate: 6, visible: true, bubble: "end" },
        ],
        y: [{ id: "1", ordinate: 0, visible: true, bubble: "start" }],
        z: [
          { id: "Z1", ordinate: 0, visible: true, bubble: "end" },
          { id: "Z2", ordinate: 4, visible: true, bubble: "end" },
        ],
      },
    },
  ],

  loadCases: ["Dead", "Live", "Wind"],
  loadCombinations: [
    { name: "ULS-1", factors: { Dead: 1.35, Live: 1.5, Wind: 0.9 } },
    { name: "ULS-2", factors: { Dead: 1.35, Live: 1.05, Wind: 1.5 } },
  ],

  supports: [
    {
      name: "Fixed Bases",
      templateId: "point-support",
      geometry: [1, 4],
      params: { type: "fixed" },
    },
  ],

  loads: [
    {
      name: "Roof Load",
      templateId: "distributed-load",
      geometry: [2],
      params: { w: 20, direction: "global-z" },
      loadCase: "Dead",
    },
    {
      name: "Wind Pressure",
      templateId: "distributed-load",
      geometry: [1],
      params: { w: 5, direction: "global-x" },
      loadCase: "Wind",
    },
  ],

  mesh: [
    {
      name: "Frame Mesh",
      templateId: "line-mesh",
      geometry: [1, 2, 3],
      params: { divisions: 8 },
    },
  ],

  design: [
    {
      name: "Concrete Frame",
      templateId: "concrete-member",
      geometry: [1, 2, 3],
    },
  ],
};
