import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
} from "three";
import { Element } from "awatif-fem";

export function getBase(): LineSegments {
  const base = new LineSegments(new BufferGeometry(), new LineBasicMaterial());
  base.frustumCulled = false;
  base.material.depthTest = false; // don't know why but is solves the rendering order issue

  return base;
}
export function getBaseGeometry(
  points: number[][],
  slabs: number[][],
  columns: number[]
): BufferGeometry {
  const geometry = new BufferGeometry();

  const storyHeight = 4; // Todo: compute from the story below

  const columnsVertices = columns.flatMap((columnIndex) => {
    const topPoint = points[columnIndex];
    const bottomPoint = [topPoint[0], topPoint[1], topPoint[2] - storyHeight];
    return [...topPoint, ...bottomPoint];
  });

  const slabsVertices = slabs
    .map((slab) =>
      elementToEdges(slab)
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
