import { lineMesh } from "./mesh/line-mesh/lineMesh";
import { imperfections } from "./imperfections/imperfections";
import { pointLoad } from "./loads/point-load/pointLoad";
import { distributedLoad } from "./loads/distributed-load/distributedLoad";
import { pointSupport } from "./supports/point-support/pointSupport";
import { releases } from "./releases/releases/releases";
import { genericMember } from "./design/generic-member/genericMember";
import { concreteMember } from "./design/concrete-member/concreteMember";
import { steelMember } from "./design/steel-member/steelMember";
import { timberMember } from "./design/timber-member/timberMember";
import { ComponentsType } from "./data-model";

// Todo: Analysis is actually a component and can be added to a geometry
export const templates = new Map<ComponentsType, Map<string, any>>([
  [ComponentsType.MESH, new Map<string, any>([["line-mesh", lineMesh]])],
  [
    ComponentsType.LOADS,
    new Map<string, any>([
      ["point-load", pointLoad],
      ["distributed-load", distributedLoad],
    ]),
  ],
  [ComponentsType.SUPPORTS, new Map([["point-support", pointSupport]])],
  [ComponentsType.RELEASES, new Map([["releases", releases]])],
  [
    ComponentsType.DESIGN,
    new Map<string, any>([
      ["generic-member", genericMember],
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
