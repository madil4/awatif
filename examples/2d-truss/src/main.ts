import { analyzing } from "../../../src/algorithms/analyzing";
import { ParameterType, State } from "../../../src/interfaces";
import { Configurator } from "../../../src/ui/configurator";
import { Viewer } from "../../../src/ui/viewer";
import { modeling } from "./modeling";

const viewer = new Viewer({
  supports: true,
  deformed: true,
  results: "deformationY",
});
const state: State = {};

state.parameters = {
  span: {
    type: ParameterType.slider,
    value: 25,
    min: 10,
    max: 40,
    step: 1,
    label: "span (m)",
  },
  divisions: {
    type: ParameterType.slider,
    value: 6,
    min: 2,
    max: 10,
    step: 1,
  },
  height: {
    type: ParameterType.slider,
    value: 3.5,
    min: 0.1,
    max: 7,
    step: 0.1,
    label: "height (m)",
  },
  elasticity: {
    type: ParameterType.slider,
    value: 25,
    min: 1,
    max: 250,
    step: 1,
    label: "Elasticity (GPA)",
  },
  area: {
    type: ParameterType.slider,
    value: 25,
    min: 1,
    max: 300,
    step: 1,
    label: "area (cm2)",
  },
  load: {
    type: ParameterType.slider,
    value: 150,
    min: 0,
    max: 300,
    step: 1,
    label: "load (kN/m)",
  },
};

const configurator = new Configurator(state.parameters);

configurator.onChange(() => {
  state.model = modeling(state.parameters!);
  state.analysisResults = analyzing(state.model);

  viewer.update(state.model, state.analysisResults);
});
