varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vBarycentric;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normalize(normalMatrix * normal);
  
  // Generate barycentric coordinates
  vBarycentric = vec3(1.0, 0.0, 0.0); // Default for first vertex
  #ifdef USE_BARYCENTRIC
      if (gl_VertexID % 3 == 1) vBarycentric = vec3(0.0, 1.0, 0.0);
      if (gl_VertexID % 3 == 2) vBarycentric = vec3(0.0, 0.0, 1.0);
  #endif

  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}