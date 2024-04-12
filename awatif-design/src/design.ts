import {
  AnalysisOutputs,
  Node,
  Element,
  AnalysisInput,
} from "../../awatif-data-structure/src";
import {
  FrameTimberDesignInput,
  FrameTimberDesignOutput,
} from "./ec/timber/frameTimberDesign";

type DesignInput = FrameTimberDesignInput;
type DesignOutput = FrameTimberDesignOutput;

// Todo: improve the typing of designFunctions
export function design(
  nodes: Node[], // needed in the design?
  elements: Element[], // needed in the design?
  analysisInputs: AnalysisInput[],
  analysisOutputs: AnalysisOutputs,
  designInputs: DesignInput[],
  designFunctions: Function[]
): DesignOutput[] {
  const designOutputs: DesignOutput[] = [];

  // Todo: optimize these loops
  designFunctions.forEach((designFunction) => {
    designInputs.forEach((designInput) => {
      if (designFunction.name in designInput) {
        const element = designInput.element;
        const analysisInput = analysisInputs.find(
          (i) => (i as any).element == element
        );
        const analysisOutput = analysisOutputs["default"].find(
          (i) => (i as any).element == element
        );

        if (analysisInput && analysisOutput) {
          designOutputs.push(
            designFunction(analysisInput, analysisOutput, designInput)
          );
        }
      }
    });
  });

  return designOutputs;
}
