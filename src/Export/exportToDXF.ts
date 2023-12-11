import { DxfWriter, Units, point3d } from "@tarikjabiri/dxf";
import { ExportOptions } from "./export.types";

export function exportToDXF(
  nodes: [number, number, number][],
  elements: [number, number][],
  assignments: any[],
  analysisResults: any,
  exportOptions: ExportOptions
) {
  const dxf = new DxfWriter();
  dxf.setUnits(Units.Meters);

  elements.forEach(([e1, e2]) =>
    dxf.addLine(point3d(...nodes[e1]), point3d(...nodes[e2]))
  );

  return dxf.stringify();
}
