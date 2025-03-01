import van, {State} from "vanjs-core";
import { viewer } from "awatif-ui";
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
  Matrix4
} from "three";
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Pane } from "tweakpane";

//Init
const PARAMS = {
  floors: 1,
};

const SETTINGS = {
  visualizeModel: false
};

const COL_A: number = 0.3;
const COL_B: number = 0.3;


const parametersElm = document.createElement("div");
const settingsElm = document.createElement("div");

parametersElm.setAttribute("id", "parameters");
settingsElm.setAttribute("id", "settings");

const parametersPane = new Pane({ title: "Parameters", container: parametersElm });
const settingsPane = new Pane({ title: "Settings", container: settingsElm });

parametersPane.addBinding(PARAMS, 'floors', {
  min: 1,
  max: 9,
  step: 1
});

settingsPane.addBinding(SETTINGS, "visualizeModel", {label: "solid model"});

type Building = {
  points: number[][],
  stories: number[],
  columns: number[][],
  slabs: number[][][],
  columnsByStorey: Map<number,number[]>,
  slabsByStorey: Map<number,number[]>
};

const building: State<Building> = van.state({
  points: [],
  stories: [],
  columns: [],
  slabs: [],
  slabsByStorey: new Map(),
  columnsByStorey: new Map(),
});

const firstFloorSlabPos: number [][] = [
  [0,0,4],
  [0,10,4],
  [18,10,4],
  [18,0,4],
  [0,0,4]
];

const firstFloorColumnsPos: number [][][] = [
  [[0,0,0], [0,0,4]],
  [[0,10,0], [0,10,4]],
  [[18,10,0], [18,10,4]],
  [[18,0,0], [18,0,4]],
  [[6,0,0], [6,0,4]],
  [[6,10,0], [6,10,4]]
];


addSlab(firstFloorSlabPos);
for (let k = 0; k < firstFloorColumnsPos.length; k++)
  addColumn(firstFloorColumnsPos[k]);


const solidMaterial: Material = new MeshPhongMaterial({color: 0xffffff});//0xffe6cc
const outlineMaterial = new LineBasicMaterial({color: 0xffffff});

//* OUTLINE MODEL
const slabsOutlines = createSlabOutline(building.val.points, building.val.slabs);
const columnsOutlines = createColumnsOutline(building.val.points, building.val.columns);
const objects3D: State<any> = van.state([...slabsOutlines, ...columnsOutlines]);


parametersPane.on('change', (ev) => onChange());
settingsPane.on('change', (ev) => onChange());


//* Creating relations
// building.slabsByStorey.val.set(0, [0]);
// building.slabsByStorey.val.set(5, [1]);
// building.slabsByStorey.val.set(10, [2]);

// building.columnsByStorey.val.set(0, [15, 16, 17, 18, 19, 20, 21]);
// building.columnsByStorey.val.set(5, [22, 23, 24, 25]);


//Events
van.derive(() => {
  objects3D.val = [...objects3D.rawVal]; // trigger rendering
});

document.body.append(
  viewer({objects3D}),
  parametersElm,
  settingsElm
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


  const geometry = new ExtrudeGeometry(secShape, 
    { 
      depth: height, 
      bevelEnabled: false
    }
  );

  return geometry;
}

function createSlabsGeometry(points: number[][], slabsIndices: number[][][], slabHeight: number = 0.2): BufferGeometry {
  const buffers: BufferGeometry[] = [];

  for (let k = 0; k < slabsIndices.length; k++) {
    for (let i = 0; i < slabsIndices[k].length; i++) {

      // if (slabsIndices[k].length < 3) continue;

      let elevation: number;
      elevation = points[slabsIndices[k][i][0]][2];
      const pointIdx = slabsIndices[k][i][0];
      const p = points[pointIdx];
      
      const slabShape = new Shape();
      const hole = new Path();

      if (i==0)
        slabShape.moveTo(p[0], p[1]);
      else
        hole.moveTo(p[0], p[1]);
      

      for (let j = 1; j < slabsIndices[k][i].length; j++) {
      
        const pointIdx = slabsIndices[k][i][j];
        const p = points[pointIdx];
    
        if (i==0)
          slabShape.lineTo(p[0], p[1]);
        else
          hole.lineTo(p[0], p[1]);

      }

      if (i>0) slabShape.holes = [hole];

      const geometry = new ExtrudeGeometry(slabShape, 
        { 
          depth: slabHeight, 
          bevelEnabled: false
        }
      );
        
      geometry.translate(0,0,elevation); 
      buffers.push(geometry);
    }
  }

  return mergeGeometries(buffers);
}

