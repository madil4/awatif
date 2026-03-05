import { c as v, __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { a as N, g as T, m as R, t as B, s as y, i as w, b as J, d as L, e as j, f as q } from "./getLocalStiffnessMatrix-BSrjxkfr.js";
let U;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function M(n, o, r, t) {
    let e = Array(t).fill(0).map(() => Array(t).fill(0));
    return o.forEach((f, a) => {
      const s = f.map((g) => n[g]), c = N(s, r, a), p = T(s), h = R(B(p), R(c, p));
      e = V(e, h, f);
    }), e;
  }
  function V(n, o, r) {
    const t = r.length === 3, e = 6 * r[0], f = 6 * r[1], a = t ? 6 * r[2] : void 0;
    for (let s = 0; s < 6; s++) for (let c = 0; c < 6; c++) n[e + s][e + c] += o[s][c], n[f + s][e + c] += o[s + 6][c], t && (n[a + s][e + c] += o[s + 12][c]), n[e + s][f + c] += o[s][c + 6], n[f + s][f + c] += o[s + 6][c + 6], t && (n[a + s][f + c] += o[s + 12][c + 6]), t && (n[e + s][a + c] += o[s][c + 12], n[f + s][a + c] += o[s + 6][c + 12], n[a + s][a + c] += o[s + 12][c + 12]);
    return n;
  }
  U = function(n, o, r, t) {
    if (n.length === 0 || o.length === 0) throw new Error("createCachedDeformSolver requires non-empty nodes/elements");
    if (typeof window < "u" || typeof self < "u" && typeof self.importScripts == "function") try {
      return v(n, o, r, t);
    } catch (f) {
      console.warn("Falling back to JS cached solver", f);
    }
    return _(n, o, r, t);
  };
  function _(n, o, r, t) {
    var _a;
    const e = n.length * 6, f = H(r, e), a = Array.from(((_a = r == null ? void 0 : r.keys) == null ? void 0 : _a.call(r)) ?? []), s = performance.now(), c = M(n, o, t, e), p = y(c, w(f, f)), h = J(L(p)), g = performance.now() - s;
    return {
      dof: e,
      freeDof: f.length,
      setupTimeMs: g,
      solve: (S = /* @__PURE__ */ new Map(), C = {}) => {
        const D = K(S, e), E = y(D, w(f)), d = j(h, E), l = y(Array(e).fill(0), w(f), q(d)), A = z(n.length, l);
        if (!(C.includeReactions ?? false) || a.length === 0) return {
          deformations: A,
          reactions: /* @__PURE__ */ new Map()
        };
        const F = /* @__PURE__ */ new Map();
        return a.forEach((i) => {
          const u = (S == null ? void 0 : S.get(i)) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          F.set(i, [
            m(c[i * 6], l) - u[0],
            m(c[i * 6 + 1], l) - u[1],
            m(c[i * 6 + 2], l) - u[2],
            m(c[i * 6 + 3], l) - u[3],
            m(c[i * 6 + 4], l) - u[4],
            m(c[i * 6 + 5], l) - u[5]
          ]);
        }), {
          deformations: A,
          reactions: F
        };
      },
      dispose: () => {
      }
    };
  }
  function z(n, o) {
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
  function m(n, o) {
    let r = 0;
    for (let t = 0; t < n.length; t++) r += n[t] * o[t];
    return r;
  }
  function H(n, o) {
    const r = Array(o).fill(false);
    return n == null ? void 0 : n.forEach((t, e) => {
      t[0] && (r[e * 6] = true), t[1] && (r[e * 6 + 1] = true), t[2] && (r[e * 6 + 2] = true), t[3] && (r[e * 6 + 3] = true), t[4] && (r[e * 6 + 4] = true), t[5] && (r[e * 6 + 5] = true);
    }), Array(o).fill(0).map((t, e) => e).filter((t) => !r[t]);
  }
  function K(n, o) {
    const r = Array(o).fill(0);
    return n == null ? void 0 : n.forEach((t, e) => {
      r[e * 6] = t[0], r[e * 6 + 1] = t[1], r[e * 6 + 2] = t[2], r[e * 6 + 3] = t[3], r[e * 6 + 4] = t[4], r[e * 6 + 5] = t[5];
    }), r;
  }
});
export {
  __tla,
  U as c
};
