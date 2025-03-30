import { v as e, h as w, x as l, g as $ } from "./styles-BT9ucHwM.js";
import { a as x } from "./analyze-VZgtIitG.js";
import { d as y } from "./deform-D3jFwYyY.js";
import { g as z } from "./getParameters-BYp-3p_e.js";
import { g as T } from "./getToolbar-CO4pQWZZ.js";
import { g as S } from "./getDialog-Cd8ixDn8.js";
import "./pureFunctionsAny.generated-BITz6FsS.js";
import "./complex-i8qiIvCl.js";
function F({ template: c, data: r }) {
  const s = document.createElement("div");
  return (
    e.derive(() => {
      w(c(r), s);
    }),
    s
  );
}
function B({ nodes: c, nodeInputs: r, elementInputs: s, deformOutputs: g, analyzeOutputs: f }) {
  return l`
    <br />
    <header class="header">
      <div class="header-left">
        <h6>Report</h6>
        <p class="bold">
          <a href="https://awatif.co" target="_blank">Awatif.co</a>
        </p>
        <p class="normal" id="reportDate">
          ${new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
      <div class="header-right">
        <svg
          class="flex-shrink-0 size-7"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 -3 35 35"
          fill="#015f73"
        >
          <path
            d="M2,29.14l9.86-16.87c1.86,3.34,4.56,7.62,3.34,11.57a7.61,7.61,0,0,1-2.61,3.68,7.78,7.78,0,0,1-5,1.61c-1.48,0-3,0-4.47,0A4.5,4.5,0,0,0,2,29.14Z"
          ></path>
          <path
            d="M12.86,10.43l5.71-10L35.12,29.14H31a13.92,13.92,0,0,1-8.44-3.54,18.23,18.23,0,0,1-3.44-4.5c-.55-.92-1.08-1.85-1.61-2.79-1.25-2.21-2.56-4.39-3.85-6.58Z"
          ></path>
        </svg>
      </div>
    </header>

    <br />
    <h1>Bars</h1>

    <br />
    <h2>Nodes</h2>
    <p class="text">
      The following table gives an overview of the node coordinates.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>xCoord</th>
        <th>yCoord</th>
        <th>zCoord</th>
      </tr>
      ${c.val.map(
        (a, t) => l`
          <tr>
            <td><div class="custom-cell-content">${t}</div></td>
            <td>
              <div class="custom-cell-content">${a[0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${a[1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${a[2]}</div>
            </td>
          </tr>
        `
      )}
    </table>

    <br />
    <h2>Supports</h2>
    <p class="text">
      The following table gives an overview of the support conditions.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>ux</th>
        <th>uy</th>
        <th>uz</th>
        <th>mx</th>
        <th>my</th>
        <th>mz</th>
      </tr>
      ${[...r.val.supports].map(
        ([a, t]) => l`
          <tr>
            <td><div class="custom-cell-content">${a}</div></td>
            <td>
              <div class="custom-cell-content">${t[0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[2]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[3]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[4]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[5]}</div>
            </td>
          </tr>
        `
      )}
    </table>

    <br />
    <h2>Reactions</h2>
    <p class="text">
      The following table gives an overview of the reaction forces.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>Fx</th>
        <th>Fy</th>
        <th>Fz</th>
      </tr>
      ${[...g.val.reactions].map(
        ([a, t]) => l`
          <tr>
            <td><div class="custom-cell-content">${a}</div></td>
            <td>
              <div class="custom-cell-content">${t[0].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[1].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[2].toFixed(0)}</div>
            </td>
          </tr>
        `
      )}
    </table>

    <br />
    <h2>Elements</h2>
    <p class="text">
      The following table gives an overview of the element results.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Bar</th>
        <th>Area</th>
        <th>Normal</th>
      </tr>
      ${[...f.val.normals].map(
        ([a, t]) => l`
          <tr>
            <td><div class="custom-cell-content">${a}</div></td>
            <td>
              <div class="custom-cell-content">
                ${s.val.areas.get(a)}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">${t[0].toFixed(0)}</div>
            </td>
          </tr>
        `
      )}
    </table>
    <br /><br /><br />
  `;
}
const n = { xPosition: { value: e.state(600), min: 0, max: 1e3 }, zPosition: { value: e.state(0), min: 0, max: 500 } },
  o = e.state([]),
  d = e.state([]),
  v = e.state({}),
  i = e.state({}),
  h = e.state({}),
  m = e.state({}),
  u = { nodes: o, elements: d, nodeInputs: v, elementInputs: i, deformOutputs: h, analyzeOutputs: m };
e.derive(() => {
  (o.val = [
    [250, 0, 0],
    [n.xPosition.value.val, 0, n.zPosition.value.val],
    [250, 0, 400],
  ]),
    (d.val = [
      [0, 1],
      [1, 2],
    ]),
    (v.val = {
      supports: new Map([
        [0, [!0, !0, !0, !0, !0, !0]],
        [2, [!0, !0, !0, !0, !0, !0]],
      ]),
      loads: new Map([[1, [0, 0, -1e3, 0, 0, 0]]]),
    }),
    (i.val = {
      elasticities: new Map([
        [0, 200],
        [1, 200],
      ]),
      areas: new Map([
        [0, 100],
        [1, 100],
      ]),
    }),
    (h.val = y(o.val, d.val, v.val, i.val)),
    (m.val = x(o.val, d.val, i.val, h.val));
});
const p = e.state(""),
  b = e.state(void 0);
e.derive(() => {
  p.val === "Report" && (b.val = F({ template: B, data: u }));
});
document.body.append(
  T({ clickedButton: p, buttons: ["Report"], sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/report/main.ts", author: "https://www.linkedin.com/in/cal-mense/" }),
  S({ dialogBody: b }),
  z(n),
  $({ structure: u, settingsObj: { gridSize: 1e3 } })
);
