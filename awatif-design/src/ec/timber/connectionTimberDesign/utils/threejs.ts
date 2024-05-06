// Import necessary modules from Three.js
import * as THREE from 'three';

function addCube(
    length: number,
    height: number,
    width: number,
    position: { x: number, y: number, z: number },
    rotation: { x: number, y: number, z: number }
): THREE.Mesh {
    // Create a transparent 3D cube using BoxGeometry
    const geometry = new THREE.BoxGeometry(length, height, width);
    const material = new THREE.MeshStandardMaterial({
        color: 0x0077ff, // Blue color
        transparent: true,
        opacity: 0.5, // Set the transparency level
        metalness: 0.1,
        roughness: 0.8
    });

    // Create the mesh with the geometry and material
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true; // Allow the cube to cast a shadow

    // Set the cube's position
    cube.position.set(position.x, position.y, position.z);

    // Set the cube's rotation using Euler angles
    cube.rotation.set(rotation.x, rotation.y, rotation.z);

    // Return the cube mesh
    return cube;
}

export function threejs(length: number, height: number, width: number): void {
    // Get the container where the 3D cube will be rendered
    const container = document.getElementById('threejs-canvas');
    if (!container) {
        console.error("Canvas container not found!");
        return;
    }

    // Ensure a default size if the container has no explicit size
    const canvasWidth = container.clientWidth || 600;
    const canvasHeight = container.clientHeight || 300;

    // Create the scene and set the background color
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white"); // Light grey background

    // Create a perspective camera for 3D projection
    const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 2000);
    camera.position.z = Math.max(length, height, width) * 2; // Adjust based on input dimensions

    // Create the renderer and add it to the specified container
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    container.appendChild(renderer.domElement);

    const cube = addCube(3, 2, 1, { x: 1, y: 2, z: -3 }, { x: 0, y: Math.PI / 4, z: 0 });
    scene.add(cube);

    const cube2 = addCube(3, 2, 1, { x: 1, y: 2, z: -6 }, { x: 0, y: Math.PI / 4, z: 0 });
    scene.add(cube2);

    // Add a light source that casts shadows
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 10, 5);
    light.castShadow = true; // Enable shadow casting

    // Adjust the shadow properties for the light
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 20;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;

    scene.add(light);

    // Variables to track the mouse movement and rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Event listeners to implement drag-to-rotate behavior
    renderer.domElement.addEventListener('mousedown', function (event) {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });

    renderer.domElement.addEventListener('mousemove', function (event) {
        if (!isDragging) return;

        // Calculate the mouse movement difference
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        // Update the cube rotation based on mouse movement
        cube.rotation.y += deltaX * 0.01;
        cube.rotation.x += deltaY * 0.01;

        // Update the previous mouse position
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });

    renderer.domElement.addEventListener('mouseup', function () {
        isDragging = false;
    });

    renderer.domElement.addEventListener('mouseleave', function () {
        isDragging = false;
    });

    // Animation loop
    function animate(): void {
        requestAnimationFrame(animate);

        // Render the scene with the perspective camera
        renderer.render(scene, camera);
    }

    // Start the animation
    animate();
}

// Execute the setup function once the DOM is ready with specific dimensions (length, height, width)
document.addEventListener('DOMContentLoaded', () => threejs(3, 2, 1));
