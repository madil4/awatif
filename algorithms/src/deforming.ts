import * as mathjs from "mathjs";

export const deforming = (nodes: any, elements: any, assignments: any) => {
  // compute stiffness matrix, force, supports all in one loop with one lookup table if possible same keys
  let stiffnessGlobalAssembly = mathjs.zeros(
    nodes.length * 3,
    nodes.length * 3
  );

  elements.forEach((element: any, index: any) => {
    const node0 = mathjs.matrix(nodes[element[0]]);
    const node1 = mathjs.matrix(nodes[element[1]]);
    const vector = mathjs.subtract(node1, node0);
    const length = mathjs.norm(vector) as number;

    // local matrix
    const { area, elasticity } = getBar(index, assignments);
    let stiffnessLocal = mathjs.matrix([
      [1, -1],
      [-1, 1],
    ]);
    stiffnessLocal = mathjs.multiply(
      stiffnessLocal,
      (area * elasticity) / length
    );

    // global matrix
    const cosX = mathjs.dot(vector, mathjs.matrix([1, 0, 0])) / length;
    const cosY = mathjs.dot(vector, mathjs.matrix([0, 1, 0])) / length;
    const cosZ = mathjs.dot(vector, mathjs.matrix([0, 0, 1])) / length;
    const transformation = mathjs.matrix([
      [cosX, cosY, cosZ, 0, 0, 0],
      [0, 0, 0, cosX, cosY, cosZ],
    ]);
    const stiffnessGlobal = mathjs.multiply(
      mathjs.transpose(transformation),
      mathjs.multiply(stiffnessLocal, transformation)
    );

    // assemble stiffness's
    const node1Range = [element[0] * 3, element[0] * 3 + 1, element[0] * 3 + 2];
    const node2Range = [element[1] * 3, element[1] * 3 + 1, element[1] * 3 + 2];
    const range = [...node1Range, ...node2Range];
    const ind = mathjs.index(range, range);
    const current_K = mathjs.subset(stiffnessGlobalAssembly, ind);
    const sum = mathjs.add(current_K, stiffnessGlobal);
    stiffnessGlobalAssembly = mathjs.subset(stiffnessGlobalAssembly, ind, sum);
  });

  // flatten positions for math
  let x = mathjs.matrix(nodes.flat());

  // apply supports
  const supports = getSupports(assignments);
  const freeInd = mathjs.setDifference(mathjs.range(0, x.size()[0]), supports);

  // apply loads
  const nodeLoads = getNodeLoads(nodes, elements, assignments);

  // compute step
  const f_free = mathjs.subset(nodeLoads, mathjs.index(freeInd));
  const x_free = mathjs.subset(x, mathjs.index(freeInd));
  const K_free = mathjs.subset(
    stiffnessGlobalAssembly,
    mathjs.index(freeInd, freeInd)
  );
  const dx = mathjs.lusolve(K_free as any, f_free);

  x = mathjs.subset(
    x,
    mathjs.index(freeInd),
    mathjs.add(x_free, mathjs.flatten(dx))
  );

  // compute forces with reactions
  const dxGlobal = mathjs.subset(
    mathjs.multiply(x, 0),
    mathjs.index(freeInd),
    mathjs.flatten(dx)
  );
  const forces = mathjs.multiply(stiffnessGlobalAssembly, dxGlobal);

  return {
    deformedNodes: mathjs.reshape(x, [-1, 3]).toArray() as any,
    forces: forces.toArray(),
  };
};

function getNodeLoads(nodes: any, elements: any, assignments: any) {
  let loads = mathjs.zeros([nodes.length * 3]);

  assignments.forEach((a: any) => {
    if ("load" in a) {
      const index = mathjs.index([a.node * 3, a.node * 3 + 1, a.node * 3 + 2]);
      const current = mathjs.subset(loads, index);
      const sum = mathjs.add(current, a.load);
      loads = mathjs.subset(loads, index, sum);
    }
  });

  return loads;
}

function getSupports(assignments: any[]): number[] {
  const supports: number[] = [];

  assignments?.forEach((a) => {
    if ("support" in a) {
      if (a.support[0]) supports.push(a.node * 3);
      if (a.support[1]) supports.push(a.node * 3 + 1);
      if (a.support[2]) supports.push(a.node * 3 + 2);
    }
  });

  return supports;
}

function getBar(
  index: number,
  assignments: any[]
): { area: number; elasticity: number } {
  let bar = { area: 1, elasticity: 1 };
  assignments?.forEach((a) => {
    if (a.element == index && "area" in a && "elasticity" in a) {
      bar = { area: a.area, elasticity: a.elasticity };
    }
  });
  return bar;
}
