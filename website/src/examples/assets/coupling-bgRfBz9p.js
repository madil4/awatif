function h(n, e = 1e-4) {
  const t = M(e), o = [], s = [];
  n.forEach((r) => {
    const c = t.appendPatch(r);
    o.push(c.nodeMap), s.push(c.elementMap);
  });
  const { nodes: a, elements: u } = t.getMesh();
  return { nodes: a, elements: u, nodeMaps: o, elementMaps: s };
}
function w(n, e, t = 1e-4) {
  const o = h([n, e], t);
  return { nodes: o.nodes, elements: o.elements, wallANodeMap: o.nodeMaps[0] ?? [], wallBNodeMap: o.nodeMaps[1] ?? [], wallAElementMap: o.elementMaps[0] ?? [], wallBElementMap: o.elementMaps[1] ?? [] };
}
function M(n = 1e-4) {
  const e = [], t = [], o = g(n);
  function s(u) {
    const r = u.nodes.map((i) => {
      const l = k(e, i, o);
      if (l !== null) return l;
      const p = e.length;
      return e.push(i), N(i, p, o), p;
    }), c = [], d = [];
    return u.elements.forEach((i) => {
      const l = i.map((p) => r[p]);
      m(l) || (c.push(t.length), d.push(l), t.push(l));
    }), { nodeMap: r, elementMap: c, elementsGlobal: d };
  }
  function a() {
    return { nodes: e, elements: t };
  }
  return { appendPatch: s, getMesh: a };
}
function m(n) {
  return new Set(n).size !== n.length;
}
function g(n) {
  return { tolerance: n, buckets: /* @__PURE__ */ new Map() };
}
function k(n, e, t) {
  const o = x(e, t.tolerance), s = t.tolerance * t.tolerance;
  for (const a of o) {
    const u = t.buckets.get(a);
    if (u == null ? void 0 : u.length) for (const r of u) {
      const c = n[r], d = c[0] - e[0], i = c[1] - e[1], l = c[2] - e[2];
      if (d * d + i * i + l * l <= s) return r;
    }
  }
  return null;
}
function N(n, e, t) {
  const o = y(n, t.tolerance), s = t.buckets.get(o) ?? [];
  s.push(e), t.buckets.set(o, s);
}
function x(n, e) {
  const [t, o, s] = f(n, e), a = [];
  for (let u = -1; u <= 1; u++) for (let r = -1; r <= 1; r++) for (let c = -1; c <= 1; c++) a.push(`${t + u}:${o + r}:${s + c}`);
  return a;
}
function y(n, e) {
  const [t, o, s] = f(n, e);
  return `${t}:${o}:${s}`;
}
function f(n, e) {
  return [Math.floor(n[0] / e), Math.floor(n[1] / e), Math.floor(n[2] / e)];
}
export {
  M as a,
  w as c
};
