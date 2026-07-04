import * as THREE from "three";
import {
  ComponentsType,
  type ComponentEntry,
  type Components,
  templates as Templates,
} from "@awatif/components";

import { getElementLocalAxes } from "../viewer/common/getElementLocalAxes";

export type GeometryPoint = [number, number, number];
export type DrawingPoint = [number, number];

export type DrawingLinePrimitive = {
  type: "line";
  start: DrawingPoint;
  end: DrawingPoint;
};

export type DrawingSegment = {
  start: DrawingPoint;
  end: DrawingPoint;
};

export type DrawingSectionPrimitive = {
  type: "section";
  segments: DrawingSegment[];
};

export type DrawingLabelPrimitive = {
  type: "label";
  text: string;
  target: DrawingPoint;
  center: DrawingPoint;
  angle: number;
  textHeight: number;
  bounds: DrawingPoint[];
};

export type DrawingDimensionPrimitive = {
  type: "dimension";
  text: string;
  start: DrawingPoint;
  end: DrawingPoint;
  dimensionStart: DrawingPoint;
  dimensionEnd: DrawingPoint;
  ticks: DrawingSegment[];
  center: DrawingPoint;
  angle: number;
  textHeight: number;
  bounds: DrawingPoint[];
};

export type DrawingPrimitive =
  | DrawingLinePrimitive
  | DrawingSectionPrimitive
  | DrawingLabelPrimitive
  | DrawingDimensionPrimitive;

type DesignTemplateWithSection = {
  defaultParams?: Record<string, unknown>;
  getSection?: (params: any) => unknown;
};

type LineEndpointCuts = {
  startCutX?: number;
  startCutY?: number;
  endCutX?: number;
  endCutY?: number;
};

type SectionedEndpoint = {
  lineId: number;
  isStart: boolean;
  node: GeometryPoint;
  other: GeometryPoint;
  section: DrawingPoint[];
};

const EPSILON = 1e-9;
const LABEL_TEXT_SCALE = 0.75;
const LABEL_TEXT_WIDTH_FACTOR = 0.6;
const DIMENSION_SCALE = 0.6;
const DIMENSION_OFFSET_FACTOR = 4.2;
const DIMENSION_TEXT_OFFSET_FACTOR = 1.25;
const DIMENSION_TICK_FACTOR = 1.15;

export function getDrawingPrimitives({
  points,
  lines,
  components,
  templates,
}: {
  points: Map<number, GeometryPoint>;
  lines: Map<number, [number, number]>;
  components?: Components["val"];
  templates?: typeof Templates;
}): DrawingPrimitive[] {
  const sectionsByLineId = getSectionsByLineId({ components, templates });
  const lineEndpointCuts = getLineEndpointCuts({
    points,
    lines,
    sectionsByLineId,
  });
  const primitives: DrawingPrimitive[] = [];

  lines.forEach(([startId, endId], lineId) => {
    const start = points.get(startId);
    const end = points.get(endId);

    if (!start || !end) return;

    const section = sectionsByLineId.get(lineId);
    const cuts = lineEndpointCuts.get(lineId);
    const sectionPrimitive = section
      ? getProjectedSectionPrimitive({
          start,
          end,
          section,
          startCutX: cuts?.startCutX,
          startCutY: cuts?.startCutY,
          endCutX: cuts?.endCutX,
          endCutY: cuts?.endCutY,
        })
      : null;

    primitives.push(
      sectionPrimitive ?? {
        type: "line",
        start: projectPoint(start),
        end: projectPoint(end),
      },
    );
  });

  primitives.push(
    ...getDimensionPrimitives({
      points,
      lines,
    }),
  );

  primitives.push(
    ...getLabelPrimitives({
      points,
      lines,
      components,
      templates,
    }),
  );

  return primitives;
}

export function getPrimitivePoints(
  primitives: DrawingPrimitive[],
): DrawingPoint[] {
  return primitives.flatMap((primitive) =>
    primitive.type === "line"
      ? [primitive.start, primitive.end]
      : primitive.type === "section"
        ? getUniqueSegmentPoints(primitive.segments)
        : primitive.type === "label"
          ? [primitive.target, ...primitive.bounds]
          : [
              primitive.start,
              primitive.end,
              primitive.dimensionStart,
              primitive.dimensionEnd,
              ...getUniqueSegmentPoints(primitive.ticks),
              ...primitive.bounds,
            ],
  );
}

