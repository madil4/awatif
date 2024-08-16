import { AnalysisInputs, Element } from "awatif-data-structure";

export function getFreeIndices(
  supportsInputs: AnalysisInputs["pointSupports"],
  sectionInputs: AnalysisInputs["sections"],
  elements: Element[],
  dof: number
): number[] {
  const supportsIndexes: number[] = [];
  supportsInputs?.forEach((support, index) => {
    if (support[0]) supportsIndexes.push(index * 6);
    if (support[1]) supportsIndexes.push(index * 6 + 1);
    if (support[2]) supportsIndexes.push(index * 6 + 2);
    if (support[3]) supportsIndexes.push(index * 6 + 3);
    if (support[4]) supportsIndexes.push(index * 6 + 4);
    if (support[5]) supportsIndexes.push(index * 6 + 5);
  });

  const barNodes = new Set<number>();
  sectionInputs?.forEach((section, index) => {
    if (!section.momentOfInertiaY && !section.momentOfInertiaZ) {
      const element = elements[index];
      barNodes.add(element[0]);
      barNodes.add(element[1]);
    }
  });

  const rotationIndexes: number[] = [];
  barNodes.forEach((index) => {
    rotationIndexes.push(index * 6 + 3);
    rotationIndexes.push(index * 6 + 4);
    rotationIndexes.push(index * 6 + 5);
  });

  return Array(dof)
    .fill(0)
    .map((_, i) => i)
    .filter(
      (v) => !supportsIndexes.includes(v) && !rotationIndexes.includes(v)
    );
}
