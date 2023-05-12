import * as THREE from "three";

export function Grid() {
  const grid = new THREE.GridHelper(40, 20, 0xcccccc, 0x888888);

  return <>{grid}</>;
}
