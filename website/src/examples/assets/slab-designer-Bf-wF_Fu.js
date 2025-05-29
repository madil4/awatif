import { c as P, v as t, g as D } from "./styles-CcZBryOO.js";
import { g as k } from "./getToolbar-BsSk1QiP.js";
import { d as B, __tla as __tla_0 } from "./deformCpp-wF9UoRJI.js";
import { g as T, a as L, b as O, d as x, __tla as __tla_1 } from "./getSolids-DrUSOh1U.js";
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
  function E({ onToolbarClick: s }) {
    const e = document.createElement("div");
    return e.id = "drawing-toolbar", new P({
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
        }
      ],
      onClick(n) {
        s(n.target);
      }
    }), e;
  }
  function H() {
    const s = document.createElement("div"), e = navigator.userAgent.includes("Macintosh");
    return s.className = "snap-tip", s.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${e ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, s.classList.add("show"), document.addEventListener("keydown", (n) => {
      (n.ctrlKey || n.metaKey) && s.classList.remove("show");
    }), s;
  }
  const a = {
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
  }, S = T(), V = L(), y = t.state([
    V
  ]), j = t.state([
    S
  ]), c = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({}),
    elementInputs: t.state({}),
    deformOutputs: t.state({})
  }, R = [
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
  ], G = [
    [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    []
  ], p = t.state([]), C = t.state([]), l = t.state(A), m = t.state(G), v = t.state(R), u = t.state([]), M = t.state({
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
  }), d = 4;
  let f = "1st-floor";
  function K(s) {
    f = s, M.val = {
      position: [
        10,
        10,
        s == "1st-floor" ? 0 : d
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, v.val = s === "1st-floor" ? p.val : l.val, u.val = s === "1st-floor" ? C.val : m.val;
  }
  t.derive(() => {
    f == "1st-floor" && (p.val = v.val, C.val = u.val), f == "2nd-floor" && (l.val = v.val, m.val = u.val);
  });
  t.derive(() => {
    const s = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = [], b = [], I = [], g = [];
    if (l.val.length > 0) for (let o = 0; o < l.val.length; o++) I.push([
      l.val[o][0],
      l.val[o][1],
      d
    ]), i.push([
      l.val[o][0],
      l.val[o][1],
      d
    ]);
    e.set(0, Array.from(m.rawVal.keys()));
    const h = 10;
    n.set(0, {
      analysisInput: {
        areaLoad: h,
        isOpening: false,
        thickness: 1,
        material: {
          elasticity: 100,
          poissonsRatio: 0.3
        }
      }
    }), m.rawVal.forEach((o, r) => {
      n.set(r, {
        analysisInput: {
          areaLoad: h,
          isOpening: false,
          thickness: 1,
          material: {
            elasticity: 100,
            poissonsRatio: 0.3
          }
        }
      });
    });
    const w = [];
    if (p.val.length > 0) {
      for (let o = 0; o < p.val.length; o++) {
        const r = p.val[o];
        g.push([
          [
            r[0],
            r[1],
            r[2] + d
          ]
        ]);
      }
      for (let o = 0; o < g.length; o++) {
        const r = i.length;
        i.push(...g[o]), b.push(r), w.push(b.length - 1);
      }
    }
    s.set(0, w), a.points.val = i, a.columns.val = b, a.slabs.val = m.val, a.columnsByStory.val = s, a.slabsByStory.val = e, a.slabData.val = n;
  });
  t.derive(() => {
    const { nodes: s, elements: e, nodeInputs: n, elementInputs: i } = O(a.points.val, a.stories.val, a.columns.val, a.slabs.val, a.columnsByStory.val, a.slabsByStory.val, a.columnData.val, a.slabData.val);
    c.deformOutputs.val = B(s, e, n, i), S.geometry = x(a.points.val, a.slabs.val, a.columns.val), y.val = [
      ...y.rawVal
    ], c.nodes.val = s, c.elements.val = e, c.nodeInputs.val = n, c.elementInputs.val = i;
  });
  document.body.append(D({
    objects3D: y,
    solids: j,
    mesh: c,
    drawingObj: {
      points: v,
      polylines: u,
      gridTarget: M
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true
    }
  }), H(), E({
    onToolbarClick: K
  }), k({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
