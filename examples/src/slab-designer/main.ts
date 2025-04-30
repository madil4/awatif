import van, { State } from "vanjs-core";
import {
  Mesh,
  Shape,
  ExtrudeGeometry,
  MeshPhongMaterial,
  BufferGeometry,
  Path,
  Vector2,
  BufferAttribute,
  Matrix4,
  LineSegments,
  LineBasicMaterial,
  Object3D,
  Float32BufferAttribute,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { getToolbar, getViewer, Drawing } from "awatif-ui";
import { Element, Node } from "awatif-fem";
import { toolbar } from "./toolbar.js";

// Snap Tip
import { initSnapTip } from "./snapTip.js";
initSnapTip();

// Enums and Types
enum DrawingLevel {
  first = "1st-floor",
  second = "2nd-floor",
}

//Init
type Building = {
  points: State<number[][]>;
  columns: State<number[][]>; // [start, end] Todo: change to [end] get start from the story below
  slabs: State<number[][][]>;
};

const building: Building = {
  points: van.state([]),
  columns: van.state([]),
  slabs: van.state([]),
};

const solidsMesh = new Mesh(
  new BufferGeometry(),
  new MeshPhongMaterial({ color: 0xffe6cc })
);
const base = new LineSegments(new BufferGeometry(), new LineBasicMaterial());
base.frustumCulled = false;
base.material.depthTest = false;

const objects3D: State<Object3D[]> = van.state([base]);
const solids: State<Object3D[]> = van.state([solidsMesh]);

//* Drawing Data (Points - Polylines)
const drawingColumnPoints: Drawing["points"] = van.state([]);
const drawingSlabPoints: Drawing["points"] = van.state([]);

const drawingColumnPolylines: Drawing["polylines"] = van.state([]);
const drawingSlabPolylines: Drawing["polylines"] = van.state([]);

const totalDrawingPoints: Drawing["points"] = van.state([]);
const totalDrawingPolylines: Drawing["polylines"] = van.state([]);



const gridTarget = van.state({
  position: [10, 10, 0] as [number, number, number],
  rotation: [Math.PI / 2, 0, 0] as [number, number, number],
});

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);

const FLOOR_HEIGHT: number = 3;

//* Events
// On toolbar click, update grid target and points
let activeFloor: DrawingLevel = DrawingLevel.first;

function onToolbarClick(floor: DrawingLevel) {
  activeFloor = floor;

  gridTarget.val = {
    position: [10, 10, floor == DrawingLevel.first ? 0 : FLOOR_HEIGHT] as [number, number, number],
    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
  };

  totalDrawingPoints.val = floor === DrawingLevel.first ? drawingColumnPoints.val : drawingSlabPoints.val;
  totalDrawingPolylines.val = floor === DrawingLevel.first ? drawingColumnPolylines.val : drawingSlabPolylines.val;
}

// On point or polyline change, update floor points
van.derive(() => {
  if (activeFloor == DrawingLevel.first) {
    drawingColumnPoints.val = totalDrawingPoints.val;
    drawingColumnPolylines.val = totalDrawingPolylines.val;
  }
  if (activeFloor == DrawingLevel.second) {
    drawingSlabPoints.val = totalDrawingPoints.val;
    drawingSlabPolylines.val = totalDrawingPolylines.val;
  }
});

van.derive(() => {
  nodes.val = [];
  elements.val = [];

  // create columns
  const columnsNodes: Node[] = [];
  const columnsElements: Element[] = [];
  drawingColumnPoints.val.forEach((point, pointIndex) => {
    const { columnNodes, columnElements } = createColumn(
      pointIndex * 2,
      point,
      FLOOR_HEIGHT,
    );

    columnsNodes.push(...columnNodes);
    columnsElements.push(...columnElements);
  });


  // create slabs
  const slabsNodes: Node[] = [];
  drawingSlabPoints.val.forEach((point, pointIndex) => {
    slabsNodes.push([point[0], point[1], FLOOR_HEIGHT]);
  });

  const slabsElements: Element[] = [];
  const baseIndex = columnsNodes.length;
  drawingSlabPolylines.val.forEach((polyline, polylineIndex) => {
    const newPolyline = polyline.map((v) => baseIndex + v);
    slabsElements.push(newPolyline);
  });


  // add columns and slabs
  nodes.val = [...nodes.rawVal, ...columnsNodes, ...slabsNodes];
  elements.val = [...elements.rawVal, ...columnsElements, ...slabsElements];
})

// When number of stories changes, update building data model
van.derive(() => {
  const points = [];
  const slabs = [];
  const columns = [];

  gridTarget.val = {
    position: [10, 10, activeFloor == DrawingLevel.first ? 0 : FLOOR_HEIGHT] as [number, number, number],
    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
  };

  const storySlabsPoints: number[][] = [];
  const storyColumnsPoints: number[][][] = [];

  // slabs
  if (drawingSlabPoints.val.length > 0 ){
    for (let i = 0; i < drawingSlabPoints.val.length; i++)
      storySlabsPoints.push([
        drawingSlabPoints.val[i][0],
        drawingSlabPoints.val[i][1],
        FLOOR_HEIGHT,
      ]);

    const storySlabIndices: number[] = [];
    const lastIndex = points.length;
    for (let i = 0; i < storySlabsPoints.length; i++) {
      points.push(storySlabsPoints[i]);
      storySlabIndices.push(i + lastIndex);
    }

    slabs.push([storySlabIndices]);
  }

  // columns
  if (drawingColumnPoints.val.length > 0){
    for (let i = 0; i < drawingColumnPoints.val.length; i++) {
      const column = drawingColumnPoints.val[i];
      storyColumnsPoints.push([
        [column[0], column[1], column[2]],
        [column[0], column[1], column[2] + FLOOR_HEIGHT],
      ]);
    }
    

    for (let i = 0; i < storyColumnsPoints.length; i++) {
      const lastIndex = points.length;

      points.push(...storyColumnsPoints[i]);
      columns.push([lastIndex, lastIndex + 1]);
    }
  }


  // Update state
  building.points.val = points;
  building.columns.val = columns;
  building.slabs.val = slabs;
});

