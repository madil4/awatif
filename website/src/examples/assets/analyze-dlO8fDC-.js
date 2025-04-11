import { g as d, a as w } from "./deform-Bjt4qPV-.js";
import { m as l } from "./pureFunctionsAny.generated-HP0TxL6F.js";
function x(o, i, m, e) {
  const n = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map() };
  return i.forEach((t, a) => {
    const r = o[t[0]], c = o[t[1]], p = [...e.deformations.get(t[0]), ...e.deformations.get(t[1])], f = d([r, c]), g = l(f, p), M = w([r, c], m, a);
    let s = l(M, g);
    n.normals.set(a, [s[0], s[6]]), n.shearsY.set(a, [s[1], s[7]]), n.shearsZ.set(a, [s[2], s[8]]), n.torsions.set(a, [s[3], s[9]]), n.bendingsY.set(a, [s[4], s[10]]), n.bendingsZ.set(a, [s[5], s[11]]);
  }), n;
}
export {
  x as a
};
