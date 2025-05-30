import { v as a, g as pe } from "./styles-CcZBryOO.js";
import { a as re } from "./analyze-0pMPybQW.js";
import { d as ue, __tla as __tla_0 } from "./deformCpp-wF9UoRJI.js";
import { g as me } from "./getParameters-wBkc0XBG.js";
import { g as de } from "./getToolbar-BsSk1QiP.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function V(l, t, u, f, g, v, c, d = 0) {
    const n = Math.round(l / t);
    let m = [], i = [], C = [], T = [], M = [];
    for (let e = 0; e < n + 1; e++) {
      const I = e * t, p = (c - v) / l, s = v + p * I;
      m.push([
        d + I,
        0,
        s
      ]);
    }
    for (let e = 0; e < n + 1; e++) {
      const I = e * t, p = (g - f) / l, s = f + p * I, y = (c - v) / l, S = v + y * I;
      m.push([
        d + I,
        0,
        S + s
      ]), C.push(m.length - 1);
    }
    if (u === 1) for (let e = 0; e < n; e++) i.push([
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
    ]), T.push(i.length - 3, i.length - 4), M.push(i.length - 1, i.length - 2);
    if (u === 2) for (let e = 0; e < n; e++) i.push([
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
    ]), T.push(i.length - 3, i.length - 4), M.push(i.length - 1, i.length - 2);
    if (u === 3) for (let e = 0; e < n; e++) i.push([
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
    ]), T.push(i.length - 4, i.length - 5), M.push(i.length - 1, i.length - 2, i.length - 3);
    return i.push([
      n,
      2 * n + 1
    ]), M.push(i.length - 1), {
      nodes: m,
      elements: i,
      topNodesIndices: C,
      chordsIndices: T,
      websIndices: M
    };
  }
  const r = {
    span: {
      value: a.state(20),
      min: 1,
      max: 20,
      label: "Span (m)",
      folder: "Geometry"
    },
    spacing: {
      value: a.state(2.5),
      min: 1,
      max: 5,
      label: "Spacing (m)",
      folder: "Geometry"
    },
    webType: {
      value: a.state(1),
      min: 1,
      max: 3,
      step: 1,
      label: "Web type",
      folder: "Geometry"
    },
    trimType: {
      value: a.state(1),
      min: 1,
      max: 3,
      step: 1,
      label: "Trim type",
      folder: "Geometry"
    },
    leftHeight: {
      value: a.state(2.5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Left height (m)",
      folder: "Geometry"
    },
    midHeight: {
      value: a.state(2.5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Mid height (m)",
      folder: "Geometry"
    },
    rightHeight: {
      value: a.state(2.5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Right height (m)",
      folder: "Geometry"
    },
    leftOffset: {
      value: a.state(0),
      min: 0,
      max: 10,
      step: 0.1,
      label: "Left offset (m)",
      folder: "Geometry"
    },
    midOffset: {
      value: a.state(5),
      min: 0,
      max: 10,
      step: 0.1,
      label: "Mid offset (m)",
      folder: "Geometry"
    },
    rightOffset: {
      value: a.state(0),
      min: 0,
      max: 10,
      step: 0.1,
      label: "Right offset (m)",
      folder: "Geometry"
    },
    supportType: {
      value: a.state(1),
      min: 1,
      max: 2,
      step: 1,
      label: "Support type",
      folder: "Supports"
    },
    uniformLoad: {
      value: a.state(300),
      min: 0,
      max: 1e3,
      step: 1,
      label: "Uniform load (KN/m)",
      folder: "Loads"
    },
    chordsArea: {
      value: a.state(50),
      min: 1,
      max: 100,
      step: 1,
      label: "Chords area (cm2)",
      folder: "Sections & Materials"
    },
    chordsElasticity: {
      value: a.state(10),
      min: 1,
      max: 250,
      step: 1,
      label: "Chords elasticity (gpa)",
      folder: "Sections & Materials"
    },
    websArea: {
      value: a.state(50),
      min: 1,
      max: 100,
      step: 1,
      label: "Webs area (cm2)",
      folder: "Sections & Materials"
    },
    websElasticity: {
      value: a.state(10),
      min: 1,
      max: 250,
      step: 1,
      label: "Webs elasticity (gpa)",
      folder: "Sections & Materials"
    }
  }, Y = a.state([]), Z = a.state([]), _ = a.state({}), $ = a.state({}), ee = a.state({}), te = a.state({});
  a.derive(() => {
    let l = r.span.value.val, t = r.spacing.value.val;
    const u = r.webType.value.val, f = r.trimType.value.val, g = r.leftHeight.value.val, v = r.midHeight.value.val, c = r.rightHeight.value.val, d = r.leftOffset.value.val, n = r.midOffset.value.val, m = r.rightOffset.value.val, i = r.supportType.value.val, C = r.uniformLoad.value.val, T = r.chordsArea.value.val * 1e-4, M = r.chordsElasticity.value.val * 1e6, e = r.websArea.value.val * 1e-4, I = r.websElasticity.value.val * 1e6;
    let p = [], s = [], y = [], S = [], b = [], w = [];
    if (t = l / Math.round(l / t), Math.abs(v - 0.5 * (g + c)) > 0.3 || Math.abs(n - 0.5 * (d + m)) > 0.3) {
      l = l / 2, t = l / Math.round(l / t);
      const o = Math.round((l - 2 * t) / t), h = f >= 2 && o >= 1, W = (g - v) / l, A = g - W * t, x = (d - n) / l, k = d - x * t, { nodes: O, elements: K, topNodesIndices: P, chordsIndices: le, websIndices: ne } = V(h ? l - t : l, t, u, h ? A : g, v, h ? k : d, n, h ? t : 0);
      p.push(...O), s.push(...K), S.push(...P), b.push(...le), w.push(...ne);
      const J = (v - c) / l, Q = (n - m) / l;
      let U = u;
      u === 1 && (U = 2), u === 2 && (U = 1);
      const { nodes: z, elements: oe, topNodesIndices: ae, chordsIndices: ie, websIndices: he } = V(h ? l - 2 * t : l - t, t, U, v - J * t, h ? c + J * t : c, n - Q * t, h ? m + Q * t : m, l + t);
      if (b.push(...q(ie, s.length)), w.push(...q(he, s.length)), s.push(...ce(oe, p.length)), S.push(...q(ae, p.length)), p.push(...z), h) {
        p.push([
          0,
          0,
          f == 3 ? g + d : d
        ], [
          2 * l,
          0,
          f == 3 ? c + m : m
        ]), S.push(p.length - 2, p.length - 1);
        const H = (o + 1 + 1) * 2, X = (o + 1) * 2, R = H + X;
        s.push([
          0,
          R
        ], [
          o + 2,
          R
        ], [
          H + o,
          R + 1
        ], [
          H + X - 1,
          R + 1
        ]), b.push(s.length - 1, s.length - 2, s.length - 3, s.length - 4);
      }
      const D = Math.round(h ? (l - 1 * t) / t : l / t), G = D, E = (D + 1) * 2, N = (D + 1) * 2 - 1, L = N + D + 1;
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
      ]), b.push(s.length - 4, s.length - 3), w.push(s.length - 2, s.length - 1)), h) {
        const H = O.length + z.length;
        y.push(H, H + 1);
      } else i === 1 ? y.push(0, O.length + z.length / 2 - 1) : y.push(O.length / 2, O.length + z.length - 1);
    } else {
      const o = Math.round((l - 2 * t) / t), h = f >= 2 && o >= 1, W = (g - c) / l, A = (d - m) / l, { nodes: x, elements: k, topNodesIndices: O, chordsIndices: K, websIndices: P } = V(h ? l - 2 * t : l, t, u, h ? g - W * t : g, h ? c + W * t : c, h ? d - A * t : d, h ? m + A * t : m, h ? t : 0);
      p.push(...x), s.push(...k), S.push(...O), b.push(...K), w.push(...P), h && (p.push([
        0,
        0,
        f == 3 ? g + d : d
      ], [
        l,
        0,
        f == 3 ? c + m : m
      ]), S.push(p.length - 2, p.length - 1), s.push([
        0,
        (o + 1) * 2
      ], [
        o + 1,
        (o + 1) * 2
      ], [
        o,
        (o + 1) * 2 + 1
      ], [
        o * 2 + 1,
        (o + 1) * 2 + 1
      ]), b.push(s.length - 1, s.length - 2, s.length - 3, s.length - 4)), h ? y.push(x.length, x.length + 1) : i === 1 ? y.push(0, x.length / 2 - 1) : y.push(x.length / 2, x.length - 1);
    }
    const B = {
      supports: new Map(y.map((o) => [
        o,
        [
          true,
          true,
          true,
          true,
          true,
          true
        ]
      ])),
      loads: new Map(S.map((o) => [
        o,
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
        ...b.map((o) => [
          o,
          M
        ]),
        ...w.map((o) => [
          o,
          I
        ])
      ]),
      areas: new Map([
        ...b.map((o) => [
          o,
          T
        ]),
        ...w.map((o) => [
          o,
          e
        ])
      ])
    }, F = ue(p, s, B, j), se = re(p, s, j, F);
    Y.val = p, Z.val = s, _.val = B, $.val = j, ee.val = F, te.val = se;
  });
  document.body.append(me(r), pe({
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
  }), de({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/advanced-truss/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
  function ce(l, t) {
    return l.map(([u, f]) => [
      u + t,
      f + t
    ]);
  }
  function q(l, t) {
    return l.map((u) => u + t);
  }
});
