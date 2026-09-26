import * as THREE from "three";
import { WorkPlane, getWorkPlaneAxes } from "../common/workPlane";
import vertexShader from "./shaders/infiniteGrid.vert.glsl";
import fragmentShader from "./shaders/infiniteGrid.frag.glsl";

// Same colours as the origin axes (getAxes.ts): X red, Y green, Z blue
const AXIS_COLORS = [0xff0000, 0x00ff00, 0x0000ff];

export function getInfiniteGridMaterial({
  plane,
  offset,
  spacing,
}: {
  plane: WorkPlane;
  offset: number;
  spacing: number;
}): THREE.ShaderMaterial {
  const { span, normal } = getWorkPlaneAxes(plane);
  const unit = (axis: number) =>
    new THREE.Vector3().setComponent(axis, 1) as THREE.Vector3;

  return new THREE.ShaderMaterial({
    uniforms: {
      uSpacing: { value: spacing },
      uAxisA: { value: unit(span[0]) },
      uAxisB: { value: unit(span[1]) },
      uColorA: { value: new THREE.Color(AXIS_COLORS[span[0]]) },
      uColorB: { value: new THREE.Color(AXIS_COLORS[span[1]]) },
      uNormal: { value: unit(normal) },
      uOffset: { value: offset },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    // Pushed back so geometry lying on the plane doesn't z-fight with the grid
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
}
