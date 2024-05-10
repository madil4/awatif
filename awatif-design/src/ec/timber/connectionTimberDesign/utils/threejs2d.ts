// Import necessary modules from Three.js
import * as THREE from 'three';

// Function to set up the 2D scene
export function setup2DBeams(): void {
    // Get the container where the 2D geometry will be rendered
    const container = document.getElementById('threejs-canvas');
    if (!container) {
        console.error("Canvas container not found!");
        return;
    }

    // Ensure a default size if the container has no explicit size
    const canvasWidth = container.clientWidth || 600;
    const canvasHeight = container.clientHeight || 600;

    // Create the scene and set the background color
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    // Create an orthographic camera for 2D projection
    const aspectRatio = canvasWidth / canvasHeight;
    const cameraSize = 400;
    const camera = new THREE.OrthographicCamera(
        -cameraSize * aspectRatio, // left
        cameraSize * aspectRatio, // right
        cameraSize, // top
        -cameraSize, // bottom
        0.1, // near
        1000 // far
    );
    camera.position.set(0, 0, 100); // Adjust based on input dimensions
    camera.lookAt(0, 0, 0);

    // Create the renderer and add it to the specified container
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    container.appendChild(renderer.domElement);

    // Create a group to hold all beams
    const beamGroup = new THREE.Group();

    // Example data (angles, dimensions, etc.)
    const angles = [0, -45, 180];
    const length = 800;
    const width = 50;
    const height = 50;

    // Create beams at specific angles and add them to the group
    angles.forEach((angle) => {
        const beam = create2DBeam(length, height, width, 'red', THREE.MathUtils.degToRad(angle));
        beamGroup.add(beam);
    });

    // Calculate the centroid of the group for proper positioning
    const box = new THREE.Box3().setFromObject(beamGroup);
    const centroid = new THREE.Vector3();
    box.getCenter(centroid);

    // Align the group's centroid to the origin
    beamGroup.position.sub(centroid);

    // Add the group to the scene
    scene.add(beamGroup);

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

        // Update the group's rotation based on mouse movement around the z-axis (2D rotation)
        beamGroup.rotation.z += deltaX * 0.01;

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
        renderer.render(scene, camera);
    }

    // Start the animation
    animate();
}

// Function to create a 2D beam with specified properties
function create2DBeam(length: number, height: number, width: number, color: string, rotationAngle: number): THREE.Mesh {
    // Create the beam geometry (2D rectangle as a flat plane)
    const geometry = new THREE.PlaneGeometry(length, height);

    // Create the beam material
    const material = new THREE.MeshBasicMaterial({ color });
    const beam = new THREE.Mesh(geometry, material);

    // Set the beam's rotation around the z-axis (2D plane)
    beam.rotation.z = rotationAngle;

    // Set the beam's position so it rotates around the pivot at half height
    const offsetX = (length / 2) * Math.cos(rotationAngle);
    const offsetY = (length / 2) * Math.sin(rotationAngle);
    beam.position.set(offsetX, offsetY, 0);

    // Return the created beam
    return beam;
}
