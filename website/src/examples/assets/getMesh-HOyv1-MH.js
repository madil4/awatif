import { _ as Tu } from "./__vite-browser-external-D7Ct-6yo.js";
import { _ as Qe, t as Ie, D as It, C as zr } from "./complex-i8qiIvCl.js";
let ul;
let __tla = (async () => {
  function zu(r) {
    return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
  }
  function Ou(r) {
    if (r.__esModule) return r;
    var e = r.default;
    if (typeof e == "function") {
      var u = function n() {
        return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
      };
      u.prototype = e.prototype;
    } else u = {};
    return Object.defineProperty(u, "__esModule", {
      value: true
    }), Object.keys(r).forEach(function(n) {
      var t = Object.getOwnPropertyDescriptor(r, n);
      Object.defineProperty(u, n, t.get ? t : {
        enumerable: true,
        get: function() {
          return r[n];
        }
      });
    }), u;
  }
  const ut = Ou(Tu);
  var In = {
    relTol: 1e-12,
    absTol: 1e-15,
    matrix: "Matrix",
    number: "number",
    numberFallback: "number",
    precision: 64,
    predictable: false,
    randomSeed: null
  };
  function $u(r, e) {
    if (Re(r, e)) return r[e];
    throw typeof r[e] == "function" && Ru(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
  }
  function Iu(r, e, u) {
    if (Re(r, e)) return r[e] = u, u;
    throw new Error('No access to property "' + e + '"');
  }
  function Re(r, e) {
    return !qu(r) && !Array.isArray(r) ? false : Fe(Pu, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function Ru(r, e) {
    return r == null || typeof r[e] != "function" || Fe(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : Fe(Uu, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function qu(r) {
    return typeof r == "object" && r && r.constructor === Object;
  }
  var Pu = {
    length: true,
    name: true
  }, Uu = {
    toString: true,
    valueOf: true,
    toLocaleString: true
  };
  class Lu {
    constructor(e) {
      this.wrappedObject = e, this[Symbol.iterator] = this.entries;
    }
    keys() {
      return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
    }
    get(e) {
      return $u(this.wrappedObject, e);
    }
    set(e, u) {
      return Iu(this.wrappedObject, e, u), this;
    }
    has(e) {
      return Re(this.wrappedObject, e) && e in this.wrappedObject;
    }
    entries() {
      return Wu(this.keys(), (e) => [
        e,
        this.get(e)
      ]);
    }
    forEach(e) {
      for (var u of this.keys()) e(this.get(u), u, this);
    }
    delete(e) {
      Re(this.wrappedObject, e) && delete this.wrappedObject[e];
    }
    clear() {
      for (var e of this.keys()) this.delete(e);
    }
    get size() {
      return Object.keys(this.wrappedObject).length;
    }
  }
  function Wu(r, e) {
    return {
      next: () => {
        var u = r.next();
        return u.done ? u : {
          value: e(u.value),
          done: false
        };
      }
    };
  }
  function yr(r) {
    return typeof r == "number";
  }
  function _r(r) {
    return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
  }
  function Vu(r) {
    return typeof r == "bigint";
  }
  function Dt(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
  }
  function pt(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
  }
  function Rn(r) {
    return r && r.constructor.prototype.isUnit === true || false;
  }
  function Yr(r) {
    return typeof r == "string";
  }
  var br = Array.isArray;
  function mr(r) {
    return r && r.constructor.prototype.isMatrix === true || false;
  }
  function qe(r) {
    return Array.isArray(r) || mr(r);
  }
  function qn(r) {
    return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function Pn(r) {
    return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function Un(r) {
    return r && r.constructor.prototype.isRange === true || false;
  }
  function dt(r) {
    return r && r.constructor.prototype.isIndex === true || false;
  }
  function Zu(r) {
    return typeof r == "boolean";
  }
  function Gu(r) {
    return r && r.constructor.prototype.isResultSet === true || false;
  }
  function Ju(r) {
    return r && r.constructor.prototype.isHelp === true || false;
  }
  function Qu(r) {
    return typeof r == "function";
  }
  function Yu(r) {
    return r instanceof Date;
  }
  function Xu(r) {
    return r instanceof RegExp;
  }
  function ht(r) {
    return !!(r && typeof r == "object" && r.constructor === Object && !Dt(r) && !pt(r));
  }
  function Ku(r) {
    return r ? r instanceof Map || r instanceof Lu || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
  }
  function Hu(r) {
    return r === null;
  }
  function ku(r) {
    return r === void 0;
  }
  function ju(r) {
    return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function ra(r) {
    return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
  }
  function ea(r) {
    return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function ta(r) {
    return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
  }
  function na(r) {
    return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function ua(r) {
    return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
  }
  function aa(r) {
    return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function ia(r) {
    return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
  }
  function oa(r) {
    return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
  }
  function sa(r) {
    return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
  }
  function fa(r) {
    return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
  }
  function la(r) {
    return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function ca(r) {
    return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
  }
  function va(r) {
    return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Da(r) {
    return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function pa(r) {
    return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
  }
  function da(r) {
    return r && r.constructor.prototype.isChain === true || false;
  }
  function Xr(r) {
    var e = typeof r;
    return e === "object" ? r === null ? "null" : _r(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
  }
  function fr(r) {
    var e = typeof r;
    if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
    if (typeof r.clone == "function") return r.clone();
    if (Array.isArray(r)) return r.map(function(u) {
      return fr(u);
    });
    if (r instanceof Date) return new Date(r.valueOf());
    if (_r(r)) return r;
    if (ht(r)) return ha(r, fr);
    if (e === "function") return r;
    throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
  }
  function ha(r, e) {
    var u = {};
    for (var n in r) Fe(r, n) && (u[n] = e(r[n]));
    return u;
  }
  function Ln(r, e) {
    for (var u in e) Fe(e, u) && (r[u] = e[u]);
    return r;
  }
  function te(r, e) {
    var u, n, t;
    if (Array.isArray(r)) {
      if (!Array.isArray(e) || r.length !== e.length) return false;
      for (n = 0, t = r.length; n < t; n++) if (!te(r[n], e[n])) return false;
      return true;
    } else {
      if (typeof r == "function") return r === e;
      if (r instanceof Object) {
        if (Array.isArray(e) || !(e instanceof Object)) return false;
        for (u in r) if (!(u in e) || !te(r[u], e[u])) return false;
        for (u in e) if (!(u in r)) return false;
        return true;
      } else return r === e;
    }
  }
  function Fe(r, e) {
    return r && Object.hasOwnProperty.call(r, e);
  }
  function ma(r, e) {
    for (var u = {}, n = 0; n < e.length; n++) {
      var t = e[n], a = r[t];
      a !== void 0 && (u[t] = a);
    }
    return u;
  }
  var ga = [
    "Matrix",
    "Array"
  ], ya = [
    "number",
    "BigNumber",
    "Fraction"
  ], qr = function(e) {
    if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
    return Object.freeze(In);
  };
  Qe(qr, In, {
    MATRIX_OPTIONS: ga,
    NUMBER_OPTIONS: ya
  });
  function Y(r, e, u, n) {
    function t(a) {
      var s = ma(a, e.map(Ea));
      return Aa(r, e, a), u(s);
    }
    return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), n && (t.meta = n), t;
  }
  function Aa(r, e, u) {
    var n = e.filter((a) => !Fa(a)).every((a) => u[a] !== void 0);
    if (!n) {
      var t = e.filter((a) => u[a] === void 0);
      throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
    }
  }
  function Fa(r) {
    return r && r[0] === "?";
  }
  function Ea(r) {
    return r && r[0] === "?" ? r.slice(1) : r;
  }
  function Ar(r) {
    return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
  }
  var wa = Math.sign || function(r) {
    return r > 0 ? 1 : r < 0 ? -1 : 0;
  };
  function at(r, e, u) {
    var n = {
      2: "0b",
      8: "0o",
      16: "0x"
    }, t = n[e], a = "";
    if (u) {
      if (u < 1) throw new Error("size must be in greater than 0");
      if (!Ar(u)) throw new Error("size must be an integer");
      if (r > 2 ** (u - 1) - 1 || r < -(2 ** (u - 1))) throw new Error("Value must be in range [-2^".concat(u - 1, ", 2^").concat(u - 1, "-1]"));
      if (!Ar(r)) throw new Error("Value must be an integer");
      r < 0 && (r = r + 2 ** u), a = "i".concat(u);
    }
    var s = "";
    return r < 0 && (r = -r, s = "-"), "".concat(s).concat(t).concat(r.toString(e)).concat(a);
  }
  function ot(r, e) {
    if (typeof e == "function") return e(r);
    if (r === 1 / 0) return "Infinity";
    if (r === -1 / 0) return "-Infinity";
    if (isNaN(r)) return "NaN";
    var { notation: u, precision: n, wordSize: t } = Wn(e);
    switch (u) {
      case "fixed":
        return Ca(r, n);
      case "exponential":
        return Vn(r, n);
      case "engineering":
        return ba(r, n);
      case "bin":
        return at(r, 2, t);
      case "oct":
        return at(r, 8, t);
      case "hex":
        return at(r, 16, t);
      case "auto":
        return _a(r, n, e).replace(/((\.\d*?)(0+))($|e)/, function() {
          var a = arguments[2], s = arguments[4];
          return a !== "." ? a + s : s;
        });
      default:
        throw new Error('Unknown notation "' + u + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function Wn(r) {
    var e = "auto", u, n;
    if (r !== void 0) if (yr(r)) u = r;
    else if (_r(r)) u = r.toNumber();
    else if (ht(r)) r.precision !== void 0 && (u = Rt(r.precision, () => {
      throw new Error('Option "precision" must be a number or BigNumber');
    })), r.wordSize !== void 0 && (n = Rt(r.wordSize, () => {
      throw new Error('Option "wordSize" must be a number or BigNumber');
    })), r.notation && (e = r.notation);
    else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
    return {
      notation: e,
      precision: u,
      wordSize: n
    };
  }
  function Ye(r) {
    var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
    if (!e) throw new SyntaxError("Invalid number " + r);
    var u = e[1], n = e[2], t = parseFloat(e[4] || "0"), a = n.indexOf(".");
    t += a !== -1 ? a - 1 : n.length - 1;
    var s = n.replace(".", "").replace(/^0*/, function(D) {
      return t -= D.length, "";
    }).replace(/0*$/, "").split("").map(function(D) {
      return parseInt(D);
    });
    return s.length === 0 && (s.push(0), t++), {
      sign: u,
      coefficients: s,
      exponent: t
    };
  }
  function ba(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var u = Ye(r), n = Xe(u, e), t = n.exponent, a = n.coefficients, s = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
    if (yr(e)) for (; e > a.length || t - s + 1 > a.length; ) a.push(0);
    else for (var D = Math.abs(t - s) - (a.length - 1), f = 0; f < D; f++) a.push(0);
    for (var c = Math.abs(t - s), o = 1; c > 0; ) o++, c--;
    var l = a.slice(o).join(""), g = yr(e) && l.length || l.match(/[1-9]/) ? "." + l : "", v = a.slice(0, o).join("") + g + "e" + (t >= 0 ? "+" : "") + s.toString();
    return n.sign + v;
  }
  function Ca(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var u = Ye(r), n = typeof e == "number" ? Xe(u, u.exponent + 1 + e) : u, t = n.coefficients, a = n.exponent + 1, s = a + (e || 0);
    return t.length < s && (t = t.concat(De(s - t.length))), a < 0 && (t = De(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), n.sign + t.join("");
  }
  function Vn(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var u = Ye(r), n = e ? Xe(u, e) : u, t = n.coefficients, a = n.exponent;
    t.length < e && (t = t.concat(De(e - t.length)));
    var s = t.shift();
    return n.sign + s + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
  }
  function _a(r, e, u) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = qt(u == null ? void 0 : u.lowerExp, -3), t = qt(u == null ? void 0 : u.upperExp, 5), a = Ye(r), s = e ? Xe(a, e) : a;
    if (s.exponent < n || s.exponent >= t) return Vn(r, e);
    var D = s.coefficients, f = s.exponent;
    D.length < e && (D = D.concat(De(e - D.length))), D = D.concat(De(f - D.length + 1 + (D.length < e ? e - D.length : 0))), D = De(-f).concat(D);
    var c = f > 0 ? f : 0;
    return c < D.length - 1 && D.splice(c + 1, 0, "."), s.sign + D.join("");
  }
  function Xe(r, e) {
    for (var u = {
      sign: r.sign,
      coefficients: r.coefficients,
      exponent: r.exponent
    }, n = u.coefficients; e <= 0; ) n.unshift(0), u.exponent++, e++;
    if (n.length > e) {
      var t = n.splice(e, n.length - e);
      if (t[0] >= 5) {
        var a = e - 1;
        for (n[a]++; n[a] === 10; ) n.pop(), a === 0 && (n.unshift(0), u.exponent++, a++), a--, n[a]++;
      }
    }
    return u;
  }
  function De(r) {
    for (var e = [], u = 0; u < r; u++) e.push(0);
    return e;
  }
  function Ba(r) {
    return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
  }
  function kr(r, e) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (u <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (n < 0) throw new Error("Absolute tolerance must be at least 0");
    return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(u * Math.max(Math.abs(r), Math.abs(e)), n);
  }
  function Rt(r, e) {
    if (yr(r)) return r;
    if (_r(r)) return r.toNumber();
    e();
  }
  function qt(r, e) {
    return yr(r) ? r : _r(r) ? r.toNumber() : e;
  }
  var Zn = function() {
    return Zn = Ie.create, Ie;
  }, Sa = [
    "?BigNumber",
    "?Complex",
    "?DenseMatrix",
    "?Fraction"
  ], xa = Y("typed", Sa, function(e) {
    var { BigNumber: u, Complex: n, DenseMatrix: t, Fraction: a } = e, s = Zn();
    return s.clear(), s.addTypes([
      {
        name: "number",
        test: yr
      },
      {
        name: "Complex",
        test: Dt
      },
      {
        name: "BigNumber",
        test: _r
      },
      {
        name: "bigint",
        test: Vu
      },
      {
        name: "Fraction",
        test: pt
      },
      {
        name: "Unit",
        test: Rn
      },
      {
        name: "identifier",
        test: (D) => Yr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D)
      },
      {
        name: "string",
        test: Yr
      },
      {
        name: "Chain",
        test: da
      },
      {
        name: "Array",
        test: br
      },
      {
        name: "Matrix",
        test: mr
      },
      {
        name: "DenseMatrix",
        test: qn
      },
      {
        name: "SparseMatrix",
        test: Pn
      },
      {
        name: "Range",
        test: Un
      },
      {
        name: "Index",
        test: dt
      },
      {
        name: "boolean",
        test: Zu
      },
      {
        name: "ResultSet",
        test: Gu
      },
      {
        name: "Help",
        test: Ju
      },
      {
        name: "function",
        test: Qu
      },
      {
        name: "Date",
        test: Yu
      },
      {
        name: "RegExp",
        test: Xu
      },
      {
        name: "null",
        test: Hu
      },
      {
        name: "undefined",
        test: ku
      },
      {
        name: "AccessorNode",
        test: ju
      },
      {
        name: "ArrayNode",
        test: ra
      },
      {
        name: "AssignmentNode",
        test: ea
      },
      {
        name: "BlockNode",
        test: ta
      },
      {
        name: "ConditionalNode",
        test: na
      },
      {
        name: "ConstantNode",
        test: ua
      },
      {
        name: "FunctionNode",
        test: ia
      },
      {
        name: "FunctionAssignmentNode",
        test: aa
      },
      {
        name: "IndexNode",
        test: oa
      },
      {
        name: "Node",
        test: sa
      },
      {
        name: "ObjectNode",
        test: fa
      },
      {
        name: "OperatorNode",
        test: la
      },
      {
        name: "ParenthesisNode",
        test: ca
      },
      {
        name: "RangeNode",
        test: va
      },
      {
        name: "RelationalNode",
        test: Da
      },
      {
        name: "SymbolNode",
        test: pa
      },
      {
        name: "Map",
        test: Ku
      },
      {
        name: "Object",
        test: ht
      }
    ]), s.addConversions([
      {
        from: "number",
        to: "BigNumber",
        convert: function(f) {
          if (u || Me(f), Ba(f) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + f + "). Use function bignumber(x) to convert to BigNumber.");
          return new u(f);
        }
      },
      {
        from: "number",
        to: "Complex",
        convert: function(f) {
          return n || Ne(f), new n(f, 0);
        }
      },
      {
        from: "BigNumber",
        to: "Complex",
        convert: function(f) {
          return n || Ne(f), new n(f.toNumber(), 0);
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
          return u || Me(f), new u(f.toString());
        }
      },
      {
        from: "bigint",
        to: "Fraction",
        convert: function(f) {
          return a || Te(f), new a(f);
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
          return n || Ne(f), new n(f.valueOf(), 0);
        }
      },
      {
        from: "number",
        to: "Fraction",
        convert: function(f) {
          a || Te(f);
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
          u || Me(f);
          try {
            return new u(f);
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
          a || Te(f);
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
          n || Ne(f);
          try {
            return new n(f);
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
          return u || Me(f), new u(+f);
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
          return a || Te(f), new a(+f);
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
          return t || Ma(), new t(f);
        }
      },
      {
        from: "Matrix",
        to: "Array",
        convert: function(f) {
          return f.valueOf();
        }
      }
    ]), s.onMismatch = (D, f, c) => {
      var o = s.createError(D, f, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(o.data.category) && f.length === 1 && qe(f[0]) && c.some((g) => !g.params.includes(","))) {
        var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
        throw l.data = o.data, l;
      }
      throw o;
    }, s.onMismatch = (D, f, c) => {
      var o = s.createError(D, f, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(o.data.category) && f.length === 1 && qe(f[0]) && c.some((g) => !g.params.includes(","))) {
        var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
        throw l.data = o.data, l;
      }
      throw o;
    }, s;
  });
  function Me(r) {
    throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
  }
  function Ne(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
  }
  function Ma() {
    throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
  }
  function Te(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
  }
  var Na = "BigNumber", Ta = [
    "?on",
    "config"
  ], za = Y(Na, Ta, (r) => {
    var { on: e, config: u } = r, n = It.clone({
      precision: u.precision,
      modulo: It.EUCLID
    });
    return n.prototype = Object.create(n.prototype), n.prototype.type = "BigNumber", n.prototype.isBigNumber = true, n.prototype.toJSON = function() {
      return {
        mathjs: "BigNumber",
        value: this.toString()
      };
    }, n.fromJSON = function(t) {
      return new n(t.value);
    }, e && e("config", function(t, a) {
      t.precision !== a.precision && n.config({
        precision: t.precision
      });
    }), n;
  }, {
    isClass: true
  }), Oa = "Complex", $a = [], Ia = Y(Oa, $a, () => (Object.defineProperty(zr, "name", {
    value: "Complex"
  }), zr.prototype.constructor = zr, zr.prototype.type = "Complex", zr.prototype.isComplex = true, zr.prototype.toJSON = function() {
    return {
      mathjs: "Complex",
      re: this.re,
      im: this.im
    };
  }, zr.prototype.toPolar = function() {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  }, zr.prototype.format = function(r) {
    var e = "", u = this.im, n = this.re, t = ot(this.re, r), a = ot(this.im, r), s = yr(r) ? r : r ? r.precision : null;
    if (s !== null) {
      var D = Math.pow(10, -s);
      Math.abs(n / u) < D && (n = 0), Math.abs(u / n) < D && (u = 0);
    }
    return u === 0 ? e = t : n === 0 ? u === 1 ? e = "i" : u === -1 ? e = "-i" : e = a + "i" : u < 0 ? u === -1 ? e = t + " - i" : e = t + " - " + a.substring(1) + "i" : u === 1 ? e = t + " + i" : e = t + " + " + a + "i", e;
  }, zr.fromPolar = function(r) {
    switch (arguments.length) {
      case 1: {
        var e = arguments[0];
        if (typeof e == "object") return zr(e);
        throw new TypeError("Input has to be an object with r and phi keys.");
      }
      case 2: {
        var u = arguments[0], n = arguments[1];
        if (yr(u)) {
          if (Rn(n) && n.hasBase("ANGLE") && (n = n.toNumber("rad")), yr(n)) return new zr({
            r: u,
            phi: n
          });
          throw new TypeError("Phi is not a number nor an angle unit.");
        } else throw new TypeError("Radius r is not a number.");
      }
      default:
        throw new SyntaxError("Wrong number of arguments in function fromPolar");
    }
  }, zr.prototype.valueOf = zr.prototype.toString, zr.fromJSON = function(r) {
    return new zr(r);
  }, zr.compare = function(r, e) {
    return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
  }, zr), {
    isClass: true
  });
  typeof BigInt > "u" && (BigInt = function(r) {
    if (isNaN(r)) throw new Error("");
    return r;
  });
  const rr = BigInt(0), ir = BigInt(1), Ee = BigInt(2), st = BigInt(5), Ur = BigInt(10), Ra = 2e3, X = {
    s: ir,
    n: rr,
    d: ir
  };
  function Hr(r, e) {
    try {
      r = BigInt(r);
    } catch {
      throw ee();
    }
    return r * e;
  }
  function Qr(r) {
    return typeof r == "bigint" ? r : Math.floor(r);
  }
  function wr(r, e) {
    if (e === rr) throw mt();
    const u = Object.create(Gr.prototype);
    u.s = r < rr ? -ir : ir, r = r < rr ? -r : r;
    const n = ue(r, e);
    return u.n = r / n, u.d = e / n, u;
  }
  function le(r) {
    const e = {};
    let u = r, n = Ee, t = st - ir;
    for (; t <= u; ) {
      for (; u % n === rr; ) u /= n, e[n] = (e[n] || rr) + ir;
      t += ir + Ee * n++;
    }
    return u !== r ? u > 1 && (e[u] = (e[u] || rr) + ir) : e[r] = (e[r] || rr) + ir, e;
  }
  const Mr = function(r, e) {
    let u = rr, n = ir, t = ir;
    if (r != null) if (e !== void 0) {
      if (typeof r == "bigint") u = r;
      else {
        if (isNaN(r)) throw ee();
        if (r % 1 !== 0) throw Pt();
        u = BigInt(r);
      }
      if (typeof e == "bigint") n = e;
      else {
        if (isNaN(e)) throw ee();
        if (e % 1 !== 0) throw Pt();
        n = BigInt(e);
      }
      t = u * n;
    } else if (typeof r == "object") {
      if ("d" in r && "n" in r) u = BigInt(r.n), n = BigInt(r.d), "s" in r && (u *= BigInt(r.s));
      else if (0 in r) u = BigInt(r[0]), 1 in r && (n = BigInt(r[1]));
      else if (typeof r == "bigint") u = r;
      else throw ee();
      t = u * n;
    } else if (typeof r == "number") {
      if (isNaN(r)) throw ee();
      if (r < 0 && (t = -ir, r = -r), r % 1 === 0) u = BigInt(r);
      else if (r > 0) {
        let a = 1, s = 0, D = 1, f = 1, c = 1, o = 1e7;
        for (r >= 1 && (a = 10 ** Math.floor(1 + Math.log10(r)), r /= a); D <= o && c <= o; ) {
          let l = (s + f) / (D + c);
          if (r === l) {
            D + c <= o ? (u = s + f, n = D + c) : c > D ? (u = f, n = c) : (u = s, n = D);
            break;
          } else r > l ? (s += f, D += c) : (f += s, c += D), D > o ? (u = f, n = c) : (u = s, n = D);
        }
        u = BigInt(u) * BigInt(a), n = BigInt(n);
      }
    } else if (typeof r == "string") {
      let a = 0, s = rr, D = rr, f = rr, c = ir, o = ir, l = r.replace(/_/g, "").match(/\d+|./g);
      if (l === null) throw ee();
      if (l[a] === "-" ? (t = -ir, a++) : l[a] === "+" && a++, l.length === a + 1 ? D = Hr(l[a++], t) : l[a + 1] === "." || l[a] === "." ? (l[a] !== "." && (s = Hr(l[a++], t)), a++, (a + 1 === l.length || l[a + 1] === "(" && l[a + 3] === ")" || l[a + 1] === "'" && l[a + 3] === "'") && (D = Hr(l[a], t), c = Ur ** BigInt(l[a].length), a++), (l[a] === "(" && l[a + 2] === ")" || l[a] === "'" && l[a + 2] === "'") && (f = Hr(l[a + 1], t), o = Ur ** BigInt(l[a + 1].length) - ir, a += 3)) : l[a + 1] === "/" || l[a + 1] === ":" ? (D = Hr(l[a], t), c = Hr(l[a + 2], ir), a += 3) : l[a + 3] === "/" && l[a + 1] === " " && (s = Hr(l[a], t), D = Hr(l[a + 2], t), c = Hr(l[a + 4], ir), a += 5), l.length <= a) n = c * o, t = u = f + n * s + o * D;
      else throw ee();
    } else if (typeof r == "bigint") u = r, t = r, n = ir;
    else throw ee();
    if (n === rr) throw mt();
    X.s = t < rr ? -ir : ir, X.n = u < rr ? -u : u, X.d = n < rr ? -n : n;
  };
  function qa(r, e, u) {
    let n = ir;
    for (; e > rr; r = r * r % u, e >>= ir) e & ir && (n = n * r % u);
    return n;
  }
  function Pa(r, e) {
    for (; e % Ee === rr; e /= Ee) ;
    for (; e % st === rr; e /= st) ;
    if (e === ir) return rr;
    let u = Ur % e, n = 1;
    for (; u !== ir; n++) if (u = u * Ur % e, n > Ra) return rr;
    return BigInt(n);
  }
  function Ua(r, e, u) {
    let n = ir, t = qa(Ur, u, e);
    for (let a = 0; a < 300; a++) {
      if (n === t) return BigInt(a);
      n = n * Ur % e, t = t * Ur % e;
    }
    return 0;
  }
  function ue(r, e) {
    if (!r) return e;
    if (!e) return r;
    for (; ; ) {
      if (r %= e, !r) return e;
      if (e %= r, !e) return r;
    }
  }
  function Gr(r, e) {
    if (Mr(r, e), this instanceof Gr) r = ue(X.d, X.n), this.s = X.s, this.n = X.n / r, this.d = X.d / r;
    else return wr(X.s * X.n, X.d);
  }
  var mt = function() {
    return new Error("Division by Zero");
  }, ee = function() {
    return new Error("Invalid argument");
  }, Pt = function() {
    return new Error("Parameters must be integer");
  };
  Gr.prototype = {
    s: ir,
    n: rr,
    d: ir,
    abs: function() {
      return wr(this.n, this.d);
    },
    neg: function() {
      return wr(-this.s * this.n, this.d);
    },
    add: function(r, e) {
      return Mr(r, e), wr(this.s * this.n * X.d + X.s * this.d * X.n, this.d * X.d);
    },
    sub: function(r, e) {
      return Mr(r, e), wr(this.s * this.n * X.d - X.s * this.d * X.n, this.d * X.d);
    },
    mul: function(r, e) {
      return Mr(r, e), wr(this.s * X.s * this.n * X.n, this.d * X.d);
    },
    div: function(r, e) {
      return Mr(r, e), wr(this.s * X.s * this.n * X.d, this.d * X.n);
    },
    clone: function() {
      return wr(this.s * this.n, this.d);
    },
    mod: function(r, e) {
      if (r === void 0) return wr(this.s * this.n % this.d, ir);
      if (Mr(r, e), rr === X.n * this.d) throw mt();
      return wr(this.s * (X.d * this.n) % (X.n * this.d), X.d * this.d);
    },
    gcd: function(r, e) {
      return Mr(r, e), wr(ue(X.n, this.n) * ue(X.d, this.d), X.d * this.d);
    },
    lcm: function(r, e) {
      return Mr(r, e), X.n === rr && this.n === rr ? wr(rr, ir) : wr(X.n * this.n, ue(X.n, this.n) * ue(X.d, this.d));
    },
    inverse: function() {
      return wr(this.s * this.d, this.n);
    },
    pow: function(r, e) {
      if (Mr(r, e), X.d === ir) return X.s < rr ? wr((this.s * this.d) ** X.n, this.n ** X.n) : wr((this.s * this.n) ** X.n, this.d ** X.n);
      if (this.s < rr) return null;
      let u = le(this.n), n = le(this.d), t = ir, a = ir;
      for (let s in u) if (s !== "1") {
        if (s === "0") {
          t = rr;
          break;
        }
        if (u[s] *= X.n, u[s] % X.d === rr) u[s] /= X.d;
        else return null;
        t *= BigInt(s) ** u[s];
      }
      for (let s in n) if (s !== "1") {
        if (n[s] *= X.n, n[s] % X.d === rr) n[s] /= X.d;
        else return null;
        a *= BigInt(s) ** n[s];
      }
      return X.s < rr ? wr(a, t) : wr(t, a);
    },
    log: function(r, e) {
      if (Mr(r, e), this.s <= rr || X.s <= rr) return null;
      const u = {}, n = le(X.n), t = le(X.d), a = le(this.n), s = le(this.d);
      for (const c in t) n[c] = (n[c] || rr) - t[c];
      for (const c in s) a[c] = (a[c] || rr) - s[c];
      for (const c in n) c !== "1" && (u[c] = true);
      for (const c in a) c !== "1" && (u[c] = true);
      let D = null, f = null;
      for (const c in u) {
        const o = n[c] || rr, l = a[c] || rr;
        if (o === rr) {
          if (l !== rr) return null;
          continue;
        }
        let g = l, v = o;
        const p = ue(g, v);
        if (g /= p, v /= p, D === null && f === null) D = g, f = v;
        else if (g * f !== D * v) return null;
      }
      return D !== null && f !== null ? wr(D, f) : null;
    },
    equals: function(r, e) {
      return Mr(r, e), this.s * this.n * X.d === X.s * X.n * this.d;
    },
    lt: function(r, e) {
      return Mr(r, e), this.s * this.n * X.d < X.s * X.n * this.d;
    },
    lte: function(r, e) {
      return Mr(r, e), this.s * this.n * X.d <= X.s * X.n * this.d;
    },
    gt: function(r, e) {
      return Mr(r, e), this.s * this.n * X.d > X.s * X.n * this.d;
    },
    gte: function(r, e) {
      return Mr(r, e), this.s * this.n * X.d >= X.s * X.n * this.d;
    },
    compare: function(r, e) {
      Mr(r, e);
      let u = this.s * this.n * X.d - X.s * X.n * this.d;
      return (rr < u) - (u < rr);
    },
    ceil: function(r) {
      return r = Ur ** BigInt(r || 0), wr(Qr(this.s * r * this.n / this.d) + (r * this.n % this.d > rr && this.s >= rr ? ir : rr), r);
    },
    floor: function(r) {
      return r = Ur ** BigInt(r || 0), wr(Qr(this.s * r * this.n / this.d) - (r * this.n % this.d > rr && this.s < rr ? ir : rr), r);
    },
    round: function(r) {
      return r = Ur ** BigInt(r || 0), wr(Qr(this.s * r * this.n / this.d) + this.s * ((this.s >= rr ? ir : rr) + Ee * (r * this.n % this.d) > this.d ? ir : rr), r);
    },
    roundTo: function(r, e) {
      Mr(r, e);
      const u = this.n * X.d, n = this.d * X.n, t = u % n;
      let a = Qr(u / n);
      return t + t >= n && a++, wr(this.s * a * X.n, X.d);
    },
    divisible: function(r, e) {
      return Mr(r, e), !(!(X.n * this.d) || this.n * X.d % (X.n * this.d));
    },
    valueOf: function() {
      return Number(this.s * this.n) / Number(this.d);
    },
    toString: function(r) {
      let e = this.n, u = this.d;
      r = r || 15;
      let n = Pa(e, u), t = Ua(e, u, n), a = this.s < rr ? "-" : "";
      if (a += Qr(e / u), e %= u, e *= Ur, e && (a += "."), n) {
        for (let s = t; s--; ) a += Qr(e / u), e %= u, e *= Ur;
        a += "(";
        for (let s = n; s--; ) a += Qr(e / u), e %= u, e *= Ur;
        a += ")";
      } else for (let s = r; e && s--; ) a += Qr(e / u), e %= u, e *= Ur;
      return a;
    },
    toFraction: function(r) {
      let e = this.n, u = this.d, n = this.s < rr ? "-" : "";
      if (u === ir) n += e;
      else {
        let t = Qr(e / u);
        r && t > rr && (n += t, n += " ", e %= u), n += e, n += "/", n += u;
      }
      return n;
    },
    toLatex: function(r) {
      let e = this.n, u = this.d, n = this.s < rr ? "-" : "";
      if (u === ir) n += e;
      else {
        let t = Qr(e / u);
        r && t > rr && (n += t, e %= u), n += "\\frac{", n += e, n += "}{", n += u, n += "}";
      }
      return n;
    },
    toContinued: function() {
      let r = this.n, e = this.d, u = [];
      do {
        u.push(Qr(r / e));
        let n = r % e;
        r = e, e = n;
      } while (r !== ir);
      return u;
    },
    simplify: function(r) {
      const e = BigInt(1 / (r || 1e-3) | 0), u = this.abs(), n = u.toContinued();
      for (let t = 1; t < n.length; t++) {
        let a = wr(n[t - 1], ir);
        for (let D = t - 2; D >= 0; D--) a = a.inverse().add(n[D]);
        let s = a.sub(u);
        if (s.n * e < s.d) return a.mul(this.s);
      }
      return this;
    }
  };
  var La = "Fraction", Wa = [], Va = Y(La, Wa, () => (Object.defineProperty(Gr, "name", {
    value: "Fraction"
  }), Gr.prototype.constructor = Gr, Gr.prototype.type = "Fraction", Gr.prototype.isFraction = true, Gr.prototype.toJSON = function() {
    return {
      mathjs: "Fraction",
      n: String(this.s * this.n),
      d: String(this.d)
    };
  }, Gr.fromJSON = function(r) {
    return new Gr(r);
  }, Gr), {
    isClass: true
  }), Za = "Matrix", Ga = [], Ja = Y(Za, Ga, () => {
    function r() {
      if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
    }
    return r.prototype.type = "Matrix", r.prototype.isMatrix = true, r.prototype.storage = function() {
      throw new Error("Cannot invoke storage on a Matrix interface");
    }, r.prototype.datatype = function() {
      throw new Error("Cannot invoke datatype on a Matrix interface");
    }, r.prototype.create = function(e, u) {
      throw new Error("Cannot invoke create on a Matrix interface");
    }, r.prototype.subset = function(e, u, n) {
      throw new Error("Cannot invoke subset on a Matrix interface");
    }, r.prototype.get = function(e) {
      throw new Error("Cannot invoke get on a Matrix interface");
    }, r.prototype.set = function(e, u, n) {
      throw new Error("Cannot invoke set on a Matrix interface");
    }, r.prototype.resize = function(e, u) {
      throw new Error("Cannot invoke resize on a Matrix interface");
    }, r.prototype.reshape = function(e, u) {
      throw new Error("Cannot invoke reshape on a Matrix interface");
    }, r.prototype.clone = function() {
      throw new Error("Cannot invoke clone on a Matrix interface");
    }, r.prototype.size = function() {
      throw new Error("Cannot invoke size on a Matrix interface");
    }, r.prototype.map = function(e, u) {
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
  function it(r, e, u) {
    var n = r.constructor, t = new n(2), a = "";
    if (u) {
      if (u < 1) throw new Error("size must be in greater than 0");
      if (!Ar(u)) throw new Error("size must be an integer");
      if (r.greaterThan(t.pow(u - 1).sub(1)) || r.lessThan(t.pow(u - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(u - 1, ", 2^").concat(u - 1, "-1]"));
      if (!r.isInteger()) throw new Error("Value must be an integer");
      r.lessThan(0) && (r = r.add(t.pow(u))), a = "i".concat(u);
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
  function Qa(r, e) {
    if (typeof e == "function") return e(r);
    if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
    var { notation: u, precision: n, wordSize: t } = Wn(e);
    switch (u) {
      case "fixed":
        return Xa(r, n);
      case "exponential":
        return Ut(r, n);
      case "engineering":
        return Ya(r, n);
      case "bin":
        return it(r, 2, t);
      case "oct":
        return it(r, 8, t);
      case "hex":
        return it(r, 16, t);
      case "auto": {
        var a = Lt(e == null ? void 0 : e.lowerExp, -3), s = Lt(e == null ? void 0 : e.upperExp, 5);
        if (r.isZero()) return "0";
        var D, f = r.toSignificantDigits(n), c = f.e;
        return c >= a && c < s ? D = f.toFixed() : D = Ut(r, n), D.replace(/((\.\d*?)(0+))($|e)/, function() {
          var o = arguments[2], l = arguments[4];
          return o !== "." ? o + l : l;
        });
      }
      default:
        throw new Error('Unknown notation "' + u + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function Ya(r, e) {
    var u = r.e, n = u % 3 === 0 ? u : u < 0 ? u - 3 - u % 3 : u - u % 3, t = r.mul(Math.pow(10, -n)), a = t.toPrecision(e);
    if (a.includes("e")) {
      var s = r.constructor;
      a = new s(a).toFixed();
    }
    return a + "e" + (u >= 0 ? "+" : "") + n.toString();
  }
  function Ut(r, e) {
    return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
  }
  function Xa(r, e) {
    return r.toFixed(e);
  }
  function Lt(r, e) {
    return yr(r) ? r : _r(r) ? r.toNumber() : e;
  }
  function Er(r, e) {
    var u = Ka(r, e);
    return e && typeof e == "object" && "truncate" in e && u.length > e.truncate ? u.substring(0, e.truncate - 3) + "..." : u;
  }
  function Ka(r, e) {
    if (typeof r == "number") return ot(r, e);
    if (_r(r)) return Qa(r, e);
    if (Ha(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
    if (Array.isArray(r)) return Gn(r, e);
    if (Yr(r)) return Wt(r);
    if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
    if (r && typeof r == "object") {
      if (typeof r.format == "function") return r.format(e);
      if (r && r.toString(e) !== {}.toString()) return r.toString(e);
      var u = Object.keys(r).map((n) => Wt(n) + ": " + Er(r[n], e));
      return "{" + u.join(", ") + "}";
    }
    return String(r);
  }
  function Wt(r) {
    for (var e = String(r), u = "", n = 0; n < e.length; ) {
      var t = e.charAt(n);
      u += t in Vt ? Vt[t] : t, n++;
    }
    return '"' + u + '"';
  }
  var Vt = {
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t"
  };
  function Gn(r, e) {
    if (Array.isArray(r)) {
      for (var u = "[", n = r.length, t = 0; t < n; t++) t !== 0 && (u += ", "), u += Gn(r[t], e);
      return u += "]", u;
    } else return Er(r, e);
  }
  function Ha(r) {
    return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
  }
  function lr(r, e, u) {
    if (!(this instanceof lr)) throw new SyntaxError("Constructor must be called with the new operator");
    this.actual = r, this.expected = e, this.relation = u, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
  }
  lr.prototype = new RangeError();
  lr.prototype.constructor = RangeError;
  lr.prototype.name = "DimensionError";
  lr.prototype.isDimensionError = true;
  function ae(r, e, u) {
    if (!(this instanceof ae)) throw new SyntaxError("Constructor must be called with the new operator");
    this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = u), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
  }
  ae.prototype = new RangeError();
  ae.prototype.constructor = RangeError;
  ae.prototype.name = "IndexError";
  ae.prototype.isIndexError = true;
  function hr(r) {
    for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
    return e;
  }
  function Jn(r, e, u) {
    var n, t = r.length;
    if (t !== e[u]) throw new lr(t, e[u]);
    if (u < e.length - 1) {
      var a = u + 1;
      for (n = 0; n < t; n++) {
        var s = r[n];
        if (!Array.isArray(s)) throw new lr(e.length - 1, e.length, "<");
        Jn(r[n], e, a);
      }
    } else for (n = 0; n < t; n++) if (Array.isArray(r[n])) throw new lr(e.length + 1, e.length, ">");
  }
  function Zt(r, e) {
    var u = e.length === 0;
    if (u) {
      if (Array.isArray(r)) throw new lr(r.length, 0);
    } else Jn(r, e, 0);
  }
  function Cr(r, e) {
    if (r !== void 0) {
      if (!yr(r) || !Ar(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
      if (r < 0 || typeof e == "number" && r >= e) throw new ae(r, e);
    }
  }
  function Pe(r, e, u) {
    if (!Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new Error("Resizing to scalar is not supported");
    e.forEach(function(t) {
      if (!yr(t) || !Ar(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Er(e) + ")");
    }), (yr(r) || _r(r)) && (r = [
      r
    ]);
    var n = u !== void 0 ? u : 0;
    return ft(r, e, 0, n), r;
  }
  function ft(r, e, u, n) {
    var t, a, s = r.length, D = e[u], f = Math.min(s, D);
    if (r.length = D, u < e.length - 1) {
      var c = u + 1;
      for (t = 0; t < f; t++) a = r[t], Array.isArray(a) || (a = [
        a
      ], r[t] = a), ft(a, e, c, n);
      for (t = f; t < D; t++) a = [], r[t] = a, ft(a, e, c, n);
    } else {
      for (t = 0; t < f; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
      for (t = f; t < D; t++) r[t] = n;
    }
  }
  function gt(r, e) {
    var u = lt(r), n = u.length;
    if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new lr(0, n, "!=");
    e = yt(e, n);
    var t = Qn(e);
    if (n !== t) throw new lr(t, n, "!=");
    try {
      return ka(u, e);
    } catch (a) {
      throw a instanceof lr ? new lr(t, n, "!=") : a;
    }
  }
  function yt(r, e) {
    var u = Qn(r), n = r.slice(), t = -1, a = r.indexOf(t), s = r.indexOf(t, a + 1) >= 0;
    if (s) throw new Error("More than one wildcard in sizes");
    var D = a >= 0, f = e % u === 0;
    if (D) if (f) n[a] = -e / u;
    else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -u);
    return n;
  }
  function Qn(r) {
    return r.reduce((e, u) => e * u, 1);
  }
  function ka(r, e) {
    for (var u = r, n, t = e.length - 1; t > 0; t--) {
      var a = e[t];
      n = [];
      for (var s = u.length / a, D = 0; D < s; D++) n.push(u.slice(D * a, (D + 1) * a));
      u = n;
    }
    return u;
  }
  function Gt(r, e) {
    for (var u = hr(r); Array.isArray(r) && r.length === 1; ) r = r[0], u.shift();
    for (var n = u.length; u[n - 1] === 1; ) n--;
    return n < u.length && (r = Yn(r, n, 0), u.length = n), r;
  }
  function Yn(r, e, u) {
    var n, t;
    if (u < e) {
      var a = u + 1;
      for (n = 0, t = r.length; n < t; n++) r[n] = Yn(r[n], e, a);
    } else for (; Array.isArray(r); ) r = r[0];
    return r;
  }
  function Xn(r, e, u, n) {
    var t = n || hr(r);
    if (u) for (var a = 0; a < u; a++) r = [
      r
    ], t.unshift(1);
    for (r = Kn(r, e, 0); t.length < e; ) t.push(1);
    return r;
  }
  function Kn(r, e, u) {
    var n, t;
    if (Array.isArray(r)) {
      var a = u + 1;
      for (n = 0, t = r.length; n < t; n++) r[n] = Kn(r[n], e, a);
    } else for (var s = u; s < e; s++) r = [
      r
    ];
    return r;
  }
  function lt(r) {
    if (!Array.isArray(r)) return r;
    var e = [];
    return r.forEach(function u(n) {
      Array.isArray(n) ? n.forEach(u) : e.push(n);
    }), e;
  }
  function Ke(r, e) {
    for (var u, n = 0, t = 0; t < r.length; t++) {
      var a = r[t], s = Array.isArray(a);
      if (t === 0 && s && (n = a.length), s && a.length !== n) return;
      var D = s ? Ke(a, e) : e(a);
      if (u === void 0) u = D;
      else if (u !== D) return "mixed";
    }
    return u;
  }
  function Hn(r, e, u, n) {
    if (n < u) {
      if (r.length !== e.length) throw new lr(r.length, e.length);
      for (var t = [], a = 0; a < r.length; a++) t[a] = Hn(r[a], e[a], u, n + 1);
      return t;
    } else return r.concat(e);
  }
  function kn() {
    var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
    if (r.length === 1) return r[0];
    if (r.length > 1) return r.slice(1).reduce(function(u, n) {
      return Hn(u, n, e, 0);
    }, r[0]);
    throw new Error("Wrong number of arguments in function concat");
  }
  function jn() {
    for (var r = arguments.length, e = new Array(r), u = 0; u < r; u++) e[u] = arguments[u];
    for (var n = e.map((g) => g.length), t = Math.max(...n), a = new Array(t).fill(null), s = 0; s < e.length; s++) for (var D = e[s], f = n[s], c = 0; c < f; c++) {
      var o = t - f + c;
      D[c] > a[o] && (a[o] = D[c]);
    }
    for (var l = 0; l < e.length; l++) ru(e[l], a);
    return a;
  }
  function ru(r, e) {
    for (var u = e.length, n = r.length, t = 0; t < n; t++) {
      var a = u - n + t;
      if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(n, " with size ").concat(r[t], " to size ").concat(e[a]));
    }
  }
  function ct(r, e) {
    var u = hr(r);
    if (te(u, e)) return r;
    ru(u, e);
    var n = jn(u, e), t = n.length, a = [
      ...Array(t - u.length).fill(1),
      ...u
    ], s = ri(r);
    u.length < t && (s = gt(s, a), u = hr(s));
    for (var D = 0; D < t; D++) u[D] < n[D] && (s = ja(s, n[D], D), u = hr(s));
    return s;
  }
  function ja(r, e, u) {
    return kn(...Array(e).fill(r), u);
  }
  function eu(r, e) {
    if (!Array.isArray(r)) throw new Error("Array expected");
    var u = hr(r);
    if (e.length !== u.length) throw new lr(e.length, u.length);
    for (var n = 0; n < e.length; n++) Cr(e[n], u[n]);
    return e.reduce((t, a) => t[a], r);
  }
  function Jt(r, e) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (r.length === 0) return [];
    if (u) return a(r);
    var n = [];
    return t(r, 0);
    function t(s, D) {
      if (Array.isArray(s)) {
        for (var f = s.length, c = Array(f), o = 0; o < f; o++) n[D] = o, c[o] = t(s[o], D + 1);
        return c;
      } else return e(s, n.slice(0, D), r);
    }
    function a(s) {
      if (Array.isArray(s)) {
        for (var D = s.length, f = Array(D), c = 0; c < D; c++) f[c] = a(s[c]);
        return f;
      } else return e(s);
    }
  }
  function ri(r) {
    return Qe([], r);
  }
  function Ue(r, e, u) {
    if (Ie.isTypedFunction(r)) {
      var n = (e.isMatrix ? e.size() : hr(e)).map(() => 0), t = e.isMatrix ? e.get(n) : eu(e, n), a = ti(r, t, n, e), s;
      if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
        var D = ei(r, a);
        s = D !== void 0 ? D : r;
      } else s = r;
      return a >= 1 && a <= 3 ? function() {
        for (var f = arguments.length, c = new Array(f), o = 0; o < f; o++) c[o] = arguments[o];
        return Qt(s, c.slice(0, a), u, r.name);
      } : function() {
        for (var f = arguments.length, c = new Array(f), o = 0; o < f; o++) c[o] = arguments[o];
        return Qt(s, c, u, r.name);
      };
    }
    return r;
  }
  function ei(r, e) {
    var u = [];
    if (Object.entries(r.signatures).forEach((n) => {
      var [t, a] = n;
      t.split(",").length === e && u.push(a);
    }), u.length === 1) return u[0];
  }
  function ti(r, e, u, n) {
    for (var t = [
      e,
      u,
      n
    ], a = 3; a > 0; a--) {
      var s = t.slice(0, a);
      if (Ie.resolve(r, s) !== null) return a;
    }
  }
  function Qt(r, e, u, n) {
    try {
      return r(...e);
    } catch (t) {
      ni(t, e, u, n);
    }
  }
  function ni(r, e, u, n) {
    var t;
    if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
      var a = [];
      throw a.push("value: ".concat(Xr(e[0]))), e.length >= 2 && a.push("index: ".concat(Xr(e[1]))), e.length >= 3 && a.push("array: ".concat(Xr(e[2]))), new TypeError("Function ".concat(u, " cannot apply callback arguments ") + "".concat(n, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
    } else throw new TypeError("Function ".concat(u, " cannot apply callback arguments ") + "to function ".concat(n, ": ").concat(r.message));
  }
  var ui = "DenseMatrix", ai = [
    "Matrix"
  ], ii = Y(ui, ai, (r) => {
    var { Matrix: e } = r;
    function u(o, l) {
      if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
      if (l && !Yr(l)) throw new Error("Invalid datatype: " + l);
      if (mr(o)) o.type === "DenseMatrix" ? (this._data = fr(o._data), this._size = fr(o._size), this._datatype = l || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = l || o._datatype);
      else if (o && br(o.data) && br(o.size)) this._data = o.data, this._size = o.size, Zt(this._data, this._size), this._datatype = l || o.datatype;
      else if (br(o)) this._data = c(o), this._size = hr(this._data), Zt(this._data, this._size), this._datatype = l;
      else {
        if (o) throw new TypeError("Unsupported type of data (" + Xr(o) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = l;
      }
    }
    u.prototype = new e(), u.prototype.createDenseMatrix = function(o, l) {
      return new u(o, l);
    }, Object.defineProperty(u, "name", {
      value: "DenseMatrix"
    }), u.prototype.constructor = u, u.prototype.type = "DenseMatrix", u.prototype.isDenseMatrix = true, u.prototype.getDataType = function() {
      return Ke(this._data, Xr);
    }, u.prototype.storage = function() {
      return "dense";
    }, u.prototype.datatype = function() {
      return this._datatype;
    }, u.prototype.create = function(o, l) {
      return new u(o, l);
    }, u.prototype.subset = function(o, l, g) {
      switch (arguments.length) {
        case 1:
          return n(this, o);
        case 2:
        case 3:
          return a(this, o, l, g);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    }, u.prototype.get = function(o) {
      return eu(this._data, o);
    }, u.prototype.set = function(o, l, g) {
      if (!br(o)) throw new TypeError("Array expected");
      if (o.length < this._size.length) throw new lr(o.length, this._size.length, "<");
      var v, p, i, d = o.map(function(w) {
        return w + 1;
      });
      f(this, d, g);
      var h = this._data;
      for (v = 0, p = o.length - 1; v < p; v++) i = o[v], Cr(i, h.length), h = h[i];
      return i = o[o.length - 1], Cr(i, h.length), h[i] = l, this;
    };
    function n(o, l) {
      if (!dt(l)) throw new TypeError("Invalid index");
      var g = l.isScalar();
      if (g) return o.get(l.min());
      var v = l.size();
      if (v.length !== o._size.length) throw new lr(v.length, o._size.length);
      for (var p = l.min(), i = l.max(), d = 0, h = o._size.length; d < h; d++) Cr(p[d], o._size[d]), Cr(i[d], o._size[d]);
      return new u(t(o._data, l, v.length, 0), o._datatype);
    }
    function t(o, l, g, v) {
      var p = v === g - 1, i = l.dimension(v);
      return p ? i.map(function(d) {
        return Cr(d, o.length), o[d];
      }).valueOf() : i.map(function(d) {
        Cr(d, o.length);
        var h = o[d];
        return t(h, l, g, v + 1);
      }).valueOf();
    }
    function a(o, l, g, v) {
      if (!l || l.isIndex !== true) throw new TypeError("Invalid index");
      var p = l.size(), i = l.isScalar(), d;
      if (mr(g) ? (d = g.size(), g = g.valueOf()) : d = hr(g), i) {
        if (d.length !== 0) throw new TypeError("Scalar expected");
        o.set(l.min(), g, v);
      } else {
        if (!te(d, p)) try {
          d.length === 0 ? g = ct([
            g
          ], p) : g = ct(g, p), d = hr(g);
        } catch {
        }
        if (p.length < o._size.length) throw new lr(p.length, o._size.length, "<");
        if (d.length < p.length) {
          for (var h = 0, w = 0; p[h] === 1 && d[h] === 1; ) h++;
          for (; p[h] === 1; ) w++, h++;
          g = Xn(g, p.length, w, d);
        }
        if (!te(p, d)) throw new lr(p, d, ">");
        var y = l.max().map(function(A) {
          return A + 1;
        });
        f(o, y, v);
        var C = p.length, F = 0;
        s(o._data, l, g, C, F);
      }
      return o;
    }
    function s(o, l, g, v, p) {
      var i = p === v - 1, d = l.dimension(p);
      i ? d.forEach(function(h, w) {
        Cr(h), o[h] = g[w[0]];
      }) : d.forEach(function(h, w) {
        Cr(h), s(o[h], l, g[w[0]], v, p + 1);
      });
    }
    u.prototype.resize = function(o, l, g) {
      if (!qe(o)) throw new TypeError("Array or Matrix expected");
      var v = o.valueOf().map((i) => Array.isArray(i) && i.length === 1 ? i[0] : i), p = g ? this.clone() : this;
      return D(p, v, l);
    };
    function D(o, l, g) {
      if (l.length === 0) {
        for (var v = o._data; br(v); ) v = v[0];
        return v;
      }
      return o._size = l.slice(0), o._data = Pe(o._data, o._size, g), o;
    }
    u.prototype.reshape = function(o, l) {
      var g = l ? this.clone() : this;
      g._data = gt(g._data, o);
      var v = g._size.reduce((p, i) => p * i);
      return g._size = yt(o, v), g;
    };
    function f(o, l, g) {
      for (var v = o._size.slice(0), p = false; v.length < l.length; ) v.push(0), p = true;
      for (var i = 0, d = l.length; i < d; i++) l[i] > v[i] && (v[i] = l[i], p = true);
      p && D(o, v, g);
    }
    u.prototype.clone = function() {
      var o = new u({
        data: fr(this._data),
        size: fr(this._size),
        datatype: this._datatype
      });
      return o;
    }, u.prototype.size = function() {
      return this._size.slice(0);
    }, u.prototype._forEach = function(o) {
      var l = this, g = l.size(), v = g.length - 1;
      if (v < 0) return;
      if (v === 0) {
        for (var p = g[0], i = 0; i < p; i++) o(l._data, i, [
          i
        ]);
        return;
      }
      var d = Array(g.length);
      function h(w, y) {
        var C = g[y];
        if (y < v) for (var F = 0; F < C; F++) d[y] = F, h(w[F], y + 1);
        else for (var A = 0; A < C; A++) d[y] = A, o(w, A, d.slice());
      }
      h(l._data, 0);
    }, u.prototype.map = function(o) {
      var l = this, g = new u(l), v = Ue(o, l._data, "map");
      return g._forEach(function(p, i, d) {
        p[i] = v(p[i], d, l);
      }), g;
    }, u.prototype.forEach = function(o) {
      var l = this, g = Ue(o, l._data, "map");
      l._forEach(function(v, p, i) {
        g(v[p], i, l);
      });
    }, u.prototype[Symbol.iterator] = function* () {
      var o = this._size.length - 1;
      if (!(o < 0)) {
        if (o === 0) {
          for (var l = 0; l < this._data.length; l++) yield {
            value: this._data[l],
            index: [
              l
            ]
          };
          return;
        }
        var g = [], v = function* (i, d) {
          if (d < o) for (var h = 0; h < i.length; h++) g[d] = h, yield* v(i[h], d + 1);
          else for (var w = 0; w < i.length; w++) g[d] = w, yield {
            value: i[w],
            index: g.slice()
          };
        };
        yield* v(this._data, 0);
      }
    }, u.prototype.rows = function() {
      var o = [], l = this.size();
      if (l.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      var g = this._data;
      for (var v of g) o.push(new u([
        v
      ], this._datatype));
      return o;
    }, u.prototype.columns = function() {
      var o = this, l = [], g = this.size();
      if (g.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      for (var v = this._data, p = function(h) {
        var w = v.map((y) => [
          y[h]
        ]);
        l.push(new u(w, o._datatype));
      }, i = 0; i < g[1]; i++) p(i);
      return l;
    }, u.prototype.toArray = function() {
      return fr(this._data);
    }, u.prototype.valueOf = function() {
      return this._data;
    }, u.prototype.format = function(o) {
      return Er(this._data, o);
    }, u.prototype.toString = function() {
      return Er(this._data);
    }, u.prototype.toJSON = function() {
      return {
        mathjs: "DenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, u.prototype.diagonal = function(o) {
      if (o) {
        if (_r(o) && (o = o.toNumber()), !yr(o) || !Ar(o)) throw new TypeError("The parameter k must be an integer number");
      } else o = 0;
      for (var l = o > 0 ? o : 0, g = o < 0 ? -o : 0, v = this._size[0], p = this._size[1], i = Math.min(v - g, p - l), d = [], h = 0; h < i; h++) d[h] = this._data[h + g][h + l];
      return new u({
        data: d,
        size: [
          i
        ],
        datatype: this._datatype
      });
    }, u.diagonal = function(o, l, g, v) {
      if (!br(o)) throw new TypeError("Array expected, size parameter");
      if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (o = o.map(function(b) {
        if (_r(b) && (b = b.toNumber()), !yr(b) || !Ar(b) || b < 1) throw new Error("Size values must be positive integers");
        return b;
      }), g) {
        if (_r(g) && (g = g.toNumber()), !yr(g) || !Ar(g)) throw new TypeError("The parameter k must be an integer number");
      } else g = 0;
      var p = g > 0 ? g : 0, i = g < 0 ? -g : 0, d = o[0], h = o[1], w = Math.min(d - i, h - p), y;
      if (br(l)) {
        if (l.length !== w) throw new Error("Invalid value array length");
        y = function(E) {
          return l[E];
        };
      } else if (mr(l)) {
        var C = l.size();
        if (C.length !== 1 || C[0] !== w) throw new Error("Invalid matrix length");
        y = function(E) {
          return l.get([
            E
          ]);
        };
      } else y = function() {
        return l;
      };
      v || (v = _r(y(0)) ? y(0).mul(0) : 0);
      var F = [];
      if (o.length > 0) {
        F = Pe(F, o, v);
        for (var A = 0; A < w; A++) F[A + i][A + p] = y(A);
      }
      return new u({
        data: F,
        size: [
          d,
          h
        ]
      });
    }, u.fromJSON = function(o) {
      return new u(o);
    }, u.prototype.swapRows = function(o, l) {
      if (!yr(o) || !Ar(o) || !yr(l) || !Ar(l)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return Cr(o, this._size[0]), Cr(l, this._size[0]), u._swapRows(o, l, this._data), this;
    }, u._swapRows = function(o, l, g) {
      var v = g[o];
      g[o] = g[l], g[l] = v;
    };
    function c(o) {
      return mr(o) ? c(o.valueOf()) : br(o) ? o.map(c) : o;
    }
    return u;
  }, {
    isClass: true
  });
  function Vr(r, e, u) {
    if (!u) return mr(r) ? r.map((t) => e(t)) : Jt(r, e, true);
    var n = (t) => t === 0 ? t : e(t);
    return mr(r) ? r.map((t) => n(t)) : Jt(r, n, true);
  }
  var Yt = "isInteger", oi = [
    "typed"
  ], si = Y(Yt, oi, (r) => {
    var { typed: e } = r;
    return e(Yt, {
      number: Ar,
      BigNumber: function(n) {
        return n.isInt();
      },
      bigint: function(n) {
        return true;
      },
      Fraction: function(n) {
        return n.d === 1n;
      },
      "Array | Matrix": e.referToSelf((u) => (n) => Vr(n, u))
    });
  }), At = "number", He = "number, number";
  function tu(r) {
    return Math.abs(r);
  }
  tu.signature = At;
  function nu(r, e) {
    return r + e;
  }
  nu.signature = He;
  function uu(r, e) {
    return r - e;
  }
  uu.signature = He;
  function au(r, e) {
    return r * e;
  }
  au.signature = He;
  function iu(r) {
    return -r;
  }
  iu.signature = At;
  function vt(r) {
    return wa(r);
  }
  vt.signature = At;
  function ou(r, e) {
    return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
  }
  ou.signature = He;
  var fi = "number";
  function su(r) {
    return r > 0;
  }
  su.signature = fi;
  function pe(r, e) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (u <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (n < 0) throw new Error("Absolute tolerance must be at least 0");
    return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(u), n));
  }
  var Xt = "isPositive", li = [
    "typed",
    "config"
  ], ci = Y(Xt, li, (r) => {
    var { typed: e, config: u } = r;
    return e(Xt, {
      number: (n) => kr(n, 0, u.relTol, u.absTol) ? false : su(n),
      BigNumber: (n) => pe(n, new n.constructor(0), u.relTol, u.absTol) ? false : !n.isNeg() && !n.isZero() && !n.isNaN(),
      bigint: (n) => n > 0n,
      Fraction: (n) => n.s > 0n && n.n > 0n,
      Unit: e.referToSelf((n) => (t) => e.find(n, t.valueType())(t.value)),
      "Array | Matrix": e.referToSelf((n) => (t) => Vr(t, n))
    });
  }), Kt = "isZero", vi = [
    "typed",
    "equalScalar"
  ], Di = Y(Kt, vi, (r) => {
    var { typed: e, equalScalar: u } = r;
    return e(Kt, {
      "number | BigNumber | Complex | Fraction": (n) => u(n, 0),
      bigint: (n) => n === 0n,
      Unit: e.referToSelf((n) => (t) => e.find(n, t.valueType())(t.value)),
      "Array | Matrix": e.referToSelf((n) => (t) => Vr(t, n))
    });
  });
  function pi(r, e, u, n) {
    return kr(r.re, e.re, u, n) && kr(r.im, e.im, u, n);
  }
  var we = Y("compareUnits", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      "Unit, Unit": e.referToSelf((u) => (n, t) => {
        if (!n.equalBase(t)) throw new Error("Cannot compare units with different base");
        return e.find(u, [
          n.valueType(),
          t.valueType()
        ])(n.value, t.value);
      })
    };
  }), Le = "equalScalar", di = [
    "typed",
    "config"
  ], hi = Y(Le, di, (r) => {
    var { typed: e, config: u } = r, n = we({
      typed: e
    });
    return e(Le, {
      "boolean, boolean": function(a, s) {
        return a === s;
      },
      "number, number": function(a, s) {
        return kr(a, s, u.relTol, u.absTol);
      },
      "BigNumber, BigNumber": function(a, s) {
        return a.eq(s) || pe(a, s, u.relTol, u.absTol);
      },
      "bigint, bigint": function(a, s) {
        return a === s;
      },
      "Fraction, Fraction": function(a, s) {
        return a.equals(s);
      },
      "Complex, Complex": function(a, s) {
        return pi(a, s, u.relTol, u.absTol);
      }
    }, n);
  });
  Y(Le, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: u } = r;
    return e(Le, {
      "number, number": function(t, a) {
        return kr(t, a, u.relTol, u.absTol);
      }
    });
  });
  var mi = "SparseMatrix", gi = [
    "typed",
    "equalScalar",
    "Matrix"
  ], yi = Y(mi, gi, (r) => {
    var { typed: e, equalScalar: u, Matrix: n } = r;
    function t(i, d) {
      if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
      if (d && !Yr(d)) throw new Error("Invalid datatype: " + d);
      if (mr(i)) a(this, i, d);
      else if (i && br(i.index) && br(i.ptr) && br(i.size)) this._values = i.values, this._index = i.index, this._ptr = i.ptr, this._size = i.size, this._datatype = d || i.datatype;
      else if (br(i)) s(this, i, d);
      else {
        if (i) throw new TypeError("Unsupported type of data (" + Xr(i) + ")");
        this._values = [], this._index = [], this._ptr = [
          0
        ], this._size = [
          0,
          0
        ], this._datatype = d;
      }
    }
    function a(i, d, h) {
      d.type === "SparseMatrix" ? (i._values = d._values ? fr(d._values) : void 0, i._index = fr(d._index), i._ptr = fr(d._ptr), i._size = fr(d._size), i._datatype = h || d._datatype) : s(i, d.valueOf(), h || d._datatype);
    }
    function s(i, d, h) {
      i._values = [], i._index = [], i._ptr = [], i._datatype = h;
      var w = d.length, y = 0, C = u, F = 0;
      if (Yr(h) && (C = e.find(u, [
        h,
        h
      ]) || u, F = e.convert(0, h)), w > 0) {
        var A = 0;
        do {
          i._ptr.push(i._index.length);
          for (var b = 0; b < w; b++) {
            var E = d[b];
            if (br(E)) {
              if (A === 0 && y < E.length && (y = E.length), A < E.length) {
                var m = E[A];
                C(m, F) || (i._values.push(m), i._index.push(b));
              }
            } else A === 0 && y < 1 && (y = 1), C(E, F) || (i._values.push(E), i._index.push(b));
          }
          A++;
        } while (A < y);
      }
      i._ptr.push(i._index.length), i._size = [
        w,
        y
      ];
    }
    t.prototype = new n(), t.prototype.createSparseMatrix = function(i, d) {
      return new t(i, d);
    }, Object.defineProperty(t, "name", {
      value: "SparseMatrix"
    }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
      return Ke(this._values, Xr);
    }, t.prototype.storage = function() {
      return "sparse";
    }, t.prototype.datatype = function() {
      return this._datatype;
    }, t.prototype.create = function(i, d) {
      return new t(i, d);
    }, t.prototype.density = function() {
      var i = this._size[0], d = this._size[1];
      return i !== 0 && d !== 0 ? this._index.length / (i * d) : 0;
    }, t.prototype.subset = function(i, d, h) {
      if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
      switch (arguments.length) {
        case 1:
          return D(this, i);
        case 2:
        case 3:
          return f(this, i, d, h);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    };
    function D(i, d) {
      if (!dt(d)) throw new TypeError("Invalid index");
      var h = d.isScalar();
      if (h) return i.get(d.min());
      var w = d.size();
      if (w.length !== i._size.length) throw new lr(w.length, i._size.length);
      var y, C, F, A, b = d.min(), E = d.max();
      for (y = 0, C = i._size.length; y < C; y++) Cr(b[y], i._size[y]), Cr(E[y], i._size[y]);
      var m = i._values, B = i._index, _ = i._ptr, S = d.dimension(0), M = d.dimension(1), x = [], O = [];
      S.forEach(function(I, Q) {
        O[I] = Q[0], x[I] = true;
      });
      var N = m ? [] : void 0, P = [], z = [];
      return M.forEach(function(I) {
        for (z.push(P.length), F = _[I], A = _[I + 1]; F < A; F++) y = B[F], x[y] === true && (P.push(O[y]), N && N.push(m[F]));
      }), z.push(P.length), new t({
        values: N,
        index: P,
        ptr: z,
        size: w,
        datatype: i._datatype
      });
    }
    function f(i, d, h, w) {
      if (!d || d.isIndex !== true) throw new TypeError("Invalid index");
      var y = d.size(), C = d.isScalar(), F;
      if (mr(h) ? (F = h.size(), h = h.toArray()) : F = hr(h), C) {
        if (F.length !== 0) throw new TypeError("Scalar expected");
        i.set(d.min(), h, w);
      } else {
        if (y.length !== 1 && y.length !== 2) throw new lr(y.length, i._size.length, "<");
        if (F.length < y.length) {
          for (var A = 0, b = 0; y[A] === 1 && F[A] === 1; ) A++;
          for (; y[A] === 1; ) b++, A++;
          h = Xn(h, y.length, b, F);
        }
        if (!te(y, F)) throw new lr(y, F, ">");
        if (y.length === 1) {
          var E = d.dimension(0);
          E.forEach(function(_, S) {
            Cr(_), i.set([
              _,
              0
            ], h[S[0]], w);
          });
        } else {
          var m = d.dimension(0), B = d.dimension(1);
          m.forEach(function(_, S) {
            Cr(_), B.forEach(function(M, x) {
              Cr(M), i.set([
                _,
                M
              ], h[S[0]][x[0]], w);
            });
          });
        }
      }
      return i;
    }
    t.prototype.get = function(i) {
      if (!br(i)) throw new TypeError("Array expected");
      if (i.length !== this._size.length) throw new lr(i.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
      var d = i[0], h = i[1];
      Cr(d, this._size[0]), Cr(h, this._size[1]);
      var w = c(d, this._ptr[h], this._ptr[h + 1], this._index);
      return w < this._ptr[h + 1] && this._index[w] === d ? this._values[w] : 0;
    }, t.prototype.set = function(i, d, h) {
      if (!br(i)) throw new TypeError("Array expected");
      if (i.length !== this._size.length) throw new lr(i.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
      var w = i[0], y = i[1], C = this._size[0], F = this._size[1], A = u, b = 0;
      Yr(this._datatype) && (A = e.find(u, [
        this._datatype,
        this._datatype
      ]) || u, b = e.convert(0, this._datatype)), (w > C - 1 || y > F - 1) && (g(this, Math.max(w + 1, C), Math.max(y + 1, F), h), C = this._size[0], F = this._size[1]), Cr(w, C), Cr(y, F);
      var E = c(w, this._ptr[y], this._ptr[y + 1], this._index);
      return E < this._ptr[y + 1] && this._index[E] === w ? A(d, b) ? o(E, y, this._values, this._index, this._ptr) : this._values[E] = d : A(d, b) || l(E, w, y, d, this._values, this._index, this._ptr), this;
    };
    function c(i, d, h, w) {
      if (h - d === 0) return h;
      for (var y = d; y < h; y++) if (w[y] === i) return y;
      return d;
    }
    function o(i, d, h, w, y) {
      h.splice(i, 1), w.splice(i, 1);
      for (var C = d + 1; C < y.length; C++) y[C]--;
    }
    function l(i, d, h, w, y, C, F) {
      y.splice(i, 0, w), C.splice(i, 0, d);
      for (var A = h + 1; A < F.length; A++) F[A]++;
    }
    t.prototype.resize = function(i, d, h) {
      if (!qe(i)) throw new TypeError("Array or Matrix expected");
      var w = i.valueOf().map((C) => Array.isArray(C) && C.length === 1 ? C[0] : C);
      if (w.length !== 2) throw new Error("Only two dimensions matrix are supported");
      w.forEach(function(C) {
        if (!yr(C) || !Ar(C) || C < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Er(w) + ")");
      });
      var y = h ? this.clone() : this;
      return g(y, w[0], w[1], d);
    };
    function g(i, d, h, w) {
      var y = w || 0, C = u, F = 0;
      Yr(i._datatype) && (C = e.find(u, [
        i._datatype,
        i._datatype
      ]) || u, F = e.convert(0, i._datatype), y = e.convert(y, i._datatype));
      var A = !C(y, F), b = i._size[0], E = i._size[1], m, B, _;
      if (h > E) {
        for (B = E; B < h; B++) if (i._ptr[B] = i._values.length, A) for (m = 0; m < b; m++) i._values.push(y), i._index.push(m);
        i._ptr[h] = i._values.length;
      } else h < E && (i._ptr.splice(h + 1, E - h), i._values.splice(i._ptr[h], i._values.length), i._index.splice(i._ptr[h], i._index.length));
      if (E = h, d > b) {
        if (A) {
          var S = 0;
          for (B = 0; B < E; B++) {
            i._ptr[B] = i._ptr[B] + S, _ = i._ptr[B + 1] + S;
            var M = 0;
            for (m = b; m < d; m++, M++) i._values.splice(_ + M, 0, y), i._index.splice(_ + M, 0, m), S++;
          }
          i._ptr[E] = i._values.length;
        }
      } else if (d < b) {
        var x = 0;
        for (B = 0; B < E; B++) {
          i._ptr[B] = i._ptr[B] - x;
          var O = i._ptr[B], N = i._ptr[B + 1] - x;
          for (_ = O; _ < N; _++) m = i._index[_], m > d - 1 && (i._values.splice(_, 1), i._index.splice(_, 1), x++);
        }
        i._ptr[B] = i._values.length;
      }
      return i._size[0] = d, i._size[1] = h, i;
    }
    t.prototype.reshape = function(i, d) {
      if (!br(i)) throw new TypeError("Array expected");
      if (i.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
      i.forEach(function(I) {
        if (!yr(I) || !Ar(I) || I <= -2 || I === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Er(i) + ")");
      });
      var h = this._size[0] * this._size[1];
      i = yt(i, h);
      var w = i[0] * i[1];
      if (h !== w) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
      var y = d ? this.clone() : this;
      if (this._size[0] === i[0] && this._size[1] === i[1]) return y;
      for (var C = [], F = 0; F < y._ptr.length; F++) for (var A = 0; A < y._ptr[F + 1] - y._ptr[F]; A++) C.push(F);
      for (var b = y._values.slice(), E = y._index.slice(), m = 0; m < y._index.length; m++) {
        var B = E[m], _ = C[m], S = B * y._size[1] + _;
        C[m] = S % i[1], E[m] = Math.floor(S / i[1]);
      }
      y._values.length = 0, y._index.length = 0, y._ptr.length = i[1] + 1, y._size = i.slice();
      for (var M = 0; M < y._ptr.length; M++) y._ptr[M] = 0;
      for (var x = 0; x < b.length; x++) {
        var O = E[x], N = C[x], P = b[x], z = c(O, y._ptr[N], y._ptr[N + 1], y._index);
        l(z, O, N, P, y._values, y._index, y._ptr);
      }
      return y;
    }, t.prototype.clone = function() {
      var i = new t({
        values: this._values ? fr(this._values) : void 0,
        index: fr(this._index),
        ptr: fr(this._ptr),
        size: fr(this._size),
        datatype: this._datatype
      });
      return i;
    }, t.prototype.size = function() {
      return this._size.slice(0);
    }, t.prototype.map = function(i, d) {
      if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
      var h = this, w = this._size[0], y = this._size[1], C = Ue(i, h, "map"), F = function(b, E, m) {
        return C(b, [
          E,
          m
        ], h);
      };
      return v(this, 0, w - 1, 0, y - 1, F, d);
    };
    function v(i, d, h, w, y, C, F) {
      var A = [], b = [], E = [], m = u, B = 0;
      Yr(i._datatype) && (m = e.find(u, [
        i._datatype,
        i._datatype
      ]) || u, B = e.convert(0, i._datatype));
      for (var _ = function(R, J, K) {
        var W = C(R, J, K);
        m(W, B) || (A.push(W), b.push(J));
      }, S = w; S <= y; S++) {
        E.push(A.length);
        var M = i._ptr[S], x = i._ptr[S + 1];
        if (F) for (var O = M; O < x; O++) {
          var N = i._index[O];
          N >= d && N <= h && _(i._values[O], N - d, S - w);
        }
        else {
          for (var P = {}, z = M; z < x; z++) {
            var I = i._index[z];
            P[I] = i._values[z];
          }
          for (var Q = d; Q <= h; Q++) {
            var H = Q in P ? P[Q] : 0;
            _(H, Q - d, S - w);
          }
        }
      }
      return E.push(A.length), new t({
        values: A,
        index: b,
        ptr: E,
        size: [
          h - d + 1,
          y - w + 1
        ]
      });
    }
    t.prototype.forEach = function(i, d) {
      if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
      for (var h = this, w = this._size[0], y = this._size[1], C = Ue(i, h, "forEach"), F = 0; F < y; F++) {
        var A = this._ptr[F], b = this._ptr[F + 1];
        if (d) for (var E = A; E < b; E++) {
          var m = this._index[E];
          C(this._values[E], [
            m,
            F
          ], h);
        }
        else {
          for (var B = {}, _ = A; _ < b; _++) {
            var S = this._index[_];
            B[S] = this._values[_];
          }
          for (var M = 0; M < w; M++) {
            var x = M in B ? B[M] : 0;
            C(x, [
              M,
              F
            ], h);
          }
        }
      }
    }, t.prototype[Symbol.iterator] = function* () {
      if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
      for (var i = this._size[1], d = 0; d < i; d++) for (var h = this._ptr[d], w = this._ptr[d + 1], y = h; y < w; y++) {
        var C = this._index[y];
        yield {
          value: this._values[y],
          index: [
            C,
            d
          ]
        };
      }
    }, t.prototype.toArray = function() {
      return p(this._values, this._index, this._ptr, this._size, true);
    }, t.prototype.valueOf = function() {
      return p(this._values, this._index, this._ptr, this._size, false);
    };
    function p(i, d, h, w, y) {
      var C = w[0], F = w[1], A = [], b, E;
      for (b = 0; b < C; b++) for (A[b] = [], E = 0; E < F; E++) A[b][E] = 0;
      for (E = 0; E < F; E++) for (var m = h[E], B = h[E + 1], _ = m; _ < B; _++) b = d[_], A[b][E] = i ? y ? fr(i[_]) : i[_] : 1;
      return A;
    }
    return t.prototype.format = function(i) {
      for (var d = this._size[0], h = this._size[1], w = this.density(), y = "Sparse Matrix [" + Er(d, i) + " x " + Er(h, i) + "] density: " + Er(w, i) + `
`, C = 0; C < h; C++) for (var F = this._ptr[C], A = this._ptr[C + 1], b = F; b < A; b++) {
        var E = this._index[b];
        y += `
    (` + Er(E, i) + ", " + Er(C, i) + ") ==> " + (this._values ? Er(this._values[b], i) : "X");
      }
      return y;
    }, t.prototype.toString = function() {
      return Er(this.toArray());
    }, t.prototype.toJSON = function() {
      return {
        mathjs: "SparseMatrix",
        values: this._values,
        index: this._index,
        ptr: this._ptr,
        size: this._size,
        datatype: this._datatype
      };
    }, t.prototype.diagonal = function(i) {
      if (i) {
        if (_r(i) && (i = i.toNumber()), !yr(i) || !Ar(i)) throw new TypeError("The parameter k must be an integer number");
      } else i = 0;
      var d = i > 0 ? i : 0, h = i < 0 ? -i : 0, w = this._size[0], y = this._size[1], C = Math.min(w - h, y - d), F = [], A = [], b = [];
      b[0] = 0;
      for (var E = d; E < y && F.length < C; E++) for (var m = this._ptr[E], B = this._ptr[E + 1], _ = m; _ < B; _++) {
        var S = this._index[_];
        if (S === E - d + h) {
          F.push(this._values[_]), A[F.length - 1] = S - h;
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
    }, t.fromJSON = function(i) {
      return new t(i);
    }, t.diagonal = function(i, d, h, w, y) {
      if (!br(i)) throw new TypeError("Array expected, size parameter");
      if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (i = i.map(function(I) {
        if (_r(I) && (I = I.toNumber()), !yr(I) || !Ar(I) || I < 1) throw new Error("Size values must be positive integers");
        return I;
      }), h) {
        if (_r(h) && (h = h.toNumber()), !yr(h) || !Ar(h)) throw new TypeError("The parameter k must be an integer number");
      } else h = 0;
      var C = u, F = 0;
      Yr(y) && (C = e.find(u, [
        y,
        y
      ]) || u, F = e.convert(0, y));
      var A = h > 0 ? h : 0, b = h < 0 ? -h : 0, E = i[0], m = i[1], B = Math.min(E - b, m - A), _;
      if (br(d)) {
        if (d.length !== B) throw new Error("Invalid value array length");
        _ = function(Q) {
          return d[Q];
        };
      } else if (mr(d)) {
        var S = d.size();
        if (S.length !== 1 || S[0] !== B) throw new Error("Invalid matrix length");
        _ = function(Q) {
          return d.get([
            Q
          ]);
        };
      } else _ = function() {
        return d;
      };
      for (var M = [], x = [], O = [], N = 0; N < m; N++) {
        O.push(M.length);
        var P = N - A;
        if (P >= 0 && P < B) {
          var z = _(P);
          C(z, F) || (x.push(P + b), M.push(z));
        }
      }
      return O.push(M.length), new t({
        values: M,
        index: x,
        ptr: O,
        size: [
          E,
          m
        ]
      });
    }, t.prototype.swapRows = function(i, d) {
      if (!yr(i) || !Ar(i) || !yr(d) || !Ar(d)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return Cr(i, this._size[0]), Cr(d, this._size[0]), t._swapRows(i, d, this._size[1], this._values, this._index, this._ptr), this;
    }, t._forEachRow = function(i, d, h, w, y) {
      for (var C = w[i], F = w[i + 1], A = C; A < F; A++) y(h[A], d[A]);
    }, t._swapRows = function(i, d, h, w, y, C) {
      for (var F = 0; F < h; F++) {
        var A = C[F], b = C[F + 1], E = c(i, A, b, y), m = c(d, A, b, y);
        if (E < b && m < b && y[E] === i && y[m] === d) {
          if (w) {
            var B = w[E];
            w[E] = w[m], w[m] = B;
          }
          continue;
        }
        if (E < b && y[E] === i && (m >= b || y[m] !== d)) {
          var _ = w ? w[E] : void 0;
          y.splice(m, 0, d), w && w.splice(m, 0, _), y.splice(m <= E ? E + 1 : E, 1), w && w.splice(m <= E ? E + 1 : E, 1);
          continue;
        }
        if (m < b && y[m] === d && (E >= b || y[E] !== i)) {
          var S = w ? w[m] : void 0;
          y.splice(E, 0, i), w && w.splice(E, 0, S), y.splice(E <= m ? m + 1 : m, 1), w && w.splice(E <= m ? m + 1 : m, 1);
        }
      }
    }, t;
  }, {
    isClass: true
  }), Ai = "number", Fi = [
    "typed"
  ];
  function Ei(r) {
    var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
    if (e) {
      var u = {
        "0b": 2,
        "0o": 8,
        "0x": 16
      }[e[1]], n = e[2], t = e[3];
      return {
        input: r,
        radix: u,
        integerPart: n,
        fractionalPart: t
      };
    } else return null;
  }
  function wi(r) {
    for (var e = parseInt(r.integerPart, r.radix), u = 0, n = 0; n < r.fractionalPart.length; n++) {
      var t = parseInt(r.fractionalPart[n], r.radix);
      u += t / Math.pow(r.radix, n + 1);
    }
    var a = e + u;
    if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
    return a;
  }
  var bi = Y(Ai, Fi, (r) => {
    var { typed: e } = r, u = e("number", {
      "": function() {
        return 0;
      },
      number: function(t) {
        return t;
      },
      string: function(t) {
        if (t === "NaN") return NaN;
        var a = Ei(t);
        if (a) return wi(a);
        var s = 0, D = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        D && (s = Number(D[2]), t = D[1]);
        var f = Number(t);
        if (isNaN(f)) throw new SyntaxError('String "' + t + '" is not a valid number');
        if (D) {
          if (f > 2 ** s - 1) throw new SyntaxError('String "'.concat(t, '" is out of range'));
          f >= 2 ** (s - 1) && (f = f - 2 ** s);
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
      Unit: e.referToSelf((n) => (t) => {
        var a = t.clone();
        return a.value = n(t.value), a;
      }),
      null: function(t) {
        return 0;
      },
      "Unit, string | Unit": function(t, a) {
        return t.toNumber(a);
      },
      "Array | Matrix": e.referToSelf((n) => (t) => Vr(t, n))
    });
    return u.fromJSON = function(n) {
      return parseFloat(n.value);
    }, u;
  }), Ci = "bignumber", _i = [
    "typed",
    "BigNumber"
  ], Bi = Y(Ci, _i, (r) => {
    var { typed: e, BigNumber: u } = r;
    return e("bignumber", {
      "": function() {
        return new u(0);
      },
      number: function(t) {
        return new u(t + "");
      },
      string: function(t) {
        var a = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        if (a) {
          var s = a[2], D = u(a[1]), f = new u(2).pow(Number(s));
          if (D.gt(f.sub(1))) throw new SyntaxError('String "'.concat(t, '" is out of range'));
          var c = new u(2).pow(Number(s) - 1);
          return D.gte(c) ? D.sub(f) : D;
        }
        return new u(t);
      },
      BigNumber: function(t) {
        return t;
      },
      bigint: function(t) {
        return new u(t.toString());
      },
      Unit: e.referToSelf((n) => (t) => {
        var a = t.clone();
        return a.value = n(t.value), a;
      }),
      Fraction: function(t) {
        return new u(String(t.n)).div(String(t.d)).times(String(t.s));
      },
      null: function(t) {
        return new u(0);
      },
      "Array | Matrix": e.referToSelf((n) => (t) => Vr(t, n))
    });
  }), Si = "complex", xi = [
    "typed",
    "Complex"
  ], Mi = Y(Si, xi, (r) => {
    var { typed: e, Complex: u } = r;
    return e("complex", {
      "": function() {
        return u.ZERO;
      },
      number: function(t) {
        return new u(t, 0);
      },
      "number, number": function(t, a) {
        return new u(t, a);
      },
      "BigNumber, BigNumber": function(t, a) {
        return new u(t.toNumber(), a.toNumber());
      },
      Fraction: function(t) {
        return new u(t.valueOf(), 0);
      },
      Complex: function(t) {
        return t.clone();
      },
      string: function(t) {
        return u(t);
      },
      null: function(t) {
        return u(0);
      },
      Object: function(t) {
        if ("re" in t && "im" in t) return new u(t.re, t.im);
        if ("r" in t && "phi" in t || "abs" in t && "arg" in t) return new u(t);
        throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
      },
      "Array | Matrix": e.referToSelf((n) => (t) => Vr(t, n))
    });
  }), Ni = "fraction", Ti = [
    "typed",
    "Fraction"
  ], zi = Y(Ni, Ti, (r) => {
    var { typed: e, Fraction: u } = r;
    return e("fraction", {
      number: function(t) {
        if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");
        return new u(t);
      },
      string: function(t) {
        return new u(t);
      },
      "number, number": function(t, a) {
        return new u(t, a);
      },
      "bigint, bigint": function(t, a) {
        return new u(t, a);
      },
      null: function(t) {
        return new u(0);
      },
      BigNumber: function(t) {
        return new u(t.toString());
      },
      bigint: function(t) {
        return new u(t.toString());
      },
      Fraction: function(t) {
        return t;
      },
      Unit: e.referToSelf((n) => (t) => {
        var a = t.clone();
        return a.value = n(t.value), a;
      }),
      Object: function(t) {
        return new u(t);
      },
      "Array | Matrix": e.referToSelf((n) => (t) => Vr(t, n))
    });
  }), Ht = "matrix", Oi = [
    "typed",
    "Matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], $i = Y(Ht, Oi, (r) => {
    var { typed: e, Matrix: u, DenseMatrix: n, SparseMatrix: t } = r;
    return e(Ht, {
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
    function a(s, D, f) {
      if (D === "dense" || D === "default" || D === void 0) return new n(s, f);
      if (D === "sparse") return new t(s, f);
      throw new TypeError("Unknown matrix type " + JSON.stringify(D) + ".");
    }
  }), kt = "matrixFromColumns", Ii = [
    "typed",
    "matrix",
    "flatten",
    "size"
  ], Ri = Y(kt, Ii, (r) => {
    var { typed: e, matrix: u, flatten: n, size: t } = r;
    return e(kt, {
      "...Array": function(f) {
        return a(f);
      },
      "...Matrix": function(f) {
        return u(a(f.map((c) => c.toArray())));
      }
    });
    function a(D) {
      if (D.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
      for (var f = s(D[0]), c = [], o = 0; o < f; o++) c[o] = [];
      for (var l of D) {
        var g = s(l);
        if (g !== f) throw new TypeError("The vectors had different length: " + (f | 0) + " \u2260 " + (g | 0));
        for (var v = n(l), p = 0; p < f; p++) c[p].push(v[p]);
      }
      return c;
    }
    function s(D) {
      var f = t(D);
      if (f.length === 1) return f[0];
      if (f.length === 2) {
        if (f[0] === 1) return f[1];
        if (f[1] === 1) return f[0];
        throw new TypeError("At least one of the arguments is not a vector.");
      } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
    }
  }), jt = "unaryMinus", qi = [
    "typed"
  ], Pi = Y(jt, qi, (r) => {
    var { typed: e } = r;
    return e(jt, {
      number: iu,
      "Complex | BigNumber | Fraction": (u) => u.neg(),
      bigint: (u) => -u,
      Unit: e.referToSelf((u) => (n) => {
        var t = n.clone();
        return t.value = e.find(u, t.valueType())(n.value), t;
      }),
      "Array | Matrix": e.referToSelf((u) => (n) => Vr(n, u, true))
    });
  }), rn = "abs", Ui = [
    "typed"
  ], Li = Y(rn, Ui, (r) => {
    var { typed: e } = r;
    return e(rn, {
      number: tu,
      "Complex | BigNumber | Fraction | Unit": (u) => u.abs(),
      bigint: (u) => u < 0n ? -u : u,
      "Array | Matrix": e.referToSelf((u) => (n) => Vr(n, u, true))
    });
  }), en = "addScalar", Wi = [
    "typed"
  ], Vi = Y(en, Wi, (r) => {
    var { typed: e } = r;
    return e(en, {
      "number, number": nu,
      "Complex, Complex": function(n, t) {
        return n.add(t);
      },
      "BigNumber, BigNumber": function(n, t) {
        return n.plus(t);
      },
      "bigint, bigint": function(n, t) {
        return n + t;
      },
      "Fraction, Fraction": function(n, t) {
        return n.add(t);
      },
      "Unit, Unit": e.referToSelf((u) => (n, t) => {
        if (n.value === null || n.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!n.equalBase(t)) throw new Error("Units do not match");
        var a = n.clone();
        return a.value = e.find(u, [
          a.valueType(),
          t.valueType()
        ])(a.value, t.value), a.fixPrefix = false, a;
      })
    });
  }), tn = "subtractScalar", Zi = [
    "typed"
  ], Gi = Y(tn, Zi, (r) => {
    var { typed: e } = r;
    return e(tn, {
      "number, number": uu,
      "Complex, Complex": function(n, t) {
        return n.sub(t);
      },
      "BigNumber, BigNumber": function(n, t) {
        return n.minus(t);
      },
      "bigint, bigint": function(n, t) {
        return n - t;
      },
      "Fraction, Fraction": function(n, t) {
        return n.sub(t);
      },
      "Unit, Unit": e.referToSelf((u) => (n, t) => {
        if (n.value === null || n.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!n.equalBase(t)) throw new Error("Units do not match");
        var a = n.clone();
        return a.value = e.find(u, [
          a.valueType(),
          t.valueType()
        ])(a.value, t.value), a.fixPrefix = false, a;
      })
    });
  }), Ji = "matAlgo11xS0s", Qi = [
    "typed",
    "equalScalar"
  ], fu = Y(Ji, Qi, (r) => {
    var { typed: e, equalScalar: u } = r;
    return function(t, a, s, D) {
      var f = t._values, c = t._index, o = t._ptr, l = t._size, g = t._datatype;
      if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = l[0], p = l[1], i, d = u, h = 0, w = s;
      typeof g == "string" && (i = g, d = e.find(u, [
        i,
        i
      ]), h = e.convert(0, i), a = e.convert(a, i), w = e.find(s, [
        i,
        i
      ]));
      for (var y = [], C = [], F = [], A = 0; A < p; A++) {
        F[A] = C.length;
        for (var b = o[A], E = o[A + 1], m = b; m < E; m++) {
          var B = c[m], _ = D ? w(a, f[m]) : w(f[m], a);
          d(_, h) || (C.push(B), y.push(_));
        }
      }
      return F[p] = C.length, t.createSparseMatrix({
        values: y,
        index: C,
        ptr: F,
        size: [
          v,
          p
        ],
        datatype: i
      });
    };
  }), Yi = "matAlgo12xSfs", Xi = [
    "typed",
    "DenseMatrix"
  ], de = Y(Yi, Xi, (r) => {
    var { typed: e, DenseMatrix: u } = r;
    return function(t, a, s, D) {
      var f = t._values, c = t._index, o = t._ptr, l = t._size, g = t._datatype;
      if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = l[0], p = l[1], i, d = s;
      typeof g == "string" && (i = g, a = e.convert(a, i), d = e.find(s, [
        i,
        i
      ]));
      for (var h = [], w = [], y = [], C = 0; C < p; C++) {
        for (var F = C + 1, A = o[C], b = o[C + 1], E = A; E < b; E++) {
          var m = c[E];
          w[m] = f[E], y[m] = F;
        }
        for (var B = 0; B < v; B++) C === 0 && (h[B] = []), y[B] === F ? h[B][C] = D ? d(a, w[B]) : d(w[B], a) : h[B][C] = D ? d(a, 0) : d(0, a);
      }
      return new u({
        data: h,
        size: [
          v,
          p
        ],
        datatype: i
      });
    };
  }), Ki = "matAlgo14xDs", Hi = [
    "typed"
  ], Ft = Y(Ki, Hi, (r) => {
    var { typed: e } = r;
    return function(t, a, s, D) {
      var f = t._data, c = t._size, o = t._datatype, l, g = s;
      typeof o == "string" && (l = o, a = e.convert(a, l), g = e.find(s, [
        l,
        l
      ]));
      var v = c.length > 0 ? u(g, 0, c, c[0], f, a, D) : [];
      return t.createDenseMatrix({
        data: v,
        size: fr(c),
        datatype: l
      });
    };
    function u(n, t, a, s, D, f, c) {
      var o = [];
      if (t === a.length - 1) for (var l = 0; l < s; l++) o[l] = c ? n(f, D[l]) : n(D[l], f);
      else for (var g = 0; g < s; g++) o[g] = u(n, t + 1, a, a[t + 1], D[g], f, c);
      return o;
    }
  }), ki = "matAlgo03xDSf", ji = [
    "typed"
  ], he = Y(ki, ji, (r) => {
    var { typed: e } = r;
    return function(n, t, a, s) {
      var D = n._data, f = n._size, c = n._datatype || n.getDataType(), o = t._values, l = t._index, g = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
      if (f.length !== v.length) throw new lr(f.length, v.length);
      if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
      if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var i = f[0], d = f[1], h, w = 0, y = a;
      typeof c == "string" && c === p && c !== "mixed" && (h = c, w = e.convert(0, h), y = e.find(a, [
        h,
        h
      ]));
      for (var C = [], F = 0; F < i; F++) C[F] = [];
      for (var A = [], b = [], E = 0; E < d; E++) {
        for (var m = E + 1, B = g[E], _ = g[E + 1], S = B; S < _; S++) {
          var M = l[S];
          A[M] = s ? y(o[S], D[M][E]) : y(D[M][E], o[S]), b[M] = m;
        }
        for (var x = 0; x < i; x++) b[x] === m ? C[x][E] = A[x] : C[x][E] = s ? y(w, D[x][E]) : y(D[x][E], w);
      }
      return n.createDenseMatrix({
        data: C,
        size: [
          i,
          d
        ],
        datatype: c === n._datatype && p === t._datatype ? h : void 0
      });
    };
  }), ro = "matAlgo05xSfSf", eo = [
    "typed",
    "equalScalar"
  ], to = Y(ro, eo, (r) => {
    var { typed: e, equalScalar: u } = r;
    return function(t, a, s) {
      var D = t._values, f = t._index, c = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), g = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
      if (o.length !== i.length) throw new lr(o.length, i.length);
      if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
      var h = o[0], w = o[1], y, C = u, F = 0, A = s;
      typeof l == "string" && l === d && l !== "mixed" && (y = l, C = e.find(u, [
        y,
        y
      ]), F = e.convert(0, y), A = e.find(s, [
        y,
        y
      ]));
      var b = D && g ? [] : void 0, E = [], m = [], B = b ? [] : void 0, _ = b ? [] : void 0, S = [], M = [], x, O, N, P;
      for (O = 0; O < w; O++) {
        m[O] = E.length;
        var z = O + 1;
        for (N = c[O], P = c[O + 1]; N < P; N++) x = f[N], E.push(x), S[x] = z, B && (B[x] = D[N]);
        for (N = p[O], P = p[O + 1]; N < P; N++) x = v[N], S[x] !== z && E.push(x), M[x] = z, _ && (_[x] = g[N]);
        if (b) for (N = m[O]; N < E.length; ) {
          x = E[N];
          var I = S[x], Q = M[x];
          if (I === z || Q === z) {
            var H = I === z ? B[x] : F, T = Q === z ? _[x] : F, R = A(H, T);
            C(R, F) ? E.splice(N, 1) : (b.push(R), N++);
          }
        }
      }
      return m[w] = E.length, t.createSparseMatrix({
        values: b,
        index: E,
        ptr: m,
        size: [
          h,
          w
        ],
        datatype: l === t._datatype && d === a._datatype ? y : void 0
      });
    };
  }), no = "matAlgo13xDD", uo = [
    "typed"
  ], ao = Y(no, uo, (r) => {
    var { typed: e } = r;
    return function(t, a, s) {
      var D = t._data, f = t._size, c = t._datatype, o = a._data, l = a._size, g = a._datatype, v = [];
      if (f.length !== l.length) throw new lr(f.length, l.length);
      for (var p = 0; p < f.length; p++) {
        if (f[p] !== l[p]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + l + ")");
        v[p] = f[p];
      }
      var i, d = s;
      typeof c == "string" && c === g && (i = c, d = e.find(s, [
        i,
        i
      ]));
      var h = v.length > 0 ? u(d, 0, v, v[0], D, o) : [];
      return t.createDenseMatrix({
        data: h,
        size: v,
        datatype: i
      });
    };
    function u(n, t, a, s, D, f) {
      var c = [];
      if (t === a.length - 1) for (var o = 0; o < s; o++) c[o] = n(D[o], f[o]);
      else for (var l = 0; l < s; l++) c[l] = u(n, t + 1, a, a[t + 1], D[l], f[l]);
      return c;
    }
  });
  function xr(r, e) {
    if (te(r.size(), e.size())) return [
      r,
      e
    ];
    var u = jn(r.size(), e.size());
    return [
      r,
      e
    ].map((n) => io(n, u));
  }
  function io(r, e) {
    return te(r.size(), e) ? r : r.create(ct(r.valueOf(), e), r.datatype());
  }
  var oo = "matrixAlgorithmSuite", so = [
    "typed",
    "matrix"
  ], ie = Y(oo, so, (r) => {
    var { typed: e, matrix: u } = r, n = ao({
      typed: e
    }), t = Ft({
      typed: e
    });
    return function(s) {
      var D = s.elop, f = s.SD || s.DS, c;
      D ? (c = {
        "DenseMatrix, DenseMatrix": (v, p) => n(...xr(v, p), D),
        "Array, Array": (v, p) => n(...xr(u(v), u(p)), D).valueOf(),
        "Array, DenseMatrix": (v, p) => n(...xr(u(v), p), D),
        "DenseMatrix, Array": (v, p) => n(...xr(v, u(p)), D)
      }, s.SS && (c["SparseMatrix, SparseMatrix"] = (v, p) => s.SS(...xr(v, p), D, false)), s.DS && (c["DenseMatrix, SparseMatrix"] = (v, p) => s.DS(...xr(v, p), D, false), c["Array, SparseMatrix"] = (v, p) => s.DS(...xr(u(v), p), D, false)), f && (c["SparseMatrix, DenseMatrix"] = (v, p) => f(...xr(p, v), D, true), c["SparseMatrix, Array"] = (v, p) => f(...xr(u(p), v), D, true))) : (c = {
        "DenseMatrix, DenseMatrix": e.referToSelf((v) => (p, i) => n(...xr(p, i), v)),
        "Array, Array": e.referToSelf((v) => (p, i) => n(...xr(u(p), u(i)), v).valueOf()),
        "Array, DenseMatrix": e.referToSelf((v) => (p, i) => n(...xr(u(p), i), v)),
        "DenseMatrix, Array": e.referToSelf((v) => (p, i) => n(...xr(p, u(i)), v))
      }, s.SS && (c["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.SS(...xr(p, i), v, false))), s.DS && (c["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...xr(p, i), v, false)), c["Array, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...xr(u(p), i), v, false))), f && (c["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (p, i) => f(...xr(i, p), v, true)), c["SparseMatrix, Array"] = e.referToSelf((v) => (p, i) => f(...xr(u(i), p), v, true))));
      var o = s.scalar || "any", l = s.Ds || s.Ss;
      l && (D ? (c["DenseMatrix," + o] = (v, p) => t(v, p, D, false), c[o + ", DenseMatrix"] = (v, p) => t(p, v, D, true), c["Array," + o] = (v, p) => t(u(v), p, D, false).valueOf(), c[o + ", Array"] = (v, p) => t(u(p), v, D, true).valueOf()) : (c["DenseMatrix," + o] = e.referToSelf((v) => (p, i) => t(p, i, v, false)), c[o + ", DenseMatrix"] = e.referToSelf((v) => (p, i) => t(i, p, v, true)), c["Array," + o] = e.referToSelf((v) => (p, i) => t(u(p), i, v, false).valueOf()), c[o + ", Array"] = e.referToSelf((v) => (p, i) => t(u(i), p, v, true).valueOf())));
      var g = s.sS !== void 0 ? s.sS : s.Ss;
      return D ? (s.Ss && (c["SparseMatrix," + o] = (v, p) => s.Ss(v, p, D, false)), g && (c[o + ", SparseMatrix"] = (v, p) => g(p, v, D, true))) : (s.Ss && (c["SparseMatrix," + o] = e.referToSelf((v) => (p, i) => s.Ss(p, i, v, false))), g && (c[o + ", SparseMatrix"] = e.referToSelf((v) => (p, i) => g(i, p, v, true)))), D && D.signatures && Ln(c, D.signatures), c;
    };
  }), fo = "matAlgo01xDSid", lo = [
    "typed"
  ], lu = Y(fo, lo, (r) => {
    var { typed: e } = r;
    return function(n, t, a, s) {
      var D = n._data, f = n._size, c = n._datatype || n.getDataType(), o = t._values, l = t._index, g = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
      if (f.length !== v.length) throw new lr(f.length, v.length);
      if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
      if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var i = f[0], d = f[1], h = typeof c == "string" && c !== "mixed" && c === p ? c : void 0, w = h ? e.find(a, [
        h,
        h
      ]) : a, y, C, F = [];
      for (y = 0; y < i; y++) F[y] = [];
      var A = [], b = [];
      for (C = 0; C < d; C++) {
        for (var E = C + 1, m = g[C], B = g[C + 1], _ = m; _ < B; _++) y = l[_], A[y] = s ? w(o[_], D[y][C]) : w(D[y][C], o[_]), b[y] = E;
        for (y = 0; y < i; y++) b[y] === E ? F[y][C] = A[y] : F[y][C] = D[y][C];
      }
      return n.createDenseMatrix({
        data: F,
        size: [
          i,
          d
        ],
        datatype: c === n._datatype && p === t._datatype ? h : void 0
      });
    };
  }), co = "matAlgo04xSidSid", vo = [
    "typed",
    "equalScalar"
  ], Do = Y(co, vo, (r) => {
    var { typed: e, equalScalar: u } = r;
    return function(t, a, s) {
      var D = t._values, f = t._index, c = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), g = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
      if (o.length !== i.length) throw new lr(o.length, i.length);
      if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
      var h = o[0], w = o[1], y, C = u, F = 0, A = s;
      typeof l == "string" && l === d && l !== "mixed" && (y = l, C = e.find(u, [
        y,
        y
      ]), F = e.convert(0, y), A = e.find(s, [
        y,
        y
      ]));
      var b = D && g ? [] : void 0, E = [], m = [], B = D && g ? [] : void 0, _ = D && g ? [] : void 0, S = [], M = [], x, O, N, P, z;
      for (O = 0; O < w; O++) {
        m[O] = E.length;
        var I = O + 1;
        for (P = c[O], z = c[O + 1], N = P; N < z; N++) x = f[N], E.push(x), S[x] = I, B && (B[x] = D[N]);
        for (P = p[O], z = p[O + 1], N = P; N < z; N++) if (x = v[N], S[x] === I) {
          if (B) {
            var Q = A(B[x], g[N]);
            C(Q, F) ? S[x] = null : B[x] = Q;
          }
        } else E.push(x), M[x] = I, _ && (_[x] = g[N]);
        if (B && _) for (N = m[O]; N < E.length; ) x = E[N], S[x] === I ? (b[N] = B[x], N++) : M[x] === I ? (b[N] = _[x], N++) : E.splice(N, 1);
      }
      return m[w] = E.length, t.createSparseMatrix({
        values: b,
        index: E,
        ptr: m,
        size: [
          h,
          w
        ],
        datatype: l === t._datatype && d === a._datatype ? y : void 0
      });
    };
  }), po = "matAlgo10xSids", ho = [
    "typed",
    "DenseMatrix"
  ], cu = Y(po, ho, (r) => {
    var { typed: e, DenseMatrix: u } = r;
    return function(t, a, s, D) {
      var f = t._values, c = t._index, o = t._ptr, l = t._size, g = t._datatype;
      if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = l[0], p = l[1], i, d = s;
      typeof g == "string" && (i = g, a = e.convert(a, i), d = e.find(s, [
        i,
        i
      ]));
      for (var h = [], w = [], y = [], C = 0; C < p; C++) {
        for (var F = C + 1, A = o[C], b = o[C + 1], E = A; E < b; E++) {
          var m = c[E];
          w[m] = f[E], y[m] = F;
        }
        for (var B = 0; B < v; B++) C === 0 && (h[B] = []), y[B] === F ? h[B][C] = D ? d(a, w[B]) : d(w[B], a) : h[B][C] = a;
      }
      return new u({
        data: h,
        size: [
          v,
          p
        ],
        datatype: i
      });
    };
  }), mo = "multiplyScalar", go = [
    "typed"
  ], yo = Y(mo, go, (r) => {
    var { typed: e } = r;
    return e("multiplyScalar", {
      "number, number": au,
      "Complex, Complex": function(n, t) {
        return n.mul(t);
      },
      "BigNumber, BigNumber": function(n, t) {
        return n.times(t);
      },
      "bigint, bigint": function(n, t) {
        return n * t;
      },
      "Fraction, Fraction": function(n, t) {
        return n.mul(t);
      },
      "number | Fraction | BigNumber | Complex, Unit": (u, n) => n.multiply(u),
      "Unit, number | Fraction | BigNumber | Complex | Unit": (u, n) => u.multiply(n)
    });
  }), nn = "multiply", Ao = [
    "typed",
    "matrix",
    "addScalar",
    "multiplyScalar",
    "equalScalar",
    "dot"
  ], Fo = Y(nn, Ao, (r) => {
    var { typed: e, matrix: u, addScalar: n, multiplyScalar: t, equalScalar: a, dot: s } = r, D = fu({
      typed: e,
      equalScalar: a
    }), f = Ft({
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
    function o(F, A, b) {
      if (b === 0) throw new Error("Cannot multiply two empty vectors");
      return s(F, A);
    }
    function l(F, A) {
      if (A.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
      return g(F, A);
    }
    function g(F, A) {
      var b = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._data, _ = A._size, S = A._datatype || A.getDataType(), M = E[0], x = _[1], O, N = n, P = t;
      m && S && m === S && typeof m == "string" && m !== "mixed" && (O = m, N = e.find(n, [
        O,
        O
      ]), P = e.find(t, [
        O,
        O
      ]));
      for (var z = [], I = 0; I < x; I++) {
        for (var Q = P(b[0], B[0][I]), H = 1; H < M; H++) Q = N(Q, P(b[H], B[H][I]));
        z[I] = Q;
      }
      return F.createDenseMatrix({
        data: z,
        size: [
          x
        ],
        datatype: m === F._datatype && S === A._datatype ? O : void 0
      });
    }
    var v = e("_multiplyMatrixVector", {
      "DenseMatrix, any": i,
      "SparseMatrix, any": w
    }), p = e("_multiplyMatrixMatrix", {
      "DenseMatrix, DenseMatrix": d,
      "DenseMatrix, SparseMatrix": h,
      "SparseMatrix, DenseMatrix": y,
      "SparseMatrix, SparseMatrix": C
    });
    function i(F, A) {
      var b = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._data, _ = A._datatype || A.getDataType(), S = E[0], M = E[1], x, O = n, N = t;
      m && _ && m === _ && typeof m == "string" && m !== "mixed" && (x = m, O = e.find(n, [
        x,
        x
      ]), N = e.find(t, [
        x,
        x
      ]));
      for (var P = [], z = 0; z < S; z++) {
        for (var I = b[z], Q = N(I[0], B[0]), H = 1; H < M; H++) Q = O(Q, N(I[H], B[H]));
        P[z] = Q;
      }
      return F.createDenseMatrix({
        data: P,
        size: [
          S
        ],
        datatype: m === F._datatype && _ === A._datatype ? x : void 0
      });
    }
    function d(F, A) {
      var b = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._data, _ = A._size, S = A._datatype || A.getDataType(), M = E[0], x = E[1], O = _[1], N, P = n, z = t;
      m && S && m === S && typeof m == "string" && m !== "mixed" && m !== "mixed" && (N = m, P = e.find(n, [
        N,
        N
      ]), z = e.find(t, [
        N,
        N
      ]));
      for (var I = [], Q = 0; Q < M; Q++) {
        var H = b[Q];
        I[Q] = [];
        for (var T = 0; T < O; T++) {
          for (var R = z(H[0], B[0][T]), J = 1; J < x; J++) R = P(R, z(H[J], B[J][T]));
          I[Q][T] = R;
        }
      }
      return F.createDenseMatrix({
        data: I,
        size: [
          M,
          O
        ],
        datatype: m === F._datatype && S === A._datatype ? N : void 0
      });
    }
    function h(F, A) {
      var b = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._values, _ = A._index, S = A._ptr, M = A._size, x = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
      if (!B) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
      var O = E[0], N = M[1], P, z = n, I = t, Q = a, H = 0;
      m && x && m === x && typeof m == "string" && m !== "mixed" && (P = m, z = e.find(n, [
        P,
        P
      ]), I = e.find(t, [
        P,
        P
      ]), Q = e.find(a, [
        P,
        P
      ]), H = e.convert(0, P));
      for (var T = [], R = [], J = [], K = A.createSparseMatrix({
        values: T,
        index: R,
        ptr: J,
        size: [
          O,
          N
        ],
        datatype: m === F._datatype && x === A._datatype ? P : void 0
      }), W = 0; W < N; W++) {
        J[W] = R.length;
        var q = S[W], V = S[W + 1];
        if (V > q) for (var Z = 0, L = 0; L < O; L++) {
          for (var k = L + 1, G = void 0, tr = q; tr < V; tr++) {
            var ur = _[tr];
            Z !== k ? (G = I(b[L][ur], B[tr]), Z = k) : G = z(G, I(b[L][ur], B[tr]));
          }
          Z === k && !Q(G, H) && (R.push(L), T.push(G));
        }
      }
      return J[N] = R.length, K;
    }
    function w(F, A) {
      var b = F._values, E = F._index, m = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
      if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var _ = A._data, S = A._datatype || A.getDataType(), M = F._size[0], x = A._size[0], O = [], N = [], P = [], z, I = n, Q = t, H = a, T = 0;
      B && S && B === S && typeof B == "string" && B !== "mixed" && (z = B, I = e.find(n, [
        z,
        z
      ]), Q = e.find(t, [
        z,
        z
      ]), H = e.find(a, [
        z,
        z
      ]), T = e.convert(0, z));
      var R = [], J = [];
      P[0] = 0;
      for (var K = 0; K < x; K++) {
        var W = _[K];
        if (!H(W, T)) for (var q = m[K], V = m[K + 1], Z = q; Z < V; Z++) {
          var L = E[Z];
          J[L] ? R[L] = I(R[L], Q(W, b[Z])) : (J[L] = true, N.push(L), R[L] = Q(W, b[Z]));
        }
      }
      for (var k = N.length, G = 0; G < k; G++) {
        var tr = N[G];
        O[G] = R[tr];
      }
      return P[1] = N.length, F.createSparseMatrix({
        values: O,
        index: N,
        ptr: P,
        size: [
          M,
          1
        ],
        datatype: B === F._datatype && S === A._datatype ? z : void 0
      });
    }
    function y(F, A) {
      var b = F._values, E = F._index, m = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
      if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var _ = A._data, S = A._datatype || A.getDataType(), M = F._size[0], x = A._size[0], O = A._size[1], N, P = n, z = t, I = a, Q = 0;
      B && S && B === S && typeof B == "string" && B !== "mixed" && (N = B, P = e.find(n, [
        N,
        N
      ]), z = e.find(t, [
        N,
        N
      ]), I = e.find(a, [
        N,
        N
      ]), Q = e.convert(0, N));
      for (var H = [], T = [], R = [], J = F.createSparseMatrix({
        values: H,
        index: T,
        ptr: R,
        size: [
          M,
          O
        ],
        datatype: B === F._datatype && S === A._datatype ? N : void 0
      }), K = [], W = [], q = 0; q < O; q++) {
        R[q] = T.length;
        for (var V = q + 1, Z = 0; Z < x; Z++) {
          var L = _[Z][q];
          if (!I(L, Q)) for (var k = m[Z], G = m[Z + 1], tr = k; tr < G; tr++) {
            var ur = E[tr];
            W[ur] !== V ? (W[ur] = V, T.push(ur), K[ur] = z(L, b[tr])) : K[ur] = P(K[ur], z(L, b[tr]));
          }
        }
        for (var nr = R[q], ar = T.length, or = nr; or < ar; or++) {
          var cr = T[or];
          H[or] = K[cr];
        }
      }
      return R[O] = T.length, J;
    }
    function C(F, A) {
      var b = F._values, E = F._index, m = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), _ = A._values, S = A._index, M = A._ptr, x = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), O = F._size[0], N = A._size[1], P = b && _, z, I = n, Q = t;
      B && x && B === x && typeof B == "string" && B !== "mixed" && (z = B, I = e.find(n, [
        z,
        z
      ]), Q = e.find(t, [
        z,
        z
      ]));
      for (var H = P ? [] : void 0, T = [], R = [], J = F.createSparseMatrix({
        values: H,
        index: T,
        ptr: R,
        size: [
          O,
          N
        ],
        datatype: B === F._datatype && x === A._datatype ? z : void 0
      }), K = P ? [] : void 0, W = [], q, V, Z, L, k, G, tr, ur, nr = 0; nr < N; nr++) {
        R[nr] = T.length;
        var ar = nr + 1;
        for (k = M[nr], G = M[nr + 1], L = k; L < G; L++) if (ur = S[L], P) for (V = m[ur], Z = m[ur + 1], q = V; q < Z; q++) tr = E[q], W[tr] !== ar ? (W[tr] = ar, T.push(tr), K[tr] = Q(_[L], b[q])) : K[tr] = I(K[tr], Q(_[L], b[q]));
        else for (V = m[ur], Z = m[ur + 1], q = V; q < Z; q++) tr = E[q], W[tr] !== ar && (W[tr] = ar, T.push(tr));
        if (P) for (var or = R[nr], cr = T.length, vr = or; vr < cr; vr++) {
          var Dr = T[vr];
          H[vr] = K[Dr];
        }
      }
      return R[N] = T.length, J;
    }
    return e(nn, t, {
      "Array, Array": e.referTo("Matrix, Matrix", (F) => (A, b) => {
        c(hr(A), hr(b));
        var E = F(u(A), u(b));
        return mr(E) ? E.valueOf() : E;
      }),
      "Matrix, Matrix": function(A, b) {
        var E = A.size(), m = b.size();
        return c(E, m), E.length === 1 ? m.length === 1 ? o(A, b, E[0]) : l(A, b) : m.length === 1 ? v(A, b) : p(A, b);
      },
      "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (A, b) => F(A, u(b))),
      "Array, Matrix": e.referToSelf((F) => (A, b) => F(u(A, b.storage()), b)),
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
        return f(u(A), b, t, false).valueOf();
      },
      "any, Array": function(A, b) {
        return f(u(b), A, t, true).valueOf();
      },
      "any, any": t,
      "any, any, ...any": e.referToSelf((F) => (A, b, E) => {
        for (var m = F(A, b), B = 0; B < E.length; B++) m = F(m, E[B]);
        return m;
      })
    });
  }), un = "sign", Eo = [
    "typed",
    "BigNumber",
    "Fraction",
    "complex"
  ], wo = Y(un, Eo, (r) => {
    var { typed: e, BigNumber: u, complex: n, Fraction: t } = r;
    return e(un, {
      number: vt,
      Complex: function(s) {
        return s.im === 0 ? n(vt(s.re)) : s.sign();
      },
      BigNumber: function(s) {
        return new u(s.cmp(0));
      },
      bigint: function(s) {
        return s > 0n ? 1n : s < 0n ? -1n : 0n;
      },
      Fraction: function(s) {
        return new t(s.s);
      },
      "Array | Matrix": e.referToSelf((a) => (s) => Vr(s, a, true)),
      Unit: e.referToSelf((a) => (s) => {
        if (!s._isDerived() && s.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
        return e.find(a, s.valueType())(s.value);
      })
    });
  }), bo = "sqrt", Co = [
    "config",
    "typed",
    "Complex"
  ], _o = Y(bo, Co, (r) => {
    var { config: e, typed: u, Complex: n } = r;
    return u("sqrt", {
      number: t,
      Complex: function(s) {
        return s.sqrt();
      },
      BigNumber: function(s) {
        return !s.isNegative() || e.predictable ? s.sqrt() : t(s.toNumber());
      },
      Unit: function(s) {
        return s.pow(0.5);
      }
    });
    function t(a) {
      return isNaN(a) ? NaN : a >= 0 || e.predictable ? Math.sqrt(a) : new n(a, 0).sqrt();
    }
  }), an = "subtract", Bo = [
    "typed",
    "matrix",
    "equalScalar",
    "subtractScalar",
    "unaryMinus",
    "DenseMatrix",
    "concat"
  ], So = Y(an, Bo, (r) => {
    var { typed: e, matrix: u, equalScalar: n, subtractScalar: t, unaryMinus: a, DenseMatrix: s, concat: D } = r, f = lu({
      typed: e
    }), c = he({
      typed: e
    }), o = to({
      typed: e,
      equalScalar: n
    }), l = cu({
      typed: e,
      DenseMatrix: s
    }), g = de({
      typed: e,
      DenseMatrix: s
    }), v = ie({
      typed: e,
      matrix: u,
      concat: D
    });
    return e(an, {
      "any, any": t
    }, v({
      elop: t,
      SS: o,
      DS: f,
      SD: c,
      Ss: g,
      sS: l
    }));
  }), xo = "matAlgo07xSSf", Mo = [
    "typed",
    "SparseMatrix"
  ], be = Y(xo, Mo, (r) => {
    var { typed: e, SparseMatrix: u } = r;
    return function(a, s, D) {
      var f = a._size, c = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), o = s._size, l = s._datatype || s._data === void 0 ? s._datatype : s.getDataType();
      if (f.length !== o.length) throw new lr(f.length, o.length);
      if (f[0] !== o[0] || f[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + o + ")");
      var g = f[0], v = f[1], p, i = 0, d = D;
      typeof c == "string" && c === l && c !== "mixed" && (p = c, i = e.convert(0, p), d = e.find(D, [
        p,
        p
      ]));
      for (var h = [], w = [], y = new Array(v + 1).fill(0), C = [], F = [], A = [], b = [], E = 0; E < v; E++) {
        var m = E + 1, B = 0;
        n(a, E, A, C, m), n(s, E, b, F, m);
        for (var _ = 0; _ < g; _++) {
          var S = A[_] === m ? C[_] : i, M = b[_] === m ? F[_] : i, x = d(S, M);
          x !== 0 && x !== false && (w.push(_), h.push(x), B++);
        }
        y[E + 1] = y[E] + B;
      }
      return new u({
        values: h,
        index: w,
        ptr: y,
        size: [
          g,
          v
        ],
        datatype: c === a._datatype && l === s._datatype ? p : void 0
      });
    };
    function n(t, a, s, D, f) {
      for (var c = t._values, o = t._index, l = t._ptr, g = l[a], v = l[a + 1]; g < v; g++) {
        var p = o[g];
        s[p] = f, D[p] = c[g];
      }
    }
  }), on = "conj", No = [
    "typed"
  ], To = Y(on, No, (r) => {
    var { typed: e } = r;
    return e(on, {
      "number | BigNumber | Fraction": (u) => u,
      Complex: (u) => u.conjugate(),
      "Array | Matrix": e.referToSelf((u) => (n) => Vr(n, u))
    });
  }), sn = "im", zo = [
    "typed"
  ], Oo = Y(sn, zo, (r) => {
    var { typed: e } = r;
    return e(sn, {
      number: () => 0,
      "BigNumber | Fraction": (u) => u.mul(0),
      Complex: (u) => u.im,
      "Array | Matrix": e.referToSelf((u) => (n) => Vr(n, u))
    });
  }), fn = "re", $o = [
    "typed"
  ], Io = Y(fn, $o, (r) => {
    var { typed: e } = r;
    return e(fn, {
      "number | BigNumber | Fraction": (u) => u,
      Complex: (u) => u.re,
      "Array | Matrix": e.referToSelf((u) => (n) => Vr(n, u))
    });
  }), ln = "concat", Ro = [
    "typed",
    "matrix",
    "isInteger"
  ], qo = Y(ln, Ro, (r) => {
    var { typed: e, matrix: u, isInteger: n } = r;
    return e(ln, {
      "...Array | Matrix | number | BigNumber": function(a) {
        var s, D = a.length, f = -1, c, o = false, l = [];
        for (s = 0; s < D; s++) {
          var g = a[s];
          if (mr(g) && (o = true), yr(g) || _r(g)) {
            if (s !== D - 1) throw new Error("Dimension must be specified as last argument");
            if (c = f, f = g.valueOf(), !n(f)) throw new TypeError("Integer number expected for dimension");
            if (f < 0 || s > 0 && f > c) throw new ae(f, c + 1);
          } else {
            var v = fr(g).valueOf(), p = hr(v);
            if (l[s] = v, c = f, f = p.length - 1, s > 0 && f !== c) throw new lr(c + 1, f + 1);
          }
        }
        if (l.length === 0) throw new SyntaxError("At least one matrix expected");
        for (var i = l.shift(); l.length; ) i = kn(i, l.shift(), f);
        return o ? u(i) : i;
      },
      "...string": function(a) {
        return a.join("");
      }
    });
  }), cn = "column", Po = [
    "typed",
    "Index",
    "matrix",
    "range"
  ], Uo = Y(cn, Po, (r) => {
    var { typed: e, Index: u, matrix: n, range: t } = r;
    return e(cn, {
      "Matrix, number": a,
      "Array, number": function(D, f) {
        return a(n(fr(D)), f).valueOf();
      }
    });
    function a(s, D) {
      if (s.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
      Cr(D, s.size()[1]);
      var f = t(0, s.size()[0]), c = new u(f, D), o = s.subset(c);
      return mr(o) ? o : n([
        [
          o
        ]
      ]);
    }
  }), vn = "cross", Lo = [
    "typed",
    "matrix",
    "subtract",
    "multiply"
  ], Wo = Y(vn, Lo, (r) => {
    var { typed: e, matrix: u, subtract: n, multiply: t } = r;
    return e(vn, {
      "Matrix, Matrix": function(D, f) {
        return u(a(D.toArray(), f.toArray()));
      },
      "Matrix, Array": function(D, f) {
        return u(a(D.toArray(), f));
      },
      "Array, Matrix": function(D, f) {
        return u(a(D, f.toArray()));
      },
      "Array, Array": a
    });
    function a(s, D) {
      var f = Math.max(hr(s).length, hr(D).length);
      s = Gt(s), D = Gt(D);
      var c = hr(s), o = hr(D);
      if (c.length !== 1 || o.length !== 1 || c[0] !== 3 || o[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + c.join(", ") + "], B = [" + o.join(", ") + "])");
      var l = [
        n(t(s[1], D[2]), t(s[2], D[1])),
        n(t(s[2], D[0]), t(s[0], D[2])),
        n(t(s[0], D[1]), t(s[1], D[0]))
      ];
      return f > 1 ? [
        l
      ] : l;
    }
  }), Dn = "diag", Vo = [
    "typed",
    "matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], Zo = Y(Dn, Vo, (r) => {
    var { typed: e, matrix: u, DenseMatrix: n, SparseMatrix: t } = r;
    return e(Dn, {
      Array: function(c) {
        return a(c, 0, hr(c), null);
      },
      "Array, number": function(c, o) {
        return a(c, o, hr(c), null);
      },
      "Array, BigNumber": function(c, o) {
        return a(c, o.toNumber(), hr(c), null);
      },
      "Array, string": function(c, o) {
        return a(c, 0, hr(c), o);
      },
      "Array, number, string": function(c, o, l) {
        return a(c, o, hr(c), l);
      },
      "Array, BigNumber, string": function(c, o, l) {
        return a(c, o.toNumber(), hr(c), l);
      },
      Matrix: function(c) {
        return a(c, 0, c.size(), c.storage());
      },
      "Matrix, number": function(c, o) {
        return a(c, o, c.size(), c.storage());
      },
      "Matrix, BigNumber": function(c, o) {
        return a(c, o.toNumber(), c.size(), c.storage());
      },
      "Matrix, string": function(c, o) {
        return a(c, 0, c.size(), o);
      },
      "Matrix, number, string": function(c, o, l) {
        return a(c, o, c.size(), l);
      },
      "Matrix, BigNumber, string": function(c, o, l) {
        return a(c, o.toNumber(), c.size(), l);
      }
    });
    function a(f, c, o, l) {
      if (!Ar(c)) throw new TypeError("Second parameter in function diag must be an integer");
      var g = c > 0 ? c : 0, v = c < 0 ? -c : 0;
      switch (o.length) {
        case 1:
          return s(f, c, l, o[0], v, g);
        case 2:
          return D(f, c, l, o, v, g);
      }
      throw new RangeError("Matrix for function diag must be 2 dimensional");
    }
    function s(f, c, o, l, g, v) {
      var p = [
        l + g,
        l + v
      ];
      if (o && o !== "sparse" && o !== "dense") throw new TypeError("Unknown matrix type ".concat(o, '"'));
      var i = o === "sparse" ? t.diagonal(p, f, c) : n.diagonal(p, f, c);
      return o !== null ? i : i.valueOf();
    }
    function D(f, c, o, l, g, v) {
      if (mr(f)) {
        var p = f.diagonal(c);
        return o !== null ? o !== p.storage() ? u(p, o) : p : p.valueOf();
      }
      for (var i = Math.min(l[0] - g, l[1] - v), d = [], h = 0; h < i; h++) d[h] = f[h + g][h + v];
      return o !== null ? u(d) : d;
    }
  }), pn = "flatten", Go = [
    "typed"
  ], Jo = Y(pn, Go, (r) => {
    var { typed: e } = r;
    return e(pn, {
      Array: function(n) {
        return lt(n);
      },
      Matrix: function(n) {
        return n.create(lt(n.valueOf()), n.datatype());
      }
    });
  }), dn = "getMatrixDataType", Qo = [
    "typed"
  ], Yo = Y(dn, Qo, (r) => {
    var { typed: e } = r;
    return e(dn, {
      Array: function(n) {
        return Ke(n, Xr);
      },
      Matrix: function(n) {
        return n.getDataType();
      }
    });
  }), hn = "identity", Xo = [
    "typed",
    "config",
    "matrix",
    "BigNumber",
    "DenseMatrix",
    "SparseMatrix"
  ], Ko = Y(hn, Xo, (r) => {
    var { typed: e, config: u, matrix: n, BigNumber: t, DenseMatrix: a, SparseMatrix: s } = r;
    return e(hn, {
      "": function() {
        return u.matrix === "Matrix" ? n([]) : [];
      },
      string: function(o) {
        return n(o);
      },
      "number | BigNumber": function(o) {
        return f(o, o, u.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, string": function(o, l) {
        return f(o, o, l);
      },
      "number | BigNumber, number | BigNumber": function(o, l) {
        return f(o, l, u.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, number | BigNumber, string": function(o, l, g) {
        return f(o, l, g);
      },
      Array: function(o) {
        return D(o);
      },
      "Array, string": function(o, l) {
        return D(o, l);
      },
      Matrix: function(o) {
        return D(o.valueOf(), o.storage());
      },
      "Matrix, string": function(o, l) {
        return D(o.valueOf(), l);
      }
    });
    function D(c, o) {
      switch (c.length) {
        case 0:
          return o ? n(o) : [];
        case 1:
          return f(c[0], c[0], o);
        case 2:
          return f(c[0], c[1], o);
        default:
          throw new Error("Vector containing two values expected");
      }
    }
    function f(c, o, l) {
      var g = _r(c) || _r(o) ? t : null;
      if (_r(c) && (c = c.toNumber()), _r(o) && (o = o.toNumber()), !Ar(c) || c < 1) throw new Error("Parameters in function identity must be positive integers");
      if (!Ar(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
      var v = g ? new t(1) : 1, p = g ? new g(0) : 0, i = [
        c,
        o
      ];
      if (l) {
        if (l === "sparse") return s.diagonal(i, v, 0, p);
        if (l === "dense") return a.diagonal(i, v, 0, p);
        throw new TypeError('Unknown matrix type "'.concat(l, '"'));
      }
      for (var d = Pe([], i, p), h = c < o ? c : o, w = 0; w < h; w++) d[w][w] = v;
      return d;
    }
  });
  function vu() {
    throw new Error('No "bignumber" implementation available');
  }
  function Ho() {
    throw new Error('No "fraction" implementation available');
  }
  function Du() {
    throw new Error('No "matrix" implementation available');
  }
  var mn = "range", ko = [
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
  ], jo = Y(mn, ko, (r) => {
    var { typed: e, config: u, matrix: n, bignumber: t, smaller: a, smallerEq: s, larger: D, largerEq: f, add: c, isPositive: o } = r;
    return e(mn, {
      string: g,
      "string, boolean": g,
      number: function(d) {
        throw new TypeError("Too few arguments to function range(): ".concat(d));
      },
      boolean: function(d) {
        throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(d, ", number|bigint|BigNumber|Fraction"));
      },
      "number, number": function(d, h) {
        return l(v(d, h, 1, false));
      },
      "number, number, number": function(d, h, w) {
        return l(v(d, h, w, false));
      },
      "number, number, boolean": function(d, h, w) {
        return l(v(d, h, 1, w));
      },
      "number, number, number, boolean": function(d, h, w, y) {
        return l(v(d, h, w, y));
      },
      "bigint, bigint|number": function(d, h) {
        return l(v(d, h, 1n, false));
      },
      "number, bigint": function(d, h) {
        return l(v(BigInt(d), h, 1n, false));
      },
      "bigint, bigint|number, bigint|number": function(d, h, w) {
        return l(v(d, h, BigInt(w), false));
      },
      "number, bigint, bigint|number": function(d, h, w) {
        return l(v(BigInt(d), h, BigInt(w), false));
      },
      "bigint, bigint|number, boolean": function(d, h, w) {
        return l(v(d, h, 1n, w));
      },
      "number, bigint, boolean": function(d, h, w) {
        return l(v(BigInt(d), h, 1n, w));
      },
      "bigint, bigint|number, bigint|number, boolean": function(d, h, w, y) {
        return l(v(d, h, BigInt(w), y));
      },
      "number, bigint, bigint|number, boolean": function(d, h, w, y) {
        return l(v(BigInt(d), h, BigInt(w), y));
      },
      "BigNumber, BigNumber": function(d, h) {
        var w = d.constructor;
        return l(v(d, h, new w(1), false));
      },
      "BigNumber, BigNumber, BigNumber": function(d, h, w) {
        return l(v(d, h, w, false));
      },
      "BigNumber, BigNumber, boolean": function(d, h, w) {
        var y = d.constructor;
        return l(v(d, h, new y(1), w));
      },
      "BigNumber, BigNumber, BigNumber, boolean": function(d, h, w, y) {
        return l(v(d, h, w, y));
      },
      "Fraction, Fraction": function(d, h) {
        return l(v(d, h, 1, false));
      },
      "Fraction, Fraction, Fraction": function(d, h, w) {
        return l(v(d, h, w, false));
      },
      "Fraction, Fraction, boolean": function(d, h, w) {
        return l(v(d, h, 1, w));
      },
      "Fraction, Fraction, Fraction, boolean": function(d, h, w, y) {
        return l(v(d, h, w, y));
      },
      "Unit, Unit, Unit": function(d, h, w) {
        return l(v(d, h, w, false));
      },
      "Unit, Unit, Unit, boolean": function(d, h, w, y) {
        return l(v(d, h, w, y));
      }
    });
    function l(i) {
      return u.matrix === "Matrix" ? n ? n(i) : Du() : i;
    }
    function g(i, d) {
      var h = p(i);
      if (!h) throw new SyntaxError('String "' + i + '" is no valid range');
      return u.number === "BigNumber" ? (t === void 0 && vu(), l(v(t(h.start), t(h.end), t(h.step)))) : l(v(h.start, h.end, h.step, d));
    }
    function v(i, d, h, w) {
      for (var y = [], C = o(h) ? w ? s : a : w ? f : D, F = i; C(F, d); ) y.push(F), F = c(F, h);
      return y;
    }
    function p(i) {
      var d = i.split(":"), h = d.map(function(y) {
        return Number(y);
      }), w = h.some(function(y) {
        return isNaN(y);
      });
      if (w) return null;
      switch (h.length) {
        case 2:
          return {
            start: h[0],
            end: h[1],
            step: 1
          };
        case 3:
          return {
            start: h[0],
            end: h[2],
            step: h[1]
          };
        default:
          return null;
      }
    }
  }), gn = "reshape", rs = [
    "typed",
    "isInteger",
    "matrix"
  ], es = Y(gn, rs, (r) => {
    var { typed: e, isInteger: u } = r;
    return e(gn, {
      "Matrix, Array": function(t, a) {
        return t.reshape(a, true);
      },
      "Array, Array": function(t, a) {
        return a.forEach(function(s) {
          if (!u(s)) throw new TypeError("Invalid size for dimension: " + s);
        }), gt(t, a);
      }
    });
  }), yn = "size", ts = [
    "typed",
    "config",
    "?matrix"
  ], ns = Y(yn, ts, (r) => {
    var { typed: e, config: u, matrix: n } = r;
    return e(yn, {
      Matrix: function(a) {
        return a.create(a.size(), "number");
      },
      Array: hr,
      string: function(a) {
        return u.matrix === "Array" ? [
          a.length
        ] : n([
          a.length
        ], "dense", "number");
      },
      "number | Complex | BigNumber | Unit | boolean | null": function(a) {
        return u.matrix === "Array" ? [] : n ? n([], "dense", "number") : Du();
      }
    });
  }), An = "transpose", us = [
    "typed",
    "matrix"
  ], as = Y(An, us, (r) => {
    var { typed: e, matrix: u } = r;
    return e(An, {
      Array: (s) => n(u(s)).valueOf(),
      Matrix: n,
      any: fr
    });
    function n(s) {
      var D = s.size(), f;
      switch (D.length) {
        case 1:
          f = s.clone();
          break;
        case 2:
          {
            var c = D[0], o = D[1];
            if (o === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Er(D) + ")");
            switch (s.storage()) {
              case "dense":
                f = t(s, c, o);
                break;
              case "sparse":
                f = a(s, c, o);
                break;
            }
          }
          break;
        default:
          throw new RangeError("Matrix must be a vector or two dimensional (size: " + Er(D) + ")");
      }
      return f;
    }
    function t(s, D, f) {
      for (var c = s._data, o = [], l, g = 0; g < f; g++) {
        l = o[g] = [];
        for (var v = 0; v < D; v++) l[v] = fr(c[v][g]);
      }
      return s.createDenseMatrix({
        data: o,
        size: [
          f,
          D
        ],
        datatype: s._datatype
      });
    }
    function a(s, D, f) {
      for (var c = s._values, o = s._index, l = s._ptr, g = c ? [] : void 0, v = [], p = [], i = [], d = 0; d < D; d++) i[d] = 0;
      var h, w, y;
      for (h = 0, w = o.length; h < w; h++) i[o[h]]++;
      for (var C = 0, F = 0; F < D; F++) p.push(C), C += i[F], i[F] = p[F];
      for (p.push(C), y = 0; y < f; y++) for (var A = l[y], b = l[y + 1], E = A; E < b; E++) {
        var m = i[o[E]]++;
        v[m] = y, c && (g[m] = fr(c[E]));
      }
      return s.createSparseMatrix({
        values: g,
        index: v,
        ptr: p,
        size: [
          f,
          D
        ],
        datatype: s._datatype
      });
    }
  }), Fn = "ctranspose", is = [
    "typed",
    "transpose",
    "conj"
  ], os = Y(Fn, is, (r) => {
    var { typed: e, transpose: u, conj: n } = r;
    return e(Fn, {
      any: function(a) {
        return n(u(a));
      }
    });
  }), En = "zeros", ss = [
    "typed",
    "config",
    "matrix",
    "BigNumber"
  ], fs = Y(En, ss, (r) => {
    var { typed: e, config: u, matrix: n, BigNumber: t } = r;
    return e(En, {
      "": function() {
        return u.matrix === "Array" ? a([]) : a([], "default");
      },
      "...number | BigNumber | string": function(c) {
        var o = c[c.length - 1];
        if (typeof o == "string") {
          var l = c.pop();
          return a(c, l);
        } else return u.matrix === "Array" ? a(c) : a(c, "default");
      },
      Array: a,
      Matrix: function(c) {
        var o = c.storage();
        return a(c.valueOf(), o);
      },
      "Array | Matrix, string": function(c, o) {
        return a(c.valueOf(), o);
      }
    });
    function a(f, c) {
      var o = s(f), l = o ? new t(0) : 0;
      if (D(f), c) {
        var g = n(c);
        return f.length > 0 ? g.resize(f, l) : g;
      } else {
        var v = [];
        return f.length > 0 ? Pe(v, f, l) : v;
      }
    }
    function s(f) {
      var c = false;
      return f.forEach(function(o, l, g) {
        _r(o) && (c = true, g[l] = o.toNumber());
      }), c;
    }
    function D(f) {
      f.forEach(function(c) {
        if (typeof c != "number" || !Ar(c) || c < 0) throw new Error("Parameters in function zeros must be positive integers");
      });
    }
  }), ls = "numeric", cs = [
    "number",
    "?bignumber",
    "?fraction"
  ], vs = Y(ls, cs, (r) => {
    var { number: e, bignumber: u, fraction: n } = r, t = {
      string: true,
      number: true,
      BigNumber: true,
      Fraction: true
    }, a = {
      number: (s) => e(s),
      BigNumber: u ? (s) => u(s) : vu,
      bigint: (s) => BigInt(s),
      Fraction: n ? (s) => n(s) : Ho
    };
    return function(D) {
      var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", c = arguments.length > 2 ? arguments[2] : void 0;
      if (c !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
      var o = Xr(D);
      if (!(o in t)) throw new TypeError("Cannot convert " + D + ' of type "' + o + '"; valid input types are ' + Object.keys(t).join(", "));
      if (!(f in a)) throw new TypeError("Cannot convert " + D + ' to type "' + f + '"; valid output types are ' + Object.keys(a).join(", "));
      return f === o ? D : a[f](D);
    };
  }), wn = "divideScalar", Ds = [
    "typed",
    "numeric"
  ], ps = Y(wn, Ds, (r) => {
    var { typed: e, numeric: u } = r;
    return e(wn, {
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
      "Unit, number | Complex | Fraction | BigNumber | Unit": (n, t) => n.divide(t),
      "number | Fraction | Complex | BigNumber, Unit": (n, t) => t.divideInto(n)
    });
  }), bn = "pow", ds = [
    "typed",
    "config",
    "identity",
    "multiply",
    "matrix",
    "inv",
    "fraction",
    "number",
    "Complex"
  ], hs = Y(bn, ds, (r) => {
    var { typed: e, config: u, identity: n, multiply: t, matrix: a, inv: s, number: D, fraction: f, Complex: c } = r;
    return e(bn, {
      "number, number": o,
      "Complex, Complex": function(p, i) {
        return p.pow(i);
      },
      "BigNumber, BigNumber": function(p, i) {
        return i.isInteger() || p >= 0 || u.predictable ? p.pow(i) : new c(p.toNumber(), 0).pow(i.toNumber(), 0);
      },
      "bigint, bigint": (v, p) => v ** p,
      "Fraction, Fraction": function(p, i) {
        var d = p.pow(i);
        if (d != null) return d;
        if (u.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
        return o(p.valueOf(), i.valueOf());
      },
      "Array, number": l,
      "Array, BigNumber": function(p, i) {
        return l(p, i.toNumber());
      },
      "Matrix, number": g,
      "Matrix, BigNumber": function(p, i) {
        return g(p, i.toNumber());
      },
      "Unit, number | BigNumber": function(p, i) {
        return p.pow(i);
      }
    });
    function o(v, p) {
      if (u.predictable && !Ar(p) && v < 0) try {
        var i = f(p), d = D(i);
        if ((p === d || Math.abs((p - d) / p) < 1e-14) && i.d % 2n === 1n) return (i.n % 2n === 0n ? 1 : -1) * Math.pow(-v, p);
      } catch {
      }
      return u.predictable && (v < -1 && p === 1 / 0 || v > -1 && v < 0 && p === -1 / 0) ? NaN : Ar(p) || v >= 0 || u.predictable ? ou(v, p) : v * v < 1 && p === 1 / 0 || v * v > 1 && p === -1 / 0 ? 0 : new c(v, 0).pow(p, 0);
    }
    function l(v, p) {
      if (!Ar(p)) throw new TypeError("For A^b, b must be an integer (value is " + p + ")");
      var i = hr(v);
      if (i.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + i.length + " dimensions)");
      if (i[0] !== i[1]) throw new Error("For A^b, A must be square (size is " + i[0] + "x" + i[1] + ")");
      if (p < 0) try {
        return l(s(v), -p);
      } catch (w) {
        throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + p + ")") : w;
      }
      for (var d = n(i[0]).valueOf(), h = v; p >= 1; ) (p & 1) === 1 && (d = t(h, d)), p >>= 1, h = t(h, h);
      return d;
    }
    function g(v, p) {
      return a(l(v.valueOf(), p));
    }
  });
  function pu(r) {
    var { DenseMatrix: e } = r;
    return function(n, t, a) {
      var s = n.size();
      if (s.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + Er(s) + ")");
      var D = s[0], f = s[1];
      if (D !== f) throw new RangeError("Matrix must be square (size: " + Er(s) + ")");
      var c = [];
      if (mr(t)) {
        var o = t.size(), l = t._data;
        if (o.length === 1) {
          if (o[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var g = 0; g < D; g++) c[g] = [
            l[g]
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
        if (o.length === 2) {
          if (o[0] !== D || o[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          if (qn(t)) {
            if (a) {
              c = [];
              for (var v = 0; v < D; v++) c[v] = [
                l[v][0]
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
          if (Pn(t)) {
            for (var p = 0; p < D; p++) c[p] = [
              0
            ];
            for (var i = t._values, d = t._index, h = t._ptr, w = h[1], y = h[0]; y < w; y++) {
              var C = d[y];
              c[C][0] = i[y];
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
      if (br(t)) {
        var F = hr(t);
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
  var Cn = "usolve", ms = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], gs = Y(Cn, ms, (r) => {
    var { typed: e, matrix: u, divideScalar: n, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, f = pu({
      DenseMatrix: D
    });
    return e(Cn, {
      "SparseMatrix, Array | Matrix": function(g, v) {
        return o(g, v);
      },
      "DenseMatrix, Array | Matrix": function(g, v) {
        return c(g, v);
      },
      "Array, Array | Matrix": function(g, v) {
        var p = u(g), i = c(p, v);
        return i.valueOf();
      }
    });
    function c(l, g) {
      g = f(l, g, true);
      for (var v = g._data, p = l._size[0], i = l._size[1], d = [], h = l._data, w = i - 1; w >= 0; w--) {
        var y = v[w][0] || 0, C = void 0;
        if (s(y, 0)) C = 0;
        else {
          var F = h[w][w];
          if (s(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          C = n(y, F);
          for (var A = w - 1; A >= 0; A--) v[A] = [
            a(v[A][0] || 0, t(C, h[A][w]))
          ];
        }
        d[w] = [
          C
        ];
      }
      return new D({
        data: d,
        size: [
          p,
          1
        ]
      });
    }
    function o(l, g) {
      g = f(l, g, true);
      for (var v = g._data, p = l._size[0], i = l._size[1], d = l._values, h = l._index, w = l._ptr, y = [], C = i - 1; C >= 0; C--) {
        var F = v[C][0] || 0;
        if (s(F, 0)) y[C] = [
          0
        ];
        else {
          for (var A = 0, b = [], E = [], m = w[C], B = w[C + 1], _ = B - 1; _ >= m; _--) {
            var S = h[_];
            S === C ? A = d[_] : S < C && (b.push(d[_]), E.push(S));
          }
          if (s(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          for (var M = n(F, A), x = 0, O = E.length; x < O; x++) {
            var N = E[x];
            v[N] = [
              a(v[N][0], t(M, b[x]))
            ];
          }
          y[C] = [
            M
          ];
        }
      }
      return new D({
        data: y,
        size: [
          p,
          1
        ]
      });
    }
  }), _n = "usolveAll", ys = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], As = Y(_n, ys, (r) => {
    var { typed: e, matrix: u, divideScalar: n, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, f = pu({
      DenseMatrix: D
    });
    return e(_n, {
      "SparseMatrix, Array | Matrix": function(g, v) {
        return o(g, v);
      },
      "DenseMatrix, Array | Matrix": function(g, v) {
        return c(g, v);
      },
      "Array, Array | Matrix": function(g, v) {
        var p = u(g), i = c(p, v);
        return i.map((d) => d.valueOf());
      }
    });
    function c(l, g) {
      for (var v = [
        f(l, g, true)._data.map((E) => E[0])
      ], p = l._data, i = l._size[0], d = l._size[1], h = d - 1; h >= 0; h--) for (var w = v.length, y = 0; y < w; y++) {
        var C = v[y];
        if (s(p[h][h], 0)) if (s(C[h], 0)) {
          if (y === 0) {
            var A = [
              ...C
            ];
            A[h] = 1;
            for (var b = h - 1; b >= 0; b--) A[b] = a(A[b], p[b][h]);
            v.push(A);
          }
        } else {
          if (y === 0) return [];
          v.splice(y, 1), y -= 1, w -= 1;
        }
        else {
          C[h] = n(C[h], p[h][h]);
          for (var F = h - 1; F >= 0; F--) C[F] = a(C[F], t(C[h], p[F][h]));
        }
      }
      return v.map((E) => new D({
        data: E.map((m) => [
          m
        ]),
        size: [
          i,
          1
        ]
      }));
    }
    function o(l, g) {
      for (var v = [
        f(l, g, true)._data.map((H) => H[0])
      ], p = l._size[0], i = l._size[1], d = l._values, h = l._index, w = l._ptr, y = i - 1; y >= 0; y--) for (var C = v.length, F = 0; F < C; F++) {
        for (var A = v[F], b = [], E = [], m = w[y], B = w[y + 1], _ = 0, S = B - 1; S >= m; S--) {
          var M = h[S];
          M === y ? _ = d[S] : M < y && (b.push(d[S]), E.push(M));
        }
        if (s(_, 0)) if (s(A[y], 0)) {
          if (F === 0) {
            var P = [
              ...A
            ];
            P[y] = 1;
            for (var z = 0, I = E.length; z < I; z++) {
              var Q = E[z];
              P[Q] = a(P[Q], b[z]);
            }
            v.push(P);
          }
        } else {
          if (F === 0) return [];
          v.splice(F, 1), F -= 1, C -= 1;
        }
        else {
          A[y] = n(A[y], _);
          for (var x = 0, O = E.length; x < O; x++) {
            var N = E[x];
            A[N] = a(A[N], t(A[y], b[x]));
          }
        }
      }
      return v.map((H) => new D({
        data: H.map((T) => [
          T
        ]),
        size: [
          p,
          1
        ]
      }));
    }
  }), We = "equal", Fs = [
    "typed",
    "matrix",
    "equalScalar",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Es = Y(We, Fs, (r) => {
    var { typed: e, matrix: u, equalScalar: n, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = he({
      typed: e
    }), f = be({
      typed: e,
      SparseMatrix: s
    }), c = de({
      typed: e,
      DenseMatrix: t
    }), o = ie({
      typed: e,
      matrix: u,
      concat: a
    });
    return e(We, ws({
      typed: e,
      equalScalar: n
    }), o({
      elop: n,
      SS: f,
      DS: D,
      Ss: c
    }));
  }), ws = Y(We, [
    "typed",
    "equalScalar"
  ], (r) => {
    var { typed: e, equalScalar: u } = r;
    return e(We, {
      "any, any": function(t, a) {
        return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : u(t, a);
      }
    });
  }), Ve = "smaller", bs = [
    "typed",
    "config",
    "bignumber",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Cs = Y(Ve, bs, (r) => {
    var { typed: e, config: u, bignumber: n, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, f = he({
      typed: e
    }), c = be({
      typed: e,
      SparseMatrix: D
    }), o = de({
      typed: e,
      DenseMatrix: a
    }), l = ie({
      typed: e,
      matrix: t,
      concat: s
    }), g = we({
      typed: e
    });
    function v(p, i) {
      return p.lt(i) && !pe(p, i, u.relTol, u.absTol);
    }
    return e(Ve, _s({
      typed: e,
      config: u
    }), {
      "boolean, boolean": (p, i) => p < i,
      "BigNumber, BigNumber": v,
      "bigint, bigint": (p, i) => p < i,
      "Fraction, Fraction": (p, i) => p.compare(i) === -1,
      "Fraction, BigNumber": function(i, d) {
        return v(n(i), d);
      },
      "BigNumber, Fraction": function(i, d) {
        return v(i, n(d));
      },
      "Complex, Complex": function(i, d) {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, g, l({
      SS: c,
      DS: f,
      Ss: o
    }));
  }), _s = Y(Ve, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: u } = r;
    return e(Ve, {
      "number, number": function(t, a) {
        return t < a && !kr(t, a, u.relTol, u.absTol);
      }
    });
  }), Ze = "smallerEq", Bs = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Ss = Y(Ze, Bs, (r) => {
    var { typed: e, config: u, matrix: n, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = he({
      typed: e
    }), f = be({
      typed: e,
      SparseMatrix: s
    }), c = de({
      typed: e,
      DenseMatrix: t
    }), o = ie({
      typed: e,
      matrix: n,
      concat: a
    }), l = we({
      typed: e
    });
    return e(Ze, xs({
      typed: e,
      config: u
    }), {
      "boolean, boolean": (g, v) => g <= v,
      "BigNumber, BigNumber": function(v, p) {
        return v.lte(p) || pe(v, p, u.relTol, u.absTol);
      },
      "bigint, bigint": (g, v) => g <= v,
      "Fraction, Fraction": (g, v) => g.compare(v) !== 1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, l, o({
      SS: f,
      DS: D,
      Ss: c
    }));
  }), xs = Y(Ze, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: u } = r;
    return e(Ze, {
      "number, number": function(t, a) {
        return t <= a || kr(t, a, u.relTol, u.absTol);
      }
    });
  }), Ge = "larger", Ms = [
    "typed",
    "config",
    "bignumber",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Ns = Y(Ge, Ms, (r) => {
    var { typed: e, config: u, bignumber: n, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, f = he({
      typed: e
    }), c = be({
      typed: e,
      SparseMatrix: D
    }), o = de({
      typed: e,
      DenseMatrix: a
    }), l = ie({
      typed: e,
      matrix: t,
      concat: s
    }), g = we({
      typed: e
    });
    function v(p, i) {
      return p.gt(i) && !pe(p, i, u.relTol, u.absTol);
    }
    return e(Ge, Ts({
      typed: e,
      config: u
    }), {
      "boolean, boolean": (p, i) => p > i,
      "BigNumber, BigNumber": v,
      "bigint, bigint": (p, i) => p > i,
      "Fraction, Fraction": (p, i) => p.compare(i) === 1,
      "Fraction, BigNumber": function(i, d) {
        return v(n(i), d);
      },
      "BigNumber, Fraction": function(i, d) {
        return v(i, n(d));
      },
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, g, l({
      SS: c,
      DS: f,
      Ss: o
    }));
  }), Ts = Y(Ge, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: u } = r;
    return e(Ge, {
      "number, number": function(t, a) {
        return t > a && !kr(t, a, u.relTol, u.absTol);
      }
    });
  }), Je = "largerEq", zs = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat",
    "SparseMatrix"
  ], Os = Y(Je, zs, (r) => {
    var { typed: e, config: u, matrix: n, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = he({
      typed: e
    }), f = be({
      typed: e,
      SparseMatrix: s
    }), c = de({
      typed: e,
      DenseMatrix: t
    }), o = ie({
      typed: e,
      matrix: n,
      concat: a
    }), l = we({
      typed: e
    });
    return e(Je, $s({
      typed: e,
      config: u
    }), {
      "boolean, boolean": (g, v) => g >= v,
      "BigNumber, BigNumber": function(v, p) {
        return v.gte(p) || pe(v, p, u.relTol, u.absTol);
      },
      "bigint, bigint": function(v, p) {
        return v >= p;
      },
      "Fraction, Fraction": (g, v) => g.compare(v) !== -1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, l, o({
      SS: f,
      DS: D,
      Ss: c
    }));
  }), $s = Y(Je, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: u } = r;
    return e(Je, {
      "number, number": function(t, a) {
        return t >= a || kr(t, a, u.relTol, u.absTol);
      }
    });
  }), Is = "ImmutableDenseMatrix", Rs = [
    "smaller",
    "DenseMatrix"
  ], qs = Y(Is, Rs, (r) => {
    var { smaller: e, DenseMatrix: u } = r;
    function n(t, a) {
      if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
      if (a && !Yr(a)) throw new Error("Invalid datatype: " + a);
      if (mr(t) || br(t)) {
        var s = new u(t, a);
        this._data = s._data, this._size = s._size, this._datatype = s._datatype, this._min = null, this._max = null;
      } else if (t && br(t.data) && br(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
      else {
        if (t) throw new TypeError("Unsupported type of data (" + Xr(t) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = a, this._min = null, this._max = null;
      }
    }
    return n.prototype = new u(), n.prototype.type = "ImmutableDenseMatrix", n.prototype.isImmutableDenseMatrix = true, n.prototype.subset = function(t) {
      switch (arguments.length) {
        case 1: {
          var a = u.prototype.subset.call(this, t);
          return mr(a) ? new n({
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
    }, n.prototype.set = function() {
      throw new Error("Cannot invoke set on an Immutable Matrix instance");
    }, n.prototype.resize = function() {
      throw new Error("Cannot invoke resize on an Immutable Matrix instance");
    }, n.prototype.reshape = function() {
      throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
    }, n.prototype.clone = function() {
      return new n({
        data: fr(this._data),
        size: fr(this._size),
        datatype: this._datatype
      });
    }, n.prototype.toJSON = function() {
      return {
        mathjs: "ImmutableDenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, n.fromJSON = function(t) {
      return new n(t);
    }, n.prototype.swapRows = function() {
      throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
    }, n.prototype.min = function() {
      if (this._min === null) {
        var t = null;
        this.forEach(function(a) {
          (t === null || e(a, t)) && (t = a);
        }), this._min = t !== null ? t : void 0;
      }
      return this._min;
    }, n.prototype.max = function() {
      if (this._max === null) {
        var t = null;
        this.forEach(function(a) {
          (t === null || e(t, a)) && (t = a);
        }), this._max = t !== null ? t : void 0;
      }
      return this._max;
    }, n;
  }, {
    isClass: true
  }), Ps = "Index", Us = [
    "ImmutableDenseMatrix",
    "getMatrixDataType"
  ], Ls = Y(Ps, Us, (r) => {
    var { ImmutableDenseMatrix: e, getMatrixDataType: u } = r;
    function n(a) {
      if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
      this._dimensions = [], this._sourceSize = [], this._isScalar = true;
      for (var s = 0, D = arguments.length; s < D; s++) {
        var f = arguments[s], c = br(f), o = mr(f), l = typeof f, g = null;
        if (Un(f)) this._dimensions.push(f), this._isScalar = false;
        else if (c || o) {
          var v = void 0;
          u(f) === "boolean" ? (c && (v = t(Bn(f).valueOf())), o && (v = t(Bn(f._data).valueOf())), g = f.valueOf().length) : v = t(f.valueOf()), this._dimensions.push(v);
          var p = v.size();
          (p.length !== 1 || p[0] !== 1 || g !== null) && (this._isScalar = false);
        } else if (l === "number") this._dimensions.push(t([
          f
        ]));
        else if (l === "bigint") this._dimensions.push(t([
          Number(f)
        ]));
        else if (l === "string") this._dimensions.push(f);
        else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
        this._sourceSize.push(g);
      }
    }
    n.prototype.type = "Index", n.prototype.isIndex = true;
    function t(a) {
      for (var s = 0, D = a.length; s < D; s++) if (typeof a[s] != "number" || !Ar(a[s])) throw new TypeError("Index parameters must be positive integer numbers");
      return new e(a);
    }
    return n.prototype.clone = function() {
      var a = new n();
      return a._dimensions = fr(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
    }, n.create = function(a) {
      var s = new n();
      return n.apply(s, a), s;
    }, n.prototype.size = function() {
      for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
        var f = this._dimensions[s];
        a[s] = typeof f == "string" ? 1 : f.size()[0];
      }
      return a;
    }, n.prototype.max = function() {
      for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
        var f = this._dimensions[s];
        a[s] = typeof f == "string" ? f : f.max();
      }
      return a;
    }, n.prototype.min = function() {
      for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
        var f = this._dimensions[s];
        a[s] = typeof f == "string" ? f : f.min();
      }
      return a;
    }, n.prototype.forEach = function(a) {
      for (var s = 0, D = this._dimensions.length; s < D; s++) a(this._dimensions[s], s, this);
    }, n.prototype.dimension = function(a) {
      return typeof a != "number" ? null : this._dimensions[a] || null;
    }, n.prototype.isObjectProperty = function() {
      return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
    }, n.prototype.getObjectProperty = function() {
      return this.isObjectProperty() ? this._dimensions[0] : null;
    }, n.prototype.isScalar = function() {
      return this._isScalar;
    }, n.prototype.toArray = function() {
      for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
        var f = this._dimensions[s];
        a.push(typeof f == "string" ? f : f.toArray());
      }
      return a;
    }, n.prototype.valueOf = n.prototype.toArray, n.prototype.toString = function() {
      for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
        var f = this._dimensions[s];
        typeof f == "string" ? a.push(JSON.stringify(f)) : a.push(f.toString());
      }
      return "[" + a.join(", ") + "]";
    }, n.prototype.toJSON = function() {
      return {
        mathjs: "Index",
        dimensions: this._dimensions
      };
    }, n.fromJSON = function(a) {
      return n.create(a.dimensions);
    }, n;
  }, {
    isClass: true
  });
  function Bn(r) {
    var e = [];
    return r.forEach((u, n) => {
      u && e.push(n);
    }), e;
  }
  var Ws = "atan", Vs = [
    "typed"
  ], Zs = Y(Ws, Vs, (r) => {
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
  }), du = Y("trigUnit", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      Unit: e.referToSelf((u) => (n) => {
        if (!n.hasBase(n.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
        return e.find(u, n.valueType())(n.value);
      })
    };
  }), Sn = "cos", Gs = [
    "typed"
  ], Js = Y(Sn, Gs, (r) => {
    var { typed: e } = r, u = du({
      typed: e
    });
    return e(Sn, {
      number: Math.cos,
      "Complex | BigNumber": (n) => n.cos()
    }, u);
  }), xn = "sin", Qs = [
    "typed"
  ], Ys = Y(xn, Qs, (r) => {
    var { typed: e } = r, u = du({
      typed: e
    });
    return e(xn, {
      number: Math.sin,
      "Complex | BigNumber": (n) => n.sin()
    }, u);
  }), Mn = "add", Xs = [
    "typed",
    "matrix",
    "addScalar",
    "equalScalar",
    "DenseMatrix",
    "SparseMatrix",
    "concat"
  ], Ks = Y(Mn, Xs, (r) => {
    var { typed: e, matrix: u, addScalar: n, equalScalar: t, DenseMatrix: a, SparseMatrix: s, concat: D } = r, f = lu({
      typed: e
    }), c = Do({
      typed: e,
      equalScalar: t
    }), o = cu({
      typed: e,
      DenseMatrix: a
    }), l = ie({
      typed: e,
      matrix: u,
      concat: D
    });
    return e(Mn, {
      "any, any": n,
      "any, any, ...any": e.referToSelf((g) => (v, p, i) => {
        for (var d = g(v, p), h = 0; h < i.length; h++) d = g(d, i[h]);
        return d;
      })
    }, l({
      elop: n,
      DS: f,
      SS: c,
      Ss: o
    }));
  }), Nn = "norm", Hs = [
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
  ], ks = Y(Nn, Hs, (r) => {
    var { typed: e, abs: u, add: n, pow: t, conj: a, sqrt: s, multiply: D, equalScalar: f, larger: c, smaller: o, matrix: l, ctranspose: g, eigs: v } = r;
    return e(Nn, {
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
        return A(l(E), 2);
      },
      Matrix: function(E) {
        return A(E, 2);
      },
      "Array, number | BigNumber | string": function(E, m) {
        return A(l(E), m);
      },
      "Matrix, number | BigNumber | string": function(E, m) {
        return A(E, m);
      }
    });
    function p(b) {
      var E = 0;
      return b.forEach(function(m) {
        var B = u(m);
        c(B, E) && (E = B);
      }, true), E;
    }
    function i(b) {
      var E;
      return b.forEach(function(m) {
        var B = u(m);
        (!E || o(B, E)) && (E = B);
      }, true), E || 0;
    }
    function d(b, E) {
      if (E === Number.POSITIVE_INFINITY || E === "inf") return p(b);
      if (E === Number.NEGATIVE_INFINITY || E === "-inf") return i(b);
      if (E === "fro") return A(b, 2);
      if (typeof E == "number" && !isNaN(E)) {
        if (!f(E, 0)) {
          var m = 0;
          return b.forEach(function(B) {
            m = n(t(u(B), E), m);
          }, true), t(m, 1 / E);
        }
        return Number.POSITIVE_INFINITY;
      }
      throw new Error("Unsupported parameter value");
    }
    function h(b) {
      var E = 0;
      return b.forEach(function(m, B) {
        E = n(E, D(m, a(m)));
      }), u(s(E));
    }
    function w(b) {
      var E = [], m = 0;
      return b.forEach(function(B, _) {
        var S = _[1], M = n(E[S] || 0, u(B));
        c(M, m) && (m = M), E[S] = M;
      }, true), m;
    }
    function y(b) {
      var E = b.size();
      if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
      var m = g(b), B = D(m, b), _ = v(B).values.toArray(), S = _[_.length - 1];
      return u(s(S));
    }
    function C(b) {
      var E = [], m = 0;
      return b.forEach(function(B, _) {
        var S = _[0], M = n(E[S] || 0, u(B));
        c(M, m) && (m = M), E[S] = M;
      }, true), m;
    }
    function F(b, E) {
      if (E === 1) return w(b);
      if (E === Number.POSITIVE_INFINITY || E === "inf") return C(b);
      if (E === "fro") return h(b);
      if (E === 2) return y(b);
      throw new Error("Unsupported parameter value " + E);
    }
    function A(b, E) {
      var m = b.size();
      if (m.length === 1) return d(b, E);
      if (m.length === 2) {
        if (m[0] && m[1]) return F(b, E);
        throw new RangeError("Invalid matrix dimensions");
      }
    }
  }), Tn = "dot", js = [
    "typed",
    "addScalar",
    "multiplyScalar",
    "conj",
    "size"
  ], rf = Y(Tn, js, (r) => {
    var { typed: e, addScalar: u, multiplyScalar: n, conj: t, size: a } = r;
    return e(Tn, {
      "Array | DenseMatrix, Array | DenseMatrix": D,
      "SparseMatrix, SparseMatrix": f
    });
    function s(o, l) {
      var g = c(o), v = c(l), p, i;
      if (g.length === 1) p = g[0];
      else if (g.length === 2 && g[1] === 1) p = g[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + g.join(", ") + ")");
      if (v.length === 1) i = v[0];
      else if (v.length === 2 && v[1] === 1) i = v[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
      if (p !== i) throw new RangeError("Vectors must have equal length (" + p + " != " + i + ")");
      if (p === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
      return p;
    }
    function D(o, l) {
      var g = s(o, l), v = mr(o) ? o._data : o, p = mr(o) ? o._datatype || o.getDataType() : void 0, i = mr(l) ? l._data : l, d = mr(l) ? l._datatype || l.getDataType() : void 0, h = c(o).length === 2, w = c(l).length === 2, y = u, C = n;
      if (p && d && p === d && typeof p == "string" && p !== "mixed") {
        var F = p;
        y = e.find(u, [
          F,
          F
        ]), C = e.find(n, [
          F,
          F
        ]);
      }
      if (!h && !w) {
        for (var A = C(t(v[0]), i[0]), b = 1; b < g; b++) A = y(A, C(t(v[b]), i[b]));
        return A;
      }
      if (!h && w) {
        for (var E = C(t(v[0]), i[0][0]), m = 1; m < g; m++) E = y(E, C(t(v[m]), i[m][0]));
        return E;
      }
      if (h && !w) {
        for (var B = C(t(v[0][0]), i[0]), _ = 1; _ < g; _++) B = y(B, C(t(v[_][0]), i[_]));
        return B;
      }
      if (h && w) {
        for (var S = C(t(v[0][0]), i[0][0]), M = 1; M < g; M++) S = y(S, C(t(v[M][0]), i[M][0]));
        return S;
      }
    }
    function f(o, l) {
      s(o, l);
      for (var g = o._index, v = o._values, p = l._index, i = l._values, d = 0, h = u, w = n, y = 0, C = 0; y < g.length && C < p.length; ) {
        var F = g[y], A = p[C];
        if (F < A) {
          y++;
          continue;
        }
        if (F > A) {
          C++;
          continue;
        }
        F === A && (d = h(d, w(v[y], i[C])), y++, C++);
      }
      return d;
    }
    function c(o) {
      return mr(o) ? o.size() : a(o);
    }
  }), zn = "qr", ef = [
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
  ], tf = Y(zn, ef, (r) => {
    var { typed: e, matrix: u, zeros: n, identity: t, isZero: a, equal: s, sign: D, sqrt: f, conj: c, unaryMinus: o, addScalar: l, divideScalar: g, multiplyScalar: v, subtractScalar: p, complex: i } = r;
    return Qe(e(zn, {
      DenseMatrix: function(C) {
        return h(C);
      },
      SparseMatrix: function(C) {
        return w();
      },
      Array: function(C) {
        var F = u(C), A = h(F);
        return {
          Q: A.Q.valueOf(),
          R: A.R.valueOf()
        };
      }
    }), {
      _denseQRimpl: d
    });
    function d(y) {
      var C = y._size[0], F = y._size[1], A = t([
        C
      ], "dense"), b = A._data, E = y.clone(), m = E._data, B, _, S, M = n([
        C
      ], "");
      for (S = 0; S < Math.min(F, C); ++S) {
        var x = m[S][S], O = o(s(x, 0) ? 1 : D(x)), N = c(O), P = 0;
        for (B = S; B < C; B++) P = l(P, v(m[B][S], c(m[B][S])));
        var z = v(O, f(P));
        if (!a(z)) {
          var I = p(x, z);
          for (M[S] = 1, B = S + 1; B < C; B++) M[B] = g(m[B][S], I);
          var Q = o(c(g(I, z))), H = void 0;
          for (_ = S; _ < F; _++) {
            for (H = 0, B = S; B < C; B++) H = l(H, v(c(M[B]), m[B][_]));
            for (H = v(H, Q), B = S; B < C; B++) m[B][_] = v(p(m[B][_], v(M[B], H)), N);
          }
          for (B = 0; B < C; B++) {
            for (H = 0, _ = S; _ < C; _++) H = l(H, v(b[B][_], M[_]));
            for (H = v(H, Q), _ = S; _ < C; ++_) b[B][_] = g(p(b[B][_], v(H, c(M[_]))), N);
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
    function h(y) {
      var C = d(y), F = C.R._data;
      if (y._data.length > 0) for (var A = F[0][0].type === "Complex" ? i(0) : 0, b = 0; b < F.length; ++b) for (var E = 0; E < b && E < (F[0] || []).length; ++E) F[b][E] = A;
      return C;
    }
    function w(y) {
      throw new Error("qr not implemented for sparse matrices yet");
    }
  }), On = "det", nf = [
    "typed",
    "matrix",
    "subtractScalar",
    "multiply",
    "divideScalar",
    "isZero",
    "unaryMinus"
  ], uf = Y(On, nf, (r) => {
    var { typed: e, matrix: u, subtractScalar: n, multiply: t, divideScalar: a, isZero: s, unaryMinus: D } = r;
    return e(On, {
      any: function(o) {
        return fr(o);
      },
      "Array | Matrix": function(o) {
        var l;
        switch (mr(o) ? l = o.size() : Array.isArray(o) ? (o = u(o), l = o.size()) : l = [], l.length) {
          case 0:
            return fr(o);
          case 1:
            if (l[0] === 1) return fr(o.valueOf()[0]);
            if (l[0] === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Er(l) + ")");
          case 2: {
            var g = l[0], v = l[1];
            if (g === v) return f(o.clone().valueOf(), g);
            if (v === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Er(l) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Er(l) + ")");
        }
      }
    });
    function f(c, o, l) {
      if (o === 1) return fr(c[0][0]);
      if (o === 2) return n(t(c[0][0], c[1][1]), t(c[1][0], c[0][1]));
      for (var g = false, v = new Array(o).fill(0).map((b, E) => E), p = 0; p < o; p++) {
        var i = v[p];
        if (s(c[i][p])) {
          var d = void 0;
          for (d = p + 1; d < o; d++) if (!s(c[v[d]][p])) {
            i = v[d], v[d] = v[p], v[p] = i, g = !g;
            break;
          }
          if (d === o) return c[i][p];
        }
        for (var h = c[i][p], w = p === 0 ? 1 : c[v[p - 1]][p - 1], y = p + 1; y < o; y++) for (var C = v[y], F = p + 1; F < o; F++) c[C][F] = a(n(t(c[C][F], h), t(c[C][p], c[i][F])), w);
      }
      var A = c[v[o - 1]][o - 1];
      return g ? D(A) : A;
    }
  }), $n = "inv", af = [
    "typed",
    "matrix",
    "divideScalar",
    "addScalar",
    "multiply",
    "unaryMinus",
    "det",
    "identity",
    "abs"
  ], of = Y($n, af, (r) => {
    var { typed: e, matrix: u, divideScalar: n, addScalar: t, multiply: a, unaryMinus: s, det: D, identity: f, abs: c } = r;
    return e($n, {
      "Array | Matrix": function(g) {
        var v = mr(g) ? g.size() : hr(g);
        switch (v.length) {
          case 1:
            if (v[0] === 1) return mr(g) ? u([
              n(1, g.valueOf()[0])
            ]) : [
              n(1, g[0])
            ];
            throw new RangeError("Matrix must be square (size: " + Er(v) + ")");
          case 2: {
            var p = v[0], i = v[1];
            if (p === i) return mr(g) ? u(o(g.valueOf(), p, i), g.storage()) : o(g, p, i);
            throw new RangeError("Matrix must be square (size: " + Er(v) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Er(v) + ")");
        }
      },
      any: function(g) {
        return n(1, g);
      }
    });
    function o(l, g, v) {
      var p, i, d, h, w;
      if (g === 1) {
        if (h = l[0][0], h === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            n(1, h)
          ]
        ];
      } else if (g === 2) {
        var y = D(l);
        if (y === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            n(l[1][1], y),
            n(s(l[0][1]), y)
          ],
          [
            n(s(l[1][0]), y),
            n(l[0][0], y)
          ]
        ];
      } else {
        var C = l.concat();
        for (p = 0; p < g; p++) C[p] = C[p].concat();
        for (var F = f(g).valueOf(), A = 0; A < v; A++) {
          var b = c(C[A][A]), E = A;
          for (p = A + 1; p < g; ) c(C[p][A]) > b && (b = c(C[p][A]), E = p), p++;
          if (b === 0) throw Error("Cannot calculate inverse, determinant is zero");
          p = E, p !== A && (w = C[A], C[A] = C[p], C[p] = w, w = F[A], F[A] = F[p], F[p] = w);
          var m = C[A], B = F[A];
          for (p = 0; p < g; p++) {
            var _ = C[p], S = F[p];
            if (p !== A) {
              if (_[A] !== 0) {
                for (d = n(s(_[A]), m[A]), i = A; i < v; i++) _[i] = t(_[i], a(d, m[i]));
                for (i = 0; i < v; i++) S[i] = t(S[i], a(d, B[i]));
              }
            } else {
              for (d = m[A], i = A; i < v; i++) _[i] = n(_[i], d);
              for (i = 0; i < v; i++) S[i] = n(S[i], d);
            }
          }
        }
        return F;
      }
    }
  });
  function sf(r) {
    var { addScalar: e, subtract: u, flatten: n, multiply: t, multiplyScalar: a, divideScalar: s, sqrt: D, abs: f, bignumber: c, diag: o, size: l, reshape: g, inv: v, qr: p, usolve: i, usolveAll: d, equal: h, complex: w, larger: y, smaller: C, matrixFromColumns: F, dot: A } = r;
    function b(T, R, J, K) {
      var W = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, q = E(T, R, J, K, W);
      m(T, R, J, K, W, q);
      var { values: V, C: Z } = B(T, R, J, K, W);
      if (W) {
        var L = _(T, R, Z, q, V, J, K);
        return {
          values: V,
          eigenvectors: L
        };
      }
      return {
        values: V
      };
    }
    function E(T, R, J, K, W) {
      var q = K === "BigNumber", V = K === "Complex", Z = q ? c(0) : 0, L = q ? c(1) : V ? w(1) : 1, k = q ? c(1) : 1, G = q ? c(10) : 2, tr = a(G, G), ur;
      W && (ur = Array(R).fill(L));
      for (var nr = false; !nr; ) {
        nr = true;
        for (var ar = 0; ar < R; ar++) {
          for (var or = Z, cr = Z, vr = 0; vr < R; vr++) ar !== vr && (or = e(or, f(T[vr][ar])), cr = e(cr, f(T[ar][vr])));
          if (!h(or, 0) && !h(cr, 0)) {
            for (var Dr = k, dr = or, Or = s(cr, G), $r = a(cr, G); C(dr, Or); ) dr = a(dr, tr), Dr = a(Dr, G);
            for (; y(dr, $r); ) dr = s(dr, tr), Dr = s(Dr, G);
            var Br = C(s(e(dr, cr), Dr), a(e(or, cr), 0.95));
            if (Br) {
              nr = false;
              for (var Sr = s(1, Dr), Ir = 0; Ir < R; Ir++) ar !== Ir && (T[ar][Ir] = a(T[ar][Ir], Sr), T[Ir][ar] = a(T[Ir][ar], Dr));
              W && (ur[ar] = a(ur[ar], Sr));
            }
          }
        }
      }
      return W ? o(ur) : null;
    }
    function m(T, R, J, K, W, q) {
      var V = K === "BigNumber", Z = K === "Complex", L = V ? c(0) : Z ? w(0) : 0;
      V && (J = c(J));
      for (var k = 0; k < R - 2; k++) {
        for (var G = 0, tr = L, ur = k + 1; ur < R; ur++) {
          var nr = T[ur][k];
          C(f(tr), f(nr)) && (tr = nr, G = ur);
        }
        if (!C(f(tr), J)) {
          if (G !== k + 1) {
            var ar = T[G];
            T[G] = T[k + 1], T[k + 1] = ar;
            for (var or = 0; or < R; or++) {
              var cr = T[or][G];
              T[or][G] = T[or][k + 1], T[or][k + 1] = cr;
            }
            if (W) {
              var vr = q[G];
              q[G] = q[k + 1], q[k + 1] = vr;
            }
          }
          for (var Dr = k + 2; Dr < R; Dr++) {
            var dr = s(T[Dr][k], tr);
            if (dr !== 0) {
              for (var Or = 0; Or < R; Or++) T[Dr][Or] = u(T[Dr][Or], a(dr, T[k + 1][Or]));
              for (var $r = 0; $r < R; $r++) T[$r][k + 1] = e(T[$r][k + 1], a(dr, T[$r][Dr]));
              if (W) for (var Br = 0; Br < R; Br++) q[Dr][Br] = u(q[Dr][Br], a(dr, q[k + 1][Br]));
            }
          }
        }
      }
      return q;
    }
    function B(T, R, J, K, W) {
      var q = K === "BigNumber", V = K === "Complex", Z = q ? c(1) : V ? w(1) : 1;
      q && (J = c(J));
      for (var L = fr(T), k = [], G = R, tr = [], ur = W ? o(Array(R).fill(Z)) : void 0, nr = W ? o(Array(G).fill(Z)) : void 0, ar = 0; ar <= 100; ) {
        ar += 1;
        for (var or = L[G - 1][G - 1], cr = 0; cr < G; cr++) L[cr][cr] = u(L[cr][cr], or);
        var { Q: vr, R: Dr } = p(L);
        L = t(Dr, vr);
        for (var dr = 0; dr < G; dr++) L[dr][dr] = e(L[dr][dr], or);
        if (W && (nr = t(nr, vr)), G === 1 || C(f(L[G - 1][G - 2]), J)) {
          ar = 0, k.push(L[G - 1][G - 1]), W && (tr.unshift([
            [
              1
            ]
          ]), x(nr, R), ur = t(ur, nr), G > 1 && (nr = o(Array(G - 1).fill(Z)))), G -= 1, L.pop();
          for (var Or = 0; Or < G; Or++) L[Or].pop();
        } else if (G === 2 || C(f(L[G - 2][G - 3]), J)) {
          ar = 0;
          var $r = S(L[G - 2][G - 2], L[G - 2][G - 1], L[G - 1][G - 2], L[G - 1][G - 1]);
          k.push(...$r), W && (tr.unshift(M(L[G - 2][G - 2], L[G - 2][G - 1], L[G - 1][G - 2], L[G - 1][G - 1], $r[0], $r[1], J, K)), x(nr, R), ur = t(ur, nr), G > 2 && (nr = o(Array(G - 2).fill(Z)))), G -= 2, L.pop(), L.pop();
          for (var Br = 0; Br < G; Br++) L[Br].pop(), L[Br].pop();
        }
        if (G === 0) break;
      }
      if (k.sort((fe, Jr) => +u(f(fe), f(Jr))), ar > 100) {
        var Sr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + k.join(", "));
        throw Sr.values = k, Sr.vectors = [], Sr;
      }
      var Ir = W ? t(ur, O(tr, R)) : void 0;
      return {
        values: k,
        C: Ir
      };
    }
    function _(T, R, J, K, W, q, V) {
      var Z = v(J), L = t(Z, T, J), k = V === "BigNumber", G = V === "Complex", tr = k ? c(0) : G ? w(0) : 0, ur = k ? c(1) : G ? w(1) : 1, nr = [], ar = [];
      for (var or of W) {
        var cr = N(nr, or, h);
        cr === -1 ? (nr.push(or), ar.push(1)) : ar[cr] += 1;
      }
      for (var vr = [], Dr = nr.length, dr = Array(R).fill(tr), Or = o(Array(R).fill(ur)), $r = function() {
        var Ir = nr[Br], fe = u(L, t(Ir, Or)), Jr = d(fe, dr);
        for (Jr.shift(); Jr.length < ar[Br]; ) {
          var ne = P(fe, R, Jr, q, V);
          if (ne === null) break;
          Jr.push(ne);
        }
        var tt = t(v(K), J);
        Jr = Jr.map((ye) => t(tt, ye)), vr.push(...Jr.map((ye) => ({
          value: Ir,
          vector: n(ye)
        })));
      }, Br = 0; Br < Dr; Br++) $r();
      return vr;
    }
    function S(T, R, J, K) {
      var W = e(T, K), q = u(a(T, K), a(R, J)), V = a(W, 0.5), Z = a(D(u(a(W, W), a(4, q))), 0.5);
      return [
        e(V, Z),
        u(V, Z)
      ];
    }
    function M(T, R, J, K, W, q, V, Z) {
      var L = Z === "BigNumber", k = Z === "Complex", G = L ? c(0) : k ? w(0) : 0, tr = L ? c(1) : k ? w(1) : 1;
      if (C(f(J), V)) return [
        [
          tr,
          G
        ],
        [
          G,
          tr
        ]
      ];
      if (y(f(u(W, q)), V)) return [
        [
          u(W, K),
          u(q, K)
        ],
        [
          J,
          J
        ]
      ];
      var ur = u(T, W), nr = u(K, W);
      return C(f(R), V) && C(f(nr), V) ? [
        [
          ur,
          tr
        ],
        [
          J,
          G
        ]
      ] : [
        [
          R,
          G
        ],
        [
          nr,
          tr
        ]
      ];
    }
    function x(T, R) {
      for (var J = 0; J < T.length; J++) T[J].push(...Array(R - T[J].length).fill(0));
      for (var K = T.length; K < R; K++) T.push(Array(R).fill(0)), T[K][K] = 1;
      return T;
    }
    function O(T, R) {
      for (var J = [], K = 0; K < R; K++) J[K] = Array(R).fill(0);
      var W = 0;
      for (var q of T) {
        for (var V = q.length, Z = 0; Z < V; Z++) for (var L = 0; L < V; L++) J[W + Z][W + L] = q[Z][L];
        W += V;
      }
      return J;
    }
    function N(T, R, J) {
      for (var K = 0; K < T.length; K++) if (J(T[K], R)) return K;
      return -1;
    }
    function P(T, R, J, K, W) {
      for (var q = W === "BigNumber" ? c(1e3) : 1e3, V, Z = 0; Z < 5; ++Z) {
        V = z(R, J, W);
        try {
          V = i(T, V);
        } catch {
          continue;
        }
        if (y(Q(V), q)) break;
      }
      if (Z >= 5) return null;
      for (Z = 0; ; ) {
        var L = i(T, V);
        if (C(Q(I(V, [
          L
        ])), K)) break;
        if (++Z >= 10) return null;
        V = H(L);
      }
      return V;
    }
    function z(T, R, J) {
      var K = J === "BigNumber", W = J === "Complex", q = Array(T).fill(0).map((V) => 2 * Math.random() - 1);
      return K && (q = q.map((V) => c(V))), W && (q = q.map((V) => w(V))), q = I(q, R), H(q, J);
    }
    function I(T, R) {
      var J = l(T);
      for (var K of R) K = g(K, J), T = u(T, t(s(A(K, T), A(K, K)), K));
      return T;
    }
    function Q(T) {
      return f(D(A(T, T)));
    }
    function H(T, R) {
      var J = R === "BigNumber", K = R === "Complex", W = J ? c(1) : K ? w(1) : 1;
      return t(s(W, Q(T)), T);
    }
    return b;
  }
  function ff(r) {
    var { config: e, addScalar: u, subtract: n, abs: t, atan: a, cos: s, sin: D, multiplyScalar: f, inv: c, bignumber: o, multiply: l, add: g } = r;
    function v(m, B) {
      var _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, S = arguments.length > 3 ? arguments[3] : void 0, M = arguments.length > 4 ? arguments[4] : void 0;
      if (S === "number") return p(m, _, M);
      if (S === "BigNumber") return i(m, _, M);
      throw TypeError("Unsupported data type: " + S);
    }
    function p(m, B, _) {
      var S = m.length, M = Math.abs(B / S), x, O;
      if (_) {
        O = new Array(S);
        for (var N = 0; N < S; N++) O[N] = Array(S).fill(0), O[N][N] = 1;
      }
      for (var P = A(m); Math.abs(P[1]) >= Math.abs(M); ) {
        var z = P[0][0], I = P[0][1];
        x = d(m[z][z], m[I][I], m[z][I]), m = F(m, x, z, I), _ && (O = w(O, x, z, I)), P = A(m);
      }
      for (var Q = Array(S).fill(0), H = 0; H < S; H++) Q[H] = m[H][H];
      return E(fr(Q), O, _);
    }
    function i(m, B, _) {
      var S = m.length, M = t(B / S), x, O;
      if (_) {
        O = new Array(S);
        for (var N = 0; N < S; N++) O[N] = Array(S).fill(0), O[N][N] = 1;
      }
      for (var P = b(m); t(P[1]) >= t(M); ) {
        var z = P[0][0], I = P[0][1];
        x = h(m[z][z], m[I][I], m[z][I]), m = C(m, x, z, I), _ && (O = y(O, x, z, I)), P = b(m);
      }
      for (var Q = Array(S).fill(0), H = 0; H < S; H++) Q[H] = m[H][H];
      return E(fr(Q), O, _);
    }
    function d(m, B, _) {
      var S = B - m;
      return Math.abs(S) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * _ / (B - m));
    }
    function h(m, B, _) {
      var S = n(B, m);
      return t(S) <= e.relTol ? o(-1).acos().div(4) : f(0.5, a(l(2, _, c(S))));
    }
    function w(m, B, _, S) {
      for (var M = m.length, x = Math.cos(B), O = Math.sin(B), N = Array(M).fill(0), P = Array(M).fill(0), z = 0; z < M; z++) N[z] = x * m[z][_] - O * m[z][S], P[z] = O * m[z][_] + x * m[z][S];
      for (var I = 0; I < M; I++) m[I][_] = N[I], m[I][S] = P[I];
      return m;
    }
    function y(m, B, _, S) {
      for (var M = m.length, x = s(B), O = D(B), N = Array(M).fill(o(0)), P = Array(M).fill(o(0)), z = 0; z < M; z++) N[z] = n(f(x, m[z][_]), f(O, m[z][S])), P[z] = u(f(O, m[z][_]), f(x, m[z][S]));
      for (var I = 0; I < M; I++) m[I][_] = N[I], m[I][S] = P[I];
      return m;
    }
    function C(m, B, _, S) {
      for (var M = m.length, x = o(s(B)), O = o(D(B)), N = f(x, x), P = f(O, O), z = Array(M).fill(o(0)), I = Array(M).fill(o(0)), Q = l(o(2), x, O, m[_][S]), H = u(n(f(N, m[_][_]), Q), f(P, m[S][S])), T = g(f(P, m[_][_]), Q, f(N, m[S][S])), R = 0; R < M; R++) z[R] = n(f(x, m[_][R]), f(O, m[S][R])), I[R] = u(f(O, m[_][R]), f(x, m[S][R]));
      m[_][_] = H, m[S][S] = T, m[_][S] = o(0), m[S][_] = o(0);
      for (var J = 0; J < M; J++) J !== _ && J !== S && (m[_][J] = z[J], m[J][_] = z[J], m[S][J] = I[J], m[J][S] = I[J]);
      return m;
    }
    function F(m, B, _, S) {
      for (var M = m.length, x = Math.cos(B), O = Math.sin(B), N = x * x, P = O * O, z = Array(M).fill(0), I = Array(M).fill(0), Q = N * m[_][_] - 2 * x * O * m[_][S] + P * m[S][S], H = P * m[_][_] + 2 * x * O * m[_][S] + N * m[S][S], T = 0; T < M; T++) z[T] = x * m[_][T] - O * m[S][T], I[T] = O * m[_][T] + x * m[S][T];
      m[_][_] = Q, m[S][S] = H, m[_][S] = 0, m[S][_] = 0;
      for (var R = 0; R < M; R++) R !== _ && R !== S && (m[_][R] = z[R], m[R][_] = z[R], m[S][R] = I[R], m[R][S] = I[R]);
      return m;
    }
    function A(m) {
      for (var B = m.length, _ = 0, S = [
        0,
        1
      ], M = 0; M < B; M++) for (var x = M + 1; x < B; x++) Math.abs(_) < Math.abs(m[M][x]) && (_ = Math.abs(m[M][x]), S = [
        M,
        x
      ]);
      return [
        S,
        _
      ];
    }
    function b(m) {
      for (var B = m.length, _ = 0, S = [
        0,
        1
      ], M = 0; M < B; M++) for (var x = M + 1; x < B; x++) t(_) < t(m[M][x]) && (_ = t(m[M][x]), S = [
        M,
        x
      ]);
      return [
        S,
        _
      ];
    }
    function E(m, B, _) {
      var S = m.length, M = Array(S), x;
      if (_) {
        x = Array(S);
        for (var O = 0; O < S; O++) x[O] = Array(S);
      }
      for (var N = 0; N < S; N++) {
        for (var P = 0, z = m[0], I = 0; I < m.length; I++) t(m[I]) < t(z) && (P = I, z = m[P]);
        if (M[N] = m.splice(P, 1)[0], _) for (var Q = 0; Q < S; Q++) x[N][Q] = B[Q][P], B[Q].splice(P, 1);
      }
      if (!_) return {
        values: M
      };
      var H = x.map((T, R) => ({
        value: M[R],
        vector: T
      }));
      return {
        values: M,
        eigenvectors: H
      };
    }
    return v;
  }
  var lf = "eigs", cf = [
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
  ], vf = Y(lf, cf, (r) => {
    var { config: e, typed: u, matrix: n, addScalar: t, subtract: a, equal: s, abs: D, atan: f, cos: c, sin: o, multiplyScalar: l, divideScalar: g, inv: v, bignumber: p, multiply: i, add: d, larger: h, column: w, flatten: y, number: C, complex: F, sqrt: A, diag: b, size: E, reshape: m, qr: B, usolve: _, usolveAll: S, im: M, re: x, smaller: O, matrixFromColumns: N, dot: P } = r, z = ff({
      config: e,
      addScalar: t,
      subtract: a,
      abs: D,
      atan: f,
      cos: c,
      sin: o,
      multiplyScalar: l,
      inv: v,
      bignumber: p,
      multiply: i,
      add: d
    }), I = sf({
      addScalar: t,
      subtract: a,
      multiply: i,
      multiplyScalar: l,
      flatten: y,
      divideScalar: g,
      sqrt: A,
      abs: D,
      bignumber: p,
      diag: b,
      size: E,
      reshape: m,
      qr: B,
      inv: v,
      usolve: _,
      usolveAll: S,
      equal: s,
      complex: F,
      larger: h,
      smaller: O,
      matrixFromColumns: N,
      dot: P
    });
    return u("eigs", {
      Array: function(q) {
        return Q(n(q));
      },
      "Array, number|BigNumber": function(q, V) {
        return Q(n(q), {
          precision: V
        });
      },
      "Array, Object"(W, q) {
        return Q(n(W), q);
      },
      Matrix: function(q) {
        return Q(q, {
          matricize: true
        });
      },
      "Matrix, number|BigNumber": function(q, V) {
        return Q(q, {
          precision: V,
          matricize: true
        });
      },
      "Matrix, Object": function(q, V) {
        var Z = {
          matricize: true
        };
        return Qe(Z, V), Q(q, Z);
      }
    });
    function Q(W) {
      var q, V = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, Z = "eigenvectors" in V ? V.eigenvectors : true, L = (q = V.precision) !== null && q !== void 0 ? q : e.relTol, k = H(W, L, Z);
      return V.matricize && (k.values = n(k.values), Z && (k.eigenvectors = k.eigenvectors.map((G) => {
        var { value: tr, vector: ur } = G;
        return {
          value: tr,
          vector: n(ur)
        };
      }))), Z && Object.defineProperty(k, "vectors", {
        enumerable: false,
        get: () => {
          throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
        }
      }), k;
    }
    function H(W, q, V) {
      var Z = W.toArray(), L = W.size();
      if (L.length !== 2 || L[0] !== L[1]) throw new RangeError("Matrix must be square (size: ".concat(Er(L), ")"));
      var k = L[0];
      if (R(Z, k, q) && (J(Z, k), T(Z, k, q))) {
        var G = K(W, Z, k);
        return z(Z, k, q, G, V);
      }
      var tr = K(W, Z, k);
      return I(Z, k, q, tr, V);
    }
    function T(W, q, V) {
      for (var Z = 0; Z < q; Z++) for (var L = Z; L < q; L++) if (h(p(D(a(W[Z][L], W[L][Z]))), V)) return false;
      return true;
    }
    function R(W, q, V) {
      for (var Z = 0; Z < q; Z++) for (var L = 0; L < q; L++) if (h(p(D(M(W[Z][L]))), V)) return false;
      return true;
    }
    function J(W, q) {
      for (var V = 0; V < q; V++) for (var Z = 0; Z < q; Z++) W[V][Z] = x(W[V][Z]);
    }
    function K(W, q, V) {
      var Z = W.datatype();
      if (Z === "number" || Z === "BigNumber" || Z === "Complex") return Z;
      for (var L = false, k = false, G = false, tr = 0; tr < V; tr++) for (var ur = 0; ur < V; ur++) {
        var nr = q[tr][ur];
        if (yr(nr) || pt(nr)) L = true;
        else if (_r(nr)) k = true;
        else if (Dt(nr)) G = true;
        else throw TypeError("Unsupported type in Matrix: " + Xr(nr));
      }
      if (k && G && console.warn("Complex BigNumbers not supported, this operation will lose precission."), G) {
        for (var ar = 0; ar < V; ar++) for (var or = 0; or < V; or++) q[ar][or] = F(q[ar][or]);
        return "Complex";
      }
      if (k) {
        for (var cr = 0; cr < V; cr++) for (var vr = 0; vr < V; vr++) q[cr][vr] = p(q[cr][vr]);
        return "BigNumber";
      }
      if (L) {
        for (var Dr = 0; Dr < V; Dr++) for (var dr = 0; dr < V; dr++) q[Dr][dr] = C(q[Dr][dr]);
        return "number";
      } else throw TypeError("Matrix contains unsupported types only.");
    }
  }), Df = "divide", pf = [
    "typed",
    "matrix",
    "multiply",
    "equalScalar",
    "divideScalar",
    "inv"
  ], df = Y(Df, pf, (r) => {
    var { typed: e, matrix: u, multiply: n, equalScalar: t, divideScalar: a, inv: s } = r, D = fu({
      typed: e,
      equalScalar: t
    }), f = Ft({
      typed: e
    });
    return e("divide", Ln({
      "Array | Matrix, Array | Matrix": function(o, l) {
        return n(o, s(l));
      },
      "DenseMatrix, any": function(o, l) {
        return f(o, l, a, false);
      },
      "SparseMatrix, any": function(o, l) {
        return D(o, l, a, false);
      },
      "Array, any": function(o, l) {
        return f(u(o), l, a, false).valueOf();
      },
      "any, Array | Matrix": function(o, l) {
        return n(o, s(l));
      }
    }, a.signatures));
  }), Ce = za({
    config: qr
  }), ke = Ia({}), Et = Va({}), wt = Ja({}), Lr = ii({
    Matrix: wt
  }), er = xa({
    BigNumber: Ce,
    Complex: ke,
    DenseMatrix: Lr,
    Fraction: Et
  }), bt = Li({
    typed: er
  }), me = Vi({
    typed: er
  }), hf = Zs({
    typed: er
  }), Ct = Mi({
    Complex: ke,
    typed: er
  }), je = To({
    typed: er
  }), mf = Js({
    typed: er
  }), Kr = hi({
    config: qr,
    typed: er
  }), hu = Jo({
    typed: er
  }), gf = Yo({
    typed: er
  }), yf = Oo({
    typed: er
  }), mu = si({
    typed: er
  }), Af = ci({
    config: qr,
    typed: er
  }), gu = Di({
    equalScalar: Kr,
    typed: er
  }), ge = yo({
    typed: er
  }), _t = bi({
    typed: er
  }), Ff = Io({
    typed: er
  }), Ef = wo({
    BigNumber: Ce,
    Fraction: Et,
    complex: Ct,
    typed: er
  }), wf = Ys({
    typed: er
  }), re = yi({
    Matrix: wt,
    equalScalar: Kr,
    typed: er
  }), _e = Gi({
    typed: er
  }), Be = Bi({
    BigNumber: Ce,
    typed: er
  }), gr = $i({
    DenseMatrix: Lr,
    Matrix: wt,
    SparseMatrix: re,
    typed: er
  }), bf = es({
    isInteger: mu,
    matrix: gr,
    typed: er
  }), Bt = _o({
    Complex: ke,
    config: qr,
    typed: er
  }), yu = as({
    matrix: gr,
    typed: er
  }), Cf = fs({
    BigNumber: Ce,
    config: qr,
    matrix: gr,
    typed: er
  }), oe = qo({
    isInteger: mu,
    matrix: gr,
    typed: er
  }), _f = os({
    conj: je,
    transpose: yu,
    typed: er
  }), Bf = Zo({
    DenseMatrix: Lr,
    SparseMatrix: re,
    matrix: gr,
    typed: er
  }), Au = Es({
    DenseMatrix: Lr,
    SparseMatrix: re,
    concat: oe,
    equalScalar: Kr,
    matrix: gr,
    typed: er
  }), Fu = zi({
    Fraction: Et,
    typed: er
  }), St = Ko({
    BigNumber: Ce,
    DenseMatrix: Lr,
    SparseMatrix: re,
    config: qr,
    matrix: gr,
    typed: er
  }), Sf = Os({
    DenseMatrix: Lr,
    SparseMatrix: re,
    concat: oe,
    config: qr,
    matrix: gr,
    typed: er
  }), xf = vs({
    bignumber: Be,
    fraction: Fu,
    number: _t
  }), xt = ns({
    matrix: gr,
    config: qr,
    typed: er
  }), rt = Cs({
    DenseMatrix: Lr,
    SparseMatrix: re,
    bignumber: Be,
    concat: oe,
    config: qr,
    matrix: gr,
    typed: er
  }), et = Pi({
    typed: er
  }), Mt = Ks({
    DenseMatrix: Lr,
    SparseMatrix: re,
    addScalar: me,
    concat: oe,
    equalScalar: Kr,
    matrix: gr,
    typed: er
  }), se = ps({
    numeric: xf,
    typed: er
  }), Mf = qs({
    DenseMatrix: Lr,
    smaller: rt
  }), Nf = Ls({
    ImmutableDenseMatrix: Mf,
    getMatrixDataType: gf
  }), Nt = Ns({
    DenseMatrix: Lr,
    SparseMatrix: re,
    bignumber: Be,
    concat: oe,
    config: qr,
    matrix: gr,
    typed: er
  }), Tf = Ri({
    flatten: hu,
    matrix: gr,
    size: xt,
    typed: er
  }), zf = tf({
    addScalar: me,
    complex: Ct,
    conj: je,
    divideScalar: se,
    equal: Au,
    identity: St,
    isZero: gu,
    matrix: gr,
    multiplyScalar: ge,
    sign: Ef,
    sqrt: Bt,
    subtractScalar: _e,
    typed: er,
    unaryMinus: et,
    zeros: Cf
  }), Of = Ss({
    DenseMatrix: Lr,
    SparseMatrix: re,
    concat: oe,
    config: qr,
    matrix: gr,
    typed: er
  }), ve = So({
    DenseMatrix: Lr,
    concat: oe,
    equalScalar: Kr,
    matrix: gr,
    subtractScalar: _e,
    typed: er,
    unaryMinus: et
  }), $f = gs({
    DenseMatrix: Lr,
    divideScalar: se,
    equalScalar: Kr,
    matrix: gr,
    multiplyScalar: ge,
    subtractScalar: _e,
    typed: er
  }), Eu = rf({
    addScalar: me,
    conj: je,
    multiplyScalar: ge,
    size: xt,
    typed: er
  }), jr = Fo({
    addScalar: me,
    dot: Eu,
    equalScalar: Kr,
    matrix: gr,
    multiplyScalar: ge,
    typed: er
  }), If = jo({
    bignumber: Be,
    matrix: gr,
    add: Mt,
    config: qr,
    isPositive: Af,
    larger: Nt,
    largerEq: Sf,
    smaller: rt,
    smallerEq: Of,
    typed: er
  }), Rf = As({
    DenseMatrix: Lr,
    divideScalar: se,
    equalScalar: Kr,
    matrix: gr,
    multiplyScalar: ge,
    subtractScalar: _e,
    typed: er
  }), qf = Uo({
    Index: Nf,
    matrix: gr,
    range: If,
    typed: er
  }), ze = Wo({
    matrix: gr,
    multiply: jr,
    subtract: ve,
    typed: er
  }), Pf = uf({
    divideScalar: se,
    isZero: gu,
    matrix: gr,
    multiply: jr,
    subtractScalar: _e,
    typed: er,
    unaryMinus: et
  }), Tt = of({
    abs: bt,
    addScalar: me,
    det: Pf,
    divideScalar: se,
    identity: St,
    matrix: gr,
    multiply: jr,
    typed: er,
    unaryMinus: et
  }), Uf = hs({
    Complex: ke,
    config: qr,
    fraction: Fu,
    identity: St,
    inv: Tt,
    matrix: gr,
    multiply: jr,
    number: _t,
    typed: er
  }), Oe = df({
    divideScalar: se,
    equalScalar: Kr,
    inv: Tt,
    matrix: gr,
    multiply: jr,
    typed: er
  }), Lf = vf({
    abs: bt,
    add: Mt,
    addScalar: me,
    atan: hf,
    bignumber: Be,
    column: qf,
    complex: Ct,
    config: qr,
    cos: mf,
    diag: Bf,
    divideScalar: se,
    dot: Eu,
    equal: Au,
    flatten: hu,
    im: yf,
    inv: Tt,
    larger: Nt,
    matrix: gr,
    matrixFromColumns: Tf,
    multiply: jr,
    multiplyScalar: ge,
    number: _t,
    qr: zf,
    re: Ff,
    reshape: bf,
    sin: wf,
    size: xt,
    smaller: rt,
    sqrt: Bt,
    subtract: ve,
    typed: er,
    usolve: $f,
    usolveAll: Rf
  }), $e = ks({
    abs: bt,
    add: Mt,
    conj: je,
    ctranspose: _f,
    eigs: Lf,
    equalScalar: Kr,
    larger: Nt,
    matrix: gr,
    multiply: jr,
    pow: Uf,
    smaller: rt,
    sqrt: Bt,
    typed: er
  }), wu = {
    exports: {}
  };
  (function(r, e) {
    var u = function() {
      var n = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
      return typeof __filename < "u" && (n = n || __filename), function(a) {
        a = a || {};
        var a = typeof a < "u" ? a : {}, s, D;
        a.ready = new Promise(function($, U) {
          s = $, D = U;
        });
        var f = {}, c;
        for (c in a) a.hasOwnProperty(c) && (f[c] = a[c]);
        var o = function($, U) {
          throw U;
        }, l = false, g = false, v = false, p = false;
        l = typeof window == "object", g = typeof importScripts == "function", v = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", p = !l && !v && !g;
        var i = "";
        function d($) {
          return a.locateFile ? a.locateFile($, i) : i + $;
        }
        var h, w, y, C;
        v ? (g ? i = ut.dirname(i) + "/" : i = __dirname + "/", h = function(U, j) {
          return y || (y = ut), C || (C = ut), U = C.normalize(U), y.readFileSync(U, j ? null : "utf8");
        }, w = function(U) {
          var j = h(U, true);
          return j.buffer || (j = new Uint8Array(j)), S(j.buffer), j;
        }, process.argv.length > 1 && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function($) {
          if (!($ instanceof Ot)) throw $;
        }), process.on("unhandledRejection", vr), o = function($) {
          process.exit($);
        }, a.inspect = function() {
          return "[Emscripten Module object]";
        }) : p ? (typeof read < "u" && (h = function(U) {
          return read(U);
        }), w = function(U) {
          var j;
          return typeof readbuffer == "function" ? new Uint8Array(readbuffer(U)) : (j = read(U, "binary"), S(typeof j == "object"), j);
        }, typeof scriptArgs < "u" && scriptArgs, typeof quit == "function" && (o = function($) {
          quit($);
        }), typeof print < "u" && (typeof console > "u" && (console = {}), console.log = print, console.warn = console.error = typeof printErr < "u" ? printErr : print)) : (l || g) && (g ? i = self.location.href : document.currentScript && (i = document.currentScript.src), n && (i = n), i.indexOf("blob:") !== 0 ? i = i.substr(0, i.lastIndexOf("/") + 1) : i = "", h = function(U) {
          var j = new XMLHttpRequest();
          return j.open("GET", U, false), j.send(null), j.responseText;
        }, g && (w = function(U) {
          var j = new XMLHttpRequest();
          return j.open("GET", U, false), j.responseType = "arraybuffer", j.send(null), new Uint8Array(j.response);
        }));
        var F = a.print || console.log.bind(console), A = a.printErr || console.warn.bind(console);
        for (c in f) f.hasOwnProperty(c) && (a[c] = f[c]);
        f = null, a.arguments && a.arguments, a.thisProgram && a.thisProgram, a.quit && (o = a.quit);
        var b;
        a.wasmBinary && (b = a.wasmBinary);
        var E;
        a.noExitRuntime && (E = a.noExitRuntime), typeof WebAssembly != "object" && vr("no native wasm support detected");
        var m, B, _ = false;
        function S($, U) {
          $ || vr("Assertion failed: " + U);
        }
        var M = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
        function x($, U, j) {
          for (var Nr = U + j, Wr = U; $[Wr] && !(Wr >= Nr); ) ++Wr;
          if (Wr - U > 16 && $.subarray && M) return M.decode($.subarray(U, Wr));
          for (var Tr = ""; U < Wr; ) {
            var pr = $[U++];
            if (!(pr & 128)) {
              Tr += String.fromCharCode(pr);
              continue;
            }
            var sr = $[U++] & 63;
            if ((pr & 224) == 192) {
              Tr += String.fromCharCode((pr & 31) << 6 | sr);
              continue;
            }
            var Zr = $[U++] & 63;
            if ((pr & 240) == 224 ? pr = (pr & 15) << 12 | sr << 6 | Zr : pr = (pr & 7) << 18 | sr << 12 | Zr << 6 | $[U++] & 63, pr < 65536) Tr += String.fromCharCode(pr);
            else {
              var $t = pr - 65536;
              Tr += String.fromCharCode(55296 | $t >> 10, 56320 | $t & 1023);
            }
          }
          return Tr;
        }
        function O($, U) {
          return $ ? x(H, $, U) : "";
        }
        function N($, U, j, Nr) {
          if (!(Nr > 0)) return 0;
          for (var Wr = j, Tr = j + Nr - 1, pr = 0; pr < $.length; ++pr) {
            var sr = $.charCodeAt(pr);
            if (sr >= 55296 && sr <= 57343) {
              var Zr = $.charCodeAt(++pr);
              sr = 65536 + ((sr & 1023) << 10) | Zr & 1023;
            }
            if (sr <= 127) {
              if (j >= Tr) break;
              U[j++] = sr;
            } else if (sr <= 2047) {
              if (j + 1 >= Tr) break;
              U[j++] = 192 | sr >> 6, U[j++] = 128 | sr & 63;
            } else if (sr <= 65535) {
              if (j + 2 >= Tr) break;
              U[j++] = 224 | sr >> 12, U[j++] = 128 | sr >> 6 & 63, U[j++] = 128 | sr & 63;
            } else {
              if (j + 3 >= Tr) break;
              U[j++] = 240 | sr >> 18, U[j++] = 128 | sr >> 12 & 63, U[j++] = 128 | sr >> 6 & 63, U[j++] = 128 | sr & 63;
            }
          }
          return U[j] = 0, j - Wr;
        }
        function P($, U, j) {
          return N($, H, U, j);
        }
        function z($) {
          for (var U = 0, j = 0; j < $.length; ++j) {
            var Nr = $.charCodeAt(j);
            Nr >= 55296 && Nr <= 57343 && (Nr = 65536 + ((Nr & 1023) << 10) | $.charCodeAt(++j) & 1023), Nr <= 127 ? ++U : Nr <= 2047 ? U += 2 : Nr <= 65535 ? U += 3 : U += 4;
          }
          return U;
        }
        var I = 65536, Q, H, T;
        function R($) {
          Q = $, a.HEAP8 = new Int8Array($), a.HEAP16 = new Int16Array($), a.HEAP32 = T = new Int32Array($), a.HEAPU8 = H = new Uint8Array($), a.HEAPU16 = new Uint16Array($), a.HEAPU32 = new Uint32Array($), a.HEAPF32 = new Float32Array($), a.HEAPF64 = new Float64Array($);
        }
        var J = a.INITIAL_MEMORY || 16777216;
        a.wasmMemory ? m = a.wasmMemory : m = new WebAssembly.Memory({
          initial: J / I,
          maximum: J / I
        }), m && (Q = m.buffer), J = Q.byteLength, R(Q);
        var K = [], W = [], q = [], V = [];
        function Z() {
          if (a.preRun) for (typeof a.preRun == "function" && (a.preRun = [
            a.preRun
          ]); a.preRun.length; ) tr(a.preRun.shift());
          ne(K);
        }
        function L() {
          ne(W);
        }
        function k() {
          ne(q);
        }
        function G() {
          if (a.postRun) for (typeof a.postRun == "function" && (a.postRun = [
            a.postRun
          ]); a.postRun.length; ) ur(a.postRun.shift());
          ne(V);
        }
        function tr($) {
          K.unshift($);
        }
        function ur($) {
          V.unshift($);
        }
        var nr = 0, ar = null;
        function or($) {
          nr++, a.monitorRunDependencies && a.monitorRunDependencies(nr);
        }
        function cr($) {
          if (nr--, a.monitorRunDependencies && a.monitorRunDependencies(nr), nr == 0 && ar) {
            var U = ar;
            ar = null, U();
          }
        }
        a.preloadedImages = {}, a.preloadedAudios = {};
        function vr($) {
          a.onAbort && a.onAbort($), $ += "", A($), _ = true, $ = "abort(" + $ + "). Build with -s ASSERTIONS=1 for more info.";
          var U = new WebAssembly.RuntimeError($);
          throw D(U), U;
        }
        function Dr($, U) {
          return String.prototype.startsWith ? $.startsWith(U) : $.indexOf(U) === 0;
        }
        var dr = "data:application/octet-stream;base64,";
        function Or($) {
          return Dr($, dr);
        }
        var $r = "file://";
        function Br($) {
          return Dr($, $r);
        }
        var Sr = "triangle.out.wasm";
        Or(Sr) || (Sr = d(Sr));
        function Ir() {
          try {
            if (b) return new Uint8Array(b);
            if (w) return w(Sr);
            throw "both async and sync fetching of the wasm failed";
          } catch ($) {
            vr($);
          }
        }
        function fe() {
          return !b && (l || g) && typeof fetch == "function" && !Br(Sr) ? fetch(Sr, {
            credentials: "same-origin"
          }).then(function($) {
            if (!$.ok) throw "failed to load wasm binary file at '" + Sr + "'";
            return $.arrayBuffer();
          }).catch(function() {
            return Ir();
          }) : Promise.resolve().then(Ir);
        }
        function Jr() {
          var $ = {
            a: Mu
          };
          function U(pr, sr) {
            var Zr = pr.exports;
            a.asm = Zr, B = a.asm.g, cr();
          }
          or();
          function j(pr) {
            U(pr.instance);
          }
          function Nr(pr) {
            return fe().then(function(sr) {
              return WebAssembly.instantiate(sr, $);
            }).then(pr, function(sr) {
              A("failed to asynchronously prepare wasm: " + sr), vr(sr);
            });
          }
          function Wr() {
            if (!b && typeof WebAssembly.instantiateStreaming == "function" && !Or(Sr) && !Br(Sr) && typeof fetch == "function") fetch(Sr, {
              credentials: "same-origin"
            }).then(function(pr) {
              var sr = WebAssembly.instantiateStreaming(pr, $);
              return sr.then(j, function(Zr) {
                return A("wasm streaming compile failed: " + Zr), A("falling back to ArrayBuffer instantiation"), Nr(j);
              });
            });
            else return Nr(j);
          }
          if (a.instantiateWasm) try {
            var Tr = a.instantiateWasm($, U);
            return Tr;
          } catch (pr) {
            return A("Module.instantiateWasm callback failed with error: " + pr), false;
          }
          return Wr(), {};
        }
        function ne($) {
          for (; $.length > 0; ) {
            var U = $.shift();
            if (typeof U == "function") {
              U(a);
              continue;
            }
            var j = U.func;
            typeof j == "number" ? U.arg === void 0 ? B.get(j)() : B.get(j)(U.arg) : j(U.arg === void 0 ? null : U.arg);
          }
        }
        function tt($, U, j) {
          H.copyWithin($, U, U + j);
        }
        function ye($) {
          vr("OOM");
        }
        function _u($) {
          ye();
        }
        function Bu($) {
          Nu($);
        }
        var Se = {
          mappings: {},
          buffers: [
            null,
            [],
            []
          ],
          printChar: function($, U) {
            var j = Se.buffers[$];
            U === 0 || U === 10 ? (($ === 1 ? F : A)(x(j, 0)), j.length = 0) : j.push(U);
          },
          varargs: void 0,
          get: function() {
            Se.varargs += 4;
            var $ = T[Se.varargs - 4 >> 2];
            return $;
          },
          getStr: function($) {
            var U = O($);
            return U;
          },
          get64: function($, U) {
            return $;
          }
        };
        function Su($, U, j, Nr) {
          for (var Wr = 0, Tr = 0; Tr < j; Tr++) {
            for (var pr = T[U + Tr * 8 >> 2], sr = T[U + (Tr * 8 + 4) >> 2], Zr = 0; Zr < sr; Zr++) Se.printChar($, H[pr + Zr]);
            Wr += sr;
          }
          return T[Nr >> 2] = Wr, 0;
        }
        function xu($) {
          var U = Date.now();
          return T[$ >> 2] = U / 1e3 | 0, T[$ + 4 >> 2] = U % 1e3 * 1e3 | 0, 0;
        }
        W.push({
          func: function() {
            zt();
          }
        });
        var Mu = {
          d: tt,
          e: _u,
          f: Bu,
          c: Su,
          b: xu,
          a: m
        };
        Jr();
        var zt = a.___wasm_call_ctors = function() {
          return (zt = a.___wasm_call_ctors = a.asm.h).apply(null, arguments);
        };
        a._malloc = function() {
          return (a._malloc = a.asm.i).apply(null, arguments);
        }, a._free = function() {
          return (a._free = a.asm.j).apply(null, arguments);
        }, a._triangulate = function() {
          return (a._triangulate = a.asm.k).apply(null, arguments);
        }, a.stringToUTF8 = P, a.lengthBytesUTF8 = z;
        var xe;
        function Ot($) {
          this.name = "ExitStatus", this.message = "Program terminated with exit(" + $ + ")", this.status = $;
        }
        ar = function $() {
          xe || nt(), xe || (ar = $);
        };
        function nt($) {
          if (nr > 0 || (Z(), nr > 0)) return;
          function U() {
            xe || (xe = true, a.calledRun = true, !_ && (L(), k(), s(a), a.onRuntimeInitialized && a.onRuntimeInitialized(), G()));
          }
          a.setStatus ? (a.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              a.setStatus("");
            }, 1), U();
          }, 1)) : U();
        }
        a.run = nt;
        function Nu($, U) {
          E || (a.onExit && a.onExit($), _ = true), o($, new Ot($));
        }
        if (a.preInit) for (typeof a.preInit == "function" && (a.preInit = [
          a.preInit
        ]); a.preInit.length > 0; ) a.preInit.pop()();
        return E = true, nt(), a.ready;
      };
    }();
    r.exports = u;
  })(wu);
  var Wf = wu.exports;
  const Vf = Wf;
  let Fr = {};
  const Zf = (r) => {
    const e = Fr.lengthBytesUTF8(r) + 1, u = Fr._malloc(e);
    return Fr.stringToUTF8(r, u, e), u;
  }, Pr = (r, e = Int32Array) => {
    if (!r || !r.length) return null;
    const u = Gf(r, e), n = Fr._malloc(u.length * u.BYTES_PER_ELEMENT), t = n / u.BYTES_PER_ELEMENT, a = bu(e);
    return Fr[a].subarray(t, t + u.length).set(u), n;
  }, Rr = (r, e, u = Int32Array) => {
    if (!r) return null;
    const n = r / u.BYTES_PER_ELEMENT, t = bu(u);
    return Fr[t].subarray(n, n + e);
  }, bu = (r) => {
    switch (r) {
      case Float64Array:
        return "HEAPF64";
      case Int32Array:
        return "HEAP32";
      default:
        return "HEAP8";
    }
  }, Gf = (r, e) => r.constructor == e ? r : new e(r), Cu = (r, e, u = null) => {
    if (typeof r == "string") return r;
    (typeof r != "object" || !r) && (r = {});
    let n = "";
    return r.pslg !== false && (n = `${n}p`), n = `${n}z`, u !== null && (n = `${n}v`), r.quiet !== false && (n = `${n}Q`), r.refine === true && (n = `${n}r`), r.regionAttr === true && (n = `${n}A`), r.convexHull === true && (n = `${n}c`), r.ccdt === true && (n = `${n}D`), r.jettison === true && (n = `${n}j`), r.edges === true && (n = `${n}e`), r.neighbors === true && (n = `${n}n`), r.quadratic === true && (n = `${n}o2`), r.bndMarkers === false && (n = `${n}B`), r.holes === false && (n = `${n}O`), typeof r.steiner == "number" && (n = `${n}S${r.steiner}`), typeof r.quality == "number" ? n = `${n}q${r.quality}` : r.quality === true && (n = `${n}q`), typeof r.area == "number" ? n = `${n}a${r.area}` : r.area === true && (n = `${n}a`), r.quiet === false && console.log("Switches:", n), n;
  };
  class Ae {
    static get LENGTH() {
      return 23;
    }
    constructor(e = {}) {
      this.ptr = Fr._malloc(Ae.LENGTH * Int32Array.BYTES_PER_ELEMENT), this.arr = Rr(this.ptr, Ae.LENGTH), this.arr.set(new Int32Array(Ae.LENGTH));
      for (const u in e) u in this && (this[u] = e[u]);
    }
    destroy(e) {
      Fr._free(this.arr[0]), Fr._free(this.arr[1]), Fr._free(this.arr[2]), Fr._free(this.arr[5]), Fr._free(this.arr[6]), Fr._free(this.arr[7]), Fr._free(this.arr[8]), Fr._free(this.arr[12]), Fr._free(this.arr[13]), Fr._free(this.arr[19]), Fr._free(this.arr[20]), Fr._free(this.arr[21]), Fr._free(this.ptr), e && (Fr._free(this.arr[15]), Fr._free(this.arr[17]));
    }
    set pointlist(e) {
      this.arr[0] = Pr(e, Float64Array), this.arr[3] = e ? ~~(e.length * 0.5) : 0;
    }
    set pointattributelist(e) {
      this.arr[1] = Pr(e, Float64Array), this.arr[4] = e ? ~~(e.length / this.numberofpoints) : 0;
    }
    set pointmarkerlist(e) {
      this.arr[2] = Pr(e);
    }
    set numberofpoints(e) {
    }
    set numberofpointattributes(e) {
    }
    set trianglelist(e) {
      this.arr[5] = Pr(e), this.arr[9] = e ? ~~(e.length / 3) : 0;
    }
    set triangleattributelist(e) {
      this.arr[6] = Pr(e, Float64Array), this.arr[11] = e ? ~~(e.length / this.numberoftriangles) : 0;
    }
    set trianglearealist(e) {
      this.arr[7] = Pr(e, Float64Array);
    }
    set neighborlist(e) {
      this.arr[8] = Pr(e);
    }
    set numberoftriangles(e) {
    }
    set numberofcorners(e) {
    }
    set numberoftriangleattributes(e) {
    }
    set segmentlist(e) {
      this.arr[12] = Pr(e), this.arr[14] = e ? ~~(e.length * 0.5) : 0;
    }
    set segmentmarkerlist(e) {
      this.arr[13] = Pr(e);
    }
    set numberofsegments(e) {
    }
    set holelist(e) {
      this.arr[15] = Pr(e, Float64Array), this.arr[16] = e ? ~~(e.length * 0.5) : 0;
    }
    set numberofholes(e) {
    }
    set regionlist(e) {
      this.arr[17] = Pr(e, Float64Array), this.arr[18] = e ? ~~(e.length * 0.25) : 0;
    }
    set numberofregions(e) {
    }
    set edgelist(e) {
      this.arr[19] = Pr(e), this.arr[22] = e ? ~~(e.length * 0.5) : 0;
    }
    set edgemarkerlist(e) {
      this.arr[20] = Pr(e);
    }
    set normlist(e) {
      this.arr[21] = Pr(e, Float64Array);
    }
    set numberofedges(e) {
    }
    get pointlist() {
      return Rr(this.arr[0], this.numberofpoints * 2, Float64Array);
    }
    get pointattributelist() {
      return Rr(this.arr[1], this.numberofpointattributes * this.numberofpoints, Float64Array);
    }
    get pointmarkerlist() {
      return Rr(this.arr[2], this.numberofpoints);
    }
    get numberofpoints() {
      return this.arr[3];
    }
    get numberofpointattributes() {
      return this.arr[4];
    }
    get trianglelist() {
      return Rr(this.arr[5], this.numberoftriangles * this.numberofcorners);
    }
    get triangleattributelist() {
      return Rr(this.arr[6], this.numberoftriangleattributes * this.numberoftriangles, Float64Array);
    }
    get trianglearealist() {
      return Rr(this.arr[7], this.numberoftriangles, Float64Array);
    }
    get neighborlist() {
      return Rr(this.arr[8], this.numberoftriangles * 3);
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
      return Rr(this.arr[12], this.numberofsegments * 2);
    }
    get segmentmarkerlist() {
      return Rr(this.arr[13], this.numberofsegments);
    }
    get numberofsegments() {
      return this.arr[14];
    }
    get holelist() {
      return Rr(this.arr[15], this.numberofholes * 2, Float64Array);
    }
    get numberofholes() {
      return this.arr[16];
    }
    get regionlist() {
      return Rr(this.arr[17], this.numberofregions * 4, Float64Array);
    }
    get numberofregions() {
      return this.arr[18];
    }
    get edgelist() {
      return Rr(this.arr[19], this.numberofedges * 2);
    }
    get edgemarkerlist() {
      return Rr(this.arr[20], this.numberofedges);
    }
    get normlist() {
      return Rr(this.arr[21], this.numberofedges * 2, Float64Array);
    }
    get numberofedges() {
      return this.arr[22];
    }
  }
  const Jf = (r) => new Promise((e, u) => {
    Vf({
      locateFile: (n, t) => r || t + n
    }).then((n) => {
      Fr = n, e();
    });
  }), Qf = (r, e, u, n = null) => {
    const t = Cu(r, e, n), a = Zf(t), s = n ? n.ptr : null;
    Fr._triangulate(a, e.ptr, u.ptr, s), Fr._free(a);
  }, Yf = (r) => new Ae(r), Xf = (r, e) => {
    r.destroy(e);
  };
  var Kf = {
    init: Jf,
    triangulate: Qf,
    makeIO: Yf,
    freeIO: Xf,
    getSwitchesStr: Cu
  };
  const ce = zu(Kf), Hf = "" + new URL("triangle-CCJHBrBP.wasm", import.meta.url).href;
  await ce.init(Hf);
  ul = function({ points: r, polygon: e, maxMeshSize: u = 3 }) {
    const n = el(r[0], r[1], r[2]), t = r.map((l) => jr(yu(n), l)).map((l) => [
      l[0],
      l[1]
    ]), a = ce.makeIO({
      pointlist: t.flat(),
      segmentlist: kf(e)
    }), s = ce.makeIO();
    ce.triangulate(`pzQOq30a${u}`, a, s);
    const { nodes: D, boundaryIndices: f } = jf(s.pointlist, s.pointmarkerlist), c = D.map((l) => jr(n, [
      l[0],
      l[1],
      0
    ])), o = rl(s.trianglelist);
    return ce.freeIO(a, true), ce.freeIO(s), {
      nodes: c,
      elements: o,
      boundaryIndices: f
    };
  };
  function kf(r) {
    const e = [];
    for (let u = 0; u < r.length; u += 1) e.push(r[u], r[(u + 1) % r.length]);
    return e;
  }
  function jf(r, e) {
    const u = [], n = [];
    for (let t = 0; t < r.length; t += 2) u.push([
      r[t],
      r[t + 1]
    ]), e[t / 2] && n.push(t / 2);
    return {
      nodes: u,
      boundaryIndices: n
    };
  }
  function rl(r) {
    const e = [];
    for (let u = 0; u < r.length; u += 3) e.push([
      r[u],
      r[u + 1],
      r[u + 2]
    ]);
    return e;
  }
  function el(r, e, u) {
    const n = o([
      e,
      u
    ]), t = o([
      r,
      u
    ]), a = o([
      r,
      e
    ]), s = Oe(ve(n, t), $e(ve(n, t))), D = Oe(ve(u, a), $e(ve(n, t))), f = Oe(ze(s, D), $e(ze(s, D))), c = Oe(ze(f, s), $e(ze(f, s)));
    return [
      [
        s[0],
        c[0],
        f[0]
      ],
      [
        s[1],
        c[1],
        f[1]
      ],
      [
        s[2],
        c[2],
        f[2]
      ]
    ];
    function o(l) {
      const g = l.reduce((p, i) => [
        p[0] + i[0],
        p[1] + i[1],
        p[2] + i[2]
      ], [
        0,
        0,
        0
      ]), v = l.length;
      return [
        g[0] / v,
        g[1] / v,
        g[2] / v
      ];
    }
  }
})();
export {
  __tla,
  ul as g
};
