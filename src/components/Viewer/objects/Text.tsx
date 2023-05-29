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

  const fontHeightPx = 70;
  const fontHeightPxScaled = fontHeightPx * props.size * devicePixelRatio;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${fontHeightPxScaled}px Arial`;

    canvas.width = ctx.measureText(props.text).width;
    canvas.height = fontHeightPxScaled;

    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    const toMargin = 0.9;
    ctx.font = `${fontHeightPxScaled * toMargin}px Arial`;
    const toCenterTextV = 0.08 * canvas.height;
    ctx.fillText(
      props.text,
      canvas.width / 2,
      canvas.height / 2 + toCenterTextV
    );
  }

  material.map = new THREE.Texture(canvas);
  material.map.needsUpdate = true;
  material.depthTest = false;

  const text = new THREE.Sprite(material);
  text.position.set(props.position[0], props.position[2], props.position[1]);
  text.scale.set(
    material.map.image.width / fontHeightPx / devicePixelRatio,
    props.size,
    1
  );
  text.renderOrder = 99;

  return <>{text}</>;
}
