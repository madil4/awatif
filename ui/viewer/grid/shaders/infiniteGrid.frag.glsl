// Lines are computed per fragment from world coordinates, so they stay put
// while the camera moves and stay one pixel wide at any zoom. fwidth() gives the
// on-screen size of a cell, which drives the level-of-detail fade
uniform float uSpacing;
uniform vec3 uAxisA;
uniform vec3 uAxisB;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uNormal;
uniform float uOffset;

varying vec3 vWorld;

// 1 on a grid line of the given cell size, 0 elsewhere, ~1px wide
float gridLine(vec2 p, float cell) {
  vec2 coord = p / cell;
  vec2 width = fwidth(coord);
  vec2 d = abs(fract(coord - 0.5) - 0.5) / max(width, 1e-6);
  float line = 1.0 - min(min(d.x, d.y), 1.0);
  // Cells under ~3px would only be moire; fade them out as they shrink
  float lod = 1.0 - smoothstep(0.1, 0.3, max(width.x, width.y));
  return line * lod;
}

float axisLine(float v) {
  float width = fwidth(v);
  return 1.0 - min(abs(v) / max(width, 1e-6) - 0.5, 1.0);
}

void main() {
  vec2 p = vec2(dot(vWorld, uAxisA), dot(vWorld, uAxisB));

  float minor = gridLine(p, uSpacing) * 0.35;
  float major = gridLine(p, uSpacing * 10.0) * 0.6;
  float lines = max(minor, major);

  // The axis through the origin along A is the line where B is 0, so it takes
  // A's colour, matching how the origin axes are drawn
  float onA = clamp(axisLine(p.y), 0.0, 1.0);
  float onB = clamp(axisLine(p.x), 0.0, 1.0);

  vec3 color = vec3(0.55);
  float alpha = lines;
  color = mix(color, uColorA, onA);
  color = mix(color, uColorB, onB);
  alpha = max(alpha, max(onA, onB) * 0.9);

  // Dissolve towards the horizon. The reach scales with the camera's height
  // above the plane so the grid fills the view at any zoom, capped inside the
  // camera's far plane
  float height = abs(dot(cameraPosition, uNormal) - uOffset);
  float reach = min(max(height, 5.0) * 20.0, 900.0);
  float dist = distance(vWorld, cameraPosition);
  alpha *= 1.0 - smoothstep(reach * 0.3, reach, dist);

  if (alpha < 0.01) discard;

  gl_FragColor = vec4(color, alpha);
}
