import "./cltStressProfileDropdown.css";

export type ThroughThicknessStressRow = {
  thickness: number;
  topMpa: number;
  midMpa?: number;
  bottomMpa: number;
};

export type ThroughThicknessStressDropdownOptions = {
  title?: string;
  unitLabel?: string;
  width?: number;
  height?: number;
  valueDigits?: number;
  showMidLabels?: boolean;
  defaultOpen?: boolean;
  // "flip" matches Figure 26 sign convention (compression shown negative at top).
  signConvention?: "raw" | "flip";
};

type DropdownRefs = {
  details: HTMLDetailsElement;
  summary: HTMLElement;
  canvas: HTMLCanvasElement;
};

export type ThroughThicknessStressDropdown = {
  element: HTMLDetailsElement;
  update: (rows: ThroughThicknessStressRow[]) => void;
  setTitle: (title: string) => void;
};

export function createThroughThicknessStressDropdown(
  options: ThroughThicknessStressDropdownOptions = {},
): ThroughThicknessStressDropdown {
  const refs = createDropdownRefs(options);

  return {
    element: refs.details,
    update: (rows) => drawProfileFigure(refs.canvas, rows, options),
    setTitle: (title) => {
      refs.summary.textContent = title;
    },
  };
}

function createDropdownRefs(
  options: ThroughThicknessStressDropdownOptions,
): DropdownRefs {
  const details = document.createElement("details");
  details.className = "tt-stress-dropdown";
  details.open = options.defaultOpen ?? false;

  const summary = document.createElement("summary");
  summary.className = "tt-stress-dropdown__summary";
  summary.textContent = options.title ?? "Through-thickness stress profile";
  details.append(summary);

  const unit = document.createElement("div");
  unit.className = "tt-stress-dropdown__unit";
  unit.textContent = `[${options.unitLabel ?? "N/mm²"}]`;
  details.append(unit);

  const canvas = document.createElement("canvas");
  canvas.className = "tt-stress-dropdown__canvas";
  canvas.width = options.width ?? 980;
  canvas.height = options.height ?? 500;
  details.append(canvas);

  return { details, summary, canvas };
}

function drawProfileFigure(
  canvas: HTMLCanvasElement,
  rows: ThroughThicknessStressRow[],
  options: ThroughThicknessStressDropdownOptions,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  if (!rows.length) return;

  const padLeft = 14;
  const padRight = 120;
  const padTop = 16;
  const padBottom = 14;
  const chartX0 = padLeft;
  const chartX1 = width - padRight;
  const chartY0 = padTop;
  const chartY1 = height - padBottom;
  const chartWidth = chartX1 - chartX0;
  const chartHeight = chartY1 - chartY0;
  const centerX = chartX0 + chartWidth * 0.5;
  const halfSpan = chartWidth * 0.5 - 10;
  const totalThickness = rows.reduce((sum, row) => sum + row.thickness, 0);
  const maxAbs = Math.max(
    1e-6,
    ...rows.flatMap((row) => [
      Math.abs(row.topMpa),
      Math.abs(row.midMpa ?? 0),
      Math.abs(row.bottomMpa),
    ]),
  );

  ctx.fillStyle = "#f6efea";
  ctx.fillRect(chartX0, chartY0, chartWidth, chartHeight);
  ctx.strokeStyle = "#e5a274";
  ctx.lineWidth = 1;
  ctx.strokeRect(chartX0, chartY0, chartWidth, chartHeight);

  ctx.strokeStyle = "#e5a274";
  ctx.beginPath();
  ctx.moveTo(centerX, chartY0);
  ctx.lineTo(centerX, chartY1);
  ctx.stroke();

  let thicknessCursor = 0;
  for (const row of rows) {
    const yTop = chartY0 + (thicknessCursor / totalThickness) * chartHeight;
    thicknessCursor += row.thickness;
    const yBottom = chartY0 + (thicknessCursor / totalThickness) * chartHeight;

    const signedTop = applySignConvention(row.topMpa, options.signConvention);
    const signedBottom = applySignConvention(
      row.bottomMpa,
      options.signConvention,
    );
    const signedMid =
      row.midMpa === undefined
        ? undefined
        : applySignConvention(row.midMpa, options.signConvention);

    const xTop = centerX + (signedTop / maxAbs) * halfSpan;
    const xBottom = centerX + (signedBottom / maxAbs) * halfSpan;
    const xMid =
      signedMid === undefined ? undefined : centerX + (signedMid / maxAbs) * halfSpan;
    const yMid = 0.5 * (yTop + yBottom);
    const average =
      signedMid === undefined
        ? 0.5 * (signedTop + signedBottom)
        : (signedTop + signedMid + signedBottom) / 3;
    const rightward = average >= 0;
    const xCandidates =
      xMid === undefined ? [xTop, xBottom] : [xTop, xMid, xBottom];
    const edgeX = rightward
      ? Math.max(...xCandidates)
      : Math.min(...xCandidates);

    const gradient = ctx.createLinearGradient(centerX, 0, edgeX, 0);
    if (rightward) {
      gradient.addColorStop(0, "rgba(255, 93, 110, 0.95)");
      gradient.addColorStop(1, "rgba(205, 92, 104, 0.82)");
    } else {
      gradient.addColorStop(0, "rgba(91, 108, 255, 0.95)");
      gradient.addColorStop(1, "rgba(81, 95, 215, 0.82)");
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(centerX, yTop);
    ctx.lineTo(xTop, yTop);
    if (xMid !== undefined) ctx.lineTo(xMid, yMid);
    ctx.lineTo(xBottom, yBottom);
    ctx.lineTo(centerX, yBottom);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(229, 162, 116, 0.32)";
    ctx.beginPath();
    ctx.moveTo(chartX0, yTop);
    ctx.lineTo(chartX1, yTop);
    ctx.stroke();

    ctx.fillStyle = "#d36015";
    ctx.font = "15px 'Courier New', monospace";
    ctx.textAlign = "right";
    ctx.fillText(formatValue(signedTop, options.valueDigits), width - 8, yTop + 14);
    if (options.showMidLabels && signedMid !== undefined) {
      ctx.fillText(formatValue(signedMid, options.valueDigits), width - 8, yMid + 5);
    }
    ctx.fillText(
      formatValue(signedBottom, options.valueDigits),
      width - 8,
      yBottom - 4,
    );
  }

  ctx.strokeStyle = "rgba(229, 162, 116, 0.32)";
  ctx.beginPath();
  ctx.moveTo(chartX0, chartY1);
  ctx.lineTo(chartX1, chartY1);
  ctx.stroke();
}

function applySignConvention(
  valueMpa: number,
  signConvention: ThroughThicknessStressDropdownOptions["signConvention"] = "raw",
): number {
  return signConvention === "flip" ? -valueMpa : valueMpa;
}

function formatValue(value: number, digits = 3): string {
  const abs = Math.abs(value);
  if (abs > 0 && abs < 1e-3) return value.toExponential(Math.min(3, digits));
  return value.toFixed(digits);
}
