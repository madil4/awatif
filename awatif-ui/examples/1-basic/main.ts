import { app, Assignment, Element, Node, PropertyAssignment } from "../../src/";
import { analyze } from "../../../awatif-fem/";

function onParameterChange() {
  const nodes: Node[] = [
    [0, 0, 0],
    [0, 0, 500],
    [500, 0, 500],
    [500, 0, 0],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
    [2, 3],
  ];

  const beamProperty: PropertyAssignment = {
    element: 0,
    area: 10,
    elasticity: 10,
    momentOfInertiaY: 10,
    momentOfInertiaZ: 10,
    shearModulus: 10,
    torsionalConstant: 10,
  };
  const assignments: Assignment[] = [
    { node: 0, support: [true, true, true, true, true, true] },
    { node: 3, support: [true, true, true, true, true, true] },
    { node: 2, load: [3e-3, 0, 0, 0, 0, 0] },
    { ...beamProperty, element: 0 },
    { ...beamProperty, element: 1 },
    { ...beamProperty, element: 2 },
  ];

  const analysisResults = analyze(nodes, elements, assignments);

  return { nodes, elements, assignments, analysisResults };
}

app({
  onParameterChange,
  settings: { gridSize: 1000 },
});
