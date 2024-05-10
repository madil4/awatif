// Import necessary modules from Three.js
import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

/**
 * Function to set up a 3D scene with beams, dowels, and sheets
 */
export function setup3DCube(
    node: number,
    elements: number[],
    angles: number[],
    height: number,
    width: number,
    sheetThickness: number,
    sheetNumber: number,
    fastenerPositionX: number[],
    fastenerPositionZ: number[]
): void {
    // Get the container where the 3D cube will be rendered
    const container = document.getElementById('threejs-connection');
    if (!container) {
        console.error("Canvas container not found!");
        return;
    }

    // input 
    const beamLength = height;
    const sheetLength = height - 100;

    // console.log("3node: ", node)

    // Ensure a default size if the container has no explicit size
    const canvasWidth = container.clientWidth || 800;
    const canvasHeight = container.clientHeight || 500;

    // Create the scene and set the background color
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    // Create a perspective camera for 3D projection
    const camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 4000);

    // Create the renderer and add it to the specified container
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    container.appendChild(renderer.domElement);

    // Create a group to hold all beams
    const beamGroup = new THREE.Group();
    const sheetGroup = new THREE.Group();
    const geometryGroup = new THREE.Group();
    let x0 = 0;
    let z0 = 0;

    if (angles.length > 1) {

        let x0 = height;
        let z0 = height;

        const [beamBlock] = createRectangular(x0, width, z0, 0, 0, "block", "yellow", 0.2)
        beamGroup.add(beamBlock);
    
        const [sheetBlock] = createRectangular(x0, sheetThickness, z0, 0, 0, "block", "blue", 0.5)
        sheetGroup.add(sheetBlock);

        angles.forEach((angle) => {

            const [beam] = createRectangular(beamLength, width, height, x0, z0, angle, "yellow", 0.2)
            beamGroup.add(beam);
    
            const [sheet] = createRectangular(sheetLength, sheetThickness, height, x0, z0, angle, "blue", 0.5)
            sheetGroup.add(sheet);
    
            fastenerPositionX.forEach((coordinateX, dowelIndex) => {
    
                // Create the beams, sheets, and dowels
                const [dowel] = createDowel(
                    width, 8, 100, 10, x0, z0, angle, "red", 1, coordinateX, fastenerPositionZ[dowelIndex]
                );
                geometryGroup.add(dowel);
            });
        });
    } else {

        console.log("test angles: ", angles.length)
        // Add beams, dowels, and sheets at specific angles and positions
        angles.forEach((angle) => {

            const [beam] = createRectangularOne(beamLength, width, height, x0, z0, angle, "yellow", 0.2)
            beamGroup.add(beam);

            const [sheet] = createRectangularOne(sheetLength, sheetThickness, height, x0, z0, angle, "blue", 0.5)
            sheetGroup.add(sheet);

            fastenerPositionX.forEach((coordinateX, dowelIndex) => {

                // Create the beams, sheets, and dowels
                const [dowel] = createDowel(
                    width, 8, 100, 10, x0, z0, angle, "red", 1, coordinateX, fastenerPositionZ[dowelIndex]
                );
                geometryGroup.add(dowel);
        });
    });
    }

    

    // const mergedSheets = BufferGeometryUtils.mergeGeometries(sheetGroup)
    geometryGroup.add(beamGroup);
    geometryGroup.add(sheetGroup);

    // Assuming `scene` and `group` are already created and populated with meshes:
    // const material = new THREE.MeshStandardMaterial({ color: 'blue', metalness: 0.5, roughness: 0.5 });
    // const mergedMesh = mergeGroupMeshes(sheetGroup, material);
    // geometryGroup.add(mergedMesh);
    
    // Calculate the centroid of the group for camera positioning
    const box = new THREE.Box3().setFromObject(geometryGroup);
    const centroid = new THREE.Vector3();
    box.getCenter(centroid);

    // Align the group's centroid to the origin
    geometryGroup.position.sub(centroid);

    // Add the group to the scene
    scene.add(geometryGroup);

    // Position the camera to look directly down the x-axis from the front
    const distance = 1000; // Adjust this value to control how far away the camera is
    camera.position.set(centroid.x, centroid.y + distance, centroid.z + distance);
    camera.lookAt(centroid);

    // Add a light source that casts shadows
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 10, 5);
    light.castShadow = true;

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

        // Update the group's rotation based on mouse movement
        geometryGroup.rotation.y += -deltaX * 0.01;
        geometryGroup.rotation.x += -deltaY * 0.01;

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

function createRectangular(
    length: number,
    width: number,
    height: number,
    x0: number,
    z0: number,
    angles: any,
    color: string,
    opacity: number,
): [mesh: THREE.Mesh] {

    // material
    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: opacity
    });

    const box = new THREE.BoxGeometry(length, width, height);
    const mesh = new THREE.Mesh(box, material);
    const angle: any = THREE.MathUtils.degToRad(angles);
    mesh.castShadow = true;

    // position
    if (angles == "block") { 
        mesh.position.set(0, 0, 0); 
    } else if (angles == 0) {
        mesh.position.set(-x0 / 2 - length / 2, 0, 0); 
    } else if (angles == 90) {
        mesh.rotation.y = angle;
        mesh.position.set(0, 0, z0 / 2 + (length / 2)); 
    } else {
        mesh.rotation.y = angle;
        mesh.position.set( -x0 / 2 - (length / 2) * Math.cos(angle), 0, z0 / 2 + (length / 2) * Math.sin(angle)); 
    };

    return [mesh]
}

