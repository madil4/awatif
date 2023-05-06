import * as THREE from "three";

type PointProps = {
  position: number[];
};

export function Point(props: PointProps) {
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ size: 0.2 })
  );

  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(props.position, 3)
  );

  return <>{points}</>;
}
