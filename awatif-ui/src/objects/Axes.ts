import * as THREE from "three";
import { Text } from "./Text";

export function Axes(gridSize: number): THREE.Group {
  // init
  const axes = new THREE.Group();
  const size = 0.05 * gridSize * 1; // 0.05 to convert to unit size based on grid size of 20

  const xText = new Text("X", "red", "transparent");
  const yText = new Text("Y", "green", "transparent");
  const zText = new Text("Z", "blue", "transparent");

  const xArrow = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    1,
    0x666666,
    0.2,
    0.2
  );
  const yArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    1,
    0x666666,
    0.2,
    0.2
  );
  const zArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    1,
    0x666666,
    0.2,
    0.2
  );

  // update
  xText.position.set(1.3 * size, 0, 0);
  yText.position.set(0, 1.3 * size, 0);
  zText.position.set(0, 0, 1.3 * size);
  xText.updateScale(0.4 * size);
  yText.updateScale(0.4 * size);
  zText.updateScale(0.4 * size);

  xArrow.scale.set(size, size, size);
  yArrow.scale.set(size, size, size);
  zArrow.scale.set(size, size, size);

  axes.add(xArrow, yArrow, zArrow, xText, yText, zText);

  return axes;
}
