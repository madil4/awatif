import { html, render, svg } from "lit-html";
import van from "vanjs-core";
import {
  templates as Templates,
  type Components,
  type Geometry,
} from "@awatif/components";

import { DRAWING_FOOTER_TEXT } from "./constants";
import { exportDrawingDxf } from "./exportDrawingDxf";
import {
  getDrawingPrimitives,
  getPrimitivePoints,
  type DrawingPrimitive,
  type DrawingPoint,
} from "./getDrawingPrimitives";
import "./styles.css";

export function getDrawing({
  geometry,
  components,
  templates,
}: {
  geometry: Geometry;
  components?: Components;
  templates?: typeof Templates;
}): HTMLDivElement {
  const container = document.createElement("div");
  container.id = "drawing";

  van.derive(() => {
    const primitives = getDrawingPrimitives({
      points: geometry.points.val,
      lines: geometry.lines.val,
      components: components?.val,
      templates,
    });
    const viewBox = getViewBox(getPrimitivePoints(primitives));

    render(
      html`
        <div class="drawing-actions">
          <button
            @click=${() => exportDrawingDxf({ geometry, components, templates })}
            class="drawing-export-button"
            title="Export DXF"
          >
            Export DXF
          </button>
        </div>
        <div class="drawing-body">
          ${svg`
            <svg
              class="drawing-canvas"
              viewBox=${viewBox}
              role="img"
              aria-label="Drawing canvas"
            >
              ${primitives.map(renderPrimitive)}
            </svg>
          `}
          <div class="drawing-footer">${DRAWING_FOOTER_TEXT}</div>
        </div>
      `,
      container,
    );
  });

  return container;
}

function renderPrimitive(primitive: DrawingPrimitive) {
  if (primitive.type === "line") {
    return svg`
      <line
        class="drawing-line"
        x1=${primitive.start[0]}
        y1=${primitive.start[1]}
        x2=${primitive.end[0]}
        y2=${primitive.end[1]}
      />
    `;
  }

  if (primitive.type === "section") {
    return svg`
      ${primitive.segments.map(
        (segment) => svg`
          <line
            class="drawing-section"
            x1=${segment.start[0]}
            y1=${segment.start[1]}
            x2=${segment.end[0]}
            y2=${segment.end[1]}
          />
        `,
      )}
    `;
  }

  if (primitive.type === "dimension") {
    return svg`
      <g class="drawing-dimension">
        <line
          class="drawing-dimension-extension"
          x1=${primitive.start[0]}
          y1=${primitive.start[1]}
          x2=${primitive.dimensionStart[0]}
          y2=${primitive.dimensionStart[1]}
        />
        <line
          class="drawing-dimension-extension"
          x1=${primitive.end[0]}
          y1=${primitive.end[1]}
          x2=${primitive.dimensionEnd[0]}
          y2=${primitive.dimensionEnd[1]}
        />
        <line
          class="drawing-dimension-line"
          x1=${primitive.dimensionStart[0]}
          y1=${primitive.dimensionStart[1]}
          x2=${primitive.dimensionEnd[0]}
          y2=${primitive.dimensionEnd[1]}
        />
        ${primitive.ticks.map(
          (tick) => svg`
            <line
              class="drawing-dimension-tick"
              x1=${tick.start[0]}
              y1=${tick.start[1]}
              x2=${tick.end[0]}
              y2=${tick.end[1]}
            />
          `,
        )}
        <text
          class="drawing-dimension-halo"
          x=${primitive.center[0]}
          y=${primitive.center[1]}
          font-size=${primitive.textHeight}
          transform=${`rotate(${primitive.angle} ${primitive.center[0]} ${primitive.center[1]})`}
        >
          ${primitive.text}
        </text>
        <text
          class="drawing-dimension-text"
          x=${primitive.center[0]}
          y=${primitive.center[1]}
          font-size=${primitive.textHeight}
          transform=${`rotate(${primitive.angle} ${primitive.center[0]} ${primitive.center[1]})`}
        >
          ${primitive.text}
        </text>
      </g>
    `;
  }

  return svg`
    <g class="drawing-label">
      <line
        class="drawing-label-leader"
        x1=${primitive.target[0]}
        y1=${primitive.target[1]}
        x2=${primitive.center[0]}
        y2=${primitive.center[1]}
      />
      <text
        class="drawing-label-halo"
        x=${primitive.center[0]}
        y=${primitive.center[1]}
        font-size=${primitive.textHeight}
        transform=${`rotate(${primitive.angle} ${primitive.center[0]} ${primitive.center[1]})`}
      >
        ${primitive.text}
      </text>
      <text
        class="drawing-label-text"
        x=${primitive.center[0]}
        y=${primitive.center[1]}
        font-size=${primitive.textHeight}
        transform=${`rotate(${primitive.angle} ${primitive.center[0]} ${primitive.center[1]})`}
      >
        ${primitive.text}
      </text>
    </g>
  `;
}

function getViewBox(points: DrawingPoint[]): string {
  if (points.length === 0) return "0 0 1000 700";

  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = Math.max(maxX - minX, 1);
  const height = Math.max(maxY - minY, 1);
  const padding = Math.max(width, height) * 0.1;

  return [
    minX - padding,
    minY - padding,
    width + padding * 2,
    height + padding * 2,
  ].join(" ");
}
