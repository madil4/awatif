import { B as p, k as y } from "./styles-C277HhWC.js";
function T(o, h = false) {
  const n = o[0].index !== null, a = new Set(Object.keys(o[0].attributes)), c = new Set(Object.keys(o[0].morphAttributes)), m = {}, l = {}, d = o[0].morphTargetsRelative, s = new p();
  let f = 0;
  for (let e = 0; e < o.length; ++e) {
    const r = o[e];
    let i = 0;
    if (n !== (r.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const t in r.attributes) {
      if (!a.has(t)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + t + '" attribute exists among all geometries, or in none of them.'), null;
      m[t] === void 0 && (m[t] = []), m[t].push(r.attributes[t]), i++;
    }
    if (i !== a.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
    if (d !== r.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const t in r.morphAttributes) {
      if (!c.has(t)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
      l[t] === void 0 && (l[t] = []), l[t].push(r.morphAttributes[t]);
    }
    if (h) {
      let t;
      if (n) t = r.index.count;
      else if (r.attributes.position !== void 0) t = r.attributes.position.count;
      else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
      s.addGroup(f, t, e), f += t;
    }
  }
  if (n) {
    let e = 0;
    const r = [];
    for (let i = 0; i < o.length; ++i) {
      const t = o[i].index;
      for (let u = 0; u < t.count; ++u) r.push(t.getX(u) + e);
      e += o[i].attributes.position.count;
    }
    s.setIndex(r);
  }
  for (const e in m) {
    const r = g(m[e]);
    if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
    s.setAttribute(e, r);
  }
  for (const e in l) {
    const r = l[e][0].length;
    if (r === 0) break;
    s.morphAttributes = s.morphAttributes || {}, s.morphAttributes[e] = [];
    for (let i = 0; i < r; ++i) {
      const t = [];
      for (let b = 0; b < l[e].length; ++b) t.push(l[e][b][i]);
      const u = g(t);
      if (!u) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
      s.morphAttributes[e].push(u);
    }
  }
  return s;
}
function g(o) {
  let h, n, a, c = -1, m = 0;
  for (let f = 0; f < o.length; ++f) {
    const e = o[f];
    if (h === void 0 && (h = e.array.constructor), h !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (n === void 0 && (n = e.itemSize), n !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (a === void 0 && (a = e.normalized), a !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (c === -1 && (c = e.gpuType), c !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    m += e.count * n;
  }
  const l = new h(m), d = new y(l, n, a);
  let s = 0;
  for (let f = 0; f < o.length; ++f) {
    const e = o[f];
    if (e.isInterleavedBufferAttribute) {
      const r = s / n;
      for (let i = 0, t = e.count; i < t; i++) for (let u = 0; u < n; u++) {
        const b = e.getComponent(i, u);
        d.setComponent(i + r, u, b);
      }
    } else l.set(e.array, s);
    s += e.count * n;
  }
  return c !== void 0 && (d.gpuType = c), d;
}
export {
  T as m
};
