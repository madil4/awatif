import { v, g as V } from "./styles-Bn9nRx26.js";
import { d as B, __tla as __tla_0 } from "./deformCpp-wF9UoRJI.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const L = v.state([]), R = v.state([]), _ = v.state({}), j = v.state({}), E = v.state({}), O = 10, k = 10, H = 0.15, h = 1e3, z = 1e10, J = 1e10, Z = 0.25, K = 0.5 * z / (1 + Z), i = [], l = 5;
  for (let t = 0; t < l; t++) for (let s = 0; s < l; s++) i.push([
    s * O / (l - 1),
    t * k / (l - 1),
    0
  ]);
  const u = [];
  for (let t = 0; t < l - 1; t++) for (let s = 0; s < l - 1; s++) {
    const e = t * l + s, n = e + 1, o = (t + 1) * l + s, a = o + 1;
    u.push([
      e,
      n,
      o
    ]), u.push([
      n,
      a,
      o
    ]);
  }
  const q = [];
  for (let t = 0; t < i.length; t++) {
    const [s, e] = i[t];
    (s === 0 || s === O || e === 0 || e === k) && q.push(t);
  }
  const c = {
    supports: /* @__PURE__ */ new Map(),
    loads: /* @__PURE__ */ new Map()
  };
  q.forEach((t) => {
    c.supports.set(t, [
      true,
      true,
      true,
      false,
      false,
      false
    ]);
  });
  for (let t = 0; t < i.length; t++) c.loads.set(t, [
    0,
    0,
    0,
    0,
    0,
    0
  ]);
  u.forEach((t, s) => {
    const [e, n, o] = t, a = i[e], r = i[n], d = i[o], p = P(a, r, d), m = [
      (a[0] + r[0] + d[0]) / 3,
      (a[1] + r[1] + d[1]) / 3,
      (a[2] + r[2] + d[2]) / 3
    ], D = [
      a[0] - m[0],
      a[1] - m[1],
      a[2] - m[2]
    ], I = [
      r[0] - m[0],
      r[1] - m[1],
      r[2] - m[2]
    ], F = [
      d[0] - m[0],
      d[1] - m[1],
      d[2] - m[2]
    ], b = h * p / 3, A = h * p * D[1] / 12, C = h * p * D[0] / 12, G = h * p * I[1] / 12, N = h * p * I[0] / 12, S = h * p * F[1] / 12, T = h * p * F[0] / 12, g = c.loads.get(e) || [
      0,
      0,
      0,
      0,
      0,
      0
    ];
    c.loads.set(e, [
      g[0],
      g[1],
      g[2] - b,
      g[3] + A,
      g[4] + C,
      g[5]
    ]);
    const x = c.loads.get(n) || [
      0,
      0,
      0,
      0,
      0,
      0
    ];
    c.loads.set(n, [
      x[0],
      x[1],
      x[2] - b,
      x[3] + G,
      x[4] + N,
      x[5]
    ]);
    const M = c.loads.get(o) || [
      0,
      0,
      0,
      0,
      0,
      0
    ];
    c.loads.set(o, [
      M[0],
      M[1],
      M[2] - b,
      M[3] + S,
      M[4] + T,
      M[5]
    ]);
  });
  const f = {
    elasticities: /* @__PURE__ */ new Map(),
    elasticitiesOrthogonal: /* @__PURE__ */ new Map(),
    shearModuli: /* @__PURE__ */ new Map(),
    poissonsRatios: /* @__PURE__ */ new Map(),
    thicknesses: /* @__PURE__ */ new Map()
  };
  u.forEach((t, s) => {
    f.elasticities.set(s, z), f.elasticitiesOrthogonal.set(s, J), f.shearModuli.set(s, K), f.poissonsRatios.set(s, Z), f.thicknesses.set(s, H);
  });
  E.val = B(i, u, c, f);
  let w = 0;
  E.val.deformations.forEach((t) => {
    const s = t[2], e = Math.abs(s);
    w = Math.max(w, e);
  });
  const $ = w * 1e3, y = 13.541176;
  console.log(`Maximum Z-displacement: ${$.toFixed(6)} mm`);
  console.log(`Expected displacement from analytical solution: ${y.toFixed(6)} mm`);
  console.log(`Difference: ${($ - y).toFixed(6)} mm`);
  console.log(`Relative error: ${(($ - y) / y * 100).toFixed(2)}%`);
  console.log(`Mesh details: ${l}x${l} grid (${i.length} nodes, ${u.length} elements)`);
  L.val = i;
  R.val = u;
  _.val = c;
  j.val = f;
  document.body.append(V({
    mesh: {
      nodes: L,
      elements: R,
      nodeInputs: _,
      elementInputs: j,
      deformOutputs: E
    },
    settingsObj: {
      deformedShape: true,
      loads: false
    }
  }));
  function P(t, s, e) {
    const n = [
      s[0] - t[0],
      s[1] - t[1],
      s[2] - t[2]
    ], o = [
      e[0] - t[0],
      e[1] - t[1],
      e[2] - t[2]
    ], a = [
      n[1] * o[2] - n[2] * o[1],
      n[2] * o[0] - n[0] * o[2],
      n[0] * o[1] - n[1] * o[0]
    ];
    return Math.sqrt(a[0] ** 2 + a[1] ** 2 + a[2] ** 2) / 2;
  }
});
