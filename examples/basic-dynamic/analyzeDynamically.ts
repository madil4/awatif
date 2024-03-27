import {
  DeformationResult,
  AnalysisResults,
  PropertyAssignment,
  SupportAssignment,
  LoadAssignment,
} from "../../awatif-data-structure";
import { Node, Element, Assignment, Parameters } from "../../awatif-ui/";
import { G, EPSILON } from "./constants.ts";
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
        deformation: [0, 0, 0], // here is the new computed position
      },
      {
        node: 1,
        deformation: [0, 0, 0],
      },
      {
        node: 2,
        deformation: [0, 0, 0],
      },
    ],
  };

  // run the dynamic loop here
  let x: any = [];
  nodes.forEach((n) => (x = x.concat(n)));

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
  let v: any = Array(x.length).fill(0);

  // define mass vector
  function isLoadAssignment(obj: any): obj is LoadAssignment {
    return "node" in obj && "load" in obj;
  }

  let m: any = [];

  nodes.forEach((n, nid) => {
    const loadAssignment: any = assignments.find(
      (a) => isLoadAssignment(a) && a.node === nid
    );

    let load = loadAssignment?.load;
    let mass = Array(n.length).fill(0);
    if (load) {
      mass = mass.map((val, i) => math.abs(load[2]) / G);
    }
    m = m.concat(mass);
  });

  // forward euler formulation
  for (let step = 0; step < numSteps; step++) {
    let xn = x;
    let y = math.chain(x).add(math.multiply(v, dt)).done();

    x = math.add(
      y,
      math
        .chain(F(x, nodes, elements, assignments))
        .dotDivide(m)
        .multiply(dt ** 2)
        .done()
    );

    v = math.chain(x).subtract(xn).divide(dt).done();

    // enforce constraints
    function isSupportAssignment(obj: any): obj is SupportAssignment {
      return 'node' in obj && 'support' in obj;
    }

    assignments.forEach((a) => {
      console.log('assignment', a, isSupportAssignment(a));
      if (isSupportAssignment(a)) {
        const nid = a.node;
        a.support.forEach((s, i) => {
          if (s) x[i + nid] = 0;
        });
      }
    });

    // store
    let result: DeformationResult[] = [];
    const dofs = getDOFs(nodes);

    nodes.forEach((n, nid) => {
      const currPosition: number[] = math.subset(x, math.index(dofs[nid]));
      const deformation = math.subtract(currPosition, n);
      result.push({
        node: nid,
        deformation: [deformation[0], deformation[1], deformation[2]],
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

    const r: number =
      math.multiply(Ti, nodes[e[1]])[0] - math.multiply(Ti, nodes[e[0]])[0];

    const d1: number =
      math.multiply(T, x_n1)[0] - math.multiply(Ti, nodes[e[0]])[0];
    const d2: number =
      math.multiply(T, x_n2)[0] - math.multiply(Ti, nodes[e[1]])[0];

    function isPropertyAssignment(obj: any): obj is PropertyAssignment {
      return "element" in obj && "elasticity" in obj;
    }

    const property: any = assignments.find(
      (assignment) =>
        isPropertyAssignment(assignment) && assignment.element === eid
    );

    const k = property?.elasticity;

    const f1: number = (k * (d2 - d1)) / r;
    const f_element: number[] = math.multiply(math.transpose(T), [f1, 0, 0]);

    n1_dof.forEach((dof, j) => (f[dof] += f_element[j]));
    n2_dof.forEach((dof, j) => (f[dof] -= f_element[j]));
  });

  return f;
}

function findT(x1, x2): number[][] {
  const d: [number, number, number] = math.subtract(x2, x1);

  const x_vec = [d[0], 0, 0];
  const y_vec = [0, d[1], 0];

  // around z-axis
  const length_alpha = math.number(math.norm(math.add(x_vec, y_vec)));
  const cos_alpha: number = d[0] / (length_alpha + EPSILON);
  const sin_alpha: number = d[1] / (length_alpha + EPSILON);

  const rot_z = [
    [cos_alpha, sin_alpha, 0],
    [-sin_alpha, cos_alpha, 0],
    [0, 0, 1],
  ];

  // project d on x-axis in xz plane

  const d_z = math.multiply(rot_z, d);

  const x_vec_z = [d_z[0], 0, 0];
  const z_vec_z = [0, 0, d_z[2]];

  // around y-axis
  const length_beta = math.number(math.norm(math.add(z_vec_z, x_vec_z)));
  const cos_beta: number = d_z[2] / (length_beta + EPSILON);
  const sin_beta: number = d_z[0] / (length_beta + EPSILON);

  const rot_y = [
    [sin_beta, 0, -cos_beta],
    [0, 1, 0],
    [cos_beta, 0, sin_beta],
  ];

  // rotation matrices to project everything on x axis ----------------------------

  return math.chain(rot_z).multiply(rot_y).done();
}

function getDOFs(nodes: Node[]): { node: [number, number, number] } {
  let dofs: any = {};
  const base_dof: [number, number, number] = [0, 1, 2];

  nodes.forEach((_, nid) => {
    dofs[nid] = base_dof.map((d) => d + base_dof.length * nid);
  });

  return dofs;
}
