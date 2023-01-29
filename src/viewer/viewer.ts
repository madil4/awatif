import * as THREE from "three";
import { OrbitControls } from "./utils/OrbitControls";

export class Viewer {
  private _renderer: THREE.WebGLRenderer;
  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;

  constructor() {
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      50
    );
    this._camera.position.set(0, 2, 10);
    this._renderer.setAnimationLoop(() => {
      this._renderer.render(this._scene, this._camera);
    });
    new OrbitControls(this._camera, this._renderer.domElement);

    const grid = new THREE.GridHelper(10, 10);
    grid.position.set(0, -2, 0);
    this._scene.add(grid);
  }

  render(): HTMLElement {
    return this._renderer.domElement;
  }
}
