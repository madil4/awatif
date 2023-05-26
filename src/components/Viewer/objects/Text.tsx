import { onCleanup } from "solid-js";
import * as THREE from "three";

type TextProps = {
  text: any;
  position: any;
  size: any;
};

export function Text(props: TextProps) {
  const material = new THREE.SpriteMaterial();

  onCleanup(() => {
    material.map?.dispose();
    material.dispose();
  });

  if (!props.text || !props.position || !props.size) return;
  if (
    typeof props.text != "string" ||
    props.position.length != 3 ||
    props.position.some((e: any) => typeof e !== "number") ||
    typeof props.size != "number"
  )
    return;

  const fontHeightPx = 50;
  const fontHeightPxScaled = fontHeightPx * props.size * devicePixelRatio;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${fontHeightPxScaled}px Arial`;

    canvas.width = ctx.measureText(props.text).width;
    canvas.height = fontHeightPxScaled;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.font = `${fontHeightPxScaled}px Arial`;
    ctx.fillText(props.text, canvas.width / 2, canvas.height / 2);
  }

  material.map = new THREE.Texture(canvas);
  material.map.needsUpdate = true;

  const text = new THREE.Sprite(material);
  text.position.set(props.position[0], props.position[2], props.position[1]);
  text.scale.set(
    material.map.image.width / fontHeightPx / devicePixelRatio,
    props.size,
    1
  );

  return <>{text}</>;
}
