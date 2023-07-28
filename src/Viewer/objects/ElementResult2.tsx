import * as THREE from "three";

type ElementResultProps = {
  start: any;
  end: any;
  result: any;
};

export function ElementResult2(props: ElementResultProps) {
  if (
    !props.start ||
    !props.end ||
    !props.result ||
    props.start.length != 3 ||
    props.end.length != 3 ||
    props.start.some((e: any) => typeof e !== "number") ||
    props.end.some((e: any) => typeof e !== "number") ||
    props.start.flat().length != props.start.length ||
    props.end.flat().length != props.end.length ||
    props.result.length != 2 ||
    props.result.some((e: any) => typeof e !== "number")
  )
    return;

  const start = new THREE.Vector3(
    props.start[0],
    props.start[2],
    props.start[1]
  );
  const end = new THREE.Vector3(props.end[0], props.end[2], props.end[1]);

  const length = start.distanceTo(end);
  const n1Value = props.result[0];
  const n2Value = props.result[1];
  const shape = new THREE.Shape()
    .moveTo(0, 0)
    .lineTo(0, n1Value)
    .lineTo(length, n2Value)
    .lineTo(length, 0)
    .lineTo(0, 0);

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({
    color: props.result[0] > 0 ? 0x005ce6 : 0xe62e00, // second 0xe62e00
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(...start.toArray());

  return <>{mesh}</>;
}
