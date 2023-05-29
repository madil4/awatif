import { createEffect, onCleanup } from "solid-js";
import * as THREE from "three";

type TextProps = {
  text: any;
  position: any;
  size: any;
};

export function Text(props: TextProps) {
  const material = new THREE.SpriteMaterial();

  if (!props.text || !props.position || !props.size) return;
  if (
    typeof props.text != "string" ||
    props.position.length != 3 ||
    props.position.some((e: any) => typeof e !== "number") ||
    typeof props.size != "number"
  )
    return;

  const resolution = 100;
  material.map = createTexture(props.text, props.size, resolution);
  material.depthTest = false;

  const text = new THREE.Sprite(material);
  text.renderOrder = 99;
  text.position.set(props.position[0], props.position[2], props.position[1]);
  text.scale.set(
    material.map.image.width / resolution / devicePixelRatio,
    props.size,
    1
  );

  onCleanup(() => {
    material.map?.dispose();
    material.dispose();
  });

  // on text change or size change
  createEffect(() => {
    material.map?.dispose();
    material.map = createTexture(props.text, props.size, resolution);
    text.scale.set(
      material.map.image.width / resolution / devicePixelRatio,
      props.size,
      1
    );
  });

  return <>{text}</>;
}

function createTexture(text: string, size: number, resolution: number) {
  const fontHeightPx = resolution * size * devicePixelRatio;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${fontHeightPx}px Arial`;

    canvas.width = ctx.measureText(text).width;
    canvas.height = fontHeightPx;

    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    const toMargin = 0.9;
    ctx.font = `${fontHeightPx * toMargin}px Arial`;
    const toCenterTextV = 0.08 * canvas.height;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + toCenterTextV);
  }

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}
