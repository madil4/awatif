import * as THREE from "three";
import { Text } from "./Text";
import { createEffect, createSignal, onCleanup } from "solid-js";

type AxesProps = {
  position: any;
  size: number;
};

export function Axes(props: AxesProps) {
  const [xTextPosition, setXTextPosition] = createSignal([0, 0, 0]);
  const [yTextPosition, setYTextPosition] = createSignal([0, 0, 0]);
  const [zTextPosition, setZTextPosition] = createSignal([0, 0, 0]);

  if (
    !props.position ||
    props.position.length != 3 ||
    props.position.some((element: any) => typeof element !== "number") ||
    props.position.flat().length != props.position.length
  )
    return;

  const xArrow = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    1,
    0x666666,
    0.2,
    0.2
  );
  const yArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(0, 0, 0),
    1,
    0x666666,
    0.2,
    0.2
  );
  const zArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    1,
    0x666666,
    0.2,
    0.2
  );

  // on position change
  createEffect(() => {
    const swapYZPosition: [number, number, number] = [
      props.position[0],
      props.position[2],
      props.position[1],
    ];
    xArrow.position.copy(new THREE.Vector3(...swapYZPosition));
    yArrow.position.copy(new THREE.Vector3(...swapYZPosition));
    zArrow.position.copy(new THREE.Vector3(...swapYZPosition));
  });

  // on size change
  createEffect(() => {
    xArrow.scale.set(props.size, props.size, props.size);
    yArrow.scale.set(props.size, props.size, props.size);
    zArrow.scale.set(props.size, props.size, props.size);

    const textOffset = 1.3;
    setXTextPosition(
      new THREE.Vector3(textOffset * props.size, 0, 0)
        .add(new THREE.Vector3(...props.position))
        .toArray()
    );
    setYTextPosition(
      new THREE.Vector3(0, -textOffset * props.size, 0)
        .add(new THREE.Vector3(...props.position))
        .toArray()
    );
    setZTextPosition(
      new THREE.Vector3(0, 0, textOffset * props.size)
        .add(new THREE.Vector3(...props.position))
        .toArray()
    );
  });

  onCleanup(() => {
    xArrow.dispose();
    yArrow.dispose();
    zArrow.dispose();
  });

  return (
    <>
      {xArrow}
      {yArrow}
      {zArrow}
      {
        <Text
          text={"X"}
          position={xTextPosition()}
          size={0.3 * props.size}
          color="#666666"
          background={"transparent"}
        />
      }
      {
        <Text
          text={"Y"}
          position={yTextPosition()}
          size={0.3 * props.size}
          color="#666666"
          background={"transparent"}
        />
      }
      {
        <Text
          text={"Z"}
          position={zTextPosition()}
          size={0.3 * props.size}
          color="#666666"
          background={"transparent"}
        />
      }
    </>
  );
}
