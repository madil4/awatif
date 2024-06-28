import { app, Parameters, Model } from "awatif-ui";
import { Node, Element } from "awatif-data-structure";

const parameters: Parameters = {
  width: {
    value: 18,
    min: 10,
    max: 20,
    step: 2,
  },
  breadth: {
    value: 12,
    min: 10,
    max: 20,
    step: 2,
  },
  height: {
    value: 12,
    min: 4,
    max: 20,
    step: 2,
  },
  xSpan: {
    value: 6,
    min: 2,
    max: 20,
    step: 2,
  },
  ySpan: {
    value: 6,
    min: 2,
    max: 20,
    step: 2,
  },
  zSpan: {
    value: 4,
    min: 2,
    max: 20,
    step: 2,
  },
  spacing: {
    value: 1,
    min: 0.5,
    max: 5,
    step: 0.5,
  },
  mainDirX: {
    value: true as any,
    label: "toggle direction",
  },
};

function onParameterChange(parameters: Parameters): Model {
  const nodes: Node[] = [];
  const elements: Element[] = [];

  let xLength = parameters.width.value;
  let yLength = parameters.breadth.value;
  let zLength = parameters.height.value;
  let xSpan = parameters.xSpan.value;
  let ySpan = parameters.ySpan.value;
  let zSpan = parameters.zSpan.value;
  const mainDirX = parameters.mainDirX.value;
  let spacing = parameters.spacing.value;

  if (xSpan > xLength) xSpan = xLength;
  if (ySpan > yLength) ySpan = yLength;
  if (zSpan > zLength) zSpan = zLength;
  let xDivision = 1;
  let yDivision = 1;
  const zDivision = Math.round(zLength / zSpan + 1);
  if (mainDirX) {
    if (spacing > xSpan) spacing = xSpan;
    xSpan = Math.round(xSpan / spacing) * spacing;
    xLength = Math.round(xLength / spacing) * spacing;
    xDivision = Math.round(xLength / spacing + 1);
    yDivision = Math.round(yLength / ySpan + 1);
  } else {
    if (spacing > ySpan) spacing = ySpan;
    ySpan = Math.round(ySpan / spacing) * spacing;
    yLength = Math.round(yLength / spacing) * spacing;
    yDivision = Math.round(yLength / spacing + 1);
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

        const xOffset = 0;
        const yOffset = 2;
        const zOffset = 0;

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
            y * spacing > yLength
              ? (y - 1) * spacing + yOffset
              : y * spacing + yOffset,
            z * zSpan > zLength
              ? (z - 1) * zSpan + zOffset
              : z * zSpan + zOffset,
          ]);
        }
        i++;
      }
    }
  }

  // columns
  const columns: number[] = [];
  for (let x = 0; x < xDivision; x++) {
    for (let y = 0; y < yDivision; y++) {
      for (let z = 0; z < zDivision - 1; z++) {
        if (mainDirX) {
          if ((x * spacing) % xSpan == 0 || (x * spacing) % xLength == 0) {
            elements.push([grid[x][y][z], grid[x][y][z + 1]]);
            columns.push(elements.length - 1);
          }
        } else {
          if ((y * spacing) % ySpan == 0 || (y * spacing) % yLength == 0) {
            elements.push([grid[x][y][z], grid[x][y][z + 1]]);
            columns.push(elements.length - 1);
          }
        }
      }
    }
  }

  const mainBeamsX: number[] = [];
  const mainBeamsY: number[] = [];
  const secondaryBeamsX: number[] = [];
  const secondaryBeamsY: number[] = [];
  if (mainDirX) {
    // main beams in x
    for (let x = 0; x < xDivision - 1; x++) {
      for (let y = 0; y < yDivision; y++) {
        for (let z = 1; z < zDivision; z++) {
          elements.push([grid[x][y][z], grid[x + 1][y][z]]);
          mainBeamsX.push(elements.length - 1);
        }
      }
    }
    // secondary beams in y
    for (let x = 0; x < xDivision; x++) {
      for (let y = 0; y < yDivision - 1; y++) {
        for (let z = 1; z < zDivision; z++) {
          elements.push([grid[x][y][z], grid[x][y + 1][z]]);
          secondaryBeamsX.push(elements.length - 1);
        }
      }
    }
  } else {
    // main beams in y
    for (let x = 0; x < xDivision; x++) {
      for (let y = 0; y < yDivision - 1; y++) {
        for (let z = 1; z < zDivision; z++) {
          elements.push([grid[x][y][z], grid[x][y + 1][z]]);
          mainBeamsY.push(elements.length - 1);
        }
      }
    }
    // secondary beams in x
    for (let x = 0; x < xDivision - 1; x++) {
      for (let y = 0; y < yDivision; y++) {
        for (let z = 1; z < zDivision; z++) {
          elements.push([grid[x][y][z], grid[x + 1][y][z]]);
          secondaryBeamsY.push(elements.length - 1);
        }
      }
    }
  }

  return { nodes, elements };
}

app({
  parameters,
  onParameterChange,
  settings: {
    nodes: false,
  },
});