function getDimensionPrimitives({
  points,
  lines,
}: {
  points: Map<number, GeometryPoint>;
  lines: Map<number, [number, number]>;
}): DrawingDimensionPrimitive[] {
  const textHeight = getLabelTextHeight(points) * DIMENSION_SCALE;
  const dimensions: DrawingDimensionPrimitive[] = [];

  lines.forEach(([startId, endId]) => {
    const start = points.get(startId);
    const end = points.get(endId);

    if (!start || !end) return;

    const projectedStart = projectPoint(start);
    const projectedEnd = projectPoint(end);
    const projectedLength = getDistance(projectedStart, projectedEnd);
    const trueLength = getGeometryDistance(start, end);

    if (projectedLength <= EPSILON || trueLength <= EPSILON) return;

    dimensions.push(
      getLineDimensionPrimitive({
        start: projectedStart,
        end: projectedEnd,
        text: `${trueLength.toFixed(2)} m`,
        textHeight,
      }),
    );
  });

  return dimensions;
}

function getLabelPrimitives({
  points,
  lines,
  components,
  templates,
}: {
  points: Map<number, GeometryPoint>;
  lines: Map<number, [number, number]>;
  components?: Components["val"];
  templates?: typeof Templates;
}): DrawingLabelPrimitive[] {
  const designComponents = components?.get(ComponentsType.DESIGN) ?? [];
  const designTemplates = templates?.get(ComponentsType.DESIGN);
  const textHeight = getLabelTextHeight(points);
  const labelsByLineId = new Map<number, number>();
  const labels: DrawingLabelPrimitive[] = [];

  designComponents.forEach((component: ComponentEntry) => {
    const template = designTemplates?.get(
      component.templateId,
    ) as DesignTemplateWithSection | undefined;
    const text = getProfileLabel({
      defaultParams: template?.defaultParams,
      params: component.params,
    });
    if (!text) return;

    component.geometry.forEach((lineId) => {
      const line = lines.get(lineId);
      if (!line) return;

      const start = points.get(line[0]);
      const end = points.get(line[1]);
      if (!start || !end) return;

      const projectedStart = projectPoint(start);
      const projectedEnd = projectPoint(end);
      const length = getDistance(projectedStart, projectedEnd);
      if (length <= EPSILON) return;

      const stackIndex = labelsByLineId.get(lineId) ?? 0;
      labelsByLineId.set(lineId, stackIndex + 1);
      labels.push(
        getLineLabelPrimitive({
          text,
          start: projectedStart,
          end: projectedEnd,
          textHeight,
          stackIndex,
        }),
      );
    });
  });

  return labels;
}

function getLabelTextHeight(points: Map<number, GeometryPoint>): number {
  const drawingPoints = Array.from(points.values()).map(projectPoint);
  if (drawingPoints.length === 0) return 0.25;

  const xs = drawingPoints.map(([x]) => x);
  const ys = drawingPoints.map(([, y]) => y);
  const scale = Math.max(
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
    1,
  );

  return Math.min(Math.max(scale * 0.035, 0.18), 0.5) * LABEL_TEXT_SCALE;
}

function getProfileLabel({
  defaultParams,
  params,
}: {
  defaultParams?: Record<string, unknown>;
  params?: Record<string, unknown>;
}): string {
  const profile = params?.profile ?? defaultParams?.profile;

  return typeof profile === "string" ? profile.trim() : "";
}

function getLineLabelPrimitive({
  text,
  start,
  end,
  textHeight,
  stackIndex,
}: {
  text: string;
  start: DrawingPoint;
  end: DrawingPoint;
  textHeight: number;
  stackIndex: number;
}): DrawingLabelPrimitive {
  const midpoint: DrawingPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
  ];
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = Math.hypot(dx, dy);
  const unitX = dx / length;
  const unitY = dy / length;
  const normal: DrawingPoint = [-unitY, unitX];
  const offset = textHeight * (2.4 + stackIndex * 1.9);
  const center: DrawingPoint = [
    midpoint[0] + normal[0] * offset,
    midpoint[1] + normal[1] * offset,
  ];
  const angle = normalizeLabelAngle((Math.atan2(dy, dx) * 180) / Math.PI);
  const textWidth = Math.max(
    text.length * textHeight * LABEL_TEXT_WIDTH_FACTOR,
    textHeight,
  );
  const bounds = getRotatedRectBounds({
    center,
    width: textWidth + textHeight * 0.8,
    height: textHeight * 1.8,
    angle,
  });

  return {
    type: "label",
    text,
    target: midpoint,
    center,
    angle,
    textHeight,
    bounds,
  };
}

