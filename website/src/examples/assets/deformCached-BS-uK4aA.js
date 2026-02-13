import { c as E, __tla as __tla_0 } from "./deformCpp-77svjSoa.js";
import { g as v, a as N, m as A, t as T, s as g, i as y, l as B, b as J, c as L, f as j } from "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
let Q;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function q(n, o, r, t) {
    let e = Array(t).fill(0).map(() => Array(t).fill(0));
    return o.forEach((f, a) => {
      const s = f.map((h) => n[h]), c = v(s, r, a), m = N(s), p = A(T(m), A(c, m));
      e = M(e, p, f);
    }), e;
  }
  function M(n, o, r) {
    const t = r.length === 3, e = 6 * r[0], f = 6 * r[1], a = t ? 6 * r[2] : void 0;
    for (let s = 0; s < 6; s++) for (let c = 0; c < 6; c++) n[e + s][e + c] += o[s][c], n[f + s][e + c] += o[s + 6][c], t && (n[a + s][e + c] += o[s + 12][c]), n[e + s][f + c] += o[s][c + 6], n[f + s][f + c] += o[s + 6][c + 6], t && (n[a + s][f + c] += o[s + 12][c + 6]), t && (n[e + s][a + c] += o[s][c + 12], n[f + s][a + c] += o[s + 6][c + 12], n[a + s][a + c] += o[s + 12][c + 12]);
    return n;
  }
  Q = function(n, o, r, t) {
    if (n.length === 0 || o.length === 0) throw new Error("createCachedDeformSolver requires non-empty nodes/elements");
    if (typeof window < "u" || typeof self < "u" && typeof self.importScripts == "function") try {
      return E(n, o, r, t);
    } catch (f) {
      console.warn("Falling back to JS cached solver", f);
    }
    return V(n, o, r, t);
  };
  function V(n, o, r, t) {
    var _a;
    const e = n.length * 6, f = z(r, e), a = Array.from(((_a = r == null ? void 0 : r.keys) == null ? void 0 : _a.call(r)) ?? []), s = performance.now(), c = q(n, o, t, e), m = g(c, y(f, f)), p = B(J(m)), h = performance.now() - s;
    return {
      dof: e,
      freeDof: f.length,
      setupTimeMs: h,
      solve: (F = /* @__PURE__ */ new Map(), R = {}) => {
        const d = H(F, e), C = g(d, y(f)), D = L(p, C), i = g(Array(e).fill(0), y(f), j(D)), w = _(n.length, i);
        if (!(R.includeReactions ?? false) || a.length === 0) return {
          deformations: w,
          reactions: /* @__PURE__ */ new Map()
        };
        const S = /* @__PURE__ */ new Map();
        return a.forEach((l) => {
          S.set(l, [
            u(c[l * 6], i),
            u(c[l * 6 + 1], i),
            u(c[l * 6 + 2], i),
            u(c[l * 6 + 3], i),
            u(c[l * 6 + 4], i),
            u(c[l * 6 + 5], i)
          ]);
        }), {
          deformations: w,
          reactions: S
        };
      },
      dispose: () => {
      }
    };
  }
  function _(n, o) {
    const r = /* @__PURE__ */ new Map();
    for (let t = 0; t < n; t++) r.set(t, [
      o[t * 6],
      o[t * 6 + 1],
      o[t * 6 + 2],
      o[t * 6 + 3],
      o[t * 6 + 4],
      o[t * 6 + 5]
    ]);
    return r;
  }
  function u(n, o) {
    let r = 0;
    for (let t = 0; t < n.length; t++) r += n[t] * o[t];
    return r;
  }
  function z(n, o) {
    const r = Array(o).fill(false);
    return n == null ? void 0 : n.forEach((t, e) => {
      t[0] && (r[e * 6] = true), t[1] && (r[e * 6 + 1] = true), t[2] && (r[e * 6 + 2] = true), t[3] && (r[e * 6 + 3] = true), t[4] && (r[e * 6 + 4] = true), t[5] && (r[e * 6 + 5] = true);
    }), Array(o).fill(0).map((t, e) => e).filter((t) => !r[t]);
  }
  function H(n, o) {
    const r = Array(o).fill(0);
    return n == null ? void 0 : n.forEach((t, e) => {
      r[e * 6] = t[0], r[e * 6 + 1] = t[1], r[e * 6 + 2] = t[2], r[e * 6 + 3] = t[3], r[e * 6 + 4] = t[4], r[e * 6 + 5] = t[5];
    }), r;
  }
});
export {
  __tla,
  Q as c
};
