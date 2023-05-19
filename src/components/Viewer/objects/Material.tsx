import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";

type MaterialProps = {
  start: any;
  end: any;
};

export function Material(props: MaterialProps) {
  if (!props.start || !props.end) return;
  if (
    props.start.length != 3 ||
    props.end.length != 3 ||
    props.start.some((e: any) => typeof e !== "number") ||
    props.end.some((e: any) => typeof e !== "number")
  )
    return;

  const line = new LineSegments2(
    new LineSegmentsGeometry(),
    new LineMaterial({
      color: 0xe6b800,
      vertexColors: true,
      linewidth: 4,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // should be updated on resize with correct values
    })
  );
  const swapYZStart = [props.start[0], props.start[2], props.start[1]];
  const swapYZEnd = [props.end[0], props.end[2], props.end[1]];

  line.geometry.setPositions([...swapYZStart, ...swapYZEnd]);
  line.geometry.setColors([...Array(6).fill(1)]);

  return <>{line}</>;
}
