function x(t) {
  const n = /* @__PURE__ */ new Map();
  return t && t.forEach((e, r) => {
    n.set(r, (e[0] + e[1] + e[2]) / 3);
  }), n;
}
function s(t, n, e, r, a) {
  const c = (a == null ? void 0 : a.halfBand) ?? 0, u = (a == null ? void 0 : a.areaWeighted) ?? true;
  let i = 0, M = 0;
  if (n.forEach((o, h) => {
    if (o.length !== 3) return;
    const f = e.get(h);
    if (f === void 0) return;
    const m = N(t, o);
    if (Math.abs(m - r) > c) return;
    const g = u ? S(t, o) : 1;
    i += g, M += f * g;
  }), !(i <= 0)) return M / i;
}
function I(t, n, e, r, a) {
  if (r < 2) return [];
  const c = (a == null ? void 0 : a.xMin) ?? b(t), i = (((a == null ? void 0 : a.xMax) ?? d(t)) - c) / (r - 1), M = (a == null ? void 0 : a.halfBand) ?? i * 0.5;
  return Array.from({ length: r }, (o, h) => {
    const f = c + h * i, m = s(t, n, e, f, { halfBand: M, areaWeighted: a == null ? void 0 : a.areaWeighted });
    return { x: f, value: m ?? 0 };
  });
}
function l(t) {
  return t.reduce((n, e) => Math.max(n, Math.abs(e.value)), 0);
}
function S(t, n) {
  const e = t[n[0]], r = t[n[1]], a = t[n[2]];
  return Math.abs((r[0] - e[0]) * (a[1] - e[1]) - (a[0] - e[0]) * (r[1] - e[1])) * 0.5;
}
function N(t, n) {
  const e = t[n[0]], r = t[n[1]], a = t[n[2]];
  return (e[0] + r[0] + a[0]) / 3;
}
function b(t) {
  return t.reduce((n, e) => Math.min(n, e[0]), Number.POSITIVE_INFINITY);
}
function d(t) {
  return t.reduce((n, e) => Math.max(n, e[0]), Number.NEGATIVE_INFINITY);
}
function Y(t, n, e, r, a, c) {
  const u = (c == null ? void 0 : c.xMin) ?? X(t), i = (c == null ? void 0 : c.xMax) ?? B(t), M = (c == null ? void 0 : c.slabWidth) ?? P(t), o = (c == null ? void 0 : c.supportX) ?? u;
  return { specificSupportShearKnPerM: p(t, a, M, o, c == null ? void 0 : c.supportTolerance), maxSpecificBendingMomentKnmPerM: E(t, n, e, u, i, c == null ? void 0 : c.stripSamples), maxDownwardDeflectionMm: T(r) };
}
function w(t, n) {
  const e = Math.abs(t);
  return { specificSupportShearKnPerM: e * n / 2, maxSpecificBendingMomentKnmPerM: e * n ** 2 / 8 };
}
function A(t, n) {
  return Math.abs(n) < 1e-12 ? 0 : Math.abs(t - n) / Math.abs(n) * 100;
}
function p(t, n, e, r, a = 1e-6) {
  if (!(n == null ? void 0 : n.size) || e <= 0) return 0;
  let c = 0;
  return n.forEach((u, i) => {
    Math.abs(t[i][0] - r) <= a && (c += u[2] ?? 0);
  }), Math.abs(c / e);
}
function E(t, n, e, r, a, c = 16) {
  const u = x(e.bendingXX), i = I(t, n, u, c, { xMin: r, xMax: a });
  return l(i);
}
function T(t) {
  if (!(t == null ? void 0 : t.size)) return 0;
  let n = 0;
  return t.forEach((e) => {
    n = Math.min(n, e[2] ?? 0);
  }), -n * 1e3;
}
function X(t) {
  return t.reduce((n, e) => Math.min(n, e[0]), Number.POSITIVE_INFINITY);
}
function B(t) {
  return t.reduce((n, e) => Math.max(n, e[0]), Number.NEGATIVE_INFINITY);
}
function P(t) {
  const n = t.reduce((r, a) => Math.min(r, a[1]), Number.POSITIVE_INFINITY), e = t.reduce((r, a) => Math.max(r, a[1]), Number.NEGATIVE_INFINITY);
  return Math.max(0, e - n);
}
export {
  w as a,
  A as b,
  Y as g
};
