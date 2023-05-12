import * as THREE from "three";

type PointProps = {
  position: number[];
};

export function Point(props: PointProps) {
  if (
    props.position.length != 3 ||
    props.position.some((element) => typeof element !== "number")
  )
    return;

  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ size: 0.3 })
  );

  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(props.position, 3)
  );

  return <>{points}</>;
}
