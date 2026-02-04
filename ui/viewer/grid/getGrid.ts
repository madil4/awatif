import * as THREE from "three";
import van, { State } from "vanjs-core";

// Base grid divisions - this determines major grid lines
export const BASE_DIVISIONS = 10;

export type Grid = {
  size: State<number>;
  precision: State<number>; // Precision ratio (e.g., 1, 0.5, 0.2, 0.1) relative to major cell size
};

export function getGrid({
  grid,
  render,
}: {
  grid: Grid;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();
  let majorGrid: THREE.GridHelper;
  let minorGrid: THREE.GridHelper;

  van.derive(() => {
    majorGrid?.dispose();
    minorGrid?.dispose();
    group.clear();

    const size = grid.size.val;
    const precision = grid.precision.val;

    // Calculate actual step from precision (relative to major cell size)
    const majorCellSize = size / BASE_DIVISIONS;
    const actualStep = majorCellSize * precision;

    // Calculate minor grid divisions based on actual step
    const minorDivisions = Math.round(size / actualStep);

    // Minor grid (lighter color, finer divisions)
    minorGrid = new THREE.GridHelper(size, minorDivisions, 0x303030, 0x303030);
    minorGrid.rotateX(Math.PI / 2);
    minorGrid.position.set(size / 2, size / 2, 0);
    minorGrid.renderOrder = 0;
    group.add(minorGrid);

    // Major grid (darker/more visible, base divisions)
    majorGrid = new THREE.GridHelper(size, BASE_DIVISIONS, 0x505050, 0x505050);
    majorGrid.rotateX(Math.PI / 2);
    majorGrid.position.set(size / 2, size / 2, 0);
    majorGrid.renderOrder = 1; // Render on top of minor grid
    group.add(majorGrid);

    render();
  });

  return group;
}
