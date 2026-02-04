import * as THREE from "three";
import van, { State } from "vanjs-core";

export type Grid = {
  size: State<number>;
  spacing: State<number>; // Grid spacing (e.g., 1, 0.5, 0.1) - smaller values = finer grid
};

export function getGrid({
  grid,
  render,
}: {
  grid: Grid;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();
  let gridHelper: THREE.GridHelper;

  van.derive(() => {
    gridHelper?.dispose();
    group.clear();

    const size = grid.size.val;
    const spacing = grid.spacing.val;
    const numDivisions = Math.round(size / spacing);

    gridHelper = new THREE.GridHelper(size, numDivisions, 0x505050, 0x303030);
    gridHelper.rotateX(Math.PI / 2);
    gridHelper.position.set(size / 2, size / 2, 0);
    group.add(gridHelper);

    render();
  });

  return group;
}
