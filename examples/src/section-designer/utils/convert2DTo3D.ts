export function convert2DTo3D(
  positions2D: number[],
  dimensionMap: {
    x: number;
    y: number;
  },
  defaultValue: number = 0
): number[] {
  const positions3D = [];

  for (let i = 0; i < positions2D.length; i += 2) {
    const x = positions2D[i];
    const y = positions2D[i + 1];

    let position3D = [defaultValue, defaultValue, defaultValue];
    position3D[dimensionMap['x']] = x;
    position3D[dimensionMap['y']] = y;

    positions3D.push(position3D); // Add zValue for the third dimension
  }

  return positions3D.flat();
}
