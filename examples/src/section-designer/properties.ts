import { Node, Element } from "awatif-data-structure";
import * as THREE from "three";
import * as math from "mathjs";

const NUM_POINTS = 10000;

export function getArea(vertices: number[][]): number {
  // compute box and in points
  const mesh = getMesh(vertices);
  const { basePoint, xDomain, yDomain } = getDomains(mesh);
  const pointsInBox = getPointsInBox(basePoint, xDomain, yDomain, NUM_POINTS);
  const pointsInMesh = getPointsInMesh(pointsInBox, mesh);

  // compute area
  const areaBox = xDomain * yDomain;
  const meshArea = (pointsInMesh.length / pointsInBox.length) * areaBox;

  return meshArea;
}

/**
 * returns the Ixx and Iyy values of a given section geometry
 */
export function getSecondMomentOfArea(vertices: number[][]): [number, number] {
  // compute box and in points
  const mesh = getMesh(vertices);
  const { basePoint, xDomain, yDomain } = getDomains(mesh);
  const pointsInBox = getPointsInBox(basePoint, xDomain, yDomain, NUM_POINTS);

  const pointsInMesh = getPointsInMesh(pointsInBox, mesh);
  const meshArea = getArea(vertices);

  let xSecondMomentPoint: number = 0;
  let ySecondMomentPoint: number = 0;

  pointsInMesh.forEach((point) => {
    xSecondMomentPoint += point[1] ** 2;
    ySecondMomentPoint += point[0] ** 2;
  });

  const xSecondMomentArea = (xSecondMomentPoint / pointsInMesh.length) * meshArea;
  const ySecondMomentArea = (ySecondMomentPoint / pointsInMesh.length) * meshArea;

  return [xSecondMomentArea, ySecondMomentArea];
}

export function getCentroid(vertices: number[][]): [number, number] {
  // compute box and in points
  const mesh = getMesh(vertices);
  const { basePoint, xDomain, yDomain } = getDomains(mesh);
  const pointsInBox = getPointsInBox(basePoint, xDomain, yDomain, NUM_POINTS);
  const pointsInMesh = getPointsInMesh(pointsInBox, mesh);

  let xAreaIn: number = 0;
  let yAreaIn: number = 0;

  // computer first moment of area and centroid
  pointsInMesh.forEach((point) => {
    xAreaIn += point[0];
    yAreaIn += point[1];
  });
  const xCentroid = xAreaIn / pointsInMesh.length;
  const yCentroid = yAreaIn / pointsInMesh.length;

  return [xCentroid, yCentroid];
}

// Helper functions ----------------------------------------------------------------
function getDomains(mesh: THREE.Mesh): {
  basePoint: number[];
  xDomain: number;
  yDomain: number;
} {
  const box = new THREE.Box3().setFromObject(mesh);
  const diagonal = box.max.sub(box.min);

  return {
    basePoint: box.min.toArray(),
    xDomain: diagonal.x,
    yDomain: diagonal.y,
  };
}

function getPointsInBox(
  basePoint: number[],
  xDomain: number,
  yDomain: number,
  samples: number
): number[][] {
  const points: number[][] = [];

  for (let i = 0; i < samples; i++) {
    points.push([
      basePoint[0] + Math.random() * xDomain,
      basePoint[1] + Math.random() * yDomain,
      0,
    ]);
  }

  return points;
}

function getPointsInMesh(pointsBox: number[][], mesh: THREE.Mesh): number[][] {
  const raycaster = new THREE.Raycaster();

  const points = pointsBox.filter((point) => {
    raycaster.set(new THREE.Vector3(...point), new THREE.Vector3(0, 0, -1));

    return raycaster.intersectObject(mesh).length;
  });

  return points;
}

function getMesh(points: number[][]): THREE.Mesh {
  const shape = new THREE.Shape();

  const origin = points[0];
  shape.moveTo(origin[0], origin[1]);
  for (const point of points.slice(1)) {
    shape.lineTo(point[0], point[1]);
  }

  // compute box and in points
  return new THREE.Mesh(new THREE.ShapeGeometry(shape));
}