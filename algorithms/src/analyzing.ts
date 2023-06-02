import * as mathjs from "mathjs";
import { deforming } from "./deforming";

export const analyzing = (nodes: any, elements: any, assignments: any) => {
  const deformedNodes = deforming(nodes, elements, assignments);

  const bars: Map<number, { area: number; material: number }> = new Map();
  assignments?.forEach((a: any) => {
    if ("section" in a && "material" in a) {
      const { width, height } = extractDimensions(a.section);

      bars.set(a.element, {
        area: width * height,
        material: a.material,
      });
    }
  });

  const results: any[] = [];

  elements.forEach((e: any, i: any) => {
    const bar = bars.get(i) ?? { area: 0, material: 0 };
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
      stress: roundTo2(strain * bar.material),
      force: roundTo2(strain * bar.material * bar.area),
    });
  });

  nodes.forEach((node: any, index: any) => {
    results.push({
      node: index,
      displacement: mathjs
        .subtract(deformedNodes[index], node)
        .map((v: number) => roundTo2(v)),
    });
  });

  return results;
};

function extractDimensions(section: string): {
  width: number;
  height: number;
} {
  const numbers = section.substring(1).split("x");
  return {
    width: (parseInt(numbers[0]) || 1) * 1e-3,
    height: (parseInt(numbers[1]) || 1) * 1e-3,
  };
}

const roundTo2 = (number: number) => Math.round(number * 1000) / 1000;