// When building data model changes, update base and solids geometry
van.derive(() => {
  base.geometry = getBaseGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val
  );

  solidsMesh.geometry = getSolidsGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val
  );

  objects3D.val = [...objects3D.rawVal]; // just to trigger re-rendering
});

document.body.append(
  getViewer({ 
      objects3D, 
      solids,
      mesh: {
        nodes,
        elements,
      },
      drawingObj: {
        points: totalDrawingPoints,
        polylines: totalDrawingPolylines,
        gridTarget
      },
      settingsObj:{
        elements: false
      }
  }),
  toolbar({ onToolbarClick }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  }),
);

//Utils
function getBaseGeometry(
  points: number[][],
  slabs: number[][][],
  columns: number[][]
): BufferGeometry {
  const geometry = new BufferGeometry();

  const columnsVertices = columns
    .map((column) => [points[column[0]], points[column[1]]].flat())
    .flat();

  // borrowed from viewer elements object
  const slabsVertices = slabs
    .map((slab) =>
      elementToEdges(slab[0])
        .map((edge) => [...points[edge[0]], ...points[edge[1]]])
        .flat()
    )
    .flat();

  geometry.setAttribute(
    "position",
    new Float32BufferAttribute([...columnsVertices, ...slabsVertices], 3)
  );

  return geometry;

  function elementToEdges(element: number[]): Element[] {
    if (element.length === 2) return [element];

    const edges: [number, number][] = [];

    for (let i = 0; i < element.length; i++) {
      edges.push([element[i], element[(i + 1) % element.length]]);
    }

    return edges;
  }
}

function getSolidsGeometry(
  points: number[][],
  slabs: number[][][],
  columns: number[][]
): BufferGeometry {
  const columnWidth: number = 0.3;
  const columnHeight: number = 0.3;

  const solidGeoms: BufferGeometry[] = [];
  
  if (slabs[0]?.[0].length > 2) 
    solidGeoms.push(createSlabsGeometry(points, slabs));

  if (columns.length > 0)
    solidGeoms.push(createColumnsGeometry(points, columns));

  return solidGeoms.length > 0 ? mergeGeometries(solidGeoms) : new BufferGeometry();

  function createSlabsGeometry(
    points: number[][],
    slabsIndices: number[][][],
    slabHeight: number = 0.3
  ): BufferGeometry | undefined {
    const buffers: BufferGeometry[] = [];
    
    for (let k = 0; k < slabsIndices.length; k++) {
      
      for (let i = 0; i < slabsIndices[k].length; i++) {
        const contour: number[][] = [];

        for (let j = 0; j < slabsIndices[k][i].length; j++) {
          const pointIdx = slabsIndices[k][i][j];
          contour.push(points[pointIdx]);
        }

        const offsetedContour = offsetContour(contour, - columnWidth / 2);

        const slabShape = new Shape();
        const hole = new Path();

        for (let i = 0; i < offsetedContour.length; i++) {
          if (i == 0)
            slabShape.moveTo(offsetedContour[0][0], offsetedContour[0][1]);
          else 
            slabShape.lineTo(offsetedContour[i][0], offsetedContour[i][1]);
        }

        const geometry = new ExtrudeGeometry(slabShape, {
          depth: slabHeight,
          bevelEnabled: false,
        });

        geometry.translate(0, 0, offsetedContour[0][2] - slabHeight / 2);
        buffers.push(geometry);
      }
    }

    return mergeGeometries(buffers);

    function offsetContour(
      contour: number[][],
      offset: number = 0
    ): number[][] {
      const result: number[][] = [];

      const _contour: Vector2[] = [];

      for (let i = 0; i < contour.length; i++)
        _contour.push(new Vector2(contour[i][0], contour[i][1]));

      let _offset = new BufferAttribute(new Float32Array([offset, 0, 0]), 3);

      for (let i = 0; i < _contour.length; i++) {
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
  }

  function createColumnsGeometry(
    points: any[][],
    columnsIndices: number[][]
  ): BufferGeometry {

    const buffers: BufferGeometry[] = [];
    const columnShape = new Shape();

    // columns base
    columnShape.lineTo(0 + columnWidth, 0);
    columnShape.lineTo(0 + columnWidth, 0 + columnHeight);
    columnShape.lineTo(0, 0 + columnHeight);

    for (let i = 0; i < columnsIndices.length; i++) {
      const p1 = points[columnsIndices[i][0]];
      const p2 = points[columnsIndices[i][1]];

      const height = FLOOR_HEIGHT;//p2[2] - p1[2];

      const geometry = new ExtrudeGeometry(columnShape, {
        depth: height,
        bevelEnabled: false,
      });

      geometry.translate(
        p1[0] - columnWidth / 2,
        p1[1] - columnHeight / 2,
        p1[2]
      );

      buffers.push(geometry);
    }

    return mergeGeometries(buffers);
  }
}

function createColumn(
  baseIndex: number,
  baseNode: Node,
  height: number
): { columnNodes: Node[]; columnElements: Element[] } {
  const x = baseNode[0];
  const y = baseNode[1];

  const newNodes: Node[] = [
    baseNode,
    [x, y, height]
  ];

  const newElements: Element[] = [ [baseIndex, baseIndex + 1] ];

  return { columnNodes: newNodes, columnElements: newElements };
}