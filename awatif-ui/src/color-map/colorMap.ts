import van, { State } from "vanjs-core";
import * as THREE from "three";
import { Node } from "awatif-data-structure";
import { contours } from "awatif-ui";
import { mesh } from "awatif-mesh";

/**
 * Generates a color map mesh based on the provided points, polygon, values, plane, and plane translation.
 *
 * @param points - Points that define the vertices of the polygon and ones inside the polygon.
 * @param polygon - Polygon that defines the shape of the mesh.
 * @param values - Values used to color the mesh.
 */
export function colorMap(
  points: State<Node[]>,
  polygon: State<number[]>,
  values: State<number[]>
): State<THREE.Mesh> {
  const { nodes, elements } = mesh({
    points,
    polygon,
    maxMeshSize: null,
    maxNumSteinerPoints: 0,
    minMeshAngleDegrees: 1,
  });
  const contourMesh = contours(nodes, elements, values, van.state("color-map"));
  return contourMesh;
}
