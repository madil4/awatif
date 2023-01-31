import { LineMaterial } from "./utils/lines/LineMaterial";
import { LineSegments2 } from "./utils/lines/LineSegments2";
import { LineSegmentsGeometry } from "./utils/lines/LineSegmentsGeometry";

export class Lines extends LineSegments2 {
  constructor() {
    super(new LineSegmentsGeometry(), new LineMaterial());

    (this.material as any).linewidth = 2;
    (this.material as any).resolution.set(
      window.innerWidth,
      window.innerHeight
    );
  }

  update(
    positions: [number, number, number][],
    connectivities: [number, number][]
  ): void {
    const points: any = [];
    connectivities.forEach((point) => {
      points.push(positions[point[0]]);
      points.push(positions[point[1]]);
    });

    (this.geometry as any).setPositions(points.flat());
  }
}
