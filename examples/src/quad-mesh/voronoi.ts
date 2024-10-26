import irregularVoronoi from "irregular-voronoi";

type Point = number[];
type Face = number[];

export function voronoi(
  points: Point[],
  seeds: Point[]
): { points: Point[]; faces: Face[] } {
  const result = irregularVoronoi(
    pointsToVorPoly(points),
    seedsToVorPoints(seeds)
  );

  return cleanUp(vorPolyToPointsAndFaces(result));
}

// Utils
function feature(type: string, coordinates: any) {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type,
      coordinates,
    },
  };
}

function pointsToVorPoly(points: Point[]) {
  return feature("Polygon", [points]);
}

function seedsToVorPoints(seeds: Point[]) {
  return seeds.map((seed) => feature("Point", seed));
}

function vorPolyToPointsAndFaces(result: any): {
  points: Point[];
  faces: Face[];
} {
  const points: Point[] = [];
  const faces: Face[] = [];

  result.forEach((poly: any) => {
    const polyPoints = poly.geometry.coordinates[0].slice(0, -1);

    faces.push(polyPoints.map((_: any, ind: number) => points.length + ind));
    points.push(...polyPoints);
  });

  return { points, faces };
}

function cleanUp({ points, faces }: { points: Point[]; faces: Face[] }): {
  points: Point[];
  faces: Face[];
} {
  const pointMap = new Map<string, number>();
  const uniquePoints: Point[] = [];
  const updatedFaces: Face[] = [];

  // Populate uniquePoints and map original points to new indices
  points.forEach((point, index) => {
    const key = `${point[0]},${point[1]}`;
    if (!pointMap.has(key)) {
      pointMap.set(key, uniquePoints.length);
      uniquePoints.push(point);
    }
  });

  // Update faces with new indices
  faces.forEach((face) => {
    const newFace: Face = face.map((index) => {
      const point = points[index];
      const key = `${point[0]},${point[1]}`;
      return pointMap.get(key)!; // Map original point to new index
    }) as Face;
    updatedFaces.push(newFace);
  });

  return { points: uniquePoints, faces: updatedFaces };
}
