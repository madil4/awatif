var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as It, t as Ct, D as Tn, C as te } from "./complex-i8qiIvCl.js";
let Mc, xc;
let __tla = (async () => {
  var Ra = {
    relTol: 1e-12,
    absTol: 1e-15,
    matrix: "Matrix",
    number: "number",
    numberFallback: "number",
    precision: 64,
    predictable: false,
    randomSeed: null
  };
  function Hi(r, e) {
    if (St(r, e)) return r[e];
    throw typeof r[e] == "function" && Qi(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
  }
  function Ki(r, e, a) {
    if (St(r, e)) return r[e] = a, a;
    throw new Error('No access to property "' + e + '"');
  }
  function St(r, e) {
    return !Ji(r) && !Array.isArray(r) ? false : mt(Zi, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function Qi(r, e) {
    return r == null || typeof r[e] != "function" || mt(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : mt(ji, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function Ji(r) {
    return typeof r == "object" && r && r.constructor === Object;
  }
  var Zi = {
    length: true,
    name: true
  }, ji = {
    toString: true,
    valueOf: true,
    toLocaleString: true
  };
  class ru {
    constructor(e) {
      this.wrappedObject = e, this[Symbol.iterator] = this.entries;
    }
    keys() {
      return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
    }
    get(e) {
      return Hi(this.wrappedObject, e);
    }
    set(e, a) {
      return Ki(this.wrappedObject, e, a), this;
    }
    has(e) {
      return St(this.wrappedObject, e) && e in this.wrappedObject;
    }
    entries() {
      return eu(this.keys(), (e) => [
        e,
        this.get(e)
      ]);
    }
    forEach(e) {
      for (var a of this.keys()) e(this.get(a), a, this);
    }
    delete(e) {
      St(this.wrappedObject, e) && delete this.wrappedObject[e];
    }
    clear() {
      for (var e of this.keys()) this.delete(e);
    }
    get size() {
      return Object.keys(this.wrappedObject).length;
    }
  }
  function eu(r, e) {
    return {
      next: () => {
        var a = r.next();
        return a.done ? a : {
          value: e(a.value),
          done: false
        };
      }
    };
  }
  function Ur(r) {
    return typeof r == "number";
  }
  function Xr(r) {
    return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
  }
  function tu(r) {
    return typeof r == "bigint";
  }
  function un(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
  }
  function on(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
  }
  function Ia(r) {
    return r && r.constructor.prototype.isUnit === true || false;
  }
  function Pe(r) {
    return typeof r == "string";
  }
  var kr = Array.isArray;
  function Nr(r) {
    return r && r.constructor.prototype.isMatrix === true || false;
  }
  function dt(r) {
    return Array.isArray(r) || Nr(r);
  }
  function Ua(r) {
    return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function $a(r) {
    return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function La(r) {
    return r && r.constructor.prototype.isRange === true || false;
  }
  function sn(r) {
    return r && r.constructor.prototype.isIndex === true || false;
  }
  function nu(r) {
    return typeof r == "boolean";
  }
  function au(r) {
    return r && r.constructor.prototype.isResultSet === true || false;
  }
  function iu(r) {
    return r && r.constructor.prototype.isHelp === true || false;
  }
  function uu(r) {
    return typeof r == "function";
  }
  function ou(r) {
    return r instanceof Date;
  }
  function su(r) {
    return r instanceof RegExp;
  }
  function fn(r) {
    return !!(r && typeof r == "object" && r.constructor === Object && !un(r) && !on(r));
  }
  function fu(r) {
    return r ? r instanceof Map || r instanceof ru || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
  }
  function lu(r) {
    return r === null;
  }
  function cu(r) {
    return r === void 0;
  }
  function vu(r) {
    return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function du(r) {
    return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
  }
  function mu(r) {
    return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function pu(r) {
    return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
  }
  function hu(r) {
    return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Du(r) {
    return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
  }
  function gu(r) {
    return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function yu(r) {
    return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Eu(r) {
    return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
  }
  function wu(r) {
    return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Au(r) {
    return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Fu(r) {
    return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function bu(r) {
    return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
  }
  function _u(r) {
    return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Cu(r) {
    return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Su(r) {
    return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Bu(r) {
    return r && r.constructor.prototype.isChain === true || false;
  }
  function ye(r) {
    var e = typeof r;
    return e === "object" ? r === null ? "null" : Xr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
  }
  function Mr(r) {
    var e = typeof r;
    if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
    if (typeof r.clone == "function") return r.clone();
    if (Array.isArray(r)) return r.map(function(a) {
      return Mr(a);
    });
    if (r instanceof Date) return new Date(r.valueOf());
    if (Xr(r)) return r;
    if (fn(r)) return Mu(r, Mr);
    if (e === "function") return r;
    throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
  }
  function Mu(r, e) {
    var a = {};
    for (var t in r) mt(r, t) && (a[t] = e(r[t]));
    return a;
  }
  function qa(r, e) {
    for (var a in e) mt(e, a) && (r[a] = e[a]);
    return r;
  }
  function Xe(r, e) {
    var a, t, n;
    if (Array.isArray(r)) {
      if (!Array.isArray(e) || r.length !== e.length) return false;
      for (t = 0, n = r.length; t < n; t++) if (!Xe(r[t], e[t])) return false;
      return true;
    } else {
      if (typeof r == "function") return r === e;
      if (r instanceof Object) {
        if (Array.isArray(e) || !(e instanceof Object)) return false;
        for (a in r) if (!(a in e) || !Xe(r[a], e[a])) return false;
        for (a in e) if (!(a in r)) return false;
        return true;
      } else return r === e;
    }
  }
  function mt(r, e) {
    return r && Object.hasOwnProperty.call(r, e);
  }
  function xu(r, e) {
    for (var a = {}, t = 0; t < e.length; t++) {
      var n = e[t], u = r[n];
      u !== void 0 && (a[n] = u);
    }
    return a;
  }
  var Nu = [
    "Matrix",
    "Array"
  ], Tu = [
    "number",
    "BigNumber",
    "Fraction"
  ], se = function(e) {
    if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
    return Object.freeze(Ra);
  };
  It(se, Ra, {
    MATRIX_OPTIONS: Nu,
    NUMBER_OPTIONS: Tu
  });
  function nr(r, e, a, t) {
    function n(u) {
      var f = xu(u, e.map(zu));
      return Ou(r, e, u), a(f);
    }
    return n.isFactory = true, n.fn = r, n.dependencies = e.slice().sort(), t && (n.meta = t), n;
  }
  function Ou(r, e, a) {
    var t = e.filter((u) => !Pu(u)).every((u) => a[u] !== void 0);
    if (!t) {
      var n = e.filter((u) => a[u] === void 0);
      throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(n.map((u) => '"'.concat(u, '"')).join(", "), "."));
    }
  }
  function Pu(r) {
    return r && r[0] === "?";
  }
  function zu(r) {
    return r && r[0] === "?" ? r.slice(1) : r;
  }
  function $r(r) {
    return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
  }
  var Ru = Math.sign || function(r) {
    return r > 0 ? 1 : r < 0 ? -1 : 0;
  };
  function Jt(r, e, a) {
    var t = {
      2: "0b",
      8: "0o",
      16: "0x"
    }, n = t[e], u = "";
    if (a) {
      if (a < 1) throw new Error("size must be in greater than 0");
      if (!$r(a)) throw new Error("size must be an integer");
      if (r > 2 ** (a - 1) - 1 || r < -(2 ** (a - 1))) throw new Error("Value must be in range [-2^".concat(a - 1, ", 2^").concat(a - 1, "-1]"));
      if (!$r(r)) throw new Error("Value must be an integer");
      r < 0 && (r = r + 2 ** a), u = "i".concat(a);
    }
    var f = "";
    return r < 0 && (r = -r, f = "-"), "".concat(f).concat(n).concat(r.toString(e)).concat(u);
  }
  function jt(r, e) {
    if (typeof e == "function") return e(r);
    if (r === 1 / 0) return "Infinity";
    if (r === -1 / 0) return "-Infinity";
    if (isNaN(r)) return "NaN";
    var { notation: a, precision: t, wordSize: n } = ka(e);
    switch (a) {
      case "fixed":
        return Uu(r, t);
      case "exponential":
        return Ya(r, t);
      case "engineering":
        return Iu(r, t);
      case "bin":
        return Jt(r, 2, n);
      case "oct":
        return Jt(r, 8, n);
      case "hex":
        return Jt(r, 16, n);
      case "auto":
        return $u(r, t, e).replace(/((\.\d*?)(0+))($|e)/, function() {
          var u = arguments[2], f = arguments[4];
          return u !== "." ? u + f : f;
        });
      default:
        throw new Error('Unknown notation "' + a + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function ka(r) {
    var e = "auto", a, t;
    if (r !== void 0) if (Ur(r)) a = r;
    else if (Xr(r)) a = r.toNumber();
    else if (fn(r)) r.precision !== void 0 && (a = On(r.precision, () => {
      throw new Error('Option "precision" must be a number or BigNumber');
    })), r.wordSize !== void 0 && (t = On(r.wordSize, () => {
      throw new Error('Option "wordSize" must be a number or BigNumber');
    })), r.notation && (e = r.notation);
    else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
    return {
      notation: e,
      precision: a,
      wordSize: t
    };
  }
  function Ut(r) {
    var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
    if (!e) throw new SyntaxError("Invalid number " + r);
    var a = e[1], t = e[2], n = parseFloat(e[4] || "0"), u = t.indexOf(".");
    n += u !== -1 ? u - 1 : t.length - 1;
    var f = t.replace(".", "").replace(/^0*/, function(m) {
      return n -= m.length, "";
    }).replace(/0*$/, "").split("").map(function(m) {
      return parseInt(m);
    });
    return f.length === 0 && (f.push(0), n++), {
      sign: a,
      coefficients: f,
      exponent: n
    };
  }
  function Iu(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var a = Ut(r), t = $t(a, e), n = t.exponent, u = t.coefficients, f = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3;
    if (Ur(e)) for (; e > u.length || n - f + 1 > u.length; ) u.push(0);
    else for (var m = Math.abs(n - f) - (u.length - 1), v = 0; v < m; v++) u.push(0);
    for (var c = Math.abs(n - f), l = 1; c > 0; ) l++, c--;
    var d = u.slice(l).join(""), y = Ur(e) && d.length || d.match(/[1-9]/) ? "." + d : "", p = u.slice(0, l).join("") + y + "e" + (n >= 0 ? "+" : "") + f.toString();
    return t.sign + p;
  }
  function Uu(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var a = Ut(r), t = typeof e == "number" ? $t(a, a.exponent + 1 + e) : a, n = t.coefficients, u = t.exponent + 1, f = u + (e || 0);
    return n.length < f && (n = n.concat(nt(f - n.length))), u < 0 && (n = nt(-u + 1).concat(n), u = 1), u < n.length && n.splice(u, 0, u === 0 ? "0." : "."), t.sign + n.join("");
  }
  function Ya(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var a = Ut(r), t = e ? $t(a, e) : a, n = t.coefficients, u = t.exponent;
    n.length < e && (n = n.concat(nt(e - n.length)));
    var f = n.shift();
    return t.sign + f + (n.length > 0 ? "." + n.join("") : "") + "e" + (u >= 0 ? "+" : "") + u;
  }
  function $u(r, e, a) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var t = Pn(a == null ? void 0 : a.lowerExp, -3), n = Pn(a == null ? void 0 : a.upperExp, 5), u = Ut(r), f = e ? $t(u, e) : u;
    if (f.exponent < t || f.exponent >= n) return Ya(r, e);
    var m = f.coefficients, v = f.exponent;
    m.length < e && (m = m.concat(nt(e - m.length))), m = m.concat(nt(v - m.length + 1 + (m.length < e ? e - m.length : 0))), m = nt(-v).concat(m);
    var c = v > 0 ? v : 0;
    return c < m.length - 1 && m.splice(c + 1, 0, "."), f.sign + m.join("");
  }
  function $t(r, e) {
    for (var a = {
      sign: r.sign,
      coefficients: r.coefficients,
      exponent: r.exponent
    }, t = a.coefficients; e <= 0; ) t.unshift(0), a.exponent++, e++;
    if (t.length > e) {
      var n = t.splice(e, t.length - e);
      if (n[0] >= 5) {
        var u = e - 1;
        for (t[u]++; t[u] === 10; ) t.pop(), u === 0 && (t.unshift(0), a.exponent++, u++), u--, t[u]++;
      }
    }
    return a;
  }
  function nt(r) {
    for (var e = [], a = 0; a < r; a++) e.push(0);
    return e;
  }
  function Lu(r) {
    return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
  }
  function ke(r, e) {
    var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, t = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (a <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (t < 0) throw new Error("Absolute tolerance must be at least 0");
    return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(a * Math.max(Math.abs(r), Math.abs(e)), t);
  }
  function On(r, e) {
    if (Ur(r)) return r;
    if (Xr(r)) return r.toNumber();
    e();
  }
  function Pn(r, e) {
    return Ur(r) ? r : Xr(r) ? r.toNumber() : e;
  }
  var Wa = function() {
    return Wa = Ct.create, Ct;
  }, qu = [
    "?BigNumber",
    "?Complex",
    "?DenseMatrix",
    "?Fraction"
  ], ku = nr("typed", qu, function(e) {
    var { BigNumber: a, Complex: t, DenseMatrix: n, Fraction: u } = e, f = Wa();
    return f.clear(), f.addTypes([
      {
        name: "number",
        test: Ur
      },
      {
        name: "Complex",
        test: un
      },
      {
        name: "BigNumber",
        test: Xr
      },
      {
        name: "bigint",
        test: tu
      },
      {
        name: "Fraction",
        test: on
      },
      {
        name: "Unit",
        test: Ia
      },
      {
        name: "identifier",
        test: (m) => Pe && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(m)
      },
      {
        name: "string",
        test: Pe
      },
      {
        name: "Chain",
        test: Bu
      },
      {
        name: "Array",
        test: kr
      },
      {
        name: "Matrix",
        test: Nr
      },
      {
        name: "DenseMatrix",
        test: Ua
      },
      {
        name: "SparseMatrix",
        test: $a
      },
      {
        name: "Range",
        test: La
      },
      {
        name: "Index",
        test: sn
      },
      {
        name: "boolean",
        test: nu
      },
      {
        name: "ResultSet",
        test: au
      },
      {
        name: "Help",
        test: iu
      },
      {
        name: "function",
        test: uu
      },
      {
        name: "Date",
        test: ou
      },
      {
        name: "RegExp",
        test: su
      },
      {
        name: "null",
        test: lu
      },
      {
        name: "undefined",
        test: cu
      },
      {
        name: "AccessorNode",
        test: vu
      },
      {
        name: "ArrayNode",
        test: du
      },
      {
        name: "AssignmentNode",
        test: mu
      },
      {
        name: "BlockNode",
        test: pu
      },
      {
        name: "ConditionalNode",
        test: hu
      },
      {
        name: "ConstantNode",
        test: Du
      },
      {
        name: "FunctionNode",
        test: yu
      },
      {
        name: "FunctionAssignmentNode",
        test: gu
      },
      {
        name: "IndexNode",
        test: Eu
      },
      {
        name: "Node",
        test: wu
      },
      {
        name: "ObjectNode",
        test: Au
      },
      {
        name: "OperatorNode",
        test: Fu
      },
      {
        name: "ParenthesisNode",
        test: bu
      },
      {
        name: "RangeNode",
        test: _u
      },
      {
        name: "RelationalNode",
        test: Cu
      },
      {
        name: "SymbolNode",
        test: Su
      },
      {
        name: "Map",
        test: fu
      },
      {
        name: "Object",
        test: fn
      }
    ]), f.addConversions([
      {
        from: "number",
        to: "BigNumber",
        convert: function(v) {
          if (a || Ft(v), Lu(v) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + v + "). Use function bignumber(x) to convert to BigNumber.");
          return new a(v);
        }
      },
      {
        from: "number",
        to: "Complex",
        convert: function(v) {
          return t || bt(v), new t(v, 0);
        }
      },
      {
        from: "BigNumber",
        to: "Complex",
        convert: function(v) {
          return t || bt(v), new t(v.toNumber(), 0);
        }
      },
      {
        from: "bigint",
        to: "number",
        convert: function(v) {
          if (v > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + v + ")");
          return Number(v);
        }
      },
      {
        from: "bigint",
        to: "BigNumber",
        convert: function(v) {
          return a || Ft(v), new a(v.toString());
        }
      },
      {
        from: "bigint",
        to: "Fraction",
        convert: function(v) {
          return u || _t(v), new u(v);
        }
      },
      {
        from: "Fraction",
        to: "BigNumber",
        convert: function(v) {
          throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
        }
      },
      {
        from: "Fraction",
        to: "Complex",
        convert: function(v) {
          return t || bt(v), new t(v.valueOf(), 0);
        }
      },
      {
        from: "number",
        to: "Fraction",
        convert: function(v) {
          u || _t(v);
          var c = new u(v);
          if (c.valueOf() !== v) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + v + "). Use function fraction(x) to convert to Fraction.");
          return c;
        }
      },
      {
        from: "string",
        to: "number",
        convert: function(v) {
          var c = Number(v);
          if (isNaN(c)) throw new Error('Cannot convert "' + v + '" to a number');
          return c;
        }
      },
      {
        from: "string",
        to: "BigNumber",
        convert: function(v) {
          a || Ft(v);
          try {
            return new a(v);
          } catch {
            throw new Error('Cannot convert "' + v + '" to BigNumber');
          }
        }
      },
      {
        from: "string",
        to: "bigint",
        convert: function(v) {
          try {
            return BigInt(v);
          } catch {
            throw new Error('Cannot convert "' + v + '" to BigInt');
          }
        }
      },
      {
        from: "string",
        to: "Fraction",
        convert: function(v) {
          u || _t(v);
          try {
            return new u(v);
          } catch {
            throw new Error('Cannot convert "' + v + '" to Fraction');
          }
        }
      },
      {
        from: "string",
        to: "Complex",
        convert: function(v) {
          t || bt(v);
          try {
            return new t(v);
          } catch {
            throw new Error('Cannot convert "' + v + '" to Complex');
          }
        }
      },
      {
        from: "boolean",
        to: "number",
        convert: function(v) {
          return +v;
        }
      },
      {
        from: "boolean",
        to: "BigNumber",
        convert: function(v) {
          return a || Ft(v), new a(+v);
        }
      },
      {
        from: "boolean",
        to: "bigint",
        convert: function(v) {
          return BigInt(+v);
        }
      },
      {
        from: "boolean",
        to: "Fraction",
        convert: function(v) {
          return u || _t(v), new u(+v);
        }
      },
      {
        from: "boolean",
        to: "string",
        convert: function(v) {
          return String(v);
        }
      },
      {
        from: "Array",
        to: "Matrix",
        convert: function(v) {
          return n || Yu(), new n(v);
        }
      },
      {
        from: "Matrix",
        to: "Array",
        convert: function(v) {
          return v.valueOf();
        }
      }
    ]), f.onMismatch = (m, v, c) => {
      var l = f.createError(m, v, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(l.data.category) && v.length === 1 && dt(v[0]) && c.some((y) => !y.params.includes(","))) {
        var d = new TypeError("Function '".concat(m, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(m, ")'."));
        throw d.data = l.data, d;
      }
      throw l;
    }, f.onMismatch = (m, v, c) => {
      var l = f.createError(m, v, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(l.data.category) && v.length === 1 && dt(v[0]) && c.some((y) => !y.params.includes(","))) {
        var d = new TypeError("Function '".concat(m, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(m, ")'."));
        throw d.data = l.data, d;
      }
      throw l;
    }, f;
  });
  function Ft(r) {
    throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
  }
  function bt(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
  }
  function Yu() {
    throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
  }
  function _t(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
  }
  var Wu = "BigNumber", Xu = [
    "?on",
    "config"
  ], Gu = nr(Wu, Xu, (r) => {
    var { on: e, config: a } = r, t = Tn.clone({
      precision: a.precision,
      modulo: Tn.EUCLID
    });
    return t.prototype = Object.create(t.prototype), t.prototype.type = "BigNumber", t.prototype.isBigNumber = true, t.prototype.toJSON = function() {
      return {
        mathjs: "BigNumber",
        value: this.toString()
      };
    }, t.fromJSON = function(n) {
      return new t(n.value);
    }, e && e("config", function(n, u) {
      n.precision !== u.precision && t.config({
        precision: n.precision
      });
    }), t;
  }, {
    isClass: true
  }), Vu = "Complex", Hu = [], Ku = nr(Vu, Hu, () => (Object.defineProperty(te, "name", {
    value: "Complex"
  }), te.prototype.constructor = te, te.prototype.type = "Complex", te.prototype.isComplex = true, te.prototype.toJSON = function() {
    return {
      mathjs: "Complex",
      re: this.re,
      im: this.im
    };
  }, te.prototype.toPolar = function() {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  }, te.prototype.format = function(r) {
    var e = "", a = this.im, t = this.re, n = jt(this.re, r), u = jt(this.im, r), f = Ur(r) ? r : r ? r.precision : null;
    if (f !== null) {
      var m = Math.pow(10, -f);
      Math.abs(t / a) < m && (t = 0), Math.abs(a / t) < m && (a = 0);
    }
    return a === 0 ? e = n : t === 0 ? a === 1 ? e = "i" : a === -1 ? e = "-i" : e = u + "i" : a < 0 ? a === -1 ? e = n + " - i" : e = n + " - " + u.substring(1) + "i" : a === 1 ? e = n + " + i" : e = n + " + " + u + "i", e;
  }, te.fromPolar = function(r) {
    switch (arguments.length) {
      case 1: {
        var e = arguments[0];
        if (typeof e == "object") return te(e);
        throw new TypeError("Input has to be an object with r and phi keys.");
      }
      case 2: {
        var a = arguments[0], t = arguments[1];
        if (Ur(a)) {
          if (Ia(t) && t.hasBase("ANGLE") && (t = t.toNumber("rad")), Ur(t)) return new te({
            r: a,
            phi: t
          });
          throw new TypeError("Phi is not a number nor an angle unit.");
        } else throw new TypeError("Radius r is not a number.");
      }
      default:
        throw new SyntaxError("Wrong number of arguments in function fromPolar");
    }
  }, te.prototype.valueOf = te.prototype.toString, te.fromJSON = function(r) {
    return new te(r);
  }, te.compare = function(r, e) {
    return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
  }, te), {
    isClass: true
  });
  typeof BigInt > "u" && (BigInt = function(r) {
    if (isNaN(r)) throw new Error("");
    return r;
  });
  const vr = BigInt(0), yr = BigInt(1), pt = BigInt(2), rn = BigInt(5), de = BigInt(10), Qu = 2e3, ur = {
    s: yr,
    n: vr,
    d: yr
  };
  function $e(r, e) {
    try {
      r = BigInt(r);
    } catch {
      throw We();
    }
    return r * e;
  }
  function Te(r) {
    return typeof r == "bigint" ? r : Math.floor(r);
  }
  function qr(r, e) {
    if (e === vr) throw ln();
    const a = Object.create(Ce.prototype);
    a.s = r < vr ? -yr : yr, r = r < vr ? -r : r;
    const t = He(r, e);
    return a.n = r / t, a.d = e / t, a;
  }
  function et(r) {
    const e = {};
    let a = r, t = pt, n = rn - yr;
    for (; n <= a; ) {
      for (; a % t === vr; ) a /= t, e[t] = (e[t] || vr) + yr;
      n += yr + pt * t++;
    }
    return a !== r ? a > 1 && (e[a] = (e[a] || vr) + yr) : e[r] = (e[r] || vr) + yr, e;
  }
  const jr = function(r, e) {
    let a = vr, t = yr, n = yr;
    if (r != null) if (e !== void 0) {
      if (typeof r == "bigint") a = r;
      else {
        if (isNaN(r)) throw We();
        if (r % 1 !== 0) throw zn();
        a = BigInt(r);
      }
      if (typeof e == "bigint") t = e;
      else {
        if (isNaN(e)) throw We();
        if (e % 1 !== 0) throw zn();
        t = BigInt(e);
      }
      n = a * t;
    } else if (typeof r == "object") {
      if ("d" in r && "n" in r) a = BigInt(r.n), t = BigInt(r.d), "s" in r && (a *= BigInt(r.s));
      else if (0 in r) a = BigInt(r[0]), 1 in r && (t = BigInt(r[1]));
      else if (typeof r == "bigint") a = r;
      else throw We();
      n = a * t;
    } else if (typeof r == "number") {
      if (isNaN(r)) throw We();
      if (r < 0 && (n = -yr, r = -r), r % 1 === 0) a = BigInt(r);
      else {
        let u = 1, f = 0, m = 1, v = 1, c = 1, l = 1e7;
        for (r >= 1 && (u = 10 ** Math.floor(1 + Math.log10(r)), r /= u); m <= l && c <= l; ) {
          let d = (f + v) / (m + c);
          if (r === d) {
            m + c <= l ? (a = f + v, t = m + c) : c > m ? (a = v, t = c) : (a = f, t = m);
            break;
          } else r > d ? (f += v, m += c) : (v += f, c += m), m > l ? (a = v, t = c) : (a = f, t = m);
        }
        a = BigInt(a) * BigInt(u), t = BigInt(t);
      }
    } else if (typeof r == "string") {
      let u = 0, f = vr, m = vr, v = vr, c = yr, l = yr, d = r.replace(/_/g, "").match(/\d+|./g);
      if (d === null) throw We();
      if (d[u] === "-" ? (n = -yr, u++) : d[u] === "+" && u++, d.length === u + 1 ? m = $e(d[u++], n) : d[u + 1] === "." || d[u] === "." ? (d[u] !== "." && (f = $e(d[u++], n)), u++, (u + 1 === d.length || d[u + 1] === "(" && d[u + 3] === ")" || d[u + 1] === "'" && d[u + 3] === "'") && (m = $e(d[u], n), c = de ** BigInt(d[u].length), u++), (d[u] === "(" && d[u + 2] === ")" || d[u] === "'" && d[u + 2] === "'") && (v = $e(d[u + 1], n), l = de ** BigInt(d[u + 1].length) - yr, u += 3)) : d[u + 1] === "/" || d[u + 1] === ":" ? (m = $e(d[u], n), c = $e(d[u + 2], yr), u += 3) : d[u + 3] === "/" && d[u + 1] === " " && (f = $e(d[u], n), m = $e(d[u + 2], n), c = $e(d[u + 4], yr), u += 5), d.length <= u) t = c * l, n = a = v + t * f + l * m;
      else throw We();
    } else if (typeof r == "bigint") a = r, n = r, t = yr;
    else throw We();
    if (t === vr) throw ln();
    ur.s = n < vr ? -yr : yr, ur.n = a < vr ? -a : a, ur.d = t < vr ? -t : t;
  };
  function Ju(r, e, a) {
    let t = yr;
    for (; e > vr; r = r * r % a, e >>= yr) e & yr && (t = t * r % a);
    return t;
  }
  function Zu(r, e) {
    for (; e % pt === vr; e /= pt) ;
    for (; e % rn === vr; e /= rn) ;
    if (e === yr) return vr;
    let a = de % e, t = 1;
    for (; a !== yr; t++) if (a = a * de % e, t > Qu) return vr;
    return BigInt(t);
  }
  function ju(r, e, a) {
    let t = yr, n = Ju(de, a, e);
    for (let u = 0; u < 300; u++) {
      if (t === n) return BigInt(u);
      t = t * de % e, n = n * de % e;
    }
    return 0;
  }
  function He(r, e) {
    if (!r) return e;
    if (!e) return r;
    for (; ; ) {
      if (r %= e, !r) return e;
      if (e %= r, !e) return r;
    }
  }
  function Ce(r, e) {
    if (jr(r, e), this instanceof Ce) r = He(ur.d, ur.n), this.s = ur.s, this.n = ur.n / r, this.d = ur.d / r;
    else return qr(ur.s * ur.n, ur.d);
  }
  var ln = function() {
    return new Error("Division by Zero");
  }, We = function() {
    return new Error("Invalid argument");
  }, zn = function() {
    return new Error("Parameters must be integer");
  };
  Ce.prototype = {
    s: yr,
    n: vr,
    d: yr,
    abs: function() {
      return qr(this.n, this.d);
    },
    neg: function() {
      return qr(-this.s * this.n, this.d);
    },
    add: function(r, e) {
      return jr(r, e), qr(this.s * this.n * ur.d + ur.s * this.d * ur.n, this.d * ur.d);
    },
    sub: function(r, e) {
      return jr(r, e), qr(this.s * this.n * ur.d - ur.s * this.d * ur.n, this.d * ur.d);
    },
    mul: function(r, e) {
      return jr(r, e), qr(this.s * ur.s * this.n * ur.n, this.d * ur.d);
    },
    div: function(r, e) {
      return jr(r, e), qr(this.s * ur.s * this.n * ur.d, this.d * ur.n);
    },
    clone: function() {
      return qr(this.s * this.n, this.d);
    },
    mod: function(r, e) {
      if (r === void 0) return qr(this.s * this.n % this.d, yr);
      if (jr(r, e), vr === ur.n * this.d) throw ln();
      return qr(this.s * (ur.d * this.n) % (ur.n * this.d), ur.d * this.d);
    },
    gcd: function(r, e) {
      return jr(r, e), qr(He(ur.n, this.n) * He(ur.d, this.d), ur.d * this.d);
    },
    lcm: function(r, e) {
      return jr(r, e), ur.n === vr && this.n === vr ? qr(vr, yr) : qr(ur.n * this.n, He(ur.n, this.n) * He(ur.d, this.d));
    },
    inverse: function() {
      return qr(this.s * this.d, this.n);
    },
    pow: function(r, e) {
      if (jr(r, e), ur.d === yr) return ur.s < vr ? qr((this.s * this.d) ** ur.n, this.n ** ur.n) : qr((this.s * this.n) ** ur.n, this.d ** ur.n);
      if (this.s < vr) return null;
      let a = et(this.n), t = et(this.d), n = yr, u = yr;
      for (let f in a) if (f !== "1") {
        if (f === "0") {
          n = vr;
          break;
        }
        if (a[f] *= ur.n, a[f] % ur.d === vr) a[f] /= ur.d;
        else return null;
        n *= BigInt(f) ** a[f];
      }
      for (let f in t) if (f !== "1") {
        if (t[f] *= ur.n, t[f] % ur.d === vr) t[f] /= ur.d;
        else return null;
        u *= BigInt(f) ** t[f];
      }
      return ur.s < vr ? qr(u, n) : qr(n, u);
    },
    log: function(r, e) {
      if (jr(r, e), this.s <= vr || ur.s <= vr) return null;
      const a = {}, t = et(ur.n), n = et(ur.d), u = et(this.n), f = et(this.d);
      for (const c in n) t[c] = (t[c] || vr) - n[c];
      for (const c in f) u[c] = (u[c] || vr) - f[c];
      for (const c in t) c !== "1" && (a[c] = true);
      for (const c in u) c !== "1" && (a[c] = true);
      let m = null, v = null;
      for (const c in a) {
        const l = t[c] || vr, d = u[c] || vr;
        if (l === vr) {
          if (d !== vr) return null;
          continue;
        }
        let y = d, p = l;
        const D = He(y, p);
        if (y /= D, p /= D, m === null && v === null) m = y, v = p;
        else if (y * v !== m * p) return null;
      }
      return m !== null && v !== null ? qr(m, v) : null;
    },
    equals: function(r, e) {
      return jr(r, e), this.s * this.n * ur.d === ur.s * ur.n * this.d;
    },
    lt: function(r, e) {
      return jr(r, e), this.s * this.n * ur.d < ur.s * ur.n * this.d;
    },
    lte: function(r, e) {
      return jr(r, e), this.s * this.n * ur.d <= ur.s * ur.n * this.d;
    },
    gt: function(r, e) {
      return jr(r, e), this.s * this.n * ur.d > ur.s * ur.n * this.d;
    },
    gte: function(r, e) {
      return jr(r, e), this.s * this.n * ur.d >= ur.s * ur.n * this.d;
    },
    compare: function(r, e) {
      jr(r, e);
      let a = this.s * this.n * ur.d - ur.s * ur.n * this.d;
      return (vr < a) - (a < vr);
    },
    ceil: function(r) {
      return r = de ** BigInt(r || 0), qr(Te(this.s * r * this.n / this.d) + (r * this.n % this.d > vr && this.s >= vr ? yr : vr), r);
    },
    floor: function(r) {
      return r = de ** BigInt(r || 0), qr(Te(this.s * r * this.n / this.d) - (r * this.n % this.d > vr && this.s < vr ? yr : vr), r);
    },
    round: function(r) {
      return r = de ** BigInt(r || 0), qr(Te(this.s * r * this.n / this.d) + this.s * ((this.s >= vr ? yr : vr) + pt * (r * this.n % this.d) > this.d ? yr : vr), r);
    },
    roundTo: function(r, e) {
      jr(r, e);
      const a = this.n * ur.d, t = this.d * ur.n, n = a % t;
      let u = Te(a / t);
      return n + n >= t && u++, qr(this.s * u * ur.n, ur.d);
    },
    divisible: function(r, e) {
      return jr(r, e), !(!(ur.n * this.d) || this.n * ur.d % (ur.n * this.d));
    },
    valueOf: function() {
      return Number(this.s * this.n) / Number(this.d);
    },
    toString: function(r) {
      let e = this.n, a = this.d;
      r = r || 15;
      let t = Zu(e, a), n = ju(e, a, t), u = this.s < vr ? "-" : "";
      if (u += Te(e / a), e %= a, e *= de, e && (u += "."), t) {
        for (let f = n; f--; ) u += Te(e / a), e %= a, e *= de;
        u += "(";
        for (let f = t; f--; ) u += Te(e / a), e %= a, e *= de;
        u += ")";
      } else for (let f = r; e && f--; ) u += Te(e / a), e %= a, e *= de;
      return u;
    },
    toFraction: function(r) {
      let e = this.n, a = this.d, t = this.s < vr ? "-" : "";
      if (a === yr) t += e;
      else {
        let n = Te(e / a);
        r && n > vr && (t += n, t += " ", e %= a), t += e, t += "/", t += a;
      }
      return t;
    },
    toLatex: function(r) {
      let e = this.n, a = this.d, t = this.s < vr ? "-" : "";
      if (a === yr) t += e;
      else {
        let n = Te(e / a);
        r && n > vr && (t += n, e %= a), t += "\\frac{", t += e, t += "}{", t += a, t += "}";
      }
      return t;
    },
    toContinued: function() {
      let r = this.n, e = this.d, a = [];
      do {
        a.push(Te(r / e));
        let t = r % e;
        r = e, e = t;
      } while (r !== yr);
      return a;
    },
    simplify: function(r) {
      const e = BigInt(1 / (r || 1e-3) | 0), a = this.abs(), t = a.toContinued();
      for (let n = 1; n < t.length; n++) {
        let u = qr(t[n - 1], yr);
        for (let m = n - 2; m >= 0; m--) u = u.inverse().add(t[m]);
        let f = u.sub(a);
        if (f.n * e < f.d) return u.mul(this.s);
      }
      return this;
    }
  };
  var ro = "Fraction", eo = [], to = nr(ro, eo, () => (Object.defineProperty(Ce, "name", {
    value: "Fraction"
  }), Ce.prototype.constructor = Ce, Ce.prototype.type = "Fraction", Ce.prototype.isFraction = true, Ce.prototype.toJSON = function() {
    return {
      mathjs: "Fraction",
      n: String(this.s * this.n),
      d: String(this.d)
    };
  }, Ce.fromJSON = function(r) {
    return new Ce(r);
  }, Ce), {
    isClass: true
  }), no = "Matrix", ao = [], io = nr(no, ao, () => {
    function r() {
      if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
    }
    return r.prototype.type = "Matrix", r.prototype.isMatrix = true, r.prototype.storage = function() {
      throw new Error("Cannot invoke storage on a Matrix interface");
    }, r.prototype.datatype = function() {
      throw new Error("Cannot invoke datatype on a Matrix interface");
    }, r.prototype.create = function(e, a) {
      throw new Error("Cannot invoke create on a Matrix interface");
    }, r.prototype.subset = function(e, a, t) {
      throw new Error("Cannot invoke subset on a Matrix interface");
    }, r.prototype.get = function(e) {
      throw new Error("Cannot invoke get on a Matrix interface");
    }, r.prototype.set = function(e, a, t) {
      throw new Error("Cannot invoke set on a Matrix interface");
    }, r.prototype.resize = function(e, a) {
      throw new Error("Cannot invoke resize on a Matrix interface");
    }, r.prototype.reshape = function(e, a) {
      throw new Error("Cannot invoke reshape on a Matrix interface");
    }, r.prototype.clone = function() {
      throw new Error("Cannot invoke clone on a Matrix interface");
    }, r.prototype.size = function() {
      throw new Error("Cannot invoke size on a Matrix interface");
    }, r.prototype.map = function(e, a) {
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
  function Zt(r, e, a) {
    var t = r.constructor, n = new t(2), u = "";
    if (a) {
      if (a < 1) throw new Error("size must be in greater than 0");
      if (!$r(a)) throw new Error("size must be an integer");
      if (r.greaterThan(n.pow(a - 1).sub(1)) || r.lessThan(n.pow(a - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(a - 1, ", 2^").concat(a - 1, "-1]"));
      if (!r.isInteger()) throw new Error("Value must be an integer");
      r.lessThan(0) && (r = r.add(n.pow(a))), u = "i".concat(a);
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
  function uo(r, e) {
    if (typeof e == "function") return e(r);
    if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
    var { notation: a, precision: t, wordSize: n } = ka(e);
    switch (a) {
      case "fixed":
        return so(r, t);
      case "exponential":
        return Rn(r, t);
      case "engineering":
        return oo(r, t);
      case "bin":
        return Zt(r, 2, n);
      case "oct":
        return Zt(r, 8, n);
      case "hex":
        return Zt(r, 16, n);
      case "auto": {
        var u = In(e == null ? void 0 : e.lowerExp, -3), f = In(e == null ? void 0 : e.upperExp, 5);
        if (r.isZero()) return "0";
        var m, v = r.toSignificantDigits(t), c = v.e;
        return c >= u && c < f ? m = v.toFixed() : m = Rn(r, t), m.replace(/((\.\d*?)(0+))($|e)/, function() {
          var l = arguments[2], d = arguments[4];
          return l !== "." ? l + d : d;
        });
      }
      default:
        throw new Error('Unknown notation "' + a + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function oo(r, e) {
    var a = r.e, t = a % 3 === 0 ? a : a < 0 ? a - 3 - a % 3 : a - a % 3, n = r.mul(Math.pow(10, -t)), u = n.toPrecision(e);
    if (u.includes("e")) {
      var f = r.constructor;
      u = new f(u).toFixed();
    }
    return u + "e" + (a >= 0 ? "+" : "") + t.toString();
  }
  function Rn(r, e) {
    return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
  }
  function so(r, e) {
    return r.toFixed(e);
  }
  function In(r, e) {
    return Ur(r) ? r : Xr(r) ? r.toNumber() : e;
  }
  function Lr(r, e) {
    var a = fo(r, e);
    return e && typeof e == "object" && "truncate" in e && a.length > e.truncate ? a.substring(0, e.truncate - 3) + "..." : a;
  }
  function fo(r, e) {
    if (typeof r == "number") return jt(r, e);
    if (Xr(r)) return uo(r, e);
    if (lo(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
    if (Array.isArray(r)) return Xa(r, e);
    if (Pe(r)) return Un(r);
    if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
    if (r && typeof r == "object") {
      if (typeof r.format == "function") return r.format(e);
      if (r && r.toString(e) !== {}.toString()) return r.toString(e);
      var a = Object.keys(r).map((t) => Un(t) + ": " + Lr(r[t], e));
      return "{" + a.join(", ") + "}";
    }
    return String(r);
  }
  function Un(r) {
    for (var e = String(r), a = "", t = 0; t < e.length; ) {
      var n = e.charAt(t);
      a += n in $n ? $n[n] : n, t++;
    }
    return '"' + a + '"';
  }
  var $n = {
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t"
  };
  function Xa(r, e) {
    if (Array.isArray(r)) {
      for (var a = "[", t = r.length, n = 0; n < t; n++) n !== 0 && (a += ", "), a += Xa(r[n], e);
      return a += "]", a;
    } else return Lr(r, e);
  }
  function lo(r) {
    return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
  }
  function xr(r, e, a) {
    if (!(this instanceof xr)) throw new SyntaxError("Constructor must be called with the new operator");
    this.actual = r, this.expected = e, this.relation = a, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
  }
  xr.prototype = new RangeError();
  xr.prototype.constructor = RangeError;
  xr.prototype.name = "DimensionError";
  xr.prototype.isDimensionError = true;
  function Ge(r, e, a) {
    if (!(this instanceof Ge)) throw new SyntaxError("Constructor must be called with the new operator");
    this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = a), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
  }
  Ge.prototype = new RangeError();
  Ge.prototype.constructor = RangeError;
  Ge.prototype.name = "IndexError";
  Ge.prototype.isIndexError = true;
  function Br(r) {
    for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
    return e;
  }
  function Ga(r, e, a) {
    var t, n = r.length;
    if (n !== e[a]) throw new xr(n, e[a]);
    if (a < e.length - 1) {
      var u = a + 1;
      for (t = 0; t < n; t++) {
        var f = r[t];
        if (!Array.isArray(f)) throw new xr(e.length - 1, e.length, "<");
        Ga(r[t], e, u);
      }
    } else for (t = 0; t < n; t++) if (Array.isArray(r[t])) throw new xr(e.length + 1, e.length, ">");
  }
  function Ln(r, e) {
    var a = e.length === 0;
    if (a) {
      if (Array.isArray(r)) throw new xr(r.length, 0);
    } else Ga(r, e, 0);
  }
  function Wr(r, e) {
    if (r !== void 0) {
      if (!Ur(r) || !$r(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
      if (r < 0 || typeof e == "number" && r >= e) throw new Ge(r, e);
    }
  }
  function Bt(r, e, a) {
    if (!Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new Error("Resizing to scalar is not supported");
    e.forEach(function(n) {
      if (!Ur(n) || !$r(n) || n < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Lr(e) + ")");
    }), (Ur(r) || Xr(r)) && (r = [
      r
    ]);
    var t = a !== void 0 ? a : 0;
    return en(r, e, 0, t), r;
  }
  function en(r, e, a, t) {
    var n, u, f = r.length, m = e[a], v = Math.min(f, m);
    if (r.length = m, a < e.length - 1) {
      var c = a + 1;
      for (n = 0; n < v; n++) u = r[n], Array.isArray(u) || (u = [
        u
      ], r[n] = u), en(u, e, c, t);
      for (n = v; n < m; n++) u = [], r[n] = u, en(u, e, c, t);
    } else {
      for (n = 0; n < v; n++) for (; Array.isArray(r[n]); ) r[n] = r[n][0];
      for (n = v; n < m; n++) r[n] = t;
    }
  }
  function cn(r, e) {
    var a = tn(r, true), t = a.length;
    if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new xr(0, t, "!=");
    e = vn(e, t);
    var n = Va(e);
    if (t !== n) throw new xr(n, t, "!=");
    try {
      return co(a, e);
    } catch (u) {
      throw u instanceof xr ? new xr(n, t, "!=") : u;
    }
  }
  function vn(r, e) {
    var a = Va(r), t = r.slice(), n = -1, u = r.indexOf(n), f = r.indexOf(n, u + 1) >= 0;
    if (f) throw new Error("More than one wildcard in sizes");
    var m = u >= 0, v = e % a === 0;
    if (m) if (v) t[u] = -e / a;
    else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -a);
    return t;
  }
  function Va(r) {
    return r.reduce((e, a) => e * a, 1);
  }
  function co(r, e) {
    for (var a = r, t, n = e.length - 1; n > 0; n--) {
      var u = e[n];
      t = [];
      for (var f = a.length / u, m = 0; m < f; m++) t.push(a.slice(m * u, (m + 1) * u));
      a = t;
    }
    return a;
  }
  function qn(r, e) {
    for (var a = Br(r); Array.isArray(r) && r.length === 1; ) r = r[0], a.shift();
    for (var t = a.length; a[t - 1] === 1; ) t--;
    return t < a.length && (r = Ha(r, t, 0), a.length = t), r;
  }
  function Ha(r, e, a) {
    var t, n;
    if (a < e) {
      var u = a + 1;
      for (t = 0, n = r.length; t < n; t++) r[t] = Ha(r[t], e, u);
    } else for (; Array.isArray(r); ) r = r[0];
    return r;
  }
  function Ka(r, e, a, t) {
    var n = t || Br(r);
    if (a) for (var u = 0; u < a; u++) r = [
      r
    ], n.unshift(1);
    for (r = Qa(r, e, 0); n.length < e; ) n.push(1);
    return r;
  }
  function Qa(r, e, a) {
    var t, n;
    if (Array.isArray(r)) {
      var u = a + 1;
      for (t = 0, n = r.length; t < n; t++) r[t] = Qa(r[t], e, u);
    } else for (var f = a; f < e; f++) r = [
      r
    ];
    return r;
  }
  function tn(r) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!Array.isArray(r)) return r;
    if (typeof e != "boolean") throw new TypeError("Boolean expected for second argument of flatten");
    var a = [];
    return e ? n(r) : t(r), a;
    function t(u) {
      for (var f = 0; f < u.length; f++) {
        var m = u[f];
        Array.isArray(m) ? t(m) : a.push(m);
      }
    }
    function n(u) {
      if (Array.isArray(u[0])) for (var f = 0; f < u.length; f++) n(u[f]);
      else for (var m = 0; m < u.length; m++) a.push(u[m]);
    }
  }
  function Lt(r, e) {
    for (var a, t = 0, n = 0; n < r.length; n++) {
      var u = r[n], f = Array.isArray(u);
      if (n === 0 && f && (t = u.length), f && u.length !== t) return;
      var m = f ? Lt(u, e) : e(u);
      if (a === void 0) a = m;
      else if (a !== m) return "mixed";
    }
    return a;
  }
  function Ja(r, e, a, t) {
    if (t < a) {
      if (r.length !== e.length) throw new xr(r.length, e.length);
      for (var n = [], u = 0; u < r.length; u++) n[u] = Ja(r[u], e[u], a, t + 1);
      return n;
    } else return r.concat(e);
  }
  function Za() {
    var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
    if (r.length === 1) return r[0];
    if (r.length > 1) return r.slice(1).reduce(function(a, t) {
      return Ja(a, t, e, 0);
    }, r[0]);
    throw new Error("Wrong number of arguments in function concat");
  }
  function ja() {
    for (var r = arguments.length, e = new Array(r), a = 0; a < r; a++) e[a] = arguments[a];
    for (var t = e.map((y) => y.length), n = Math.max(...t), u = new Array(n).fill(null), f = 0; f < e.length; f++) for (var m = e[f], v = t[f], c = 0; c < v; c++) {
      var l = n - v + c;
      m[c] > u[l] && (u[l] = m[c]);
    }
    for (var d = 0; d < e.length; d++) ri(e[d], u);
    return u;
  }
  function ri(r, e) {
    for (var a = e.length, t = r.length, n = 0; n < t; n++) {
      var u = a - t + n;
      if (r[n] < e[u] && r[n] > 1 || r[n] > e[u]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(t, " with size ").concat(r[n], " to size ").concat(e[u]));
    }
  }
  function nn(r, e) {
    var a = Br(r);
    if (Xe(a, e)) return r;
    ri(a, e);
    var t = ja(a, e), n = t.length, u = [
      ...Array(n - a.length).fill(1),
      ...a
    ], f = po(r);
    a.length < n && (f = cn(f, u), a = Br(f));
    for (var m = 0; m < n; m++) a[m] < t[m] && (f = vo(f, t[m], m), a = Br(f));
    return f;
  }
  function vo(r, e, a) {
    return Za(...Array(e).fill(r), a);
  }
  function ei(r, e) {
    if (!Array.isArray(r)) throw new Error("Array expected");
    var a = Br(r);
    if (e.length !== a.length) throw new xr(e.length, a.length);
    for (var t = 0; t < e.length; t++) Wr(e[t], a[t]);
    return e.reduce((n, u) => n[u], r);
  }
  function kn(r, e) {
    var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (r.length === 0) return [];
    if (a) return u(r);
    var t = [];
    return n(r, 0);
    function n(f, m) {
      if (Array.isArray(f)) {
        for (var v = f.length, c = Array(v), l = 0; l < v; l++) t[m] = l, c[l] = n(f[l], m + 1);
        return c;
      } else return e(f, t.slice(0, m), r);
    }
    function u(f) {
      if (Array.isArray(f)) {
        for (var m = f.length, v = Array(m), c = 0; c < m; c++) v[c] = u(f[c]);
        return v;
      } else return e(f);
    }
  }
  function mo(r, e) {
    var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (r.length === 0) return;
    if (a) {
      u(r);
      return;
    }
    var t = [];
    n(r, 0);
    function n(f, m) {
      if (Array.isArray(f)) for (var v = f.length, c = 0; c < v; c++) t[m] = c, n(f[c], m + 1);
      else e(f, t.slice(0, m), r);
    }
    function u(f) {
      if (Array.isArray(f)) for (var m = f.length, v = 0; v < m; v++) u(f[v]);
      else e(f);
    }
  }
  function po(r) {
    return It([], r);
  }
  function Mt(r, e, a) {
    var t = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (Ct.isTypedFunction(r)) {
      var n;
      if (t) n = 1;
      else {
        var u = (e.isMatrix ? e.size() : Br(e)).map(() => 0), f = e.isMatrix ? e.get(u) : ei(e, u);
        n = go(r, f, u, e);
      }
      var m;
      if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
        var v = ho(r, n);
        m = v !== void 0 ? v : r;
      } else m = r;
      return n >= 1 && n <= 3 ? {
        isUnary: n === 1,
        fn: function() {
          for (var l = arguments.length, d = new Array(l), y = 0; y < l; y++) d[y] = arguments[y];
          return Yn(m, d.slice(0, n), a, r.name);
        }
      } : {
        isUnary: false,
        fn: function() {
          for (var l = arguments.length, d = new Array(l), y = 0; y < l; y++) d[y] = arguments[y];
          return Yn(m, d, a, r.name);
        }
      };
    }
    return t === void 0 ? {
      isUnary: Do(r),
      fn: r
    } : {
      isUnary: t,
      fn: r
    };
  }
  function ho(r, e) {
    var a = [];
    if (Object.entries(r.signatures).forEach((t) => {
      var [n, u] = t;
      n.split(",").length === e && a.push(u);
    }), a.length === 1) return a[0];
  }
  function Do(r) {
    if (r.length !== 1) return false;
    var e = r.toString();
    if (/arguments/.test(e)) return false;
    var a = e.match(/\(.*?\)/);
    return !/\.\.\./.test(a);
  }
  function go(r, e, a, t) {
    for (var n = [
      e,
      a,
      t
    ], u = 3; u > 0; u--) {
      var f = n.slice(0, u);
      if (Ct.resolve(r, f) !== null) return u;
    }
  }
  function Yn(r, e, a, t) {
    try {
      return r(...e);
    } catch (n) {
      yo(n, e, a, t);
    }
  }
  function yo(r, e, a, t) {
    var n;
    if (r instanceof TypeError && ((n = r.data) === null || n === void 0 ? void 0 : n.category) === "wrongType") {
      var u = [];
      throw u.push("value: ".concat(ye(e[0]))), e.length >= 2 && u.push("index: ".concat(ye(e[1]))), e.length >= 3 && u.push("array: ".concat(ye(e[2]))), new TypeError("Function ".concat(a, " cannot apply callback arguments ") + "".concat(t, "(").concat(u.join(", "), ") at index ").concat(JSON.stringify(e[1])));
    } else throw new TypeError("Function ".concat(a, " cannot apply callback arguments ") + "to function ".concat(t, ": ").concat(r.message));
  }
  var Eo = "DenseMatrix", wo = [
    "Matrix"
  ], Ao = nr(Eo, wo, (r) => {
    var { Matrix: e } = r;
    function a(l, d) {
      if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
      if (d && !Pe(d)) throw new Error("Invalid datatype: " + d);
      if (Nr(l)) l.type === "DenseMatrix" ? (this._data = Mr(l._data), this._size = Mr(l._size), this._datatype = d || l._datatype) : (this._data = l.toArray(), this._size = l.size(), this._datatype = d || l._datatype);
      else if (l && kr(l.data) && kr(l.size)) this._data = l.data, this._size = l.size, Ln(this._data, this._size), this._datatype = d || l.datatype;
      else if (kr(l)) this._data = c(l), this._size = Br(this._data), Ln(this._data, this._size), this._datatype = d;
      else {
        if (l) throw new TypeError("Unsupported type of data (" + ye(l) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = d;
      }
    }
    a.prototype = new e(), a.prototype.createDenseMatrix = function(l, d) {
      return new a(l, d);
    }, Object.defineProperty(a, "name", {
      value: "DenseMatrix"
    }), a.prototype.constructor = a, a.prototype.type = "DenseMatrix", a.prototype.isDenseMatrix = true, a.prototype.getDataType = function() {
      return Lt(this._data, ye);
    }, a.prototype.storage = function() {
      return "dense";
    }, a.prototype.datatype = function() {
      return this._datatype;
    }, a.prototype.create = function(l, d) {
      return new a(l, d);
    }, a.prototype.subset = function(l, d, y) {
      switch (arguments.length) {
        case 1:
          return t(this, l);
        case 2:
        case 3:
          return u(this, l, d, y);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    }, a.prototype.get = function(l) {
      return ei(this._data, l);
    }, a.prototype.set = function(l, d, y) {
      if (!kr(l)) throw new TypeError("Array expected");
      if (l.length < this._size.length) throw new xr(l.length, this._size.length, "<");
      var p, D, s, E = l.map(function(B) {
        return B + 1;
      });
      v(this, E, y);
      var w = this._data;
      for (p = 0, D = l.length - 1; p < D; p++) s = l[p], Wr(s, w.length), w = w[s];
      return s = l[l.length - 1], Wr(s, w.length), w[s] = d, this;
    };
    function t(l, d) {
      if (!sn(d)) throw new TypeError("Invalid index");
      var y = d.isScalar();
      if (y) return l.get(d.min());
      var p = d.size();
      if (p.length !== l._size.length) throw new xr(p.length, l._size.length);
      for (var D = d.min(), s = d.max(), E = 0, w = l._size.length; E < w; E++) Wr(D[E], l._size[E]), Wr(s[E], l._size[E]);
      return new a(n(l._data, d, p.length, 0), l._datatype);
    }
    function n(l, d, y, p) {
      var D = p === y - 1, s = d.dimension(p);
      return D ? s.map(function(E) {
        return Wr(E, l.length), l[E];
      }).valueOf() : s.map(function(E) {
        Wr(E, l.length);
        var w = l[E];
        return n(w, d, y, p + 1);
      }).valueOf();
    }
    function u(l, d, y, p) {
      if (!d || d.isIndex !== true) throw new TypeError("Invalid index");
      var D = d.size(), s = d.isScalar(), E;
      if (Nr(y) ? (E = y.size(), y = y.valueOf()) : E = Br(y), s) {
        if (E.length !== 0) throw new TypeError("Scalar expected");
        l.set(d.min(), y, p);
      } else {
        if (!Xe(E, D)) try {
          E.length === 0 ? y = nn([
            y
          ], D) : y = nn(y, D), E = Br(y);
        } catch {
        }
        if (D.length < l._size.length) throw new xr(D.length, l._size.length, "<");
        if (E.length < D.length) {
          for (var w = 0, B = 0; D[w] === 1 && E[w] === 1; ) w++;
          for (; D[w] === 1; ) B++, w++;
          y = Ka(y, D.length, B, E);
        }
        if (!Xe(D, E)) throw new xr(D, E, ">");
        var A = d.max().map(function(F) {
          return F + 1;
        });
        v(l, A, p);
        var x = D.length, _ = 0;
        f(l._data, d, y, x, _);
      }
      return l;
    }
    function f(l, d, y, p, D) {
      var s = D === p - 1, E = d.dimension(D);
      s ? E.forEach(function(w, B) {
        Wr(w), l[w] = y[B[0]];
      }) : E.forEach(function(w, B) {
        Wr(w), f(l[w], d, y[B[0]], p, D + 1);
      });
    }
    a.prototype.resize = function(l, d, y) {
      if (!dt(l)) throw new TypeError("Array or Matrix expected");
      var p = l.valueOf().map((s) => Array.isArray(s) && s.length === 1 ? s[0] : s), D = y ? this.clone() : this;
      return m(D, p, d);
    };
    function m(l, d, y) {
      if (d.length === 0) {
        for (var p = l._data; kr(p); ) p = p[0];
        return p;
      }
      return l._size = d.slice(0), l._data = Bt(l._data, l._size, y), l;
    }
    a.prototype.reshape = function(l, d) {
      var y = d ? this.clone() : this;
      y._data = cn(y._data, l);
      var p = y._size.reduce((D, s) => D * s);
      return y._size = vn(l, p), y;
    };
    function v(l, d, y) {
      for (var p = l._size.slice(0), D = false; p.length < d.length; ) p.push(0), D = true;
      for (var s = 0, E = d.length; s < E; s++) d[s] > p[s] && (p[s] = d[s], D = true);
      D && m(l, p, y);
    }
    a.prototype.clone = function() {
      var l = new a({
        data: Mr(this._data),
        size: Mr(this._size),
        datatype: this._datatype
      });
      return l;
    }, a.prototype.size = function() {
      return this._size.slice(0);
    }, a.prototype._forEach = function(l) {
      var d = l.length === 2, y = this._size.length - 1;
      if (y < 0) return;
      if (d) {
        E(this._data);
        return;
      }
      if (y === 0) {
        for (var p = 0; p < this._data.length; p++) l(this._data, p, [
          p
        ]);
        return;
      }
      var D = new Array(y + 1);
      s(this._data);
      function s(w) {
        var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        if (B < y) for (var A = 0; A < w.length; A++) D[B] = A, s(w[A], B + 1);
        else for (var x = 0; x < w.length; x++) D[B] = x, l(w, x, D.slice());
      }
      function E(w) {
        var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        if (B < y) for (var A = 0; A < w.length; A++) E(w[A], B + 1);
        else for (var x = 0; x < w.length; x++) l(w, x);
      }
    }, a.prototype.map = function(l) {
      var d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, y = this, p = new a(y), D = Mt(l, y._data, "map", d), s = d || D.isUnary ? (E, w) => {
        E[w] = D.fn(E[w]);
      } : (E, w, B) => {
        E[w] = D.fn(E[w], B, y);
      };
      return p._forEach(s), p;
    }, a.prototype.forEach = function(l) {
      var d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, y = this, p = Mt(l, y._data, "map", d), D = d || p.isUnary ? (s, E) => {
        p.fn(s[E]);
      } : (s, E, w) => {
        p.fn(s[E], w, y);
      };
      y._forEach(D);
    }, a.prototype[Symbol.iterator] = function* () {
      var l = this._size.length - 1;
      if (!(l < 0)) {
        if (l === 0) {
          for (var d = 0; d < this._data.length; d++) yield {
            value: this._data[d],
            index: [
              d
            ]
          };
          return;
        }
        var y = [], p = function* (s, E) {
          if (E < l) for (var w = 0; w < s.length; w++) y[E] = w, yield* p(s[w], E + 1);
          else for (var B = 0; B < s.length; B++) y[E] = B, yield {
            value: s[B],
            index: y.slice()
          };
        };
        yield* p(this._data, 0);
      }
    }, a.prototype.rows = function() {
      var l = [], d = this.size();
      if (d.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      var y = this._data;
      for (var p of y) l.push(new a([
        p
      ], this._datatype));
      return l;
    }, a.prototype.columns = function() {
      var l = this, d = [], y = this.size();
      if (y.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      for (var p = this._data, D = function(w) {
        var B = p.map((A) => [
          A[w]
        ]);
        d.push(new a(B, l._datatype));
      }, s = 0; s < y[1]; s++) D(s);
      return d;
    }, a.prototype.toArray = function() {
      return Mr(this._data);
    }, a.prototype.valueOf = function() {
      return this._data;
    }, a.prototype.format = function(l) {
      return Lr(this._data, l);
    }, a.prototype.toString = function() {
      return Lr(this._data);
    }, a.prototype.toJSON = function() {
      return {
        mathjs: "DenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, a.prototype.diagonal = function(l) {
      if (l) {
        if (Xr(l) && (l = l.toNumber()), !Ur(l) || !$r(l)) throw new TypeError("The parameter k must be an integer number");
      } else l = 0;
      for (var d = l > 0 ? l : 0, y = l < 0 ? -l : 0, p = this._size[0], D = this._size[1], s = Math.min(p - y, D - d), E = [], w = 0; w < s; w++) E[w] = this._data[w + y][w + d];
      return new a({
        data: E,
        size: [
          s
        ],
        datatype: this._datatype
      });
    }, a.diagonal = function(l, d, y, p) {
      if (!kr(l)) throw new TypeError("Array expected, size parameter");
      if (l.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (l = l.map(function(N) {
        if (Xr(N) && (N = N.toNumber()), !Ur(N) || !$r(N) || N < 1) throw new Error("Size values must be positive integers");
        return N;
      }), y) {
        if (Xr(y) && (y = y.toNumber()), !Ur(y) || !$r(y)) throw new TypeError("The parameter k must be an integer number");
      } else y = 0;
      var D = y > 0 ? y : 0, s = y < 0 ? -y : 0, E = l[0], w = l[1], B = Math.min(E - s, w - D), A;
      if (kr(d)) {
        if (d.length !== B) throw new Error("Invalid value array length");
        A = function(S) {
          return d[S];
        };
      } else if (Nr(d)) {
        var x = d.size();
        if (x.length !== 1 || x[0] !== B) throw new Error("Invalid matrix length");
        A = function(S) {
          return d.get([
            S
          ]);
        };
      } else A = function() {
        return d;
      };
      p || (p = Xr(A(0)) ? A(0).mul(0) : 0);
      var _ = [];
      if (l.length > 0) {
        _ = Bt(_, l, p);
        for (var F = 0; F < B; F++) _[F + s][F + D] = A(F);
      }
      return new a({
        data: _,
        size: [
          E,
          w
        ]
      });
    }, a.fromJSON = function(l) {
      return new a(l);
    }, a.prototype.swapRows = function(l, d) {
      if (!Ur(l) || !$r(l) || !Ur(d) || !$r(d)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return Wr(l, this._size[0]), Wr(d, this._size[0]), a._swapRows(l, d, this._data), this;
    }, a._swapRows = function(l, d, y) {
      var p = y[l];
      y[l] = y[d], y[d] = p;
    };
    function c(l) {
      return Nr(l) ? c(l.valueOf()) : kr(l) ? l.map(c) : l;
    }
    return a;
  }, {
    isClass: true
  });
  function Fo(r) {
    var e = r.length, a = r[0].length, t, n, u = [];
    for (n = 0; n < a; n++) {
      var f = [];
      for (t = 0; t < e; t++) f.push(r[t][n]);
      u.push(f);
    }
    return u;
  }
  function bo(r) {
    for (var e = 0; e < r.length; e++) if (dt(r[e])) return true;
    return false;
  }
  function _o(r, e) {
    Nr(r) ? r.forEach((a) => e(a), false, true) : mo(r, e, true);
  }
  function Ee(r, e, a) {
    if (!a) return Nr(r) ? r.map((n) => e(n), false, true) : kn(r, e, true);
    var t = (n) => n === 0 ? n : e(n);
    return Nr(r) ? r.map((n) => t(n), false, true) : kn(r, t, true);
  }
  function Co(r, e, a) {
    var t = Array.isArray(r) ? Br(r) : r.size();
    if (e < 0 || e >= t.length) throw new Ge(e, t.length);
    return Nr(r) ? r.create(xt(r.valueOf(), e, a), r.datatype()) : xt(r, e, a);
  }
  function xt(r, e, a) {
    var t, n, u, f;
    if (e <= 0) if (Array.isArray(r[0])) {
      for (f = Fo(r), n = [], t = 0; t < f.length; t++) n[t] = xt(f[t], e - 1, a);
      return n;
    } else {
      for (u = r[0], t = 1; t < r.length; t++) u = a(u, r[t]);
      return u;
    }
    else {
      for (n = [], t = 0; t < r.length; t++) n[t] = xt(r[t], e - 1, a);
      return n;
    }
  }
  var Wn = "isInteger", So = [
    "typed"
  ], Bo = nr(Wn, So, (r) => {
    var { typed: e } = r;
    return e(Wn, {
      number: $r,
      BigNumber: function(t) {
        return t.isInt();
      },
      bigint: function(t) {
        return true;
      },
      Fraction: function(t) {
        return t.d === 1n;
      },
      "Array | Matrix": e.referToSelf((a) => (t) => Ee(t, a))
    });
  }), dn = "number", qt = "number, number";
  function ti(r) {
    return Math.abs(r);
  }
  ti.signature = dn;
  function ni(r, e) {
    return r + e;
  }
  ni.signature = qt;
  function ai(r, e) {
    return r - e;
  }
  ai.signature = qt;
  function ii(r, e) {
    return r * e;
  }
  ii.signature = qt;
  function ui(r) {
    return -r;
  }
  ui.signature = dn;
  function an(r) {
    return Ru(r);
  }
  an.signature = dn;
  function oi(r, e) {
    return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
  }
  oi.signature = qt;
  var Mo = "number";
  function si(r) {
    return r > 0;
  }
  si.signature = Mo;
  function at(r, e) {
    var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, t = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (a <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (t < 0) throw new Error("Absolute tolerance must be at least 0");
    return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(a), t));
  }
  var Xn = "isPositive", xo = [
    "typed",
    "config"
  ], No = nr(Xn, xo, (r) => {
    var { typed: e, config: a } = r;
    return e(Xn, {
      number: (t) => ke(t, 0, a.relTol, a.absTol) ? false : si(t),
      BigNumber: (t) => at(t, new t.constructor(0), a.relTol, a.absTol) ? false : !t.isNeg() && !t.isZero() && !t.isNaN(),
      bigint: (t) => t > 0n,
      Fraction: (t) => t.s > 0n && t.n > 0n,
      Unit: e.referToSelf((t) => (n) => e.find(t, n.valueType())(n.value)),
      "Array | Matrix": e.referToSelf((t) => (n) => Ee(n, t))
    });
  }), Gn = "isZero", To = [
    "typed",
    "equalScalar"
  ], Oo = nr(Gn, To, (r) => {
    var { typed: e, equalScalar: a } = r;
    return e(Gn, {
      "number | BigNumber | Complex | Fraction": (t) => a(t, 0),
      bigint: (t) => t === 0n,
      Unit: e.referToSelf((t) => (n) => e.find(t, n.valueType())(n.value)),
      "Array | Matrix": e.referToSelf((t) => (n) => Ee(n, t))
    });
  });
  function Po(r, e, a, t) {
    return ke(r.re, e.re, a, t) && ke(r.im, e.im, a, t);
  }
  var ht = nr("compareUnits", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      "Unit, Unit": e.referToSelf((a) => (t, n) => {
        if (!t.equalBase(n)) throw new Error("Cannot compare units with different base");
        return e.find(a, [
          t.valueType(),
          n.valueType()
        ])(t.value, n.value);
      })
    };
  }), Nt = "equalScalar", zo = [
    "typed",
    "config"
  ], Ro = nr(Nt, zo, (r) => {
    var { typed: e, config: a } = r, t = ht({
      typed: e
    });
    return e(Nt, {
      "boolean, boolean": function(u, f) {
        return u === f;
      },
      "number, number": function(u, f) {
        return ke(u, f, a.relTol, a.absTol);
      },
      "BigNumber, BigNumber": function(u, f) {
        return u.eq(f) || at(u, f, a.relTol, a.absTol);
      },
      "bigint, bigint": function(u, f) {
        return u === f;
      },
      "Fraction, Fraction": function(u, f) {
        return u.equals(f);
      },
      "Complex, Complex": function(u, f) {
        return Po(u, f, a.relTol, a.absTol);
      }
    }, t);
  });
  nr(Nt, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: a } = r;
    return e(Nt, {
      "number, number": function(n, u) {
        return ke(n, u, a.relTol, a.absTol);
      }
    });
  });
  var Io = "SparseMatrix", Uo = [
    "typed",
    "equalScalar",
    "Matrix"
  ], $o = nr(Io, Uo, (r) => {
    var { typed: e, equalScalar: a, Matrix: t } = r;
    function n(s, E) {
      if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
      if (E && !Pe(E)) throw new Error("Invalid datatype: " + E);
      if (Nr(s)) u(this, s, E);
      else if (s && kr(s.index) && kr(s.ptr) && kr(s.size)) this._values = s.values, this._index = s.index, this._ptr = s.ptr, this._size = s.size, this._datatype = E || s.datatype;
      else if (kr(s)) f(this, s, E);
      else {
        if (s) throw new TypeError("Unsupported type of data (" + ye(s) + ")");
        this._values = [], this._index = [], this._ptr = [
          0
        ], this._size = [
          0,
          0
        ], this._datatype = E;
      }
    }
    function u(s, E, w) {
      E.type === "SparseMatrix" ? (s._values = E._values ? Mr(E._values) : void 0, s._index = Mr(E._index), s._ptr = Mr(E._ptr), s._size = Mr(E._size), s._datatype = w || E._datatype) : f(s, E.valueOf(), w || E._datatype);
    }
    function f(s, E, w) {
      s._values = [], s._index = [], s._ptr = [], s._datatype = w;
      var B = E.length, A = 0, x = a, _ = 0;
      if (Pe(w) && (x = e.find(a, [
        w,
        w
      ]) || a, _ = e.convert(0, w)), B > 0) {
        var F = 0;
        do {
          s._ptr.push(s._index.length);
          for (var N = 0; N < B; N++) {
            var S = E[N];
            if (kr(S)) {
              if (F === 0 && A < S.length && (A = S.length), F < S.length) {
                var b = S[F];
                x(b, _) || (s._values.push(b), s._index.push(N));
              }
            } else F === 0 && A < 1 && (A = 1), x(S, _) || (s._values.push(S), s._index.push(N));
          }
          F++;
        } while (F < A);
      }
      s._ptr.push(s._index.length), s._size = [
        B,
        A
      ];
    }
    n.prototype = new t(), n.prototype.createSparseMatrix = function(s, E) {
      return new n(s, E);
    }, Object.defineProperty(n, "name", {
      value: "SparseMatrix"
    }), n.prototype.constructor = n, n.prototype.type = "SparseMatrix", n.prototype.isSparseMatrix = true, n.prototype.getDataType = function() {
      return Lt(this._values, ye);
    }, n.prototype.storage = function() {
      return "sparse";
    }, n.prototype.datatype = function() {
      return this._datatype;
    }, n.prototype.create = function(s, E) {
      return new n(s, E);
    }, n.prototype.density = function() {
      var s = this._size[0], E = this._size[1];
      return s !== 0 && E !== 0 ? this._index.length / (s * E) : 0;
    }, n.prototype.subset = function(s, E, w) {
      if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
      switch (arguments.length) {
        case 1:
          return m(this, s);
        case 2:
        case 3:
          return v(this, s, E, w);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    };
    function m(s, E) {
      if (!sn(E)) throw new TypeError("Invalid index");
      var w = E.isScalar();
      if (w) return s.get(E.min());
      var B = E.size();
      if (B.length !== s._size.length) throw new xr(B.length, s._size.length);
      var A, x, _, F, N = E.min(), S = E.max();
      for (A = 0, x = s._size.length; A < x; A++) Wr(N[A], s._size[A]), Wr(S[A], s._size[A]);
      var b = s._values, M = s._index, O = s._ptr, P = E.dimension(0), $ = E.dimension(1), z = [], V = [];
      P.forEach(function(R, Q) {
        V[R] = Q[0], z[R] = true;
      });
      var Y = b ? [] : void 0, rr = [], I = [];
      return $.forEach(function(R) {
        for (I.push(rr.length), _ = O[R], F = O[R + 1]; _ < F; _++) A = M[_], z[A] === true && (rr.push(V[A]), Y && Y.push(b[_]));
      }), I.push(rr.length), new n({
        values: Y,
        index: rr,
        ptr: I,
        size: B,
        datatype: s._datatype
      });
    }
    function v(s, E, w, B) {
      if (!E || E.isIndex !== true) throw new TypeError("Invalid index");
      var A = E.size(), x = E.isScalar(), _;
      if (Nr(w) ? (_ = w.size(), w = w.toArray()) : _ = Br(w), x) {
        if (_.length !== 0) throw new TypeError("Scalar expected");
        s.set(E.min(), w, B);
      } else {
        if (A.length !== 1 && A.length !== 2) throw new xr(A.length, s._size.length, "<");
        if (_.length < A.length) {
          for (var F = 0, N = 0; A[F] === 1 && _[F] === 1; ) F++;
          for (; A[F] === 1; ) N++, F++;
          w = Ka(w, A.length, N, _);
        }
        if (!Xe(A, _)) throw new xr(A, _, ">");
        if (A.length === 1) {
          var S = E.dimension(0);
          S.forEach(function(O, P) {
            Wr(O), s.set([
              O,
              0
            ], w[P[0]], B);
          });
        } else {
          var b = E.dimension(0), M = E.dimension(1);
          b.forEach(function(O, P) {
            Wr(O), M.forEach(function($, z) {
              Wr($), s.set([
                O,
                $
              ], w[P[0]][z[0]], B);
            });
          });
        }
      }
      return s;
    }
    n.prototype.get = function(s) {
      if (!kr(s)) throw new TypeError("Array expected");
      if (s.length !== this._size.length) throw new xr(s.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
      var E = s[0], w = s[1];
      Wr(E, this._size[0]), Wr(w, this._size[1]);
      var B = c(E, this._ptr[w], this._ptr[w + 1], this._index);
      return B < this._ptr[w + 1] && this._index[B] === E ? this._values[B] : 0;
    }, n.prototype.set = function(s, E, w) {
      if (!kr(s)) throw new TypeError("Array expected");
      if (s.length !== this._size.length) throw new xr(s.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
      var B = s[0], A = s[1], x = this._size[0], _ = this._size[1], F = a, N = 0;
      Pe(this._datatype) && (F = e.find(a, [
        this._datatype,
        this._datatype
      ]) || a, N = e.convert(0, this._datatype)), (B > x - 1 || A > _ - 1) && (y(this, Math.max(B + 1, x), Math.max(A + 1, _), w), x = this._size[0], _ = this._size[1]), Wr(B, x), Wr(A, _);
      var S = c(B, this._ptr[A], this._ptr[A + 1], this._index);
      return S < this._ptr[A + 1] && this._index[S] === B ? F(E, N) ? l(S, A, this._values, this._index, this._ptr) : this._values[S] = E : F(E, N) || d(S, B, A, E, this._values, this._index, this._ptr), this;
    };
    function c(s, E, w, B) {
      if (w - E === 0) return w;
      for (var A = E; A < w; A++) if (B[A] === s) return A;
      return E;
    }
    function l(s, E, w, B, A) {
      w.splice(s, 1), B.splice(s, 1);
      for (var x = E + 1; x < A.length; x++) A[x]--;
    }
    function d(s, E, w, B, A, x, _) {
      A.splice(s, 0, B), x.splice(s, 0, E);
      for (var F = w + 1; F < _.length; F++) _[F]++;
    }
    n.prototype.resize = function(s, E, w) {
      if (!dt(s)) throw new TypeError("Array or Matrix expected");
      var B = s.valueOf().map((x) => Array.isArray(x) && x.length === 1 ? x[0] : x);
      if (B.length !== 2) throw new Error("Only two dimensions matrix are supported");
      B.forEach(function(x) {
        if (!Ur(x) || !$r(x) || x < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Lr(B) + ")");
      });
      var A = w ? this.clone() : this;
      return y(A, B[0], B[1], E);
    };
    function y(s, E, w, B) {
      var A = B || 0, x = a, _ = 0;
      Pe(s._datatype) && (x = e.find(a, [
        s._datatype,
        s._datatype
      ]) || a, _ = e.convert(0, s._datatype), A = e.convert(A, s._datatype));
      var F = !x(A, _), N = s._size[0], S = s._size[1], b, M, O;
      if (w > S) {
        for (M = S; M < w; M++) if (s._ptr[M] = s._values.length, F) for (b = 0; b < N; b++) s._values.push(A), s._index.push(b);
        s._ptr[w] = s._values.length;
      } else w < S && (s._ptr.splice(w + 1, S - w), s._values.splice(s._ptr[w], s._values.length), s._index.splice(s._ptr[w], s._index.length));
      if (S = w, E > N) {
        if (F) {
          var P = 0;
          for (M = 0; M < S; M++) {
            s._ptr[M] = s._ptr[M] + P, O = s._ptr[M + 1] + P;
            var $ = 0;
            for (b = N; b < E; b++, $++) s._values.splice(O + $, 0, A), s._index.splice(O + $, 0, b), P++;
          }
          s._ptr[S] = s._values.length;
        }
      } else if (E < N) {
        var z = 0;
        for (M = 0; M < S; M++) {
          s._ptr[M] = s._ptr[M] - z;
          var V = s._ptr[M], Y = s._ptr[M + 1] - z;
          for (O = V; O < Y; O++) b = s._index[O], b > E - 1 && (s._values.splice(O, 1), s._index.splice(O, 1), z++);
        }
        s._ptr[M] = s._values.length;
      }
      return s._size[0] = E, s._size[1] = w, s;
    }
    n.prototype.reshape = function(s, E) {
      if (!kr(s)) throw new TypeError("Array expected");
      if (s.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
      s.forEach(function(R) {
        if (!Ur(R) || !$r(R) || R <= -2 || R === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Lr(s) + ")");
      });
      var w = this._size[0] * this._size[1];
      s = vn(s, w);
      var B = s[0] * s[1];
      if (w !== B) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
      var A = E ? this.clone() : this;
      if (this._size[0] === s[0] && this._size[1] === s[1]) return A;
      for (var x = [], _ = 0; _ < A._ptr.length; _++) for (var F = 0; F < A._ptr[_ + 1] - A._ptr[_]; F++) x.push(_);
      for (var N = A._values.slice(), S = A._index.slice(), b = 0; b < A._index.length; b++) {
        var M = S[b], O = x[b], P = M * A._size[1] + O;
        x[b] = P % s[1], S[b] = Math.floor(P / s[1]);
      }
      A._values.length = 0, A._index.length = 0, A._ptr.length = s[1] + 1, A._size = s.slice();
      for (var $ = 0; $ < A._ptr.length; $++) A._ptr[$] = 0;
      for (var z = 0; z < N.length; z++) {
        var V = S[z], Y = x[z], rr = N[z], I = c(V, A._ptr[Y], A._ptr[Y + 1], A._index);
        d(I, V, Y, rr, A._values, A._index, A._ptr);
      }
      return A;
    }, n.prototype.clone = function() {
      var s = new n({
        values: this._values ? Mr(this._values) : void 0,
        index: Mr(this._index),
        ptr: Mr(this._ptr),
        size: Mr(this._size),
        datatype: this._datatype
      });
      return s;
    }, n.prototype.size = function() {
      return this._size.slice(0);
    }, n.prototype.map = function(s, E) {
      if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
      var w = this, B = this._size[0], A = this._size[1], x = Mt(s, w, "map"), _ = function(N, S, b) {
        return x.fn(N, [
          S,
          b
        ], w);
      };
      return p(this, 0, B - 1, 0, A - 1, _, E);
    };
    function p(s, E, w, B, A, x, _) {
      var F = [], N = [], S = [], b = a, M = 0;
      Pe(s._datatype) && (b = e.find(a, [
        s._datatype,
        s._datatype
      ]) || a, M = e.convert(0, s._datatype));
      for (var O = function(W, k, K) {
        var J = x(W, k, K);
        b(J, M) || (F.push(J), N.push(k));
      }, P = B; P <= A; P++) {
        S.push(F.length);
        var $ = s._ptr[P], z = s._ptr[P + 1];
        if (_) for (var V = $; V < z; V++) {
          var Y = s._index[V];
          Y >= E && Y <= w && O(s._values[V], Y - E, P - B);
        }
        else {
          for (var rr = {}, I = $; I < z; I++) {
            var R = s._index[I];
            rr[R] = s._values[I];
          }
          for (var Q = E; Q <= w; Q++) {
            var j = Q in rr ? rr[Q] : 0;
            O(j, Q - E, P - B);
          }
        }
      }
      return S.push(F.length), new n({
        values: F,
        index: N,
        ptr: S,
        size: [
          w - E + 1,
          A - B + 1
        ]
      });
    }
    n.prototype.forEach = function(s, E) {
      if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
      for (var w = this, B = this._size[0], A = this._size[1], x = Mt(s, w, "forEach"), _ = 0; _ < A; _++) {
        var F = this._ptr[_], N = this._ptr[_ + 1];
        if (E) for (var S = F; S < N; S++) {
          var b = this._index[S];
          x.fn(this._values[S], [
            b,
            _
          ], w);
        }
        else {
          for (var M = {}, O = F; O < N; O++) {
            var P = this._index[O];
            M[P] = this._values[O];
          }
          for (var $ = 0; $ < B; $++) {
            var z = $ in M ? M[$] : 0;
            x.fn(z, [
              $,
              _
            ], w);
          }
        }
      }
    }, n.prototype[Symbol.iterator] = function* () {
      if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
      for (var s = this._size[1], E = 0; E < s; E++) for (var w = this._ptr[E], B = this._ptr[E + 1], A = w; A < B; A++) {
        var x = this._index[A];
        yield {
          value: this._values[A],
          index: [
            x,
            E
          ]
        };
      }
    }, n.prototype.toArray = function() {
      return D(this._values, this._index, this._ptr, this._size, true);
    }, n.prototype.valueOf = function() {
      return D(this._values, this._index, this._ptr, this._size, false);
    };
    function D(s, E, w, B, A) {
      var x = B[0], _ = B[1], F = [], N, S;
      for (N = 0; N < x; N++) for (F[N] = [], S = 0; S < _; S++) F[N][S] = 0;
      for (S = 0; S < _; S++) for (var b = w[S], M = w[S + 1], O = b; O < M; O++) N = E[O], F[N][S] = s ? A ? Mr(s[O]) : s[O] : 1;
      return F;
    }
    return n.prototype.format = function(s) {
      for (var E = this._size[0], w = this._size[1], B = this.density(), A = "Sparse Matrix [" + Lr(E, s) + " x " + Lr(w, s) + "] density: " + Lr(B, s) + `
`, x = 0; x < w; x++) for (var _ = this._ptr[x], F = this._ptr[x + 1], N = _; N < F; N++) {
        var S = this._index[N];
        A += `
    (` + Lr(S, s) + ", " + Lr(x, s) + ") ==> " + (this._values ? Lr(this._values[N], s) : "X");
      }
      return A;
    }, n.prototype.toString = function() {
      return Lr(this.toArray());
    }, n.prototype.toJSON = function() {
      return {
        mathjs: "SparseMatrix",
        values: this._values,
        index: this._index,
        ptr: this._ptr,
        size: this._size,
        datatype: this._datatype
      };
    }, n.prototype.diagonal = function(s) {
      if (s) {
        if (Xr(s) && (s = s.toNumber()), !Ur(s) || !$r(s)) throw new TypeError("The parameter k must be an integer number");
      } else s = 0;
      var E = s > 0 ? s : 0, w = s < 0 ? -s : 0, B = this._size[0], A = this._size[1], x = Math.min(B - w, A - E), _ = [], F = [], N = [];
      N[0] = 0;
      for (var S = E; S < A && _.length < x; S++) for (var b = this._ptr[S], M = this._ptr[S + 1], O = b; O < M; O++) {
        var P = this._index[O];
        if (P === S - E + w) {
          _.push(this._values[O]), F[_.length - 1] = P - w;
          break;
        }
      }
      return N.push(_.length), new n({
        values: _,
        index: F,
        ptr: N,
        size: [
          x,
          1
        ]
      });
    }, n.fromJSON = function(s) {
      return new n(s);
    }, n.diagonal = function(s, E, w, B, A) {
      if (!kr(s)) throw new TypeError("Array expected, size parameter");
      if (s.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (s = s.map(function(R) {
        if (Xr(R) && (R = R.toNumber()), !Ur(R) || !$r(R) || R < 1) throw new Error("Size values must be positive integers");
        return R;
      }), w) {
        if (Xr(w) && (w = w.toNumber()), !Ur(w) || !$r(w)) throw new TypeError("The parameter k must be an integer number");
      } else w = 0;
      var x = a, _ = 0;
      Pe(A) && (x = e.find(a, [
        A,
        A
      ]) || a, _ = e.convert(0, A));
      var F = w > 0 ? w : 0, N = w < 0 ? -w : 0, S = s[0], b = s[1], M = Math.min(S - N, b - F), O;
      if (kr(E)) {
        if (E.length !== M) throw new Error("Invalid value array length");
        O = function(Q) {
          return E[Q];
        };
      } else if (Nr(E)) {
        var P = E.size();
        if (P.length !== 1 || P[0] !== M) throw new Error("Invalid matrix length");
        O = function(Q) {
          return E.get([
            Q
          ]);
        };
      } else O = function() {
        return E;
      };
      for (var $ = [], z = [], V = [], Y = 0; Y < b; Y++) {
        V.push($.length);
        var rr = Y - F;
        if (rr >= 0 && rr < M) {
          var I = O(rr);
          x(I, _) || (z.push(rr + N), $.push(I));
        }
      }
      return V.push($.length), new n({
        values: $,
        index: z,
        ptr: V,
        size: [
          S,
          b
        ]
      });
    }, n.prototype.swapRows = function(s, E) {
      if (!Ur(s) || !$r(s) || !Ur(E) || !$r(E)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return Wr(s, this._size[0]), Wr(E, this._size[0]), n._swapRows(s, E, this._size[1], this._values, this._index, this._ptr), this;
    }, n._forEachRow = function(s, E, w, B, A) {
      for (var x = B[s], _ = B[s + 1], F = x; F < _; F++) A(w[F], E[F]);
    }, n._swapRows = function(s, E, w, B, A, x) {
      for (var _ = 0; _ < w; _++) {
        var F = x[_], N = x[_ + 1], S = c(s, F, N, A), b = c(E, F, N, A);
        if (S < N && b < N && A[S] === s && A[b] === E) {
          if (B) {
            var M = B[S];
            B[S] = B[b], B[b] = M;
          }
          continue;
        }
        if (S < N && A[S] === s && (b >= N || A[b] !== E)) {
          var O = B ? B[S] : void 0;
          A.splice(b, 0, E), B && B.splice(b, 0, O), A.splice(b <= S ? S + 1 : S, 1), B && B.splice(b <= S ? S + 1 : S, 1);
          continue;
        }
        if (b < N && A[b] === E && (S >= N || A[S] !== s)) {
          var P = B ? B[b] : void 0;
          A.splice(S, 0, s), B && B.splice(S, 0, P), A.splice(S <= b ? b + 1 : b, 1), B && B.splice(S <= b ? b + 1 : b, 1);
        }
      }
    }, n;
  }, {
    isClass: true
  }), Lo = "number", qo = [
    "typed"
  ];
  function ko(r) {
    var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
    if (e) {
      var a = {
        "0b": 2,
        "0o": 8,
        "0x": 16
      }[e[1]], t = e[2], n = e[3];
      return {
        input: r,
        radix: a,
        integerPart: t,
        fractionalPart: n
      };
    } else return null;
  }
  function Yo(r) {
    for (var e = parseInt(r.integerPart, r.radix), a = 0, t = 0; t < r.fractionalPart.length; t++) {
      var n = parseInt(r.fractionalPart[t], r.radix);
      a += n / Math.pow(r.radix, t + 1);
    }
    var u = e + a;
    if (isNaN(u)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
    return u;
  }
  var Wo = nr(Lo, qo, (r) => {
    var { typed: e } = r, a = e("number", {
      "": function() {
        return 0;
      },
      number: function(n) {
        return n;
      },
      string: function(n) {
        if (n === "NaN") return NaN;
        var u = ko(n);
        if (u) return Yo(u);
        var f = 0, m = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        m && (f = Number(m[2]), n = m[1]);
        var v = Number(n);
        if (isNaN(v)) throw new SyntaxError('String "' + n + '" is not a valid number');
        if (m) {
          if (v > 2 ** f - 1) throw new SyntaxError('String "'.concat(n, '" is out of range'));
          v >= 2 ** (f - 1) && (v = v - 2 ** f);
        }
        return v;
      },
      BigNumber: function(n) {
        return n.toNumber();
      },
      bigint: function(n) {
        return Number(n);
      },
      Fraction: function(n) {
        return n.valueOf();
      },
      Unit: e.referToSelf((t) => (n) => {
        var u = n.clone();
        return u.value = t(n.value), u;
      }),
      null: function(n) {
        return 0;
      },
      "Unit, string | Unit": function(n, u) {
        return n.toNumber(u);
      },
      "Array | Matrix": e.referToSelf((t) => (n) => Ee(n, t))
    });
    return a.fromJSON = function(t) {
      return parseFloat(t.value);
    }, a;
  }), Xo = "bignumber", Go = [
    "typed",
    "BigNumber"
  ], Vo = nr(Xo, Go, (r) => {
    var { typed: e, BigNumber: a } = r;
    return e("bignumber", {
      "": function() {
        return new a(0);
      },
      number: function(n) {
        return new a(n + "");
      },
      string: function(n) {
        var u = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        if (u) {
          var f = u[2], m = a(u[1]), v = new a(2).pow(Number(f));
          if (m.gt(v.sub(1))) throw new SyntaxError('String "'.concat(n, '" is out of range'));
          var c = new a(2).pow(Number(f) - 1);
          return m.gte(c) ? m.sub(v) : m;
        }
        return new a(n);
      },
      BigNumber: function(n) {
        return n;
      },
      bigint: function(n) {
        return new a(n.toString());
      },
      Unit: e.referToSelf((t) => (n) => {
        var u = n.clone();
        return u.value = t(n.value), u;
      }),
      Fraction: function(n) {
        return new a(String(n.n)).div(String(n.d)).times(String(n.s));
      },
      null: function(n) {
        return new a(0);
      },
      "Array | Matrix": e.referToSelf((t) => (n) => Ee(n, t))
    });
  }), Ho = "complex", Ko = [
    "typed",
    "Complex"
  ], Qo = nr(Ho, Ko, (r) => {
    var { typed: e, Complex: a } = r;
    return e("complex", {
      "": function() {
        return a.ZERO;
      },
      number: function(n) {
        return new a(n, 0);
      },
      "number, number": function(n, u) {
        return new a(n, u);
      },
      "BigNumber, BigNumber": function(n, u) {
        return new a(n.toNumber(), u.toNumber());
      },
      Fraction: function(n) {
        return new a(n.valueOf(), 0);
      },
      Complex: function(n) {
        return n.clone();
      },
      string: function(n) {
        return a(n);
      },
      null: function(n) {
        return a(0);
      },
      Object: function(n) {
        if ("re" in n && "im" in n) return new a(n.re, n.im);
        if ("r" in n && "phi" in n || "abs" in n && "arg" in n) return new a(n);
        throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
      },
      "Array | Matrix": e.referToSelf((t) => (n) => Ee(n, t))
    });
  }), Jo = "fraction", Zo = [
    "typed",
    "Fraction"
  ], jo = nr(Jo, Zo, (r) => {
    var { typed: e, Fraction: a } = r;
    return e("fraction", {
      number: function(n) {
        if (!isFinite(n) || isNaN(n)) throw new Error(n + " cannot be represented as a fraction");
        return new a(n);
      },
      string: function(n) {
        return new a(n);
      },
      "number, number": function(n, u) {
        return new a(n, u);
      },
      "bigint, bigint": function(n, u) {
        return new a(n, u);
      },
      null: function(n) {
        return new a(0);
      },
      BigNumber: function(n) {
        return new a(n.toString());
      },
      bigint: function(n) {
        return new a(n.toString());
      },
      Fraction: function(n) {
        return n;
      },
      Unit: e.referToSelf((t) => (n) => {
        var u = n.clone();
        return u.value = t(n.value), u;
      }),
      Object: function(n) {
        return new a(n);
      },
      "Array | Matrix": e.referToSelf((t) => (n) => Ee(n, t))
    });
  }), Vn = "matrix", rs = [
    "typed",
    "Matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], es = nr(Vn, rs, (r) => {
    var { typed: e, Matrix: a, DenseMatrix: t, SparseMatrix: n } = r;
    return e(Vn, {
      "": function() {
        return u([]);
      },
      string: function(m) {
        return u([], m);
      },
      "string, string": function(m, v) {
        return u([], m, v);
      },
      Array: function(m) {
        return u(m);
      },
      Matrix: function(m) {
        return u(m, m.storage());
      },
      "Array | Matrix, string": u,
      "Array | Matrix, string, string": u
    });
    function u(f, m, v) {
      if (m === "dense" || m === "default" || m === void 0) return new t(f, v);
      if (m === "sparse") return new n(f, v);
      throw new TypeError("Unknown matrix type " + JSON.stringify(m) + ".");
    }
  }), Hn = "matrixFromColumns", ts = [
    "typed",
    "matrix",
    "flatten",
    "size"
  ], ns = nr(Hn, ts, (r) => {
    var { typed: e, matrix: a, flatten: t, size: n } = r;
    return e(Hn, {
      "...Array": function(v) {
        return u(v);
      },
      "...Matrix": function(v) {
        return a(u(v.map((c) => c.toArray())));
      }
    });
    function u(m) {
      if (m.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
      for (var v = f(m[0]), c = [], l = 0; l < v; l++) c[l] = [];
      for (var d of m) {
        var y = f(d);
        if (y !== v) throw new TypeError("The vectors had different length: " + (v | 0) + " \u2260 " + (y | 0));
        for (var p = t(d), D = 0; D < v; D++) c[D].push(p[D]);
      }
      return c;
    }
    function f(m) {
      var v = n(m);
      if (v.length === 1) return v[0];
      if (v.length === 2) {
        if (v[0] === 1) return v[1];
        if (v[1] === 1) return v[0];
        throw new TypeError("At least one of the arguments is not a vector.");
      } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
    }
  }), Kn = "unaryMinus", as = [
    "typed"
  ], is = nr(Kn, as, (r) => {
    var { typed: e } = r;
    return e(Kn, {
      number: ui,
      "Complex | BigNumber | Fraction": (a) => a.neg(),
      bigint: (a) => -a,
      Unit: e.referToSelf((a) => (t) => {
        var n = t.clone();
        return n.value = e.find(a, n.valueType())(t.value), n;
      }),
      "Array | Matrix": e.referToSelf((a) => (t) => Ee(t, a, true))
    });
  }), Qn = "abs", us = [
    "typed"
  ], os = nr(Qn, us, (r) => {
    var { typed: e } = r;
    return e(Qn, {
      number: ti,
      "Complex | BigNumber | Fraction | Unit": (a) => a.abs(),
      bigint: (a) => a < 0n ? -a : a,
      "Array | Matrix": e.referToSelf((a) => (t) => Ee(t, a, true))
    });
  }), Jn = "addScalar", ss = [
    "typed"
  ], fs = nr(Jn, ss, (r) => {
    var { typed: e } = r;
    return e(Jn, {
      "number, number": ni,
      "Complex, Complex": function(t, n) {
        return t.add(n);
      },
      "BigNumber, BigNumber": function(t, n) {
        return t.plus(n);
      },
      "bigint, bigint": function(t, n) {
        return t + n;
      },
      "Fraction, Fraction": function(t, n) {
        return t.add(n);
      },
      "Unit, Unit": e.referToSelf((a) => (t, n) => {
        if (t.value === null || t.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (n.value === null || n.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!t.equalBase(n)) throw new Error("Units do not match");
        var u = t.clone();
        return u.value = e.find(a, [
          u.valueType(),
          n.valueType()
        ])(u.value, n.value), u.fixPrefix = false, u;
      })
    });
  }), Zn = "subtractScalar", ls = [
    "typed"
  ], cs = nr(Zn, ls, (r) => {
    var { typed: e } = r;
    return e(Zn, {
      "number, number": ai,
      "Complex, Complex": function(t, n) {
        return t.sub(n);
      },
      "BigNumber, BigNumber": function(t, n) {
        return t.minus(n);
      },
      "bigint, bigint": function(t, n) {
        return t - n;
      },
      "Fraction, Fraction": function(t, n) {
        return t.sub(n);
      },
      "Unit, Unit": e.referToSelf((a) => (t, n) => {
        if (t.value === null || t.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (n.value === null || n.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!t.equalBase(n)) throw new Error("Units do not match");
        var u = t.clone();
        return u.value = e.find(a, [
          u.valueType(),
          n.valueType()
        ])(u.value, n.value), u.fixPrefix = false, u;
      })
    });
  }), vs = "matAlgo11xS0s", ds = [
    "typed",
    "equalScalar"
  ], fi = nr(vs, ds, (r) => {
    var { typed: e, equalScalar: a } = r;
    return function(n, u, f, m) {
      var v = n._values, c = n._index, l = n._ptr, d = n._size, y = n._datatype;
      if (!v) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var p = d[0], D = d[1], s, E = a, w = 0, B = f;
      typeof y == "string" && (s = y, E = e.find(a, [
        s,
        s
      ]), w = e.convert(0, s), u = e.convert(u, s), B = e.find(f, [
        s,
        s
      ]));
      for (var A = [], x = [], _ = [], F = 0; F < D; F++) {
        _[F] = x.length;
        for (var N = l[F], S = l[F + 1], b = N; b < S; b++) {
          var M = c[b], O = m ? B(u, v[b]) : B(v[b], u);
          E(O, w) || (x.push(M), A.push(O));
        }
      }
      return _[D] = x.length, n.createSparseMatrix({
        values: A,
        index: x,
        ptr: _,
        size: [
          p,
          D
        ],
        datatype: s
      });
    };
  }), ms = "matAlgo12xSfs", ps = [
    "typed",
    "DenseMatrix"
  ], it = nr(ms, ps, (r) => {
    var { typed: e, DenseMatrix: a } = r;
    return function(n, u, f, m) {
      var v = n._values, c = n._index, l = n._ptr, d = n._size, y = n._datatype;
      if (!v) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var p = d[0], D = d[1], s, E = f;
      typeof y == "string" && (s = y, u = e.convert(u, s), E = e.find(f, [
        s,
        s
      ]));
      for (var w = [], B = [], A = [], x = 0; x < D; x++) {
        for (var _ = x + 1, F = l[x], N = l[x + 1], S = F; S < N; S++) {
          var b = c[S];
          B[b] = v[S], A[b] = _;
        }
        for (var M = 0; M < p; M++) x === 0 && (w[M] = []), A[M] === _ ? w[M][x] = m ? E(u, B[M]) : E(B[M], u) : w[M][x] = m ? E(u, 0) : E(0, u);
      }
      return new a({
        data: w,
        size: [
          p,
          D
        ],
        datatype: s
      });
    };
  }), hs = "matAlgo14xDs", Ds = [
    "typed"
  ], mn = nr(hs, Ds, (r) => {
    var { typed: e } = r;
    return function(n, u, f, m) {
      var v = n._data, c = n._size, l = n._datatype, d, y = f;
      typeof l == "string" && (d = l, u = e.convert(u, d), y = e.find(f, [
        d,
        d
      ]));
      var p = c.length > 0 ? a(y, 0, c, c[0], v, u, m) : [];
      return n.createDenseMatrix({
        data: p,
        size: Mr(c),
        datatype: d
      });
    };
    function a(t, n, u, f, m, v, c) {
      var l = [];
      if (n === u.length - 1) for (var d = 0; d < f; d++) l[d] = c ? t(v, m[d]) : t(m[d], v);
      else for (var y = 0; y < f; y++) l[y] = a(t, n + 1, u, u[n + 1], m[y], v, c);
      return l;
    }
  }), gs = "matAlgo03xDSf", ys = [
    "typed"
  ], ut = nr(gs, ys, (r) => {
    var { typed: e } = r;
    return function(t, n, u, f) {
      var m = t._data, v = t._size, c = t._datatype || t.getDataType(), l = n._values, d = n._index, y = n._ptr, p = n._size, D = n._datatype || n._data === void 0 ? n._datatype : n.getDataType();
      if (v.length !== p.length) throw new xr(v.length, p.length);
      if (v[0] !== p[0] || v[1] !== p[1]) throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + p + ")");
      if (!l) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var s = v[0], E = v[1], w, B = 0, A = u;
      typeof c == "string" && c === D && c !== "mixed" && (w = c, B = e.convert(0, w), A = e.find(u, [
        w,
        w
      ]));
      for (var x = [], _ = 0; _ < s; _++) x[_] = [];
      for (var F = [], N = [], S = 0; S < E; S++) {
        for (var b = S + 1, M = y[S], O = y[S + 1], P = M; P < O; P++) {
          var $ = d[P];
          F[$] = f ? A(l[P], m[$][S]) : A(m[$][S], l[P]), N[$] = b;
        }
        for (var z = 0; z < s; z++) N[z] === b ? x[z][S] = F[z] : x[z][S] = f ? A(B, m[z][S]) : A(m[z][S], B);
      }
      return t.createDenseMatrix({
        data: x,
        size: [
          s,
          E
        ],
        datatype: c === t._datatype && D === n._datatype ? w : void 0
      });
    };
  }), Es = "matAlgo05xSfSf", ws = [
    "typed",
    "equalScalar"
  ], As = nr(Es, ws, (r) => {
    var { typed: e, equalScalar: a } = r;
    return function(n, u, f) {
      var m = n._values, v = n._index, c = n._ptr, l = n._size, d = n._datatype || n._data === void 0 ? n._datatype : n.getDataType(), y = u._values, p = u._index, D = u._ptr, s = u._size, E = u._datatype || u._data === void 0 ? u._datatype : u.getDataType();
      if (l.length !== s.length) throw new xr(l.length, s.length);
      if (l[0] !== s[0] || l[1] !== s[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + s + ")");
      var w = l[0], B = l[1], A, x = a, _ = 0, F = f;
      typeof d == "string" && d === E && d !== "mixed" && (A = d, x = e.find(a, [
        A,
        A
      ]), _ = e.convert(0, A), F = e.find(f, [
        A,
        A
      ]));
      var N = m && y ? [] : void 0, S = [], b = [], M = N ? [] : void 0, O = N ? [] : void 0, P = [], $ = [], z, V, Y, rr;
      for (V = 0; V < B; V++) {
        b[V] = S.length;
        var I = V + 1;
        for (Y = c[V], rr = c[V + 1]; Y < rr; Y++) z = v[Y], S.push(z), P[z] = I, M && (M[z] = m[Y]);
        for (Y = D[V], rr = D[V + 1]; Y < rr; Y++) z = p[Y], P[z] !== I && S.push(z), $[z] = I, O && (O[z] = y[Y]);
        if (N) for (Y = b[V]; Y < S.length; ) {
          z = S[Y];
          var R = P[z], Q = $[z];
          if (R === I || Q === I) {
            var j = R === I ? M[z] : _, q = Q === I ? O[z] : _, W = F(j, q);
            x(W, _) ? S.splice(Y, 1) : (N.push(W), Y++);
          }
        }
      }
      return b[B] = S.length, n.createSparseMatrix({
        values: N,
        index: S,
        ptr: b,
        size: [
          w,
          B
        ],
        datatype: d === n._datatype && E === u._datatype ? A : void 0
      });
    };
  }), Fs = "matAlgo13xDD", bs = [
    "typed"
  ], _s = nr(Fs, bs, (r) => {
    var { typed: e } = r;
    return function(n, u, f) {
      var m = n._data, v = n._size, c = n._datatype, l = u._data, d = u._size, y = u._datatype, p = [];
      if (v.length !== d.length) throw new xr(v.length, d.length);
      for (var D = 0; D < v.length; D++) {
        if (v[D] !== d[D]) throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + d + ")");
        p[D] = v[D];
      }
      var s, E = f;
      typeof c == "string" && c === y && (s = c, E = e.find(f, [
        s,
        s
      ]));
      var w = p.length > 0 ? a(E, 0, p, p[0], m, l) : [];
      return n.createDenseMatrix({
        data: w,
        size: p,
        datatype: s
      });
    };
    function a(t, n, u, f, m, v) {
      var c = [];
      if (n === u.length - 1) for (var l = 0; l < f; l++) c[l] = t(m[l], v[l]);
      else for (var d = 0; d < f; d++) c[d] = a(t, n + 1, u, u[n + 1], m[d], v[d]);
      return c;
    }
  });
  function Zr(r, e) {
    if (Xe(r.size(), e.size())) return [
      r,
      e
    ];
    var a = ja(r.size(), e.size());
    return [
      r,
      e
    ].map((t) => Cs(t, a));
  }
  function Cs(r, e) {
    return Xe(r.size(), e) ? r : r.create(nn(r.valueOf(), e), r.datatype());
  }
  var Ss = "matrixAlgorithmSuite", Bs = [
    "typed",
    "matrix"
  ], Ke = nr(Ss, Bs, (r) => {
    var { typed: e, matrix: a } = r, t = _s({
      typed: e
    }), n = mn({
      typed: e
    });
    return function(f) {
      var m = f.elop, v = f.SD || f.DS, c;
      m ? (c = {
        "DenseMatrix, DenseMatrix": (p, D) => t(...Zr(p, D), m),
        "Array, Array": (p, D) => t(...Zr(a(p), a(D)), m).valueOf(),
        "Array, DenseMatrix": (p, D) => t(...Zr(a(p), D), m),
        "DenseMatrix, Array": (p, D) => t(...Zr(p, a(D)), m)
      }, f.SS && (c["SparseMatrix, SparseMatrix"] = (p, D) => f.SS(...Zr(p, D), m, false)), f.DS && (c["DenseMatrix, SparseMatrix"] = (p, D) => f.DS(...Zr(p, D), m, false), c["Array, SparseMatrix"] = (p, D) => f.DS(...Zr(a(p), D), m, false)), v && (c["SparseMatrix, DenseMatrix"] = (p, D) => v(...Zr(D, p), m, true), c["SparseMatrix, Array"] = (p, D) => v(...Zr(a(D), p), m, true))) : (c = {
        "DenseMatrix, DenseMatrix": e.referToSelf((p) => (D, s) => t(...Zr(D, s), p)),
        "Array, Array": e.referToSelf((p) => (D, s) => t(...Zr(a(D), a(s)), p).valueOf()),
        "Array, DenseMatrix": e.referToSelf((p) => (D, s) => t(...Zr(a(D), s), p)),
        "DenseMatrix, Array": e.referToSelf((p) => (D, s) => t(...Zr(D, a(s)), p))
      }, f.SS && (c["SparseMatrix, SparseMatrix"] = e.referToSelf((p) => (D, s) => f.SS(...Zr(D, s), p, false))), f.DS && (c["DenseMatrix, SparseMatrix"] = e.referToSelf((p) => (D, s) => f.DS(...Zr(D, s), p, false)), c["Array, SparseMatrix"] = e.referToSelf((p) => (D, s) => f.DS(...Zr(a(D), s), p, false))), v && (c["SparseMatrix, DenseMatrix"] = e.referToSelf((p) => (D, s) => v(...Zr(s, D), p, true)), c["SparseMatrix, Array"] = e.referToSelf((p) => (D, s) => v(...Zr(a(s), D), p, true))));
      var l = f.scalar || "any", d = f.Ds || f.Ss;
      d && (m ? (c["DenseMatrix," + l] = (p, D) => n(p, D, m, false), c[l + ", DenseMatrix"] = (p, D) => n(D, p, m, true), c["Array," + l] = (p, D) => n(a(p), D, m, false).valueOf(), c[l + ", Array"] = (p, D) => n(a(D), p, m, true).valueOf()) : (c["DenseMatrix," + l] = e.referToSelf((p) => (D, s) => n(D, s, p, false)), c[l + ", DenseMatrix"] = e.referToSelf((p) => (D, s) => n(s, D, p, true)), c["Array," + l] = e.referToSelf((p) => (D, s) => n(a(D), s, p, false).valueOf()), c[l + ", Array"] = e.referToSelf((p) => (D, s) => n(a(s), D, p, true).valueOf())));
      var y = f.sS !== void 0 ? f.sS : f.Ss;
      return m ? (f.Ss && (c["SparseMatrix," + l] = (p, D) => f.Ss(p, D, m, false)), y && (c[l + ", SparseMatrix"] = (p, D) => y(D, p, m, true))) : (f.Ss && (c["SparseMatrix," + l] = e.referToSelf((p) => (D, s) => f.Ss(D, s, p, false))), y && (c[l + ", SparseMatrix"] = e.referToSelf((p) => (D, s) => y(s, D, p, true)))), m && m.signatures && qa(c, m.signatures), c;
    };
  }), Ms = "matAlgo01xDSid", xs = [
    "typed"
  ], li = nr(Ms, xs, (r) => {
    var { typed: e } = r;
    return function(t, n, u, f) {
      var m = t._data, v = t._size, c = t._datatype || t.getDataType(), l = n._values, d = n._index, y = n._ptr, p = n._size, D = n._datatype || n._data === void 0 ? n._datatype : n.getDataType();
      if (v.length !== p.length) throw new xr(v.length, p.length);
      if (v[0] !== p[0] || v[1] !== p[1]) throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + p + ")");
      if (!l) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var s = v[0], E = v[1], w = typeof c == "string" && c !== "mixed" && c === D ? c : void 0, B = w ? e.find(u, [
        w,
        w
      ]) : u, A, x, _ = [];
      for (A = 0; A < s; A++) _[A] = [];
      var F = [], N = [];
      for (x = 0; x < E; x++) {
        for (var S = x + 1, b = y[x], M = y[x + 1], O = b; O < M; O++) A = d[O], F[A] = f ? B(l[O], m[A][x]) : B(m[A][x], l[O]), N[A] = S;
        for (A = 0; A < s; A++) N[A] === S ? _[A][x] = F[A] : _[A][x] = m[A][x];
      }
      return t.createDenseMatrix({
        data: _,
        size: [
          s,
          E
        ],
        datatype: c === t._datatype && D === n._datatype ? w : void 0
      });
    };
  }), Ns = "matAlgo04xSidSid", Ts = [
    "typed",
    "equalScalar"
  ], Os = nr(Ns, Ts, (r) => {
    var { typed: e, equalScalar: a } = r;
    return function(n, u, f) {
      var m = n._values, v = n._index, c = n._ptr, l = n._size, d = n._datatype || n._data === void 0 ? n._datatype : n.getDataType(), y = u._values, p = u._index, D = u._ptr, s = u._size, E = u._datatype || u._data === void 0 ? u._datatype : u.getDataType();
      if (l.length !== s.length) throw new xr(l.length, s.length);
      if (l[0] !== s[0] || l[1] !== s[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + s + ")");
      var w = l[0], B = l[1], A, x = a, _ = 0, F = f;
      typeof d == "string" && d === E && d !== "mixed" && (A = d, x = e.find(a, [
        A,
        A
      ]), _ = e.convert(0, A), F = e.find(f, [
        A,
        A
      ]));
      var N = m && y ? [] : void 0, S = [], b = [], M = m && y ? [] : void 0, O = m && y ? [] : void 0, P = [], $ = [], z, V, Y, rr, I;
      for (V = 0; V < B; V++) {
        b[V] = S.length;
        var R = V + 1;
        for (rr = c[V], I = c[V + 1], Y = rr; Y < I; Y++) z = v[Y], S.push(z), P[z] = R, M && (M[z] = m[Y]);
        for (rr = D[V], I = D[V + 1], Y = rr; Y < I; Y++) if (z = p[Y], P[z] === R) {
          if (M) {
            var Q = F(M[z], y[Y]);
            x(Q, _) ? P[z] = null : M[z] = Q;
          }
        } else S.push(z), $[z] = R, O && (O[z] = y[Y]);
        if (M && O) for (Y = b[V]; Y < S.length; ) z = S[Y], P[z] === R ? (N[Y] = M[z], Y++) : $[z] === R ? (N[Y] = O[z], Y++) : S.splice(Y, 1);
      }
      return b[B] = S.length, n.createSparseMatrix({
        values: N,
        index: S,
        ptr: b,
        size: [
          w,
          B
        ],
        datatype: d === n._datatype && E === u._datatype ? A : void 0
      });
    };
  }), Ps = "matAlgo10xSids", zs = [
    "typed",
    "DenseMatrix"
  ], ci = nr(Ps, zs, (r) => {
    var { typed: e, DenseMatrix: a } = r;
    return function(n, u, f, m) {
      var v = n._values, c = n._index, l = n._ptr, d = n._size, y = n._datatype;
      if (!v) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var p = d[0], D = d[1], s, E = f;
      typeof y == "string" && (s = y, u = e.convert(u, s), E = e.find(f, [
        s,
        s
      ]));
      for (var w = [], B = [], A = [], x = 0; x < D; x++) {
        for (var _ = x + 1, F = l[x], N = l[x + 1], S = F; S < N; S++) {
          var b = c[S];
          B[b] = v[S], A[b] = _;
        }
        for (var M = 0; M < p; M++) x === 0 && (w[M] = []), A[M] === _ ? w[M][x] = m ? E(u, B[M]) : E(B[M], u) : w[M][x] = u;
      }
      return new a({
        data: w,
        size: [
          p,
          D
        ],
        datatype: s
      });
    };
  }), Rs = "multiplyScalar", Is = [
    "typed"
  ], Us = nr(Rs, Is, (r) => {
    var { typed: e } = r;
    return e("multiplyScalar", {
      "number, number": ii,
      "Complex, Complex": function(t, n) {
        return t.mul(n);
      },
      "BigNumber, BigNumber": function(t, n) {
        return t.times(n);
      },
      "bigint, bigint": function(t, n) {
        return t * n;
      },
      "Fraction, Fraction": function(t, n) {
        return t.mul(n);
      },
      "number | Fraction | BigNumber | Complex, Unit": (a, t) => t.multiply(a),
      "Unit, number | Fraction | BigNumber | Complex | Unit": (a, t) => a.multiply(t)
    });
  }), jn = "multiply", $s = [
    "typed",
    "matrix",
    "addScalar",
    "multiplyScalar",
    "equalScalar",
    "dot"
  ], Ls = nr(jn, $s, (r) => {
    var { typed: e, matrix: a, addScalar: t, multiplyScalar: n, equalScalar: u, dot: f } = r, m = fi({
      typed: e,
      equalScalar: u
    }), v = mn({
      typed: e
    });
    function c(_, F) {
      switch (_.length) {
        case 1:
          switch (F.length) {
            case 1:
              if (_[0] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
              break;
            case 2:
              if (_[0] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + _[0] + ") must match Matrix rows (" + F[0] + ")");
              break;
            default:
              throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + F.length + " dimensions)");
          }
          break;
        case 2:
          switch (F.length) {
            case 1:
              if (_[1] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + _[1] + ") must match Vector length (" + F[0] + ")");
              break;
            case 2:
              if (_[1] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + _[1] + ") must match Matrix B rows (" + F[0] + ")");
              break;
            default:
              throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + F.length + " dimensions)");
          }
          break;
        default:
          throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + _.length + " dimensions)");
      }
    }
    function l(_, F, N) {
      if (N === 0) throw new Error("Cannot multiply two empty vectors");
      return f(_, F);
    }
    function d(_, F) {
      if (F.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
      return y(_, F);
    }
    function y(_, F) {
      var N = _._data, S = _._size, b = _._datatype || _.getDataType(), M = F._data, O = F._size, P = F._datatype || F.getDataType(), $ = S[0], z = O[1], V, Y = t, rr = n;
      b && P && b === P && typeof b == "string" && b !== "mixed" && (V = b, Y = e.find(t, [
        V,
        V
      ]), rr = e.find(n, [
        V,
        V
      ]));
      for (var I = [], R = 0; R < z; R++) {
        for (var Q = rr(N[0], M[0][R]), j = 1; j < $; j++) Q = Y(Q, rr(N[j], M[j][R]));
        I[R] = Q;
      }
      return _.createDenseMatrix({
        data: I,
        size: [
          z
        ],
        datatype: b === _._datatype && P === F._datatype ? V : void 0
      });
    }
    var p = e("_multiplyMatrixVector", {
      "DenseMatrix, any": s,
      "SparseMatrix, any": B
    }), D = e("_multiplyMatrixMatrix", {
      "DenseMatrix, DenseMatrix": E,
      "DenseMatrix, SparseMatrix": w,
      "SparseMatrix, DenseMatrix": A,
      "SparseMatrix, SparseMatrix": x
    });
    function s(_, F) {
      var N = _._data, S = _._size, b = _._datatype || _.getDataType(), M = F._data, O = F._datatype || F.getDataType(), P = S[0], $ = S[1], z, V = t, Y = n;
      b && O && b === O && typeof b == "string" && b !== "mixed" && (z = b, V = e.find(t, [
        z,
        z
      ]), Y = e.find(n, [
        z,
        z
      ]));
      for (var rr = [], I = 0; I < P; I++) {
        for (var R = N[I], Q = Y(R[0], M[0]), j = 1; j < $; j++) Q = V(Q, Y(R[j], M[j]));
        rr[I] = Q;
      }
      return _.createDenseMatrix({
        data: rr,
        size: [
          P
        ],
        datatype: b === _._datatype && O === F._datatype ? z : void 0
      });
    }
    function E(_, F) {
      var N = _._data, S = _._size, b = _._datatype || _.getDataType(), M = F._data, O = F._size, P = F._datatype || F.getDataType(), $ = S[0], z = S[1], V = O[1], Y, rr = t, I = n;
      b && P && b === P && typeof b == "string" && b !== "mixed" && b !== "mixed" && (Y = b, rr = e.find(t, [
        Y,
        Y
      ]), I = e.find(n, [
        Y,
        Y
      ]));
      for (var R = [], Q = 0; Q < $; Q++) {
        var j = N[Q];
        R[Q] = [];
        for (var q = 0; q < V; q++) {
          for (var W = I(j[0], M[0][q]), k = 1; k < z; k++) W = rr(W, I(j[k], M[k][q]));
          R[Q][q] = W;
        }
      }
      return _.createDenseMatrix({
        data: R,
        size: [
          $,
          V
        ],
        datatype: b === _._datatype && P === F._datatype ? Y : void 0
      });
    }
    function w(_, F) {
      var N = _._data, S = _._size, b = _._datatype || _.getDataType(), M = F._values, O = F._index, P = F._ptr, $ = F._size, z = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
      if (!M) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
      var V = S[0], Y = $[1], rr, I = t, R = n, Q = u, j = 0;
      b && z && b === z && typeof b == "string" && b !== "mixed" && (rr = b, I = e.find(t, [
        rr,
        rr
      ]), R = e.find(n, [
        rr,
        rr
      ]), Q = e.find(u, [
        rr,
        rr
      ]), j = e.convert(0, rr));
      for (var q = [], W = [], k = [], K = F.createSparseMatrix({
        values: q,
        index: W,
        ptr: k,
        size: [
          V,
          Y
        ],
        datatype: b === _._datatype && z === F._datatype ? rr : void 0
      }), J = 0; J < Y; J++) {
        k[J] = W.length;
        var G = P[J], Z = P[J + 1];
        if (Z > G) for (var H = 0, tr = 0; tr < V; tr++) {
          for (var ar = tr + 1, er = void 0, or = G; or < Z; or++) {
            var cr = O[or];
            H !== ar ? (er = R(N[tr][cr], M[or]), H = ar) : er = I(er, R(N[tr][cr], M[or]));
          }
          H === ar && !Q(er, j) && (W.push(tr), q.push(er));
        }
      }
      return k[Y] = W.length, K;
    }
    function B(_, F) {
      var N = _._values, S = _._index, b = _._ptr, M = _._datatype || _._data === void 0 ? _._datatype : _.getDataType();
      if (!N) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var O = F._data, P = F._datatype || F.getDataType(), $ = _._size[0], z = F._size[0], V = [], Y = [], rr = [], I, R = t, Q = n, j = u, q = 0;
      M && P && M === P && typeof M == "string" && M !== "mixed" && (I = M, R = e.find(t, [
        I,
        I
      ]), Q = e.find(n, [
        I,
        I
      ]), j = e.find(u, [
        I,
        I
      ]), q = e.convert(0, I));
      var W = [], k = [];
      rr[0] = 0;
      for (var K = 0; K < z; K++) {
        var J = O[K];
        if (!j(J, q)) for (var G = b[K], Z = b[K + 1], H = G; H < Z; H++) {
          var tr = S[H];
          k[tr] ? W[tr] = R(W[tr], Q(J, N[H])) : (k[tr] = true, Y.push(tr), W[tr] = Q(J, N[H]));
        }
      }
      for (var ar = Y.length, er = 0; er < ar; er++) {
        var or = Y[er];
        V[er] = W[or];
      }
      return rr[1] = Y.length, _.createSparseMatrix({
        values: V,
        index: Y,
        ptr: rr,
        size: [
          $,
          1
        ],
        datatype: M === _._datatype && P === F._datatype ? I : void 0
      });
    }
    function A(_, F) {
      var N = _._values, S = _._index, b = _._ptr, M = _._datatype || _._data === void 0 ? _._datatype : _.getDataType();
      if (!N) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var O = F._data, P = F._datatype || F.getDataType(), $ = _._size[0], z = F._size[0], V = F._size[1], Y, rr = t, I = n, R = u, Q = 0;
      M && P && M === P && typeof M == "string" && M !== "mixed" && (Y = M, rr = e.find(t, [
        Y,
        Y
      ]), I = e.find(n, [
        Y,
        Y
      ]), R = e.find(u, [
        Y,
        Y
      ]), Q = e.convert(0, Y));
      for (var j = [], q = [], W = [], k = _.createSparseMatrix({
        values: j,
        index: q,
        ptr: W,
        size: [
          $,
          V
        ],
        datatype: M === _._datatype && P === F._datatype ? Y : void 0
      }), K = [], J = [], G = 0; G < V; G++) {
        W[G] = q.length;
        for (var Z = G + 1, H = 0; H < z; H++) {
          var tr = O[H][G];
          if (!R(tr, Q)) for (var ar = b[H], er = b[H + 1], or = ar; or < er; or++) {
            var cr = S[or];
            J[cr] !== Z ? (J[cr] = Z, q.push(cr), K[cr] = I(tr, N[or])) : K[cr] = rr(K[cr], I(tr, N[or]));
          }
        }
        for (var sr = W[G], mr = q.length, gr = sr; gr < mr; gr++) {
          var dr = q[gr];
          j[gr] = K[dr];
        }
      }
      return W[V] = q.length, k;
    }
    function x(_, F) {
      var N = _._values, S = _._index, b = _._ptr, M = _._datatype || _._data === void 0 ? _._datatype : _.getDataType(), O = F._values, P = F._index, $ = F._ptr, z = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), V = _._size[0], Y = F._size[1], rr = N && O, I, R = t, Q = n;
      M && z && M === z && typeof M == "string" && M !== "mixed" && (I = M, R = e.find(t, [
        I,
        I
      ]), Q = e.find(n, [
        I,
        I
      ]));
      for (var j = rr ? [] : void 0, q = [], W = [], k = _.createSparseMatrix({
        values: j,
        index: q,
        ptr: W,
        size: [
          V,
          Y
        ],
        datatype: M === _._datatype && z === F._datatype ? I : void 0
      }), K = rr ? [] : void 0, J = [], G, Z, H, tr, ar, er, or, cr, sr = 0; sr < Y; sr++) {
        W[sr] = q.length;
        var mr = sr + 1;
        for (ar = $[sr], er = $[sr + 1], tr = ar; tr < er; tr++) if (cr = P[tr], rr) for (Z = b[cr], H = b[cr + 1], G = Z; G < H; G++) or = S[G], J[or] !== mr ? (J[or] = mr, q.push(or), K[or] = Q(O[tr], N[G])) : K[or] = R(K[or], Q(O[tr], N[G]));
        else for (Z = b[cr], H = b[cr + 1], G = Z; G < H; G++) or = S[G], J[or] !== mr && (J[or] = mr, q.push(or));
        if (rr) for (var gr = W[sr], dr = q.length, br = gr; br < dr; br++) {
          var Er = q[br];
          j[br] = K[Er];
        }
      }
      return W[Y] = q.length, k;
    }
    return e(jn, n, {
      "Array, Array": e.referTo("Matrix, Matrix", (_) => (F, N) => {
        c(Br(F), Br(N));
        var S = _(a(F), a(N));
        return Nr(S) ? S.valueOf() : S;
      }),
      "Matrix, Matrix": function(F, N) {
        var S = F.size(), b = N.size();
        return c(S, b), S.length === 1 ? b.length === 1 ? l(F, N, S[0]) : d(F, N) : b.length === 1 ? p(F, N) : D(F, N);
      },
      "Matrix, Array": e.referTo("Matrix,Matrix", (_) => (F, N) => _(F, a(N))),
      "Array, Matrix": e.referToSelf((_) => (F, N) => _(a(F, N.storage()), N)),
      "SparseMatrix, any": function(F, N) {
        return m(F, N, n, false);
      },
      "DenseMatrix, any": function(F, N) {
        return v(F, N, n, false);
      },
      "any, SparseMatrix": function(F, N) {
        return m(N, F, n, true);
      },
      "any, DenseMatrix": function(F, N) {
        return v(N, F, n, true);
      },
      "Array, any": function(F, N) {
        return v(a(F), N, n, false).valueOf();
      },
      "any, Array": function(F, N) {
        return v(a(N), F, n, true).valueOf();
      },
      "any, any": n,
      "any, any, ...any": e.referToSelf((_) => (F, N, S) => {
        for (var b = _(F, N), M = 0; M < S.length; M++) b = _(b, S[M]);
        return b;
      })
    });
  }), ra = "sign", qs = [
    "typed",
    "BigNumber",
    "Fraction",
    "complex"
  ], ks = nr(ra, qs, (r) => {
    var { typed: e, BigNumber: a, complex: t, Fraction: n } = r;
    return e(ra, {
      number: an,
      Complex: function(f) {
        return f.im === 0 ? t(an(f.re)) : f.sign();
      },
      BigNumber: function(f) {
        return new a(f.cmp(0));
      },
      bigint: function(f) {
        return f > 0n ? 1n : f < 0n ? -1n : 0n;
      },
      Fraction: function(f) {
        return new n(f.s);
      },
      "Array | Matrix": e.referToSelf((u) => (f) => Ee(f, u, true)),
      Unit: e.referToSelf((u) => (f) => {
        if (!f._isDerived() && f.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
        return e.find(u, f.valueType())(f.value);
      })
    });
  }), Ys = "sqrt", Ws = [
    "config",
    "typed",
    "Complex"
  ], Xs = nr(Ys, Ws, (r) => {
    var { config: e, typed: a, Complex: t } = r;
    return a("sqrt", {
      number: n,
      Complex: function(f) {
        return f.sqrt();
      },
      BigNumber: function(f) {
        return !f.isNegative() || e.predictable ? f.sqrt() : n(f.toNumber());
      },
      Unit: function(f) {
        return f.pow(0.5);
      }
    });
    function n(u) {
      return isNaN(u) ? NaN : u >= 0 || e.predictable ? Math.sqrt(u) : new t(u, 0).sqrt();
    }
  }), ea = "subtract", Gs = [
    "typed",
    "matrix",
    "equalScalar",
    "subtractScalar",
    "unaryMinus",
    "DenseMatrix",
    "concat"
  ], Vs = nr(ea, Gs, (r) => {
    var { typed: e, matrix: a, equalScalar: t, subtractScalar: n, unaryMinus: u, DenseMatrix: f, concat: m } = r, v = li({
      typed: e
    }), c = ut({
      typed: e
    }), l = As({
      typed: e,
      equalScalar: t
    }), d = ci({
      typed: e,
      DenseMatrix: f
    }), y = it({
      typed: e,
      DenseMatrix: f
    }), p = Ke({
      typed: e,
      matrix: a,
      concat: m
    });
    return e(ea, {
      "any, any": n
    }, p({
      elop: n,
      SS: l,
      DS: v,
      SD: c,
      Ss: y,
      sS: d
    }));
  }), Hs = "matAlgo07xSSf", Ks = [
    "typed",
    "SparseMatrix"
  ], Dt = nr(Hs, Ks, (r) => {
    var { typed: e, SparseMatrix: a } = r;
    return function(u, f, m) {
      var v = u._size, c = u._datatype || u._data === void 0 ? u._datatype : u.getDataType(), l = f._size, d = f._datatype || f._data === void 0 ? f._datatype : f.getDataType();
      if (v.length !== l.length) throw new xr(v.length, l.length);
      if (v[0] !== l[0] || v[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + v + ") must match Matrix B (" + l + ")");
      var y = v[0], p = v[1], D, s = 0, E = m;
      typeof c == "string" && c === d && c !== "mixed" && (D = c, s = e.convert(0, D), E = e.find(m, [
        D,
        D
      ]));
      for (var w = [], B = [], A = new Array(p + 1).fill(0), x = [], _ = [], F = [], N = [], S = 0; S < p; S++) {
        var b = S + 1, M = 0;
        t(u, S, F, x, b), t(f, S, N, _, b);
        for (var O = 0; O < y; O++) {
          var P = F[O] === b ? x[O] : s, $ = N[O] === b ? _[O] : s, z = E(P, $);
          z !== 0 && z !== false && (B.push(O), w.push(z), M++);
        }
        A[S + 1] = A[S] + M;
      }
      return new a({
        values: w,
        index: B,
        ptr: A,
        size: [
          y,
          p
        ],
        datatype: c === u._datatype && d === f._datatype ? D : void 0
      });
    };
    function t(n, u, f, m, v) {
      for (var c = n._values, l = n._index, d = n._ptr, y = d[u], p = d[u + 1]; y < p; y++) {
        var D = l[y];
        f[D] = v, m[D] = c[y];
      }
    }
  }), ta = "conj", Qs = [
    "typed"
  ], Js = nr(ta, Qs, (r) => {
    var { typed: e } = r;
    return e(ta, {
      "number | BigNumber | Fraction": (a) => a,
      Complex: (a) => a.conjugate(),
      "Array | Matrix": e.referToSelf((a) => (t) => Ee(t, a))
    });
  }), na = "im", Zs = [
    "typed"
  ], js = nr(na, Zs, (r) => {
    var { typed: e } = r;
    return e(na, {
      number: () => 0,
      "BigNumber | Fraction": (a) => a.mul(0),
      Complex: (a) => a.im,
      "Array | Matrix": e.referToSelf((a) => (t) => Ee(t, a))
    });
  }), aa = "re", rf = [
    "typed"
  ], ef = nr(aa, rf, (r) => {
    var { typed: e } = r;
    return e(aa, {
      "number | BigNumber | Fraction": (a) => a,
      Complex: (a) => a.re,
      "Array | Matrix": e.referToSelf((a) => (t) => Ee(t, a))
    });
  }), ia = "concat", tf = [
    "typed",
    "matrix",
    "isInteger"
  ], nf = nr(ia, tf, (r) => {
    var { typed: e, matrix: a, isInteger: t } = r;
    return e(ia, {
      "...Array | Matrix | number | BigNumber": function(u) {
        var f, m = u.length, v = -1, c, l = false, d = [];
        for (f = 0; f < m; f++) {
          var y = u[f];
          if (Nr(y) && (l = true), Ur(y) || Xr(y)) {
            if (f !== m - 1) throw new Error("Dimension must be specified as last argument");
            if (c = v, v = y.valueOf(), !t(v)) throw new TypeError("Integer number expected for dimension");
            if (v < 0 || f > 0 && v > c) throw new Ge(v, c + 1);
          } else {
            var p = Mr(y).valueOf(), D = Br(p);
            if (d[f] = p, c = v, v = D.length - 1, f > 0 && v !== c) throw new xr(c + 1, v + 1);
          }
        }
        if (d.length === 0) throw new SyntaxError("At least one matrix expected");
        for (var s = d.shift(); d.length; ) s = Za(s, d.shift(), v);
        return l ? a(s) : s;
      },
      "...string": function(u) {
        return u.join("");
      }
    });
  }), ua = "column", af = [
    "typed",
    "Index",
    "matrix",
    "range"
  ], uf = nr(ua, af, (r) => {
    var { typed: e, Index: a, matrix: t, range: n } = r;
    return e(ua, {
      "Matrix, number": u,
      "Array, number": function(m, v) {
        return u(t(Mr(m)), v).valueOf();
      }
    });
    function u(f, m) {
      if (f.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
      Wr(m, f.size()[1]);
      var v = n(0, f.size()[0]), c = new a(v, m), l = f.subset(c);
      return Nr(l) ? l : t([
        [
          l
        ]
      ]);
    }
  }), oa = "cross", of = [
    "typed",
    "matrix",
    "subtract",
    "multiply"
  ], sf = nr(oa, of, (r) => {
    var { typed: e, matrix: a, subtract: t, multiply: n } = r;
    return e(oa, {
      "Matrix, Matrix": function(m, v) {
        return a(u(m.toArray(), v.toArray()));
      },
      "Matrix, Array": function(m, v) {
        return a(u(m.toArray(), v));
      },
      "Array, Matrix": function(m, v) {
        return a(u(m, v.toArray()));
      },
      "Array, Array": u
    });
    function u(f, m) {
      var v = Math.max(Br(f).length, Br(m).length);
      f = qn(f), m = qn(m);
      var c = Br(f), l = Br(m);
      if (c.length !== 1 || l.length !== 1 || c[0] !== 3 || l[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + c.join(", ") + "], B = [" + l.join(", ") + "])");
      var d = [
        t(n(f[1], m[2]), n(f[2], m[1])),
        t(n(f[2], m[0]), n(f[0], m[2])),
        t(n(f[0], m[1]), n(f[1], m[0]))
      ];
      return v > 1 ? [
        d
      ] : d;
    }
  }), sa = "diag", ff = [
    "typed",
    "matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], lf = nr(sa, ff, (r) => {
    var { typed: e, matrix: a, DenseMatrix: t, SparseMatrix: n } = r;
    return e(sa, {
      Array: function(c) {
        return u(c, 0, Br(c), null);
      },
      "Array, number": function(c, l) {
        return u(c, l, Br(c), null);
      },
      "Array, BigNumber": function(c, l) {
        return u(c, l.toNumber(), Br(c), null);
      },
      "Array, string": function(c, l) {
        return u(c, 0, Br(c), l);
      },
      "Array, number, string": function(c, l, d) {
        return u(c, l, Br(c), d);
      },
      "Array, BigNumber, string": function(c, l, d) {
        return u(c, l.toNumber(), Br(c), d);
      },
      Matrix: function(c) {
        return u(c, 0, c.size(), c.storage());
      },
      "Matrix, number": function(c, l) {
        return u(c, l, c.size(), c.storage());
      },
      "Matrix, BigNumber": function(c, l) {
        return u(c, l.toNumber(), c.size(), c.storage());
      },
      "Matrix, string": function(c, l) {
        return u(c, 0, c.size(), l);
      },
      "Matrix, number, string": function(c, l, d) {
        return u(c, l, c.size(), d);
      },
      "Matrix, BigNumber, string": function(c, l, d) {
        return u(c, l.toNumber(), c.size(), d);
      }
    });
    function u(v, c, l, d) {
      if (!$r(c)) throw new TypeError("Second parameter in function diag must be an integer");
      var y = c > 0 ? c : 0, p = c < 0 ? -c : 0;
      switch (l.length) {
        case 1:
          return f(v, c, d, l[0], p, y);
        case 2:
          return m(v, c, d, l, p, y);
      }
      throw new RangeError("Matrix for function diag must be 2 dimensional");
    }
    function f(v, c, l, d, y, p) {
      var D = [
        d + y,
        d + p
      ];
      if (l && l !== "sparse" && l !== "dense") throw new TypeError("Unknown matrix type ".concat(l, '"'));
      var s = l === "sparse" ? n.diagonal(D, v, c) : t.diagonal(D, v, c);
      return l !== null ? s : s.valueOf();
    }
    function m(v, c, l, d, y, p) {
      if (Nr(v)) {
        var D = v.diagonal(c);
        return l !== null ? l !== D.storage() ? a(D, l) : D : D.valueOf();
      }
      for (var s = Math.min(d[0] - y, d[1] - p), E = [], w = 0; w < s; w++) E[w] = v[w + y][w + p];
      return l !== null ? a(E) : E;
    }
  }), fa = "flatten", cf = [
    "typed"
  ], vf = nr(fa, cf, (r) => {
    var { typed: e } = r;
    return e(fa, {
      Array: function(t) {
        return tn(t);
      },
      Matrix: function(t) {
        return t.create(tn(t.valueOf(), true), t.datatype());
      }
    });
  }), la = "getMatrixDataType", df = [
    "typed"
  ], mf = nr(la, df, (r) => {
    var { typed: e } = r;
    return e(la, {
      Array: function(t) {
        return Lt(t, ye);
      },
      Matrix: function(t) {
        return t.getDataType();
      }
    });
  }), ca = "identity", pf = [
    "typed",
    "config",
    "matrix",
    "BigNumber",
    "DenseMatrix",
    "SparseMatrix"
  ], hf = nr(ca, pf, (r) => {
    var { typed: e, config: a, matrix: t, BigNumber: n, DenseMatrix: u, SparseMatrix: f } = r;
    return e(ca, {
      "": function() {
        return a.matrix === "Matrix" ? t([]) : [];
      },
      string: function(l) {
        return t(l);
      },
      "number | BigNumber": function(l) {
        return v(l, l, a.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, string": function(l, d) {
        return v(l, l, d);
      },
      "number | BigNumber, number | BigNumber": function(l, d) {
        return v(l, d, a.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, number | BigNumber, string": function(l, d, y) {
        return v(l, d, y);
      },
      Array: function(l) {
        return m(l);
      },
      "Array, string": function(l, d) {
        return m(l, d);
      },
      Matrix: function(l) {
        return m(l.valueOf(), l.storage());
      },
      "Matrix, string": function(l, d) {
        return m(l.valueOf(), d);
      }
    });
    function m(c, l) {
      switch (c.length) {
        case 0:
          return l ? t(l) : [];
        case 1:
          return v(c[0], c[0], l);
        case 2:
          return v(c[0], c[1], l);
        default:
          throw new Error("Vector containing two values expected");
      }
    }
    function v(c, l, d) {
      var y = Xr(c) || Xr(l) ? n : null;
      if (Xr(c) && (c = c.toNumber()), Xr(l) && (l = l.toNumber()), !$r(c) || c < 1) throw new Error("Parameters in function identity must be positive integers");
      if (!$r(l) || l < 1) throw new Error("Parameters in function identity must be positive integers");
      var p = y ? new n(1) : 1, D = y ? new y(0) : 0, s = [
        c,
        l
      ];
      if (d) {
        if (d === "sparse") return f.diagonal(s, p, 0, D);
        if (d === "dense") return u.diagonal(s, p, 0, D);
        throw new TypeError('Unknown matrix type "'.concat(d, '"'));
      }
      for (var E = Bt([], s, D), w = c < l ? c : l, B = 0; B < w; B++) E[B][B] = p;
      return E;
    }
  }), va = "kron", Df = [
    "typed",
    "matrix",
    "multiplyScalar"
  ], gf = nr(va, Df, (r) => {
    var { typed: e, matrix: a, multiplyScalar: t } = r;
    return e(va, {
      "Matrix, Matrix": function(f, m) {
        return a(n(f.toArray(), m.toArray()));
      },
      "Matrix, Array": function(f, m) {
        return a(n(f.toArray(), m));
      },
      "Array, Matrix": function(f, m) {
        return a(n(f, m.toArray()));
      },
      "Array, Array": n
    });
    function n(u, f) {
      if (Br(u).length === 1 && (u = [
        u
      ]), Br(f).length === 1 && (f = [
        f
      ]), Br(u).length > 2 || Br(f).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(u.length) + ", y = " + JSON.stringify(f.length) + ")");
      var m = [], v = [];
      return u.map(function(c) {
        return f.map(function(l) {
          return v = [], m.push(v), c.map(function(d) {
            return l.map(function(y) {
              return v.push(t(d, y));
            });
          });
        });
      }) && m;
    }
  });
  function vi() {
    throw new Error('No "bignumber" implementation available');
  }
  function yf() {
    throw new Error('No "fraction" implementation available');
  }
  function di() {
    throw new Error('No "matrix" implementation available');
  }
  var da = "range", Ef = [
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
  ], wf = nr(da, Ef, (r) => {
    var { typed: e, config: a, matrix: t, bignumber: n, smaller: u, smallerEq: f, larger: m, largerEq: v, add: c, isPositive: l } = r;
    return e(da, {
      string: y,
      "string, boolean": y,
      number: function(E) {
        throw new TypeError("Too few arguments to function range(): ".concat(E));
      },
      boolean: function(E) {
        throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(E, ", number|bigint|BigNumber|Fraction"));
      },
      "number, number": function(E, w) {
        return d(p(E, w, 1, false));
      },
      "number, number, number": function(E, w, B) {
        return d(p(E, w, B, false));
      },
      "number, number, boolean": function(E, w, B) {
        return d(p(E, w, 1, B));
      },
      "number, number, number, boolean": function(E, w, B, A) {
        return d(p(E, w, B, A));
      },
      "bigint, bigint|number": function(E, w) {
        return d(p(E, w, 1n, false));
      },
      "number, bigint": function(E, w) {
        return d(p(BigInt(E), w, 1n, false));
      },
      "bigint, bigint|number, bigint|number": function(E, w, B) {
        return d(p(E, w, BigInt(B), false));
      },
      "number, bigint, bigint|number": function(E, w, B) {
        return d(p(BigInt(E), w, BigInt(B), false));
      },
      "bigint, bigint|number, boolean": function(E, w, B) {
        return d(p(E, w, 1n, B));
      },
      "number, bigint, boolean": function(E, w, B) {
        return d(p(BigInt(E), w, 1n, B));
      },
      "bigint, bigint|number, bigint|number, boolean": function(E, w, B, A) {
        return d(p(E, w, BigInt(B), A));
      },
      "number, bigint, bigint|number, boolean": function(E, w, B, A) {
        return d(p(BigInt(E), w, BigInt(B), A));
      },
      "BigNumber, BigNumber": function(E, w) {
        var B = E.constructor;
        return d(p(E, w, new B(1), false));
      },
      "BigNumber, BigNumber, BigNumber": function(E, w, B) {
        return d(p(E, w, B, false));
      },
      "BigNumber, BigNumber, boolean": function(E, w, B) {
        var A = E.constructor;
        return d(p(E, w, new A(1), B));
      },
      "BigNumber, BigNumber, BigNumber, boolean": function(E, w, B, A) {
        return d(p(E, w, B, A));
      },
      "Fraction, Fraction": function(E, w) {
        return d(p(E, w, 1, false));
      },
      "Fraction, Fraction, Fraction": function(E, w, B) {
        return d(p(E, w, B, false));
      },
      "Fraction, Fraction, boolean": function(E, w, B) {
        return d(p(E, w, 1, B));
      },
      "Fraction, Fraction, Fraction, boolean": function(E, w, B, A) {
        return d(p(E, w, B, A));
      },
      "Unit, Unit, Unit": function(E, w, B) {
        return d(p(E, w, B, false));
      },
      "Unit, Unit, Unit, boolean": function(E, w, B, A) {
        return d(p(E, w, B, A));
      }
    });
    function d(s) {
      return a.matrix === "Matrix" ? t ? t(s) : di() : s;
    }
    function y(s, E) {
      var w = D(s);
      if (!w) throw new SyntaxError('String "' + s + '" is no valid range');
      return a.number === "BigNumber" ? (n === void 0 && vi(), d(p(n(w.start), n(w.end), n(w.step)))) : d(p(w.start, w.end, w.step, E));
    }
    function p(s, E, w, B) {
      for (var A = [], x = l(w) ? B ? f : u : B ? v : m, _ = s; x(_, E); ) A.push(_), _ = c(_, w);
      return A;
    }
    function D(s) {
      var E = s.split(":"), w = E.map(function(A) {
        return Number(A);
      }), B = w.some(function(A) {
        return isNaN(A);
      });
      if (B) return null;
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
  }), ma = "reshape", Af = [
    "typed",
    "isInteger",
    "matrix"
  ], Ff = nr(ma, Af, (r) => {
    var { typed: e, isInteger: a } = r;
    return e(ma, {
      "Matrix, Array": function(n, u) {
        return n.reshape(u, true);
      },
      "Array, Array": function(n, u) {
        return u.forEach(function(f) {
          if (!a(f)) throw new TypeError("Invalid size for dimension: " + f);
        }), cn(n, u);
      }
    });
  }), pa = "size", bf = [
    "typed",
    "config",
    "?matrix"
  ], _f = nr(pa, bf, (r) => {
    var { typed: e, config: a, matrix: t } = r;
    return e(pa, {
      Matrix: function(u) {
        return u.create(u.size(), "number");
      },
      Array: Br,
      string: function(u) {
        return a.matrix === "Array" ? [
          u.length
        ] : t([
          u.length
        ], "dense", "number");
      },
      "number | Complex | BigNumber | Unit | boolean | null": function(u) {
        return a.matrix === "Array" ? [] : t ? t([], "dense", "number") : di();
      }
    });
  }), ha = "transpose", Cf = [
    "typed",
    "matrix"
  ], Sf = nr(ha, Cf, (r) => {
    var { typed: e, matrix: a } = r;
    return e(ha, {
      Array: (f) => t(a(f)).valueOf(),
      Matrix: t,
      any: Mr
    });
    function t(f) {
      var m = f.size(), v;
      switch (m.length) {
        case 1:
          v = f.clone();
          break;
        case 2:
          {
            var c = m[0], l = m[1];
            if (l === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Lr(m) + ")");
            switch (f.storage()) {
              case "dense":
                v = n(f, c, l);
                break;
              case "sparse":
                v = u(f, c, l);
                break;
            }
          }
          break;
        default:
          throw new RangeError("Matrix must be a vector or two dimensional (size: " + Lr(m) + ")");
      }
      return v;
    }
    function n(f, m, v) {
      for (var c = f._data, l = [], d, y = 0; y < v; y++) {
        d = l[y] = [];
        for (var p = 0; p < m; p++) d[p] = Mr(c[p][y]);
      }
      return f.createDenseMatrix({
        data: l,
        size: [
          v,
          m
        ],
        datatype: f._datatype
      });
    }
    function u(f, m, v) {
      for (var c = f._values, l = f._index, d = f._ptr, y = c ? [] : void 0, p = [], D = [], s = [], E = 0; E < m; E++) s[E] = 0;
      var w, B, A;
      for (w = 0, B = l.length; w < B; w++) s[l[w]]++;
      for (var x = 0, _ = 0; _ < m; _++) D.push(x), x += s[_], s[_] = D[_];
      for (D.push(x), A = 0; A < v; A++) for (var F = d[A], N = d[A + 1], S = F; S < N; S++) {
        var b = s[l[S]]++;
        p[b] = A, c && (y[b] = Mr(c[S]));
      }
      return f.createSparseMatrix({
        values: y,
        index: p,
        ptr: D,
        size: [
          v,
          m
        ],
        datatype: f._datatype
      });
    }
  }), Da = "ctranspose", Bf = [
    "typed",
    "transpose",
    "conj"
  ], Mf = nr(Da, Bf, (r) => {
    var { typed: e, transpose: a, conj: t } = r;
    return e(Da, {
      any: function(u) {
        return t(a(u));
      }
    });
  }), ga = "zeros", xf = [
    "typed",
    "config",
    "matrix",
    "BigNumber"
  ], Nf = nr(ga, xf, (r) => {
    var { typed: e, config: a, matrix: t, BigNumber: n } = r;
    return e(ga, {
      "": function() {
        return a.matrix === "Array" ? u([]) : u([], "default");
      },
      "...number | BigNumber | string": function(c) {
        var l = c[c.length - 1];
        if (typeof l == "string") {
          var d = c.pop();
          return u(c, d);
        } else return a.matrix === "Array" ? u(c) : u(c, "default");
      },
      Array: u,
      Matrix: function(c) {
        var l = c.storage();
        return u(c.valueOf(), l);
      },
      "Array | Matrix, string": function(c, l) {
        return u(c.valueOf(), l);
      }
    });
    function u(v, c) {
      var l = f(v), d = l ? new n(0) : 0;
      if (m(v), c) {
        var y = t(c);
        return v.length > 0 ? y.resize(v, d) : y;
      } else {
        var p = [];
        return v.length > 0 ? Bt(p, v, d) : p;
      }
    }
    function f(v) {
      var c = false;
      return v.forEach(function(l, d, y) {
        Xr(l) && (c = true, y[d] = l.toNumber());
      }), c;
    }
    function m(v) {
      v.forEach(function(c) {
        if (typeof c != "number" || !$r(c) || c < 0) throw new Error("Parameters in function zeros must be positive integers");
      });
    }
  });
  function ya(r, e, a) {
    var t;
    return String(r).includes("Unexpected type") ? (t = arguments.length > 2 ? " (type: " + ye(a) + ", value: " + JSON.stringify(a) + ")" : " (type: " + r.data.actual + ")", new TypeError("Cannot calculate " + e + ", unexpected type of argument" + t)) : String(r).includes("complex numbers") ? (t = arguments.length > 2 ? " (type: " + ye(a) + ", value: " + JSON.stringify(a) + ")" : "", new TypeError("Cannot calculate " + e + ", no ordering relation is defined for complex numbers" + t)) : r;
  }
  var Tf = "numeric", Of = [
    "number",
    "?bignumber",
    "?fraction"
  ], Pf = nr(Tf, Of, (r) => {
    var { number: e, bignumber: a, fraction: t } = r, n = {
      string: true,
      number: true,
      BigNumber: true,
      Fraction: true
    }, u = {
      number: (f) => e(f),
      BigNumber: a ? (f) => a(f) : vi,
      bigint: (f) => BigInt(f),
      Fraction: t ? (f) => t(f) : yf
    };
    return function(m) {
      var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", c = arguments.length > 2 ? arguments[2] : void 0;
      if (c !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
      var l = ye(m);
      if (!(l in n)) throw new TypeError("Cannot convert " + m + ' of type "' + l + '"; valid input types are ' + Object.keys(n).join(", "));
      if (!(v in u)) throw new TypeError("Cannot convert " + m + ' to type "' + v + '"; valid output types are ' + Object.keys(u).join(", "));
      return v === l ? m : u[v](m);
    };
  }), Ea = "divideScalar", zf = [
    "typed",
    "numeric"
  ], Rf = nr(Ea, zf, (r) => {
    var { typed: e, numeric: a } = r;
    return e(Ea, {
      "number, number": function(n, u) {
        return n / u;
      },
      "Complex, Complex": function(n, u) {
        return n.div(u);
      },
      "BigNumber, BigNumber": function(n, u) {
        return n.div(u);
      },
      "bigint, bigint": function(n, u) {
        return n / u;
      },
      "Fraction, Fraction": function(n, u) {
        return n.div(u);
      },
      "Unit, number | Complex | Fraction | BigNumber | Unit": (t, n) => t.divide(n),
      "number | Fraction | Complex | BigNumber, Unit": (t, n) => n.divideInto(t)
    });
  }), wa = "pow", If = [
    "typed",
    "config",
    "identity",
    "multiply",
    "matrix",
    "inv",
    "fraction",
    "number",
    "Complex"
  ], Uf = nr(wa, If, (r) => {
    var { typed: e, config: a, identity: t, multiply: n, matrix: u, inv: f, number: m, fraction: v, Complex: c } = r;
    return e(wa, {
      "number, number": l,
      "Complex, Complex": function(D, s) {
        return D.pow(s);
      },
      "BigNumber, BigNumber": function(D, s) {
        return s.isInteger() || D >= 0 || a.predictable ? D.pow(s) : new c(D.toNumber(), 0).pow(s.toNumber(), 0);
      },
      "bigint, bigint": (p, D) => p ** D,
      "Fraction, Fraction": function(D, s) {
        var E = D.pow(s);
        if (E != null) return E;
        if (a.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
        return l(D.valueOf(), s.valueOf());
      },
      "Array, number": d,
      "Array, BigNumber": function(D, s) {
        return d(D, s.toNumber());
      },
      "Matrix, number": y,
      "Matrix, BigNumber": function(D, s) {
        return y(D, s.toNumber());
      },
      "Unit, number | BigNumber": function(D, s) {
        return D.pow(s);
      }
    });
    function l(p, D) {
      if (a.predictable && !$r(D) && p < 0) try {
        var s = v(D), E = m(s);
        if ((D === E || Math.abs((D - E) / D) < 1e-14) && s.d % 2n === 1n) return (s.n % 2n === 0n ? 1 : -1) * Math.pow(-p, D);
      } catch {
      }
      return a.predictable && (p < -1 && D === 1 / 0 || p > -1 && p < 0 && D === -1 / 0) ? NaN : $r(D) || p >= 0 || a.predictable ? oi(p, D) : p * p < 1 && D === 1 / 0 || p * p > 1 && D === -1 / 0 ? 0 : new c(p, 0).pow(D, 0);
    }
    function d(p, D) {
      if (!$r(D)) throw new TypeError("For A^b, b must be an integer (value is " + D + ")");
      var s = Br(p);
      if (s.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + s.length + " dimensions)");
      if (s[0] !== s[1]) throw new Error("For A^b, A must be square (size is " + s[0] + "x" + s[1] + ")");
      if (D < 0) try {
        return d(f(p), -D);
      } catch (B) {
        throw B.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + D + ")") : B;
      }
      for (var E = t(s[0]).valueOf(), w = p; D >= 1; ) (D & 1) === 1 && (E = n(w, E)), D >>= 1, w = n(w, w);
      return E;
    }
    function y(p, D) {
      return u(d(p.valueOf(), D));
    }
  });
  function mi(r) {
    var { DenseMatrix: e } = r;
    return function(t, n, u) {
      var f = t.size();
      if (f.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + Lr(f) + ")");
      var m = f[0], v = f[1];
      if (m !== v) throw new RangeError("Matrix must be square (size: " + Lr(f) + ")");
      var c = [];
      if (Nr(n)) {
        var l = n.size(), d = n._data;
        if (l.length === 1) {
          if (l[0] !== m) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var y = 0; y < m; y++) c[y] = [
            d[y]
          ];
          return new e({
            data: c,
            size: [
              m,
              1
            ],
            datatype: n._datatype
          });
        }
        if (l.length === 2) {
          if (l[0] !== m || l[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          if (Ua(n)) {
            if (u) {
              c = [];
              for (var p = 0; p < m; p++) c[p] = [
                d[p][0]
              ];
              return new e({
                data: c,
                size: [
                  m,
                  1
                ],
                datatype: n._datatype
              });
            }
            return n;
          }
          if ($a(n)) {
            for (var D = 0; D < m; D++) c[D] = [
              0
            ];
            for (var s = n._values, E = n._index, w = n._ptr, B = w[1], A = w[0]; A < B; A++) {
              var x = E[A];
              c[x][0] = s[A];
            }
            return new e({
              data: c,
              size: [
                m,
                1
              ],
              datatype: n._datatype
            });
          }
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
      if (kr(n)) {
        var _ = Br(n);
        if (_.length === 1) {
          if (_[0] !== m) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var F = 0; F < m; F++) c[F] = [
            n[F]
          ];
          return new e({
            data: c,
            size: [
              m,
              1
            ]
          });
        }
        if (_.length === 2) {
          if (_[0] !== m || _[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var N = 0; N < m; N++) c[N] = [
            n[N][0]
          ];
          return new e({
            data: c,
            size: [
              m,
              1
            ]
          });
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
    };
  }
  var Aa = "usolve", $f = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], Lf = nr(Aa, $f, (r) => {
    var { typed: e, matrix: a, divideScalar: t, multiplyScalar: n, subtractScalar: u, equalScalar: f, DenseMatrix: m } = r, v = mi({
      DenseMatrix: m
    });
    return e(Aa, {
      "SparseMatrix, Array | Matrix": function(y, p) {
        return l(y, p);
      },
      "DenseMatrix, Array | Matrix": function(y, p) {
        return c(y, p);
      },
      "Array, Array | Matrix": function(y, p) {
        var D = a(y), s = c(D, p);
        return s.valueOf();
      }
    });
    function c(d, y) {
      y = v(d, y, true);
      for (var p = y._data, D = d._size[0], s = d._size[1], E = [], w = d._data, B = s - 1; B >= 0; B--) {
        var A = p[B][0] || 0, x = void 0;
        if (f(A, 0)) x = 0;
        else {
          var _ = w[B][B];
          if (f(_, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          x = t(A, _);
          for (var F = B - 1; F >= 0; F--) p[F] = [
            u(p[F][0] || 0, n(x, w[F][B]))
          ];
        }
        E[B] = [
          x
        ];
      }
      return new m({
        data: E,
        size: [
          D,
          1
        ]
      });
    }
    function l(d, y) {
      y = v(d, y, true);
      for (var p = y._data, D = d._size[0], s = d._size[1], E = d._values, w = d._index, B = d._ptr, A = [], x = s - 1; x >= 0; x--) {
        var _ = p[x][0] || 0;
        if (f(_, 0)) A[x] = [
          0
        ];
        else {
          for (var F = 0, N = [], S = [], b = B[x], M = B[x + 1], O = M - 1; O >= b; O--) {
            var P = w[O];
            P === x ? F = E[O] : P < x && (N.push(E[O]), S.push(P));
          }
          if (f(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          for (var $ = t(_, F), z = 0, V = S.length; z < V; z++) {
            var Y = S[z];
            p[Y] = [
              u(p[Y][0], n($, N[z]))
            ];
          }
          A[x] = [
            $
          ];
        }
      }
      return new m({
        data: A,
        size: [
          D,
          1
        ]
      });
    }
  }), Fa = "usolveAll", qf = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], kf = nr(Fa, qf, (r) => {
    var { typed: e, matrix: a, divideScalar: t, multiplyScalar: n, subtractScalar: u, equalScalar: f, DenseMatrix: m } = r, v = mi({
      DenseMatrix: m
    });
    return e(Fa, {
      "SparseMatrix, Array | Matrix": function(y, p) {
        return l(y, p);
      },
      "DenseMatrix, Array | Matrix": function(y, p) {
        return c(y, p);
      },
      "Array, Array | Matrix": function(y, p) {
        var D = a(y), s = c(D, p);
        return s.map((E) => E.valueOf());
      }
    });
    function c(d, y) {
      for (var p = [
        v(d, y, true)._data.map((S) => S[0])
      ], D = d._data, s = d._size[0], E = d._size[1], w = E - 1; w >= 0; w--) for (var B = p.length, A = 0; A < B; A++) {
        var x = p[A];
        if (f(D[w][w], 0)) if (f(x[w], 0)) {
          if (A === 0) {
            var F = [
              ...x
            ];
            F[w] = 1;
            for (var N = w - 1; N >= 0; N--) F[N] = u(F[N], D[N][w]);
            p.push(F);
          }
        } else {
          if (A === 0) return [];
          p.splice(A, 1), A -= 1, B -= 1;
        }
        else {
          x[w] = t(x[w], D[w][w]);
          for (var _ = w - 1; _ >= 0; _--) x[_] = u(x[_], n(x[w], D[_][w]));
        }
      }
      return p.map((S) => new m({
        data: S.map((b) => [
          b
        ]),
        size: [
          s,
          1
        ]
      }));
    }
    function l(d, y) {
      for (var p = [
        v(d, y, true)._data.map((j) => j[0])
      ], D = d._size[0], s = d._size[1], E = d._values, w = d._index, B = d._ptr, A = s - 1; A >= 0; A--) for (var x = p.length, _ = 0; _ < x; _++) {
        for (var F = p[_], N = [], S = [], b = B[A], M = B[A + 1], O = 0, P = M - 1; P >= b; P--) {
          var $ = w[P];
          $ === A ? O = E[P] : $ < A && (N.push(E[P]), S.push($));
        }
        if (f(O, 0)) if (f(F[A], 0)) {
          if (_ === 0) {
            var rr = [
              ...F
            ];
            rr[A] = 1;
            for (var I = 0, R = S.length; I < R; I++) {
              var Q = S[I];
              rr[Q] = u(rr[Q], N[I]);
            }
            p.push(rr);
          }
        } else {
          if (_ === 0) return [];
          p.splice(_, 1), _ -= 1, x -= 1;
        }
        else {
          F[A] = t(F[A], O);
          for (var z = 0, V = S.length; z < V; z++) {
            var Y = S[z];
            F[Y] = u(F[Y], n(F[A], N[z]));
          }
        }
      }
      return p.map((j) => new m({
        data: j.map((q) => [
          q
        ]),
        size: [
          D,
          1
        ]
      }));
    }
  }), Tt = "equal", Yf = [
    "typed",
    "matrix",
    "equalScalar",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Wf = nr(Tt, Yf, (r) => {
    var { typed: e, matrix: a, equalScalar: t, DenseMatrix: n, concat: u, SparseMatrix: f } = r, m = ut({
      typed: e
    }), v = Dt({
      typed: e,
      SparseMatrix: f
    }), c = it({
      typed: e,
      DenseMatrix: n
    }), l = Ke({
      typed: e,
      matrix: a,
      concat: u
    });
    return e(Tt, Xf({
      typed: e,
      equalScalar: t
    }), l({
      elop: t,
      SS: v,
      DS: m,
      Ss: c
    }));
  }), Xf = nr(Tt, [
    "typed",
    "equalScalar"
  ], (r) => {
    var { typed: e, equalScalar: a } = r;
    return e(Tt, {
      "any, any": function(n, u) {
        return n === null ? u === null : u === null ? n === null : n === void 0 ? u === void 0 : u === void 0 ? n === void 0 : a(n, u);
      }
    });
  }), Ot = "smaller", Gf = [
    "typed",
    "config",
    "bignumber",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Vf = nr(Ot, Gf, (r) => {
    var { typed: e, config: a, bignumber: t, matrix: n, DenseMatrix: u, concat: f, SparseMatrix: m } = r, v = ut({
      typed: e
    }), c = Dt({
      typed: e,
      SparseMatrix: m
    }), l = it({
      typed: e,
      DenseMatrix: u
    }), d = Ke({
      typed: e,
      matrix: n,
      concat: f
    }), y = ht({
      typed: e
    });
    function p(D, s) {
      return D.lt(s) && !at(D, s, a.relTol, a.absTol);
    }
    return e(Ot, Hf({
      typed: e,
      config: a
    }), {
      "boolean, boolean": (D, s) => D < s,
      "BigNumber, BigNumber": p,
      "bigint, bigint": (D, s) => D < s,
      "Fraction, Fraction": (D, s) => D.compare(s) === -1,
      "Fraction, BigNumber": function(s, E) {
        return p(t(s), E);
      },
      "BigNumber, Fraction": function(s, E) {
        return p(s, t(E));
      },
      "Complex, Complex": function(s, E) {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, y, d({
      SS: c,
      DS: v,
      Ss: l
    }));
  }), Hf = nr(Ot, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: a } = r;
    return e(Ot, {
      "number, number": function(n, u) {
        return n < u && !ke(n, u, a.relTol, a.absTol);
      }
    });
  }), Pt = "smallerEq", Kf = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Qf = nr(Pt, Kf, (r) => {
    var { typed: e, config: a, matrix: t, DenseMatrix: n, concat: u, SparseMatrix: f } = r, m = ut({
      typed: e
    }), v = Dt({
      typed: e,
      SparseMatrix: f
    }), c = it({
      typed: e,
      DenseMatrix: n
    }), l = Ke({
      typed: e,
      matrix: t,
      concat: u
    }), d = ht({
      typed: e
    });
    return e(Pt, Jf({
      typed: e,
      config: a
    }), {
      "boolean, boolean": (y, p) => y <= p,
      "BigNumber, BigNumber": function(p, D) {
        return p.lte(D) || at(p, D, a.relTol, a.absTol);
      },
      "bigint, bigint": (y, p) => y <= p,
      "Fraction, Fraction": (y, p) => y.compare(p) !== 1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, d, l({
      SS: v,
      DS: m,
      Ss: c
    }));
  }), Jf = nr(Pt, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: a } = r;
    return e(Pt, {
      "number, number": function(n, u) {
        return n <= u || ke(n, u, a.relTol, a.absTol);
      }
    });
  }), zt = "larger", Zf = [
    "typed",
    "config",
    "bignumber",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], jf = nr(zt, Zf, (r) => {
    var { typed: e, config: a, bignumber: t, matrix: n, DenseMatrix: u, concat: f, SparseMatrix: m } = r, v = ut({
      typed: e
    }), c = Dt({
      typed: e,
      SparseMatrix: m
    }), l = it({
      typed: e,
      DenseMatrix: u
    }), d = Ke({
      typed: e,
      matrix: n,
      concat: f
    }), y = ht({
      typed: e
    });
    function p(D, s) {
      return D.gt(s) && !at(D, s, a.relTol, a.absTol);
    }
    return e(zt, rl({
      typed: e,
      config: a
    }), {
      "boolean, boolean": (D, s) => D > s,
      "BigNumber, BigNumber": p,
      "bigint, bigint": (D, s) => D > s,
      "Fraction, Fraction": (D, s) => D.compare(s) === 1,
      "Fraction, BigNumber": function(s, E) {
        return p(t(s), E);
      },
      "BigNumber, Fraction": function(s, E) {
        return p(s, t(E));
      },
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, y, d({
      SS: c,
      DS: v,
      Ss: l
    }));
  }), rl = nr(zt, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: a } = r;
    return e(zt, {
      "number, number": function(n, u) {
        return n > u && !ke(n, u, a.relTol, a.absTol);
      }
    });
  }), Rt = "largerEq", el = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], tl = nr(Rt, el, (r) => {
    var { typed: e, config: a, matrix: t, DenseMatrix: n, concat: u, SparseMatrix: f } = r, m = ut({
      typed: e
    }), v = Dt({
      typed: e,
      SparseMatrix: f
    }), c = it({
      typed: e,
      DenseMatrix: n
    }), l = Ke({
      typed: e,
      matrix: t,
      concat: u
    }), d = ht({
      typed: e
    });
    return e(Rt, nl({
      typed: e,
      config: a
    }), {
      "boolean, boolean": (y, p) => y >= p,
      "BigNumber, BigNumber": function(p, D) {
        return p.gte(D) || at(p, D, a.relTol, a.absTol);
      },
      "bigint, bigint": function(p, D) {
        return p >= D;
      },
      "Fraction, Fraction": (y, p) => y.compare(p) !== -1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, d, l({
      SS: v,
      DS: m,
      Ss: c
    }));
  }), nl = nr(Rt, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: a } = r;
    return e(Rt, {
      "number, number": function(n, u) {
        return n >= u || ke(n, u, a.relTol, a.absTol);
      }
    });
  }), al = "ImmutableDenseMatrix", il = [
    "smaller",
    "DenseMatrix"
  ], ul = nr(al, il, (r) => {
    var { smaller: e, DenseMatrix: a } = r;
    function t(n, u) {
      if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
      if (u && !Pe(u)) throw new Error("Invalid datatype: " + u);
      if (Nr(n) || kr(n)) {
        var f = new a(n, u);
        this._data = f._data, this._size = f._size, this._datatype = f._datatype, this._min = null, this._max = null;
      } else if (n && kr(n.data) && kr(n.size)) this._data = n.data, this._size = n.size, this._datatype = n.datatype, this._min = typeof n.min < "u" ? n.min : null, this._max = typeof n.max < "u" ? n.max : null;
      else {
        if (n) throw new TypeError("Unsupported type of data (" + ye(n) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = u, this._min = null, this._max = null;
      }
    }
    return t.prototype = new a(), t.prototype.type = "ImmutableDenseMatrix", t.prototype.isImmutableDenseMatrix = true, t.prototype.subset = function(n) {
      switch (arguments.length) {
        case 1: {
          var u = a.prototype.subset.call(this, n);
          return Nr(u) ? new t({
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
    }, t.prototype.set = function() {
      throw new Error("Cannot invoke set on an Immutable Matrix instance");
    }, t.prototype.resize = function() {
      throw new Error("Cannot invoke resize on an Immutable Matrix instance");
    }, t.prototype.reshape = function() {
      throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
    }, t.prototype.clone = function() {
      return new t({
        data: Mr(this._data),
        size: Mr(this._size),
        datatype: this._datatype
      });
    }, t.prototype.toJSON = function() {
      return {
        mathjs: "ImmutableDenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, t.fromJSON = function(n) {
      return new t(n);
    }, t.prototype.swapRows = function() {
      throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
    }, t.prototype.min = function() {
      if (this._min === null) {
        var n = null;
        this.forEach(function(u) {
          (n === null || e(u, n)) && (n = u);
        }), this._min = n !== null ? n : void 0;
      }
      return this._min;
    }, t.prototype.max = function() {
      if (this._max === null) {
        var n = null;
        this.forEach(function(u) {
          (n === null || e(n, u)) && (n = u);
        }), this._max = n !== null ? n : void 0;
      }
      return this._max;
    }, t;
  }, {
    isClass: true
  }), ol = "Index", sl = [
    "ImmutableDenseMatrix",
    "getMatrixDataType"
  ], fl = nr(ol, sl, (r) => {
    var { ImmutableDenseMatrix: e, getMatrixDataType: a } = r;
    function t(u) {
      if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
      this._dimensions = [], this._sourceSize = [], this._isScalar = true;
      for (var f = 0, m = arguments.length; f < m; f++) {
        var v = arguments[f], c = kr(v), l = Nr(v), d = typeof v, y = null;
        if (La(v)) this._dimensions.push(v), this._isScalar = false;
        else if (c || l) {
          var p = void 0;
          a(v) === "boolean" ? (c && (p = n(ba(v).valueOf())), l && (p = n(ba(v._data).valueOf())), y = v.valueOf().length) : p = n(v.valueOf()), this._dimensions.push(p);
          var D = p.size();
          (D.length !== 1 || D[0] !== 1 || y !== null) && (this._isScalar = false);
        } else if (d === "number") this._dimensions.push(n([
          v
        ]));
        else if (d === "bigint") this._dimensions.push(n([
          Number(v)
        ]));
        else if (d === "string") this._dimensions.push(v);
        else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
        this._sourceSize.push(y);
      }
    }
    t.prototype.type = "Index", t.prototype.isIndex = true;
    function n(u) {
      for (var f = 0, m = u.length; f < m; f++) if (typeof u[f] != "number" || !$r(u[f])) throw new TypeError("Index parameters must be positive integer numbers");
      return new e(u);
    }
    return t.prototype.clone = function() {
      var u = new t();
      return u._dimensions = Mr(this._dimensions), u._isScalar = this._isScalar, u._sourceSize = this._sourceSize, u;
    }, t.create = function(u) {
      var f = new t();
      return t.apply(f, u), f;
    }, t.prototype.size = function() {
      for (var u = [], f = 0, m = this._dimensions.length; f < m; f++) {
        var v = this._dimensions[f];
        u[f] = typeof v == "string" ? 1 : v.size()[0];
      }
      return u;
    }, t.prototype.max = function() {
      for (var u = [], f = 0, m = this._dimensions.length; f < m; f++) {
        var v = this._dimensions[f];
        u[f] = typeof v == "string" ? v : v.max();
      }
      return u;
    }, t.prototype.min = function() {
      for (var u = [], f = 0, m = this._dimensions.length; f < m; f++) {
        var v = this._dimensions[f];
        u[f] = typeof v == "string" ? v : v.min();
      }
      return u;
    }, t.prototype.forEach = function(u) {
      for (var f = 0, m = this._dimensions.length; f < m; f++) u(this._dimensions[f], f, this);
    }, t.prototype.dimension = function(u) {
      return typeof u != "number" ? null : this._dimensions[u] || null;
    }, t.prototype.isObjectProperty = function() {
      return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
    }, t.prototype.getObjectProperty = function() {
      return this.isObjectProperty() ? this._dimensions[0] : null;
    }, t.prototype.isScalar = function() {
      return this._isScalar;
    }, t.prototype.toArray = function() {
      for (var u = [], f = 0, m = this._dimensions.length; f < m; f++) {
        var v = this._dimensions[f];
        u.push(typeof v == "string" ? v : v.toArray());
      }
      return u;
    }, t.prototype.valueOf = t.prototype.toArray, t.prototype.toString = function() {
      for (var u = [], f = 0, m = this._dimensions.length; f < m; f++) {
        var v = this._dimensions[f];
        typeof v == "string" ? u.push(JSON.stringify(v)) : u.push(v.toString());
      }
      return "[" + u.join(", ") + "]";
    }, t.prototype.toJSON = function() {
      return {
        mathjs: "Index",
        dimensions: this._dimensions
      };
    }, t.fromJSON = function(u) {
      return t.create(u.dimensions);
    }, t;
  }, {
    isClass: true
  });
  function ba(r) {
    var e = [];
    return r.forEach((a, t) => {
      a && e.push(t);
    }), e;
  }
  var ll = "atan", cl = [
    "typed"
  ], vl = nr(ll, cl, (r) => {
    var { typed: e } = r;
    return e("atan", {
      number: function(t) {
        return Math.atan(t);
      },
      Complex: function(t) {
        return t.atan();
      },
      BigNumber: function(t) {
        return t.atan();
      }
    });
  }), pi = nr("trigUnit", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      Unit: e.referToSelf((a) => (t) => {
        if (!t.hasBase(t.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
        return e.find(a, t.valueType())(t.value);
      })
    };
  }), _a = "cos", dl = [
    "typed"
  ], ml = nr(_a, dl, (r) => {
    var { typed: e } = r, a = pi({
      typed: e
    });
    return e(_a, {
      number: Math.cos,
      "Complex | BigNumber": (t) => t.cos()
    }, a);
  }), Ca = "sin", pl = [
    "typed"
  ], hl = nr(Ca, pl, (r) => {
    var { typed: e } = r, a = pi({
      typed: e
    });
    return e(Ca, {
      number: Math.sin,
      "Complex | BigNumber": (t) => t.sin()
    }, a);
  }), Sa = "add", Dl = [
    "typed",
    "matrix",
    "addScalar",
    "equalScalar",
    "DenseMatrix",
    "SparseMatrix",
    "concat"
  ], gl = nr(Sa, Dl, (r) => {
    var { typed: e, matrix: a, addScalar: t, equalScalar: n, DenseMatrix: u, SparseMatrix: f, concat: m } = r, v = li({
      typed: e
    }), c = Os({
      typed: e,
      equalScalar: n
    }), l = ci({
      typed: e,
      DenseMatrix: u
    }), d = Ke({
      typed: e,
      matrix: a,
      concat: m
    });
    return e(Sa, {
      "any, any": t,
      "any, any, ...any": e.referToSelf((y) => (p, D, s) => {
        for (var E = y(p, D), w = 0; w < s.length; w++) E = y(E, s[w]);
        return E;
      })
    }, d({
      elop: t,
      DS: v,
      SS: c,
      Ss: l
    }));
  }), Ba = "norm", yl = [
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
  ], El = nr(Ba, yl, (r) => {
    var { typed: e, abs: a, add: t, pow: n, conj: u, sqrt: f, multiply: m, equalScalar: v, larger: c, smaller: l, matrix: d, ctranspose: y, eigs: p } = r;
    return e(Ba, {
      number: Math.abs,
      Complex: function(S) {
        return S.abs();
      },
      BigNumber: function(S) {
        return S.abs();
      },
      boolean: function(S) {
        return Math.abs(S);
      },
      Array: function(S) {
        return F(d(S), 2);
      },
      Matrix: function(S) {
        return F(S, 2);
      },
      "Array, number | BigNumber | string": function(S, b) {
        return F(d(S), b);
      },
      "Matrix, number | BigNumber | string": function(S, b) {
        return F(S, b);
      }
    });
    function D(N) {
      var S = 0;
      return N.forEach(function(b) {
        var M = a(b);
        c(M, S) && (S = M);
      }, true), S;
    }
    function s(N) {
      var S;
      return N.forEach(function(b) {
        var M = a(b);
        (!S || l(M, S)) && (S = M);
      }, true), S || 0;
    }
    function E(N, S) {
      if (S === Number.POSITIVE_INFINITY || S === "inf") return D(N);
      if (S === Number.NEGATIVE_INFINITY || S === "-inf") return s(N);
      if (S === "fro") return F(N, 2);
      if (typeof S == "number" && !isNaN(S)) {
        if (!v(S, 0)) {
          var b = 0;
          return N.forEach(function(M) {
            b = t(n(a(M), S), b);
          }, true), n(b, 1 / S);
        }
        return Number.POSITIVE_INFINITY;
      }
      throw new Error("Unsupported parameter value");
    }
    function w(N) {
      var S = 0;
      return N.forEach(function(b, M) {
        S = t(S, m(b, u(b)));
      }), a(f(S));
    }
    function B(N) {
      var S = [], b = 0;
      return N.forEach(function(M, O) {
        var P = O[1], $ = t(S[P] || 0, a(M));
        c($, b) && (b = $), S[P] = $;
      }, true), b;
    }
    function A(N) {
      var S = N.size();
      if (S[0] !== S[1]) throw new RangeError("Invalid matrix dimensions");
      var b = y(N), M = m(b, N), O = p(M).values.toArray(), P = O[O.length - 1];
      return a(f(P));
    }
    function x(N) {
      var S = [], b = 0;
      return N.forEach(function(M, O) {
        var P = O[0], $ = t(S[P] || 0, a(M));
        c($, b) && (b = $), S[P] = $;
      }, true), b;
    }
    function _(N, S) {
      if (S === 1) return B(N);
      if (S === Number.POSITIVE_INFINITY || S === "inf") return x(N);
      if (S === "fro") return w(N);
      if (S === 2) return A(N);
      throw new Error("Unsupported parameter value " + S);
    }
    function F(N, S) {
      var b = N.size();
      if (b.length === 1) return E(N, S);
      if (b.length === 2) {
        if (b[0] && b[1]) return _(N, S);
        throw new RangeError("Invalid matrix dimensions");
      }
    }
  }), Ma = "dot", wl = [
    "typed",
    "addScalar",
    "multiplyScalar",
    "conj",
    "size"
  ], Al = nr(Ma, wl, (r) => {
    var { typed: e, addScalar: a, multiplyScalar: t, conj: n, size: u } = r;
    return e(Ma, {
      "Array | DenseMatrix, Array | DenseMatrix": m,
      "SparseMatrix, SparseMatrix": v
    });
    function f(l, d) {
      var y = c(l), p = c(d), D, s;
      if (y.length === 1) D = y[0];
      else if (y.length === 2 && y[1] === 1) D = y[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + y.join(", ") + ")");
      if (p.length === 1) s = p[0];
      else if (p.length === 2 && p[1] === 1) s = p[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
      if (D !== s) throw new RangeError("Vectors must have equal length (" + D + " != " + s + ")");
      if (D === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
      return D;
    }
    function m(l, d) {
      var y = f(l, d), p = Nr(l) ? l._data : l, D = Nr(l) ? l._datatype || l.getDataType() : void 0, s = Nr(d) ? d._data : d, E = Nr(d) ? d._datatype || d.getDataType() : void 0, w = c(l).length === 2, B = c(d).length === 2, A = a, x = t;
      if (D && E && D === E && typeof D == "string" && D !== "mixed") {
        var _ = D;
        A = e.find(a, [
          _,
          _
        ]), x = e.find(t, [
          _,
          _
        ]);
      }
      if (!w && !B) {
        for (var F = x(n(p[0]), s[0]), N = 1; N < y; N++) F = A(F, x(n(p[N]), s[N]));
        return F;
      }
      if (!w && B) {
        for (var S = x(n(p[0]), s[0][0]), b = 1; b < y; b++) S = A(S, x(n(p[b]), s[b][0]));
        return S;
      }
      if (w && !B) {
        for (var M = x(n(p[0][0]), s[0]), O = 1; O < y; O++) M = A(M, x(n(p[O][0]), s[O]));
        return M;
      }
      if (w && B) {
        for (var P = x(n(p[0][0]), s[0][0]), $ = 1; $ < y; $++) P = A(P, x(n(p[$][0]), s[$][0]));
        return P;
      }
    }
    function v(l, d) {
      f(l, d);
      for (var y = l._index, p = l._values, D = d._index, s = d._values, E = 0, w = a, B = t, A = 0, x = 0; A < y.length && x < D.length; ) {
        var _ = y[A], F = D[x];
        if (_ < F) {
          A++;
          continue;
        }
        if (_ > F) {
          x++;
          continue;
        }
        _ === F && (E = w(E, B(p[A], s[x])), A++, x++);
      }
      return E;
    }
    function c(l) {
      return Nr(l) ? l.size() : u(l);
    }
  }), xa = "qr", Fl = [
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
  ], bl = nr(xa, Fl, (r) => {
    var { typed: e, matrix: a, zeros: t, identity: n, isZero: u, equal: f, sign: m, sqrt: v, conj: c, unaryMinus: l, addScalar: d, divideScalar: y, multiplyScalar: p, subtractScalar: D, complex: s } = r;
    return It(e(xa, {
      DenseMatrix: function(x) {
        return w(x);
      },
      SparseMatrix: function(x) {
        return B();
      },
      Array: function(x) {
        var _ = a(x), F = w(_);
        return {
          Q: F.Q.valueOf(),
          R: F.R.valueOf()
        };
      }
    }), {
      _denseQRimpl: E
    });
    function E(A) {
      var x = A._size[0], _ = A._size[1], F = n([
        x
      ], "dense"), N = F._data, S = A.clone(), b = S._data, M, O, P, $ = t([
        x
      ], "");
      for (P = 0; P < Math.min(_, x); ++P) {
        var z = b[P][P], V = l(f(z, 0) ? 1 : m(z)), Y = c(V), rr = 0;
        for (M = P; M < x; M++) rr = d(rr, p(b[M][P], c(b[M][P])));
        var I = p(V, v(rr));
        if (!u(I)) {
          var R = D(z, I);
          for ($[P] = 1, M = P + 1; M < x; M++) $[M] = y(b[M][P], R);
          var Q = l(c(y(R, I))), j = void 0;
          for (O = P; O < _; O++) {
            for (j = 0, M = P; M < x; M++) j = d(j, p(c($[M]), b[M][O]));
            for (j = p(j, Q), M = P; M < x; M++) b[M][O] = p(D(b[M][O], p($[M], j)), Y);
          }
          for (M = 0; M < x; M++) {
            for (j = 0, O = P; O < x; O++) j = d(j, p(N[M][O], $[O]));
            for (j = p(j, Q), O = P; O < x; ++O) N[M][O] = y(D(N[M][O], p(j, c($[O]))), Y);
          }
        }
      }
      return {
        Q: F,
        R: S,
        toString: function() {
          return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
        }
      };
    }
    function w(A) {
      var x = E(A), _ = x.R._data;
      if (A._data.length > 0) for (var F = _[0][0].type === "Complex" ? s(0) : 0, N = 0; N < _.length; ++N) for (var S = 0; S < N && S < (_[0] || []).length; ++S) _[N][S] = F;
      return x;
    }
    function B(A) {
      throw new Error("qr not implemented for sparse matrices yet");
    }
  }), Na = "det", _l = [
    "typed",
    "matrix",
    "subtractScalar",
    "multiply",
    "divideScalar",
    "isZero",
    "unaryMinus"
  ], Cl = nr(Na, _l, (r) => {
    var { typed: e, matrix: a, subtractScalar: t, multiply: n, divideScalar: u, isZero: f, unaryMinus: m } = r;
    return e(Na, {
      any: function(l) {
        return Mr(l);
      },
      "Array | Matrix": function(l) {
        var d;
        switch (Nr(l) ? d = l.size() : Array.isArray(l) ? (l = a(l), d = l.size()) : d = [], d.length) {
          case 0:
            return Mr(l);
          case 1:
            if (d[0] === 1) return Mr(l.valueOf()[0]);
            if (d[0] === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Lr(d) + ")");
          case 2: {
            var y = d[0], p = d[1];
            if (y === p) return v(l.clone().valueOf(), y);
            if (p === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Lr(d) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Lr(d) + ")");
        }
      }
    });
    function v(c, l, d) {
      if (l === 1) return Mr(c[0][0]);
      if (l === 2) return t(n(c[0][0], c[1][1]), n(c[1][0], c[0][1]));
      for (var y = false, p = new Array(l).fill(0).map((N, S) => S), D = 0; D < l; D++) {
        var s = p[D];
        if (f(c[s][D])) {
          var E = void 0;
          for (E = D + 1; E < l; E++) if (!f(c[p[E]][D])) {
            s = p[E], p[E] = p[D], p[D] = s, y = !y;
            break;
          }
          if (E === l) return c[s][D];
        }
        for (var w = c[s][D], B = D === 0 ? 1 : c[p[D - 1]][D - 1], A = D + 1; A < l; A++) for (var x = p[A], _ = D + 1; _ < l; _++) c[x][_] = u(t(n(c[x][_], w), n(c[x][D], c[s][_])), B);
      }
      var F = c[p[l - 1]][l - 1];
      return y ? m(F) : F;
    }
  }), Ta = "inv", Sl = [
    "typed",
    "matrix",
    "divideScalar",
    "addScalar",
    "multiply",
    "unaryMinus",
    "det",
    "identity",
    "abs"
  ], Bl = nr(Ta, Sl, (r) => {
    var { typed: e, matrix: a, divideScalar: t, addScalar: n, multiply: u, unaryMinus: f, det: m, identity: v, abs: c } = r;
    return e(Ta, {
      "Array | Matrix": function(y) {
        var p = Nr(y) ? y.size() : Br(y);
        switch (p.length) {
          case 1:
            if (p[0] === 1) return Nr(y) ? a([
              t(1, y.valueOf()[0])
            ]) : [
              t(1, y[0])
            ];
            throw new RangeError("Matrix must be square (size: " + Lr(p) + ")");
          case 2: {
            var D = p[0], s = p[1];
            if (D === s) return Nr(y) ? a(l(y.valueOf(), D, s), y.storage()) : l(y, D, s);
            throw new RangeError("Matrix must be square (size: " + Lr(p) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Lr(p) + ")");
        }
      },
      any: function(y) {
        return t(1, y);
      }
    });
    function l(d, y, p) {
      var D, s, E, w, B;
      if (y === 1) {
        if (w = d[0][0], w === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            t(1, w)
          ]
        ];
      } else if (y === 2) {
        var A = m(d);
        if (A === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            t(d[1][1], A),
            t(f(d[0][1]), A)
          ],
          [
            t(f(d[1][0]), A),
            t(d[0][0], A)
          ]
        ];
      } else {
        var x = d.concat();
        for (D = 0; D < y; D++) x[D] = x[D].concat();
        for (var _ = v(y).valueOf(), F = 0; F < p; F++) {
          var N = c(x[F][F]), S = F;
          for (D = F + 1; D < y; ) c(x[D][F]) > N && (N = c(x[D][F]), S = D), D++;
          if (N === 0) throw Error("Cannot calculate inverse, determinant is zero");
          D = S, D !== F && (B = x[F], x[F] = x[D], x[D] = B, B = _[F], _[F] = _[D], _[D] = B);
          var b = x[F], M = _[F];
          for (D = 0; D < y; D++) {
            var O = x[D], P = _[D];
            if (D !== F) {
              if (O[F] !== 0) {
                for (E = t(f(O[F]), b[F]), s = F; s < p; s++) O[s] = n(O[s], u(E, b[s]));
                for (s = 0; s < p; s++) P[s] = n(P[s], u(E, M[s]));
              }
            } else {
              for (E = b[F], s = F; s < p; s++) O[s] = t(O[s], E);
              for (s = 0; s < p; s++) P[s] = t(P[s], E);
            }
          }
        }
        return _;
      }
    }
  });
  function Ml(r) {
    var { addScalar: e, subtract: a, flatten: t, multiply: n, multiplyScalar: u, divideScalar: f, sqrt: m, abs: v, bignumber: c, diag: l, size: d, reshape: y, inv: p, qr: D, usolve: s, usolveAll: E, equal: w, complex: B, larger: A, smaller: x, matrixFromColumns: _, dot: F } = r;
    function N(q, W, k, K) {
      var J = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, G = S(q, W, k, K, J);
      b(q, W, k, K, J, G);
      var { values: Z, C: H } = M(q, W, k, K, J);
      if (J) {
        var tr = O(q, W, H, G, Z, k, K);
        return {
          values: Z,
          eigenvectors: tr
        };
      }
      return {
        values: Z
      };
    }
    function S(q, W, k, K, J) {
      var G = K === "BigNumber", Z = K === "Complex", H = G ? c(0) : 0, tr = G ? c(1) : Z ? B(1) : 1, ar = G ? c(1) : 1, er = G ? c(10) : 2, or = u(er, er), cr;
      J && (cr = Array(W).fill(tr));
      for (var sr = false; !sr; ) {
        sr = true;
        for (var mr = 0; mr < W; mr++) {
          for (var gr = H, dr = H, br = 0; br < W; br++) mr !== br && (gr = e(gr, v(q[br][mr])), dr = e(dr, v(q[mr][br])));
          if (!w(gr, 0) && !w(dr, 0)) {
            for (var Er = ar, Cr = gr, Vr = f(dr, er), Hr = u(dr, er); x(Cr, Vr); ) Cr = u(Cr, or), Er = u(Er, er);
            for (; A(Cr, Hr); ) Cr = f(Cr, or), Er = f(Er, er);
            var Ir = x(f(e(Cr, dr), Er), u(e(gr, dr), 0.95));
            if (Ir) {
              sr = false;
              for (var ue = f(1, Er), Jr = 0; Jr < W; Jr++) mr !== Jr && (q[mr][Jr] = u(q[mr][Jr], ue), q[Jr][mr] = u(q[Jr][mr], Er));
              J && (cr[mr] = u(cr[mr], ue));
            }
          }
        }
      }
      return J ? l(cr) : null;
    }
    function b(q, W, k, K, J, G) {
      var Z = K === "BigNumber", H = K === "Complex", tr = Z ? c(0) : H ? B(0) : 0;
      Z && (k = c(k));
      for (var ar = 0; ar < W - 2; ar++) {
        for (var er = 0, or = tr, cr = ar + 1; cr < W; cr++) {
          var sr = q[cr][ar];
          x(v(or), v(sr)) && (or = sr, er = cr);
        }
        if (!x(v(or), k)) {
          if (er !== ar + 1) {
            var mr = q[er];
            q[er] = q[ar + 1], q[ar + 1] = mr;
            for (var gr = 0; gr < W; gr++) {
              var dr = q[gr][er];
              q[gr][er] = q[gr][ar + 1], q[gr][ar + 1] = dr;
            }
            if (J) {
              var br = G[er];
              G[er] = G[ar + 1], G[ar + 1] = br;
            }
          }
          for (var Er = ar + 2; Er < W; Er++) {
            var Cr = f(q[Er][ar], or);
            if (Cr !== 0) {
              for (var Vr = 0; Vr < W; Vr++) q[Er][Vr] = a(q[Er][Vr], u(Cr, q[ar + 1][Vr]));
              for (var Hr = 0; Hr < W; Hr++) q[Hr][ar + 1] = e(q[Hr][ar + 1], u(Cr, q[Hr][Er]));
              if (J) for (var Ir = 0; Ir < W; Ir++) G[Er][Ir] = a(G[Er][Ir], u(Cr, G[ar + 1][Ir]));
            }
          }
        }
      }
      return G;
    }
    function M(q, W, k, K, J) {
      var G = K === "BigNumber", Z = K === "Complex", H = G ? c(1) : Z ? B(1) : 1;
      G && (k = c(k));
      for (var tr = Mr(q), ar = [], er = W, or = [], cr = J ? l(Array(W).fill(H)) : void 0, sr = J ? l(Array(er).fill(H)) : void 0, mr = 0; mr <= 100; ) {
        mr += 1;
        for (var gr = tr[er - 1][er - 1], dr = 0; dr < er; dr++) tr[dr][dr] = a(tr[dr][dr], gr);
        var { Q: br, R: Er } = D(tr);
        tr = n(Er, br);
        for (var Cr = 0; Cr < er; Cr++) tr[Cr][Cr] = e(tr[Cr][Cr], gr);
        if (J && (sr = n(sr, br)), er === 1 || x(v(tr[er - 1][er - 2]), k)) {
          mr = 0, ar.push(tr[er - 1][er - 1]), J && (or.unshift([
            [
              1
            ]
          ]), z(sr, W), cr = n(cr, sr), er > 1 && (sr = l(Array(er - 1).fill(H)))), er -= 1, tr.pop();
          for (var Vr = 0; Vr < er; Vr++) tr[Vr].pop();
        } else if (er === 2 || x(v(tr[er - 2][er - 3]), k)) {
          mr = 0;
          var Hr = P(tr[er - 2][er - 2], tr[er - 2][er - 1], tr[er - 1][er - 2], tr[er - 1][er - 1]);
          ar.push(...Hr), J && (or.unshift($(tr[er - 2][er - 2], tr[er - 2][er - 1], tr[er - 1][er - 2], tr[er - 1][er - 1], Hr[0], Hr[1], k, K)), z(sr, W), cr = n(cr, sr), er > 2 && (sr = l(Array(er - 2).fill(H)))), er -= 2, tr.pop(), tr.pop();
          for (var Ir = 0; Ir < er; Ir++) tr[Ir].pop(), tr[Ir].pop();
        }
        if (er === 0) break;
      }
      if (ar.sort((Se, Kr) => +a(v(Se), v(Kr))), mr > 100) {
        var ue = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + ar.join(", "));
        throw ue.values = ar, ue.vectors = [], ue;
      }
      var Jr = J ? n(cr, V(or, W)) : void 0;
      return {
        values: ar,
        C: Jr
      };
    }
    function O(q, W, k, K, J, G, Z) {
      var H = p(k), tr = n(H, q, k), ar = Z === "BigNumber", er = Z === "Complex", or = ar ? c(0) : er ? B(0) : 0, cr = ar ? c(1) : er ? B(1) : 1, sr = [], mr = [];
      for (var gr of J) {
        var dr = Y(sr, gr, w);
        dr === -1 ? (sr.push(gr), mr.push(1)) : mr[dr] += 1;
      }
      for (var br = [], Er = sr.length, Cr = Array(W).fill(or), Vr = l(Array(W).fill(cr)), Hr = function() {
        var Jr = sr[Ir], Se = a(tr, n(Jr, Vr)), Kr = E(Se, Cr);
        for (Kr.shift(); Kr.length < mr[Ir]; ) {
          var fe = rr(Se, W, Kr, G, Z);
          if (fe === null) break;
          Kr.push(fe);
        }
        var we = n(p(K), k);
        Kr = Kr.map((pr) => n(we, pr)), br.push(...Kr.map((pr) => ({
          value: Jr,
          vector: t(pr)
        })));
      }, Ir = 0; Ir < Er; Ir++) Hr();
      return br;
    }
    function P(q, W, k, K) {
      var J = e(q, K), G = a(u(q, K), u(W, k)), Z = u(J, 0.5), H = u(m(a(u(J, J), u(4, G))), 0.5);
      return [
        e(Z, H),
        a(Z, H)
      ];
    }
    function $(q, W, k, K, J, G, Z, H) {
      var tr = H === "BigNumber", ar = H === "Complex", er = tr ? c(0) : ar ? B(0) : 0, or = tr ? c(1) : ar ? B(1) : 1;
      if (x(v(k), Z)) return [
        [
          or,
          er
        ],
        [
          er,
          or
        ]
      ];
      if (A(v(a(J, G)), Z)) return [
        [
          a(J, K),
          a(G, K)
        ],
        [
          k,
          k
        ]
      ];
      var cr = a(q, J), sr = a(K, J);
      return x(v(W), Z) && x(v(sr), Z) ? [
        [
          cr,
          or
        ],
        [
          k,
          er
        ]
      ] : [
        [
          W,
          er
        ],
        [
          sr,
          or
        ]
      ];
    }
    function z(q, W) {
      for (var k = 0; k < q.length; k++) q[k].push(...Array(W - q[k].length).fill(0));
      for (var K = q.length; K < W; K++) q.push(Array(W).fill(0)), q[K][K] = 1;
      return q;
    }
    function V(q, W) {
      for (var k = [], K = 0; K < W; K++) k[K] = Array(W).fill(0);
      var J = 0;
      for (var G of q) {
        for (var Z = G.length, H = 0; H < Z; H++) for (var tr = 0; tr < Z; tr++) k[J + H][J + tr] = G[H][tr];
        J += Z;
      }
      return k;
    }
    function Y(q, W, k) {
      for (var K = 0; K < q.length; K++) if (k(q[K], W)) return K;
      return -1;
    }
    function rr(q, W, k, K, J) {
      for (var G = J === "BigNumber" ? c(1e3) : 1e3, Z, H = 0; H < 5; ++H) {
        Z = I(W, k, J);
        try {
          Z = s(q, Z);
        } catch {
          continue;
        }
        if (A(Q(Z), G)) break;
      }
      if (H >= 5) return null;
      for (H = 0; ; ) {
        var tr = s(q, Z);
        if (x(Q(R(Z, [
          tr
        ])), K)) break;
        if (++H >= 10) return null;
        Z = j(tr);
      }
      return Z;
    }
    function I(q, W, k) {
      var K = k === "BigNumber", J = k === "Complex", G = Array(q).fill(0).map((Z) => 2 * Math.random() - 1);
      return K && (G = G.map((Z) => c(Z))), J && (G = G.map((Z) => B(Z))), G = R(G, W), j(G, k);
    }
    function R(q, W) {
      var k = d(q);
      for (var K of W) K = y(K, k), q = a(q, n(f(F(K, q), F(K, K)), K));
      return q;
    }
    function Q(q) {
      return v(m(F(q, q)));
    }
    function j(q, W) {
      var k = W === "BigNumber", K = W === "Complex", J = k ? c(1) : K ? B(1) : 1;
      return n(f(J, Q(q)), q);
    }
    return N;
  }
  function xl(r) {
    var { config: e, addScalar: a, subtract: t, abs: n, atan: u, cos: f, sin: m, multiplyScalar: v, inv: c, bignumber: l, multiply: d, add: y } = r;
    function p(b, M) {
      var O = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, P = arguments.length > 3 ? arguments[3] : void 0, $ = arguments.length > 4 ? arguments[4] : void 0;
      if (P === "number") return D(b, O, $);
      if (P === "BigNumber") return s(b, O, $);
      throw TypeError("Unsupported data type: " + P);
    }
    function D(b, M, O) {
      var P = b.length, $ = Math.abs(M / P), z, V;
      if (O) {
        V = new Array(P);
        for (var Y = 0; Y < P; Y++) V[Y] = Array(P).fill(0), V[Y][Y] = 1;
      }
      for (var rr = F(b); Math.abs(rr[1]) >= Math.abs($); ) {
        var I = rr[0][0], R = rr[0][1];
        z = E(b[I][I], b[R][R], b[I][R]), b = _(b, z, I, R), O && (V = B(V, z, I, R)), rr = F(b);
      }
      for (var Q = Array(P).fill(0), j = 0; j < P; j++) Q[j] = b[j][j];
      return S(Mr(Q), V, O);
    }
    function s(b, M, O) {
      var P = b.length, $ = n(M / P), z, V;
      if (O) {
        V = new Array(P);
        for (var Y = 0; Y < P; Y++) V[Y] = Array(P).fill(0), V[Y][Y] = 1;
      }
      for (var rr = N(b); n(rr[1]) >= n($); ) {
        var I = rr[0][0], R = rr[0][1];
        z = w(b[I][I], b[R][R], b[I][R]), b = x(b, z, I, R), O && (V = A(V, z, I, R)), rr = N(b);
      }
      for (var Q = Array(P).fill(0), j = 0; j < P; j++) Q[j] = b[j][j];
      return S(Mr(Q), V, O);
    }
    function E(b, M, O) {
      var P = M - b;
      return Math.abs(P) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * O / (M - b));
    }
    function w(b, M, O) {
      var P = t(M, b);
      return n(P) <= e.relTol ? l(-1).acos().div(4) : v(0.5, u(d(2, O, c(P))));
    }
    function B(b, M, O, P) {
      for (var $ = b.length, z = Math.cos(M), V = Math.sin(M), Y = Array($).fill(0), rr = Array($).fill(0), I = 0; I < $; I++) Y[I] = z * b[I][O] - V * b[I][P], rr[I] = V * b[I][O] + z * b[I][P];
      for (var R = 0; R < $; R++) b[R][O] = Y[R], b[R][P] = rr[R];
      return b;
    }
    function A(b, M, O, P) {
      for (var $ = b.length, z = f(M), V = m(M), Y = Array($).fill(l(0)), rr = Array($).fill(l(0)), I = 0; I < $; I++) Y[I] = t(v(z, b[I][O]), v(V, b[I][P])), rr[I] = a(v(V, b[I][O]), v(z, b[I][P]));
      for (var R = 0; R < $; R++) b[R][O] = Y[R], b[R][P] = rr[R];
      return b;
    }
    function x(b, M, O, P) {
      for (var $ = b.length, z = l(f(M)), V = l(m(M)), Y = v(z, z), rr = v(V, V), I = Array($).fill(l(0)), R = Array($).fill(l(0)), Q = d(l(2), z, V, b[O][P]), j = a(t(v(Y, b[O][O]), Q), v(rr, b[P][P])), q = y(v(rr, b[O][O]), Q, v(Y, b[P][P])), W = 0; W < $; W++) I[W] = t(v(z, b[O][W]), v(V, b[P][W])), R[W] = a(v(V, b[O][W]), v(z, b[P][W]));
      b[O][O] = j, b[P][P] = q, b[O][P] = l(0), b[P][O] = l(0);
      for (var k = 0; k < $; k++) k !== O && k !== P && (b[O][k] = I[k], b[k][O] = I[k], b[P][k] = R[k], b[k][P] = R[k]);
      return b;
    }
    function _(b, M, O, P) {
      for (var $ = b.length, z = Math.cos(M), V = Math.sin(M), Y = z * z, rr = V * V, I = Array($).fill(0), R = Array($).fill(0), Q = Y * b[O][O] - 2 * z * V * b[O][P] + rr * b[P][P], j = rr * b[O][O] + 2 * z * V * b[O][P] + Y * b[P][P], q = 0; q < $; q++) I[q] = z * b[O][q] - V * b[P][q], R[q] = V * b[O][q] + z * b[P][q];
      b[O][O] = Q, b[P][P] = j, b[O][P] = 0, b[P][O] = 0;
      for (var W = 0; W < $; W++) W !== O && W !== P && (b[O][W] = I[W], b[W][O] = I[W], b[P][W] = R[W], b[W][P] = R[W]);
      return b;
    }
    function F(b) {
      for (var M = b.length, O = 0, P = [
        0,
        1
      ], $ = 0; $ < M; $++) for (var z = $ + 1; z < M; z++) Math.abs(O) < Math.abs(b[$][z]) && (O = Math.abs(b[$][z]), P = [
        $,
        z
      ]);
      return [
        P,
        O
      ];
    }
    function N(b) {
      for (var M = b.length, O = 0, P = [
        0,
        1
      ], $ = 0; $ < M; $++) for (var z = $ + 1; z < M; z++) n(O) < n(b[$][z]) && (O = n(b[$][z]), P = [
        $,
        z
      ]);
      return [
        P,
        O
      ];
    }
    function S(b, M, O) {
      var P = b.length, $ = Array(P), z;
      if (O) {
        z = Array(P);
        for (var V = 0; V < P; V++) z[V] = Array(P);
      }
      for (var Y = 0; Y < P; Y++) {
        for (var rr = 0, I = b[0], R = 0; R < b.length; R++) n(b[R]) < n(I) && (rr = R, I = b[rr]);
        if ($[Y] = b.splice(rr, 1)[0], O) for (var Q = 0; Q < P; Q++) z[Y][Q] = M[Q][rr], M[Q].splice(rr, 1);
      }
      if (!O) return {
        values: $
      };
      var j = z.map((q, W) => ({
        value: $[W],
        vector: q
      }));
      return {
        values: $,
        eigenvectors: j
      };
    }
    return p;
  }
  var Nl = "eigs", Tl = [
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
  ], Ol = nr(Nl, Tl, (r) => {
    var { config: e, typed: a, matrix: t, addScalar: n, subtract: u, equal: f, abs: m, atan: v, cos: c, sin: l, multiplyScalar: d, divideScalar: y, inv: p, bignumber: D, multiply: s, add: E, larger: w, column: B, flatten: A, number: x, complex: _, sqrt: F, diag: N, size: S, reshape: b, qr: M, usolve: O, usolveAll: P, im: $, re: z, smaller: V, matrixFromColumns: Y, dot: rr } = r, I = xl({
      config: e,
      addScalar: n,
      subtract: u,
      abs: m,
      atan: v,
      cos: c,
      sin: l,
      multiplyScalar: d,
      inv: p,
      bignumber: D,
      multiply: s,
      add: E
    }), R = Ml({
      addScalar: n,
      subtract: u,
      multiply: s,
      multiplyScalar: d,
      flatten: A,
      divideScalar: y,
      sqrt: F,
      abs: m,
      bignumber: D,
      diag: N,
      size: S,
      reshape: b,
      qr: M,
      inv: p,
      usolve: O,
      usolveAll: P,
      equal: f,
      complex: _,
      larger: w,
      smaller: V,
      matrixFromColumns: Y,
      dot: rr
    });
    return a("eigs", {
      Array: function(G) {
        return Q(t(G));
      },
      "Array, number|BigNumber": function(G, Z) {
        return Q(t(G), {
          precision: Z
        });
      },
      "Array, Object"(J, G) {
        return Q(t(J), G);
      },
      Matrix: function(G) {
        return Q(G, {
          matricize: true
        });
      },
      "Matrix, number|BigNumber": function(G, Z) {
        return Q(G, {
          precision: Z,
          matricize: true
        });
      },
      "Matrix, Object": function(G, Z) {
        var H = {
          matricize: true
        };
        return It(H, Z), Q(G, H);
      }
    });
    function Q(J) {
      var G, Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, H = "eigenvectors" in Z ? Z.eigenvectors : true, tr = (G = Z.precision) !== null && G !== void 0 ? G : e.relTol, ar = j(J, tr, H);
      return Z.matricize && (ar.values = t(ar.values), H && (ar.eigenvectors = ar.eigenvectors.map((er) => {
        var { value: or, vector: cr } = er;
        return {
          value: or,
          vector: t(cr)
        };
      }))), H && Object.defineProperty(ar, "vectors", {
        enumerable: false,
        get: () => {
          throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
        }
      }), ar;
    }
    function j(J, G, Z) {
      var H = J.toArray(), tr = J.size();
      if (tr.length !== 2 || tr[0] !== tr[1]) throw new RangeError("Matrix must be square (size: ".concat(Lr(tr), ")"));
      var ar = tr[0];
      if (W(H, ar, G) && (k(H, ar), q(H, ar, G))) {
        var er = K(J, H, ar);
        return I(H, ar, G, er, Z);
      }
      var or = K(J, H, ar);
      return R(H, ar, G, or, Z);
    }
    function q(J, G, Z) {
      for (var H = 0; H < G; H++) for (var tr = H; tr < G; tr++) if (w(D(m(u(J[H][tr], J[tr][H]))), Z)) return false;
      return true;
    }
    function W(J, G, Z) {
      for (var H = 0; H < G; H++) for (var tr = 0; tr < G; tr++) if (w(D(m($(J[H][tr]))), Z)) return false;
      return true;
    }
    function k(J, G) {
      for (var Z = 0; Z < G; Z++) for (var H = 0; H < G; H++) J[Z][H] = z(J[Z][H]);
    }
    function K(J, G, Z) {
      var H = J.datatype();
      if (H === "number" || H === "BigNumber" || H === "Complex") return H;
      for (var tr = false, ar = false, er = false, or = 0; or < Z; or++) for (var cr = 0; cr < Z; cr++) {
        var sr = G[or][cr];
        if (Ur(sr) || on(sr)) tr = true;
        else if (Xr(sr)) ar = true;
        else if (un(sr)) er = true;
        else throw TypeError("Unsupported type in Matrix: " + ye(sr));
      }
      if (ar && er && console.warn("Complex BigNumbers not supported, this operation will lose precission."), er) {
        for (var mr = 0; mr < Z; mr++) for (var gr = 0; gr < Z; gr++) G[mr][gr] = _(G[mr][gr]);
        return "Complex";
      }
      if (ar) {
        for (var dr = 0; dr < Z; dr++) for (var br = 0; br < Z; br++) G[dr][br] = D(G[dr][br]);
        return "BigNumber";
      }
      if (tr) {
        for (var Er = 0; Er < Z; Er++) for (var Cr = 0; Cr < Z; Cr++) G[Er][Cr] = x(G[Er][Cr]);
        return "number";
      } else throw TypeError("Matrix contains unsupported types only.");
    }
  }), Pl = "divide", zl = [
    "typed",
    "matrix",
    "multiply",
    "equalScalar",
    "divideScalar",
    "inv"
  ], Rl = nr(Pl, zl, (r) => {
    var { typed: e, matrix: a, multiply: t, equalScalar: n, divideScalar: u, inv: f } = r, m = fi({
      typed: e,
      equalScalar: n
    }), v = mn({
      typed: e
    });
    return e("divide", qa({
      "Array | Matrix, Array | Matrix": function(l, d) {
        return t(l, f(d));
      },
      "DenseMatrix, any": function(l, d) {
        return v(l, d, u, false);
      },
      "SparseMatrix, any": function(l, d) {
        return m(l, d, u, false);
      },
      "Array, any": function(l, d) {
        return v(a(l), d, u, false).valueOf();
      },
      "any, Array | Matrix": function(l, d) {
        return t(l, f(d));
      }
    }, u.signatures));
  }), Oa = "mean", Il = [
    "typed",
    "add",
    "divide"
  ], Ul = nr(Oa, Il, (r) => {
    var { typed: e, add: a, divide: t } = r;
    return e(Oa, {
      "Array | Matrix": u,
      "Array | Matrix, number | BigNumber": n,
      "...": function(m) {
        if (bo(m)) throw new TypeError("Scalar values expected in function mean");
        return u(m);
      }
    });
    function n(f, m) {
      try {
        var v = Co(f, m, a), c = Array.isArray(f) ? Br(f) : f.size();
        return t(v, c[m]);
      } catch (l) {
        throw ya(l, "mean");
      }
    }
    function u(f) {
      var m, v = 0;
      if (_o(f, function(c) {
        try {
          m = m === void 0 ? c : a(m, c), v++;
        } catch (l) {
          throw ya(l, "mean", c);
        }
      }), v === 0) throw new Error("Cannot calculate the mean of an empty array");
      return t(m, v);
    }
  }), gt = Gu({
    config: se
  }), kt = Ku({}), pn = to({}), hn = io({}), me = Ao({
    Matrix: hn
  }), lr = ku({
    BigNumber: gt,
    Complex: kt,
    DenseMatrix: me,
    Fraction: pn
  }), Dn = os({
    typed: lr
  }), ot = fs({
    typed: lr
  }), $l = vl({
    typed: lr
  }), gn = Qo({
    Complex: kt,
    typed: lr
  }), Yt = Js({
    typed: lr
  }), Ll = ml({
    typed: lr
  }), Ue = Ro({
    config: se,
    typed: lr
  }), hi = vf({
    typed: lr
  }), ql = mf({
    typed: lr
  }), kl = js({
    typed: lr
  }), Di = Bo({
    typed: lr
  }), Yl = No({
    config: se,
    typed: lr
  }), gi = Oo({
    equalScalar: Ue,
    typed: lr
  }), Qe = Us({
    typed: lr
  }), yn = Wo({
    typed: lr
  }), Wl = ef({
    typed: lr
  }), Xl = ks({
    BigNumber: gt,
    Fraction: pn,
    complex: gn,
    typed: lr
  }), Gl = hl({
    typed: lr
  }), Ye = $o({
    Matrix: hn,
    equalScalar: Ue,
    typed: lr
  }), yt = cs({
    typed: lr
  }), Et = Vo({
    BigNumber: gt,
    typed: lr
  }), fr = es({
    DenseMatrix: me,
    Matrix: hn,
    SparseMatrix: Ye,
    typed: lr
  }), Vl = Ff({
    isInteger: Di,
    matrix: fr,
    typed: lr
  }), En = Xs({
    Complex: kt,
    config: se,
    typed: lr
  }), qe = Sf({
    matrix: fr,
    typed: lr
  }), Or = Nf({
    BigNumber: gt,
    config: se,
    matrix: fr,
    typed: lr
  }), Je = nf({
    isInteger: Di,
    matrix: fr,
    typed: lr
  }), Hl = Mf({
    conj: Yt,
    transpose: qe,
    typed: lr
  }), Kl = lf({
    DenseMatrix: me,
    SparseMatrix: Ye,
    matrix: fr,
    typed: lr
  }), yi = Wf({
    DenseMatrix: me,
    SparseMatrix: Ye,
    concat: Je,
    equalScalar: Ue,
    matrix: fr,
    typed: lr
  }), Ei = jo({
    Fraction: pn,
    typed: lr
  }), wt = hf({
    BigNumber: gt,
    DenseMatrix: me,
    SparseMatrix: Ye,
    config: se,
    matrix: fr,
    typed: lr
  }), Ql = gf({
    matrix: fr,
    multiplyScalar: Qe,
    typed: lr
  }), Jl = tl({
    DenseMatrix: me,
    SparseMatrix: Ye,
    concat: Je,
    config: se,
    matrix: fr,
    typed: lr
  }), Zl = Pf({
    bignumber: Et,
    fraction: Ei,
    number: yn
  }), wn = _f({
    matrix: fr,
    config: se,
    typed: lr
  }), Wt = Vf({
    DenseMatrix: me,
    SparseMatrix: Ye,
    bignumber: Et,
    concat: Je,
    config: se,
    matrix: fr,
    typed: lr
  }), Xt = is({
    typed: lr
  }), Oe = gl({
    DenseMatrix: me,
    SparseMatrix: Ye,
    addScalar: ot,
    concat: Je,
    equalScalar: Ue,
    matrix: fr,
    typed: lr
  }), Ze = Rf({
    numeric: Zl,
    typed: lr
  }), jl = ul({
    DenseMatrix: me,
    smaller: Wt
  }), rc = fl({
    ImmutableDenseMatrix: jl,
    getMatrixDataType: ql
  }), An = jf({
    DenseMatrix: me,
    SparseMatrix: Ye,
    bignumber: Et,
    concat: Je,
    config: se,
    matrix: fr,
    typed: lr
  }), ec = ns({
    flatten: hi,
    matrix: fr,
    size: wn,
    typed: lr
  }), tc = bl({
    addScalar: ot,
    complex: gn,
    conj: Yt,
    divideScalar: Ze,
    equal: yi,
    identity: wt,
    isZero: gi,
    matrix: fr,
    multiplyScalar: Qe,
    sign: Xl,
    sqrt: En,
    subtractScalar: yt,
    typed: lr,
    unaryMinus: Xt,
    zeros: Or
  }), nc = Qf({
    DenseMatrix: me,
    SparseMatrix: Ye,
    concat: Je,
    config: se,
    matrix: fr,
    typed: lr
  }), Gt = Vs({
    DenseMatrix: me,
    concat: Je,
    equalScalar: Ue,
    matrix: fr,
    subtractScalar: yt,
    typed: lr,
    unaryMinus: Xt
  }), ac = Lf({
    DenseMatrix: me,
    divideScalar: Ze,
    equalScalar: Ue,
    matrix: fr,
    multiplyScalar: Qe,
    subtractScalar: yt,
    typed: lr
  }), ct = Al({
    addScalar: ot,
    conj: Yt,
    multiplyScalar: Qe,
    size: wn,
    typed: lr
  }), Fr = Ls({
    addScalar: ot,
    dot: ct,
    equalScalar: Ue,
    matrix: fr,
    multiplyScalar: Qe,
    typed: lr
  }), ic = wf({
    bignumber: Et,
    matrix: fr,
    add: Oe,
    config: se,
    isPositive: Yl,
    larger: An,
    largerEq: Jl,
    smaller: Wt,
    smallerEq: nc,
    typed: lr
  }), uc = kf({
    DenseMatrix: me,
    divideScalar: Ze,
    equalScalar: Ue,
    matrix: fr,
    multiplyScalar: Qe,
    subtractScalar: yt,
    typed: lr
  }), oc = uf({
    Index: rc,
    matrix: fr,
    range: ic,
    typed: lr
  }), Pa = sf({
    matrix: fr,
    multiply: Fr,
    subtract: Gt,
    typed: lr
  }), sc = Cl({
    divideScalar: Ze,
    isZero: gi,
    matrix: fr,
    multiply: Fr,
    subtractScalar: yt,
    typed: lr,
    unaryMinus: Xt
  }), Fn = Bl({
    abs: Dn,
    addScalar: ot,
    det: sc,
    divideScalar: Ze,
    identity: wt,
    matrix: fr,
    multiply: Fr,
    typed: lr,
    unaryMinus: Xt
  }), fc = Uf({
    Complex: kt,
    config: se,
    fraction: Ei,
    identity: wt,
    inv: Fn,
    matrix: fr,
    multiply: Fr,
    number: yn,
    typed: lr
  }), lc = Rl({
    divideScalar: Ze,
    equalScalar: Ue,
    inv: Fn,
    matrix: fr,
    multiply: Fr,
    typed: lr
  }), cc = Ol({
    abs: Dn,
    add: Oe,
    addScalar: ot,
    atan: $l,
    bignumber: Et,
    column: oc,
    complex: gn,
    config: se,
    cos: Ll,
    diag: Kl,
    divideScalar: Ze,
    dot: ct,
    equal: yi,
    flatten: hi,
    im: kl,
    inv: Fn,
    larger: An,
    matrix: fr,
    matrixFromColumns: ec,
    multiply: Fr,
    multiplyScalar: Qe,
    number: yn,
    qr: tc,
    re: Wl,
    reshape: Vl,
    sin: Gl,
    size: wn,
    smaller: Wt,
    sqrt: En,
    subtract: Gt,
    typed: lr,
    usolve: ac,
    usolveAll: uc
  }), tt = Ul({
    add: Oe,
    divide: lc,
    typed: lr
  }), vt = El({
    abs: Dn,
    add: Oe,
    conj: Yt,
    ctranspose: Hl,
    eigs: cc,
    equalScalar: Ue,
    larger: An,
    matrix: fr,
    multiply: Fr,
    pow: fc,
    smaller: Wt,
    sqrt: En,
    typed: lr
  });
  function vc(r) {
    if (r.length === 2) return dc(r);
    if (r.length === 3) return mc(r);
  }
  function dc(r) {
    const e = Gt(r[1], r[0]), a = vt(e), t = ct(e, [
      1,
      0,
      0
    ]) / a, n = ct(e, [
      0,
      1,
      0
    ]) / a, u = ct(e, [
      0,
      0,
      1
    ]) / a, f = Math.sqrt(t ** 2 + n ** 2);
    let m = [
      [
        t,
        n,
        u
      ],
      [
        -n / f,
        t / f,
        0
      ],
      [
        -t * u / f,
        -n * u / f,
        f
      ]
    ];
    return u === 1 && (m = [
      [
        0,
        0,
        1
      ],
      [
        0,
        1,
        0
      ],
      [
        -1,
        0,
        0
      ]
    ]), u === -1 && (m = [
      [
        0,
        0,
        -1
      ],
      [
        0,
        1,
        0
      ],
      [
        1,
        0,
        0
      ]
    ]), Ql(wt(4), m).toArray();
  }
  function mc(r) {
    const u = [
      r[0],
      r[1],
      r[2]
    ], f = Or(3, 3).toArray();
    for (let _ = 0; _ < 3; _++) for (let F = 0; F < 3; F++) f[_][F] = u[F][_];
    const m = [
      -1,
      1,
      0
    ], v = [
      -1,
      0,
      1
    ], c = Or(3, 2).toArray();
    for (let _ = 0; _ < 3; _++) for (let F = 0; F < 3; F++) c[_][0] += f[_][F] * m[F], c[_][1] += f[_][F] * v[F];
    const l = c.map((_) => _[0]), d = c.map((_) => _[1]);
    let y = Pa(l, d), p = vt(y);
    if (p === 0) return console.warn("Degenerate triangle: nodes are collinear or coincident."), Or(18, 18).toArray();
    y = y.map((_) => _ / p);
    const D = [
      ...y
    ], s = wt(3).toArray(), E = y[0];
    let w;
    if (Math.abs(E) > 1 - 1e-10) {
      const _ = y[2];
      w = s.map((F, N) => F[2] - _ * y[N]);
    } else w = s.map((_, F) => _[0] - E * y[F]);
    if (p = vt(w), p === 0) return console.warn("Degenerate local X-axis detected."), Or(18, 18).toArray();
    w = w.map((_) => _ / p);
    let B = Pa(D, w);
    if (p = vt(B), p === 0) return console.warn("Degenerate local Y-axis detected."), Or(18, 18).toArray();
    B = B.map((_) => _ / p);
    const A = [
      w,
      B,
      D
    ], x = Or(18, 18).toArray();
    for (let _ = 0; _ < 3; _++) {
      const F = _ * 6, N = F + 3;
      for (let S = 0; S < 3; S++) for (let b = 0; b < 3; b++) x[F + S][F + b] = A[S][b], x[N + S][N + b] = A[S][b];
    }
    return x;
  }
  function pc(r, e, a) {
    if (r.length === 2) return hc(r, e, a);
    if (r.length === 3) return Dc(r, e, a);
  }
  function hc(r, e, a) {
    var _a2, _b, _c2, _d, _e, _f2;
    const t = ((_a2 = e == null ? void 0 : e.momentsOfInertiaZ) == null ? void 0 : _a2.get(a)) ?? 0, n = ((_b = e == null ? void 0 : e.momentsOfInertiaY) == null ? void 0 : _b.get(a)) ?? 0, u = ((_c2 = e == null ? void 0 : e.elasticities) == null ? void 0 : _c2.get(a)) ?? 0, f = ((_d = e == null ? void 0 : e.areas) == null ? void 0 : _d.get(a)) ?? 0, m = ((_e = e == null ? void 0 : e.shearModuli) == null ? void 0 : _e.get(a)) ?? 0, v = ((_f2 = e == null ? void 0 : e.torsionalConstants) == null ? void 0 : _f2.get(a)) ?? 0, c = vt(Gt(r[0], r[1])), l = u * f / c, d = u * t / c ** 3, y = u * n / c ** 3, p = m * v / c;
    return [
      [
        l,
        0,
        0,
        0,
        0,
        0,
        -l,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        12 * d,
        0,
        0,
        0,
        6 * c * d,
        0,
        -12 * d,
        0,
        0,
        0,
        6 * c * d
      ],
      [
        0,
        0,
        12 * y,
        0,
        -6 * c * y,
        0,
        0,
        0,
        -12 * y,
        0,
        -6 * c * y,
        0
      ],
      [
        0,
        0,
        0,
        p,
        0,
        0,
        0,
        0,
        0,
        -p,
        0,
        0
      ],
      [
        0,
        0,
        -6 * c * y,
        0,
        4 * y * c ** 2,
        0,
        0,
        0,
        6 * c * y,
        0,
        2 * y * c ** 2,
        0
      ],
      [
        0,
        6 * c * d,
        0,
        0,
        0,
        4 * d * c ** 2,
        0,
        -6 * c * d,
        0,
        0,
        0,
        2 * d * c ** 2
      ],
      [
        -l,
        0,
        0,
        0,
        0,
        0,
        l,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        -12 * d,
        0,
        0,
        0,
        -6 * d * c,
        0,
        12 * d,
        0,
        0,
        0,
        -6 * d * c
      ],
      [
        0,
        0,
        -12 * y,
        0,
        6 * c * y,
        0,
        0,
        0,
        12 * y,
        0,
        6 * c * y,
        0
      ],
      [
        0,
        0,
        0,
        -p,
        0,
        0,
        0,
        0,
        0,
        p,
        0,
        0
      ],
      [
        0,
        0,
        -6 * c * y,
        0,
        2 * y * c ** 2,
        0,
        0,
        0,
        6 * c * y,
        0,
        4 * y * c ** 2,
        0
      ],
      [
        0,
        6 * c * d,
        0,
        0,
        0,
        2 * d * c ** 2,
        0,
        -6 * c * d,
        0,
        0,
        0,
        4 * d * c ** 2
      ]
    ];
  }
  function Dc(r, e, a) {
    var _a2, _b, _c2, _d, _e;
    const t = ((_a2 = e.elasticities) == null ? void 0 : _a2.get(a)) ?? 0, n = ((_b = e.elasticitiesOrthogonal) == null ? void 0 : _b.get(a)) ?? 0, u = ((_c2 = e.poissonsRatios) == null ? void 0 : _c2.get(a)) ?? 0, f = ((_d = e.shearModuli) == null ? void 0 : _d.get(a)) ?? 0, m = ((_e = e.thicknesses) == null ? void 0 : _e.get(a)) ?? 0, v = n > 0, c = v ? P(t, n, f, u, m) : M(t, u, m), l = v ? $(f, m) : O(t, u, m), d = v ? Ai(t, n, f, u) : wi(t, u), y = r.map(([I, R]) => [
      I,
      R
    ]), p = y[1][0] - y[0][0], D = y[2][0] - y[0][0], s = y[0][1] - y[1][1], E = y[2][1] - y[0][1], w = 0.5 * (p * E - D * -s), B = z(y), A = Y(y), x = rr(y, d, m), _ = Fr(Fr(qe(B), l), B), F = Fr(Fr(qe(A), c), A), N = Or(18, 18).toArray(), S = Fr(Oe(_, F), w), b = [
      [
        0,
        1,
        5
      ],
      [
        6,
        7,
        11
      ],
      [
        12,
        13,
        17
      ]
    ];
    for (let I = 0; I < 3; I++) for (let R = 0; R < 3; R++) for (let Q = 0; Q < 3; Q++) {
      const j = b[I][R], q = b[Q][R];
      N[j][q] = x[I * 3 + R][Q * 3 + R];
    }
    for (let I = 0; I < 18; I++) for (let R = 0; R < 18; R++) N[I][R] = (N[I][R] ?? 0) + S.get([
      I,
      R
    ]);
    return N;
    function M(I, R, Q) {
      const j = I / (1 - R * R), q = fr([
        [
          j,
          j * R,
          0
        ],
        [
          j * R,
          j,
          0
        ],
        [
          0,
          0,
          j * (1 - R) / 2
        ]
      ]);
      return Fr(Q ** 3 / 12, q);
    }
    function O(I, R, Q) {
      const j = 0.8333333333333334, q = I / (2 * (1 + R)), W = j * q * Q;
      return fr([
        [
          W,
          0
        ],
        [
          0,
          W
        ]
      ]);
    }
    function P(I, R, Q, j, q) {
      const W = R * j / I, k = 1 - j * W, K = I / k, J = R / k, G = j * R / k, H = fr([
        [
          K,
          G,
          0
        ],
        [
          G,
          J,
          0
        ],
        [
          0,
          0,
          Q
        ]
      ]);
      return Fr(q ** 3 / 12, H);
    }
    function $(I, R) {
      const j = 0.8333333333333334 * I * R;
      return fr([
        [
          j,
          0
        ],
        [
          0,
          j
        ]
      ]);
    }
    function z(I) {
      const R = Or(2, 18).toArray(), [Q, j] = I[0], [q, W] = I[1], [k, K] = I[2], J = 0.5 * ((q - Q) * (K - j) - (k - Q) * -(j - W)), G = (Q + q + k) / 3, Z = (j + W + K) / 3, H = [
        G,
        Q,
        q
      ], tr = [
        Z,
        j,
        W
      ], ar = [
        G,
        q,
        k
      ], er = [
        Z,
        W,
        K
      ], or = [
        G,
        k,
        Q
      ], cr = [
        Z,
        K,
        j
      ], sr = 1 / 3, [mr, gr, dr, br] = V(H, tr), [Er, Cr, Vr, Hr] = V(ar, er), [Ir, ue, Jr, Se] = V(or, cr), Kr = Or(2, 18).toArray(), fe = Or(2, 18).toArray(), we = Or(2, 18).toArray();
      for (let pr = 0; pr < 2; pr++) for (let hr = 0; hr < 6; hr++) Kr[pr][hr] = sr * mr[pr][hr] + gr[pr][hr], Kr[pr][hr + 6] = sr * mr[pr][hr] + dr[pr][hr], Kr[pr][hr + 12] = sr * mr[pr][hr], fe[pr][hr] = sr * Er[pr][hr], fe[pr][hr + 6] = sr * Er[pr][hr] + Cr[pr][hr], fe[pr][hr + 12] = sr * Er[pr][hr] + Vr[pr][hr], we[pr][hr] = sr * Ir[pr][hr] + Jr[pr][hr], we[pr][hr + 6] = sr * Ir[pr][hr], we[pr][hr + 12] = sr * Ir[pr][hr] + ue[pr][hr];
      for (let pr = 0; pr < 2; pr++) for (let hr = 0; hr < 18; hr++) Kr[pr][hr] *= br, fe[pr][hr] *= Hr, we[pr][hr] *= Se, R[pr][hr] = (Kr[pr][hr] + fe[pr][hr] + we[pr][hr]) / J;
      return R;
    }
    function V(I, R) {
      const Q = Or(2, 6).toArray(), j = Or(2, 6).toArray(), q = Or(2, 6).toArray(), W = I[1] - I[0], k = I[0] - I[2], K = R[2] - R[0], J = R[0] - R[1], G = I[2] - I[1], Z = R[1] - R[2], H = 0.5 * (W * K - k * J), tr = 0.5 * J * k, ar = 0.5 * K * W, er = 0.5 * W * k, or = 0.5 * J * K;
      return Q[0][2] = 0.5 * G / H, Q[0][3] = -0.5, Q[1][2] = 0.5 * Z / H, Q[1][4] = 0.5, j[0][2] = 0.5 * k / H, j[0][3] = 0.5 * tr / H, j[0][4] = 0.5 * er / H, j[1][2] = 0.5 * K / H, j[1][3] = 0.5 * or / H, j[1][4] = 0.5 * ar / H, q[0][2] = 0.5 * W / H, q[0][3] = -0.5 * ar / H, q[0][4] = -0.5 * er / H, q[1][2] = 0.5 * J / H, q[1][3] = -0.5 * or / H, q[1][4] = -0.5 * tr / H, [
        Q,
        j,
        q,
        H
      ];
    }
    function Y(I) {
      const R = Or(3, 18).toArray(), [Q, j] = I[0], [q, W] = I[1], [k, K] = I[2], J = q - Q, G = k - Q, Z = k - q, H = W - K, tr = K - j, ar = j - W, er = 0.5 * (J * tr - G * -ar), or = H / (2 * er), cr = Z / (2 * er), sr = tr / (2 * er), mr = -G / (2 * er), gr = ar / (2 * er), dr = J / (2 * er);
      return R[0][4] = or, R[0][10] = sr, R[0][16] = gr, R[1][3] = -cr, R[1][9] = -mr, R[1][15] = -dr, R[2][3] = -or, R[2][4] = cr, R[2][9] = -sr, R[2][10] = mr, R[2][15] = -gr, R[2][16] = dr, R;
    }
    function rr(I, R, Q) {
      let j = Or(9, 9).toArray(), q = Or(9, 9).toArray(), W = Or(9, 9).toArray(), k = Or(9, 3).toArray(), K = Or(3, 9).toArray(), J = Or(3, 3).toArray(), G = Or(3, 3).toArray(), Z = Or(3, 3).toArray(), H = Or(3, 3).toArray(), tr = Or(3, 3).toArray(), ar = Or(3, 3).toArray(), er = Or(3, 3).toArray(), or = Or(3, 3).toArray();
      const cr = 1 / 8, sr = cr / 6, mr = cr ** 2 / 4, gr = 1, dr = 2, br = 1, Er = 0, Cr = 1, Vr = -1, Hr = -1, Ir = -1, ue = -2, Jr = I[0][0], Se = I[0][1], Kr = I[1][0], fe = I[1][1], we = I[2][0], pr = I[2][1], hr = Jr - Kr, pe = Kr - we, ne = we - Jr, ze = Se - fe, he = fe - pr, De = pr - Se, Ae = -hr, Be = -pe, Me = -ne, Fe = -ze, le = -he, ae = -De, Re = 0.5 * (Ae * De - ne * -ze), Vt = 2 * Re, Qr = 4 * Re, Yr = 0.5 * Q, At = Re * Q, ce = Ae ** 2 + Fe ** 2, ie = Be ** 2 + le ** 2, ve = Me ** 2 + ae ** 2;
      k[0][0] = Yr * he, k[0][2] = Yr * Be, k[1][1] = Yr * Be, k[1][2] = Yr * he, k[2][0] = Yr * he * (ae - Fe) * sr, k[2][1] = Yr * Be * (ne - hr) * sr, k[2][2] = Yr * (ne * ae - hr * Fe) * 2 * sr, k[3][0] = Yr * De, k[3][2] = Yr * Me, k[4][1] = Yr * Me, k[4][2] = Yr * De, k[5][0] = Yr * De * (Fe - le) * sr, k[5][1] = Yr * Me * (hr - pe) * sr, k[5][2] = Yr * (hr * Fe - pe * le) * 2 * sr, k[6][0] = Yr * ze, k[6][2] = Yr * Ae, k[7][1] = Yr * Ae, k[7][2] = Yr * ze, k[8][0] = Yr * ze * (le - ae) * sr, k[8][1] = Yr * Ae * (pe - ne) * sr, k[8][2] = Yr * (pe * le - ne * ae) * 2 * sr, W = Fr(Fr(fr(k), R), qe(fr(k))).toArray(), W = Fr(fr(W), 1 / At).toArray(), K[0][0] = Be / Qr, K[0][1] = le / Qr, K[0][2] = 1, K[0][3] = Me / Qr, K[0][4] = ae / Qr, K[0][6] = Ae / Qr, K[0][7] = Fe / Qr, K[1][0] = Be / Qr, K[1][1] = le / Qr, K[1][3] = Me / Qr, K[1][4] = ae / Qr, K[1][5] = 1, K[1][6] = Ae / Qr, K[1][7] = Fe / Qr, K[2][0] = Be / Qr, K[2][1] = le / Qr, K[2][3] = Me / Qr, K[2][4] = ae / Qr, K[2][6] = Ae / Qr, K[2][7] = Fe / Qr, K[2][8] = 1;
      const oe = 1 / (Re * Qr);
      J[0][0] = oe * he * ae * ce, J[0][1] = oe * De * Fe * ie, J[0][2] = oe * ze * le * ve, J[1][0] = oe * pe * Me * ce, J[1][1] = oe * ne * Ae * ie, J[1][2] = oe * hr * Be * ve, J[2][0] = oe * (he * ne + Be * ae) * ce, J[2][1] = oe * (De * hr + Me * Fe) * ie, J[2][2] = oe * (ze * pe + Ae * le) * ve;
      const Tr = Vt / 3;
      G[0][0] = Tr * gr / ce, G[0][1] = Tr * dr / ce, G[0][2] = Tr * br / ce, G[1][0] = Tr * Er / ie, G[1][1] = Tr * Cr / ie, G[1][2] = Tr * Vr / ie, G[2][0] = Tr * Hr / ve, G[2][1] = Tr * Ir / ve, G[2][2] = Tr * ue / ve, Z[0][0] = Tr * ue / ce, Z[0][1] = Tr * Hr / ce, Z[0][2] = Tr * Ir / ce, Z[1][0] = Tr * br / ie, Z[1][1] = Tr * gr / ie, Z[1][2] = Tr * dr / ie, Z[2][0] = Tr * Vr / ve, Z[2][1] = Tr * Er / ve, Z[2][2] = Tr * Cr / ve, H[0][0] = Tr * Cr / ce, H[0][1] = Tr * Vr / ce, H[0][2] = Tr * Er / ce, H[1][0] = Tr * Ir / ie, H[1][1] = Tr * ue / ie, H[1][2] = Tr * Hr / ie, H[2][0] = Tr * dr / ve, H[2][1] = Tr * br / ve, H[2][2] = Tr * gr / ve, tr = Fr(Oe(fr(G), fr(Z)), 0.5).toArray(), ar = Fr(Oe(fr(Z), fr(H)), 0.5).toArray(), er = Fr(Oe(fr(H), fr(G)), 0.5).toArray();
      const st = Fr(Fr(qe(fr(J)), R), fr(J));
      return or = Oe(Oe(Fr(Fr(qe(fr(tr)), st), fr(tr)), Fr(Fr(qe(fr(ar)), st), fr(ar))), Fr(Fr(qe(fr(er)), st), fr(er))).toArray(), or = Fr(fr(or), 3 / 4 * mr * At).toArray(), q = Fr(Fr(qe(fr(K)), fr(or)), fr(K)).toArray(), j = Oe(fr(W), fr(q)).toArray(), j;
    }
  }
  function wi(r, e) {
    const a = r / (1 - e * e);
    return fr([
      [
        a,
        a * e,
        0
      ],
      [
        a * e,
        a,
        0
      ],
      [
        0,
        0,
        a * (1 - e) / 2
      ]
    ]);
  }
  function Ai(r, e, a, t) {
    const n = e * t / r, u = 1 - t * n, f = r / u, m = e / u, v = t * e / u;
    return fr([
      [
        f,
        v,
        0
      ],
      [
        v,
        m,
        0
      ],
      [
        0,
        0,
        a
      ]
    ]);
  }
  Mc = function(r, e, a, t) {
    const n = {
      normals: /* @__PURE__ */ new Map(),
      shearsY: /* @__PURE__ */ new Map(),
      shearsZ: /* @__PURE__ */ new Map(),
      torsions: /* @__PURE__ */ new Map(),
      bendingsY: /* @__PURE__ */ new Map(),
      bendingsZ: /* @__PURE__ */ new Map(),
      bendingXX: /* @__PURE__ */ new Map(),
      bendingYY: /* @__PURE__ */ new Map(),
      bendingXY: /* @__PURE__ */ new Map(),
      membraneXX: /* @__PURE__ */ new Map(),
      membraneYY: /* @__PURE__ */ new Map(),
      membraneXY: /* @__PURE__ */ new Map(),
      tranverseShearX: /* @__PURE__ */ new Map(),
      tranverseShearY: /* @__PURE__ */ new Map()
    }, u = {
      bendingXX: /* @__PURE__ */ new Map(),
      bendingYY: /* @__PURE__ */ new Map(),
      bendingXY: /* @__PURE__ */ new Map(),
      membraneXX: /* @__PURE__ */ new Map(),
      membraneYY: /* @__PURE__ */ new Map(),
      membraneXY: /* @__PURE__ */ new Map()
    };
    e.forEach((v, c) => {
      var _a2;
      const l = v.map((D) => r[D]), d = v.reduce((D, s) => D.concat(t.deformations.get(s)), []), y = vc(l), p = Fr(y, d);
      if (v.length === 2) {
        const D = pc(l, a, c);
        let s = Fr(D, p);
        n.normals.set(c, [
          s[0],
          s[6]
        ]), n.shearsY.set(c, [
          s[1],
          s[7]
        ]), n.shearsZ.set(c, [
          s[2],
          s[8]
        ]), n.torsions.set(c, [
          s[3],
          s[9]
        ]), n.bendingsY.set(c, [
          s[4],
          s[10]
        ]), n.bendingsZ.set(c, [
          s[5],
          s[11]
        ]);
      } else {
        const D = gc(a, c), s = yc(l), E = Ec(d), w = wc(l), A = Fr(1 / (2 * w), Fr(Fr(D, s), E)).toArray(), x = ((_a2 = a.thicknesses) == null ? void 0 : _a2.get(c)) ?? 1, _ = A[0][0] * x, F = A[1][0] * x, N = A[2][0] * x, S = A[0][1] * (x ** 3 / 12), b = A[1][1] * (x ** 3 / 12), M = A[2][1] * (x ** 3 / 12);
        u.membraneXX.set(c, _), u.membraneYY.set(c, F), u.membraneXY.set(c, N), u.bendingXX.set(c, S), u.bendingYY.set(c, b), u.bendingXY.set(c, M);
      }
    });
    const { nodeToCentroidNodesMap: f, nodeToCentroidElementIndiciesMap: m } = Ac(r, e);
    return e.forEach((v, c) => {
      if (v.length !== 3) return;
      let l = [
        0,
        0,
        0
      ], d = [
        0,
        0,
        0
      ], y = [
        0,
        0,
        0
      ], p = [
        0,
        0,
        0
      ], D = [
        0,
        0,
        0
      ], s = [
        0,
        0,
        0
      ];
      v.forEach((E, w) => {
        f.get(E);
        const B = m.get(E) || [];
        l[w] = tt(B.map((A) => u.membraneXX.get(A) ?? 0)), d[w] = tt(B.map((A) => u.membraneYY.get(A) ?? 0)), y[w] = tt(B.map((A) => u.membraneXY.get(A) ?? 0)), p[w] = tt(B.map((A) => u.bendingXX.get(A) ?? 0)), D[w] = tt(B.map((A) => u.bendingYY.get(A) ?? 0)), s[w] = tt(B.map((A) => u.bendingXY.get(A) ?? 0));
      }), n.membraneXX.set(c, l), n.membraneYY.set(c, d), n.membraneXY.set(c, y), n.bendingXX.set(c, p), n.bendingYY.set(c, D), n.bendingXY.set(c, s);
    }), n;
  };
  function gc(r, e) {
    var _a2, _b, _c2, _d, _e;
    const a = ((_a2 = r.elasticities) == null ? void 0 : _a2.get(e)) ?? 0, t = ((_b = r.elasticitiesOrthogonal) == null ? void 0 : _b.get(e)) ?? 0, n = ((_c2 = r.poissonsRatios) == null ? void 0 : _c2.get(e)) ?? 0, u = ((_d = r.shearModuli) == null ? void 0 : _d.get(e)) ?? 0;
    return (_e = r.thicknesses) == null ? void 0 : _e.get(e), t > 0 ? Ai(a, t, u, n) : wi(a, n);
  }
  function yc(r) {
    const [e, a] = r[0], [t, n] = r[1], [u, f] = r[2], m = n - f, v = f - a, c = a - n, l = u - t, d = e - u, y = t - e;
    return fr([
      [
        m,
        v,
        c,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        l,
        d,
        y
      ],
      [
        l,
        d,
        y,
        m,
        v,
        c
      ]
    ]);
  }
  function Ec(r) {
    const [e, a, t] = [
      r[0],
      r[6],
      r[12]
    ], [n, u, f] = [
      r[1],
      r[7],
      r[13]
    ], [m, v, c] = [
      r[4],
      r[10],
      r[16]
    ], [l, d, y] = [
      r[3],
      r[9],
      r[15]
    ];
    return fr([
      [
        e,
        -m
      ],
      [
        a,
        -v
      ],
      [
        t,
        -c
      ],
      [
        n,
        l
      ],
      [
        u,
        d
      ],
      [
        f,
        y
      ]
    ]);
  }
  function wc(r) {
    const [e, a] = r[0], [t, n] = r[1], [u, f] = r[2], m = t - e, v = u - e, c = f - a, l = a - n;
    return 0.5 * (m * c - v * -l);
  }
  function Ac(r, e) {
    const a = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
    return e.forEach((n, u) => {
      const f = n.map((v) => r[v]), m = Fc(f);
      n.forEach((v) => {
        var _a2, _b;
        a.has(v) || a.set(v, []), (_a2 = a.get(v)) == null ? void 0 : _a2.push(m), t.has(v) || t.set(v, []), (_b = t.get(v)) == null ? void 0 : _b.push(u);
      });
    }), {
      nodeToCentroidNodesMap: a,
      nodeToCentroidElementIndiciesMap: t
    };
  }
  function Fc(r) {
    const e = r.reduce((n, u) => n + u[0], 0) / r.length, a = r.reduce((n, u) => n + u[1], 0) / r.length, t = r.reduce((n, u) => n + u[2], 0) / r.length;
    return [
      e,
      a,
      t
    ];
  }
  const bc = "modulepreload", _c = function(r, e) {
    return new URL(r, e).href;
  }, za = {}, Cc = function(e, a, t) {
    let n = Promise.resolve();
    if (a && a.length > 0) {
      const f = document.getElementsByTagName("link"), m = document.querySelector("meta[property=csp-nonce]"), v = (m == null ? void 0 : m.nonce) || (m == null ? void 0 : m.getAttribute("nonce"));
      n = Promise.allSettled(a.map((c) => {
        if (c = _c(c, t), c in za) return;
        za[c] = true;
        const l = c.endsWith(".css"), d = l ? '[rel="stylesheet"]' : "";
        if (!!t) for (let D = f.length - 1; D >= 0; D--) {
          const s = f[D];
          if (s.href === c && (!l || s.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${c}"]${d}`)) return;
        const p = document.createElement("link");
        if (p.rel = l ? "stylesheet" : bc, l || (p.as = "script"), p.crossOrigin = "", p.href = c, v && p.setAttribute("nonce", v), document.head.appendChild(p), l) return new Promise((D, s) => {
          p.addEventListener("load", D), p.addEventListener("error", () => s(new Error(`Unable to preload CSS for ${c}`)));
        });
      }));
    }
    function u(f) {
      const m = new Event("vite:preloadError", {
        cancelable: true
      });
      if (m.payload = f, window.dispatchEvent(m), !m.defaultPrevented) throw f;
    }
    return n.then((f) => {
      for (const m of f || []) m.status === "rejected" && u(m.reason);
      return e().catch(u);
    });
  };
  var Sc = (() => {
    var r = import.meta.url;
    return async function(e = {}) {
      var a, t = e, n, u, f = new Promise((i, o) => {
        n = i, u = o;
      }), m = typeof window == "object", v = typeof WorkerGlobalScope < "u", c = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer", l = !m && !c && !v;
      if (c) {
        const { createRequire: i } = await Cc(() => import("./__vite-browser-external-D7Ct-6yo.js").then((o) => o._), [], import.meta.url);
        var d = i(import.meta.url);
      }
      var y = "./this.program", p = "";
      function D(i) {
        return t.locateFile ? t.locateFile(i, p) : p + i;
      }
      var s, E;
      if (c) {
        if (typeof process > "u" || !process.release || process.release.name !== "node") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
        var w = process.versions.node, B = w.split(".").slice(0, 3);
        if (B = B[0] * 1e4 + B[1] * 100 + B[2].split("-")[0] * 1, B < 16e4) throw new Error("This emscripten-generated code requires node v16.0.0 (detected v" + w + ")");
        var A = d("fs"), x = d("path");
        import.meta.url.startsWith("data:") || (p = x.dirname(d("url").fileURLToPath(import.meta.url)) + "/"), E = (i) => {
          i = rr(i) ? new URL(i) : i;
          var o = A.readFileSync(i);
          return M(Buffer.isBuffer(o)), o;
        }, s = async (i, o = true) => {
          i = rr(i) ? new URL(i) : i;
          var h = A.readFileSync(i, o ? void 0 : "utf8");
          return M(o ? Buffer.isBuffer(h) : typeof h == "string"), h;
        }, process.argv.length > 1 && (y = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2);
      } else if (l) {
        if (typeof process == "object" && typeof d == "function" || typeof window == "object" || typeof WorkerGlobalScope < "u") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      } else if (m || v) {
        if (v ? p = self.location.href : typeof document < "u" && document.currentScript && (p = document.currentScript.src), r && (p = r), p.startsWith("blob:") ? p = "" : p = p.slice(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1), !(typeof window == "object" || typeof WorkerGlobalScope < "u")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
        v && (E = (i) => {
          var o = new XMLHttpRequest();
          return o.open("GET", i, false), o.responseType = "arraybuffer", o.send(null), new Uint8Array(o.response);
        }), s = async (i) => {
          if (rr(i)) return new Promise((h, C) => {
            var T = new XMLHttpRequest();
            T.open("GET", i, true), T.responseType = "arraybuffer", T.onload = () => {
              if (T.status == 200 || T.status == 0 && T.response) {
                h(T.response);
                return;
              }
              C(T.status);
            }, T.onerror = C, T.send(null);
          });
          var o = await fetch(i, {
            credentials: "same-origin"
          });
          if (o.ok) return o.arrayBuffer();
          throw new Error(o.status + " : " + o.url);
        };
      } else throw new Error("environment detection error");
      var _ = console.log.bind(console), F = console.error.bind(console);
      M(!l, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
      var N;
      typeof WebAssembly != "object" && F("no native wasm support detected");
      var S, b = false;
      function M(i, o) {
        i || dr("Assertion failed" + (o ? ": " + o : ""));
      }
      var O, P, $, z, V, Y = false, rr = (i) => i.startsWith("file://");
      function I() {
        var i = xn();
        M((i & 3) == 0), i == 0 && (i += 4), z[i >> 2] = 34821223, z[i + 4 >> 2] = 2310721022, z[0] = 1668509029;
      }
      function R() {
        if (!b) {
          var i = xn();
          i == 0 && (i += 4);
          var o = z[i >> 2], h = z[i + 4 >> 2];
          (o != 34821223 || h != 2310721022) && dr(`Stack overflow! Stack cookie has been overwritten at ${pe(i)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${pe(h)} ${pe(o)}`), z[0] != 1668509029 && dr("Runtime error: The application has corrupted its heap memory area (address zero)!");
        }
      }
      (() => {
        var i = new Int16Array(1), o = new Int8Array(i.buffer);
        if (i[0] = 25459, o[0] !== 115 || o[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
      })();
      function Q(i) {
        Object.getOwnPropertyDescriptor(t, i) || Object.defineProperty(t, i, {
          configurable: true,
          set() {
            dr(`Attempt to set \`Module.${i}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
          }
        });
      }
      function j(i) {
        Object.getOwnPropertyDescriptor(t, i) && dr(`\`Module.${i}\` was supplied but \`${i}\` not included in INCOMING_MODULE_JS_API`);
      }
      function q(i) {
        return i === "FS_createPath" || i === "FS_createDataFile" || i === "FS_createPreloadedFile" || i === "FS_unlink" || i === "addRunDependency" || i === "FS_createLazyFile" || i === "FS_createDevice" || i === "removeRunDependency";
      }
      function W(i, o) {
        typeof globalThis < "u" && !Object.getOwnPropertyDescriptor(globalThis, i) && Object.defineProperty(globalThis, i, {
          configurable: true,
          get() {
            o();
          }
        });
      }
      function k(i, o) {
        W(i, () => {
          ne(`\`${i}\` is not longer defined by emscripten. ${o}`);
        });
      }
      k("buffer", "Please use HEAP8.buffer or wasmMemory.buffer"), k("asm", "Please use wasmExports instead");
      function K(i) {
        W(i, () => {
          var o = `\`${i}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, h = i;
          h.startsWith("_") || (h = "$" + i), o += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${h}')`, q(i) && (o += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"), ne(o);
        }), J(i);
      }
      function J(i) {
        Object.getOwnPropertyDescriptor(t, i) || Object.defineProperty(t, i, {
          configurable: true,
          get() {
            var o = `'${i}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
            q(i) && (o += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"), dr(o);
          }
        });
      }
      function G() {
        var i = S.buffer;
        O = new Int8Array(i), t.HEAPU8 = P = new Uint8Array(i), $ = new Int32Array(i), t.HEAPU32 = z = new Uint32Array(i), t.HEAPF64 = new Float64Array(i), V = new BigInt64Array(i), new BigUint64Array(i);
      }
      M(typeof Int32Array < "u" && typeof Float64Array < "u" && Int32Array.prototype.subarray != null && Int32Array.prototype.set != null, "JS engine does not provide full typed array support");
      function Z() {
        if (t.preRun) for (typeof t.preRun == "function" && (t.preRun = [
          t.preRun
        ]); t.preRun.length; ) hr(t.preRun.shift());
        Q("preRun"), Kr(pr);
      }
      function H() {
        M(!Y), Y = true, R(), !t.noFSInit && !g.initialized && g.init(), be.__wasm_call_ctors(), g.ignorePermissions = false;
      }
      function tr() {
        if (R(), t.postRun) for (typeof t.postRun == "function" && (t.postRun = [
          t.postRun
        ]); t.postRun.length; ) we(t.postRun.shift());
        Q("postRun"), Kr(fe);
      }
      var ar = 0, er = null, or = {}, cr = null;
      function sr(i) {
        for (var o = i; ; ) {
          if (!or[i]) return i;
          i = o + Math.random();
        }
      }
      function mr(i) {
        var _a2;
        ar++, (_a2 = t.monitorRunDependencies) == null ? void 0 : _a2.call(t, ar), i ? (M(!or[i]), or[i] = 1, cr === null && typeof setInterval < "u" && (cr = setInterval(() => {
          if (b) {
            clearInterval(cr), cr = null;
            return;
          }
          var o = false;
          for (var h in or) o || (o = true, F("still waiting on run dependencies:")), F(`dependency: ${h}`);
          o && F("(end of list)");
        }, 1e4))) : F("warning: run dependency added without ID");
      }
      function gr(i) {
        var _a2;
        if (ar--, (_a2 = t.monitorRunDependencies) == null ? void 0 : _a2.call(t, ar), i ? (M(or[i]), delete or[i]) : F("warning: run dependency removed without ID"), ar == 0 && (cr !== null && (clearInterval(cr), cr = null), er)) {
          var o = er;
          er = null, o();
        }
      }
      function dr(i) {
        var _a2;
        (_a2 = t.onAbort) == null ? void 0 : _a2.call(t, i), i = "Aborted(" + i + ")", F(i), b = true;
        var o = new WebAssembly.RuntimeError(i);
        throw u(o), o;
      }
      function br(i, o) {
        return (...h) => {
          M(Y, `native function \`${i}\` called before runtime initialization`);
          var C = be[i];
          return M(C, `exported native function \`${i}\` not found`), M(h.length <= o, `native function \`${i}\` called with ${h.length} args but expects ${o}`), C(...h);
        };
      }
      var Er;
      function Cr() {
        return t.locateFile ? D("deform.wasm") : new URL("" + new URL("deform-Clgyi9fe.wasm", import.meta.url).href, import.meta.url).href;
      }
      function Vr(i) {
        if (i == Er && N) return new Uint8Array(N);
        if (E) return E(i);
        throw "both async and sync fetching of the wasm failed";
      }
      async function Hr(i) {
        if (!N) try {
          var o = await s(i);
          return new Uint8Array(o);
        } catch {
        }
        return Vr(i);
      }
      async function Ir(i, o) {
        try {
          var h = await Hr(i), C = await WebAssembly.instantiate(h, o);
          return C;
        } catch (T) {
          F(`failed to asynchronously prepare wasm: ${T}`), rr(Er) && F(`warning: Loading from a file URI (${Er}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), dr(T);
        }
      }
      async function ue(i, o, h) {
        if (!i && typeof WebAssembly.instantiateStreaming == "function" && !rr(o) && !c) try {
          var C = fetch(o, {
            credentials: "same-origin"
          }), T = await WebAssembly.instantiateStreaming(C, h);
          return T;
        } catch (U) {
          F(`wasm streaming compile failed: ${U}`), F("falling back to ArrayBuffer instantiation");
        }
        return Ir(o, h);
      }
      function Jr() {
        return {
          env: Mn,
          wasi_snapshot_preview1: Mn
        };
      }
      async function Se() {
        function i(L, X) {
          return be = L.exports, S = be.memory, M(S, "memory not found in wasm exports"), G(), gr("wasm-instantiate"), be;
        }
        mr("wasm-instantiate");
        var o = t;
        function h(L) {
          return M(t === o, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), o = null, i(L.instance);
        }
        var C = Jr();
        if (t.instantiateWasm) return new Promise((L, X) => {
          try {
            t.instantiateWasm(C, (ir, Ar) => {
              L(i(ir, Ar));
            });
          } catch (ir) {
            F(`Module.instantiateWasm callback failed with error: ${ir}`), X(ir);
          }
        });
        Er ?? (Er = Cr());
        try {
          var T = await ue(N, Er, C), U = h(T);
          return U;
        } catch (L) {
          return u(L), Promise.reject(L);
        }
      }
      var Kr = (i) => {
        for (; i.length > 0; ) i.shift()(t);
      }, fe = [], we = (i) => fe.push(i), pr = [], hr = (i) => pr.push(i), pe = (i) => (M(typeof i == "number"), i >>>= 0, "0x" + i.toString(16).padStart(8, "0")), ne = (i) => {
        ne.shown || (ne.shown = {}), ne.shown[i] || (ne.shown[i] = 1, c && (i = "warning: " + i), F(i));
      }, ze = typeof TextDecoder < "u" ? new TextDecoder() : void 0, he = (i, o = 0, h = NaN) => {
        for (var C = o + h, T = o; i[T] && !(T >= C); ) ++T;
        if (T - o > 16 && i.buffer && ze) return ze.decode(i.subarray(o, T));
        for (var U = ""; o < T; ) {
          var L = i[o++];
          if (!(L & 128)) {
            U += String.fromCharCode(L);
            continue;
          }
          var X = i[o++] & 63;
          if ((L & 224) == 192) {
            U += String.fromCharCode((L & 31) << 6 | X);
            continue;
          }
          var ir = i[o++] & 63;
          if ((L & 240) == 224 ? L = (L & 15) << 12 | X << 6 | ir : ((L & 248) != 240 && ne("Invalid UTF-8 leading byte " + pe(L) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), L = (L & 7) << 18 | X << 12 | ir << 6 | i[o++] & 63), L < 65536) U += String.fromCharCode(L);
          else {
            var Ar = L - 65536;
            U += String.fromCharCode(55296 | Ar >> 10, 56320 | Ar & 1023);
          }
        }
        return U;
      }, De = (i, o) => (M(typeof i == "number", `UTF8ToString expects a number (got ${typeof i})`), i ? he(P, i, o) : ""), Ae = (i, o, h, C) => dr(`Assertion failed: ${De(i)}, at: ` + [
        o ? De(o) : "unknown filename",
        h,
        C ? De(C) : "unknown function"
      ]);
      class Be {
        constructor(o) {
          this.excPtr = o, this.ptr = o - 24;
        }
        set_type(o) {
          z[this.ptr + 4 >> 2] = o;
        }
        get_type() {
          return z[this.ptr + 4 >> 2];
        }
        set_destructor(o) {
          z[this.ptr + 8 >> 2] = o;
        }
        get_destructor() {
          return z[this.ptr + 8 >> 2];
        }
        set_caught(o) {
          o = o ? 1 : 0, O[this.ptr + 12] = o;
        }
        get_caught() {
          return O[this.ptr + 12] != 0;
        }
        set_rethrown(o) {
          o = o ? 1 : 0, O[this.ptr + 13] = o;
        }
        get_rethrown() {
          return O[this.ptr + 13] != 0;
        }
        init(o, h) {
          this.set_adjusted_ptr(0), this.set_type(o), this.set_destructor(h);
        }
        set_adjusted_ptr(o) {
          z[this.ptr + 16 >> 2] = o;
        }
        get_adjusted_ptr() {
          return z[this.ptr + 16 >> 2];
        }
      }
      var Me = (i, o, h) => {
        var C = new Be(i);
        C.init(o, h), M(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
      }, Fe = () => dr("native code called abort()"), le = (i, o, h, C) => {
        if (M(typeof i == "string", `stringToUTF8Array expects a string (got ${typeof i})`), !(C > 0)) return 0;
        for (var T = h, U = h + C - 1, L = 0; L < i.length; ++L) {
          var X = i.charCodeAt(L);
          if (X >= 55296 && X <= 57343) {
            var ir = i.charCodeAt(++L);
            X = 65536 + ((X & 1023) << 10) | ir & 1023;
          }
          if (X <= 127) {
            if (h >= U) break;
            o[h++] = X;
          } else if (X <= 2047) {
            if (h + 1 >= U) break;
            o[h++] = 192 | X >> 6, o[h++] = 128 | X & 63;
          } else if (X <= 65535) {
            if (h + 2 >= U) break;
            o[h++] = 224 | X >> 12, o[h++] = 128 | X >> 6 & 63, o[h++] = 128 | X & 63;
          } else {
            if (h + 3 >= U) break;
            X > 1114111 && ne("Invalid Unicode code point " + pe(X) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."), o[h++] = 240 | X >> 18, o[h++] = 128 | X >> 12 & 63, o[h++] = 128 | X >> 6 & 63, o[h++] = 128 | X & 63;
          }
        }
        return o[h] = 0, h - T;
      }, ae = (i, o, h) => (M(typeof h == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), le(i, P, o, h)), Re = (i) => {
        for (var o = 0, h = 0; h < i.length; ++h) {
          var C = i.charCodeAt(h);
          C <= 127 ? o++ : C <= 2047 ? o += 2 : C >= 55296 && C <= 57343 ? (o += 4, ++h) : o += 3;
        }
        return o;
      }, Vt = (i, o, h, C) => {
        var T = (/* @__PURE__ */ new Date()).getFullYear(), U = new Date(T, 0, 1), L = new Date(T, 6, 1), X = U.getTimezoneOffset(), ir = L.getTimezoneOffset(), Ar = Math.max(X, ir);
        z[i >> 2] = Ar * 60, $[o >> 2] = +(X != ir);
        var zr = (Dr) => {
          var _r = Dr >= 0 ? "-" : "+", re = Math.abs(Dr), xe = String(Math.floor(re / 60)).padStart(2, "0"), ge = String(re % 60).padStart(2, "0");
          return `UTC${_r}${xe}${ge}`;
        }, Rr = zr(X), Sr = zr(ir);
        M(Rr), M(Sr), M(Re(Rr) <= 16, `timezone name truncated to fit in TZNAME_MAX (${Rr})`), M(Re(Sr) <= 16, `timezone name truncated to fit in TZNAME_MAX (${Sr})`), ir < X ? (ae(Rr, h, 17), ae(Sr, C, 17)) : (ae(Rr, C, 17), ae(Sr, h, 17));
      }, Qr = () => 2147483648, Yr = (i, o) => (M(o, "alignment argument is required"), Math.ceil(i / o) * o), At = (i) => {
        var o = S.buffer, h = (i - o.byteLength + 65535) / 65536 | 0;
        try {
          return S.grow(h), G(), 1;
        } catch (C) {
          F(`growMemory: Attempted to grow heap from ${o.byteLength} bytes to ${i} bytes, but got error: ${C}`);
        }
      }, ce = (i) => {
        var o = P.length;
        i >>>= 0, M(i > o);
        var h = Qr();
        if (i > h) return F(`Cannot enlarge memory, requested ${i} bytes, but the limit is ${h} bytes!`), false;
        for (var C = 1; C <= 4; C *= 2) {
          var T = o * (1 + 0.2 / C);
          T = Math.min(T, i + 100663296);
          var U = Math.min(h, Yr(Math.max(i, T), 65536)), L = At(U);
          if (L) return true;
        }
        return F(`Failed to grow the heap from ${o} bytes to ${U} bytes, not enough memory!`), false;
      }, ie = {}, ve = () => y || "./this.program", oe = () => {
        if (!oe.strings) {
          var i = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", o = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG: i,
            _: ve()
          };
          for (var h in ie) ie[h] === void 0 ? delete o[h] : o[h] = ie[h];
          var C = [];
          for (var h in o) C.push(`${h}=${o[h]}`);
          oe.strings = C;
        }
        return oe.strings;
      }, Tr = (i, o) => {
        var h = 0, C = 0;
        for (var T of oe()) {
          var U = o + h;
          z[i + C >> 2] = U, h += ae(T, U, 1 / 0) + 1, C += 4;
        }
        return 0;
      }, st = (i, o) => {
        var h = oe();
        z[i >> 2] = h.length;
        var C = 0;
        for (var T of h) C += Re(T) + 1;
        return z[o >> 2] = C, 0;
      }, Pr = {
        isAbs: (i) => i.charAt(0) === "/",
        splitPath: (i) => {
          var o = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return o.exec(i).slice(1);
        },
        normalizeArray: (i, o) => {
          for (var h = 0, C = i.length - 1; C >= 0; C--) {
            var T = i[C];
            T === "." ? i.splice(C, 1) : T === ".." ? (i.splice(C, 1), h++) : h && (i.splice(C, 1), h--);
          }
          if (o) for (; h; h--) i.unshift("..");
          return i;
        },
        normalize: (i) => {
          var o = Pr.isAbs(i), h = i.slice(-1) === "/";
          return i = Pr.normalizeArray(i.split("/").filter((C) => !!C), !o).join("/"), !i && !o && (i = "."), i && h && (i += "/"), (o ? "/" : "") + i;
        },
        dirname: (i) => {
          var o = Pr.splitPath(i), h = o[0], C = o[1];
          return !h && !C ? "." : (C && (C = C.slice(0, -1)), h + C);
        },
        basename: (i) => i && i.match(/([^\/]+|\/)\/*$/)[1],
        join: (...i) => Pr.normalize(i.join("/")),
        join2: (i, o) => Pr.normalize(i + "/" + o)
      }, Fi = () => {
        if (c) {
          var i = d("crypto");
          return (o) => i.randomFillSync(o);
        }
        return (o) => crypto.getRandomValues(o);
      }, bn = (i) => {
        (bn = Fi())(i);
      }, je = {
        resolve: (...i) => {
          for (var o = "", h = false, C = i.length - 1; C >= -1 && !h; C--) {
            var T = C >= 0 ? i[C] : g.cwd();
            if (typeof T != "string") throw new TypeError("Arguments to path.resolve must be strings");
            if (!T) return "";
            o = T + "/" + o, h = Pr.isAbs(T);
          }
          return o = Pr.normalizeArray(o.split("/").filter((U) => !!U), !h).join("/"), (h ? "/" : "") + o || ".";
        },
        relative: (i, o) => {
          i = je.resolve(i).slice(1), o = je.resolve(o).slice(1);
          function h(Ar) {
            for (var zr = 0; zr < Ar.length && Ar[zr] === ""; zr++) ;
            for (var Rr = Ar.length - 1; Rr >= 0 && Ar[Rr] === ""; Rr--) ;
            return zr > Rr ? [] : Ar.slice(zr, Rr - zr + 1);
          }
          for (var C = h(i.split("/")), T = h(o.split("/")), U = Math.min(C.length, T.length), L = U, X = 0; X < U; X++) if (C[X] !== T[X]) {
            L = X;
            break;
          }
          for (var ir = [], X = L; X < C.length; X++) ir.push("..");
          return ir = ir.concat(T.slice(L)), ir.join("/");
        }
      }, Ht = [], _n = (i, o, h) => {
        var C = Re(i) + 1, T = new Array(C), U = le(i, T, 0, T.length);
        return T.length = U, T;
      }, bi = () => {
        if (!Ht.length) {
          var i = null;
          if (c) {
            var o = 256, h = Buffer.alloc(o), C = 0, T = process.stdin.fd;
            try {
              C = A.readSync(T, h, 0, o);
            } catch (U) {
              if (U.toString().includes("EOF")) C = 0;
              else throw U;
            }
            C > 0 && (i = h.slice(0, C).toString("utf-8"));
          } else typeof window < "u" && typeof window.prompt == "function" && (i = window.prompt("Input: "), i !== null && (i += `
`));
          if (!i) return null;
          Ht = _n(i);
        }
        return Ht.shift();
      }, Ve = {
        ttys: [],
        init() {
        },
        shutdown() {
        },
        register(i, o) {
          Ve.ttys[i] = {
            input: [],
            output: [],
            ops: o
          }, g.registerDevice(i, Ve.stream_ops);
        },
        stream_ops: {
          open(i) {
            var o = Ve.ttys[i.node.rdev];
            if (!o) throw new g.ErrnoError(43);
            i.tty = o, i.seekable = false;
          },
          close(i) {
            i.tty.ops.fsync(i.tty);
          },
          fsync(i) {
            i.tty.ops.fsync(i.tty);
          },
          read(i, o, h, C, T) {
            if (!i.tty || !i.tty.ops.get_char) throw new g.ErrnoError(60);
            for (var U = 0, L = 0; L < C; L++) {
              var X;
              try {
                X = i.tty.ops.get_char(i.tty);
              } catch {
                throw new g.ErrnoError(29);
              }
              if (X === void 0 && U === 0) throw new g.ErrnoError(6);
              if (X == null) break;
              U++, o[h + L] = X;
            }
            return U && (i.node.atime = Date.now()), U;
          },
          write(i, o, h, C, T) {
            if (!i.tty || !i.tty.ops.put_char) throw new g.ErrnoError(60);
            try {
              for (var U = 0; U < C; U++) i.tty.ops.put_char(i.tty, o[h + U]);
            } catch {
              throw new g.ErrnoError(29);
            }
            return C && (i.node.mtime = i.node.ctime = Date.now()), U;
          }
        },
        default_tty_ops: {
          get_char(i) {
            return bi();
          },
          put_char(i, o) {
            o === null || o === 10 ? (_(he(i.output)), i.output = []) : o != 0 && i.output.push(o);
          },
          fsync(i) {
            var _a2;
            ((_a2 = i.output) == null ? void 0 : _a2.length) > 0 && (_(he(i.output)), i.output = []);
          },
          ioctl_tcgets(i) {
            return {
              c_iflag: 25856,
              c_oflag: 5,
              c_cflag: 191,
              c_lflag: 35387,
              c_cc: [
                3,
                28,
                127,
                21,
                4,
                0,
                1,
                0,
                17,
                19,
                26,
                0,
                18,
                15,
                23,
                22,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            };
          },
          ioctl_tcsets(i, o, h) {
            return 0;
          },
          ioctl_tiocgwinsz(i) {
            return [
              24,
              80
            ];
          }
        },
        default_tty1_ops: {
          put_char(i, o) {
            o === null || o === 10 ? (F(he(i.output)), i.output = []) : o != 0 && i.output.push(o);
          },
          fsync(i) {
            var _a2;
            ((_a2 = i.output) == null ? void 0 : _a2.length) > 0 && (F(he(i.output)), i.output = []);
          }
        }
      }, Cn = (i) => {
        dr("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
      }, wr = {
        ops_table: null,
        mount(i) {
          return wr.createNode(null, "/", 16895, 0);
        },
        createNode(i, o, h, C) {
          if (g.isBlkdev(h) || g.isFIFO(h)) throw new g.ErrnoError(63);
          wr.ops_table || (wr.ops_table = {
            dir: {
              node: {
                getattr: wr.node_ops.getattr,
                setattr: wr.node_ops.setattr,
                lookup: wr.node_ops.lookup,
                mknod: wr.node_ops.mknod,
                rename: wr.node_ops.rename,
                unlink: wr.node_ops.unlink,
                rmdir: wr.node_ops.rmdir,
                readdir: wr.node_ops.readdir,
                symlink: wr.node_ops.symlink
              },
              stream: {
                llseek: wr.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: wr.node_ops.getattr,
                setattr: wr.node_ops.setattr
              },
              stream: {
                llseek: wr.stream_ops.llseek,
                read: wr.stream_ops.read,
                write: wr.stream_ops.write,
                mmap: wr.stream_ops.mmap,
                msync: wr.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: wr.node_ops.getattr,
                setattr: wr.node_ops.setattr,
                readlink: wr.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: wr.node_ops.getattr,
                setattr: wr.node_ops.setattr
              },
              stream: g.chrdev_stream_ops
            }
          });
          var T = g.createNode(i, o, h, C);
          return g.isDir(T.mode) ? (T.node_ops = wr.ops_table.dir.node, T.stream_ops = wr.ops_table.dir.stream, T.contents = {}) : g.isFile(T.mode) ? (T.node_ops = wr.ops_table.file.node, T.stream_ops = wr.ops_table.file.stream, T.usedBytes = 0, T.contents = null) : g.isLink(T.mode) ? (T.node_ops = wr.ops_table.link.node, T.stream_ops = wr.ops_table.link.stream) : g.isChrdev(T.mode) && (T.node_ops = wr.ops_table.chrdev.node, T.stream_ops = wr.ops_table.chrdev.stream), T.atime = T.mtime = T.ctime = Date.now(), i && (i.contents[o] = T, i.atime = i.mtime = i.ctime = T.atime), T;
        },
        getFileDataAsTypedArray(i) {
          return i.contents ? i.contents.subarray ? i.contents.subarray(0, i.usedBytes) : new Uint8Array(i.contents) : new Uint8Array(0);
        },
        expandFileStorage(i, o) {
          var h = i.contents ? i.contents.length : 0;
          if (!(h >= o)) {
            var C = 1024 * 1024;
            o = Math.max(o, h * (h < C ? 2 : 1.125) >>> 0), h != 0 && (o = Math.max(o, 256));
            var T = i.contents;
            i.contents = new Uint8Array(o), i.usedBytes > 0 && i.contents.set(T.subarray(0, i.usedBytes), 0);
          }
        },
        resizeFileStorage(i, o) {
          if (i.usedBytes != o) if (o == 0) i.contents = null, i.usedBytes = 0;
          else {
            var h = i.contents;
            i.contents = new Uint8Array(o), h && i.contents.set(h.subarray(0, Math.min(o, i.usedBytes))), i.usedBytes = o;
          }
        },
        node_ops: {
          getattr(i) {
            var o = {};
            return o.dev = g.isChrdev(i.mode) ? i.id : 1, o.ino = i.id, o.mode = i.mode, o.nlink = 1, o.uid = 0, o.gid = 0, o.rdev = i.rdev, g.isDir(i.mode) ? o.size = 4096 : g.isFile(i.mode) ? o.size = i.usedBytes : g.isLink(i.mode) ? o.size = i.link.length : o.size = 0, o.atime = new Date(i.atime), o.mtime = new Date(i.mtime), o.ctime = new Date(i.ctime), o.blksize = 4096, o.blocks = Math.ceil(o.size / o.blksize), o;
          },
          setattr(i, o) {
            for (const h of [
              "mode",
              "atime",
              "mtime",
              "ctime"
            ]) o[h] != null && (i[h] = o[h]);
            o.size !== void 0 && wr.resizeFileStorage(i, o.size);
          },
          lookup(i, o) {
            throw new g.ErrnoError(44);
          },
          mknod(i, o, h, C) {
            return wr.createNode(i, o, h, C);
          },
          rename(i, o, h) {
            var C;
            try {
              C = g.lookupNode(o, h);
            } catch {
            }
            if (C) {
              if (g.isDir(i.mode)) for (var T in C.contents) throw new g.ErrnoError(55);
              g.hashRemoveNode(C);
            }
            delete i.parent.contents[i.name], o.contents[h] = i, i.name = h, o.ctime = o.mtime = i.parent.ctime = i.parent.mtime = Date.now();
          },
          unlink(i, o) {
            delete i.contents[o], i.ctime = i.mtime = Date.now();
          },
          rmdir(i, o) {
            var h = g.lookupNode(i, o);
            for (var C in h.contents) throw new g.ErrnoError(55);
            delete i.contents[o], i.ctime = i.mtime = Date.now();
          },
          readdir(i) {
            return [
              ".",
              "..",
              ...Object.keys(i.contents)
            ];
          },
          symlink(i, o, h) {
            var C = wr.createNode(i, o, 41471, 0);
            return C.link = h, C;
          },
          readlink(i) {
            if (!g.isLink(i.mode)) throw new g.ErrnoError(28);
            return i.link;
          }
        },
        stream_ops: {
          read(i, o, h, C, T) {
            var U = i.node.contents;
            if (T >= i.node.usedBytes) return 0;
            var L = Math.min(i.node.usedBytes - T, C);
            if (M(L >= 0), L > 8 && U.subarray) o.set(U.subarray(T, T + L), h);
            else for (var X = 0; X < L; X++) o[h + X] = U[T + X];
            return L;
          },
          write(i, o, h, C, T, U) {
            if (M(!(o instanceof ArrayBuffer)), o.buffer === O.buffer && (U = false), !C) return 0;
            var L = i.node;
            if (L.mtime = L.ctime = Date.now(), o.subarray && (!L.contents || L.contents.subarray)) {
              if (U) return M(T === 0, "canOwn must imply no weird position inside the file"), L.contents = o.subarray(h, h + C), L.usedBytes = C, C;
              if (L.usedBytes === 0 && T === 0) return L.contents = o.slice(h, h + C), L.usedBytes = C, C;
              if (T + C <= L.usedBytes) return L.contents.set(o.subarray(h, h + C), T), C;
            }
            if (wr.expandFileStorage(L, T + C), L.contents.subarray && o.subarray) L.contents.set(o.subarray(h, h + C), T);
            else for (var X = 0; X < C; X++) L.contents[T + X] = o[h + X];
            return L.usedBytes = Math.max(L.usedBytes, T + C), C;
          },
          llseek(i, o, h) {
            var C = o;
            if (h === 1 ? C += i.position : h === 2 && g.isFile(i.node.mode) && (C += i.node.usedBytes), C < 0) throw new g.ErrnoError(28);
            return C;
          },
          mmap(i, o, h, C, T) {
            if (!g.isFile(i.node.mode)) throw new g.ErrnoError(43);
            var U, L, X = i.node.contents;
            if (!(T & 2) && X && X.buffer === O.buffer) L = false, U = X.byteOffset;
            else {
              if (L = true, U = Cn(), !U) throw new g.ErrnoError(48);
              X && ((h > 0 || h + o < X.length) && (X.subarray ? X = X.subarray(h, h + o) : X = Array.prototype.slice.call(X, h, h + o)), O.set(X, U));
            }
            return {
              ptr: U,
              allocated: L
            };
          },
          msync(i, o, h, C, T) {
            return wr.stream_ops.write(i, o, 0, C, h, false), 0;
          }
        }
      }, _i = async (i) => {
        var o = await s(i);
        return M(o, `Loading data file "${i}" failed (no arrayBuffer).`), new Uint8Array(o);
      }, Ci = (i, o, h, C, T, U) => {
        g.createDataFile(i, o, h, C, T, U);
      }, Sn = [], Si = (i, o, h, C) => {
        typeof Browser < "u" && Browser.init();
        var T = false;
        return Sn.forEach((U) => {
          T || U.canHandle(o) && (U.handle(i, o, h, C), T = true);
        }), T;
      }, Bi = (i, o, h, C, T, U, L, X, ir, Ar) => {
        var zr = o ? je.resolve(Pr.join2(i, o)) : i, Rr = sr(`cp ${zr}`);
        function Sr(Dr) {
          function _r(re) {
            Ar == null ? void 0 : Ar(), X || Ci(i, o, re, C, T, ir), U == null ? void 0 : U(), gr(Rr);
          }
          Si(Dr, zr, _r, () => {
            L == null ? void 0 : L(), gr(Rr);
          }) || _r(Dr);
        }
        mr(Rr), typeof h == "string" ? _i(h).then(Sr, L) : Sr(h);
      }, Mi = (i) => {
        var o = {
          r: 0,
          "r+": 2,
          w: 577,
          "w+": 578,
          a: 1089,
          "a+": 1090
        }, h = o[i];
        if (typeof h > "u") throw new Error(`Unknown file open mode: ${i}`);
        return h;
      }, Kt = (i, o) => {
        var h = 0;
        return i && (h |= 365), o && (h |= 146), h;
      }, xi = (i) => De(Wi(i)), Bn = {
        EPERM: 63,
        ENOENT: 44,
        ESRCH: 71,
        EINTR: 27,
        EIO: 29,
        ENXIO: 60,
        E2BIG: 1,
        ENOEXEC: 45,
        EBADF: 8,
        ECHILD: 12,
        EAGAIN: 6,
        EWOULDBLOCK: 6,
        ENOMEM: 48,
        EACCES: 2,
        EFAULT: 21,
        ENOTBLK: 105,
        EBUSY: 10,
        EEXIST: 20,
        EXDEV: 75,
        ENODEV: 43,
        ENOTDIR: 54,
        EISDIR: 31,
        EINVAL: 28,
        ENFILE: 41,
        EMFILE: 33,
        ENOTTY: 59,
        ETXTBSY: 74,
        EFBIG: 22,
        ENOSPC: 51,
        ESPIPE: 70,
        EROFS: 69,
        EMLINK: 34,
        EPIPE: 64,
        EDOM: 18,
        ERANGE: 68,
        ENOMSG: 49,
        EIDRM: 24,
        ECHRNG: 106,
        EL2NSYNC: 156,
        EL3HLT: 107,
        EL3RST: 108,
        ELNRNG: 109,
        EUNATCH: 110,
        ENOCSI: 111,
        EL2HLT: 112,
        EDEADLK: 16,
        ENOLCK: 46,
        EBADE: 113,
        EBADR: 114,
        EXFULL: 115,
        ENOANO: 104,
        EBADRQC: 103,
        EBADSLT: 102,
        EDEADLOCK: 16,
        EBFONT: 101,
        ENOSTR: 100,
        ENODATA: 116,
        ETIME: 117,
        ENOSR: 118,
        ENONET: 119,
        ENOPKG: 120,
        EREMOTE: 121,
        ENOLINK: 47,
        EADV: 122,
        ESRMNT: 123,
        ECOMM: 124,
        EPROTO: 65,
        EMULTIHOP: 36,
        EDOTDOT: 125,
        EBADMSG: 9,
        ENOTUNIQ: 126,
        EBADFD: 127,
        EREMCHG: 128,
        ELIBACC: 129,
        ELIBBAD: 130,
        ELIBSCN: 131,
        ELIBMAX: 132,
        ELIBEXEC: 133,
        ENOSYS: 52,
        ENOTEMPTY: 55,
        ENAMETOOLONG: 37,
        ELOOP: 32,
        EOPNOTSUPP: 138,
        EPFNOSUPPORT: 139,
        ECONNRESET: 15,
        ENOBUFS: 42,
        EAFNOSUPPORT: 5,
        EPROTOTYPE: 67,
        ENOTSOCK: 57,
        ENOPROTOOPT: 50,
        ESHUTDOWN: 140,
        ECONNREFUSED: 14,
        EADDRINUSE: 3,
        ECONNABORTED: 13,
        ENETUNREACH: 40,
        ENETDOWN: 38,
        ETIMEDOUT: 73,
        EHOSTDOWN: 142,
        EHOSTUNREACH: 23,
        EINPROGRESS: 26,
        EALREADY: 7,
        EDESTADDRREQ: 17,
        EMSGSIZE: 35,
        EPROTONOSUPPORT: 66,
        ESOCKTNOSUPPORT: 137,
        EADDRNOTAVAIL: 4,
        ENETRESET: 39,
        EISCONN: 30,
        ENOTCONN: 53,
        ETOOMANYREFS: 141,
        EUSERS: 136,
        EDQUOT: 19,
        ESTALE: 72,
        ENOTSUP: 138,
        ENOMEDIUM: 148,
        EILSEQ: 25,
        EOVERFLOW: 61,
        ECANCELED: 11,
        ENOTRECOVERABLE: 56,
        EOWNERDEAD: 62,
        ESTRPIPE: 135
      }, g = {
        root: null,
        mounts: [],
        devices: {},
        streams: [],
        nextInode: 1,
        nameTable: null,
        currentPath: "/",
        initialized: false,
        ignorePermissions: true,
        filesystems: null,
        syncFSRequests: 0,
        readFiles: {},
        ErrnoError: class extends Error {
          constructor(i) {
            super(Y ? xi(i) : "");
            __publicField(this, "name", "ErrnoError");
            this.errno = i;
            for (var o in Bn) if (Bn[o] === i) {
              this.code = o;
              break;
            }
          }
        },
        FSStream: class {
          constructor() {
            __publicField(this, "shared", {});
          }
          get object() {
            return this.node;
          }
          set object(i) {
            this.node = i;
          }
          get isRead() {
            return (this.flags & 2097155) !== 1;
          }
          get isWrite() {
            return (this.flags & 2097155) !== 0;
          }
          get isAppend() {
            return this.flags & 1024;
          }
          get flags() {
            return this.shared.flags;
          }
          set flags(i) {
            this.shared.flags = i;
          }
          get position() {
            return this.shared.position;
          }
          set position(i) {
            this.shared.position = i;
          }
        },
        FSNode: class {
          constructor(i, o, h, C) {
            __publicField(this, "node_ops", {});
            __publicField(this, "stream_ops", {});
            __publicField(this, "readMode", 365);
            __publicField(this, "writeMode", 146);
            __publicField(this, "mounted", null);
            i || (i = this), this.parent = i, this.mount = i.mount, this.id = g.nextInode++, this.name = o, this.mode = h, this.rdev = C, this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(i) {
            i ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(i) {
            i ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return g.isDir(this.mode);
          }
          get isDevice() {
            return g.isChrdev(this.mode);
          }
        },
        lookupPath(i, o = {}) {
          if (!i) throw new g.ErrnoError(44);
          o.follow_mount ?? (o.follow_mount = true), Pr.isAbs(i) || (i = g.cwd() + "/" + i);
          r: for (var h = 0; h < 40; h++) {
            for (var C = i.split("/").filter((Ar) => !!Ar), T = g.root, U = "/", L = 0; L < C.length; L++) {
              var X = L === C.length - 1;
              if (X && o.parent) break;
              if (C[L] !== ".") {
                if (C[L] === "..") {
                  if (U = Pr.dirname(U), g.isRoot(T)) {
                    i = U + "/" + C.slice(L + 1).join("/");
                    continue r;
                  } else T = T.parent;
                  continue;
                }
                U = Pr.join2(U, C[L]);
                try {
                  T = g.lookupNode(T, C[L]);
                } catch (Ar) {
                  if ((Ar == null ? void 0 : Ar.errno) === 44 && X && o.noent_okay) return {
                    path: U
                  };
                  throw Ar;
                }
                if (g.isMountpoint(T) && (!X || o.follow_mount) && (T = T.mounted.root), g.isLink(T.mode) && (!X || o.follow)) {
                  if (!T.node_ops.readlink) throw new g.ErrnoError(52);
                  var ir = T.node_ops.readlink(T);
                  Pr.isAbs(ir) || (ir = Pr.dirname(U) + "/" + ir), i = ir + "/" + C.slice(L + 1).join("/");
                  continue r;
                }
              }
            }
            return {
              path: U,
              node: T
            };
          }
          throw new g.ErrnoError(32);
        },
        getPath(i) {
          for (var o; ; ) {
            if (g.isRoot(i)) {
              var h = i.mount.mountpoint;
              return o ? h[h.length - 1] !== "/" ? `${h}/${o}` : h + o : h;
            }
            o = o ? `${i.name}/${o}` : i.name, i = i.parent;
          }
        },
        hashName(i, o) {
          for (var h = 0, C = 0; C < o.length; C++) h = (h << 5) - h + o.charCodeAt(C) | 0;
          return (i + h >>> 0) % g.nameTable.length;
        },
        hashAddNode(i) {
          var o = g.hashName(i.parent.id, i.name);
          i.name_next = g.nameTable[o], g.nameTable[o] = i;
        },
        hashRemoveNode(i) {
          var o = g.hashName(i.parent.id, i.name);
          if (g.nameTable[o] === i) g.nameTable[o] = i.name_next;
          else for (var h = g.nameTable[o]; h; ) {
            if (h.name_next === i) {
              h.name_next = i.name_next;
              break;
            }
            h = h.name_next;
          }
        },
        lookupNode(i, o) {
          var h = g.mayLookup(i);
          if (h) throw new g.ErrnoError(h);
          for (var C = g.hashName(i.id, o), T = g.nameTable[C]; T; T = T.name_next) {
            var U = T.name;
            if (T.parent.id === i.id && U === o) return T;
          }
          return g.lookup(i, o);
        },
        createNode(i, o, h, C) {
          M(typeof i == "object");
          var T = new g.FSNode(i, o, h, C);
          return g.hashAddNode(T), T;
        },
        destroyNode(i) {
          g.hashRemoveNode(i);
        },
        isRoot(i) {
          return i === i.parent;
        },
        isMountpoint(i) {
          return !!i.mounted;
        },
        isFile(i) {
          return (i & 61440) === 32768;
        },
        isDir(i) {
          return (i & 61440) === 16384;
        },
        isLink(i) {
          return (i & 61440) === 40960;
        },
        isChrdev(i) {
          return (i & 61440) === 8192;
        },
        isBlkdev(i) {
          return (i & 61440) === 24576;
        },
        isFIFO(i) {
          return (i & 61440) === 4096;
        },
        isSocket(i) {
          return (i & 49152) === 49152;
        },
        flagsToPermissionString(i) {
          var o = [
            "r",
            "w",
            "rw"
          ][i & 3];
          return i & 512 && (o += "w"), o;
        },
        nodePermissions(i, o) {
          return g.ignorePermissions ? 0 : o.includes("r") && !(i.mode & 292) || o.includes("w") && !(i.mode & 146) || o.includes("x") && !(i.mode & 73) ? 2 : 0;
        },
        mayLookup(i) {
          if (!g.isDir(i.mode)) return 54;
          var o = g.nodePermissions(i, "x");
          return o || (i.node_ops.lookup ? 0 : 2);
        },
        mayCreate(i, o) {
          if (!g.isDir(i.mode)) return 54;
          try {
            var h = g.lookupNode(i, o);
            return 20;
          } catch {
          }
          return g.nodePermissions(i, "wx");
        },
        mayDelete(i, o, h) {
          var C;
          try {
            C = g.lookupNode(i, o);
          } catch (U) {
            return U.errno;
          }
          var T = g.nodePermissions(i, "wx");
          if (T) return T;
          if (h) {
            if (!g.isDir(C.mode)) return 54;
            if (g.isRoot(C) || g.getPath(C) === g.cwd()) return 10;
          } else if (g.isDir(C.mode)) return 31;
          return 0;
        },
        mayOpen(i, o) {
          return i ? g.isLink(i.mode) ? 32 : g.isDir(i.mode) && (g.flagsToPermissionString(o) !== "r" || o & 576) ? 31 : g.nodePermissions(i, g.flagsToPermissionString(o)) : 44;
        },
        checkOpExists(i, o) {
          if (!i) throw new g.ErrnoError(o);
          return i;
        },
        MAX_OPEN_FDS: 4096,
        nextfd() {
          for (var i = 0; i <= g.MAX_OPEN_FDS; i++) if (!g.streams[i]) return i;
          throw new g.ErrnoError(33);
        },
        getStreamChecked(i) {
          var o = g.getStream(i);
          if (!o) throw new g.ErrnoError(8);
          return o;
        },
        getStream: (i) => g.streams[i],
        createStream(i, o = -1) {
          return M(o >= -1), i = Object.assign(new g.FSStream(), i), o == -1 && (o = g.nextfd()), i.fd = o, g.streams[o] = i, i;
        },
        closeStream(i) {
          g.streams[i] = null;
        },
        dupStream(i, o = -1) {
          var _a2, _b;
          var h = g.createStream(i, o);
          return (_b = (_a2 = h.stream_ops) == null ? void 0 : _a2.dup) == null ? void 0 : _b.call(_a2, h), h;
        },
        doSetAttr(i, o, h) {
          var C = i == null ? void 0 : i.stream_ops.setattr, T = C ? i : o;
          C ?? (C = o.node_ops.setattr), g.checkOpExists(C, 63), C(T, h);
        },
        chrdev_stream_ops: {
          open(i) {
            var _a2, _b;
            var o = g.getDevice(i.node.rdev);
            i.stream_ops = o.stream_ops, (_b = (_a2 = i.stream_ops).open) == null ? void 0 : _b.call(_a2, i);
          },
          llseek() {
            throw new g.ErrnoError(70);
          }
        },
        major: (i) => i >> 8,
        minor: (i) => i & 255,
        makedev: (i, o) => i << 8 | o,
        registerDevice(i, o) {
          g.devices[i] = {
            stream_ops: o
          };
        },
        getDevice: (i) => g.devices[i],
        getMounts(i) {
          for (var o = [], h = [
            i
          ]; h.length; ) {
            var C = h.pop();
            o.push(C), h.push(...C.mounts);
          }
          return o;
        },
        syncfs(i, o) {
          typeof i == "function" && (o = i, i = false), g.syncFSRequests++, g.syncFSRequests > 1 && F(`warning: ${g.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          var h = g.getMounts(g.root.mount), C = 0;
          function T(L) {
            return M(g.syncFSRequests > 0), g.syncFSRequests--, o(L);
          }
          function U(L) {
            if (L) return U.errored ? void 0 : (U.errored = true, T(L));
            ++C >= h.length && T(null);
          }
          h.forEach((L) => {
            if (!L.type.syncfs) return U(null);
            L.type.syncfs(L, i, U);
          });
        },
        mount(i, o, h) {
          if (typeof i == "string") throw i;
          var C = h === "/", T = !h, U;
          if (C && g.root) throw new g.ErrnoError(10);
          if (!C && !T) {
            var L = g.lookupPath(h, {
              follow_mount: false
            });
            if (h = L.path, U = L.node, g.isMountpoint(U)) throw new g.ErrnoError(10);
            if (!g.isDir(U.mode)) throw new g.ErrnoError(54);
          }
          var X = {
            type: i,
            opts: o,
            mountpoint: h,
            mounts: []
          }, ir = i.mount(X);
          return ir.mount = X, X.root = ir, C ? g.root = ir : U && (U.mounted = X, U.mount && U.mount.mounts.push(X)), ir;
        },
        unmount(i) {
          var o = g.lookupPath(i, {
            follow_mount: false
          });
          if (!g.isMountpoint(o.node)) throw new g.ErrnoError(28);
          var h = o.node, C = h.mounted, T = g.getMounts(C);
          Object.keys(g.nameTable).forEach((L) => {
            for (var X = g.nameTable[L]; X; ) {
              var ir = X.name_next;
              T.includes(X.mount) && g.destroyNode(X), X = ir;
            }
          }), h.mounted = null;
          var U = h.mount.mounts.indexOf(C);
          M(U !== -1), h.mount.mounts.splice(U, 1);
        },
        lookup(i, o) {
          return i.node_ops.lookup(i, o);
        },
        mknod(i, o, h) {
          var C = g.lookupPath(i, {
            parent: true
          }), T = C.node, U = Pr.basename(i);
          if (!U) throw new g.ErrnoError(28);
          if (U === "." || U === "..") throw new g.ErrnoError(20);
          var L = g.mayCreate(T, U);
          if (L) throw new g.ErrnoError(L);
          if (!T.node_ops.mknod) throw new g.ErrnoError(63);
          return T.node_ops.mknod(T, U, o, h);
        },
        statfs(i) {
          return g.statfsNode(g.lookupPath(i, {
            follow: true
          }).node);
        },
        statfsStream(i) {
          return g.statfsNode(i.node);
        },
        statfsNode(i) {
          var o = {
            bsize: 4096,
            frsize: 4096,
            blocks: 1e6,
            bfree: 5e5,
            bavail: 5e5,
            files: g.nextInode,
            ffree: g.nextInode - 1,
            fsid: 42,
            flags: 2,
            namelen: 255
          };
          return i.node_ops.statfs && Object.assign(o, i.node_ops.statfs(i.mount.opts.root)), o;
        },
        create(i, o = 438) {
          return o &= 4095, o |= 32768, g.mknod(i, o, 0);
        },
        mkdir(i, o = 511) {
          return o &= 1023, o |= 16384, g.mknod(i, o, 0);
        },
        mkdirTree(i, o) {
          var h = i.split("/"), C = "";
          for (var T of h) if (T) {
            (C || Pr.isAbs(i)) && (C += "/"), C += T;
            try {
              g.mkdir(C, o);
            } catch (U) {
              if (U.errno != 20) throw U;
            }
          }
        },
        mkdev(i, o, h) {
          return typeof h > "u" && (h = o, o = 438), o |= 8192, g.mknod(i, o, h);
        },
        symlink(i, o) {
          if (!je.resolve(i)) throw new g.ErrnoError(44);
          var h = g.lookupPath(o, {
            parent: true
          }), C = h.node;
          if (!C) throw new g.ErrnoError(44);
          var T = Pr.basename(o), U = g.mayCreate(C, T);
          if (U) throw new g.ErrnoError(U);
          if (!C.node_ops.symlink) throw new g.ErrnoError(63);
          return C.node_ops.symlink(C, T, i);
        },
        rename(i, o) {
          var h = Pr.dirname(i), C = Pr.dirname(o), T = Pr.basename(i), U = Pr.basename(o), L, X, ir;
          if (L = g.lookupPath(i, {
            parent: true
          }), X = L.node, L = g.lookupPath(o, {
            parent: true
          }), ir = L.node, !X || !ir) throw new g.ErrnoError(44);
          if (X.mount !== ir.mount) throw new g.ErrnoError(75);
          var Ar = g.lookupNode(X, T), zr = je.relative(i, C);
          if (zr.charAt(0) !== ".") throw new g.ErrnoError(28);
          if (zr = je.relative(o, h), zr.charAt(0) !== ".") throw new g.ErrnoError(55);
          var Rr;
          try {
            Rr = g.lookupNode(ir, U);
          } catch {
          }
          if (Ar !== Rr) {
            var Sr = g.isDir(Ar.mode), Dr = g.mayDelete(X, T, Sr);
            if (Dr) throw new g.ErrnoError(Dr);
            if (Dr = Rr ? g.mayDelete(ir, U, Sr) : g.mayCreate(ir, U), Dr) throw new g.ErrnoError(Dr);
            if (!X.node_ops.rename) throw new g.ErrnoError(63);
            if (g.isMountpoint(Ar) || Rr && g.isMountpoint(Rr)) throw new g.ErrnoError(10);
            if (ir !== X && (Dr = g.nodePermissions(X, "w"), Dr)) throw new g.ErrnoError(Dr);
            g.hashRemoveNode(Ar);
            try {
              X.node_ops.rename(Ar, ir, U), Ar.parent = ir;
            } catch (_r) {
              throw _r;
            } finally {
              g.hashAddNode(Ar);
            }
          }
        },
        rmdir(i) {
          var o = g.lookupPath(i, {
            parent: true
          }), h = o.node, C = Pr.basename(i), T = g.lookupNode(h, C), U = g.mayDelete(h, C, true);
          if (U) throw new g.ErrnoError(U);
          if (!h.node_ops.rmdir) throw new g.ErrnoError(63);
          if (g.isMountpoint(T)) throw new g.ErrnoError(10);
          h.node_ops.rmdir(h, C), g.destroyNode(T);
        },
        readdir(i) {
          var o = g.lookupPath(i, {
            follow: true
          }), h = o.node, C = g.checkOpExists(h.node_ops.readdir, 54);
          return C(h);
        },
        unlink(i) {
          var o = g.lookupPath(i, {
            parent: true
          }), h = o.node;
          if (!h) throw new g.ErrnoError(44);
          var C = Pr.basename(i), T = g.lookupNode(h, C), U = g.mayDelete(h, C, false);
          if (U) throw new g.ErrnoError(U);
          if (!h.node_ops.unlink) throw new g.ErrnoError(63);
          if (g.isMountpoint(T)) throw new g.ErrnoError(10);
          h.node_ops.unlink(h, C), g.destroyNode(T);
        },
        readlink(i) {
          var o = g.lookupPath(i), h = o.node;
          if (!h) throw new g.ErrnoError(44);
          if (!h.node_ops.readlink) throw new g.ErrnoError(28);
          return h.node_ops.readlink(h);
        },
        stat(i, o) {
          var h = g.lookupPath(i, {
            follow: !o
          }), C = h.node, T = g.checkOpExists(C.node_ops.getattr, 63);
          return T(C);
        },
        fstat(i) {
          var o = g.getStreamChecked(i), h = o.node, C = o.stream_ops.getattr, T = C ? o : h;
          return C ?? (C = h.node_ops.getattr), g.checkOpExists(C, 63), C(T);
        },
        lstat(i) {
          return g.stat(i, true);
        },
        doChmod(i, o, h, C) {
          g.doSetAttr(i, o, {
            mode: h & 4095 | o.mode & -4096,
            ctime: Date.now(),
            dontFollow: C
          });
        },
        chmod(i, o, h) {
          var C;
          if (typeof i == "string") {
            var T = g.lookupPath(i, {
              follow: !h
            });
            C = T.node;
          } else C = i;
          g.doChmod(null, C, o, h);
        },
        lchmod(i, o) {
          g.chmod(i, o, true);
        },
        fchmod(i, o) {
          var h = g.getStreamChecked(i);
          g.doChmod(h, h.node, o, false);
        },
        doChown(i, o, h) {
          g.doSetAttr(i, o, {
            timestamp: Date.now(),
            dontFollow: h
          });
        },
        chown(i, o, h, C) {
          var T;
          if (typeof i == "string") {
            var U = g.lookupPath(i, {
              follow: !C
            });
            T = U.node;
          } else T = i;
          g.doChown(null, T, C);
        },
        lchown(i, o, h) {
          g.chown(i, o, h, true);
        },
        fchown(i, o, h) {
          var C = g.getStreamChecked(i);
          g.doChown(C, C.node, false);
        },
        doTruncate(i, o, h) {
          if (g.isDir(o.mode)) throw new g.ErrnoError(31);
          if (!g.isFile(o.mode)) throw new g.ErrnoError(28);
          var C = g.nodePermissions(o, "w");
          if (C) throw new g.ErrnoError(C);
          g.doSetAttr(i, o, {
            size: h,
            timestamp: Date.now()
          });
        },
        truncate(i, o) {
          if (o < 0) throw new g.ErrnoError(28);
          var h;
          if (typeof i == "string") {
            var C = g.lookupPath(i, {
              follow: true
            });
            h = C.node;
          } else h = i;
          g.doTruncate(null, h, o);
        },
        ftruncate(i, o) {
          var h = g.getStreamChecked(i);
          if (o < 0 || !(h.flags & 2097155)) throw new g.ErrnoError(28);
          g.doTruncate(h, h.node, o);
        },
        utime(i, o, h) {
          var C = g.lookupPath(i, {
            follow: true
          }), T = C.node, U = g.checkOpExists(T.node_ops.setattr, 63);
          U(T, {
            atime: o,
            mtime: h
          });
        },
        open(i, o, h = 438) {
          if (i === "") throw new g.ErrnoError(44);
          o = typeof o == "string" ? Mi(o) : o, o & 64 ? h = h & 4095 | 32768 : h = 0;
          var C, T;
          if (typeof i == "object") C = i;
          else {
            T = i.endsWith("/");
            var U = g.lookupPath(i, {
              follow: !(o & 131072),
              noent_okay: true
            });
            C = U.node, i = U.path;
          }
          var L = false;
          if (o & 64) if (C) {
            if (o & 128) throw new g.ErrnoError(20);
          } else {
            if (T) throw new g.ErrnoError(31);
            C = g.mknod(i, h | 511, 0), L = true;
          }
          if (!C) throw new g.ErrnoError(44);
          if (g.isChrdev(C.mode) && (o &= -513), o & 65536 && !g.isDir(C.mode)) throw new g.ErrnoError(54);
          if (!L) {
            var X = g.mayOpen(C, o);
            if (X) throw new g.ErrnoError(X);
          }
          o & 512 && !L && g.truncate(C, 0), o &= -131713;
          var ir = g.createStream({
            node: C,
            path: g.getPath(C),
            flags: o,
            seekable: true,
            position: 0,
            stream_ops: C.stream_ops,
            ungotten: [],
            error: false
          });
          return ir.stream_ops.open && ir.stream_ops.open(ir), L && g.chmod(C, h & 511), t.logReadFiles && !(o & 1) && (i in g.readFiles || (g.readFiles[i] = 1)), ir;
        },
        close(i) {
          if (g.isClosed(i)) throw new g.ErrnoError(8);
          i.getdents && (i.getdents = null);
          try {
            i.stream_ops.close && i.stream_ops.close(i);
          } catch (o) {
            throw o;
          } finally {
            g.closeStream(i.fd);
          }
          i.fd = null;
        },
        isClosed(i) {
          return i.fd === null;
        },
        llseek(i, o, h) {
          if (g.isClosed(i)) throw new g.ErrnoError(8);
          if (!i.seekable || !i.stream_ops.llseek) throw new g.ErrnoError(70);
          if (h != 0 && h != 1 && h != 2) throw new g.ErrnoError(28);
          return i.position = i.stream_ops.llseek(i, o, h), i.ungotten = [], i.position;
        },
        read(i, o, h, C, T) {
          if (M(h >= 0), C < 0 || T < 0) throw new g.ErrnoError(28);
          if (g.isClosed(i)) throw new g.ErrnoError(8);
          if ((i.flags & 2097155) === 1) throw new g.ErrnoError(8);
          if (g.isDir(i.node.mode)) throw new g.ErrnoError(31);
          if (!i.stream_ops.read) throw new g.ErrnoError(28);
          var U = typeof T < "u";
          if (!U) T = i.position;
          else if (!i.seekable) throw new g.ErrnoError(70);
          var L = i.stream_ops.read(i, o, h, C, T);
          return U || (i.position += L), L;
        },
        write(i, o, h, C, T, U) {
          if (M(h >= 0), C < 0 || T < 0) throw new g.ErrnoError(28);
          if (g.isClosed(i)) throw new g.ErrnoError(8);
          if (!(i.flags & 2097155)) throw new g.ErrnoError(8);
          if (g.isDir(i.node.mode)) throw new g.ErrnoError(31);
          if (!i.stream_ops.write) throw new g.ErrnoError(28);
          i.seekable && i.flags & 1024 && g.llseek(i, 0, 2);
          var L = typeof T < "u";
          if (!L) T = i.position;
          else if (!i.seekable) throw new g.ErrnoError(70);
          var X = i.stream_ops.write(i, o, h, C, T, U);
          return L || (i.position += X), X;
        },
        mmap(i, o, h, C, T) {
          if (C & 2 && !(T & 2) && (i.flags & 2097155) !== 2) throw new g.ErrnoError(2);
          if ((i.flags & 2097155) === 1) throw new g.ErrnoError(2);
          if (!i.stream_ops.mmap) throw new g.ErrnoError(43);
          if (!o) throw new g.ErrnoError(28);
          return i.stream_ops.mmap(i, o, h, C, T);
        },
        msync(i, o, h, C, T) {
          return M(h >= 0), i.stream_ops.msync ? i.stream_ops.msync(i, o, h, C, T) : 0;
        },
        ioctl(i, o, h) {
          if (!i.stream_ops.ioctl) throw new g.ErrnoError(59);
          return i.stream_ops.ioctl(i, o, h);
        },
        readFile(i, o = {}) {
          if (o.flags = o.flags || 0, o.encoding = o.encoding || "binary", o.encoding !== "utf8" && o.encoding !== "binary") throw new Error(`Invalid encoding type "${o.encoding}"`);
          var h, C = g.open(i, o.flags), T = g.stat(i), U = T.size, L = new Uint8Array(U);
          return g.read(C, L, 0, U, 0), o.encoding === "utf8" ? h = he(L) : o.encoding === "binary" && (h = L), g.close(C), h;
        },
        writeFile(i, o, h = {}) {
          h.flags = h.flags || 577;
          var C = g.open(i, h.flags, h.mode);
          if (typeof o == "string") {
            var T = new Uint8Array(Re(o) + 1), U = le(o, T, 0, T.length);
            g.write(C, T, 0, U, void 0, h.canOwn);
          } else if (ArrayBuffer.isView(o)) g.write(C, o, 0, o.byteLength, void 0, h.canOwn);
          else throw new Error("Unsupported data type");
          g.close(C);
        },
        cwd: () => g.currentPath,
        chdir(i) {
          var o = g.lookupPath(i, {
            follow: true
          });
          if (o.node === null) throw new g.ErrnoError(44);
          if (!g.isDir(o.node.mode)) throw new g.ErrnoError(54);
          var h = g.nodePermissions(o.node, "x");
          if (h) throw new g.ErrnoError(h);
          g.currentPath = o.path;
        },
        createDefaultDirectories() {
          g.mkdir("/tmp"), g.mkdir("/home"), g.mkdir("/home/web_user");
        },
        createDefaultDevices() {
          g.mkdir("/dev"), g.registerDevice(g.makedev(1, 3), {
            read: () => 0,
            write: (C, T, U, L, X) => L,
            llseek: () => 0
          }), g.mkdev("/dev/null", g.makedev(1, 3)), Ve.register(g.makedev(5, 0), Ve.default_tty_ops), Ve.register(g.makedev(6, 0), Ve.default_tty1_ops), g.mkdev("/dev/tty", g.makedev(5, 0)), g.mkdev("/dev/tty1", g.makedev(6, 0));
          var i = new Uint8Array(1024), o = 0, h = () => (o === 0 && (bn(i), o = i.byteLength), i[--o]);
          g.createDevice("/dev", "random", h), g.createDevice("/dev", "urandom", h), g.mkdir("/dev/shm"), g.mkdir("/dev/shm/tmp");
        },
        createSpecialDirectories() {
          g.mkdir("/proc");
          var i = g.mkdir("/proc/self");
          g.mkdir("/proc/self/fd"), g.mount({
            mount() {
              var o = g.createNode(i, "fd", 16895, 73);
              return o.stream_ops = {
                llseek: wr.stream_ops.llseek
              }, o.node_ops = {
                lookup(h, C) {
                  var T = +C, U = g.getStreamChecked(T), L = {
                    parent: null,
                    mount: {
                      mountpoint: "fake"
                    },
                    node_ops: {
                      readlink: () => U.path
                    },
                    id: T + 1
                  };
                  return L.parent = L, L;
                },
                readdir() {
                  return Array.from(g.streams.entries()).filter(([h, C]) => C).map(([h, C]) => h.toString());
                }
              }, o;
            }
          }, {}, "/proc/self/fd");
        },
        createStandardStreams(i, o, h) {
          i ? g.createDevice("/dev", "stdin", i) : g.symlink("/dev/tty", "/dev/stdin"), o ? g.createDevice("/dev", "stdout", null, o) : g.symlink("/dev/tty", "/dev/stdout"), h ? g.createDevice("/dev", "stderr", null, h) : g.symlink("/dev/tty1", "/dev/stderr");
          var C = g.open("/dev/stdin", 0), T = g.open("/dev/stdout", 1), U = g.open("/dev/stderr", 1);
          M(C.fd === 0, `invalid handle for stdin (${C.fd})`), M(T.fd === 1, `invalid handle for stdout (${T.fd})`), M(U.fd === 2, `invalid handle for stderr (${U.fd})`);
        },
        staticInit() {
          g.nameTable = new Array(4096), g.mount(wr, {}, "/"), g.createDefaultDirectories(), g.createDefaultDevices(), g.createSpecialDirectories(), g.filesystems = {
            MEMFS: wr
          };
        },
        init(i, o, h) {
          M(!g.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), g.initialized = true, i ?? (i = t.stdin), o ?? (o = t.stdout), h ?? (h = t.stderr), g.createStandardStreams(i, o, h);
        },
        quit() {
          g.initialized = false, Yi(0);
          for (var i of g.streams) i && g.close(i);
        },
        findObject(i, o) {
          var h = g.analyzePath(i, o);
          return h.exists ? h.object : null;
        },
        analyzePath(i, o) {
          try {
            var h = g.lookupPath(i, {
              follow: !o
            });
            i = h.path;
          } catch {
          }
          var C = {
            isRoot: false,
            exists: false,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: false,
            parentPath: null,
            parentObject: null
          };
          try {
            var h = g.lookupPath(i, {
              parent: true
            });
            C.parentExists = true, C.parentPath = h.path, C.parentObject = h.node, C.name = Pr.basename(i), h = g.lookupPath(i, {
              follow: !o
            }), C.exists = true, C.path = h.path, C.object = h.node, C.name = h.node.name, C.isRoot = h.path === "/";
          } catch (T) {
            C.error = T.errno;
          }
          return C;
        },
        createPath(i, o, h, C) {
          i = typeof i == "string" ? i : g.getPath(i);
          for (var T = o.split("/").reverse(); T.length; ) {
            var U = T.pop();
            if (U) {
              var L = Pr.join2(i, U);
              try {
                g.mkdir(L);
              } catch (X) {
                if (X.errno != 20) throw X;
              }
              i = L;
            }
          }
          return L;
        },
        createFile(i, o, h, C, T) {
          var U = Pr.join2(typeof i == "string" ? i : g.getPath(i), o), L = Kt(C, T);
          return g.create(U, L);
        },
        createDataFile(i, o, h, C, T, U) {
          var L = o;
          i && (i = typeof i == "string" ? i : g.getPath(i), L = o ? Pr.join2(i, o) : i);
          var X = Kt(C, T), ir = g.create(L, X);
          if (h) {
            if (typeof h == "string") {
              for (var Ar = new Array(h.length), zr = 0, Rr = h.length; zr < Rr; ++zr) Ar[zr] = h.charCodeAt(zr);
              h = Ar;
            }
            g.chmod(ir, X | 146);
            var Sr = g.open(ir, 577);
            g.write(Sr, h, 0, h.length, 0, U), g.close(Sr), g.chmod(ir, X);
          }
        },
        createDevice(i, o, h, C) {
          var _a2;
          var T = Pr.join2(typeof i == "string" ? i : g.getPath(i), o), U = Kt(!!h, !!C);
          (_a2 = g.createDevice).major ?? (_a2.major = 64);
          var L = g.makedev(g.createDevice.major++, 0);
          return g.registerDevice(L, {
            open(X) {
              X.seekable = false;
            },
            close(X) {
              var _a3;
              ((_a3 = C == null ? void 0 : C.buffer) == null ? void 0 : _a3.length) && C(10);
            },
            read(X, ir, Ar, zr, Rr) {
              for (var Sr = 0, Dr = 0; Dr < zr; Dr++) {
                var _r;
                try {
                  _r = h();
                } catch {
                  throw new g.ErrnoError(29);
                }
                if (_r === void 0 && Sr === 0) throw new g.ErrnoError(6);
                if (_r == null) break;
                Sr++, ir[Ar + Dr] = _r;
              }
              return Sr && (X.node.atime = Date.now()), Sr;
            },
            write(X, ir, Ar, zr, Rr) {
              for (var Sr = 0; Sr < zr; Sr++) try {
                C(ir[Ar + Sr]);
              } catch {
                throw new g.ErrnoError(29);
              }
              return zr && (X.node.mtime = X.node.ctime = Date.now()), Sr;
            }
          }), g.mkdev(T, U, L);
        },
        forceLoadFile(i) {
          if (i.isDevice || i.isFolder || i.link || i.contents) return true;
          if (typeof XMLHttpRequest < "u") throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          try {
            i.contents = E(i.url), i.usedBytes = i.contents.length;
          } catch {
            throw new g.ErrnoError(29);
          }
        },
        createLazyFile(i, o, h, C, T) {
          class U {
            constructor() {
              __publicField(this, "lengthKnown", false);
              __publicField(this, "chunks", []);
            }
            get(Dr) {
              if (!(Dr > this.length - 1 || Dr < 0)) {
                var _r = Dr % this.chunkSize, re = Dr / this.chunkSize | 0;
                return this.getter(re)[_r];
              }
            }
            setDataGetter(Dr) {
              this.getter = Dr;
            }
            cacheLength() {
              var Dr = new XMLHttpRequest();
              if (Dr.open("HEAD", h, false), Dr.send(null), !(Dr.status >= 200 && Dr.status < 300 || Dr.status === 304)) throw new Error("Couldn't load " + h + ". Status: " + Dr.status);
              var _r = Number(Dr.getResponseHeader("Content-length")), re, xe = (re = Dr.getResponseHeader("Accept-Ranges")) && re === "bytes", ge = (re = Dr.getResponseHeader("Content-Encoding")) && re === "gzip", _e = 1024 * 1024;
              xe || (_e = _r);
              var Ne = (Ie, rt) => {
                if (Ie > rt) throw new Error("invalid range (" + Ie + ", " + rt + ") or no bytes requested!");
                if (rt > _r - 1) throw new Error("only " + _r + " bytes available! programmer error!");
                var ee = new XMLHttpRequest();
                if (ee.open("GET", h, false), _r !== _e && ee.setRequestHeader("Range", "bytes=" + Ie + "-" + rt), ee.responseType = "arraybuffer", ee.overrideMimeType && ee.overrideMimeType("text/plain; charset=x-user-defined"), ee.send(null), !(ee.status >= 200 && ee.status < 300 || ee.status === 304)) throw new Error("Couldn't load " + h + ". Status: " + ee.status);
                return ee.response !== void 0 ? new Uint8Array(ee.response || []) : _n(ee.responseText || "");
              }, lt = this;
              lt.setDataGetter((Ie) => {
                var rt = Ie * _e, ee = (Ie + 1) * _e - 1;
                if (ee = Math.min(ee, _r - 1), typeof lt.chunks[Ie] > "u" && (lt.chunks[Ie] = Ne(rt, ee)), typeof lt.chunks[Ie] > "u") throw new Error("doXHR failed!");
                return lt.chunks[Ie];
              }), (ge || !_r) && (_e = _r = 1, _r = this.getter(0).length, _e = _r, _("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = _r, this._chunkSize = _e, this.lengthKnown = true;
            }
            get length() {
              return this.lengthKnown || this.cacheLength(), this._length;
            }
            get chunkSize() {
              return this.lengthKnown || this.cacheLength(), this._chunkSize;
            }
          }
          if (typeof XMLHttpRequest < "u") {
            if (!v) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var L = new U(), X = {
              isDevice: false,
              contents: L
            };
          } else var X = {
            isDevice: false,
            url: h
          };
          var ir = g.createFile(i, o, X, C, T);
          X.contents ? ir.contents = X.contents : X.url && (ir.contents = null, ir.url = X.url), Object.defineProperties(ir, {
            usedBytes: {
              get: function() {
                return this.contents.length;
              }
            }
          });
          var Ar = {}, zr = Object.keys(ir.stream_ops);
          zr.forEach((Sr) => {
            var Dr = ir.stream_ops[Sr];
            Ar[Sr] = (..._r) => (g.forceLoadFile(ir), Dr(..._r));
          });
          function Rr(Sr, Dr, _r, re, xe) {
            var ge = Sr.node.contents;
            if (xe >= ge.length) return 0;
            var _e = Math.min(ge.length - xe, re);
            if (M(_e >= 0), ge.slice) for (var Ne = 0; Ne < _e; Ne++) Dr[_r + Ne] = ge[xe + Ne];
            else for (var Ne = 0; Ne < _e; Ne++) Dr[_r + Ne] = ge.get(xe + Ne);
            return _e;
          }
          return Ar.read = (Sr, Dr, _r, re, xe) => (g.forceLoadFile(ir), Rr(Sr, Dr, _r, re, xe)), Ar.mmap = (Sr, Dr, _r, re, xe) => {
            g.forceLoadFile(ir);
            var ge = Cn();
            if (!ge) throw new g.ErrnoError(48);
            return Rr(Sr, O, ge, Dr, _r), {
              ptr: ge,
              allocated: true
            };
          }, ir.stream_ops = Ar, ir;
        },
        absolutePath() {
          dr("FS.absolutePath has been removed; use PATH_FS.resolve instead");
        },
        createFolder() {
          dr("FS.createFolder has been removed; use FS.mkdir instead");
        },
        createLink() {
          dr("FS.createLink has been removed; use FS.symlink instead");
        },
        joinPath() {
          dr("FS.joinPath has been removed; use PATH.join instead");
        },
        mmapAlloc() {
          dr("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
        },
        standardizePath() {
          dr("FS.standardizePath has been removed; use PATH.normalize instead");
        }
      }, ft = {
        DEFAULT_POLLMASK: 5,
        calculateAt(i, o, h) {
          if (Pr.isAbs(o)) return o;
          var C;
          if (i === -100) C = g.cwd();
          else {
            var T = ft.getStreamFromFD(i);
            C = T.path;
          }
          if (o.length == 0) {
            if (!h) throw new g.ErrnoError(44);
            return C;
          }
          return C + "/" + o;
        },
        writeStat(i, o) {
          $[i >> 2] = o.dev, $[i + 4 >> 2] = o.mode, z[i + 8 >> 2] = o.nlink, $[i + 12 >> 2] = o.uid, $[i + 16 >> 2] = o.gid, $[i + 20 >> 2] = o.rdev, V[i + 24 >> 3] = BigInt(o.size), $[i + 32 >> 2] = 4096, $[i + 36 >> 2] = o.blocks;
          var h = o.atime.getTime(), C = o.mtime.getTime(), T = o.ctime.getTime();
          return V[i + 40 >> 3] = BigInt(Math.floor(h / 1e3)), z[i + 48 >> 2] = h % 1e3 * 1e3 * 1e3, V[i + 56 >> 3] = BigInt(Math.floor(C / 1e3)), z[i + 64 >> 2] = C % 1e3 * 1e3 * 1e3, V[i + 72 >> 3] = BigInt(Math.floor(T / 1e3)), z[i + 80 >> 2] = T % 1e3 * 1e3 * 1e3, V[i + 88 >> 3] = BigInt(o.ino), 0;
        },
        writeStatFs(i, o) {
          $[i + 4 >> 2] = o.bsize, $[i + 40 >> 2] = o.bsize, $[i + 8 >> 2] = o.blocks, $[i + 12 >> 2] = o.bfree, $[i + 16 >> 2] = o.bavail, $[i + 20 >> 2] = o.files, $[i + 24 >> 2] = o.ffree, $[i + 28 >> 2] = o.fsid, $[i + 44 >> 2] = o.flags, $[i + 36 >> 2] = o.namelen;
        },
        doMsync(i, o, h, C, T) {
          if (!g.isFile(o.node.mode)) throw new g.ErrnoError(43);
          if (C & 2) return 0;
          var U = P.slice(i, i + h);
          g.msync(o, U, T, h, C);
        },
        getStreamFromFD(i) {
          var o = g.getStreamChecked(i);
          return o;
        },
        varargs: void 0,
        getStr(i) {
          var o = De(i);
          return o;
        }
      };
      function Ni(i) {
        try {
          var o = ft.getStreamFromFD(i);
          return g.close(o), 0;
        } catch (h) {
          if (typeof g > "u" || h.name !== "ErrnoError") throw h;
          return h.errno;
        }
      }
      var Ti = (i, o, h, C) => {
        for (var T = 0, U = 0; U < h; U++) {
          var L = z[o >> 2], X = z[o + 4 >> 2];
          o += 8;
          var ir = g.read(i, O, L, X, C);
          if (ir < 0) return -1;
          if (T += ir, ir < X) break;
        }
        return T;
      };
      function Oi(i, o, h, C) {
        try {
          var T = ft.getStreamFromFD(i), U = Ti(T, o, h);
          return z[C >> 2] = U, 0;
        } catch (L) {
          if (typeof g > "u" || L.name !== "ErrnoError") throw L;
          return L.errno;
        }
      }
      var Pi = 9007199254740992, zi = -9007199254740992, Ri = (i) => i < zi || i > Pi ? NaN : Number(i);
      function Ii(i, o, h, C) {
        o = Ri(o);
        try {
          if (isNaN(o)) return 61;
          var T = ft.getStreamFromFD(i);
          return g.llseek(T, o, h), V[C >> 3] = BigInt(T.position), T.getdents && o === 0 && h === 0 && (T.getdents = null), 0;
        } catch (U) {
          if (typeof g > "u" || U.name !== "ErrnoError") throw U;
          return U.errno;
        }
      }
      var Ui = (i, o, h, C) => {
        for (var T = 0, U = 0; U < h; U++) {
          var L = z[o >> 2], X = z[o + 4 >> 2];
          o += 8;
          var ir = g.write(i, O, L, X, C);
          if (ir < 0) return -1;
          if (T += ir, ir < X) break;
        }
        return T;
      };
      function $i(i, o, h, C) {
        try {
          var T = ft.getStreamFromFD(i), U = Ui(T, o, h);
          return z[C >> 2] = U, 0;
        } catch (L) {
          if (typeof g > "u" || L.name !== "ErrnoError") throw L;
          return L.errno;
        }
      }
      g.createPreloadedFile = Bi, g.staticInit(), t.noExitRuntime && t.noExitRuntime, t.preloadPlugins && (Sn = t.preloadPlugins), t.print && (_ = t.print), t.printErr && (F = t.printErr), t.wasmBinary && (N = t.wasmBinary), ki(), t.arguments && t.arguments, t.thisProgram && (y = t.thisProgram), M(typeof t.memoryInitializerPrefixURL > "u", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), M(typeof t.pthreadMainPrefixURL > "u", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), M(typeof t.cdInitializerPrefixURL > "u", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), M(typeof t.filePackagePrefixURL > "u", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"), M(typeof t.read > "u", "Module.read option was removed"), M(typeof t.readAsync > "u", "Module.readAsync option was removed (modify readAsync in JS)"), M(typeof t.readBinary > "u", "Module.readBinary option was removed (modify readBinary in JS)"), M(typeof t.setWindowTitle > "u", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)"), M(typeof t.TOTAL_MEMORY > "u", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"), M(typeof t.ENVIRONMENT > "u", "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"), M(typeof t.STACK_SIZE > "u", "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time"), M(typeof t.wasmMemory > "u", "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"), M(typeof t.INITIAL_MEMORY > "u", "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
      var Li = [
        "writeI53ToI64",
        "writeI53ToI64Clamped",
        "writeI53ToI64Signaling",
        "writeI53ToU64Clamped",
        "writeI53ToU64Signaling",
        "readI53FromI64",
        "readI53FromU64",
        "convertI32PairToI53",
        "convertI32PairToI53Checked",
        "convertU32PairToI53",
        "stackAlloc",
        "getTempRet0",
        "setTempRet0",
        "zeroMemory",
        "exitJS",
        "inetPton4",
        "inetNtop4",
        "inetPton6",
        "inetNtop6",
        "readSockaddr",
        "writeSockaddr",
        "emscriptenLog",
        "readEmAsmArgs",
        "jstoi_q",
        "listenOnce",
        "autoResumeAudioContext",
        "getDynCaller",
        "dynCall",
        "handleException",
        "keepRuntimeAlive",
        "runtimeKeepalivePush",
        "runtimeKeepalivePop",
        "callUserCallback",
        "maybeExit",
        "asmjsMangle",
        "HandleAllocator",
        "getNativeTypeSize",
        "addOnInit",
        "addOnPostCtor",
        "addOnPreMain",
        "addOnExit",
        "STACK_SIZE",
        "STACK_ALIGN",
        "POINTER_SIZE",
        "ASSERTIONS",
        "getCFunc",
        "ccall",
        "cwrap",
        "uleb128Encode",
        "sigToWasmTypes",
        "generateFuncType",
        "convertJsFunctionToWasm",
        "getEmptyTableSlot",
        "updateTableMap",
        "getFunctionAddress",
        "addFunction",
        "removeFunction",
        "reallyNegative",
        "unSign",
        "strLen",
        "reSign",
        "formatString",
        "intArrayToString",
        "AsciiToString",
        "stringToAscii",
        "UTF16ToString",
        "stringToUTF16",
        "lengthBytesUTF16",
        "UTF32ToString",
        "stringToUTF32",
        "lengthBytesUTF32",
        "stringToNewUTF8",
        "stringToUTF8OnStack",
        "writeArrayToMemory",
        "registerKeyEventCallback",
        "maybeCStringToJsString",
        "findEventTarget",
        "getBoundingClientRect",
        "fillMouseEventData",
        "registerMouseEventCallback",
        "registerWheelEventCallback",
        "registerUiEventCallback",
        "registerFocusEventCallback",
        "fillDeviceOrientationEventData",
        "registerDeviceOrientationEventCallback",
        "fillDeviceMotionEventData",
        "registerDeviceMotionEventCallback",
        "screenOrientation",
        "fillOrientationChangeEventData",
        "registerOrientationChangeEventCallback",
        "fillFullscreenChangeEventData",
        "registerFullscreenChangeEventCallback",
        "JSEvents_requestFullscreen",
        "JSEvents_resizeCanvasForFullscreen",
        "registerRestoreOldStyle",
        "hideEverythingExceptGivenElement",
        "restoreHiddenElements",
        "setLetterbox",
        "softFullscreenResizeWebGLRenderTarget",
        "doRequestFullscreen",
        "fillPointerlockChangeEventData",
        "registerPointerlockChangeEventCallback",
        "registerPointerlockErrorEventCallback",
        "requestPointerLock",
        "fillVisibilityChangeEventData",
        "registerVisibilityChangeEventCallback",
        "registerTouchEventCallback",
        "fillGamepadEventData",
        "registerGamepadEventCallback",
        "registerBeforeUnloadEventCallback",
        "fillBatteryEventData",
        "battery",
        "registerBatteryEventCallback",
        "setCanvasElementSize",
        "getCanvasElementSize",
        "jsStackTrace",
        "getCallstack",
        "convertPCtoSourceLocation",
        "checkWasiClock",
        "wasiRightsToMuslOFlags",
        "wasiOFlagsToMuslOFlags",
        "safeSetTimeout",
        "setImmediateWrapped",
        "safeRequestAnimationFrame",
        "clearImmediateWrapped",
        "registerPostMainLoop",
        "registerPreMainLoop",
        "getPromise",
        "makePromise",
        "idsToPromises",
        "makePromiseCallback",
        "findMatchingCatch",
        "Browser_asyncPrepareDataCounter",
        "isLeapYear",
        "ydayFromDate",
        "arraySum",
        "addDays",
        "getSocketFromFD",
        "getSocketAddress",
        "FS_unlink",
        "FS_mkdirTree",
        "_setNetworkCallback",
        "heapObjectForWebGLType",
        "toTypedArrayIndex",
        "webgl_enable_ANGLE_instanced_arrays",
        "webgl_enable_OES_vertex_array_object",
        "webgl_enable_WEBGL_draw_buffers",
        "webgl_enable_WEBGL_multi_draw",
        "webgl_enable_EXT_polygon_offset_clamp",
        "webgl_enable_EXT_clip_control",
        "webgl_enable_WEBGL_polygon_mode",
        "emscriptenWebGLGet",
        "computeUnpackAlignedImageSize",
        "colorChannelsInGlTextureFormat",
        "emscriptenWebGLGetTexPixelData",
        "emscriptenWebGLGetUniform",
        "webglGetUniformLocation",
        "webglPrepareUniformLocationsBeforeFirstUse",
        "webglGetLeftBracePos",
        "emscriptenWebGLGetVertexAttrib",
        "__glGetActiveAttribOrUniform",
        "writeGLArray",
        "registerWebGlEventCallback",
        "runAndAbortIfError",
        "ALLOC_NORMAL",
        "ALLOC_STACK",
        "allocate",
        "writeStringToMemory",
        "writeAsciiToMemory",
        "demangle",
        "stackTrace"
      ];
      Li.forEach(K);
      var qi = [
        "run",
        "addRunDependency",
        "removeRunDependency",
        "out",
        "err",
        "callMain",
        "abort",
        "wasmMemory",
        "wasmExports",
        "HEAPF32",
        "HEAP8",
        "HEAP16",
        "HEAPU16",
        "HEAP32",
        "HEAP64",
        "HEAPU64",
        "writeStackCookie",
        "checkStackCookie",
        "INT53_MAX",
        "INT53_MIN",
        "bigintToI53Checked",
        "stackSave",
        "stackRestore",
        "ptrToString",
        "getHeapMax",
        "growMemory",
        "ENV",
        "ERRNO_CODES",
        "strError",
        "DNS",
        "Protocols",
        "Sockets",
        "timers",
        "warnOnce",
        "readEmAsmArgsArray",
        "jstoi_s",
        "getExecutableName",
        "asyncLoad",
        "alignMemory",
        "mmapAlloc",
        "wasmTable",
        "noExitRuntime",
        "addOnPreRun",
        "addOnPostRun",
        "freeTableIndexes",
        "functionsInTableMap",
        "setValue",
        "getValue",
        "PATH",
        "PATH_FS",
        "UTF8Decoder",
        "UTF8ArrayToString",
        "UTF8ToString",
        "stringToUTF8Array",
        "stringToUTF8",
        "lengthBytesUTF8",
        "intArrayFromString",
        "UTF16Decoder",
        "JSEvents",
        "specialHTMLTargets",
        "findCanvasEventTarget",
        "currentFullscreenStrategy",
        "restoreOldWindowedStyle",
        "UNWIND_CACHE",
        "ExitStatus",
        "getEnvStrings",
        "doReadv",
        "doWritev",
        "initRandomFill",
        "randomFill",
        "emSetImmediate",
        "emClearImmediate_deps",
        "emClearImmediate",
        "promiseMap",
        "uncaughtExceptionCount",
        "exceptionLast",
        "exceptionCaught",
        "ExceptionInfo",
        "Browser",
        "getPreloadedImageData__data",
        "wget",
        "MONTH_DAYS_REGULAR",
        "MONTH_DAYS_LEAP",
        "MONTH_DAYS_REGULAR_CUMULATIVE",
        "MONTH_DAYS_LEAP_CUMULATIVE",
        "SYSCALLS",
        "preloadPlugins",
        "FS_createPreloadedFile",
        "FS_modeStringToFlags",
        "FS_getMode",
        "FS_stdin_getChar_buffer",
        "FS_stdin_getChar",
        "FS_createPath",
        "FS_createDevice",
        "FS_readFile",
        "FS",
        "FS_createDataFile",
        "FS_createLazyFile",
        "MEMFS",
        "TTY",
        "PIPEFS",
        "SOCKFS",
        "tempFixedLengthArray",
        "miniTempWebGLFloatBuffers",
        "miniTempWebGLIntBuffers",
        "GL",
        "AL",
        "GLUT",
        "EGL",
        "GLEW",
        "IDBStore",
        "SDL",
        "SDL_gfx",
        "allocateUTF8",
        "allocateUTF8OnStack",
        "print",
        "printErr"
      ];
      qi.forEach(J);
      function ki() {
        j("fetchSettings");
      }
      var Mn = {
        __assert_fail: Ae,
        __cxa_throw: Me,
        _abort_js: Fe,
        _tzset_js: Vt,
        emscripten_resize_heap: ce,
        environ_get: Tr,
        environ_sizes_get: st,
        fd_close: Ni,
        fd_read: Oi,
        fd_seek: Ii,
        fd_write: $i
      }, be = await Se();
      t._deform = br("deform", 43), t._malloc = br("malloc", 1), t._free = br("free", 1);
      var Yi = br("fflush", 1), Wi = br("strerror", 1), xn = be.emscripten_stack_get_end;
      be.emscripten_stack_get_base;
      var Xi = be.emscripten_stack_init;
      be.emscripten_stack_get_free, be._emscripten_stack_restore, be._emscripten_stack_alloc, be.emscripten_stack_get_current;
      var Nn;
      function Gi() {
        Xi(), I();
      }
      function Qt() {
        if (ar > 0) {
          er = Qt;
          return;
        }
        if (Gi(), Z(), ar > 0) {
          er = Qt;
          return;
        }
        function i() {
          var _a2;
          M(!Nn), Nn = true, t.calledRun = true, !b && (H(), n(t), (_a2 = t.onRuntimeInitialized) == null ? void 0 : _a2.call(t), Q("onRuntimeInitialized"), M(!t._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), tr());
        }
        t.setStatus ? (t.setStatus("Running..."), setTimeout(() => {
          setTimeout(() => t.setStatus(""), 1), i();
        }, 1)) : i(), R();
      }
      function Vi() {
        if (t.preInit) for (typeof t.preInit == "function" && (t.preInit = [
          t.preInit
        ]); t.preInit.length > 0; ) t.preInit.shift()();
        Q("preInit");
      }
      Vi(), Qt(), a = f;
      for (const i of Object.keys(t)) i in e || Object.defineProperty(e, i, {
        configurable: true,
        get() {
          dr(`Access to module property ('${i}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
        }
      });
      return a;
    };
  })();
  const Gr = await Sc();
  xc = function(r, e, a, t) {
    if (r.length === 0) return;
    const n = [], u = Le(r.flat(), Float64Array, Gr.HEAPF64);
    n.push(u);
    const f = e.flat(), m = Le(f, Uint32Array, Gr.HEAPU32);
    n.push(m);
    const v = e.map((k) => k.length), c = Le(v, Uint32Array, Gr.HEAPU32);
    n.push(c);
    const l = a.supports ? Array.from(a.supports.keys()) : [], d = a.supports ? Array.from(a.supports.values()).flat().map((k) => k ? 1 : 0) : [], y = Le(l, Uint32Array, Gr.HEAPU32);
    n.push(y);
    const p = Le(d, Uint8Array, Gr.HEAPU8);
    n.push(p);
    const D = a.loads ? Array.from(a.loads.keys()) : [], s = a.loads ? Array.from(a.loads.values()).flat() : [], E = Le(D, Uint32Array, Gr.HEAPU32);
    n.push(E);
    const w = Le(s, Float64Array, Gr.HEAPF64);
    n.push(w);
    const B = (k) => {
      const K = k ? Array.from(k.keys()) : [], J = k ? Array.from(k.values()) : [], G = Le(K, Uint32Array, Gr.HEAPU32);
      n.push(G);
      const Z = Le(J, Float64Array, Gr.HEAPF64);
      return n.push(Z), {
        keysPtr: G,
        valuesPtr: Z,
        size: K.length
      };
    }, A = B(t.elasticities), x = B(t.elasticitiesOrthogonal), _ = B(t.areas), F = B(t.momentsOfInertiaZ), N = B(t.momentsOfInertiaY), S = B(t.shearModuli), b = B(t.torsionalConstants), M = B(t.thicknesses), O = B(t.poissonsRatios), P = Gr._malloc(4);
    n.push(P);
    const $ = Gr._malloc(4);
    n.push($);
    const z = Gr._malloc(4);
    n.push(z);
    const V = Gr._malloc(4);
    n.push(V), Gr._deform(u, r.length, m, f.length, c, e.length, y, p, l.length, E, w, D.length, A.keysPtr, A.valuesPtr, A.size, _.keysPtr, _.valuesPtr, _.size, F.keysPtr, F.valuesPtr, F.size, N.keysPtr, N.valuesPtr, N.size, S.keysPtr, S.valuesPtr, S.size, b.keysPtr, b.valuesPtr, b.size, M.keysPtr, M.valuesPtr, M.size, O.keysPtr, O.valuesPtr, O.size, x.keysPtr, x.valuesPtr, x.size, P, $, z, V);
    const Y = Gr.HEAPU32[P / 4], rr = Gr.HEAPU32[$ / 4], I = Gr.HEAPU32[z / 4], R = Gr.HEAPU32[V / 4], Q = new Float64Array(Gr.HEAPF64.buffer, Y, rr), j = new Float64Array(Gr.HEAPF64.buffer, I, R), q = /* @__PURE__ */ new Map();
    for (let k = 0; k < rr; k += 7) {
      const K = Q[k];
      q.set(K, Array.from(Q.slice(k + 1, k + 7)));
    }
    const W = /* @__PURE__ */ new Map();
    for (let k = 0; k < R; k += 7) {
      const K = j[k];
      W.set(K, Array.from(j.slice(k + 1, k + 7)));
    }
    return Y && n.push(Y), I && n.push(I), n.forEach((k) => Gr._free(k)), {
      deformations: q,
      reactions: W
    };
  };
  function Le(r, e, a) {
    const t = new e(r), n = Gr._malloc(t.length * t.BYTES_PER_ELEMENT);
    return a.set(t, n / t.BYTES_PER_ELEMENT), n;
  }
})();
export {
  __tla,
  Mc as a,
  xc as d
};
