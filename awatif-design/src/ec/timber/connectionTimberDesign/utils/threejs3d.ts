// Import necessary modules from Three.js
import * as THREE from 'three';
import { BufferGeometryUtils, FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';


// Create the scene and set the background color
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // Enable shadow mapping

export function setup3DCube(
  container: HTMLDivElement | undefined,
  node: number,
  elements: number[],
  angles: number[],
  heights: number[],
  widths: number[],
  sheetNumber: number,
  sheetLengths: number[],
  sheetThickness: number,
  fastenerPositionX: number[][],
  fastenerPositionZ: number[][]
): void {


    scene.clear();
    
    // Get the container where the 3D cube will be rendered
    if (!container) {
        console.error("Canvas container not found!");
        return;
    }


    // Ensure a default size if the container has no explicit size
    const canvasWidth = container.clientWidth || 800;
    const canvasHeight = container.clientHeight || 500;

    var axesHelper = new
    THREE.AxesHelper(500);
    scene.add(axesHelper);

    // Create the renderer and add it to the specified container
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    container.appendChild(renderer.domElement);


    // Create a group to hold all beams
    const beamGroup = new THREE.Group();
    const sheetGroup = new THREE.Group();
    const beamSheetDowelGroup = new THREE.Group();
    const geometryGroup = new THREE.Group();
    let sheetLength: number;
    let beamLength: number;  // Declare `beamLength` outside the if-else blocks


    // loop through angles
    angles.forEach((angle, index) => {

        // console.log("node: ", node, "element: ", elements[index], "angle: ", angle)

        // parameter
        const width = widths[index]
        const height = heights[index]
        sheetLength = sheetLengths[index] * 1.5
        beamLength = sheetLength + 200

        // textures
        const loader = new THREE.TextureLoader();
        const woodTexture = loader.load('./timber-texture.PNG');
        const metaTexture = loader.load('./metal-texture.PNG');

        // calculate sheet rotation and offset
        let angleRad: number = THREE.MathUtils.degToRad( -angle );
        const setX = sheetLength / 2 * Math.cos(angleRad)
        const setZ = -sheetLength / 2 * Math.sin(angleRad) 

        // create geometry
        // loop over sheet number
        let setY: number
        for (let i = 0; i < sheetNumber; i++) {
            const [sheet] = createRectangular(sheetLength, sheetThickness, height, "#3E8CA3", 0.99, true, metaTexture)
            if (i == 0) {
                setY = width / 4

            } else {
                setY = -width / 4
            }

        sheet.rotation.y = angleRad;
        sheet.position.set(setX, setY, setZ)
        sheetGroup.add(sheet);

        }

        const [beam] = createRectangular(beamLength, width, height, "#B99B80", 0.3, false, woodTexture)
        beam.rotation.y = angleRad;
        beam.position.set(setX, 0, setZ)
        beamGroup.add(beam);

        // fastener
        const dowels = new THREE.Group();
        // loop through coordinates
        fastenerPositionX[index].forEach((coordinateX, dowelIndex) => {

            // parameter
            let coordinateZ = fastenerPositionZ[index][dowelIndex]

            // Create the beams, sheets, and dowels
            const [dowel] = createDowel(8, width, 10, "#00FF00", 1);

            const angleRad: any = THREE.MathUtils.degToRad( angle );
            const rotatedXCoord = coordinateX * Math.cos(angleRad) - coordinateZ * Math.sin(angleRad)
            const rotatedYCoord = coordinateX * Math.sin(angleRad) + coordinateZ * Math.cos(angleRad)
            dowel.position.set( rotatedXCoord, 0, rotatedYCoord )
            dowels.add(dowel);

        });
        geometryGroup.add(dowels);

    });

    geometryGroup.add(beamGroup);
    geometryGroup.add(sheetGroup);
    geometryGroup.add(axesHelper);

    // text
    const text = createText("Hello World!", "aqua");
    

    // Calculate the centroid of the group for camera positioning
    const box = new THREE.Box3().setFromObject(geometryGroup);
    const centroid = new THREE.Vector3();
    box.getCenter(centroid);

    // Add the group to the scene
    scene.add(geometryGroup);

    // CAMERA
    // Create a perspective camera for 3D projection
    const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 4000);
    const distance = 1200; // Adjust this value to control how far away the camera is
    camera.position.set(0, -distance, 0);
    camera.lookAt(centroid);

    // LIGHT
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, -10, 5);
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

    const updateRotation = (dx: number, dz: number): void => {
    geometryGroup.rotation.x += dz * 0.005; // Adjust multiplier for smoother rotation
    geometryGroup.rotation.z += dx * 0.005; // Ensure rotation axis is handled correctly
};

    renderer.domElement.addEventListener('mousemove', function (event) {
        if (!isDragging) return;

        // Calculate the mouse movement difference
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        // Update the group's rotation based on mouse movement
        updateRotation(deltaX, deltaY); // Centralize rotation logic for reusability


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


// FUNCTIONS
function createRectangular(
    length: number,
    width: number,
    height: number,
    color: string,
    opacity: number,
    depthWrite: boolean,
    texture: any
): [mesh: THREE.Mesh] {
    // Define the material with color and transparency properties
    const material = new THREE.MeshStandardMaterial({
        color: color, // Set the material color
        transparent: true, // Enable transparency of the material
        opacity: opacity, // Define the opacity level
        side: THREE.DoubleSide,
        depthWrite: depthWrite,
        map: texture,
    });

    // Create the geometry for the rectangular prism
    const boxGeometry = new THREE.BoxGeometry(length, width, height);

    // Create the mesh using the defined geometry and material
    const rectangularMesh = new THREE.Mesh(boxGeometry, material);
    rectangularMesh.castShadow = true; // Allow the mesh to cast shadows

    // Return the mesh in a tuple, allowing for easy destructuring elsewhere in the code
    return [rectangularMesh];
}

function createDowel(
    radius: number,
    length: number,
    segments: number,
    color: string,
    opacity: number
): [THREE.Mesh] {
    // Define the material of the dowel with color and opacity properties
    const material = new THREE.MeshStandardMaterial({
        color: color, // Color in hexadecimal
        transparent: true, // Enable transparency
        opacity: opacity // Set opacity level
    });

    // Create the geometry for the dowel as a cylinder
    const dowelGeometry = new THREE.CylinderGeometry(radius, radius, length, segments);

    // Create the mesh object using the geometry and material defined above
    const dowelMesh = new THREE.Mesh(dowelGeometry, material);
    dowelMesh.castShadow = true; // Enable casting shadows for this mesh

    // Return the mesh in a tuple, allowing for destructuring on receipt
    return [dowelMesh];
}

function mergeGroupMeshes(group: THREE.Group): THREE.Mesh {
    const geometries: THREE.BufferGeometry[] = [];

    // Extract geometries and apply transformation matrices
    group.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BufferGeometry) {
            const geometry = child.geometry.clone();
            geometry.applyMatrix4(child.matrixWorld); // Apply world matrix to account for position, rotation, scale
            geometries.push(geometry);
        }
    });

    // Merge geometries
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries, true);

    // Assume the first child's material is used for the resulting mesh
    const material = group.children[0] instanceof THREE.Mesh ? group.children[0].material : new THREE.MeshStandardMaterial();
    
    // Create a new mesh with the merged geometry and material
    const mergedMesh = new THREE.Mesh(mergedGeometry, material);
    return mergedMesh;
}

function createText(
    text: string,
    color: THREE.ColorRepresentation
): Promise<THREE.Mesh> {
    return new Promise((resolve, reject) => {
        const loader = new FontLoader();
        loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
            const geometry = new TextGeometry(text, {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            });

            const material = new THREE.MeshPhongMaterial({ color: color, specular: 0xffffff });
            const mesh = new THREE.Mesh(geometry, material);
            resolve(mesh);
        }, undefined, function(error) {
            reject(error);
        });
    });
}