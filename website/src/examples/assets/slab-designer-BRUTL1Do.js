import { d as k, v as a, g as T, a as L } from "./styles-DC0SXaq4.js";
import { d as O, __tla as __tla_0 } from "./deformCpp-CS-wCYO-.js";
import { g as x, a as E, b as V, c as P, d as I, __tla as __tla_1 } from "./getSolids-Dzdph_BH.js";
import { __tla as __tla_2 } from "./getMesh-BFRjMVyf.js";
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  function H({ onToolbarClick: s, onClearPoints: n }) {
    const e = document.createElement("div");
    return e.id = "drawing-toolbar", new k({
      name: "toolbar",
      box: e,
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
        l.target === "clear-points" ? n() : s(l.target);
      }
    }), e;
  }
  function R() {
    const s = document.createElement("div"), n = navigator.userAgent.includes("Macintosh");
    return s.className = "snap-tip", s.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${n ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, s.classList.add("show"), document.addEventListener("keydown", (e) => {
      (e.ctrlKey || e.metaKey) && s.classList.remove("show");
    }), s;
  }
  const t = {
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
  }, w = x(), h = E(), m = a.state([
    h
  ]), j = a.state([
    w
  ]), r = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({})
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
  ], p = a.state([]), S = a.state([]), i = a.state(A), v = a.state(K), d = a.state(G), u = a.state([]), B = a.state({
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
  }), y = 4;
  let b = "1st-floor";
  function _(s) {
    b = s, B.val = {
      position: [
        10,
        10,
        s == "1st-floor" ? 0 : y
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, d.val = s === "1st-floor" ? p.val : i.val, u.val = s === "1st-floor" ? S.val : v.val;
  }
  function z() {
    b === "1st-floor" ? (p.val = [], S.val = []) : (i.val = [], v.val = []), d.val = [], u.val = [], t.points.val = [], t.columns.val = [], t.slabs.val = [], t.columnsByStory.val = /* @__PURE__ */ new Map(), t.slabsByStory.val = /* @__PURE__ */ new Map(), t.columnData.val = /* @__PURE__ */ new Map(), t.slabData.val = /* @__PURE__ */ new Map(), r.nodes.val = [], r.elements.val = [], r.nodeInputs.val = {}, h.geometry = P(t.points.val, t.slabs.val, t.columns.val), w.geometry = I(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ];
  }
  a.derive(() => {
    b == "1st-floor" && (p.val = d.val, S.val = u.val), b == "2nd-floor" && (i.val = d.val, v.val = u.val);
  });
  a.derive(() => {
    const s = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), l = [], g = [], D = [], f = [];
    if (l.length, i.val.length > 0) for (let o = 0; o < i.val.length; o++) D.push([
      i.val[o][0],
      i.val[o][1],
      y
    ]), l.push([
      i.val[o][0],
      i.val[o][1],
      y
    ]);
    n.set(0, Array.from(v.rawVal.keys()));
    const M = -1;
    e.set(0, {
      analysisInput: {
        areaLoad: M,
        isOpening: false,
        thickness: 1,
        material: {
          elasticity: 300,
          poissonsRatio: 0.3
        }
      }
    }), v.rawVal.forEach((o, c) => {
      e.set(c, {
        analysisInput: {
          areaLoad: M,
          isOpening: false,
          thickness: 1,
          material: {
            elasticity: 300,
            poissonsRatio: 0.3
          }
        }
      });
    });
    const C = [];
    if (p.val.length > 0) {
      for (let o = 0; o < p.val.length; o++) {
        const c = p.val[o];
        f.push([
          [
            c[0],
            c[1],
            c[2] + y
          ]
        ]);
      }
      for (let o = 0; o < f.length; o++) {
        const c = l.length;
        l.push(...f[o]), g.push(c), C.push(g.length - 1);
      }
    }
    s.set(0, C), t.points.val = l, t.columns.val = g, t.slabs.val = v.val, t.columnsByStory.val = s, t.slabsByStory.val = n, t.slabData.val = e;
  });
  a.derive(() => {
    const { nodes: s, elements: n, nodeInputs: e, elementInputs: l } = V(t.points.val, t.stories.val, t.columns.val, t.slabs.val, t.columnsByStory.val, t.slabsByStory.val, t.columnData.val, t.slabData.val);
    r.deformOutputs.val = O(s, n, e, l), h.geometry = P(t.points.val, [], t.columns.val), w.geometry = I(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ], r.nodes.val = s, r.elements.val = n, r.nodeInputs.val = e, r.elementInputs.val = l;
  });
  document.body.append(T({
    objects3D: m,
    solids: j,
    mesh: r,
    drawingObj: {
      points: d,
      polylines: u,
      gridTarget: B
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true,
      solids: false
    }
  }), R(), H({
    onToolbarClick: _,
    onClearPoints: z
  }), L({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
