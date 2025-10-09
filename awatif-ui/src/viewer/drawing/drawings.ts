import * as THREE from "three";
import { State } from "vanjs-core";

export type DrawingInput = {
  points?: State<[number, number, number][]>;
};

export function drawing({
  drawingInput,
  grid,
}: {
  drawingInput: DrawingInput;
  grid: THREE.Group;
}): void {
  const gridGeometry = grid.children[0].geometry;
}
