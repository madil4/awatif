var pf = Object.create;
var Pi = Object.defineProperty;
var mf = Object.getOwnPropertyDescriptor;
var vf = Object.getOwnPropertyNames;
var hf = Object.getPrototypeOf, df = Object.prototype.hasOwnProperty;
var Cn = (r, e) => (e = Symbol[r]) ? e : Symbol.for("Symbol." + r), Ir = Math.pow;
var Nt = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var gf = (r, e, t, a) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of vf(e))
      !df.call(r, n) && n !== t && Pi(r, n, { get: () => e[n], enumerable: !(a = mf(e, n)) || a.enumerable });
  return r;
};
var Bt = (r, e, t) => (t = r != null ? pf(hf(r)) : {}, gf(e || !r || !r.__esModule ? Pi(t, "default", { value: r, enumerable: true }) : t, r));
var Df = function(r, e) {
  this[0] = r, this[1] = e;
};
var Fn = (r) => {
  var e = r[Cn("asyncIterator")], t = false, a, n = {};
  return e == null ? (e = r[Cn("iterator")](), a = (i) => n[i] = (l) => e[i](l)) : (e = e.call(r), a = (i) => n[i] = (l) => {
    if (t) {
      if (t = false, i === "throw")
        throw l;
      return l;
    }
    return t = true, { done: false, value: new Df(new Promise((m) => {
      var f = e[i](l);
      if (!(f instanceof Object))
        throw TypeError("Object expected");
      m(f);
    }), 1) };
  }), n[Cn("iterator")] = () => n, a("next"), "throw" in e ? a("throw") : n.throw = (i) => {
    throw i;
  }, "return" in e && a("return"), n;
};
var po = Nt((Mn, Sn) => {
  (function(r, e) {
    typeof Mn == "object" && typeof Sn != "undefined" ? Sn.exports = e() : typeof define == "function" && define.amd ? define(e) : (r = typeof globalThis != "undefined" ? globalThis : r || self, r["'typed'"] = e());
  })(Mn, function() {
    function r() {
      return true;
    }
    function e() {
      return false;
    }
    function t() {
    }
    let a = "Argument is not a typed-function.";
    function n() {
      function l(N) {
        return typeof N == "object" && N !== null && N.constructor === Object;
      }
      let m = [{ name: "number", test: function(N) {
        return typeof N == "number";
      } }, { name: "string", test: function(N) {
        return typeof N == "string";
      } }, { name: "boolean", test: function(N) {
        return typeof N == "boolean";
      } }, { name: "Function", test: function(N) {
        return typeof N == "function";
      } }, { name: "Array", test: Array.isArray }, { name: "Date", test: function(N) {
        return N instanceof Date;
      } }, { name: "RegExp", test: function(N) {
        return N instanceof RegExp;
      } }, { name: "Object", test: l }, { name: "null", test: function(N) {
        return N === null;
      } }, { name: "undefined", test: function(N) {
        return N === void 0;
      } }], f = { name: "any", test: r, isAny: true }, u, o, s = 0, p = { createCount: 0 };
      function d(N) {
        let z = u.get(N);
        if (z)
          return z;
        let R = 'Unknown type "' + N + '"', $ = N.toLowerCase(), rr;
        for (rr of o)
          if (rr.toLowerCase() === $) {
            R += '. Did you mean "' + rr + '" ?';
            break;
          }
        throw new TypeError(R);
      }
      function g(N) {
        let z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any", R = z ? d(z).index : o.length, $ = [];
        for (let K = 0; K < N.length; ++K) {
          if (!N[K] || typeof N[K].name != "string" || typeof N[K].test != "function")
            throw new TypeError("Object with properties {name: string, test: function} expected");
          let ir = N[K].name;
          if (u.has(ir))
            throw new TypeError('Duplicate type name "' + ir + '"');
          $.push(ir), u.set(ir, { name: ir, test: N[K].test, isAny: N[K].isAny, index: R + K, conversionsTo: [] });
        }
        let rr = o.slice(R);
        o = o.slice(0, R).concat($).concat(rr);
        for (let K = R + $.length; K < o.length; ++K)
          u.get(o[K]).index = K;
      }
      function c() {
        u = /* @__PURE__ */ new Map(), o = [], s = 0, g([f], false);
      }
      c(), g(m);
      function v() {
        let N;
        for (N of o)
          u.get(N).conversionsTo = [];
        s = 0;
      }
      function h(N) {
        let z = o.filter((R) => {
          let $ = u.get(R);
          return !$.isAny && $.test(N);
        });
        return z.length ? z : ["any"];
      }
      function A(N) {
        return N && typeof N == "function" && "_typedFunctionData" in N;
      }
      function x(N, z, R) {
        if (!A(N))
          throw new TypeError(a);
        let $ = R && R.exact, rr = Array.isArray(z) ? z.join(",") : z, K = C(rr), ir = D(K);
        if (!$ || ir in N.signatures) {
          let Tr = N._typedFunctionData.signatureMap.get(ir);
          if (Tr)
            return Tr;
        }
        let tr = K.length, or;
        if ($) {
          or = [];
          let Tr;
          for (Tr in N.signatures)
            or.push(N._typedFunctionData.signatureMap.get(Tr));
        } else
          or = N._typedFunctionData.signatures;
        for (let Tr = 0; Tr < tr; ++Tr) {
          let Pr = K[Tr], Rr = [], ee;
          for (ee of or) {
            let kr = I(ee.params, Tr);
            if (!(!kr || Pr.restParam && !kr.restParam)) {
              if (!kr.hasAny) {
                let ve = y(kr);
                if (Pr.types.some((he) => !ve.has(he.name)))
                  continue;
              }
              Rr.push(ee);
            }
          }
          if (or = Rr, or.length === 0)
            break;
        }
        let er;
        for (er of or)
          if (er.params.length <= tr)
            return er;
        throw new TypeError("Signature not found (signature: " + (N.name || "unnamed") + "(" + D(K, ", ") + "))");
      }
      function E(N, z, R) {
        return x(N, z, R).implementation;
      }
      function w(N, z) {
        let R = d(z);
        if (R.test(N))
          return N;
        let $ = R.conversionsTo;
        if ($.length === 0)
          throw new Error("There are no conversions to " + z + " defined.");
        for (let rr = 0; rr < $.length; rr++)
          if (d($[rr].from).test(N))
            return $[rr].convert(N);
        throw new Error("Cannot convert " + N + " to " + z);
      }
      function D(N) {
        let z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
        return N.map((R) => R.name).join(z);
      }
      function b(N) {
        let z = N.indexOf("...") === 0, $ = (z ? N.length > 3 ? N.slice(3) : "any" : N).split("|").map((tr) => d(tr.trim())), rr = false, K = z ? "..." : "";
        return { types: $.map(function(tr) {
          return rr = tr.isAny || rr, K += tr.name + "|", { name: tr.name, typeIndex: tr.index, test: tr.test, isAny: tr.isAny, conversion: null, conversionIndex: -1 };
        }), name: K.slice(0, -1), hasAny: rr, hasConversion: false, restParam: z };
      }
      function F(N) {
        let z = N.types.map((ir) => ir.name), R = U(z), $ = N.hasAny, rr = N.name, K = R.map(function(ir) {
          let tr = d(ir.from);
          return $ = tr.isAny || $, rr += "|" + ir.from, { name: ir.from, typeIndex: tr.index, test: tr.test, isAny: tr.isAny, conversion: ir, conversionIndex: ir.index };
        });
        return { types: N.types.concat(K), name: rr, hasAny: $, hasConversion: K.length > 0, restParam: N.restParam };
      }
      function y(N) {
        return N.typeSet || (N.typeSet = /* @__PURE__ */ new Set(), N.types.forEach((z) => N.typeSet.add(z.name))), N.typeSet;
      }
      function C(N) {
        let z = [];
        if (typeof N != "string")
          throw new TypeError("Signatures must be strings");
        let R = N.trim();
        if (R === "")
          return z;
        let $ = R.split(",");
        for (let rr = 0; rr < $.length; ++rr) {
          let K = b($[rr].trim());
          if (K.restParam && rr !== $.length - 1)
            throw new SyntaxError('Unexpected rest parameter "' + $[rr] + '": only allowed for the last parameter');
          if (K.types.length === 0)
            return null;
          z.push(K);
        }
        return z;
      }
      function M(N) {
        let z = pr(N);
        return z ? z.restParam : false;
      }
      function S(N) {
        if (!N || N.types.length === 0)
          return r;
        if (N.types.length === 1)
          return d(N.types[0].name).test;
        if (N.types.length === 2) {
          let z = d(N.types[0].name).test, R = d(N.types[1].name).test;
          return function(rr) {
            return z(rr) || R(rr);
          };
        } else {
          let z = N.types.map(function(R) {
            return d(R.name).test;
          });
          return function($) {
            for (let rr = 0; rr < z.length; rr++)
              if (z[rr]($))
                return true;
            return false;
          };
        }
      }
      function O(N) {
        let z, R, $;
        if (M(N)) {
          z = fr(N).map(S);
          let rr = z.length, K = S(pr(N)), ir = function(tr) {
            for (let or = rr; or < tr.length; or++)
              if (!K(tr[or]))
                return false;
            return true;
          };
          return function(or) {
            for (let er = 0; er < z.length; er++)
              if (!z[er](or[er]))
                return false;
            return ir(or) && or.length >= rr + 1;
          };
        } else
          return N.length === 0 ? function(K) {
            return K.length === 0;
          } : N.length === 1 ? (R = S(N[0]), function(K) {
            return R(K[0]) && K.length === 1;
          }) : N.length === 2 ? (R = S(N[0]), $ = S(N[1]), function(K) {
            return R(K[0]) && $(K[1]) && K.length === 2;
          }) : (z = N.map(S), function(K) {
            for (let ir = 0; ir < z.length; ir++)
              if (!z[ir](K[ir]))
                return false;
            return K.length === z.length;
          });
      }
      function I(N, z) {
        return z < N.length ? N[z] : M(N) ? pr(N) : null;
      }
      function P(N, z) {
        let R = I(N, z);
        return R ? y(R) : /* @__PURE__ */ new Set();
      }
      function B(N) {
        return N.conversion === null || N.conversion === void 0;
      }
      function G(N, z) {
        let R = /* @__PURE__ */ new Set();
        return N.forEach(($) => {
          let rr = P($.params, z), K;
          for (K of rr)
            R.add(K);
        }), R.has("any") ? ["any"] : Array.from(R);
      }
      function q(N, z, R) {
        let $, rr, K = N || "unnamed", ir = R, tr;
        for (tr = 0; tr < z.length; tr++) {
          let Pr = [];
          if (ir.forEach((Rr) => {
            let ee = I(Rr.params, tr), kr = S(ee);
            (tr < Rr.params.length || M(Rr.params)) && kr(z[tr]) && Pr.push(Rr);
          }), Pr.length === 0) {
            if (rr = G(ir, tr), rr.length > 0) {
              let Rr = h(z[tr]);
              return $ = new TypeError("Unexpected type of argument in function " + K + " (expected: " + rr.join(" or ") + ", actual: " + Rr.join(" | ") + ", index: " + tr + ")"), $.data = { category: "wrongType", fn: K, index: tr, actual: Rr, expected: rr }, $;
            }
          } else
            ir = Pr;
        }
        let or = ir.map(function(Pr) {
          return M(Pr.params) ? 1 / 0 : Pr.params.length;
        });
        if (z.length < Math.min.apply(null, or))
          return rr = G(ir, tr), $ = new TypeError("Too few arguments in function " + K + " (expected: " + rr.join(" or ") + ", index: " + z.length + ")"), $.data = { category: "tooFewArgs", fn: K, index: z.length, expected: rr }, $;
        let er = Math.max.apply(null, or);
        if (z.length > er)
          return $ = new TypeError("Too many arguments in function " + K + " (expected: " + er + ", actual: " + z.length + ")"), $.data = { category: "tooManyArgs", fn: K, index: z.length, expectedLength: er }, $;
        let Tr = [];
        for (let Pr = 0; Pr < z.length; ++Pr)
          Tr.push(h(z[Pr]).join("|"));
        return $ = new TypeError('Arguments of type "' + Tr.join(", ") + '" do not match any of the defined signatures of function ' + K + "."), $.data = { category: "mismatch", actual: Tr }, $;
      }
      function T(N) {
        let z = o.length + 1;
        for (let R = 0; R < N.types.length; R++)
          B(N.types[R]) && (z = Math.min(z, N.types[R].typeIndex));
        return z;
      }
      function Z(N) {
        let z = s + 1;
        for (let R = 0; R < N.types.length; R++)
          B(N.types[R]) || (z = Math.min(z, N.types[R].conversionIndex));
        return z;
      }
      function X(N, z) {
        if (N.hasAny) {
          if (!z.hasAny)
            return 1;
        } else if (z.hasAny)
          return -1;
        if (N.restParam) {
          if (!z.restParam)
            return 1;
        } else if (z.restParam)
          return -1;
        if (N.hasConversion) {
          if (!z.hasConversion)
            return 1;
        } else if (z.hasConversion)
          return -1;
        let R = T(N) - T(z);
        if (R < 0)
          return -1;
        if (R > 0)
          return 1;
        let $ = Z(N) - Z(z);
        return $ < 0 ? -1 : $ > 0 ? 1 : 0;
      }
      function L(N, z) {
        let R = N.params, $ = z.params, rr = pr(R), K = pr($), ir = M(R), tr = M($);
        if (ir && rr.hasAny) {
          if (!tr || !K.hasAny)
            return 1;
        } else if (tr && K.hasAny)
          return -1;
        let or = 0, er = 0, Tr;
        for (Tr of R)
          Tr.hasAny && ++or, Tr.hasConversion && ++er;
        let Pr = 0, Rr = 0;
        for (Tr of $)
          Tr.hasAny && ++Pr, Tr.hasConversion && ++Rr;
        if (or !== Pr)
          return or - Pr;
        if (ir && rr.hasConversion) {
          if (!tr || !K.hasConversion)
            return 1;
        } else if (tr && K.hasConversion)
          return -1;
        if (er !== Rr)
          return er - Rr;
        if (ir) {
          if (!tr)
            return 1;
        } else if (tr)
          return -1;
        let ee = (R.length - $.length) * (ir ? -1 : 1);
        if (ee !== 0)
          return ee;
        let kr = [], ve = 0;
        for (let ke = 0; ke < R.length; ++ke) {
          let Mt = X(R[ke], $[ke]);
          kr.push(Mt), ve += Mt;
        }
        if (ve !== 0)
          return ve;
        let he;
        for (he of kr)
          if (he !== 0)
            return he;
        return 0;
      }
      function U(N) {
        if (N.length === 0)
          return [];
        let z = N.map(d);
        N.length > 1 && z.sort((rr, K) => rr.index - K.index);
        let R = z[0].conversionsTo;
        if (N.length === 1)
          return R;
        R = R.concat([]);
        let $ = new Set(N);
        for (let rr = 1; rr < z.length; ++rr) {
          let K;
          for (K of z[rr].conversionsTo)
            $.has(K.from) || (R.push(K), $.add(K.from));
        }
        return R;
      }
      function Q(N, z) {
        let R = z;
        if (N.some((rr) => rr.hasConversion)) {
          let rr = M(N), K = N.map(nr);
          R = function() {
            let tr = [], or = rr ? arguments.length - 1 : arguments.length;
            for (let er = 0; er < or; er++)
              tr[er] = K[er](arguments[er]);
            return rr && (tr[or] = arguments[or].map(K[or])), z.apply(this, tr);
          };
        }
        let $ = R;
        if (M(N)) {
          let rr = N.length - 1;
          $ = function() {
            return R.apply(this, xr(arguments, 0, rr).concat([xr(arguments, rr)]));
          };
        }
        return $;
      }
      function nr(N) {
        let z, R, $, rr, K = [], ir = [];
        switch (N.types.forEach(function(tr) {
          tr.conversion && (K.push(d(tr.conversion.from).test), ir.push(tr.conversion.convert));
        }), ir.length) {
          case 0:
            return function(or) {
              return or;
            };
          case 1:
            return z = K[0], $ = ir[0], function(or) {
              return z(or) ? $(or) : or;
            };
          case 2:
            return z = K[0], R = K[1], $ = ir[0], rr = ir[1], function(or) {
              return z(or) ? $(or) : R(or) ? rr(or) : or;
            };
          default:
            return function(or) {
              for (let er = 0; er < ir.length; er++)
                if (K[er](or))
                  return ir[er](or);
              return or;
            };
        }
      }
      function H(N) {
        function z(R, $, rr) {
          if ($ < R.length) {
            let K = R[$], ir = [];
            if (K.restParam) {
              let tr = K.types.filter(B);
              tr.length < K.types.length && ir.push({ types: tr, name: "..." + tr.map((or) => or.name).join("|"), hasAny: tr.some((or) => or.isAny), hasConversion: false, restParam: true }), ir.push(K);
            } else
              ir = K.types.map(function(tr) {
                return { types: [tr], name: tr.name, hasAny: tr.isAny, hasConversion: tr.conversion, restParam: false };
              });
            return cr(ir, function(tr) {
              return z(R, $ + 1, rr.concat([tr]));
            });
          } else
            return [rr];
        }
        return z(N, 0, []);
      }
      function V(N, z) {
        let R = Math.max(N.length, z.length);
        for (let tr = 0; tr < R; tr++) {
          let or = P(N, tr), er = P(z, tr), Tr = false, Pr;
          for (Pr of er)
            if (or.has(Pr)) {
              Tr = true;
              break;
            }
          if (!Tr)
            return false;
        }
        let $ = N.length, rr = z.length, K = M(N), ir = M(z);
        return K ? ir ? $ === rr : rr >= $ : ir ? $ >= rr : $ === rr;
      }
      function J(N) {
        return N.map((z) => Lr(z) ? Br(z.referToSelf.callback) : Ur(z) ? Er(z.referTo.references, z.referTo.callback) : z);
      }
      function k(N, z, R) {
        let $ = [], rr;
        for (rr of N) {
          let K = R[rr];
          if (typeof K != "number")
            throw new TypeError('No definition for referenced signature "' + rr + '"');
          if (K = z[K], typeof K != "function")
            return false;
          $.push(K);
        }
        return $;
      }
      function Y(N, z, R) {
        let $ = J(N), rr = new Array($.length).fill(false), K = true;
        for (; K; ) {
          K = false;
          let ir = true;
          for (let tr = 0; tr < $.length; ++tr) {
            if (rr[tr])
              continue;
            let or = $[tr];
            if (Lr(or))
              $[tr] = or.referToSelf.callback(R), $[tr].referToSelf = or.referToSelf, rr[tr] = true, ir = false;
            else if (Ur(or)) {
              let er = k(or.referTo.references, $, z);
              er ? ($[tr] = or.referTo.callback.apply(this, er), $[tr].referTo = or.referTo, rr[tr] = true, ir = false) : K = true;
            }
          }
          if (ir && K)
            throw new SyntaxError("Circular reference detected in resolving typed.referTo");
        }
        return $;
      }
      function ar(N) {
        let z = /\bthis(\(|\.signatures\b)/;
        Object.keys(N).forEach((R) => {
          let $ = N[R];
          if (z.test($.toString()))
            throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
        });
      }
      function j(N, z) {
        if (p.createCount++, Object.keys(z).length === 0)
          throw new SyntaxError("No signatures provided");
        p.warnAgainstDeprecatedThis && ar(z);
        let R = [], $ = [], rr = {}, K = [], ir;
        for (ir in z) {
          if (!Object.prototype.hasOwnProperty.call(z, ir))
            continue;
          let _r = C(ir);
          if (!_r)
            continue;
          R.forEach(function(ct) {
            if (V(ct, _r))
              throw new TypeError('Conflicting signatures "' + D(ct) + '" and "' + D(_r) + '".');
          }), R.push(_r);
          let te = $.length;
          $.push(z[ir]);
          let cf = _r.map(F), St;
          for (St of H(cf)) {
            let ct = D(St);
            K.push({ params: St, name: ct, fn: te }), St.every((lf) => !lf.hasConversion) && (rr[ct] = te);
          }
        }
        K.sort(L);
        let tr = Y($, rr, ft), or;
        for (or in rr)
          Object.prototype.hasOwnProperty.call(rr, or) && (rr[or] = tr[rr[or]]);
        let er = [], Tr = /* @__PURE__ */ new Map();
        for (or of K)
          Tr.has(or.name) || (or.fn = tr[or.fn], er.push(or), Tr.set(or.name, or));
        let Pr = er[0] && er[0].params.length <= 2 && !M(er[0].params), Rr = er[1] && er[1].params.length <= 2 && !M(er[1].params), ee = er[2] && er[2].params.length <= 2 && !M(er[2].params), kr = er[3] && er[3].params.length <= 2 && !M(er[3].params), ve = er[4] && er[4].params.length <= 2 && !M(er[4].params), he = er[5] && er[5].params.length <= 2 && !M(er[5].params), ke = Pr && Rr && ee && kr && ve && he;
        for (let _r = 0; _r < er.length; ++_r)
          er[_r].test = O(er[_r].params);
        let Mt = Pr ? S(er[0].params[0]) : e, Os = Rr ? S(er[1].params[0]) : e, Ps = ee ? S(er[2].params[0]) : e, qs = kr ? S(er[3].params[0]) : e, Rs = ve ? S(er[4].params[0]) : e, Us = he ? S(er[5].params[0]) : e, Ls = Pr ? S(er[0].params[1]) : e, Zs = Rr ? S(er[1].params[1]) : e, Vs = ee ? S(er[2].params[1]) : e, Qs = kr ? S(er[3].params[1]) : e, Gs = ve ? S(er[4].params[1]) : e, Ys = he ? S(er[5].params[1]) : e;
        for (let _r = 0; _r < er.length; ++_r)
          er[_r].implementation = Q(er[_r].params, er[_r].fn);
        let $s = Pr ? er[0].implementation : t, Js = Rr ? er[1].implementation : t, Xs = ee ? er[2].implementation : t, Ks = kr ? er[3].implementation : t, Ws = ve ? er[4].implementation : t, Hs = he ? er[5].implementation : t, ks = Pr ? er[0].params.length : -1, js = Rr ? er[1].params.length : -1, rf = ee ? er[2].params.length : -1, ef = kr ? er[3].params.length : -1, tf = ve ? er[4].params.length : -1, nf = he ? er[5].params.length : -1, af = ke ? 6 : 0, of = er.length, uf = er.map((_r) => _r.test), sf = er.map((_r) => _r.implementation), ff = function() {
          for (let te = af; te < of; te++)
            if (uf[te](arguments))
              return sf[te].apply(this, arguments);
          return p.onMismatch(N, arguments, er);
        };
        function ft(_r, te) {
          return arguments.length === ks && Mt(_r) && Ls(te) ? $s.apply(this, arguments) : arguments.length === js && Os(_r) && Zs(te) ? Js.apply(this, arguments) : arguments.length === rf && Ps(_r) && Vs(te) ? Xs.apply(this, arguments) : arguments.length === ef && qs(_r) && Qs(te) ? Ks.apply(this, arguments) : arguments.length === tf && Rs(_r) && Gs(te) ? Ws.apply(this, arguments) : arguments.length === nf && Us(_r) && Ys(te) ? Hs.apply(this, arguments) : ff.apply(this, arguments);
        }
        try {
          Object.defineProperty(ft, "name", { value: N });
        } catch (_r) {
        }
        return ft.signatures = rr, ft._typedFunctionData = { signatures: er, signatureMap: Tr }, ft;
      }
      function ur(N, z, R) {
        throw q(N, z, R);
      }
      function fr(N) {
        return xr(N, 0, N.length - 1);
      }
      function pr(N) {
        return N[N.length - 1];
      }
      function xr(N, z, R) {
        return Array.prototype.slice.call(N, z, R);
      }
      function wr(N, z) {
        for (let R = 0; R < N.length; R++)
          if (z(N[R]))
            return N[R];
      }
      function cr(N, z) {
        return Array.prototype.concat.apply([], N.map(z));
      }
      function Mr() {
        let N = fr(arguments).map((R) => D(C(R))), z = pr(arguments);
        if (typeof z != "function")
          throw new TypeError("Callback function expected as last argument");
        return Er(N, z);
      }
      function Er(N, z) {
        return { referTo: { references: N, callback: z } };
      }
      function Br(N) {
        if (typeof N != "function")
          throw new TypeError("Callback function expected as first argument");
        return { referToSelf: { callback: N } };
      }
      function Ur(N) {
        return N && typeof N.referTo == "object" && Array.isArray(N.referTo.references) && typeof N.referTo.callback == "function";
      }
      function Lr(N) {
        return N && typeof N.referToSelf == "object" && typeof N.referToSelf.callback == "function";
      }
      function qr(N, z) {
        if (!N)
          return z;
        if (z && z !== N) {
          let R = new Error("Function names do not match (expected: " + N + ", actual: " + z + ")");
          throw R.data = { actual: z, expected: N }, R;
        }
        return N;
      }
      function se(N) {
        let z;
        for (let R in N)
          Object.prototype.hasOwnProperty.call(N, R) && (A(N[R]) || typeof N[R].signature == "string") && (z = qr(z, N[R].name));
        return z;
      }
      function $r(N, z) {
        let R;
        for (R in z)
          if (Object.prototype.hasOwnProperty.call(z, R)) {
            if (R in N && z[R] !== N[R]) {
              let $ = new Error('Signature "' + R + '" is defined twice');
              throw $.data = { signature: R, sourceFunction: z[R], destFunction: N[R] }, $;
            }
            N[R] = z[R];
          }
      }
      let ye = p;
      p = function(N) {
        let z = typeof N == "string", R = z ? 1 : 0, $ = z ? N : "", rr = {};
        for (let K = R; K < arguments.length; ++K) {
          let ir = arguments[K], tr = {}, or;
          if (typeof ir == "function" ? (or = ir.name, typeof ir.signature == "string" ? tr[ir.signature] = ir : A(ir) && (tr = ir.signatures)) : l(ir) && (tr = ir, z || (or = se(ir))), Object.keys(tr).length === 0) {
            let er = new TypeError("Argument to 'typed' at index " + K + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
            throw er.data = { index: K, argument: ir }, er;
          }
          z || ($ = qr($, or)), $r(rr, tr);
        }
        return j($ || "", rr);
      }, p.create = n, p.createCount = ye.createCount, p.onMismatch = ur, p.throwMismatchError = ur, p.createError = q, p.clear = c, p.clearConversions = v, p.addTypes = g, p._findType = d, p.referTo = Mr, p.referToSelf = Br, p.convert = w, p.findSignature = x, p.find = E, p.isTypedFunction = A, p.warnAgainstDeprecatedThis = true, p.addType = function(N, z) {
        let R = "any";
        z !== false && u.has("Object") && (R = "Object"), p.addTypes([N], R);
      };
      function fe(N) {
        if (!N || typeof N.from != "string" || typeof N.to != "string" || typeof N.convert != "function")
          throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
        if (N.to === N.from)
          throw new SyntaxError('Illegal to define conversion from "' + N.from + '" to itself.');
      }
      return p.addConversion = function(N) {
        fe(N);
        let z = d(N.to);
        if (z.conversionsTo.every(function(R) {
          return R.from !== N.from;
        }))
          z.conversionsTo.push({ from: N.from, convert: N.convert, index: s++ });
        else
          throw new Error('There is already a conversion from "' + N.from + '" to "' + z.name + '"');
      }, p.addConversions = function(N) {
        N.forEach(p.addConversion);
      }, p.removeConversion = function(N) {
        fe(N);
        let z = d(N.to), R = wr(z.conversionsTo, (rr) => rr.from === N.from);
        if (!R)
          throw new Error("Attempt to remove nonexistent conversion from " + N.from + " to " + N.to);
        if (R.convert !== N.convert)
          throw new Error("Conversion to remove does not match existing conversion");
        let $ = z.conversionsTo.indexOf(R);
        z.conversionsTo.splice($, 1);
      }, p.resolve = function(N, z) {
        if (!A(N))
          throw new TypeError(a);
        let R = N._typedFunctionData.signatures;
        for (let $ = 0; $ < R.length; ++$)
          if (R[$].test(z))
            return R[$];
        return null;
      }, p;
    }
    var i = n();
    return i;
  });
});
var eu = Nt((Hn, ru) => {
  (function(r) {
    var e = Math.cosh || function(u) {
      return Math.abs(u) < 1e-9 ? 1 - u : (Math.exp(u) + Math.exp(-u)) * 0.5;
    }, t = Math.sinh || function(u) {
      return Math.abs(u) < 1e-9 ? u : (Math.exp(u) - Math.exp(-u)) * 0.5;
    }, a = function(u) {
      var o = Math.PI / 4;
      if (-o > u || u > o)
        return Math.cos(u) - 1;
      var s = u * u;
      return s * (s * (s * (s * (s * (s * (s * (s / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    }, n = function(u, o) {
      var s = Math.abs(u), p = Math.abs(o);
      return s < 3e3 && p < 3e3 ? Math.sqrt(s * s + p * p) : (s < p ? (s = p, p = u / o) : p = o / u, s * Math.sqrt(1 + p * p));
    }, i = function() {
      throw SyntaxError("Invalid Param");
    };
    function l(u, o) {
      var s = Math.abs(u), p = Math.abs(o);
      return u === 0 ? Math.log(p) : o === 0 ? Math.log(s) : s < 3e3 && p < 3e3 ? Math.log(u * u + o * o) * 0.5 : (u = u / 2, o = o / 2, 0.5 * Math.log(u * u + o * o) + Math.LN2);
    }
    var m = function(u, o) {
      var s = { re: 0, im: 0 };
      if (u == null)
        s.re = s.im = 0;
      else if (o !== void 0)
        s.re = u, s.im = o;
      else
        switch (typeof u) {
          case "object":
            if ("im" in u && "re" in u)
              s.re = u.re, s.im = u.im;
            else if ("abs" in u && "arg" in u) {
              if (!Number.isFinite(u.abs) && Number.isFinite(u.arg))
                return f.INFINITY;
              s.re = u.abs * Math.cos(u.arg), s.im = u.abs * Math.sin(u.arg);
            } else if ("r" in u && "phi" in u) {
              if (!Number.isFinite(u.r) && Number.isFinite(u.phi))
                return f.INFINITY;
              s.re = u.r * Math.cos(u.phi), s.im = u.r * Math.sin(u.phi);
            } else
              u.length === 2 ? (s.re = u[0], s.im = u[1]) : i();
            break;
          case "string":
            s.im = s.re = 0;
            var p = u.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), d = 1, g = 0;
            p === null && i();
            for (var c = 0; c < p.length; c++) {
              var v = p[c];
              v === " " || v === "	" || v === `
` || (v === "+" ? d++ : v === "-" ? g++ : v === "i" || v === "I" ? (d + g === 0 && i(), p[c + 1] !== " " && !isNaN(p[c + 1]) ? (s.im += parseFloat((g % 2 ? "-" : "") + p[c + 1]), c++) : s.im += parseFloat((g % 2 ? "-" : "") + "1"), d = g = 0) : ((d + g === 0 || isNaN(v)) && i(), p[c + 1] === "i" || p[c + 1] === "I" ? (s.im += parseFloat((g % 2 ? "-" : "") + v), c++) : s.re += parseFloat((g % 2 ? "-" : "") + v), d = g = 0));
            }
            d + g > 0 && i();
            break;
          case "number":
            s.im = 0, s.re = u;
            break;
          default:
            i();
        }
      return isNaN(s.re) || isNaN(s.im), s;
    };
    function f(u, o) {
      if (!(this instanceof f))
        return new f(u, o);
      var s = m(u, o);
      this.re = s.re, this.im = s.im;
    }
    f.prototype = { re: 0, im: 0, sign: function() {
      var u = this.abs();
      return new f(this.re / u, this.im / u);
    }, add: function(u, o) {
      var s = new f(u, o);
      return this.isInfinite() && s.isInfinite() ? f.NAN : this.isInfinite() || s.isInfinite() ? f.INFINITY : new f(this.re + s.re, this.im + s.im);
    }, sub: function(u, o) {
      var s = new f(u, o);
      return this.isInfinite() && s.isInfinite() ? f.NAN : this.isInfinite() || s.isInfinite() ? f.INFINITY : new f(this.re - s.re, this.im - s.im);
    }, mul: function(u, o) {
      var s = new f(u, o);
      return this.isInfinite() && s.isZero() || this.isZero() && s.isInfinite() ? f.NAN : this.isInfinite() || s.isInfinite() ? f.INFINITY : s.im === 0 && this.im === 0 ? new f(this.re * s.re, 0) : new f(this.re * s.re - this.im * s.im, this.re * s.im + this.im * s.re);
    }, div: function(u, o) {
      var s = new f(u, o);
      if (this.isZero() && s.isZero() || this.isInfinite() && s.isInfinite())
        return f.NAN;
      if (this.isInfinite() || s.isZero())
        return f.INFINITY;
      if (this.isZero() || s.isInfinite())
        return f.ZERO;
      u = this.re, o = this.im;
      var p = s.re, d = s.im, g, c;
      return d === 0 ? new f(u / p, o / p) : Math.abs(p) < Math.abs(d) ? (c = p / d, g = p * c + d, new f((u * c + o) / g, (o * c - u) / g)) : (c = d / p, g = d * c + p, new f((u + o * c) / g, (o - u * c) / g));
    }, pow: function(u, o) {
      var s = new f(u, o);
      if (u = this.re, o = this.im, s.isZero())
        return f.ONE;
      if (s.im === 0) {
        if (o === 0 && u > 0)
          return new f(Math.pow(u, s.re), 0);
        if (u === 0)
          switch ((s.re % 4 + 4) % 4) {
            case 0:
              return new f(Math.pow(o, s.re), 0);
            case 1:
              return new f(0, Math.pow(o, s.re));
            case 2:
              return new f(-Math.pow(o, s.re), 0);
            case 3:
              return new f(0, -Math.pow(o, s.re));
          }
      }
      if (u === 0 && o === 0 && s.re > 0 && s.im >= 0)
        return f.ZERO;
      var p = Math.atan2(o, u), d = l(u, o);
      return u = Math.exp(s.re * d - s.im * p), o = s.im * d + s.re * p, new f(u * Math.cos(o), u * Math.sin(o));
    }, sqrt: function() {
      var u = this.re, o = this.im, s = this.abs(), p, d;
      if (u >= 0) {
        if (o === 0)
          return new f(Math.sqrt(u), 0);
        p = 0.5 * Math.sqrt(2 * (s + u));
      } else
        p = Math.abs(o) / Math.sqrt(2 * (s - u));
      return u <= 0 ? d = 0.5 * Math.sqrt(2 * (s - u)) : d = Math.abs(o) / Math.sqrt(2 * (s + u)), new f(p, o < 0 ? -d : d);
    }, exp: function() {
      var u = Math.exp(this.re);
      return this.im, new f(u * Math.cos(this.im), u * Math.sin(this.im));
    }, expm1: function() {
      var u = this.re, o = this.im;
      return new f(Math.expm1(u) * Math.cos(o) + a(o), Math.exp(u) * Math.sin(o));
    }, log: function() {
      var u = this.re, o = this.im;
      return new f(l(u, o), Math.atan2(o, u));
    }, abs: function() {
      return n(this.re, this.im);
    }, arg: function() {
      return Math.atan2(this.im, this.re);
    }, sin: function() {
      var u = this.re, o = this.im;
      return new f(Math.sin(u) * e(o), Math.cos(u) * t(o));
    }, cos: function() {
      var u = this.re, o = this.im;
      return new f(Math.cos(u) * e(o), -Math.sin(u) * t(o));
    }, tan: function() {
      var u = 2 * this.re, o = 2 * this.im, s = Math.cos(u) + e(o);
      return new f(Math.sin(u) / s, t(o) / s);
    }, cot: function() {
      var u = 2 * this.re, o = 2 * this.im, s = Math.cos(u) - e(o);
      return new f(-Math.sin(u) / s, t(o) / s);
    }, sec: function() {
      var u = this.re, o = this.im, s = 0.5 * e(2 * o) + 0.5 * Math.cos(2 * u);
      return new f(Math.cos(u) * e(o) / s, Math.sin(u) * t(o) / s);
    }, csc: function() {
      var u = this.re, o = this.im, s = 0.5 * e(2 * o) - 0.5 * Math.cos(2 * u);
      return new f(Math.sin(u) * e(o) / s, -Math.cos(u) * t(o) / s);
    }, asin: function() {
      var u = this.re, o = this.im, s = new f(o * o - u * u + 1, -2 * u * o).sqrt(), p = new f(s.re - o, s.im + u).log();
      return new f(p.im, -p.re);
    }, acos: function() {
      var u = this.re, o = this.im, s = new f(o * o - u * u + 1, -2 * u * o).sqrt(), p = new f(s.re - o, s.im + u).log();
      return new f(Math.PI / 2 - p.im, p.re);
    }, atan: function() {
      var u = this.re, o = this.im;
      if (u === 0) {
        if (o === 1)
          return new f(0, 1 / 0);
        if (o === -1)
          return new f(0, -1 / 0);
      }
      var s = u * u + (1 - o) * (1 - o), p = new f((1 - o * o - u * u) / s, -2 * u / s).log();
      return new f(-0.5 * p.im, 0.5 * p.re);
    }, acot: function() {
      var u = this.re, o = this.im;
      if (o === 0)
        return new f(Math.atan2(1, u), 0);
      var s = u * u + o * o;
      return s !== 0 ? new f(u / s, -o / s).atan() : new f(u !== 0 ? u / 0 : 0, o !== 0 ? -o / 0 : 0).atan();
    }, asec: function() {
      var u = this.re, o = this.im;
      if (u === 0 && o === 0)
        return new f(0, 1 / 0);
      var s = u * u + o * o;
      return s !== 0 ? new f(u / s, -o / s).acos() : new f(u !== 0 ? u / 0 : 0, o !== 0 ? -o / 0 : 0).acos();
    }, acsc: function() {
      var u = this.re, o = this.im;
      if (u === 0 && o === 0)
        return new f(Math.PI / 2, 1 / 0);
      var s = u * u + o * o;
      return s !== 0 ? new f(u / s, -o / s).asin() : new f(u !== 0 ? u / 0 : 0, o !== 0 ? -o / 0 : 0).asin();
    }, sinh: function() {
      var u = this.re, o = this.im;
      return new f(t(u) * Math.cos(o), e(u) * Math.sin(o));
    }, cosh: function() {
      var u = this.re, o = this.im;
      return new f(e(u) * Math.cos(o), t(u) * Math.sin(o));
    }, tanh: function() {
      var u = 2 * this.re, o = 2 * this.im, s = e(u) + Math.cos(o);
      return new f(t(u) / s, Math.sin(o) / s);
    }, coth: function() {
      var u = 2 * this.re, o = 2 * this.im, s = e(u) - Math.cos(o);
      return new f(t(u) / s, -Math.sin(o) / s);
    }, csch: function() {
      var u = this.re, o = this.im, s = Math.cos(2 * o) - e(2 * u);
      return new f(-2 * t(u) * Math.cos(o) / s, 2 * e(u) * Math.sin(o) / s);
    }, sech: function() {
      var u = this.re, o = this.im, s = Math.cos(2 * o) + e(2 * u);
      return new f(2 * e(u) * Math.cos(o) / s, -2 * t(u) * Math.sin(o) / s);
    }, asinh: function() {
      var u = this.im;
      this.im = -this.re, this.re = u;
      var o = this.asin();
      return this.re = -this.im, this.im = u, u = o.re, o.re = -o.im, o.im = u, o;
    }, acosh: function() {
      var u = this.acos();
      if (u.im <= 0) {
        var o = u.re;
        u.re = -u.im, u.im = o;
      } else {
        var o = u.im;
        u.im = -u.re, u.re = o;
      }
      return u;
    }, atanh: function() {
      var u = this.re, o = this.im, s = u > 1 && o === 0, p = 1 - u, d = 1 + u, g = p * p + o * o, c = g !== 0 ? new f((d * p - o * o) / g, (o * p + d * o) / g) : new f(u !== -1 ? u / 0 : 0, o !== 0 ? o / 0 : 0), v = c.re;
      return c.re = l(c.re, c.im) / 2, c.im = Math.atan2(c.im, v) / 2, s && (c.im = -c.im), c;
    }, acoth: function() {
      var u = this.re, o = this.im;
      if (u === 0 && o === 0)
        return new f(0, Math.PI / 2);
      var s = u * u + o * o;
      return s !== 0 ? new f(u / s, -o / s).atanh() : new f(u !== 0 ? u / 0 : 0, o !== 0 ? -o / 0 : 0).atanh();
    }, acsch: function() {
      var u = this.re, o = this.im;
      if (o === 0)
        return new f(u !== 0 ? Math.log(u + Math.sqrt(u * u + 1)) : 1 / 0, 0);
      var s = u * u + o * o;
      return s !== 0 ? new f(u / s, -o / s).asinh() : new f(u !== 0 ? u / 0 : 0, o !== 0 ? -o / 0 : 0).asinh();
    }, asech: function() {
      var u = this.re, o = this.im;
      if (this.isZero())
        return f.INFINITY;
      var s = u * u + o * o;
      return s !== 0 ? new f(u / s, -o / s).acosh() : new f(u !== 0 ? u / 0 : 0, o !== 0 ? -o / 0 : 0).acosh();
    }, inverse: function() {
      if (this.isZero())
        return f.INFINITY;
      if (this.isInfinite())
        return f.ZERO;
      var u = this.re, o = this.im, s = u * u + o * o;
      return new f(u / s, -o / s);
    }, conjugate: function() {
      return new f(this.re, -this.im);
    }, neg: function() {
      return new f(-this.re, -this.im);
    }, ceil: function(u) {
      return u = Math.pow(10, u || 0), new f(Math.ceil(this.re * u) / u, Math.ceil(this.im * u) / u);
    }, floor: function(u) {
      return u = Math.pow(10, u || 0), new f(Math.floor(this.re * u) / u, Math.floor(this.im * u) / u);
    }, round: function(u) {
      return u = Math.pow(10, u || 0), new f(Math.round(this.re * u) / u, Math.round(this.im * u) / u);
    }, equals: function(u, o) {
      var s = new f(u, o);
      return Math.abs(s.re - this.re) <= f.EPSILON && Math.abs(s.im - this.im) <= f.EPSILON;
    }, clone: function() {
      return new f(this.re, this.im);
    }, toString: function() {
      var u = this.re, o = this.im, s = "";
      return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(u) < f.EPSILON && (u = 0), Math.abs(o) < f.EPSILON && (o = 0), o === 0 ? s + u : (u !== 0 ? (s += u, s += " ", o < 0 ? (o = -o, s += "-") : s += "+", s += " ") : o < 0 && (o = -o, s += "-"), o !== 1 && (s += o), s + "i"));
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
      return !(this.isNaN() || this.isFinite());
    } }, f.ZERO = new f(0, 0), f.ONE = new f(1, 0), f.I = new f(0, 1), f.PI = new f(Math.PI, 0), f.E = new f(Math.E, 0), f.INFINITY = new f(1 / 0, 1 / 0), f.NAN = new f(NaN, NaN), f.EPSILON = 1e-15, typeof define == "function" && define.amd ? define([], function() {
      return f;
    }) : typeof Hn == "object" ? (Object.defineProperty(f, "__esModule", { value: true }), f.default = f, f.Complex = f, ru.exports = f) : r.Complex = f;
  })(Hn);
});
var nu = Nt((jn, tu) => {
  (function(r) {
    var e = 2e3, t = { s: 1, n: 0, d: 1 };
    function a(c, v) {
      if (isNaN(c = parseInt(c, 10)))
        throw d();
      return c * v;
    }
    function n(c, v) {
      if (v === 0)
        throw p();
      var h = Object.create(s.prototype);
      h.s = c < 0 ? -1 : 1, c = c < 0 ? -c : c;
      var A = o(c, v);
      return h.n = c / A, h.d = v / A, h;
    }
    function i(c) {
      for (var v = {}, h = c, A = 2, x = 4; x <= h; ) {
        for (; h % A === 0; )
          h /= A, v[A] = (v[A] || 0) + 1;
        x += 1 + 2 * A++;
      }
      return h !== c ? h > 1 && (v[h] = (v[h] || 0) + 1) : v[c] = (v[c] || 0) + 1, v;
    }
    var l = function(c, v) {
      var h = 0, A = 1, x = 1, E = 0, w = 0, D = 0, b = 1, F = 1, y = 0, C = 1, M = 1, S = 1, O = 1e7, I;
      if (c != null)
        if (v !== void 0) {
          if (h = c, A = v, x = h * A, h % 1 !== 0 || A % 1 !== 0)
            throw g();
        } else
          switch (typeof c) {
            case "object": {
              if ("d" in c && "n" in c)
                h = c.n, A = c.d, "s" in c && (h *= c.s);
              else if (0 in c)
                h = c[0], 1 in c && (A = c[1]);
              else
                throw d();
              x = h * A;
              break;
            }
            case "number": {
              if (c < 0 && (x = c, c = -c), c % 1 === 0)
                h = c;
              else if (c > 0) {
                for (c >= 1 && (F = Math.pow(10, Math.floor(1 + Math.log(c) / Math.LN10)), c /= F); C <= O && S <= O; )
                  if (I = (y + M) / (C + S), c === I) {
                    C + S <= O ? (h = y + M, A = C + S) : S > C ? (h = M, A = S) : (h = y, A = C);
                    break;
                  } else
                    c > I ? (y += M, C += S) : (M += y, S += C), C > O ? (h = M, A = S) : (h = y, A = C);
                h *= F;
              } else
                (isNaN(c) || isNaN(v)) && (A = h = NaN);
              break;
            }
            case "string": {
              if (C = c.match(/\d+|./g), C === null)
                throw d();
              if (C[y] === "-" ? (x = -1, y++) : C[y] === "+" && y++, C.length === y + 1 ? w = a(C[y++], x) : C[y + 1] === "." || C[y] === "." ? (C[y] !== "." && (E = a(C[y++], x)), y++, (y + 1 === C.length || C[y + 1] === "(" && C[y + 3] === ")" || C[y + 1] === "'" && C[y + 3] === "'") && (w = a(C[y], x), b = Math.pow(10, C[y].length), y++), (C[y] === "(" && C[y + 2] === ")" || C[y] === "'" && C[y + 2] === "'") && (D = a(C[y + 1], x), F = Math.pow(10, C[y + 1].length) - 1, y += 3)) : C[y + 1] === "/" || C[y + 1] === ":" ? (w = a(C[y], x), b = a(C[y + 2], 1), y += 3) : C[y + 3] === "/" && C[y + 1] === " " && (E = a(C[y], x), w = a(C[y + 2], x), b = a(C[y + 4], 1), y += 5), C.length <= y) {
                A = b * F, x = h = D + A * E + F * w;
                break;
              }
            }
            default:
              throw d();
          }
      if (A === 0)
        throw p();
      t.s = x < 0 ? -1 : 1, t.n = Math.abs(h), t.d = Math.abs(A);
    };
    function m(c, v, h) {
      for (var A = 1; v > 0; c = c * c % h, v >>= 1)
        v & 1 && (A = A * c % h);
      return A;
    }
    function f(c, v) {
      for (; v % 2 === 0; v /= 2)
        ;
      for (; v % 5 === 0; v /= 5)
        ;
      if (v === 1)
        return 0;
      for (var h = 10 % v, A = 1; h !== 1; A++)
        if (h = h * 10 % v, A > e)
          return 0;
      return A;
    }
    function u(c, v, h) {
      for (var A = 1, x = m(10, h, v), E = 0; E < 300; E++) {
        if (A === x)
          return E;
        A = A * 10 % v, x = x * 10 % v;
      }
      return 0;
    }
    function o(c, v) {
      if (!c)
        return v;
      if (!v)
        return c;
      for (; ; ) {
        if (c %= v, !c)
          return v;
        if (v %= c, !v)
          return c;
      }
    }
    function s(c, v) {
      if (l(c, v), this instanceof s)
        c = o(t.d, t.n), this.s = t.s, this.n = t.n / c, this.d = t.d / c;
      else
        return n(t.s * t.n, t.d);
    }
    var p = function() {
      return new Error("Division by Zero");
    }, d = function() {
      return new Error("Invalid argument");
    }, g = function() {
      return new Error("Parameters must be integer");
    };
    s.prototype = { s: 1, n: 0, d: 1, abs: function() {
      return n(this.n, this.d);
    }, neg: function() {
      return n(-this.s * this.n, this.d);
    }, add: function(c, v) {
      return l(c, v), n(this.s * this.n * t.d + t.s * this.d * t.n, this.d * t.d);
    }, sub: function(c, v) {
      return l(c, v), n(this.s * this.n * t.d - t.s * this.d * t.n, this.d * t.d);
    }, mul: function(c, v) {
      return l(c, v), n(this.s * t.s * this.n * t.n, this.d * t.d);
    }, div: function(c, v) {
      return l(c, v), n(this.s * t.s * this.n * t.d, this.d * t.n);
    }, clone: function() {
      return n(this.s * this.n, this.d);
    }, mod: function(c, v) {
      if (isNaN(this.n) || isNaN(this.d))
        return new s(NaN);
      if (c === void 0)
        return n(this.s * this.n % this.d, 1);
      if (l(c, v), t.n === 0 && this.d === 0)
        throw p();
      return n(this.s * (t.d * this.n) % (t.n * this.d), t.d * this.d);
    }, gcd: function(c, v) {
      return l(c, v), n(o(t.n, this.n) * o(t.d, this.d), t.d * this.d);
    }, lcm: function(c, v) {
      return l(c, v), t.n === 0 && this.n === 0 ? n(0, 1) : n(t.n * this.n, o(t.n, this.n) * o(t.d, this.d));
    }, ceil: function(c) {
      return c = Math.pow(10, c || 0), isNaN(this.n) || isNaN(this.d) ? new s(NaN) : n(Math.ceil(c * this.s * this.n / this.d), c);
    }, floor: function(c) {
      return c = Math.pow(10, c || 0), isNaN(this.n) || isNaN(this.d) ? new s(NaN) : n(Math.floor(c * this.s * this.n / this.d), c);
    }, round: function(c) {
      return c = Math.pow(10, c || 0), isNaN(this.n) || isNaN(this.d) ? new s(NaN) : n(Math.round(c * this.s * this.n / this.d), c);
    }, inverse: function() {
      return n(this.s * this.d, this.n);
    }, pow: function(c, v) {
      if (l(c, v), t.d === 1)
        return t.s < 0 ? n(Math.pow(this.s * this.d, t.n), Math.pow(this.n, t.n)) : n(Math.pow(this.s * this.n, t.n), Math.pow(this.d, t.n));
      if (this.s < 0)
        return null;
      var h = i(this.n), A = i(this.d), x = 1, E = 1;
      for (var w in h)
        if (w !== "1") {
          if (w === "0") {
            x = 0;
            break;
          }
          if (h[w] *= t.n, h[w] % t.d === 0)
            h[w] /= t.d;
          else
            return null;
          x *= Math.pow(w, h[w]);
        }
      for (var w in A)
        if (w !== "1") {
          if (A[w] *= t.n, A[w] % t.d === 0)
            A[w] /= t.d;
          else
            return null;
          E *= Math.pow(w, A[w]);
        }
      return t.s < 0 ? n(E, x) : n(x, E);
    }, equals: function(c, v) {
      return l(c, v), this.s * this.n * t.d === t.s * t.n * this.d;
    }, compare: function(c, v) {
      l(c, v);
      var h = this.s * this.n * t.d - t.s * t.n * this.d;
      return (0 < h) - (h < 0);
    }, simplify: function(c) {
      if (isNaN(this.n) || isNaN(this.d))
        return this;
      c = c || 1e-3;
      for (var v = this.abs(), h = v.toContinued(), A = 1; A < h.length; A++) {
        for (var x = n(h[A - 1], 1), E = A - 2; E >= 0; E--)
          x = x.inverse().add(h[E]);
        if (Math.abs(x.sub(v).valueOf()) < c)
          return x.mul(this.s);
      }
      return this;
    }, divisible: function(c, v) {
      return l(c, v), !(!(t.n * this.d) || this.n * t.d % (t.n * this.d));
    }, valueOf: function() {
      return this.s * this.n / this.d;
    }, toFraction: function(c) {
      var v, h = "", A = this.n, x = this.d;
      return this.s < 0 && (h += "-"), x === 1 ? h += A : (c && (v = Math.floor(A / x)) > 0 && (h += v, h += " ", A %= x), h += A, h += "/", h += x), h;
    }, toLatex: function(c) {
      var v, h = "", A = this.n, x = this.d;
      return this.s < 0 && (h += "-"), x === 1 ? h += A : (c && (v = Math.floor(A / x)) > 0 && (h += v, A %= x), h += "\\frac{", h += A, h += "}{", h += x, h += "}"), h;
    }, toContinued: function() {
      var c, v = this.n, h = this.d, A = [];
      if (isNaN(v) || isNaN(h))
        return A;
      do
        A.push(Math.floor(v / h)), c = v % h, v = h, h = c;
      while (v !== 1);
      return A;
    }, toString: function(c) {
      var v = this.n, h = this.d;
      if (isNaN(v) || isNaN(h))
        return "NaN";
      c = c || 15;
      var A = f(v, h), x = u(v, h, A), E = this.s < 0 ? "-" : "";
      if (E += v / h | 0, v %= h, v *= 10, v && (E += "."), A) {
        for (var w = x; w--; )
          E += v / h | 0, v %= h, v *= 10;
        E += "(";
        for (var w = A; w--; )
          E += v / h | 0, v %= h, v *= 10;
        E += ")";
      } else
        for (var w = c; v && w--; )
          E += v / h | 0, v %= h, v *= 10;
      return E;
    } }, typeof jn == "object" ? (Object.defineProperty(s, "__esModule", { value: true }), s.default = s, s.Fraction = s, tu.exports = s) : r.Fraction = s;
  })(jn);
});
var $u = Nt((Ug, Yu) => {
  Yu.exports = function r(e, t) {
    var a = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, n = /(^[ ]*|[ ]*$)/g, i = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, l = /^0x[0-9a-f]+$/i, m = /^0/, f = function(x) {
      return r.insensitive && ("" + x).toLowerCase() || "" + x;
    }, u = f(e).replace(n, "") || "", o = f(t).replace(n, "") || "", s = u.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), p = o.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), d = parseInt(u.match(l), 16) || s.length !== 1 && u.match(i) && Date.parse(u), g = parseInt(o.match(l), 16) || d && o.match(i) && Date.parse(o) || null, c, v;
    if (g) {
      if (d < g)
        return -1;
      if (d > g)
        return 1;
    }
    for (var h = 0, A = Math.max(s.length, p.length); h < A; h++) {
      if (c = !(s[h] || "").match(m) && parseFloat(s[h]) || s[h] || 0, v = !(p[h] || "").match(m) && parseFloat(p[h]) || p[h] || 0, isNaN(c) !== isNaN(v))
        return isNaN(c) ? 1 : -1;
      if (typeof c != typeof v && (c += "", v += ""), c < v)
        return -1;
      if (c > v)
        return 1;
    }
    return 0;
  };
});
function de() {
  return de = Object.assign ? Object.assign.bind() : function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (r[a] = t[a]);
    }
    return r;
  }, de.apply(this, arguments);
}
var bn = { epsilon: 1e-12, matrix: "Matrix", number: "number", precision: 64, predictable: false, randomSeed: null };
function Fr(r) {
  return typeof r == "number";
}
function Cr(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function lt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function pt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function _t(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function Gr(r) {
  return typeof r == "string";
}
var Ar = Array.isArray;
function yr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function Ge(r) {
  return Array.isArray(r) || yr(r);
}
function Ye(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Ce(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Tt(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function ze(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function qi(r) {
  return typeof r == "boolean";
}
function Ri(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function Ui(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function Li(r) {
  return typeof r == "function";
}
function Zi(r) {
  return r instanceof Date;
}
function Vi(r) {
  return r instanceof RegExp;
}
function je(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !lt(r) && !pt(r));
}
function Qi(r) {
  return r === null;
}
function Gi(r) {
  return r === void 0;
}
function Yi(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function $i(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function Ji(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Xi(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Ki(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function Wi(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function Hi(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function ki(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function ji(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function ro(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function eo(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function to(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function no(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function ao(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function io(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function oo(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function uo(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function Zr(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : Cr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function hr(r) {
  var e = typeof r;
  if (e === "number" || e === "string" || e === "boolean" || r === null || r === void 0)
    return r;
  if (typeof r.clone == "function")
    return r.clone();
  if (Array.isArray(r))
    return r.map(function(t) {
      return hr(t);
    });
  if (r instanceof Date)
    return new Date(r.valueOf());
  if (Cr(r))
    return r;
  if (je(r))
    return xf(r, hr);
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function xf(r, e) {
  var t = {};
  for (var a in r)
    rt(r, a) && (t[a] = e(r[a]));
  return t;
}
function so(r, e) {
  for (var t in e)
    rt(e, t) && (r[t] = e[t]);
  return r;
}
function Fe(r, e) {
  var t, a, n;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length)
      return false;
    for (a = 0, n = r.length; a < n; a++)
      if (!Fe(r[a], e[a]))
        return false;
    return true;
  } else {
    if (typeof r == "function")
      return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object))
        return false;
      for (t in r)
        if (!(t in e) || !Fe(r[t], e[t]))
          return false;
      for (t in e)
        if (!(t in r))
          return false;
      return true;
    } else
      return r === e;
  }
}
function rt(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function fo(r, e) {
  for (var t = {}, a = 0; a < e.length; a++) {
    var n = e[a], i = r[n];
    i !== void 0 && (t[n] = i);
  }
  return t;
}
var co = ["Matrix", "Array"], lo = ["number", "BigNumber", "Fraction"];
var Xr = function(e) {
  if (e)
    throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(bn);
};
de(Xr, bn, { MATRIX_OPTIONS: co, NUMBER_OPTIONS: lo });
var Zn = Bt(po(), 1);
function dr(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var ho = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function Nn(r, e, t) {
  var a = { 2: "0b", 8: "0o", 16: "0x" }, n = a[e], i = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!dr(t))
      throw new Error("size must be an integer");
    if (r > Ir(2, t - 1) - 1 || r < -Ir(2, t - 1))
      throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!dr(r))
      throw new Error("Value must be an integer");
    r < 0 && (r = r + Ir(2, t)), i = "i".concat(t);
  }
  var l = "";
  return r < 0 && (r = -r, l = "-"), "".concat(l).concat(n).concat(r.toString(e)).concat(i);
}
function mt(r, e) {
  if (typeof e == "function")
    return e(r);
  if (r === 1 / 0)
    return "Infinity";
  if (r === -1 / 0)
    return "-Infinity";
  if (isNaN(r))
    return "NaN";
  var { notation: t, precision: a, wordSize: n } = Bn(e);
  switch (t) {
    case "fixed":
      return wo(r, a);
    case "exponential":
      return Eo(r, a);
    case "engineering":
      return yf(r, a);
    case "bin":
      return Nn(r, 2, n);
    case "oct":
      return Nn(r, 8, n);
    case "hex":
      return Nn(r, 16, n);
    case "auto":
      return Af(r, a, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var i = arguments[2], l = arguments[4];
        return i !== "." ? i + l : l;
      });
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Bn(r) {
  var e = "auto", t, a;
  if (r !== void 0)
    if (Fr(r))
      t = r;
    else if (Cr(r))
      t = r.toNumber();
    else if (je(r))
      r.precision !== void 0 && (t = mo(r.precision, () => {
        throw new Error('Option "precision" must be a number or BigNumber');
      })), r.wordSize !== void 0 && (a = mo(r.wordSize, () => {
        throw new Error('Option "wordSize" must be a number or BigNumber');
      })), r.notation && (e = r.notation);
    else
      throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: t, wordSize: a };
}
function It(r) {
  var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e)
    throw new SyntaxError("Invalid number " + r);
  var t = e[1], a = e[2], n = parseFloat(e[4] || "0"), i = a.indexOf(".");
  n += i !== -1 ? i - 1 : a.length - 1;
  var l = a.replace(".", "").replace(/^0*/, function(m) {
    return n -= m.length, "";
  }).replace(/0*$/, "").split("").map(function(m) {
    return parseInt(m);
  });
  return l.length === 0 && (l.push(0), n++), { sign: t, coefficients: l, exponent: n };
}
function yf(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var t = It(r), a = zt(t, e), n = a.exponent, i = a.coefficients, l = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3;
  if (Fr(e))
    for (; e > i.length || n - l + 1 > i.length; )
      i.push(0);
  else
    for (var m = Math.abs(n - l) - (i.length - 1), f = 0; f < m; f++)
      i.push(0);
  for (var u = Math.abs(n - l), o = 1; u > 0; )
    o++, u--;
  var s = i.slice(o).join(""), p = Fr(e) && s.length || s.match(/[1-9]/) ? "." + s : "", d = i.slice(0, o).join("") + p + "e" + (n >= 0 ? "+" : "") + l.toString();
  return a.sign + d;
}
function wo(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var t = It(r), a = typeof e == "number" ? zt(t, t.exponent + 1 + e) : t, n = a.coefficients, i = a.exponent + 1, l = i + (e || 0);
  return n.length < l && (n = n.concat(et(l - n.length))), i < 0 && (n = et(-i + 1).concat(n), i = 1), i < n.length && n.splice(i, 0, i === 0 ? "0." : "."), a.sign + n.join("");
}
function Eo(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var t = It(r), a = e ? zt(t, e) : t, n = a.coefficients, i = a.exponent;
  n.length < e && (n = n.concat(et(e - n.length)));
  var l = n.shift();
  return a.sign + l + (n.length > 0 ? "." + n.join("") : "") + "e" + (i >= 0 ? "+" : "") + i;
}
function Af(r, e, t) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var a = vo(t == null ? void 0 : t.lowerExp, -3), n = vo(t == null ? void 0 : t.upperExp, 5), i = It(r), l = e ? zt(i, e) : i;
  if (l.exponent < a || l.exponent >= n)
    return Eo(r, e);
  var m = l.coefficients, f = l.exponent;
  m.length < e && (m = m.concat(et(e - m.length))), m = m.concat(et(f - m.length + 1 + (m.length < e ? e - m.length : 0))), m = et(-f).concat(m);
  var u = f > 0 ? f : 0;
  return u < m.length - 1 && m.splice(u + 1, 0, "."), l.sign + m.join("");
}
function zt(r, e) {
  for (var t = { sign: r.sign, coefficients: r.coefficients, exponent: r.exponent }, a = t.coefficients; e <= 0; )
    a.unshift(0), t.exponent++, e++;
  if (a.length > e) {
    var n = a.splice(e, a.length - e);
    if (n[0] >= 5) {
      var i = e - 1;
      for (a[i]++; a[i] === 10; )
        a.pop(), i === 0 && (a.unshift(0), t.exponent++, i++), i--, a[i]++;
    }
  }
  return t;
}
function et(r) {
  for (var e = [], t = 0; t < r; t++)
    e.push(0);
  return e;
}
function Co(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
var wf = Number.EPSILON || 2220446049250313e-31;
function Kr(r, e, t) {
  if (t == null)
    return r === e;
  if (r === e)
    return true;
  if (isNaN(r) || isNaN(e))
    return false;
  if (isFinite(r) && isFinite(e)) {
    var a = Math.abs(r - e);
    return a <= wf ? true : a <= Math.max(Math.abs(r), Math.abs(e)) * t;
  }
  return false;
}
function mo(r, e) {
  if (Fr(r))
    return r;
  if (Cr(r))
    return r.toNumber();
  e();
}
function vo(r, e) {
  return Fr(r) ? r : Cr(r) ? r.toNumber() : e;
}
function _n(r, e, t) {
  var a = r.constructor, n = new a(2), i = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!dr(t))
      throw new Error("size must be an integer");
    if (r.greaterThan(n.pow(t - 1).sub(1)) || r.lessThan(n.pow(t - 1).mul(-1)))
      throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!r.isInteger())
      throw new Error("Value must be an integer");
    r.lessThan(0) && (r = r.add(n.pow(t))), i = "i".concat(t);
  }
  switch (e) {
    case 2:
      return "".concat(r.toBinary()).concat(i);
    case 8:
      return "".concat(r.toOctal()).concat(i);
    case 16:
      return "".concat(r.toHexadecimal()).concat(i);
    default:
      throw new Error("Base ".concat(e, " not supported "));
  }
}
function Mo(r, e) {
  if (typeof e == "function")
    return e(r);
  if (!r.isFinite())
    return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: t, precision: a, wordSize: n } = Bn(e);
  switch (t) {
    case "fixed":
      return Cf(r, a);
    case "exponential":
      return Fo(r, a);
    case "engineering":
      return Ef(r, a);
    case "bin":
      return _n(r, 2, n);
    case "oct":
      return _n(r, 8, n);
    case "hex":
      return _n(r, 16, n);
    case "auto": {
      var i = bo(e == null ? void 0 : e.lowerExp, -3), l = bo(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero())
        return "0";
      var m, f = r.toSignificantDigits(a), u = f.e;
      return u >= i && u < l ? m = f.toFixed() : m = Fo(r, a), m.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], s = arguments[4];
        return o !== "." ? o + s : s;
      });
    }
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Ef(r, e) {
  var t = r.e, a = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3, n = r.mul(Math.pow(10, -a)), i = n.toPrecision(e);
  if (i.indexOf("e") !== -1) {
    var l = r.constructor;
    i = new l(i).toFixed();
  }
  return i + "e" + (t >= 0 ? "+" : "") + a.toString();
}
function Fo(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function Cf(r, e) {
  return r.toFixed(e);
}
function bo(r, e) {
  return Fr(r) ? r : Cr(r) ? r.toNumber() : e;
}
function Sr(r, e) {
  var t = Ff(r, e);
  return e && typeof e == "object" && "truncate" in e && t.length > e.truncate ? t.substring(0, e.truncate - 3) + "..." : t;
}
function Ff(r, e) {
  if (typeof r == "number")
    return mt(r, e);
  if (Cr(r))
    return Mo(r, e);
  if (bf(r))
    return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
  if (Array.isArray(r))
    return Bo(r, e);
  if (Gr(r))
    return So(r);
  if (typeof r == "function")
    return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function")
      return r.format(e);
    if (r && r.toString(e) !== {}.toString())
      return r.toString(e);
    var t = Object.keys(r).map((a) => So(a) + ": " + Sr(r[a], e));
    return "{" + t.join(", ") + "}";
  }
  return String(r);
}
function So(r) {
  for (var e = String(r), t = "", a = 0; a < e.length; ) {
    var n = e.charAt(a);
    t += n in No ? No[n] : n, a++;
  }
  return '"' + t + '"';
}
var No = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function Bo(r, e) {
  if (Array.isArray(r)) {
    for (var t = "[", a = r.length, n = 0; n < a; n++)
      n !== 0 && (t += ", "), t += Bo(r[n], e);
    return t += "]", t;
  } else
    return Sr(r, e);
}
function bf(r) {
  return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || false;
}
function vr(r, e, t) {
  if (!(this instanceof vr))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = t, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
vr.prototype = new RangeError();
vr.prototype.constructor = RangeError;
vr.prototype.name = "DimensionError";
vr.prototype.isDimensionError = true;
function be(r, e, t) {
  if (!(this instanceof be))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = t), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
be.prototype = new RangeError();
be.prototype.constructor = RangeError;
be.prototype.name = "IndexError";
be.prototype.isIndexError = true;
function br(r) {
  for (var e = []; Array.isArray(r); )
    e.push(r.length), r = r[0];
  return e;
}
function _o(r, e, t) {
  var a, n = r.length;
  if (n !== e[t])
    throw new vr(n, e[t]);
  if (t < e.length - 1) {
    var i = t + 1;
    for (a = 0; a < n; a++) {
      var l = r[a];
      if (!Array.isArray(l))
        throw new vr(e.length - 1, e.length, "<");
      _o(r[a], e, i);
    }
  } else
    for (a = 0; a < n; a++)
      if (Array.isArray(r[a]))
        throw new vr(e.length + 1, e.length, ">");
}
function In(r, e) {
  var t = e.length === 0;
  if (t) {
    if (Array.isArray(r))
      throw new vr(r.length, 0);
  } else
    _o(r, e, 0);
}
function vt(r, e) {
  var t = r.isMatrix ? r._size : br(r), a = e._sourceSize;
  a.forEach((n, i) => {
    if (n !== null && n !== t[i])
      throw new vr(n, t[i]);
  });
}
function Nr(r, e) {
  if (r !== void 0) {
    if (!Fr(r) || !dr(r))
      throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e)
      throw new be(r, e);
  }
}
function $e(r) {
  for (var e = 0; e < r._dimensions.length; ++e) {
    var t = r._dimensions[e];
    if (t._data && Ar(t._data)) {
      if (t._size[0] === 0)
        return true;
    } else if (t.isRange) {
      if (t.start === t.end)
        return true;
    } else if (Gr(t) && t.length === 0)
      return true;
  }
  return false;
}
function Je(r, e, t) {
  if (!Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new Error("Resizing to scalar is not supported");
  e.forEach(function(n) {
    if (!Fr(n) || !dr(n) || n < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Sr(e) + ")");
  }), (Fr(r) || Cr(r)) && (r = [r]);
  var a = t !== void 0 ? t : 0;
  return Tn(r, e, 0, a), r;
}
function Tn(r, e, t, a) {
  var n, i, l = r.length, m = e[t], f = Math.min(l, m);
  if (r.length = m, t < e.length - 1) {
    var u = t + 1;
    for (n = 0; n < f; n++)
      i = r[n], Array.isArray(i) || (i = [i], r[n] = i), Tn(i, e, u, a);
    for (n = f; n < m; n++)
      i = [], r[n] = i, Tn(i, e, u, a);
  } else {
    for (n = 0; n < f; n++)
      for (; Array.isArray(r[n]); )
        r[n] = r[n][0];
    for (n = f; n < m; n++)
      r[n] = a;
  }
}
function ht(r, e) {
  var t = Oe(r), a = t.length;
  if (!Array.isArray(r) || !Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new vr(0, a, "!=");
  e = dt(e, a);
  var n = To(e);
  if (a !== n)
    throw new vr(n, a, "!=");
  try {
    return Mf(t, e);
  } catch (i) {
    throw i instanceof vr ? new vr(n, a, "!=") : i;
  }
}
function dt(r, e) {
  var t = To(r), a = r.slice(), n = -1, i = r.indexOf(n), l = r.indexOf(n, i + 1) >= 0;
  if (l)
    throw new Error("More than one wildcard in sizes");
  var m = i >= 0, f = e % t === 0;
  if (m)
    if (f)
      a[i] = -e / t;
    else
      throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -t);
  return a;
}
function To(r) {
  return r.reduce((e, t) => e * t, 1);
}
function Mf(r, e) {
  for (var t = r, a, n = e.length - 1; n > 0; n--) {
    var i = e[n];
    a = [];
    for (var l = t.length / i, m = 0; m < l; m++)
      a.push(t.slice(m * i, (m + 1) * i));
    t = a;
  }
  return t;
}
function Ot(r, e, t, a) {
  var n = a || br(r);
  if (t)
    for (var i = 0; i < t; i++)
      r = [r], n.unshift(1);
  for (r = Io(r, e, 0); n.length < e; )
    n.push(1);
  return r;
}
function Io(r, e, t) {
  var a, n;
  if (Array.isArray(r)) {
    var i = t + 1;
    for (a = 0, n = r.length; a < n; a++)
      r[a] = Io(r[a], e, i);
  } else
    for (var l = t; l < e; l++)
      r = [r];
  return r;
}
function Oe(r) {
  if (!Array.isArray(r))
    return r;
  var e = [];
  return r.forEach(function t(a) {
    Array.isArray(a) ? a.forEach(t) : e.push(a);
  }), e;
}
function zn(r) {
  if (!Array.isArray(r))
    throw new TypeError("Array input expected");
  if (r.length === 0)
    return r;
  var e = [], t = 0;
  e[0] = { value: r[0], identifier: 0 };
  for (var a = 1; a < r.length; a++)
    r[a] === r[a - 1] ? t++ : t = 0, e.push({ value: r[a], identifier: t });
  return e;
}
function On(r) {
  if (!Array.isArray(r))
    throw new TypeError("Array input expected");
  if (r.length === 0)
    return r;
  for (var e = [], t = 0; t < r.length; t++)
    e.push(r[t].value);
  return e;
}
function Pe(r, e) {
  for (var t, a = 0, n = 0; n < r.length; n++) {
    var i = r[n], l = Array.isArray(i);
    if (n === 0 && l && (a = i.length), l && i.length !== a)
      return;
    var m = l ? Pe(i, e) : e(i);
    if (t === void 0)
      t = m;
    else if (t !== m)
      return "mixed";
  }
  return t;
}
function zo(r, e, t, a) {
  if (a < t) {
    if (r.length !== e.length)
      throw new vr(r.length, e.length);
    for (var n = [], i = 0; i < r.length; i++)
      n[i] = zo(r[i], e[i], t, a + 1);
    return n;
  } else
    return r.concat(e);
}
function Pn() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1)
    return r[0];
  if (r.length > 1)
    return r.slice(1).reduce(function(t, a) {
      return zo(t, a, e, 0);
    }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Sf() {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
    e[t] = arguments[t];
  for (var a = e.map((p) => p.length), n = Math.max(...a), i = new Array(n).fill(null), l = 0; l < e.length; l++)
    for (var m = e[l], f = a[l], u = 0; u < f; u++) {
      var o = n - f + u;
      m[u] > i[o] && (i[o] = m[u]);
    }
  for (var s = 0; s < e.length; s++)
    gt(e[s], i);
  return i;
}
function gt(r, e) {
  for (var t = e.length, a = r.length, n = 0; n < a; n++) {
    var i = t - a + n;
    if (r[n] < e[i] && r[n] > 1 || r[n] > e[i])
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(a, " with size ").concat(r[n], " to size ").concat(e[i]));
  }
}
function qn(r, e) {
  var t = br(r);
  if (Fe(t, e))
    return r;
  gt(t, e);
  var a = Sf(t, e), n = a.length, i = [...Array(n - t.length).fill(1), ...t], l = Bf(r);
  t.length < n && (l = ht(l, i), t = br(l));
  for (var m = 0; m < n; m++)
    t[m] < a[m] && (l = Nf(l, a[m], m), t = br(l));
  return l;
}
function Nf(r, e, t) {
  return Pn(...Array(e).fill(r), t);
}
function Bf(r) {
  return de([], r);
}
function _(r, e, t, a) {
  function n(i) {
    var l = fo(i, e.map(If));
    return _f(r, e, i), t(l);
  }
  return n.isFactory = true, n.fn = r, n.dependencies = e.slice().sort(), a && (n.meta = a), n;
}
function _f(r, e, t) {
  var a = e.filter((i) => !Tf(i)).every((i) => t[i] !== void 0);
  if (!a) {
    var n = e.filter((i) => t[i] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(n.map((i) => '"'.concat(i, '"')).join(", "), "."));
  }
}
function Tf(r) {
  return r && r[0] === "?";
}
function If(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function Pt(r, e) {
  if (qo(r) && Po(r, e))
    return r[e];
  throw typeof r[e] == "function" && zf(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function qt(r, e, t) {
  if (qo(r) && Po(r, e))
    return r[e] = t, t;
  throw new Error('No access to property "' + e + '"');
}
function Oo(r, e) {
  return e in r;
}
function Po(r, e) {
  return !r || typeof r != "object" ? false : rt(Of, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function zf(r, e) {
  return r == null || typeof r[e] != "function" || rt(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : rt(Pf, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function qo(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var Of = { length: true, name: true }, Pf = { toString: true, valueOf: true, toLocaleString: true };
var Rn = class {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).values();
  }
  get(e) {
    return Pt(this.wrappedObject, e);
  }
  set(e, t) {
    return qt(this.wrappedObject, e, t), this;
  }
  has(e) {
    return Oo(this.wrappedObject, e);
  }
  entries() {
    return qf(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var t of this.keys())
      e(this.get(t), t, this);
  }
  delete(e) {
    delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys())
      this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
};
function qf(r, e) {
  return { next: () => {
    var t = r.next();
    return t.done ? t : { value: e(t.value), done: false };
  } };
}
function Ro(r) {
  return r ? r instanceof Map || r instanceof Rn || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
var Uo = function() {
  return Uo = Zn.default.create, Zn.default;
}, Rf = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], Vn = _("typed", Rf, function(e) {
  var { BigNumber: t, Complex: a, DenseMatrix: n, Fraction: i } = e, l = Uo();
  return l.clear(), l.addTypes([{ name: "number", test: Fr }, { name: "Complex", test: lt }, { name: "BigNumber", test: Cr }, { name: "Fraction", test: pt }, { name: "Unit", test: _t }, { name: "identifier", test: (m) => Gr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(m) }, { name: "string", test: Gr }, { name: "Chain", test: uo }, { name: "Array", test: Ar }, { name: "Matrix", test: yr }, { name: "DenseMatrix", test: Ye }, { name: "SparseMatrix", test: Ce }, { name: "Range", test: Tt }, { name: "Index", test: ze }, { name: "boolean", test: qi }, { name: "ResultSet", test: Ri }, { name: "Help", test: Ui }, { name: "function", test: Li }, { name: "Date", test: Zi }, { name: "RegExp", test: Vi }, { name: "null", test: Qi }, { name: "undefined", test: Gi }, { name: "AccessorNode", test: Yi }, { name: "ArrayNode", test: $i }, { name: "AssignmentNode", test: Ji }, { name: "BlockNode", test: Xi }, { name: "ConditionalNode", test: Ki }, { name: "ConstantNode", test: Wi }, { name: "FunctionNode", test: ki }, { name: "FunctionAssignmentNode", test: Hi }, { name: "IndexNode", test: ji }, { name: "Node", test: ro }, { name: "ObjectNode", test: eo }, { name: "OperatorNode", test: to }, { name: "ParenthesisNode", test: no }, { name: "RangeNode", test: ao }, { name: "RelationalNode", test: io }, { name: "SymbolNode", test: oo }, { name: "Map", test: Ro }, { name: "Object", test: je }]), l.addConversions([{ from: "number", to: "BigNumber", convert: function(f) {
    if (t || Un(f), Co(f) > 15)
      throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + f + "). Use function bignumber(x) to convert to BigNumber.");
    return new t(f);
  } }, { from: "number", to: "Complex", convert: function(f) {
    return a || Rt(f), new a(f, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(f) {
    return a || Rt(f), new a(f.toNumber(), 0);
  } }, { from: "Fraction", to: "BigNumber", convert: function(f) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(f) {
    return a || Rt(f), new a(f.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(f) {
    i || Ln(f);
    var u = new i(f);
    if (u.valueOf() !== f)
      throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + f + "). Use function fraction(x) to convert to Fraction.");
    return u;
  } }, { from: "string", to: "number", convert: function(f) {
    var u = Number(f);
    if (isNaN(u))
      throw new Error('Cannot convert "' + f + '" to a number');
    return u;
  } }, { from: "string", to: "BigNumber", convert: function(f) {
    t || Un(f);
    try {
      return new t(f);
    } catch (u) {
      throw new Error('Cannot convert "' + f + '" to BigNumber');
    }
  } }, { from: "string", to: "Fraction", convert: function(f) {
    i || Ln(f);
    try {
      return new i(f);
    } catch (u) {
      throw new Error('Cannot convert "' + f + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(f) {
    a || Rt(f);
    try {
      return new a(f);
    } catch (u) {
      throw new Error('Cannot convert "' + f + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(f) {
    return +f;
  } }, { from: "boolean", to: "BigNumber", convert: function(f) {
    return t || Un(f), new t(+f);
  } }, { from: "boolean", to: "Fraction", convert: function(f) {
    return i || Ln(f), new i(+f);
  } }, { from: "boolean", to: "string", convert: function(f) {
    return String(f);
  } }, { from: "Array", to: "Matrix", convert: function(f) {
    return n || Uf(), new n(f);
  } }, { from: "Matrix", to: "Array", convert: function(f) {
    return f.valueOf();
  } }]), l.onMismatch = (m, f, u) => {
    var o = l.createError(m, f, u);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && Ge(f[0]) && u.some((p) => !p.params.includes(","))) {
      var s = new TypeError("Function '".concat(m, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(m, ")'."));
      throw s.data = o.data, s;
    }
    throw o;
  }, l.onMismatch = (m, f, u) => {
    var o = l.createError(m, f, u);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && Ge(f[0]) && u.some((p) => !p.params.includes(","))) {
      var s = new TypeError("Function '".concat(m, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(m, ")'."));
      throw s.data = o.data, s;
    }
    throw o;
  }, l;
});
function Un(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function Rt(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function Uf() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function Ln(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var tt = 9e15, Le = 1e9, Qn = "0123456789abcdef", Lt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", Zt = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Gn = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -tt, maxE: tt, crypto: false }, Qo, Me, Dr = true, Qt = "[DecimalError] ", Ue = Qt + "Invalid argument: ", Go = Qt + "Precision limit exceeded", Yo = Qt + "crypto unavailable", $o = "[object Decimal]", Wr = Math.floor, Vr = Math.pow, Lf = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Zf = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Vf = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Jo = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, De = 1e7, mr = 7, Qf = 9007199254740991, Gf = Lt.length - 1, Yn = Zt.length - 1, W = { toStringTag: $o };
W.absoluteValue = W.abs = function() {
  var r = new this.constructor(this);
  return r.s < 0 && (r.s = 1), lr(r);
};
W.ceil = function() {
  return lr(new this.constructor(this), this.e + 1, 2);
};
W.clampedTo = W.clamp = function(r, e) {
  var t, a = this, n = a.constructor;
  if (r = new n(r), e = new n(e), !r.s || !e.s)
    return new n(NaN);
  if (r.gt(e))
    throw Error(Ue + e);
  return t = a.cmp(r), t < 0 ? r : a.cmp(e) > 0 ? e : new n(a);
};
W.comparedTo = W.cmp = function(r) {
  var e, t, a, n, i = this, l = i.d, m = (r = new i.constructor(r)).d, f = i.s, u = r.s;
  if (!l || !m)
    return !f || !u ? NaN : f !== u ? f : l === m ? 0 : !l ^ f < 0 ? 1 : -1;
  if (!l[0] || !m[0])
    return l[0] ? f : m[0] ? -u : 0;
  if (f !== u)
    return f;
  if (i.e !== r.e)
    return i.e > r.e ^ f < 0 ? 1 : -1;
  for (a = l.length, n = m.length, e = 0, t = a < n ? a : n; e < t; ++e)
    if (l[e] !== m[e])
      return l[e] > m[e] ^ f < 0 ? 1 : -1;
  return a === n ? 0 : a > n ^ f < 0 ? 1 : -1;
};
W.cosine = W.cos = function() {
  var r, e, t = this, a = t.constructor;
  return t.d ? t.d[0] ? (r = a.precision, e = a.rounding, a.precision = r + Math.max(t.e, t.sd()) + mr, a.rounding = 1, t = Yf(a, ko(a, t)), a.precision = r, a.rounding = e, lr(Me == 2 || Me == 3 ? t.neg() : t, r, e, true)) : new a(1) : new a(NaN);
};
W.cubeRoot = W.cbrt = function() {
  var r, e, t, a, n, i, l, m, f, u, o = this, s = o.constructor;
  if (!o.isFinite() || o.isZero())
    return new s(o);
  for (Dr = false, i = o.s * Vr(o.s * o, 1 / 3), !i || Math.abs(i) == 1 / 0 ? (t = Jr(o.d), r = o.e, (i = (r - t.length + 1) % 3) && (t += i == 1 || i == -2 ? "0" : "00"), i = Vr(t, 1 / 3), r = Wr((r + 1) / 3) - (r % 3 == (r < 0 ? -1 : 2)), i == 1 / 0 ? t = "5e" + r : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + r), a = new s(t), a.s = o.s) : a = new s(i.toString()), l = (r = s.precision) + 3; ; )
    if (m = a, f = m.times(m).times(m), u = f.plus(o), a = zr(u.plus(o).times(m), u.plus(f), l + 2, 1), Jr(m.d).slice(0, l) === (t = Jr(a.d)).slice(0, l))
      if (t = t.slice(l - 3, l + 1), t == "9999" || !n && t == "4999") {
        if (!n && (lr(m, r + 1, 0), m.times(m).times(m).eq(o))) {
          a = m;
          break;
        }
        l += 4, n = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (lr(a, r + 1, 1), e = !a.times(a).times(a).eq(o));
        break;
      }
  return Dr = true, lr(a, r, s.rounding, e);
};
W.decimalPlaces = W.dp = function() {
  var r, e = this.d, t = NaN;
  if (e) {
    if (r = e.length - 1, t = (r - Wr(this.e / mr)) * mr, r = e[r], r)
      for (; r % 10 == 0; r /= 10)
        t--;
    t < 0 && (t = 0);
  }
  return t;
};
W.dividedBy = W.div = function(r) {
  return zr(this, new this.constructor(r));
};
W.dividedToIntegerBy = W.divToInt = function(r) {
  var e = this, t = e.constructor;
  return lr(zr(e, new t(r), 0, 1, 1), t.precision, t.rounding);
};
W.equals = W.eq = function(r) {
  return this.cmp(r) === 0;
};
W.floor = function() {
  return lr(new this.constructor(this), this.e + 1, 3);
};
W.greaterThan = W.gt = function(r) {
  return this.cmp(r) > 0;
};
W.greaterThanOrEqualTo = W.gte = function(r) {
  var e = this.cmp(r);
  return e == 1 || e === 0;
};
W.hyperbolicCosine = W.cosh = function() {
  var r, e, t, a, n, i = this, l = i.constructor, m = new l(1);
  if (!i.isFinite())
    return new l(i.s ? 1 / 0 : NaN);
  if (i.isZero())
    return m;
  t = l.precision, a = l.rounding, l.precision = t + Math.max(i.e, i.sd()) + 4, l.rounding = 1, n = i.d.length, n < 32 ? (r = Math.ceil(n / 3), e = (1 / Yt(4, r)).toString()) : (r = 16, e = "2.3283064365386962890625e-10"), i = nt(l, 1, i.times(e), new l(1), true);
  for (var f, u = r, o = new l(8); u--; )
    f = i.times(i), i = m.minus(f.times(o.minus(f.times(o))));
  return lr(i, l.precision = t, l.rounding = a, true);
};
W.hyperbolicSine = W.sinh = function() {
  var r, e, t, a, n = this, i = n.constructor;
  if (!n.isFinite() || n.isZero())
    return new i(n);
  if (e = i.precision, t = i.rounding, i.precision = e + Math.max(n.e, n.sd()) + 4, i.rounding = 1, a = n.d.length, a < 3)
    n = nt(i, 2, n, n, true);
  else {
    r = 1.4 * Math.sqrt(a), r = r > 16 ? 16 : r | 0, n = n.times(1 / Yt(5, r)), n = nt(i, 2, n, n, true);
    for (var l, m = new i(5), f = new i(16), u = new i(20); r--; )
      l = n.times(n), n = n.times(m.plus(l.times(f.times(l).plus(u))));
  }
  return i.precision = e, i.rounding = t, lr(n, e, t, true);
};
W.hyperbolicTangent = W.tanh = function() {
  var r, e, t = this, a = t.constructor;
  return t.isFinite() ? t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + 7, a.rounding = 1, zr(t.sinh(), t.cosh(), a.precision = r, a.rounding = e)) : new a(t.s);
};
W.inverseCosine = W.acos = function() {
  var r, e = this, t = e.constructor, a = e.abs().cmp(1), n = t.precision, i = t.rounding;
  return a !== -1 ? a === 0 ? e.isNeg() ? ge(t, n, i) : new t(0) : new t(NaN) : e.isZero() ? ge(t, n + 4, i).times(0.5) : (t.precision = n + 6, t.rounding = 1, e = e.asin(), r = ge(t, n + 4, i).times(0.5), t.precision = n, t.rounding = i, r.minus(e));
};
W.inverseHyperbolicCosine = W.acosh = function() {
  var r, e, t = this, a = t.constructor;
  return t.lte(1) ? new a(t.eq(1) ? 0 : NaN) : t.isFinite() ? (r = a.precision, e = a.rounding, a.precision = r + Math.max(Math.abs(t.e), t.sd()) + 4, a.rounding = 1, Dr = false, t = t.times(t).minus(1).sqrt().plus(t), Dr = true, a.precision = r, a.rounding = e, t.ln()) : new a(t);
};
W.inverseHyperbolicSine = W.asinh = function() {
  var r, e, t = this, a = t.constructor;
  return !t.isFinite() || t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, a.rounding = 1, Dr = false, t = t.times(t).plus(1).sqrt().plus(t), Dr = true, a.precision = r, a.rounding = e, t.ln());
};
W.inverseHyperbolicTangent = W.atanh = function() {
  var r, e, t, a, n = this, i = n.constructor;
  return n.isFinite() ? n.e >= 0 ? new i(n.abs().eq(1) ? n.s / 0 : n.isZero() ? n : NaN) : (r = i.precision, e = i.rounding, a = n.sd(), Math.max(a, r) < 2 * -n.e - 1 ? lr(new i(n), r, e, true) : (i.precision = t = a - n.e, n = zr(n.plus(1), new i(1).minus(n), t + r, 1), i.precision = r + 4, i.rounding = 1, n = n.ln(), i.precision = r, i.rounding = e, n.times(0.5))) : new i(NaN);
};
W.inverseSine = W.asin = function() {
  var r, e, t, a, n = this, i = n.constructor;
  return n.isZero() ? new i(n) : (e = n.abs().cmp(1), t = i.precision, a = i.rounding, e !== -1 ? e === 0 ? (r = ge(i, t + 4, a).times(0.5), r.s = n.s, r) : new i(NaN) : (i.precision = t + 6, i.rounding = 1, n = n.div(new i(1).minus(n.times(n)).sqrt().plus(1)).atan(), i.precision = t, i.rounding = a, n.times(2)));
};
W.inverseTangent = W.atan = function() {
  var r, e, t, a, n, i, l, m, f, u = this, o = u.constructor, s = o.precision, p = o.rounding;
  if (u.isFinite()) {
    if (u.isZero())
      return new o(u);
    if (u.abs().eq(1) && s + 4 <= Yn)
      return l = ge(o, s + 4, p).times(0.25), l.s = u.s, l;
  } else {
    if (!u.s)
      return new o(NaN);
    if (s + 4 <= Yn)
      return l = ge(o, s + 4, p).times(0.5), l.s = u.s, l;
  }
  for (o.precision = m = s + 10, o.rounding = 1, t = Math.min(28, m / mr + 2 | 0), r = t; r; --r)
    u = u.div(u.times(u).plus(1).sqrt().plus(1));
  for (Dr = false, e = Math.ceil(m / mr), a = 1, f = u.times(u), l = new o(u), n = u; r !== -1; )
    if (n = n.times(f), i = l.minus(n.div(a += 2)), n = n.times(f), l = i.plus(n.div(a += 2)), l.d[e] !== void 0)
      for (r = e; l.d[r] === i.d[r] && r--; )
        ;
  return t && (l = l.times(2 << t - 1)), Dr = true, lr(l, o.precision = s, o.rounding = p, true);
};
W.isFinite = function() {
  return !!this.d;
};
W.isInteger = W.isInt = function() {
  return !!this.d && Wr(this.e / mr) > this.d.length - 2;
};
W.isNaN = function() {
  return !this.s;
};
W.isNegative = W.isNeg = function() {
  return this.s < 0;
};
W.isPositive = W.isPos = function() {
  return this.s > 0;
};
W.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
W.lessThan = W.lt = function(r) {
  return this.cmp(r) < 0;
};
W.lessThanOrEqualTo = W.lte = function(r) {
  return this.cmp(r) < 1;
};
W.logarithm = W.log = function(r) {
  var e, t, a, n, i, l, m, f, u = this, o = u.constructor, s = o.precision, p = o.rounding, d = 5;
  if (r == null)
    r = new o(10), e = true;
  else {
    if (r = new o(r), t = r.d, r.s < 0 || !t || !t[0] || r.eq(1))
      return new o(NaN);
    e = r.eq(10);
  }
  if (t = u.d, u.s < 0 || !t || !t[0] || u.eq(1))
    return new o(t && !t[0] ? -1 / 0 : u.s != 1 ? NaN : t ? 0 : 1 / 0);
  if (e)
    if (t.length > 1)
      i = true;
    else {
      for (n = t[0]; n % 10 === 0; )
        n /= 10;
      i = n !== 1;
    }
  if (Dr = false, m = s + d, l = Re(u, m), a = e ? Vt(o, m + 10) : Re(r, m), f = zr(l, a, m, 1), Dt(f.d, n = s, p))
    do
      if (m += 10, l = Re(u, m), a = e ? Vt(o, m + 10) : Re(r, m), f = zr(l, a, m, 1), !i) {
        +Jr(f.d).slice(n + 1, n + 15) + 1 == 1e14 && (f = lr(f, s + 1, 0));
        break;
      }
    while (Dt(f.d, n += 10, p));
  return Dr = true, lr(f, s, p);
};
W.minus = W.sub = function(r) {
  var e, t, a, n, i, l, m, f, u, o, s, p, d = this, g = d.constructor;
  if (r = new g(r), !d.d || !r.d)
    return !d.s || !r.s ? r = new g(NaN) : d.d ? r.s = -r.s : r = new g(r.d || d.s !== r.s ? d : NaN), r;
  if (d.s != r.s)
    return r.s = -r.s, d.plus(r);
  if (u = d.d, p = r.d, m = g.precision, f = g.rounding, !u[0] || !p[0]) {
    if (p[0])
      r.s = -r.s;
    else if (u[0])
      r = new g(d);
    else
      return new g(f === 3 ? -0 : 0);
    return Dr ? lr(r, m, f) : r;
  }
  if (t = Wr(r.e / mr), o = Wr(d.e / mr), u = u.slice(), i = o - t, i) {
    for (s = i < 0, s ? (e = u, i = -i, l = p.length) : (e = p, t = o, l = u.length), a = Math.max(Math.ceil(m / mr), l) + 2, i > a && (i = a, e.length = 1), e.reverse(), a = i; a--; )
      e.push(0);
    e.reverse();
  } else {
    for (a = u.length, l = p.length, s = a < l, s && (l = a), a = 0; a < l; a++)
      if (u[a] != p[a]) {
        s = u[a] < p[a];
        break;
      }
    i = 0;
  }
  for (s && (e = u, u = p, p = e, r.s = -r.s), l = u.length, a = p.length - l; a > 0; --a)
    u[l++] = 0;
  for (a = p.length; a > i; ) {
    if (u[--a] < p[a]) {
      for (n = a; n && u[--n] === 0; )
        u[n] = De - 1;
      --u[n], u[a] += De;
    }
    u[a] -= p[a];
  }
  for (; u[--l] === 0; )
    u.pop();
  for (; u[0] === 0; u.shift())
    --t;
  return u[0] ? (r.d = u, r.e = Gt(u, t), Dr ? lr(r, m, f) : r) : new g(f === 3 ? -0 : 0);
};
W.modulo = W.mod = function(r) {
  var e, t = this, a = t.constructor;
  return r = new a(r), !t.d || !r.s || r.d && !r.d[0] ? new a(NaN) : !r.d || t.d && !t.d[0] ? lr(new a(t), a.precision, a.rounding) : (Dr = false, a.modulo == 9 ? (e = zr(t, r.abs(), 0, 3, 1), e.s *= r.s) : e = zr(t, r, 0, a.modulo, 1), e = e.times(r), Dr = true, t.minus(e));
};
W.naturalExponential = W.exp = function() {
  return $n(this);
};
W.naturalLogarithm = W.ln = function() {
  return Re(this);
};
W.negated = W.neg = function() {
  var r = new this.constructor(this);
  return r.s = -r.s, lr(r);
};
W.plus = W.add = function(r) {
  var e, t, a, n, i, l, m, f, u, o, s = this, p = s.constructor;
  if (r = new p(r), !s.d || !r.d)
    return !s.s || !r.s ? r = new p(NaN) : s.d || (r = new p(r.d || s.s === r.s ? s : NaN)), r;
  if (s.s != r.s)
    return r.s = -r.s, s.minus(r);
  if (u = s.d, o = r.d, m = p.precision, f = p.rounding, !u[0] || !o[0])
    return o[0] || (r = new p(s)), Dr ? lr(r, m, f) : r;
  if (i = Wr(s.e / mr), a = Wr(r.e / mr), u = u.slice(), n = i - a, n) {
    for (n < 0 ? (t = u, n = -n, l = o.length) : (t = o, a = i, l = u.length), i = Math.ceil(m / mr), l = i > l ? i + 1 : l + 1, n > l && (n = l, t.length = 1), t.reverse(); n--; )
      t.push(0);
    t.reverse();
  }
  for (l = u.length, n = o.length, l - n < 0 && (n = l, t = o, o = u, u = t), e = 0; n; )
    e = (u[--n] = u[n] + o[n] + e) / De | 0, u[n] %= De;
  for (e && (u.unshift(e), ++a), l = u.length; u[--l] == 0; )
    u.pop();
  return r.d = u, r.e = Gt(u, a), Dr ? lr(r, m, f) : r;
};
W.precision = W.sd = function(r) {
  var e, t = this;
  if (r !== void 0 && r !== !!r && r !== 1 && r !== 0)
    throw Error(Ue + r);
  return t.d ? (e = Xo(t.d), r && t.e + 1 > e && (e = t.e + 1)) : e = NaN, e;
};
W.round = function() {
  var r = this, e = r.constructor;
  return lr(new e(r), r.e + 1, e.rounding);
};
W.sine = W.sin = function() {
  var r, e, t = this, a = t.constructor;
  return t.isFinite() ? t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + Math.max(t.e, t.sd()) + mr, a.rounding = 1, t = Jf(a, ko(a, t)), a.precision = r, a.rounding = e, lr(Me > 2 ? t.neg() : t, r, e, true)) : new a(NaN);
};
W.squareRoot = W.sqrt = function() {
  var r, e, t, a, n, i, l = this, m = l.d, f = l.e, u = l.s, o = l.constructor;
  if (u !== 1 || !m || !m[0])
    return new o(!u || u < 0 && (!m || m[0]) ? NaN : m ? l : 1 / 0);
  for (Dr = false, u = Math.sqrt(+l), u == 0 || u == 1 / 0 ? (e = Jr(m), (e.length + f) % 2 == 0 && (e += "0"), u = Math.sqrt(e), f = Wr((f + 1) / 2) - (f < 0 || f % 2), u == 1 / 0 ? e = "5e" + f : (e = u.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + f), a = new o(e)) : a = new o(u.toString()), t = (f = o.precision) + 3; ; )
    if (i = a, a = i.plus(zr(l, i, t + 2, 1)).times(0.5), Jr(i.d).slice(0, t) === (e = Jr(a.d)).slice(0, t))
      if (e = e.slice(t - 3, t + 1), e == "9999" || !n && e == "4999") {
        if (!n && (lr(i, f + 1, 0), i.times(i).eq(l))) {
          a = i;
          break;
        }
        t += 4, n = 1;
      } else {
        (!+e || !+e.slice(1) && e.charAt(0) == "5") && (lr(a, f + 1, 1), r = !a.times(a).eq(l));
        break;
      }
  return Dr = true, lr(a, f, o.rounding, r);
};
W.tangent = W.tan = function() {
  var r, e, t = this, a = t.constructor;
  return t.isFinite() ? t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + 10, a.rounding = 1, t = t.sin(), t.s = 1, t = zr(t, new a(1).minus(t.times(t)).sqrt(), r + 10, 0), a.precision = r, a.rounding = e, lr(Me == 2 || Me == 4 ? t.neg() : t, r, e, true)) : new a(NaN);
};
W.times = W.mul = function(r) {
  var e, t, a, n, i, l, m, f, u, o = this, s = o.constructor, p = o.d, d = (r = new s(r)).d;
  if (r.s *= o.s, !p || !p[0] || !d || !d[0])
    return new s(!r.s || p && !p[0] && !d || d && !d[0] && !p ? NaN : !p || !d ? r.s / 0 : r.s * 0);
  for (t = Wr(o.e / mr) + Wr(r.e / mr), f = p.length, u = d.length, f < u && (i = p, p = d, d = i, l = f, f = u, u = l), i = [], l = f + u, a = l; a--; )
    i.push(0);
  for (a = u; --a >= 0; ) {
    for (e = 0, n = f + a; n > a; )
      m = i[n] + d[a] * p[n - a - 1] + e, i[n--] = m % De | 0, e = m / De | 0;
    i[n] = (i[n] + e) % De | 0;
  }
  for (; !i[--l]; )
    i.pop();
  return e ? ++t : i.shift(), r.d = i, r.e = Gt(i, t), Dr ? lr(r, s.precision, s.rounding) : r;
};
W.toBinary = function(r, e) {
  return Xn(this, 2, r, e);
};
W.toDecimalPlaces = W.toDP = function(r, e) {
  var t = this, a = t.constructor;
  return t = new a(t), r === void 0 ? t : (ne(r, 0, Le), e === void 0 ? e = a.rounding : ne(e, 0, 8), lr(t, r + t.e + 1, e));
};
W.toExponential = function(r, e) {
  var t, a = this, n = a.constructor;
  return r === void 0 ? t = Ae(a, true) : (ne(r, 0, Le), e === void 0 ? e = n.rounding : ne(e, 0, 8), a = lr(new n(a), r + 1, e), t = Ae(a, true, r + 1)), a.isNeg() && !a.isZero() ? "-" + t : t;
};
W.toFixed = function(r, e) {
  var t, a, n = this, i = n.constructor;
  return r === void 0 ? t = Ae(n) : (ne(r, 0, Le), e === void 0 ? e = i.rounding : ne(e, 0, 8), a = lr(new i(n), r + n.e + 1, e), t = Ae(a, false, r + a.e + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
};
W.toFraction = function(r) {
  var e, t, a, n, i, l, m, f, u, o, s, p, d = this, g = d.d, c = d.constructor;
  if (!g)
    return new c(d);
  if (u = t = new c(1), a = f = new c(0), e = new c(a), i = e.e = Xo(g) - d.e - 1, l = i % mr, e.d[0] = Vr(10, l < 0 ? mr + l : l), r == null)
    r = i > 0 ? e : u;
  else {
    if (m = new c(r), !m.isInt() || m.lt(u))
      throw Error(Ue + m);
    r = m.gt(e) ? i > 0 ? e : u : m;
  }
  for (Dr = false, m = new c(Jr(g)), o = c.precision, c.precision = i = g.length * mr * 2; s = zr(m, e, 0, 1, 1), n = t.plus(s.times(a)), n.cmp(r) != 1; )
    t = a, a = n, n = u, u = f.plus(s.times(n)), f = n, n = e, e = m.minus(s.times(n)), m = n;
  return n = zr(r.minus(t), a, 0, 1, 1), f = f.plus(n.times(u)), t = t.plus(n.times(a)), f.s = u.s = d.s, p = zr(u, a, i, 1).minus(d).abs().cmp(zr(f, t, i, 1).minus(d).abs()) < 1 ? [u, a] : [f, t], c.precision = o, Dr = true, p;
};
W.toHexadecimal = W.toHex = function(r, e) {
  return Xn(this, 16, r, e);
};
W.toNearest = function(r, e) {
  var t = this, a = t.constructor;
  if (t = new a(t), r == null) {
    if (!t.d)
      return t;
    r = new a(1), e = a.rounding;
  } else {
    if (r = new a(r), e === void 0 ? e = a.rounding : ne(e, 0, 8), !t.d)
      return r.s ? t : r;
    if (!r.d)
      return r.s && (r.s = t.s), r;
  }
  return r.d[0] ? (Dr = false, t = zr(t, r, 0, e, 1).times(r), Dr = true, lr(t)) : (r.s = t.s, t = r), t;
};
W.toNumber = function() {
  return +this;
};
W.toOctal = function(r, e) {
  return Xn(this, 8, r, e);
};
W.toPower = W.pow = function(r) {
  var e, t, a, n, i, l, m = this, f = m.constructor, u = +(r = new f(r));
  if (!m.d || !r.d || !m.d[0] || !r.d[0])
    return new f(Vr(+m, u));
  if (m = new f(m), m.eq(1))
    return m;
  if (a = f.precision, i = f.rounding, r.eq(1))
    return lr(m, a, i);
  if (e = Wr(r.e / mr), e >= r.d.length - 1 && (t = u < 0 ? -u : u) <= Qf)
    return n = Ko(f, m, t, a), r.s < 0 ? new f(1).div(n) : lr(n, a, i);
  if (l = m.s, l < 0) {
    if (e < r.d.length - 1)
      return new f(NaN);
    if (r.d[e] & 1 || (l = 1), m.e == 0 && m.d[0] == 1 && m.d.length == 1)
      return m.s = l, m;
  }
  return t = Vr(+m, u), e = t == 0 || !isFinite(t) ? Wr(u * (Math.log("0." + Jr(m.d)) / Math.LN10 + m.e + 1)) : new f(t + "").e, e > f.maxE + 1 || e < f.minE - 1 ? new f(e > 0 ? l / 0 : 0) : (Dr = false, f.rounding = m.s = 1, t = Math.min(12, (e + "").length), n = $n(r.times(Re(m, a + t)), a), n.d && (n = lr(n, a + 5, 1), Dt(n.d, a, i) && (e = a + 10, n = lr($n(r.times(Re(m, e + t)), e), e + 5, 1), +Jr(n.d).slice(a + 1, a + 15) + 1 == 1e14 && (n = lr(n, a + 1, 0)))), n.s = l, Dr = true, f.rounding = i, lr(n, a, i));
};
W.toPrecision = function(r, e) {
  var t, a = this, n = a.constructor;
  return r === void 0 ? t = Ae(a, a.e <= n.toExpNeg || a.e >= n.toExpPos) : (ne(r, 1, Le), e === void 0 ? e = n.rounding : ne(e, 0, 8), a = lr(new n(a), r, e), t = Ae(a, r <= a.e || a.e <= n.toExpNeg, r)), a.isNeg() && !a.isZero() ? "-" + t : t;
};
W.toSignificantDigits = W.toSD = function(r, e) {
  var t = this, a = t.constructor;
  return r === void 0 ? (r = a.precision, e = a.rounding) : (ne(r, 1, Le), e === void 0 ? e = a.rounding : ne(e, 0, 8)), lr(new a(t), r, e);
};
W.toString = function() {
  var r = this, e = r.constructor, t = Ae(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() && !r.isZero() ? "-" + t : t;
};
W.truncated = W.trunc = function() {
  return lr(new this.constructor(this), this.e + 1, 1);
};
W.valueOf = W.toJSON = function() {
  var r = this, e = r.constructor, t = Ae(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() ? "-" + t : t;
};
function Jr(r) {
  var e, t, a, n = r.length - 1, i = "", l = r[0];
  if (n > 0) {
    for (i += l, e = 1; e < n; e++)
      a = r[e] + "", t = mr - a.length, t && (i += qe(t)), i += a;
    l = r[e], a = l + "", t = mr - a.length, t && (i += qe(t));
  } else if (l === 0)
    return "0";
  for (; l % 10 === 0; )
    l /= 10;
  return i + l;
}
function ne(r, e, t) {
  if (r !== ~~r || r < e || r > t)
    throw Error(Ue + r);
}
function Dt(r, e, t, a) {
  var n, i, l, m;
  for (i = r[0]; i >= 10; i /= 10)
    --e;
  return --e < 0 ? (e += mr, n = 0) : (n = Math.ceil((e + 1) / mr), e %= mr), i = Vr(10, mr - e), m = r[n] % i | 0, a == null ? e < 3 ? (e == 0 ? m = m / 100 | 0 : e == 1 && (m = m / 10 | 0), l = t < 4 && m == 99999 || t > 3 && m == 49999 || m == 5e4 || m == 0) : l = (t < 4 && m + 1 == i || t > 3 && m + 1 == i / 2) && (r[n + 1] / i / 100 | 0) == Vr(10, e - 2) - 1 || (m == i / 2 || m == 0) && (r[n + 1] / i / 100 | 0) == 0 : e < 4 ? (e == 0 ? m = m / 1e3 | 0 : e == 1 ? m = m / 100 | 0 : e == 2 && (m = m / 10 | 0), l = (a || t < 4) && m == 9999 || !a && t > 3 && m == 4999) : l = ((a || t < 4) && m + 1 == i || !a && t > 3 && m + 1 == i / 2) && (r[n + 1] / i / 1e3 | 0) == Vr(10, e - 3) - 1, l;
}
function Ut(r, e, t) {
  for (var a, n = [0], i, l = 0, m = r.length; l < m; ) {
    for (i = n.length; i--; )
      n[i] *= e;
    for (n[0] += Qn.indexOf(r.charAt(l++)), a = 0; a < n.length; a++)
      n[a] > t - 1 && (n[a + 1] === void 0 && (n[a + 1] = 0), n[a + 1] += n[a] / t | 0, n[a] %= t);
  }
  return n.reverse();
}
function Yf(r, e) {
  var t, a, n;
  if (e.isZero())
    return e;
  a = e.d.length, a < 32 ? (t = Math.ceil(a / 3), n = (1 / Yt(4, t)).toString()) : (t = 16, n = "2.3283064365386962890625e-10"), r.precision += t, e = nt(r, 1, e.times(n), new r(1));
  for (var i = t; i--; ) {
    var l = e.times(e);
    e = l.times(l).minus(l).times(8).plus(1);
  }
  return r.precision -= t, e;
}
var zr = /* @__PURE__ */ function() {
  function r(a, n, i) {
    var l, m = 0, f = a.length;
    for (a = a.slice(); f--; )
      l = a[f] * n + m, a[f] = l % i | 0, m = l / i | 0;
    return m && a.unshift(m), a;
  }
  function e(a, n, i, l) {
    var m, f;
    if (i != l)
      f = i > l ? 1 : -1;
    else
      for (m = f = 0; m < i; m++)
        if (a[m] != n[m]) {
          f = a[m] > n[m] ? 1 : -1;
          break;
        }
    return f;
  }
  function t(a, n, i, l) {
    for (var m = 0; i--; )
      a[i] -= m, m = a[i] < n[i] ? 1 : 0, a[i] = m * l + a[i] - n[i];
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(a, n, i, l, m, f) {
    var u, o, s, p, d, g, c, v, h, A, x, E, w, D, b, F, y, C, M, S, O = a.constructor, I = a.s == n.s ? 1 : -1, P = a.d, B = n.d;
    if (!P || !P[0] || !B || !B[0])
      return new O(!a.s || !n.s || (P ? B && P[0] == B[0] : !B) ? NaN : P && P[0] == 0 || !B ? I * 0 : I / 0);
    for (f ? (d = 1, o = a.e - n.e) : (f = De, d = mr, o = Wr(a.e / d) - Wr(n.e / d)), M = B.length, y = P.length, h = new O(I), A = h.d = [], s = 0; B[s] == (P[s] || 0); s++)
      ;
    if (B[s] > (P[s] || 0) && o--, i == null ? (D = i = O.precision, l = O.rounding) : m ? D = i + (a.e - n.e) + 1 : D = i, D < 0)
      A.push(1), g = true;
    else {
      if (D = D / d + 2 | 0, s = 0, M == 1) {
        for (p = 0, B = B[0], D++; (s < y || p) && D--; s++)
          b = p * f + (P[s] || 0), A[s] = b / B | 0, p = b % B | 0;
        g = p || s < y;
      } else {
        for (p = f / (B[0] + 1) | 0, p > 1 && (B = r(B, p, f), P = r(P, p, f), M = B.length, y = P.length), F = M, x = P.slice(0, M), E = x.length; E < M; )
          x[E++] = 0;
        S = B.slice(), S.unshift(0), C = B[0], B[1] >= f / 2 && ++C;
        do
          p = 0, u = e(B, x, M, E), u < 0 ? (w = x[0], M != E && (w = w * f + (x[1] || 0)), p = w / C | 0, p > 1 ? (p >= f && (p = f - 1), c = r(B, p, f), v = c.length, E = x.length, u = e(c, x, v, E), u == 1 && (p--, t(c, M < v ? S : B, v, f))) : (p == 0 && (u = p = 1), c = B.slice()), v = c.length, v < E && c.unshift(0), t(x, c, E, f), u == -1 && (E = x.length, u = e(B, x, M, E), u < 1 && (p++, t(x, M < E ? S : B, E, f))), E = x.length) : u === 0 && (p++, x = [0]), A[s++] = p, u && x[0] ? x[E++] = P[F] || 0 : (x = [P[F]], E = 1);
        while ((F++ < y || x[0] !== void 0) && D--);
        g = x[0] !== void 0;
      }
      A[0] || A.shift();
    }
    if (d == 1)
      h.e = o, Qo = g;
    else {
      for (s = 1, p = A[0]; p >= 10; p /= 10)
        s++;
      h.e = s + o * d - 1, lr(h, m ? i + h.e + 1 : i, l, g);
    }
    return h;
  };
}();
function lr(r, e, t, a) {
  var n, i, l, m, f, u, o, s, p, d = r.constructor;
  r:
    if (e != null) {
      if (s = r.d, !s)
        return r;
      for (n = 1, m = s[0]; m >= 10; m /= 10)
        n++;
      if (i = e - n, i < 0)
        i += mr, l = e, o = s[p = 0], f = o / Vr(10, n - l - 1) % 10 | 0;
      else if (p = Math.ceil((i + 1) / mr), m = s.length, p >= m)
        if (a) {
          for (; m++ <= p; )
            s.push(0);
          o = f = 0, n = 1, i %= mr, l = i - mr + 1;
        } else
          break r;
      else {
        for (o = m = s[p], n = 1; m >= 10; m /= 10)
          n++;
        i %= mr, l = i - mr + n, f = l < 0 ? 0 : o / Vr(10, n - l - 1) % 10 | 0;
      }
      if (a = a || e < 0 || s[p + 1] !== void 0 || (l < 0 ? o : o % Vr(10, n - l - 1)), u = t < 4 ? (f || a) && (t == 0 || t == (r.s < 0 ? 3 : 2)) : f > 5 || f == 5 && (t == 4 || a || t == 6 && (i > 0 ? l > 0 ? o / Vr(10, n - l) : 0 : s[p - 1]) % 10 & 1 || t == (r.s < 0 ? 8 : 7)), e < 1 || !s[0])
        return s.length = 0, u ? (e -= r.e + 1, s[0] = Vr(10, (mr - e % mr) % mr), r.e = -e || 0) : s[0] = r.e = 0, r;
      if (i == 0 ? (s.length = p, m = 1, p--) : (s.length = p + 1, m = Vr(10, mr - i), s[p] = l > 0 ? (o / Vr(10, n - l) % Vr(10, l) | 0) * m : 0), u)
        for (; ; )
          if (p == 0) {
            for (i = 1, l = s[0]; l >= 10; l /= 10)
              i++;
            for (l = s[0] += m, m = 1; l >= 10; l /= 10)
              m++;
            i != m && (r.e++, s[0] == De && (s[0] = 1));
            break;
          } else {
            if (s[p] += m, s[p] != De)
              break;
            s[p--] = 0, m = 1;
          }
      for (i = s.length; s[--i] === 0; )
        s.pop();
    }
  return Dr && (r.e > d.maxE ? (r.d = null, r.e = NaN) : r.e < d.minE && (r.e = 0, r.d = [0])), r;
}
function Ae(r, e, t) {
  if (!r.isFinite())
    return Ho(r);
  var a, n = r.e, i = Jr(r.d), l = i.length;
  return e ? (t && (a = t - l) > 0 ? i = i.charAt(0) + "." + i.slice(1) + qe(a) : l > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (r.e < 0 ? "e" : "e+") + r.e) : n < 0 ? (i = "0." + qe(-n - 1) + i, t && (a = t - l) > 0 && (i += qe(a))) : n >= l ? (i += qe(n + 1 - l), t && (a = t - n - 1) > 0 && (i = i + "." + qe(a))) : ((a = n + 1) < l && (i = i.slice(0, a) + "." + i.slice(a)), t && (a = t - l) > 0 && (n + 1 === l && (i += "."), i += qe(a))), i;
}
function Gt(r, e) {
  var t = r[0];
  for (e *= mr; t >= 10; t /= 10)
    e++;
  return e;
}
function Vt(r, e, t) {
  if (e > Gf)
    throw Dr = true, t && (r.precision = t), Error(Go);
  return lr(new r(Lt), e, 1, true);
}
function ge(r, e, t) {
  if (e > Yn)
    throw Error(Go);
  return lr(new r(Zt), e, t, true);
}
function Xo(r) {
  var e = r.length - 1, t = e * mr + 1;
  if (e = r[e], e) {
    for (; e % 10 == 0; e /= 10)
      t--;
    for (e = r[0]; e >= 10; e /= 10)
      t++;
  }
  return t;
}
function qe(r) {
  for (var e = ""; r--; )
    e += "0";
  return e;
}
function Ko(r, e, t, a) {
  var n, i = new r(1), l = Math.ceil(a / mr + 4);
  for (Dr = false; ; ) {
    if (t % 2 && (i = i.times(e), Zo(i.d, l) && (n = true)), t = Wr(t / 2), t === 0) {
      t = i.d.length - 1, n && i.d[t] === 0 && ++i.d[t];
      break;
    }
    e = e.times(e), Zo(e.d, l);
  }
  return Dr = true, i;
}
function Lo(r) {
  return r.d[r.d.length - 1] & 1;
}
function Wo(r, e, t) {
  for (var a, n = new r(e[0]), i = 0; ++i < e.length; )
    if (a = new r(e[i]), a.s)
      n[t](a) && (n = a);
    else {
      n = a;
      break;
    }
  return n;
}
function $n(r, e) {
  var t, a, n, i, l, m, f, u = 0, o = 0, s = 0, p = r.constructor, d = p.rounding, g = p.precision;
  if (!r.d || !r.d[0] || r.e > 17)
    return new p(r.d ? r.d[0] ? r.s < 0 ? 0 : 1 / 0 : 1 : r.s ? r.s < 0 ? 0 : r : NaN);
  for (e == null ? (Dr = false, f = g) : f = e, m = new p(0.03125); r.e > -2; )
    r = r.times(m), s += 5;
  for (a = Math.log(Vr(2, s)) / Math.LN10 * 2 + 5 | 0, f += a, t = i = l = new p(1), p.precision = f; ; ) {
    if (i = lr(i.times(r), f, 1), t = t.times(++o), m = l.plus(zr(i, t, f, 1)), Jr(m.d).slice(0, f) === Jr(l.d).slice(0, f)) {
      for (n = s; n--; )
        l = lr(l.times(l), f, 1);
      if (e == null)
        if (u < 3 && Dt(l.d, f - a, d, u))
          p.precision = f += 10, t = i = m = new p(1), o = 0, u++;
        else
          return lr(l, p.precision = g, d, Dr = true);
      else
        return p.precision = g, l;
    }
    l = m;
  }
}
function Re(r, e) {
  var t, a, n, i, l, m, f, u, o, s, p, d = 1, g = 10, c = r, v = c.d, h = c.constructor, A = h.rounding, x = h.precision;
  if (c.s < 0 || !v || !v[0] || !c.e && v[0] == 1 && v.length == 1)
    return new h(v && !v[0] ? -1 / 0 : c.s != 1 ? NaN : v ? 0 : c);
  if (e == null ? (Dr = false, o = x) : o = e, h.precision = o += g, t = Jr(v), a = t.charAt(0), Math.abs(i = c.e) < 15e14) {
    for (; a < 7 && a != 1 || a == 1 && t.charAt(1) > 3; )
      c = c.times(r), t = Jr(c.d), a = t.charAt(0), d++;
    i = c.e, a > 1 ? (c = new h("0." + t), i++) : c = new h(a + "." + t.slice(1));
  } else
    return u = Vt(h, o + 2, x).times(i + ""), c = Re(new h(a + "." + t.slice(1)), o - g).plus(u), h.precision = x, e == null ? lr(c, x, A, Dr = true) : c;
  for (s = c, f = l = c = zr(c.minus(1), c.plus(1), o, 1), p = lr(c.times(c), o, 1), n = 3; ; ) {
    if (l = lr(l.times(p), o, 1), u = f.plus(zr(l, new h(n), o, 1)), Jr(u.d).slice(0, o) === Jr(f.d).slice(0, o))
      if (f = f.times(2), i !== 0 && (f = f.plus(Vt(h, o + 2, x).times(i + ""))), f = zr(f, new h(d), o, 1), e == null)
        if (Dt(f.d, o - g, A, m))
          h.precision = o += g, u = l = c = zr(s.minus(1), s.plus(1), o, 1), p = lr(c.times(c), o, 1), n = m = 1;
        else
          return lr(f, h.precision = x, A, Dr = true);
      else
        return h.precision = x, f;
    f = u, n += 2;
  }
}
function Ho(r) {
  return String(r.s * r.s / 0);
}
function Jn(r, e) {
  var t, a, n;
  for ((t = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (a = e.search(/e/i)) > 0 ? (t < 0 && (t = a), t += +e.slice(a + 1), e = e.substring(0, a)) : t < 0 && (t = e.length), a = 0; e.charCodeAt(a) === 48; a++)
    ;
  for (n = e.length; e.charCodeAt(n - 1) === 48; --n)
    ;
  if (e = e.slice(a, n), e) {
    if (n -= a, r.e = t = t - a - 1, r.d = [], a = (t + 1) % mr, t < 0 && (a += mr), a < n) {
      for (a && r.d.push(+e.slice(0, a)), n -= mr; a < n; )
        r.d.push(+e.slice(a, a += mr));
      e = e.slice(a), a = mr - e.length;
    } else
      a -= n;
    for (; a--; )
      e += "0";
    r.d.push(+e), Dr && (r.e > r.constructor.maxE ? (r.d = null, r.e = NaN) : r.e < r.constructor.minE && (r.e = 0, r.d = [0]));
  } else
    r.e = 0, r.d = [0];
  return r;
}
function $f(r, e) {
  var t, a, n, i, l, m, f, u, o;
  if (e.indexOf("_") > -1) {
    if (e = e.replace(/(\d)_(?=\d)/g, "$1"), Jo.test(e))
      return Jn(r, e);
  } else if (e === "Infinity" || e === "NaN")
    return +e || (r.s = NaN), r.e = NaN, r.d = null, r;
  if (Zf.test(e))
    t = 16, e = e.toLowerCase();
  else if (Lf.test(e))
    t = 2;
  else if (Vf.test(e))
    t = 8;
  else
    throw Error(Ue + e);
  for (i = e.search(/p/i), i > 0 ? (f = +e.slice(i + 1), e = e.substring(2, i)) : e = e.slice(2), i = e.indexOf("."), l = i >= 0, a = r.constructor, l && (e = e.replace(".", ""), m = e.length, i = m - i, n = Ko(a, new a(t), i, i * 2)), u = Ut(e, t, De), o = u.length - 1, i = o; u[i] === 0; --i)
    u.pop();
  return i < 0 ? new a(r.s * 0) : (r.e = Gt(u, o), r.d = u, Dr = false, l && (r = zr(r, n, m * 4)), f && (r = r.times(Math.abs(f) < 54 ? Vr(2, f) : xt.pow(2, f))), Dr = true, r);
}
function Jf(r, e) {
  var t, a = e.d.length;
  if (a < 3)
    return e.isZero() ? e : nt(r, 2, e, e);
  t = 1.4 * Math.sqrt(a), t = t > 16 ? 16 : t | 0, e = e.times(1 / Yt(5, t)), e = nt(r, 2, e, e);
  for (var n, i = new r(5), l = new r(16), m = new r(20); t--; )
    n = e.times(e), e = e.times(i.plus(n.times(l.times(n).minus(m))));
  return e;
}
function nt(r, e, t, a, n) {
  var i, l, m, f, o = r.precision, s = Math.ceil(o / mr);
  for (Dr = false, f = t.times(t), m = new r(a); ; ) {
    if (l = zr(m.times(f), new r(e++ * e++), o, 1), m = n ? a.plus(l) : a.minus(l), a = zr(l.times(f), new r(e++ * e++), o, 1), l = m.plus(a), l.d[s] !== void 0) {
      for (i = s; l.d[i] === m.d[i] && i--; )
        ;
      if (i == -1)
        break;
    }
    i = m, m = a, a = l, l = i;
  }
  return Dr = true, l.d.length = s + 1, l;
}
function Yt(r, e) {
  for (var t = r; --e; )
    t *= r;
  return t;
}
function ko(r, e) {
  var t, a = e.s < 0, n = ge(r, r.precision, 1), i = n.times(0.5);
  if (e = e.abs(), e.lte(i))
    return Me = a ? 4 : 1, e;
  if (t = e.divToInt(n), t.isZero())
    Me = a ? 3 : 2;
  else {
    if (e = e.minus(t.times(n)), e.lte(i))
      return Me = Lo(t) ? a ? 2 : 3 : a ? 4 : 1, e;
    Me = Lo(t) ? a ? 1 : 4 : a ? 3 : 2;
  }
  return e.minus(n).abs();
}
function Xn(r, e, t, a) {
  var n, i, l, m, f, u, o, s, p, d = r.constructor, g = t !== void 0;
  if (g ? (ne(t, 1, Le), a === void 0 ? a = d.rounding : ne(a, 0, 8)) : (t = d.precision, a = d.rounding), !r.isFinite())
    o = Ho(r);
  else {
    for (o = Ae(r), l = o.indexOf("."), g ? (n = 2, e == 16 ? t = t * 4 - 3 : e == 8 && (t = t * 3 - 2)) : n = e, l >= 0 && (o = o.replace(".", ""), p = new d(1), p.e = o.length - l, p.d = Ut(Ae(p), 10, n), p.e = p.d.length), s = Ut(o, 10, n), i = f = s.length; s[--f] == 0; )
      s.pop();
    if (!s[0])
      o = g ? "0p+0" : "0";
    else {
      if (l < 0 ? i-- : (r = new d(r), r.d = s, r.e = i, r = zr(r, p, t, a, 0, n), s = r.d, i = r.e, u = Qo), l = s[t], m = n / 2, u = u || s[t + 1] !== void 0, u = a < 4 ? (l !== void 0 || u) && (a === 0 || a === (r.s < 0 ? 3 : 2)) : l > m || l === m && (a === 4 || u || a === 6 && s[t - 1] & 1 || a === (r.s < 0 ? 8 : 7)), s.length = t, u)
        for (; ++s[--t] > n - 1; )
          s[t] = 0, t || (++i, s.unshift(1));
      for (f = s.length; !s[f - 1]; --f)
        ;
      for (l = 0, o = ""; l < f; l++)
        o += Qn.charAt(s[l]);
      if (g) {
        if (f > 1)
          if (e == 16 || e == 8) {
            for (l = e == 16 ? 4 : 3, --f; f % l; f++)
              o += "0";
            for (s = Ut(o, n, e), f = s.length; !s[f - 1]; --f)
              ;
            for (l = 1, o = "1."; l < f; l++)
              o += Qn.charAt(s[l]);
          } else
            o = o.charAt(0) + "." + o.slice(1);
        o = o + (i < 0 ? "p" : "p+") + i;
      } else if (i < 0) {
        for (; ++i; )
          o = "0" + o;
        o = "0." + o;
      } else if (++i > f)
        for (i -= f; i--; )
          o += "0";
      else
        i < f && (o = o.slice(0, i) + "." + o.slice(i));
    }
    o = (e == 16 ? "0x" : e == 2 ? "0b" : e == 8 ? "0o" : "") + o;
  }
  return r.s < 0 ? "-" + o : o;
}
function Zo(r, e) {
  if (r.length > e)
    return r.length = e, true;
}
function Xf(r) {
  return new this(r).abs();
}
function Kf(r) {
  return new this(r).acos();
}
function Wf(r) {
  return new this(r).acosh();
}
function Hf(r, e) {
  return new this(r).plus(e);
}
function kf(r) {
  return new this(r).asin();
}
function jf(r) {
  return new this(r).asinh();
}
function rc(r) {
  return new this(r).atan();
}
function ec(r) {
  return new this(r).atanh();
}
function tc(r, e) {
  r = new this(r), e = new this(e);
  var t, a = this.precision, n = this.rounding, i = a + 4;
  return !r.s || !e.s ? t = new this(NaN) : !r.d && !e.d ? (t = ge(this, i, 1).times(e.s > 0 ? 0.25 : 0.75), t.s = r.s) : !e.d || r.isZero() ? (t = e.s < 0 ? ge(this, a, n) : new this(0), t.s = r.s) : !r.d || e.isZero() ? (t = ge(this, i, 1).times(0.5), t.s = r.s) : e.s < 0 ? (this.precision = i, this.rounding = 1, t = this.atan(zr(r, e, i, 1)), e = ge(this, i, 1), this.precision = a, this.rounding = n, t = r.s < 0 ? t.minus(e) : t.plus(e)) : t = this.atan(zr(r, e, i, 1)), t;
}
function nc(r) {
  return new this(r).cbrt();
}
function ac(r) {
  return lr(r = new this(r), r.e + 1, 2);
}
function ic(r, e, t) {
  return new this(r).clamp(e, t);
}
function oc(r) {
  if (!r || typeof r != "object")
    throw Error(Qt + "Object expected");
  var e, t, a, n = r.defaults === true, i = ["precision", 1, Le, "rounding", 0, 8, "toExpNeg", -tt, 0, "toExpPos", 0, tt, "maxE", 0, tt, "minE", -tt, 0, "modulo", 0, 9];
  for (e = 0; e < i.length; e += 3)
    if (t = i[e], n && (this[t] = Gn[t]), (a = r[t]) !== void 0)
      if (Wr(a) === a && a >= i[e + 1] && a <= i[e + 2])
        this[t] = a;
      else
        throw Error(Ue + t + ": " + a);
  if (t = "crypto", n && (this[t] = Gn[t]), (a = r[t]) !== void 0)
    if (a === true || a === false || a === 0 || a === 1)
      if (a)
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[t] = true;
        else
          throw Error(Yo);
      else
        this[t] = false;
    else
      throw Error(Ue + t + ": " + a);
  return this;
}
function uc(r) {
  return new this(r).cos();
}
function sc(r) {
  return new this(r).cosh();
}
function jo(r) {
  var e, t, a;
  function n(i) {
    var l, m, f, u = this;
    if (!(u instanceof n))
      return new n(i);
    if (u.constructor = n, Vo(i)) {
      u.s = i.s, Dr ? !i.d || i.e > n.maxE ? (u.e = NaN, u.d = null) : i.e < n.minE ? (u.e = 0, u.d = [0]) : (u.e = i.e, u.d = i.d.slice()) : (u.e = i.e, u.d = i.d ? i.d.slice() : i.d);
      return;
    }
    if (f = typeof i, f === "number") {
      if (i === 0) {
        u.s = 1 / i < 0 ? -1 : 1, u.e = 0, u.d = [0];
        return;
      }
      if (i < 0 ? (i = -i, u.s = -1) : u.s = 1, i === ~~i && i < 1e7) {
        for (l = 0, m = i; m >= 10; m /= 10)
          l++;
        Dr ? l > n.maxE ? (u.e = NaN, u.d = null) : l < n.minE ? (u.e = 0, u.d = [0]) : (u.e = l, u.d = [i]) : (u.e = l, u.d = [i]);
        return;
      } else if (i * 0 !== 0) {
        i || (u.s = NaN), u.e = NaN, u.d = null;
        return;
      }
      return Jn(u, i.toString());
    } else if (f !== "string")
      throw Error(Ue + i);
    return (m = i.charCodeAt(0)) === 45 ? (i = i.slice(1), u.s = -1) : (m === 43 && (i = i.slice(1)), u.s = 1), Jo.test(i) ? Jn(u, i) : $f(u, i);
  }
  if (n.prototype = W, n.ROUND_UP = 0, n.ROUND_DOWN = 1, n.ROUND_CEIL = 2, n.ROUND_FLOOR = 3, n.ROUND_HALF_UP = 4, n.ROUND_HALF_DOWN = 5, n.ROUND_HALF_EVEN = 6, n.ROUND_HALF_CEIL = 7, n.ROUND_HALF_FLOOR = 8, n.EUCLID = 9, n.config = n.set = oc, n.clone = jo, n.isDecimal = Vo, n.abs = Xf, n.acos = Kf, n.acosh = Wf, n.add = Hf, n.asin = kf, n.asinh = jf, n.atan = rc, n.atanh = ec, n.atan2 = tc, n.cbrt = nc, n.ceil = ac, n.clamp = ic, n.cos = uc, n.cosh = sc, n.div = fc, n.exp = cc, n.floor = lc, n.hypot = pc, n.ln = mc, n.log = vc, n.log10 = dc, n.log2 = hc, n.max = gc, n.min = Dc, n.mod = xc, n.mul = yc, n.pow = Ac, n.random = wc, n.round = Ec, n.sign = Cc, n.sin = Fc, n.sinh = bc, n.sqrt = Mc, n.sub = Sc, n.sum = Nc, n.tan = Bc, n.tanh = _c, n.trunc = Tc, r === void 0 && (r = {}), r && r.defaults !== true)
    for (a = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], e = 0; e < a.length; )
      r.hasOwnProperty(t = a[e++]) || (r[t] = this[t]);
  return n.config(r), n;
}
function fc(r, e) {
  return new this(r).div(e);
}
function cc(r) {
  return new this(r).exp();
}
function lc(r) {
  return lr(r = new this(r), r.e + 1, 3);
}
function pc() {
  var r, e, t = new this(0);
  for (Dr = false, r = 0; r < arguments.length; )
    if (e = new this(arguments[r++]), e.d)
      t.d && (t = t.plus(e.times(e)));
    else {
      if (e.s)
        return Dr = true, new this(1 / 0);
      t = e;
    }
  return Dr = true, t.sqrt();
}
function Vo(r) {
  return r instanceof xt || r && r.toStringTag === $o || false;
}
function mc(r) {
  return new this(r).ln();
}
function vc(r, e) {
  return new this(r).log(e);
}
function hc(r) {
  return new this(r).log(2);
}
function dc(r) {
  return new this(r).log(10);
}
function gc() {
  return Wo(this, arguments, "lt");
}
function Dc() {
  return Wo(this, arguments, "gt");
}
function xc(r, e) {
  return new this(r).mod(e);
}
function yc(r, e) {
  return new this(r).mul(e);
}
function Ac(r, e) {
  return new this(r).pow(e);
}
function wc(r) {
  var e, t, a, n, i = 0, l = new this(1), m = [];
  if (r === void 0 ? r = this.precision : ne(r, 1, Le), a = Math.ceil(r / mr), this.crypto)
    if (crypto.getRandomValues)
      for (e = crypto.getRandomValues(new Uint32Array(a)); i < a; )
        n = e[i], n >= 429e7 ? e[i] = crypto.getRandomValues(new Uint32Array(1))[0] : m[i++] = n % 1e7;
    else if (crypto.randomBytes) {
      for (e = crypto.randomBytes(a *= 4); i < a; )
        n = e[i] + (e[i + 1] << 8) + (e[i + 2] << 16) + ((e[i + 3] & 127) << 24), n >= 214e7 ? crypto.randomBytes(4).copy(e, i) : (m.push(n % 1e7), i += 4);
      i = a / 4;
    } else
      throw Error(Yo);
  else
    for (; i < a; )
      m[i++] = Math.random() * 1e7 | 0;
  for (a = m[--i], r %= mr, a && r && (n = Vr(10, mr - r), m[i] = (a / n | 0) * n); m[i] === 0; i--)
    m.pop();
  if (i < 0)
    t = 0, m = [0];
  else {
    for (t = -1; m[0] === 0; t -= mr)
      m.shift();
    for (a = 1, n = m[0]; n >= 10; n /= 10)
      a++;
    a < mr && (t -= mr - a);
  }
  return l.e = t, l.d = m, l;
}
function Ec(r) {
  return lr(r = new this(r), r.e + 1, this.rounding);
}
function Cc(r) {
  return r = new this(r), r.d ? r.d[0] ? r.s : 0 * r.s : r.s || NaN;
}
function Fc(r) {
  return new this(r).sin();
}
function bc(r) {
  return new this(r).sinh();
}
function Mc(r) {
  return new this(r).sqrt();
}
function Sc(r, e) {
  return new this(r).sub(e);
}
function Nc() {
  var r = 0, e = arguments, t = new this(e[r]);
  for (Dr = false; t.s && ++r < e.length; )
    t = t.plus(e[r]);
  return Dr = true, lr(t, this.precision, this.rounding);
}
function Bc(r) {
  return new this(r).tan();
}
function _c(r) {
  return new this(r).tanh();
}
function Tc(r) {
  return lr(r = new this(r), r.e + 1, 1);
}
W[Symbol.for("nodejs.util.inspect.custom")] = W.toString;
W[Symbol.toStringTag] = "Decimal";
var xt = W.constructor = jo(Gn);
Lt = new xt(Lt);
Zt = new xt(Zt);
var Kn = xt;
var Ic = "BigNumber", zc = ["?on", "config"], Wn = _(Ic, zc, (r) => {
  var { on: e, config: t } = r, a = Kn.clone({ precision: t.precision, modulo: Kn.EUCLID });
  return a.prototype = Object.create(a.prototype), a.prototype.type = "BigNumber", a.prototype.isBigNumber = true, a.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, a.fromJSON = function(n) {
    return new a(n.value);
  }, e && e("config", function(n, i) {
    n.precision !== i.precision && a.config({ precision: n.precision });
  }), a;
}, { isClass: true });
var Yr = Bt(eu(), 1);
var Oc = "Complex", Pc = [], kn = _(Oc, Pc, () => (Object.defineProperty(Yr.default, "name", { value: "Complex" }), Yr.default.prototype.constructor = Yr.default, Yr.default.prototype.type = "Complex", Yr.default.prototype.isComplex = true, Yr.default.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, Yr.default.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, Yr.default.prototype.format = function(r) {
  var e = "", t = this.im, a = this.re, n = mt(this.re, r), i = mt(this.im, r), l = Fr(r) ? r : r ? r.precision : null;
  if (l !== null) {
    var m = Math.pow(10, -l);
    Math.abs(a / t) < m && (a = 0), Math.abs(t / a) < m && (t = 0);
  }
  return t === 0 ? e = n : a === 0 ? t === 1 ? e = "i" : t === -1 ? e = "-i" : e = i + "i" : t < 0 ? t === -1 ? e = n + " - i" : e = n + " - " + i.substring(1) + "i" : t === 1 ? e = n + " + i" : e = n + " + " + i + "i", e;
}, Yr.default.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object")
        return (0, Yr.default)(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var t = arguments[0], a = arguments[1];
      if (Fr(t)) {
        if (_t(a) && a.hasBase("ANGLE") && (a = a.toNumber("rad")), Fr(a))
          return new Yr.default({ r: t, phi: a });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else
        throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Yr.default.prototype.valueOf = Yr.default.prototype.toString, Yr.default.fromJSON = function(r) {
  return new Yr.default(r);
}, Yr.default.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, Yr.default), { isClass: true });
var we = Bt(nu(), 1);
var qc = "Fraction", Rc = [], ra = _(qc, Rc, () => (Object.defineProperty(we.default, "name", { value: "Fraction" }), we.default.prototype.constructor = we.default, we.default.prototype.type = "Fraction", we.default.prototype.isFraction = true, we.default.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: this.s * this.n, d: this.d };
}, we.default.fromJSON = function(r) {
  return new we.default(r);
}, we.default), { isClass: true });
var Uc = "Matrix", Lc = [], ea = _(Uc, Lc, () => {
  function r() {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return r.prototype.type = "Matrix", r.prototype.isMatrix = true, r.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, r.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, r.prototype.create = function(e, t) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, r.prototype.subset = function(e, t, a) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, r.prototype.get = function(e) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, r.prototype.set = function(e, t, a) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, r.prototype.resize = function(e, t) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, r.prototype.reshape = function(e, t) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, r.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, r.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, r.prototype.map = function(e, t) {
    throw new Error("Cannot invoke map on a Matrix interface");
  }, r.prototype.forEach = function(e) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  }, r.prototype[Symbol.iterator] = function() {
    throw new Error("Cannot iterate a Matrix interface");
  }, r.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  }, r.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  }, r.prototype.format = function(e) {
    throw new Error("Cannot invoke format on a Matrix interface");
  }, r.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  }, r;
}, { isClass: true });
function $t(r) {
  return Object.keys(r.signatures || {}).reduce(function(e, t) {
    var a = (t.match(/,/g) || []).length + 1;
    return Math.max(e, a);
  }, -1);
}
var Zc = "DenseMatrix", Vc = ["Matrix"], ta = _(Zc, Vc, (r) => {
  var { Matrix: e } = r;
  function t(o, s) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (s && !Gr(s))
      throw new Error("Invalid datatype: " + s);
    if (yr(o))
      o.type === "DenseMatrix" ? (this._data = hr(o._data), this._size = hr(o._size), this._datatype = s || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = s || o._datatype);
    else if (o && Ar(o.data) && Ar(o.size))
      this._data = o.data, this._size = o.size, In(this._data, this._size), this._datatype = s || o.datatype;
    else if (Ar(o))
      this._data = u(o), this._size = br(this._data), In(this._data, this._size), this._datatype = s;
    else {
      if (o)
        throw new TypeError("Unsupported type of data (" + Zr(o) + ")");
      this._data = [], this._size = [0], this._datatype = s;
    }
  }
  t.prototype = new e(), t.prototype.createDenseMatrix = function(o, s) {
    return new t(o, s);
  }, Object.defineProperty(t, "name", { value: "DenseMatrix" }), t.prototype.constructor = t, t.prototype.type = "DenseMatrix", t.prototype.isDenseMatrix = true, t.prototype.getDataType = function() {
    return Pe(this._data, Zr);
  }, t.prototype.storage = function() {
    return "dense";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(o, s) {
    return new t(o, s);
  }, t.prototype.subset = function(o, s, p) {
    switch (arguments.length) {
      case 1:
        return a(this, o);
      case 2:
      case 3:
        return i(this, o, s, p);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, t.prototype.get = function(o) {
    if (!Ar(o))
      throw new TypeError("Array expected");
    if (o.length !== this._size.length)
      throw new vr(o.length, this._size.length);
    for (var s = 0; s < o.length; s++)
      Nr(o[s], this._size[s]);
    for (var p = this._data, d = 0, g = o.length; d < g; d++) {
      var c = o[d];
      Nr(c, p.length), p = p[c];
    }
    return p;
  }, t.prototype.set = function(o, s, p) {
    if (!Ar(o))
      throw new TypeError("Array expected");
    if (o.length < this._size.length)
      throw new vr(o.length, this._size.length, "<");
    var d, g, c, v = o.map(function(A) {
      return A + 1;
    });
    f(this, v, p);
    var h = this._data;
    for (d = 0, g = o.length - 1; d < g; d++)
      c = o[d], Nr(c, h.length), h = h[c];
    return c = o[o.length - 1], Nr(c, h.length), h[c] = s, this;
  };
  function a(o, s) {
    if (!ze(s))
      throw new TypeError("Invalid index");
    var p = s.isScalar();
    if (p)
      return o.get(s.min());
    var d = s.size();
    if (d.length !== o._size.length)
      throw new vr(d.length, o._size.length);
    for (var g = s.min(), c = s.max(), v = 0, h = o._size.length; v < h; v++)
      Nr(g[v], o._size[v]), Nr(c[v], o._size[v]);
    return new t(n(o._data, s, d.length, 0), o._datatype);
  }
  function n(o, s, p, d) {
    var g = d === p - 1, c = s.dimension(d);
    return g ? c.map(function(v) {
      return Nr(v, o.length), o[v];
    }).valueOf() : c.map(function(v) {
      Nr(v, o.length);
      var h = o[v];
      return n(h, s, p, d + 1);
    }).valueOf();
  }
  function i(o, s, p, d) {
    if (!s || s.isIndex !== true)
      throw new TypeError("Invalid index");
    var g = s.size(), c = s.isScalar(), v;
    if (yr(p) ? (v = p.size(), p = p.valueOf()) : v = br(p), c) {
      if (v.length !== 0)
        throw new TypeError("Scalar expected");
      o.set(s.min(), p, d);
    } else {
      if (!Fe(v, g))
        try {
          v.length === 0 ? p = qn([p], g) : p = qn(p, g), v = br(p);
        } catch (D) {
        }
      if (g.length < o._size.length)
        throw new vr(g.length, o._size.length, "<");
      if (v.length < g.length) {
        for (var h = 0, A = 0; g[h] === 1 && v[h] === 1; )
          h++;
        for (; g[h] === 1; )
          A++, h++;
        p = Ot(p, g.length, A, v);
      }
      if (!Fe(g, v))
        throw new vr(g, v, ">");
      var x = s.max().map(function(D) {
        return D + 1;
      });
      f(o, x, d);
      var E = g.length, w = 0;
      l(o._data, s, p, E, w);
    }
    return o;
  }
  function l(o, s, p, d, g) {
    var c = g === d - 1, v = s.dimension(g);
    c ? v.forEach(function(h, A) {
      Nr(h), o[h] = p[A[0]];
    }) : v.forEach(function(h, A) {
      Nr(h), l(o[h], s, p[A[0]], d, g + 1);
    });
  }
  t.prototype.resize = function(o, s, p) {
    if (!Ge(o))
      throw new TypeError("Array or Matrix expected");
    var d = o.valueOf().map((c) => Array.isArray(c) && c.length === 1 ? c[0] : c), g = p ? this.clone() : this;
    return m(g, d, s);
  };
  function m(o, s, p) {
    if (s.length === 0) {
      for (var d = o._data; Ar(d); )
        d = d[0];
      return d;
    }
    return o._size = s.slice(0), o._data = Je(o._data, o._size, p), o;
  }
  t.prototype.reshape = function(o, s) {
    var p = s ? this.clone() : this;
    p._data = ht(p._data, o);
    var d = p._size.reduce((g, c) => g * c);
    return p._size = dt(o, d), p;
  };
  function f(o, s, p) {
    for (var d = o._size.slice(0), g = false; d.length < s.length; )
      d.push(0), g = true;
    for (var c = 0, v = s.length; c < v; c++)
      s[c] > d[c] && (d[c] = s[c], g = true);
    g && m(o, d, p);
  }
  t.prototype.clone = function() {
    var o = new t({ data: hr(this._data), size: hr(this._size), datatype: this._datatype });
    return o;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(o) {
    var s = this, p = $t(o), d = function v(h, A) {
      return Ar(h) ? h.map(function(x, E) {
        return v(x, A.concat(E));
      }) : p === 1 ? o(h) : p === 2 ? o(h, A) : o(h, A, s);
    }, g = d(this._data, []), c = this._datatype !== void 0 ? Pe(g, Zr) : void 0;
    return new t(g, c);
  }, t.prototype.forEach = function(o) {
    var s = this, p = function d(g, c) {
      Ar(g) ? g.forEach(function(v, h) {
        d(v, c.concat(h));
      }) : o(g, c, s);
    };
    p(this._data, []);
  }, t.prototype[Symbol.iterator] = function* () {
    var o = function* s(p, d) {
      if (Ar(p))
        for (var g = 0; g < p.length; g++)
          yield* Fn(s(p[g], d.concat(g)));
      else
        yield { value: p, index: d };
    };
    yield* Fn(o(this._data, []));
  }, t.prototype.rows = function() {
    var o = [], s = this.size();
    if (s.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    var p = this._data;
    for (var d of p)
      o.push(new t([d], this._datatype));
    return o;
  }, t.prototype.columns = function() {
    var o = this, s = [], p = this.size();
    if (p.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var d = this._data, g = function(h) {
      var A = d.map((x) => [x[h]]);
      s.push(new t(A, o._datatype));
    }, c = 0; c < p[1]; c++)
      g(c);
    return s;
  }, t.prototype.toArray = function() {
    return hr(this._data);
  }, t.prototype.valueOf = function() {
    return this._data;
  }, t.prototype.format = function(o) {
    return Sr(this._data, o);
  }, t.prototype.toString = function() {
    return Sr(this._data);
  }, t.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(o) {
    if (o) {
      if (Cr(o) && (o = o.toNumber()), !Fr(o) || !dr(o))
        throw new TypeError("The parameter k must be an integer number");
    } else
      o = 0;
    for (var s = o > 0 ? o : 0, p = o < 0 ? -o : 0, d = this._size[0], g = this._size[1], c = Math.min(d - p, g - s), v = [], h = 0; h < c; h++)
      v[h] = this._data[h + p][h + s];
    return new t({ data: v, size: [c], datatype: this._datatype });
  }, t.diagonal = function(o, s, p, d) {
    if (!Ar(o))
      throw new TypeError("Array expected, size parameter");
    if (o.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(b) {
      if (Cr(b) && (b = b.toNumber()), !Fr(b) || !dr(b) || b < 1)
        throw new Error("Size values must be positive integers");
      return b;
    }), p) {
      if (Cr(p) && (p = p.toNumber()), !Fr(p) || !dr(p))
        throw new TypeError("The parameter k must be an integer number");
    } else
      p = 0;
    var g = p > 0 ? p : 0, c = p < 0 ? -p : 0, v = o[0], h = o[1], A = Math.min(v - c, h - g), x;
    if (Ar(s)) {
      if (s.length !== A)
        throw new Error("Invalid value array length");
      x = function(F) {
        return s[F];
      };
    } else if (yr(s)) {
      var E = s.size();
      if (E.length !== 1 || E[0] !== A)
        throw new Error("Invalid matrix length");
      x = function(F) {
        return s.get([F]);
      };
    } else
      x = function() {
        return s;
      };
    d || (d = Cr(x(0)) ? x(0).mul(0) : 0);
    var w = [];
    if (o.length > 0) {
      w = Je(w, o, d);
      for (var D = 0; D < A; D++)
        w[D + c][D + g] = x(D);
    }
    return new t({ data: w, size: [v, h] });
  }, t.fromJSON = function(o) {
    return new t(o);
  }, t.prototype.swapRows = function(o, s) {
    if (!Fr(o) || !dr(o) || !Fr(s) || !dr(s))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Nr(o, this._size[0]), Nr(s, this._size[0]), t._swapRows(o, s, this._data), this;
  }, t._swapRows = function(o, s, p) {
    var d = p[o];
    p[o] = p[s], p[s] = d;
  };
  function u(o) {
    return yr(o) ? u(o.valueOf()) : Ar(o) ? o.map(u) : o;
  }
  return t;
}, { isClass: true });
function Or(r, e, t) {
  return r && typeof r.map == "function" ? r.map(function(a) {
    return Or(a, e);
  }) : e(r);
}
var au = "isInteger", Qc = ["typed"], na = _(au, Qc, (r) => {
  var { typed: e } = r;
  return e(au, { number: dr, BigNumber: function(a) {
    return a.isInt();
  }, Fraction: function(a) {
    return a.d === 1 && isFinite(a.n);
  }, "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
var ae = "number", Se = "number, number";
function aa(r) {
  return Math.abs(r);
}
aa.signature = ae;
function ia(r, e) {
  return r + e;
}
ia.signature = Se;
function oa(r, e) {
  return r - e;
}
oa.signature = Se;
function ua(r, e) {
  return r * e;
}
ua.signature = Se;
function sa(r) {
  return -r;
}
sa.signature = ae;
function Jt(r) {
  return ho(r);
}
Jt.signature = ae;
function fa(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
fa.signature = Se;
var yt = "number";
function ca(r) {
  return r > 0;
}
ca.signature = yt;
function la(r) {
  return r === 0;
}
la.signature = yt;
var iu = "isPositive", fl = ["typed"], pa = _(iu, fl, (r) => {
  var { typed: e } = r;
  return e(iu, { number: ca, BigNumber: function(a) {
    return !a.isNeg() && !a.isZero() && !a.isNaN();
  }, Fraction: function(a) {
    return a.s > 0 && a.n > 0;
  }, Unit: e.referToSelf((t) => (a) => e.find(t, a.valueType())(a.value)), "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
var ou = "isZero", cl = ["typed"], ma = _(ou, cl, (r) => {
  var { typed: e } = r;
  return e(ou, { number: la, BigNumber: function(a) {
    return a.isZero();
  }, Complex: function(a) {
    return a.re === 0 && a.im === 0;
  }, Fraction: function(a) {
    return a.d === 1 && a.n === 0;
  }, Unit: e.referToSelf((t) => (a) => e.find(t, a.valueType())(a.value)), "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
function ce(r, e, t) {
  if (t == null)
    return r.eq(e);
  if (r.eq(e))
    return true;
  if (r.isNaN() || e.isNaN())
    return false;
  if (r.isFinite() && e.isFinite()) {
    var a = r.minus(e).abs();
    if (a.isZero())
      return true;
    var n = r.constructor.max(r.abs(), e.abs());
    return a.lte(n.times(t));
  }
  return false;
}
function uu(r, e, t) {
  return Kr(r.re, e.re, t) && Kr(r.im, e.im, t);
}
var le = _("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((t) => (a, n) => {
    if (!a.equalBase(n))
      throw new Error("Cannot compare units with different base");
    return e.find(t, [a.valueType(), n.valueType()])(a.value, n.value);
  }) };
});
var Xt = "equalScalar", ll = ["typed", "config"], va = _(Xt, ll, (r) => {
  var { typed: e, config: t } = r, a = le({ typed: e });
  return e(Xt, { "boolean, boolean": function(i, l) {
    return i === l;
  }, "number, number": function(i, l) {
    return Kr(i, l, t.epsilon);
  }, "BigNumber, BigNumber": function(i, l) {
    return i.eq(l) || ce(i, l, t.epsilon);
  }, "Fraction, Fraction": function(i, l) {
    return i.equals(l);
  }, "Complex, Complex": function(i, l) {
    return uu(i, l, t.epsilon);
  } }, a);
});
_(Xt, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(Xt, { "number, number": function(n, i) {
    return Kr(n, i, t.epsilon);
  } });
});
var pl = "SparseMatrix", ml = ["typed", "equalScalar", "Matrix"], ha = _(pl, ml, (r) => {
  var { typed: e, equalScalar: t, Matrix: a } = r;
  function n(c, v) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (v && !Gr(v))
      throw new Error("Invalid datatype: " + v);
    if (yr(c))
      i(this, c, v);
    else if (c && Ar(c.index) && Ar(c.ptr) && Ar(c.size))
      this._values = c.values, this._index = c.index, this._ptr = c.ptr, this._size = c.size, this._datatype = v || c.datatype;
    else if (Ar(c))
      l(this, c, v);
    else {
      if (c)
        throw new TypeError("Unsupported type of data (" + Zr(c) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = v;
    }
  }
  function i(c, v, h) {
    v.type === "SparseMatrix" ? (c._values = v._values ? hr(v._values) : void 0, c._index = hr(v._index), c._ptr = hr(v._ptr), c._size = hr(v._size), c._datatype = h || v._datatype) : l(c, v.valueOf(), h || v._datatype);
  }
  function l(c, v, h) {
    c._values = [], c._index = [], c._ptr = [], c._datatype = h;
    var A = v.length, x = 0, E = t, w = 0;
    if (Gr(h) && (E = e.find(t, [h, h]) || t, w = e.convert(0, h)), A > 0) {
      var D = 0;
      do {
        c._ptr.push(c._index.length);
        for (var b = 0; b < A; b++) {
          var F = v[b];
          if (Ar(F)) {
            if (D === 0 && x < F.length && (x = F.length), D < F.length) {
              var y = F[D];
              E(y, w) || (c._values.push(y), c._index.push(b));
            }
          } else
            D === 0 && x < 1 && (x = 1), E(F, w) || (c._values.push(F), c._index.push(b));
        }
        D++;
      } while (D < x);
    }
    c._ptr.push(c._index.length), c._size = [A, x];
  }
  n.prototype = new a(), n.prototype.createSparseMatrix = function(c, v) {
    return new n(c, v);
  }, Object.defineProperty(n, "name", { value: "SparseMatrix" }), n.prototype.constructor = n, n.prototype.type = "SparseMatrix", n.prototype.isSparseMatrix = true, n.prototype.getDataType = function() {
    return Pe(this._values, Zr);
  }, n.prototype.storage = function() {
    return "sparse";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(c, v) {
    return new n(c, v);
  }, n.prototype.density = function() {
    var c = this._size[0], v = this._size[1];
    return c !== 0 && v !== 0 ? this._index.length / (c * v) : 0;
  }, n.prototype.subset = function(c, v, h) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return m(this, c);
      case 2:
      case 3:
        return f(this, c, v, h);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function m(c, v) {
    if (!ze(v))
      throw new TypeError("Invalid index");
    var h = v.isScalar();
    if (h)
      return c.get(v.min());
    var A = v.size();
    if (A.length !== c._size.length)
      throw new vr(A.length, c._size.length);
    var x, E, w, D, b = v.min(), F = v.max();
    for (x = 0, E = c._size.length; x < E; x++)
      Nr(b[x], c._size[x]), Nr(F[x], c._size[x]);
    var y = c._values, C = c._index, M = c._ptr, S = v.dimension(0), O = v.dimension(1), I = [], P = [];
    S.forEach(function(T, Z) {
      P[T] = Z[0], I[T] = true;
    });
    var B = y ? [] : void 0, G = [], q = [];
    return O.forEach(function(T) {
      for (q.push(G.length), w = M[T], D = M[T + 1]; w < D; w++)
        x = C[w], I[x] === true && (G.push(P[x]), B && B.push(y[w]));
    }), q.push(G.length), new n({ values: B, index: G, ptr: q, size: A, datatype: c._datatype });
  }
  function f(c, v, h, A) {
    if (!v || v.isIndex !== true)
      throw new TypeError("Invalid index");
    var x = v.size(), E = v.isScalar(), w;
    if (yr(h) ? (w = h.size(), h = h.toArray()) : w = br(h), E) {
      if (w.length !== 0)
        throw new TypeError("Scalar expected");
      c.set(v.min(), h, A);
    } else {
      if (x.length !== 1 && x.length !== 2)
        throw new vr(x.length, c._size.length, "<");
      if (w.length < x.length) {
        for (var D = 0, b = 0; x[D] === 1 && w[D] === 1; )
          D++;
        for (; x[D] === 1; )
          b++, D++;
        h = Ot(h, x.length, b, w);
      }
      if (!Fe(x, w))
        throw new vr(x, w, ">");
      if (x.length === 1) {
        var F = v.dimension(0);
        F.forEach(function(M, S) {
          Nr(M), c.set([M, 0], h[S[0]], A);
        });
      } else {
        var y = v.dimension(0), C = v.dimension(1);
        y.forEach(function(M, S) {
          Nr(M), C.forEach(function(O, I) {
            Nr(O), c.set([M, O], h[S[0]][I[0]], A);
          });
        });
      }
    }
    return c;
  }
  n.prototype.get = function(c) {
    if (!Ar(c))
      throw new TypeError("Array expected");
    if (c.length !== this._size.length)
      throw new vr(c.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var v = c[0], h = c[1];
    Nr(v, this._size[0]), Nr(h, this._size[1]);
    var A = u(v, this._ptr[h], this._ptr[h + 1], this._index);
    return A < this._ptr[h + 1] && this._index[A] === v ? this._values[A] : 0;
  }, n.prototype.set = function(c, v, h) {
    if (!Ar(c))
      throw new TypeError("Array expected");
    if (c.length !== this._size.length)
      throw new vr(c.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var A = c[0], x = c[1], E = this._size[0], w = this._size[1], D = t, b = 0;
    Gr(this._datatype) && (D = e.find(t, [this._datatype, this._datatype]) || t, b = e.convert(0, this._datatype)), (A > E - 1 || x > w - 1) && (p(this, Math.max(A + 1, E), Math.max(x + 1, w), h), E = this._size[0], w = this._size[1]), Nr(A, E), Nr(x, w);
    var F = u(A, this._ptr[x], this._ptr[x + 1], this._index);
    return F < this._ptr[x + 1] && this._index[F] === A ? D(v, b) ? o(F, x, this._values, this._index, this._ptr) : this._values[F] = v : D(v, b) || s(F, A, x, v, this._values, this._index, this._ptr), this;
  };
  function u(c, v, h, A) {
    if (h - v === 0)
      return h;
    for (var x = v; x < h; x++)
      if (A[x] === c)
        return x;
    return v;
  }
  function o(c, v, h, A, x) {
    h.splice(c, 1), A.splice(c, 1);
    for (var E = v + 1; E < x.length; E++)
      x[E]--;
  }
  function s(c, v, h, A, x, E, w) {
    x.splice(c, 0, A), E.splice(c, 0, v);
    for (var D = h + 1; D < w.length; D++)
      w[D]++;
  }
  n.prototype.resize = function(c, v, h) {
    if (!Ge(c))
      throw new TypeError("Array or Matrix expected");
    var A = c.valueOf().map((E) => Array.isArray(E) && E.length === 1 ? E[0] : E);
    if (A.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    A.forEach(function(E) {
      if (!Fr(E) || !dr(E) || E < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Sr(A) + ")");
    });
    var x = h ? this.clone() : this;
    return p(x, A[0], A[1], v);
  };
  function p(c, v, h, A) {
    var x = A || 0, E = t, w = 0;
    Gr(c._datatype) && (E = e.find(t, [c._datatype, c._datatype]) || t, w = e.convert(0, c._datatype), x = e.convert(x, c._datatype));
    var D = !E(x, w), b = c._size[0], F = c._size[1], y, C, M;
    if (h > F) {
      for (C = F; C < h; C++)
        if (c._ptr[C] = c._values.length, D)
          for (y = 0; y < b; y++)
            c._values.push(x), c._index.push(y);
      c._ptr[h] = c._values.length;
    } else
      h < F && (c._ptr.splice(h + 1, F - h), c._values.splice(c._ptr[h], c._values.length), c._index.splice(c._ptr[h], c._index.length));
    if (F = h, v > b) {
      if (D) {
        var S = 0;
        for (C = 0; C < F; C++) {
          c._ptr[C] = c._ptr[C] + S, M = c._ptr[C + 1] + S;
          var O = 0;
          for (y = b; y < v; y++, O++)
            c._values.splice(M + O, 0, x), c._index.splice(M + O, 0, y), S++;
        }
        c._ptr[F] = c._values.length;
      }
    } else if (v < b) {
      var I = 0;
      for (C = 0; C < F; C++) {
        c._ptr[C] = c._ptr[C] - I;
        var P = c._ptr[C], B = c._ptr[C + 1] - I;
        for (M = P; M < B; M++)
          y = c._index[M], y > v - 1 && (c._values.splice(M, 1), c._index.splice(M, 1), I++);
      }
      c._ptr[C] = c._values.length;
    }
    return c._size[0] = v, c._size[1] = h, c;
  }
  n.prototype.reshape = function(c, v) {
    if (!Ar(c))
      throw new TypeError("Array expected");
    if (c.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    c.forEach(function(T) {
      if (!Fr(T) || !dr(T) || T <= -2 || T === 0)
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Sr(c) + ")");
    });
    var h = this._size[0] * this._size[1];
    c = dt(c, h);
    var A = c[0] * c[1];
    if (h !== A)
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var x = v ? this.clone() : this;
    if (this._size[0] === c[0] && this._size[1] === c[1])
      return x;
    for (var E = [], w = 0; w < x._ptr.length; w++)
      for (var D = 0; D < x._ptr[w + 1] - x._ptr[w]; D++)
        E.push(w);
    for (var b = x._values.slice(), F = x._index.slice(), y = 0; y < x._index.length; y++) {
      var C = F[y], M = E[y], S = C * x._size[1] + M;
      E[y] = S % c[1], F[y] = Math.floor(S / c[1]);
    }
    x._values.length = 0, x._index.length = 0, x._ptr.length = c[1] + 1, x._size = c.slice();
    for (var O = 0; O < x._ptr.length; O++)
      x._ptr[O] = 0;
    for (var I = 0; I < b.length; I++) {
      var P = F[I], B = E[I], G = b[I], q = u(P, x._ptr[B], x._ptr[B + 1], x._index);
      s(q, P, B, G, x._values, x._index, x._ptr);
    }
    return x;
  }, n.prototype.clone = function() {
    var c = new n({ values: this._values ? hr(this._values) : void 0, index: hr(this._index), ptr: hr(this._ptr), size: hr(this._size), datatype: this._datatype });
    return c;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype.map = function(c, v) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var h = this, A = this._size[0], x = this._size[1], E = $t(c), w = function(b, F, y) {
      return E === 1 ? c(b) : E === 2 ? c(b, [F, y]) : c(b, [F, y], h);
    };
    return d(this, 0, A - 1, 0, x - 1, w, v);
  };
  function d(c, v, h, A, x, E, w) {
    var D = [], b = [], F = [], y = t, C = 0;
    Gr(c._datatype) && (y = e.find(t, [c._datatype, c._datatype]) || t, C = e.convert(0, c._datatype));
    for (var M = function(U, Q, nr) {
      U = E(U, Q, nr), y(U, C) || (D.push(U), b.push(Q));
    }, S = A; S <= x; S++) {
      F.push(D.length);
      var O = c._ptr[S], I = c._ptr[S + 1];
      if (w)
        for (var P = O; P < I; P++) {
          var B = c._index[P];
          B >= v && B <= h && M(c._values[P], B - v, S - A);
        }
      else {
        for (var G = {}, q = O; q < I; q++) {
          var T = c._index[q];
          G[T] = c._values[q];
        }
        for (var Z = v; Z <= h; Z++) {
          var X = Z in G ? G[Z] : 0;
          M(X, Z - v, S - A);
        }
      }
    }
    return F.push(D.length), new n({ values: D, index: b, ptr: F, size: [h - v + 1, x - A + 1] });
  }
  n.prototype.forEach = function(c, v) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var h = this, A = this._size[0], x = this._size[1], E = 0; E < x; E++) {
      var w = this._ptr[E], D = this._ptr[E + 1];
      if (v)
        for (var b = w; b < D; b++) {
          var F = this._index[b];
          c(this._values[b], [F, E], h);
        }
      else {
        for (var y = {}, C = w; C < D; C++) {
          var M = this._index[C];
          y[M] = this._values[C];
        }
        for (var S = 0; S < A; S++) {
          var O = S in y ? y[S] : 0;
          c(O, [S, E], h);
        }
      }
    }
  }, n.prototype[Symbol.iterator] = function* () {
    if (!this._values)
      throw new Error("Cannot iterate a Pattern only matrix");
    for (var c = this._size[1], v = 0; v < c; v++)
      for (var h = this._ptr[v], A = this._ptr[v + 1], x = h; x < A; x++) {
        var E = this._index[x];
        yield { value: this._values[x], index: [E, v] };
      }
  }, n.prototype.toArray = function() {
    return g(this._values, this._index, this._ptr, this._size, true);
  }, n.prototype.valueOf = function() {
    return g(this._values, this._index, this._ptr, this._size, false);
  };
  function g(c, v, h, A, x) {
    var E = A[0], w = A[1], D = [], b, F;
    for (b = 0; b < E; b++)
      for (D[b] = [], F = 0; F < w; F++)
        D[b][F] = 0;
    for (F = 0; F < w; F++)
      for (var y = h[F], C = h[F + 1], M = y; M < C; M++)
        b = v[M], D[b][F] = c ? x ? hr(c[M]) : c[M] : 1;
    return D;
  }
  return n.prototype.format = function(c) {
    for (var v = this._size[0], h = this._size[1], A = this.density(), x = "Sparse Matrix [" + Sr(v, c) + " x " + Sr(h, c) + "] density: " + Sr(A, c) + `
`, E = 0; E < h; E++)
      for (var w = this._ptr[E], D = this._ptr[E + 1], b = w; b < D; b++) {
        var F = this._index[b];
        x += `
    (` + Sr(F, c) + ", " + Sr(E, c) + ") ==> " + (this._values ? Sr(this._values[b], c) : "X");
      }
    return x;
  }, n.prototype.toString = function() {
    return Sr(this.toArray());
  }, n.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(c) {
    if (c) {
      if (Cr(c) && (c = c.toNumber()), !Fr(c) || !dr(c))
        throw new TypeError("The parameter k must be an integer number");
    } else
      c = 0;
    var v = c > 0 ? c : 0, h = c < 0 ? -c : 0, A = this._size[0], x = this._size[1], E = Math.min(A - h, x - v), w = [], D = [], b = [];
    b[0] = 0;
    for (var F = v; F < x && w.length < E; F++)
      for (var y = this._ptr[F], C = this._ptr[F + 1], M = y; M < C; M++) {
        var S = this._index[M];
        if (S === F - v + h) {
          w.push(this._values[M]), D[w.length - 1] = S - h;
          break;
        }
      }
    return b.push(w.length), new n({ values: w, index: D, ptr: b, size: [E, 1] });
  }, n.fromJSON = function(c) {
    return new n(c);
  }, n.diagonal = function(c, v, h, A, x) {
    if (!Ar(c))
      throw new TypeError("Array expected, size parameter");
    if (c.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (c = c.map(function(T) {
      if (Cr(T) && (T = T.toNumber()), !Fr(T) || !dr(T) || T < 1)
        throw new Error("Size values must be positive integers");
      return T;
    }), h) {
      if (Cr(h) && (h = h.toNumber()), !Fr(h) || !dr(h))
        throw new TypeError("The parameter k must be an integer number");
    } else
      h = 0;
    var E = t, w = 0;
    Gr(x) && (E = e.find(t, [x, x]) || t, w = e.convert(0, x));
    var D = h > 0 ? h : 0, b = h < 0 ? -h : 0, F = c[0], y = c[1], C = Math.min(F - b, y - D), M;
    if (Ar(v)) {
      if (v.length !== C)
        throw new Error("Invalid value array length");
      M = function(Z) {
        return v[Z];
      };
    } else if (yr(v)) {
      var S = v.size();
      if (S.length !== 1 || S[0] !== C)
        throw new Error("Invalid matrix length");
      M = function(Z) {
        return v.get([Z]);
      };
    } else
      M = function() {
        return v;
      };
    for (var O = [], I = [], P = [], B = 0; B < y; B++) {
      P.push(O.length);
      var G = B - D;
      if (G >= 0 && G < C) {
        var q = M(G);
        E(q, w) || (I.push(G + b), O.push(q));
      }
    }
    return P.push(O.length), new n({ values: O, index: I, ptr: P, size: [F, y] });
  }, n.prototype.swapRows = function(c, v) {
    if (!Fr(c) || !dr(c) || !Fr(v) || !dr(v))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Nr(c, this._size[0]), Nr(v, this._size[0]), n._swapRows(c, v, this._size[1], this._values, this._index, this._ptr), this;
  }, n._forEachRow = function(c, v, h, A, x) {
    for (var E = A[c], w = A[c + 1], D = E; D < w; D++)
      x(h[D], v[D]);
  }, n._swapRows = function(c, v, h, A, x, E) {
    for (var w = 0; w < h; w++) {
      var D = E[w], b = E[w + 1], F = u(c, D, b, x), y = u(v, D, b, x);
      if (F < b && y < b && x[F] === c && x[y] === v) {
        if (A) {
          var C = A[F];
          A[F] = A[y], A[y] = C;
        }
        continue;
      }
      if (F < b && x[F] === c && (y >= b || x[y] !== v)) {
        var M = A ? A[F] : void 0;
        x.splice(y, 0, v), A && A.splice(y, 0, M), x.splice(y <= F ? F + 1 : F, 1), A && A.splice(y <= F ? F + 1 : F, 1);
        continue;
      }
      if (y < b && x[y] === v && (F >= b || x[F] !== c)) {
        var S = A ? A[y] : void 0;
        x.splice(F, 0, c), A && A.splice(F, 0, S), x.splice(F <= y ? y + 1 : y, 1), A && A.splice(F <= y ? y + 1 : y, 1);
      }
    }
  }, n;
}, { isClass: true });
var vl = "number", hl = ["typed"];
function dl(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var t = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], a = e[2], n = e[3];
    return { input: r, radix: t, integerPart: a, fractionalPart: n };
  } else
    return null;
}
function gl(r) {
  for (var e = parseInt(r.integerPart, r.radix), t = 0, a = 0; a < r.fractionalPart.length; a++) {
    var n = parseInt(r.fractionalPart[a], r.radix);
    t += n / Math.pow(r.radix, a + 1);
  }
  var i = e + t;
  if (isNaN(i))
    throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return i;
}
var da = _(vl, hl, (r) => {
  var { typed: e } = r, t = e("number", { "": function() {
    return 0;
  }, number: function(n) {
    return n;
  }, string: function(n) {
    if (n === "NaN")
      return NaN;
    var i = dl(n);
    if (i)
      return gl(i);
    var l = 0, m = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    m && (l = Number(m[2]), n = m[1]);
    var f = Number(n);
    if (isNaN(f))
      throw new SyntaxError('String "' + n + '" is not a valid number');
    if (m) {
      if (f > Ir(2, l) - 1)
        throw new SyntaxError('String "'.concat(n, '" is out of range'));
      f >= Ir(2, l - 1) && (f = f - Ir(2, l));
    }
    return f;
  }, BigNumber: function(n) {
    return n.toNumber();
  }, Fraction: function(n) {
    return n.valueOf();
  }, Unit: e.referToSelf((a) => (n) => {
    var i = n.clone();
    return i.value = a(n.value), i;
  }), null: function(n) {
    return 0;
  }, "Unit, string | Unit": function(n, i) {
    return n.toNumber(i);
  }, "Array | Matrix": e.referToSelf((a) => (n) => Or(n, a)) });
  return t.fromJSON = function(a) {
    return parseFloat(a.value);
  }, t;
});
var Dl = "bignumber", xl = ["typed", "BigNumber"], ga = _(Dl, xl, (r) => {
  var { typed: e, BigNumber: t } = r;
  return e("bignumber", { "": function() {
    return new t(0);
  }, number: function(n) {
    return new t(n + "");
  }, string: function(n) {
    var i = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (i) {
      var l = i[2], m = t(i[1]), f = new t(2).pow(Number(l));
      if (m.gt(f.sub(1)))
        throw new SyntaxError('String "'.concat(n, '" is out of range'));
      var u = new t(2).pow(Number(l) - 1);
      return m.gte(u) ? m.sub(f) : m;
    }
    return new t(n);
  }, BigNumber: function(n) {
    return n;
  }, Unit: e.referToSelf((a) => (n) => {
    var i = n.clone();
    return i.value = a(n.value), i;
  }), Fraction: function(n) {
    return new t(n.n).div(n.d).times(n.s);
  }, null: function(n) {
    return new t(0);
  }, "Array | Matrix": e.referToSelf((a) => (n) => Or(n, a)) });
});
var yl = "complex", Al = ["typed", "Complex"], Da = _(yl, Al, (r) => {
  var { typed: e, Complex: t } = r;
  return e("complex", { "": function() {
    return t.ZERO;
  }, number: function(n) {
    return new t(n, 0);
  }, "number, number": function(n, i) {
    return new t(n, i);
  }, "BigNumber, BigNumber": function(n, i) {
    return new t(n.toNumber(), i.toNumber());
  }, Fraction: function(n) {
    return new t(n.valueOf(), 0);
  }, Complex: function(n) {
    return n.clone();
  }, string: function(n) {
    return t(n);
  }, null: function(n) {
    return t(0);
  }, Object: function(n) {
    if ("re" in n && "im" in n)
      return new t(n.re, n.im);
    if ("r" in n && "phi" in n || "abs" in n && "arg" in n)
      return new t(n);
    throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
  }, "Array | Matrix": e.referToSelf((a) => (n) => Or(n, a)) });
});
var wl = "fraction", El = ["typed", "Fraction"], xa = _(wl, El, (r) => {
  var { typed: e, Fraction: t } = r;
  return e("fraction", { number: function(n) {
    if (!isFinite(n) || isNaN(n))
      throw new Error(n + " cannot be represented as a fraction");
    return new t(n);
  }, string: function(n) {
    return new t(n);
  }, "number, number": function(n, i) {
    return new t(n, i);
  }, null: function(n) {
    return new t(0);
  }, BigNumber: function(n) {
    return new t(n.toString());
  }, Fraction: function(n) {
    return n;
  }, Unit: e.referToSelf((a) => (n) => {
    var i = n.clone();
    return i.value = a(n.value), i;
  }), Object: function(n) {
    return new t(n);
  }, "Array | Matrix": e.referToSelf((a) => (n) => Or(n, a)) });
});
var su = "matrix", Cl = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], ya = _(su, Cl, (r) => {
  var { typed: e, Matrix: t, DenseMatrix: a, SparseMatrix: n } = r;
  return e(su, { "": function() {
    return i([]);
  }, string: function(m) {
    return i([], m);
  }, "string, string": function(m, f) {
    return i([], m, f);
  }, Array: function(m) {
    return i(m);
  }, Matrix: function(m) {
    return i(m, m.storage());
  }, "Array | Matrix, string": i, "Array | Matrix, string, string": i });
  function i(l, m, f) {
    if (m === "dense" || m === "default" || m === void 0)
      return new a(l, f);
    if (m === "sparse")
      return new n(l, f);
    throw new TypeError("Unknown matrix type " + JSON.stringify(m) + ".");
  }
});
var fu = "matrixFromColumns", Fl = ["typed", "matrix", "flatten", "size"], Aa = _(fu, Fl, (r) => {
  var { typed: e, matrix: t, flatten: a, size: n } = r;
  return e(fu, { "...Array": function(f) {
    return i(f);
  }, "...Matrix": function(f) {
    return t(i(f.map((u) => u.toArray())));
  } });
  function i(m) {
    if (m.length === 0)
      throw new TypeError("At least one column is needed to construct a matrix.");
    for (var f = l(m[0]), u = [], o = 0; o < f; o++)
      u[o] = [];
    for (var s of m) {
      var p = l(s);
      if (p !== f)
        throw new TypeError("The vectors had different length: " + (f | 0) + " ≠ " + (p | 0));
      for (var d = a(s), g = 0; g < f; g++)
        u[g].push(d[g]);
    }
    return u;
  }
  function l(m) {
    var f = n(m);
    if (f.length === 1)
      return f[0];
    if (f.length === 2) {
      if (f[0] === 1)
        return f[1];
      if (f[1] === 1)
        return f[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
});
var cu = "unaryMinus", bl = ["typed"], wa = _(cu, bl, (r) => {
  var { typed: e } = r;
  return e(cu, { number: sa, "Complex | BigNumber | Fraction": (t) => t.neg(), Unit: e.referToSelf((t) => (a) => {
    var n = a.clone();
    return n.value = e.find(t, n.valueType())(a.value), n;
  }), "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
var lu = "abs", Ml = ["typed"], Ea = _(lu, Ml, (r) => {
  var { typed: e } = r;
  return e(lu, { number: aa, "Complex | BigNumber | Fraction | Unit": (t) => t.abs(), "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
var pu = "addScalar", Sl = ["typed"], Ca = _(pu, Sl, (r) => {
  var { typed: e } = r;
  return e(pu, { "number, number": ia, "Complex, Complex": function(a, n) {
    return a.add(n);
  }, "BigNumber, BigNumber": function(a, n) {
    return a.plus(n);
  }, "Fraction, Fraction": function(a, n) {
    return a.add(n);
  }, "Unit, Unit": e.referToSelf((t) => (a, n) => {
    if (a.value === null || a.value === void 0)
      throw new Error("Parameter x contains a unit with undefined value");
    if (n.value === null || n.value === void 0)
      throw new Error("Parameter y contains a unit with undefined value");
    if (!a.equalBase(n))
      throw new Error("Units do not match");
    var i = a.clone();
    return i.value = e.find(t, [i.valueType(), n.valueType()])(i.value, n.value), i.fixPrefix = false, i;
  }) });
});
var mu = "subtractScalar", Nl = ["typed"], Fa = _(mu, Nl, (r) => {
  var { typed: e } = r;
  return e(mu, { "number, number": oa, "Complex, Complex": function(a, n) {
    return a.sub(n);
  }, "BigNumber, BigNumber": function(a, n) {
    return a.minus(n);
  }, "Fraction, Fraction": function(a, n) {
    return a.sub(n);
  }, "Unit, Unit": e.referToSelf((t) => (a, n) => {
    if (a.value === null || a.value === void 0)
      throw new Error("Parameter x contains a unit with undefined value");
    if (n.value === null || n.value === void 0)
      throw new Error("Parameter y contains a unit with undefined value");
    if (!a.equalBase(n))
      throw new Error("Units do not match");
    var i = a.clone();
    return i.value = e.find(t, [i.valueType(), n.valueType()])(i.value, n.value), i.fixPrefix = false, i;
  }) });
});
var Bl = "matAlgo11xS0s", _l = ["typed", "equalScalar"], vu = _(Bl, _l, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, i, l, m) {
    var f = n._values, u = n._index, o = n._ptr, s = n._size, p = n._datatype;
    if (!f)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = s[0], g = s[1], c, v = t, h = 0, A = l;
    typeof p == "string" && (c = p, v = e.find(t, [c, c]), h = e.convert(0, c), i = e.convert(i, c), A = e.find(l, [c, c]));
    for (var x = [], E = [], w = [], D = 0; D < g; D++) {
      w[D] = E.length;
      for (var b = o[D], F = o[D + 1], y = b; y < F; y++) {
        var C = u[y], M = m ? A(i, f[y]) : A(f[y], i);
        v(M, h) || (E.push(C), x.push(M));
      }
    }
    return w[g] = E.length, n.createSparseMatrix({ values: x, index: E, ptr: w, size: [d, g], datatype: c });
  };
});
var Tl = "matAlgo12xSfs", Il = ["typed", "DenseMatrix"], ie = _(Tl, Il, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(n, i, l, m) {
    var f = n._values, u = n._index, o = n._ptr, s = n._size, p = n._datatype;
    if (!f)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = s[0], g = s[1], c, v = l;
    typeof p == "string" && (c = p, i = e.convert(i, c), v = e.find(l, [c, c]));
    for (var h = [], A = [], x = [], E = 0; E < g; E++) {
      for (var w = E + 1, D = o[E], b = o[E + 1], F = D; F < b; F++) {
        var y = u[F];
        A[y] = f[F], x[y] = w;
      }
      for (var C = 0; C < d; C++)
        E === 0 && (h[C] = []), x[C] === w ? h[C][E] = m ? v(i, A[C]) : v(A[C], i) : h[C][E] = m ? v(i, 0) : v(0, i);
    }
    return new t({ data: h, size: [d, g], datatype: c });
  };
});
var zl = "matAlgo14xDs", Ol = ["typed"], Kt = _(zl, Ol, (r) => {
  var { typed: e } = r;
  return function(n, i, l, m) {
    var f = n._data, u = n._size, o = n._datatype, s, p = l;
    typeof o == "string" && (s = o, i = e.convert(i, s), p = e.find(l, [s, s]));
    var d = u.length > 0 ? t(p, 0, u, u[0], f, i, m) : [];
    return n.createDenseMatrix({ data: d, size: hr(u), datatype: s });
  };
  function t(a, n, i, l, m, f, u) {
    var o = [];
    if (n === i.length - 1)
      for (var s = 0; s < l; s++)
        o[s] = u ? a(f, m[s]) : a(m[s], f);
    else
      for (var p = 0; p < l; p++)
        o[p] = t(a, n + 1, i, i[n + 1], m[p], f, u);
    return o;
  }
});
var Pl = "matAlgo03xDSf", ql = ["typed"], oe = _(Pl, ql, (r) => {
  var { typed: e } = r;
  return function(a, n, i, l) {
    var m = a._data, f = a._size, u = a._datatype || a.getDataType(), o = n._values, s = n._index, p = n._ptr, d = n._size, g = n._datatype || n._data === void 0 ? n._datatype : n.getDataType();
    if (f.length !== d.length)
      throw new vr(f.length, d.length);
    if (f[0] !== d[0] || f[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");
    if (!o)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var c = f[0], v = f[1], h, A = 0, x = i;
    typeof u == "string" && u === g && u !== "mixed" && (h = u, A = e.convert(0, h), x = e.find(i, [h, h]));
    for (var E = [], w = 0; w < c; w++)
      E[w] = [];
    for (var D = [], b = [], F = 0; F < v; F++) {
      for (var y = F + 1, C = p[F], M = p[F + 1], S = C; S < M; S++) {
        var O = s[S];
        D[O] = l ? x(o[S], m[O][F]) : x(m[O][F], o[S]), b[O] = y;
      }
      for (var I = 0; I < c; I++)
        b[I] === y ? E[I][F] = D[I] : E[I][F] = l ? x(A, m[I][F]) : x(m[I][F], A);
    }
    return a.createDenseMatrix({ data: E, size: [c, v], datatype: u === a._datatype && g === n._datatype ? h : void 0 });
  };
});
var Rl = "matAlgo05xSfSf", Ul = ["typed", "equalScalar"], Wt = _(Rl, Ul, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, i, l) {
    var m = n._values, f = n._index, u = n._ptr, o = n._size, s = n._datatype || n._data === void 0 ? n._datatype : n.getDataType(), p = i._values, d = i._index, g = i._ptr, c = i._size, v = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (o.length !== c.length)
      throw new vr(o.length, c.length);
    if (o[0] !== c[0] || o[1] !== c[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");
    var h = o[0], A = o[1], x, E = t, w = 0, D = l;
    typeof s == "string" && s === v && s !== "mixed" && (x = s, E = e.find(t, [x, x]), w = e.convert(0, x), D = e.find(l, [x, x]));
    var b = m && p ? [] : void 0, F = [], y = [], C = b ? [] : void 0, M = b ? [] : void 0, S = [], O = [], I, P, B, G;
    for (P = 0; P < A; P++) {
      y[P] = F.length;
      var q = P + 1;
      for (B = u[P], G = u[P + 1]; B < G; B++)
        I = f[B], F.push(I), S[I] = q, C && (C[I] = m[B]);
      for (B = g[P], G = g[P + 1]; B < G; B++)
        I = d[B], S[I] !== q && F.push(I), O[I] = q, M && (M[I] = p[B]);
      if (b)
        for (B = y[P]; B < F.length; ) {
          I = F[B];
          var T = S[I], Z = O[I];
          if (T === q || Z === q) {
            var X = T === q ? C[I] : w, L = Z === q ? M[I] : w, U = D(X, L);
            E(U, w) ? F.splice(B, 1) : (b.push(U), B++);
          }
        }
    }
    return y[A] = F.length, n.createSparseMatrix({ values: b, index: F, ptr: y, size: [h, A], datatype: s === n._datatype && v === i._datatype ? x : void 0 });
  };
});
var Ll = "matAlgo13xDD", Zl = ["typed"], hu = _(Ll, Zl, (r) => {
  var { typed: e } = r;
  return function(n, i, l) {
    var m = n._data, f = n._size, u = n._datatype, o = i._data, s = i._size, p = i._datatype, d = [];
    if (f.length !== s.length)
      throw new vr(f.length, s.length);
    for (var g = 0; g < f.length; g++) {
      if (f[g] !== s[g])
        throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + s + ")");
      d[g] = f[g];
    }
    var c, v = l;
    typeof u == "string" && u === p && (c = u, v = e.find(l, [c, c]));
    var h = d.length > 0 ? t(v, 0, d, d[0], m, o) : [];
    return n.createDenseMatrix({ data: h, size: d, datatype: c });
  };
  function t(a, n, i, l, m, f) {
    var u = [];
    if (n === i.length - 1)
      for (var o = 0; o < l; o++)
        u[o] = a(m[o], f[o]);
    else
      for (var s = 0; s < l; s++)
        u[s] = t(a, n + 1, i, i[n + 1], m[s], f[s]);
    return u;
  }
});
var Vl = "broadcast", Ql = ["concat"], du = _(Vl, Ql, (r) => {
  var { concat: e } = r;
  return function(n, i) {
    var l = Math.max(n._size.length, i._size.length);
    if (n._size.length === i._size.length && n._size.every((g, c) => g === i._size[c]))
      return [n, i];
    for (var m = t(n._size, l, 0), f = t(i._size, l, 0), u = [], o = 0; o < l; o++)
      u[o] = Math.max(m[o], f[o]);
    gt(m, u), gt(f, u);
    var s = n.clone(), p = i.clone();
    s._size.length < l ? s.reshape(t(s._size, l, 1)) : p._size.length < l && p.reshape(t(p._size, l, 1));
    for (var d = 0; d < l; d++)
      s._size[d] < u[d] && (s = a(s, u[d], d)), p._size[d] < u[d] && (p = a(p, u[d], d));
    return [s, p];
  };
  function t(n, i, l) {
    return [...Array(i - n.length).fill(l), ...n];
  }
  function a(n, i, l) {
    return e(...Array(i).fill(n), l);
  }
});
var Gl = "matrixAlgorithmSuite", Yl = ["typed", "matrix", "concat"], Hr = _(Gl, Yl, (r) => {
  var { typed: e, matrix: t, concat: a } = r, n = hu({ typed: e }), i = Kt({ typed: e }), l = du({ concat: a });
  return function(f) {
    var u = f.elop, o = f.SD || f.DS, s;
    u ? (s = { "DenseMatrix, DenseMatrix": (c, v) => n(...l(c, v), u), "Array, Array": (c, v) => n(...l(t(c), t(v)), u).valueOf(), "Array, DenseMatrix": (c, v) => n(...l(t(c), v), u), "DenseMatrix, Array": (c, v) => n(...l(c, t(v)), u) }, f.SS && (s["SparseMatrix, SparseMatrix"] = (c, v) => f.SS(...l(c, v), u, false)), f.DS && (s["DenseMatrix, SparseMatrix"] = (c, v) => f.DS(...l(c, v), u, false), s["Array, SparseMatrix"] = (c, v) => f.DS(...l(t(c), v), u, false)), o && (s["SparseMatrix, DenseMatrix"] = (c, v) => o(...l(v, c), u, true), s["SparseMatrix, Array"] = (c, v) => o(...l(t(v), c), u, true))) : (s = { "DenseMatrix, DenseMatrix": e.referToSelf((c) => (v, h) => n(...l(v, h), c)), "Array, Array": e.referToSelf((c) => (v, h) => n(...l(t(v), t(h)), c).valueOf()), "Array, DenseMatrix": e.referToSelf((c) => (v, h) => n(...l(t(v), h), c)), "DenseMatrix, Array": e.referToSelf((c) => (v, h) => n(...l(v, t(h)), c)) }, f.SS && (s["SparseMatrix, SparseMatrix"] = e.referToSelf((c) => (v, h) => f.SS(...l(v, h), c, false))), f.DS && (s["DenseMatrix, SparseMatrix"] = e.referToSelf((c) => (v, h) => f.DS(...l(v, h), c, false)), s["Array, SparseMatrix"] = e.referToSelf((c) => (v, h) => f.DS(...l(t(v), h), c, false))), o && (s["SparseMatrix, DenseMatrix"] = e.referToSelf((c) => (v, h) => o(...l(h, v), c, true)), s["SparseMatrix, Array"] = e.referToSelf((c) => (v, h) => o(...l(t(h), v), c, true))));
    var p = f.scalar || "any", d = f.Ds || f.Ss;
    d && (u ? (s["DenseMatrix," + p] = (c, v) => i(c, v, u, false), s[p + ", DenseMatrix"] = (c, v) => i(v, c, u, true), s["Array," + p] = (c, v) => i(t(c), v, u, false).valueOf(), s[p + ", Array"] = (c, v) => i(t(v), c, u, true).valueOf()) : (s["DenseMatrix," + p] = e.referToSelf((c) => (v, h) => i(v, h, c, false)), s[p + ", DenseMatrix"] = e.referToSelf((c) => (v, h) => i(h, v, c, true)), s["Array," + p] = e.referToSelf((c) => (v, h) => i(t(v), h, c, false).valueOf()), s[p + ", Array"] = e.referToSelf((c) => (v, h) => i(t(h), v, c, true).valueOf())));
    var g = f.sS !== void 0 ? f.sS : f.Ss;
    return u ? (f.Ss && (s["SparseMatrix," + p] = (c, v) => f.Ss(c, v, u, false)), g && (s[p + ", SparseMatrix"] = (c, v) => g(v, c, u, true))) : (f.Ss && (s["SparseMatrix," + p] = e.referToSelf((c) => (v, h) => f.Ss(v, h, c, false))), g && (s[p + ", SparseMatrix"] = e.referToSelf((c) => (v, h) => g(h, v, c, true)))), u && u.signatures && so(s, u.signatures), s;
  };
});
var $l = "matAlgo01xDSid", Jl = ["typed"], Ht = _($l, Jl, (r) => {
  var { typed: e } = r;
  return function(a, n, i, l) {
    var m = a._data, f = a._size, u = a._datatype || a.getDataType(), o = n._values, s = n._index, p = n._ptr, d = n._size, g = n._datatype || n._data === void 0 ? n._datatype : n.getDataType();
    if (f.length !== d.length)
      throw new vr(f.length, d.length);
    if (f[0] !== d[0] || f[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");
    if (!o)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var c = f[0], v = f[1], h = typeof u == "string" && u !== "mixed" && u === g ? u : void 0, A = h ? e.find(i, [h, h]) : i, x, E, w = [];
    for (x = 0; x < c; x++)
      w[x] = [];
    var D = [], b = [];
    for (E = 0; E < v; E++) {
      for (var F = E + 1, y = p[E], C = p[E + 1], M = y; M < C; M++)
        x = s[M], D[x] = l ? A(o[M], m[x][E]) : A(m[x][E], o[M]), b[x] = F;
      for (x = 0; x < c; x++)
        b[x] === F ? w[x][E] = D[x] : w[x][E] = m[x][E];
    }
    return a.createDenseMatrix({ data: w, size: [c, v], datatype: u === a._datatype && g === n._datatype ? h : void 0 });
  };
});
var Xl = "matAlgo04xSidSid", Kl = ["typed", "equalScalar"], gu = _(Xl, Kl, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, i, l) {
    var m = n._values, f = n._index, u = n._ptr, o = n._size, s = n._datatype || n._data === void 0 ? n._datatype : n.getDataType(), p = i._values, d = i._index, g = i._ptr, c = i._size, v = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (o.length !== c.length)
      throw new vr(o.length, c.length);
    if (o[0] !== c[0] || o[1] !== c[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");
    var h = o[0], A = o[1], x, E = t, w = 0, D = l;
    typeof s == "string" && s === v && s !== "mixed" && (x = s, E = e.find(t, [x, x]), w = e.convert(0, x), D = e.find(l, [x, x]));
    var b = m && p ? [] : void 0, F = [], y = [], C = m && p ? [] : void 0, M = m && p ? [] : void 0, S = [], O = [], I, P, B, G, q;
    for (P = 0; P < A; P++) {
      y[P] = F.length;
      var T = P + 1;
      for (G = u[P], q = u[P + 1], B = G; B < q; B++)
        I = f[B], F.push(I), S[I] = T, C && (C[I] = m[B]);
      for (G = g[P], q = g[P + 1], B = G; B < q; B++)
        if (I = d[B], S[I] === T) {
          if (C) {
            var Z = D(C[I], p[B]);
            E(Z, w) ? S[I] = null : C[I] = Z;
          }
        } else
          F.push(I), O[I] = T, M && (M[I] = p[B]);
      if (C && M)
        for (B = y[P]; B < F.length; )
          I = F[B], S[I] === T ? (b[B] = C[I], B++) : O[I] === T ? (b[B] = M[I], B++) : F.splice(B, 1);
    }
    return y[A] = F.length, n.createSparseMatrix({ values: b, index: F, ptr: y, size: [h, A], datatype: s === n._datatype && v === i._datatype ? x : void 0 });
  };
});
var Wl = "matAlgo10xSids", Hl = ["typed", "DenseMatrix"], kt = _(Wl, Hl, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(n, i, l, m) {
    var f = n._values, u = n._index, o = n._ptr, s = n._size, p = n._datatype;
    if (!f)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = s[0], g = s[1], c, v = l;
    typeof p == "string" && (c = p, i = e.convert(i, c), v = e.find(l, [c, c]));
    for (var h = [], A = [], x = [], E = 0; E < g; E++) {
      for (var w = E + 1, D = o[E], b = o[E + 1], F = D; F < b; F++) {
        var y = u[F];
        A[y] = f[F], x[y] = w;
      }
      for (var C = 0; C < d; C++)
        E === 0 && (h[C] = []), x[C] === w ? h[C][E] = m ? v(i, A[C]) : v(A[C], i) : h[C][E] = i;
    }
    return new t({ data: h, size: [d, g], datatype: c });
  };
});
var kl = "multiplyScalar", jl = ["typed"], ba = _(kl, jl, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": ua, "Complex, Complex": function(a, n) {
    return a.mul(n);
  }, "BigNumber, BigNumber": function(a, n) {
    return a.times(n);
  }, "Fraction, Fraction": function(a, n) {
    return a.mul(n);
  }, "number | Fraction | BigNumber | Complex, Unit": (t, a) => a.multiply(t), "Unit, number | Fraction | BigNumber | Complex | Unit": (t, a) => t.multiply(a) });
});
var Du = "multiply", rp = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Ma = _(Du, rp, (r) => {
  var { typed: e, matrix: t, addScalar: a, multiplyScalar: n, equalScalar: i, dot: l } = r, m = vu({ typed: e, equalScalar: i }), f = Kt({ typed: e });
  function u(w, D) {
    switch (w.length) {
      case 1:
        switch (D.length) {
          case 1:
            if (w[0] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (w[0] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + w[0] + ") must match Matrix rows (" + D[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + D.length + " dimensions)");
        }
        break;
      case 2:
        switch (D.length) {
          case 1:
            if (w[1] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + w[1] + ") must match Vector length (" + D[0] + ")");
            break;
          case 2:
            if (w[1] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + w[1] + ") must match Matrix B rows (" + D[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + D.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + w.length + " dimensions)");
    }
  }
  function o(w, D, b) {
    if (b === 0)
      throw new Error("Cannot multiply two empty vectors");
    return l(w, D);
  }
  function s(w, D) {
    if (D.storage() !== "dense")
      throw new Error("Support for SparseMatrix not implemented");
    return p(w, D);
  }
  function p(w, D) {
    var b = w._data, F = w._size, y = w._datatype || w.getDataType(), C = D._data, M = D._size, S = D._datatype || D.getDataType(), O = F[0], I = M[1], P, B = a, G = n;
    y && S && y === S && typeof y == "string" && y !== "mixed" && (P = y, B = e.find(a, [P, P]), G = e.find(n, [P, P]));
    for (var q = [], T = 0; T < I; T++) {
      for (var Z = G(b[0], C[0][T]), X = 1; X < O; X++)
        Z = B(Z, G(b[X], C[X][T]));
      q[T] = Z;
    }
    return w.createDenseMatrix({ data: q, size: [I], datatype: y === w._datatype && S === D._datatype ? P : void 0 });
  }
  var d = e("_multiplyMatrixVector", { "DenseMatrix, any": c, "SparseMatrix, any": A }), g = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": v, "DenseMatrix, SparseMatrix": h, "SparseMatrix, DenseMatrix": x, "SparseMatrix, SparseMatrix": E });
  function c(w, D) {
    var b = w._data, F = w._size, y = w._datatype || w.getDataType(), C = D._data, M = D._datatype || D.getDataType(), S = F[0], O = F[1], I, P = a, B = n;
    y && M && y === M && typeof y == "string" && y !== "mixed" && (I = y, P = e.find(a, [I, I]), B = e.find(n, [I, I]));
    for (var G = [], q = 0; q < S; q++) {
      for (var T = b[q], Z = B(T[0], C[0]), X = 1; X < O; X++)
        Z = P(Z, B(T[X], C[X]));
      G[q] = Z;
    }
    return w.createDenseMatrix({ data: G, size: [S], datatype: y === w._datatype && M === D._datatype ? I : void 0 });
  }
  function v(w, D) {
    var b = w._data, F = w._size, y = w._datatype || w.getDataType(), C = D._data, M = D._size, S = D._datatype || D.getDataType(), O = F[0], I = F[1], P = M[1], B, G = a, q = n;
    y && S && y === S && typeof y == "string" && y !== "mixed" && y !== "mixed" && (B = y, G = e.find(a, [B, B]), q = e.find(n, [B, B]));
    for (var T = [], Z = 0; Z < O; Z++) {
      var X = b[Z];
      T[Z] = [];
      for (var L = 0; L < P; L++) {
        for (var U = q(X[0], C[0][L]), Q = 1; Q < I; Q++)
          U = G(U, q(X[Q], C[Q][L]));
        T[Z][L] = U;
      }
    }
    return w.createDenseMatrix({ data: T, size: [O, P], datatype: y === w._datatype && S === D._datatype ? B : void 0 });
  }
  function h(w, D) {
    var b = w._data, F = w._size, y = w._datatype || w.getDataType(), C = D._values, M = D._index, S = D._ptr, O = D._size, I = D._datatype || D._data === void 0 ? D._datatype : D.getDataType();
    if (!C)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var P = F[0], B = O[1], G, q = a, T = n, Z = i, X = 0;
    y && I && y === I && typeof y == "string" && y !== "mixed" && (G = y, q = e.find(a, [G, G]), T = e.find(n, [G, G]), Z = e.find(i, [G, G]), X = e.convert(0, G));
    for (var L = [], U = [], Q = [], nr = D.createSparseMatrix({ values: L, index: U, ptr: Q, size: [P, B], datatype: y === w._datatype && I === D._datatype ? G : void 0 }), H = 0; H < B; H++) {
      Q[H] = U.length;
      var V = S[H], J = S[H + 1];
      if (J > V)
        for (var k = 0, Y = 0; Y < P; Y++) {
          for (var ar = Y + 1, j = void 0, ur = V; ur < J; ur++) {
            var fr = M[ur];
            k !== ar ? (j = T(b[Y][fr], C[ur]), k = ar) : j = q(j, T(b[Y][fr], C[ur]));
          }
          k === ar && !Z(j, X) && (U.push(Y), L.push(j));
        }
    }
    return Q[B] = U.length, nr;
  }
  function A(w, D) {
    var b = w._values, F = w._index, y = w._ptr, C = w._datatype || w._data === void 0 ? w._datatype : w.getDataType();
    if (!b)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = D._data, S = D._datatype || D.getDataType(), O = w._size[0], I = D._size[0], P = [], B = [], G = [], q, T = a, Z = n, X = i, L = 0;
    C && S && C === S && typeof C == "string" && C !== "mixed" && (q = C, T = e.find(a, [q, q]), Z = e.find(n, [q, q]), X = e.find(i, [q, q]), L = e.convert(0, q));
    var U = [], Q = [];
    G[0] = 0;
    for (var nr = 0; nr < I; nr++) {
      var H = M[nr];
      if (!X(H, L))
        for (var V = y[nr], J = y[nr + 1], k = V; k < J; k++) {
          var Y = F[k];
          Q[Y] ? U[Y] = T(U[Y], Z(H, b[k])) : (Q[Y] = true, B.push(Y), U[Y] = Z(H, b[k]));
        }
    }
    for (var ar = B.length, j = 0; j < ar; j++) {
      var ur = B[j];
      P[j] = U[ur];
    }
    return G[1] = B.length, w.createSparseMatrix({ values: P, index: B, ptr: G, size: [O, 1], datatype: C === w._datatype && S === D._datatype ? q : void 0 });
  }
  function x(w, D) {
    var b = w._values, F = w._index, y = w._ptr, C = w._datatype || w._data === void 0 ? w._datatype : w.getDataType();
    if (!b)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = D._data, S = D._datatype || D.getDataType(), O = w._size[0], I = D._size[0], P = D._size[1], B, G = a, q = n, T = i, Z = 0;
    C && S && C === S && typeof C == "string" && C !== "mixed" && (B = C, G = e.find(a, [B, B]), q = e.find(n, [B, B]), T = e.find(i, [B, B]), Z = e.convert(0, B));
    for (var X = [], L = [], U = [], Q = w.createSparseMatrix({ values: X, index: L, ptr: U, size: [O, P], datatype: C === w._datatype && S === D._datatype ? B : void 0 }), nr = [], H = [], V = 0; V < P; V++) {
      U[V] = L.length;
      for (var J = V + 1, k = 0; k < I; k++) {
        var Y = M[k][V];
        if (!T(Y, Z))
          for (var ar = y[k], j = y[k + 1], ur = ar; ur < j; ur++) {
            var fr = F[ur];
            H[fr] !== J ? (H[fr] = J, L.push(fr), nr[fr] = q(Y, b[ur])) : nr[fr] = G(nr[fr], q(Y, b[ur]));
          }
      }
      for (var pr = U[V], xr = L.length, wr = pr; wr < xr; wr++) {
        var cr = L[wr];
        X[wr] = nr[cr];
      }
    }
    return U[P] = L.length, Q;
  }
  function E(w, D) {
    var b = w._values, F = w._index, y = w._ptr, C = w._datatype || w._data === void 0 ? w._datatype : w.getDataType(), M = D._values, S = D._index, O = D._ptr, I = D._datatype || D._data === void 0 ? D._datatype : D.getDataType(), P = w._size[0], B = D._size[1], G = b && M, q, T = a, Z = n;
    C && I && C === I && typeof C == "string" && C !== "mixed" && (q = C, T = e.find(a, [q, q]), Z = e.find(n, [q, q]));
    for (var X = G ? [] : void 0, L = [], U = [], Q = w.createSparseMatrix({ values: X, index: L, ptr: U, size: [P, B], datatype: C === w._datatype && I === D._datatype ? q : void 0 }), nr = G ? [] : void 0, H = [], V, J, k, Y, ar, j, ur, fr, pr = 0; pr < B; pr++) {
      U[pr] = L.length;
      var xr = pr + 1;
      for (ar = O[pr], j = O[pr + 1], Y = ar; Y < j; Y++)
        if (fr = S[Y], G)
          for (J = y[fr], k = y[fr + 1], V = J; V < k; V++)
            ur = F[V], H[ur] !== xr ? (H[ur] = xr, L.push(ur), nr[ur] = Z(M[Y], b[V])) : nr[ur] = T(nr[ur], Z(M[Y], b[V]));
        else
          for (J = y[fr], k = y[fr + 1], V = J; V < k; V++)
            ur = F[V], H[ur] !== xr && (H[ur] = xr, L.push(ur));
      if (G)
        for (var wr = U[pr], cr = L.length, Mr = wr; Mr < cr; Mr++) {
          var Er = L[Mr];
          X[Mr] = nr[Er];
        }
    }
    return U[B] = L.length, Q;
  }
  return e(Du, n, { "Array, Array": e.referTo("Matrix, Matrix", (w) => (D, b) => {
    u(br(D), br(b));
    var F = w(t(D), t(b));
    return yr(F) ? F.valueOf() : F;
  }), "Matrix, Matrix": function(D, b) {
    var F = D.size(), y = b.size();
    return u(F, y), F.length === 1 ? y.length === 1 ? o(D, b, F[0]) : s(D, b) : y.length === 1 ? d(D, b) : g(D, b);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (w) => (D, b) => w(D, t(b))), "Array, Matrix": e.referToSelf((w) => (D, b) => w(t(D, b.storage()), b)), "SparseMatrix, any": function(D, b) {
    return m(D, b, n, false);
  }, "DenseMatrix, any": function(D, b) {
    return f(D, b, n, false);
  }, "any, SparseMatrix": function(D, b) {
    return m(b, D, n, true);
  }, "any, DenseMatrix": function(D, b) {
    return f(b, D, n, true);
  }, "Array, any": function(D, b) {
    return f(t(D), b, n, false).valueOf();
  }, "any, Array": function(D, b) {
    return f(t(b), D, n, true).valueOf();
  }, "any, any": n, "any, any, ...any": e.referToSelf((w) => (D, b, F) => {
    for (var y = w(D, b), C = 0; C < F.length; C++)
      y = w(y, F[C]);
    return y;
  }) });
});
var xu = "sign", ep = ["typed", "BigNumber", "Fraction", "complex"], Sa = _(xu, ep, (r) => {
  var { typed: e, BigNumber: t, complex: a, Fraction: n } = r;
  return e(xu, { number: Jt, Complex: function(l) {
    return l.im === 0 ? a(Jt(l.re)) : l.sign();
  }, BigNumber: function(l) {
    return new t(l.cmp(0));
  }, Fraction: function(l) {
    return new n(l.s, 1);
  }, "Array | Matrix": e.referToSelf((i) => (l) => Or(l, i)), Unit: e.referToSelf((i) => (l) => {
    if (!l._isDerived() && l.units[0].unit.offset !== 0)
      throw new TypeError("sign is ambiguous for units with offset");
    return e.find(i, l.valueType())(l.value);
  }) });
});
var tp = "sqrt", np = ["config", "typed", "Complex"], Na = _(tp, np, (r) => {
  var { config: e, typed: t, Complex: a } = r;
  return t("sqrt", { number: n, Complex: function(l) {
    return l.sqrt();
  }, BigNumber: function(l) {
    return !l.isNegative() || e.predictable ? l.sqrt() : n(l.toNumber());
  }, Unit: function(l) {
    return l.pow(0.5);
  } });
  function n(i) {
    return isNaN(i) ? NaN : i >= 0 || e.predictable ? Math.sqrt(i) : new a(i, 0).sqrt();
  }
});
var yu = "subtract", ap = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Ba = _(yu, ap, (r) => {
  var { typed: e, matrix: t, equalScalar: a, subtractScalar: n, unaryMinus: i, DenseMatrix: l, concat: m } = r, f = Ht({ typed: e }), u = oe({ typed: e }), o = Wt({ typed: e, equalScalar: a }), s = kt({ typed: e, DenseMatrix: l }), p = ie({ typed: e, DenseMatrix: l }), d = Hr({ typed: e, matrix: t, concat: m });
  return e(yu, { "any, any": n }, d({ elop: n, SS: o, DS: f, SD: u, Ss: p, sS: s }));
});
var ip = "matAlgo07xSSf", op = ["typed", "DenseMatrix"], Ee = _(ip, op, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(i, l, m) {
    var f = i._size, u = i._datatype || i._data === void 0 ? i._datatype : i.getDataType(), o = l._size, s = l._datatype || l._data === void 0 ? l._datatype : l.getDataType();
    if (f.length !== o.length)
      throw new vr(f.length, o.length);
    if (f[0] !== o[0] || f[1] !== o[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + o + ")");
    var p = f[0], d = f[1], g, c = 0, v = m;
    typeof u == "string" && u === s && u !== "mixed" && (g = u, c = e.convert(0, g), v = e.find(m, [g, g]));
    var h, A, x = [];
    for (h = 0; h < p; h++)
      x[h] = [];
    var E = [], w = [], D = [], b = [];
    for (A = 0; A < d; A++) {
      var F = A + 1;
      for (a(i, A, D, E, F), a(l, A, b, w, F), h = 0; h < p; h++) {
        var y = D[h] === F ? E[h] : c, C = b[h] === F ? w[h] : c;
        x[h][A] = v(y, C);
      }
    }
    return new t({ data: x, size: [p, d], datatype: u === i._datatype && s === l._datatype ? g : void 0 });
  };
  function a(n, i, l, m, f) {
    for (var u = n._values, o = n._index, s = n._ptr, p = s[i], d = s[i + 1]; p < d; p++) {
      var g = o[p];
      l[g] = f, m[g] = u[p];
    }
  }
});
var Au = "conj", up = ["typed"], _a = _(Au, up, (r) => {
  var { typed: e } = r;
  return e(Au, { "number | BigNumber | Fraction": (t) => t, Complex: (t) => t.conjugate(), "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
var wu = "im", sp = ["typed"], Ta = _(wu, sp, (r) => {
  var { typed: e } = r;
  return e(wu, { number: () => 0, "BigNumber | Fraction": (t) => t.mul(0), Complex: (t) => t.im, "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
var Eu = "re", fp = ["typed"], Ia = _(Eu, fp, (r) => {
  var { typed: e } = r;
  return e(Eu, { "number | BigNumber | Fraction": (t) => t, Complex: (t) => t.re, "Array | Matrix": e.referToSelf((t) => (a) => Or(a, t)) });
});
var Cu = "concat", cp = ["typed", "matrix", "isInteger"], za = _(Cu, cp, (r) => {
  var { typed: e, matrix: t, isInteger: a } = r;
  return e(Cu, { "...Array | Matrix | number | BigNumber": function(i) {
    var l, m = i.length, f = -1, u, o = false, s = [];
    for (l = 0; l < m; l++) {
      var p = i[l];
      if (yr(p) && (o = true), Fr(p) || Cr(p)) {
        if (l !== m - 1)
          throw new Error("Dimension must be specified as last argument");
        if (u = f, f = p.valueOf(), !a(f))
          throw new TypeError("Integer number expected for dimension");
        if (f < 0 || l > 0 && f > u)
          throw new be(f, u + 1);
      } else {
        var d = hr(p).valueOf(), g = br(d);
        if (s[l] = d, u = f, f = g.length - 1, l > 0 && f !== u)
          throw new vr(u + 1, f + 1);
      }
    }
    if (s.length === 0)
      throw new SyntaxError("At least one matrix expected");
    for (var c = s.shift(); s.length; )
      c = Pn(c, s.shift(), f);
    return o ? t(c) : c;
  }, "...string": function(i) {
    return i.join("");
  } });
});
var Fu = "column", lp = ["typed", "Index", "matrix", "range"], Oa = _(Fu, lp, (r) => {
  var { typed: e, Index: t, matrix: a, range: n } = r;
  return e(Fu, { "Matrix, number": i, "Array, number": function(m, f) {
    return i(a(hr(m)), f).valueOf();
  } });
  function i(l, m) {
    if (l.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    Nr(m, l.size()[1]);
    var f = n(0, l.size()[0]), u = new t(f, m), o = l.subset(u);
    return yr(o) ? o : a([[o]]);
  }
});
var bu = "diag", pp = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], Pa = _(bu, pp, (r) => {
  var { typed: e, matrix: t, DenseMatrix: a, SparseMatrix: n } = r;
  return e(bu, { Array: function(u) {
    return i(u, 0, br(u), null);
  }, "Array, number": function(u, o) {
    return i(u, o, br(u), null);
  }, "Array, BigNumber": function(u, o) {
    return i(u, o.toNumber(), br(u), null);
  }, "Array, string": function(u, o) {
    return i(u, 0, br(u), o);
  }, "Array, number, string": function(u, o, s) {
    return i(u, o, br(u), s);
  }, "Array, BigNumber, string": function(u, o, s) {
    return i(u, o.toNumber(), br(u), s);
  }, Matrix: function(u) {
    return i(u, 0, u.size(), u.storage());
  }, "Matrix, number": function(u, o) {
    return i(u, o, u.size(), u.storage());
  }, "Matrix, BigNumber": function(u, o) {
    return i(u, o.toNumber(), u.size(), u.storage());
  }, "Matrix, string": function(u, o) {
    return i(u, 0, u.size(), o);
  }, "Matrix, number, string": function(u, o, s) {
    return i(u, o, u.size(), s);
  }, "Matrix, BigNumber, string": function(u, o, s) {
    return i(u, o.toNumber(), u.size(), s);
  } });
  function i(f, u, o, s) {
    if (!dr(u))
      throw new TypeError("Second parameter in function diag must be an integer");
    var p = u > 0 ? u : 0, d = u < 0 ? -u : 0;
    switch (o.length) {
      case 1:
        return l(f, u, s, o[0], d, p);
      case 2:
        return m(f, u, s, o, d, p);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function l(f, u, o, s, p, d) {
    var g = [s + p, s + d];
    if (o && o !== "sparse" && o !== "dense")
      throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var c = o === "sparse" ? n.diagonal(g, f, u) : a.diagonal(g, f, u);
    return o !== null ? c : c.valueOf();
  }
  function m(f, u, o, s, p, d) {
    if (yr(f)) {
      var g = f.diagonal(u);
      return o !== null ? o !== g.storage() ? t(g, o) : g : g.valueOf();
    }
    for (var c = Math.min(s[0] - p, s[1] - d), v = [], h = 0; h < c; h++)
      v[h] = f[h + p][h + d];
    return o !== null ? t(v) : v;
  }
});
var Mu = "flatten", mp = ["typed", "matrix"], qa = _(Mu, mp, (r) => {
  var { typed: e, matrix: t } = r;
  return e(Mu, { Array: function(n) {
    return Oe(n);
  }, Matrix: function(n) {
    var i = Oe(n.toArray());
    return t(i);
  } });
});
var Su = "getMatrixDataType", vp = ["typed"], Ra = _(Su, vp, (r) => {
  var { typed: e } = r;
  return e(Su, { Array: function(a) {
    return Pe(a, Zr);
  }, Matrix: function(a) {
    return a.getDataType();
  } });
});
var Nu = "identity", hp = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Ua = _(Nu, hp, (r) => {
  var { typed: e, config: t, matrix: a, BigNumber: n, DenseMatrix: i, SparseMatrix: l } = r;
  return e(Nu, { "": function() {
    return t.matrix === "Matrix" ? a([]) : [];
  }, string: function(o) {
    return a(o);
  }, "number | BigNumber": function(o) {
    return f(o, o, t.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(o, s) {
    return f(o, o, s);
  }, "number | BigNumber, number | BigNumber": function(o, s) {
    return f(o, s, t.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(o, s, p) {
    return f(o, s, p);
  }, Array: function(o) {
    return m(o);
  }, "Array, string": function(o, s) {
    return m(o, s);
  }, Matrix: function(o) {
    return m(o.valueOf(), o.storage());
  }, "Matrix, string": function(o, s) {
    return m(o.valueOf(), s);
  } });
  function m(u, o) {
    switch (u.length) {
      case 0:
        return o ? a(o) : [];
      case 1:
        return f(u[0], u[0], o);
      case 2:
        return f(u[0], u[1], o);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function f(u, o, s) {
    var p = Cr(u) || Cr(o) ? n : null;
    if (Cr(u) && (u = u.toNumber()), Cr(o) && (o = o.toNumber()), !dr(u) || u < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!dr(o) || o < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var d = p ? new n(1) : 1, g = p ? new p(0) : 0, c = [u, o];
    if (s) {
      if (s === "sparse")
        return l.diagonal(c, d, 0, g);
      if (s === "dense")
        return i.diagonal(c, d, 0, g);
      throw new TypeError('Unknown matrix type "'.concat(s, '"'));
    }
    for (var v = Je([], c, g), h = u < o ? u : o, A = 0; A < h; A++)
      v[A][A] = d;
    return v;
  }
});
var Bu = "kron", dp = ["typed", "matrix", "multiplyScalar"], La = _(Bu, dp, (r) => {
  var { typed: e, matrix: t, multiplyScalar: a } = r;
  return e(Bu, { "Matrix, Matrix": function(l, m) {
    return t(n(l.toArray(), m.toArray()));
  }, "Matrix, Array": function(l, m) {
    return t(n(l.toArray(), m));
  }, "Array, Matrix": function(l, m) {
    return t(n(l, m.toArray()));
  }, "Array, Array": n });
  function n(i, l) {
    if (br(i).length === 1 && (i = [i]), br(l).length === 1 && (l = [l]), br(i).length > 2 || br(l).length > 2)
      throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(i.length) + ", y = " + JSON.stringify(l.length) + ")");
    var m = [], f = [];
    return i.map(function(u) {
      return l.map(function(o) {
        return f = [], m.push(f), u.map(function(s) {
          return o.map(function(p) {
            return f.push(a(s, p));
          });
        });
      });
    }) && m;
  }
});
function jt() {
  throw new Error('No "bignumber" implementation available');
}
function _u() {
  throw new Error('No "fraction" implementation available');
}
function rn() {
  throw new Error('No "matrix" implementation available');
}
var Tu = "range", gp = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], Za = _(Tu, gp, (r) => {
  var { typed: e, config: t, matrix: a, bignumber: n, smaller: i, smallerEq: l, larger: m, largerEq: f, add: u, isPositive: o } = r;
  return e(Tu, { string: p, "string, boolean": p, "number, number": function(v, h) {
    return s(d(v, h, 1, false));
  }, "number, number, number": function(v, h, A) {
    return s(d(v, h, A, false));
  }, "number, number, boolean": function(v, h, A) {
    return s(d(v, h, 1, A));
  }, "number, number, number, boolean": function(v, h, A, x) {
    return s(d(v, h, A, x));
  }, "BigNumber, BigNumber": function(v, h) {
    var A = v.constructor;
    return s(d(v, h, new A(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(v, h, A) {
    return s(d(v, h, A, false));
  }, "BigNumber, BigNumber, boolean": function(v, h, A) {
    var x = v.constructor;
    return s(d(v, h, new x(1), A));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(v, h, A, x) {
    return s(d(v, h, A, x));
  }, "Unit, Unit, Unit": function(v, h, A) {
    return s(d(v, h, A, false));
  }, "Unit, Unit, Unit, boolean": function(v, h, A, x) {
    return s(d(v, h, A, x));
  } });
  function s(c) {
    return t.matrix === "Matrix" ? a ? a(c) : rn() : c;
  }
  function p(c, v) {
    var h = g(c);
    if (!h)
      throw new SyntaxError('String "' + c + '" is no valid range');
    return t.number === "BigNumber" ? (n === void 0 && jt(), s(d(n(h.start), n(h.end), n(h.step)))) : s(d(h.start, h.end, h.step, v));
  }
  function d(c, v, h, A) {
    for (var x = [], E = o(h) ? A ? l : i : A ? f : m, w = c; E(w, v); )
      x.push(w), w = u(w, h);
    return x;
  }
  function g(c) {
    var v = c.split(":"), h = v.map(function(x) {
      return Number(x);
    }), A = h.some(function(x) {
      return isNaN(x);
    });
    if (A)
      return null;
    switch (h.length) {
      case 2:
        return { start: h[0], end: h[1], step: 1 };
      case 3:
        return { start: h[0], end: h[2], step: h[1] };
      default:
        return null;
    }
  }
});
var Iu = "reshape", Dp = ["typed", "isInteger", "matrix"], Va = _(Iu, Dp, (r) => {
  var { typed: e, isInteger: t } = r;
  return e(Iu, { "Matrix, Array": function(n, i) {
    return n.reshape(i, true);
  }, "Array, Array": function(n, i) {
    return i.forEach(function(l) {
      if (!t(l))
        throw new TypeError("Invalid size for dimension: " + l);
    }), ht(n, i);
  } });
});
var zu = "size", xp = ["typed", "config", "?matrix"], Qa = _(zu, xp, (r) => {
  var { typed: e, config: t, matrix: a } = r;
  return e(zu, { Matrix: function(i) {
    return i.create(i.size());
  }, Array: br, string: function(i) {
    return t.matrix === "Array" ? [i.length] : a([i.length]);
  }, "number | Complex | BigNumber | Unit | boolean | null": function(i) {
    return t.matrix === "Array" ? [] : a ? a([]) : rn();
  } });
});
var Ou = "subset", yp = ["typed", "matrix", "zeros", "add"], Ga = _(Ou, yp, (r) => {
  var { typed: e, matrix: t, zeros: a, add: n } = r;
  return e(Ou, { "Matrix, Index": function(m, f) {
    return $e(f) ? t() : (vt(m, f), m.subset(f));
  }, "Array, Index": e.referTo("Matrix, Index", function(l) {
    return function(m, f) {
      var u = l(t(m), f);
      return f.isScalar() ? u : u.valueOf();
    };
  }), "Object, Index": wp, "string, Index": Ap, "Matrix, Index, any, any": function(m, f, u, o) {
    return $e(f) ? m : (vt(m, f), m.clone().subset(f, i(u, f), o));
  }, "Array, Index, any, any": e.referTo("Matrix, Index, any, any", function(l) {
    return function(m, f, u, o) {
      var s = l(t(m), f, u, o);
      return s.isMatrix ? s.valueOf() : s;
    };
  }), "Array, Index, any": e.referTo("Matrix, Index, any, any", function(l) {
    return function(m, f, u) {
      return l(t(m), f, u, void 0).valueOf();
    };
  }), "Matrix, Index, any": e.referTo("Matrix, Index, any, any", function(l) {
    return function(m, f, u) {
      return l(m, f, u, void 0);
    };
  }), "string, Index, string": Pu, "string, Index, string, string": Pu, "Object, Index, any": Ep });
  function i(l, m) {
    if (typeof l == "string")
      throw new Error("can't boradcast a string");
    if (m._isScalar)
      return l;
    var f = m.size();
    if (f.every((u) => u > 0))
      try {
        return n(l, a(f));
      } catch (u) {
        return l;
      }
    else
      return l;
  }
});
function Ap(r, e) {
  if (!ze(e))
    throw new TypeError("Index expected");
  if ($e(e))
    return "";
  if (vt(Array.from(r), e), e.size().length !== 1)
    throw new vr(e.size().length, 1);
  var t = r.length;
  Nr(e.min()[0], t), Nr(e.max()[0], t);
  var a = e.dimension(0), n = "";
  return a.forEach(function(i) {
    n += r.charAt(i);
  }), n;
}
function Pu(r, e, t, a) {
  if (!e || e.isIndex !== true)
    throw new TypeError("Index expected");
  if ($e(e))
    return r;
  if (vt(Array.from(r), e), e.size().length !== 1)
    throw new vr(e.size().length, 1);
  if (a !== void 0) {
    if (typeof a != "string" || a.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    a = " ";
  var n = e.dimension(0), i = n.size()[0];
  if (i !== t.length)
    throw new vr(n.size()[0], t.length);
  var l = r.length;
  Nr(e.min()[0]), Nr(e.max()[0]);
  for (var m = [], f = 0; f < l; f++)
    m[f] = r.charAt(f);
  if (n.forEach(function(s, p) {
    m[s] = t.charAt(p[0]);
  }), m.length > l)
    for (var u = l - 1, o = m.length; u < o; u++)
      m[u] || (m[u] = a);
  return m.join("");
}
function wp(r, e) {
  if (!$e(e)) {
    if (e.size().length !== 1)
      throw new vr(e.size(), 1);
    var t = e.dimension(0);
    if (typeof t != "string")
      throw new TypeError("String expected as index to retrieve an object property");
    return Pt(r, t);
  }
}
function Ep(r, e, t) {
  if ($e(e))
    return r;
  if (e.size().length !== 1)
    throw new vr(e.size(), 1);
  var a = e.dimension(0);
  if (typeof a != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var n = hr(r);
  return qt(n, a, t), n;
}
var qu = "transpose", Cp = ["typed", "matrix"], Ya = _(qu, Cp, (r) => {
  var { typed: e, matrix: t } = r;
  return e(qu, { Array: (l) => a(t(l)).valueOf(), Matrix: a, any: hr });
  function a(l) {
    var m = l.size(), f;
    switch (m.length) {
      case 1:
        f = l.clone();
        break;
      case 2:
        {
          var u = m[0], o = m[1];
          if (o === 0)
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Sr(m) + ")");
          switch (l.storage()) {
            case "dense":
              f = n(l, u, o);
              break;
            case "sparse":
              f = i(l, u, o);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Sr(m) + ")");
    }
    return f;
  }
  function n(l, m, f) {
    for (var u = l._data, o = [], s, p = 0; p < f; p++) {
      s = o[p] = [];
      for (var d = 0; d < m; d++)
        s[d] = hr(u[d][p]);
    }
    return l.createDenseMatrix({ data: o, size: [f, m], datatype: l._datatype });
  }
  function i(l, m, f) {
    for (var u = l._values, o = l._index, s = l._ptr, p = u ? [] : void 0, d = [], g = [], c = [], v = 0; v < m; v++)
      c[v] = 0;
    var h, A, x;
    for (h = 0, A = o.length; h < A; h++)
      c[o[h]]++;
    for (var E = 0, w = 0; w < m; w++)
      g.push(E), E += c[w], c[w] = g[w];
    for (g.push(E), x = 0; x < f; x++)
      for (var D = s[x], b = s[x + 1], F = D; F < b; F++) {
        var y = c[o[F]]++;
        d[y] = x, u && (p[y] = hr(u[F]));
      }
    return l.createSparseMatrix({ values: p, index: d, ptr: g, size: [f, m], datatype: l._datatype });
  }
});
var Ru = "ctranspose", Fp = ["typed", "transpose", "conj"], $a = _(Ru, Fp, (r) => {
  var { typed: e, transpose: t, conj: a } = r;
  return e(Ru, { any: function(i) {
    return a(t(i));
  } });
});
var Uu = "zeros", bp = ["typed", "config", "matrix", "BigNumber"], Ja = _(Uu, bp, (r) => {
  var { typed: e, config: t, matrix: a, BigNumber: n } = r;
  return e(Uu, { "": function() {
    return t.matrix === "Array" ? i([]) : i([], "default");
  }, "...number | BigNumber | string": function(u) {
    var o = u[u.length - 1];
    if (typeof o == "string") {
      var s = u.pop();
      return i(u, s);
    } else
      return t.matrix === "Array" ? i(u) : i(u, "default");
  }, Array: i, Matrix: function(u) {
    var o = u.storage();
    return i(u.valueOf(), o);
  }, "Array | Matrix, string": function(u, o) {
    return i(u.valueOf(), o);
  } });
  function i(f, u) {
    var o = l(f), s = o ? new n(0) : 0;
    if (m(f), u) {
      var p = a(u);
      return f.length > 0 ? p.resize(f, s) : p;
    } else {
      var d = [];
      return f.length > 0 ? Je(d, f, s) : d;
    }
  }
  function l(f) {
    var u = false;
    return f.forEach(function(o, s, p) {
      Cr(o) && (u = true, p[s] = o.toNumber());
    }), u;
  }
  function m(f) {
    f.forEach(function(u) {
      if (typeof u != "number" || !dr(u) || u < 0)
        throw new Error("Parameters in function zeros must be positive integers");
    });
  }
});
var Mp = "numeric", Sp = ["number", "?bignumber", "?fraction"], Xa = _(Mp, Sp, (r) => {
  var { number: e, bignumber: t, fraction: a } = r, n = { string: true, number: true, BigNumber: true, Fraction: true }, i = { number: (l) => e(l), BigNumber: t ? (l) => t(l) : jt, Fraction: a ? (l) => a(l) : _u };
  return function(m) {
    var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", u = arguments.length > 2 ? arguments[2] : void 0;
    if (u !== void 0)
      throw new SyntaxError("numeric() takes one or two arguments");
    var o = Zr(m);
    if (!(o in n))
      throw new TypeError("Cannot convert " + m + ' of type "' + o + '"; valid input types are ' + Object.keys(n).join(", "));
    if (!(f in i))
      throw new TypeError("Cannot convert " + m + ' to type "' + f + '"; valid output types are ' + Object.keys(i).join(", "));
    return f === o ? m : i[f](m);
  };
});
var Lu = "divideScalar", Np = ["typed", "numeric"], Ka = _(Lu, Np, (r) => {
  var { typed: e, numeric: t } = r;
  return e(Lu, { "number, number": function(n, i) {
    return n / i;
  }, "Complex, Complex": function(n, i) {
    return n.div(i);
  }, "BigNumber, BigNumber": function(n, i) {
    return n.div(i);
  }, "Fraction, Fraction": function(n, i) {
    return n.div(i);
  }, "Unit, number | Complex | Fraction | BigNumber | Unit": (a, n) => a.divide(n), "number | Fraction | Complex | BigNumber, Unit": (a, n) => n.divideInto(a) });
});
var Zu = "pow", Bp = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], Wa = _(Zu, Bp, (r) => {
  var { typed: e, config: t, identity: a, multiply: n, matrix: i, inv: l, number: m, fraction: f, Complex: u } = r;
  return e(Zu, { "number, number": o, "Complex, Complex": function(g, c) {
    return g.pow(c);
  }, "BigNumber, BigNumber": function(g, c) {
    return c.isInteger() || g >= 0 || t.predictable ? g.pow(c) : new u(g.toNumber(), 0).pow(c.toNumber(), 0);
  }, "Fraction, Fraction": function(g, c) {
    var v = g.pow(c);
    if (v != null)
      return v;
    if (t.predictable)
      throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return o(g.valueOf(), c.valueOf());
  }, "Array, number": s, "Array, BigNumber": function(g, c) {
    return s(g, c.toNumber());
  }, "Matrix, number": p, "Matrix, BigNumber": function(g, c) {
    return p(g, c.toNumber());
  }, "Unit, number | BigNumber": function(g, c) {
    return g.pow(c);
  } });
  function o(d, g) {
    if (t.predictable && !dr(g) && d < 0)
      try {
        var c = f(g), v = m(c);
        if ((g === v || Math.abs((g - v) / g) < 1e-14) && c.d % 2 === 1)
          return (c.n % 2 === 0 ? 1 : -1) * Math.pow(-d, g);
      } catch (h) {
      }
    return t.predictable && (d < -1 && g === 1 / 0 || d > -1 && d < 0 && g === -1 / 0) ? NaN : dr(g) || d >= 0 || t.predictable ? fa(d, g) : d * d < 1 && g === 1 / 0 || d * d > 1 && g === -1 / 0 ? 0 : new u(d, 0).pow(g, 0);
  }
  function s(d, g) {
    if (!dr(g))
      throw new TypeError("For A^b, b must be an integer (value is " + g + ")");
    var c = br(d);
    if (c.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + c.length + " dimensions)");
    if (c[0] !== c[1])
      throw new Error("For A^b, A must be square (size is " + c[0] + "x" + c[1] + ")");
    if (g < 0)
      try {
        return s(l(d), -g);
      } catch (A) {
        throw A.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + g + ")") : A;
      }
    for (var v = a(c[0]).valueOf(), h = d; g >= 1; )
      (g & 1) === 1 && (v = n(h, v)), g >>= 1, h = n(h, h);
    return v;
  }
  function p(d, g) {
    return i(s(d.valueOf(), g));
  }
});
function Ze(r) {
  var { DenseMatrix: e } = r;
  return function(a, n, i) {
    var l = a.size();
    if (l.length !== 2)
      throw new RangeError("Matrix must be two dimensional (size: " + Sr(l) + ")");
    var m = l[0], f = l[1];
    if (m !== f)
      throw new RangeError("Matrix must be square (size: " + Sr(l) + ")");
    var u = [];
    if (yr(n)) {
      var o = n.size(), s = n._data;
      if (o.length === 1) {
        if (o[0] !== m)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var p = 0; p < m; p++)
          u[p] = [s[p]];
        return new e({ data: u, size: [m, 1], datatype: n._datatype });
      }
      if (o.length === 2) {
        if (o[0] !== m || o[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (Ye(n)) {
          if (i) {
            u = [];
            for (var d = 0; d < m; d++)
              u[d] = [s[d][0]];
            return new e({ data: u, size: [m, 1], datatype: n._datatype });
          }
          return n;
        }
        if (Ce(n)) {
          for (var g = 0; g < m; g++)
            u[g] = [0];
          for (var c = n._values, v = n._index, h = n._ptr, A = h[1], x = h[0]; x < A; x++) {
            var E = v[x];
            u[E][0] = c[x];
          }
          return new e({ data: u, size: [m, 1], datatype: n._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Ar(n)) {
      var w = br(n);
      if (w.length === 1) {
        if (w[0] !== m)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var D = 0; D < m; D++)
          u[D] = [n[D]];
        return new e({ data: u, size: [m, 1] });
      }
      if (w.length === 2) {
        if (w[0] !== m || w[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var b = 0; b < m; b++)
          u[b] = [n[b][0]];
        return new e({ data: u, size: [m, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var Vu = "lsolve", _p = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Ha = _(Vu, _p, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtractScalar: i, equalScalar: l, DenseMatrix: m } = r, f = Ze({ DenseMatrix: m });
  return e(Vu, { "SparseMatrix, Array | Matrix": function(p, d) {
    return o(p, d);
  }, "DenseMatrix, Array | Matrix": function(p, d) {
    return u(p, d);
  }, "Array, Array | Matrix": function(p, d) {
    var g = t(p), c = u(g, d);
    return c.valueOf();
  } });
  function u(s, p) {
    p = f(s, p, true);
    for (var d = p._data, g = s._size[0], c = s._size[1], v = [], h = s._data, A = 0; A < c; A++) {
      var x = d[A][0] || 0, E = void 0;
      if (l(x, 0))
        E = 0;
      else {
        var w = h[A][A];
        if (l(w, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        E = a(x, w);
        for (var D = A + 1; D < g; D++)
          d[D] = [i(d[D][0] || 0, n(E, h[D][A]))];
      }
      v[A] = [E];
    }
    return new m({ data: v, size: [g, 1] });
  }
  function o(s, p) {
    p = f(s, p, true);
    for (var d = p._data, g = s._size[0], c = s._size[1], v = s._values, h = s._index, A = s._ptr, x = [], E = 0; E < c; E++) {
      var w = d[E][0] || 0;
      if (l(w, 0))
        x[E] = [0];
      else {
        for (var D = 0, b = [], F = [], y = A[E], C = A[E + 1], M = y; M < C; M++) {
          var S = h[M];
          S === E ? D = v[M] : S > E && (b.push(v[M]), F.push(S));
        }
        if (l(D, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = a(w, D), I = 0, P = F.length; I < P; I++) {
          var B = F[I];
          d[B] = [i(d[B][0] || 0, n(O, b[I]))];
        }
        x[E] = [O];
      }
    }
    return new m({ data: x, size: [g, 1] });
  }
});
var Qu = "usolve", Tp = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], ka = _(Qu, Tp, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtractScalar: i, equalScalar: l, DenseMatrix: m } = r, f = Ze({ DenseMatrix: m });
  return e(Qu, { "SparseMatrix, Array | Matrix": function(p, d) {
    return o(p, d);
  }, "DenseMatrix, Array | Matrix": function(p, d) {
    return u(p, d);
  }, "Array, Array | Matrix": function(p, d) {
    var g = t(p), c = u(g, d);
    return c.valueOf();
  } });
  function u(s, p) {
    p = f(s, p, true);
    for (var d = p._data, g = s._size[0], c = s._size[1], v = [], h = s._data, A = c - 1; A >= 0; A--) {
      var x = d[A][0] || 0, E = void 0;
      if (l(x, 0))
        E = 0;
      else {
        var w = h[A][A];
        if (l(w, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        E = a(x, w);
        for (var D = A - 1; D >= 0; D--)
          d[D] = [i(d[D][0] || 0, n(E, h[D][A]))];
      }
      v[A] = [E];
    }
    return new m({ data: v, size: [g, 1] });
  }
  function o(s, p) {
    p = f(s, p, true);
    for (var d = p._data, g = s._size[0], c = s._size[1], v = s._values, h = s._index, A = s._ptr, x = [], E = c - 1; E >= 0; E--) {
      var w = d[E][0] || 0;
      if (l(w, 0))
        x[E] = [0];
      else {
        for (var D = 0, b = [], F = [], y = A[E], C = A[E + 1], M = C - 1; M >= y; M--) {
          var S = h[M];
          S === E ? D = v[M] : S < E && (b.push(v[M]), F.push(S));
        }
        if (l(D, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = a(w, D), I = 0, P = F.length; I < P; I++) {
          var B = F[I];
          d[B] = [i(d[B][0], n(O, b[I]))];
        }
        x[E] = [O];
      }
    }
    return new m({ data: x, size: [g, 1] });
  }
});
var Gu = "usolveAll", Ip = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], ja = _(Gu, Ip, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtractScalar: i, equalScalar: l, DenseMatrix: m } = r, f = Ze({ DenseMatrix: m });
  return e(Gu, { "SparseMatrix, Array | Matrix": function(p, d) {
    return o(p, d);
  }, "DenseMatrix, Array | Matrix": function(p, d) {
    return u(p, d);
  }, "Array, Array | Matrix": function(p, d) {
    var g = t(p), c = u(g, d);
    return c.map((v) => v.valueOf());
  } });
  function u(s, p) {
    for (var d = [f(s, p, true)._data.map((F) => F[0])], g = s._data, c = s._size[0], v = s._size[1], h = v - 1; h >= 0; h--)
      for (var A = d.length, x = 0; x < A; x++) {
        var E = d[x];
        if (l(g[h][h], 0))
          if (l(E[h], 0)) {
            if (x === 0) {
              var D = [...E];
              D[h] = 1;
              for (var b = h - 1; b >= 0; b--)
                D[b] = i(D[b], g[b][h]);
              d.push(D);
            }
          } else {
            if (x === 0)
              return [];
            d.splice(x, 1), x -= 1, A -= 1;
          }
        else {
          E[h] = a(E[h], g[h][h]);
          for (var w = h - 1; w >= 0; w--)
            E[w] = i(E[w], n(E[h], g[w][h]));
        }
      }
    return d.map((F) => new m({ data: F.map((y) => [y]), size: [c, 1] }));
  }
  function o(s, p) {
    for (var d = [f(s, p, true)._data.map((X) => X[0])], g = s._size[0], c = s._size[1], v = s._values, h = s._index, A = s._ptr, x = c - 1; x >= 0; x--)
      for (var E = d.length, w = 0; w < E; w++) {
        for (var D = d[w], b = [], F = [], y = A[x], C = A[x + 1], M = 0, S = C - 1; S >= y; S--) {
          var O = h[S];
          O === x ? M = v[S] : O < x && (b.push(v[S]), F.push(O));
        }
        if (l(M, 0))
          if (l(D[x], 0)) {
            if (w === 0) {
              var G = [...D];
              G[x] = 1;
              for (var q = 0, T = F.length; q < T; q++) {
                var Z = F[q];
                G[Z] = i(G[Z], b[q]);
              }
              d.push(G);
            }
          } else {
            if (w === 0)
              return [];
            d.splice(w, 1), w -= 1, E -= 1;
          }
        else {
          D[x] = a(D[x], M);
          for (var I = 0, P = F.length; I < P; I++) {
            var B = F[I];
            D[B] = i(D[B], n(D[x], b[I]));
          }
        }
      }
    return d.map((X) => new m({ data: X.map((L) => [L]), size: [g, 1] }));
  }
});
var en = "compare", zp = ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix", "concat"], ri = _(en, zp, (r) => {
  var { typed: e, config: t, equalScalar: a, matrix: n, BigNumber: i, Fraction: l, DenseMatrix: m, concat: f } = r, u = oe({ typed: e }), o = Wt({ typed: e, equalScalar: a }), s = ie({ typed: e, DenseMatrix: m }), p = Hr({ typed: e, matrix: n, concat: f }), d = le({ typed: e });
  return e(en, Op({ typed: e, config: t }), { "boolean, boolean": function(c, v) {
    return c === v ? 0 : c > v ? 1 : -1;
  }, "BigNumber, BigNumber": function(c, v) {
    return ce(c, v, t.epsilon) ? new i(0) : new i(c.cmp(v));
  }, "Fraction, Fraction": function(c, v) {
    return new l(c.compare(v));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, d, p({ SS: o, DS: u, Ss: s }));
}), Op = _(en, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(en, { "number, number": function(n, i) {
    return Kr(n, i, t.epsilon) ? 0 : n > i ? 1 : -1;
  } });
});
var Xe = Bt($u(), 1);
var Ju = "compareNatural", Pp = ["typed", "compare"], ei = _(Ju, Pp, (r) => {
  var { typed: e, compare: t } = r, a = t.signatures["boolean,boolean"];
  return e(Ju, { "any, any": n });
  function n(f, u) {
    var o = Zr(f), s = Zr(u), p;
    if ((o === "number" || o === "BigNumber" || o === "Fraction") && (s === "number" || s === "BigNumber" || s === "Fraction"))
      return p = t(f, u), p.toString() !== "0" ? p > 0 ? 1 : -1 : (0, Xe.default)(o, s);
    var d = ["Array", "DenseMatrix", "SparseMatrix"];
    if (d.includes(o) || d.includes(s))
      return p = i(n, f, u), p !== 0 ? p : (0, Xe.default)(o, s);
    if (o !== s)
      return (0, Xe.default)(o, s);
    if (o === "Complex")
      return qp(f, u);
    if (o === "Unit")
      return f.equalBase(u) ? n(f.value, u.value) : l(n, f.formatUnits(), u.formatUnits());
    if (o === "boolean")
      return a(f, u);
    if (o === "string")
      return (0, Xe.default)(f, u);
    if (o === "Object")
      return m(n, f, u);
    if (o === "null" || o === "undefined")
      return 0;
    throw new TypeError('Unsupported type of value "' + o + '"');
  }
  function i(f, u, o) {
    return Ce(u) && Ce(o) ? l(f, u.toJSON().values, o.toJSON().values) : Ce(u) ? i(f, u.toArray(), o) : Ce(o) ? i(f, u, o.toArray()) : Ye(u) ? i(f, u.toJSON().data, o) : Ye(o) ? i(f, u, o.toJSON().data) : Array.isArray(u) ? Array.isArray(o) ? l(f, u, o) : i(f, u, [o]) : i(f, [u], o);
  }
  function l(f, u, o) {
    for (var s = 0, p = Math.min(u.length, o.length); s < p; s++) {
      var d = f(u[s], o[s]);
      if (d !== 0)
        return d;
    }
    return u.length > o.length ? 1 : u.length < o.length ? -1 : 0;
  }
  function m(f, u, o) {
    var s = Object.keys(u), p = Object.keys(o);
    s.sort(Xe.default), p.sort(Xe.default);
    var d = l(f, s, p);
    if (d !== 0)
      return d;
    for (var g = 0; g < s.length; g++) {
      var c = f(u[s[g]], o[p[g]]);
      if (c !== 0)
        return c;
    }
    return 0;
  }
});
function qp(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}
var tn = "equal", Rp = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], ti = _(tn, Rp, (r) => {
  var { typed: e, matrix: t, equalScalar: a, DenseMatrix: n, concat: i } = r, l = oe({ typed: e }), m = Ee({ typed: e, DenseMatrix: n }), f = ie({ typed: e, DenseMatrix: n }), u = Hr({ typed: e, matrix: t, concat: i });
  return e(tn, Up({ typed: e, equalScalar: a }), u({ elop: a, SS: m, DS: l, Ss: f }));
}), Up = _(tn, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: t } = r;
  return e(tn, { "any, any": function(n, i) {
    return n === null ? i === null : i === null ? n === null : n === void 0 ? i === void 0 : i === void 0 ? n === void 0 : t(n, i);
  } });
});
var nn = "smaller", Lp = ["typed", "config", "matrix", "DenseMatrix", "concat"], ni = _(nn, Lp, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, l = oe({ typed: e }), m = Ee({ typed: e, DenseMatrix: n }), f = ie({ typed: e, DenseMatrix: n }), u = Hr({ typed: e, matrix: a, concat: i }), o = le({ typed: e });
  return e(nn, Zp({ typed: e, config: t }), { "boolean, boolean": (s, p) => s < p, "BigNumber, BigNumber": function(p, d) {
    return p.lt(d) && !ce(p, d, t.epsilon);
  }, "Fraction, Fraction": (s, p) => s.compare(p) === -1, "Complex, Complex": function(p, d) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: m, DS: l, Ss: f }));
}), Zp = _(nn, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(nn, { "number, number": function(n, i) {
    return n < i && !Kr(n, i, t.epsilon);
  } });
});
var an = "smallerEq", Vp = ["typed", "config", "matrix", "DenseMatrix", "concat"], ai = _(an, Vp, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, l = oe({ typed: e }), m = Ee({ typed: e, DenseMatrix: n }), f = ie({ typed: e, DenseMatrix: n }), u = Hr({ typed: e, matrix: a, concat: i }), o = le({ typed: e });
  return e(an, Qp({ typed: e, config: t }), { "boolean, boolean": (s, p) => s <= p, "BigNumber, BigNumber": function(p, d) {
    return p.lte(d) || ce(p, d, t.epsilon);
  }, "Fraction, Fraction": (s, p) => s.compare(p) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: m, DS: l, Ss: f }));
}), Qp = _(an, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(an, { "number, number": function(n, i) {
    return n <= i || Kr(n, i, t.epsilon);
  } });
});
var on = "larger", Gp = ["typed", "config", "matrix", "DenseMatrix", "concat"], ii = _(on, Gp, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, l = oe({ typed: e }), m = Ee({ typed: e, DenseMatrix: n }), f = ie({ typed: e, DenseMatrix: n }), u = Hr({ typed: e, matrix: a, concat: i }), o = le({ typed: e });
  return e(on, Yp({ typed: e, config: t }), { "boolean, boolean": (s, p) => s > p, "BigNumber, BigNumber": function(p, d) {
    return p.gt(d) && !ce(p, d, t.epsilon);
  }, "Fraction, Fraction": (s, p) => s.compare(p) === 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: m, DS: l, Ss: f }));
}), Yp = _(on, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(on, { "number, number": function(n, i) {
    return n > i && !Kr(n, i, t.epsilon);
  } });
});
var un = "largerEq", $p = ["typed", "config", "matrix", "DenseMatrix", "concat"], oi = _(un, $p, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, l = oe({ typed: e }), m = Ee({ typed: e, DenseMatrix: n }), f = ie({ typed: e, DenseMatrix: n }), u = Hr({ typed: e, matrix: a, concat: i }), o = le({ typed: e });
  return e(un, Jp({ typed: e, config: t }), { "boolean, boolean": (s, p) => s >= p, "BigNumber, BigNumber": function(p, d) {
    return p.gte(d) || ce(p, d, t.epsilon);
  }, "Fraction, Fraction": (s, p) => s.compare(p) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: m, DS: l, Ss: f }));
}), Jp = _(un, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(un, { "number, number": function(n, i) {
    return n >= i || Kr(n, i, t.epsilon);
  } });
});
var Xp = "ImmutableDenseMatrix", Kp = ["smaller", "DenseMatrix"], ui = _(Xp, Kp, (r) => {
  var { smaller: e, DenseMatrix: t } = r;
  function a(n, i) {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (i && !Gr(i))
      throw new Error("Invalid datatype: " + i);
    if (yr(n) || Ar(n)) {
      var l = new t(n, i);
      this._data = l._data, this._size = l._size, this._datatype = l._datatype, this._min = null, this._max = null;
    } else if (n && Ar(n.data) && Ar(n.size))
      this._data = n.data, this._size = n.size, this._datatype = n.datatype, this._min = typeof n.min != "undefined" ? n.min : null, this._max = typeof n.max != "undefined" ? n.max : null;
    else {
      if (n)
        throw new TypeError("Unsupported type of data (" + Zr(n) + ")");
      this._data = [], this._size = [0], this._datatype = i, this._min = null, this._max = null;
    }
  }
  return a.prototype = new t(), a.prototype.type = "ImmutableDenseMatrix", a.prototype.isImmutableDenseMatrix = true, a.prototype.subset = function(n) {
    switch (arguments.length) {
      case 1: {
        var i = t.prototype.subset.call(this, n);
        return yr(i) ? new a({ data: i._data, size: i._size, datatype: i._datatype }) : i;
      }
      case 2:
      case 3:
        throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, a.prototype.set = function() {
    throw new Error("Cannot invoke set on an Immutable Matrix instance");
  }, a.prototype.resize = function() {
    throw new Error("Cannot invoke resize on an Immutable Matrix instance");
  }, a.prototype.reshape = function() {
    throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
  }, a.prototype.clone = function() {
    return new a({ data: hr(this._data), size: hr(this._size), datatype: this._datatype });
  }, a.prototype.toJSON = function() {
    return { mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, a.fromJSON = function(n) {
    return new a(n);
  }, a.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, a.prototype.min = function() {
    if (this._min === null) {
      var n = null;
      this.forEach(function(i) {
        (n === null || e(i, n)) && (n = i);
      }), this._min = n !== null ? n : void 0;
    }
    return this._min;
  }, a.prototype.max = function() {
    if (this._max === null) {
      var n = null;
      this.forEach(function(i) {
        (n === null || e(n, i)) && (n = i);
      }), this._max = n !== null ? n : void 0;
    }
    return this._max;
  }, a;
}, { isClass: true });
var Wp = "Index", Hp = ["ImmutableDenseMatrix", "getMatrixDataType"], si = _(Wp, Hp, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: t } = r;
  function a(i) {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var l = 0, m = arguments.length; l < m; l++) {
      var f = arguments[l], u = Ar(f), o = yr(f), s = null;
      if (Tt(f))
        this._dimensions.push(f), this._isScalar = false;
      else if (u || o) {
        var p = void 0;
        t(f) === "boolean" ? (u && (p = n(Xu(f).valueOf())), o && (p = n(Xu(f._data).valueOf())), s = f.valueOf().length) : p = n(f.valueOf()), this._dimensions.push(p);
        var d = p.size();
        (d.length !== 1 || d[0] !== 1 || s !== null) && (this._isScalar = false);
      } else if (typeof f == "number")
        this._dimensions.push(n([f]));
      else if (typeof f == "string")
        this._dimensions.push(f);
      else
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      this._sourceSize.push(s);
    }
  }
  a.prototype.type = "Index", a.prototype.isIndex = true;
  function n(i) {
    for (var l = 0, m = i.length; l < m; l++)
      if (typeof i[l] != "number" || !dr(i[l]))
        throw new TypeError("Index parameters must be positive integer numbers");
    return new e(i);
  }
  return a.prototype.clone = function() {
    var i = new a();
    return i._dimensions = hr(this._dimensions), i._isScalar = this._isScalar, i._sourceSize = this._sourceSize, i;
  }, a.create = function(i) {
    var l = new a();
    return a.apply(l, i), l;
  }, a.prototype.size = function() {
    for (var i = [], l = 0, m = this._dimensions.length; l < m; l++) {
      var f = this._dimensions[l];
      i[l] = typeof f == "string" ? 1 : f.size()[0];
    }
    return i;
  }, a.prototype.max = function() {
    for (var i = [], l = 0, m = this._dimensions.length; l < m; l++) {
      var f = this._dimensions[l];
      i[l] = typeof f == "string" ? f : f.max();
    }
    return i;
  }, a.prototype.min = function() {
    for (var i = [], l = 0, m = this._dimensions.length; l < m; l++) {
      var f = this._dimensions[l];
      i[l] = typeof f == "string" ? f : f.min();
    }
    return i;
  }, a.prototype.forEach = function(i) {
    for (var l = 0, m = this._dimensions.length; l < m; l++)
      i(this._dimensions[l], l, this);
  }, a.prototype.dimension = function(i) {
    return this._dimensions[i] || null;
  }, a.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, a.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, a.prototype.isScalar = function() {
    return this._isScalar;
  }, a.prototype.toArray = function() {
    for (var i = [], l = 0, m = this._dimensions.length; l < m; l++) {
      var f = this._dimensions[l];
      i.push(typeof f == "string" ? f : f.toArray());
    }
    return i;
  }, a.prototype.valueOf = a.prototype.toArray, a.prototype.toString = function() {
    for (var i = [], l = 0, m = this._dimensions.length; l < m; l++) {
      var f = this._dimensions[l];
      typeof f == "string" ? i.push(JSON.stringify(f)) : i.push(f.toString());
    }
    return "[" + i.join(", ") + "]";
  }, a.prototype.toJSON = function() {
    return { mathjs: "Index", dimensions: this._dimensions };
  }, a.fromJSON = function(i) {
    return a.create(i.dimensions);
  }, a;
}, { isClass: true });
function Xu(r) {
  var e = [];
  return r.forEach((t, a) => {
    t && e.push(a);
  }), e;
}
var kp = "FibonacciHeap", jp = ["smaller", "larger"], fi = _(kp, jp, (r) => {
  var { smaller: e, larger: t } = r, a = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function n() {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  n.prototype.type = "FibonacciHeap", n.prototype.isFibonacciHeap = true, n.prototype.insert = function(o, s) {
    var p = { key: o, value: s, degree: 0 };
    if (this._minimum) {
      var d = this._minimum;
      p.left = d, p.right = d.right, d.right = p, p.right.left = p, e(o, d.key) && (this._minimum = p);
    } else
      p.left = p, p.right = p, this._minimum = p;
    return this._size++, p;
  }, n.prototype.size = function() {
    return this._size;
  }, n.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, n.prototype.isEmpty = function() {
    return this._size === 0;
  }, n.prototype.extractMinimum = function() {
    var o = this._minimum;
    if (o === null)
      return o;
    for (var s = this._minimum, p = o.degree, d = o.child; p > 0; ) {
      var g = d.right;
      d.left.right = d.right, d.right.left = d.left, d.left = s, d.right = s.right, s.right = d, d.right.left = d, d.parent = null, d = g, p--;
    }
    return o.left.right = o.right, o.right.left = o.left, o === o.right ? s = null : (s = o.right, s = u(s, this._size)), this._size--, this._minimum = s, o;
  }, n.prototype.remove = function(o) {
    this._minimum = i(this._minimum, o, -1), this.extractMinimum();
  };
  function i(o, s, p) {
    s.key = p;
    var d = s.parent;
    return d && e(s.key, d.key) && (l(o, s, d), m(o, d)), e(s.key, o.key) && (o = s), o;
  }
  function l(o, s, p) {
    s.left.right = s.right, s.right.left = s.left, p.degree--, p.child === s && (p.child = s.right), p.degree === 0 && (p.child = null), s.left = o, s.right = o.right, o.right = s, s.right.left = s, s.parent = null, s.mark = false;
  }
  function m(o, s) {
    var p = s.parent;
    p && (s.mark ? (l(o, s, p), m(p)) : s.mark = true);
  }
  var f = function(s, p) {
    s.left.right = s.right, s.right.left = s.left, s.parent = p, p.child ? (s.left = p.child, s.right = p.child.right, p.child.right = s, s.right.left = s) : (p.child = s, s.right = s, s.left = s), p.degree++, s.mark = false;
  };
  function u(o, s) {
    var p = Math.floor(Math.log(s) * a) + 1, d = new Array(p), g = 0, c = o;
    if (c)
      for (g++, c = c.right; c !== o; )
        g++, c = c.right;
    for (var v; g > 0; ) {
      for (var h = c.degree, A = c.right; v = d[h], !!v; ) {
        if (t(c.key, v.key)) {
          var x = v;
          v = c, c = x;
        }
        f(v, c), d[h] = null, h++;
      }
      d[h] = c, c = A, g--;
    }
    o = null;
    for (var E = 0; E < p; E++)
      v = d[E], v && (o ? (v.left.right = v.right, v.right.left = v.left, v.left = o, v.right = o.right, o.right = v, v.right.left = v, e(v.key, o.key) && (o = v)) : o = v);
    return o;
  }
  return n;
}, { isClass: true });
var r0 = "Spa", e0 = ["addScalar", "equalScalar", "FibonacciHeap"], ci = _(r0, e0, (r) => {
  var { addScalar: e, equalScalar: t, FibonacciHeap: a } = r;
  function n() {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new a();
  }
  return n.prototype.type = "Spa", n.prototype.isSpa = true, n.prototype.set = function(i, l) {
    if (this._values[i])
      this._values[i].value = l;
    else {
      var m = this._heap.insert(i, l);
      this._values[i] = m;
    }
  }, n.prototype.get = function(i) {
    var l = this._values[i];
    return l ? l.value : 0;
  }, n.prototype.accumulate = function(i, l) {
    var m = this._values[i];
    m ? m.value = e(m.value, l) : (m = this._heap.insert(i, l), this._values[i] = m);
  }, n.prototype.forEach = function(i, l, m) {
    var f = this._heap, u = this._values, o = [], s = f.extractMinimum();
    for (s && o.push(s); s && s.key <= l; )
      s.key >= i && (t(s.value, 0) || m(s.key, s.value, this)), s = f.extractMinimum(), s && o.push(s);
    for (var p = 0; p < o.length; p++) {
      var d = o[p];
      s = f.insert(d.key, d.value), u[s.key] = s;
    }
  }, n.prototype.swap = function(i, l) {
    var m = this._values[i], f = this._values[l];
    if (!m && f)
      m = this._heap.insert(i, f.value), this._heap.remove(f), this._values[i] = m, this._values[l] = void 0;
    else if (m && !f)
      f = this._heap.insert(l, m.value), this._heap.remove(m), this._values[l] = f, this._values[i] = void 0;
    else if (m && f) {
      var u = m.value;
      m.value = f.value, f.value = u;
    }
  }, n;
}, { isClass: true });
var t0 = "atan", n0 = ["typed"], li = _(t0, n0, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(a) {
    return Math.atan(a);
  }, Complex: function(a) {
    return a.atan();
  }, BigNumber: function(a) {
    return a.atan();
  } });
});
var sn = _("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((t) => (a) => {
    if (!a.hasBase(a.constructor.BASE_UNITS.ANGLE))
      throw new TypeError("Unit in function cot is no angle");
    return e.find(t, a.valueType())(a.value);
  }) };
});
var Ku = "cos", a0 = ["typed"], pi = _(Ku, a0, (r) => {
  var { typed: e } = r, t = sn({ typed: e });
  return e(Ku, { number: Math.cos, "Complex | BigNumber": (a) => a.cos() }, t);
});
var Wu = "sin", i0 = ["typed"], mi = _(Wu, i0, (r) => {
  var { typed: e } = r, t = sn({ typed: e });
  return e(Wu, { number: Math.sin, "Complex | BigNumber": (a) => a.sin() }, t);
});
var Hu = "setDifference", o0 = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], vi = _(Hu, o0, (r) => {
  var { typed: e, size: t, subset: a, compareNatural: n, Index: i, DenseMatrix: l } = r;
  return e(Hu, { "Array | Matrix, Array | Matrix": function(f, u) {
    var o;
    if (a(t(f), new i(0)) === 0)
      o = [];
    else {
      if (a(t(u), new i(0)) === 0)
        return Oe(f.toArray());
      var s = zn(Oe(Array.isArray(f) ? f : f.toArray()).sort(n)), p = zn(Oe(Array.isArray(u) ? u : u.toArray()).sort(n));
      o = [];
      for (var d, g = 0; g < s.length; g++) {
        d = false;
        for (var c = 0; c < p.length; c++)
          if (n(s[g].value, p[c].value) === 0 && s[g].identifier === p[c].identifier) {
            d = true;
            break;
          }
        d || o.push(s[g]);
      }
    }
    return Array.isArray(f) && Array.isArray(u) ? On(o) : new l(On(o));
  } });
});
var ku = "add", u0 = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], hi = _(ku, u0, (r) => {
  var { typed: e, matrix: t, addScalar: a, equalScalar: n, DenseMatrix: i, SparseMatrix: l, concat: m } = r, f = Ht({ typed: e }), u = gu({ typed: e, equalScalar: n }), o = kt({ typed: e, DenseMatrix: i }), s = Hr({ typed: e, matrix: t, concat: m });
  return e(ku, { "any, any": a, "any, any, ...any": e.referToSelf((p) => (d, g, c) => {
    for (var v = p(d, g), h = 0; h < c.length; h++)
      v = p(v, c[h]);
    return v;
  }) }, s({ elop: a, DS: f, SS: u, Ss: o }));
});
var ju = "norm", s0 = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], di = _(ju, s0, (r) => {
  var { typed: e, abs: t, add: a, pow: n, conj: i, sqrt: l, multiply: m, equalScalar: f, larger: u, smaller: o, matrix: s, ctranspose: p, eigs: d } = r;
  return e(ju, { number: Math.abs, Complex: function(F) {
    return F.abs();
  }, BigNumber: function(F) {
    return F.abs();
  }, boolean: function(F) {
    return Math.abs(F);
  }, Array: function(F) {
    return D(s(F), 2);
  }, Matrix: function(F) {
    return D(F, 2);
  }, "Array, number | BigNumber | string": function(F, y) {
    return D(s(F), y);
  }, "Matrix, number | BigNumber | string": function(F, y) {
    return D(F, y);
  } });
  function g(b) {
    var F = 0;
    return b.forEach(function(y) {
      var C = t(y);
      u(C, F) && (F = C);
    }, true), F;
  }
  function c(b) {
    var F;
    return b.forEach(function(y) {
      var C = t(y);
      (!F || o(C, F)) && (F = C);
    }, true), F || 0;
  }
  function v(b, F) {
    if (F === Number.POSITIVE_INFINITY || F === "inf")
      return g(b);
    if (F === Number.NEGATIVE_INFINITY || F === "-inf")
      return c(b);
    if (F === "fro")
      return D(b, 2);
    if (typeof F == "number" && !isNaN(F)) {
      if (!f(F, 0)) {
        var y = 0;
        return b.forEach(function(C) {
          y = a(n(t(C), F), y);
        }, true), n(y, 1 / F);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function h(b) {
    var F = 0;
    return b.forEach(function(y, C) {
      F = a(F, m(y, i(y)));
    }), t(l(F));
  }
  function A(b) {
    var F = [], y = 0;
    return b.forEach(function(C, M) {
      var S = M[1], O = a(F[S] || 0, t(C));
      u(O, y) && (y = O), F[S] = O;
    }, true), y;
  }
  function x(b) {
    var F = b.size();
    if (F[0] !== F[1])
      throw new RangeError("Invalid matrix dimensions");
    var y = p(b), C = m(y, b), M = d(C).values.toArray(), S = M[M.length - 1];
    return t(l(S));
  }
  function E(b) {
    var F = [], y = 0;
    return b.forEach(function(C, M) {
      var S = M[0], O = a(F[S] || 0, t(C));
      u(O, y) && (y = O), F[S] = O;
    }, true), y;
  }
  function w(b, F) {
    if (F === 1)
      return A(b);
    if (F === Number.POSITIVE_INFINITY || F === "inf")
      return E(b);
    if (F === "fro")
      return h(b);
    if (F === 2)
      return x(b);
    throw new Error("Unsupported parameter value " + F);
  }
  function D(b, F) {
    var y = b.size();
    if (y.length === 1)
      return v(b, F);
    if (y.length === 2) {
      if (y[0] && y[1])
        return w(b, F);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
});
var rs = "dot", f0 = ["typed", "addScalar", "multiplyScalar", "conj", "size"], gi = _(rs, f0, (r) => {
  var { typed: e, addScalar: t, multiplyScalar: a, conj: n, size: i } = r;
  return e(rs, { "Array | DenseMatrix, Array | DenseMatrix": m, "SparseMatrix, SparseMatrix": f });
  function l(o, s) {
    var p = u(o), d = u(s), g, c;
    if (p.length === 1)
      g = p[0];
    else if (p.length === 2 && p[1] === 1)
      g = p[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
    if (d.length === 1)
      c = d[0];
    else if (d.length === 2 && d[1] === 1)
      c = d[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + d.join(", ") + ")");
    if (g !== c)
      throw new RangeError("Vectors must have equal length (" + g + " != " + c + ")");
    if (g === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return g;
  }
  function m(o, s) {
    var p = l(o, s), d = yr(o) ? o._data : o, g = yr(o) ? o._datatype || o.getDataType() : void 0, c = yr(s) ? s._data : s, v = yr(s) ? s._datatype || s.getDataType() : void 0, h = u(o).length === 2, A = u(s).length === 2, x = t, E = a;
    if (g && v && g === v && typeof g == "string" && g !== "mixed") {
      var w = g;
      x = e.find(t, [w, w]), E = e.find(a, [w, w]);
    }
    if (!h && !A) {
      for (var D = E(n(d[0]), c[0]), b = 1; b < p; b++)
        D = x(D, E(n(d[b]), c[b]));
      return D;
    }
    if (!h && A) {
      for (var F = E(n(d[0]), c[0][0]), y = 1; y < p; y++)
        F = x(F, E(n(d[y]), c[y][0]));
      return F;
    }
    if (h && !A) {
      for (var C = E(n(d[0][0]), c[0]), M = 1; M < p; M++)
        C = x(C, E(n(d[M][0]), c[M]));
      return C;
    }
    if (h && A) {
      for (var S = E(n(d[0][0]), c[0][0]), O = 1; O < p; O++)
        S = x(S, E(n(d[O][0]), c[O][0]));
      return S;
    }
  }
  function f(o, s) {
    l(o, s);
    for (var p = o._index, d = o._values, g = s._index, c = s._values, v = 0, h = t, A = a, x = 0, E = 0; x < p.length && E < g.length; ) {
      var w = p[x], D = g[E];
      if (w < D) {
        x++;
        continue;
      }
      if (w > D) {
        E++;
        continue;
      }
      w === D && (v = h(v, A(d[x], c[E])), x++, E++);
    }
    return v;
  }
  function u(o) {
    return yr(o) ? o.size() : i(o);
  }
});
var es = "index", c0 = ["typed", "Index"], Di = _(es, c0, (r) => {
  var { typed: e, Index: t } = r;
  return e(es, { "...number | string | BigNumber | Range | Array | Matrix": function(n) {
    var i = n.map(function(m) {
      return Cr(m) ? m.toNumber() : Ar(m) || yr(m) ? m.map(function(f) {
        return Cr(f) ? f.toNumber() : f;
      }) : m;
    }), l = new t();
    return t.apply(l, i), l;
  } });
});
var ts = "lup", l0 = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], xi = _(ts, l0, (r) => {
  var { typed: e, matrix: t, abs: a, addScalar: n, divideScalar: i, multiplyScalar: l, subtractScalar: m, larger: f, equalScalar: u, unaryMinus: o, DenseMatrix: s, SparseMatrix: p, Spa: d } = r;
  return e(ts, { DenseMatrix: function(h) {
    return g(h);
  }, SparseMatrix: function(h) {
    return c(h);
  }, Array: function(h) {
    var A = t(h), x = g(A);
    return { L: x.L.valueOf(), U: x.U.valueOf(), p: x.p };
  } });
  function g(v) {
    var h = v._size[0], A = v._size[1], x = Math.min(h, A), E = hr(v._data), w = [], D = [h, x], b = [], F = [x, A], y, C, M, S = [];
    for (y = 0; y < h; y++)
      S[y] = y;
    for (C = 0; C < A; C++) {
      if (C > 0)
        for (y = 0; y < h; y++) {
          var O = Math.min(y, C), I = 0;
          for (M = 0; M < O; M++)
            I = n(I, l(E[y][M], E[M][C]));
          E[y][C] = m(E[y][C], I);
        }
      var P = C, B = 0, G = 0;
      for (y = C; y < h; y++) {
        var q = E[y][C], T = a(q);
        f(T, B) && (P = y, B = T, G = q);
      }
      if (C !== P && (S[C] = [S[P], S[P] = S[C]][0], s._swapRows(C, P, E)), C < h)
        for (y = C + 1; y < h; y++) {
          var Z = E[y][C];
          u(Z, 0) || (E[y][C] = i(E[y][C], G));
        }
    }
    for (C = 0; C < A; C++)
      for (y = 0; y < h; y++) {
        if (C === 0 && (y < A && (b[y] = []), w[y] = []), y < C) {
          y < A && (b[y][C] = E[y][C]), C < h && (w[y][C] = 0);
          continue;
        }
        if (y === C) {
          y < A && (b[y][C] = E[y][C]), C < h && (w[y][C] = 1);
          continue;
        }
        y < A && (b[y][C] = 0), C < h && (w[y][C] = E[y][C]);
      }
    var X = new s({ data: w, size: D }), L = new s({ data: b, size: F }), U = [];
    for (y = 0, x = S.length; y < x; y++)
      U[S[y]] = y;
    return { L: X, U: L, p: U, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
  function c(v) {
    var h = v._size[0], A = v._size[1], x = Math.min(h, A), E = v._values, w = v._index, D = v._ptr, b = [], F = [], y = [], C = [h, x], M = [], S = [], O = [], I = [x, A], P, B, G, q = [], T = [];
    for (P = 0; P < h; P++)
      q[P] = P, T[P] = P;
    var Z = function(U, Q) {
      var nr = T[U], H = T[Q];
      q[nr] = Q, q[H] = U, T[U] = H, T[Q] = nr;
    }, X = function() {
      var U = new d();
      B < h && (y.push(b.length), b.push(1), F.push(B)), O.push(M.length);
      var Q = D[B], nr = D[B + 1];
      for (G = Q; G < nr; G++)
        P = w[G], U.set(q[P], E[G]);
      B > 0 && U.forEach(0, B - 1, function(k, Y) {
        p._forEachRow(k, b, F, y, function(ar, j) {
          ar > k && U.accumulate(ar, o(l(j, Y)));
        });
      });
      var H = B, V = U.get(B), J = a(V);
      U.forEach(B + 1, h - 1, function(k, Y) {
        var ar = a(Y);
        f(ar, J) && (H = k, J = ar, V = Y);
      }), B !== H && (p._swapRows(B, H, C[1], b, F, y), p._swapRows(B, H, I[1], M, S, O), U.swap(B, H), Z(B, H)), U.forEach(0, h - 1, function(k, Y) {
        k <= B ? (M.push(Y), S.push(k)) : (Y = i(Y, V), u(Y, 0) || (b.push(Y), F.push(k)));
      });
    };
    for (B = 0; B < A; B++)
      X();
    return O.push(M.length), y.push(b.length), { L: new p({ values: b, index: F, ptr: y, size: C }), U: new p({ values: M, index: S, ptr: O, size: I }), p: q, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
});
var ns = "qr", p0 = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], yi = _(ns, p0, (r) => {
  var { typed: e, matrix: t, zeros: a, identity: n, isZero: i, equal: l, sign: m, sqrt: f, conj: u, unaryMinus: o, addScalar: s, divideScalar: p, multiplyScalar: d, subtractScalar: g, complex: c } = r;
  return de(e(ns, { DenseMatrix: function(E) {
    return h(E);
  }, SparseMatrix: function(E) {
    return A();
  }, Array: function(E) {
    var w = t(E), D = h(w);
    return { Q: D.Q.valueOf(), R: D.R.valueOf() };
  } }), { _denseQRimpl: v });
  function v(x) {
    var E = x._size[0], w = x._size[1], D = n([E], "dense"), b = D._data, F = x.clone(), y = F._data, C, M, S, O = a([E], "");
    for (S = 0; S < Math.min(w, E); ++S) {
      var I = y[S][S], P = o(l(I, 0) ? 1 : m(I)), B = u(P), G = 0;
      for (C = S; C < E; C++)
        G = s(G, d(y[C][S], u(y[C][S])));
      var q = d(P, f(G));
      if (!i(q)) {
        var T = g(I, q);
        for (O[S] = 1, C = S + 1; C < E; C++)
          O[C] = p(y[C][S], T);
        var Z = o(u(p(T, q))), X = void 0;
        for (M = S; M < w; M++) {
          for (X = 0, C = S; C < E; C++)
            X = s(X, d(u(O[C]), y[C][M]));
          for (X = d(X, Z), C = S; C < E; C++)
            y[C][M] = d(g(y[C][M], d(O[C], X)), B);
        }
        for (C = 0; C < E; C++) {
          for (X = 0, M = S; M < E; M++)
            X = s(X, d(b[C][M], O[M]));
          for (X = d(X, Z), M = S; M < E; ++M)
            b[C][M] = p(g(b[C][M], d(X, u(O[M]))), B);
        }
      }
    }
    return { Q: D, R: F, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function h(x) {
    var E = v(x), w = E.R._data;
    if (x._data.length > 0)
      for (var D = w[0][0].type === "Complex" ? c(0) : 0, b = 0; b < w.length; ++b)
        for (var F = 0; F < b && F < (w[0] || []).length; ++F)
          w[b][F] = D;
    return E;
  }
  function A(x) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function as(r, e, t, a) {
  for (var n = r._values, i = r._index, l = r._ptr, m = r._size, f = r._datatype, u = m[0], o = m[1], s = a && r._values ? [] : null, p = [], d = [], g = 0, c = 0; c < o; c++) {
    d[c] = g;
    for (var v = t ? t[c] : c, h = l[v], A = l[v + 1], x = h; x < A; x++) {
      var E = e ? e[i[x]] : i[x];
      p[g] = E, s && (s[g] = n[x]), g++;
    }
  }
  return d[o] = g, r.createSparseMatrix({ values: s, index: p, ptr: d, size: [u, o], datatype: f });
}
function fn(r, e, t, a, n, i, l) {
  var m = 0;
  for (t[l] = r; m >= 0; ) {
    var f = t[l + m], u = t[a + f];
    u === -1 ? (m--, i[e++] = f) : (t[a + f] = t[n + u], ++m, t[l + m] = u);
  }
  return e;
}
function is(r, e) {
  if (!r)
    return null;
  var t = 0, a, n = [], i = [], l = 0, m = e, f = 2 * e;
  for (a = 0; a < e; a++)
    i[l + a] = -1;
  for (a = e - 1; a >= 0; a--)
    r[a] !== -1 && (i[m + a] = i[l + r[a]], i[l + r[a]] = a);
  for (a = 0; a < e; a++)
    r[a] === -1 && (t = fn(a, t, i, l, m, n, f));
  return n;
}
function os(r, e) {
  if (!r)
    return null;
  var t = r._index, a = r._ptr, n = r._size, i = n[0], l = n[1], m = [], f = [], u = 0, o = l, s, p;
  if (e)
    for (s = 0; s < i; s++)
      f[o + s] = -1;
  for (var d = 0; d < l; d++) {
    m[d] = -1, f[u + d] = -1;
    for (var g = a[d], c = a[d + 1], v = g; v < c; v++) {
      var h = t[v];
      for (s = e ? f[o + h] : h; s !== -1 && s < d; s = p)
        p = f[u + s], f[u + s] = d, p === -1 && (m[s] = d);
      e && (f[o + h] = d);
    }
  }
  return m;
}
function us(r, e, t) {
  for (var a = r._values, n = r._index, i = r._ptr, l = r._size, m = l[1], f = 0, u = 0; u < m; u++) {
    var o = i[u];
    for (i[u] = f; o < i[u + 1]; o++)
      e(n[o], u, a ? a[o] : 1, t) && (n[f] = n[o], a && (a[f] = a[o]), f++);
  }
  return i[m] = f, n.splice(f, n.length - f), a && a.splice(f, a.length - f), f;
}
function xe(r) {
  return -r - 2;
}
var m0 = "csAmd", v0 = ["add", "multiply", "transpose"], ss = _(m0, v0, (r) => {
  var { add: e, multiply: t, transpose: a } = r;
  return function(o, s) {
    if (!s || o <= 0 || o > 3)
      return null;
    var p = s._size, d = p[0], g = p[1], c = 0, v = Math.max(16, 10 * Math.sqrt(g));
    v = Math.min(g - 2, v);
    var h = n(o, s, d, g, v);
    us(h, f, null);
    for (var A = h._index, x = h._ptr, E = x[g], w = [], D = [], b = 0, F = g + 1, y = 2 * (g + 1), C = 3 * (g + 1), M = 4 * (g + 1), S = 5 * (g + 1), O = 6 * (g + 1), I = 7 * (g + 1), P = w, B = i(g, x, D, b, C, P, y, I, F, O, M, S), G = l(g, x, D, S, M, O, v, F, C, P, y), q = 0, T, Z, X, L, U, Q, nr, H, V, J, k, Y, ar, j, ur, fr; G < g; ) {
      for (X = -1; q < g && (X = D[C + q]) === -1; q++)
        ;
      D[y + X] !== -1 && (P[D[y + X]] = -1), D[C + q] = D[y + X];
      var pr = D[M + X], xr = D[F + X];
      G += xr;
      var wr = 0;
      D[F + X] = -xr;
      var cr = x[X], Mr = pr === 0 ? cr : E, Er = Mr;
      for (L = 1; L <= pr + 1; L++) {
        for (L > pr ? (Q = X, nr = cr, H = D[b + X] - pr) : (Q = A[cr++], nr = x[Q], H = D[b + Q]), U = 1; U <= H; U++)
          T = A[nr++], !((V = D[F + T]) <= 0) && (wr += V, D[F + T] = -V, A[Er++] = T, D[y + T] !== -1 && (P[D[y + T]] = P[T]), P[T] !== -1 ? D[y + P[T]] = D[y + T] : D[C + D[S + T]] = D[y + T]);
        Q !== X && (x[Q] = xe(X), D[O + Q] = 0);
      }
      for (pr !== 0 && (E = Er), D[S + X] = wr, x[X] = Mr, D[b + X] = Er - Mr, D[M + X] = -2, B = m(B, c, D, O, g), J = Mr; J < Er; J++)
        if (T = A[J], !((k = D[M + T]) <= 0)) {
          V = -D[F + T];
          var Br = B - V;
          for (cr = x[T], Y = x[T] + k - 1; cr <= Y; cr++)
            Q = A[cr], D[O + Q] >= B ? D[O + Q] -= V : D[O + Q] !== 0 && (D[O + Q] = D[S + Q] + Br);
        }
      for (J = Mr; J < Er; J++) {
        for (T = A[J], Y = x[T], ar = Y + D[M + T] - 1, j = Y, ur = 0, fr = 0, cr = Y; cr <= ar; cr++)
          if (Q = A[cr], D[O + Q] !== 0) {
            var Ur = D[O + Q] - B;
            Ur > 0 ? (fr += Ur, A[j++] = Q, ur += Q) : (x[Q] = xe(X), D[O + Q] = 0);
          }
        D[M + T] = j - Y + 1;
        var Lr = j, qr = Y + D[b + T];
        for (cr = ar + 1; cr < qr; cr++) {
          Z = A[cr];
          var se = D[F + Z];
          se <= 0 || (fr += se, A[j++] = Z, ur += Z);
        }
        fr === 0 ? (x[T] = xe(X), V = -D[F + T], wr -= V, xr += V, G += V, D[F + T] = 0, D[M + T] = -1) : (D[S + T] = Math.min(D[S + T], fr), A[j] = A[Lr], A[Lr] = A[Y], A[Y] = X, D[b + T] = j - Y + 1, ur = (ur < 0 ? -ur : ur) % g, D[y + T] = D[I + ur], D[I + ur] = T, P[T] = ur);
      }
      for (D[S + X] = wr, c = Math.max(c, wr), B = m(B + c, c, D, O, g), J = Mr; J < Er; J++)
        if (T = A[J], !(D[F + T] >= 0))
          for (ur = P[T], T = D[I + ur], D[I + ur] = -1; T !== -1 && D[y + T] !== -1; T = D[y + T], B++) {
            for (H = D[b + T], k = D[M + T], cr = x[T] + 1; cr <= x[T] + H - 1; cr++)
              D[O + A[cr]] = B;
            var $r = T;
            for (Z = D[y + T]; Z !== -1; ) {
              var ye = D[b + Z] === H && D[M + Z] === k;
              for (cr = x[Z] + 1; ye && cr <= x[Z] + H - 1; cr++)
                D[O + A[cr]] !== B && (ye = 0);
              ye ? (x[Z] = xe(T), D[F + T] += D[F + Z], D[F + Z] = 0, D[M + Z] = -1, Z = D[y + Z], D[y + $r] = Z) : ($r = Z, Z = D[y + Z]);
            }
          }
      for (cr = Mr, J = Mr; J < Er; J++)
        T = A[J], !((V = -D[F + T]) <= 0) && (D[F + T] = V, fr = D[S + T] + wr - V, fr = Math.min(fr, g - G - V), D[C + fr] !== -1 && (P[D[C + fr]] = T), D[y + T] = D[C + fr], P[T] = -1, D[C + fr] = T, q = Math.min(q, fr), D[S + T] = fr, A[cr++] = T);
      D[F + X] = xr, (D[b + X] = cr - Mr) === 0 && (x[X] = -1, D[O + X] = 0), pr !== 0 && (E = cr);
    }
    for (T = 0; T < g; T++)
      x[T] = xe(x[T]);
    for (Z = 0; Z <= g; Z++)
      D[C + Z] = -1;
    for (Z = g; Z >= 0; Z--)
      D[F + Z] > 0 || (D[y + Z] = D[C + x[Z]], D[C + x[Z]] = Z);
    for (Q = g; Q >= 0; Q--)
      D[F + Q] <= 0 || x[Q] !== -1 && (D[y + Q] = D[C + x[Q]], D[C + x[Q]] = Q);
    for (X = 0, T = 0; T <= g; T++)
      x[T] === -1 && (X = fn(T, X, D, C, y, w, O));
    return w.splice(w.length - 1, 1), w;
  };
  function n(u, o, s, p, d) {
    var g = a(o);
    if (u === 1 && p === s)
      return e(o, g);
    if (u === 2) {
      for (var c = g._index, v = g._ptr, h = 0, A = 0; A < s; A++) {
        var x = v[A];
        if (v[A] = h, !(v[A + 1] - x > d))
          for (var E = v[A + 1]; x < E; x++)
            c[h++] = c[x];
      }
      return v[s] = h, o = a(g), t(g, o);
    }
    return t(g, o);
  }
  function i(u, o, s, p, d, g, c, v, h, A, x, E) {
    for (var w = 0; w < u; w++)
      s[p + w] = o[w + 1] - o[w];
    s[p + u] = 0;
    for (var D = 0; D <= u; D++)
      s[d + D] = -1, g[D] = -1, s[c + D] = -1, s[v + D] = -1, s[h + D] = 1, s[A + D] = 1, s[x + D] = 0, s[E + D] = s[p + D];
    var b = m(0, 0, s, A, u);
    return s[x + u] = -2, o[u] = -1, s[A + u] = 0, b;
  }
  function l(u, o, s, p, d, g, c, v, h, A, x) {
    for (var E = 0, w = 0; w < u; w++) {
      var D = s[p + w];
      if (D === 0)
        s[d + w] = -2, E++, o[w] = -1, s[g + w] = 0;
      else if (D > c)
        s[v + w] = 0, s[d + w] = -1, E++, o[w] = xe(u), s[v + u]++;
      else {
        var b = s[h + D];
        b !== -1 && (A[b] = w), s[x + w] = s[h + D], s[h + D] = w;
      }
    }
    return E;
  }
  function m(u, o, s, p, d) {
    if (u < 2 || u + o < 0) {
      for (var g = 0; g < d; g++)
        s[p + g] !== 0 && (s[p + g] = 1);
      u = 2;
    }
    return u;
  }
  function f(u, o) {
    return u !== o;
  }
});
function fs(r, e, t, a, n, i, l) {
  var m, f, u = 0, o;
  if (r <= e || t[a + e] <= t[n + r])
    return -1;
  t[n + r] = t[a + e];
  var s = t[i + r];
  if (t[i + r] = e, s === -1)
    u = 1, o = r;
  else {
    for (u = 2, o = s; o !== t[l + o]; o = t[l + o])
      ;
    for (m = s; m !== o; m = f)
      f = t[l + m], t[l + m] = o;
  }
  return { jleaf: u, q: o };
}
var h0 = "csCounts", d0 = ["transpose"], cs = _(h0, d0, (r) => {
  var { transpose: e } = r;
  return function(t, a, n, i) {
    if (!t || !a || !n)
      return null;
    var l = t._size, m = l[0], f = l[1], u, o, s, p, d, g, c, v = 4 * f + (i ? f + m + 1 : 0), h = [], A = 0, x = f, E = 2 * f, w = 3 * f, D = 4 * f, b = 5 * f + 1;
    for (s = 0; s < v; s++)
      h[s] = -1;
    var F = [], y = e(t), C = y._index, M = y._ptr;
    for (s = 0; s < f; s++)
      for (o = n[s], F[o] = h[w + o] === -1 ? 1 : 0; o !== -1 && h[w + o] === -1; o = a[o])
        h[w + o] = s;
    if (i) {
      for (s = 0; s < f; s++)
        h[n[s]] = s;
      for (u = 0; u < m; u++) {
        for (s = f, g = M[u], c = M[u + 1], d = g; d < c; d++)
          s = Math.min(s, h[C[d]]);
        h[b + u] = h[D + s], h[D + s] = u;
      }
    }
    for (u = 0; u < f; u++)
      h[A + u] = u;
    for (s = 0; s < f; s++) {
      for (o = n[s], a[o] !== -1 && F[a[o]]--, p = i ? h[D + s] : o; p !== -1; p = i ? h[b + p] : -1)
        for (d = M[p]; d < M[p + 1]; d++) {
          u = C[d];
          var S = fs(u, o, h, w, x, E, A);
          S.jleaf >= 1 && F[o]++, S.jleaf === 2 && F[S.q]--;
        }
      a[o] !== -1 && (h[A + o] = a[o]);
    }
    for (o = 0; o < f; o++)
      a[o] !== -1 && (F[a[o]] += F[o]);
    return F;
  };
});
var g0 = "csSqr", D0 = ["add", "multiply", "transpose"], ls = _(g0, D0, (r) => {
  var { add: e, multiply: t, transpose: a } = r, n = ss({ add: e, multiply: t, transpose: a }), i = cs({ transpose: a });
  return function(f, u, o) {
    var s = u._ptr, p = u._size, d = p[1], g, c = {};
    if (c.q = n(f, u), f && !c.q)
      return null;
    if (o) {
      var v = f ? as(u, null, c.q, 0) : u;
      c.parent = os(v, 1);
      var h = is(c.parent, d);
      if (c.cp = i(v, c.parent, h, 1), v && c.parent && c.cp && l(v, c))
        for (c.unz = 0, g = 0; g < d; g++)
          c.unz += c.cp[g];
    } else
      c.unz = 4 * s[d] + d, c.lnz = c.unz;
    return c;
  };
  function l(m, f) {
    var u = m._ptr, o = m._index, s = m._size, p = s[0], d = s[1];
    f.pinv = [], f.leftmost = [];
    var g = f.parent, c = f.pinv, v = f.leftmost, h = [], A = 0, x = p, E = p + d, w = p + 2 * d, D, b, F, y, C;
    for (b = 0; b < d; b++)
      h[x + b] = -1, h[E + b] = -1, h[w + b] = 0;
    for (D = 0; D < p; D++)
      v[D] = -1;
    for (b = d - 1; b >= 0; b--)
      for (y = u[b], C = u[b + 1], F = y; F < C; F++)
        v[o[F]] = b;
    for (D = p - 1; D >= 0; D--)
      c[D] = -1, b = v[D], b !== -1 && (h[w + b]++ === 0 && (h[E + b] = D), h[A + D] = h[x + b], h[x + b] = D);
    for (f.lnz = 0, f.m2 = p, b = 0; b < d; b++)
      if (D = h[x + b], f.lnz++, D < 0 && (D = f.m2++), c[D] = b, !(--w[b] <= 0)) {
        f.lnz += h[w + b];
        var M = g[b];
        M !== -1 && (h[w + M] === 0 && (h[E + M] = h[E + b]), h[A + h[E + b]] = h[x + M], h[x + M] = h[A + D], h[w + M] += h[w + b]);
      }
    for (D = 0; D < p; D++)
      c[D] < 0 && (c[D] = b++);
    return true;
  }
});
function At(r, e) {
  return r[e] < 0;
}
function cn(r, e) {
  r[e] = xe(r[e]);
}
function Ai(r) {
  return r < 0 ? xe(r) : r;
}
function ps(r, e, t, a, n) {
  var i = e._index, l = e._ptr, m = e._size, f = m[1], u, o, s, p = 0;
  for (a[0] = r; p >= 0; ) {
    r = a[p];
    var d = n ? n[r] : r;
    At(l, r) || (cn(l, r), a[f + p] = d < 0 ? 0 : Ai(l[d]));
    var g = 1;
    for (o = a[f + p], s = d < 0 ? 0 : Ai(l[d + 1]); o < s; o++)
      if (u = i[o], !At(l, u)) {
        a[f + p] = o, a[++p] = u, g = 0;
        break;
      }
    g && (p--, a[--t] = r);
  }
  return t;
}
function ms(r, e, t, a, n) {
  var i = r._ptr, l = r._size, m = e._index, f = e._ptr, u = l[1], o, s, p, d = u;
  for (s = f[t], p = f[t + 1], o = s; o < p; o++) {
    var g = m[o];
    At(i, g) || (d = ps(g, r, d, a, n));
  }
  for (o = d; o < u; o++)
    cn(i, a[o]);
  return d;
}
var x0 = "csSpsolve", y0 = ["divideScalar", "multiply", "subtract"], vs = _(x0, y0, (r) => {
  var { divideScalar: e, multiply: t, subtract: a } = r;
  return function(i, l, m, f, u, o, s) {
    var p = i._values, d = i._index, g = i._ptr, c = i._size, v = c[1], h = l._values, A = l._index, x = l._ptr, E, w, D, b, F = ms(i, l, m, f, o);
    for (E = F; E < v; E++)
      u[f[E]] = 0;
    for (w = x[m], D = x[m + 1], E = w; E < D; E++)
      u[A[E]] = h[E];
    for (var y = F; y < v; y++) {
      var C = f[y], M = o ? o[C] : C;
      if (!(M < 0))
        for (w = g[M], D = g[M + 1], u[C] = e(u[C], p[s ? w : D - 1]), E = s ? w + 1 : w, b = s ? D : D - 1; E < b; E++) {
          var S = d[E];
          u[S] = a(u[S], t(p[E], u[C]));
        }
    }
    return F;
  };
});
var A0 = "csLu", w0 = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], hs = _(A0, w0, (r) => {
  var { abs: e, divideScalar: t, multiply: a, subtract: n, larger: i, largerEq: l, SparseMatrix: m } = r, f = vs({ divideScalar: t, multiply: a, subtract: n });
  return function(o, s, p) {
    if (!o)
      return null;
    var d = o._size, g = d[1], c, v = 100, h = 100;
    s && (c = s.q, v = s.lnz || v, h = s.unz || h);
    var A = [], x = [], E = [], w = new m({ values: A, index: x, ptr: E, size: [g, g] }), D = [], b = [], F = [], y = new m({ values: D, index: b, ptr: F, size: [g, g] }), C = [], M, S, O = [], I = [];
    for (M = 0; M < g; M++)
      O[M] = 0, C[M] = -1, E[M + 1] = 0;
    v = 0, h = 0;
    for (var P = 0; P < g; P++) {
      E[P] = v, F[P] = h;
      var B = c ? c[P] : P, G = f(w, o, B, I, O, C, 1), q = -1, T = -1;
      for (S = G; S < g; S++)
        if (M = I[S], C[M] < 0) {
          var Z = e(O[M]);
          i(Z, T) && (T = Z, q = M);
        } else
          b[h] = C[M], D[h++] = O[M];
      if (q === -1 || T <= 0)
        return null;
      C[B] < 0 && l(e(O[B]), a(T, p)) && (q = B);
      var X = O[q];
      for (b[h] = P, D[h++] = X, C[q] = P, x[v] = q, A[v++] = 1, S = G; S < g; S++)
        M = I[S], C[M] < 0 && (x[v] = M, A[v++] = t(O[M], X)), O[M] = 0;
    }
    for (E[g] = v, F[g] = h, S = 0; S < v; S++)
      x[S] = C[x[S]];
    return A.splice(v, A.length - v), x.splice(v, x.length - v), D.splice(h, D.length - h), b.splice(h, b.length - h), { L: w, U: y, pinv: C };
  };
});
var ds = "slu", E0 = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], wi = _(ds, E0, (r) => {
  var { typed: e, abs: t, add: a, multiply: n, transpose: i, divideScalar: l, subtract: m, larger: f, largerEq: u, SparseMatrix: o } = r, s = ls({ add: a, multiply: n, transpose: i }), p = hs({ abs: t, divideScalar: l, multiply: n, subtract: m, larger: f, largerEq: u, SparseMatrix: o });
  return e(ds, { "SparseMatrix, number, number": function(g, c, v) {
    if (!dr(c) || c < 0 || c > 3)
      throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
    if (v < 0 || v > 1)
      throw new Error("Partial pivoting threshold must be a number from 0 to 1");
    var h = s(c, g, false), A = p(g, h, v);
    return { L: A.L, U: A.U, p: A.pinv, q: h.q, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
    } };
  } });
});
function Ei(r, e) {
  var t, a = e.length, n = [];
  if (r)
    for (t = 0; t < a; t++)
      n[r[t]] = e[t];
  else
    for (t = 0; t < a; t++)
      n[t] = e[t];
  return n;
}
var gs = "lusolve", C0 = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], Ci = _(gs, C0, (r) => {
  var { typed: e, matrix: t, lup: a, slu: n, usolve: i, lsolve: l, DenseMatrix: m } = r, f = Ze({ DenseMatrix: m });
  return e(gs, { "Array, Array | Matrix": function(p, d) {
    p = t(p);
    var g = a(p), c = o(g.L, g.U, g.p, null, d);
    return c.valueOf();
  }, "DenseMatrix, Array | Matrix": function(p, d) {
    var g = a(p);
    return o(g.L, g.U, g.p, null, d);
  }, "SparseMatrix, Array | Matrix": function(p, d) {
    var g = a(p);
    return o(g.L, g.U, g.p, null, d);
  }, "SparseMatrix, Array | Matrix, number, number": function(p, d, g, c) {
    var v = n(p, g, c);
    return o(v.L, v.U, v.p, v.q, d);
  }, "Object, Array | Matrix": function(p, d) {
    return o(p.L, p.U, p.p, p.q, d);
  } });
  function u(s) {
    if (yr(s))
      return s;
    if (Ar(s))
      return t(s);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function o(s, p, d, g, c) {
    s = u(s), p = u(p), d && (c = f(s, c, true), c._data = Ei(d, c._data));
    var v = l(s, c), h = i(p, v);
    return g && (h._data = Ei(g, h._data)), h;
  }
});
var Ds = "det", F0 = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], Fi = _(Ds, F0, (r) => {
  var { typed: e, matrix: t, subtractScalar: a, multiply: n, divideScalar: i, isZero: l, unaryMinus: m } = r;
  return e(Ds, { any: function(o) {
    return hr(o);
  }, "Array | Matrix": function(o) {
    var s;
    switch (yr(o) ? s = o.size() : Array.isArray(o) ? (o = t(o), s = o.size()) : s = [], s.length) {
      case 0:
        return hr(o);
      case 1:
        if (s[0] === 1)
          return hr(o.valueOf()[0]);
        if (s[0] === 0)
          return 1;
        throw new RangeError("Matrix must be square (size: " + Sr(s) + ")");
      case 2: {
        var p = s[0], d = s[1];
        if (p === d)
          return f(o.clone().valueOf(), p);
        if (d === 0)
          return 1;
        throw new RangeError("Matrix must be square (size: " + Sr(s) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Sr(s) + ")");
    }
  } });
  function f(u, o, s) {
    if (o === 1)
      return hr(u[0][0]);
    if (o === 2)
      return a(n(u[0][0], u[1][1]), n(u[1][0], u[0][1]));
    for (var p = false, d = new Array(o).fill(0).map((b, F) => F), g = 0; g < o; g++) {
      var c = d[g];
      if (l(u[c][g])) {
        var v = void 0;
        for (v = g + 1; v < o; v++)
          if (!l(u[d[v]][g])) {
            c = d[v], d[v] = d[g], d[g] = c, p = !p;
            break;
          }
        if (v === o)
          return u[c][g];
      }
      for (var h = u[c][g], A = g === 0 ? 1 : u[d[g - 1]][g - 1], x = g + 1; x < o; x++)
        for (var E = d[x], w = g + 1; w < o; w++)
          u[E][w] = i(a(n(u[E][w], h), n(u[E][g], u[c][w])), A);
    }
    var D = u[d[o - 1]][o - 1];
    return p ? m(D) : D;
  }
});
var xs = "inv", b0 = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], bi = _(xs, b0, (r) => {
  var { typed: e, matrix: t, divideScalar: a, addScalar: n, multiply: i, unaryMinus: l, det: m, identity: f, abs: u } = r;
  return e(xs, { "Array | Matrix": function(p) {
    var d = yr(p) ? p.size() : br(p);
    switch (d.length) {
      case 1:
        if (d[0] === 1)
          return yr(p) ? t([a(1, p.valueOf()[0])]) : [a(1, p[0])];
        throw new RangeError("Matrix must be square (size: " + Sr(d) + ")");
      case 2: {
        var g = d[0], c = d[1];
        if (g === c)
          return yr(p) ? t(o(p.valueOf(), g, c), p.storage()) : o(p, g, c);
        throw new RangeError("Matrix must be square (size: " + Sr(d) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Sr(d) + ")");
    }
  }, any: function(p) {
    return a(1, p);
  } });
  function o(s, p, d) {
    var g, c, v, h, A;
    if (p === 1) {
      if (h = s[0][0], h === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(1, h)]];
    } else if (p === 2) {
      var x = m(s);
      if (x === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(s[1][1], x), a(l(s[0][1]), x)], [a(l(s[1][0]), x), a(s[0][0], x)]];
    } else {
      var E = s.concat();
      for (g = 0; g < p; g++)
        E[g] = E[g].concat();
      for (var w = f(p).valueOf(), D = 0; D < d; D++) {
        var b = u(E[D][D]), F = D;
        for (g = D + 1; g < p; )
          u(E[g][D]) > b && (b = u(E[g][D]), F = g), g++;
        if (b === 0)
          throw Error("Cannot calculate inverse, determinant is zero");
        g = F, g !== D && (A = E[D], E[D] = E[g], E[g] = A, A = w[D], w[D] = w[g], w[g] = A);
        var y = E[D], C = w[D];
        for (g = 0; g < p; g++) {
          var M = E[g], S = w[g];
          if (g !== D) {
            if (M[D] !== 0) {
              for (v = a(l(M[D]), y[D]), c = D; c < d; c++)
                M[c] = n(M[c], i(v, y[c]));
              for (c = 0; c < d; c++)
                S[c] = n(S[c], i(v, C[c]));
            }
          } else {
            for (v = y[D], c = D; c < d; c++)
              M[c] = a(M[c], v);
            for (c = 0; c < d; c++)
              S[c] = a(S[c], v);
          }
        }
      }
      return w;
    }
  }
});
function ys(r) {
  var { addScalar: e, subtract: t, flatten: a, multiply: n, multiplyScalar: i, divideScalar: l, sqrt: m, abs: f, bignumber: u, diag: o, size: s, reshape: p, inv: d, qr: g, usolve: c, usolveAll: v, equal: h, complex: A, larger: x, smaller: E, matrixFromColumns: w, dot: D } = r;
  function b(L, U, Q, nr) {
    var H = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, V = F(L, U, Q, nr, H);
    y(L, U, Q, nr, H, V);
    var { values: J, C: k } = C(L, U, Q, nr, H);
    if (H) {
      var Y = M(L, U, k, V, J, Q, nr);
      return { values: J, eigenvectors: Y };
    }
    return { values: J };
  }
  function F(L, U, Q, nr, H) {
    var V = nr === "BigNumber", J = nr === "Complex", k = V ? u(0) : 0, Y = V ? u(1) : J ? A(1) : 1, ar = V ? u(1) : 1, j = V ? u(10) : 2, ur = i(j, j), fr;
    H && (fr = Array(U).fill(Y));
    for (var pr = false; !pr; ) {
      pr = true;
      for (var xr = 0; xr < U; xr++) {
        for (var wr = k, cr = k, Mr = 0; Mr < U; Mr++)
          xr !== Mr && (wr = e(wr, f(L[Mr][xr])), cr = e(cr, f(L[xr][Mr])));
        if (!h(wr, 0) && !h(cr, 0)) {
          for (var Er = ar, Br = wr, Ur = l(cr, j), Lr = i(cr, j); E(Br, Ur); )
            Br = i(Br, ur), Er = i(Er, j);
          for (; x(Br, Lr); )
            Br = l(Br, ur), Er = l(Er, j);
          var qr = E(l(e(Br, cr), Er), i(e(wr, cr), 0.95));
          if (qr) {
            pr = false;
            for (var se = l(1, Er), $r = 0; $r < U; $r++)
              xr !== $r && (L[xr][$r] = i(L[xr][$r], se), L[$r][xr] = i(L[$r][xr], Er));
            H && (fr[xr] = i(fr[xr], se));
          }
        }
      }
    }
    return H ? o(fr) : null;
  }
  function y(L, U, Q, nr, H, V) {
    var J = nr === "BigNumber", k = nr === "Complex", Y = J ? u(0) : k ? A(0) : 0;
    J && (Q = u(Q));
    for (var ar = 0; ar < U - 2; ar++) {
      for (var j = 0, ur = Y, fr = ar + 1; fr < U; fr++) {
        var pr = L[fr][ar];
        E(f(ur), f(pr)) && (ur = pr, j = fr);
      }
      if (!E(f(ur), Q)) {
        if (j !== ar + 1) {
          var xr = L[j];
          L[j] = L[ar + 1], L[ar + 1] = xr;
          for (var wr = 0; wr < U; wr++) {
            var cr = L[wr][j];
            L[wr][j] = L[wr][ar + 1], L[wr][ar + 1] = cr;
          }
          if (H) {
            var Mr = V[j];
            V[j] = V[ar + 1], V[ar + 1] = Mr;
          }
        }
        for (var Er = ar + 2; Er < U; Er++) {
          var Br = l(L[Er][ar], ur);
          if (Br !== 0) {
            for (var Ur = 0; Ur < U; Ur++)
              L[Er][Ur] = t(L[Er][Ur], i(Br, L[ar + 1][Ur]));
            for (var Lr = 0; Lr < U; Lr++)
              L[Lr][ar + 1] = e(L[Lr][ar + 1], i(Br, L[Lr][Er]));
            if (H)
              for (var qr = 0; qr < U; qr++)
                V[Er][qr] = t(V[Er][qr], i(Br, V[ar + 1][qr]));
          }
        }
      }
    }
    return V;
  }
  function C(L, U, Q, nr, H) {
    var V = nr === "BigNumber", J = nr === "Complex", k = V ? u(1) : J ? A(1) : 1;
    V && (Q = u(Q));
    for (var Y = hr(L), ar = [], j = U, ur = [], fr = H ? o(Array(U).fill(k)) : void 0, pr = H ? o(Array(j).fill(k)) : void 0, xr = 0; xr <= 100; ) {
      xr += 1;
      for (var wr = Y[j - 1][j - 1], cr = 0; cr < j; cr++)
        Y[cr][cr] = t(Y[cr][cr], wr);
      var { Q: Mr, R: Er } = g(Y);
      Y = n(Er, Mr);
      for (var Br = 0; Br < j; Br++)
        Y[Br][Br] = e(Y[Br][Br], wr);
      if (H && (pr = n(pr, Mr)), j === 1 || E(f(Y[j - 1][j - 2]), Q)) {
        xr = 0, ar.push(Y[j - 1][j - 1]), H && (ur.unshift([[1]]), I(pr, U), fr = n(fr, pr), j > 1 && (pr = o(Array(j - 1).fill(k)))), j -= 1, Y.pop();
        for (var Ur = 0; Ur < j; Ur++)
          Y[Ur].pop();
      } else if (j === 2 || E(f(Y[j - 2][j - 3]), Q)) {
        xr = 0;
        var Lr = S(Y[j - 2][j - 2], Y[j - 2][j - 1], Y[j - 1][j - 2], Y[j - 1][j - 1]);
        ar.push(...Lr), H && (ur.unshift(O(Y[j - 2][j - 2], Y[j - 2][j - 1], Y[j - 1][j - 2], Y[j - 1][j - 1], Lr[0], Lr[1], Q, nr)), I(pr, U), fr = n(fr, pr), j > 2 && (pr = o(Array(j - 2).fill(k)))), j -= 2, Y.pop(), Y.pop();
        for (var qr = 0; qr < j; qr++)
          Y[qr].pop(), Y[qr].pop();
      }
      if (j === 0)
        break;
    }
    if (ar.sort((ye, fe) => +t(f(ye), f(fe))), xr > 100) {
      var se = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + ar.join(", "));
      throw se.values = ar, se.vectors = [], se;
    }
    var $r = H ? n(fr, P(ur, U)) : void 0;
    return { values: ar, C: $r };
  }
  function M(L, U, Q, nr, H, V, J) {
    var k = d(Q), Y = n(k, L, Q), ar = J === "BigNumber", j = J === "Complex", ur = ar ? u(0) : j ? A(0) : 0, fr = ar ? u(1) : j ? A(1) : 1, pr = [], xr = [];
    for (var wr of H) {
      var cr = B(pr, wr, h);
      cr === -1 ? (pr.push(wr), xr.push(1)) : xr[cr] += 1;
    }
    for (var Mr = [], Er = pr.length, Br = Array(U).fill(ur), Ur = o(Array(U).fill(fr)), Lr = function() {
      var $r = pr[qr], ye = t(Y, n($r, Ur)), fe = v(ye, Br);
      for (fe.shift(); fe.length < xr[qr]; ) {
        var N = G(ye, U, fe, V, J);
        if (N === null)
          break;
        fe.push(N);
      }
      var z = n(d(nr), Q);
      fe = fe.map((R) => n(z, R)), Mr.push(...fe.map((R) => ({ value: $r, vector: a(R) })));
    }, qr = 0; qr < Er; qr++)
      Lr();
    return Mr;
  }
  function S(L, U, Q, nr) {
    var H = e(L, nr), V = t(i(L, nr), i(U, Q)), J = i(H, 0.5), k = i(m(t(i(H, H), i(4, V))), 0.5);
    return [e(J, k), t(J, k)];
  }
  function O(L, U, Q, nr, H, V, J, k) {
    var Y = k === "BigNumber", ar = k === "Complex", j = Y ? u(0) : ar ? A(0) : 0, ur = Y ? u(1) : ar ? A(1) : 1;
    if (E(f(Q), J))
      return [[ur, j], [j, ur]];
    if (x(f(t(H, V)), J))
      return [[t(H, nr), t(V, nr)], [Q, Q]];
    var fr = t(L, H), pr = t(nr, H);
    return E(f(U), J) && E(f(pr), J) ? [[fr, ur], [Q, j]] : [[U, j], [pr, ur]];
  }
  function I(L, U) {
    for (var Q = 0; Q < L.length; Q++)
      L[Q].push(...Array(U - L[Q].length).fill(0));
    for (var nr = L.length; nr < U; nr++)
      L.push(Array(U).fill(0)), L[nr][nr] = 1;
    return L;
  }
  function P(L, U) {
    for (var Q = [], nr = 0; nr < U; nr++)
      Q[nr] = Array(U).fill(0);
    var H = 0;
    for (var V of L) {
      for (var J = V.length, k = 0; k < J; k++)
        for (var Y = 0; Y < J; Y++)
          Q[H + k][H + Y] = V[k][Y];
      H += J;
    }
    return Q;
  }
  function B(L, U, Q) {
    for (var nr = 0; nr < L.length; nr++)
      if (Q(L[nr], U))
        return nr;
    return -1;
  }
  function G(L, U, Q, nr, H) {
    for (var V = H === "BigNumber" ? u(1e3) : 1e3, J, k = 0; k < 5; ++k) {
      J = q(U, Q, H);
      try {
        J = c(L, J);
      } catch (ar) {
        continue;
      }
      if (x(Z(J), V))
        break;
    }
    if (k >= 5)
      return null;
    for (k = 0; ; ) {
      var Y = c(L, J);
      if (E(Z(T(J, [Y])), nr))
        break;
      if (++k >= 10)
        return null;
      J = X(Y);
    }
    return J;
  }
  function q(L, U, Q) {
    var nr = Q === "BigNumber", H = Q === "Complex", V = Array(L).fill(0).map((J) => 2 * Math.random() - 1);
    return nr && (V = V.map((J) => u(J))), H && (V = V.map((J) => A(J))), V = T(V, U), X(V, Q);
  }
  function T(L, U) {
    var Q = s(L);
    for (var nr of U)
      nr = p(nr, Q), L = t(L, n(l(D(nr, L), D(nr, nr)), nr));
    return L;
  }
  function Z(L) {
    return f(m(D(L, L)));
  }
  function X(L, U) {
    var Q = U === "BigNumber", nr = U === "Complex", H = Q ? u(1) : nr ? A(1) : 1;
    return n(l(H, Z(L)), L);
  }
  return b;
}
function As(r) {
  var { config: e, addScalar: t, subtract: a, abs: n, atan: i, cos: l, sin: m, multiplyScalar: f, inv: u, bignumber: o, multiply: s, add: p } = r;
  function d(y, C) {
    var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.epsilon, S = arguments.length > 3 ? arguments[3] : void 0, O = arguments.length > 4 ? arguments[4] : void 0;
    if (S === "number")
      return g(y, M, O);
    if (S === "BigNumber")
      return c(y, M, O);
    throw TypeError("Unsupported data type: " + S);
  }
  function g(y, C, M) {
    var S = y.length, O = Math.abs(C / S), I, P;
    if (M) {
      P = new Array(S);
      for (var B = 0; B < S; B++)
        P[B] = Array(S).fill(0), P[B][B] = 1;
    }
    for (var G = D(y); Math.abs(G[1]) >= Math.abs(O); ) {
      var q = G[0][0], T = G[0][1];
      I = v(y[q][q], y[T][T], y[q][T]), y = w(y, I, q, T), M && (P = A(P, I, q, T)), G = D(y);
    }
    for (var Z = Array(S).fill(0), X = 0; X < S; X++)
      Z[X] = y[X][X];
    return F(hr(Z), P, M);
  }
  function c(y, C, M) {
    var S = y.length, O = n(C / S), I, P;
    if (M) {
      P = new Array(S);
      for (var B = 0; B < S; B++)
        P[B] = Array(S).fill(0), P[B][B] = 1;
    }
    for (var G = b(y); n(G[1]) >= n(O); ) {
      var q = G[0][0], T = G[0][1];
      I = h(y[q][q], y[T][T], y[q][T]), y = E(y, I, q, T), M && (P = x(P, I, q, T)), G = b(y);
    }
    for (var Z = Array(S).fill(0), X = 0; X < S; X++)
      Z[X] = y[X][X];
    return F(hr(Z), P, M);
  }
  function v(y, C, M) {
    var S = C - y;
    return Math.abs(S) <= e.epsilon ? Math.PI / 4 : 0.5 * Math.atan(2 * M / (C - y));
  }
  function h(y, C, M) {
    var S = a(C, y);
    return n(S) <= e.epsilon ? o(-1).acos().div(4) : f(0.5, i(s(2, M, u(S))));
  }
  function A(y, C, M, S) {
    for (var O = y.length, I = Math.cos(C), P = Math.sin(C), B = Array(O).fill(0), G = Array(O).fill(0), q = 0; q < O; q++)
      B[q] = I * y[q][M] - P * y[q][S], G[q] = P * y[q][M] + I * y[q][S];
    for (var T = 0; T < O; T++)
      y[T][M] = B[T], y[T][S] = G[T];
    return y;
  }
  function x(y, C, M, S) {
    for (var O = y.length, I = l(C), P = m(C), B = Array(O).fill(o(0)), G = Array(O).fill(o(0)), q = 0; q < O; q++)
      B[q] = a(f(I, y[q][M]), f(P, y[q][S])), G[q] = t(f(P, y[q][M]), f(I, y[q][S]));
    for (var T = 0; T < O; T++)
      y[T][M] = B[T], y[T][S] = G[T];
    return y;
  }
  function E(y, C, M, S) {
    for (var O = y.length, I = o(l(C)), P = o(m(C)), B = f(I, I), G = f(P, P), q = Array(O).fill(o(0)), T = Array(O).fill(o(0)), Z = s(o(2), I, P, y[M][S]), X = t(a(f(B, y[M][M]), Z), f(G, y[S][S])), L = p(f(G, y[M][M]), Z, f(B, y[S][S])), U = 0; U < O; U++)
      q[U] = a(f(I, y[M][U]), f(P, y[S][U])), T[U] = t(f(P, y[M][U]), f(I, y[S][U]));
    y[M][M] = X, y[S][S] = L, y[M][S] = o(0), y[S][M] = o(0);
    for (var Q = 0; Q < O; Q++)
      Q !== M && Q !== S && (y[M][Q] = q[Q], y[Q][M] = q[Q], y[S][Q] = T[Q], y[Q][S] = T[Q]);
    return y;
  }
  function w(y, C, M, S) {
    for (var O = y.length, I = Math.cos(C), P = Math.sin(C), B = I * I, G = P * P, q = Array(O).fill(0), T = Array(O).fill(0), Z = B * y[M][M] - 2 * I * P * y[M][S] + G * y[S][S], X = G * y[M][M] + 2 * I * P * y[M][S] + B * y[S][S], L = 0; L < O; L++)
      q[L] = I * y[M][L] - P * y[S][L], T[L] = P * y[M][L] + I * y[S][L];
    y[M][M] = Z, y[S][S] = X, y[M][S] = 0, y[S][M] = 0;
    for (var U = 0; U < O; U++)
      U !== M && U !== S && (y[M][U] = q[U], y[U][M] = q[U], y[S][U] = T[U], y[U][S] = T[U]);
    return y;
  }
  function D(y) {
    for (var C = y.length, M = 0, S = [0, 1], O = 0; O < C; O++)
      for (var I = O + 1; I < C; I++)
        Math.abs(M) < Math.abs(y[O][I]) && (M = Math.abs(y[O][I]), S = [O, I]);
    return [S, M];
  }
  function b(y) {
    for (var C = y.length, M = 0, S = [0, 1], O = 0; O < C; O++)
      for (var I = O + 1; I < C; I++)
        n(M) < n(y[O][I]) && (M = n(y[O][I]), S = [O, I]);
    return [S, M];
  }
  function F(y, C, M) {
    var S = y.length, O = Array(S), I;
    if (M) {
      I = Array(S);
      for (var P = 0; P < S; P++)
        I[P] = Array(S);
    }
    for (var B = 0; B < S; B++) {
      for (var G = 0, q = y[0], T = 0; T < y.length; T++)
        n(y[T]) < n(q) && (G = T, q = y[G]);
      if (O[B] = y.splice(G, 1)[0], M)
        for (var Z = 0; Z < S; Z++)
          I[B][Z] = C[Z][G], C[Z].splice(G, 1);
    }
    if (!M)
      return { values: O };
    var X = I.map((L, U) => ({ value: O[U], vector: L }));
    return { values: O, eigenvectors: X };
  }
  return d;
}
var M0 = "eigs", S0 = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], Mi = _(M0, S0, (r) => {
  var { config: e, typed: t, matrix: a, addScalar: n, subtract: i, equal: l, abs: m, atan: f, cos: u, sin: o, multiplyScalar: s, divideScalar: p, inv: d, bignumber: g, multiply: c, add: v, larger: h, column: A, flatten: x, number: E, complex: w, sqrt: D, diag: b, size: F, reshape: y, qr: C, usolve: M, usolveAll: S, im: O, re: I, smaller: P, matrixFromColumns: B, dot: G } = r, q = As({ config: e, addScalar: n, subtract: i, column: A, flatten: x, equal: l, abs: m, atan: f, cos: u, sin: o, multiplyScalar: s, inv: d, bignumber: g, complex: w, multiply: c, add: v }), T = ys({ config: e, addScalar: n, subtract: i, multiply: c, multiplyScalar: s, flatten: x, divideScalar: p, sqrt: D, abs: m, bignumber: g, diag: b, size: F, reshape: y, qr: C, inv: d, usolve: M, usolveAll: S, equal: l, complex: w, larger: h, smaller: P, matrixFromColumns: B, dot: G });
  return t("eigs", { Array: function(V) {
    return Z(a(V));
  }, "Array, number|BigNumber": function(V, J) {
    return Z(a(V), { precision: J });
  }, "Array, Object"(H, V) {
    return Z(a(H), V);
  }, Matrix: function(V) {
    return Z(V, { matricize: true });
  }, "Matrix, number|BigNumber": function(V, J) {
    return Z(V, { precision: J, matricize: true });
  }, "Matrix, Object": function(V, J) {
    var k = { matricize: true };
    return de(k, J), Z(V, k);
  } });
  function Z(H) {
    var V, J = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = "eigenvectors" in J ? J.eigenvectors : true, Y = (V = J.precision) !== null && V !== void 0 ? V : e.epsilon, ar = X(H, Y, k);
    return J.matricize && (ar.values = a(ar.values), k && (ar.eigenvectors = ar.eigenvectors.map((j) => {
      var { value: ur, vector: fr } = j;
      return { value: ur, vector: a(fr) };
    }))), k && Object.defineProperty(ar, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), ar;
  }
  function X(H, V, J) {
    var k = H.toArray(), Y = H.size();
    if (Y.length !== 2 || Y[0] !== Y[1])
      throw new RangeError("Matrix must be square (size: ".concat(Sr(Y), ")"));
    var ar = Y[0];
    if (U(k, ar, V) && (Q(k, ar), L(k, ar, V))) {
      var j = nr(H, k, ar);
      return q(k, ar, V, j, J);
    }
    var ur = nr(H, k, ar);
    return T(k, ar, V, ur, J);
  }
  function L(H, V, J) {
    for (var k = 0; k < V; k++)
      for (var Y = k; Y < V; Y++)
        if (h(g(m(i(H[k][Y], H[Y][k]))), J))
          return false;
    return true;
  }
  function U(H, V, J) {
    for (var k = 0; k < V; k++)
      for (var Y = 0; Y < V; Y++)
        if (h(g(m(O(H[k][Y]))), J))
          return false;
    return true;
  }
  function Q(H, V) {
    for (var J = 0; J < V; J++)
      for (var k = 0; k < V; k++)
        H[J][k] = I(H[J][k]);
  }
  function nr(H, V, J) {
    var k = H.datatype();
    if (k === "number" || k === "BigNumber" || k === "Complex")
      return k;
    for (var Y = false, ar = false, j = false, ur = 0; ur < J; ur++)
      for (var fr = 0; fr < J; fr++) {
        var pr = V[ur][fr];
        if (Fr(pr) || pt(pr))
          Y = true;
        else if (Cr(pr))
          ar = true;
        else if (lt(pr))
          j = true;
        else
          throw TypeError("Unsupported type in Matrix: " + Zr(pr));
      }
    if (ar && j && console.warn("Complex BigNumbers not supported, this operation will lose precission."), j) {
      for (var xr = 0; xr < J; xr++)
        for (var wr = 0; wr < J; wr++)
          V[xr][wr] = w(V[xr][wr]);
      return "Complex";
    }
    if (ar) {
      for (var cr = 0; cr < J; cr++)
        for (var Mr = 0; Mr < J; Mr++)
          V[cr][Mr] = g(V[cr][Mr]);
      return "BigNumber";
    }
    if (Y) {
      for (var Er = 0; Er < J; Er++)
        for (var Br = 0; Br < J; Br++)
          V[Er][Br] = E(V[Er][Br]);
      return "number";
    } else
      throw TypeError("Matrix contains unsupported types only.");
  }
});
var at = Wn({ config: Xr }), ln = kn({});
var pn = ra({});
var Si = ea({});
var Qr = ta({ Matrix: Si });
var sr = Vn({ BigNumber: at, Complex: ln, DenseMatrix: Qr, Fraction: pn });
var wt = Ea({ typed: sr });
var Ve = Ca({ typed: sr });
var N0 = li({ typed: sr });
var Ni = ga({ BigNumber: at, typed: sr });
var Bi = Da({ Complex: ln, typed: sr }), mn = _a({ typed: sr }), B0 = pi({ typed: sr });
var pe = va({ config: Xr, typed: sr });
var _0 = Ra({ typed: sr });
var T0 = Ta({ typed: sr }), ws = na({ typed: sr });
var I0 = pa({ typed: sr }), Es = ma({ typed: sr });
var Ne = ba({ typed: sr });
var _i = da({ typed: sr });
var z0 = Ia({ typed: sr });
var O0 = Sa({ BigNumber: at, Fraction: pn, complex: Bi, typed: sr }), P0 = mi({ typed: sr }), it = ha({ Matrix: Si, equalScalar: pe, typed: sr });
var Ke = Fa({ typed: sr });
var Ti = Na({ Complex: ln, config: Xr, typed: sr });
var Et = wa({ typed: sr });
var Cs = xa({ Fraction: pn, typed: sr });
var gr = ya({ DenseMatrix: Qr, Matrix: Si, SparseMatrix: it, typed: sr });
var q0 = Xa({ bignumber: Ni, fraction: Cs, number: _i });
var R0 = Va({ isInteger: ws, matrix: gr, typed: sr }), vn = Qa({ matrix: gr, config: Xr, typed: sr });
var hn = Ya({ matrix: gr, typed: sr });
var ot = Ja({ BigNumber: at, config: Xr, matrix: gr, typed: sr });
var Qe = za({ isInteger: ws, matrix: gr, typed: sr });
var U0 = $a({ conj: mn, transpose: hn, typed: sr }), Ii = Pa({ DenseMatrix: Qr, SparseMatrix: it, matrix: gr, typed: sr }), Be = Ka({ numeric: q0, typed: sr });
var Fs = ti({ DenseMatrix: Qr, concat: Qe, equalScalar: pe, matrix: gr, typed: sr }), dn = qa({ matrix: gr, typed: sr });
var We = Ua({ BigNumber: at, DenseMatrix: Qr, SparseMatrix: it, config: Xr, matrix: gr, typed: sr }), gn = La({ matrix: gr, multiplyScalar: Ne, typed: sr }), bs = oi({ DenseMatrix: Qr, concat: Qe, config: Xr, matrix: gr, typed: sr });
var L0 = Ha({ DenseMatrix: Qr, divideScalar: Be, equalScalar: pe, matrix: gr, multiplyScalar: Ne, subtractScalar: Ke, typed: sr }), Z0 = Aa({ flatten: dn, matrix: gr, size: vn, typed: sr });
var V0 = yi({ addScalar: Ve, complex: Bi, conj: mn, divideScalar: Be, equal: Fs, identity: We, isZero: Es, matrix: gr, multiplyScalar: Ne, sign: O0, sqrt: Ti, subtractScalar: Ke, typed: sr, unaryMinus: Et, zeros: ot });
var Ct = ni({ DenseMatrix: Qr, concat: Qe, config: Xr, matrix: gr, typed: sr }), ue = Ba({ DenseMatrix: Qr, concat: Qe, equalScalar: pe, matrix: gr, subtractScalar: Ke, typed: sr, unaryMinus: Et });
var Ms = ka({ DenseMatrix: Qr, divideScalar: Be, equalScalar: pe, matrix: gr, multiplyScalar: Ne, subtractScalar: Ke, typed: sr });
var _e = hi({ DenseMatrix: Qr, SparseMatrix: it, addScalar: Ve, concat: Qe, equalScalar: pe, matrix: gr, typed: sr });
var Q0 = ri({ BigNumber: at, DenseMatrix: Qr, Fraction: pn, concat: Qe, config: Xr, equalScalar: pe, matrix: gr, typed: sr });
var Te = gi({ addScalar: Ve, conj: mn, multiplyScalar: Ne, size: vn, typed: sr });
var G0 = ui({ DenseMatrix: Qr, smaller: Ct }), zi = si({ ImmutableDenseMatrix: G0, getMatrixDataType: _0 }), ut = ii({ DenseMatrix: Qr, concat: Qe, config: Xr, matrix: gr, typed: sr });
var jr = Ma({ addScalar: Ve, dot: Te, equalScalar: pe, matrix: gr, multiplyScalar: Ne, typed: sr });
var Y0 = wi({ SparseMatrix: it, abs: wt, add: _e, divideScalar: Be, larger: ut, largerEq: bs, multiply: jr, subtract: ue, transpose: hn, typed: sr }), re = Ga({ add: _e, matrix: gr, typed: sr, zeros: ot });
var $0 = ja({ DenseMatrix: Qr, divideScalar: Be, equalScalar: pe, matrix: gr, multiplyScalar: Ne, subtractScalar: Ke, typed: sr });
var J0 = ei({ compare: Q0, typed: sr });
var X0 = Fi({ divideScalar: Be, isZero: Es, matrix: gr, multiply: jr, subtractScalar: Ke, typed: sr, unaryMinus: Et });
var K0 = fi({ larger: ut, smaller: Ct });
var me = Di({ Index: zi, typed: sr });
var W0 = ai({ DenseMatrix: Qr, concat: Qe, config: Xr, matrix: gr, typed: sr });
var Dn = Za({ bignumber: Ni, matrix: gr, add: _e, config: Xr, isPositive: I0, larger: ut, largerEq: bs, smaller: Ct, smallerEq: W0, typed: sr });
var Oi = vi({ DenseMatrix: Qr, Index: zi, compareNatural: J0, size: vn, subset: re, typed: sr });
var H0 = ci({ FibonacciHeap: K0, addScalar: Ve, equalScalar: pe }), k0 = Oa({ Index: zi, matrix: gr, range: Dn, typed: sr }), Ss = bi({ abs: wt, addScalar: Ve, det: X0, divideScalar: Be, identity: We, matrix: gr, multiply: jr, typed: sr, unaryMinus: Et }), j0 = xi({ DenseMatrix: Qr, Spa: H0, SparseMatrix: it, abs: wt, addScalar: Ve, divideScalar: Be, equalScalar: pe, larger: ut, matrix: gr, multiplyScalar: Ne, subtractScalar: Ke, typed: sr, unaryMinus: Et });
var rm = Wa({ Complex: ln, config: Xr, fraction: Cs, identity: We, inv: Ss, matrix: gr, multiply: jr, number: _i, typed: sr });
var Ns = Ci({ DenseMatrix: Qr, lsolve: L0, lup: j0, matrix: gr, slu: Y0, typed: sr, usolve: Ms });
var em = Mi({ abs: wt, add: _e, addScalar: Ve, atan: N0, bignumber: Ni, column: k0, complex: Bi, config: Xr, cos: B0, diag: Ii, divideScalar: Be, dot: Te, equal: Fs, flatten: dn, im: T0, inv: Ss, larger: ut, matrix: gr, matrixFromColumns: Z0, multiply: jr, multiplyScalar: Ne, number: _i, qr: V0, re: z0, reshape: R0, sin: P0, size: vn, smaller: Ct, sqrt: Ti, subtract: ue, typed: sr, usolve: Ms, usolveAll: $0 });
var Ie = di({ abs: wt, add: _e, conj: mn, ctranspose: U0, eigs: em, equalScalar: pe, larger: ut, matrix: gr, multiply: jr, pow: rm, smaller: Ct, sqrt: Ti, typed: sr });
function Bs(r) {
  let e = { analysisType: 1, elasticities: /* @__PURE__ */ new Map(), areas: /* @__PURE__ */ new Map(), loads: /* @__PURE__ */ new Map(), supports: /* @__PURE__ */ new Map(), momentOfInertiaZs: /* @__PURE__ */ new Map(), momentOfInertiaYs: /* @__PURE__ */ new Map(), shearModuluses: /* @__PURE__ */ new Map(), torsionalConstants: /* @__PURE__ */ new Map(), distributedLoads: /* @__PURE__ */ new Map() };
  return r.forEach((t) => {
    var a;
    "area" in t && e.areas.set(t.element, t.area), "elasticity" in t && e.elasticities.set(t.element, t.elasticity), "load" in t && e.loads.set(t.node, t.load), "support" in t && e.supports.set(t.node, t.support), ((a = e.supports.values().next().value) == null ? void 0 : a.length) === 3 && (e.analysisType = 0), e.analysisType === 1 && ("momentOfInertiaZ" in t && e.momentOfInertiaZs.set(t.element, t.momentOfInertiaZ), "momentOfInertiaY" in t && e.momentOfInertiaYs.set(t.element, t.momentOfInertiaY), "torsionalConstant" in t && e.torsionalConstants.set(t.element, t.torsionalConstant), "shearModulus" in t && e.shearModuluses.set(t.element, t.shearModulus), "distributedLoad" in t && e.distributedLoads.set(t.element, t.distributedLoad));
  }), e;
}
function tm(r) {
  let e = [r[0] * 3, r[0] * 3 + 1, r[0] * 3 + 2], t = [r[1] * 3, r[1] * 3 + 1, r[1] * 3 + 2];
  return [...e, ...t];
}
function nm(r) {
  let e = [r[0] * 6, r[0] * 6 + 1, r[0] * 6 + 2, r[0] * 6 + 3, r[0] * 6 + 4, r[0] * 6 + 5], t = [r[1] * 6, r[1] * 6 + 1, r[1] * 6 + 2, r[1] * 6 + 3, r[1] * 6 + 4, r[1] * 6 + 5];
  return [...e, ...t];
}
var st = { 0: tm, 1: nm };
var Ft = (r, e, t) => [0, r * t / 2, e * t / 2, 0, -e * Ir(t, 2) / 12, r * Ir(t, 2) / 12, 0, r * t / 2, e * t / 2, 0, e * Ir(t, 2) / 12, -r * Ir(t, 2) / 12];
function am(r, e) {
  let t = [];
  return r.forEach((a, n) => {
    a[0] && t.push(n * 3), a[1] && t.push(n * 3 + 1), a[2] && t.push(n * 3 + 2);
  }), Oi(Dn(0, e), t);
}
function im(r, e) {
  let t = [];
  return r.forEach((a, n) => {
    a[0] && t.push(n * 6), a[1] && t.push(n * 6 + 1), a[2] && t.push(n * 6 + 2), a[3] && t.push(n * 6 + 3), a[4] && t.push(n * 6 + 4), a[5] && t.push(n * 6 + 5);
  }), Oi(Dn(0, e), t);
}
var _s = { 0: am, 1: im };
function om(r, e, t, a) {
  let n = r.areas.get(e) || 0, i = r.elasticities.get(e) || 0, l = a[0] / a[4], m = gr([[l, -1], [-1, l]]);
  return jr(m, i * n / t);
}
function um(r, e, t, a) {
  let n = r.momentOfInertiaZs.get(e) || 0, i = r.momentOfInertiaYs.get(e) || 0, l = r.elasticities.get(e) || 0, m = r.areas.get(e) || 0, f = r.shearModuluses.get(e) || 0, u = r.torsionalConstants.get(e) || 0, o = l * m / t, s = l * n / Ir(t, 3), p = l * i / Ir(t, 3), d = f * u / t, g = a[0], c = a[1];
  return gr([[o, 0, 0, 0, 0, 0, -o, 0, 0, 0, 0, 0], [0, 12 * s, 0, 0, 0, g * t * s, 0, -12 * s, 0, 0, 0, g * t * s], [0, 0, 12 * p, 0, -g * t * p, 0, 0, 0, -12 * p, 0, -g * t * p, 0], [0, 0, 0, d, 0, 0, 0, 0, 0, -d, 0, 0], [0, 0, -g * t * p, 0, 4 * p * Ir(t, c), 0, 0, 0, g * t * p, 0, c * p * Ir(t, c), 0], [0, g * t * s, 0, 0, 0, 4 * s * Ir(t, c), 0, -g * t * s, 0, 0, 0, c * s * Ir(t, c)], [-o, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0], [0, -12 * s, 0, 0, 0, -g * s * t, 0, 12 * s, 0, 0, 0, -g * s * t], [0, 0, -12 * p, 0, g * t * p, 0, 0, 0, 12 * p, 0, g * t * p, 0], [0, 0, 0, -d, 0, 0, 0, 0, 0, d, 0, 0], [0, 0, -g * t * p, 0, c * p * Ir(t, c), 0, 0, 0, g * t * p, 0, 4 * p * Ir(t, c), 0], [0, g * t * s, 0, 0, 0, c * s * Ir(t, c), 0, -g * t * s, 0, 0, 0, 4 * s * Ir(t, c)]]);
}
var An = { 0: om, 1: um };
function sm(r, e, t) {
  let a = ue(e, r), n = Ie(a), i = Te(a, gr([1, 0, 0])) / n, l = Te(a, gr([0, 1, 0])) / n, m = Te(a, gr([0, 0, 1])) / n, f = t[0] / t[4];
  return gr([[i * f, l, m * f, 0, 0, 0], [0, 0, 0, i, l * f, m]]);
}
function fm(r, e, t) {
  let a = ue(e, r), n = Ie(a), i = Te(a, gr([1, 0, 0])) / n, l = Te(a, gr([0, 1, 0])) / n, m = Te(a, gr([0, 0, 1])) / n, f = Math.sqrt(Ir(i, 2) + Ir(l, 2)), u = t[0] / t[4], o = gr([[i * u, l, m], [-l / f, i / f * u, 0], [-i * u * m / f, -l * m / f, f]]);
  return m === 1 && (o = gr([[0, 0, 1], [0, 1, 0], [-1, 0, 0]])), m === -1 && (o = gr([[0, 0, -1], [0, 1, 0], [1, 0, 0]])), gn(We(4), o);
}
var wn = { 0: sm, 1: fm };
function Ts(r, e, t, a) {
  let n = r.length * (t.analysisType === 0 ? 3 : 6), i = ot(n, n);
  e.forEach((d, g) => {
    let c = r[d[0]], v = r[d[1]], h = Ie(ue(v, c)), A = An[t.analysisType](t, g, h, a), x = wn[t.analysisType](c, v, a), E = jr(hn(x), jr(A, x)), w = st[t.analysisType](d), D = re(i, me(w, w));
    i = re(i, me(w, w), _e(D, E));
  });
  let l = ot([n]);
  t.loads.forEach((d, g) => {
    let c = { 0: [g * 3, g * 3 + 1, g * 3 + 2], 1: [g * 6, g * 6 + 1, g * 6 + 2, g * 6 + 3, g * 6 + 4, g * 6 + 5] }, v = re(l, me(c[t.analysisType]));
    l = re(l, me(c[t.analysisType]), _e(v, d));
  }), t.distributedLoads.forEach(([d, g], c) => {
    let v = e[c], h = r[v[0]], A = r[v[1]], x = Ie(ue(A, h)), E = me(st[t.analysisType](v)), w = re(l, E), D = Ft(d, g, x);
    l = re(l, E, _e(w, D));
  });
  let m = _s[t.analysisType](t.supports, n), f = re(l, me(m)), u = re(i, me(m, m)), o = Ns(u, f), s = re(ot(n), me(m), dn(o)), p = jr(i, s);
  return t.distributedLoads.forEach(([d, g], c) => {
    let v = e[c], h = r[v[0]], A = r[v[1]], x = Ie(ue(A, h)), E = me(st[t.analysisType](v)), w = re(p, E), D = Ft(d, g, x);
    p = re(p, E, ue(w, D));
  }), { deformations: s.toArray(), forces: p.toArray() };
}
var He = class extends Error {
};
He.prototype.name = "InvalidTokenError";
function cm(r) {
  return decodeURIComponent(atob(r).replace(/(.)/g, (e, t) => {
    let a = t.charCodeAt(0).toString(16).toUpperCase();
    return a.length < 2 && (a = "0" + a), "%" + a;
  }));
}
function lm(r) {
  let e = r.replace(/-/g, "+").replace(/_/g, "/");
  switch (e.length % 4) {
    case 0:
      break;
    case 2:
      e += "==";
      break;
    case 3:
      e += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return cm(e);
  } catch (t) {
    return atob(e);
  }
}
function Is(r, e) {
  if (typeof r != "string")
    throw new He("Invalid token specified: must be a string");
  e || (e = {});
  let t = e.header === true ? 0 : 1, a = r.split(".")[t];
  if (typeof a != "string")
    throw new He(`Invalid token specified: missing part #${t + 1}`);
  let n;
  try {
    n = lm(a);
  } catch (i) {
    throw new He(`Invalid token specified: invalid base64 for part #${t + 1} (${i.message})`);
  }
  try {
    return JSON.parse(n);
  } catch (i) {
    throw new He(`Invalid token specified: invalid json for part #${t + 1} (${i.message})`);
  }
}
(function(r, e) {
  let t = bt, a = r();
  for (; ; )
    try {
      if (-parseInt(t(292)) / 1 + parseInt(t(293)) / 2 * (parseInt(t(305)) / 3) + -parseInt(t(296)) / 4 + parseInt(t(301)) / 5 * (-parseInt(t(294)) / 6) + -parseInt(t(291)) / 7 * (parseInt(t(311)) / 8) + -parseInt(t(298)) / 9 * (parseInt(t(315)) / 10) + parseInt(t(299)) / 11 === e)
        break;
      a.push(a.shift());
    } catch (n) {
      a.push(a.shift());
    }
})(En, 925748);
function En() {
  let r = ["The license has expired. Please ensure you use this library with a valid license to obtain correct results. To make a purchase, contact mohamed@awatif.co", "6631208ivzNOE", "floor", "23994jhWaCN", "59998818xZomkD", "code1", "10RMDSXO", "code3", "toArray", "try {return this===window;}catch(e){ return false;}", "1231647YHWkVv", "code4", "You have reach the limit of 20 elements. Please ensure you use this library with a purchased license to obtain correct results. To make a purchase, contact mohamed@awatif.co", "22ur=_p(0JCN", "e>8Tz9%3r2O>", "code2", "1849360pYSnrW", "length", "undefined", "slice", "4740pzqUcj", "49yWdOxm", "398583EDoBPM", "6LpDUsD", "2466234rKHqla"];
  return En = function() {
    return r;
  }, En();
}
function zs(r) {
  let e = bt, t = new Function(e(304)), a = "", n = "undefined"[e(312)];
  if (typeof self !== e(313) && (a = (self == null ? void 0 : self.$k) || ""), typeof global !== e(313) && (a = global.$k || ""), r > n * 2.5 && !a) {
    let m = e(307);
    throw t() && alert(m), Error(m);
  }
  let i = a ? Is(a) : { code1: "58AbJ6(F'Atl", code2: e(308), code3: e(309), code4: "0x6782%50e3@", iat: 1, exp: 2 };
  if (parseInt(i[e(306)][e(314)](0, 6) + i[e(306)][e(314)](7, 11)) - Math[e(297)]((/* @__PURE__ */ new Date()).getTime() / 1e3) < n - 9) {
    let m = e(295);
    throw t() && alert(m), Error(m);
  }
  return pm(i);
}
function bt(r, e) {
  let t = En();
  return bt = function(a, n) {
    return a = a - 291, t[a];
  }, bt(r, e);
}
function pm(r) {
  let e = bt, t = [[Number(r[e(300)][5]), Number(r[e(310)][0])], [Number(r[e(302)][5]), Number(r[e(302)][9])]], a = gn(We(3), t);
  return Ii(a)[e(303)]();
}
function ab(r, e, t) {
  let a = zs(e.length), n = Bs(t), { deformations: i, forces: l } = Ts(r, e, n, a), m = [];
  return r.forEach((f, u) => {
    let o = { 0: [i[u * 3], i[u * 3 + 1], i[u * 3 + 2]], 1: [i[u * 6], i[u * 6 + 1], i[u * 6 + 2], i[u * 6 + 3], i[u * 6 + 4], i[u * 6 + 5]] };
    m.push({ node: u, deformation: o[n.analysisType] });
    let s = { 0: [l[u * 3], l[u * 3 + 1], l[u * 3 + 2]], 1: [l[u * 6], l[u * 6 + 1], l[u * 6 + 2], l[u * 6 + 3], l[u * 6 + 4], l[u * 6 + 5]] };
    n.supports.get(u) && m.push({ node: u, reaction: s[n.analysisType] });
  }), e.forEach((f, u) => {
    let o = r[f[0]], s = r[f[1]], p = Ie(ue(s, o)), d = re(i, me(st[n.analysisType](f))), g = wn[n.analysisType](o, s, a), c = jr(g, d), v = An[n.analysisType](n, u, p, a), h = jr(v, c).toArray();
    if (n.distributedLoads.get(u)) {
      let [x, E] = n.distributedLoads.get(u) || [0, 0], w = Ft(x, E, p);
      h = ue(h, w);
    }
    let A = { 0: { element: u, normal: [-h[0], -h[0]] }, 1: { element: u, normal: [h[0], h[6]], shearY: [h[1], h[7]], shearZ: [h[2], h[8]], torsion: [h[3], h[9]], bendingY: [h[4], h[10]], bendingZ: [h[5], h[11]] } };
    m.push(A[n.analysisType]);
  }), { default: m };
}
/*! Bundled license information:

complex.js/complex.js:
  (**
   * @license Complex.js v2.1.1 12/05/2020
   *
   * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **)

fraction.js/fraction.js:
  (**
   * @license Fraction.js v4.3.0 20/08/2023
   * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
   *
   * Copyright (c) 2023, Robert Eisele (robert@raw.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **)

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
export {
  ab as a
};
