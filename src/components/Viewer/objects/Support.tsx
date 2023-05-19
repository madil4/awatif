import * as THREE from "three";

type SupportProps = {
  position: any;
  support: any;
};

export function Support(props: SupportProps) {
  if (!props.position || !props.support) return;
  if (
    props.position.length != 3 ||
    props.support.length != 3 ||
    props.position.some((element: any) => typeof element !== "number") ||
    props.support.some((element: any) => typeof element !== "boolean")
  )
    return;
  if (props.support.every((s: boolean) => !s)) return;

  const geometry = props.support.every((s: boolean) => s)
    ? new THREE.BoxGeometry(0.3, 0.3, 0.3)
    : new THREE.SphereGeometry(0.15);
  const material = new THREE.MeshBasicMaterial({ color: 0xb30000 });
  const mesh = new THREE.Mesh(geometry, material);

  const swapYZ: [number, number, number] = [
    props.position[0],
    props.position[2],
    props.position[1],
  ];
  mesh.position.set(...swapYZ);

  return <>{mesh}</>;
}