function getLineDimensionPrimitive({
  text,
  start,
  end,
  textHeight,
}: {
  text: string;
  start: DrawingPoint;
  end: DrawingPoint;
  textHeight: number;
}): DrawingDimensionPrimitive {
  const midpoint: DrawingPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
  ];
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = Math.hypot(dx, dy);
  const unitX = dx / length;
  const unitY = dy / length;
  const dimensionNormal: DrawingPoint = [unitY, -unitX];
  const offset = textHeight * DIMENSION_OFFSET_FACTOR;
  const dimensionStart: DrawingPoint = [
    start[0] + dimensionNormal[0] * offset,
    start[1] + dimensionNormal[1] * offset,
  ];
  const dimensionEnd: DrawingPoint = [
    end[0] + dimensionNormal[0] * offset,
    end[1] + dimensionNormal[1] * offset,
  ];
  const textOffset = offset + textHeight * DIMENSION_TEXT_OFFSET_FACTOR;
  const center: DrawingPoint = [
    midpoint[0] + dimensionNormal[0] * textOffset,
    midpoint[1] + dimensionNormal[1] * textOffset,
  ];
  const angle = normalizeLabelAngle((Math.atan2(dy, dx) * 180) / Math.PI);
  const tickDirection = normalizeDrawingVector([
    unitX + dimensionNormal[0],
    unitY + dimensionNormal[1],
  ]);
  const tickLength = textHeight * DIMENSION_TICK_FACTOR;
  const textWidth = Math.max(
    text.length * textHeight * LABEL_TEXT_WIDTH_FACTOR,
    textHeight,
  );
  const bounds = getRotatedRectBounds({
    center,
    width: textWidth + textHeight * 0.8,
    height: textHeight * 1.8,
    angle,
  });

  return {
    type: "dimension",
    text,
    start,
    end,
    dimensionStart,
    dimensionEnd,
    ticks: [
      getCenteredSegment(dimensionStart, tickDirection, tickLength),
      getCenteredSegment(dimensionEnd, tickDirection, tickLength),
    ],
    center,
    angle,
    textHeight,
    bounds,
  };
}

function getCenteredSegment(
  center: DrawingPoint,
  direction: DrawingPoint,
  length: number,
): DrawingSegment {
  const halfLength = length / 2;

  return {
    start: [
      center[0] - direction[0] * halfLength,
      center[1] - direction[1] * halfLength,
    ],
    end: [
      center[0] + direction[0] * halfLength,
      center[1] + direction[1] * halfLength,
    ],
  };
}

function normalizeDrawingVector(vector: DrawingPoint): DrawingPoint {
  const length = Math.hypot(vector[0], vector[1]);

  if (length <= EPSILON) return [1, 0];

  return [vector[0] / length, vector[1] / length];
}

function normalizeLabelAngle(angle: number): number {
  let normalized = angle;

  while (normalized > 180) normalized -= 360;
  while (normalized <= -180) normalized += 360;

  if (normalized > 90) normalized -= 180;
  if (normalized < -90) normalized += 180;

  return normalized;
}

function getRotatedRectBounds({
  center,
  width,
  height,
  angle,
}: {
  center: DrawingPoint;
  width: number;
  height: number;
  angle: number;
}): DrawingPoint[] {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return [
    [-halfWidth, -halfHeight],
    [halfWidth, -halfHeight],
    [halfWidth, halfHeight],
    [-halfWidth, halfHeight],
  ].map(([x, y]) => [
    center[0] + x * cos - y * sin,
    center[1] + x * sin + y * cos,
  ]);
}