function createColumnsGeometry(points: any[][], columnsIndices: number[][]): BufferGeometry {
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

    const geometry = new ExtrudeGeometry(columnShape, 
      { 
        depth: height, 
        bevelEnabled: false
      }
    );

    geometry.translate(p1[0] - COL_A/2, p1[1] - COL_B/2, p1[2]);

    // const geometry = createISectionColumn(height);
    // geometry.translate(p1[0], p1[1], p1[2]);
  
    buffers.push(geometry);
  }

  return mergeGeometries(buffers);
}

function createSlabOutline(points: number[][], slabsIndices: number[][][]): Line[] {
  const lines: Line[] = [];

  for (let k = 0; k < slabsIndices.length; k++) {
    for (let i = 0; i < slabsIndices[k].length; i++) {
      const ptsArray = [];

      for (let j = 0; j < slabsIndices[k][i].length; j++) {
      
        const pointIdx = slabsIndices[k][i][j];
        const p = points[pointIdx];
    
        if (i == 0) ptsArray.push(p);
        // else {
        //   // hole
        // }
      }
      
      const geometry = new BufferGeometry().setAttribute(
        "position",
        new Float32BufferAttribute(ptsArray.flat(), 3)
      );
      
      lines.push(new Line(geometry, outlineMaterial));
      
    }
  }

  return lines;
}

function createColumnsOutline(points: any[][], columnsIndices: number[][]): Line[] {
  const lines: Line[] = [];
  
  for (let i = 0; i < columnsIndices.length; i++) {
    const p1 = points[columnsIndices[i][0]];
    const p2 = points[columnsIndices[i][1]];

    const geometry = new BufferGeometry().setAttribute(
      "position",
      new Float32BufferAttribute([p1, p2].flat(), 3)
    );
    
    lines.push(new Line(geometry, outlineMaterial));
  }

  return lines;
}

function addFloor(){
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

  for (let i = 0; i < positions.length; i++){
    building.val.points.push(positions[i]);
    idx.push(i + lastIndex);
  }
    
  building.val.slabs.push([idx]);
}

function offsetPolyline(points: number[][], offset: number): number[][] {
    if (points.length < 3) {
      console.warn("Polyline must have at least 3 points for offsetting.");
      return [];
    }
  
    const offsetPoints: number[][] = [];
    const size = points.length - 1;
  
    for (let i = 0; i < size; i++) {
      const currentPoint = new Vector2(points[i][0], points[i][1]);
      const prevPoint = points[(i - 1 + size) % size];
      const nextPoint = points[(i + 1) % size];
  
      // Calculate the two segment vectors
      const v1 = new Vector2(prevPoint[0] - currentPoint.x, prevPoint[1] - currentPoint.y);
      const v2 = new Vector2(nextPoint[0] - currentPoint.x, nextPoint[1] - currentPoint.y);
  
      // Calculate the angle between the segments
      const angle = v1.angleTo(v2);
  
      // Calculate the bisector vector
      const bisector = v1.clone().add(v2).normalize();

      // Calculate the offset direction (inward or outward)
      const offsetDirection = new Vector2(-bisector.y, bisector.x).multiplyScalar(offset); // outward
  
      // Calculate the offset point
      const offsetPoint = new Vector2(currentPoint.x, currentPoint.y).add(offsetDirection);
  
      offsetPoints.push([offsetPoint.x, offsetPoint.y, points[i][2]]);
    }
  
    return offsetPoints;
}

