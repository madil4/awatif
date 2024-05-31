// Note: In TypeScript, we don't have direct support for streamlit like in Python.
// You might need to find alternative ways to create web applications in TypeScript.

// Function to calculate minimum distances between bolts for timber
export function calcMinDistancesTimber(
  diameter: number,
  alpha: number
): number[] {
  // Calculate minimum distances based on given formulae
  const a1: number = (3 + 2 * Math.abs(Math.cos(alpha))) * diameter;
  const a2: number = 3 * diameter;
  const a3t: number = Math.max(7 * diameter, 80);
  const a3c: number = Math.max(
    diameter * Math.abs(Math.sin(alpha)),
    3 * diameter
  );
  const a4t: number = Math.max(
    (2 + 2 * Math.sin(alpha)) * diameter,
    3 * diameter
  );
  const a4c: number = 3 * diameter;

  // Round the calculated values and return as a list
  return [
    Math.round(a1),
    Math.round(a2),
    Math.round(a3t),
    Math.round(a3c),
    Math.round(a4t),
    Math.round(a4c),
  ];
}

// Function to calculate effective number of bolts
export function effectiveNumber(
  n_row: number,
  a_1: number,
  diameter: number
): number {
  // Calculate effective number based on given formula
  let n_ef: number = Math.pow(n_row, 0.9);
  n_ef = Math.min(
    n_row,
    Math.pow(n_row, 0.9) * (a_1 / (13 * diameter)) ** (1 / 4)
  );

  return parseFloat(n_ef.toFixed(2));
}

// Function to calculate minimum distances between bolts for steel
export function calcMinDistancesSteel(diameter: number): number[] {
  diameter += 0.6;
  // Calculate minimum distances based on given formula
  const e_1: number = 3 * diameter;
  const e_2: number = 1.5 * diameter;
  const p_1: number = 3.75 * diameter;
  const p_2: number = 3 * diameter;

  // Round the calculated values and return as a list
  return [Math.round(e_1), Math.round(e_2), Math.round(p_1), Math.round(p_2)];
}

export function roundToBase(x: number, base: number): number {
  return base * Math.round(x / base);
}

export function calcMaxDistances(
  minDistancesListTimber: number[],
  minDistancesListSteel: number[],
  base: number
): number[] {
  const a1: number = roundToBase(
    Math.max(minDistancesListTimber[0], minDistancesListSteel[2]),
    base
  );
  const a2: number = 
    Math.max(minDistancesListTimber[1], minDistancesListSteel[3]) * 1.3
  const a3t: number = roundToBase(minDistancesListTimber[2], base);
  const a3c: number = roundToBase(minDistancesListTimber[3], base);
  const a3: number = Math.max(a3t, a3c, minDistancesListSteel[0]) * 3;
  const a4t: number = Math.max(minDistancesListTimber[4], minDistancesListSteel[1])
  const a4c: number = Math.max(minDistancesListTimber[5], minDistancesListSteel[1])
  const a4: number = Math.max(a4t, a4c) * 2;
  const e1: number = roundToBase(minDistancesListSteel[0], base);

  const distancesListRequired: number[] = [a1, a2, a3, a4, e1];

  return distancesListRequired;
}

export function getDistances(fastenerDiameter: number): number[][] {
  const minDistancesListTimber: number[] = calcMinDistancesTimber(
    fastenerDiameter,
    0
  );
  const minDistancesListSteel: number[] =
    calcMinDistancesSteel(fastenerDiameter);
  const distancesListRequired: number[] = calcMaxDistances(
    minDistancesListTimber,
    minDistancesListSteel,
    1
  );

  return [minDistancesListTimber, minDistancesListSteel, distancesListRequired];
}
