import { l as B, r as D, c as R, g as P, m as E } from "./getLocalStiffnessMatrix-BSrjxkfr.js";
import { g as X, b as V } from "./analyze-safkwfFW.js";
const b = Math.PI / 180;
function F(t, e, n, o) {
  const a = (o == null ? void 0 : o.mode) ?? Z(t);
  return _(t).map((s) => {
    const c = 0.5 * (s.zTop + s.zBot), u = [["top", s.zTop], ["mid", c], ["bottom", s.zBot]].map(([l, f]) => {
      const d = f - c, m = K(e, Q(n, a === "coupled" ? f : d)), p = v(s.qShell, m), g = O(m, s.thetaDeg * b), z = v(s.qLayer, g);
      return { point: l, zGlobal: f, zLocal: d, strainShell: m, stressShell: p, strainLayer: g, stressLayer: z };
    });
    return { layerIndex: s.layerIndex, thetaDeg: s.thetaDeg, thickness: s.thickness, zTop: s.zTop, zBot: s.zBot, points: u };
  });
}
function Z(t) {
  return t.options.shearCoupling ? "coupled" : "uncoupled";
}
function _(t) {
  if (!t.layers.length) return [];
  let e = t.layers.reduce((o, a) => o + a.thickness, 0) / 2;
  const n = t.options.noGlueAtNarrowSide;
  return t.layers.map((o, a) => {
    const r = e - o.thickness, s = B(o, n), c = D(s, o.thetaDeg * b), i = { layerIndex: a, thickness: o.thickness, thetaDeg: o.thetaDeg, zTop: e, zBot: r, qLayer: s, qShell: c };
    return e = r, i;
  });
}
function O(t, e) {
  const [n, o, a] = t, r = Math.cos(e), s = Math.sin(e), c = r * r, i = s * s, u = r * s, l = c * n + i * o + u * a, f = i * n + c * o - u * a, d = -2 * u * n + 2 * u * o + (c - i) * a;
  return [l, f, d];
}
function v(t, e) {
  return [t[0][0] * e[0] + t[0][1] * e[1] + t[0][2] * e[2], t[1][0] * e[0] + t[1][1] * e[1] + t[1][2] * e[2], t[2][0] * e[0] + t[2][1] * e[1] + t[2][2] * e[2]];
}
function K(t, e) {
  return [t[0] + e[0], t[1] + e[1], t[2] + e[2]];
}
function Q(t, e) {
  return [t[0] * e, t[1] * e, t[2] * e];
}
const S = Math.PI / 180, x = 1e-12;
function U(t, e, n) {
  return ((n == null ? void 0 : n.mode) ?? j(t)) === "coupled" ? $(t, e) : W(t, e);
}
function W(t, e) {
  return k(t).map((n) => {
    const o = T(n.tShellToLayer, e), a = y(T(n.qLayer, o), 1.5 * (5 / 6));
    return q(n, (r) => {
      const s = Math.max(0, 1 - (2 * r / n.thickness) ** 2), c = y(a, s);
      return { tauLayer: c, tauShell: T(n.tLayerToShell, c) };
    });
  });
}
function $(t, e) {
  const n = k(t);
  if (!n.length) return [];
  const o = R(H(t, true)), a = (o.alphaDeg ?? 0) * S, r = tt(a), s = A(r), c = T(o.S, e), i = T(s, c), u = !!t.options.noGlueAtNarrowSide, l = n.map((h) => {
    const m = a - h.thetaDeg * S, p = D(B(h.layer, u), m);
    return { zBot: h.zBot, zTop: h.zTop, q11: p[0][0], q22: p[1][1] };
  }), f = L(l.map((h) => ({ zBot: h.zBot, zTop: h.zTop, qn: h.q11 }))), d = L(l.map((h) => ({ zBot: h.zBot, zTop: h.zTop, qn: h.q22 })));
  return n.map((h) => q(h, (m, p) => {
    const g = [I(i[0], f.valueAt(p), f.R), I(i[1], d.valueAt(p), d.R)], z = T(r, g);
    return { tauShell: z, tauLayer: T(h.tShellToLayer, z) };
  }));
}
function q(t, e) {
  const n = 0.5 * (t.zTop + t.zBot), a = [["top", t.zTop], ["mid", n], ["bottom", t.zBot]].map(([r, s]) => {
    const c = s - n, i = e(c, s);
    return { point: r, zGlobal: s, zLocal: c, tauShell: i.tauShell, tauLayer: i.tauLayer };
  });
  return { layerIndex: t.layerIndex, thetaDeg: t.thetaDeg, thickness: t.thickness, zTop: t.zTop, zBot: t.zBot, points: a };
}
function k(t) {
  let e = t.layers.reduce((n, o) => n + o.thickness, 0) / 2;
  return t.layers.map((n, o) => {
    const a = e - n.thickness, r = n.thetaDeg * S, s = [[n.Gxz, 0], [0, n.Gyz]], c = [[Math.cos(r), Math.sin(r)], [-Math.sin(r), Math.cos(r)]], i = { layer: n, layerIndex: o, thickness: n.thickness, thetaDeg: n.thetaDeg, zTop: e, zBot: a, qLayer: s, tLayerToShell: c, tShellToLayer: A(c) };
    return e = a, i;
  });
}
function L(t) {
  const e = [...t].sort((i, u) => i.zBot - u.zBot);
  if (!e.length) return { R: 0, valueAt: () => 0 };
  let n = 0, o = 0;
  for (const i of e) n += i.qn * 0.5 * (i.zTop ** 2 - i.zBot ** 2), o += i.qn * (i.zTop - i.zBot);
  const a = Math.abs(o) < x ? 0 : n / o;
  let r = 0;
  for (const i of e) r += i.qn * ((i.zTop - a) ** 3 - (i.zBot - a) ** 3) / 3;
  const s = [];
  let c = 0;
  for (const i of e) s.push({ zBot: i.zBot, zTop: i.zTop, qn: i.qn, gAtBot: c }), c -= 0.5 * i.qn * ((i.zTop - a) ** 2 - (i.zBot - a) ** 2);
  return { R: r, valueAt: (i) => {
    const u = et(i, s[0].zBot, s[s.length - 1].zTop), l = J(s, u);
    return l.gAtBot - 0.5 * l.qn * ((u - a) ** 2 - (l.zBot - a) ** 2);
  } };
}
function j(t) {
  return t.options.shearCoupling ? "coupled" : "uncoupled";
}
function H(t, e) {
  return t.options.shearCoupling === e ? t : { ...t, options: { ...t.options, shearCoupling: e } };
}
function J(t, e) {
  for (const n of t) if (e <= n.zTop + x) return n;
  return t[t.length - 1];
}
function tt(t) {
  return [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]];
}
function T(t, e) {
  return [t[0][0] * e[0] + t[0][1] * e[1], t[1][0] * e[0] + t[1][1] * e[1]];
}
function y(t, e) {
  return [t[0] * e, t[1] * e];
}
function I(t, e, n) {
  return Math.abs(n) < 1e-18 ? 0 : t / n * e;
}
function A(t) {
  return [[t[0][0], t[1][0]], [t[0][1], t[1][1]]];
}
function et(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function ut(t, e, n, o, a) {
  const r = /* @__PURE__ */ new Map(), s = o.deformations;
  return s && e.forEach((c, i) => {
    var _a;
    if (c.length !== 3) return;
    const u = (_a = n.cltLayups) == null ? void 0 : _a.get(i);
    if (!u) return;
    const l = c.map((z) => t[z]), f = C(c, s), d = P(l), h = E(d, f), m = N(l, d), p = X(m, h), g = F(u, p.membraneStrain, p.curvature, { mode: a == null ? void 0 : a.mode });
    r.set(i, g);
  }), r;
}
function lt(t, e, n, o, a) {
  const r = /* @__PURE__ */ new Map(), s = o.deformations;
  return s && e.forEach((c, i) => {
    var _a;
    if (c.length !== 3) return;
    const u = (_a = n.cltLayups) == null ? void 0 : _a.get(i);
    if (!u) return;
    const l = c.map((g) => t[g]), f = C(c, s), d = P(l), h = E(d, f), m = N(l, d), p = V(m, h);
    r.set(i, U(u, p, { mode: a == null ? void 0 : a.mode }));
  }), r;
}
function nt(t, e, n, o) {
  const a = t[e];
  if (!a) return;
  const r = a.points.find((i) => i.point === n);
  if (!r) return;
  const s = o === "sigma1" || o === "sigma2" || o === "tau12", c = o === "sigmaX" || o === "sigma1" ? 0 : o === "sigmaY" || o === "sigma2" ? 1 : 2;
  return s ? r.stressLayer[c] : r.stressShell[c];
}
function ot(t, e, n, o) {
  const a = t[e];
  if (!a) return;
  const r = a.points.find((i) => i.point === n);
  if (!r) return;
  const s = o === "tau13" || o === "tau23", c = o === "tauXZ" || o === "tau13" ? 1 : 0;
  return s ? r.tauLayer[c] : r.tauShell[c];
}
function C(t, e) {
  const n = [];
  return t.forEach((o) => {
    const a = e.get(o) ?? [0, 0, 0, 0, 0, 0];
    n.push(...a);
  }), n;
}
function N(t, e) {
  const [n, o, a] = t[0], r = [[e[0][0], e[0][1], e[0][2]], [e[1][0], e[1][1], e[1][2]], [e[2][0], e[2][1], e[2][2]]];
  return t.map(([s, c, i]) => {
    const u = [s - n, c - o, i - a], l = st(r, u);
    return [l[0], l[1], l[2]];
  });
}
function st(t, e) {
  return [t[0][0] * e[0] + t[0][1] * e[1] + t[0][2] * e[2], t[1][0] * e[0] + t[1][1] * e[1] + t[1][2] * e[2], t[2][0] * e[0] + t[2][1] * e[1] + t[2][2] * e[2]];
}
function rt(t, e, n) {
  const o = [];
  return t.forEach((a) => {
    a.points.forEach((r) => {
      const s = e === "sigma1" || e === "sigma2" || e === "tau12" ? r.stressLayer : r.stressShell, c = e === "sigmaX" || e === "sigma1" ? 0 : e === "sigmaY" || e === "sigma2" ? 1 : 2;
      o.push({ layerIndex: a.layerIndex, point: r.point, zGlobal: r.zGlobal, value: s[c] });
    });
  }), G(o);
}
function at(t, e, n) {
  const o = [];
  return t.forEach((a) => {
    a.points.forEach((r) => {
      const s = e === "tau13" || e === "tau23" ? r.tauLayer : r.tauShell, c = e === "tauXZ" || e === "tau13" ? 1 : 0;
      o.push({ layerIndex: a.layerIndex, point: r.point, zGlobal: r.zGlobal, value: s[c] });
    });
  }), G(o);
}
function ht(t) {
  if (!t.length) return { min: 0, max: 0, maxAbs: 0 };
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY, o, a;
  t.forEach((c) => {
    c.value < e && (e = c.value, o = c.zGlobal), c.value > n && (n = c.value, a = c.zGlobal);
  });
  const r = Math.max(Math.abs(e), Math.abs(n)), s = Math.abs(e) >= Math.abs(n) ? o : a;
  return { min: e, max: n, maxAbs: r, zAtMin: o, zAtMax: a, zAtMaxAbs: s };
}
function G(t, e) {
  return t;
}
function M(t, e, n, o) {
  var _a, _b;
  const a = ((_a = o == null ? void 0 : o.search) == null ? void 0 : _a.weightX) ?? 1, r = ((_b = o == null ? void 0 : o.search) == null ? void 0 : _b.weightY) ?? 1;
  let s, c = Number.POSITIVE_INFINITY;
  return e.forEach((i, u) => {
    if (i.length !== 3 || (o == null ? void 0 : o.includeElement) && !o.includeElement(u)) return;
    const l = t[i[0]], f = t[i[1]], d = t[i[2]], h = (l[0] + f[0] + d[0]) / 3, m = (l[1] + f[1] + d[1]) / 3, p = h - n[0], g = m - n[1], z = Math.hypot(a * p, r * g);
    z < c && (c = z, s = u);
  }), s;
}
function ft(t, e, n, o, a, r, s, c) {
  const i = M(t, e, o, { search: c, includeElement: (f) => n.has(f) });
  if (i === void 0) return;
  const u = n.get(i);
  if (!u) return;
  const l = nt(u, a, r, s);
  if (l !== void 0) return l / 1e3;
}
function dt(t, e, n, o, a, r, s, c) {
  const i = M(t, e, o, { search: c, includeElement: (f) => n.has(f) });
  if (i === void 0) return;
  const u = n.get(i);
  if (!u) return;
  const l = ot(u, a, r, s);
  if (l !== void 0) return l / 1e3;
}
function pt(t, e, n, o, a, r) {
  const s = w(t, e, n, o, r);
  if (!s) return;
  const c = rt(s.profile, a);
  return Y(c);
}
function mt(t, e, n, o, a, r) {
  const s = w(t, e, n, o, r);
  if (!s) return;
  const c = at(s.profile, a);
  return Y(c);
}
function w(t, e, n, o, a) {
  const r = M(t, e, o, { search: a, includeElement: (c) => n.has(c) });
  if (r === void 0) return;
  const s = n.get(r);
  if (s) return { profile: s };
}
function Y(t) {
  return t.map((e) => ({ ...e, value: e.value / 1e3 }));
}
export {
  pt as a,
  dt as b,
  mt as c,
  lt as d,
  ht as g,
  ut as r,
  ft as s
};
