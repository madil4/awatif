# Awatif FEM Solver

Take your parametric app to the next level by utilizing the advanced yet simple FEM solver that Awatif provides.

- **Built for the Web**: Runs anywhere, even in browsers without a backend.
- **Fast and Lightweight**: Built using modern programming technologies.
- **In 3D**: Operates in both 2D and 3D spaces.
- **Validated and Trusted**: Rigorously tested and validated by clients.
- **Comprehensive**: Runs static analysis. Dynamic and non-linear on the way.

## Installation

```
npm install awatif-fem
```

## Usage

```typescript
import {
  analyze,
  Node,
  Element,
  AnalysisInput,
  AnalysisOutputs,
} from "awatif-fem";

const nodes: Node[] = [
  [0, 0, 3],
  [3, 0, 3],
  [3, 0, 0],
];
const elements: Element[] = [
  [0, 1],
  [1, 2],
];
const analysisInputs: AnalysisInput[] = [
  {
    node: 0,
    support: [false, true, false, true, false, true],
  },
  {
    node: 2,
    support: [false, true, false, true, false, true],
  },
  ...elements.map((_, i) => ({
    element: i,
    elasticity: 210e9,
    shearModulus: 84e9,
    momentOfInertiaZ: 16.6e-5,
    torsionalConstant: 4.6e-5,
  })),
  {
    node: 1,
    load: [0, -22e3, 0, 0, 0, 0],
  },
];

const analysisOutputs = analyze(nodes, elements, analysisInputs);

const expectedAnalysisOutputs: AnalysisOutputs = {
  default: [
    {
      node: 0,
      reaction: [
        0, 11000.000000000004, 0, -1646.4208242950122, 0, 31353.579175705014,
      ],
    },
    {
      node: 1,
      deformation: [
        0, -0.002627398344540233, 0, 0.0012782770374961275, 0,
        -0.0012782770374961275,
      ],
    },
    {
      element: 0,
      normal: [0, 0],
      shearY: [11000.000000000004, -11000.000000000004],
      shearZ: [0, 0],
      torsion: [-1646.4208242950122, 1646.4208242950122],
      bendingY: [0, 0],
      bendingZ: [31353.579175705014, 1646.4208242950117],
    },
  ],
};
```

## Examples

- Portal frame - [view](https://awatif.co/examples/portal-frame/) - [source code](https://github.com/madil4/awatif/blob/main/examples/portal-frame/main.ts)
- 2D truss - [view](https://awatif.co/examples/2d-truss/) - [source code](https://github.com/madil4/awatif/blob/main/examples/2d-truss/main.ts)
- Two bars - [view](https://awatif.co/examples/two-bars/) - [source code](https://github.com/madil4/awatif/blob/main/examples/two-bars/main.ts)
- Examples from the book: A First Course in the Finite Element Method by Daryl L. Logan 6th edition - [source code](https://github.com/madil4/awatif/tree/main/awatif-fem/examples)

When you toggle the bending moment setting located at the top-left corner, you should see this:
![image](https://github.com/madil4/awatif/assets/3858873/1588f4b3-c87f-426c-a1e6-62130ecfac3e)

## Pricing

- Free. To experiment and validate

  - 1 user
  - limit of 20 elements

- €25 Monthly. For professionals and small teams

  - 1 user
  - unlimited elements

- €4k-10k Annually. For SaaS businesses and big teams
  - Unlimited users
  - Unlimited elements

To purchase a license contact mohamed@awatif.co

## Documentation

[Awatif FEM Docs](https://awatif.co/awatif-fem/)
