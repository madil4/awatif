import {
  Configurator,
  Parameters,
  ParameterType,
} from "../../../src/interfaces";
import { Viewer } from "../../../src/ui/viewer";
import { modeling } from "./modeling";

const viewer = new Viewer({ visible: false, sections: true });

const parameters: Parameters = {
  width: {
    type: ParameterType.slider,
    value: 12,
    step: 2,
    min: 10,
    max: 20,
  },
  breadth: {
    type: ParameterType.slider,
    value: 12,
    step: 2,
    min: 10,
    max: 20,
  },
  height: {
    type: ParameterType.slider,
    value: 20,
    step: 2,
    min: 10,
    max: 20,
  },
  xSpan: {
    type: ParameterType.slider,
    value: 6,
    step: 2,
    min: 2,
    max: 20,
  },
  ySpan: {
    type: ParameterType.slider,
    value: 12,
    step: 2,
    min: 2,
    max: 20,
  },
  zSpan: {
    type: ParameterType.slider,
    value: 4,
    step: 2,
    min: 2,
    max: 20,
  },
  spacing: {
    type: ParameterType.slider,
    value: 0.5,
    step: 0.5,
    min: 0.5,
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
