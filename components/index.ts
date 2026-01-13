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

// supports
export type {
  Components as SupportComponents,
  Component as SupportComponent,
} from "./supports/data-model";
export { getSupports } from "./supports/getSupports";

// analysis
export { getPositions } from "./analysis/l-solver/getPositions";
