import {
  Assignment,
  DistributedLoadAssignment,
  LoadAssignment,
  ProcessedAssignments,
  PropertyAssignment,
  SupportAssignment,
} from "../types";

export function processAssignments(
  assignments: Assignment[]
): ProcessedAssignments {
  const pa: ProcessedAssignments = {
    elasticities: new Map<number, PropertyAssignment["elasticity"]>(),
    areas: new Map<number, PropertyAssignment["area"]>(),
    loads: new Map<number, LoadAssignment["load"]>(),
    supports: new Map<number, SupportAssignment["support"]>(),
    momentOfInertiaZs: new Map<
      number,
      PropertyAssignment["momentOfInertiaZ"]
    >(),
    momentOfInertiaYs: new Map<
      number,
      PropertyAssignment["momentOfInertiaY"]
    >(),
    shearModuluses: new Map<number, PropertyAssignment["shearModulus"]>(),
    torsionalConstants: new Map<
      number,
      PropertyAssignment["torsionalConstant"]
    >(),
    distributedLoads: new Map<
      number,
      DistributedLoadAssignment["distributedLoad"]
    >(),
  };

  assignments.forEach((assignment) => {
    if ("area" in assignment) pa.areas.set(assignment.element, assignment.area);
    if ("elasticity" in assignment)
      pa.elasticities.set(assignment.element, assignment.elasticity);
    if ("load" in assignment) pa.loads.set(assignment.node, assignment.load);
    if ("support" in assignment)
      pa.supports.set(assignment.node, assignment.support);
    if ("momentOfInertiaZ" in assignment)
      pa.momentOfInertiaZs.set(assignment.element, assignment.momentOfInertiaZ);
    if ("momentOfInertiaY" in assignment)
      pa.momentOfInertiaYs.set(assignment.element, assignment.momentOfInertiaY);
    if ("torsionalConstant" in assignment)
      pa.torsionalConstants.set(
        assignment.element,
        assignment.torsionalConstant
      );
    if ("shearModulus" in assignment)
      pa.shearModuluses.set(assignment.element, assignment.shearModulus);
    if ("distributedLoad" in assignment)
      pa.distributedLoads.set(assignment.element, assignment.distributedLoad);
  });

  return pa;
}
