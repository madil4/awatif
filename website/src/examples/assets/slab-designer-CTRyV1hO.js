import { d as I, v as t, g as T, a as D } from "./styles-BHEEcEe8.js";
import { g as L, a as k, b as O, c as x, d as E, __tla as __tla_0 } from "./getSolids-Dv3yUbFZ.js";
import { __tla as __tla_1 } from "./getMesh-HOyv1-MH.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
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
  })()
]).then(async () => {
  function H({ onToolbarClick: a }) {
    const n = document.createElement("div");
    return n.id = "drawing-toolbar", new I({
      name: "toolbar",
      box: n,
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
        }
      ],
      onClick(e) {
        a(e.target);
      }
    }), n;
  }
  function V() {
    const a = document.createElement("div"), n = navigator.userAgent.includes("Macintosh");
    return a.className = "snap-tip", a.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${n ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, a.classList.add("show"), document.addEventListener("keydown", (e) => {
      (e.ctrlKey || e.metaKey) && a.classList.remove("show");
    }), a;
  }
  const s = {
    points: t.state([]),
    stories: t.state([
      0
    ]),
    columns: t.state([]),
    slabs: t.state([]),
    columnsByStory: t.state(/* @__PURE__ */ new Map()),
    slabsByStory: t.state(/* @__PURE__ */ new Map()),
    slabData: t.state(/* @__PURE__ */ new Map())
  }, S = L(), C = k(), y = t.state([
    C
  ]), j = t.state([
    S
  ]), d = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({})
  }, G = [
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
  ], A = [
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
    ]
  ], K = [
    [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    []
  ], r = t.state([]), M = t.state([]), l = t.state(A), c = t.state(K), m = t.state(G), u = t.state([]), P = t.state({
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
  }), v = 4;
  let w = "1st-floor";
  function _(a) {
    w = a, P.val = {
      position: [
        10,
        10,
        a == "1st-floor" ? 0 : v
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, m.val = a === "1st-floor" ? r.val : l.val, u.val = a === "1st-floor" ? M.val : c.val;
  }
  t.derive(() => {
    w == "1st-floor" && (r.val = m.val, M.val = u.val), w == "2nd-floor" && (l.val = m.val, c.val = u.val);
  });
  t.derive(() => {
    const a = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), p = [], b = [], B = [], g = [];
    if (l.val.length > 0) for (let o = 0; o < l.val.length; o++) B.push([
      l.val[o][0],
      l.val[o][1],
      v
    ]), p.push([
      l.val[o][0],
      l.val[o][1],
      v
    ]);
    n.set(0, Array.from(c.rawVal.keys()));
    const h = 1;
    e.set(0, {
      analysisInput: {
        areaLoad: h,
        isOpening: false
      }
    }), c.rawVal.forEach((o, i) => {
      e.set(i, {
        analysisInput: {
          areaLoad: h,
          isOpening: false
        }
      });
    });
    const f = [];
    if (r.val.length > 0) {
      for (let o = 0; o < r.val.length; o++) {
        const i = r.val[o];
        g.push([
          [
            i[0],
            i[1],
            i[2] + v
          ]
        ]);
      }
      for (let o = 0; o < g.length; o++) {
        const i = p.length;
        p.push(...g[o]), b.push(i), f.push(b.length - 1);
      }
    }
    a.set(0, f), s.points.val = p, s.columns.val = b, s.slabs.val = c.val, s.columnsByStory.val = a, s.slabsByStory.val = n, s.slabData.val = e;
  });
  t.derive(() => {
    const { nodes: a, elements: n, nodeInputs: e } = O(s.points.val, s.stories.val, s.columns.val, s.slabs.val, s.columnsByStory.val, s.slabsByStory.val, s.slabData.val);
    d.nodes.val = a, d.elements.val = n, d.nodeInputs.val = e, C.geometry = x(s.points.val, s.slabs.val, s.columns.val), S.geometry = E(s.points.val, s.slabs.val, s.columns.val), y.val = [
      ...y.rawVal
    ];
  });
  document.body.append(T({
    objects3D: y,
    solids: j,
    mesh: d,
    drawingObj: {
      points: m,
      polylines: u,
      gridTarget: P
    },
    settingsObj: {
      loads: false
    }
  }), V(), H({
    onToolbarClick: _
  }), D({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
