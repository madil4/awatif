import {
  BufferGeometry,
  Shape,
  Path,
  ExtrudeGeometry,
  Vector2,
  BufferAttribute,
  Matrix4,
  MeshPhongMaterial,
  Mesh,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

enum WindingDirection {
  Clockwise = 1,
  CounterClockwise = -1
}

export function getSolids() {
  return new Mesh(
    new BufferGeometry(),
    new MeshPhongMaterial({ color: 0xffe6cc })
  );
}

// Todo: Make offset work with generic column sections
export function getSolidsGeometry(
  points: number[][],
  slabs: number[][],
  columns: number[]
): BufferGeometry {
  const columnWidth: number = 0.3;
  const columnHeight: number = 0.3;

  const solidGeoms: BufferGeometry[] = [];
  
  if (slabs[0]?.length > 2) 
    solidGeoms.push(createSlabsGeometry(points, slabs));

  if (columns.length > 0)
    solidGeoms.push(createColumnsGeometry(points, columns));

  return solidGeoms.length > 0 ? mergeGeometries(solidGeoms) : new BufferGeometry();

  function createSlabsGeometry(
    points: number[][],
    slabsIndices: number[][],
    slabHeight: number = 0.3
  ): BufferGeometry {
    const buffers: BufferGeometry[] = [];

    for (let k = 0; k < slabsIndices.length; k++) {
      const contour: number[][] = [];
      for (let j = 0; j < slabsIndices[k].length; j++) {
        const pointIdx = slabsIndices[k][j];
        contour.push(points[pointIdx]);
      }

      if (contour.length < 3) continue; 

      if (isClosedPolygon(contour)) contour.pop();

      const windingDirection = determineWindingDirection(contour);
      const offsetedContour = offsetContour(contour, windingDirection * columnWidth / 2);
      
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
    columnsIndices: number[]
  ): BufferGeometry {
    const buffers: BufferGeometry[] = [];
    const columnShape = new Shape();

    // columns base
    columnShape.lineTo(0 + columnWidth, 0);
    columnShape.lineTo(0 + columnWidth, 0 + columnHeight);
    columnShape.lineTo(0, 0 + columnHeight);

    for (let i = 0; i < columnsIndices.length; i++) {
      const point = points[columnsIndices[i]];
      const storyHeight = 4; // Todo: compute from the story below

      const geometry = new ExtrudeGeometry(columnShape, {
        depth: -storyHeight,
        bevelEnabled: false,
      });

      geometry.translate(
        point[0] - columnWidth / 2,
        point[1] - columnHeight / 2,
        point[2]
      );

      buffers.push(geometry);
    }

    return mergeGeometries(buffers);
  }

  function isClosedPolygon(vertices: number[][]): boolean {
    let isClosed: boolean = false;
    const firstVertex: number[] = vertices[0];
    const lastVertex: number[] = vertices[vertices.length - 1];

    if (
      firstVertex[0] == lastVertex[0] 
      && firstVertex[1] == lastVertex[1] 
      && firstVertex[2] == lastVertex[2]
    )  isClosed = true;

    return isClosed;
  }

  function determineWindingDirection(polygon: number[][]): WindingDirection {
    let sum = 0;
    const closed = isClosedPolygon(polygon);
    const n = closed ? polygon.length - 1 : polygon.length;

    for (let i = 0; i < n; i++) {
      const [x1, y1] = polygon[i];
      const nextIdx = (i + 1) % (closed ? polygon.length : n);
      const [x2, y2] = polygon[nextIdx];
      sum += (x2 - x1) * (y2 + y1);
    }
    
    // The sign of the sum determines the winding direction
    return sum > 0 ? WindingDirection.Clockwise : WindingDirection.CounterClockwise;
  }
}
