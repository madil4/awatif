import { lineMesh } from "./mesh/line-mesh/lineMesh";
import { imperfections } from "./mesh/imperfections/imperfections";
import { pointLoad } from "./loads/point-load/pointLoad";
import { pointSupport } from "./supports/point-support/pointSupport";
import { basic } from "./design/basic/basic";
import { ComponentsType } from "./data-model";

export const templates = new Map<ComponentsType, Map<string, any>>([
  [
    ComponentsType.MESH,
    new Map<string, any>([
      ["line-mesh", lineMesh],
      ["imperfections", imperfections],
    ]),
  ],
  [ComponentsType.LOADS, new Map([["point-load", pointLoad]])],
  [ComponentsType.SUPPORTS, new Map([["point-support", pointSupport]])],
  [ComponentsType.DESIGN, new Map([["basic", basic]])],
]);
