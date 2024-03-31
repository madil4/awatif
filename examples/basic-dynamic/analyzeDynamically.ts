import {
  PositionResult,
  AnalysisResults,
  LumpedMassAssignment,
  PropertyAssignment,
} from "../../awatif-data-structure";
import { Node, Element, Assignment, Parameters } from "../../awatif-ui/";
import { getTransformationMatrix } from "../../awatif-ui/src/utils/getTransformationMatrix.ts";
import { EPSILON } from "./constants.ts";
import * as math from "mathjs";

export function analyzeDynamically(
  nodes: Node[],
  elements: Element[],
  assignments: Assignment[],
  config
) {
  let analysisResults: AnalysisResults = {
    default: [
      // here is the frame/step number
      {
        node: 0,
        position: [0, 0, 0], // here is the new computed position
      },
      {
        node: 1,
        position: [0, 0, 0],
      },
      {
        node: 2,
        position: [0, 0, 0],
      },
    ],
  };

  // run the dynamic loop here
  // console.log("T1", getTransformationMatrix(nodes[0], nodes[1]).elements);
  analysisResults = forwardEuler(
    config["time"],
    config["timeStep"],
    nodes,
    elements,
    assignments,
    analysisResults
  );

  return analysisResults;
}

function forwardEuler(
  t: number,
  dt: number,
  nodes: Node[],
  elements: Element[],
  assignments: Assignment[],
  results: AnalysisResults
): AnalysisResults {
  const numSteps: number = math.floor(t / dt);

  // define position, velocity, and mass vectors
  let x = nodes.flat();
  let v = Array(x.length).fill(0) as number[];
  let m = nodes
    .map((_, nid) => {
      const massAssignment = assignments.find(
        (a) => "mass" in a && "node" in a && a.node === nid
      ) as LumpedMassAssignment;
      return massAssignment?.mass ?? [0, 0, 0];
    })
    .flat();

  // forward euler formulation
  for (let step = 0; step < numSteps; step++) {
    let xn = x;
    let y = math.chain(x).add(math.multiply(v, dt)).done() as number[];

    x = math.add(
      y,
      math
        .chain(F(x, nodes, elements, assignments))
        .dotDivide(m)
        .multiply(dt ** 2)
        .done()
    ) as number[];

    v = math.chain(x).subtract(xn).divide(dt).done() as number[];

    // enforce constraints
    assignments.forEach((a) => {
      if ("node" in a && "support" in a) {
        const nid = a.node;
        a.support.forEach((s, i) => {
          if (s) x[i + nid] = 0;
        });
      }
    });

    // store
    let result: PositionResult[] = [];
    const dofs = getDOFs(nodes);

    nodes.forEach((n, nid) => {
      const currPosition = math.subset(
        x,
        math.index(dofs[nid])
      ) as PositionResult["position"];
      result.push({
        node: nid,
        position: currPosition,
      });
    });

    results[step] = result;
  }

  return results;
}

// utility functions ----------------------------------------------------------------
function F(
  x,
  nodes: Node[],
  elements: Element[],
  assignments: Assignment[]
): number[] {
  let f: number[] = Array(x.length).fill(0);

  // external force
  let f_ext: number[] = Array(x.length).fill(0);
  assignments.forEach((item) => {
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
    const dofs = getDOFs(nodes);

    const n1_dof: number[] = dofs[e[0]];
    const n2_dof: number[] = dofs[e[1]];

    const x_n1: [number, number, number] = math.subset(x, math.index(n1_dof));
    const x_n2: [number, number, number] = math.subset(x, math.index(n2_dof));

    const T: number[][] = findT(x_n1, x_n2);
    const Ti: number[][] = findT(nodes[e[0]], nodes[e[1]]);

    const r = math.norm(math.subtract(nodes[e[1]], nodes[e[0]])) as number;

    const d1: number =
      math.multiply(T, x_n1)[0] - math.multiply(Ti, nodes[e[0]])[0];
    const d2: number =
      math.multiply(T, x_n2)[0] - math.multiply(Ti, nodes[e[1]])[0];

    const property = assignments.find(
      (assignment) =>
        "element" in assignment &&
        "elasticity" in assignment &&
        assignment.element === eid
    ) as PropertyAssignment;

    const k = property?.elasticity;

    const f1: number = (k * (d2 - d1)) / r;
    const f_element: number[] = math.multiply(math.transpose(T), [f1, 0, 0]);

    n1_dof.forEach((dof, j) => (f[dof] += f_element[j]));
    n2_dof.forEach((dof, j) => (f[dof] -= f_element[j]));
  });

  return f;
}

function findT(x1, x2): number[][] {
  // convert global axis to local axis (i.e. x-axis for convenience)
  const d: [number, number, number] = math.subtract(x2, x1);

  const x_vec = [d[0], 0, 0];
  const z_vec = [0, 0, d[2]];

  // around y-axis
  const length_beta = math.number(math.norm(math.add(z_vec, x_vec)));
  const cos_beta = d[2] / (length_beta + EPSILON);
  const sin_beta = d[0] / (length_beta + EPSILON);

  const rot_y = [
    [sin_beta, 0, cos_beta],
    [0, 1, 0],
    [-cos_beta, 0, sin_beta],
  ];

  return rot_y;
}

function getDOFs(nodes: Node[]): { node: [number, number, number] } {
  let dofs: any = {};
  const base_dof = [0, 1, 2];

  nodes.forEach((_, nid) => {
    dofs[nid] = base_dof.map((d) => d + base_dof.length * nid);
  });

  return dofs;
}
