import * as THREE from "three";
import { Text } from "./Text";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { convertAxesToAwatif } from "./utils/convertAxes";

type AxesProps = {
  position: [number, number, number];
  size: number;
};

export function Axes(props: AxesProps) {
  const [xTextPosition, setXTextPosition] = createSignal([0, 0, 0]);
  const [yTextPosition, setYTextPosition] = createSignal([0, 0, 0]);
  const [zTextPosition, setZTextPosition] = createSignal([0, 0, 0]);

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

  // on position and size change
  createEffect(() => {
    const position = convertAxesToAwatif(props.position);
    xArrow.position.set(...position);
    yArrow.position.set(...position);
    zArrow.position.set(...position);

    xArrow.scale.set(props.size, props.size, props.size);
    yArrow.scale.set(props.size, props.size, props.size);
    zArrow.scale.set(props.size, props.size, props.size);

    const textOffset = 1.2;
    setXTextPosition(
      new THREE.Vector3(textOffset * props.size, 0, 0)
        .add(new THREE.Vector3(...position))
        .toArray()
    );
    setYTextPosition(
      new THREE.Vector3(0, textOffset * props.size, 0)
        .add(new THREE.Vector3(...position))
        .toArray()
    );
    setZTextPosition(
      new THREE.Vector3(0, 0, textOffset * props.size)
        .add(new THREE.Vector3(...position))
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
