import { exportToJSON } from "./exportToJSON";
import { ExportOptions } from "./export.types";

describe("exportToJson", () => {
  const nodes = [
    [0, 0, 0],
    [5, 0, 0],
    [0, 0, 5],
  ];
  const elements = [
    [0, 1],
    [1, 2],
  ];
  const assignments = [
    {
      node: 0,
      support: [true, true, true],
    },
    {
      node: 1,
      support: [true, false, false],
    },
    {
      node: 1,
      load: [0, 0, -10],
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200,
    },
  ];
  const analysisResults = [
    {
      node: 1,
      deformation: [-0.2083, 0, -0.7976],
    },
    {
      element: 1,
      normal: [14.1421, 14.1421],
    },
  ];
  let exportOptions: ExportOptions;

  beforeEach(() => {
    exportOptions = {
      nodes: false,
      elements: false,
      supports: false,
      loads: false,
      properties: false,
      analysisResults: false,
    };
  });

  it("should export nodes", () => {
    exportOptions.nodes = true;

    const output = exportToJSON(
      nodes,
      elements,
      assignments,
      analysisResults,
      exportOptions
    );

    expect(output).toBe(`{"nodes":[[0,0,0],[5,0,0],[0,0,5]]}`);
  });

  it("should export elements", () => {
    exportOptions.elements = true;

    const output = exportToJSON(
      nodes,
      elements,
      assignments,
      analysisResults,
      exportOptions
    );

    expect(output).toBe(`{"elements":[[0,1],[1,2]]}`);
  });

  it("should export supports", () => {
    exportOptions.supports = true;

    const output = exportToJSON(
      nodes,
      elements,
      assignments,
      analysisResults,
      exportOptions
    );

    expect(output).toBe(
      `{"assignments":[{"node":0,"support":[true,true,true]},{"node":1,"support":[true,false,false]}]}`
    );
  });

  it("should export loads", () => {
    exportOptions.loads = true;

    const output = exportToJSON(
      nodes,
      elements,
      assignments,
      analysisResults,
      exportOptions
    );

    expect(output).toBe(`{"assignments":[{"node":1,"load":[0,0,-10]}]}`);
  });

  it("should export properties", () => {
    exportOptions.properties = true;

    const output = exportToJSON(
      nodes,
      elements,
      assignments,
      analysisResults,
      exportOptions
    );

    expect(output).toBe(
      `{"assignments":[{"element":0,"area":1.2,"elasticity":200}]}`
    );
  });

  it("should export analysis results", () => {
    exportOptions.analysisResults = true;

    const output = exportToJSON(
      nodes,
      elements,
      assignments,
      analysisResults,
      exportOptions
    );

    expect(output).toBe(
      `{"analysisResults":[{"node":1,"deformation":[-0.2083,0,-0.7976]},{"element":1,"normal":[14.1421,14.1421]}]}`
    );
  });

  it("should export all parts", () => {
    exportOptions = {
      nodes: true,
      elements: true,
      supports: true,
      loads: true,
      properties: true,
      analysisResults: true,
    };

    const output = exportToJSON(
      nodes,
      elements,
      assignments,
      analysisResults,
      exportOptions
    );

    expect(output).toBe(
      `{"nodes":[[0,0,0],[5,0,0],[0,0,5]],"elements":[[0,1],[1,2]],` +
        `"assignments":[{"node":0,"support":[true,true,true]},{"node":1,"support":[true,false,false]},` +
        `{"node":1,"load":[0,0,-10]},{"element":0,"area":1.2,"elasticity":200}],` +
        `"analysisResults":[{"node":1,"deformation":[-0.2083,0,-0.7976]},{"element":1,"normal":[14.1421,14.1421]}]}`
    );
  });
});
