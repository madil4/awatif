function st() {
  return st = Object.assign ? Object.assign.bind() : function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (r[a] = n[a]);
    }
    return r;
  }, st.apply(this, arguments);
}
var Aa = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  epsilon: 1e-12,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: "Matrix",
  // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
  number: "number",
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: !1,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};
function xr(r) {
  return typeof r == "number";
}
function zr(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? !1 : r.isBigNumber === !0 && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === !0 || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === !0;
}
function Kt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === !0 || !1;
}
function Wt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === !0 || !1;
}
function Ea(r) {
  return r && r.constructor.prototype.isUnit === !0 || !1;
}
function ae(r) {
  return typeof r == "string";
}
var Cr = Array.isArray;
function Sr(r) {
  return r && r.constructor.prototype.isMatrix === !0 || !1;
}
function ft(r) {
  return Array.isArray(r) || Sr(r);
}
function ct(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === !0 || !1;
}
function Ie(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === !0 || !1;
}
function Fa(r) {
  return r && r.constructor.prototype.isRange === !0 || !1;
}
function Ct(r) {
  return r && r.constructor.prototype.isIndex === !0 || !1;
}
function Gi(r) {
  return typeof r == "boolean";
}
function Ki(r) {
  return r && r.constructor.prototype.isResultSet === !0 || !1;
}
function Wi(r) {
  return r && r.constructor.prototype.isHelp === !0 || !1;
}
function Hi(r) {
  return typeof r == "function";
}
function ki(r) {
  return r instanceof Date;
}
function ji(r) {
  return r instanceof RegExp;
}
function ru(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !Kt(r) && !Wt(r));
}
function eu(r) {
  return r === null;
}
function tu(r) {
  return r === void 0;
}
function nu(r) {
  return r && r.isAccessorNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function au(r) {
  return r && r.isArrayNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function iu(r) {
  return r && r.isAssignmentNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function uu(r) {
  return r && r.isBlockNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function ou(r) {
  return r && r.isConditionalNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function su(r) {
  return r && r.isConstantNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function fu(r) {
  return r && r.isFunctionAssignmentNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function cu(r) {
  return r && r.isFunctionNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function lu(r) {
  return r && r.isIndexNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function vu(r) {
  return r && r.isNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function hu(r) {
  return r && r.isObjectNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function pu(r) {
  return r && r.isOperatorNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function du(r) {
  return r && r.isParenthesisNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function mu(r) {
  return r && r.isRangeNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function Du(r) {
  return r && r.isRelationalNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function gu(r) {
  return r && r.isSymbolNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function yu(r) {
  return r && r.constructor.prototype.isChain === !0 || !1;
}
function se(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : zr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function wr(r) {
  var e = typeof r;
  if (e === "number" || e === "string" || e === "boolean" || r === null || r === void 0)
    return r;
  if (typeof r.clone == "function")
    return r.clone();
  if (Array.isArray(r))
    return r.map(function(n) {
      return wr(n);
    });
  if (r instanceof Date)
    return new Date(r.valueOf());
  if (zr(r))
    return r;
  if (r instanceof RegExp)
    throw new TypeError("Cannot clone " + r);
  return wu(r, wr);
}
function wu(r, e) {
  var n = {};
  for (var a in r)
    He(r, a) && (n[a] = e(r[a]));
  return n;
}
function Au(r, e) {
  for (var n in e)
    He(e, n) && (r[n] = e[n]);
  return r;
}
function lt(r, e) {
  var n, a, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length)
      return !1;
    for (a = 0, t = r.length; a < t; a++)
      if (!lt(r[a], e[a]))
        return !1;
    return !0;
  } else {
    if (typeof r == "function")
      return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object))
        return !1;
      for (n in r)
        if (!(n in e) || !lt(r[n], e[n]))
          return !1;
      for (n in e)
        if (!(n in r))
          return !1;
      return !0;
    } else
      return r === e;
  }
}
function He(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function Eu(r, e) {
  for (var n = {}, a = 0; a < e.length; a++) {
    var t = e[a], u = r[t];
    u !== void 0 && (n[t] = u);
  }
  return n;
}
var Fu = ["Matrix", "Array"], Cu = ["number", "BigNumber", "Fraction"], Gr = function(e) {
  if (e)
    throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(Aa);
};
st(Gr, Aa, {
  MATRIX_OPTIONS: Fu,
  NUMBER_OPTIONS: Cu
});
function ne(r, e) {
  var n = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!n) {
    if (Array.isArray(r) || (n = bu(r)) || e && r && typeof r.length == "number") {
      n && (r = n);
      var a = 0, t = function() {
      };
      return { s: t, n: function() {
        return a >= r.length ? { done: !0 } : { done: !1, value: r[a++] };
      }, e: function(l) {
        throw l;
      }, f: t };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var u = !0, c = !1, p;
  return { s: function() {
    n = n.call(r);
  }, n: function() {
    var l = n.next();
    return u = l.done, l;
  }, e: function(l) {
    c = !0, p = l;
  }, f: function() {
    try {
      !u && n.return != null && n.return();
    } finally {
      if (c)
        throw p;
    }
  } };
}
function bu(r, e) {
  if (r) {
    if (typeof r == "string")
      return Dn(r, e);
    var n = Object.prototype.toString.call(r).slice(8, -1);
    if (n === "Object" && r.constructor && (n = r.constructor.name), n === "Map" || n === "Set")
      return Array.from(r);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Dn(r, e);
  }
}
function Dn(r, e) {
  (e == null || e > r.length) && (e = r.length);
  for (var n = 0, a = new Array(e); n < e; n++)
    a[n] = r[n];
  return a;
}
function Oe(r) {
  "@babel/helpers - typeof";
  return Oe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Oe(r);
}
function gn() {
  return !0;
}
function ee() {
  return !1;
}
function _e() {
}
var yn = "Argument is not a typed-function.";
function Ca() {
  function r(N) {
    return Oe(N) === "object" && N !== null && N.constructor === Object;
  }
  var e = [{
    name: "number",
    test: function(_) {
      return typeof _ == "number";
    }
  }, {
    name: "string",
    test: function(_) {
      return typeof _ == "string";
    }
  }, {
    name: "boolean",
    test: function(_) {
      return typeof _ == "boolean";
    }
  }, {
    name: "Function",
    test: function(_) {
      return typeof _ == "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function(_) {
      return _ instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function(_) {
      return _ instanceof RegExp;
    }
  }, {
    name: "Object",
    test: r
  }, {
    name: "null",
    test: function(_) {
      return _ === null;
    }
  }, {
    name: "undefined",
    test: function(_) {
      return _ === void 0;
    }
  }], n = {
    name: "any",
    test: gn,
    isAny: !0
  }, a, t, u = 0, c = {
    createCount: 0
  };
  function p(N) {
    var _ = a.get(N);
    if (_)
      return _;
    var P = 'Unknown type "' + N + '"', V = N.toLowerCase(), W, H = ne(t), tr;
    try {
      for (H.s(); !(tr = H.n()).done; )
        if (W = tr.value, W.toLowerCase() === V) {
          P += '. Did you mean "' + W + '" ?';
          break;
        }
    } catch (X) {
      H.e(X);
    } finally {
      H.f();
    }
    throw new TypeError(P);
  }
  function v(N) {
    for (var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any", P = _ ? p(_).index : t.length, V = [], W = 0; W < N.length; ++W) {
      if (!N[W] || typeof N[W].name != "string" || typeof N[W].test != "function")
        throw new TypeError("Object with properties {name: string, test: function} expected");
      var H = N[W].name;
      if (a.has(H))
        throw new TypeError('Duplicate type name "' + H + '"');
      V.push(H), a.set(H, {
        name: H,
        test: N[W].test,
        isAny: N[W].isAny,
        index: P + W,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    var tr = t.slice(P);
    t = t.slice(0, P).concat(V).concat(tr);
    for (var X = P + V.length; X < t.length; ++X)
      a.get(t[X]).index = X;
  }
  function l() {
    a = /* @__PURE__ */ new Map(), t = [], u = 0, v([n], !1);
  }
  l(), v(e);
  function o() {
    var N, _ = ne(t), P;
    try {
      for (_.s(); !(P = _.n()).done; )
        N = P.value, a.get(N).conversionsTo = [];
    } catch (V) {
      _.e(V);
    } finally {
      _.f();
    }
    u = 0;
  }
  function i(N) {
    var _ = t.filter(function(P) {
      var V = a.get(P);
      return !V.isAny && V.test(N);
    });
    return _.length ? _ : ["any"];
  }
  function f(N) {
    return N && typeof N == "function" && "_typedFunctionData" in N;
  }
  function h(N, _, P) {
    if (!f(N))
      throw new TypeError(yn);
    var V = P && P.exact, W = Array.isArray(_) ? _.join(",") : _, H = A(W), tr = m(H);
    if (!V || tr in N.signatures) {
      var X = N._typedFunctionData.signatureMap.get(tr);
      if (X)
        return X;
    }
    var rr = H.length, lr;
    if (V) {
      lr = [];
      var yr;
      for (yr in N.signatures)
        lr.push(N._typedFunctionData.signatureMap.get(yr));
    } else
      lr = N._typedFunctionData.signatures;
    for (var ar = 0; ar < rr; ++ar) {
      var Jr = H[ar], Pr = [], Vr = void 0, Ir = ne(lr), Kr;
      try {
        for (Ir.s(); !(Kr = Ir.n()).done; ) {
          Vr = Kr.value;
          var qr = E(Vr.params, ar);
          if (!(!qr || Jr.restParam && !qr.restParam)) {
            if (!qr.hasAny) {
              var re = function() {
                var Wr = y(qr);
                if (Jr.types.some(function(Me) {
                  return !Wr.has(Me.name);
                }))
                  return "continue";
              }();
              if (re === "continue")
                continue;
            }
            Pr.push(Vr);
          }
        }
      } catch (Wr) {
        Ir.e(Wr);
      } finally {
        Ir.f();
      }
      if (lr = Pr, lr.length === 0)
        break;
    }
    var Qr, Xr = ne(lr), be;
    try {
      for (Xr.s(); !(be = Xr.n()).done; )
        if (Qr = be.value, Qr.params.length <= rr)
          return Qr;
    } catch (Wr) {
      Xr.e(Wr);
    } finally {
      Xr.f();
    }
    throw new TypeError("Signature not found (signature: " + (N.name || "unnamed") + "(" + m(H, ", ") + "))");
  }
  function d(N, _, P) {
    return h(N, _, P).implementation;
  }
  function s(N, _) {
    var P = p(_);
    if (P.test(N))
      return N;
    var V = P.conversionsTo;
    if (V.length === 0)
      throw new Error("There are no conversions to " + _ + " defined.");
    for (var W = 0; W < V.length; W++) {
      var H = p(V[W].from);
      if (H.test(N))
        return V[W].convert(N);
    }
    throw new Error("Cannot convert " + N + " to " + _);
  }
  function m(N) {
    var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return N.map(function(P) {
      return P.name;
    }).join(_);
  }
  function D(N) {
    var _ = N.indexOf("...") === 0, P = _ ? N.length > 3 ? N.slice(3) : "any" : N, V = P.split("|").map(function(X) {
      return p(X.trim());
    }), W = !1, H = _ ? "..." : "", tr = V.map(function(X) {
      return W = X.isAny || W, H += X.name + "|", {
        name: X.name,
        typeIndex: X.index,
        test: X.test,
        isAny: X.isAny,
        conversion: null,
        conversionIndex: -1
      };
    });
    return {
      types: tr,
      name: H.slice(0, -1),
      // remove trailing '|' from above
      hasAny: W,
      hasConversion: !1,
      restParam: _
    };
  }
  function w(N) {
    var _ = N.types.map(function(tr) {
      return tr.name;
    }), P = Z(_), V = N.hasAny, W = N.name, H = P.map(function(tr) {
      var X = p(tr.from);
      return V = X.isAny || V, W += "|" + tr.from, {
        name: tr.from,
        typeIndex: X.index,
        test: X.test,
        isAny: X.isAny,
        conversion: tr,
        conversionIndex: tr.index
      };
    });
    return {
      types: N.types.concat(H),
      name: W,
      hasAny: V,
      hasConversion: H.length > 0,
      restParam: N.restParam
    };
  }
  function y(N) {
    return N.typeSet || (N.typeSet = /* @__PURE__ */ new Set(), N.types.forEach(function(_) {
      return N.typeSet.add(_.name);
    })), N.typeSet;
  }
  function A(N) {
    var _ = [];
    if (typeof N != "string")
      throw new TypeError("Signatures must be strings");
    var P = N.trim();
    if (P === "")
      return _;
    for (var V = P.split(","), W = 0; W < V.length; ++W) {
      var H = D(V[W].trim());
      if (H.restParam && W !== V.length - 1)
        throw new SyntaxError('Unexpected rest parameter "' + V[W] + '": only allowed for the last parameter');
      if (H.types.length === 0)
        return null;
      _.push(H);
    }
    return _;
  }
  function C(N) {
    var _ = nr(N);
    return _ ? _.restParam : !1;
  }
  function g(N) {
    if (!N || N.types.length === 0)
      return gn;
    if (N.types.length === 1)
      return p(N.types[0].name).test;
    if (N.types.length === 2) {
      var _ = p(N.types[0].name).test, P = p(N.types[1].name).test;
      return function(H) {
        return _(H) || P(H);
      };
    } else {
      var V = N.types.map(function(W) {
        return p(W.name).test;
      });
      return function(H) {
        for (var tr = 0; tr < V.length; tr++)
          if (V[tr](H))
            return !0;
        return !1;
      };
    }
  }
  function M(N) {
    var _, P, V;
    if (C(N)) {
      _ = er(N).map(g);
      var W = _.length, H = g(nr(N)), tr = function(rr) {
        for (var lr = W; lr < rr.length; lr++)
          if (!H(rr[lr]))
            return !1;
        return !0;
      };
      return function(rr) {
        for (var lr = 0; lr < _.length; lr++)
          if (!_[lr](rr[lr]))
            return !1;
        return tr(rr) && rr.length >= W + 1;
      };
    } else
      return N.length === 0 ? function(rr) {
        return rr.length === 0;
      } : N.length === 1 ? (P = g(N[0]), function(rr) {
        return P(rr[0]) && rr.length === 1;
      }) : N.length === 2 ? (P = g(N[0]), V = g(N[1]), function(rr) {
        return P(rr[0]) && V(rr[1]) && rr.length === 2;
      }) : (_ = N.map(g), function(rr) {
        for (var lr = 0; lr < _.length; lr++)
          if (!_[lr](rr[lr]))
            return !1;
        return rr.length === _.length;
      });
  }
  function E(N, _) {
    return _ < N.length ? N[_] : C(N) ? nr(N) : null;
  }
  function b(N, _) {
    var P = E(N, _);
    return P ? y(P) : /* @__PURE__ */ new Set();
  }
  function F(N) {
    return N.conversion === null || N.conversion === void 0;
  }
  function B(N, _) {
    var P = /* @__PURE__ */ new Set();
    return N.forEach(function(V) {
      var W = b(V.params, _), H, tr = ne(W), X;
      try {
        for (tr.s(); !(X = tr.n()).done; )
          H = X.value, P.add(H);
      } catch (rr) {
        tr.e(rr);
      } finally {
        tr.f();
      }
    }), P.has("any") ? ["any"] : Array.from(P);
  }
  function S(N, _, P) {
    var V, W, H = N || "unnamed", tr = P, X, rr = function() {
      var Ir = [];
      if (tr.forEach(function(qr) {
        var re = E(qr.params, X), Qr = g(re);
        (X < qr.params.length || C(qr.params)) && Qr(_[X]) && Ir.push(qr);
      }), Ir.length === 0) {
        if (W = B(tr, X), W.length > 0) {
          var Kr = i(_[X]);
          return V = new TypeError("Unexpected type of argument in function " + H + " (expected: " + W.join(" or ") + ", actual: " + Kr.join(" | ") + ", index: " + X + ")"), V.data = {
            category: "wrongType",
            fn: H,
            index: X,
            actual: Kr,
            expected: W
          }, {
            v: V
          };
        }
      } else
        tr = Ir;
    };
    for (X = 0; X < _.length; X++) {
      var lr = rr();
      if (Oe(lr) === "object")
        return lr.v;
    }
    var yr = tr.map(function(Vr) {
      return C(Vr.params) ? 1 / 0 : Vr.params.length;
    });
    if (_.length < Math.min.apply(null, yr))
      return W = B(tr, X), V = new TypeError("Too few arguments in function " + H + " (expected: " + W.join(" or ") + ", index: " + _.length + ")"), V.data = {
        category: "tooFewArgs",
        fn: H,
        index: _.length,
        expected: W
      }, V;
    var ar = Math.max.apply(null, yr);
    if (_.length > ar)
      return V = new TypeError("Too many arguments in function " + H + " (expected: " + ar + ", actual: " + _.length + ")"), V.data = {
        category: "tooManyArgs",
        fn: H,
        index: _.length,
        expectedLength: ar
      }, V;
    for (var Jr = [], Pr = 0; Pr < _.length; ++Pr)
      Jr.push(i(_[Pr]).join("|"));
    return V = new TypeError('Arguments of type "' + Jr.join(", ") + '" do not match any of the defined signatures of function ' + H + "."), V.data = {
      category: "mismatch",
      actual: Jr
    }, V;
  }
  function z(N) {
    for (var _ = t.length + 1, P = 0; P < N.types.length; P++)
      F(N.types[P]) && (_ = Math.min(_, N.types[P].typeIndex));
    return _;
  }
  function $(N) {
    for (var _ = u + 1, P = 0; P < N.types.length; P++)
      F(N.types[P]) || (_ = Math.min(_, N.types[P].conversionIndex));
    return _;
  }
  function O(N, _) {
    if (N.hasAny) {
      if (!_.hasAny)
        return 1;
    } else if (_.hasAny)
      return -1;
    if (N.restParam) {
      if (!_.restParam)
        return 1;
    } else if (_.restParam)
      return -1;
    if (N.hasConversion) {
      if (!_.hasConversion)
        return 1;
    } else if (_.hasConversion)
      return -1;
    var P = z(N) - z(_);
    if (P < 0)
      return -1;
    if (P > 0)
      return 1;
    var V = $(N) - $(_);
    return V < 0 ? -1 : V > 0 ? 1 : 0;
  }
  function x(N, _) {
    var P = N.params, V = _.params, W = nr(P), H = nr(V), tr = C(P), X = C(V);
    if (tr && W.hasAny) {
      if (!X || !H.hasAny)
        return 1;
    } else if (X && H.hasAny)
      return -1;
    var rr = 0, lr = 0, yr, ar = ne(P), Jr;
    try {
      for (ar.s(); !(Jr = ar.n()).done; )
        yr = Jr.value, yr.hasAny && ++rr, yr.hasConversion && ++lr;
    } catch (Xe) {
      ar.e(Xe);
    } finally {
      ar.f();
    }
    var Pr = 0, Vr = 0, Ir = ne(V), Kr;
    try {
      for (Ir.s(); !(Kr = Ir.n()).done; )
        yr = Kr.value, yr.hasAny && ++Pr, yr.hasConversion && ++Vr;
    } catch (Xe) {
      Ir.e(Xe);
    } finally {
      Ir.f();
    }
    if (rr !== Pr)
      return rr - Pr;
    if (tr && W.hasConversion) {
      if (!X || !H.hasConversion)
        return 1;
    } else if (X && H.hasConversion)
      return -1;
    if (lr !== Vr)
      return lr - Vr;
    if (tr) {
      if (!X)
        return 1;
    } else if (X)
      return -1;
    var qr = (P.length - V.length) * (tr ? -1 : 1);
    if (qr !== 0)
      return qr;
    for (var re = [], Qr = 0, Xr = 0; Xr < P.length; ++Xr) {
      var be = O(P[Xr], V[Xr]);
      re.push(be), Qr += be;
    }
    if (Qr !== 0)
      return Qr;
    for (var Wr, Me = 0, nt = re; Me < nt.length; Me++)
      if (Wr = nt[Me], Wr !== 0)
        return Wr;
    return 0;
  }
  function Z(N) {
    if (N.length === 0)
      return [];
    var _ = N.map(p);
    N.length > 1 && _.sort(function(rr, lr) {
      return rr.index - lr.index;
    });
    var P = _[0].conversionsTo;
    if (N.length === 1)
      return P;
    P = P.concat([]);
    for (var V = new Set(N), W = 1; W < _.length; ++W) {
      var H = void 0, tr = ne(_[W].conversionsTo), X;
      try {
        for (tr.s(); !(X = tr.n()).done; )
          H = X.value, V.has(H.from) || (P.push(H), V.add(H.from));
      } catch (rr) {
        tr.e(rr);
      } finally {
        tr.f();
      }
    }
    return P;
  }
  function U(N, _) {
    var P = _;
    if (N.some(function(X) {
      return X.hasConversion;
    })) {
      var V = C(N), W = N.map(T);
      P = function() {
        for (var rr = [], lr = V ? arguments.length - 1 : arguments.length, yr = 0; yr < lr; yr++)
          rr[yr] = W[yr](arguments[yr]);
        return V && (rr[lr] = arguments[lr].map(W[lr])), _.apply(this, rr);
      };
    }
    var H = P;
    if (C(N)) {
      var tr = N.length - 1;
      H = function() {
        return P.apply(this, Y(arguments, 0, tr).concat([Y(arguments, tr)]));
      };
    }
    return H;
  }
  function T(N) {
    var _, P, V, W, H = [], tr = [];
    switch (N.types.forEach(function(X) {
      X.conversion && (H.push(p(X.conversion.from).test), tr.push(X.conversion.convert));
    }), tr.length) {
      case 0:
        return function(rr) {
          return rr;
        };
      case 1:
        return _ = H[0], V = tr[0], function(rr) {
          return _(rr) ? V(rr) : rr;
        };
      case 2:
        return _ = H[0], P = H[1], V = tr[0], W = tr[1], function(rr) {
          return _(rr) ? V(rr) : P(rr) ? W(rr) : rr;
        };
      default:
        return function(rr) {
          for (var lr = 0; lr < tr.length; lr++)
            if (H[lr](rr))
              return tr[lr](rr);
          return rr;
        };
    }
  }
  function I(N) {
    function _(P, V, W) {
      if (V < P.length) {
        var H = P[V], tr = [];
        if (H.restParam) {
          var X = H.types.filter(F);
          X.length < H.types.length && tr.push({
            types: X,
            name: "..." + X.map(function(rr) {
              return rr.name;
            }).join("|"),
            hasAny: X.some(function(rr) {
              return rr.isAny;
            }),
            hasConversion: !1,
            restParam: !0
          }), tr.push(H);
        } else
          tr = H.types.map(function(rr) {
            return {
              types: [rr],
              name: rr.name,
              hasAny: rr.isAny,
              hasConversion: rr.conversion,
              restParam: !1
            };
          });
        return cr(tr, function(rr) {
          return _(P, V + 1, W.concat([rr]));
        });
      } else
        return [W];
    }
    return _(N, 0, []);
  }
  function R(N, _) {
    for (var P = Math.max(N.length, _.length), V = 0; V < P; V++) {
      var W = b(N, V), H = b(_, V), tr = !1, X = void 0, rr = ne(H), lr;
      try {
        for (rr.s(); !(lr = rr.n()).done; )
          if (X = lr.value, W.has(X)) {
            tr = !0;
            break;
          }
      } catch (Vr) {
        rr.e(Vr);
      } finally {
        rr.f();
      }
      if (!tr)
        return !1;
    }
    var yr = N.length, ar = _.length, Jr = C(N), Pr = C(_);
    return Jr ? Pr ? yr === ar : ar >= yr : Pr ? yr >= ar : yr === ar;
  }
  function K(N) {
    return N.map(function(_) {
      return Er(_) ? dr(_.referToSelf.callback) : Dr(_) ? ur(_.referTo.references, _.referTo.callback) : _;
    });
  }
  function L(N, _, P) {
    var V = [], W, H = ne(N), tr;
    try {
      for (H.s(); !(tr = H.n()).done; ) {
        W = tr.value;
        var X = P[W];
        if (typeof X != "number")
          throw new TypeError('No definition for referenced signature "' + W + '"');
        if (X = _[X], typeof X != "function")
          return !1;
        V.push(X);
      }
    } catch (rr) {
      H.e(rr);
    } finally {
      H.f();
    }
    return V;
  }
  function q(N, _, P) {
    for (var V = K(N), W = new Array(V.length).fill(!1), H = !0; H; ) {
      H = !1;
      for (var tr = !0, X = 0; X < V.length; ++X)
        if (!W[X]) {
          var rr = V[X];
          if (Er(rr))
            V[X] = rr.referToSelf.callback(P), V[X].referToSelf = rr.referToSelf, W[X] = !0, tr = !1;
          else if (Dr(rr)) {
            var lr = L(rr.referTo.references, V, _);
            lr ? (V[X] = rr.referTo.callback.apply(this, lr), V[X].referTo = rr.referTo, W[X] = !0, tr = !1) : H = !0;
          }
        }
      if (tr && H)
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
    }
    return V;
  }
  function J(N) {
    var _ = /\bthis(\(|\.signatures\b)/;
    Object.keys(N).forEach(function(P) {
      var V = N[P];
      if (_.test(V.toString()))
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
    });
  }
  function Q(N, _) {
    if (c.createCount++, Object.keys(_).length === 0)
      throw new SyntaxError("No signatures provided");
    c.warnAgainstDeprecatedThis && J(_);
    var P = [], V = [], W = {}, H = [], tr, X = function() {
      if (!Object.prototype.hasOwnProperty.call(_, tr))
        return "continue";
      var Rr = A(tr);
      if (!Rr)
        return "continue";
      P.forEach(function(xe) {
        if (R(xe, Rr))
          throw new TypeError('Conflicting signatures "' + m(xe) + '" and "' + m(Rr) + '".');
      }), P.push(Rr);
      var pn = V.length;
      V.push(_[tr]);
      var Xi = Rr.map(w), at = void 0, it = ne(I(Xi)), dn;
      try {
        for (it.s(); !(dn = it.n()).done; ) {
          at = dn.value;
          var mn = m(at);
          H.push({
            params: at,
            name: mn,
            fn: pn
          }), at.every(function(xe) {
            return !xe.hasConversion;
          }) && (W[mn] = pn);
        }
      } catch (xe) {
        it.e(xe);
      } finally {
        it.f();
      }
    };
    for (tr in _)
      var rr = X();
    H.sort(x);
    var lr = q(V, W, Ke), yr;
    for (yr in W)
      Object.prototype.hasOwnProperty.call(W, yr) && (W[yr] = lr[W[yr]]);
    for (var ar = [], Jr = /* @__PURE__ */ new Map(), Pr = 0, Vr = H; Pr < Vr.length; Pr++)
      yr = Vr[Pr], Jr.has(yr.name) || (yr.fn = lr[yr.fn], ar.push(yr), Jr.set(yr.name, yr));
    for (var Ir = ar[0] && ar[0].params.length <= 2 && !C(ar[0].params), Kr = ar[1] && ar[1].params.length <= 2 && !C(ar[1].params), qr = ar[2] && ar[2].params.length <= 2 && !C(ar[2].params), re = ar[3] && ar[3].params.length <= 2 && !C(ar[3].params), Qr = ar[4] && ar[4].params.length <= 2 && !C(ar[4].params), Xr = ar[5] && ar[5].params.length <= 2 && !C(ar[5].params), be = Ir && Kr && qr && re && Qr && Xr, Wr = 0; Wr < ar.length; ++Wr)
      ar[Wr].test = M(ar[Wr].params);
    for (var Me = Ir ? g(ar[0].params[0]) : ee, nt = Kr ? g(ar[1].params[0]) : ee, Xe = qr ? g(ar[2].params[0]) : ee, Ai = re ? g(ar[3].params[0]) : ee, Ei = Qr ? g(ar[4].params[0]) : ee, Fi = Xr ? g(ar[5].params[0]) : ee, Ci = Ir ? g(ar[0].params[1]) : ee, bi = Kr ? g(ar[1].params[1]) : ee, Mi = qr ? g(ar[2].params[1]) : ee, Si = re ? g(ar[3].params[1]) : ee, Bi = Qr ? g(ar[4].params[1]) : ee, Ni = Xr ? g(ar[5].params[1]) : ee, Ge = 0; Ge < ar.length; ++Ge)
      ar[Ge].implementation = U(ar[Ge].params, ar[Ge].fn);
    var xi = Ir ? ar[0].implementation : _e, _i = Kr ? ar[1].implementation : _e, zi = qr ? ar[2].implementation : _e, Ti = re ? ar[3].implementation : _e, Ii = Qr ? ar[4].implementation : _e, Oi = Xr ? ar[5].implementation : _e, $i = Ir ? ar[0].params.length : -1, qi = Kr ? ar[1].params.length : -1, Pi = qr ? ar[2].params.length : -1, Ri = re ? ar[3].params.length : -1, Ui = Qr ? ar[4].params.length : -1, Li = Xr ? ar[5].params.length : -1, Zi = be ? 6 : 0, Vi = ar.length, Yi = ar.map(function(kr) {
      return kr.test;
    }), Ji = ar.map(function(kr) {
      return kr.implementation;
    }), Qi = function() {
      for (var Rr = Zi; Rr < Vi; Rr++)
        if (Yi[Rr](arguments))
          return Ji[Rr].apply(this, arguments);
      return c.onMismatch(N, arguments, ar);
    };
    function Ke(kr, Rr) {
      return arguments.length === $i && Me(kr) && Ci(Rr) ? xi.apply(this, arguments) : arguments.length === qi && nt(kr) && bi(Rr) ? _i.apply(this, arguments) : arguments.length === Pi && Xe(kr) && Mi(Rr) ? zi.apply(this, arguments) : arguments.length === Ri && Ai(kr) && Si(Rr) ? Ti.apply(this, arguments) : arguments.length === Ui && Ei(kr) && Bi(Rr) ? Ii.apply(this, arguments) : arguments.length === Li && Fi(kr) && Ni(Rr) ? Oi.apply(this, arguments) : Qi.apply(this, arguments);
    }
    try {
      Object.defineProperty(Ke, "name", {
        value: N
      });
    } catch {
    }
    return Ke.signatures = W, Ke._typedFunctionData = {
      signatures: ar,
      signatureMap: Jr
    }, Ke;
  }
  function j(N, _, P) {
    throw S(N, _, P);
  }
  function er(N) {
    return Y(N, 0, N.length - 1);
  }
  function nr(N) {
    return N[N.length - 1];
  }
  function Y(N, _, P) {
    return Array.prototype.slice.call(N, _, P);
  }
  function pr(N, _) {
    for (var P = 0; P < N.length; P++)
      if (_(N[P]))
        return N[P];
  }
  function cr(N, _) {
    return Array.prototype.concat.apply([], N.map(_));
  }
  function ir() {
    var N = er(arguments).map(function(P) {
      return m(A(P));
    }), _ = nr(arguments);
    if (typeof _ != "function")
      throw new TypeError("Callback function expected as last argument");
    return ur(N, _);
  }
  function ur(N, _) {
    return {
      referTo: {
        references: N,
        callback: _
      }
    };
  }
  function dr(N) {
    if (typeof N != "function")
      throw new TypeError("Callback function expected as first argument");
    return {
      referToSelf: {
        callback: N
      }
    };
  }
  function Dr(N) {
    return N && Oe(N.referTo) === "object" && Array.isArray(N.referTo.references) && typeof N.referTo.callback == "function";
  }
  function Er(N) {
    return N && Oe(N.referToSelf) === "object" && typeof N.referToSelf.callback == "function";
  }
  function fr(N, _) {
    if (!N)
      return _;
    if (_ && _ !== N) {
      var P = new Error("Function names do not match (expected: " + N + ", actual: " + _ + ")");
      throw P.data = {
        actual: _,
        expected: N
      }, P;
    }
    return N;
  }
  function gr(N) {
    var _;
    for (var P in N)
      Object.prototype.hasOwnProperty.call(N, P) && (f(N[P]) || typeof N[P].signature == "string") && (_ = fr(_, N[P].name));
    return _;
  }
  function Fr(N, _) {
    var P;
    for (P in _)
      if (Object.prototype.hasOwnProperty.call(_, P)) {
        if (P in N && _[P] !== N[P]) {
          var V = new Error('Signature "' + P + '" is defined twice');
          throw V.data = {
            signature: P,
            sourceFunction: _[P],
            destFunction: N[P]
          }, V;
        }
        N[P] = _[P];
      }
  }
  var Tr = c;
  c = function(_) {
    for (var P = typeof _ == "string", V = P ? 1 : 0, W = P ? _ : "", H = {}, tr = V; tr < arguments.length; ++tr) {
      var X = arguments[tr], rr = {}, lr = void 0;
      if (typeof X == "function" ? (lr = X.name, typeof X.signature == "string" ? rr[X.signature] = X : f(X) && (rr = X.signatures)) : r(X) && (rr = X, P || (lr = gr(X))), Object.keys(rr).length === 0) {
        var yr = new TypeError("Argument to 'typed' at index " + tr + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        throw yr.data = {
          index: tr,
          argument: X
        }, yr;
      }
      P || (W = fr(W, lr)), Fr(H, rr);
    }
    return Q(W || "", H);
  }, c.create = Ca, c.createCount = Tr.createCount, c.onMismatch = j, c.throwMismatchError = j, c.createError = S, c.clear = l, c.clearConversions = o, c.addTypes = v, c._findType = p, c.referTo = ir, c.referToSelf = dr, c.convert = s, c.findSignature = h, c.find = d, c.isTypedFunction = f, c.warnAgainstDeprecatedThis = !0, c.addType = function(N, _) {
    var P = "any";
    _ !== !1 && a.has("Object") && (P = "Object"), c.addTypes([N], P);
  };
  function _r(N) {
    if (!N || typeof N.from != "string" || typeof N.to != "string" || typeof N.convert != "function")
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    if (N.to === N.from)
      throw new SyntaxError('Illegal to define conversion from "' + N.from + '" to itself.');
  }
  return c.addConversion = function(N) {
    _r(N);
    var _ = p(N.to);
    if (_.conversionsTo.every(function(P) {
      return P.from !== N.from;
    }))
      _.conversionsTo.push({
        from: N.from,
        convert: N.convert,
        index: u++
      });
    else
      throw new Error('There is already a conversion from "' + N.from + '" to "' + _.name + '"');
  }, c.addConversions = function(N) {
    N.forEach(c.addConversion);
  }, c.removeConversion = function(N) {
    _r(N);
    var _ = p(N.to), P = pr(_.conversionsTo, function(W) {
      return W.from === N.from;
    });
    if (!P)
      throw new Error("Attempt to remove nonexistent conversion from " + N.from + " to " + N.to);
    if (P.convert !== N.convert)
      throw new Error("Conversion to remove does not match existing conversion");
    var V = _.conversionsTo.indexOf(P);
    _.conversionsTo.splice(V, 1);
  }, c.resolve = function(N, _) {
    if (!f(N))
      throw new TypeError(yn);
    for (var P = N._typedFunctionData.signatures, V = 0; V < P.length; ++V)
      if (P[V].test(_))
        return P[V];
    return null;
  }, c;
}
const wn = Ca();
function Mr(r) {
  return typeof r == "boolean" ? !0 : isFinite(r) ? r === Math.round(r) : !1;
}
var Mu = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function It(r, e, n) {
  var a = {
    2: "0b",
    8: "0o",
    16: "0x"
  }, t = a[e], u = "";
  if (n) {
    if (n < 1)
      throw new Error("size must be in greater than 0");
    if (!Mr(n))
      throw new Error("size must be an integer");
    if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1)))
      throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!Mr(r))
      throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** n), u = "i".concat(n);
  }
  var c = "";
  return r < 0 && (r = -r, c = "-"), "".concat(c).concat(t).concat(r.toString(e)).concat(u);
}
function Rt(r, e) {
  if (typeof e == "function")
    return e(r);
  if (r === 1 / 0)
    return "Infinity";
  if (r === -1 / 0)
    return "-Infinity";
  if (isNaN(r))
    return "NaN";
  var n = "auto", a, t;
  if (e && (e.notation && (n = e.notation), xr(e) ? a = e : xr(e.precision) && (a = e.precision), e.wordSize && (t = e.wordSize, typeof t != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (n) {
    case "fixed":
      return Bu(r, a);
    case "exponential":
      return ba(r, a);
    case "engineering":
      return Su(r, a);
    case "bin":
      return It(r, 2, t);
    case "oct":
      return It(r, 8, t);
    case "hex":
      return It(r, 16, t);
    case "auto":
      return Nu(r, a, e && e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var u = arguments[2], c = arguments[4];
        return u !== "." ? u + c : c;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function bt(r) {
  var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e)
    throw new SyntaxError("Invalid number " + r);
  var n = e[1], a = e[2], t = parseFloat(e[4] || "0"), u = a.indexOf(".");
  t += u !== -1 ? u - 1 : a.length - 1;
  var c = a.replace(".", "").replace(/^0*/, function(p) {
    return t -= p.length, "";
  }).replace(/0*$/, "").split("").map(function(p) {
    return parseInt(p);
  });
  return c.length === 0 && (c.push(0), t++), {
    sign: n,
    coefficients: c,
    exponent: t
  };
}
function Su(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var n = bt(r), a = Mt(n, e), t = a.exponent, u = a.coefficients, c = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if (xr(e))
    for (; e > u.length || t - c + 1 > u.length; )
      u.push(0);
  else
    for (var p = Math.abs(t - c) - (u.length - 1), v = 0; v < p; v++)
      u.push(0);
  for (var l = Math.abs(t - c), o = 1; l > 0; )
    o++, l--;
  var i = u.slice(o).join(""), f = xr(e) && i.length || i.match(/[1-9]/) ? "." + i : "", h = u.slice(0, o).join("") + f + "e" + (t >= 0 ? "+" : "") + c.toString();
  return a.sign + h;
}
function Bu(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var n = bt(r), a = typeof e == "number" ? Mt(n, n.exponent + 1 + e) : n, t = a.coefficients, u = a.exponent + 1, c = u + (e || 0);
  return t.length < c && (t = t.concat(qe(c - t.length))), u < 0 && (t = qe(-u + 1).concat(t), u = 1), u < t.length && t.splice(u, 0, u === 0 ? "0." : "."), a.sign + t.join("");
}
function ba(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var n = bt(r), a = e ? Mt(n, e) : n, t = a.coefficients, u = a.exponent;
  t.length < e && (t = t.concat(qe(e - t.length)));
  var c = t.shift();
  return a.sign + c + (t.length > 0 ? "." + t.join("") : "") + "e" + (u >= 0 ? "+" : "") + u;
}
function Nu(r, e, n) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var a = n && n.lowerExp !== void 0 ? n.lowerExp : -3, t = n && n.upperExp !== void 0 ? n.upperExp : 5, u = bt(r), c = e ? Mt(u, e) : u;
  if (c.exponent < a || c.exponent >= t)
    return ba(r, e);
  var p = c.coefficients, v = c.exponent;
  p.length < e && (p = p.concat(qe(e - p.length))), p = p.concat(qe(v - p.length + 1 + (p.length < e ? e - p.length : 0))), p = qe(-v).concat(p);
  var l = v > 0 ? v : 0;
  return l < p.length - 1 && p.splice(l + 1, 0, "."), c.sign + p.join("");
}
function Mt(r, e) {
  for (var n = {
    sign: r.sign,
    coefficients: r.coefficients,
    exponent: r.exponent
  }, a = n.coefficients; e <= 0; )
    a.unshift(0), n.exponent++, e++;
  if (a.length > e) {
    var t = a.splice(e, a.length - e);
    if (t[0] >= 5) {
      var u = e - 1;
      for (a[u]++; a[u] === 10; )
        a.pop(), u === 0 && (a.unshift(0), n.exponent++, u++), u--, a[u]++;
    }
  }
  return n;
}
function qe(r) {
  for (var e = [], n = 0; n < r; n++)
    e.push(0);
  return e;
}
function xu(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
var _u = Number.EPSILON || 2220446049250313e-31;
function pe(r, e, n) {
  if (n == null)
    return r === e;
  if (r === e)
    return !0;
  if (isNaN(r) || isNaN(e))
    return !1;
  if (isFinite(r) && isFinite(e)) {
    var a = Math.abs(r - e);
    return a < _u ? !0 : a <= Math.max(Math.abs(r), Math.abs(e)) * n;
  }
  return !1;
}
function Ot(r, e, n) {
  var a = r.constructor, t = new a(2), u = "";
  if (n) {
    if (n < 1)
      throw new Error("size must be in greater than 0");
    if (!Mr(n))
      throw new Error("size must be an integer");
    if (r.greaterThan(t.pow(n - 1).sub(1)) || r.lessThan(t.pow(n - 1).mul(-1)))
      throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!r.isInteger())
      throw new Error("Value must be an integer");
    r.lessThan(0) && (r = r.add(t.pow(n))), u = "i".concat(n);
  }
  switch (e) {
    case 2:
      return "".concat(r.toBinary()).concat(u);
    case 8:
      return "".concat(r.toOctal()).concat(u);
    case 16:
      return "".concat(r.toHexadecimal()).concat(u);
    default:
      throw new Error("Base ".concat(e, " not supported "));
  }
}
function zu(r, e) {
  if (typeof e == "function")
    return e(r);
  if (!r.isFinite())
    return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var n = "auto", a, t;
  if (e !== void 0 && (e.notation && (n = e.notation), typeof e == "number" ? a = e : e.precision && (a = e.precision), e.wordSize && (t = e.wordSize, typeof t != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (n) {
    case "fixed":
      return Iu(r, a);
    case "exponential":
      return An(r, a);
    case "engineering":
      return Tu(r, a);
    case "bin":
      return Ot(r, 2, t);
    case "oct":
      return Ot(r, 8, t);
    case "hex":
      return Ot(r, 16, t);
    case "auto": {
      var u = e && e.lowerExp !== void 0 ? e.lowerExp : -3, c = e && e.upperExp !== void 0 ? e.upperExp : 5;
      if (r.isZero())
        return "0";
      var p, v = r.toSignificantDigits(a), l = v.e;
      return l >= u && l < c ? p = v.toFixed() : p = An(r, a), p.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], i = arguments[4];
        return o !== "." ? o + i : i;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Tu(r, e) {
  var n = r.e, a = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -a)), u = t.toPrecision(e);
  return u.indexOf("e") !== -1 && (u = t.toString()), u + "e" + (n >= 0 ? "+" : "") + a.toString();
}
function An(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function Iu(r, e) {
  return r.toFixed(e);
}
function Nr(r, e) {
  var n = Ou(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function Ou(r, e) {
  if (typeof r == "number")
    return Rt(r, e);
  if (zr(r))
    return zu(r, e);
  if ($u(r))
    return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
  if (Array.isArray(r))
    return Ma(r, e);
  if (ae(r))
    return '"' + r + '"';
  if (typeof r == "function")
    return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function")
      return r.format(e);
    if (r && r.toString(e) !== {}.toString())
      return r.toString(e);
    var n = Object.keys(r).map((a) => '"' + a + '": ' + Nr(r[a], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function Ma(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", a = r.length, t = 0; t < a; t++)
      t !== 0 && (n += ", "), n += Ma(r[t], e);
    return n += "]", n;
  } else
    return Nr(r, e);
}
function $u(r) {
  return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || !1;
}
function Ar(r, e, n) {
  if (!(this instanceof Ar))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
Ar.prototype = new RangeError();
Ar.prototype.constructor = RangeError;
Ar.prototype.name = "DimensionError";
Ar.prototype.isDimensionError = !0;
function Se(r, e, n) {
  if (!(this instanceof Se))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Se.prototype = new RangeError();
Se.prototype.constructor = RangeError;
Se.prototype.name = "IndexError";
Se.prototype.isIndexError = !0;
function Lr(r) {
  for (var e = []; Array.isArray(r); )
    e.push(r.length), r = r[0];
  return e;
}
function Sa(r, e, n) {
  var a, t = r.length;
  if (t !== e[n])
    throw new Ar(t, e[n]);
  if (n < e.length - 1) {
    var u = n + 1;
    for (a = 0; a < t; a++) {
      var c = r[a];
      if (!Array.isArray(c))
        throw new Ar(e.length - 1, e.length, "<");
      Sa(r[a], e, u);
    }
  } else
    for (a = 0; a < t; a++)
      if (Array.isArray(r[a]))
        throw new Ar(e.length + 1, e.length, ">");
}
function En(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r))
      throw new Ar(r.length, 0);
  } else
    Sa(r, e, 0);
}
function br(r, e) {
  if (!xr(r) || !Mr(r))
    throw new TypeError("Index must be an integer (value: " + r + ")");
  if (r < 0 || typeof e == "number" && r >= e)
    throw new Se(r, e);
}
function vt(r, e, n) {
  if (!Array.isArray(r) || !Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!xr(t) || !Mr(t) || t < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Nr(e) + ")");
  });
  var a = n !== void 0 ? n : 0;
  return Ut(r, e, 0, a), r;
}
function Ut(r, e, n, a) {
  var t, u, c = r.length, p = e[n], v = Math.min(c, p);
  if (r.length = p, n < e.length - 1) {
    var l = n + 1;
    for (t = 0; t < v; t++)
      u = r[t], Array.isArray(u) || (u = [u], r[t] = u), Ut(u, e, l, a);
    for (t = v; t < p; t++)
      u = [], r[t] = u, Ut(u, e, l, a);
  } else {
    for (t = 0; t < v; t++)
      for (; Array.isArray(r[t]); )
        r[t] = r[t][0];
    for (t = v; t < p; t++)
      r[t] = a;
  }
}
function Ba(r, e) {
  var n = Pe(r), a = n.length;
  if (!Array.isArray(r) || !Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new Ar(0, a, "!=");
  e = Ht(e, a);
  var t = Na(e);
  if (a !== t)
    throw new Ar(t, a, "!=");
  try {
    return qu(n, e);
  } catch (u) {
    throw u instanceof Ar ? new Ar(t, a, "!=") : u;
  }
}
function Ht(r, e) {
  var n = Na(r), a = r.slice(), t = -1, u = r.indexOf(t), c = r.indexOf(t, u + 1) >= 0;
  if (c)
    throw new Error("More than one wildcard in sizes");
  var p = u >= 0, v = e % n === 0;
  if (p)
    if (v)
      a[u] = -e / n;
    else
      throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return a;
}
function Na(r) {
  return r.reduce((e, n) => e * n, 1);
}
function qu(r, e) {
  for (var n = r, a, t = e.length - 1; t > 0; t--) {
    var u = e[t];
    a = [];
    for (var c = n.length / u, p = 0; p < c; p++)
      a.push(n.slice(p * u, (p + 1) * u));
    n = a;
  }
  return n;
}
function xa(r, e, n, a) {
  var t = a || Lr(r);
  if (n)
    for (var u = 0; u < n; u++)
      r = [r], t.unshift(1);
  for (r = _a(r, e, 0); t.length < e; )
    t.push(1);
  return r;
}
function _a(r, e, n) {
  var a, t;
  if (Array.isArray(r)) {
    var u = n + 1;
    for (a = 0, t = r.length; a < t; a++)
      r[a] = _a(r[a], e, u);
  } else
    for (var c = n; c < e; c++)
      r = [r];
  return r;
}
function Pe(r) {
  if (!Array.isArray(r))
    return r;
  var e = [];
  return r.forEach(function n(a) {
    Array.isArray(a) ? a.forEach(n) : e.push(a);
  }), e;
}
function Fn(r) {
  if (!Array.isArray(r))
    throw new TypeError("Array input expected");
  if (r.length === 0)
    return r;
  var e = [], n = 0;
  e[0] = {
    value: r[0],
    identifier: 0
  };
  for (var a = 1; a < r.length; a++)
    r[a] === r[a - 1] ? n++ : n = 0, e.push({
      value: r[a],
      identifier: n
    });
  return e;
}
function Cn(r) {
  if (!Array.isArray(r))
    throw new TypeError("Array input expected");
  if (r.length === 0)
    return r;
  for (var e = [], n = 0; n < r.length; n++)
    e.push(r[n].value);
  return e;
}
function ht(r, e) {
  for (var n, a = 0, t = 0; t < r.length; t++) {
    var u = r[t], c = Array.isArray(u);
    if (t === 0 && c && (a = u.length), c && u.length !== a)
      return;
    var p = c ? ht(u, e) : e(u);
    if (n === void 0)
      n = p;
    else if (n !== p)
      return "mixed";
  }
  return n;
}
function k(r, e, n, a) {
  function t(u) {
    var c = Eu(u, e.map(Uu));
    return Pu(r, e, u), n(c);
  }
  return t.isFactory = !0, t.fn = r, t.dependencies = e.slice().sort(), a && (t.meta = a), t;
}
function Pu(r, e, n) {
  var a = e.filter((u) => !Ru(u)).every((u) => n[u] !== void 0);
  if (!a) {
    var t = e.filter((u) => n[u] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((u) => '"'.concat(u, '"')).join(", "), "."));
  }
}
function Ru(r) {
  return r && r[0] === "?";
}
function Uu(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function za(r, e) {
  if (Oa(r) && Ia(r, e))
    return r[e];
  throw typeof r[e] == "function" && Zu(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function Ta(r, e, n) {
  if (Oa(r) && Ia(r, e))
    return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function Lu(r, e) {
  return e in r;
}
function Ia(r, e) {
  return !r || typeof r != "object" ? !1 : He(Vu, e) ? !0 : !(e in Object.prototype || e in Function.prototype);
}
function Zu(r, e) {
  return r == null || typeof r[e] != "function" || He(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? !1 : He(Yu, e) ? !0 : !(e in Object.prototype || e in Function.prototype);
}
function Oa(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var Vu = {
  length: !0,
  name: !0
}, Yu = {
  toString: !0,
  valueOf: !0,
  toLocaleString: !0
};
class Ju {
  constructor(e) {
    this.wrappedObject = e;
  }
  keys() {
    return Object.keys(this.wrappedObject);
  }
  get(e) {
    return za(this.wrappedObject, e);
  }
  set(e, n) {
    return Ta(this.wrappedObject, e, n), this;
  }
  has(e) {
    return Lu(this.wrappedObject, e);
  }
}
function Qu(r) {
  return r ? r instanceof Map || r instanceof Ju || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : !1;
}
var $a = function() {
  return $a = wn.create, wn;
}, Xu = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], Gu = /* @__PURE__ */ k("typed", Xu, function(e) {
  var {
    BigNumber: n,
    Complex: a,
    DenseMatrix: t,
    Fraction: u
  } = e, c = $a();
  return c.clear(), c.addTypes([
    {
      name: "number",
      test: xr
    },
    {
      name: "Complex",
      test: Kt
    },
    {
      name: "BigNumber",
      test: zr
    },
    {
      name: "Fraction",
      test: Wt
    },
    {
      name: "Unit",
      test: Ea
    },
    // The following type matches a valid variable name, i.e., an alphanumeric
    // string starting with an alphabetic character. It is used (at least)
    // in the definition of the derivative() function, as the argument telling
    // what to differentiate over must (currently) be a variable.
    {
      name: "identifier",
      test: (p) => ae && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(p)
    },
    {
      name: "string",
      test: ae
    },
    {
      name: "Chain",
      test: yu
    },
    {
      name: "Array",
      test: Cr
    },
    {
      name: "Matrix",
      test: Sr
    },
    {
      name: "DenseMatrix",
      test: ct
    },
    {
      name: "SparseMatrix",
      test: Ie
    },
    {
      name: "Range",
      test: Fa
    },
    {
      name: "Index",
      test: Ct
    },
    {
      name: "boolean",
      test: Gi
    },
    {
      name: "ResultSet",
      test: Ki
    },
    {
      name: "Help",
      test: Wi
    },
    {
      name: "function",
      test: Hi
    },
    {
      name: "Date",
      test: ki
    },
    {
      name: "RegExp",
      test: ji
    },
    {
      name: "null",
      test: eu
    },
    {
      name: "undefined",
      test: tu
    },
    {
      name: "AccessorNode",
      test: nu
    },
    {
      name: "ArrayNode",
      test: au
    },
    {
      name: "AssignmentNode",
      test: iu
    },
    {
      name: "BlockNode",
      test: uu
    },
    {
      name: "ConditionalNode",
      test: ou
    },
    {
      name: "ConstantNode",
      test: su
    },
    {
      name: "FunctionNode",
      test: cu
    },
    {
      name: "FunctionAssignmentNode",
      test: fu
    },
    {
      name: "IndexNode",
      test: lu
    },
    {
      name: "Node",
      test: vu
    },
    {
      name: "ObjectNode",
      test: hu
    },
    {
      name: "OperatorNode",
      test: pu
    },
    {
      name: "ParenthesisNode",
      test: du
    },
    {
      name: "RangeNode",
      test: mu
    },
    {
      name: "RelationalNode",
      test: Du
    },
    {
      name: "SymbolNode",
      test: gu
    },
    {
      name: "Map",
      test: Qu
    },
    {
      name: "Object",
      test: ru
    }
    // order 'Object' last, it matches on other classes too
  ]), c.addConversions([{
    from: "number",
    to: "BigNumber",
    convert: function(v) {
      if (n || $t(v), xu(v) > 15)
        throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + v + "). Use function bignumber(x) to convert to BigNumber.");
      return new n(v);
    }
  }, {
    from: "number",
    to: "Complex",
    convert: function(v) {
      return a || ut(v), new a(v, 0);
    }
  }, {
    from: "BigNumber",
    to: "Complex",
    convert: function(v) {
      return a || ut(v), new a(v.toNumber(), 0);
    }
  }, {
    from: "Fraction",
    to: "BigNumber",
    convert: function(v) {
      throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
    }
  }, {
    from: "Fraction",
    to: "Complex",
    convert: function(v) {
      return a || ut(v), new a(v.valueOf(), 0);
    }
  }, {
    from: "number",
    to: "Fraction",
    convert: function(v) {
      u || qt(v);
      var l = new u(v);
      if (l.valueOf() !== v)
        throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + v + "). Use function fraction(x) to convert to Fraction.");
      return l;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: "string",
    to: "number",
    convert: function(v) {
      var l = Number(v);
      if (isNaN(l))
        throw new Error('Cannot convert "' + v + '" to a number');
      return l;
    }
  }, {
    from: "string",
    to: "BigNumber",
    convert: function(v) {
      n || $t(v);
      try {
        return new n(v);
      } catch {
        throw new Error('Cannot convert "' + v + '" to BigNumber');
      }
    }
  }, {
    from: "string",
    to: "Fraction",
    convert: function(v) {
      u || qt(v);
      try {
        return new u(v);
      } catch {
        throw new Error('Cannot convert "' + v + '" to Fraction');
      }
    }
  }, {
    from: "string",
    to: "Complex",
    convert: function(v) {
      a || ut(v);
      try {
        return new a(v);
      } catch {
        throw new Error('Cannot convert "' + v + '" to Complex');
      }
    }
  }, {
    from: "boolean",
    to: "number",
    convert: function(v) {
      return +v;
    }
  }, {
    from: "boolean",
    to: "BigNumber",
    convert: function(v) {
      return n || $t(v), new n(+v);
    }
  }, {
    from: "boolean",
    to: "Fraction",
    convert: function(v) {
      return u || qt(v), new u(+v);
    }
  }, {
    from: "boolean",
    to: "string",
    convert: function(v) {
      return String(v);
    }
  }, {
    from: "Array",
    to: "Matrix",
    convert: function(v) {
      return t || Ku(), new t(v);
    }
  }, {
    from: "Matrix",
    to: "Array",
    convert: function(v) {
      return v.valueOf();
    }
  }]), c.onMismatch = (p, v, l) => {
    var o = c.createError(p, v, l);
    if (["wrongType", "mismatch"].includes(o.data.category) && v.length === 1 && ft(v[0]) && // check if the function can be unary:
    l.some((f) => !f.params.includes(","))) {
      var i = new TypeError("Function '".concat(p, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(p, ")'."));
      throw i.data = o.data, i;
    }
    throw o;
  }, c.onMismatch = (p, v, l) => {
    var o = c.createError(p, v, l);
    if (["wrongType", "mismatch"].includes(o.data.category) && v.length === 1 && ft(v[0]) && // check if the function can be unary:
    l.some((f) => !f.params.includes(","))) {
      var i = new TypeError("Function '".concat(p, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(p, ")'."));
      throw i.data = o.data, i;
    }
    throw o;
  }, c;
});
function $t(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function ut(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function Ku() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function qt(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var $e = 9e15, Ae = 1e9, Lt = "0123456789abcdef", pt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", dt = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Zt = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -$e,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: $e,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, qa, ve, hr = !0, St = "[DecimalError] ", we = St + "Invalid argument: ", Pa = St + "Precision limit exceeded", Ra = St + "crypto unavailable", Ua = "[object Decimal]", Yr = Math.floor, Or = Math.pow, Wu = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Hu = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, ku = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, La = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ue = 1e7, vr = 7, ju = 9007199254740991, ro = pt.length - 1, Vt = dt.length - 1, G = { toStringTag: Ua };
G.absoluteValue = G.abs = function() {
  var r = new this.constructor(this);
  return r.s < 0 && (r.s = 1), sr(r);
};
G.ceil = function() {
  return sr(new this.constructor(this), this.e + 1, 2);
};
G.clampedTo = G.clamp = function(r, e) {
  var n, a = this, t = a.constructor;
  if (r = new t(r), e = new t(e), !r.s || !e.s)
    return new t(NaN);
  if (r.gt(e))
    throw Error(we + e);
  return n = a.cmp(r), n < 0 ? r : a.cmp(e) > 0 ? e : new t(a);
};
G.comparedTo = G.cmp = function(r) {
  var e, n, a, t, u = this, c = u.d, p = (r = new u.constructor(r)).d, v = u.s, l = r.s;
  if (!c || !p)
    return !v || !l ? NaN : v !== l ? v : c === p ? 0 : !c ^ v < 0 ? 1 : -1;
  if (!c[0] || !p[0])
    return c[0] ? v : p[0] ? -l : 0;
  if (v !== l)
    return v;
  if (u.e !== r.e)
    return u.e > r.e ^ v < 0 ? 1 : -1;
  for (a = c.length, t = p.length, e = 0, n = a < t ? a : t; e < n; ++e)
    if (c[e] !== p[e])
      return c[e] > p[e] ^ v < 0 ? 1 : -1;
  return a === t ? 0 : a > t ^ v < 0 ? 1 : -1;
};
G.cosine = G.cos = function() {
  var r, e, n = this, a = n.constructor;
  return n.d ? n.d[0] ? (r = a.precision, e = a.rounding, a.precision = r + Math.max(n.e, n.sd()) + vr, a.rounding = 1, n = eo(a, Qa(a, n)), a.precision = r, a.rounding = e, sr(ve == 2 || ve == 3 ? n.neg() : n, r, e, !0)) : new a(1) : new a(NaN);
};
G.cubeRoot = G.cbrt = function() {
  var r, e, n, a, t, u, c, p, v, l, o = this, i = o.constructor;
  if (!o.isFinite() || o.isZero())
    return new i(o);
  for (hr = !1, u = o.s * Or(o.s * o, 1 / 3), !u || Math.abs(u) == 1 / 0 ? (n = Zr(o.d), r = o.e, (u = (r - n.length + 1) % 3) && (n += u == 1 || u == -2 ? "0" : "00"), u = Or(n, 1 / 3), r = Yr((r + 1) / 3) - (r % 3 == (r < 0 ? -1 : 2)), u == 1 / 0 ? n = "5e" + r : (n = u.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + r), a = new i(n), a.s = o.s) : a = new i(u.toString()), c = (r = i.precision) + 3; ; )
    if (p = a, v = p.times(p).times(p), l = v.plus(o), a = Br(l.plus(o).times(p), l.plus(v), c + 2, 1), Zr(p.d).slice(0, c) === (n = Zr(a.d)).slice(0, c))
      if (n = n.slice(c - 3, c + 1), n == "9999" || !t && n == "4999") {
        if (!t && (sr(p, r + 1, 0), p.times(p).times(p).eq(o))) {
          a = p;
          break;
        }
        c += 4, t = 1;
      } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (sr(a, r + 1, 1), e = !a.times(a).times(a).eq(o));
        break;
      }
  return hr = !0, sr(a, r, i.rounding, e);
};
G.decimalPlaces = G.dp = function() {
  var r, e = this.d, n = NaN;
  if (e) {
    if (r = e.length - 1, n = (r - Yr(this.e / vr)) * vr, r = e[r], r)
      for (; r % 10 == 0; r /= 10)
        n--;
    n < 0 && (n = 0);
  }
  return n;
};
G.dividedBy = G.div = function(r) {
  return Br(this, new this.constructor(r));
};
G.dividedToIntegerBy = G.divToInt = function(r) {
  var e = this, n = e.constructor;
  return sr(Br(e, new n(r), 0, 1, 1), n.precision, n.rounding);
};
G.equals = G.eq = function(r) {
  return this.cmp(r) === 0;
};
G.floor = function() {
  return sr(new this.constructor(this), this.e + 1, 3);
};
G.greaterThan = G.gt = function(r) {
  return this.cmp(r) > 0;
};
G.greaterThanOrEqualTo = G.gte = function(r) {
  var e = this.cmp(r);
  return e == 1 || e === 0;
};
G.hyperbolicCosine = G.cosh = function() {
  var r, e, n, a, t, u = this, c = u.constructor, p = new c(1);
  if (!u.isFinite())
    return new c(u.s ? 1 / 0 : NaN);
  if (u.isZero())
    return p;
  n = c.precision, a = c.rounding, c.precision = n + Math.max(u.e, u.sd()) + 4, c.rounding = 1, t = u.d.length, t < 32 ? (r = Math.ceil(t / 3), e = (1 / Nt(4, r)).toString()) : (r = 16, e = "2.3283064365386962890625e-10"), u = Re(c, 1, u.times(e), new c(1), !0);
  for (var v, l = r, o = new c(8); l--; )
    v = u.times(u), u = p.minus(v.times(o.minus(v.times(o))));
  return sr(u, c.precision = n, c.rounding = a, !0);
};
G.hyperbolicSine = G.sinh = function() {
  var r, e, n, a, t = this, u = t.constructor;
  if (!t.isFinite() || t.isZero())
    return new u(t);
  if (e = u.precision, n = u.rounding, u.precision = e + Math.max(t.e, t.sd()) + 4, u.rounding = 1, a = t.d.length, a < 3)
    t = Re(u, 2, t, t, !0);
  else {
    r = 1.4 * Math.sqrt(a), r = r > 16 ? 16 : r | 0, t = t.times(1 / Nt(5, r)), t = Re(u, 2, t, t, !0);
    for (var c, p = new u(5), v = new u(16), l = new u(20); r--; )
      c = t.times(t), t = t.times(p.plus(c.times(v.times(c).plus(l))));
  }
  return u.precision = e, u.rounding = n, sr(t, e, n, !0);
};
G.hyperbolicTangent = G.tanh = function() {
  var r, e, n = this, a = n.constructor;
  return n.isFinite() ? n.isZero() ? new a(n) : (r = a.precision, e = a.rounding, a.precision = r + 7, a.rounding = 1, Br(n.sinh(), n.cosh(), a.precision = r, a.rounding = e)) : new a(n.s);
};
G.inverseCosine = G.acos = function() {
  var r, e = this, n = e.constructor, a = e.abs().cmp(1), t = n.precision, u = n.rounding;
  return a !== -1 ? a === 0 ? e.isNeg() ? ie(n, t, u) : new n(0) : new n(NaN) : e.isZero() ? ie(n, t + 4, u).times(0.5) : (n.precision = t + 6, n.rounding = 1, e = e.asin(), r = ie(n, t + 4, u).times(0.5), n.precision = t, n.rounding = u, r.minus(e));
};
G.inverseHyperbolicCosine = G.acosh = function() {
  var r, e, n = this, a = n.constructor;
  return n.lte(1) ? new a(n.eq(1) ? 0 : NaN) : n.isFinite() ? (r = a.precision, e = a.rounding, a.precision = r + Math.max(Math.abs(n.e), n.sd()) + 4, a.rounding = 1, hr = !1, n = n.times(n).minus(1).sqrt().plus(n), hr = !0, a.precision = r, a.rounding = e, n.ln()) : new a(n);
};
G.inverseHyperbolicSine = G.asinh = function() {
  var r, e, n = this, a = n.constructor;
  return !n.isFinite() || n.isZero() ? new a(n) : (r = a.precision, e = a.rounding, a.precision = r + 2 * Math.max(Math.abs(n.e), n.sd()) + 6, a.rounding = 1, hr = !1, n = n.times(n).plus(1).sqrt().plus(n), hr = !0, a.precision = r, a.rounding = e, n.ln());
};
G.inverseHyperbolicTangent = G.atanh = function() {
  var r, e, n, a, t = this, u = t.constructor;
  return t.isFinite() ? t.e >= 0 ? new u(t.abs().eq(1) ? t.s / 0 : t.isZero() ? t : NaN) : (r = u.precision, e = u.rounding, a = t.sd(), Math.max(a, r) < 2 * -t.e - 1 ? sr(new u(t), r, e, !0) : (u.precision = n = a - t.e, t = Br(t.plus(1), new u(1).minus(t), n + r, 1), u.precision = r + 4, u.rounding = 1, t = t.ln(), u.precision = r, u.rounding = e, t.times(0.5))) : new u(NaN);
};
G.inverseSine = G.asin = function() {
  var r, e, n, a, t = this, u = t.constructor;
  return t.isZero() ? new u(t) : (e = t.abs().cmp(1), n = u.precision, a = u.rounding, e !== -1 ? e === 0 ? (r = ie(u, n + 4, a).times(0.5), r.s = t.s, r) : new u(NaN) : (u.precision = n + 6, u.rounding = 1, t = t.div(new u(1).minus(t.times(t)).sqrt().plus(1)).atan(), u.precision = n, u.rounding = a, t.times(2)));
};
G.inverseTangent = G.atan = function() {
  var r, e, n, a, t, u, c, p, v, l = this, o = l.constructor, i = o.precision, f = o.rounding;
  if (l.isFinite()) {
    if (l.isZero())
      return new o(l);
    if (l.abs().eq(1) && i + 4 <= Vt)
      return c = ie(o, i + 4, f).times(0.25), c.s = l.s, c;
  } else {
    if (!l.s)
      return new o(NaN);
    if (i + 4 <= Vt)
      return c = ie(o, i + 4, f).times(0.5), c.s = l.s, c;
  }
  for (o.precision = p = i + 10, o.rounding = 1, n = Math.min(28, p / vr + 2 | 0), r = n; r; --r)
    l = l.div(l.times(l).plus(1).sqrt().plus(1));
  for (hr = !1, e = Math.ceil(p / vr), a = 1, v = l.times(l), c = new o(l), t = l; r !== -1; )
    if (t = t.times(v), u = c.minus(t.div(a += 2)), t = t.times(v), c = u.plus(t.div(a += 2)), c.d[e] !== void 0)
      for (r = e; c.d[r] === u.d[r] && r--; )
        ;
  return n && (c = c.times(2 << n - 1)), hr = !0, sr(c, o.precision = i, o.rounding = f, !0);
};
G.isFinite = function() {
  return !!this.d;
};
G.isInteger = G.isInt = function() {
  return !!this.d && Yr(this.e / vr) > this.d.length - 2;
};
G.isNaN = function() {
  return !this.s;
};
G.isNegative = G.isNeg = function() {
  return this.s < 0;
};
G.isPositive = G.isPos = function() {
  return this.s > 0;
};
G.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
G.lessThan = G.lt = function(r) {
  return this.cmp(r) < 0;
};
G.lessThanOrEqualTo = G.lte = function(r) {
  return this.cmp(r) < 1;
};
G.logarithm = G.log = function(r) {
  var e, n, a, t, u, c, p, v, l = this, o = l.constructor, i = o.precision, f = o.rounding, h = 5;
  if (r == null)
    r = new o(10), e = !0;
  else {
    if (r = new o(r), n = r.d, r.s < 0 || !n || !n[0] || r.eq(1))
      return new o(NaN);
    e = r.eq(10);
  }
  if (n = l.d, l.s < 0 || !n || !n[0] || l.eq(1))
    return new o(n && !n[0] ? -1 / 0 : l.s != 1 ? NaN : n ? 0 : 1 / 0);
  if (e)
    if (n.length > 1)
      u = !0;
    else {
      for (t = n[0]; t % 10 === 0; )
        t /= 10;
      u = t !== 1;
    }
  if (hr = !1, p = i + h, c = ye(l, p), a = e ? mt(o, p + 10) : ye(r, p), v = Br(c, a, p, 1), ke(v.d, t = i, f))
    do
      if (p += 10, c = ye(l, p), a = e ? mt(o, p + 10) : ye(r, p), v = Br(c, a, p, 1), !u) {
        +Zr(v.d).slice(t + 1, t + 15) + 1 == 1e14 && (v = sr(v, i + 1, 0));
        break;
      }
    while (ke(v.d, t += 10, f));
  return hr = !0, sr(v, i, f);
};
G.minus = G.sub = function(r) {
  var e, n, a, t, u, c, p, v, l, o, i, f, h = this, d = h.constructor;
  if (r = new d(r), !h.d || !r.d)
    return !h.s || !r.s ? r = new d(NaN) : h.d ? r.s = -r.s : r = new d(r.d || h.s !== r.s ? h : NaN), r;
  if (h.s != r.s)
    return r.s = -r.s, h.plus(r);
  if (l = h.d, f = r.d, p = d.precision, v = d.rounding, !l[0] || !f[0]) {
    if (f[0])
      r.s = -r.s;
    else if (l[0])
      r = new d(h);
    else
      return new d(v === 3 ? -0 : 0);
    return hr ? sr(r, p, v) : r;
  }
  if (n = Yr(r.e / vr), o = Yr(h.e / vr), l = l.slice(), u = o - n, u) {
    for (i = u < 0, i ? (e = l, u = -u, c = f.length) : (e = f, n = o, c = l.length), a = Math.max(Math.ceil(p / vr), c) + 2, u > a && (u = a, e.length = 1), e.reverse(), a = u; a--; )
      e.push(0);
    e.reverse();
  } else {
    for (a = l.length, c = f.length, i = a < c, i && (c = a), a = 0; a < c; a++)
      if (l[a] != f[a]) {
        i = l[a] < f[a];
        break;
      }
    u = 0;
  }
  for (i && (e = l, l = f, f = e, r.s = -r.s), c = l.length, a = f.length - c; a > 0; --a)
    l[c++] = 0;
  for (a = f.length; a > u; ) {
    if (l[--a] < f[a]) {
      for (t = a; t && l[--t] === 0; )
        l[t] = ue - 1;
      --l[t], l[a] += ue;
    }
    l[a] -= f[a];
  }
  for (; l[--c] === 0; )
    l.pop();
  for (; l[0] === 0; l.shift())
    --n;
  return l[0] ? (r.d = l, r.e = Bt(l, n), hr ? sr(r, p, v) : r) : new d(v === 3 ? -0 : 0);
};
G.modulo = G.mod = function(r) {
  var e, n = this, a = n.constructor;
  return r = new a(r), !n.d || !r.s || r.d && !r.d[0] ? new a(NaN) : !r.d || n.d && !n.d[0] ? sr(new a(n), a.precision, a.rounding) : (hr = !1, a.modulo == 9 ? (e = Br(n, r.abs(), 0, 3, 1), e.s *= r.s) : e = Br(n, r, 0, a.modulo, 1), e = e.times(r), hr = !0, n.minus(e));
};
G.naturalExponential = G.exp = function() {
  return Yt(this);
};
G.naturalLogarithm = G.ln = function() {
  return ye(this);
};
G.negated = G.neg = function() {
  var r = new this.constructor(this);
  return r.s = -r.s, sr(r);
};
G.plus = G.add = function(r) {
  var e, n, a, t, u, c, p, v, l, o, i = this, f = i.constructor;
  if (r = new f(r), !i.d || !r.d)
    return !i.s || !r.s ? r = new f(NaN) : i.d || (r = new f(r.d || i.s === r.s ? i : NaN)), r;
  if (i.s != r.s)
    return r.s = -r.s, i.minus(r);
  if (l = i.d, o = r.d, p = f.precision, v = f.rounding, !l[0] || !o[0])
    return o[0] || (r = new f(i)), hr ? sr(r, p, v) : r;
  if (u = Yr(i.e / vr), a = Yr(r.e / vr), l = l.slice(), t = u - a, t) {
    for (t < 0 ? (n = l, t = -t, c = o.length) : (n = o, a = u, c = l.length), u = Math.ceil(p / vr), c = u > c ? u + 1 : c + 1, t > c && (t = c, n.length = 1), n.reverse(); t--; )
      n.push(0);
    n.reverse();
  }
  for (c = l.length, t = o.length, c - t < 0 && (t = c, n = o, o = l, l = n), e = 0; t; )
    e = (l[--t] = l[t] + o[t] + e) / ue | 0, l[t] %= ue;
  for (e && (l.unshift(e), ++a), c = l.length; l[--c] == 0; )
    l.pop();
  return r.d = l, r.e = Bt(l, a), hr ? sr(r, p, v) : r;
};
G.precision = G.sd = function(r) {
  var e, n = this;
  if (r !== void 0 && r !== !!r && r !== 1 && r !== 0)
    throw Error(we + r);
  return n.d ? (e = Za(n.d), r && n.e + 1 > e && (e = n.e + 1)) : e = NaN, e;
};
G.round = function() {
  var r = this, e = r.constructor;
  return sr(new e(r), r.e + 1, e.rounding);
};
G.sine = G.sin = function() {
  var r, e, n = this, a = n.constructor;
  return n.isFinite() ? n.isZero() ? new a(n) : (r = a.precision, e = a.rounding, a.precision = r + Math.max(n.e, n.sd()) + vr, a.rounding = 1, n = no(a, Qa(a, n)), a.precision = r, a.rounding = e, sr(ve > 2 ? n.neg() : n, r, e, !0)) : new a(NaN);
};
G.squareRoot = G.sqrt = function() {
  var r, e, n, a, t, u, c = this, p = c.d, v = c.e, l = c.s, o = c.constructor;
  if (l !== 1 || !p || !p[0])
    return new o(!l || l < 0 && (!p || p[0]) ? NaN : p ? c : 1 / 0);
  for (hr = !1, l = Math.sqrt(+c), l == 0 || l == 1 / 0 ? (e = Zr(p), (e.length + v) % 2 == 0 && (e += "0"), l = Math.sqrt(e), v = Yr((v + 1) / 2) - (v < 0 || v % 2), l == 1 / 0 ? e = "5e" + v : (e = l.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + v), a = new o(e)) : a = new o(l.toString()), n = (v = o.precision) + 3; ; )
    if (u = a, a = u.plus(Br(c, u, n + 2, 1)).times(0.5), Zr(u.d).slice(0, n) === (e = Zr(a.d)).slice(0, n))
      if (e = e.slice(n - 3, n + 1), e == "9999" || !t && e == "4999") {
        if (!t && (sr(u, v + 1, 0), u.times(u).eq(c))) {
          a = u;
          break;
        }
        n += 4, t = 1;
      } else {
        (!+e || !+e.slice(1) && e.charAt(0) == "5") && (sr(a, v + 1, 1), r = !a.times(a).eq(c));
        break;
      }
  return hr = !0, sr(a, v, o.rounding, r);
};
G.tangent = G.tan = function() {
  var r, e, n = this, a = n.constructor;
  return n.isFinite() ? n.isZero() ? new a(n) : (r = a.precision, e = a.rounding, a.precision = r + 10, a.rounding = 1, n = n.sin(), n.s = 1, n = Br(n, new a(1).minus(n.times(n)).sqrt(), r + 10, 0), a.precision = r, a.rounding = e, sr(ve == 2 || ve == 4 ? n.neg() : n, r, e, !0)) : new a(NaN);
};
G.times = G.mul = function(r) {
  var e, n, a, t, u, c, p, v, l, o = this, i = o.constructor, f = o.d, h = (r = new i(r)).d;
  if (r.s *= o.s, !f || !f[0] || !h || !h[0])
    return new i(!r.s || f && !f[0] && !h || h && !h[0] && !f ? NaN : !f || !h ? r.s / 0 : r.s * 0);
  for (n = Yr(o.e / vr) + Yr(r.e / vr), v = f.length, l = h.length, v < l && (u = f, f = h, h = u, c = v, v = l, l = c), u = [], c = v + l, a = c; a--; )
    u.push(0);
  for (a = l; --a >= 0; ) {
    for (e = 0, t = v + a; t > a; )
      p = u[t] + h[a] * f[t - a - 1] + e, u[t--] = p % ue | 0, e = p / ue | 0;
    u[t] = (u[t] + e) % ue | 0;
  }
  for (; !u[--c]; )
    u.pop();
  return e ? ++n : u.shift(), r.d = u, r.e = Bt(u, n), hr ? sr(r, i.precision, i.rounding) : r;
};
G.toBinary = function(r, e) {
  return kt(this, 2, r, e);
};
G.toDecimalPlaces = G.toDP = function(r, e) {
  var n = this, a = n.constructor;
  return n = new a(n), r === void 0 ? n : (Hr(r, 0, Ae), e === void 0 ? e = a.rounding : Hr(e, 0, 8), sr(n, r + n.e + 1, e));
};
G.toExponential = function(r, e) {
  var n, a = this, t = a.constructor;
  return r === void 0 ? n = fe(a, !0) : (Hr(r, 0, Ae), e === void 0 ? e = t.rounding : Hr(e, 0, 8), a = sr(new t(a), r + 1, e), n = fe(a, !0, r + 1)), a.isNeg() && !a.isZero() ? "-" + n : n;
};
G.toFixed = function(r, e) {
  var n, a, t = this, u = t.constructor;
  return r === void 0 ? n = fe(t) : (Hr(r, 0, Ae), e === void 0 ? e = u.rounding : Hr(e, 0, 8), a = sr(new u(t), r + t.e + 1, e), n = fe(a, !1, r + a.e + 1)), t.isNeg() && !t.isZero() ? "-" + n : n;
};
G.toFraction = function(r) {
  var e, n, a, t, u, c, p, v, l, o, i, f, h = this, d = h.d, s = h.constructor;
  if (!d)
    return new s(h);
  if (l = n = new s(1), a = v = new s(0), e = new s(a), u = e.e = Za(d) - h.e - 1, c = u % vr, e.d[0] = Or(10, c < 0 ? vr + c : c), r == null)
    r = u > 0 ? e : l;
  else {
    if (p = new s(r), !p.isInt() || p.lt(l))
      throw Error(we + p);
    r = p.gt(e) ? u > 0 ? e : l : p;
  }
  for (hr = !1, p = new s(Zr(d)), o = s.precision, s.precision = u = d.length * vr * 2; i = Br(p, e, 0, 1, 1), t = n.plus(i.times(a)), t.cmp(r) != 1; )
    n = a, a = t, t = l, l = v.plus(i.times(t)), v = t, t = e, e = p.minus(i.times(t)), p = t;
  return t = Br(r.minus(n), a, 0, 1, 1), v = v.plus(t.times(l)), n = n.plus(t.times(a)), v.s = l.s = h.s, f = Br(l, a, u, 1).minus(h).abs().cmp(Br(v, n, u, 1).minus(h).abs()) < 1 ? [l, a] : [v, n], s.precision = o, hr = !0, f;
};
G.toHexadecimal = G.toHex = function(r, e) {
  return kt(this, 16, r, e);
};
G.toNearest = function(r, e) {
  var n = this, a = n.constructor;
  if (n = new a(n), r == null) {
    if (!n.d)
      return n;
    r = new a(1), e = a.rounding;
  } else {
    if (r = new a(r), e === void 0 ? e = a.rounding : Hr(e, 0, 8), !n.d)
      return r.s ? n : r;
    if (!r.d)
      return r.s && (r.s = n.s), r;
  }
  return r.d[0] ? (hr = !1, n = Br(n, r, 0, e, 1).times(r), hr = !0, sr(n)) : (r.s = n.s, n = r), n;
};
G.toNumber = function() {
  return +this;
};
G.toOctal = function(r, e) {
  return kt(this, 8, r, e);
};
G.toPower = G.pow = function(r) {
  var e, n, a, t, u, c, p = this, v = p.constructor, l = +(r = new v(r));
  if (!p.d || !r.d || !p.d[0] || !r.d[0])
    return new v(Or(+p, l));
  if (p = new v(p), p.eq(1))
    return p;
  if (a = v.precision, u = v.rounding, r.eq(1))
    return sr(p, a, u);
  if (e = Yr(r.e / vr), e >= r.d.length - 1 && (n = l < 0 ? -l : l) <= ju)
    return t = Va(v, p, n, a), r.s < 0 ? new v(1).div(t) : sr(t, a, u);
  if (c = p.s, c < 0) {
    if (e < r.d.length - 1)
      return new v(NaN);
    if (r.d[e] & 1 || (c = 1), p.e == 0 && p.d[0] == 1 && p.d.length == 1)
      return p.s = c, p;
  }
  return n = Or(+p, l), e = n == 0 || !isFinite(n) ? Yr(l * (Math.log("0." + Zr(p.d)) / Math.LN10 + p.e + 1)) : new v(n + "").e, e > v.maxE + 1 || e < v.minE - 1 ? new v(e > 0 ? c / 0 : 0) : (hr = !1, v.rounding = p.s = 1, n = Math.min(12, (e + "").length), t = Yt(r.times(ye(p, a + n)), a), t.d && (t = sr(t, a + 5, 1), ke(t.d, a, u) && (e = a + 10, t = sr(Yt(r.times(ye(p, e + n)), e), e + 5, 1), +Zr(t.d).slice(a + 1, a + 15) + 1 == 1e14 && (t = sr(t, a + 1, 0)))), t.s = c, hr = !0, v.rounding = u, sr(t, a, u));
};
G.toPrecision = function(r, e) {
  var n, a = this, t = a.constructor;
  return r === void 0 ? n = fe(a, a.e <= t.toExpNeg || a.e >= t.toExpPos) : (Hr(r, 1, Ae), e === void 0 ? e = t.rounding : Hr(e, 0, 8), a = sr(new t(a), r, e), n = fe(a, r <= a.e || a.e <= t.toExpNeg, r)), a.isNeg() && !a.isZero() ? "-" + n : n;
};
G.toSignificantDigits = G.toSD = function(r, e) {
  var n = this, a = n.constructor;
  return r === void 0 ? (r = a.precision, e = a.rounding) : (Hr(r, 1, Ae), e === void 0 ? e = a.rounding : Hr(e, 0, 8)), sr(new a(n), r, e);
};
G.toString = function() {
  var r = this, e = r.constructor, n = fe(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() && !r.isZero() ? "-" + n : n;
};
G.truncated = G.trunc = function() {
  return sr(new this.constructor(this), this.e + 1, 1);
};
G.valueOf = G.toJSON = function() {
  var r = this, e = r.constructor, n = fe(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() ? "-" + n : n;
};
function Zr(r) {
  var e, n, a, t = r.length - 1, u = "", c = r[0];
  if (t > 0) {
    for (u += c, e = 1; e < t; e++)
      a = r[e] + "", n = vr - a.length, n && (u += De(n)), u += a;
    c = r[e], a = c + "", n = vr - a.length, n && (u += De(n));
  } else if (c === 0)
    return "0";
  for (; c % 10 === 0; )
    c /= 10;
  return u + c;
}
function Hr(r, e, n) {
  if (r !== ~~r || r < e || r > n)
    throw Error(we + r);
}
function ke(r, e, n, a) {
  var t, u, c, p;
  for (u = r[0]; u >= 10; u /= 10)
    --e;
  return --e < 0 ? (e += vr, t = 0) : (t = Math.ceil((e + 1) / vr), e %= vr), u = Or(10, vr - e), p = r[t] % u | 0, a == null ? e < 3 ? (e == 0 ? p = p / 100 | 0 : e == 1 && (p = p / 10 | 0), c = n < 4 && p == 99999 || n > 3 && p == 49999 || p == 5e4 || p == 0) : c = (n < 4 && p + 1 == u || n > 3 && p + 1 == u / 2) && (r[t + 1] / u / 100 | 0) == Or(10, e - 2) - 1 || (p == u / 2 || p == 0) && (r[t + 1] / u / 100 | 0) == 0 : e < 4 ? (e == 0 ? p = p / 1e3 | 0 : e == 1 ? p = p / 100 | 0 : e == 2 && (p = p / 10 | 0), c = (a || n < 4) && p == 9999 || !a && n > 3 && p == 4999) : c = ((a || n < 4) && p + 1 == u || !a && n > 3 && p + 1 == u / 2) && (r[t + 1] / u / 1e3 | 0) == Or(10, e - 3) - 1, c;
}
function ot(r, e, n) {
  for (var a, t = [0], u, c = 0, p = r.length; c < p; ) {
    for (u = t.length; u--; )
      t[u] *= e;
    for (t[0] += Lt.indexOf(r.charAt(c++)), a = 0; a < t.length; a++)
      t[a] > n - 1 && (t[a + 1] === void 0 && (t[a + 1] = 0), t[a + 1] += t[a] / n | 0, t[a] %= n);
  }
  return t.reverse();
}
function eo(r, e) {
  var n, a, t;
  if (e.isZero())
    return e;
  a = e.d.length, a < 32 ? (n = Math.ceil(a / 3), t = (1 / Nt(4, n)).toString()) : (n = 16, t = "2.3283064365386962890625e-10"), r.precision += n, e = Re(r, 1, e.times(t), new r(1));
  for (var u = n; u--; ) {
    var c = e.times(e);
    e = c.times(c).minus(c).times(8).plus(1);
  }
  return r.precision -= n, e;
}
var Br = function() {
  function r(a, t, u) {
    var c, p = 0, v = a.length;
    for (a = a.slice(); v--; )
      c = a[v] * t + p, a[v] = c % u | 0, p = c / u | 0;
    return p && a.unshift(p), a;
  }
  function e(a, t, u, c) {
    var p, v;
    if (u != c)
      v = u > c ? 1 : -1;
    else
      for (p = v = 0; p < u; p++)
        if (a[p] != t[p]) {
          v = a[p] > t[p] ? 1 : -1;
          break;
        }
    return v;
  }
  function n(a, t, u, c) {
    for (var p = 0; u--; )
      a[u] -= p, p = a[u] < t[u] ? 1 : 0, a[u] = p * c + a[u] - t[u];
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(a, t, u, c, p, v) {
    var l, o, i, f, h, d, s, m, D, w, y, A, C, g, M, E, b, F, B, S, z = a.constructor, $ = a.s == t.s ? 1 : -1, O = a.d, x = t.d;
    if (!O || !O[0] || !x || !x[0])
      return new z(
        // Return NaN if either NaN, or both Infinity or 0.
        !a.s || !t.s || (O ? x && O[0] == x[0] : !x) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          O && O[0] == 0 || !x ? $ * 0 : $ / 0
        )
      );
    for (v ? (h = 1, o = a.e - t.e) : (v = ue, h = vr, o = Yr(a.e / h) - Yr(t.e / h)), B = x.length, b = O.length, D = new z($), w = D.d = [], i = 0; x[i] == (O[i] || 0); i++)
      ;
    if (x[i] > (O[i] || 0) && o--, u == null ? (g = u = z.precision, c = z.rounding) : p ? g = u + (a.e - t.e) + 1 : g = u, g < 0)
      w.push(1), d = !0;
    else {
      if (g = g / h + 2 | 0, i = 0, B == 1) {
        for (f = 0, x = x[0], g++; (i < b || f) && g--; i++)
          M = f * v + (O[i] || 0), w[i] = M / x | 0, f = M % x | 0;
        d = f || i < b;
      } else {
        for (f = v / (x[0] + 1) | 0, f > 1 && (x = r(x, f, v), O = r(O, f, v), B = x.length, b = O.length), E = B, y = O.slice(0, B), A = y.length; A < B; )
          y[A++] = 0;
        S = x.slice(), S.unshift(0), F = x[0], x[1] >= v / 2 && ++F;
        do
          f = 0, l = e(x, y, B, A), l < 0 ? (C = y[0], B != A && (C = C * v + (y[1] || 0)), f = C / F | 0, f > 1 ? (f >= v && (f = v - 1), s = r(x, f, v), m = s.length, A = y.length, l = e(s, y, m, A), l == 1 && (f--, n(s, B < m ? S : x, m, v))) : (f == 0 && (l = f = 1), s = x.slice()), m = s.length, m < A && s.unshift(0), n(y, s, A, v), l == -1 && (A = y.length, l = e(x, y, B, A), l < 1 && (f++, n(y, B < A ? S : x, A, v))), A = y.length) : l === 0 && (f++, y = [0]), w[i++] = f, l && y[0] ? y[A++] = O[E] || 0 : (y = [O[E]], A = 1);
        while ((E++ < b || y[0] !== void 0) && g--);
        d = y[0] !== void 0;
      }
      w[0] || w.shift();
    }
    if (h == 1)
      D.e = o, qa = d;
    else {
      for (i = 1, f = w[0]; f >= 10; f /= 10)
        i++;
      D.e = i + o * h - 1, sr(D, p ? u + D.e + 1 : u, c, d);
    }
    return D;
  };
}();
function sr(r, e, n, a) {
  var t, u, c, p, v, l, o, i, f, h = r.constructor;
  r:
    if (e != null) {
      if (i = r.d, !i)
        return r;
      for (t = 1, p = i[0]; p >= 10; p /= 10)
        t++;
      if (u = e - t, u < 0)
        u += vr, c = e, o = i[f = 0], v = o / Or(10, t - c - 1) % 10 | 0;
      else if (f = Math.ceil((u + 1) / vr), p = i.length, f >= p)
        if (a) {
          for (; p++ <= f; )
            i.push(0);
          o = v = 0, t = 1, u %= vr, c = u - vr + 1;
        } else
          break r;
      else {
        for (o = p = i[f], t = 1; p >= 10; p /= 10)
          t++;
        u %= vr, c = u - vr + t, v = c < 0 ? 0 : o / Or(10, t - c - 1) % 10 | 0;
      }
      if (a = a || e < 0 || i[f + 1] !== void 0 || (c < 0 ? o : o % Or(10, t - c - 1)), l = n < 4 ? (v || a) && (n == 0 || n == (r.s < 0 ? 3 : 2)) : v > 5 || v == 5 && (n == 4 || a || n == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (u > 0 ? c > 0 ? o / Or(10, t - c) : 0 : i[f - 1]) % 10 & 1 || n == (r.s < 0 ? 8 : 7)), e < 1 || !i[0])
        return i.length = 0, l ? (e -= r.e + 1, i[0] = Or(10, (vr - e % vr) % vr), r.e = -e || 0) : i[0] = r.e = 0, r;
      if (u == 0 ? (i.length = f, p = 1, f--) : (i.length = f + 1, p = Or(10, vr - u), i[f] = c > 0 ? (o / Or(10, t - c) % Or(10, c) | 0) * p : 0), l)
        for (; ; )
          if (f == 0) {
            for (u = 1, c = i[0]; c >= 10; c /= 10)
              u++;
            for (c = i[0] += p, p = 1; c >= 10; c /= 10)
              p++;
            u != p && (r.e++, i[0] == ue && (i[0] = 1));
            break;
          } else {
            if (i[f] += p, i[f] != ue)
              break;
            i[f--] = 0, p = 1;
          }
      for (u = i.length; i[--u] === 0; )
        i.pop();
    }
  return hr && (r.e > h.maxE ? (r.d = null, r.e = NaN) : r.e < h.minE && (r.e = 0, r.d = [0])), r;
}
function fe(r, e, n) {
  if (!r.isFinite())
    return Ja(r);
  var a, t = r.e, u = Zr(r.d), c = u.length;
  return e ? (n && (a = n - c) > 0 ? u = u.charAt(0) + "." + u.slice(1) + De(a) : c > 1 && (u = u.charAt(0) + "." + u.slice(1)), u = u + (r.e < 0 ? "e" : "e+") + r.e) : t < 0 ? (u = "0." + De(-t - 1) + u, n && (a = n - c) > 0 && (u += De(a))) : t >= c ? (u += De(t + 1 - c), n && (a = n - t - 1) > 0 && (u = u + "." + De(a))) : ((a = t + 1) < c && (u = u.slice(0, a) + "." + u.slice(a)), n && (a = n - c) > 0 && (t + 1 === c && (u += "."), u += De(a))), u;
}
function Bt(r, e) {
  var n = r[0];
  for (e *= vr; n >= 10; n /= 10)
    e++;
  return e;
}
function mt(r, e, n) {
  if (e > ro)
    throw hr = !0, n && (r.precision = n), Error(Pa);
  return sr(new r(pt), e, 1, !0);
}
function ie(r, e, n) {
  if (e > Vt)
    throw Error(Pa);
  return sr(new r(dt), e, n, !0);
}
function Za(r) {
  var e = r.length - 1, n = e * vr + 1;
  if (e = r[e], e) {
    for (; e % 10 == 0; e /= 10)
      n--;
    for (e = r[0]; e >= 10; e /= 10)
      n++;
  }
  return n;
}
function De(r) {
  for (var e = ""; r--; )
    e += "0";
  return e;
}
function Va(r, e, n, a) {
  var t, u = new r(1), c = Math.ceil(a / vr + 4);
  for (hr = !1; ; ) {
    if (n % 2 && (u = u.times(e), Mn(u.d, c) && (t = !0)), n = Yr(n / 2), n === 0) {
      n = u.d.length - 1, t && u.d[n] === 0 && ++u.d[n];
      break;
    }
    e = e.times(e), Mn(e.d, c);
  }
  return hr = !0, u;
}
function bn(r) {
  return r.d[r.d.length - 1] & 1;
}
function Ya(r, e, n) {
  for (var a, t = new r(e[0]), u = 0; ++u < e.length; )
    if (a = new r(e[u]), a.s)
      t[n](a) && (t = a);
    else {
      t = a;
      break;
    }
  return t;
}
function Yt(r, e) {
  var n, a, t, u, c, p, v, l = 0, o = 0, i = 0, f = r.constructor, h = f.rounding, d = f.precision;
  if (!r.d || !r.d[0] || r.e > 17)
    return new f(r.d ? r.d[0] ? r.s < 0 ? 0 : 1 / 0 : 1 : r.s ? r.s < 0 ? 0 : r : 0 / 0);
  for (e == null ? (hr = !1, v = d) : v = e, p = new f(0.03125); r.e > -2; )
    r = r.times(p), i += 5;
  for (a = Math.log(Or(2, i)) / Math.LN10 * 2 + 5 | 0, v += a, n = u = c = new f(1), f.precision = v; ; ) {
    if (u = sr(u.times(r), v, 1), n = n.times(++o), p = c.plus(Br(u, n, v, 1)), Zr(p.d).slice(0, v) === Zr(c.d).slice(0, v)) {
      for (t = i; t--; )
        c = sr(c.times(c), v, 1);
      if (e == null)
        if (l < 3 && ke(c.d, v - a, h, l))
          f.precision = v += 10, n = u = p = new f(1), o = 0, l++;
        else
          return sr(c, f.precision = d, h, hr = !0);
      else
        return f.precision = d, c;
    }
    c = p;
  }
}
function ye(r, e) {
  var n, a, t, u, c, p, v, l, o, i, f, h = 1, d = 10, s = r, m = s.d, D = s.constructor, w = D.rounding, y = D.precision;
  if (s.s < 0 || !m || !m[0] || !s.e && m[0] == 1 && m.length == 1)
    return new D(m && !m[0] ? -1 / 0 : s.s != 1 ? NaN : m ? 0 : s);
  if (e == null ? (hr = !1, o = y) : o = e, D.precision = o += d, n = Zr(m), a = n.charAt(0), Math.abs(u = s.e) < 15e14) {
    for (; a < 7 && a != 1 || a == 1 && n.charAt(1) > 3; )
      s = s.times(r), n = Zr(s.d), a = n.charAt(0), h++;
    u = s.e, a > 1 ? (s = new D("0." + n), u++) : s = new D(a + "." + n.slice(1));
  } else
    return l = mt(D, o + 2, y).times(u + ""), s = ye(new D(a + "." + n.slice(1)), o - d).plus(l), D.precision = y, e == null ? sr(s, y, w, hr = !0) : s;
  for (i = s, v = c = s = Br(s.minus(1), s.plus(1), o, 1), f = sr(s.times(s), o, 1), t = 3; ; ) {
    if (c = sr(c.times(f), o, 1), l = v.plus(Br(c, new D(t), o, 1)), Zr(l.d).slice(0, o) === Zr(v.d).slice(0, o))
      if (v = v.times(2), u !== 0 && (v = v.plus(mt(D, o + 2, y).times(u + ""))), v = Br(v, new D(h), o, 1), e == null)
        if (ke(v.d, o - d, w, p))
          D.precision = o += d, l = c = s = Br(i.minus(1), i.plus(1), o, 1), f = sr(s.times(s), o, 1), t = p = 1;
        else
          return sr(v, D.precision = y, w, hr = !0);
      else
        return D.precision = y, v;
    v = l, t += 2;
  }
}
function Ja(r) {
  return String(r.s * r.s / 0);
}
function Jt(r, e) {
  var n, a, t;
  for ((n = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (a = e.search(/e/i)) > 0 ? (n < 0 && (n = a), n += +e.slice(a + 1), e = e.substring(0, a)) : n < 0 && (n = e.length), a = 0; e.charCodeAt(a) === 48; a++)
    ;
  for (t = e.length; e.charCodeAt(t - 1) === 48; --t)
    ;
  if (e = e.slice(a, t), e) {
    if (t -= a, r.e = n = n - a - 1, r.d = [], a = (n + 1) % vr, n < 0 && (a += vr), a < t) {
      for (a && r.d.push(+e.slice(0, a)), t -= vr; a < t; )
        r.d.push(+e.slice(a, a += vr));
      e = e.slice(a), a = vr - e.length;
    } else
      a -= t;
    for (; a--; )
      e += "0";
    r.d.push(+e), hr && (r.e > r.constructor.maxE ? (r.d = null, r.e = NaN) : r.e < r.constructor.minE && (r.e = 0, r.d = [0]));
  } else
    r.e = 0, r.d = [0];
  return r;
}
function to(r, e) {
  var n, a, t, u, c, p, v, l, o;
  if (e.indexOf("_") > -1) {
    if (e = e.replace(/(\d)_(?=\d)/g, "$1"), La.test(e))
      return Jt(r, e);
  } else if (e === "Infinity" || e === "NaN")
    return +e || (r.s = NaN), r.e = NaN, r.d = null, r;
  if (Hu.test(e))
    n = 16, e = e.toLowerCase();
  else if (Wu.test(e))
    n = 2;
  else if (ku.test(e))
    n = 8;
  else
    throw Error(we + e);
  for (u = e.search(/p/i), u > 0 ? (v = +e.slice(u + 1), e = e.substring(2, u)) : e = e.slice(2), u = e.indexOf("."), c = u >= 0, a = r.constructor, c && (e = e.replace(".", ""), p = e.length, u = p - u, t = Va(a, new a(n), u, u * 2)), l = ot(e, n, ue), o = l.length - 1, u = o; l[u] === 0; --u)
    l.pop();
  return u < 0 ? new a(r.s * 0) : (r.e = Bt(l, o), r.d = l, hr = !1, c && (r = Br(r, t, p * 4)), v && (r = r.times(Math.abs(v) < 54 ? Or(2, v) : Ue.pow(2, v))), hr = !0, r);
}
function no(r, e) {
  var n, a = e.d.length;
  if (a < 3)
    return e.isZero() ? e : Re(r, 2, e, e);
  n = 1.4 * Math.sqrt(a), n = n > 16 ? 16 : n | 0, e = e.times(1 / Nt(5, n)), e = Re(r, 2, e, e);
  for (var t, u = new r(5), c = new r(16), p = new r(20); n--; )
    t = e.times(e), e = e.times(u.plus(t.times(c.times(t).minus(p))));
  return e;
}
function Re(r, e, n, a, t) {
  var u, c, p, v, l = r.precision, o = Math.ceil(l / vr);
  for (hr = !1, v = n.times(n), p = new r(a); ; ) {
    if (c = Br(p.times(v), new r(e++ * e++), l, 1), p = t ? a.plus(c) : a.minus(c), a = Br(c.times(v), new r(e++ * e++), l, 1), c = p.plus(a), c.d[o] !== void 0) {
      for (u = o; c.d[u] === p.d[u] && u--; )
        ;
      if (u == -1)
        break;
    }
    u = p, p = a, a = c, c = u;
  }
  return hr = !0, c.d.length = o + 1, c;
}
function Nt(r, e) {
  for (var n = r; --e; )
    n *= r;
  return n;
}
function Qa(r, e) {
  var n, a = e.s < 0, t = ie(r, r.precision, 1), u = t.times(0.5);
  if (e = e.abs(), e.lte(u))
    return ve = a ? 4 : 1, e;
  if (n = e.divToInt(t), n.isZero())
    ve = a ? 3 : 2;
  else {
    if (e = e.minus(n.times(t)), e.lte(u))
      return ve = bn(n) ? a ? 2 : 3 : a ? 4 : 1, e;
    ve = bn(n) ? a ? 1 : 4 : a ? 3 : 2;
  }
  return e.minus(t).abs();
}
function kt(r, e, n, a) {
  var t, u, c, p, v, l, o, i, f, h = r.constructor, d = n !== void 0;
  if (d ? (Hr(n, 1, Ae), a === void 0 ? a = h.rounding : Hr(a, 0, 8)) : (n = h.precision, a = h.rounding), !r.isFinite())
    o = Ja(r);
  else {
    for (o = fe(r), c = o.indexOf("."), d ? (t = 2, e == 16 ? n = n * 4 - 3 : e == 8 && (n = n * 3 - 2)) : t = e, c >= 0 && (o = o.replace(".", ""), f = new h(1), f.e = o.length - c, f.d = ot(fe(f), 10, t), f.e = f.d.length), i = ot(o, 10, t), u = v = i.length; i[--v] == 0; )
      i.pop();
    if (!i[0])
      o = d ? "0p+0" : "0";
    else {
      if (c < 0 ? u-- : (r = new h(r), r.d = i, r.e = u, r = Br(r, f, n, a, 0, t), i = r.d, u = r.e, l = qa), c = i[n], p = t / 2, l = l || i[n + 1] !== void 0, l = a < 4 ? (c !== void 0 || l) && (a === 0 || a === (r.s < 0 ? 3 : 2)) : c > p || c === p && (a === 4 || l || a === 6 && i[n - 1] & 1 || a === (r.s < 0 ? 8 : 7)), i.length = n, l)
        for (; ++i[--n] > t - 1; )
          i[n] = 0, n || (++u, i.unshift(1));
      for (v = i.length; !i[v - 1]; --v)
        ;
      for (c = 0, o = ""; c < v; c++)
        o += Lt.charAt(i[c]);
      if (d) {
        if (v > 1)
          if (e == 16 || e == 8) {
            for (c = e == 16 ? 4 : 3, --v; v % c; v++)
              o += "0";
            for (i = ot(o, t, e), v = i.length; !i[v - 1]; --v)
              ;
            for (c = 1, o = "1."; c < v; c++)
              o += Lt.charAt(i[c]);
          } else
            o = o.charAt(0) + "." + o.slice(1);
        o = o + (u < 0 ? "p" : "p+") + u;
      } else if (u < 0) {
        for (; ++u; )
          o = "0" + o;
        o = "0." + o;
      } else if (++u > v)
        for (u -= v; u--; )
          o += "0";
      else
        u < v && (o = o.slice(0, u) + "." + o.slice(u));
    }
    o = (e == 16 ? "0x" : e == 2 ? "0b" : e == 8 ? "0o" : "") + o;
  }
  return r.s < 0 ? "-" + o : o;
}
function Mn(r, e) {
  if (r.length > e)
    return r.length = e, !0;
}
function ao(r) {
  return new this(r).abs();
}
function io(r) {
  return new this(r).acos();
}
function uo(r) {
  return new this(r).acosh();
}
function oo(r, e) {
  return new this(r).plus(e);
}
function so(r) {
  return new this(r).asin();
}
function fo(r) {
  return new this(r).asinh();
}
function co(r) {
  return new this(r).atan();
}
function lo(r) {
  return new this(r).atanh();
}
function vo(r, e) {
  r = new this(r), e = new this(e);
  var n, a = this.precision, t = this.rounding, u = a + 4;
  return !r.s || !e.s ? n = new this(NaN) : !r.d && !e.d ? (n = ie(this, u, 1).times(e.s > 0 ? 0.25 : 0.75), n.s = r.s) : !e.d || r.isZero() ? (n = e.s < 0 ? ie(this, a, t) : new this(0), n.s = r.s) : !r.d || e.isZero() ? (n = ie(this, u, 1).times(0.5), n.s = r.s) : e.s < 0 ? (this.precision = u, this.rounding = 1, n = this.atan(Br(r, e, u, 1)), e = ie(this, u, 1), this.precision = a, this.rounding = t, n = r.s < 0 ? n.minus(e) : n.plus(e)) : n = this.atan(Br(r, e, u, 1)), n;
}
function ho(r) {
  return new this(r).cbrt();
}
function po(r) {
  return sr(r = new this(r), r.e + 1, 2);
}
function mo(r, e, n) {
  return new this(r).clamp(e, n);
}
function Do(r) {
  if (!r || typeof r != "object")
    throw Error(St + "Object expected");
  var e, n, a, t = r.defaults === !0, u = [
    "precision",
    1,
    Ae,
    "rounding",
    0,
    8,
    "toExpNeg",
    -$e,
    0,
    "toExpPos",
    0,
    $e,
    "maxE",
    0,
    $e,
    "minE",
    -$e,
    0,
    "modulo",
    0,
    9
  ];
  for (e = 0; e < u.length; e += 3)
    if (n = u[e], t && (this[n] = Zt[n]), (a = r[n]) !== void 0)
      if (Yr(a) === a && a >= u[e + 1] && a <= u[e + 2])
        this[n] = a;
      else
        throw Error(we + n + ": " + a);
  if (n = "crypto", t && (this[n] = Zt[n]), (a = r[n]) !== void 0)
    if (a === !0 || a === !1 || a === 0 || a === 1)
      if (a)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[n] = !0;
        else
          throw Error(Ra);
      else
        this[n] = !1;
    else
      throw Error(we + n + ": " + a);
  return this;
}
function go(r) {
  return new this(r).cos();
}
function yo(r) {
  return new this(r).cosh();
}
function Xa(r) {
  var e, n, a;
  function t(u) {
    var c, p, v, l = this;
    if (!(l instanceof t))
      return new t(u);
    if (l.constructor = t, Sn(u)) {
      l.s = u.s, hr ? !u.d || u.e > t.maxE ? (l.e = NaN, l.d = null) : u.e < t.minE ? (l.e = 0, l.d = [0]) : (l.e = u.e, l.d = u.d.slice()) : (l.e = u.e, l.d = u.d ? u.d.slice() : u.d);
      return;
    }
    if (v = typeof u, v === "number") {
      if (u === 0) {
        l.s = 1 / u < 0 ? -1 : 1, l.e = 0, l.d = [0];
        return;
      }
      if (u < 0 ? (u = -u, l.s = -1) : l.s = 1, u === ~~u && u < 1e7) {
        for (c = 0, p = u; p >= 10; p /= 10)
          c++;
        hr ? c > t.maxE ? (l.e = NaN, l.d = null) : c < t.minE ? (l.e = 0, l.d = [0]) : (l.e = c, l.d = [u]) : (l.e = c, l.d = [u]);
        return;
      } else if (u * 0 !== 0) {
        u || (l.s = NaN), l.e = NaN, l.d = null;
        return;
      }
      return Jt(l, u.toString());
    } else if (v !== "string")
      throw Error(we + u);
    return (p = u.charCodeAt(0)) === 45 ? (u = u.slice(1), l.s = -1) : (p === 43 && (u = u.slice(1)), l.s = 1), La.test(u) ? Jt(l, u) : to(l, u);
  }
  if (t.prototype = G, t.ROUND_UP = 0, t.ROUND_DOWN = 1, t.ROUND_CEIL = 2, t.ROUND_FLOOR = 3, t.ROUND_HALF_UP = 4, t.ROUND_HALF_DOWN = 5, t.ROUND_HALF_EVEN = 6, t.ROUND_HALF_CEIL = 7, t.ROUND_HALF_FLOOR = 8, t.EUCLID = 9, t.config = t.set = Do, t.clone = Xa, t.isDecimal = Sn, t.abs = ao, t.acos = io, t.acosh = uo, t.add = oo, t.asin = so, t.asinh = fo, t.atan = co, t.atanh = lo, t.atan2 = vo, t.cbrt = ho, t.ceil = po, t.clamp = mo, t.cos = go, t.cosh = yo, t.div = wo, t.exp = Ao, t.floor = Eo, t.hypot = Fo, t.ln = Co, t.log = bo, t.log10 = So, t.log2 = Mo, t.max = Bo, t.min = No, t.mod = xo, t.mul = _o, t.pow = zo, t.random = To, t.round = Io, t.sign = Oo, t.sin = $o, t.sinh = qo, t.sqrt = Po, t.sub = Ro, t.sum = Uo, t.tan = Lo, t.tanh = Zo, t.trunc = Vo, r === void 0 && (r = {}), r && r.defaults !== !0)
    for (a = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], e = 0; e < a.length; )
      r.hasOwnProperty(n = a[e++]) || (r[n] = this[n]);
  return t.config(r), t;
}
function wo(r, e) {
  return new this(r).div(e);
}
function Ao(r) {
  return new this(r).exp();
}
function Eo(r) {
  return sr(r = new this(r), r.e + 1, 3);
}
function Fo() {
  var r, e, n = new this(0);
  for (hr = !1, r = 0; r < arguments.length; )
    if (e = new this(arguments[r++]), e.d)
      n.d && (n = n.plus(e.times(e)));
    else {
      if (e.s)
        return hr = !0, new this(1 / 0);
      n = e;
    }
  return hr = !0, n.sqrt();
}
function Sn(r) {
  return r instanceof Ue || r && r.toStringTag === Ua || !1;
}
function Co(r) {
  return new this(r).ln();
}
function bo(r, e) {
  return new this(r).log(e);
}
function Mo(r) {
  return new this(r).log(2);
}
function So(r) {
  return new this(r).log(10);
}
function Bo() {
  return Ya(this, arguments, "lt");
}
function No() {
  return Ya(this, arguments, "gt");
}
function xo(r, e) {
  return new this(r).mod(e);
}
function _o(r, e) {
  return new this(r).mul(e);
}
function zo(r, e) {
  return new this(r).pow(e);
}
function To(r) {
  var e, n, a, t, u = 0, c = new this(1), p = [];
  if (r === void 0 ? r = this.precision : Hr(r, 1, Ae), a = Math.ceil(r / vr), this.crypto)
    if (crypto.getRandomValues)
      for (e = crypto.getRandomValues(new Uint32Array(a)); u < a; )
        t = e[u], t >= 429e7 ? e[u] = crypto.getRandomValues(new Uint32Array(1))[0] : p[u++] = t % 1e7;
    else if (crypto.randomBytes) {
      for (e = crypto.randomBytes(a *= 4); u < a; )
        t = e[u] + (e[u + 1] << 8) + (e[u + 2] << 16) + ((e[u + 3] & 127) << 24), t >= 214e7 ? crypto.randomBytes(4).copy(e, u) : (p.push(t % 1e7), u += 4);
      u = a / 4;
    } else
      throw Error(Ra);
  else
    for (; u < a; )
      p[u++] = Math.random() * 1e7 | 0;
  for (a = p[--u], r %= vr, a && r && (t = Or(10, vr - r), p[u] = (a / t | 0) * t); p[u] === 0; u--)
    p.pop();
  if (u < 0)
    n = 0, p = [0];
  else {
    for (n = -1; p[0] === 0; n -= vr)
      p.shift();
    for (a = 1, t = p[0]; t >= 10; t /= 10)
      a++;
    a < vr && (n -= vr - a);
  }
  return c.e = n, c.d = p, c;
}
function Io(r) {
  return sr(r = new this(r), r.e + 1, this.rounding);
}
function Oo(r) {
  return r = new this(r), r.d ? r.d[0] ? r.s : 0 * r.s : r.s || NaN;
}
function $o(r) {
  return new this(r).sin();
}
function qo(r) {
  return new this(r).sinh();
}
function Po(r) {
  return new this(r).sqrt();
}
function Ro(r, e) {
  return new this(r).sub(e);
}
function Uo() {
  var r = 0, e = arguments, n = new this(e[r]);
  for (hr = !1; n.s && ++r < e.length; )
    n = n.plus(e[r]);
  return hr = !0, sr(n, this.precision, this.rounding);
}
function Lo(r) {
  return new this(r).tan();
}
function Zo(r) {
  return new this(r).tanh();
}
function Vo(r) {
  return sr(r = new this(r), r.e + 1, 1);
}
G[Symbol.for("nodejs.util.inspect.custom")] = G.toString;
G[Symbol.toStringTag] = "Decimal";
var Ue = G.constructor = Xa(Zt);
pt = new Ue(pt);
dt = new Ue(dt);
var Yo = "BigNumber", Jo = ["?on", "config"], Qo = /* @__PURE__ */ k(Yo, Jo, (r) => {
  var {
    on: e,
    config: n
  } = r, a = Ue.clone({
    precision: n.precision,
    modulo: Ue.EUCLID
  });
  return a.prototype = Object.create(a.prototype), a.prototype.type = "BigNumber", a.prototype.isBigNumber = !0, a.prototype.toJSON = function() {
    return {
      mathjs: "BigNumber",
      value: this.toString()
    };
  }, a.fromJSON = function(t) {
    return new a(t.value);
  }, e && e("config", function(t, u) {
    t.precision !== u.precision && a.config({
      precision: t.precision
    });
  }), a;
}, {
  isClass: !0
});
function jt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Ga = { exports: {} };
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(r, e) {
  (function(n) {
    var a = Math.cosh || function(i) {
      return Math.abs(i) < 1e-9 ? 1 - i : (Math.exp(i) + Math.exp(-i)) * 0.5;
    }, t = Math.sinh || function(i) {
      return Math.abs(i) < 1e-9 ? i : (Math.exp(i) - Math.exp(-i)) * 0.5;
    }, u = function(i) {
      var f = Math.PI / 4;
      if (-f > i || i > f)
        return Math.cos(i) - 1;
      var h = i * i;
      return h * (h * (h * (h * (h * (h * (h * (h / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    }, c = function(i, f) {
      var h = Math.abs(i), d = Math.abs(f);
      return h < 3e3 && d < 3e3 ? Math.sqrt(h * h + d * d) : (h < d ? (h = d, d = i / f) : d = f / i, h * Math.sqrt(1 + d * d));
    }, p = function() {
      throw SyntaxError("Invalid Param");
    };
    function v(i, f) {
      var h = Math.abs(i), d = Math.abs(f);
      return i === 0 ? Math.log(d) : f === 0 ? Math.log(h) : h < 3e3 && d < 3e3 ? Math.log(i * i + f * f) * 0.5 : (i = i / 2, f = f / 2, 0.5 * Math.log(i * i + f * f) + Math.LN2);
    }
    var l = function(i, f) {
      var h = { re: 0, im: 0 };
      if (i == null)
        h.re = h.im = 0;
      else if (f !== void 0)
        h.re = i, h.im = f;
      else
        switch (typeof i) {
          case "object":
            if ("im" in i && "re" in i)
              h.re = i.re, h.im = i.im;
            else if ("abs" in i && "arg" in i) {
              if (!Number.isFinite(i.abs) && Number.isFinite(i.arg))
                return o.INFINITY;
              h.re = i.abs * Math.cos(i.arg), h.im = i.abs * Math.sin(i.arg);
            } else if ("r" in i && "phi" in i) {
              if (!Number.isFinite(i.r) && Number.isFinite(i.phi))
                return o.INFINITY;
              h.re = i.r * Math.cos(i.phi), h.im = i.r * Math.sin(i.phi);
            } else
              i.length === 2 ? (h.re = i[0], h.im = i[1]) : p();
            break;
          case "string":
            h.im = /* void */
            h.re = 0;
            var d = i.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), s = 1, m = 0;
            d === null && p();
            for (var D = 0; D < d.length; D++) {
              var w = d[D];
              w === " " || w === "	" || w === `
` || (w === "+" ? s++ : w === "-" ? m++ : w === "i" || w === "I" ? (s + m === 0 && p(), d[D + 1] !== " " && !isNaN(d[D + 1]) ? (h.im += parseFloat((m % 2 ? "-" : "") + d[D + 1]), D++) : h.im += parseFloat((m % 2 ? "-" : "") + "1"), s = m = 0) : ((s + m === 0 || isNaN(w)) && p(), d[D + 1] === "i" || d[D + 1] === "I" ? (h.im += parseFloat((m % 2 ? "-" : "") + w), D++) : h.re += parseFloat((m % 2 ? "-" : "") + w), s = m = 0));
            }
            s + m > 0 && p();
            break;
          case "number":
            h.im = 0, h.re = i;
            break;
          default:
            p();
        }
      return isNaN(h.re) || isNaN(h.im), h;
    };
    function o(i, f) {
      if (!(this instanceof o))
        return new o(i, f);
      var h = l(i, f);
      this.re = h.re, this.im = h.im;
    }
    o.prototype = {
      re: 0,
      im: 0,
      /**
       * Calculates the sign of a complex number, which is a normalized complex
       *
       * @returns {Complex}
       */
      sign: function() {
        var i = this.abs();
        return new o(
          this.re / i,
          this.im / i
        );
      },
      /**
       * Adds two complex numbers
       *
       * @returns {Complex}
       */
      add: function(i, f) {
        var h = new o(i, f);
        return this.isInfinite() && h.isInfinite() ? o.NAN : this.isInfinite() || h.isInfinite() ? o.INFINITY : new o(
          this.re + h.re,
          this.im + h.im
        );
      },
      /**
       * Subtracts two complex numbers
       *
       * @returns {Complex}
       */
      sub: function(i, f) {
        var h = new o(i, f);
        return this.isInfinite() && h.isInfinite() ? o.NAN : this.isInfinite() || h.isInfinite() ? o.INFINITY : new o(
          this.re - h.re,
          this.im - h.im
        );
      },
      /**
       * Multiplies two complex numbers
       *
       * @returns {Complex}
       */
      mul: function(i, f) {
        var h = new o(i, f);
        return this.isInfinite() && h.isZero() || this.isZero() && h.isInfinite() ? o.NAN : this.isInfinite() || h.isInfinite() ? o.INFINITY : h.im === 0 && this.im === 0 ? new o(this.re * h.re, 0) : new o(
          this.re * h.re - this.im * h.im,
          this.re * h.im + this.im * h.re
        );
      },
      /**
       * Divides two complex numbers
       *
       * @returns {Complex}
       */
      div: function(i, f) {
        var h = new o(i, f);
        if (this.isZero() && h.isZero() || this.isInfinite() && h.isInfinite())
          return o.NAN;
        if (this.isInfinite() || h.isZero())
          return o.INFINITY;
        if (this.isZero() || h.isInfinite())
          return o.ZERO;
        i = this.re, f = this.im;
        var d = h.re, s = h.im, m, D;
        return s === 0 ? new o(i / d, f / d) : Math.abs(d) < Math.abs(s) ? (D = d / s, m = d * D + s, new o(
          (i * D + f) / m,
          (f * D - i) / m
        )) : (D = s / d, m = s * D + d, new o(
          (i + f * D) / m,
          (f - i * D) / m
        ));
      },
      /**
       * Calculate the power of two complex numbers
       *
       * @returns {Complex}
       */
      pow: function(i, f) {
        var h = new o(i, f);
        if (i = this.re, f = this.im, h.isZero())
          return o.ONE;
        if (h.im === 0) {
          if (f === 0 && i > 0)
            return new o(Math.pow(i, h.re), 0);
          if (i === 0)
            switch ((h.re % 4 + 4) % 4) {
              case 0:
                return new o(Math.pow(f, h.re), 0);
              case 1:
                return new o(0, Math.pow(f, h.re));
              case 2:
                return new o(-Math.pow(f, h.re), 0);
              case 3:
                return new o(0, -Math.pow(f, h.re));
            }
        }
        if (i === 0 && f === 0 && h.re > 0 && h.im >= 0)
          return o.ZERO;
        var d = Math.atan2(f, i), s = v(i, f);
        return i = Math.exp(h.re * s - h.im * d), f = h.im * s + h.re * d, new o(
          i * Math.cos(f),
          i * Math.sin(f)
        );
      },
      /**
       * Calculate the complex square root
       *
       * @returns {Complex}
       */
      sqrt: function() {
        var i = this.re, f = this.im, h = this.abs(), d, s;
        if (i >= 0) {
          if (f === 0)
            return new o(Math.sqrt(i), 0);
          d = 0.5 * Math.sqrt(2 * (h + i));
        } else
          d = Math.abs(f) / Math.sqrt(2 * (h - i));
        return i <= 0 ? s = 0.5 * Math.sqrt(2 * (h - i)) : s = Math.abs(f) / Math.sqrt(2 * (h + i)), new o(d, f < 0 ? -s : s);
      },
      /**
       * Calculate the complex exponent
       *
       * @returns {Complex}
       */
      exp: function() {
        var i = Math.exp(this.re);
        return this.im, new o(
          i * Math.cos(this.im),
          i * Math.sin(this.im)
        );
      },
      /**
       * Calculate the complex exponent and subtracts one.
       *
       * This may be more accurate than `Complex(x).exp().sub(1)` if
       * `x` is small.
       *
       * @returns {Complex}
       */
      expm1: function() {
        var i = this.re, f = this.im;
        return new o(
          Math.expm1(i) * Math.cos(f) + u(f),
          Math.exp(i) * Math.sin(f)
        );
      },
      /**
       * Calculate the natural log
       *
       * @returns {Complex}
       */
      log: function() {
        var i = this.re, f = this.im;
        return new o(
          v(i, f),
          Math.atan2(f, i)
        );
      },
      /**
       * Calculate the magnitude of the complex number
       *
       * @returns {number}
       */
      abs: function() {
        return c(this.re, this.im);
      },
      /**
       * Calculate the angle of the complex number
       *
       * @returns {number}
       */
      arg: function() {
        return Math.atan2(this.im, this.re);
      },
      /**
       * Calculate the sine of the complex number
       *
       * @returns {Complex}
       */
      sin: function() {
        var i = this.re, f = this.im;
        return new o(
          Math.sin(i) * a(f),
          Math.cos(i) * t(f)
        );
      },
      /**
       * Calculate the cosine
       *
       * @returns {Complex}
       */
      cos: function() {
        var i = this.re, f = this.im;
        return new o(
          Math.cos(i) * a(f),
          -Math.sin(i) * t(f)
        );
      },
      /**
       * Calculate the tangent
       *
       * @returns {Complex}
       */
      tan: function() {
        var i = 2 * this.re, f = 2 * this.im, h = Math.cos(i) + a(f);
        return new o(
          Math.sin(i) / h,
          t(f) / h
        );
      },
      /**
       * Calculate the cotangent
       *
       * @returns {Complex}
       */
      cot: function() {
        var i = 2 * this.re, f = 2 * this.im, h = Math.cos(i) - a(f);
        return new o(
          -Math.sin(i) / h,
          t(f) / h
        );
      },
      /**
       * Calculate the secant
       *
       * @returns {Complex}
       */
      sec: function() {
        var i = this.re, f = this.im, h = 0.5 * a(2 * f) + 0.5 * Math.cos(2 * i);
        return new o(
          Math.cos(i) * a(f) / h,
          Math.sin(i) * t(f) / h
        );
      },
      /**
       * Calculate the cosecans
       *
       * @returns {Complex}
       */
      csc: function() {
        var i = this.re, f = this.im, h = 0.5 * a(2 * f) - 0.5 * Math.cos(2 * i);
        return new o(
          Math.sin(i) * a(f) / h,
          -Math.cos(i) * t(f) / h
        );
      },
      /**
       * Calculate the complex arcus sinus
       *
       * @returns {Complex}
       */
      asin: function() {
        var i = this.re, f = this.im, h = new o(
          f * f - i * i + 1,
          -2 * i * f
        ).sqrt(), d = new o(
          h.re - f,
          h.im + i
        ).log();
        return new o(d.im, -d.re);
      },
      /**
       * Calculate the complex arcus cosinus
       *
       * @returns {Complex}
       */
      acos: function() {
        var i = this.re, f = this.im, h = new o(
          f * f - i * i + 1,
          -2 * i * f
        ).sqrt(), d = new o(
          h.re - f,
          h.im + i
        ).log();
        return new o(Math.PI / 2 - d.im, d.re);
      },
      /**
       * Calculate the complex arcus tangent
       *
       * @returns {Complex}
       */
      atan: function() {
        var i = this.re, f = this.im;
        if (i === 0) {
          if (f === 1)
            return new o(0, 1 / 0);
          if (f === -1)
            return new o(0, -1 / 0);
        }
        var h = i * i + (1 - f) * (1 - f), d = new o(
          (1 - f * f - i * i) / h,
          -2 * i / h
        ).log();
        return new o(-0.5 * d.im, 0.5 * d.re);
      },
      /**
       * Calculate the complex arcus cotangent
       *
       * @returns {Complex}
       */
      acot: function() {
        var i = this.re, f = this.im;
        if (f === 0)
          return new o(Math.atan2(1, i), 0);
        var h = i * i + f * f;
        return h !== 0 ? new o(
          i / h,
          -f / h
        ).atan() : new o(
          i !== 0 ? i / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).atan();
      },
      /**
       * Calculate the complex arcus secant
       *
       * @returns {Complex}
       */
      asec: function() {
        var i = this.re, f = this.im;
        if (i === 0 && f === 0)
          return new o(0, 1 / 0);
        var h = i * i + f * f;
        return h !== 0 ? new o(
          i / h,
          -f / h
        ).acos() : new o(
          i !== 0 ? i / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).acos();
      },
      /**
       * Calculate the complex arcus cosecans
       *
       * @returns {Complex}
       */
      acsc: function() {
        var i = this.re, f = this.im;
        if (i === 0 && f === 0)
          return new o(Math.PI / 2, 1 / 0);
        var h = i * i + f * f;
        return h !== 0 ? new o(
          i / h,
          -f / h
        ).asin() : new o(
          i !== 0 ? i / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).asin();
      },
      /**
       * Calculate the complex sinh
       *
       * @returns {Complex}
       */
      sinh: function() {
        var i = this.re, f = this.im;
        return new o(
          t(i) * Math.cos(f),
          a(i) * Math.sin(f)
        );
      },
      /**
       * Calculate the complex cosh
       *
       * @returns {Complex}
       */
      cosh: function() {
        var i = this.re, f = this.im;
        return new o(
          a(i) * Math.cos(f),
          t(i) * Math.sin(f)
        );
      },
      /**
       * Calculate the complex tanh
       *
       * @returns {Complex}
       */
      tanh: function() {
        var i = 2 * this.re, f = 2 * this.im, h = a(i) + Math.cos(f);
        return new o(
          t(i) / h,
          Math.sin(f) / h
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      coth: function() {
        var i = 2 * this.re, f = 2 * this.im, h = a(i) - Math.cos(f);
        return new o(
          t(i) / h,
          -Math.sin(f) / h
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      csch: function() {
        var i = this.re, f = this.im, h = Math.cos(2 * f) - a(2 * i);
        return new o(
          -2 * t(i) * Math.cos(f) / h,
          2 * a(i) * Math.sin(f) / h
        );
      },
      /**
       * Calculate the complex sech
       *
       * @returns {Complex}
       */
      sech: function() {
        var i = this.re, f = this.im, h = Math.cos(2 * f) + a(2 * i);
        return new o(
          2 * a(i) * Math.cos(f) / h,
          -2 * t(i) * Math.sin(f) / h
        );
      },
      /**
       * Calculate the complex asinh
       *
       * @returns {Complex}
       */
      asinh: function() {
        var i = this.im;
        this.im = -this.re, this.re = i;
        var f = this.asin();
        return this.re = -this.im, this.im = i, i = f.re, f.re = -f.im, f.im = i, f;
      },
      /**
       * Calculate the complex acosh
       *
       * @returns {Complex}
       */
      acosh: function() {
        var i = this.acos();
        if (i.im <= 0) {
          var f = i.re;
          i.re = -i.im, i.im = f;
        } else {
          var f = i.im;
          i.im = -i.re, i.re = f;
        }
        return i;
      },
      /**
       * Calculate the complex atanh
       *
       * @returns {Complex}
       */
      atanh: function() {
        var i = this.re, f = this.im, h = i > 1 && f === 0, d = 1 - i, s = 1 + i, m = d * d + f * f, D = m !== 0 ? new o(
          (s * d - f * f) / m,
          (f * d + s * f) / m
        ) : new o(
          i !== -1 ? i / 0 : 0,
          f !== 0 ? f / 0 : 0
        ), w = D.re;
        return D.re = v(D.re, D.im) / 2, D.im = Math.atan2(D.im, w) / 2, h && (D.im = -D.im), D;
      },
      /**
       * Calculate the complex acoth
       *
       * @returns {Complex}
       */
      acoth: function() {
        var i = this.re, f = this.im;
        if (i === 0 && f === 0)
          return new o(0, Math.PI / 2);
        var h = i * i + f * f;
        return h !== 0 ? new o(
          i / h,
          -f / h
        ).atanh() : new o(
          i !== 0 ? i / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).atanh();
      },
      /**
       * Calculate the complex acsch
       *
       * @returns {Complex}
       */
      acsch: function() {
        var i = this.re, f = this.im;
        if (f === 0)
          return new o(
            i !== 0 ? Math.log(i + Math.sqrt(i * i + 1)) : 1 / 0,
            0
          );
        var h = i * i + f * f;
        return h !== 0 ? new o(
          i / h,
          -f / h
        ).asinh() : new o(
          i !== 0 ? i / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).asinh();
      },
      /**
       * Calculate the complex asech
       *
       * @returns {Complex}
       */
      asech: function() {
        var i = this.re, f = this.im;
        if (this.isZero())
          return o.INFINITY;
        var h = i * i + f * f;
        return h !== 0 ? new o(
          i / h,
          -f / h
        ).acosh() : new o(
          i !== 0 ? i / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).acosh();
      },
      /**
       * Calculate the complex inverse 1/z
       *
       * @returns {Complex}
       */
      inverse: function() {
        if (this.isZero())
          return o.INFINITY;
        if (this.isInfinite())
          return o.ZERO;
        var i = this.re, f = this.im, h = i * i + f * f;
        return new o(i / h, -f / h);
      },
      /**
       * Returns the complex conjugate
       *
       * @returns {Complex}
       */
      conjugate: function() {
        return new o(this.re, -this.im);
      },
      /**
       * Gets the negated complex number
       *
       * @returns {Complex}
       */
      neg: function() {
        return new o(-this.re, -this.im);
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      ceil: function(i) {
        return i = Math.pow(10, i || 0), new o(
          Math.ceil(this.re * i) / i,
          Math.ceil(this.im * i) / i
        );
      },
      /**
       * Floors the actual complex number
       *
       * @returns {Complex}
       */
      floor: function(i) {
        return i = Math.pow(10, i || 0), new o(
          Math.floor(this.re * i) / i,
          Math.floor(this.im * i) / i
        );
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      round: function(i) {
        return i = Math.pow(10, i || 0), new o(
          Math.round(this.re * i) / i,
          Math.round(this.im * i) / i
        );
      },
      /**
       * Compares two complex numbers
       *
       * **Note:** new Complex(Infinity).equals(Infinity) === false
       *
       * @returns {boolean}
       */
      equals: function(i, f) {
        var h = new o(i, f);
        return Math.abs(h.re - this.re) <= o.EPSILON && Math.abs(h.im - this.im) <= o.EPSILON;
      },
      /**
       * Clones the actual object
       *
       * @returns {Complex}
       */
      clone: function() {
        return new o(this.re, this.im);
      },
      /**
       * Gets a string of the actual complex number
       *
       * @returns {string}
       */
      toString: function() {
        var i = this.re, f = this.im, h = "";
        return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(i) < o.EPSILON && (i = 0), Math.abs(f) < o.EPSILON && (f = 0), f === 0 ? h + i : (i !== 0 ? (h += i, h += " ", f < 0 ? (f = -f, h += "-") : h += "+", h += " ") : f < 0 && (f = -f, h += "-"), f !== 1 && (h += f), h + "i"));
      },
      /**
       * Returns the actual number as a vector
       *
       * @returns {Array}
       */
      toVector: function() {
        return [this.re, this.im];
      },
      /**
       * Returns the actual real value of the current object
       *
       * @returns {number|null}
       */
      valueOf: function() {
        return this.im === 0 ? this.re : null;
      },
      /**
       * Determines whether a complex number is not on the Riemann sphere.
       *
       * @returns {boolean}
       */
      isNaN: function() {
        return isNaN(this.re) || isNaN(this.im);
      },
      /**
       * Determines whether or not a complex number is at the zero pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isZero: function() {
        return this.im === 0 && this.re === 0;
      },
      /**
       * Determines whether a complex number is not at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isFinite: function() {
        return isFinite(this.re) && isFinite(this.im);
      },
      /**
       * Determines whether or not a complex number is at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isInfinite: function() {
        return !(this.isNaN() || this.isFinite());
      }
    }, o.ZERO = new o(0, 0), o.ONE = new o(1, 0), o.I = new o(0, 1), o.PI = new o(Math.PI, 0), o.E = new o(Math.E, 0), o.INFINITY = new o(1 / 0, 1 / 0), o.NAN = new o(NaN, NaN), o.EPSILON = 1e-15, Object.defineProperty(o, "__esModule", { value: !0 }), o.default = o, o.Complex = o, r.exports = o;
  })();
})(Ga);
var Xo = Ga.exports;
const Ur = /* @__PURE__ */ jt(Xo);
var Go = "Complex", Ko = [], Wo = /* @__PURE__ */ k(Go, Ko, () => (Object.defineProperty(Ur, "name", {
  value: "Complex"
}), Ur.prototype.constructor = Ur, Ur.prototype.type = "Complex", Ur.prototype.isComplex = !0, Ur.prototype.toJSON = function() {
  return {
    mathjs: "Complex",
    re: this.re,
    im: this.im
  };
}, Ur.prototype.toPolar = function() {
  return {
    r: this.abs(),
    phi: this.arg()
  };
}, Ur.prototype.format = function(r) {
  var e = "", n = this.im, a = this.re, t = Rt(this.re, r), u = Rt(this.im, r), c = xr(r) ? r : r ? r.precision : null;
  if (c !== null) {
    var p = Math.pow(10, -c);
    Math.abs(a / n) < p && (a = 0), Math.abs(n / a) < p && (n = 0);
  }
  return n === 0 ? e = t : a === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = u + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + u.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + u + "i", e;
}, Ur.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object")
        return Ur(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], a = arguments[1];
      if (xr(n)) {
        if (Ea(a) && a.hasBase("ANGLE") && (a = a.toNumber("rad")), xr(a))
          return new Ur({
            r: n,
            phi: a
          });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else
        throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Ur.prototype.valueOf = Ur.prototype.toString, Ur.fromJSON = function(r) {
  return new Ur(r);
}, Ur.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, Ur), {
  isClass: !0
}), Ka = { exports: {} };
/**
 * @license Fraction.js v4.2.0 05/03/2022
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2021, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(r, e) {
  (function(n) {
    var a = 2e3, t = {
      s: 1,
      n: 0,
      d: 1
    };
    function u(d, s) {
      if (isNaN(d = parseInt(d, 10)))
        throw h.InvalidParameter;
      return d * s;
    }
    function c(d, s) {
      if (s === 0)
        throw h.DivisionByZero;
      var m = Object.create(h.prototype);
      m.s = d < 0 ? -1 : 1, d = d < 0 ? -d : d;
      var D = f(d, s);
      return m.n = d / D, m.d = s / D, m;
    }
    function p(d) {
      for (var s = {}, m = d, D = 2, w = 4; w <= m; ) {
        for (; m % D === 0; )
          m /= D, s[D] = (s[D] || 0) + 1;
        w += 1 + 2 * D++;
      }
      return m !== d ? m > 1 && (s[m] = (s[m] || 0) + 1) : s[d] = (s[d] || 0) + 1, s;
    }
    var v = function(d, s) {
      var m = 0, D = 1, w = 1, y = 0, A = 0, C = 0, g = 1, M = 1, E = 0, b = 1, F = 1, B = 1, S = 1e7, z;
      if (d != null)
        if (s !== void 0) {
          if (m = d, D = s, w = m * D, m % 1 !== 0 || D % 1 !== 0)
            throw h.NonIntegerParameter;
        } else
          switch (typeof d) {
            case "object": {
              if ("d" in d && "n" in d)
                m = d.n, D = d.d, "s" in d && (m *= d.s);
              else if (0 in d)
                m = d[0], 1 in d && (D = d[1]);
              else
                throw h.InvalidParameter;
              w = m * D;
              break;
            }
            case "number": {
              if (d < 0 && (w = d, d = -d), d % 1 === 0)
                m = d;
              else if (d > 0) {
                for (d >= 1 && (M = Math.pow(10, Math.floor(1 + Math.log(d) / Math.LN10)), d /= M); b <= S && B <= S; )
                  if (z = (E + F) / (b + B), d === z) {
                    b + B <= S ? (m = E + F, D = b + B) : B > b ? (m = F, D = B) : (m = E, D = b);
                    break;
                  } else
                    d > z ? (E += F, b += B) : (F += E, B += b), b > S ? (m = F, D = B) : (m = E, D = b);
                m *= M;
              } else
                (isNaN(d) || isNaN(s)) && (D = m = NaN);
              break;
            }
            case "string": {
              if (b = d.match(/\d+|./g), b === null)
                throw h.InvalidParameter;
              if (b[E] === "-" ? (w = -1, E++) : b[E] === "+" && E++, b.length === E + 1 ? A = u(b[E++], w) : b[E + 1] === "." || b[E] === "." ? (b[E] !== "." && (y = u(b[E++], w)), E++, (E + 1 === b.length || b[E + 1] === "(" && b[E + 3] === ")" || b[E + 1] === "'" && b[E + 3] === "'") && (A = u(b[E], w), g = Math.pow(10, b[E].length), E++), (b[E] === "(" && b[E + 2] === ")" || b[E] === "'" && b[E + 2] === "'") && (C = u(b[E + 1], w), M = Math.pow(10, b[E + 1].length) - 1, E += 3)) : b[E + 1] === "/" || b[E + 1] === ":" ? (A = u(b[E], w), g = u(b[E + 2], 1), E += 3) : b[E + 3] === "/" && b[E + 1] === " " && (y = u(b[E], w), A = u(b[E + 2], w), g = u(b[E + 4], 1), E += 5), b.length <= E) {
                D = g * M, w = /* void */
                m = C + D * y + M * A;
                break;
              }
            }
            default:
              throw h.InvalidParameter;
          }
      if (D === 0)
        throw h.DivisionByZero;
      t.s = w < 0 ? -1 : 1, t.n = Math.abs(m), t.d = Math.abs(D);
    };
    function l(d, s, m) {
      for (var D = 1; s > 0; d = d * d % m, s >>= 1)
        s & 1 && (D = D * d % m);
      return D;
    }
    function o(d, s) {
      for (; s % 2 === 0; s /= 2)
        ;
      for (; s % 5 === 0; s /= 5)
        ;
      if (s === 1)
        return 0;
      for (var m = 10 % s, D = 1; m !== 1; D++)
        if (m = m * 10 % s, D > a)
          return 0;
      return D;
    }
    function i(d, s, m) {
      for (var D = 1, w = l(10, m, s), y = 0; y < 300; y++) {
        if (D === w)
          return y;
        D = D * 10 % s, w = w * 10 % s;
      }
      return 0;
    }
    function f(d, s) {
      if (!d)
        return s;
      if (!s)
        return d;
      for (; ; ) {
        if (d %= s, !d)
          return s;
        if (s %= d, !s)
          return d;
      }
    }
    function h(d, s) {
      if (v(d, s), this instanceof h)
        d = f(t.d, t.n), this.s = t.s, this.n = t.n / d, this.d = t.d / d;
      else
        return c(t.s * t.n, t.d);
    }
    h.DivisionByZero = new Error("Division by Zero"), h.InvalidParameter = new Error("Invalid argument"), h.NonIntegerParameter = new Error("Parameters must be integer"), h.prototype = {
      s: 1,
      n: 0,
      d: 1,
      /**
       * Calculates the absolute value
       *
       * Ex: new Fraction(-4).abs() => 4
       **/
      abs: function() {
        return c(this.n, this.d);
      },
      /**
       * Inverts the sign of the current fraction
       *
       * Ex: new Fraction(-4).neg() => 4
       **/
      neg: function() {
        return c(-this.s * this.n, this.d);
      },
      /**
       * Adds two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
       **/
      add: function(d, s) {
        return v(d, s), c(
          this.s * this.n * t.d + t.s * this.d * t.n,
          this.d * t.d
        );
      },
      /**
       * Subtracts two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
       **/
      sub: function(d, s) {
        return v(d, s), c(
          this.s * this.n * t.d - t.s * this.d * t.n,
          this.d * t.d
        );
      },
      /**
       * Multiplies two rational numbers
       *
       * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
       **/
      mul: function(d, s) {
        return v(d, s), c(
          this.s * t.s * this.n * t.n,
          this.d * t.d
        );
      },
      /**
       * Divides two rational numbers
       *
       * Ex: new Fraction("-17.(345)").inverse().div(3)
       **/
      div: function(d, s) {
        return v(d, s), c(
          this.s * t.s * this.n * t.d,
          this.d * t.n
        );
      },
      /**
       * Clones the actual object
       *
       * Ex: new Fraction("-17.(345)").clone()
       **/
      clone: function() {
        return c(this.s * this.n, this.d);
      },
      /**
       * Calculates the modulo of two rational numbers - a more precise fmod
       *
       * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
       **/
      mod: function(d, s) {
        if (isNaN(this.n) || isNaN(this.d))
          return new h(NaN);
        if (d === void 0)
          return c(this.s * this.n % this.d, 1);
        if (v(d, s), t.n === 0 && this.d === 0)
          throw h.DivisionByZero;
        return c(
          this.s * (t.d * this.n) % (t.n * this.d),
          t.d * this.d
        );
      },
      /**
       * Calculates the fractional gcd of two rational numbers
       *
       * Ex: new Fraction(5,8).gcd(3,7) => 1/56
       */
      gcd: function(d, s) {
        return v(d, s), c(f(t.n, this.n) * f(t.d, this.d), t.d * this.d);
      },
      /**
       * Calculates the fractional lcm of two rational numbers
       *
       * Ex: new Fraction(5,8).lcm(3,7) => 15
       */
      lcm: function(d, s) {
        return v(d, s), t.n === 0 && this.n === 0 ? c(0, 1) : c(t.n * this.n, f(t.n, this.n) * f(t.d, this.d));
      },
      /**
       * Calculates the ceil of a rational number
       *
       * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
       **/
      ceil: function(d) {
        return d = Math.pow(10, d || 0), isNaN(this.n) || isNaN(this.d) ? new h(NaN) : c(Math.ceil(d * this.s * this.n / this.d), d);
      },
      /**
       * Calculates the floor of a rational number
       *
       * Ex: new Fraction('4.(3)').floor() => (4 / 1)
       **/
      floor: function(d) {
        return d = Math.pow(10, d || 0), isNaN(this.n) || isNaN(this.d) ? new h(NaN) : c(Math.floor(d * this.s * this.n / this.d), d);
      },
      /**
       * Rounds a rational numbers
       *
       * Ex: new Fraction('4.(3)').round() => (4 / 1)
       **/
      round: function(d) {
        return d = Math.pow(10, d || 0), isNaN(this.n) || isNaN(this.d) ? new h(NaN) : c(Math.round(d * this.s * this.n / this.d), d);
      },
      /**
       * Gets the inverse of the fraction, means numerator and denominator are exchanged
       *
       * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
       **/
      inverse: function() {
        return c(this.s * this.d, this.n);
      },
      /**
       * Calculates the fraction to some rational exponent, if possible
       *
       * Ex: new Fraction(-1,2).pow(-3) => -8
       */
      pow: function(d, s) {
        if (v(d, s), t.d === 1)
          return t.s < 0 ? c(Math.pow(this.s * this.d, t.n), Math.pow(this.n, t.n)) : c(Math.pow(this.s * this.n, t.n), Math.pow(this.d, t.n));
        if (this.s < 0)
          return null;
        var m = p(this.n), D = p(this.d), w = 1, y = 1;
        for (var A in m)
          if (A !== "1") {
            if (A === "0") {
              w = 0;
              break;
            }
            if (m[A] *= t.n, m[A] % t.d === 0)
              m[A] /= t.d;
            else
              return null;
            w *= Math.pow(A, m[A]);
          }
        for (var A in D)
          if (A !== "1") {
            if (D[A] *= t.n, D[A] % t.d === 0)
              D[A] /= t.d;
            else
              return null;
            y *= Math.pow(A, D[A]);
          }
        return t.s < 0 ? c(y, w) : c(w, y);
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      equals: function(d, s) {
        return v(d, s), this.s * this.n * t.d === t.s * t.n * this.d;
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      compare: function(d, s) {
        v(d, s);
        var m = this.s * this.n * t.d - t.s * t.n * this.d;
        return (0 < m) - (m < 0);
      },
      simplify: function(d) {
        if (isNaN(this.n) || isNaN(this.d))
          return this;
        d = d || 1e-3;
        for (var s = this.abs(), m = s.toContinued(), D = 1; D < m.length; D++) {
          for (var w = c(m[D - 1], 1), y = D - 2; y >= 0; y--)
            w = w.inverse().add(m[y]);
          if (w.sub(s).abs().valueOf() < d)
            return w.mul(this.s);
        }
        return this;
      },
      /**
       * Check if two rational numbers are divisible
       *
       * Ex: new Fraction(19.6).divisible(1.5);
       */
      divisible: function(d, s) {
        return v(d, s), !(!(t.n * this.d) || this.n * t.d % (t.n * this.d));
      },
      /**
       * Returns a decimal representation of the fraction
       *
       * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
       **/
      valueOf: function() {
        return this.s * this.n / this.d;
      },
      /**
       * Returns a string-fraction representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
       **/
      toFraction: function(d) {
        var s, m = "", D = this.n, w = this.d;
        return this.s < 0 && (m += "-"), w === 1 ? m += D : (d && (s = Math.floor(D / w)) > 0 && (m += s, m += " ", D %= w), m += D, m += "/", m += w), m;
      },
      /**
       * Returns a latex representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
       **/
      toLatex: function(d) {
        var s, m = "", D = this.n, w = this.d;
        return this.s < 0 && (m += "-"), w === 1 ? m += D : (d && (s = Math.floor(D / w)) > 0 && (m += s, D %= w), m += "\\frac{", m += D, m += "}{", m += w, m += "}"), m;
      },
      /**
       * Returns an array of continued fraction elements
       *
       * Ex: new Fraction("7/8").toContinued() => [0,1,7]
       */
      toContinued: function() {
        var d, s = this.n, m = this.d, D = [];
        if (isNaN(s) || isNaN(m))
          return D;
        do
          D.push(Math.floor(s / m)), d = s % m, s = m, m = d;
        while (s !== 1);
        return D;
      },
      /**
       * Creates a string representation of a fraction with all digits
       *
       * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
       **/
      toString: function(d) {
        var s = this.n, m = this.d;
        if (isNaN(s) || isNaN(m))
          return "NaN";
        d = d || 15;
        var D = o(s, m), w = i(s, m, D), y = this.s < 0 ? "-" : "";
        if (y += s / m | 0, s %= m, s *= 10, s && (y += "."), D) {
          for (var A = w; A--; )
            y += s / m | 0, s %= m, s *= 10;
          y += "(";
          for (var A = D; A--; )
            y += s / m | 0, s %= m, s *= 10;
          y += ")";
        } else
          for (var A = d; s && A--; )
            y += s / m | 0, s %= m, s *= 10;
        return y;
      }
    }, Object.defineProperty(h, "__esModule", { value: !0 }), h.default = h, h.Fraction = h, r.exports = h;
  })();
})(Ka);
var Ho = Ka.exports;
const ce = /* @__PURE__ */ jt(Ho);
var ko = "Fraction", jo = [], rs = /* @__PURE__ */ k(ko, jo, () => (Object.defineProperty(ce, "name", {
  value: "Fraction"
}), ce.prototype.constructor = ce, ce.prototype.type = "Fraction", ce.prototype.isFraction = !0, ce.prototype.toJSON = function() {
  return {
    mathjs: "Fraction",
    n: this.s * this.n,
    d: this.d
  };
}, ce.fromJSON = function(r) {
  return new ce(r);
}, ce), {
  isClass: !0
}), es = "Matrix", ts = [], ns = /* @__PURE__ */ k(es, ts, () => {
  function r() {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return r.prototype.type = "Matrix", r.prototype.isMatrix = !0, r.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, r.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, r.prototype.create = function(e, n) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, r.prototype.subset = function(e, n, a) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, r.prototype.get = function(e) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, r.prototype.set = function(e, n, a) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, r.prototype.resize = function(e, n) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, r.prototype.reshape = function(e, n) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, r.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, r.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, r.prototype.map = function(e, n) {
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
}, {
  isClass: !0
});
function Wa(r) {
  return Object.keys(r.signatures || {}).reduce(function(e, n) {
    var a = (n.match(/,/g) || []).length + 1;
    return Math.max(e, a);
  }, -1);
}
var as = "DenseMatrix", is = ["Matrix"], us = /* @__PURE__ */ k(as, is, (r) => {
  var {
    Matrix: e
  } = r;
  function n(o, i) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (i && !ae(i))
      throw new Error("Invalid datatype: " + i);
    if (Sr(o))
      o.type === "DenseMatrix" ? (this._data = wr(o._data), this._size = wr(o._size), this._datatype = i || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = i || o._datatype);
    else if (o && Cr(o.data) && Cr(o.size))
      this._data = o.data, this._size = o.size, En(this._data, this._size), this._datatype = i || o.datatype;
    else if (Cr(o))
      this._data = l(o), this._size = Lr(this._data), En(this._data, this._size), this._datatype = i;
    else {
      if (o)
        throw new TypeError("Unsupported type of data (" + se(o) + ")");
      this._data = [], this._size = [0], this._datatype = i;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(o, i) {
    return new n(o, i);
  }, Object.defineProperty(n, "name", {
    value: "DenseMatrix"
  }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = !0, n.prototype.getDataType = function() {
    return ht(this._data, se);
  }, n.prototype.storage = function() {
    return "dense";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(o, i) {
    return new n(o, i);
  }, n.prototype.subset = function(o, i, f) {
    switch (arguments.length) {
      case 1:
        return a(this, o);
      case 2:
      case 3:
        return u(this, o, i, f);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.get = function(o) {
    if (!Cr(o))
      throw new TypeError("Array expected");
    if (o.length !== this._size.length)
      throw new Ar(o.length, this._size.length);
    for (var i = 0; i < o.length; i++)
      br(o[i], this._size[i]);
    for (var f = this._data, h = 0, d = o.length; h < d; h++) {
      var s = o[h];
      br(s, f.length), f = f[s];
    }
    return f;
  }, n.prototype.set = function(o, i, f) {
    if (!Cr(o))
      throw new TypeError("Array expected");
    if (o.length < this._size.length)
      throw new Ar(o.length, this._size.length, "<");
    var h, d, s, m = o.map(function(w) {
      return w + 1;
    });
    v(this, m, f);
    var D = this._data;
    for (h = 0, d = o.length - 1; h < d; h++)
      s = o[h], br(s, D.length), D = D[s];
    return s = o[o.length - 1], br(s, D.length), D[s] = i, this;
  };
  function a(o, i) {
    if (!Ct(i))
      throw new TypeError("Invalid index");
    var f = i.isScalar();
    if (f)
      return o.get(i.min());
    var h = i.size();
    if (h.length !== o._size.length)
      throw new Ar(h.length, o._size.length);
    for (var d = i.min(), s = i.max(), m = 0, D = o._size.length; m < D; m++)
      br(d[m], o._size[m]), br(s[m], o._size[m]);
    return new n(t(o._data, i, h.length, 0), o._datatype);
  }
  function t(o, i, f, h) {
    var d = h === f - 1, s = i.dimension(h);
    return d ? s.map(function(m) {
      return br(m, o.length), o[m];
    }).valueOf() : s.map(function(m) {
      br(m, o.length);
      var D = o[m];
      return t(D, i, f, h + 1);
    }).valueOf();
  }
  function u(o, i, f, h) {
    if (!i || i.isIndex !== !0)
      throw new TypeError("Invalid index");
    var d = i.size(), s = i.isScalar(), m;
    if (Sr(f) ? (m = f.size(), f = f.valueOf()) : m = Lr(f), s) {
      if (m.length !== 0)
        throw new TypeError("Scalar expected");
      o.set(i.min(), f, h);
    } else {
      if (d.length < o._size.length)
        throw new Ar(d.length, o._size.length, "<");
      if (m.length < d.length) {
        for (var D = 0, w = 0; d[D] === 1 && m[D] === 1; )
          D++;
        for (; d[D] === 1; )
          w++, D++;
        f = xa(f, d.length, w, m);
      }
      if (!lt(d, m))
        throw new Ar(d, m, ">");
      var y = i.max().map(function(g) {
        return g + 1;
      });
      v(o, y, h);
      var A = d.length, C = 0;
      c(o._data, i, f, A, C);
    }
    return o;
  }
  function c(o, i, f, h, d) {
    var s = d === h - 1, m = i.dimension(d);
    s ? m.forEach(function(D, w) {
      br(D), o[D] = f[w[0]];
    }) : m.forEach(function(D, w) {
      br(D), c(o[D], i, f[w[0]], h, d + 1);
    });
  }
  n.prototype.resize = function(o, i, f) {
    if (!ft(o))
      throw new TypeError("Array or Matrix expected");
    var h = o.valueOf().map((s) => Array.isArray(s) && s.length === 1 ? s[0] : s), d = f ? this.clone() : this;
    return p(d, h, i);
  };
  function p(o, i, f) {
    if (i.length === 0) {
      for (var h = o._data; Cr(h); )
        h = h[0];
      return h;
    }
    return o._size = i.slice(0), o._data = vt(o._data, o._size, f), o;
  }
  n.prototype.reshape = function(o, i) {
    var f = i ? this.clone() : this;
    f._data = Ba(f._data, o);
    var h = f._size.reduce((d, s) => d * s);
    return f._size = Ht(o, h), f;
  };
  function v(o, i, f) {
    for (var h = o._size.slice(0), d = !1; h.length < i.length; )
      h.push(0), d = !0;
    for (var s = 0, m = i.length; s < m; s++)
      i[s] > h[s] && (h[s] = i[s], d = !0);
    d && p(o, h, f);
  }
  n.prototype.clone = function() {
    var o = new n({
      data: wr(this._data),
      size: wr(this._size),
      datatype: this._datatype
    });
    return o;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype.map = function(o) {
    var i = this, f = Wa(o), h = function m(D, w) {
      return Cr(D) ? D.map(function(y, A) {
        return m(y, w.concat(A));
      }) : f === 1 ? o(D) : f === 2 ? o(D, w) : o(D, w, i);
    }, d = h(this._data, []), s = this._datatype !== void 0 ? ht(d, se) : void 0;
    return new n(d, s);
  }, n.prototype.forEach = function(o) {
    var i = this, f = function h(d, s) {
      Cr(d) ? d.forEach(function(m, D) {
        h(m, s.concat(D));
      }) : o(d, s, i);
    };
    f(this._data, []);
  }, n.prototype[Symbol.iterator] = function* () {
    var o = function* i(f, h) {
      if (Cr(f))
        for (var d = 0; d < f.length; d++)
          yield* i(f[d], h.concat(d));
      else
        yield {
          value: f,
          index: h
        };
    };
    yield* o(this._data, []);
  }, n.prototype.rows = function() {
    var o = [], i = this.size();
    if (i.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    var f = this._data;
    for (var h of f)
      o.push(new n([h], this._datatype));
    return o;
  }, n.prototype.columns = function() {
    var o = this, i = [], f = this.size();
    if (f.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var h = this._data, d = function(D) {
      var w = h.map((y) => [y[D]]);
      i.push(new n(w, o._datatype));
    }, s = 0; s < f[1]; s++)
      d(s);
    return i;
  }, n.prototype.toArray = function() {
    return wr(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(o) {
    return Nr(this._data, o);
  }, n.prototype.toString = function() {
    return Nr(this._data);
  }, n.prototype.toJSON = function() {
    return {
      mathjs: "DenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, n.prototype.diagonal = function(o) {
    if (o) {
      if (zr(o) && (o = o.toNumber()), !xr(o) || !Mr(o))
        throw new TypeError("The parameter k must be an integer number");
    } else
      o = 0;
    for (var i = o > 0 ? o : 0, f = o < 0 ? -o : 0, h = this._size[0], d = this._size[1], s = Math.min(h - f, d - i), m = [], D = 0; D < s; D++)
      m[D] = this._data[D + f][D + i];
    return new n({
      data: m,
      size: [s],
      datatype: this._datatype
    });
  }, n.diagonal = function(o, i, f, h) {
    if (!Cr(o))
      throw new TypeError("Array expected, size parameter");
    if (o.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(M) {
      if (zr(M) && (M = M.toNumber()), !xr(M) || !Mr(M) || M < 1)
        throw new Error("Size values must be positive integers");
      return M;
    }), f) {
      if (zr(f) && (f = f.toNumber()), !xr(f) || !Mr(f))
        throw new TypeError("The parameter k must be an integer number");
    } else
      f = 0;
    var d = f > 0 ? f : 0, s = f < 0 ? -f : 0, m = o[0], D = o[1], w = Math.min(m - s, D - d), y;
    if (Cr(i)) {
      if (i.length !== w)
        throw new Error("Invalid value array length");
      y = function(E) {
        return i[E];
      };
    } else if (Sr(i)) {
      var A = i.size();
      if (A.length !== 1 || A[0] !== w)
        throw new Error("Invalid matrix length");
      y = function(E) {
        return i.get([E]);
      };
    } else
      y = function() {
        return i;
      };
    h || (h = zr(y(0)) ? y(0).mul(0) : 0);
    var C = [];
    if (o.length > 0) {
      C = vt(C, o, h);
      for (var g = 0; g < w; g++)
        C[g + s][g + d] = y(g);
    }
    return new n({
      data: C,
      size: [m, D]
    });
  }, n.fromJSON = function(o) {
    return new n(o);
  }, n.prototype.swapRows = function(o, i) {
    if (!xr(o) || !Mr(o) || !xr(i) || !Mr(i))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return br(o, this._size[0]), br(i, this._size[0]), n._swapRows(o, i, this._data), this;
  }, n._swapRows = function(o, i, f) {
    var h = f[o];
    f[o] = f[i], f[i] = h;
  };
  function l(o) {
    for (var i = 0, f = o.length; i < f; i++) {
      var h = o[i];
      Cr(h) ? o[i] = l(h) : h && h.isMatrix === !0 && (o[i] = l(h.valueOf()));
    }
    return o;
  }
  return n;
}, {
  isClass: !0
});
function jr(r, e, n) {
  return r && typeof r.map == "function" ? r.map(function(a) {
    return jr(a, e);
  }) : e(r);
}
var Bn = "isInteger", os = ["typed"], ss = /* @__PURE__ */ k(Bn, os, (r) => {
  var {
    typed: e
  } = r;
  return e(Bn, {
    number: Mr,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function(a) {
      return a.isInt();
    },
    Fraction: function(a) {
      return a.d === 1 && isFinite(a.n);
    },
    "Array | Matrix": e.referToSelf((n) => (a) => jr(a, n))
  });
}), rn = "number", en = "number, number";
function Ha(r) {
  return Math.abs(r);
}
Ha.signature = rn;
function ka(r, e) {
  return r + e;
}
ka.signature = en;
function ja(r, e) {
  return r * e;
}
ja.signature = en;
function ri(r) {
  return -r;
}
ri.signature = rn;
function Qt(r) {
  return Mu(r);
}
Qt.signature = rn;
function ei(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
ei.signature = en;
var fs = "number";
function ti(r) {
  return r === 0;
}
ti.signature = fs;
var Nn = "isZero", cs = ["typed"], ls = /* @__PURE__ */ k(Nn, cs, (r) => {
  var {
    typed: e
  } = r;
  return e(Nn, {
    number: ti,
    BigNumber: function(a) {
      return a.isZero();
    },
    Complex: function(a) {
      return a.re === 0 && a.im === 0;
    },
    Fraction: function(a) {
      return a.d === 1 && a.n === 0;
    },
    Unit: e.referToSelf((n) => (a) => e.find(n, a.valueType())(a.value)),
    "Array | Matrix": e.referToSelf((n) => (a) => jr(a, n))
  });
});
function Ze(r, e, n) {
  if (n == null)
    return r.eq(e);
  if (r.eq(e))
    return !0;
  if (r.isNaN() || e.isNaN())
    return !1;
  if (r.isFinite() && e.isFinite()) {
    var a = r.minus(e).abs();
    if (a.isZero())
      return !0;
    var t = r.constructor.max(r.abs(), e.abs());
    return a.lte(t.times(n));
  }
  return !1;
}
function vs(r, e, n) {
  return pe(r.re, e.re, n) && pe(r.im, e.im, n);
}
var Ve = /* @__PURE__ */ k("compareUnits", ["typed"], (r) => {
  var {
    typed: e
  } = r;
  return {
    "Unit, Unit": e.referToSelf((n) => (a, t) => {
      if (!a.equalBase(t))
        throw new Error("Cannot compare units with different base");
      return e.find(n, [a.valueType(), t.valueType()])(a.value, t.value);
    })
  };
}), Dt = "equalScalar", hs = ["typed", "config"], ps = /* @__PURE__ */ k(Dt, hs, (r) => {
  var {
    typed: e,
    config: n
  } = r, a = Ve({
    typed: e
  });
  return e(Dt, {
    "boolean, boolean": function(u, c) {
      return u === c;
    },
    "number, number": function(u, c) {
      return pe(u, c, n.epsilon);
    },
    "BigNumber, BigNumber": function(u, c) {
      return u.eq(c) || Ze(u, c, n.epsilon);
    },
    "Fraction, Fraction": function(u, c) {
      return u.equals(c);
    },
    "Complex, Complex": function(u, c) {
      return vs(u, c, n.epsilon);
    }
  }, a);
});
k(Dt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(Dt, {
    "number, number": function(t, u) {
      return pe(t, u, n.epsilon);
    }
  });
});
var ds = "SparseMatrix", ms = ["typed", "equalScalar", "Matrix"], Ds = /* @__PURE__ */ k(ds, ms, (r) => {
  var {
    typed: e,
    equalScalar: n,
    Matrix: a
  } = r;
  function t(s, m) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (m && !ae(m))
      throw new Error("Invalid datatype: " + m);
    if (Sr(s))
      u(this, s, m);
    else if (s && Cr(s.index) && Cr(s.ptr) && Cr(s.size))
      this._values = s.values, this._index = s.index, this._ptr = s.ptr, this._size = s.size, this._datatype = m || s.datatype;
    else if (Cr(s))
      c(this, s, m);
    else {
      if (s)
        throw new TypeError("Unsupported type of data (" + se(s) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = m;
    }
  }
  function u(s, m, D) {
    m.type === "SparseMatrix" ? (s._values = m._values ? wr(m._values) : void 0, s._index = wr(m._index), s._ptr = wr(m._ptr), s._size = wr(m._size), s._datatype = D || m._datatype) : c(s, m.valueOf(), D || m._datatype);
  }
  function c(s, m, D) {
    s._values = [], s._index = [], s._ptr = [], s._datatype = D;
    var w = m.length, y = 0, A = n, C = 0;
    if (ae(D) && (A = e.find(n, [D, D]) || n, C = e.convert(0, D)), w > 0) {
      var g = 0;
      do {
        s._ptr.push(s._index.length);
        for (var M = 0; M < w; M++) {
          var E = m[M];
          if (Cr(E)) {
            if (g === 0 && y < E.length && (y = E.length), g < E.length) {
              var b = E[g];
              A(b, C) || (s._values.push(b), s._index.push(M));
            }
          } else
            g === 0 && y < 1 && (y = 1), A(E, C) || (s._values.push(E), s._index.push(M));
        }
        g++;
      } while (g < y);
    }
    s._ptr.push(s._index.length), s._size = [w, y];
  }
  t.prototype = new a(), t.prototype.createSparseMatrix = function(s, m) {
    return new t(s, m);
  }, Object.defineProperty(t, "name", {
    value: "SparseMatrix"
  }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = !0, t.prototype.getDataType = function() {
    return ht(this._values, se);
  }, t.prototype.storage = function() {
    return "sparse";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(s, m) {
    return new t(s, m);
  }, t.prototype.density = function() {
    var s = this._size[0], m = this._size[1];
    return s !== 0 && m !== 0 ? this._index.length / (s * m) : 0;
  }, t.prototype.subset = function(s, m, D) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return p(this, s);
      case 2:
      case 3:
        return v(this, s, m, D);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function p(s, m) {
    if (!Ct(m))
      throw new TypeError("Invalid index");
    var D = m.isScalar();
    if (D)
      return s.get(m.min());
    var w = m.size();
    if (w.length !== s._size.length)
      throw new Ar(w.length, s._size.length);
    var y, A, C, g, M = m.min(), E = m.max();
    for (y = 0, A = s._size.length; y < A; y++)
      br(M[y], s._size[y]), br(E[y], s._size[y]);
    var b = s._values, F = s._index, B = s._ptr, S = m.dimension(0), z = m.dimension(1), $ = [], O = [];
    S.forEach(function(T, I) {
      O[T] = I[0], $[T] = !0;
    });
    var x = b ? [] : void 0, Z = [], U = [];
    return z.forEach(function(T) {
      for (U.push(Z.length), C = B[T], g = B[T + 1]; C < g; C++)
        y = F[C], $[y] === !0 && (Z.push(O[y]), x && x.push(b[C]));
    }), U.push(Z.length), new t({
      values: x,
      index: Z,
      ptr: U,
      size: w,
      datatype: s._datatype
    });
  }
  function v(s, m, D, w) {
    if (!m || m.isIndex !== !0)
      throw new TypeError("Invalid index");
    var y = m.size(), A = m.isScalar(), C;
    if (Sr(D) ? (C = D.size(), D = D.toArray()) : C = Lr(D), A) {
      if (C.length !== 0)
        throw new TypeError("Scalar expected");
      s.set(m.min(), D, w);
    } else {
      if (y.length !== 1 && y.length !== 2)
        throw new Ar(y.length, s._size.length, "<");
      if (C.length < y.length) {
        for (var g = 0, M = 0; y[g] === 1 && C[g] === 1; )
          g++;
        for (; y[g] === 1; )
          M++, g++;
        D = xa(D, y.length, M, C);
      }
      if (!lt(y, C))
        throw new Ar(y, C, ">");
      if (y.length === 1) {
        var E = m.dimension(0);
        E.forEach(function(B, S) {
          br(B), s.set([B, 0], D[S[0]], w);
        });
      } else {
        var b = m.dimension(0), F = m.dimension(1);
        b.forEach(function(B, S) {
          br(B), F.forEach(function(z, $) {
            br(z), s.set([B, z], D[S[0]][$[0]], w);
          });
        });
      }
    }
    return s;
  }
  t.prototype.get = function(s) {
    if (!Cr(s))
      throw new TypeError("Array expected");
    if (s.length !== this._size.length)
      throw new Ar(s.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var m = s[0], D = s[1];
    br(m, this._size[0]), br(D, this._size[1]);
    var w = l(m, this._ptr[D], this._ptr[D + 1], this._index);
    return w < this._ptr[D + 1] && this._index[w] === m ? this._values[w] : 0;
  }, t.prototype.set = function(s, m, D) {
    if (!Cr(s))
      throw new TypeError("Array expected");
    if (s.length !== this._size.length)
      throw new Ar(s.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = s[0], y = s[1], A = this._size[0], C = this._size[1], g = n, M = 0;
    ae(this._datatype) && (g = e.find(n, [this._datatype, this._datatype]) || n, M = e.convert(0, this._datatype)), (w > A - 1 || y > C - 1) && (f(this, Math.max(w + 1, A), Math.max(y + 1, C), D), A = this._size[0], C = this._size[1]), br(w, A), br(y, C);
    var E = l(w, this._ptr[y], this._ptr[y + 1], this._index);
    return E < this._ptr[y + 1] && this._index[E] === w ? g(m, M) ? o(E, y, this._values, this._index, this._ptr) : this._values[E] = m : g(m, M) || i(E, w, y, m, this._values, this._index, this._ptr), this;
  };
  function l(s, m, D, w) {
    if (D - m === 0)
      return D;
    for (var y = m; y < D; y++)
      if (w[y] === s)
        return y;
    return m;
  }
  function o(s, m, D, w, y) {
    D.splice(s, 1), w.splice(s, 1);
    for (var A = m + 1; A < y.length; A++)
      y[A]--;
  }
  function i(s, m, D, w, y, A, C) {
    y.splice(s, 0, w), A.splice(s, 0, m);
    for (var g = D + 1; g < C.length; g++)
      C[g]++;
  }
  t.prototype.resize = function(s, m, D) {
    if (!ft(s))
      throw new TypeError("Array or Matrix expected");
    var w = s.valueOf().map((A) => Array.isArray(A) && A.length === 1 ? A[0] : A);
    if (w.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(A) {
      if (!xr(A) || !Mr(A) || A < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Nr(w) + ")");
    });
    var y = D ? this.clone() : this;
    return f(y, w[0], w[1], m);
  };
  function f(s, m, D, w) {
    var y = w || 0, A = n, C = 0;
    ae(s._datatype) && (A = e.find(n, [s._datatype, s._datatype]) || n, C = e.convert(0, s._datatype), y = e.convert(y, s._datatype));
    var g = !A(y, C), M = s._size[0], E = s._size[1], b, F, B;
    if (D > E) {
      for (F = E; F < D; F++)
        if (s._ptr[F] = s._values.length, g)
          for (b = 0; b < M; b++)
            s._values.push(y), s._index.push(b);
      s._ptr[D] = s._values.length;
    } else
      D < E && (s._ptr.splice(D + 1, E - D), s._values.splice(s._ptr[D], s._values.length), s._index.splice(s._ptr[D], s._index.length));
    if (E = D, m > M) {
      if (g) {
        var S = 0;
        for (F = 0; F < E; F++) {
          s._ptr[F] = s._ptr[F] + S, B = s._ptr[F + 1] + S;
          var z = 0;
          for (b = M; b < m; b++, z++)
            s._values.splice(B + z, 0, y), s._index.splice(B + z, 0, b), S++;
        }
        s._ptr[E] = s._values.length;
      }
    } else if (m < M) {
      var $ = 0;
      for (F = 0; F < E; F++) {
        s._ptr[F] = s._ptr[F] - $;
        var O = s._ptr[F], x = s._ptr[F + 1] - $;
        for (B = O; B < x; B++)
          b = s._index[B], b > m - 1 && (s._values.splice(B, 1), s._index.splice(B, 1), $++);
      }
      s._ptr[F] = s._values.length;
    }
    return s._size[0] = m, s._size[1] = D, s;
  }
  t.prototype.reshape = function(s, m) {
    if (!Cr(s))
      throw new TypeError("Array expected");
    if (s.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    s.forEach(function(T) {
      if (!xr(T) || !Mr(T) || T <= -2 || T === 0)
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Nr(s) + ")");
    });
    var D = this._size[0] * this._size[1];
    s = Ht(s, D);
    var w = s[0] * s[1];
    if (D !== w)
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var y = m ? this.clone() : this;
    if (this._size[0] === s[0] && this._size[1] === s[1])
      return y;
    for (var A = [], C = 0; C < y._ptr.length; C++)
      for (var g = 0; g < y._ptr[C + 1] - y._ptr[C]; g++)
        A.push(C);
    for (var M = y._values.slice(), E = y._index.slice(), b = 0; b < y._index.length; b++) {
      var F = E[b], B = A[b], S = F * y._size[1] + B;
      A[b] = S % s[1], E[b] = Math.floor(S / s[1]);
    }
    y._values.length = 0, y._index.length = 0, y._ptr.length = s[1] + 1, y._size = s.slice();
    for (var z = 0; z < y._ptr.length; z++)
      y._ptr[z] = 0;
    for (var $ = 0; $ < M.length; $++) {
      var O = E[$], x = A[$], Z = M[$], U = l(O, y._ptr[x], y._ptr[x + 1], y._index);
      i(U, O, x, Z, y._values, y._index, y._ptr);
    }
    return y;
  }, t.prototype.clone = function() {
    var s = new t({
      values: this._values ? wr(this._values) : void 0,
      index: wr(this._index),
      ptr: wr(this._ptr),
      size: wr(this._size),
      datatype: this._datatype
    });
    return s;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(s, m) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var D = this, w = this._size[0], y = this._size[1], A = Wa(s), C = function(M, E, b) {
      return A === 1 ? s(M) : A === 2 ? s(M, [E, b]) : s(M, [E, b], D);
    };
    return h(this, 0, w - 1, 0, y - 1, C, m);
  };
  function h(s, m, D, w, y, A, C) {
    var g = [], M = [], E = [], b = n, F = 0;
    ae(s._datatype) && (b = e.find(n, [s._datatype, s._datatype]) || n, F = e.convert(0, s._datatype));
    for (var B = function(L, q, J) {
      L = A(L, q, J), b(L, F) || (g.push(L), M.push(q));
    }, S = w; S <= y; S++) {
      E.push(g.length);
      var z = s._ptr[S], $ = s._ptr[S + 1];
      if (C)
        for (var O = z; O < $; O++) {
          var x = s._index[O];
          x >= m && x <= D && B(s._values[O], x - m, S - w);
        }
      else {
        for (var Z = {}, U = z; U < $; U++) {
          var T = s._index[U];
          Z[T] = s._values[U];
        }
        for (var I = m; I <= D; I++) {
          var R = I in Z ? Z[I] : 0;
          B(R, I - m, S - w);
        }
      }
    }
    return E.push(g.length), new t({
      values: g,
      index: M,
      ptr: E,
      size: [D - m + 1, y - w + 1]
    });
  }
  t.prototype.forEach = function(s, m) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var D = this, w = this._size[0], y = this._size[1], A = 0; A < y; A++) {
      var C = this._ptr[A], g = this._ptr[A + 1];
      if (m)
        for (var M = C; M < g; M++) {
          var E = this._index[M];
          s(this._values[M], [E, A], D);
        }
      else {
        for (var b = {}, F = C; F < g; F++) {
          var B = this._index[F];
          b[B] = this._values[F];
        }
        for (var S = 0; S < w; S++) {
          var z = S in b ? b[S] : 0;
          s(z, [S, A], D);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values)
      throw new Error("Cannot iterate a Pattern only matrix");
    for (var s = this._size[1], m = 0; m < s; m++)
      for (var D = this._ptr[m], w = this._ptr[m + 1], y = D; y < w; y++) {
        var A = this._index[y];
        yield {
          value: this._values[y],
          index: [A, m]
        };
      }
  }, t.prototype.toArray = function() {
    return d(this._values, this._index, this._ptr, this._size, !0);
  }, t.prototype.valueOf = function() {
    return d(this._values, this._index, this._ptr, this._size, !1);
  };
  function d(s, m, D, w, y) {
    var A = w[0], C = w[1], g = [], M, E;
    for (M = 0; M < A; M++)
      for (g[M] = [], E = 0; E < C; E++)
        g[M][E] = 0;
    for (E = 0; E < C; E++)
      for (var b = D[E], F = D[E + 1], B = b; B < F; B++)
        M = m[B], g[M][E] = s ? y ? wr(s[B]) : s[B] : 1;
    return g;
  }
  return t.prototype.format = function(s) {
    for (var m = this._size[0], D = this._size[1], w = this.density(), y = "Sparse Matrix [" + Nr(m, s) + " x " + Nr(D, s) + "] density: " + Nr(w, s) + `
`, A = 0; A < D; A++)
      for (var C = this._ptr[A], g = this._ptr[A + 1], M = C; M < g; M++) {
        var E = this._index[M];
        y += `
    (` + Nr(E, s) + ", " + Nr(A, s) + ") ==> " + (this._values ? Nr(this._values[M], s) : "X");
      }
    return y;
  }, t.prototype.toString = function() {
    return Nr(this.toArray());
  }, t.prototype.toJSON = function() {
    return {
      mathjs: "SparseMatrix",
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  }, t.prototype.diagonal = function(s) {
    if (s) {
      if (zr(s) && (s = s.toNumber()), !xr(s) || !Mr(s))
        throw new TypeError("The parameter k must be an integer number");
    } else
      s = 0;
    var m = s > 0 ? s : 0, D = s < 0 ? -s : 0, w = this._size[0], y = this._size[1], A = Math.min(w - D, y - m), C = [], g = [], M = [];
    M[0] = 0;
    for (var E = m; E < y && C.length < A; E++)
      for (var b = this._ptr[E], F = this._ptr[E + 1], B = b; B < F; B++) {
        var S = this._index[B];
        if (S === E - m + D) {
          C.push(this._values[B]), g[C.length - 1] = S - D;
          break;
        }
      }
    return M.push(C.length), new t({
      values: C,
      index: g,
      ptr: M,
      size: [A, 1]
    });
  }, t.fromJSON = function(s) {
    return new t(s);
  }, t.diagonal = function(s, m, D, w, y) {
    if (!Cr(s))
      throw new TypeError("Array expected, size parameter");
    if (s.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (s = s.map(function(T) {
      if (zr(T) && (T = T.toNumber()), !xr(T) || !Mr(T) || T < 1)
        throw new Error("Size values must be positive integers");
      return T;
    }), D) {
      if (zr(D) && (D = D.toNumber()), !xr(D) || !Mr(D))
        throw new TypeError("The parameter k must be an integer number");
    } else
      D = 0;
    var A = n, C = 0;
    ae(y) && (A = e.find(n, [y, y]) || n, C = e.convert(0, y));
    var g = D > 0 ? D : 0, M = D < 0 ? -D : 0, E = s[0], b = s[1], F = Math.min(E - M, b - g), B;
    if (Cr(m)) {
      if (m.length !== F)
        throw new Error("Invalid value array length");
      B = function(I) {
        return m[I];
      };
    } else if (Sr(m)) {
      var S = m.size();
      if (S.length !== 1 || S[0] !== F)
        throw new Error("Invalid matrix length");
      B = function(I) {
        return m.get([I]);
      };
    } else
      B = function() {
        return m;
      };
    for (var z = [], $ = [], O = [], x = 0; x < b; x++) {
      O.push(z.length);
      var Z = x - g;
      if (Z >= 0 && Z < F) {
        var U = B(Z);
        A(U, C) || ($.push(Z + M), z.push(U));
      }
    }
    return O.push(z.length), new t({
      values: z,
      index: $,
      ptr: O,
      size: [E, b]
    });
  }, t.prototype.swapRows = function(s, m) {
    if (!xr(s) || !Mr(s) || !xr(m) || !Mr(m))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return br(s, this._size[0]), br(m, this._size[0]), t._swapRows(s, m, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(s, m, D, w, y) {
    for (var A = w[s], C = w[s + 1], g = A; g < C; g++)
      y(D[g], m[g]);
  }, t._swapRows = function(s, m, D, w, y, A) {
    for (var C = 0; C < D; C++) {
      var g = A[C], M = A[C + 1], E = l(s, g, M, y), b = l(m, g, M, y);
      if (E < M && b < M && y[E] === s && y[b] === m) {
        if (w) {
          var F = w[E];
          w[E] = w[b], w[b] = F;
        }
        continue;
      }
      if (E < M && y[E] === s && (b >= M || y[b] !== m)) {
        var B = w ? w[E] : void 0;
        y.splice(b, 0, m), w && w.splice(b, 0, B), y.splice(b <= E ? E + 1 : E, 1), w && w.splice(b <= E ? E + 1 : E, 1);
        continue;
      }
      if (b < M && y[b] === m && (E >= M || y[E] !== s)) {
        var S = w ? w[b] : void 0;
        y.splice(E, 0, s), w && w.splice(E, 0, S), y.splice(E <= b ? b + 1 : b, 1), w && w.splice(E <= b ? b + 1 : b, 1);
      }
    }
  }, t;
}, {
  isClass: !0
}), gs = "number", ys = ["typed"];
function ws(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = {
      "0b": 2,
      "0o": 8,
      "0x": 16
    }[e[1]], a = e[2], t = e[3];
    return {
      input: r,
      radix: n,
      integerPart: a,
      fractionalPart: t
    };
  } else
    return null;
}
function As(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, a = 0; a < r.fractionalPart.length; a++) {
    var t = parseInt(r.fractionalPart[a], r.radix);
    n += t / Math.pow(r.radix, a + 1);
  }
  var u = e + n;
  if (isNaN(u))
    throw new SyntaxError('String "' + r.input + '" is no valid number');
  return u;
}
var Es = /* @__PURE__ */ k(gs, ys, (r) => {
  var {
    typed: e
  } = r, n = e("number", {
    "": function() {
      return 0;
    },
    number: function(t) {
      return t;
    },
    string: function(t) {
      if (t === "NaN")
        return NaN;
      var u = ws(t);
      if (u)
        return As(u);
      var c = 0, p = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      p && (c = Number(p[2]), t = p[1]);
      var v = Number(t);
      if (isNaN(v))
        throw new SyntaxError('String "' + t + '" is no valid number');
      if (p) {
        if (v > 2 ** c - 1)
          throw new SyntaxError('String "'.concat(t, '" is out of range'));
        v >= 2 ** (c - 1) && (v = v - 2 ** c);
      }
      return v;
    },
    BigNumber: function(t) {
      return t.toNumber();
    },
    Fraction: function(t) {
      return t.valueOf();
    },
    Unit: function(t) {
      throw new Error("Second argument with valueless unit expected");
    },
    null: function(t) {
      return 0;
    },
    "Unit, string | Unit": function(t, u) {
      return t.toNumber(u);
    },
    "Array | Matrix": e.referToSelf((a) => (t) => jr(t, a))
  });
  return n.fromJSON = function(a) {
    return parseFloat(a.value);
  }, n;
}), Fs = "bignumber", Cs = ["typed", "BigNumber"], bs = /* @__PURE__ */ k(Fs, Cs, (r) => {
  var {
    typed: e,
    BigNumber: n
  } = r;
  return e("bignumber", {
    "": function() {
      return new n(0);
    },
    number: function(t) {
      return new n(t + "");
    },
    string: function(t) {
      var u = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (u) {
        var c = u[2], p = n(u[1]), v = new n(2).pow(Number(c));
        if (p.gt(v.sub(1)))
          throw new SyntaxError('String "'.concat(t, '" is out of range'));
        var l = new n(2).pow(Number(c) - 1);
        return p.gte(l) ? p.sub(v) : p;
      }
      return new n(t);
    },
    BigNumber: function(t) {
      return t;
    },
    Fraction: function(t) {
      return new n(t.n).div(t.d).times(t.s);
    },
    null: function(t) {
      return new n(0);
    },
    "Array | Matrix": e.referToSelf((a) => (t) => jr(t, a))
  });
}), Ms = "complex", Ss = ["typed", "Complex"], Bs = /* @__PURE__ */ k(Ms, Ss, (r) => {
  var {
    typed: e,
    Complex: n
  } = r;
  return e("complex", {
    "": function() {
      return n.ZERO;
    },
    number: function(t) {
      return new n(t, 0);
    },
    "number, number": function(t, u) {
      return new n(t, u);
    },
    // TODO: this signature should be redundant
    "BigNumber, BigNumber": function(t, u) {
      return new n(t.toNumber(), u.toNumber());
    },
    Fraction: function(t) {
      return new n(t.valueOf(), 0);
    },
    Complex: function(t) {
      return t.clone();
    },
    string: function(t) {
      return n(t);
    },
    null: function(t) {
      return n(0);
    },
    Object: function(t) {
      if ("re" in t && "im" in t)
        return new n(t.re, t.im);
      if ("r" in t && "phi" in t || "abs" in t && "arg" in t)
        return new n(t);
      throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
    },
    "Array | Matrix": e.referToSelf((a) => (t) => jr(t, a))
  });
}), Ns = "fraction", xs = ["typed", "Fraction"], _s = /* @__PURE__ */ k(Ns, xs, (r) => {
  var {
    typed: e,
    Fraction: n
  } = r;
  return e("fraction", {
    number: function(t) {
      if (!isFinite(t) || isNaN(t))
        throw new Error(t + " cannot be represented as a fraction");
      return new n(t);
    },
    string: function(t) {
      return new n(t);
    },
    "number, number": function(t, u) {
      return new n(t, u);
    },
    null: function(t) {
      return new n(0);
    },
    BigNumber: function(t) {
      return new n(t.toString());
    },
    Fraction: function(t) {
      return t;
    },
    Object: function(t) {
      return new n(t);
    },
    "Array | Matrix": e.referToSelf((a) => (t) => jr(t, a))
  });
}), xn = "matrix", zs = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], Ts = /* @__PURE__ */ k(xn, zs, (r) => {
  var {
    typed: e,
    Matrix: n,
    DenseMatrix: a,
    SparseMatrix: t
  } = r;
  return e(xn, {
    "": function() {
      return u([]);
    },
    string: function(p) {
      return u([], p);
    },
    "string, string": function(p, v) {
      return u([], p, v);
    },
    Array: function(p) {
      return u(p);
    },
    Matrix: function(p) {
      return u(p, p.storage());
    },
    "Array | Matrix, string": u,
    "Array | Matrix, string, string": u
  });
  function u(c, p, v) {
    if (p === "dense" || p === "default" || p === void 0)
      return new a(c, v);
    if (p === "sparse")
      return new t(c, v);
    throw new TypeError("Unknown matrix type " + JSON.stringify(p) + ".");
  }
}), _n = "matrixFromColumns", Is = ["typed", "matrix", "flatten", "size"], Os = /* @__PURE__ */ k(_n, Is, (r) => {
  var {
    typed: e,
    matrix: n,
    flatten: a,
    size: t
  } = r;
  return e(_n, {
    "...Array": function(v) {
      return u(v);
    },
    "...Matrix": function(v) {
      return n(u(v.map((l) => l.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function u(p) {
    if (p.length === 0)
      throw new TypeError("At least one column is needed to construct a matrix.");
    for (var v = c(p[0]), l = [], o = 0; o < v; o++)
      l[o] = [];
    for (var i of p) {
      var f = c(i);
      if (f !== v)
        throw new TypeError("The vectors had different length: " + (v | 0) + " ≠ " + (f | 0));
      for (var h = a(i), d = 0; d < v; d++)
        l[d].push(h[d]);
    }
    return l;
  }
  function c(p) {
    var v = t(p);
    if (v.length === 1)
      return v[0];
    if (v.length === 2) {
      if (v[0] === 1)
        return v[1];
      if (v[1] === 1)
        return v[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), zn = "unaryMinus", $s = ["typed"], qs = /* @__PURE__ */ k(zn, $s, (r) => {
  var {
    typed: e
  } = r;
  return e(zn, {
    number: ri,
    "Complex | BigNumber | Fraction": (n) => n.neg(),
    Unit: e.referToSelf((n) => (a) => {
      var t = a.clone();
      return t.value = e.find(n, t.valueType())(a.value), t;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": e.referToSelf((n) => (a) => jr(a, n))
    // TODO: add support for string
  });
}), Tn = "abs", Ps = ["typed"], Rs = /* @__PURE__ */ k(Tn, Ps, (r) => {
  var {
    typed: e
  } = r;
  return e(Tn, {
    number: Ha,
    "Complex | BigNumber | Fraction | Unit": (n) => n.abs(),
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": e.referToSelf((n) => (a) => jr(a, n))
  });
}), In = "addScalar", Us = ["typed"], Ls = /* @__PURE__ */ k(In, Us, (r) => {
  var {
    typed: e
  } = r;
  return e(In, {
    "number, number": ka,
    "Complex, Complex": function(a, t) {
      return a.add(t);
    },
    "BigNumber, BigNumber": function(a, t) {
      return a.plus(t);
    },
    "Fraction, Fraction": function(a, t) {
      return a.add(t);
    },
    "Unit, Unit": e.referToSelf((n) => (a, t) => {
      if (a.value === null || a.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (t.value === null || t.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!a.equalBase(t))
        throw new Error("Units do not match");
      var u = a.clone();
      return u.value = e.find(n, [u.valueType(), t.valueType()])(u.value, t.value), u.fixPrefix = !1, u;
    })
  });
}), Zs = "matAlgo11xS0s", Vs = ["typed", "equalScalar"], Ys = /* @__PURE__ */ k(Zs, Vs, (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return function(t, u, c, p) {
    var v = t._values, l = t._index, o = t._ptr, i = t._size, f = t._datatype;
    if (!v)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var h = i[0], d = i[1], s, m = n, D = 0, w = c;
    typeof f == "string" && (s = f, m = e.find(n, [s, s]), D = e.convert(0, s), u = e.convert(u, s), w = e.find(c, [s, s]));
    for (var y = [], A = [], C = [], g = 0; g < d; g++) {
      C[g] = A.length;
      for (var M = o[g], E = o[g + 1], b = M; b < E; b++) {
        var F = l[b], B = p ? w(u, v[b]) : w(v[b], u);
        m(B, D) || (A.push(F), y.push(B));
      }
    }
    return C[d] = A.length, t.createSparseMatrix({
      values: y,
      index: A,
      ptr: C,
      size: [h, d],
      datatype: s
    });
  };
}), Js = "matAlgo12xSfs", Qs = ["typed", "DenseMatrix"], Be = /* @__PURE__ */ k(Js, Qs, (r) => {
  var {
    typed: e,
    DenseMatrix: n
  } = r;
  return function(t, u, c, p) {
    var v = t._values, l = t._index, o = t._ptr, i = t._size, f = t._datatype;
    if (!v)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var h = i[0], d = i[1], s, m = c;
    typeof f == "string" && (s = f, u = e.convert(u, s), m = e.find(c, [s, s]));
    for (var D = [], w = [], y = [], A = 0; A < d; A++) {
      for (var C = A + 1, g = o[A], M = o[A + 1], E = g; E < M; E++) {
        var b = l[E];
        w[b] = v[E], y[b] = C;
      }
      for (var F = 0; F < h; F++)
        A === 0 && (D[F] = []), y[F] === C ? D[F][A] = p ? m(u, w[F]) : m(w[F], u) : D[F][A] = p ? m(u, 0) : m(0, u);
    }
    return new n({
      data: D,
      size: [h, d],
      datatype: s
    });
  };
}), Xs = "matAlgo14xDs", Gs = ["typed"], ni = /* @__PURE__ */ k(Xs, Gs, (r) => {
  var {
    typed: e
  } = r;
  return function(t, u, c, p) {
    var v = t._data, l = t._size, o = t._datatype, i, f = c;
    typeof o == "string" && (i = o, u = e.convert(u, i), f = e.find(c, [i, i]));
    var h = l.length > 0 ? n(f, 0, l, l[0], v, u, p) : [];
    return t.createDenseMatrix({
      data: h,
      size: wr(l),
      datatype: i
    });
  };
  function n(a, t, u, c, p, v, l) {
    var o = [];
    if (t === u.length - 1)
      for (var i = 0; i < c; i++)
        o[i] = l ? a(v, p[i]) : a(p[i], v);
    else
      for (var f = 0; f < c; f++)
        o[f] = n(a, t + 1, u, u[t + 1], p[f], v, l);
    return o;
  }
}), Ks = "matAlgo01xDSid", Ws = ["typed"], ai = /* @__PURE__ */ k(Ks, Ws, (r) => {
  var {
    typed: e
  } = r;
  return function(a, t, u, c) {
    var p = a._data, v = a._size, l = a._datatype, o = t._values, i = t._index, f = t._ptr, h = t._size, d = t._datatype;
    if (v.length !== h.length)
      throw new Ar(v.length, h.length);
    if (v[0] !== h[0] || v[1] !== h[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + h + ")");
    if (!o)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var s = v[0], m = v[1], D = typeof l == "string" && l === d ? l : void 0, w = D ? e.find(u, [D, D]) : u, y, A, C = [];
    for (y = 0; y < s; y++)
      C[y] = [];
    var g = [], M = [];
    for (A = 0; A < m; A++) {
      for (var E = A + 1, b = f[A], F = f[A + 1], B = b; B < F; B++)
        y = i[B], g[y] = c ? w(o[B], p[y][A]) : w(p[y][A], o[B]), M[y] = E;
      for (y = 0; y < s; y++)
        M[y] === E ? C[y][A] = g[y] : C[y][A] = p[y][A];
    }
    return a.createDenseMatrix({
      data: C,
      size: [s, m],
      datatype: D
    });
  };
}), Hs = "matAlgo04xSidSid", ks = ["typed", "equalScalar"], js = /* @__PURE__ */ k(Hs, ks, (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return function(t, u, c) {
    var p = t._values, v = t._index, l = t._ptr, o = t._size, i = t._datatype, f = u._values, h = u._index, d = u._ptr, s = u._size, m = u._datatype;
    if (o.length !== s.length)
      throw new Ar(o.length, s.length);
    if (o[0] !== s[0] || o[1] !== s[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + s + ")");
    var D = o[0], w = o[1], y, A = n, C = 0, g = c;
    typeof i == "string" && i === m && (y = i, A = e.find(n, [y, y]), C = e.convert(0, y), g = e.find(c, [y, y]));
    var M = p && f ? [] : void 0, E = [], b = [], F = p && f ? [] : void 0, B = p && f ? [] : void 0, S = [], z = [], $, O, x, Z, U;
    for (O = 0; O < w; O++) {
      b[O] = E.length;
      var T = O + 1;
      for (Z = l[O], U = l[O + 1], x = Z; x < U; x++)
        $ = v[x], E.push($), S[$] = T, F && (F[$] = p[x]);
      for (Z = d[O], U = d[O + 1], x = Z; x < U; x++)
        if ($ = h[x], S[$] === T) {
          if (F) {
            var I = g(F[$], f[x]);
            A(I, C) ? S[$] = null : F[$] = I;
          }
        } else
          E.push($), z[$] = T, B && (B[$] = f[x]);
      if (F && B)
        for (x = b[O]; x < E.length; )
          $ = E[x], S[$] === T ? (M[x] = F[$], x++) : z[$] === T ? (M[x] = B[$], x++) : E.splice(x, 1);
    }
    return b[w] = E.length, t.createSparseMatrix({
      values: M,
      index: E,
      ptr: b,
      size: [D, w],
      datatype: y
    });
  };
}), rf = "matAlgo10xSids", ef = ["typed", "DenseMatrix"], ii = /* @__PURE__ */ k(rf, ef, (r) => {
  var {
    typed: e,
    DenseMatrix: n
  } = r;
  return function(t, u, c, p) {
    var v = t._values, l = t._index, o = t._ptr, i = t._size, f = t._datatype;
    if (!v)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var h = i[0], d = i[1], s, m = c;
    typeof f == "string" && (s = f, u = e.convert(u, s), m = e.find(c, [s, s]));
    for (var D = [], w = [], y = [], A = 0; A < d; A++) {
      for (var C = A + 1, g = o[A], M = o[A + 1], E = g; E < M; E++) {
        var b = l[E];
        w[b] = v[E], y[b] = C;
      }
      for (var F = 0; F < h; F++)
        A === 0 && (D[F] = []), y[F] === C ? D[F][A] = p ? m(u, w[F]) : m(w[F], u) : D[F][A] = u;
    }
    return new n({
      data: D,
      size: [h, d],
      datatype: s
    });
  };
}), tf = "matAlgo13xDD", nf = ["typed"], af = /* @__PURE__ */ k(tf, nf, (r) => {
  var {
    typed: e
  } = r;
  return function(t, u, c) {
    var p = t._data, v = t._size, l = t._datatype, o = u._data, i = u._size, f = u._datatype, h = [];
    if (v.length !== i.length)
      throw new Ar(v.length, i.length);
    for (var d = 0; d < v.length; d++) {
      if (v[d] !== i[d])
        throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + i + ")");
      h[d] = v[d];
    }
    var s, m = c;
    typeof l == "string" && l === f && (s = l, m = e.find(c, [s, s]));
    var D = h.length > 0 ? n(m, 0, h, h[0], p, o) : [];
    return t.createDenseMatrix({
      data: D,
      size: h,
      datatype: s
    });
  };
  function n(a, t, u, c, p, v) {
    var l = [];
    if (t === u.length - 1)
      for (var o = 0; o < c; o++)
        l[o] = a(p[o], v[o]);
    else
      for (var i = 0; i < c; i++)
        l[i] = n(a, t + 1, u, u[t + 1], p[i], v[i]);
    return l;
  }
}), uf = "broadcast", of = ["concat"], sf = /* @__PURE__ */ k(uf, of, (r) => {
  var {
    concat: e
  } = r;
  return function(u, c) {
    var p = Math.max(u._size.length, c._size.length);
    if (u._size.length === c._size.length && u._size.every((m, D) => m === c._size[D]))
      return [u, c];
    for (var v = n(u._size, p, 0), l = n(c._size, p, 0), o = [], i = 0; i < p; i++)
      o[i] = Math.max(v[i], l[i]);
    for (var f = 0; f < p; f++)
      t(v, o, f), t(l, o, f);
    var h = u.clone(), d = c.clone();
    h._size.length < p ? h.reshape(n(h._size, p, 1)) : d._size.length < p && d.reshape(n(d._size, p, 1));
    for (var s = 0; s < p; s++)
      h._size[s] < o[s] && (h = a(h, o[s], s)), d._size[s] < o[s] && (d = a(d, o[s], s));
    return [h, d];
  };
  function n(u, c, p) {
    return [...Array(c - u.length).fill(p), ...u];
  }
  function a(u, c, p) {
    return e(...Array(c).fill(u), p);
  }
  function t(u, c, p) {
    if (u[p] < c[p] & u[p] > 1)
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(u, ") not possible to broadcast dimension ").concat(p, " with size ").concat(u[p], " to size ").concat(c[p]));
  }
}), ff = "matrixAlgorithmSuite", cf = ["typed", "matrix", "concat"], Ee = /* @__PURE__ */ k(ff, cf, (r) => {
  var {
    typed: e,
    matrix: n,
    concat: a
  } = r, t = af({
    typed: e
  }), u = ni({
    typed: e
  }), c = sf({
    concat: a
  });
  return function(v) {
    var l = v.elop, o = v.SD || v.DS, i;
    l ? (i = {
      "DenseMatrix, DenseMatrix": (s, m) => t(...c(s, m), l),
      "Array, Array": (s, m) => t(...c(n(s), n(m)), l).valueOf(),
      "Array, DenseMatrix": (s, m) => t(...c(n(s), m), l),
      "DenseMatrix, Array": (s, m) => t(...c(s, n(m)), l)
    }, v.SS && (i["SparseMatrix, SparseMatrix"] = (s, m) => v.SS(...c(s, m), l, !1)), v.DS && (i["DenseMatrix, SparseMatrix"] = (s, m) => v.DS(...c(s, m), l, !1), i["Array, SparseMatrix"] = (s, m) => v.DS(...c(n(s), m), l, !1)), o && (i["SparseMatrix, DenseMatrix"] = (s, m) => o(...c(m, s), l, !0), i["SparseMatrix, Array"] = (s, m) => o(...c(n(m), s), l, !0))) : (i = {
      "DenseMatrix, DenseMatrix": e.referToSelf((s) => (m, D) => t(...c(m, D), s)),
      "Array, Array": e.referToSelf((s) => (m, D) => t(...c(n(m), n(D)), s).valueOf()),
      "Array, DenseMatrix": e.referToSelf((s) => (m, D) => t(...c(n(m), D), s)),
      "DenseMatrix, Array": e.referToSelf((s) => (m, D) => t(...c(m, n(D)), s))
    }, v.SS && (i["SparseMatrix, SparseMatrix"] = e.referToSelf((s) => (m, D) => v.SS(...c(m, D), s, !1))), v.DS && (i["DenseMatrix, SparseMatrix"] = e.referToSelf((s) => (m, D) => v.DS(...c(m, D), s, !1)), i["Array, SparseMatrix"] = e.referToSelf((s) => (m, D) => v.DS(...c(n(m), D), s, !1))), o && (i["SparseMatrix, DenseMatrix"] = e.referToSelf((s) => (m, D) => o(...c(D, m), s, !0)), i["SparseMatrix, Array"] = e.referToSelf((s) => (m, D) => o(...c(n(D), m), s, !0))));
    var f = v.scalar || "any", h = v.Ds || v.Ss;
    h && (l ? (i["DenseMatrix," + f] = (s, m) => u(s, m, l, !1), i[f + ", DenseMatrix"] = (s, m) => u(m, s, l, !0), i["Array," + f] = (s, m) => u(n(s), m, l, !1).valueOf(), i[f + ", Array"] = (s, m) => u(n(m), s, l, !0).valueOf()) : (i["DenseMatrix," + f] = e.referToSelf((s) => (m, D) => u(m, D, s, !1)), i[f + ", DenseMatrix"] = e.referToSelf((s) => (m, D) => u(D, m, s, !0)), i["Array," + f] = e.referToSelf((s) => (m, D) => u(n(m), D, s, !1).valueOf()), i[f + ", Array"] = e.referToSelf((s) => (m, D) => u(n(D), m, s, !0).valueOf())));
    var d = v.sS !== void 0 ? v.sS : v.Ss;
    return l ? (v.Ss && (i["SparseMatrix," + f] = (s, m) => v.Ss(s, m, l, !1)), d && (i[f + ", SparseMatrix"] = (s, m) => d(m, s, l, !0))) : (v.Ss && (i["SparseMatrix," + f] = e.referToSelf((s) => (m, D) => v.Ss(m, D, s, !1))), d && (i[f + ", SparseMatrix"] = e.referToSelf((s) => (m, D) => d(D, m, s, !0)))), l && l.signatures && Au(i, l.signatures), i;
  };
}), lf = "matAlgo03xDSf", vf = ["typed"], Ne = /* @__PURE__ */ k(lf, vf, (r) => {
  var {
    typed: e
  } = r;
  return function(a, t, u, c) {
    var p = a._data, v = a._size, l = a._datatype, o = t._values, i = t._index, f = t._ptr, h = t._size, d = t._datatype;
    if (v.length !== h.length)
      throw new Ar(v.length, h.length);
    if (v[0] !== h[0] || v[1] !== h[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + h + ")");
    if (!o)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var s = v[0], m = v[1], D, w = 0, y = u;
    typeof l == "string" && l === d && (D = l, w = e.convert(0, D), y = e.find(u, [D, D]));
    for (var A = [], C = 0; C < s; C++)
      A[C] = [];
    for (var g = [], M = [], E = 0; E < m; E++) {
      for (var b = E + 1, F = f[E], B = f[E + 1], S = F; S < B; S++) {
        var z = i[S];
        g[z] = c ? y(o[S], p[z][E]) : y(p[z][E], o[S]), M[z] = b;
      }
      for (var $ = 0; $ < s; $++)
        M[$] === b ? A[$][E] = g[$] : A[$][E] = c ? y(w, p[$][E]) : y(p[$][E], w);
    }
    return a.createDenseMatrix({
      data: A,
      size: [s, m],
      datatype: D
    });
  };
}), hf = "matAlgo05xSfSf", pf = ["typed", "equalScalar"], ui = /* @__PURE__ */ k(hf, pf, (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return function(t, u, c) {
    var p = t._values, v = t._index, l = t._ptr, o = t._size, i = t._datatype, f = u._values, h = u._index, d = u._ptr, s = u._size, m = u._datatype;
    if (o.length !== s.length)
      throw new Ar(o.length, s.length);
    if (o[0] !== s[0] || o[1] !== s[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + s + ")");
    var D = o[0], w = o[1], y, A = n, C = 0, g = c;
    typeof i == "string" && i === m && (y = i, A = e.find(n, [y, y]), C = e.convert(0, y), g = e.find(c, [y, y]));
    var M = p && f ? [] : void 0, E = [], b = [], F = M ? [] : void 0, B = M ? [] : void 0, S = [], z = [], $, O, x, Z;
    for (O = 0; O < w; O++) {
      b[O] = E.length;
      var U = O + 1;
      for (x = l[O], Z = l[O + 1]; x < Z; x++)
        $ = v[x], E.push($), S[$] = U, F && (F[$] = p[x]);
      for (x = d[O], Z = d[O + 1]; x < Z; x++)
        $ = h[x], S[$] !== U && E.push($), z[$] = U, B && (B[$] = f[x]);
      if (M)
        for (x = b[O]; x < E.length; ) {
          $ = E[x];
          var T = S[$], I = z[$];
          if (T === U || I === U) {
            var R = T === U ? F[$] : C, K = I === U ? B[$] : C, L = g(R, K);
            A(L, C) ? E.splice(x, 1) : (M.push(L), x++);
          }
        }
    }
    return b[w] = E.length, t.createSparseMatrix({
      values: M,
      index: E,
      ptr: b,
      size: [D, w],
      datatype: y
    });
  };
}), df = "multiplyScalar", mf = ["typed"], Df = /* @__PURE__ */ k(df, mf, (r) => {
  var {
    typed: e
  } = r;
  return e("multiplyScalar", {
    "number, number": ja,
    "Complex, Complex": function(a, t) {
      return a.mul(t);
    },
    "BigNumber, BigNumber": function(a, t) {
      return a.times(t);
    },
    "Fraction, Fraction": function(a, t) {
      return a.mul(t);
    },
    "number | Fraction | BigNumber | Complex, Unit": (n, a) => a.multiply(n),
    "Unit, number | Fraction | BigNumber | Complex | Unit": (n, a) => n.multiply(a)
  });
}), On = "multiply", gf = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], yf = /* @__PURE__ */ k(On, gf, (r) => {
  var {
    typed: e,
    matrix: n,
    addScalar: a,
    multiplyScalar: t,
    equalScalar: u,
    dot: c
  } = r, p = Ys({
    typed: e,
    equalScalar: u
  }), v = ni({
    typed: e
  });
  function l(C, g) {
    switch (C.length) {
      case 1:
        switch (g.length) {
          case 1:
            if (C[0] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (C[0] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + C[0] + ") must match Matrix rows (" + g[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + g.length + " dimensions)");
        }
        break;
      case 2:
        switch (g.length) {
          case 1:
            if (C[1] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + C[1] + ") must match Vector length (" + g[0] + ")");
            break;
          case 2:
            if (C[1] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + C[1] + ") must match Matrix B rows (" + g[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + g.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + C.length + " dimensions)");
    }
  }
  function o(C, g, M) {
    if (M === 0)
      throw new Error("Cannot multiply two empty vectors");
    return c(C, g);
  }
  function i(C, g) {
    if (g.storage() !== "dense")
      throw new Error("Support for SparseMatrix not implemented");
    return f(C, g);
  }
  function f(C, g) {
    var M = C._data, E = C._size, b = C._datatype, F = g._data, B = g._size, S = g._datatype, z = E[0], $ = B[1], O, x = a, Z = t;
    b && S && b === S && typeof b == "string" && (O = b, x = e.find(a, [O, O]), Z = e.find(t, [O, O]));
    for (var U = [], T = 0; T < $; T++) {
      for (var I = Z(M[0], F[0][T]), R = 1; R < z; R++)
        I = x(I, Z(M[R], F[R][T]));
      U[T] = I;
    }
    return C.createDenseMatrix({
      data: U,
      size: [$],
      datatype: O
    });
  }
  var h = e("_multiplyMatrixVector", {
    "DenseMatrix, any": s,
    "SparseMatrix, any": w
  }), d = e("_multiplyMatrixMatrix", {
    "DenseMatrix, DenseMatrix": m,
    "DenseMatrix, SparseMatrix": D,
    "SparseMatrix, DenseMatrix": y,
    "SparseMatrix, SparseMatrix": A
  });
  function s(C, g) {
    var M = C._data, E = C._size, b = C._datatype, F = g._data, B = g._datatype, S = E[0], z = E[1], $, O = a, x = t;
    b && B && b === B && typeof b == "string" && ($ = b, O = e.find(a, [$, $]), x = e.find(t, [$, $]));
    for (var Z = [], U = 0; U < S; U++) {
      for (var T = M[U], I = x(T[0], F[0]), R = 1; R < z; R++)
        I = O(I, x(T[R], F[R]));
      Z[U] = I;
    }
    return C.createDenseMatrix({
      data: Z,
      size: [S],
      datatype: $
    });
  }
  function m(C, g) {
    var M = C._data, E = C._size, b = C._datatype, F = g._data, B = g._size, S = g._datatype, z = E[0], $ = E[1], O = B[1], x, Z = a, U = t;
    b && S && b === S && typeof b == "string" && (x = b, Z = e.find(a, [x, x]), U = e.find(t, [x, x]));
    for (var T = [], I = 0; I < z; I++) {
      var R = M[I];
      T[I] = [];
      for (var K = 0; K < O; K++) {
        for (var L = U(R[0], F[0][K]), q = 1; q < $; q++)
          L = Z(L, U(R[q], F[q][K]));
        T[I][K] = L;
      }
    }
    return C.createDenseMatrix({
      data: T,
      size: [z, O],
      datatype: x
    });
  }
  function D(C, g) {
    var M = C._data, E = C._size, b = C._datatype, F = g._values, B = g._index, S = g._ptr, z = g._size, $ = g._datatype;
    if (!F)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var O = E[0], x = z[1], Z, U = a, T = t, I = u, R = 0;
    b && $ && b === $ && typeof b == "string" && (Z = b, U = e.find(a, [Z, Z]), T = e.find(t, [Z, Z]), I = e.find(u, [Z, Z]), R = e.convert(0, Z));
    for (var K = [], L = [], q = [], J = g.createSparseMatrix({
      values: K,
      index: L,
      ptr: q,
      size: [O, x],
      datatype: Z
    }), Q = 0; Q < x; Q++) {
      q[Q] = L.length;
      var j = S[Q], er = S[Q + 1];
      if (er > j)
        for (var nr = 0, Y = 0; Y < O; Y++) {
          for (var pr = Y + 1, cr = void 0, ir = j; ir < er; ir++) {
            var ur = B[ir];
            nr !== pr ? (cr = T(M[Y][ur], F[ir]), nr = pr) : cr = U(cr, T(M[Y][ur], F[ir]));
          }
          nr === pr && !I(cr, R) && (L.push(Y), K.push(cr));
        }
    }
    return q[x] = L.length, J;
  }
  function w(C, g) {
    var M = C._values, E = C._index, b = C._ptr, F = C._datatype;
    if (!M)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var B = g._data, S = g._datatype, z = C._size[0], $ = g._size[0], O = [], x = [], Z = [], U, T = a, I = t, R = u, K = 0;
    F && S && F === S && typeof F == "string" && (U = F, T = e.find(a, [U, U]), I = e.find(t, [U, U]), R = e.find(u, [U, U]), K = e.convert(0, U));
    var L = [], q = [];
    Z[0] = 0;
    for (var J = 0; J < $; J++) {
      var Q = B[J];
      if (!R(Q, K))
        for (var j = b[J], er = b[J + 1], nr = j; nr < er; nr++) {
          var Y = E[nr];
          q[Y] ? L[Y] = T(L[Y], I(Q, M[nr])) : (q[Y] = !0, x.push(Y), L[Y] = I(Q, M[nr]));
        }
    }
    for (var pr = x.length, cr = 0; cr < pr; cr++) {
      var ir = x[cr];
      O[cr] = L[ir];
    }
    return Z[1] = x.length, C.createSparseMatrix({
      values: O,
      index: x,
      ptr: Z,
      size: [z, 1],
      datatype: U
    });
  }
  function y(C, g) {
    var M = C._values, E = C._index, b = C._ptr, F = C._datatype;
    if (!M)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var B = g._data, S = g._datatype, z = C._size[0], $ = g._size[0], O = g._size[1], x, Z = a, U = t, T = u, I = 0;
    F && S && F === S && typeof F == "string" && (x = F, Z = e.find(a, [x, x]), U = e.find(t, [x, x]), T = e.find(u, [x, x]), I = e.convert(0, x));
    for (var R = [], K = [], L = [], q = C.createSparseMatrix({
      values: R,
      index: K,
      ptr: L,
      size: [z, O],
      datatype: x
    }), J = [], Q = [], j = 0; j < O; j++) {
      L[j] = K.length;
      for (var er = j + 1, nr = 0; nr < $; nr++) {
        var Y = B[nr][j];
        if (!T(Y, I))
          for (var pr = b[nr], cr = b[nr + 1], ir = pr; ir < cr; ir++) {
            var ur = E[ir];
            Q[ur] !== er ? (Q[ur] = er, K.push(ur), J[ur] = U(Y, M[ir])) : J[ur] = Z(J[ur], U(Y, M[ir]));
          }
      }
      for (var dr = L[j], Dr = K.length, Er = dr; Er < Dr; Er++) {
        var fr = K[Er];
        R[Er] = J[fr];
      }
    }
    return L[O] = K.length, q;
  }
  function A(C, g) {
    var M = C._values, E = C._index, b = C._ptr, F = C._datatype, B = g._values, S = g._index, z = g._ptr, $ = g._datatype, O = C._size[0], x = g._size[1], Z = M && B, U, T = a, I = t;
    F && $ && F === $ && typeof F == "string" && (U = F, T = e.find(a, [U, U]), I = e.find(t, [U, U]));
    for (var R = Z ? [] : void 0, K = [], L = [], q = C.createSparseMatrix({
      values: R,
      index: K,
      ptr: L,
      size: [O, x],
      datatype: U
    }), J = Z ? [] : void 0, Q = [], j, er, nr, Y, pr, cr, ir, ur, dr = 0; dr < x; dr++) {
      L[dr] = K.length;
      var Dr = dr + 1;
      for (pr = z[dr], cr = z[dr + 1], Y = pr; Y < cr; Y++)
        if (ur = S[Y], Z)
          for (er = b[ur], nr = b[ur + 1], j = er; j < nr; j++)
            ir = E[j], Q[ir] !== Dr ? (Q[ir] = Dr, K.push(ir), J[ir] = I(B[Y], M[j])) : J[ir] = T(J[ir], I(B[Y], M[j]));
        else
          for (er = b[ur], nr = b[ur + 1], j = er; j < nr; j++)
            ir = E[j], Q[ir] !== Dr && (Q[ir] = Dr, K.push(ir));
      if (Z)
        for (var Er = L[dr], fr = K.length, gr = Er; gr < fr; gr++) {
          var Fr = K[gr];
          R[gr] = J[Fr];
        }
    }
    return L[x] = K.length, q;
  }
  return e(On, t, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    "Array, Array": e.referTo("Matrix, Matrix", (C) => (g, M) => {
      l(Lr(g), Lr(M));
      var E = C(n(g), n(M));
      return Sr(E) ? E.valueOf() : E;
    }),
    "Matrix, Matrix": function(g, M) {
      var E = g.size(), b = M.size();
      return l(E, b), E.length === 1 ? b.length === 1 ? o(g, M, E[0]) : i(g, M) : b.length === 1 ? h(g, M) : d(g, M);
    },
    "Matrix, Array": e.referTo("Matrix,Matrix", (C) => (g, M) => C(g, n(M))),
    "Array, Matrix": e.referToSelf((C) => (g, M) => C(n(g, M.storage()), M)),
    "SparseMatrix, any": function(g, M) {
      return p(g, M, t, !1);
    },
    "DenseMatrix, any": function(g, M) {
      return v(g, M, t, !1);
    },
    "any, SparseMatrix": function(g, M) {
      return p(M, g, t, !0);
    },
    "any, DenseMatrix": function(g, M) {
      return v(M, g, t, !0);
    },
    "Array, any": function(g, M) {
      return v(n(g), M, t, !1).valueOf();
    },
    "any, Array": function(g, M) {
      return v(n(M), g, t, !0).valueOf();
    },
    "any, any": t,
    "any, any, ...any": e.referToSelf((C) => (g, M, E) => {
      for (var b = C(g, M), F = 0; F < E.length; F++)
        b = C(b, E[F]);
      return b;
    })
  });
}), $n = "sign", wf = ["typed", "BigNumber", "Fraction", "complex"], Af = /* @__PURE__ */ k($n, wf, (r) => {
  var {
    typed: e,
    BigNumber: n,
    complex: a,
    Fraction: t
  } = r;
  return e($n, {
    number: Qt,
    Complex: function(c) {
      return c.im === 0 ? a(Qt(c.re)) : c.sign();
    },
    BigNumber: function(c) {
      return new n(c.cmp(0));
    },
    Fraction: function(c) {
      return new t(c.s, 1);
    },
    // deep map collection, skip zeros since sign(0) = 0
    "Array | Matrix": e.referToSelf((u) => (c) => jr(c, u)),
    Unit: e.referToSelf((u) => (c) => {
      if (!c._isDerived() && c.units[0].unit.offset !== 0)
        throw new TypeError("sign is ambiguous for units with offset");
      return e.find(u, c.valueType())(c.value);
    })
  });
}), Ef = "sqrt", Ff = ["config", "typed", "Complex"], Cf = /* @__PURE__ */ k(Ef, Ff, (r) => {
  var {
    config: e,
    typed: n,
    Complex: a
  } = r;
  return n("sqrt", {
    number: t,
    Complex: function(c) {
      return c.sqrt();
    },
    BigNumber: function(c) {
      return !c.isNegative() || e.predictable ? c.sqrt() : t(c.toNumber());
    },
    Unit: function(c) {
      return c.pow(0.5);
    }
  });
  function t(u) {
    return isNaN(u) ? NaN : u >= 0 || e.predictable ? Math.sqrt(u) : new a(u, 0).sqrt();
  }
}), qn = "subtract", bf = ["typed", "matrix", "equalScalar", "addScalar", "unaryMinus", "DenseMatrix", "concat"], Mf = /* @__PURE__ */ k(qn, bf, (r) => {
  var {
    typed: e,
    matrix: n,
    equalScalar: a,
    addScalar: t,
    unaryMinus: u,
    DenseMatrix: c,
    concat: p
  } = r, v = ai({
    typed: e
  }), l = Ne({
    typed: e
  }), o = ui({
    typed: e,
    equalScalar: a
  }), i = ii({
    typed: e,
    DenseMatrix: c
  }), f = Be({
    typed: e,
    DenseMatrix: c
  }), h = Ee({
    typed: e,
    matrix: n,
    concat: p
  });
  return e(qn, {
    "number, number": (d, s) => d - s,
    "Complex, Complex": (d, s) => d.sub(s),
    "BigNumber, BigNumber": (d, s) => d.minus(s),
    "Fraction, Fraction": (d, s) => d.sub(s),
    "Unit, Unit": e.referToSelf((d) => (s, m) => {
      if (s.value === null)
        throw new Error("Parameter x contains a unit with undefined value");
      if (m.value === null)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!s.equalBase(m))
        throw new Error("Units do not match");
      var D = s.clone();
      return D.value = e.find(d, [D.valueType(), m.valueType()])(D.value, m.value), D.fixPrefix = !1, D;
    })
  }, h({
    SS: o,
    DS: v,
    SD: l,
    Ss: f,
    sS: i
  }));
}), Sf = "matAlgo07xSSf", Bf = ["typed", "DenseMatrix"], je = /* @__PURE__ */ k(Sf, Bf, (r) => {
  var {
    typed: e,
    DenseMatrix: n
  } = r;
  return function(u, c, p) {
    var v = u._size, l = u._datatype, o = c._size, i = c._datatype;
    if (v.length !== o.length)
      throw new Ar(v.length, o.length);
    if (v[0] !== o[0] || v[1] !== o[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + o + ")");
    var f = v[0], h = v[1], d, s = 0, m = p;
    typeof l == "string" && l === i && (d = l, s = e.convert(0, d), m = e.find(p, [d, d]));
    var D, w, y = [];
    for (D = 0; D < f; D++)
      y[D] = [];
    var A = [], C = [], g = [], M = [];
    for (w = 0; w < h; w++) {
      var E = w + 1;
      for (a(u, w, g, A, E), a(c, w, M, C, E), D = 0; D < f; D++) {
        var b = g[D] === E ? A[D] : s, F = M[D] === E ? C[D] : s;
        y[D][w] = m(b, F);
      }
    }
    return new n({
      data: y,
      size: [f, h],
      datatype: d
    });
  };
  function a(t, u, c, p, v) {
    for (var l = t._values, o = t._index, i = t._ptr, f = i[u], h = i[u + 1]; f < h; f++) {
      var d = o[f];
      c[d] = v, p[d] = l[f];
    }
  }
}), Pn = "conj", Nf = ["typed"], xf = /* @__PURE__ */ k(Pn, Nf, (r) => {
  var {
    typed: e
  } = r;
  return e(Pn, {
    "number | BigNumber | Fraction": (n) => n,
    Complex: (n) => n.conjugate(),
    "Array | Matrix": e.referToSelf((n) => (a) => jr(a, n))
  });
}), Rn = "im", _f = ["typed"], zf = /* @__PURE__ */ k(Rn, _f, (r) => {
  var {
    typed: e
  } = r;
  return e(Rn, {
    number: () => 0,
    "BigNumber | Fraction": (n) => n.mul(0),
    Complex: (n) => n.im,
    "Array | Matrix": e.referToSelf((n) => (a) => jr(a, n))
  });
}), Un = "re", Tf = ["typed"], If = /* @__PURE__ */ k(Un, Tf, (r) => {
  var {
    typed: e
  } = r;
  return e(Un, {
    "number | BigNumber | Fraction": (n) => n,
    Complex: (n) => n.re,
    "Array | Matrix": e.referToSelf((n) => (a) => jr(a, n))
  });
}), Ln = "concat", Of = ["typed", "matrix", "isInteger"], $f = /* @__PURE__ */ k(Ln, Of, (r) => {
  var {
    typed: e,
    matrix: n,
    isInteger: a
  } = r;
  return e(Ln, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function(u) {
      var c, p = u.length, v = -1, l, o = !1, i = [];
      for (c = 0; c < p; c++) {
        var f = u[c];
        if (Sr(f) && (o = !0), xr(f) || zr(f)) {
          if (c !== p - 1)
            throw new Error("Dimension must be specified as last argument");
          if (l = v, v = f.valueOf(), !a(v))
            throw new TypeError("Integer number expected for dimension");
          if (v < 0 || c > 0 && v > l)
            throw new Se(v, l + 1);
        } else {
          var h = wr(f).valueOf(), d = Lr(h);
          if (i[c] = h, l = v, v = d.length - 1, c > 0 && v !== l)
            throw new Ar(l + 1, v + 1);
        }
      }
      if (i.length === 0)
        throw new SyntaxError("At least one matrix expected");
      for (var s = i.shift(); i.length; )
        s = oi(s, i.shift(), v, 0);
      return o ? n(s) : s;
    },
    "...string": function(u) {
      return u.join("");
    }
  });
});
function oi(r, e, n, a) {
  if (a < n) {
    if (r.length !== e.length)
      throw new Ar(r.length, e.length);
    for (var t = [], u = 0; u < r.length; u++)
      t[u] = oi(r[u], e[u], n, a + 1);
    return t;
  } else
    return r.concat(e);
}
var Zn = "column", qf = ["typed", "Index", "matrix", "range"], Pf = /* @__PURE__ */ k(Zn, qf, (r) => {
  var {
    typed: e,
    Index: n,
    matrix: a,
    range: t
  } = r;
  return e(Zn, {
    "Matrix, number": u,
    "Array, number": function(p, v) {
      return u(a(wr(p)), v).valueOf();
    }
  });
  function u(c, p) {
    if (c.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    br(p, c.size()[1]);
    var v = t(0, c.size()[0]), l = new n(v, p), o = c.subset(l);
    return Sr(o) ? o : a([[o]]);
  }
}), Vn = "diag", Rf = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], Uf = /* @__PURE__ */ k(Vn, Rf, (r) => {
  var {
    typed: e,
    matrix: n,
    DenseMatrix: a,
    SparseMatrix: t
  } = r;
  return e(Vn, {
    // FIXME: simplify this huge amount of signatures as soon as typed-function supports optional arguments
    Array: function(l) {
      return u(l, 0, Lr(l), null);
    },
    "Array, number": function(l, o) {
      return u(l, o, Lr(l), null);
    },
    "Array, BigNumber": function(l, o) {
      return u(l, o.toNumber(), Lr(l), null);
    },
    "Array, string": function(l, o) {
      return u(l, 0, Lr(l), o);
    },
    "Array, number, string": function(l, o, i) {
      return u(l, o, Lr(l), i);
    },
    "Array, BigNumber, string": function(l, o, i) {
      return u(l, o.toNumber(), Lr(l), i);
    },
    Matrix: function(l) {
      return u(l, 0, l.size(), l.storage());
    },
    "Matrix, number": function(l, o) {
      return u(l, o, l.size(), l.storage());
    },
    "Matrix, BigNumber": function(l, o) {
      return u(l, o.toNumber(), l.size(), l.storage());
    },
    "Matrix, string": function(l, o) {
      return u(l, 0, l.size(), o);
    },
    "Matrix, number, string": function(l, o, i) {
      return u(l, o, l.size(), i);
    },
    "Matrix, BigNumber, string": function(l, o, i) {
      return u(l, o.toNumber(), l.size(), i);
    }
  });
  function u(v, l, o, i) {
    if (!Mr(l))
      throw new TypeError("Second parameter in function diag must be an integer");
    var f = l > 0 ? l : 0, h = l < 0 ? -l : 0;
    switch (o.length) {
      case 1:
        return c(v, l, i, o[0], h, f);
      case 2:
        return p(v, l, i, o, h, f);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function c(v, l, o, i, f, h) {
    var d = [i + f, i + h];
    if (o && o !== "sparse" && o !== "dense")
      throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var s = o === "sparse" ? t.diagonal(d, v, l) : a.diagonal(d, v, l);
    return o !== null ? s : s.valueOf();
  }
  function p(v, l, o, i, f, h) {
    if (Sr(v)) {
      var d = v.diagonal(l);
      return o !== null ? o !== d.storage() ? n(d, o) : d : d.valueOf();
    }
    for (var s = Math.min(i[0] - f, i[1] - h), m = [], D = 0; D < s; D++)
      m[D] = v[D + f][D + h];
    return o !== null ? n(m) : m;
  }
}), Yn = "flatten", Lf = ["typed", "matrix"], Zf = /* @__PURE__ */ k(Yn, Lf, (r) => {
  var {
    typed: e,
    matrix: n
  } = r;
  return e(Yn, {
    Array: function(t) {
      return Pe(t);
    },
    Matrix: function(t) {
      var u = Pe(t.toArray());
      return n(u);
    }
  });
}), Jn = "identity", Vf = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Yf = /* @__PURE__ */ k(Jn, Vf, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a,
    BigNumber: t,
    DenseMatrix: u,
    SparseMatrix: c
  } = r;
  return e(Jn, {
    "": function() {
      return n.matrix === "Matrix" ? a([]) : [];
    },
    string: function(o) {
      return a(o);
    },
    "number | BigNumber": function(o) {
      return v(o, o, n.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, string": function(o, i) {
      return v(o, o, i);
    },
    "number | BigNumber, number | BigNumber": function(o, i) {
      return v(o, i, n.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, number | BigNumber, string": function(o, i, f) {
      return v(o, i, f);
    },
    Array: function(o) {
      return p(o);
    },
    "Array, string": function(o, i) {
      return p(o, i);
    },
    Matrix: function(o) {
      return p(o.valueOf(), o.storage());
    },
    "Matrix, string": function(o, i) {
      return p(o.valueOf(), i);
    }
  });
  function p(l, o) {
    switch (l.length) {
      case 0:
        return o ? a(o) : [];
      case 1:
        return v(l[0], l[0], o);
      case 2:
        return v(l[0], l[1], o);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function v(l, o, i) {
    var f = zr(l) || zr(o) ? t : null;
    if (zr(l) && (l = l.toNumber()), zr(o) && (o = o.toNumber()), !Mr(l) || l < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!Mr(o) || o < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var h = f ? new t(1) : 1, d = f ? new f(0) : 0, s = [l, o];
    if (i) {
      if (i === "sparse")
        return c.diagonal(s, h, 0, d);
      if (i === "dense")
        return u.diagonal(s, h, 0, d);
      throw new TypeError('Unknown matrix type "'.concat(i, '"'));
    }
    for (var m = vt([], s, d), D = l < o ? l : o, w = 0; w < D; w++)
      m[w][w] = h;
    return m;
  }
});
function si() {
  throw new Error('No "bignumber" implementation available');
}
function Jf() {
  throw new Error('No "fraction" implementation available');
}
function fi() {
  throw new Error('No "matrix" implementation available');
}
var Qn = "range", Qf = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq"], Xf = /* @__PURE__ */ k(Qn, Qf, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a,
    bignumber: t,
    smaller: u,
    smallerEq: c,
    larger: p,
    largerEq: v
  } = r;
  return e(Qn, {
    // TODO: simplify signatures when typed-function supports default values and optional arguments
    // TODO: a number or boolean should not be converted to string here
    string: o,
    "string, boolean": o,
    "number, number": function(D, w) {
      return l(i(D, w, 1));
    },
    "number, number, number": function(D, w, y) {
      return l(i(D, w, y));
    },
    "number, number, boolean": function(D, w, y) {
      return l(y ? f(D, w, 1) : i(D, w, 1));
    },
    "number, number, number, boolean": function(D, w, y, A) {
      return l(A ? f(D, w, y) : i(D, w, y));
    },
    "BigNumber, BigNumber": function(D, w) {
      var y = D.constructor;
      return l(h(D, w, new y(1)));
    },
    "BigNumber, BigNumber, BigNumber": function(D, w, y) {
      return l(h(D, w, y));
    },
    "BigNumber, BigNumber, boolean": function(D, w, y) {
      var A = D.constructor;
      return l(y ? d(D, w, new A(1)) : h(D, w, new A(1)));
    },
    "BigNumber, BigNumber, BigNumber, boolean": function(D, w, y, A) {
      return l(A ? d(D, w, y) : h(D, w, y));
    }
  });
  function l(m) {
    return n.matrix === "Matrix" ? a ? a(m) : fi() : m;
  }
  function o(m, D) {
    var w = s(m);
    if (!w)
      throw new SyntaxError('String "' + m + '" is no valid range');
    var y;
    return n.number === "BigNumber" ? (t === void 0 && si(), y = D ? d : h, l(y(t(w.start), t(w.end), t(w.step)))) : (y = D ? f : i, l(y(w.start, w.end, w.step)));
  }
  function i(m, D, w) {
    var y = [], A = m;
    if (w > 0)
      for (; u(A, D); )
        y.push(A), A += w;
    else if (w < 0)
      for (; p(A, D); )
        y.push(A), A += w;
    return y;
  }
  function f(m, D, w) {
    var y = [], A = m;
    if (w > 0)
      for (; c(A, D); )
        y.push(A), A += w;
    else if (w < 0)
      for (; v(A, D); )
        y.push(A), A += w;
    return y;
  }
  function h(m, D, w) {
    var y = t(0), A = [], C = m;
    if (w.gt(y))
      for (; u(C, D); )
        A.push(C), C = C.plus(w);
    else if (w.lt(y))
      for (; p(C, D); )
        A.push(C), C = C.plus(w);
    return A;
  }
  function d(m, D, w) {
    var y = t(0), A = [], C = m;
    if (w.gt(y))
      for (; c(C, D); )
        A.push(C), C = C.plus(w);
    else if (w.lt(y))
      for (; v(C, D); )
        A.push(C), C = C.plus(w);
    return A;
  }
  function s(m) {
    var D = m.split(":"), w = D.map(function(A) {
      return Number(A);
    }), y = w.some(function(A) {
      return isNaN(A);
    });
    if (y)
      return null;
    switch (w.length) {
      case 2:
        return {
          start: w[0],
          end: w[1],
          step: 1
        };
      case 3:
        return {
          start: w[0],
          end: w[2],
          step: w[1]
        };
      default:
        return null;
    }
  }
}), Xn = "reshape", Gf = ["typed", "isInteger", "matrix"], Kf = /* @__PURE__ */ k(Xn, Gf, (r) => {
  var {
    typed: e,
    isInteger: n
  } = r;
  return e(Xn, {
    "Matrix, Array": function(t, u) {
      return t.reshape(u, !0);
    },
    "Array, Array": function(t, u) {
      return u.forEach(function(c) {
        if (!n(c))
          throw new TypeError("Invalid size for dimension: " + c);
      }), Ba(t, u);
    }
  });
}), Gn = "size", Wf = ["typed", "config", "?matrix"], Hf = /* @__PURE__ */ k(Gn, Wf, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a
  } = r;
  return e(Gn, {
    Matrix: function(u) {
      return u.create(u.size());
    },
    Array: Lr,
    string: function(u) {
      return n.matrix === "Array" ? [u.length] : a([u.length]);
    },
    "number | Complex | BigNumber | Unit | boolean | null": function(u) {
      return n.matrix === "Array" ? [] : a ? a([]) : fi();
    }
  });
}), Kn = "subset", kf = ["typed", "matrix"], jf = /* @__PURE__ */ k(Kn, kf, (r) => {
  var {
    typed: e,
    matrix: n
  } = r;
  return e(Kn, {
    // get subset
    "Array, Index": function(t, u) {
      var c = n(t), p = c.subset(u);
      return u.isScalar() ? p : p.valueOf();
    },
    "Matrix, Index": function(t, u) {
      return t.subset(u);
    },
    "Object, Index": e0,
    "string, Index": r0,
    // set subset
    "Array, Index, any": function(t, u, c) {
      return n(wr(t)).subset(u, c, void 0).valueOf();
    },
    "Array, Index, any, any": function(t, u, c, p) {
      return n(wr(t)).subset(u, c, p).valueOf();
    },
    "Matrix, Index, any": function(t, u, c) {
      return t.clone().subset(u, c);
    },
    "Matrix, Index, any, any": function(t, u, c, p) {
      return t.clone().subset(u, c, p);
    },
    "string, Index, string": Wn,
    "string, Index, string, string": Wn,
    "Object, Index, any": t0
  });
});
function r0(r, e) {
  if (!Ct(e))
    throw new TypeError("Index expected");
  if (e.size().length !== 1)
    throw new Ar(e.size().length, 1);
  var n = r.length;
  br(e.min()[0], n), br(e.max()[0], n);
  var a = e.dimension(0), t = "";
  return a.forEach(function(u) {
    t += r.charAt(u);
  }), t;
}
function Wn(r, e, n, a) {
  if (!e || e.isIndex !== !0)
    throw new TypeError("Index expected");
  if (e.size().length !== 1)
    throw new Ar(e.size().length, 1);
  if (a !== void 0) {
    if (typeof a != "string" || a.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    a = " ";
  var t = e.dimension(0), u = t.size()[0];
  if (u !== n.length)
    throw new Ar(t.size()[0], n.length);
  var c = r.length;
  br(e.min()[0]), br(e.max()[0]);
  for (var p = [], v = 0; v < c; v++)
    p[v] = r.charAt(v);
  if (t.forEach(function(i, f) {
    p[i] = n.charAt(f[0]);
  }), p.length > c)
    for (var l = c - 1, o = p.length; l < o; l++)
      p[l] || (p[l] = a);
  return p.join("");
}
function e0(r, e) {
  if (e.size().length !== 1)
    throw new Ar(e.size(), 1);
  var n = e.dimension(0);
  if (typeof n != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  return za(r, n);
}
function t0(r, e, n) {
  if (e.size().length !== 1)
    throw new Ar(e.size(), 1);
  var a = e.dimension(0);
  if (typeof a != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var t = wr(r);
  return Ta(t, a, n), t;
}
var Hn = "transpose", n0 = ["typed", "matrix"], a0 = /* @__PURE__ */ k(Hn, n0, (r) => {
  var {
    typed: e,
    matrix: n
  } = r;
  return e(Hn, {
    Array: (c) => a(n(c)).valueOf(),
    Matrix: a,
    any: wr
    // scalars
  });
  function a(c) {
    var p = c.size(), v;
    switch (p.length) {
      case 1:
        v = c.clone();
        break;
      case 2:
        {
          var l = p[0], o = p[1];
          if (o === 0)
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Nr(p) + ")");
          switch (c.storage()) {
            case "dense":
              v = t(c, l, o);
              break;
            case "sparse":
              v = u(c, l, o);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Nr(p) + ")");
    }
    return v;
  }
  function t(c, p, v) {
    for (var l = c._data, o = [], i, f = 0; f < v; f++) {
      i = o[f] = [];
      for (var h = 0; h < p; h++)
        i[h] = wr(l[h][f]);
    }
    return c.createDenseMatrix({
      data: o,
      size: [v, p],
      datatype: c._datatype
    });
  }
  function u(c, p, v) {
    for (var l = c._values, o = c._index, i = c._ptr, f = l ? [] : void 0, h = [], d = [], s = [], m = 0; m < p; m++)
      s[m] = 0;
    var D, w, y;
    for (D = 0, w = o.length; D < w; D++)
      s[o[D]]++;
    for (var A = 0, C = 0; C < p; C++)
      d.push(A), A += s[C], s[C] = d[C];
    for (d.push(A), y = 0; y < v; y++)
      for (var g = i[y], M = i[y + 1], E = g; E < M; E++) {
        var b = s[o[E]]++;
        h[b] = y, l && (f[b] = wr(l[E]));
      }
    return c.createSparseMatrix({
      values: f,
      index: h,
      ptr: d,
      size: [v, p],
      datatype: c._datatype
    });
  }
}), kn = "ctranspose", i0 = ["typed", "transpose", "conj"], u0 = /* @__PURE__ */ k(kn, i0, (r) => {
  var {
    typed: e,
    transpose: n,
    conj: a
  } = r;
  return e(kn, {
    any: function(u) {
      return a(n(u));
    }
  });
}), jn = "zeros", o0 = ["typed", "config", "matrix", "BigNumber"], s0 = /* @__PURE__ */ k(jn, o0, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a,
    BigNumber: t
  } = r;
  return e(jn, {
    "": function() {
      return n.matrix === "Array" ? u([]) : u([], "default");
    },
    // math.zeros(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function(l) {
      var o = l[l.length - 1];
      if (typeof o == "string") {
        var i = l.pop();
        return u(l, i);
      } else
        return n.matrix === "Array" ? u(l) : u(l, "default");
    },
    Array: u,
    Matrix: function(l) {
      var o = l.storage();
      return u(l.valueOf(), o);
    },
    "Array | Matrix, string": function(l, o) {
      return u(l.valueOf(), o);
    }
  });
  function u(v, l) {
    var o = c(v), i = o ? new t(0) : 0;
    if (p(v), l) {
      var f = a(l);
      return v.length > 0 ? f.resize(v, i) : f;
    } else {
      var h = [];
      return v.length > 0 ? vt(h, v, i) : h;
    }
  }
  function c(v) {
    var l = !1;
    return v.forEach(function(o, i, f) {
      zr(o) && (l = !0, f[i] = o.toNumber());
    }), l;
  }
  function p(v) {
    v.forEach(function(l) {
      if (typeof l != "number" || !Mr(l) || l < 0)
        throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), f0 = "numeric", c0 = ["number", "?bignumber", "?fraction"], l0 = /* @__PURE__ */ k(f0, c0, (r) => {
  var {
    number: e,
    bignumber: n,
    fraction: a
  } = r, t = {
    string: !0,
    number: !0,
    BigNumber: !0,
    Fraction: !0
  }, u = {
    number: (c) => e(c),
    BigNumber: n ? (c) => n(c) : si,
    Fraction: a ? (c) => a(c) : Jf
  };
  return function(p) {
    var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", l = arguments.length > 2 ? arguments[2] : void 0;
    if (l !== void 0)
      throw new SyntaxError("numeric() takes one or two arguments");
    var o = se(p);
    if (!(o in t))
      throw new TypeError("Cannot convert " + p + ' of type "' + o + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(v in u))
      throw new TypeError("Cannot convert " + p + ' to type "' + v + '"; valid output types are ' + Object.keys(u).join(", "));
    return v === o ? p : u[v](p);
  };
}), ra = "divideScalar", v0 = ["typed", "numeric"], h0 = /* @__PURE__ */ k(ra, v0, (r) => {
  var {
    typed: e,
    numeric: n
  } = r;
  return e(ra, {
    "number, number": function(t, u) {
      return t / u;
    },
    "Complex, Complex": function(t, u) {
      return t.div(u);
    },
    "BigNumber, BigNumber": function(t, u) {
      return t.div(u);
    },
    "Fraction, Fraction": function(t, u) {
      return t.div(u);
    },
    "Unit, number | Complex | Fraction | BigNumber | Unit": (a, t) => a.divide(t),
    "number | Fraction | Complex | BigNumber, Unit": (a, t) => t.divideInto(a)
  });
}), ea = "pow", p0 = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], d0 = /* @__PURE__ */ k(ea, p0, (r) => {
  var {
    typed: e,
    config: n,
    identity: a,
    multiply: t,
    matrix: u,
    inv: c,
    number: p,
    fraction: v,
    Complex: l
  } = r;
  return e(ea, {
    "number, number": o,
    "Complex, Complex": function(d, s) {
      return d.pow(s);
    },
    "BigNumber, BigNumber": function(d, s) {
      return s.isInteger() || d >= 0 || n.predictable ? d.pow(s) : new l(d.toNumber(), 0).pow(s.toNumber(), 0);
    },
    "Fraction, Fraction": function(d, s) {
      var m = d.pow(s);
      if (m != null)
        return m;
      if (n.predictable)
        throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
      return o(d.valueOf(), s.valueOf());
    },
    "Array, number": i,
    "Array, BigNumber": function(d, s) {
      return i(d, s.toNumber());
    },
    "Matrix, number": f,
    "Matrix, BigNumber": function(d, s) {
      return f(d, s.toNumber());
    },
    "Unit, number | BigNumber": function(d, s) {
      return d.pow(s);
    }
  });
  function o(h, d) {
    if (n.predictable && !Mr(d) && h < 0)
      try {
        var s = v(d), m = p(s);
        if ((d === m || Math.abs((d - m) / d) < 1e-14) && s.d % 2 === 1)
          return (s.n % 2 === 0 ? 1 : -1) * Math.pow(-h, d);
      } catch {
      }
    return n.predictable && (h < -1 && d === 1 / 0 || h > -1 && h < 0 && d === -1 / 0) ? NaN : Mr(d) || h >= 0 || n.predictable ? ei(h, d) : h * h < 1 && d === 1 / 0 || h * h > 1 && d === -1 / 0 ? 0 : new l(h, 0).pow(d, 0);
  }
  function i(h, d) {
    if (!Mr(d))
      throw new TypeError("For A^b, b must be an integer (value is " + d + ")");
    var s = Lr(h);
    if (s.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + s.length + " dimensions)");
    if (s[0] !== s[1])
      throw new Error("For A^b, A must be square (size is " + s[0] + "x" + s[1] + ")");
    if (d < 0)
      try {
        return i(c(h), -d);
      } catch (w) {
        throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + d + ")") : w;
      }
    for (var m = a(s[0]).valueOf(), D = h; d >= 1; )
      (d & 1) === 1 && (m = t(D, m)), d >>= 1, D = t(D, D);
    return m;
  }
  function f(h, d) {
    return u(i(h.valueOf(), d));
  }
});
function xt(r) {
  var {
    DenseMatrix: e
  } = r;
  return function(a, t, u) {
    var c = a.size();
    if (c.length !== 2)
      throw new RangeError("Matrix must be two dimensional (size: " + Nr(c) + ")");
    var p = c[0], v = c[1];
    if (p !== v)
      throw new RangeError("Matrix must be square (size: " + Nr(c) + ")");
    var l = [];
    if (Sr(t)) {
      var o = t.size(), i = t._data;
      if (o.length === 1) {
        if (o[0] !== p)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var f = 0; f < p; f++)
          l[f] = [i[f]];
        return new e({
          data: l,
          size: [p, 1],
          datatype: t._datatype
        });
      }
      if (o.length === 2) {
        if (o[0] !== p || o[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (ct(t)) {
          if (u) {
            l = [];
            for (var h = 0; h < p; h++)
              l[h] = [i[h][0]];
            return new e({
              data: l,
              size: [p, 1],
              datatype: t._datatype
            });
          }
          return t;
        }
        if (Ie(t)) {
          for (var d = 0; d < p; d++)
            l[d] = [0];
          for (var s = t._values, m = t._index, D = t._ptr, w = D[1], y = D[0]; y < w; y++) {
            var A = m[y];
            l[A][0] = s[y];
          }
          return new e({
            data: l,
            size: [p, 1],
            datatype: t._datatype
          });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Cr(t)) {
      var C = Lr(t);
      if (C.length === 1) {
        if (C[0] !== p)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var g = 0; g < p; g++)
          l[g] = [t[g]];
        return new e({
          data: l,
          size: [p, 1]
        });
      }
      if (C.length === 2) {
        if (C[0] !== p || C[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var M = 0; M < p; M++)
          l[M] = [t[M][0]];
        return new e({
          data: l,
          size: [p, 1]
        });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var ta = "lsolve", m0 = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], D0 = /* @__PURE__ */ k(ta, m0, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: a,
    multiplyScalar: t,
    subtract: u,
    equalScalar: c,
    DenseMatrix: p
  } = r, v = xt({
    DenseMatrix: p
  });
  return e(ta, {
    "SparseMatrix, Array | Matrix": function(f, h) {
      return o(f, h);
    },
    "DenseMatrix, Array | Matrix": function(f, h) {
      return l(f, h);
    },
    "Array, Array | Matrix": function(f, h) {
      var d = n(f), s = l(d, h);
      return s.valueOf();
    }
  });
  function l(i, f) {
    f = v(i, f, !0);
    for (var h = f._data, d = i._size[0], s = i._size[1], m = [], D = i._data, w = 0; w < s; w++) {
      var y = h[w][0] || 0, A = void 0;
      if (c(y, 0))
        A = 0;
      else {
        var C = D[w][w];
        if (c(C, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = a(y, C);
        for (var g = w + 1; g < d; g++)
          h[g] = [u(h[g][0] || 0, t(A, D[g][w]))];
      }
      m[w] = [A];
    }
    return new p({
      data: m,
      size: [d, 1]
    });
  }
  function o(i, f) {
    f = v(i, f, !0);
    for (var h = f._data, d = i._size[0], s = i._size[1], m = i._values, D = i._index, w = i._ptr, y = [], A = 0; A < s; A++) {
      var C = h[A][0] || 0;
      if (c(C, 0))
        y[A] = [0];
      else {
        for (var g = 0, M = [], E = [], b = w[A], F = w[A + 1], B = b; B < F; B++) {
          var S = D[B];
          S === A ? g = m[B] : S > A && (M.push(m[B]), E.push(S));
        }
        if (c(g, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var z = a(C, g), $ = 0, O = E.length; $ < O; $++) {
          var x = E[$];
          h[x] = [u(h[x][0] || 0, t(z, M[$]))];
        }
        y[A] = [z];
      }
    }
    return new p({
      data: y,
      size: [d, 1]
    });
  }
}), na = "usolve", g0 = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], y0 = /* @__PURE__ */ k(na, g0, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: a,
    multiplyScalar: t,
    subtract: u,
    equalScalar: c,
    DenseMatrix: p
  } = r, v = xt({
    DenseMatrix: p
  });
  return e(na, {
    "SparseMatrix, Array | Matrix": function(f, h) {
      return o(f, h);
    },
    "DenseMatrix, Array | Matrix": function(f, h) {
      return l(f, h);
    },
    "Array, Array | Matrix": function(f, h) {
      var d = n(f), s = l(d, h);
      return s.valueOf();
    }
  });
  function l(i, f) {
    f = v(i, f, !0);
    for (var h = f._data, d = i._size[0], s = i._size[1], m = [], D = i._data, w = s - 1; w >= 0; w--) {
      var y = h[w][0] || 0, A = void 0;
      if (c(y, 0))
        A = 0;
      else {
        var C = D[w][w];
        if (c(C, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = a(y, C);
        for (var g = w - 1; g >= 0; g--)
          h[g] = [u(h[g][0] || 0, t(A, D[g][w]))];
      }
      m[w] = [A];
    }
    return new p({
      data: m,
      size: [d, 1]
    });
  }
  function o(i, f) {
    f = v(i, f, !0);
    for (var h = f._data, d = i._size[0], s = i._size[1], m = i._values, D = i._index, w = i._ptr, y = [], A = s - 1; A >= 0; A--) {
      var C = h[A][0] || 0;
      if (c(C, 0))
        y[A] = [0];
      else {
        for (var g = 0, M = [], E = [], b = w[A], F = w[A + 1], B = F - 1; B >= b; B--) {
          var S = D[B];
          S === A ? g = m[B] : S < A && (M.push(m[B]), E.push(S));
        }
        if (c(g, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var z = a(C, g), $ = 0, O = E.length; $ < O; $++) {
          var x = E[$];
          h[x] = [u(h[x][0], t(z, M[$]))];
        }
        y[A] = [z];
      }
    }
    return new p({
      data: y,
      size: [d, 1]
    });
  }
}), aa = "usolveAll", w0 = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], A0 = /* @__PURE__ */ k(aa, w0, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: a,
    multiplyScalar: t,
    subtract: u,
    equalScalar: c,
    DenseMatrix: p
  } = r, v = xt({
    DenseMatrix: p
  });
  return e(aa, {
    "SparseMatrix, Array | Matrix": function(f, h) {
      return o(f, h);
    },
    "DenseMatrix, Array | Matrix": function(f, h) {
      return l(f, h);
    },
    "Array, Array | Matrix": function(f, h) {
      var d = n(f), s = l(d, h);
      return s.map((m) => m.valueOf());
    }
  });
  function l(i, f) {
    for (var h = [v(i, f, !0)._data.map((E) => E[0])], d = i._data, s = i._size[0], m = i._size[1], D = m - 1; D >= 0; D--)
      for (var w = h.length, y = 0; y < w; y++) {
        var A = h[y];
        if (c(d[D][D], 0))
          if (c(A[D], 0)) {
            if (y === 0) {
              var g = [...A];
              g[D] = 1;
              for (var M = D - 1; M >= 0; M--)
                g[M] = u(g[M], d[M][D]);
              h.push(g);
            }
          } else {
            if (y === 0)
              return [];
            h.splice(y, 1), y -= 1, w -= 1;
          }
        else {
          A[D] = a(A[D], d[D][D]);
          for (var C = D - 1; C >= 0; C--)
            A[C] = u(A[C], t(A[D], d[C][D]));
        }
      }
    return h.map((E) => new p({
      data: E.map((b) => [b]),
      size: [s, 1]
    }));
  }
  function o(i, f) {
    for (var h = [v(i, f, !0)._data.map((R) => R[0])], d = i._size[0], s = i._size[1], m = i._values, D = i._index, w = i._ptr, y = s - 1; y >= 0; y--)
      for (var A = h.length, C = 0; C < A; C++) {
        for (var g = h[C], M = [], E = [], b = w[y], F = w[y + 1], B = 0, S = F - 1; S >= b; S--) {
          var z = D[S];
          z === y ? B = m[S] : z < y && (M.push(m[S]), E.push(z));
        }
        if (c(B, 0))
          if (c(g[y], 0)) {
            if (C === 0) {
              var Z = [...g];
              Z[y] = 1;
              for (var U = 0, T = E.length; U < T; U++) {
                var I = E[U];
                Z[I] = u(Z[I], M[U]);
              }
              h.push(Z);
            }
          } else {
            if (C === 0)
              return [];
            h.splice(C, 1), C -= 1, A -= 1;
          }
        else {
          g[y] = a(g[y], B);
          for (var $ = 0, O = E.length; $ < O; $++) {
            var x = E[$];
            g[x] = u(g[x], t(g[y], M[$]));
          }
        }
      }
    return h.map((R) => new p({
      data: R.map((K) => [K]),
      size: [d, 1]
    }));
  }
}), gt = "compare", E0 = ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix", "concat"], F0 = /* @__PURE__ */ k(gt, E0, (r) => {
  var {
    typed: e,
    config: n,
    equalScalar: a,
    matrix: t,
    BigNumber: u,
    Fraction: c,
    DenseMatrix: p,
    concat: v
  } = r, l = Ne({
    typed: e
  }), o = ui({
    typed: e,
    equalScalar: a
  }), i = Be({
    typed: e,
    DenseMatrix: p
  }), f = Ee({
    typed: e,
    matrix: t,
    concat: v
  }), h = Ve({
    typed: e
  });
  return e(gt, C0({
    typed: e,
    config: n
  }), {
    "boolean, boolean": function(s, m) {
      return s === m ? 0 : s > m ? 1 : -1;
    },
    "BigNumber, BigNumber": function(s, m) {
      return Ze(s, m, n.epsilon) ? new u(0) : new u(s.cmp(m));
    },
    "Fraction, Fraction": function(s, m) {
      return new c(s.compare(m));
    },
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, h, f({
    SS: o,
    DS: l,
    Ss: i
  }));
}), C0 = /* @__PURE__ */ k(gt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(gt, {
    "number, number": function(t, u) {
      return pe(t, u, n.epsilon) ? 0 : t > u ? 1 : -1;
    }
  });
}), b0 = function r(e, n) {
  var a = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, t = /(^[ ]*|[ ]*$)/g, u = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, c = /^0x[0-9a-f]+$/i, p = /^0/, v = function(y) {
    return r.insensitive && ("" + y).toLowerCase() || "" + y;
  }, l = v(e).replace(t, "") || "", o = v(n).replace(t, "") || "", i = l.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), f = o.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), h = parseInt(l.match(c), 16) || i.length !== 1 && l.match(u) && Date.parse(l), d = parseInt(o.match(c), 16) || h && o.match(u) && Date.parse(o) || null, s, m;
  if (d) {
    if (h < d)
      return -1;
    if (h > d)
      return 1;
  }
  for (var D = 0, w = Math.max(i.length, f.length); D < w; D++) {
    if (s = !(i[D] || "").match(p) && parseFloat(i[D]) || i[D] || 0, m = !(f[D] || "").match(p) && parseFloat(f[D]) || f[D] || 0, isNaN(s) !== isNaN(m))
      return isNaN(s) ? 1 : -1;
    if (typeof s != typeof m && (s += "", m += ""), s < m)
      return -1;
    if (s > m)
      return 1;
  }
  return 0;
};
const ze = /* @__PURE__ */ jt(b0);
var ia = "compareNatural", M0 = ["typed", "compare"], S0 = /* @__PURE__ */ k(ia, M0, (r) => {
  var {
    typed: e,
    compare: n
  } = r, a = n.signatures["boolean,boolean"];
  return e(ia, {
    "any, any": t
  });
  function t(v, l) {
    var o = se(v), i = se(l), f;
    if ((o === "number" || o === "BigNumber" || o === "Fraction") && (i === "number" || i === "BigNumber" || i === "Fraction"))
      return f = n(v, l), f.toString() !== "0" ? f > 0 ? 1 : -1 : ze(o, i);
    var h = ["Array", "DenseMatrix", "SparseMatrix"];
    if (h.includes(o) || h.includes(i))
      return f = u(t, v, l), f !== 0 ? f : ze(o, i);
    if (o !== i)
      return ze(o, i);
    if (o === "Complex")
      return B0(v, l);
    if (o === "Unit")
      return v.equalBase(l) ? t(v.value, l.value) : c(t, v.formatUnits(), l.formatUnits());
    if (o === "boolean")
      return a(v, l);
    if (o === "string")
      return ze(v, l);
    if (o === "Object")
      return p(t, v, l);
    if (o === "null" || o === "undefined")
      return 0;
    throw new TypeError('Unsupported type of value "' + o + '"');
  }
  function u(v, l, o) {
    return Ie(l) && Ie(o) ? c(v, l.toJSON().values, o.toJSON().values) : Ie(l) ? u(v, l.toArray(), o) : Ie(o) ? u(v, l, o.toArray()) : ct(l) ? u(v, l.toJSON().data, o) : ct(o) ? u(v, l, o.toJSON().data) : Array.isArray(l) ? Array.isArray(o) ? c(v, l, o) : u(v, l, [o]) : u(v, [l], o);
  }
  function c(v, l, o) {
    for (var i = 0, f = Math.min(l.length, o.length); i < f; i++) {
      var h = v(l[i], o[i]);
      if (h !== 0)
        return h;
    }
    return l.length > o.length ? 1 : l.length < o.length ? -1 : 0;
  }
  function p(v, l, o) {
    var i = Object.keys(l), f = Object.keys(o);
    i.sort(ze), f.sort(ze);
    var h = c(v, i, f);
    if (h !== 0)
      return h;
    for (var d = 0; d < i.length; d++) {
      var s = v(l[i[d]], o[f[d]]);
      if (s !== 0)
        return s;
    }
    return 0;
  }
});
function B0(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}
var yt = "equal", N0 = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], x0 = /* @__PURE__ */ k(yt, N0, (r) => {
  var {
    typed: e,
    matrix: n,
    equalScalar: a,
    DenseMatrix: t,
    concat: u
  } = r, c = Ne({
    typed: e
  }), p = je({
    typed: e,
    DenseMatrix: t
  }), v = Be({
    typed: e,
    DenseMatrix: t
  }), l = Ee({
    typed: e,
    matrix: n,
    concat: u
  });
  return e(yt, _0({
    typed: e,
    equalScalar: a
  }), l({
    elop: a,
    SS: p,
    DS: c,
    Ss: v
  }));
}), _0 = k(yt, ["typed", "equalScalar"], (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return e(yt, {
    "any, any": function(t, u) {
      return t === null ? u === null : u === null ? t === null : t === void 0 ? u === void 0 : u === void 0 ? t === void 0 : n(t, u);
    }
  });
}), wt = "smaller", z0 = ["typed", "config", "matrix", "DenseMatrix", "concat"], T0 = /* @__PURE__ */ k(wt, z0, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a,
    DenseMatrix: t,
    concat: u
  } = r, c = Ne({
    typed: e
  }), p = je({
    typed: e,
    DenseMatrix: t
  }), v = Be({
    typed: e,
    DenseMatrix: t
  }), l = Ee({
    typed: e,
    matrix: a,
    concat: u
  }), o = Ve({
    typed: e
  });
  return e(wt, I0({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (i, f) => i < f,
    "BigNumber, BigNumber": function(f, h) {
      return f.lt(h) && !Ze(f, h, n.epsilon);
    },
    "Fraction, Fraction": (i, f) => i.compare(f) === -1,
    "Complex, Complex": function(f, h) {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, o, l({
    SS: p,
    DS: c,
    Ss: v
  }));
}), I0 = /* @__PURE__ */ k(wt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(wt, {
    "number, number": function(t, u) {
      return t < u && !pe(t, u, n.epsilon);
    }
  });
}), At = "smallerEq", O0 = ["typed", "config", "matrix", "DenseMatrix", "concat"], $0 = /* @__PURE__ */ k(At, O0, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a,
    DenseMatrix: t,
    concat: u
  } = r, c = Ne({
    typed: e
  }), p = je({
    typed: e,
    DenseMatrix: t
  }), v = Be({
    typed: e,
    DenseMatrix: t
  }), l = Ee({
    typed: e,
    matrix: a,
    concat: u
  }), o = Ve({
    typed: e
  });
  return e(At, q0({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (i, f) => i <= f,
    "BigNumber, BigNumber": function(f, h) {
      return f.lte(h) || Ze(f, h, n.epsilon);
    },
    "Fraction, Fraction": (i, f) => i.compare(f) !== 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, o, l({
    SS: p,
    DS: c,
    Ss: v
  }));
}), q0 = /* @__PURE__ */ k(At, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(At, {
    "number, number": function(t, u) {
      return t <= u || pe(t, u, n.epsilon);
    }
  });
}), Et = "larger", P0 = ["typed", "config", "matrix", "DenseMatrix", "concat"], R0 = /* @__PURE__ */ k(Et, P0, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a,
    DenseMatrix: t,
    concat: u
  } = r, c = Ne({
    typed: e
  }), p = je({
    typed: e,
    DenseMatrix: t
  }), v = Be({
    typed: e,
    DenseMatrix: t
  }), l = Ee({
    typed: e,
    matrix: a,
    concat: u
  }), o = Ve({
    typed: e
  });
  return e(Et, U0({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (i, f) => i > f,
    "BigNumber, BigNumber": function(f, h) {
      return f.gt(h) && !Ze(f, h, n.epsilon);
    },
    "Fraction, Fraction": (i, f) => i.compare(f) === 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, o, l({
    SS: p,
    DS: c,
    Ss: v
  }));
}), U0 = /* @__PURE__ */ k(Et, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(Et, {
    "number, number": function(t, u) {
      return t > u && !pe(t, u, n.epsilon);
    }
  });
}), Ft = "largerEq", L0 = ["typed", "config", "matrix", "DenseMatrix", "concat"], Z0 = /* @__PURE__ */ k(Ft, L0, (r) => {
  var {
    typed: e,
    config: n,
    matrix: a,
    DenseMatrix: t,
    concat: u
  } = r, c = Ne({
    typed: e
  }), p = je({
    typed: e,
    DenseMatrix: t
  }), v = Be({
    typed: e,
    DenseMatrix: t
  }), l = Ee({
    typed: e,
    matrix: a,
    concat: u
  }), o = Ve({
    typed: e
  });
  return e(Ft, V0({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (i, f) => i >= f,
    "BigNumber, BigNumber": function(f, h) {
      return f.gte(h) || Ze(f, h, n.epsilon);
    },
    "Fraction, Fraction": (i, f) => i.compare(f) !== -1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, o, l({
    SS: p,
    DS: c,
    Ss: v
  }));
}), V0 = /* @__PURE__ */ k(Ft, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(Ft, {
    "number, number": function(t, u) {
      return t >= u || pe(t, u, n.epsilon);
    }
  });
}), Y0 = "ImmutableDenseMatrix", J0 = ["smaller", "DenseMatrix"], Q0 = /* @__PURE__ */ k(Y0, J0, (r) => {
  var {
    smaller: e,
    DenseMatrix: n
  } = r;
  function a(t, u) {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (u && !ae(u))
      throw new Error("Invalid datatype: " + u);
    if (Sr(t) || Cr(t)) {
      var c = new n(t, u);
      this._data = c._data, this._size = c._size, this._datatype = c._datatype, this._min = null, this._max = null;
    } else if (t && Cr(t.data) && Cr(t.size))
      this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t)
        throw new TypeError("Unsupported type of data (" + se(t) + ")");
      this._data = [], this._size = [0], this._datatype = u, this._min = null, this._max = null;
    }
  }
  return a.prototype = new n(), a.prototype.type = "ImmutableDenseMatrix", a.prototype.isImmutableDenseMatrix = !0, a.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var u = n.prototype.subset.call(this, t);
        return Sr(u) ? new a({
          data: u._data,
          size: u._size,
          datatype: u._datatype
        }) : u;
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
    return new a({
      data: wr(this._data),
      size: wr(this._size),
      datatype: this._datatype
    });
  }, a.prototype.toJSON = function() {
    return {
      mathjs: "ImmutableDenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, a.fromJSON = function(t) {
    return new a(t);
  }, a.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, a.prototype.min = function() {
    if (this._min === null) {
      var t = null;
      this.forEach(function(u) {
        (t === null || e(u, t)) && (t = u);
      }), this._min = t !== null ? t : void 0;
    }
    return this._min;
  }, a.prototype.max = function() {
    if (this._max === null) {
      var t = null;
      this.forEach(function(u) {
        (t === null || e(t, u)) && (t = u);
      }), this._max = t !== null ? t : void 0;
    }
    return this._max;
  }, a;
}, {
  isClass: !0
}), X0 = "Index", G0 = ["ImmutableDenseMatrix"], K0 = /* @__PURE__ */ k(X0, G0, (r) => {
  var {
    ImmutableDenseMatrix: e
  } = r;
  function n(t) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._isScalar = !0;
    for (var u = 0, c = arguments.length; u < c; u++) {
      var p = arguments[u];
      if (Fa(p))
        this._dimensions.push(p), this._isScalar = !1;
      else if (Array.isArray(p) || Sr(p)) {
        var v = a(p.valueOf());
        this._dimensions.push(v);
        var l = v.size();
        (l.length !== 1 || l[0] !== 1) && (this._isScalar = !1);
      } else if (typeof p == "number")
        this._dimensions.push(a([p]));
      else if (typeof p == "string")
        this._dimensions.push(p);
      else
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
    }
  }
  n.prototype.type = "Index", n.prototype.isIndex = !0;
  function a(t) {
    for (var u = 0, c = t.length; u < c; u++)
      if (typeof t[u] != "number" || !Mr(t[u]))
        throw new TypeError("Index parameters must be positive integer numbers");
    return new e(t);
  }
  return n.prototype.clone = function() {
    var t = new n();
    return t._dimensions = wr(this._dimensions), t._isScalar = this._isScalar, t;
  }, n.create = function(t) {
    var u = new n();
    return n.apply(u, t), u;
  }, n.prototype.size = function() {
    for (var t = [], u = 0, c = this._dimensions.length; u < c; u++) {
      var p = this._dimensions[u];
      t[u] = typeof p == "string" ? 1 : p.size()[0];
    }
    return t;
  }, n.prototype.max = function() {
    for (var t = [], u = 0, c = this._dimensions.length; u < c; u++) {
      var p = this._dimensions[u];
      t[u] = typeof p == "string" ? p : p.max();
    }
    return t;
  }, n.prototype.min = function() {
    for (var t = [], u = 0, c = this._dimensions.length; u < c; u++) {
      var p = this._dimensions[u];
      t[u] = typeof p == "string" ? p : p.min();
    }
    return t;
  }, n.prototype.forEach = function(t) {
    for (var u = 0, c = this._dimensions.length; u < c; u++)
      t(this._dimensions[u], u, this);
  }, n.prototype.dimension = function(t) {
    return this._dimensions[t] || null;
  }, n.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, n.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, n.prototype.isScalar = function() {
    return this._isScalar;
  }, n.prototype.toArray = function() {
    for (var t = [], u = 0, c = this._dimensions.length; u < c; u++) {
      var p = this._dimensions[u];
      t.push(typeof p == "string" ? p : p.toArray());
    }
    return t;
  }, n.prototype.valueOf = n.prototype.toArray, n.prototype.toString = function() {
    for (var t = [], u = 0, c = this._dimensions.length; u < c; u++) {
      var p = this._dimensions[u];
      typeof p == "string" ? t.push(JSON.stringify(p)) : t.push(p.toString());
    }
    return "[" + t.join(", ") + "]";
  }, n.prototype.toJSON = function() {
    return {
      mathjs: "Index",
      dimensions: this._dimensions
    };
  }, n.fromJSON = function(t) {
    return n.create(t.dimensions);
  }, n;
}, {
  isClass: !0
}), W0 = "FibonacciHeap", H0 = ["smaller", "larger"], k0 = /* @__PURE__ */ k(W0, H0, (r) => {
  var {
    smaller: e,
    larger: n
  } = r, a = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function t() {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  t.prototype.type = "FibonacciHeap", t.prototype.isFibonacciHeap = !0, t.prototype.insert = function(o, i) {
    var f = {
      key: o,
      value: i,
      degree: 0
    };
    if (this._minimum) {
      var h = this._minimum;
      f.left = h, f.right = h.right, h.right = f, f.right.left = f, e(o, h.key) && (this._minimum = f);
    } else
      f.left = f, f.right = f, this._minimum = f;
    return this._size++, f;
  }, t.prototype.size = function() {
    return this._size;
  }, t.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, t.prototype.isEmpty = function() {
    return this._size === 0;
  }, t.prototype.extractMinimum = function() {
    var o = this._minimum;
    if (o === null)
      return o;
    for (var i = this._minimum, f = o.degree, h = o.child; f > 0; ) {
      var d = h.right;
      h.left.right = h.right, h.right.left = h.left, h.left = i, h.right = i.right, i.right = h, h.right.left = h, h.parent = null, h = d, f--;
    }
    return o.left.right = o.right, o.right.left = o.left, o === o.right ? i = null : (i = o.right, i = l(i, this._size)), this._size--, this._minimum = i, o;
  }, t.prototype.remove = function(o) {
    this._minimum = u(this._minimum, o, -1), this.extractMinimum();
  };
  function u(o, i, f) {
    i.key = f;
    var h = i.parent;
    return h && e(i.key, h.key) && (c(o, i, h), p(o, h)), e(i.key, o.key) && (o = i), o;
  }
  function c(o, i, f) {
    i.left.right = i.right, i.right.left = i.left, f.degree--, f.child === i && (f.child = i.right), f.degree === 0 && (f.child = null), i.left = o, i.right = o.right, o.right = i, i.right.left = i, i.parent = null, i.mark = !1;
  }
  function p(o, i) {
    var f = i.parent;
    f && (i.mark ? (c(o, i, f), p(f)) : i.mark = !0);
  }
  var v = function(i, f) {
    i.left.right = i.right, i.right.left = i.left, i.parent = f, f.child ? (i.left = f.child, i.right = f.child.right, f.child.right = i, i.right.left = i) : (f.child = i, i.right = i, i.left = i), f.degree++, i.mark = !1;
  };
  function l(o, i) {
    var f = Math.floor(Math.log(i) * a) + 1, h = new Array(f), d = 0, s = o;
    if (s)
      for (d++, s = s.right; s !== o; )
        d++, s = s.right;
    for (var m; d > 0; ) {
      for (var D = s.degree, w = s.right; m = h[D], !!m; ) {
        if (n(s.key, m.key)) {
          var y = m;
          m = s, s = y;
        }
        v(m, s), h[D] = null, D++;
      }
      h[D] = s, s = w, d--;
    }
    o = null;
    for (var A = 0; A < f; A++)
      m = h[A], m && (o ? (m.left.right = m.right, m.right.left = m.left, m.left = o, m.right = o.right, o.right = m, m.right.left = m, e(m.key, o.key) && (o = m)) : o = m);
    return o;
  }
  return t;
}, {
  isClass: !0
}), j0 = "Spa", rc = ["addScalar", "equalScalar", "FibonacciHeap"], ec = /* @__PURE__ */ k(j0, rc, (r) => {
  var {
    addScalar: e,
    equalScalar: n,
    FibonacciHeap: a
  } = r;
  function t() {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new a();
  }
  return t.prototype.type = "Spa", t.prototype.isSpa = !0, t.prototype.set = function(u, c) {
    if (this._values[u])
      this._values[u].value = c;
    else {
      var p = this._heap.insert(u, c);
      this._values[u] = p;
    }
  }, t.prototype.get = function(u) {
    var c = this._values[u];
    return c ? c.value : 0;
  }, t.prototype.accumulate = function(u, c) {
    var p = this._values[u];
    p ? p.value = e(p.value, c) : (p = this._heap.insert(u, c), this._values[u] = p);
  }, t.prototype.forEach = function(u, c, p) {
    var v = this._heap, l = this._values, o = [], i = v.extractMinimum();
    for (i && o.push(i); i && i.key <= c; )
      i.key >= u && (n(i.value, 0) || p(i.key, i.value, this)), i = v.extractMinimum(), i && o.push(i);
    for (var f = 0; f < o.length; f++) {
      var h = o[f];
      i = v.insert(h.key, h.value), l[i.key] = i;
    }
  }, t.prototype.swap = function(u, c) {
    var p = this._values[u], v = this._values[c];
    if (!p && v)
      p = this._heap.insert(u, v.value), this._heap.remove(v), this._values[u] = p, this._values[c] = void 0;
    else if (p && !v)
      v = this._heap.insert(c, p.value), this._heap.remove(p), this._values[c] = v, this._values[u] = void 0;
    else if (p && v) {
      var l = p.value;
      p.value = v.value, v.value = l;
    }
  }, t;
}, {
  isClass: !0
}), tc = "atan", nc = ["typed"], ac = /* @__PURE__ */ k(tc, nc, (r) => {
  var {
    typed: e
  } = r;
  return e("atan", {
    number: function(a) {
      return Math.atan(a);
    },
    Complex: function(a) {
      return a.atan();
    },
    BigNumber: function(a) {
      return a.atan();
    }
  });
}), ci = /* @__PURE__ */ k("trigUnit", ["typed"], (r) => {
  var {
    typed: e
  } = r;
  return {
    Unit: e.referToSelf((n) => (a) => {
      if (!a.hasBase(a.constructor.BASE_UNITS.ANGLE))
        throw new TypeError("Unit in function cot is no angle");
      return e.find(n, a.valueType())(a.value);
    })
  };
}), ua = "cos", ic = ["typed"], uc = /* @__PURE__ */ k(ua, ic, (r) => {
  var {
    typed: e
  } = r, n = ci({
    typed: e
  });
  return e(ua, {
    number: Math.cos,
    "Complex | BigNumber": (a) => a.cos()
  }, n);
}), oa = "sin", oc = ["typed"], sc = /* @__PURE__ */ k(oa, oc, (r) => {
  var {
    typed: e
  } = r, n = ci({
    typed: e
  });
  return e(oa, {
    number: Math.sin,
    "Complex | BigNumber": (a) => a.sin()
  }, n);
}), sa = "setDifference", fc = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], cc = /* @__PURE__ */ k(sa, fc, (r) => {
  var {
    typed: e,
    size: n,
    subset: a,
    compareNatural: t,
    Index: u,
    DenseMatrix: c
  } = r;
  return e(sa, {
    "Array | Matrix, Array | Matrix": function(v, l) {
      var o;
      if (a(n(v), new u(0)) === 0)
        o = [];
      else {
        if (a(n(l), new u(0)) === 0)
          return Pe(v.toArray());
        var i = Fn(Pe(Array.isArray(v) ? v : v.toArray()).sort(t)), f = Fn(Pe(Array.isArray(l) ? l : l.toArray()).sort(t));
        o = [];
        for (var h, d = 0; d < i.length; d++) {
          h = !1;
          for (var s = 0; s < f.length; s++)
            if (t(i[d].value, f[s].value) === 0 && i[d].identifier === f[s].identifier) {
              h = !0;
              break;
            }
          h || o.push(i[d]);
        }
      }
      return Array.isArray(v) && Array.isArray(l) ? Cn(o) : new c(Cn(o));
    }
  });
}), fa = "add", lc = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], vc = /* @__PURE__ */ k(fa, lc, (r) => {
  var {
    typed: e,
    matrix: n,
    addScalar: a,
    equalScalar: t,
    DenseMatrix: u,
    SparseMatrix: c,
    concat: p
  } = r, v = ai({
    typed: e
  }), l = js({
    typed: e,
    equalScalar: t
  }), o = ii({
    typed: e,
    DenseMatrix: u
  }), i = Ee({
    typed: e,
    matrix: n,
    concat: p
  });
  return e(fa, {
    "any, any": a,
    "any, any, ...any": e.referToSelf((f) => (h, d, s) => {
      for (var m = f(h, d), D = 0; D < s.length; D++)
        m = f(m, s[D]);
      return m;
    })
  }, i({
    elop: a,
    DS: v,
    SS: l,
    Ss: o
  }));
}), ca = "norm", hc = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], pc = /* @__PURE__ */ k(ca, hc, (r) => {
  var {
    typed: e,
    abs: n,
    add: a,
    pow: t,
    conj: u,
    sqrt: c,
    multiply: p,
    equalScalar: v,
    larger: l,
    smaller: o,
    matrix: i,
    ctranspose: f,
    eigs: h
  } = r;
  return e(ca, {
    number: Math.abs,
    Complex: function(E) {
      return E.abs();
    },
    BigNumber: function(E) {
      return E.abs();
    },
    boolean: function(E) {
      return Math.abs(E);
    },
    Array: function(E) {
      return g(i(E), 2);
    },
    Matrix: function(E) {
      return g(E, 2);
    },
    "Array, number | BigNumber | string": function(E, b) {
      return g(i(E), b);
    },
    "Matrix, number | BigNumber | string": function(E, b) {
      return g(E, b);
    }
  });
  function d(M) {
    var E = 0;
    return M.forEach(function(b) {
      var F = n(b);
      l(F, E) && (E = F);
    }, !0), E;
  }
  function s(M) {
    var E;
    return M.forEach(function(b) {
      var F = n(b);
      (!E || o(F, E)) && (E = F);
    }, !0), E || 0;
  }
  function m(M, E) {
    if (E === Number.POSITIVE_INFINITY || E === "inf")
      return d(M);
    if (E === Number.NEGATIVE_INFINITY || E === "-inf")
      return s(M);
    if (E === "fro")
      return g(M, 2);
    if (typeof E == "number" && !isNaN(E)) {
      if (!v(E, 0)) {
        var b = 0;
        return M.forEach(function(F) {
          b = a(t(n(F), E), b);
        }, !0), t(b, 1 / E);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function D(M) {
    var E = 0;
    return M.forEach(function(b, F) {
      E = a(E, p(b, u(b)));
    }), n(c(E));
  }
  function w(M) {
    var E = [], b = 0;
    return M.forEach(function(F, B) {
      var S = B[1], z = a(E[S] || 0, n(F));
      l(z, b) && (b = z), E[S] = z;
    }, !0), b;
  }
  function y(M) {
    var E = M.size();
    if (E[0] !== E[1])
      throw new RangeError("Invalid matrix dimensions");
    var b = f(M), F = p(b, M), B = h(F).values.toArray(), S = B[B.length - 1];
    return n(c(S));
  }
  function A(M) {
    var E = [], b = 0;
    return M.forEach(function(F, B) {
      var S = B[0], z = a(E[S] || 0, n(F));
      l(z, b) && (b = z), E[S] = z;
    }, !0), b;
  }
  function C(M, E) {
    if (E === 1)
      return w(M);
    if (E === Number.POSITIVE_INFINITY || E === "inf")
      return A(M);
    if (E === "fro")
      return D(M);
    if (E === 2)
      return y(M);
    throw new Error("Unsupported parameter value " + E);
  }
  function g(M, E) {
    var b = M.size();
    if (b.length === 1)
      return m(M, E);
    if (b.length === 2) {
      if (b[0] && b[1])
        return C(M, E);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), la = "dot", dc = ["typed", "addScalar", "multiplyScalar", "conj", "size"], mc = /* @__PURE__ */ k(la, dc, (r) => {
  var {
    typed: e,
    addScalar: n,
    multiplyScalar: a,
    conj: t,
    size: u
  } = r;
  return e(la, {
    "Array | DenseMatrix, Array | DenseMatrix": p,
    "SparseMatrix, SparseMatrix": v
  });
  function c(o, i) {
    var f = l(o), h = l(i), d, s;
    if (f.length === 1)
      d = f[0];
    else if (f.length === 2 && f[1] === 1)
      d = f[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + f.join(", ") + ")");
    if (h.length === 1)
      s = h[0];
    else if (h.length === 2 && h[1] === 1)
      s = h[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + h.join(", ") + ")");
    if (d !== s)
      throw new RangeError("Vectors must have equal length (" + d + " != " + s + ")");
    if (d === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return d;
  }
  function p(o, i) {
    var f = c(o, i), h = Sr(o) ? o._data : o, d = Sr(o) ? o._datatype : void 0, s = Sr(i) ? i._data : i, m = Sr(i) ? i._datatype : void 0, D = l(o).length === 2, w = l(i).length === 2, y = n, A = a;
    if (d && m && d === m && typeof d == "string") {
      var C = d;
      y = e.find(n, [C, C]), A = e.find(a, [C, C]);
    }
    if (!D && !w) {
      for (var g = A(t(h[0]), s[0]), M = 1; M < f; M++)
        g = y(g, A(t(h[M]), s[M]));
      return g;
    }
    if (!D && w) {
      for (var E = A(t(h[0]), s[0][0]), b = 1; b < f; b++)
        E = y(E, A(t(h[b]), s[b][0]));
      return E;
    }
    if (D && !w) {
      for (var F = A(t(h[0][0]), s[0]), B = 1; B < f; B++)
        F = y(F, A(t(h[B][0]), s[B]));
      return F;
    }
    if (D && w) {
      for (var S = A(t(h[0][0]), s[0][0]), z = 1; z < f; z++)
        S = y(S, A(t(h[z][0]), s[z][0]));
      return S;
    }
  }
  function v(o, i) {
    c(o, i);
    for (var f = o._index, h = o._values, d = i._index, s = i._values, m = 0, D = n, w = a, y = 0, A = 0; y < f.length && A < d.length; ) {
      var C = f[y], g = d[A];
      if (C < g) {
        y++;
        continue;
      }
      if (C > g) {
        A++;
        continue;
      }
      C === g && (m = D(m, w(h[y], s[A])), y++, A++);
    }
    return m;
  }
  function l(o) {
    return Sr(o) ? o.size() : u(o);
  }
}), va = "index", Dc = ["typed", "Index"], gc = /* @__PURE__ */ k(va, Dc, (r) => {
  var {
    typed: e,
    Index: n
  } = r;
  return e(va, {
    "...number | string | BigNumber | Range | Array | Matrix": function(t) {
      var u = t.map(function(p) {
        return zr(p) ? p.toNumber() : Array.isArray(p) || Sr(p) ? p.map(function(v) {
          return zr(v) ? v.toNumber() : v;
        }) : p;
      }), c = new n();
      return n.apply(c, u), c;
    }
  });
}), ha = "lup", yc = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtract", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], wc = /* @__PURE__ */ k(ha, yc, (r) => {
  var {
    typed: e,
    matrix: n,
    abs: a,
    addScalar: t,
    divideScalar: u,
    multiplyScalar: c,
    subtract: p,
    larger: v,
    equalScalar: l,
    unaryMinus: o,
    DenseMatrix: i,
    SparseMatrix: f,
    Spa: h
  } = r;
  return e(ha, {
    DenseMatrix: function(D) {
      return d(D);
    },
    SparseMatrix: function(D) {
      return s(D);
    },
    Array: function(D) {
      var w = n(D), y = d(w);
      return {
        L: y.L.valueOf(),
        U: y.U.valueOf(),
        p: y.p
      };
    }
  });
  function d(m) {
    var D = m._size[0], w = m._size[1], y = Math.min(D, w), A = wr(m._data), C = [], g = [D, y], M = [], E = [y, w], b, F, B, S = [];
    for (b = 0; b < D; b++)
      S[b] = b;
    for (F = 0; F < w; F++) {
      if (F > 0)
        for (b = 0; b < D; b++) {
          var z = Math.min(b, F), $ = 0;
          for (B = 0; B < z; B++)
            $ = t($, c(A[b][B], A[B][F]));
          A[b][F] = p(A[b][F], $);
        }
      var O = F, x = 0, Z = 0;
      for (b = F; b < D; b++) {
        var U = A[b][F], T = a(U);
        v(T, x) && (O = b, x = T, Z = U);
      }
      if (F !== O && (S[F] = [S[O], S[O] = S[F]][0], i._swapRows(F, O, A)), F < D)
        for (b = F + 1; b < D; b++) {
          var I = A[b][F];
          l(I, 0) || (A[b][F] = u(A[b][F], Z));
        }
    }
    for (F = 0; F < w; F++)
      for (b = 0; b < D; b++) {
        if (F === 0 && (b < w && (M[b] = []), C[b] = []), b < F) {
          b < w && (M[b][F] = A[b][F]), F < D && (C[b][F] = 0);
          continue;
        }
        if (b === F) {
          b < w && (M[b][F] = A[b][F]), F < D && (C[b][F] = 1);
          continue;
        }
        b < w && (M[b][F] = 0), F < D && (C[b][F] = A[b][F]);
      }
    var R = new i({
      data: C,
      size: g
    }), K = new i({
      data: M,
      size: E
    }), L = [];
    for (b = 0, y = S.length; b < y; b++)
      L[S[b]] = b;
    return {
      L: R,
      U: K,
      p: L,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
  function s(m) {
    var D = m._size[0], w = m._size[1], y = Math.min(D, w), A = m._values, C = m._index, g = m._ptr, M = [], E = [], b = [], F = [D, y], B = [], S = [], z = [], $ = [y, w], O, x, Z, U = [], T = [];
    for (O = 0; O < D; O++)
      U[O] = O, T[O] = O;
    var I = function(L, q) {
      var J = T[L], Q = T[q];
      U[J] = q, U[Q] = L, T[L] = Q, T[q] = J;
    }, R = function() {
      var L = new h();
      x < D && (b.push(M.length), M.push(1), E.push(x)), z.push(B.length);
      var q = g[x], J = g[x + 1];
      for (Z = q; Z < J; Z++)
        O = C[Z], L.set(U[O], A[Z]);
      x > 0 && L.forEach(0, x - 1, function(nr, Y) {
        f._forEachRow(nr, M, E, b, function(pr, cr) {
          pr > nr && L.accumulate(pr, o(c(cr, Y)));
        });
      });
      var Q = x, j = L.get(x), er = a(j);
      L.forEach(x + 1, D - 1, function(nr, Y) {
        var pr = a(Y);
        v(pr, er) && (Q = nr, er = pr, j = Y);
      }), x !== Q && (f._swapRows(x, Q, F[1], M, E, b), f._swapRows(x, Q, $[1], B, S, z), L.swap(x, Q), I(x, Q)), L.forEach(0, D - 1, function(nr, Y) {
        nr <= x ? (B.push(Y), S.push(nr)) : (Y = u(Y, j), l(Y, 0) || (M.push(Y), E.push(nr)));
      });
    };
    for (x = 0; x < w; x++)
      R();
    return z.push(B.length), b.push(M.length), {
      L: new f({
        values: M,
        index: E,
        ptr: b,
        size: F
      }),
      U: new f({
        values: B,
        index: S,
        ptr: z,
        size: $
      }),
      p: U,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
}), pa = "qr", Ac = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtract", "complex"], Ec = /* @__PURE__ */ k(pa, Ac, (r) => {
  var {
    typed: e,
    matrix: n,
    zeros: a,
    identity: t,
    isZero: u,
    equal: c,
    sign: p,
    sqrt: v,
    conj: l,
    unaryMinus: o,
    addScalar: i,
    divideScalar: f,
    multiplyScalar: h,
    subtract: d,
    complex: s
  } = r;
  return st(e(pa, {
    DenseMatrix: function(A) {
      return D(A);
    },
    SparseMatrix: function(A) {
      return w();
    },
    Array: function(A) {
      var C = n(A), g = D(C);
      return {
        Q: g.Q.valueOf(),
        R: g.R.valueOf()
      };
    }
  }), {
    _denseQRimpl: m
  });
  function m(y) {
    var A = y._size[0], C = y._size[1], g = t([A], "dense"), M = g._data, E = y.clone(), b = E._data, F, B, S, z = a([A], "");
    for (S = 0; S < Math.min(C, A); ++S) {
      var $ = b[S][S], O = o(c($, 0) ? 1 : p($)), x = l(O), Z = 0;
      for (F = S; F < A; F++)
        Z = i(Z, h(b[F][S], l(b[F][S])));
      var U = h(O, v(Z));
      if (!u(U)) {
        var T = d($, U);
        for (z[S] = 1, F = S + 1; F < A; F++)
          z[F] = f(b[F][S], T);
        var I = o(l(f(T, U))), R = void 0;
        for (B = S; B < C; B++) {
          for (R = 0, F = S; F < A; F++)
            R = i(R, h(l(z[F]), b[F][B]));
          for (R = h(R, I), F = S; F < A; F++)
            b[F][B] = h(d(b[F][B], h(z[F], R)), x);
        }
        for (F = 0; F < A; F++) {
          for (R = 0, B = S; B < A; B++)
            R = i(R, h(M[F][B], z[B]));
          for (R = h(R, I), B = S; B < A; ++B)
            M[F][B] = f(d(M[F][B], h(R, l(z[B]))), x);
        }
      }
    }
    return {
      Q: g,
      R: E,
      toString: function() {
        return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
      }
    };
  }
  function D(y) {
    var A = m(y), C = A.R._data;
    if (y._data.length > 0)
      for (var g = C[0][0].type === "Complex" ? s(0) : 0, M = 0; M < C.length; ++M)
        for (var E = 0; E < M && E < (C[0] || []).length; ++E)
          C[M][E] = g;
    return A;
  }
  function w(y) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function Fc(r, e, n, a) {
  for (var t = r._values, u = r._index, c = r._ptr, p = r._size, v = r._datatype, l = p[0], o = p[1], i = a && r._values ? [] : null, f = [], h = [], d = 0, s = 0; s < o; s++) {
    h[s] = d;
    for (var m = n ? n[s] : s, D = c[m], w = c[m + 1], y = D; y < w; y++) {
      var A = e ? e[u[y]] : u[y];
      f[d] = A, i && (i[d] = t[y]), d++;
    }
  }
  return h[o] = d, r.createSparseMatrix({
    values: i,
    index: f,
    ptr: h,
    size: [l, o],
    datatype: v
  });
}
function li(r, e, n, a, t, u, c) {
  var p = 0;
  for (n[c] = r; p >= 0; ) {
    var v = n[c + p], l = n[a + v];
    l === -1 ? (p--, u[e++] = v) : (n[a + v] = n[t + l], ++p, n[c + p] = l);
  }
  return e;
}
function Cc(r, e) {
  if (!r)
    return null;
  var n = 0, a, t = [], u = [], c = 0, p = e, v = 2 * e;
  for (a = 0; a < e; a++)
    u[c + a] = -1;
  for (a = e - 1; a >= 0; a--)
    r[a] !== -1 && (u[p + a] = u[c + r[a]], u[c + r[a]] = a);
  for (a = 0; a < e; a++)
    r[a] === -1 && (n = li(a, n, u, c, p, t, v));
  return t;
}
function bc(r, e) {
  if (!r)
    return null;
  var n = r._index, a = r._ptr, t = r._size, u = t[0], c = t[1], p = [], v = [], l = 0, o = c, i, f;
  if (e)
    for (i = 0; i < u; i++)
      v[o + i] = -1;
  for (var h = 0; h < c; h++) {
    p[h] = -1, v[l + h] = -1;
    for (var d = a[h], s = a[h + 1], m = d; m < s; m++) {
      var D = n[m];
      for (i = e ? v[o + D] : D; i !== -1 && i < h; i = f)
        f = v[l + i], v[l + i] = h, f === -1 && (p[i] = h);
      e && (v[o + D] = h);
    }
  }
  return p;
}
function Mc(r, e, n) {
  for (var a = r._values, t = r._index, u = r._ptr, c = r._size, p = c[1], v = 0, l = 0; l < p; l++) {
    var o = u[l];
    for (u[l] = v; o < u[l + 1]; o++)
      e(t[o], l, a ? a[o] : 1, n) && (t[v] = t[o], a && (a[v] = a[o]), v++);
  }
  return u[p] = v, t.splice(v, t.length - v), a && a.splice(v, a.length - v), v;
}
function ge(r) {
  return -r - 2;
}
var Sc = "csAmd", Bc = ["add", "multiply", "transpose"], Nc = /* @__PURE__ */ k(Sc, Bc, (r) => {
  var {
    add: e,
    multiply: n,
    transpose: a
  } = r;
  return function(o, i) {
    if (!i || o <= 0 || o > 3)
      return null;
    var f = i._size, h = f[0], d = f[1], s = 0, m = Math.max(16, 10 * Math.sqrt(d));
    m = Math.min(d - 2, m);
    var D = t(o, i, h, d, m);
    Mc(D, v, null);
    for (var w = D._index, y = D._ptr, A = y[d], C = [], g = [], M = 0, E = d + 1, b = 2 * (d + 1), F = 3 * (d + 1), B = 4 * (d + 1), S = 5 * (d + 1), z = 6 * (d + 1), $ = 7 * (d + 1), O = C, x = u(d, y, g, M, F, O, b, $, E, z, B, S), Z = c(d, y, g, S, B, z, m, E, F, O, b), U = 0, T, I, R, K, L, q, J, Q, j, er, nr, Y, pr, cr, ir, ur; Z < d; ) {
      for (R = -1; U < d && (R = g[F + U]) === -1; U++)
        ;
      g[b + R] !== -1 && (O[g[b + R]] = -1), g[F + U] = g[b + R];
      var dr = g[B + R], Dr = g[E + R];
      Z += Dr;
      var Er = 0;
      g[E + R] = -Dr;
      var fr = y[R], gr = dr === 0 ? fr : A, Fr = gr;
      for (K = 1; K <= dr + 1; K++) {
        for (K > dr ? (q = R, J = fr, Q = g[M + R] - dr) : (q = w[fr++], J = y[q], Q = g[M + q]), L = 1; L <= Q; L++)
          T = w[J++], !((j = g[E + T]) <= 0) && (Er += j, g[E + T] = -j, w[Fr++] = T, g[b + T] !== -1 && (O[g[b + T]] = O[T]), O[T] !== -1 ? g[b + O[T]] = g[b + T] : g[F + g[S + T]] = g[b + T]);
        q !== R && (y[q] = ge(R), g[z + q] = 0);
      }
      for (dr !== 0 && (A = Fr), g[S + R] = Er, y[R] = gr, g[M + R] = Fr - gr, g[B + R] = -2, x = p(x, s, g, z, d), er = gr; er < Fr; er++)
        if (T = w[er], !((nr = g[B + T]) <= 0)) {
          j = -g[E + T];
          var Tr = x - j;
          for (fr = y[T], Y = y[T] + nr - 1; fr <= Y; fr++)
            q = w[fr], g[z + q] >= x ? g[z + q] -= j : g[z + q] !== 0 && (g[z + q] = g[S + q] + Tr);
        }
      for (er = gr; er < Fr; er++) {
        for (T = w[er], Y = y[T], pr = Y + g[B + T] - 1, cr = Y, ir = 0, ur = 0, fr = Y; fr <= pr; fr++)
          if (q = w[fr], g[z + q] !== 0) {
            var _r = g[z + q] - x;
            _r > 0 ? (ur += _r, w[cr++] = q, ir += q) : (y[q] = ge(R), g[z + q] = 0);
          }
        g[B + T] = cr - Y + 1;
        var N = cr, _ = Y + g[M + T];
        for (fr = pr + 1; fr < _; fr++) {
          I = w[fr];
          var P = g[E + I];
          P <= 0 || (ur += P, w[cr++] = I, ir += I);
        }
        ur === 0 ? (y[T] = ge(R), j = -g[E + T], Er -= j, Dr += j, Z += j, g[E + T] = 0, g[B + T] = -1) : (g[S + T] = Math.min(g[S + T], ur), w[cr] = w[N], w[N] = w[Y], w[Y] = R, g[M + T] = cr - Y + 1, ir = (ir < 0 ? -ir : ir) % d, g[b + T] = g[$ + ir], g[$ + ir] = T, O[T] = ir);
      }
      for (g[S + R] = Er, s = Math.max(s, Er), x = p(x + s, s, g, z, d), er = gr; er < Fr; er++)
        if (T = w[er], !(g[E + T] >= 0))
          for (ir = O[T], T = g[$ + ir], g[$ + ir] = -1; T !== -1 && g[b + T] !== -1; T = g[b + T], x++) {
            for (Q = g[M + T], nr = g[B + T], fr = y[T] + 1; fr <= y[T] + Q - 1; fr++)
              g[z + w[fr]] = x;
            var V = T;
            for (I = g[b + T]; I !== -1; ) {
              var W = g[M + I] === Q && g[B + I] === nr;
              for (fr = y[I] + 1; W && fr <= y[I] + Q - 1; fr++)
                g[z + w[fr]] !== x && (W = 0);
              W ? (y[I] = ge(T), g[E + T] += g[E + I], g[E + I] = 0, g[B + I] = -1, I = g[b + I], g[b + V] = I) : (V = I, I = g[b + I]);
            }
          }
      for (fr = gr, er = gr; er < Fr; er++)
        T = w[er], !((j = -g[E + T]) <= 0) && (g[E + T] = j, ur = g[S + T] + Er - j, ur = Math.min(ur, d - Z - j), g[F + ur] !== -1 && (O[g[F + ur]] = T), g[b + T] = g[F + ur], O[T] = -1, g[F + ur] = T, U = Math.min(U, ur), g[S + T] = ur, w[fr++] = T);
      g[E + R] = Dr, (g[M + R] = fr - gr) === 0 && (y[R] = -1, g[z + R] = 0), dr !== 0 && (A = fr);
    }
    for (T = 0; T < d; T++)
      y[T] = ge(y[T]);
    for (I = 0; I <= d; I++)
      g[F + I] = -1;
    for (I = d; I >= 0; I--)
      g[E + I] > 0 || (g[b + I] = g[F + y[I]], g[F + y[I]] = I);
    for (q = d; q >= 0; q--)
      g[E + q] <= 0 || y[q] !== -1 && (g[b + q] = g[F + y[q]], g[F + y[q]] = q);
    for (R = 0, T = 0; T <= d; T++)
      y[T] === -1 && (R = li(T, R, g, F, b, C, z));
    return C.splice(C.length - 1, 1), C;
  };
  function t(l, o, i, f, h) {
    var d = a(o);
    if (l === 1 && f === i)
      return e(o, d);
    if (l === 2) {
      for (var s = d._index, m = d._ptr, D = 0, w = 0; w < i; w++) {
        var y = m[w];
        if (m[w] = D, !(m[w + 1] - y > h))
          for (var A = m[w + 1]; y < A; y++)
            s[D++] = s[y];
      }
      return m[i] = D, o = a(d), n(d, o);
    }
    return n(d, o);
  }
  function u(l, o, i, f, h, d, s, m, D, w, y, A) {
    for (var C = 0; C < l; C++)
      i[f + C] = o[C + 1] - o[C];
    i[f + l] = 0;
    for (var g = 0; g <= l; g++)
      i[h + g] = -1, d[g] = -1, i[s + g] = -1, i[m + g] = -1, i[D + g] = 1, i[w + g] = 1, i[y + g] = 0, i[A + g] = i[f + g];
    var M = p(0, 0, i, w, l);
    return i[y + l] = -2, o[l] = -1, i[w + l] = 0, M;
  }
  function c(l, o, i, f, h, d, s, m, D, w, y) {
    for (var A = 0, C = 0; C < l; C++) {
      var g = i[f + C];
      if (g === 0)
        i[h + C] = -2, A++, o[C] = -1, i[d + C] = 0;
      else if (g > s)
        i[m + C] = 0, i[h + C] = -1, A++, o[C] = ge(l), i[m + l]++;
      else {
        var M = i[D + g];
        M !== -1 && (w[M] = C), i[y + C] = i[D + g], i[D + g] = C;
      }
    }
    return A;
  }
  function p(l, o, i, f, h) {
    if (l < 2 || l + o < 0) {
      for (var d = 0; d < h; d++)
        i[f + d] !== 0 && (i[f + d] = 1);
      l = 2;
    }
    return l;
  }
  function v(l, o) {
    return l !== o;
  }
});
function xc(r, e, n, a, t, u, c) {
  var p, v, l = 0, o;
  if (r <= e || n[a + e] <= n[t + r])
    return -1;
  n[t + r] = n[a + e];
  var i = n[u + r];
  if (n[u + r] = e, i === -1)
    l = 1, o = r;
  else {
    for (l = 2, o = i; o !== n[c + o]; o = n[c + o])
      ;
    for (p = i; p !== o; p = v)
      v = n[c + p], n[c + p] = o;
  }
  return {
    jleaf: l,
    q: o
  };
}
var _c = "csCounts", zc = ["transpose"], Tc = /* @__PURE__ */ k(_c, zc, (r) => {
  var {
    transpose: e
  } = r;
  return function(n, a, t, u) {
    if (!n || !a || !t)
      return null;
    var c = n._size, p = c[0], v = c[1], l, o, i, f, h, d, s, m = 4 * v + (u ? v + p + 1 : 0), D = [], w = 0, y = v, A = 2 * v, C = 3 * v, g = 4 * v, M = 5 * v + 1;
    for (i = 0; i < m; i++)
      D[i] = -1;
    var E = [], b = e(n), F = b._index, B = b._ptr;
    for (i = 0; i < v; i++)
      for (o = t[i], E[o] = D[C + o] === -1 ? 1 : 0; o !== -1 && D[C + o] === -1; o = a[o])
        D[C + o] = i;
    if (u) {
      for (i = 0; i < v; i++)
        D[t[i]] = i;
      for (l = 0; l < p; l++) {
        for (i = v, d = B[l], s = B[l + 1], h = d; h < s; h++)
          i = Math.min(i, D[F[h]]);
        D[M + l] = D[g + i], D[g + i] = l;
      }
    }
    for (l = 0; l < v; l++)
      D[w + l] = l;
    for (i = 0; i < v; i++) {
      for (o = t[i], a[o] !== -1 && E[a[o]]--, f = u ? D[g + i] : o; f !== -1; f = u ? D[M + f] : -1)
        for (h = B[f]; h < B[f + 1]; h++) {
          l = F[h];
          var S = xc(l, o, D, C, y, A, w);
          S.jleaf >= 1 && E[o]++, S.jleaf === 2 && E[S.q]--;
        }
      a[o] !== -1 && (D[w + o] = a[o]);
    }
    for (o = 0; o < v; o++)
      a[o] !== -1 && (E[a[o]] += E[o]);
    return E;
  };
}), Ic = "csSqr", Oc = ["add", "multiply", "transpose"], $c = /* @__PURE__ */ k(Ic, Oc, (r) => {
  var {
    add: e,
    multiply: n,
    transpose: a
  } = r, t = Nc({
    add: e,
    multiply: n,
    transpose: a
  }), u = Tc({
    transpose: a
  });
  return function(v, l, o) {
    var i = l._ptr, f = l._size, h = f[1], d, s = {};
    if (s.q = t(v, l), v && !s.q)
      return null;
    if (o) {
      var m = v ? Fc(l, null, s.q, 0) : l;
      s.parent = bc(m, 1);
      var D = Cc(s.parent, h);
      if (s.cp = u(m, s.parent, D, 1), m && s.parent && s.cp && c(m, s))
        for (s.unz = 0, d = 0; d < h; d++)
          s.unz += s.cp[d];
    } else
      s.unz = 4 * i[h] + h, s.lnz = s.unz;
    return s;
  };
  function c(p, v) {
    var l = p._ptr, o = p._index, i = p._size, f = i[0], h = i[1];
    v.pinv = [], v.leftmost = [];
    var d = v.parent, s = v.pinv, m = v.leftmost, D = [], w = 0, y = f, A = f + h, C = f + 2 * h, g, M, E, b, F;
    for (M = 0; M < h; M++)
      D[y + M] = -1, D[A + M] = -1, D[C + M] = 0;
    for (g = 0; g < f; g++)
      m[g] = -1;
    for (M = h - 1; M >= 0; M--)
      for (b = l[M], F = l[M + 1], E = b; E < F; E++)
        m[o[E]] = M;
    for (g = f - 1; g >= 0; g--)
      s[g] = -1, M = m[g], M !== -1 && (D[C + M]++ === 0 && (D[A + M] = g), D[w + g] = D[y + M], D[y + M] = g);
    for (v.lnz = 0, v.m2 = f, M = 0; M < h; M++)
      if (g = D[y + M], v.lnz++, g < 0 && (g = v.m2++), s[g] = M, !(--C[M] <= 0)) {
        v.lnz += D[C + M];
        var B = d[M];
        B !== -1 && (D[C + B] === 0 && (D[A + B] = D[A + M]), D[w + D[A + M]] = D[y + B], D[y + B] = D[w + g], D[C + B] += D[C + M]);
      }
    for (g = 0; g < f; g++)
      s[g] < 0 && (s[g] = M++);
    return !0;
  }
});
function Xt(r, e) {
  return r[e] < 0;
}
function vi(r, e) {
  r[e] = ge(r[e]);
}
function da(r) {
  return r < 0 ? ge(r) : r;
}
function qc(r, e, n, a, t) {
  var u = e._index, c = e._ptr, p = e._size, v = p[1], l, o, i, f = 0;
  for (a[0] = r; f >= 0; ) {
    r = a[f];
    var h = t ? t[r] : r;
    Xt(c, r) || (vi(c, r), a[v + f] = h < 0 ? 0 : da(c[h]));
    var d = 1;
    for (o = a[v + f], i = h < 0 ? 0 : da(c[h + 1]); o < i; o++)
      if (l = u[o], !Xt(c, l)) {
        a[v + f] = o, a[++f] = l, d = 0;
        break;
      }
    d && (f--, a[--n] = r);
  }
  return n;
}
function Pc(r, e, n, a, t) {
  var u = r._ptr, c = r._size, p = e._index, v = e._ptr, l = c[1], o, i, f, h = l;
  for (i = v[n], f = v[n + 1], o = i; o < f; o++) {
    var d = p[o];
    Xt(u, d) || (h = qc(d, r, h, a, t));
  }
  for (o = h; o < l; o++)
    vi(u, a[o]);
  return h;
}
var Rc = "csSpsolve", Uc = ["divideScalar", "multiply", "subtract"], Lc = /* @__PURE__ */ k(Rc, Uc, (r) => {
  var {
    divideScalar: e,
    multiply: n,
    subtract: a
  } = r;
  return function(u, c, p, v, l, o, i) {
    var f = u._values, h = u._index, d = u._ptr, s = u._size, m = s[1], D = c._values, w = c._index, y = c._ptr, A, C, g, M, E = Pc(u, c, p, v, o);
    for (A = E; A < m; A++)
      l[v[A]] = 0;
    for (C = y[p], g = y[p + 1], A = C; A < g; A++)
      l[w[A]] = D[A];
    for (var b = E; b < m; b++) {
      var F = v[b], B = o ? o[F] : F;
      if (!(B < 0))
        for (C = d[B], g = d[B + 1], l[F] = e(l[F], f[i ? C : g - 1]), A = i ? C + 1 : C, M = i ? g : g - 1; A < M; A++) {
          var S = h[A];
          l[S] = a(l[S], n(f[A], l[F]));
        }
    }
    return E;
  };
}), Zc = "csLu", Vc = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], Yc = /* @__PURE__ */ k(Zc, Vc, (r) => {
  var {
    abs: e,
    divideScalar: n,
    multiply: a,
    subtract: t,
    larger: u,
    largerEq: c,
    SparseMatrix: p
  } = r, v = Lc({
    divideScalar: n,
    multiply: a,
    subtract: t
  });
  return function(o, i, f) {
    if (!o)
      return null;
    var h = o._size, d = h[1], s, m = 100, D = 100;
    i && (s = i.q, m = i.lnz || m, D = i.unz || D);
    var w = [], y = [], A = [], C = new p({
      values: w,
      index: y,
      ptr: A,
      size: [d, d]
    }), g = [], M = [], E = [], b = new p({
      values: g,
      index: M,
      ptr: E,
      size: [d, d]
    }), F = [], B, S, z = [], $ = [];
    for (B = 0; B < d; B++)
      z[B] = 0, F[B] = -1, A[B + 1] = 0;
    m = 0, D = 0;
    for (var O = 0; O < d; O++) {
      A[O] = m, E[O] = D;
      var x = s ? s[O] : O, Z = v(C, o, x, $, z, F, 1), U = -1, T = -1;
      for (S = Z; S < d; S++)
        if (B = $[S], F[B] < 0) {
          var I = e(z[B]);
          u(I, T) && (T = I, U = B);
        } else
          M[D] = F[B], g[D++] = z[B];
      if (U === -1 || T <= 0)
        return null;
      F[x] < 0 && c(e(z[x]), a(T, f)) && (U = x);
      var R = z[U];
      for (M[D] = O, g[D++] = R, F[U] = O, y[m] = U, w[m++] = 1, S = Z; S < d; S++)
        B = $[S], F[B] < 0 && (y[m] = B, w[m++] = n(z[B], R)), z[B] = 0;
    }
    for (A[d] = m, E[d] = D, S = 0; S < m; S++)
      y[S] = F[y[S]];
    return w.splice(m, w.length - m), y.splice(m, y.length - m), g.splice(D, g.length - D), M.splice(D, M.length - D), {
      L: C,
      U: b,
      pinv: F
    };
  };
}), ma = "slu", Jc = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], Qc = /* @__PURE__ */ k(ma, Jc, (r) => {
  var {
    typed: e,
    abs: n,
    add: a,
    multiply: t,
    transpose: u,
    divideScalar: c,
    subtract: p,
    larger: v,
    largerEq: l,
    SparseMatrix: o
  } = r, i = $c({
    add: a,
    multiply: t,
    transpose: u
  }), f = Yc({
    abs: n,
    divideScalar: c,
    multiply: t,
    subtract: p,
    larger: v,
    largerEq: l,
    SparseMatrix: o
  });
  return e(ma, {
    "SparseMatrix, number, number": function(d, s, m) {
      if (!Mr(s) || s < 0 || s > 3)
        throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
      if (m < 0 || m > 1)
        throw new Error("Partial pivoting threshold must be a number from 0 to 1");
      var D = i(s, d, !1), w = f(d, D, m);
      return {
        L: w.L,
        U: w.U,
        p: w.pinv,
        q: D.q,
        toString: function() {
          return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
        }
      };
    }
  });
});
function Da(r, e) {
  var n, a = e.length, t = [];
  if (r)
    for (n = 0; n < a; n++)
      t[r[n]] = e[n];
  else
    for (n = 0; n < a; n++)
      t[n] = e[n];
  return t;
}
var ga = "lusolve", Xc = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], Gc = /* @__PURE__ */ k(ga, Xc, (r) => {
  var {
    typed: e,
    matrix: n,
    lup: a,
    slu: t,
    usolve: u,
    lsolve: c,
    DenseMatrix: p
  } = r, v = xt({
    DenseMatrix: p
  });
  return e(ga, {
    "Array, Array | Matrix": function(f, h) {
      f = n(f);
      var d = a(f), s = o(d.L, d.U, d.p, null, h);
      return s.valueOf();
    },
    "DenseMatrix, Array | Matrix": function(f, h) {
      var d = a(f);
      return o(d.L, d.U, d.p, null, h);
    },
    "SparseMatrix, Array | Matrix": function(f, h) {
      var d = a(f);
      return o(d.L, d.U, d.p, null, h);
    },
    "SparseMatrix, Array | Matrix, number, number": function(f, h, d, s) {
      var m = t(f, d, s);
      return o(m.L, m.U, m.p, m.q, h);
    },
    "Object, Array | Matrix": function(f, h) {
      return o(f.L, f.U, f.p, f.q, h);
    }
  });
  function l(i) {
    if (Sr(i))
      return i;
    if (Cr(i))
      return n(i);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function o(i, f, h, d, s) {
    i = l(i), f = l(f), h && (s = v(i, s, !0), s._data = Da(h, s._data));
    var m = c(i, s), D = u(f, m);
    return d && (D._data = Da(d, D._data)), D;
  }
}), ya = "det", Kc = ["typed", "matrix", "subtract", "multiply", "divideScalar", "isZero", "unaryMinus"], Wc = /* @__PURE__ */ k(ya, Kc, (r) => {
  var {
    typed: e,
    matrix: n,
    subtract: a,
    multiply: t,
    divideScalar: u,
    isZero: c,
    unaryMinus: p
  } = r;
  return e(ya, {
    any: function(o) {
      return wr(o);
    },
    "Array | Matrix": function(o) {
      var i;
      switch (Sr(o) ? i = o.size() : Array.isArray(o) ? (o = n(o), i = o.size()) : i = [], i.length) {
        case 0:
          return wr(o);
        case 1:
          if (i[0] === 1)
            return wr(o.valueOf()[0]);
          if (i[0] === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Nr(i) + ")");
        case 2: {
          var f = i[0], h = i[1];
          if (f === h)
            return v(o.clone().valueOf(), f);
          if (h === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Nr(i) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Nr(i) + ")");
      }
    }
  });
  function v(l, o, i) {
    if (o === 1)
      return wr(l[0][0]);
    if (o === 2)
      return a(t(l[0][0], l[1][1]), t(l[1][0], l[0][1]));
    for (var f = !1, h = new Array(o).fill(0).map((M, E) => E), d = 0; d < o; d++) {
      var s = h[d];
      if (c(l[s][d])) {
        var m = void 0;
        for (m = d + 1; m < o; m++)
          if (!c(l[h[m]][d])) {
            s = h[m], h[m] = h[d], h[d] = s, f = !f;
            break;
          }
        if (m === o)
          return l[s][d];
      }
      for (var D = l[s][d], w = d === 0 ? 1 : l[h[d - 1]][d - 1], y = d + 1; y < o; y++)
        for (var A = h[y], C = d + 1; C < o; C++)
          l[A][C] = u(a(t(l[A][C], D), t(l[A][d], l[s][C])), w);
    }
    var g = l[h[o - 1]][o - 1];
    return f ? p(g) : g;
  }
}), wa = "inv", Hc = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], kc = /* @__PURE__ */ k(wa, Hc, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: a,
    addScalar: t,
    multiply: u,
    unaryMinus: c,
    det: p,
    identity: v,
    abs: l
  } = r;
  return e(wa, {
    "Array | Matrix": function(f) {
      var h = Sr(f) ? f.size() : Lr(f);
      switch (h.length) {
        case 1:
          if (h[0] === 1)
            return Sr(f) ? n([a(1, f.valueOf()[0])]) : [a(1, f[0])];
          throw new RangeError("Matrix must be square (size: " + Nr(h) + ")");
        case 2: {
          var d = h[0], s = h[1];
          if (d === s)
            return Sr(f) ? n(o(f.valueOf(), d, s), f.storage()) : o(f, d, s);
          throw new RangeError("Matrix must be square (size: " + Nr(h) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Nr(h) + ")");
      }
    },
    any: function(f) {
      return a(1, f);
    }
  });
  function o(i, f, h) {
    var d, s, m, D, w;
    if (f === 1) {
      if (D = i[0][0], D === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(1, D)]];
    } else if (f === 2) {
      var y = p(i);
      if (y === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(i[1][1], y), a(c(i[0][1]), y)], [a(c(i[1][0]), y), a(i[0][0], y)]];
    } else {
      var A = i.concat();
      for (d = 0; d < f; d++)
        A[d] = A[d].concat();
      for (var C = v(f).valueOf(), g = 0; g < h; g++) {
        var M = l(A[g][g]), E = g;
        for (d = g + 1; d < f; )
          l(A[d][g]) > M && (M = l(A[d][g]), E = d), d++;
        if (M === 0)
          throw Error("Cannot calculate inverse, determinant is zero");
        d = E, d !== g && (w = A[g], A[g] = A[d], A[d] = w, w = C[g], C[g] = C[d], C[d] = w);
        var b = A[g], F = C[g];
        for (d = 0; d < f; d++) {
          var B = A[d], S = C[d];
          if (d !== g) {
            if (B[g] !== 0) {
              for (m = a(c(B[g]), b[g]), s = g; s < h; s++)
                B[s] = t(B[s], u(m, b[s]));
              for (s = 0; s < h; s++)
                S[s] = t(S[s], u(m, F[s]));
            }
          } else {
            for (m = b[g], s = g; s < h; s++)
              B[s] = a(B[s], m);
            for (s = 0; s < h; s++)
              S[s] = a(S[s], m);
          }
        }
      }
      return C;
    }
  }
});
function jc(r) {
  var {
    addScalar: e,
    subtract: n,
    flatten: a,
    multiply: t,
    multiplyScalar: u,
    divideScalar: c,
    sqrt: p,
    abs: v,
    bignumber: l,
    diag: o,
    inv: i,
    qr: f,
    usolve: h,
    usolveAll: d,
    equal: s,
    complex: m,
    larger: D,
    smaller: w,
    matrixFromColumns: y,
    dot: A
  } = r;
  function C(I, R, K, L, q) {
    q === void 0 && (q = !0);
    var J = g(I, R, K, L, q);
    M(I, R, K, L, q, J);
    var {
      values: Q,
      C: j
    } = E(I, R, K, L, q), er;
    return q && (er = b(I, R, j, J, Q, K, L), er = y(...er)), {
      values: Q,
      vectors: er
    };
  }
  function g(I, R, K, L, q) {
    var J = L === "BigNumber", Q = L === "Complex", j = J ? l(0) : 0, er = J ? l(1) : Q ? m(1) : 1, nr = J ? l(1) : 1, Y = J ? l(10) : 2, pr = u(Y, Y), cr;
    q && (cr = Array(R).fill(er));
    for (var ir = !1; !ir; ) {
      ir = !0;
      for (var ur = 0; ur < R; ur++) {
        for (var dr = j, Dr = j, Er = 0; Er < R; Er++)
          if (ur !== Er) {
            var fr = v(I[ur][Er]);
            dr = e(dr, fr), Dr = e(Dr, fr);
          }
        if (!s(dr, 0) && !s(Dr, 0)) {
          for (var gr = nr, Fr = dr, Tr = c(Dr, Y), _r = u(Dr, Y); w(Fr, Tr); )
            Fr = u(Fr, pr), gr = u(gr, Y);
          for (; D(Fr, _r); )
            Fr = c(Fr, pr), gr = c(gr, Y);
          var N = w(c(e(Fr, Dr), gr), u(e(dr, Dr), 0.95));
          if (N) {
            ir = !1;
            for (var _ = c(1, gr), P = 0; P < R; P++)
              ur !== P && (I[ur][P] = u(I[ur][P], gr), I[P][ur] = u(I[P][ur], _));
            q && (cr[ur] = u(cr[ur], gr));
          }
        }
      }
    }
    return o(cr);
  }
  function M(I, R, K, L, q, J) {
    var Q = L === "BigNumber", j = L === "Complex", er = Q ? l(0) : j ? m(0) : 0;
    Q && (K = l(K));
    for (var nr = 0; nr < R - 2; nr++) {
      for (var Y = 0, pr = er, cr = nr + 1; cr < R; cr++) {
        var ir = I[cr][nr];
        w(v(pr), v(ir)) && (pr = ir, Y = cr);
      }
      if (!w(v(pr), K)) {
        if (Y !== nr + 1) {
          var ur = I[Y];
          I[Y] = I[nr + 1], I[nr + 1] = ur;
          for (var dr = 0; dr < R; dr++) {
            var Dr = I[dr][Y];
            I[dr][Y] = I[dr][nr + 1], I[dr][nr + 1] = Dr;
          }
          if (q) {
            var Er = J[Y];
            J[Y] = J[nr + 1], J[nr + 1] = Er;
          }
        }
        for (var fr = nr + 2; fr < R; fr++) {
          var gr = c(I[fr][nr], pr);
          if (gr !== 0) {
            for (var Fr = 0; Fr < R; Fr++)
              I[fr][Fr] = n(I[fr][Fr], u(gr, I[nr + 1][Fr]));
            for (var Tr = 0; Tr < R; Tr++)
              I[Tr][nr + 1] = e(I[Tr][nr + 1], u(gr, I[Tr][fr]));
            if (q)
              for (var _r = 0; _r < R; _r++)
                J[fr][_r] = n(J[fr][_r], u(gr, J[nr + 1][_r]));
          }
        }
      }
    }
    return J;
  }
  function E(I, R, K, L, q) {
    var J = L === "BigNumber", Q = L === "Complex", j = J ? l(1) : Q ? m(1) : 1;
    J && (K = l(K));
    for (var er = wr(I), nr = [], Y = R, pr = [], cr = q ? o(Array(R).fill(j)) : void 0, ir = q ? o(Array(Y).fill(j)) : void 0, ur = 0; ur <= 100; ) {
      ur += 1;
      for (var dr = 0, Dr = 0; Dr < Y; Dr++)
        er[Dr][Dr] = n(er[Dr][Dr], dr);
      var {
        Q: Er,
        R: fr
      } = f(er);
      er = t(fr, Er);
      for (var gr = 0; gr < Y; gr++)
        er[gr][gr] = e(er[gr][gr], dr);
      if (q && (ir = t(ir, Er)), Y === 1 || w(v(er[Y - 1][Y - 2]), K)) {
        ur = 0, nr.push(er[Y - 1][Y - 1]), q && (pr.unshift([[1]]), S(ir, R), cr = t(cr, ir), Y > 1 && (ir = o(Array(Y - 1).fill(j)))), Y -= 1, er.pop();
        for (var Fr = 0; Fr < Y; Fr++)
          er[Fr].pop();
      } else if (Y === 2 || w(v(er[Y - 2][Y - 3]), K)) {
        ur = 0;
        var Tr = F(er[Y - 2][Y - 2], er[Y - 2][Y - 1], er[Y - 1][Y - 2], er[Y - 1][Y - 1]);
        nr.push(...Tr), q && (pr.unshift(B(er[Y - 2][Y - 2], er[Y - 2][Y - 1], er[Y - 1][Y - 2], er[Y - 1][Y - 1], Tr[0], Tr[1], K, L)), S(ir, R), cr = t(cr, ir), Y > 2 && (ir = o(Array(Y - 2).fill(j)))), Y -= 2, er.pop(), er.pop();
        for (var _r = 0; _r < Y; _r++)
          er[_r].pop(), er[_r].pop();
      }
      if (Y === 0)
        break;
    }
    if (nr.sort((P, V) => +n(v(P), v(V))), ur > 100) {
      var N = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + nr.join(", "));
      throw N.values = nr, N.vectors = [], N;
    }
    var _ = q ? t(cr, z(pr, R)) : void 0;
    return {
      values: nr,
      C: _
    };
  }
  function b(I, R, K, L, q, J, Q) {
    var j = i(K), er = t(j, I, K), nr = Q === "BigNumber", Y = Q === "Complex", pr = nr ? l(0) : Y ? m(0) : 0, cr = nr ? l(1) : Y ? m(1) : 1, ir = [], ur = [];
    for (var dr of q) {
      var Dr = $(ir, dr, s);
      Dr === -1 ? (ir.push(dr), ur.push(1)) : ur[Dr] += 1;
    }
    for (var Er = [], fr = ir.length, gr = Array(R).fill(pr), Fr = o(Array(R).fill(cr)), Tr = [], _r = function() {
      var V = ir[N], W = n(er, t(V, Fr)), H = d(W, gr);
      for (H.shift(); H.length < ur[N]; ) {
        var tr = O(W, R, H, J, Q);
        if (tr == null) {
          Tr.push(V);
          break;
        }
        H.push(tr);
      }
      var X = t(i(L), K);
      H = H.map((rr) => t(X, rr)), Er.push(...H.map((rr) => a(rr)));
    }, N = 0; N < fr; N++)
      _r();
    if (Tr.length !== 0) {
      var _ = new Error("Failed to find eigenvectors for the following eigenvalues: " + Tr.join(", "));
      throw _.values = q, _.vectors = Er, _;
    }
    return Er;
  }
  function F(I, R, K, L) {
    var q = e(I, L), J = n(u(I, L), u(R, K)), Q = u(q, 0.5), j = u(p(n(u(q, q), u(4, J))), 0.5);
    return [e(Q, j), n(Q, j)];
  }
  function B(I, R, K, L, q, J, Q, j) {
    var er = j === "BigNumber", nr = j === "Complex", Y = er ? l(0) : nr ? m(0) : 0, pr = er ? l(1) : nr ? m(1) : 1;
    if (w(v(K), Q))
      return [[pr, Y], [Y, pr]];
    if (D(v(n(q, J)), Q))
      return [[n(q, L), n(J, L)], [K, K]];
    var cr = n(I, q), ir = n(R, q), ur = n(K, q), dr = n(L, q);
    return w(v(ir), Q) ? [[cr, pr], [ur, Y]] : [[ir, Y], [dr, pr]];
  }
  function S(I, R) {
    for (var K = 0; K < I.length; K++)
      I[K].push(...Array(R - I[K].length).fill(0));
    for (var L = I.length; L < R; L++)
      I.push(Array(R).fill(0)), I[L][L] = 1;
    return I;
  }
  function z(I, R) {
    for (var K = [], L = 0; L < R; L++)
      K[L] = Array(R).fill(0);
    var q = 0;
    for (var J of I) {
      for (var Q = J.length, j = 0; j < Q; j++)
        for (var er = 0; er < Q; er++)
          K[q + j][q + er] = J[j][er];
      q += Q;
    }
    return K;
  }
  function $(I, R, K) {
    for (var L = 0; L < I.length; L++)
      if (K(I[L], R))
        return L;
    return -1;
  }
  function O(I, R, K, L, q) {
    for (var J = q === "BigNumber" ? l(1e3) : 1e3, Q, j = 0; Q = x(R, K, q), Q = h(I, Q), !D(U(Q), J); )
      if (++j >= 5)
        return null;
    for (j = 0; ; ) {
      var er = h(I, Q);
      if (w(U(Z(Q, [er])), L))
        break;
      if (++j >= 10)
        return null;
      Q = T(er);
    }
    return Q;
  }
  function x(I, R, K) {
    var L = K === "BigNumber", q = K === "Complex", J = Array(I).fill(0).map((Q) => 2 * Math.random() - 1);
    return L && (J = J.map((Q) => l(Q))), q && (J = J.map((Q) => m(Q))), J = Z(J, R), T(J, K);
  }
  function Z(I, R) {
    for (var K of R)
      I = n(I, t(c(A(K, I), A(K, K)), K));
    return I;
  }
  function U(I) {
    return v(p(A(I, I)));
  }
  function T(I, R) {
    var K = R === "BigNumber", L = R === "Complex", q = K ? l(1) : L ? m(1) : 1;
    return t(c(q, U(I)), I);
  }
  return C;
}
function rl(r) {
  var {
    config: e,
    addScalar: n,
    subtract: a,
    abs: t,
    atan: u,
    cos: c,
    sin: p,
    multiplyScalar: v,
    inv: l,
    bignumber: o,
    multiply: i,
    add: f
  } = r;
  function h(F, B) {
    var S = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.epsilon, z = arguments.length > 3 ? arguments[3] : void 0;
    if (z === "number")
      return d(F, S);
    if (z === "BigNumber")
      return s(F, S);
    throw TypeError("Unsupported data type: " + z);
  }
  function d(F, B) {
    for (var S = F.length, z = Math.abs(B / S), $, O = new Array(S), x = 0; x < S; x++)
      O[x] = b(S, 0), O[x][x] = 1;
    for (var Z = g(F); Math.abs(Z[1]) >= Math.abs(z); ) {
      var U = Z[0][0], T = Z[0][1];
      $ = m(F[U][U], F[T][T], F[U][T]), F = C(F, $, U, T), O = w(O, $, U, T), Z = g(F);
    }
    for (var I = b(S, 0), R = 0; R < S; R++)
      I[R] = F[R][R];
    return E(wr(I), wr(O));
  }
  function s(F, B) {
    for (var S = F.length, z = t(B / S), $, O = new Array(S), x = 0; x < S; x++)
      O[x] = b(S, 0), O[x][x] = 1;
    for (var Z = M(F); t(Z[1]) >= t(z); ) {
      var U = Z[0][0], T = Z[0][1];
      $ = D(F[U][U], F[T][T], F[U][T]), F = A(F, $, U, T), O = y(O, $, U, T), Z = M(F);
    }
    for (var I = b(S, 0), R = 0; R < S; R++)
      I[R] = F[R][R];
    return E(wr(I), wr(O));
  }
  function m(F, B, S) {
    var z = B - F;
    return Math.abs(z) <= e.epsilon ? Math.PI / 4 : 0.5 * Math.atan(2 * S / (B - F));
  }
  function D(F, B, S) {
    var z = a(B, F);
    return t(z) <= e.epsilon ? o(-1).acos().div(4) : v(0.5, u(i(2, S, l(z))));
  }
  function w(F, B, S, z) {
    for (var $ = F.length, O = Math.cos(B), x = Math.sin(B), Z = b($, 0), U = b($, 0), T = 0; T < $; T++)
      Z[T] = O * F[T][S] - x * F[T][z], U[T] = x * F[T][S] + O * F[T][z];
    for (var I = 0; I < $; I++)
      F[I][S] = Z[I], F[I][z] = U[I];
    return F;
  }
  function y(F, B, S, z) {
    for (var $ = F.length, O = c(B), x = p(B), Z = b($, o(0)), U = b($, o(0)), T = 0; T < $; T++)
      Z[T] = a(v(O, F[T][S]), v(x, F[T][z])), U[T] = n(v(x, F[T][S]), v(O, F[T][z]));
    for (var I = 0; I < $; I++)
      F[I][S] = Z[I], F[I][z] = U[I];
    return F;
  }
  function A(F, B, S, z) {
    for (var $ = F.length, O = o(c(B)), x = o(p(B)), Z = v(O, O), U = v(x, x), T = b($, o(0)), I = b($, o(0)), R = i(o(2), O, x, F[S][z]), K = n(a(v(Z, F[S][S]), R), v(U, F[z][z])), L = f(v(U, F[S][S]), R, v(Z, F[z][z])), q = 0; q < $; q++)
      T[q] = a(v(O, F[S][q]), v(x, F[z][q])), I[q] = n(v(x, F[S][q]), v(O, F[z][q]));
    F[S][S] = K, F[z][z] = L, F[S][z] = o(0), F[z][S] = o(0);
    for (var J = 0; J < $; J++)
      J !== S && J !== z && (F[S][J] = T[J], F[J][S] = T[J], F[z][J] = I[J], F[J][z] = I[J]);
    return F;
  }
  function C(F, B, S, z) {
    for (var $ = F.length, O = Math.cos(B), x = Math.sin(B), Z = O * O, U = x * x, T = b($, 0), I = b($, 0), R = Z * F[S][S] - 2 * O * x * F[S][z] + U * F[z][z], K = U * F[S][S] + 2 * O * x * F[S][z] + Z * F[z][z], L = 0; L < $; L++)
      T[L] = O * F[S][L] - x * F[z][L], I[L] = x * F[S][L] + O * F[z][L];
    F[S][S] = R, F[z][z] = K, F[S][z] = 0, F[z][S] = 0;
    for (var q = 0; q < $; q++)
      q !== S && q !== z && (F[S][q] = T[q], F[q][S] = T[q], F[z][q] = I[q], F[q][z] = I[q]);
    return F;
  }
  function g(F) {
    for (var B = F.length, S = 0, z = [0, 1], $ = 0; $ < B; $++)
      for (var O = $ + 1; O < B; O++)
        Math.abs(S) < Math.abs(F[$][O]) && (S = Math.abs(F[$][O]), z = [$, O]);
    return [z, S];
  }
  function M(F) {
    for (var B = F.length, S = 0, z = [0, 1], $ = 0; $ < B; $++)
      for (var O = $ + 1; O < B; O++)
        t(S) < t(F[$][O]) && (S = t(F[$][O]), z = [$, O]);
    return [z, S];
  }
  function E(F, B) {
    for (var S = F.length, z = Array(S), $ = Array(S), O = 0; O < S; O++)
      $[O] = Array(S);
    for (var x = 0; x < S; x++) {
      for (var Z = 0, U = F[0], T = 0; T < F.length; T++)
        t(F[T]) < t(U) && (Z = T, U = F[Z]);
      z[x] = F.splice(Z, 1)[0];
      for (var I = 0; I < S; I++)
        $[I][x] = B[I][Z], B[I].splice(Z, 1);
    }
    return {
      values: z,
      vectors: $
    };
  }
  function b(F, B) {
    for (var S = new Array(F), z = 0; z < F; z++)
      S[z] = B;
    return S;
  }
  return h;
}
var el = "eigs", tl = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], nl = /* @__PURE__ */ k(el, tl, (r) => {
  var {
    config: e,
    typed: n,
    matrix: a,
    addScalar: t,
    subtract: u,
    equal: c,
    abs: p,
    atan: v,
    cos: l,
    sin: o,
    multiplyScalar: i,
    divideScalar: f,
    inv: h,
    bignumber: d,
    multiply: s,
    add: m,
    larger: D,
    column: w,
    flatten: y,
    number: A,
    complex: C,
    sqrt: g,
    diag: M,
    qr: E,
    usolve: b,
    usolveAll: F,
    im: B,
    re: S,
    smaller: z,
    matrixFromColumns: $,
    dot: O
  } = r, x = rl({
    config: e,
    addScalar: t,
    subtract: u,
    column: w,
    flatten: y,
    equal: c,
    abs: p,
    atan: v,
    cos: l,
    sin: o,
    multiplyScalar: i,
    inv: h,
    bignumber: d,
    complex: C,
    multiply: s,
    add: m
  }), Z = jc({
    config: e,
    addScalar: t,
    subtract: u,
    multiply: s,
    multiplyScalar: i,
    flatten: y,
    divideScalar: f,
    sqrt: g,
    abs: p,
    bignumber: d,
    diag: M,
    qr: E,
    inv: h,
    usolve: b,
    usolveAll: F,
    equal: c,
    complex: C,
    larger: D,
    smaller: z,
    matrixFromColumns: $,
    dot: O
  });
  return n("eigs", {
    Array: function(q) {
      var J = a(q);
      return U(J);
    },
    "Array, number|BigNumber": function(q, J) {
      var Q = a(q);
      return U(Q, J);
    },
    Matrix: function(q) {
      var {
        values: J,
        vectors: Q
      } = U(q);
      return {
        values: a(J),
        vectors: a(Q)
      };
    },
    "Matrix, number|BigNumber": function(q, J) {
      var {
        values: Q,
        vectors: j
      } = U(q, J);
      return {
        values: a(Q),
        vectors: a(j)
      };
    }
  });
  function U(L, q) {
    q === void 0 && (q = e.epsilon);
    var J = L.size();
    if (J.length !== 2 || J[0] !== J[1])
      throw new RangeError("Matrix must be square (size: " + Nr(J) + ")");
    var Q = L.toArray(), j = J[0];
    if (I(Q, j, q) && (R(Q, j), T(Q, j, q))) {
      var er = K(L, Q, j);
      return x(Q, j, q, er);
    }
    var nr = K(L, Q, j);
    return Z(Q, j, q, nr);
  }
  function T(L, q, J) {
    for (var Q = 0; Q < q; Q++)
      for (var j = Q; j < q; j++)
        if (D(d(p(u(L[Q][j], L[j][Q]))), J))
          return !1;
    return !0;
  }
  function I(L, q, J) {
    for (var Q = 0; Q < q; Q++)
      for (var j = 0; j < q; j++)
        if (D(d(p(B(L[Q][j]))), J))
          return !1;
    return !0;
  }
  function R(L, q) {
    for (var J = 0; J < q; J++)
      for (var Q = 0; Q < q; Q++)
        L[J][Q] = S(L[J][Q]);
  }
  function K(L, q, J) {
    var Q = L.datatype();
    if (Q === "number" || Q === "BigNumber" || Q === "Complex")
      return Q;
    for (var j = !1, er = !1, nr = !1, Y = 0; Y < J; Y++)
      for (var pr = 0; pr < J; pr++) {
        var cr = q[Y][pr];
        if (xr(cr) || Wt(cr))
          j = !0;
        else if (zr(cr))
          er = !0;
        else if (Kt(cr))
          nr = !0;
        else
          throw TypeError("Unsupported type in Matrix: " + se(cr));
      }
    if (er && nr && console.warn("Complex BigNumbers not supported, this operation will lose precission."), nr) {
      for (var ir = 0; ir < J; ir++)
        for (var ur = 0; ur < J; ur++)
          q[ir][ur] = C(q[ir][ur]);
      return "Complex";
    }
    if (er) {
      for (var dr = 0; dr < J; dr++)
        for (var Dr = 0; Dr < J; Dr++)
          q[dr][Dr] = d(q[dr][Dr]);
      return "BigNumber";
    }
    if (j) {
      for (var Er = 0; Er < J; Er++)
        for (var fr = 0; fr < J; fr++)
          q[Er][fr] = A(q[Er][fr]);
      return "number";
    } else
      throw TypeError("Matrix contains unsupported types only.");
  }
}), Ye = /* @__PURE__ */ Qo({
  config: Gr
}), _t = /* @__PURE__ */ Wo({}), zt = /* @__PURE__ */ rs({}), tn = /* @__PURE__ */ ns({}), $r = /* @__PURE__ */ us({
  Matrix: tn
}), or = /* @__PURE__ */ Gu({
  BigNumber: Ye,
  Complex: _t,
  DenseMatrix: $r,
  Fraction: zt
}), rt = /* @__PURE__ */ Rs({
  typed: or
}), de = /* @__PURE__ */ Ls({
  typed: or
}), al = /* @__PURE__ */ ac({
  typed: or
}), nn = /* @__PURE__ */ bs({
  BigNumber: Ye,
  typed: or
}), an = /* @__PURE__ */ Bs({
  Complex: _t,
  typed: or
}), Tt = /* @__PURE__ */ xf({
  typed: or
}), te = /* @__PURE__ */ ps({
  config: Gr,
  typed: or
}), il = /* @__PURE__ */ zf({
  typed: or
}), hi = /* @__PURE__ */ ss({
  typed: or
}), pi = /* @__PURE__ */ ls({
  typed: or
}), Fe = /* @__PURE__ */ Df({
  typed: or
}), un = /* @__PURE__ */ Es({
  typed: or
}), ul = /* @__PURE__ */ If({
  typed: or
}), ol = /* @__PURE__ */ Af({
  BigNumber: Ye,
  Fraction: zt,
  complex: an,
  typed: or
}), sl = /* @__PURE__ */ sc({
  typed: or
}), Je = /* @__PURE__ */ Ds({
  Matrix: tn,
  equalScalar: te,
  typed: or
}), fl = /* @__PURE__ */ uc({
  typed: or
}), on = /* @__PURE__ */ Cf({
  Complex: _t,
  config: Gr,
  typed: or
}), et = /* @__PURE__ */ qs({
  typed: or
}), di = /* @__PURE__ */ _s({
  Fraction: zt,
  typed: or
}), mr = /* @__PURE__ */ Ts({
  DenseMatrix: $r,
  Matrix: tn,
  SparseMatrix: Je,
  typed: or
}), cl = /* @__PURE__ */ l0({
  bignumber: nn,
  fraction: di,
  number: un
}), ll = /* @__PURE__ */ Kf({
  isInteger: hi,
  matrix: mr,
  typed: or
}), sn = /* @__PURE__ */ Hf({
  matrix: mr,
  config: Gr,
  typed: or
}), le = /* @__PURE__ */ jf({
  matrix: mr,
  typed: or
}), fn = /* @__PURE__ */ a0({
  matrix: mr,
  typed: or
}), cn = /* @__PURE__ */ s0({
  BigNumber: Ye,
  config: Gr,
  matrix: mr,
  typed: or
}), Ce = /* @__PURE__ */ $f({
  isInteger: hi,
  matrix: mr,
  typed: or
}), vl = /* @__PURE__ */ u0({
  conj: Tt,
  transpose: fn,
  typed: or
}), hl = /* @__PURE__ */ Uf({
  DenseMatrix: $r,
  SparseMatrix: Je,
  matrix: mr,
  typed: or
}), me = /* @__PURE__ */ h0({
  numeric: cl,
  typed: or
}), mi = /* @__PURE__ */ x0({
  DenseMatrix: $r,
  concat: Ce,
  equalScalar: te,
  matrix: mr,
  typed: or
}), ln = /* @__PURE__ */ Zf({
  matrix: mr,
  typed: or
}), vn = /* @__PURE__ */ Yf({
  BigNumber: Ye,
  DenseMatrix: $r,
  SparseMatrix: Je,
  config: Gr,
  matrix: mr,
  typed: or
}), Di = /* @__PURE__ */ Z0({
  DenseMatrix: $r,
  concat: Ce,
  config: Gr,
  matrix: mr,
  typed: or
}), pl = /* @__PURE__ */ Os({
  flatten: ln,
  matrix: mr,
  size: sn,
  typed: or
}), tt = /* @__PURE__ */ T0({
  DenseMatrix: $r,
  concat: Ce,
  config: Gr,
  matrix: mr,
  typed: or
}), Le = /* @__PURE__ */ vc({
  DenseMatrix: $r,
  SparseMatrix: Je,
  addScalar: de,
  concat: Ce,
  equalScalar: te,
  matrix: mr,
  typed: or
}), dl = /* @__PURE__ */ F0({
  BigNumber: Ye,
  DenseMatrix: $r,
  Fraction: zt,
  concat: Ce,
  config: Gr,
  equalScalar: te,
  matrix: mr,
  typed: or
}), We = /* @__PURE__ */ mc({
  addScalar: de,
  conj: Tt,
  multiplyScalar: Fe,
  size: sn,
  typed: or
}), ml = /* @__PURE__ */ Q0({
  DenseMatrix: $r,
  smaller: tt
}), hn = /* @__PURE__ */ K0({
  ImmutableDenseMatrix: ml
}), Qe = /* @__PURE__ */ R0({
  DenseMatrix: $r,
  concat: Ce,
  config: Gr,
  matrix: mr,
  typed: or
}), he = /* @__PURE__ */ yf({
  addScalar: de,
  dot: We,
  equalScalar: te,
  matrix: mr,
  multiplyScalar: Fe,
  typed: or
}), Dl = /* @__PURE__ */ $0({
  DenseMatrix: $r,
  concat: Ce,
  config: Gr,
  matrix: mr,
  typed: or
}), oe = /* @__PURE__ */ Mf({
  DenseMatrix: $r,
  addScalar: de,
  concat: Ce,
  equalScalar: te,
  matrix: mr,
  typed: or,
  unaryMinus: et
}), gi = /* @__PURE__ */ y0({
  DenseMatrix: $r,
  divideScalar: me,
  equalScalar: te,
  matrix: mr,
  multiplyScalar: Fe,
  subtract: oe,
  typed: or
}), gl = /* @__PURE__ */ S0({
  compare: dl,
  typed: or
}), yl = /* @__PURE__ */ Wc({
  divideScalar: me,
  isZero: pi,
  matrix: mr,
  multiply: he,
  subtract: oe,
  typed: or,
  unaryMinus: et
}), wl = /* @__PURE__ */ k0({
  larger: Qe,
  smaller: tt
}), Te = /* @__PURE__ */ gc({
  Index: hn,
  typed: or
}), Al = /* @__PURE__ */ D0({
  DenseMatrix: $r,
  divideScalar: me,
  equalScalar: te,
  matrix: mr,
  multiplyScalar: Fe,
  subtract: oe,
  typed: or
}), El = /* @__PURE__ */ Ec({
  addScalar: de,
  complex: an,
  conj: Tt,
  divideScalar: me,
  equal: mi,
  identity: vn,
  isZero: pi,
  matrix: mr,
  multiplyScalar: Fe,
  sign: ol,
  sqrt: on,
  subtract: oe,
  typed: or,
  unaryMinus: et,
  zeros: cn
}), yi = /* @__PURE__ */ Xf({
  bignumber: nn,
  matrix: mr,
  config: Gr,
  larger: Qe,
  largerEq: Di,
  smaller: tt,
  smallerEq: Dl,
  typed: or
}), Fl = /* @__PURE__ */ Qc({
  SparseMatrix: Je,
  abs: rt,
  add: Le,
  divideScalar: me,
  larger: Qe,
  largerEq: Di,
  multiply: he,
  subtract: oe,
  transpose: fn,
  typed: or
}), Cl = /* @__PURE__ */ ec({
  FibonacciHeap: wl,
  addScalar: de,
  equalScalar: te
}), bl = /* @__PURE__ */ A0({
  DenseMatrix: $r,
  divideScalar: me,
  equalScalar: te,
  matrix: mr,
  multiplyScalar: Fe,
  subtract: oe,
  typed: or
}), Ml = /* @__PURE__ */ Pf({
  Index: hn,
  matrix: mr,
  range: yi,
  typed: or
}), Sl = /* @__PURE__ */ cc({
  DenseMatrix: $r,
  Index: hn,
  compareNatural: gl,
  size: sn,
  subset: le,
  typed: or
}), wi = /* @__PURE__ */ kc({
  abs: rt,
  addScalar: de,
  det: yl,
  divideScalar: me,
  identity: vn,
  matrix: mr,
  multiply: he,
  typed: or,
  unaryMinus: et
}), Bl = /* @__PURE__ */ wc({
  DenseMatrix: $r,
  Spa: Cl,
  SparseMatrix: Je,
  abs: rt,
  addScalar: de,
  divideScalar: me,
  equalScalar: te,
  larger: Qe,
  matrix: mr,
  multiplyScalar: Fe,
  subtract: oe,
  typed: or,
  unaryMinus: et
}), Nl = /* @__PURE__ */ d0({
  Complex: _t,
  config: Gr,
  fraction: di,
  identity: vn,
  inv: wi,
  matrix: mr,
  multiply: he,
  number: un,
  typed: or
}), xl = /* @__PURE__ */ Gc({
  DenseMatrix: $r,
  lsolve: Al,
  lup: Bl,
  matrix: mr,
  slu: Fl,
  typed: or,
  usolve: gi
}), _l = /* @__PURE__ */ nl({
  abs: rt,
  add: Le,
  addScalar: de,
  atan: al,
  bignumber: nn,
  column: Ml,
  complex: an,
  config: Gr,
  cos: fl,
  diag: hl,
  divideScalar: me,
  dot: We,
  equal: mi,
  flatten: ln,
  im: il,
  inv: wi,
  larger: Qe,
  matrix: mr,
  matrixFromColumns: pl,
  multiply: he,
  multiplyScalar: Fe,
  number: un,
  qr: El,
  re: ul,
  sin: sl,
  smaller: tt,
  sqrt: on,
  subtract: oe,
  typed: or,
  usolve: gi,
  usolveAll: bl
}), Gt = /* @__PURE__ */ pc({
  abs: rt,
  add: Le,
  conj: Tt,
  ctranspose: vl,
  eigs: _l,
  equalScalar: te,
  larger: Qe,
  matrix: mr,
  multiply: he,
  pow: Nl,
  smaller: tt,
  sqrt: on,
  typed: or
});
const zl = (r, e, n) => {
  let a = cn(
    r.length * 3,
    r.length * 3
  );
  e.forEach((f, h) => {
    const d = mr(r[f[0]]), s = mr(r[f[1]]), m = oe(s, d), D = Gt(m), { area: w, elasticity: y } = Ol(h, n);
    let A = mr([
      [1, -1],
      [-1, 1]
    ]);
    A = he(
      A,
      w * y / D
    );
    const C = We(m, mr([1, 0, 0])) / D, g = We(m, mr([0, 1, 0])) / D, M = We(m, mr([0, 0, 1])) / D, E = mr([
      [C, g, M, 0, 0, 0],
      [0, 0, 0, C, g, M]
    ]), b = he(
      fn(E),
      he(A, E)
    ), F = [f[0] * 3, f[0] * 3 + 1, f[0] * 3 + 2], B = [f[1] * 3, f[1] * 3 + 1, f[1] * 3 + 2], S = [...F, ...B], z = Te(S, S), $ = le(a, z), O = Le($, b);
    a = le(a, z, O);
  });
  let t = mr(r.flat());
  const u = Il(n), c = Sl(yi(0, t.size()[0]), u), p = Tl(r, e, n), v = le(p, Te(c)), l = le(t, Te(c)), o = le(
    a,
    Te(c, c)
  ), i = xl(o, v);
  return t = le(
    t,
    Te(c),
    Le(l, ln(i))
  ), ll(t, [-1, 3]).toArray();
};
function Tl(r, e, n) {
  let a = cn([r.length * 3]);
  return n.forEach((t) => {
    if ("load" in t) {
      const u = Te([t.node * 3, t.node * 3 + 1, t.node * 3 + 2]), c = le(a, u), p = Le(c, t.load);
      a = le(a, u, p);
    }
  }), a;
}
function Il(r) {
  const e = [];
  return r?.forEach((n) => {
    "support" in n && (n.support[0] && e.push(n.node * 3), n.support[1] && e.push(n.node * 3 + 1), n.support[2] && e.push(n.node * 3 + 2));
  }), e;
}
function Ol(r, e) {
  function n(t) {
    const u = t.substring(1).split("x");
    return {
      width: (parseInt(u[0]) || 1) * 1e-3,
      height: (parseInt(u[1]) || 1) * 1e-3
    };
  }
  let a = { area: 1, elasticity: 1 };
  return e?.forEach((t) => {
    if (t.element == r && "material" in t && "section" in t) {
      const { width: u, height: c } = n(t.section);
      a = { area: u * c, elasticity: t.material };
    }
  }), a;
}
const ql = (r, e, n) => {
  const a = zl(r, e, n), t = /* @__PURE__ */ new Map();
  n?.forEach((c) => {
    if ("section" in c && "material" in c) {
      const { width: p, height: v } = $l(c.section);
      t.set(c.element, {
        area: p * v,
        material: c.material
      });
    }
  });
  const u = [];
  return e.forEach((c, p) => {
    const v = t.get(p) ?? { area: 0, material: 0 }, l = Gt(
      oe(r[c[1]], r[c[0]])
    ), o = Gt(
      oe(a[c[1]], a[c[0]])
    ), i = (o - l) / o;
    u.push({
      element: p,
      strain: Pt(i),
      stress: Pt(i * v.material),
      force: Pt(i * v.material * v.area)
    });
  }), u;
};
function $l(r) {
  const e = r.substring(1).split("x");
  return {
    width: (parseInt(e[0]) || 1) * 1e-3,
    height: (parseInt(e[1]) || 1) * 1e-3
  };
}
const Pt = (r) => Math.round(r * 1e3) / 1e3;
export {
  ql as analyzing
};
