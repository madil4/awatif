import van, { State } from "vanjs-core";
import { getViewer } from "awatif-ui";
import {
  Mesh,
  Shape,
  ExtrudeGeometry,
  MeshPhongMaterial,
  BufferGeometry,
  Material,
  Path,
  LineBasicMaterial,
  Line,
  Float32BufferAttribute,
  Vector2,
  BufferAttribute,
  Matrix4,
  BoxGeometry,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Pane } from "tweakpane";
import { Node, Element } from "awatif-fem";
// import { Building } from "awatif-fem";

//Init
type Building = {
  points: number[][];
  stories: number[];
  columns: number[][];
  slabs: number[][][];
  columnsByStorey: Map<number, number[]>;
  slabsByStorey: Map<number, number[]>;
};

//Init
const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);

const PARAMS = {
  floors: 1,
};

const COL_A: number = 0.3;
const COL_B: number = 0.3;

const parametersElm = document.createElement("div");
parametersElm.setAttribute("id", "parameters");

const parametersPane = new Pane({
  title: "Parameters",
  container: parametersElm,
});

parametersPane.addBinding(PARAMS, "floors", {
  min: 1,
  max: 12,
  step: 1,
});

const building: State<Building> = van.state({
  points: [],
  stories: [],
  columns: [],
  slabs: [],
  slabsByStorey: new Map(),
  columnsByStorey: new Map(),
});

const firstFloorSlabPos: number[][] = [
  [0, 0, 4],
  [0, 10, 4],
  [18, 10, 4],
  [18, 0, 4],
  [0, 0, 4],
];

const firstFloorColumnsPos: number[][][] = [
  [
    [0, 0, 0],
    [0, 0, 4],
  ],
  [
    [0, 10, 0],
    [0, 10, 4],
  ],
  [
    [18, 10, 0],
    [18, 10, 4],
  ],
  [
    [18, 0, 0],
    [18, 0, 4],
  ],
  [
    [6, 0, 0],
    [6, 0, 4],
  ],
  [
    [6, 10, 0],
    [6, 10, 4],
  ],
];

addSlab(firstFloorSlabPos);

for (let k = 0; k < firstFloorColumnsPos.length; k++)
  addColumn(firstFloorColumnsPos[k]);

const material: Material = new MeshPhongMaterial({ color: 0xffe6cc });
const slabsGeometry: BufferGeometry = createSlabsGeometry(
  building.val.points,
  building.val.slabs,
  0.3
);
const columnsGeometry: BufferGeometry = createColumnsGeometry(
  building.val.points,
  building.val.columns
);
const combinedGeometry: BufferGeometry = mergeGeometries([
  slabsGeometry,
  columnsGeometry,
]);
const objects3D: State<Mesh[]> = van.state([
  new Mesh(combinedGeometry, material),
]);

parametersPane.on("change", (ev) => onChange());

//* Creating relations
// building.slabsByStorey.val.set(0, [0]);
// building.slabsByStorey.val.set(5, [1]);
// building.slabsByStorey.val.set(10, [2]);

// building.columnsByStorey.val.set(0, [15, 16, 17, 18, 19, 20, 21]);
// building.columnsByStorey.val.set(5, [22, 23, 24, 25]);

//Events
van.derive(() => {
  nodesState.val = building.val.points as Node[];
  elementsState.val = [];
  elementsState.val.push(...(building.val.columns as Element[]));
  for (let i = 0; i < building.val.slabs.length; i++) {
    const slab = building.val.slabs[i];
    elementsState.val.push(...createPairs(slab[0]));
  }

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
});

document.body.append(
  getViewer({
    structure: {
      nodes: nodesState,
      elements: elementsState,
    },
    settingsObj: {
      nodes: true,
      solidModel: false,
    },
    objects3D,
  }),
  parametersElm
);

//Utils
function createISectionColumn(height: number): BufferGeometry {
  const secShape = new Shape();

  secShape.lineTo(0.2, 0);
  secShape.lineTo(0.2, 0.02);
  secShape.lineTo(0.12, 0.02);
  secShape.lineTo(0.12, 0.18);
  secShape.lineTo(0.2, 0.18);
  secShape.lineTo(0.2, 0.2);
  secShape.lineTo(0, 0.2);
  secShape.lineTo(0, 0.18);
  secShape.lineTo(0.08, 0.18);
  secShape.lineTo(0.08, 0.02);
  secShape.lineTo(0, 0.02);

  const geometry = new ExtrudeGeometry(secShape, {
    depth: height,
    bevelEnabled: false,
  });

  return geometry;
}

function createSlabsGeometry(
  points: number[][],
  slabsIndices: number[][][],
  slabHeight: number = 0.2
): BufferGeometry {
  const buffers: BufferGeometry[] = [];

  for (let k = 0; k < slabsIndices.length; k++) {
    for (let i = 0; i < slabsIndices[k].length; i++) {
      const contour: number[][] = [];
      for (let j = 0; j < slabsIndices[k][i].length; j++) {
        const pointIdx = slabsIndices[k][i][j];
        contour.push(points[pointIdx]);
      }

      const offsetedContour = offsetContour(contour, COL_A / 2);

      const slabShape = new Shape();
      const hole = new Path();
      for (let i = 0; i < offsetedContour.length; i++) {
        if (i == 0)
          slabShape.moveTo(offsetedContour[0][0], offsetedContour[0][1]);
        else slabShape.lineTo(offsetedContour[i][0], offsetedContour[i][1]);
      }

      const geometry = new ExtrudeGeometry(slabShape, {
        depth: slabHeight,
        bevelEnabled: false,
      });

      geometry.translate(0, 0, offsetedContour[0][2]);
      buffers.push(geometry);
    }
  }

  return mergeGeometries(buffers);
}

