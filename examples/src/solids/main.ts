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
import { Element, Mesh as FemMesh } from "awatif-fem";
import { Parameters, getParameters, getToolbar, getViewer } from "awatif-ui";
import { Building, ColumnData, SlabData } from "./data-model";
import { meshing } from "./meshing";

type SimpleBuilding = {
  points: State<number[][]>;
  columns: State<number[][]>; // [start, end] Todo: change to [end] get start from the story below
  slabs: State<number[][][]>;
};

const simpleBuilding: SimpleBuilding = {
  points: van.state([]),
  columns: van.state([]),
  slabs: van.state([]),
};

const building: Building = {
  points: van.state([]),
  stories: van.state([]),
  columns: van.state([]),
  slabs: van.state([]),
  columnsByStory: van.state(new Map<number, number[]>()),
  slabsByStory: van.state(new Map<number, number[]>()),
  columnData: van.state(new Map<number, ColumnData>()),
  slabData: van.state(new Map<number, SlabData>()),
  meshObject: van.state({} as FemMesh),
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

const slabLoad: number = 1;

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
const mesh: FemMesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

// Events
// When number of stories changes, update building data model
van.derive(() => {
  const points: [number, number, number][] = [];
  const stories: number[] = [];
  const slabs: number[][] = [];
  const columns: number[] = [];
  const columnsByStory = new Map<number, number[]>();
  const slabsByStory = new Map<number, number[]>();
  const slabData = new Map<number, SlabData>();

  const simpleSlabs = [];
  const simpleColumns = [];

  for (let j = 0; j < parameters.stories.value.val; j++) {
    const storySlabsPoints: [number, number, number][] = [];
    const storyColumnsPoints: [number, number, number][][] = [];

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
    let lastIndex = points.length;
    for (let i = 0; i < storySlabsPoints.length; i++) {
      points.push(storySlabsPoints[i]);
      storySlabIndices.push(i + lastIndex);
    }

    simpleSlabs.push([storySlabIndices]);

    slabs.push(storySlabIndices);
    stories.push(lastIndex);
    slabsByStory.set(j, [j]);
    slabData.set(j, {
      analysisInput: { areaLoad: slabLoad, isOpening: false },
    });

    // columns
    for (let i = 0; i < columnsSample.length; i++) {
      const column = columnsSample[i];
      storyColumnsPoints.push([
        [column[0][0], column[0][1], column[0][2] + z],
        [column[1][0], column[1][1], column[1][2] + z],
      ]);
    }

    const newColumnsIndices: number[] = [];
    for (let i = 0; i < storyColumnsPoints.length; i++) {
      lastIndex = points.length;
      points.push(...storyColumnsPoints[i]);
      columns.push(lastIndex + 1);
      newColumnsIndices.push(columns.length - 1);

      simpleColumns.push([lastIndex, lastIndex + 1]);
    }

    columnsByStory.set(j, newColumnsIndices);
  }

  // Update state
  building.points.val = points;
  building.stories.val = stories;
  building.slabs.val = slabs;
  building.columns.val = columns;
  building.columnsByStory.val = columnsByStory;
  building.slabsByStory.val = slabsByStory;
  building.slabData.val = slabData;

  simpleBuilding.points.val = points;
  simpleBuilding.slabs.val = simpleSlabs;
  simpleBuilding.columns.val = simpleColumns;
});

// When building data model changes, update base and solids geometry
van.derive(() => {
  base.geometry = getBaseGeometry(
    simpleBuilding.points.val,
    simpleBuilding.slabs.val,
    simpleBuilding.columns.val
  );

  solidsMesh.geometry = getSolidsGeometry(
    simpleBuilding.points.val,
    simpleBuilding.slabs.val,
    simpleBuilding.columns.val
  );

  meshing(building);
  for (const property in mesh) {
    mesh[property].val = building.meshObject.val[property].val;
  }

  objects3D.val = [...objects3D.rawVal]; // just to trigger re-rendering
});

document.body.append(
  getParameters(parameters),
  getViewer({ objects3D, solids, mesh }),
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
