import * as THREE from "three";
import { bisection } from "./bisection";

const NUM_POINTS = 100000;

export type BasicInputs = {
  mesh: THREE.Mesh;
  basePoint: [number, number, number];
  xDomain: number;
  yDomain: number;
  pointsInBox: [number, number, number][];
  pointsInMesh: [number, number, number][];
};

/**
 * returns the area, second moment of area and centroid of a given section geometry
 */
export function getSectionProperties(basicInputs: BasicInputs): {
  area: number;
  Ixx: number;
  Iyy: number;
  centroid_x: number;
  centroid_y: number;
  rx: number;
  ry: number;
  Sxt: number;
  Sxb: number;
  Syt: number;
  Syb: number;
  PNAx: number;
  PNAy: number;
  Zxp: number;
  Zyp: number;
} {
  const A: number = getArea(basicInputs);
  const [Ixx, Iyy]: [number, number] = getSecondMomentOfArea(basicInputs);
  const [x_bar, y_bar]: [number, number] = getCentroid(basicInputs);
  const [rx, ry]: [number, number] = getRadiusOfGyration(basicInputs);
  const {
    Sxt: Sxt,
    Sxb: Sxb,
    Syt: Syt,
    Syb: Syb,
  } = getElasticSectionModulus(basicInputs);
  const [PNAx, PNAy] = getPlasticNeutralAxis(basicInputs);
  const [Zxp, Zyp] = getPlasticSectionModulus(basicInputs, PNAx, PNAy);

  const sectionProperties = {
    area: Math.round(A),
    Ixx: Math.round(Ixx),
    Iyy: Math.round(Iyy),
    centroid_x: Math.round(x_bar),
    centroid_y: Math.round(y_bar),
    rx: Math.round(rx),
    ry: Math.round(ry),
    Sxt: Math.round(Sxt),
    Sxb: Math.round(Sxb),
    Syt: Math.round(Syt),
    Syb: Math.round(Syb),
    PNAx: Math.round(PNAx * 100) / 100,
    PNAy: Math.round(PNAy * 100) / 100,
    Zxp: Math.round(Zxp),
    Zyp: Math.round(Zyp),
  };
  return sectionProperties;
}

export function getMonteCarloPoints(basicInputs: BasicInputs): number[][] {
  return basicInputs.pointsInMesh.map((point) => [point[0], point[1]]);
}

export function getBasicInputs(vertices: [number, number][]): BasicInputs {
  // compute box and in points
  const mesh = getMesh(vertices);
  const { basePoint, xDomain, yDomain } = getDomains(mesh);
  const pointsInBox = getPointsInBox(basePoint, xDomain, yDomain, NUM_POINTS);
  const pointsInMesh = getPointsInMesh(pointsInBox, mesh);

  return {
    mesh: mesh,
    basePoint: basePoint,
    xDomain: xDomain,
    yDomain: yDomain,
    pointsInBox: pointsInBox,
    pointsInMesh: pointsInMesh,
  };
}

// Utils functions ----------------------------------------------------------------
function getArea(basicInputs: BasicInputs): number {
  // compute area
  const areaBox = basicInputs.xDomain * basicInputs.yDomain;
  const meshArea =
    (basicInputs.pointsInMesh.length / basicInputs.pointsInBox.length) *
    areaBox;

  return meshArea;
}

/**
 * returns the Ixx and Iyy values of a given section geometry
 */
function getSecondMomentOfArea(basicInputs: BasicInputs): [number, number] {
  const meshArea = getArea(basicInputs);
  const [centroidX, centroidY] = getCentroid(basicInputs);

  let xSecondMomentPoint: number = 0;
  let ySecondMomentPoint: number = 0;

  basicInputs.pointsInMesh.forEach((point) => {
    xSecondMomentPoint += (point[1] - centroidY) ** 2;
    ySecondMomentPoint += (point[0] - centroidX) ** 2;
  });

  const xSecondMomentArea =
    (xSecondMomentPoint / basicInputs.pointsInMesh.length) * meshArea;
  const ySecondMomentArea =
    (ySecondMomentPoint / basicInputs.pointsInMesh.length) * meshArea;

  return [xSecondMomentArea, ySecondMomentArea];
}

/**
 * returns the Ixy of a given section geometry
 */
function getProductOfInertia(basicInputs: BasicInputs): number {
  const meshArea = getArea(basicInputs);
  const [centroidX, centroidY] = getCentroid(basicInputs);

  let productOfInertiaPoint: number = 0;

  basicInputs.pointsInMesh.forEach((point) => {
    productOfInertiaPoint += (point[0] - centroidX) * (point[1] - centroidY);
  });

  const productOfInertiaArea =
    (productOfInertiaPoint / basicInputs.pointsInMesh.length) * meshArea;

  return productOfInertiaArea;
}

/**
 * returns the rx and ry of a given section geometry
 */
function getRadiusOfGyration(basicInputs: BasicInputs): [number, number] {
  const meshArea = getArea(basicInputs);
  const [Ixx, Iyy] = getSecondMomentOfArea(basicInputs);

  const rx = Math.sqrt(Ixx / meshArea);
  const ry = Math.sqrt(Iyy / meshArea);

  return [rx, ry];
}

