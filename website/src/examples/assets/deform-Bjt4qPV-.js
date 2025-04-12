import { s as K, n as R, d as X, k as G, i as k, a as Y, c as Z, z as d, t as t0, m as J, b as l0, e as g0, f as $, g as I, h as e0, l as h0, j as m0, o as y0 } from "./pureFunctionsAny.generated-HP0TxL6F.js";
function q0(n) {
  if (n.length === 2) return A0(n[0], n[1]);
  if (n.length === 3) return P0(n[0], n[1], n[2]);
}
function A0(n, u) {
  const o = K(u, n), i = R(o), r = X(o, [1, 0, 0]) / i, q = X(o, [0, 1, 0]) / i, l = X(o, [0, 0, 1]) / i, c = Math.sqrt(r ** 2 + q ** 2);
  let f = [[r, q, l], [-q / c, r / c, 0], [-r * l / c, -q * l / c, c]];
  return l === 1 && (f = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]]), l === -1 && (f = [[0, 0, -1], [0, 1, 0], [1, 0, 0]]), G(k(4), f).toArray();
}
function P0(n, u, o) {
  const i = m([u, o]), r = m([n, o]), q = m([n, u]), l = Y(K(i, r), R(K(i, r))), c = Y(K(o, q), R(K(i, r))), f = Y(Z(l, c), R(Z(l, c))), a = Y(Z(f, l), R(Z(f, l))), w = [[l[0], a[0], f[0]], [l[1], a[1], f[1]], [l[2], a[2], f[2]]];
  return G(k(6), w).toArray();
  function m(P) {
    const E = P.reduce((S, L) => [S[0] + L[0], S[1] + L[1], S[2] + L[2]], [0, 0, 0]), z = P.length;
    return [E[0] / z, E[1] / z, E[2] / z];
  }
}
function b0(n, u, o) {
  if (n.length === 2) return p0(n, u, o);
  if (n.length === 3) return v0(n, u, o);
}
function p0(n, u, o) {
  var _a, _b, _c, _d, _e, _f;
  const i = ((_a = u == null ? void 0 : u.momentsOfInertiaZ) == null ? void 0 : _a.get(o)) ?? 0, r = ((_b = u == null ? void 0 : u.momentsOfInertiaY) == null ? void 0 : _b.get(o)) ?? 0, q = ((_c = u == null ? void 0 : u.elasticities) == null ? void 0 : _c.get(o)) ?? 0, l = ((_d = u == null ? void 0 : u.areas) == null ? void 0 : _d.get(o)) ?? 0, c = ((_e = u == null ? void 0 : u.shearModuli) == null ? void 0 : _e.get(o)) ?? 0, f = ((_f = u == null ? void 0 : u.torsionalConstants) == null ? void 0 : _f.get(o)) ?? 0, a = R(K(n[0], n[1])), w = q * l / a, m = q * i / a ** 3, P = q * r / a ** 3, E = c * f / a;
  return [[w, 0, 0, 0, 0, 0, -w, 0, 0, 0, 0, 0], [0, 12 * m, 0, 0, 0, 6 * a * m, 0, -12 * m, 0, 0, 0, 6 * a * m], [0, 0, 12 * P, 0, -6 * a * P, 0, 0, 0, -12 * P, 0, -6 * a * P, 0], [0, 0, 0, E, 0, 0, 0, 0, 0, -E, 0, 0], [0, 0, -6 * a * P, 0, 4 * P * a ** 2, 0, 0, 0, 6 * a * P, 0, 2 * P * a ** 2, 0], [0, 6 * a * m, 0, 0, 0, 4 * m * a ** 2, 0, -6 * a * m, 0, 0, 0, 2 * m * a ** 2], [-w, 0, 0, 0, 0, 0, w, 0, 0, 0, 0, 0], [0, -12 * m, 0, 0, 0, -6 * m * a, 0, 12 * m, 0, 0, 0, -6 * m * a], [0, 0, -12 * P, 0, 6 * a * P, 0, 0, 0, 12 * P, 0, 6 * a * P, 0], [0, 0, 0, -E, 0, 0, 0, 0, 0, E, 0, 0], [0, 0, -6 * a * P, 0, 2 * P * a ** 2, 0, 0, 0, 6 * a * P, 0, 4 * P * a ** 2, 0], [0, 6 * a * m, 0, 0, 0, 2 * m * a ** 2, 0, -6 * a * m, 0, 0, 0, 4 * m * a ** 2]];
}
function v0(n, u, o) {
  var _a, _b, _c;
  const i = ((_a = u == null ? void 0 : u.elasticities) == null ? void 0 : _a.get(o)) ?? 0, r = ((_b = u == null ? void 0 : u.poissonsRatios) == null ? void 0 : _b.get(o)) ?? 0, q = ((_c = u == null ? void 0 : u.thicknesses) == null ? void 0 : _c.get(o)) ?? 0, [l, c] = [n[0][0], n[0][1]], [f, a] = [n[1][0], n[1][1]], [w, m] = [n[2][0], n[2][1]], P = r0(i, r, q), E = l * (a - m) + f * (m - c) + w * (c - a), z = 0.5 * Math.abs(E), S = [[0.5, 0, 1 / 3], [0, 0.5, 1 / 3], [0.5, 0.5, 1 / 3]];
  let L = d(9, 9);
  for (const [t, s, g] of S) {
    const b = n0(t, s, l, c, f, a, w, m), e = t0(b), p = 2 * z * g, y = J(e, P), h = J(y, b), A = J(p, h);
    L = l0(L, A);
  }
  return c0(L.toArray());
  function x(t, s, g, b, e, p) {
    const y = t - g, h = s - b, A = g - e, v = b - p, F = e - t, B = p - s, T = y * y + h * h, D = A * A + v * v, j = F * F + B * B, O = -6 * A / D, _ = -6 * F / j, N = -6 * y / T, C = 3 * A * v / D, M = 3 * F * B / j, U = 3 * y * h / T, V = 3 * (v * v) / D, W = 3 * (B * B) / j, a0 = 3 * (h * h) / T, f0 = -6 * v / D, i0 = -6 * B / j, u0 = -6 * h / T;
    return { x12: y, y12: h, x23: A, y23: v, x31: F, y31: B, l12: T, l23: D, l31: j, P4: O, P5: _, P6: N, q4: C, q5: M, q6: U, r4: V, r5: W, r6: a0, t4: f0, t5: i0, t6: u0 };
  }
  function H(t, s, g) {
    const { P5: b, P6: e, q5: p, q6: y, r5: h, r6: A } = g;
    return [e * (1 - 2 * t) + (b - e) * s, y * (1 - 2 * t) - (p + y) * s, -4 + 6 * (t + s) + A * (1 - 2 * t) - s * (h + A), -e * (1 - 2 * t) + s * (g.P4 + e), y * (1 - 2 * t) - s * (y - g.q4), -2 + 6 * t + A * (1 - 2 * t) + s * (g.r4 - A), -s * (b + g.P4), s * (g.q4 - p), -s * (h - g.r4)];
  }
  function Q(t, s, g) {
    const { t5: b, t6: e, r5: p, r6: y, q5: h, q6: A } = g;
    return [e * (1 - 2 * t) + s * (b - e), 1 + y * (1 - 2 * t) - s * (p + y), -A * (1 - 2 * t) + s * (h + A), -e * (1 - 2 * t) + s * (g.t4 + e), -1 + y * (1 - 2 * t) + s * (g.r4 - y), -A * (1 - 2 * t) - s * (g.q4 - A), -s * (g.t4 + b), s * (g.r4 - p), -s * (g.q4 - h)];
  }
  function s0(t, s, g) {
    const { P4: b, P5: e, P6: p, q4: y, q5: h, q6: A, r4: v, r5: F, r6: B } = g;
    return [-e * (1 - 2 * s) - t * (p - e), h * (1 - 2 * s) - t * (h + A), -4 + 6 * (t + s) + F * (1 - 2 * s) - t * (F + B), t * (b + p), t * (y - A), -t * (B - v), e * (1 - 2 * s) - t * (b + e), h * (1 - 2 * s) + t * (y - h), -2 + 6 * s + F * (1 - 2 * s) + t * (v - F)];
  }
  function o0(t, s, g) {
    const { t4: b, t5: e, t6: p, r4: y, r5: h, r6: A, q4: v, q5: F, q6: B } = g;
    return [-e * (1 - 2 * s) - t * (p - e), 1 + h * (1 - 2 * s) - t * (h + A), -F * (1 - 2 * s) + t * (F + B), t * (b + p), t * (y - A), -t * (v - B), e * (1 - 2 * s) - t * (b + e), -1 + h * (1 - 2 * s) + t * (y - h), -F * (1 - 2 * s) - t * (v - F)];
  }
  function n0(t, s, g, b, e, p, y, h) {
    const A = g * (p - h) + e * (h - b) + y * (b - p), v = x(g, b, e, p, y, h), F = H(t, s, v), B = s0(t, s, v), T = Q(t, s, v), D = o0(t, s, v), { x31: j, y31: O, x12: _, y12: N } = v;
    let C = d(3, 9);
    for (let M = 0; M < 9; M++) {
      const U = (O * F[M] + N * B[M]) / A;
      C.set([0, M], U);
      const V = (-j * T[M] - _ * D[M]) / A;
      C.set([1, M], V);
      const W = (-j * F[M] - _ * B[M] + O * T[M] + N * D[M]) / A;
      C.set([2, M], W);
    }
    return C;
  }
  function r0(t, s, g) {
    const b = t * g ** 3 / (12 * (1 - s * s)), e = [[1, s, 0], [s, 1, 0], [0, 0, (1 - s) / 2]].map((p) => p.map((y) => y * b));
    return g0(e);
  }
  function c0(t) {
    return [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, t[0][0], t[0][2], t[0][1], 0, 0, 0, t[0][3], t[0][5], t[0][4], 0, 0, 0, t[0][6], t[0][8], t[0][7], 0], [0, 0, t[2][0], t[2][2], t[2][1], 0, 0, 0, t[2][3], t[2][5], t[2][4], 0, 0, 0, t[2][6], t[2][8], t[2][7], 0], [0, 0, t[1][0], t[1][2], t[1][1], 0, 0, 0, t[1][3], t[1][5], t[1][4], 0, 0, 0, t[1][6], t[1][8], t[1][7], 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, t[3][0], t[3][2], t[3][1], 0, 0, 0, t[3][3], t[3][5], t[3][4], 0, 0, 0, t[3][6], t[3][8], t[3][7], 0], [0, 0, t[5][0], t[5][2], t[5][1], 0, 0, 0, t[5][3], t[5][5], t[5][4], 0, 0, 0, t[5][6], t[5][8], t[5][7], 0], [0, 0, t[4][0], t[4][2], t[4][1], 0, 0, 0, t[4][3], t[4][5], t[4][4], 0, 0, 0, t[4][6], t[4][8], t[4][7], 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, t[6][0], t[6][2], t[6][1], 0, 0, 0, t[6][3], t[6][5], t[6][4], 0, 0, 0, t[6][6], t[6][8], t[6][7], 0], [0, 0, t[8][0], t[8][2], t[8][1], 0, 0, 0, t[8][3], t[8][5], t[8][4], 0, 0, 0, t[8][6], t[8][8], t[8][7], 0], [0, 0, t[7][0], t[7][2], t[7][1], 0, 0, 0, t[7][3], t[7][5], t[7][4], 0, 0, 0, t[7][6], t[7][8], t[7][7], 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  }
}
function E0(n, u, o, i) {
  let r = Array(i).fill(0).map(() => Array(i).fill(0));
  return u.forEach((q, l) => {
    const c = q.map((m) => n[m]), f = b0(c, o, l), a = q0(c), w = J(t0(a), J(f, a));
    r = F0(r, w, q);
  }), r;
}
function F0(n, u, o) {
  const i = o.length === 3, r = 6 * o[0], q = 6 * o[1], l = i ? 6 * o[2] : void 0;
  for (let c = 0; c < 6; c++) for (let f = 0; f < 6; f++) n[r + c][r + f] += u[c][f], n[q + c][r + f] += u[c + 6][f], i && (n[l + c][r + f] += u[c + 12][f]), n[r + c][q + f] += u[c][f + 6], n[q + c][q + f] += u[c + 6][f + 6], i && (n[l + c][q + f] += u[c + 12][f + 6]), i && (n[r + c][l + f] += u[c][f + 12], n[q + c][l + f] += u[c + 6][f + 12], n[l + c][l + f] += u[c + 12][f + 12]);
  return n;
}
function w0(n, u, o, i) {
  const r = n.length * 6;
  if (r === 0) return;
  const q = H0(o.supports, r), l = B0(o.loads, r), c = E0(n, u, i, r), f = $(l, I(q)), a = $(c, I(q, q)), w = e0(a), m = h0(w), P = m0(m, f), E = $(Array(r).fill(0), I(q), y0(P)), z = J(c, E), S = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
  return n.forEach((x, H) => {
    var _a;
    const Q = (_a = o.supports) == null ? void 0 : _a.get(H);
    S.set(H, [E[H * 6], E[H * 6 + 1], E[H * 6 + 2], E[H * 6 + 3], E[H * 6 + 4], E[H * 6 + 5]]), Q && L.set(H, [z[H * 6], z[H * 6 + 1], z[H * 6 + 2], z[H * 6 + 3], z[H * 6 + 4], z[H * 6 + 5]]);
  }), { deformations: S, reactions: L };
}
function H0(n, u) {
  const o = [];
  return n == null ? void 0 : n.forEach((i, r) => {
    i[0] && o.push(r * 6), i[1] && o.push(r * 6 + 1), i[2] && o.push(r * 6 + 2), i[3] && o.push(r * 6 + 3), i[4] && o.push(r * 6 + 4), i[5] && o.push(r * 6 + 5);
  }), Array(u).fill(0).map((i, r) => r).filter((i) => !o.includes(i));
}
function B0(n, u) {
  const o = Array(u).fill(0);
  return n == null ? void 0 : n.forEach((i, r) => {
    o[r * 6] = i[0], o[r * 6 + 1] = i[1], o[r * 6 + 2] = i[2], o[r * 6 + 3] = i[3], o[r * 6 + 4] = i[4], o[r * 6 + 5] = i[5];
  }), o;
}
export {
  b0 as a,
  w0 as d,
  q0 as g
};
