export const getPositions = (
  connectivities: [number, number][],
  positions: [number, number, number][]
): number[] => {
  const newPositions: [number, number, number][] = [];
  connectivities.forEach((point) => {
    newPositions.push(positions[point[0]]);
    newPositions.push(positions[point[1]]);
  });

  return newPositions.flat();
};
