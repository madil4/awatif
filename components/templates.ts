import { lineMesh } from "./mesh/line-mesh/lineMesh";
import { imperfections } from "./imperfections/imperfections";
import { pointLoad } from "./loads/point-load/pointLoad";
import { pointSupport } from "./supports/point-support/pointSupport";
import { basic } from "./design/basic/basic";
import { ComponentsType } from "./data-model";

// Todo: Analysis is actually a component and can be added to a geometry
export const templates = new Map<ComponentsType, Map<string, any>>([
  [
    ComponentsType.MESH,
    new Map<string, any>([["line-mesh", lineMesh]]),
  ],
  [ComponentsType.LOADS, new Map([["point-load", pointLoad]])],
  [ComponentsType.SUPPORTS, new Map([["point-support", pointSupport]])],
  [ComponentsType.DESIGN, new Map([["basic", basic]])],
  [
    ComponentsType.IMPERFECTIONS,
    new Map<string, any>([["imperfections", imperfections]]),
  ],
]);
