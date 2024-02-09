import * as THREE from "three";

export function Grid(gridSize: number): THREE.GridHelper {
  const grid = new THREE.GridHelper(gridSize, 20, 0x404040, 0x404040);

  grid.position.set(0.5 * gridSize, 0.5 * gridSize, 0);
  grid.rotateX(Math.PI / 2);

  return grid;
}
