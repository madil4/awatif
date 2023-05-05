import * as THREE from "three";
import { onMount } from "solid-js";

export function Viewer() {
  let container: HTMLDivElement;

  onMount(() => {
    // the timeout is a hot fix for container.clientWidth/Height to give correct result
    setTimeout(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      renderer.render(scene, camera);
    }, 0);
  });

  return (
    <>
      <div ref={container!} class="w-full h-full"></div>
    </>
  );
}
