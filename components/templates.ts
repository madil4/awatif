import { lineMesh } from "./mesh/line-mesh/lineMesh";
import { triangleMesh } from "./mesh/triangle-mesh/triangleMesh";
import { imperfections } from "./imperfections/imperfections";
import { pointLoad } from "./loads/point-load/pointLoad";
import { distributedLoad } from "./loads/distributed-load/distributedLoad";
import { loadCase } from "./load-cases/load-case/loadCase";
import { loadCombination } from "./load-combinations/load-combination/loadCombination";
import { pointSupport } from "./supports/point-support/pointSupport";
import { releases } from "./releases/releases/releases";
import { localAxes } from "./local-axes/local-axes/localAxes";
import { genericMember } from "./design/generic-member/genericMember";
import { genericShell } from "./design/generic-shell/genericShell";
import { concreteMember } from "./design/concrete-member/concreteMember";
import { steelMember } from "./design/steel-member/steelMember";
import { timberMember } from "./design/timber-member/timberMember";
import { gridSystem } from "./grid-lines/grid-system/gridSystem";
import { ComponentsType } from "./data-model";

// Todo: Analysis is actually a component and can be added to a geometry
export const templates = new Map<ComponentsType, Map<string, any>>([
  [
    ComponentsType.MESH,
    new Map<string, any>([
      ["line-mesh", lineMesh],
      ["triangle-mesh", triangleMesh],
    ]),
  ],
  [
    ComponentsType.LOADS,
    new Map<string, any>([
      ["point-load", pointLoad],
      ["distributed-load", distributedLoad],
    ]),
  ],
  [ComponentsType.LOAD_CASES, new Map<string, any>([["load-case", loadCase]])],
  [
    ComponentsType.LOAD_COMBINATIONS,
    new Map<string, any>([["load-combination", loadCombination]]),
  ],
  [ComponentsType.GRID_LINES, new Map([["grid-system", gridSystem]])],
  [ComponentsType.SUPPORTS, new Map([["point-support", pointSupport]])],
  [ComponentsType.RELEASES, new Map([["releases", releases]])],
  [ComponentsType.LOCAL_AXES, new Map([["local-axes", localAxes]])],
  [
    ComponentsType.DESIGN,
    new Map<string, any>([
      ["generic-member", genericMember],
      ["generic-shell", genericShell],
      ["concrete-member", concreteMember],
      ["steel-member", steelMember],
      ["timber-member", timberMember],
    ]),
  ],
  [
    ComponentsType.IMPERFECTIONS,
    new Map<string, any>([["imperfections", imperfections]]),
  ],
]);
