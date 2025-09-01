import { x as s, v as e, a as w, g as $ } from "./styles-CHgmIz-C.js";
import { d as x, a as y, __tla as __tla_0 } from "./deformCpp-BprT8Kg9.js";
import { g as z } from "./getParameters-CL7Q-jKZ.js";
import { g as T } from "./getDialog-pbQItXqo.js";
import { g as S } from "./getReport-DPwlaBVR.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function F({ nodes: u, nodeInputs: p, elementInputs: b, deformOutputs: g, analyzeOutputs: f }) {
    return s`
    <br />
    <header class="header">
      <div class="header-left">
        <h6>Report</h6>
        <p class="bold">
          <a href="https://awatif.co" target="_blank">Awatif.co</a>
        </p>
        <p class="normal" id="reportDate">
          ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })}
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
      ${u.val.map((a, t) => s`
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
        `)}
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
      ${[
      ...p.val.supports
    ].map(([a, t]) => s`
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
        `)}
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
      ${[
      ...g.val.reactions
    ].map(([a, t]) => s`
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
        `)}
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
      ${[
      ...f.val.normals
    ].map(([a, t]) => s`
          <tr>
            <td><div class="custom-cell-content">${a}</div></td>
            <td>
              <div class="custom-cell-content">
                ${b.val.areas.get(a)}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">${t[0].toFixed(0)}</div>
            </td>
          </tr>
        `)}
    </table>
    <br /><br /><br />
  `;
  }
  const c = {
    xPosition: {
      value: e.state(600),
      min: 0,
      max: 1e3
    },
    zPosition: {
      value: e.state(0),
      min: 0,
      max: 500
    }
  }, l = e.state([]), o = e.state([]), i = e.state({}), d = e.state({}), r = e.state({}), n = e.state({}), v = {
    nodes: l,
    elements: o,
    nodeInputs: i,
    elementInputs: d,
    deformOutputs: r,
    analyzeOutputs: n
  };
  e.derive(() => {
    l.val = [
      [
        250,
        0,
        0
      ],
      [
        c.xPosition.value.val,
        0,
        c.zPosition.value.val
      ],
      [
        250,
        0,
        400
      ]
    ], o.val = [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ], i.val = {
      supports: /* @__PURE__ */ new Map([
        [
          0,
          [
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ],
        [
          2,
          [
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ]
      ]),
      loads: /* @__PURE__ */ new Map([
        [
          1,
          [
            0,
            0,
            -1e3,
            0,
            0,
            0
          ]
        ]
      ])
    }, d.val = {
      elasticities: /* @__PURE__ */ new Map([
        [
          0,
          200
        ],
        [
          1,
          200
        ]
      ]),
      areas: /* @__PURE__ */ new Map([
        [
          0,
          100
        ],
        [
          1,
          100
        ]
      ])
    }, r.val = x(l.val, o.val, i.val, d.val), n.val = y(l.val, o.val, d.val, r.val);
  });
  const h = e.state(""), m = e.state(void 0);
  e.derive(() => {
    h.val === "Report" && (m.val = S({
      template: F,
      data: v
    }));
  });
  document.body.append(w({
    clickedButton: h,
    buttons: [
      "Report"
    ],
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/report/main.ts",
    author: "https://www.linkedin.com/in/cal-mense/"
  }), T({
    dialogBody: m
  }), z(c), $({
    mesh: v,
    settingsObj: {
      gridSize: 1e3
    }
  }));
});
