import { f as I, B as G, c as O, F, h as z, M as L, i as D, S as U, P as X, j as S, k as M, l as H } from "./styles-BHEEcEe8.js";
function K() {
  const n = new I(new G(), new O());
  return n.frustumCulled = false, n.material.depthTest = false, n;
}
function N(n, m, i) {
  const p = new G(), A = 4, c = i.flatMap((b) => {
    const s = n[b], g = [s[0], s[1], s[2] - A];
    return [...s, ...g];
  }), h = m.map((b) => _(b).map((s) => [...n[s[0]], ...n[s[1]]]).flat()).flat();
  return p.setAttribute("position", new F([...c, ...h], 3)), p;
}
function _(n) {
  if (n.length === 2) return [n];
  const m = [];
  for (let i = 0; i < n.length; i++) m.push([n[i], n[(i + 1) % n.length]]);
  return m;
}
function R(n, m = false) {
  const i = n[0].index !== null, p = new Set(Object.keys(n[0].attributes)), A = new Set(Object.keys(n[0].morphAttributes)), c = {}, h = {}, b = n[0].morphTargetsRelative, s = new G();
  let g = 0;
  for (let e = 0; e < n.length; ++e) {
    const r = n[e];
    let o = 0;
    if (i !== (r.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const t in r.attributes) {
      if (!p.has(t)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + t + '" attribute exists among all geometries, or in none of them.'), null;
      c[t] === void 0 && (c[t] = []), c[t].push(r.attributes[t]), o++;
    }
    if (o !== p.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
    if (b !== r.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const t in r.morphAttributes) {
      if (!A.has(t)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
      h[t] === void 0 && (h[t] = []), h[t].push(r.morphAttributes[t]);
    }
    if (m) {
      let t;
      if (i) t = r.index.count;
      else if (r.attributes.position !== void 0) t = r.attributes.position.count;
      else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
      s.addGroup(g, t, e), g += t;
    }
  }
  if (i) {
    let e = 0;
    const r = [];
    for (let o = 0; o < n.length; ++o) {
      const t = n[o].index;
      for (let l = 0; l < t.count; ++l) r.push(t.getX(l) + e);
      e += n[o].attributes.position.count;
    }
    s.setIndex(r);
  }
  for (const e in c) {
    const r = v(c[e]);
    if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
    s.setAttribute(e, r);
  }
  for (const e in h) {
    const r = h[e][0].length;
    if (r === 0) break;
    s.morphAttributes = s.morphAttributes || {}, s.morphAttributes[e] = [];
    for (let o = 0; o < r; ++o) {
      const t = [];
      for (let u = 0; u < h[e].length; ++u) t.push(h[e][u][o]);
      const l = v(t);
      if (!l) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
      s.morphAttributes[e].push(l);
    }
  }
  return s;
}
function v(n) {
  let m, i, p, A = -1, c = 0;
  for (let g = 0; g < n.length; ++g) {
    const e = n[g];
    if (m === void 0 && (m = e.array.constructor), m !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (i === void 0 && (i = e.itemSize), i !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (p === void 0 && (p = e.normalized), p !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (A === -1 && (A = e.gpuType), A !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    c += e.count * i;
  }
  const h = new m(c), b = new z(h, i, p);
  let s = 0;
  for (let g = 0; g < n.length; ++g) {
    const e = n[g];
    if (e.isInterleavedBufferAttribute) {
      const r = s / i;
      for (let o = 0, t = e.count; o < t; o++) for (let l = 0; l < i; l++) {
        const u = e.getComponent(o, l);
        b.setComponent(o + r, l, u);
      }
    } else h.set(e.array, s);
    s += e.count * i;
  }
  return A !== void 0 && (b.gpuType = A), b;
}
function Q() {
  return new L(new G(), new D({ color: 16770764 }));
}
function Z(n, m, i) {
  var _a;
  const c = [];
  return ((_a = m[0]) == null ? void 0 : _a.length) > 2 && c.push(h(n, m)), i.length > 0 && c.push(b(n, i)), c.length > 0 ? R(c) : new G();
  function h(e, r, o = 0.3) {
    const t = [];
    for (let u = 0; u < r.length; u++) {
      const d = [];
      for (let y = 0; y < r[u].length; y++) {
        const E = r[u][y];
        d.push(e[E]);
      }
      if (d.length < 3) continue;
      s(d) && d.pop();
      const x = g(d), a = l(d, x * 0.3 / 2), w = new U();
      new X();
      for (let y = 0; y < a.length; y++) y == 0 ? w.moveTo(a[0][0], a[0][1]) : w.lineTo(a[y][0], a[y][1]);
      const f = new S(w, { depth: o, bevelEnabled: false });
      f.translate(0, 0, a[0][2] - o / 2), t.push(f);
    }
    return R(t);
    function l(u, d = 0) {
      const x = [], a = [];
      for (let f = 0; f < u.length; f++) a.push(new M(u[f][0], u[f][1]));
      let w = new z(new Float32Array([d, 0, 0]), 3);
      for (let f = 0; f < a.length; f++) {
        let y = new M().subVectors(a[f - 1 < 0 ? a.length - 1 : f - 1], a[f]), E = new M().subVectors(a[f + 1 == a.length ? 0 : f + 1], a[f]), C = (E.angle() - y.angle()) * 0.5, k = E.angle() + Math.PI * 0.5, P = Math.tan(C - Math.PI * 0.5), j = new H().set(1, 0, 0, 0, -P, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), B = k, V = new H().set(Math.cos(B), -Math.sin(B), 0, 0, Math.sin(B), Math.cos(B), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), W = new H().set(1, 0, 0, a[f].x, 0, 1, 0, a[f].y, 0, 0, 1, 0, 0, 0, 0, 1), T = w.clone();
        T.needsUpdate = true, T.applyMatrix4(j), T.applyMatrix4(V), T.applyMatrix4(W), x.push([T.getX(0), T.getY(0), u[f][2]]);
      }
      return x;
    }
  }
  function b(e, r) {
    const o = [], t = new U();
    t.lineTo(0 + 0.3, 0), t.lineTo(0 + 0.3, 0 + 0.3), t.lineTo(0, 0 + 0.3);
    for (let l = 0; l < r.length; l++) {
      const u = e[r[l]], d = new S(t, { depth: -4, bevelEnabled: false });
      d.translate(u[0] - 0.3 / 2, u[1] - 0.3 / 2, u[2]), o.push(d);
    }
    return R(o);
  }
  function s(e) {
    let r = false;
    const o = e[0], t = e[e.length - 1];
    return o[0] == t[0] && o[1] == t[1] && o[2] == t[2] && (r = true), r;
  }
  function g(e) {
    let r = 0;
    const o = s(e), t = o ? e.length - 1 : e.length;
    for (let l = 0; l < t; l++) {
      const [u, d] = e[l], x = (l + 1) % (o ? e.length : t), [a, w] = e[x];
      r += (a - u) * (w + d);
    }
    return r > 0 ? 1 : -1;
  }
}
export {
  K as a,
  N as b,
  Z as c,
  Q as g
};
