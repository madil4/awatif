import { v as t, g as S } from "./styles-I_-DKBYJ.js";
import { g as T } from "./getParameters-B55TXCbA.js";
import { g as M } from "./getToolbar-C9bIbtqJ.js";
import { g as I, a as O, b as z, c as L, __tla as __tla_0 } from "./getMesh-Bg5rMFTq.js";
import { n as f, g as v, a as w, c as V, b as E, r as C, d as x, e as B, f as D, s as _, h as $, i as F, __tla as __tla_1 } from "./shared-CMAb0YIF.js";
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
  const R = 1.4, d = 18e3, i = V(), a = {
    points: t.state([]),
    stories: t.state([]),
    columns: t.state([]),
    slabs: t.state([]),
    columnsByStory: t.state(/* @__PURE__ */ new Map()),
    slabsByStory: t.state(/* @__PURE__ */ new Map()),
    columnData: t.state(/* @__PURE__ */ new Map()),
    slabData: t.state(/* @__PURE__ */ new Map())
  }, g = I(), h = O(), c = t.state([
    h
  ]), j = t.state([
    g
  ]), o = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({}),
    elementInputs: t.state({}),
    deformOutputs: t.state({}),
    analyzeOutputs: t.state({})
  }, K = F();
  let n = null, r = null, l = null, m = false, p = null;
  t.derive(() => {
    const e = f(v(i));
    w(i, e);
    const s = !l || l.stories !== e.stories || l.grid !== e.grid || l.meshSize !== e.meshSize, u = m && s ? {
      ...e,
      meshSize: Math.max(e.meshSize, R)
    } : e;
    l = e, y(u);
  });
  const b = T(i);
  document.body.append(b, S({
    objects3D: c,
    solids: j,
    mesh: o,
    settingsObj: E()
  }), M({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower/main.ts",
    author: "https://www.linkedin.com/in/musaabmahjoub/"
  }));
  P(b);
  function P(e) {
    let s = false;
    e.addEventListener("pointerdown", () => {
      s = true, m = true;
    }), window.addEventListener("pointerup", () => {
      if (!s || (s = false, !m)) return;
      m = false;
      const u = f(v(i));
      w(i, u), y(u);
    });
  }
  function y(e) {
    C(a, e, K), h.geometry = z(a.points.val, a.slabs.val, a.columns.val), g.geometry = L(a.points.val, a.slabs.val, a.columns.val), c.val = [
      ...c.rawVal
    ];
    const s = x(a, "CLT tower mesh build failed");
    if (!s) {
      n = null, r = null, p = null, B(o);
      return;
    }
    n = s, r = `${e.stories}|${e.grid.toFixed(3)}|${e.meshSize.toFixed(3)}`, D(o, s), k();
  }
  function k() {
    if (!n || !r) return;
    const e = n.nodes.length * 6;
    if (e > d) {
      p !== r && (console.warn(`CLT tower solve skipped: DOF ${e} exceeds safe limit ${d}. Increase mesh size or reduce stories.`), p = r), o.deformOutputs.val = {}, o.analyzeOutputs.val = {};
      return;
    }
    p = null;
    {
      A();
      return;
    }
  }
  function A() {
    if (!n) return;
    const e = _(n, {
      includeAnalyze: false,
      cacheKey: r ?? void 0,
      useCached: false
    });
    if (!e) {
      o.deformOutputs.val = {}, o.analyzeOutputs.val = {};
      return;
    }
    $(o, e);
  }
});