function getSectionsByLineId({
  components,
  templates,
}: {
  components?: Components["val"];
  templates?: typeof Templates;
}): Map<number, DrawingPoint[]> {
  const sectionsByLineId = new Map<number, DrawingPoint[]>();
  const designComponents = components?.get(ComponentsType.DESIGN) ?? [];
  const designTemplates = templates?.get(ComponentsType.DESIGN);

  designComponents.forEach((component: ComponentEntry) => {
    const template = designTemplates?.get(
      component.templateId,
    ) as DesignTemplateWithSection | undefined;

    if (!template?.getSection) return;

    const params = {
      ...(template.defaultParams ?? {}),
      ...(component.params ?? {}),
    };
    const section = normalizeSection(template.getSection(params));

    if (!section) return;

    component.geometry.forEach((lineId) => {
      sectionsByLineId.set(lineId, section);
    });
  });

  return sectionsByLineId;
}

function getLineEndpointCuts({
  points,
  lines,
  sectionsByLineId,
}: {
  points: Map<number, GeometryPoint>;
  lines: Map<number, [number, number]>;
  sectionsByLineId: Map<number, DrawingPoint[]>;
}): Map<number, LineEndpointCuts> {
  const attachedEndpointsByPointId = new Map<number, SectionedEndpoint[]>();

  lines.forEach(([startId, endId], lineId) => {
    const section = sectionsByLineId.get(lineId);
    if (!section) return;

    const start = points.get(startId);
    const end = points.get(endId);
    if (!start || !end) return;

    addSectionedEndpoint(attachedEndpointsByPointId, startId, {
      lineId,
      isStart: true,
      node: start,
      other: end,
      section,
    });
    addSectionedEndpoint(attachedEndpointsByPointId, endId, {
      lineId,
      isStart: false,
      node: end,
      other: start,
      section,
    });
  });

  const cuts = new Map<number, LineEndpointCuts>();

  attachedEndpointsByPointId.forEach((endpoints) => {
    const verticalEndpoints = endpoints.filter(isVerticalEndpoint);
    const nonVerticalEndpoints = endpoints.filter(
      (endpoint) => !isVerticalEndpoint(endpoint),
    );

    nonVerticalEndpoints.forEach((endpoint) => {
      const cutX = getEndpointVerticalCutX(endpoint, verticalEndpoints);
      const lineCuts = cuts.get(endpoint.lineId) ?? {};

      if (endpoint.isStart) {
        lineCuts.startCutX = cutX;
      } else {
        lineCuts.endCutX = cutX;
      }

      cuts.set(endpoint.lineId, lineCuts);
    });

    verticalEndpoints.forEach((endpoint) => {
      const cutY = getEndpointHorizontalCutY(endpoint, nonVerticalEndpoints);
      if (cutY === undefined) return;

      const lineCuts = cuts.get(endpoint.lineId) ?? {};

      if (endpoint.isStart) {
        lineCuts.startCutY = cutY;
      } else {
        lineCuts.endCutY = cutY;
      }

      cuts.set(endpoint.lineId, lineCuts);
    });
  });

  return cuts;
}

function addSectionedEndpoint(
  endpointsByPointId: Map<number, SectionedEndpoint[]>,
  pointId: number,
  endpoint: SectionedEndpoint,
) {
  const endpoints = endpointsByPointId.get(pointId) ?? [];
  endpoints.push(endpoint);
  endpointsByPointId.set(pointId, endpoints);
}

function isVerticalEndpoint({ node, other }: SectionedEndpoint): boolean {
  const [nodeX, nodeY] = projectPoint(node);
  const [otherX, otherY] = projectPoint(other);

  return (
    Math.abs(otherX - nodeX) <= EPSILON &&
    Math.abs(otherY - nodeY) > EPSILON
  );
}

function getEndpointVerticalCutX(
  endpoint: SectionedEndpoint,
  verticalEndpoints: SectionedEndpoint[],
): number {
  const node = projectPoint(endpoint.node);
  const other = projectPoint(endpoint.other);
  const directionX = other[0] - node[0];

  if (Math.abs(directionX) <= EPSILON || verticalEndpoints.length === 0) {
    return node[0];
  }

  const verticalFaceXs = verticalEndpoints.flatMap((verticalEndpoint) =>
    getProjectedSectionXsAtEndpoint(verticalEndpoint),
  );

  if (verticalFaceXs.length === 0) return node[0];

  return directionX > 0
    ? Math.max(...verticalFaceXs)
    : Math.min(...verticalFaceXs);
}

