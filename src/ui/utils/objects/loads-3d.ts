import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { AssignmentType, Model, Node } from "../../../interfaces";

export class Loads3D extends Group {
  constructor() {
    super();
  }

  update(model: Model) {
    this.clear();

    this.getUniformLoads(model).map((element) => {
      this.add(this.createMesh(element));
    });
  }

  private createMesh = (element: [Node, Node]): Object3D => {
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

  private getUniformLoads = (model: Model): [Node, Node][] => {
    const loads: [Node, Node][] = [];
    model.assignments?.forEach((assignment) => {
      if (assignment.type === AssignmentType.barUniformLoad) {
        loads.push([
          model.nodes[model.elements[assignment.element!][0]],
          model.nodes[model.elements[assignment.element!][1]],
        ]);
      }
    });

    return loads;
  };
}
