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
import { Assignment, Model, AssignmentType, Node } from "../interfaces";

export function deforming(model: Model): Node[] {
  const nodes = model.nodes;

  // compute stiffness matrix, force, supports all in one loop with one lookup table if possible same keys
  let stiffnessGlobalAssembly = zeros(nodes.length * 3, nodes.length * 3);

  model.elements.forEach((element, index) => {
    const node0 = matrix(nodes[element[0]]);
    const node1 = matrix(nodes[element[1]]);
    const vector = subtract(node1, node0);
    const length = norm(vector) as number;

    // local matrix
    const { area, elasticity } = getBar(index, model.assignments);
    let stiffnessLocal = matrix([
      [1, -1],
      [-1, 1],
    ]);
    stiffnessLocal = multiply(stiffnessLocal, (area * elasticity) / length);

    // global matrix
    const cosX = dot(vector, matrix([1, 0, 0])) / length;
    const cosY = dot(vector, matrix([0, 1, 0])) / length;
    const cosZ = dot(vector, matrix([0, 0, 1])) / length;
    const transformation = matrix([
      [cosX, cosY, cosZ, 0, 0, 0],
      [0, 0, 0, cosX, cosY, cosZ],
    ]);
    const stiffnessGlobal = multiply(
      transpose(transformation),
      multiply(stiffnessLocal, transformation)
    );

    // assemble stiffness's
    const node1Range = [element[0] * 3, element[0] * 3 + 1, element[0] * 3 + 2];
    const node2Range = [element[1] * 3, element[1] * 3 + 1, element[1] * 3 + 2];
    const range = [...node1Range, ...node2Range];
    const ind = indexMathjs(range, range);
    const current_K = subset(stiffnessGlobalAssembly, ind);
    const sum = add(current_K, stiffnessGlobal);
    stiffnessGlobalAssembly = subset(stiffnessGlobalAssembly, ind, sum);
  });

  // flatten positions for math
  let x = matrix(nodes.flat());

  // apply supports
  const supports = getSupports(model.assignments, model.elements);
  const freeInd = setDifference(range(0, x.size()[0]), supports);

  // apply forces
  const f = getForces(model);

  // compute step
  const f_free = subset(f, indexMathjs(freeInd));
  const x_free = subset(x, indexMathjs(freeInd));
  const K_free = subset(stiffnessGlobalAssembly, indexMathjs(freeInd, freeInd));
  const dx = lusolve(K_free as any, f_free);

  x = subset(x, indexMathjs(freeInd), add(x_free, flatten(dx)));

  return reshape(x, [-1, 3]).toArray() as any;
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
      localSupportsFirst.push(firstNode * 3);
      localSupportsFirst.push(firstNode * 3 + 1);
      localSupportsFirst.push(firstNode * 3 + 2);
      localSupportsFirst = localSupportsFirst.filter((_, index) =>
        assignment.firstNode ? assignment.firstNode[index] : false
      );

      let localSupportsSecond: number[] = [];
      const secondNode = connectivities[assignment.element ?? 0][1];
      localSupportsSecond.push(secondNode * 3);
      localSupportsSecond.push(secondNode * 3 + 1);
      localSupportsSecond.push(secondNode * 3 + 2);
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
        assignment.zLoad ?? 0,
      ]);
  });

  let f = zeros([model.nodes.length * 3]);
  model.elements.forEach((element, index) => {
    const force = forces.get(index) ?? [0, 0, 0];
    const vector = subtract(model.nodes[element[1]], model.nodes[element[0]]);
    const forceX = (force[0] * abs(vector[1])) / 2;
    const forceY = (force[1] * abs(vector[0])) / 2;
    const forceZ = (force[2] * abs(vector[2])) / 2; // needs verification
    const pointForce = [forceX, forceY, forceZ];

    const indN1 = indexMathjs([
      element[0] * 3,
      element[0] * 3 + 1,
      element[0] * 3 + 2,
    ]);
    const currentF1 = subset(f, indN1);
    const sumF1 = add(currentF1, pointForce);
    f = subset(f, indN1, sumF1);

    const indN2 = indexMathjs([
      element[1] * 3,
      element[1] * 3 + 1,
      element[1] * 3 + 2,
    ]);
    const currentF2 = subset(f, indN2);
    const sumF2 = add(currentF2, pointForce);
    f = subset(f, indN2, sumF2);
  });

  return f;
}

function getBar(
  index: number,
  assignments: Assignment[] | undefined
): { area: number; elasticity: number } {
  let bar = { area: 1, elasticity: 1 };
  assignments?.forEach((assignment) => {
    if (assignment.element == index && assignment.type == AssignmentType.bar) {
      bar = { area: assignment.area, elasticity: assignment.elasticity };
    }
  });
  return bar;
}
