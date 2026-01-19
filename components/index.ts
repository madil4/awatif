export type { Geometry, Mesh, Components, ElementForces } from "./data-model";
export type { Design } from "./design/data-model";
export { ComponentsType } from "./data-model";

export { getMesh } from "./mesh/getMesh";
export { getLoads } from "./loads/getLoads";
export { getSupports } from "./supports/getSupports";
export { getElementsProps } from "./design/getElementsProps";
export { getReport } from "./design/getReport";
export { getDesignResults } from "./design/getDesignResults";
export { getPositions } from "./analysis/l-solver/getPositions";
export {
  getInternalForces,
  getDisplacements,
} from "./analysis/l-solver/getInternalForces";
