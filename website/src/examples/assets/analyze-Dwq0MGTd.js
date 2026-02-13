import { a as F, m as h, g as D, d as y, e as l, h as P, j as R, k as j } from "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
function Q(t, s, i, o) {
  const n = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map(), bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map(), membraneXX: /* @__PURE__ */ new Map(), membraneYY: /* @__PURE__ */ new Map(), membraneXY: /* @__PURE__ */ new Map(), tranverseShearX: /* @__PURE__ */ new Map(), tranverseShearY: /* @__PURE__ */ new Map() }, a = { bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map(), membraneXX: /* @__PURE__ */ new Map(), membraneYY: /* @__PURE__ */ new Map(), membraneXY: /* @__PURE__ */ new Map() };
  s.forEach((m, e) => {
    const c = m.map((M) => t[M]), g = m.reduce((M, r) => M.concat(o.deformations.get(r)), []), p = F(c), f = h(p, g);
    if (m.length === 2) {
      const M = D(c, i, e);
      let r = h(M, f);
      n.normals.set(e, [r[0], r[6]]), n.shearsY.set(e, [r[1], r[7]]), n.shearsZ.set(e, [r[2], r[8]]), n.torsions.set(e, [r[3], r[9]]), n.bendingsY.set(e, [r[4], r[10]]), n.bendingsZ.set(e, [r[5], r[11]]);
    } else {
      const { membraneStiffness3x3Matrix: M, bendingStiffness3x3Matrix: r } = G(i, e), x = V(c), X = B(g), u = H(c), v = h(1 / (2 * u), h(x, X)).toArray(), E = y(v.map((S) => [S[0]])), A = y(v.map((S) => [S[1]])), N = h(M, E), O = h(r, A), w = N.toArray(), d = O.toArray(), _ = w[0][0], T = w[1][0], k = w[2][0], C = d[0][0], Z = d[1][0], z = d[2][0];
      a.membraneXX.set(e, _), a.membraneYY.set(e, T), a.membraneXY.set(e, k), a.bendingXX.set(e, C), a.bendingYY.set(e, Z), a.bendingXY.set(e, z);
    }
  });
  const Y = J(s);
  return s.forEach((m, e) => {
    if (m.length !== 3) return;
    let c = [0, 0, 0], g = [0, 0, 0], p = [0, 0, 0], f = [0, 0, 0], M = [0, 0, 0], r = [0, 0, 0];
    m.forEach((x, X) => {
      const u = Y.get(x) || [];
      c[X] = l(u.map((b) => a.membraneXX.get(b) ?? 0)), g[X] = l(u.map((b) => a.membraneYY.get(b) ?? 0)), p[X] = l(u.map((b) => a.membraneXY.get(b) ?? 0)), f[X] = l(u.map((b) => a.bendingXX.get(b) ?? 0)), M[X] = l(u.map((b) => a.bendingYY.get(b) ?? 0)), r[X] = l(u.map((b) => a.bendingXY.get(b) ?? 0));
    }), n.membraneXX.set(e, c), n.membraneYY.set(e, g), n.membraneXY.set(e, p), n.bendingXX.set(e, f), n.bendingYY.set(e, M), n.bendingXY.set(e, r);
  }), n;
}
function q(t, s) {
  var _a, _b, _c, _d;
  const i = ((_a = t.elasticities) == null ? void 0 : _a.get(s)) ?? 0, o = ((_b = t.elasticitiesOrthogonal) == null ? void 0 : _b.get(s)) ?? 0, n = ((_c = t.poissonsRatios) == null ? void 0 : _c.get(s)) ?? 0, a = ((_d = t.shearModuli) == null ? void 0 : _d.get(s)) ?? 0;
  return o > 0 ? R(i, o, a, n) : j(i, n);
}
function G(t, s) {
  var _a, _b;
  const i = (_a = t.cltLayups) == null ? void 0 : _a.get(s);
  if (i) {
    const a = P(i);
    return { membraneStiffness3x3Matrix: y(a.A), bendingStiffness3x3Matrix: y(a.D) };
  }
  const o = ((_b = t.thicknesses) == null ? void 0 : _b.get(s)) ?? 1, n = q(t, s);
  return { membraneStiffness3x3Matrix: h(n, o), bendingStiffness3x3Matrix: h(n, o ** 3 / 12) };
}
function V(t) {
  const [s, i] = t[0], [o, n] = t[1], [a, Y] = t[2], m = n - Y, e = Y - i, c = i - n, g = a - o, p = s - a, f = o - s;
  return y([[m, e, c, 0, 0, 0], [0, 0, 0, g, p, f], [g, p, f, m, e, c]]);
}
function B(t) {
  const [s, i, o] = [t[0], t[6], t[12]], [n, a, Y] = [t[1], t[7], t[13]], [m, e, c] = [t[4], t[10], t[16]], [g, p, f] = [t[3], t[9], t[15]];
  return y([[s, -m], [i, -e], [o, -c], [n, g], [a, p], [Y, f]]);
}
function H(t) {
  const [s, i] = t[0], [o, n] = t[1], [a, Y] = t[2], m = o - s, e = a - s, c = Y - i, g = i - n;
  return 0.5 * (m * c - e * -g);
}
function J(t) {
  const s = /* @__PURE__ */ new Map();
  return t.forEach((i, o) => {
    i.forEach((n) => {
      var _a;
      s.has(n) || s.set(n, []), (_a = s.get(n)) == null ? void 0 : _a.push(o);
    });
  }), s;
}
export {
  Q as a
};
