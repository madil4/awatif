import { onCleanup } from "solid-js";
import * as THREE from "three";

export function Grid() {
  const grid = new THREE.GridHelper(40, 20, 0x666666, 0x404040);

  onCleanup(() => grid.dispose());

  return <>{grid}</>;
}
