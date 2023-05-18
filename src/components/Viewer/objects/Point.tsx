import * as THREE from "three";

type PointProps = {
  position: any;
};

export function Point(props: PointProps) {
  if (!props.position) return;
  if (
    props.position.length != 3 ||
    props.position.some((p: any) => typeof p !== "number")
  )
    return;

  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ size: 0.3 })
  );

  const swapYZ = [props.position[0], props.position[2], props.position[1]];

  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(swapYZ, 3)
  );

  return <>{points}</>;
}
