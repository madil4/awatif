export enum FileType {
  JSON = "JSON",
  DXF = "DXF",
}

export type ExportProps = {
  nodes: any;
  elements: any;
  assignments: any[];
  analysisResults: any;
};

export type ExportOptions = {
  nodes: boolean;
  elements: boolean;
  supports: boolean;
  loads: boolean;
  properties: boolean;
  analysisResults: boolean;
};
