import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { createEffect, onCleanup } from "solid-js";

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
  const swapYZStart = [props.start[0], props.start[2], props.start[1]];
  const swapYZEnd = [props.end[0], props.end[2], props.end[1]];

  line.geometry.setPositions([...swapYZStart, ...swapYZEnd]);
  line.geometry.setColors([...Array(6).fill(1)]);

  onCleanup(() => {
    line.geometry.dispose();
    line.material.dispose();
  });

  return <>{line}</>;
}
