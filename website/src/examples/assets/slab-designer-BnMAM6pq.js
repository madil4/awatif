import { c as B, v as t, g as D } from "./styles-Bn9nRx26.js";
import { g as k } from "./getToolbar-bmYpFuWf.js";
import { g as T, a as L, b as O, c as x, d as E, __tla as __tla_0 } from "./getSolids-Cv8Br19D.js";
import { __tla as __tla_1 } from "./getMesh-BFRjMVyf.js";
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
    return n.id = "drawing-toolbar", new B({
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
    columnData: t.state(/* @__PURE__ */ new Map()),
    slabData: t.state(/* @__PURE__ */ new Map())
  }, S = T(), C = L(), y = t.state([
    C
  ]), j = t.state([
    S
  ]), c = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({}),
    elementInputs: t.state({})
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
  ], R = [
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
  ], A = [
    [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    []
  ], p = t.state([]), M = t.state([]), l = t.state(R), m = t.state(A), d = t.state(G), u = t.state([]), I = t.state({
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
  let h = "1st-floor";
  function K(a) {
    h = a, I.val = {
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
    }, d.val = a === "1st-floor" ? p.val : l.val, u.val = a === "1st-floor" ? M.val : m.val;
  }
  t.derive(() => {
    h == "1st-floor" && (p.val = d.val, M.val = u.val), h == "2nd-floor" && (l.val = d.val, m.val = u.val);
  });
  t.derive(() => {
    const a = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), r = [], g = [], P = [], b = [];
    if (l.val.length > 0) for (let o = 0; o < l.val.length; o++) P.push([
      l.val[o][0],
      l.val[o][1],
      v
    ]), r.push([
      l.val[o][0],
      l.val[o][1],
      v
    ]);
    n.set(0, Array.from(m.rawVal.keys()));
    const w = 1;
    e.set(0, {
      analysisInput: {
        areaLoad: w,
        isOpening: false,
        thickness: 1,
        material: {
          elasticity: 100,
          poissonsRatio: 0.3
        }
      }
    }), m.rawVal.forEach((o, i) => {
      e.set(i, {
        analysisInput: {
          areaLoad: w,
          isOpening: false,
          thickness: 1,
          material: {
            elasticity: 100,
            poissonsRatio: 0.3
          }
        }
      });
    });
    const f = [];
    if (p.val.length > 0) {
      for (let o = 0; o < p.val.length; o++) {
        const i = p.val[o];
        b.push([
          [
            i[0],
            i[1],
            i[2] + v
          ]
        ]);
      }
      for (let o = 0; o < b.length; o++) {
        const i = r.length;
        r.push(...b[o]), g.push(i), f.push(g.length - 1);
      }
    }
    a.set(0, f), s.points.val = r, s.columns.val = g, s.slabs.val = m.val, s.columnsByStory.val = a, s.slabsByStory.val = n, s.slabData.val = e;
  });
  t.derive(() => {
    const { nodes: a, elements: n, nodeInputs: e, elementInputs: r } = O(s.points.val, s.stories.val, s.columns.val, s.slabs.val, s.columnsByStory.val, s.slabsByStory.val, s.columnData.val, s.slabData.val);
    c.nodes.val = a, c.elements.val = n, c.nodeInputs.val = e, c.elementInputs.val = r, C.geometry = x(s.points.val, s.slabs.val, s.columns.val), S.geometry = E(s.points.val, s.slabs.val, s.columns.val), y.val = [
      ...y.rawVal
    ];
  });
  document.body.append(D({
    objects3D: y,
    solids: j,
    mesh: c,
    drawingObj: {
      points: d,
      polylines: u,
      gridTarget: I
    },
    settingsObj: {
      loads: false
    }
  }), V(), H({
    onToolbarClick: K
  }), k({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
