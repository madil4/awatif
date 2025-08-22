import { w as X, x as E, v as a, g as J, a as Z } from "./styles-CKPX8ULl.js";
import { g as q } from "./getTables-DwSfcE-A.js";
import { g as Q } from "./getDialog-C1i1LSZM.js";
import { g as W } from "./getReport-bCddiobF.js";
import { d as Y, a as tt, __tla as __tla_0 } from "./deformCpp-BprT8Kg9.js";
import { g as at, a as et, b as st, c as N, d as A, __tla as __tla_1 } from "./getSolids-DINudLyp.js";
import "./complex-i8qiIvCl.js";
import { __tla as __tla_2 } from "./getMesh-DmUdekin.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./pureFunctionsAny.generated-Dh3LO6N2.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  function ot({ onToolbarClick: e, onClearPoints: s }) {
    const o = document.createElement("div");
    return o.id = "drawing-toolbar", new X({
      name: "toolbar",
      box: o,
      items: [
        {
          type: "radio",
          id: "1st-floor",
          text: "Columns",
          checked: true,
          tooltip: "Create Columns"
        },
        {
          type: "radio",
          id: "2nd-floor",
          text: "Slab",
          tooltip: "Create Slab"
        },
        {
          type: "break"
        },
        {
          type: "button",
          id: "clear-points",
          text: "Clear Points",
          tooltip: "Remove all points of selected level",
          icon: "w2ui-icon-cross"
        }
      ],
      onClick(l) {
        l.target === "clear-points" ? s() : e(l.target);
      }
    }), o;
  }
  function lt() {
    const e = document.createElement("div"), s = navigator.userAgent.includes("Macintosh");
    return e.className = "snap-tip", e.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${s ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, e.classList.add("show"), document.addEventListener("keydown", (o) => {
      (o.ctrlKey || o.metaKey) && e.classList.remove("show");
    }), e;
  }
  function nt(e, s, o, l, b, C) {
    const v = o - 1, u = s * o + l * v, c = Array.from({
      length: o + v
    }, (i, y) => y % 2 === 0 ? s : l);
    let n = [
      0
    ], d = 0;
    for (let i of c) d += i, n.push(d);
    const M = n.map((i) => i - u / 2);
    let B = 0, P = [];
    const $ = 1e3;
    for (let i = 0; i < c.length; i++) {
      let y = c[i], j = $ * y ** 3 / 12, G = $ * y, K = M[i + 1], _ = j + G * K ** 2;
      P.push(_), B += _;
    }
    const T = M.map((i) => Number((b * 1e6 * i / B).toFixed(2))), U = Math.max(...T), z = e.f_mk * C, F = T.map((i) => Number((i / z).toFixed(2))), V = Math.max(...F);
    return {
      slabHeight: u,
      thicknesses: c,
      zCordsFromMid: M,
      inertiaList: P,
      inertia: B,
      bendingStresses: T,
      bendingStressMax: U,
      f_md: z,
      eta: F,
      etaMax: V
    };
  }
  const it = "" + new URL("awatif-logo-DnnuEFJ2.png", import.meta.url).href, rt = "" + new URL("clt-bending-stress-DvR3Ux1R.png", import.meta.url).href, dt = ({ designMomentInput: e, designOutputs: s }) => E`
    <div id="report">
      <header class="header">
        <div class="header-left">
          <p class="header-title">Report</p>
          <a href="https://awatif.co" class="header-link" target="_blank"
            >https://awatif.co</a
          >
        </div>
        <div class="header-right">
          <img src="${it}" id="headerLogo" alt="Logo" />
        </div>
      </header>

      <br />
      <h1>Cross-Laminated Timber (CLT)</h1>
      <p class="caption">EN 1995-1-1: 2004</p>

      <br />
      <h2>Bending Design</h2>
      <p class="caption">EN 1995-1-1: 2004</p>
      <p class="p1">The following shows the results of the maximum node.</p>

      <h3>Summary Table</h3>
      <table>
        <tr>
          <th>Property</th>
          <th>Value</th>
          <th>Unit</th>
        </tr>
        <tr>
          <td>Slab Height</td>
          <td>${s.val.slabHeight}</td>
          <td>mm</td>
        </tr>
        <tr>
          <td>Moment of Inertia</td>
          <td>${s.val.inertia.toFixed(0)}</td>
          <td>mm⁴</td>
        </tr>
        <tr>
          <td>Bending Moment</td>
          <td>${e.val.toFixed(1)}</td>
          <td>kNm</td>
        </tr>
        <tr>
          <td>Bending Stress</td>
          <td>${s.val.bendingStressMax.toFixed(1)}</td>
          <td>N/mm²</td>
        </tr>
        <tr>
          <td>Bending Resistance</td>
          <td>${s.val.f_md.toFixed(1)}</td>
          <td>N/mm²</td>
        </tr>
        <tr>
          <td>Maximum Utilization Ratio</td>
          <td>${(s.val.etaMax * 100).toFixed(0)}</td>
          <td>%</td>
        </tr>
      </table>

      <br />

      <h3>Bending Stress Layout Table</h3>
      <table>
        <tr>
          <th>Layer</th>
          <th>z-Coordinate</th>
          <th>Bending Stress</th>
          <th>Utilization Ratio</th>
        </tr>
        <tbody id="stressTable">
          ${s.val.bendingStresses.map((o, l) => E`
              <tr>
                <td>Layer ${l + 1}</td>
                <td>${s.val.zCordsFromMid[l]} mm</td>
                <td>${o.toFixed(2)} N/mm²</td>
                <td>${(s.val.eta[l] * 100).toFixed(0)}%</td>
              </tr>
            `)}
        </tbody>
      </table>

      <br /><br />

      <h3>Structural Sketch</h3>
      <img
        id="threeCanvas"
        width="600"
        height="400"
        style="border:1px solid #ccc;"
        src=${rt}
      />

      <br /><br />
    </div>
  `, t = {
    points: a.state([]),
    stories: a.state([
      0
    ]),
    columns: a.state([]),
    slabs: a.state([]),
    columnsByStory: a.state(/* @__PURE__ */ new Map()),
    slabsByStory: a.state(/* @__PURE__ */ new Map()),
    columnData: a.state(/* @__PURE__ */ new Map()),
    slabData: a.state(/* @__PURE__ */ new Map())
  }, D = at(), R = et(), g = a.state([
    R
  ]), mt = a.state([
    D
  ]), r = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({}),
    analyzeOutputs: a.state({})
  }, k = a.state(10), H = a.state(), ct = [
    [
      3,
      2,
      0
    ],
    [
      3,
      11,
      0
    ],
    [
      12,
      11,
      0
    ],
    [
      18,
      11,
      0
    ],
    [
      18,
      6,
      0
    ],
    [
      12,
      6,
      0
    ],
    [
      12,
      2,
      0
    ],
    [
      3,
      6,
      0
    ]
  ], pt = [
    [
      3,
      2,
      4
    ],
    [
      3,
      11,
      4
    ],
    [
      12,
      11,
      4
    ],
    [
      18,
      11,
      4
    ],
    [
      18,
      6,
      4
    ],
    [
      12,
      6,
      4
    ],
    [
      12,
      2,
      4
    ],
    [
      3,
      6,
      4
    ]
  ], vt = [
    [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    []
  ], p = a.state([]), m = a.state(pt), h = a.state(vt), f = a.state(ct), S = a.state([]), O = a.state({
    position: [
      10,
      10,
      0
    ],
    rotation: [
      Math.PI / 2,
      0,
      0
    ]
  }), I = a.state(""), L = a.state(void 0), w = 4;
  let x = "1st-floor";
  function ht(e) {
    x = e, O.val = {
      position: [
        10,
        10,
        e == "1st-floor" ? 0 : w
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, f.val = e === "1st-floor" ? p.val : m.val, S.val = e === "1st-floor" ? [] : h.val;
  }
  function bt() {
    x === "1st-floor" ? p.val = [] : (m.val = [], h.val = []), f.val = [], S.val = [], t.points.val = [], t.columns.val = [], t.slabs.val = [], t.columnsByStory.val = /* @__PURE__ */ new Map(), t.slabsByStory.val = /* @__PURE__ */ new Map(), t.columnData.val = /* @__PURE__ */ new Map(), t.slabData.val = /* @__PURE__ */ new Map(), r.nodes.val = [], r.elements.val = [], r.nodeInputs.val = {}, R.geometry = N(t.points.val, t.slabs.val, t.columns.val), D.geometry = A(t.points.val, t.slabs.val, t.columns.val), g.val = [
      ...g.rawVal
    ];
  }
  a.derive(() => {
    x == "1st-floor" && (p.val = f.val), x == "2nd-floor" && (m.val = f.val, h.val = S.val);
  });
  a.derive(() => {
    const e = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = [], b = [], C = [], v = [];
    if (l.length, m.val.length > 0) for (let n = 0; n < m.val.length; n++) C.push([
      m.val[n][0],
      m.val[n][1],
      w
    ]), l.push([
      m.val[n][0],
      m.val[n][1],
      w
    ]);
    s.set(0, Array.from(h.rawVal.keys()));
    const u = -1;
    o.set(0, {
      analysisInput: {
        areaLoad: u,
        isOpening: false,
        thickness: 1,
        material: {
          elasticity: 300,
          poissonsRatio: 0.3
        }
      }
    }), h.rawVal.forEach((n, d) => {
      o.set(d, {
        analysisInput: {
          areaLoad: u,
          isOpening: false,
          thickness: 1,
          material: {
            elasticity: 300,
            poissonsRatio: 0.3
          }
        }
      });
    });
    const c = [];
    if (p.val.length > 0) {
      for (let n = 0; n < p.val.length; n++) {
        const d = p.val[n];
        v.push([
          [
            d[0],
            d[1],
            d[2] + w
          ]
        ]);
      }
      for (let n = 0; n < v.length; n++) {
        const d = l.length;
        l.push(...v[n]), b.push(d), c.push(b.length - 1);
      }
    }
    e.set(0, c), t.points.val = l, t.columns.val = b, t.slabs.val = h.val, t.columnsByStory.val = e, t.slabsByStory.val = s, t.slabData.val = o;
  });
  a.derive(() => {
    const { nodes: e, elements: s, nodeInputs: o, elementInputs: l } = st(t.points.val, t.stories.val, t.columns.val, t.slabs.val, t.columnsByStory.val, t.slabsByStory.val, t.columnData.val, t.slabData.val);
    R.geometry = N(t.points.val, [], t.columns.val), D.geometry = A(t.points.val, t.slabs.val, t.columns.val), g.val = [
      ...g.rawVal
    ], r.deformOutputs.val = Y(e, s, o, l), r.analyzeOutputs.val = tt(e, s, l, r.deformOutputs.val), k.val = Math.max(...Array.from(r.analyzeOutputs.val.bendingXX.values()).flat()), H.val = nt({
      f_mk: 24
    }, 20, 3, 20, k.val, 0.8), r.nodes.val = e, r.elements.val = s, r.nodeInputs.val = o, r.elementInputs.val = l;
  });
  a.derive(() => {
    I.val === "Tables" && (L.val = q({
      tables: /* @__PURE__ */ new Map([
        [
          "columns",
          {
            text: "Columns",
            fields: [
              {
                field: "A",
                text: "x-Coordinate"
              },
              {
                field: "B",
                text: "y-Coordinate"
              },
              {
                field: "C",
                text: "z-Coordinate"
              }
            ],
            data: p
          }
        ],
        [
          "slabs",
          {
            text: "Slabs",
            fields: [
              {
                field: "A",
                text: "x-Coordinate"
              },
              {
                field: "B",
                text: "y-Coordinate"
              },
              {
                field: "C",
                text: "z-Coordinate"
              }
            ],
            data: m
          }
        ]
      ])
    })), I.val === "Report" && (L.val = W({
      template: dt,
      data: {
        designMomentInput: k,
        designOutputs: H
      }
    }));
  });
  document.body.append(J({
    objects3D: g,
    solids: mt,
    mesh: r,
    drawingObj: {
      points: f,
      polylines: S,
      gridTarget: O
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true,
      solids: false,
      shellResults: "displacementZ"
    }
  }), lt(), ot({
    onToolbarClick: ht,
    onClearPoints: bt
  }), Z({
    clickedButton: I,
    buttons: [
      "Tables",
      "Report"
    ],
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }), Q({
    dialogBody: L
  }));
});
