import * as THREE from "three";
import { Node } from "../../types";
import { roundTo5 } from "../../utils/roundTo5";
import { Text } from "../Text";
import { getCenter } from "../../utils/getCenter";
import { IResultObject } from "./IResultObject";

export class ConstantResult extends THREE.Group implements IResultObject {
  private lines: THREE.Line;
  private mesh: THREE.Mesh;
  private text: Text;
  private textPosition: Node;
  private normalizedResult: number[];

  constructor(
    node1: Node,
    node2: Node,
    length: number,
    rotation: THREE.Matrix4,
    result: [number, number],
    normalizedResult: number[],
    flipAxis: boolean
  ) {
    super();

    const shape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(0, normalizedResult[0])
      .lineTo(length, normalizedResult[0])
      .lineTo(length, 0)
      .lineTo(0, 0);

    // lines
    const points = shape.getPoints();
    const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
    this.lines = new THREE.Line(
      geometryPoints,
      new THREE.LineBasicMaterial({ color: "white" })
    );

    this.lines.position.set(...node1);
    this.lines.rotation.setFromRotationMatrix(rotation);
    if (flipAxis) this.lines.rotateX(Math.PI / 2);

    this.add(this.lines);

    // mesh
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
      color: normalizedResult[0] > 0 ? 0x005f73 : 0xae2012,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.set(...node1);
    this.mesh.rotation.setFromRotationMatrix(rotation);
    if (flipAxis) this.mesh.rotateX(Math.PI / 2);

    this.add(this.mesh);

    // text
    this.text = new Text(`${roundTo5(result[0])}`);

    this.normalizedResult = normalizedResult;
    this.textPosition = getCenter(node1, node2);
    this.text.position.set(...this.textPosition);
    this.text.rotation.setFromRotationMatrix(rotation);

    this.add(this.text);
  }

  updateScale(scale: number) {
    this.lines.scale.set(1, scale * 2, 1);
    this.mesh.scale.set(1, scale * 2, 1);
    this.text.updateScale(scale * 0.6);

    // adjust text position when scaling
    this.text.position.set(...this.textPosition);
    this.text.translateZ(this.normalizedResult[0] * 2.5 * scale);
  }

  dispose() {
    this.lines.geometry.dispose();
    (this.lines.material as THREE.LineBasicMaterial).dispose();
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.MeshBasicMaterial).dispose();
    this.text.dispose();
  }
}
