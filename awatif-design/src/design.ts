import {
  AnalysisOutputs,
  Node,
  Element,
  AnalysisInput,
} from "awatif-data-structure";
import {
  ConnectionTimberDesignerInput,
  ConnectionTimberDesignerOutput,
} from "./ec/timber/connectionTimberDesign/connectionTimberDesign";
import {
  FrameTimberDesignInput,
  FrameTimberDesignOutput,
} from "./ec/timber/frameTimberDesign";

export type DesignInput =
  | FrameTimberDesignInput
  | ConnectionTimberDesignerInput;
export type DesignOutput =
  | FrameTimberDesignOutput
  | ConnectionTimberDesignerOutput;

// Todo: improve the typing of designFunctions
export function design(
  // @ts-ignore
  nodes: Node[], // needed in the design?
  // @ts-ignore
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
        // @ts-ignore
        const element = designInput.element;
        // @ts-ignore
        const node = designInput.node;

        if (element != undefined) {
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

        if (node != undefined) {
          designOutputs.push(
            designFunction(
              nodes,
              elements,
              analysisInputs,
              analysisOutputs,
              designInput
            )
          );
        }
      }
    });
  });

  return designOutputs;
}
