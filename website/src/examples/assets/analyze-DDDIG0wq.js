import { g as i, m as f, a as p, __tla as __tla_0 } from "./deform-C3_9Anee.js";
let b;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  b = function(n, c, l, o) {
    const e = {
      normals: /* @__PURE__ */ new Map(),
      shearsY: /* @__PURE__ */ new Map(),
      shearsZ: /* @__PURE__ */ new Map(),
      torsions: /* @__PURE__ */ new Map(),
      bendingsY: /* @__PURE__ */ new Map(),
      bendingsZ: /* @__PURE__ */ new Map()
    };
    return c.forEach((a, s) => {
      const g = n[a[0]], r = n[a[1]], m = [
        ...o.deformations.get(a[0]),
        ...o.deformations.get(a[1])
      ], M = i([
        g,
        r
      ]).matMul(new f(m));
      let t = p([
        g,
        r
      ], l, s).matMul(M);
      e.normals.set(s, [
        t.get(0, 0),
        t.get(6, 0)
      ]), e.shearsY.set(s, [
        t.get(1, 0),
        t.get(7, 0)
      ]), e.shearsZ.set(s, [
        t.get(2, 0),
        t.get(8, 0)
      ]), e.torsions.set(s, [
        t.get(3, 0),
        t.get(9, 0)
      ]), e.bendingsY.set(s, [
        t.get(4, 0),
        t.get(10, 0)
      ]), e.bendingsZ.set(s, [
        t.get(5, 0),
        t.get(11, 0)
      ]);
    }), e;
  };
});
export {
  __tla,
  b as a
};
