import { Node } from "awatif-data-model";

export function getAverage(Nodes: Node[]): Node {
  const sum = Nodes.reduce(
    (acc, n) => [acc[0] + n[0], acc[1] + n[1], acc[2] + n[2]],
    [0, 0, 0]
  );

  const count = Nodes.length;
  return [sum[0] / count, sum[1] / count, sum[2] / count];
}
