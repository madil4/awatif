import { x, a as app } from "./app-DFn3ZYI3.js";
import { a as analyze } from "./analyze-BdsS8fxq.js";
import { r as renderMath, a as connectionTimberDesignReport, d as design, f as frameTimberDesign, b as connectionTimberDesign } from "./connectionTimberDesignReport-RUFFEKWG.js";
import "./pureFunctionsAny.generated-DNSg1shC.js";
import "./three.module-G6cHRXNE.js";
function frameTimberDesignReport(designInput, designOutput) {
  const i = designInput.frameTimberDesign;
  const o = designOutput.frameTimberDesign;
  return x`
    <h2>Design for Tension of Element ${designInput.element}</h2>

    <h3>Axial stress in element</h3>
    <p>
      ${renderMath(`N = ${o.appliedForce.toFixed(3)}\\space KN`)} (from FEM
      analysis)
    </p>
    <p>
      ${renderMath(
    `\\sigma _{t0d} = \\frac{N}{A} = ${o.appliedStress.toFixed(
      3
    )} \\space MPa`
  )}
    </p>

    <h3>Axial stress capacity of element</h3>
    <p>${renderMath(`K_{modmed} = ${o.kmod.toFixed(1)}`)}</p>
    <p>
      ${renderMath(
    `f_{t0k} = ${i.tensileStrengthParallel.toFixed(3)} \\space MPa`
  )}
    </p>
    <p>${renderMath(`\\gamma_{m} = ${i.gammaM.toFixed(1)}`)}</p>
    <p>
      ${renderMath(
    `f_{t0d} = \\frac{k_{modmed} * f_{t0k}}{\\gamma_{m} } = ${o.capacityStress.toFixed(
      3
    )} \\space MPa`
  )}
    </p>

    <h3>Element verification</h3>
    <p>
      ${renderMath(
    `\\frac{\\sigma _{t0d}}{f_t0d} = ${o.utilizationRatio.toFixed(3)}`
  )}
    </p>
    <p>
      ${o.utilizationRatio > 1 ? "section is not sufficient" : "section is sufficient"}
    </p>
  `;
}
const parameters = {
  xPosition: { value: 12, min: 1, max: 20 },
  zPosition: { value: 0, min: 1, max: 10 }
};
function onParameterChange(parameters2) {
  const nodes = [
    [5, 0, 0],
    [parameters2.xPosition.value, 0, parameters2.zPosition.value],
    [5, 0, 8]
  ];
  const elements = [
    [0, 1],
    [1, 2]
  ];
  const analysisInputs = [
    {
      node: 0,
      support: [true, true, true]
    },
    {
      node: 2,
      support: [true, true, true]
    },
    {
      node: 1,
      load: [0, 0, -200]
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200
    }
  ];
  const analysisOutputs = analyze(nodes, elements, analysisInputs);
  const frameTimberDesignInput = {
    tensileStrengthParallel: 20,
    serviceClass: "1",
    loadDuration: "permanent",
    material: "Solid timber",
    gammaG: 1,
    gammaM: 1.3
  };
  const timberBarNodeConnectionDesignerInput = {
    serviceClass: 2,
    loadDurationClass: "permanent",
    element: 0,
    timberGrade: "GL28h",
    fastenerGrade: "S235",
    fastenerDiameter: 8,
    sheetGrade: "S235",
    sheetThickness: 5,
    sheetNo: 2
  };
  const designInputs = [
    {
      element: 0,
      frameTimberDesign: frameTimberDesignInput
    },
    {
      element: 1,
      frameTimberDesign: frameTimberDesignInput
    },
    {
      node: 0,
      connectionTimberDesign: timberBarNodeConnectionDesignerInput
    },
    {
      node: 1,
      connectionTimberDesign: timberBarNodeConnectionDesignerInput
    },
    {
      node: 2,
      connectionTimberDesign: timberBarNodeConnectionDesignerInput
    }
  ];
  const designOutputs = design(
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    [frameTimberDesign, connectionTimberDesign]
  );
  return {
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    designOutputs
  };
}
app({
  parameters,
  onParameterChange,
  reports: [frameTimberDesignReport, connectionTimberDesignReport]
});
