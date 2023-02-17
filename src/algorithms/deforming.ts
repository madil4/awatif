import {
  matrix,
  subtract,
  dot,
  norm,
  multiply,
  transpose,
  zeros,
  subset,
  range,
  index as indexMathjs,
  add,
  setDifference,
  lusolve,
  flatten,
  reshape,
  abs,
} from "mathjs";
import { Assignment, Model, AssignmentType } from "../interfaces";

export function deforming(model: Model): [number, number, number][] {
  const positions = model.positions.map((node) => node.slice(0, 2));

  // compute stiffness matrix, force, supports all in one loop with one lookup table if possible same keys
  let k_global_T = zeros(positions.length * 2, positions.length * 2);

  model.connectivities.forEach((element, index) => {
    const n0 = matrix(positions[element[0]]);
    const n1 = matrix(positions[element[1]]);

    // transformation matrix
    const d = subtract(n1, n0);
    const i = matrix([1, 0]);
    const j = matrix([0, 1]);
    const cos = dot(d, i) / (norm(d) as number);
    const sin = dot(d, j) / (norm(d) as number);
    const T = matrix([
      [cos, sin],
      [-sin, cos],
    ]);

    // local matrix
    const n0_T = multiply(T, n0);
    const n1_T = multiply(T, n1);
    const L = n1_T.get([0]) - n0_T.get([0]);
    const { area, elasticity } = getBar(index, model.assignments);
    let K_local = matrix([
      [1, -1],
      [-1, 1],
    ]);
    K_local = multiply(K_local, (area * elasticity) / L);

    // global matrix
    const O = matrix([
      [cos, sin, 0, 0],
      [0, 0, cos, sin],
    ]);
    const k_O = multiply(K_local, O);
    const new_K = multiply(transpose(O), k_O);

    // add to the big matrix
    const ind = indexMathjs(range(0, 4), range(0, 4));
    const current_K = subset(k_global_T, ind);
    const sum = add(current_K, new_K);
    k_global_T = subset(k_global_T, ind, sum);
  });

  // flatten positions for math
  let x = matrix(positions.flat());

  // apply supports
  const supports = getSupports(model.assignments, model.connectivities);
  const freeInd = setDifference(range(0, x.size()[0]), supports);

  // apply forces
  const f = getForces(model);

  // compute step
  const f_free = subset(f, indexMathjs(freeInd));
  const x_free = subset(x, indexMathjs(freeInd));
  const K_free = subset(k_global_T, indexMathjs(freeInd, freeInd));
  const dx = lusolve(K_free as any, f_free);

  x = subset(x, indexMathjs(freeInd), add(x_free, flatten(dx)));

  const newPositions = reshape(x, [-1, 2])
    .toArray()
    .map((node) => node.concat(0));

  return newPositions;
}

function getSupports(
  assignments: Assignment[] | undefined,
  connectivities: [number, number][]
): number[] {
  const globalSupports: number[] = [];

  // loop through elements instead of assignments
  assignments?.forEach((assignment) => {
    if (assignment.type == AssignmentType.barSupports) {
      let localSupportsFirst: number[] = [];
      const firstNode = connectivities[assignment.element ?? 0][0];
      localSupportsFirst.push(firstNode * 2);
      localSupportsFirst.push(firstNode * 2 + 1);
      localSupportsFirst = localSupportsFirst.filter((_, index) =>
        assignment.firstNode ? assignment.firstNode[index] : false
      );

      let localSupportsSecond: number[] = [];
      const secondNode = connectivities[assignment.element ?? 0][1];
      localSupportsSecond.push(secondNode * 2);
      localSupportsSecond.push(secondNode * 2 + 1);
      localSupportsSecond = localSupportsSecond.filter((_, index) =>
        assignment.secondNode ? assignment.secondNode[index] : false
      );

      globalSupports.push(...localSupportsFirst, ...localSupportsSecond);
    }
  });

  return globalSupports;
}

function getForces(model: Model) {
  const forces: Map<number, number[]> = new Map();
  model.assignments?.forEach((assignment) => {
    if (assignment.type == AssignmentType.barUniformLoad)
      forces.set(assignment.element ?? -1, [
        assignment.xLoad ?? 0,
        assignment.yLoad ?? 0,
      ]);
  });

  let f = zeros([model.positions.length * 2]);
  model.connectivities.forEach((element, index) => {
    let force = forces.get(index) ?? [0, 0];
    const vector = subtract(
      model.positions[element[1]],
      model.positions[element[0]]
    );
    force[0] = (force[0] * abs(vector[0])) / 2;
    force[1] = (force[1] * abs(vector[1])) / 2;

    const indN1 = indexMathjs([element[0] * 2, element[0] * 2 + 1]);
    const currentF1 = subset(f, indN1);
    const sumF1 = add(currentF1, force);
    f = subset(f, indN1, sumF1);

    const indN2 = indexMathjs([element[1] * 2, element[1] * 2 + 1]);
    const currentF2 = subset(f, indN2);
    const sumF2 = add(currentF2, force);
    f = subset(f, indN2, sumF2);
  });

  return f;
}

function getBar(
  element_index: number,
  assignments: Assignment[] | undefined
): { area: number; elasticity: number } {
  assignments?.forEach((assignment) => {
    if (
      assignment.element == element_index &&
      assignment.type == AssignmentType.bar
    ) {
      return { area: assignment.area, elasticity: assignment.elasticity };
    }
  });
  return { area: 1, elasticity: 300 };
}
