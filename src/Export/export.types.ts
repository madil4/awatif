export enum FileType {
  JSON = "JSON",
}
export type exportProps = {
  nodes: any;
  elements: any;
  assignments: any[];
  analysisResults: any;
};
export enum ExportOptionsEnum {
  Nodes = "Nodes",
  Elements = "Elements",
  Supports = "Supports",
  Loads = "Loads",
  Properties = "Properties",
  AnalysisResults = "Analysis Results",
}

export type ExportOptions = {
  nodes: boolean;
  elements: boolean;
  supports: boolean;
  loads: boolean;
  properties: boolean;
  analysisResults: boolean;
};
