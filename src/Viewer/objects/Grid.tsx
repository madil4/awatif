import { createEffect, onCleanup } from "solid-js";
import * as THREE from "three";
import { setRenderAction } from "../Viewer";

type GridProps = {
  size: number;
};

export function Grid(props: GridProps) {
  const group = new THREE.Group();
  let grid: THREE.GridHelper;

  createEffect(() => {
    group.clear();
    grid?.dispose();

    grid = new THREE.GridHelper(props.size, 20, 0x666666, 0x404040);
    group.add(grid);

    setRenderAction((v) => v + 1);
  });

  onCleanup(() => grid?.dispose());

  return <>{group}</>;
}