function createColumnsGeometry(
  points: any[][],
  columnsIndices: number[][]
): BufferGeometry {
  const buffers: BufferGeometry[] = [];
  const a: number = 0.3;
  const b: number = 0.3;

  const columnShape = new Shape();

  // columns base
  columnShape.lineTo(0 + COL_A, 0);
  columnShape.lineTo(0 + COL_A, 0 + COL_B);
  columnShape.lineTo(0, 0 + COL_B);

  for (let i = 0; i < columnsIndices.length; i++) {
    const p1 = points[columnsIndices[i][0]];
    const p2 = points[columnsIndices[i][1]];

    const height = p2[2] - p1[2];

    const geometry = new ExtrudeGeometry(columnShape, {
      depth: height,
      bevelEnabled: false,
    });

    geometry.translate(p1[0] - COL_A / 2, p1[1] - COL_B / 2, p1[2]);

    // const geometry = createISectionColumn(height);
    // geometry.translate(p1[0], p1[1], p1[2]);

    buffers.push(geometry);
  }

  return mergeGeometries(buffers);
}

function addLevel() {
  // addColumns();
  // addSlab();
}

function addColumn(positions: number[][], lastPntIdx?: number): void {
  const lastIndex = building.val.points.length;

  building.val.points.push(...positions);
  building.val.columns.push([lastIndex, lastIndex + 1]);
}

function addSlab(positions: number[][], lastPntIdx?: number): void {
  const lastIndex = building.val.points.length;
  const idx = [];

  for (let i = 0; i < positions.length; i++) {
    building.val.points.push(positions[i]);

    //TODO
    // nodesState.val.push(positions[i])

    idx.push(i + lastIndex);
  }

  building.val.slabs.push([idx]);
}

function onChange() {
  building.val.points = [];
  building.val.slabs = [];
  building.val.columns = [];

  const FLOOR_HEIGHT = 4;

  for (let j = 0; j < PARAMS.floors; j++) {
    const newSlabArray = [];
    const newColumnsArray = [];

    const z: number = FLOOR_HEIGHT * j;

    for (let i = 0; i < firstFloorSlabPos.length; i++)
      newSlabArray.push([
        firstFloorSlabPos[i][0],
        firstFloorSlabPos[i][1],
        firstFloorSlabPos[i][2] + z,
      ]);

    addSlab(newSlabArray);

    for (let l = 0; l < firstFloorColumnsPos.length; l++) {
      const column = firstFloorColumnsPos[l];
      newColumnsArray.push([
        [column[0][0], column[0][1], column[0][2] + z],
        [column[1][0], column[1][1], column[1][2] + z],
      ]);
    }

    for (let k = 0; k < newColumnsArray.length; k++)
      addColumn(newColumnsArray[k]);
  }

  const slabsGeometry: BufferGeometry = createSlabsGeometry(
    building.val.points,
    building.val.slabs,
    0.3
  );
  const columnsGeometry: BufferGeometry = createColumnsGeometry(
    building.val.points,
    building.val.columns
  );
  const combinedGeometry: BufferGeometry = mergeGeometries([
    slabsGeometry,
    columnsGeometry,
  ]);
  objects3D.val = [new Mesh(combinedGeometry, material)];

  nodesState.val = building.val.points as Node[];
  elementsState.val = [];
  elementsState.val.push(...(building.val.columns as Element[]));
  for (let i = 0; i < building.val.slabs.length; i++) {
    const slab = building.val.slabs[i];
    elementsState.val.push(...createPairs(slab[0]));
  }

  objects3D.val = [...objects3D.rawVal];
}

function offsetContour(contour: number[][], offset: number = 0): number[][] {
  const result: number[][] = [];

  const _contour: Vector2[] = [];

  for (let i = 0; i < contour.length; i++)
    _contour.push(new Vector2(contour[i][0], contour[i][1]));

  let _offset = new BufferAttribute(new Float32Array([offset, 0, 0]), 3);

  for (let i = 0; i < _contour.length - 1; i++) {
    let v1 = new Vector2().subVectors(
      _contour[i - 1 < 0 ? _contour.length - 1 : i - 1],
      _contour[i]
    );
    let v2 = new Vector2().subVectors(
      _contour[i + 1 == _contour.length ? 0 : i + 1],
      _contour[i]
    );
    let angle = v2.angle() - v1.angle();
    let halfAngle = angle * 0.5;

    let hA = halfAngle;
    let tA = v2.angle() + Math.PI * 0.5;

    let shift = Math.tan(hA - Math.PI * 0.5);
    let shiftMatrix = new Matrix4().set(
      1,
      0,
      0,
      0,
      -shift,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );

    let tempAngle = tA;
    let rotationMatrix = new Matrix4().set(
      Math.cos(tempAngle),
      -Math.sin(tempAngle),
      0,
      0,
      Math.sin(tempAngle),
      Math.cos(tempAngle),
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );

    let translationMatrix = new Matrix4().set(
      1,
      0,
      0,
      _contour[i].x,
      0,
      1,
      0,
      _contour[i].y,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );

    let cloneOffset = _offset.clone();
    cloneOffset.needsUpdate = true;
    cloneOffset.applyMatrix4(shiftMatrix);
    cloneOffset.applyMatrix4(rotationMatrix);
    cloneOffset.applyMatrix4(translationMatrix);

    result.push([cloneOffset.getX(0), cloneOffset.getY(0), contour[i][2]]);
  }

  return result;
}

function createPairs(arr: number[]): any[] {
  // Return empty array for invalid input
  if (!arr || arr.length < 2) return [];

  const result = [];
  for (let i = 0; i < arr.length - 1; i++) {
    result.push([arr[i], arr[i + 1]]);
  }
  return result;
}
