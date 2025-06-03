import * as THREE from "three";
import { Text } from "awatif-ui/src/viewer/objects/Text";

// Create surface
export function createSurface(points, color) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0].x, points[0].y);

  // Create the 2D path
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i].x, points[i].y);
  }

  // Close the shape
  shape.closePath();

  // Create geometry and material
  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    side: THREE.DoubleSide,
    roughness: 0.1,
    metalness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);

  // Enable shadow casting and receiving
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

export function createNodes(x, y, z, color) {
  // Flatten the array of coordinates and create an array of positions for BufferGeometry
  const positions = [x, y, z]; // Include z in the position array
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  ); // 3D coordinates

  // Create material for the points
  const material = new THREE.PointsMaterial({
    size: 0.5, // Point size
    color: color, // Red color for the points
  });

  // Create the points (which are 3D now)
  const points = new THREE.Points(geometry, material);
  return points;
}

export function createColumn(x, y, z, height, color = 0xffffff) {
  // Define the start and end points for the vertical line
  const start = new THREE.Vector3(x, y, z); // Base of the column
  const end = new THREE.Vector3(x, y, z + height); // Top of the column

  // Create the geometry and set the vertices
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);

  // Create the material for the line with a default color
  const material = new THREE.LineBasicMaterial({ color });

  // Create the line (column) using the geometry and material
  const line = new THREE.Line(geometry, material);

  return line;
}

export function createText(x, y, z, height, text, color) {

  const texts = [];
  text.forEach((line, index) => {
    const lineText = new Text(line );
    lineText.updateScale(0.3);
    lineText.material.color.set(0xffffff);
    lineText.position.set(x, y, z + height * 0.7 - index * 0.4);
    texts.push(lineText);
  });

  texts[texts.length - 1].material.color.set(color);

  return texts;
}
