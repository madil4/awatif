import {
  AnalysisOutputs,
  Node,
  Element,
  AnalysisInput,
  AnalysisOutput,
} from "../../awatif-data-structure/src";
import {
  FrameTimberDesignInput,
  FrameTimberDesignOutput,
} from "./ec/timber/frameTimberDesign";

export type DesignInput = FrameTimberDesignInput;
export type DesignOutput = FrameTimberDesignOutput;

export type DesignFunction = (
  analysisInput: AnalysisInput,
  analysisOutput: AnalysisOutput,
  designInput: DesignInput
) => DesignOutput;

export function design(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInput[],
  analysisOutputs: AnalysisOutputs,
  designInputs: DesignInput[],
  designFunctions: DesignFunction[]
): DesignOutput[] {
  const designOutputs: DesignOutput[] = [];

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
