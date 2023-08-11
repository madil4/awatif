import * as THREE from "three";
import { onCleanup } from "solid-js";

type NodeProps = {
  position: any;
};

export function Node(props: NodeProps) {
  if (
    !props.position ||
    props.position.length != 3 ||
    props.position.some((p: any) => typeof p !== "number")
  )
    return;

  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ size: 0.3 })
  );

  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [props.position[0], props.position[2], props.position[1]],
      3
    )
  );

  onCleanup(() => {
    points.geometry.dispose();
    points.material.dispose();
  });

  return <>{points}</>;
}
