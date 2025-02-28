import { NodeInputs } from "awatif-data-structure";

export function getFreeIndices(
  supportsInputs: NodeInputs["supports"],
  dof: number
): number[] {
  // To remove from free indices due to supports
  const toRemoveSupports: number[] = [];
  supportsInputs?.forEach((support, index) => {
    if (support[0]) toRemoveSupports.push(index * 6);
    if (support[1]) toRemoveSupports.push(index * 6 + 1);
    if (support[2]) toRemoveSupports.push(index * 6 + 2);
    if (support[3]) toRemoveSupports.push(index * 6 + 3);
    if (support[4]) toRemoveSupports.push(index * 6 + 4);
    if (support[5]) toRemoveSupports.push(index * 6 + 5);
  });

  return Array(dof)
    .fill(0)
    .map((_, i) => i)
    .filter((v) => !toRemoveSupports.includes(v));
}
