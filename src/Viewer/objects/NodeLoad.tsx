import { createEffect, onCleanup } from "solid-js";
import * as THREE from "three";
import { convertAxesToAwatif } from "./utils/convertAxes";

type PointLoadProps = {
  position: any;
  load: any;
  size: number;
};

export function NodeLoad(props: PointLoadProps) {
  if (
    !props.position ||
    !props.load ||
    props.position.length != 3 ||
    props.load.length != 3 ||
    props.position.some((element: any) => typeof element !== "number") ||
    props.load.some((element: any) => typeof element !== "number") ||
    props.position.flat().length != props.position.length ||
    props.load.flat().length != props.load.length
  )
    return;

  const arrow = new THREE.ArrowHelper(
    new THREE.Vector3(...convertAxesToAwatif(props.load)).normalize(),
    new THREE.Vector3(...convertAxesToAwatif(props.position)),
    1,
    0xe6b800,
    0.3,
    0.3
  );

  createEffect(() => {
    arrow.scale.set(props.size, props.size, props.size);
  });

  onCleanup(() => {
    arrow.dispose();
  });

  return <>{arrow}</>;
}
