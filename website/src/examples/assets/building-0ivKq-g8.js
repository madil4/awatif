import { f as au, B as Je, c as iu, F as ou, M as su, h as fu, S as pt, P as lu, i as dt, j as $e, k as cu, l as Ie, v as Cr, g as vu, a as Du } from "./styles-C277HhWC.js";
import { g as pu } from "./getParameters-mm0cZPxW.js";
import { _ as Ce, t as De, D as ht, C as Er, g as du, __tla as __tla_0 } from "./getMesh-Bm83U438.js";
import { m as qe } from "./BufferGeometryUtils-BQhN9FF1.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var dn = {
    relTol: 1e-12,
    absTol: 1e-15,
    matrix: "Matrix",
    number: "number",
    numberFallback: "number",
    precision: 64,
    predictable: false,
    randomSeed: null
  };
  function hu(r, e) {
    if (pe(r, e)) return r[e];
    throw typeof r[e] == "function" && gu(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
  }
  function mu(r, e, n) {
    if (pe(r, e)) return r[e] = n, n;
    throw new Error('No access to property "' + e + '"');
  }
  function pe(r, e) {
    return !yu(r) && !Array.isArray(r) ? false : kr(Au, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function gu(r, e) {
    return r == null || typeof r[e] != "function" || kr(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : kr(Fu, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function yu(r) {
    return typeof r == "object" && r && r.constructor === Object;
  }
  var Au = {
    length: true,
    name: true
  }, Fu = {
    toString: true,
    valueOf: true,
    toLocaleString: true
  };
  class Eu {
    constructor(e) {
      this.wrappedObject = e, this[Symbol.iterator] = this.entries;
    }
    keys() {
      return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
    }
    get(e) {
      return hu(this.wrappedObject, e);
    }
    set(e, n) {
      return mu(this.wrappedObject, e, n), this;
    }
    has(e) {
      return pe(this.wrappedObject, e) && e in this.wrappedObject;
    }
    entries() {
      return wu(this.keys(), (e) => [
        e,
        this.get(e)
      ]);
    }
    forEach(e) {
      for (var n of this.keys()) e(this.get(n), n, this);
    }
    delete(e) {
      pe(this.wrappedObject, e) && delete this.wrappedObject[e];
    }
    clear() {
      for (var e of this.keys()) this.delete(e);
    }
    get size() {
      return Object.keys(this.wrappedObject).length;
    }
  }
  function wu(r, e) {
    return {
      next: () => {
        var n = r.next();
        return n.done ? n : {
          value: e(n.value),
          done: false
        };
      }
    };
  }
  function fr(r) {
    return typeof r == "number";
  }
  function gr(r) {
    return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
  }
  function Cu(r) {
    return typeof r == "bigint";
  }
  function Qe(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
  }
  function Xe(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
  }
  function hn(r) {
    return r && r.constructor.prototype.isUnit === true || false;
  }
  function Tr(r) {
    return typeof r == "string";
  }
  var Dr = Array.isArray;
  function vr(r) {
    return r && r.constructor.prototype.isMatrix === true || false;
  }
  function de(r) {
    return Array.isArray(r) || vr(r);
  }
  function mn(r) {
    return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function gn(r) {
    return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function yn(r) {
    return r && r.constructor.prototype.isRange === true || false;
  }
  function Ye(r) {
    return r && r.constructor.prototype.isIndex === true || false;
  }
  function bu(r) {
    return typeof r == "boolean";
  }
  function _u(r) {
    return r && r.constructor.prototype.isResultSet === true || false;
  }
  function Bu(r) {
    return r && r.constructor.prototype.isHelp === true || false;
  }
  function xu(r) {
    return typeof r == "function";
  }
  function Su(r) {
    return r instanceof Date;
  }
  function Mu(r) {
    return r instanceof RegExp;
  }
  function Ke(r) {
    return !!(r && typeof r == "object" && r.constructor === Object && !Qe(r) && !Xe(r));
  }
  function Nu(r) {
    return r ? r instanceof Map || r instanceof Eu || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
  }
  function Tu(r) {
    return r === null;
  }
  function zu(r) {
    return r === void 0;
  }
  function Ou(r) {
    return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function $u(r) {
    return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Iu(r) {
    return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function qu(r) {
    return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ru(r) {
    return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Pu(r) {
    return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Uu(r) {
    return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Lu(r) {
    return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Vu(r) {
    return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Wu(r) {
    return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Gu(r) {
    return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Zu(r) {
    return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ju(r) {
    return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Qu(r) {
    return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Xu(r) {
    return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Yu(r) {
    return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ku(r) {
    return r && r.constructor.prototype.isChain === true || false;
  }
  function zr(r) {
    var e = typeof r;
    return e === "object" ? r === null ? "null" : gr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
  }
  function tr(r) {
    var e = typeof r;
    if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
    if (typeof r.clone == "function") return r.clone();
    if (Array.isArray(r)) return r.map(function(n) {
      return tr(n);
    });
    if (r instanceof Date) return new Date(r.valueOf());
    if (gr(r)) return r;
    if (Ke(r)) return Hu(r, tr);
    throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
  }
  function Hu(r, e) {
    var n = {};
    for (var u in r) kr(r, u) && (n[u] = e(r[u]));
    return n;
  }
  function An(r, e) {
    for (var n in e) kr(e, n) && (r[n] = e[n]);
    return r;
  }
  function Rr(r, e) {
    var n, u, t;
    if (Array.isArray(r)) {
      if (!Array.isArray(e) || r.length !== e.length) return false;
      for (u = 0, t = r.length; u < t; u++) if (!Rr(r[u], e[u])) return false;
      return true;
    } else {
      if (typeof r == "function") return r === e;
      if (r instanceof Object) {
        if (Array.isArray(e) || !(e instanceof Object)) return false;
        for (n in r) if (!(n in e) || !Rr(r[n], e[n])) return false;
        for (n in e) if (!(n in r)) return false;
        return true;
      } else return r === e;
    }
  }
  function kr(r, e) {
    return r && Object.hasOwnProperty.call(r, e);
  }
  function ku(r, e) {
    for (var n = {}, u = 0; u < e.length; u++) {
      var t = e[u], a = r[t];
      a !== void 0 && (n[t] = a);
    }
    return n;
  }
  var ju = [
    "Matrix",
    "Array"
  ], ra = [
    "number",
    "BigNumber",
    "Fraction"
  ], br = function(e) {
    if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
    return Object.freeze(dn);
  };
  Ce(br, dn, {
    MATRIX_OPTIONS: ju,
    NUMBER_OPTIONS: ra
  });
  function G(r, e, n, u) {
    function t(a) {
      var l = ku(a, e.map(na));
      return ea(r, e, a), n(l);
    }
    return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), u && (t.meta = u), t;
  }
  function ea(r, e, n) {
    var u = e.filter((a) => !ta(a)).every((a) => n[a] !== void 0);
    if (!u) {
      var t = e.filter((a) => n[a] === void 0);
      throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
    }
  }
  function ta(r) {
    return r && r[0] === "?";
  }
  function na(r) {
    return r && r[0] === "?" ? r.slice(1) : r;
  }
  function cr(r) {
    return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
  }
  var ua = Math.sign || function(r) {
    return r > 0 ? 1 : r < 0 ? -1 : 0;
  };
  function Re(r, e, n) {
    var u = {
      2: "0b",
      8: "0o",
      16: "0x"
    }, t = u[e], a = "";
    if (n) {
      if (n < 1) throw new Error("size must be in greater than 0");
      if (!cr(n)) throw new Error("size must be an integer");
      if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
      if (!cr(r)) throw new Error("Value must be an integer");
      r < 0 && (r = r + 2 ** n), a = "i".concat(n);
    }
    var l = "";
    return r < 0 && (r = -r, l = "-"), "".concat(l).concat(t).concat(r.toString(e)).concat(a);
  }
  function Ue(r, e) {
    if (typeof e == "function") return e(r);
    if (r === 1 / 0) return "Infinity";
    if (r === -1 / 0) return "-Infinity";
    if (isNaN(r)) return "NaN";
    var { notation: n, precision: u, wordSize: t } = Fn(e);
    switch (n) {
      case "fixed":
        return ia(r, u);
      case "exponential":
        return En(r, u);
      case "engineering":
        return aa(r, u);
      case "bin":
        return Re(r, 2, t);
      case "oct":
        return Re(r, 8, t);
      case "hex":
        return Re(r, 16, t);
      case "auto":
        return oa(r, u, e).replace(/((\.\d*?)(0+))($|e)/, function() {
          var a = arguments[2], l = arguments[4];
          return a !== "." ? a + l : l;
        });
      default:
        throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function Fn(r) {
    var e = "auto", n, u;
    if (r !== void 0) if (fr(r)) n = r;
    else if (gr(r)) n = r.toNumber();
    else if (Ke(r)) r.precision !== void 0 && (n = mt(r.precision, () => {
      throw new Error('Option "precision" must be a number or BigNumber');
    })), r.wordSize !== void 0 && (u = mt(r.wordSize, () => {
      throw new Error('Option "wordSize" must be a number or BigNumber');
    })), r.notation && (e = r.notation);
    else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
    return {
      notation: e,
      precision: n,
      wordSize: u
    };
  }
  function be(r) {
    var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
    if (!e) throw new SyntaxError("Invalid number " + r);
    var n = e[1], u = e[2], t = parseFloat(e[4] || "0"), a = u.indexOf(".");
    t += a !== -1 ? a - 1 : u.length - 1;
    var l = u.replace(".", "").replace(/^0*/, function(D) {
      return t -= D.length, "";
    }).replace(/0*$/, "").split("").map(function(D) {
      return parseInt(D);
    });
    return l.length === 0 && (l.push(0), t++), {
      sign: n,
      coefficients: l,
      exponent: t
    };
  }
  function aa(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = be(r), u = _e(n, e), t = u.exponent, a = u.coefficients, l = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
    if (fr(e)) for (; e > a.length || t - l + 1 > a.length; ) a.push(0);
    else for (var D = Math.abs(t - l) - (a.length - 1), f = 0; f < D; f++) a.push(0);
    for (var c = Math.abs(t - l), i = 1; c > 0; ) i++, c--;
    var s = a.slice(i).join(""), d = fr(e) && s.length || s.match(/[1-9]/) ? "." + s : "", v = a.slice(0, i).join("") + d + "e" + (t >= 0 ? "+" : "") + l.toString();
    return u.sign + v;
  }
  function ia(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = be(r), u = typeof e == "number" ? _e(n, n.exponent + 1 + e) : n, t = u.coefficients, a = u.exponent + 1, l = a + (e || 0);
    return t.length < l && (t = t.concat(Jr(l - t.length))), a < 0 && (t = Jr(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), u.sign + t.join("");
  }
  function En(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = be(r), u = e ? _e(n, e) : n, t = u.coefficients, a = u.exponent;
    t.length < e && (t = t.concat(Jr(e - t.length)));
    var l = t.shift();
    return u.sign + l + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
  }
  function oa(r, e, n) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var u = gt(n == null ? void 0 : n.lowerExp, -3), t = gt(n == null ? void 0 : n.upperExp, 5), a = be(r), l = e ? _e(a, e) : a;
    if (l.exponent < u || l.exponent >= t) return En(r, e);
    var D = l.coefficients, f = l.exponent;
    D.length < e && (D = D.concat(Jr(e - D.length))), D = D.concat(Jr(f - D.length + 1 + (D.length < e ? e - D.length : 0))), D = Jr(-f).concat(D);
    var c = f > 0 ? f : 0;
    return c < D.length - 1 && D.splice(c + 1, 0, "."), l.sign + D.join("");
  }
  function _e(r, e) {
    for (var n = {
      sign: r.sign,
      coefficients: r.coefficients,
      exponent: r.exponent
    }, u = n.coefficients; e <= 0; ) u.unshift(0), n.exponent++, e++;
    if (u.length > e) {
      var t = u.splice(e, u.length - e);
      if (t[0] >= 5) {
        var a = e - 1;
        for (u[a]++; u[a] === 10; ) u.pop(), a === 0 && (u.unshift(0), n.exponent++, a++), a--, u[a]++;
      }
    }
    return n;
  }
  function Jr(r) {
    for (var e = [], n = 0; n < r; n++) e.push(0);
    return e;
  }
  function sa(r) {
    return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
  }
  function qr(r, e) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (u < 0) throw new Error("Absolute tolerance must be at least 0");
    return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), u);
  }
  function mt(r, e) {
    if (fr(r)) return r;
    if (gr(r)) return r.toNumber();
    e();
  }
  function gt(r, e) {
    return fr(r) ? r : gr(r) ? r.toNumber() : e;
  }
  var wn = function() {
    return wn = De.create, De;
  }, fa = [
    "?BigNumber",
    "?Complex",
    "?DenseMatrix",
    "?Fraction"
  ], la = G("typed", fa, function(e) {
    var { BigNumber: n, Complex: u, DenseMatrix: t, Fraction: a } = e, l = wn();
    return l.clear(), l.addTypes([
      {
        name: "number",
        test: fr
      },
      {
        name: "Complex",
        test: Qe
      },
      {
        name: "BigNumber",
        test: gr
      },
      {
        name: "bigint",
        test: Cu
      },
      {
        name: "Fraction",
        test: Xe
      },
      {
        name: "Unit",
        test: hn
      },
      {
        name: "identifier",
        test: (D) => Tr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D)
      },
      {
        name: "string",
        test: Tr
      },
      {
        name: "Chain",
        test: Ku
      },
      {
        name: "Array",
        test: Dr
      },
      {
        name: "Matrix",
        test: vr
      },
      {
        name: "DenseMatrix",
        test: mn
      },
      {
        name: "SparseMatrix",
        test: gn
      },
      {
        name: "Range",
        test: yn
      },
      {
        name: "Index",
        test: Ye
      },
      {
        name: "boolean",
        test: bu
      },
      {
        name: "ResultSet",
        test: _u
      },
      {
        name: "Help",
        test: Bu
      },
      {
        name: "function",
        test: xu
      },
      {
        name: "Date",
        test: Su
      },
      {
        name: "RegExp",
        test: Mu
      },
      {
        name: "null",
        test: Tu
      },
      {
        name: "undefined",
        test: zu
      },
      {
        name: "AccessorNode",
        test: Ou
      },
      {
        name: "ArrayNode",
        test: $u
      },
      {
        name: "AssignmentNode",
        test: Iu
      },
      {
        name: "BlockNode",
        test: qu
      },
      {
        name: "ConditionalNode",
        test: Ru
      },
      {
        name: "ConstantNode",
        test: Pu
      },
      {
        name: "FunctionNode",
        test: Lu
      },
      {
        name: "FunctionAssignmentNode",
        test: Uu
      },
      {
        name: "IndexNode",
        test: Vu
      },
      {
        name: "Node",
        test: Wu
      },
      {
        name: "ObjectNode",
        test: Gu
      },
      {
        name: "OperatorNode",
        test: Zu
      },
      {
        name: "ParenthesisNode",
        test: Ju
      },
      {
        name: "RangeNode",
        test: Qu
      },
      {
        name: "RelationalNode",
        test: Xu
      },
      {
        name: "SymbolNode",
        test: Yu
      },
      {
        name: "Map",
        test: Nu
      },
      {
        name: "Object",
        test: Ke
      }
    ]), l.addConversions([
      {
        from: "number",
        to: "BigNumber",
        convert: function(f) {
          if (n || ie(f), sa(f) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + f + "). Use function bignumber(x) to convert to BigNumber.");
          return new n(f);
        }
      },
      {
        from: "number",
        to: "Complex",
        convert: function(f) {
          return u || oe(f), new u(f, 0);
        }
      },
      {
        from: "BigNumber",
        to: "Complex",
        convert: function(f) {
          return u || oe(f), new u(f.toNumber(), 0);
        }
      },
      {
        from: "bigint",
        to: "number",
        convert: function(f) {
          if (f > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + f + ")");
          return Number(f);
        }
      },
      {
        from: "bigint",
        to: "BigNumber",
        convert: function(f) {
          return n || ie(f), new n(f.toString());
        }
      },
      {
        from: "bigint",
        to: "Fraction",
        convert: function(f) {
          return a || se(f), new a(f.toString());
        }
      },
      {
        from: "Fraction",
        to: "BigNumber",
        convert: function(f) {
          throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
        }
      },
      {
        from: "Fraction",
        to: "Complex",
        convert: function(f) {
          return u || oe(f), new u(f.valueOf(), 0);
        }
      },
      {
        from: "number",
        to: "Fraction",
        convert: function(f) {
          a || se(f);
          var c = new a(f);
          if (c.valueOf() !== f) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + f + "). Use function fraction(x) to convert to Fraction.");
          return c;
        }
      },
      {
        from: "string",
        to: "number",
        convert: function(f) {
          var c = Number(f);
          if (isNaN(c)) throw new Error('Cannot convert "' + f + '" to a number');
          return c;
        }
      },
      {
        from: "string",
        to: "BigNumber",
        convert: function(f) {
          n || ie(f);
          try {
            return new n(f);
          } catch {
            throw new Error('Cannot convert "' + f + '" to BigNumber');
          }
        }
      },
      {
        from: "string",
        to: "bigint",
        convert: function(f) {
          try {
            return BigInt(f);
          } catch {
            throw new Error('Cannot convert "' + f + '" to BigInt');
          }
        }
      },
      {
        from: "string",
        to: "Fraction",
        convert: function(f) {
          a || se(f);
          try {
            return new a(f);
          } catch {
            throw new Error('Cannot convert "' + f + '" to Fraction');
          }
        }
      },
      {
        from: "string",
        to: "Complex",
        convert: function(f) {
          u || oe(f);
          try {
            return new u(f);
          } catch {
            throw new Error('Cannot convert "' + f + '" to Complex');
          }
        }
      },
      {
        from: "boolean",
        to: "number",
        convert: function(f) {
          return +f;
        }
      },
      {
        from: "boolean",
        to: "BigNumber",
        convert: function(f) {
          return n || ie(f), new n(+f);
        }
      },
      {
        from: "boolean",
        to: "bigint",
        convert: function(f) {
          return BigInt(+f);
        }
      },
      {
        from: "boolean",
        to: "Fraction",
        convert: function(f) {
          return a || se(f), new a(+f);
        }
      },
      {
        from: "boolean",
        to: "string",
        convert: function(f) {
          return String(f);
        }
      },
      {
        from: "Array",
        to: "Matrix",
        convert: function(f) {
          return t || ca(), new t(f);
        }
      },
      {
        from: "Matrix",
        to: "Array",
        convert: function(f) {
          return f.valueOf();
        }
      }
    ]), l.onMismatch = (D, f, c) => {
      var i = l.createError(D, f, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(i.data.category) && f.length === 1 && de(f[0]) && c.some((d) => !d.params.includes(","))) {
        var s = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
        throw s.data = i.data, s;
      }
      throw i;
    }, l.onMismatch = (D, f, c) => {
      var i = l.createError(D, f, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(i.data.category) && f.length === 1 && de(f[0]) && c.some((d) => !d.params.includes(","))) {
        var s = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
        throw s.data = i.data, s;
      }
      throw i;
    }, l;
  });
  function ie(r) {
    throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
  }
  function oe(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
  }
  function ca() {
    throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
  }
  function se(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
  }
  var va = "BigNumber", Da = [
    "?on",
    "config"
  ], pa = G(va, Da, (r) => {
    var { on: e, config: n } = r, u = ht.clone({
      precision: n.precision,
      modulo: ht.EUCLID
    });
    return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
      return {
        mathjs: "BigNumber",
        value: this.toString()
      };
    }, u.fromJSON = function(t) {
      return new u(t.value);
    }, e && e("config", function(t, a) {
      t.precision !== a.precision && u.config({
        precision: t.precision
      });
    }), u;
  }, {
    isClass: true
  }), da = "Complex", ha = [], ma = G(da, ha, () => (Object.defineProperty(Er, "name", {
    value: "Complex"
  }), Er.prototype.constructor = Er, Er.prototype.type = "Complex", Er.prototype.isComplex = true, Er.prototype.toJSON = function() {
    return {
      mathjs: "Complex",
      re: this.re,
      im: this.im
    };
  }, Er.prototype.toPolar = function() {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  }, Er.prototype.format = function(r) {
    var e = "", n = this.im, u = this.re, t = Ue(this.re, r), a = Ue(this.im, r), l = fr(r) ? r : r ? r.precision : null;
    if (l !== null) {
      var D = Math.pow(10, -l);
      Math.abs(u / n) < D && (u = 0), Math.abs(n / u) < D && (n = 0);
    }
    return n === 0 ? e = t : u === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = a + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + a.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + a + "i", e;
  }, Er.fromPolar = function(r) {
    switch (arguments.length) {
      case 1: {
        var e = arguments[0];
        if (typeof e == "object") return Er(e);
        throw new TypeError("Input has to be an object with r and phi keys.");
      }
      case 2: {
        var n = arguments[0], u = arguments[1];
        if (fr(n)) {
          if (hn(u) && u.hasBase("ANGLE") && (u = u.toNumber("rad")), fr(u)) return new Er({
            r: n,
            phi: u
          });
          throw new TypeError("Phi is not a number nor an angle unit.");
        } else throw new TypeError("Radius r is not a number.");
      }
      default:
        throw new SyntaxError("Wrong number of arguments in function fromPolar");
    }
  }, Er.prototype.valueOf = Er.prototype.toString, Er.fromJSON = function(r) {
    return new Er(r);
  }, Er.compare = function(r, e) {
    return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
  }, Er), {
    isClass: true
  });
  var ga = 2e3, K = {
    s: 1,
    n: 0,
    d: 1
  };
  function Ir(r, e) {
    if (isNaN(r = parseInt(r, 10))) throw ce();
    return r * e;
  }
  function hr(r, e) {
    if (e === 0) throw He();
    var n = Object.create(wr.prototype);
    n.s = r < 0 ? -1 : 1, r = r < 0 ? -r : r;
    var u = Zr(r, e);
    return n.n = r / u, n.d = e / u, n;
  }
  function yt(r) {
    for (var e = {}, n = r, u = 2, t = 4; t <= n; ) {
      for (; n % u === 0; ) n /= u, e[u] = (e[u] || 0) + 1;
      t += 1 + 2 * u++;
    }
    return n !== r ? n > 1 && (e[n] = (e[n] || 0) + 1) : e[r] = (e[r] || 0) + 1, e;
  }
  var Mr = function(r, e) {
    var n = 0, u = 1, t = 1, a = 0, l = 0, D = 0, f = 1, c = 1, i = 0, s = 1, d = 1, v = 1, p = 1e7, o;
    if (r != null) if (e !== void 0) {
      if (n = r, u = e, t = n * u, n % 1 !== 0 || u % 1 !== 0) throw Ea();
    } else switch (typeof r) {
      case "object": {
        if ("d" in r && "n" in r) n = r.n, u = r.d, "s" in r && (n *= r.s);
        else if (0 in r) n = r[0], 1 in r && (u = r[1]);
        else throw ce();
        t = n * u;
        break;
      }
      case "number": {
        if (r < 0 && (t = r, r = -r), r % 1 === 0) n = r;
        else if (r > 0) {
          for (r >= 1 && (c = Math.pow(10, Math.floor(1 + Math.log(r) / Math.LN10)), r /= c); s <= p && v <= p; ) if (o = (i + d) / (s + v), r === o) {
            s + v <= p ? (n = i + d, u = s + v) : v > s ? (n = d, u = v) : (n = i, u = s);
            break;
          } else r > o ? (i += d, s += v) : (d += i, v += s), s > p ? (n = d, u = v) : (n = i, u = s);
          n *= c;
        } else (isNaN(r) || isNaN(e)) && (u = n = NaN);
        break;
      }
      case "string": {
        if (s = r.match(/\d+|./g), s === null) throw ce();
        if (s[i] === "-" ? (t = -1, i++) : s[i] === "+" && i++, s.length === i + 1 ? l = Ir(s[i++], t) : s[i + 1] === "." || s[i] === "." ? (s[i] !== "." && (a = Ir(s[i++], t)), i++, (i + 1 === s.length || s[i + 1] === "(" && s[i + 3] === ")" || s[i + 1] === "'" && s[i + 3] === "'") && (l = Ir(s[i], t), f = Math.pow(10, s[i].length), i++), (s[i] === "(" && s[i + 2] === ")" || s[i] === "'" && s[i + 2] === "'") && (D = Ir(s[i + 1], t), c = Math.pow(10, s[i + 1].length) - 1, i += 3)) : s[i + 1] === "/" || s[i + 1] === ":" ? (l = Ir(s[i], t), f = Ir(s[i + 2], 1), i += 3) : s[i + 3] === "/" && s[i + 1] === " " && (a = Ir(s[i], t), l = Ir(s[i + 2], t), f = Ir(s[i + 4], 1), i += 5), s.length <= i) {
          u = f * c, t = n = D + u * a + c * l;
          break;
        }
      }
      default:
        throw ce();
    }
    if (u === 0) throw He();
    K.s = t < 0 ? -1 : 1, K.n = Math.abs(n), K.d = Math.abs(u);
  };
  function ya(r, e, n) {
    for (var u = 1; e > 0; r = r * r % n, e >>= 1) e & 1 && (u = u * r % n);
    return u;
  }
  function Aa(r, e) {
    for (; e % 2 === 0; e /= 2) ;
    for (; e % 5 === 0; e /= 5) ;
    if (e === 1) return 0;
    for (var n = 10 % e, u = 1; n !== 1; u++) if (n = n * 10 % e, u > ga) return 0;
    return u;
  }
  function Fa(r, e, n) {
    for (var u = 1, t = ya(10, n, e), a = 0; a < 300; a++) {
      if (u === t) return a;
      u = u * 10 % e, t = t * 10 % e;
    }
    return 0;
  }
  function Zr(r, e) {
    if (!r) return e;
    if (!e) return r;
    for (; ; ) {
      if (r %= e, !r) return e;
      if (e %= r, !e) return r;
    }
  }
  function wr(r, e) {
    if (Mr(r, e), this instanceof wr) r = Zr(K.d, K.n), this.s = K.s, this.n = K.n / r, this.d = K.d / r;
    else return hr(K.s * K.n, K.d);
  }
  var He = function() {
    return new Error("Division by Zero");
  }, ce = function() {
    return new Error("Invalid argument");
  }, Ea = function() {
    return new Error("Parameters must be integer");
  };
  wr.prototype = {
    s: 1,
    n: 0,
    d: 1,
    abs: function() {
      return hr(this.n, this.d);
    },
    neg: function() {
      return hr(-this.s * this.n, this.d);
    },
    add: function(r, e) {
      return Mr(r, e), hr(this.s * this.n * K.d + K.s * this.d * K.n, this.d * K.d);
    },
    sub: function(r, e) {
      return Mr(r, e), hr(this.s * this.n * K.d - K.s * this.d * K.n, this.d * K.d);
    },
    mul: function(r, e) {
      return Mr(r, e), hr(this.s * K.s * this.n * K.n, this.d * K.d);
    },
    div: function(r, e) {
      return Mr(r, e), hr(this.s * K.s * this.n * K.d, this.d * K.n);
    },
    clone: function() {
      return hr(this.s * this.n, this.d);
    },
    mod: function(r, e) {
      if (isNaN(this.n) || isNaN(this.d)) return new wr(NaN);
      if (r === void 0) return hr(this.s * this.n % this.d, 1);
      if (Mr(r, e), K.n === 0 && this.d === 0) throw He();
      return hr(this.s * (K.d * this.n) % (K.n * this.d), K.d * this.d);
    },
    gcd: function(r, e) {
      return Mr(r, e), hr(Zr(K.n, this.n) * Zr(K.d, this.d), K.d * this.d);
    },
    lcm: function(r, e) {
      return Mr(r, e), K.n === 0 && this.n === 0 ? hr(0, 1) : hr(K.n * this.n, Zr(K.n, this.n) * Zr(K.d, this.d));
    },
    ceil: function(r) {
      return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new wr(NaN) : hr(Math.ceil(r * this.s * this.n / this.d), r);
    },
    floor: function(r) {
      return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new wr(NaN) : hr(Math.floor(r * this.s * this.n / this.d), r);
    },
    round: function(r) {
      return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new wr(NaN) : hr(Math.round(r * this.s * this.n / this.d), r);
    },
    roundTo: function(r, e) {
      return Mr(r, e), hr(this.s * Math.round(this.n * K.d / (this.d * K.n)) * K.n, K.d);
    },
    inverse: function() {
      return hr(this.s * this.d, this.n);
    },
    pow: function(r, e) {
      if (Mr(r, e), K.d === 1) return K.s < 0 ? hr(Math.pow(this.s * this.d, K.n), Math.pow(this.n, K.n)) : hr(Math.pow(this.s * this.n, K.n), Math.pow(this.d, K.n));
      if (this.s < 0) return null;
      var n = yt(this.n), u = yt(this.d), t = 1, a = 1;
      for (var l in n) if (l !== "1") {
        if (l === "0") {
          t = 0;
          break;
        }
        if (n[l] *= K.n, n[l] % K.d === 0) n[l] /= K.d;
        else return null;
        t *= Math.pow(l, n[l]);
      }
      for (var l in u) if (l !== "1") {
        if (u[l] *= K.n, u[l] % K.d === 0) u[l] /= K.d;
        else return null;
        a *= Math.pow(l, u[l]);
      }
      return K.s < 0 ? hr(a, t) : hr(t, a);
    },
    equals: function(r, e) {
      return Mr(r, e), this.s * this.n * K.d === K.s * K.n * this.d;
    },
    compare: function(r, e) {
      Mr(r, e);
      var n = this.s * this.n * K.d - K.s * K.n * this.d;
      return (0 < n) - (n < 0);
    },
    simplify: function(r) {
      if (isNaN(this.n) || isNaN(this.d)) return this;
      r = r || 1e-3;
      for (var e = this.abs(), n = e.toContinued(), u = 1; u < n.length; u++) {
        for (var t = hr(n[u - 1], 1), a = u - 2; a >= 0; a--) t = t.inverse().add(n[a]);
        if (Math.abs(t.sub(e).valueOf()) < r) return t.mul(this.s);
      }
      return this;
    },
    divisible: function(r, e) {
      return Mr(r, e), !(!(K.n * this.d) || this.n * K.d % (K.n * this.d));
    },
    valueOf: function() {
      return this.s * this.n / this.d;
    },
    toFraction: function(r) {
      var e, n = "", u = this.n, t = this.d;
      return this.s < 0 && (n += "-"), t === 1 ? n += u : (r && (e = Math.floor(u / t)) > 0 && (n += e, n += " ", u %= t), n += u, n += "/", n += t), n;
    },
    toLatex: function(r) {
      var e, n = "", u = this.n, t = this.d;
      return this.s < 0 && (n += "-"), t === 1 ? n += u : (r && (e = Math.floor(u / t)) > 0 && (n += e, u %= t), n += "\\frac{", n += u, n += "}{", n += t, n += "}"), n;
    },
    toContinued: function() {
      var r, e = this.n, n = this.d, u = [];
      if (isNaN(e) || isNaN(n)) return u;
      do
        u.push(Math.floor(e / n)), r = e % n, e = n, n = r;
      while (e !== 1);
      return u;
    },
    toString: function(r) {
      var e = this.n, n = this.d;
      if (isNaN(e) || isNaN(n)) return "NaN";
      r = r || 15;
      var u = Aa(e, n), t = Fa(e, n, u), a = this.s < 0 ? "-" : "";
      if (a += e / n | 0, e %= n, e *= 10, e && (a += "."), u) {
        for (var l = t; l--; ) a += e / n | 0, e %= n, e *= 10;
        a += "(";
        for (var l = u; l--; ) a += e / n | 0, e %= n, e *= 10;
        a += ")";
      } else for (var l = r; e && l--; ) a += e / n | 0, e %= n, e *= 10;
      return a;
    }
  };
  var wa = "Fraction", Ca = [], ba = G(wa, Ca, () => (Object.defineProperty(wr, "name", {
    value: "Fraction"
  }), wr.prototype.constructor = wr, wr.prototype.type = "Fraction", wr.prototype.isFraction = true, wr.prototype.toJSON = function() {
    return {
      mathjs: "Fraction",
      n: this.s * this.n,
      d: this.d
    };
  }, wr.fromJSON = function(r) {
    return new wr(r);
  }, wr), {
    isClass: true
  }), _a = "Matrix", Ba = [], xa = G(_a, Ba, () => {
    function r() {
      if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
    }
    return r.prototype.type = "Matrix", r.prototype.isMatrix = true, r.prototype.storage = function() {
      throw new Error("Cannot invoke storage on a Matrix interface");
    }, r.prototype.datatype = function() {
      throw new Error("Cannot invoke datatype on a Matrix interface");
    }, r.prototype.create = function(e, n) {
      throw new Error("Cannot invoke create on a Matrix interface");
    }, r.prototype.subset = function(e, n, u) {
      throw new Error("Cannot invoke subset on a Matrix interface");
    }, r.prototype.get = function(e) {
      throw new Error("Cannot invoke get on a Matrix interface");
    }, r.prototype.set = function(e, n, u) {
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
    isClass: true
  });
  function Pe(r, e, n) {
    var u = r.constructor, t = new u(2), a = "";
    if (n) {
      if (n < 1) throw new Error("size must be in greater than 0");
      if (!cr(n)) throw new Error("size must be an integer");
      if (r.greaterThan(t.pow(n - 1).sub(1)) || r.lessThan(t.pow(n - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
      if (!r.isInteger()) throw new Error("Value must be an integer");
      r.lessThan(0) && (r = r.add(t.pow(n))), a = "i".concat(n);
    }
    switch (e) {
      case 2:
        return "".concat(r.toBinary()).concat(a);
      case 8:
        return "".concat(r.toOctal()).concat(a);
      case 16:
        return "".concat(r.toHexadecimal()).concat(a);
      default:
        throw new Error("Base ".concat(e, " not supported "));
    }
  }
  function Sa(r, e) {
    if (typeof e == "function") return e(r);
    if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
    var { notation: n, precision: u, wordSize: t } = Fn(e);
    switch (n) {
      case "fixed":
        return Na(r, u);
      case "exponential":
        return At(r, u);
      case "engineering":
        return Ma(r, u);
      case "bin":
        return Pe(r, 2, t);
      case "oct":
        return Pe(r, 8, t);
      case "hex":
        return Pe(r, 16, t);
      case "auto": {
        var a = Ft(e == null ? void 0 : e.lowerExp, -3), l = Ft(e == null ? void 0 : e.upperExp, 5);
        if (r.isZero()) return "0";
        var D, f = r.toSignificantDigits(u), c = f.e;
        return c >= a && c < l ? D = f.toFixed() : D = At(r, u), D.replace(/((\.\d*?)(0+))($|e)/, function() {
          var i = arguments[2], s = arguments[4];
          return i !== "." ? i + s : s;
        });
      }
      default:
        throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function Ma(r, e) {
    var n = r.e, u = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -u)), a = t.toPrecision(e);
    if (a.includes("e")) {
      var l = r.constructor;
      a = new l(a).toFixed();
    }
    return a + "e" + (n >= 0 ? "+" : "") + u.toString();
  }
  function At(r, e) {
    return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
  }
  function Na(r, e) {
    return r.toFixed(e);
  }
  function Ft(r, e) {
    return fr(r) ? r : gr(r) ? r.toNumber() : e;
  }
  function pr(r, e) {
    var n = Ta(r, e);
    return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
  }
  function Ta(r, e) {
    if (typeof r == "number") return Ue(r, e);
    if (gr(r)) return Sa(r, e);
    if (za(r)) return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
    if (Array.isArray(r)) return Cn(r, e);
    if (Tr(r)) return Et(r);
    if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
    if (r && typeof r == "object") {
      if (typeof r.format == "function") return r.format(e);
      if (r && r.toString(e) !== {}.toString()) return r.toString(e);
      var n = Object.keys(r).map((u) => Et(u) + ": " + pr(r[u], e));
      return "{" + n.join(", ") + "}";
    }
    return String(r);
  }
  function Et(r) {
    for (var e = String(r), n = "", u = 0; u < e.length; ) {
      var t = e.charAt(u);
      n += t in wt ? wt[t] : t, u++;
    }
    return '"' + n + '"';
  }
  var wt = {
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t"
  };
  function Cn(r, e) {
    if (Array.isArray(r)) {
      for (var n = "[", u = r.length, t = 0; t < u; t++) t !== 0 && (n += ", "), n += Cn(r[t], e);
      return n += "]", n;
    } else return pr(r, e);
  }
  function za(r) {
    return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || false;
  }
  function nr(r, e, n) {
    if (!(this instanceof nr)) throw new SyntaxError("Constructor must be called with the new operator");
    this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
  }
  nr.prototype = new RangeError();
  nr.prototype.constructor = RangeError;
  nr.prototype.name = "DimensionError";
  nr.prototype.isDimensionError = true;
  function Lr(r, e, n) {
    if (!(this instanceof Lr)) throw new SyntaxError("Constructor must be called with the new operator");
    this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
  }
  Lr.prototype = new RangeError();
  Lr.prototype.constructor = RangeError;
  Lr.prototype.name = "IndexError";
  Lr.prototype.isIndexError = true;
  function ir(r) {
    for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
    return e;
  }
  function bn(r, e, n) {
    var u, t = r.length;
    if (t !== e[n]) throw new nr(t, e[n]);
    if (n < e.length - 1) {
      var a = n + 1;
      for (u = 0; u < t; u++) {
        var l = r[u];
        if (!Array.isArray(l)) throw new nr(e.length - 1, e.length, "<");
        bn(r[u], e, a);
      }
    } else for (u = 0; u < t; u++) if (Array.isArray(r[u])) throw new nr(e.length + 1, e.length, ">");
  }
  function Ct(r, e) {
    var n = e.length === 0;
    if (n) {
      if (Array.isArray(r)) throw new nr(r.length, 0);
    } else bn(r, e, 0);
  }
  function mr(r, e) {
    if (r !== void 0) {
      if (!fr(r) || !cr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
      if (r < 0 || typeof e == "number" && r >= e) throw new Lr(r, e);
    }
  }
  function he(r, e, n) {
    if (!Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new Error("Resizing to scalar is not supported");
    e.forEach(function(t) {
      if (!fr(t) || !cr(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + pr(e) + ")");
    }), (fr(r) || gr(r)) && (r = [
      r
    ]);
    var u = n !== void 0 ? n : 0;
    return Le(r, e, 0, u), r;
  }
  function Le(r, e, n, u) {
    var t, a, l = r.length, D = e[n], f = Math.min(l, D);
    if (r.length = D, n < e.length - 1) {
      var c = n + 1;
      for (t = 0; t < f; t++) a = r[t], Array.isArray(a) || (a = [
        a
      ], r[t] = a), Le(a, e, c, u);
      for (t = f; t < D; t++) a = [], r[t] = a, Le(a, e, c, u);
    } else {
      for (t = 0; t < f; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
      for (t = f; t < D; t++) r[t] = u;
    }
  }
  function ke(r, e) {
    var n = Ve(r), u = n.length;
    if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new nr(0, u, "!=");
    e = je(e, u);
    var t = _n(e);
    if (u !== t) throw new nr(t, u, "!=");
    try {
      return Oa(n, e);
    } catch (a) {
      throw a instanceof nr ? new nr(t, u, "!=") : a;
    }
  }
  function je(r, e) {
    var n = _n(r), u = r.slice(), t = -1, a = r.indexOf(t), l = r.indexOf(t, a + 1) >= 0;
    if (l) throw new Error("More than one wildcard in sizes");
    var D = a >= 0, f = e % n === 0;
    if (D) if (f) u[a] = -e / n;
    else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
    return u;
  }
  function _n(r) {
    return r.reduce((e, n) => e * n, 1);
  }
  function Oa(r, e) {
    for (var n = r, u, t = e.length - 1; t > 0; t--) {
      var a = e[t];
      u = [];
      for (var l = n.length / a, D = 0; D < l; D++) u.push(n.slice(D * a, (D + 1) * a));
      n = u;
    }
    return n;
  }
  function bt(r, e) {
    for (var n = ir(r); Array.isArray(r) && r.length === 1; ) r = r[0], n.shift();
    for (var u = n.length; n[u - 1] === 1; ) u--;
    return u < n.length && (r = Bn(r, u, 0), n.length = u), r;
  }
  function Bn(r, e, n) {
    var u, t;
    if (n < e) {
      var a = n + 1;
      for (u = 0, t = r.length; u < t; u++) r[u] = Bn(r[u], e, a);
    } else for (; Array.isArray(r); ) r = r[0];
    return r;
  }
  function xn(r, e, n, u) {
    var t = u || ir(r);
    if (n) for (var a = 0; a < n; a++) r = [
      r
    ], t.unshift(1);
    for (r = Sn(r, e, 0); t.length < e; ) t.push(1);
    return r;
  }
  function Sn(r, e, n) {
    var u, t;
    if (Array.isArray(r)) {
      var a = n + 1;
      for (u = 0, t = r.length; u < t; u++) r[u] = Sn(r[u], e, a);
    } else for (var l = n; l < e; l++) r = [
      r
    ];
    return r;
  }
  function Ve(r) {
    if (!Array.isArray(r)) return r;
    var e = [];
    return r.forEach(function n(u) {
      Array.isArray(u) ? u.forEach(n) : e.push(u);
    }), e;
  }
  function Be(r, e) {
    for (var n, u = 0, t = 0; t < r.length; t++) {
      var a = r[t], l = Array.isArray(a);
      if (t === 0 && l && (u = a.length), l && a.length !== u) return;
      var D = l ? Be(a, e) : e(a);
      if (n === void 0) n = D;
      else if (n !== D) return "mixed";
    }
    return n;
  }
  function Mn(r, e, n, u) {
    if (u < n) {
      if (r.length !== e.length) throw new nr(r.length, e.length);
      for (var t = [], a = 0; a < r.length; a++) t[a] = Mn(r[a], e[a], n, u + 1);
      return t;
    } else return r.concat(e);
  }
  function Nn() {
    var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
    if (r.length === 1) return r[0];
    if (r.length > 1) return r.slice(1).reduce(function(n, u) {
      return Mn(n, u, e, 0);
    }, r[0]);
    throw new Error("Wrong number of arguments in function concat");
  }
  function Tn() {
    for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
    for (var u = e.map((d) => d.length), t = Math.max(...u), a = new Array(t).fill(null), l = 0; l < e.length; l++) for (var D = e[l], f = u[l], c = 0; c < f; c++) {
      var i = t - f + c;
      D[c] > a[i] && (a[i] = D[c]);
    }
    for (var s = 0; s < e.length; s++) zn(e[s], a);
    return a;
  }
  function zn(r, e) {
    for (var n = e.length, u = r.length, t = 0; t < u; t++) {
      var a = n - u + t;
      if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(u, " with size ").concat(r[t], " to size ").concat(e[a]));
    }
  }
  function We(r, e) {
    var n = ir(r);
    if (Rr(n, e)) return r;
    zn(n, e);
    var u = Tn(n, e), t = u.length, a = [
      ...Array(t - n.length).fill(1),
      ...n
    ], l = Ia(r);
    n.length < t && (l = ke(l, a), n = ir(l));
    for (var D = 0; D < t; D++) n[D] < u[D] && (l = $a(l, u[D], D), n = ir(l));
    return l;
  }
  function $a(r, e, n) {
    return Nn(...Array(e).fill(r), n);
  }
  function On(r, e) {
    if (!Array.isArray(r)) throw new Error("Array expected");
    var n = ir(r);
    if (e.length !== n.length) throw new nr(e.length, n.length);
    for (var u = 0; u < e.length; u++) mr(e[u], n[u]);
    return e.reduce((t, a) => t[a], r);
  }
  function Ia(r) {
    return Ce([], r);
  }
  function me(r, e, n) {
    if (De.isTypedFunction(r)) {
      var u = (e.isMatrix ? e.size() : ir(e)).map(() => 0), t = e.isMatrix ? e.get(u) : On(e, u), a = Object.keys(r.signatures).length === 1, l = qa(r, t, u, e), D = a ? Object.values(r.signatures)[0] : r;
      return l >= 1 && l <= 3 ? function() {
        for (var f = arguments.length, c = new Array(f), i = 0; i < f; i++) c[i] = arguments[i];
        return _t(D, c.slice(0, l), n, r.name);
      } : function() {
        for (var f = arguments.length, c = new Array(f), i = 0; i < f; i++) c[i] = arguments[i];
        return _t(D, c, n, r.name);
      };
    }
    return r;
  }
  function qa(r, e, n, u) {
    for (var t = [
      e,
      n,
      u
    ], a = 3; a > 0; a--) {
      var l = t.slice(0, a);
      if (De.resolve(r, l) !== null) return a;
    }
  }
  function _t(r, e, n, u) {
    try {
      return r(...e);
    } catch (t) {
      Ra(t, e, n, u);
    }
  }
  function Ra(r, e, n, u) {
    var t;
    if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
      var a = [];
      throw a.push("value: ".concat(zr(e[0]))), e.length >= 2 && a.push("index: ".concat(zr(e[1]))), e.length >= 3 && a.push("array: ".concat(zr(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(u, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
    } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(u, ": ").concat(r.message));
  }
  var Pa = "DenseMatrix", Ua = [
    "Matrix"
  ], La = G(Pa, Ua, (r) => {
    var { Matrix: e } = r;
    function n(i, s) {
      if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
      if (s && !Tr(s)) throw new Error("Invalid datatype: " + s);
      if (vr(i)) i.type === "DenseMatrix" ? (this._data = tr(i._data), this._size = tr(i._size), this._datatype = s || i._datatype) : (this._data = i.toArray(), this._size = i.size(), this._datatype = s || i._datatype);
      else if (i && Dr(i.data) && Dr(i.size)) this._data = i.data, this._size = i.size, Ct(this._data, this._size), this._datatype = s || i.datatype;
      else if (Dr(i)) this._data = c(i), this._size = ir(this._data), Ct(this._data, this._size), this._datatype = s;
      else {
        if (i) throw new TypeError("Unsupported type of data (" + zr(i) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = s;
      }
    }
    n.prototype = new e(), n.prototype.createDenseMatrix = function(i, s) {
      return new n(i, s);
    }, Object.defineProperty(n, "name", {
      value: "DenseMatrix"
    }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
      return Be(this._data, zr);
    }, n.prototype.storage = function() {
      return "dense";
    }, n.prototype.datatype = function() {
      return this._datatype;
    }, n.prototype.create = function(i, s) {
      return new n(i, s);
    }, n.prototype.subset = function(i, s, d) {
      switch (arguments.length) {
        case 1:
          return u(this, i);
        case 2:
        case 3:
          return a(this, i, s, d);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    }, n.prototype.get = function(i) {
      return On(this._data, i);
    }, n.prototype.set = function(i, s, d) {
      if (!Dr(i)) throw new TypeError("Array expected");
      if (i.length < this._size.length) throw new nr(i.length, this._size.length, "<");
      var v, p, o, h = i.map(function(w) {
        return w + 1;
      });
      f(this, h, d);
      var g = this._data;
      for (v = 0, p = i.length - 1; v < p; v++) o = i[v], mr(o, g.length), g = g[o];
      return o = i[i.length - 1], mr(o, g.length), g[o] = s, this;
    };
    function u(i, s) {
      if (!Ye(s)) throw new TypeError("Invalid index");
      var d = s.isScalar();
      if (d) return i.get(s.min());
      var v = s.size();
      if (v.length !== i._size.length) throw new nr(v.length, i._size.length);
      for (var p = s.min(), o = s.max(), h = 0, g = i._size.length; h < g; h++) mr(p[h], i._size[h]), mr(o[h], i._size[h]);
      return new n(t(i._data, s, v.length, 0), i._datatype);
    }
    function t(i, s, d, v) {
      var p = v === d - 1, o = s.dimension(v);
      return p ? o.map(function(h) {
        return mr(h, i.length), i[h];
      }).valueOf() : o.map(function(h) {
        mr(h, i.length);
        var g = i[h];
        return t(g, s, d, v + 1);
      }).valueOf();
    }
    function a(i, s, d, v) {
      if (!s || s.isIndex !== true) throw new TypeError("Invalid index");
      var p = s.size(), o = s.isScalar(), h;
      if (vr(d) ? (h = d.size(), d = d.valueOf()) : h = ir(d), o) {
        if (h.length !== 0) throw new TypeError("Scalar expected");
        i.set(s.min(), d, v);
      } else {
        if (!Rr(h, p)) try {
          h.length === 0 ? d = We([
            d
          ], p) : d = We(d, p), h = ir(d);
        } catch {
        }
        if (p.length < i._size.length) throw new nr(p.length, i._size.length, "<");
        if (h.length < p.length) {
          for (var g = 0, w = 0; p[g] === 1 && h[g] === 1; ) g++;
          for (; p[g] === 1; ) w++, g++;
          d = xn(d, p.length, w, h);
        }
        if (!Rr(p, h)) throw new nr(p, h, ">");
        var m = s.max().map(function(A) {
          return A + 1;
        });
        f(i, m, v);
        var C = p.length, F = 0;
        l(i._data, s, d, C, F);
      }
      return i;
    }
    function l(i, s, d, v, p) {
      var o = p === v - 1, h = s.dimension(p);
      o ? h.forEach(function(g, w) {
        mr(g), i[g] = d[w[0]];
      }) : h.forEach(function(g, w) {
        mr(g), l(i[g], s, d[w[0]], v, p + 1);
      });
    }
    n.prototype.resize = function(i, s, d) {
      if (!de(i)) throw new TypeError("Array or Matrix expected");
      var v = i.valueOf().map((o) => Array.isArray(o) && o.length === 1 ? o[0] : o), p = d ? this.clone() : this;
      return D(p, v, s);
    };
    function D(i, s, d) {
      if (s.length === 0) {
        for (var v = i._data; Dr(v); ) v = v[0];
        return v;
      }
      return i._size = s.slice(0), i._data = he(i._data, i._size, d), i;
    }
    n.prototype.reshape = function(i, s) {
      var d = s ? this.clone() : this;
      d._data = ke(d._data, i);
      var v = d._size.reduce((p, o) => p * o);
      return d._size = je(i, v), d;
    };
    function f(i, s, d) {
      for (var v = i._size.slice(0), p = false; v.length < s.length; ) v.push(0), p = true;
      for (var o = 0, h = s.length; o < h; o++) s[o] > v[o] && (v[o] = s[o], p = true);
      p && D(i, v, d);
    }
    n.prototype.clone = function() {
      var i = new n({
        data: tr(this._data),
        size: tr(this._size),
        datatype: this._datatype
      });
      return i;
    }, n.prototype.size = function() {
      return this._size.slice(0);
    }, n.prototype._forEach = function(i) {
      var s = this, d = s.size();
      if (d.length === 1) {
        for (var v = 0; v < d[0]; v++) i(s._data, v, [
          v
        ]);
        return;
      }
      var p = Array(d.length).fill(0), o = Array(d.length - 1), h = o.length - 1;
      o[0] = s._data[0];
      for (var g = 0; g < h; g++) o[g + 1] = o[g][0];
      for (p[h] = -1; ; ) {
        var w = void 0;
        for (w = h; w >= 0; w--) {
          if (p[w]++, p[w] === d[w]) {
            p[w] = 0;
            continue;
          }
          o[w] = w === 0 ? s._data[p[w]] : o[w - 1][p[w]];
          for (var m = w; m < h; m++) o[m + 1] = o[m][0];
          for (var C = 0; C < d[o.length]; C++) p[o.length] = C, i(o[h], C, p.slice(0));
          break;
        }
        if (w === -1) break;
      }
    }, n.prototype.map = function(i) {
      var s = this, d = new n(s), v = me(i, s._data, "map");
      return d._forEach(function(p, o, h) {
        p[o] = v(p[o], h, s);
      }), d;
    }, n.prototype.forEach = function(i) {
      var s = this, d = me(i, s._data, "map");
      s._forEach(function(v, p, o) {
        d(v[p], o, s);
      });
    }, n.prototype[Symbol.iterator] = function* () {
      var i = function* (d, v) {
        if (Dr(d)) for (var p = 0; p < d.length; p++) yield* i(d[p], v.concat(p));
        else yield {
          value: d,
          index: v
        };
      };
      yield* i(this._data, []);
    }, n.prototype.rows = function() {
      var i = [], s = this.size();
      if (s.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      var d = this._data;
      for (var v of d) i.push(new n([
        v
      ], this._datatype));
      return i;
    }, n.prototype.columns = function() {
      var i = this, s = [], d = this.size();
      if (d.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      for (var v = this._data, p = function(g) {
        var w = v.map((m) => [
          m[g]
        ]);
        s.push(new n(w, i._datatype));
      }, o = 0; o < d[1]; o++) p(o);
      return s;
    }, n.prototype.toArray = function() {
      return tr(this._data);
    }, n.prototype.valueOf = function() {
      return this._data;
    }, n.prototype.format = function(i) {
      return pr(this._data, i);
    }, n.prototype.toString = function() {
      return pr(this._data);
    }, n.prototype.toJSON = function() {
      return {
        mathjs: "DenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, n.prototype.diagonal = function(i) {
      if (i) {
        if (gr(i) && (i = i.toNumber()), !fr(i) || !cr(i)) throw new TypeError("The parameter k must be an integer number");
      } else i = 0;
      for (var s = i > 0 ? i : 0, d = i < 0 ? -i : 0, v = this._size[0], p = this._size[1], o = Math.min(v - d, p - s), h = [], g = 0; g < o; g++) h[g] = this._data[g + d][g + s];
      return new n({
        data: h,
        size: [
          o
        ],
        datatype: this._datatype
      });
    }, n.diagonal = function(i, s, d, v) {
      if (!Dr(i)) throw new TypeError("Array expected, size parameter");
      if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (i = i.map(function(b) {
        if (gr(b) && (b = b.toNumber()), !fr(b) || !cr(b) || b < 1) throw new Error("Size values must be positive integers");
        return b;
      }), d) {
        if (gr(d) && (d = d.toNumber()), !fr(d) || !cr(d)) throw new TypeError("The parameter k must be an integer number");
      } else d = 0;
      var p = d > 0 ? d : 0, o = d < 0 ? -d : 0, h = i[0], g = i[1], w = Math.min(h - o, g - p), m;
      if (Dr(s)) {
        if (s.length !== w) throw new Error("Invalid value array length");
        m = function(E) {
          return s[E];
        };
      } else if (vr(s)) {
        var C = s.size();
        if (C.length !== 1 || C[0] !== w) throw new Error("Invalid matrix length");
        m = function(E) {
          return s.get([
            E
          ]);
        };
      } else m = function() {
        return s;
      };
      v || (v = gr(m(0)) ? m(0).mul(0) : 0);
      var F = [];
      if (i.length > 0) {
        F = he(F, i, v);
        for (var A = 0; A < w; A++) F[A + o][A + p] = m(A);
      }
      return new n({
        data: F,
        size: [
          h,
          g
        ]
      });
    }, n.fromJSON = function(i) {
      return new n(i);
    }, n.prototype.swapRows = function(i, s) {
      if (!fr(i) || !cr(i) || !fr(s) || !cr(s)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return mr(i, this._size[0]), mr(s, this._size[0]), n._swapRows(i, s, this._data), this;
    }, n._swapRows = function(i, s, d) {
      var v = d[i];
      d[i] = d[s], d[s] = v;
    };
    function c(i) {
      return vr(i) ? c(i.valueOf()) : Dr(i) ? i.map(c) : i;
    }
    return n;
  }, {
    isClass: true
  });
  function _r(r, e, n) {
    return r && typeof r.map == "function" ? r.map(function(u) {
      return _r(u, e);
    }) : e(r);
  }
  var Bt = "isInteger", Va = [
    "typed"
  ], Wa = G(Bt, Va, (r) => {
    var { typed: e } = r;
    return e(Bt, {
      number: cr,
      BigNumber: function(u) {
        return u.isInt();
      },
      bigint: function(u) {
        return true;
      },
      Fraction: function(u) {
        return u.d === 1 && isFinite(u.n);
      },
      "Array | Matrix": e.referToSelf((n) => (u) => _r(u, n))
    });
  }), rt = "number", xe = "number, number";
  function $n(r) {
    return Math.abs(r);
  }
  $n.signature = rt;
  function In(r, e) {
    return r + e;
  }
  In.signature = xe;
  function qn(r, e) {
    return r - e;
  }
  qn.signature = xe;
  function Rn(r, e) {
    return r * e;
  }
  Rn.signature = xe;
  function Pn(r) {
    return -r;
  }
  Pn.signature = rt;
  function Ge(r) {
    return ua(r);
  }
  Ge.signature = rt;
  function Un(r, e) {
    return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
  }
  Un.signature = xe;
  var Ga = "number";
  function Ln(r) {
    return r > 0;
  }
  Ln.signature = Ga;
  function Qr(r, e) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (u < 0) throw new Error("Absolute tolerance must be at least 0");
    return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), u));
  }
  var xt = "isPositive", Za = [
    "typed",
    "config"
  ], Ja = G(xt, Za, (r) => {
    var { typed: e, config: n } = r;
    return e(xt, {
      number: (u) => qr(u, 0, n.relTol, n.absTol) ? false : Ln(u),
      BigNumber: (u) => Qr(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(),
      bigint: (u) => u > 0n,
      Fraction: (u) => u.s > 0 && u.n > 0,
      Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)),
      "Array | Matrix": e.referToSelf((u) => (t) => _r(t, u))
    });
  }), St = "isZero", Qa = [
    "typed",
    "equalScalar"
  ], Xa = G(St, Qa, (r) => {
    var { typed: e, equalScalar: n } = r;
    return e(St, {
      "number | BigNumber | Complex | Fraction": (u) => n(u, 0),
      bigint: (u) => u === 0n,
      Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)),
      "Array | Matrix": e.referToSelf((u) => (t) => _r(t, u))
    });
  });
  function Ya(r, e, n, u) {
    return qr(r.re, e.re, n, u) && qr(r.im, e.im, n, u);
  }
  var re = G("compareUnits", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      "Unit, Unit": e.referToSelf((n) => (u, t) => {
        if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
        return e.find(n, [
          u.valueType(),
          t.valueType()
        ])(u.value, t.value);
      })
    };
  }), ge = "equalScalar", Ka = [
    "typed",
    "config"
  ], Ha = G(ge, Ka, (r) => {
    var { typed: e, config: n } = r, u = re({
      typed: e
    });
    return e(ge, {
      "boolean, boolean": function(a, l) {
        return a === l;
      },
      "number, number": function(a, l) {
        return qr(a, l, n.relTol, n.absTol);
      },
      "BigNumber, BigNumber": function(a, l) {
        return a.eq(l) || Qr(a, l, n.relTol, n.absTol);
      },
      "bigint, bigint": function(a, l) {
        return a === l;
      },
      "Fraction, Fraction": function(a, l) {
        return a.equals(l);
      },
      "Complex, Complex": function(a, l) {
        return Ya(a, l, n.relTol, n.absTol);
      }
    }, u);
  });
  G(ge, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(ge, {
      "number, number": function(t, a) {
        return qr(t, a, n.relTol, n.absTol);
      }
    });
  });
  var ka = "SparseMatrix", ja = [
    "typed",
    "equalScalar",
    "Matrix"
  ], ri = G(ka, ja, (r) => {
    var { typed: e, equalScalar: n, Matrix: u } = r;
    function t(o, h) {
      if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
      if (h && !Tr(h)) throw new Error("Invalid datatype: " + h);
      if (vr(o)) a(this, o, h);
      else if (o && Dr(o.index) && Dr(o.ptr) && Dr(o.size)) this._values = o.values, this._index = o.index, this._ptr = o.ptr, this._size = o.size, this._datatype = h || o.datatype;
      else if (Dr(o)) l(this, o, h);
      else {
        if (o) throw new TypeError("Unsupported type of data (" + zr(o) + ")");
        this._values = [], this._index = [], this._ptr = [
          0
        ], this._size = [
          0,
          0
        ], this._datatype = h;
      }
    }
    function a(o, h, g) {
      h.type === "SparseMatrix" ? (o._values = h._values ? tr(h._values) : void 0, o._index = tr(h._index), o._ptr = tr(h._ptr), o._size = tr(h._size), o._datatype = g || h._datatype) : l(o, h.valueOf(), g || h._datatype);
    }
    function l(o, h, g) {
      o._values = [], o._index = [], o._ptr = [], o._datatype = g;
      var w = h.length, m = 0, C = n, F = 0;
      if (Tr(g) && (C = e.find(n, [
        g,
        g
      ]) || n, F = e.convert(0, g)), w > 0) {
        var A = 0;
        do {
          o._ptr.push(o._index.length);
          for (var b = 0; b < w; b++) {
            var E = h[b];
            if (Dr(E)) {
              if (A === 0 && m < E.length && (m = E.length), A < E.length) {
                var y = E[A];
                C(y, F) || (o._values.push(y), o._index.push(b));
              }
            } else A === 0 && m < 1 && (m = 1), C(E, F) || (o._values.push(E), o._index.push(b));
          }
          A++;
        } while (A < m);
      }
      o._ptr.push(o._index.length), o._size = [
        w,
        m
      ];
    }
    t.prototype = new u(), t.prototype.createSparseMatrix = function(o, h) {
      return new t(o, h);
    }, Object.defineProperty(t, "name", {
      value: "SparseMatrix"
    }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
      return Be(this._values, zr);
    }, t.prototype.storage = function() {
      return "sparse";
    }, t.prototype.datatype = function() {
      return this._datatype;
    }, t.prototype.create = function(o, h) {
      return new t(o, h);
    }, t.prototype.density = function() {
      var o = this._size[0], h = this._size[1];
      return o !== 0 && h !== 0 ? this._index.length / (o * h) : 0;
    }, t.prototype.subset = function(o, h, g) {
      if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
      switch (arguments.length) {
        case 1:
          return D(this, o);
        case 2:
        case 3:
          return f(this, o, h, g);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    };
    function D(o, h) {
      if (!Ye(h)) throw new TypeError("Invalid index");
      var g = h.isScalar();
      if (g) return o.get(h.min());
      var w = h.size();
      if (w.length !== o._size.length) throw new nr(w.length, o._size.length);
      var m, C, F, A, b = h.min(), E = h.max();
      for (m = 0, C = o._size.length; m < C; m++) mr(b[m], o._size[m]), mr(E[m], o._size[m]);
      var y = o._values, B = o._index, _ = o._ptr, x = h.dimension(0), N = h.dimension(1), S = [], T = [];
      x.forEach(function($, J) {
        T[$] = J[0], S[$] = true;
      });
      var M = y ? [] : void 0, R = [], z = [];
      return N.forEach(function($) {
        for (z.push(R.length), F = _[$], A = _[$ + 1]; F < A; F++) m = B[F], S[m] === true && (R.push(T[m]), M && M.push(y[F]));
      }), z.push(R.length), new t({
        values: M,
        index: R,
        ptr: z,
        size: w,
        datatype: o._datatype
      });
    }
    function f(o, h, g, w) {
      if (!h || h.isIndex !== true) throw new TypeError("Invalid index");
      var m = h.size(), C = h.isScalar(), F;
      if (vr(g) ? (F = g.size(), g = g.toArray()) : F = ir(g), C) {
        if (F.length !== 0) throw new TypeError("Scalar expected");
        o.set(h.min(), g, w);
      } else {
        if (m.length !== 1 && m.length !== 2) throw new nr(m.length, o._size.length, "<");
        if (F.length < m.length) {
          for (var A = 0, b = 0; m[A] === 1 && F[A] === 1; ) A++;
          for (; m[A] === 1; ) b++, A++;
          g = xn(g, m.length, b, F);
        }
        if (!Rr(m, F)) throw new nr(m, F, ">");
        if (m.length === 1) {
          var E = h.dimension(0);
          E.forEach(function(_, x) {
            mr(_), o.set([
              _,
              0
            ], g[x[0]], w);
          });
        } else {
          var y = h.dimension(0), B = h.dimension(1);
          y.forEach(function(_, x) {
            mr(_), B.forEach(function(N, S) {
              mr(N), o.set([
                _,
                N
              ], g[x[0]][S[0]], w);
            });
          });
        }
      }
      return o;
    }
    t.prototype.get = function(o) {
      if (!Dr(o)) throw new TypeError("Array expected");
      if (o.length !== this._size.length) throw new nr(o.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
      var h = o[0], g = o[1];
      mr(h, this._size[0]), mr(g, this._size[1]);
      var w = c(h, this._ptr[g], this._ptr[g + 1], this._index);
      return w < this._ptr[g + 1] && this._index[w] === h ? this._values[w] : 0;
    }, t.prototype.set = function(o, h, g) {
      if (!Dr(o)) throw new TypeError("Array expected");
      if (o.length !== this._size.length) throw new nr(o.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
      var w = o[0], m = o[1], C = this._size[0], F = this._size[1], A = n, b = 0;
      Tr(this._datatype) && (A = e.find(n, [
        this._datatype,
        this._datatype
      ]) || n, b = e.convert(0, this._datatype)), (w > C - 1 || m > F - 1) && (d(this, Math.max(w + 1, C), Math.max(m + 1, F), g), C = this._size[0], F = this._size[1]), mr(w, C), mr(m, F);
      var E = c(w, this._ptr[m], this._ptr[m + 1], this._index);
      return E < this._ptr[m + 1] && this._index[E] === w ? A(h, b) ? i(E, m, this._values, this._index, this._ptr) : this._values[E] = h : A(h, b) || s(E, w, m, h, this._values, this._index, this._ptr), this;
    };
    function c(o, h, g, w) {
      if (g - h === 0) return g;
      for (var m = h; m < g; m++) if (w[m] === o) return m;
      return h;
    }
    function i(o, h, g, w, m) {
      g.splice(o, 1), w.splice(o, 1);
      for (var C = h + 1; C < m.length; C++) m[C]--;
    }
    function s(o, h, g, w, m, C, F) {
      m.splice(o, 0, w), C.splice(o, 0, h);
      for (var A = g + 1; A < F.length; A++) F[A]++;
    }
    t.prototype.resize = function(o, h, g) {
      if (!de(o)) throw new TypeError("Array or Matrix expected");
      var w = o.valueOf().map((C) => Array.isArray(C) && C.length === 1 ? C[0] : C);
      if (w.length !== 2) throw new Error("Only two dimensions matrix are supported");
      w.forEach(function(C) {
        if (!fr(C) || !cr(C) || C < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + pr(w) + ")");
      });
      var m = g ? this.clone() : this;
      return d(m, w[0], w[1], h);
    };
    function d(o, h, g, w) {
      var m = w || 0, C = n, F = 0;
      Tr(o._datatype) && (C = e.find(n, [
        o._datatype,
        o._datatype
      ]) || n, F = e.convert(0, o._datatype), m = e.convert(m, o._datatype));
      var A = !C(m, F), b = o._size[0], E = o._size[1], y, B, _;
      if (g > E) {
        for (B = E; B < g; B++) if (o._ptr[B] = o._values.length, A) for (y = 0; y < b; y++) o._values.push(m), o._index.push(y);
        o._ptr[g] = o._values.length;
      } else g < E && (o._ptr.splice(g + 1, E - g), o._values.splice(o._ptr[g], o._values.length), o._index.splice(o._ptr[g], o._index.length));
      if (E = g, h > b) {
        if (A) {
          var x = 0;
          for (B = 0; B < E; B++) {
            o._ptr[B] = o._ptr[B] + x, _ = o._ptr[B + 1] + x;
            var N = 0;
            for (y = b; y < h; y++, N++) o._values.splice(_ + N, 0, m), o._index.splice(_ + N, 0, y), x++;
          }
          o._ptr[E] = o._values.length;
        }
      } else if (h < b) {
        var S = 0;
        for (B = 0; B < E; B++) {
          o._ptr[B] = o._ptr[B] - S;
          var T = o._ptr[B], M = o._ptr[B + 1] - S;
          for (_ = T; _ < M; _++) y = o._index[_], y > h - 1 && (o._values.splice(_, 1), o._index.splice(_, 1), S++);
        }
        o._ptr[B] = o._values.length;
      }
      return o._size[0] = h, o._size[1] = g, o;
    }
    t.prototype.reshape = function(o, h) {
      if (!Dr(o)) throw new TypeError("Array expected");
      if (o.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
      o.forEach(function($) {
        if (!fr($) || !cr($) || $ <= -2 || $ === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + pr(o) + ")");
      });
      var g = this._size[0] * this._size[1];
      o = je(o, g);
      var w = o[0] * o[1];
      if (g !== w) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
      var m = h ? this.clone() : this;
      if (this._size[0] === o[0] && this._size[1] === o[1]) return m;
      for (var C = [], F = 0; F < m._ptr.length; F++) for (var A = 0; A < m._ptr[F + 1] - m._ptr[F]; A++) C.push(F);
      for (var b = m._values.slice(), E = m._index.slice(), y = 0; y < m._index.length; y++) {
        var B = E[y], _ = C[y], x = B * m._size[1] + _;
        C[y] = x % o[1], E[y] = Math.floor(x / o[1]);
      }
      m._values.length = 0, m._index.length = 0, m._ptr.length = o[1] + 1, m._size = o.slice();
      for (var N = 0; N < m._ptr.length; N++) m._ptr[N] = 0;
      for (var S = 0; S < b.length; S++) {
        var T = E[S], M = C[S], R = b[S], z = c(T, m._ptr[M], m._ptr[M + 1], m._index);
        s(z, T, M, R, m._values, m._index, m._ptr);
      }
      return m;
    }, t.prototype.clone = function() {
      var o = new t({
        values: this._values ? tr(this._values) : void 0,
        index: tr(this._index),
        ptr: tr(this._ptr),
        size: tr(this._size),
        datatype: this._datatype
      });
      return o;
    }, t.prototype.size = function() {
      return this._size.slice(0);
    }, t.prototype.map = function(o, h) {
      if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
      var g = this, w = this._size[0], m = this._size[1], C = me(o, g, "map"), F = function(b, E, y) {
        return C(b, [
          E,
          y
        ], g);
      };
      return v(this, 0, w - 1, 0, m - 1, F, h);
    };
    function v(o, h, g, w, m, C, F) {
      var A = [], b = [], E = [], y = n, B = 0;
      Tr(o._datatype) && (y = e.find(n, [
        o._datatype,
        o._datatype
      ]) || n, B = e.convert(0, o._datatype));
      for (var _ = function(I, Z, Q) {
        var V = C(I, Z, Q);
        y(V, B) || (A.push(V), b.push(Z));
      }, x = w; x <= m; x++) {
        E.push(A.length);
        var N = o._ptr[x], S = o._ptr[x + 1];
        if (F) for (var T = N; T < S; T++) {
          var M = o._index[T];
          M >= h && M <= g && _(o._values[T], M - h, x - w);
        }
        else {
          for (var R = {}, z = N; z < S; z++) {
            var $ = o._index[z];
            R[$] = o._values[z];
          }
          for (var J = h; J <= g; J++) {
            var X = J in R ? R[J] : 0;
            _(X, J - h, x - w);
          }
        }
      }
      return E.push(A.length), new t({
        values: A,
        index: b,
        ptr: E,
        size: [
          g - h + 1,
          m - w + 1
        ]
      });
    }
    t.prototype.forEach = function(o, h) {
      if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
      for (var g = this, w = this._size[0], m = this._size[1], C = me(o, g, "forEach"), F = 0; F < m; F++) {
        var A = this._ptr[F], b = this._ptr[F + 1];
        if (h) for (var E = A; E < b; E++) {
          var y = this._index[E];
          C(this._values[E], [
            y,
            F
          ], g);
        }
        else {
          for (var B = {}, _ = A; _ < b; _++) {
            var x = this._index[_];
            B[x] = this._values[_];
          }
          for (var N = 0; N < w; N++) {
            var S = N in B ? B[N] : 0;
            C(S, [
              N,
              F
            ], g);
          }
        }
      }
    }, t.prototype[Symbol.iterator] = function* () {
      if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
      for (var o = this._size[1], h = 0; h < o; h++) for (var g = this._ptr[h], w = this._ptr[h + 1], m = g; m < w; m++) {
        var C = this._index[m];
        yield {
          value: this._values[m],
          index: [
            C,
            h
          ]
        };
      }
    }, t.prototype.toArray = function() {
      return p(this._values, this._index, this._ptr, this._size, true);
    }, t.prototype.valueOf = function() {
      return p(this._values, this._index, this._ptr, this._size, false);
    };
    function p(o, h, g, w, m) {
      var C = w[0], F = w[1], A = [], b, E;
      for (b = 0; b < C; b++) for (A[b] = [], E = 0; E < F; E++) A[b][E] = 0;
      for (E = 0; E < F; E++) for (var y = g[E], B = g[E + 1], _ = y; _ < B; _++) b = h[_], A[b][E] = o ? m ? tr(o[_]) : o[_] : 1;
      return A;
    }
    return t.prototype.format = function(o) {
      for (var h = this._size[0], g = this._size[1], w = this.density(), m = "Sparse Matrix [" + pr(h, o) + " x " + pr(g, o) + "] density: " + pr(w, o) + `
`, C = 0; C < g; C++) for (var F = this._ptr[C], A = this._ptr[C + 1], b = F; b < A; b++) {
        var E = this._index[b];
        m += `
    (` + pr(E, o) + ", " + pr(C, o) + ") ==> " + (this._values ? pr(this._values[b], o) : "X");
      }
      return m;
    }, t.prototype.toString = function() {
      return pr(this.toArray());
    }, t.prototype.toJSON = function() {
      return {
        mathjs: "SparseMatrix",
        values: this._values,
        index: this._index,
        ptr: this._ptr,
        size: this._size,
        datatype: this._datatype
      };
    }, t.prototype.diagonal = function(o) {
      if (o) {
        if (gr(o) && (o = o.toNumber()), !fr(o) || !cr(o)) throw new TypeError("The parameter k must be an integer number");
      } else o = 0;
      var h = o > 0 ? o : 0, g = o < 0 ? -o : 0, w = this._size[0], m = this._size[1], C = Math.min(w - g, m - h), F = [], A = [], b = [];
      b[0] = 0;
      for (var E = h; E < m && F.length < C; E++) for (var y = this._ptr[E], B = this._ptr[E + 1], _ = y; _ < B; _++) {
        var x = this._index[_];
        if (x === E - h + g) {
          F.push(this._values[_]), A[F.length - 1] = x - g;
          break;
        }
      }
      return b.push(F.length), new t({
        values: F,
        index: A,
        ptr: b,
        size: [
          C,
          1
        ]
      });
    }, t.fromJSON = function(o) {
      return new t(o);
    }, t.diagonal = function(o, h, g, w, m) {
      if (!Dr(o)) throw new TypeError("Array expected, size parameter");
      if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (o = o.map(function($) {
        if (gr($) && ($ = $.toNumber()), !fr($) || !cr($) || $ < 1) throw new Error("Size values must be positive integers");
        return $;
      }), g) {
        if (gr(g) && (g = g.toNumber()), !fr(g) || !cr(g)) throw new TypeError("The parameter k must be an integer number");
      } else g = 0;
      var C = n, F = 0;
      Tr(m) && (C = e.find(n, [
        m,
        m
      ]) || n, F = e.convert(0, m));
      var A = g > 0 ? g : 0, b = g < 0 ? -g : 0, E = o[0], y = o[1], B = Math.min(E - b, y - A), _;
      if (Dr(h)) {
        if (h.length !== B) throw new Error("Invalid value array length");
        _ = function(J) {
          return h[J];
        };
      } else if (vr(h)) {
        var x = h.size();
        if (x.length !== 1 || x[0] !== B) throw new Error("Invalid matrix length");
        _ = function(J) {
          return h.get([
            J
          ]);
        };
      } else _ = function() {
        return h;
      };
      for (var N = [], S = [], T = [], M = 0; M < y; M++) {
        T.push(N.length);
        var R = M - A;
        if (R >= 0 && R < B) {
          var z = _(R);
          C(z, F) || (S.push(R + b), N.push(z));
        }
      }
      return T.push(N.length), new t({
        values: N,
        index: S,
        ptr: T,
        size: [
          E,
          y
        ]
      });
    }, t.prototype.swapRows = function(o, h) {
      if (!fr(o) || !cr(o) || !fr(h) || !cr(h)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return mr(o, this._size[0]), mr(h, this._size[0]), t._swapRows(o, h, this._size[1], this._values, this._index, this._ptr), this;
    }, t._forEachRow = function(o, h, g, w, m) {
      for (var C = w[o], F = w[o + 1], A = C; A < F; A++) m(g[A], h[A]);
    }, t._swapRows = function(o, h, g, w, m, C) {
      for (var F = 0; F < g; F++) {
        var A = C[F], b = C[F + 1], E = c(o, A, b, m), y = c(h, A, b, m);
        if (E < b && y < b && m[E] === o && m[y] === h) {
          if (w) {
            var B = w[E];
            w[E] = w[y], w[y] = B;
          }
          continue;
        }
        if (E < b && m[E] === o && (y >= b || m[y] !== h)) {
          var _ = w ? w[E] : void 0;
          m.splice(y, 0, h), w && w.splice(y, 0, _), m.splice(y <= E ? E + 1 : E, 1), w && w.splice(y <= E ? E + 1 : E, 1);
          continue;
        }
        if (y < b && m[y] === h && (E >= b || m[E] !== o)) {
          var x = w ? w[y] : void 0;
          m.splice(E, 0, o), w && w.splice(E, 0, x), m.splice(E <= y ? y + 1 : y, 1), w && w.splice(E <= y ? y + 1 : y, 1);
        }
      }
    }, t;
  }, {
    isClass: true
  }), ei = "number", ti = [
    "typed"
  ];
  function ni(r) {
    var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
    if (e) {
      var n = {
        "0b": 2,
        "0o": 8,
        "0x": 16
      }[e[1]], u = e[2], t = e[3];
      return {
        input: r,
        radix: n,
        integerPart: u,
        fractionalPart: t
      };
    } else return null;
  }
  function ui(r) {
    for (var e = parseInt(r.integerPart, r.radix), n = 0, u = 0; u < r.fractionalPart.length; u++) {
      var t = parseInt(r.fractionalPart[u], r.radix);
      n += t / Math.pow(r.radix, u + 1);
    }
    var a = e + n;
    if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
    return a;
  }
  var ai = G(ei, ti, (r) => {
    var { typed: e } = r, n = e("number", {
      "": function() {
        return 0;
      },
      number: function(t) {
        return t;
      },
      string: function(t) {
        if (t === "NaN") return NaN;
        var a = ni(t);
        if (a) return ui(a);
        var l = 0, D = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        D && (l = Number(D[2]), t = D[1]);
        var f = Number(t);
        if (isNaN(f)) throw new SyntaxError('String "' + t + '" is not a valid number');
        if (D) {
          if (f > 2 ** l - 1) throw new SyntaxError('String "'.concat(t, '" is out of range'));
          f >= 2 ** (l - 1) && (f = f - 2 ** l);
        }
        return f;
      },
      BigNumber: function(t) {
        return t.toNumber();
      },
      bigint: function(t) {
        return Number(t);
      },
      Fraction: function(t) {
        return t.valueOf();
      },
      Unit: e.referToSelf((u) => (t) => {
        var a = t.clone();
        return a.value = u(t.value), a;
      }),
      null: function(t) {
        return 0;
      },
      "Unit, string | Unit": function(t, a) {
        return t.toNumber(a);
      },
      "Array | Matrix": e.referToSelf((u) => (t) => _r(t, u))
    });
    return n.fromJSON = function(u) {
      return parseFloat(u.value);
    }, n;
  }), ii = "bignumber", oi = [
    "typed",
    "BigNumber"
  ], si = G(ii, oi, (r) => {
    var { typed: e, BigNumber: n } = r;
    return e("bignumber", {
      "": function() {
        return new n(0);
      },
      number: function(t) {
        return new n(t + "");
      },
      string: function(t) {
        var a = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        if (a) {
          var l = a[2], D = n(a[1]), f = new n(2).pow(Number(l));
          if (D.gt(f.sub(1))) throw new SyntaxError('String "'.concat(t, '" is out of range'));
          var c = new n(2).pow(Number(l) - 1);
          return D.gte(c) ? D.sub(f) : D;
        }
        return new n(t);
      },
      BigNumber: function(t) {
        return t;
      },
      bigint: function(t) {
        return new n(t.toString());
      },
      Unit: e.referToSelf((u) => (t) => {
        var a = t.clone();
        return a.value = u(t.value), a;
      }),
      Fraction: function(t) {
        return new n(t.n).div(t.d).times(t.s);
      },
      null: function(t) {
        return new n(0);
      },
      "Array | Matrix": e.referToSelf((u) => (t) => _r(t, u))
    });
  }), fi = "complex", li = [
    "typed",
    "Complex"
  ], ci = G(fi, li, (r) => {
    var { typed: e, Complex: n } = r;
    return e("complex", {
      "": function() {
        return n.ZERO;
      },
      number: function(t) {
        return new n(t, 0);
      },
      "number, number": function(t, a) {
        return new n(t, a);
      },
      "BigNumber, BigNumber": function(t, a) {
        return new n(t.toNumber(), a.toNumber());
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
        if ("re" in t && "im" in t) return new n(t.re, t.im);
        if ("r" in t && "phi" in t || "abs" in t && "arg" in t) return new n(t);
        throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
      },
      "Array | Matrix": e.referToSelf((u) => (t) => _r(t, u))
    });
  }), vi = "fraction", Di = [
    "typed",
    "Fraction"
  ], pi = G(vi, Di, (r) => {
    var { typed: e, Fraction: n } = r;
    return e("fraction", {
      number: function(t) {
        if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");
        return new n(t);
      },
      string: function(t) {
        return new n(t);
      },
      "number, number": function(t, a) {
        return new n(t, a);
      },
      null: function(t) {
        return new n(0);
      },
      BigNumber: function(t) {
        return new n(t.toString());
      },
      bigint: function(t) {
        return new n(t.toString());
      },
      Fraction: function(t) {
        return t;
      },
      Unit: e.referToSelf((u) => (t) => {
        var a = t.clone();
        return a.value = u(t.value), a;
      }),
      Object: function(t) {
        return new n(t);
      },
      "Array | Matrix": e.referToSelf((u) => (t) => _r(t, u))
    });
  }), Mt = "matrix", di = [
    "typed",
    "Matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], hi = G(Mt, di, (r) => {
    var { typed: e, Matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
    return e(Mt, {
      "": function() {
        return a([]);
      },
      string: function(D) {
        return a([], D);
      },
      "string, string": function(D, f) {
        return a([], D, f);
      },
      Array: function(D) {
        return a(D);
      },
      Matrix: function(D) {
        return a(D, D.storage());
      },
      "Array | Matrix, string": a,
      "Array | Matrix, string, string": a
    });
    function a(l, D, f) {
      if (D === "dense" || D === "default" || D === void 0) return new u(l, f);
      if (D === "sparse") return new t(l, f);
      throw new TypeError("Unknown matrix type " + JSON.stringify(D) + ".");
    }
  }), Nt = "matrixFromColumns", mi = [
    "typed",
    "matrix",
    "flatten",
    "size"
  ], gi = G(Nt, mi, (r) => {
    var { typed: e, matrix: n, flatten: u, size: t } = r;
    return e(Nt, {
      "...Array": function(f) {
        return a(f);
      },
      "...Matrix": function(f) {
        return n(a(f.map((c) => c.toArray())));
      }
    });
    function a(D) {
      if (D.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
      for (var f = l(D[0]), c = [], i = 0; i < f; i++) c[i] = [];
      for (var s of D) {
        var d = l(s);
        if (d !== f) throw new TypeError("The vectors had different length: " + (f | 0) + " \u2260 " + (d | 0));
        for (var v = u(s), p = 0; p < f; p++) c[p].push(v[p]);
      }
      return c;
    }
    function l(D) {
      var f = t(D);
      if (f.length === 1) return f[0];
      if (f.length === 2) {
        if (f[0] === 1) return f[1];
        if (f[1] === 1) return f[0];
        throw new TypeError("At least one of the arguments is not a vector.");
      } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
    }
  }), Tt = "unaryMinus", yi = [
    "typed"
  ], Ai = G(Tt, yi, (r) => {
    var { typed: e } = r;
    return e(Tt, {
      number: Pn,
      "Complex | BigNumber | Fraction": (n) => n.neg(),
      bigint: (n) => -n,
      Unit: e.referToSelf((n) => (u) => {
        var t = u.clone();
        return t.value = e.find(n, t.valueType())(u.value), t;
      }),
      "Array | Matrix": e.referToSelf((n) => (u) => _r(u, n))
    });
  }), zt = "abs", Fi = [
    "typed"
  ], Ei = G(zt, Fi, (r) => {
    var { typed: e } = r;
    return e(zt, {
      number: $n,
      "Complex | BigNumber | Fraction | Unit": (n) => n.abs(),
      bigint: (n) => n < 0n ? -n : n,
      "Array | Matrix": e.referToSelf((n) => (u) => _r(u, n))
    });
  }), Ot = "addScalar", wi = [
    "typed"
  ], Ci = G(Ot, wi, (r) => {
    var { typed: e } = r;
    return e(Ot, {
      "number, number": In,
      "Complex, Complex": function(u, t) {
        return u.add(t);
      },
      "BigNumber, BigNumber": function(u, t) {
        return u.plus(t);
      },
      "bigint, bigint": function(u, t) {
        return u + t;
      },
      "Fraction, Fraction": function(u, t) {
        return u.add(t);
      },
      "Unit, Unit": e.referToSelf((n) => (u, t) => {
        if (u.value === null || u.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!u.equalBase(t)) throw new Error("Units do not match");
        var a = u.clone();
        return a.value = e.find(n, [
          a.valueType(),
          t.valueType()
        ])(a.value, t.value), a.fixPrefix = false, a;
      })
    });
  }), $t = "subtractScalar", bi = [
    "typed"
  ], _i = G($t, bi, (r) => {
    var { typed: e } = r;
    return e($t, {
      "number, number": qn,
      "Complex, Complex": function(u, t) {
        return u.sub(t);
      },
      "BigNumber, BigNumber": function(u, t) {
        return u.minus(t);
      },
      "bigint, bigint": function(u, t) {
        return u - t;
      },
      "Fraction, Fraction": function(u, t) {
        return u.sub(t);
      },
      "Unit, Unit": e.referToSelf((n) => (u, t) => {
        if (u.value === null || u.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!u.equalBase(t)) throw new Error("Units do not match");
        var a = u.clone();
        return a.value = e.find(n, [
          a.valueType(),
          t.valueType()
        ])(a.value, t.value), a.fixPrefix = false, a;
      })
    });
  }), Bi = "matAlgo11xS0s", xi = [
    "typed",
    "equalScalar"
  ], Vn = G(Bi, xi, (r) => {
    var { typed: e, equalScalar: n } = r;
    return function(t, a, l, D) {
      var f = t._values, c = t._index, i = t._ptr, s = t._size, d = t._datatype;
      if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = s[0], p = s[1], o, h = n, g = 0, w = l;
      typeof d == "string" && (o = d, h = e.find(n, [
        o,
        o
      ]), g = e.convert(0, o), a = e.convert(a, o), w = e.find(l, [
        o,
        o
      ]));
      for (var m = [], C = [], F = [], A = 0; A < p; A++) {
        F[A] = C.length;
        for (var b = i[A], E = i[A + 1], y = b; y < E; y++) {
          var B = c[y], _ = D ? w(a, f[y]) : w(f[y], a);
          h(_, g) || (C.push(B), m.push(_));
        }
      }
      return F[p] = C.length, t.createSparseMatrix({
        values: m,
        index: C,
        ptr: F,
        size: [
          v,
          p
        ],
        datatype: o
      });
    };
  }), Si = "matAlgo12xSfs", Mi = [
    "typed",
    "DenseMatrix"
  ], Xr = G(Si, Mi, (r) => {
    var { typed: e, DenseMatrix: n } = r;
    return function(t, a, l, D) {
      var f = t._values, c = t._index, i = t._ptr, s = t._size, d = t._datatype;
      if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = s[0], p = s[1], o, h = l;
      typeof d == "string" && (o = d, a = e.convert(a, o), h = e.find(l, [
        o,
        o
      ]));
      for (var g = [], w = [], m = [], C = 0; C < p; C++) {
        for (var F = C + 1, A = i[C], b = i[C + 1], E = A; E < b; E++) {
          var y = c[E];
          w[y] = f[E], m[y] = F;
        }
        for (var B = 0; B < v; B++) C === 0 && (g[B] = []), m[B] === F ? g[B][C] = D ? h(a, w[B]) : h(w[B], a) : g[B][C] = D ? h(a, 0) : h(0, a);
      }
      return new n({
        data: g,
        size: [
          v,
          p
        ],
        datatype: o
      });
    };
  }), Ni = "matAlgo14xDs", Ti = [
    "typed"
  ], et = G(Ni, Ti, (r) => {
    var { typed: e } = r;
    return function(t, a, l, D) {
      var f = t._data, c = t._size, i = t._datatype, s, d = l;
      typeof i == "string" && (s = i, a = e.convert(a, s), d = e.find(l, [
        s,
        s
      ]));
      var v = c.length > 0 ? n(d, 0, c, c[0], f, a, D) : [];
      return t.createDenseMatrix({
        data: v,
        size: tr(c),
        datatype: s
      });
    };
    function n(u, t, a, l, D, f, c) {
      var i = [];
      if (t === a.length - 1) for (var s = 0; s < l; s++) i[s] = c ? u(f, D[s]) : u(D[s], f);
      else for (var d = 0; d < l; d++) i[d] = n(u, t + 1, a, a[t + 1], D[d], f, c);
      return i;
    }
  }), zi = "matAlgo03xDSf", Oi = [
    "typed"
  ], Yr = G(zi, Oi, (r) => {
    var { typed: e } = r;
    return function(u, t, a, l) {
      var D = u._data, f = u._size, c = u._datatype || u.getDataType(), i = t._values, s = t._index, d = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
      if (f.length !== v.length) throw new nr(f.length, v.length);
      if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
      if (!i) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var o = f[0], h = f[1], g, w = 0, m = a;
      typeof c == "string" && c === p && c !== "mixed" && (g = c, w = e.convert(0, g), m = e.find(a, [
        g,
        g
      ]));
      for (var C = [], F = 0; F < o; F++) C[F] = [];
      for (var A = [], b = [], E = 0; E < h; E++) {
        for (var y = E + 1, B = d[E], _ = d[E + 1], x = B; x < _; x++) {
          var N = s[x];
          A[N] = l ? m(i[x], D[N][E]) : m(D[N][E], i[x]), b[N] = y;
        }
        for (var S = 0; S < o; S++) b[S] === y ? C[S][E] = A[S] : C[S][E] = l ? m(w, D[S][E]) : m(D[S][E], w);
      }
      return u.createDenseMatrix({
        data: C,
        size: [
          o,
          h
        ],
        datatype: c === u._datatype && p === t._datatype ? g : void 0
      });
    };
  }), $i = "matAlgo05xSfSf", Ii = [
    "typed",
    "equalScalar"
  ], qi = G($i, Ii, (r) => {
    var { typed: e, equalScalar: n } = r;
    return function(t, a, l) {
      var D = t._values, f = t._index, c = t._ptr, i = t._size, s = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), d = a._values, v = a._index, p = a._ptr, o = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
      if (i.length !== o.length) throw new nr(i.length, o.length);
      if (i[0] !== o[0] || i[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + i + ") must match Matrix B (" + o + ")");
      var g = i[0], w = i[1], m, C = n, F = 0, A = l;
      typeof s == "string" && s === h && s !== "mixed" && (m = s, C = e.find(n, [
        m,
        m
      ]), F = e.convert(0, m), A = e.find(l, [
        m,
        m
      ]));
      var b = D && d ? [] : void 0, E = [], y = [], B = b ? [] : void 0, _ = b ? [] : void 0, x = [], N = [], S, T, M, R;
      for (T = 0; T < w; T++) {
        y[T] = E.length;
        var z = T + 1;
        for (M = c[T], R = c[T + 1]; M < R; M++) S = f[M], E.push(S), x[S] = z, B && (B[S] = D[M]);
        for (M = p[T], R = p[T + 1]; M < R; M++) S = v[M], x[S] !== z && E.push(S), N[S] = z, _ && (_[S] = d[M]);
        if (b) for (M = y[T]; M < E.length; ) {
          S = E[M];
          var $ = x[S], J = N[S];
          if ($ === z || J === z) {
            var X = $ === z ? B[S] : F, O = J === z ? _[S] : F, I = A(X, O);
            C(I, F) ? E.splice(M, 1) : (b.push(I), M++);
          }
        }
      }
      return y[w] = E.length, t.createSparseMatrix({
        values: b,
        index: E,
        ptr: y,
        size: [
          g,
          w
        ],
        datatype: s === t._datatype && h === a._datatype ? m : void 0
      });
    };
  }), Ri = "matAlgo13xDD", Pi = [
    "typed"
  ], Ui = G(Ri, Pi, (r) => {
    var { typed: e } = r;
    return function(t, a, l) {
      var D = t._data, f = t._size, c = t._datatype, i = a._data, s = a._size, d = a._datatype, v = [];
      if (f.length !== s.length) throw new nr(f.length, s.length);
      for (var p = 0; p < f.length; p++) {
        if (f[p] !== s[p]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + s + ")");
        v[p] = f[p];
      }
      var o, h = l;
      typeof c == "string" && c === d && (o = c, h = e.find(l, [
        o,
        o
      ]));
      var g = v.length > 0 ? n(h, 0, v, v[0], D, i) : [];
      return t.createDenseMatrix({
        data: g,
        size: v,
        datatype: o
      });
    };
    function n(u, t, a, l, D, f) {
      var c = [];
      if (t === a.length - 1) for (var i = 0; i < l; i++) c[i] = u(D[i], f[i]);
      else for (var s = 0; s < l; s++) c[s] = n(u, t + 1, a, a[t + 1], D[s], f[s]);
      return c;
    }
  });
  function Ar(r, e) {
    if (Rr(r.size(), e.size())) return [
      r,
      e
    ];
    var n = Tn(r.size(), e.size());
    return [
      r,
      e
    ].map((u) => Li(u, n));
  }
  function Li(r, e) {
    return Rr(r.size(), e) ? r : r.create(We(r.valueOf(), e), r.datatype());
  }
  var Vi = "matrixAlgorithmSuite", Wi = [
    "typed",
    "matrix"
  ], Vr = G(Vi, Wi, (r) => {
    var { typed: e, matrix: n } = r, u = Ui({
      typed: e
    }), t = et({
      typed: e
    });
    return function(l) {
      var D = l.elop, f = l.SD || l.DS, c;
      D ? (c = {
        "DenseMatrix, DenseMatrix": (v, p) => u(...Ar(v, p), D),
        "Array, Array": (v, p) => u(...Ar(n(v), n(p)), D).valueOf(),
        "Array, DenseMatrix": (v, p) => u(...Ar(n(v), p), D),
        "DenseMatrix, Array": (v, p) => u(...Ar(v, n(p)), D)
      }, l.SS && (c["SparseMatrix, SparseMatrix"] = (v, p) => l.SS(...Ar(v, p), D, false)), l.DS && (c["DenseMatrix, SparseMatrix"] = (v, p) => l.DS(...Ar(v, p), D, false), c["Array, SparseMatrix"] = (v, p) => l.DS(...Ar(n(v), p), D, false)), f && (c["SparseMatrix, DenseMatrix"] = (v, p) => f(...Ar(p, v), D, true), c["SparseMatrix, Array"] = (v, p) => f(...Ar(n(p), v), D, true))) : (c = {
        "DenseMatrix, DenseMatrix": e.referToSelf((v) => (p, o) => u(...Ar(p, o), v)),
        "Array, Array": e.referToSelf((v) => (p, o) => u(...Ar(n(p), n(o)), v).valueOf()),
        "Array, DenseMatrix": e.referToSelf((v) => (p, o) => u(...Ar(n(p), o), v)),
        "DenseMatrix, Array": e.referToSelf((v) => (p, o) => u(...Ar(p, n(o)), v))
      }, l.SS && (c["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, o) => l.SS(...Ar(p, o), v, false))), l.DS && (c["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, o) => l.DS(...Ar(p, o), v, false)), c["Array, SparseMatrix"] = e.referToSelf((v) => (p, o) => l.DS(...Ar(n(p), o), v, false))), f && (c["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (p, o) => f(...Ar(o, p), v, true)), c["SparseMatrix, Array"] = e.referToSelf((v) => (p, o) => f(...Ar(n(o), p), v, true))));
      var i = l.scalar || "any", s = l.Ds || l.Ss;
      s && (D ? (c["DenseMatrix," + i] = (v, p) => t(v, p, D, false), c[i + ", DenseMatrix"] = (v, p) => t(p, v, D, true), c["Array," + i] = (v, p) => t(n(v), p, D, false).valueOf(), c[i + ", Array"] = (v, p) => t(n(p), v, D, true).valueOf()) : (c["DenseMatrix," + i] = e.referToSelf((v) => (p, o) => t(p, o, v, false)), c[i + ", DenseMatrix"] = e.referToSelf((v) => (p, o) => t(o, p, v, true)), c["Array," + i] = e.referToSelf((v) => (p, o) => t(n(p), o, v, false).valueOf()), c[i + ", Array"] = e.referToSelf((v) => (p, o) => t(n(o), p, v, true).valueOf())));
      var d = l.sS !== void 0 ? l.sS : l.Ss;
      return D ? (l.Ss && (c["SparseMatrix," + i] = (v, p) => l.Ss(v, p, D, false)), d && (c[i + ", SparseMatrix"] = (v, p) => d(p, v, D, true))) : (l.Ss && (c["SparseMatrix," + i] = e.referToSelf((v) => (p, o) => l.Ss(p, o, v, false))), d && (c[i + ", SparseMatrix"] = e.referToSelf((v) => (p, o) => d(o, p, v, true)))), D && D.signatures && An(c, D.signatures), c;
    };
  }), Gi = "matAlgo01xDSid", Zi = [
    "typed"
  ], Wn = G(Gi, Zi, (r) => {
    var { typed: e } = r;
    return function(u, t, a, l) {
      var D = u._data, f = u._size, c = u._datatype || u.getDataType(), i = t._values, s = t._index, d = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
      if (f.length !== v.length) throw new nr(f.length, v.length);
      if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
      if (!i) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var o = f[0], h = f[1], g = typeof c == "string" && c !== "mixed" && c === p ? c : void 0, w = g ? e.find(a, [
        g,
        g
      ]) : a, m, C, F = [];
      for (m = 0; m < o; m++) F[m] = [];
      var A = [], b = [];
      for (C = 0; C < h; C++) {
        for (var E = C + 1, y = d[C], B = d[C + 1], _ = y; _ < B; _++) m = s[_], A[m] = l ? w(i[_], D[m][C]) : w(D[m][C], i[_]), b[m] = E;
        for (m = 0; m < o; m++) b[m] === E ? F[m][C] = A[m] : F[m][C] = D[m][C];
      }
      return u.createDenseMatrix({
        data: F,
        size: [
          o,
          h
        ],
        datatype: c === u._datatype && p === t._datatype ? g : void 0
      });
    };
  }), Ji = "matAlgo04xSidSid", Qi = [
    "typed",
    "equalScalar"
  ], Xi = G(Ji, Qi, (r) => {
    var { typed: e, equalScalar: n } = r;
    return function(t, a, l) {
      var D = t._values, f = t._index, c = t._ptr, i = t._size, s = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), d = a._values, v = a._index, p = a._ptr, o = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
      if (i.length !== o.length) throw new nr(i.length, o.length);
      if (i[0] !== o[0] || i[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + i + ") must match Matrix B (" + o + ")");
      var g = i[0], w = i[1], m, C = n, F = 0, A = l;
      typeof s == "string" && s === h && s !== "mixed" && (m = s, C = e.find(n, [
        m,
        m
      ]), F = e.convert(0, m), A = e.find(l, [
        m,
        m
      ]));
      var b = D && d ? [] : void 0, E = [], y = [], B = D && d ? [] : void 0, _ = D && d ? [] : void 0, x = [], N = [], S, T, M, R, z;
      for (T = 0; T < w; T++) {
        y[T] = E.length;
        var $ = T + 1;
        for (R = c[T], z = c[T + 1], M = R; M < z; M++) S = f[M], E.push(S), x[S] = $, B && (B[S] = D[M]);
        for (R = p[T], z = p[T + 1], M = R; M < z; M++) if (S = v[M], x[S] === $) {
          if (B) {
            var J = A(B[S], d[M]);
            C(J, F) ? x[S] = null : B[S] = J;
          }
        } else E.push(S), N[S] = $, _ && (_[S] = d[M]);
        if (B && _) for (M = y[T]; M < E.length; ) S = E[M], x[S] === $ ? (b[M] = B[S], M++) : N[S] === $ ? (b[M] = _[S], M++) : E.splice(M, 1);
      }
      return y[w] = E.length, t.createSparseMatrix({
        values: b,
        index: E,
        ptr: y,
        size: [
          g,
          w
        ],
        datatype: s === t._datatype && h === a._datatype ? m : void 0
      });
    };
  }), Yi = "matAlgo10xSids", Ki = [
    "typed",
    "DenseMatrix"
  ], Gn = G(Yi, Ki, (r) => {
    var { typed: e, DenseMatrix: n } = r;
    return function(t, a, l, D) {
      var f = t._values, c = t._index, i = t._ptr, s = t._size, d = t._datatype;
      if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = s[0], p = s[1], o, h = l;
      typeof d == "string" && (o = d, a = e.convert(a, o), h = e.find(l, [
        o,
        o
      ]));
      for (var g = [], w = [], m = [], C = 0; C < p; C++) {
        for (var F = C + 1, A = i[C], b = i[C + 1], E = A; E < b; E++) {
          var y = c[E];
          w[y] = f[E], m[y] = F;
        }
        for (var B = 0; B < v; B++) C === 0 && (g[B] = []), m[B] === F ? g[B][C] = D ? h(a, w[B]) : h(w[B], a) : g[B][C] = a;
      }
      return new n({
        data: g,
        size: [
          v,
          p
        ],
        datatype: o
      });
    };
  }), Hi = "multiplyScalar", ki = [
    "typed"
  ], ji = G(Hi, ki, (r) => {
    var { typed: e } = r;
    return e("multiplyScalar", {
      "number, number": Rn,
      "Complex, Complex": function(u, t) {
        return u.mul(t);
      },
      "BigNumber, BigNumber": function(u, t) {
        return u.times(t);
      },
      "bigint, bigint": function(u, t) {
        return u * t;
      },
      "Fraction, Fraction": function(u, t) {
        return u.mul(t);
      },
      "number | Fraction | BigNumber | Complex, Unit": (n, u) => u.multiply(n),
      "Unit, number | Fraction | BigNumber | Complex | Unit": (n, u) => n.multiply(u)
    });
  }), It = "multiply", ro = [
    "typed",
    "matrix",
    "addScalar",
    "multiplyScalar",
    "equalScalar",
    "dot"
  ], eo = G(It, ro, (r) => {
    var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: l } = r, D = Vn({
      typed: e,
      equalScalar: a
    }), f = et({
      typed: e
    });
    function c(F, A) {
      switch (F.length) {
        case 1:
          switch (A.length) {
            case 1:
              if (F[0] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
              break;
            case 2:
              if (F[0] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + F[0] + ") must match Matrix rows (" + A[0] + ")");
              break;
            default:
              throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + A.length + " dimensions)");
          }
          break;
        case 2:
          switch (A.length) {
            case 1:
              if (F[1] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + F[1] + ") must match Vector length (" + A[0] + ")");
              break;
            case 2:
              if (F[1] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + F[1] + ") must match Matrix B rows (" + A[0] + ")");
              break;
            default:
              throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + A.length + " dimensions)");
          }
          break;
        default:
          throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + F.length + " dimensions)");
      }
    }
    function i(F, A, b) {
      if (b === 0) throw new Error("Cannot multiply two empty vectors");
      return l(F, A);
    }
    function s(F, A) {
      if (A.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
      return d(F, A);
    }
    function d(F, A) {
      var b = F._data, E = F._size, y = F._datatype || F.getDataType(), B = A._data, _ = A._size, x = A._datatype || A.getDataType(), N = E[0], S = _[1], T, M = u, R = t;
      y && x && y === x && typeof y == "string" && y !== "mixed" && (T = y, M = e.find(u, [
        T,
        T
      ]), R = e.find(t, [
        T,
        T
      ]));
      for (var z = [], $ = 0; $ < S; $++) {
        for (var J = R(b[0], B[0][$]), X = 1; X < N; X++) J = M(J, R(b[X], B[X][$]));
        z[$] = J;
      }
      return F.createDenseMatrix({
        data: z,
        size: [
          S
        ],
        datatype: y === F._datatype && x === A._datatype ? T : void 0
      });
    }
    var v = e("_multiplyMatrixVector", {
      "DenseMatrix, any": o,
      "SparseMatrix, any": w
    }), p = e("_multiplyMatrixMatrix", {
      "DenseMatrix, DenseMatrix": h,
      "DenseMatrix, SparseMatrix": g,
      "SparseMatrix, DenseMatrix": m,
      "SparseMatrix, SparseMatrix": C
    });
    function o(F, A) {
      var b = F._data, E = F._size, y = F._datatype || F.getDataType(), B = A._data, _ = A._datatype || A.getDataType(), x = E[0], N = E[1], S, T = u, M = t;
      y && _ && y === _ && typeof y == "string" && y !== "mixed" && (S = y, T = e.find(u, [
        S,
        S
      ]), M = e.find(t, [
        S,
        S
      ]));
      for (var R = [], z = 0; z < x; z++) {
        for (var $ = b[z], J = M($[0], B[0]), X = 1; X < N; X++) J = T(J, M($[X], B[X]));
        R[z] = J;
      }
      return F.createDenseMatrix({
        data: R,
        size: [
          x
        ],
        datatype: y === F._datatype && _ === A._datatype ? S : void 0
      });
    }
    function h(F, A) {
      var b = F._data, E = F._size, y = F._datatype || F.getDataType(), B = A._data, _ = A._size, x = A._datatype || A.getDataType(), N = E[0], S = E[1], T = _[1], M, R = u, z = t;
      y && x && y === x && typeof y == "string" && y !== "mixed" && y !== "mixed" && (M = y, R = e.find(u, [
        M,
        M
      ]), z = e.find(t, [
        M,
        M
      ]));
      for (var $ = [], J = 0; J < N; J++) {
        var X = b[J];
        $[J] = [];
        for (var O = 0; O < T; O++) {
          for (var I = z(X[0], B[0][O]), Z = 1; Z < S; Z++) I = R(I, z(X[Z], B[Z][O]));
          $[J][O] = I;
        }
      }
      return F.createDenseMatrix({
        data: $,
        size: [
          N,
          T
        ],
        datatype: y === F._datatype && x === A._datatype ? M : void 0
      });
    }
    function g(F, A) {
      var b = F._data, E = F._size, y = F._datatype || F.getDataType(), B = A._values, _ = A._index, x = A._ptr, N = A._size, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
      if (!B) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
      var T = E[0], M = N[1], R, z = u, $ = t, J = a, X = 0;
      y && S && y === S && typeof y == "string" && y !== "mixed" && (R = y, z = e.find(u, [
        R,
        R
      ]), $ = e.find(t, [
        R,
        R
      ]), J = e.find(a, [
        R,
        R
      ]), X = e.convert(0, R));
      for (var O = [], I = [], Z = [], Q = A.createSparseMatrix({
        values: O,
        index: I,
        ptr: Z,
        size: [
          T,
          M
        ],
        datatype: y === F._datatype && S === A._datatype ? R : void 0
      }), V = 0; V < M; V++) {
        Z[V] = I.length;
        var q = x[V], W = x[V + 1];
        if (W > q) for (var U = 0, P = 0; P < T; P++) {
          for (var Y = P + 1, L = void 0, k = q; k < W; k++) {
            var j = _[k];
            U !== Y ? (L = $(b[P][j], B[k]), U = Y) : L = z(L, $(b[P][j], B[k]));
          }
          U === Y && !J(L, X) && (I.push(P), O.push(L));
        }
      }
      return Z[M] = I.length, Q;
    }
    function w(F, A) {
      var b = F._values, E = F._index, y = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
      if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var _ = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], T = [], M = [], R = [], z, $ = u, J = t, X = a, O = 0;
      B && x && B === x && typeof B == "string" && B !== "mixed" && (z = B, $ = e.find(u, [
        z,
        z
      ]), J = e.find(t, [
        z,
        z
      ]), X = e.find(a, [
        z,
        z
      ]), O = e.convert(0, z));
      var I = [], Z = [];
      R[0] = 0;
      for (var Q = 0; Q < S; Q++) {
        var V = _[Q];
        if (!X(V, O)) for (var q = y[Q], W = y[Q + 1], U = q; U < W; U++) {
          var P = E[U];
          Z[P] ? I[P] = $(I[P], J(V, b[U])) : (Z[P] = true, M.push(P), I[P] = J(V, b[U]));
        }
      }
      for (var Y = M.length, L = 0; L < Y; L++) {
        var k = M[L];
        T[L] = I[k];
      }
      return R[1] = M.length, F.createSparseMatrix({
        values: T,
        index: M,
        ptr: R,
        size: [
          N,
          1
        ],
        datatype: B === F._datatype && x === A._datatype ? z : void 0
      });
    }
    function m(F, A) {
      var b = F._values, E = F._index, y = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
      if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var _ = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], T = A._size[1], M, R = u, z = t, $ = a, J = 0;
      B && x && B === x && typeof B == "string" && B !== "mixed" && (M = B, R = e.find(u, [
        M,
        M
      ]), z = e.find(t, [
        M,
        M
      ]), $ = e.find(a, [
        M,
        M
      ]), J = e.convert(0, M));
      for (var X = [], O = [], I = [], Z = F.createSparseMatrix({
        values: X,
        index: O,
        ptr: I,
        size: [
          N,
          T
        ],
        datatype: B === F._datatype && x === A._datatype ? M : void 0
      }), Q = [], V = [], q = 0; q < T; q++) {
        I[q] = O.length;
        for (var W = q + 1, U = 0; U < S; U++) {
          var P = _[U][q];
          if (!$(P, J)) for (var Y = y[U], L = y[U + 1], k = Y; k < L; k++) {
            var j = E[k];
            V[j] !== W ? (V[j] = W, O.push(j), Q[j] = z(P, b[k])) : Q[j] = R(Q[j], z(P, b[k]));
          }
        }
        for (var rr = I[q], er = O.length, ur = rr; ur < er; ur++) {
          var ar = O[ur];
          X[ur] = Q[ar];
        }
      }
      return I[T] = O.length, Z;
    }
    function C(F, A) {
      var b = F._values, E = F._index, y = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), _ = A._values, x = A._index, N = A._ptr, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), T = F._size[0], M = A._size[1], R = b && _, z, $ = u, J = t;
      B && S && B === S && typeof B == "string" && B !== "mixed" && (z = B, $ = e.find(u, [
        z,
        z
      ]), J = e.find(t, [
        z,
        z
      ]));
      for (var X = R ? [] : void 0, O = [], I = [], Z = F.createSparseMatrix({
        values: X,
        index: O,
        ptr: I,
        size: [
          T,
          M
        ],
        datatype: B === F._datatype && S === A._datatype ? z : void 0
      }), Q = R ? [] : void 0, V = [], q, W, U, P, Y, L, k, j, rr = 0; rr < M; rr++) {
        I[rr] = O.length;
        var er = rr + 1;
        for (Y = N[rr], L = N[rr + 1], P = Y; P < L; P++) if (j = x[P], R) for (W = y[j], U = y[j + 1], q = W; q < U; q++) k = E[q], V[k] !== er ? (V[k] = er, O.push(k), Q[k] = J(_[P], b[q])) : Q[k] = $(Q[k], J(_[P], b[q]));
        else for (W = y[j], U = y[j + 1], q = W; q < U; q++) k = E[q], V[k] !== er && (V[k] = er, O.push(k));
        if (R) for (var ur = I[rr], ar = O.length, dr = ur; dr < ar; dr++) {
          var sr = O[dr];
          X[dr] = Q[sr];
        }
      }
      return I[M] = O.length, Z;
    }
    return e(It, t, {
      "Array, Array": e.referTo("Matrix, Matrix", (F) => (A, b) => {
        c(ir(A), ir(b));
        var E = F(n(A), n(b));
        return vr(E) ? E.valueOf() : E;
      }),
      "Matrix, Matrix": function(A, b) {
        var E = A.size(), y = b.size();
        return c(E, y), E.length === 1 ? y.length === 1 ? i(A, b, E[0]) : s(A, b) : y.length === 1 ? v(A, b) : p(A, b);
      },
      "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (A, b) => F(A, n(b))),
      "Array, Matrix": e.referToSelf((F) => (A, b) => F(n(A, b.storage()), b)),
      "SparseMatrix, any": function(A, b) {
        return D(A, b, t, false);
      },
      "DenseMatrix, any": function(A, b) {
        return f(A, b, t, false);
      },
      "any, SparseMatrix": function(A, b) {
        return D(b, A, t, true);
      },
      "any, DenseMatrix": function(A, b) {
        return f(b, A, t, true);
      },
      "Array, any": function(A, b) {
        return f(n(A), b, t, false).valueOf();
      },
      "any, Array": function(A, b) {
        return f(n(b), A, t, true).valueOf();
      },
      "any, any": t,
      "any, any, ...any": e.referToSelf((F) => (A, b, E) => {
        for (var y = F(A, b), B = 0; B < E.length; B++) y = F(y, E[B]);
        return y;
      })
    });
  }), qt = "sign", to = [
    "typed",
    "BigNumber",
    "Fraction",
    "complex"
  ], no = G(qt, to, (r) => {
    var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
    return e(qt, {
      number: Ge,
      Complex: function(l) {
        return l.im === 0 ? u(Ge(l.re)) : l.sign();
      },
      BigNumber: function(l) {
        return new n(l.cmp(0));
      },
      bigint: function(l) {
        return l > 0n ? 1n : l < 0n ? -1n : 0n;
      },
      Fraction: function(l) {
        return new t(l.s, 1);
      },
      "Array | Matrix": e.referToSelf((a) => (l) => _r(l, a)),
      Unit: e.referToSelf((a) => (l) => {
        if (!l._isDerived() && l.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
        return e.find(a, l.valueType())(l.value);
      })
    });
  }), uo = "sqrt", ao = [
    "config",
    "typed",
    "Complex"
  ], io = G(uo, ao, (r) => {
    var { config: e, typed: n, Complex: u } = r;
    return n("sqrt", {
      number: t,
      Complex: function(l) {
        return l.sqrt();
      },
      BigNumber: function(l) {
        return !l.isNegative() || e.predictable ? l.sqrt() : t(l.toNumber());
      },
      Unit: function(l) {
        return l.pow(0.5);
      }
    });
    function t(a) {
      return isNaN(a) ? NaN : a >= 0 || e.predictable ? Math.sqrt(a) : new u(a, 0).sqrt();
    }
  }), Rt = "subtract", oo = [
    "typed",
    "matrix",
    "equalScalar",
    "subtractScalar",
    "unaryMinus",
    "DenseMatrix",
    "concat"
  ], so = G(Rt, oo, (r) => {
    var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: l, concat: D } = r, f = Wn({
      typed: e
    }), c = Yr({
      typed: e
    }), i = qi({
      typed: e,
      equalScalar: u
    }), s = Gn({
      typed: e,
      DenseMatrix: l
    }), d = Xr({
      typed: e,
      DenseMatrix: l
    }), v = Vr({
      typed: e,
      matrix: n,
      concat: D
    });
    return e(Rt, {
      "any, any": t
    }, v({
      elop: t,
      SS: i,
      DS: f,
      SD: c,
      Ss: d,
      sS: s
    }));
  }), fo = "matAlgo07xSSf", lo = [
    "typed",
    "DenseMatrix"
  ], ee = G(fo, lo, (r) => {
    var { typed: e, DenseMatrix: n } = r;
    return function(a, l, D) {
      var f = a._size, c = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), i = l._size, s = l._datatype || l._data === void 0 ? l._datatype : l.getDataType();
      if (f.length !== i.length) throw new nr(f.length, i.length);
      if (f[0] !== i[0] || f[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + i + ")");
      var d = f[0], v = f[1], p, o = 0, h = D;
      typeof c == "string" && c === s && c !== "mixed" && (p = c, o = e.convert(0, p), h = e.find(D, [
        p,
        p
      ]));
      var g, w, m = [];
      for (g = 0; g < d; g++) m[g] = [];
      var C = [], F = [], A = [], b = [];
      for (w = 0; w < v; w++) {
        var E = w + 1;
        for (u(a, w, A, C, E), u(l, w, b, F, E), g = 0; g < d; g++) {
          var y = A[g] === E ? C[g] : o, B = b[g] === E ? F[g] : o;
          m[g][w] = h(y, B);
        }
      }
      return new n({
        data: m,
        size: [
          d,
          v
        ],
        datatype: c === a._datatype && s === l._datatype ? p : void 0
      });
    };
    function u(t, a, l, D, f) {
      for (var c = t._values, i = t._index, s = t._ptr, d = s[a], v = s[a + 1]; d < v; d++) {
        var p = i[d];
        l[p] = f, D[p] = c[d];
      }
    }
  }), Pt = "conj", co = [
    "typed"
  ], vo = G(Pt, co, (r) => {
    var { typed: e } = r;
    return e(Pt, {
      "number | BigNumber | Fraction": (n) => n,
      Complex: (n) => n.conjugate(),
      "Array | Matrix": e.referToSelf((n) => (u) => _r(u, n))
    });
  }), Ut = "im", Do = [
    "typed"
  ], po = G(Ut, Do, (r) => {
    var { typed: e } = r;
    return e(Ut, {
      number: () => 0,
      "BigNumber | Fraction": (n) => n.mul(0),
      Complex: (n) => n.im,
      "Array | Matrix": e.referToSelf((n) => (u) => _r(u, n))
    });
  }), Lt = "re", ho = [
    "typed"
  ], mo = G(Lt, ho, (r) => {
    var { typed: e } = r;
    return e(Lt, {
      "number | BigNumber | Fraction": (n) => n,
      Complex: (n) => n.re,
      "Array | Matrix": e.referToSelf((n) => (u) => _r(u, n))
    });
  }), Vt = "concat", go = [
    "typed",
    "matrix",
    "isInteger"
  ], yo = G(Vt, go, (r) => {
    var { typed: e, matrix: n, isInteger: u } = r;
    return e(Vt, {
      "...Array | Matrix | number | BigNumber": function(a) {
        var l, D = a.length, f = -1, c, i = false, s = [];
        for (l = 0; l < D; l++) {
          var d = a[l];
          if (vr(d) && (i = true), fr(d) || gr(d)) {
            if (l !== D - 1) throw new Error("Dimension must be specified as last argument");
            if (c = f, f = d.valueOf(), !u(f)) throw new TypeError("Integer number expected for dimension");
            if (f < 0 || l > 0 && f > c) throw new Lr(f, c + 1);
          } else {
            var v = tr(d).valueOf(), p = ir(v);
            if (s[l] = v, c = f, f = p.length - 1, l > 0 && f !== c) throw new nr(c + 1, f + 1);
          }
        }
        if (s.length === 0) throw new SyntaxError("At least one matrix expected");
        for (var o = s.shift(); s.length; ) o = Nn(o, s.shift(), f);
        return i ? n(o) : o;
      },
      "...string": function(a) {
        return a.join("");
      }
    });
  }), Wt = "column", Ao = [
    "typed",
    "Index",
    "matrix",
    "range"
  ], Fo = G(Wt, Ao, (r) => {
    var { typed: e, Index: n, matrix: u, range: t } = r;
    return e(Wt, {
      "Matrix, number": a,
      "Array, number": function(D, f) {
        return a(u(tr(D)), f).valueOf();
      }
    });
    function a(l, D) {
      if (l.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
      mr(D, l.size()[1]);
      var f = t(0, l.size()[0]), c = new n(f, D), i = l.subset(c);
      return vr(i) ? i : u([
        [
          i
        ]
      ]);
    }
  }), Gt = "cross", Eo = [
    "typed",
    "matrix",
    "subtract",
    "multiply"
  ], wo = G(Gt, Eo, (r) => {
    var { typed: e, matrix: n, subtract: u, multiply: t } = r;
    return e(Gt, {
      "Matrix, Matrix": function(D, f) {
        return n(a(D.toArray(), f.toArray()));
      },
      "Matrix, Array": function(D, f) {
        return n(a(D.toArray(), f));
      },
      "Array, Matrix": function(D, f) {
        return n(a(D, f.toArray()));
      },
      "Array, Array": a
    });
    function a(l, D) {
      var f = Math.max(ir(l).length, ir(D).length);
      l = bt(l), D = bt(D);
      var c = ir(l), i = ir(D);
      if (c.length !== 1 || i.length !== 1 || c[0] !== 3 || i[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + c.join(", ") + "], B = [" + i.join(", ") + "])");
      var s = [
        u(t(l[1], D[2]), t(l[2], D[1])),
        u(t(l[2], D[0]), t(l[0], D[2])),
        u(t(l[0], D[1]), t(l[1], D[0]))
      ];
      return f > 1 ? [
        s
      ] : s;
    }
  }), Zt = "diag", Co = [
    "typed",
    "matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], bo = G(Zt, Co, (r) => {
    var { typed: e, matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
    return e(Zt, {
      Array: function(c) {
        return a(c, 0, ir(c), null);
      },
      "Array, number": function(c, i) {
        return a(c, i, ir(c), null);
      },
      "Array, BigNumber": function(c, i) {
        return a(c, i.toNumber(), ir(c), null);
      },
      "Array, string": function(c, i) {
        return a(c, 0, ir(c), i);
      },
      "Array, number, string": function(c, i, s) {
        return a(c, i, ir(c), s);
      },
      "Array, BigNumber, string": function(c, i, s) {
        return a(c, i.toNumber(), ir(c), s);
      },
      Matrix: function(c) {
        return a(c, 0, c.size(), c.storage());
      },
      "Matrix, number": function(c, i) {
        return a(c, i, c.size(), c.storage());
      },
      "Matrix, BigNumber": function(c, i) {
        return a(c, i.toNumber(), c.size(), c.storage());
      },
      "Matrix, string": function(c, i) {
        return a(c, 0, c.size(), i);
      },
      "Matrix, number, string": function(c, i, s) {
        return a(c, i, c.size(), s);
      },
      "Matrix, BigNumber, string": function(c, i, s) {
        return a(c, i.toNumber(), c.size(), s);
      }
    });
    function a(f, c, i, s) {
      if (!cr(c)) throw new TypeError("Second parameter in function diag must be an integer");
      var d = c > 0 ? c : 0, v = c < 0 ? -c : 0;
      switch (i.length) {
        case 1:
          return l(f, c, s, i[0], v, d);
        case 2:
          return D(f, c, s, i, v, d);
      }
      throw new RangeError("Matrix for function diag must be 2 dimensional");
    }
    function l(f, c, i, s, d, v) {
      var p = [
        s + d,
        s + v
      ];
      if (i && i !== "sparse" && i !== "dense") throw new TypeError("Unknown matrix type ".concat(i, '"'));
      var o = i === "sparse" ? t.diagonal(p, f, c) : u.diagonal(p, f, c);
      return i !== null ? o : o.valueOf();
    }
    function D(f, c, i, s, d, v) {
      if (vr(f)) {
        var p = f.diagonal(c);
        return i !== null ? i !== p.storage() ? n(p, i) : p : p.valueOf();
      }
      for (var o = Math.min(s[0] - d, s[1] - v), h = [], g = 0; g < o; g++) h[g] = f[g + d][g + v];
      return i !== null ? n(h) : h;
    }
  }), Jt = "flatten", _o = [
    "typed"
  ], Bo = G(Jt, _o, (r) => {
    var { typed: e } = r;
    return e(Jt, {
      Array: function(u) {
        return Ve(u);
      },
      Matrix: function(u) {
        return u.create(Ve(u.toArray()), u.datatype());
      }
    });
  }), Qt = "getMatrixDataType", xo = [
    "typed"
  ], So = G(Qt, xo, (r) => {
    var { typed: e } = r;
    return e(Qt, {
      Array: function(u) {
        return Be(u, zr);
      },
      Matrix: function(u) {
        return u.getDataType();
      }
    });
  }), Xt = "identity", Mo = [
    "typed",
    "config",
    "matrix",
    "BigNumber",
    "DenseMatrix",
    "SparseMatrix"
  ], No = G(Xt, Mo, (r) => {
    var { typed: e, config: n, matrix: u, BigNumber: t, DenseMatrix: a, SparseMatrix: l } = r;
    return e(Xt, {
      "": function() {
        return n.matrix === "Matrix" ? u([]) : [];
      },
      string: function(i) {
        return u(i);
      },
      "number | BigNumber": function(i) {
        return f(i, i, n.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, string": function(i, s) {
        return f(i, i, s);
      },
      "number | BigNumber, number | BigNumber": function(i, s) {
        return f(i, s, n.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, number | BigNumber, string": function(i, s, d) {
        return f(i, s, d);
      },
      Array: function(i) {
        return D(i);
      },
      "Array, string": function(i, s) {
        return D(i, s);
      },
      Matrix: function(i) {
        return D(i.valueOf(), i.storage());
      },
      "Matrix, string": function(i, s) {
        return D(i.valueOf(), s);
      }
    });
    function D(c, i) {
      switch (c.length) {
        case 0:
          return i ? u(i) : [];
        case 1:
          return f(c[0], c[0], i);
        case 2:
          return f(c[0], c[1], i);
        default:
          throw new Error("Vector containing two values expected");
      }
    }
    function f(c, i, s) {
      var d = gr(c) || gr(i) ? t : null;
      if (gr(c) && (c = c.toNumber()), gr(i) && (i = i.toNumber()), !cr(c) || c < 1) throw new Error("Parameters in function identity must be positive integers");
      if (!cr(i) || i < 1) throw new Error("Parameters in function identity must be positive integers");
      var v = d ? new t(1) : 1, p = d ? new d(0) : 0, o = [
        c,
        i
      ];
      if (s) {
        if (s === "sparse") return l.diagonal(o, v, 0, p);
        if (s === "dense") return a.diagonal(o, v, 0, p);
        throw new TypeError('Unknown matrix type "'.concat(s, '"'));
      }
      for (var h = he([], o, p), g = c < i ? c : i, w = 0; w < g; w++) h[w][w] = v;
      return h;
    }
  });
  function Zn() {
    throw new Error('No "bignumber" implementation available');
  }
  function To() {
    throw new Error('No "fraction" implementation available');
  }
  function Jn() {
    throw new Error('No "matrix" implementation available');
  }
  var Yt = "range", zo = [
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
  ], Oo = G(Yt, zo, (r) => {
    var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: l, larger: D, largerEq: f, add: c, isPositive: i } = r;
    return e(Yt, {
      string: d,
      "string, boolean": d,
      "number, number": function(h, g) {
        return s(v(h, g, 1, false));
      },
      "number, number, number": function(h, g, w) {
        return s(v(h, g, w, false));
      },
      "number, number, boolean": function(h, g, w) {
        return s(v(h, g, 1, w));
      },
      "number, number, number, boolean": function(h, g, w, m) {
        return s(v(h, g, w, m));
      },
      "BigNumber, BigNumber": function(h, g) {
        var w = h.constructor;
        return s(v(h, g, new w(1), false));
      },
      "BigNumber, BigNumber, BigNumber": function(h, g, w) {
        return s(v(h, g, w, false));
      },
      "BigNumber, BigNumber, boolean": function(h, g, w) {
        var m = h.constructor;
        return s(v(h, g, new m(1), w));
      },
      "BigNumber, BigNumber, BigNumber, boolean": function(h, g, w, m) {
        return s(v(h, g, w, m));
      },
      "Unit, Unit, Unit": function(h, g, w) {
        return s(v(h, g, w, false));
      },
      "Unit, Unit, Unit, boolean": function(h, g, w, m) {
        return s(v(h, g, w, m));
      }
    });
    function s(o) {
      return n.matrix === "Matrix" ? u ? u(o) : Jn() : o;
    }
    function d(o, h) {
      var g = p(o);
      if (!g) throw new SyntaxError('String "' + o + '" is no valid range');
      return n.number === "BigNumber" ? (t === void 0 && Zn(), s(v(t(g.start), t(g.end), t(g.step)))) : s(v(g.start, g.end, g.step, h));
    }
    function v(o, h, g, w) {
      for (var m = [], C = i(g) ? w ? l : a : w ? f : D, F = o; C(F, h); ) m.push(F), F = c(F, g);
      return m;
    }
    function p(o) {
      var h = o.split(":"), g = h.map(function(m) {
        return Number(m);
      }), w = g.some(function(m) {
        return isNaN(m);
      });
      if (w) return null;
      switch (g.length) {
        case 2:
          return {
            start: g[0],
            end: g[1],
            step: 1
          };
        case 3:
          return {
            start: g[0],
            end: g[2],
            step: g[1]
          };
        default:
          return null;
      }
    }
  }), Kt = "reshape", $o = [
    "typed",
    "isInteger",
    "matrix"
  ], Io = G(Kt, $o, (r) => {
    var { typed: e, isInteger: n } = r;
    return e(Kt, {
      "Matrix, Array": function(t, a) {
        return t.reshape(a, true);
      },
      "Array, Array": function(t, a) {
        return a.forEach(function(l) {
          if (!n(l)) throw new TypeError("Invalid size for dimension: " + l);
        }), ke(t, a);
      }
    });
  }), Ht = "size", qo = [
    "typed",
    "config",
    "?matrix"
  ], Ro = G(Ht, qo, (r) => {
    var { typed: e, config: n, matrix: u } = r;
    return e(Ht, {
      Matrix: function(a) {
        return a.create(a.size(), "number");
      },
      Array: ir,
      string: function(a) {
        return n.matrix === "Array" ? [
          a.length
        ] : u([
          a.length
        ], "dense", "number");
      },
      "number | Complex | BigNumber | Unit | boolean | null": function(a) {
        return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : Jn();
      }
    });
  }), kt = "transpose", Po = [
    "typed",
    "matrix"
  ], Uo = G(kt, Po, (r) => {
    var { typed: e, matrix: n } = r;
    return e(kt, {
      Array: (l) => u(n(l)).valueOf(),
      Matrix: u,
      any: tr
    });
    function u(l) {
      var D = l.size(), f;
      switch (D.length) {
        case 1:
          f = l.clone();
          break;
        case 2:
          {
            var c = D[0], i = D[1];
            if (i === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + pr(D) + ")");
            switch (l.storage()) {
              case "dense":
                f = t(l, c, i);
                break;
              case "sparse":
                f = a(l, c, i);
                break;
            }
          }
          break;
        default:
          throw new RangeError("Matrix must be a vector or two dimensional (size: " + pr(D) + ")");
      }
      return f;
    }
    function t(l, D, f) {
      for (var c = l._data, i = [], s, d = 0; d < f; d++) {
        s = i[d] = [];
        for (var v = 0; v < D; v++) s[v] = tr(c[v][d]);
      }
      return l.createDenseMatrix({
        data: i,
        size: [
          f,
          D
        ],
        datatype: l._datatype
      });
    }
    function a(l, D, f) {
      for (var c = l._values, i = l._index, s = l._ptr, d = c ? [] : void 0, v = [], p = [], o = [], h = 0; h < D; h++) o[h] = 0;
      var g, w, m;
      for (g = 0, w = i.length; g < w; g++) o[i[g]]++;
      for (var C = 0, F = 0; F < D; F++) p.push(C), C += o[F], o[F] = p[F];
      for (p.push(C), m = 0; m < f; m++) for (var A = s[m], b = s[m + 1], E = A; E < b; E++) {
        var y = o[i[E]]++;
        v[y] = m, c && (d[y] = tr(c[E]));
      }
      return l.createSparseMatrix({
        values: d,
        index: v,
        ptr: p,
        size: [
          f,
          D
        ],
        datatype: l._datatype
      });
    }
  }), jt = "ctranspose", Lo = [
    "typed",
    "transpose",
    "conj"
  ], Vo = G(jt, Lo, (r) => {
    var { typed: e, transpose: n, conj: u } = r;
    return e(jt, {
      any: function(a) {
        return u(n(a));
      }
    });
  }), rn = "zeros", Wo = [
    "typed",
    "config",
    "matrix",
    "BigNumber"
  ], Go = G(rn, Wo, (r) => {
    var { typed: e, config: n, matrix: u, BigNumber: t } = r;
    return e(rn, {
      "": function() {
        return n.matrix === "Array" ? a([]) : a([], "default");
      },
      "...number | BigNumber | string": function(c) {
        var i = c[c.length - 1];
        if (typeof i == "string") {
          var s = c.pop();
          return a(c, s);
        } else return n.matrix === "Array" ? a(c) : a(c, "default");
      },
      Array: a,
      Matrix: function(c) {
        var i = c.storage();
        return a(c.valueOf(), i);
      },
      "Array | Matrix, string": function(c, i) {
        return a(c.valueOf(), i);
      }
    });
    function a(f, c) {
      var i = l(f), s = i ? new t(0) : 0;
      if (D(f), c) {
        var d = u(c);
        return f.length > 0 ? d.resize(f, s) : d;
      } else {
        var v = [];
        return f.length > 0 ? he(v, f, s) : v;
      }
    }
    function l(f) {
      var c = false;
      return f.forEach(function(i, s, d) {
        gr(i) && (c = true, d[s] = i.toNumber());
      }), c;
    }
    function D(f) {
      f.forEach(function(c) {
        if (typeof c != "number" || !cr(c) || c < 0) throw new Error("Parameters in function zeros must be positive integers");
      });
    }
  }), Zo = "numeric", Jo = [
    "number",
    "?bignumber",
    "?fraction"
  ], Qo = G(Zo, Jo, (r) => {
    var { number: e, bignumber: n, fraction: u } = r, t = {
      string: true,
      number: true,
      BigNumber: true,
      Fraction: true
    }, a = {
      number: (l) => e(l),
      BigNumber: n ? (l) => n(l) : Zn,
      bigint: (l) => BigInt(l),
      Fraction: u ? (l) => u(l) : To
    };
    return function(D) {
      var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", c = arguments.length > 2 ? arguments[2] : void 0;
      if (c !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
      var i = zr(D);
      if (!(i in t)) throw new TypeError("Cannot convert " + D + ' of type "' + i + '"; valid input types are ' + Object.keys(t).join(", "));
      if (!(f in a)) throw new TypeError("Cannot convert " + D + ' to type "' + f + '"; valid output types are ' + Object.keys(a).join(", "));
      return f === i ? D : a[f](D);
    };
  }), en = "divideScalar", Xo = [
    "typed",
    "numeric"
  ], Yo = G(en, Xo, (r) => {
    var { typed: e, numeric: n } = r;
    return e(en, {
      "number, number": function(t, a) {
        return t / a;
      },
      "Complex, Complex": function(t, a) {
        return t.div(a);
      },
      "BigNumber, BigNumber": function(t, a) {
        return t.div(a);
      },
      "bigint, bigint": function(t, a) {
        return t / a;
      },
      "Fraction, Fraction": function(t, a) {
        return t.div(a);
      },
      "Unit, number | Complex | Fraction | BigNumber | Unit": (u, t) => u.divide(t),
      "number | Fraction | Complex | BigNumber, Unit": (u, t) => t.divideInto(u)
    });
  }), tn = "pow", Ko = [
    "typed",
    "config",
    "identity",
    "multiply",
    "matrix",
    "inv",
    "fraction",
    "number",
    "Complex"
  ], Ho = G(tn, Ko, (r) => {
    var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: l, number: D, fraction: f, Complex: c } = r;
    return e(tn, {
      "number, number": i,
      "Complex, Complex": function(p, o) {
        return p.pow(o);
      },
      "BigNumber, BigNumber": function(p, o) {
        return o.isInteger() || p >= 0 || n.predictable ? p.pow(o) : new c(p.toNumber(), 0).pow(o.toNumber(), 0);
      },
      "bigint, bigint": (v, p) => v ** p,
      "Fraction, Fraction": function(p, o) {
        var h = p.pow(o);
        if (h != null) return h;
        if (n.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
        return i(p.valueOf(), o.valueOf());
      },
      "Array, number": s,
      "Array, BigNumber": function(p, o) {
        return s(p, o.toNumber());
      },
      "Matrix, number": d,
      "Matrix, BigNumber": function(p, o) {
        return d(p, o.toNumber());
      },
      "Unit, number | BigNumber": function(p, o) {
        return p.pow(o);
      }
    });
    function i(v, p) {
      if (n.predictable && !cr(p) && v < 0) try {
        var o = f(p), h = D(o);
        if ((p === h || Math.abs((p - h) / p) < 1e-14) && o.d % 2 === 1) return (o.n % 2 === 0 ? 1 : -1) * Math.pow(-v, p);
      } catch {
      }
      return n.predictable && (v < -1 && p === 1 / 0 || v > -1 && v < 0 && p === -1 / 0) ? NaN : cr(p) || v >= 0 || n.predictable ? Un(v, p) : v * v < 1 && p === 1 / 0 || v * v > 1 && p === -1 / 0 ? 0 : new c(v, 0).pow(p, 0);
    }
    function s(v, p) {
      if (!cr(p)) throw new TypeError("For A^b, b must be an integer (value is " + p + ")");
      var o = ir(v);
      if (o.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + o.length + " dimensions)");
      if (o[0] !== o[1]) throw new Error("For A^b, A must be square (size is " + o[0] + "x" + o[1] + ")");
      if (p < 0) try {
        return s(l(v), -p);
      } catch (w) {
        throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + p + ")") : w;
      }
      for (var h = u(o[0]).valueOf(), g = v; p >= 1; ) (p & 1) === 1 && (h = t(g, h)), p >>= 1, g = t(g, g);
      return h;
    }
    function d(v, p) {
      return a(s(v.valueOf(), p));
    }
  });
  function Qn(r) {
    var { DenseMatrix: e } = r;
    return function(u, t, a) {
      var l = u.size();
      if (l.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + pr(l) + ")");
      var D = l[0], f = l[1];
      if (D !== f) throw new RangeError("Matrix must be square (size: " + pr(l) + ")");
      var c = [];
      if (vr(t)) {
        var i = t.size(), s = t._data;
        if (i.length === 1) {
          if (i[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var d = 0; d < D; d++) c[d] = [
            s[d]
          ];
          return new e({
            data: c,
            size: [
              D,
              1
            ],
            datatype: t._datatype
          });
        }
        if (i.length === 2) {
          if (i[0] !== D || i[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          if (mn(t)) {
            if (a) {
              c = [];
              for (var v = 0; v < D; v++) c[v] = [
                s[v][0]
              ];
              return new e({
                data: c,
                size: [
                  D,
                  1
                ],
                datatype: t._datatype
              });
            }
            return t;
          }
          if (gn(t)) {
            for (var p = 0; p < D; p++) c[p] = [
              0
            ];
            for (var o = t._values, h = t._index, g = t._ptr, w = g[1], m = g[0]; m < w; m++) {
              var C = h[m];
              c[C][0] = o[m];
            }
            return new e({
              data: c,
              size: [
                D,
                1
              ],
              datatype: t._datatype
            });
          }
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
      if (Dr(t)) {
        var F = ir(t);
        if (F.length === 1) {
          if (F[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var A = 0; A < D; A++) c[A] = [
            t[A]
          ];
          return new e({
            data: c,
            size: [
              D,
              1
            ]
          });
        }
        if (F.length === 2) {
          if (F[0] !== D || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var b = 0; b < D; b++) c[b] = [
            t[b][0]
          ];
          return new e({
            data: c,
            size: [
              D,
              1
            ]
          });
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
    };
  }
  var nn = "usolve", ko = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], jo = G(nn, ko, (r) => {
    var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: l, DenseMatrix: D } = r, f = Qn({
      DenseMatrix: D
    });
    return e(nn, {
      "SparseMatrix, Array | Matrix": function(d, v) {
        return i(d, v);
      },
      "DenseMatrix, Array | Matrix": function(d, v) {
        return c(d, v);
      },
      "Array, Array | Matrix": function(d, v) {
        var p = n(d), o = c(p, v);
        return o.valueOf();
      }
    });
    function c(s, d) {
      d = f(s, d, true);
      for (var v = d._data, p = s._size[0], o = s._size[1], h = [], g = s._data, w = o - 1; w >= 0; w--) {
        var m = v[w][0] || 0, C = void 0;
        if (l(m, 0)) C = 0;
        else {
          var F = g[w][w];
          if (l(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          C = u(m, F);
          for (var A = w - 1; A >= 0; A--) v[A] = [
            a(v[A][0] || 0, t(C, g[A][w]))
          ];
        }
        h[w] = [
          C
        ];
      }
      return new D({
        data: h,
        size: [
          p,
          1
        ]
      });
    }
    function i(s, d) {
      d = f(s, d, true);
      for (var v = d._data, p = s._size[0], o = s._size[1], h = s._values, g = s._index, w = s._ptr, m = [], C = o - 1; C >= 0; C--) {
        var F = v[C][0] || 0;
        if (l(F, 0)) m[C] = [
          0
        ];
        else {
          for (var A = 0, b = [], E = [], y = w[C], B = w[C + 1], _ = B - 1; _ >= y; _--) {
            var x = g[_];
            x === C ? A = h[_] : x < C && (b.push(h[_]), E.push(x));
          }
          if (l(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          for (var N = u(F, A), S = 0, T = E.length; S < T; S++) {
            var M = E[S];
            v[M] = [
              a(v[M][0], t(N, b[S]))
            ];
          }
          m[C] = [
            N
          ];
        }
      }
      return new D({
        data: m,
        size: [
          p,
          1
        ]
      });
    }
  }), un = "usolveAll", rs = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], es = G(un, rs, (r) => {
    var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: l, DenseMatrix: D } = r, f = Qn({
      DenseMatrix: D
    });
    return e(un, {
      "SparseMatrix, Array | Matrix": function(d, v) {
        return i(d, v);
      },
      "DenseMatrix, Array | Matrix": function(d, v) {
        return c(d, v);
      },
      "Array, Array | Matrix": function(d, v) {
        var p = n(d), o = c(p, v);
        return o.map((h) => h.valueOf());
      }
    });
    function c(s, d) {
      for (var v = [
        f(s, d, true)._data.map((E) => E[0])
      ], p = s._data, o = s._size[0], h = s._size[1], g = h - 1; g >= 0; g--) for (var w = v.length, m = 0; m < w; m++) {
        var C = v[m];
        if (l(p[g][g], 0)) if (l(C[g], 0)) {
          if (m === 0) {
            var A = [
              ...C
            ];
            A[g] = 1;
            for (var b = g - 1; b >= 0; b--) A[b] = a(A[b], p[b][g]);
            v.push(A);
          }
        } else {
          if (m === 0) return [];
          v.splice(m, 1), m -= 1, w -= 1;
        }
        else {
          C[g] = u(C[g], p[g][g]);
          for (var F = g - 1; F >= 0; F--) C[F] = a(C[F], t(C[g], p[F][g]));
        }
      }
      return v.map((E) => new D({
        data: E.map((y) => [
          y
        ]),
        size: [
          o,
          1
        ]
      }));
    }
    function i(s, d) {
      for (var v = [
        f(s, d, true)._data.map((X) => X[0])
      ], p = s._size[0], o = s._size[1], h = s._values, g = s._index, w = s._ptr, m = o - 1; m >= 0; m--) for (var C = v.length, F = 0; F < C; F++) {
        for (var A = v[F], b = [], E = [], y = w[m], B = w[m + 1], _ = 0, x = B - 1; x >= y; x--) {
          var N = g[x];
          N === m ? _ = h[x] : N < m && (b.push(h[x]), E.push(N));
        }
        if (l(_, 0)) if (l(A[m], 0)) {
          if (F === 0) {
            var R = [
              ...A
            ];
            R[m] = 1;
            for (var z = 0, $ = E.length; z < $; z++) {
              var J = E[z];
              R[J] = a(R[J], b[z]);
            }
            v.push(R);
          }
        } else {
          if (F === 0) return [];
          v.splice(F, 1), F -= 1, C -= 1;
        }
        else {
          A[m] = u(A[m], _);
          for (var S = 0, T = E.length; S < T; S++) {
            var M = E[S];
            A[M] = a(A[M], t(A[m], b[S]));
          }
        }
      }
      return v.map((X) => new D({
        data: X.map((O) => [
          O
        ]),
        size: [
          p,
          1
        ]
      }));
    }
  }), ye = "equal", ts = [
    "typed",
    "matrix",
    "equalScalar",
    "DenseMatrix",
    "concat"
  ], ns = G(ye, ts, (r) => {
    var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a } = r, l = Yr({
      typed: e
    }), D = ee({
      typed: e,
      DenseMatrix: t
    }), f = Xr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: n,
      concat: a
    });
    return e(ye, us({
      typed: e,
      equalScalar: u
    }), c({
      elop: u,
      SS: D,
      DS: l,
      Ss: f
    }));
  }), us = G(ye, [
    "typed",
    "equalScalar"
  ], (r) => {
    var { typed: e, equalScalar: n } = r;
    return e(ye, {
      "any, any": function(t, a) {
        return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
      }
    });
  }), Ae = "smaller", as = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], is = G(Ae, as, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, l = Yr({
      typed: e
    }), D = ee({
      typed: e,
      DenseMatrix: t
    }), f = Xr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = re({
      typed: e
    });
    return e(Ae, os({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, d) => s < d,
      "BigNumber, BigNumber": function(d, v) {
        return d.lt(v) && !Qr(d, v, n.relTol, n.absTol);
      },
      "bigint, bigint": (s, d) => s < d,
      "Fraction, Fraction": (s, d) => s.compare(d) === -1,
      "Complex, Complex": function(d, v) {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: D,
      DS: l,
      Ss: f
    }));
  }), os = G(Ae, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(Ae, {
      "number, number": function(t, a) {
        return t < a && !qr(t, a, n.relTol, n.absTol);
      }
    });
  }), Fe = "smallerEq", ss = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], fs = G(Fe, ss, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, l = Yr({
      typed: e
    }), D = ee({
      typed: e,
      DenseMatrix: t
    }), f = Xr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = re({
      typed: e
    });
    return e(Fe, ls({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, d) => s <= d,
      "BigNumber, BigNumber": function(d, v) {
        return d.lte(v) || Qr(d, v, n.relTol, n.absTol);
      },
      "bigint, bigint": (s, d) => s <= d,
      "Fraction, Fraction": (s, d) => s.compare(d) !== 1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: D,
      DS: l,
      Ss: f
    }));
  }), ls = G(Fe, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(Fe, {
      "number, number": function(t, a) {
        return t <= a || qr(t, a, n.relTol, n.absTol);
      }
    });
  }), Ee = "larger", cs = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], vs = G(Ee, cs, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, l = Yr({
      typed: e
    }), D = ee({
      typed: e,
      DenseMatrix: t
    }), f = Xr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = re({
      typed: e
    });
    return e(Ee, Ds({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, d) => s > d,
      "BigNumber, BigNumber": function(d, v) {
        return d.gt(v) && !Qr(d, v, n.relTol, n.absTol);
      },
      "bigint, bigint": (s, d) => s > d,
      "Fraction, Fraction": (s, d) => s.compare(d) === 1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: D,
      DS: l,
      Ss: f
    }));
  }), Ds = G(Ee, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(Ee, {
      "number, number": function(t, a) {
        return t > a && !qr(t, a, n.relTol, n.absTol);
      }
    });
  }), we = "largerEq", ps = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], ds = G(we, ps, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, l = Yr({
      typed: e
    }), D = ee({
      typed: e,
      DenseMatrix: t
    }), f = Xr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = re({
      typed: e
    });
    return e(we, hs({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, d) => s >= d,
      "BigNumber, BigNumber": function(d, v) {
        return d.gte(v) || Qr(d, v, n.relTol, n.absTol);
      },
      "bigint, bigint": function(d, v) {
        return d >= v;
      },
      "Fraction, Fraction": (s, d) => s.compare(d) !== -1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: D,
      DS: l,
      Ss: f
    }));
  }), hs = G(we, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(we, {
      "number, number": function(t, a) {
        return t >= a || qr(t, a, n.relTol, n.absTol);
      }
    });
  }), ms = "ImmutableDenseMatrix", gs = [
    "smaller",
    "DenseMatrix"
  ], ys = G(ms, gs, (r) => {
    var { smaller: e, DenseMatrix: n } = r;
    function u(t, a) {
      if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
      if (a && !Tr(a)) throw new Error("Invalid datatype: " + a);
      if (vr(t) || Dr(t)) {
        var l = new n(t, a);
        this._data = l._data, this._size = l._size, this._datatype = l._datatype, this._min = null, this._max = null;
      } else if (t && Dr(t.data) && Dr(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
      else {
        if (t) throw new TypeError("Unsupported type of data (" + zr(t) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = a, this._min = null, this._max = null;
      }
    }
    return u.prototype = new n(), u.prototype.type = "ImmutableDenseMatrix", u.prototype.isImmutableDenseMatrix = true, u.prototype.subset = function(t) {
      switch (arguments.length) {
        case 1: {
          var a = n.prototype.subset.call(this, t);
          return vr(a) ? new u({
            data: a._data,
            size: a._size,
            datatype: a._datatype
          }) : a;
        }
        case 2:
        case 3:
          throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    }, u.prototype.set = function() {
      throw new Error("Cannot invoke set on an Immutable Matrix instance");
    }, u.prototype.resize = function() {
      throw new Error("Cannot invoke resize on an Immutable Matrix instance");
    }, u.prototype.reshape = function() {
      throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
    }, u.prototype.clone = function() {
      return new u({
        data: tr(this._data),
        size: tr(this._size),
        datatype: this._datatype
      });
    }, u.prototype.toJSON = function() {
      return {
        mathjs: "ImmutableDenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, u.fromJSON = function(t) {
      return new u(t);
    }, u.prototype.swapRows = function() {
      throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
    }, u.prototype.min = function() {
      if (this._min === null) {
        var t = null;
        this.forEach(function(a) {
          (t === null || e(a, t)) && (t = a);
        }), this._min = t !== null ? t : void 0;
      }
      return this._min;
    }, u.prototype.max = function() {
      if (this._max === null) {
        var t = null;
        this.forEach(function(a) {
          (t === null || e(t, a)) && (t = a);
        }), this._max = t !== null ? t : void 0;
      }
      return this._max;
    }, u;
  }, {
    isClass: true
  }), As = "Index", Fs = [
    "ImmutableDenseMatrix",
    "getMatrixDataType"
  ], Es = G(As, Fs, (r) => {
    var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
    function u(a) {
      if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
      this._dimensions = [], this._sourceSize = [], this._isScalar = true;
      for (var l = 0, D = arguments.length; l < D; l++) {
        var f = arguments[l], c = Dr(f), i = vr(f), s = null;
        if (yn(f)) this._dimensions.push(f), this._isScalar = false;
        else if (c || i) {
          var d = void 0;
          n(f) === "boolean" ? (c && (d = t(an(f).valueOf())), i && (d = t(an(f._data).valueOf())), s = f.valueOf().length) : d = t(f.valueOf()), this._dimensions.push(d);
          var v = d.size();
          (v.length !== 1 || v[0] !== 1 || s !== null) && (this._isScalar = false);
        } else if (typeof f == "number") this._dimensions.push(t([
          f
        ]));
        else if (typeof f == "string") this._dimensions.push(f);
        else throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
        this._sourceSize.push(s);
      }
    }
    u.prototype.type = "Index", u.prototype.isIndex = true;
    function t(a) {
      for (var l = 0, D = a.length; l < D; l++) if (typeof a[l] != "number" || !cr(a[l])) throw new TypeError("Index parameters must be positive integer numbers");
      return new e(a);
    }
    return u.prototype.clone = function() {
      var a = new u();
      return a._dimensions = tr(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
    }, u.create = function(a) {
      var l = new u();
      return u.apply(l, a), l;
    }, u.prototype.size = function() {
      for (var a = [], l = 0, D = this._dimensions.length; l < D; l++) {
        var f = this._dimensions[l];
        a[l] = typeof f == "string" ? 1 : f.size()[0];
      }
      return a;
    }, u.prototype.max = function() {
      for (var a = [], l = 0, D = this._dimensions.length; l < D; l++) {
        var f = this._dimensions[l];
        a[l] = typeof f == "string" ? f : f.max();
      }
      return a;
    }, u.prototype.min = function() {
      for (var a = [], l = 0, D = this._dimensions.length; l < D; l++) {
        var f = this._dimensions[l];
        a[l] = typeof f == "string" ? f : f.min();
      }
      return a;
    }, u.prototype.forEach = function(a) {
      for (var l = 0, D = this._dimensions.length; l < D; l++) a(this._dimensions[l], l, this);
    }, u.prototype.dimension = function(a) {
      return this._dimensions[a] || null;
    }, u.prototype.isObjectProperty = function() {
      return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
    }, u.prototype.getObjectProperty = function() {
      return this.isObjectProperty() ? this._dimensions[0] : null;
    }, u.prototype.isScalar = function() {
      return this._isScalar;
    }, u.prototype.toArray = function() {
      for (var a = [], l = 0, D = this._dimensions.length; l < D; l++) {
        var f = this._dimensions[l];
        a.push(typeof f == "string" ? f : f.toArray());
      }
      return a;
    }, u.prototype.valueOf = u.prototype.toArray, u.prototype.toString = function() {
      for (var a = [], l = 0, D = this._dimensions.length; l < D; l++) {
        var f = this._dimensions[l];
        typeof f == "string" ? a.push(JSON.stringify(f)) : a.push(f.toString());
      }
      return "[" + a.join(", ") + "]";
    }, u.prototype.toJSON = function() {
      return {
        mathjs: "Index",
        dimensions: this._dimensions
      };
    }, u.fromJSON = function(a) {
      return u.create(a.dimensions);
    }, u;
  }, {
    isClass: true
  });
  function an(r) {
    var e = [];
    return r.forEach((n, u) => {
      n && e.push(u);
    }), e;
  }
  var ws = "atan", Cs = [
    "typed"
  ], bs = G(ws, Cs, (r) => {
    var { typed: e } = r;
    return e("atan", {
      number: function(u) {
        return Math.atan(u);
      },
      Complex: function(u) {
        return u.atan();
      },
      BigNumber: function(u) {
        return u.atan();
      }
    });
  }), Xn = G("trigUnit", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      Unit: e.referToSelf((n) => (u) => {
        if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
        return e.find(n, u.valueType())(u.value);
      })
    };
  }), on = "cos", _s = [
    "typed"
  ], Bs = G(on, _s, (r) => {
    var { typed: e } = r, n = Xn({
      typed: e
    });
    return e(on, {
      number: Math.cos,
      "Complex | BigNumber": (u) => u.cos()
    }, n);
  }), sn = "sin", xs = [
    "typed"
  ], Ss = G(sn, xs, (r) => {
    var { typed: e } = r, n = Xn({
      typed: e
    });
    return e(sn, {
      number: Math.sin,
      "Complex | BigNumber": (u) => u.sin()
    }, n);
  }), fn = "add", Ms = [
    "typed",
    "matrix",
    "addScalar",
    "equalScalar",
    "DenseMatrix",
    "SparseMatrix",
    "concat"
  ], Ns = G(fn, Ms, (r) => {
    var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: l, concat: D } = r, f = Wn({
      typed: e
    }), c = Xi({
      typed: e,
      equalScalar: t
    }), i = Gn({
      typed: e,
      DenseMatrix: a
    }), s = Vr({
      typed: e,
      matrix: n,
      concat: D
    });
    return e(fn, {
      "any, any": u,
      "any, any, ...any": e.referToSelf((d) => (v, p, o) => {
        for (var h = d(v, p), g = 0; g < o.length; g++) h = d(h, o[g]);
        return h;
      })
    }, s({
      elop: u,
      DS: f,
      SS: c,
      Ss: i
    }));
  }), ln = "norm", Ts = [
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
  ], zs = G(ln, Ts, (r) => {
    var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: l, multiply: D, equalScalar: f, larger: c, smaller: i, matrix: s, ctranspose: d, eigs: v } = r;
    return e(ln, {
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
        return A(s(E), 2);
      },
      Matrix: function(E) {
        return A(E, 2);
      },
      "Array, number | BigNumber | string": function(E, y) {
        return A(s(E), y);
      },
      "Matrix, number | BigNumber | string": function(E, y) {
        return A(E, y);
      }
    });
    function p(b) {
      var E = 0;
      return b.forEach(function(y) {
        var B = n(y);
        c(B, E) && (E = B);
      }, true), E;
    }
    function o(b) {
      var E;
      return b.forEach(function(y) {
        var B = n(y);
        (!E || i(B, E)) && (E = B);
      }, true), E || 0;
    }
    function h(b, E) {
      if (E === Number.POSITIVE_INFINITY || E === "inf") return p(b);
      if (E === Number.NEGATIVE_INFINITY || E === "-inf") return o(b);
      if (E === "fro") return A(b, 2);
      if (typeof E == "number" && !isNaN(E)) {
        if (!f(E, 0)) {
          var y = 0;
          return b.forEach(function(B) {
            y = u(t(n(B), E), y);
          }, true), t(y, 1 / E);
        }
        return Number.POSITIVE_INFINITY;
      }
      throw new Error("Unsupported parameter value");
    }
    function g(b) {
      var E = 0;
      return b.forEach(function(y, B) {
        E = u(E, D(y, a(y)));
      }), n(l(E));
    }
    function w(b) {
      var E = [], y = 0;
      return b.forEach(function(B, _) {
        var x = _[1], N = u(E[x] || 0, n(B));
        c(N, y) && (y = N), E[x] = N;
      }, true), y;
    }
    function m(b) {
      var E = b.size();
      if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
      var y = d(b), B = D(y, b), _ = v(B).values.toArray(), x = _[_.length - 1];
      return n(l(x));
    }
    function C(b) {
      var E = [], y = 0;
      return b.forEach(function(B, _) {
        var x = _[0], N = u(E[x] || 0, n(B));
        c(N, y) && (y = N), E[x] = N;
      }, true), y;
    }
    function F(b, E) {
      if (E === 1) return w(b);
      if (E === Number.POSITIVE_INFINITY || E === "inf") return C(b);
      if (E === "fro") return g(b);
      if (E === 2) return m(b);
      throw new Error("Unsupported parameter value " + E);
    }
    function A(b, E) {
      var y = b.size();
      if (y.length === 1) return h(b, E);
      if (y.length === 2) {
        if (y[0] && y[1]) return F(b, E);
        throw new RangeError("Invalid matrix dimensions");
      }
    }
  }), cn = "dot", Os = [
    "typed",
    "addScalar",
    "multiplyScalar",
    "conj",
    "size"
  ], $s = G(cn, Os, (r) => {
    var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
    return e(cn, {
      "Array | DenseMatrix, Array | DenseMatrix": D,
      "SparseMatrix, SparseMatrix": f
    });
    function l(i, s) {
      var d = c(i), v = c(s), p, o;
      if (d.length === 1) p = d[0];
      else if (d.length === 2 && d[1] === 1) p = d[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + d.join(", ") + ")");
      if (v.length === 1) o = v[0];
      else if (v.length === 2 && v[1] === 1) o = v[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
      if (p !== o) throw new RangeError("Vectors must have equal length (" + p + " != " + o + ")");
      if (p === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
      return p;
    }
    function D(i, s) {
      var d = l(i, s), v = vr(i) ? i._data : i, p = vr(i) ? i._datatype || i.getDataType() : void 0, o = vr(s) ? s._data : s, h = vr(s) ? s._datatype || s.getDataType() : void 0, g = c(i).length === 2, w = c(s).length === 2, m = n, C = u;
      if (p && h && p === h && typeof p == "string" && p !== "mixed") {
        var F = p;
        m = e.find(n, [
          F,
          F
        ]), C = e.find(u, [
          F,
          F
        ]);
      }
      if (!g && !w) {
        for (var A = C(t(v[0]), o[0]), b = 1; b < d; b++) A = m(A, C(t(v[b]), o[b]));
        return A;
      }
      if (!g && w) {
        for (var E = C(t(v[0]), o[0][0]), y = 1; y < d; y++) E = m(E, C(t(v[y]), o[y][0]));
        return E;
      }
      if (g && !w) {
        for (var B = C(t(v[0][0]), o[0]), _ = 1; _ < d; _++) B = m(B, C(t(v[_][0]), o[_]));
        return B;
      }
      if (g && w) {
        for (var x = C(t(v[0][0]), o[0][0]), N = 1; N < d; N++) x = m(x, C(t(v[N][0]), o[N][0]));
        return x;
      }
    }
    function f(i, s) {
      l(i, s);
      for (var d = i._index, v = i._values, p = s._index, o = s._values, h = 0, g = n, w = u, m = 0, C = 0; m < d.length && C < p.length; ) {
        var F = d[m], A = p[C];
        if (F < A) {
          m++;
          continue;
        }
        if (F > A) {
          C++;
          continue;
        }
        F === A && (h = g(h, w(v[m], o[C])), m++, C++);
      }
      return h;
    }
    function c(i) {
      return vr(i) ? i.size() : a(i);
    }
  }), vn = "qr", Is = [
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
  ], qs = G(vn, Is, (r) => {
    var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: l, sign: D, sqrt: f, conj: c, unaryMinus: i, addScalar: s, divideScalar: d, multiplyScalar: v, subtractScalar: p, complex: o } = r;
    return Ce(e(vn, {
      DenseMatrix: function(C) {
        return g(C);
      },
      SparseMatrix: function(C) {
        return w();
      },
      Array: function(C) {
        var F = n(C), A = g(F);
        return {
          Q: A.Q.valueOf(),
          R: A.R.valueOf()
        };
      }
    }), {
      _denseQRimpl: h
    });
    function h(m) {
      var C = m._size[0], F = m._size[1], A = t([
        C
      ], "dense"), b = A._data, E = m.clone(), y = E._data, B, _, x, N = u([
        C
      ], "");
      for (x = 0; x < Math.min(F, C); ++x) {
        var S = y[x][x], T = i(l(S, 0) ? 1 : D(S)), M = c(T), R = 0;
        for (B = x; B < C; B++) R = s(R, v(y[B][x], c(y[B][x])));
        var z = v(T, f(R));
        if (!a(z)) {
          var $ = p(S, z);
          for (N[x] = 1, B = x + 1; B < C; B++) N[B] = d(y[B][x], $);
          var J = i(c(d($, z))), X = void 0;
          for (_ = x; _ < F; _++) {
            for (X = 0, B = x; B < C; B++) X = s(X, v(c(N[B]), y[B][_]));
            for (X = v(X, J), B = x; B < C; B++) y[B][_] = v(p(y[B][_], v(N[B], X)), M);
          }
          for (B = 0; B < C; B++) {
            for (X = 0, _ = x; _ < C; _++) X = s(X, v(b[B][_], N[_]));
            for (X = v(X, J), _ = x; _ < C; ++_) b[B][_] = d(p(b[B][_], v(X, c(N[_]))), M);
          }
        }
      }
      return {
        Q: A,
        R: E,
        toString: function() {
          return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
        }
      };
    }
    function g(m) {
      var C = h(m), F = C.R._data;
      if (m._data.length > 0) for (var A = F[0][0].type === "Complex" ? o(0) : 0, b = 0; b < F.length; ++b) for (var E = 0; E < b && E < (F[0] || []).length; ++E) F[b][E] = A;
      return C;
    }
    function w(m) {
      throw new Error("qr not implemented for sparse matrices yet");
    }
  }), Dn = "det", Rs = [
    "typed",
    "matrix",
    "subtractScalar",
    "multiply",
    "divideScalar",
    "isZero",
    "unaryMinus"
  ], Ps = G(Dn, Rs, (r) => {
    var { typed: e, matrix: n, subtractScalar: u, multiply: t, divideScalar: a, isZero: l, unaryMinus: D } = r;
    return e(Dn, {
      any: function(i) {
        return tr(i);
      },
      "Array | Matrix": function(i) {
        var s;
        switch (vr(i) ? s = i.size() : Array.isArray(i) ? (i = n(i), s = i.size()) : s = [], s.length) {
          case 0:
            return tr(i);
          case 1:
            if (s[0] === 1) return tr(i.valueOf()[0]);
            if (s[0] === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + pr(s) + ")");
          case 2: {
            var d = s[0], v = s[1];
            if (d === v) return f(i.clone().valueOf(), d);
            if (v === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + pr(s) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + pr(s) + ")");
        }
      }
    });
    function f(c, i, s) {
      if (i === 1) return tr(c[0][0]);
      if (i === 2) return u(t(c[0][0], c[1][1]), t(c[1][0], c[0][1]));
      for (var d = false, v = new Array(i).fill(0).map((b, E) => E), p = 0; p < i; p++) {
        var o = v[p];
        if (l(c[o][p])) {
          var h = void 0;
          for (h = p + 1; h < i; h++) if (!l(c[v[h]][p])) {
            o = v[h], v[h] = v[p], v[p] = o, d = !d;
            break;
          }
          if (h === i) return c[o][p];
        }
        for (var g = c[o][p], w = p === 0 ? 1 : c[v[p - 1]][p - 1], m = p + 1; m < i; m++) for (var C = v[m], F = p + 1; F < i; F++) c[C][F] = a(u(t(c[C][F], g), t(c[C][p], c[o][F])), w);
      }
      var A = c[v[i - 1]][i - 1];
      return d ? D(A) : A;
    }
  }), pn = "inv", Us = [
    "typed",
    "matrix",
    "divideScalar",
    "addScalar",
    "multiply",
    "unaryMinus",
    "det",
    "identity",
    "abs"
  ], Ls = G(pn, Us, (r) => {
    var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: l, det: D, identity: f, abs: c } = r;
    return e(pn, {
      "Array | Matrix": function(d) {
        var v = vr(d) ? d.size() : ir(d);
        switch (v.length) {
          case 1:
            if (v[0] === 1) return vr(d) ? n([
              u(1, d.valueOf()[0])
            ]) : [
              u(1, d[0])
            ];
            throw new RangeError("Matrix must be square (size: " + pr(v) + ")");
          case 2: {
            var p = v[0], o = v[1];
            if (p === o) return vr(d) ? n(i(d.valueOf(), p, o), d.storage()) : i(d, p, o);
            throw new RangeError("Matrix must be square (size: " + pr(v) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + pr(v) + ")");
        }
      },
      any: function(d) {
        return u(1, d);
      }
    });
    function i(s, d, v) {
      var p, o, h, g, w;
      if (d === 1) {
        if (g = s[0][0], g === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            u(1, g)
          ]
        ];
      } else if (d === 2) {
        var m = D(s);
        if (m === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            u(s[1][1], m),
            u(l(s[0][1]), m)
          ],
          [
            u(l(s[1][0]), m),
            u(s[0][0], m)
          ]
        ];
      } else {
        var C = s.concat();
        for (p = 0; p < d; p++) C[p] = C[p].concat();
        for (var F = f(d).valueOf(), A = 0; A < v; A++) {
          var b = c(C[A][A]), E = A;
          for (p = A + 1; p < d; ) c(C[p][A]) > b && (b = c(C[p][A]), E = p), p++;
          if (b === 0) throw Error("Cannot calculate inverse, determinant is zero");
          p = E, p !== A && (w = C[A], C[A] = C[p], C[p] = w, w = F[A], F[A] = F[p], F[p] = w);
          var y = C[A], B = F[A];
          for (p = 0; p < d; p++) {
            var _ = C[p], x = F[p];
            if (p !== A) {
              if (_[A] !== 0) {
                for (h = u(l(_[A]), y[A]), o = A; o < v; o++) _[o] = t(_[o], a(h, y[o]));
                for (o = 0; o < v; o++) x[o] = t(x[o], a(h, B[o]));
              }
            } else {
              for (h = y[A], o = A; o < v; o++) _[o] = u(_[o], h);
              for (o = 0; o < v; o++) x[o] = u(x[o], h);
            }
          }
        }
        return F;
      }
    }
  });
  function Vs(r) {
    var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: l, sqrt: D, abs: f, bignumber: c, diag: i, size: s, reshape: d, inv: v, qr: p, usolve: o, usolveAll: h, equal: g, complex: w, larger: m, smaller: C, matrixFromColumns: F, dot: A } = r;
    function b(O, I, Z, Q) {
      var V = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, q = E(O, I, Z, Q, V);
      y(O, I, Z, Q, V, q);
      var { values: W, C: U } = B(O, I, Z, Q, V);
      if (V) {
        var P = _(O, I, U, q, W, Z, Q);
        return {
          values: W,
          eigenvectors: P
        };
      }
      return {
        values: W
      };
    }
    function E(O, I, Z, Q, V) {
      var q = Q === "BigNumber", W = Q === "Complex", U = q ? c(0) : 0, P = q ? c(1) : W ? w(1) : 1, Y = q ? c(1) : 1, L = q ? c(10) : 2, k = a(L, L), j;
      V && (j = Array(I).fill(P));
      for (var rr = false; !rr; ) {
        rr = true;
        for (var er = 0; er < I; er++) {
          for (var ur = U, ar = U, dr = 0; dr < I; dr++) er !== dr && (ur = e(ur, f(O[dr][er])), ar = e(ar, f(O[er][dr])));
          if (!g(ur, 0) && !g(ar, 0)) {
            for (var sr = Y, lr = ur, xr = l(ar, L), Sr = a(ar, L); C(lr, xr); ) lr = a(lr, k), sr = a(sr, L);
            for (; m(lr, Sr); ) lr = l(lr, k), sr = l(sr, L);
            var Fr = C(l(e(lr, ar), sr), a(e(ur, ar), 0.95));
            if (Fr) {
              rr = false;
              for (var Ur = l(1, sr), Nr = 0; Nr < I; Nr++) er !== Nr && (O[er][Nr] = a(O[er][Nr], Ur), O[Nr][er] = a(O[Nr][er], sr));
              V && (j[er] = a(j[er], Ur));
            }
          }
        }
      }
      return V ? i(j) : null;
    }
    function y(O, I, Z, Q, V, q) {
      var W = Q === "BigNumber", U = Q === "Complex", P = W ? c(0) : U ? w(0) : 0;
      W && (Z = c(Z));
      for (var Y = 0; Y < I - 2; Y++) {
        for (var L = 0, k = P, j = Y + 1; j < I; j++) {
          var rr = O[j][Y];
          C(f(k), f(rr)) && (k = rr, L = j);
        }
        if (!C(f(k), Z)) {
          if (L !== Y + 1) {
            var er = O[L];
            O[L] = O[Y + 1], O[Y + 1] = er;
            for (var ur = 0; ur < I; ur++) {
              var ar = O[ur][L];
              O[ur][L] = O[ur][Y + 1], O[ur][Y + 1] = ar;
            }
            if (V) {
              var dr = q[L];
              q[L] = q[Y + 1], q[Y + 1] = dr;
            }
          }
          for (var sr = Y + 2; sr < I; sr++) {
            var lr = l(O[sr][Y], k);
            if (lr !== 0) {
              for (var xr = 0; xr < I; xr++) O[sr][xr] = n(O[sr][xr], a(lr, O[Y + 1][xr]));
              for (var Sr = 0; Sr < I; Sr++) O[Sr][Y + 1] = e(O[Sr][Y + 1], a(lr, O[Sr][sr]));
              if (V) for (var Fr = 0; Fr < I; Fr++) q[sr][Fr] = n(q[sr][Fr], a(lr, q[Y + 1][Fr]));
            }
          }
        }
      }
      return q;
    }
    function B(O, I, Z, Q, V) {
      var q = Q === "BigNumber", W = Q === "Complex", U = q ? c(1) : W ? w(1) : 1;
      q && (Z = c(Z));
      for (var P = tr(O), Y = [], L = I, k = [], j = V ? i(Array(I).fill(U)) : void 0, rr = V ? i(Array(L).fill(U)) : void 0, er = 0; er <= 100; ) {
        er += 1;
        for (var ur = P[L - 1][L - 1], ar = 0; ar < L; ar++) P[ar][ar] = n(P[ar][ar], ur);
        var { Q: dr, R: sr } = p(P);
        P = t(sr, dr);
        for (var lr = 0; lr < L; lr++) P[lr][lr] = e(P[lr][lr], ur);
        if (V && (rr = t(rr, dr)), L === 1 || C(f(P[L - 1][L - 2]), Z)) {
          er = 0, Y.push(P[L - 1][L - 1]), V && (k.unshift([
            [
              1
            ]
          ]), S(rr, I), j = t(j, rr), L > 1 && (rr = i(Array(L - 1).fill(U)))), L -= 1, P.pop();
          for (var xr = 0; xr < L; xr++) P[xr].pop();
        } else if (L === 2 || C(f(P[L - 2][L - 3]), Z)) {
          er = 0;
          var Sr = x(P[L - 2][L - 2], P[L - 2][L - 1], P[L - 1][L - 2], P[L - 1][L - 1]);
          Y.push(...Sr), V && (k.unshift(N(P[L - 2][L - 2], P[L - 2][L - 1], P[L - 1][L - 2], P[L - 1][L - 1], Sr[0], Sr[1], Z, Q)), S(rr, I), j = t(j, rr), L > 2 && (rr = i(Array(L - 2).fill(U)))), L -= 2, P.pop(), P.pop();
          for (var Fr = 0; Fr < L; Fr++) P[Fr].pop(), P[Fr].pop();
        }
        if (L === 0) break;
      }
      if (Y.sort((ae, $r) => +n(f(ae), f($r))), er > 100) {
        var Ur = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + Y.join(", "));
        throw Ur.values = Y, Ur.vectors = [], Ur;
      }
      var Nr = V ? t(j, T(k, I)) : void 0;
      return {
        values: Y,
        C: Nr
      };
    }
    function _(O, I, Z, Q, V, q, W) {
      var U = v(Z), P = t(U, O, Z), Y = W === "BigNumber", L = W === "Complex", k = Y ? c(0) : L ? w(0) : 0, j = Y ? c(1) : L ? w(1) : 1, rr = [], er = [];
      for (var ur of V) {
        var ar = M(rr, ur, g);
        ar === -1 ? (rr.push(ur), er.push(1)) : er[ar] += 1;
      }
      for (var dr = [], sr = rr.length, lr = Array(I).fill(k), xr = i(Array(I).fill(j)), Sr = function() {
        var Nr = rr[Fr], ae = n(P, t(Nr, xr)), $r = h(ae, lr);
        for ($r.shift(); $r.length < er[Fr]; ) {
          var Dt = R(ae, I, $r, q, W);
          if (Dt === null) break;
          $r.push(Dt);
        }
        var uu = t(v(Q), Z);
        $r = $r.map((Oe) => t(uu, Oe)), dr.push(...$r.map((Oe) => ({
          value: Nr,
          vector: u(Oe)
        })));
      }, Fr = 0; Fr < sr; Fr++) Sr();
      return dr;
    }
    function x(O, I, Z, Q) {
      var V = e(O, Q), q = n(a(O, Q), a(I, Z)), W = a(V, 0.5), U = a(D(n(a(V, V), a(4, q))), 0.5);
      return [
        e(W, U),
        n(W, U)
      ];
    }
    function N(O, I, Z, Q, V, q, W, U) {
      var P = U === "BigNumber", Y = U === "Complex", L = P ? c(0) : Y ? w(0) : 0, k = P ? c(1) : Y ? w(1) : 1;
      if (C(f(Z), W)) return [
        [
          k,
          L
        ],
        [
          L,
          k
        ]
      ];
      if (m(f(n(V, q)), W)) return [
        [
          n(V, Q),
          n(q, Q)
        ],
        [
          Z,
          Z
        ]
      ];
      var j = n(O, V), rr = n(Q, V);
      return C(f(I), W) && C(f(rr), W) ? [
        [
          j,
          k
        ],
        [
          Z,
          L
        ]
      ] : [
        [
          I,
          L
        ],
        [
          rr,
          k
        ]
      ];
    }
    function S(O, I) {
      for (var Z = 0; Z < O.length; Z++) O[Z].push(...Array(I - O[Z].length).fill(0));
      for (var Q = O.length; Q < I; Q++) O.push(Array(I).fill(0)), O[Q][Q] = 1;
      return O;
    }
    function T(O, I) {
      for (var Z = [], Q = 0; Q < I; Q++) Z[Q] = Array(I).fill(0);
      var V = 0;
      for (var q of O) {
        for (var W = q.length, U = 0; U < W; U++) for (var P = 0; P < W; P++) Z[V + U][V + P] = q[U][P];
        V += W;
      }
      return Z;
    }
    function M(O, I, Z) {
      for (var Q = 0; Q < O.length; Q++) if (Z(O[Q], I)) return Q;
      return -1;
    }
    function R(O, I, Z, Q, V) {
      for (var q = V === "BigNumber" ? c(1e3) : 1e3, W, U = 0; U < 5; ++U) {
        W = z(I, Z, V);
        try {
          W = o(O, W);
        } catch {
          continue;
        }
        if (m(J(W), q)) break;
      }
      if (U >= 5) return null;
      for (U = 0; ; ) {
        var P = o(O, W);
        if (C(J($(W, [
          P
        ])), Q)) break;
        if (++U >= 10) return null;
        W = X(P);
      }
      return W;
    }
    function z(O, I, Z) {
      var Q = Z === "BigNumber", V = Z === "Complex", q = Array(O).fill(0).map((W) => 2 * Math.random() - 1);
      return Q && (q = q.map((W) => c(W))), V && (q = q.map((W) => w(W))), q = $(q, I), X(q, Z);
    }
    function $(O, I) {
      var Z = s(O);
      for (var Q of I) Q = d(Q, Z), O = n(O, t(l(A(Q, O), A(Q, Q)), Q));
      return O;
    }
    function J(O) {
      return f(D(A(O, O)));
    }
    function X(O, I) {
      var Z = I === "BigNumber", Q = I === "Complex", V = Z ? c(1) : Q ? w(1) : 1;
      return t(l(V, J(O)), O);
    }
    return b;
  }
  function Ws(r) {
    var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: l, sin: D, multiplyScalar: f, inv: c, bignumber: i, multiply: s, add: d } = r;
    function v(y, B) {
      var _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, x = arguments.length > 3 ? arguments[3] : void 0, N = arguments.length > 4 ? arguments[4] : void 0;
      if (x === "number") return p(y, _, N);
      if (x === "BigNumber") return o(y, _, N);
      throw TypeError("Unsupported data type: " + x);
    }
    function p(y, B, _) {
      var x = y.length, N = Math.abs(B / x), S, T;
      if (_) {
        T = new Array(x);
        for (var M = 0; M < x; M++) T[M] = Array(x).fill(0), T[M][M] = 1;
      }
      for (var R = A(y); Math.abs(R[1]) >= Math.abs(N); ) {
        var z = R[0][0], $ = R[0][1];
        S = h(y[z][z], y[$][$], y[z][$]), y = F(y, S, z, $), _ && (T = w(T, S, z, $)), R = A(y);
      }
      for (var J = Array(x).fill(0), X = 0; X < x; X++) J[X] = y[X][X];
      return E(tr(J), T, _);
    }
    function o(y, B, _) {
      var x = y.length, N = t(B / x), S, T;
      if (_) {
        T = new Array(x);
        for (var M = 0; M < x; M++) T[M] = Array(x).fill(0), T[M][M] = 1;
      }
      for (var R = b(y); t(R[1]) >= t(N); ) {
        var z = R[0][0], $ = R[0][1];
        S = g(y[z][z], y[$][$], y[z][$]), y = C(y, S, z, $), _ && (T = m(T, S, z, $)), R = b(y);
      }
      for (var J = Array(x).fill(0), X = 0; X < x; X++) J[X] = y[X][X];
      return E(tr(J), T, _);
    }
    function h(y, B, _) {
      var x = B - y;
      return Math.abs(x) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * _ / (B - y));
    }
    function g(y, B, _) {
      var x = u(B, y);
      return t(x) <= e.relTol ? i(-1).acos().div(4) : f(0.5, a(s(2, _, c(x))));
    }
    function w(y, B, _, x) {
      for (var N = y.length, S = Math.cos(B), T = Math.sin(B), M = Array(N).fill(0), R = Array(N).fill(0), z = 0; z < N; z++) M[z] = S * y[z][_] - T * y[z][x], R[z] = T * y[z][_] + S * y[z][x];
      for (var $ = 0; $ < N; $++) y[$][_] = M[$], y[$][x] = R[$];
      return y;
    }
    function m(y, B, _, x) {
      for (var N = y.length, S = l(B), T = D(B), M = Array(N).fill(i(0)), R = Array(N).fill(i(0)), z = 0; z < N; z++) M[z] = u(f(S, y[z][_]), f(T, y[z][x])), R[z] = n(f(T, y[z][_]), f(S, y[z][x]));
      for (var $ = 0; $ < N; $++) y[$][_] = M[$], y[$][x] = R[$];
      return y;
    }
    function C(y, B, _, x) {
      for (var N = y.length, S = i(l(B)), T = i(D(B)), M = f(S, S), R = f(T, T), z = Array(N).fill(i(0)), $ = Array(N).fill(i(0)), J = s(i(2), S, T, y[_][x]), X = n(u(f(M, y[_][_]), J), f(R, y[x][x])), O = d(f(R, y[_][_]), J, f(M, y[x][x])), I = 0; I < N; I++) z[I] = u(f(S, y[_][I]), f(T, y[x][I])), $[I] = n(f(T, y[_][I]), f(S, y[x][I]));
      y[_][_] = X, y[x][x] = O, y[_][x] = i(0), y[x][_] = i(0);
      for (var Z = 0; Z < N; Z++) Z !== _ && Z !== x && (y[_][Z] = z[Z], y[Z][_] = z[Z], y[x][Z] = $[Z], y[Z][x] = $[Z]);
      return y;
    }
    function F(y, B, _, x) {
      for (var N = y.length, S = Math.cos(B), T = Math.sin(B), M = S * S, R = T * T, z = Array(N).fill(0), $ = Array(N).fill(0), J = M * y[_][_] - 2 * S * T * y[_][x] + R * y[x][x], X = R * y[_][_] + 2 * S * T * y[_][x] + M * y[x][x], O = 0; O < N; O++) z[O] = S * y[_][O] - T * y[x][O], $[O] = T * y[_][O] + S * y[x][O];
      y[_][_] = J, y[x][x] = X, y[_][x] = 0, y[x][_] = 0;
      for (var I = 0; I < N; I++) I !== _ && I !== x && (y[_][I] = z[I], y[I][_] = z[I], y[x][I] = $[I], y[I][x] = $[I]);
      return y;
    }
    function A(y) {
      for (var B = y.length, _ = 0, x = [
        0,
        1
      ], N = 0; N < B; N++) for (var S = N + 1; S < B; S++) Math.abs(_) < Math.abs(y[N][S]) && (_ = Math.abs(y[N][S]), x = [
        N,
        S
      ]);
      return [
        x,
        _
      ];
    }
    function b(y) {
      for (var B = y.length, _ = 0, x = [
        0,
        1
      ], N = 0; N < B; N++) for (var S = N + 1; S < B; S++) t(_) < t(y[N][S]) && (_ = t(y[N][S]), x = [
        N,
        S
      ]);
      return [
        x,
        _
      ];
    }
    function E(y, B, _) {
      var x = y.length, N = Array(x), S;
      if (_) {
        S = Array(x);
        for (var T = 0; T < x; T++) S[T] = Array(x);
      }
      for (var M = 0; M < x; M++) {
        for (var R = 0, z = y[0], $ = 0; $ < y.length; $++) t(y[$]) < t(z) && (R = $, z = y[R]);
        if (N[M] = y.splice(R, 1)[0], _) for (var J = 0; J < x; J++) S[M][J] = B[J][R], B[J].splice(R, 1);
      }
      if (!_) return {
        values: N
      };
      var X = S.map((O, I) => ({
        value: N[I],
        vector: O
      }));
      return {
        values: N,
        eigenvectors: X
      };
    }
    return v;
  }
  var Gs = "eigs", Zs = [
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
  ], Js = G(Gs, Zs, (r) => {
    var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: l, abs: D, atan: f, cos: c, sin: i, multiplyScalar: s, divideScalar: d, inv: v, bignumber: p, multiply: o, add: h, larger: g, column: w, flatten: m, number: C, complex: F, sqrt: A, diag: b, size: E, reshape: y, qr: B, usolve: _, usolveAll: x, im: N, re: S, smaller: T, matrixFromColumns: M, dot: R } = r, z = Ws({
      config: e,
      addScalar: t,
      subtract: a,
      abs: D,
      atan: f,
      cos: c,
      sin: i,
      multiplyScalar: s,
      inv: v,
      bignumber: p,
      multiply: o,
      add: h
    }), $ = Vs({
      addScalar: t,
      subtract: a,
      multiply: o,
      multiplyScalar: s,
      flatten: m,
      divideScalar: d,
      sqrt: A,
      abs: D,
      bignumber: p,
      diag: b,
      size: E,
      reshape: y,
      qr: B,
      inv: v,
      usolve: _,
      usolveAll: x,
      equal: l,
      complex: F,
      larger: g,
      smaller: T,
      matrixFromColumns: M,
      dot: R
    });
    return n("eigs", {
      Array: function(q) {
        return J(u(q));
      },
      "Array, number|BigNumber": function(q, W) {
        return J(u(q), {
          precision: W
        });
      },
      "Array, Object"(V, q) {
        return J(u(V), q);
      },
      Matrix: function(q) {
        return J(q, {
          matricize: true
        });
      },
      "Matrix, number|BigNumber": function(q, W) {
        return J(q, {
          precision: W,
          matricize: true
        });
      },
      "Matrix, Object": function(q, W) {
        var U = {
          matricize: true
        };
        return Ce(U, W), J(q, U);
      }
    });
    function J(V) {
      var q, W = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, U = "eigenvectors" in W ? W.eigenvectors : true, P = (q = W.precision) !== null && q !== void 0 ? q : e.relTol, Y = X(V, P, U);
      return W.matricize && (Y.values = u(Y.values), U && (Y.eigenvectors = Y.eigenvectors.map((L) => {
        var { value: k, vector: j } = L;
        return {
          value: k,
          vector: u(j)
        };
      }))), U && Object.defineProperty(Y, "vectors", {
        enumerable: false,
        get: () => {
          throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
        }
      }), Y;
    }
    function X(V, q, W) {
      var U = V.toArray(), P = V.size();
      if (P.length !== 2 || P[0] !== P[1]) throw new RangeError("Matrix must be square (size: ".concat(pr(P), ")"));
      var Y = P[0];
      if (I(U, Y, q) && (Z(U, Y), O(U, Y, q))) {
        var L = Q(V, U, Y);
        return z(U, Y, q, L, W);
      }
      var k = Q(V, U, Y);
      return $(U, Y, q, k, W);
    }
    function O(V, q, W) {
      for (var U = 0; U < q; U++) for (var P = U; P < q; P++) if (g(p(D(a(V[U][P], V[P][U]))), W)) return false;
      return true;
    }
    function I(V, q, W) {
      for (var U = 0; U < q; U++) for (var P = 0; P < q; P++) if (g(p(D(N(V[U][P]))), W)) return false;
      return true;
    }
    function Z(V, q) {
      for (var W = 0; W < q; W++) for (var U = 0; U < q; U++) V[W][U] = S(V[W][U]);
    }
    function Q(V, q, W) {
      var U = V.datatype();
      if (U === "number" || U === "BigNumber" || U === "Complex") return U;
      for (var P = false, Y = false, L = false, k = 0; k < W; k++) for (var j = 0; j < W; j++) {
        var rr = q[k][j];
        if (fr(rr) || Xe(rr)) P = true;
        else if (gr(rr)) Y = true;
        else if (Qe(rr)) L = true;
        else throw TypeError("Unsupported type in Matrix: " + zr(rr));
      }
      if (Y && L && console.warn("Complex BigNumbers not supported, this operation will lose precission."), L) {
        for (var er = 0; er < W; er++) for (var ur = 0; ur < W; ur++) q[er][ur] = F(q[er][ur]);
        return "Complex";
      }
      if (Y) {
        for (var ar = 0; ar < W; ar++) for (var dr = 0; dr < W; dr++) q[ar][dr] = p(q[ar][dr]);
        return "BigNumber";
      }
      if (P) {
        for (var sr = 0; sr < W; sr++) for (var lr = 0; lr < W; lr++) q[sr][lr] = C(q[sr][lr]);
        return "number";
      } else throw TypeError("Matrix contains unsupported types only.");
    }
  }), Qs = "divide", Xs = [
    "typed",
    "matrix",
    "multiply",
    "equalScalar",
    "divideScalar",
    "inv"
  ], Ys = G(Qs, Xs, (r) => {
    var { typed: e, matrix: n, multiply: u, equalScalar: t, divideScalar: a, inv: l } = r, D = Vn({
      typed: e,
      equalScalar: t
    }), f = et({
      typed: e
    });
    return e("divide", An({
      "Array | Matrix, Array | Matrix": function(i, s) {
        return u(i, l(s));
      },
      "DenseMatrix, any": function(i, s) {
        return f(i, s, a, false);
      },
      "SparseMatrix, any": function(i, s) {
        return D(i, s, a, false);
      },
      "Array, any": function(i, s) {
        return f(n(i), s, a, false).valueOf();
      },
      "any, Array | Matrix": function(i, s) {
        return u(i, l(s));
      }
    }, a.signatures));
  }), te = pa({
    config: br
  }), Se = ma({}), tt = ba({}), nt = xa({}), Br = La({
    Matrix: nt
  }), H = la({
    BigNumber: te,
    Complex: Se,
    DenseMatrix: Br,
    Fraction: tt
  }), ut = Ei({
    typed: H
  }), Kr = Ci({
    typed: H
  }), Ks = bs({
    typed: H
  }), at = ci({
    Complex: Se,
    typed: H
  }), Me = vo({
    typed: H
  }), Hs = Bs({
    typed: H
  }), Or = Ha({
    config: br,
    typed: H
  }), Yn = Bo({
    typed: H
  }), ks = So({
    typed: H
  }), js = po({
    typed: H
  }), Kn = Wa({
    typed: H
  }), rf = Ja({
    config: br,
    typed: H
  }), Hn = Xa({
    equalScalar: Or,
    typed: H
  }), Hr = ji({
    typed: H
  }), it = ai({
    typed: H
  }), ef = mo({
    typed: H
  }), tf = no({
    BigNumber: te,
    Fraction: tt,
    complex: at,
    typed: H
  }), nf = Ss({
    typed: H
  }), Ne = ri({
    Matrix: nt,
    equalScalar: Or,
    typed: H
  }), ne = _i({
    typed: H
  }), ot = si({
    BigNumber: te,
    typed: H
  }), st = io({
    Complex: Se,
    config: br,
    typed: H
  }), Te = Ai({
    typed: H
  }), kn = pi({
    Fraction: tt,
    typed: H
  }), or = hi({
    DenseMatrix: Br,
    Matrix: nt,
    SparseMatrix: Ne,
    typed: H
  }), uf = Qo({
    bignumber: ot,
    fraction: kn,
    number: it
  }), af = Io({
    isInteger: Kn,
    matrix: or,
    typed: H
  }), ft = Ro({
    matrix: or,
    config: br,
    typed: H
  }), of = Uo({
    matrix: or,
    typed: H
  }), sf = Go({
    BigNumber: te,
    config: br,
    matrix: or,
    typed: H
  }), Wr = yo({
    isInteger: Kn,
    matrix: or,
    typed: H
  }), ff = Vo({
    conj: Me,
    transpose: of,
    typed: H
  }), lf = bo({
    DenseMatrix: Br,
    SparseMatrix: Ne,
    matrix: or,
    typed: H
  }), Gr = Yo({
    numeric: uf,
    typed: H
  }), jn = ns({
    DenseMatrix: Br,
    concat: Wr,
    equalScalar: Or,
    matrix: or,
    typed: H
  }), lt = No({
    BigNumber: te,
    DenseMatrix: Br,
    SparseMatrix: Ne,
    config: br,
    matrix: or,
    typed: H
  }), cf = ds({
    DenseMatrix: Br,
    concat: Wr,
    config: br,
    matrix: or,
    typed: H
  }), vf = gi({
    flatten: Yn,
    matrix: or,
    size: ft,
    typed: H
  }), Df = qs({
    addScalar: Kr,
    complex: at,
    conj: Me,
    divideScalar: Gr,
    equal: jn,
    identity: lt,
    isZero: Hn,
    matrix: or,
    multiplyScalar: Hr,
    sign: tf,
    sqrt: st,
    subtractScalar: ne,
    typed: H,
    unaryMinus: Te,
    zeros: sf
  }), ze = is({
    DenseMatrix: Br,
    concat: Wr,
    config: br,
    matrix: or,
    typed: H
  }), jr = so({
    DenseMatrix: Br,
    concat: Wr,
    equalScalar: Or,
    matrix: or,
    subtractScalar: ne,
    typed: H,
    unaryMinus: Te
  }), pf = jo({
    DenseMatrix: Br,
    divideScalar: Gr,
    equalScalar: Or,
    matrix: or,
    multiplyScalar: Hr,
    subtractScalar: ne,
    typed: H
  }), ue = Ns({
    DenseMatrix: Br,
    SparseMatrix: Ne,
    addScalar: Kr,
    concat: Wr,
    equalScalar: Or,
    matrix: or,
    typed: H
  }), ru = $s({
    addScalar: Kr,
    conj: Me,
    multiplyScalar: Hr,
    size: ft,
    typed: H
  }), df = ys({
    DenseMatrix: Br,
    smaller: ze
  }), hf = Es({
    ImmutableDenseMatrix: df,
    getMatrixDataType: ks
  }), ct = vs({
    DenseMatrix: Br,
    concat: Wr,
    config: br,
    matrix: or,
    typed: H
  }), Pr = eo({
    addScalar: Kr,
    dot: ru,
    equalScalar: Or,
    matrix: or,
    multiplyScalar: Hr,
    typed: H
  }), mf = es({
    DenseMatrix: Br,
    divideScalar: Gr,
    equalScalar: Or,
    matrix: or,
    multiplyScalar: Hr,
    subtractScalar: ne,
    typed: H
  }), gf = wo({
    matrix: or,
    multiply: Pr,
    subtract: jr,
    typed: H
  }), yf = Ps({
    divideScalar: Gr,
    isZero: Hn,
    matrix: or,
    multiply: Pr,
    subtractScalar: ne,
    typed: H,
    unaryMinus: Te
  }), Af = fs({
    DenseMatrix: Br,
    concat: Wr,
    config: br,
    matrix: or,
    typed: H
  }), Ff = Oo({
    bignumber: ot,
    matrix: or,
    add: ue,
    config: br,
    isPositive: rf,
    larger: ct,
    largerEq: cf,
    smaller: ze,
    smallerEq: Af,
    typed: H
  }), Ef = Fo({
    Index: hf,
    matrix: or,
    range: Ff,
    typed: H
  }), vt = Ls({
    abs: ut,
    addScalar: Kr,
    det: yf,
    divideScalar: Gr,
    identity: lt,
    matrix: or,
    multiply: Pr,
    typed: H,
    unaryMinus: Te
  }), wf = Ho({
    Complex: Se,
    config: br,
    fraction: kn,
    identity: lt,
    inv: vt,
    matrix: or,
    multiply: Pr,
    number: it,
    typed: H
  }), Cf = Ys({
    divideScalar: Gr,
    equalScalar: Or,
    inv: vt,
    matrix: or,
    multiply: Pr,
    typed: H
  }), bf = Js({
    abs: ut,
    add: ue,
    addScalar: Kr,
    atan: Ks,
    bignumber: ot,
    column: Ef,
    complex: at,
    config: br,
    cos: Hs,
    diag: lf,
    divideScalar: Gr,
    dot: ru,
    equal: jn,
    flatten: Yn,
    im: js,
    inv: vt,
    larger: ct,
    matrix: or,
    matrixFromColumns: vf,
    multiply: Pr,
    multiplyScalar: Hr,
    number: it,
    qr: Df,
    re: ef,
    reshape: af,
    sin: nf,
    size: ft,
    smaller: ze,
    sqrt: st,
    subtract: jr,
    typed: H,
    usolve: pf,
    usolveAll: mf
  }), _f = zs({
    abs: ut,
    add: ue,
    conj: Me,
    ctranspose: ff,
    eigs: bf,
    equalScalar: Or,
    larger: ct,
    matrix: or,
    multiply: Pr,
    pow: wf,
    smaller: ze,
    sqrt: st,
    typed: H
  });
  function Bf(r, e, n, u, t, a, l) {
    let D = [], f = [];
    const c = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    };
    for (let i in e) {
      const s = e[i], d = r[s][2];
      a.get(Number(i)).forEach((p) => {
        var _a2;
        const h = u[p].map((_) => r[_]), g = h.map((_, x) => x), w = t.get(Number(i)).map((_) => r[n[_]]), m = [
          ...h,
          ...w
        ], { nodes: C, elements: F } = du({
          points: m,
          polygon: g,
          maxMeshSize: 1
        }), A = D.length, b = f.length, E = F.map((_) => _.map((x) => x + A)), y = C.map((_, x) => x + A);
        f.map((_, x) => x + b), D = [
          ...D,
          ...xf(C, d)
        ], f = [
          ...f,
          ...E
        ];
        const B = ((_a2 = l.get(p).analysisInput) == null ? void 0 : _a2.areaLoad) ?? 0;
        c.loads = Mf(D, E, c.loads, B, y);
      });
    }
    for (let i = 0; i < e.length; i++) {
      const s = e[i], d = r[s][2], v = i > 0 ? r[e[i - 1]][2] : 0;
      t.get(i).forEach((o) => {
        const h = r[n[o]], g = [
          h[0],
          h[1],
          d
        ], w = [
          h[0],
          h[1],
          v
        ], { nodes: m, elements: C } = Sf(g, w, D.length);
        D = [
          ...D,
          ...m
        ], f = [
          ...f,
          ...C
        ];
        const F = D.length, A = f.length;
        m.map((b, E) => E + F), C.map((b, E) => E + A);
      });
    }
    return {
      nodes: D,
      elements: f,
      nodeInputs: c
    };
  }
  function xf(r, e) {
    return r.map((n) => [
      n[0],
      n[1],
      e
    ]);
  }
  function Sf(r, e, n, u = 3) {
    let t = [
      [
        ...r
      ]
    ], a = [];
    const l = jr(e, r), D = Cf(l, u);
    for (let f = 0; f < u; f++) t.push(ue(r, Pr(D, f + 1))), a.push([
      n + f,
      n + f + 1
    ]);
    return {
      nodes: t,
      elements: a
    };
  }
  function Mf(r, e, n, u, t) {
    return e.forEach((l) => {
      const [D, f, c] = l.map((d) => r[d]), i = a(D, f, c), s = u * i / 3;
      l.forEach((d) => {
        if (t.includes(d)) {
          const v = [
            0,
            0,
            -s,
            0,
            0,
            0
          ], p = n.get(d) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          n.set(d, ue(p, v));
        }
      });
    }), n;
    function a(l, D, f) {
      const c = jr(D, l), i = jr(f, l);
      return _f(gf(c, i)) / 2;
    }
  }
  function Nf() {
    const r = new au(new Je(), new iu());
    return r.frustumCulled = false, r.material.depthTest = false, r;
  }
  function Tf(r, e, n) {
    const u = new Je(), t = 4, a = n.flatMap((D) => {
      const f = r[D], c = [
        f[0],
        f[1],
        f[2] - t
      ];
      return [
        ...f,
        ...c
      ];
    }), l = e.map((D) => zf(D).map((f) => [
      ...r[f[0]],
      ...r[f[1]]
    ]).flat()).flat();
    return u.setAttribute("position", new ou([
      ...a,
      ...l
    ], 3)), u;
  }
  function zf(r) {
    if (r.length === 2) return [
      r
    ];
    const e = [];
    for (let n = 0; n < r.length; n++) e.push([
      r[n],
      r[(n + 1) % r.length]
    ]);
    return e;
  }
  function Of() {
    return new su(new Je(), new fu({
      color: 16770764
    }));
  }
  function $f(r, e, n) {
    const a = D(r, e), l = f(r, n);
    return qe([
      a,
      l
    ]);
    function D(c, i, s = 0.3) {
      const d = [];
      for (let p = 0; p < i.length; p++) {
        const o = [];
        for (let m = 0; m < i[p].length; m++) {
          const C = i[p][m];
          o.push(c[C]);
        }
        const h = v(o, 0.3 / 2), g = new pt();
        new lu();
        for (let m = 0; m < h.length; m++) m == 0 ? g.moveTo(h[0][0], h[0][1]) : g.lineTo(h[m][0], h[m][1]);
        const w = new dt(g, {
          depth: s,
          bevelEnabled: false
        });
        w.translate(0, 0, h[0][2] - s / 2), d.push(w);
      }
      return qe(d);
      function v(p, o = 0) {
        const h = [], g = [];
        for (let m = 0; m < p.length; m++) g.push(new $e(p[m][0], p[m][1]));
        let w = new cu(new Float32Array([
          o,
          0,
          0
        ]), 3);
        for (let m = 0; m < g.length - 1; m++) {
          let C = new $e().subVectors(g[m - 1 < 0 ? g.length - 1 : m - 1], g[m]), F = new $e().subVectors(g[m + 1 == g.length ? 0 : m + 1], g[m]), E = (F.angle() - C.angle()) * 0.5, y = F.angle() + Math.PI * 0.5, B = Math.tan(E - Math.PI * 0.5), _ = new Ie().set(1, 0, 0, 0, -B, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), x = y, N = new Ie().set(Math.cos(x), -Math.sin(x), 0, 0, Math.sin(x), Math.cos(x), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), S = new Ie().set(1, 0, 0, g[m].x, 0, 1, 0, g[m].y, 0, 0, 1, 0, 0, 0, 0, 1), T = w.clone();
          T.needsUpdate = true, T.applyMatrix4(_), T.applyMatrix4(N), T.applyMatrix4(S), h.push([
            T.getX(0),
            T.getY(0),
            p[m][2]
          ]);
        }
        return h;
      }
    }
    function f(c, i) {
      const s = [], d = new pt();
      d.lineTo(0 + 0.3, 0), d.lineTo(0 + 0.3, 0 + 0.3), d.lineTo(0, 0 + 0.3);
      for (let v = 0; v < i.length; v++) {
        const p = c[i[v]], o = new dt(d, {
          depth: -4,
          bevelEnabled: false
        });
        o.translate(p[0] - 0.3 / 2, p[1] - 0.3 / 2, p[2]), s.push(o);
      }
      return qe(s);
    }
  }
  const eu = {
    stories: {
      value: Cr.state(2),
      min: 1,
      max: 5,
      step: 1
    }
  }, yr = {
    points: Cr.state([]),
    stories: Cr.state([]),
    columns: Cr.state([]),
    slabs: Cr.state([]),
    columnsByStory: Cr.state(/* @__PURE__ */ new Map()),
    slabsByStory: Cr.state(/* @__PURE__ */ new Map()),
    slabData: Cr.state(/* @__PURE__ */ new Map())
  }, ve = {
    nodes: Cr.state([]),
    elements: Cr.state([]),
    nodeInputs: Cr.state({})
  }, fe = [
    [
      0,
      0,
      4
    ],
    [
      0,
      10,
      4
    ],
    [
      18,
      10,
      4
    ],
    [
      18,
      0,
      4
    ],
    [
      0,
      0,
      4
    ]
  ], le = [
    [
      0,
      0,
      4
    ],
    [
      0,
      10,
      4
    ],
    [
      18,
      10,
      4
    ],
    [
      18,
      0,
      4
    ],
    [
      6,
      0,
      4
    ],
    [
      6,
      10,
      4
    ]
  ], tu = Of(), nu = Nf(), Ze = Cr.state([
    nu
  ]), If = Cr.state([
    tu
  ]);
  Cr.derive(() => {
    const r = [], e = [], n = [], u = [], t = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
    for (let D = 0; D < eu.stories.value.val; D++) {
      const f = [], i = 4 * D;
      for (let o = 0; o < fe.length; o++) f.push([
        fe[o][0],
        fe[o][1],
        fe[o][2] + i
      ]);
      const s = [];
      let d = r.length;
      for (let o = 0; o < f.length; o++) r.push(f[o]), s.push(o + d);
      n.push(s), e.push(d), a.set(D, [
        D
      ]), l.set(D, {
        analysisInput: {
          areaLoad: 1,
          isOpening: false
        }
      });
      const p = [];
      for (let o = 0; o < le.length; o++) {
        const h = r.length;
        r.push([
          le[o][0],
          le[o][1],
          le[o][2] + i
        ]), u.push(h), p.push(u.length - 1);
      }
      t.set(D, p);
    }
    yr.points.val = r, yr.stories.val = e, yr.slabs.val = n, yr.columns.val = u, yr.columnsByStory.val = t, yr.slabsByStory.val = a, yr.slabData.val = l;
  });
  Cr.derive(() => {
    const { nodes: r, elements: e, nodeInputs: n } = Bf(yr.points.val, yr.stories.val, yr.columns.val, yr.slabs.val, yr.columnsByStory.val, yr.slabsByStory.val, yr.slabData.val);
    ve.nodes.val = r, ve.elements.val = e, ve.nodeInputs.val = n, nu.geometry = Tf(yr.points.val, yr.slabs.val, yr.columns.val), tu.geometry = $f(yr.points.val, yr.slabs.val, yr.columns.val), Ze.val = [
      ...Ze.rawVal
    ];
  });
  document.body.append(pu(eu), vu({
    objects3D: Ze,
    solids: If,
    mesh: ve,
    settingsObj: {
      loads: false
    }
  }), Du({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/solids/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
