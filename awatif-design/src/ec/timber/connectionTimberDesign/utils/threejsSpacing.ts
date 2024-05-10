// Import necessary modules from Three.js
import * as THREE from 'three';
import { ConnectionTimberDesignerInput } from '../connectionTimberDesign';
import { DesignOutput } from '../../../../design';
import { calculateElementAngles, filterConnectionTimberDesigns } from './sortData';


export function drawSpacings(
    distances: number[],
): void {

        let [a1, a2, a3t, a3c, a4t, a4c, e1] = distances;

      // Get the container where the visualization will be rendered
      const container = document.getElementById('threejs-spacing');
      if (!container) {
          console.error("Canvas container not found!");
          return;
      }
  
      // Ensure a default size if the container has no explicit size
      const canvasWidth = container.clientWidth || 400;
      const canvasHeight = container.clientHeight || 300;
  
      // Create the scene and set the background color
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("white");
  
      // Create an orthographic camera
      const aspectRatio = canvasWidth / canvasHeight;
      const cameraSize = 20; // Adjust this value as needed
      const camera = new THREE.OrthographicCamera(
          -cameraSize * aspectRatio, // Left
          cameraSize * aspectRatio,  // Right
          cameraSize,                // Top
          -cameraSize,               // Bottom
          0.1,                       // Near
          1000                       // Far
      );
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
  
      // Create the WebGL renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(canvasWidth, canvasHeight);
      container.appendChild(renderer.domElement);
  
      // Create a group to hold all lines and nodes
      const structureGroup = new THREE.Group();
  
      // Calculate the cumulative positions along the x and y axes
      const positionsX = distancesX.reduce((acc, value) => [...acc, acc[acc.length - 1] + value], [0]);
      const positionsY = distancesY.reduce((acc, value) => [...acc, acc[acc.length - 1] + value], [0]);
  
      // Draw horizontal and vertical lines based on the cumulative positions
      positionsY.forEach((y) => {
          const points = positionsX.map((x) => new THREE.Vector3(x, y, 0));
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 'black' });
          const line = new THREE.Line(geometry, material);
          structureGroup.add(line);
      });
  
      positionsX.forEach((x) => {
          const points = positionsY.map((y) => new THREE.Vector3(x, y, 0));
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 'black' });
          const line = new THREE.Line(geometry, material);
          structureGroup.add(line);
      });
  
      // Draw a small red dot at each node
      positionsX.forEach((x) => {
          positionsY.forEach((y) => {
              const dotGeometry = new THREE.SphereGeometry(0.2, 16, 16);
              const dotMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
              const dot = new THREE.Mesh(dotGeometry, dotMaterial);
              dot.position.set(x, y, 0);
              structureGroup.add(dot);
          });
      });
  
      // Center the entire structure group
      structureGroup.position.x = -positionsX[positionsX.length - 1] / 2;
      structureGroup.position.y = -positionsY[positionsY.length - 1] / 2;
  
      // Add the structure group to the scene
      scene.add(structureGroup);
  
      // Animation loop
      function animate(): void {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
      }
  
      // Start the animation
      animate();
  }