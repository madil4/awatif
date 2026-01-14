import { ComponentsType } from "./data-model";
import { lineMesh } from "./mesh/line-mesh/lineMesh";
import { pointLoad } from "./loads/point-load/pointLoad";
import { pointSupport } from "./supports/point-support/pointSupport";
import { enRcColumn } from "./design/en-rc-column/enRcColumn";

// Todo: use a map with ids to make it possible to remove templates without reindexing
export const templates = new Map<ComponentsType, any[]>([
  [ComponentsType.MESH, [lineMesh]],
  [ComponentsType.LOADS, [pointLoad]],
  [ComponentsType.SUPPORTS, [pointSupport]],
  [ComponentsType.DESIGN, [enRcColumn]],
]);
