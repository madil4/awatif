import { v as e, g as B } from "./styles-I_-DKBYJ.js";
import { g as D } from "./getParameters-B55TXCbA.js";
import { g as k } from "./getToolbar-C9bIbtqJ.js";
import { g as E, a as q, b as A, c as R, __tla as __tla_0 } from "./getMesh-Bg5rMFTq.js";
import { n as _, g as j, c as K, a as N, r as G, i as P, d as H, e as Q, f as U, s as W, m as X, h as J, b as Y, __tla as __tla_1 } from "./shared-CMAb0YIF.js";
import "./coupling-CX7jvXLk.js";
import { __tla as __tla_2 } from "./deformCpp-77svjSoa.js";
import { __tla as __tla_3 } from "./getMesh-D74EaHsB.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
import "./pureFunctionsAny.generated-DgiBRKJh.js";
import "./analyze-Dwq0MGTd.js";
import "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
import { __tla as __tla_4 } from "./deformCached-BS-uK4aA.js";
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
  const { div: p, h3: Z, p: o } = e.tags, h = K(), a = {
    points: e.state([]),
    stories: e.state([]),
    columns: e.state([]),
    slabs: e.state([]),
    columnsByStory: e.state(/* @__PURE__ */ new Map()),
    slabsByStory: e.state(/* @__PURE__ */ new Map()),
    columnData: e.state(/* @__PURE__ */ new Map()),
    slabData: e.state(/* @__PURE__ */ new Map())
  }, M = E(), C = q(), w = e.state([
    C
  ]), ee = e.state([
    M
  ]), r = {
    nodes: e.state([]),
    elements: e.state([]),
    nodeInputs: e.state({}),
    elementInputs: e.state({}),
    deformOutputs: e.state({}),
    analyzeOutputs: e.state({})
  }, g = e.state(0), S = e.state(0), m = e.state(0), F = e.state(0), $ = e.state(0), O = e.state(0), L = e.state(0), V = e.state(0), i = [], te = performance.now();
  let b = false, c = null, v = false, l, x = 0, d = null, u = null, n = null, f = null;
  const se = 120, T = 4500, ae = P();
  e.derive(() => {
    const t = _(j(h));
    N(h, t), le(t);
  });
  function oe() {
    const t = p({
      id: "page"
    }), s = p({
      id: "stats"
    }, Z("CLT Tower Benchmark"), o(() => `Nodes: ${g.val}`), o(() => `Elements: ${S.val}`), o(() => `DOF: ${m.val}`), o(() => `Fresh start wall: ${O.val.toFixed(2)} ms`), o(() => `First solve: ${$.val.toFixed(2)} ms`), o(() => `Current solve: ${F.val.toFixed(2)} ms`), o(() => `Median solve (last ${V.val}): ${L.val.toFixed(2)} ms`));
    t.append(p({
      id: "viewer-wrap"
    }, B({
      objects3D: w,
      solids: ee,
      mesh: r,
      settingsObj: Y()
    })), D(h), k({
      sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower-benchmark/main.ts",
      author: "https://www.linkedin.com/in/musaabmahjoub/"
    }), s), document.body.append(t);
  }
  oe();
  function le(t) {
    c = t, !v && (v = true, requestAnimationFrame(() => {
      if (v = false, !c) return;
      const s = c;
      c = null, ne(s);
    }));
  }
  function ne(t) {
    G(a, t, ae), C.geometry = A(a.points.val, a.slabs.val, a.columns.val), M.geometry = R(a.points.val, a.slabs.val, a.columns.val), w.val = [
      ...w.rawVal
    ];
    const s = H(a, "CLT tower benchmark mesh build failed");
    if (!s) {
      d = null, u = null, n = t, Q(r), g.val = 0, S.val = 0, m.val = 0;
      return;
    }
    if (d = s, u = `${t.stories}|${t.grid.toFixed(3)}|${t.meshSize.toFixed(3)}`, U(r, s), g.val = s.nodes.length, S.val = s.elements.length, m.val = s.nodes.length * 6, m.val > T) {
      f !== u && (console.warn(`CLT tower benchmark solve skipped: DOF ${m.val} exceeds safe interactive limit ${T}. Increase mesh size or reduce stories/grid.`), f = u);
      return;
    }
    f = null;
    const I = !n || n.stories !== t.stories || n.grid !== t.grid || n.meshSize !== t.meshSize;
    n = t;
    const y = ++x;
    if (!b || I) {
      l !== void 0 && (window.clearTimeout(l), l = void 0), z(y);
      return;
    }
    re(y, se);
  }
  function re(t, s) {
    l !== void 0 && window.clearTimeout(l), l = window.setTimeout(() => {
      l = void 0, z(t);
    }, s);
  }
  function z(t) {
    if (!d) return;
    const s = W(d, {
      includeAnalyze: false,
      cacheKey: u ?? void 0,
      useCached: false
    });
    if (t === x) {
      if (!s) {
        r.deformOutputs.val = {}, r.analyzeOutputs.val = {};
        return;
      }
      b || (b = true, $.val = s.solveMs, O.val = performance.now() - te), i.push(s.solveMs), i.length > 50 && i.shift(), V.val = i.length, F.val = s.solveMs, L.val = X(i), J(r, s);
    }
  }
});
