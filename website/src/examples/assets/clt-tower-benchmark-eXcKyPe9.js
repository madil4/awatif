import { v as t, g as E } from "./styles-I_-DKBYJ.js";
import { g as V } from "./getParameters-B55TXCbA.js";
import { g as k } from "./getToolbar-C9bIbtqJ.js";
import { g as B, a as D, b as _, c as R, __tla as __tla_0 } from "./getMesh-Dh3-ZoOn.js";
import { n as y, g as M, c as j, a as T, r as K, i as P, d as A, e as G, f as H, s as N, m as W, h as X, b as Z, __tla as __tla_1 } from "./shared-B3F8t6LE.js";
import "./coupling-CX7jvXLk.js";
import { __tla as __tla_2 } from "./deformCpp-CV9xCN_b.js";
import { __tla as __tla_3 } from "./getMesh-D74EaHsB.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
import "./pureFunctionsAny.generated-DgiBRKJh.js";
import "./analyze-safkwfFW.js";
import "./getLocalStiffnessMatrix-BSrjxkfr.js";
import { __tla as __tla_4 } from "./deformCached-BAf-ZdXD.js";
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
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })()
]).then(async () => {
  const q = 1.4, w = 18e3, { div: v, h3: J, p: l } = t.tags, c = j(), a = {
    points: t.state([]),
    stories: t.state([]),
    columns: t.state([]),
    slabs: t.state([]),
    columnsByStory: t.state(/* @__PURE__ */ new Map()),
    slabsByStory: t.state(/* @__PURE__ */ new Map()),
    columnData: t.state(/* @__PURE__ */ new Map()),
    slabData: t.state(/* @__PURE__ */ new Map())
  }, O = B(), $ = D(), f = t.state([
    $
  ]), Q = t.state([
    O
  ]), o = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({}),
    elementInputs: t.state({}),
    deformOutputs: t.state({}),
    analyzeOutputs: t.state({})
  }, h = t.state(0), S = t.state(0), g = t.state(0), C = t.state(0), F = t.state(0), I = t.state(0), z = t.state(0), L = t.state(0), u = [], U = performance.now();
  let b = false;
  const Y = P();
  let i = null, r = null, m = null, p = false, d = null;
  t.derive(() => {
    const e = y(M(c));
    T(c, e);
    const s = !m || m.stories !== e.stories || m.grid !== e.grid || m.meshSize !== e.meshSize, n = p && s ? {
      ...e,
      meshSize: Math.max(e.meshSize, q)
    } : e;
    m = e, x(n);
  });
  function ee() {
    const e = v({
      id: "page"
    }), s = v({
      id: "stats"
    }, J("CLT Tower Benchmark"), l(() => `Nodes: ${h.val}`), l(() => `Elements: ${S.val}`), l(() => `DOF: ${g.val}`), l(() => `Fresh start wall: ${I.val.toFixed(2)} ms`), l(() => `First solve: ${F.val.toFixed(2)} ms`), l(() => `Current solve: ${C.val.toFixed(2)} ms`), l(() => `Median solve (last ${L.val}): ${z.val.toFixed(2)} ms`)), n = V(c);
    e.append(v({
      id: "viewer-wrap"
    }, E({
      objects3D: f,
      solids: Q,
      mesh: o,
      settingsObj: Z()
    })), n, k({
      sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower-benchmark/main.ts",
      author: "https://www.linkedin.com/in/musaabmahjoub/"
    }), s), document.body.append(e), te(n);
  }
  ee();
  function te(e) {
    let s = false;
    e.addEventListener("pointerdown", () => {
      s = true, p = true;
    }), window.addEventListener("pointerup", () => {
      if (!s || (s = false, !p)) return;
      p = false;
      const n = y(M(c));
      T(c, n), x(n);
    });
  }
  function x(e) {
    K(a, e, Y), $.geometry = _(a.points.val, a.slabs.val, a.columns.val), O.geometry = R(a.points.val, a.slabs.val, a.columns.val), f.val = [
      ...f.rawVal
    ];
    const s = A(a, "CLT tower benchmark mesh build failed");
    if (!s) {
      i = null, r = null, d = null, G(o), h.val = 0, S.val = 0, g.val = 0;
      return;
    }
    i = s, r = `${e.stories}|${e.grid.toFixed(3)}|${e.meshSize.toFixed(3)}`, H(o, s), h.val = s.nodes.length, S.val = s.elements.length, g.val = s.nodes.length * 6, se();
  }
  function se() {
    if (!i || !r) return;
    const e = i.nodes.length * 6;
    if (e > w) {
      d !== r && (console.warn(`CLT tower benchmark solve skipped: DOF ${e} exceeds safe limit ${w}. Increase mesh size or reduce stories.`), d = r), o.deformOutputs.val = {}, o.analyzeOutputs.val = {};
      return;
    }
    d = null, ae();
  }
  function ae() {
    if (!i) return;
    const e = N(i, {
      includeAnalyze: false,
      cacheKey: r ?? void 0,
      useCached: false
    });
    if (!e) {
      o.deformOutputs.val = {}, o.analyzeOutputs.val = {};
      return;
    }
    b || (b = true, F.val = e.solveMs, I.val = performance.now() - U), u.push(e.solveMs), u.length > 50 && u.shift(), L.val = u.length, C.val = e.solveMs, z.val = W(u), X(o, e);
  }
});
