export type { Geometry, Mesh } from "./data-model";
export { templates } from "./templates";

// mesh
export type { MeshComponents, Components, Component } from "./mesh/data-model";
export { getMesh } from "./mesh/getMesh";

// loads
export type {
  Components as LoadComponents,
  Component as LoadComponent,
} from "./loads/data-model";
export { getLoads } from "./loads/getLoads";
