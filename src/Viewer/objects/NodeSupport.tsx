import * as THREE from "three";
import { onCleanup } from "solid-js";

type NodeSupportProps = {
  position: any;
  support: any;
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
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    new THREE.MeshBasicMaterial({ color: 0xb30000 })
  );

  const swapYZ: [number, number, number] = [
    props.position[0],
    props.position[2],
    props.position[1],
  ];
  mesh.position.set(...swapYZ);

  onCleanup(() => {
    mesh.geometry.dispose();
    mesh.material.dispose();
  });

  return <>{mesh}</>;
}
