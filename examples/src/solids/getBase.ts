import { Element } from "awatif-fem";
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
} from "three";

export const base = new LineSegments(
  new BufferGeometry(),
  new LineBasicMaterial()
);
base.frustumCulled = false;
base.material.depthTest = false; // don't know why but is solves the rendering order issue

export function getBaseGeometry(
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
}

function elementToEdges(element: number[]): Element[] {
  if (element.length === 2) return [element];

  const edges: [number, number][] = [];

  for (let i = 0; i < element.length; i++) {
    edges.push([element[i], element[(i + 1) % element.length]]);
  }

  return edges;
}
