import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";

type LineProps = {
  start: number[];
  end: number[];
};

export function Line(props: LineProps) {
  if (!props.start || !props.end) return;
  if (props.start.length != 3 || props.end.length != 3) return;
  if (
    props.start.some((element) => typeof element !== "number") ||
    props.end.some((element) => typeof element !== "number")
  )
    return;

  const line = new LineSegments2(
    new LineSegmentsGeometry(),
    new LineMaterial({
      color: 0xffffff,
      vertexColors: true,
      linewidth: 3,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    })
  );
  const swapYZStart = [props.start[0], props.start[2], props.start[1]];
  const swapYZEnd = [props.end[0], props.end[2], props.end[1]];

  line.geometry.setPositions([...swapYZStart, ...swapYZEnd]);
  line.geometry.setColors([...Array(6).fill(255)]);

  return <>{line}</>;
}
