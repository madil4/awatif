import {
  Configurator,
  Parameters,
  ParameterType,
} from "../../../src/interfaces";
import { Viewer } from "../../../src/ui/viewer";
import { modeling } from "./modeling";

const viewer = new Viewer({ visible: false, points: false });

const parameters: Parameters = {
  width: {
    type: ParameterType.slider,
    value: 10,
    step: 1,
    min: 10,
    max: 25,
  },
  breadth: {
    type: ParameterType.slider,
    value: 10,
    step: 1,
    min: 10,
    max: 25,
  },
  height: {
    type: ParameterType.slider,
    value: 25,
    step: 1,
    min: 10,
    max: 25,
  },
  xSpan: {
    type: ParameterType.slider,
    value: 5,
    step: 1,
    min: 1,
    max: 25,
  },
  ySpan: {
    type: ParameterType.slider,
    value: 10,
    step: 1,
    min: 1,
    max: 25,
  },
  zSpan: {
    type: ParameterType.slider,
    value: 5,
    step: 1,
    min: 2,
    max: 25,
  },
  spacing: {
    type: ParameterType.slider,
    value: 0.5,
    step: 0.2,
    min: 0.2,
    max: 5,
  },
  mainDirX: {
    type: ParameterType.toggle,
    value: true,
    label: "toggle direction",
  },
};

const configurator = new Configurator(parameters);

configurator.onChange(() => {
  const model = modeling(parameters!);
  viewer.update(model);
});
