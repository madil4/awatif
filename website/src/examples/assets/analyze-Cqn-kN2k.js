import { a as D, m as h, g as P, d as y, e as l, h as R, j, k as q } from "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
function W(t, a, r, i) {
  const n = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map(), bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map(), membraneXX: /* @__PURE__ */ new Map(), membraneYY: /* @__PURE__ */ new Map(), membraneXY: /* @__PURE__ */ new Map(), tranverseShearX: /* @__PURE__ */ new Map(), tranverseShearY: /* @__PURE__ */ new Map() }, e = { bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map(), membraneXX: /* @__PURE__ */ new Map(), membraneYY: /* @__PURE__ */ new Map(), membraneXY: /* @__PURE__ */ new Map() };
  a.forEach((c, s) => {
    const m = c.map((u) => t[u]), p = c.reduce((u, o) => u.concat(i.deformations.get(o)), []), Y = D(m), w = h(Y, p);
    if (c.length === 2) {
      const u = P(m, r, s);
      let o = h(u, w);
      n.normals.set(s, [o[0], o[6]]), n.shearsY.set(s, [o[1], o[7]]), n.shearsZ.set(s, [o[2], o[8]]), n.torsions.set(s, [o[3], o[9]]), n.bendingsY.set(s, [o[4], o[10]]), n.bendingsZ.set(s, [o[5], o[11]]);
    } else {
      const { membraneStiffness3x3Matrix: u, bendingStiffness3x3Matrix: o } = V(r, s), x = B(m), f = H(p), X = J(m), N = h(1 / (2 * X), h(x, f)).toArray(), d = y(N.map((E) => [E[0]])), A = y(N.map((E) => [E[1]])), O = h(u, d), T = h(o, A), S = O.toArray(), v = T.toArray(), _ = S[0][0], k = S[1][0], z = S[2][0], F = v[0][0], Z = v[1][0], C = v[2][0];
      e.membraneXX.set(s, _), e.membraneYY.set(s, k), e.membraneXY.set(s, z), e.bendingXX.set(s, F), e.bendingYY.set(s, Z), e.bendingXY.set(s, C);
    }
  });
  const { nodeToCentroidNodesMap: M, nodeToCentroidElementIndiciesMap: b } = K(t, a);
  return a.forEach((c, s) => {
    if (c.length !== 3) return;
    let m = [0, 0, 0], p = [0, 0, 0], Y = [0, 0, 0], w = [0, 0, 0], u = [0, 0, 0], o = [0, 0, 0];
    c.forEach((x, f) => {
      M.get(x);
      const X = b.get(x) || [];
      m[f] = l(X.map((g) => e.membraneXX.get(g) ?? 0)), p[f] = l(X.map((g) => e.membraneYY.get(g) ?? 0)), Y[f] = l(X.map((g) => e.membraneXY.get(g) ?? 0)), w[f] = l(X.map((g) => e.bendingXX.get(g) ?? 0)), u[f] = l(X.map((g) => e.bendingYY.get(g) ?? 0)), o[f] = l(X.map((g) => e.bendingXY.get(g) ?? 0));
    }), n.membraneXX.set(s, m), n.membraneYY.set(s, p), n.membraneXY.set(s, Y), n.bendingXX.set(s, w), n.bendingYY.set(s, u), n.bendingXY.set(s, o);
  }), n;
}
function G(t, a) {
  var _a, _b, _c, _d, _e;
  const r = ((_a = t.elasticities) == null ? void 0 : _a.get(a)) ?? 0, i = ((_b = t.elasticitiesOrthogonal) == null ? void 0 : _b.get(a)) ?? 0, n = ((_c = t.poissonsRatios) == null ? void 0 : _c.get(a)) ?? 0, e = ((_d = t.shearModuli) == null ? void 0 : _d.get(a)) ?? 0;
  return (_e = t.thicknesses) == null ? void 0 : _e.get(a), i > 0 ? j(r, i, e, n) : q(r, n);
}
function V(t, a) {
  var _a, _b;
  const r = (_a = t.cltLayups) == null ? void 0 : _a.get(a);
  if (r) {
    const e = R(r);
    return { membraneStiffness3x3Matrix: y(e.A), bendingStiffness3x3Matrix: y(e.D) };
  }
  const i = ((_b = t.thicknesses) == null ? void 0 : _b.get(a)) ?? 1, n = G(t, a);
  return { membraneStiffness3x3Matrix: h(n, i), bendingStiffness3x3Matrix: h(n, i ** 3 / 12) };
}
function B(t) {
  const [a, r] = t[0], [i, n] = t[1], [e, M] = t[2], b = n - M, c = M - r, s = r - n, m = e - i, p = a - e, Y = i - a;
  return y([[b, c, s, 0, 0, 0], [0, 0, 0, m, p, Y], [m, p, Y, b, c, s]]);
}
function H(t) {
  const [a, r, i] = [t[0], t[6], t[12]], [n, e, M] = [t[1], t[7], t[13]], [b, c, s] = [t[4], t[10], t[16]], [m, p, Y] = [t[3], t[9], t[15]];
  return y([[a, -b], [r, -c], [i, -s], [n, m], [e, p], [M, Y]]);
}
function J(t) {
  const [a, r] = t[0], [i, n] = t[1], [e, M] = t[2], b = i - a, c = e - a, s = M - r, m = r - n;
  return 0.5 * (b * s - c * -m);
}
function K(t, a) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  return a.forEach((n, e) => {
    const M = n.map((c) => t[c]), b = Q(M);
    n.forEach((c) => {
      var _a, _b;
      r.has(c) || r.set(c, []), (_a = r.get(c)) == null ? void 0 : _a.push(b), i.has(c) || i.set(c, []), (_b = i.get(c)) == null ? void 0 : _b.push(e);
    });
  }), { nodeToCentroidNodesMap: r, nodeToCentroidElementIndiciesMap: i };
}
function Q(t) {
  const a = t.reduce((n, e) => n + e[0], 0) / t.length, r = t.reduce((n, e) => n + e[1], 0) / t.length, i = t.reduce((n, e) => n + e[2], 0) / t.length;
  return [a, r, i];
}
export {
  W as a
};
