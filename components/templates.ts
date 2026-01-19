import { ComponentsType } from "./data-model";
import { lineMesh } from "./mesh/line-mesh/lineMesh";
import { pointLoad } from "./loads/point-load/pointLoad";
import { pointSupport } from "./supports/point-support/pointSupport";
import { basic } from "./design/basic/basic";

export const templates = new Map<ComponentsType, Map<string, any>>([
  [ComponentsType.MESH, new Map([["line-mesh", lineMesh]])],
  [ComponentsType.LOADS, new Map([["point-load", pointLoad]])],
  [ComponentsType.SUPPORTS, new Map([["point-support", pointSupport]])],
  [ComponentsType.DESIGN, new Map([["basic", basic]])],
]);
