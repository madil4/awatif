import {
  PositionAnalysisOutput,
  AnalysisOutputs,
  MassAnalysisInput,
  FrameAnalysisInput,
  Node,
  Element,
  AnalysisInput,
} from "awatif-data-structure";
import { getTransformationMatrix } from "awatif-ui/src/objects/utils/getTransformationMatrix.ts";
import * as math from "mathjs";

export function analyzeDynamically(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInput[],
  { time: t, timeStep: dt }: { time: number; timeStep: number }
): AnalysisOutputs {
  const analysisOutputs: AnalysisOutputs = {};
  const numSteps: number = math.floor(t / dt);

  // define position, velocity, and mass vectors
  let x = nodes.flat();
  let v = Array(x.length).fill(0) as number[];
  let m = nodes
    .map((_, nid) => {
      const massAnalysisInput = analysisInputs.find(
        (a) => "mass" in a && "node" in a && a.node === nid
      ) as MassAnalysisInput;
      return massAnalysisInput?.mass ?? [0, 0, 0];
    })
    .flat();

  // forward euler formulation
  for (let step = 0; step < numSteps; step++) {
    let xn = x;
    let y = math.chain(x).add(math.multiply(v, dt)).done();

    x = math.add(
      y,
      math
        .chain(F(x, nodes, elements, analysisInputs))
        .dotDivide(m)
        .multiply(dt ** 2)
        .done()
    ) as number[];

    v = math.chain(x).subtract(xn).divide(dt).done() as number[];

    // enforce constraints
    analysisInputs.forEach((a) => {
      if ("node" in a && "support" in a) {
        const nid = a.node;
        a.support.forEach((s, i) => {
          if (s) x[i + nid] = 0;
        });
      }
    });

    // store
    let output: PositionAnalysisOutput[] = [];
    const dofs: any = getDOFs(nodes);

    nodes.forEach((_, nid) => {
      const currPosition = math.subset(
        x,
        math.index(dofs[nid])
      ) as PositionAnalysisOutput["position"];
      output.push({
        node: nid,
        position: currPosition,
      });
    });

    analysisOutputs[step] = output;
  }

  return analysisOutputs;
}

// utility functions
function F(
  x: number[],
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInput[]
): number[] {
  let f: number[] = Array(x.length).fill(0);

  // external force
  let f_ext: number[] = Array(x.length).fill(0);
  analysisInputs.forEach((item) => {
    if ("load" in item) {
      item.load.forEach((loadValue, index) => {
        const position = item.node * item.load.length + index;
        f_ext[position] += (f_ext[position] || 0) + loadValue;
      });
    }
  }); // assign gravity
  f = math.add(f, f_ext);

  // elastic force
  elements.forEach((e, eid) => {
    const dofs: any = getDOFs(nodes);

    const n1_dof = dofs[e[0]];
    const n2_dof = dofs[e[1]];

    const x_n1 = math.subset(x, math.index(n1_dof)) as Node;
    const x_n2 = math.subset(x, math.index(n2_dof)) as Node;

    const T = findT3D(x_n1, x_n2);
    const Ti = findT3D(nodes[e[0]], nodes[e[1]]);

    const r = math.norm(math.subtract(nodes[e[1]], nodes[e[0]])) as number;

    const d1: number =
      math.multiply(T, x_n1)[0] - math.multiply(Ti, nodes[e[0]])[0];
    const d2: number =
      math.multiply(T, x_n2)[0] - math.multiply(Ti, nodes[e[1]])[0];

    const property = analysisInputs.find(
      (analysisInput) =>
        "element" in analysisInput &&
        "elasticity" in analysisInput &&
        analysisInput.element === eid
    ) as FrameAnalysisInput;

    const k = property?.elasticity;

    const f1 = (k * (d2 - d1)) / r;
    const f_element = math.multiply(math.transpose(T), [f1, 0, 0]);

    n1_dof.forEach((dof: any, j: number) => (f[dof] += f_element[j]));
    n2_dof.forEach((dof: any, j: number) => (f[dof] -= f_element[j]));
  });

  return f;
}

function findT3D(x1: Node, x2: Node): number[][] {
  const transformVec = getTransformationMatrix(x1, x2).elements;
  return [
    [transformVec[0], transformVec[1], transformVec[2]],
    [transformVec[4], transformVec[5], transformVec[6]],
    [transformVec[8], transformVec[9], transformVec[10]],
  ];
}

function getDOFs(nodes: Node[]): { node: [number, number, number] } {
  let dofs: any = {};

  nodes.forEach((node, nid) => {
    dofs[nid] = node.map((_, i) => i + node.length * nid);
  });

  return dofs;
}
