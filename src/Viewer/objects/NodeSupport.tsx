import * as THREE from "three";
import { createEffect, onCleanup } from "solid-js";
import { convertAxesToAwatif } from "./utils/convertAxes";

type NodeSupportProps = {
  position: any;
  support: any;
  size: number;
};

export function NodeSupport(props: NodeSupportProps) {
  if (
    !props.position ||
    !props.support ||
    props.position.length != 3 ||
    props.support.length != 3 ||
    props.position.some((element: any) => typeof element !== "number") ||
    props.support.some((element: any) => typeof element !== "boolean") ||
    props.position.flat().length != props.position.length ||
    props.support.flat().length != props.support.length ||
    props.support.every((s: boolean) => !s)
  )
    return;

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xb30000 })
  );

  mesh.position.set(...convertAxesToAwatif(props.position));

  createEffect(() => {
    mesh.scale.set(props.size, props.size, props.size);
  });

  onCleanup(() => {
    mesh.geometry.dispose();
    mesh.material.dispose();
  });

  return <>{mesh}</>;
}
