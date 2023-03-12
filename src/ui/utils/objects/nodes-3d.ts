import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
} from "three";
import { Node } from "../../../interfaces";

export class Nodes3D extends Points {
  constructor() {
    super(new BufferGeometry(), new PointsMaterial({ size: 0.4 }));
  }

  update(nodes?: Node[]) {
    if (nodes)
      this.geometry.setAttribute(
        "position",
        new Float32BufferAttribute(nodes.flat(), 3)
      );
  }
}
