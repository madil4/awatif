import { DxfWriter, Units, point3d } from "@tarikjabiri/dxf";
import { ExportOptions } from "./Export";
import { Model } from "../App/App.types";

export function exportToDXF(model: Model, exportOptions: ExportOptions) {
  const dxf = new DxfWriter();
  dxf.setUnits(Units.Meters);

  model.elements.forEach(([e1, e2]) =>
    dxf.addLine(point3d(...model.nodes[e1]), point3d(...model.nodes[e2]))
  );

  return dxf.stringify();
}
