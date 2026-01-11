import * as THREE from "three";

/**
 * Create a text sprite for rendering text labels in the 3D scene.
 * Uses canvas-based rendering for efficiency.
 */
export function getText(
  text: string,
  position: [number, number, number],
  color: string = "#ffffff",
  size: number = 0.3
): THREE.Sprite {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;

  // Set canvas size for crisp text
  const fontSize = 48;
  canvas.width = 512;
  canvas.height = 128;

  // Clear canvas with transparent background
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Configure text rendering
  context.font = `bold ${fontSize}px Arial`;
  context.fillStyle = color;
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Draw text
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;

  // Create sprite material
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });

  // Create sprite
  const sprite = new THREE.Sprite(material);
  sprite.position.set(position[0], position[1], position[2]);

  // Adjust sprite scale based on size parameter
  const aspectRatio = canvas.width / canvas.height;
  sprite.scale.set(size * aspectRatio, size, 1);

  sprite.renderOrder = 100; // Render on top

  return sprite;
}
