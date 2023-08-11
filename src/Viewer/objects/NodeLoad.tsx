import { onCleanup } from "solid-js";
import * as THREE from "three";

type PointLoadProps = {
  position: any;
  load: any;
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

  const swapYZPosition: [number, number, number] = [
    props.position[0],
    props.position[2],
    props.position[1],
  ];
  const swapYZLoads: [number, number, number] = [
    props.load[0],
    props.load[2],
    props.load[1],
  ];

  const arrow = new THREE.ArrowHelper(
    new THREE.Vector3(...swapYZLoads).normalize(),
    new THREE.Vector3(...swapYZPosition),
    1,
    0xe6b800,
    0.3,
    0.3
  );

  onCleanup(() => {
    arrow.dispose();
  });

  return <>{arrow}</>;
}
