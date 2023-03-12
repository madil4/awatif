import {
  Assignment,
  AssignmentType,
  Element,
  Model,
  Node,
  Parameters,
} from "../../../src/interfaces";

export function modeling(parameters: Parameters): Model {
  const nodes: Node[] = [];
  const elements: Element[] = [];

  let xLength = parameters.width.value as number;
  let xSpan = parameters.xSpan.value as number;
  let zLength = parameters.breadth.value as number;
  let zSpan = parameters.ySpan.value as number;
  const yLength = parameters.height.value as number;
  let ySpan = parameters.zSpan.value as number;
  const mainDirX = parameters.mainDirX.value;
  let spacing = parameters.spacing.value as number;

  if (xSpan > xLength) xSpan = xLength;
  if (zSpan > zLength) zSpan = zLength;
  if (ySpan > yLength) ySpan = yLength;
  let xDivision = 1;
  let zDivision = 1;
  const yDivision = Math.round(yLength / ySpan + 1);
  if (mainDirX) {
    if (spacing > xSpan) spacing = xSpan;
    xSpan = Math.round(xSpan / spacing) * spacing;
    xLength = Math.round(xLength / spacing) * spacing;
    xDivision = Math.round(xLength / spacing + 1);
    zDivision = Math.round(zLength / zSpan + 1);
  } else {
    if (spacing > zSpan) spacing = zSpan;
    zSpan = Math.round(zSpan / spacing) * spacing;
    zLength = Math.round(zLength / spacing) * spacing;
    zDivision = Math.round(zLength / spacing + 1);
    xDivision = Math.round(xLength / xSpan + 1);
  }

  let grid = new Array(xDivision)
    .fill(0)
    .map(() =>
      new Array(yDivision).fill(0).map(() => Array(zDivision).fill(0))
    );
  let i = 0;
  for (let x = 0; x < xDivision; x++) {
    for (let y = 0; y < yDivision; y++) {
      for (let z = 0; z < zDivision; z++) {
        grid[x][y][z] = i;

        const xOffset = -xLength / 2;
        const yOffset = -10;
        const zOffset = -zLength / 2;

        if (mainDirX) {
          nodes.push([
            x * spacing > xLength
              ? (x - 1) * spacing + xOffset
              : x * spacing + xOffset,
            y * ySpan > yLength
              ? (y - 1) * ySpan + yOffset
              : y * ySpan + yOffset,
            z * zSpan > zLength
              ? (z - 1) * zSpan + zOffset
              : z * zSpan + zOffset,
          ]);
        } else {
          nodes.push([
            x * xSpan > xLength
              ? (x - 1) * xSpan + xOffset
              : x * xSpan + xOffset,
            y * ySpan > yLength
              ? (y - 1) * ySpan + yOffset
              : y * ySpan + yOffset,
            z * spacing > zLength
              ? (z - 1) * spacing + zOffset
              : z * spacing + zOffset,
          ]);
        }
        i++;
      }
    }
  }

  // columns
  const columns: number[] = [];
  for (let x = 0; x < xDivision; x++) {
    for (let y = 0; y < yDivision - 1; y++) {
      for (let z = 0; z < zDivision; z++) {
        if (mainDirX) {
          if ((x * spacing) % xSpan == 0 || (x * spacing) % xLength == 0) {
            elements.push([grid[x][y][z], grid[x][y + 1][z]]);
            columns.push(elements.length - 1);
          }
        } else {
          if ((z * spacing) % zSpan == 0 || (z * spacing) % zLength == 0) {
            elements.push([grid[x][y][z], grid[x][y + 1][z]]);
            columns.push(elements.length - 1);
          }
        }
      }
    }
  }

  const mainBeamsX: number[] = [];
  const mainBeamsZ: number[] = [];
  const secondaryBeamsX: number[] = [];
  const secondaryBeamsZ: number[] = [];
  if (mainDirX) {
    // main beams in x
    for (let x = 0; x < xDivision - 1; x++) {
      for (let y = 1; y < yDivision; y++) {
        for (let z = 0; z < zDivision; z++) {
          elements.push([grid[x][y][z], grid[x + 1][y][z]]);
          mainBeamsX.push(elements.length - 1);
        }
      }
    }
    // secondary beams in z
    for (let x = 0; x < xDivision; x++) {
      for (let y = 1; y < yDivision; y++) {
        for (let z = 0; z < zDivision - 1; z++) {
          elements.push([grid[x][y][z], grid[x][y][z + 1]]);
          secondaryBeamsX.push(elements.length - 1);
        }
      }
    }
  } else {
    // main beams in z
    for (let x = 0; x < xDivision; x++) {
      for (let y = 1; y < yDivision; y++) {
        for (let z = 0; z < zDivision - 1; z++) {
          elements.push([grid[x][y][z], grid[x][y][z + 1]]);
          mainBeamsZ.push(elements.length - 1);
        }
      }
    }
    // secondary beams in x
    for (let x = 0; x < xDivision - 1; x++) {
      for (let y = 1; y < yDivision; y++) {
        for (let z = 0; z < zDivision; z++) {
          elements.push([grid[x][y][z], grid[x + 1][y][z]]);
          secondaryBeamsZ.push(elements.length - 1);
        }
      }
    }
  }

  return {
    nodes,
    elements,
    assignments: [
      ...columns.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barProperties,
            area: 10,
            elasticity: 20,
            section: "500x500",
          } as Assignment)
      ),
      ...mainBeamsX.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barProperties,
            area: 10,
            elasticity: 20,
            section: "300x500",
          } as Assignment)
      ),
      ...mainBeamsZ.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barProperties,
            area: 10,
            elasticity: 20,
            section: "500x300",
          } as Assignment)
      ),
      ...secondaryBeamsX.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barProperties,
            area: 10,
            elasticity: 20,
            section: "300x100",
          } as Assignment)
      ),
      ...secondaryBeamsZ.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barProperties,
            area: 10,
            elasticity: 20,
            section: "100x300",
          } as Assignment)
      ),
    ],
  };
}

// Useful function but not used here, I don't know where to put it for future use
function copy(
  nodes: Node[],
  elements: Element[],
  targetElements: Element[],
  spacing: number[],
  repetitions: number
) {
  const nodesIndex = nodes.length;
  const numElements = targetElements.length;
  const newElements: Element[] = [];

  for (let i = 0; i < repetitions; i++) {
    targetElements.forEach((element, e) => {
      const p0 = nodes[element[0]];
      const p1 = nodes[element[1]];
      const dx = spacing[0] * (i + 1);
      const dy = spacing[1] * (i + 1);
      const dz = spacing[2] * (i + 1);
      const p0New = [p0[0] + dx, p0[1] + dy, p0[2] + dz];
      const p1New = [p1[0] + dx, p1[1] + dy, p1[2] + dz];

      nodes.push(p0New as any);
      nodes.push(p1New as any);

      const newElement: Element = [
        nodesIndex + i * 2 * numElements + e * 2,
        nodesIndex + i * 2 * numElements + e * 2 + 1,
      ];
      elements.push(newElement);
      newElements.push(newElement);
    });
  }

  return newElements;
}
