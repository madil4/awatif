import * as THREE from "three";
import { Text } from "./Text";
import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import { convertAxesToAwatif } from "./utils/convertAxes";

type NodeResultProps = {
  position: any;
  result: any;
  size: number;
};

export function NodeResult(props: NodeResultProps) {
  const [xTextPosition, setXTextPosition] = createSignal([0, 0, 0]);
  const [yTextPosition, setYTextPosition] = createSignal([0, 0, 0]);
  const [zTextPosition, setZTextPosition] = createSignal([0, 0, 0]);

  if (
    !props.position ||
    !props.result ||
    props.position.length != 3 ||
    props.result.length != 3 ||
    props.position.some((element: any) => typeof element !== "number") ||
    props.result.some((element: any) => typeof element !== "number") ||
    props.position.flat().length != props.position.length ||
    props.result.flat().length != props.result.length
  )
    return;

  const position = convertAxesToAwatif(props.position);
  const xArrow = new THREE.ArrowHelper(
    new THREE.Vector3(props.result[0] >= 0 ? 1 : -1, 0, 0),
    new THREE.Vector3(...position),
    1,
    props.result[0] >= 0 ? 0x005ce6 : 0xe62e00,
    0.3,
    0.3
  );
  const yArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, props.result[1] >= 0 ? 1 : -1),
    new THREE.Vector3(...position),
    1,
    props.result[1] >= 0 ? 0x005ce6 : 0xe62e00,
    0.3,
    0.3
  );
  const zArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, props.result[2] >= 0 ? 1 : -1, 0),
    new THREE.Vector3(...position),
    1,
    props.result[2] >= 0 ? 0x005ce6 : 0xe62e00,
    0.3,
    0.3
  );

  // on size change
  createEffect(() => {
    xArrow.scale.set(props.size, props.size, props.size);
    yArrow.scale.set(props.size, props.size, props.size);
    zArrow.scale.set(props.size, props.size, props.size);

    const textOffset = 1.3 * props.size;
    setXTextPosition(
      new THREE.Vector3(props.result[0] >= 0 ? textOffset : -textOffset, 0, 0)
        .add(new THREE.Vector3(...props.position))
        .toArray()
    );
    setYTextPosition(
      new THREE.Vector3(0, props.result[1] >= 0 ? textOffset : -textOffset, 0)
        .add(new THREE.Vector3(...props.position))
        .toArray()
    );
    setZTextPosition(
      new THREE.Vector3(0, 0, props.result[2] >= 0 ? textOffset : -textOffset)
        .add(new THREE.Vector3(...props.position))
        .toArray()
    );
  });

  onCleanup(() => {
    xArrow.dispose();
    yArrow.dispose();
    zArrow.dispose();
  });

  const textScale = 0.04 / 0.07;

  return (
    <>
      <Show when={props.result[0] != 0}>
        <>
          {xArrow}
          {
            <Text
              text={`${props.result[0]}`}
              position={xTextPosition()}
              size={props.size * textScale}
            />
          }
        </>
      </Show>
      <Show when={props.result[1] != 0}>
        <>
          {yArrow}
          {
            <Text
              text={`${props.result[1]}`}
              position={yTextPosition()}
              size={props.size * textScale}
            />
          }
        </>
      </Show>
      <Show when={props.result[2] != 0}>
        <>
          {zArrow}
          {
            <Text
              text={`${props.result[2]}`}
              position={zTextPosition()}
              size={props.size * textScale}
            />
          }
        </>
      </Show>
    </>
  );
}
