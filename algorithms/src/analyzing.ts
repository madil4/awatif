import * as mathjs from "mathjs";
import { deforming } from "./deforming";

export const analyzing = (nodes: any, elements: any, assignments: any) => {
  const { deformedNodes, forces } = deforming(nodes, elements, assignments);

  const bars: Map<number, { area: number; elasticity: number }> = new Map();
  const supports: number[] = [];
  assignments?.forEach((a: any) => {
    if ("area" in a && "elasticity" in a)
      bars.set(a.element, { area: a.area, elasticity: a.elasticity });
    if ("support" in a && "node" in a) supports.push(a.node);
  });

  const results: any[] = [];
  elements.forEach((e: any, i: any) => {
    const bar = bars.get(i) ?? { area: 0, elasticity: 0 };
    const undeformedLength = mathjs.norm(
      mathjs.subtract(nodes[e[1]], nodes[e[0]])
    ) as number;
    const deformedLength = mathjs.norm(
      mathjs.subtract(deformedNodes[e[1]], deformedNodes[e[0]])
    ) as number;
    const strain = (deformedLength - undeformedLength) / deformedLength;
    results.push({
      element: i,
      strain: roundTo2(strain),
      stress: roundTo2(strain * bar.elasticity),
      force: roundTo2(strain * bar.elasticity * bar.area),
    });
  });

  nodes.forEach((node: any, index: any) => {
    results.push({
      node: index,
      displacement: mathjs
        .subtract(deformedNodes[index], node)
        .map((v: number) => roundTo2(v)),
    });

    if (supports.includes(index)) {
      results.push({
        node: index,
        reaction: [
          roundTo2(forces[index * 3] as number),
          roundTo2(forces[index * 3 + 1] as number),
          roundTo2(forces[index * 3 + 2] as number),
        ],
      });
    }
  });

  return results;
};

const roundTo2 = (number: number) => Math.round(number * 1000) / 1000;
