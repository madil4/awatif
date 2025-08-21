import { d as D, v as a, g as O, a as k } from "./styles-Ds8R4iPS.js";
import { d as T, a as L, __tla as __tla_0 } from "./deformCpp-BprT8Kg9.js";
import { g as x, a as E, b as R, c as C, d as I, __tla as __tla_1 } from "./getSolids-DZKZg9hQ.js";
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
  function V({ onToolbarClick: s, onClearPoints: i }) {
    const l = document.createElement("div");
    return l.id = "drawing-toolbar", new D({
      name: "toolbar",
      box: l,
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
      onClick(o) {
        o.target === "clear-points" ? i() : s(o.target);
      }
    }), l;
  }
  function z() {
    const s = document.createElement("div"), i = navigator.userAgent.includes("Macintosh");
    return s.className = "snap-tip", s.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${i ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, s.classList.add("show"), document.addEventListener("keydown", (l) => {
      (l.ctrlKey || l.metaKey) && s.classList.remove("show");
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
  ]), H = a.state([
    w
  ]), n = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({}),
    analyzeOutputs: a.state({})
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
  ], p = a.state([]), r = a.state(G), v = a.state(A), d = a.state(j), b = a.state([]), P = a.state({
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
    }, d.val = s === "1st-floor" ? p.val : r.val, b.val = s === "1st-floor" ? [] : v.val;
  }
  function _() {
    y === "1st-floor" ? p.val = [] : (r.val = [], v.val = []), d.val = [], b.val = [], t.points.val = [], t.columns.val = [], t.slabs.val = [], t.columnsByStory.val = /* @__PURE__ */ new Map(), t.slabsByStory.val = /* @__PURE__ */ new Map(), t.columnData.val = /* @__PURE__ */ new Map(), t.slabData.val = /* @__PURE__ */ new Map(), n.nodes.val = [], n.elements.val = [], n.nodeInputs.val = {}, h.geometry = C(t.points.val, t.slabs.val, t.columns.val), w.geometry = I(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ];
  }
  a.derive(() => {
    y == "1st-floor" && (p.val = d.val), y == "2nd-floor" && (r.val = d.val, v.val = b.val);
  });
  a.derive(() => {
    const s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = [], g = [], B = [], f = [];
    if (o.length, r.val.length > 0) for (let e = 0; e < r.val.length; e++) B.push([
      r.val[e][0],
      r.val[e][1],
      u
    ]), o.push([
      r.val[e][0],
      r.val[e][1],
      u
    ]);
    i.set(0, Array.from(v.rawVal.keys()));
    const S = -1;
    l.set(0, {
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
      l.set(c, {
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
        const c = o.length;
        o.push(...f[e]), g.push(c), M.push(g.length - 1);
      }
    }
    s.set(0, M), t.points.val = o, t.columns.val = g, t.slabs.val = v.val, t.columnsByStory.val = s, t.slabsByStory.val = i, t.slabData.val = l;
  });
  a.derive(() => {
    const { nodes: s, elements: i, nodeInputs: l, elementInputs: o } = R(t.points.val, t.stories.val, t.columns.val, t.slabs.val, t.columnsByStory.val, t.slabsByStory.val, t.columnData.val, t.slabData.val);
    n.deformOutputs.val = T(s, i, l, o), n.analyzeOutputs.val = L(s, i, o, n.deformOutputs.val), h.geometry = C(t.points.val, [], t.columns.val), w.geometry = I(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ], n.nodes.val = s, n.elements.val = i, n.nodeInputs.val = l, n.elementInputs.val = o;
  });
  document.body.append(O({
    objects3D: m,
    solids: H,
    mesh: n,
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
  }), z(), V({
    onToolbarClick: K,
    onClearPoints: _
  }), k({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
