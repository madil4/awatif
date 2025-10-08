import * as THREE from "three";
import van, { State } from "vanjs-core";

export type GridInput = {
  size: State<number>;
  division: State<number>;
};

export function getGrid({
  gridInput,
  render,
}: {
  gridInput?: GridInput;
  render: () => void;
}): THREE.Group {
  // Init
  let grid: THREE.GridHelper;
  const group = new THREE.Group();

  // Events
  van.derive(() => {
    grid?.dispose();
    group.clear();

    grid = new THREE.GridHelper(
      gridInput?.size?.val ?? 20,
      gridInput?.division?.val ?? 10,
      0x404040,
      0x404040
    );

    group.add(grid);

    render();
  });

  return group;
}
