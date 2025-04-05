import { TemplateResult } from "lit-html";
import { State } from "vanjs-core";

export type Building = {
  points: State<[number, number, number][]>; // all the points used to define stories, floors, ..etc
  stories: State<number[]>; // example [1,2,3] three stories defined by three points indices from the points list
  columns: State<number[]>; // example [1,2,3] three columns defined by three points indices from the points list
  slabs: State<number[][]>; // example [[1,2,3],[4,5,6,7]] two slabs defined by points indices from the points list
  columnsByStory: State<Map<number, number[]>>; // Grouping of columns by stories,
  // example (1) -> [2,3,4], 1 is the story index from stories list, [2,3,4] indices from columns list
  slabsByStory: State<Map<number, number[]>>; // Grouping of slabs by stories,
  // example (1) -> [2,3,4], 1 is the story index from stories list, [2,3,4] indices from slabs list
  columnData: State<Map<number, ColumnData>>; // any additional data attached to columns,
  // example (1) -> {analysisInput,designOutput,..}, 1 is column index from columns list
  slabData: State<Map<number, unknown>>; // any additional data attached to slabs,
  // example (1) -> {analysisInput,designOutput,..}, 1 is slab index from slabs list
};

// Todo: think of way to separate the generic type ColumnAnalysisInput from the remaining specific onces
// Todo: maybe better to separate functions from data
type ColumnData = {
  analysisInput?: ColumnAnalysisInput;
  analysisOutput?: ColumnAnalysisOutput;
  designInput?: ColumnDesignInput;
  designOutput?: ColumnDesignOutput;
  script?: (
    analysisInput: ColumnAnalysisInput,
    designInput: ColumnDesignInput
  ) => ColumnDesignOutput;
  report?: (
    analysisInput: ColumnAnalysisInput,
    designInput: ColumnDesignInput,
    analysisOutput: ColumnAnalysisOutput,
    designOutput: ColumnDesignOutput
  ) => TemplateResult;
  visualObject?: (inputs: unknown) => unknown;
};

type ColumnDesignInput = EcTimberColumnDesignInput;
type ColumnDesignOutput = EcTimberColumnDesignOutput;

type ColumnAnalysisInput = {
  load: unknown;
  support: unknown;
  section: unknown;
  material: unknown;
};
type ColumnAnalysisOutput = {
  bending: unknown;
  axial: unknown;
};

type EcTimberColumnDesignInput = {
  buildingClass: string;
  strength: number;
};

type EcTimberColumnDesignOutput = {
  slendernessRatio: number;
  utilizationFactor: number;
};
