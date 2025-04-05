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
import { Element } from "awatif-fem";
import { Parameters, getParameters, getToolbar, getViewer } from "awatif-ui";

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

const slabSample: number[][] = [
  [0, 0, 4],
  [0, 10, 4],
  [18, 10, 4],
  [18, 0, 4],
  [0, 0, 4],
];

const columnsSample: number[][][] = [
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

const parameters: Parameters = {
  stories: { value: van.state(2), min: 1, max: 5, step: 1 },
};

const solidsMesh = new Mesh(
  new BufferGeometry(),
  new MeshPhongMaterial({ color: 0xffe6cc })
);
const base = new LineSegments(new BufferGeometry(), new LineBasicMaterial());
base.frustumCulled = false;
base.material.depthTest = false; // don't know why but is solves the rendering order issue

const objects3D: State<Object3D[]> = van.state([base]);
const solids: State<Object3D[]> = van.state([solidsMesh]);

// Events
// When number of stories changes, update building data model
van.derive(() => {
  const points = [];
  const slabs = [];
  const columns = [];

  for (let j = 0; j < parameters.stories.value.val; j++) {
    const storySlabsPoints: number[][] = [];
    const storyColumnsPoints: number[][][] = [];

    const FLOOR_HEIGHT = 4;
    const z: number = FLOOR_HEIGHT * j;

    // slabs
    for (let i = 0; i < slabSample.length; i++)
      storySlabsPoints.push([
        slabSample[i][0],
        slabSample[i][1],
        slabSample[i][2] + z,
      ]);

    const storySlabIndices: number[] = [];
    const lastIndex = points.length;
    for (let i = 0; i < storySlabsPoints.length; i++) {
      points.push(storySlabsPoints[i]);
      storySlabIndices.push(i + lastIndex);
    }

    slabs.push([storySlabIndices]);

    // columns
    for (let i = 0; i < columnsSample.length; i++) {
      const column = columnsSample[i];
      storyColumnsPoints.push([
        [column[0][0], column[0][1], column[0][2] + z],
        [column[1][0], column[1][1], column[1][2] + z],
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
  getParameters(parameters),
  getViewer({ objects3D, solids }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/solids/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  })
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

  const slabsGeometry = createSlabsGeometry(points, slabs);
  const columnsGeometry = createColumnsGeometry(points, columns);

  return mergeGeometries([slabsGeometry, columnsGeometry]);

  function createSlabsGeometry(
    points: number[][],
    slabsIndices: number[][][],
    slabHeight: number = 0.3
  ): BufferGeometry {
    const buffers: BufferGeometry[] = [];

    for (let k = 0; k < slabsIndices.length; k++) {
      for (let i = 0; i < slabsIndices[k].length; i++) {
        const contour: number[][] = [];
        for (let j = 0; j < slabsIndices[k][i].length; j++) {
          const pointIdx = slabsIndices[k][i][j];
          contour.push(points[pointIdx]);
        }

        const offsetedContour = offsetContour(contour, columnWidth / 2);

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

      const height = p2[2] - p1[2];

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