function onChange(){
  building.val.points = [];
  building.val.slabs = [];
  building.val.columns = [];

  const FLOOR_HEIGHT = 4;

  for (let j = 0; j < PARAMS.floors; j++) {
    const newSlabArray = [];
    const newColumnsArray = [];

    const z: number = FLOOR_HEIGHT * j;

    for (let i = 0; i < firstFloorSlabPos.length; i++)
      newSlabArray.push([firstFloorSlabPos[i][0], firstFloorSlabPos[i][1], firstFloorSlabPos[i][2] + z]);

    const contour: Vector2[] = [];
    for (let i = 0; i < newSlabArray.length; i++) {
      contour.push(new Vector2(newSlabArray[i][0], newSlabArray[i][1]));
    }
    const offsetPoints = offsetContour(COL_A/2, contour);
    const offsetNewSlabArray = [];
    for (let i = 0; i < offsetPoints.length; i++) {
      offsetNewSlabArray.push( [offsetPoints[i].x, offsetPoints[i].y, newSlabArray[0][2]] );
    }

    addSlab(SETTINGS.visualizeModel ? offsetNewSlabArray : newSlabArray);

    for (let l = 0; l < firstFloorColumnsPos.length; l++) {
      const column = firstFloorColumnsPos[l];
      newColumnsArray.push([[column[0][0], column[0][1], column[0][2] + z], [column[1][0], column[1][1], column[1][2] + z]]);
    }

    for (let k = 0; k < newColumnsArray.length; k++)
      addColumn(newColumnsArray[k]);
    
  }
  
  if (SETTINGS.visualizeModel) {
    const slabsGeometry: BufferGeometry = createSlabsGeometry(building.val.points, building.val.slabs, 0.3);
    const columnsGeometry: BufferGeometry = createColumnsGeometry(building.val.points, building.val.columns);
    const combinedGeometry: BufferGeometry = mergeGeometries([slabsGeometry, columnsGeometry]);
  
    objects3D.val = [new Mesh(combinedGeometry, solidMaterial)];
  } else {
    const slabOutlines = createSlabOutline(building.val.points, building.val.slabs);
    const columnsOutlines = createColumnsOutline(building.val.points, building.val.columns);

    objects3D.val = [...slabOutlines, ...columnsOutlines];  
  }
  
  objects3D.val = [...objects3D.rawVal];
}

function offsetContour(offset: any, contour: Vector2[]) {
  const result = [];

  offset = new BufferAttribute(new Float32Array([offset, 0, 0]), 3);

  for (let i = 0; i < contour.length - 1; i++) {
    let v1 = new Vector2().subVectors(contour[i - 1 < 0 ? contour.length - 1 : i - 1], contour[i]);
    let v2 = new Vector2().subVectors(contour[i + 1 == contour.length ? 0 : i + 1], contour[i]);
    let angle = v2.angle() - v1.angle();
    let halfAngle = angle * 0.5;

    let hA = halfAngle;
    let tA = v2.angle() + Math.PI * 0.5;

    let shift = Math.tan(hA - Math.PI * 0.5);
    let shiftMatrix = new Matrix4().set(
      1, 0, 0, 0, 
      -shift, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );


    let tempAngle = tA;
    let rotationMatrix = new Matrix4().set(
      Math.cos(tempAngle), -Math.sin(tempAngle), 0, 0,
      Math.sin(tempAngle),  Math.cos(tempAngle), 0, 0,
                        0,                    0, 1, 0,
                        0,                    0, 0, 1
    );

    let translationMatrix = new Matrix4().set(
      1, 0, 0, contour[i].x,
      0, 1, 0, contour[i].y,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );

    let cloneOffset = offset.clone();
    cloneOffset.needsUpdate = true;
    cloneOffset.applyMatrix4(shiftMatrix);
    cloneOffset.applyMatrix4(rotationMatrix);
    cloneOffset.applyMatrix4(translationMatrix);


    result.push(new Vector2(cloneOffset.getX(0), cloneOffset.getY(0)));
  }

  //added recently
  result.push(result[0]);
  return result;
}