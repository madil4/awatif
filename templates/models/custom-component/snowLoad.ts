import * as THREE from "three";
import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { LoadTemplate } from "@awatif/components";

// A snow load to EN 1991-1-3: the characteristic ground load `sk` becomes a
// roof load through the shape, exposure and thermal coefficients, and a line
// load through the frame spacing.
//
// This is the kind of component that does not belong in the core library —
// it is code-, country- and practice-specific — but every roof job needs it.
type SnowLoadParams = {
  sk: number; // characteristic ground snow load (kN/m2)
  pitch: number; // roof pitch (degrees)
  spacing: number; // frame spacing, i.e. the tributary width (m)
  Ce: number; // exposure coefficient
  Ct: number; // thermal coefficient
};

// Shape coefficient for a monopitch or duopitch roof, undrifted:
// 0.8 up to 30 degrees, falling linearly to 0 at 60 degrees
function getShapeCoefficient(pitch: number): number {
  if (pitch <= 30) return 0.8;
  if (pitch >= 60) return 0;

  return 0.8 * ((60 - pitch) / 30);
}

// Load on the roof (kN/m2), and the line load on one frame (kN/m).
//
// Snow is defined on the horizontal projection, while the line load runs
// along the slope, so the plan load is spread over the longer rafter: the
// cosine keeps the total on a pitched roof equal to the total on its plan.
function getSnow(params: SnowLoadParams): { s: number; w: number } {
  const s = getShapeCoefficient(params.pitch) * params.Ce * params.Ct * params.sk;
  const w = s * params.spacing * Math.cos((params.pitch * Math.PI) / 180);

  return { s, w };
}

export const snowLoad: LoadTemplate<SnowLoadParams> = {
  name: "Snow Load (EN 1991-1-3)",
  geometryKind: "line",
  defaultParams: {
    sk: 0.6,
    pitch: 0,
    spacing: 5,
    Ce: 1,
    Ct: 1,
  },

  getParamsTemplate: ({ params }) => {
    const { s, w } = getSnow(params.val);

    const number = (
      label: string,
      key: keyof SnowLoadParams,
      step: number,
    ) => html`
      <div>
        <label>${label}</label>
        <input
          type="number"
          step=${step}
          .value=${live(params.val[key])}
          @input=${(e: Event) => {
            const value = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(value)) return;
            params.val = { ...params.val, [key]: value };
          }}
        />
      </div>
    `;

    return html`
      ${number("Ground snow sk (kN/m²):", "sk", 0.1)}
      ${number("Roof pitch (°):", "pitch", 1)}
      ${number("Frame spacing (m):", "spacing", 0.5)}
      ${number("Exposure Ce:", "Ce", 0.1)}
      ${number("Thermal Ct:", "Ct", 0.1)}
      <div>
        <label>Roof load s:</label>
        <span>${s.toFixed(2)} kN/m²</span>
      </div>
      <div>
        <label>Line load:</label>
        <span>${w.toFixed(2)} kN/m</span>
      </div>
    `;
  },

  // Snow acts downwards; the solver is handed a global-Z line load, so
  // gravity direction needs no local axes reasoning
  getLoad: ({ params }) => ({
    load: [0, 0, -getSnow(params).w, 0, 0, 0],
    coordinateSystem: "global",
  }),

  // The viewer labels the load from `getLoad` on its own; snow is worth
  // spelling out, since the line load the solver sees is two coefficients
  // and a spacing away from the ground load the user typed
  getLabel: ({ params }) => {
    const { s, w } = getSnow(params);
    if (w === 0) return null;

    return [`s = ${s.toFixed(2)} kN/m²`, `${w.toFixed(2)} kN/m`].join("\n");
  },

  getLineObject3D: ({ params, startPosition, endPosition, displayScale }) => {
    const group = new THREE.Group();
    const { w } = getSnow(params);
    if (w === 0) return group;

    const start = new THREE.Vector3(...startPosition);
    const end = new THREE.Vector3(...endPosition);
    const length = start.distanceTo(end);
    if (length === 0) return group;

    const COLOR = 0x66ddff;
    const ARROW_LENGTH = 0.25 * displayScale;
    const direction = new THREE.Vector3(0, 0, -1);
    const offset = direction.clone().multiplyScalar(-ARROW_LENGTH);

    const count = Math.min(8, Math.max(2, Math.round(length / displayScale)));
    for (let i = 0; i <= count; i++) {
      const origin = start
        .clone()
        .lerp(end, i / count)
        .add(offset);

      const arrow = new THREE.ArrowHelper(
        direction,
        origin,
        ARROW_LENGTH,
        COLOR,
        0.12 * displayScale,
        0.08 * displayScale,
      );
      arrow.traverse((child) => {
        const material = (child as THREE.Mesh).material as THREE.Material;
        if (material) material.depthTest = false;
      });
      group.add(arrow);
    }

    // Cap line joining the arrow tails
    const cap = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        start.clone().add(offset),
        end.clone().add(offset),
      ]),
      new THREE.LineBasicMaterial({ color: COLOR, depthTest: false }),
    );
    group.add(cap);

    group.renderOrder = 5;
    return group;
  },
};
