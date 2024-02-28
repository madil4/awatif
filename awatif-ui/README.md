# Awatif User Interface

Building an interactive web app from scratch is a challenging task. awatif-ui takes care of all the boilerplate and infrastructure, allowing you to focus on the logic of your app. It is based on a simple concept: exposing parameters that you want the user to interact with, and at each parameter change, rerunning the script or algorithm for modeling, analysis, design, and reporting of your structure.

- **For Structural Engineers**: Components for visualizing engineering results & reports.
- **Open source**: Full control of behavior and looks
- **Extensible**: Built on Three.js library for drawing complex geometry

## Installation
Install awatif-ui via npm
```
npm install awatif-ui
```

## Usage
```Typescript
import { app, Node, Element, Assignment, Parameters } from "awatif-ui";
import { analyze } from "awatif-fem";

const parameters: Parameters = {
  xPosition: { value: 12, min: 1, max: 20 },
  zPosition: { value: 0, min: 1, max: 10 },
};

function onParameterChange(parameters: Parameters) {
  const nodes: Node[] = [
    [5, 0, 0],
    [parameters.xPosition.value, 0, parameters.zPosition.value],
    [5, 0, 8],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
  ];
  const assignments: Assignment[] = [
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
      load: [0, 0, -10],
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

  const analysisResults = analyze(nodes, elements, assignments);

  return { nodes, elements, assignments, analysisResults };
}

app({
  parameters,
  onParameterChange,
});
```

## Examples
1. Basic portal frame loaded laterally - [View](http://awatif.co/awatif-ui/examples/basic/) - [Source code](https://github.com/madil4/awatif/blob/main/awatif-ui/examples/basic/main.ts)
2. Parametric portal frame loaded laterally - [View](http://awatif.co/awatif-ui/examples/parametric/) - [Source code](https://github.com/madil4/awatif/blob/main/awatif-ui/examples/parametric/main.ts)
3. [More Examples](http://awatif.co/examples/)

When you toggle the bending moment setting located at the top-left corner, you should see this:
portal-frame bending moment

![image](https://awatif.co/img/awatif-ui/portal-frame.jpg)
