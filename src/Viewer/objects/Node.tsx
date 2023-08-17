import * as THREE from "three";
import { createEffect, onCleanup } from "solid-js";

type NodeProps = {
  position: any;
  size: number;
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
    new THREE.PointsMaterial()
  );

  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [props.position[0], props.position[2], props.position[1]],
      3
    )
  );

  createEffect(() => {
    points.material.size = props.size;
  });

  onCleanup(() => {
    points.geometry.dispose();
    points.material.dispose();
  });

  return <>{points}</>;
}
