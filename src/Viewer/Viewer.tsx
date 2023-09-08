import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { children, createEffect, createSignal, on, onMount } from "solid-js";

type ViewerProps = {
  children: any;
  gridSize: number;
};

export function Viewer(props: ViewerProps) {
  let container: HTMLDivElement;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 2 * 1e6); // supported view till 1e6
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  // after dom rendered
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

  // on grid size change
  createEffect(() => {
    const z2fit =
      props.gridSize * 0.5 + (props.gridSize * 0.5) / Math.tan(45 * 0.5);
    camera.position.set(0.5 * props.gridSize, 0.75 * props.gridSize, z2fit);
    controls.target.set(0.5 * props.gridSize, 0, -0.5 * props.gridSize);
    controls.minDistance = 1;
    controls.maxDistance = z2fit * 1.5;
    controls.update();
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

  // on control change
  controls.addEventListener("change", () => {
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
