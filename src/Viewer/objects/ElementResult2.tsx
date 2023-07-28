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

  const n1Value = props.result[0];
  const n2Value = props.result[1];
  const twoSegments = n1Value * n2Value < 0;
  const length = start.distanceTo(end);
  let mesh;

  if (twoSegments) {
    const intersection = length / (1 + -n2Value / n1Value);
    const shape1 = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(0, n1Value)
      .lineTo(intersection, 0)
      .lineTo(0, 0);
    const shape2 = new THREE.Shape()
      .moveTo(intersection, 0)
      .lineTo(length, n2Value)
      .lineTo(length, 0)
      .lineTo(intersection, 0);

    const geometry1 = new THREE.ShapeGeometry(shape1);
    const geometry2 = new THREE.ShapeGeometry(shape2);
    const material1 = new THREE.MeshBasicMaterial({
      color: n1Value > 0 ? 0x005ce6 : 0xe62e00,
      side: THREE.DoubleSide,
    });
    const material2 = new THREE.MeshBasicMaterial({
      color: n2Value > 0 ? 0x005ce6 : 0xe62e00,
      side: THREE.DoubleSide,
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    const mesh2 = new THREE.Mesh(geometry2, material2);

    mesh = new THREE.Group().add(mesh1, mesh2);
    mesh.position.set(...start.toArray());
  } else {
    const shape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(0, n1Value)
      .lineTo(length, n2Value)
      .lineTo(length, 0)
      .lineTo(0, 0);

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
      color: n1Value + n2Value > 0 ? 0x005ce6 : 0xe62e00,
      side: THREE.DoubleSide,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...start.toArray());
  }

  return <>{mesh}</>;
}
