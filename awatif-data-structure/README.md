# Awatif Data Structure

What sets Awatif apart is the significant challenge in our industry: the reliance on different apps for designing structures. Unfortunately, we still lack a unified data structure to interpolate between them. Awatif addresses this challenge by decomposing model complexity into its core primitives, which are geometry-based. Any structure geometry can be represented by a list of nodes and elements. All additional data required for analysis, design, or reporting is simply assigned to these nodes or elements.

## Installation

The data structure is platform-agnostic; you can follow the same structure in Python or C#. Here, the types are defined in TypeScript, allowing you to import them into your algorithm. This enables smooth interpolation with other algorithms that adhere to the same data structure.

```
npm install awatif-data-structure
```

## Usage

```typescript
import { Element, Node, AnalysisInput } from "awatif-data-structure";

const nodes: Node[] = [
  [0, 0, 0],
  [0, 5, 0],
  [5, 5, 0],
  [5, 0, 0],
];
const elements: Element[] = [
  [0, 1],
  [1, 2],
  [2, 3],
];
const analysisInputs: AnalysisInput[] = [
  {
    node: 0,
    load: [0, -50, 0],
  },
  {
    element: 1,
    area: 10,
    elasticity: 200,
  },
];
```

## Examples (not update, refer to examples)

Below are examples of a complete Finite Element Method (FEM) analysis using this data structure:

- [Three beams loaded with a point load](https://github.com/madil4/awatif/blob/main/awatif-data-structure/examples/bar-analysis.ts)
- [Two beams loaded with a uniformly distributed load](https://github.com/madil4/awatif/blob/main/awatif-data-structure/examples/beam-analysis.ts)

## Documentation

[Awatif Docs](https://awatif.co/awatif-data-structure/)
