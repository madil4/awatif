import van from "vanjs-core";
import {
  ComponentsType,
  type ActiveLoadSelection,
  type ComponentEntry,
  type Components,
  type Geometry,
  type Mesh,
} from "@awatif/components";
import type { Display, WorkPlane } from "@awatif/ui";
import type {
  AppConfig,
  DisplayOptions,
  Entry,
  Ided,
  Line,
  Model,
  Point,
  Polygon,
} from "./data-model";

// A list of values gets 1-based ids; a list of [id, value] pairs keeps them
export function toIdedMap<T>(input: Ided<T> | undefined): Map<number, T> {
  if (!input) return new Map();
  if (input instanceof Map) return new Map(input);

  const isPairs = input.every(
    (e) => Array.isArray(e) && e.length === 2 && Array.isArray(e[1]),
  );

  return isPairs
    ? new Map(input as [number, T][])
    : new Map((input as T[]).map((value, i) => [i + 1, value]));
}

export function createGeometry(model: Model): Geometry {
  return {
    points: van.state(toIdedMap<Point>(model.points)),
    lines: van.state(toIdedMap<Line>(model.lines)),
    polygons: van.state(toIdedMap<Polygon>(model.polygons)),
    selection: van.state(null),
    designs: van.state(new Map()),
  };
}

export function createMesh(): Mesh {
  return {
    nodes: van.state([]),
    elements: van.state([]),
    geometryMapping: van.state({
      pointToNodes: new Map(),
      lineToElements: new Map(),
      polygonToElements: new Map(),
    }),
    loads: van.state(new Map()),
    supports: van.state(new Map()),
    releases: van.state(new Map()),
    elementsProps: van.state(new Map()),
    positions: van.state([]),
    displacements: van.state([]),
    reactions: van.state([]),
    internalForces: van.state(new Map()),
  };
}

// Load cases are addressed by name in a template, by uuid in the data model
export type LoadCaseIds = Map<string, string>;

function resolveLoadCase(name: string | undefined, ids: LoadCaseIds): string | undefined {
  if (name === undefined) return undefined;

  const id = ids.get(name);
  if (!id)
    throw new Error(
      `Unknown load case "${name}". Declare it in \`loadCases\` first.`,
    );

  return id;
}

function toEntries(entries: Entry[] | undefined, ids: LoadCaseIds): ComponentEntry[] {
  return (entries ?? []).map((e) => ({
    ...e,
    ...(e.loadCase !== undefined
      ? { loadCase: resolveLoadCase(e.loadCase, ids) }
      : {}),
  }));
}

export function createComponents(model: Model): {
  components: Components;
  loadCaseIds: LoadCaseIds;
} {
  const loadCaseIds: LoadCaseIds = new Map(
    (model.loadCases ?? []).map((name) => [name, crypto.randomUUID()]),
  );

  const map = new Map<ComponentsType, ComponentEntry[]>();

  const set = (type: ComponentsType, entries: ComponentEntry[]) => {
    if (entries.length) map.set(type, entries);
  };

  set(
    ComponentsType.LOAD_CASES,
    [...loadCaseIds].map(([name, id]) => ({
      id,
      name,
      templateId: "load-case",
      geometry: [],
    })),
  );

  set(
    ComponentsType.LOAD_COMBINATIONS,
    (model.loadCombinations ?? []).map((combination) => ({
      id: crypto.randomUUID(),
      name: combination.name,
      templateId: "load-combination",
      geometry: [],
      params: {
        entries: Object.entries(combination.factors).map(([name, factor]) => ({
          loadCaseId: resolveLoadCase(name, loadCaseIds),
          factor,
        })),
      },
    })),
  );

  set(ComponentsType.GRID_LINES, toEntries(model.gridLines, loadCaseIds));
  set(ComponentsType.LOADS, toEntries(model.loads, loadCaseIds));
  set(ComponentsType.SUPPORTS, toEntries(model.supports, loadCaseIds));
  set(ComponentsType.RELEASES, toEntries(model.releases, loadCaseIds));
  set(ComponentsType.LOCAL_AXES, toEntries(model.localAxes, loadCaseIds));
  set(ComponentsType.IMPERFECTIONS, toEntries(model.imperfections, loadCaseIds));
  set(ComponentsType.MESH, toEntries(model.mesh, loadCaseIds));
  set(ComponentsType.DESIGN, toEntries(model.design, loadCaseIds));

  model.extraComponents?.forEach((entries, type) => {
    map.set(type, [...(map.get(type) ?? []), ...entries]);
  });

  return { components: van.state(map), loadCaseIds };
}

export function createDisplay(
  options: DisplayOptions = {},
  loadCaseIds: LoadCaseIds = new Map(),
): Display {
  const activeLoadCaseId = options.activeLoadCase
    ? resolveLoadCase(options.activeLoadCase, loadCaseIds)
    : [...loadCaseIds.values()][0];

  const activeLoadSelection: ActiveLoadSelection = activeLoadCaseId
    ? { kind: "case", id: activeLoadCaseId }
    : null;

  return {
    grid: {
      size: van.state(options.gridSize ?? 10),
      spacing: van.state(options.gridSpacing ?? 0.5),
      infinite: van.state(options.gridInfinite ?? true),
    },
    workPlane: {
      plane: van.state<WorkPlane>(options.workPlane ?? "XZ"),
      offset: van.state(options.workPlaneOffset ?? 0),
    },
    displayScale: van.state(options.displayScale ?? 1),
    deformationScale: van.state(options.deformationScale ?? 1),
    view2D: van.state(options.view2D ?? true),
    geometry: van.state(options.geometry ?? true),
    mesh: van.state(options.mesh ?? true),
    deformedShape: van.state(options.deformedShape ?? true),
    loads: van.state(options.loads ?? true),
    supports: van.state(options.supports ?? true),
    gridLines: van.state(options.gridLines ?? true),
    releases: van.state(options.releases ?? true),
    lineIndex: van.state(options.lineIndex ?? false),
    pointIndex: van.state(options.pointIndex ?? false),
    orientation: van.state(options.orientation ?? false),
    extrude: van.state(options.extrude ?? false),
    pointResult: van.state(options.pointResult ?? "None"),
    lineResult: van.state(options.lineResult ?? "None"),
    activeLoadSelection: van.state<ActiveLoadSelection>(activeLoadSelection),
  };
}

export function createStates(config: AppConfig) {
  const geometry = createGeometry(config);
  const { components, loadCaseIds } = createComponents(config);
  const display = createDisplay(config.display, loadCaseIds);
  const mesh = createMesh();

  return { geometry, components, display, mesh, loadCaseIds };
}
