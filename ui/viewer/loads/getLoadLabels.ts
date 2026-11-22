import * as THREE from "three";
import { getText } from "../text/getText";

// Numerical labels for load components.
//
// Labelling lives here rather than inside each template's `getObject3D`, so a
// third-party load template gets the same numbers, in the same style, without
// writing any of this: the values come from `getLoad`, which every load
// template already implements, and the placement from the load direction.
// A template that wants to word its own label implements `getLabel`.

const LABEL_COLOR = "#ffffff";
const LABEL_OPTIONS = { backgroundColor: "rgba(0, 0, 0, 0.6)" };
const TEXT_SIZE = 0.3;
const FORCE_DISTANCE = 0.85; // past the arrow head, in display-scale units
const MOMENT_DISTANCE = 1.05; // clear of the force labels
const LINE_DISTANCE = 0.45;

const ZERO = 1e-9;

const AXES: THREE.Vector3[] = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 0, 1),
];

type Load = [number, number, number, number, number, number];

// What to write and where, before it becomes a sprite: the placement is pure,
// so it can be reasoned about (and tested) without a canvas
export type LoadLabel = { text: string; position: [number, number, number] };

// 3.456 -> "3.46", 3 -> "3": enough precision to read, short enough to fit
function format(value: number): string {
  return `${Math.round(Math.abs(value) * 100) / 100}`;
}

function label(text: string, position: THREE.Vector3): LoadLabel {
  return { text, position: [position.x, position.y, position.z] };
}

function toSprite(label: LoadLabel, displayScale: number): THREE.Sprite {
  return getText(
    label.text,
    label.position,
    LABEL_COLOR,
    TEXT_SIZE * displayScale,
    LABEL_OPTIONS,
  );
}

// A template is free to throw on params it does not expect; a broken plugin
// should cost its own label, not the whole viewer frame
function getLoadOf(template: any, params: any) {
  try {
    const { load, coordinateSystem = "local" } = template.getLoad({ params });
    return { load: load as Load, coordinateSystem };
  } catch {
    return null;
  }
}

function getCustomLabel(template: any, params: any): string | null {
  try {
    return template.getLabel?.({ params }) ?? null;
  } catch {
    return null;
  }
}

export function getPointLoadLabels(args: {
  template: any;
  params: any;
  position: [number, number, number];
  displayScale: number;
}): THREE.Sprite[] {
  return getPointLoadLabelsData(args).map((label) =>
    toSprite(label, args.displayScale),
  );
}

export function getLineLoadLabels(args: {
  template: any;
  params: any;
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  displayScale: number;
}): THREE.Sprite[] {
  return getLineLoadLabelsData(args).map((label) =>
    toSprite(label, args.displayScale),
  );
}

export function getPointLoadLabelsData({
  template,
  params,
  position,
  displayScale,
}: {
  template: any;
  params: any;
  position: [number, number, number];
  displayScale: number;
}): LoadLabel[] {
  const anchor = new THREE.Vector3(...position);
  const resolved = getLoadOf(template, params);
  if (!resolved) return [];

  const { load } = resolved;
  const custom = getCustomLabel(template, params);

  if (custom) {
    // One box, in the direction the load pulls, so it sits by the arrows
    const direction = new THREE.Vector3(load[0], load[1], load[2]);
    const offset =
      direction.lengthSq() > ZERO
        ? direction.normalize().multiplyScalar(FORCE_DISTANCE * displayScale)
        : new THREE.Vector3(0, 0.5 * displayScale, 0);

    return [label(custom, anchor.clone().add(offset))];
  }

  // Point loads are already in global coordinates: one label per non-zero
  // component, along the axis it acts on, named as the results are
  const names = ["X", "Y", "Z"];
  const labels: LoadLabel[] = [];

  AXES.forEach((axis, i) => {
    const force = load[i];
    if (Math.abs(force) < ZERO) return;

    const offset = axis
      .clone()
      .multiplyScalar(Math.sign(force) * FORCE_DISTANCE * displayScale);
    labels.push(
      label(`F${names[i]}: ${format(force)} kN`, anchor.clone().add(offset)),
    );
  });

  AXES.forEach((axis, i) => {
    const moment = load[i + 3];
    if (Math.abs(moment) < ZERO) return;

    const offset = axis
      .clone()
      .multiplyScalar(Math.sign(moment) * MOMENT_DISTANCE * displayScale);
    labels.push(
      label(`M${names[i]}: ${format(moment)} kNm`, anchor.clone().add(offset)),
    );
  });

  return labels;
}

export function getLineLoadLabelsData({
  template,
  params,
  startPosition,
  endPosition,
  displayScale,
}: {
  template: any;
  params: any;
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  displayScale: number;
}): LoadLabel[] {
  const resolved = getLoadOf(template, params);
  if (!resolved) return [];

  const { load, coordinateSystem } = resolved;
  const start = new THREE.Vector3(...startPosition);
  const end = new THREE.Vector3(...endPosition);
  const axes = getLineAxes(start, end, coordinateSystem);
  if (!axes) return [];

  // Where the load points in global coordinates, so the label sits on the
  // loaded side of the member whichever system the template used
  const direction = new THREE.Vector3();
  axes.forEach((axis, i) => direction.addScaledVector(axis, load[i]));

  const offset =
    direction.lengthSq() > ZERO
      ? direction.normalize().multiplyScalar(LINE_DISTANCE * displayScale)
      : new THREE.Vector3(0, LINE_DISTANCE * displayScale, 0);
  const position = start.clone().lerp(end, 0.5).add(offset);

  const custom = getCustomLabel(template, params);
  const text = custom ?? getLineLoadText(load, coordinateSystem);
  if (!text) return [];

  return [label(text, position)];
}

// "20 kN/m (Global Z)" — magnitude plus the axis it acts on, one line per
// non-zero component
function getLineLoadText(
  load: Load,
  coordinateSystem: "local" | "global",
): string | null {
  const system = coordinateSystem === "global" ? "Global" : "Local";
  const names = ["X", "Y", "Z"];
  const lines: string[] = [];

  names.forEach((name, i) => {
    if (Math.abs(load[i]) > ZERO)
      lines.push(`${format(load[i])} kN/m (${system} ${name})`);
  });
  names.forEach((name, i) => {
    if (Math.abs(load[i + 3]) > ZERO)
      lines.push(`${format(load[i + 3])} kNm/m (${system} ${name})`);
  });

  return lines.length ? lines.join("\n") : null;
}

// The three axes a line load's components are measured against. Mirrors the
// convention `getLoads` solves with, so the label lands where the load acts:
// local y is the legacy 2D perpendicular, local z is global Z projected onto
// the member's normal plane.
function getLineAxes(
  start: THREE.Vector3,
  end: THREE.Vector3,
  coordinateSystem: "local" | "global",
): THREE.Vector3[] | null {
  if (coordinateSystem === "global") return AXES.map((axis) => axis.clone());

  const localX = end.clone().sub(start);
  const length = localX.length();
  if (length < ZERO) return null;
  localX.normalize();

  const localY = new THREE.Vector3(localX.y, -localX.x, 0);
  if (localY.lengthSq() < ZERO) localY.set(0, 1, 0);
  else localY.normalize();

  const reference =
    Math.abs(localX.z) < 0.99
      ? new THREE.Vector3(0, 0, 1)
      : new THREE.Vector3(1, 0, 0);
  const localZ = reference
    .sub(localX.clone().multiplyScalar(reference.dot(localX)))
    .normalize();

  return [localX, localY, localZ];
}
