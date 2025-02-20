import { Text } from "awatif-ui/src/viewer/objects/Text";
import * as THREE from "three";


/**
 * Creates dynamic multi-line text objects and adds them to a scene.
 * @param {Array} designInputs - Design input values for coordinates.
 * @param {Array} designResults - Design results to display text like `etaMax`.
 * @param {number} noCols - Number of columns to generate text for.
 * @param {Array} objects3D - The array where text objects will be pushed.
 */
export function createText(designInputs, designResultsInterface, noCols, objects3D) {
  // Clear existing text objects
  const currentTexts = objects3D.rawVal.filter((obj) => obj instanceof Text);
  currentTexts.forEach((textObj) =>
    objects3D.rawVal.splice(objects3D.rawVal.indexOf(textObj), 1)
  );

  // Add new text objects dynamically
  for (let i = 0; i < noCols; i++) {
    const xCord = designInputs[i][8];
    const yCord = designInputs[i][9];
    const zCord = 2;
    const etaMax = (
      Math.max(
        designResultsInterface[i].maxEtaY,
        designResultsInterface[i].maxEtaZ
      ) * 100
    ).toFixed(0);

    // Multi-line text content
    const lines = [`Col${i + 1}`, `η: ${etaMax}%`];

    lines.forEach((line, index) => {
      const lineText = new Text(line);
      lineText.updateScale(0.7);
      lineText.position.set(xCord, yCord, zCord - index * 0.7);
      objects3D.rawVal.push(lineText);
    });
  }
}


/**
 * Creates and updates node points in the scene.
 * @param {Array} xyCoords - Array of node coordinates.
 * @returns {THREE.Points} The points object.
 */
export function createNodes(xyCoords) {

  const positions = xyCoords.flat();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 1, // Point size
    color: 0xff0000, // Red points
  });

  const points = new THREE.Points(geometry, material);
  return points;
}


/**
 * Creates a surface mesh with specified vertices and adds it to the scene.
 * @param {Array} slabInputs - Array of slab vertices.
 * @returns {THREE.Mesh} The surface mesh.
 */
export function createSurface(objects3D, slabInputs) {
    const currentSurfaces = objects3D.rawVal.filter(
        (obj) => obj instanceof THREE.Mesh
      );
      currentSurfaces.forEach((surface) => {
        surface.geometry.dispose(); // Dispose of geometry
        surface.material.dispose(); // Dispose of material
        objects3D.rawVal.splice(objects3D.rawVal.indexOf(surface), 1);
      });
    
      // Create and add the new surface
      const vertices = slabInputs.val.flat();
      const indices = [0, 1, 2, 0, 2, 3]; // Indices defining triangles
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.setIndex(indices);
    
      geometry.computeVertexNormals();
    
      const material = new THREE.MeshBasicMaterial({
        color: 0x132e39, // The color you want to use
        side: THREE.DoubleSide, // Make both sides of the object visible
      });
    
      const surface = new THREE.Mesh(geometry, material);
  return surface;
}

/**
 * Creates a vertical line (column) at a given position.
 * @param {number} x - The x-coordinate of the column's base.
 * @param {number} y - The y-coordinate of the column's base.
 * @param {number} height - The height of the column.
 * @param {number} color - The color of the column line (hex value, default is white).
 * @returns {THREE.Line} A vertical line object representing the column.
 */
export function createVerticalColumn(x, y, height) {
  // Define the start and end points for the vertical line
  const start = new THREE.Vector3(x, y, 0); // Base of the column
  const end = new THREE.Vector3(x, y, height); // Top of the column

  const color = 0xffffff

  // Create the geometry and set the vertices
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);

  // Create the material for the line
  const material = new THREE.LineBasicMaterial({ color });

  // Create the line (column) using the geometry and material
  const line = new THREE.Line(geometry, material);

  return line;
}

export function createColumnsFromCoords(xyCoords, lengths) {
    const color = 0xffffff; // Default column color (white)
    const columns = [];
  
    xyCoords.forEach(([x, y], index) => {
      const length = lengths[index]; // Get the corresponding length for each coordinate
  
      if (length !== undefined) {
        // Create a vertical column
        const start = new THREE.Vector3(x, y, 0); // Base of the column
        const end = new THREE.Vector3(x, y, length); // Top of the column
  
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const material = new THREE.LineBasicMaterial({ color });
  
        const column = new THREE.Line(geometry, material);
        columns.push(column); // Add to the columns array
      }
    });
  
    return columns; // Return all created columns
  }