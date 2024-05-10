// Import necessary modules from Three.js
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

//     <div class="canvas-container" id="threejs-model"></div>

export function setupNodesAndElements(nodes: number[][], elements: number[][]): void {
    // Get the container where the visualization will be rendered
    const container = document.getElementById('threejs-model');
    if (!container) {
        console.error("Canvas container not found!");
        return;
    }

    // Ensure a default size if the container has no explicit size
    const canvasWidth = container.clientWidth || 400;
    const canvasHeight = container.clientHeight || 300;

    // Create the scene and set the background color
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    // Create an orthographic camera
    const aspectRatio = canvasWidth / canvasHeight;
    const cameraSize = 10; // Adjust the size as necessary
    const camera = new THREE.OrthographicCamera(
        -cameraSize * aspectRatio, // Left
        cameraSize * aspectRatio,  // Right
        cameraSize,                // Top
        -cameraSize,               // Bottom
        0.1,                       // Near
        1000                       // Far
    );

    // Calculate the centroid of the node group
    const centroid = calculateCentroid(nodes);

    // Set the camera to always be centered and in front of the model
    camera.position.set(centroid.x, -10, centroid.z); // Adjust distance along z-axis as necessary
    camera.lookAt(centroid);

    // Create the WebGL renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    container.appendChild(renderer.domElement);

    // Create the CSS2D renderer for annotations
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(canvasWidth, canvasHeight);
    labelRenderer.domElement.style.position = 'relative';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    // Create a group to hold all nodes and lines
    const nodeGroup = new THREE.Group();

    // Draw a red dot for each node and annotate with IDs
    nodes.forEach((node, index) => {
        const dotGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(node[0], node[1], node[2]);
        nodeGroup.add(dot);

        // Create an HTML label for the node ID
        const nodeLabel = document.createElement('div');
        nodeLabel.className = 'node-label';
        nodeLabel.textContent = `${index}`;
        nodeLabel.style.color = 'white';
        nodeLabel.style.fontFamily = 'Arial';
        nodeLabel.style.backgroundColor = '#2e5368';
        nodeLabel.style.fontSize = '15px'; // Smaller text
        nodeLabel.style.padding = '2px 4px';
        nodeLabel.style.borderRadius = '30px';
        nodeLabel.style.border = '1px solid black';

        // Attach the label to the node using CSS2DObject and apply a downward offset
        const labelObject = new CSS2DObject(nodeLabel);
        labelObject.position.set(node[0], node[1] - 0.5, node[2] + 1.2); // Adjust -0.5 as needed
        nodeGroup.add(labelObject);
    });

    // Connect nodes with lines and annotate with element IDs
    elements.forEach(([startIndex, endIndex], index) => {
        const startNode = new THREE.Vector3(...nodes[startIndex]);
        const endNode = new THREE.Vector3(...nodes[endIndex]);

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([startNode, endNode]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });
        const line = new THREE.Line(lineGeometry, lineMaterial);

        nodeGroup.add(line);

        // Create an HTML label for the element ID
        const elementLabel = document.createElement('div');
        elementLabel.className = 'element-label';
        elementLabel.textContent = `${index}`;
        elementLabel.style.fontFamily = 'Arial';
        elementLabel.style.color = 'white';
        elementLabel.style.backgroundColor = '#3e8aa1';
        elementLabel.style.fontSize = '15px'; // Smaller text
        elementLabel.style.padding = '2px 4px';
        elementLabel.style.borderRadius = '2px';
        elementLabel.style.border = '1px solid black';

        // Attach the label at the midpoint of the line and apply a downward offset
        const midpoint = new THREE.Vector3().addVectors(startNode, endNode).multiplyScalar(0.5);
        const lineLabelObject = new CSS2DObject(elementLabel);
        lineLabelObject.position.copy(midpoint).add(new THREE.Vector3(0, -0.5, 1.2)); // Adjust -0.5 as needed
        nodeGroup.add(lineLabelObject);
    });

    // Add the node group to the scene
    scene.add(nodeGroup);

    // Animation loop
    function animate(): void {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }

    // Start the animation
    animate();
    }

    function calculateCentroid(nodes: number[][]): THREE.Vector3 {
        const centroid = new THREE.Vector3(0, 0, 0);
    
        // Sum up all node coordinates
        nodes.forEach((node) => {
            centroid.x += node[0];
            centroid.y += node[1];
            centroid.z += node[2];
        });
    
        // Divide by the number of nodes to get the average (centroid)
        const nodeCount = nodes.length;
        centroid.x /= nodeCount;
        centroid.y /= nodeCount;
        centroid.z /= nodeCount;
    
        return centroid;
    }