import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { children, createEffect, createSignal, on, onMount } from "solid-js";

export function Viewer(props: any) {
  let container: HTMLDivElement;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 5, 10);
  controls.minDistance = 1;
  controls.maxDistance = 40;
  controls.update();

  // on control change
  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });

  onMount(() => {
    container.appendChild(renderer.domElement);

    // on container size change
    new ResizeObserver((entries) => {
      const content = entries[0].contentRect;

      camera.aspect = content.width / content.height;
      camera.updateProjectionMatrix();

      renderer.setSize(content.width, content.height);
      renderer.render(scene, camera);
    }).observe(container);
  });

  // on children (objects) change
  createEffect(() => {
    const objects = children(() => props.children).toArray();

    scene.clear();
    objects.forEach((object: any) => {
      if (object instanceof THREE.Object3D) scene.add(object);
    });

    renderer.render(scene, camera);
  });

  // on render action
  createEffect(
    on(renderAction, () => {
      renderer.render(scene, camera);
    })
  );

  return <div ref={container!} class="w-full h-full"></div>;
}

// actions
export const [renderAction, setRenderAction] = createSignal(0);
