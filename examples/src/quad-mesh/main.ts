import { Node } from "awatif-data-structure";
import { template, Parameters, Structure } from "awatif-ui";
import { subdivide } from "./subdivide";
import { voronoi } from "./voronoi";
import * as gt from "@thi.ng/geom-tessellate";
import { Group, smoothPolygon } from "@thi.ng/geom";
// import { delaunay } from "./delaunay";
import { triangulate } from "@allmaps/triangulate";

// https://observablehq.com/@allmaps/a-simple-polygon-triangulation-algorithm

const parameters: Parameters = {
  boundary: {
    value: 5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "boundary",
  },
  subdivisions: { value: 1, min: 0, max: 10, step: 1, label: "subdivisions" },
  spacing: { value: 1, min: 0.1, max: 5, step: 0.1, label: "voronoi spacing" },
};

function onParameterChange(parameters: Parameters): Structure {
  const boundary = parameters.boundary.value;
  const subdivisions = parameters.subdivisions.value;
  const spacing = parameters.spacing.value;

  let points = [
    [0, 0],
    [5, 0],
    [parameters.boundary.value, 3],
    [8, 7],
    [15, 5],
    [15, 0],
    [20, 0],
    [20, 10],
    [0, 10],
    [0, 0],
  ];
  let faces = [[0, 1, 2, 3, 4, 5, 6, 7, 8]];

  // const vorResult = voronoi(points, uniformSeeds(20, 10, spacing));
  // points = vorResult.points;
  // faces = vorResult.faces;

  // const subResult = subdivide({
  //   faces,
  //   points,
  //   subdivisions,
  // });
  // points = subResult.points;
  // faces = subResult.faces;

  // const ercResult = gt.tessellateWith(new gt.MeshTessellation(2), points, [
  //   gt.earCutComplex(),
  //   gt.quadFan,
  //   gt.quadFan,
  //   gt.quadFan,
  // ]);
  // points = ercResult.points as any;
  // faces = ercResult.faces;

  const triangles = triangulate(points, 1);
  // console.log(triangles);

  const deResult = delaunay({
    faces,
    points,
  });
  points = deResult.points;
  faces = deResult.faces;

  return {
    nodes: points.map((p) => [p[0], 0, p[1]] as Node),
    elements: faces,
  };
}

template({
  parameters,
  onParameterChange,
  settings: { deformedShape: true },
});

// Utils
function uniformSeeds(width: number, height: number, spacing: number) {
  const seeds = [];

  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      seeds.push([x, y]);
    }
  }

  return seeds;
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
