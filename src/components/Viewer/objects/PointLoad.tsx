import * as THREE from "three";

type PointLoadProps = {
  position: any;
  load: any;
};

export function PointLoad(props: PointLoadProps) {
  if (!props.position || !props.load) return;
  if (
    props.position.length != 3 ||
    props.load.length != 3 ||
    props.position.some((element: any) => typeof element !== "number") ||
    props.load.some((element: any) => typeof element !== "number")
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

  return <>{arrow}</>;
}
