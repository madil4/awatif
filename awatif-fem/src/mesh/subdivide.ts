type Point = number[];
type Face = number[];
type Edge = number[];

export function subdivide({
  faces,
  points,
  subdivisions = 1,
}: {
  points: Point[];
  faces: Face[];
  subdivisions?: number;
}): {
  points: Point[];
  faces: Face[];
} {
  for (let i = 0; i < subdivisions; i++) {
    // step 0: prepare needed maps
    // map to store meta data per face (facePoint)
    const originalPoints = [...points];
    const faceToFacePoint = new Map<number, number>();

    // map to store meta data per edge (edgePoint)
    const edges = getEdges(faces);
    const edgeToEdgePoint = new Map<number, number>();

    // map to store edge to faces for (step 2)
    const edgeToFaces = new Map<number, number[]>();

    edges.forEach((edge, edgeIndex) => {
      const adjacentFaces: number[] = [];

      faces.forEach((face, faceIndex) => {
        if (isEdgeInFace(edge, face)) adjacentFaces.push(faceIndex);
      });

      edgeToFaces.set(edgeIndex, adjacentFaces);
    });

    // map to store point to edge and faces (for step 3)
    const pointToEdges = new Map<number, number[]>();
    const pointToFaces = new Map<number, number[]>();

    points.forEach((_, pointIndex) => {
      // edges
      const adjacentEdges: number[] = [];

      edges.forEach((edge, edgeIndex) => {
        if (edge.includes(pointIndex)) adjacentEdges.push(edgeIndex);
      });

      pointToEdges.set(pointIndex, adjacentEdges);

      // faces
      const adjacentFaces = new Set<number>();
      adjacentEdges.forEach((edgeIndex) => {
        edgeToFaces.get(edgeIndex)?.forEach((faceIndex) => {
          adjacentFaces.add(faceIndex);
        });
      });

      pointToFaces.set(pointIndex, Array.from(adjacentFaces));
    });

    // step 1: per each face compute new point (facePoint): which is a weighted average of face vertices
    faces.forEach((face, faceIndex) => {
      const facePoints = face.map((f) => points[f]);
      const averagePoint = average(facePoints);
      points.push(averagePoint);

      faceToFacePoint.set(faceIndex, points.length - 1);
    });

    // step 2: per each edge compute new point (edgePoint): average of edge vertices and face facePoints
    edges.forEach((edge, edgeIndex) => {
      const edgePoints = edge.map((e) => points[e]);
      const faces = edgeToFaces.get(edgeIndex) ?? [];
      const facePointsInd = faces.map((i) => faceToFacePoint.get(i) ?? -1);
      const facePoints = facePointsInd.map((i) => points[i]);

      const averagePoint = average([...edgePoints]);
      // const averagePoint = average([...edgePoints, ...facePoints]);

      points.push(averagePoint);
      edgeToEdgePoint.set(edgeIndex, points.length - 1);
    });

    // step 4: construct the new faces
    const newFaces: Face[] = [];
    originalPoints.forEach((_, pointIndex) => {
      pointToFaces.get(pointIndex)?.forEach((faceIndex) => {
        const facePoint = faceToFacePoint.get(faceIndex) ?? -1;

        const edgesInd = pointToEdges.get(pointIndex) ?? [];
        const faceEdges = edgesInd.filter((i) =>
          isEdgeInFace(edges[i], faces[faceIndex])
        );
        const edgePoints = faceEdges.map(
          (i: any) => edgeToEdgePoint.get(i) ?? -1
        );

        newFaces.push([pointIndex, edgePoints[0], facePoint, edgePoints[1]]);
      });
    });
    faces = newFaces;
  }

  return { faces, points };
}

// Utils
function average(points: Point[]): Point {
  const sum = points.reduce((sum, p) => [sum[0] + p[0], sum[1] + p[1]], [0, 0]);
  const length = points.length;

  return [sum[0] / length, sum[1] / length];
}

function getEdges(faces: Face[]): Edge[] {
  const edges = new Set<string>();

  faces.forEach((face) => {
    for (let i = 0; i < face.length; i++) {
      const start = face[i];
      const end = face[(i + 1) % face.length]; // Connect to the first point

      // Use a sorted tuple (min, max) to avoid duplicates
      const edge = start < end ? `${start},${end}` : `${end},${start}`;
      edges.add(edge);
    }
  });

  return Array.from(edges).map((edge) => edge.split(",").map(Number));
}

function isEdgeInFace(edge: Edge, face: Face): Boolean {
  const [v1, v2] = edge;

  for (let i = 0; i < face.length; i++) {
    if (
      (face[i] === v1 && face[(i + 1) % face.length] === v2) ||
      (face[i] === v2 && face[(i + 1) % face.length] === v1)
    ) {
      return true;
    }
  }

  return false;
}
