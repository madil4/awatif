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

  let angle = (beamAngle * 180) / Math.PI;

  //console.log("c_height" , beamHeight)
  //console.log("c_distances" , a1, a2, a3, a4, e1)
  //console.log("c_angle" , beamAngle)
  //console.log("c_axial" , noAxial)
  //console.log("c_perp" , noPerp)

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
  const [rotatedX, rotatedY] = rotateAroundPoint(
    xCoords,
    yCoords,
    beamAngle,
    [0, 0]
  );

  // console.log("xCoords:", xCoords)

  // Return the coordinates as an object
  return [xCoords, yCoords];
}

/**
 * Rotate a set of points around a given point by a specified angle
 * @param xCoords - Array of x coordinates
 * @param yCoords - Array of y coordinates
 * @param angle - Angle in degrees
 * @param origin - Array containing x and y coordinates of the rotation origin
 * @returns - Rotated x and y coordinate arrays
 */

function rotateAroundPoint(
  xCoords: number[],
  yCoords: number[],
  angle: number,
  origin: [number, number]
): [number[], number[]] {
  const angleRad = (angle * Math.PI) / 180;
  const [originX, originY] = origin;
  const rotatedX: number[] = [];
  const rotatedY: number[] = [];

  for (let i = 0; i < xCoords.length; i++) {
    const x = xCoords[i] - originX;
    const y = yCoords[i] - originY;
    const rotatedXCoord =
      x * Math.cos(angleRad) - y * Math.sin(angleRad) + originX;
    const rotatedYCoord =
      x * Math.sin(angleRad) + y * Math.cos(angleRad) + originY;
    rotatedX.push(rotatedXCoord);
    rotatedY.push(rotatedYCoord);
  }

  return [rotatedX, rotatedY];
}
