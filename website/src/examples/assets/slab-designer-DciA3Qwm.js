import { d as D, v as a, g as k, a as T } from "./styles-DC0SXaq4.js";
import { d as L, __tla as __tla_0 } from "./deformCpp-CS-wCYO-.js";
import { g as O, a as x, b as E, c as C, d as I, __tla as __tla_1 } from "./getSolids-DZNy58sj.js";
import { __tla as __tla_2 } from "./getMesh-DmUdekin.js";
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
  function R({ onToolbarClick: s, onClearPoints: n }) {
    const o = document.createElement("div");
    return o.id = "drawing-toolbar", new D({
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
        l.target === "clear-points" ? n() : s(l.target);
      }
    }), o;
  }
  function V() {
    const s = document.createElement("div"), n = navigator.userAgent.includes("Macintosh");
    return s.className = "snap-tip", s.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${n ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, s.classList.add("show"), document.addEventListener("keydown", (o) => {
      (o.ctrlKey || o.metaKey) && s.classList.remove("show");
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
  }, w = O(), h = x(), m = a.state([
    h
  ]), H = a.state([
    w
  ]), r = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({})
  }, j = [
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
  ], G = [
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
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    []
  ], p = a.state([]), i = a.state(G), v = a.state(A), d = a.state(j), b = a.state([]), P = a.state({
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
  }), u = 4;
  let y = "1st-floor";
  function K(s) {
    y = s, P.val = {
      position: [
        10,
        10,
        s == "1st-floor" ? 0 : u
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, d.val = s === "1st-floor" ? p.val : i.val, b.val = v.val;
  }
  function _() {
    y === "1st-floor" ? p.val = [] : (i.val = [], v.val = []), d.val = [], b.val = [], t.points.val = [], t.columns.val = [], t.slabs.val = [], t.columnsByStory.val = /* @__PURE__ */ new Map(), t.slabsByStory.val = /* @__PURE__ */ new Map(), t.columnData.val = /* @__PURE__ */ new Map(), t.slabData.val = /* @__PURE__ */ new Map(), r.nodes.val = [], r.elements.val = [], r.nodeInputs.val = {}, h.geometry = C(t.points.val, t.slabs.val, t.columns.val), w.geometry = I(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ];
  }
  a.derive(() => {
    y == "1st-floor" && (p.val = d.val), y == "2nd-floor" && (i.val = d.val, v.val = b.val);
  });
  a.derive(() => {
    const s = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = [], g = [], B = [], f = [];
    if (l.length, i.val.length > 0) for (let e = 0; e < i.val.length; e++) B.push([
      i.val[e][0],
      i.val[e][1],
      u
    ]), l.push([
      i.val[e][0],
      i.val[e][1],
      u
    ]);
    n.set(0, Array.from(v.rawVal.keys()));
    const S = -1;
    o.set(0, {
      analysisInput: {
        areaLoad: S,
        isOpening: false,
        thickness: 1,
        material: {
          elasticity: 300,
          poissonsRatio: 0.3
        }
      }
    }), v.rawVal.forEach((e, c) => {
      o.set(c, {
        analysisInput: {
          areaLoad: S,
          isOpening: false,
          thickness: 1,
          material: {
            elasticity: 300,
            poissonsRatio: 0.3
          }
        }
      });
    });
    const M = [];
    if (p.val.length > 0) {
      for (let e = 0; e < p.val.length; e++) {
        const c = p.val[e];
        f.push([
          [
            c[0],
            c[1],
            c[2] + u
          ]
        ]);
      }
      for (let e = 0; e < f.length; e++) {
        const c = l.length;
        l.push(...f[e]), g.push(c), M.push(g.length - 1);
      }
    }
    s.set(0, M), t.points.val = l, t.columns.val = g, t.slabs.val = v.val, t.columnsByStory.val = s, t.slabsByStory.val = n, t.slabData.val = o;
  });
  a.derive(() => {
    const { nodes: s, elements: n, nodeInputs: o, elementInputs: l } = E(t.points.val, t.stories.val, t.columns.val, t.slabs.val, t.columnsByStory.val, t.slabsByStory.val, t.columnData.val, t.slabData.val);
    r.deformOutputs.val = L(s, n, o, l), h.geometry = C(t.points.val, [], t.columns.val), w.geometry = I(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ], r.nodes.val = s, r.elements.val = n, r.nodeInputs.val = o, r.elementInputs.val = l;
  });
  document.body.append(k({
    objects3D: m,
    solids: H,
    mesh: r,
    drawingObj: {
      points: d,
      polylines: b,
      gridTarget: P
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true,
      solids: false,
      shellResults: "displacementZ"
    }
  }), V(), R({
    onToolbarClick: K,
    onClearPoints: _
  }), T({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
