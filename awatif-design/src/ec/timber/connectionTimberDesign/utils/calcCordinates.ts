/**
 * Calculates the fastener coordinates for a given beam
 * @param distancesFinal - An array containing the distances needed for the calculation
 * @param beamAngle - The angle of the beam in degrees
 * @param baseHeight - The height of the base beam structure
 * @param beamHeight - The specific beam's height
 * @param noAxial - Number of axial fasteners
 * @param noPerp - Number of perpendicular fasteners
 * @returns - An object containing arrays of x and y coordinates
 */
export function calcFastenerCoordinates(
  distancesFinal: number[],
  beamAngle: number,
  beamHeight: number,
  noAxial: number,
  noPerp: number
): [xCoordinates: number[], yCoordinates: number[]] {
  // Extract individual distance parameters
  const [a1, a2, a3, a4, e1] = distancesFinal;

  // Calculate the x and y gaps based on beam angle
  const gapX = 0;
  const gapY = 0;

  // Generate x and y coordinates for fasteners
  const xCoordsFastener = Array.from(
    { length: noAxial },
    (_, i) => 2 * a3 + a1 * i + gapX
  );
  const yCoordsFastener = Array.from(
    { length: noPerp },
    (_, i) => a4 + a2 * i + gapY - beamHeight / 2
  );

  // Combine the x and y coordinates into pairs
  const combinedLists: [number, number][] = [];
  for (const x of xCoordsFastener) {
    for (const y of yCoordsFastener) {
      combinedLists.push([x, y]);
    }
  }

  // Separate back into x and y lists and rotate them
  const xCoords = combinedLists.map(([x, _]) => x);
  const yCoords = combinedLists.map(([_, y]) => y);

  // Return the coordinates as an object
  return [xCoords, yCoords];
}
