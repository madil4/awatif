import * as THREE from "three";

export function getElementLocalAxes(
  start: THREE.Vector3,
  end: THREE.Vector3,
): {
  localX: THREE.Vector3;
  localY: THREE.Vector3;
  localZ: THREE.Vector3;
  length: number;
} | null {
  const localX = end.clone().sub(start);
  const length = localX.length();
  if (length < 1e-9) return null;
  localX.normalize();

  const l = localX.x;
  const m = localX.y;
  const n = localX.z;
  const D = Math.sqrt(l * l + m * m);

  let localY: THREE.Vector3;
  let localZ: THREE.Vector3;

  if (Math.abs(n - 1) < 1e-9) {
    localY = new THREE.Vector3(0, 1, 0);
    localZ = new THREE.Vector3(-1, 0, 0);
  } else if (Math.abs(n + 1) < 1e-9) {
    localY = new THREE.Vector3(0, 1, 0);
    localZ = new THREE.Vector3(1, 0, 0);
  } else {
    localY = new THREE.Vector3(-m / D, l / D, 0);
    localZ = new THREE.Vector3((-l * n) / D, (-m * n) / D, D);
  }

  return { localX, localY, localZ, length };
}
