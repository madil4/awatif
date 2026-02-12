import { LineElementForces } from "./data-model";

export function getLineEndForces(lineElementForces?: LineElementForces) {
  const elementForces = lineElementForces?.elementForces || [];
  const firstForces = elementForces[0];
  const lastForces = elementForces[elementForces.length - 1];

  return {
    startN: firstForces?.N[0] ?? 0,
    endN: lastForces?.N[1] ?? 0,
    startMz: firstForces?.Mz[0] ?? 0,
    endMz: lastForces?.Mz[1] ?? 0,
    hasForces: elementForces.length > 0,
  };
}

export function getMaxAxialForce(lineElementForces?: LineElementForces) {
  const elementForces = lineElementForces?.elementForces || [];
  let maxN = 0;
  for (const forces of elementForces) {
    maxN = Math.max(maxN, Math.abs(forces.N[0]), Math.abs(forces.N[1]));
  }
  return maxN;
}

export function getMaxMoment(lineElementForces?: LineElementForces) {
  const elementForces = lineElementForces?.elementForces || [];
  let maxMz = 0;
  for (const forces of elementForces) {
    maxMz = Math.max(maxMz, Math.abs(forces.Mz[0]), Math.abs(forces.Mz[1]));
  }
  return maxMz;
}
