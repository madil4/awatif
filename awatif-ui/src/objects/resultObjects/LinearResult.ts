import * as THREE from "three";
import { Node } from "../../types";
import { roundTo5 } from "../../utils/roundTo5";
import { Text } from "../Text";
import { get10thFromFirstPoint } from "../../utils/get5thFromFirstPoint";
import { IResultObject } from "./IResultObject";

export class LinearResult extends THREE.Group implements IResultObject {
  private lines: THREE.Line;
  private lines2?: THREE.Line;
  private mesh: THREE.Mesh;
  private mesh2?: THREE.Mesh;
  private text: Text;
  private text2: Text;
  private textPosition: Node;
  private text2Position: Node;
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

    const intersection = (result[0] * length) / (result[0] + result[1]);
    const twoSegments = result[0] * result[1] > 0;

    // text
    this.text = new Text(`${roundTo5(result[0])}`);
    this.text2 = new Text(`${roundTo5(-result[1])}`);

    this.normalizedResult = normalizedResult;
    this.textPosition = get10thFromFirstPoint(node1, node2);
    this.text2Position = get10thFromFirstPoint(node2, node1);
    this.text.position.set(...this.textPosition);
    this.text2.position.set(...this.text2Position);
    this.text.rotation.setFromRotationMatrix(rotation);
    this.text2.rotation.setFromRotationMatrix(rotation);

    this.add(this.text, this.text2);

    if (twoSegments) {
      const shape = new THREE.Shape()
        .moveTo(0, 0)
        .lineTo(0, normalizedResult[0])
        .lineTo(intersection, 0)
        .lineTo(0, 0);
      const shape2 = new THREE.Shape()
        .moveTo(intersection, 0)
        .lineTo(length, -normalizedResult[1])
        .lineTo(length, 0)
        .lineTo(intersection, 0);

      // lines
      const points = shape.getPoints();
      const points2 = shape2.getPoints();
      const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
      const geometryPoints2 = new THREE.BufferGeometry().setFromPoints(points2);
      const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });
      this.lines = new THREE.Line(geometryPoints, lineMaterial);
      this.lines2 = new THREE.Line(geometryPoints2, lineMaterial);

      this.lines.position.set(...node1);
      this.lines2.position.set(...node1);
      this.lines.rotation.setFromRotationMatrix(rotation);
      this.lines2.rotation.setFromRotationMatrix(rotation);
      if (flipAxis) this.lines.rotateX(Math.PI / 2);
      if (flipAxis) this.lines2.rotateX(Math.PI / 2);

      this.add(this.lines, this.lines2);

      // mesh
      const geometry = new THREE.ShapeGeometry(shape);
      const geometry2 = new THREE.ShapeGeometry(shape2);
      const material = new THREE.MeshBasicMaterial({
        color: normalizedResult[0] > 0 ? 0x005f73 : 0xae2012,
        side: THREE.DoubleSide,
      });
      const material2 = new THREE.MeshBasicMaterial({
        color: -normalizedResult[1] > 0 ? 0x005f73 : 0xae2012,
        side: THREE.DoubleSide,
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh2 = new THREE.Mesh(geometry2, material2);

      this.mesh.position.set(...node1);
      this.mesh2.position.set(...node1);
      this.mesh.rotation.setFromRotationMatrix(rotation);
      this.mesh2.rotation.setFromRotationMatrix(rotation);
      if (flipAxis) this.mesh.rotateX(Math.PI / 2);
      if (flipAxis) this.mesh2.rotateX(Math.PI / 2);

      this.add(this.mesh, this.mesh2);
    } else {
      const shape = new THREE.Shape()
        .moveTo(0, 0)
        .lineTo(0, normalizedResult[0])
        .lineTo(length, -normalizedResult[1])
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
    }
  }

  updateScale(scale: number) {
    this.lines.scale.set(1, scale * 2, 1);
    this.lines2?.scale.set(1, scale * 2, 1);
    this.mesh.scale.set(1, scale * 2, 1);
    this.mesh2?.scale.set(1, scale * 2, 1);
    this.text.updateScale(scale * 0.6);
    this.text2.updateScale(scale * 0.6);

    // adjust text position when scaling
    this.text.position.set(...this.textPosition);
    this.text2.position.set(...this.text2Position);
    this.text.translateZ(this.normalizedResult[0] * 2.5 * scale);
    this.text2.translateZ(-this.normalizedResult[1] * 2.5 * scale);
  }

  dispose() {
    this.lines.geometry.dispose();
    this.lines2?.geometry.dispose();
    (this.lines.material as THREE.LineBasicMaterial).dispose();
    (this.lines2?.material as THREE.LineBasicMaterial)?.dispose();
    this.mesh.geometry.dispose();
    this.mesh2?.geometry.dispose();
    (this.mesh.material as THREE.MeshBasicMaterial).dispose();
    (this.mesh2?.material as THREE.MeshBasicMaterial)?.dispose();
    this.text.dispose();
    this.text2.dispose();
  }
}
