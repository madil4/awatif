// Import necessary modules from Three.js
import * as THREE from 'three';

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


    angles.forEach((angle, index) => {

        const element = elements[index]

        console.log("element", element, "angle", angle)
        const width = widths[index]
        const height = heights[index]
        let angleRad: number = THREE.MathUtils.degToRad(angle );

        const gapx = sheetLength / 2
        const gapy = 0
        
        const rotatedXCoord = gapx * Math.cos(angleRad) - gapy * Math.sin(angleRad)
        const rotatedYCoord = gapx * Math.sin(angleRad) + gapy * Math.cos(angleRad)
        
        const x = -(rotatedXCoord + gapx)
        const y = rotatedYCoord + gapy

        if (index == 0) {

            beamLength = sheetLengths[index] + 100
            sheetLength = sheetLengths[index] * 1.5

        } else {

            beamLength = sheetLengths[index] + 100
            sheetLength = sheetLengths[index]* 1.5

        };

        // const [beam] = createRectangular(beamLength, widths[index], heights[index], angle, "yellow", 0.2)
        const [sheet] = createRectangular(sheetLength, sheetThickness, height, angle, "blue", 0.5)
        
        if (index == 0) {

            // beam.position.set(0, 0, 0)
            sheet.position.set(0, 0, 0)

        } else {

            // beam.position.set(-x, 0, y)
            sheet.position.set(x, 0, y)
            // sheet.position.set(0, 0, 0)
        }

        // beamGroup.add(beam);
        sheetGroup.add(sheet);

        const dowels = new THREE.Group();
        const xMin = Math.min(...fastenerPositionX[index])
        const xMax = Math.max(...fastenerPositionX[index])
        const xCentroid = (xMax - xMin) / 2 + xMin


        fastenerPositionX[index].forEach((coordinateXX, dowelIndex) => {

            let coordinateZ = fastenerPositionZ[index][dowelIndex]
            let coordinateX = coordinateXX - xCentroid

            // Create the beams, sheets, and dowels
            const [dowel] = createDowel(
                8, width, 10, "red", 0.2
            );

            if (angle > 0) {

                const angleRad: any = THREE.MathUtils.degToRad( 180 - angle );
                const rotatedXCoord = coordinateX * Math.cos(angleRad) - coordinateZ * Math.sin(angleRad)
                const rotatedYCoord = coordinateX * Math.sin(angleRad) + coordinateZ * Math.cos(angleRad)
                dowel.position.set(  rotatedXCoord , 0, rotatedYCoord + gapy)
                dowels.add(dowel);

            } else {
                dowel.position.set( coordinateX, 0, coordinateZ )
                dowels.add(dowel);
            }
        });


        //geometryGroup.add(dowels);
        
    });
    
    // const mergedSheets = BufferGeometryUtils.mergeGeometries(sheetGroup)
    geometryGroup.add(sheetGroup);
    geometryGroup.add(axesHelper);

    // Calculate the centroid of the group for camera positioning
    const box = new THREE.Box3().setFromObject(geometryGroup);
    const centroid = new THREE.Vector3();
    box.getCenter(centroid);

    // Add the group to the scene
    scene.add(geometryGroup);

    // CAMERA
    // Create a perspective camera for 3D projection
    const camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 4000);
    const distance = 1000; // Adjust this value to control how far away the camera is
    camera.position.set(centroid.x, centroid.y + distance, centroid.z + distance);
    camera.lookAt(centroid);

    // LIGHT
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

// Function to initialize the scene and renderer
function initializeScene(container: HTMLDivElement): { scene: THREE.Scene, renderer: THREE.WebGLRenderer } {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 500);
    container.appendChild(renderer.domElement);
    
    return { scene, renderer };
  }

  
// Function to set up the camera
function setupCamera(scene: THREE.Scene, container: HTMLDivElement): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 4000);
    scene.add(camera);
    return camera;
  }

// Function to create and add lights to the scene
function addLights(scene: THREE.Scene): void {
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);
  }

function createRectangular(
    length: number,
    width: number,
    height: number,
    angle: number,
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
    const angleRad: any = THREE.MathUtils.degToRad(angle);
    mesh.castShadow = true;
    mesh.rotation.y = angleRad;

    return [mesh]
}


function createDowel(
    radius: number,
    height: number,
    segments: number,
    color: string,
    opacity: number,
): [dowel: THREE.Mesh] {
    
    // material
    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: opacity
    });

    const dowel = new THREE.CylinderGeometry(radius, radius, height, segments);
    const mesh = new THREE.Mesh(dowel, material);
    mesh.castShadow = true;

    return [mesh]
}