function createDowel(
    length: number,
    radius: number,
    height: number,
    segments: number,
    x0: number,
    z0: number,
    angle: number,
    color: string,
    opacity: number,
    coordinateX: number,
    coordinateZ: number
): [dowel: THREE.Mesh] {
    
    // material
    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: opacity
    });

    const dowel = new THREE.CylinderGeometry(radius, radius, height, segments);
    const mesh = new THREE.Mesh(dowel, material);
    const angleRad: any = THREE.MathUtils.degToRad(angle);
    mesh.castShadow = true;

    console.log("angleee", angle)

    // position
    if (angle == 0) {
        mesh.position.set(x0 / 2 - length / 2 + coordinateX, 0, -coordinateZ); 
    } else if (angle == 90) {
        mesh.rotation.y = angle;
        mesh.position.set(0, 0, z0 / 2 + (length / 2) - coordinateZ); 
    } else {
        mesh.rotation.y = angle;
        mesh.position.set( -x0 / 2 - (length / 2 - coordinateX) * Math.cos(angleRad), 0, z0 / 2 + (length / 2) * Math.sin(angleRad)); 
    };
    
    return [mesh]
}


function mergeGroupMeshesold(group: THREE.Group, material: THREE.Material): THREE.Mesh {
    const geometries: THREE.BufferGeometry[] = [];

    // Iterate through all children in the group
    group.children.forEach(child => {
        // Check if the child is a mesh
        if (child instanceof THREE.Mesh) {
            // Clone and apply the mesh's transformation to its geometry
            const geometry = child.geometry.clone();
            geometry.applyMatrix4(child.matrixWorld);
            geometries.push(geometry);
        }
    });

    // Merge all geometries into a single buffer geometry
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);

    // Create a single mesh from the merged geometry
    const mergedMesh = new THREE.Mesh(mergedGeometry, material);

    // Enable casting shadows if any mesh in the group does so
    mergedMesh.castShadow = group.children.some(child => (child as THREE.Mesh).castShadow);

    return mergedMesh;
}

function mergeGroupMeshes(group: THREE.Group, material: THREE.Material): THREE.Mesh {
    const geometries: THREE.BufferGeometry[] = [];

    // Iterate through all children in the group
    group.children.forEach(child => {
        // Check if the child is a mesh and has a valid geometry
        if (child instanceof THREE.Mesh && child.geometry) {
            // Clone and apply the mesh's transformation to its geometry
            const geometry = child.geometry.clone();
            geometry.applyMatrix4(child.matrixWorld); // Apply the mesh's transformation
            geometries.push(geometry);
        }
    });

    // Verify that geometries have been correctly collected
    if (geometries.length === 0) {
        console.warn("No valid geometries found for merging.");
        return new THREE.Mesh(); // Return an empty mesh as a fallback
    }

    // Merge all geometries into a single buffer geometry
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);

    // Create a single mesh from the merged geometry
    const mergedMesh = new THREE.Mesh(mergedGeometry, material);

    // Enable casting shadows if any mesh in the group does so
    mergedMesh.castShadow = group.children.some(child => (child as THREE.Mesh).castShadow);

    return mergedMesh;
}

function createRectangularOne(
    length: number,
    width: number,
    height: number,
    x0: number,
    z0: number,
    angles: any,
    color: string,
    opacity: number,
): [mesh: THREE.Mesh] {

    // material
    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: opacity
    });

    const box = new THREE.BoxGeometry(length, width, height);
    const mesh = new THREE.Mesh(box, material);
    const angle: any = THREE.MathUtils.degToRad(angles);
    mesh.castShadow = true;


    if (angles == 0) {
        mesh.position.set(0, 0, 0); 
    } else if (angles == 90) {
        mesh.rotation.y = angle;
        mesh.position.set(0, 0, z0 / 2 + (length / 2)); 
    } else {
        mesh.rotation.y = angle;
        mesh.position.set( 0, 0, z0 / 2 + (length / 2) * Math.sin(angle)); 
    };

    return [mesh]
}

function createDowelOne(
    length: number,
    radius: number,
    height: number,
    segments: number,
    x0: number,
    z0: number,
    angle: number,
    color: string,
    opacity: number,
    coordinateX: number,
    coordinateZ: number
): [dowel: THREE.Mesh] {
    
    // material
    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: opacity
    });

    const dowel = new THREE.CylinderGeometry(radius, radius, height, segments);
    const mesh = new THREE.Mesh(dowel, material);
    const angleRad: any = THREE.MathUtils.degToRad(angle);
    mesh.castShadow = true;

    console.log("angleee", angle)

    // position
    if (angle == 0) {
        mesh.position.set(coordinateX, 0, -coordinateZ); 
    } else if (angle == 90) {
        mesh.rotation.y = angle;
        mesh.position.set(0, 0, z0 / 2 + (length / 2) - coordinateZ); 
    } else {
        mesh.rotation.y = angle;
        mesh.position.set( coordinateX * Math.cos(angleRad), 0, z0 / 2 + (length / 2) * Math.sin(angleRad)); 
    };
    
    return [mesh]
}