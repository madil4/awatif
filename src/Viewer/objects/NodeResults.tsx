import * as THREE from "three";
import { Text } from "./Text";
import { Show, onCleanup } from "solid-js";

type NodeResultProps = {
  position: any;
  result: any;
};

export function NodeResult(props: NodeResultProps) {
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

  const swapYZPosition: [number, number, number] = [
    props.position[0],
    props.position[2],
    props.position[1],
  ];

  const xArrow = new THREE.ArrowHelper(
    new THREE.Vector3(props.result[0] >= 0 ? 1 : -1, 0, 0),
    new THREE.Vector3(...swapYZPosition),
    1,
    props.result[0] >= 0 ? 0x005ce6 : 0xe62e00,
    0.3,
    0.3
  );
  const yArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, props.result[1] >= 0 ? 1 : -1),
    new THREE.Vector3(...swapYZPosition),
    1,
    props.result[1] >= 0 ? 0x005ce6 : 0xe62e00,
    0.3,
    0.3
  );
  const zArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, props.result[2] >= 0 ? 1 : -1, 0),
    new THREE.Vector3(...swapYZPosition),
    1,
    props.result[2] >= 0 ? 0x005ce6 : 0xe62e00,
    0.3,
    0.3
  );

  const xTextPosition = new THREE.Vector3(
    props.result[0] >= 0 ? 1.3 : -1.3,
    0,
    0
  )
    .add(new THREE.Vector3(...props.position))
    .toArray();
  const yTextPosition = new THREE.Vector3(
    0,
    props.result[1] >= 0 ? 1.3 : -1.3,
    0
  )
    .add(new THREE.Vector3(...props.position))
    .toArray();
  const zTextPosition = new THREE.Vector3(
    0,
    0,
    props.result[2] >= 0 ? 1.3 : -1.3
  )
    .add(new THREE.Vector3(...props.position))
    .toArray();

  onCleanup(() => {
    xArrow.dispose();
    yArrow.dispose();
    zArrow.dispose();
  });

  return (
    <>
      <Show when={props.result[0] != 0}>
        <>
          {xArrow}
          {
            <Text
              text={`${props.result[0]}`}
              position={xTextPosition}
              size={0.4}
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
              position={yTextPosition}
              size={0.4}
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
              position={zTextPosition}
              size={0.4}
            />
          }
        </>
      </Show>
    </>
  );
}
