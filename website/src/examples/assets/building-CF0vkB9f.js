import { f as q, B as W, c as J, F as K, M as Q, h as Z, S as D, P as tt, i as k, j as V, k as et, l as O, v as d, g as st, a as nt } from "./styles-C_4VGeCN.js";
import { g as ot } from "./getParameters-DLMS8EAe.js";
import { g as at, __tla as __tla_0 } from "./getMesh-Bm83U438.js";
import { a as z, s as F, n as lt, c as rt, d as ct, m as it, __tla as __tla_1 } from "./pureFunctionsAny.generated-D4_2SIRD.js";
import { m as C } from "./BufferGeometryUtils-zbM7fMO-.js";
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
  function mt(t, r, a, g, v, y, p) {
    let n = [], e = [];
    const f = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    };
    for (let l in r) {
      const b = r[l], i = t[b][2];
      y.get(Number(l)).forEach((c) => {
        var _a;
        const u = g[c].map((S) => t[S]), h = u.map((S, w) => w), E = v.get(Number(l)).map((S) => t[a[S]]), s = [
          ...u,
          ...E
        ], { nodes: x, elements: B } = at({
          points: s,
          polygon: h,
          maxMeshSize: 1
        }), T = n.length, A = e.length, I = B.map((S) => S.map((w) => w + T)), _ = x.map((S, w) => w + T);
        e.map((S, w) => w + A), n = [
          ...n,
          ...ut(x, i)
        ], e = [
          ...e,
          ...I
        ];
        const H = ((_a = p.get(c).analysisInput) == null ? void 0 : _a.areaLoad) ?? 0;
        f.loads = pt(n, I, f.loads, H, _);
      });
    }
    for (let l = 0; l < r.length; l++) {
      const b = r[l], i = t[b][2], M = l > 0 ? t[r[l - 1]][2] : 0;
      v.get(l).forEach((o) => {
        const u = t[a[o]], h = [
          u[0],
          u[1],
          i
        ], E = [
          u[0],
          u[1],
          M
        ], { nodes: s, elements: x } = ht(h, E, n.length);
        n = [
          ...n,
          ...s
        ], e = [
          ...e,
          ...x
        ];
        const B = n.length, T = e.length;
        s.map((A, I) => I + B), x.map((A, I) => I + T);
      });
    }
    return {
      nodes: n,
      elements: e,
      nodeInputs: f
    };
  }
  function ut(t, r) {
    return t.map((a) => [
      a[0],
      a[1],
      r
    ]);
  }
  function ht(t, r, a, g = 3) {
    let v = [
      [
        ...t
      ]
    ], y = [];
    const p = F(r, t), n = ct(p, g);
    for (let e = 0; e < g; e++) v.push(z(t, it(n, e + 1))), y.push([
      a + e,
      a + e + 1
    ]);
    return {
      nodes: v,
      elements: y
    };
  }
  function pt(t, r, a, g, v) {
    return r.forEach((p) => {
      const [n, e, f] = p.map((i) => t[i]), l = y(n, e, f), b = g * l / 3;
      p.forEach((i) => {
        if (v.includes(i)) {
          const M = [
            0,
            0,
            -b,
            0,
            0,
            0
          ], c = a.get(i) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          a.set(i, z(c, M));
        }
      });
    }), a;
    function y(p, n, e) {
      const f = F(n, p), l = F(e, p);
      return lt(rt(f, l)) / 2;
    }
  }
  function dt() {
    const t = new q(new W(), new J());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  }
  function gt(t, r, a) {
    const g = new W(), v = 4, y = a.flatMap((n) => {
      const e = t[n], f = [
        e[0],
        e[1],
        e[2] - v
      ];
      return [
        ...e,
        ...f
      ];
    }), p = r.map((n) => ft(n).map((e) => [
      ...t[e[0]],
      ...t[e[1]]
    ]).flat()).flat();
    return g.setAttribute("position", new K([
      ...y,
      ...p
    ], 3)), g;
  }
  function ft(t) {
    if (t.length === 2) return [
      t
    ];
    const r = [];
    for (let a = 0; a < t.length; a++) r.push([
      t[a],
      t[(a + 1) % t.length]
    ]);
    return r;
  }
  function bt() {
    return new Q(new W(), new Z({
      color: 16770764
    }));
  }
  function vt(t, r, a) {
    const y = n(t, r), p = e(t, a);
    return C([
      y,
      p
    ]);
    function n(f, l, b = 0.3) {
      const i = [];
      for (let c = 0; c < l.length; c++) {
        const o = [];
        for (let s = 0; s < l[c].length; s++) {
          const x = l[c][s];
          o.push(f[x]);
        }
        const u = M(o, 0.3 / 2), h = new D();
        new tt();
        for (let s = 0; s < u.length; s++) s == 0 ? h.moveTo(u[0][0], u[0][1]) : h.lineTo(u[s][0], u[s][1]);
        const E = new k(h, {
          depth: b,
          bevelEnabled: false
        });
        E.translate(0, 0, u[0][2] - b / 2), i.push(E);
      }
      return C(i);
      function M(c, o = 0) {
        const u = [], h = [];
        for (let s = 0; s < c.length; s++) h.push(new V(c[s][0], c[s][1]));
        let E = new et(new Float32Array([
          o,
          0,
          0
        ]), 3);
        for (let s = 0; s < h.length - 1; s++) {
          let x = new V().subVectors(h[s - 1 < 0 ? h.length - 1 : s - 1], h[s]), B = new V().subVectors(h[s + 1 == h.length ? 0 : s + 1], h[s]), I = (B.angle() - x.angle()) * 0.5, _ = B.angle() + Math.PI * 0.5, H = Math.tan(I - Math.PI * 0.5), S = new O().set(1, 0, 0, 0, -H, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), w = _, Y = new O().set(Math.cos(w), -Math.sin(w), 0, 0, Math.sin(w), Math.cos(w), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), $ = new O().set(1, 0, 0, h[s].x, 0, 1, 0, h[s].y, 0, 0, 1, 0, 0, 0, 0, 1), L = E.clone();
          L.needsUpdate = true, L.applyMatrix4(S), L.applyMatrix4(Y), L.applyMatrix4($), u.push([
            L.getX(0),
            L.getY(0),
            c[s][2]
          ]);
        }
        return u;
      }
    }
    function e(f, l) {
      const b = [], i = new D();
      i.lineTo(0 + 0.3, 0), i.lineTo(0 + 0.3, 0 + 0.3), i.lineTo(0, 0 + 0.3);
      for (let M = 0; M < l.length; M++) {
        const c = f[l[M]], o = new k(i, {
          depth: -4,
          bevelEnabled: false
        });
        o.translate(c[0] - 0.3 / 2, c[1] - 0.3 / 2, c[2]), b.push(o);
      }
      return C(b);
    }
  }
  const R = {
    stories: {
      value: d.state(2),
      min: 1,
      max: 5,
      step: 1
    }
  }, m = {
    points: d.state([]),
    stories: d.state([]),
    columns: d.state([]),
    slabs: d.state([]),
    columnsByStory: d.state(/* @__PURE__ */ new Map()),
    slabsByStory: d.state(/* @__PURE__ */ new Map()),
    slabData: d.state(/* @__PURE__ */ new Map())
  }, G = {
    nodes: d.state([]),
    elements: d.state([]),
    nodeInputs: d.state({})
  }, N = [
    [
      0,
      0,
      4
    ],
    [
      0,
      10,
      4
    ],
    [
      18,
      10,
      4
    ],
    [
      18,
      0,
      4
    ],
    [
      0,
      0,
      4
    ]
  ], P = [
    [
      0,
      0,
      4
    ],
    [
      0,
      10,
      4
    ],
    [
      18,
      10,
      4
    ],
    [
      18,
      0,
      4
    ],
    [
      6,
      0,
      4
    ],
    [
      6,
      10,
      4
    ]
  ], U = bt(), X = dt(), j = d.state([
    X
  ]), yt = d.state([
    U
  ]);
  d.derive(() => {
    const t = [], r = [], a = [], g = [], v = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
    for (let n = 0; n < R.stories.value.val; n++) {
      const e = [], l = 4 * n;
      for (let o = 0; o < N.length; o++) e.push([
        N[o][0],
        N[o][1],
        N[o][2] + l
      ]);
      const b = [];
      let i = t.length;
      for (let o = 0; o < e.length; o++) t.push(e[o]), b.push(o + i);
      a.push(b), r.push(i), y.set(n, [
        n
      ]), p.set(n, {
        analysisInput: {
          areaLoad: 1,
          isOpening: false
        }
      });
      const c = [];
      for (let o = 0; o < P.length; o++) {
        const u = t.length;
        t.push([
          P[o][0],
          P[o][1],
          P[o][2] + l
        ]), g.push(u), c.push(g.length - 1);
      }
      v.set(n, c);
    }
    m.points.val = t, m.stories.val = r, m.slabs.val = a, m.columns.val = g, m.columnsByStory.val = v, m.slabsByStory.val = y, m.slabData.val = p;
  });
  d.derive(() => {
    const { nodes: t, elements: r, nodeInputs: a } = mt(m.points.val, m.stories.val, m.columns.val, m.slabs.val, m.columnsByStory.val, m.slabsByStory.val, m.slabData.val);
    G.nodes.val = t, G.elements.val = r, G.nodeInputs.val = a, X.geometry = gt(m.points.val, m.slabs.val, m.columns.val), U.geometry = vt(m.points.val, m.slabs.val, m.columns.val), j.val = [
      ...j.rawVal
    ];
  });
  document.body.append(ot(R), st({
    objects3D: j,
    solids: yt,
    mesh: G,
    settingsObj: {
      nodes: false,
      loads: false
    }
  }), nt({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/building/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
