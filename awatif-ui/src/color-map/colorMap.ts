import van, { State } from "vanjs-core";
import * as THREE from "three";
import { Node, Element } from "awatif-data-structure";
import { contours } from "awatif-ui";
import { mesh } from "awatif-mesh";

/**
 * Generates a color map mesh based on the provided points, polygon, values, plane, and plane translation.
 *
 * @param points - Points that define the vertices of the polygon and ones inside the polygon.
 * @param polygon - Polygon that defines the shape of the mesh.
 * @param values - Values used to color the mesh.
 * @param firstAxis - Axis of the first coordinate in points (e.g. "x", "y", "z").
 * @param secondAxis - Axis of the second coordinate in points (e.g. "x", "y", "z").
 * @param planeTranslation - Translation value for the plane.
 */
export function colorMap(
  points: State<number[][]>,
  polygon: State<number[]>,
  values: State<number[]>,
  planeTranslation: State<number>,
  firstAxis: State<string> = van.state("x"),
  secondAxis: State<string> = van.state("y"),
): State<THREE.Mesh> {
  const { nodes, elements } = mesh({ points, polygon, maxMeshSize: null, maxNumSteinerPoints: 0, minMeshAngleDegrees: 1 });
  const transformedNodes = transformMeshNodesTo3d(
    nodes.val,
    firstAxis.val,
    secondAxis.val,
    planeTranslation.val
  );
  const contourMesh = contours(
    transformedNodes,
    elements,
    values,
    van.state("color-map")
  );
  return contourMesh;
}

// Utils ----------------------------------------------------------------------
function transformMeshNodesTo3d(
  nodes: Node[],
  firstAxis: string,
  secondAxis: string,
  translation: number
): State<Node[]> {
  const firstAxisIndex = ["x", "y", "z"].indexOf(firstAxis);
  const secondAxisIndex = ["x", "y", "z"].indexOf(secondAxis);

  return van.state(
    nodes.map((p) => {
      let transformedNode: Node = [translation, translation, translation];
      transformedNode[firstAxisIndex] = p[0];
      transformedNode[secondAxisIndex] = p[2];
      return transformedNode;
    })
  );
}
