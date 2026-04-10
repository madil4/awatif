// Duplicated from awatif/ui/viewer/text/getText.ts to keep @awatif/components self-contained.
// If you update one, update the other.
import * as THREE from "three";

// Texture cache for repeated text values
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Create a text sprite for rendering text labels in the 3D scene.
 * Uses canvas-based rendering with caching for efficiency.
 */
export function getText(
  text: string,
  position: [number, number, number],
  color: string = "#ffffff",
  size: number = 0.3,
  options: {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
  } = {}
): THREE.Sprite {
  const { backgroundColor, borderRadius = 20, padding = 20 } = options;

  // Create cache key from text, color and options
  const cacheKey = `${text}|${color}|${backgroundColor}|${borderRadius}|${padding}`;

  let texture = textureCache.get(cacheKey);

  if (!texture) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    const fontSize = 48;
    context.font = `bold ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;

    // Measure text to size canvas appropriately
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize;

    // Set canvas size based on text and padding
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundColor) {
      context.fillStyle = backgroundColor;
      context.strokeStyle = "rgba(255, 255, 255, 0.1)";
      context.lineWidth = 2;

      const x = 2;
      const y = 2;
      const w = canvas.width - 4;
      const h = canvas.height - 4;
      const r = borderRadius;

      context.beginPath();
      context.moveTo(x + r, y);
      context.lineTo(x + w - r, y);
      context.quadraticCurveTo(x + w, y, x + w, y + r);
      context.lineTo(x + w, y + h - r);
      context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      context.lineTo(x + r, y + h);
      context.quadraticCurveTo(x, y + h, x, y + h - r);
      context.lineTo(x, y + r);
      context.quadraticCurveTo(x, y, x + r, y);
      context.closePath();

      context.fill();
      context.stroke();
    }

    // Configure text rendering
    context.font = `bold ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Draw text
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create and cache texture
    texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;

    textureCache.set(cacheKey, texture);
  }

  // Create sprite material
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });

  // Create sprite
  const sprite = new THREE.Sprite(material);
  sprite.position.set(position[0], position[1], position[2]);

  // Adjust sprite scale based on text aspect ratio
  const aspectRatio = texture.image.width / texture.image.height;
  sprite.scale.set(size * aspectRatio, size, 1);

  sprite.renderOrder = 100;

  return sprite;
}

/**
 * Clear the texture cache. Call this when cleaning up the scene.
 */
export function clearTextCache(): void {
  textureCache.forEach((texture) => texture.dispose());
  textureCache.clear();
}