function getProjectedSectionXsAtEndpoint(endpoint: SectionedEndpoint): number[] {
  const nodeVector = new THREE.Vector3(...endpoint.node);
  const otherVector = new THREE.Vector3(...endpoint.other);
  const axes = getElementLocalAxes(nodeVector, otherVector);

  if (!axes) return [];

  return endpoint.section.map((point) => {
    const [x] = projectSectionPoint({
      origin: nodeVector,
      axes,
      point,
    });

    return x;
  });
}

function getEndpointHorizontalCutY(
  endpoint: SectionedEndpoint,
  nonVerticalEndpoints: SectionedEndpoint[],
): number | undefined {
  const node = projectPoint(endpoint.node);
  const other = projectPoint(endpoint.other);
  const directionY = other[1] - node[1];

  if (Math.abs(directionY) <= EPSILON || nonVerticalEndpoints.length === 0) {
    return undefined;
  }

  const connectedYs = nonVerticalEndpoints.flatMap((nonVerticalEndpoint) =>
    getEndpointCutPoints(nonVerticalEndpoint, [endpoint]).map(([, y]) => y),
  );

  if (connectedYs.length === 0) return undefined;

  return directionY > 0 ? Math.min(...connectedYs) : Math.max(...connectedYs);
}

function getEndpointCutPoints(
  endpoint: SectionedEndpoint,
  verticalEndpoints: SectionedEndpoint[],
): DrawingPoint[] {
  const nodeVector = new THREE.Vector3(...endpoint.node);
  const otherVector = new THREE.Vector3(...endpoint.other);
  const axes = getElementLocalAxes(nodeVector, otherVector);

  if (!axes) return [];

  const startPoints = endpoint.section.map((point) =>
    projectSectionPoint({ origin: nodeVector, axes, point }),
  );
  const endPoints = endpoint.section.map((point) =>
    projectSectionPoint({ origin: otherVector, axes, point }),
  );
  const cutX = getEndpointVerticalCutX(endpoint, verticalEndpoints);

  return getVerticalCutPoints({
    startPoints,
    endPoints,
    cutX,
  });
}

function normalizeSection(section: unknown): DrawingPoint[] | null {
  if (!Array.isArray(section) || section.length < 3) return null;

  const points: DrawingPoint[] = [];

  for (const point of section) {
    if (!Array.isArray(point) || point.length < 2) return null;

    const [x, y] = point;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

    points.push([x, y]);
  }

  return points;
}

function getProjectedSectionPrimitive({
  start,
  end,
  section,
  startCutX,
  startCutY,
  endCutX,
  endCutY,
}: {
  start: GeometryPoint;
  end: GeometryPoint;
  section: DrawingPoint[];
  startCutX?: number;
  startCutY?: number;
  endCutX?: number;
  endCutY?: number;
}): DrawingSectionPrimitive | null {
  const startVector = new THREE.Vector3(...start);
  const endVector = new THREE.Vector3(...end);
  const axes = getElementLocalAxes(startVector, endVector);

  if (!axes) return null;

  const projectedStartPoints = section.map((point) =>
    projectSectionPoint({ origin: startVector, axes, point }),
  );
  const projectedEndPoints = section.map((point) =>
    projectSectionPoint({ origin: endVector, axes, point }),
  );
  const cutStartPoints =
    startCutY === undefined
      ? startCutX === undefined
        ? projectedStartPoints
        : getVerticalCutPoints({
            startPoints: projectedStartPoints,
            endPoints: projectedEndPoints,
            cutX: startCutX,
          })
      : getHorizontalCutPoints(projectedStartPoints, startCutY);
  const cutEndPoints =
    endCutY === undefined
      ? endCutX === undefined
        ? projectedEndPoints
        : getVerticalCutPoints({
            startPoints: projectedStartPoints,
            endPoints: projectedEndPoints,
            cutX: endCutX,
          })
      : getHorizontalCutPoints(projectedEndPoints, endCutY);
  const segments = deduplicateSegments([
    ...getBoundarySegments(cutStartPoints),
    ...getBoundarySegments(cutEndPoints),
    ...cutStartPoints.map((startPoint, index) => ({
      start: startPoint,
      end: cutEndPoints[index],
    })),
  ]);

  if (
    segments.length === 0 ||
    arePointsCollinear(getUniqueSegmentPoints(segments))
  ) {
    return null;
  }

  return {
    type: "section",
    segments,
  };
}

