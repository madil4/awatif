import * as THREE from 'three';

function createRectangularColumn(width, height, length, materialColor = 0x808080) {
    // Create a box geometry based on the input dimensions
    const geometry = new THREE.BoxGeometry(width, height, length);

    // Create a material with the specified color
    const material = new THREE.MeshStandardMaterial({ color: materialColor });

    // Create the mesh by combining the geometry and material
    const column = new THREE.Mesh(geometry, material);

    // Add shadows for better visualization (optional, depends on your scene setup)
    column.castShadow = true;
    column.receiveShadow = true;

    return column;
}