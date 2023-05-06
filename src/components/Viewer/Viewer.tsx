import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { children, onMount } from "solid-js";

export function Viewer(props: any) {
  let container: HTMLDivElement;

  const objects = children(() => props.children).toArray();

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

      objects.forEach((object: any) => scene.add(object));

      const controls = new OrbitControls(camera, renderer.domElement);
      camera.position.set(0, 1, 5);
      controls.update();

      renderer.render(scene, camera);
      controls.addEventListener("change", () => {
        renderer.render(scene, camera);
      });
    }, 0);
  });

  return (
    <>
      <div ref={container!} class="w-full h-full"></div>
    </>
  );
}
