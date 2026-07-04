import {
  templates as Templates,
  type Components,
  type Geometry,
} from "@awatif/components";

import { DRAWING_FOOTER_TEXT } from "./constants";
import {
  getDrawingPrimitives,
  getPrimitivePoints,
  type DrawingPoint,
} from "./getDrawingPrimitives";

const LAYER_NAME = "AwatifLines";
const LABEL_STYLE_NAME = "AwatifLabels";

export function exportDrawingDxf({
  geometry,
  components,
  templates,
}: {
  geometry: Geometry;
  components?: Components;
  templates?: typeof Templates;
}) {
  const dxf = getDrawingDxf({
    points: geometry.points.val,
    lines: geometry.lines.val,
    components: components?.val,
    templates,
  });
  const blob = new Blob([dxf], {
    type: "application/dxf;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "awatif-drawing.dxf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function getDrawingDxf({
  points,
  lines,
  components,
  templates,
}: {
  points: Map<number, [number, number, number]>;
  lines: Map<number, [number, number]>;
  components?: Components["val"];
  templates?: typeof Templates;
}): string {
  const primitives = getDrawingPrimitives({
    points,
    lines,
    components,
    templates,
  });
  const labelStyleHeight = getLabelStyleHeight(primitives);
  const groups: string[] = [
    0,
    "SECTION",
    2,
    "HEADER",
    9,
    "$ACADVER",
    1,
    "AC1009",
    9,
    "$INSUNITS",
    70,
    6,
    9,
    "$MEASUREMENT",
    70,
    1,
    0,
    "ENDSEC",
    0,
    "SECTION",
    2,
    "TABLES",
    0,
    "TABLE",
    2,
    "LTYPE",
    70,
    1,
    0,
    "LTYPE",
    2,
    "CONTINUOUS",
    70,
    0,
    3,
    "Solid line",
    72,
    65,
    73,
    0,
    40,
    0,
    0,
    "ENDTAB",
    0,
    "TABLE",
    2,
    "LAYER",
    70,
    1,
    0,
    "LAYER",
    2,
    LAYER_NAME,
    70,
    0,
    62,
    7,
    6,
    "CONTINUOUS",
    0,
    "ENDTAB",
    0,
    "TABLE",
    2,
    "STYLE",
    70,
    2,
    0,
    "STYLE",
    2,
    "STANDARD",
    70,
    0,
    40,
    0,
    41,
    1,
    50,
    0,
    71,
    0,
    42,
    2.5,
    3,
    "txt",
    4,
    "",
    0,
    "STYLE",
    2,
    LABEL_STYLE_NAME,
    70,
    0,
    40,
    formatDxfNumber(labelStyleHeight),
    41,
    1,
    50,
    0,
    71,
    0,
    42,
    formatDxfNumber(labelStyleHeight),
    3,
    "txt",
    4,
    "",
    0,
    "ENDTAB",
    0,
    "ENDSEC",
    0,
    "SECTION",
    2,
    "BLOCKS",
    0,
    "ENDSEC",
    0,
    "SECTION",
    2,
    "ENTITIES",
  ].map(String);

  primitives.forEach((primitive) => {
    if (primitive.type === "line") {
      pushDxfLine(groups, primitive.start, primitive.end);
      return;
    }

    if (primitive.type === "section") {
      primitive.segments.forEach((segment) => {
        pushDxfLine(groups, segment.start, segment.end);
      });
      return;
    }

    if (primitive.type === "dimension") {
      pushDxfLine(groups, primitive.start, primitive.dimensionStart);
      pushDxfLine(groups, primitive.end, primitive.dimensionEnd);
      pushDxfLine(groups, primitive.dimensionStart, primitive.dimensionEnd);
      primitive.ticks.forEach((tick) => {
        pushDxfLine(groups, tick.start, tick.end);
      });
      pushDxfText({
        groups,
        text: primitive.text,
        point: primitive.center,
        height: primitive.textHeight,
        rotation: -primitive.angle,
        styleName: LABEL_STYLE_NAME,
      });
      return;
    }

    pushDxfLine(groups, primitive.target, primitive.center);
    pushDxfText({
      groups,
      text: primitive.text,
      point: primitive.center,
      height: primitive.textHeight,
      rotation: -primitive.angle,
      styleName: LABEL_STYLE_NAME,
    });
  });

  const footerPlacement = getFooterPlacement(getFooterDrawingPoints(primitives));

  groups.push(
    ...[
      0,
      "TEXT",
      8,
      LAYER_NAME,
      10,
      formatDxfNumber(footerPlacement.x),
      20,
      formatDxfNumber(footerPlacement.z),
      30,
      formatDxfNumber(0),
      40,
      formatDxfNumber(footerPlacement.height),
      1,
      DRAWING_FOOTER_TEXT,
      7,
      "STANDARD",
      11,
      formatDxfNumber(footerPlacement.x),
      21,
      formatDxfNumber(footerPlacement.z),
      31,
      formatDxfNumber(0),
      72,
      1,
      73,
      0,
    ].map(String),
  );

  groups.push("0", "ENDSEC", "0", "EOF");

  return `${groups.join("\r\n")}\r\n`;
}

function pushDxfLine(
  groups: string[],
  start: DrawingPoint,
  end: DrawingPoint,
) {
  groups.push(
    ...[
      0,
      "LINE",
      8,
      LAYER_NAME,
      10,
      formatDxfNumber(start[0]),
      20,
      formatDxfNumber(-start[1]),
      30,
      formatDxfNumber(0),
      11,
      formatDxfNumber(end[0]),
      21,
      formatDxfNumber(-end[1]),
      31,
      formatDxfNumber(0),
    ].map(String),
  );
}

function pushDxfText({
  groups,
  text,
  point,
  height,
  rotation = 0,
  styleName = "STANDARD",
}: {
  groups: string[];
  text: string;
  point: DrawingPoint;
  height: number;
  rotation?: number;
  styleName?: string;
}) {
  groups.push(
    ...[
      0,
      "TEXT",
      8,
      LAYER_NAME,
      10,
      formatDxfNumber(point[0]),
      20,
      formatDxfNumber(-point[1]),
      30,
      formatDxfNumber(0),
      40,
      formatDxfNumber(height),
      1,
      formatDxfText(text),
      7,
      styleName,
      50,
      formatDxfNumber(rotation),
      11,
      formatDxfNumber(point[0]),
      21,
      formatDxfNumber(-point[1]),
      31,
      formatDxfNumber(0),
      72,
      1,
      73,
      2,
    ].map(String),
  );
}

function getLabelStyleHeight(
  primitives: ReturnType<typeof getDrawingPrimitives>,
): number {
  const label = primitives.find(
    (primitive) =>
      primitive.type === "label" || primitive.type === "dimension",
  );

  return label?.textHeight ?? 0;
}

function getFooterDrawingPoints(
  primitives: ReturnType<typeof getDrawingPrimitives>,
): DrawingPoint[] {
  return getPrimitivePoints(
    primitives.filter((primitive) => primitive.type !== "label"),
  );
}

function getFooterPlacement(
  drawingPoints: DrawingPoint[],
): { x: number; z: number; height: number } {
  if (drawingPoints.length === 0) {
    return {
      x: 0,
      z: -10,
      height: 2.5,
    };
  }

  const xs = drawingPoints.map(([x]) => x);
  const zs = drawingPoints.map(([, y]) => -y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);
  const width = Math.max(maxX - minX, 1);
  const height = Math.max(maxZ - minZ, 1);
  const scale = Math.max(width, height);
  const estimatedTextWidthRatio = DRAWING_FOOTER_TEXT.length * 0.6;
  const textHeight = Math.min(
    Math.max(scale * 0.025, 2.5),
    (width * 0.75) / estimatedTextWidthRatio,
  ) * 0.7;
  const padding = Math.max(scale * 0.08, textHeight * 2);

  return {
    x: (minX + maxX) / 2,
    z: minZ - padding,
    height: textHeight,
  };
}

function formatDxfNumber(value: number): string {
  if (!Number.isFinite(value)) {
    throw new Error(`Cannot export non-finite DXF coordinate: ${value}`);
  }

  if (Object.is(value, -0)) return "0";

  return Number(value.toPrecision(15)).toString();
}

function formatDxfText(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}
