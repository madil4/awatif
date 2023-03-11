import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { Node } from "../../interfaces";

export const renderUniformLoads = (element: [Node, Node]): Object3D => {
  const start = new Vector3(...element[0]);
  const end = new Vector3(...element[1]);
  const normal = start.clone().cross(end).normalize();

  const beforeNormal = new Vector3(0, 0, 1);
  const cross = normal.clone().cross(beforeNormal).normalize();
  const angle = beforeNormal.angleTo(normal);
  const rotation = new Quaternion();
  if (cross.z > 0) {
    rotation.setFromAxisAngle(cross, angle).normalize();
  } else {
    rotation.setFromAxisAngle(cross, -angle).normalize();
  }

  const plane = new Mesh(
    new PlaneGeometry(1, 1),
    new MeshBasicMaterial({
      color: 0xff0000,
      side: DoubleSide,
    })
  );

  const midPoint = start.clone().add(end).multiplyScalar(0.5);
  plane.position.copy(midPoint);
  plane.applyQuaternion(rotation);

  return plane;
};
