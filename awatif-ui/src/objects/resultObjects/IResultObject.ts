import * as THREE from "three";

export interface IResultObject extends THREE.Group {
  updateScale(scale: number): void;
  dispose(): void;
}
