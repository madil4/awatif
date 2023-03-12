import {
  ExtrudeGeometry,
  Group,
  LineCurve3,
  Mesh,
  MeshNormalMaterial,
  Shape,
  Vector3,
} from "three";
import { BarPropertiesAssignment, Element, Node } from "../../../interfaces";

export class Profiles extends Group {
  constructor() {
    super();
  }

  update(
    nodes: Node[],
    elements: Element[],
    barsProperties?: Map<number, BarPropertiesAssignment>
  ) {
    this.clear();

    elements.forEach((element, index) => {
      const barProperty = barsProperties?.get(index);
      if (barProperty) {
        const { width, height } = this.extractDimensions(barProperty.profile);
        const geometry = new ExtrudeGeometry(
          this.createRectangle(width, height),
          {
            bevelEnabled: false,
            extrudePath: new LineCurve3(
              new Vector3(...nodes[element[0]]),
              new Vector3(...nodes[element[1]])
            ),
          }
        );

        this.add(new Mesh(geometry, new MeshNormalMaterial()));
      }
    });
  }

  private createRectangle(width: number, height: number): Shape {
    return new Shape()
      .moveTo(-width / 2, height / 2)
      .lineTo(width / 2, height / 2)
      .lineTo(width / 2, -height / 2)
      .lineTo(-width / 2, -height / 2)
      .lineTo(-width / 2, height / 2);
  }

  private extractDimensions(profile: string | undefined): {
    width: number;
    height: number;
  } {
    const numbers = profile ? profile.split("x") : ["0", "0"];
    return {
      width: parseInt(numbers[0]) * 1e-3,
      height: parseInt(numbers[1]) * 1e-3,
    };
  }
}
