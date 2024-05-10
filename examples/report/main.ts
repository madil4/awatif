import {
  app,
  Node,
  Element,
  AnalysisInput,
  Input,
  Parameters,
  Model,
} from "../../awatif-ui/src";
import { analyze } from "../../awatif-fem";
import { design } from "../../awatif-design";
import {
  frameTimberDesign,
  frameTimberDesignReport,
  FrameTimberDesignInput,
  connectionTimberDesignReport,
} from "../../awatif-design/src/ec/timber/";
import {
  ConnectionTimberDesignerInput,
  connectionTimberDesign,
} from "../../awatif-design/src/ec/timber/";
import { DesignInput } from "../../awatif-design/src/design";
import { setup3DCube } from "../../awatif-design/src/ec/timber/connectionTimberDesign/utils/threejs3d";
// import { setup2DBeams } from "../../awatif-design/src/ec/timber/connectionTimberDesign/utils/threejs2d";
import { setupNodesAndElements  } from "../../awatif-design/src/ec/timber/connectionTimberDesign/utils/threejsModel";
import { drawSpacings  } from "../../awatif-design/src/ec/timber/connectionTimberDesign/utils/threejsSpacing";


const parameters: Parameters = {
  xPosition: { value: 12, min: 1, max: 20 },
  zPosition: { value: 0, min: 1, max: 10 },
};

function onParameterChange(parameters: Parameters): Model {
  // FEM ANALYSIS
  const nodes: Node[] = [
    [5, 0, 0],
    [parameters.xPosition.value, 0, parameters.zPosition.value],
    [5, 0, 8],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
  ];

  document.addEventListener('DOMContentLoaded', () => setupNodesAndElements(nodes, elements));

  const analysisInputs: AnalysisInput[] = [
    {
      node: 0,
      support: [true, true, true],
    },
    {
      node: 2,
      support: [true, true, true],
    },
    {
      node: 1,
      load: [0, 0, -200],
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200,
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200,
    },
  ];

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  const frameTimberDesignInput: FrameTimberDesignInput["frameTimberDesign"] = {
    tensileStrengthParallel: 20,
    serviceClass: "1",
    loadDuration: "permanent",
    material: "Solid timber",
    gammaG: 1,
    gammaM: 1.3,
  };
  const timberBarNodeConnectionDesignerInput: ConnectionTimberDesignerInput["connectionTimberDesign"] =
    {
      serviceClass: 1,
      loadDurationClass: "permanent",
      beam: 2,
      timberGrade: "GL28h",
      width: 300,
      height: 600,
      axialForce: 200,
      fastenerGrade: "S235",
      fastenerDiameter: 8,
      sheetGrade: "S235",
      sheetThickness: 5,
      sheetNo: 2,
      beamAngle: 45,
    };

  const designInputs: DesignInput[] = [
    {
      element: 0,
      frameTimberDesign: frameTimberDesignInput,
    },
    {
      element: 1,
      frameTimberDesign: frameTimberDesignInput,
    },
    {
      node: 0,
      connectionTimberDesign: timberBarNodeConnectionDesignerInput,
    },
    {
      node: 1,
      connectionTimberDesign: timberBarNodeConnectionDesignerInput,
    },
    {
      node: 2,
      connectionTimberDesign: timberBarNodeConnectionDesignerInput,
    },
  ];

  // document.addEventListener('DOMContentLoaded', () => drawSpacings(nodes, elements, timberBarNodeConnectionDesignerInput, designOutputs));

  const designOutputs = design(
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    [frameTimberDesign, connectionTimberDesign]
  );
  console.log("designOutputs", designOutputs)
  let node = 1;
  let elementss = [1, 2, 3];
  let angles = [0, 45, 90]
  let heights = [300, 300, 300]
  let widths = [200, 200, 200]
  let sheetNumber = 1
  let sheetThickness = 5
  let fastenerPositionX = [320, 320, 320, 320, 320, 320, 320, 320, 360, 360 ]
  let fastenerPositionZ = [24, 50, 76, 102, 128, 154, 180, 206, 24, 50]
  document.addEventListener('DOMContentLoaded', () => setup3DCube(node, elementss, angles, heights, widths, sheetNumber, sheetThickness, fastenerPositionX, fastenerPositionZ));
  // document.addEventListener('DOMContentLoaded', initialize3DCanvas);


  return {
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    designOutputs,
  };
}

app({
  parameters,
  onParameterChange,
  reports: [frameTimberDesignReport, connectionTimberDesignReport],
});


