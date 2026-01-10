import { lineMesh } from "./mesh/line-mesh/lineMesh";
import { pointLoad } from "./loads/point-load/pointLoad";

// Todo: use a map with ids to make it possible to remove templates without reindexing
export const templates = new Map([
  ["MESH", [lineMesh]],
  ["LOADS", [pointLoad]],
]);