/**
 * returns the Sxt, Sxb, Syt and Syb of a given section geometry
 */
function getElasticSectionModulus(basicInputs: BasicInputs): {
  Sxt: number;
  Sxb: number;
  Syt: number;
  Syb: number;
} {
  const [Ixx, Iyy] = getSecondMomentOfArea(basicInputs);
  const [centroidX, centroidY] = getCentroid(basicInputs);

  const y_top = basicInputs.basePoint[1] + basicInputs.yDomain - centroidY;
  const y_bot = centroidY - basicInputs.basePoint[1];
  const x_top = basicInputs.basePoint[0] + basicInputs.xDomain - centroidX;
  const x_bot = centroidX - basicInputs.basePoint[0];

  return {
    Sxt: Ixx / y_top,
    Sxb: Ixx / y_bot,
    Syt: Iyy / x_top,
    Syb: Iyy / x_bot,
  };
}

/**
 * returns the PNAx and PNAy of a given section geometry
 */
function getPlasticNeutralAxis(basicInputs: BasicInputs): [number, number] {
  // perform bisection search
  const toleranceRatio = 0.001;
  const maxIterations = 100;

  function getPercentError(mid: number, dimension: number): number {
    const [aboveCount, belowCount] = countPointsAboveBelow(
      basicInputs.pointsInMesh,
      mid,
      dimension
    );

    return (aboveCount - belowCount) / basicInputs.pointsInMesh.length;
  }

  // look for PNAx
  const xDim = 0;
  const xMin = basicInputs.basePoint[xDim];
  const xMax = basicInputs.basePoint[xDim] + basicInputs.xDomain;

  const PNAx = bisection(
    xMin,
    xMax,
    (mid) => getPercentError(mid, xDim),
    toleranceRatio * basicInputs.xDomain,
    maxIterations
  );

  // look for PNAy
  const yDim = 1;
  const yMin = basicInputs.basePoint[yDim];
  const yMax = basicInputs.basePoint[yDim] + basicInputs.yDomain;

  const PNAy = bisection(
    yMin,
    yMax,
    (mid) => getPercentError(mid, yDim),
    toleranceRatio * basicInputs.yDomain,
    maxIterations
  );

  return [PNAx, PNAy];
}

/**
 * returns the Zxp and Zyp of a given section geometry
 */
function getPlasticSectionModulus(
  basicInputs: BasicInputs,
  PNAx: number,
  PNAy: number
): [number, number] {
  const A = getArea(basicInputs);

  let xPlasticDistanceSum: number = 0;
  let yPlasticDistanceSum: number = 0;

  // computer the sum of distances between each point and the plastic neutral axes
  basicInputs.pointsInMesh.forEach((point) => {
    xPlasticDistanceSum += Math.abs(point[0] - PNAx);
    yPlasticDistanceSum += Math.abs(point[1] - PNAy);
  });

  const Zxp = (yPlasticDistanceSum / basicInputs.pointsInMesh.length) * A;
  const Zyp = (xPlasticDistanceSum / basicInputs.pointsInMesh.length) * A;

  return [Zxp, Zyp];
}

/**
 * returns the centroid in both x and y axes of a given section geometry
 */
function getCentroid(basicInputs: BasicInputs): [number, number] {
  let xAreaIn: number = 0;
  let yAreaIn: number = 0;

  // computer first moment of area and centroid
  basicInputs.pointsInMesh.forEach((point) => {
    xAreaIn += point[0];
    yAreaIn += point[1];
  });
  const xCentroid = xAreaIn / basicInputs.pointsInMesh.length;
  const yCentroid = yAreaIn / basicInputs.pointsInMesh.length;

  return [xCentroid, yCentroid];
}

// Basic Inputs ----------------------------------------------------------------

function getDomains(mesh: THREE.Mesh): {
  basePoint: [number, number, number];
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
  basePoint: [number, number, number],
  xDomain: number,
  yDomain: number,
  samples: number
): [number, number, number][] {
  const points: [number, number, number][] = [];

  for (let i = 0; i < samples; i++) {
    points.push([
      basePoint[0] + Math.random() * xDomain,
      basePoint[1] + Math.random() * yDomain,
      0,
    ]);
  }

  return points;
}

function getPointsInMesh(
  pointsBox: [number, number, number][],
  mesh: THREE.Mesh
): [number, number, number][] {
  const raycaster = new THREE.Raycaster();

  const points = pointsBox.filter((point) => {
    raycaster.set(new THREE.Vector3(...point), new THREE.Vector3(0, 0, -1));

    return raycaster.intersectObject(mesh).length;
  });

  return points;
}

function getMesh(points: [number, number][]): THREE.Mesh {
  const shape = new THREE.Shape();

  const origin = points[0];
  shape.moveTo(origin[0], origin[1]);
  for (const point of points.slice(1)) {
    shape.lineTo(point[0], point[1]);
  }

  // compute box and in points
  return new THREE.Mesh(new THREE.ShapeGeometry(shape));
}

function countPointsAboveBelow(
  points: [number, number, number][],
  axis: number,
  dimension: number
): [number, number] {
  let aboveCount = 0;
  let belowCount = 0;

  points.forEach((point) => {
    point[dimension] > axis ? aboveCount++ : belowCount++;
  });

  return [aboveCount, belowCount];
}
