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

  const slabsGeometry = createSlabsGeometry(points, slabs);
  const columnsGeometry = createColumnsGeometry(points, columns);

  return mergeGeometries([slabsGeometry, columnsGeometry]);

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
}