function getVerticalCutPoints({
  startPoints,
  endPoints,
  cutX,
}: {
  startPoints: DrawingPoint[];
  endPoints: DrawingPoint[];
  cutX: number;
}): DrawingPoint[] {
  return startPoints.map((startPoint, index) =>
    getVerticalCutPoint(startPoint, endPoints[index], cutX),
  );
}

function getVerticalCutPoint(
  start: DrawingPoint,
  end: DrawingPoint,
  cutX: number,
): DrawingPoint {
  const dx = end[0] - start[0];

  if (Math.abs(dx) <= EPSILON) return start;

  const t = Math.min(1, Math.max(0, (cutX - start[0]) / dx));

  return [cutX, start[1] + (end[1] - start[1]) * t];
}

function getHorizontalCutPoints(
  points: DrawingPoint[],
  cutY: number,
): DrawingPoint[] {
  return points.map(([x]) => [x, cutY]);
}

function projectSectionPoint({
  origin,
  axes,
  point,
}: {
  origin: THREE.Vector3;
  axes: NonNullable<ReturnType<typeof getElementLocalAxes>>;
  point: DrawingPoint;
}): DrawingPoint {
  const [sectionX, sectionY] = point;
  const offset = axes.localZ
    .clone()
    .multiplyScalar(sectionX)
    .add(axes.localY.clone().multiplyScalar(sectionY));

  return projectVector(origin.clone().add(offset));
}

function getBoundarySegments(points: DrawingPoint[]): DrawingSegment[] {
  return points.map((point, index) => ({
    start: point,
    end: points[(index + 1) % points.length],
  }));
}

function deduplicateSegments(segments: DrawingSegment[]): DrawingSegment[] {
  const seen = new Set<string>();
  const uniqueSegments: DrawingSegment[] = [];

  segments.forEach((segment) => {
    if (isSamePoint(segment.start, segment.end)) return;

    const key = getSegmentKey(segment);
    if (seen.has(key)) return;

    seen.add(key);
    uniqueSegments.push(segment);
  });

  return uniqueSegments;
}

function getUniqueSegmentPoints(segments: DrawingSegment[]): DrawingPoint[] {
  const seen = new Set<string>();
  const points: DrawingPoint[] = [];

  segments.forEach((segment) => {
    [segment.start, segment.end].forEach((point) => {
      const key = getPointKey(point);
      if (seen.has(key)) return;

      seen.add(key);
      points.push(point);
    });
  });

  return points;
}

function getSegmentKey({ start, end }: DrawingSegment): string {
  const startKey = getPointKey(start);
  const endKey = getPointKey(end);

  return startKey < endKey ? `${startKey}|${endKey}` : `${endKey}|${startKey}`;
}

function getPointKey(point: DrawingPoint): string {
  return point.map((value) => Math.round(value / EPSILON)).join(",");
}

function isSamePoint(a: DrawingPoint, b: DrawingPoint): boolean {
  return Math.abs(a[0] - b[0]) <= EPSILON && Math.abs(a[1] - b[1]) <= EPSILON;
}

function getDistance(a: DrawingPoint, b: DrawingPoint): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function getGeometryDistance(a: GeometryPoint, b: GeometryPoint): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
}

function arePointsCollinear(points: DrawingPoint[]): boolean {
  if (points.length < 3) return true;

  const [origin, reference] = points;

  return points
    .slice(2)
    .every((point) => Math.abs(cross(origin, reference, point)) <= EPSILON);
}

function cross(
  origin: DrawingPoint,
  a: DrawingPoint,
  b: DrawingPoint,
): number {
  return (
    (a[0] - origin[0]) * (b[1] - origin[1]) -
    (a[1] - origin[1]) * (b[0] - origin[0])
  );
}

function projectVector(vector: THREE.Vector3): DrawingPoint {
  return [vector.x, -vector.z];
}

function projectPoint([x, , z]: GeometryPoint): DrawingPoint {
  return [x, -z];
}
