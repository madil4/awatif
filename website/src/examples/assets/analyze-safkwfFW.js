import { g as P, m as w, a as q, h as O, j as S, c as G, k as K, n as H } from "./getLocalStiffnessMatrix-BSrjxkfr.js";
function J(e, s) {
  const r = W(e);
  if (Math.abs(r) < 1e-12) return { membraneStrain: [0, 0, 0], curvature: [0, 0, 0], elementArea: 0 };
  const n = Q(e), t = V(s), a = 1 / (2 * r), f = a * (n[0][0] * t[0][0] + n[0][1] * t[1][0] + n[0][2] * t[2][0] + n[0][3] * t[3][0] + n[0][4] * t[4][0] + n[0][5] * t[5][0]), g = a * (n[1][0] * t[0][0] + n[1][1] * t[1][0] + n[1][2] * t[2][0] + n[1][3] * t[3][0] + n[1][4] * t[4][0] + n[1][5] * t[5][0]), o = a * (n[2][0] * t[0][0] + n[2][1] * t[1][0] + n[2][2] * t[2][0] + n[2][3] * t[3][0] + n[2][4] * t[4][0] + n[2][5] * t[5][0]), l = a * (n[0][0] * t[0][1] + n[0][1] * t[1][1] + n[0][2] * t[2][1] + n[0][3] * t[3][1] + n[0][4] * t[4][1] + n[0][5] * t[5][1]), M = a * (n[1][0] * t[0][1] + n[1][1] * t[1][1] + n[1][2] * t[2][1] + n[1][3] * t[3][1] + n[1][4] * t[4][1] + n[1][5] * t[5][1]), b = a * (n[2][0] * t[0][1] + n[2][1] * t[1][1] + n[2][2] * t[2][1] + n[2][3] * t[3][1] + n[2][4] * t[4][1] + n[2][5] * t[5][1]);
  return { membraneStrain: [f, g, o], curvature: [l, M, b], elementArea: r };
}
function nt(e, s) {
  const r = U(e);
  return [B(r[0], s), B(r[1], s)];
}
function Q(e) {
  const [s, r] = e[0], [n, t] = e[1], [a, f] = e[2], g = t - f, o = f - r, l = r - t, M = a - n, b = s - a, X = n - s;
  return [[g, o, l, 0, 0, 0], [0, 0, 0, M, b, X], [M, b, X, g, o, l]];
}
function U(e) {
  const s = x(2, 18), [r, n] = e[0], [t, a] = e[1], [f, g] = e[2], o = 0.5 * ((t - r) * (g - n) - (f - r) * -(n - a));
  if (Math.abs(o) < 1e-12) return s;
  const l = (r + t + f) / 3, M = (n + a + g) / 3, b = [l, r, t], X = [M, n, a], h = [l, t, f], m = [M, a, g], y = [l, f, r], p = [M, g, n], u = 1 / 3, [Y, d, v, C] = j(b, X), [A, k, z, Z] = j(h, m), [E, R, D, F] = j(y, p), T = x(2, 18), _ = x(2, 18), N = x(2, 18);
  for (let c = 0; c < 2; c++) for (let i = 0; i < 6; i++) T[c][i] = u * Y[c][i] + d[c][i], T[c][i + 6] = u * Y[c][i] + v[c][i], T[c][i + 12] = u * Y[c][i], _[c][i] = u * A[c][i], _[c][i + 6] = u * A[c][i] + k[c][i], _[c][i + 12] = u * A[c][i] + z[c][i], N[c][i] = u * E[c][i] + D[c][i], N[c][i + 6] = u * E[c][i], N[c][i + 12] = u * E[c][i] + R[c][i];
  for (let c = 0; c < 2; c++) for (let i = 0; i < 18; i++) T[c][i] *= C, _[c][i] *= Z, N[c][i] *= F, s[c][i] = (T[c][i] + _[c][i] + N[c][i]) / o;
  return s;
}
function j(e, s) {
  const r = x(2, 6), n = x(2, 6), t = x(2, 6), a = e[1] - e[0], f = e[0] - e[2], g = s[2] - s[0], o = s[0] - s[1], l = e[2] - e[1], M = s[1] - s[2], b = 0.5 * (a * g - f * o), X = 0.5 * o * f, h = 0.5 * g * a, m = 0.5 * a * f, y = 0.5 * o * g;
  return r[0][2] = 0.5 * l / b, r[0][3] = -0.5, r[1][2] = 0.5 * M / b, r[1][4] = 0.5, n[0][2] = 0.5 * f / b, n[0][3] = 0.5 * X / b, n[0][4] = 0.5 * m / b, n[1][2] = 0.5 * g / b, n[1][3] = 0.5 * y / b, n[1][4] = 0.5 * h / b, t[0][2] = 0.5 * a / b, t[0][3] = -0.5 * h / b, t[0][4] = -0.5 * m / b, t[1][2] = 0.5 * o / b, t[1][3] = -0.5 * y / b, t[1][4] = -0.5 * X / b, [r, n, t, b];
}
function V(e) {
  const [s, r, n] = [e[0], e[6], e[12]], [t, a, f] = [e[1], e[7], e[13]], [g, o, l] = [e[4], e[10], e[16]], [M, b, X] = [e[3], e[9], e[15]];
  return [[s, -g], [r, -o], [n, -l], [t, M], [a, b], [f, X]];
}
function x(e, s) {
  return Array.from({ length: e }, () => Array(s).fill(0));
}
function B(e, s) {
  let r = 0;
  for (let n = 0; n < e.length; n++) r += e[n] * (s[n] ?? 0);
  return r;
}
function W(e) {
  const [s, r] = e[0], [n, t] = e[1], [a, f] = e[2], g = n - s, o = a - s, l = f - r, M = r - t;
  return 0.5 * (g * l - o * -M);
}
function et(e, s, r, n) {
  const t = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map(), bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map(), membraneXX: /* @__PURE__ */ new Map(), membraneYY: /* @__PURE__ */ new Map(), membraneXY: /* @__PURE__ */ new Map(), tranverseShearX: /* @__PURE__ */ new Map(), tranverseShearY: /* @__PURE__ */ new Map() }, a = { bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map(), membraneXX: /* @__PURE__ */ new Map(), membraneYY: /* @__PURE__ */ new Map(), membraneXY: /* @__PURE__ */ new Map() };
  s.forEach((g, o) => {
    const l = g.map((h) => e[h]), M = g.reduce((h, m) => h.concat(n.deformations.get(m)), []), b = P(l), X = w(b, M);
    if (g.length === 2) {
      const h = q(l, r, o);
      let m = w(h, X);
      t.normals.set(o, [m[0], m[6]]), t.shearsY.set(o, [m[1], m[7]]), t.shearsZ.set(o, [m[2], m[8]]), t.torsions.set(o, [m[3], m[9]]), t.bendingsY.set(o, [m[4], m[10]]), t.bendingsZ.set(o, [m[5], m[11]]);
    } else {
      const { membraneStiffness3x3Matrix: h, bendingStiffness3x3Matrix: m } = L(r, o), { membraneStrain: y, curvature: p } = J(l, M), u = w(h, O([[y[0]], [y[1]], [y[2]]])), Y = w(m, O([[p[0]], [p[1]], [p[2]]])), d = u.toArray(), v = Y.toArray(), C = d[0][0], A = d[1][0], k = d[2][0], z = v[0][0], Z = v[1][0], E = v[2][0];
      a.membraneXX.set(o, C), a.membraneYY.set(o, A), a.membraneXY.set(o, k), a.bendingXX.set(o, z), a.bendingYY.set(o, Z), a.bendingXY.set(o, E);
    }
  });
  const f = I(s);
  return s.forEach((g, o) => {
    if (g.length !== 3) return;
    let l = [0, 0, 0], M = [0, 0, 0], b = [0, 0, 0], X = [0, 0, 0], h = [0, 0, 0], m = [0, 0, 0];
    g.forEach((y, p) => {
      const u = f.get(y) || [];
      l[p] = S(u.map((Y) => a.membraneXX.get(Y) ?? 0)), M[p] = S(u.map((Y) => a.membraneYY.get(Y) ?? 0)), b[p] = S(u.map((Y) => a.membraneXY.get(Y) ?? 0)), X[p] = S(u.map((Y) => a.bendingXX.get(Y) ?? 0)), h[p] = S(u.map((Y) => a.bendingYY.get(Y) ?? 0)), m[p] = S(u.map((Y) => a.bendingXY.get(Y) ?? 0));
    }), t.membraneXX.set(o, l), t.membraneYY.set(o, M), t.membraneXY.set(o, b), t.bendingXX.set(o, X), t.bendingYY.set(o, h), t.bendingXY.set(o, m);
  }), t;
}
function $(e, s) {
  var _a, _b, _c, _d;
  const r = ((_a = e.elasticities) == null ? void 0 : _a.get(s)) ?? 0, n = ((_b = e.elasticitiesOrthogonal) == null ? void 0 : _b.get(s)) ?? 0, t = ((_c = e.poissonsRatios) == null ? void 0 : _c.get(s)) ?? 0, a = ((_d = e.shearModuli) == null ? void 0 : _d.get(s)) ?? 0;
  return n > 0 ? K(r, n, a, t) : H(r, t);
}
function L(e, s) {
  var _a, _b;
  const r = (_a = e.cltLayups) == null ? void 0 : _a.get(s);
  if (r) {
    const a = G(r);
    return { membraneStiffness3x3Matrix: O(a.A), bendingStiffness3x3Matrix: O(a.D) };
  }
  const n = ((_b = e.thicknesses) == null ? void 0 : _b.get(s)) ?? 1, t = $(e, s);
  return { membraneStiffness3x3Matrix: w(t, n), bendingStiffness3x3Matrix: w(t, n ** 3 / 12) };
}
function I(e) {
  const s = /* @__PURE__ */ new Map();
  return e.forEach((r, n) => {
    r.forEach((t) => {
      var _a;
      s.has(t) || s.set(t, []), (_a = s.get(t)) == null ? void 0 : _a.push(n);
    });
  }), s;
}
export {
  et as a,
  nt as b,
  J as g
};
