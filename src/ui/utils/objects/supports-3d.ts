import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from "three";
import { AssignmentType, Model, Node } from "../../../interfaces";

export class Supports3D extends Group {
  private _geometry: BoxGeometry;
  private _material: MeshBasicMaterial;

  constructor() {
    super();

    this._geometry = new BoxGeometry(0.5, 0.5, 0.5);
    this._material = new MeshBasicMaterial({ color: 0x00ff00 });
  }

  update(model: Model) {
    this.clear();

    model.assignments?.forEach((assignment) => {
      if (assignment.type === AssignmentType.barSupports) {
        if (assignment.firstNode?.some((v) => v == true)) {
          this.createBox(model.nodes[model.elements[assignment.element!][0]]);
        }
        if (assignment.secondNode?.some((v) => v == true)) {
          this.createBox(model.nodes[model.elements[assignment.element!][1]]);
        }
      }
    });
  }

  private createBox(node: Node) {
    const box = new Mesh(this._geometry, this._material);
    box.position.fromArray(node);
    this.add(box);
  }
}
