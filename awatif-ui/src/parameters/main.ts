import van from "vanjs-core";

import { getParameters } from "./getParameters";

document.body.appendChild(
  getParameters({
    stories: {
      value: van.state(10),
      step: 1,
    },
    width: {
      value: van.state(50),
      min: 0,
      max: 100,
      step: 1,
      label: "Width",
      folder: "Size",
    },
    height: {
      value: van.state(50),
      min: 0,
      max: 100,
      step: 1,
      label: "Height",
      folder: "Size",
    },
  })
);
