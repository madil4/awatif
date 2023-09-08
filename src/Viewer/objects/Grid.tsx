import * as THREE from "three";
import { createEffect, onCleanup } from "solid-js";
import { setRenderAction } from "../Viewer";
import { convertAxesToAwatif } from "./utils/convertAxes";

type GridProps = {
  position: [number, number, number];
  size: number;
};

export function Grid(props: GridProps) {
  const group = new THREE.Group();
  let grid: THREE.GridHelper;

  // on position and size change
  createEffect(() => {
    group.clear();
    grid?.dispose();

    grid = new THREE.GridHelper(props.size, 20, 0x404040, 0x404040);
    grid.position.set(...convertAxesToAwatif(props.position));

    group.add(grid);

    setRenderAction((v) => v + 1);
  });

  onCleanup(() => grid?.dispose());

  return <>{group}</>;
}
