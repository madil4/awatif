import van, { State } from "vanjs-core";
import * as THREE from "three";
import { Node, Element } from "awatif-data-structure";
import {
  sheets,
  viewer,
  layout,
  title,
  grid,
  marketing,
  contours,
} from "awatif-ui";
import { html, TemplateResult } from "lit-html";
import { mesh } from "awatif-mesh";

export function colorMap(
  points: State<number[][]>,
  polygon: State<number[]>,
  values: State<number[]>
): State<THREE.Mesh> {
  const { nodes, elements } = mesh({ points, polygon });
  const contourMesh = contours(nodes, elements, values, van.state("color-map"));
  return contourMesh;
}
