import van from "vanjs-core";
import { Node } from "awatif-data-structure";
import { viewer } from "awatif-ui";
import { getLocalStiffness } from "./getLocalStiffness";
import { index, lusolve, subset } from "mathjs";

// prepare stiffness matrix
const nodes: Node[] = [
  [0, 0, 0],
  [0, 5, 0],
  [5, 2.5, 0],
];

const k = getLocalStiffness(nodes, 100, 0.3, 1);

// apply supports
const freeInd = [6, 7, 8]; // free Node 2
const stiffnessesFree = subset(k, index(freeInd, freeInd));

// apply forces
const forcesFree = [0, 0, 100]; // [N, My, Mx]

// solve
const deformationFree = lusolve(stiffnessesFree, forcesFree);

// Print results
const deformationSigns = new Map([
  [0, "Displacement in z"],
  [1, "Rotation around y"],
  [2, "Rotation around x"],
]);
console.table(deformationFree.map((v, i) => [v[0], deformationSigns.get(i)]));

document.body.append(
  viewer({
    structure: {
      nodes: van.state(nodes),
      elements: van.state([[0, 1, 2]]),
    },
  })
);
