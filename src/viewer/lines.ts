import { LineSegments2 } from "./utils/lines/LineSegments2";

export class Lines extends LineSegments2 {
  constructor() {
    super();

    (this.material as any).linewidth = 2;
    (this.material as any).vertexColors = true;
    (this.material as any).color.set("white");
    (this.material as any).resolution.set(
      window.innerWidth,
      window.innerHeight
    );
  }

  update(
    positions: [number, number, number][],
    connectivities: [number, number][],
    colorValues: [number, number, number][] = []
  ): void {
    if (!colorValues.length) {
      colorValues = [...Array(connectivities.length * 2)].map(() => [
        255, 255, 255,
      ]);
    }

    const points: any = [];
    const colors: any = [];
    connectivities.forEach((point, index) => {
      points.push(positions[point[0]]);
      points.push(positions[point[1]]);
      colors.push(colorValues[index * 2]);
      colors.push(colorValues[index * 2 + 1]);
    });
    console.log(colors);

    (this.geometry as any).setPositions(points.flat());
    (this.geometry as any).setColors(colors.flat().map((v: number) => v / 255));
  }
}
