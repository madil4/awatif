import { B as M, j as P, b as Y, k as q, l as J, f as K, v as A, g as N, a as Q, F as Z, S as j, P as $, m as k, n as R, o as S } from "./styles-aHt-Mdxa.js";
import { g as ee } from "./getParameters-DjGKBsKO.js";
function U(o, d = false) {
  const f = o[0].index !== null, h = new Set(Object.keys(o[0].attributes)), p = new Set(Object.keys(o[0].morphAttributes)), c = {}, g = {}, i = o[0].morphTargetsRelative, l = new M();
  let a = 0;
  for (let e = 0; e < o.length; ++e) {
    const t = o[e];
    let s = 0;
    if (f !== (t.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const r in t.attributes) {
      if (!h.has(r)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + r + '" attribute exists among all geometries, or in none of them.'), null;
      c[r] === void 0 && (c[r] = []), c[r].push(t.attributes[r]), s++;
    }
    if (s !== h.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
    if (i !== t.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const r in t.morphAttributes) {
      if (!p.has(r)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
      g[r] === void 0 && (g[r] = []), g[r].push(t.morphAttributes[r]);
    }
    if (d) {
      let r;
      if (f) r = t.index.count;
      else if (t.attributes.position !== void 0) r = t.attributes.position.count;
      else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(a, r, e), a += r;
    }
  }
  if (f) {
    let e = 0;
    const t = [];
    for (let s = 0; s < o.length; ++s) {
      const r = o[s].index;
      for (let n = 0; n < r.count; ++n) t.push(r.getX(n) + e);
      e += o[s].attributes.position.count;
    }
    l.setIndex(t);
  }
  for (const e in c) {
    const t = C(c[e]);
    if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
    l.setAttribute(e, t);
  }
  for (const e in g) {
    const t = g[e][0].length;
    if (t === 0) break;
    l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[e] = [];
    for (let s = 0; s < t; ++s) {
      const r = [];
      for (let b = 0; b < g[e].length; ++b) r.push(g[e][b][s]);
      const n = C(r);
      if (!n) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
      l.morphAttributes[e].push(n);
    }
  }
  return l;
}
function C(o) {
  let d, f, h, p = -1, c = 0;
  for (let a = 0; a < o.length; ++a) {
    const e = o[a];
    if (d === void 0 && (d = e.array.constructor), d !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (f === void 0 && (f = e.itemSize), f !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (h === void 0 && (h = e.normalized), h !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (p === -1 && (p = e.gpuType), p !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    c += e.count * f;
  }
  const g = new d(c), i = new P(g, f, h);
  let l = 0;
  for (let a = 0; a < o.length; ++a) {
    const e = o[a];
    if (e.isInterleavedBufferAttribute) {
      const t = l / f;
      for (let s = 0, r = e.count; s < r; s++) for (let n = 0; n < f; n++) {
        const b = e.getComponent(s, n);
        i.setComponent(s + t, n, b);
      }
    } else g.set(e.array, l);
    l += e.count * f;
  }
  return p !== void 0 && (i.gpuType = p), i;
}
const w = { points: A.state([]), columns: A.state([]), slabs: A.state([]) }, B = [[0, 0, 4], [0, 10, 4], [18, 10, 4], [18, 0, 4], [0, 0, 4]], O = [[[0, 0, 0], [0, 0, 4]], [[0, 10, 0], [0, 10, 4]], [[18, 10, 0], [18, 10, 4]], [[18, 0, 0], [18, 0, 4]], [[6, 0, 0], [6, 0, 4]], [[6, 10, 0], [6, 10, 4]]], I = { stories: { value: A.state(2), min: 1, max: 5, step: 1 } }, V = new Y(new M(), new q({ color: 16770764 })), H = new J(new M(), new K());
H.frustumCulled = false;
H.material.depthTest = false;
const z = A.state([H]), te = A.state([V]);
A.derive(() => {
  const o = [], d = [], f = [];
  for (let h = 0; h < I.stories.value.val; h++) {
    const p = [], c = [], i = 4 * h;
    for (let e = 0; e < B.length; e++) p.push([B[e][0], B[e][1], B[e][2] + i]);
    const l = [], a = o.length;
    for (let e = 0; e < p.length; e++) o.push(p[e]), l.push(e + a);
    d.push([l]);
    for (let e = 0; e < O.length; e++) {
      const t = O[e];
      c.push([[t[0][0], t[0][1], t[0][2] + i], [t[1][0], t[1][1], t[1][2] + i]]);
    }
    for (let e = 0; e < c.length; e++) {
      const t = o.length;
      o.push(...c[e]), f.push([t, t + 1]);
    }
  }
  w.points.val = o, w.columns.val = f, w.slabs.val = d;
});
A.derive(() => {
  H.geometry = re(w.points.val, w.slabs.val, w.columns.val), V.geometry = oe(w.points.val, w.slabs.val, w.columns.val), z.val = [...z.rawVal];
});
document.body.append(ee(I), N({ objects3D: z, solids: te }), Q({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/solids/main.ts", author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/" }));
function re(o, d, f) {
  const h = new M(), p = f.map((i) => [o[i[0]], o[i[1]]].flat()).flat(), c = d.map((i) => g(i[0]).map((l) => [...o[l[0]], ...o[l[1]]]).flat()).flat();
  return h.setAttribute("position", new Z([...p, ...c], 3)), h;
  function g(i) {
    if (i.length === 2) return [i];
    const l = [];
    for (let a = 0; a < i.length; a++) l.push([i[a], i[(a + 1) % i.length]]);
    return l;
  }
}
function oe(o, d, f) {
  const c = i(o, d), g = l(o, f);
  return U([c, g]);
  function i(a, e, t = 0.3) {
    const s = [];
    for (let n = 0; n < e.length; n++) for (let b = 0; b < e[n].length; b++) {
      const T = [];
      for (let y = 0; y < e[n][b].length; y++) {
        const v = e[n][b][y];
        T.push(a[v]);
      }
      const u = r(T, 0.3 / 2), G = new j();
      new $();
      for (let y = 0; y < u.length; y++) y == 0 ? G.moveTo(u[0][0], u[0][1]) : G.lineTo(u[y][0], u[y][1]);
      const m = new k(G, { depth: t, bevelEnabled: false });
      m.translate(0, 0, u[0][2] - t / 2), s.push(m);
    }
    return U(s);
    function r(n, b = 0) {
      const T = [], u = [];
      for (let m = 0; m < n.length; m++) u.push(new R(n[m][0], n[m][1]));
      let G = new P(new Float32Array([b, 0, 0]), 3);
      for (let m = 0; m < u.length - 1; m++) {
        let y = new R().subVectors(u[m - 1 < 0 ? u.length - 1 : m - 1], u[m]), v = new R().subVectors(u[m + 1 == u.length ? 0 : m + 1], u[m]), F = (v.angle() - y.angle()) * 0.5, L = v.angle() + Math.PI * 0.5, W = Math.tan(F - Math.PI * 0.5), _ = new S().set(1, 0, 0, 0, -W, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), E = L, X = new S().set(Math.cos(E), -Math.sin(E), 0, 0, Math.sin(E), Math.cos(E), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), D = new S().set(1, 0, 0, u[m].x, 0, 1, 0, u[m].y, 0, 0, 1, 0, 0, 0, 0, 1), x = G.clone();
        x.needsUpdate = true, x.applyMatrix4(_), x.applyMatrix4(X), x.applyMatrix4(D), T.push([x.getX(0), x.getY(0), n[m][2]]);
      }
      return T;
    }
  }
  function l(a, e) {
    const t = [], s = new j();
    s.lineTo(0 + 0.3, 0), s.lineTo(0 + 0.3, 0 + 0.3), s.lineTo(0, 0 + 0.3);
    for (let r = 0; r < e.length; r++) {
      const n = a[e[r][0]], T = a[e[r][1]][2] - n[2], u = new k(s, { depth: T, bevelEnabled: false });
      u.translate(n[0] - 0.3 / 2, n[1] - 0.3 / 2, n[2]), t.push(u);
    }
    return U(t);
  }
}
