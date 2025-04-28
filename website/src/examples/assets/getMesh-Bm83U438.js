let P, je, Ke, _0, Bt;
let __tla = (async () => {
  Ke = function() {
    return Ke = Object.assign ? Object.assign.bind() : function(r) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var n in t) ({}).hasOwnProperty.call(t, n) && (r[n] = t[n]);
      }
      return r;
    }, Ke.apply(null, arguments);
  };
  var qi = {
    relTol: 1e-12,
    absTol: 1e-15,
    matrix: "Matrix",
    number: "number",
    numberFallback: "number",
    precision: 64,
    predictable: false,
    randomSeed: null
  };
  function aa(r, e) {
    if (Ct(r, e)) return r[e];
    throw typeof r[e] == "function" && sa(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
  }
  function oa(r, e, t) {
    if (Ct(r, e)) return r[e] = t, t;
    throw new Error('No access to property "' + e + '"');
  }
  function Ct(r, e) {
    return !fa(r) && !Array.isArray(r) ? false : st(ca, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function sa(r, e) {
    return r == null || typeof r[e] != "function" || st(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : st(la, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function fa(r) {
    return typeof r == "object" && r && r.constructor === Object;
  }
  var ca = {
    length: true,
    name: true
  }, la = {
    toString: true,
    valueOf: true,
    toLocaleString: true
  };
  class ha {
    constructor(e) {
      this.wrappedObject = e, this[Symbol.iterator] = this.entries;
    }
    keys() {
      return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
    }
    get(e) {
      return aa(this.wrappedObject, e);
    }
    set(e, t) {
      return oa(this.wrappedObject, e, t), this;
    }
    has(e) {
      return Ct(this.wrappedObject, e) && e in this.wrappedObject;
    }
    entries() {
      return va(this.keys(), (e) => [
        e,
        this.get(e)
      ]);
    }
    forEach(e) {
      for (var t of this.keys()) e(this.get(t), t, this);
    }
    delete(e) {
      Ct(this.wrappedObject, e) && delete this.wrappedObject[e];
    }
    clear() {
      for (var e of this.keys()) this.delete(e);
    }
    get size() {
      return Object.keys(this.wrappedObject).length;
    }
  }
  function va(r, e) {
    return {
      next: () => {
        var t = r.next();
        return t.done ? t : {
          value: e(t.value),
          done: false
        };
      }
    };
  }
  function Pr(r) {
    return typeof r == "number";
  }
  function Yr(r) {
    return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
  }
  function pa(r) {
    return typeof r == "bigint";
  }
  function dn(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
  }
  function mn(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
  }
  function Ui(r) {
    return r && r.constructor.prototype.isUnit === true || false;
  }
  function we(r) {
    return typeof r == "string";
  }
  var Wr = Array.isArray;
  function zr(r) {
    return r && r.constructor.prototype.isMatrix === true || false;
  }
  function _t(r) {
    return Array.isArray(r) || zr(r);
  }
  function Li(r) {
    return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function Zi(r) {
    return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function Wi(r) {
    return r && r.constructor.prototype.isRange === true || false;
  }
  function Dn(r) {
    return r && r.constructor.prototype.isIndex === true || false;
  }
  function da(r) {
    return typeof r == "boolean";
  }
  function ma(r) {
    return r && r.constructor.prototype.isResultSet === true || false;
  }
  function Da(r) {
    return r && r.constructor.prototype.isHelp === true || false;
  }
  function ga(r) {
    return typeof r == "function";
  }
  function ya(r) {
    return r instanceof Date;
  }
  function wa(r) {
    return r instanceof RegExp;
  }
  function gn(r) {
    return !!(r && typeof r == "object" && r.constructor === Object && !dn(r) && !mn(r));
  }
  function Aa(r) {
    return r ? r instanceof Map || r instanceof ha || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
  }
  function Fa(r) {
    return r === null;
  }
  function Ea(r) {
    return r === void 0;
  }
  function ba(r) {
    return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ca(r) {
    return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
  }
  function _a(r) {
    return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ba(r) {
    return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ma(r) {
    return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Sa(r) {
    return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Na(r) {
    return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function xa(r) {
    return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ta(r) {
    return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ia(r) {
    return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Oa(r) {
    return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
  }
  function za(r) {
    return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function $a(r) {
    return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Pa(r) {
    return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ra(r) {
    return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function qa(r) {
    return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ua(r) {
    return r && r.constructor.prototype.isChain === true || false;
  }
  function Fe(r) {
    var e = typeof r;
    return e === "object" ? r === null ? "null" : Yr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
  }
  function Br(r) {
    var e = typeof r;
    if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
    if (typeof r.clone == "function") return r.clone();
    if (Array.isArray(r)) return r.map(function(t) {
      return Br(t);
    });
    if (r instanceof Date) return new Date(r.valueOf());
    if (Yr(r)) return r;
    if (gn(r)) return La(r, Br);
    if (e === "function") return r;
    throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
  }
  function La(r, e) {
    var t = {};
    for (var n in r) st(r, n) && (t[n] = e(r[n]));
    return t;
  }
  function Vi(r, e) {
    for (var t in e) st(e, t) && (r[t] = e[t]);
    return r;
  }
  function $e(r, e) {
    var t, n, i;
    if (Array.isArray(r)) {
      if (!Array.isArray(e) || r.length !== e.length) return false;
      for (n = 0, i = r.length; n < i; n++) if (!$e(r[n], e[n])) return false;
      return true;
    } else {
      if (typeof r == "function") return r === e;
      if (r instanceof Object) {
        if (Array.isArray(e) || !(e instanceof Object)) return false;
        for (t in r) if (!(t in e) || !$e(r[t], e[t])) return false;
        for (t in e) if (!(t in r)) return false;
        return true;
      } else return r === e;
    }
  }
  function st(r, e) {
    return r && Object.hasOwnProperty.call(r, e);
  }
  function Za(r, e) {
    for (var t = {}, n = 0; n < e.length; n++) {
      var i = e[n], u = r[i];
      u !== void 0 && (t[i] = u);
    }
    return t;
  }
  var Wa = [
    "Matrix",
    "Array"
  ], Va = [
    "number",
    "BigNumber",
    "Fraction"
  ], oe = function(e) {
    if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
    return Object.freeze(qi);
  };
  Ke(oe, qi, {
    MATRIX_OPTIONS: Wa,
    NUMBER_OPTIONS: Va
  });
  function $n() {
    return true;
  }
  function me() {
    return false;
  }
  function Ye() {
  }
  const Pn = "Argument is not a typed-function.";
  function Yi() {
    function r(E) {
      return typeof E == "object" && E !== null && E.constructor === Object;
    }
    const e = [
      {
        name: "number",
        test: function(E) {
          return typeof E == "number";
        }
      },
      {
        name: "string",
        test: function(E) {
          return typeof E == "string";
        }
      },
      {
        name: "boolean",
        test: function(E) {
          return typeof E == "boolean";
        }
      },
      {
        name: "Function",
        test: function(E) {
          return typeof E == "function";
        }
      },
      {
        name: "Array",
        test: Array.isArray
      },
      {
        name: "Date",
        test: function(E) {
          return E instanceof Date;
        }
      },
      {
        name: "RegExp",
        test: function(E) {
          return E instanceof RegExp;
        }
      },
      {
        name: "Object",
        test: r
      },
      {
        name: "null",
        test: function(E) {
          return E === null;
        }
      },
      {
        name: "undefined",
        test: function(E) {
          return E === void 0;
        }
      }
    ], t = {
      name: "any",
      test: $n,
      isAny: true
    };
    let n, i, u = 0, a = {
      createCount: 0
    };
    function c(E) {
      const N = n.get(E);
      if (N) return N;
      let I = 'Unknown type "' + E + '"';
      const $ = E.toLowerCase();
      let V;
      for (V of i) if (V.toLowerCase() === $) {
        I += '. Did you mean "' + V + '" ?';
        break;
      }
      throw new TypeError(I);
    }
    function s(E) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
      const I = N ? c(N).index : i.length, $ = [];
      for (let U = 0; U < E.length; ++U) {
        if (!E[U] || typeof E[U].name != "string" || typeof E[U].test != "function") throw new TypeError("Object with properties {name: string, test: function} expected");
        const ur = E[U].name;
        if (n.has(ur)) throw new TypeError('Duplicate type name "' + ur + '"');
        $.push(ur), n.set(ur, {
          name: ur,
          test: E[U].test,
          isAny: E[U].isAny,
          index: I + U,
          conversionsTo: []
        });
      }
      const V = i.slice(I);
      i = i.slice(0, I).concat($).concat(V);
      for (let U = I + $.length; U < i.length; ++U) n.get(i[U]).index = U;
    }
    function f() {
      n = /* @__PURE__ */ new Map(), i = [], u = 0, s([
        t
      ], false);
    }
    f(), s(e);
    function o() {
      let E;
      for (E of i) n.get(E).conversionsTo = [];
      u = 0;
    }
    function h(E) {
      const N = i.filter((I) => {
        const $ = n.get(I);
        return !$.isAny && $.test(E);
      });
      return N.length ? N : [
        "any"
      ];
    }
    function p(E) {
      return E && typeof E == "function" && "_typedFunctionData" in E;
    }
    function v(E, N, I) {
      if (!p(E)) throw new TypeError(Pn);
      const $ = I && I.exact, V = Array.isArray(N) ? N.join(",") : N, U = C(V), ur = m(U);
      if (!$ || ur in E.signatures) {
        const Tr = E._typedFunctionData.signatureMap.get(ur);
        if (Tr) return Tr;
      }
      const k = U.length;
      let ar;
      if ($) {
        ar = [];
        let Tr;
        for (Tr in E.signatures) ar.push(E._typedFunctionData.signatureMap.get(Tr));
      } else ar = E._typedFunctionData.signatures;
      for (let Tr = 0; Tr < k; ++Tr) {
        const Mr = U[Tr], Gr = [];
        let ee;
        for (ee of ar) {
          const jr = F(ee.params, Tr);
          if (!(!jr || Mr.restParam && !jr.restParam)) {
            if (!jr.hasAny) {
              const se = g(jr);
              if (Mr.types.some((te) => !se.has(te.name))) continue;
            }
            Gr.push(ee);
          }
        }
        if (ar = Gr, ar.length === 0) break;
      }
      let H;
      for (H of ar) if (H.params.length <= k) return H;
      throw new TypeError("Signature not found (signature: " + (E.name || "unnamed") + "(" + m(U, ", ") + "))");
    }
    function d(E, N, I) {
      return v(E, N, I).implementation;
    }
    function l(E, N) {
      const I = c(N);
      if (I.test(E)) return E;
      const $ = I.conversionsTo;
      if ($.length === 0) throw new Error("There are no conversions to " + N + " defined.");
      for (let V = 0; V < $.length; V++) if (c($[V].from).test(E)) return $[V].convert(E);
      throw new Error("Cannot convert " + E + " to " + N);
    }
    function m(E) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
      return E.map((I) => I.name).join(N);
    }
    function D(E) {
      const N = E.indexOf("...") === 0, $ = (N ? E.length > 3 ? E.slice(3) : "any" : E).split("|").map((k) => c(k.trim()));
      let V = false, U = N ? "..." : "";
      return {
        types: $.map(function(k) {
          return V = k.isAny || V, U += k.name + "|", {
            name: k.name,
            typeIndex: k.index,
            test: k.test,
            isAny: k.isAny,
            conversion: null,
            conversionIndex: -1
          };
        }),
        name: U.slice(0, -1),
        hasAny: V,
        hasConversion: false,
        restParam: N
      };
    }
    function b(E) {
      const N = E.types.map((ur) => ur.name), I = J(N);
      let $ = E.hasAny, V = E.name;
      const U = I.map(function(ur) {
        const k = c(ur.from);
        return $ = k.isAny || $, V += "|" + ur.from, {
          name: ur.from,
          typeIndex: k.index,
          test: k.test,
          isAny: k.isAny,
          conversion: ur,
          conversionIndex: ur.index
        };
      });
      return {
        types: E.types.concat(U),
        name: V,
        hasAny: $,
        hasConversion: U.length > 0,
        restParam: E.restParam
      };
    }
    function g(E) {
      return E.typeSet || (E.typeSet = /* @__PURE__ */ new Set(), E.types.forEach((N) => E.typeSet.add(N.name))), E.typeSet;
    }
    function C(E) {
      const N = [];
      if (typeof E != "string") throw new TypeError("Signatures must be strings");
      const I = E.trim();
      if (I === "") return N;
      const $ = I.split(",");
      for (let V = 0; V < $.length; ++V) {
        const U = D($[V].trim());
        if (U.restParam && V !== $.length - 1) throw new SyntaxError('Unexpected rest parameter "' + $[V] + '": only allowed for the last parameter');
        if (U.types.length === 0) return null;
        N.push(U);
      }
      return N;
    }
    function A(E) {
      const N = Q(E);
      return N ? N.restParam : false;
    }
    function w(E) {
      if (!E || E.types.length === 0) return $n;
      if (E.types.length === 1) return c(E.types[0].name).test;
      if (E.types.length === 2) {
        const N = c(E.types[0].name).test, I = c(E.types[1].name).test;
        return function(V) {
          return N(V) || I(V);
        };
      } else {
        const N = E.types.map(function(I) {
          return c(I.name).test;
        });
        return function($) {
          for (let V = 0; V < N.length; V++) if (N[V]($)) return true;
          return false;
        };
      }
    }
    function _(E) {
      let N, I, $;
      if (A(E)) {
        N = j(E).map(w);
        const V = N.length, U = w(Q(E)), ur = function(k) {
          for (let ar = V; ar < k.length; ar++) if (!U(k[ar])) return false;
          return true;
        };
        return function(ar) {
          for (let H = 0; H < N.length; H++) if (!N[H](ar[H])) return false;
          return ur(ar) && ar.length >= V + 1;
        };
      } else return E.length === 0 ? function(U) {
        return U.length === 0;
      } : E.length === 1 ? (I = w(E[0]), function(U) {
        return I(U[0]) && U.length === 1;
      }) : E.length === 2 ? (I = w(E[0]), $ = w(E[1]), function(U) {
        return I(U[0]) && $(U[1]) && U.length === 2;
      }) : (N = E.map(w), function(U) {
        for (let ur = 0; ur < N.length; ur++) if (!N[ur](U[ur])) return false;
        return U.length === N.length;
      });
    }
    function F(E, N) {
      return N < E.length ? E[N] : A(E) ? Q(E) : null;
    }
    function y(E, N) {
      const I = F(E, N);
      return I ? g(I) : /* @__PURE__ */ new Set();
    }
    function M(E) {
      return E.conversion === null || E.conversion === void 0;
    }
    function B(E, N) {
      const I = /* @__PURE__ */ new Set();
      return E.forEach(($) => {
        const V = y($.params, N);
        let U;
        for (U of V) I.add(U);
      }), I.has("any") ? [
        "any"
      ] : Array.from(I);
    }
    function S(E, N, I) {
      let $, V;
      const U = E || "unnamed";
      let ur = I, k;
      for (k = 0; k < N.length; k++) {
        const Mr = [];
        if (ur.forEach((Gr) => {
          const ee = F(Gr.params, k), jr = w(ee);
          (k < Gr.params.length || A(Gr.params)) && jr(N[k]) && Mr.push(Gr);
        }), Mr.length === 0) {
          if (V = B(ur, k), V.length > 0) {
            const Gr = h(N[k]);
            return $ = new TypeError("Unexpected type of argument in function " + U + " (expected: " + V.join(" or ") + ", actual: " + Gr.join(" | ") + ", index: " + k + ")"), $.data = {
              category: "wrongType",
              fn: U,
              index: k,
              actual: Gr,
              expected: V
            }, $;
          }
        } else ur = Mr;
      }
      const ar = ur.map(function(Mr) {
        return A(Mr.params) ? 1 / 0 : Mr.params.length;
      });
      if (N.length < Math.min.apply(null, ar)) return V = B(ur, k), $ = new TypeError("Too few arguments in function " + U + " (expected: " + V.join(" or ") + ", index: " + N.length + ")"), $.data = {
        category: "tooFewArgs",
        fn: U,
        index: N.length,
        expected: V
      }, $;
      const H = Math.max.apply(null, ar);
      if (N.length > H) return $ = new TypeError("Too many arguments in function " + U + " (expected: " + H + ", actual: " + N.length + ")"), $.data = {
        category: "tooManyArgs",
        fn: U,
        index: N.length,
        expectedLength: H
      }, $;
      const Tr = [];
      for (let Mr = 0; Mr < N.length; ++Mr) Tr.push(h(N[Mr]).join("|"));
      return $ = new TypeError('Arguments of type "' + Tr.join(", ") + '" do not match any of the defined signatures of function ' + U + "."), $.data = {
        category: "mismatch",
        actual: Tr
      }, $;
    }
    function O(E) {
      let N = i.length + 1;
      for (let I = 0; I < E.types.length; I++) M(E.types[I]) && (N = Math.min(N, E.types[I].typeIndex));
      return N;
    }
    function x(E) {
      let N = u + 1;
      for (let I = 0; I < E.types.length; I++) M(E.types[I]) || (N = Math.min(N, E.types[I].conversionIndex));
      return N;
    }
    function z(E, N) {
      if (E.hasAny) {
        if (!N.hasAny) return 1;
      } else if (N.hasAny) return -1;
      if (E.restParam) {
        if (!N.restParam) return 1;
      } else if (N.restParam) return -1;
      if (E.hasConversion) {
        if (!N.hasConversion) return 1;
      } else if (N.hasConversion) return -1;
      const I = O(E) - O(N);
      if (I < 0) return -1;
      if (I > 0) return 1;
      const $ = x(E) - x(N);
      return $ < 0 ? -1 : $ > 0 ? 1 : 0;
    }
    function T(E, N) {
      const I = E.params, $ = N.params, V = Q(I), U = Q($), ur = A(I), k = A($);
      if (ur && V.hasAny) {
        if (!k || !U.hasAny) return 1;
      } else if (k && U.hasAny) return -1;
      let ar = 0, H = 0, Tr;
      for (Tr of I) Tr.hasAny && ++ar, Tr.hasConversion && ++H;
      let Mr = 0, Gr = 0;
      for (Tr of $) Tr.hasAny && ++Mr, Tr.hasConversion && ++Gr;
      if (ar !== Mr) return ar - Mr;
      if (ur && V.hasConversion) {
        if (!k || !U.hasConversion) return 1;
      } else if (k && U.hasConversion) return -1;
      if (H !== Gr) return H - Gr;
      if (ur) {
        if (!k) return 1;
      } else if (k) return -1;
      const ee = (I.length - $.length) * (ur ? -1 : 1);
      if (ee !== 0) return ee;
      const jr = [];
      let se = 0;
      for (let _e = 0; _e < I.length; ++_e) {
        const Te = z(I[_e], $[_e]);
        jr.push(Te), se += Te;
      }
      if (se !== 0) return se;
      let te;
      for (te of jr) if (te !== 0) return te;
      return 0;
    }
    function J(E) {
      if (E.length === 0) return [];
      const N = E.map(c);
      E.length > 1 && N.sort((V, U) => V.index - U.index);
      let I = N[0].conversionsTo;
      if (E.length === 1) return I;
      I = I.concat([]);
      const $ = new Set(E);
      for (let V = 1; V < N.length; ++V) {
        let U;
        for (U of N[V].conversionsTo) $.has(U.from) || (I.push(U), $.add(U.from));
      }
      return I;
    }
    function q(E, N) {
      let I = N;
      if (E.some((V) => V.hasConversion)) {
        const V = A(E), U = E.map(Z);
        I = function() {
          const k = [], ar = V ? arguments.length - 1 : arguments.length;
          for (let H = 0; H < ar; H++) k[H] = U[H](arguments[H]);
          return V && (k[ar] = arguments[ar].map(U[ar])), N.apply(this, k);
        };
      }
      let $ = I;
      if (A(E)) {
        const V = E.length - 1;
        $ = function() {
          return I.apply(this, X(arguments, 0, V).concat([
            X(arguments, V)
          ]));
        };
      }
      return $;
    }
    function Z(E) {
      let N, I, $, V;
      const U = [], ur = [];
      switch (E.types.forEach(function(k) {
        k.conversion && (U.push(c(k.conversion.from).test), ur.push(k.conversion.convert));
      }), ur.length) {
        case 0:
          return function(ar) {
            return ar;
          };
        case 1:
          return N = U[0], $ = ur[0], function(ar) {
            return N(ar) ? $(ar) : ar;
          };
        case 2:
          return N = U[0], I = U[1], $ = ur[0], V = ur[1], function(ar) {
            return N(ar) ? $(ar) : I(ar) ? V(ar) : ar;
          };
        default:
          return function(ar) {
            for (let H = 0; H < ur.length; H++) if (U[H](ar)) return ur[H](ar);
            return ar;
          };
      }
    }
    function nr(E) {
      function N(I, $, V) {
        if ($ < I.length) {
          const U = I[$];
          let ur = [];
          if (U.restParam) {
            const k = U.types.filter(M);
            k.length < U.types.length && ur.push({
              types: k,
              name: "..." + k.map((ar) => ar.name).join("|"),
              hasAny: k.some((ar) => ar.isAny),
              hasConversion: false,
              restParam: true
            }), ur.push(U);
          } else ur = U.types.map(function(k) {
            return {
              types: [
                k
              ],
              name: k.name,
              hasAny: k.isAny,
              hasConversion: k.conversion,
              restParam: false
            };
          });
          return er(ur, function(k) {
            return N(I, $ + 1, V.concat([
              k
            ]));
          });
        } else return [
          V
        ];
      }
      return N(E, 0, []);
    }
    function fr(E, N) {
      const I = Math.max(E.length, N.length);
      for (let k = 0; k < I; k++) {
        const ar = y(E, k), H = y(N, k);
        let Tr = false, Mr;
        for (Mr of H) if (ar.has(Mr)) {
          Tr = true;
          break;
        }
        if (!Tr) return false;
      }
      const $ = E.length, V = N.length, U = A(E), ur = A(N);
      return U ? ur ? $ === V : V >= $ : ur ? $ >= V : $ === V;
    }
    function R(E) {
      return E.map((N) => Fr(N) ? Dr(N.referToSelf.callback) : wr(N) ? gr(N.referTo.references, N.referTo.callback) : N);
    }
    function W(E, N, I) {
      const $ = [];
      let V;
      for (V of E) {
        let U = I[V];
        if (typeof U != "number") throw new TypeError('No definition for referenced signature "' + V + '"');
        if (U = N[U], typeof U != "function") return false;
        $.push(U);
      }
      return $;
    }
    function tr(E, N, I) {
      const $ = R(E), V = new Array($.length).fill(false);
      let U = true;
      for (; U; ) {
        U = false;
        let ur = true;
        for (let k = 0; k < $.length; ++k) {
          if (V[k]) continue;
          const ar = $[k];
          if (Fr(ar)) $[k] = ar.referToSelf.callback(I), $[k].referToSelf = ar.referToSelf, V[k] = true, ur = false;
          else if (wr(ar)) {
            const H = W(ar.referTo.references, $, N);
            H ? ($[k] = ar.referTo.callback.apply(this, H), $[k].referTo = ar.referTo, V[k] = true, ur = false) : U = true;
          }
        }
        if (ur && U) throw new SyntaxError("Circular reference detected in resolving typed.referTo");
      }
      return $;
    }
    function or(E) {
      const N = /\bthis(\(|\.signatures\b)/;
      Object.keys(E).forEach((I) => {
        const $ = E[I];
        if (N.test($.toString())) throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
      });
    }
    function rr(E, N) {
      if (a.createCount++, Object.keys(N).length === 0) throw new SyntaxError("No signatures provided");
      a.warnAgainstDeprecatedThis && or(N);
      const I = [], $ = [], V = {}, U = [];
      let ur;
      for (ur in N) {
        if (!Object.prototype.hasOwnProperty.call(N, ur)) continue;
        const Ir = C(ur);
        if (!Ir) continue;
        I.forEach(function(at) {
          if (fr(at, Ir)) throw new TypeError('Conflicting signatures "' + m(at) + '" and "' + m(Ir) + '".');
        }), I.push(Ir);
        const ce = $.length;
        $.push(N[ur]);
        const ia = Ir.map(b);
        let Dt;
        for (Dt of nr(ia)) {
          const at = m(Dt);
          U.push({
            params: Dt,
            name: at,
            fn: ce
          }), Dt.every((ua) => !ua.hasConversion) && (V[at] = ce);
        }
      }
      U.sort(T);
      const k = tr($, V, ut);
      let ar;
      for (ar in V) Object.prototype.hasOwnProperty.call(V, ar) && (V[ar] = k[V[ar]]);
      const H = [], Tr = /* @__PURE__ */ new Map();
      for (ar of U) Tr.has(ar.name) || (ar.fn = k[ar.fn], H.push(ar), Tr.set(ar.name, ar));
      const Mr = H[0] && H[0].params.length <= 2 && !A(H[0].params), Gr = H[1] && H[1].params.length <= 2 && !A(H[1].params), ee = H[2] && H[2].params.length <= 2 && !A(H[2].params), jr = H[3] && H[3].params.length <= 2 && !A(H[3].params), se = H[4] && H[4].params.length <= 2 && !A(H[4].params), te = H[5] && H[5].params.length <= 2 && !A(H[5].params), _e = Mr && Gr && ee && jr && se && te;
      for (let Ir = 0; Ir < H.length; ++Ir) H[Ir].test = _(H[Ir].params);
      const Te = Mr ? w(H[0].params[0]) : me, Ht = Gr ? w(H[1].params[0]) : me, L = ee ? w(H[2].params[0]) : me, K = jr ? w(H[3].params[0]) : me, lr = se ? w(H[4].params[0]) : me, Qr = te ? w(H[5].params[0]) : me, ue = Mr ? w(H[0].params[1]) : me, Xr = Gr ? w(H[1].params[1]) : me, Sr = ee ? w(H[2].params[1]) : me, Er = jr ? w(H[3].params[1]) : me, fe = se ? w(H[4].params[1]) : me, mt = te ? w(H[5].params[1]) : me;
      for (let Ir = 0; Ir < H.length; ++Ir) H[Ir].implementation = q(H[Ir].params, H[Ir].fn);
      const Lu = Mr ? H[0].implementation : Ye, Zu = Gr ? H[1].implementation : Ye, Wu = ee ? H[2].implementation : Ye, Vu = jr ? H[3].implementation : Ye, Yu = se ? H[4].implementation : Ye, Gu = te ? H[5].implementation : Ye, Ju = Mr ? H[0].params.length : -1, Qu = Gr ? H[1].params.length : -1, Xu = ee ? H[2].params.length : -1, Hu = jr ? H[3].params.length : -1, Ku = se ? H[4].params.length : -1, ku = te ? H[5].params.length : -1, ju = _e ? 6 : 0, ra = H.length, ea = H.map((Ir) => Ir.test), ta = H.map((Ir) => Ir.implementation), na = function() {
        for (let ce = ju; ce < ra; ce++) if (ea[ce](arguments)) return ta[ce].apply(this, arguments);
        return a.onMismatch(E, arguments, H);
      };
      function ut(Ir, ce) {
        return arguments.length === Ju && Te(Ir) && ue(ce) ? Lu.apply(this, arguments) : arguments.length === Qu && Ht(Ir) && Xr(ce) ? Zu.apply(this, arguments) : arguments.length === Xu && L(Ir) && Sr(ce) ? Wu.apply(this, arguments) : arguments.length === Hu && K(Ir) && Er(ce) ? Vu.apply(this, arguments) : arguments.length === Ku && lr(Ir) && fe(ce) ? Yu.apply(this, arguments) : arguments.length === ku && Qr(Ir) && mt(ce) ? Gu.apply(this, arguments) : na.apply(this, arguments);
      }
      try {
        Object.defineProperty(ut, "name", {
          value: E
        });
      } catch {
      }
      return ut.signatures = V, ut._typedFunctionData = {
        signatures: H,
        signatureMap: Tr
      }, ut;
    }
    function G(E, N, I) {
      throw S(E, N, I);
    }
    function j(E) {
      return X(E, 0, E.length - 1);
    }
    function Q(E) {
      return E[E.length - 1];
    }
    function X(E, N, I) {
      return Array.prototype.slice.call(E, N, I);
    }
    function cr(E, N) {
      for (let I = 0; I < E.length; I++) if (N(E[I])) return E[I];
    }
    function er(E, N) {
      return Array.prototype.concat.apply([], E.map(N));
    }
    function hr() {
      const E = j(arguments).map((I) => m(C(I))), N = Q(arguments);
      if (typeof N != "function") throw new TypeError("Callback function expected as last argument");
      return gr(E, N);
    }
    function gr(E, N) {
      return {
        referTo: {
          references: E,
          callback: N
        }
      };
    }
    function Dr(E) {
      if (typeof E != "function") throw new TypeError("Callback function expected as first argument");
      return {
        referToSelf: {
          callback: E
        }
      };
    }
    function wr(E) {
      return E && typeof E.referTo == "object" && Array.isArray(E.referTo.references) && typeof E.referTo.callback == "function";
    }
    function Fr(E) {
      return E && typeof E.referToSelf == "object" && typeof E.referToSelf.callback == "function";
    }
    function br(E, N) {
      if (!E) return N;
      if (N && N !== E) {
        const I = new Error("Function names do not match (expected: " + E + ", actual: " + N + ")");
        throw I.data = {
          actual: N,
          expected: E
        }, I;
      }
      return E;
    }
    function Cr(E) {
      let N;
      for (const I in E) Object.prototype.hasOwnProperty.call(E, I) && (p(E[I]) || typeof E[I].signature == "string") && (N = br(N, E[I].name));
      return N;
    }
    function _r(E, N) {
      let I;
      for (I in N) if (Object.prototype.hasOwnProperty.call(N, I)) {
        if (I in E && N[I] !== E[I]) {
          const $ = new Error('Signature "' + I + '" is defined twice');
          throw $.data = {
            signature: I,
            sourceFunction: N[I],
            destFunction: E[I]
          }, $;
        }
        E[I] = N[I];
      }
    }
    const xr = a;
    a = function(E) {
      const N = typeof E == "string", I = N ? 1 : 0;
      let $ = N ? E : "";
      const V = {};
      for (let U = I; U < arguments.length; ++U) {
        const ur = arguments[U];
        let k = {}, ar;
        if (typeof ur == "function" ? (ar = ur.name, typeof ur.signature == "string" ? k[ur.signature] = ur : p(ur) && (k = ur.signatures)) : r(ur) && (k = ur, N || (ar = Cr(ur))), Object.keys(k).length === 0) {
          const H = new TypeError("Argument to 'typed' at index " + U + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
          throw H.data = {
            index: U,
            argument: ur
          }, H;
        }
        N || ($ = br($, ar)), _r(V, k);
      }
      return rr($ || "", V);
    }, a.create = Yi, a.createCount = xr.createCount, a.onMismatch = G, a.throwMismatchError = G, a.createError = S, a.clear = f, a.clearConversions = o, a.addTypes = s, a._findType = c, a.referTo = hr, a.referToSelf = Dr, a.convert = l, a.findSignature = v, a.find = d, a.isTypedFunction = p, a.warnAgainstDeprecatedThis = true, a.addType = function(E, N) {
      let I = "any";
      N !== false && n.has("Object") && (I = "Object"), a.addTypes([
        E
      ], I);
    };
    function Jr(E) {
      if (!E || typeof E.from != "string" || typeof E.to != "string" || typeof E.convert != "function") throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
      if (E.to === E.from) throw new SyntaxError('Illegal to define conversion from "' + E.from + '" to itself.');
    }
    return a.addConversion = function(E) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        override: false
      };
      Jr(E);
      const I = c(E.to), $ = I.conversionsTo.find((V) => V.from === E.from);
      if ($) if (N && N.override) a.removeConversion({
        from: $.from,
        to: E.to,
        convert: $.convert
      });
      else throw new Error('There is already a conversion from "' + E.from + '" to "' + I.name + '"');
      I.conversionsTo.push({
        from: E.from,
        convert: E.convert,
        index: u++
      });
    }, a.addConversions = function(E, N) {
      E.forEach((I) => a.addConversion(I, N));
    }, a.removeConversion = function(E) {
      Jr(E);
      const N = c(E.to), I = cr(N.conversionsTo, (V) => V.from === E.from);
      if (!I) throw new Error("Attempt to remove nonexistent conversion from " + E.from + " to " + E.to);
      if (I.convert !== E.convert) throw new Error("Conversion to remove does not match existing conversion");
      const $ = N.conversionsTo.indexOf(I);
      N.conversionsTo.splice($, 1);
    }, a.resolve = function(E, N) {
      if (!p(E)) throw new TypeError(Pn);
      const I = E._typedFunctionData.signatures;
      for (let $ = 0; $ < I.length; ++$) if (I[$].test(N)) return I[$];
      return null;
    }, a;
  }
  Bt = Yi();
  function ir(r, e, t, n) {
    function i(u) {
      var a = Za(u, e.map(Ja));
      return Ya(r, e, u), t(a);
    }
    return i.isFactory = true, i.fn = r, i.dependencies = e.slice().sort(), n && (i.meta = n), i;
  }
  function Ya(r, e, t) {
    var n = e.filter((u) => !Ga(u)).every((u) => t[u] !== void 0);
    if (!n) {
      var i = e.filter((u) => t[u] === void 0);
      throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(i.map((u) => '"'.concat(u, '"')).join(", "), "."));
    }
  }
  function Ga(r) {
    return r && r[0] === "?";
  }
  function Ja(r) {
    return r && r[0] === "?" ? r.slice(1) : r;
  }
  function qr(r) {
    return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
  }
  var Qa = Math.sign || function(r) {
    return r > 0 ? 1 : r < 0 ? -1 : 0;
  };
  function Kt(r, e, t) {
    var n = {
      2: "0b",
      8: "0o",
      16: "0x"
    }, i = n[e], u = "";
    if (t) {
      if (t < 1) throw new Error("size must be in greater than 0");
      if (!qr(t)) throw new Error("size must be an integer");
      if (r > 2 ** (t - 1) - 1 || r < -(2 ** (t - 1))) throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
      if (!qr(r)) throw new Error("Value must be an integer");
      r < 0 && (r = r + 2 ** t), u = "i".concat(t);
    }
    var a = "";
    return r < 0 && (r = -r, a = "-"), "".concat(a).concat(i).concat(r.toString(e)).concat(u);
  }
  function tn(r, e) {
    if (typeof e == "function") return e(r);
    if (r === 1 / 0) return "Infinity";
    if (r === -1 / 0) return "-Infinity";
    if (isNaN(r)) return "NaN";
    var { notation: t, precision: n, wordSize: i } = Gi(e);
    switch (t) {
      case "fixed":
        return Ha(r, n);
      case "exponential":
        return Ji(r, n);
      case "engineering":
        return Xa(r, n);
      case "bin":
        return Kt(r, 2, i);
      case "oct":
        return Kt(r, 8, i);
      case "hex":
        return Kt(r, 16, i);
      case "auto":
        return Ka(r, n, e).replace(/((\.\d*?)(0+))($|e)/, function() {
          var u = arguments[2], a = arguments[4];
          return u !== "." ? u + a : a;
        });
      default:
        throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function Gi(r) {
    var e = "auto", t, n;
    if (r !== void 0) if (Pr(r)) t = r;
    else if (Yr(r)) t = r.toNumber();
    else if (gn(r)) r.precision !== void 0 && (t = Rn(r.precision, () => {
      throw new Error('Option "precision" must be a number or BigNumber');
    })), r.wordSize !== void 0 && (n = Rn(r.wordSize, () => {
      throw new Error('Option "wordSize" must be a number or BigNumber');
    })), r.notation && (e = r.notation);
    else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
    return {
      notation: e,
      precision: t,
      wordSize: n
    };
  }
  function qt(r) {
    var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
    if (!e) throw new SyntaxError("Invalid number " + r);
    var t = e[1], n = e[2], i = parseFloat(e[4] || "0"), u = n.indexOf(".");
    i += u !== -1 ? u - 1 : n.length - 1;
    var a = n.replace(".", "").replace(/^0*/, function(c) {
      return i -= c.length, "";
    }).replace(/0*$/, "").split("").map(function(c) {
      return parseInt(c);
    });
    return a.length === 0 && (a.push(0), i++), {
      sign: t,
      coefficients: a,
      exponent: i
    };
  }
  function Xa(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var t = qt(r), n = Ut(t, e), i = n.exponent, u = n.coefficients, a = i % 3 === 0 ? i : i < 0 ? i - 3 - i % 3 : i - i % 3;
    if (Pr(e)) for (; e > u.length || i - a + 1 > u.length; ) u.push(0);
    else for (var c = Math.abs(i - a) - (u.length - 1), s = 0; s < c; s++) u.push(0);
    for (var f = Math.abs(i - a), o = 1; f > 0; ) o++, f--;
    var h = u.slice(o).join(""), p = Pr(e) && h.length || h.match(/[1-9]/) ? "." + h : "", v = u.slice(0, o).join("") + p + "e" + (i >= 0 ? "+" : "") + a.toString();
    return n.sign + v;
  }
  function Ha(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var t = qt(r), n = typeof e == "number" ? Ut(t, t.exponent + 1 + e) : t, i = n.coefficients, u = n.exponent + 1, a = u + (e || 0);
    return i.length < a && (i = i.concat(He(a - i.length))), u < 0 && (i = He(-u + 1).concat(i), u = 1), u < i.length && i.splice(u, 0, u === 0 ? "0." : "."), n.sign + i.join("");
  }
  function Ji(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var t = qt(r), n = e ? Ut(t, e) : t, i = n.coefficients, u = n.exponent;
    i.length < e && (i = i.concat(He(e - i.length)));
    var a = i.shift();
    return n.sign + a + (i.length > 0 ? "." + i.join("") : "") + "e" + (u >= 0 ? "+" : "") + u;
  }
  function Ka(r, e, t) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = qn(t == null ? void 0 : t.lowerExp, -3), i = qn(t == null ? void 0 : t.upperExp, 5), u = qt(r), a = e ? Ut(u, e) : u;
    if (a.exponent < n || a.exponent >= i) return Ji(r, e);
    var c = a.coefficients, s = a.exponent;
    c.length < e && (c = c.concat(He(e - c.length))), c = c.concat(He(s - c.length + 1 + (c.length < e ? e - c.length : 0))), c = He(-s).concat(c);
    var f = s > 0 ? s : 0;
    return f < c.length - 1 && c.splice(f + 1, 0, "."), a.sign + c.join("");
  }
  function Ut(r, e) {
    for (var t = {
      sign: r.sign,
      coefficients: r.coefficients,
      exponent: r.exponent
    }, n = t.coefficients; e <= 0; ) n.unshift(0), t.exponent++, e++;
    if (n.length > e) {
      var i = n.splice(e, n.length - e);
      if (i[0] >= 5) {
        var u = e - 1;
        for (n[u]++; n[u] === 10; ) n.pop(), u === 0 && (n.unshift(0), t.exponent++, u++), u--, n[u]++;
      }
    }
    return t;
  }
  function He(r) {
    for (var e = [], t = 0; t < r; t++) e.push(0);
    return e;
  }
  function ka(r) {
    return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
  }
  function Se(r, e) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (t <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (n < 0) throw new Error("Absolute tolerance must be at least 0");
    return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(t * Math.max(Math.abs(r), Math.abs(e)), n);
  }
  function Rn(r, e) {
    if (Pr(r)) return r;
    if (Yr(r)) return r.toNumber();
    e();
  }
  function qn(r, e) {
    return Pr(r) ? r : Yr(r) ? r.toNumber() : e;
  }
  var Qi = function() {
    return Qi = Bt.create, Bt;
  }, ja = [
    "?BigNumber",
    "?Complex",
    "?DenseMatrix",
    "?Fraction"
  ], ro = ir("typed", ja, function(e) {
    var { BigNumber: t, Complex: n, DenseMatrix: i, Fraction: u } = e, a = Qi();
    return a.clear(), a.addTypes([
      {
        name: "number",
        test: Pr
      },
      {
        name: "Complex",
        test: dn
      },
      {
        name: "BigNumber",
        test: Yr
      },
      {
        name: "bigint",
        test: pa
      },
      {
        name: "Fraction",
        test: mn
      },
      {
        name: "Unit",
        test: Ui
      },
      {
        name: "identifier",
        test: (c) => we && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(c)
      },
      {
        name: "string",
        test: we
      },
      {
        name: "Chain",
        test: Ua
      },
      {
        name: "Array",
        test: Wr
      },
      {
        name: "Matrix",
        test: zr
      },
      {
        name: "DenseMatrix",
        test: Li
      },
      {
        name: "SparseMatrix",
        test: Zi
      },
      {
        name: "Range",
        test: Wi
      },
      {
        name: "Index",
        test: Dn
      },
      {
        name: "boolean",
        test: da
      },
      {
        name: "ResultSet",
        test: ma
      },
      {
        name: "Help",
        test: Da
      },
      {
        name: "function",
        test: ga
      },
      {
        name: "Date",
        test: ya
      },
      {
        name: "RegExp",
        test: wa
      },
      {
        name: "null",
        test: Fa
      },
      {
        name: "undefined",
        test: Ea
      },
      {
        name: "AccessorNode",
        test: ba
      },
      {
        name: "ArrayNode",
        test: Ca
      },
      {
        name: "AssignmentNode",
        test: _a
      },
      {
        name: "BlockNode",
        test: Ba
      },
      {
        name: "ConditionalNode",
        test: Ma
      },
      {
        name: "ConstantNode",
        test: Sa
      },
      {
        name: "FunctionNode",
        test: xa
      },
      {
        name: "FunctionAssignmentNode",
        test: Na
      },
      {
        name: "IndexNode",
        test: Ta
      },
      {
        name: "Node",
        test: Ia
      },
      {
        name: "ObjectNode",
        test: Oa
      },
      {
        name: "OperatorNode",
        test: za
      },
      {
        name: "ParenthesisNode",
        test: $a
      },
      {
        name: "RangeNode",
        test: Pa
      },
      {
        name: "RelationalNode",
        test: Ra
      },
      {
        name: "SymbolNode",
        test: qa
      },
      {
        name: "Map",
        test: Aa
      },
      {
        name: "Object",
        test: gn
      }
    ]), a.addConversions([
      {
        from: "number",
        to: "BigNumber",
        convert: function(s) {
          if (t || gt(s), ka(s) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + s + "). Use function bignumber(x) to convert to BigNumber.");
          return new t(s);
        }
      },
      {
        from: "number",
        to: "Complex",
        convert: function(s) {
          return n || yt(s), new n(s, 0);
        }
      },
      {
        from: "BigNumber",
        to: "Complex",
        convert: function(s) {
          return n || yt(s), new n(s.toNumber(), 0);
        }
      },
      {
        from: "bigint",
        to: "number",
        convert: function(s) {
          if (s > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + s + ")");
          return Number(s);
        }
      },
      {
        from: "bigint",
        to: "BigNumber",
        convert: function(s) {
          return t || gt(s), new t(s.toString());
        }
      },
      {
        from: "bigint",
        to: "Fraction",
        convert: function(s) {
          return u || wt(s), new u(s);
        }
      },
      {
        from: "Fraction",
        to: "BigNumber",
        convert: function(s) {
          throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
        }
      },
      {
        from: "Fraction",
        to: "Complex",
        convert: function(s) {
          return n || yt(s), new n(s.valueOf(), 0);
        }
      },
      {
        from: "number",
        to: "Fraction",
        convert: function(s) {
          u || wt(s);
          var f = new u(s);
          if (f.valueOf() !== s) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + s + "). Use function fraction(x) to convert to Fraction.");
          return f;
        }
      },
      {
        from: "string",
        to: "number",
        convert: function(s) {
          var f = Number(s);
          if (isNaN(f)) throw new Error('Cannot convert "' + s + '" to a number');
          return f;
        }
      },
      {
        from: "string",
        to: "BigNumber",
        convert: function(s) {
          t || gt(s);
          try {
            return new t(s);
          } catch {
            throw new Error('Cannot convert "' + s + '" to BigNumber');
          }
        }
      },
      {
        from: "string",
        to: "bigint",
        convert: function(s) {
          try {
            return BigInt(s);
          } catch {
            throw new Error('Cannot convert "' + s + '" to BigInt');
          }
        }
      },
      {
        from: "string",
        to: "Fraction",
        convert: function(s) {
          u || wt(s);
          try {
            return new u(s);
          } catch {
            throw new Error('Cannot convert "' + s + '" to Fraction');
          }
        }
      },
      {
        from: "string",
        to: "Complex",
        convert: function(s) {
          n || yt(s);
          try {
            return new n(s);
          } catch {
            throw new Error('Cannot convert "' + s + '" to Complex');
          }
        }
      },
      {
        from: "boolean",
        to: "number",
        convert: function(s) {
          return +s;
        }
      },
      {
        from: "boolean",
        to: "BigNumber",
        convert: function(s) {
          return t || gt(s), new t(+s);
        }
      },
      {
        from: "boolean",
        to: "bigint",
        convert: function(s) {
          return BigInt(+s);
        }
      },
      {
        from: "boolean",
        to: "Fraction",
        convert: function(s) {
          return u || wt(s), new u(+s);
        }
      },
      {
        from: "boolean",
        to: "string",
        convert: function(s) {
          return String(s);
        }
      },
      {
        from: "Array",
        to: "Matrix",
        convert: function(s) {
          return i || eo(), new i(s);
        }
      },
      {
        from: "Matrix",
        to: "Array",
        convert: function(s) {
          return s.valueOf();
        }
      }
    ]), a.onMismatch = (c, s, f) => {
      var o = a.createError(c, s, f);
      if ([
        "wrongType",
        "mismatch"
      ].includes(o.data.category) && s.length === 1 && _t(s[0]) && f.some((p) => !p.params.includes(","))) {
        var h = new TypeError("Function '".concat(c, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(c, ")'."));
        throw h.data = o.data, h;
      }
      throw o;
    }, a.onMismatch = (c, s, f) => {
      var o = a.createError(c, s, f);
      if ([
        "wrongType",
        "mismatch"
      ].includes(o.data.category) && s.length === 1 && _t(s[0]) && f.some((p) => !p.params.includes(","))) {
        var h = new TypeError("Function '".concat(c, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(c, ")'."));
        throw h.data = o.data, h;
      }
      throw o;
    }, a;
  });
  function gt(r) {
    throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
  }
  function yt(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
  }
  function eo() {
    throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
  }
  function wt(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
  }
  var nn = 9e15, Re = 1e9, un = "0123456789abcdef", Mt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", St = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", an = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -9e15,
    maxE: nn,
    crypto: false
  }, Xi, Me, yr = true, Lt = "[DecimalError] ", Pe = Lt + "Invalid argument: ", Hi = Lt + "Precision limit exceeded", Ki = Lt + "crypto unavailable", ki = "[object Decimal]", ie = Math.floor, Hr = Math.pow, to = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, no = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, io = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, ji = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ee = 1e7, mr = 7, uo = 9007199254740991, ao = Mt.length - 1, on = St.length - 1, Y = {
    toStringTag: ki
  };
  Y.absoluteValue = Y.abs = function() {
    var r = new this.constructor(this);
    return r.s < 0 && (r.s = 1), pr(r);
  };
  Y.ceil = function() {
    return pr(new this.constructor(this), this.e + 1, 2);
  };
  Y.clampedTo = Y.clamp = function(r, e) {
    var t, n = this, i = n.constructor;
    if (r = new i(r), e = new i(e), !r.s || !e.s) return new i(NaN);
    if (r.gt(e)) throw Error(Pe + e);
    return t = n.cmp(r), t < 0 ? r : n.cmp(e) > 0 ? e : new i(n);
  };
  Y.comparedTo = Y.cmp = function(r) {
    var e, t, n, i, u = this, a = u.d, c = (r = new u.constructor(r)).d, s = u.s, f = r.s;
    if (!a || !c) return !s || !f ? NaN : s !== f ? s : a === c ? 0 : !a ^ s < 0 ? 1 : -1;
    if (!a[0] || !c[0]) return a[0] ? s : c[0] ? -f : 0;
    if (s !== f) return s;
    if (u.e !== r.e) return u.e > r.e ^ s < 0 ? 1 : -1;
    for (n = a.length, i = c.length, e = 0, t = n < i ? n : i; e < t; ++e) if (a[e] !== c[e]) return a[e] > c[e] ^ s < 0 ? 1 : -1;
    return n === i ? 0 : n > i ^ s < 0 ? 1 : -1;
  };
  Y.cosine = Y.cos = function() {
    var r, e, t = this, n = t.constructor;
    return t.d ? t.d[0] ? (r = n.precision, e = n.rounding, n.precision = r + Math.max(t.e, t.sd()) + mr, n.rounding = 1, t = oo(n, iu(n, t)), n.precision = r, n.rounding = e, pr(Me == 2 || Me == 3 ? t.neg() : t, r, e, true)) : new n(1) : new n(NaN);
  };
  Y.cubeRoot = Y.cbrt = function() {
    var r, e, t, n, i, u, a, c, s, f, o = this, h = o.constructor;
    if (!o.isFinite() || o.isZero()) return new h(o);
    for (yr = false, u = o.s * Hr(o.s * o, 1 / 3), !u || Math.abs(u) == 1 / 0 ? (t = re(o.d), r = o.e, (u = (r - t.length + 1) % 3) && (t += u == 1 || u == -2 ? "0" : "00"), u = Hr(t, 1 / 3), r = ie((r + 1) / 3) - (r % 3 == (r < 0 ? -1 : 2)), u == 1 / 0 ? t = "5e" + r : (t = u.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + r), n = new h(t), n.s = o.s) : n = new h(u.toString()), a = (r = h.precision) + 3; ; ) if (c = n, s = c.times(c).times(c), f = s.plus(o), n = Rr(f.plus(o).times(c), f.plus(s), a + 2, 1), re(c.d).slice(0, a) === (t = re(n.d)).slice(0, a)) if (t = t.slice(a - 3, a + 1), t == "9999" || !i && t == "4999") {
      if (!i && (pr(c, r + 1, 0), c.times(c).times(c).eq(o))) {
        n = c;
        break;
      }
      a += 4, i = 1;
    } else {
      (!+t || !+t.slice(1) && t.charAt(0) == "5") && (pr(n, r + 1, 1), e = !n.times(n).times(n).eq(o));
      break;
    }
    return yr = true, pr(n, r, h.rounding, e);
  };
  Y.decimalPlaces = Y.dp = function() {
    var r, e = this.d, t = NaN;
    if (e) {
      if (r = e.length - 1, t = (r - ie(this.e / mr)) * mr, r = e[r], r) for (; r % 10 == 0; r /= 10) t--;
      t < 0 && (t = 0);
    }
    return t;
  };
  Y.dividedBy = Y.div = function(r) {
    return Rr(this, new this.constructor(r));
  };
  Y.dividedToIntegerBy = Y.divToInt = function(r) {
    var e = this, t = e.constructor;
    return pr(Rr(e, new t(r), 0, 1, 1), t.precision, t.rounding);
  };
  Y.equals = Y.eq = function(r) {
    return this.cmp(r) === 0;
  };
  Y.floor = function() {
    return pr(new this.constructor(this), this.e + 1, 3);
  };
  Y.greaterThan = Y.gt = function(r) {
    return this.cmp(r) > 0;
  };
  Y.greaterThanOrEqualTo = Y.gte = function(r) {
    var e = this.cmp(r);
    return e == 1 || e === 0;
  };
  Y.hyperbolicCosine = Y.cosh = function() {
    var r, e, t, n, i, u = this, a = u.constructor, c = new a(1);
    if (!u.isFinite()) return new a(u.s ? 1 / 0 : NaN);
    if (u.isZero()) return c;
    t = a.precision, n = a.rounding, a.precision = t + Math.max(u.e, u.sd()) + 4, a.rounding = 1, i = u.d.length, i < 32 ? (r = Math.ceil(i / 3), e = (1 / Wt(4, r)).toString()) : (r = 16, e = "2.3283064365386962890625e-10"), u = ke(a, 1, u.times(e), new a(1), true);
    for (var s, f = r, o = new a(8); f--; ) s = u.times(u), u = c.minus(s.times(o.minus(s.times(o))));
    return pr(u, a.precision = t, a.rounding = n, true);
  };
  Y.hyperbolicSine = Y.sinh = function() {
    var r, e, t, n, i = this, u = i.constructor;
    if (!i.isFinite() || i.isZero()) return new u(i);
    if (e = u.precision, t = u.rounding, u.precision = e + Math.max(i.e, i.sd()) + 4, u.rounding = 1, n = i.d.length, n < 3) i = ke(u, 2, i, i, true);
    else {
      r = 1.4 * Math.sqrt(n), r = r > 16 ? 16 : r | 0, i = i.times(1 / Wt(5, r)), i = ke(u, 2, i, i, true);
      for (var a, c = new u(5), s = new u(16), f = new u(20); r--; ) a = i.times(i), i = i.times(c.plus(a.times(s.times(a).plus(f))));
    }
    return u.precision = e, u.rounding = t, pr(i, e, t, true);
  };
  Y.hyperbolicTangent = Y.tanh = function() {
    var r, e, t = this, n = t.constructor;
    return t.isFinite() ? t.isZero() ? new n(t) : (r = n.precision, e = n.rounding, n.precision = r + 7, n.rounding = 1, Rr(t.sinh(), t.cosh(), n.precision = r, n.rounding = e)) : new n(t.s);
  };
  Y.inverseCosine = Y.acos = function() {
    var r, e = this, t = e.constructor, n = e.abs().cmp(1), i = t.precision, u = t.rounding;
    return n !== -1 ? n === 0 ? e.isNeg() ? Ae(t, i, u) : new t(0) : new t(NaN) : e.isZero() ? Ae(t, i + 4, u).times(0.5) : (t.precision = i + 6, t.rounding = 1, e = e.asin(), r = Ae(t, i + 4, u).times(0.5), t.precision = i, t.rounding = u, r.minus(e));
  };
  Y.inverseHyperbolicCosine = Y.acosh = function() {
    var r, e, t = this, n = t.constructor;
    return t.lte(1) ? new n(t.eq(1) ? 0 : NaN) : t.isFinite() ? (r = n.precision, e = n.rounding, n.precision = r + Math.max(Math.abs(t.e), t.sd()) + 4, n.rounding = 1, yr = false, t = t.times(t).minus(1).sqrt().plus(t), yr = true, n.precision = r, n.rounding = e, t.ln()) : new n(t);
  };
  Y.inverseHyperbolicSine = Y.asinh = function() {
    var r, e, t = this, n = t.constructor;
    return !t.isFinite() || t.isZero() ? new n(t) : (r = n.precision, e = n.rounding, n.precision = r + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, n.rounding = 1, yr = false, t = t.times(t).plus(1).sqrt().plus(t), yr = true, n.precision = r, n.rounding = e, t.ln());
  };
  Y.inverseHyperbolicTangent = Y.atanh = function() {
    var r, e, t, n, i = this, u = i.constructor;
    return i.isFinite() ? i.e >= 0 ? new u(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (r = u.precision, e = u.rounding, n = i.sd(), Math.max(n, r) < 2 * -i.e - 1 ? pr(new u(i), r, e, true) : (u.precision = t = n - i.e, i = Rr(i.plus(1), new u(1).minus(i), t + r, 1), u.precision = r + 4, u.rounding = 1, i = i.ln(), u.precision = r, u.rounding = e, i.times(0.5))) : new u(NaN);
  };
  Y.inverseSine = Y.asin = function() {
    var r, e, t, n, i = this, u = i.constructor;
    return i.isZero() ? new u(i) : (e = i.abs().cmp(1), t = u.precision, n = u.rounding, e !== -1 ? e === 0 ? (r = Ae(u, t + 4, n).times(0.5), r.s = i.s, r) : new u(NaN) : (u.precision = t + 6, u.rounding = 1, i = i.div(new u(1).minus(i.times(i)).sqrt().plus(1)).atan(), u.precision = t, u.rounding = n, i.times(2)));
  };
  Y.inverseTangent = Y.atan = function() {
    var r, e, t, n, i, u, a, c, s, f = this, o = f.constructor, h = o.precision, p = o.rounding;
    if (f.isFinite()) {
      if (f.isZero()) return new o(f);
      if (f.abs().eq(1) && h + 4 <= on) return a = Ae(o, h + 4, p).times(0.25), a.s = f.s, a;
    } else {
      if (!f.s) return new o(NaN);
      if (h + 4 <= on) return a = Ae(o, h + 4, p).times(0.5), a.s = f.s, a;
    }
    for (o.precision = c = h + 10, o.rounding = 1, t = Math.min(28, c / mr + 2 | 0), r = t; r; --r) f = f.div(f.times(f).plus(1).sqrt().plus(1));
    for (yr = false, e = Math.ceil(c / mr), n = 1, s = f.times(f), a = new o(f), i = f; r !== -1; ) if (i = i.times(s), u = a.minus(i.div(n += 2)), i = i.times(s), a = u.plus(i.div(n += 2)), a.d[e] !== void 0) for (r = e; a.d[r] === u.d[r] && r--; ) ;
    return t && (a = a.times(2 << t - 1)), yr = true, pr(a, o.precision = h, o.rounding = p, true);
  };
  Y.isFinite = function() {
    return !!this.d;
  };
  Y.isInteger = Y.isInt = function() {
    return !!this.d && ie(this.e / mr) > this.d.length - 2;
  };
  Y.isNaN = function() {
    return !this.s;
  };
  Y.isNegative = Y.isNeg = function() {
    return this.s < 0;
  };
  Y.isPositive = Y.isPos = function() {
    return this.s > 0;
  };
  Y.isZero = function() {
    return !!this.d && this.d[0] === 0;
  };
  Y.lessThan = Y.lt = function(r) {
    return this.cmp(r) < 0;
  };
  Y.lessThanOrEqualTo = Y.lte = function(r) {
    return this.cmp(r) < 1;
  };
  Y.logarithm = Y.log = function(r) {
    var e, t, n, i, u, a, c, s, f = this, o = f.constructor, h = o.precision, p = o.rounding, v = 5;
    if (r == null) r = new o(10), e = true;
    else {
      if (r = new o(r), t = r.d, r.s < 0 || !t || !t[0] || r.eq(1)) return new o(NaN);
      e = r.eq(10);
    }
    if (t = f.d, f.s < 0 || !t || !t[0] || f.eq(1)) return new o(t && !t[0] ? -1 / 0 : f.s != 1 ? NaN : t ? 0 : 1 / 0);
    if (e) if (t.length > 1) u = true;
    else {
      for (i = t[0]; i % 10 === 0; ) i /= 10;
      u = i !== 1;
    }
    if (yr = false, c = h + v, a = ze(f, c), n = e ? Nt(o, c + 10) : ze(r, c), s = Rr(a, n, c, 1), ft(s.d, i = h, p)) do
      if (c += 10, a = ze(f, c), n = e ? Nt(o, c + 10) : ze(r, c), s = Rr(a, n, c, 1), !u) {
        +re(s.d).slice(i + 1, i + 15) + 1 == 1e14 && (s = pr(s, h + 1, 0));
        break;
      }
    while (ft(s.d, i += 10, p));
    return yr = true, pr(s, h, p);
  };
  Y.minus = Y.sub = function(r) {
    var e, t, n, i, u, a, c, s, f, o, h, p, v = this, d = v.constructor;
    if (r = new d(r), !v.d || !r.d) return !v.s || !r.s ? r = new d(NaN) : v.d ? r.s = -r.s : r = new d(r.d || v.s !== r.s ? v : NaN), r;
    if (v.s != r.s) return r.s = -r.s, v.plus(r);
    if (f = v.d, p = r.d, c = d.precision, s = d.rounding, !f[0] || !p[0]) {
      if (p[0]) r.s = -r.s;
      else if (f[0]) r = new d(v);
      else return new d(s === 3 ? -0 : 0);
      return yr ? pr(r, c, s) : r;
    }
    if (t = ie(r.e / mr), o = ie(v.e / mr), f = f.slice(), u = o - t, u) {
      for (h = u < 0, h ? (e = f, u = -u, a = p.length) : (e = p, t = o, a = f.length), n = Math.max(Math.ceil(c / mr), a) + 2, u > n && (u = n, e.length = 1), e.reverse(), n = u; n--; ) e.push(0);
      e.reverse();
    } else {
      for (n = f.length, a = p.length, h = n < a, h && (a = n), n = 0; n < a; n++) if (f[n] != p[n]) {
        h = f[n] < p[n];
        break;
      }
      u = 0;
    }
    for (h && (e = f, f = p, p = e, r.s = -r.s), a = f.length, n = p.length - a; n > 0; --n) f[a++] = 0;
    for (n = p.length; n > u; ) {
      if (f[--n] < p[n]) {
        for (i = n; i && f[--i] === 0; ) f[i] = Ee - 1;
        --f[i], f[n] += Ee;
      }
      f[n] -= p[n];
    }
    for (; f[--a] === 0; ) f.pop();
    for (; f[0] === 0; f.shift()) --t;
    return f[0] ? (r.d = f, r.e = Zt(f, t), yr ? pr(r, c, s) : r) : new d(s === 3 ? -0 : 0);
  };
  Y.modulo = Y.mod = function(r) {
    var e, t = this, n = t.constructor;
    return r = new n(r), !t.d || !r.s || r.d && !r.d[0] ? new n(NaN) : !r.d || t.d && !t.d[0] ? pr(new n(t), n.precision, n.rounding) : (yr = false, n.modulo == 9 ? (e = Rr(t, r.abs(), 0, 3, 1), e.s *= r.s) : e = Rr(t, r, 0, n.modulo, 1), e = e.times(r), yr = true, t.minus(e));
  };
  Y.naturalExponential = Y.exp = function() {
    return sn(this);
  };
  Y.naturalLogarithm = Y.ln = function() {
    return ze(this);
  };
  Y.negated = Y.neg = function() {
    var r = new this.constructor(this);
    return r.s = -r.s, pr(r);
  };
  Y.plus = Y.add = function(r) {
    var e, t, n, i, u, a, c, s, f, o, h = this, p = h.constructor;
    if (r = new p(r), !h.d || !r.d) return !h.s || !r.s ? r = new p(NaN) : h.d || (r = new p(r.d || h.s === r.s ? h : NaN)), r;
    if (h.s != r.s) return r.s = -r.s, h.minus(r);
    if (f = h.d, o = r.d, c = p.precision, s = p.rounding, !f[0] || !o[0]) return o[0] || (r = new p(h)), yr ? pr(r, c, s) : r;
    if (u = ie(h.e / mr), n = ie(r.e / mr), f = f.slice(), i = u - n, i) {
      for (i < 0 ? (t = f, i = -i, a = o.length) : (t = o, n = u, a = f.length), u = Math.ceil(c / mr), a = u > a ? u + 1 : a + 1, i > a && (i = a, t.length = 1), t.reverse(); i--; ) t.push(0);
      t.reverse();
    }
    for (a = f.length, i = o.length, a - i < 0 && (i = a, t = o, o = f, f = t), e = 0; i; ) e = (f[--i] = f[i] + o[i] + e) / Ee | 0, f[i] %= Ee;
    for (e && (f.unshift(e), ++n), a = f.length; f[--a] == 0; ) f.pop();
    return r.d = f, r.e = Zt(f, n), yr ? pr(r, c, s) : r;
  };
  Y.precision = Y.sd = function(r) {
    var e, t = this;
    if (r !== void 0 && r !== !!r && r !== 1 && r !== 0) throw Error(Pe + r);
    return t.d ? (e = ru(t.d), r && t.e + 1 > e && (e = t.e + 1)) : e = NaN, e;
  };
  Y.round = function() {
    var r = this, e = r.constructor;
    return pr(new e(r), r.e + 1, e.rounding);
  };
  Y.sine = Y.sin = function() {
    var r, e, t = this, n = t.constructor;
    return t.isFinite() ? t.isZero() ? new n(t) : (r = n.precision, e = n.rounding, n.precision = r + Math.max(t.e, t.sd()) + mr, n.rounding = 1, t = fo(n, iu(n, t)), n.precision = r, n.rounding = e, pr(Me > 2 ? t.neg() : t, r, e, true)) : new n(NaN);
  };
  Y.squareRoot = Y.sqrt = function() {
    var r, e, t, n, i, u, a = this, c = a.d, s = a.e, f = a.s, o = a.constructor;
    if (f !== 1 || !c || !c[0]) return new o(!f || f < 0 && (!c || c[0]) ? NaN : c ? a : 1 / 0);
    for (yr = false, f = Math.sqrt(+a), f == 0 || f == 1 / 0 ? (e = re(c), (e.length + s) % 2 == 0 && (e += "0"), f = Math.sqrt(e), s = ie((s + 1) / 2) - (s < 0 || s % 2), f == 1 / 0 ? e = "5e" + s : (e = f.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + s), n = new o(e)) : n = new o(f.toString()), t = (s = o.precision) + 3; ; ) if (u = n, n = u.plus(Rr(a, u, t + 2, 1)).times(0.5), re(u.d).slice(0, t) === (e = re(n.d)).slice(0, t)) if (e = e.slice(t - 3, t + 1), e == "9999" || !i && e == "4999") {
      if (!i && (pr(u, s + 1, 0), u.times(u).eq(a))) {
        n = u;
        break;
      }
      t += 4, i = 1;
    } else {
      (!+e || !+e.slice(1) && e.charAt(0) == "5") && (pr(n, s + 1, 1), r = !n.times(n).eq(a));
      break;
    }
    return yr = true, pr(n, s, o.rounding, r);
  };
  Y.tangent = Y.tan = function() {
    var r, e, t = this, n = t.constructor;
    return t.isFinite() ? t.isZero() ? new n(t) : (r = n.precision, e = n.rounding, n.precision = r + 10, n.rounding = 1, t = t.sin(), t.s = 1, t = Rr(t, new n(1).minus(t.times(t)).sqrt(), r + 10, 0), n.precision = r, n.rounding = e, pr(Me == 2 || Me == 4 ? t.neg() : t, r, e, true)) : new n(NaN);
  };
  Y.times = Y.mul = function(r) {
    var e, t, n, i, u, a, c, s, f, o = this, h = o.constructor, p = o.d, v = (r = new h(r)).d;
    if (r.s *= o.s, !p || !p[0] || !v || !v[0]) return new h(!r.s || p && !p[0] && !v || v && !v[0] && !p ? NaN : !p || !v ? r.s / 0 : r.s * 0);
    for (t = ie(o.e / mr) + ie(r.e / mr), s = p.length, f = v.length, s < f && (u = p, p = v, v = u, a = s, s = f, f = a), u = [], a = s + f, n = a; n--; ) u.push(0);
    for (n = f; --n >= 0; ) {
      for (e = 0, i = s + n; i > n; ) c = u[i] + v[n] * p[i - n - 1] + e, u[i--] = c % Ee | 0, e = c / Ee | 0;
      u[i] = (u[i] + e) % Ee | 0;
    }
    for (; !u[--a]; ) u.pop();
    return e ? ++t : u.shift(), r.d = u, r.e = Zt(u, t), yr ? pr(r, h.precision, h.rounding) : r;
  };
  Y.toBinary = function(r, e) {
    return yn(this, 2, r, e);
  };
  Y.toDecimalPlaces = Y.toDP = function(r, e) {
    var t = this, n = t.constructor;
    return t = new n(t), r === void 0 ? t : (ve(r, 0, Re), e === void 0 ? e = n.rounding : ve(e, 0, 8), pr(t, r + t.e + 1, e));
  };
  Y.toExponential = function(r, e) {
    var t, n = this, i = n.constructor;
    return r === void 0 ? t = be(n, true) : (ve(r, 0, Re), e === void 0 ? e = i.rounding : ve(e, 0, 8), n = pr(new i(n), r + 1, e), t = be(n, true, r + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
  };
  Y.toFixed = function(r, e) {
    var t, n, i = this, u = i.constructor;
    return r === void 0 ? t = be(i) : (ve(r, 0, Re), e === void 0 ? e = u.rounding : ve(e, 0, 8), n = pr(new u(i), r + i.e + 1, e), t = be(n, false, r + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + t : t;
  };
  Y.toFraction = function(r) {
    var e, t, n, i, u, a, c, s, f, o, h, p, v = this, d = v.d, l = v.constructor;
    if (!d) return new l(v);
    if (f = t = new l(1), n = s = new l(0), e = new l(n), u = e.e = ru(d) - v.e - 1, a = u % mr, e.d[0] = Hr(10, a < 0 ? mr + a : a), r == null) r = u > 0 ? e : f;
    else {
      if (c = new l(r), !c.isInt() || c.lt(f)) throw Error(Pe + c);
      r = c.gt(e) ? u > 0 ? e : f : c;
    }
    for (yr = false, c = new l(re(d)), o = l.precision, l.precision = u = d.length * mr * 2; h = Rr(c, e, 0, 1, 1), i = t.plus(h.times(n)), i.cmp(r) != 1; ) t = n, n = i, i = f, f = s.plus(h.times(i)), s = i, i = e, e = c.minus(h.times(i)), c = i;
    return i = Rr(r.minus(t), n, 0, 1, 1), s = s.plus(i.times(f)), t = t.plus(i.times(n)), s.s = f.s = v.s, p = Rr(f, n, u, 1).minus(v).abs().cmp(Rr(s, t, u, 1).minus(v).abs()) < 1 ? [
      f,
      n
    ] : [
      s,
      t
    ], l.precision = o, yr = true, p;
  };
  Y.toHexadecimal = Y.toHex = function(r, e) {
    return yn(this, 16, r, e);
  };
  Y.toNearest = function(r, e) {
    var t = this, n = t.constructor;
    if (t = new n(t), r == null) {
      if (!t.d) return t;
      r = new n(1), e = n.rounding;
    } else {
      if (r = new n(r), e === void 0 ? e = n.rounding : ve(e, 0, 8), !t.d) return r.s ? t : r;
      if (!r.d) return r.s && (r.s = t.s), r;
    }
    return r.d[0] ? (yr = false, t = Rr(t, r, 0, e, 1).times(r), yr = true, pr(t)) : (r.s = t.s, t = r), t;
  };
  Y.toNumber = function() {
    return +this;
  };
  Y.toOctal = function(r, e) {
    return yn(this, 8, r, e);
  };
  Y.toPower = Y.pow = function(r) {
    var e, t, n, i, u, a, c = this, s = c.constructor, f = +(r = new s(r));
    if (!c.d || !r.d || !c.d[0] || !r.d[0]) return new s(Hr(+c, f));
    if (c = new s(c), c.eq(1)) return c;
    if (n = s.precision, u = s.rounding, r.eq(1)) return pr(c, n, u);
    if (e = ie(r.e / mr), e >= r.d.length - 1 && (t = f < 0 ? -f : f) <= uo) return i = eu(s, c, t, n), r.s < 0 ? new s(1).div(i) : pr(i, n, u);
    if (a = c.s, a < 0) {
      if (e < r.d.length - 1) return new s(NaN);
      if (r.d[e] & 1 || (a = 1), c.e == 0 && c.d[0] == 1 && c.d.length == 1) return c.s = a, c;
    }
    return t = Hr(+c, f), e = t == 0 || !isFinite(t) ? ie(f * (Math.log("0." + re(c.d)) / Math.LN10 + c.e + 1)) : new s(t + "").e, e > s.maxE + 1 || e < s.minE - 1 ? new s(e > 0 ? a / 0 : 0) : (yr = false, s.rounding = c.s = 1, t = Math.min(12, (e + "").length), i = sn(r.times(ze(c, n + t)), n), i.d && (i = pr(i, n + 5, 1), ft(i.d, n, u) && (e = n + 10, i = pr(sn(r.times(ze(c, e + t)), e), e + 5, 1), +re(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = pr(i, n + 1, 0)))), i.s = a, yr = true, s.rounding = u, pr(i, n, u));
  };
  Y.toPrecision = function(r, e) {
    var t, n = this, i = n.constructor;
    return r === void 0 ? t = be(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (ve(r, 1, Re), e === void 0 ? e = i.rounding : ve(e, 0, 8), n = pr(new i(n), r, e), t = be(n, r <= n.e || n.e <= i.toExpNeg, r)), n.isNeg() && !n.isZero() ? "-" + t : t;
  };
  Y.toSignificantDigits = Y.toSD = function(r, e) {
    var t = this, n = t.constructor;
    return r === void 0 ? (r = n.precision, e = n.rounding) : (ve(r, 1, Re), e === void 0 ? e = n.rounding : ve(e, 0, 8)), pr(new n(t), r, e);
  };
  Y.toString = function() {
    var r = this, e = r.constructor, t = be(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
    return r.isNeg() && !r.isZero() ? "-" + t : t;
  };
  Y.truncated = Y.trunc = function() {
    return pr(new this.constructor(this), this.e + 1, 1);
  };
  Y.valueOf = Y.toJSON = function() {
    var r = this, e = r.constructor, t = be(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
    return r.isNeg() ? "-" + t : t;
  };
  function re(r) {
    var e, t, n, i = r.length - 1, u = "", a = r[0];
    if (i > 0) {
      for (u += a, e = 1; e < i; e++) n = r[e] + "", t = mr - n.length, t && (u += Oe(t)), u += n;
      a = r[e], n = a + "", t = mr - n.length, t && (u += Oe(t));
    } else if (a === 0) return "0";
    for (; a % 10 === 0; ) a /= 10;
    return u + a;
  }
  function ve(r, e, t) {
    if (r !== ~~r || r < e || r > t) throw Error(Pe + r);
  }
  function ft(r, e, t, n) {
    var i, u, a, c;
    for (u = r[0]; u >= 10; u /= 10) --e;
    return --e < 0 ? (e += mr, i = 0) : (i = Math.ceil((e + 1) / mr), e %= mr), u = Hr(10, mr - e), c = r[i] % u | 0, n == null ? e < 3 ? (e == 0 ? c = c / 100 | 0 : e == 1 && (c = c / 10 | 0), a = t < 4 && c == 99999 || t > 3 && c == 49999 || c == 5e4 || c == 0) : a = (t < 4 && c + 1 == u || t > 3 && c + 1 == u / 2) && (r[i + 1] / u / 100 | 0) == Hr(10, e - 2) - 1 || (c == u / 2 || c == 0) && (r[i + 1] / u / 100 | 0) == 0 : e < 4 ? (e == 0 ? c = c / 1e3 | 0 : e == 1 ? c = c / 100 | 0 : e == 2 && (c = c / 10 | 0), a = (n || t < 4) && c == 9999 || !n && t > 3 && c == 4999) : a = ((n || t < 4) && c + 1 == u || !n && t > 3 && c + 1 == u / 2) && (r[i + 1] / u / 1e3 | 0) == Hr(10, e - 3) - 1, a;
  }
  function bt(r, e, t) {
    for (var n, i = [
      0
    ], u, a = 0, c = r.length; a < c; ) {
      for (u = i.length; u--; ) i[u] *= e;
      for (i[0] += un.indexOf(r.charAt(a++)), n = 0; n < i.length; n++) i[n] > t - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / t | 0, i[n] %= t);
    }
    return i.reverse();
  }
  function oo(r, e) {
    var t, n, i;
    if (e.isZero()) return e;
    n = e.d.length, n < 32 ? (t = Math.ceil(n / 3), i = (1 / Wt(4, t)).toString()) : (t = 16, i = "2.3283064365386962890625e-10"), r.precision += t, e = ke(r, 1, e.times(i), new r(1));
    for (var u = t; u--; ) {
      var a = e.times(e);
      e = a.times(a).minus(a).times(8).plus(1);
    }
    return r.precision -= t, e;
  }
  var Rr = /* @__PURE__ */ function() {
    function r(n, i, u) {
      var a, c = 0, s = n.length;
      for (n = n.slice(); s--; ) a = n[s] * i + c, n[s] = a % u | 0, c = a / u | 0;
      return c && n.unshift(c), n;
    }
    function e(n, i, u, a) {
      var c, s;
      if (u != a) s = u > a ? 1 : -1;
      else for (c = s = 0; c < u; c++) if (n[c] != i[c]) {
        s = n[c] > i[c] ? 1 : -1;
        break;
      }
      return s;
    }
    function t(n, i, u, a) {
      for (var c = 0; u--; ) n[u] -= c, c = n[u] < i[u] ? 1 : 0, n[u] = c * a + n[u] - i[u];
      for (; !n[0] && n.length > 1; ) n.shift();
    }
    return function(n, i, u, a, c, s) {
      var f, o, h, p, v, d, l, m, D, b, g, C, A, w, _, F, y, M, B, S, O = n.constructor, x = n.s == i.s ? 1 : -1, z = n.d, T = i.d;
      if (!z || !z[0] || !T || !T[0]) return new O(!n.s || !i.s || (z ? T && z[0] == T[0] : !T) ? NaN : z && z[0] == 0 || !T ? x * 0 : x / 0);
      for (s ? (v = 1, o = n.e - i.e) : (s = Ee, v = mr, o = ie(n.e / v) - ie(i.e / v)), B = T.length, y = z.length, D = new O(x), b = D.d = [], h = 0; T[h] == (z[h] || 0); h++) ;
      if (T[h] > (z[h] || 0) && o--, u == null ? (w = u = O.precision, a = O.rounding) : c ? w = u + (n.e - i.e) + 1 : w = u, w < 0) b.push(1), d = true;
      else {
        if (w = w / v + 2 | 0, h = 0, B == 1) {
          for (p = 0, T = T[0], w++; (h < y || p) && w--; h++) _ = p * s + (z[h] || 0), b[h] = _ / T | 0, p = _ % T | 0;
          d = p || h < y;
        } else {
          for (p = s / (T[0] + 1) | 0, p > 1 && (T = r(T, p, s), z = r(z, p, s), B = T.length, y = z.length), F = B, g = z.slice(0, B), C = g.length; C < B; ) g[C++] = 0;
          S = T.slice(), S.unshift(0), M = T[0], T[1] >= s / 2 && ++M;
          do
            p = 0, f = e(T, g, B, C), f < 0 ? (A = g[0], B != C && (A = A * s + (g[1] || 0)), p = A / M | 0, p > 1 ? (p >= s && (p = s - 1), l = r(T, p, s), m = l.length, C = g.length, f = e(l, g, m, C), f == 1 && (p--, t(l, B < m ? S : T, m, s))) : (p == 0 && (f = p = 1), l = T.slice()), m = l.length, m < C && l.unshift(0), t(g, l, C, s), f == -1 && (C = g.length, f = e(T, g, B, C), f < 1 && (p++, t(g, B < C ? S : T, C, s))), C = g.length) : f === 0 && (p++, g = [
              0
            ]), b[h++] = p, f && g[0] ? g[C++] = z[F] || 0 : (g = [
              z[F]
            ], C = 1);
          while ((F++ < y || g[0] !== void 0) && w--);
          d = g[0] !== void 0;
        }
        b[0] || b.shift();
      }
      if (v == 1) D.e = o, Xi = d;
      else {
        for (h = 1, p = b[0]; p >= 10; p /= 10) h++;
        D.e = h + o * v - 1, pr(D, c ? u + D.e + 1 : u, a, d);
      }
      return D;
    };
  }();
  function pr(r, e, t, n) {
    var i, u, a, c, s, f, o, h, p, v = r.constructor;
    r: if (e != null) {
      if (h = r.d, !h) return r;
      for (i = 1, c = h[0]; c >= 10; c /= 10) i++;
      if (u = e - i, u < 0) u += mr, a = e, o = h[p = 0], s = o / Hr(10, i - a - 1) % 10 | 0;
      else if (p = Math.ceil((u + 1) / mr), c = h.length, p >= c) if (n) {
        for (; c++ <= p; ) h.push(0);
        o = s = 0, i = 1, u %= mr, a = u - mr + 1;
      } else break r;
      else {
        for (o = c = h[p], i = 1; c >= 10; c /= 10) i++;
        u %= mr, a = u - mr + i, s = a < 0 ? 0 : o / Hr(10, i - a - 1) % 10 | 0;
      }
      if (n = n || e < 0 || h[p + 1] !== void 0 || (a < 0 ? o : o % Hr(10, i - a - 1)), f = t < 4 ? (s || n) && (t == 0 || t == (r.s < 0 ? 3 : 2)) : s > 5 || s == 5 && (t == 4 || n || t == 6 && (u > 0 ? a > 0 ? o / Hr(10, i - a) : 0 : h[p - 1]) % 10 & 1 || t == (r.s < 0 ? 8 : 7)), e < 1 || !h[0]) return h.length = 0, f ? (e -= r.e + 1, h[0] = Hr(10, (mr - e % mr) % mr), r.e = -e || 0) : h[0] = r.e = 0, r;
      if (u == 0 ? (h.length = p, c = 1, p--) : (h.length = p + 1, c = Hr(10, mr - u), h[p] = a > 0 ? (o / Hr(10, i - a) % Hr(10, a) | 0) * c : 0), f) for (; ; ) if (p == 0) {
        for (u = 1, a = h[0]; a >= 10; a /= 10) u++;
        for (a = h[0] += c, c = 1; a >= 10; a /= 10) c++;
        u != c && (r.e++, h[0] == Ee && (h[0] = 1));
        break;
      } else {
        if (h[p] += c, h[p] != Ee) break;
        h[p--] = 0, c = 1;
      }
      for (u = h.length; h[--u] === 0; ) h.pop();
    }
    return yr && (r.e > v.maxE ? (r.d = null, r.e = NaN) : r.e < v.minE && (r.e = 0, r.d = [
      0
    ])), r;
  }
  function be(r, e, t) {
    if (!r.isFinite()) return nu(r);
    var n, i = r.e, u = re(r.d), a = u.length;
    return e ? (t && (n = t - a) > 0 ? u = u.charAt(0) + "." + u.slice(1) + Oe(n) : a > 1 && (u = u.charAt(0) + "." + u.slice(1)), u = u + (r.e < 0 ? "e" : "e+") + r.e) : i < 0 ? (u = "0." + Oe(-i - 1) + u, t && (n = t - a) > 0 && (u += Oe(n))) : i >= a ? (u += Oe(i + 1 - a), t && (n = t - i - 1) > 0 && (u = u + "." + Oe(n))) : ((n = i + 1) < a && (u = u.slice(0, n) + "." + u.slice(n)), t && (n = t - a) > 0 && (i + 1 === a && (u += "."), u += Oe(n))), u;
  }
  function Zt(r, e) {
    var t = r[0];
    for (e *= mr; t >= 10; t /= 10) e++;
    return e;
  }
  function Nt(r, e, t) {
    if (e > ao) throw yr = true, t && (r.precision = t), Error(Hi);
    return pr(new r(Mt), e, 1, true);
  }
  function Ae(r, e, t) {
    if (e > on) throw Error(Hi);
    return pr(new r(St), e, t, true);
  }
  function ru(r) {
    var e = r.length - 1, t = e * mr + 1;
    if (e = r[e], e) {
      for (; e % 10 == 0; e /= 10) t--;
      for (e = r[0]; e >= 10; e /= 10) t++;
    }
    return t;
  }
  function Oe(r) {
    for (var e = ""; r--; ) e += "0";
    return e;
  }
  function eu(r, e, t, n) {
    var i, u = new r(1), a = Math.ceil(n / mr + 4);
    for (yr = false; ; ) {
      if (t % 2 && (u = u.times(e), Ln(u.d, a) && (i = true)), t = ie(t / 2), t === 0) {
        t = u.d.length - 1, i && u.d[t] === 0 && ++u.d[t];
        break;
      }
      e = e.times(e), Ln(e.d, a);
    }
    return yr = true, u;
  }
  function Un(r) {
    return r.d[r.d.length - 1] & 1;
  }
  function tu(r, e, t) {
    for (var n, i = new r(e[0]), u = 0; ++u < e.length; ) if (n = new r(e[u]), n.s) i[t](n) && (i = n);
    else {
      i = n;
      break;
    }
    return i;
  }
  function sn(r, e) {
    var t, n, i, u, a, c, s, f = 0, o = 0, h = 0, p = r.constructor, v = p.rounding, d = p.precision;
    if (!r.d || !r.d[0] || r.e > 17) return new p(r.d ? r.d[0] ? r.s < 0 ? 0 : 1 / 0 : 1 : r.s ? r.s < 0 ? 0 : r : NaN);
    for (e == null ? (yr = false, s = d) : s = e, c = new p(0.03125); r.e > -2; ) r = r.times(c), h += 5;
    for (n = Math.log(Hr(2, h)) / Math.LN10 * 2 + 5 | 0, s += n, t = u = a = new p(1), p.precision = s; ; ) {
      if (u = pr(u.times(r), s, 1), t = t.times(++o), c = a.plus(Rr(u, t, s, 1)), re(c.d).slice(0, s) === re(a.d).slice(0, s)) {
        for (i = h; i--; ) a = pr(a.times(a), s, 1);
        if (e == null) if (f < 3 && ft(a.d, s - n, v, f)) p.precision = s += 10, t = u = c = new p(1), o = 0, f++;
        else return pr(a, p.precision = d, v, yr = true);
        else return p.precision = d, a;
      }
      a = c;
    }
  }
  function ze(r, e) {
    var t, n, i, u, a, c, s, f, o, h, p, v = 1, d = 10, l = r, m = l.d, D = l.constructor, b = D.rounding, g = D.precision;
    if (l.s < 0 || !m || !m[0] || !l.e && m[0] == 1 && m.length == 1) return new D(m && !m[0] ? -1 / 0 : l.s != 1 ? NaN : m ? 0 : l);
    if (e == null ? (yr = false, o = g) : o = e, D.precision = o += d, t = re(m), n = t.charAt(0), Math.abs(u = l.e) < 15e14) {
      for (; n < 7 && n != 1 || n == 1 && t.charAt(1) > 3; ) l = l.times(r), t = re(l.d), n = t.charAt(0), v++;
      u = l.e, n > 1 ? (l = new D("0." + t), u++) : l = new D(n + "." + t.slice(1));
    } else return f = Nt(D, o + 2, g).times(u + ""), l = ze(new D(n + "." + t.slice(1)), o - d).plus(f), D.precision = g, e == null ? pr(l, g, b, yr = true) : l;
    for (h = l, s = a = l = Rr(l.minus(1), l.plus(1), o, 1), p = pr(l.times(l), o, 1), i = 3; ; ) {
      if (a = pr(a.times(p), o, 1), f = s.plus(Rr(a, new D(i), o, 1)), re(f.d).slice(0, o) === re(s.d).slice(0, o)) if (s = s.times(2), u !== 0 && (s = s.plus(Nt(D, o + 2, g).times(u + ""))), s = Rr(s, new D(v), o, 1), e == null) if (ft(s.d, o - d, b, c)) D.precision = o += d, f = a = l = Rr(h.minus(1), h.plus(1), o, 1), p = pr(l.times(l), o, 1), i = c = 1;
      else return pr(s, D.precision = g, b, yr = true);
      else return D.precision = g, s;
      s = f, i += 2;
    }
  }
  function nu(r) {
    return String(r.s * r.s / 0);
  }
  function fn(r, e) {
    var t, n, i;
    for ((t = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (t < 0 && (t = n), t += +e.slice(n + 1), e = e.substring(0, n)) : t < 0 && (t = e.length), n = 0; e.charCodeAt(n) === 48; n++) ;
    for (i = e.length; e.charCodeAt(i - 1) === 48; --i) ;
    if (e = e.slice(n, i), e) {
      if (i -= n, r.e = t = t - n - 1, r.d = [], n = (t + 1) % mr, t < 0 && (n += mr), n < i) {
        for (n && r.d.push(+e.slice(0, n)), i -= mr; n < i; ) r.d.push(+e.slice(n, n += mr));
        e = e.slice(n), n = mr - e.length;
      } else n -= i;
      for (; n--; ) e += "0";
      r.d.push(+e), yr && (r.e > r.constructor.maxE ? (r.d = null, r.e = NaN) : r.e < r.constructor.minE && (r.e = 0, r.d = [
        0
      ]));
    } else r.e = 0, r.d = [
      0
    ];
    return r;
  }
  function so(r, e) {
    var t, n, i, u, a, c, s, f, o;
    if (e.indexOf("_") > -1) {
      if (e = e.replace(/(\d)_(?=\d)/g, "$1"), ji.test(e)) return fn(r, e);
    } else if (e === "Infinity" || e === "NaN") return +e || (r.s = NaN), r.e = NaN, r.d = null, r;
    if (no.test(e)) t = 16, e = e.toLowerCase();
    else if (to.test(e)) t = 2;
    else if (io.test(e)) t = 8;
    else throw Error(Pe + e);
    for (u = e.search(/p/i), u > 0 ? (s = +e.slice(u + 1), e = e.substring(2, u)) : e = e.slice(2), u = e.indexOf("."), a = u >= 0, n = r.constructor, a && (e = e.replace(".", ""), c = e.length, u = c - u, i = eu(n, new n(t), u, u * 2)), f = bt(e, t, Ee), o = f.length - 1, u = o; f[u] === 0; --u) f.pop();
    return u < 0 ? new n(r.s * 0) : (r.e = Zt(f, o), r.d = f, yr = false, a && (r = Rr(r, i, c * 4)), s && (r = r.times(Math.abs(s) < 54 ? Hr(2, s) : je.pow(2, s))), yr = true, r);
  }
  function fo(r, e) {
    var t, n = e.d.length;
    if (n < 3) return e.isZero() ? e : ke(r, 2, e, e);
    t = 1.4 * Math.sqrt(n), t = t > 16 ? 16 : t | 0, e = e.times(1 / Wt(5, t)), e = ke(r, 2, e, e);
    for (var i, u = new r(5), a = new r(16), c = new r(20); t--; ) i = e.times(e), e = e.times(u.plus(i.times(a.times(i).minus(c))));
    return e;
  }
  function ke(r, e, t, n, i) {
    var u, a, c, s, f = r.precision, o = Math.ceil(f / mr);
    for (yr = false, s = t.times(t), c = new r(n); ; ) {
      if (a = Rr(c.times(s), new r(e++ * e++), f, 1), c = i ? n.plus(a) : n.minus(a), n = Rr(a.times(s), new r(e++ * e++), f, 1), a = c.plus(n), a.d[o] !== void 0) {
        for (u = o; a.d[u] === c.d[u] && u--; ) ;
        if (u == -1) break;
      }
      u = c, c = n, n = a, a = u;
    }
    return yr = true, a.d.length = o + 1, a;
  }
  function Wt(r, e) {
    for (var t = r; --e; ) t *= r;
    return t;
  }
  function iu(r, e) {
    var t, n = e.s < 0, i = Ae(r, r.precision, 1), u = i.times(0.5);
    if (e = e.abs(), e.lte(u)) return Me = n ? 4 : 1, e;
    if (t = e.divToInt(i), t.isZero()) Me = n ? 3 : 2;
    else {
      if (e = e.minus(t.times(i)), e.lte(u)) return Me = Un(t) ? n ? 2 : 3 : n ? 4 : 1, e;
      Me = Un(t) ? n ? 1 : 4 : n ? 3 : 2;
    }
    return e.minus(i).abs();
  }
  function yn(r, e, t, n) {
    var i, u, a, c, s, f, o, h, p, v = r.constructor, d = t !== void 0;
    if (d ? (ve(t, 1, Re), n === void 0 ? n = v.rounding : ve(n, 0, 8)) : (t = v.precision, n = v.rounding), !r.isFinite()) o = nu(r);
    else {
      for (o = be(r), a = o.indexOf("."), d ? (i = 2, e == 16 ? t = t * 4 - 3 : e == 8 && (t = t * 3 - 2)) : i = e, a >= 0 && (o = o.replace(".", ""), p = new v(1), p.e = o.length - a, p.d = bt(be(p), 10, i), p.e = p.d.length), h = bt(o, 10, i), u = s = h.length; h[--s] == 0; ) h.pop();
      if (!h[0]) o = d ? "0p+0" : "0";
      else {
        if (a < 0 ? u-- : (r = new v(r), r.d = h, r.e = u, r = Rr(r, p, t, n, 0, i), h = r.d, u = r.e, f = Xi), a = h[t], c = i / 2, f = f || h[t + 1] !== void 0, f = n < 4 ? (a !== void 0 || f) && (n === 0 || n === (r.s < 0 ? 3 : 2)) : a > c || a === c && (n === 4 || f || n === 6 && h[t - 1] & 1 || n === (r.s < 0 ? 8 : 7)), h.length = t, f) for (; ++h[--t] > i - 1; ) h[t] = 0, t || (++u, h.unshift(1));
        for (s = h.length; !h[s - 1]; --s) ;
        for (a = 0, o = ""; a < s; a++) o += un.charAt(h[a]);
        if (d) {
          if (s > 1) if (e == 16 || e == 8) {
            for (a = e == 16 ? 4 : 3, --s; s % a; s++) o += "0";
            for (h = bt(o, i, e), s = h.length; !h[s - 1]; --s) ;
            for (a = 1, o = "1."; a < s; a++) o += un.charAt(h[a]);
          } else o = o.charAt(0) + "." + o.slice(1);
          o = o + (u < 0 ? "p" : "p+") + u;
        } else if (u < 0) {
          for (; ++u; ) o = "0" + o;
          o = "0." + o;
        } else if (++u > s) for (u -= s; u--; ) o += "0";
        else u < s && (o = o.slice(0, u) + "." + o.slice(u));
      }
      o = (e == 16 ? "0x" : e == 2 ? "0b" : e == 8 ? "0o" : "") + o;
    }
    return r.s < 0 ? "-" + o : o;
  }
  function Ln(r, e) {
    if (r.length > e) return r.length = e, true;
  }
  function co(r) {
    return new this(r).abs();
  }
  function lo(r) {
    return new this(r).acos();
  }
  function ho(r) {
    return new this(r).acosh();
  }
  function vo(r, e) {
    return new this(r).plus(e);
  }
  function po(r) {
    return new this(r).asin();
  }
  function mo(r) {
    return new this(r).asinh();
  }
  function Do(r) {
    return new this(r).atan();
  }
  function go(r) {
    return new this(r).atanh();
  }
  function yo(r, e) {
    r = new this(r), e = new this(e);
    var t, n = this.precision, i = this.rounding, u = n + 4;
    return !r.s || !e.s ? t = new this(NaN) : !r.d && !e.d ? (t = Ae(this, u, 1).times(e.s > 0 ? 0.25 : 0.75), t.s = r.s) : !e.d || r.isZero() ? (t = e.s < 0 ? Ae(this, n, i) : new this(0), t.s = r.s) : !r.d || e.isZero() ? (t = Ae(this, u, 1).times(0.5), t.s = r.s) : e.s < 0 ? (this.precision = u, this.rounding = 1, t = this.atan(Rr(r, e, u, 1)), e = Ae(this, u, 1), this.precision = n, this.rounding = i, t = r.s < 0 ? t.minus(e) : t.plus(e)) : t = this.atan(Rr(r, e, u, 1)), t;
  }
  function wo(r) {
    return new this(r).cbrt();
  }
  function Ao(r) {
    return pr(r = new this(r), r.e + 1, 2);
  }
  function Fo(r, e, t) {
    return new this(r).clamp(e, t);
  }
  function Eo(r) {
    if (!r || typeof r != "object") throw Error(Lt + "Object expected");
    var e, t, n, i = r.defaults === true, u = [
      "precision",
      1,
      Re,
      "rounding",
      0,
      8,
      "toExpNeg",
      -9e15,
      0,
      "toExpPos",
      0,
      nn,
      "maxE",
      0,
      nn,
      "minE",
      -9e15,
      0,
      "modulo",
      0,
      9
    ];
    for (e = 0; e < u.length; e += 3) if (t = u[e], i && (this[t] = an[t]), (n = r[t]) !== void 0) if (ie(n) === n && n >= u[e + 1] && n <= u[e + 2]) this[t] = n;
    else throw Error(Pe + t + ": " + n);
    if (t = "crypto", i && (this[t] = an[t]), (n = r[t]) !== void 0) if (n === true || n === false || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[t] = true;
    else throw Error(Ki);
    else this[t] = false;
    else throw Error(Pe + t + ": " + n);
    return this;
  }
  function bo(r) {
    return new this(r).cos();
  }
  function Co(r) {
    return new this(r).cosh();
  }
  function uu(r) {
    var e, t, n;
    function i(u) {
      var a, c, s, f = this;
      if (!(f instanceof i)) return new i(u);
      if (f.constructor = i, Zn(u)) {
        f.s = u.s, yr ? !u.d || u.e > i.maxE ? (f.e = NaN, f.d = null) : u.e < i.minE ? (f.e = 0, f.d = [
          0
        ]) : (f.e = u.e, f.d = u.d.slice()) : (f.e = u.e, f.d = u.d ? u.d.slice() : u.d);
        return;
      }
      if (s = typeof u, s === "number") {
        if (u === 0) {
          f.s = 1 / u < 0 ? -1 : 1, f.e = 0, f.d = [
            0
          ];
          return;
        }
        if (u < 0 ? (u = -u, f.s = -1) : f.s = 1, u === ~~u && u < 1e7) {
          for (a = 0, c = u; c >= 10; c /= 10) a++;
          yr ? a > i.maxE ? (f.e = NaN, f.d = null) : a < i.minE ? (f.e = 0, f.d = [
            0
          ]) : (f.e = a, f.d = [
            u
          ]) : (f.e = a, f.d = [
            u
          ]);
          return;
        } else if (u * 0 !== 0) {
          u || (f.s = NaN), f.e = NaN, f.d = null;
          return;
        }
        return fn(f, u.toString());
      } else if (s !== "string") throw Error(Pe + u);
      return (c = u.charCodeAt(0)) === 45 ? (u = u.slice(1), f.s = -1) : (c === 43 && (u = u.slice(1)), f.s = 1), ji.test(u) ? fn(f, u) : so(f, u);
    }
    if (i.prototype = Y, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = Eo, i.clone = uu, i.isDecimal = Zn, i.abs = co, i.acos = lo, i.acosh = ho, i.add = vo, i.asin = po, i.asinh = mo, i.atan = Do, i.atanh = go, i.atan2 = yo, i.cbrt = wo, i.ceil = Ao, i.clamp = Fo, i.cos = bo, i.cosh = Co, i.div = _o, i.exp = Bo, i.floor = Mo, i.hypot = So, i.ln = No, i.log = xo, i.log10 = Io, i.log2 = To, i.max = Oo, i.min = zo, i.mod = $o, i.mul = Po, i.pow = Ro, i.random = qo, i.round = Uo, i.sign = Lo, i.sin = Zo, i.sinh = Wo, i.sqrt = Vo, i.sub = Yo, i.sum = Go, i.tan = Jo, i.tanh = Qo, i.trunc = Xo, r === void 0 && (r = {}), r && r.defaults !== true) for (n = [
      "precision",
      "rounding",
      "toExpNeg",
      "toExpPos",
      "maxE",
      "minE",
      "modulo",
      "crypto"
    ], e = 0; e < n.length; ) r.hasOwnProperty(t = n[e++]) || (r[t] = this[t]);
    return i.config(r), i;
  }
  function _o(r, e) {
    return new this(r).div(e);
  }
  function Bo(r) {
    return new this(r).exp();
  }
  function Mo(r) {
    return pr(r = new this(r), r.e + 1, 3);
  }
  function So() {
    var r, e, t = new this(0);
    for (yr = false, r = 0; r < arguments.length; ) if (e = new this(arguments[r++]), e.d) t.d && (t = t.plus(e.times(e)));
    else {
      if (e.s) return yr = true, new this(1 / 0);
      t = e;
    }
    return yr = true, t.sqrt();
  }
  function Zn(r) {
    return r instanceof je || r && r.toStringTag === ki || false;
  }
  function No(r) {
    return new this(r).ln();
  }
  function xo(r, e) {
    return new this(r).log(e);
  }
  function To(r) {
    return new this(r).log(2);
  }
  function Io(r) {
    return new this(r).log(10);
  }
  function Oo() {
    return tu(this, arguments, "lt");
  }
  function zo() {
    return tu(this, arguments, "gt");
  }
  function $o(r, e) {
    return new this(r).mod(e);
  }
  function Po(r, e) {
    return new this(r).mul(e);
  }
  function Ro(r, e) {
    return new this(r).pow(e);
  }
  function qo(r) {
    var e, t, n, i, u = 0, a = new this(1), c = [];
    if (r === void 0 ? r = this.precision : ve(r, 1, Re), n = Math.ceil(r / mr), this.crypto) if (crypto.getRandomValues) for (e = crypto.getRandomValues(new Uint32Array(n)); u < n; ) i = e[u], i >= 429e7 ? e[u] = crypto.getRandomValues(new Uint32Array(1))[0] : c[u++] = i % 1e7;
    else if (crypto.randomBytes) {
      for (e = crypto.randomBytes(n *= 4); u < n; ) i = e[u] + (e[u + 1] << 8) + (e[u + 2] << 16) + ((e[u + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(e, u) : (c.push(i % 1e7), u += 4);
      u = n / 4;
    } else throw Error(Ki);
    else for (; u < n; ) c[u++] = Math.random() * 1e7 | 0;
    for (n = c[--u], r %= mr, n && r && (i = Hr(10, mr - r), c[u] = (n / i | 0) * i); c[u] === 0; u--) c.pop();
    if (u < 0) t = 0, c = [
      0
    ];
    else {
      for (t = -1; c[0] === 0; t -= mr) c.shift();
      for (n = 1, i = c[0]; i >= 10; i /= 10) n++;
      n < mr && (t -= mr - n);
    }
    return a.e = t, a.d = c, a;
  }
  function Uo(r) {
    return pr(r = new this(r), r.e + 1, this.rounding);
  }
  function Lo(r) {
    return r = new this(r), r.d ? r.d[0] ? r.s : 0 * r.s : r.s || NaN;
  }
  function Zo(r) {
    return new this(r).sin();
  }
  function Wo(r) {
    return new this(r).sinh();
  }
  function Vo(r) {
    return new this(r).sqrt();
  }
  function Yo(r, e) {
    return new this(r).sub(e);
  }
  function Go() {
    var r = 0, e = arguments, t = new this(e[r]);
    for (yr = false; t.s && ++r < e.length; ) t = t.plus(e[r]);
    return yr = true, pr(t, this.precision, this.rounding);
  }
  function Jo(r) {
    return new this(r).tan();
  }
  function Qo(r) {
    return new this(r).tanh();
  }
  function Xo(r) {
    return pr(r = new this(r), r.e + 1, 1);
  }
  Y[Symbol.for("nodejs.util.inspect.custom")] = Y.toString;
  Y[Symbol.toStringTag] = "Decimal";
  je = Y.constructor = uu(an);
  Mt = new je(Mt);
  St = new je(St);
  var Ho = "BigNumber", Ko = [
    "?on",
    "config"
  ], ko = ir(Ho, Ko, (r) => {
    var { on: e, config: t } = r, n = je.clone({
      precision: t.precision,
      modulo: je.EUCLID
    });
    return n.prototype = Object.create(n.prototype), n.prototype.type = "BigNumber", n.prototype.isBigNumber = true, n.prototype.toJSON = function() {
      return {
        mathjs: "BigNumber",
        value: this.toString()
      };
    }, n.fromJSON = function(i) {
      return new n(i.value);
    }, e && e("config", function(i, u) {
      i.precision !== u.precision && n.config({
        precision: i.precision
      });
    }), n;
  }, {
    isClass: true
  });
  const ne = Math.cosh || function(r) {
    return Math.abs(r) < 1e-9 ? 1 - r : (Math.exp(r) + Math.exp(-r)) * 0.5;
  }, De = Math.sinh || function(r) {
    return Math.abs(r) < 1e-9 ? r : (Math.exp(r) - Math.exp(-r)) * 0.5;
  }, jo = function(r) {
    const e = Math.PI / 4;
    if (-e > r || r > e) return Math.cos(r) - 1;
    const t = r * r;
    return t * (t * (t * (t * (t * (t * (t * (t / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
  }, kt = function(r, e) {
    return r = Math.abs(r), e = Math.abs(e), r < e && ([r, e] = [
      e,
      r
    ]), r < 1e8 ? Math.sqrt(r * r + e * e) : (e /= r, r * Math.sqrt(1 + e * e));
  }, Ge = function() {
    throw SyntaxError("Invalid Param");
  };
  function jt(r, e) {
    const t = Math.abs(r), n = Math.abs(e);
    return r === 0 ? Math.log(n) : e === 0 ? Math.log(t) : t < 3e3 && n < 3e3 ? Math.log(r * r + e * e) * 0.5 : (r = r * 0.5, e = e * 0.5, 0.5 * Math.log(r * r + e * e) + Math.LN2);
  }
  const rs = {
    re: 0,
    im: 0
  }, qe = function(r, e) {
    const t = rs;
    if (r == null) t.re = t.im = 0;
    else if (e !== void 0) t.re = r, t.im = e;
    else switch (typeof r) {
      case "object":
        if ("im" in r && "re" in r) t.re = r.re, t.im = r.im;
        else if ("abs" in r && "arg" in r) {
          if (!isFinite(r.abs) && isFinite(r.arg)) return P.INFINITY;
          t.re = r.abs * Math.cos(r.arg), t.im = r.abs * Math.sin(r.arg);
        } else if ("r" in r && "phi" in r) {
          if (!isFinite(r.r) && isFinite(r.phi)) return P.INFINITY;
          t.re = r.r * Math.cos(r.phi), t.im = r.r * Math.sin(r.phi);
        } else r.length === 2 ? (t.re = r[0], t.im = r[1]) : Ge();
        break;
      case "string":
        t.im = t.re = 0;
        const n = r.replace(/_/g, "").match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
        let i = 1, u = 0;
        n === null && Ge();
        for (let a = 0; a < n.length; a++) {
          const c = n[a];
          c === " " || c === "	" || c === `
` || (c === "+" ? i++ : c === "-" ? u++ : c === "i" || c === "I" ? (i + u === 0 && Ge(), n[a + 1] !== " " && !isNaN(n[a + 1]) ? (t.im += parseFloat((u % 2 ? "-" : "") + n[a + 1]), a++) : t.im += parseFloat((u % 2 ? "-" : "") + "1"), i = u = 0) : ((i + u === 0 || isNaN(c)) && Ge(), n[a + 1] === "i" || n[a + 1] === "I" ? (t.im += parseFloat((u % 2 ? "-" : "") + c), a++) : t.re += parseFloat((u % 2 ? "-" : "") + c), i = u = 0));
        }
        i + u > 0 && Ge();
        break;
      case "number":
        t.im = 0, t.re = r;
        break;
      default:
        Ge();
    }
    return isNaN(t.re) || isNaN(t.im), t;
  };
  P = function(r, e) {
    if (!(this instanceof P)) return new P(r, e);
    const t = qe(r, e);
    this.re = t.re, this.im = t.im;
  };
  P.prototype = {
    re: 0,
    im: 0,
    sign: function() {
      const r = kt(this.re, this.im);
      return new P(this.re / r, this.im / r);
    },
    add: function(r, e) {
      const t = qe(r, e), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im));
      return n || i ? n && i ? P.NAN : P.INFINITY : new P(this.re + t.re, this.im + t.im);
    },
    sub: function(r, e) {
      const t = qe(r, e), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im));
      return n || i ? n && i ? P.NAN : P.INFINITY : new P(this.re - t.re, this.im - t.im);
    },
    mul: function(r, e) {
      const t = qe(r, e), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im)), u = this.re === 0 && this.im === 0, a = t.re === 0 && t.im === 0;
      return n && a || i && u ? P.NAN : n || i ? P.INFINITY : t.im === 0 && this.im === 0 ? new P(this.re * t.re, 0) : new P(this.re * t.re - this.im * t.im, this.re * t.im + this.im * t.re);
    },
    div: function(r, e) {
      const t = qe(r, e), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im)), u = this.re === 0 && this.im === 0, a = t.re === 0 && t.im === 0;
      if (u && a || n && i) return P.NAN;
      if (a || n) return P.INFINITY;
      if (u || i) return P.ZERO;
      if (t.im === 0) return new P(this.re / t.re, this.im / t.re);
      if (Math.abs(t.re) < Math.abs(t.im)) {
        const c = t.re / t.im, s = t.re * c + t.im;
        return new P((this.re * c + this.im) / s, (this.im * c - this.re) / s);
      } else {
        const c = t.im / t.re, s = t.im * c + t.re;
        return new P((this.re + this.im * c) / s, (this.im - this.re * c) / s);
      }
    },
    pow: function(r, e) {
      const t = qe(r, e), n = this.re === 0 && this.im === 0;
      if (t.re === 0 && t.im === 0) return P.ONE;
      if (t.im === 0) {
        if (this.im === 0 && this.re > 0) return new P(Math.pow(this.re, t.re), 0);
        if (this.re === 0) switch ((t.re % 4 + 4) % 4) {
          case 0:
            return new P(Math.pow(this.im, t.re), 0);
          case 1:
            return new P(0, Math.pow(this.im, t.re));
          case 2:
            return new P(-Math.pow(this.im, t.re), 0);
          case 3:
            return new P(0, -Math.pow(this.im, t.re));
        }
      }
      if (n && t.re > 0) return P.ZERO;
      const u = Math.atan2(this.im, this.re), a = jt(this.re, this.im);
      let c = Math.exp(t.re * a - t.im * u), s = t.im * a + t.re * u;
      return new P(c * Math.cos(s), c * Math.sin(s));
    },
    sqrt: function() {
      const r = this.re, e = this.im;
      if (e === 0) return r >= 0 ? new P(Math.sqrt(r), 0) : new P(0, Math.sqrt(-r));
      const t = kt(r, e);
      let n = Math.sqrt(0.5 * (t + Math.abs(r))), i = Math.abs(e) / (2 * n);
      return r >= 0 ? new P(n, e < 0 ? -i : i) : new P(i, e < 0 ? -n : n);
    },
    exp: function() {
      const r = Math.exp(this.re);
      return this.im === 0 ? new P(r, 0) : new P(r * Math.cos(this.im), r * Math.sin(this.im));
    },
    expm1: function() {
      const r = this.re, e = this.im;
      return new P(Math.expm1(r) * Math.cos(e) + jo(e), Math.exp(r) * Math.sin(e));
    },
    log: function() {
      const r = this.re, e = this.im;
      return e === 0 && r > 0 ? new P(Math.log(r), 0) : new P(jt(r, e), Math.atan2(e, r));
    },
    abs: function() {
      return kt(this.re, this.im);
    },
    arg: function() {
      return Math.atan2(this.im, this.re);
    },
    sin: function() {
      const r = this.re, e = this.im;
      return new P(Math.sin(r) * ne(e), Math.cos(r) * De(e));
    },
    cos: function() {
      const r = this.re, e = this.im;
      return new P(Math.cos(r) * ne(e), -Math.sin(r) * De(e));
    },
    tan: function() {
      const r = 2 * this.re, e = 2 * this.im, t = Math.cos(r) + ne(e);
      return new P(Math.sin(r) / t, De(e) / t);
    },
    cot: function() {
      const r = 2 * this.re, e = 2 * this.im, t = Math.cos(r) - ne(e);
      return new P(-Math.sin(r) / t, De(e) / t);
    },
    sec: function() {
      const r = this.re, e = this.im, t = 0.5 * ne(2 * e) + 0.5 * Math.cos(2 * r);
      return new P(Math.cos(r) * ne(e) / t, Math.sin(r) * De(e) / t);
    },
    csc: function() {
      const r = this.re, e = this.im, t = 0.5 * ne(2 * e) - 0.5 * Math.cos(2 * r);
      return new P(Math.sin(r) * ne(e) / t, -Math.cos(r) * De(e) / t);
    },
    asin: function() {
      const r = this.re, e = this.im, t = new P(e * e - r * r + 1, -2 * r * e).sqrt(), n = new P(t.re - e, t.im + r).log();
      return new P(n.im, -n.re);
    },
    acos: function() {
      const r = this.re, e = this.im, t = new P(e * e - r * r + 1, -2 * r * e).sqrt(), n = new P(t.re - e, t.im + r).log();
      return new P(Math.PI / 2 - n.im, n.re);
    },
    atan: function() {
      const r = this.re, e = this.im;
      if (r === 0) {
        if (e === 1) return new P(0, 1 / 0);
        if (e === -1) return new P(0, -1 / 0);
      }
      const t = r * r + (1 - e) * (1 - e), n = new P((1 - e * e - r * r) / t, -2 * r / t).log();
      return new P(-0.5 * n.im, 0.5 * n.re);
    },
    acot: function() {
      const r = this.re, e = this.im;
      if (e === 0) return new P(Math.atan2(1, r), 0);
      const t = r * r + e * e;
      return t !== 0 ? new P(r / t, -e / t).atan() : new P(r !== 0 ? r / 0 : 0, e !== 0 ? -e / 0 : 0).atan();
    },
    asec: function() {
      const r = this.re, e = this.im;
      if (r === 0 && e === 0) return new P(0, 1 / 0);
      const t = r * r + e * e;
      return t !== 0 ? new P(r / t, -e / t).acos() : new P(r !== 0 ? r / 0 : 0, e !== 0 ? -e / 0 : 0).acos();
    },
    acsc: function() {
      const r = this.re, e = this.im;
      if (r === 0 && e === 0) return new P(Math.PI / 2, 1 / 0);
      const t = r * r + e * e;
      return t !== 0 ? new P(r / t, -e / t).asin() : new P(r !== 0 ? r / 0 : 0, e !== 0 ? -e / 0 : 0).asin();
    },
    sinh: function() {
      const r = this.re, e = this.im;
      return new P(De(r) * Math.cos(e), ne(r) * Math.sin(e));
    },
    cosh: function() {
      const r = this.re, e = this.im;
      return new P(ne(r) * Math.cos(e), De(r) * Math.sin(e));
    },
    tanh: function() {
      const r = 2 * this.re, e = 2 * this.im, t = ne(r) + Math.cos(e);
      return new P(De(r) / t, Math.sin(e) / t);
    },
    coth: function() {
      const r = 2 * this.re, e = 2 * this.im, t = ne(r) - Math.cos(e);
      return new P(De(r) / t, -Math.sin(e) / t);
    },
    csch: function() {
      const r = this.re, e = this.im, t = Math.cos(2 * e) - ne(2 * r);
      return new P(-2 * De(r) * Math.cos(e) / t, 2 * ne(r) * Math.sin(e) / t);
    },
    sech: function() {
      const r = this.re, e = this.im, t = Math.cos(2 * e) + ne(2 * r);
      return new P(2 * ne(r) * Math.cos(e) / t, -2 * De(r) * Math.sin(e) / t);
    },
    asinh: function() {
      let r = this.im;
      this.im = -this.re, this.re = r;
      const e = this.asin();
      return this.re = -this.im, this.im = r, r = e.re, e.re = -e.im, e.im = r, e;
    },
    acosh: function() {
      const r = this.acos();
      if (r.im <= 0) {
        const e = r.re;
        r.re = -r.im, r.im = e;
      } else {
        const e = r.im;
        r.im = -r.re, r.re = e;
      }
      return r;
    },
    atanh: function() {
      const r = this.re, e = this.im, t = r > 1 && e === 0, n = 1 - r, i = 1 + r, u = n * n + e * e, a = u !== 0 ? new P((i * n - e * e) / u, (e * n + i * e) / u) : new P(r !== -1 ? r / 0 : 0, e !== 0 ? e / 0 : 0), c = a.re;
      return a.re = jt(a.re, a.im) / 2, a.im = Math.atan2(a.im, c) / 2, t && (a.im = -a.im), a;
    },
    acoth: function() {
      const r = this.re, e = this.im;
      if (r === 0 && e === 0) return new P(0, Math.PI / 2);
      const t = r * r + e * e;
      return t !== 0 ? new P(r / t, -e / t).atanh() : new P(r !== 0 ? r / 0 : 0, e !== 0 ? -e / 0 : 0).atanh();
    },
    acsch: function() {
      const r = this.re, e = this.im;
      if (e === 0) return new P(r !== 0 ? Math.log(r + Math.sqrt(r * r + 1)) : 1 / 0, 0);
      const t = r * r + e * e;
      return t !== 0 ? new P(r / t, -e / t).asinh() : new P(r !== 0 ? r / 0 : 0, e !== 0 ? -e / 0 : 0).asinh();
    },
    asech: function() {
      const r = this.re, e = this.im;
      if (this.isZero()) return P.INFINITY;
      const t = r * r + e * e;
      return t !== 0 ? new P(r / t, -e / t).acosh() : new P(r !== 0 ? r / 0 : 0, e !== 0 ? -e / 0 : 0).acosh();
    },
    inverse: function() {
      if (this.isZero()) return P.INFINITY;
      if (this.isInfinite()) return P.ZERO;
      const r = this.re, e = this.im, t = r * r + e * e;
      return new P(r / t, -e / t);
    },
    conjugate: function() {
      return new P(this.re, -this.im);
    },
    neg: function() {
      return new P(-this.re, -this.im);
    },
    ceil: function(r) {
      return r = Math.pow(10, r || 0), new P(Math.ceil(this.re * r) / r, Math.ceil(this.im * r) / r);
    },
    floor: function(r) {
      return r = Math.pow(10, r || 0), new P(Math.floor(this.re * r) / r, Math.floor(this.im * r) / r);
    },
    round: function(r) {
      return r = Math.pow(10, r || 0), new P(Math.round(this.re * r) / r, Math.round(this.im * r) / r);
    },
    equals: function(r, e) {
      const t = qe(r, e);
      return Math.abs(t.re - this.re) <= P.EPSILON && Math.abs(t.im - this.im) <= P.EPSILON;
    },
    clone: function() {
      return new P(this.re, this.im);
    },
    toString: function() {
      let r = this.re, e = this.im, t = "";
      return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(r) < P.EPSILON && (r = 0), Math.abs(e) < P.EPSILON && (e = 0), e === 0 ? t + r : (r !== 0 ? (t += r, t += " ", e < 0 ? (e = -e, t += "-") : t += "+", t += " ") : e < 0 && (e = -e, t += "-"), e !== 1 && (t += e), t + "i"));
    },
    toVector: function() {
      return [
        this.re,
        this.im
      ];
    },
    valueOf: function() {
      return this.im === 0 ? this.re : null;
    },
    isNaN: function() {
      return isNaN(this.re) || isNaN(this.im);
    },
    isZero: function() {
      return this.im === 0 && this.re === 0;
    },
    isFinite: function() {
      return isFinite(this.re) && isFinite(this.im);
    },
    isInfinite: function() {
      return !this.isFinite();
    }
  };
  P.ZERO = new P(0, 0);
  P.ONE = new P(1, 0);
  P.I = new P(0, 1);
  P.PI = new P(Math.PI, 0);
  P.E = new P(Math.E, 0);
  P.INFINITY = new P(1 / 0, 1 / 0);
  P.NAN = new P(NaN, NaN);
  P.EPSILON = 1e-15;
  var es = "Complex", ts = [], ns = ir(es, ts, () => (Object.defineProperty(P, "name", {
    value: "Complex"
  }), P.prototype.constructor = P, P.prototype.type = "Complex", P.prototype.isComplex = true, P.prototype.toJSON = function() {
    return {
      mathjs: "Complex",
      re: this.re,
      im: this.im
    };
  }, P.prototype.toPolar = function() {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  }, P.prototype.format = function(r) {
    var e = "", t = this.im, n = this.re, i = tn(this.re, r), u = tn(this.im, r), a = Pr(r) ? r : r ? r.precision : null;
    if (a !== null) {
      var c = Math.pow(10, -a);
      Math.abs(n / t) < c && (n = 0), Math.abs(t / n) < c && (t = 0);
    }
    return t === 0 ? e = i : n === 0 ? t === 1 ? e = "i" : t === -1 ? e = "-i" : e = u + "i" : t < 0 ? t === -1 ? e = i + " - i" : e = i + " - " + u.substring(1) + "i" : t === 1 ? e = i + " + i" : e = i + " + " + u + "i", e;
  }, P.fromPolar = function(r) {
    switch (arguments.length) {
      case 1: {
        var e = arguments[0];
        if (typeof e == "object") return P(e);
        throw new TypeError("Input has to be an object with r and phi keys.");
      }
      case 2: {
        var t = arguments[0], n = arguments[1];
        if (Pr(t)) {
          if (Ui(n) && n.hasBase("ANGLE") && (n = n.toNumber("rad")), Pr(n)) return new P({
            r: t,
            phi: n
          });
          throw new TypeError("Phi is not a number nor an angle unit.");
        } else throw new TypeError("Radius r is not a number.");
      }
      default:
        throw new SyntaxError("Wrong number of arguments in function fromPolar");
    }
  }, P.prototype.valueOf = P.prototype.toString, P.fromJSON = function(r) {
    return new P(r);
  }, P.compare = function(r, e) {
    return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
  }, P), {
    isClass: true
  });
  typeof BigInt > "u" && (BigInt = function(r) {
    if (isNaN(r)) throw new Error("");
    return r;
  });
  const vr = BigInt(0), Ar = BigInt(1), ct = BigInt(2), cn = BigInt(5), he = BigInt(10), is = 2e3, sr = {
    s: Ar,
    n: vr,
    d: Ar
  };
  function Be(r, e) {
    try {
      r = BigInt(r);
    } catch {
      throw Ie();
    }
    return r * e;
  }
  function ye(r) {
    return typeof r == "bigint" ? r : Math.floor(r);
  }
  function Zr(r, e) {
    if (e === vr) throw wn();
    const t = Object.create(ge.prototype);
    t.s = r < vr ? -Ar : Ar, r = r < vr ? -r : r;
    const n = Ue(r, e);
    return t.n = r / n, t.d = e / n, t;
  }
  function Je(r) {
    const e = {};
    let t = r, n = ct, i = cn - Ar;
    for (; i <= t; ) {
      for (; t % n === vr; ) t /= n, e[n] = (e[n] || vr) + Ar;
      i += Ar + ct * n++;
    }
    return t !== r ? t > 1 && (e[t] = (e[t] || vr) + Ar) : e[r] = (e[r] || vr) + Ar, e;
  }
  const kr = function(r, e) {
    let t = vr, n = Ar, i = Ar;
    if (r != null) if (e !== void 0) {
      if (typeof r == "bigint") t = r;
      else {
        if (isNaN(r)) throw Ie();
        if (r % 1 !== 0) throw Wn();
        t = BigInt(r);
      }
      if (typeof e == "bigint") n = e;
      else {
        if (isNaN(e)) throw Ie();
        if (e % 1 !== 0) throw Wn();
        n = BigInt(e);
      }
      i = t * n;
    } else if (typeof r == "object") {
      if ("d" in r && "n" in r) t = BigInt(r.n), n = BigInt(r.d), "s" in r && (t *= BigInt(r.s));
      else if (0 in r) t = BigInt(r[0]), 1 in r && (n = BigInt(r[1]));
      else if (typeof r == "bigint") t = r;
      else throw Ie();
      i = t * n;
    } else if (typeof r == "number") {
      if (isNaN(r)) throw Ie();
      if (r < 0 && (i = -Ar, r = -r), r % 1 === 0) t = BigInt(r);
      else if (r > 0) {
        let u = 1, a = 0, c = 1, s = 1, f = 1, o = 1e7;
        for (r >= 1 && (u = 10 ** Math.floor(1 + Math.log10(r)), r /= u); c <= o && f <= o; ) {
          let h = (a + s) / (c + f);
          if (r === h) {
            c + f <= o ? (t = a + s, n = c + f) : f > c ? (t = s, n = f) : (t = a, n = c);
            break;
          } else r > h ? (a += s, c += f) : (s += a, f += c), c > o ? (t = s, n = f) : (t = a, n = c);
        }
        t = BigInt(t) * BigInt(u), n = BigInt(n);
      }
    } else if (typeof r == "string") {
      let u = 0, a = vr, c = vr, s = vr, f = Ar, o = Ar, h = r.replace(/_/g, "").match(/\d+|./g);
      if (h === null) throw Ie();
      if (h[u] === "-" ? (i = -Ar, u++) : h[u] === "+" && u++, h.length === u + 1 ? c = Be(h[u++], i) : h[u + 1] === "." || h[u] === "." ? (h[u] !== "." && (a = Be(h[u++], i)), u++, (u + 1 === h.length || h[u + 1] === "(" && h[u + 3] === ")" || h[u + 1] === "'" && h[u + 3] === "'") && (c = Be(h[u], i), f = he ** BigInt(h[u].length), u++), (h[u] === "(" && h[u + 2] === ")" || h[u] === "'" && h[u + 2] === "'") && (s = Be(h[u + 1], i), o = he ** BigInt(h[u + 1].length) - Ar, u += 3)) : h[u + 1] === "/" || h[u + 1] === ":" ? (c = Be(h[u], i), f = Be(h[u + 2], Ar), u += 3) : h[u + 3] === "/" && h[u + 1] === " " && (a = Be(h[u], i), c = Be(h[u + 2], i), f = Be(h[u + 4], Ar), u += 5), h.length <= u) n = f * o, i = t = s + n * a + o * c;
      else throw Ie();
    } else if (typeof r == "bigint") t = r, i = r, n = Ar;
    else throw Ie();
    if (n === vr) throw wn();
    sr.s = i < vr ? -Ar : Ar, sr.n = t < vr ? -t : t, sr.d = n < vr ? -n : n;
  };
  function us(r, e, t) {
    let n = Ar;
    for (; e > vr; r = r * r % t, e >>= Ar) e & Ar && (n = n * r % t);
    return n;
  }
  function as(r, e) {
    for (; e % ct === vr; e /= ct) ;
    for (; e % cn === vr; e /= cn) ;
    if (e === Ar) return vr;
    let t = he % e, n = 1;
    for (; t !== Ar; n++) if (t = t * he % e, n > is) return vr;
    return BigInt(n);
  }
  function os(r, e, t) {
    let n = Ar, i = us(he, t, e);
    for (let u = 0; u < 300; u++) {
      if (n === i) return BigInt(u);
      n = n * he % e, i = i * he % e;
    }
    return 0;
  }
  function Ue(r, e) {
    if (!r) return e;
    if (!e) return r;
    for (; ; ) {
      if (r %= e, !r) return e;
      if (e %= r, !e) return r;
    }
  }
  function ge(r, e) {
    if (kr(r, e), this instanceof ge) r = Ue(sr.d, sr.n), this.s = sr.s, this.n = sr.n / r, this.d = sr.d / r;
    else return Zr(sr.s * sr.n, sr.d);
  }
  var wn = function() {
    return new Error("Division by Zero");
  }, Ie = function() {
    return new Error("Invalid argument");
  }, Wn = function() {
    return new Error("Parameters must be integer");
  };
  ge.prototype = {
    s: Ar,
    n: vr,
    d: Ar,
    abs: function() {
      return Zr(this.n, this.d);
    },
    neg: function() {
      return Zr(-this.s * this.n, this.d);
    },
    add: function(r, e) {
      return kr(r, e), Zr(this.s * this.n * sr.d + sr.s * this.d * sr.n, this.d * sr.d);
    },
    sub: function(r, e) {
      return kr(r, e), Zr(this.s * this.n * sr.d - sr.s * this.d * sr.n, this.d * sr.d);
    },
    mul: function(r, e) {
      return kr(r, e), Zr(this.s * sr.s * this.n * sr.n, this.d * sr.d);
    },
    div: function(r, e) {
      return kr(r, e), Zr(this.s * sr.s * this.n * sr.d, this.d * sr.n);
    },
    clone: function() {
      return Zr(this.s * this.n, this.d);
    },
    mod: function(r, e) {
      if (r === void 0) return Zr(this.s * this.n % this.d, Ar);
      if (kr(r, e), vr === sr.n * this.d) throw wn();
      return Zr(this.s * (sr.d * this.n) % (sr.n * this.d), sr.d * this.d);
    },
    gcd: function(r, e) {
      return kr(r, e), Zr(Ue(sr.n, this.n) * Ue(sr.d, this.d), sr.d * this.d);
    },
    lcm: function(r, e) {
      return kr(r, e), sr.n === vr && this.n === vr ? Zr(vr, Ar) : Zr(sr.n * this.n, Ue(sr.n, this.n) * Ue(sr.d, this.d));
    },
    inverse: function() {
      return Zr(this.s * this.d, this.n);
    },
    pow: function(r, e) {
      if (kr(r, e), sr.d === Ar) return sr.s < vr ? Zr((this.s * this.d) ** sr.n, this.n ** sr.n) : Zr((this.s * this.n) ** sr.n, this.d ** sr.n);
      if (this.s < vr) return null;
      let t = Je(this.n), n = Je(this.d), i = Ar, u = Ar;
      for (let a in t) if (a !== "1") {
        if (a === "0") {
          i = vr;
          break;
        }
        if (t[a] *= sr.n, t[a] % sr.d === vr) t[a] /= sr.d;
        else return null;
        i *= BigInt(a) ** t[a];
      }
      for (let a in n) if (a !== "1") {
        if (n[a] *= sr.n, n[a] % sr.d === vr) n[a] /= sr.d;
        else return null;
        u *= BigInt(a) ** n[a];
      }
      return sr.s < vr ? Zr(u, i) : Zr(i, u);
    },
    log: function(r, e) {
      if (kr(r, e), this.s <= vr || sr.s <= vr) return null;
      const t = {}, n = Je(sr.n), i = Je(sr.d), u = Je(this.n), a = Je(this.d);
      for (const f in i) n[f] = (n[f] || vr) - i[f];
      for (const f in a) u[f] = (u[f] || vr) - a[f];
      for (const f in n) f !== "1" && (t[f] = true);
      for (const f in u) f !== "1" && (t[f] = true);
      let c = null, s = null;
      for (const f in t) {
        const o = n[f] || vr, h = u[f] || vr;
        if (o === vr) {
          if (h !== vr) return null;
          continue;
        }
        let p = h, v = o;
        const d = Ue(p, v);
        if (p /= d, v /= d, c === null && s === null) c = p, s = v;
        else if (p * s !== c * v) return null;
      }
      return c !== null && s !== null ? Zr(c, s) : null;
    },
    equals: function(r, e) {
      return kr(r, e), this.s * this.n * sr.d === sr.s * sr.n * this.d;
    },
    lt: function(r, e) {
      return kr(r, e), this.s * this.n * sr.d < sr.s * sr.n * this.d;
    },
    lte: function(r, e) {
      return kr(r, e), this.s * this.n * sr.d <= sr.s * sr.n * this.d;
    },
    gt: function(r, e) {
      return kr(r, e), this.s * this.n * sr.d > sr.s * sr.n * this.d;
    },
    gte: function(r, e) {
      return kr(r, e), this.s * this.n * sr.d >= sr.s * sr.n * this.d;
    },
    compare: function(r, e) {
      kr(r, e);
      let t = this.s * this.n * sr.d - sr.s * sr.n * this.d;
      return (vr < t) - (t < vr);
    },
    ceil: function(r) {
      return r = he ** BigInt(r || 0), Zr(ye(this.s * r * this.n / this.d) + (r * this.n % this.d > vr && this.s >= vr ? Ar : vr), r);
    },
    floor: function(r) {
      return r = he ** BigInt(r || 0), Zr(ye(this.s * r * this.n / this.d) - (r * this.n % this.d > vr && this.s < vr ? Ar : vr), r);
    },
    round: function(r) {
      return r = he ** BigInt(r || 0), Zr(ye(this.s * r * this.n / this.d) + this.s * ((this.s >= vr ? Ar : vr) + ct * (r * this.n % this.d) > this.d ? Ar : vr), r);
    },
    roundTo: function(r, e) {
      kr(r, e);
      const t = this.n * sr.d, n = this.d * sr.n, i = t % n;
      let u = ye(t / n);
      return i + i >= n && u++, Zr(this.s * u * sr.n, sr.d);
    },
    divisible: function(r, e) {
      return kr(r, e), !(!(sr.n * this.d) || this.n * sr.d % (sr.n * this.d));
    },
    valueOf: function() {
      return Number(this.s * this.n) / Number(this.d);
    },
    toString: function(r) {
      let e = this.n, t = this.d;
      r = r || 15;
      let n = as(e, t), i = os(e, t, n), u = this.s < vr ? "-" : "";
      if (u += ye(e / t), e %= t, e *= he, e && (u += "."), n) {
        for (let a = i; a--; ) u += ye(e / t), e %= t, e *= he;
        u += "(";
        for (let a = n; a--; ) u += ye(e / t), e %= t, e *= he;
        u += ")";
      } else for (let a = r; e && a--; ) u += ye(e / t), e %= t, e *= he;
      return u;
    },
    toFraction: function(r) {
      let e = this.n, t = this.d, n = this.s < vr ? "-" : "";
      if (t === Ar) n += e;
      else {
        let i = ye(e / t);
        r && i > vr && (n += i, n += " ", e %= t), n += e, n += "/", n += t;
      }
      return n;
    },
    toLatex: function(r) {
      let e = this.n, t = this.d, n = this.s < vr ? "-" : "";
      if (t === Ar) n += e;
      else {
        let i = ye(e / t);
        r && i > vr && (n += i, e %= t), n += "\\frac{", n += e, n += "}{", n += t, n += "}";
      }
      return n;
    },
    toContinued: function() {
      let r = this.n, e = this.d, t = [];
      do {
        t.push(ye(r / e));
        let n = r % e;
        r = e, e = n;
      } while (r !== Ar);
      return t;
    },
    simplify: function(r) {
      const e = BigInt(1 / (r || 1e-3) | 0), t = this.abs(), n = t.toContinued();
      for (let i = 1; i < n.length; i++) {
        let u = Zr(n[i - 1], Ar);
        for (let c = i - 2; c >= 0; c--) u = u.inverse().add(n[c]);
        let a = u.sub(t);
        if (a.n * e < a.d) return u.mul(this.s);
      }
      return this;
    }
  };
  var ss = "Fraction", fs = [], cs = ir(ss, fs, () => (Object.defineProperty(ge, "name", {
    value: "Fraction"
  }), ge.prototype.constructor = ge, ge.prototype.type = "Fraction", ge.prototype.isFraction = true, ge.prototype.toJSON = function() {
    return {
      mathjs: "Fraction",
      n: String(this.s * this.n),
      d: String(this.d)
    };
  }, ge.fromJSON = function(r) {
    return new ge(r);
  }, ge), {
    isClass: true
  }), ls = "Matrix", hs = [], vs = ir(ls, hs, () => {
    function r() {
      if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
    }
    return r.prototype.type = "Matrix", r.prototype.isMatrix = true, r.prototype.storage = function() {
      throw new Error("Cannot invoke storage on a Matrix interface");
    }, r.prototype.datatype = function() {
      throw new Error("Cannot invoke datatype on a Matrix interface");
    }, r.prototype.create = function(e, t) {
      throw new Error("Cannot invoke create on a Matrix interface");
    }, r.prototype.subset = function(e, t, n) {
      throw new Error("Cannot invoke subset on a Matrix interface");
    }, r.prototype.get = function(e) {
      throw new Error("Cannot invoke get on a Matrix interface");
    }, r.prototype.set = function(e, t, n) {
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
  }, {
    isClass: true
  });
  function rn(r, e, t) {
    var n = r.constructor, i = new n(2), u = "";
    if (t) {
      if (t < 1) throw new Error("size must be in greater than 0");
      if (!qr(t)) throw new Error("size must be an integer");
      if (r.greaterThan(i.pow(t - 1).sub(1)) || r.lessThan(i.pow(t - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
      if (!r.isInteger()) throw new Error("Value must be an integer");
      r.lessThan(0) && (r = r.add(i.pow(t))), u = "i".concat(t);
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
  function ps(r, e) {
    if (typeof e == "function") return e(r);
    if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
    var { notation: t, precision: n, wordSize: i } = Gi(e);
    switch (t) {
      case "fixed":
        return ms(r, n);
      case "exponential":
        return Vn(r, n);
      case "engineering":
        return ds(r, n);
      case "bin":
        return rn(r, 2, i);
      case "oct":
        return rn(r, 8, i);
      case "hex":
        return rn(r, 16, i);
      case "auto": {
        var u = Yn(e == null ? void 0 : e.lowerExp, -3), a = Yn(e == null ? void 0 : e.upperExp, 5);
        if (r.isZero()) return "0";
        var c, s = r.toSignificantDigits(n), f = s.e;
        return f >= u && f < a ? c = s.toFixed() : c = Vn(r, n), c.replace(/((\.\d*?)(0+))($|e)/, function() {
          var o = arguments[2], h = arguments[4];
          return o !== "." ? o + h : h;
        });
      }
      default:
        throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function ds(r, e) {
    var t = r.e, n = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3, i = r.mul(Math.pow(10, -n)), u = i.toPrecision(e);
    if (u.includes("e")) {
      var a = r.constructor;
      u = new a(u).toFixed();
    }
    return u + "e" + (t >= 0 ? "+" : "") + n.toString();
  }
  function Vn(r, e) {
    return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
  }
  function ms(r, e) {
    return r.toFixed(e);
  }
  function Yn(r, e) {
    return Pr(r) ? r : Yr(r) ? r.toNumber() : e;
  }
  function Lr(r, e) {
    var t = Ds(r, e);
    return e && typeof e == "object" && "truncate" in e && t.length > e.truncate ? t.substring(0, e.truncate - 3) + "..." : t;
  }
  function Ds(r, e) {
    if (typeof r == "number") return tn(r, e);
    if (Yr(r)) return ps(r, e);
    if (gs(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
    if (Array.isArray(r)) return au(r, e);
    if (we(r)) return Gn(r);
    if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
    if (r && typeof r == "object") {
      if (typeof r.format == "function") return r.format(e);
      if (r && r.toString(e) !== {}.toString()) return r.toString(e);
      var t = Object.keys(r).map((n) => Gn(n) + ": " + Lr(r[n], e));
      return "{" + t.join(", ") + "}";
    }
    return String(r);
  }
  function Gn(r) {
    for (var e = String(r), t = "", n = 0; n < e.length; ) {
      var i = e.charAt(n);
      t += i in Jn ? Jn[i] : i, n++;
    }
    return '"' + t + '"';
  }
  var Jn = {
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t"
  };
  function au(r, e) {
    if (Array.isArray(r)) {
      for (var t = "[", n = r.length, i = 0; i < n; i++) i !== 0 && (t += ", "), t += au(r[i], e);
      return t += "]", t;
    } else return Lr(r, e);
  }
  function gs(r) {
    return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
  }
  function Nr(r, e, t) {
    if (!(this instanceof Nr)) throw new SyntaxError("Constructor must be called with the new operator");
    this.actual = r, this.expected = e, this.relation = t, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
  }
  Nr.prototype = new RangeError();
  Nr.prototype.constructor = RangeError;
  Nr.prototype.name = "DimensionError";
  Nr.prototype.isDimensionError = true;
  function Le(r, e, t) {
    if (!(this instanceof Le)) throw new SyntaxError("Constructor must be called with the new operator");
    this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = t), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
  }
  Le.prototype = new RangeError();
  Le.prototype.constructor = RangeError;
  Le.prototype.name = "IndexError";
  Le.prototype.isIndexError = true;
  function Or(r) {
    for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
    return e;
  }
  function ou(r, e, t) {
    var n, i = r.length;
    if (i !== e[t]) throw new Nr(i, e[t]);
    if (t < e.length - 1) {
      var u = t + 1;
      for (n = 0; n < i; n++) {
        var a = r[n];
        if (!Array.isArray(a)) throw new Nr(e.length - 1, e.length, "<");
        ou(r[n], e, u);
      }
    } else for (n = 0; n < i; n++) if (Array.isArray(r[n])) throw new Nr(e.length + 1, e.length, ">");
  }
  function Qn(r, e) {
    var t = e.length === 0;
    if (t) {
      if (Array.isArray(r)) throw new Nr(r.length, 0);
    } else ou(r, e, 0);
  }
  function Vr(r, e) {
    if (r !== void 0) {
      if (!Pr(r) || !qr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
      if (r < 0 || typeof e == "number" && r >= e) throw new Le(r, e);
    }
  }
  function xt(r, e, t) {
    if (!Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new Error("Resizing to scalar is not supported");
    e.forEach(function(i) {
      if (!Pr(i) || !qr(i) || i < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Lr(e) + ")");
    }), (Pr(r) || Yr(r)) && (r = [
      r
    ]);
    var n = t !== void 0 ? t : 0;
    return ln(r, e, 0, n), r;
  }
  function ln(r, e, t, n) {
    var i, u, a = r.length, c = e[t], s = Math.min(a, c);
    if (r.length = c, t < e.length - 1) {
      var f = t + 1;
      for (i = 0; i < s; i++) u = r[i], Array.isArray(u) || (u = [
        u
      ], r[i] = u), ln(u, e, f, n);
      for (i = s; i < c; i++) u = [], r[i] = u, ln(u, e, f, n);
    } else {
      for (i = 0; i < s; i++) for (; Array.isArray(r[i]); ) r[i] = r[i][0];
      for (i = s; i < c; i++) r[i] = n;
    }
  }
  function An(r, e) {
    var t = hn(r), n = t.length;
    if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new Nr(0, n, "!=");
    e = Fn(e, n);
    var i = su(e);
    if (n !== i) throw new Nr(i, n, "!=");
    try {
      return ys(t, e);
    } catch (u) {
      throw u instanceof Nr ? new Nr(i, n, "!=") : u;
    }
  }
  function Fn(r, e) {
    var t = su(r), n = r.slice(), i = -1, u = r.indexOf(i), a = r.indexOf(i, u + 1) >= 0;
    if (a) throw new Error("More than one wildcard in sizes");
    var c = u >= 0, s = e % t === 0;
    if (c) if (s) n[u] = -e / t;
    else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -t);
    return n;
  }
  function su(r) {
    return r.reduce((e, t) => e * t, 1);
  }
  function ys(r, e) {
    for (var t = r, n, i = e.length - 1; i > 0; i--) {
      var u = e[i];
      n = [];
      for (var a = t.length / u, c = 0; c < a; c++) n.push(t.slice(c * u, (c + 1) * u));
      t = n;
    }
    return t;
  }
  function Xn(r, e) {
    for (var t = Or(r); Array.isArray(r) && r.length === 1; ) r = r[0], t.shift();
    for (var n = t.length; t[n - 1] === 1; ) n--;
    return n < t.length && (r = fu(r, n, 0), t.length = n), r;
  }
  function fu(r, e, t) {
    var n, i;
    if (t < e) {
      var u = t + 1;
      for (n = 0, i = r.length; n < i; n++) r[n] = fu(r[n], e, u);
    } else for (; Array.isArray(r); ) r = r[0];
    return r;
  }
  function cu(r, e, t, n) {
    var i = n || Or(r);
    if (t) for (var u = 0; u < t; u++) r = [
      r
    ], i.unshift(1);
    for (r = lu(r, e, 0); i.length < e; ) i.push(1);
    return r;
  }
  function lu(r, e, t) {
    var n, i;
    if (Array.isArray(r)) {
      var u = t + 1;
      for (n = 0, i = r.length; n < i; n++) r[n] = lu(r[n], e, u);
    } else for (var a = t; a < e; a++) r = [
      r
    ];
    return r;
  }
  function hn(r) {
    if (!Array.isArray(r)) return r;
    var e = [];
    return r.forEach(function t(n) {
      Array.isArray(n) ? n.forEach(t) : e.push(n);
    }), e;
  }
  function Vt(r, e) {
    for (var t, n = 0, i = 0; i < r.length; i++) {
      var u = r[i], a = Array.isArray(u);
      if (i === 0 && a && (n = u.length), a && u.length !== n) return;
      var c = a ? Vt(u, e) : e(u);
      if (t === void 0) t = c;
      else if (t !== c) return "mixed";
    }
    return t;
  }
  function hu(r, e, t, n) {
    if (n < t) {
      if (r.length !== e.length) throw new Nr(r.length, e.length);
      for (var i = [], u = 0; u < r.length; u++) i[u] = hu(r[u], e[u], t, n + 1);
      return i;
    } else return r.concat(e);
  }
  function vu() {
    var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
    if (r.length === 1) return r[0];
    if (r.length > 1) return r.slice(1).reduce(function(t, n) {
      return hu(t, n, e, 0);
    }, r[0]);
    throw new Error("Wrong number of arguments in function concat");
  }
  function pu() {
    for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++) e[t] = arguments[t];
    for (var n = e.map((p) => p.length), i = Math.max(...n), u = new Array(i).fill(null), a = 0; a < e.length; a++) for (var c = e[a], s = n[a], f = 0; f < s; f++) {
      var o = i - s + f;
      c[f] > u[o] && (u[o] = c[f]);
    }
    for (var h = 0; h < e.length; h++) du(e[h], u);
    return u;
  }
  function du(r, e) {
    for (var t = e.length, n = r.length, i = 0; i < n; i++) {
      var u = t - n + i;
      if (r[i] < e[u] && r[i] > 1 || r[i] > e[u]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(n, " with size ").concat(r[i], " to size ").concat(e[u]));
    }
  }
  function vn(r, e) {
    var t = Or(r);
    if ($e(t, e)) return r;
    du(t, e);
    var n = pu(t, e), i = n.length, u = [
      ...Array(i - t.length).fill(1),
      ...t
    ], a = As(r);
    t.length < i && (a = An(a, u), t = Or(a));
    for (var c = 0; c < i; c++) t[c] < n[c] && (a = ws(a, n[c], c), t = Or(a));
    return a;
  }
  function ws(r, e, t) {
    return vu(...Array(e).fill(r), t);
  }
  function mu(r, e) {
    if (!Array.isArray(r)) throw new Error("Array expected");
    var t = Or(r);
    if (e.length !== t.length) throw new Nr(e.length, t.length);
    for (var n = 0; n < e.length; n++) Vr(e[n], t[n]);
    return e.reduce((i, u) => i[u], r);
  }
  function Hn(r, e) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (r.length === 0) return [];
    if (t) return u(r);
    var n = [];
    return i(r, 0);
    function i(a, c) {
      if (Array.isArray(a)) {
        for (var s = a.length, f = Array(s), o = 0; o < s; o++) n[c] = o, f[o] = i(a[o], c + 1);
        return f;
      } else return e(a, n.slice(0, c), r);
    }
    function u(a) {
      if (Array.isArray(a)) {
        for (var c = a.length, s = Array(c), f = 0; f < c; f++) s[f] = u(a[f]);
        return s;
      } else return e(a);
    }
  }
  function As(r) {
    return Ke([], r);
  }
  function Tt(r, e, t) {
    if (Bt.isTypedFunction(r)) {
      var n = (e.isMatrix ? e.size() : Or(e)).map(() => 0), i = e.isMatrix ? e.get(n) : mu(e, n), u = Es(r, i, n, e), a;
      if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
        var c = Fs(r, u);
        a = c !== void 0 ? c : r;
      } else a = r;
      return u >= 1 && u <= 3 ? function() {
        for (var s = arguments.length, f = new Array(s), o = 0; o < s; o++) f[o] = arguments[o];
        return Kn(a, f.slice(0, u), t, r.name);
      } : function() {
        for (var s = arguments.length, f = new Array(s), o = 0; o < s; o++) f[o] = arguments[o];
        return Kn(a, f, t, r.name);
      };
    }
    return r;
  }
  function Fs(r, e) {
    var t = [];
    if (Object.entries(r.signatures).forEach((n) => {
      var [i, u] = n;
      i.split(",").length === e && t.push(u);
    }), t.length === 1) return t[0];
  }
  function Es(r, e, t, n) {
    for (var i = [
      e,
      t,
      n
    ], u = 3; u > 0; u--) {
      var a = i.slice(0, u);
      if (Bt.resolve(r, a) !== null) return u;
    }
  }
  function Kn(r, e, t, n) {
    try {
      return r(...e);
    } catch (i) {
      bs(i, e, t, n);
    }
  }
  function bs(r, e, t, n) {
    var i;
    if (r instanceof TypeError && ((i = r.data) === null || i === void 0 ? void 0 : i.category) === "wrongType") {
      var u = [];
      throw u.push("value: ".concat(Fe(e[0]))), e.length >= 2 && u.push("index: ".concat(Fe(e[1]))), e.length >= 3 && u.push("array: ".concat(Fe(e[2]))), new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "".concat(n, "(").concat(u.join(", "), ") at index ").concat(JSON.stringify(e[1])));
    } else throw new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "to function ".concat(n, ": ").concat(r.message));
  }
  var Cs = "DenseMatrix", _s = [
    "Matrix"
  ], Bs = ir(Cs, _s, (r) => {
    var { Matrix: e } = r;
    function t(o, h) {
      if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
      if (h && !we(h)) throw new Error("Invalid datatype: " + h);
      if (zr(o)) o.type === "DenseMatrix" ? (this._data = Br(o._data), this._size = Br(o._size), this._datatype = h || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = h || o._datatype);
      else if (o && Wr(o.data) && Wr(o.size)) this._data = o.data, this._size = o.size, Qn(this._data, this._size), this._datatype = h || o.datatype;
      else if (Wr(o)) this._data = f(o), this._size = Or(this._data), Qn(this._data, this._size), this._datatype = h;
      else {
        if (o) throw new TypeError("Unsupported type of data (" + Fe(o) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = h;
      }
    }
    t.prototype = new e(), t.prototype.createDenseMatrix = function(o, h) {
      return new t(o, h);
    }, Object.defineProperty(t, "name", {
      value: "DenseMatrix"
    }), t.prototype.constructor = t, t.prototype.type = "DenseMatrix", t.prototype.isDenseMatrix = true, t.prototype.getDataType = function() {
      return Vt(this._data, Fe);
    }, t.prototype.storage = function() {
      return "dense";
    }, t.prototype.datatype = function() {
      return this._datatype;
    }, t.prototype.create = function(o, h) {
      return new t(o, h);
    }, t.prototype.subset = function(o, h, p) {
      switch (arguments.length) {
        case 1:
          return n(this, o);
        case 2:
        case 3:
          return u(this, o, h, p);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    }, t.prototype.get = function(o) {
      return mu(this._data, o);
    }, t.prototype.set = function(o, h, p) {
      if (!Wr(o)) throw new TypeError("Array expected");
      if (o.length < this._size.length) throw new Nr(o.length, this._size.length, "<");
      var v, d, l, m = o.map(function(b) {
        return b + 1;
      });
      s(this, m, p);
      var D = this._data;
      for (v = 0, d = o.length - 1; v < d; v++) l = o[v], Vr(l, D.length), D = D[l];
      return l = o[o.length - 1], Vr(l, D.length), D[l] = h, this;
    };
    function n(o, h) {
      if (!Dn(h)) throw new TypeError("Invalid index");
      var p = h.isScalar();
      if (p) return o.get(h.min());
      var v = h.size();
      if (v.length !== o._size.length) throw new Nr(v.length, o._size.length);
      for (var d = h.min(), l = h.max(), m = 0, D = o._size.length; m < D; m++) Vr(d[m], o._size[m]), Vr(l[m], o._size[m]);
      return new t(i(o._data, h, v.length, 0), o._datatype);
    }
    function i(o, h, p, v) {
      var d = v === p - 1, l = h.dimension(v);
      return d ? l.map(function(m) {
        return Vr(m, o.length), o[m];
      }).valueOf() : l.map(function(m) {
        Vr(m, o.length);
        var D = o[m];
        return i(D, h, p, v + 1);
      }).valueOf();
    }
    function u(o, h, p, v) {
      if (!h || h.isIndex !== true) throw new TypeError("Invalid index");
      var d = h.size(), l = h.isScalar(), m;
      if (zr(p) ? (m = p.size(), p = p.valueOf()) : m = Or(p), l) {
        if (m.length !== 0) throw new TypeError("Scalar expected");
        o.set(h.min(), p, v);
      } else {
        if (!$e(m, d)) try {
          m.length === 0 ? p = vn([
            p
          ], d) : p = vn(p, d), m = Or(p);
        } catch {
        }
        if (d.length < o._size.length) throw new Nr(d.length, o._size.length, "<");
        if (m.length < d.length) {
          for (var D = 0, b = 0; d[D] === 1 && m[D] === 1; ) D++;
          for (; d[D] === 1; ) b++, D++;
          p = cu(p, d.length, b, m);
        }
        if (!$e(d, m)) throw new Nr(d, m, ">");
        var g = h.max().map(function(w) {
          return w + 1;
        });
        s(o, g, v);
        var C = d.length, A = 0;
        a(o._data, h, p, C, A);
      }
      return o;
    }
    function a(o, h, p, v, d) {
      var l = d === v - 1, m = h.dimension(d);
      l ? m.forEach(function(D, b) {
        Vr(D), o[D] = p[b[0]];
      }) : m.forEach(function(D, b) {
        Vr(D), a(o[D], h, p[b[0]], v, d + 1);
      });
    }
    t.prototype.resize = function(o, h, p) {
      if (!_t(o)) throw new TypeError("Array or Matrix expected");
      var v = o.valueOf().map((l) => Array.isArray(l) && l.length === 1 ? l[0] : l), d = p ? this.clone() : this;
      return c(d, v, h);
    };
    function c(o, h, p) {
      if (h.length === 0) {
        for (var v = o._data; Wr(v); ) v = v[0];
        return v;
      }
      return o._size = h.slice(0), o._data = xt(o._data, o._size, p), o;
    }
    t.prototype.reshape = function(o, h) {
      var p = h ? this.clone() : this;
      p._data = An(p._data, o);
      var v = p._size.reduce((d, l) => d * l);
      return p._size = Fn(o, v), p;
    };
    function s(o, h, p) {
      for (var v = o._size.slice(0), d = false; v.length < h.length; ) v.push(0), d = true;
      for (var l = 0, m = h.length; l < m; l++) h[l] > v[l] && (v[l] = h[l], d = true);
      d && c(o, v, p);
    }
    t.prototype.clone = function() {
      var o = new t({
        data: Br(this._data),
        size: Br(this._size),
        datatype: this._datatype
      });
      return o;
    }, t.prototype.size = function() {
      return this._size.slice(0);
    }, t.prototype._forEach = function(o) {
      var h = this, p = h.size(), v = p.length - 1;
      if (v < 0) return;
      if (v === 0) {
        for (var d = p[0], l = 0; l < d; l++) o(h._data, l, [
          l
        ]);
        return;
      }
      var m = Array(p.length);
      function D(b, g) {
        var C = p[g];
        if (g < v) for (var A = 0; A < C; A++) m[g] = A, D(b[A], g + 1);
        else for (var w = 0; w < C; w++) m[g] = w, o(b, w, m.slice());
      }
      D(h._data, 0);
    }, t.prototype.map = function(o) {
      var h = this, p = new t(h), v = Tt(o, h._data, "map");
      return p._forEach(function(d, l, m) {
        d[l] = v(d[l], m, h);
      }), p;
    }, t.prototype.forEach = function(o) {
      var h = this, p = Tt(o, h._data, "map");
      h._forEach(function(v, d, l) {
        p(v[d], l, h);
      });
    }, t.prototype[Symbol.iterator] = function* () {
      var o = this._size.length - 1;
      if (!(o < 0)) {
        if (o === 0) {
          for (var h = 0; h < this._data.length; h++) yield {
            value: this._data[h],
            index: [
              h
            ]
          };
          return;
        }
        var p = [], v = function* (l, m) {
          if (m < o) for (var D = 0; D < l.length; D++) p[m] = D, yield* v(l[D], m + 1);
          else for (var b = 0; b < l.length; b++) p[m] = b, yield {
            value: l[b],
            index: p.slice()
          };
        };
        yield* v(this._data, 0);
      }
    }, t.prototype.rows = function() {
      var o = [], h = this.size();
      if (h.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      var p = this._data;
      for (var v of p) o.push(new t([
        v
      ], this._datatype));
      return o;
    }, t.prototype.columns = function() {
      var o = this, h = [], p = this.size();
      if (p.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      for (var v = this._data, d = function(D) {
        var b = v.map((g) => [
          g[D]
        ]);
        h.push(new t(b, o._datatype));
      }, l = 0; l < p[1]; l++) d(l);
      return h;
    }, t.prototype.toArray = function() {
      return Br(this._data);
    }, t.prototype.valueOf = function() {
      return this._data;
    }, t.prototype.format = function(o) {
      return Lr(this._data, o);
    }, t.prototype.toString = function() {
      return Lr(this._data);
    }, t.prototype.toJSON = function() {
      return {
        mathjs: "DenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, t.prototype.diagonal = function(o) {
      if (o) {
        if (Yr(o) && (o = o.toNumber()), !Pr(o) || !qr(o)) throw new TypeError("The parameter k must be an integer number");
      } else o = 0;
      for (var h = o > 0 ? o : 0, p = o < 0 ? -o : 0, v = this._size[0], d = this._size[1], l = Math.min(v - p, d - h), m = [], D = 0; D < l; D++) m[D] = this._data[D + p][D + h];
      return new t({
        data: m,
        size: [
          l
        ],
        datatype: this._datatype
      });
    }, t.diagonal = function(o, h, p, v) {
      if (!Wr(o)) throw new TypeError("Array expected, size parameter");
      if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (o = o.map(function(_) {
        if (Yr(_) && (_ = _.toNumber()), !Pr(_) || !qr(_) || _ < 1) throw new Error("Size values must be positive integers");
        return _;
      }), p) {
        if (Yr(p) && (p = p.toNumber()), !Pr(p) || !qr(p)) throw new TypeError("The parameter k must be an integer number");
      } else p = 0;
      var d = p > 0 ? p : 0, l = p < 0 ? -p : 0, m = o[0], D = o[1], b = Math.min(m - l, D - d), g;
      if (Wr(h)) {
        if (h.length !== b) throw new Error("Invalid value array length");
        g = function(F) {
          return h[F];
        };
      } else if (zr(h)) {
        var C = h.size();
        if (C.length !== 1 || C[0] !== b) throw new Error("Invalid matrix length");
        g = function(F) {
          return h.get([
            F
          ]);
        };
      } else g = function() {
        return h;
      };
      v || (v = Yr(g(0)) ? g(0).mul(0) : 0);
      var A = [];
      if (o.length > 0) {
        A = xt(A, o, v);
        for (var w = 0; w < b; w++) A[w + l][w + d] = g(w);
      }
      return new t({
        data: A,
        size: [
          m,
          D
        ]
      });
    }, t.fromJSON = function(o) {
      return new t(o);
    }, t.prototype.swapRows = function(o, h) {
      if (!Pr(o) || !qr(o) || !Pr(h) || !qr(h)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return Vr(o, this._size[0]), Vr(h, this._size[0]), t._swapRows(o, h, this._data), this;
    }, t._swapRows = function(o, h, p) {
      var v = p[o];
      p[o] = p[h], p[h] = v;
    };
    function f(o) {
      return zr(o) ? f(o.valueOf()) : Wr(o) ? o.map(f) : o;
    }
    return t;
  }, {
    isClass: true
  });
  function de(r, e, t) {
    if (!t) return zr(r) ? r.map((i) => e(i)) : Hn(r, e, true);
    var n = (i) => i === 0 ? i : e(i);
    return zr(r) ? r.map((i) => n(i)) : Hn(r, n, true);
  }
  var kn = "isInteger", Ms = [
    "typed"
  ], Ss = ir(kn, Ms, (r) => {
    var { typed: e } = r;
    return e(kn, {
      number: qr,
      BigNumber: function(n) {
        return n.isInt();
      },
      bigint: function(n) {
        return true;
      },
      Fraction: function(n) {
        return n.d === 1n;
      },
      "Array | Matrix": e.referToSelf((t) => (n) => de(n, t))
    });
  }), En = "number", Yt = "number, number";
  function Du(r) {
    return Math.abs(r);
  }
  Du.signature = En;
  function gu(r, e) {
    return r + e;
  }
  gu.signature = Yt;
  function yu(r, e) {
    return r - e;
  }
  yu.signature = Yt;
  function wu(r, e) {
    return r * e;
  }
  wu.signature = Yt;
  function Au(r) {
    return -r;
  }
  Au.signature = En;
  function pn(r) {
    return Qa(r);
  }
  pn.signature = En;
  function Fu(r, e) {
    return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
  }
  Fu.signature = Yt;
  var Ns = "number";
  function Eu(r) {
    return r > 0;
  }
  Eu.signature = Ns;
  function rt(r, e) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (t <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (n < 0) throw new Error("Absolute tolerance must be at least 0");
    return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(t), n));
  }
  var jn = "isPositive", xs = [
    "typed",
    "config"
  ], Ts = ir(jn, xs, (r) => {
    var { typed: e, config: t } = r;
    return e(jn, {
      number: (n) => Se(n, 0, t.relTol, t.absTol) ? false : Eu(n),
      BigNumber: (n) => rt(n, new n.constructor(0), t.relTol, t.absTol) ? false : !n.isNeg() && !n.isZero() && !n.isNaN(),
      bigint: (n) => n > 0n,
      Fraction: (n) => n.s > 0n && n.n > 0n,
      Unit: e.referToSelf((n) => (i) => e.find(n, i.valueType())(i.value)),
      "Array | Matrix": e.referToSelf((n) => (i) => de(i, n))
    });
  }), ri = "isZero", Is = [
    "typed",
    "equalScalar"
  ], Os = ir(ri, Is, (r) => {
    var { typed: e, equalScalar: t } = r;
    return e(ri, {
      "number | BigNumber | Complex | Fraction": (n) => t(n, 0),
      bigint: (n) => n === 0n,
      Unit: e.referToSelf((n) => (i) => e.find(n, i.valueType())(i.value)),
      "Array | Matrix": e.referToSelf((n) => (i) => de(i, n))
    });
  });
  function zs(r, e, t, n) {
    return Se(r.re, e.re, t, n) && Se(r.im, e.im, t, n);
  }
  var lt = ir("compareUnits", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      "Unit, Unit": e.referToSelf((t) => (n, i) => {
        if (!n.equalBase(i)) throw new Error("Cannot compare units with different base");
        return e.find(t, [
          n.valueType(),
          i.valueType()
        ])(n.value, i.value);
      })
    };
  }), It = "equalScalar", $s = [
    "typed",
    "config"
  ], Ps = ir(It, $s, (r) => {
    var { typed: e, config: t } = r, n = lt({
      typed: e
    });
    return e(It, {
      "boolean, boolean": function(u, a) {
        return u === a;
      },
      "number, number": function(u, a) {
        return Se(u, a, t.relTol, t.absTol);
      },
      "BigNumber, BigNumber": function(u, a) {
        return u.eq(a) || rt(u, a, t.relTol, t.absTol);
      },
      "bigint, bigint": function(u, a) {
        return u === a;
      },
      "Fraction, Fraction": function(u, a) {
        return u.equals(a);
      },
      "Complex, Complex": function(u, a) {
        return zs(u, a, t.relTol, t.absTol);
      }
    }, n);
  });
  ir(It, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: t } = r;
    return e(It, {
      "number, number": function(i, u) {
        return Se(i, u, t.relTol, t.absTol);
      }
    });
  });
  var Rs = "SparseMatrix", qs = [
    "typed",
    "equalScalar",
    "Matrix"
  ], Us = ir(Rs, qs, (r) => {
    var { typed: e, equalScalar: t, Matrix: n } = r;
    function i(l, m) {
      if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
      if (m && !we(m)) throw new Error("Invalid datatype: " + m);
      if (zr(l)) u(this, l, m);
      else if (l && Wr(l.index) && Wr(l.ptr) && Wr(l.size)) this._values = l.values, this._index = l.index, this._ptr = l.ptr, this._size = l.size, this._datatype = m || l.datatype;
      else if (Wr(l)) a(this, l, m);
      else {
        if (l) throw new TypeError("Unsupported type of data (" + Fe(l) + ")");
        this._values = [], this._index = [], this._ptr = [
          0
        ], this._size = [
          0,
          0
        ], this._datatype = m;
      }
    }
    function u(l, m, D) {
      m.type === "SparseMatrix" ? (l._values = m._values ? Br(m._values) : void 0, l._index = Br(m._index), l._ptr = Br(m._ptr), l._size = Br(m._size), l._datatype = D || m._datatype) : a(l, m.valueOf(), D || m._datatype);
    }
    function a(l, m, D) {
      l._values = [], l._index = [], l._ptr = [], l._datatype = D;
      var b = m.length, g = 0, C = t, A = 0;
      if (we(D) && (C = e.find(t, [
        D,
        D
      ]) || t, A = e.convert(0, D)), b > 0) {
        var w = 0;
        do {
          l._ptr.push(l._index.length);
          for (var _ = 0; _ < b; _++) {
            var F = m[_];
            if (Wr(F)) {
              if (w === 0 && g < F.length && (g = F.length), w < F.length) {
                var y = F[w];
                C(y, A) || (l._values.push(y), l._index.push(_));
              }
            } else w === 0 && g < 1 && (g = 1), C(F, A) || (l._values.push(F), l._index.push(_));
          }
          w++;
        } while (w < g);
      }
      l._ptr.push(l._index.length), l._size = [
        b,
        g
      ];
    }
    i.prototype = new n(), i.prototype.createSparseMatrix = function(l, m) {
      return new i(l, m);
    }, Object.defineProperty(i, "name", {
      value: "SparseMatrix"
    }), i.prototype.constructor = i, i.prototype.type = "SparseMatrix", i.prototype.isSparseMatrix = true, i.prototype.getDataType = function() {
      return Vt(this._values, Fe);
    }, i.prototype.storage = function() {
      return "sparse";
    }, i.prototype.datatype = function() {
      return this._datatype;
    }, i.prototype.create = function(l, m) {
      return new i(l, m);
    }, i.prototype.density = function() {
      var l = this._size[0], m = this._size[1];
      return l !== 0 && m !== 0 ? this._index.length / (l * m) : 0;
    }, i.prototype.subset = function(l, m, D) {
      if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
      switch (arguments.length) {
        case 1:
          return c(this, l);
        case 2:
        case 3:
          return s(this, l, m, D);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    };
    function c(l, m) {
      if (!Dn(m)) throw new TypeError("Invalid index");
      var D = m.isScalar();
      if (D) return l.get(m.min());
      var b = m.size();
      if (b.length !== l._size.length) throw new Nr(b.length, l._size.length);
      var g, C, A, w, _ = m.min(), F = m.max();
      for (g = 0, C = l._size.length; g < C; g++) Vr(_[g], l._size[g]), Vr(F[g], l._size[g]);
      var y = l._values, M = l._index, B = l._ptr, S = m.dimension(0), O = m.dimension(1), x = [], z = [];
      S.forEach(function(Z, nr) {
        z[Z] = nr[0], x[Z] = true;
      });
      var T = y ? [] : void 0, J = [], q = [];
      return O.forEach(function(Z) {
        for (q.push(J.length), A = B[Z], w = B[Z + 1]; A < w; A++) g = M[A], x[g] === true && (J.push(z[g]), T && T.push(y[A]));
      }), q.push(J.length), new i({
        values: T,
        index: J,
        ptr: q,
        size: b,
        datatype: l._datatype
      });
    }
    function s(l, m, D, b) {
      if (!m || m.isIndex !== true) throw new TypeError("Invalid index");
      var g = m.size(), C = m.isScalar(), A;
      if (zr(D) ? (A = D.size(), D = D.toArray()) : A = Or(D), C) {
        if (A.length !== 0) throw new TypeError("Scalar expected");
        l.set(m.min(), D, b);
      } else {
        if (g.length !== 1 && g.length !== 2) throw new Nr(g.length, l._size.length, "<");
        if (A.length < g.length) {
          for (var w = 0, _ = 0; g[w] === 1 && A[w] === 1; ) w++;
          for (; g[w] === 1; ) _++, w++;
          D = cu(D, g.length, _, A);
        }
        if (!$e(g, A)) throw new Nr(g, A, ">");
        if (g.length === 1) {
          var F = m.dimension(0);
          F.forEach(function(B, S) {
            Vr(B), l.set([
              B,
              0
            ], D[S[0]], b);
          });
        } else {
          var y = m.dimension(0), M = m.dimension(1);
          y.forEach(function(B, S) {
            Vr(B), M.forEach(function(O, x) {
              Vr(O), l.set([
                B,
                O
              ], D[S[0]][x[0]], b);
            });
          });
        }
      }
      return l;
    }
    i.prototype.get = function(l) {
      if (!Wr(l)) throw new TypeError("Array expected");
      if (l.length !== this._size.length) throw new Nr(l.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
      var m = l[0], D = l[1];
      Vr(m, this._size[0]), Vr(D, this._size[1]);
      var b = f(m, this._ptr[D], this._ptr[D + 1], this._index);
      return b < this._ptr[D + 1] && this._index[b] === m ? this._values[b] : 0;
    }, i.prototype.set = function(l, m, D) {
      if (!Wr(l)) throw new TypeError("Array expected");
      if (l.length !== this._size.length) throw new Nr(l.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
      var b = l[0], g = l[1], C = this._size[0], A = this._size[1], w = t, _ = 0;
      we(this._datatype) && (w = e.find(t, [
        this._datatype,
        this._datatype
      ]) || t, _ = e.convert(0, this._datatype)), (b > C - 1 || g > A - 1) && (p(this, Math.max(b + 1, C), Math.max(g + 1, A), D), C = this._size[0], A = this._size[1]), Vr(b, C), Vr(g, A);
      var F = f(b, this._ptr[g], this._ptr[g + 1], this._index);
      return F < this._ptr[g + 1] && this._index[F] === b ? w(m, _) ? o(F, g, this._values, this._index, this._ptr) : this._values[F] = m : w(m, _) || h(F, b, g, m, this._values, this._index, this._ptr), this;
    };
    function f(l, m, D, b) {
      if (D - m === 0) return D;
      for (var g = m; g < D; g++) if (b[g] === l) return g;
      return m;
    }
    function o(l, m, D, b, g) {
      D.splice(l, 1), b.splice(l, 1);
      for (var C = m + 1; C < g.length; C++) g[C]--;
    }
    function h(l, m, D, b, g, C, A) {
      g.splice(l, 0, b), C.splice(l, 0, m);
      for (var w = D + 1; w < A.length; w++) A[w]++;
    }
    i.prototype.resize = function(l, m, D) {
      if (!_t(l)) throw new TypeError("Array or Matrix expected");
      var b = l.valueOf().map((C) => Array.isArray(C) && C.length === 1 ? C[0] : C);
      if (b.length !== 2) throw new Error("Only two dimensions matrix are supported");
      b.forEach(function(C) {
        if (!Pr(C) || !qr(C) || C < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Lr(b) + ")");
      });
      var g = D ? this.clone() : this;
      return p(g, b[0], b[1], m);
    };
    function p(l, m, D, b) {
      var g = b || 0, C = t, A = 0;
      we(l._datatype) && (C = e.find(t, [
        l._datatype,
        l._datatype
      ]) || t, A = e.convert(0, l._datatype), g = e.convert(g, l._datatype));
      var w = !C(g, A), _ = l._size[0], F = l._size[1], y, M, B;
      if (D > F) {
        for (M = F; M < D; M++) if (l._ptr[M] = l._values.length, w) for (y = 0; y < _; y++) l._values.push(g), l._index.push(y);
        l._ptr[D] = l._values.length;
      } else D < F && (l._ptr.splice(D + 1, F - D), l._values.splice(l._ptr[D], l._values.length), l._index.splice(l._ptr[D], l._index.length));
      if (F = D, m > _) {
        if (w) {
          var S = 0;
          for (M = 0; M < F; M++) {
            l._ptr[M] = l._ptr[M] + S, B = l._ptr[M + 1] + S;
            var O = 0;
            for (y = _; y < m; y++, O++) l._values.splice(B + O, 0, g), l._index.splice(B + O, 0, y), S++;
          }
          l._ptr[F] = l._values.length;
        }
      } else if (m < _) {
        var x = 0;
        for (M = 0; M < F; M++) {
          l._ptr[M] = l._ptr[M] - x;
          var z = l._ptr[M], T = l._ptr[M + 1] - x;
          for (B = z; B < T; B++) y = l._index[B], y > m - 1 && (l._values.splice(B, 1), l._index.splice(B, 1), x++);
        }
        l._ptr[M] = l._values.length;
      }
      return l._size[0] = m, l._size[1] = D, l;
    }
    i.prototype.reshape = function(l, m) {
      if (!Wr(l)) throw new TypeError("Array expected");
      if (l.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
      l.forEach(function(Z) {
        if (!Pr(Z) || !qr(Z) || Z <= -2 || Z === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Lr(l) + ")");
      });
      var D = this._size[0] * this._size[1];
      l = Fn(l, D);
      var b = l[0] * l[1];
      if (D !== b) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
      var g = m ? this.clone() : this;
      if (this._size[0] === l[0] && this._size[1] === l[1]) return g;
      for (var C = [], A = 0; A < g._ptr.length; A++) for (var w = 0; w < g._ptr[A + 1] - g._ptr[A]; w++) C.push(A);
      for (var _ = g._values.slice(), F = g._index.slice(), y = 0; y < g._index.length; y++) {
        var M = F[y], B = C[y], S = M * g._size[1] + B;
        C[y] = S % l[1], F[y] = Math.floor(S / l[1]);
      }
      g._values.length = 0, g._index.length = 0, g._ptr.length = l[1] + 1, g._size = l.slice();
      for (var O = 0; O < g._ptr.length; O++) g._ptr[O] = 0;
      for (var x = 0; x < _.length; x++) {
        var z = F[x], T = C[x], J = _[x], q = f(z, g._ptr[T], g._ptr[T + 1], g._index);
        h(q, z, T, J, g._values, g._index, g._ptr);
      }
      return g;
    }, i.prototype.clone = function() {
      var l = new i({
        values: this._values ? Br(this._values) : void 0,
        index: Br(this._index),
        ptr: Br(this._ptr),
        size: Br(this._size),
        datatype: this._datatype
      });
      return l;
    }, i.prototype.size = function() {
      return this._size.slice(0);
    }, i.prototype.map = function(l, m) {
      if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
      var D = this, b = this._size[0], g = this._size[1], C = Tt(l, D, "map"), A = function(_, F, y) {
        return C(_, [
          F,
          y
        ], D);
      };
      return v(this, 0, b - 1, 0, g - 1, A, m);
    };
    function v(l, m, D, b, g, C, A) {
      var w = [], _ = [], F = [], y = t, M = 0;
      we(l._datatype) && (y = e.find(t, [
        l._datatype,
        l._datatype
      ]) || t, M = e.convert(0, l._datatype));
      for (var B = function(W, tr, or) {
        var rr = C(W, tr, or);
        y(rr, M) || (w.push(rr), _.push(tr));
      }, S = b; S <= g; S++) {
        F.push(w.length);
        var O = l._ptr[S], x = l._ptr[S + 1];
        if (A) for (var z = O; z < x; z++) {
          var T = l._index[z];
          T >= m && T <= D && B(l._values[z], T - m, S - b);
        }
        else {
          for (var J = {}, q = O; q < x; q++) {
            var Z = l._index[q];
            J[Z] = l._values[q];
          }
          for (var nr = m; nr <= D; nr++) {
            var fr = nr in J ? J[nr] : 0;
            B(fr, nr - m, S - b);
          }
        }
      }
      return F.push(w.length), new i({
        values: w,
        index: _,
        ptr: F,
        size: [
          D - m + 1,
          g - b + 1
        ]
      });
    }
    i.prototype.forEach = function(l, m) {
      if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
      for (var D = this, b = this._size[0], g = this._size[1], C = Tt(l, D, "forEach"), A = 0; A < g; A++) {
        var w = this._ptr[A], _ = this._ptr[A + 1];
        if (m) for (var F = w; F < _; F++) {
          var y = this._index[F];
          C(this._values[F], [
            y,
            A
          ], D);
        }
        else {
          for (var M = {}, B = w; B < _; B++) {
            var S = this._index[B];
            M[S] = this._values[B];
          }
          for (var O = 0; O < b; O++) {
            var x = O in M ? M[O] : 0;
            C(x, [
              O,
              A
            ], D);
          }
        }
      }
    }, i.prototype[Symbol.iterator] = function* () {
      if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
      for (var l = this._size[1], m = 0; m < l; m++) for (var D = this._ptr[m], b = this._ptr[m + 1], g = D; g < b; g++) {
        var C = this._index[g];
        yield {
          value: this._values[g],
          index: [
            C,
            m
          ]
        };
      }
    }, i.prototype.toArray = function() {
      return d(this._values, this._index, this._ptr, this._size, true);
    }, i.prototype.valueOf = function() {
      return d(this._values, this._index, this._ptr, this._size, false);
    };
    function d(l, m, D, b, g) {
      var C = b[0], A = b[1], w = [], _, F;
      for (_ = 0; _ < C; _++) for (w[_] = [], F = 0; F < A; F++) w[_][F] = 0;
      for (F = 0; F < A; F++) for (var y = D[F], M = D[F + 1], B = y; B < M; B++) _ = m[B], w[_][F] = l ? g ? Br(l[B]) : l[B] : 1;
      return w;
    }
    return i.prototype.format = function(l) {
      for (var m = this._size[0], D = this._size[1], b = this.density(), g = "Sparse Matrix [" + Lr(m, l) + " x " + Lr(D, l) + "] density: " + Lr(b, l) + `
`, C = 0; C < D; C++) for (var A = this._ptr[C], w = this._ptr[C + 1], _ = A; _ < w; _++) {
        var F = this._index[_];
        g += `
    (` + Lr(F, l) + ", " + Lr(C, l) + ") ==> " + (this._values ? Lr(this._values[_], l) : "X");
      }
      return g;
    }, i.prototype.toString = function() {
      return Lr(this.toArray());
    }, i.prototype.toJSON = function() {
      return {
        mathjs: "SparseMatrix",
        values: this._values,
        index: this._index,
        ptr: this._ptr,
        size: this._size,
        datatype: this._datatype
      };
    }, i.prototype.diagonal = function(l) {
      if (l) {
        if (Yr(l) && (l = l.toNumber()), !Pr(l) || !qr(l)) throw new TypeError("The parameter k must be an integer number");
      } else l = 0;
      var m = l > 0 ? l : 0, D = l < 0 ? -l : 0, b = this._size[0], g = this._size[1], C = Math.min(b - D, g - m), A = [], w = [], _ = [];
      _[0] = 0;
      for (var F = m; F < g && A.length < C; F++) for (var y = this._ptr[F], M = this._ptr[F + 1], B = y; B < M; B++) {
        var S = this._index[B];
        if (S === F - m + D) {
          A.push(this._values[B]), w[A.length - 1] = S - D;
          break;
        }
      }
      return _.push(A.length), new i({
        values: A,
        index: w,
        ptr: _,
        size: [
          C,
          1
        ]
      });
    }, i.fromJSON = function(l) {
      return new i(l);
    }, i.diagonal = function(l, m, D, b, g) {
      if (!Wr(l)) throw new TypeError("Array expected, size parameter");
      if (l.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (l = l.map(function(Z) {
        if (Yr(Z) && (Z = Z.toNumber()), !Pr(Z) || !qr(Z) || Z < 1) throw new Error("Size values must be positive integers");
        return Z;
      }), D) {
        if (Yr(D) && (D = D.toNumber()), !Pr(D) || !qr(D)) throw new TypeError("The parameter k must be an integer number");
      } else D = 0;
      var C = t, A = 0;
      we(g) && (C = e.find(t, [
        g,
        g
      ]) || t, A = e.convert(0, g));
      var w = D > 0 ? D : 0, _ = D < 0 ? -D : 0, F = l[0], y = l[1], M = Math.min(F - _, y - w), B;
      if (Wr(m)) {
        if (m.length !== M) throw new Error("Invalid value array length");
        B = function(nr) {
          return m[nr];
        };
      } else if (zr(m)) {
        var S = m.size();
        if (S.length !== 1 || S[0] !== M) throw new Error("Invalid matrix length");
        B = function(nr) {
          return m.get([
            nr
          ]);
        };
      } else B = function() {
        return m;
      };
      for (var O = [], x = [], z = [], T = 0; T < y; T++) {
        z.push(O.length);
        var J = T - w;
        if (J >= 0 && J < M) {
          var q = B(J);
          C(q, A) || (x.push(J + _), O.push(q));
        }
      }
      return z.push(O.length), new i({
        values: O,
        index: x,
        ptr: z,
        size: [
          F,
          y
        ]
      });
    }, i.prototype.swapRows = function(l, m) {
      if (!Pr(l) || !qr(l) || !Pr(m) || !qr(m)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return Vr(l, this._size[0]), Vr(m, this._size[0]), i._swapRows(l, m, this._size[1], this._values, this._index, this._ptr), this;
    }, i._forEachRow = function(l, m, D, b, g) {
      for (var C = b[l], A = b[l + 1], w = C; w < A; w++) g(D[w], m[w]);
    }, i._swapRows = function(l, m, D, b, g, C) {
      for (var A = 0; A < D; A++) {
        var w = C[A], _ = C[A + 1], F = f(l, w, _, g), y = f(m, w, _, g);
        if (F < _ && y < _ && g[F] === l && g[y] === m) {
          if (b) {
            var M = b[F];
            b[F] = b[y], b[y] = M;
          }
          continue;
        }
        if (F < _ && g[F] === l && (y >= _ || g[y] !== m)) {
          var B = b ? b[F] : void 0;
          g.splice(y, 0, m), b && b.splice(y, 0, B), g.splice(y <= F ? F + 1 : F, 1), b && b.splice(y <= F ? F + 1 : F, 1);
          continue;
        }
        if (y < _ && g[y] === m && (F >= _ || g[F] !== l)) {
          var S = b ? b[y] : void 0;
          g.splice(F, 0, l), b && b.splice(F, 0, S), g.splice(F <= y ? y + 1 : y, 1), b && b.splice(F <= y ? y + 1 : y, 1);
        }
      }
    }, i;
  }, {
    isClass: true
  }), Ls = "number", Zs = [
    "typed"
  ];
  function Ws(r) {
    var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
    if (e) {
      var t = {
        "0b": 2,
        "0o": 8,
        "0x": 16
      }[e[1]], n = e[2], i = e[3];
      return {
        input: r,
        radix: t,
        integerPart: n,
        fractionalPart: i
      };
    } else return null;
  }
  function Vs(r) {
    for (var e = parseInt(r.integerPart, r.radix), t = 0, n = 0; n < r.fractionalPart.length; n++) {
      var i = parseInt(r.fractionalPart[n], r.radix);
      t += i / Math.pow(r.radix, n + 1);
    }
    var u = e + t;
    if (isNaN(u)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
    return u;
  }
  var Ys = ir(Ls, Zs, (r) => {
    var { typed: e } = r, t = e("number", {
      "": function() {
        return 0;
      },
      number: function(i) {
        return i;
      },
      string: function(i) {
        if (i === "NaN") return NaN;
        var u = Ws(i);
        if (u) return Vs(u);
        var a = 0, c = i.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        c && (a = Number(c[2]), i = c[1]);
        var s = Number(i);
        if (isNaN(s)) throw new SyntaxError('String "' + i + '" is not a valid number');
        if (c) {
          if (s > 2 ** a - 1) throw new SyntaxError('String "'.concat(i, '" is out of range'));
          s >= 2 ** (a - 1) && (s = s - 2 ** a);
        }
        return s;
      },
      BigNumber: function(i) {
        return i.toNumber();
      },
      bigint: function(i) {
        return Number(i);
      },
      Fraction: function(i) {
        return i.valueOf();
      },
      Unit: e.referToSelf((n) => (i) => {
        var u = i.clone();
        return u.value = n(i.value), u;
      }),
      null: function(i) {
        return 0;
      },
      "Unit, string | Unit": function(i, u) {
        return i.toNumber(u);
      },
      "Array | Matrix": e.referToSelf((n) => (i) => de(i, n))
    });
    return t.fromJSON = function(n) {
      return parseFloat(n.value);
    }, t;
  }), Gs = "bignumber", Js = [
    "typed",
    "BigNumber"
  ], Qs = ir(Gs, Js, (r) => {
    var { typed: e, BigNumber: t } = r;
    return e("bignumber", {
      "": function() {
        return new t(0);
      },
      number: function(i) {
        return new t(i + "");
      },
      string: function(i) {
        var u = i.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        if (u) {
          var a = u[2], c = t(u[1]), s = new t(2).pow(Number(a));
          if (c.gt(s.sub(1))) throw new SyntaxError('String "'.concat(i, '" is out of range'));
          var f = new t(2).pow(Number(a) - 1);
          return c.gte(f) ? c.sub(s) : c;
        }
        return new t(i);
      },
      BigNumber: function(i) {
        return i;
      },
      bigint: function(i) {
        return new t(i.toString());
      },
      Unit: e.referToSelf((n) => (i) => {
        var u = i.clone();
        return u.value = n(i.value), u;
      }),
      Fraction: function(i) {
        return new t(String(i.n)).div(String(i.d)).times(String(i.s));
      },
      null: function(i) {
        return new t(0);
      },
      "Array | Matrix": e.referToSelf((n) => (i) => de(i, n))
    });
  }), Xs = "complex", Hs = [
    "typed",
    "Complex"
  ], Ks = ir(Xs, Hs, (r) => {
    var { typed: e, Complex: t } = r;
    return e("complex", {
      "": function() {
        return t.ZERO;
      },
      number: function(i) {
        return new t(i, 0);
      },
      "number, number": function(i, u) {
        return new t(i, u);
      },
      "BigNumber, BigNumber": function(i, u) {
        return new t(i.toNumber(), u.toNumber());
      },
      Fraction: function(i) {
        return new t(i.valueOf(), 0);
      },
      Complex: function(i) {
        return i.clone();
      },
      string: function(i) {
        return t(i);
      },
      null: function(i) {
        return t(0);
      },
      Object: function(i) {
        if ("re" in i && "im" in i) return new t(i.re, i.im);
        if ("r" in i && "phi" in i || "abs" in i && "arg" in i) return new t(i);
        throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
      },
      "Array | Matrix": e.referToSelf((n) => (i) => de(i, n))
    });
  }), ks = "fraction", js = [
    "typed",
    "Fraction"
  ], rf = ir(ks, js, (r) => {
    var { typed: e, Fraction: t } = r;
    return e("fraction", {
      number: function(i) {
        if (!isFinite(i) || isNaN(i)) throw new Error(i + " cannot be represented as a fraction");
        return new t(i);
      },
      string: function(i) {
        return new t(i);
      },
      "number, number": function(i, u) {
        return new t(i, u);
      },
      "bigint, bigint": function(i, u) {
        return new t(i, u);
      },
      null: function(i) {
        return new t(0);
      },
      BigNumber: function(i) {
        return new t(i.toString());
      },
      bigint: function(i) {
        return new t(i.toString());
      },
      Fraction: function(i) {
        return i;
      },
      Unit: e.referToSelf((n) => (i) => {
        var u = i.clone();
        return u.value = n(i.value), u;
      }),
      Object: function(i) {
        return new t(i);
      },
      "Array | Matrix": e.referToSelf((n) => (i) => de(i, n))
    });
  }), ei = "matrix", ef = [
    "typed",
    "Matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], tf = ir(ei, ef, (r) => {
    var { typed: e, Matrix: t, DenseMatrix: n, SparseMatrix: i } = r;
    return e(ei, {
      "": function() {
        return u([]);
      },
      string: function(c) {
        return u([], c);
      },
      "string, string": function(c, s) {
        return u([], c, s);
      },
      Array: function(c) {
        return u(c);
      },
      Matrix: function(c) {
        return u(c, c.storage());
      },
      "Array | Matrix, string": u,
      "Array | Matrix, string, string": u
    });
    function u(a, c, s) {
      if (c === "dense" || c === "default" || c === void 0) return new n(a, s);
      if (c === "sparse") return new i(a, s);
      throw new TypeError("Unknown matrix type " + JSON.stringify(c) + ".");
    }
  }), ti = "matrixFromColumns", nf = [
    "typed",
    "matrix",
    "flatten",
    "size"
  ], uf = ir(ti, nf, (r) => {
    var { typed: e, matrix: t, flatten: n, size: i } = r;
    return e(ti, {
      "...Array": function(s) {
        return u(s);
      },
      "...Matrix": function(s) {
        return t(u(s.map((f) => f.toArray())));
      }
    });
    function u(c) {
      if (c.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
      for (var s = a(c[0]), f = [], o = 0; o < s; o++) f[o] = [];
      for (var h of c) {
        var p = a(h);
        if (p !== s) throw new TypeError("The vectors had different length: " + (s | 0) + " \u2260 " + (p | 0));
        for (var v = n(h), d = 0; d < s; d++) f[d].push(v[d]);
      }
      return f;
    }
    function a(c) {
      var s = i(c);
      if (s.length === 1) return s[0];
      if (s.length === 2) {
        if (s[0] === 1) return s[1];
        if (s[1] === 1) return s[0];
        throw new TypeError("At least one of the arguments is not a vector.");
      } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
    }
  }), ni = "unaryMinus", af = [
    "typed"
  ], of = ir(ni, af, (r) => {
    var { typed: e } = r;
    return e(ni, {
      number: Au,
      "Complex | BigNumber | Fraction": (t) => t.neg(),
      bigint: (t) => -t,
      Unit: e.referToSelf((t) => (n) => {
        var i = n.clone();
        return i.value = e.find(t, i.valueType())(n.value), i;
      }),
      "Array | Matrix": e.referToSelf((t) => (n) => de(n, t, true))
    });
  }), ii = "abs", sf = [
    "typed"
  ], ff = ir(ii, sf, (r) => {
    var { typed: e } = r;
    return e(ii, {
      number: Du,
      "Complex | BigNumber | Fraction | Unit": (t) => t.abs(),
      bigint: (t) => t < 0n ? -t : t,
      "Array | Matrix": e.referToSelf((t) => (n) => de(n, t, true))
    });
  }), ui = "addScalar", cf = [
    "typed"
  ], lf = ir(ui, cf, (r) => {
    var { typed: e } = r;
    return e(ui, {
      "number, number": gu,
      "Complex, Complex": function(n, i) {
        return n.add(i);
      },
      "BigNumber, BigNumber": function(n, i) {
        return n.plus(i);
      },
      "bigint, bigint": function(n, i) {
        return n + i;
      },
      "Fraction, Fraction": function(n, i) {
        return n.add(i);
      },
      "Unit, Unit": e.referToSelf((t) => (n, i) => {
        if (n.value === null || n.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (i.value === null || i.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!n.equalBase(i)) throw new Error("Units do not match");
        var u = n.clone();
        return u.value = e.find(t, [
          u.valueType(),
          i.valueType()
        ])(u.value, i.value), u.fixPrefix = false, u;
      })
    });
  }), ai = "subtractScalar", hf = [
    "typed"
  ], vf = ir(ai, hf, (r) => {
    var { typed: e } = r;
    return e(ai, {
      "number, number": yu,
      "Complex, Complex": function(n, i) {
        return n.sub(i);
      },
      "BigNumber, BigNumber": function(n, i) {
        return n.minus(i);
      },
      "bigint, bigint": function(n, i) {
        return n - i;
      },
      "Fraction, Fraction": function(n, i) {
        return n.sub(i);
      },
      "Unit, Unit": e.referToSelf((t) => (n, i) => {
        if (n.value === null || n.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (i.value === null || i.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!n.equalBase(i)) throw new Error("Units do not match");
        var u = n.clone();
        return u.value = e.find(t, [
          u.valueType(),
          i.valueType()
        ])(u.value, i.value), u.fixPrefix = false, u;
      })
    });
  }), pf = "matAlgo11xS0s", df = [
    "typed",
    "equalScalar"
  ], bu = ir(pf, df, (r) => {
    var { typed: e, equalScalar: t } = r;
    return function(i, u, a, c) {
      var s = i._values, f = i._index, o = i._ptr, h = i._size, p = i._datatype;
      if (!s) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = h[0], d = h[1], l, m = t, D = 0, b = a;
      typeof p == "string" && (l = p, m = e.find(t, [
        l,
        l
      ]), D = e.convert(0, l), u = e.convert(u, l), b = e.find(a, [
        l,
        l
      ]));
      for (var g = [], C = [], A = [], w = 0; w < d; w++) {
        A[w] = C.length;
        for (var _ = o[w], F = o[w + 1], y = _; y < F; y++) {
          var M = f[y], B = c ? b(u, s[y]) : b(s[y], u);
          m(B, D) || (C.push(M), g.push(B));
        }
      }
      return A[d] = C.length, i.createSparseMatrix({
        values: g,
        index: C,
        ptr: A,
        size: [
          v,
          d
        ],
        datatype: l
      });
    };
  }), mf = "matAlgo12xSfs", Df = [
    "typed",
    "DenseMatrix"
  ], et = ir(mf, Df, (r) => {
    var { typed: e, DenseMatrix: t } = r;
    return function(i, u, a, c) {
      var s = i._values, f = i._index, o = i._ptr, h = i._size, p = i._datatype;
      if (!s) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = h[0], d = h[1], l, m = a;
      typeof p == "string" && (l = p, u = e.convert(u, l), m = e.find(a, [
        l,
        l
      ]));
      for (var D = [], b = [], g = [], C = 0; C < d; C++) {
        for (var A = C + 1, w = o[C], _ = o[C + 1], F = w; F < _; F++) {
          var y = f[F];
          b[y] = s[F], g[y] = A;
        }
        for (var M = 0; M < v; M++) C === 0 && (D[M] = []), g[M] === A ? D[M][C] = c ? m(u, b[M]) : m(b[M], u) : D[M][C] = c ? m(u, 0) : m(0, u);
      }
      return new t({
        data: D,
        size: [
          v,
          d
        ],
        datatype: l
      });
    };
  }), gf = "matAlgo14xDs", yf = [
    "typed"
  ], bn = ir(gf, yf, (r) => {
    var { typed: e } = r;
    return function(i, u, a, c) {
      var s = i._data, f = i._size, o = i._datatype, h, p = a;
      typeof o == "string" && (h = o, u = e.convert(u, h), p = e.find(a, [
        h,
        h
      ]));
      var v = f.length > 0 ? t(p, 0, f, f[0], s, u, c) : [];
      return i.createDenseMatrix({
        data: v,
        size: Br(f),
        datatype: h
      });
    };
    function t(n, i, u, a, c, s, f) {
      var o = [];
      if (i === u.length - 1) for (var h = 0; h < a; h++) o[h] = f ? n(s, c[h]) : n(c[h], s);
      else for (var p = 0; p < a; p++) o[p] = t(n, i + 1, u, u[i + 1], c[p], s, f);
      return o;
    }
  }), wf = "matAlgo03xDSf", Af = [
    "typed"
  ], tt = ir(wf, Af, (r) => {
    var { typed: e } = r;
    return function(n, i, u, a) {
      var c = n._data, s = n._size, f = n._datatype || n.getDataType(), o = i._values, h = i._index, p = i._ptr, v = i._size, d = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
      if (s.length !== v.length) throw new Nr(s.length, v.length);
      if (s[0] !== v[0] || s[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + v + ")");
      if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var l = s[0], m = s[1], D, b = 0, g = u;
      typeof f == "string" && f === d && f !== "mixed" && (D = f, b = e.convert(0, D), g = e.find(u, [
        D,
        D
      ]));
      for (var C = [], A = 0; A < l; A++) C[A] = [];
      for (var w = [], _ = [], F = 0; F < m; F++) {
        for (var y = F + 1, M = p[F], B = p[F + 1], S = M; S < B; S++) {
          var O = h[S];
          w[O] = a ? g(o[S], c[O][F]) : g(c[O][F], o[S]), _[O] = y;
        }
        for (var x = 0; x < l; x++) _[x] === y ? C[x][F] = w[x] : C[x][F] = a ? g(b, c[x][F]) : g(c[x][F], b);
      }
      return n.createDenseMatrix({
        data: C,
        size: [
          l,
          m
        ],
        datatype: f === n._datatype && d === i._datatype ? D : void 0
      });
    };
  }), Ff = "matAlgo05xSfSf", Ef = [
    "typed",
    "equalScalar"
  ], bf = ir(Ff, Ef, (r) => {
    var { typed: e, equalScalar: t } = r;
    return function(i, u, a) {
      var c = i._values, s = i._index, f = i._ptr, o = i._size, h = i._datatype || i._data === void 0 ? i._datatype : i.getDataType(), p = u._values, v = u._index, d = u._ptr, l = u._size, m = u._datatype || u._data === void 0 ? u._datatype : u.getDataType();
      if (o.length !== l.length) throw new Nr(o.length, l.length);
      if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
      var D = o[0], b = o[1], g, C = t, A = 0, w = a;
      typeof h == "string" && h === m && h !== "mixed" && (g = h, C = e.find(t, [
        g,
        g
      ]), A = e.convert(0, g), w = e.find(a, [
        g,
        g
      ]));
      var _ = c && p ? [] : void 0, F = [], y = [], M = _ ? [] : void 0, B = _ ? [] : void 0, S = [], O = [], x, z, T, J;
      for (z = 0; z < b; z++) {
        y[z] = F.length;
        var q = z + 1;
        for (T = f[z], J = f[z + 1]; T < J; T++) x = s[T], F.push(x), S[x] = q, M && (M[x] = c[T]);
        for (T = d[z], J = d[z + 1]; T < J; T++) x = v[T], S[x] !== q && F.push(x), O[x] = q, B && (B[x] = p[T]);
        if (_) for (T = y[z]; T < F.length; ) {
          x = F[T];
          var Z = S[x], nr = O[x];
          if (Z === q || nr === q) {
            var fr = Z === q ? M[x] : A, R = nr === q ? B[x] : A, W = w(fr, R);
            C(W, A) ? F.splice(T, 1) : (_.push(W), T++);
          }
        }
      }
      return y[b] = F.length, i.createSparseMatrix({
        values: _,
        index: F,
        ptr: y,
        size: [
          D,
          b
        ],
        datatype: h === i._datatype && m === u._datatype ? g : void 0
      });
    };
  }), Cf = "matAlgo13xDD", _f = [
    "typed"
  ], Bf = ir(Cf, _f, (r) => {
    var { typed: e } = r;
    return function(i, u, a) {
      var c = i._data, s = i._size, f = i._datatype, o = u._data, h = u._size, p = u._datatype, v = [];
      if (s.length !== h.length) throw new Nr(s.length, h.length);
      for (var d = 0; d < s.length; d++) {
        if (s[d] !== h[d]) throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + h + ")");
        v[d] = s[d];
      }
      var l, m = a;
      typeof f == "string" && f === p && (l = f, m = e.find(a, [
        l,
        l
      ]));
      var D = v.length > 0 ? t(m, 0, v, v[0], c, o) : [];
      return i.createDenseMatrix({
        data: D,
        size: v,
        datatype: l
      });
    };
    function t(n, i, u, a, c, s) {
      var f = [];
      if (i === u.length - 1) for (var o = 0; o < a; o++) f[o] = n(c[o], s[o]);
      else for (var h = 0; h < a; h++) f[h] = t(n, i + 1, u, u[i + 1], c[h], s[h]);
      return f;
    }
  });
  function Kr(r, e) {
    if ($e(r.size(), e.size())) return [
      r,
      e
    ];
    var t = pu(r.size(), e.size());
    return [
      r,
      e
    ].map((n) => Mf(n, t));
  }
  function Mf(r, e) {
    return $e(r.size(), e) ? r : r.create(vn(r.valueOf(), e), r.datatype());
  }
  var Sf = "matrixAlgorithmSuite", Nf = [
    "typed",
    "matrix"
  ], Ze = ir(Sf, Nf, (r) => {
    var { typed: e, matrix: t } = r, n = Bf({
      typed: e
    }), i = bn({
      typed: e
    });
    return function(a) {
      var c = a.elop, s = a.SD || a.DS, f;
      c ? (f = {
        "DenseMatrix, DenseMatrix": (v, d) => n(...Kr(v, d), c),
        "Array, Array": (v, d) => n(...Kr(t(v), t(d)), c).valueOf(),
        "Array, DenseMatrix": (v, d) => n(...Kr(t(v), d), c),
        "DenseMatrix, Array": (v, d) => n(...Kr(v, t(d)), c)
      }, a.SS && (f["SparseMatrix, SparseMatrix"] = (v, d) => a.SS(...Kr(v, d), c, false)), a.DS && (f["DenseMatrix, SparseMatrix"] = (v, d) => a.DS(...Kr(v, d), c, false), f["Array, SparseMatrix"] = (v, d) => a.DS(...Kr(t(v), d), c, false)), s && (f["SparseMatrix, DenseMatrix"] = (v, d) => s(...Kr(d, v), c, true), f["SparseMatrix, Array"] = (v, d) => s(...Kr(t(d), v), c, true))) : (f = {
        "DenseMatrix, DenseMatrix": e.referToSelf((v) => (d, l) => n(...Kr(d, l), v)),
        "Array, Array": e.referToSelf((v) => (d, l) => n(...Kr(t(d), t(l)), v).valueOf()),
        "Array, DenseMatrix": e.referToSelf((v) => (d, l) => n(...Kr(t(d), l), v)),
        "DenseMatrix, Array": e.referToSelf((v) => (d, l) => n(...Kr(d, t(l)), v))
      }, a.SS && (f["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (d, l) => a.SS(...Kr(d, l), v, false))), a.DS && (f["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (d, l) => a.DS(...Kr(d, l), v, false)), f["Array, SparseMatrix"] = e.referToSelf((v) => (d, l) => a.DS(...Kr(t(d), l), v, false))), s && (f["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (d, l) => s(...Kr(l, d), v, true)), f["SparseMatrix, Array"] = e.referToSelf((v) => (d, l) => s(...Kr(t(l), d), v, true))));
      var o = a.scalar || "any", h = a.Ds || a.Ss;
      h && (c ? (f["DenseMatrix," + o] = (v, d) => i(v, d, c, false), f[o + ", DenseMatrix"] = (v, d) => i(d, v, c, true), f["Array," + o] = (v, d) => i(t(v), d, c, false).valueOf(), f[o + ", Array"] = (v, d) => i(t(d), v, c, true).valueOf()) : (f["DenseMatrix," + o] = e.referToSelf((v) => (d, l) => i(d, l, v, false)), f[o + ", DenseMatrix"] = e.referToSelf((v) => (d, l) => i(l, d, v, true)), f["Array," + o] = e.referToSelf((v) => (d, l) => i(t(d), l, v, false).valueOf()), f[o + ", Array"] = e.referToSelf((v) => (d, l) => i(t(l), d, v, true).valueOf())));
      var p = a.sS !== void 0 ? a.sS : a.Ss;
      return c ? (a.Ss && (f["SparseMatrix," + o] = (v, d) => a.Ss(v, d, c, false)), p && (f[o + ", SparseMatrix"] = (v, d) => p(d, v, c, true))) : (a.Ss && (f["SparseMatrix," + o] = e.referToSelf((v) => (d, l) => a.Ss(d, l, v, false))), p && (f[o + ", SparseMatrix"] = e.referToSelf((v) => (d, l) => p(l, d, v, true)))), c && c.signatures && Vi(f, c.signatures), f;
    };
  }), xf = "matAlgo01xDSid", Tf = [
    "typed"
  ], Cu = ir(xf, Tf, (r) => {
    var { typed: e } = r;
    return function(n, i, u, a) {
      var c = n._data, s = n._size, f = n._datatype || n.getDataType(), o = i._values, h = i._index, p = i._ptr, v = i._size, d = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
      if (s.length !== v.length) throw new Nr(s.length, v.length);
      if (s[0] !== v[0] || s[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + v + ")");
      if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var l = s[0], m = s[1], D = typeof f == "string" && f !== "mixed" && f === d ? f : void 0, b = D ? e.find(u, [
        D,
        D
      ]) : u, g, C, A = [];
      for (g = 0; g < l; g++) A[g] = [];
      var w = [], _ = [];
      for (C = 0; C < m; C++) {
        for (var F = C + 1, y = p[C], M = p[C + 1], B = y; B < M; B++) g = h[B], w[g] = a ? b(o[B], c[g][C]) : b(c[g][C], o[B]), _[g] = F;
        for (g = 0; g < l; g++) _[g] === F ? A[g][C] = w[g] : A[g][C] = c[g][C];
      }
      return n.createDenseMatrix({
        data: A,
        size: [
          l,
          m
        ],
        datatype: f === n._datatype && d === i._datatype ? D : void 0
      });
    };
  }), If = "matAlgo04xSidSid", Of = [
    "typed",
    "equalScalar"
  ], zf = ir(If, Of, (r) => {
    var { typed: e, equalScalar: t } = r;
    return function(i, u, a) {
      var c = i._values, s = i._index, f = i._ptr, o = i._size, h = i._datatype || i._data === void 0 ? i._datatype : i.getDataType(), p = u._values, v = u._index, d = u._ptr, l = u._size, m = u._datatype || u._data === void 0 ? u._datatype : u.getDataType();
      if (o.length !== l.length) throw new Nr(o.length, l.length);
      if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
      var D = o[0], b = o[1], g, C = t, A = 0, w = a;
      typeof h == "string" && h === m && h !== "mixed" && (g = h, C = e.find(t, [
        g,
        g
      ]), A = e.convert(0, g), w = e.find(a, [
        g,
        g
      ]));
      var _ = c && p ? [] : void 0, F = [], y = [], M = c && p ? [] : void 0, B = c && p ? [] : void 0, S = [], O = [], x, z, T, J, q;
      for (z = 0; z < b; z++) {
        y[z] = F.length;
        var Z = z + 1;
        for (J = f[z], q = f[z + 1], T = J; T < q; T++) x = s[T], F.push(x), S[x] = Z, M && (M[x] = c[T]);
        for (J = d[z], q = d[z + 1], T = J; T < q; T++) if (x = v[T], S[x] === Z) {
          if (M) {
            var nr = w(M[x], p[T]);
            C(nr, A) ? S[x] = null : M[x] = nr;
          }
        } else F.push(x), O[x] = Z, B && (B[x] = p[T]);
        if (M && B) for (T = y[z]; T < F.length; ) x = F[T], S[x] === Z ? (_[T] = M[x], T++) : O[x] === Z ? (_[T] = B[x], T++) : F.splice(T, 1);
      }
      return y[b] = F.length, i.createSparseMatrix({
        values: _,
        index: F,
        ptr: y,
        size: [
          D,
          b
        ],
        datatype: h === i._datatype && m === u._datatype ? g : void 0
      });
    };
  }), $f = "matAlgo10xSids", Pf = [
    "typed",
    "DenseMatrix"
  ], _u = ir($f, Pf, (r) => {
    var { typed: e, DenseMatrix: t } = r;
    return function(i, u, a, c) {
      var s = i._values, f = i._index, o = i._ptr, h = i._size, p = i._datatype;
      if (!s) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = h[0], d = h[1], l, m = a;
      typeof p == "string" && (l = p, u = e.convert(u, l), m = e.find(a, [
        l,
        l
      ]));
      for (var D = [], b = [], g = [], C = 0; C < d; C++) {
        for (var A = C + 1, w = o[C], _ = o[C + 1], F = w; F < _; F++) {
          var y = f[F];
          b[y] = s[F], g[y] = A;
        }
        for (var M = 0; M < v; M++) C === 0 && (D[M] = []), g[M] === A ? D[M][C] = c ? m(u, b[M]) : m(b[M], u) : D[M][C] = u;
      }
      return new t({
        data: D,
        size: [
          v,
          d
        ],
        datatype: l
      });
    };
  }), Rf = "multiplyScalar", qf = [
    "typed"
  ], Uf = ir(Rf, qf, (r) => {
    var { typed: e } = r;
    return e("multiplyScalar", {
      "number, number": wu,
      "Complex, Complex": function(n, i) {
        return n.mul(i);
      },
      "BigNumber, BigNumber": function(n, i) {
        return n.times(i);
      },
      "bigint, bigint": function(n, i) {
        return n * i;
      },
      "Fraction, Fraction": function(n, i) {
        return n.mul(i);
      },
      "number | Fraction | BigNumber | Complex, Unit": (t, n) => n.multiply(t),
      "Unit, number | Fraction | BigNumber | Complex | Unit": (t, n) => t.multiply(n)
    });
  }), oi = "multiply", Lf = [
    "typed",
    "matrix",
    "addScalar",
    "multiplyScalar",
    "equalScalar",
    "dot"
  ], Zf = ir(oi, Lf, (r) => {
    var { typed: e, matrix: t, addScalar: n, multiplyScalar: i, equalScalar: u, dot: a } = r, c = bu({
      typed: e,
      equalScalar: u
    }), s = bn({
      typed: e
    });
    function f(A, w) {
      switch (A.length) {
        case 1:
          switch (w.length) {
            case 1:
              if (A[0] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
              break;
            case 2:
              if (A[0] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + A[0] + ") must match Matrix rows (" + w[0] + ")");
              break;
            default:
              throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + w.length + " dimensions)");
          }
          break;
        case 2:
          switch (w.length) {
            case 1:
              if (A[1] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + A[1] + ") must match Vector length (" + w[0] + ")");
              break;
            case 2:
              if (A[1] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + A[1] + ") must match Matrix B rows (" + w[0] + ")");
              break;
            default:
              throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + w.length + " dimensions)");
          }
          break;
        default:
          throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + A.length + " dimensions)");
      }
    }
    function o(A, w, _) {
      if (_ === 0) throw new Error("Cannot multiply two empty vectors");
      return a(A, w);
    }
    function h(A, w) {
      if (w.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
      return p(A, w);
    }
    function p(A, w) {
      var _ = A._data, F = A._size, y = A._datatype || A.getDataType(), M = w._data, B = w._size, S = w._datatype || w.getDataType(), O = F[0], x = B[1], z, T = n, J = i;
      y && S && y === S && typeof y == "string" && y !== "mixed" && (z = y, T = e.find(n, [
        z,
        z
      ]), J = e.find(i, [
        z,
        z
      ]));
      for (var q = [], Z = 0; Z < x; Z++) {
        for (var nr = J(_[0], M[0][Z]), fr = 1; fr < O; fr++) nr = T(nr, J(_[fr], M[fr][Z]));
        q[Z] = nr;
      }
      return A.createDenseMatrix({
        data: q,
        size: [
          x
        ],
        datatype: y === A._datatype && S === w._datatype ? z : void 0
      });
    }
    var v = e("_multiplyMatrixVector", {
      "DenseMatrix, any": l,
      "SparseMatrix, any": b
    }), d = e("_multiplyMatrixMatrix", {
      "DenseMatrix, DenseMatrix": m,
      "DenseMatrix, SparseMatrix": D,
      "SparseMatrix, DenseMatrix": g,
      "SparseMatrix, SparseMatrix": C
    });
    function l(A, w) {
      var _ = A._data, F = A._size, y = A._datatype || A.getDataType(), M = w._data, B = w._datatype || w.getDataType(), S = F[0], O = F[1], x, z = n, T = i;
      y && B && y === B && typeof y == "string" && y !== "mixed" && (x = y, z = e.find(n, [
        x,
        x
      ]), T = e.find(i, [
        x,
        x
      ]));
      for (var J = [], q = 0; q < S; q++) {
        for (var Z = _[q], nr = T(Z[0], M[0]), fr = 1; fr < O; fr++) nr = z(nr, T(Z[fr], M[fr]));
        J[q] = nr;
      }
      return A.createDenseMatrix({
        data: J,
        size: [
          S
        ],
        datatype: y === A._datatype && B === w._datatype ? x : void 0
      });
    }
    function m(A, w) {
      var _ = A._data, F = A._size, y = A._datatype || A.getDataType(), M = w._data, B = w._size, S = w._datatype || w.getDataType(), O = F[0], x = F[1], z = B[1], T, J = n, q = i;
      y && S && y === S && typeof y == "string" && y !== "mixed" && y !== "mixed" && (T = y, J = e.find(n, [
        T,
        T
      ]), q = e.find(i, [
        T,
        T
      ]));
      for (var Z = [], nr = 0; nr < O; nr++) {
        var fr = _[nr];
        Z[nr] = [];
        for (var R = 0; R < z; R++) {
          for (var W = q(fr[0], M[0][R]), tr = 1; tr < x; tr++) W = J(W, q(fr[tr], M[tr][R]));
          Z[nr][R] = W;
        }
      }
      return A.createDenseMatrix({
        data: Z,
        size: [
          O,
          z
        ],
        datatype: y === A._datatype && S === w._datatype ? T : void 0
      });
    }
    function D(A, w) {
      var _ = A._data, F = A._size, y = A._datatype || A.getDataType(), M = w._values, B = w._index, S = w._ptr, O = w._size, x = w._datatype || w._data === void 0 ? w._datatype : w.getDataType();
      if (!M) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
      var z = F[0], T = O[1], J, q = n, Z = i, nr = u, fr = 0;
      y && x && y === x && typeof y == "string" && y !== "mixed" && (J = y, q = e.find(n, [
        J,
        J
      ]), Z = e.find(i, [
        J,
        J
      ]), nr = e.find(u, [
        J,
        J
      ]), fr = e.convert(0, J));
      for (var R = [], W = [], tr = [], or = w.createSparseMatrix({
        values: R,
        index: W,
        ptr: tr,
        size: [
          z,
          T
        ],
        datatype: y === A._datatype && x === w._datatype ? J : void 0
      }), rr = 0; rr < T; rr++) {
        tr[rr] = W.length;
        var G = S[rr], j = S[rr + 1];
        if (j > G) for (var Q = 0, X = 0; X < z; X++) {
          for (var cr = X + 1, er = void 0, hr = G; hr < j; hr++) {
            var gr = B[hr];
            Q !== cr ? (er = Z(_[X][gr], M[hr]), Q = cr) : er = q(er, Z(_[X][gr], M[hr]));
          }
          Q === cr && !nr(er, fr) && (W.push(X), R.push(er));
        }
      }
      return tr[T] = W.length, or;
    }
    function b(A, w) {
      var _ = A._values, F = A._index, y = A._ptr, M = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
      if (!_) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var B = w._data, S = w._datatype || w.getDataType(), O = A._size[0], x = w._size[0], z = [], T = [], J = [], q, Z = n, nr = i, fr = u, R = 0;
      M && S && M === S && typeof M == "string" && M !== "mixed" && (q = M, Z = e.find(n, [
        q,
        q
      ]), nr = e.find(i, [
        q,
        q
      ]), fr = e.find(u, [
        q,
        q
      ]), R = e.convert(0, q));
      var W = [], tr = [];
      J[0] = 0;
      for (var or = 0; or < x; or++) {
        var rr = B[or];
        if (!fr(rr, R)) for (var G = y[or], j = y[or + 1], Q = G; Q < j; Q++) {
          var X = F[Q];
          tr[X] ? W[X] = Z(W[X], nr(rr, _[Q])) : (tr[X] = true, T.push(X), W[X] = nr(rr, _[Q]));
        }
      }
      for (var cr = T.length, er = 0; er < cr; er++) {
        var hr = T[er];
        z[er] = W[hr];
      }
      return J[1] = T.length, A.createSparseMatrix({
        values: z,
        index: T,
        ptr: J,
        size: [
          O,
          1
        ],
        datatype: M === A._datatype && S === w._datatype ? q : void 0
      });
    }
    function g(A, w) {
      var _ = A._values, F = A._index, y = A._ptr, M = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
      if (!_) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var B = w._data, S = w._datatype || w.getDataType(), O = A._size[0], x = w._size[0], z = w._size[1], T, J = n, q = i, Z = u, nr = 0;
      M && S && M === S && typeof M == "string" && M !== "mixed" && (T = M, J = e.find(n, [
        T,
        T
      ]), q = e.find(i, [
        T,
        T
      ]), Z = e.find(u, [
        T,
        T
      ]), nr = e.convert(0, T));
      for (var fr = [], R = [], W = [], tr = A.createSparseMatrix({
        values: fr,
        index: R,
        ptr: W,
        size: [
          O,
          z
        ],
        datatype: M === A._datatype && S === w._datatype ? T : void 0
      }), or = [], rr = [], G = 0; G < z; G++) {
        W[G] = R.length;
        for (var j = G + 1, Q = 0; Q < x; Q++) {
          var X = B[Q][G];
          if (!Z(X, nr)) for (var cr = y[Q], er = y[Q + 1], hr = cr; hr < er; hr++) {
            var gr = F[hr];
            rr[gr] !== j ? (rr[gr] = j, R.push(gr), or[gr] = q(X, _[hr])) : or[gr] = J(or[gr], q(X, _[hr]));
          }
        }
        for (var Dr = W[G], wr = R.length, Fr = Dr; Fr < wr; Fr++) {
          var br = R[Fr];
          fr[Fr] = or[br];
        }
      }
      return W[z] = R.length, tr;
    }
    function C(A, w) {
      var _ = A._values, F = A._index, y = A._ptr, M = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), B = w._values, S = w._index, O = w._ptr, x = w._datatype || w._data === void 0 ? w._datatype : w.getDataType(), z = A._size[0], T = w._size[1], J = _ && B, q, Z = n, nr = i;
      M && x && M === x && typeof M == "string" && M !== "mixed" && (q = M, Z = e.find(n, [
        q,
        q
      ]), nr = e.find(i, [
        q,
        q
      ]));
      for (var fr = J ? [] : void 0, R = [], W = [], tr = A.createSparseMatrix({
        values: fr,
        index: R,
        ptr: W,
        size: [
          z,
          T
        ],
        datatype: M === A._datatype && x === w._datatype ? q : void 0
      }), or = J ? [] : void 0, rr = [], G, j, Q, X, cr, er, hr, gr, Dr = 0; Dr < T; Dr++) {
        W[Dr] = R.length;
        var wr = Dr + 1;
        for (cr = O[Dr], er = O[Dr + 1], X = cr; X < er; X++) if (gr = S[X], J) for (j = y[gr], Q = y[gr + 1], G = j; G < Q; G++) hr = F[G], rr[hr] !== wr ? (rr[hr] = wr, R.push(hr), or[hr] = nr(B[X], _[G])) : or[hr] = Z(or[hr], nr(B[X], _[G]));
        else for (j = y[gr], Q = y[gr + 1], G = j; G < Q; G++) hr = F[G], rr[hr] !== wr && (rr[hr] = wr, R.push(hr));
        if (J) for (var Fr = W[Dr], br = R.length, Cr = Fr; Cr < br; Cr++) {
          var _r = R[Cr];
          fr[Cr] = or[_r];
        }
      }
      return W[T] = R.length, tr;
    }
    return e(oi, i, {
      "Array, Array": e.referTo("Matrix, Matrix", (A) => (w, _) => {
        f(Or(w), Or(_));
        var F = A(t(w), t(_));
        return zr(F) ? F.valueOf() : F;
      }),
      "Matrix, Matrix": function(w, _) {
        var F = w.size(), y = _.size();
        return f(F, y), F.length === 1 ? y.length === 1 ? o(w, _, F[0]) : h(w, _) : y.length === 1 ? v(w, _) : d(w, _);
      },
      "Matrix, Array": e.referTo("Matrix,Matrix", (A) => (w, _) => A(w, t(_))),
      "Array, Matrix": e.referToSelf((A) => (w, _) => A(t(w, _.storage()), _)),
      "SparseMatrix, any": function(w, _) {
        return c(w, _, i, false);
      },
      "DenseMatrix, any": function(w, _) {
        return s(w, _, i, false);
      },
      "any, SparseMatrix": function(w, _) {
        return c(_, w, i, true);
      },
      "any, DenseMatrix": function(w, _) {
        return s(_, w, i, true);
      },
      "Array, any": function(w, _) {
        return s(t(w), _, i, false).valueOf();
      },
      "any, Array": function(w, _) {
        return s(t(_), w, i, true).valueOf();
      },
      "any, any": i,
      "any, any, ...any": e.referToSelf((A) => (w, _, F) => {
        for (var y = A(w, _), M = 0; M < F.length; M++) y = A(y, F[M]);
        return y;
      })
    });
  }), si = "sign", Wf = [
    "typed",
    "BigNumber",
    "Fraction",
    "complex"
  ], Vf = ir(si, Wf, (r) => {
    var { typed: e, BigNumber: t, complex: n, Fraction: i } = r;
    return e(si, {
      number: pn,
      Complex: function(a) {
        return a.im === 0 ? n(pn(a.re)) : a.sign();
      },
      BigNumber: function(a) {
        return new t(a.cmp(0));
      },
      bigint: function(a) {
        return a > 0n ? 1n : a < 0n ? -1n : 0n;
      },
      Fraction: function(a) {
        return new i(a.s);
      },
      "Array | Matrix": e.referToSelf((u) => (a) => de(a, u, true)),
      Unit: e.referToSelf((u) => (a) => {
        if (!a._isDerived() && a.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
        return e.find(u, a.valueType())(a.value);
      })
    });
  }), Yf = "sqrt", Gf = [
    "config",
    "typed",
    "Complex"
  ], Jf = ir(Yf, Gf, (r) => {
    var { config: e, typed: t, Complex: n } = r;
    return t("sqrt", {
      number: i,
      Complex: function(a) {
        return a.sqrt();
      },
      BigNumber: function(a) {
        return !a.isNegative() || e.predictable ? a.sqrt() : i(a.toNumber());
      },
      Unit: function(a) {
        return a.pow(0.5);
      }
    });
    function i(u) {
      return isNaN(u) ? NaN : u >= 0 || e.predictable ? Math.sqrt(u) : new n(u, 0).sqrt();
    }
  }), fi = "subtract", Qf = [
    "typed",
    "matrix",
    "equalScalar",
    "subtractScalar",
    "unaryMinus",
    "DenseMatrix",
    "concat"
  ], Xf = ir(fi, Qf, (r) => {
    var { typed: e, matrix: t, equalScalar: n, subtractScalar: i, unaryMinus: u, DenseMatrix: a, concat: c } = r, s = Cu({
      typed: e
    }), f = tt({
      typed: e
    }), o = bf({
      typed: e,
      equalScalar: n
    }), h = _u({
      typed: e,
      DenseMatrix: a
    }), p = et({
      typed: e,
      DenseMatrix: a
    }), v = Ze({
      typed: e,
      matrix: t,
      concat: c
    });
    return e(fi, {
      "any, any": i
    }, v({
      elop: i,
      SS: o,
      DS: s,
      SD: f,
      Ss: p,
      sS: h
    }));
  }), Hf = "matAlgo07xSSf", Kf = [
    "typed",
    "SparseMatrix"
  ], ht = ir(Hf, Kf, (r) => {
    var { typed: e, SparseMatrix: t } = r;
    return function(u, a, c) {
      var s = u._size, f = u._datatype || u._data === void 0 ? u._datatype : u.getDataType(), o = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
      if (s.length !== o.length) throw new Nr(s.length, o.length);
      if (s[0] !== o[0] || s[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + o + ")");
      var p = s[0], v = s[1], d, l = 0, m = c;
      typeof f == "string" && f === h && f !== "mixed" && (d = f, l = e.convert(0, d), m = e.find(c, [
        d,
        d
      ]));
      for (var D = [], b = [], g = new Array(v + 1).fill(0), C = [], A = [], w = [], _ = [], F = 0; F < v; F++) {
        var y = F + 1, M = 0;
        n(u, F, w, C, y), n(a, F, _, A, y);
        for (var B = 0; B < p; B++) {
          var S = w[B] === y ? C[B] : l, O = _[B] === y ? A[B] : l, x = m(S, O);
          x !== 0 && x !== false && (b.push(B), D.push(x), M++);
        }
        g[F + 1] = g[F] + M;
      }
      return new t({
        values: D,
        index: b,
        ptr: g,
        size: [
          p,
          v
        ],
        datatype: f === u._datatype && h === a._datatype ? d : void 0
      });
    };
    function n(i, u, a, c, s) {
      for (var f = i._values, o = i._index, h = i._ptr, p = h[u], v = h[u + 1]; p < v; p++) {
        var d = o[p];
        a[d] = s, c[d] = f[p];
      }
    }
  }), ci = "conj", kf = [
    "typed"
  ], jf = ir(ci, kf, (r) => {
    var { typed: e } = r;
    return e(ci, {
      "number | BigNumber | Fraction": (t) => t,
      Complex: (t) => t.conjugate(),
      "Array | Matrix": e.referToSelf((t) => (n) => de(n, t))
    });
  }), li = "im", rc = [
    "typed"
  ], ec = ir(li, rc, (r) => {
    var { typed: e } = r;
    return e(li, {
      number: () => 0,
      "BigNumber | Fraction": (t) => t.mul(0),
      Complex: (t) => t.im,
      "Array | Matrix": e.referToSelf((t) => (n) => de(n, t))
    });
  }), hi = "re", tc = [
    "typed"
  ], nc = ir(hi, tc, (r) => {
    var { typed: e } = r;
    return e(hi, {
      "number | BigNumber | Fraction": (t) => t,
      Complex: (t) => t.re,
      "Array | Matrix": e.referToSelf((t) => (n) => de(n, t))
    });
  }), vi = "concat", ic = [
    "typed",
    "matrix",
    "isInteger"
  ], uc = ir(vi, ic, (r) => {
    var { typed: e, matrix: t, isInteger: n } = r;
    return e(vi, {
      "...Array | Matrix | number | BigNumber": function(u) {
        var a, c = u.length, s = -1, f, o = false, h = [];
        for (a = 0; a < c; a++) {
          var p = u[a];
          if (zr(p) && (o = true), Pr(p) || Yr(p)) {
            if (a !== c - 1) throw new Error("Dimension must be specified as last argument");
            if (f = s, s = p.valueOf(), !n(s)) throw new TypeError("Integer number expected for dimension");
            if (s < 0 || a > 0 && s > f) throw new Le(s, f + 1);
          } else {
            var v = Br(p).valueOf(), d = Or(v);
            if (h[a] = v, f = s, s = d.length - 1, a > 0 && s !== f) throw new Nr(f + 1, s + 1);
          }
        }
        if (h.length === 0) throw new SyntaxError("At least one matrix expected");
        for (var l = h.shift(); h.length; ) l = vu(l, h.shift(), s);
        return o ? t(l) : l;
      },
      "...string": function(u) {
        return u.join("");
      }
    });
  }), pi = "column", ac = [
    "typed",
    "Index",
    "matrix",
    "range"
  ], oc = ir(pi, ac, (r) => {
    var { typed: e, Index: t, matrix: n, range: i } = r;
    return e(pi, {
      "Matrix, number": u,
      "Array, number": function(c, s) {
        return u(n(Br(c)), s).valueOf();
      }
    });
    function u(a, c) {
      if (a.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
      Vr(c, a.size()[1]);
      var s = i(0, a.size()[0]), f = new t(s, c), o = a.subset(f);
      return zr(o) ? o : n([
        [
          o
        ]
      ]);
    }
  }), di = "cross", sc = [
    "typed",
    "matrix",
    "subtract",
    "multiply"
  ], fc = ir(di, sc, (r) => {
    var { typed: e, matrix: t, subtract: n, multiply: i } = r;
    return e(di, {
      "Matrix, Matrix": function(c, s) {
        return t(u(c.toArray(), s.toArray()));
      },
      "Matrix, Array": function(c, s) {
        return t(u(c.toArray(), s));
      },
      "Array, Matrix": function(c, s) {
        return t(u(c, s.toArray()));
      },
      "Array, Array": u
    });
    function u(a, c) {
      var s = Math.max(Or(a).length, Or(c).length);
      a = Xn(a), c = Xn(c);
      var f = Or(a), o = Or(c);
      if (f.length !== 1 || o.length !== 1 || f[0] !== 3 || o[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + f.join(", ") + "], B = [" + o.join(", ") + "])");
      var h = [
        n(i(a[1], c[2]), i(a[2], c[1])),
        n(i(a[2], c[0]), i(a[0], c[2])),
        n(i(a[0], c[1]), i(a[1], c[0]))
      ];
      return s > 1 ? [
        h
      ] : h;
    }
  }), mi = "diag", cc = [
    "typed",
    "matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], lc = ir(mi, cc, (r) => {
    var { typed: e, matrix: t, DenseMatrix: n, SparseMatrix: i } = r;
    return e(mi, {
      Array: function(f) {
        return u(f, 0, Or(f), null);
      },
      "Array, number": function(f, o) {
        return u(f, o, Or(f), null);
      },
      "Array, BigNumber": function(f, o) {
        return u(f, o.toNumber(), Or(f), null);
      },
      "Array, string": function(f, o) {
        return u(f, 0, Or(f), o);
      },
      "Array, number, string": function(f, o, h) {
        return u(f, o, Or(f), h);
      },
      "Array, BigNumber, string": function(f, o, h) {
        return u(f, o.toNumber(), Or(f), h);
      },
      Matrix: function(f) {
        return u(f, 0, f.size(), f.storage());
      },
      "Matrix, number": function(f, o) {
        return u(f, o, f.size(), f.storage());
      },
      "Matrix, BigNumber": function(f, o) {
        return u(f, o.toNumber(), f.size(), f.storage());
      },
      "Matrix, string": function(f, o) {
        return u(f, 0, f.size(), o);
      },
      "Matrix, number, string": function(f, o, h) {
        return u(f, o, f.size(), h);
      },
      "Matrix, BigNumber, string": function(f, o, h) {
        return u(f, o.toNumber(), f.size(), h);
      }
    });
    function u(s, f, o, h) {
      if (!qr(f)) throw new TypeError("Second parameter in function diag must be an integer");
      var p = f > 0 ? f : 0, v = f < 0 ? -f : 0;
      switch (o.length) {
        case 1:
          return a(s, f, h, o[0], v, p);
        case 2:
          return c(s, f, h, o, v, p);
      }
      throw new RangeError("Matrix for function diag must be 2 dimensional");
    }
    function a(s, f, o, h, p, v) {
      var d = [
        h + p,
        h + v
      ];
      if (o && o !== "sparse" && o !== "dense") throw new TypeError("Unknown matrix type ".concat(o, '"'));
      var l = o === "sparse" ? i.diagonal(d, s, f) : n.diagonal(d, s, f);
      return o !== null ? l : l.valueOf();
    }
    function c(s, f, o, h, p, v) {
      if (zr(s)) {
        var d = s.diagonal(f);
        return o !== null ? o !== d.storage() ? t(d, o) : d : d.valueOf();
      }
      for (var l = Math.min(h[0] - p, h[1] - v), m = [], D = 0; D < l; D++) m[D] = s[D + p][D + v];
      return o !== null ? t(m) : m;
    }
  }), Di = "flatten", hc = [
    "typed"
  ], vc = ir(Di, hc, (r) => {
    var { typed: e } = r;
    return e(Di, {
      Array: function(n) {
        return hn(n);
      },
      Matrix: function(n) {
        return n.create(hn(n.valueOf()), n.datatype());
      }
    });
  }), gi = "getMatrixDataType", pc = [
    "typed"
  ], dc = ir(gi, pc, (r) => {
    var { typed: e } = r;
    return e(gi, {
      Array: function(n) {
        return Vt(n, Fe);
      },
      Matrix: function(n) {
        return n.getDataType();
      }
    });
  }), yi = "identity", mc = [
    "typed",
    "config",
    "matrix",
    "BigNumber",
    "DenseMatrix",
    "SparseMatrix"
  ], Dc = ir(yi, mc, (r) => {
    var { typed: e, config: t, matrix: n, BigNumber: i, DenseMatrix: u, SparseMatrix: a } = r;
    return e(yi, {
      "": function() {
        return t.matrix === "Matrix" ? n([]) : [];
      },
      string: function(o) {
        return n(o);
      },
      "number | BigNumber": function(o) {
        return s(o, o, t.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, string": function(o, h) {
        return s(o, o, h);
      },
      "number | BigNumber, number | BigNumber": function(o, h) {
        return s(o, h, t.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, number | BigNumber, string": function(o, h, p) {
        return s(o, h, p);
      },
      Array: function(o) {
        return c(o);
      },
      "Array, string": function(o, h) {
        return c(o, h);
      },
      Matrix: function(o) {
        return c(o.valueOf(), o.storage());
      },
      "Matrix, string": function(o, h) {
        return c(o.valueOf(), h);
      }
    });
    function c(f, o) {
      switch (f.length) {
        case 0:
          return o ? n(o) : [];
        case 1:
          return s(f[0], f[0], o);
        case 2:
          return s(f[0], f[1], o);
        default:
          throw new Error("Vector containing two values expected");
      }
    }
    function s(f, o, h) {
      var p = Yr(f) || Yr(o) ? i : null;
      if (Yr(f) && (f = f.toNumber()), Yr(o) && (o = o.toNumber()), !qr(f) || f < 1) throw new Error("Parameters in function identity must be positive integers");
      if (!qr(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
      var v = p ? new i(1) : 1, d = p ? new p(0) : 0, l = [
        f,
        o
      ];
      if (h) {
        if (h === "sparse") return a.diagonal(l, v, 0, d);
        if (h === "dense") return u.diagonal(l, v, 0, d);
        throw new TypeError('Unknown matrix type "'.concat(h, '"'));
      }
      for (var m = xt([], l, d), D = f < o ? f : o, b = 0; b < D; b++) m[b][b] = v;
      return m;
    }
  });
  function Bu() {
    throw new Error('No "bignumber" implementation available');
  }
  function gc() {
    throw new Error('No "fraction" implementation available');
  }
  function Mu() {
    throw new Error('No "matrix" implementation available');
  }
  var wi = "range", yc = [
    "typed",
    "config",
    "?matrix",
    "?bignumber",
    "smaller",
    "smallerEq",
    "larger",
    "largerEq",
    "add",
    "isPositive"
  ], wc = ir(wi, yc, (r) => {
    var { typed: e, config: t, matrix: n, bignumber: i, smaller: u, smallerEq: a, larger: c, largerEq: s, add: f, isPositive: o } = r;
    return e(wi, {
      string: p,
      "string, boolean": p,
      number: function(m) {
        throw new TypeError("Too few arguments to function range(): ".concat(m));
      },
      boolean: function(m) {
        throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(m, ", number|bigint|BigNumber|Fraction"));
      },
      "number, number": function(m, D) {
        return h(v(m, D, 1, false));
      },
      "number, number, number": function(m, D, b) {
        return h(v(m, D, b, false));
      },
      "number, number, boolean": function(m, D, b) {
        return h(v(m, D, 1, b));
      },
      "number, number, number, boolean": function(m, D, b, g) {
        return h(v(m, D, b, g));
      },
      "bigint, bigint|number": function(m, D) {
        return h(v(m, D, 1n, false));
      },
      "number, bigint": function(m, D) {
        return h(v(BigInt(m), D, 1n, false));
      },
      "bigint, bigint|number, bigint|number": function(m, D, b) {
        return h(v(m, D, BigInt(b), false));
      },
      "number, bigint, bigint|number": function(m, D, b) {
        return h(v(BigInt(m), D, BigInt(b), false));
      },
      "bigint, bigint|number, boolean": function(m, D, b) {
        return h(v(m, D, 1n, b));
      },
      "number, bigint, boolean": function(m, D, b) {
        return h(v(BigInt(m), D, 1n, b));
      },
      "bigint, bigint|number, bigint|number, boolean": function(m, D, b, g) {
        return h(v(m, D, BigInt(b), g));
      },
      "number, bigint, bigint|number, boolean": function(m, D, b, g) {
        return h(v(BigInt(m), D, BigInt(b), g));
      },
      "BigNumber, BigNumber": function(m, D) {
        var b = m.constructor;
        return h(v(m, D, new b(1), false));
      },
      "BigNumber, BigNumber, BigNumber": function(m, D, b) {
        return h(v(m, D, b, false));
      },
      "BigNumber, BigNumber, boolean": function(m, D, b) {
        var g = m.constructor;
        return h(v(m, D, new g(1), b));
      },
      "BigNumber, BigNumber, BigNumber, boolean": function(m, D, b, g) {
        return h(v(m, D, b, g));
      },
      "Fraction, Fraction": function(m, D) {
        return h(v(m, D, 1, false));
      },
      "Fraction, Fraction, Fraction": function(m, D, b) {
        return h(v(m, D, b, false));
      },
      "Fraction, Fraction, boolean": function(m, D, b) {
        return h(v(m, D, 1, b));
      },
      "Fraction, Fraction, Fraction, boolean": function(m, D, b, g) {
        return h(v(m, D, b, g));
      },
      "Unit, Unit, Unit": function(m, D, b) {
        return h(v(m, D, b, false));
      },
      "Unit, Unit, Unit, boolean": function(m, D, b, g) {
        return h(v(m, D, b, g));
      }
    });
    function h(l) {
      return t.matrix === "Matrix" ? n ? n(l) : Mu() : l;
    }
    function p(l, m) {
      var D = d(l);
      if (!D) throw new SyntaxError('String "' + l + '" is no valid range');
      return t.number === "BigNumber" ? (i === void 0 && Bu(), h(v(i(D.start), i(D.end), i(D.step)))) : h(v(D.start, D.end, D.step, m));
    }
    function v(l, m, D, b) {
      for (var g = [], C = o(D) ? b ? a : u : b ? s : c, A = l; C(A, m); ) g.push(A), A = f(A, D);
      return g;
    }
    function d(l) {
      var m = l.split(":"), D = m.map(function(g) {
        return Number(g);
      }), b = D.some(function(g) {
        return isNaN(g);
      });
      if (b) return null;
      switch (D.length) {
        case 2:
          return {
            start: D[0],
            end: D[1],
            step: 1
          };
        case 3:
          return {
            start: D[0],
            end: D[2],
            step: D[1]
          };
        default:
          return null;
      }
    }
  }), Ai = "reshape", Ac = [
    "typed",
    "isInteger",
    "matrix"
  ], Fc = ir(Ai, Ac, (r) => {
    var { typed: e, isInteger: t } = r;
    return e(Ai, {
      "Matrix, Array": function(i, u) {
        return i.reshape(u, true);
      },
      "Array, Array": function(i, u) {
        return u.forEach(function(a) {
          if (!t(a)) throw new TypeError("Invalid size for dimension: " + a);
        }), An(i, u);
      }
    });
  }), Fi = "size", Ec = [
    "typed",
    "config",
    "?matrix"
  ], bc = ir(Fi, Ec, (r) => {
    var { typed: e, config: t, matrix: n } = r;
    return e(Fi, {
      Matrix: function(u) {
        return u.create(u.size(), "number");
      },
      Array: Or,
      string: function(u) {
        return t.matrix === "Array" ? [
          u.length
        ] : n([
          u.length
        ], "dense", "number");
      },
      "number | Complex | BigNumber | Unit | boolean | null": function(u) {
        return t.matrix === "Array" ? [] : n ? n([], "dense", "number") : Mu();
      }
    });
  }), Ei = "transpose", Cc = [
    "typed",
    "matrix"
  ], _c = ir(Ei, Cc, (r) => {
    var { typed: e, matrix: t } = r;
    return e(Ei, {
      Array: (a) => n(t(a)).valueOf(),
      Matrix: n,
      any: Br
    });
    function n(a) {
      var c = a.size(), s;
      switch (c.length) {
        case 1:
          s = a.clone();
          break;
        case 2:
          {
            var f = c[0], o = c[1];
            if (o === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Lr(c) + ")");
            switch (a.storage()) {
              case "dense":
                s = i(a, f, o);
                break;
              case "sparse":
                s = u(a, f, o);
                break;
            }
          }
          break;
        default:
          throw new RangeError("Matrix must be a vector or two dimensional (size: " + Lr(c) + ")");
      }
      return s;
    }
    function i(a, c, s) {
      for (var f = a._data, o = [], h, p = 0; p < s; p++) {
        h = o[p] = [];
        for (var v = 0; v < c; v++) h[v] = Br(f[v][p]);
      }
      return a.createDenseMatrix({
        data: o,
        size: [
          s,
          c
        ],
        datatype: a._datatype
      });
    }
    function u(a, c, s) {
      for (var f = a._values, o = a._index, h = a._ptr, p = f ? [] : void 0, v = [], d = [], l = [], m = 0; m < c; m++) l[m] = 0;
      var D, b, g;
      for (D = 0, b = o.length; D < b; D++) l[o[D]]++;
      for (var C = 0, A = 0; A < c; A++) d.push(C), C += l[A], l[A] = d[A];
      for (d.push(C), g = 0; g < s; g++) for (var w = h[g], _ = h[g + 1], F = w; F < _; F++) {
        var y = l[o[F]]++;
        v[y] = g, f && (p[y] = Br(f[F]));
      }
      return a.createSparseMatrix({
        values: p,
        index: v,
        ptr: d,
        size: [
          s,
          c
        ],
        datatype: a._datatype
      });
    }
  }), bi = "ctranspose", Bc = [
    "typed",
    "transpose",
    "conj"
  ], Mc = ir(bi, Bc, (r) => {
    var { typed: e, transpose: t, conj: n } = r;
    return e(bi, {
      any: function(u) {
        return n(t(u));
      }
    });
  }), Ci = "zeros", Sc = [
    "typed",
    "config",
    "matrix",
    "BigNumber"
  ], Nc = ir(Ci, Sc, (r) => {
    var { typed: e, config: t, matrix: n, BigNumber: i } = r;
    return e(Ci, {
      "": function() {
        return t.matrix === "Array" ? u([]) : u([], "default");
      },
      "...number | BigNumber | string": function(f) {
        var o = f[f.length - 1];
        if (typeof o == "string") {
          var h = f.pop();
          return u(f, h);
        } else return t.matrix === "Array" ? u(f) : u(f, "default");
      },
      Array: u,
      Matrix: function(f) {
        var o = f.storage();
        return u(f.valueOf(), o);
      },
      "Array | Matrix, string": function(f, o) {
        return u(f.valueOf(), o);
      }
    });
    function u(s, f) {
      var o = a(s), h = o ? new i(0) : 0;
      if (c(s), f) {
        var p = n(f);
        return s.length > 0 ? p.resize(s, h) : p;
      } else {
        var v = [];
        return s.length > 0 ? xt(v, s, h) : v;
      }
    }
    function a(s) {
      var f = false;
      return s.forEach(function(o, h, p) {
        Yr(o) && (f = true, p[h] = o.toNumber());
      }), f;
    }
    function c(s) {
      s.forEach(function(f) {
        if (typeof f != "number" || !qr(f) || f < 0) throw new Error("Parameters in function zeros must be positive integers");
      });
    }
  }), xc = "numeric", Tc = [
    "number",
    "?bignumber",
    "?fraction"
  ], Ic = ir(xc, Tc, (r) => {
    var { number: e, bignumber: t, fraction: n } = r, i = {
      string: true,
      number: true,
      BigNumber: true,
      Fraction: true
    }, u = {
      number: (a) => e(a),
      BigNumber: t ? (a) => t(a) : Bu,
      bigint: (a) => BigInt(a),
      Fraction: n ? (a) => n(a) : gc
    };
    return function(c) {
      var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", f = arguments.length > 2 ? arguments[2] : void 0;
      if (f !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
      var o = Fe(c);
      if (!(o in i)) throw new TypeError("Cannot convert " + c + ' of type "' + o + '"; valid input types are ' + Object.keys(i).join(", "));
      if (!(s in u)) throw new TypeError("Cannot convert " + c + ' to type "' + s + '"; valid output types are ' + Object.keys(u).join(", "));
      return s === o ? c : u[s](c);
    };
  }), _i = "divideScalar", Oc = [
    "typed",
    "numeric"
  ], zc = ir(_i, Oc, (r) => {
    var { typed: e, numeric: t } = r;
    return e(_i, {
      "number, number": function(i, u) {
        return i / u;
      },
      "Complex, Complex": function(i, u) {
        return i.div(u);
      },
      "BigNumber, BigNumber": function(i, u) {
        return i.div(u);
      },
      "bigint, bigint": function(i, u) {
        return i / u;
      },
      "Fraction, Fraction": function(i, u) {
        return i.div(u);
      },
      "Unit, number | Complex | Fraction | BigNumber | Unit": (n, i) => n.divide(i),
      "number | Fraction | Complex | BigNumber, Unit": (n, i) => i.divideInto(n)
    });
  }), Bi = "pow", $c = [
    "typed",
    "config",
    "identity",
    "multiply",
    "matrix",
    "inv",
    "fraction",
    "number",
    "Complex"
  ], Pc = ir(Bi, $c, (r) => {
    var { typed: e, config: t, identity: n, multiply: i, matrix: u, inv: a, number: c, fraction: s, Complex: f } = r;
    return e(Bi, {
      "number, number": o,
      "Complex, Complex": function(d, l) {
        return d.pow(l);
      },
      "BigNumber, BigNumber": function(d, l) {
        return l.isInteger() || d >= 0 || t.predictable ? d.pow(l) : new f(d.toNumber(), 0).pow(l.toNumber(), 0);
      },
      "bigint, bigint": (v, d) => v ** d,
      "Fraction, Fraction": function(d, l) {
        var m = d.pow(l);
        if (m != null) return m;
        if (t.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
        return o(d.valueOf(), l.valueOf());
      },
      "Array, number": h,
      "Array, BigNumber": function(d, l) {
        return h(d, l.toNumber());
      },
      "Matrix, number": p,
      "Matrix, BigNumber": function(d, l) {
        return p(d, l.toNumber());
      },
      "Unit, number | BigNumber": function(d, l) {
        return d.pow(l);
      }
    });
    function o(v, d) {
      if (t.predictable && !qr(d) && v < 0) try {
        var l = s(d), m = c(l);
        if ((d === m || Math.abs((d - m) / d) < 1e-14) && l.d % 2n === 1n) return (l.n % 2n === 0n ? 1 : -1) * Math.pow(-v, d);
      } catch {
      }
      return t.predictable && (v < -1 && d === 1 / 0 || v > -1 && v < 0 && d === -1 / 0) ? NaN : qr(d) || v >= 0 || t.predictable ? Fu(v, d) : v * v < 1 && d === 1 / 0 || v * v > 1 && d === -1 / 0 ? 0 : new f(v, 0).pow(d, 0);
    }
    function h(v, d) {
      if (!qr(d)) throw new TypeError("For A^b, b must be an integer (value is " + d + ")");
      var l = Or(v);
      if (l.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + l.length + " dimensions)");
      if (l[0] !== l[1]) throw new Error("For A^b, A must be square (size is " + l[0] + "x" + l[1] + ")");
      if (d < 0) try {
        return h(a(v), -d);
      } catch (b) {
        throw b.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + d + ")") : b;
      }
      for (var m = n(l[0]).valueOf(), D = v; d >= 1; ) (d & 1) === 1 && (m = i(D, m)), d >>= 1, D = i(D, D);
      return m;
    }
    function p(v, d) {
      return u(h(v.valueOf(), d));
    }
  });
  function Su(r) {
    var { DenseMatrix: e } = r;
    return function(n, i, u) {
      var a = n.size();
      if (a.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + Lr(a) + ")");
      var c = a[0], s = a[1];
      if (c !== s) throw new RangeError("Matrix must be square (size: " + Lr(a) + ")");
      var f = [];
      if (zr(i)) {
        var o = i.size(), h = i._data;
        if (o.length === 1) {
          if (o[0] !== c) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var p = 0; p < c; p++) f[p] = [
            h[p]
          ];
          return new e({
            data: f,
            size: [
              c,
              1
            ],
            datatype: i._datatype
          });
        }
        if (o.length === 2) {
          if (o[0] !== c || o[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          if (Li(i)) {
            if (u) {
              f = [];
              for (var v = 0; v < c; v++) f[v] = [
                h[v][0]
              ];
              return new e({
                data: f,
                size: [
                  c,
                  1
                ],
                datatype: i._datatype
              });
            }
            return i;
          }
          if (Zi(i)) {
            for (var d = 0; d < c; d++) f[d] = [
              0
            ];
            for (var l = i._values, m = i._index, D = i._ptr, b = D[1], g = D[0]; g < b; g++) {
              var C = m[g];
              f[C][0] = l[g];
            }
            return new e({
              data: f,
              size: [
                c,
                1
              ],
              datatype: i._datatype
            });
          }
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
      if (Wr(i)) {
        var A = Or(i);
        if (A.length === 1) {
          if (A[0] !== c) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var w = 0; w < c; w++) f[w] = [
            i[w]
          ];
          return new e({
            data: f,
            size: [
              c,
              1
            ]
          });
        }
        if (A.length === 2) {
          if (A[0] !== c || A[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var _ = 0; _ < c; _++) f[_] = [
            i[_][0]
          ];
          return new e({
            data: f,
            size: [
              c,
              1
            ]
          });
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
    };
  }
  var Mi = "usolve", Rc = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], qc = ir(Mi, Rc, (r) => {
    var { typed: e, matrix: t, divideScalar: n, multiplyScalar: i, subtractScalar: u, equalScalar: a, DenseMatrix: c } = r, s = Su({
      DenseMatrix: c
    });
    return e(Mi, {
      "SparseMatrix, Array | Matrix": function(p, v) {
        return o(p, v);
      },
      "DenseMatrix, Array | Matrix": function(p, v) {
        return f(p, v);
      },
      "Array, Array | Matrix": function(p, v) {
        var d = t(p), l = f(d, v);
        return l.valueOf();
      }
    });
    function f(h, p) {
      p = s(h, p, true);
      for (var v = p._data, d = h._size[0], l = h._size[1], m = [], D = h._data, b = l - 1; b >= 0; b--) {
        var g = v[b][0] || 0, C = void 0;
        if (a(g, 0)) C = 0;
        else {
          var A = D[b][b];
          if (a(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          C = n(g, A);
          for (var w = b - 1; w >= 0; w--) v[w] = [
            u(v[w][0] || 0, i(C, D[w][b]))
          ];
        }
        m[b] = [
          C
        ];
      }
      return new c({
        data: m,
        size: [
          d,
          1
        ]
      });
    }
    function o(h, p) {
      p = s(h, p, true);
      for (var v = p._data, d = h._size[0], l = h._size[1], m = h._values, D = h._index, b = h._ptr, g = [], C = l - 1; C >= 0; C--) {
        var A = v[C][0] || 0;
        if (a(A, 0)) g[C] = [
          0
        ];
        else {
          for (var w = 0, _ = [], F = [], y = b[C], M = b[C + 1], B = M - 1; B >= y; B--) {
            var S = D[B];
            S === C ? w = m[B] : S < C && (_.push(m[B]), F.push(S));
          }
          if (a(w, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          for (var O = n(A, w), x = 0, z = F.length; x < z; x++) {
            var T = F[x];
            v[T] = [
              u(v[T][0], i(O, _[x]))
            ];
          }
          g[C] = [
            O
          ];
        }
      }
      return new c({
        data: g,
        size: [
          d,
          1
        ]
      });
    }
  }), Si = "usolveAll", Uc = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], Lc = ir(Si, Uc, (r) => {
    var { typed: e, matrix: t, divideScalar: n, multiplyScalar: i, subtractScalar: u, equalScalar: a, DenseMatrix: c } = r, s = Su({
      DenseMatrix: c
    });
    return e(Si, {
      "SparseMatrix, Array | Matrix": function(p, v) {
        return o(p, v);
      },
      "DenseMatrix, Array | Matrix": function(p, v) {
        return f(p, v);
      },
      "Array, Array | Matrix": function(p, v) {
        var d = t(p), l = f(d, v);
        return l.map((m) => m.valueOf());
      }
    });
    function f(h, p) {
      for (var v = [
        s(h, p, true)._data.map((F) => F[0])
      ], d = h._data, l = h._size[0], m = h._size[1], D = m - 1; D >= 0; D--) for (var b = v.length, g = 0; g < b; g++) {
        var C = v[g];
        if (a(d[D][D], 0)) if (a(C[D], 0)) {
          if (g === 0) {
            var w = [
              ...C
            ];
            w[D] = 1;
            for (var _ = D - 1; _ >= 0; _--) w[_] = u(w[_], d[_][D]);
            v.push(w);
          }
        } else {
          if (g === 0) return [];
          v.splice(g, 1), g -= 1, b -= 1;
        }
        else {
          C[D] = n(C[D], d[D][D]);
          for (var A = D - 1; A >= 0; A--) C[A] = u(C[A], i(C[D], d[A][D]));
        }
      }
      return v.map((F) => new c({
        data: F.map((y) => [
          y
        ]),
        size: [
          l,
          1
        ]
      }));
    }
    function o(h, p) {
      for (var v = [
        s(h, p, true)._data.map((fr) => fr[0])
      ], d = h._size[0], l = h._size[1], m = h._values, D = h._index, b = h._ptr, g = l - 1; g >= 0; g--) for (var C = v.length, A = 0; A < C; A++) {
        for (var w = v[A], _ = [], F = [], y = b[g], M = b[g + 1], B = 0, S = M - 1; S >= y; S--) {
          var O = D[S];
          O === g ? B = m[S] : O < g && (_.push(m[S]), F.push(O));
        }
        if (a(B, 0)) if (a(w[g], 0)) {
          if (A === 0) {
            var J = [
              ...w
            ];
            J[g] = 1;
            for (var q = 0, Z = F.length; q < Z; q++) {
              var nr = F[q];
              J[nr] = u(J[nr], _[q]);
            }
            v.push(J);
          }
        } else {
          if (A === 0) return [];
          v.splice(A, 1), A -= 1, C -= 1;
        }
        else {
          w[g] = n(w[g], B);
          for (var x = 0, z = F.length; x < z; x++) {
            var T = F[x];
            w[T] = u(w[T], i(w[g], _[x]));
          }
        }
      }
      return v.map((fr) => new c({
        data: fr.map((R) => [
          R
        ]),
        size: [
          d,
          1
        ]
      }));
    }
  });
  function Zc(r) {
    return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
  }
  function Wc(r) {
    if (r.__esModule) return r;
    var e = r.default;
    if (typeof e == "function") {
      var t = function n() {
        return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
      };
      t.prototype = e.prototype;
    } else t = {};
    return Object.defineProperty(t, "__esModule", {
      value: true
    }), Object.keys(r).forEach(function(n) {
      var i = Object.getOwnPropertyDescriptor(r, n);
      Object.defineProperty(t, n, i.get ? i : {
        enumerable: true,
        get: function() {
          return r[n];
        }
      });
    }), t;
  }
  var Ot = "equal", Vc = [
    "typed",
    "matrix",
    "equalScalar",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Yc = ir(Ot, Vc, (r) => {
    var { typed: e, matrix: t, equalScalar: n, DenseMatrix: i, concat: u, SparseMatrix: a } = r, c = tt({
      typed: e
    }), s = ht({
      typed: e,
      SparseMatrix: a
    }), f = et({
      typed: e,
      DenseMatrix: i
    }), o = Ze({
      typed: e,
      matrix: t,
      concat: u
    });
    return e(Ot, Gc({
      typed: e,
      equalScalar: n
    }), o({
      elop: n,
      SS: s,
      DS: c,
      Ss: f
    }));
  }), Gc = ir(Ot, [
    "typed",
    "equalScalar"
  ], (r) => {
    var { typed: e, equalScalar: t } = r;
    return e(Ot, {
      "any, any": function(i, u) {
        return i === null ? u === null : u === null ? i === null : i === void 0 ? u === void 0 : u === void 0 ? i === void 0 : t(i, u);
      }
    });
  }), zt = "smaller", Jc = [
    "typed",
    "config",
    "bignumber",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Qc = ir(zt, Jc, (r) => {
    var { typed: e, config: t, bignumber: n, matrix: i, DenseMatrix: u, concat: a, SparseMatrix: c } = r, s = tt({
      typed: e
    }), f = ht({
      typed: e,
      SparseMatrix: c
    }), o = et({
      typed: e,
      DenseMatrix: u
    }), h = Ze({
      typed: e,
      matrix: i,
      concat: a
    }), p = lt({
      typed: e
    });
    function v(d, l) {
      return d.lt(l) && !rt(d, l, t.relTol, t.absTol);
    }
    return e(zt, Xc({
      typed: e,
      config: t
    }), {
      "boolean, boolean": (d, l) => d < l,
      "BigNumber, BigNumber": v,
      "bigint, bigint": (d, l) => d < l,
      "Fraction, Fraction": (d, l) => d.compare(l) === -1,
      "Fraction, BigNumber": function(l, m) {
        return v(n(l), m);
      },
      "BigNumber, Fraction": function(l, m) {
        return v(l, n(m));
      },
      "Complex, Complex": function(l, m) {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, p, h({
      SS: f,
      DS: s,
      Ss: o
    }));
  }), Xc = ir(zt, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: t } = r;
    return e(zt, {
      "number, number": function(i, u) {
        return i < u && !Se(i, u, t.relTol, t.absTol);
      }
    });
  }), $t = "smallerEq", Hc = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Kc = ir($t, Hc, (r) => {
    var { typed: e, config: t, matrix: n, DenseMatrix: i, concat: u, SparseMatrix: a } = r, c = tt({
      typed: e
    }), s = ht({
      typed: e,
      SparseMatrix: a
    }), f = et({
      typed: e,
      DenseMatrix: i
    }), o = Ze({
      typed: e,
      matrix: n,
      concat: u
    }), h = lt({
      typed: e
    });
    return e($t, kc({
      typed: e,
      config: t
    }), {
      "boolean, boolean": (p, v) => p <= v,
      "BigNumber, BigNumber": function(v, d) {
        return v.lte(d) || rt(v, d, t.relTol, t.absTol);
      },
      "bigint, bigint": (p, v) => p <= v,
      "Fraction, Fraction": (p, v) => p.compare(v) !== 1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, h, o({
      SS: s,
      DS: c,
      Ss: f
    }));
  }), kc = ir($t, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: t } = r;
    return e($t, {
      "number, number": function(i, u) {
        return i <= u || Se(i, u, t.relTol, t.absTol);
      }
    });
  }), Pt = "larger", jc = [
    "typed",
    "config",
    "bignumber",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], rl = ir(Pt, jc, (r) => {
    var { typed: e, config: t, bignumber: n, matrix: i, DenseMatrix: u, concat: a, SparseMatrix: c } = r, s = tt({
      typed: e
    }), f = ht({
      typed: e,
      SparseMatrix: c
    }), o = et({
      typed: e,
      DenseMatrix: u
    }), h = Ze({
      typed: e,
      matrix: i,
      concat: a
    }), p = lt({
      typed: e
    });
    function v(d, l) {
      return d.gt(l) && !rt(d, l, t.relTol, t.absTol);
    }
    return e(Pt, el({
      typed: e,
      config: t
    }), {
      "boolean, boolean": (d, l) => d > l,
      "BigNumber, BigNumber": v,
      "bigint, bigint": (d, l) => d > l,
      "Fraction, Fraction": (d, l) => d.compare(l) === 1,
      "Fraction, BigNumber": function(l, m) {
        return v(n(l), m);
      },
      "BigNumber, Fraction": function(l, m) {
        return v(l, n(m));
      },
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, p, h({
      SS: f,
      DS: s,
      Ss: o
    }));
  }), el = ir(Pt, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: t } = r;
    return e(Pt, {
      "number, number": function(i, u) {
        return i > u && !Se(i, u, t.relTol, t.absTol);
      }
    });
  }), Rt = "largerEq", tl = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], nl = ir(Rt, tl, (r) => {
    var { typed: e, config: t, matrix: n, DenseMatrix: i, concat: u, SparseMatrix: a } = r, c = tt({
      typed: e
    }), s = ht({
      typed: e,
      SparseMatrix: a
    }), f = et({
      typed: e,
      DenseMatrix: i
    }), o = Ze({
      typed: e,
      matrix: n,
      concat: u
    }), h = lt({
      typed: e
    });
    return e(Rt, il({
      typed: e,
      config: t
    }), {
      "boolean, boolean": (p, v) => p >= v,
      "BigNumber, BigNumber": function(v, d) {
        return v.gte(d) || rt(v, d, t.relTol, t.absTol);
      },
      "bigint, bigint": function(v, d) {
        return v >= d;
      },
      "Fraction, Fraction": (p, v) => p.compare(v) !== -1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, h, o({
      SS: s,
      DS: c,
      Ss: f
    }));
  }), il = ir(Rt, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: t } = r;
    return e(Rt, {
      "number, number": function(i, u) {
        return i >= u || Se(i, u, t.relTol, t.absTol);
      }
    });
  }), ul = "ImmutableDenseMatrix", al = [
    "smaller",
    "DenseMatrix"
  ], ol = ir(ul, al, (r) => {
    var { smaller: e, DenseMatrix: t } = r;
    function n(i, u) {
      if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
      if (u && !we(u)) throw new Error("Invalid datatype: " + u);
      if (zr(i) || Wr(i)) {
        var a = new t(i, u);
        this._data = a._data, this._size = a._size, this._datatype = a._datatype, this._min = null, this._max = null;
      } else if (i && Wr(i.data) && Wr(i.size)) this._data = i.data, this._size = i.size, this._datatype = i.datatype, this._min = typeof i.min < "u" ? i.min : null, this._max = typeof i.max < "u" ? i.max : null;
      else {
        if (i) throw new TypeError("Unsupported type of data (" + Fe(i) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = u, this._min = null, this._max = null;
      }
    }
    return n.prototype = new t(), n.prototype.type = "ImmutableDenseMatrix", n.prototype.isImmutableDenseMatrix = true, n.prototype.subset = function(i) {
      switch (arguments.length) {
        case 1: {
          var u = t.prototype.subset.call(this, i);
          return zr(u) ? new n({
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
    }, n.prototype.set = function() {
      throw new Error("Cannot invoke set on an Immutable Matrix instance");
    }, n.prototype.resize = function() {
      throw new Error("Cannot invoke resize on an Immutable Matrix instance");
    }, n.prototype.reshape = function() {
      throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
    }, n.prototype.clone = function() {
      return new n({
        data: Br(this._data),
        size: Br(this._size),
        datatype: this._datatype
      });
    }, n.prototype.toJSON = function() {
      return {
        mathjs: "ImmutableDenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, n.fromJSON = function(i) {
      return new n(i);
    }, n.prototype.swapRows = function() {
      throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
    }, n.prototype.min = function() {
      if (this._min === null) {
        var i = null;
        this.forEach(function(u) {
          (i === null || e(u, i)) && (i = u);
        }), this._min = i !== null ? i : void 0;
      }
      return this._min;
    }, n.prototype.max = function() {
      if (this._max === null) {
        var i = null;
        this.forEach(function(u) {
          (i === null || e(i, u)) && (i = u);
        }), this._max = i !== null ? i : void 0;
      }
      return this._max;
    }, n;
  }, {
    isClass: true
  }), sl = "Index", fl = [
    "ImmutableDenseMatrix",
    "getMatrixDataType"
  ], cl = ir(sl, fl, (r) => {
    var { ImmutableDenseMatrix: e, getMatrixDataType: t } = r;
    function n(u) {
      if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
      this._dimensions = [], this._sourceSize = [], this._isScalar = true;
      for (var a = 0, c = arguments.length; a < c; a++) {
        var s = arguments[a], f = Wr(s), o = zr(s), h = typeof s, p = null;
        if (Wi(s)) this._dimensions.push(s), this._isScalar = false;
        else if (f || o) {
          var v = void 0;
          t(s) === "boolean" ? (f && (v = i(Ni(s).valueOf())), o && (v = i(Ni(s._data).valueOf())), p = s.valueOf().length) : v = i(s.valueOf()), this._dimensions.push(v);
          var d = v.size();
          (d.length !== 1 || d[0] !== 1 || p !== null) && (this._isScalar = false);
        } else if (h === "number") this._dimensions.push(i([
          s
        ]));
        else if (h === "bigint") this._dimensions.push(i([
          Number(s)
        ]));
        else if (h === "string") this._dimensions.push(s);
        else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
        this._sourceSize.push(p);
      }
    }
    n.prototype.type = "Index", n.prototype.isIndex = true;
    function i(u) {
      for (var a = 0, c = u.length; a < c; a++) if (typeof u[a] != "number" || !qr(u[a])) throw new TypeError("Index parameters must be positive integer numbers");
      return new e(u);
    }
    return n.prototype.clone = function() {
      var u = new n();
      return u._dimensions = Br(this._dimensions), u._isScalar = this._isScalar, u._sourceSize = this._sourceSize, u;
    }, n.create = function(u) {
      var a = new n();
      return n.apply(a, u), a;
    }, n.prototype.size = function() {
      for (var u = [], a = 0, c = this._dimensions.length; a < c; a++) {
        var s = this._dimensions[a];
        u[a] = typeof s == "string" ? 1 : s.size()[0];
      }
      return u;
    }, n.prototype.max = function() {
      for (var u = [], a = 0, c = this._dimensions.length; a < c; a++) {
        var s = this._dimensions[a];
        u[a] = typeof s == "string" ? s : s.max();
      }
      return u;
    }, n.prototype.min = function() {
      for (var u = [], a = 0, c = this._dimensions.length; a < c; a++) {
        var s = this._dimensions[a];
        u[a] = typeof s == "string" ? s : s.min();
      }
      return u;
    }, n.prototype.forEach = function(u) {
      for (var a = 0, c = this._dimensions.length; a < c; a++) u(this._dimensions[a], a, this);
    }, n.prototype.dimension = function(u) {
      return typeof u != "number" ? null : this._dimensions[u] || null;
    }, n.prototype.isObjectProperty = function() {
      return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
    }, n.prototype.getObjectProperty = function() {
      return this.isObjectProperty() ? this._dimensions[0] : null;
    }, n.prototype.isScalar = function() {
      return this._isScalar;
    }, n.prototype.toArray = function() {
      for (var u = [], a = 0, c = this._dimensions.length; a < c; a++) {
        var s = this._dimensions[a];
        u.push(typeof s == "string" ? s : s.toArray());
      }
      return u;
    }, n.prototype.valueOf = n.prototype.toArray, n.prototype.toString = function() {
      for (var u = [], a = 0, c = this._dimensions.length; a < c; a++) {
        var s = this._dimensions[a];
        typeof s == "string" ? u.push(JSON.stringify(s)) : u.push(s.toString());
      }
      return "[" + u.join(", ") + "]";
    }, n.prototype.toJSON = function() {
      return {
        mathjs: "Index",
        dimensions: this._dimensions
      };
    }, n.fromJSON = function(u) {
      return n.create(u.dimensions);
    }, n;
  }, {
    isClass: true
  });
  function Ni(r) {
    var e = [];
    return r.forEach((t, n) => {
      t && e.push(n);
    }), e;
  }
  var ll = "atan", hl = [
    "typed"
  ], vl = ir(ll, hl, (r) => {
    var { typed: e } = r;
    return e("atan", {
      number: function(n) {
        return Math.atan(n);
      },
      Complex: function(n) {
        return n.atan();
      },
      BigNumber: function(n) {
        return n.atan();
      }
    });
  }), Nu = ir("trigUnit", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      Unit: e.referToSelf((t) => (n) => {
        if (!n.hasBase(n.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
        return e.find(t, n.valueType())(n.value);
      })
    };
  }), xi = "cos", pl = [
    "typed"
  ], dl = ir(xi, pl, (r) => {
    var { typed: e } = r, t = Nu({
      typed: e
    });
    return e(xi, {
      number: Math.cos,
      "Complex | BigNumber": (n) => n.cos()
    }, t);
  }), Ti = "sin", ml = [
    "typed"
  ], Dl = ir(Ti, ml, (r) => {
    var { typed: e } = r, t = Nu({
      typed: e
    });
    return e(Ti, {
      number: Math.sin,
      "Complex | BigNumber": (n) => n.sin()
    }, t);
  }), Ii = "add", gl = [
    "typed",
    "matrix",
    "addScalar",
    "equalScalar",
    "DenseMatrix",
    "SparseMatrix",
    "concat"
  ], yl = ir(Ii, gl, (r) => {
    var { typed: e, matrix: t, addScalar: n, equalScalar: i, DenseMatrix: u, SparseMatrix: a, concat: c } = r, s = Cu({
      typed: e
    }), f = zf({
      typed: e,
      equalScalar: i
    }), o = _u({
      typed: e,
      DenseMatrix: u
    }), h = Ze({
      typed: e,
      matrix: t,
      concat: c
    });
    return e(Ii, {
      "any, any": n,
      "any, any, ...any": e.referToSelf((p) => (v, d, l) => {
        for (var m = p(v, d), D = 0; D < l.length; D++) m = p(m, l[D]);
        return m;
      })
    }, h({
      elop: n,
      DS: s,
      SS: f,
      Ss: o
    }));
  }), Oi = "norm", wl = [
    "typed",
    "abs",
    "add",
    "pow",
    "conj",
    "sqrt",
    "multiply",
    "equalScalar",
    "larger",
    "smaller",
    "matrix",
    "ctranspose",
    "eigs"
  ], Al = ir(Oi, wl, (r) => {
    var { typed: e, abs: t, add: n, pow: i, conj: u, sqrt: a, multiply: c, equalScalar: s, larger: f, smaller: o, matrix: h, ctranspose: p, eigs: v } = r;
    return e(Oi, {
      number: Math.abs,
      Complex: function(F) {
        return F.abs();
      },
      BigNumber: function(F) {
        return F.abs();
      },
      boolean: function(F) {
        return Math.abs(F);
      },
      Array: function(F) {
        return w(h(F), 2);
      },
      Matrix: function(F) {
        return w(F, 2);
      },
      "Array, number | BigNumber | string": function(F, y) {
        return w(h(F), y);
      },
      "Matrix, number | BigNumber | string": function(F, y) {
        return w(F, y);
      }
    });
    function d(_) {
      var F = 0;
      return _.forEach(function(y) {
        var M = t(y);
        f(M, F) && (F = M);
      }, true), F;
    }
    function l(_) {
      var F;
      return _.forEach(function(y) {
        var M = t(y);
        (!F || o(M, F)) && (F = M);
      }, true), F || 0;
    }
    function m(_, F) {
      if (F === Number.POSITIVE_INFINITY || F === "inf") return d(_);
      if (F === Number.NEGATIVE_INFINITY || F === "-inf") return l(_);
      if (F === "fro") return w(_, 2);
      if (typeof F == "number" && !isNaN(F)) {
        if (!s(F, 0)) {
          var y = 0;
          return _.forEach(function(M) {
            y = n(i(t(M), F), y);
          }, true), i(y, 1 / F);
        }
        return Number.POSITIVE_INFINITY;
      }
      throw new Error("Unsupported parameter value");
    }
    function D(_) {
      var F = 0;
      return _.forEach(function(y, M) {
        F = n(F, c(y, u(y)));
      }), t(a(F));
    }
    function b(_) {
      var F = [], y = 0;
      return _.forEach(function(M, B) {
        var S = B[1], O = n(F[S] || 0, t(M));
        f(O, y) && (y = O), F[S] = O;
      }, true), y;
    }
    function g(_) {
      var F = _.size();
      if (F[0] !== F[1]) throw new RangeError("Invalid matrix dimensions");
      var y = p(_), M = c(y, _), B = v(M).values.toArray(), S = B[B.length - 1];
      return t(a(S));
    }
    function C(_) {
      var F = [], y = 0;
      return _.forEach(function(M, B) {
        var S = B[0], O = n(F[S] || 0, t(M));
        f(O, y) && (y = O), F[S] = O;
      }, true), y;
    }
    function A(_, F) {
      if (F === 1) return b(_);
      if (F === Number.POSITIVE_INFINITY || F === "inf") return C(_);
      if (F === "fro") return D(_);
      if (F === 2) return g(_);
      throw new Error("Unsupported parameter value " + F);
    }
    function w(_, F) {
      var y = _.size();
      if (y.length === 1) return m(_, F);
      if (y.length === 2) {
        if (y[0] && y[1]) return A(_, F);
        throw new RangeError("Invalid matrix dimensions");
      }
    }
  }), zi = "dot", Fl = [
    "typed",
    "addScalar",
    "multiplyScalar",
    "conj",
    "size"
  ], El = ir(zi, Fl, (r) => {
    var { typed: e, addScalar: t, multiplyScalar: n, conj: i, size: u } = r;
    return e(zi, {
      "Array | DenseMatrix, Array | DenseMatrix": c,
      "SparseMatrix, SparseMatrix": s
    });
    function a(o, h) {
      var p = f(o), v = f(h), d, l;
      if (p.length === 1) d = p[0];
      else if (p.length === 2 && p[1] === 1) d = p[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
      if (v.length === 1) l = v[0];
      else if (v.length === 2 && v[1] === 1) l = v[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
      if (d !== l) throw new RangeError("Vectors must have equal length (" + d + " != " + l + ")");
      if (d === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
      return d;
    }
    function c(o, h) {
      var p = a(o, h), v = zr(o) ? o._data : o, d = zr(o) ? o._datatype || o.getDataType() : void 0, l = zr(h) ? h._data : h, m = zr(h) ? h._datatype || h.getDataType() : void 0, D = f(o).length === 2, b = f(h).length === 2, g = t, C = n;
      if (d && m && d === m && typeof d == "string" && d !== "mixed") {
        var A = d;
        g = e.find(t, [
          A,
          A
        ]), C = e.find(n, [
          A,
          A
        ]);
      }
      if (!D && !b) {
        for (var w = C(i(v[0]), l[0]), _ = 1; _ < p; _++) w = g(w, C(i(v[_]), l[_]));
        return w;
      }
      if (!D && b) {
        for (var F = C(i(v[0]), l[0][0]), y = 1; y < p; y++) F = g(F, C(i(v[y]), l[y][0]));
        return F;
      }
      if (D && !b) {
        for (var M = C(i(v[0][0]), l[0]), B = 1; B < p; B++) M = g(M, C(i(v[B][0]), l[B]));
        return M;
      }
      if (D && b) {
        for (var S = C(i(v[0][0]), l[0][0]), O = 1; O < p; O++) S = g(S, C(i(v[O][0]), l[O][0]));
        return S;
      }
    }
    function s(o, h) {
      a(o, h);
      for (var p = o._index, v = o._values, d = h._index, l = h._values, m = 0, D = t, b = n, g = 0, C = 0; g < p.length && C < d.length; ) {
        var A = p[g], w = d[C];
        if (A < w) {
          g++;
          continue;
        }
        if (A > w) {
          C++;
          continue;
        }
        A === w && (m = D(m, b(v[g], l[C])), g++, C++);
      }
      return m;
    }
    function f(o) {
      return zr(o) ? o.size() : u(o);
    }
  }), $i = "qr", bl = [
    "typed",
    "matrix",
    "zeros",
    "identity",
    "isZero",
    "equal",
    "sign",
    "sqrt",
    "conj",
    "unaryMinus",
    "addScalar",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "complex"
  ], Cl = ir($i, bl, (r) => {
    var { typed: e, matrix: t, zeros: n, identity: i, isZero: u, equal: a, sign: c, sqrt: s, conj: f, unaryMinus: o, addScalar: h, divideScalar: p, multiplyScalar: v, subtractScalar: d, complex: l } = r;
    return Ke(e($i, {
      DenseMatrix: function(C) {
        return D(C);
      },
      SparseMatrix: function(C) {
        return b();
      },
      Array: function(C) {
        var A = t(C), w = D(A);
        return {
          Q: w.Q.valueOf(),
          R: w.R.valueOf()
        };
      }
    }), {
      _denseQRimpl: m
    });
    function m(g) {
      var C = g._size[0], A = g._size[1], w = i([
        C
      ], "dense"), _ = w._data, F = g.clone(), y = F._data, M, B, S, O = n([
        C
      ], "");
      for (S = 0; S < Math.min(A, C); ++S) {
        var x = y[S][S], z = o(a(x, 0) ? 1 : c(x)), T = f(z), J = 0;
        for (M = S; M < C; M++) J = h(J, v(y[M][S], f(y[M][S])));
        var q = v(z, s(J));
        if (!u(q)) {
          var Z = d(x, q);
          for (O[S] = 1, M = S + 1; M < C; M++) O[M] = p(y[M][S], Z);
          var nr = o(f(p(Z, q))), fr = void 0;
          for (B = S; B < A; B++) {
            for (fr = 0, M = S; M < C; M++) fr = h(fr, v(f(O[M]), y[M][B]));
            for (fr = v(fr, nr), M = S; M < C; M++) y[M][B] = v(d(y[M][B], v(O[M], fr)), T);
          }
          for (M = 0; M < C; M++) {
            for (fr = 0, B = S; B < C; B++) fr = h(fr, v(_[M][B], O[B]));
            for (fr = v(fr, nr), B = S; B < C; ++B) _[M][B] = p(d(_[M][B], v(fr, f(O[B]))), T);
          }
        }
      }
      return {
        Q: w,
        R: F,
        toString: function() {
          return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
        }
      };
    }
    function D(g) {
      var C = m(g), A = C.R._data;
      if (g._data.length > 0) for (var w = A[0][0].type === "Complex" ? l(0) : 0, _ = 0; _ < A.length; ++_) for (var F = 0; F < _ && F < (A[0] || []).length; ++F) A[_][F] = w;
      return C;
    }
    function b(g) {
      throw new Error("qr not implemented for sparse matrices yet");
    }
  }), Pi = "det", _l = [
    "typed",
    "matrix",
    "subtractScalar",
    "multiply",
    "divideScalar",
    "isZero",
    "unaryMinus"
  ], Bl = ir(Pi, _l, (r) => {
    var { typed: e, matrix: t, subtractScalar: n, multiply: i, divideScalar: u, isZero: a, unaryMinus: c } = r;
    return e(Pi, {
      any: function(o) {
        return Br(o);
      },
      "Array | Matrix": function(o) {
        var h;
        switch (zr(o) ? h = o.size() : Array.isArray(o) ? (o = t(o), h = o.size()) : h = [], h.length) {
          case 0:
            return Br(o);
          case 1:
            if (h[0] === 1) return Br(o.valueOf()[0]);
            if (h[0] === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Lr(h) + ")");
          case 2: {
            var p = h[0], v = h[1];
            if (p === v) return s(o.clone().valueOf(), p);
            if (v === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Lr(h) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Lr(h) + ")");
        }
      }
    });
    function s(f, o, h) {
      if (o === 1) return Br(f[0][0]);
      if (o === 2) return n(i(f[0][0], f[1][1]), i(f[1][0], f[0][1]));
      for (var p = false, v = new Array(o).fill(0).map((_, F) => F), d = 0; d < o; d++) {
        var l = v[d];
        if (a(f[l][d])) {
          var m = void 0;
          for (m = d + 1; m < o; m++) if (!a(f[v[m]][d])) {
            l = v[m], v[m] = v[d], v[d] = l, p = !p;
            break;
          }
          if (m === o) return f[l][d];
        }
        for (var D = f[l][d], b = d === 0 ? 1 : f[v[d - 1]][d - 1], g = d + 1; g < o; g++) for (var C = v[g], A = d + 1; A < o; A++) f[C][A] = u(n(i(f[C][A], D), i(f[C][d], f[l][A])), b);
      }
      var w = f[v[o - 1]][o - 1];
      return p ? c(w) : w;
    }
  }), Ri = "inv", Ml = [
    "typed",
    "matrix",
    "divideScalar",
    "addScalar",
    "multiply",
    "unaryMinus",
    "det",
    "identity",
    "abs"
  ], Sl = ir(Ri, Ml, (r) => {
    var { typed: e, matrix: t, divideScalar: n, addScalar: i, multiply: u, unaryMinus: a, det: c, identity: s, abs: f } = r;
    return e(Ri, {
      "Array | Matrix": function(p) {
        var v = zr(p) ? p.size() : Or(p);
        switch (v.length) {
          case 1:
            if (v[0] === 1) return zr(p) ? t([
              n(1, p.valueOf()[0])
            ]) : [
              n(1, p[0])
            ];
            throw new RangeError("Matrix must be square (size: " + Lr(v) + ")");
          case 2: {
            var d = v[0], l = v[1];
            if (d === l) return zr(p) ? t(o(p.valueOf(), d, l), p.storage()) : o(p, d, l);
            throw new RangeError("Matrix must be square (size: " + Lr(v) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Lr(v) + ")");
        }
      },
      any: function(p) {
        return n(1, p);
      }
    });
    function o(h, p, v) {
      var d, l, m, D, b;
      if (p === 1) {
        if (D = h[0][0], D === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            n(1, D)
          ]
        ];
      } else if (p === 2) {
        var g = c(h);
        if (g === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            n(h[1][1], g),
            n(a(h[0][1]), g)
          ],
          [
            n(a(h[1][0]), g),
            n(h[0][0], g)
          ]
        ];
      } else {
        var C = h.concat();
        for (d = 0; d < p; d++) C[d] = C[d].concat();
        for (var A = s(p).valueOf(), w = 0; w < v; w++) {
          var _ = f(C[w][w]), F = w;
          for (d = w + 1; d < p; ) f(C[d][w]) > _ && (_ = f(C[d][w]), F = d), d++;
          if (_ === 0) throw Error("Cannot calculate inverse, determinant is zero");
          d = F, d !== w && (b = C[w], C[w] = C[d], C[d] = b, b = A[w], A[w] = A[d], A[d] = b);
          var y = C[w], M = A[w];
          for (d = 0; d < p; d++) {
            var B = C[d], S = A[d];
            if (d !== w) {
              if (B[w] !== 0) {
                for (m = n(a(B[w]), y[w]), l = w; l < v; l++) B[l] = i(B[l], u(m, y[l]));
                for (l = 0; l < v; l++) S[l] = i(S[l], u(m, M[l]));
              }
            } else {
              for (m = y[w], l = w; l < v; l++) B[l] = n(B[l], m);
              for (l = 0; l < v; l++) S[l] = n(S[l], m);
            }
          }
        }
        return A;
      }
    }
  });
  function Nl(r) {
    var { addScalar: e, subtract: t, flatten: n, multiply: i, multiplyScalar: u, divideScalar: a, sqrt: c, abs: s, bignumber: f, diag: o, size: h, reshape: p, inv: v, qr: d, usolve: l, usolveAll: m, equal: D, complex: b, larger: g, smaller: C, matrixFromColumns: A, dot: w } = r;
    function _(R, W, tr, or) {
      var rr = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, G = F(R, W, tr, or, rr);
      y(R, W, tr, or, rr, G);
      var { values: j, C: Q } = M(R, W, tr, or, rr);
      if (rr) {
        var X = B(R, W, Q, G, j, tr, or);
        return {
          values: j,
          eigenvectors: X
        };
      }
      return {
        values: j
      };
    }
    function F(R, W, tr, or, rr) {
      var G = or === "BigNumber", j = or === "Complex", Q = G ? f(0) : 0, X = G ? f(1) : j ? b(1) : 1, cr = G ? f(1) : 1, er = G ? f(10) : 2, hr = u(er, er), gr;
      rr && (gr = Array(W).fill(X));
      for (var Dr = false; !Dr; ) {
        Dr = true;
        for (var wr = 0; wr < W; wr++) {
          for (var Fr = Q, br = Q, Cr = 0; Cr < W; Cr++) wr !== Cr && (Fr = e(Fr, s(R[Cr][wr])), br = e(br, s(R[wr][Cr])));
          if (!D(Fr, 0) && !D(br, 0)) {
            for (var _r = cr, xr = Fr, Jr = a(br, er), E = u(br, er); C(xr, Jr); ) xr = u(xr, hr), _r = u(_r, er);
            for (; g(xr, E); ) xr = a(xr, hr), _r = a(_r, er);
            var N = C(a(e(xr, br), _r), u(e(Fr, br), 0.95));
            if (N) {
              Dr = false;
              for (var I = a(1, _r), $ = 0; $ < W; $++) wr !== $ && (R[wr][$] = u(R[wr][$], I), R[$][wr] = u(R[$][wr], _r));
              rr && (gr[wr] = u(gr[wr], I));
            }
          }
        }
      }
      return rr ? o(gr) : null;
    }
    function y(R, W, tr, or, rr, G) {
      var j = or === "BigNumber", Q = or === "Complex", X = j ? f(0) : Q ? b(0) : 0;
      j && (tr = f(tr));
      for (var cr = 0; cr < W - 2; cr++) {
        for (var er = 0, hr = X, gr = cr + 1; gr < W; gr++) {
          var Dr = R[gr][cr];
          C(s(hr), s(Dr)) && (hr = Dr, er = gr);
        }
        if (!C(s(hr), tr)) {
          if (er !== cr + 1) {
            var wr = R[er];
            R[er] = R[cr + 1], R[cr + 1] = wr;
            for (var Fr = 0; Fr < W; Fr++) {
              var br = R[Fr][er];
              R[Fr][er] = R[Fr][cr + 1], R[Fr][cr + 1] = br;
            }
            if (rr) {
              var Cr = G[er];
              G[er] = G[cr + 1], G[cr + 1] = Cr;
            }
          }
          for (var _r = cr + 2; _r < W; _r++) {
            var xr = a(R[_r][cr], hr);
            if (xr !== 0) {
              for (var Jr = 0; Jr < W; Jr++) R[_r][Jr] = t(R[_r][Jr], u(xr, R[cr + 1][Jr]));
              for (var E = 0; E < W; E++) R[E][cr + 1] = e(R[E][cr + 1], u(xr, R[E][_r]));
              if (rr) for (var N = 0; N < W; N++) G[_r][N] = t(G[_r][N], u(xr, G[cr + 1][N]));
            }
          }
        }
      }
      return G;
    }
    function M(R, W, tr, or, rr) {
      var G = or === "BigNumber", j = or === "Complex", Q = G ? f(1) : j ? b(1) : 1;
      G && (tr = f(tr));
      for (var X = Br(R), cr = [], er = W, hr = [], gr = rr ? o(Array(W).fill(Q)) : void 0, Dr = rr ? o(Array(er).fill(Q)) : void 0, wr = 0; wr <= 100; ) {
        wr += 1;
        for (var Fr = X[er - 1][er - 1], br = 0; br < er; br++) X[br][br] = t(X[br][br], Fr);
        var { Q: Cr, R: _r } = d(X);
        X = i(_r, Cr);
        for (var xr = 0; xr < er; xr++) X[xr][xr] = e(X[xr][xr], Fr);
        if (rr && (Dr = i(Dr, Cr)), er === 1 || C(s(X[er - 1][er - 2]), tr)) {
          wr = 0, cr.push(X[er - 1][er - 1]), rr && (hr.unshift([
            [
              1
            ]
          ]), x(Dr, W), gr = i(gr, Dr), er > 1 && (Dr = o(Array(er - 1).fill(Q)))), er -= 1, X.pop();
          for (var Jr = 0; Jr < er; Jr++) X[Jr].pop();
        } else if (er === 2 || C(s(X[er - 2][er - 3]), tr)) {
          wr = 0;
          var E = S(X[er - 2][er - 2], X[er - 2][er - 1], X[er - 1][er - 2], X[er - 1][er - 1]);
          cr.push(...E), rr && (hr.unshift(O(X[er - 2][er - 2], X[er - 2][er - 1], X[er - 1][er - 2], X[er - 1][er - 1], E[0], E[1], tr, or)), x(Dr, W), gr = i(gr, Dr), er > 2 && (Dr = o(Array(er - 2).fill(Q)))), er -= 2, X.pop(), X.pop();
          for (var N = 0; N < er; N++) X[N].pop(), X[N].pop();
        }
        if (er === 0) break;
      }
      if (cr.sort((V, U) => +t(s(V), s(U))), wr > 100) {
        var I = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + cr.join(", "));
        throw I.values = cr, I.vectors = [], I;
      }
      var $ = rr ? i(gr, z(hr, W)) : void 0;
      return {
        values: cr,
        C: $
      };
    }
    function B(R, W, tr, or, rr, G, j) {
      var Q = v(tr), X = i(Q, R, tr), cr = j === "BigNumber", er = j === "Complex", hr = cr ? f(0) : er ? b(0) : 0, gr = cr ? f(1) : er ? b(1) : 1, Dr = [], wr = [];
      for (var Fr of rr) {
        var br = T(Dr, Fr, D);
        br === -1 ? (Dr.push(Fr), wr.push(1)) : wr[br] += 1;
      }
      for (var Cr = [], _r = Dr.length, xr = Array(W).fill(hr), Jr = o(Array(W).fill(gr)), E = function() {
        var $ = Dr[N], V = t(X, i($, Jr)), U = m(V, xr);
        for (U.shift(); U.length < wr[N]; ) {
          var ur = J(V, W, U, G, j);
          if (ur === null) break;
          U.push(ur);
        }
        var k = i(v(or), tr);
        U = U.map((ar) => i(k, ar)), Cr.push(...U.map((ar) => ({
          value: $,
          vector: n(ar)
        })));
      }, N = 0; N < _r; N++) E();
      return Cr;
    }
    function S(R, W, tr, or) {
      var rr = e(R, or), G = t(u(R, or), u(W, tr)), j = u(rr, 0.5), Q = u(c(t(u(rr, rr), u(4, G))), 0.5);
      return [
        e(j, Q),
        t(j, Q)
      ];
    }
    function O(R, W, tr, or, rr, G, j, Q) {
      var X = Q === "BigNumber", cr = Q === "Complex", er = X ? f(0) : cr ? b(0) : 0, hr = X ? f(1) : cr ? b(1) : 1;
      if (C(s(tr), j)) return [
        [
          hr,
          er
        ],
        [
          er,
          hr
        ]
      ];
      if (g(s(t(rr, G)), j)) return [
        [
          t(rr, or),
          t(G, or)
        ],
        [
          tr,
          tr
        ]
      ];
      var gr = t(R, rr), Dr = t(or, rr);
      return C(s(W), j) && C(s(Dr), j) ? [
        [
          gr,
          hr
        ],
        [
          tr,
          er
        ]
      ] : [
        [
          W,
          er
        ],
        [
          Dr,
          hr
        ]
      ];
    }
    function x(R, W) {
      for (var tr = 0; tr < R.length; tr++) R[tr].push(...Array(W - R[tr].length).fill(0));
      for (var or = R.length; or < W; or++) R.push(Array(W).fill(0)), R[or][or] = 1;
      return R;
    }
    function z(R, W) {
      for (var tr = [], or = 0; or < W; or++) tr[or] = Array(W).fill(0);
      var rr = 0;
      for (var G of R) {
        for (var j = G.length, Q = 0; Q < j; Q++) for (var X = 0; X < j; X++) tr[rr + Q][rr + X] = G[Q][X];
        rr += j;
      }
      return tr;
    }
    function T(R, W, tr) {
      for (var or = 0; or < R.length; or++) if (tr(R[or], W)) return or;
      return -1;
    }
    function J(R, W, tr, or, rr) {
      for (var G = rr === "BigNumber" ? f(1e3) : 1e3, j, Q = 0; Q < 5; ++Q) {
        j = q(W, tr, rr);
        try {
          j = l(R, j);
        } catch {
          continue;
        }
        if (g(nr(j), G)) break;
      }
      if (Q >= 5) return null;
      for (Q = 0; ; ) {
        var X = l(R, j);
        if (C(nr(Z(j, [
          X
        ])), or)) break;
        if (++Q >= 10) return null;
        j = fr(X);
      }
      return j;
    }
    function q(R, W, tr) {
      var or = tr === "BigNumber", rr = tr === "Complex", G = Array(R).fill(0).map((j) => 2 * Math.random() - 1);
      return or && (G = G.map((j) => f(j))), rr && (G = G.map((j) => b(j))), G = Z(G, W), fr(G, tr);
    }
    function Z(R, W) {
      var tr = h(R);
      for (var or of W) or = p(or, tr), R = t(R, i(a(w(or, R), w(or, or)), or));
      return R;
    }
    function nr(R) {
      return s(c(w(R, R)));
    }
    function fr(R, W) {
      var tr = W === "BigNumber", or = W === "Complex", rr = tr ? f(1) : or ? b(1) : 1;
      return i(a(rr, nr(R)), R);
    }
    return _;
  }
  function xl(r) {
    var { config: e, addScalar: t, subtract: n, abs: i, atan: u, cos: a, sin: c, multiplyScalar: s, inv: f, bignumber: o, multiply: h, add: p } = r;
    function v(y, M) {
      var B = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, S = arguments.length > 3 ? arguments[3] : void 0, O = arguments.length > 4 ? arguments[4] : void 0;
      if (S === "number") return d(y, B, O);
      if (S === "BigNumber") return l(y, B, O);
      throw TypeError("Unsupported data type: " + S);
    }
    function d(y, M, B) {
      var S = y.length, O = Math.abs(M / S), x, z;
      if (B) {
        z = new Array(S);
        for (var T = 0; T < S; T++) z[T] = Array(S).fill(0), z[T][T] = 1;
      }
      for (var J = w(y); Math.abs(J[1]) >= Math.abs(O); ) {
        var q = J[0][0], Z = J[0][1];
        x = m(y[q][q], y[Z][Z], y[q][Z]), y = A(y, x, q, Z), B && (z = b(z, x, q, Z)), J = w(y);
      }
      for (var nr = Array(S).fill(0), fr = 0; fr < S; fr++) nr[fr] = y[fr][fr];
      return F(Br(nr), z, B);
    }
    function l(y, M, B) {
      var S = y.length, O = i(M / S), x, z;
      if (B) {
        z = new Array(S);
        for (var T = 0; T < S; T++) z[T] = Array(S).fill(0), z[T][T] = 1;
      }
      for (var J = _(y); i(J[1]) >= i(O); ) {
        var q = J[0][0], Z = J[0][1];
        x = D(y[q][q], y[Z][Z], y[q][Z]), y = C(y, x, q, Z), B && (z = g(z, x, q, Z)), J = _(y);
      }
      for (var nr = Array(S).fill(0), fr = 0; fr < S; fr++) nr[fr] = y[fr][fr];
      return F(Br(nr), z, B);
    }
    function m(y, M, B) {
      var S = M - y;
      return Math.abs(S) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * B / (M - y));
    }
    function D(y, M, B) {
      var S = n(M, y);
      return i(S) <= e.relTol ? o(-1).acos().div(4) : s(0.5, u(h(2, B, f(S))));
    }
    function b(y, M, B, S) {
      for (var O = y.length, x = Math.cos(M), z = Math.sin(M), T = Array(O).fill(0), J = Array(O).fill(0), q = 0; q < O; q++) T[q] = x * y[q][B] - z * y[q][S], J[q] = z * y[q][B] + x * y[q][S];
      for (var Z = 0; Z < O; Z++) y[Z][B] = T[Z], y[Z][S] = J[Z];
      return y;
    }
    function g(y, M, B, S) {
      for (var O = y.length, x = a(M), z = c(M), T = Array(O).fill(o(0)), J = Array(O).fill(o(0)), q = 0; q < O; q++) T[q] = n(s(x, y[q][B]), s(z, y[q][S])), J[q] = t(s(z, y[q][B]), s(x, y[q][S]));
      for (var Z = 0; Z < O; Z++) y[Z][B] = T[Z], y[Z][S] = J[Z];
      return y;
    }
    function C(y, M, B, S) {
      for (var O = y.length, x = o(a(M)), z = o(c(M)), T = s(x, x), J = s(z, z), q = Array(O).fill(o(0)), Z = Array(O).fill(o(0)), nr = h(o(2), x, z, y[B][S]), fr = t(n(s(T, y[B][B]), nr), s(J, y[S][S])), R = p(s(J, y[B][B]), nr, s(T, y[S][S])), W = 0; W < O; W++) q[W] = n(s(x, y[B][W]), s(z, y[S][W])), Z[W] = t(s(z, y[B][W]), s(x, y[S][W]));
      y[B][B] = fr, y[S][S] = R, y[B][S] = o(0), y[S][B] = o(0);
      for (var tr = 0; tr < O; tr++) tr !== B && tr !== S && (y[B][tr] = q[tr], y[tr][B] = q[tr], y[S][tr] = Z[tr], y[tr][S] = Z[tr]);
      return y;
    }
    function A(y, M, B, S) {
      for (var O = y.length, x = Math.cos(M), z = Math.sin(M), T = x * x, J = z * z, q = Array(O).fill(0), Z = Array(O).fill(0), nr = T * y[B][B] - 2 * x * z * y[B][S] + J * y[S][S], fr = J * y[B][B] + 2 * x * z * y[B][S] + T * y[S][S], R = 0; R < O; R++) q[R] = x * y[B][R] - z * y[S][R], Z[R] = z * y[B][R] + x * y[S][R];
      y[B][B] = nr, y[S][S] = fr, y[B][S] = 0, y[S][B] = 0;
      for (var W = 0; W < O; W++) W !== B && W !== S && (y[B][W] = q[W], y[W][B] = q[W], y[S][W] = Z[W], y[W][S] = Z[W]);
      return y;
    }
    function w(y) {
      for (var M = y.length, B = 0, S = [
        0,
        1
      ], O = 0; O < M; O++) for (var x = O + 1; x < M; x++) Math.abs(B) < Math.abs(y[O][x]) && (B = Math.abs(y[O][x]), S = [
        O,
        x
      ]);
      return [
        S,
        B
      ];
    }
    function _(y) {
      for (var M = y.length, B = 0, S = [
        0,
        1
      ], O = 0; O < M; O++) for (var x = O + 1; x < M; x++) i(B) < i(y[O][x]) && (B = i(y[O][x]), S = [
        O,
        x
      ]);
      return [
        S,
        B
      ];
    }
    function F(y, M, B) {
      var S = y.length, O = Array(S), x;
      if (B) {
        x = Array(S);
        for (var z = 0; z < S; z++) x[z] = Array(S);
      }
      for (var T = 0; T < S; T++) {
        for (var J = 0, q = y[0], Z = 0; Z < y.length; Z++) i(y[Z]) < i(q) && (J = Z, q = y[J]);
        if (O[T] = y.splice(J, 1)[0], B) for (var nr = 0; nr < S; nr++) x[T][nr] = M[nr][J], M[nr].splice(J, 1);
      }
      if (!B) return {
        values: O
      };
      var fr = x.map((R, W) => ({
        value: O[W],
        vector: R
      }));
      return {
        values: O,
        eigenvectors: fr
      };
    }
    return v;
  }
  var Tl = "eigs", Il = [
    "config",
    "typed",
    "matrix",
    "addScalar",
    "equal",
    "subtract",
    "abs",
    "atan",
    "cos",
    "sin",
    "multiplyScalar",
    "divideScalar",
    "inv",
    "bignumber",
    "multiply",
    "add",
    "larger",
    "column",
    "flatten",
    "number",
    "complex",
    "sqrt",
    "diag",
    "size",
    "reshape",
    "qr",
    "usolve",
    "usolveAll",
    "im",
    "re",
    "smaller",
    "matrixFromColumns",
    "dot"
  ], Ol = ir(Tl, Il, (r) => {
    var { config: e, typed: t, matrix: n, addScalar: i, subtract: u, equal: a, abs: c, atan: s, cos: f, sin: o, multiplyScalar: h, divideScalar: p, inv: v, bignumber: d, multiply: l, add: m, larger: D, column: b, flatten: g, number: C, complex: A, sqrt: w, diag: _, size: F, reshape: y, qr: M, usolve: B, usolveAll: S, im: O, re: x, smaller: z, matrixFromColumns: T, dot: J } = r, q = xl({
      config: e,
      addScalar: i,
      subtract: u,
      abs: c,
      atan: s,
      cos: f,
      sin: o,
      multiplyScalar: h,
      inv: v,
      bignumber: d,
      multiply: l,
      add: m
    }), Z = Nl({
      addScalar: i,
      subtract: u,
      multiply: l,
      multiplyScalar: h,
      flatten: g,
      divideScalar: p,
      sqrt: w,
      abs: c,
      bignumber: d,
      diag: _,
      size: F,
      reshape: y,
      qr: M,
      inv: v,
      usolve: B,
      usolveAll: S,
      equal: a,
      complex: A,
      larger: D,
      smaller: z,
      matrixFromColumns: T,
      dot: J
    });
    return t("eigs", {
      Array: function(G) {
        return nr(n(G));
      },
      "Array, number|BigNumber": function(G, j) {
        return nr(n(G), {
          precision: j
        });
      },
      "Array, Object"(rr, G) {
        return nr(n(rr), G);
      },
      Matrix: function(G) {
        return nr(G, {
          matricize: true
        });
      },
      "Matrix, number|BigNumber": function(G, j) {
        return nr(G, {
          precision: j,
          matricize: true
        });
      },
      "Matrix, Object": function(G, j) {
        var Q = {
          matricize: true
        };
        return Ke(Q, j), nr(G, Q);
      }
    });
    function nr(rr) {
      var G, j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, Q = "eigenvectors" in j ? j.eigenvectors : true, X = (G = j.precision) !== null && G !== void 0 ? G : e.relTol, cr = fr(rr, X, Q);
      return j.matricize && (cr.values = n(cr.values), Q && (cr.eigenvectors = cr.eigenvectors.map((er) => {
        var { value: hr, vector: gr } = er;
        return {
          value: hr,
          vector: n(gr)
        };
      }))), Q && Object.defineProperty(cr, "vectors", {
        enumerable: false,
        get: () => {
          throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
        }
      }), cr;
    }
    function fr(rr, G, j) {
      var Q = rr.toArray(), X = rr.size();
      if (X.length !== 2 || X[0] !== X[1]) throw new RangeError("Matrix must be square (size: ".concat(Lr(X), ")"));
      var cr = X[0];
      if (W(Q, cr, G) && (tr(Q, cr), R(Q, cr, G))) {
        var er = or(rr, Q, cr);
        return q(Q, cr, G, er, j);
      }
      var hr = or(rr, Q, cr);
      return Z(Q, cr, G, hr, j);
    }
    function R(rr, G, j) {
      for (var Q = 0; Q < G; Q++) for (var X = Q; X < G; X++) if (D(d(c(u(rr[Q][X], rr[X][Q]))), j)) return false;
      return true;
    }
    function W(rr, G, j) {
      for (var Q = 0; Q < G; Q++) for (var X = 0; X < G; X++) if (D(d(c(O(rr[Q][X]))), j)) return false;
      return true;
    }
    function tr(rr, G) {
      for (var j = 0; j < G; j++) for (var Q = 0; Q < G; Q++) rr[j][Q] = x(rr[j][Q]);
    }
    function or(rr, G, j) {
      var Q = rr.datatype();
      if (Q === "number" || Q === "BigNumber" || Q === "Complex") return Q;
      for (var X = false, cr = false, er = false, hr = 0; hr < j; hr++) for (var gr = 0; gr < j; gr++) {
        var Dr = G[hr][gr];
        if (Pr(Dr) || mn(Dr)) X = true;
        else if (Yr(Dr)) cr = true;
        else if (dn(Dr)) er = true;
        else throw TypeError("Unsupported type in Matrix: " + Fe(Dr));
      }
      if (cr && er && console.warn("Complex BigNumbers not supported, this operation will lose precission."), er) {
        for (var wr = 0; wr < j; wr++) for (var Fr = 0; Fr < j; Fr++) G[wr][Fr] = A(G[wr][Fr]);
        return "Complex";
      }
      if (cr) {
        for (var br = 0; br < j; br++) for (var Cr = 0; Cr < j; Cr++) G[br][Cr] = d(G[br][Cr]);
        return "BigNumber";
      }
      if (X) {
        for (var _r = 0; _r < j; _r++) for (var xr = 0; xr < j; xr++) G[_r][xr] = C(G[_r][xr]);
        return "number";
      } else throw TypeError("Matrix contains unsupported types only.");
    }
  }), zl = "divide", $l = [
    "typed",
    "matrix",
    "multiply",
    "equalScalar",
    "divideScalar",
    "inv"
  ], Pl = ir(zl, $l, (r) => {
    var { typed: e, matrix: t, multiply: n, equalScalar: i, divideScalar: u, inv: a } = r, c = bu({
      typed: e,
      equalScalar: i
    }), s = bn({
      typed: e
    });
    return e("divide", Vi({
      "Array | Matrix, Array | Matrix": function(o, h) {
        return n(o, a(h));
      },
      "DenseMatrix, any": function(o, h) {
        return s(o, h, u, false);
      },
      "SparseMatrix, any": function(o, h) {
        return c(o, h, u, false);
      },
      "Array, any": function(o, h) {
        return s(t(o), h, u, false).valueOf();
      },
      "any, Array | Matrix": function(o, h) {
        return n(o, a(h));
      }
    }, u.signatures));
  });
  const Rl = {}, ql = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Rl
  }, Symbol.toStringTag, {
    value: "Module"
  })), en = Wc(ql);
  var vt = ko({
    config: oe
  }), Gt = ns({}), Cn = cs({}), _n = vs({}), pe = Bs({
    Matrix: _n
  }), dr = ro({
    BigNumber: vt,
    Complex: Gt,
    DenseMatrix: pe,
    Fraction: Cn
  }), Bn = ff({
    typed: dr
  }), nt = lf({
    typed: dr
  }), Ul = vl({
    typed: dr
  }), Mn = Ks({
    Complex: Gt,
    typed: dr
  }), Jt = jf({
    typed: dr
  }), Ll = dl({
    typed: dr
  }), Ce = Ps({
    config: oe,
    typed: dr
  }), xu = vc({
    typed: dr
  }), Zl = dc({
    typed: dr
  }), Wl = ec({
    typed: dr
  }), Tu = Ss({
    typed: dr
  }), Vl = Ts({
    config: oe,
    typed: dr
  }), Iu = Os({
    equalScalar: Ce,
    typed: dr
  }), it = Uf({
    typed: dr
  }), Sn = Ys({
    typed: dr
  }), Yl = nc({
    typed: dr
  }), Gl = Vf({
    BigNumber: vt,
    Fraction: Cn,
    complex: Mn,
    typed: dr
  }), Jl = Dl({
    typed: dr
  }), xe = Us({
    Matrix: _n,
    equalScalar: Ce,
    typed: dr
  }), pt = vf({
    typed: dr
  }), dt = Qs({
    BigNumber: vt,
    typed: dr
  }), $r = tf({
    DenseMatrix: pe,
    Matrix: _n,
    SparseMatrix: xe,
    typed: dr
  }), Ql = Fc({
    isInteger: Tu,
    matrix: $r,
    typed: dr
  }), Nn = Jf({
    Complex: Gt,
    config: oe,
    typed: dr
  }), Ou = _c({
    matrix: $r,
    typed: dr
  }), Xl = Nc({
    BigNumber: vt,
    config: oe,
    matrix: $r,
    typed: dr
  }), We = uc({
    isInteger: Tu,
    matrix: $r,
    typed: dr
  }), Hl = Mc({
    conj: Jt,
    transpose: Ou,
    typed: dr
  }), Kl = lc({
    DenseMatrix: pe,
    SparseMatrix: xe,
    matrix: $r,
    typed: dr
  }), zu = Yc({
    DenseMatrix: pe,
    SparseMatrix: xe,
    concat: We,
    equalScalar: Ce,
    matrix: $r,
    typed: dr
  }), $u = rf({
    Fraction: Cn,
    typed: dr
  }), xn = Dc({
    BigNumber: vt,
    DenseMatrix: pe,
    SparseMatrix: xe,
    config: oe,
    matrix: $r,
    typed: dr
  }), kl = nl({
    DenseMatrix: pe,
    SparseMatrix: xe,
    concat: We,
    config: oe,
    matrix: $r,
    typed: dr
  }), jl = Ic({
    bignumber: dt,
    fraction: $u,
    number: Sn
  }), Tn = bc({
    matrix: $r,
    config: oe,
    typed: dr
  }), Qt = Qc({
    DenseMatrix: pe,
    SparseMatrix: xe,
    bignumber: dt,
    concat: We,
    config: oe,
    matrix: $r,
    typed: dr
  }), Xt = of({
    typed: dr
  }), In = yl({
    DenseMatrix: pe,
    SparseMatrix: xe,
    addScalar: nt,
    concat: We,
    equalScalar: Ce,
    matrix: $r,
    typed: dr
  }), Ve = zc({
    numeric: jl,
    typed: dr
  }), r0 = ol({
    DenseMatrix: pe,
    smaller: Qt
  }), e0 = cl({
    ImmutableDenseMatrix: r0,
    getMatrixDataType: Zl
  }), On = rl({
    DenseMatrix: pe,
    SparseMatrix: xe,
    bignumber: dt,
    concat: We,
    config: oe,
    matrix: $r,
    typed: dr
  }), t0 = uf({
    flatten: xu,
    matrix: $r,
    size: Tn,
    typed: dr
  }), n0 = Cl({
    addScalar: nt,
    complex: Mn,
    conj: Jt,
    divideScalar: Ve,
    equal: zu,
    identity: xn,
    isZero: Iu,
    matrix: $r,
    multiplyScalar: it,
    sign: Gl,
    sqrt: Nn,
    subtractScalar: pt,
    typed: dr,
    unaryMinus: Xt,
    zeros: Xl
  }), i0 = Kc({
    DenseMatrix: pe,
    SparseMatrix: xe,
    concat: We,
    config: oe,
    matrix: $r,
    typed: dr
  }), Xe = Xf({
    DenseMatrix: pe,
    concat: We,
    equalScalar: Ce,
    matrix: $r,
    subtractScalar: pt,
    typed: dr,
    unaryMinus: Xt
  }), u0 = qc({
    DenseMatrix: pe,
    divideScalar: Ve,
    equalScalar: Ce,
    matrix: $r,
    multiplyScalar: it,
    subtractScalar: pt,
    typed: dr
  }), Pu = El({
    addScalar: nt,
    conj: Jt,
    multiplyScalar: it,
    size: Tn,
    typed: dr
  }), Ne = Zf({
    addScalar: nt,
    dot: Pu,
    equalScalar: Ce,
    matrix: $r,
    multiplyScalar: it,
    typed: dr
  }), a0 = wc({
    bignumber: dt,
    matrix: $r,
    add: In,
    config: oe,
    isPositive: Vl,
    larger: On,
    largerEq: kl,
    smaller: Qt,
    smallerEq: i0,
    typed: dr
  }), o0 = Lc({
    DenseMatrix: pe,
    divideScalar: Ve,
    equalScalar: Ce,
    matrix: $r,
    multiplyScalar: it,
    subtractScalar: pt,
    typed: dr
  }), s0 = oc({
    Index: e0,
    matrix: $r,
    range: a0,
    typed: dr
  }), At = fc({
    matrix: $r,
    multiply: Ne,
    subtract: Xe,
    typed: dr
  }), f0 = Bl({
    divideScalar: Ve,
    isZero: Iu,
    matrix: $r,
    multiply: Ne,
    subtractScalar: pt,
    typed: dr,
    unaryMinus: Xt
  }), zn = Sl({
    abs: Bn,
    addScalar: nt,
    det: f0,
    divideScalar: Ve,
    identity: xn,
    matrix: $r,
    multiply: Ne,
    typed: dr,
    unaryMinus: Xt
  }), c0 = Pc({
    Complex: Gt,
    config: oe,
    fraction: $u,
    identity: xn,
    inv: zn,
    matrix: $r,
    multiply: Ne,
    number: Sn,
    typed: dr
  }), Ft = Pl({
    divideScalar: Ve,
    equalScalar: Ce,
    inv: zn,
    matrix: $r,
    multiply: Ne,
    typed: dr
  }), l0 = Ol({
    abs: Bn,
    add: In,
    addScalar: nt,
    atan: Ul,
    bignumber: dt,
    column: s0,
    complex: Mn,
    config: oe,
    cos: Ll,
    diag: Kl,
    divideScalar: Ve,
    dot: Pu,
    equal: zu,
    flatten: xu,
    im: Wl,
    inv: zn,
    larger: On,
    matrix: $r,
    matrixFromColumns: t0,
    multiply: Ne,
    multiplyScalar: it,
    number: Sn,
    qr: n0,
    re: Yl,
    reshape: Ql,
    sin: Jl,
    size: Tn,
    smaller: Qt,
    sqrt: Nn,
    subtract: Xe,
    typed: dr,
    usolve: u0,
    usolveAll: o0
  }), Et = Al({
    abs: Bn,
    add: In,
    conj: Jt,
    ctranspose: Hl,
    eigs: l0,
    equalScalar: Ce,
    larger: On,
    matrix: $r,
    multiply: Ne,
    pow: c0,
    smaller: Qt,
    sqrt: Nn,
    typed: dr
  }), Ru = {
    exports: {}
  };
  (function(r, e) {
    var t = function() {
      var n = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
      return typeof __filename < "u" && (n = n || __filename), function(u) {
        u = u || {};
        var u = typeof u < "u" ? u : {}, a, c;
        u.ready = new Promise(function(L, K) {
          a = L, c = K;
        });
        var s = {}, f;
        for (f in u) u.hasOwnProperty(f) && (s[f] = u[f]);
        var o = function(L, K) {
          throw K;
        }, h = false, p = false, v = false, d = false;
        h = typeof window == "object", p = typeof importScripts == "function", v = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", d = !h && !v && !p;
        var l = "";
        function m(L) {
          return u.locateFile ? u.locateFile(L, l) : l + L;
        }
        var D, b, g, C;
        v ? (p ? l = en.dirname(l) + "/" : l = __dirname + "/", D = function(K, lr) {
          return g || (g = en), C || (C = en), K = C.normalize(K), g.readFileSync(K, lr ? null : "utf8");
        }, b = function(K) {
          var lr = D(K, true);
          return lr.buffer || (lr = new Uint8Array(lr)), S(lr.buffer), lr;
        }, process.argv.length > 1 && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function(L) {
          if (!(L instanceof _e)) throw L;
        }), process.on("unhandledRejection", Cr), o = function(L) {
          process.exit(L);
        }, u.inspect = function() {
          return "[Emscripten Module object]";
        }) : d ? (typeof read < "u" && (D = function(K) {
          return read(K);
        }), b = function(K) {
          var lr;
          return typeof readbuffer == "function" ? new Uint8Array(readbuffer(K)) : (lr = read(K, "binary"), S(typeof lr == "object"), lr);
        }, typeof scriptArgs < "u" && scriptArgs, typeof quit == "function" && (o = function(L) {
          quit(L);
        }), typeof print < "u" && (typeof console > "u" && (console = {}), console.log = print, console.warn = console.error = typeof printErr < "u" ? printErr : print)) : (h || p) && (p ? l = self.location.href : document.currentScript && (l = document.currentScript.src), n && (l = n), l.indexOf("blob:") !== 0 ? l = l.substr(0, l.lastIndexOf("/") + 1) : l = "", D = function(K) {
          var lr = new XMLHttpRequest();
          return lr.open("GET", K, false), lr.send(null), lr.responseText;
        }, p && (b = function(K) {
          var lr = new XMLHttpRequest();
          return lr.open("GET", K, false), lr.responseType = "arraybuffer", lr.send(null), new Uint8Array(lr.response);
        }));
        var A = u.print || console.log.bind(console), w = u.printErr || console.warn.bind(console);
        for (f in s) s.hasOwnProperty(f) && (u[f] = s[f]);
        s = null, u.arguments && u.arguments, u.thisProgram && u.thisProgram, u.quit && (o = u.quit);
        var _;
        u.wasmBinary && (_ = u.wasmBinary);
        var F;
        u.noExitRuntime && (F = u.noExitRuntime), typeof WebAssembly != "object" && Cr("no native wasm support detected");
        var y, M, B = false;
        function S(L, K) {
          L || Cr("Assertion failed: " + K);
        }
        var O = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
        function x(L, K, lr) {
          for (var Qr = K + lr, ue = K; L[ue] && !(ue >= Qr); ) ++ue;
          if (ue - K > 16 && L.subarray && O) return O.decode(L.subarray(K, ue));
          for (var Xr = ""; K < ue; ) {
            var Sr = L[K++];
            if (!(Sr & 128)) {
              Xr += String.fromCharCode(Sr);
              continue;
            }
            var Er = L[K++] & 63;
            if ((Sr & 224) == 192) {
              Xr += String.fromCharCode((Sr & 31) << 6 | Er);
              continue;
            }
            var fe = L[K++] & 63;
            if ((Sr & 240) == 224 ? Sr = (Sr & 15) << 12 | Er << 6 | fe : Sr = (Sr & 7) << 18 | Er << 12 | fe << 6 | L[K++] & 63, Sr < 65536) Xr += String.fromCharCode(Sr);
            else {
              var mt = Sr - 65536;
              Xr += String.fromCharCode(55296 | mt >> 10, 56320 | mt & 1023);
            }
          }
          return Xr;
        }
        function z(L, K) {
          return L ? x(fr, L, K) : "";
        }
        function T(L, K, lr, Qr) {
          if (!(Qr > 0)) return 0;
          for (var ue = lr, Xr = lr + Qr - 1, Sr = 0; Sr < L.length; ++Sr) {
            var Er = L.charCodeAt(Sr);
            if (Er >= 55296 && Er <= 57343) {
              var fe = L.charCodeAt(++Sr);
              Er = 65536 + ((Er & 1023) << 10) | fe & 1023;
            }
            if (Er <= 127) {
              if (lr >= Xr) break;
              K[lr++] = Er;
            } else if (Er <= 2047) {
              if (lr + 1 >= Xr) break;
              K[lr++] = 192 | Er >> 6, K[lr++] = 128 | Er & 63;
            } else if (Er <= 65535) {
              if (lr + 2 >= Xr) break;
              K[lr++] = 224 | Er >> 12, K[lr++] = 128 | Er >> 6 & 63, K[lr++] = 128 | Er & 63;
            } else {
              if (lr + 3 >= Xr) break;
              K[lr++] = 240 | Er >> 18, K[lr++] = 128 | Er >> 12 & 63, K[lr++] = 128 | Er >> 6 & 63, K[lr++] = 128 | Er & 63;
            }
          }
          return K[lr] = 0, lr - ue;
        }
        function J(L, K, lr) {
          return T(L, fr, K, lr);
        }
        function q(L) {
          for (var K = 0, lr = 0; lr < L.length; ++lr) {
            var Qr = L.charCodeAt(lr);
            Qr >= 55296 && Qr <= 57343 && (Qr = 65536 + ((Qr & 1023) << 10) | L.charCodeAt(++lr) & 1023), Qr <= 127 ? ++K : Qr <= 2047 ? K += 2 : Qr <= 65535 ? K += 3 : K += 4;
          }
          return K;
        }
        var Z = 65536, nr, fr, R;
        function W(L) {
          nr = L, u.HEAP8 = new Int8Array(L), u.HEAP16 = new Int16Array(L), u.HEAP32 = R = new Int32Array(L), u.HEAPU8 = fr = new Uint8Array(L), u.HEAPU16 = new Uint16Array(L), u.HEAPU32 = new Uint32Array(L), u.HEAPF32 = new Float32Array(L), u.HEAPF64 = new Float64Array(L);
        }
        var tr = u.INITIAL_MEMORY || 16777216;
        u.wasmMemory ? y = u.wasmMemory : y = new WebAssembly.Memory({
          initial: tr / Z,
          maximum: tr / Z
        }), y && (nr = y.buffer), tr = nr.byteLength, W(nr);
        var or = [], rr = [], G = [], j = [];
        function Q() {
          if (u.preRun) for (typeof u.preRun == "function" && (u.preRun = [
            u.preRun
          ]); u.preRun.length; ) hr(u.preRun.shift());
          ur(or);
        }
        function X() {
          ur(rr);
        }
        function cr() {
          ur(G);
        }
        function er() {
          if (u.postRun) for (typeof u.postRun == "function" && (u.postRun = [
            u.postRun
          ]); u.postRun.length; ) gr(u.postRun.shift());
          ur(j);
        }
        function hr(L) {
          or.unshift(L);
        }
        function gr(L) {
          j.unshift(L);
        }
        var Dr = 0, wr = null;
        function Fr(L) {
          Dr++, u.monitorRunDependencies && u.monitorRunDependencies(Dr);
        }
        function br(L) {
          if (Dr--, u.monitorRunDependencies && u.monitorRunDependencies(Dr), Dr == 0 && wr) {
            var K = wr;
            wr = null, K();
          }
        }
        u.preloadedImages = {}, u.preloadedAudios = {};
        function Cr(L) {
          u.onAbort && u.onAbort(L), L += "", w(L), B = true, L = "abort(" + L + "). Build with -s ASSERTIONS=1 for more info.";
          var K = new WebAssembly.RuntimeError(L);
          throw c(K), K;
        }
        function _r(L, K) {
          return String.prototype.startsWith ? L.startsWith(K) : L.indexOf(K) === 0;
        }
        var xr = "data:application/octet-stream;base64,";
        function Jr(L) {
          return _r(L, xr);
        }
        var E = "file://";
        function N(L) {
          return _r(L, E);
        }
        var I = "triangle.out.wasm";
        Jr(I) || (I = m(I));
        function $() {
          try {
            if (_) return new Uint8Array(_);
            if (b) return b(I);
            throw "both async and sync fetching of the wasm failed";
          } catch (L) {
            Cr(L);
          }
        }
        function V() {
          return !_ && (h || p) && typeof fetch == "function" && !N(I) ? fetch(I, {
            credentials: "same-origin"
          }).then(function(L) {
            if (!L.ok) throw "failed to load wasm binary file at '" + I + "'";
            return L.arrayBuffer();
          }).catch(function() {
            return $();
          }) : Promise.resolve().then($);
        }
        function U() {
          var L = {
            a: jr
          };
          function K(Sr, Er) {
            var fe = Sr.exports;
            u.asm = fe, M = u.asm.g, br();
          }
          Fr();
          function lr(Sr) {
            K(Sr.instance);
          }
          function Qr(Sr) {
            return V().then(function(Er) {
              return WebAssembly.instantiate(Er, L);
            }).then(Sr, function(Er) {
              w("failed to asynchronously prepare wasm: " + Er), Cr(Er);
            });
          }
          function ue() {
            if (!_ && typeof WebAssembly.instantiateStreaming == "function" && !Jr(I) && !N(I) && typeof fetch == "function") fetch(I, {
              credentials: "same-origin"
            }).then(function(Sr) {
              var Er = WebAssembly.instantiateStreaming(Sr, L);
              return Er.then(lr, function(fe) {
                return w("wasm streaming compile failed: " + fe), w("falling back to ArrayBuffer instantiation"), Qr(lr);
              });
            });
            else return Qr(lr);
          }
          if (u.instantiateWasm) try {
            var Xr = u.instantiateWasm(L, K);
            return Xr;
          } catch (Sr) {
            return w("Module.instantiateWasm callback failed with error: " + Sr), false;
          }
          return ue(), {};
        }
        function ur(L) {
          for (; L.length > 0; ) {
            var K = L.shift();
            if (typeof K == "function") {
              K(u);
              continue;
            }
            var lr = K.func;
            typeof lr == "number" ? K.arg === void 0 ? M.get(lr)() : M.get(lr)(K.arg) : lr(K.arg === void 0 ? null : K.arg);
          }
        }
        function k(L, K, lr) {
          fr.copyWithin(L, K, K + lr);
        }
        function ar(L) {
          Cr("OOM");
        }
        function H(L) {
          ar();
        }
        function Tr(L) {
          Ht(L);
        }
        var Mr = {
          mappings: {},
          buffers: [
            null,
            [],
            []
          ],
          printChar: function(L, K) {
            var lr = Mr.buffers[L];
            K === 0 || K === 10 ? ((L === 1 ? A : w)(x(lr, 0)), lr.length = 0) : lr.push(K);
          },
          varargs: void 0,
          get: function() {
            Mr.varargs += 4;
            var L = R[Mr.varargs - 4 >> 2];
            return L;
          },
          getStr: function(L) {
            var K = z(L);
            return K;
          },
          get64: function(L, K) {
            return L;
          }
        };
        function Gr(L, K, lr, Qr) {
          for (var ue = 0, Xr = 0; Xr < lr; Xr++) {
            for (var Sr = R[K + Xr * 8 >> 2], Er = R[K + (Xr * 8 + 4) >> 2], fe = 0; fe < Er; fe++) Mr.printChar(L, fr[Sr + fe]);
            ue += Er;
          }
          return R[Qr >> 2] = ue, 0;
        }
        function ee(L) {
          var K = Date.now();
          return R[L >> 2] = K / 1e3 | 0, R[L + 4 >> 2] = K % 1e3 * 1e3 | 0, 0;
        }
        rr.push({
          func: function() {
            se();
          }
        });
        var jr = {
          d: k,
          e: H,
          f: Tr,
          c: Gr,
          b: ee,
          a: y
        };
        U();
        var se = u.___wasm_call_ctors = function() {
          return (se = u.___wasm_call_ctors = u.asm.h).apply(null, arguments);
        };
        u._malloc = function() {
          return (u._malloc = u.asm.i).apply(null, arguments);
        }, u._free = function() {
          return (u._free = u.asm.j).apply(null, arguments);
        }, u._triangulate = function() {
          return (u._triangulate = u.asm.k).apply(null, arguments);
        }, u.stringToUTF8 = J, u.lengthBytesUTF8 = q;
        var te;
        function _e(L) {
          this.name = "ExitStatus", this.message = "Program terminated with exit(" + L + ")", this.status = L;
        }
        wr = function L() {
          te || Te(), te || (wr = L);
        };
        function Te(L) {
          if (Dr > 0 || (Q(), Dr > 0)) return;
          function K() {
            te || (te = true, u.calledRun = true, !B && (X(), cr(), a(u), u.onRuntimeInitialized && u.onRuntimeInitialized(), er()));
          }
          u.setStatus ? (u.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              u.setStatus("");
            }, 1), K();
          }, 1)) : K();
        }
        u.run = Te;
        function Ht(L, K) {
          F || (u.onExit && u.onExit(L), B = true), o(L, new _e(L));
        }
        if (u.preInit) for (typeof u.preInit == "function" && (u.preInit = [
          u.preInit
        ]); u.preInit.length > 0; ) u.preInit.pop()();
        return F = true, Te(), u.ready;
      };
    }();
    r.exports = t;
  })(Ru);
  var h0 = Ru.exports;
  const v0 = h0;
  let Ur = {};
  const p0 = (r) => {
    const e = Ur.lengthBytesUTF8(r) + 1, t = Ur._malloc(e);
    return Ur.stringToUTF8(r, t, e), t;
  }, le = (r, e = Int32Array) => {
    if (!r || !r.length) return null;
    const t = d0(r, e), n = Ur._malloc(t.length * t.BYTES_PER_ELEMENT), i = n / t.BYTES_PER_ELEMENT, u = qu(e);
    return Ur[u].subarray(i, i + t.length).set(t), n;
  }, ae = (r, e, t = Int32Array) => {
    if (!r) return null;
    const n = r / t.BYTES_PER_ELEMENT, i = qu(t);
    return Ur[i].subarray(n, n + e);
  }, qu = (r) => {
    switch (r) {
      case Float64Array:
        return "HEAPF64";
      case Int32Array:
        return "HEAP32";
      default:
        return "HEAP8";
    }
  }, d0 = (r, e) => r.constructor == e ? r : new e(r), Uu = (r, e, t = null) => {
    if (typeof r == "string") return r;
    (typeof r != "object" || !r) && (r = {});
    let n = "";
    return r.pslg !== false && (n = `${n}p`), n = `${n}z`, t !== null && (n = `${n}v`), r.quiet !== false && (n = `${n}Q`), r.refine === true && (n = `${n}r`), r.regionAttr === true && (n = `${n}A`), r.convexHull === true && (n = `${n}c`), r.ccdt === true && (n = `${n}D`), r.jettison === true && (n = `${n}j`), r.edges === true && (n = `${n}e`), r.neighbors === true && (n = `${n}n`), r.quadratic === true && (n = `${n}o2`), r.bndMarkers === false && (n = `${n}B`), r.holes === false && (n = `${n}O`), typeof r.steiner == "number" && (n = `${n}S${r.steiner}`), typeof r.quality == "number" ? n = `${n}q${r.quality}` : r.quality === true && (n = `${n}q`), typeof r.area == "number" ? n = `${n}a${r.area}` : r.area === true && (n = `${n}a`), r.quiet === false && console.log("Switches:", n), n;
  };
  class ot {
    static get LENGTH() {
      return 23;
    }
    constructor(e = {}) {
      this.ptr = Ur._malloc(ot.LENGTH * Int32Array.BYTES_PER_ELEMENT), this.arr = ae(this.ptr, ot.LENGTH), this.arr.set(new Int32Array(ot.LENGTH));
      for (const t in e) t in this && (this[t] = e[t]);
    }
    destroy(e) {
      Ur._free(this.arr[0]), Ur._free(this.arr[1]), Ur._free(this.arr[2]), Ur._free(this.arr[5]), Ur._free(this.arr[6]), Ur._free(this.arr[7]), Ur._free(this.arr[8]), Ur._free(this.arr[12]), Ur._free(this.arr[13]), Ur._free(this.arr[19]), Ur._free(this.arr[20]), Ur._free(this.arr[21]), Ur._free(this.ptr), e && (Ur._free(this.arr[15]), Ur._free(this.arr[17]));
    }
    set pointlist(e) {
      this.arr[0] = le(e, Float64Array), this.arr[3] = e ? ~~(e.length * 0.5) : 0;
    }
    set pointattributelist(e) {
      this.arr[1] = le(e, Float64Array), this.arr[4] = e ? ~~(e.length / this.numberofpoints) : 0;
    }
    set pointmarkerlist(e) {
      this.arr[2] = le(e);
    }
    set numberofpoints(e) {
    }
    set numberofpointattributes(e) {
    }
    set trianglelist(e) {
      this.arr[5] = le(e), this.arr[9] = e ? ~~(e.length / 3) : 0;
    }
    set triangleattributelist(e) {
      this.arr[6] = le(e, Float64Array), this.arr[11] = e ? ~~(e.length / this.numberoftriangles) : 0;
    }
    set trianglearealist(e) {
      this.arr[7] = le(e, Float64Array);
    }
    set neighborlist(e) {
      this.arr[8] = le(e);
    }
    set numberoftriangles(e) {
    }
    set numberofcorners(e) {
    }
    set numberoftriangleattributes(e) {
    }
    set segmentlist(e) {
      this.arr[12] = le(e), this.arr[14] = e ? ~~(e.length * 0.5) : 0;
    }
    set segmentmarkerlist(e) {
      this.arr[13] = le(e);
    }
    set numberofsegments(e) {
    }
    set holelist(e) {
      this.arr[15] = le(e, Float64Array), this.arr[16] = e ? ~~(e.length * 0.5) : 0;
    }
    set numberofholes(e) {
    }
    set regionlist(e) {
      this.arr[17] = le(e, Float64Array), this.arr[18] = e ? ~~(e.length * 0.25) : 0;
    }
    set numberofregions(e) {
    }
    set edgelist(e) {
      this.arr[19] = le(e), this.arr[22] = e ? ~~(e.length * 0.5) : 0;
    }
    set edgemarkerlist(e) {
      this.arr[20] = le(e);
    }
    set normlist(e) {
      this.arr[21] = le(e, Float64Array);
    }
    set numberofedges(e) {
    }
    get pointlist() {
      return ae(this.arr[0], this.numberofpoints * 2, Float64Array);
    }
    get pointattributelist() {
      return ae(this.arr[1], this.numberofpointattributes * this.numberofpoints, Float64Array);
    }
    get pointmarkerlist() {
      return ae(this.arr[2], this.numberofpoints);
    }
    get numberofpoints() {
      return this.arr[3];
    }
    get numberofpointattributes() {
      return this.arr[4];
    }
    get trianglelist() {
      return ae(this.arr[5], this.numberoftriangles * this.numberofcorners);
    }
    get triangleattributelist() {
      return ae(this.arr[6], this.numberoftriangleattributes * this.numberoftriangles, Float64Array);
    }
    get trianglearealist() {
      return ae(this.arr[7], this.numberoftriangles, Float64Array);
    }
    get neighborlist() {
      return ae(this.arr[8], this.numberoftriangles * 3);
    }
    get numberoftriangles() {
      return this.arr[9];
    }
    get numberofcorners() {
      return this.arr[10];
    }
    get numberoftriangleattributes() {
      return this.arr[11];
    }
    get segmentlist() {
      return ae(this.arr[12], this.numberofsegments * 2);
    }
    get segmentmarkerlist() {
      return ae(this.arr[13], this.numberofsegments);
    }
    get numberofsegments() {
      return this.arr[14];
    }
    get holelist() {
      return ae(this.arr[15], this.numberofholes * 2, Float64Array);
    }
    get numberofholes() {
      return this.arr[16];
    }
    get regionlist() {
      return ae(this.arr[17], this.numberofregions * 4, Float64Array);
    }
    get numberofregions() {
      return this.arr[18];
    }
    get edgelist() {
      return ae(this.arr[19], this.numberofedges * 2);
    }
    get edgemarkerlist() {
      return ae(this.arr[20], this.numberofedges);
    }
    get normlist() {
      return ae(this.arr[21], this.numberofedges * 2, Float64Array);
    }
    get numberofedges() {
      return this.arr[22];
    }
  }
  const m0 = (r) => new Promise((e, t) => {
    v0({
      locateFile: (n, i) => r || i + n
    }).then((n) => {
      Ur = n, e();
    });
  }), D0 = (r, e, t, n = null) => {
    const i = Uu(r, e, n), u = p0(i), a = n ? n.ptr : null;
    Ur._triangulate(u, e.ptr, t.ptr, a), Ur._free(u);
  }, g0 = (r) => new ot(r), y0 = (r, e) => {
    r.destroy(e);
  };
  var w0 = {
    init: m0,
    triangulate: D0,
    makeIO: g0,
    freeIO: y0,
    getSwitchesStr: Uu
  };
  const Qe = Zc(w0), A0 = "" + new URL("triangle-CCJHBrBP.wasm", import.meta.url).href;
  await Qe.init(A0);
  _0 = function({ points: r, polygon: e, maxMeshSize: t = 3, maxNumSteinerPoints: n = 300, minMeshAngleDegrees: i = 30 }) {
    const u = C0(r[0], r[1], r[2]), a = r.map((v) => Ne(Ou(u), v)).map((v) => [
      v[0],
      v[1]
    ]), c = Qe.makeIO({
      pointlist: a.flat(),
      segmentlist: F0(e)
    }), s = Qe.makeIO();
    Qe.triangulate(`pzQOS${n}q${i}${t != null ? "a" : null}${t ?? ""}`, c, s);
    const { nodes: f, boundaryIndices: o } = E0(s.pointlist, s.pointmarkerlist), h = f.map((v) => Ne(u, [
      v[0],
      v[1],
      0
    ])), p = b0(s.trianglelist);
    return Qe.freeIO(c, true), Qe.freeIO(s), {
      nodes: h,
      elements: p,
      boundaryIndices: o
    };
  };
  function F0(r) {
    const e = [];
    for (let t = 0; t < r.length; t += 1) e.push(r[t], r[(t + 1) % r.length]);
    return e;
  }
  function E0(r, e) {
    const t = [], n = [];
    for (let i = 0; i < r.length; i += 2) t.push([
      r[i],
      r[i + 1]
    ]), e[i / 2] && n.push(i / 2);
    return {
      nodes: t,
      boundaryIndices: n
    };
  }
  function b0(r) {
    const e = [];
    for (let t = 0; t < r.length; t += 3) e.push([
      r[t],
      r[t + 1],
      r[t + 2]
    ]);
    return e;
  }
  function C0(r, e, t) {
    const n = o([
      e,
      t
    ]), i = o([
      r,
      t
    ]), u = o([
      r,
      e
    ]), a = Ft(Xe(n, i), Et(Xe(n, i))), c = Ft(Xe(t, u), Et(Xe(n, i))), s = Ft(At(a, c), Et(At(a, c))), f = Ft(At(s, a), Et(At(s, a)));
    return [
      [
        a[0],
        f[0],
        s[0]
      ],
      [
        a[1],
        f[1],
        s[1]
      ],
      [
        a[2],
        f[2],
        s[2]
      ]
    ];
    function o(h) {
      const p = h.reduce((d, l) => [
        d[0] + l[0],
        d[1] + l[1],
        d[2] + l[2]
      ], [
        0,
        0,
        0
      ]), v = h.length;
      return [
        p[0] / v,
        p[1] / v,
        p[2] / v
      ];
    }
  }
})();
export {
  P as C,
  je as D,
  Ke as _,
  __tla,
  _0 as g,
  Bt as t
};
