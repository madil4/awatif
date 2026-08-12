import { LocalAxesAngle } from "./data-model";
import { ElementProps, Mesh } from "../data-model";

// A 90° roll of the section about the member axis is exactly equivalent to
// swapping the two bending inertias in the fixed local frame: the rotated
// section's inertia about the fixed local y axis is the original Iz, and about
// the fixed local z axis is the original Iy. Modelling it this way keeps the
// solver's coordinate-derived transformation matrix untouched.
export function applyLocalAxesToProps(
  elementsProps: Map<number, ElementProps>,
  localAxes: Map<number, LocalAxesAngle>,
): Map<number, ElementProps> {
  if (localAxes.size === 0) return elementsProps;

  const rotated = new Map(elementsProps);

  localAxes.forEach((angle, elementIdx) => {
    if (angle !== 90) return;

    const props = elementsProps.get(elementIdx);
    if (!props) return;

    // A new object: getElementsProps assigns the same reference to every
    // element of a line, so mutating in place would corrupt siblings
    rotated.set(elementIdx, {
      ...props,
      momentInertiaZ: props.momentInertiaY,
      momentInertiaY: props.momentInertiaZ,
    });
  });

  return rotated;
}

// The solver reports forces in the fixed local frame. Re-express them in the
// section's own frame (y' = z, z' = -y for a +90° roll about local x) so that
// "My" keeps meaning "moment about the section's y axis as drawn".
export function applyLocalAxesToForces(
  internalForces: Mesh["internalForces"]["val"],
  localAxes: Map<number, LocalAxesAngle>,
): Mesh["internalForces"]["val"] {
  if (localAxes.size === 0) return internalForces;

  const rotated = new Map(internalForces);

  localAxes.forEach((angle, elementIdx) => {
    if (angle !== 90) return;

    const forces = internalForces.get(elementIdx);
    if (!forces) return;

    rotated.set(elementIdx, {
      N: forces.N,
      Mx: forces.Mx,
      Vy: forces.Vz,
      Vz: negate(forces.Vy),
      My: forces.Mz,
      Mz: negate(forces.My),
    });
  });

  return rotated;
}

function negate([start, end]: [number, number]): [number, number] {
  return [-start, -end];
}
