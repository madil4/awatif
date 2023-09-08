type Position = [number, number, number];

export const convertAxesToAwatif = (position: Position): Position => [
  position[0],
  position[2],
  -position[1],
];

export const convertAxesToThreeJS = (position: Position): Position => [
  position[0],
  -position[2],
  position[1],
];
