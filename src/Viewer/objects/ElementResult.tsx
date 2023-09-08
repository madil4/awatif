import * as THREE from "three";
import { Text } from "./Text";
import { onCleanup } from "solid-js";
import { convertAxesToAwatif, convertAxesToThreeJS } from "./utils/convertAxes";

type ElementResultProps = {
  start: any;
  end: any;
  result: any;
  size: number;
};

export function ElementResult(props: ElementResultProps) {
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
    typeof props.result !== "number"
  )
    return;

  const start = new THREE.Vector3(...convertAxesToAwatif(props.start));
  const end = new THREE.Vector3(...convertAxesToAwatif(props.end));

  const size = 0.5;
  const geometry = new THREE.PlaneGeometry(start.distanceTo(end), size);
  const material = new THREE.MeshBasicMaterial({
    color: props.result > 0 ? 0x005ce6 : 0xe62e00, // second 0xe62e00
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);

  // rotation
  const line = end.clone().sub(start).normalize();
  const unitY = new THREE.Vector3(0, 1, 0);
  let lineUnitYNorm = new THREE.Vector3().crossVectors(line, unitY).normalize();
  lineUnitYNorm =
    lineUnitYNorm.length() < 1e-10 ? new THREE.Vector3(0, 0, 1) : lineUnitYNorm;
  const orth = new THREE.Vector3()
    .crossVectors(line, lineUnitYNorm)
    .normalize();
  const matrix = new THREE.Matrix4().makeBasis(line, orth, lineUnitYNorm);
  plane.applyMatrix4(matrix);

  const orthDotY = orth.dot(new THREE.Vector3(0, 1, 0));
  const orthDotX = orth.dot(new THREE.Vector3(1, 0, 0));
  if (orthDotY < 0) {
    plane.rotateX(Math.PI);
  }
  if (orthDotY == 0) {
    if (orthDotX < 0) {
      plane.rotateX(Math.PI);
    }
  }

  if (props.result < 0) {
    plane.rotateX(Math.PI);
  }

  plane.position.set(...start.toArray());
  const lineLength = start.clone().sub(end).length();
  plane.translateX(-lineLength / 2);
  plane.translateY(size / 2);

  // text
  const textPosition = start.clone().add(end).multiplyScalar(0.5).toArray();

  onCleanup(() => {
    plane.geometry.dispose();
    plane.material.dispose();
  });

  return (
    <>
      {plane}
      <Text
        position={convertAxesToThreeJS(textPosition)}
        text={`${props.result}`}
        size={props.size}
      ></Text>
    </>
  );
}
