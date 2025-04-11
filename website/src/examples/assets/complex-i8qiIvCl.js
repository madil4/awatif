function tn() {
  return tn = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = arguments[n];
      for (var i in t) ({}).hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, tn.apply(null, arguments);
}
function rn() {
  return true;
}
function ee() {
  return false;
}
function Me() {
}
const sn = "Argument is not a typed-function.";
function cn() {
  function e(u) {
    return typeof u == "object" && u !== null && u.constructor === Object;
  }
  const n = [{ name: "number", test: function(u) {
    return typeof u == "number";
  } }, { name: "string", test: function(u) {
    return typeof u == "string";
  } }, { name: "boolean", test: function(u) {
    return typeof u == "boolean";
  } }, { name: "Function", test: function(u) {
    return typeof u == "function";
  } }, { name: "Array", test: Array.isArray }, { name: "Date", test: function(u) {
    return u instanceof Date;
  } }, { name: "RegExp", test: function(u) {
    return u instanceof RegExp;
  } }, { name: "Object", test: e }, { name: "null", test: function(u) {
    return u === null;
  } }, { name: "undefined", test: function(u) {
    return u === void 0;
  } }], t = { name: "any", test: rn, isAny: true };
  let i, r, s = 0, o = { createCount: 0 };
  function f(u) {
    const l = i.get(u);
    if (l) return l;
    let m = 'Unknown type "' + u + '"';
    const d = u.toLowerCase();
    let y;
    for (y of r) if (y.toLowerCase() === d) {
      m += '. Did you mean "' + y + '" ?';
      break;
    }
    throw new TypeError(m);
  }
  function a(u) {
    let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    const m = l ? f(l).index : r.length, d = [];
    for (let v = 0; v < u.length; ++v) {
      if (!u[v] || typeof u[v].name != "string" || typeof u[v].test != "function") throw new TypeError("Object with properties {name: string, test: function} expected");
      const E = u[v].name;
      if (i.has(E)) throw new TypeError('Duplicate type name "' + E + '"');
      d.push(E), i.set(E, { name: E, test: u[v].test, isAny: u[v].isAny, index: m + v, conversionsTo: [] });
    }
    const y = r.slice(m);
    r = r.slice(0, m).concat(d).concat(y);
    for (let v = m + d.length; v < r.length; ++v) i.get(r[v]).index = v;
  }
  function c() {
    i = /* @__PURE__ */ new Map(), r = [], s = 0, a([t], false);
  }
  c(), a(n);
  function h() {
    let u;
    for (u of r) i.get(u).conversionsTo = [];
    s = 0;
  }
  function p(u) {
    const l = r.filter((m) => {
      const d = i.get(m);
      return !d.isAny && d.test(u);
    });
    return l.length ? l : ["any"];
  }
  function g(u) {
    return u && typeof u == "function" && "_typedFunctionData" in u;
  }
  function b(u, l, m) {
    if (!g(u)) throw new TypeError(sn);
    const d = m && m.exact, y = Array.isArray(l) ? l.join(",") : l, v = j(y), E = x(v);
    if (!d || E in u.signatures) {
      const D = u._typedFunctionData.signatureMap.get(E);
      if (D) return D;
    }
    const T = v.length;
    let I;
    if (d) {
      I = [];
      let D;
      for (D in u.signatures) I.push(u._typedFunctionData.signatureMap.get(D));
    } else I = u._typedFunctionData.signatures;
    for (let D = 0; D < T; ++D) {
      const L = v[D], B = [];
      let X;
      for (X of I) {
        const G = ce(X.params, D);
        if (!(!G || L.restParam && !G.restParam)) {
          if (!G.hasAny) {
            const te = F(G);
            if (L.types.some((ie) => !te.has(ie.name))) continue;
          }
          B.push(X);
        }
      }
      if (I = B, I.length === 0) break;
    }
    let M;
    for (M of I) if (M.params.length <= T) return M;
    throw new TypeError("Signature not found (signature: " + (u.name || "unnamed") + "(" + x(v, ", ") + "))");
  }
  function k(u, l, m) {
    return b(u, l, m).implementation;
  }
  function C(u, l) {
    const m = f(l);
    if (m.test(u)) return u;
    const d = m.conversionsTo;
    if (d.length === 0) throw new Error("There are no conversions to " + l + " defined.");
    for (let y = 0; y < d.length; y++) if (f(d[y].from).test(u)) return d[y].convert(u);
    throw new Error("Cannot convert " + u + " to " + l);
  }
  function x(u) {
    let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return u.map((m) => m.name).join(l);
  }
  function Z(u) {
    const l = u.indexOf("...") === 0, d = (l ? u.length > 3 ? u.slice(3) : "any" : u).split("|").map((T) => f(T.trim()));
    let y = false, v = l ? "..." : "";
    return { types: d.map(function(T) {
      return y = T.isAny || y, v += T.name + "|", { name: T.name, typeIndex: T.index, test: T.test, isAny: T.isAny, conversion: null, conversionIndex: -1 };
    }), name: v.slice(0, -1), hasAny: y, hasConversion: false, restParam: l };
  }
  function Q(u) {
    const l = u.types.map((E) => E.name), m = Mn(l);
    let d = u.hasAny, y = u.name;
    const v = m.map(function(E) {
      const T = f(E.from);
      return d = T.isAny || d, y += "|" + E.from, { name: E.from, typeIndex: T.index, test: T.test, isAny: T.isAny, conversion: E, conversionIndex: E.index };
    });
    return { types: u.types.concat(v), name: y, hasAny: d, hasConversion: v.length > 0, restParam: u.restParam };
  }
  function F(u) {
    return u.typeSet || (u.typeSet = /* @__PURE__ */ new Set(), u.types.forEach((l) => u.typeSet.add(l.name))), u.typeSet;
  }
  function j(u) {
    const l = [];
    if (typeof u != "string") throw new TypeError("Signatures must be strings");
    const m = u.trim();
    if (m === "") return l;
    const d = m.split(",");
    for (let y = 0; y < d.length; ++y) {
      const v = Z(d[y].trim());
      if (v.restParam && y !== d.length - 1) throw new SyntaxError('Unexpected rest parameter "' + d[y] + '": only allowed for the last parameter');
      if (v.types.length === 0) return null;
      l.push(v);
    }
    return l;
  }
  function U(u) {
    const l = Ne(u);
    return l ? l.restParam : false;
  }
  function O(u) {
    if (!u || u.types.length === 0) return rn;
    if (u.types.length === 1) return f(u.types[0].name).test;
    if (u.types.length === 2) {
      const l = f(u.types[0].name).test, m = f(u.types[1].name).test;
      return function(y) {
        return l(y) || m(y);
      };
    } else {
      const l = u.types.map(function(m) {
        return f(m.name).test;
      });
      return function(d) {
        for (let y = 0; y < l.length; y++) if (l[y](d)) return true;
        return false;
      };
    }
  }
  function Ie(u) {
    let l, m, d;
    if (U(u)) {
      l = We(u).map(O);
      const y = l.length, v = O(Ne(u)), E = function(T) {
        for (let I = y; I < T.length; I++) if (!v(T[I])) return false;
        return true;
      };
      return function(I) {
        for (let M = 0; M < l.length; M++) if (!l[M](I[M])) return false;
        return E(I) && I.length >= y + 1;
      };
    } else return u.length === 0 ? function(v) {
      return v.length === 0;
    } : u.length === 1 ? (m = O(u[0]), function(v) {
      return m(v[0]) && v.length === 1;
    }) : u.length === 2 ? (m = O(u[0]), d = O(u[1]), function(v) {
      return m(v[0]) && d(v[1]) && v.length === 2;
    }) : (l = u.map(O), function(v) {
      for (let E = 0; E < l.length; E++) if (!l[E](v[E])) return false;
      return v.length === l.length;
    });
  }
  function ce(u, l) {
    return l < u.length ? u[l] : U(u) ? Ne(u) : null;
  }
  function fe(u, l) {
    const m = ce(u, l);
    return m ? F(m) : /* @__PURE__ */ new Set();
  }
  function pe(u) {
    return u.conversion === null || u.conversion === void 0;
  }
  function W(u, l) {
    const m = /* @__PURE__ */ new Set();
    return u.forEach((d) => {
      const y = fe(d.params, l);
      let v;
      for (v of y) m.add(v);
    }), m.has("any") ? ["any"] : Array.from(m);
  }
  function de(u, l, m) {
    let d, y;
    const v = u || "unnamed";
    let E = m, T;
    for (T = 0; T < l.length; T++) {
      const L = [];
      if (E.forEach((B) => {
        const X = ce(B.params, T), G = O(X);
        (T < B.params.length || U(B.params)) && G(l[T]) && L.push(B);
      }), L.length === 0) {
        if (y = W(E, T), y.length > 0) {
          const B = p(l[T]);
          return d = new TypeError("Unexpected type of argument in function " + v + " (expected: " + y.join(" or ") + ", actual: " + B.join(" | ") + ", index: " + T + ")"), d.data = { category: "wrongType", fn: v, index: T, actual: B, expected: y }, d;
        }
      } else E = L;
    }
    const I = E.map(function(L) {
      return U(L.params) ? 1 / 0 : L.params.length;
    });
    if (l.length < Math.min.apply(null, I)) return y = W(E, T), d = new TypeError("Too few arguments in function " + v + " (expected: " + y.join(" or ") + ", index: " + l.length + ")"), d.data = { category: "tooFewArgs", fn: v, index: l.length, expected: y }, d;
    const M = Math.max.apply(null, I);
    if (l.length > M) return d = new TypeError("Too many arguments in function " + v + " (expected: " + M + ", actual: " + l.length + ")"), d.data = { category: "tooManyArgs", fn: v, index: l.length, expectedLength: M }, d;
    const D = [];
    for (let L = 0; L < l.length; ++L) D.push(p(l[L]).join("|"));
    return d = new TypeError('Arguments of type "' + D.join(", ") + '" do not match any of the defined signatures of function ' + v + "."), d.data = { category: "mismatch", actual: D }, d;
  }
  function ge(u) {
    let l = r.length + 1;
    for (let m = 0; m < u.types.length; m++) pe(u.types[m]) && (l = Math.min(l, u.types[m].typeIndex));
    return l;
  }
  function ve(u) {
    let l = s + 1;
    for (let m = 0; m < u.types.length; m++) pe(u.types[m]) || (l = Math.min(l, u.types[m].conversionIndex));
    return l;
  }
  function z(u, l) {
    if (u.hasAny) {
      if (!l.hasAny) return 1;
    } else if (l.hasAny) return -1;
    if (u.restParam) {
      if (!l.restParam) return 1;
    } else if (l.restParam) return -1;
    if (u.hasConversion) {
      if (!l.hasConversion) return 1;
    } else if (l.hasConversion) return -1;
    const m = ge(u) - ge(l);
    if (m < 0) return -1;
    if (m > 0) return 1;
    const d = ve(u) - ve(l);
    return d < 0 ? -1 : d > 0 ? 1 : 0;
  }
  function R(u, l) {
    const m = u.params, d = l.params, y = Ne(m), v = Ne(d), E = U(m), T = U(d);
    if (E && y.hasAny) {
      if (!T || !v.hasAny) return 1;
    } else if (T && v.hasAny) return -1;
    let I = 0, M = 0, D;
    for (D of m) D.hasAny && ++I, D.hasConversion && ++M;
    let L = 0, B = 0;
    for (D of d) D.hasAny && ++L, D.hasConversion && ++B;
    if (I !== L) return I - L;
    if (E && y.hasConversion) {
      if (!T || !v.hasConversion) return 1;
    } else if (T && v.hasConversion) return -1;
    if (M !== B) return M - B;
    if (E) {
      if (!T) return 1;
    } else if (T) return -1;
    const X = (m.length - d.length) * (E ? -1 : 1);
    if (X !== 0) return X;
    const G = [];
    let te = 0;
    for (let ye = 0; ye < m.length; ++ye) {
      const Ce = z(m[ye], d[ye]);
      G.push(Ce), te += Ce;
    }
    if (te !== 0) return te;
    let ie;
    for (ie of G) if (ie !== 0) return ie;
    return 0;
  }
  function Mn(u) {
    if (u.length === 0) return [];
    const l = u.map(f);
    u.length > 1 && l.sort((y, v) => y.index - v.index);
    let m = l[0].conversionsTo;
    if (u.length === 1) return m;
    m = m.concat([]);
    const d = new Set(u);
    for (let y = 1; y < l.length; ++y) {
      let v;
      for (v of l[y].conversionsTo) d.has(v.from) || (m.push(v), d.add(v.from));
    }
    return m;
  }
  function Tn(u, l) {
    let m = l;
    if (u.some((y) => y.hasConversion)) {
      const y = U(u), v = u.map(En);
      m = function() {
        const T = [], I = y ? arguments.length - 1 : arguments.length;
        for (let M = 0; M < I; M++) T[M] = v[M](arguments[M]);
        return y && (T[I] = arguments[I].map(v[I])), l.apply(this, T);
      };
    }
    let d = m;
    if (U(u)) {
      const y = u.length - 1;
      d = function() {
        return m.apply(this, Ze(arguments, 0, y).concat([Ze(arguments, y)]));
      };
    }
    return d;
  }
  function En(u) {
    let l, m, d, y;
    const v = [], E = [];
    switch (u.types.forEach(function(T) {
      T.conversion && (v.push(f(T.conversion.from).test), E.push(T.conversion.convert));
    }), E.length) {
      case 0:
        return function(I) {
          return I;
        };
      case 1:
        return l = v[0], d = E[0], function(I) {
          return l(I) ? d(I) : I;
        };
      case 2:
        return l = v[0], m = v[1], d = E[0], y = E[1], function(I) {
          return l(I) ? d(I) : m(I) ? y(I) : I;
        };
      default:
        return function(I) {
          for (let M = 0; M < E.length; M++) if (v[M](I)) return E[M](I);
          return I;
        };
    }
  }
  function In(u) {
    function l(m, d, y) {
      if (d < m.length) {
        const v = m[d];
        let E = [];
        if (v.restParam) {
          const T = v.types.filter(pe);
          T.length < v.types.length && E.push({ types: T, name: "..." + T.map((I) => I.name).join("|"), hasAny: T.some((I) => I.isAny), hasConversion: false, restParam: true }), E.push(v);
        } else E = v.types.map(function(T) {
          return { types: [T], name: T.name, hasAny: T.isAny, hasConversion: T.conversion, restParam: false };
        });
        return On(E, function(T) {
          return l(m, d + 1, y.concat([T]));
        });
      } else return [y];
    }
    return l(u, 0, []);
  }
  function bn(u, l) {
    const m = Math.max(u.length, l.length);
    for (let T = 0; T < m; T++) {
      const I = fe(u, T), M = fe(l, T);
      let D = false, L;
      for (L of M) if (I.has(L)) {
        D = true;
        break;
      }
      if (!D) return false;
    }
    const d = u.length, y = l.length, v = U(u), E = U(l);
    return v ? E ? d === y : y >= d : E ? d >= y : d === y;
  }
  function An(u) {
    return u.map((l) => Qe(l) ? Je(l.referToSelf.callback) : Ke(l) ? Xe(l.referTo.references, l.referTo.callback) : l);
  }
  function Pn(u, l, m) {
    const d = [];
    let y;
    for (y of u) {
      let v = m[y];
      if (typeof v != "number") throw new TypeError('No definition for referenced signature "' + y + '"');
      if (v = l[v], typeof v != "function") return false;
      d.push(v);
    }
    return d;
  }
  function Cn(u, l, m) {
    const d = An(u), y = new Array(d.length).fill(false);
    let v = true;
    for (; v; ) {
      v = false;
      let E = true;
      for (let T = 0; T < d.length; ++T) {
        if (y[T]) continue;
        const I = d[T];
        if (Qe(I)) d[T] = I.referToSelf.callback(m), d[T].referToSelf = I.referToSelf, y[T] = true, E = false;
        else if (Ke(I)) {
          const M = Pn(I.referTo.references, d, l);
          M ? (d[T] = I.referTo.callback.apply(this, M), d[T].referTo = I.referTo, y[T] = true, E = false) : v = true;
        }
      }
      if (E && v) throw new SyntaxError("Circular reference detected in resolving typed.referTo");
    }
    return d;
  }
  function Sn(u) {
    const l = /\bthis(\(|\.signatures\b)/;
    Object.keys(u).forEach((m) => {
      const d = u[m];
      if (l.test(d.toString())) throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
    });
  }
  function kn(u, l) {
    if (o.createCount++, Object.keys(l).length === 0) throw new SyntaxError("No signatures provided");
    o.warnAgainstDeprecatedThis && Sn(l);
    const m = [], d = [], y = {}, v = [];
    let E;
    for (E in l) {
      if (!Object.prototype.hasOwnProperty.call(l, E)) continue;
      const q = j(E);
      if (!q) continue;
      m.forEach(function(Ae) {
        if (bn(Ae, q)) throw new TypeError('Conflicting signatures "' + x(Ae) + '" and "' + x(q) + '".');
      }), m.push(q);
      const J = d.length;
      d.push(l[E]);
      const lt = q.map(Q);
      let Se;
      for (Se of In(lt)) {
        const Ae = x(Se);
        v.push({ params: Se, name: Ae, fn: J }), Se.every((ht) => !ht.hasConversion) && (y[Ae] = J);
      }
    }
    v.sort(R);
    const T = Cn(d, y, be);
    let I;
    for (I in y) Object.prototype.hasOwnProperty.call(y, I) && (y[I] = T[y[I]]);
    const M = [], D = /* @__PURE__ */ new Map();
    for (I of v) D.has(I.name) || (I.fn = T[I.fn], M.push(I), D.set(I.name, I));
    const L = M[0] && M[0].params.length <= 2 && !U(M[0].params), B = M[1] && M[1].params.length <= 2 && !U(M[1].params), X = M[2] && M[2].params.length <= 2 && !U(M[2].params), G = M[3] && M[3].params.length <= 2 && !U(M[3].params), te = M[4] && M[4].params.length <= 2 && !U(M[4].params), ie = M[5] && M[5].params.length <= 2 && !U(M[5].params), ye = L && B && X && G && te && ie;
    for (let q = 0; q < M.length; ++q) M[q].test = Ie(M[q].params);
    const Ce = L ? O(M[0].params[0]) : ee, Ln = B ? O(M[1].params[0]) : ee, Zn = X ? O(M[2].params[0]) : ee, xn = G ? O(M[3].params[0]) : ee, Un = te ? O(M[4].params[0]) : ee, jn = ie ? O(M[5].params[0]) : ee, Bn = L ? O(M[0].params[1]) : ee, Hn = B ? O(M[1].params[1]) : ee, zn = X ? O(M[2].params[1]) : ee, Yn = G ? O(M[3].params[1]) : ee, $n = te ? O(M[4].params[1]) : ee, Vn = ie ? O(M[5].params[1]) : ee;
    for (let q = 0; q < M.length; ++q) M[q].implementation = Tn(M[q].params, M[q].fn);
    const Gn = L ? M[0].implementation : Me, Wn = B ? M[1].implementation : Me, Xn = X ? M[2].implementation : Me, Jn = G ? M[3].implementation : Me, Kn = te ? M[4].implementation : Me, Qn = ie ? M[5].implementation : Me, et = L ? M[0].params.length : -1, nt = B ? M[1].params.length : -1, tt = X ? M[2].params.length : -1, it = G ? M[3].params.length : -1, rt = te ? M[4].params.length : -1, st = ie ? M[5].params.length : -1, ot = ye ? 6 : 0, ft = M.length, ut = M.map((q) => q.test), ct = M.map((q) => q.implementation), at = function() {
      for (let J = ot; J < ft; J++) if (ut[J](arguments)) return ct[J].apply(this, arguments);
      return o.onMismatch(u, arguments, M);
    };
    function be(q, J) {
      return arguments.length === et && Ce(q) && Bn(J) ? Gn.apply(this, arguments) : arguments.length === nt && Ln(q) && Hn(J) ? Wn.apply(this, arguments) : arguments.length === tt && Zn(q) && zn(J) ? Xn.apply(this, arguments) : arguments.length === it && xn(q) && Yn(J) ? Jn.apply(this, arguments) : arguments.length === rt && Un(q) && $n(J) ? Kn.apply(this, arguments) : arguments.length === st && jn(q) && Vn(J) ? Qn.apply(this, arguments) : at.apply(this, arguments);
    }
    try {
      Object.defineProperty(be, "name", { value: u });
    } catch {
    }
    return be.signatures = y, be._typedFunctionData = { signatures: M, signatureMap: D }, be;
  }
  function Ge(u, l, m) {
    throw de(u, l, m);
  }
  function We(u) {
    return Ze(u, 0, u.length - 1);
  }
  function Ne(u) {
    return u[u.length - 1];
  }
  function Ze(u, l, m) {
    return Array.prototype.slice.call(u, l, m);
  }
  function Fn(u, l) {
    for (let m = 0; m < u.length; m++) if (l(u[m])) return u[m];
  }
  function On(u, l) {
    return Array.prototype.concat.apply([], u.map(l));
  }
  function qn() {
    const u = We(arguments).map((m) => x(j(m))), l = Ne(arguments);
    if (typeof l != "function") throw new TypeError("Callback function expected as last argument");
    return Xe(u, l);
  }
  function Xe(u, l) {
    return { referTo: { references: u, callback: l } };
  }
  function Je(u) {
    if (typeof u != "function") throw new TypeError("Callback function expected as first argument");
    return { referToSelf: { callback: u } };
  }
  function Ke(u) {
    return u && typeof u.referTo == "object" && Array.isArray(u.referTo.references) && typeof u.referTo.callback == "function";
  }
  function Qe(u) {
    return u && typeof u.referToSelf == "object" && typeof u.referToSelf.callback == "function";
  }
  function en(u, l) {
    if (!u) return l;
    if (l && l !== u) {
      const m = new Error("Function names do not match (expected: " + u + ", actual: " + l + ")");
      throw m.data = { actual: l, expected: u }, m;
    }
    return u;
  }
  function Rn(u) {
    let l;
    for (const m in u) Object.prototype.hasOwnProperty.call(u, m) && (g(u[m]) || typeof u[m].signature == "string") && (l = en(l, u[m].name));
    return l;
  }
  function Dn(u, l) {
    let m;
    for (m in l) if (Object.prototype.hasOwnProperty.call(l, m)) {
      if (m in u && l[m] !== u[m]) {
        const d = new Error('Signature "' + m + '" is defined twice');
        throw d.data = { signature: m, sourceFunction: l[m], destFunction: u[m] }, d;
      }
      u[m] = l[m];
    }
  }
  const _n = o;
  o = function(u) {
    const l = typeof u == "string", m = l ? 1 : 0;
    let d = l ? u : "";
    const y = {};
    for (let v = m; v < arguments.length; ++v) {
      const E = arguments[v];
      let T = {}, I;
      if (typeof E == "function" ? (I = E.name, typeof E.signature == "string" ? T[E.signature] = E : g(E) && (T = E.signatures)) : e(E) && (T = E, l || (I = Rn(E))), Object.keys(T).length === 0) {
        const M = new TypeError("Argument to 'typed' at index " + v + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        throw M.data = { index: v, argument: E }, M;
      }
      l || (d = en(d, I)), Dn(y, T);
    }
    return kn(d || "", y);
  }, o.create = cn, o.createCount = _n.createCount, o.onMismatch = Ge, o.throwMismatchError = Ge, o.createError = de, o.clear = c, o.clearConversions = h, o.addTypes = a, o._findType = f, o.referTo = qn, o.referToSelf = Je, o.convert = C, o.findSignature = b, o.find = k, o.isTypedFunction = g, o.warnAgainstDeprecatedThis = true, o.addType = function(u, l) {
    let m = "any";
    l !== false && i.has("Object") && (m = "Object"), o.addTypes([u], m);
  };
  function nn(u) {
    if (!u || typeof u.from != "string" || typeof u.to != "string" || typeof u.convert != "function") throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    if (u.to === u.from) throw new SyntaxError('Illegal to define conversion from "' + u.from + '" to itself.');
  }
  return o.addConversion = function(u) {
    let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { override: false };
    nn(u);
    const m = f(u.to), d = m.conversionsTo.find((y) => y.from === u.from);
    if (d) if (l && l.override) o.removeConversion({ from: d.from, to: u.to, convert: d.convert });
    else throw new Error('There is already a conversion from "' + u.from + '" to "' + m.name + '"');
    m.conversionsTo.push({ from: u.from, convert: u.convert, index: s++ });
  }, o.addConversions = function(u, l) {
    u.forEach((m) => o.addConversion(m, l));
  }, o.removeConversion = function(u) {
    nn(u);
    const l = f(u.to), m = Fn(l.conversionsTo, (y) => y.from === u.from);
    if (!m) throw new Error("Attempt to remove nonexistent conversion from " + u.from + " to " + u.to);
    if (m.convert !== u.convert) throw new Error("Conversion to remove does not match existing conversion");
    const d = l.conversionsTo.indexOf(m);
    l.conversionsTo.splice(d, 1);
  }, o.resolve = function(u, l) {
    if (!g(u)) throw new TypeError(sn);
    const m = u._typedFunctionData.signatures;
    for (let d = 0; d < m.length; ++d) if (m[d].test(l)) return m[d];
    return null;
  }, o;
}
const ui = cn();
/*!
*  decimal.js v10.4.3
*  An arbitrary-precision Decimal type for JavaScript.
*  https://github.com/MikeMcl/decimal.js
*  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
*  MIT Licence
*/
var je = 9e15, me = 1e9, Be = "0123456789abcdef", Fe = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", Oe = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", He = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -9e15, maxE: je, crypto: false }, an, ue, S = true, Re = "[DecimalError] ", he = Re + "Invalid argument: ", ln = Re + "Precision limit exceeded", hn = Re + "crypto unavailable", mn = "[object Decimal]", V = Math.floor, H = Math.pow, mt = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, pt = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, dt = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, pn = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, se = 1e7, P = 7, gt = 9007199254740991, wt = Fe.length - 1, ze = Oe.length - 1, N = { toStringTag: mn };
N.absoluteValue = N.abs = function() {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), A(e);
};
N.ceil = function() {
  return A(new this.constructor(this), this.e + 1, 2);
};
N.clampedTo = N.clamp = function(e, n) {
  var t, i = this, r = i.constructor;
  if (e = new r(e), n = new r(n), !e.s || !n.s) return new r(NaN);
  if (e.gt(n)) throw Error(he + n);
  return t = i.cmp(e), t < 0 ? e : i.cmp(n) > 0 ? n : new r(i);
};
N.comparedTo = N.cmp = function(e) {
  var n, t, i, r, s = this, o = s.d, f = (e = new s.constructor(e)).d, a = s.s, c = e.s;
  if (!o || !f) return !a || !c ? NaN : a !== c ? a : o === f ? 0 : !o ^ a < 0 ? 1 : -1;
  if (!o[0] || !f[0]) return o[0] ? a : f[0] ? -c : 0;
  if (a !== c) return a;
  if (s.e !== e.e) return s.e > e.e ^ a < 0 ? 1 : -1;
  for (i = o.length, r = f.length, n = 0, t = i < r ? i : r; n < t; ++n) if (o[n] !== f[n]) return o[n] > f[n] ^ a < 0 ? 1 : -1;
  return i === r ? 0 : i > r ^ a < 0 ? 1 : -1;
};
N.cosine = N.cos = function() {
  var e, n, t = this, i = t.constructor;
  return t.d ? t.d[0] ? (e = i.precision, n = i.rounding, i.precision = e + Math.max(t.e, t.sd()) + P, i.rounding = 1, t = vt(i, Nn(i, t)), i.precision = e, i.rounding = n, A(ue == 2 || ue == 3 ? t.neg() : t, e, n, true)) : new i(1) : new i(NaN);
};
N.cubeRoot = N.cbrt = function() {
  var e, n, t, i, r, s, o, f, a, c, h = this, p = h.constructor;
  if (!h.isFinite() || h.isZero()) return new p(h);
  for (S = false, s = h.s * H(h.s * h, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (t = Y(h.d), e = h.e, (s = (e - t.length + 1) % 3) && (t += s == 1 || s == -2 ? "0" : "00"), s = H(t, 1 / 3), e = V((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? t = "5e" + e : (t = s.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), i = new p(t), i.s = h.s) : i = new p(s.toString()), o = (e = p.precision) + 3; ; ) if (f = i, a = f.times(f).times(f), c = a.plus(h), i = _(c.plus(h).times(f), c.plus(a), o + 2, 1), Y(f.d).slice(0, o) === (t = Y(i.d)).slice(0, o)) if (t = t.slice(o - 3, o + 1), t == "9999" || !r && t == "4999") {
    if (!r && (A(f, e + 1, 0), f.times(f).times(f).eq(h))) {
      i = f;
      break;
    }
    o += 4, r = 1;
  } else {
    (!+t || !+t.slice(1) && t.charAt(0) == "5") && (A(i, e + 1, 1), n = !i.times(i).times(i).eq(h));
    break;
  }
  return S = true, A(i, e, p.rounding, n);
};
N.decimalPlaces = N.dp = function() {
  var e, n = this.d, t = NaN;
  if (n) {
    if (e = n.length - 1, t = (e - V(this.e / P)) * P, e = n[e], e) for (; e % 10 == 0; e /= 10) t--;
    t < 0 && (t = 0);
  }
  return t;
};
N.dividedBy = N.div = function(e) {
  return _(this, new this.constructor(e));
};
N.dividedToIntegerBy = N.divToInt = function(e) {
  var n = this, t = n.constructor;
  return A(_(n, new t(e), 0, 1, 1), t.precision, t.rounding);
};
N.equals = N.eq = function(e) {
  return this.cmp(e) === 0;
};
N.floor = function() {
  return A(new this.constructor(this), this.e + 1, 3);
};
N.greaterThan = N.gt = function(e) {
  return this.cmp(e) > 0;
};
N.greaterThanOrEqualTo = N.gte = function(e) {
  var n = this.cmp(e);
  return n == 1 || n === 0;
};
N.hyperbolicCosine = N.cosh = function() {
  var e, n, t, i, r, s = this, o = s.constructor, f = new o(1);
  if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);
  if (s.isZero()) return f;
  t = o.precision, i = o.rounding, o.precision = t + Math.max(s.e, s.sd()) + 4, o.rounding = 1, r = s.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / _e(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), s = Ee(o, 1, s.times(n), new o(1), true);
  for (var a, c = e, h = new o(8); c--; ) a = s.times(s), s = f.minus(a.times(h.minus(a.times(h))));
  return A(s, o.precision = t, o.rounding = i, true);
};
N.hyperbolicSine = N.sinh = function() {
  var e, n, t, i, r = this, s = r.constructor;
  if (!r.isFinite() || r.isZero()) return new s(r);
  if (n = s.precision, t = s.rounding, s.precision = n + Math.max(r.e, r.sd()) + 4, s.rounding = 1, i = r.d.length, i < 3) r = Ee(s, 2, r, r, true);
  else {
    e = 1.4 * Math.sqrt(i), e = e > 16 ? 16 : e | 0, r = r.times(1 / _e(5, e)), r = Ee(s, 2, r, r, true);
    for (var o, f = new s(5), a = new s(16), c = new s(20); e--; ) o = r.times(r), r = r.times(f.plus(o.times(a.times(o).plus(c))));
  }
  return s.precision = n, s.rounding = t, A(r, n, t, true);
};
N.hyperbolicTangent = N.tanh = function() {
  var e, n, t = this, i = t.constructor;
  return t.isFinite() ? t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + 7, i.rounding = 1, _(t.sinh(), t.cosh(), i.precision = e, i.rounding = n)) : new i(t.s);
};
N.inverseCosine = N.acos = function() {
  var e, n = this, t = n.constructor, i = n.abs().cmp(1), r = t.precision, s = t.rounding;
  return i !== -1 ? i === 0 ? n.isNeg() ? re(t, r, s) : new t(0) : new t(NaN) : n.isZero() ? re(t, r + 4, s).times(0.5) : (t.precision = r + 6, t.rounding = 1, n = n.asin(), e = re(t, r + 4, s).times(0.5), t.precision = r, t.rounding = s, e.minus(n));
};
N.inverseHyperbolicCosine = N.acosh = function() {
  var e, n, t = this, i = t.constructor;
  return t.lte(1) ? new i(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = i.precision, n = i.rounding, i.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, i.rounding = 1, S = false, t = t.times(t).minus(1).sqrt().plus(t), S = true, i.precision = e, i.rounding = n, t.ln()) : new i(t);
};
N.inverseHyperbolicSine = N.asinh = function() {
  var e, n, t = this, i = t.constructor;
  return !t.isFinite() || t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, i.rounding = 1, S = false, t = t.times(t).plus(1).sqrt().plus(t), S = true, i.precision = e, i.rounding = n, t.ln());
};
N.inverseHyperbolicTangent = N.atanh = function() {
  var e, n, t, i, r = this, s = r.constructor;
  return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = s.precision, n = s.rounding, i = r.sd(), Math.max(i, e) < 2 * -r.e - 1 ? A(new s(r), e, n, true) : (s.precision = t = i - r.e, r = _(r.plus(1), new s(1).minus(r), t + e, 1), s.precision = e + 4, s.rounding = 1, r = r.ln(), s.precision = e, s.rounding = n, r.times(0.5))) : new s(NaN);
};
N.inverseSine = N.asin = function() {
  var e, n, t, i, r = this, s = r.constructor;
  return r.isZero() ? new s(r) : (n = r.abs().cmp(1), t = s.precision, i = s.rounding, n !== -1 ? n === 0 ? (e = re(s, t + 4, i).times(0.5), e.s = r.s, e) : new s(NaN) : (s.precision = t + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = t, s.rounding = i, r.times(2)));
};
N.inverseTangent = N.atan = function() {
  var e, n, t, i, r, s, o, f, a, c = this, h = c.constructor, p = h.precision, g = h.rounding;
  if (c.isFinite()) {
    if (c.isZero()) return new h(c);
    if (c.abs().eq(1) && p + 4 <= ze) return o = re(h, p + 4, g).times(0.25), o.s = c.s, o;
  } else {
    if (!c.s) return new h(NaN);
    if (p + 4 <= ze) return o = re(h, p + 4, g).times(0.5), o.s = c.s, o;
  }
  for (h.precision = f = p + 10, h.rounding = 1, t = Math.min(28, f / P + 2 | 0), e = t; e; --e) c = c.div(c.times(c).plus(1).sqrt().plus(1));
  for (S = false, n = Math.ceil(f / P), i = 1, a = c.times(c), o = new h(c), r = c; e !== -1; ) if (r = r.times(a), s = o.minus(r.div(i += 2)), r = r.times(a), o = s.plus(r.div(i += 2)), o.d[n] !== void 0) for (e = n; o.d[e] === s.d[e] && e--; ) ;
  return t && (o = o.times(2 << t - 1)), S = true, A(o, h.precision = p, h.rounding = g, true);
};
N.isFinite = function() {
  return !!this.d;
};
N.isInteger = N.isInt = function() {
  return !!this.d && V(this.e / P) > this.d.length - 2;
};
N.isNaN = function() {
  return !this.s;
};
N.isNegative = N.isNeg = function() {
  return this.s < 0;
};
N.isPositive = N.isPos = function() {
  return this.s > 0;
};
N.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
N.lessThan = N.lt = function(e) {
  return this.cmp(e) < 0;
};
N.lessThanOrEqualTo = N.lte = function(e) {
  return this.cmp(e) < 1;
};
N.logarithm = N.log = function(e) {
  var n, t, i, r, s, o, f, a, c = this, h = c.constructor, p = h.precision, g = h.rounding, b = 5;
  if (e == null) e = new h(10), n = true;
  else {
    if (e = new h(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1)) return new h(NaN);
    n = e.eq(10);
  }
  if (t = c.d, c.s < 0 || !t || !t[0] || c.eq(1)) return new h(t && !t[0] ? -1 / 0 : c.s != 1 ? NaN : t ? 0 : 1 / 0);
  if (n) if (t.length > 1) s = true;
  else {
    for (r = t[0]; r % 10 === 0; ) r /= 10;
    s = r !== 1;
  }
  if (S = false, f = p + b, o = le(c, f), i = n ? qe(h, f + 10) : le(e, f), a = _(o, i, f, 1), Pe(a.d, r = p, g)) do
    if (f += 10, o = le(c, f), i = n ? qe(h, f + 10) : le(e, f), a = _(o, i, f, 1), !s) {
      +Y(a.d).slice(r + 1, r + 15) + 1 == 1e14 && (a = A(a, p + 1, 0));
      break;
    }
  while (Pe(a.d, r += 10, g));
  return S = true, A(a, p, g);
};
N.minus = N.sub = function(e) {
  var n, t, i, r, s, o, f, a, c, h, p, g, b = this, k = b.constructor;
  if (e = new k(e), !b.d || !e.d) return !b.s || !e.s ? e = new k(NaN) : b.d ? e.s = -e.s : e = new k(e.d || b.s !== e.s ? b : NaN), e;
  if (b.s != e.s) return e.s = -e.s, b.plus(e);
  if (c = b.d, g = e.d, f = k.precision, a = k.rounding, !c[0] || !g[0]) {
    if (g[0]) e.s = -e.s;
    else if (c[0]) e = new k(b);
    else return new k(a === 3 ? -0 : 0);
    return S ? A(e, f, a) : e;
  }
  if (t = V(e.e / P), h = V(b.e / P), c = c.slice(), s = h - t, s) {
    for (p = s < 0, p ? (n = c, s = -s, o = g.length) : (n = g, t = h, o = c.length), i = Math.max(Math.ceil(f / P), o) + 2, s > i && (s = i, n.length = 1), n.reverse(), i = s; i--; ) n.push(0);
    n.reverse();
  } else {
    for (i = c.length, o = g.length, p = i < o, p && (o = i), i = 0; i < o; i++) if (c[i] != g[i]) {
      p = c[i] < g[i];
      break;
    }
    s = 0;
  }
  for (p && (n = c, c = g, g = n, e.s = -e.s), o = c.length, i = g.length - o; i > 0; --i) c[o++] = 0;
  for (i = g.length; i > s; ) {
    if (c[--i] < g[i]) {
      for (r = i; r && c[--r] === 0; ) c[r] = se - 1;
      --c[r], c[i] += se;
    }
    c[i] -= g[i];
  }
  for (; c[--o] === 0; ) c.pop();
  for (; c[0] === 0; c.shift()) --t;
  return c[0] ? (e.d = c, e.e = De(c, t), S ? A(e, f, a) : e) : new k(a === 3 ? -0 : 0);
};
N.modulo = N.mod = function(e) {
  var n, t = this, i = t.constructor;
  return e = new i(e), !t.d || !e.s || e.d && !e.d[0] ? new i(NaN) : !e.d || t.d && !t.d[0] ? A(new i(t), i.precision, i.rounding) : (S = false, i.modulo == 9 ? (n = _(t, e.abs(), 0, 3, 1), n.s *= e.s) : n = _(t, e, 0, i.modulo, 1), n = n.times(e), S = true, t.minus(n));
};
N.naturalExponential = N.exp = function() {
  return Ye(this);
};
N.naturalLogarithm = N.ln = function() {
  return le(this);
};
N.negated = N.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s, A(e);
};
N.plus = N.add = function(e) {
  var n, t, i, r, s, o, f, a, c, h, p = this, g = p.constructor;
  if (e = new g(e), !p.d || !e.d) return !p.s || !e.s ? e = new g(NaN) : p.d || (e = new g(e.d || p.s === e.s ? p : NaN)), e;
  if (p.s != e.s) return e.s = -e.s, p.minus(e);
  if (c = p.d, h = e.d, f = g.precision, a = g.rounding, !c[0] || !h[0]) return h[0] || (e = new g(p)), S ? A(e, f, a) : e;
  if (s = V(p.e / P), i = V(e.e / P), c = c.slice(), r = s - i, r) {
    for (r < 0 ? (t = c, r = -r, o = h.length) : (t = h, i = s, o = c.length), s = Math.ceil(f / P), o = s > o ? s + 1 : o + 1, r > o && (r = o, t.length = 1), t.reverse(); r--; ) t.push(0);
    t.reverse();
  }
  for (o = c.length, r = h.length, o - r < 0 && (r = o, t = h, h = c, c = t), n = 0; r; ) n = (c[--r] = c[r] + h[r] + n) / se | 0, c[r] %= se;
  for (n && (c.unshift(n), ++i), o = c.length; c[--o] == 0; ) c.pop();
  return e.d = c, e.e = De(c, i), S ? A(e, f, a) : e;
};
N.precision = N.sd = function(e) {
  var n, t = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(he + e);
  return t.d ? (n = dn(t.d), e && t.e + 1 > n && (n = t.e + 1)) : n = NaN, n;
};
N.round = function() {
  var e = this, n = e.constructor;
  return A(new n(e), e.e + 1, n.rounding);
};
N.sine = N.sin = function() {
  var e, n, t = this, i = t.constructor;
  return t.isFinite() ? t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + Math.max(t.e, t.sd()) + P, i.rounding = 1, t = yt(i, Nn(i, t)), i.precision = e, i.rounding = n, A(ue > 2 ? t.neg() : t, e, n, true)) : new i(NaN);
};
N.squareRoot = N.sqrt = function() {
  var e, n, t, i, r, s, o = this, f = o.d, a = o.e, c = o.s, h = o.constructor;
  if (c !== 1 || !f || !f[0]) return new h(!c || c < 0 && (!f || f[0]) ? NaN : f ? o : 1 / 0);
  for (S = false, c = Math.sqrt(+o), c == 0 || c == 1 / 0 ? (n = Y(f), (n.length + a) % 2 == 0 && (n += "0"), c = Math.sqrt(n), a = V((a + 1) / 2) - (a < 0 || a % 2), c == 1 / 0 ? n = "5e" + a : (n = c.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + a), i = new h(n)) : i = new h(c.toString()), t = (a = h.precision) + 3; ; ) if (s = i, i = s.plus(_(o, s, t + 2, 1)).times(0.5), Y(s.d).slice(0, t) === (n = Y(i.d)).slice(0, t)) if (n = n.slice(t - 3, t + 1), n == "9999" || !r && n == "4999") {
    if (!r && (A(s, a + 1, 0), s.times(s).eq(o))) {
      i = s;
      break;
    }
    t += 4, r = 1;
  } else {
    (!+n || !+n.slice(1) && n.charAt(0) == "5") && (A(i, a + 1, 1), e = !i.times(i).eq(o));
    break;
  }
  return S = true, A(i, a, h.rounding, e);
};
N.tangent = N.tan = function() {
  var e, n, t = this, i = t.constructor;
  return t.isFinite() ? t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + 10, i.rounding = 1, t = t.sin(), t.s = 1, t = _(t, new i(1).minus(t.times(t)).sqrt(), e + 10, 0), i.precision = e, i.rounding = n, A(ue == 2 || ue == 4 ? t.neg() : t, e, n, true)) : new i(NaN);
};
N.times = N.mul = function(e) {
  var n, t, i, r, s, o, f, a, c, h = this, p = h.constructor, g = h.d, b = (e = new p(e)).d;
  if (e.s *= h.s, !g || !g[0] || !b || !b[0]) return new p(!e.s || g && !g[0] && !b || b && !b[0] && !g ? NaN : !g || !b ? e.s / 0 : e.s * 0);
  for (t = V(h.e / P) + V(e.e / P), a = g.length, c = b.length, a < c && (s = g, g = b, b = s, o = a, a = c, c = o), s = [], o = a + c, i = o; i--; ) s.push(0);
  for (i = c; --i >= 0; ) {
    for (n = 0, r = a + i; r > i; ) f = s[r] + b[i] * g[r - i - 1] + n, s[r--] = f % se | 0, n = f / se | 0;
    s[r] = (s[r] + n) % se | 0;
  }
  for (; !s[--o]; ) s.pop();
  return n ? ++t : s.shift(), e.d = s, e.e = De(s, t), S ? A(e, p.precision, p.rounding) : e;
};
N.toBinary = function(e, n) {
  return Ve(this, 2, e, n);
};
N.toDecimalPlaces = N.toDP = function(e, n) {
  var t = this, i = t.constructor;
  return t = new i(t), e === void 0 ? t : (K(e, 0, me), n === void 0 ? n = i.rounding : K(n, 0, 8), A(t, e + t.e + 1, n));
};
N.toExponential = function(e, n) {
  var t, i = this, r = i.constructor;
  return e === void 0 ? t = oe(i, true) : (K(e, 0, me), n === void 0 ? n = r.rounding : K(n, 0, 8), i = A(new r(i), e + 1, n), t = oe(i, true, e + 1)), i.isNeg() && !i.isZero() ? "-" + t : t;
};
N.toFixed = function(e, n) {
  var t, i, r = this, s = r.constructor;
  return e === void 0 ? t = oe(r) : (K(e, 0, me), n === void 0 ? n = s.rounding : K(n, 0, 8), i = A(new s(r), e + r.e + 1, n), t = oe(i, false, e + i.e + 1)), r.isNeg() && !r.isZero() ? "-" + t : t;
};
N.toFraction = function(e) {
  var n, t, i, r, s, o, f, a, c, h, p, g, b = this, k = b.d, C = b.constructor;
  if (!k) return new C(b);
  if (c = t = new C(1), i = a = new C(0), n = new C(i), s = n.e = dn(k) - b.e - 1, o = s % P, n.d[0] = H(10, o < 0 ? P + o : o), e == null) e = s > 0 ? n : c;
  else {
    if (f = new C(e), !f.isInt() || f.lt(c)) throw Error(he + f);
    e = f.gt(n) ? s > 0 ? n : c : f;
  }
  for (S = false, f = new C(Y(k)), h = C.precision, C.precision = s = k.length * P * 2; p = _(f, n, 0, 1, 1), r = t.plus(p.times(i)), r.cmp(e) != 1; ) t = i, i = r, r = c, c = a.plus(p.times(r)), a = r, r = n, n = f.minus(p.times(r)), f = r;
  return r = _(e.minus(t), i, 0, 1, 1), a = a.plus(r.times(c)), t = t.plus(r.times(i)), a.s = c.s = b.s, g = _(c, i, s, 1).minus(b).abs().cmp(_(a, t, s, 1).minus(b).abs()) < 1 ? [c, i] : [a, t], C.precision = h, S = true, g;
};
N.toHexadecimal = N.toHex = function(e, n) {
  return Ve(this, 16, e, n);
};
N.toNearest = function(e, n) {
  var t = this, i = t.constructor;
  if (t = new i(t), e == null) {
    if (!t.d) return t;
    e = new i(1), n = i.rounding;
  } else {
    if (e = new i(e), n === void 0 ? n = i.rounding : K(n, 0, 8), !t.d) return e.s ? t : e;
    if (!e.d) return e.s && (e.s = t.s), e;
  }
  return e.d[0] ? (S = false, t = _(t, e, 0, n, 1).times(e), S = true, A(t)) : (e.s = t.s, t = e), t;
};
N.toNumber = function() {
  return +this;
};
N.toOctal = function(e, n) {
  return Ve(this, 8, e, n);
};
N.toPower = N.pow = function(e) {
  var n, t, i, r, s, o, f = this, a = f.constructor, c = +(e = new a(e));
  if (!f.d || !e.d || !f.d[0] || !e.d[0]) return new a(H(+f, c));
  if (f = new a(f), f.eq(1)) return f;
  if (i = a.precision, s = a.rounding, e.eq(1)) return A(f, i, s);
  if (n = V(e.e / P), n >= e.d.length - 1 && (t = c < 0 ? -c : c) <= gt) return r = gn(a, f, t, i), e.s < 0 ? new a(1).div(r) : A(r, i, s);
  if (o = f.s, o < 0) {
    if (n < e.d.length - 1) return new a(NaN);
    if (e.d[n] & 1 || (o = 1), f.e == 0 && f.d[0] == 1 && f.d.length == 1) return f.s = o, f;
  }
  return t = H(+f, c), n = t == 0 || !isFinite(t) ? V(c * (Math.log("0." + Y(f.d)) / Math.LN10 + f.e + 1)) : new a(t + "").e, n > a.maxE + 1 || n < a.minE - 1 ? new a(n > 0 ? o / 0 : 0) : (S = false, a.rounding = f.s = 1, t = Math.min(12, (n + "").length), r = Ye(e.times(le(f, i + t)), i), r.d && (r = A(r, i + 5, 1), Pe(r.d, i, s) && (n = i + 10, r = A(Ye(e.times(le(f, n + t)), n), n + 5, 1), +Y(r.d).slice(i + 1, i + 15) + 1 == 1e14 && (r = A(r, i + 1, 0)))), r.s = o, S = true, a.rounding = s, A(r, i, s));
};
N.toPrecision = function(e, n) {
  var t, i = this, r = i.constructor;
  return e === void 0 ? t = oe(i, i.e <= r.toExpNeg || i.e >= r.toExpPos) : (K(e, 1, me), n === void 0 ? n = r.rounding : K(n, 0, 8), i = A(new r(i), e, n), t = oe(i, e <= i.e || i.e <= r.toExpNeg, e)), i.isNeg() && !i.isZero() ? "-" + t : t;
};
N.toSignificantDigits = N.toSD = function(e, n) {
  var t = this, i = t.constructor;
  return e === void 0 ? (e = i.precision, n = i.rounding) : (K(e, 1, me), n === void 0 ? n = i.rounding : K(n, 0, 8)), A(new i(t), e, n);
};
N.toString = function() {
  var e = this, n = e.constructor, t = oe(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + t : t;
};
N.truncated = N.trunc = function() {
  return A(new this.constructor(this), this.e + 1, 1);
};
N.valueOf = N.toJSON = function() {
  var e = this, n = e.constructor, t = oe(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() ? "-" + t : t;
};
function Y(e) {
  var n, t, i, r = e.length - 1, s = "", o = e[0];
  if (r > 0) {
    for (s += o, n = 1; n < r; n++) i = e[n] + "", t = P - i.length, t && (s += ae(t)), s += i;
    o = e[n], i = o + "", t = P - i.length, t && (s += ae(t));
  } else if (o === 0) return "0";
  for (; o % 10 === 0; ) o /= 10;
  return s + o;
}
function K(e, n, t) {
  if (e !== ~~e || e < n || e > t) throw Error(he + e);
}
function Pe(e, n, t, i) {
  var r, s, o, f;
  for (s = e[0]; s >= 10; s /= 10) --n;
  return --n < 0 ? (n += P, r = 0) : (r = Math.ceil((n + 1) / P), n %= P), s = H(10, P - n), f = e[r] % s | 0, i == null ? n < 3 ? (n == 0 ? f = f / 100 | 0 : n == 1 && (f = f / 10 | 0), o = t < 4 && f == 99999 || t > 3 && f == 49999 || f == 5e4 || f == 0) : o = (t < 4 && f + 1 == s || t > 3 && f + 1 == s / 2) && (e[r + 1] / s / 100 | 0) == H(10, n - 2) - 1 || (f == s / 2 || f == 0) && (e[r + 1] / s / 100 | 0) == 0 : n < 4 ? (n == 0 ? f = f / 1e3 | 0 : n == 1 ? f = f / 100 | 0 : n == 2 && (f = f / 10 | 0), o = (i || t < 4) && f == 9999 || !i && t > 3 && f == 4999) : o = ((i || t < 4) && f + 1 == s || !i && t > 3 && f + 1 == s / 2) && (e[r + 1] / s / 1e3 | 0) == H(10, n - 3) - 1, o;
}
function ke(e, n, t) {
  for (var i, r = [0], s, o = 0, f = e.length; o < f; ) {
    for (s = r.length; s--; ) r[s] *= n;
    for (r[0] += Be.indexOf(e.charAt(o++)), i = 0; i < r.length; i++) r[i] > t - 1 && (r[i + 1] === void 0 && (r[i + 1] = 0), r[i + 1] += r[i] / t | 0, r[i] %= t);
  }
  return r.reverse();
}
function vt(e, n) {
  var t, i, r;
  if (n.isZero()) return n;
  i = n.d.length, i < 32 ? (t = Math.ceil(i / 3), r = (1 / _e(4, t)).toString()) : (t = 16, r = "2.3283064365386962890625e-10"), e.precision += t, n = Ee(e, 1, n.times(r), new e(1));
  for (var s = t; s--; ) {
    var o = n.times(n);
    n = o.times(o).minus(o).times(8).plus(1);
  }
  return e.precision -= t, n;
}
var _ = /* @__PURE__ */ function() {
  function e(i, r, s) {
    var o, f = 0, a = i.length;
    for (i = i.slice(); a--; ) o = i[a] * r + f, i[a] = o % s | 0, f = o / s | 0;
    return f && i.unshift(f), i;
  }
  function n(i, r, s, o) {
    var f, a;
    if (s != o) a = s > o ? 1 : -1;
    else for (f = a = 0; f < s; f++) if (i[f] != r[f]) {
      a = i[f] > r[f] ? 1 : -1;
      break;
    }
    return a;
  }
  function t(i, r, s, o) {
    for (var f = 0; s--; ) i[s] -= f, f = i[s] < r[s] ? 1 : 0, i[s] = f * o + i[s] - r[s];
    for (; !i[0] && i.length > 1; ) i.shift();
  }
  return function(i, r, s, o, f, a) {
    var c, h, p, g, b, k, C, x, Z, Q, F, j, U, O, Ie, ce, fe, pe, W, de, ge = i.constructor, ve = i.s == r.s ? 1 : -1, z = i.d, R = r.d;
    if (!z || !z[0] || !R || !R[0]) return new ge(!i.s || !r.s || (z ? R && z[0] == R[0] : !R) ? NaN : z && z[0] == 0 || !R ? ve * 0 : ve / 0);
    for (a ? (b = 1, h = i.e - r.e) : (a = se, b = P, h = V(i.e / b) - V(r.e / b)), W = R.length, fe = z.length, Z = new ge(ve), Q = Z.d = [], p = 0; R[p] == (z[p] || 0); p++) ;
    if (R[p] > (z[p] || 0) && h--, s == null ? (O = s = ge.precision, o = ge.rounding) : f ? O = s + (i.e - r.e) + 1 : O = s, O < 0) Q.push(1), k = true;
    else {
      if (O = O / b + 2 | 0, p = 0, W == 1) {
        for (g = 0, R = R[0], O++; (p < fe || g) && O--; p++) Ie = g * a + (z[p] || 0), Q[p] = Ie / R | 0, g = Ie % R | 0;
        k = g || p < fe;
      } else {
        for (g = a / (R[0] + 1) | 0, g > 1 && (R = e(R, g, a), z = e(z, g, a), W = R.length, fe = z.length), ce = W, F = z.slice(0, W), j = F.length; j < W; ) F[j++] = 0;
        de = R.slice(), de.unshift(0), pe = R[0], R[1] >= a / 2 && ++pe;
        do
          g = 0, c = n(R, F, W, j), c < 0 ? (U = F[0], W != j && (U = U * a + (F[1] || 0)), g = U / pe | 0, g > 1 ? (g >= a && (g = a - 1), C = e(R, g, a), x = C.length, j = F.length, c = n(C, F, x, j), c == 1 && (g--, t(C, W < x ? de : R, x, a))) : (g == 0 && (c = g = 1), C = R.slice()), x = C.length, x < j && C.unshift(0), t(F, C, j, a), c == -1 && (j = F.length, c = n(R, F, W, j), c < 1 && (g++, t(F, W < j ? de : R, j, a))), j = F.length) : c === 0 && (g++, F = [0]), Q[p++] = g, c && F[0] ? F[j++] = z[ce] || 0 : (F = [z[ce]], j = 1);
        while ((ce++ < fe || F[0] !== void 0) && O--);
        k = F[0] !== void 0;
      }
      Q[0] || Q.shift();
    }
    if (b == 1) Z.e = h, an = k;
    else {
      for (p = 1, g = Q[0]; g >= 10; g /= 10) p++;
      Z.e = p + h * b - 1, A(Z, f ? s + Z.e + 1 : s, o, k);
    }
    return Z;
  };
}();
function A(e, n, t, i) {
  var r, s, o, f, a, c, h, p, g, b = e.constructor;
  e: if (n != null) {
    if (p = e.d, !p) return e;
    for (r = 1, f = p[0]; f >= 10; f /= 10) r++;
    if (s = n - r, s < 0) s += P, o = n, h = p[g = 0], a = h / H(10, r - o - 1) % 10 | 0;
    else if (g = Math.ceil((s + 1) / P), f = p.length, g >= f) if (i) {
      for (; f++ <= g; ) p.push(0);
      h = a = 0, r = 1, s %= P, o = s - P + 1;
    } else break e;
    else {
      for (h = f = p[g], r = 1; f >= 10; f /= 10) r++;
      s %= P, o = s - P + r, a = o < 0 ? 0 : h / H(10, r - o - 1) % 10 | 0;
    }
    if (i = i || n < 0 || p[g + 1] !== void 0 || (o < 0 ? h : h % H(10, r - o - 1)), c = t < 4 ? (a || i) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (t == 4 || i || t == 6 && (s > 0 ? o > 0 ? h / H(10, r - o) : 0 : p[g - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), n < 1 || !p[0]) return p.length = 0, c ? (n -= e.e + 1, p[0] = H(10, (P - n % P) % P), e.e = -n || 0) : p[0] = e.e = 0, e;
    if (s == 0 ? (p.length = g, f = 1, g--) : (p.length = g + 1, f = H(10, P - s), p[g] = o > 0 ? (h / H(10, r - o) % H(10, o) | 0) * f : 0), c) for (; ; ) if (g == 0) {
      for (s = 1, o = p[0]; o >= 10; o /= 10) s++;
      for (o = p[0] += f, f = 1; o >= 10; o /= 10) f++;
      s != f && (e.e++, p[0] == se && (p[0] = 1));
      break;
    } else {
      if (p[g] += f, p[g] != se) break;
      p[g--] = 0, f = 1;
    }
    for (s = p.length; p[--s] === 0; ) p.pop();
  }
  return S && (e.e > b.maxE ? (e.d = null, e.e = NaN) : e.e < b.minE && (e.e = 0, e.d = [0])), e;
}
function oe(e, n, t) {
  if (!e.isFinite()) return vn(e);
  var i, r = e.e, s = Y(e.d), o = s.length;
  return n ? (t && (i = t - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + ae(i) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (s = "0." + ae(-r - 1) + s, t && (i = t - o) > 0 && (s += ae(i))) : r >= o ? (s += ae(r + 1 - o), t && (i = t - r - 1) > 0 && (s = s + "." + ae(i))) : ((i = r + 1) < o && (s = s.slice(0, i) + "." + s.slice(i)), t && (i = t - o) > 0 && (r + 1 === o && (s += "."), s += ae(i))), s;
}
function De(e, n) {
  var t = e[0];
  for (n *= P; t >= 10; t /= 10) n++;
  return n;
}
function qe(e, n, t) {
  if (n > wt) throw S = true, t && (e.precision = t), Error(ln);
  return A(new e(Fe), n, 1, true);
}
function re(e, n, t) {
  if (n > ze) throw Error(ln);
  return A(new e(Oe), n, t, true);
}
function dn(e) {
  var n = e.length - 1, t = n * P + 1;
  if (n = e[n], n) {
    for (; n % 10 == 0; n /= 10) t--;
    for (n = e[0]; n >= 10; n /= 10) t++;
  }
  return t;
}
function ae(e) {
  for (var n = ""; e--; ) n += "0";
  return n;
}
function gn(e, n, t, i) {
  var r, s = new e(1), o = Math.ceil(i / P + 4);
  for (S = false; ; ) {
    if (t % 2 && (s = s.times(n), fn(s.d, o) && (r = true)), t = V(t / 2), t === 0) {
      t = s.d.length - 1, r && s.d[t] === 0 && ++s.d[t];
      break;
    }
    n = n.times(n), fn(n.d, o);
  }
  return S = true, s;
}
function on(e) {
  return e.d[e.d.length - 1] & 1;
}
function wn(e, n, t) {
  for (var i, r = new e(n[0]), s = 0; ++s < n.length; ) if (i = new e(n[s]), i.s) r[t](i) && (r = i);
  else {
    r = i;
    break;
  }
  return r;
}
function Ye(e, n) {
  var t, i, r, s, o, f, a, c = 0, h = 0, p = 0, g = e.constructor, b = g.rounding, k = g.precision;
  if (!e.d || !e.d[0] || e.e > 17) return new g(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
  for (n == null ? (S = false, a = k) : a = n, f = new g(0.03125); e.e > -2; ) e = e.times(f), p += 5;
  for (i = Math.log(H(2, p)) / Math.LN10 * 2 + 5 | 0, a += i, t = s = o = new g(1), g.precision = a; ; ) {
    if (s = A(s.times(e), a, 1), t = t.times(++h), f = o.plus(_(s, t, a, 1)), Y(f.d).slice(0, a) === Y(o.d).slice(0, a)) {
      for (r = p; r--; ) o = A(o.times(o), a, 1);
      if (n == null) if (c < 3 && Pe(o.d, a - i, b, c)) g.precision = a += 10, t = s = f = new g(1), h = 0, c++;
      else return A(o, g.precision = k, b, S = true);
      else return g.precision = k, o;
    }
    o = f;
  }
}
function le(e, n) {
  var t, i, r, s, o, f, a, c, h, p, g, b = 1, k = 10, C = e, x = C.d, Z = C.constructor, Q = Z.rounding, F = Z.precision;
  if (C.s < 0 || !x || !x[0] || !C.e && x[0] == 1 && x.length == 1) return new Z(x && !x[0] ? -1 / 0 : C.s != 1 ? NaN : x ? 0 : C);
  if (n == null ? (S = false, h = F) : h = n, Z.precision = h += k, t = Y(x), i = t.charAt(0), Math.abs(s = C.e) < 15e14) {
    for (; i < 7 && i != 1 || i == 1 && t.charAt(1) > 3; ) C = C.times(e), t = Y(C.d), i = t.charAt(0), b++;
    s = C.e, i > 1 ? (C = new Z("0." + t), s++) : C = new Z(i + "." + t.slice(1));
  } else return c = qe(Z, h + 2, F).times(s + ""), C = le(new Z(i + "." + t.slice(1)), h - k).plus(c), Z.precision = F, n == null ? A(C, F, Q, S = true) : C;
  for (p = C, a = o = C = _(C.minus(1), C.plus(1), h, 1), g = A(C.times(C), h, 1), r = 3; ; ) {
    if (o = A(o.times(g), h, 1), c = a.plus(_(o, new Z(r), h, 1)), Y(c.d).slice(0, h) === Y(a.d).slice(0, h)) if (a = a.times(2), s !== 0 && (a = a.plus(qe(Z, h + 2, F).times(s + ""))), a = _(a, new Z(b), h, 1), n == null) if (Pe(a.d, h - k, Q, f)) Z.precision = h += k, c = o = C = _(p.minus(1), p.plus(1), h, 1), g = A(C.times(C), h, 1), r = f = 1;
    else return A(a, Z.precision = F, Q, S = true);
    else return Z.precision = F, a;
    a = c, r += 2;
  }
}
function vn(e) {
  return String(e.s * e.s / 0);
}
function $e(e, n) {
  var t, i, r;
  for ((t = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (i = n.search(/e/i)) > 0 ? (t < 0 && (t = i), t += +n.slice(i + 1), n = n.substring(0, i)) : t < 0 && (t = n.length), i = 0; n.charCodeAt(i) === 48; i++) ;
  for (r = n.length; n.charCodeAt(r - 1) === 48; --r) ;
  if (n = n.slice(i, r), n) {
    if (r -= i, e.e = t = t - i - 1, e.d = [], i = (t + 1) % P, t < 0 && (i += P), i < r) {
      for (i && e.d.push(+n.slice(0, i)), r -= P; i < r; ) e.d.push(+n.slice(i, i += P));
      n = n.slice(i), i = P - n.length;
    } else i -= r;
    for (; i--; ) n += "0";
    e.d.push(+n), S && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
  } else e.e = 0, e.d = [0];
  return e;
}
function Nt(e, n) {
  var t, i, r, s, o, f, a, c, h;
  if (n.indexOf("_") > -1) {
    if (n = n.replace(/(\d)_(?=\d)/g, "$1"), pn.test(n)) return $e(e, n);
  } else if (n === "Infinity" || n === "NaN") return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
  if (pt.test(n)) t = 16, n = n.toLowerCase();
  else if (mt.test(n)) t = 2;
  else if (dt.test(n)) t = 8;
  else throw Error(he + n);
  for (s = n.search(/p/i), s > 0 ? (a = +n.slice(s + 1), n = n.substring(2, s)) : n = n.slice(2), s = n.indexOf("."), o = s >= 0, i = e.constructor, o && (n = n.replace(".", ""), f = n.length, s = f - s, r = gn(i, new i(t), s, s * 2)), c = ke(n, t, se), h = c.length - 1, s = h; c[s] === 0; --s) c.pop();
  return s < 0 ? new i(e.s * 0) : (e.e = De(c, h), e.d = c, S = false, o && (e = _(e, r, f * 4)), a && (e = e.times(Math.abs(a) < 54 ? H(2, a) : Le.pow(2, a))), S = true, e);
}
function yt(e, n) {
  var t, i = n.d.length;
  if (i < 3) return n.isZero() ? n : Ee(e, 2, n, n);
  t = 1.4 * Math.sqrt(i), t = t > 16 ? 16 : t | 0, n = n.times(1 / _e(5, t)), n = Ee(e, 2, n, n);
  for (var r, s = new e(5), o = new e(16), f = new e(20); t--; ) r = n.times(n), n = n.times(s.plus(r.times(o.times(r).minus(f))));
  return n;
}
function Ee(e, n, t, i, r) {
  var s, o, f, a, c = e.precision, h = Math.ceil(c / P);
  for (S = false, a = t.times(t), f = new e(i); ; ) {
    if (o = _(f.times(a), new e(n++ * n++), c, 1), f = r ? i.plus(o) : i.minus(o), i = _(o.times(a), new e(n++ * n++), c, 1), o = f.plus(i), o.d[h] !== void 0) {
      for (s = h; o.d[s] === f.d[s] && s--; ) ;
      if (s == -1) break;
    }
    s = f, f = i, i = o, o = s;
  }
  return S = true, o.d.length = h + 1, o;
}
function _e(e, n) {
  for (var t = e; --n; ) t *= e;
  return t;
}
function Nn(e, n) {
  var t, i = n.s < 0, r = re(e, e.precision, 1), s = r.times(0.5);
  if (n = n.abs(), n.lte(s)) return ue = i ? 4 : 1, n;
  if (t = n.divToInt(r), t.isZero()) ue = i ? 3 : 2;
  else {
    if (n = n.minus(t.times(r)), n.lte(s)) return ue = on(t) ? i ? 2 : 3 : i ? 4 : 1, n;
    ue = on(t) ? i ? 1 : 4 : i ? 3 : 2;
  }
  return n.minus(r).abs();
}
function Ve(e, n, t, i) {
  var r, s, o, f, a, c, h, p, g, b = e.constructor, k = t !== void 0;
  if (k ? (K(t, 1, me), i === void 0 ? i = b.rounding : K(i, 0, 8)) : (t = b.precision, i = b.rounding), !e.isFinite()) h = vn(e);
  else {
    for (h = oe(e), o = h.indexOf("."), k ? (r = 2, n == 16 ? t = t * 4 - 3 : n == 8 && (t = t * 3 - 2)) : r = n, o >= 0 && (h = h.replace(".", ""), g = new b(1), g.e = h.length - o, g.d = ke(oe(g), 10, r), g.e = g.d.length), p = ke(h, 10, r), s = a = p.length; p[--a] == 0; ) p.pop();
    if (!p[0]) h = k ? "0p+0" : "0";
    else {
      if (o < 0 ? s-- : (e = new b(e), e.d = p, e.e = s, e = _(e, g, t, i, 0, r), p = e.d, s = e.e, c = an), o = p[t], f = r / 2, c = c || p[t + 1] !== void 0, c = i < 4 ? (o !== void 0 || c) && (i === 0 || i === (e.s < 0 ? 3 : 2)) : o > f || o === f && (i === 4 || c || i === 6 && p[t - 1] & 1 || i === (e.s < 0 ? 8 : 7)), p.length = t, c) for (; ++p[--t] > r - 1; ) p[t] = 0, t || (++s, p.unshift(1));
      for (a = p.length; !p[a - 1]; --a) ;
      for (o = 0, h = ""; o < a; o++) h += Be.charAt(p[o]);
      if (k) {
        if (a > 1) if (n == 16 || n == 8) {
          for (o = n == 16 ? 4 : 3, --a; a % o; a++) h += "0";
          for (p = ke(h, r, n), a = p.length; !p[a - 1]; --a) ;
          for (o = 1, h = "1."; o < a; o++) h += Be.charAt(p[o]);
        } else h = h.charAt(0) + "." + h.slice(1);
        h = h + (s < 0 ? "p" : "p+") + s;
      } else if (s < 0) {
        for (; ++s; ) h = "0" + h;
        h = "0." + h;
      } else if (++s > a) for (s -= a; s--; ) h += "0";
      else s < a && (h = h.slice(0, s) + "." + h.slice(s));
    }
    h = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + h;
  }
  return e.s < 0 ? "-" + h : h;
}
function fn(e, n) {
  if (e.length > n) return e.length = n, true;
}
function Mt(e) {
  return new this(e).abs();
}
function Tt(e) {
  return new this(e).acos();
}
function Et(e) {
  return new this(e).acosh();
}
function It(e, n) {
  return new this(e).plus(n);
}
function bt(e) {
  return new this(e).asin();
}
function At(e) {
  return new this(e).asinh();
}
function Pt(e) {
  return new this(e).atan();
}
function Ct(e) {
  return new this(e).atanh();
}
function St(e, n) {
  e = new this(e), n = new this(n);
  var t, i = this.precision, r = this.rounding, s = i + 4;
  return !e.s || !n.s ? t = new this(NaN) : !e.d && !n.d ? (t = re(this, s, 1).times(n.s > 0 ? 0.25 : 0.75), t.s = e.s) : !n.d || e.isZero() ? (t = n.s < 0 ? re(this, i, r) : new this(0), t.s = e.s) : !e.d || n.isZero() ? (t = re(this, s, 1).times(0.5), t.s = e.s) : n.s < 0 ? (this.precision = s, this.rounding = 1, t = this.atan(_(e, n, s, 1)), n = re(this, s, 1), this.precision = i, this.rounding = r, t = e.s < 0 ? t.minus(n) : t.plus(n)) : t = this.atan(_(e, n, s, 1)), t;
}
function kt(e) {
  return new this(e).cbrt();
}
function Ft(e) {
  return A(e = new this(e), e.e + 1, 2);
}
function Ot(e, n, t) {
  return new this(e).clamp(n, t);
}
function qt(e) {
  if (!e || typeof e != "object") throw Error(Re + "Object expected");
  var n, t, i, r = e.defaults === true, s = ["precision", 1, me, "rounding", 0, 8, "toExpNeg", -9e15, 0, "toExpPos", 0, je, "maxE", 0, je, "minE", -9e15, 0, "modulo", 0, 9];
  for (n = 0; n < s.length; n += 3) if (t = s[n], r && (this[t] = He[t]), (i = e[t]) !== void 0) if (V(i) === i && i >= s[n + 1] && i <= s[n + 2]) this[t] = i;
  else throw Error(he + t + ": " + i);
  if (t = "crypto", r && (this[t] = He[t]), (i = e[t]) !== void 0) if (i === true || i === false || i === 0 || i === 1) if (i) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[t] = true;
  else throw Error(hn);
  else this[t] = false;
  else throw Error(he + t + ": " + i);
  return this;
}
function Rt(e) {
  return new this(e).cos();
}
function Dt(e) {
  return new this(e).cosh();
}
function yn(e) {
  var n, t, i;
  function r(s) {
    var o, f, a, c = this;
    if (!(c instanceof r)) return new r(s);
    if (c.constructor = r, un(s)) {
      c.s = s.s, S ? !s.d || s.e > r.maxE ? (c.e = NaN, c.d = null) : s.e < r.minE ? (c.e = 0, c.d = [0]) : (c.e = s.e, c.d = s.d.slice()) : (c.e = s.e, c.d = s.d ? s.d.slice() : s.d);
      return;
    }
    if (a = typeof s, a === "number") {
      if (s === 0) {
        c.s = 1 / s < 0 ? -1 : 1, c.e = 0, c.d = [0];
        return;
      }
      if (s < 0 ? (s = -s, c.s = -1) : c.s = 1, s === ~~s && s < 1e7) {
        for (o = 0, f = s; f >= 10; f /= 10) o++;
        S ? o > r.maxE ? (c.e = NaN, c.d = null) : o < r.minE ? (c.e = 0, c.d = [0]) : (c.e = o, c.d = [s]) : (c.e = o, c.d = [s]);
        return;
      } else if (s * 0 !== 0) {
        s || (c.s = NaN), c.e = NaN, c.d = null;
        return;
      }
      return $e(c, s.toString());
    } else if (a !== "string") throw Error(he + s);
    return (f = s.charCodeAt(0)) === 45 ? (s = s.slice(1), c.s = -1) : (f === 43 && (s = s.slice(1)), c.s = 1), pn.test(s) ? $e(c, s) : Nt(c, s);
  }
  if (r.prototype = N, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = qt, r.clone = yn, r.isDecimal = un, r.abs = Mt, r.acos = Tt, r.acosh = Et, r.add = It, r.asin = bt, r.asinh = At, r.atan = Pt, r.atanh = Ct, r.atan2 = St, r.cbrt = kt, r.ceil = Ft, r.clamp = Ot, r.cos = Rt, r.cosh = Dt, r.div = _t, r.exp = Lt, r.floor = Zt, r.hypot = xt, r.ln = Ut, r.log = jt, r.log10 = Ht, r.log2 = Bt, r.max = zt, r.min = Yt, r.mod = $t, r.mul = Vt, r.pow = Gt, r.random = Wt, r.round = Xt, r.sign = Jt, r.sin = Kt, r.sinh = Qt, r.sqrt = ei, r.sub = ni, r.sum = ti, r.tan = ii, r.tanh = ri, r.trunc = si, e === void 0 && (e = {}), e && e.defaults !== true) for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < i.length; ) e.hasOwnProperty(t = i[n++]) || (e[t] = this[t]);
  return r.config(e), r;
}
function _t(e, n) {
  return new this(e).div(n);
}
function Lt(e) {
  return new this(e).exp();
}
function Zt(e) {
  return A(e = new this(e), e.e + 1, 3);
}
function xt() {
  var e, n, t = new this(0);
  for (S = false, e = 0; e < arguments.length; ) if (n = new this(arguments[e++]), n.d) t.d && (t = t.plus(n.times(n)));
  else {
    if (n.s) return S = true, new this(1 / 0);
    t = n;
  }
  return S = true, t.sqrt();
}
function un(e) {
  return e instanceof Le || e && e.toStringTag === mn || false;
}
function Ut(e) {
  return new this(e).ln();
}
function jt(e, n) {
  return new this(e).log(n);
}
function Bt(e) {
  return new this(e).log(2);
}
function Ht(e) {
  return new this(e).log(10);
}
function zt() {
  return wn(this, arguments, "lt");
}
function Yt() {
  return wn(this, arguments, "gt");
}
function $t(e, n) {
  return new this(e).mod(n);
}
function Vt(e, n) {
  return new this(e).mul(n);
}
function Gt(e, n) {
  return new this(e).pow(n);
}
function Wt(e) {
  var n, t, i, r, s = 0, o = new this(1), f = [];
  if (e === void 0 ? e = this.precision : K(e, 1, me), i = Math.ceil(e / P), this.crypto) if (crypto.getRandomValues) for (n = crypto.getRandomValues(new Uint32Array(i)); s < i; ) r = n[s], r >= 429e7 ? n[s] = crypto.getRandomValues(new Uint32Array(1))[0] : f[s++] = r % 1e7;
  else if (crypto.randomBytes) {
    for (n = crypto.randomBytes(i *= 4); s < i; ) r = n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, s) : (f.push(r % 1e7), s += 4);
    s = i / 4;
  } else throw Error(hn);
  else for (; s < i; ) f[s++] = Math.random() * 1e7 | 0;
  for (i = f[--s], e %= P, i && e && (r = H(10, P - e), f[s] = (i / r | 0) * r); f[s] === 0; s--) f.pop();
  if (s < 0) t = 0, f = [0];
  else {
    for (t = -1; f[0] === 0; t -= P) f.shift();
    for (i = 1, r = f[0]; r >= 10; r /= 10) i++;
    i < P && (t -= P - i);
  }
  return o.e = t, o.d = f, o;
}
function Xt(e) {
  return A(e = new this(e), e.e + 1, this.rounding);
}
function Jt(e) {
  return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function Kt(e) {
  return new this(e).sin();
}
function Qt(e) {
  return new this(e).sinh();
}
function ei(e) {
  return new this(e).sqrt();
}
function ni(e, n) {
  return new this(e).sub(n);
}
function ti() {
  var e = 0, n = arguments, t = new this(n[e]);
  for (S = false; t.s && ++e < n.length; ) t = t.plus(n[e]);
  return S = true, A(t, this.precision, this.rounding);
}
function ii(e) {
  return new this(e).tan();
}
function ri(e) {
  return new this(e).tanh();
}
function si(e) {
  return A(e = new this(e), e.e + 1, 1);
}
N[Symbol.for("nodejs.util.inspect.custom")] = N.toString;
N[Symbol.toStringTag] = "Decimal";
var Le = N.constructor = yn(He);
Fe = new Le(Fe);
Oe = new Le(Oe);
const $ = Math.cosh || function(e) {
  return Math.abs(e) < 1e-9 ? 1 - e : (Math.exp(e) + Math.exp(-e)) * 0.5;
}, ne = Math.sinh || function(e) {
  return Math.abs(e) < 1e-9 ? e : (Math.exp(e) - Math.exp(-e)) * 0.5;
}, oi = function(e) {
  const n = Math.PI / 4;
  if (-n > e || e > n) return Math.cos(e) - 1;
  const t = e * e;
  return t * (t * (t * (t * (t * (t * (t * (t / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
}, xe = function(e, n) {
  return e = Math.abs(e), n = Math.abs(n), e < n && ([e, n] = [n, e]), e < 1e8 ? Math.sqrt(e * e + n * n) : (n /= e, e * Math.sqrt(1 + n * n));
}, Te = function() {
  throw SyntaxError("Invalid Param");
};
function Ue(e, n) {
  const t = Math.abs(e), i = Math.abs(n);
  return e === 0 ? Math.log(i) : n === 0 ? Math.log(t) : t < 3e3 && i < 3e3 ? Math.log(e * e + n * n) * 0.5 : (e = e * 0.5, n = n * 0.5, 0.5 * Math.log(e * e + n * n) + Math.LN2);
}
const fi = { re: 0, im: 0 }, we = function(e, n) {
  const t = fi;
  if (e == null) t.re = t.im = 0;
  else if (n !== void 0) t.re = e, t.im = n;
  else switch (typeof e) {
    case "object":
      if ("im" in e && "re" in e) t.re = e.re, t.im = e.im;
      else if ("abs" in e && "arg" in e) {
        if (!isFinite(e.abs) && isFinite(e.arg)) return w.INFINITY;
        t.re = e.abs * Math.cos(e.arg), t.im = e.abs * Math.sin(e.arg);
      } else if ("r" in e && "phi" in e) {
        if (!isFinite(e.r) && isFinite(e.phi)) return w.INFINITY;
        t.re = e.r * Math.cos(e.phi), t.im = e.r * Math.sin(e.phi);
      } else e.length === 2 ? (t.re = e[0], t.im = e[1]) : Te();
      break;
    case "string":
      t.im = t.re = 0;
      const i = e.replace(/_/g, "").match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
      let r = 1, s = 0;
      i === null && Te();
      for (let o = 0; o < i.length; o++) {
        const f = i[o];
        f === " " || f === "	" || f === `
` || (f === "+" ? r++ : f === "-" ? s++ : f === "i" || f === "I" ? (r + s === 0 && Te(), i[o + 1] !== " " && !isNaN(i[o + 1]) ? (t.im += parseFloat((s % 2 ? "-" : "") + i[o + 1]), o++) : t.im += parseFloat((s % 2 ? "-" : "") + "1"), r = s = 0) : ((r + s === 0 || isNaN(f)) && Te(), i[o + 1] === "i" || i[o + 1] === "I" ? (t.im += parseFloat((s % 2 ? "-" : "") + f), o++) : t.re += parseFloat((s % 2 ? "-" : "") + f), r = s = 0));
      }
      r + s > 0 && Te();
      break;
    case "number":
      t.im = 0, t.re = e;
      break;
    default:
      Te();
  }
  return isNaN(t.re) || isNaN(t.im), t;
};
function w(e, n) {
  if (!(this instanceof w)) return new w(e, n);
  const t = we(e, n);
  this.re = t.re, this.im = t.im;
}
w.prototype = { re: 0, im: 0, sign: function() {
  const e = xe(this.re, this.im);
  return new w(this.re / e, this.im / e);
}, add: function(e, n) {
  const t = we(e, n), i = this.isInfinite(), r = !(isFinite(t.re) && isFinite(t.im));
  return i || r ? i && r ? w.NAN : w.INFINITY : new w(this.re + t.re, this.im + t.im);
}, sub: function(e, n) {
  const t = we(e, n), i = this.isInfinite(), r = !(isFinite(t.re) && isFinite(t.im));
  return i || r ? i && r ? w.NAN : w.INFINITY : new w(this.re - t.re, this.im - t.im);
}, mul: function(e, n) {
  const t = we(e, n), i = this.isInfinite(), r = !(isFinite(t.re) && isFinite(t.im)), s = this.re === 0 && this.im === 0, o = t.re === 0 && t.im === 0;
  return i && o || r && s ? w.NAN : i || r ? w.INFINITY : t.im === 0 && this.im === 0 ? new w(this.re * t.re, 0) : new w(this.re * t.re - this.im * t.im, this.re * t.im + this.im * t.re);
}, div: function(e, n) {
  const t = we(e, n), i = this.isInfinite(), r = !(isFinite(t.re) && isFinite(t.im)), s = this.re === 0 && this.im === 0, o = t.re === 0 && t.im === 0;
  if (s && o || i && r) return w.NAN;
  if (o || i) return w.INFINITY;
  if (s || r) return w.ZERO;
  if (t.im === 0) return new w(this.re / t.re, this.im / t.re);
  if (Math.abs(t.re) < Math.abs(t.im)) {
    const f = t.re / t.im, a = t.re * f + t.im;
    return new w((this.re * f + this.im) / a, (this.im * f - this.re) / a);
  } else {
    const f = t.im / t.re, a = t.im * f + t.re;
    return new w((this.re + this.im * f) / a, (this.im - this.re * f) / a);
  }
}, pow: function(e, n) {
  const t = we(e, n), i = this.re === 0 && this.im === 0;
  if (t.re === 0 && t.im === 0) return w.ONE;
  if (t.im === 0) {
    if (this.im === 0 && this.re > 0) return new w(Math.pow(this.re, t.re), 0);
    if (this.re === 0) switch ((t.re % 4 + 4) % 4) {
      case 0:
        return new w(Math.pow(this.im, t.re), 0);
      case 1:
        return new w(0, Math.pow(this.im, t.re));
      case 2:
        return new w(-Math.pow(this.im, t.re), 0);
      case 3:
        return new w(0, -Math.pow(this.im, t.re));
    }
  }
  if (i && t.re > 0) return w.ZERO;
  const s = Math.atan2(this.im, this.re), o = Ue(this.re, this.im);
  let f = Math.exp(t.re * o - t.im * s), a = t.im * o + t.re * s;
  return new w(f * Math.cos(a), f * Math.sin(a));
}, sqrt: function() {
  const e = this.re, n = this.im;
  if (n === 0) return e >= 0 ? new w(Math.sqrt(e), 0) : new w(0, Math.sqrt(-e));
  const t = xe(e, n);
  let i = Math.sqrt(0.5 * (t + Math.abs(e))), r = Math.abs(n) / (2 * i);
  return e >= 0 ? new w(i, n < 0 ? -r : r) : new w(r, n < 0 ? -i : i);
}, exp: function() {
  const e = Math.exp(this.re);
  return this.im === 0 ? new w(e, 0) : new w(e * Math.cos(this.im), e * Math.sin(this.im));
}, expm1: function() {
  const e = this.re, n = this.im;
  return new w(Math.expm1(e) * Math.cos(n) + oi(n), Math.exp(e) * Math.sin(n));
}, log: function() {
  const e = this.re, n = this.im;
  return n === 0 && e > 0 ? new w(Math.log(e), 0) : new w(Ue(e, n), Math.atan2(n, e));
}, abs: function() {
  return xe(this.re, this.im);
}, arg: function() {
  return Math.atan2(this.im, this.re);
}, sin: function() {
  const e = this.re, n = this.im;
  return new w(Math.sin(e) * $(n), Math.cos(e) * ne(n));
}, cos: function() {
  const e = this.re, n = this.im;
  return new w(Math.cos(e) * $(n), -Math.sin(e) * ne(n));
}, tan: function() {
  const e = 2 * this.re, n = 2 * this.im, t = Math.cos(e) + $(n);
  return new w(Math.sin(e) / t, ne(n) / t);
}, cot: function() {
  const e = 2 * this.re, n = 2 * this.im, t = Math.cos(e) - $(n);
  return new w(-Math.sin(e) / t, ne(n) / t);
}, sec: function() {
  const e = this.re, n = this.im, t = 0.5 * $(2 * n) + 0.5 * Math.cos(2 * e);
  return new w(Math.cos(e) * $(n) / t, Math.sin(e) * ne(n) / t);
}, csc: function() {
  const e = this.re, n = this.im, t = 0.5 * $(2 * n) - 0.5 * Math.cos(2 * e);
  return new w(Math.sin(e) * $(n) / t, -Math.cos(e) * ne(n) / t);
}, asin: function() {
  const e = this.re, n = this.im, t = new w(n * n - e * e + 1, -2 * e * n).sqrt(), i = new w(t.re - n, t.im + e).log();
  return new w(i.im, -i.re);
}, acos: function() {
  const e = this.re, n = this.im, t = new w(n * n - e * e + 1, -2 * e * n).sqrt(), i = new w(t.re - n, t.im + e).log();
  return new w(Math.PI / 2 - i.im, i.re);
}, atan: function() {
  const e = this.re, n = this.im;
  if (e === 0) {
    if (n === 1) return new w(0, 1 / 0);
    if (n === -1) return new w(0, -1 / 0);
  }
  const t = e * e + (1 - n) * (1 - n), i = new w((1 - n * n - e * e) / t, -2 * e / t).log();
  return new w(-0.5 * i.im, 0.5 * i.re);
}, acot: function() {
  const e = this.re, n = this.im;
  if (n === 0) return new w(Math.atan2(1, e), 0);
  const t = e * e + n * n;
  return t !== 0 ? new w(e / t, -n / t).atan() : new w(e !== 0 ? e / 0 : 0, n !== 0 ? -n / 0 : 0).atan();
}, asec: function() {
  const e = this.re, n = this.im;
  if (e === 0 && n === 0) return new w(0, 1 / 0);
  const t = e * e + n * n;
  return t !== 0 ? new w(e / t, -n / t).acos() : new w(e !== 0 ? e / 0 : 0, n !== 0 ? -n / 0 : 0).acos();
}, acsc: function() {
  const e = this.re, n = this.im;
  if (e === 0 && n === 0) return new w(Math.PI / 2, 1 / 0);
  const t = e * e + n * n;
  return t !== 0 ? new w(e / t, -n / t).asin() : new w(e !== 0 ? e / 0 : 0, n !== 0 ? -n / 0 : 0).asin();
}, sinh: function() {
  const e = this.re, n = this.im;
  return new w(ne(e) * Math.cos(n), $(e) * Math.sin(n));
}, cosh: function() {
  const e = this.re, n = this.im;
  return new w($(e) * Math.cos(n), ne(e) * Math.sin(n));
}, tanh: function() {
  const e = 2 * this.re, n = 2 * this.im, t = $(e) + Math.cos(n);
  return new w(ne(e) / t, Math.sin(n) / t);
}, coth: function() {
  const e = 2 * this.re, n = 2 * this.im, t = $(e) - Math.cos(n);
  return new w(ne(e) / t, -Math.sin(n) / t);
}, csch: function() {
  const e = this.re, n = this.im, t = Math.cos(2 * n) - $(2 * e);
  return new w(-2 * ne(e) * Math.cos(n) / t, 2 * $(e) * Math.sin(n) / t);
}, sech: function() {
  const e = this.re, n = this.im, t = Math.cos(2 * n) + $(2 * e);
  return new w(2 * $(e) * Math.cos(n) / t, -2 * ne(e) * Math.sin(n) / t);
}, asinh: function() {
  let e = this.im;
  this.im = -this.re, this.re = e;
  const n = this.asin();
  return this.re = -this.im, this.im = e, e = n.re, n.re = -n.im, n.im = e, n;
}, acosh: function() {
  const e = this.acos();
  if (e.im <= 0) {
    const n = e.re;
    e.re = -e.im, e.im = n;
  } else {
    const n = e.im;
    e.im = -e.re, e.re = n;
  }
  return e;
}, atanh: function() {
  const e = this.re, n = this.im, t = e > 1 && n === 0, i = 1 - e, r = 1 + e, s = i * i + n * n, o = s !== 0 ? new w((r * i - n * n) / s, (n * i + r * n) / s) : new w(e !== -1 ? e / 0 : 0, n !== 0 ? n / 0 : 0), f = o.re;
  return o.re = Ue(o.re, o.im) / 2, o.im = Math.atan2(o.im, f) / 2, t && (o.im = -o.im), o;
}, acoth: function() {
  const e = this.re, n = this.im;
  if (e === 0 && n === 0) return new w(0, Math.PI / 2);
  const t = e * e + n * n;
  return t !== 0 ? new w(e / t, -n / t).atanh() : new w(e !== 0 ? e / 0 : 0, n !== 0 ? -n / 0 : 0).atanh();
}, acsch: function() {
  const e = this.re, n = this.im;
  if (n === 0) return new w(e !== 0 ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0, 0);
  const t = e * e + n * n;
  return t !== 0 ? new w(e / t, -n / t).asinh() : new w(e !== 0 ? e / 0 : 0, n !== 0 ? -n / 0 : 0).asinh();
}, asech: function() {
  const e = this.re, n = this.im;
  if (this.isZero()) return w.INFINITY;
  const t = e * e + n * n;
  return t !== 0 ? new w(e / t, -n / t).acosh() : new w(e !== 0 ? e / 0 : 0, n !== 0 ? -n / 0 : 0).acosh();
}, inverse: function() {
  if (this.isZero()) return w.INFINITY;
  if (this.isInfinite()) return w.ZERO;
  const e = this.re, n = this.im, t = e * e + n * n;
  return new w(e / t, -n / t);
}, conjugate: function() {
  return new w(this.re, -this.im);
}, neg: function() {
  return new w(-this.re, -this.im);
}, ceil: function(e) {
  return e = Math.pow(10, e || 0), new w(Math.ceil(this.re * e) / e, Math.ceil(this.im * e) / e);
}, floor: function(e) {
  return e = Math.pow(10, e || 0), new w(Math.floor(this.re * e) / e, Math.floor(this.im * e) / e);
}, round: function(e) {
  return e = Math.pow(10, e || 0), new w(Math.round(this.re * e) / e, Math.round(this.im * e) / e);
}, equals: function(e, n) {
  const t = we(e, n);
  return Math.abs(t.re - this.re) <= w.EPSILON && Math.abs(t.im - this.im) <= w.EPSILON;
}, clone: function() {
  return new w(this.re, this.im);
}, toString: function() {
  let e = this.re, n = this.im, t = "";
  return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(e) < w.EPSILON && (e = 0), Math.abs(n) < w.EPSILON && (n = 0), n === 0 ? t + e : (e !== 0 ? (t += e, t += " ", n < 0 ? (n = -n, t += "-") : t += "+", t += " ") : n < 0 && (n = -n, t += "-"), n !== 1 && (t += n), t + "i"));
}, toVector: function() {
  return [this.re, this.im];
}, valueOf: function() {
  return this.im === 0 ? this.re : null;
}, isNaN: function() {
  return isNaN(this.re) || isNaN(this.im);
}, isZero: function() {
  return this.im === 0 && this.re === 0;
}, isFinite: function() {
  return isFinite(this.re) && isFinite(this.im);
}, isInfinite: function() {
  return !this.isFinite();
} };
w.ZERO = new w(0, 0);
w.ONE = new w(1, 0);
w.I = new w(0, 1);
w.PI = new w(Math.PI, 0);
w.E = new w(Math.E, 0);
w.INFINITY = new w(1 / 0, 1 / 0);
w.NAN = new w(NaN, NaN);
w.EPSILON = 1e-15;
export {
  w as C,
  Le as D,
  tn as _,
  ui as t
};
