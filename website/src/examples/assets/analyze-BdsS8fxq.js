import { dy as setDifference, dw as range, ar as matrix, aB as multiply, aD as subtract, eQ as norm, cT as dot, cs as kron, cr as identity, cg as zeros, ce as transpose, aq as subset, di as index, ax as add, eo as lusolve, cp as flatten } from "./pureFunctionsAny.generated-DNSg1shC.js";
var AnalysisType = /* @__PURE__ */ ((AnalysisType2) => {
  AnalysisType2[AnalysisType2["Bar"] = 0] = "Bar";
  AnalysisType2[AnalysisType2["Beam"] = 1] = "Beam";
  return AnalysisType2;
})(AnalysisType || {});
function processAnalysisInputs(analysisInputs) {
  const pai = {
    analysisType: 1,
    // not because it is mostly used but it is processed first below
    elasticities: /* @__PURE__ */ new Map(),
    areas: /* @__PURE__ */ new Map(),
    loads: /* @__PURE__ */ new Map(),
    supports: /* @__PURE__ */ new Map(),
    momentOfInertiaZs: /* @__PURE__ */ new Map(),
    momentOfInertiaYs: /* @__PURE__ */ new Map(),
    shearModuluses: /* @__PURE__ */ new Map(),
    torsionalConstants: /* @__PURE__ */ new Map(),
    distributedLoads: /* @__PURE__ */ new Map()
  };
  analysisInputs.forEach((input) => {
    var _a;
    if ("area" in input)
      pai.areas.set(input.element, input.area);
    if ("elasticity" in input)
      pai.elasticities.set(input.element, input.elasticity);
    if ("load" in input)
      pai.loads.set(input.node, input.load);
    if ("support" in input)
      pai.supports.set(input.node, input.support);
    if (((_a = pai.supports.values().next().value) == null ? void 0 : _a.length) === 3)
      pai.analysisType = 0;
    if (pai.analysisType === 1) {
      if ("momentOfInertiaZ" in input)
        pai.momentOfInertiaZs.set(input.element, input.momentOfInertiaZ);
      if ("momentOfInertiaY" in input)
        pai.momentOfInertiaYs.set(input.element, input.momentOfInertiaY);
      if ("torsionalConstant" in input)
        pai.torsionalConstants.set(input.element, input.torsionalConstant);
      if ("shearModulus" in input)
        pai.shearModuluses.set(input.element, input.shearModulus);
      if ("distributedLoad" in input)
        pai.distributedLoads.set(input.element, input.distributedLoad);
    }
  });
  return pai;
}
function bar$3(element) {
  const node0Range = [element[0] * 3, element[0] * 3 + 1, element[0] * 3 + 2];
  const node1Range = [element[1] * 3, element[1] * 3 + 1, element[1] * 3 + 2];
  return [...node0Range, ...node1Range];
}
function beam$3(element) {
  const node1Range = [
    element[0] * 6,
    element[0] * 6 + 1,
    element[0] * 6 + 2,
    element[0] * 6 + 3,
    element[0] * 6 + 4,
    element[0] * 6 + 5
  ];
  const node2Range = [
    element[1] * 6,
    element[1] * 6 + 1,
    element[1] * 6 + 2,
    element[1] * 6 + 3,
    element[1] * 6 + 4,
    element[1] * 6 + 5
  ];
  return [...node1Range, ...node2Range];
}
const getElementNodesIndices = {
  [AnalysisType.Bar]: bar$3,
  [AnalysisType.Beam]: beam$3
};
const getEquivalentDistributedLoad = (wY, wZ, L) => [
  0,
  wY * L / 2,
  wZ * L / 2,
  0,
  -wZ * L ** 2 / 12,
  wY * L ** 2 / 12,
  0,
  wY * L / 2,
  wZ * L / 2,
  0,
  wZ * L ** 2 / 12,
  -wY * L ** 2 / 12
];
function bar$2(supports, dof) {
  let supportsInd = [];
  supports.forEach((support, index2) => {
    if (support[0])
      supportsInd.push(index2 * 3);
    if (support[1])
      supportsInd.push(index2 * 3 + 1);
    if (support[2])
      supportsInd.push(index2 * 3 + 2);
  });
  return setDifference(range(0, dof), supportsInd);
}
function beam$2(supports, dof) {
  let supportsInd = [];
  supports.forEach((support, index2) => {
    if (support[0])
      supportsInd.push(index2 * 6);
    if (support[1])
      supportsInd.push(index2 * 6 + 1);
    if (support[2])
      supportsInd.push(index2 * 6 + 2);
    if (support[3])
      supportsInd.push(index2 * 6 + 3);
    if (support[4])
      supportsInd.push(index2 * 6 + 4);
    if (support[5])
      supportsInd.push(index2 * 6 + 5);
  });
  return setDifference(range(0, dof), supportsInd);
}
const getFreeIndices = {
  [AnalysisType.Bar]: bar$2,
  [AnalysisType.Beam]: beam$2
};
function bar$1(pa, index2, L) {
  const A = pa.areas.get(index2) || 0;
  const E = pa.elasticities.get(index2) || 0;
  let kLocal = matrix([
    [1, -1],
    [-1, 1]
  ]);
  return multiply(kLocal, E * A / L);
}
function beam$1(pa, index2, L) {
  const Iz = pa.momentOfInertiaZs.get(index2) || 0;
  const Iy = pa.momentOfInertiaYs.get(index2) || 0;
  const E = pa.elasticities.get(index2) || 0;
  const A = pa.areas.get(index2) || 0;
  const G = pa.shearModuluses.get(index2) || 0;
  const J = pa.torsionalConstants.get(index2) || 0;
  const EA = E * A / L;
  const EIz = E * Iz / L ** 3;
  const EIy = E * Iy / L ** 3;
  const GJ = G * J / L;
  return matrix([
    [EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0],
    [0, 12 * EIz, 0, 0, 0, 6 * L * EIz, 0, -12 * EIz, 0, 0, 0, 6 * L * EIz],
    [0, 0, 12 * EIy, 0, -6 * L * EIy, 0, 0, 0, -12 * EIy, 0, -6 * L * EIy, 0],
    [0, 0, 0, GJ, 0, 0, 0, 0, 0, -GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2
    ],
    [-EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0],
    [0, -12 * EIz, 0, 0, 0, -6 * EIz * L, 0, 12 * EIz, 0, 0, 0, -6 * EIz * L],
    [0, 0, -12 * EIy, 0, 6 * L * EIy, 0, 0, 0, 12 * EIy, 0, 6 * L * EIy, 0],
    [0, 0, 0, -GJ, 0, 0, 0, 0, 0, GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2
    ]
  ]);
}
const getStiffnessMatrix = {
  [AnalysisType.Bar]: bar$1,
  [AnalysisType.Beam]: beam$1
};
function bar(node0, node1) {
  const vector = subtract(node1, node0);
  const length = norm(vector);
  const cosX = dot(vector, matrix([1, 0, 0])) / length;
  const cosY = dot(vector, matrix([0, 1, 0])) / length;
  const cosZ = dot(vector, matrix([0, 0, 1])) / length;
  return matrix([
    [cosX, cosY, cosZ, 0, 0, 0],
    [0, 0, 0, cosX, cosY, cosZ]
  ]);
}
function beam(node0, node1) {
  const vector = subtract(node1, node0);
  const length = norm(vector);
  const l = dot(vector, matrix([1, 0, 0])) / length;
  const m = dot(vector, matrix([0, 1, 0])) / length;
  const n = dot(vector, matrix([0, 0, 1])) / length;
  const D = Math.sqrt(l ** 2 + m ** 2);
  let lambda = matrix([
    [l, m, n],
    [-m / D, l / D, 0],
    [-l * n / D, -m * n / D, D]
  ]);
  if (n === 1) {
    lambda = matrix([
      [0, 0, 1],
      [0, 1, 0],
      [-1, 0, 0]
    ]);
  }
  if (n === -1) {
    lambda = matrix([
      [0, 0, -1],
      [0, 1, 0],
      [1, 0, 0]
    ]);
  }
  return kron(identity(4), lambda);
}
const getTransformationMatrix = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam
};
function deform(nodes, elements, pa) {
  const dof = nodes.length * (pa.analysisType === AnalysisType.Bar ? 3 : 6);
  let kGlobalAssembly = zeros(dof, dof);
  elements.forEach((element, index$1) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const kLocal = getStiffnessMatrix[pa.analysisType](pa, index$1, L);
    const T = getTransformationMatrix[pa.analysisType](node0, node1);
    const kGlobal = multiply(
      transpose(T),
      multiply(kLocal, T)
    );
    const elementInd = getElementNodesIndices[pa.analysisType](element);
    const KCurrent = subset(
      kGlobalAssembly,
      index(elementInd, elementInd)
    );
    kGlobalAssembly = subset(
      kGlobalAssembly,
      index(elementInd, elementInd),
      add(KCurrent, kGlobal)
    );
  });
  let f = zeros([dof]);
  pa.loads.forEach((force, index$1) => {
    const nodeInd = {
      0: [index$1 * 3, index$1 * 3 + 1, index$1 * 3 + 2],
      1: [
        index$1 * 6,
        index$1 * 6 + 1,
        index$1 * 6 + 2,
        index$1 * 6 + 3,
        index$1 * 6 + 4,
        index$1 * 6 + 5
      ]
    };
    const current = subset(f, index(nodeInd[pa.analysisType]));
    f = subset(
      f,
      index(nodeInd[pa.analysisType]),
      add(current, force)
    );
  });
  pa.distributedLoads.forEach(([wY, wZ], index$1) => {
    const element = elements[index$1];
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const ind = index(getElementNodesIndices[pa.analysisType](element));
    const current = subset(f, ind);
    const load = getEquivalentDistributedLoad(wY, wZ, L);
    f = subset(f, ind, add(current, load));
  });
  const freeInd = getFreeIndices[pa.analysisType](pa.supports, dof);
  const fFree = subset(f, index(freeInd));
  const kFree = subset(kGlobalAssembly, index(freeInd, freeInd));
  const dxFree = lusolve(kFree, fFree);
  const dx = subset(
    zeros(dof),
    index(freeInd),
    flatten(dxFree)
  );
  let forces = multiply(kGlobalAssembly, dx);
  pa.distributedLoads.forEach(([wY, wZ], index$1) => {
    const element = elements[index$1];
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const ind = index(getElementNodesIndices[pa.analysisType](element));
    const current = subset(forces, ind);
    const load = getEquivalentDistributedLoad(wY, wZ, L);
    forces = subset(forces, ind, subtract(current, load));
  });
  return {
    deformations: dx.toArray(),
    forces: forces.toArray()
  };
}
function analyze(nodes, elements, analysisInputs) {
  const pai = processAnalysisInputs(analysisInputs);
  const { deformations, forces } = deform(nodes, elements, pai);
  const analysisOutputs = [];
  nodes.forEach((_, index2) => {
    const deformation = {
      0: [
        deformations[index2 * 3],
        deformations[index2 * 3 + 1],
        deformations[index2 * 3 + 2]
      ],
      1: [
        deformations[index2 * 6],
        deformations[index2 * 6 + 1],
        deformations[index2 * 6 + 2],
        deformations[index2 * 6 + 3],
        deformations[index2 * 6 + 4],
        deformations[index2 * 6 + 5]
      ]
    };
    analysisOutputs.push({
      node: index2,
      deformation: deformation[pai.analysisType]
    });
    const reaction = {
      0: [
        forces[index2 * 3],
        forces[index2 * 3 + 1],
        forces[index2 * 3 + 2]
      ],
      1: [
        forces[index2 * 6],
        forces[index2 * 6 + 1],
        forces[index2 * 6 + 2],
        forces[index2 * 6 + 3],
        forces[index2 * 6 + 4],
        forces[index2 * 6 + 5]
      ]
    };
    if (pai.supports.get(index2)) {
      analysisOutputs.push({
        node: index2,
        reaction: reaction[pai.analysisType]
      });
    }
  });
  elements.forEach((element, index$1) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const dxGlobal = subset(
      deformations,
      index(getElementNodesIndices[pai.analysisType](element))
    );
    const T = getTransformationMatrix[pai.analysisType](node0, node1);
    const dxLocal = multiply(T, dxGlobal);
    const kLocal = getStiffnessMatrix[pai.analysisType](pai, index$1, L);
    let fLocal = multiply(kLocal, dxLocal).toArray();
    if (pai.distributedLoads.get(index$1)) {
      const [wY, wZ] = pai.distributedLoads.get(index$1) || [0, 0];
      const load = getEquivalentDistributedLoad(wY, wZ, L);
      fLocal = subtract(fLocal, load);
    }
    const analysisOutput = {
      0: {
        element: index$1,
        normal: [-fLocal[0], -fLocal[0]]
      },
      // sign flips according to Logan's book,
      1: {
        element: index$1,
        normal: [fLocal[0], fLocal[6]],
        shearY: [fLocal[1], fLocal[7]],
        shearZ: [fLocal[2], fLocal[8]],
        torsion: [fLocal[3], fLocal[9]],
        bendingY: [fLocal[4], fLocal[10]],
        bendingZ: [fLocal[5], fLocal[11]]
      }
    };
    analysisOutputs.push(analysisOutput[pai.analysisType]);
  });
  return { default: analysisOutputs };
}
export {
  analyze as a
};
