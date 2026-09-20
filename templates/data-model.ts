import type {
  ComponentEntry,
  ComponentsType,
  ActiveLoadSelection,
  Plugin,
} from "@awatif/components";
import type { Display, WorkPlane } from "@awatif/ui";

// Ids are optional everywhere in a template: a plain list gets 1-based ids,
// a list of pairs or a Map keeps the ids the author wrote
export type Ided<T> = Map<number, T> | [number, T][] | T[];

export type Point = [number, number, number];
export type Line = [number, number];
export type Polygon = number[];

// Same shape as ComponentEntry, except `loadCase` is the load case *name*
// declared in `loadCases`, so no uuid juggling is needed in a template
export type Entry = Omit<ComponentEntry, "id" | "loadCase"> & {
  loadCase?: string;
};

export type LoadCombination = {
  name: string;
  // load case name -> factor
  factors: Record<string, number>;
};

// Everything that describes a structural model
export type Model = {
  points?: Ided<Point>;
  lines?: Ided<Line>;
  polygons?: Ided<Polygon>;

  loadCases?: string[];
  loadCombinations?: LoadCombination[];

  loads?: Entry[];
  supports?: Entry[];
  releases?: Entry[];
  localAxes?: Entry[];
  imperfections?: Entry[];
  mesh?: Entry[];
  design?: Entry[];

  // Escape hatch for component types without a dedicated field
  extraComponents?: Map<ComponentsType, ComponentEntry[]>;
};

// Plain (non-reactive) mirror of `Display`; every field is optional and falls
// back to the defaults in `createDisplay`
export type DisplayOptions = {
  gridSize?: number;
  gridSpacing?: number;
  workPlane?: WorkPlane;
  workPlaneOffset?: number;
  displayScale?: number;
  deformationScale?: number;
  view2D?: boolean;
  geometry?: boolean;
  mesh?: boolean;
  deformedShape?: boolean;
  loads?: boolean;
  supports?: boolean;
  releases?: boolean;
  lineIndex?: boolean;
  pointIndex?: boolean;
  orientation?: boolean;
  extrude?: boolean;
  pointResult?: Display["pointResult"]["val"];
  lineResult?: Display["lineResult"]["val"];
  // Name of the load case shown on start; defaults to the first load case
  activeLoadCase?: string;
};

export type AppConfig = Model & {
  display?: DisplayOptions;
  // Buttons in the canvas bar; "Report" is wired to the design report
  canvasButtons?: string[];
  analysis?: "linear" | "nonlinear";
  // Third-party component packages; their templates join the built-ins and
  // are referenced by `templateId` like any other
  plugins?: Plugin[];
  // Where to mount the layout; `null` mounts nothing and returns the element
  container?: HTMLElement | null;
};

export type { ActiveLoadSelection, Plugin };
