import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";

type LineProps = {
  start: number[];
  end: number[];
};

export function Line(props: LineProps) {
  const line = new LineSegments2(
    new LineSegmentsGeometry(),
    new LineMaterial({
      color: 0xffffff,
      vertexColors: true,
      linewidth: 2,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    })
  );

  line.geometry.setPositions([...props.start, ...props.end]);
  line.geometry.setColors([...Array(6).fill(255)]);

  return <>{line}</>;
}
