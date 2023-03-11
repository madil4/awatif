import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";
import { Node } from "../../interfaces";

export function renderSupports(node: Node): Object3D {
  const cube = new Mesh(
    new BoxGeometry(0.5, 0.5, 0.5),
    new MeshBasicMaterial({ color: 0x00ff00 })
  );
  cube.position.fromArray(node);
  return cube;
}
