import { v as o, g as pe, a as re } from "./styles-CHgmIz-C.js";
import { d as ue, a as de, __tla as __tla_0 } from "./deformCpp-BprT8Kg9.js";
import { g as ce } from "./getParameters-CL7Q-jKZ.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function V(l, t, u, f, g, v, m, c = 0) {
    const n = Math.round(l / t);
    let d = [], h = [], C = [], T = [], M = [];
    for (let e = 0; e < n + 1; e++) {
      const I = e * t, p = (m - v) / l, s = v + p * I;
      d.push([
        c + I,
        0,
        s
      ]);
    }
    for (let e = 0; e < n + 1; e++) {
      const I = e * t, p = (g - f) / l, s = f + p * I, y = (m - v) / l, S = v + y * I;
      d.push([
        c + I,
        0,
        S + s
      ]), C.push(d.length - 1);
    }
    if (u === 1) for (let e = 0; e < n; e++) h.push([
      e,
      e + 1
    ], [
      n + 1 + e,
      n + 1 + e + 1
    ], [
      e,
      n + 1 + e
    ], [
      e,
      n + 1 + e + 1
    ]), T.push(h.length - 3, h.length - 4), M.push(h.length - 1, h.length - 2);
    if (u === 2) for (let e = 0; e < n; e++) h.push([
      e,
      e + 1
    ], [
      n + 1 + e,
      n + 1 + e + 1
    ], [
      e,
      n + 1 + e
    ], [
      e + 1,
      n + 1 + e
    ]), T.push(h.length - 3, h.length - 4), M.push(h.length - 1, h.length - 2);
    if (u === 3) for (let e = 0; e < n; e++) h.push([
      e,
      e + 1
    ], [
      n + 1 + e,
      n + 1 + e + 1
    ], [
      e,
      n + 1 + e
    ], [
      e,
      n + 1 + e + 1
    ], [
      e + 1,
      n + 1 + e
    ]), T.push(h.length - 4, h.length - 5), M.push(h.length - 1, h.length - 2, h.length - 3);
    return h.push([
      n,
      2 * n + 1
    ]), M.push(h.length - 1), {
      nodes: d,
      elements: h,
      topNodesIndices: C,
      chordsIndices: T,
      websIndices: M
    };
  }
  const r = {
    span: {
      value: o.state(20),
      min: 1,
      max: 20,
      label: "Span (m)",
      folder: "Geometry"
    },
    spacing: {
      value: o.state(2.5),
      min: 1,
      max: 5,
      label: "Spacing (m)",
      folder: "Geometry"
    },
    webType: {
      value: o.state(1),
      min: 1,
      max: 3,
      step: 1,
      label: "Web type",
      folder: "Geometry"
    },
    trimType: {
      value: o.state(1),
      min: 1,
      max: 3,
      step: 1,
      label: "Trim type",
      folder: "Geometry"
    },
    leftHeight: {
      value: o.state(2.5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Left height (m)",
      folder: "Geometry"
    },
    midHeight: {
      value: o.state(2.5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Mid height (m)",
      folder: "Geometry"
    },
    rightHeight: {
      value: o.state(2.5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Right height (m)",
      folder: "Geometry"
    },
    leftOffset: {
      value: o.state(0),
      min: 0,
      max: 10,
      step: 0.1,
      label: "Left offset (m)",
      folder: "Geometry"
    },
    midOffset: {
      value: o.state(5),
      min: 0,
      max: 10,
      step: 0.1,
      label: "Mid offset (m)",
      folder: "Geometry"
    },
    rightOffset: {
      value: o.state(0),
      min: 0,
      max: 10,
      step: 0.1,
      label: "Right offset (m)",
      folder: "Geometry"
    },
    supportType: {
      value: o.state(1),
      min: 1,
      max: 2,
      step: 1,
      label: "Support type",
      folder: "Supports"
    },
    uniformLoad: {
      value: o.state(300),
      min: 0,
      max: 1e3,
      step: 1,
      label: "Uniform load (KN/m)",
      folder: "Loads"
    },
    chordsArea: {
      value: o.state(50),
      min: 1,
      max: 100,
      step: 1,
      label: "Chords area (cm2)",
      folder: "Sections & Materials"
    },
    chordsElasticity: {
      value: o.state(10),
      min: 1,
      max: 250,
      step: 1,
      label: "Chords elasticity (gpa)",
      folder: "Sections & Materials"
    },
    websArea: {
      value: o.state(50),
      min: 1,
      max: 100,
      step: 1,
      label: "Webs area (cm2)",
      folder: "Sections & Materials"
    },
    websElasticity: {
      value: o.state(10),
      min: 1,
      max: 250,
      step: 1,
      label: "Webs elasticity (gpa)",
      folder: "Sections & Materials"
    }
  }, Y = o.state([]), Z = o.state([]), _ = o.state({}), $ = o.state({}), ee = o.state({}), te = o.state({});
  o.derive(() => {
    let l = r.span.value.val, t = r.spacing.value.val;
    const u = r.webType.value.val, f = r.trimType.value.val, g = r.leftHeight.value.val, v = r.midHeight.value.val, m = r.rightHeight.value.val, c = r.leftOffset.value.val, n = r.midOffset.value.val, d = r.rightOffset.value.val, h = r.supportType.value.val, C = r.uniformLoad.value.val, T = r.chordsArea.value.val * 1e-4, M = r.chordsElasticity.value.val * 1e6, e = r.websArea.value.val * 1e-4, I = r.websElasticity.value.val * 1e6;
    let p = [], s = [], y = [], S = [], b = [], w = [];
    if (t = l / Math.round(l / t), Math.abs(v - 0.5 * (g + m)) > 0.3 || Math.abs(n - 0.5 * (c + d)) > 0.3) {
      l = l / 2, t = l / Math.round(l / t);
      const a = Math.round((l - 2 * t) / t), i = f >= 2 && a >= 1, W = (g - v) / l, A = g - W * t, x = (c - n) / l, k = c - x * t, { nodes: O, elements: K, topNodesIndices: P, chordsIndices: le, websIndices: ne } = V(i ? l - t : l, t, u, i ? A : g, v, i ? k : c, n, i ? t : 0);
      p.push(...O), s.push(...K), S.push(...P), b.push(...le), w.push(...ne);
      const J = (v - m) / l, Q = (n - d) / l;
      let U = u;
      u === 1 && (U = 2), u === 2 && (U = 1);
      const { nodes: z, elements: ae, topNodesIndices: oe, chordsIndices: he, websIndices: ie } = V(i ? l - 2 * t : l - t, t, U, v - J * t, i ? m + J * t : m, n - Q * t, i ? d + Q * t : d, l + t);
      if (b.push(...q(he, s.length)), w.push(...q(ie, s.length)), s.push(...me(ae, p.length)), S.push(...q(oe, p.length)), p.push(...z), i) {
        p.push([
          0,
          0,
          f == 3 ? g + c : c
        ], [
          2 * l,
          0,
          f == 3 ? m + d : d
        ]), S.push(p.length - 2, p.length - 1);
        const H = (a + 1 + 1) * 2, X = (a + 1) * 2, R = H + X;
        s.push([
          0,
          R
        ], [
          a + 2,
          R
        ], [
          H + a,
          R + 1
        ], [
          H + X - 1,
          R + 1
        ]), b.push(s.length - 1, s.length - 2, s.length - 3, s.length - 4);
      }
      const D = Math.round(i ? (l - 1 * t) / t : l / t), G = D, E = (D + 1) * 2, N = (D + 1) * 2 - 1, L = N + D + 1;
      if (u === 1 && (s.push([
        G,
        E
      ], [
        N,
        L
      ], [
        N,
        E
      ]), b.push(s.length - 3, s.length - 2), w.push(s.length - 1)), u === 2 && (s.push([
        G,
        E
      ], [
        N,
        L
      ], [
        G,
        L
      ]), b.push(s.length - 3, s.length - 2), w.push(s.length - 1)), u === 3 && (s.push([
        G,
        E
      ], [
        N,
        L
      ], [
        G,
        L
      ], [
        N,
        E
      ]), b.push(s.length - 4, s.length - 3), w.push(s.length - 2, s.length - 1)), i) {
        const H = O.length + z.length;
        y.push(H, H + 1);
      } else h === 1 ? y.push(0, O.length + z.length / 2 - 1) : y.push(O.length / 2, O.length + z.length - 1);
    } else {
      const a = Math.round((l - 2 * t) / t), i = f >= 2 && a >= 1, W = (g - m) / l, A = (c - d) / l, { nodes: x, elements: k, topNodesIndices: O, chordsIndices: K, websIndices: P } = V(i ? l - 2 * t : l, t, u, i ? g - W * t : g, i ? m + W * t : m, i ? c - A * t : c, i ? d + A * t : d, i ? t : 0);
      p.push(...x), s.push(...k), S.push(...O), b.push(...K), w.push(...P), i && (p.push([
        0,
        0,
        f == 3 ? g + c : c
      ], [
        l,
        0,
        f == 3 ? m + d : d
      ]), S.push(p.length - 2, p.length - 1), s.push([
        0,
        (a + 1) * 2
      ], [
        a + 1,
        (a + 1) * 2
      ], [
        a,
        (a + 1) * 2 + 1
      ], [
        a * 2 + 1,
        (a + 1) * 2 + 1
      ]), b.push(s.length - 1, s.length - 2, s.length - 3, s.length - 4)), i ? y.push(x.length, x.length + 1) : h === 1 ? y.push(0, x.length / 2 - 1) : y.push(x.length / 2, x.length - 1);
    }
    const B = {
      supports: new Map(y.map((a) => [
        a,
        [
          true,
          true,
          true,
          true,
          true,
          true
        ]
      ])),
      loads: new Map(S.map((a) => [
        a,
        [
          0,
          0,
          -C * t,
          0,
          0,
          0
        ]
      ]))
    }, j = {
      elasticities: new Map([
        ...b.map((a) => [
          a,
          M
        ]),
        ...w.map((a) => [
          a,
          I
        ])
      ]),
      areas: new Map([
        ...b.map((a) => [
          a,
          T
        ]),
        ...w.map((a) => [
          a,
          e
        ])
      ])
    }, F = ue(p, s, B, j), se = de(p, s, j, F);
    Y.val = p, Z.val = s, _.val = B, $.val = j, ee.val = F, te.val = se;
  });
  document.body.append(ce(r), pe({
    mesh: {
      nodes: Y,
      elements: Z,
      nodeInputs: _,
      elementInputs: $,
      deformOutputs: ee,
      analyzeOutputs: te
    },
    settingsObj: {
      deformedShape: true,
      loads: false
    }
  }), re({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/advanced-truss/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
  function me(l, t) {
    return l.map(([u, f]) => [
      u + t,
      f + t
    ]);
  }
  function q(l, t) {
    return l.map((u) => u + t);
  }
});
