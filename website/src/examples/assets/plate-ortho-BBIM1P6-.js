import { v as u, g as O } from "./styles-CcZBryOO.js";
import { d as k, __tla as __tla_0 } from "./deformCpp-wF9UoRJI.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const w = u.state([]), E = u.state([]), $ = u.state({}), y = u.state({}), M = u.state({}), D = 10, I = 10, z = 0.15, Z = 1e3, F = 1e10, q = 1e10, L = 0.25, A = 0.5 * F / (1 + L), C = [
    true,
    true,
    true,
    false,
    false,
    false
  ], a = 5, l = [];
  for (let t = 0; t < a; t++) for (let s = 0; s < a; s++) l.push([
    s * D / (a - 1),
    t * I / (a - 1),
    0
  ]);
  const d = [];
  for (let t = 0; t < a - 1; t++) for (let s = 0; s < a - 1; s++) {
    const e = t * a + s, n = e + 1, o = (t + 1) * a + s, i = o + 1;
    d.push([
      e,
      n,
      o
    ]), d.push([
      n,
      i,
      o
    ]);
  }
  const R = [];
  for (let t = 0; t < l.length; t++) {
    const [s, e] = l[t];
    (s === 0 || s === D || e === 0 || e === I) && R.push(t);
  }
  const c = {
    supports: /* @__PURE__ */ new Map(),
    loads: /* @__PURE__ */ new Map()
  };
  R.forEach((t) => {
    c.supports.set(t, C);
  });
  d.forEach((t, s) => {
    const [e, n, o] = t, i = l[e], b = l[n], _ = l[o], j = G(i, b, _), g = Z * j / 3, m = c.loads.get(e) || [
      0,
      0,
      0,
      0,
      0,
      0
    ];
    c.loads.set(e, [
      m[0],
      m[1],
      m[2] - g,
      m[3],
      m[4],
      m[5]
    ]);
    const p = c.loads.get(n) || [
      0,
      0,
      0,
      0,
      0,
      0
    ];
    c.loads.set(n, [
      p[0],
      p[1],
      p[2] - g,
      p[3],
      p[4],
      p[5]
    ]);
    const h = c.loads.get(o) || [
      0,
      0,
      0,
      0,
      0,
      0
    ];
    c.loads.set(o, [
      h[0],
      h[1],
      h[2] - g,
      h[3],
      h[4],
      h[5]
    ]);
  });
  const r = {
    elasticities: /* @__PURE__ */ new Map(),
    elasticitiesOrthogonal: /* @__PURE__ */ new Map(),
    shearModuli: /* @__PURE__ */ new Map(),
    poissonsRatios: /* @__PURE__ */ new Map(),
    thicknesses: /* @__PURE__ */ new Map()
  };
  d.forEach((t, s) => {
    r.elasticities.set(s, F), r.elasticitiesOrthogonal.set(s, q), r.shearModuli.set(s, A), r.poissonsRatios.set(s, L), r.thicknesses.set(s, z);
  });
  M.val = k(l, d, c, r);
  let x = 0;
  M.val.deformations.forEach((t) => {
    const s = t[2], e = Math.abs(s);
    x = Math.max(x, e);
  });
  const v = x * 1e3, f = 13.541176;
  console.log(`Maximum Z-displacement: ${v.toFixed(6)} mm`);
  console.log(`Expected displacement from analytical solution: ${f.toFixed(6)} mm`);
  console.log(`Difference: ${(v - f).toFixed(6)} mm`);
  console.log(`Relative error: ${((v - f) / f * 100).toFixed(2)}%`);
  console.log(`Mesh details: ${a}x${a} grid (${l.length} nodes, ${d.length} elements)`);
  w.val = l;
  E.val = d;
  $.val = c;
  y.val = r;
  document.body.append(O({
    mesh: {
      nodes: w,
      elements: E,
      nodeInputs: $,
      elementInputs: y,
      deformOutputs: M
    },
    settingsObj: {
      deformedShape: true,
      loads: false
    }
  }));
  function G(t, s, e) {
    const n = [
      s[0] - t[0],
      s[1] - t[1],
      s[2] - t[2]
    ], o = [
      e[0] - t[0],
      e[1] - t[1],
      e[2] - t[2]
    ], i = [
      n[1] * o[2] - n[2] * o[1],
      n[2] * o[0] - n[0] * o[2],
      n[0] * o[1] - n[1] * o[0]
    ];
    return Math.sqrt(i[0] ** 2 + i[1] ** 2 + i[2] ** 2) / 2;
  }
});
