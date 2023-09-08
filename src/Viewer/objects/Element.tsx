import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { onCleanup } from "solid-js";
import { convertAxesToAwatif } from "./utils/convertAxes";

type ElementProps = {
  start: any;
  end: any;
};

export function Element(props: ElementProps) {
  if (
    !props.start ||
    !props.end ||
    props.start.length != 3 ||
    props.end.length != 3 ||
    props.start.some((e: any) => typeof e !== "number") ||
    props.end.some((e: any) => typeof e !== "number") ||
    props.start.flat().length != props.start.length ||
    props.end.flat().length != props.end.length
  )
    return;

  const line = new LineSegments2(
    new LineSegmentsGeometry(),
    new LineMaterial({
      color: 0xffffff,
      vertexColors: true,
      linewidth: 3,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // should be updated on resize with correct values
    })
  );

  line.geometry.setPositions([
    ...convertAxesToAwatif(props.start),
    ...convertAxesToAwatif(props.end),
  ]);
  line.geometry.setColors([...Array(6).fill(1)]);

  onCleanup(() => {
    line.geometry.dispose();
    line.material.dispose();
  });

  return <>{line}</>;
}
