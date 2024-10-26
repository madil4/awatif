import "./poly2tri.js";

type Point = number[];
type Face = number[];

export function delaunay({
  faces,
  points,
}: {
  points: Point[];
  faces: Face[];
}): {
  points: Point[];
  faces: Face[];
} {
  const p2tPoints = points
    .slice(0, -1)
    .map((p) => new window.poly2tri.Point(p[0], p[1]));
  const p2tCtx = new window.poly2tri.SweepContext(p2tPoints);

  // p2tCtx.addPoint(new window.poly2tri.Point(2.5, 2));

  p2tCtx.triangulate();

  const triangles = p2tCtx.getTriangles();

  const newPoints = [];
  const newFaces = [];
  triangles.forEach((tri) => {
    const points = tri.getPoints();
    const pts = points.map((p) => [p.x, p.y]);

    newFaces.push(points.map((_: any, ind: number) => newPoints.length + ind));

    newPoints.push(...pts);
  });

  const newResult = cleanUp({ points: newPoints, faces: newFaces });

  return { points: newResult.points, faces: newResult.faces };
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
