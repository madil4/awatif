import * as THREE from "three";

export function Grid() {
  const grid = new THREE.GridHelper(10, 10);

  return <>{grid}</>;
}
