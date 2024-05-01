import "./chunk-ZS7NZCD4.js";

// examples/node_modules/awatif-fem/dist/A6KC6G5S.js
var ks = Object.create;
var Po = Object.defineProperty;
var js = Object.getOwnPropertyDescriptor;
var rf = Object.getOwnPropertyNames;
var ef = Object.getPrototypeOf;
var tf = Object.prototype.hasOwnProperty;
var Tr = Math.pow;
var zt = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var nf = (r, e, t, a) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of rf(e))
      !tf.call(r, n) && n !== t && Po(r, n, { get: () => e[n], enumerable: !(a = js(e, n)) || a.enumerable });
  return r;
};
var Ot = (r, e, t) => (t = r != null ? ks(ef(r)) : {}, nf(e || !r || !r.__esModule ? Po(t, "default", { value: r, enumerable: true }) : t, r));
var vi = zt((Bn, _n) => {
  (function(r, e) {
    typeof Bn == "object" && typeof _n != "undefined" ? _n.exports = e() : typeof define == "function" && define.amd ? define(e) : (r = typeof globalThis != "undefined" ? globalThis : r || self, r.typed = e());
  })(Bn, function() {
    "use strict";
    function r(o, s) {
      var l = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!l) {
        if (Array.isArray(o) || (l = e(o)) || s && o && typeof o.length == "number") {
          l && (o = l);
          var m = 0, h = function() {
          };
          return { s: h, n: function() {
            return m >= o.length ? { done: true } : { done: false, value: o[m++] };
          }, e: function(x) {
            throw x;
          }, f: h };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var c = true, d = false, g;
      return { s: function() {
        l = l.call(o);
      }, n: function() {
        var x = l.next();
        return c = x.done, x;
      }, e: function(x) {
        d = true, g = x;
      }, f: function() {
        try {
          !c && l.return != null && l.return();
        } finally {
          if (d)
            throw g;
        }
      } };
    }
    function e(o, s) {
      if (o) {
        if (typeof o == "string")
          return t(o, s);
        var l = Object.prototype.toString.call(o).slice(8, -1);
        if (l === "Object" && o.constructor && (l = o.constructor.name), l === "Map" || l === "Set")
          return Array.from(o);
        if (l === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))
          return t(o, s);
      }
    }
    function t(o, s) {
      (s == null || s > o.length) && (s = o.length);
      for (var l = 0, m = new Array(s); l < s; l++)
        m[l] = o[l];
      return m;
    }
    function a(o) {
      "@babel/helpers - typeof";
      return a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
        return typeof s;
      } : function(s) {
        return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
      }, a(o);
    }
    function n() {
      return true;
    }
    function i() {
      return false;
    }
    function p() {
    }
    var v = "Argument is not a typed-function.";
    function f() {
      function o(N) {
        return a(N) === "object" && N !== null && N.constructor === Object;
      }
      var s = [{ name: "number", test: function(O) {
        return typeof O == "number";
      } }, { name: "string", test: function(O) {
        return typeof O == "string";
      } }, { name: "boolean", test: function(O) {
        return typeof O == "boolean";
      } }, { name: "Function", test: function(O) {
        return typeof O == "function";
      } }, { name: "Array", test: Array.isArray }, { name: "Date", test: function(O) {
        return O instanceof Date;
      } }, { name: "RegExp", test: function(O) {
        return O instanceof RegExp;
      } }, { name: "Object", test: o }, { name: "null", test: function(O) {
        return O === null;
      } }, { name: "undefined", test: function(O) {
        return O === void 0;
      } }], l = { name: "any", test: n, isAny: true }, m, h, c = 0, d = { createCount: 0 };
      function g(N) {
        var O = m.get(N);
        if (O)
          return O;
        var L = 'Unknown type "' + N + '"', J = N.toLowerCase(), k, j = r(h), tr;
        try {
          for (j.s(); !(tr = j.n()).done; )
            if (k = tr.value, k.toLowerCase() === J) {
              L += '. Did you mean "' + k + '" ?';
              break;
            }
        } catch (K) {
          j.e(K);
        } finally {
          j.f();
        }
        throw new TypeError(L);
      }
      function y(N) {
        for (var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any", L = O ? g(O).index : h.length, J = [], k = 0; k < N.length; ++k) {
          if (!N[k] || typeof N[k].name != "string" || typeof N[k].test != "function")
            throw new TypeError("Object with properties {name: string, test: function} expected");
          var j = N[k].name;
          if (m.has(j))
            throw new TypeError('Duplicate type name "' + j + '"');
          J.push(j), m.set(j, { name: j, test: N[k].test, isAny: N[k].isAny, index: L + k, conversionsTo: [] });
        }
        var tr = h.slice(L);
        h = h.slice(0, L).concat(J).concat(tr);
        for (var K = L + J.length; K < h.length; ++K)
          m.get(h[K]).index = K;
      }
      function x() {
        m = /* @__PURE__ */ new Map(), h = [], c = 0, y([l], false);
      }
      x(), y(s);
      function A() {
        var N, O = r(h), L;
        try {
          for (O.s(); !(L = O.n()).done; )
            N = L.value, m.get(N).conversionsTo = [];
        } catch (J) {
          O.e(J);
        } finally {
          O.f();
        }
        c = 0;
      }
      function C(N) {
        var O = h.filter(function(L) {
          var J = m.get(L);
          return !J.isAny && J.test(N);
        });
        return O.length ? O : ["any"];
      }
      function D(N) {
        return N && typeof N == "function" && "_typedFunctionData" in N;
      }
      function E(N, O, L) {
        if (!D(N))
          throw new TypeError(v);
        var J = L && L.exact, k = Array.isArray(O) ? O.join(",") : O, j = R(k), tr = w(j);
        if (!J || tr in N.signatures) {
          var K = N._typedFunctionData.signatureMap.get(tr);
          if (K)
            return K;
        }
        var rr = j.length, lr;
        if (J) {
          lr = [];
          var Er;
          for (Er in N.signatures)
            lr.push(N._typedFunctionData.signatureMap.get(Er));
        } else
          lr = N._typedFunctionData.signatures;
        for (var ar = 0; ar < rr; ++ar) {
          var ee = j[ar], Qr = [], Xr = void 0, Rr = r(lr), ie;
          try {
            for (Rr.s(); !(ie = Rr.n()).done; ) {
              Xr = ie.value;
              var Zr = Z(Xr.params, ar);
              if (!(!Zr || ee.restParam && !Zr.restParam)) {
                if (!Zr.hasAny) {
                  var me = function() {
                    var ue = z(Zr);
                    if (ee.types.some(function($e) {
                      return !ue.has($e.name);
                    }))
                      return "continue";
                  }();
                  if (me === "continue")
                    continue;
                }
                Qr.push(Xr);
              }
            }
          } catch (ue) {
            Rr.e(ue);
          } finally {
            Rr.f();
          }
          if (lr = Qr, lr.length === 0)
            break;
        }
        var te, ne = r(lr), Ye;
        try {
          for (ne.s(); !(Ye = ne.n()).done; )
            if (te = Ye.value, te.params.length <= rr)
              return te;
        } catch (ue) {
          ne.e(ue);
        } finally {
          ne.f();
        }
        throw new TypeError("Signature not found (signature: " + (N.name || "unnamed") + "(" + w(j, ", ") + "))");
      }
      function F(N, O, L) {
        return E(N, O, L).implementation;
      }
      function b(N, O) {
        var L = g(O);
        if (L.test(N))
          return N;
        var J = L.conversionsTo;
        if (J.length === 0)
          throw new Error("There are no conversions to " + O + " defined.");
        for (var k = 0; k < J.length; k++) {
          var j = g(J[k].from);
          if (j.test(N))
            return J[k].convert(N);
        }
        throw new Error("Cannot convert " + N + " to " + O);
      }
      function w(N) {
        var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
        return N.map(function(L) {
          return L.name;
        }).join(O);
      }
      function S(N) {
        var O = N.indexOf("...") === 0, L = O ? N.length > 3 ? N.slice(3) : "any" : N, J = L.split("|").map(function(K) {
          return g(K.trim());
        }), k = false, j = O ? "..." : "", tr = J.map(function(K) {
          return k = K.isAny || k, j += K.name + "|", { name: K.name, typeIndex: K.index, test: K.test, isAny: K.isAny, conversion: null, conversionIndex: -1 };
        });
        return { types: tr, name: j.slice(0, -1), hasAny: k, hasConversion: false, restParam: O };
      }
      function M(N) {
        var O = N.types.map(function(tr) {
          return tr.name;
        }), L = H(O), J = N.hasAny, k = N.name, j = L.map(function(tr) {
          var K = g(tr.from);
          return J = K.isAny || J, k += "|" + tr.from, { name: tr.from, typeIndex: K.index, test: K.test, isAny: K.isAny, conversion: tr, conversionIndex: tr.index };
        });
        return { types: N.types.concat(j), name: k, hasAny: J, hasConversion: j.length > 0, restParam: N.restParam };
      }
      function z(N) {
        return N.typeSet || (N.typeSet = /* @__PURE__ */ new Set(), N.types.forEach(function(O) {
          return N.typeSet.add(O.name);
        })), N.typeSet;
      }
      function R(N) {
        var O = [];
        if (typeof N != "string")
          throw new TypeError("Signatures must be strings");
        var L = N.trim();
        if (L === "")
          return O;
        for (var J = L.split(","), k = 0; k < J.length; ++k) {
          var j = S(J[k].trim());
          if (j.restParam && k !== J.length - 1)
            throw new SyntaxError('Unexpected rest parameter "' + J[k] + '": only allowed for the last parameter');
          if (j.types.length === 0)
            return null;
          O.push(j);
        }
        return O;
      }
      function I(N) {
        var O = yr(N);
        return O ? O.restParam : false;
      }
      function B(N) {
        if (!N || N.types.length === 0)
          return n;
        if (N.types.length === 1)
          return g(N.types[0].name).test;
        if (N.types.length === 2) {
          var O = g(N.types[0].name).test, L = g(N.types[1].name).test;
          return function(j) {
            return O(j) || L(j);
          };
        } else {
          var J = N.types.map(function(k) {
            return g(k.name).test;
          });
          return function(j) {
            for (var tr = 0; tr < J.length; tr++)
              if (J[tr](j))
                return true;
            return false;
          };
        }
      }
      function Q(N) {
        var O, L, J;
        if (I(N)) {
          O = fr(N).map(B);
          var k = O.length, j = B(yr(N)), tr = function(rr) {
            for (var lr = k; lr < rr.length; lr++)
              if (!j(rr[lr]))
                return false;
            return true;
          };
          return function(rr) {
            for (var lr = 0; lr < O.length; lr++)
              if (!O[lr](rr[lr]))
                return false;
            return tr(rr) && rr.length >= k + 1;
          };
        } else
          return N.length === 0 ? function(rr) {
            return rr.length === 0;
          } : N.length === 1 ? (L = B(N[0]), function(rr) {
            return L(rr[0]) && rr.length === 1;
          }) : N.length === 2 ? (L = B(N[0]), J = B(N[1]), function(rr) {
            return L(rr[0]) && J(rr[1]) && rr.length === 2;
          }) : (O = N.map(B), function(rr) {
            for (var lr = 0; lr < O.length; lr++)
              if (!O[lr](rr[lr]))
                return false;
            return rr.length === O.length;
          });
      }
      function Z(N, O) {
        return O < N.length ? N[O] : I(N) ? yr(N) : null;
      }
      function _(N, O) {
        var L = Z(N, O);
        return L ? z(L) : /* @__PURE__ */ new Set();
      }
      function T(N) {
        return N.conversion === null || N.conversion === void 0;
      }
      function U(N, O) {
        var L = /* @__PURE__ */ new Set();
        return N.forEach(function(J) {
          var k = _(J.params, O), j, tr = r(k), K;
          try {
            for (tr.s(); !(K = tr.n()).done; )
              j = K.value, L.add(j);
          } catch (rr) {
            tr.e(rr);
          } finally {
            tr.f();
          }
        }), L.has("any") ? ["any"] : Array.from(L);
      }
      function W(N, O, L) {
        var J, k, j = N || "unnamed", tr = L, K, rr = function() {
          var Rr = [];
          if (tr.forEach(function(Zr) {
            var me = Z(Zr.params, K), te = B(me);
            (K < Zr.params.length || I(Zr.params)) && te(O[K]) && Rr.push(Zr);
          }), Rr.length === 0) {
            if (k = U(tr, K), k.length > 0) {
              var ie = C(O[K]);
              return J = new TypeError("Unexpected type of argument in function " + j + " (expected: " + k.join(" or ") + ", actual: " + ie.join(" | ") + ", index: " + K + ")"), J.data = { category: "wrongType", fn: j, index: K, actual: ie, expected: k }, { v: J };
            }
          } else
            tr = Rr;
        };
        for (K = 0; K < O.length; K++) {
          var lr = rr();
          if (a(lr) === "object")
            return lr.v;
        }
        var Er = tr.map(function(Xr) {
          return I(Xr.params) ? 1 / 0 : Xr.params.length;
        });
        if (O.length < Math.min.apply(null, Er))
          return k = U(tr, K), J = new TypeError("Too few arguments in function " + j + " (expected: " + k.join(" or ") + ", index: " + O.length + ")"), J.data = { category: "tooFewArgs", fn: j, index: O.length, expected: k }, J;
        var ar = Math.max.apply(null, Er);
        if (O.length > ar)
          return J = new TypeError("Too many arguments in function " + j + " (expected: " + ar + ", actual: " + O.length + ")"), J.data = { category: "tooManyArgs", fn: j, index: O.length, expectedLength: ar }, J;
        for (var ee = [], Qr = 0; Qr < O.length; ++Qr)
          ee.push(C(O[Qr]).join("|"));
        return J = new TypeError('Arguments of type "' + ee.join(", ") + '" do not match any of the defined signatures of function ' + j + "."), J.data = { category: "mismatch", actual: ee }, J;
      }
      function V(N) {
        for (var O = h.length + 1, L = 0; L < N.types.length; L++)
          T(N.types[L]) && (O = Math.min(O, N.types[L].typeIndex));
        return O;
      }
      function q(N) {
        for (var O = c + 1, L = 0; L < N.types.length; L++)
          T(N.types[L]) || (O = Math.min(O, N.types[L].conversionIndex));
        return O;
      }
      function G(N, O) {
        if (N.hasAny) {
          if (!O.hasAny)
            return 1;
        } else if (O.hasAny)
          return -1;
        if (N.restParam) {
          if (!O.restParam)
            return 1;
        } else if (O.restParam)
          return -1;
        if (N.hasConversion) {
          if (!O.hasConversion)
            return 1;
        } else if (O.hasConversion)
          return -1;
        var L = V(N) - V(O);
        if (L < 0)
          return -1;
        if (L > 0)
          return 1;
        var J = q(N) - q(O);
        return J < 0 ? -1 : J > 0 ? 1 : 0;
      }
      function $(N, O) {
        var L = N.params, J = O.params, k = yr(L), j = yr(J), tr = I(L), K = I(J);
        if (tr && k.hasAny) {
          if (!K || !j.hasAny)
            return 1;
        } else if (K && j.hasAny)
          return -1;
        var rr = 0, lr = 0, Er, ar = r(L), ee;
        try {
          for (ar.s(); !(ee = ar.n()).done; )
            Er = ee.value, Er.hasAny && ++rr, Er.hasConversion && ++lr;
        } catch (vt) {
          ar.e(vt);
        } finally {
          ar.f();
        }
        var Qr = 0, Xr = 0, Rr = r(J), ie;
        try {
          for (Rr.s(); !(ie = Rr.n()).done; )
            Er = ie.value, Er.hasAny && ++Qr, Er.hasConversion && ++Xr;
        } catch (vt) {
          Rr.e(vt);
        } finally {
          Rr.f();
        }
        if (rr !== Qr)
          return rr - Qr;
        if (tr && k.hasConversion) {
          if (!K || !j.hasConversion)
            return 1;
        } else if (K && j.hasConversion)
          return -1;
        if (lr !== Xr)
          return lr - Xr;
        if (tr) {
          if (!K)
            return 1;
        } else if (K)
          return -1;
        var Zr = (L.length - J.length) * (tr ? -1 : 1);
        if (Zr !== 0)
          return Zr;
        for (var me = [], te = 0, ne = 0; ne < L.length; ++ne) {
          var Ye = G(L[ne], J[ne]);
          me.push(Ye), te += Ye;
        }
        if (te !== 0)
          return te;
        for (var ue, $e = 0, _t = me; $e < _t.length; $e++)
          if (ue = _t[$e], ue !== 0)
            return ue;
        return 0;
      }
      function H(N) {
        if (N.length === 0)
          return [];
        var O = N.map(g);
        N.length > 1 && O.sort(function(rr, lr) {
          return rr.index - lr.index;
        });
        var L = O[0].conversionsTo;
        if (N.length === 1)
          return L;
        L = L.concat([]);
        for (var J = new Set(N), k = 1; k < O.length; ++k) {
          var j = void 0, tr = r(O[k].conversionsTo), K;
          try {
            for (tr.s(); !(K = tr.n()).done; )
              j = K.value, J.has(j.from) || (L.push(j), J.add(j.from));
          } catch (rr) {
            tr.e(rr);
          } finally {
            tr.f();
          }
        }
        return L;
      }
      function er(N, O) {
        var L = O;
        if (N.some(function(K) {
          return K.hasConversion;
        })) {
          var J = I(N), k = N.map(nr);
          L = function() {
            for (var rr = [], lr = J ? arguments.length - 1 : arguments.length, Er = 0; Er < lr; Er++)
              rr[Er] = k[Er](arguments[Er]);
            return J && (rr[lr] = arguments[lr].map(k[lr])), O.apply(this, rr);
          };
        }
        var j = L;
        if (I(N)) {
          var tr = N.length - 1;
          j = function() {
            return L.apply(this, br(arguments, 0, tr).concat([br(arguments, tr)]));
          };
        }
        return j;
      }
      function nr(N) {
        var O, L, J, k, j = [], tr = [];
        switch (N.types.forEach(function(K) {
          K.conversion && (j.push(g(K.conversion.from).test), tr.push(K.conversion.convert));
        }), tr.length) {
          case 0:
            return function(rr) {
              return rr;
            };
          case 1:
            return O = j[0], J = tr[0], function(rr) {
              return O(rr) ? J(rr) : rr;
            };
          case 2:
            return O = j[0], L = j[1], J = tr[0], k = tr[1], function(rr) {
              return O(rr) ? J(rr) : L(rr) ? k(rr) : rr;
            };
          default:
            return function(rr) {
              for (var lr = 0; lr < tr.length; lr++)
                if (j[lr](rr))
                  return tr[lr](rr);
              return rr;
            };
        }
      }
      function Y(N) {
        function O(L, J, k) {
          if (J < L.length) {
            var j = L[J], tr = [];
            if (j.restParam) {
              var K = j.types.filter(T);
              K.length < j.types.length && tr.push({ types: K, name: "..." + K.map(function(rr) {
                return rr.name;
              }).join("|"), hasAny: K.some(function(rr) {
                return rr.isAny;
              }), hasConversion: false, restParam: true }), tr.push(j);
            } else
              tr = j.types.map(function(rr) {
                return { types: [rr], name: rr.name, hasAny: rr.isAny, hasConversion: rr.conversion, restParam: false };
              });
            return Pr(tr, function(rr) {
              return O(L, J + 1, k.concat([rr]));
            });
          } else
            return [k];
        }
        return O(N, 0, []);
      }
      function Dr(N, O) {
        for (var L = Math.max(N.length, O.length), J = 0; J < L; J++) {
          var k = _(N, J), j = _(O, J), tr = false, K = void 0, rr = r(j), lr;
          try {
            for (rr.s(); !(lr = rr.n()).done; )
              if (K = lr.value, k.has(K)) {
                tr = true;
                break;
              }
          } catch (Xr) {
            rr.e(Xr);
          } finally {
            rr.f();
          }
          if (!tr)
            return false;
        }
        var Er = N.length, ar = O.length, ee = I(N), Qr = I(O);
        return ee ? Qr ? Er === ar : ar >= Er : Qr ? Er >= ar : Er === ar;
      }
      function cr(N) {
        return N.map(function(O) {
          return Me(O) ? Jr(O.referToSelf.callback) : Ae(O) ? ve(O.referTo.references, O.referTo.callback) : O;
        });
      }
      function or(N, O, L) {
        var J = [], k, j = r(N), tr;
        try {
          for (j.s(); !(tr = j.n()).done; ) {
            k = tr.value;
            var K = L[k];
            if (typeof K != "number")
              throw new TypeError('No definition for referenced signature "' + k + '"');
            if (K = O[K], typeof K != "function")
              return false;
            J.push(K);
          }
        } catch (rr) {
          j.e(rr);
        } finally {
          j.f();
        }
        return J;
      }
      function ir(N, O, L) {
        for (var J = cr(N), k = new Array(J.length).fill(false), j = true; j; ) {
          j = false;
          for (var tr = true, K = 0; K < J.length; ++K)
            if (!k[K]) {
              var rr = J[K];
              if (Me(rr))
                J[K] = rr.referToSelf.callback(L), J[K].referToSelf = rr.referToSelf, k[K] = true, tr = false;
              else if (Ae(rr)) {
                var lr = or(rr.referTo.references, J, O);
                lr ? (J[K] = rr.referTo.callback.apply(this, lr), J[K].referTo = rr.referTo, k[K] = true, tr = false) : j = true;
              }
            }
          if (tr && j)
            throw new SyntaxError("Circular reference detected in resolving typed.referTo");
        }
        return J;
      }
      function xr(N) {
        var O = /\bthis(\(|\.signatures\b)/;
        Object.keys(N).forEach(function(L) {
          var J = N[L];
          if (O.test(J.toString()))
            throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
        });
      }
      function Ar(N, O) {
        if (d.createCount++, Object.keys(O).length === 0)
          throw new SyntaxError("No signatures provided");
        d.warnAgainstDeprecatedThis && xr(O);
        var L = [], J = [], k = {}, j = [], tr, K = function() {
          if (!Object.prototype.hasOwnProperty.call(O, tr))
            return "continue";
          var Gr = R(tr);
          if (!Gr)
            return "continue";
          L.forEach(function(et) {
            if (Dr(et, Gr))
              throw new TypeError('Conflicting signatures "' + w(et) + '" and "' + w(Gr) + '".');
          }), L.push(Gr);
          var Io = J.length;
          J.push(O[tr]);
          var Hs = Gr.map(M), Tt = void 0, It = r(Y(Hs)), zo;
          try {
            for (It.s(); !(zo = It.n()).done; ) {
              Tt = zo.value;
              var Oo = w(Tt);
              j.push({ params: Tt, name: Oo, fn: Io }), Tt.every(function(et) {
                return !et.hasConversion;
              }) && (k[Oo] = Io);
            }
          } catch (et) {
            It.e(et);
          } finally {
            It.f();
          }
        };
        for (tr in O)
          var rr = K();
        j.sort($);
        var lr = ir(J, k, ht), Er;
        for (Er in k)
          Object.prototype.hasOwnProperty.call(k, Er) && (k[Er] = lr[k[Er]]);
        for (var ar = [], ee = /* @__PURE__ */ new Map(), Qr = 0, Xr = j; Qr < Xr.length; Qr++)
          Er = Xr[Qr], ee.has(Er.name) || (Er.fn = lr[Er.fn], ar.push(Er), ee.set(Er.name, Er));
        for (var Rr = ar[0] && ar[0].params.length <= 2 && !I(ar[0].params), ie = ar[1] && ar[1].params.length <= 2 && !I(ar[1].params), Zr = ar[2] && ar[2].params.length <= 2 && !I(ar[2].params), me = ar[3] && ar[3].params.length <= 2 && !I(ar[3].params), te = ar[4] && ar[4].params.length <= 2 && !I(ar[4].params), ne = ar[5] && ar[5].params.length <= 2 && !I(ar[5].params), Ye = Rr && ie && Zr && me && te && ne, ue = 0; ue < ar.length; ++ue)
          ar[ue].test = Q(ar[ue].params);
        for (var $e = Rr ? B(ar[0].params[0]) : i, _t = ie ? B(ar[1].params[0]) : i, vt = Zr ? B(ar[2].params[0]) : i, Fs = me ? B(ar[3].params[0]) : i, bs = te ? B(ar[4].params[0]) : i, Ms = ne ? B(ar[5].params[0]) : i, Ss = Rr ? B(ar[0].params[1]) : i, Ns = ie ? B(ar[1].params[1]) : i, Bs = Zr ? B(ar[2].params[1]) : i, _s = me ? B(ar[3].params[1]) : i, Ts = te ? B(ar[4].params[1]) : i, Is = ne ? B(ar[5].params[1]) : i, mt = 0; mt < ar.length; ++mt)
          ar[mt].implementation = er(ar[mt].params, ar[mt].fn);
        var zs = Rr ? ar[0].implementation : p, Os = ie ? ar[1].implementation : p, Ps = Zr ? ar[2].implementation : p, Rs = me ? ar[3].implementation : p, qs = te ? ar[4].implementation : p, Us = ne ? ar[5].implementation : p, Ls = Rr ? ar[0].params.length : -1, Zs = ie ? ar[1].params.length : -1, Vs = Zr ? ar[2].params.length : -1, Qs = me ? ar[3].params.length : -1, Gs = te ? ar[4].params.length : -1, Ys = ne ? ar[5].params.length : -1, $s = Ye ? 6 : 0, Js = ar.length, Xs = ar.map(function(pe) {
          return pe.test;
        }), Ks = ar.map(function(pe) {
          return pe.implementation;
        }), Ws = function() {
          for (var Gr = $s; Gr < Js; Gr++)
            if (Xs[Gr](arguments))
              return Ks[Gr].apply(this, arguments);
          return d.onMismatch(N, arguments, ar);
        };
        function ht(pe, Gr) {
          return arguments.length === Ls && $e(pe) && Ss(Gr) ? zs.apply(this, arguments) : arguments.length === Zs && _t(pe) && Ns(Gr) ? Os.apply(this, arguments) : arguments.length === Vs && vt(pe) && Bs(Gr) ? Ps.apply(this, arguments) : arguments.length === Qs && Fs(pe) && _s(Gr) ? Rs.apply(this, arguments) : arguments.length === Gs && bs(pe) && Ts(Gr) ? qs.apply(this, arguments) : arguments.length === Ys && Ms(pe) && Is(Gr) ? Us.apply(this, arguments) : Ws.apply(this, arguments);
        }
        try {
          Object.defineProperty(ht, "name", { value: N });
        } catch (pe) {
        }
        return ht.signatures = k, ht._typedFunctionData = { signatures: ar, signatureMap: ee }, ht;
      }
      function Cr(N, O, L) {
        throw W(N, O, L);
      }
      function fr(N) {
        return br(N, 0, N.length - 1);
      }
      function yr(N) {
        return N[N.length - 1];
      }
      function br(N, O, L) {
        return Array.prototype.slice.call(N, O, L);
      }
      function Or(N, O) {
        for (var L = 0; L < N.length; L++)
          if (O(N[L]))
            return N[L];
      }
      function Pr(N, O) {
        return Array.prototype.concat.apply([], N.map(O));
      }
      function re() {
        var N = fr(arguments).map(function(L) {
          return w(R(L));
        }), O = yr(arguments);
        if (typeof O != "function")
          throw new TypeError("Callback function expected as last argument");
        return ve(N, O);
      }
      function ve(N, O) {
        return { referTo: { references: N, callback: O } };
      }
      function Jr(N) {
        if (typeof N != "function")
          throw new TypeError("Callback function expected as first argument");
        return { referToSelf: { callback: N } };
      }
      function Ae(N) {
        return N && a(N.referTo) === "object" && Array.isArray(N.referTo.references) && typeof N.referTo.callback == "function";
      }
      function Me(N) {
        return N && a(N.referToSelf) === "object" && typeof N.referToSelf.callback == "function";
      }
      function Ee(N, O) {
        if (!N)
          return O;
        if (O && O !== N) {
          var L = new Error("Function names do not match (expected: " + N + ", actual: " + O + ")");
          throw L.data = { actual: O, expected: N }, L;
        }
        return N;
      }
      function Bt(N) {
        var O;
        for (var L in N)
          Object.prototype.hasOwnProperty.call(N, L) && (D(N[L]) || typeof N[L].signature == "string") && (O = Ee(O, N[L].name));
        return O;
      }
      function Sn(N, O) {
        var L;
        for (L in O)
          if (Object.prototype.hasOwnProperty.call(O, L)) {
            if (L in N && O[L] !== N[L]) {
              var J = new Error('Signature "' + L + '" is defined twice');
              throw J.data = { signature: L, sourceFunction: O[L], destFunction: N[L] }, J;
            }
            N[L] = O[L];
          }
      }
      var pt = d;
      d = function(O) {
        for (var L = typeof O == "string", J = L ? 1 : 0, k = L ? O : "", j = {}, tr = J; tr < arguments.length; ++tr) {
          var K = arguments[tr], rr = {}, lr = void 0;
          if (typeof K == "function" ? (lr = K.name, typeof K.signature == "string" ? rr[K.signature] = K : D(K) && (rr = K.signatures)) : o(K) && (rr = K, L || (lr = Bt(K))), Object.keys(rr).length === 0) {
            var Er = new TypeError("Argument to 'typed' at index " + tr + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
            throw Er.data = { index: tr, argument: K }, Er;
          }
          L || (k = Ee(k, lr)), Sn(j, rr);
        }
        return Ar(k || "", j);
      }, d.create = f, d.createCount = pt.createCount, d.onMismatch = Cr, d.throwMismatchError = Cr, d.createError = W, d.clear = x, d.clearConversions = A, d.addTypes = y, d._findType = g, d.referTo = re, d.referToSelf = Jr, d.convert = b, d.findSignature = E, d.find = F, d.isTypedFunction = D, d.warnAgainstDeprecatedThis = true, d.addType = function(N, O) {
        var L = "any";
        O !== false && m.has("Object") && (L = "Object"), d.addTypes([N], L);
      };
      function To(N) {
        if (!N || typeof N.from != "string" || typeof N.to != "string" || typeof N.convert != "function")
          throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
        if (N.to === N.from)
          throw new SyntaxError('Illegal to define conversion from "' + N.from + '" to itself.');
      }
      return d.addConversion = function(N) {
        To(N);
        var O = g(N.to);
        if (O.conversionsTo.every(function(L) {
          return L.from !== N.from;
        }))
          O.conversionsTo.push({ from: N.from, convert: N.convert, index: c++ });
        else
          throw new Error('There is already a conversion from "' + N.from + '" to "' + O.name + '"');
      }, d.addConversions = function(N) {
        N.forEach(d.addConversion);
      }, d.removeConversion = function(N) {
        To(N);
        var O = g(N.to), L = Or(O.conversionsTo, function(k) {
          return k.from === N.from;
        });
        if (!L)
          throw new Error("Attempt to remove nonexistent conversion from " + N.from + " to " + N.to);
        if (L.convert !== N.convert)
          throw new Error("Conversion to remove does not match existing conversion");
        var J = O.conversionsTo.indexOf(L);
        O.conversionsTo.splice(J, 1);
      }, d.resolve = function(N, O) {
        if (!D(N))
          throw new TypeError(v);
        for (var L = N._typedFunctionData.signatures, J = 0; J < L.length; ++J)
          if (L[J].test(O))
            return L[J];
        return null;
      }, d;
    }
    var u = f();
    return u;
  });
});
var Wi = zt((Hn, Ki) => {
  (function(r) {
    "use strict";
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
      var s = Math.abs(u), l = Math.abs(o);
      return s < 3e3 && l < 3e3 ? Math.sqrt(s * s + l * l) : (s < l ? (s = l, l = u / o) : l = o / u, s * Math.sqrt(1 + l * l));
    }, i = function() {
      throw SyntaxError("Invalid Param");
    };
    function p(u, o) {
      var s = Math.abs(u), l = Math.abs(o);
      return u === 0 ? Math.log(l) : o === 0 ? Math.log(s) : s < 3e3 && l < 3e3 ? Math.log(u * u + o * o) * 0.5 : (u = u / 2, o = o / 2, 0.5 * Math.log(u * u + o * o) + Math.LN2);
    }
    var v = function(u, o) {
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
            var l = u.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), m = 1, h = 0;
            l === null && i();
            for (var c = 0; c < l.length; c++) {
              var d = l[c];
              d === " " || d === "	" || d === `
` || (d === "+" ? m++ : d === "-" ? h++ : d === "i" || d === "I" ? (m + h === 0 && i(), l[c + 1] !== " " && !isNaN(l[c + 1]) ? (s.im += parseFloat((h % 2 ? "-" : "") + l[c + 1]), c++) : s.im += parseFloat((h % 2 ? "-" : "") + "1"), m = h = 0) : ((m + h === 0 || isNaN(d)) && i(), l[c + 1] === "i" || l[c + 1] === "I" ? (s.im += parseFloat((h % 2 ? "-" : "") + d), c++) : s.re += parseFloat((h % 2 ? "-" : "") + d), m = h = 0));
            }
            m + h > 0 && i();
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
      var s = v(u, o);
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
      var l = s.re, m = s.im, h, c;
      return m === 0 ? new f(u / l, o / l) : Math.abs(l) < Math.abs(m) ? (c = l / m, h = l * c + m, new f((u * c + o) / h, (o * c - u) / h)) : (c = m / l, h = m * c + l, new f((u + o * c) / h, (o - u * c) / h));
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
      var l = Math.atan2(o, u), m = p(u, o);
      return u = Math.exp(s.re * m - s.im * l), o = s.im * m + s.re * l, new f(u * Math.cos(o), u * Math.sin(o));
    }, sqrt: function() {
      var u = this.re, o = this.im, s = this.abs(), l, m;
      if (u >= 0) {
        if (o === 0)
          return new f(Math.sqrt(u), 0);
        l = 0.5 * Math.sqrt(2 * (s + u));
      } else
        l = Math.abs(o) / Math.sqrt(2 * (s - u));
      return u <= 0 ? m = 0.5 * Math.sqrt(2 * (s - u)) : m = Math.abs(o) / Math.sqrt(2 * (s + u)), new f(l, o < 0 ? -m : m);
    }, exp: function() {
      var u = Math.exp(this.re);
      return this.im, new f(u * Math.cos(this.im), u * Math.sin(this.im));
    }, expm1: function() {
      var u = this.re, o = this.im;
      return new f(Math.expm1(u) * Math.cos(o) + a(o), Math.exp(u) * Math.sin(o));
    }, log: function() {
      var u = this.re, o = this.im;
      return o === 0 && u > 0, new f(p(u, o), Math.atan2(o, u));
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
      var u = this.re, o = this.im, s = new f(o * o - u * u + 1, -2 * u * o).sqrt(), l = new f(s.re - o, s.im + u).log();
      return new f(l.im, -l.re);
    }, acos: function() {
      var u = this.re, o = this.im, s = new f(o * o - u * u + 1, -2 * u * o).sqrt(), l = new f(s.re - o, s.im + u).log();
      return new f(Math.PI / 2 - l.im, l.re);
    }, atan: function() {
      var u = this.re, o = this.im;
      if (u === 0) {
        if (o === 1)
          return new f(0, 1 / 0);
        if (o === -1)
          return new f(0, -1 / 0);
      }
      var s = u * u + (1 - o) * (1 - o), l = new f((1 - o * o - u * u) / s, -2 * u / s).log();
      return new f(-0.5 * l.im, 0.5 * l.re);
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
      var u = this.re, o = this.im, s = u > 1 && o === 0, l = 1 - u, m = 1 + u, h = l * l + o * o, c = h !== 0 ? new f((m * l - o * o) / h, (o * l + m * o) / h) : new f(u !== -1 ? u / 0 : 0, o !== 0 ? o / 0 : 0), d = c.re;
      return c.re = p(c.re, c.im) / 2, c.im = Math.atan2(c.im, d) / 2, s && (c.im = -c.im), c;
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
    }) : typeof Hn == "object" ? (Object.defineProperty(f, "__esModule", { value: true }), f.default = f, f.Complex = f, Ki.exports = f) : r.Complex = f;
  })(Hn);
});
var ki = zt((jn, Hi) => {
  (function(r) {
    "use strict";
    var e = 2e3, t = { s: 1, n: 0, d: 1 };
    function a(l, m) {
      if (isNaN(l = parseInt(l, 10)))
        throw s.InvalidParameter;
      return l * m;
    }
    function n(l, m) {
      if (m === 0)
        throw s.DivisionByZero;
      var h = Object.create(s.prototype);
      h.s = l < 0 ? -1 : 1, l = l < 0 ? -l : l;
      var c = o(l, m);
      return h.n = l / c, h.d = m / c, h;
    }
    function i(l) {
      for (var m = {}, h = l, c = 2, d = 4; d <= h; ) {
        for (; h % c === 0; )
          h /= c, m[c] = (m[c] || 0) + 1;
        d += 1 + 2 * c++;
      }
      return h !== l ? h > 1 && (m[h] = (m[h] || 0) + 1) : m[l] = (m[l] || 0) + 1, m;
    }
    var p = function(l, m) {
      var h = 0, c = 1, d = 1, g = 0, y = 0, x = 0, A = 1, C = 1, D = 0, E = 1, F = 1, b = 1, w = 1e7, S;
      if (l != null)
        if (m !== void 0) {
          if (h = l, c = m, d = h * c, h % 1 !== 0 || c % 1 !== 0)
            throw s.NonIntegerParameter;
        } else
          switch (typeof l) {
            case "object": {
              if ("d" in l && "n" in l)
                h = l.n, c = l.d, "s" in l && (h *= l.s);
              else if (0 in l)
                h = l[0], 1 in l && (c = l[1]);
              else
                throw s.InvalidParameter;
              d = h * c;
              break;
            }
            case "number": {
              if (l < 0 && (d = l, l = -l), l % 1 === 0)
                h = l;
              else if (l > 0) {
                for (l >= 1 && (C = Math.pow(10, Math.floor(1 + Math.log(l) / Math.LN10)), l /= C); E <= w && b <= w; )
                  if (S = (D + F) / (E + b), l === S) {
                    E + b <= w ? (h = D + F, c = E + b) : b > E ? (h = F, c = b) : (h = D, c = E);
                    break;
                  } else
                    l > S ? (D += F, E += b) : (F += D, b += E), E > w ? (h = F, c = b) : (h = D, c = E);
                h *= C;
              } else
                (isNaN(l) || isNaN(m)) && (c = h = NaN);
              break;
            }
            case "string": {
              if (E = l.match(/\d+|./g), E === null)
                throw s.InvalidParameter;
              if (E[D] === "-" ? (d = -1, D++) : E[D] === "+" && D++, E.length === D + 1 ? y = a(E[D++], d) : E[D + 1] === "." || E[D] === "." ? (E[D] !== "." && (g = a(E[D++], d)), D++, (D + 1 === E.length || E[D + 1] === "(" && E[D + 3] === ")" || E[D + 1] === "'" && E[D + 3] === "'") && (y = a(E[D], d), A = Math.pow(10, E[D].length), D++), (E[D] === "(" && E[D + 2] === ")" || E[D] === "'" && E[D + 2] === "'") && (x = a(E[D + 1], d), C = Math.pow(10, E[D + 1].length) - 1, D += 3)) : E[D + 1] === "/" || E[D + 1] === ":" ? (y = a(E[D], d), A = a(E[D + 2], 1), D += 3) : E[D + 3] === "/" && E[D + 1] === " " && (g = a(E[D], d), y = a(E[D + 2], d), A = a(E[D + 4], 1), D += 5), E.length <= D) {
                c = A * C, d = h = x + c * g + C * y;
                break;
              }
            }
            default:
              throw s.InvalidParameter;
          }
      if (c === 0)
        throw s.DivisionByZero;
      t.s = d < 0 ? -1 : 1, t.n = Math.abs(h), t.d = Math.abs(c);
    };
    function v(l, m, h) {
      for (var c = 1; m > 0; l = l * l % h, m >>= 1)
        m & 1 && (c = c * l % h);
      return c;
    }
    function f(l, m) {
      for (; m % 2 === 0; m /= 2)
        ;
      for (; m % 5 === 0; m /= 5)
        ;
      if (m === 1)
        return 0;
      for (var h = 10 % m, c = 1; h !== 1; c++)
        if (h = h * 10 % m, c > e)
          return 0;
      return c;
    }
    function u(l, m, h) {
      for (var c = 1, d = v(10, h, m), g = 0; g < 300; g++) {
        if (c === d)
          return g;
        c = c * 10 % m, d = d * 10 % m;
      }
      return 0;
    }
    function o(l, m) {
      if (!l)
        return m;
      if (!m)
        return l;
      for (; ; ) {
        if (l %= m, !l)
          return m;
        if (m %= l, !m)
          return l;
      }
    }
    function s(l, m) {
      if (p(l, m), this instanceof s)
        l = o(t.d, t.n), this.s = t.s, this.n = t.n / l, this.d = t.d / l;
      else
        return n(t.s * t.n, t.d);
    }
    s.DivisionByZero = new Error("Division by Zero"), s.InvalidParameter = new Error("Invalid argument"), s.NonIntegerParameter = new Error("Parameters must be integer"), s.prototype = { s: 1, n: 0, d: 1, abs: function() {
      return n(this.n, this.d);
    }, neg: function() {
      return n(-this.s * this.n, this.d);
    }, add: function(l, m) {
      return p(l, m), n(this.s * this.n * t.d + t.s * this.d * t.n, this.d * t.d);
    }, sub: function(l, m) {
      return p(l, m), n(this.s * this.n * t.d - t.s * this.d * t.n, this.d * t.d);
    }, mul: function(l, m) {
      return p(l, m), n(this.s * t.s * this.n * t.n, this.d * t.d);
    }, div: function(l, m) {
      return p(l, m), n(this.s * t.s * this.n * t.d, this.d * t.n);
    }, clone: function() {
      return n(this.s * this.n, this.d);
    }, mod: function(l, m) {
      if (isNaN(this.n) || isNaN(this.d))
        return new s(NaN);
      if (l === void 0)
        return n(this.s * this.n % this.d, 1);
      if (p(l, m), t.n === 0 && this.d === 0)
        throw s.DivisionByZero;
      return n(this.s * (t.d * this.n) % (t.n * this.d), t.d * this.d);
    }, gcd: function(l, m) {
      return p(l, m), n(o(t.n, this.n) * o(t.d, this.d), t.d * this.d);
    }, lcm: function(l, m) {
      return p(l, m), t.n === 0 && this.n === 0 ? n(0, 1) : n(t.n * this.n, o(t.n, this.n) * o(t.d, this.d));
    }, ceil: function(l) {
      return l = Math.pow(10, l || 0), isNaN(this.n) || isNaN(this.d) ? new s(NaN) : n(Math.ceil(l * this.s * this.n / this.d), l);
    }, floor: function(l) {
      return l = Math.pow(10, l || 0), isNaN(this.n) || isNaN(this.d) ? new s(NaN) : n(Math.floor(l * this.s * this.n / this.d), l);
    }, round: function(l) {
      return l = Math.pow(10, l || 0), isNaN(this.n) || isNaN(this.d) ? new s(NaN) : n(Math.round(l * this.s * this.n / this.d), l);
    }, inverse: function() {
      return n(this.s * this.d, this.n);
    }, pow: function(l, m) {
      if (p(l, m), t.d === 1)
        return t.s < 0 ? n(Math.pow(this.s * this.d, t.n), Math.pow(this.n, t.n)) : n(Math.pow(this.s * this.n, t.n), Math.pow(this.d, t.n));
      if (this.s < 0)
        return null;
      var h = i(this.n), c = i(this.d), d = 1, g = 1;
      for (var y in h)
        if (y !== "1") {
          if (y === "0") {
            d = 0;
            break;
          }
          if (h[y] *= t.n, h[y] % t.d === 0)
            h[y] /= t.d;
          else
            return null;
          d *= Math.pow(y, h[y]);
        }
      for (var y in c)
        if (y !== "1") {
          if (c[y] *= t.n, c[y] % t.d === 0)
            c[y] /= t.d;
          else
            return null;
          g *= Math.pow(y, c[y]);
        }
      return t.s < 0 ? n(g, d) : n(d, g);
    }, equals: function(l, m) {
      return p(l, m), this.s * this.n * t.d === t.s * t.n * this.d;
    }, compare: function(l, m) {
      p(l, m);
      var h = this.s * this.n * t.d - t.s * t.n * this.d;
      return (0 < h) - (h < 0);
    }, simplify: function(l) {
      if (isNaN(this.n) || isNaN(this.d))
        return this;
      l = l || 1e-3;
      for (var m = this.abs(), h = m.toContinued(), c = 1; c < h.length; c++) {
        for (var d = n(h[c - 1], 1), g = c - 2; g >= 0; g--)
          d = d.inverse().add(h[g]);
        if (d.sub(m).abs().valueOf() < l)
          return d.mul(this.s);
      }
      return this;
    }, divisible: function(l, m) {
      return p(l, m), !(!(t.n * this.d) || this.n * t.d % (t.n * this.d));
    }, valueOf: function() {
      return this.s * this.n / this.d;
    }, toFraction: function(l) {
      var m, h = "", c = this.n, d = this.d;
      return this.s < 0 && (h += "-"), d === 1 ? h += c : (l && (m = Math.floor(c / d)) > 0 && (h += m, h += " ", c %= d), h += c, h += "/", h += d), h;
    }, toLatex: function(l) {
      var m, h = "", c = this.n, d = this.d;
      return this.s < 0 && (h += "-"), d === 1 ? h += c : (l && (m = Math.floor(c / d)) > 0 && (h += m, c %= d), h += "\\frac{", h += c, h += "}{", h += d, h += "}"), h;
    }, toContinued: function() {
      var l, m = this.n, h = this.d, c = [];
      if (isNaN(m) || isNaN(h))
        return c;
      do
        c.push(Math.floor(m / h)), l = m % h, m = h, h = l;
      while (m !== 1);
      return c;
    }, toString: function(l) {
      var m = this.n, h = this.d;
      if (isNaN(m) || isNaN(h))
        return "NaN";
      l = l || 15;
      var c = f(m, h), d = u(m, h, c), g = this.s < 0 ? "-" : "";
      if (g += m / h | 0, m %= h, m *= 10, m && (g += "."), c) {
        for (var y = d; y--; )
          g += m / h | 0, m %= h, m *= 10;
        g += "(";
        for (var y = c; y--; )
          g += m / h | 0, m %= h, m *= 10;
        g += ")";
      } else
        for (var y = l; m && y--; )
          g += m / h | 0, m %= h, m *= 10;
      return g;
    } }, typeof define == "function" && define.amd ? define([], function() {
      return s;
    }) : typeof jn == "object" ? (Object.defineProperty(s, "__esModule", { value: true }), s.default = s, s.Fraction = s, Hi.exports = s) : r.Fraction = s;
  })(jn);
});
var qu = zt((k1, Ru) => {
  Ru.exports = function r(e, t) {
    "use strict";
    var a = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, n = /(^[ ]*|[ ]*$)/g, i = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, p = /^0x[0-9a-f]+$/i, v = /^0/, f = function(x) {
      return r.insensitive && ("" + x).toLowerCase() || "" + x;
    }, u = f(e).replace(n, "") || "", o = f(t).replace(n, "") || "", s = u.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), l = o.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), m = parseInt(u.match(p), 16) || s.length !== 1 && u.match(i) && Date.parse(u), h = parseInt(o.match(p), 16) || m && o.match(i) && Date.parse(o) || null, c, d;
    if (h) {
      if (m < h)
        return -1;
      if (m > h)
        return 1;
    }
    for (var g = 0, y = Math.max(s.length, l.length); g < y; g++) {
      if (c = !(s[g] || "").match(v) && parseFloat(s[g]) || s[g] || 0, d = !(l[g] || "").match(v) && parseFloat(l[g]) || l[g] || 0, isNaN(c) !== isNaN(d))
        return isNaN(c) ? 1 : -1;
      if (typeof c != typeof d && (c += "", d += ""), c < d)
        return -1;
      if (c > d)
        return 1;
    }
    return 0;
  };
});
function Je() {
  return Je = Object.assign ? Object.assign.bind() : function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (r[a] = t[a]);
    }
    return r;
  }, Je.apply(this, arguments);
}
var Nn = { epsilon: 1e-12, matrix: "Matrix", number: "number", precision: 64, predictable: false, randomSeed: null };
function Sr(r) {
  return typeof r == "number";
}
function _r(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function dt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function gt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function Pt(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function Kr(r) {
  return typeof r == "string";
}
var Fr = Array.isArray;
function wr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function Xe(r) {
  return Array.isArray(r) || wr(r);
}
function Ke(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Se(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Rt(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function Re(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function Ro(r) {
  return typeof r == "boolean";
}
function qo(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function Uo(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function Lo(r) {
  return typeof r == "function";
}
function Zo(r) {
  return r instanceof Date;
}
function Vo(r) {
  return r instanceof RegExp;
}
function Qo(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !dt(r) && !gt(r));
}
function Go(r) {
  return r === null;
}
function Yo(r) {
  return r === void 0;
}
function $o(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function Jo(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function Xo(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Ko(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Wo(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function Ho(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function ko(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function jo(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function ri(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function ei(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function ti(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function ni(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function ai(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function oi(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function ii(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function ui(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function si(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function Yr(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : _r(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function pr(r) {
  var e = typeof r;
  if (e === "number" || e === "string" || e === "boolean" || r === null || r === void 0)
    return r;
  if (typeof r.clone == "function")
    return r.clone();
  if (Array.isArray(r))
    return r.map(function(t) {
      return pr(t);
    });
  if (r instanceof Date)
    return new Date(r.valueOf());
  if (_r(r))
    return r;
  if (r instanceof RegExp)
    throw new TypeError("Cannot clone " + r);
  return af(r, pr);
}
function af(r, e) {
  var t = {};
  for (var a in r)
    nt(r, a) && (t[a] = e(r[a]));
  return t;
}
function fi(r, e) {
  for (var t in e)
    nt(e, t) && (r[t] = e[t]);
  return r;
}
function tt(r, e) {
  var t, a, n;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length)
      return false;
    for (a = 0, n = r.length; a < n; a++)
      if (!tt(r[a], e[a]))
        return false;
    return true;
  } else {
    if (typeof r == "function")
      return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object))
        return false;
      for (t in r)
        if (!(t in e) || !tt(r[t], e[t]))
          return false;
      for (t in e)
        if (!(t in r))
          return false;
      return true;
    } else
      return r === e;
  }
}
function nt(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function ci(r, e) {
  for (var t = {}, a = 0; a < e.length; a++) {
    var n = e[a], i = r[n];
    i !== void 0 && (t[n] = i);
  }
  return t;
}
var li = ["Matrix", "Array"];
var pi = ["number", "BigNumber", "Fraction"];
var Wr = function(e) {
  if (e)
    throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(Nn);
};
Je(Wr, Nn, { MATRIX_OPTIONS: li, NUMBER_OPTIONS: pi });
var Zn = Ot(vi(), 1);
function mr(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var mi = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
var hi = Math.log2 || function(e) {
  return Math.log(e) / Math.LN2;
};
var di = Math.log10 || function(e) {
  return Math.log(e) / Math.LN10;
};
var gi = Math.log1p || function(r) {
  return Math.log(r + 1);
};
var Di = Math.cbrt || function(e) {
  if (e === 0)
    return e;
  var t = e < 0, a;
  return t && (e = -e), isFinite(e) ? (a = Math.exp(Math.log(e) / 3), a = (e / (a * a) + 2 * a) / 3) : a = e, t ? -a : a;
};
var xi = Math.expm1 || function(e) {
  return e >= 2e-4 || e <= -2e-4 ? Math.exp(e) - 1 : e + e * e / 2 + e * e * e / 6;
};
function Tn(r, e, t) {
  var a = { 2: "0b", 8: "0o", 16: "0x" }, n = a[e], i = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!mr(t))
      throw new Error("size must be an integer");
    if (r > Tr(2, t - 1) - 1 || r < -Tr(2, t - 1))
      throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!mr(r))
      throw new Error("Value must be an integer");
    r < 0 && (r = r + Tr(2, t)), i = "i".concat(t);
  }
  var p = "";
  return r < 0 && (r = -r, p = "-"), "".concat(p).concat(n).concat(r.toString(e)).concat(i);
}
function Dt(r, e) {
  if (typeof e == "function")
    return e(r);
  if (r === 1 / 0)
    return "Infinity";
  if (r === -1 / 0)
    return "-Infinity";
  if (isNaN(r))
    return "NaN";
  var t = "auto", a, n;
  if (e && (e.notation && (t = e.notation), Sr(e) ? a = e : Sr(e.precision) && (a = e.precision), e.wordSize && (n = e.wordSize, typeof n != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (t) {
    case "fixed":
      return yi(r, a);
    case "exponential":
      return wi(r, a);
    case "engineering":
      return of(r, a);
    case "bin":
      return Tn(r, 2, n);
    case "oct":
      return Tn(r, 8, n);
    case "hex":
      return Tn(r, 16, n);
    case "auto":
      return uf(r, a, e && e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var i = arguments[2], p = arguments[4];
        return i !== "." ? i + p : p;
      });
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function qt(r) {
  var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e)
    throw new SyntaxError("Invalid number " + r);
  var t = e[1], a = e[2], n = parseFloat(e[4] || "0"), i = a.indexOf(".");
  n += i !== -1 ? i - 1 : a.length - 1;
  var p = a.replace(".", "").replace(/^0*/, function(v) {
    return n -= v.length, "";
  }).replace(/0*$/, "").split("").map(function(v) {
    return parseInt(v);
  });
  return p.length === 0 && (p.push(0), n++), { sign: t, coefficients: p, exponent: n };
}
function of(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var t = qt(r), a = Ut(t, e), n = a.exponent, i = a.coefficients, p = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3;
  if (Sr(e))
    for (; e > i.length || n - p + 1 > i.length; )
      i.push(0);
  else
    for (var v = Math.abs(n - p) - (i.length - 1), f = 0; f < v; f++)
      i.push(0);
  for (var u = Math.abs(n - p), o = 1; u > 0; )
    o++, u--;
  var s = i.slice(o).join(""), l = Sr(e) && s.length || s.match(/[1-9]/) ? "." + s : "", m = i.slice(0, o).join("") + l + "e" + (n >= 0 ? "+" : "") + p.toString();
  return a.sign + m;
}
function yi(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var t = qt(r), a = typeof e == "number" ? Ut(t, t.exponent + 1 + e) : t, n = a.coefficients, i = a.exponent + 1, p = i + (e || 0);
  return n.length < p && (n = n.concat(at(p - n.length))), i < 0 && (n = at(-i + 1).concat(n), i = 1), i < n.length && n.splice(i, 0, i === 0 ? "0." : "."), a.sign + n.join("");
}
function wi(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var t = qt(r), a = e ? Ut(t, e) : t, n = a.coefficients, i = a.exponent;
  n.length < e && (n = n.concat(at(e - n.length)));
  var p = n.shift();
  return a.sign + p + (n.length > 0 ? "." + n.join("") : "") + "e" + (i >= 0 ? "+" : "") + i;
}
function uf(r, e, t) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var a = t && t.lowerExp !== void 0 ? t.lowerExp : -3, n = t && t.upperExp !== void 0 ? t.upperExp : 5, i = qt(r), p = e ? Ut(i, e) : i;
  if (p.exponent < a || p.exponent >= n)
    return wi(r, e);
  var v = p.coefficients, f = p.exponent;
  v.length < e && (v = v.concat(at(e - v.length))), v = v.concat(at(f - v.length + 1 + (v.length < e ? e - v.length : 0))), v = at(-f).concat(v);
  var u = f > 0 ? f : 0;
  return u < v.length - 1 && v.splice(u + 1, 0, "."), p.sign + v.join("");
}
function Ut(r, e) {
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
function at(r) {
  for (var e = [], t = 0; t < r; t++)
    e.push(0);
  return e;
}
function Ai(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
var sf = Number.EPSILON || 2220446049250313e-31;
function Hr(r, e, t) {
  if (t == null)
    return r === e;
  if (r === e)
    return true;
  if (isNaN(r) || isNaN(e))
    return false;
  if (isFinite(r) && isFinite(e)) {
    var a = Math.abs(r - e);
    return a < sf ? true : a <= Math.max(Math.abs(r), Math.abs(e)) * t;
  }
  return false;
}
function In(r, e, t) {
  var a = r.constructor, n = new a(2), i = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!mr(t))
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
function Ci(r, e) {
  if (typeof e == "function")
    return e(r);
  if (!r.isFinite())
    return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var t = "auto", a, n;
  if (e !== void 0 && (e.notation && (t = e.notation), typeof e == "number" ? a = e : e.precision !== void 0 && (a = e.precision), e.wordSize && (n = e.wordSize, typeof n != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (t) {
    case "fixed":
      return cf(r, a);
    case "exponential":
      return Ei(r, a);
    case "engineering":
      return ff(r, a);
    case "bin":
      return In(r, 2, n);
    case "oct":
      return In(r, 8, n);
    case "hex":
      return In(r, 16, n);
    case "auto": {
      var i = e && e.lowerExp !== void 0 ? e.lowerExp : -3, p = e && e.upperExp !== void 0 ? e.upperExp : 5;
      if (r.isZero())
        return "0";
      var v, f = r.toSignificantDigits(a), u = f.e;
      return u >= i && u < p ? v = f.toFixed() : v = Ei(r, a), v.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], s = arguments[4];
        return o !== "." ? o + s : s;
      });
    }
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function ff(r, e) {
  var t = r.e, a = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3, n = r.mul(Math.pow(10, -a)), i = n.toPrecision(e);
  if (i.indexOf("e") !== -1) {
    var p = r.constructor;
    i = new p(i).toFixed();
  }
  return i + "e" + (t >= 0 ? "+" : "") + a.toString();
}
function Ei(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function cf(r, e) {
  return r.toFixed(e);
}
function Mr(r, e) {
  var t = lf(r, e);
  return e && typeof e == "object" && "truncate" in e && t.length > e.truncate ? t.substring(0, e.truncate - 3) + "..." : t;
}
function lf(r, e) {
  if (typeof r == "number")
    return Dt(r, e);
  if (_r(r))
    return Ci(r, e);
  if (pf(r))
    return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
  if (Array.isArray(r))
    return Fi(r, e);
  if (Kr(r))
    return '"' + r + '"';
  if (typeof r == "function")
    return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function")
      return r.format(e);
    if (r && r.toString(e) !== {}.toString())
      return r.toString(e);
    var t = Object.keys(r).map((a) => '"' + a + '": ' + Mr(r[a], e));
    return "{" + t.join(", ") + "}";
  }
  return String(r);
}
function Fi(r, e) {
  if (Array.isArray(r)) {
    for (var t = "[", a = r.length, n = 0; n < a; n++)
      n !== 0 && (t += ", "), t += Fi(r[n], e);
    return t += "]", t;
  } else
    return Mr(r, e);
}
function pf(r) {
  return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || false;
}
function hr(r, e, t) {
  if (!(this instanceof hr))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = t, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
hr.prototype = new RangeError();
hr.prototype.constructor = RangeError;
hr.prototype.name = "DimensionError";
hr.prototype.isDimensionError = true;
function Ne(r, e, t) {
  if (!(this instanceof Ne))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = t), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Ne.prototype = new RangeError();
Ne.prototype.constructor = RangeError;
Ne.prototype.name = "IndexError";
Ne.prototype.isIndexError = true;
function Br(r) {
  for (var e = []; Array.isArray(r); )
    e.push(r.length), r = r[0];
  return e;
}
function bi(r, e, t) {
  var a, n = r.length;
  if (n !== e[t])
    throw new hr(n, e[t]);
  if (t < e.length - 1) {
    var i = t + 1;
    for (a = 0; a < n; a++) {
      var p = r[a];
      if (!Array.isArray(p))
        throw new hr(e.length - 1, e.length, "<");
      bi(r[a], e, i);
    }
  } else
    for (a = 0; a < n; a++)
      if (Array.isArray(r[a]))
        throw new hr(e.length + 1, e.length, ">");
}
function On(r, e) {
  var t = e.length === 0;
  if (t) {
    if (Array.isArray(r))
      throw new hr(r.length, 0);
  } else
    bi(r, e, 0);
}
function Nr(r, e) {
  if (!Sr(r) || !mr(r))
    throw new TypeError("Index must be an integer (value: " + r + ")");
  if (r < 0 || typeof e == "number" && r >= e)
    throw new Ne(r, e);
}
function We(r, e, t) {
  if (!Array.isArray(r) || !Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new Error("Resizing to scalar is not supported");
  e.forEach(function(n) {
    if (!Sr(n) || !mr(n) || n < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Mr(e) + ")");
  });
  var a = t !== void 0 ? t : 0;
  return zn(r, e, 0, a), r;
}
function zn(r, e, t, a) {
  var n, i, p = r.length, v = e[t], f = Math.min(p, v);
  if (r.length = v, t < e.length - 1) {
    var u = t + 1;
    for (n = 0; n < f; n++)
      i = r[n], Array.isArray(i) || (i = [i], r[n] = i), zn(i, e, u, a);
    for (n = f; n < v; n++)
      i = [], r[n] = i, zn(i, e, u, a);
  } else {
    for (n = 0; n < f; n++)
      for (; Array.isArray(r[n]); )
        r[n] = r[n][0];
    for (n = f; n < v; n++)
      r[n] = a;
  }
}
function Mi(r, e) {
  var t = qe(r), a = t.length;
  if (!Array.isArray(r) || !Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new hr(0, a, "!=");
  e = xt(e, a);
  var n = Si(e);
  if (a !== n)
    throw new hr(n, a, "!=");
  try {
    return vf(t, e);
  } catch (i) {
    throw i instanceof hr ? new hr(n, a, "!=") : i;
  }
}
function xt(r, e) {
  var t = Si(r), a = r.slice(), n = -1, i = r.indexOf(n), p = r.indexOf(n, i + 1) >= 0;
  if (p)
    throw new Error("More than one wildcard in sizes");
  var v = i >= 0, f = e % t === 0;
  if (v)
    if (f)
      a[i] = -e / t;
    else
      throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -t);
  return a;
}
function Si(r) {
  return r.reduce((e, t) => e * t, 1);
}
function vf(r, e) {
  for (var t = r, a, n = e.length - 1; n > 0; n--) {
    var i = e[n];
    a = [];
    for (var p = t.length / i, v = 0; v < p; v++)
      a.push(t.slice(v * i, (v + 1) * i));
    t = a;
  }
  return t;
}
function Lt(r, e, t, a) {
  var n = a || Br(r);
  if (t)
    for (var i = 0; i < t; i++)
      r = [r], n.unshift(1);
  for (r = Ni(r, e, 0); n.length < e; )
    n.push(1);
  return r;
}
function Ni(r, e, t) {
  var a, n;
  if (Array.isArray(r)) {
    var i = t + 1;
    for (a = 0, n = r.length; a < n; a++)
      r[a] = Ni(r[a], e, i);
  } else
    for (var p = t; p < e; p++)
      r = [r];
  return r;
}
function qe(r) {
  if (!Array.isArray(r))
    return r;
  var e = [];
  return r.forEach(function t(a) {
    Array.isArray(a) ? a.forEach(t) : e.push(a);
  }), e;
}
function Pn(r) {
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
function Rn(r) {
  if (!Array.isArray(r))
    throw new TypeError("Array input expected");
  if (r.length === 0)
    return r;
  for (var e = [], t = 0; t < r.length; t++)
    e.push(r[t].value);
  return e;
}
function ot(r, e) {
  for (var t, a = 0, n = 0; n < r.length; n++) {
    var i = r[n], p = Array.isArray(i);
    if (n === 0 && p && (a = i.length), p && i.length !== a)
      return;
    var v = p ? ot(i, e) : e(i);
    if (t === void 0)
      t = v;
    else if (t !== v)
      return "mixed";
  }
  return t;
}
function P(r, e, t, a) {
  function n(i) {
    var p = ci(i, e.map(df));
    return mf(r, e, i), t(p);
  }
  return n.isFactory = true, n.fn = r, n.dependencies = e.slice().sort(), a && (n.meta = a), n;
}
function mf(r, e, t) {
  var a = e.filter((i) => !hf(i)).every((i) => t[i] !== void 0);
  if (!a) {
    var n = e.filter((i) => t[i] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(n.map((i) => '"'.concat(i, '"')).join(", "), "."));
  }
}
function hf(r) {
  return r && r[0] === "?";
}
function df(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function Zt(r, e) {
  if (Ti(r) && _i(r, e))
    return r[e];
  throw typeof r[e] == "function" && gf(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function Vt(r, e, t) {
  if (Ti(r) && _i(r, e))
    return r[e] = t, t;
  throw new Error('No access to property "' + e + '"');
}
function Bi(r, e) {
  return e in r;
}
function _i(r, e) {
  return !r || typeof r != "object" ? false : nt(Df, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function gf(r, e) {
  return r == null || typeof r[e] != "function" || nt(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : nt(xf, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function Ti(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var Df = { length: true, name: true };
var xf = { toString: true, valueOf: true, toLocaleString: true };
var qn = class {
  constructor(e) {
    this.wrappedObject = e;
  }
  keys() {
    return Object.keys(this.wrappedObject);
  }
  get(e) {
    return Zt(this.wrappedObject, e);
  }
  set(e, t) {
    return Vt(this.wrappedObject, e, t), this;
  }
  has(e) {
    return Bi(this.wrappedObject, e);
  }
};
function Ii(r) {
  return r ? r instanceof Map || r instanceof qn || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
var zi = function() {
  return zi = Zn.default.create, Zn.default;
};
var yf = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"];
var Vn = P("typed", yf, function(e) {
  var { BigNumber: t, Complex: a, DenseMatrix: n, Fraction: i } = e, p = zi();
  return p.clear(), p.addTypes([{ name: "number", test: Sr }, { name: "Complex", test: dt }, { name: "BigNumber", test: _r }, { name: "Fraction", test: gt }, { name: "Unit", test: Pt }, { name: "identifier", test: (v) => Kr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(v) }, { name: "string", test: Kr }, { name: "Chain", test: si }, { name: "Array", test: Fr }, { name: "Matrix", test: wr }, { name: "DenseMatrix", test: Ke }, { name: "SparseMatrix", test: Se }, { name: "Range", test: Rt }, { name: "Index", test: Re }, { name: "boolean", test: Ro }, { name: "ResultSet", test: qo }, { name: "Help", test: Uo }, { name: "function", test: Lo }, { name: "Date", test: Zo }, { name: "RegExp", test: Vo }, { name: "null", test: Go }, { name: "undefined", test: Yo }, { name: "AccessorNode", test: $o }, { name: "ArrayNode", test: Jo }, { name: "AssignmentNode", test: Xo }, { name: "BlockNode", test: Ko }, { name: "ConditionalNode", test: Wo }, { name: "ConstantNode", test: Ho }, { name: "FunctionNode", test: jo }, { name: "FunctionAssignmentNode", test: ko }, { name: "IndexNode", test: ri }, { name: "Node", test: ei }, { name: "ObjectNode", test: ti }, { name: "OperatorNode", test: ni }, { name: "ParenthesisNode", test: ai }, { name: "RangeNode", test: oi }, { name: "RelationalNode", test: ii }, { name: "SymbolNode", test: ui }, { name: "Map", test: Ii }, { name: "Object", test: Qo }]), p.addConversions([{ from: "number", to: "BigNumber", convert: function(f) {
    if (t || Un(f), Ai(f) > 15)
      throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + f + "). Use function bignumber(x) to convert to BigNumber.");
    return new t(f);
  } }, { from: "number", to: "Complex", convert: function(f) {
    return a || Qt(f), new a(f, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(f) {
    return a || Qt(f), new a(f.toNumber(), 0);
  } }, { from: "Fraction", to: "BigNumber", convert: function(f) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(f) {
    return a || Qt(f), new a(f.valueOf(), 0);
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
    a || Qt(f);
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
    return n || wf(), new n(f);
  } }, { from: "Matrix", to: "Array", convert: function(f) {
    return f.valueOf();
  } }]), p.onMismatch = (v, f, u) => {
    var o = p.createError(v, f, u);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && Xe(f[0]) && u.some((l) => !l.params.includes(","))) {
      var s = new TypeError("Function '".concat(v, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(v, ")'."));
      throw s.data = o.data, s;
    }
    throw o;
  }, p.onMismatch = (v, f, u) => {
    var o = p.createError(v, f, u);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && Xe(f[0]) && u.some((l) => !l.params.includes(","))) {
      var s = new TypeError("Function '".concat(v, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(v, ")'."));
      throw s.data = o.data, s;
    }
    throw o;
  }, p;
});
function Un(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function Qt(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function wf() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function Ln(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var it = 9e15;
var Ve = 1e9;
var Qn = "0123456789abcdef";
var Yt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var $t = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var Gn = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -it, maxE: it, crypto: false };
var qi;
var Be;
var dr = true;
var Xt = "[DecimalError] ";
var Ze = Xt + "Invalid argument: ";
var Ui = Xt + "Precision limit exceeded";
var Li = Xt + "crypto unavailable";
var Zi = "[object Decimal]";
var kr = Math.floor;
var qr = Math.pow;
var Af = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var Ef = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var Cf = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var Vi = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var ye = 1e7;
var vr = 7;
var Ff = 9007199254740991;
var bf = Yt.length - 1;
var Yn = $t.length - 1;
var X = { toStringTag: Zi };
X.absoluteValue = X.abs = function() {
  var r = new this.constructor(this);
  return r.s < 0 && (r.s = 1), sr(r);
};
X.ceil = function() {
  return sr(new this.constructor(this), this.e + 1, 2);
};
X.clampedTo = X.clamp = function(r, e) {
  var t, a = this, n = a.constructor;
  if (r = new n(r), e = new n(e), !r.s || !e.s)
    return new n(NaN);
  if (r.gt(e))
    throw Error(Ze + e);
  return t = a.cmp(r), t < 0 ? r : a.cmp(e) > 0 ? e : new n(a);
};
X.comparedTo = X.cmp = function(r) {
  var e, t, a, n, i = this, p = i.d, v = (r = new i.constructor(r)).d, f = i.s, u = r.s;
  if (!p || !v)
    return !f || !u ? NaN : f !== u ? f : p === v ? 0 : !p ^ f < 0 ? 1 : -1;
  if (!p[0] || !v[0])
    return p[0] ? f : v[0] ? -u : 0;
  if (f !== u)
    return f;
  if (i.e !== r.e)
    return i.e > r.e ^ f < 0 ? 1 : -1;
  for (a = p.length, n = v.length, e = 0, t = a < n ? a : n; e < t; ++e)
    if (p[e] !== v[e])
      return p[e] > v[e] ^ f < 0 ? 1 : -1;
  return a === n ? 0 : a > n ^ f < 0 ? 1 : -1;
};
X.cosine = X.cos = function() {
  var r, e, t = this, a = t.constructor;
  return t.d ? t.d[0] ? (r = a.precision, e = a.rounding, a.precision = r + Math.max(t.e, t.sd()) + vr, a.rounding = 1, t = Mf(a, Ji(a, t)), a.precision = r, a.rounding = e, sr(Be == 2 || Be == 3 ? t.neg() : t, r, e, true)) : new a(1) : new a(NaN);
};
X.cubeRoot = X.cbrt = function() {
  var r, e, t, a, n, i, p, v, f, u, o = this, s = o.constructor;
  if (!o.isFinite() || o.isZero())
    return new s(o);
  for (dr = false, i = o.s * qr(o.s * o, 1 / 3), !i || Math.abs(i) == 1 / 0 ? (t = $r(o.d), r = o.e, (i = (r - t.length + 1) % 3) && (t += i == 1 || i == -2 ? "0" : "00"), i = qr(t, 1 / 3), r = kr((r + 1) / 3) - (r % 3 == (r < 0 ? -1 : 2)), i == 1 / 0 ? t = "5e" + r : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + r), a = new s(t), a.s = o.s) : a = new s(i.toString()), p = (r = s.precision) + 3; ; )
    if (v = a, f = v.times(v).times(v), u = f.plus(o), a = Ir(u.plus(o).times(v), u.plus(f), p + 2, 1), $r(v.d).slice(0, p) === (t = $r(a.d)).slice(0, p))
      if (t = t.slice(p - 3, p + 1), t == "9999" || !n && t == "4999") {
        if (!n && (sr(v, r + 1, 0), v.times(v).times(v).eq(o))) {
          a = v;
          break;
        }
        p += 4, n = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (sr(a, r + 1, 1), e = !a.times(a).times(a).eq(o));
        break;
      }
  return dr = true, sr(a, r, s.rounding, e);
};
X.decimalPlaces = X.dp = function() {
  var r, e = this.d, t = NaN;
  if (e) {
    if (r = e.length - 1, t = (r - kr(this.e / vr)) * vr, r = e[r], r)
      for (; r % 10 == 0; r /= 10)
        t--;
    t < 0 && (t = 0);
  }
  return t;
};
X.dividedBy = X.div = function(r) {
  return Ir(this, new this.constructor(r));
};
X.dividedToIntegerBy = X.divToInt = function(r) {
  var e = this, t = e.constructor;
  return sr(Ir(e, new t(r), 0, 1, 1), t.precision, t.rounding);
};
X.equals = X.eq = function(r) {
  return this.cmp(r) === 0;
};
X.floor = function() {
  return sr(new this.constructor(this), this.e + 1, 3);
};
X.greaterThan = X.gt = function(r) {
  return this.cmp(r) > 0;
};
X.greaterThanOrEqualTo = X.gte = function(r) {
  var e = this.cmp(r);
  return e == 1 || e === 0;
};
X.hyperbolicCosine = X.cosh = function() {
  var r, e, t, a, n, i = this, p = i.constructor, v = new p(1);
  if (!i.isFinite())
    return new p(i.s ? 1 / 0 : NaN);
  if (i.isZero())
    return v;
  t = p.precision, a = p.rounding, p.precision = t + Math.max(i.e, i.sd()) + 4, p.rounding = 1, n = i.d.length, n < 32 ? (r = Math.ceil(n / 3), e = (1 / Wt(4, r)).toString()) : (r = 16, e = "2.3283064365386962890625e-10"), i = ut(p, 1, i.times(e), new p(1), true);
  for (var f, u = r, o = new p(8); u--; )
    f = i.times(i), i = v.minus(f.times(o.minus(f.times(o))));
  return sr(i, p.precision = t, p.rounding = a, true);
};
X.hyperbolicSine = X.sinh = function() {
  var r, e, t, a, n = this, i = n.constructor;
  if (!n.isFinite() || n.isZero())
    return new i(n);
  if (e = i.precision, t = i.rounding, i.precision = e + Math.max(n.e, n.sd()) + 4, i.rounding = 1, a = n.d.length, a < 3)
    n = ut(i, 2, n, n, true);
  else {
    r = 1.4 * Math.sqrt(a), r = r > 16 ? 16 : r | 0, n = n.times(1 / Wt(5, r)), n = ut(i, 2, n, n, true);
    for (var p, v = new i(5), f = new i(16), u = new i(20); r--; )
      p = n.times(n), n = n.times(v.plus(p.times(f.times(p).plus(u))));
  }
  return i.precision = e, i.rounding = t, sr(n, e, t, true);
};
X.hyperbolicTangent = X.tanh = function() {
  var r, e, t = this, a = t.constructor;
  return t.isFinite() ? t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + 7, a.rounding = 1, Ir(t.sinh(), t.cosh(), a.precision = r, a.rounding = e)) : new a(t.s);
};
X.inverseCosine = X.acos = function() {
  var r, e = this, t = e.constructor, a = e.abs().cmp(1), n = t.precision, i = t.rounding;
  return a !== -1 ? a === 0 ? e.isNeg() ? xe(t, n, i) : new t(0) : new t(NaN) : e.isZero() ? xe(t, n + 4, i).times(0.5) : (t.precision = n + 6, t.rounding = 1, e = e.asin(), r = xe(t, n + 4, i).times(0.5), t.precision = n, t.rounding = i, r.minus(e));
};
X.inverseHyperbolicCosine = X.acosh = function() {
  var r, e, t = this, a = t.constructor;
  return t.lte(1) ? new a(t.eq(1) ? 0 : NaN) : t.isFinite() ? (r = a.precision, e = a.rounding, a.precision = r + Math.max(Math.abs(t.e), t.sd()) + 4, a.rounding = 1, dr = false, t = t.times(t).minus(1).sqrt().plus(t), dr = true, a.precision = r, a.rounding = e, t.ln()) : new a(t);
};
X.inverseHyperbolicSine = X.asinh = function() {
  var r, e, t = this, a = t.constructor;
  return !t.isFinite() || t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, a.rounding = 1, dr = false, t = t.times(t).plus(1).sqrt().plus(t), dr = true, a.precision = r, a.rounding = e, t.ln());
};
X.inverseHyperbolicTangent = X.atanh = function() {
  var r, e, t, a, n = this, i = n.constructor;
  return n.isFinite() ? n.e >= 0 ? new i(n.abs().eq(1) ? n.s / 0 : n.isZero() ? n : NaN) : (r = i.precision, e = i.rounding, a = n.sd(), Math.max(a, r) < 2 * -n.e - 1 ? sr(new i(n), r, e, true) : (i.precision = t = a - n.e, n = Ir(n.plus(1), new i(1).minus(n), t + r, 1), i.precision = r + 4, i.rounding = 1, n = n.ln(), i.precision = r, i.rounding = e, n.times(0.5))) : new i(NaN);
};
X.inverseSine = X.asin = function() {
  var r, e, t, a, n = this, i = n.constructor;
  return n.isZero() ? new i(n) : (e = n.abs().cmp(1), t = i.precision, a = i.rounding, e !== -1 ? e === 0 ? (r = xe(i, t + 4, a).times(0.5), r.s = n.s, r) : new i(NaN) : (i.precision = t + 6, i.rounding = 1, n = n.div(new i(1).minus(n.times(n)).sqrt().plus(1)).atan(), i.precision = t, i.rounding = a, n.times(2)));
};
X.inverseTangent = X.atan = function() {
  var r, e, t, a, n, i, p, v, f, u = this, o = u.constructor, s = o.precision, l = o.rounding;
  if (u.isFinite()) {
    if (u.isZero())
      return new o(u);
    if (u.abs().eq(1) && s + 4 <= Yn)
      return p = xe(o, s + 4, l).times(0.25), p.s = u.s, p;
  } else {
    if (!u.s)
      return new o(NaN);
    if (s + 4 <= Yn)
      return p = xe(o, s + 4, l).times(0.5), p.s = u.s, p;
  }
  for (o.precision = v = s + 10, o.rounding = 1, t = Math.min(28, v / vr + 2 | 0), r = t; r; --r)
    u = u.div(u.times(u).plus(1).sqrt().plus(1));
  for (dr = false, e = Math.ceil(v / vr), a = 1, f = u.times(u), p = new o(u), n = u; r !== -1; )
    if (n = n.times(f), i = p.minus(n.div(a += 2)), n = n.times(f), p = i.plus(n.div(a += 2)), p.d[e] !== void 0)
      for (r = e; p.d[r] === i.d[r] && r--; )
        ;
  return t && (p = p.times(2 << t - 1)), dr = true, sr(p, o.precision = s, o.rounding = l, true);
};
X.isFinite = function() {
  return !!this.d;
};
X.isInteger = X.isInt = function() {
  return !!this.d && kr(this.e / vr) > this.d.length - 2;
};
X.isNaN = function() {
  return !this.s;
};
X.isNegative = X.isNeg = function() {
  return this.s < 0;
};
X.isPositive = X.isPos = function() {
  return this.s > 0;
};
X.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
X.lessThan = X.lt = function(r) {
  return this.cmp(r) < 0;
};
X.lessThanOrEqualTo = X.lte = function(r) {
  return this.cmp(r) < 1;
};
X.logarithm = X.log = function(r) {
  var e, t, a, n, i, p, v, f, u = this, o = u.constructor, s = o.precision, l = o.rounding, m = 5;
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
  if (dr = false, v = s + m, p = Le(u, v), a = e ? Jt(o, v + 10) : Le(r, v), f = Ir(p, a, v, 1), yt(f.d, n = s, l))
    do
      if (v += 10, p = Le(u, v), a = e ? Jt(o, v + 10) : Le(r, v), f = Ir(p, a, v, 1), !i) {
        +$r(f.d).slice(n + 1, n + 15) + 1 == 1e14 && (f = sr(f, s + 1, 0));
        break;
      }
    while (yt(f.d, n += 10, l));
  return dr = true, sr(f, s, l);
};
X.minus = X.sub = function(r) {
  var e, t, a, n, i, p, v, f, u, o, s, l, m = this, h = m.constructor;
  if (r = new h(r), !m.d || !r.d)
    return !m.s || !r.s ? r = new h(NaN) : m.d ? r.s = -r.s : r = new h(r.d || m.s !== r.s ? m : NaN), r;
  if (m.s != r.s)
    return r.s = -r.s, m.plus(r);
  if (u = m.d, l = r.d, v = h.precision, f = h.rounding, !u[0] || !l[0]) {
    if (l[0])
      r.s = -r.s;
    else if (u[0])
      r = new h(m);
    else
      return new h(f === 3 ? -0 : 0);
    return dr ? sr(r, v, f) : r;
  }
  if (t = kr(r.e / vr), o = kr(m.e / vr), u = u.slice(), i = o - t, i) {
    for (s = i < 0, s ? (e = u, i = -i, p = l.length) : (e = l, t = o, p = u.length), a = Math.max(Math.ceil(v / vr), p) + 2, i > a && (i = a, e.length = 1), e.reverse(), a = i; a--; )
      e.push(0);
    e.reverse();
  } else {
    for (a = u.length, p = l.length, s = a < p, s && (p = a), a = 0; a < p; a++)
      if (u[a] != l[a]) {
        s = u[a] < l[a];
        break;
      }
    i = 0;
  }
  for (s && (e = u, u = l, l = e, r.s = -r.s), p = u.length, a = l.length - p; a > 0; --a)
    u[p++] = 0;
  for (a = l.length; a > i; ) {
    if (u[--a] < l[a]) {
      for (n = a; n && u[--n] === 0; )
        u[n] = ye - 1;
      --u[n], u[a] += ye;
    }
    u[a] -= l[a];
  }
  for (; u[--p] === 0; )
    u.pop();
  for (; u[0] === 0; u.shift())
    --t;
  return u[0] ? (r.d = u, r.e = Kt(u, t), dr ? sr(r, v, f) : r) : new h(f === 3 ? -0 : 0);
};
X.modulo = X.mod = function(r) {
  var e, t = this, a = t.constructor;
  return r = new a(r), !t.d || !r.s || r.d && !r.d[0] ? new a(NaN) : !r.d || t.d && !t.d[0] ? sr(new a(t), a.precision, a.rounding) : (dr = false, a.modulo == 9 ? (e = Ir(t, r.abs(), 0, 3, 1), e.s *= r.s) : e = Ir(t, r, 0, a.modulo, 1), e = e.times(r), dr = true, t.minus(e));
};
X.naturalExponential = X.exp = function() {
  return $n(this);
};
X.naturalLogarithm = X.ln = function() {
  return Le(this);
};
X.negated = X.neg = function() {
  var r = new this.constructor(this);
  return r.s = -r.s, sr(r);
};
X.plus = X.add = function(r) {
  var e, t, a, n, i, p, v, f, u, o, s = this, l = s.constructor;
  if (r = new l(r), !s.d || !r.d)
    return !s.s || !r.s ? r = new l(NaN) : s.d || (r = new l(r.d || s.s === r.s ? s : NaN)), r;
  if (s.s != r.s)
    return r.s = -r.s, s.minus(r);
  if (u = s.d, o = r.d, v = l.precision, f = l.rounding, !u[0] || !o[0])
    return o[0] || (r = new l(s)), dr ? sr(r, v, f) : r;
  if (i = kr(s.e / vr), a = kr(r.e / vr), u = u.slice(), n = i - a, n) {
    for (n < 0 ? (t = u, n = -n, p = o.length) : (t = o, a = i, p = u.length), i = Math.ceil(v / vr), p = i > p ? i + 1 : p + 1, n > p && (n = p, t.length = 1), t.reverse(); n--; )
      t.push(0);
    t.reverse();
  }
  for (p = u.length, n = o.length, p - n < 0 && (n = p, t = o, o = u, u = t), e = 0; n; )
    e = (u[--n] = u[n] + o[n] + e) / ye | 0, u[n] %= ye;
  for (e && (u.unshift(e), ++a), p = u.length; u[--p] == 0; )
    u.pop();
  return r.d = u, r.e = Kt(u, a), dr ? sr(r, v, f) : r;
};
X.precision = X.sd = function(r) {
  var e, t = this;
  if (r !== void 0 && r !== !!r && r !== 1 && r !== 0)
    throw Error(Ze + r);
  return t.d ? (e = Qi(t.d), r && t.e + 1 > e && (e = t.e + 1)) : e = NaN, e;
};
X.round = function() {
  var r = this, e = r.constructor;
  return sr(new e(r), r.e + 1, e.rounding);
};
X.sine = X.sin = function() {
  var r, e, t = this, a = t.constructor;
  return t.isFinite() ? t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + Math.max(t.e, t.sd()) + vr, a.rounding = 1, t = Nf(a, Ji(a, t)), a.precision = r, a.rounding = e, sr(Be > 2 ? t.neg() : t, r, e, true)) : new a(NaN);
};
X.squareRoot = X.sqrt = function() {
  var r, e, t, a, n, i, p = this, v = p.d, f = p.e, u = p.s, o = p.constructor;
  if (u !== 1 || !v || !v[0])
    return new o(!u || u < 0 && (!v || v[0]) ? NaN : v ? p : 1 / 0);
  for (dr = false, u = Math.sqrt(+p), u == 0 || u == 1 / 0 ? (e = $r(v), (e.length + f) % 2 == 0 && (e += "0"), u = Math.sqrt(e), f = kr((f + 1) / 2) - (f < 0 || f % 2), u == 1 / 0 ? e = "5e" + f : (e = u.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + f), a = new o(e)) : a = new o(u.toString()), t = (f = o.precision) + 3; ; )
    if (i = a, a = i.plus(Ir(p, i, t + 2, 1)).times(0.5), $r(i.d).slice(0, t) === (e = $r(a.d)).slice(0, t))
      if (e = e.slice(t - 3, t + 1), e == "9999" || !n && e == "4999") {
        if (!n && (sr(i, f + 1, 0), i.times(i).eq(p))) {
          a = i;
          break;
        }
        t += 4, n = 1;
      } else {
        (!+e || !+e.slice(1) && e.charAt(0) == "5") && (sr(a, f + 1, 1), r = !a.times(a).eq(p));
        break;
      }
  return dr = true, sr(a, f, o.rounding, r);
};
X.tangent = X.tan = function() {
  var r, e, t = this, a = t.constructor;
  return t.isFinite() ? t.isZero() ? new a(t) : (r = a.precision, e = a.rounding, a.precision = r + 10, a.rounding = 1, t = t.sin(), t.s = 1, t = Ir(t, new a(1).minus(t.times(t)).sqrt(), r + 10, 0), a.precision = r, a.rounding = e, sr(Be == 2 || Be == 4 ? t.neg() : t, r, e, true)) : new a(NaN);
};
X.times = X.mul = function(r) {
  var e, t, a, n, i, p, v, f, u, o = this, s = o.constructor, l = o.d, m = (r = new s(r)).d;
  if (r.s *= o.s, !l || !l[0] || !m || !m[0])
    return new s(!r.s || l && !l[0] && !m || m && !m[0] && !l ? NaN : !l || !m ? r.s / 0 : r.s * 0);
  for (t = kr(o.e / vr) + kr(r.e / vr), f = l.length, u = m.length, f < u && (i = l, l = m, m = i, p = f, f = u, u = p), i = [], p = f + u, a = p; a--; )
    i.push(0);
  for (a = u; --a >= 0; ) {
    for (e = 0, n = f + a; n > a; )
      v = i[n] + m[a] * l[n - a - 1] + e, i[n--] = v % ye | 0, e = v / ye | 0;
    i[n] = (i[n] + e) % ye | 0;
  }
  for (; !i[--p]; )
    i.pop();
  return e ? ++t : i.shift(), r.d = i, r.e = Kt(i, t), dr ? sr(r, s.precision, s.rounding) : r;
};
X.toBinary = function(r, e) {
  return Xn(this, 2, r, e);
};
X.toDecimalPlaces = X.toDP = function(r, e) {
  var t = this, a = t.constructor;
  return t = new a(t), r === void 0 ? t : (se(r, 0, Ve), e === void 0 ? e = a.rounding : se(e, 0, 8), sr(t, r + t.e + 1, e));
};
X.toExponential = function(r, e) {
  var t, a = this, n = a.constructor;
  return r === void 0 ? t = Ce(a, true) : (se(r, 0, Ve), e === void 0 ? e = n.rounding : se(e, 0, 8), a = sr(new n(a), r + 1, e), t = Ce(a, true, r + 1)), a.isNeg() && !a.isZero() ? "-" + t : t;
};
X.toFixed = function(r, e) {
  var t, a, n = this, i = n.constructor;
  return r === void 0 ? t = Ce(n) : (se(r, 0, Ve), e === void 0 ? e = i.rounding : se(e, 0, 8), a = sr(new i(n), r + n.e + 1, e), t = Ce(a, false, r + a.e + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
};
X.toFraction = function(r) {
  var e, t, a, n, i, p, v, f, u, o, s, l, m = this, h = m.d, c = m.constructor;
  if (!h)
    return new c(m);
  if (u = t = new c(1), a = f = new c(0), e = new c(a), i = e.e = Qi(h) - m.e - 1, p = i % vr, e.d[0] = qr(10, p < 0 ? vr + p : p), r == null)
    r = i > 0 ? e : u;
  else {
    if (v = new c(r), !v.isInt() || v.lt(u))
      throw Error(Ze + v);
    r = v.gt(e) ? i > 0 ? e : u : v;
  }
  for (dr = false, v = new c($r(h)), o = c.precision, c.precision = i = h.length * vr * 2; s = Ir(v, e, 0, 1, 1), n = t.plus(s.times(a)), n.cmp(r) != 1; )
    t = a, a = n, n = u, u = f.plus(s.times(n)), f = n, n = e, e = v.minus(s.times(n)), v = n;
  return n = Ir(r.minus(t), a, 0, 1, 1), f = f.plus(n.times(u)), t = t.plus(n.times(a)), f.s = u.s = m.s, l = Ir(u, a, i, 1).minus(m).abs().cmp(Ir(f, t, i, 1).minus(m).abs()) < 1 ? [u, a] : [f, t], c.precision = o, dr = true, l;
};
X.toHexadecimal = X.toHex = function(r, e) {
  return Xn(this, 16, r, e);
};
X.toNearest = function(r, e) {
  var t = this, a = t.constructor;
  if (t = new a(t), r == null) {
    if (!t.d)
      return t;
    r = new a(1), e = a.rounding;
  } else {
    if (r = new a(r), e === void 0 ? e = a.rounding : se(e, 0, 8), !t.d)
      return r.s ? t : r;
    if (!r.d)
      return r.s && (r.s = t.s), r;
  }
  return r.d[0] ? (dr = false, t = Ir(t, r, 0, e, 1).times(r), dr = true, sr(t)) : (r.s = t.s, t = r), t;
};
X.toNumber = function() {
  return +this;
};
X.toOctal = function(r, e) {
  return Xn(this, 8, r, e);
};
X.toPower = X.pow = function(r) {
  var e, t, a, n, i, p, v = this, f = v.constructor, u = +(r = new f(r));
  if (!v.d || !r.d || !v.d[0] || !r.d[0])
    return new f(qr(+v, u));
  if (v = new f(v), v.eq(1))
    return v;
  if (a = f.precision, i = f.rounding, r.eq(1))
    return sr(v, a, i);
  if (e = kr(r.e / vr), e >= r.d.length - 1 && (t = u < 0 ? -u : u) <= Ff)
    return n = Gi(f, v, t, a), r.s < 0 ? new f(1).div(n) : sr(n, a, i);
  if (p = v.s, p < 0) {
    if (e < r.d.length - 1)
      return new f(NaN);
    if (r.d[e] & 1 || (p = 1), v.e == 0 && v.d[0] == 1 && v.d.length == 1)
      return v.s = p, v;
  }
  return t = qr(+v, u), e = t == 0 || !isFinite(t) ? kr(u * (Math.log("0." + $r(v.d)) / Math.LN10 + v.e + 1)) : new f(t + "").e, e > f.maxE + 1 || e < f.minE - 1 ? new f(e > 0 ? p / 0 : 0) : (dr = false, f.rounding = v.s = 1, t = Math.min(12, (e + "").length), n = $n(r.times(Le(v, a + t)), a), n.d && (n = sr(n, a + 5, 1), yt(n.d, a, i) && (e = a + 10, n = sr($n(r.times(Le(v, e + t)), e), e + 5, 1), +$r(n.d).slice(a + 1, a + 15) + 1 == 1e14 && (n = sr(n, a + 1, 0)))), n.s = p, dr = true, f.rounding = i, sr(n, a, i));
};
X.toPrecision = function(r, e) {
  var t, a = this, n = a.constructor;
  return r === void 0 ? t = Ce(a, a.e <= n.toExpNeg || a.e >= n.toExpPos) : (se(r, 1, Ve), e === void 0 ? e = n.rounding : se(e, 0, 8), a = sr(new n(a), r, e), t = Ce(a, r <= a.e || a.e <= n.toExpNeg, r)), a.isNeg() && !a.isZero() ? "-" + t : t;
};
X.toSignificantDigits = X.toSD = function(r, e) {
  var t = this, a = t.constructor;
  return r === void 0 ? (r = a.precision, e = a.rounding) : (se(r, 1, Ve), e === void 0 ? e = a.rounding : se(e, 0, 8)), sr(new a(t), r, e);
};
X.toString = function() {
  var r = this, e = r.constructor, t = Ce(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() && !r.isZero() ? "-" + t : t;
};
X.truncated = X.trunc = function() {
  return sr(new this.constructor(this), this.e + 1, 1);
};
X.valueOf = X.toJSON = function() {
  var r = this, e = r.constructor, t = Ce(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() ? "-" + t : t;
};
function $r(r) {
  var e, t, a, n = r.length - 1, i = "", p = r[0];
  if (n > 0) {
    for (i += p, e = 1; e < n; e++)
      a = r[e] + "", t = vr - a.length, t && (i += Ue(t)), i += a;
    p = r[e], a = p + "", t = vr - a.length, t && (i += Ue(t));
  } else if (p === 0)
    return "0";
  for (; p % 10 === 0; )
    p /= 10;
  return i + p;
}
function se(r, e, t) {
  if (r !== ~~r || r < e || r > t)
    throw Error(Ze + r);
}
function yt(r, e, t, a) {
  var n, i, p, v;
  for (i = r[0]; i >= 10; i /= 10)
    --e;
  return --e < 0 ? (e += vr, n = 0) : (n = Math.ceil((e + 1) / vr), e %= vr), i = qr(10, vr - e), v = r[n] % i | 0, a == null ? e < 3 ? (e == 0 ? v = v / 100 | 0 : e == 1 && (v = v / 10 | 0), p = t < 4 && v == 99999 || t > 3 && v == 49999 || v == 5e4 || v == 0) : p = (t < 4 && v + 1 == i || t > 3 && v + 1 == i / 2) && (r[n + 1] / i / 100 | 0) == qr(10, e - 2) - 1 || (v == i / 2 || v == 0) && (r[n + 1] / i / 100 | 0) == 0 : e < 4 ? (e == 0 ? v = v / 1e3 | 0 : e == 1 ? v = v / 100 | 0 : e == 2 && (v = v / 10 | 0), p = (a || t < 4) && v == 9999 || !a && t > 3 && v == 4999) : p = ((a || t < 4) && v + 1 == i || !a && t > 3 && v + 1 == i / 2) && (r[n + 1] / i / 1e3 | 0) == qr(10, e - 3) - 1, p;
}
function Gt(r, e, t) {
  for (var a, n = [0], i, p = 0, v = r.length; p < v; ) {
    for (i = n.length; i--; )
      n[i] *= e;
    for (n[0] += Qn.indexOf(r.charAt(p++)), a = 0; a < n.length; a++)
      n[a] > t - 1 && (n[a + 1] === void 0 && (n[a + 1] = 0), n[a + 1] += n[a] / t | 0, n[a] %= t);
  }
  return n.reverse();
}
function Mf(r, e) {
  var t, a, n;
  if (e.isZero())
    return e;
  a = e.d.length, a < 32 ? (t = Math.ceil(a / 3), n = (1 / Wt(4, t)).toString()) : (t = 16, n = "2.3283064365386962890625e-10"), r.precision += t, e = ut(r, 1, e.times(n), new r(1));
  for (var i = t; i--; ) {
    var p = e.times(e);
    e = p.times(p).minus(p).times(8).plus(1);
  }
  return r.precision -= t, e;
}
var Ir = /* @__PURE__ */ function() {
  function r(a, n, i) {
    var p, v = 0, f = a.length;
    for (a = a.slice(); f--; )
      p = a[f] * n + v, a[f] = p % i | 0, v = p / i | 0;
    return v && a.unshift(v), a;
  }
  function e(a, n, i, p) {
    var v, f;
    if (i != p)
      f = i > p ? 1 : -1;
    else
      for (v = f = 0; v < i; v++)
        if (a[v] != n[v]) {
          f = a[v] > n[v] ? 1 : -1;
          break;
        }
    return f;
  }
  function t(a, n, i, p) {
    for (var v = 0; i--; )
      a[i] -= v, v = a[i] < n[i] ? 1 : 0, a[i] = v * p + a[i] - n[i];
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(a, n, i, p, v, f) {
    var u, o, s, l, m, h, c, d, g, y, x, A, C, D, E, F, b, w, S, M, z = a.constructor, R = a.s == n.s ? 1 : -1, I = a.d, B = n.d;
    if (!I || !I[0] || !B || !B[0])
      return new z(!a.s || !n.s || (I ? B && I[0] == B[0] : !B) ? NaN : I && I[0] == 0 || !B ? R * 0 : R / 0);
    for (f ? (m = 1, o = a.e - n.e) : (f = ye, m = vr, o = kr(a.e / m) - kr(n.e / m)), S = B.length, b = I.length, g = new z(R), y = g.d = [], s = 0; B[s] == (I[s] || 0); s++)
      ;
    if (B[s] > (I[s] || 0) && o--, i == null ? (D = i = z.precision, p = z.rounding) : v ? D = i + (a.e - n.e) + 1 : D = i, D < 0)
      y.push(1), h = true;
    else {
      if (D = D / m + 2 | 0, s = 0, S == 1) {
        for (l = 0, B = B[0], D++; (s < b || l) && D--; s++)
          E = l * f + (I[s] || 0), y[s] = E / B | 0, l = E % B | 0;
        h = l || s < b;
      } else {
        for (l = f / (B[0] + 1) | 0, l > 1 && (B = r(B, l, f), I = r(I, l, f), S = B.length, b = I.length), F = S, x = I.slice(0, S), A = x.length; A < S; )
          x[A++] = 0;
        M = B.slice(), M.unshift(0), w = B[0], B[1] >= f / 2 && ++w;
        do
          l = 0, u = e(B, x, S, A), u < 0 ? (C = x[0], S != A && (C = C * f + (x[1] || 0)), l = C / w | 0, l > 1 ? (l >= f && (l = f - 1), c = r(B, l, f), d = c.length, A = x.length, u = e(c, x, d, A), u == 1 && (l--, t(c, S < d ? M : B, d, f))) : (l == 0 && (u = l = 1), c = B.slice()), d = c.length, d < A && c.unshift(0), t(x, c, A, f), u == -1 && (A = x.length, u = e(B, x, S, A), u < 1 && (l++, t(x, S < A ? M : B, A, f))), A = x.length) : u === 0 && (l++, x = [0]), y[s++] = l, u && x[0] ? x[A++] = I[F] || 0 : (x = [I[F]], A = 1);
        while ((F++ < b || x[0] !== void 0) && D--);
        h = x[0] !== void 0;
      }
      y[0] || y.shift();
    }
    if (m == 1)
      g.e = o, qi = h;
    else {
      for (s = 1, l = y[0]; l >= 10; l /= 10)
        s++;
      g.e = s + o * m - 1, sr(g, v ? i + g.e + 1 : i, p, h);
    }
    return g;
  };
}();
function sr(r, e, t, a) {
  var n, i, p, v, f, u, o, s, l, m = r.constructor;
  r:
    if (e != null) {
      if (s = r.d, !s)
        return r;
      for (n = 1, v = s[0]; v >= 10; v /= 10)
        n++;
      if (i = e - n, i < 0)
        i += vr, p = e, o = s[l = 0], f = o / qr(10, n - p - 1) % 10 | 0;
      else if (l = Math.ceil((i + 1) / vr), v = s.length, l >= v)
        if (a) {
          for (; v++ <= l; )
            s.push(0);
          o = f = 0, n = 1, i %= vr, p = i - vr + 1;
        } else
          break r;
      else {
        for (o = v = s[l], n = 1; v >= 10; v /= 10)
          n++;
        i %= vr, p = i - vr + n, f = p < 0 ? 0 : o / qr(10, n - p - 1) % 10 | 0;
      }
      if (a = a || e < 0 || s[l + 1] !== void 0 || (p < 0 ? o : o % qr(10, n - p - 1)), u = t < 4 ? (f || a) && (t == 0 || t == (r.s < 0 ? 3 : 2)) : f > 5 || f == 5 && (t == 4 || a || t == 6 && (i > 0 ? p > 0 ? o / qr(10, n - p) : 0 : s[l - 1]) % 10 & 1 || t == (r.s < 0 ? 8 : 7)), e < 1 || !s[0])
        return s.length = 0, u ? (e -= r.e + 1, s[0] = qr(10, (vr - e % vr) % vr), r.e = -e || 0) : s[0] = r.e = 0, r;
      if (i == 0 ? (s.length = l, v = 1, l--) : (s.length = l + 1, v = qr(10, vr - i), s[l] = p > 0 ? (o / qr(10, n - p) % qr(10, p) | 0) * v : 0), u)
        for (; ; )
          if (l == 0) {
            for (i = 1, p = s[0]; p >= 10; p /= 10)
              i++;
            for (p = s[0] += v, v = 1; p >= 10; p /= 10)
              v++;
            i != v && (r.e++, s[0] == ye && (s[0] = 1));
            break;
          } else {
            if (s[l] += v, s[l] != ye)
              break;
            s[l--] = 0, v = 1;
          }
      for (i = s.length; s[--i] === 0; )
        s.pop();
    }
  return dr && (r.e > m.maxE ? (r.d = null, r.e = NaN) : r.e < m.minE && (r.e = 0, r.d = [0])), r;
}
function Ce(r, e, t) {
  if (!r.isFinite())
    return $i(r);
  var a, n = r.e, i = $r(r.d), p = i.length;
  return e ? (t && (a = t - p) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Ue(a) : p > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (r.e < 0 ? "e" : "e+") + r.e) : n < 0 ? (i = "0." + Ue(-n - 1) + i, t && (a = t - p) > 0 && (i += Ue(a))) : n >= p ? (i += Ue(n + 1 - p), t && (a = t - n - 1) > 0 && (i = i + "." + Ue(a))) : ((a = n + 1) < p && (i = i.slice(0, a) + "." + i.slice(a)), t && (a = t - p) > 0 && (n + 1 === p && (i += "."), i += Ue(a))), i;
}
function Kt(r, e) {
  var t = r[0];
  for (e *= vr; t >= 10; t /= 10)
    e++;
  return e;
}
function Jt(r, e, t) {
  if (e > bf)
    throw dr = true, t && (r.precision = t), Error(Ui);
  return sr(new r(Yt), e, 1, true);
}
function xe(r, e, t) {
  if (e > Yn)
    throw Error(Ui);
  return sr(new r($t), e, t, true);
}
function Qi(r) {
  var e = r.length - 1, t = e * vr + 1;
  if (e = r[e], e) {
    for (; e % 10 == 0; e /= 10)
      t--;
    for (e = r[0]; e >= 10; e /= 10)
      t++;
  }
  return t;
}
function Ue(r) {
  for (var e = ""; r--; )
    e += "0";
  return e;
}
function Gi(r, e, t, a) {
  var n, i = new r(1), p = Math.ceil(a / vr + 4);
  for (dr = false; ; ) {
    if (t % 2 && (i = i.times(e), Pi(i.d, p) && (n = true)), t = kr(t / 2), t === 0) {
      t = i.d.length - 1, n && i.d[t] === 0 && ++i.d[t];
      break;
    }
    e = e.times(e), Pi(e.d, p);
  }
  return dr = true, i;
}
function Oi(r) {
  return r.d[r.d.length - 1] & 1;
}
function Yi(r, e, t) {
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
  var t, a, n, i, p, v, f, u = 0, o = 0, s = 0, l = r.constructor, m = l.rounding, h = l.precision;
  if (!r.d || !r.d[0] || r.e > 17)
    return new l(r.d ? r.d[0] ? r.s < 0 ? 0 : 1 / 0 : 1 : r.s ? r.s < 0 ? 0 : r : 0 / 0);
  for (e == null ? (dr = false, f = h) : f = e, v = new l(0.03125); r.e > -2; )
    r = r.times(v), s += 5;
  for (a = Math.log(qr(2, s)) / Math.LN10 * 2 + 5 | 0, f += a, t = i = p = new l(1), l.precision = f; ; ) {
    if (i = sr(i.times(r), f, 1), t = t.times(++o), v = p.plus(Ir(i, t, f, 1)), $r(v.d).slice(0, f) === $r(p.d).slice(0, f)) {
      for (n = s; n--; )
        p = sr(p.times(p), f, 1);
      if (e == null)
        if (u < 3 && yt(p.d, f - a, m, u))
          l.precision = f += 10, t = i = v = new l(1), o = 0, u++;
        else
          return sr(p, l.precision = h, m, dr = true);
      else
        return l.precision = h, p;
    }
    p = v;
  }
}
function Le(r, e) {
  var t, a, n, i, p, v, f, u, o, s, l, m = 1, h = 10, c = r, d = c.d, g = c.constructor, y = g.rounding, x = g.precision;
  if (c.s < 0 || !d || !d[0] || !c.e && d[0] == 1 && d.length == 1)
    return new g(d && !d[0] ? -1 / 0 : c.s != 1 ? NaN : d ? 0 : c);
  if (e == null ? (dr = false, o = x) : o = e, g.precision = o += h, t = $r(d), a = t.charAt(0), Math.abs(i = c.e) < 15e14) {
    for (; a < 7 && a != 1 || a == 1 && t.charAt(1) > 3; )
      c = c.times(r), t = $r(c.d), a = t.charAt(0), m++;
    i = c.e, a > 1 ? (c = new g("0." + t), i++) : c = new g(a + "." + t.slice(1));
  } else
    return u = Jt(g, o + 2, x).times(i + ""), c = Le(new g(a + "." + t.slice(1)), o - h).plus(u), g.precision = x, e == null ? sr(c, x, y, dr = true) : c;
  for (s = c, f = p = c = Ir(c.minus(1), c.plus(1), o, 1), l = sr(c.times(c), o, 1), n = 3; ; ) {
    if (p = sr(p.times(l), o, 1), u = f.plus(Ir(p, new g(n), o, 1)), $r(u.d).slice(0, o) === $r(f.d).slice(0, o))
      if (f = f.times(2), i !== 0 && (f = f.plus(Jt(g, o + 2, x).times(i + ""))), f = Ir(f, new g(m), o, 1), e == null)
        if (yt(f.d, o - h, y, v))
          g.precision = o += h, u = p = c = Ir(s.minus(1), s.plus(1), o, 1), l = sr(c.times(c), o, 1), n = v = 1;
        else
          return sr(f, g.precision = x, y, dr = true);
      else
        return g.precision = x, f;
    f = u, n += 2;
  }
}
function $i(r) {
  return String(r.s * r.s / 0);
}
function Jn(r, e) {
  var t, a, n;
  for ((t = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (a = e.search(/e/i)) > 0 ? (t < 0 && (t = a), t += +e.slice(a + 1), e = e.substring(0, a)) : t < 0 && (t = e.length), a = 0; e.charCodeAt(a) === 48; a++)
    ;
  for (n = e.length; e.charCodeAt(n - 1) === 48; --n)
    ;
  if (e = e.slice(a, n), e) {
    if (n -= a, r.e = t = t - a - 1, r.d = [], a = (t + 1) % vr, t < 0 && (a += vr), a < n) {
      for (a && r.d.push(+e.slice(0, a)), n -= vr; a < n; )
        r.d.push(+e.slice(a, a += vr));
      e = e.slice(a), a = vr - e.length;
    } else
      a -= n;
    for (; a--; )
      e += "0";
    r.d.push(+e), dr && (r.e > r.constructor.maxE ? (r.d = null, r.e = NaN) : r.e < r.constructor.minE && (r.e = 0, r.d = [0]));
  } else
    r.e = 0, r.d = [0];
  return r;
}
function Sf(r, e) {
  var t, a, n, i, p, v, f, u, o;
  if (e.indexOf("_") > -1) {
    if (e = e.replace(/(\d)_(?=\d)/g, "$1"), Vi.test(e))
      return Jn(r, e);
  } else if (e === "Infinity" || e === "NaN")
    return +e || (r.s = NaN), r.e = NaN, r.d = null, r;
  if (Ef.test(e))
    t = 16, e = e.toLowerCase();
  else if (Af.test(e))
    t = 2;
  else if (Cf.test(e))
    t = 8;
  else
    throw Error(Ze + e);
  for (i = e.search(/p/i), i > 0 ? (f = +e.slice(i + 1), e = e.substring(2, i)) : e = e.slice(2), i = e.indexOf("."), p = i >= 0, a = r.constructor, p && (e = e.replace(".", ""), v = e.length, i = v - i, n = Gi(a, new a(t), i, i * 2)), u = Gt(e, t, ye), o = u.length - 1, i = o; u[i] === 0; --i)
    u.pop();
  return i < 0 ? new a(r.s * 0) : (r.e = Kt(u, o), r.d = u, dr = false, p && (r = Ir(r, n, v * 4)), f && (r = r.times(Math.abs(f) < 54 ? qr(2, f) : wt.pow(2, f))), dr = true, r);
}
function Nf(r, e) {
  var t, a = e.d.length;
  if (a < 3)
    return e.isZero() ? e : ut(r, 2, e, e);
  t = 1.4 * Math.sqrt(a), t = t > 16 ? 16 : t | 0, e = e.times(1 / Wt(5, t)), e = ut(r, 2, e, e);
  for (var n, i = new r(5), p = new r(16), v = new r(20); t--; )
    n = e.times(e), e = e.times(i.plus(n.times(p.times(n).minus(v))));
  return e;
}
function ut(r, e, t, a, n) {
  var i, p, v, f, u = 1, o = r.precision, s = Math.ceil(o / vr);
  for (dr = false, f = t.times(t), v = new r(a); ; ) {
    if (p = Ir(v.times(f), new r(e++ * e++), o, 1), v = n ? a.plus(p) : a.minus(p), a = Ir(p.times(f), new r(e++ * e++), o, 1), p = v.plus(a), p.d[s] !== void 0) {
      for (i = s; p.d[i] === v.d[i] && i--; )
        ;
      if (i == -1)
        break;
    }
    i = v, v = a, a = p, p = i, u++;
  }
  return dr = true, p.d.length = s + 1, p;
}
function Wt(r, e) {
  for (var t = r; --e; )
    t *= r;
  return t;
}
function Ji(r, e) {
  var t, a = e.s < 0, n = xe(r, r.precision, 1), i = n.times(0.5);
  if (e = e.abs(), e.lte(i))
    return Be = a ? 4 : 1, e;
  if (t = e.divToInt(n), t.isZero())
    Be = a ? 3 : 2;
  else {
    if (e = e.minus(t.times(n)), e.lte(i))
      return Be = Oi(t) ? a ? 2 : 3 : a ? 4 : 1, e;
    Be = Oi(t) ? a ? 1 : 4 : a ? 3 : 2;
  }
  return e.minus(n).abs();
}
function Xn(r, e, t, a) {
  var n, i, p, v, f, u, o, s, l, m = r.constructor, h = t !== void 0;
  if (h ? (se(t, 1, Ve), a === void 0 ? a = m.rounding : se(a, 0, 8)) : (t = m.precision, a = m.rounding), !r.isFinite())
    o = $i(r);
  else {
    for (o = Ce(r), p = o.indexOf("."), h ? (n = 2, e == 16 ? t = t * 4 - 3 : e == 8 && (t = t * 3 - 2)) : n = e, p >= 0 && (o = o.replace(".", ""), l = new m(1), l.e = o.length - p, l.d = Gt(Ce(l), 10, n), l.e = l.d.length), s = Gt(o, 10, n), i = f = s.length; s[--f] == 0; )
      s.pop();
    if (!s[0])
      o = h ? "0p+0" : "0";
    else {
      if (p < 0 ? i-- : (r = new m(r), r.d = s, r.e = i, r = Ir(r, l, t, a, 0, n), s = r.d, i = r.e, u = qi), p = s[t], v = n / 2, u = u || s[t + 1] !== void 0, u = a < 4 ? (p !== void 0 || u) && (a === 0 || a === (r.s < 0 ? 3 : 2)) : p > v || p === v && (a === 4 || u || a === 6 && s[t - 1] & 1 || a === (r.s < 0 ? 8 : 7)), s.length = t, u)
        for (; ++s[--t] > n - 1; )
          s[t] = 0, t || (++i, s.unshift(1));
      for (f = s.length; !s[f - 1]; --f)
        ;
      for (p = 0, o = ""; p < f; p++)
        o += Qn.charAt(s[p]);
      if (h) {
        if (f > 1)
          if (e == 16 || e == 8) {
            for (p = e == 16 ? 4 : 3, --f; f % p; f++)
              o += "0";
            for (s = Gt(o, n, e), f = s.length; !s[f - 1]; --f)
              ;
            for (p = 1, o = "1."; p < f; p++)
              o += Qn.charAt(s[p]);
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
function Pi(r, e) {
  if (r.length > e)
    return r.length = e, true;
}
function Bf(r) {
  return new this(r).abs();
}
function _f(r) {
  return new this(r).acos();
}
function Tf(r) {
  return new this(r).acosh();
}
function If(r, e) {
  return new this(r).plus(e);
}
function zf(r) {
  return new this(r).asin();
}
function Of(r) {
  return new this(r).asinh();
}
function Pf(r) {
  return new this(r).atan();
}
function Rf(r) {
  return new this(r).atanh();
}
function qf(r, e) {
  r = new this(r), e = new this(e);
  var t, a = this.precision, n = this.rounding, i = a + 4;
  return !r.s || !e.s ? t = new this(NaN) : !r.d && !e.d ? (t = xe(this, i, 1).times(e.s > 0 ? 0.25 : 0.75), t.s = r.s) : !e.d || r.isZero() ? (t = e.s < 0 ? xe(this, a, n) : new this(0), t.s = r.s) : !r.d || e.isZero() ? (t = xe(this, i, 1).times(0.5), t.s = r.s) : e.s < 0 ? (this.precision = i, this.rounding = 1, t = this.atan(Ir(r, e, i, 1)), e = xe(this, i, 1), this.precision = a, this.rounding = n, t = r.s < 0 ? t.minus(e) : t.plus(e)) : t = this.atan(Ir(r, e, i, 1)), t;
}
function Uf(r) {
  return new this(r).cbrt();
}
function Lf(r) {
  return sr(r = new this(r), r.e + 1, 2);
}
function Zf(r, e, t) {
  return new this(r).clamp(e, t);
}
function Vf(r) {
  if (!r || typeof r != "object")
    throw Error(Xt + "Object expected");
  var e, t, a, n = r.defaults === true, i = ["precision", 1, Ve, "rounding", 0, 8, "toExpNeg", -it, 0, "toExpPos", 0, it, "maxE", 0, it, "minE", -it, 0, "modulo", 0, 9];
  for (e = 0; e < i.length; e += 3)
    if (t = i[e], n && (this[t] = Gn[t]), (a = r[t]) !== void 0)
      if (kr(a) === a && a >= i[e + 1] && a <= i[e + 2])
        this[t] = a;
      else
        throw Error(Ze + t + ": " + a);
  if (t = "crypto", n && (this[t] = Gn[t]), (a = r[t]) !== void 0)
    if (a === true || a === false || a === 0 || a === 1)
      if (a)
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[t] = true;
        else
          throw Error(Li);
      else
        this[t] = false;
    else
      throw Error(Ze + t + ": " + a);
  return this;
}
function Qf(r) {
  return new this(r).cos();
}
function Gf(r) {
  return new this(r).cosh();
}
function Xi(r) {
  var e, t, a;
  function n(i) {
    var p, v, f, u = this;
    if (!(u instanceof n))
      return new n(i);
    if (u.constructor = n, Ri(i)) {
      u.s = i.s, dr ? !i.d || i.e > n.maxE ? (u.e = NaN, u.d = null) : i.e < n.minE ? (u.e = 0, u.d = [0]) : (u.e = i.e, u.d = i.d.slice()) : (u.e = i.e, u.d = i.d ? i.d.slice() : i.d);
      return;
    }
    if (f = typeof i, f === "number") {
      if (i === 0) {
        u.s = 1 / i < 0 ? -1 : 1, u.e = 0, u.d = [0];
        return;
      }
      if (i < 0 ? (i = -i, u.s = -1) : u.s = 1, i === ~~i && i < 1e7) {
        for (p = 0, v = i; v >= 10; v /= 10)
          p++;
        dr ? p > n.maxE ? (u.e = NaN, u.d = null) : p < n.minE ? (u.e = 0, u.d = [0]) : (u.e = p, u.d = [i]) : (u.e = p, u.d = [i]);
        return;
      } else if (i * 0 !== 0) {
        i || (u.s = NaN), u.e = NaN, u.d = null;
        return;
      }
      return Jn(u, i.toString());
    } else if (f !== "string")
      throw Error(Ze + i);
    return (v = i.charCodeAt(0)) === 45 ? (i = i.slice(1), u.s = -1) : (v === 43 && (i = i.slice(1)), u.s = 1), Vi.test(i) ? Jn(u, i) : Sf(u, i);
  }
  if (n.prototype = X, n.ROUND_UP = 0, n.ROUND_DOWN = 1, n.ROUND_CEIL = 2, n.ROUND_FLOOR = 3, n.ROUND_HALF_UP = 4, n.ROUND_HALF_DOWN = 5, n.ROUND_HALF_EVEN = 6, n.ROUND_HALF_CEIL = 7, n.ROUND_HALF_FLOOR = 8, n.EUCLID = 9, n.config = n.set = Vf, n.clone = Xi, n.isDecimal = Ri, n.abs = Bf, n.acos = _f, n.acosh = Tf, n.add = If, n.asin = zf, n.asinh = Of, n.atan = Pf, n.atanh = Rf, n.atan2 = qf, n.cbrt = Uf, n.ceil = Lf, n.clamp = Zf, n.cos = Qf, n.cosh = Gf, n.div = Yf, n.exp = $f, n.floor = Jf, n.hypot = Xf, n.ln = Kf, n.log = Wf, n.log10 = kf, n.log2 = Hf, n.max = jf, n.min = rc, n.mod = ec, n.mul = tc, n.pow = nc, n.random = ac, n.round = oc, n.sign = ic, n.sin = uc, n.sinh = sc, n.sqrt = fc, n.sub = cc, n.sum = lc, n.tan = pc, n.tanh = vc, n.trunc = mc, r === void 0 && (r = {}), r && r.defaults !== true)
    for (a = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], e = 0; e < a.length; )
      r.hasOwnProperty(t = a[e++]) || (r[t] = this[t]);
  return n.config(r), n;
}
function Yf(r, e) {
  return new this(r).div(e);
}
function $f(r) {
  return new this(r).exp();
}
function Jf(r) {
  return sr(r = new this(r), r.e + 1, 3);
}
function Xf() {
  var r, e, t = new this(0);
  for (dr = false, r = 0; r < arguments.length; )
    if (e = new this(arguments[r++]), e.d)
      t.d && (t = t.plus(e.times(e)));
    else {
      if (e.s)
        return dr = true, new this(1 / 0);
      t = e;
    }
  return dr = true, t.sqrt();
}
function Ri(r) {
  return r instanceof wt || r && r.toStringTag === Zi || false;
}
function Kf(r) {
  return new this(r).ln();
}
function Wf(r, e) {
  return new this(r).log(e);
}
function Hf(r) {
  return new this(r).log(2);
}
function kf(r) {
  return new this(r).log(10);
}
function jf() {
  return Yi(this, arguments, "lt");
}
function rc() {
  return Yi(this, arguments, "gt");
}
function ec(r, e) {
  return new this(r).mod(e);
}
function tc(r, e) {
  return new this(r).mul(e);
}
function nc(r, e) {
  return new this(r).pow(e);
}
function ac(r) {
  var e, t, a, n, i = 0, p = new this(1), v = [];
  if (r === void 0 ? r = this.precision : se(r, 1, Ve), a = Math.ceil(r / vr), this.crypto)
    if (crypto.getRandomValues)
      for (e = crypto.getRandomValues(new Uint32Array(a)); i < a; )
        n = e[i], n >= 429e7 ? e[i] = crypto.getRandomValues(new Uint32Array(1))[0] : v[i++] = n % 1e7;
    else if (crypto.randomBytes) {
      for (e = crypto.randomBytes(a *= 4); i < a; )
        n = e[i] + (e[i + 1] << 8) + (e[i + 2] << 16) + ((e[i + 3] & 127) << 24), n >= 214e7 ? crypto.randomBytes(4).copy(e, i) : (v.push(n % 1e7), i += 4);
      i = a / 4;
    } else
      throw Error(Li);
  else
    for (; i < a; )
      v[i++] = Math.random() * 1e7 | 0;
  for (a = v[--i], r %= vr, a && r && (n = qr(10, vr - r), v[i] = (a / n | 0) * n); v[i] === 0; i--)
    v.pop();
  if (i < 0)
    t = 0, v = [0];
  else {
    for (t = -1; v[0] === 0; t -= vr)
      v.shift();
    for (a = 1, n = v[0]; n >= 10; n /= 10)
      a++;
    a < vr && (t -= vr - a);
  }
  return p.e = t, p.d = v, p;
}
function oc(r) {
  return sr(r = new this(r), r.e + 1, this.rounding);
}
function ic(r) {
  return r = new this(r), r.d ? r.d[0] ? r.s : 0 * r.s : r.s || NaN;
}
function uc(r) {
  return new this(r).sin();
}
function sc(r) {
  return new this(r).sinh();
}
function fc(r) {
  return new this(r).sqrt();
}
function cc(r, e) {
  return new this(r).sub(e);
}
function lc() {
  var r = 0, e = arguments, t = new this(e[r]);
  for (dr = false; t.s && ++r < e.length; )
    t = t.plus(e[r]);
  return dr = true, sr(t, this.precision, this.rounding);
}
function pc(r) {
  return new this(r).tan();
}
function vc(r) {
  return new this(r).tanh();
}
function mc(r) {
  return sr(r = new this(r), r.e + 1, 1);
}
X[Symbol.for("nodejs.util.inspect.custom")] = X.toString;
X[Symbol.toStringTag] = "Decimal";
var wt = X.constructor = Xi(Gn);
Yt = new wt(Yt);
$t = new wt($t);
var Kn = wt;
var hc = "BigNumber";
var dc = ["?on", "config"];
var Wn = P(hc, dc, (r) => {
  var { on: e, config: t } = r, a = Kn.clone({ precision: t.precision, modulo: Kn.EUCLID });
  return a.prototype = Object.create(a.prototype), a.prototype.type = "BigNumber", a.prototype.isBigNumber = true, a.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, a.fromJSON = function(n) {
    return new a(n.value);
  }, e && e("config", function(n, i) {
    n.precision !== i.precision && a.config({ precision: n.precision });
  }), a;
}, { isClass: true });
var Vr = Ot(Wi(), 1);
var gc = "Complex";
var Dc = [];
var kn = P(gc, Dc, () => (Object.defineProperty(Vr.default, "name", { value: "Complex" }), Vr.default.prototype.constructor = Vr.default, Vr.default.prototype.type = "Complex", Vr.default.prototype.isComplex = true, Vr.default.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, Vr.default.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, Vr.default.prototype.format = function(r) {
  var e = "", t = this.im, a = this.re, n = Dt(this.re, r), i = Dt(this.im, r), p = Sr(r) ? r : r ? r.precision : null;
  if (p !== null) {
    var v = Math.pow(10, -p);
    Math.abs(a / t) < v && (a = 0), Math.abs(t / a) < v && (t = 0);
  }
  return t === 0 ? e = n : a === 0 ? t === 1 ? e = "i" : t === -1 ? e = "-i" : e = i + "i" : t < 0 ? t === -1 ? e = n + " - i" : e = n + " - " + i.substring(1) + "i" : t === 1 ? e = n + " + i" : e = n + " + " + i + "i", e;
}, Vr.default.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object")
        return (0, Vr.default)(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var t = arguments[0], a = arguments[1];
      if (Sr(t)) {
        if (Pt(a) && a.hasBase("ANGLE") && (a = a.toNumber("rad")), Sr(a))
          return new Vr.default({ r: t, phi: a });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else
        throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Vr.default.prototype.valueOf = Vr.default.prototype.toString, Vr.default.fromJSON = function(r) {
  return new Vr.default(r);
}, Vr.default.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, Vr.default), { isClass: true });
var Fe = Ot(ki(), 1);
var xc = "Fraction";
var yc = [];
var ra = P(xc, yc, () => (Object.defineProperty(Fe.default, "name", { value: "Fraction" }), Fe.default.prototype.constructor = Fe.default, Fe.default.prototype.type = "Fraction", Fe.default.prototype.isFraction = true, Fe.default.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: this.s * this.n, d: this.d };
}, Fe.default.fromJSON = function(r) {
  return new Fe.default(r);
}, Fe.default), { isClass: true });
var wc = "Matrix";
var Ac = [];
var ea = P(wc, Ac, () => {
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
function Ht(r) {
  return Object.keys(r.signatures || {}).reduce(function(e, t) {
    var a = (t.match(/,/g) || []).length + 1;
    return Math.max(e, a);
  }, -1);
}
var Ec = "DenseMatrix";
var Cc = ["Matrix"];
var ta = P(Ec, Cc, (r) => {
  var { Matrix: e } = r;
  function t(o, s) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (s && !Kr(s))
      throw new Error("Invalid datatype: " + s);
    if (wr(o))
      o.type === "DenseMatrix" ? (this._data = pr(o._data), this._size = pr(o._size), this._datatype = s || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = s || o._datatype);
    else if (o && Fr(o.data) && Fr(o.size))
      this._data = o.data, this._size = o.size, On(this._data, this._size), this._datatype = s || o.datatype;
    else if (Fr(o))
      this._data = u(o), this._size = Br(this._data), On(this._data, this._size), this._datatype = s;
    else {
      if (o)
        throw new TypeError("Unsupported type of data (" + Yr(o) + ")");
      this._data = [], this._size = [0], this._datatype = s;
    }
  }
  t.prototype = new e(), t.prototype.createDenseMatrix = function(o, s) {
    return new t(o, s);
  }, Object.defineProperty(t, "name", { value: "DenseMatrix" }), t.prototype.constructor = t, t.prototype.type = "DenseMatrix", t.prototype.isDenseMatrix = true, t.prototype.getDataType = function() {
    return ot(this._data, Yr);
  }, t.prototype.storage = function() {
    return "dense";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(o, s) {
    return new t(o, s);
  }, t.prototype.subset = function(o, s, l) {
    switch (arguments.length) {
      case 1:
        return a(this, o);
      case 2:
      case 3:
        return i(this, o, s, l);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, t.prototype.get = function(o) {
    if (!Fr(o))
      throw new TypeError("Array expected");
    if (o.length !== this._size.length)
      throw new hr(o.length, this._size.length);
    for (var s = 0; s < o.length; s++)
      Nr(o[s], this._size[s]);
    for (var l = this._data, m = 0, h = o.length; m < h; m++) {
      var c = o[m];
      Nr(c, l.length), l = l[c];
    }
    return l;
  }, t.prototype.set = function(o, s, l) {
    if (!Fr(o))
      throw new TypeError("Array expected");
    if (o.length < this._size.length)
      throw new hr(o.length, this._size.length, "<");
    var m, h, c, d = o.map(function(y) {
      return y + 1;
    });
    f(this, d, l);
    var g = this._data;
    for (m = 0, h = o.length - 1; m < h; m++)
      c = o[m], Nr(c, g.length), g = g[c];
    return c = o[o.length - 1], Nr(c, g.length), g[c] = s, this;
  };
  function a(o, s) {
    if (!Re(s))
      throw new TypeError("Invalid index");
    var l = s.isScalar();
    if (l)
      return o.get(s.min());
    var m = s.size();
    if (m.length !== o._size.length)
      throw new hr(m.length, o._size.length);
    for (var h = s.min(), c = s.max(), d = 0, g = o._size.length; d < g; d++)
      Nr(h[d], o._size[d]), Nr(c[d], o._size[d]);
    return new t(n(o._data, s, m.length, 0), o._datatype);
  }
  function n(o, s, l, m) {
    var h = m === l - 1, c = s.dimension(m);
    return h ? c.map(function(d) {
      return Nr(d, o.length), o[d];
    }).valueOf() : c.map(function(d) {
      Nr(d, o.length);
      var g = o[d];
      return n(g, s, l, m + 1);
    }).valueOf();
  }
  function i(o, s, l, m) {
    if (!s || s.isIndex !== true)
      throw new TypeError("Invalid index");
    var h = s.size(), c = s.isScalar(), d;
    if (wr(l) ? (d = l.size(), l = l.valueOf()) : d = Br(l), c) {
      if (d.length !== 0)
        throw new TypeError("Scalar expected");
      o.set(s.min(), l, m);
    } else {
      if (h.length < o._size.length)
        throw new hr(h.length, o._size.length, "<");
      if (d.length < h.length) {
        for (var g = 0, y = 0; h[g] === 1 && d[g] === 1; )
          g++;
        for (; h[g] === 1; )
          y++, g++;
        l = Lt(l, h.length, y, d);
      }
      if (!tt(h, d))
        throw new hr(h, d, ">");
      var x = s.max().map(function(D) {
        return D + 1;
      });
      f(o, x, m);
      var A = h.length, C = 0;
      p(o._data, s, l, A, C);
    }
    return o;
  }
  function p(o, s, l, m, h) {
    var c = h === m - 1, d = s.dimension(h);
    c ? d.forEach(function(g, y) {
      Nr(g), o[g] = l[y[0]];
    }) : d.forEach(function(g, y) {
      Nr(g), p(o[g], s, l[y[0]], m, h + 1);
    });
  }
  t.prototype.resize = function(o, s, l) {
    if (!Xe(o))
      throw new TypeError("Array or Matrix expected");
    var m = o.valueOf().map((c) => Array.isArray(c) && c.length === 1 ? c[0] : c), h = l ? this.clone() : this;
    return v(h, m, s);
  };
  function v(o, s, l) {
    if (s.length === 0) {
      for (var m = o._data; Fr(m); )
        m = m[0];
      return m;
    }
    return o._size = s.slice(0), o._data = We(o._data, o._size, l), o;
  }
  t.prototype.reshape = function(o, s) {
    var l = s ? this.clone() : this;
    l._data = Mi(l._data, o);
    var m = l._size.reduce((h, c) => h * c);
    return l._size = xt(o, m), l;
  };
  function f(o, s, l) {
    for (var m = o._size.slice(0), h = false; m.length < s.length; )
      m.push(0), h = true;
    for (var c = 0, d = s.length; c < d; c++)
      s[c] > m[c] && (m[c] = s[c], h = true);
    h && v(o, m, l);
  }
  t.prototype.clone = function() {
    var o = new t({ data: pr(this._data), size: pr(this._size), datatype: this._datatype });
    return o;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(o) {
    var s = this, l = Ht(o), m = function d(g, y) {
      return Fr(g) ? g.map(function(x, A) {
        return d(x, y.concat(A));
      }) : l === 1 ? o(g) : l === 2 ? o(g, y) : o(g, y, s);
    }, h = m(this._data, []), c = this._datatype !== void 0 ? ot(h, Yr) : void 0;
    return new t(h, c);
  }, t.prototype.forEach = function(o) {
    var s = this, l = function m(h, c) {
      Fr(h) ? h.forEach(function(d, g) {
        m(d, c.concat(g));
      }) : o(h, c, s);
    };
    l(this._data, []);
  }, t.prototype[Symbol.iterator] = function* () {
    var o = function* s(l, m) {
      if (Fr(l))
        for (var h = 0; h < l.length; h++)
          yield* s(l[h], m.concat(h));
      else
        yield { value: l, index: m };
    };
    yield* o(this._data, []);
  }, t.prototype.rows = function() {
    var o = [], s = this.size();
    if (s.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    var l = this._data;
    for (var m of l)
      o.push(new t([m], this._datatype));
    return o;
  }, t.prototype.columns = function() {
    var o = this, s = [], l = this.size();
    if (l.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var m = this._data, h = function(g) {
      var y = m.map((x) => [x[g]]);
      s.push(new t(y, o._datatype));
    }, c = 0; c < l[1]; c++)
      h(c);
    return s;
  }, t.prototype.toArray = function() {
    return pr(this._data);
  }, t.prototype.valueOf = function() {
    return this._data;
  }, t.prototype.format = function(o) {
    return Mr(this._data, o);
  }, t.prototype.toString = function() {
    return Mr(this._data);
  }, t.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(o) {
    if (o) {
      if (_r(o) && (o = o.toNumber()), !Sr(o) || !mr(o))
        throw new TypeError("The parameter k must be an integer number");
    } else
      o = 0;
    for (var s = o > 0 ? o : 0, l = o < 0 ? -o : 0, m = this._size[0], h = this._size[1], c = Math.min(m - l, h - s), d = [], g = 0; g < c; g++)
      d[g] = this._data[g + l][g + s];
    return new t({ data: d, size: [c], datatype: this._datatype });
  }, t.diagonal = function(o, s, l, m) {
    if (!Fr(o))
      throw new TypeError("Array expected, size parameter");
    if (o.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(E) {
      if (_r(E) && (E = E.toNumber()), !Sr(E) || !mr(E) || E < 1)
        throw new Error("Size values must be positive integers");
      return E;
    }), l) {
      if (_r(l) && (l = l.toNumber()), !Sr(l) || !mr(l))
        throw new TypeError("The parameter k must be an integer number");
    } else
      l = 0;
    var h = l > 0 ? l : 0, c = l < 0 ? -l : 0, d = o[0], g = o[1], y = Math.min(d - c, g - h), x;
    if (Fr(s)) {
      if (s.length !== y)
        throw new Error("Invalid value array length");
      x = function(F) {
        return s[F];
      };
    } else if (wr(s)) {
      var A = s.size();
      if (A.length !== 1 || A[0] !== y)
        throw new Error("Invalid matrix length");
      x = function(F) {
        return s.get([F]);
      };
    } else
      x = function() {
        return s;
      };
    m || (m = _r(x(0)) ? x(0).mul(0) : 0);
    var C = [];
    if (o.length > 0) {
      C = We(C, o, m);
      for (var D = 0; D < y; D++)
        C[D + c][D + h] = x(D);
    }
    return new t({ data: C, size: [d, g] });
  }, t.fromJSON = function(o) {
    return new t(o);
  }, t.prototype.swapRows = function(o, s) {
    if (!Sr(o) || !mr(o) || !Sr(s) || !mr(s))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Nr(o, this._size[0]), Nr(s, this._size[0]), t._swapRows(o, s, this._data), this;
  }, t._swapRows = function(o, s, l) {
    var m = l[o];
    l[o] = l[s], l[s] = m;
  };
  function u(o) {
    for (var s = 0, l = o.length; s < l; s++) {
      var m = o[s];
      Fr(m) ? o[s] = u(m) : m && m.isMatrix === true && (o[s] = u(m.valueOf()));
    }
    return o;
  }
  return t;
}, { isClass: true });
function zr(r, e, t) {
  return r && typeof r.map == "function" ? r.map(function(a) {
    return zr(a, e, t);
  }) : e(r);
}
var ji = "isInteger";
var Fc = ["typed"];
var na = P(ji, Fc, (r) => {
  var { typed: e } = r;
  return e(ji, { number: mr, BigNumber: function(a) {
    return a.isInt();
  }, Fraction: function(a) {
    return a.d === 1 && isFinite(a.n);
  }, "Array | Matrix": e.referToSelf((t) => (a) => zr(a, t)) });
});
var fe = "number";
var _e = "number, number";
function aa(r) {
  return Math.abs(r);
}
aa.signature = fe;
function oa(r, e) {
  return r + e;
}
oa.signature = _e;
function bc(r, e) {
  return r - e;
}
bc.signature = _e;
function ia(r, e) {
  return r * e;
}
ia.signature = _e;
function Mc(r, e) {
  return r / e;
}
Mc.signature = _e;
function ua(r) {
  return -r;
}
ua.signature = fe;
function Sc(r) {
  return r;
}
Sc.signature = fe;
function Nc(r) {
  return Di(r);
}
Nc.signature = fe;
function Bc(r) {
  return r * r * r;
}
Bc.signature = fe;
function _c(r) {
  return Math.exp(r);
}
_c.signature = fe;
function Tc(r) {
  return xi(r);
}
Tc.signature = fe;
function Ic(r, e) {
  if (!mr(r) || !mr(e))
    throw new Error("Parameters in function gcd must be integer numbers");
  for (var t; e !== 0; )
    t = r % e, r = e, e = t;
  return r < 0 ? -r : r;
}
Ic.signature = _e;
function zc(r, e) {
  if (!mr(r) || !mr(e))
    throw new Error("Parameters in function lcm must be integer numbers");
  if (r === 0 || e === 0)
    return 0;
  for (var t, a = r * e; e !== 0; )
    t = e, e = r % t, r = t;
  return Math.abs(a / r);
}
zc.signature = _e;
function Oc(r) {
  return di(r);
}
Oc.signature = fe;
function Pc(r) {
  return hi(r);
}
Pc.signature = fe;
function Rc(r) {
  return gi(r);
}
Rc.signature = fe;
function qc(r, e) {
  if (e > 0)
    return r - e * Math.floor(r / e);
  if (e === 0)
    return r;
  throw new Error("Cannot calculate mod for a negative divisor");
}
qc.signature = _e;
function kt(r) {
  return mi(r);
}
kt.signature = fe;
function Uc(r) {
  return Math.sqrt(r);
}
Uc.signature = fe;
function Lc(r) {
  return r * r;
}
Lc.signature = fe;
function Zc(r, e) {
  var t, a, n, i = 0, p = 1, v = 1, f = 0;
  if (!mr(r) || !mr(e))
    throw new Error("Parameters in function xgcd must be integer numbers");
  for (; e; )
    a = Math.floor(r / e), n = r - a * e, t = i, i = p - a * i, p = t, t = v, v = f - a * v, f = t, r = e, e = n;
  var u;
  return r < 0 ? u = [-r, -p, -f] : u = [r, r ? p : 0, f], u;
}
Zc.signature = _e;
function sa(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
sa.signature = _e;
function Vc(r) {
  return Math.abs(r);
}
Vc.signature = fe;
var At = "number";
function Qc(r) {
  return mr(r);
}
Qc.signature = At;
function Gc(r) {
  return r < 0;
}
Gc.signature = At;
function Yc(r) {
  return r > 0;
}
Yc.signature = At;
function fa(r) {
  return r === 0;
}
fa.signature = At;
function $c(r) {
  return Number.isNaN(r);
}
$c.signature = At;
var ru = "isZero";
var Jc = ["typed"];
var ca = P(ru, Jc, (r) => {
  var { typed: e } = r;
  return e(ru, { number: fa, BigNumber: function(a) {
    return a.isZero();
  }, Complex: function(a) {
    return a.re === 0 && a.im === 0;
  }, Fraction: function(a) {
    return a.d === 1 && a.n === 0;
  }, Unit: e.referToSelf((t) => (a) => e.find(t, a.valueType())(a.value)), "Array | Matrix": e.referToSelf((t) => (a) => zr(a, t)) });
});
function he(r, e, t) {
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
function eu(r, e, t) {
  return Hr(r.re, e.re, t) && Hr(r.im, e.im, t);
}
var de = P("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((t) => (a, n) => {
    if (!a.equalBase(n))
      throw new Error("Cannot compare units with different base");
    return e.find(t, [a.valueType(), n.valueType()])(a.value, n.value);
  }) };
});
var jt = "equalScalar";
var Xc = ["typed", "config"];
var la = P(jt, Xc, (r) => {
  var { typed: e, config: t } = r, a = de({ typed: e });
  return e(jt, { "boolean, boolean": function(i, p) {
    return i === p;
  }, "number, number": function(i, p) {
    return Hr(i, p, t.epsilon);
  }, "BigNumber, BigNumber": function(i, p) {
    return i.eq(p) || he(i, p, t.epsilon);
  }, "Fraction, Fraction": function(i, p) {
    return i.equals(p);
  }, "Complex, Complex": function(i, p) {
    return eu(i, p, t.epsilon);
  } }, a);
});
var wm = P(jt, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(jt, { "number, number": function(n, i) {
    return Hr(n, i, t.epsilon);
  } });
});
var Kc = "SparseMatrix";
var Wc = ["typed", "equalScalar", "Matrix"];
var pa = P(Kc, Wc, (r) => {
  var { typed: e, equalScalar: t, Matrix: a } = r;
  function n(c, d) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (d && !Kr(d))
      throw new Error("Invalid datatype: " + d);
    if (wr(c))
      i(this, c, d);
    else if (c && Fr(c.index) && Fr(c.ptr) && Fr(c.size))
      this._values = c.values, this._index = c.index, this._ptr = c.ptr, this._size = c.size, this._datatype = d || c.datatype;
    else if (Fr(c))
      p(this, c, d);
    else {
      if (c)
        throw new TypeError("Unsupported type of data (" + Yr(c) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = d;
    }
  }
  function i(c, d, g) {
    d.type === "SparseMatrix" ? (c._values = d._values ? pr(d._values) : void 0, c._index = pr(d._index), c._ptr = pr(d._ptr), c._size = pr(d._size), c._datatype = g || d._datatype) : p(c, d.valueOf(), g || d._datatype);
  }
  function p(c, d, g) {
    c._values = [], c._index = [], c._ptr = [], c._datatype = g;
    var y = d.length, x = 0, A = t, C = 0;
    if (Kr(g) && (A = e.find(t, [g, g]) || t, C = e.convert(0, g)), y > 0) {
      var D = 0;
      do {
        c._ptr.push(c._index.length);
        for (var E = 0; E < y; E++) {
          var F = d[E];
          if (Fr(F)) {
            if (D === 0 && x < F.length && (x = F.length), D < F.length) {
              var b = F[D];
              A(b, C) || (c._values.push(b), c._index.push(E));
            }
          } else
            D === 0 && x < 1 && (x = 1), A(F, C) || (c._values.push(F), c._index.push(E));
        }
        D++;
      } while (D < x);
    }
    c._ptr.push(c._index.length), c._size = [y, x];
  }
  n.prototype = new a(), n.prototype.createSparseMatrix = function(c, d) {
    return new n(c, d);
  }, Object.defineProperty(n, "name", { value: "SparseMatrix" }), n.prototype.constructor = n, n.prototype.type = "SparseMatrix", n.prototype.isSparseMatrix = true, n.prototype.getDataType = function() {
    return ot(this._values, Yr);
  }, n.prototype.storage = function() {
    return "sparse";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(c, d) {
    return new n(c, d);
  }, n.prototype.density = function() {
    var c = this._size[0], d = this._size[1];
    return c !== 0 && d !== 0 ? this._index.length / (c * d) : 0;
  }, n.prototype.subset = function(c, d, g) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return v(this, c);
      case 2:
      case 3:
        return f(this, c, d, g);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function v(c, d) {
    if (!Re(d))
      throw new TypeError("Invalid index");
    var g = d.isScalar();
    if (g)
      return c.get(d.min());
    var y = d.size();
    if (y.length !== c._size.length)
      throw new hr(y.length, c._size.length);
    var x, A, C, D, E = d.min(), F = d.max();
    for (x = 0, A = c._size.length; x < A; x++)
      Nr(E[x], c._size[x]), Nr(F[x], c._size[x]);
    var b = c._values, w = c._index, S = c._ptr, M = d.dimension(0), z = d.dimension(1), R = [], I = [];
    M.forEach(function(_, T) {
      I[_] = T[0], R[_] = true;
    });
    var B = b ? [] : void 0, Q = [], Z = [];
    return z.forEach(function(_) {
      for (Z.push(Q.length), C = S[_], D = S[_ + 1]; C < D; C++)
        x = w[C], R[x] === true && (Q.push(I[x]), B && B.push(b[C]));
    }), Z.push(Q.length), new n({ values: B, index: Q, ptr: Z, size: y, datatype: c._datatype });
  }
  function f(c, d, g, y) {
    if (!d || d.isIndex !== true)
      throw new TypeError("Invalid index");
    var x = d.size(), A = d.isScalar(), C;
    if (wr(g) ? (C = g.size(), g = g.toArray()) : C = Br(g), A) {
      if (C.length !== 0)
        throw new TypeError("Scalar expected");
      c.set(d.min(), g, y);
    } else {
      if (x.length !== 1 && x.length !== 2)
        throw new hr(x.length, c._size.length, "<");
      if (C.length < x.length) {
        for (var D = 0, E = 0; x[D] === 1 && C[D] === 1; )
          D++;
        for (; x[D] === 1; )
          E++, D++;
        g = Lt(g, x.length, E, C);
      }
      if (!tt(x, C))
        throw new hr(x, C, ">");
      if (x.length === 1) {
        var F = d.dimension(0);
        F.forEach(function(S, M) {
          Nr(S), c.set([S, 0], g[M[0]], y);
        });
      } else {
        var b = d.dimension(0), w = d.dimension(1);
        b.forEach(function(S, M) {
          Nr(S), w.forEach(function(z, R) {
            Nr(z), c.set([S, z], g[M[0]][R[0]], y);
          });
        });
      }
    }
    return c;
  }
  n.prototype.get = function(c) {
    if (!Fr(c))
      throw new TypeError("Array expected");
    if (c.length !== this._size.length)
      throw new hr(c.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var d = c[0], g = c[1];
    Nr(d, this._size[0]), Nr(g, this._size[1]);
    var y = u(d, this._ptr[g], this._ptr[g + 1], this._index);
    return y < this._ptr[g + 1] && this._index[y] === d ? this._values[y] : 0;
  }, n.prototype.set = function(c, d, g) {
    if (!Fr(c))
      throw new TypeError("Array expected");
    if (c.length !== this._size.length)
      throw new hr(c.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var y = c[0], x = c[1], A = this._size[0], C = this._size[1], D = t, E = 0;
    Kr(this._datatype) && (D = e.find(t, [this._datatype, this._datatype]) || t, E = e.convert(0, this._datatype)), (y > A - 1 || x > C - 1) && (l(this, Math.max(y + 1, A), Math.max(x + 1, C), g), A = this._size[0], C = this._size[1]), Nr(y, A), Nr(x, C);
    var F = u(y, this._ptr[x], this._ptr[x + 1], this._index);
    return F < this._ptr[x + 1] && this._index[F] === y ? D(d, E) ? o(F, x, this._values, this._index, this._ptr) : this._values[F] = d : D(d, E) || s(F, y, x, d, this._values, this._index, this._ptr), this;
  };
  function u(c, d, g, y) {
    if (g - d === 0)
      return g;
    for (var x = d; x < g; x++)
      if (y[x] === c)
        return x;
    return d;
  }
  function o(c, d, g, y, x) {
    g.splice(c, 1), y.splice(c, 1);
    for (var A = d + 1; A < x.length; A++)
      x[A]--;
  }
  function s(c, d, g, y, x, A, C) {
    x.splice(c, 0, y), A.splice(c, 0, d);
    for (var D = g + 1; D < C.length; D++)
      C[D]++;
  }
  n.prototype.resize = function(c, d, g) {
    if (!Xe(c))
      throw new TypeError("Array or Matrix expected");
    var y = c.valueOf().map((A) => Array.isArray(A) && A.length === 1 ? A[0] : A);
    if (y.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    y.forEach(function(A) {
      if (!Sr(A) || !mr(A) || A < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Mr(y) + ")");
    });
    var x = g ? this.clone() : this;
    return l(x, y[0], y[1], d);
  };
  function l(c, d, g, y) {
    var x = y || 0, A = t, C = 0;
    Kr(c._datatype) && (A = e.find(t, [c._datatype, c._datatype]) || t, C = e.convert(0, c._datatype), x = e.convert(x, c._datatype));
    var D = !A(x, C), E = c._size[0], F = c._size[1], b, w, S;
    if (g > F) {
      for (w = F; w < g; w++)
        if (c._ptr[w] = c._values.length, D)
          for (b = 0; b < E; b++)
            c._values.push(x), c._index.push(b);
      c._ptr[g] = c._values.length;
    } else
      g < F && (c._ptr.splice(g + 1, F - g), c._values.splice(c._ptr[g], c._values.length), c._index.splice(c._ptr[g], c._index.length));
    if (F = g, d > E) {
      if (D) {
        var M = 0;
        for (w = 0; w < F; w++) {
          c._ptr[w] = c._ptr[w] + M, S = c._ptr[w + 1] + M;
          var z = 0;
          for (b = E; b < d; b++, z++)
            c._values.splice(S + z, 0, x), c._index.splice(S + z, 0, b), M++;
        }
        c._ptr[F] = c._values.length;
      }
    } else if (d < E) {
      var R = 0;
      for (w = 0; w < F; w++) {
        c._ptr[w] = c._ptr[w] - R;
        var I = c._ptr[w], B = c._ptr[w + 1] - R;
        for (S = I; S < B; S++)
          b = c._index[S], b > d - 1 && (c._values.splice(S, 1), c._index.splice(S, 1), R++);
      }
      c._ptr[w] = c._values.length;
    }
    return c._size[0] = d, c._size[1] = g, c;
  }
  n.prototype.reshape = function(c, d) {
    if (!Fr(c))
      throw new TypeError("Array expected");
    if (c.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    c.forEach(function(_) {
      if (!Sr(_) || !mr(_) || _ <= -2 || _ === 0)
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Mr(c) + ")");
    });
    var g = this._size[0] * this._size[1];
    c = xt(c, g);
    var y = c[0] * c[1];
    if (g !== y)
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var x = d ? this.clone() : this;
    if (this._size[0] === c[0] && this._size[1] === c[1])
      return x;
    for (var A = [], C = 0; C < x._ptr.length; C++)
      for (var D = 0; D < x._ptr[C + 1] - x._ptr[C]; D++)
        A.push(C);
    for (var E = x._values.slice(), F = x._index.slice(), b = 0; b < x._index.length; b++) {
      var w = F[b], S = A[b], M = w * x._size[1] + S;
      A[b] = M % c[1], F[b] = Math.floor(M / c[1]);
    }
    x._values.length = 0, x._index.length = 0, x._ptr.length = c[1] + 1, x._size = c.slice();
    for (var z = 0; z < x._ptr.length; z++)
      x._ptr[z] = 0;
    for (var R = 0; R < E.length; R++) {
      var I = F[R], B = A[R], Q = E[R], Z = u(I, x._ptr[B], x._ptr[B + 1], x._index);
      s(Z, I, B, Q, x._values, x._index, x._ptr);
    }
    return x;
  }, n.prototype.clone = function() {
    var c = new n({ values: this._values ? pr(this._values) : void 0, index: pr(this._index), ptr: pr(this._ptr), size: pr(this._size), datatype: this._datatype });
    return c;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype.map = function(c, d) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var g = this, y = this._size[0], x = this._size[1], A = Ht(c), C = function(E, F, b) {
      return A === 1 ? c(E) : A === 2 ? c(E, [F, b]) : c(E, [F, b], g);
    };
    return m(this, 0, y - 1, 0, x - 1, C, d);
  };
  function m(c, d, g, y, x, A, C) {
    var D = [], E = [], F = [], b = t, w = 0;
    Kr(c._datatype) && (b = e.find(t, [c._datatype, c._datatype]) || t, w = e.convert(0, c._datatype));
    for (var S = function(V, q, G) {
      V = A(V, q, G), b(V, w) || (D.push(V), E.push(q));
    }, M = y; M <= x; M++) {
      F.push(D.length);
      var z = c._ptr[M], R = c._ptr[M + 1];
      if (C)
        for (var I = z; I < R; I++) {
          var B = c._index[I];
          B >= d && B <= g && S(c._values[I], B - d, M - y);
        }
      else {
        for (var Q = {}, Z = z; Z < R; Z++) {
          var _ = c._index[Z];
          Q[_] = c._values[Z];
        }
        for (var T = d; T <= g; T++) {
          var U = T in Q ? Q[T] : 0;
          S(U, T - d, M - y);
        }
      }
    }
    return F.push(D.length), new n({ values: D, index: E, ptr: F, size: [g - d + 1, x - y + 1] });
  }
  n.prototype.forEach = function(c, d) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var g = this, y = this._size[0], x = this._size[1], A = 0; A < x; A++) {
      var C = this._ptr[A], D = this._ptr[A + 1];
      if (d)
        for (var E = C; E < D; E++) {
          var F = this._index[E];
          c(this._values[E], [F, A], g);
        }
      else {
        for (var b = {}, w = C; w < D; w++) {
          var S = this._index[w];
          b[S] = this._values[w];
        }
        for (var M = 0; M < y; M++) {
          var z = M in b ? b[M] : 0;
          c(z, [M, A], g);
        }
      }
    }
  }, n.prototype[Symbol.iterator] = function* () {
    if (!this._values)
      throw new Error("Cannot iterate a Pattern only matrix");
    for (var c = this._size[1], d = 0; d < c; d++)
      for (var g = this._ptr[d], y = this._ptr[d + 1], x = g; x < y; x++) {
        var A = this._index[x];
        yield { value: this._values[x], index: [A, d] };
      }
  }, n.prototype.toArray = function() {
    return h(this._values, this._index, this._ptr, this._size, true);
  }, n.prototype.valueOf = function() {
    return h(this._values, this._index, this._ptr, this._size, false);
  };
  function h(c, d, g, y, x) {
    var A = y[0], C = y[1], D = [], E, F;
    for (E = 0; E < A; E++)
      for (D[E] = [], F = 0; F < C; F++)
        D[E][F] = 0;
    for (F = 0; F < C; F++)
      for (var b = g[F], w = g[F + 1], S = b; S < w; S++)
        E = d[S], D[E][F] = c ? x ? pr(c[S]) : c[S] : 1;
    return D;
  }
  return n.prototype.format = function(c) {
    for (var d = this._size[0], g = this._size[1], y = this.density(), x = "Sparse Matrix [" + Mr(d, c) + " x " + Mr(g, c) + "] density: " + Mr(y, c) + `
`, A = 0; A < g; A++)
      for (var C = this._ptr[A], D = this._ptr[A + 1], E = C; E < D; E++) {
        var F = this._index[E];
        x += `
    (` + Mr(F, c) + ", " + Mr(A, c) + ") ==> " + (this._values ? Mr(this._values[E], c) : "X");
      }
    return x;
  }, n.prototype.toString = function() {
    return Mr(this.toArray());
  }, n.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(c) {
    if (c) {
      if (_r(c) && (c = c.toNumber()), !Sr(c) || !mr(c))
        throw new TypeError("The parameter k must be an integer number");
    } else
      c = 0;
    var d = c > 0 ? c : 0, g = c < 0 ? -c : 0, y = this._size[0], x = this._size[1], A = Math.min(y - g, x - d), C = [], D = [], E = [];
    E[0] = 0;
    for (var F = d; F < x && C.length < A; F++)
      for (var b = this._ptr[F], w = this._ptr[F + 1], S = b; S < w; S++) {
        var M = this._index[S];
        if (M === F - d + g) {
          C.push(this._values[S]), D[C.length - 1] = M - g;
          break;
        }
      }
    return E.push(C.length), new n({ values: C, index: D, ptr: E, size: [A, 1] });
  }, n.fromJSON = function(c) {
    return new n(c);
  }, n.diagonal = function(c, d, g, y, x) {
    if (!Fr(c))
      throw new TypeError("Array expected, size parameter");
    if (c.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (c = c.map(function(_) {
      if (_r(_) && (_ = _.toNumber()), !Sr(_) || !mr(_) || _ < 1)
        throw new Error("Size values must be positive integers");
      return _;
    }), g) {
      if (_r(g) && (g = g.toNumber()), !Sr(g) || !mr(g))
        throw new TypeError("The parameter k must be an integer number");
    } else
      g = 0;
    var A = t, C = 0;
    Kr(x) && (A = e.find(t, [x, x]) || t, C = e.convert(0, x));
    var D = g > 0 ? g : 0, E = g < 0 ? -g : 0, F = c[0], b = c[1], w = Math.min(F - E, b - D), S;
    if (Fr(d)) {
      if (d.length !== w)
        throw new Error("Invalid value array length");
      S = function(T) {
        return d[T];
      };
    } else if (wr(d)) {
      var M = d.size();
      if (M.length !== 1 || M[0] !== w)
        throw new Error("Invalid matrix length");
      S = function(T) {
        return d.get([T]);
      };
    } else
      S = function() {
        return d;
      };
    for (var z = [], R = [], I = [], B = 0; B < b; B++) {
      I.push(z.length);
      var Q = B - D;
      if (Q >= 0 && Q < w) {
        var Z = S(Q);
        A(Z, C) || (R.push(Q + E), z.push(Z));
      }
    }
    return I.push(z.length), new n({ values: z, index: R, ptr: I, size: [F, b] });
  }, n.prototype.swapRows = function(c, d) {
    if (!Sr(c) || !mr(c) || !Sr(d) || !mr(d))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Nr(c, this._size[0]), Nr(d, this._size[0]), n._swapRows(c, d, this._size[1], this._values, this._index, this._ptr), this;
  }, n._forEachRow = function(c, d, g, y, x) {
    for (var A = y[c], C = y[c + 1], D = A; D < C; D++)
      x(g[D], d[D]);
  }, n._swapRows = function(c, d, g, y, x, A) {
    for (var C = 0; C < g; C++) {
      var D = A[C], E = A[C + 1], F = u(c, D, E, x), b = u(d, D, E, x);
      if (F < E && b < E && x[F] === c && x[b] === d) {
        if (y) {
          var w = y[F];
          y[F] = y[b], y[b] = w;
        }
        continue;
      }
      if (F < E && x[F] === c && (b >= E || x[b] !== d)) {
        var S = y ? y[F] : void 0;
        x.splice(b, 0, d), y && y.splice(b, 0, S), x.splice(b <= F ? F + 1 : F, 1), y && y.splice(b <= F ? F + 1 : F, 1);
        continue;
      }
      if (b < E && x[b] === d && (F >= E || x[F] !== c)) {
        var M = y ? y[b] : void 0;
        x.splice(F, 0, c), y && y.splice(F, 0, M), x.splice(F <= b ? b + 1 : b, 1), y && y.splice(F <= b ? b + 1 : b, 1);
      }
    }
  }, n;
}, { isClass: true });
var Hc = "number";
var kc = ["typed"];
function jc(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var t = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], a = e[2], n = e[3];
    return { input: r, radix: t, integerPart: a, fractionalPart: n };
  } else
    return null;
}
function rl(r) {
  for (var e = parseInt(r.integerPart, r.radix), t = 0, a = 0; a < r.fractionalPart.length; a++) {
    var n = parseInt(r.fractionalPart[a], r.radix);
    t += n / Math.pow(r.radix, a + 1);
  }
  var i = e + t;
  if (isNaN(i))
    throw new SyntaxError('String "' + r.input + '" is no valid number');
  return i;
}
var va = P(Hc, kc, (r) => {
  var { typed: e } = r, t = e("number", { "": function() {
    return 0;
  }, number: function(n) {
    return n;
  }, string: function(n) {
    if (n === "NaN")
      return NaN;
    var i = jc(n);
    if (i)
      return rl(i);
    var p = 0, v = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    v && (p = Number(v[2]), n = v[1]);
    var f = Number(n);
    if (isNaN(f))
      throw new SyntaxError('String "' + n + '" is no valid number');
    if (v) {
      if (f > Tr(2, p) - 1)
        throw new SyntaxError('String "'.concat(n, '" is out of range'));
      f >= Tr(2, p - 1) && (f = f - Tr(2, p));
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
  }, "Array | Matrix": e.referToSelf((a) => (n) => zr(n, a)) });
  return t.fromJSON = function(a) {
    return parseFloat(a.value);
  }, t;
});
var el = "bignumber";
var tl = ["typed", "BigNumber"];
var ma = P(el, tl, (r) => {
  var { typed: e, BigNumber: t } = r;
  return e("bignumber", { "": function() {
    return new t(0);
  }, number: function(n) {
    return new t(n + "");
  }, string: function(n) {
    var i = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (i) {
      var p = i[2], v = t(i[1]), f = new t(2).pow(Number(p));
      if (v.gt(f.sub(1)))
        throw new SyntaxError('String "'.concat(n, '" is out of range'));
      var u = new t(2).pow(Number(p) - 1);
      return v.gte(u) ? v.sub(f) : v;
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
  }, "Array | Matrix": e.referToSelf((a) => (n) => zr(n, a)) });
});
var nl = "complex";
var al = ["typed", "Complex"];
var ha = P(nl, al, (r) => {
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
  }, "Array | Matrix": e.referToSelf((a) => (n) => zr(n, a)) });
});
var ol = "fraction";
var il = ["typed", "Fraction"];
var da = P(ol, il, (r) => {
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
  }, "Array | Matrix": e.referToSelf((a) => (n) => zr(n, a)) });
});
var tu = "matrix";
var ul = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"];
var ga = P(tu, ul, (r) => {
  var { typed: e, Matrix: t, DenseMatrix: a, SparseMatrix: n } = r;
  return e(tu, { "": function() {
    return i([]);
  }, string: function(v) {
    return i([], v);
  }, "string, string": function(v, f) {
    return i([], v, f);
  }, Array: function(v) {
    return i(v);
  }, Matrix: function(v) {
    return i(v, v.storage());
  }, "Array | Matrix, string": i, "Array | Matrix, string, string": i });
  function i(p, v, f) {
    if (v === "dense" || v === "default" || v === void 0)
      return new a(p, f);
    if (v === "sparse")
      return new n(p, f);
    throw new TypeError("Unknown matrix type " + JSON.stringify(v) + ".");
  }
});
var nu = "matrixFromColumns";
var sl = ["typed", "matrix", "flatten", "size"];
var Da = P(nu, sl, (r) => {
  var { typed: e, matrix: t, flatten: a, size: n } = r;
  return e(nu, { "...Array": function(f) {
    return i(f);
  }, "...Matrix": function(f) {
    return t(i(f.map((u) => u.toArray())));
  } });
  function i(v) {
    if (v.length === 0)
      throw new TypeError("At least one column is needed to construct a matrix.");
    for (var f = p(v[0]), u = [], o = 0; o < f; o++)
      u[o] = [];
    for (var s of v) {
      var l = p(s);
      if (l !== f)
        throw new TypeError("The vectors had different length: " + (f | 0) + " ≠ " + (l | 0));
      for (var m = a(s), h = 0; h < f; h++)
        u[h].push(m[h]);
    }
    return u;
  }
  function p(v) {
    var f = n(v);
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
var au = "unaryMinus";
var fl = ["typed"];
var xa = P(au, fl, (r) => {
  var { typed: e } = r;
  return e(au, { number: ua, "Complex | BigNumber | Fraction": (t) => t.neg(), Unit: e.referToSelf((t) => (a) => {
    var n = a.clone();
    return n.value = e.find(t, n.valueType())(a.value), n;
  }), "Array | Matrix": e.referToSelf((t) => (a) => zr(a, t, true)) });
});
var ou = "abs";
var cl = ["typed"];
var ya = P(ou, cl, (r) => {
  var { typed: e } = r;
  return e(ou, { number: aa, "Complex | BigNumber | Fraction | Unit": (t) => t.abs(), "Array | Matrix": e.referToSelf((t) => (a) => zr(a, t, true)) });
});
var iu = "addScalar";
var ll = ["typed"];
var wa = P(iu, ll, (r) => {
  var { typed: e } = r;
  return e(iu, { "number, number": oa, "Complex, Complex": function(a, n) {
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
var pl = "matAlgo11xS0s";
var vl = ["typed", "equalScalar"];
var uu = P(pl, vl, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, i, p, v) {
    var f = n._values, u = n._index, o = n._ptr, s = n._size, l = n._datatype;
    if (!f)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var m = s[0], h = s[1], c, d = t, g = 0, y = p;
    typeof l == "string" && (c = l, d = e.find(t, [c, c]), g = e.convert(0, c), i = e.convert(i, c), y = e.find(p, [c, c]));
    for (var x = [], A = [], C = [], D = 0; D < h; D++) {
      C[D] = A.length;
      for (var E = o[D], F = o[D + 1], b = E; b < F; b++) {
        var w = u[b], S = v ? y(i, f[b]) : y(f[b], i);
        d(S, g) || (A.push(w), x.push(S));
      }
    }
    return C[h] = A.length, n.createSparseMatrix({ values: x, index: A, ptr: C, size: [m, h], datatype: c });
  };
});
var ml = "matAlgo12xSfs";
var hl = ["typed", "DenseMatrix"];
var ce = P(ml, hl, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(n, i, p, v) {
    var f = n._values, u = n._index, o = n._ptr, s = n._size, l = n._datatype;
    if (!f)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var m = s[0], h = s[1], c, d = p;
    typeof l == "string" && (c = l, i = e.convert(i, c), d = e.find(p, [c, c]));
    for (var g = [], y = [], x = [], A = 0; A < h; A++) {
      for (var C = A + 1, D = o[A], E = o[A + 1], F = D; F < E; F++) {
        var b = u[F];
        y[b] = f[F], x[b] = C;
      }
      for (var w = 0; w < m; w++)
        A === 0 && (g[w] = []), x[w] === C ? g[w][A] = v ? d(i, y[w]) : d(y[w], i) : g[w][A] = v ? d(i, 0) : d(0, i);
    }
    return new t({ data: g, size: [m, h], datatype: c });
  };
});
var dl = "matAlgo14xDs";
var gl = ["typed"];
var rn = P(dl, gl, (r) => {
  var { typed: e } = r;
  return function(n, i, p, v) {
    var f = n._data, u = n._size, o = n._datatype, s, l = p;
    typeof o == "string" && (s = o, i = e.convert(i, s), l = e.find(p, [s, s]));
    var m = u.length > 0 ? t(l, 0, u, u[0], f, i, v) : [];
    return n.createDenseMatrix({ data: m, size: pr(u), datatype: s });
  };
  function t(a, n, i, p, v, f, u) {
    var o = [];
    if (n === i.length - 1)
      for (var s = 0; s < p; s++)
        o[s] = u ? a(f, v[s]) : a(v[s], f);
    else
      for (var l = 0; l < p; l++)
        o[l] = t(a, n + 1, i, i[n + 1], v[l], f, u);
    return o;
  }
});
var Dl = "matAlgo01xDSid";
var xl = ["typed"];
var en = P(Dl, xl, (r) => {
  var { typed: e } = r;
  return function(a, n, i, p) {
    var v = a._data, f = a._size, u = a._datatype, o = n._values, s = n._index, l = n._ptr, m = n._size, h = n._datatype;
    if (f.length !== m.length)
      throw new hr(f.length, m.length);
    if (f[0] !== m[0] || f[1] !== m[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + m + ")");
    if (!o)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var c = f[0], d = f[1], g = typeof u == "string" && u === h ? u : void 0, y = g ? e.find(i, [g, g]) : i, x, A, C = [];
    for (x = 0; x < c; x++)
      C[x] = [];
    var D = [], E = [];
    for (A = 0; A < d; A++) {
      for (var F = A + 1, b = l[A], w = l[A + 1], S = b; S < w; S++)
        x = s[S], D[x] = p ? y(o[S], v[x][A]) : y(v[x][A], o[S]), E[x] = F;
      for (x = 0; x < c; x++)
        E[x] === F ? C[x][A] = D[x] : C[x][A] = v[x][A];
    }
    return a.createDenseMatrix({ data: C, size: [c, d], datatype: g });
  };
});
var yl = "matAlgo04xSidSid";
var wl = ["typed", "equalScalar"];
var su = P(yl, wl, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, i, p) {
    var v = n._values, f = n._index, u = n._ptr, o = n._size, s = n._datatype, l = i._values, m = i._index, h = i._ptr, c = i._size, d = i._datatype;
    if (o.length !== c.length)
      throw new hr(o.length, c.length);
    if (o[0] !== c[0] || o[1] !== c[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");
    var g = o[0], y = o[1], x, A = t, C = 0, D = p;
    typeof s == "string" && s === d && (x = s, A = e.find(t, [x, x]), C = e.convert(0, x), D = e.find(p, [x, x]));
    var E = v && l ? [] : void 0, F = [], b = [], w = v && l ? [] : void 0, S = v && l ? [] : void 0, M = [], z = [], R, I, B, Q, Z;
    for (I = 0; I < y; I++) {
      b[I] = F.length;
      var _ = I + 1;
      for (Q = u[I], Z = u[I + 1], B = Q; B < Z; B++)
        R = f[B], F.push(R), M[R] = _, w && (w[R] = v[B]);
      for (Q = h[I], Z = h[I + 1], B = Q; B < Z; B++)
        if (R = m[B], M[R] === _) {
          if (w) {
            var T = D(w[R], l[B]);
            A(T, C) ? M[R] = null : w[R] = T;
          }
        } else
          F.push(R), z[R] = _, S && (S[R] = l[B]);
      if (w && S)
        for (B = b[I]; B < F.length; )
          R = F[B], M[R] === _ ? (E[B] = w[R], B++) : z[R] === _ ? (E[B] = S[R], B++) : F.splice(B, 1);
    }
    return b[y] = F.length, n.createSparseMatrix({ values: E, index: F, ptr: b, size: [g, y], datatype: x });
  };
});
var Al = "matAlgo10xSids";
var El = ["typed", "DenseMatrix"];
var tn = P(Al, El, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(n, i, p, v) {
    var f = n._values, u = n._index, o = n._ptr, s = n._size, l = n._datatype;
    if (!f)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var m = s[0], h = s[1], c, d = p;
    typeof l == "string" && (c = l, i = e.convert(i, c), d = e.find(p, [c, c]));
    for (var g = [], y = [], x = [], A = 0; A < h; A++) {
      for (var C = A + 1, D = o[A], E = o[A + 1], F = D; F < E; F++) {
        var b = u[F];
        y[b] = f[F], x[b] = C;
      }
      for (var w = 0; w < m; w++)
        A === 0 && (g[w] = []), x[w] === C ? g[w][A] = v ? d(i, y[w]) : d(y[w], i) : g[w][A] = i;
    }
    return new t({ data: g, size: [m, h], datatype: c });
  };
});
var Cl = "matAlgo13xDD";
var Fl = ["typed"];
var fu = P(Cl, Fl, (r) => {
  var { typed: e } = r;
  return function(n, i, p) {
    var v = n._data, f = n._size, u = n._datatype, o = i._data, s = i._size, l = i._datatype, m = [];
    if (f.length !== s.length)
      throw new hr(f.length, s.length);
    for (var h = 0; h < f.length; h++) {
      if (f[h] !== s[h])
        throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + s + ")");
      m[h] = f[h];
    }
    var c, d = p;
    typeof u == "string" && u === l && (c = u, d = e.find(p, [c, c]));
    var g = m.length > 0 ? t(d, 0, m, m[0], v, o) : [];
    return n.createDenseMatrix({ data: g, size: m, datatype: c });
  };
  function t(a, n, i, p, v, f) {
    var u = [];
    if (n === i.length - 1)
      for (var o = 0; o < p; o++)
        u[o] = a(v[o], f[o]);
    else
      for (var s = 0; s < p; s++)
        u[s] = t(a, n + 1, i, i[n + 1], v[s], f[s]);
    return u;
  }
});
var bl = "broadcast";
var Ml = ["concat"];
var cu = P(bl, Ml, (r) => {
  var { concat: e } = r;
  return function(i, p) {
    var v = Math.max(i._size.length, p._size.length);
    if (i._size.length === p._size.length && i._size.every((d, g) => d === p._size[g]))
      return [i, p];
    for (var f = t(i._size, v, 0), u = t(p._size, v, 0), o = [], s = 0; s < v; s++)
      o[s] = Math.max(f[s], u[s]);
    for (var l = 0; l < v; l++)
      n(f, o, l), n(u, o, l);
    var m = i.clone(), h = p.clone();
    m._size.length < v ? m.reshape(t(m._size, v, 1)) : h._size.length < v && h.reshape(t(h._size, v, 1));
    for (var c = 0; c < v; c++)
      m._size[c] < o[c] && (m = a(m, o[c], c)), h._size[c] < o[c] && (h = a(h, o[c], c));
    return [m, h];
  };
  function t(i, p, v) {
    return [...Array(p - i.length).fill(v), ...i];
  }
  function a(i, p, v) {
    return e(...Array(p).fill(i), v);
  }
  function n(i, p, v) {
    if (i[v] < p[v] & i[v] > 1)
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(i, ") not possible to broadcast dimension ").concat(v, " with size ").concat(i[v], " to size ").concat(p[v]));
  }
});
var Sl = "matrixAlgorithmSuite";
var Nl = ["typed", "matrix", "concat"];
var jr = P(Sl, Nl, (r) => {
  var { typed: e, matrix: t, concat: a } = r, n = fu({ typed: e }), i = rn({ typed: e }), p = cu({ concat: a });
  return function(f) {
    var u = f.elop, o = f.SD || f.DS, s;
    u ? (s = { "DenseMatrix, DenseMatrix": (c, d) => n(...p(c, d), u), "Array, Array": (c, d) => n(...p(t(c), t(d)), u).valueOf(), "Array, DenseMatrix": (c, d) => n(...p(t(c), d), u), "DenseMatrix, Array": (c, d) => n(...p(c, t(d)), u) }, f.SS && (s["SparseMatrix, SparseMatrix"] = (c, d) => f.SS(...p(c, d), u, false)), f.DS && (s["DenseMatrix, SparseMatrix"] = (c, d) => f.DS(...p(c, d), u, false), s["Array, SparseMatrix"] = (c, d) => f.DS(...p(t(c), d), u, false)), o && (s["SparseMatrix, DenseMatrix"] = (c, d) => o(...p(d, c), u, true), s["SparseMatrix, Array"] = (c, d) => o(...p(t(d), c), u, true))) : (s = { "DenseMatrix, DenseMatrix": e.referToSelf((c) => (d, g) => n(...p(d, g), c)), "Array, Array": e.referToSelf((c) => (d, g) => n(...p(t(d), t(g)), c).valueOf()), "Array, DenseMatrix": e.referToSelf((c) => (d, g) => n(...p(t(d), g), c)), "DenseMatrix, Array": e.referToSelf((c) => (d, g) => n(...p(d, t(g)), c)) }, f.SS && (s["SparseMatrix, SparseMatrix"] = e.referToSelf((c) => (d, g) => f.SS(...p(d, g), c, false))), f.DS && (s["DenseMatrix, SparseMatrix"] = e.referToSelf((c) => (d, g) => f.DS(...p(d, g), c, false)), s["Array, SparseMatrix"] = e.referToSelf((c) => (d, g) => f.DS(...p(t(d), g), c, false))), o && (s["SparseMatrix, DenseMatrix"] = e.referToSelf((c) => (d, g) => o(...p(g, d), c, true)), s["SparseMatrix, Array"] = e.referToSelf((c) => (d, g) => o(...p(t(g), d), c, true))));
    var l = f.scalar || "any", m = f.Ds || f.Ss;
    m && (u ? (s["DenseMatrix," + l] = (c, d) => i(c, d, u, false), s[l + ", DenseMatrix"] = (c, d) => i(d, c, u, true), s["Array," + l] = (c, d) => i(t(c), d, u, false).valueOf(), s[l + ", Array"] = (c, d) => i(t(d), c, u, true).valueOf()) : (s["DenseMatrix," + l] = e.referToSelf((c) => (d, g) => i(d, g, c, false)), s[l + ", DenseMatrix"] = e.referToSelf((c) => (d, g) => i(g, d, c, true)), s["Array," + l] = e.referToSelf((c) => (d, g) => i(t(d), g, c, false).valueOf()), s[l + ", Array"] = e.referToSelf((c) => (d, g) => i(t(g), d, c, true).valueOf())));
    var h = f.sS !== void 0 ? f.sS : f.Ss;
    return u ? (f.Ss && (s["SparseMatrix," + l] = (c, d) => f.Ss(c, d, u, false)), h && (s[l + ", SparseMatrix"] = (c, d) => h(d, c, u, true))) : (f.Ss && (s["SparseMatrix," + l] = e.referToSelf((c) => (d, g) => f.Ss(d, g, c, false))), h && (s[l + ", SparseMatrix"] = e.referToSelf((c) => (d, g) => h(g, d, c, true)))), u && u.signatures && fi(s, u.signatures), s;
  };
});
var Bl = "matAlgo03xDSf";
var _l = ["typed"];
var le = P(Bl, _l, (r) => {
  var { typed: e } = r;
  return function(a, n, i, p) {
    var v = a._data, f = a._size, u = a._datatype, o = n._values, s = n._index, l = n._ptr, m = n._size, h = n._datatype;
    if (f.length !== m.length)
      throw new hr(f.length, m.length);
    if (f[0] !== m[0] || f[1] !== m[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + m + ")");
    if (!o)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var c = f[0], d = f[1], g, y = 0, x = i;
    typeof u == "string" && u === h && (g = u, y = e.convert(0, g), x = e.find(i, [g, g]));
    for (var A = [], C = 0; C < c; C++)
      A[C] = [];
    for (var D = [], E = [], F = 0; F < d; F++) {
      for (var b = F + 1, w = l[F], S = l[F + 1], M = w; M < S; M++) {
        var z = s[M];
        D[z] = p ? x(o[M], v[z][F]) : x(v[z][F], o[M]), E[z] = b;
      }
      for (var R = 0; R < c; R++)
        E[R] === b ? A[R][F] = D[R] : A[R][F] = p ? x(y, v[R][F]) : x(v[R][F], y);
    }
    return a.createDenseMatrix({ data: A, size: [c, d], datatype: g });
  };
});
var Tl = "matAlgo05xSfSf";
var Il = ["typed", "equalScalar"];
var nn = P(Tl, Il, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, i, p) {
    var v = n._values, f = n._index, u = n._ptr, o = n._size, s = n._datatype, l = i._values, m = i._index, h = i._ptr, c = i._size, d = i._datatype;
    if (o.length !== c.length)
      throw new hr(o.length, c.length);
    if (o[0] !== c[0] || o[1] !== c[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");
    var g = o[0], y = o[1], x, A = t, C = 0, D = p;
    typeof s == "string" && s === d && (x = s, A = e.find(t, [x, x]), C = e.convert(0, x), D = e.find(p, [x, x]));
    var E = v && l ? [] : void 0, F = [], b = [], w = E ? [] : void 0, S = E ? [] : void 0, M = [], z = [], R, I, B, Q;
    for (I = 0; I < y; I++) {
      b[I] = F.length;
      var Z = I + 1;
      for (B = u[I], Q = u[I + 1]; B < Q; B++)
        R = f[B], F.push(R), M[R] = Z, w && (w[R] = v[B]);
      for (B = h[I], Q = h[I + 1]; B < Q; B++)
        R = m[B], M[R] !== Z && F.push(R), z[R] = Z, S && (S[R] = l[B]);
      if (E)
        for (B = b[I]; B < F.length; ) {
          R = F[B];
          var _ = M[R], T = z[R];
          if (_ === Z || T === Z) {
            var U = _ === Z ? w[R] : C, W = T === Z ? S[R] : C, V = D(U, W);
            A(V, C) ? F.splice(B, 1) : (E.push(V), B++);
          }
        }
    }
    return b[y] = F.length, n.createSparseMatrix({ values: E, index: F, ptr: b, size: [g, y], datatype: x });
  };
});
var zl = "multiplyScalar";
var Ol = ["typed"];
var Aa = P(zl, Ol, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": ia, "Complex, Complex": function(a, n) {
    return a.mul(n);
  }, "BigNumber, BigNumber": function(a, n) {
    return a.times(n);
  }, "Fraction, Fraction": function(a, n) {
    return a.mul(n);
  }, "number | Fraction | BigNumber | Complex, Unit": (t, a) => a.multiply(t), "Unit, number | Fraction | BigNumber | Complex | Unit": (t, a) => t.multiply(a) });
});
var lu = "multiply";
var Pl = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"];
var Ea = P(lu, Pl, (r) => {
  var { typed: e, matrix: t, addScalar: a, multiplyScalar: n, equalScalar: i, dot: p } = r, v = uu({ typed: e, equalScalar: i }), f = rn({ typed: e });
  function u(C, D) {
    switch (C.length) {
      case 1:
        switch (D.length) {
          case 1:
            if (C[0] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (C[0] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + C[0] + ") must match Matrix rows (" + D[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + D.length + " dimensions)");
        }
        break;
      case 2:
        switch (D.length) {
          case 1:
            if (C[1] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + C[1] + ") must match Vector length (" + D[0] + ")");
            break;
          case 2:
            if (C[1] !== D[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + C[1] + ") must match Matrix B rows (" + D[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + D.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + C.length + " dimensions)");
    }
  }
  function o(C, D, E) {
    if (E === 0)
      throw new Error("Cannot multiply two empty vectors");
    return p(C, D);
  }
  function s(C, D) {
    if (D.storage() !== "dense")
      throw new Error("Support for SparseMatrix not implemented");
    return l(C, D);
  }
  function l(C, D) {
    var E = C._data, F = C._size, b = C._datatype, w = D._data, S = D._size, M = D._datatype, z = F[0], R = S[1], I, B = a, Q = n;
    b && M && b === M && typeof b == "string" && (I = b, B = e.find(a, [I, I]), Q = e.find(n, [I, I]));
    for (var Z = [], _ = 0; _ < R; _++) {
      for (var T = Q(E[0], w[0][_]), U = 1; U < z; U++)
        T = B(T, Q(E[U], w[U][_]));
      Z[_] = T;
    }
    return C.createDenseMatrix({ data: Z, size: [R], datatype: I });
  }
  var m = e("_multiplyMatrixVector", { "DenseMatrix, any": c, "SparseMatrix, any": y }), h = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": d, "DenseMatrix, SparseMatrix": g, "SparseMatrix, DenseMatrix": x, "SparseMatrix, SparseMatrix": A });
  function c(C, D) {
    var E = C._data, F = C._size, b = C._datatype, w = D._data, S = D._datatype, M = F[0], z = F[1], R, I = a, B = n;
    b && S && b === S && typeof b == "string" && (R = b, I = e.find(a, [R, R]), B = e.find(n, [R, R]));
    for (var Q = [], Z = 0; Z < M; Z++) {
      for (var _ = E[Z], T = B(_[0], w[0]), U = 1; U < z; U++)
        T = I(T, B(_[U], w[U]));
      Q[Z] = T;
    }
    return C.createDenseMatrix({ data: Q, size: [M], datatype: R });
  }
  function d(C, D) {
    var E = C._data, F = C._size, b = C._datatype, w = D._data, S = D._size, M = D._datatype, z = F[0], R = F[1], I = S[1], B, Q = a, Z = n;
    b && M && b === M && typeof b == "string" && (B = b, Q = e.find(a, [B, B]), Z = e.find(n, [B, B]));
    for (var _ = [], T = 0; T < z; T++) {
      var U = E[T];
      _[T] = [];
      for (var W = 0; W < I; W++) {
        for (var V = Z(U[0], w[0][W]), q = 1; q < R; q++)
          V = Q(V, Z(U[q], w[q][W]));
        _[T][W] = V;
      }
    }
    return C.createDenseMatrix({ data: _, size: [z, I], datatype: B });
  }
  function g(C, D) {
    var E = C._data, F = C._size, b = C._datatype, w = D._values, S = D._index, M = D._ptr, z = D._size, R = D._datatype;
    if (!w)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var I = F[0], B = z[1], Q, Z = a, _ = n, T = i, U = 0;
    b && R && b === R && typeof b == "string" && (Q = b, Z = e.find(a, [Q, Q]), _ = e.find(n, [Q, Q]), T = e.find(i, [Q, Q]), U = e.convert(0, Q));
    for (var W = [], V = [], q = [], G = D.createSparseMatrix({ values: W, index: V, ptr: q, size: [I, B], datatype: Q }), $ = 0; $ < B; $++) {
      q[$] = V.length;
      var H = M[$], er = M[$ + 1];
      if (er > H)
        for (var nr = 0, Y = 0; Y < I; Y++) {
          for (var Dr = Y + 1, cr = void 0, or = H; or < er; or++) {
            var ir = S[or];
            nr !== Dr ? (cr = _(E[Y][ir], w[or]), nr = Dr) : cr = Z(cr, _(E[Y][ir], w[or]));
          }
          nr === Dr && !T(cr, U) && (V.push(Y), W.push(cr));
        }
    }
    return q[B] = V.length, G;
  }
  function y(C, D) {
    var E = C._values, F = C._index, b = C._ptr, w = C._datatype;
    if (!E)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var S = D._data, M = D._datatype, z = C._size[0], R = D._size[0], I = [], B = [], Q = [], Z, _ = a, T = n, U = i, W = 0;
    w && M && w === M && typeof w == "string" && (Z = w, _ = e.find(a, [Z, Z]), T = e.find(n, [Z, Z]), U = e.find(i, [Z, Z]), W = e.convert(0, Z));
    var V = [], q = [];
    Q[0] = 0;
    for (var G = 0; G < R; G++) {
      var $ = S[G];
      if (!U($, W))
        for (var H = b[G], er = b[G + 1], nr = H; nr < er; nr++) {
          var Y = F[nr];
          q[Y] ? V[Y] = _(V[Y], T($, E[nr])) : (q[Y] = true, B.push(Y), V[Y] = T($, E[nr]));
        }
    }
    for (var Dr = B.length, cr = 0; cr < Dr; cr++) {
      var or = B[cr];
      I[cr] = V[or];
    }
    return Q[1] = B.length, C.createSparseMatrix({ values: I, index: B, ptr: Q, size: [z, 1], datatype: Z });
  }
  function x(C, D) {
    var E = C._values, F = C._index, b = C._ptr, w = C._datatype;
    if (!E)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var S = D._data, M = D._datatype, z = C._size[0], R = D._size[0], I = D._size[1], B, Q = a, Z = n, _ = i, T = 0;
    w && M && w === M && typeof w == "string" && (B = w, Q = e.find(a, [B, B]), Z = e.find(n, [B, B]), _ = e.find(i, [B, B]), T = e.convert(0, B));
    for (var U = [], W = [], V = [], q = C.createSparseMatrix({ values: U, index: W, ptr: V, size: [z, I], datatype: B }), G = [], $ = [], H = 0; H < I; H++) {
      V[H] = W.length;
      for (var er = H + 1, nr = 0; nr < R; nr++) {
        var Y = S[nr][H];
        if (!_(Y, T))
          for (var Dr = b[nr], cr = b[nr + 1], or = Dr; or < cr; or++) {
            var ir = F[or];
            $[ir] !== er ? ($[ir] = er, W.push(ir), G[ir] = Z(Y, E[or])) : G[ir] = Q(G[ir], Z(Y, E[or]));
          }
      }
      for (var xr = V[H], Ar = W.length, Cr = xr; Cr < Ar; Cr++) {
        var fr = W[Cr];
        U[Cr] = G[fr];
      }
    }
    return V[I] = W.length, q;
  }
  function A(C, D) {
    var E = C._values, F = C._index, b = C._ptr, w = C._datatype, S = D._values, M = D._index, z = D._ptr, R = D._datatype, I = C._size[0], B = D._size[1], Q = E && S, Z, _ = a, T = n;
    w && R && w === R && typeof w == "string" && (Z = w, _ = e.find(a, [Z, Z]), T = e.find(n, [Z, Z]));
    for (var U = Q ? [] : void 0, W = [], V = [], q = C.createSparseMatrix({ values: U, index: W, ptr: V, size: [I, B], datatype: Z }), G = Q ? [] : void 0, $ = [], H, er, nr, Y, Dr, cr, or, ir, xr = 0; xr < B; xr++) {
      V[xr] = W.length;
      var Ar = xr + 1;
      for (Dr = z[xr], cr = z[xr + 1], Y = Dr; Y < cr; Y++)
        if (ir = M[Y], Q)
          for (er = b[ir], nr = b[ir + 1], H = er; H < nr; H++)
            or = F[H], $[or] !== Ar ? ($[or] = Ar, W.push(or), G[or] = T(S[Y], E[H])) : G[or] = _(G[or], T(S[Y], E[H]));
        else
          for (er = b[ir], nr = b[ir + 1], H = er; H < nr; H++)
            or = F[H], $[or] !== Ar && ($[or] = Ar, W.push(or));
      if (Q)
        for (var Cr = V[xr], fr = W.length, yr = Cr; yr < fr; yr++) {
          var br = W[yr];
          U[yr] = G[br];
        }
    }
    return V[B] = W.length, q;
  }
  return e(lu, n, { "Array, Array": e.referTo("Matrix, Matrix", (C) => (D, E) => {
    u(Br(D), Br(E));
    var F = C(t(D), t(E));
    return wr(F) ? F.valueOf() : F;
  }), "Matrix, Matrix": function(D, E) {
    var F = D.size(), b = E.size();
    return u(F, b), F.length === 1 ? b.length === 1 ? o(D, E, F[0]) : s(D, E) : b.length === 1 ? m(D, E) : h(D, E);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (C) => (D, E) => C(D, t(E))), "Array, Matrix": e.referToSelf((C) => (D, E) => C(t(D, E.storage()), E)), "SparseMatrix, any": function(D, E) {
    return v(D, E, n, false);
  }, "DenseMatrix, any": function(D, E) {
    return f(D, E, n, false);
  }, "any, SparseMatrix": function(D, E) {
    return v(E, D, n, true);
  }, "any, DenseMatrix": function(D, E) {
    return f(E, D, n, true);
  }, "Array, any": function(D, E) {
    return f(t(D), E, n, false).valueOf();
  }, "any, Array": function(D, E) {
    return f(t(E), D, n, true).valueOf();
  }, "any, any": n, "any, any, ...any": e.referToSelf((C) => (D, E, F) => {
    for (var b = C(D, E), w = 0; w < F.length; w++)
      b = C(b, F[w]);
    return b;
  }) });
});
var pu = "sign";
var Rl = ["typed", "BigNumber", "Fraction", "complex"];
var Ca = P(pu, Rl, (r) => {
  var { typed: e, BigNumber: t, complex: a, Fraction: n } = r;
  return e(pu, { number: kt, Complex: function(p) {
    return p.im === 0 ? a(kt(p.re)) : p.sign();
  }, BigNumber: function(p) {
    return new t(p.cmp(0));
  }, Fraction: function(p) {
    return new n(p.s, 1);
  }, "Array | Matrix": e.referToSelf((i) => (p) => zr(p, i, true)), Unit: e.referToSelf((i) => (p) => {
    if (!p._isDerived() && p.units[0].unit.offset !== 0)
      throw new TypeError("sign is ambiguous for units with offset");
    return e.find(i, p.valueType())(p.value);
  }) });
});
var ql = "sqrt";
var Ul = ["config", "typed", "Complex"];
var Fa = P(ql, Ul, (r) => {
  var { config: e, typed: t, Complex: a } = r;
  return t("sqrt", { number: n, Complex: function(p) {
    return p.sqrt();
  }, BigNumber: function(p) {
    return !p.isNegative() || e.predictable ? p.sqrt() : n(p.toNumber());
  }, Unit: function(p) {
    return p.pow(0.5);
  } });
  function n(i) {
    return isNaN(i) ? NaN : i >= 0 || e.predictable ? Math.sqrt(i) : new a(i, 0).sqrt();
  }
});
var vu = "subtract";
var Ll = ["typed", "matrix", "equalScalar", "addScalar", "unaryMinus", "DenseMatrix", "concat"];
var ba = P(vu, Ll, (r) => {
  var { typed: e, matrix: t, equalScalar: a, addScalar: n, unaryMinus: i, DenseMatrix: p, concat: v } = r, f = en({ typed: e }), u = le({ typed: e }), o = nn({ typed: e, equalScalar: a }), s = tn({ typed: e, DenseMatrix: p }), l = ce({ typed: e, DenseMatrix: p }), m = jr({ typed: e, matrix: t, concat: v });
  return e(vu, { "number, number": (h, c) => h - c, "Complex, Complex": (h, c) => h.sub(c), "BigNumber, BigNumber": (h, c) => h.minus(c), "Fraction, Fraction": (h, c) => h.sub(c), "Unit, Unit": e.referToSelf((h) => (c, d) => {
    if (c.value === null)
      throw new Error("Parameter x contains a unit with undefined value");
    if (d.value === null)
      throw new Error("Parameter y contains a unit with undefined value");
    if (!c.equalBase(d))
      throw new Error("Units do not match");
    var g = c.clone();
    return g.value = e.find(h, [g.valueType(), d.valueType()])(g.value, d.value), g.fixPrefix = false, g;
  }) }, m({ SS: o, DS: f, SD: u, Ss: l, sS: s }));
});
var Zl = "matAlgo07xSSf";
var Vl = ["typed", "DenseMatrix"];
var be = P(Zl, Vl, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(i, p, v) {
    var f = i._size, u = i._datatype, o = p._size, s = p._datatype;
    if (f.length !== o.length)
      throw new hr(f.length, o.length);
    if (f[0] !== o[0] || f[1] !== o[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + o + ")");
    var l = f[0], m = f[1], h, c = 0, d = v;
    typeof u == "string" && u === s && (h = u, c = e.convert(0, h), d = e.find(v, [h, h]));
    var g, y, x = [];
    for (g = 0; g < l; g++)
      x[g] = [];
    var A = [], C = [], D = [], E = [];
    for (y = 0; y < m; y++) {
      var F = y + 1;
      for (a(i, y, D, A, F), a(p, y, E, C, F), g = 0; g < l; g++) {
        var b = D[g] === F ? A[g] : c, w = E[g] === F ? C[g] : c;
        x[g][y] = d(b, w);
      }
    }
    return new t({ data: x, size: [l, m], datatype: h });
  };
  function a(n, i, p, v, f) {
    for (var u = n._values, o = n._index, s = n._ptr, l = s[i], m = s[i + 1]; l < m; l++) {
      var h = o[l];
      p[h] = f, v[h] = u[l];
    }
  }
});
var mu = "conj";
var Ql = ["typed"];
var Ma = P(mu, Ql, (r) => {
  var { typed: e } = r;
  return e(mu, { "number | BigNumber | Fraction": (t) => t, Complex: (t) => t.conjugate(), "Array | Matrix": e.referToSelf((t) => (a) => zr(a, t)) });
});
var hu = "im";
var Gl = ["typed"];
var Sa = P(hu, Gl, (r) => {
  var { typed: e } = r;
  return e(hu, { number: () => 0, "BigNumber | Fraction": (t) => t.mul(0), Complex: (t) => t.im, "Array | Matrix": e.referToSelf((t) => (a) => zr(a, t)) });
});
var du = "re";
var Yl = ["typed"];
var Na = P(du, Yl, (r) => {
  var { typed: e } = r;
  return e(du, { "number | BigNumber | Fraction": (t) => t, Complex: (t) => t.re, "Array | Matrix": e.referToSelf((t) => (a) => zr(a, t)) });
});
var gu = "concat";
var $l = ["typed", "matrix", "isInteger"];
var Ba = P(gu, $l, (r) => {
  var { typed: e, matrix: t, isInteger: a } = r;
  return e(gu, { "...Array | Matrix | number | BigNumber": function(i) {
    var p, v = i.length, f = -1, u, o = false, s = [];
    for (p = 0; p < v; p++) {
      var l = i[p];
      if (wr(l) && (o = true), Sr(l) || _r(l)) {
        if (p !== v - 1)
          throw new Error("Dimension must be specified as last argument");
        if (u = f, f = l.valueOf(), !a(f))
          throw new TypeError("Integer number expected for dimension");
        if (f < 0 || p > 0 && f > u)
          throw new Ne(f, u + 1);
      } else {
        var m = pr(l).valueOf(), h = Br(m);
        if (s[p] = m, u = f, f = h.length - 1, p > 0 && f !== u)
          throw new hr(u + 1, f + 1);
      }
    }
    if (s.length === 0)
      throw new SyntaxError("At least one matrix expected");
    for (var c = s.shift(); s.length; )
      c = Du(c, s.shift(), f, 0);
    return o ? t(c) : c;
  }, "...string": function(i) {
    return i.join("");
  } });
});
function Du(r, e, t, a) {
  if (a < t) {
    if (r.length !== e.length)
      throw new hr(r.length, e.length);
    for (var n = [], i = 0; i < r.length; i++)
      n[i] = Du(r[i], e[i], t, a + 1);
    return n;
  } else
    return r.concat(e);
}
var xu = "column";
var Jl = ["typed", "Index", "matrix", "range"];
var _a = P(xu, Jl, (r) => {
  var { typed: e, Index: t, matrix: a, range: n } = r;
  return e(xu, { "Matrix, number": i, "Array, number": function(v, f) {
    return i(a(pr(v)), f).valueOf();
  } });
  function i(p, v) {
    if (p.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    Nr(v, p.size()[1]);
    var f = n(0, p.size()[0]), u = new t(f, v), o = p.subset(u);
    return wr(o) ? o : a([[o]]);
  }
});
var yu = "diag";
var Xl = ["typed", "matrix", "DenseMatrix", "SparseMatrix"];
var Ta = P(yu, Xl, (r) => {
  var { typed: e, matrix: t, DenseMatrix: a, SparseMatrix: n } = r;
  return e(yu, { Array: function(u) {
    return i(u, 0, Br(u), null);
  }, "Array, number": function(u, o) {
    return i(u, o, Br(u), null);
  }, "Array, BigNumber": function(u, o) {
    return i(u, o.toNumber(), Br(u), null);
  }, "Array, string": function(u, o) {
    return i(u, 0, Br(u), o);
  }, "Array, number, string": function(u, o, s) {
    return i(u, o, Br(u), s);
  }, "Array, BigNumber, string": function(u, o, s) {
    return i(u, o.toNumber(), Br(u), s);
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
    if (!mr(u))
      throw new TypeError("Second parameter in function diag must be an integer");
    var l = u > 0 ? u : 0, m = u < 0 ? -u : 0;
    switch (o.length) {
      case 1:
        return p(f, u, s, o[0], m, l);
      case 2:
        return v(f, u, s, o, m, l);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function p(f, u, o, s, l, m) {
    var h = [s + l, s + m];
    if (o && o !== "sparse" && o !== "dense")
      throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var c = o === "sparse" ? n.diagonal(h, f, u) : a.diagonal(h, f, u);
    return o !== null ? c : c.valueOf();
  }
  function v(f, u, o, s, l, m) {
    if (wr(f)) {
      var h = f.diagonal(u);
      return o !== null ? o !== h.storage() ? t(h, o) : h : h.valueOf();
    }
    for (var c = Math.min(s[0] - l, s[1] - m), d = [], g = 0; g < c; g++)
      d[g] = f[g + l][g + m];
    return o !== null ? t(d) : d;
  }
});
var wu = "flatten";
var Kl = ["typed", "matrix"];
var Ia = P(wu, Kl, (r) => {
  var { typed: e, matrix: t } = r;
  return e(wu, { Array: function(n) {
    return qe(n);
  }, Matrix: function(n) {
    var i = qe(n.toArray());
    return t(i);
  } });
});
var Au = "identity";
var Wl = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"];
var za = P(Au, Wl, (r) => {
  var { typed: e, config: t, matrix: a, BigNumber: n, DenseMatrix: i, SparseMatrix: p } = r;
  return e(Au, { "": function() {
    return t.matrix === "Matrix" ? a([]) : [];
  }, string: function(o) {
    return a(o);
  }, "number | BigNumber": function(o) {
    return f(o, o, t.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(o, s) {
    return f(o, o, s);
  }, "number | BigNumber, number | BigNumber": function(o, s) {
    return f(o, s, t.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(o, s, l) {
    return f(o, s, l);
  }, Array: function(o) {
    return v(o);
  }, "Array, string": function(o, s) {
    return v(o, s);
  }, Matrix: function(o) {
    return v(o.valueOf(), o.storage());
  }, "Matrix, string": function(o, s) {
    return v(o.valueOf(), s);
  } });
  function v(u, o) {
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
    var l = _r(u) || _r(o) ? n : null;
    if (_r(u) && (u = u.toNumber()), _r(o) && (o = o.toNumber()), !mr(u) || u < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!mr(o) || o < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var m = l ? new n(1) : 1, h = l ? new l(0) : 0, c = [u, o];
    if (s) {
      if (s === "sparse")
        return p.diagonal(c, m, 0, h);
      if (s === "dense")
        return i.diagonal(c, m, 0, h);
      throw new TypeError('Unknown matrix type "'.concat(s, '"'));
    }
    for (var d = We([], c, h), g = u < o ? u : o, y = 0; y < g; y++)
      d[y][y] = m;
    return d;
  }
});
var Eu = "kron";
var Hl = ["typed", "matrix", "multiplyScalar"];
var Oa = P(Eu, Hl, (r) => {
  var { typed: e, matrix: t, multiplyScalar: a } = r;
  return e(Eu, { "Matrix, Matrix": function(p, v) {
    return t(n(p.toArray(), v.toArray()));
  }, "Matrix, Array": function(p, v) {
    return t(n(p.toArray(), v));
  }, "Array, Matrix": function(p, v) {
    return t(n(p, v.toArray()));
  }, "Array, Array": n });
  function n(i, p) {
    if (Br(i).length === 1 && (i = [i]), Br(p).length === 1 && (p = [p]), Br(i).length > 2 || Br(p).length > 2)
      throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(i.length) + ", y = " + JSON.stringify(p.length) + ")");
    var v = [], f = [];
    return i.map(function(u) {
      return p.map(function(o) {
        return f = [], v.push(f), u.map(function(s) {
          return o.map(function(l) {
            return f.push(a(s, l));
          });
        });
      });
    }) && v;
  }
});
function an() {
  throw new Error('No "bignumber" implementation available');
}
function Cu() {
  throw new Error('No "fraction" implementation available');
}
function on() {
  throw new Error('No "matrix" implementation available');
}
var Fu = "range";
var kl = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq"];
var Pa = P(Fu, kl, (r) => {
  var { typed: e, config: t, matrix: a, bignumber: n, smaller: i, smallerEq: p, larger: v, largerEq: f } = r;
  return e(Fu, { string: o, "string, boolean": o, "number, number": function(g, y) {
    return u(s(g, y, 1));
  }, "number, number, number": function(g, y, x) {
    return u(s(g, y, x));
  }, "number, number, boolean": function(g, y, x) {
    return u(x ? l(g, y, 1) : s(g, y, 1));
  }, "number, number, number, boolean": function(g, y, x, A) {
    return u(A ? l(g, y, x) : s(g, y, x));
  }, "BigNumber, BigNumber": function(g, y) {
    var x = g.constructor;
    return u(m(g, y, new x(1)));
  }, "BigNumber, BigNumber, BigNumber": function(g, y, x) {
    return u(m(g, y, x));
  }, "BigNumber, BigNumber, boolean": function(g, y, x) {
    var A = g.constructor;
    return u(x ? h(g, y, new A(1)) : m(g, y, new A(1)));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(g, y, x, A) {
    return u(A ? h(g, y, x) : m(g, y, x));
  } });
  function u(d) {
    return t.matrix === "Matrix" ? a ? a(d) : on() : d;
  }
  function o(d, g) {
    var y = c(d);
    if (!y)
      throw new SyntaxError('String "' + d + '" is no valid range');
    var x;
    return t.number === "BigNumber" ? (n === void 0 && an(), x = g ? h : m, u(x(n(y.start), n(y.end), n(y.step)))) : (x = g ? l : s, u(x(y.start, y.end, y.step)));
  }
  function s(d, g, y) {
    var x = [], A = d;
    if (y > 0)
      for (; i(A, g); )
        x.push(A), A += y;
    else if (y < 0)
      for (; v(A, g); )
        x.push(A), A += y;
    return x;
  }
  function l(d, g, y) {
    var x = [], A = d;
    if (y > 0)
      for (; p(A, g); )
        x.push(A), A += y;
    else if (y < 0)
      for (; f(A, g); )
        x.push(A), A += y;
    return x;
  }
  function m(d, g, y) {
    var x = n(0), A = [], C = d;
    if (y.gt(x))
      for (; i(C, g); )
        A.push(C), C = C.plus(y);
    else if (y.lt(x))
      for (; v(C, g); )
        A.push(C), C = C.plus(y);
    return A;
  }
  function h(d, g, y) {
    var x = n(0), A = [], C = d;
    if (y.gt(x))
      for (; p(C, g); )
        A.push(C), C = C.plus(y);
    else if (y.lt(x))
      for (; f(C, g); )
        A.push(C), C = C.plus(y);
    return A;
  }
  function c(d) {
    var g = d.split(":"), y = g.map(function(A) {
      return Number(A);
    }), x = y.some(function(A) {
      return isNaN(A);
    });
    if (x)
      return null;
    switch (y.length) {
      case 2:
        return { start: y[0], end: y[1], step: 1 };
      case 3:
        return { start: y[0], end: y[2], step: y[1] };
      default:
        return null;
    }
  }
});
var bu = "size";
var jl = ["typed", "config", "?matrix"];
var Ra = P(bu, jl, (r) => {
  var { typed: e, config: t, matrix: a } = r;
  return e(bu, { Matrix: function(i) {
    return i.create(i.size());
  }, Array: Br, string: function(i) {
    return t.matrix === "Array" ? [i.length] : a([i.length]);
  }, "number | Complex | BigNumber | Unit | boolean | null": function(i) {
    return t.matrix === "Array" ? [] : a ? a([]) : on();
  } });
});
var Mu = "subset";
var r0 = ["typed", "matrix"];
var qa = P(Mu, r0, (r) => {
  var { typed: e, matrix: t } = r;
  return e(Mu, { "Array, Index": function(n, i) {
    var p = t(n), v = p.subset(i);
    return i.isScalar() ? v : v.valueOf();
  }, "Matrix, Index": function(n, i) {
    return n.subset(i);
  }, "Object, Index": t0, "string, Index": e0, "Array, Index, any": function(n, i, p) {
    return t(pr(n)).subset(i, p, void 0).valueOf();
  }, "Array, Index, any, any": function(n, i, p, v) {
    return t(pr(n)).subset(i, p, v).valueOf();
  }, "Matrix, Index, any": function(n, i, p) {
    return n.clone().subset(i, p);
  }, "Matrix, Index, any, any": function(n, i, p, v) {
    return n.clone().subset(i, p, v);
  }, "string, Index, string": Su, "string, Index, string, string": Su, "Object, Index, any": n0 });
});
function e0(r, e) {
  if (!Re(e))
    throw new TypeError("Index expected");
  if (e.size().length !== 1)
    throw new hr(e.size().length, 1);
  var t = r.length;
  Nr(e.min()[0], t), Nr(e.max()[0], t);
  var a = e.dimension(0), n = "";
  return a.forEach(function(i) {
    n += r.charAt(i);
  }), n;
}
function Su(r, e, t, a) {
  if (!e || e.isIndex !== true)
    throw new TypeError("Index expected");
  if (e.size().length !== 1)
    throw new hr(e.size().length, 1);
  if (a !== void 0) {
    if (typeof a != "string" || a.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    a = " ";
  var n = e.dimension(0), i = n.size()[0];
  if (i !== t.length)
    throw new hr(n.size()[0], t.length);
  var p = r.length;
  Nr(e.min()[0]), Nr(e.max()[0]);
  for (var v = [], f = 0; f < p; f++)
    v[f] = r.charAt(f);
  if (n.forEach(function(s, l) {
    v[s] = t.charAt(l[0]);
  }), v.length > p)
    for (var u = p - 1, o = v.length; u < o; u++)
      v[u] || (v[u] = a);
  return v.join("");
}
function t0(r, e) {
  if (e.size().length !== 1)
    throw new hr(e.size(), 1);
  var t = e.dimension(0);
  if (typeof t != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  return Zt(r, t);
}
function n0(r, e, t) {
  if (e.size().length !== 1)
    throw new hr(e.size(), 1);
  var a = e.dimension(0);
  if (typeof a != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var n = pr(r);
  return Vt(n, a, t), n;
}
var Nu = "transpose";
var a0 = ["typed", "matrix"];
var Ua = P(Nu, a0, (r) => {
  var { typed: e, matrix: t } = r;
  return e(Nu, { Array: (p) => a(t(p)).valueOf(), Matrix: a, any: pr });
  function a(p) {
    var v = p.size(), f;
    switch (v.length) {
      case 1:
        f = p.clone();
        break;
      case 2:
        {
          var u = v[0], o = v[1];
          if (o === 0)
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Mr(v) + ")");
          switch (p.storage()) {
            case "dense":
              f = n(p, u, o);
              break;
            case "sparse":
              f = i(p, u, o);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Mr(v) + ")");
    }
    return f;
  }
  function n(p, v, f) {
    for (var u = p._data, o = [], s, l = 0; l < f; l++) {
      s = o[l] = [];
      for (var m = 0; m < v; m++)
        s[m] = pr(u[m][l]);
    }
    return p.createDenseMatrix({ data: o, size: [f, v], datatype: p._datatype });
  }
  function i(p, v, f) {
    for (var u = p._values, o = p._index, s = p._ptr, l = u ? [] : void 0, m = [], h = [], c = [], d = 0; d < v; d++)
      c[d] = 0;
    var g, y, x;
    for (g = 0, y = o.length; g < y; g++)
      c[o[g]]++;
    for (var A = 0, C = 0; C < v; C++)
      h.push(A), A += c[C], c[C] = h[C];
    for (h.push(A), x = 0; x < f; x++)
      for (var D = s[x], E = s[x + 1], F = D; F < E; F++) {
        var b = c[o[F]]++;
        m[b] = x, u && (l[b] = pr(u[F]));
      }
    return p.createSparseMatrix({ values: l, index: m, ptr: h, size: [f, v], datatype: p._datatype });
  }
});
var Bu = "ctranspose";
var o0 = ["typed", "transpose", "conj"];
var La = P(Bu, o0, (r) => {
  var { typed: e, transpose: t, conj: a } = r;
  return e(Bu, { any: function(i) {
    return a(t(i));
  } });
});
var _u = "zeros";
var i0 = ["typed", "config", "matrix", "BigNumber"];
var Za = P(_u, i0, (r) => {
  var { typed: e, config: t, matrix: a, BigNumber: n } = r;
  return e(_u, { "": function() {
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
    var o = p(f), s = o ? new n(0) : 0;
    if (v(f), u) {
      var l = a(u);
      return f.length > 0 ? l.resize(f, s) : l;
    } else {
      var m = [];
      return f.length > 0 ? We(m, f, s) : m;
    }
  }
  function p(f) {
    var u = false;
    return f.forEach(function(o, s, l) {
      _r(o) && (u = true, l[s] = o.toNumber());
    }), u;
  }
  function v(f) {
    f.forEach(function(u) {
      if (typeof u != "number" || !mr(u) || u < 0)
        throw new Error("Parameters in function zeros must be positive integers");
    });
  }
});
var u0 = "numeric";
var s0 = ["number", "?bignumber", "?fraction"];
var Va = P(u0, s0, (r) => {
  var { number: e, bignumber: t, fraction: a } = r, n = { string: true, number: true, BigNumber: true, Fraction: true }, i = { number: (p) => e(p), BigNumber: t ? (p) => t(p) : an, Fraction: a ? (p) => a(p) : Cu };
  return function(v) {
    var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", u = arguments.length > 2 ? arguments[2] : void 0;
    if (u !== void 0)
      throw new SyntaxError("numeric() takes one or two arguments");
    var o = Yr(v);
    if (!(o in n))
      throw new TypeError("Cannot convert " + v + ' of type "' + o + '"; valid input types are ' + Object.keys(n).join(", "));
    if (!(f in i))
      throw new TypeError("Cannot convert " + v + ' to type "' + f + '"; valid output types are ' + Object.keys(i).join(", "));
    return f === o ? v : i[f](v);
  };
});
var Tu = "divideScalar";
var f0 = ["typed", "numeric"];
var Qa = P(Tu, f0, (r) => {
  var { typed: e, numeric: t } = r;
  return e(Tu, { "number, number": function(n, i) {
    return n / i;
  }, "Complex, Complex": function(n, i) {
    return n.div(i);
  }, "BigNumber, BigNumber": function(n, i) {
    return n.div(i);
  }, "Fraction, Fraction": function(n, i) {
    return n.div(i);
  }, "Unit, number | Complex | Fraction | BigNumber | Unit": (a, n) => a.divide(n), "number | Fraction | Complex | BigNumber, Unit": (a, n) => n.divideInto(a) });
});
var Iu = "pow";
var c0 = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"];
var Ga = P(Iu, c0, (r) => {
  var { typed: e, config: t, identity: a, multiply: n, matrix: i, inv: p, number: v, fraction: f, Complex: u } = r;
  return e(Iu, { "number, number": o, "Complex, Complex": function(h, c) {
    return h.pow(c);
  }, "BigNumber, BigNumber": function(h, c) {
    return c.isInteger() || h >= 0 || t.predictable ? h.pow(c) : new u(h.toNumber(), 0).pow(c.toNumber(), 0);
  }, "Fraction, Fraction": function(h, c) {
    var d = h.pow(c);
    if (d != null)
      return d;
    if (t.predictable)
      throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return o(h.valueOf(), c.valueOf());
  }, "Array, number": s, "Array, BigNumber": function(h, c) {
    return s(h, c.toNumber());
  }, "Matrix, number": l, "Matrix, BigNumber": function(h, c) {
    return l(h, c.toNumber());
  }, "Unit, number | BigNumber": function(h, c) {
    return h.pow(c);
  } });
  function o(m, h) {
    if (t.predictable && !mr(h) && m < 0)
      try {
        var c = f(h), d = v(c);
        if ((h === d || Math.abs((h - d) / h) < 1e-14) && c.d % 2 === 1)
          return (c.n % 2 === 0 ? 1 : -1) * Math.pow(-m, h);
      } catch (g) {
      }
    return t.predictable && (m < -1 && h === 1 / 0 || m > -1 && m < 0 && h === -1 / 0) ? NaN : mr(h) || m >= 0 || t.predictable ? sa(m, h) : m * m < 1 && h === 1 / 0 || m * m > 1 && h === -1 / 0 ? 0 : new u(m, 0).pow(h, 0);
  }
  function s(m, h) {
    if (!mr(h))
      throw new TypeError("For A^b, b must be an integer (value is " + h + ")");
    var c = Br(m);
    if (c.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + c.length + " dimensions)");
    if (c[0] !== c[1])
      throw new Error("For A^b, A must be square (size is " + c[0] + "x" + c[1] + ")");
    if (h < 0)
      try {
        return s(p(m), -h);
      } catch (y) {
        throw y.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + h + ")") : y;
      }
    for (var d = a(c[0]).valueOf(), g = m; h >= 1; )
      (h & 1) === 1 && (d = n(g, d)), h >>= 1, g = n(g, g);
    return d;
  }
  function l(m, h) {
    return i(s(m.valueOf(), h));
  }
});
function Qe(r) {
  var { DenseMatrix: e } = r;
  return function(a, n, i) {
    var p = a.size();
    if (p.length !== 2)
      throw new RangeError("Matrix must be two dimensional (size: " + Mr(p) + ")");
    var v = p[0], f = p[1];
    if (v !== f)
      throw new RangeError("Matrix must be square (size: " + Mr(p) + ")");
    var u = [];
    if (wr(n)) {
      var o = n.size(), s = n._data;
      if (o.length === 1) {
        if (o[0] !== v)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var l = 0; l < v; l++)
          u[l] = [s[l]];
        return new e({ data: u, size: [v, 1], datatype: n._datatype });
      }
      if (o.length === 2) {
        if (o[0] !== v || o[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (Ke(n)) {
          if (i) {
            u = [];
            for (var m = 0; m < v; m++)
              u[m] = [s[m][0]];
            return new e({ data: u, size: [v, 1], datatype: n._datatype });
          }
          return n;
        }
        if (Se(n)) {
          for (var h = 0; h < v; h++)
            u[h] = [0];
          for (var c = n._values, d = n._index, g = n._ptr, y = g[1], x = g[0]; x < y; x++) {
            var A = d[x];
            u[A][0] = c[x];
          }
          return new e({ data: u, size: [v, 1], datatype: n._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Fr(n)) {
      var C = Br(n);
      if (C.length === 1) {
        if (C[0] !== v)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var D = 0; D < v; D++)
          u[D] = [n[D]];
        return new e({ data: u, size: [v, 1] });
      }
      if (C.length === 2) {
        if (C[0] !== v || C[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var E = 0; E < v; E++)
          u[E] = [n[E][0]];
        return new e({ data: u, size: [v, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var zu = "lsolve";
var l0 = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"];
var Ya = P(zu, l0, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtract: i, equalScalar: p, DenseMatrix: v } = r, f = Qe({ DenseMatrix: v });
  return e(zu, { "SparseMatrix, Array | Matrix": function(l, m) {
    return o(l, m);
  }, "DenseMatrix, Array | Matrix": function(l, m) {
    return u(l, m);
  }, "Array, Array | Matrix": function(l, m) {
    var h = t(l), c = u(h, m);
    return c.valueOf();
  } });
  function u(s, l) {
    l = f(s, l, true);
    for (var m = l._data, h = s._size[0], c = s._size[1], d = [], g = s._data, y = 0; y < c; y++) {
      var x = m[y][0] || 0, A = void 0;
      if (p(x, 0))
        A = 0;
      else {
        var C = g[y][y];
        if (p(C, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = a(x, C);
        for (var D = y + 1; D < h; D++)
          m[D] = [i(m[D][0] || 0, n(A, g[D][y]))];
      }
      d[y] = [A];
    }
    return new v({ data: d, size: [h, 1] });
  }
  function o(s, l) {
    l = f(s, l, true);
    for (var m = l._data, h = s._size[0], c = s._size[1], d = s._values, g = s._index, y = s._ptr, x = [], A = 0; A < c; A++) {
      var C = m[A][0] || 0;
      if (p(C, 0))
        x[A] = [0];
      else {
        for (var D = 0, E = [], F = [], b = y[A], w = y[A + 1], S = b; S < w; S++) {
          var M = g[S];
          M === A ? D = d[S] : M > A && (E.push(d[S]), F.push(M));
        }
        if (p(D, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var z = a(C, D), R = 0, I = F.length; R < I; R++) {
          var B = F[R];
          m[B] = [i(m[B][0] || 0, n(z, E[R]))];
        }
        x[A] = [z];
      }
    }
    return new v({ data: x, size: [h, 1] });
  }
});
var Ou = "usolve";
var p0 = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"];
var $a = P(Ou, p0, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtract: i, equalScalar: p, DenseMatrix: v } = r, f = Qe({ DenseMatrix: v });
  return e(Ou, { "SparseMatrix, Array | Matrix": function(l, m) {
    return o(l, m);
  }, "DenseMatrix, Array | Matrix": function(l, m) {
    return u(l, m);
  }, "Array, Array | Matrix": function(l, m) {
    var h = t(l), c = u(h, m);
    return c.valueOf();
  } });
  function u(s, l) {
    l = f(s, l, true);
    for (var m = l._data, h = s._size[0], c = s._size[1], d = [], g = s._data, y = c - 1; y >= 0; y--) {
      var x = m[y][0] || 0, A = void 0;
      if (p(x, 0))
        A = 0;
      else {
        var C = g[y][y];
        if (p(C, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = a(x, C);
        for (var D = y - 1; D >= 0; D--)
          m[D] = [i(m[D][0] || 0, n(A, g[D][y]))];
      }
      d[y] = [A];
    }
    return new v({ data: d, size: [h, 1] });
  }
  function o(s, l) {
    l = f(s, l, true);
    for (var m = l._data, h = s._size[0], c = s._size[1], d = s._values, g = s._index, y = s._ptr, x = [], A = c - 1; A >= 0; A--) {
      var C = m[A][0] || 0;
      if (p(C, 0))
        x[A] = [0];
      else {
        for (var D = 0, E = [], F = [], b = y[A], w = y[A + 1], S = w - 1; S >= b; S--) {
          var M = g[S];
          M === A ? D = d[S] : M < A && (E.push(d[S]), F.push(M));
        }
        if (p(D, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var z = a(C, D), R = 0, I = F.length; R < I; R++) {
          var B = F[R];
          m[B] = [i(m[B][0], n(z, E[R]))];
        }
        x[A] = [z];
      }
    }
    return new v({ data: x, size: [h, 1] });
  }
});
var Pu = "usolveAll";
var v0 = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"];
var Ja = P(Pu, v0, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtract: i, equalScalar: p, DenseMatrix: v } = r, f = Qe({ DenseMatrix: v });
  return e(Pu, { "SparseMatrix, Array | Matrix": function(l, m) {
    return o(l, m);
  }, "DenseMatrix, Array | Matrix": function(l, m) {
    return u(l, m);
  }, "Array, Array | Matrix": function(l, m) {
    var h = t(l), c = u(h, m);
    return c.map((d) => d.valueOf());
  } });
  function u(s, l) {
    for (var m = [f(s, l, true)._data.map((F) => F[0])], h = s._data, c = s._size[0], d = s._size[1], g = d - 1; g >= 0; g--)
      for (var y = m.length, x = 0; x < y; x++) {
        var A = m[x];
        if (p(h[g][g], 0))
          if (p(A[g], 0)) {
            if (x === 0) {
              var D = [...A];
              D[g] = 1;
              for (var E = g - 1; E >= 0; E--)
                D[E] = i(D[E], h[E][g]);
              m.push(D);
            }
          } else {
            if (x === 0)
              return [];
            m.splice(x, 1), x -= 1, y -= 1;
          }
        else {
          A[g] = a(A[g], h[g][g]);
          for (var C = g - 1; C >= 0; C--)
            A[C] = i(A[C], n(A[g], h[C][g]));
        }
      }
    return m.map((F) => new v({ data: F.map((b) => [b]), size: [c, 1] }));
  }
  function o(s, l) {
    for (var m = [f(s, l, true)._data.map((U) => U[0])], h = s._size[0], c = s._size[1], d = s._values, g = s._index, y = s._ptr, x = c - 1; x >= 0; x--)
      for (var A = m.length, C = 0; C < A; C++) {
        for (var D = m[C], E = [], F = [], b = y[x], w = y[x + 1], S = 0, M = w - 1; M >= b; M--) {
          var z = g[M];
          z === x ? S = d[M] : z < x && (E.push(d[M]), F.push(z));
        }
        if (p(S, 0))
          if (p(D[x], 0)) {
            if (C === 0) {
              var Q = [...D];
              Q[x] = 1;
              for (var Z = 0, _ = F.length; Z < _; Z++) {
                var T = F[Z];
                Q[T] = i(Q[T], E[Z]);
              }
              m.push(Q);
            }
          } else {
            if (C === 0)
              return [];
            m.splice(C, 1), C -= 1, A -= 1;
          }
        else {
          D[x] = a(D[x], S);
          for (var R = 0, I = F.length; R < I; R++) {
            var B = F[R];
            D[B] = i(D[B], n(D[x], E[R]));
          }
        }
      }
    return m.map((U) => new v({ data: U.map((W) => [W]), size: [h, 1] }));
  }
});
var un = "compare";
var m0 = ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix", "concat"];
var Xa = P(un, m0, (r) => {
  var { typed: e, config: t, equalScalar: a, matrix: n, BigNumber: i, Fraction: p, DenseMatrix: v, concat: f } = r, u = le({ typed: e }), o = nn({ typed: e, equalScalar: a }), s = ce({ typed: e, DenseMatrix: v }), l = jr({ typed: e, matrix: n, concat: f }), m = de({ typed: e });
  return e(un, h0({ typed: e, config: t }), { "boolean, boolean": function(c, d) {
    return c === d ? 0 : c > d ? 1 : -1;
  }, "BigNumber, BigNumber": function(c, d) {
    return he(c, d, t.epsilon) ? new i(0) : new i(c.cmp(d));
  }, "Fraction, Fraction": function(c, d) {
    return new p(c.compare(d));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, m, l({ SS: o, DS: u, Ss: s }));
});
var h0 = P(un, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(un, { "number, number": function(n, i) {
    return Hr(n, i, t.epsilon) ? 0 : n > i ? 1 : -1;
  } });
});
var He = Ot(qu(), 1);
var Uu = "compareNatural";
var d0 = ["typed", "compare"];
var Ka = P(Uu, d0, (r) => {
  var { typed: e, compare: t } = r, a = t.signatures["boolean,boolean"];
  return e(Uu, { "any, any": n });
  function n(f, u) {
    var o = Yr(f), s = Yr(u), l;
    if ((o === "number" || o === "BigNumber" || o === "Fraction") && (s === "number" || s === "BigNumber" || s === "Fraction"))
      return l = t(f, u), l.toString() !== "0" ? l > 0 ? 1 : -1 : (0, He.default)(o, s);
    var m = ["Array", "DenseMatrix", "SparseMatrix"];
    if (m.includes(o) || m.includes(s))
      return l = i(n, f, u), l !== 0 ? l : (0, He.default)(o, s);
    if (o !== s)
      return (0, He.default)(o, s);
    if (o === "Complex")
      return g0(f, u);
    if (o === "Unit")
      return f.equalBase(u) ? n(f.value, u.value) : p(n, f.formatUnits(), u.formatUnits());
    if (o === "boolean")
      return a(f, u);
    if (o === "string")
      return (0, He.default)(f, u);
    if (o === "Object")
      return v(n, f, u);
    if (o === "null" || o === "undefined")
      return 0;
    throw new TypeError('Unsupported type of value "' + o + '"');
  }
  function i(f, u, o) {
    return Se(u) && Se(o) ? p(f, u.toJSON().values, o.toJSON().values) : Se(u) ? i(f, u.toArray(), o) : Se(o) ? i(f, u, o.toArray()) : Ke(u) ? i(f, u.toJSON().data, o) : Ke(o) ? i(f, u, o.toJSON().data) : Array.isArray(u) ? Array.isArray(o) ? p(f, u, o) : i(f, u, [o]) : i(f, [u], o);
  }
  function p(f, u, o) {
    for (var s = 0, l = Math.min(u.length, o.length); s < l; s++) {
      var m = f(u[s], o[s]);
      if (m !== 0)
        return m;
    }
    return u.length > o.length ? 1 : u.length < o.length ? -1 : 0;
  }
  function v(f, u, o) {
    var s = Object.keys(u), l = Object.keys(o);
    s.sort(He.default), l.sort(He.default);
    var m = p(f, s, l);
    if (m !== 0)
      return m;
    for (var h = 0; h < s.length; h++) {
      var c = f(u[s[h]], o[l[h]]);
      if (c !== 0)
        return c;
    }
    return 0;
  }
});
function g0(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}
var sn = "equal";
var D0 = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"];
var Wa = P(sn, D0, (r) => {
  var { typed: e, matrix: t, equalScalar: a, DenseMatrix: n, concat: i } = r, p = le({ typed: e }), v = be({ typed: e, DenseMatrix: n }), f = ce({ typed: e, DenseMatrix: n }), u = jr({ typed: e, matrix: t, concat: i });
  return e(sn, x0({ typed: e, equalScalar: a }), u({ elop: a, SS: v, DS: p, Ss: f }));
});
var x0 = P(sn, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: t } = r;
  return e(sn, { "any, any": function(n, i) {
    return n === null ? i === null : i === null ? n === null : n === void 0 ? i === void 0 : i === void 0 ? n === void 0 : t(n, i);
  } });
});
var fn = "smaller";
var y0 = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var Ha = P(fn, y0, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, p = le({ typed: e }), v = be({ typed: e, DenseMatrix: n }), f = ce({ typed: e, DenseMatrix: n }), u = jr({ typed: e, matrix: a, concat: i }), o = de({ typed: e });
  return e(fn, w0({ typed: e, config: t }), { "boolean, boolean": (s, l) => s < l, "BigNumber, BigNumber": function(l, m) {
    return l.lt(m) && !he(l, m, t.epsilon);
  }, "Fraction, Fraction": (s, l) => s.compare(l) === -1, "Complex, Complex": function(l, m) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: v, DS: p, Ss: f }));
});
var w0 = P(fn, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(fn, { "number, number": function(n, i) {
    return n < i && !Hr(n, i, t.epsilon);
  } });
});
var cn = "smallerEq";
var A0 = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var ka = P(cn, A0, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, p = le({ typed: e }), v = be({ typed: e, DenseMatrix: n }), f = ce({ typed: e, DenseMatrix: n }), u = jr({ typed: e, matrix: a, concat: i }), o = de({ typed: e });
  return e(cn, E0({ typed: e, config: t }), { "boolean, boolean": (s, l) => s <= l, "BigNumber, BigNumber": function(l, m) {
    return l.lte(m) || he(l, m, t.epsilon);
  }, "Fraction, Fraction": (s, l) => s.compare(l) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: v, DS: p, Ss: f }));
});
var E0 = P(cn, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(cn, { "number, number": function(n, i) {
    return n <= i || Hr(n, i, t.epsilon);
  } });
});
var ln = "larger";
var C0 = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var ja = P(ln, C0, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, p = le({ typed: e }), v = be({ typed: e, DenseMatrix: n }), f = ce({ typed: e, DenseMatrix: n }), u = jr({ typed: e, matrix: a, concat: i }), o = de({ typed: e });
  return e(ln, F0({ typed: e, config: t }), { "boolean, boolean": (s, l) => s > l, "BigNumber, BigNumber": function(l, m) {
    return l.gt(m) && !he(l, m, t.epsilon);
  }, "Fraction, Fraction": (s, l) => s.compare(l) === 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: v, DS: p, Ss: f }));
});
var F0 = P(ln, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(ln, { "number, number": function(n, i) {
    return n > i && !Hr(n, i, t.epsilon);
  } });
});
var pn = "largerEq";
var b0 = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var ro = P(pn, b0, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: i } = r, p = le({ typed: e }), v = be({ typed: e, DenseMatrix: n }), f = ce({ typed: e, DenseMatrix: n }), u = jr({ typed: e, matrix: a, concat: i }), o = de({ typed: e });
  return e(pn, M0({ typed: e, config: t }), { "boolean, boolean": (s, l) => s >= l, "BigNumber, BigNumber": function(l, m) {
    return l.gte(m) || he(l, m, t.epsilon);
  }, "Fraction, Fraction": (s, l) => s.compare(l) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, o, u({ SS: v, DS: p, Ss: f }));
});
var M0 = P(pn, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(pn, { "number, number": function(n, i) {
    return n >= i || Hr(n, i, t.epsilon);
  } });
});
var S0 = "ImmutableDenseMatrix";
var N0 = ["smaller", "DenseMatrix"];
var eo = P(S0, N0, (r) => {
  var { smaller: e, DenseMatrix: t } = r;
  function a(n, i) {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (i && !Kr(i))
      throw new Error("Invalid datatype: " + i);
    if (wr(n) || Fr(n)) {
      var p = new t(n, i);
      this._data = p._data, this._size = p._size, this._datatype = p._datatype, this._min = null, this._max = null;
    } else if (n && Fr(n.data) && Fr(n.size))
      this._data = n.data, this._size = n.size, this._datatype = n.datatype, this._min = typeof n.min != "undefined" ? n.min : null, this._max = typeof n.max != "undefined" ? n.max : null;
    else {
      if (n)
        throw new TypeError("Unsupported type of data (" + Yr(n) + ")");
      this._data = [], this._size = [0], this._datatype = i, this._min = null, this._max = null;
    }
  }
  return a.prototype = new t(), a.prototype.type = "ImmutableDenseMatrix", a.prototype.isImmutableDenseMatrix = true, a.prototype.subset = function(n) {
    switch (arguments.length) {
      case 1: {
        var i = t.prototype.subset.call(this, n);
        return wr(i) ? new a({ data: i._data, size: i._size, datatype: i._datatype }) : i;
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
    return new a({ data: pr(this._data), size: pr(this._size), datatype: this._datatype });
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
var B0 = "Index";
var _0 = ["ImmutableDenseMatrix"];
var to = P(B0, _0, (r) => {
  var { ImmutableDenseMatrix: e } = r;
  function t(n) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._isScalar = true;
    for (var i = 0, p = arguments.length; i < p; i++) {
      var v = arguments[i];
      if (Rt(v))
        this._dimensions.push(v), this._isScalar = false;
      else if (Array.isArray(v) || wr(v)) {
        var f = a(v.valueOf());
        this._dimensions.push(f);
        var u = f.size();
        (u.length !== 1 || u[0] !== 1) && (this._isScalar = false);
      } else if (typeof v == "number")
        this._dimensions.push(a([v]));
      else if (typeof v == "string")
        this._dimensions.push(v);
      else
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
    }
  }
  t.prototype.type = "Index", t.prototype.isIndex = true;
  function a(n) {
    for (var i = 0, p = n.length; i < p; i++)
      if (typeof n[i] != "number" || !mr(n[i]))
        throw new TypeError("Index parameters must be positive integer numbers");
    return new e(n);
  }
  return t.prototype.clone = function() {
    var n = new t();
    return n._dimensions = pr(this._dimensions), n._isScalar = this._isScalar, n;
  }, t.create = function(n) {
    var i = new t();
    return t.apply(i, n), i;
  }, t.prototype.size = function() {
    for (var n = [], i = 0, p = this._dimensions.length; i < p; i++) {
      var v = this._dimensions[i];
      n[i] = typeof v == "string" ? 1 : v.size()[0];
    }
    return n;
  }, t.prototype.max = function() {
    for (var n = [], i = 0, p = this._dimensions.length; i < p; i++) {
      var v = this._dimensions[i];
      n[i] = typeof v == "string" ? v : v.max();
    }
    return n;
  }, t.prototype.min = function() {
    for (var n = [], i = 0, p = this._dimensions.length; i < p; i++) {
      var v = this._dimensions[i];
      n[i] = typeof v == "string" ? v : v.min();
    }
    return n;
  }, t.prototype.forEach = function(n) {
    for (var i = 0, p = this._dimensions.length; i < p; i++)
      n(this._dimensions[i], i, this);
  }, t.prototype.dimension = function(n) {
    return this._dimensions[n] || null;
  }, t.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, t.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, t.prototype.isScalar = function() {
    return this._isScalar;
  }, t.prototype.toArray = function() {
    for (var n = [], i = 0, p = this._dimensions.length; i < p; i++) {
      var v = this._dimensions[i];
      n.push(typeof v == "string" ? v : v.toArray());
    }
    return n;
  }, t.prototype.valueOf = t.prototype.toArray, t.prototype.toString = function() {
    for (var n = [], i = 0, p = this._dimensions.length; i < p; i++) {
      var v = this._dimensions[i];
      typeof v == "string" ? n.push(JSON.stringify(v)) : n.push(v.toString());
    }
    return "[" + n.join(", ") + "]";
  }, t.prototype.toJSON = function() {
    return { mathjs: "Index", dimensions: this._dimensions };
  }, t.fromJSON = function(n) {
    return t.create(n.dimensions);
  }, t;
}, { isClass: true });
var T0 = "FibonacciHeap";
var I0 = ["smaller", "larger"];
var no = P(T0, I0, (r) => {
  var { smaller: e, larger: t } = r, a = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function n() {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  n.prototype.type = "FibonacciHeap", n.prototype.isFibonacciHeap = true, n.prototype.insert = function(o, s) {
    var l = { key: o, value: s, degree: 0 };
    if (this._minimum) {
      var m = this._minimum;
      l.left = m, l.right = m.right, m.right = l, l.right.left = l, e(o, m.key) && (this._minimum = l);
    } else
      l.left = l, l.right = l, this._minimum = l;
    return this._size++, l;
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
    for (var s = this._minimum, l = o.degree, m = o.child; l > 0; ) {
      var h = m.right;
      m.left.right = m.right, m.right.left = m.left, m.left = s, m.right = s.right, s.right = m, m.right.left = m, m.parent = null, m = h, l--;
    }
    return o.left.right = o.right, o.right.left = o.left, o === o.right ? s = null : (s = o.right, s = u(s, this._size)), this._size--, this._minimum = s, o;
  }, n.prototype.remove = function(o) {
    this._minimum = i(this._minimum, o, -1), this.extractMinimum();
  };
  function i(o, s, l) {
    s.key = l;
    var m = s.parent;
    return m && e(s.key, m.key) && (p(o, s, m), v(o, m)), e(s.key, o.key) && (o = s), o;
  }
  function p(o, s, l) {
    s.left.right = s.right, s.right.left = s.left, l.degree--, l.child === s && (l.child = s.right), l.degree === 0 && (l.child = null), s.left = o, s.right = o.right, o.right = s, s.right.left = s, s.parent = null, s.mark = false;
  }
  function v(o, s) {
    var l = s.parent;
    l && (s.mark ? (p(o, s, l), v(l)) : s.mark = true);
  }
  var f = function(s, l) {
    s.left.right = s.right, s.right.left = s.left, s.parent = l, l.child ? (s.left = l.child, s.right = l.child.right, l.child.right = s, s.right.left = s) : (l.child = s, s.right = s, s.left = s), l.degree++, s.mark = false;
  };
  function u(o, s) {
    var l = Math.floor(Math.log(s) * a) + 1, m = new Array(l), h = 0, c = o;
    if (c)
      for (h++, c = c.right; c !== o; )
        h++, c = c.right;
    for (var d; h > 0; ) {
      for (var g = c.degree, y = c.right; d = m[g], !!d; ) {
        if (t(c.key, d.key)) {
          var x = d;
          d = c, c = x;
        }
        f(d, c), m[g] = null, g++;
      }
      m[g] = c, c = y, h--;
    }
    o = null;
    for (var A = 0; A < l; A++)
      d = m[A], d && (o ? (d.left.right = d.right, d.right.left = d.left, d.left = o, d.right = o.right, o.right = d, d.right.left = d, e(d.key, o.key) && (o = d)) : o = d);
    return o;
  }
  return n;
}, { isClass: true });
var z0 = "Spa";
var O0 = ["addScalar", "equalScalar", "FibonacciHeap"];
var ao = P(z0, O0, (r) => {
  var { addScalar: e, equalScalar: t, FibonacciHeap: a } = r;
  function n() {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new a();
  }
  return n.prototype.type = "Spa", n.prototype.isSpa = true, n.prototype.set = function(i, p) {
    if (this._values[i])
      this._values[i].value = p;
    else {
      var v = this._heap.insert(i, p);
      this._values[i] = v;
    }
  }, n.prototype.get = function(i) {
    var p = this._values[i];
    return p ? p.value : 0;
  }, n.prototype.accumulate = function(i, p) {
    var v = this._values[i];
    v ? v.value = e(v.value, p) : (v = this._heap.insert(i, p), this._values[i] = v);
  }, n.prototype.forEach = function(i, p, v) {
    var f = this._heap, u = this._values, o = [], s = f.extractMinimum();
    for (s && o.push(s); s && s.key <= p; )
      s.key >= i && (t(s.value, 0) || v(s.key, s.value, this)), s = f.extractMinimum(), s && o.push(s);
    for (var l = 0; l < o.length; l++) {
      var m = o[l];
      s = f.insert(m.key, m.value), u[s.key] = s;
    }
  }, n.prototype.swap = function(i, p) {
    var v = this._values[i], f = this._values[p];
    if (!v && f)
      v = this._heap.insert(i, f.value), this._heap.remove(f), this._values[i] = v, this._values[p] = void 0;
    else if (v && !f)
      f = this._heap.insert(p, v.value), this._heap.remove(v), this._values[p] = f, this._values[i] = void 0;
    else if (v && f) {
      var u = v.value;
      v.value = f.value, f.value = u;
    }
  }, n;
}, { isClass: true });
var P0 = "atan";
var R0 = ["typed"];
var oo = P(P0, R0, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(a) {
    return Math.atan(a);
  }, Complex: function(a) {
    return a.atan();
  }, BigNumber: function(a) {
    return a.atan();
  } });
});
var vn = P("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((t) => (a) => {
    if (!a.hasBase(a.constructor.BASE_UNITS.ANGLE))
      throw new TypeError("Unit in function cot is no angle");
    return e.find(t, a.valueType())(a.value);
  }) };
});
var Lu = "cos";
var q0 = ["typed"];
var io = P(Lu, q0, (r) => {
  var { typed: e } = r, t = vn({ typed: e });
  return e(Lu, { number: Math.cos, "Complex | BigNumber": (a) => a.cos() }, t);
});
var Zu = "sin";
var U0 = ["typed"];
var uo = P(Zu, U0, (r) => {
  var { typed: e } = r, t = vn({ typed: e });
  return e(Zu, { number: Math.sin, "Complex | BigNumber": (a) => a.sin() }, t);
});
var Vu = "setDifference";
var L0 = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"];
var so = P(Vu, L0, (r) => {
  var { typed: e, size: t, subset: a, compareNatural: n, Index: i, DenseMatrix: p } = r;
  return e(Vu, { "Array | Matrix, Array | Matrix": function(f, u) {
    var o;
    if (a(t(f), new i(0)) === 0)
      o = [];
    else {
      if (a(t(u), new i(0)) === 0)
        return qe(f.toArray());
      var s = Pn(qe(Array.isArray(f) ? f : f.toArray()).sort(n)), l = Pn(qe(Array.isArray(u) ? u : u.toArray()).sort(n));
      o = [];
      for (var m, h = 0; h < s.length; h++) {
        m = false;
        for (var c = 0; c < l.length; c++)
          if (n(s[h].value, l[c].value) === 0 && s[h].identifier === l[c].identifier) {
            m = true;
            break;
          }
        m || o.push(s[h]);
      }
    }
    return Array.isArray(f) && Array.isArray(u) ? Rn(o) : new p(Rn(o));
  } });
});
var Qu = "add";
var Z0 = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"];
var fo = P(Qu, Z0, (r) => {
  var { typed: e, matrix: t, addScalar: a, equalScalar: n, DenseMatrix: i, SparseMatrix: p, concat: v } = r, f = en({ typed: e }), u = su({ typed: e, equalScalar: n }), o = tn({ typed: e, DenseMatrix: i }), s = jr({ typed: e, matrix: t, concat: v });
  return e(Qu, { "any, any": a, "any, any, ...any": e.referToSelf((l) => (m, h, c) => {
    for (var d = l(m, h), g = 0; g < c.length; g++)
      d = l(d, c[g]);
    return d;
  }) }, s({ elop: a, DS: f, SS: u, Ss: o }));
});
var Gu = "norm";
var V0 = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"];
var co = P(Gu, V0, (r) => {
  var { typed: e, abs: t, add: a, pow: n, conj: i, sqrt: p, multiply: v, equalScalar: f, larger: u, smaller: o, matrix: s, ctranspose: l, eigs: m } = r;
  return e(Gu, { number: Math.abs, Complex: function(F) {
    return F.abs();
  }, BigNumber: function(F) {
    return F.abs();
  }, boolean: function(F) {
    return Math.abs(F);
  }, Array: function(F) {
    return D(s(F), 2);
  }, Matrix: function(F) {
    return D(F, 2);
  }, "Array, number | BigNumber | string": function(F, b) {
    return D(s(F), b);
  }, "Matrix, number | BigNumber | string": function(F, b) {
    return D(F, b);
  } });
  function h(E) {
    var F = 0;
    return E.forEach(function(b) {
      var w = t(b);
      u(w, F) && (F = w);
    }, true), F;
  }
  function c(E) {
    var F;
    return E.forEach(function(b) {
      var w = t(b);
      (!F || o(w, F)) && (F = w);
    }, true), F || 0;
  }
  function d(E, F) {
    if (F === Number.POSITIVE_INFINITY || F === "inf")
      return h(E);
    if (F === Number.NEGATIVE_INFINITY || F === "-inf")
      return c(E);
    if (F === "fro")
      return D(E, 2);
    if (typeof F == "number" && !isNaN(F)) {
      if (!f(F, 0)) {
        var b = 0;
        return E.forEach(function(w) {
          b = a(n(t(w), F), b);
        }, true), n(b, 1 / F);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function g(E) {
    var F = 0;
    return E.forEach(function(b, w) {
      F = a(F, v(b, i(b)));
    }), t(p(F));
  }
  function y(E) {
    var F = [], b = 0;
    return E.forEach(function(w, S) {
      var M = S[1], z = a(F[M] || 0, t(w));
      u(z, b) && (b = z), F[M] = z;
    }, true), b;
  }
  function x(E) {
    var F = E.size();
    if (F[0] !== F[1])
      throw new RangeError("Invalid matrix dimensions");
    var b = l(E), w = v(b, E), S = m(w).values.toArray(), M = S[S.length - 1];
    return t(p(M));
  }
  function A(E) {
    var F = [], b = 0;
    return E.forEach(function(w, S) {
      var M = S[0], z = a(F[M] || 0, t(w));
      u(z, b) && (b = z), F[M] = z;
    }, true), b;
  }
  function C(E, F) {
    if (F === 1)
      return y(E);
    if (F === Number.POSITIVE_INFINITY || F === "inf")
      return A(E);
    if (F === "fro")
      return g(E);
    if (F === 2)
      return x(E);
    throw new Error("Unsupported parameter value " + F);
  }
  function D(E, F) {
    var b = E.size();
    if (b.length === 1)
      return d(E, F);
    if (b.length === 2) {
      if (b[0] && b[1])
        return C(E, F);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
});
var Yu = "dot";
var Q0 = ["typed", "addScalar", "multiplyScalar", "conj", "size"];
var lo = P(Yu, Q0, (r) => {
  var { typed: e, addScalar: t, multiplyScalar: a, conj: n, size: i } = r;
  return e(Yu, { "Array | DenseMatrix, Array | DenseMatrix": v, "SparseMatrix, SparseMatrix": f });
  function p(o, s) {
    var l = u(o), m = u(s), h, c;
    if (l.length === 1)
      h = l[0];
    else if (l.length === 2 && l[1] === 1)
      h = l[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + l.join(", ") + ")");
    if (m.length === 1)
      c = m[0];
    else if (m.length === 2 && m[1] === 1)
      c = m[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + m.join(", ") + ")");
    if (h !== c)
      throw new RangeError("Vectors must have equal length (" + h + " != " + c + ")");
    if (h === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return h;
  }
  function v(o, s) {
    var l = p(o, s), m = wr(o) ? o._data : o, h = wr(o) ? o._datatype : void 0, c = wr(s) ? s._data : s, d = wr(s) ? s._datatype : void 0, g = u(o).length === 2, y = u(s).length === 2, x = t, A = a;
    if (h && d && h === d && typeof h == "string") {
      var C = h;
      x = e.find(t, [C, C]), A = e.find(a, [C, C]);
    }
    if (!g && !y) {
      for (var D = A(n(m[0]), c[0]), E = 1; E < l; E++)
        D = x(D, A(n(m[E]), c[E]));
      return D;
    }
    if (!g && y) {
      for (var F = A(n(m[0]), c[0][0]), b = 1; b < l; b++)
        F = x(F, A(n(m[b]), c[b][0]));
      return F;
    }
    if (g && !y) {
      for (var w = A(n(m[0][0]), c[0]), S = 1; S < l; S++)
        w = x(w, A(n(m[S][0]), c[S]));
      return w;
    }
    if (g && y) {
      for (var M = A(n(m[0][0]), c[0][0]), z = 1; z < l; z++)
        M = x(M, A(n(m[z][0]), c[z][0]));
      return M;
    }
  }
  function f(o, s) {
    p(o, s);
    for (var l = o._index, m = o._values, h = s._index, c = s._values, d = 0, g = t, y = a, x = 0, A = 0; x < l.length && A < h.length; ) {
      var C = l[x], D = h[A];
      if (C < D) {
        x++;
        continue;
      }
      if (C > D) {
        A++;
        continue;
      }
      C === D && (d = g(d, y(m[x], c[A])), x++, A++);
    }
    return d;
  }
  function u(o) {
    return wr(o) ? o.size() : i(o);
  }
});
var $u = "index";
var G0 = ["typed", "Index"];
var po = P($u, G0, (r) => {
  var { typed: e, Index: t } = r;
  return e($u, { "...number | string | BigNumber | Range | Array | Matrix": function(n) {
    var i = n.map(function(v) {
      return _r(v) ? v.toNumber() : Array.isArray(v) || wr(v) ? v.map(function(f) {
        return _r(f) ? f.toNumber() : f;
      }) : v;
    }), p = new t();
    return t.apply(p, i), p;
  } });
});
var Ju = "lup";
var Y0 = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtract", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"];
var vo = P(Ju, Y0, (r) => {
  var { typed: e, matrix: t, abs: a, addScalar: n, divideScalar: i, multiplyScalar: p, subtract: v, larger: f, equalScalar: u, unaryMinus: o, DenseMatrix: s, SparseMatrix: l, Spa: m } = r;
  return e(Ju, { DenseMatrix: function(g) {
    return h(g);
  }, SparseMatrix: function(g) {
    return c(g);
  }, Array: function(g) {
    var y = t(g), x = h(y);
    return { L: x.L.valueOf(), U: x.U.valueOf(), p: x.p };
  } });
  function h(d) {
    var g = d._size[0], y = d._size[1], x = Math.min(g, y), A = pr(d._data), C = [], D = [g, x], E = [], F = [x, y], b, w, S, M = [];
    for (b = 0; b < g; b++)
      M[b] = b;
    for (w = 0; w < y; w++) {
      if (w > 0)
        for (b = 0; b < g; b++) {
          var z = Math.min(b, w), R = 0;
          for (S = 0; S < z; S++)
            R = n(R, p(A[b][S], A[S][w]));
          A[b][w] = v(A[b][w], R);
        }
      var I = w, B = 0, Q = 0;
      for (b = w; b < g; b++) {
        var Z = A[b][w], _ = a(Z);
        f(_, B) && (I = b, B = _, Q = Z);
      }
      if (w !== I && (M[w] = [M[I], M[I] = M[w]][0], s._swapRows(w, I, A)), w < g)
        for (b = w + 1; b < g; b++) {
          var T = A[b][w];
          u(T, 0) || (A[b][w] = i(A[b][w], Q));
        }
    }
    for (w = 0; w < y; w++)
      for (b = 0; b < g; b++) {
        if (w === 0 && (b < y && (E[b] = []), C[b] = []), b < w) {
          b < y && (E[b][w] = A[b][w]), w < g && (C[b][w] = 0);
          continue;
        }
        if (b === w) {
          b < y && (E[b][w] = A[b][w]), w < g && (C[b][w] = 1);
          continue;
        }
        b < y && (E[b][w] = 0), w < g && (C[b][w] = A[b][w]);
      }
    var U = new s({ data: C, size: D }), W = new s({ data: E, size: F }), V = [];
    for (b = 0, x = M.length; b < x; b++)
      V[M[b]] = b;
    return { L: U, U: W, p: V, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
  function c(d) {
    var g = d._size[0], y = d._size[1], x = Math.min(g, y), A = d._values, C = d._index, D = d._ptr, E = [], F = [], b = [], w = [g, x], S = [], M = [], z = [], R = [x, y], I, B, Q, Z = [], _ = [];
    for (I = 0; I < g; I++)
      Z[I] = I, _[I] = I;
    var T = function(V, q) {
      var G = _[V], $ = _[q];
      Z[G] = q, Z[$] = V, _[V] = $, _[q] = G;
    }, U = function() {
      var V = new m();
      B < g && (b.push(E.length), E.push(1), F.push(B)), z.push(S.length);
      var q = D[B], G = D[B + 1];
      for (Q = q; Q < G; Q++)
        I = C[Q], V.set(Z[I], A[Q]);
      B > 0 && V.forEach(0, B - 1, function(nr, Y) {
        l._forEachRow(nr, E, F, b, function(Dr, cr) {
          Dr > nr && V.accumulate(Dr, o(p(cr, Y)));
        });
      });
      var $ = B, H = V.get(B), er = a(H);
      V.forEach(B + 1, g - 1, function(nr, Y) {
        var Dr = a(Y);
        f(Dr, er) && ($ = nr, er = Dr, H = Y);
      }), B !== $ && (l._swapRows(B, $, w[1], E, F, b), l._swapRows(B, $, R[1], S, M, z), V.swap(B, $), T(B, $)), V.forEach(0, g - 1, function(nr, Y) {
        nr <= B ? (S.push(Y), M.push(nr)) : (Y = i(Y, H), u(Y, 0) || (E.push(Y), F.push(nr)));
      });
    };
    for (B = 0; B < y; B++)
      U();
    return z.push(S.length), b.push(E.length), { L: new l({ values: E, index: F, ptr: b, size: w }), U: new l({ values: S, index: M, ptr: z, size: R }), p: Z, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
});
var Xu = "qr";
var $0 = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtract", "complex"];
var mo = P(Xu, $0, (r) => {
  var { typed: e, matrix: t, zeros: a, identity: n, isZero: i, equal: p, sign: v, sqrt: f, conj: u, unaryMinus: o, addScalar: s, divideScalar: l, multiplyScalar: m, subtract: h, complex: c } = r;
  return Je(e(Xu, { DenseMatrix: function(A) {
    return g(A);
  }, SparseMatrix: function(A) {
    return y(A);
  }, Array: function(A) {
    var C = t(A), D = g(C);
    return { Q: D.Q.valueOf(), R: D.R.valueOf() };
  } }), { _denseQRimpl: d });
  function d(x) {
    var A = x._size[0], C = x._size[1], D = n([A], "dense"), E = D._data, F = x.clone(), b = F._data, w, S, M, z = a([A], "");
    for (M = 0; M < Math.min(C, A); ++M) {
      var R = b[M][M], I = o(p(R, 0) ? 1 : v(R)), B = u(I), Q = 0;
      for (w = M; w < A; w++)
        Q = s(Q, m(b[w][M], u(b[w][M])));
      var Z = m(I, f(Q));
      if (!i(Z)) {
        var _ = h(R, Z);
        for (z[M] = 1, w = M + 1; w < A; w++)
          z[w] = l(b[w][M], _);
        var T = o(u(l(_, Z))), U = void 0;
        for (S = M; S < C; S++) {
          for (U = 0, w = M; w < A; w++)
            U = s(U, m(u(z[w]), b[w][S]));
          for (U = m(U, T), w = M; w < A; w++)
            b[w][S] = m(h(b[w][S], m(z[w], U)), B);
        }
        for (w = 0; w < A; w++) {
          for (U = 0, S = M; S < A; S++)
            U = s(U, m(E[w][S], z[S]));
          for (U = m(U, T), S = M; S < A; ++S)
            E[w][S] = l(h(E[w][S], m(U, u(z[S]))), B);
        }
      }
    }
    return { Q: D, R: F, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function g(x) {
    var A = d(x), C = A.R._data;
    if (x._data.length > 0)
      for (var D = C[0][0].type === "Complex" ? c(0) : 0, E = 0; E < C.length; ++E)
        for (var F = 0; F < E && F < (C[0] || []).length; ++F)
          C[E][F] = D;
    return A;
  }
  function y(x) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function Ku(r, e, t, a) {
  for (var n = r._values, i = r._index, p = r._ptr, v = r._size, f = r._datatype, u = v[0], o = v[1], s = a && r._values ? [] : null, l = [], m = [], h = 0, c = 0; c < o; c++) {
    m[c] = h;
    for (var d = t ? t[c] : c, g = p[d], y = p[d + 1], x = g; x < y; x++) {
      var A = e ? e[i[x]] : i[x];
      l[h] = A, s && (s[h] = n[x]), h++;
    }
  }
  return m[o] = h, r.createSparseMatrix({ values: s, index: l, ptr: m, size: [u, o], datatype: f });
}
function mn(r, e, t, a, n, i, p) {
  var v = 0;
  for (t[p] = r; v >= 0; ) {
    var f = t[p + v], u = t[a + f];
    u === -1 ? (v--, i[e++] = f) : (t[a + f] = t[n + u], ++v, t[p + v] = u);
  }
  return e;
}
function Wu(r, e) {
  if (!r)
    return null;
  var t = 0, a, n = [], i = [], p = 0, v = e, f = 2 * e;
  for (a = 0; a < e; a++)
    i[p + a] = -1;
  for (a = e - 1; a >= 0; a--)
    r[a] !== -1 && (i[v + a] = i[p + r[a]], i[p + r[a]] = a);
  for (a = 0; a < e; a++)
    r[a] === -1 && (t = mn(a, t, i, p, v, n, f));
  return n;
}
function Hu(r, e) {
  if (!r)
    return null;
  var t = r._index, a = r._ptr, n = r._size, i = n[0], p = n[1], v = [], f = [], u = 0, o = p, s, l;
  if (e)
    for (s = 0; s < i; s++)
      f[o + s] = -1;
  for (var m = 0; m < p; m++) {
    v[m] = -1, f[u + m] = -1;
    for (var h = a[m], c = a[m + 1], d = h; d < c; d++) {
      var g = t[d];
      for (s = e ? f[o + g] : g; s !== -1 && s < m; s = l)
        l = f[u + s], f[u + s] = m, l === -1 && (v[s] = m);
      e && (f[o + g] = m);
    }
  }
  return v;
}
function ku(r, e, t) {
  for (var a = r._values, n = r._index, i = r._ptr, p = r._size, v = p[1], f = 0, u = 0; u < v; u++) {
    var o = i[u];
    for (i[u] = f; o < i[u + 1]; o++)
      e(n[o], u, a ? a[o] : 1, t) && (n[f] = n[o], a && (a[f] = a[o]), f++);
  }
  return i[v] = f, n.splice(f, n.length - f), a && a.splice(f, a.length - f), f;
}
function we(r) {
  return -r - 2;
}
var J0 = "csAmd";
var X0 = ["add", "multiply", "transpose"];
var ju = P(J0, X0, (r) => {
  var { add: e, multiply: t, transpose: a } = r;
  return function(o, s) {
    if (!s || o <= 0 || o > 3)
      return null;
    var l = s._size, m = l[0], h = l[1], c = 0, d = Math.max(16, 10 * Math.sqrt(h));
    d = Math.min(h - 2, d);
    var g = n(o, s, m, h, d);
    ku(g, f, null);
    for (var y = g._index, x = g._ptr, A = x[h], C = [], D = [], E = 0, F = h + 1, b = 2 * (h + 1), w = 3 * (h + 1), S = 4 * (h + 1), M = 5 * (h + 1), z = 6 * (h + 1), R = 7 * (h + 1), I = C, B = i(h, x, D, E, w, I, b, R, F, z, S, M), Q = p(h, x, D, M, S, z, d, F, w, I, b), Z = 0, _, T, U, W, V, q, G, $, H, er, nr, Y, Dr, cr, or, ir; Q < h; ) {
      for (U = -1; Z < h && (U = D[w + Z]) === -1; Z++)
        ;
      D[b + U] !== -1 && (I[D[b + U]] = -1), D[w + Z] = D[b + U];
      var xr = D[S + U], Ar = D[F + U];
      Q += Ar;
      var Cr = 0;
      D[F + U] = -Ar;
      var fr = x[U], yr = xr === 0 ? fr : A, br = yr;
      for (W = 1; W <= xr + 1; W++) {
        for (W > xr ? (q = U, G = fr, $ = D[E + U] - xr) : (q = y[fr++], G = x[q], $ = D[E + q]), V = 1; V <= $; V++)
          _ = y[G++], !((H = D[F + _]) <= 0) && (Cr += H, D[F + _] = -H, y[br++] = _, D[b + _] !== -1 && (I[D[b + _]] = I[_]), I[_] !== -1 ? D[b + I[_]] = D[b + _] : D[w + D[M + _]] = D[b + _]);
        q !== U && (x[q] = we(U), D[z + q] = 0);
      }
      for (xr !== 0 && (A = br), D[M + U] = Cr, x[U] = yr, D[E + U] = br - yr, D[S + U] = -2, B = v(B, c, D, z, h), er = yr; er < br; er++)
        if (_ = y[er], !((nr = D[S + _]) <= 0)) {
          H = -D[F + _];
          var Or = B - H;
          for (fr = x[_], Y = x[_] + nr - 1; fr <= Y; fr++)
            q = y[fr], D[z + q] >= B ? D[z + q] -= H : D[z + q] !== 0 && (D[z + q] = D[M + q] + Or);
        }
      for (er = yr; er < br; er++) {
        for (_ = y[er], Y = x[_], Dr = Y + D[S + _] - 1, cr = Y, or = 0, ir = 0, fr = Y; fr <= Dr; fr++)
          if (q = y[fr], D[z + q] !== 0) {
            var Pr = D[z + q] - B;
            Pr > 0 ? (ir += Pr, y[cr++] = q, or += q) : (x[q] = we(U), D[z + q] = 0);
          }
        D[S + _] = cr - Y + 1;
        var re = cr, ve = Y + D[E + _];
        for (fr = Dr + 1; fr < ve; fr++) {
          T = y[fr];
          var Jr = D[F + T];
          Jr <= 0 || (ir += Jr, y[cr++] = T, or += T);
        }
        ir === 0 ? (x[_] = we(U), H = -D[F + _], Cr -= H, Ar += H, Q += H, D[F + _] = 0, D[S + _] = -1) : (D[M + _] = Math.min(D[M + _], ir), y[cr] = y[re], y[re] = y[Y], y[Y] = U, D[E + _] = cr - Y + 1, or = (or < 0 ? -or : or) % h, D[b + _] = D[R + or], D[R + or] = _, I[_] = or);
      }
      for (D[M + U] = Cr, c = Math.max(c, Cr), B = v(B + c, c, D, z, h), er = yr; er < br; er++)
        if (_ = y[er], !(D[F + _] >= 0))
          for (or = I[_], _ = D[R + or], D[R + or] = -1; _ !== -1 && D[b + _] !== -1; _ = D[b + _], B++) {
            for ($ = D[E + _], nr = D[S + _], fr = x[_] + 1; fr <= x[_] + $ - 1; fr++)
              D[z + y[fr]] = B;
            var Ae = _;
            for (T = D[b + _]; T !== -1; ) {
              var Me = D[E + T] === $ && D[S + T] === nr;
              for (fr = x[T] + 1; Me && fr <= x[T] + $ - 1; fr++)
                D[z + y[fr]] !== B && (Me = 0);
              Me ? (x[T] = we(_), D[F + _] += D[F + T], D[F + T] = 0, D[S + T] = -1, T = D[b + T], D[b + Ae] = T) : (Ae = T, T = D[b + T]);
            }
          }
      for (fr = yr, er = yr; er < br; er++)
        _ = y[er], !((H = -D[F + _]) <= 0) && (D[F + _] = H, ir = D[M + _] + Cr - H, ir = Math.min(ir, h - Q - H), D[w + ir] !== -1 && (I[D[w + ir]] = _), D[b + _] = D[w + ir], I[_] = -1, D[w + ir] = _, Z = Math.min(Z, ir), D[M + _] = ir, y[fr++] = _);
      D[F + U] = Ar, (D[E + U] = fr - yr) === 0 && (x[U] = -1, D[z + U] = 0), xr !== 0 && (A = fr);
    }
    for (_ = 0; _ < h; _++)
      x[_] = we(x[_]);
    for (T = 0; T <= h; T++)
      D[w + T] = -1;
    for (T = h; T >= 0; T--)
      D[F + T] > 0 || (D[b + T] = D[w + x[T]], D[w + x[T]] = T);
    for (q = h; q >= 0; q--)
      D[F + q] <= 0 || x[q] !== -1 && (D[b + q] = D[w + x[q]], D[w + x[q]] = q);
    for (U = 0, _ = 0; _ <= h; _++)
      x[_] === -1 && (U = mn(_, U, D, w, b, C, z));
    return C.splice(C.length - 1, 1), C;
  };
  function n(u, o, s, l, m) {
    var h = a(o);
    if (u === 1 && l === s)
      return e(o, h);
    if (u === 2) {
      for (var c = h._index, d = h._ptr, g = 0, y = 0; y < s; y++) {
        var x = d[y];
        if (d[y] = g, !(d[y + 1] - x > m))
          for (var A = d[y + 1]; x < A; x++)
            c[g++] = c[x];
      }
      return d[s] = g, o = a(h), t(h, o);
    }
    return t(h, o);
  }
  function i(u, o, s, l, m, h, c, d, g, y, x, A) {
    for (var C = 0; C < u; C++)
      s[l + C] = o[C + 1] - o[C];
    s[l + u] = 0;
    for (var D = 0; D <= u; D++)
      s[m + D] = -1, h[D] = -1, s[c + D] = -1, s[d + D] = -1, s[g + D] = 1, s[y + D] = 1, s[x + D] = 0, s[A + D] = s[l + D];
    var E = v(0, 0, s, y, u);
    return s[x + u] = -2, o[u] = -1, s[y + u] = 0, E;
  }
  function p(u, o, s, l, m, h, c, d, g, y, x) {
    for (var A = 0, C = 0; C < u; C++) {
      var D = s[l + C];
      if (D === 0)
        s[m + C] = -2, A++, o[C] = -1, s[h + C] = 0;
      else if (D > c)
        s[d + C] = 0, s[m + C] = -1, A++, o[C] = we(u), s[d + u]++;
      else {
        var E = s[g + D];
        E !== -1 && (y[E] = C), s[x + C] = s[g + D], s[g + D] = C;
      }
    }
    return A;
  }
  function v(u, o, s, l, m) {
    if (u < 2 || u + o < 0) {
      for (var h = 0; h < m; h++)
        s[l + h] !== 0 && (s[l + h] = 1);
      u = 2;
    }
    return u;
  }
  function f(u, o) {
    return u !== o;
  }
});
function rs(r, e, t, a, n, i, p) {
  var v, f, u = 0, o;
  if (r <= e || t[a + e] <= t[n + r])
    return -1;
  t[n + r] = t[a + e];
  var s = t[i + r];
  if (t[i + r] = e, s === -1)
    u = 1, o = r;
  else {
    for (u = 2, o = s; o !== t[p + o]; o = t[p + o])
      ;
    for (v = s; v !== o; v = f)
      f = t[p + v], t[p + v] = o;
  }
  return { jleaf: u, q: o };
}
var K0 = "csCounts";
var W0 = ["transpose"];
var es = P(K0, W0, (r) => {
  var { transpose: e } = r;
  return function(t, a, n, i) {
    if (!t || !a || !n)
      return null;
    var p = t._size, v = p[0], f = p[1], u, o, s, l, m, h, c, d = 4 * f + (i ? f + v + 1 : 0), g = [], y = 0, x = f, A = 2 * f, C = 3 * f, D = 4 * f, E = 5 * f + 1;
    for (s = 0; s < d; s++)
      g[s] = -1;
    var F = [], b = e(t), w = b._index, S = b._ptr;
    for (s = 0; s < f; s++)
      for (o = n[s], F[o] = g[C + o] === -1 ? 1 : 0; o !== -1 && g[C + o] === -1; o = a[o])
        g[C + o] = s;
    if (i) {
      for (s = 0; s < f; s++)
        g[n[s]] = s;
      for (u = 0; u < v; u++) {
        for (s = f, h = S[u], c = S[u + 1], m = h; m < c; m++)
          s = Math.min(s, g[w[m]]);
        g[E + u] = g[D + s], g[D + s] = u;
      }
    }
    for (u = 0; u < f; u++)
      g[y + u] = u;
    for (s = 0; s < f; s++) {
      for (o = n[s], a[o] !== -1 && F[a[o]]--, l = i ? g[D + s] : o; l !== -1; l = i ? g[E + l] : -1)
        for (m = S[l]; m < S[l + 1]; m++) {
          u = w[m];
          var M = rs(u, o, g, C, x, A, y);
          M.jleaf >= 1 && F[o]++, M.jleaf === 2 && F[M.q]--;
        }
      a[o] !== -1 && (g[y + o] = a[o]);
    }
    for (o = 0; o < f; o++)
      a[o] !== -1 && (F[a[o]] += F[o]);
    return F;
  };
});
var H0 = "csSqr";
var k0 = ["add", "multiply", "transpose"];
var ts = P(H0, k0, (r) => {
  var { add: e, multiply: t, transpose: a } = r, n = ju({ add: e, multiply: t, transpose: a }), i = es({ transpose: a });
  return function(f, u, o) {
    var s = u._ptr, l = u._size, m = l[1], h, c = {};
    if (c.q = n(f, u), f && !c.q)
      return null;
    if (o) {
      var d = f ? Ku(u, null, c.q, 0) : u;
      c.parent = Hu(d, 1);
      var g = Wu(c.parent, m);
      if (c.cp = i(d, c.parent, g, 1), d && c.parent && c.cp && p(d, c))
        for (c.unz = 0, h = 0; h < m; h++)
          c.unz += c.cp[h];
    } else
      c.unz = 4 * s[m] + m, c.lnz = c.unz;
    return c;
  };
  function p(v, f) {
    var u = v._ptr, o = v._index, s = v._size, l = s[0], m = s[1];
    f.pinv = [], f.leftmost = [];
    var h = f.parent, c = f.pinv, d = f.leftmost, g = [], y = 0, x = l, A = l + m, C = l + 2 * m, D, E, F, b, w;
    for (E = 0; E < m; E++)
      g[x + E] = -1, g[A + E] = -1, g[C + E] = 0;
    for (D = 0; D < l; D++)
      d[D] = -1;
    for (E = m - 1; E >= 0; E--)
      for (b = u[E], w = u[E + 1], F = b; F < w; F++)
        d[o[F]] = E;
    for (D = l - 1; D >= 0; D--)
      c[D] = -1, E = d[D], E !== -1 && (g[C + E]++ === 0 && (g[A + E] = D), g[y + D] = g[x + E], g[x + E] = D);
    for (f.lnz = 0, f.m2 = l, E = 0; E < m; E++)
      if (D = g[x + E], f.lnz++, D < 0 && (D = f.m2++), c[D] = E, !(--C[E] <= 0)) {
        f.lnz += g[C + E];
        var S = h[E];
        S !== -1 && (g[C + S] === 0 && (g[A + S] = g[A + E]), g[y + g[A + E]] = g[x + S], g[x + S] = g[y + D], g[C + S] += g[C + E]);
      }
    for (D = 0; D < l; D++)
      c[D] < 0 && (c[D] = E++);
    return true;
  }
});
function Et(r, e) {
  return r[e] < 0;
}
function hn(r, e) {
  r[e] = we(r[e]);
}
function ho(r) {
  return r < 0 ? we(r) : r;
}
function ns(r, e, t, a, n) {
  var i = e._index, p = e._ptr, v = e._size, f = v[1], u, o, s, l = 0;
  for (a[0] = r; l >= 0; ) {
    r = a[l];
    var m = n ? n[r] : r;
    Et(p, r) || (hn(p, r), a[f + l] = m < 0 ? 0 : ho(p[m]));
    var h = 1;
    for (o = a[f + l], s = m < 0 ? 0 : ho(p[m + 1]); o < s; o++)
      if (u = i[o], !Et(p, u)) {
        a[f + l] = o, a[++l] = u, h = 0;
        break;
      }
    h && (l--, a[--t] = r);
  }
  return t;
}
function as(r, e, t, a, n) {
  var i = r._ptr, p = r._size, v = e._index, f = e._ptr, u = p[1], o, s, l, m = u;
  for (s = f[t], l = f[t + 1], o = s; o < l; o++) {
    var h = v[o];
    Et(i, h) || (m = ns(h, r, m, a, n));
  }
  for (o = m; o < u; o++)
    hn(i, a[o]);
  return m;
}
var j0 = "csSpsolve";
var rp = ["divideScalar", "multiply", "subtract"];
var os = P(j0, rp, (r) => {
  var { divideScalar: e, multiply: t, subtract: a } = r;
  return function(i, p, v, f, u, o, s) {
    var l = i._values, m = i._index, h = i._ptr, c = i._size, d = c[1], g = p._values, y = p._index, x = p._ptr, A, C, D, E, F = as(i, p, v, f, o);
    for (A = F; A < d; A++)
      u[f[A]] = 0;
    for (C = x[v], D = x[v + 1], A = C; A < D; A++)
      u[y[A]] = g[A];
    for (var b = F; b < d; b++) {
      var w = f[b], S = o ? o[w] : w;
      if (!(S < 0))
        for (C = h[S], D = h[S + 1], u[w] = e(u[w], l[s ? C : D - 1]), A = s ? C + 1 : C, E = s ? D : D - 1; A < E; A++) {
          var M = m[A];
          u[M] = a(u[M], t(l[A], u[w]));
        }
    }
    return F;
  };
});
var ep = "csLu";
var tp = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"];
var is = P(ep, tp, (r) => {
  var { abs: e, divideScalar: t, multiply: a, subtract: n, larger: i, largerEq: p, SparseMatrix: v } = r, f = os({ divideScalar: t, multiply: a, subtract: n });
  return function(o, s, l) {
    if (!o)
      return null;
    var m = o._size, h = m[1], c, d = 100, g = 100;
    s && (c = s.q, d = s.lnz || d, g = s.unz || g);
    var y = [], x = [], A = [], C = new v({ values: y, index: x, ptr: A, size: [h, h] }), D = [], E = [], F = [], b = new v({ values: D, index: E, ptr: F, size: [h, h] }), w = [], S, M, z = [], R = [];
    for (S = 0; S < h; S++)
      z[S] = 0, w[S] = -1, A[S + 1] = 0;
    d = 0, g = 0;
    for (var I = 0; I < h; I++) {
      A[I] = d, F[I] = g;
      var B = c ? c[I] : I, Q = f(C, o, B, R, z, w, 1), Z = -1, _ = -1;
      for (M = Q; M < h; M++)
        if (S = R[M], w[S] < 0) {
          var T = e(z[S]);
          i(T, _) && (_ = T, Z = S);
        } else
          E[g] = w[S], D[g++] = z[S];
      if (Z === -1 || _ <= 0)
        return null;
      w[B] < 0 && p(e(z[B]), a(_, l)) && (Z = B);
      var U = z[Z];
      for (E[g] = I, D[g++] = U, w[Z] = I, x[d] = Z, y[d++] = 1, M = Q; M < h; M++)
        S = R[M], w[S] < 0 && (x[d] = S, y[d++] = t(z[S], U)), z[S] = 0;
    }
    for (A[h] = d, F[h] = g, M = 0; M < d; M++)
      x[M] = w[x[M]];
    return y.splice(d, y.length - d), x.splice(d, x.length - d), D.splice(g, D.length - g), E.splice(g, E.length - g), { L: C, U: b, pinv: w };
  };
});
var us = "slu";
var np = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"];
var go = P(us, np, (r) => {
  var { typed: e, abs: t, add: a, multiply: n, transpose: i, divideScalar: p, subtract: v, larger: f, largerEq: u, SparseMatrix: o } = r, s = ts({ add: a, multiply: n, transpose: i }), l = is({ abs: t, divideScalar: p, multiply: n, subtract: v, larger: f, largerEq: u, SparseMatrix: o });
  return e(us, { "SparseMatrix, number, number": function(h, c, d) {
    if (!mr(c) || c < 0 || c > 3)
      throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
    if (d < 0 || d > 1)
      throw new Error("Partial pivoting threshold must be a number from 0 to 1");
    var g = s(c, h, false), y = l(h, g, d);
    return { L: y.L, U: y.U, p: y.pinv, q: g.q, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
    } };
  } });
});
function Do(r, e) {
  var t, a = e.length, n = [];
  if (r)
    for (t = 0; t < a; t++)
      n[r[t]] = e[t];
  else
    for (t = 0; t < a; t++)
      n[t] = e[t];
  return n;
}
var ss = "lusolve";
var ap = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"];
var xo = P(ss, ap, (r) => {
  var { typed: e, matrix: t, lup: a, slu: n, usolve: i, lsolve: p, DenseMatrix: v } = r, f = Qe({ DenseMatrix: v });
  return e(ss, { "Array, Array | Matrix": function(l, m) {
    l = t(l);
    var h = a(l), c = o(h.L, h.U, h.p, null, m);
    return c.valueOf();
  }, "DenseMatrix, Array | Matrix": function(l, m) {
    var h = a(l);
    return o(h.L, h.U, h.p, null, m);
  }, "SparseMatrix, Array | Matrix": function(l, m) {
    var h = a(l);
    return o(h.L, h.U, h.p, null, m);
  }, "SparseMatrix, Array | Matrix, number, number": function(l, m, h, c) {
    var d = n(l, h, c);
    return o(d.L, d.U, d.p, d.q, m);
  }, "Object, Array | Matrix": function(l, m) {
    return o(l.L, l.U, l.p, l.q, m);
  } });
  function u(s) {
    if (wr(s))
      return s;
    if (Fr(s))
      return t(s);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function o(s, l, m, h, c) {
    s = u(s), l = u(l), m && (c = f(s, c, true), c._data = Do(m, c._data));
    var d = p(s, c), g = i(l, d);
    return h && (g._data = Do(h, g._data)), g;
  }
});
var fs = "det";
var op = ["typed", "matrix", "subtract", "multiply", "divideScalar", "isZero", "unaryMinus"];
var yo = P(fs, op, (r) => {
  var { typed: e, matrix: t, subtract: a, multiply: n, divideScalar: i, isZero: p, unaryMinus: v } = r;
  return e(fs, { any: function(o) {
    return pr(o);
  }, "Array | Matrix": function(o) {
    var s;
    switch (wr(o) ? s = o.size() : Array.isArray(o) ? (o = t(o), s = o.size()) : s = [], s.length) {
      case 0:
        return pr(o);
      case 1:
        if (s[0] === 1)
          return pr(o.valueOf()[0]);
        if (s[0] === 0)
          return 1;
        throw new RangeError("Matrix must be square (size: " + Mr(s) + ")");
      case 2: {
        var l = s[0], m = s[1];
        if (l === m)
          return f(o.clone().valueOf(), l, m);
        if (m === 0)
          return 1;
        throw new RangeError("Matrix must be square (size: " + Mr(s) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Mr(s) + ")");
    }
  } });
  function f(u, o, s) {
    if (o === 1)
      return pr(u[0][0]);
    if (o === 2)
      return a(n(u[0][0], u[1][1]), n(u[1][0], u[0][1]));
    for (var l = false, m = new Array(o).fill(0).map((E, F) => F), h = 0; h < o; h++) {
      var c = m[h];
      if (p(u[c][h])) {
        var d = void 0;
        for (d = h + 1; d < o; d++)
          if (!p(u[m[d]][h])) {
            c = m[d], m[d] = m[h], m[h] = c, l = !l;
            break;
          }
        if (d === o)
          return u[c][h];
      }
      for (var g = u[c][h], y = h === 0 ? 1 : u[m[h - 1]][h - 1], x = h + 1; x < o; x++)
        for (var A = m[x], C = h + 1; C < o; C++)
          u[A][C] = i(a(n(u[A][C], g), n(u[A][h], u[c][C])), y);
    }
    var D = u[m[o - 1]][o - 1];
    return l ? v(D) : D;
  }
});
var cs = "inv";
var ip = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"];
var wo = P(cs, ip, (r) => {
  var { typed: e, matrix: t, divideScalar: a, addScalar: n, multiply: i, unaryMinus: p, det: v, identity: f, abs: u } = r;
  return e(cs, { "Array | Matrix": function(l) {
    var m = wr(l) ? l.size() : Br(l);
    switch (m.length) {
      case 1:
        if (m[0] === 1)
          return wr(l) ? t([a(1, l.valueOf()[0])]) : [a(1, l[0])];
        throw new RangeError("Matrix must be square (size: " + Mr(m) + ")");
      case 2: {
        var h = m[0], c = m[1];
        if (h === c)
          return wr(l) ? t(o(l.valueOf(), h, c), l.storage()) : o(l, h, c);
        throw new RangeError("Matrix must be square (size: " + Mr(m) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Mr(m) + ")");
    }
  }, any: function(l) {
    return a(1, l);
  } });
  function o(s, l, m) {
    var h, c, d, g, y;
    if (l === 1) {
      if (g = s[0][0], g === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(1, g)]];
    } else if (l === 2) {
      var x = v(s);
      if (x === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(s[1][1], x), a(p(s[0][1]), x)], [a(p(s[1][0]), x), a(s[0][0], x)]];
    } else {
      var A = s.concat();
      for (h = 0; h < l; h++)
        A[h] = A[h].concat();
      for (var C = f(l).valueOf(), D = 0; D < m; D++) {
        var E = u(A[D][D]), F = D;
        for (h = D + 1; h < l; )
          u(A[h][D]) > E && (E = u(A[h][D]), F = h), h++;
        if (E === 0)
          throw Error("Cannot calculate inverse, determinant is zero");
        h = F, h !== D && (y = A[D], A[D] = A[h], A[h] = y, y = C[D], C[D] = C[h], C[h] = y);
        var b = A[D], w = C[D];
        for (h = 0; h < l; h++) {
          var S = A[h], M = C[h];
          if (h !== D) {
            if (S[D] !== 0) {
              for (d = a(p(S[D]), b[D]), c = D; c < m; c++)
                S[c] = n(S[c], i(d, b[c]));
              for (c = 0; c < m; c++)
                M[c] = n(M[c], i(d, w[c]));
            }
          } else {
            for (d = b[D], c = D; c < m; c++)
              S[c] = a(S[c], d);
            for (c = 0; c < m; c++)
              M[c] = a(M[c], d);
          }
        }
      }
      return C;
    }
  }
});
function ls(r) {
  var { addScalar: e, subtract: t, flatten: a, multiply: n, multiplyScalar: i, divideScalar: p, sqrt: v, abs: f, bignumber: u, diag: o, inv: s, qr: l, usolve: m, usolveAll: h, equal: c, complex: d, larger: g, smaller: y, matrixFromColumns: x, dot: A } = r;
  function C(T, U, W, V, q) {
    q === void 0 && (q = true);
    var G = D(T, U, W, V, q);
    E(T, U, W, V, q, G);
    var { values: $, C: H } = F(T, U, W, V, q), er;
    return q && (er = b(T, U, H, G, $, W, V), er = x(...er)), { values: $, vectors: er };
  }
  function D(T, U, W, V, q) {
    var G = V === "BigNumber", $ = V === "Complex", H = G ? u(0) : 0, er = G ? u(1) : $ ? d(1) : 1, nr = G ? u(1) : 1, Y = G ? u(10) : 2, Dr = i(Y, Y), cr;
    q && (cr = Array(U).fill(er));
    for (var or = false; !or; ) {
      or = true;
      for (var ir = 0; ir < U; ir++) {
        for (var xr = H, Ar = H, Cr = 0; Cr < U; Cr++)
          if (ir !== Cr) {
            var fr = f(T[ir][Cr]);
            xr = e(xr, fr), Ar = e(Ar, fr);
          }
        if (!c(xr, 0) && !c(Ar, 0)) {
          for (var yr = nr, br = xr, Or = p(Ar, Y), Pr = i(Ar, Y); y(br, Or); )
            br = i(br, Dr), yr = i(yr, Y);
          for (; g(br, Pr); )
            br = p(br, Dr), yr = p(yr, Y);
          var re = y(p(e(br, Ar), yr), i(e(xr, Ar), 0.95));
          if (re) {
            or = false;
            for (var ve = p(1, yr), Jr = 0; Jr < U; Jr++)
              ir !== Jr && (T[ir][Jr] = i(T[ir][Jr], yr), T[Jr][ir] = i(T[Jr][ir], ve));
            q && (cr[ir] = i(cr[ir], yr));
          }
        }
      }
    }
    return o(cr);
  }
  function E(T, U, W, V, q, G) {
    var $ = V === "BigNumber", H = V === "Complex", er = $ ? u(0) : H ? d(0) : 0;
    $ && (W = u(W));
    for (var nr = 0; nr < U - 2; nr++) {
      for (var Y = 0, Dr = er, cr = nr + 1; cr < U; cr++) {
        var or = T[cr][nr];
        y(f(Dr), f(or)) && (Dr = or, Y = cr);
      }
      if (!y(f(Dr), W)) {
        if (Y !== nr + 1) {
          var ir = T[Y];
          T[Y] = T[nr + 1], T[nr + 1] = ir;
          for (var xr = 0; xr < U; xr++) {
            var Ar = T[xr][Y];
            T[xr][Y] = T[xr][nr + 1], T[xr][nr + 1] = Ar;
          }
          if (q) {
            var Cr = G[Y];
            G[Y] = G[nr + 1], G[nr + 1] = Cr;
          }
        }
        for (var fr = nr + 2; fr < U; fr++) {
          var yr = p(T[fr][nr], Dr);
          if (yr !== 0) {
            for (var br = 0; br < U; br++)
              T[fr][br] = t(T[fr][br], i(yr, T[nr + 1][br]));
            for (var Or = 0; Or < U; Or++)
              T[Or][nr + 1] = e(T[Or][nr + 1], i(yr, T[Or][fr]));
            if (q)
              for (var Pr = 0; Pr < U; Pr++)
                G[fr][Pr] = t(G[fr][Pr], i(yr, G[nr + 1][Pr]));
          }
        }
      }
    }
    return G;
  }
  function F(T, U, W, V, q) {
    var G = V === "BigNumber", $ = V === "Complex", H = G ? u(1) : $ ? d(1) : 1;
    G && (W = u(W));
    for (var er = pr(T), nr = [], Y = U, Dr = [], cr = q ? o(Array(U).fill(H)) : void 0, or = q ? o(Array(Y).fill(H)) : void 0, ir = 0; ir <= 100; ) {
      ir += 1;
      for (var xr = 0, Ar = 0; Ar < Y; Ar++)
        er[Ar][Ar] = t(er[Ar][Ar], xr);
      var { Q: Cr, R: fr } = l(er);
      er = n(fr, Cr);
      for (var yr = 0; yr < Y; yr++)
        er[yr][yr] = e(er[yr][yr], xr);
      if (q && (or = n(or, Cr)), Y === 1 || y(f(er[Y - 1][Y - 2]), W)) {
        ir = 0, nr.push(er[Y - 1][Y - 1]), q && (Dr.unshift([[1]]), M(or, U), cr = n(cr, or), Y > 1 && (or = o(Array(Y - 1).fill(H)))), Y -= 1, er.pop();
        for (var br = 0; br < Y; br++)
          er[br].pop();
      } else if (Y === 2 || y(f(er[Y - 2][Y - 3]), W)) {
        ir = 0;
        var Or = w(er[Y - 2][Y - 2], er[Y - 2][Y - 1], er[Y - 1][Y - 2], er[Y - 1][Y - 1]);
        nr.push(...Or), q && (Dr.unshift(S(er[Y - 2][Y - 2], er[Y - 2][Y - 1], er[Y - 1][Y - 2], er[Y - 1][Y - 1], Or[0], Or[1], W, V)), M(or, U), cr = n(cr, or), Y > 2 && (or = o(Array(Y - 2).fill(H)))), Y -= 2, er.pop(), er.pop();
        for (var Pr = 0; Pr < Y; Pr++)
          er[Pr].pop(), er[Pr].pop();
      }
      if (Y === 0)
        break;
    }
    if (nr.sort((Jr, Ae) => +t(f(Jr), f(Ae))), ir > 100) {
      var re = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + nr.join(", "));
      throw re.values = nr, re.vectors = [], re;
    }
    var ve = q ? n(cr, z(Dr, U)) : void 0;
    return { values: nr, C: ve };
  }
  function b(T, U, W, V, q, G, $) {
    var H = s(W), er = n(H, T, W), nr = $ === "BigNumber", Y = $ === "Complex", Dr = nr ? u(0) : Y ? d(0) : 0, cr = nr ? u(1) : Y ? d(1) : 1, or = [], ir = [];
    for (var xr of q) {
      var Ar = R(or, xr, c);
      Ar === -1 ? (or.push(xr), ir.push(1)) : ir[Ar] += 1;
    }
    for (var Cr = [], fr = or.length, yr = Array(U).fill(Dr), br = o(Array(U).fill(cr)), Or = [], Pr = function() {
      var Ae = or[re], Me = t(er, n(Ae, br)), Ee = h(Me, yr);
      for (Ee.shift(); Ee.length < ir[re]; ) {
        var Bt = I(Me, U, Ee, G, $);
        if (Bt == null) {
          Or.push(Ae);
          break;
        }
        Ee.push(Bt);
      }
      var Sn = n(s(V), W);
      Ee = Ee.map((pt) => n(Sn, pt)), Cr.push(...Ee.map((pt) => a(pt)));
    }, re = 0; re < fr; re++)
      Pr();
    if (Or.length !== 0) {
      var ve = new Error("Failed to find eigenvectors for the following eigenvalues: " + Or.join(", "));
      throw ve.values = q, ve.vectors = Cr, ve;
    }
    return Cr;
  }
  function w(T, U, W, V) {
    var q = e(T, V), G = t(i(T, V), i(U, W)), $ = i(q, 0.5), H = i(v(t(i(q, q), i(4, G))), 0.5);
    return [e($, H), t($, H)];
  }
  function S(T, U, W, V, q, G, $, H) {
    var er = H === "BigNumber", nr = H === "Complex", Y = er ? u(0) : nr ? d(0) : 0, Dr = er ? u(1) : nr ? d(1) : 1;
    if (y(f(W), $))
      return [[Dr, Y], [Y, Dr]];
    if (g(f(t(q, G)), $))
      return [[t(q, V), t(G, V)], [W, W]];
    var cr = t(T, q), or = t(U, q), ir = t(W, q), xr = t(V, q);
    return y(f(or), $) ? [[cr, Dr], [ir, Y]] : [[or, Y], [xr, Dr]];
  }
  function M(T, U) {
    for (var W = 0; W < T.length; W++)
      T[W].push(...Array(U - T[W].length).fill(0));
    for (var V = T.length; V < U; V++)
      T.push(Array(U).fill(0)), T[V][V] = 1;
    return T;
  }
  function z(T, U) {
    for (var W = [], V = 0; V < U; V++)
      W[V] = Array(U).fill(0);
    var q = 0;
    for (var G of T) {
      for (var $ = G.length, H = 0; H < $; H++)
        for (var er = 0; er < $; er++)
          W[q + H][q + er] = G[H][er];
      q += $;
    }
    return W;
  }
  function R(T, U, W) {
    for (var V = 0; V < T.length; V++)
      if (W(T[V], U))
        return V;
    return -1;
  }
  function I(T, U, W, V, q) {
    for (var G = q === "BigNumber" ? u(1e3) : 1e3, $, H = 0; $ = B(U, W, q), $ = m(T, $), !g(Z($), G); )
      if (++H >= 5)
        return null;
    for (H = 0; ; ) {
      var er = m(T, $);
      if (y(Z(Q($, [er])), V))
        break;
      if (++H >= 10)
        return null;
      $ = _(er);
    }
    return $;
  }
  function B(T, U, W) {
    var V = W === "BigNumber", q = W === "Complex", G = Array(T).fill(0).map(($) => 2 * Math.random() - 1);
    return V && (G = G.map(($) => u($))), q && (G = G.map(($) => d($))), G = Q(G, U), _(G, W);
  }
  function Q(T, U) {
    for (var W of U)
      T = t(T, n(p(A(W, T), A(W, W)), W));
    return T;
  }
  function Z(T) {
    return f(v(A(T, T)));
  }
  function _(T, U) {
    var W = U === "BigNumber", V = U === "Complex", q = W ? u(1) : V ? d(1) : 1;
    return n(p(q, Z(T)), T);
  }
  return C;
}
function ps(r) {
  var { config: e, addScalar: t, subtract: a, abs: n, atan: i, cos: p, sin: v, multiplyScalar: f, inv: u, bignumber: o, multiply: s, add: l } = r;
  function m(w, S) {
    var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.epsilon, z = arguments.length > 3 ? arguments[3] : void 0;
    if (z === "number")
      return h(w, M);
    if (z === "BigNumber")
      return c(w, M);
    throw TypeError("Unsupported data type: " + z);
  }
  function h(w, S) {
    for (var M = w.length, z = Math.abs(S / M), R, I = new Array(M), B = 0; B < M; B++)
      I[B] = b(M, 0), I[B][B] = 1;
    for (var Q = D(w); Math.abs(Q[1]) >= Math.abs(z); ) {
      var Z = Q[0][0], _ = Q[0][1];
      R = d(w[Z][Z], w[_][_], w[Z][_]), w = C(w, R, Z, _), I = y(I, R, Z, _), Q = D(w);
    }
    for (var T = b(M, 0), U = 0; U < M; U++)
      T[U] = w[U][U];
    return F(pr(T), pr(I));
  }
  function c(w, S) {
    for (var M = w.length, z = n(S / M), R, I = new Array(M), B = 0; B < M; B++)
      I[B] = b(M, 0), I[B][B] = 1;
    for (var Q = E(w); n(Q[1]) >= n(z); ) {
      var Z = Q[0][0], _ = Q[0][1];
      R = g(w[Z][Z], w[_][_], w[Z][_]), w = A(w, R, Z, _), I = x(I, R, Z, _), Q = E(w);
    }
    for (var T = b(M, 0), U = 0; U < M; U++)
      T[U] = w[U][U];
    return F(pr(T), pr(I));
  }
  function d(w, S, M) {
    var z = S - w;
    return Math.abs(z) <= e.epsilon ? Math.PI / 4 : 0.5 * Math.atan(2 * M / (S - w));
  }
  function g(w, S, M) {
    var z = a(S, w);
    return n(z) <= e.epsilon ? o(-1).acos().div(4) : f(0.5, i(s(2, M, u(z))));
  }
  function y(w, S, M, z) {
    for (var R = w.length, I = Math.cos(S), B = Math.sin(S), Q = b(R, 0), Z = b(R, 0), _ = 0; _ < R; _++)
      Q[_] = I * w[_][M] - B * w[_][z], Z[_] = B * w[_][M] + I * w[_][z];
    for (var T = 0; T < R; T++)
      w[T][M] = Q[T], w[T][z] = Z[T];
    return w;
  }
  function x(w, S, M, z) {
    for (var R = w.length, I = p(S), B = v(S), Q = b(R, o(0)), Z = b(R, o(0)), _ = 0; _ < R; _++)
      Q[_] = a(f(I, w[_][M]), f(B, w[_][z])), Z[_] = t(f(B, w[_][M]), f(I, w[_][z]));
    for (var T = 0; T < R; T++)
      w[T][M] = Q[T], w[T][z] = Z[T];
    return w;
  }
  function A(w, S, M, z) {
    for (var R = w.length, I = o(p(S)), B = o(v(S)), Q = f(I, I), Z = f(B, B), _ = b(R, o(0)), T = b(R, o(0)), U = s(o(2), I, B, w[M][z]), W = t(a(f(Q, w[M][M]), U), f(Z, w[z][z])), V = l(f(Z, w[M][M]), U, f(Q, w[z][z])), q = 0; q < R; q++)
      _[q] = a(f(I, w[M][q]), f(B, w[z][q])), T[q] = t(f(B, w[M][q]), f(I, w[z][q]));
    w[M][M] = W, w[z][z] = V, w[M][z] = o(0), w[z][M] = o(0);
    for (var G = 0; G < R; G++)
      G !== M && G !== z && (w[M][G] = _[G], w[G][M] = _[G], w[z][G] = T[G], w[G][z] = T[G]);
    return w;
  }
  function C(w, S, M, z) {
    for (var R = w.length, I = Math.cos(S), B = Math.sin(S), Q = I * I, Z = B * B, _ = b(R, 0), T = b(R, 0), U = Q * w[M][M] - 2 * I * B * w[M][z] + Z * w[z][z], W = Z * w[M][M] + 2 * I * B * w[M][z] + Q * w[z][z], V = 0; V < R; V++)
      _[V] = I * w[M][V] - B * w[z][V], T[V] = B * w[M][V] + I * w[z][V];
    w[M][M] = U, w[z][z] = W, w[M][z] = 0, w[z][M] = 0;
    for (var q = 0; q < R; q++)
      q !== M && q !== z && (w[M][q] = _[q], w[q][M] = _[q], w[z][q] = T[q], w[q][z] = T[q]);
    return w;
  }
  function D(w) {
    for (var S = w.length, M = 0, z = [0, 1], R = 0; R < S; R++)
      for (var I = R + 1; I < S; I++)
        Math.abs(M) < Math.abs(w[R][I]) && (M = Math.abs(w[R][I]), z = [R, I]);
    return [z, M];
  }
  function E(w) {
    for (var S = w.length, M = 0, z = [0, 1], R = 0; R < S; R++)
      for (var I = R + 1; I < S; I++)
        n(M) < n(w[R][I]) && (M = n(w[R][I]), z = [R, I]);
    return [z, M];
  }
  function F(w, S) {
    for (var M = w.length, z = Array(M), R = Array(M), I = 0; I < M; I++)
      R[I] = Array(M);
    for (var B = 0; B < M; B++) {
      for (var Q = 0, Z = w[0], _ = 0; _ < w.length; _++)
        n(w[_]) < n(Z) && (Q = _, Z = w[Q]);
      z[B] = w.splice(Q, 1)[0];
      for (var T = 0; T < M; T++)
        R[T][B] = S[T][Q], S[T].splice(Q, 1);
    }
    return { values: z, vectors: R };
  }
  function b(w, S) {
    for (var M = new Array(w), z = 0; z < w; z++)
      M[z] = S;
    return M;
  }
  return m;
}
var up = "eigs";
var sp = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"];
var Ao = P(up, sp, (r) => {
  var { config: e, typed: t, matrix: a, addScalar: n, subtract: i, equal: p, abs: v, atan: f, cos: u, sin: o, multiplyScalar: s, divideScalar: l, inv: m, bignumber: h, multiply: c, add: d, larger: g, column: y, flatten: x, number: A, complex: C, sqrt: D, diag: E, qr: F, usolve: b, usolveAll: w, im: S, re: M, smaller: z, matrixFromColumns: R, dot: I } = r, B = ps({ config: e, addScalar: n, subtract: i, column: y, flatten: x, equal: p, abs: v, atan: f, cos: u, sin: o, multiplyScalar: s, inv: m, bignumber: h, complex: C, multiply: c, add: d }), Q = ls({ config: e, addScalar: n, subtract: i, multiply: c, multiplyScalar: s, flatten: x, divideScalar: l, sqrt: D, abs: v, bignumber: h, diag: E, qr: F, inv: m, usolve: b, usolveAll: w, equal: p, complex: C, larger: g, smaller: z, matrixFromColumns: R, dot: I });
  return t("eigs", { Array: function(q) {
    var G = a(q);
    return Z(G);
  }, "Array, number|BigNumber": function(q, G) {
    var $ = a(q);
    return Z($, G);
  }, Matrix: function(q) {
    var { values: G, vectors: $ } = Z(q);
    return { values: a(G), vectors: a($) };
  }, "Matrix, number|BigNumber": function(q, G) {
    var { values: $, vectors: H } = Z(q, G);
    return { values: a($), vectors: a(H) };
  } });
  function Z(V, q) {
    q === void 0 && (q = e.epsilon);
    var G = V.size();
    if (G.length !== 2 || G[0] !== G[1])
      throw new RangeError("Matrix must be square (size: " + Mr(G) + ")");
    var $ = V.toArray(), H = G[0];
    if (T($, H, q) && (U($, H), _($, H, q))) {
      var er = W(V, $, H);
      return B($, H, q, er);
    }
    var nr = W(V, $, H);
    return Q($, H, q, nr);
  }
  function _(V, q, G) {
    for (var $ = 0; $ < q; $++)
      for (var H = $; H < q; H++)
        if (g(h(v(i(V[$][H], V[H][$]))), G))
          return false;
    return true;
  }
  function T(V, q, G) {
    for (var $ = 0; $ < q; $++)
      for (var H = 0; H < q; H++)
        if (g(h(v(S(V[$][H]))), G))
          return false;
    return true;
  }
  function U(V, q) {
    for (var G = 0; G < q; G++)
      for (var $ = 0; $ < q; $++)
        V[G][$] = M(V[G][$]);
  }
  function W(V, q, G) {
    var $ = V.datatype();
    if ($ === "number" || $ === "BigNumber" || $ === "Complex")
      return $;
    for (var H = false, er = false, nr = false, Y = 0; Y < G; Y++)
      for (var Dr = 0; Dr < G; Dr++) {
        var cr = q[Y][Dr];
        if (Sr(cr) || gt(cr))
          H = true;
        else if (_r(cr))
          er = true;
        else if (dt(cr))
          nr = true;
        else
          throw TypeError("Unsupported type in Matrix: " + Yr(cr));
      }
    if (er && nr && console.warn("Complex BigNumbers not supported, this operation will lose precission."), nr) {
      for (var or = 0; or < G; or++)
        for (var ir = 0; ir < G; ir++)
          q[or][ir] = C(q[or][ir]);
      return "Complex";
    }
    if (er) {
      for (var xr = 0; xr < G; xr++)
        for (var Ar = 0; Ar < G; Ar++)
          q[xr][Ar] = h(q[xr][Ar]);
      return "BigNumber";
    }
    if (H) {
      for (var Cr = 0; Cr < G; Cr++)
        for (var fr = 0; fr < G; fr++)
          q[Cr][fr] = A(q[Cr][fr]);
      return "number";
    } else
      throw TypeError("Matrix contains unsupported types only.");
  }
});
var st = Wn({ config: Wr });
var dn = kn({});
var gn = ra({});
var Eo = ea({});
var Ur = ta({ Matrix: Eo });
var ur = Vn({ BigNumber: st, Complex: dn, DenseMatrix: Ur, Fraction: gn });
var Ct = ya({ typed: ur });
var Te = wa({ typed: ur });
var fp = oo({ typed: ur });
var Co = ma({ BigNumber: st, typed: ur });
var Fo = ha({ Complex: dn, typed: ur });
var Dn = Ma({ typed: ur });
var ge = la({ config: Wr, typed: ur });
var cp = Sa({ typed: ur });
var lp = na({ typed: ur });
var vs = ca({ typed: ur });
var Ie = Aa({ typed: ur });
var bo = va({ typed: ur });
var pp = Na({ typed: ur });
var vp = Ca({ BigNumber: st, Fraction: gn, complex: Fo, typed: ur });
var mp = uo({ typed: ur });
var ft = pa({ Matrix: Eo, equalScalar: ge, typed: ur });
var hp = io({ typed: ur });
var Mo = Fa({ Complex: dn, config: Wr, typed: ur });
var Ft = xa({ typed: ur });
var ms = da({ Fraction: gn, typed: ur });
var gr = ga({ DenseMatrix: Ur, Matrix: Eo, SparseMatrix: ft, typed: ur });
var dp = Va({ bignumber: Co, fraction: ms, number: bo });
var So = Ra({ matrix: gr, config: Wr, typed: ur });
var ae = qa({ matrix: gr, typed: ur });
var xn = Ua({ matrix: gr, typed: ur });
var bt = Za({ BigNumber: st, config: Wr, matrix: gr, typed: ur });
var Ge = Ba({ isInteger: lp, matrix: gr, typed: ur });
var gp = La({ conj: Dn, transpose: xn, typed: ur });
var No = Ta({ DenseMatrix: Ur, SparseMatrix: ft, matrix: gr, typed: ur });
var ze = Qa({ numeric: dp, typed: ur });
var hs = Wa({ DenseMatrix: Ur, concat: Ge, equalScalar: ge, matrix: gr, typed: ur });
var yn = Ia({ matrix: gr, typed: ur });
var ke = za({ BigNumber: st, DenseMatrix: Ur, SparseMatrix: ft, config: Wr, matrix: gr, typed: ur });
var wn = Oa({ matrix: gr, multiplyScalar: Ie, typed: ur });
var ds = ro({ DenseMatrix: Ur, concat: Ge, config: Wr, matrix: gr, typed: ur });
var Dp = Da({ flatten: yn, matrix: gr, size: So, typed: ur });
var Mt = Ha({ DenseMatrix: Ur, concat: Ge, config: Wr, matrix: gr, typed: ur });
var je = fo({ DenseMatrix: Ur, SparseMatrix: ft, addScalar: Te, concat: Ge, equalScalar: ge, matrix: gr, typed: ur });
var xp = Xa({ BigNumber: st, DenseMatrix: Ur, Fraction: gn, concat: Ge, config: Wr, equalScalar: ge, matrix: gr, typed: ur });
var Oe = lo({ addScalar: Te, conj: Dn, multiplyScalar: Ie, size: So, typed: ur });
var yp = eo({ DenseMatrix: Ur, smaller: Mt });
var Bo = to({ ImmutableDenseMatrix: yp });
var ct = ja({ DenseMatrix: Ur, concat: Ge, config: Wr, matrix: gr, typed: ur });
var oe = Ea({ addScalar: Te, dot: Oe, equalScalar: ge, matrix: gr, multiplyScalar: Ie, typed: ur });
var wp = ka({ DenseMatrix: Ur, concat: Ge, config: Wr, matrix: gr, typed: ur });
var Lr = ba({ DenseMatrix: Ur, addScalar: Te, concat: Ge, equalScalar: ge, matrix: gr, typed: ur, unaryMinus: Ft });
var gs = $a({ DenseMatrix: Ur, divideScalar: ze, equalScalar: ge, matrix: gr, multiplyScalar: Ie, subtract: Lr, typed: ur });
var Ap = Ka({ compare: xp, typed: ur });
var Ep = yo({ divideScalar: ze, isZero: vs, matrix: gr, multiply: oe, subtract: Lr, typed: ur, unaryMinus: Ft });
var Cp = no({ larger: ct, smaller: Mt });
var De = po({ Index: Bo, typed: ur });
var Fp = Ya({ DenseMatrix: Ur, divideScalar: ze, equalScalar: ge, matrix: gr, multiplyScalar: Ie, subtract: Lr, typed: ur });
var bp = mo({ addScalar: Te, complex: Fo, conj: Dn, divideScalar: ze, equal: hs, identity: ke, isZero: vs, matrix: gr, multiplyScalar: Ie, sign: vp, sqrt: Mo, subtract: Lr, typed: ur, unaryMinus: Ft, zeros: bt });
var An = Pa({ bignumber: Co, matrix: gr, config: Wr, larger: ct, largerEq: ds, smaller: Mt, smallerEq: wp, typed: ur });
var Mp = go({ SparseMatrix: ft, abs: Ct, add: je, divideScalar: ze, larger: ct, largerEq: ds, multiply: oe, subtract: Lr, transpose: xn, typed: ur });
var Sp = ao({ FibonacciHeap: Cp, addScalar: Te, equalScalar: ge });
var Np = Ja({ DenseMatrix: Ur, divideScalar: ze, equalScalar: ge, matrix: gr, multiplyScalar: Ie, subtract: Lr, typed: ur });
var Bp = _a({ Index: Bo, matrix: gr, range: An, typed: ur });
var _o = so({ DenseMatrix: Ur, Index: Bo, compareNatural: Ap, size: So, subset: ae, typed: ur });
var Ds = wo({ abs: Ct, addScalar: Te, det: Ep, divideScalar: ze, identity: ke, matrix: gr, multiply: oe, typed: ur, unaryMinus: Ft });
var _p = vo({ DenseMatrix: Ur, Spa: Sp, SparseMatrix: ft, abs: Ct, addScalar: Te, divideScalar: ze, equalScalar: ge, larger: ct, matrix: gr, multiplyScalar: Ie, subtract: Lr, typed: ur, unaryMinus: Ft });
var Tp = Ga({ Complex: dn, config: Wr, fraction: ms, identity: ke, inv: Ds, matrix: gr, multiply: oe, number: bo, typed: ur });
var xs = xo({ DenseMatrix: Ur, lsolve: Fp, lup: _p, matrix: gr, slu: Mp, typed: ur, usolve: gs });
var Ip = Ao({ abs: Ct, add: je, addScalar: Te, atan: fp, bignumber: Co, column: Bp, complex: Fo, config: Wr, cos: hp, diag: No, divideScalar: ze, dot: Oe, equal: hs, flatten: yn, im: cp, inv: Ds, larger: ct, matrix: gr, matrixFromColumns: Dp, multiply: oe, multiplyScalar: Ie, number: bo, qr: bp, re: pp, sin: mp, smaller: Mt, sqrt: Mo, subtract: Lr, typed: ur, usolve: gs, usolveAll: Np });
var Pe = co({ abs: Ct, add: je, conj: Dn, ctranspose: gp, eigs: Ip, equalScalar: ge, larger: ct, matrix: gr, multiply: oe, pow: Tp, smaller: Mt, sqrt: Mo, typed: ur });
function ys(r) {
  let e = { analysisType: 1, elasticities: /* @__PURE__ */ new Map(), areas: /* @__PURE__ */ new Map(), loads: /* @__PURE__ */ new Map(), supports: /* @__PURE__ */ new Map(), momentOfInertiaZs: /* @__PURE__ */ new Map(), momentOfInertiaYs: /* @__PURE__ */ new Map(), shearModuluses: /* @__PURE__ */ new Map(), torsionalConstants: /* @__PURE__ */ new Map(), distributedLoads: /* @__PURE__ */ new Map() };
  return r.forEach((t) => {
    var a;
    "area" in t && e.areas.set(t.element, t.area), "elasticity" in t && e.elasticities.set(t.element, t.elasticity), "load" in t && e.loads.set(t.node, t.load), "support" in t && e.supports.set(t.node, t.support), ((a = e.supports.values().next().value) == null ? void 0 : a.length) === 3 && (e.analysisType = 0), e.analysisType === 1 && ("momentOfInertiaZ" in t && e.momentOfInertiaZs.set(t.element, t.momentOfInertiaZ), "momentOfInertiaY" in t && e.momentOfInertiaYs.set(t.element, t.momentOfInertiaY), "torsionalConstant" in t && e.torsionalConstants.set(t.element, t.torsionalConstant), "shearModulus" in t && e.shearModuluses.set(t.element, t.shearModulus), "distributedLoad" in t && e.distributedLoads.set(t.element, t.distributedLoad));
  }), e;
}
function zp(r) {
  let e = [r[0] * 3, r[0] * 3 + 1, r[0] * 3 + 2], t = [r[1] * 3, r[1] * 3 + 1, r[1] * 3 + 2];
  return [...e, ...t];
}
function Op(r) {
  let e = [r[0] * 6, r[0] * 6 + 1, r[0] * 6 + 2, r[0] * 6 + 3, r[0] * 6 + 4, r[0] * 6 + 5], t = [r[1] * 6, r[1] * 6 + 1, r[1] * 6 + 2, r[1] * 6 + 3, r[1] * 6 + 4, r[1] * 6 + 5];
  return [...e, ...t];
}
var lt = { 0: zp, 1: Op };
var St = (r, e, t) => [0, r * t / 2, e * t / 2, 0, -e * Tr(t, 2) / 12, r * Tr(t, 2) / 12, 0, r * t / 2, e * t / 2, 0, e * Tr(t, 2) / 12, -r * Tr(t, 2) / 12];
function Pp(r, e) {
  let t = [];
  return r.forEach((a, n) => {
    a[0] && t.push(n * 3), a[1] && t.push(n * 3 + 1), a[2] && t.push(n * 3 + 2);
  }), _o(An(0, e), t);
}
function Rp(r, e) {
  let t = [];
  return r.forEach((a, n) => {
    a[0] && t.push(n * 6), a[1] && t.push(n * 6 + 1), a[2] && t.push(n * 6 + 2), a[3] && t.push(n * 6 + 3), a[4] && t.push(n * 6 + 4), a[5] && t.push(n * 6 + 5);
  }), _o(An(0, e), t);
}
var ws = { 0: Pp, 1: Rp };
function qp(r, e, t, a) {
  let n = r.areas.get(e) || 0, i = r.elasticities.get(e) || 0, p = a[0] / a[4], v = gr([[p, -1], [-1, p]]);
  return oe(v, i * n / t);
}
function Up(r, e, t, a) {
  let n = r.momentOfInertiaZs.get(e) || 0, i = r.momentOfInertiaYs.get(e) || 0, p = r.elasticities.get(e) || 0, v = r.areas.get(e) || 0, f = r.shearModuluses.get(e) || 0, u = r.torsionalConstants.get(e) || 0, o = p * v / t, s = p * n / Tr(t, 3), l = p * i / Tr(t, 3), m = f * u / t, h = a[0], c = a[1];
  return gr([[o, 0, 0, 0, 0, 0, -o, 0, 0, 0, 0, 0], [0, 12 * s, 0, 0, 0, h * t * s, 0, -12 * s, 0, 0, 0, h * t * s], [0, 0, 12 * l, 0, -h * t * l, 0, 0, 0, -12 * l, 0, -h * t * l, 0], [0, 0, 0, m, 0, 0, 0, 0, 0, -m, 0, 0], [0, 0, -h * t * l, 0, 4 * l * Tr(t, c), 0, 0, 0, h * t * l, 0, c * l * Tr(t, c), 0], [0, h * t * s, 0, 0, 0, 4 * s * Tr(t, c), 0, -h * t * s, 0, 0, 0, c * s * Tr(t, c)], [-o, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0], [0, -12 * s, 0, 0, 0, -h * s * t, 0, 12 * s, 0, 0, 0, -h * s * t], [0, 0, -12 * l, 0, h * t * l, 0, 0, 0, 12 * l, 0, h * t * l, 0], [0, 0, 0, -m, 0, 0, 0, 0, 0, m, 0, 0], [0, 0, -h * t * l, 0, c * l * Tr(t, c), 0, 0, 0, h * t * l, 0, 4 * l * Tr(t, c), 0], [0, h * t * s, 0, 0, 0, c * s * Tr(t, c), 0, -h * t * s, 0, 0, 0, 4 * s * Tr(t, c)]]);
}
var Fn = { 0: qp, 1: Up };
function Lp(r, e, t) {
  let a = Lr(e, r), n = Pe(a), i = Oe(a, gr([1, 0, 0])) / n, p = Oe(a, gr([0, 1, 0])) / n, v = Oe(a, gr([0, 0, 1])) / n, f = t[0] / t[4];
  return gr([[i * f, p, v * f, 0, 0, 0], [0, 0, 0, i, p * f, v]]);
}
function Zp(r, e, t) {
  let a = Lr(e, r), n = Pe(a), i = Oe(a, gr([1, 0, 0])) / n, p = Oe(a, gr([0, 1, 0])) / n, v = Oe(a, gr([0, 0, 1])) / n, f = Math.sqrt(Tr(i, 2) + Tr(p, 2)), u = t[0] / t[4], o = gr([[i * u, p, v], [-p / f, i / f * u, 0], [-i * u * v / f, -p * v / f, f]]);
  return v === 1 && (o = gr([[0, 0, 1], [0, 1, 0], [-1, 0, 0]])), v === -1 && (o = gr([[0, 0, -1], [0, 1, 0], [1, 0, 0]])), wn(ke(4), o);
}
var bn = { 0: Lp, 1: Zp };
function As(r, e, t, a) {
  let n = r.length * (t.analysisType === 0 ? 3 : 6), i = bt(n, n);
  e.forEach((m, h) => {
    let c = r[m[0]], d = r[m[1]], g = Pe(Lr(d, c)), y = Fn[t.analysisType](t, h, g, a), x = bn[t.analysisType](c, d, a), A = oe(xn(x), oe(y, x)), C = lt[t.analysisType](m), D = ae(i, De(C, C));
    i = ae(i, De(C, C), je(D, A));
  });
  let p = bt([n]);
  t.loads.forEach((m, h) => {
    let c = { 0: [h * 3, h * 3 + 1, h * 3 + 2], 1: [h * 6, h * 6 + 1, h * 6 + 2, h * 6 + 3, h * 6 + 4, h * 6 + 5] }, d = ae(p, De(c[t.analysisType]));
    p = ae(p, De(c[t.analysisType]), je(d, m));
  }), t.distributedLoads.forEach(([m, h], c) => {
    let d = e[c], g = r[d[0]], y = r[d[1]], x = Pe(Lr(y, g)), A = De(lt[t.analysisType](d)), C = ae(p, A), D = St(m, h, x);
    p = ae(p, A, je(C, D));
  });
  let v = ws[t.analysisType](t.supports, n), f = ae(p, De(v)), u = ae(i, De(v, v)), o = xs(u, f), s = ae(bt(n), De(v), yn(o)), l = oe(i, s);
  return t.distributedLoads.forEach(([m, h], c) => {
    let d = e[c], g = r[d[0]], y = r[d[1]], x = Pe(Lr(y, g)), A = De(lt[t.analysisType](d)), C = ae(l, A), D = St(m, h, x);
    l = ae(l, A, Lr(C, D));
  }), { deformations: s.toArray(), forces: l.toArray() };
}
var rt = class extends Error {
};
rt.prototype.name = "InvalidTokenError";
function Vp(r) {
  return decodeURIComponent(atob(r).replace(/(.)/g, (e, t) => {
    let a = t.charCodeAt(0).toString(16).toUpperCase();
    return a.length < 2 && (a = "0" + a), "%" + a;
  }));
}
function Qp(r) {
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
    return Vp(e);
  } catch (t) {
    return atob(e);
  }
}
function Es(r, e) {
  if (typeof r != "string")
    throw new rt("Invalid token specified: must be a string");
  e || (e = {});
  let t = e.header === true ? 0 : 1, a = r.split(".")[t];
  if (typeof a != "string")
    throw new rt(`Invalid token specified: missing part #${t + 1}`);
  let n;
  try {
    n = Qp(a);
  } catch (i) {
    throw new rt(`Invalid token specified: invalid base64 for part #${t + 1} (${i.message})`);
  }
  try {
    return JSON.parse(n);
  } catch (i) {
    throw new rt(`Invalid token specified: invalid json for part #${t + 1} (${i.message})`);
  }
}
(function(r, e) {
  let t = Nt, a = r();
  for (; []; )
    try {
      if (-parseInt(t(292)) / 1 + parseInt(t(293)) / 2 * (parseInt(t(305)) / 3) + -parseInt(t(296)) / 4 + parseInt(t(301)) / 5 * (-parseInt(t(294)) / 6) + -parseInt(t(291)) / 7 * (parseInt(t(311)) / 8) + -parseInt(t(298)) / 9 * (parseInt(t(315)) / 10) + parseInt(t(299)) / 11 === e)
        break;
      a.push(a.shift());
    } catch (n) {
      a.push(a.shift());
    }
})(Mn, 925748);
function Mn() {
  let r = ["The license has expired. Please ensure you use this library with a valid license to obtain correct results. To make a purchase, contact mohamed@awatif.co", "6631208ivzNOE", "floor", "23994jhWaCN", "59998818xZomkD", "code1", "10RMDSXO", "code3", "toArray", "try {return this===window;}catch(e){ return false;}", "1231647YHWkVv", "code4", "You have reach the limit of 20 elements. Please ensure you use this library with a purchased license to obtain correct results. To make a purchase, contact mohamed@awatif.co", "22ur=_p(0JCN", "e>8Tz9%3r2O>", "code2", "1849360pYSnrW", "length", "undefined", "slice", "4740pzqUcj", "49yWdOxm", "398583EDoBPM", "6LpDUsD", "2466234rKHqla"];
  return Mn = function() {
    return r;
  }, Mn();
}
function Cs(r) {
  let e = Nt, t = new Function(e(304)), a = "", n = "undefined"[e(312)];
  if (typeof self !== e(313) && (a = (self == null ? void 0 : self.$k) || ""), typeof global !== e(313) && (a = global.$k || ""), r > n * 2.5 && !a) {
    let v = e(307);
    throw t() && alert(v), Error(v);
  }
  let i = a ? Es(a) : { code1: "58AbJ6(F'Atl", code2: e(308), code3: e(309), code4: "0x6782%50e3@", iat: 1, exp: 2 };
  if (parseInt(i[e(306)][e(314)](0, 6) + i[e(306)][e(314)](7, 11)) - Math[e(297)]((/* @__PURE__ */ new Date()).getTime() / 1e3) < n - 9) {
    let v = e(295);
    throw t() && alert(v), Error(v);
  }
  return Gp(i);
}
function Nt(r, e) {
  let t = Mn();
  return Nt = function(a, n) {
    return a = a - 291, t[a];
  }, Nt(r, e);
}
function Gp(r) {
  let e = Nt, t = [[Number(r[e(300)][5]), Number(r[e(310)][0])], [Number(r[e(302)][5]), Number(r[e(302)][9])]], a = wn(ke(3), t);
  return No(a)[e(303)]();
}
function c2(r, e, t) {
  let a = Cs(e.length), n = ys(t), { deformations: i, forces: p } = As(r, e, n, a), v = [];
  return r.forEach((f, u) => {
    let o = { 0: [i[u * 3], i[u * 3 + 1], i[u * 3 + 2]], 1: [i[u * 6], i[u * 6 + 1], i[u * 6 + 2], i[u * 6 + 3], i[u * 6 + 4], i[u * 6 + 5]] };
    v.push({ node: u, deformation: o[n.analysisType] });
    let s = { 0: [p[u * 3], p[u * 3 + 1], p[u * 3 + 2]], 1: [p[u * 6], p[u * 6 + 1], p[u * 6 + 2], p[u * 6 + 3], p[u * 6 + 4], p[u * 6 + 5]] };
    n.supports.get(u) && v.push({ node: u, reaction: s[n.analysisType] });
  }), e.forEach((f, u) => {
    let o = r[f[0]], s = r[f[1]], l = Pe(Lr(s, o)), m = ae(i, De(lt[n.analysisType](f))), h = bn[n.analysisType](o, s, a), c = oe(h, m), d = Fn[n.analysisType](n, u, l, a), g = oe(d, c).toArray();
    if (n.distributedLoads.get(u)) {
      let [x, A] = n.distributedLoads.get(u) || [0, 0], C = St(x, A, l);
      g = Lr(g, C);
    }
    let y = { 0: { element: u, normal: [-g[0], -g[0]] }, 1: { element: u, normal: [g[0], g[6]], shearY: [g[1], g[7]], shearZ: [g[2], g[8]], torsion: [g[3], g[9]], bendingY: [g[4], g[10]], bendingZ: [g[5], g[11]] } };
    v.push(y[n.analysisType]);
  }), { default: v };
}
export {
  c2 as analyze
};
/*! Bundled license information:

awatif-fem/dist/A6KC6G5S.js:
  (*! Bundled license information:
  
  complex.js/complex.js:
    (**
     * @license Complex.js v2.1.1 12/05/2020
     *
     * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
     * Dual licensed under the MIT or GPL Version 2 licenses.
     **)
  
  fraction.js/fraction.js:
    (**
     * @license Fraction.js v4.2.0 05/03/2022
     * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
     *
     * Copyright (c) 2021, Robert Eisele (robert@xarg.org)
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
  *)
*/
//# sourceMappingURL=awatif-fem.js.map
