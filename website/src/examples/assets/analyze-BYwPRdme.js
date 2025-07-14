import { _ as tt, t as Xe, D as Rt, C as Or } from "./complex-i8qiIvCl.js";
var Pn = { relTol: 1e-12, absTol: 1e-15, matrix: "Matrix", number: "number", numberFallback: "number", precision: 64, predictable: false, randomSeed: null };
function _u(r, e) {
  if (We(r, e)) return r[e];
  throw typeof r[e] == "function" && xu(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function Bu(r, e, n) {
  if (We(r, e)) return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function We(r, e) {
  return !Su(r) && !Array.isArray(r) ? false : ze(Mu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function xu(r, e) {
  return r == null || typeof r[e] != "function" || ze(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : ze(Nu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function Su(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var Mu = { length: true, name: true }, Nu = { toString: true, valueOf: true, toLocaleString: true };
class Tu {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
  }
  get(e) {
    return _u(this.wrappedObject, e);
  }
  set(e, n) {
    return Bu(this.wrappedObject, e, n), this;
  }
  has(e) {
    return We(this.wrappedObject, e) && e in this.wrappedObject;
  }
  entries() {
    return zu(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var n of this.keys()) e(this.get(n), n, this);
  }
  delete(e) {
    We(this.wrappedObject, e) && delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys()) this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
function zu(r, e) {
  return { next: () => {
    var n = r.next();
    return n.done ? n : { value: e(n.value), done: false };
  } };
}
function yr(r) {
  return typeof r == "number";
}
function _r(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function Ou(r) {
  return typeof r == "bigint";
}
function Ft(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function Et(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function Ln(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function Jr(r) {
  return typeof r == "string";
}
var Cr = Array.isArray;
function mr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function Je(r) {
  return Array.isArray(r) || mr(r);
}
function Qn(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Vn(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Zn(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function Ct(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function $u(r) {
  return typeof r == "boolean";
}
function Iu(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function qu(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function Ru(r) {
  return typeof r == "function";
}
function Uu(r) {
  return r instanceof Date;
}
function Pu(r) {
  return r instanceof RegExp;
}
function bt(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !Ft(r) && !Et(r));
}
function Lu(r) {
  return r ? r instanceof Map || r instanceof Tu || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
function Qu(r) {
  return r === null;
}
function Vu(r) {
  return r === void 0;
}
function Zu(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function Xu(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function Wu(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Ju(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Yu(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function Gu(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function Ku(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Hu(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function ku(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function ju(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function ra(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function ea(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function ta(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function na(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function ua(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function aa(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function ia(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function Yr(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : _r(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function Dr(r) {
  var e = typeof r;
  if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
  if (typeof r.clone == "function") return r.clone();
  if (Array.isArray(r)) return r.map(function(n) {
    return Dr(n);
  });
  if (r instanceof Date) return new Date(r.valueOf());
  if (_r(r)) return r;
  if (bt(r)) return oa(r, Dr);
  if (e === "function") return r;
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function oa(r, e) {
  var n = {};
  for (var u in r) ze(r, u) && (n[u] = e(r[u]));
  return n;
}
function sa(r, e) {
  for (var n in e) ze(e, n) && (r[n] = e[n]);
  return r;
}
function De(r, e) {
  var n, u, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length) return false;
    for (u = 0, t = r.length; u < t; u++) if (!De(r[u], e[u])) return false;
    return true;
  } else {
    if (typeof r == "function") return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object)) return false;
      for (n in r) if (!(n in e) || !De(r[n], e[n])) return false;
      for (n in e) if (!(n in r)) return false;
      return true;
    } else return r === e;
  }
}
function ze(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function fa(r, e) {
  for (var n = {}, u = 0; u < e.length; u++) {
    var t = e[u], a = r[t];
    a !== void 0 && (n[t] = a);
  }
  return n;
}
var ca = ["Matrix", "Array"], la = ["number", "BigNumber", "Fraction"], $r = function(e) {
  if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(Pn);
};
tt($r, Pn, { MATRIX_OPTIONS: ca, NUMBER_OPTIONS: la });
function G(r, e, n, u) {
  function t(a) {
    var s = fa(a, e.map(pa));
    return va(r, e, a), n(s);
  }
  return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), u && (t.meta = u), t;
}
function va(r, e, n) {
  var u = e.filter((a) => !Da(a)).every((a) => n[a] !== void 0);
  if (!u) {
    var t = e.filter((a) => n[a] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Da(r) {
  return r && r[0] === "?";
}
function pa(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function Ar(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var da = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function Dt(r, e, n) {
  var u = { 2: "0b", 8: "0o", 16: "0x" }, t = u[e], a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!Ar(n)) throw new Error("size must be an integer");
    if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!Ar(r)) throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** n), a = "i".concat(n);
  }
  var s = "";
  return r < 0 && (r = -r, s = "-"), "".concat(s).concat(t).concat(r.toString(e)).concat(a);
}
function dt(r, e) {
  if (typeof e == "function") return e(r);
  if (r === 1 / 0) return "Infinity";
  if (r === -1 / 0) return "-Infinity";
  if (isNaN(r)) return "NaN";
  var { notation: n, precision: u, wordSize: t } = Xn(e);
  switch (n) {
    case "fixed":
      return ma(r, u);
    case "exponential":
      return Wn(r, u);
    case "engineering":
      return ha(r, u);
    case "bin":
      return Dt(r, 2, t);
    case "oct":
      return Dt(r, 8, t);
    case "hex":
      return Dt(r, 16, t);
    case "auto":
      return ga(r, u, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], s = arguments[4];
        return a !== "." ? a + s : s;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Xn(r) {
  var e = "auto", n, u;
  if (r !== void 0) if (yr(r)) n = r;
  else if (_r(r)) n = r.toNumber();
  else if (bt(r)) r.precision !== void 0 && (n = Ut(r.precision, () => {
    throw new Error('Option "precision" must be a number or BigNumber');
  })), r.wordSize !== void 0 && (u = Ut(r.wordSize, () => {
    throw new Error('Option "wordSize" must be a number or BigNumber');
  })), r.notation && (e = r.notation);
  else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: n, wordSize: u };
}
function nt(r) {
  var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e) throw new SyntaxError("Invalid number " + r);
  var n = e[1], u = e[2], t = parseFloat(e[4] || "0"), a = u.indexOf(".");
  t += a !== -1 ? a - 1 : u.length - 1;
  var s = u.replace(".", "").replace(/^0*/, function(D) {
    return t -= D.length, "";
  }).replace(/0*$/, "").split("").map(function(D) {
    return parseInt(D);
  });
  return s.length === 0 && (s.push(0), t++), { sign: n, coefficients: s, exponent: t };
}
function ha(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = nt(r), u = ut(n, e), t = u.exponent, a = u.coefficients, s = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if (yr(e)) for (; e > a.length || t - s + 1 > a.length; ) a.push(0);
  else for (var D = Math.abs(t - s) - (a.length - 1), l = 0; l < D; l++) a.push(0);
  for (var f = Math.abs(t - s), o = 1; f > 0; ) o++, f--;
  var c = a.slice(o).join(""), p = yr(e) && c.length || c.match(/[1-9]/) ? "." + c : "", v = a.slice(0, o).join("") + p + "e" + (t >= 0 ? "+" : "") + s.toString();
  return u.sign + v;
}
function ma(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = nt(r), u = typeof e == "number" ? ut(n, n.exponent + 1 + e) : n, t = u.coefficients, a = u.exponent + 1, s = a + (e || 0);
  return t.length < s && (t = t.concat(we(s - t.length))), a < 0 && (t = we(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), u.sign + t.join("");
}
function Wn(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = nt(r), u = e ? ut(n, e) : n, t = u.coefficients, a = u.exponent;
  t.length < e && (t = t.concat(we(e - t.length)));
  var s = t.shift();
  return u.sign + s + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function ga(r, e, n) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var u = Pt(n == null ? void 0 : n.lowerExp, -3), t = Pt(n == null ? void 0 : n.upperExp, 5), a = nt(r), s = e ? ut(a, e) : a;
  if (s.exponent < u || s.exponent >= t) return Wn(r, e);
  var D = s.coefficients, l = s.exponent;
  D.length < e && (D = D.concat(we(e - D.length))), D = D.concat(we(l - D.length + 1 + (D.length < e ? e - D.length : 0))), D = we(-l).concat(D);
  var f = l > 0 ? l : 0;
  return f < D.length - 1 && D.splice(f + 1, 0, "."), s.sign + D.join("");
}
function ut(r, e) {
  for (var n = { sign: r.sign, coefficients: r.coefficients, exponent: r.exponent }, u = n.coefficients; e <= 0; ) u.unshift(0), n.exponent++, e++;
  if (u.length > e) {
    var t = u.splice(e, u.length - e);
    if (t[0] >= 5) {
      var a = e - 1;
      for (u[a]++; u[a] === 10; ) u.pop(), a === 0 && (u.unshift(0), n.exponent++, a++), a--, u[a]++;
    }
  }
  return n;
}
function we(r) {
  for (var e = [], n = 0; n < r; n++) e.push(0);
  return e;
}
function ya(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function oe(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), u);
}
function Ut(r, e) {
  if (yr(r)) return r;
  if (_r(r)) return r.toNumber();
  e();
}
function Pt(r, e) {
  return yr(r) ? r : _r(r) ? r.toNumber() : e;
}
var Jn = function() {
  return Jn = Xe.create, Xe;
}, Aa = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], Fa = G("typed", Aa, function(e) {
  var { BigNumber: n, Complex: u, DenseMatrix: t, Fraction: a } = e, s = Jn();
  return s.clear(), s.addTypes([{ name: "number", test: yr }, { name: "Complex", test: Ft }, { name: "BigNumber", test: _r }, { name: "bigint", test: Ou }, { name: "Fraction", test: Et }, { name: "Unit", test: Ln }, { name: "identifier", test: (D) => Jr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D) }, { name: "string", test: Jr }, { name: "Chain", test: ia }, { name: "Array", test: Cr }, { name: "Matrix", test: mr }, { name: "DenseMatrix", test: Qn }, { name: "SparseMatrix", test: Vn }, { name: "Range", test: Zn }, { name: "Index", test: Ct }, { name: "boolean", test: $u }, { name: "ResultSet", test: Iu }, { name: "Help", test: qu }, { name: "function", test: Ru }, { name: "Date", test: Uu }, { name: "RegExp", test: Pu }, { name: "null", test: Qu }, { name: "undefined", test: Vu }, { name: "AccessorNode", test: Zu }, { name: "ArrayNode", test: Xu }, { name: "AssignmentNode", test: Wu }, { name: "BlockNode", test: Ju }, { name: "ConditionalNode", test: Yu }, { name: "ConstantNode", test: Gu }, { name: "FunctionNode", test: Hu }, { name: "FunctionAssignmentNode", test: Ku }, { name: "IndexNode", test: ku }, { name: "Node", test: ju }, { name: "ObjectNode", test: ra }, { name: "OperatorNode", test: ea }, { name: "ParenthesisNode", test: ta }, { name: "RangeNode", test: na }, { name: "RelationalNode", test: ua }, { name: "SymbolNode", test: aa }, { name: "Map", test: Lu }, { name: "Object", test: bt }]), s.addConversions([{ from: "number", to: "BigNumber", convert: function(l) {
    if (n || Qe(l), ya(l) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + l + "). Use function bignumber(x) to convert to BigNumber.");
    return new n(l);
  } }, { from: "number", to: "Complex", convert: function(l) {
    return u || Ve(l), new u(l, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(l) {
    return u || Ve(l), new u(l.toNumber(), 0);
  } }, { from: "bigint", to: "number", convert: function(l) {
    if (l > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + l + ")");
    return Number(l);
  } }, { from: "bigint", to: "BigNumber", convert: function(l) {
    return n || Qe(l), new n(l.toString());
  } }, { from: "bigint", to: "Fraction", convert: function(l) {
    return a || Ze(l), new a(l);
  } }, { from: "Fraction", to: "BigNumber", convert: function(l) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(l) {
    return u || Ve(l), new u(l.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(l) {
    a || Ze(l);
    var f = new a(l);
    if (f.valueOf() !== l) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + l + "). Use function fraction(x) to convert to Fraction.");
    return f;
  } }, { from: "string", to: "number", convert: function(l) {
    var f = Number(l);
    if (isNaN(f)) throw new Error('Cannot convert "' + l + '" to a number');
    return f;
  } }, { from: "string", to: "BigNumber", convert: function(l) {
    n || Qe(l);
    try {
      return new n(l);
    } catch {
      throw new Error('Cannot convert "' + l + '" to BigNumber');
    }
  } }, { from: "string", to: "bigint", convert: function(l) {
    try {
      return BigInt(l);
    } catch {
      throw new Error('Cannot convert "' + l + '" to BigInt');
    }
  } }, { from: "string", to: "Fraction", convert: function(l) {
    a || Ze(l);
    try {
      return new a(l);
    } catch {
      throw new Error('Cannot convert "' + l + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(l) {
    u || Ve(l);
    try {
      return new u(l);
    } catch {
      throw new Error('Cannot convert "' + l + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(l) {
    return +l;
  } }, { from: "boolean", to: "BigNumber", convert: function(l) {
    return n || Qe(l), new n(+l);
  } }, { from: "boolean", to: "bigint", convert: function(l) {
    return BigInt(+l);
  } }, { from: "boolean", to: "Fraction", convert: function(l) {
    return a || Ze(l), new a(+l);
  } }, { from: "boolean", to: "string", convert: function(l) {
    return String(l);
  } }, { from: "Array", to: "Matrix", convert: function(l) {
    return t || Ea(), new t(l);
  } }, { from: "Matrix", to: "Array", convert: function(l) {
    return l.valueOf();
  } }]), s.onMismatch = (D, l, f) => {
    var o = s.createError(D, l, f);
    if (["wrongType", "mismatch"].includes(o.data.category) && l.length === 1 && Je(l[0]) && f.some((p) => !p.params.includes(","))) {
      var c = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw c.data = o.data, c;
    }
    throw o;
  }, s.onMismatch = (D, l, f) => {
    var o = s.createError(D, l, f);
    if (["wrongType", "mismatch"].includes(o.data.category) && l.length === 1 && Je(l[0]) && f.some((p) => !p.params.includes(","))) {
      var c = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw c.data = o.data, c;
    }
    throw o;
  }, s;
});
function Qe(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function Ve(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function Ea() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function Ze(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var Ca = "BigNumber", ba = ["?on", "config"], wa = G(Ca, ba, (r) => {
  var { on: e, config: n } = r, u = Rt.clone({ precision: n.precision, modulo: Rt.EUCLID });
  return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, u.fromJSON = function(t) {
    return new u(t.value);
  }, e && e("config", function(t, a) {
    t.precision !== a.precision && u.config({ precision: t.precision });
  }), u;
}, { isClass: true }), _a = "Complex", Ba = [], xa = G(_a, Ba, () => (Object.defineProperty(Or, "name", { value: "Complex" }), Or.prototype.constructor = Or, Or.prototype.type = "Complex", Or.prototype.isComplex = true, Or.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, Or.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, Or.prototype.format = function(r) {
  var e = "", n = this.im, u = this.re, t = dt(this.re, r), a = dt(this.im, r), s = yr(r) ? r : r ? r.precision : null;
  if (s !== null) {
    var D = Math.pow(10, -s);
    Math.abs(u / n) < D && (u = 0), Math.abs(n / u) < D && (n = 0);
  }
  return n === 0 ? e = t : u === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = a + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + a.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + a + "i", e;
}, Or.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object") return Or(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], u = arguments[1];
      if (yr(n)) {
        if (Ln(u) && u.hasBase("ANGLE") && (u = u.toNumber("rad")), yr(u)) return new Or({ r: n, phi: u });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Or.prototype.valueOf = Or.prototype.toString, Or.fromJSON = function(r) {
  return new Or(r);
}, Or.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, Or), { isClass: true });
typeof BigInt > "u" && (BigInt = function(r) {
  if (isNaN(r)) throw new Error("");
  return r;
});
const rr = BigInt(0), ir = BigInt(1), Oe = BigInt(2), ht = BigInt(5), qr = BigInt(10), Sa = 2e3, K = { s: ir, n: rr, d: ir };
function ae(r, e) {
  try {
    r = BigInt(r);
  } catch {
    throw ve();
  }
  return r * e;
}
function Wr(r) {
  return typeof r == "bigint" ? r : Math.floor(r);
}
function Er(r, e) {
  if (e === rr) throw wt();
  const n = Object.create(Xr.prototype);
  n.s = r < rr ? -ir : ir, r = r < rr ? -r : r;
  const u = ge(r, e);
  return n.n = r / u, n.d = e / u, n;
}
function be(r) {
  const e = {};
  let n = r, u = Oe, t = ht - ir;
  for (; t <= n; ) {
    for (; n % u === rr; ) n /= u, e[u] = (e[u] || rr) + ir;
    t += ir + Oe * u++;
  }
  return n !== r ? n > 1 && (e[n] = (e[n] || rr) + ir) : e[r] = (e[r] || rr) + ir, e;
}
const zr = function(r, e) {
  let n = rr, u = ir, t = ir;
  if (r != null) if (e !== void 0) {
    if (typeof r == "bigint") n = r;
    else {
      if (isNaN(r)) throw ve();
      if (r % 1 !== 0) throw Lt();
      n = BigInt(r);
    }
    if (typeof e == "bigint") u = e;
    else {
      if (isNaN(e)) throw ve();
      if (e % 1 !== 0) throw Lt();
      u = BigInt(e);
    }
    t = n * u;
  } else if (typeof r == "object") {
    if ("d" in r && "n" in r) n = BigInt(r.n), u = BigInt(r.d), "s" in r && (n *= BigInt(r.s));
    else if (0 in r) n = BigInt(r[0]), 1 in r && (u = BigInt(r[1]));
    else if (typeof r == "bigint") n = r;
    else throw ve();
    t = n * u;
  } else if (typeof r == "number") {
    if (isNaN(r)) throw ve();
    if (r < 0 && (t = -ir, r = -r), r % 1 === 0) n = BigInt(r);
    else {
      let a = 1, s = 0, D = 1, l = 1, f = 1, o = 1e7;
      for (r >= 1 && (a = 10 ** Math.floor(1 + Math.log10(r)), r /= a); D <= o && f <= o; ) {
        let c = (s + l) / (D + f);
        if (r === c) {
          D + f <= o ? (n = s + l, u = D + f) : f > D ? (n = l, u = f) : (n = s, u = D);
          break;
        } else r > c ? (s += l, D += f) : (l += s, f += D), D > o ? (n = l, u = f) : (n = s, u = D);
      }
      n = BigInt(n) * BigInt(a), u = BigInt(u);
    }
  } else if (typeof r == "string") {
    let a = 0, s = rr, D = rr, l = rr, f = ir, o = ir, c = r.replace(/_/g, "").match(/\d+|./g);
    if (c === null) throw ve();
    if (c[a] === "-" ? (t = -ir, a++) : c[a] === "+" && a++, c.length === a + 1 ? D = ae(c[a++], t) : c[a + 1] === "." || c[a] === "." ? (c[a] !== "." && (s = ae(c[a++], t)), a++, (a + 1 === c.length || c[a + 1] === "(" && c[a + 3] === ")" || c[a + 1] === "'" && c[a + 3] === "'") && (D = ae(c[a], t), f = qr ** BigInt(c[a].length), a++), (c[a] === "(" && c[a + 2] === ")" || c[a] === "'" && c[a + 2] === "'") && (l = ae(c[a + 1], t), o = qr ** BigInt(c[a + 1].length) - ir, a += 3)) : c[a + 1] === "/" || c[a + 1] === ":" ? (D = ae(c[a], t), f = ae(c[a + 2], ir), a += 3) : c[a + 3] === "/" && c[a + 1] === " " && (s = ae(c[a], t), D = ae(c[a + 2], t), f = ae(c[a + 4], ir), a += 5), c.length <= a) u = f * o, t = n = l + u * s + o * D;
    else throw ve();
  } else if (typeof r == "bigint") n = r, t = r, u = ir;
  else throw ve();
  if (u === rr) throw wt();
  K.s = t < rr ? -ir : ir, K.n = n < rr ? -n : n, K.d = u < rr ? -u : u;
};
function Ma(r, e, n) {
  let u = ir;
  for (; e > rr; r = r * r % n, e >>= ir) e & ir && (u = u * r % n);
  return u;
}
function Na(r, e) {
  for (; e % Oe === rr; e /= Oe) ;
  for (; e % ht === rr; e /= ht) ;
  if (e === ir) return rr;
  let n = qr % e, u = 1;
  for (; n !== ir; u++) if (n = n * qr % e, u > Sa) return rr;
  return BigInt(u);
}
function Ta(r, e, n) {
  let u = ir, t = Ma(qr, n, e);
  for (let a = 0; a < 300; a++) {
    if (u === t) return BigInt(a);
    u = u * qr % e, t = t * qr % e;
  }
  return 0;
}
function ge(r, e) {
  if (!r) return e;
  if (!e) return r;
  for (; ; ) {
    if (r %= e, !r) return e;
    if (e %= r, !e) return r;
  }
}
function Xr(r, e) {
  if (zr(r, e), this instanceof Xr) r = ge(K.d, K.n), this.s = K.s, this.n = K.n / r, this.d = K.d / r;
  else return Er(K.s * K.n, K.d);
}
var wt = function() {
  return new Error("Division by Zero");
}, ve = function() {
  return new Error("Invalid argument");
}, Lt = function() {
  return new Error("Parameters must be integer");
};
Xr.prototype = { s: ir, n: rr, d: ir, abs: function() {
  return Er(this.n, this.d);
}, neg: function() {
  return Er(-this.s * this.n, this.d);
}, add: function(r, e) {
  return zr(r, e), Er(this.s * this.n * K.d + K.s * this.d * K.n, this.d * K.d);
}, sub: function(r, e) {
  return zr(r, e), Er(this.s * this.n * K.d - K.s * this.d * K.n, this.d * K.d);
}, mul: function(r, e) {
  return zr(r, e), Er(this.s * K.s * this.n * K.n, this.d * K.d);
}, div: function(r, e) {
  return zr(r, e), Er(this.s * K.s * this.n * K.d, this.d * K.n);
}, clone: function() {
  return Er(this.s * this.n, this.d);
}, mod: function(r, e) {
  if (r === void 0) return Er(this.s * this.n % this.d, ir);
  if (zr(r, e), rr === K.n * this.d) throw wt();
  return Er(this.s * (K.d * this.n) % (K.n * this.d), K.d * this.d);
}, gcd: function(r, e) {
  return zr(r, e), Er(ge(K.n, this.n) * ge(K.d, this.d), K.d * this.d);
}, lcm: function(r, e) {
  return zr(r, e), K.n === rr && this.n === rr ? Er(rr, ir) : Er(K.n * this.n, ge(K.n, this.n) * ge(K.d, this.d));
}, inverse: function() {
  return Er(this.s * this.d, this.n);
}, pow: function(r, e) {
  if (zr(r, e), K.d === ir) return K.s < rr ? Er((this.s * this.d) ** K.n, this.n ** K.n) : Er((this.s * this.n) ** K.n, this.d ** K.n);
  if (this.s < rr) return null;
  let n = be(this.n), u = be(this.d), t = ir, a = ir;
  for (let s in n) if (s !== "1") {
    if (s === "0") {
      t = rr;
      break;
    }
    if (n[s] *= K.n, n[s] % K.d === rr) n[s] /= K.d;
    else return null;
    t *= BigInt(s) ** n[s];
  }
  for (let s in u) if (s !== "1") {
    if (u[s] *= K.n, u[s] % K.d === rr) u[s] /= K.d;
    else return null;
    a *= BigInt(s) ** u[s];
  }
  return K.s < rr ? Er(a, t) : Er(t, a);
}, log: function(r, e) {
  if (zr(r, e), this.s <= rr || K.s <= rr) return null;
  const n = {}, u = be(K.n), t = be(K.d), a = be(this.n), s = be(this.d);
  for (const f in t) u[f] = (u[f] || rr) - t[f];
  for (const f in s) a[f] = (a[f] || rr) - s[f];
  for (const f in u) f !== "1" && (n[f] = true);
  for (const f in a) f !== "1" && (n[f] = true);
  let D = null, l = null;
  for (const f in n) {
    const o = u[f] || rr, c = a[f] || rr;
    if (o === rr) {
      if (c !== rr) return null;
      continue;
    }
    let p = c, v = o;
    const d = ge(p, v);
    if (p /= d, v /= d, D === null && l === null) D = p, l = v;
    else if (p * l !== D * v) return null;
  }
  return D !== null && l !== null ? Er(D, l) : null;
}, equals: function(r, e) {
  return zr(r, e), this.s * this.n * K.d === K.s * K.n * this.d;
}, lt: function(r, e) {
  return zr(r, e), this.s * this.n * K.d < K.s * K.n * this.d;
}, lte: function(r, e) {
  return zr(r, e), this.s * this.n * K.d <= K.s * K.n * this.d;
}, gt: function(r, e) {
  return zr(r, e), this.s * this.n * K.d > K.s * K.n * this.d;
}, gte: function(r, e) {
  return zr(r, e), this.s * this.n * K.d >= K.s * K.n * this.d;
}, compare: function(r, e) {
  zr(r, e);
  let n = this.s * this.n * K.d - K.s * K.n * this.d;
  return (rr < n) - (n < rr);
}, ceil: function(r) {
  return r = qr ** BigInt(r || 0), Er(Wr(this.s * r * this.n / this.d) + (r * this.n % this.d > rr && this.s >= rr ? ir : rr), r);
}, floor: function(r) {
  return r = qr ** BigInt(r || 0), Er(Wr(this.s * r * this.n / this.d) - (r * this.n % this.d > rr && this.s < rr ? ir : rr), r);
}, round: function(r) {
  return r = qr ** BigInt(r || 0), Er(Wr(this.s * r * this.n / this.d) + this.s * ((this.s >= rr ? ir : rr) + Oe * (r * this.n % this.d) > this.d ? ir : rr), r);
}, roundTo: function(r, e) {
  zr(r, e);
  const n = this.n * K.d, u = this.d * K.n, t = n % u;
  let a = Wr(n / u);
  return t + t >= u && a++, Er(this.s * a * K.n, K.d);
}, divisible: function(r, e) {
  return zr(r, e), !(!(K.n * this.d) || this.n * K.d % (K.n * this.d));
}, valueOf: function() {
  return Number(this.s * this.n) / Number(this.d);
}, toString: function(r) {
  let e = this.n, n = this.d;
  r = r || 15;
  let u = Na(e, n), t = Ta(e, n, u), a = this.s < rr ? "-" : "";
  if (a += Wr(e / n), e %= n, e *= qr, e && (a += "."), u) {
    for (let s = t; s--; ) a += Wr(e / n), e %= n, e *= qr;
    a += "(";
    for (let s = u; s--; ) a += Wr(e / n), e %= n, e *= qr;
    a += ")";
  } else for (let s = r; e && s--; ) a += Wr(e / n), e %= n, e *= qr;
  return a;
}, toFraction: function(r) {
  let e = this.n, n = this.d, u = this.s < rr ? "-" : "";
  if (n === ir) u += e;
  else {
    let t = Wr(e / n);
    r && t > rr && (u += t, u += " ", e %= n), u += e, u += "/", u += n;
  }
  return u;
}, toLatex: function(r) {
  let e = this.n, n = this.d, u = this.s < rr ? "-" : "";
  if (n === ir) u += e;
  else {
    let t = Wr(e / n);
    r && t > rr && (u += t, e %= n), u += "\\frac{", u += e, u += "}{", u += n, u += "}";
  }
  return u;
}, toContinued: function() {
  let r = this.n, e = this.d, n = [];
  do {
    n.push(Wr(r / e));
    let u = r % e;
    r = e, e = u;
  } while (r !== ir);
  return n;
}, simplify: function(r) {
  const e = BigInt(1 / (r || 1e-3) | 0), n = this.abs(), u = n.toContinued();
  for (let t = 1; t < u.length; t++) {
    let a = Er(u[t - 1], ir);
    for (let D = t - 2; D >= 0; D--) a = a.inverse().add(u[D]);
    let s = a.sub(n);
    if (s.n * e < s.d) return a.mul(this.s);
  }
  return this;
} };
var za = "Fraction", Oa = [], $a = G(za, Oa, () => (Object.defineProperty(Xr, "name", { value: "Fraction" }), Xr.prototype.constructor = Xr, Xr.prototype.type = "Fraction", Xr.prototype.isFraction = true, Xr.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: String(this.s * this.n), d: String(this.d) };
}, Xr.fromJSON = function(r) {
  return new Xr(r);
}, Xr), { isClass: true }), Ia = "Matrix", qa = [], Ra = G(Ia, qa, () => {
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
}, { isClass: true });
function pt(r, e, n) {
  var u = r.constructor, t = new u(2), a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!Ar(n)) throw new Error("size must be an integer");
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
function Ua(r, e) {
  if (typeof e == "function") return e(r);
  if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: n, precision: u, wordSize: t } = Xn(e);
  switch (n) {
    case "fixed":
      return La(r, u);
    case "exponential":
      return Qt(r, u);
    case "engineering":
      return Pa(r, u);
    case "bin":
      return pt(r, 2, t);
    case "oct":
      return pt(r, 8, t);
    case "hex":
      return pt(r, 16, t);
    case "auto": {
      var a = Vt(e == null ? void 0 : e.lowerExp, -3), s = Vt(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero()) return "0";
      var D, l = r.toSignificantDigits(u), f = l.e;
      return f >= a && f < s ? D = l.toFixed() : D = Qt(r, u), D.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], c = arguments[4];
        return o !== "." ? o + c : c;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Pa(r, e) {
  var n = r.e, u = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -u)), a = t.toPrecision(e);
  if (a.includes("e")) {
    var s = r.constructor;
    a = new s(a).toFixed();
  }
  return a + "e" + (n >= 0 ? "+" : "") + u.toString();
}
function Qt(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function La(r, e) {
  return r.toFixed(e);
}
function Vt(r, e) {
  return yr(r) ? r : _r(r) ? r.toNumber() : e;
}
function Fr(r, e) {
  var n = Qa(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function Qa(r, e) {
  if (typeof r == "number") return dt(r, e);
  if (_r(r)) return Ua(r, e);
  if (Va(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
  if (Array.isArray(r)) return Yn(r, e);
  if (Jr(r)) return Zt(r);
  if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function") return r.format(e);
    if (r && r.toString(e) !== {}.toString()) return r.toString(e);
    var n = Object.keys(r).map((u) => Zt(u) + ": " + Fr(r[u], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function Zt(r) {
  for (var e = String(r), n = "", u = 0; u < e.length; ) {
    var t = e.charAt(u);
    n += t in Xt ? Xt[t] : t, u++;
  }
  return '"' + n + '"';
}
var Xt = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function Yn(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", u = r.length, t = 0; t < u; t++) t !== 0 && (n += ", "), n += Yn(r[t], e);
    return n += "]", n;
  } else return Fr(r, e);
}
function Va(r) {
  return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
}
function dr(r, e, n) {
  if (!(this instanceof dr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
dr.prototype = new RangeError();
dr.prototype.constructor = RangeError;
dr.prototype.name = "DimensionError";
dr.prototype.isDimensionError = true;
function ye(r, e, n) {
  if (!(this instanceof ye)) throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
ye.prototype = new RangeError();
ye.prototype.constructor = RangeError;
ye.prototype.name = "IndexError";
ye.prototype.isIndexError = true;
function pr(r) {
  for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
  return e;
}
function Gn(r, e, n) {
  var u, t = r.length;
  if (t !== e[n]) throw new dr(t, e[n]);
  if (n < e.length - 1) {
    var a = n + 1;
    for (u = 0; u < t; u++) {
      var s = r[u];
      if (!Array.isArray(s)) throw new dr(e.length - 1, e.length, "<");
      Gn(r[u], e, a);
    }
  } else for (u = 0; u < t; u++) if (Array.isArray(r[u])) throw new dr(e.length + 1, e.length, ">");
}
function Wt(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r)) throw new dr(r.length, 0);
  } else Gn(r, e, 0);
}
function wr(r, e) {
  if (r !== void 0) {
    if (!yr(r) || !Ar(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e) throw new ye(r, e);
  }
}
function Ye(r, e, n) {
  if (!Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!yr(t) || !Ar(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Fr(e) + ")");
  }), (yr(r) || _r(r)) && (r = [r]);
  var u = n !== void 0 ? n : 0;
  return mt(r, e, 0, u), r;
}
function mt(r, e, n, u) {
  var t, a, s = r.length, D = e[n], l = Math.min(s, D);
  if (r.length = D, n < e.length - 1) {
    var f = n + 1;
    for (t = 0; t < l; t++) a = r[t], Array.isArray(a) || (a = [a], r[t] = a), mt(a, e, f, u);
    for (t = l; t < D; t++) a = [], r[t] = a, mt(a, e, f, u);
  } else {
    for (t = 0; t < l; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
    for (t = l; t < D; t++) r[t] = u;
  }
}
function _t(r, e) {
  var n = gt(r, true), u = n.length;
  if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new dr(0, u, "!=");
  e = Bt(e, u);
  var t = Kn(e);
  if (u !== t) throw new dr(t, u, "!=");
  try {
    return Za(n, e);
  } catch (a) {
    throw a instanceof dr ? new dr(t, u, "!=") : a;
  }
}
function Bt(r, e) {
  var n = Kn(r), u = r.slice(), t = -1, a = r.indexOf(t), s = r.indexOf(t, a + 1) >= 0;
  if (s) throw new Error("More than one wildcard in sizes");
  var D = a >= 0, l = e % n === 0;
  if (D) if (l) u[a] = -e / n;
  else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return u;
}
function Kn(r) {
  return r.reduce((e, n) => e * n, 1);
}
function Za(r, e) {
  for (var n = r, u, t = e.length - 1; t > 0; t--) {
    var a = e[t];
    u = [];
    for (var s = n.length / a, D = 0; D < s; D++) u.push(n.slice(D * a, (D + 1) * a));
    n = u;
  }
  return n;
}
function Jt(r, e) {
  for (var n = pr(r); Array.isArray(r) && r.length === 1; ) r = r[0], n.shift();
  for (var u = n.length; n[u - 1] === 1; ) u--;
  return u < n.length && (r = Hn(r, u, 0), n.length = u), r;
}
function Hn(r, e, n) {
  var u, t;
  if (n < e) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = Hn(r[u], e, a);
  } else for (; Array.isArray(r); ) r = r[0];
  return r;
}
function kn(r, e, n, u) {
  var t = u || pr(r);
  if (n) for (var a = 0; a < n; a++) r = [r], t.unshift(1);
  for (r = jn(r, e, 0); t.length < e; ) t.push(1);
  return r;
}
function jn(r, e, n) {
  var u, t;
  if (Array.isArray(r)) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = jn(r[u], e, a);
  } else for (var s = n; s < e; s++) r = [r];
  return r;
}
function gt(r) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (!Array.isArray(r)) return r;
  if (typeof e != "boolean") throw new TypeError("Boolean expected for second argument of flatten");
  var n = [];
  return e ? t(r) : u(r), n;
  function u(a) {
    for (var s = 0; s < a.length; s++) {
      var D = a[s];
      Array.isArray(D) ? u(D) : n.push(D);
    }
  }
  function t(a) {
    if (Array.isArray(a[0])) for (var s = 0; s < a.length; s++) t(a[s]);
    else for (var D = 0; D < a.length; D++) n.push(a[D]);
  }
}
function at(r, e) {
  for (var n, u = 0, t = 0; t < r.length; t++) {
    var a = r[t], s = Array.isArray(a);
    if (t === 0 && s && (u = a.length), s && a.length !== u) return;
    var D = s ? at(a, e) : e(a);
    if (n === void 0) n = D;
    else if (n !== D) return "mixed";
  }
  return n;
}
function ru(r, e, n, u) {
  if (u < n) {
    if (r.length !== e.length) throw new dr(r.length, e.length);
    for (var t = [], a = 0; a < r.length; a++) t[a] = ru(r[a], e[a], n, u + 1);
    return t;
  } else return r.concat(e);
}
function eu() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1) return r[0];
  if (r.length > 1) return r.slice(1).reduce(function(n, u) {
    return ru(n, u, e, 0);
  }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function tu() {
  for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
  for (var u = e.map((p) => p.length), t = Math.max(...u), a = new Array(t).fill(null), s = 0; s < e.length; s++) for (var D = e[s], l = u[s], f = 0; f < l; f++) {
    var o = t - l + f;
    D[f] > a[o] && (a[o] = D[f]);
  }
  for (var c = 0; c < e.length; c++) nu(e[c], a);
  return a;
}
function nu(r, e) {
  for (var n = e.length, u = r.length, t = 0; t < u; t++) {
    var a = n - u + t;
    if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(u, " with size ").concat(r[t], " to size ").concat(e[a]));
  }
}
function yt(r, e) {
  var n = pr(r);
  if (De(n, e)) return r;
  nu(n, e);
  var u = tu(n, e), t = u.length, a = [...Array(t - n.length).fill(1), ...n], s = Wa(r);
  n.length < t && (s = _t(s, a), n = pr(s));
  for (var D = 0; D < t; D++) n[D] < u[D] && (s = Xa(s, u[D], D), n = pr(s));
  return s;
}
function Xa(r, e, n) {
  return eu(...Array(e).fill(r), n);
}
function uu(r, e) {
  if (!Array.isArray(r)) throw new Error("Array expected");
  var n = pr(r);
  if (e.length !== n.length) throw new dr(e.length, n.length);
  for (var u = 0; u < e.length; u++) wr(e[u], n[u]);
  return e.reduce((t, a) => t[a], r);
}
function Yt(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  if (r.length === 0) return [];
  if (n) return a(r);
  var u = [];
  return t(r, 0);
  function t(s, D) {
    if (Array.isArray(s)) {
      for (var l = s.length, f = Array(l), o = 0; o < l; o++) u[D] = o, f[o] = t(s[o], D + 1);
      return f;
    } else return e(s, u.slice(0, D), r);
  }
  function a(s) {
    if (Array.isArray(s)) {
      for (var D = s.length, l = Array(D), f = 0; f < D; f++) l[f] = a(s[f]);
      return l;
    } else return e(s);
  }
}
function Wa(r) {
  return tt([], r);
}
function Ge(r, e, n) {
  var u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (Xe.isTypedFunction(r)) {
    var t;
    if (u) t = 1;
    else {
      var a = (e.isMatrix ? e.size() : pr(e)).map(() => 0), s = e.isMatrix ? e.get(a) : uu(e, a);
      t = Ga(r, s, a, e);
    }
    var D;
    if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
      var l = Ja(r, t);
      D = l !== void 0 ? l : r;
    } else D = r;
    return t >= 1 && t <= 3 ? { isUnary: t === 1, fn: function() {
      for (var o = arguments.length, c = new Array(o), p = 0; p < o; p++) c[p] = arguments[p];
      return Gt(D, c.slice(0, t), n, r.name);
    } } : { isUnary: false, fn: function() {
      for (var o = arguments.length, c = new Array(o), p = 0; p < o; p++) c[p] = arguments[p];
      return Gt(D, c, n, r.name);
    } };
  }
  return u === void 0 ? { isUnary: Ya(r), fn: r } : { isUnary: u, fn: r };
}
function Ja(r, e) {
  var n = [];
  if (Object.entries(r.signatures).forEach((u) => {
    var [t, a] = u;
    t.split(",").length === e && n.push(a);
  }), n.length === 1) return n[0];
}
function Ya(r) {
  if (r.length !== 1) return false;
  var e = r.toString();
  if (/arguments/.test(e)) return false;
  var n = e.match(/\(.*?\)/);
  return !/\.\.\./.test(n);
}
function Ga(r, e, n, u) {
  for (var t = [e, n, u], a = 3; a > 0; a--) {
    var s = t.slice(0, a);
    if (Xe.resolve(r, s) !== null) return a;
  }
}
function Gt(r, e, n, u) {
  try {
    return r(...e);
  } catch (t) {
    Ka(t, e, n, u);
  }
}
function Ka(r, e, n, u) {
  var t;
  if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
    var a = [];
    throw a.push("value: ".concat(Yr(e[0]))), e.length >= 2 && a.push("index: ".concat(Yr(e[1]))), e.length >= 3 && a.push("array: ".concat(Yr(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(u, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
  } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(u, ": ").concat(r.message));
}
var Ha = "DenseMatrix", ka = ["Matrix"], ja = G(Ha, ka, (r) => {
  var { Matrix: e } = r;
  function n(o, c) {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    if (c && !Jr(c)) throw new Error("Invalid datatype: " + c);
    if (mr(o)) o.type === "DenseMatrix" ? (this._data = Dr(o._data), this._size = Dr(o._size), this._datatype = c || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = c || o._datatype);
    else if (o && Cr(o.data) && Cr(o.size)) this._data = o.data, this._size = o.size, Wt(this._data, this._size), this._datatype = c || o.datatype;
    else if (Cr(o)) this._data = f(o), this._size = pr(this._data), Wt(this._data, this._size), this._datatype = c;
    else {
      if (o) throw new TypeError("Unsupported type of data (" + Yr(o) + ")");
      this._data = [], this._size = [0], this._datatype = c;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(o, c) {
    return new n(o, c);
  }, Object.defineProperty(n, "name", { value: "DenseMatrix" }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
    return at(this._data, Yr);
  }, n.prototype.storage = function() {
    return "dense";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(o, c) {
    return new n(o, c);
  }, n.prototype.subset = function(o, c, p) {
    switch (arguments.length) {
      case 1:
        return u(this, o);
      case 2:
      case 3:
        return a(this, o, c, p);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.get = function(o) {
    return uu(this._data, o);
  }, n.prototype.set = function(o, c, p) {
    if (!Cr(o)) throw new TypeError("Array expected");
    if (o.length < this._size.length) throw new dr(o.length, this._size.length, "<");
    var v, d, i, h = o.map(function(C) {
      return C + 1;
    });
    l(this, h, p);
    var m = this._data;
    for (v = 0, d = o.length - 1; v < d; v++) i = o[v], wr(i, m.length), m = m[i];
    return i = o[o.length - 1], wr(i, m.length), m[i] = c, this;
  };
  function u(o, c) {
    if (!Ct(c)) throw new TypeError("Invalid index");
    var p = c.isScalar();
    if (p) return o.get(c.min());
    var v = c.size();
    if (v.length !== o._size.length) throw new dr(v.length, o._size.length);
    for (var d = c.min(), i = c.max(), h = 0, m = o._size.length; h < m; h++) wr(d[h], o._size[h]), wr(i[h], o._size[h]);
    return new n(t(o._data, c, v.length, 0), o._datatype);
  }
  function t(o, c, p, v) {
    var d = v === p - 1, i = c.dimension(v);
    return d ? i.map(function(h) {
      return wr(h, o.length), o[h];
    }).valueOf() : i.map(function(h) {
      wr(h, o.length);
      var m = o[h];
      return t(m, c, p, v + 1);
    }).valueOf();
  }
  function a(o, c, p, v) {
    if (!c || c.isIndex !== true) throw new TypeError("Invalid index");
    var d = c.size(), i = c.isScalar(), h;
    if (mr(p) ? (h = p.size(), p = p.valueOf()) : h = pr(p), i) {
      if (h.length !== 0) throw new TypeError("Scalar expected");
      o.set(c.min(), p, v);
    } else {
      if (!De(h, d)) try {
        h.length === 0 ? p = yt([p], d) : p = yt(p, d), h = pr(p);
      } catch {
      }
      if (d.length < o._size.length) throw new dr(d.length, o._size.length, "<");
      if (h.length < d.length) {
        for (var m = 0, C = 0; d[m] === 1 && h[m] === 1; ) m++;
        for (; d[m] === 1; ) C++, m++;
        p = kn(p, d.length, C, h);
      }
      if (!De(d, h)) throw new dr(d, h, ">");
      var A = c.max().map(function(F) {
        return F + 1;
      });
      l(o, A, v);
      var w = d.length, y = 0;
      s(o._data, c, p, w, y);
    }
    return o;
  }
  function s(o, c, p, v, d) {
    var i = d === v - 1, h = c.dimension(d);
    i ? h.forEach(function(m, C) {
      wr(m), o[m] = p[C[0]];
    }) : h.forEach(function(m, C) {
      wr(m), s(o[m], c, p[C[0]], v, d + 1);
    });
  }
  n.prototype.resize = function(o, c, p) {
    if (!Je(o)) throw new TypeError("Array or Matrix expected");
    var v = o.valueOf().map((i) => Array.isArray(i) && i.length === 1 ? i[0] : i), d = p ? this.clone() : this;
    return D(d, v, c);
  };
  function D(o, c, p) {
    if (c.length === 0) {
      for (var v = o._data; Cr(v); ) v = v[0];
      return v;
    }
    return o._size = c.slice(0), o._data = Ye(o._data, o._size, p), o;
  }
  n.prototype.reshape = function(o, c) {
    var p = c ? this.clone() : this;
    p._data = _t(p._data, o);
    var v = p._size.reduce((d, i) => d * i);
    return p._size = Bt(o, v), p;
  };
  function l(o, c, p) {
    for (var v = o._size.slice(0), d = false; v.length < c.length; ) v.push(0), d = true;
    for (var i = 0, h = c.length; i < h; i++) c[i] > v[i] && (v[i] = c[i], d = true);
    d && D(o, v, p);
  }
  n.prototype.clone = function() {
    var o = new n({ data: Dr(this._data), size: Dr(this._size), datatype: this._datatype });
    return o;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype._forEach = function(o) {
    var c = o.length === 2, p = this._size.length - 1;
    if (p < 0) return;
    if (c) {
      h(this._data);
      return;
    }
    if (p === 0) {
      for (var v = 0; v < this._data.length; v++) o(this._data, v, [v]);
      return;
    }
    var d = new Array(p + 1);
    i(this._data);
    function i(m) {
      var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (C < p) for (var A = 0; A < m.length; A++) d[C] = A, i(m[A], C + 1);
      else for (var w = 0; w < m.length; w++) d[C] = w, o(m, w, d.slice());
    }
    function h(m) {
      var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (C < p) for (var A = 0; A < m.length; A++) h(m[A], C + 1);
      else for (var w = 0; w < m.length; w++) o(m, w);
    }
  }, n.prototype.map = function(o) {
    var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, p = this, v = new n(p), d = Ge(o, p._data, "map", c), i = c || d.isUnary ? (h, m) => {
      h[m] = d.fn(h[m]);
    } : (h, m, C) => {
      h[m] = d.fn(h[m], C, p);
    };
    return v._forEach(i), v;
  }, n.prototype.forEach = function(o) {
    var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, p = this, v = Ge(o, p._data, "map", c), d = c || v.isUnary ? (i, h) => {
      v.fn(i[h]);
    } : (i, h, m) => {
      v.fn(i[h], m, p);
    };
    p._forEach(d);
  }, n.prototype[Symbol.iterator] = function* () {
    var o = this._size.length - 1;
    if (!(o < 0)) {
      if (o === 0) {
        for (var c = 0; c < this._data.length; c++) yield { value: this._data[c], index: [c] };
        return;
      }
      var p = [], v = function* (i, h) {
        if (h < o) for (var m = 0; m < i.length; m++) p[h] = m, yield* v(i[m], h + 1);
        else for (var C = 0; C < i.length; C++) p[h] = C, yield { value: i[C], index: p.slice() };
      };
      yield* v(this._data, 0);
    }
  }, n.prototype.rows = function() {
    var o = [], c = this.size();
    if (c.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    var p = this._data;
    for (var v of p) o.push(new n([v], this._datatype));
    return o;
  }, n.prototype.columns = function() {
    var o = this, c = [], p = this.size();
    if (p.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var v = this._data, d = function(m) {
      var C = v.map((A) => [A[m]]);
      c.push(new n(C, o._datatype));
    }, i = 0; i < p[1]; i++) d(i);
    return c;
  }, n.prototype.toArray = function() {
    return Dr(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(o) {
    return Fr(this._data, o);
  }, n.prototype.toString = function() {
    return Fr(this._data);
  }, n.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(o) {
    if (o) {
      if (_r(o) && (o = o.toNumber()), !yr(o) || !Ar(o)) throw new TypeError("The parameter k must be an integer number");
    } else o = 0;
    for (var c = o > 0 ? o : 0, p = o < 0 ? -o : 0, v = this._size[0], d = this._size[1], i = Math.min(v - p, d - c), h = [], m = 0; m < i; m++) h[m] = this._data[m + p][m + c];
    return new n({ data: h, size: [i], datatype: this._datatype });
  }, n.diagonal = function(o, c, p, v) {
    if (!Cr(o)) throw new TypeError("Array expected, size parameter");
    if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(b) {
      if (_r(b) && (b = b.toNumber()), !yr(b) || !Ar(b) || b < 1) throw new Error("Size values must be positive integers");
      return b;
    }), p) {
      if (_r(p) && (p = p.toNumber()), !yr(p) || !Ar(p)) throw new TypeError("The parameter k must be an integer number");
    } else p = 0;
    var d = p > 0 ? p : 0, i = p < 0 ? -p : 0, h = o[0], m = o[1], C = Math.min(h - i, m - d), A;
    if (Cr(c)) {
      if (c.length !== C) throw new Error("Invalid value array length");
      A = function(E) {
        return c[E];
      };
    } else if (mr(c)) {
      var w = c.size();
      if (w.length !== 1 || w[0] !== C) throw new Error("Invalid matrix length");
      A = function(E) {
        return c.get([E]);
      };
    } else A = function() {
      return c;
    };
    v || (v = _r(A(0)) ? A(0).mul(0) : 0);
    var y = [];
    if (o.length > 0) {
      y = Ye(y, o, v);
      for (var F = 0; F < C; F++) y[F + i][F + d] = A(F);
    }
    return new n({ data: y, size: [h, m] });
  }, n.fromJSON = function(o) {
    return new n(o);
  }, n.prototype.swapRows = function(o, c) {
    if (!yr(o) || !Ar(o) || !yr(c) || !Ar(c)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return wr(o, this._size[0]), wr(c, this._size[0]), n._swapRows(o, c, this._data), this;
  }, n._swapRows = function(o, c, p) {
    var v = p[o];
    p[o] = p[c], p[c] = v;
  };
  function f(o) {
    return mr(o) ? f(o.valueOf()) : Cr(o) ? o.map(f) : o;
  }
  return n;
}, { isClass: true });
function Pr(r, e, n) {
  if (!n) return mr(r) ? r.map((t) => e(t), false, true) : Yt(r, e, true);
  var u = (t) => t === 0 ? t : e(t);
  return mr(r) ? r.map((t) => u(t), false, true) : Yt(r, u, true);
}
var Kt = "isInteger", ri = ["typed"], ei = G(Kt, ri, (r) => {
  var { typed: e } = r;
  return e(Kt, { number: Ar, BigNumber: function(u) {
    return u.isInt();
  }, bigint: function(u) {
    return true;
  }, Fraction: function(u) {
    return u.d === 1n;
  }, "Array | Matrix": e.referToSelf((n) => (u) => Pr(u, n)) });
}), xt = "number", it = "number, number";
function au(r) {
  return Math.abs(r);
}
au.signature = xt;
function iu(r, e) {
  return r + e;
}
iu.signature = it;
function ou(r, e) {
  return r - e;
}
ou.signature = it;
function su(r, e) {
  return r * e;
}
su.signature = it;
function fu(r) {
  return -r;
}
fu.signature = xt;
function At(r) {
  return da(r);
}
At.signature = xt;
function cu(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
cu.signature = it;
var ti = "number";
function lu(r) {
  return r > 0;
}
lu.signature = ti;
function _e(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), u));
}
var Ht = "isPositive", ni = ["typed", "config"], ui = G(Ht, ni, (r) => {
  var { typed: e, config: n } = r;
  return e(Ht, { number: (u) => oe(u, 0, n.relTol, n.absTol) ? false : lu(u), BigNumber: (u) => _e(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(), bigint: (u) => u > 0n, Fraction: (u) => u.s > 0n && u.n > 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Pr(t, u)) });
}), kt = "isZero", ai = ["typed", "equalScalar"], ii = G(kt, ai, (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(kt, { "number | BigNumber | Complex | Fraction": (u) => n(u, 0), bigint: (u) => u === 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Pr(t, u)) });
});
function oi(r, e, n, u) {
  return oe(r.re, e.re, n, u) && oe(r.im, e.im, n, u);
}
var $e = G("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
    return e.find(n, [u.valueType(), t.valueType()])(u.value, t.value);
  }) };
}), Ke = "equalScalar", si = ["typed", "config"], fi = G(Ke, si, (r) => {
  var { typed: e, config: n } = r, u = $e({ typed: e });
  return e(Ke, { "boolean, boolean": function(a, s) {
    return a === s;
  }, "number, number": function(a, s) {
    return oe(a, s, n.relTol, n.absTol);
  }, "BigNumber, BigNumber": function(a, s) {
    return a.eq(s) || _e(a, s, n.relTol, n.absTol);
  }, "bigint, bigint": function(a, s) {
    return a === s;
  }, "Fraction, Fraction": function(a, s) {
    return a.equals(s);
  }, "Complex, Complex": function(a, s) {
    return oi(a, s, n.relTol, n.absTol);
  } }, u);
});
G(Ke, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Ke, { "number, number": function(t, a) {
    return oe(t, a, n.relTol, n.absTol);
  } });
});
var ci = "SparseMatrix", li = ["typed", "equalScalar", "Matrix"], vi = G(ci, li, (r) => {
  var { typed: e, equalScalar: n, Matrix: u } = r;
  function t(i, h) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (h && !Jr(h)) throw new Error("Invalid datatype: " + h);
    if (mr(i)) a(this, i, h);
    else if (i && Cr(i.index) && Cr(i.ptr) && Cr(i.size)) this._values = i.values, this._index = i.index, this._ptr = i.ptr, this._size = i.size, this._datatype = h || i.datatype;
    else if (Cr(i)) s(this, i, h);
    else {
      if (i) throw new TypeError("Unsupported type of data (" + Yr(i) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = h;
    }
  }
  function a(i, h, m) {
    h.type === "SparseMatrix" ? (i._values = h._values ? Dr(h._values) : void 0, i._index = Dr(h._index), i._ptr = Dr(h._ptr), i._size = Dr(h._size), i._datatype = m || h._datatype) : s(i, h.valueOf(), m || h._datatype);
  }
  function s(i, h, m) {
    i._values = [], i._index = [], i._ptr = [], i._datatype = m;
    var C = h.length, A = 0, w = n, y = 0;
    if (Jr(m) && (w = e.find(n, [m, m]) || n, y = e.convert(0, m)), C > 0) {
      var F = 0;
      do {
        i._ptr.push(i._index.length);
        for (var b = 0; b < C; b++) {
          var E = h[b];
          if (Cr(E)) {
            if (F === 0 && A < E.length && (A = E.length), F < E.length) {
              var g = E[F];
              w(g, y) || (i._values.push(g), i._index.push(b));
            }
          } else F === 0 && A < 1 && (A = 1), w(E, y) || (i._values.push(E), i._index.push(b));
        }
        F++;
      } while (F < A);
    }
    i._ptr.push(i._index.length), i._size = [C, A];
  }
  t.prototype = new u(), t.prototype.createSparseMatrix = function(i, h) {
    return new t(i, h);
  }, Object.defineProperty(t, "name", { value: "SparseMatrix" }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
    return at(this._values, Yr);
  }, t.prototype.storage = function() {
    return "sparse";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(i, h) {
    return new t(i, h);
  }, t.prototype.density = function() {
    var i = this._size[0], h = this._size[1];
    return i !== 0 && h !== 0 ? this._index.length / (i * h) : 0;
  }, t.prototype.subset = function(i, h, m) {
    if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return D(this, i);
      case 2:
      case 3:
        return l(this, i, h, m);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function D(i, h) {
    if (!Ct(h)) throw new TypeError("Invalid index");
    var m = h.isScalar();
    if (m) return i.get(h.min());
    var C = h.size();
    if (C.length !== i._size.length) throw new dr(C.length, i._size.length);
    var A, w, y, F, b = h.min(), E = h.max();
    for (A = 0, w = i._size.length; A < w; A++) wr(b[A], i._size[A]), wr(E[A], i._size[A]);
    var g = i._values, B = i._index, _ = i._ptr, x = h.dimension(0), O = h.dimension(1), S = [], U = [];
    x.forEach(function(V, I) {
      U[V] = I[0], S[V] = true;
    });
    var z = g ? [] : void 0, X = [], R = [];
    return O.forEach(function(V) {
      for (R.push(X.length), y = _[V], F = _[V + 1]; y < F; y++) A = B[y], S[A] === true && (X.push(U[A]), z && z.push(g[y]));
    }), R.push(X.length), new t({ values: z, index: X, ptr: R, size: C, datatype: i._datatype });
  }
  function l(i, h, m, C) {
    if (!h || h.isIndex !== true) throw new TypeError("Invalid index");
    var A = h.size(), w = h.isScalar(), y;
    if (mr(m) ? (y = m.size(), m = m.toArray()) : y = pr(m), w) {
      if (y.length !== 0) throw new TypeError("Scalar expected");
      i.set(h.min(), m, C);
    } else {
      if (A.length !== 1 && A.length !== 2) throw new dr(A.length, i._size.length, "<");
      if (y.length < A.length) {
        for (var F = 0, b = 0; A[F] === 1 && y[F] === 1; ) F++;
        for (; A[F] === 1; ) b++, F++;
        m = kn(m, A.length, b, y);
      }
      if (!De(A, y)) throw new dr(A, y, ">");
      if (A.length === 1) {
        var E = h.dimension(0);
        E.forEach(function(_, x) {
          wr(_), i.set([_, 0], m[x[0]], C);
        });
      } else {
        var g = h.dimension(0), B = h.dimension(1);
        g.forEach(function(_, x) {
          wr(_), B.forEach(function(O, S) {
            wr(O), i.set([_, O], m[x[0]][S[0]], C);
          });
        });
      }
    }
    return i;
  }
  t.prototype.get = function(i) {
    if (!Cr(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new dr(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
    var h = i[0], m = i[1];
    wr(h, this._size[0]), wr(m, this._size[1]);
    var C = f(h, this._ptr[m], this._ptr[m + 1], this._index);
    return C < this._ptr[m + 1] && this._index[C] === h ? this._values[C] : 0;
  }, t.prototype.set = function(i, h, m) {
    if (!Cr(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new dr(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var C = i[0], A = i[1], w = this._size[0], y = this._size[1], F = n, b = 0;
    Jr(this._datatype) && (F = e.find(n, [this._datatype, this._datatype]) || n, b = e.convert(0, this._datatype)), (C > w - 1 || A > y - 1) && (p(this, Math.max(C + 1, w), Math.max(A + 1, y), m), w = this._size[0], y = this._size[1]), wr(C, w), wr(A, y);
    var E = f(C, this._ptr[A], this._ptr[A + 1], this._index);
    return E < this._ptr[A + 1] && this._index[E] === C ? F(h, b) ? o(E, A, this._values, this._index, this._ptr) : this._values[E] = h : F(h, b) || c(E, C, A, h, this._values, this._index, this._ptr), this;
  };
  function f(i, h, m, C) {
    if (m - h === 0) return m;
    for (var A = h; A < m; A++) if (C[A] === i) return A;
    return h;
  }
  function o(i, h, m, C, A) {
    m.splice(i, 1), C.splice(i, 1);
    for (var w = h + 1; w < A.length; w++) A[w]--;
  }
  function c(i, h, m, C, A, w, y) {
    A.splice(i, 0, C), w.splice(i, 0, h);
    for (var F = m + 1; F < y.length; F++) y[F]++;
  }
  t.prototype.resize = function(i, h, m) {
    if (!Je(i)) throw new TypeError("Array or Matrix expected");
    var C = i.valueOf().map((w) => Array.isArray(w) && w.length === 1 ? w[0] : w);
    if (C.length !== 2) throw new Error("Only two dimensions matrix are supported");
    C.forEach(function(w) {
      if (!yr(w) || !Ar(w) || w < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Fr(C) + ")");
    });
    var A = m ? this.clone() : this;
    return p(A, C[0], C[1], h);
  };
  function p(i, h, m, C) {
    var A = C || 0, w = n, y = 0;
    Jr(i._datatype) && (w = e.find(n, [i._datatype, i._datatype]) || n, y = e.convert(0, i._datatype), A = e.convert(A, i._datatype));
    var F = !w(A, y), b = i._size[0], E = i._size[1], g, B, _;
    if (m > E) {
      for (B = E; B < m; B++) if (i._ptr[B] = i._values.length, F) for (g = 0; g < b; g++) i._values.push(A), i._index.push(g);
      i._ptr[m] = i._values.length;
    } else m < E && (i._ptr.splice(m + 1, E - m), i._values.splice(i._ptr[m], i._values.length), i._index.splice(i._ptr[m], i._index.length));
    if (E = m, h > b) {
      if (F) {
        var x = 0;
        for (B = 0; B < E; B++) {
          i._ptr[B] = i._ptr[B] + x, _ = i._ptr[B + 1] + x;
          var O = 0;
          for (g = b; g < h; g++, O++) i._values.splice(_ + O, 0, A), i._index.splice(_ + O, 0, g), x++;
        }
        i._ptr[E] = i._values.length;
      }
    } else if (h < b) {
      var S = 0;
      for (B = 0; B < E; B++) {
        i._ptr[B] = i._ptr[B] - S;
        var U = i._ptr[B], z = i._ptr[B + 1] - S;
        for (_ = U; _ < z; _++) g = i._index[_], g > h - 1 && (i._values.splice(_, 1), i._index.splice(_, 1), S++);
      }
      i._ptr[B] = i._values.length;
    }
    return i._size[0] = h, i._size[1] = m, i;
  }
  t.prototype.reshape = function(i, h) {
    if (!Cr(i)) throw new TypeError("Array expected");
    if (i.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    i.forEach(function(V) {
      if (!yr(V) || !Ar(V) || V <= -2 || V === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Fr(i) + ")");
    });
    var m = this._size[0] * this._size[1];
    i = Bt(i, m);
    var C = i[0] * i[1];
    if (m !== C) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var A = h ? this.clone() : this;
    if (this._size[0] === i[0] && this._size[1] === i[1]) return A;
    for (var w = [], y = 0; y < A._ptr.length; y++) for (var F = 0; F < A._ptr[y + 1] - A._ptr[y]; F++) w.push(y);
    for (var b = A._values.slice(), E = A._index.slice(), g = 0; g < A._index.length; g++) {
      var B = E[g], _ = w[g], x = B * A._size[1] + _;
      w[g] = x % i[1], E[g] = Math.floor(x / i[1]);
    }
    A._values.length = 0, A._index.length = 0, A._ptr.length = i[1] + 1, A._size = i.slice();
    for (var O = 0; O < A._ptr.length; O++) A._ptr[O] = 0;
    for (var S = 0; S < b.length; S++) {
      var U = E[S], z = w[S], X = b[S], R = f(U, A._ptr[z], A._ptr[z + 1], A._index);
      c(R, U, z, X, A._values, A._index, A._ptr);
    }
    return A;
  }, t.prototype.clone = function() {
    var i = new t({ values: this._values ? Dr(this._values) : void 0, index: Dr(this._index), ptr: Dr(this._ptr), size: Dr(this._size), datatype: this._datatype });
    return i;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(i, h) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var m = this, C = this._size[0], A = this._size[1], w = Ge(i, m, "map"), y = function(b, E, g) {
      return w.fn(b, [E, g], m);
    };
    return v(this, 0, C - 1, 0, A - 1, y, h);
  };
  function v(i, h, m, C, A, w, y) {
    var F = [], b = [], E = [], g = n, B = 0;
    Jr(i._datatype) && (g = e.find(n, [i._datatype, i._datatype]) || n, B = e.convert(0, i._datatype));
    for (var _ = function(N, Q, W) {
      var q = w(N, Q, W);
      g(q, B) || (F.push(q), b.push(Q));
    }, x = C; x <= A; x++) {
      E.push(F.length);
      var O = i._ptr[x], S = i._ptr[x + 1];
      if (y) for (var U = O; U < S; U++) {
        var z = i._index[U];
        z >= h && z <= m && _(i._values[U], z - h, x - C);
      }
      else {
        for (var X = {}, R = O; R < S; R++) {
          var V = i._index[R];
          X[V] = i._values[R];
        }
        for (var I = h; I <= m; I++) {
          var $ = I in X ? X[I] : 0;
          _($, I - h, x - C);
        }
      }
    }
    return E.push(F.length), new t({ values: F, index: b, ptr: E, size: [m - h + 1, A - C + 1] });
  }
  t.prototype.forEach = function(i, h) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var m = this, C = this._size[0], A = this._size[1], w = Ge(i, m, "forEach"), y = 0; y < A; y++) {
      var F = this._ptr[y], b = this._ptr[y + 1];
      if (h) for (var E = F; E < b; E++) {
        var g = this._index[E];
        w.fn(this._values[E], [g, y], m);
      }
      else {
        for (var B = {}, _ = F; _ < b; _++) {
          var x = this._index[_];
          B[x] = this._values[_];
        }
        for (var O = 0; O < C; O++) {
          var S = O in B ? B[O] : 0;
          w.fn(S, [O, y], m);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var i = this._size[1], h = 0; h < i; h++) for (var m = this._ptr[h], C = this._ptr[h + 1], A = m; A < C; A++) {
      var w = this._index[A];
      yield { value: this._values[A], index: [w, h] };
    }
  }, t.prototype.toArray = function() {
    return d(this._values, this._index, this._ptr, this._size, true);
  }, t.prototype.valueOf = function() {
    return d(this._values, this._index, this._ptr, this._size, false);
  };
  function d(i, h, m, C, A) {
    var w = C[0], y = C[1], F = [], b, E;
    for (b = 0; b < w; b++) for (F[b] = [], E = 0; E < y; E++) F[b][E] = 0;
    for (E = 0; E < y; E++) for (var g = m[E], B = m[E + 1], _ = g; _ < B; _++) b = h[_], F[b][E] = i ? A ? Dr(i[_]) : i[_] : 1;
    return F;
  }
  return t.prototype.format = function(i) {
    for (var h = this._size[0], m = this._size[1], C = this.density(), A = "Sparse Matrix [" + Fr(h, i) + " x " + Fr(m, i) + "] density: " + Fr(C, i) + `
`, w = 0; w < m; w++) for (var y = this._ptr[w], F = this._ptr[w + 1], b = y; b < F; b++) {
      var E = this._index[b];
      A += `
    (` + Fr(E, i) + ", " + Fr(w, i) + ") ==> " + (this._values ? Fr(this._values[b], i) : "X");
    }
    return A;
  }, t.prototype.toString = function() {
    return Fr(this.toArray());
  }, t.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(i) {
    if (i) {
      if (_r(i) && (i = i.toNumber()), !yr(i) || !Ar(i)) throw new TypeError("The parameter k must be an integer number");
    } else i = 0;
    var h = i > 0 ? i : 0, m = i < 0 ? -i : 0, C = this._size[0], A = this._size[1], w = Math.min(C - m, A - h), y = [], F = [], b = [];
    b[0] = 0;
    for (var E = h; E < A && y.length < w; E++) for (var g = this._ptr[E], B = this._ptr[E + 1], _ = g; _ < B; _++) {
      var x = this._index[_];
      if (x === E - h + m) {
        y.push(this._values[_]), F[y.length - 1] = x - m;
        break;
      }
    }
    return b.push(y.length), new t({ values: y, index: F, ptr: b, size: [w, 1] });
  }, t.fromJSON = function(i) {
    return new t(i);
  }, t.diagonal = function(i, h, m, C, A) {
    if (!Cr(i)) throw new TypeError("Array expected, size parameter");
    if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (i = i.map(function(V) {
      if (_r(V) && (V = V.toNumber()), !yr(V) || !Ar(V) || V < 1) throw new Error("Size values must be positive integers");
      return V;
    }), m) {
      if (_r(m) && (m = m.toNumber()), !yr(m) || !Ar(m)) throw new TypeError("The parameter k must be an integer number");
    } else m = 0;
    var w = n, y = 0;
    Jr(A) && (w = e.find(n, [A, A]) || n, y = e.convert(0, A));
    var F = m > 0 ? m : 0, b = m < 0 ? -m : 0, E = i[0], g = i[1], B = Math.min(E - b, g - F), _;
    if (Cr(h)) {
      if (h.length !== B) throw new Error("Invalid value array length");
      _ = function(I) {
        return h[I];
      };
    } else if (mr(h)) {
      var x = h.size();
      if (x.length !== 1 || x[0] !== B) throw new Error("Invalid matrix length");
      _ = function(I) {
        return h.get([I]);
      };
    } else _ = function() {
      return h;
    };
    for (var O = [], S = [], U = [], z = 0; z < g; z++) {
      U.push(O.length);
      var X = z - F;
      if (X >= 0 && X < B) {
        var R = _(X);
        w(R, y) || (S.push(X + b), O.push(R));
      }
    }
    return U.push(O.length), new t({ values: O, index: S, ptr: U, size: [E, g] });
  }, t.prototype.swapRows = function(i, h) {
    if (!yr(i) || !Ar(i) || !yr(h) || !Ar(h)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return wr(i, this._size[0]), wr(h, this._size[0]), t._swapRows(i, h, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(i, h, m, C, A) {
    for (var w = C[i], y = C[i + 1], F = w; F < y; F++) A(m[F], h[F]);
  }, t._swapRows = function(i, h, m, C, A, w) {
    for (var y = 0; y < m; y++) {
      var F = w[y], b = w[y + 1], E = f(i, F, b, A), g = f(h, F, b, A);
      if (E < b && g < b && A[E] === i && A[g] === h) {
        if (C) {
          var B = C[E];
          C[E] = C[g], C[g] = B;
        }
        continue;
      }
      if (E < b && A[E] === i && (g >= b || A[g] !== h)) {
        var _ = C ? C[E] : void 0;
        A.splice(g, 0, h), C && C.splice(g, 0, _), A.splice(g <= E ? E + 1 : E, 1), C && C.splice(g <= E ? E + 1 : E, 1);
        continue;
      }
      if (g < b && A[g] === h && (E >= b || A[E] !== i)) {
        var x = C ? C[g] : void 0;
        A.splice(E, 0, i), C && C.splice(E, 0, x), A.splice(E <= g ? g + 1 : g, 1), C && C.splice(E <= g ? g + 1 : g, 1);
      }
    }
  }, t;
}, { isClass: true }), Di = "number", pi = ["typed"];
function di(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], u = e[2], t = e[3];
    return { input: r, radix: n, integerPart: u, fractionalPart: t };
  } else return null;
}
function hi(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, u = 0; u < r.fractionalPart.length; u++) {
    var t = parseInt(r.fractionalPart[u], r.radix);
    n += t / Math.pow(r.radix, u + 1);
  }
  var a = e + n;
  if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return a;
}
var mi = G(Di, pi, (r) => {
  var { typed: e } = r, n = e("number", { "": function() {
    return 0;
  }, number: function(t) {
    return t;
  }, string: function(t) {
    if (t === "NaN") return NaN;
    var a = di(t);
    if (a) return hi(a);
    var s = 0, D = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    D && (s = Number(D[2]), t = D[1]);
    var l = Number(t);
    if (isNaN(l)) throw new SyntaxError('String "' + t + '" is not a valid number');
    if (D) {
      if (l > 2 ** s - 1) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      l >= 2 ** (s - 1) && (l = l - 2 ** s);
    }
    return l;
  }, BigNumber: function(t) {
    return t.toNumber();
  }, bigint: function(t) {
    return Number(t);
  }, Fraction: function(t) {
    return t.valueOf();
  }, Unit: e.referToSelf((u) => (t) => {
    var a = t.clone();
    return a.value = u(t.value), a;
  }), null: function(t) {
    return 0;
  }, "Unit, string | Unit": function(t, a) {
    return t.toNumber(a);
  }, "Array | Matrix": e.referToSelf((u) => (t) => Pr(t, u)) });
  return n.fromJSON = function(u) {
    return parseFloat(u.value);
  }, n;
}), gi = "bignumber", yi = ["typed", "BigNumber"], Ai = G(gi, yi, (r) => {
  var { typed: e, BigNumber: n } = r;
  return e("bignumber", { "": function() {
    return new n(0);
  }, number: function(t) {
    return new n(t + "");
  }, string: function(t) {
    var a = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (a) {
      var s = a[2], D = n(a[1]), l = new n(2).pow(Number(s));
      if (D.gt(l.sub(1))) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      var f = new n(2).pow(Number(s) - 1);
      return D.gte(f) ? D.sub(l) : D;
    }
    return new n(t);
  }, BigNumber: function(t) {
    return t;
  }, bigint: function(t) {
    return new n(t.toString());
  }, Unit: e.referToSelf((u) => (t) => {
    var a = t.clone();
    return a.value = u(t.value), a;
  }), Fraction: function(t) {
    return new n(String(t.n)).div(String(t.d)).times(String(t.s));
  }, null: function(t) {
    return new n(0);
  }, "Array | Matrix": e.referToSelf((u) => (t) => Pr(t, u)) });
}), Fi = "complex", Ei = ["typed", "Complex"], Ci = G(Fi, Ei, (r) => {
  var { typed: e, Complex: n } = r;
  return e("complex", { "": function() {
    return n.ZERO;
  }, number: function(t) {
    return new n(t, 0);
  }, "number, number": function(t, a) {
    return new n(t, a);
  }, "BigNumber, BigNumber": function(t, a) {
    return new n(t.toNumber(), a.toNumber());
  }, Fraction: function(t) {
    return new n(t.valueOf(), 0);
  }, Complex: function(t) {
    return t.clone();
  }, string: function(t) {
    return n(t);
  }, null: function(t) {
    return n(0);
  }, Object: function(t) {
    if ("re" in t && "im" in t) return new n(t.re, t.im);
    if ("r" in t && "phi" in t || "abs" in t && "arg" in t) return new n(t);
    throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
  }, "Array | Matrix": e.referToSelf((u) => (t) => Pr(t, u)) });
}), bi = "fraction", wi = ["typed", "Fraction"], _i = G(bi, wi, (r) => {
  var { typed: e, Fraction: n } = r;
  return e("fraction", { number: function(t) {
    if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");
    return new n(t);
  }, string: function(t) {
    return new n(t);
  }, "number, number": function(t, a) {
    return new n(t, a);
  }, "bigint, bigint": function(t, a) {
    return new n(t, a);
  }, null: function(t) {
    return new n(0);
  }, BigNumber: function(t) {
    return new n(t.toString());
  }, bigint: function(t) {
    return new n(t.toString());
  }, Fraction: function(t) {
    return t;
  }, Unit: e.referToSelf((u) => (t) => {
    var a = t.clone();
    return a.value = u(t.value), a;
  }), Object: function(t) {
    return new n(t);
  }, "Array | Matrix": e.referToSelf((u) => (t) => Pr(t, u)) });
}), jt = "matrix", Bi = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], xi = G(jt, Bi, (r) => {
  var { typed: e, Matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(jt, { "": function() {
    return a([]);
  }, string: function(D) {
    return a([], D);
  }, "string, string": function(D, l) {
    return a([], D, l);
  }, Array: function(D) {
    return a(D);
  }, Matrix: function(D) {
    return a(D, D.storage());
  }, "Array | Matrix, string": a, "Array | Matrix, string, string": a });
  function a(s, D, l) {
    if (D === "dense" || D === "default" || D === void 0) return new u(s, l);
    if (D === "sparse") return new t(s, l);
    throw new TypeError("Unknown matrix type " + JSON.stringify(D) + ".");
  }
}), rn = "matrixFromColumns", Si = ["typed", "matrix", "flatten", "size"], Mi = G(rn, Si, (r) => {
  var { typed: e, matrix: n, flatten: u, size: t } = r;
  return e(rn, { "...Array": function(l) {
    return a(l);
  }, "...Matrix": function(l) {
    return n(a(l.map((f) => f.toArray())));
  } });
  function a(D) {
    if (D.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
    for (var l = s(D[0]), f = [], o = 0; o < l; o++) f[o] = [];
    for (var c of D) {
      var p = s(c);
      if (p !== l) throw new TypeError("The vectors had different length: " + (l | 0) + " \u2260 " + (p | 0));
      for (var v = u(c), d = 0; d < l; d++) f[d].push(v[d]);
    }
    return f;
  }
  function s(D) {
    var l = t(D);
    if (l.length === 1) return l[0];
    if (l.length === 2) {
      if (l[0] === 1) return l[1];
      if (l[1] === 1) return l[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), en = "unaryMinus", Ni = ["typed"], Ti = G(en, Ni, (r) => {
  var { typed: e } = r;
  return e(en, { number: fu, "Complex | BigNumber | Fraction": (n) => n.neg(), bigint: (n) => -n, Unit: e.referToSelf((n) => (u) => {
    var t = u.clone();
    return t.value = e.find(n, t.valueType())(u.value), t;
  }), "Array | Matrix": e.referToSelf((n) => (u) => Pr(u, n, true)) });
}), tn = "abs", zi = ["typed"], Oi = G(tn, zi, (r) => {
  var { typed: e } = r;
  return e(tn, { number: au, "Complex | BigNumber | Fraction | Unit": (n) => n.abs(), bigint: (n) => n < 0n ? -n : n, "Array | Matrix": e.referToSelf((n) => (u) => Pr(u, n, true)) });
}), nn = "addScalar", $i = ["typed"], Ii = G(nn, $i, (r) => {
  var { typed: e } = r;
  return e(nn, { "number, number": iu, "Complex, Complex": function(u, t) {
    return u.add(t);
  }, "BigNumber, BigNumber": function(u, t) {
    return u.plus(t);
  }, "bigint, bigint": function(u, t) {
    return u + t;
  }, "Fraction, Fraction": function(u, t) {
    return u.add(t);
  }, "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (u.value === null || u.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
    if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
    if (!u.equalBase(t)) throw new Error("Units do not match");
    var a = u.clone();
    return a.value = e.find(n, [a.valueType(), t.valueType()])(a.value, t.value), a.fixPrefix = false, a;
  }) });
}), un = "subtractScalar", qi = ["typed"], Ri = G(un, qi, (r) => {
  var { typed: e } = r;
  return e(un, { "number, number": ou, "Complex, Complex": function(u, t) {
    return u.sub(t);
  }, "BigNumber, BigNumber": function(u, t) {
    return u.minus(t);
  }, "bigint, bigint": function(u, t) {
    return u - t;
  }, "Fraction, Fraction": function(u, t) {
    return u.sub(t);
  }, "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (u.value === null || u.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
    if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
    if (!u.equalBase(t)) throw new Error("Units do not match");
    var a = u.clone();
    return a.value = e.find(n, [a.valueType(), t.valueType()])(a.value, t.value), a.fixPrefix = false, a;
  }) });
}), Ui = "matAlgo11xS0s", Pi = ["typed", "equalScalar"], Li = G(Ui, Pi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s, D) {
    var l = t._values, f = t._index, o = t._ptr, c = t._size, p = t._datatype;
    if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = c[0], d = c[1], i, h = n, m = 0, C = s;
    typeof p == "string" && (i = p, h = e.find(n, [i, i]), m = e.convert(0, i), a = e.convert(a, i), C = e.find(s, [i, i]));
    for (var A = [], w = [], y = [], F = 0; F < d; F++) {
      y[F] = w.length;
      for (var b = o[F], E = o[F + 1], g = b; g < E; g++) {
        var B = f[g], _ = D ? C(a, l[g]) : C(l[g], a);
        h(_, m) || (w.push(B), A.push(_));
      }
    }
    return y[d] = w.length, t.createSparseMatrix({ values: A, index: w, ptr: y, size: [v, d], datatype: i });
  };
}), Qi = "matAlgo12xSfs", Vi = ["typed", "DenseMatrix"], Be = G(Qi, Vi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var l = t._values, f = t._index, o = t._ptr, c = t._size, p = t._datatype;
    if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = c[0], d = c[1], i, h = s;
    typeof p == "string" && (i = p, a = e.convert(a, i), h = e.find(s, [i, i]));
    for (var m = [], C = [], A = [], w = 0; w < d; w++) {
      for (var y = w + 1, F = o[w], b = o[w + 1], E = F; E < b; E++) {
        var g = f[E];
        C[g] = l[E], A[g] = y;
      }
      for (var B = 0; B < v; B++) w === 0 && (m[B] = []), A[B] === y ? m[B][w] = D ? h(a, C[B]) : h(C[B], a) : m[B][w] = D ? h(a, 0) : h(0, a);
    }
    return new n({ data: m, size: [v, d], datatype: i });
  };
}), Zi = "matAlgo14xDs", Xi = ["typed"], vu = G(Zi, Xi, (r) => {
  var { typed: e } = r;
  return function(t, a, s, D) {
    var l = t._data, f = t._size, o = t._datatype, c, p = s;
    typeof o == "string" && (c = o, a = e.convert(a, c), p = e.find(s, [c, c]));
    var v = f.length > 0 ? n(p, 0, f, f[0], l, a, D) : [];
    return t.createDenseMatrix({ data: v, size: Dr(f), datatype: c });
  };
  function n(u, t, a, s, D, l, f) {
    var o = [];
    if (t === a.length - 1) for (var c = 0; c < s; c++) o[c] = f ? u(l, D[c]) : u(D[c], l);
    else for (var p = 0; p < s; p++) o[p] = n(u, t + 1, a, a[t + 1], D[p], l, f);
    return o;
  }
}), Wi = "matAlgo03xDSf", Ji = ["typed"], xe = G(Wi, Ji, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, l = u._size, f = u._datatype || u.getDataType(), o = t._values, c = t._index, p = t._ptr, v = t._size, d = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (l.length !== v.length) throw new dr(l.length, v.length);
    if (l[0] !== v[0] || l[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = l[0], h = l[1], m, C = 0, A = a;
    typeof f == "string" && f === d && f !== "mixed" && (m = f, C = e.convert(0, m), A = e.find(a, [m, m]));
    for (var w = [], y = 0; y < i; y++) w[y] = [];
    for (var F = [], b = [], E = 0; E < h; E++) {
      for (var g = E + 1, B = p[E], _ = p[E + 1], x = B; x < _; x++) {
        var O = c[x];
        F[O] = s ? A(o[x], D[O][E]) : A(D[O][E], o[x]), b[O] = g;
      }
      for (var S = 0; S < i; S++) b[S] === g ? w[S][E] = F[S] : w[S][E] = s ? A(C, D[S][E]) : A(D[S][E], C);
    }
    return u.createDenseMatrix({ data: w, size: [i, h], datatype: f === u._datatype && d === t._datatype ? m : void 0 });
  };
}), Yi = "matAlgo05xSfSf", Gi = ["typed", "equalScalar"], Ki = G(Yi, Gi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, l = t._index, f = t._ptr, o = t._size, c = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), p = a._values, v = a._index, d = a._ptr, i = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new dr(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var m = o[0], C = o[1], A, w = n, y = 0, F = s;
    typeof c == "string" && c === h && c !== "mixed" && (A = c, w = e.find(n, [A, A]), y = e.convert(0, A), F = e.find(s, [A, A]));
    var b = D && p ? [] : void 0, E = [], g = [], B = b ? [] : void 0, _ = b ? [] : void 0, x = [], O = [], S, U, z, X;
    for (U = 0; U < C; U++) {
      g[U] = E.length;
      var R = U + 1;
      for (z = f[U], X = f[U + 1]; z < X; z++) S = l[z], E.push(S), x[S] = R, B && (B[S] = D[z]);
      for (z = d[U], X = d[U + 1]; z < X; z++) S = v[z], x[S] !== R && E.push(S), O[S] = R, _ && (_[S] = p[z]);
      if (b) for (z = g[U]; z < E.length; ) {
        S = E[z];
        var V = x[S], I = O[S];
        if (V === R || I === R) {
          var $ = V === R ? B[S] : y, M = I === R ? _[S] : y, N = F($, M);
          w(N, y) ? E.splice(z, 1) : (b.push(N), z++);
        }
      }
    }
    return g[C] = E.length, t.createSparseMatrix({ values: b, index: E, ptr: g, size: [m, C], datatype: c === t._datatype && h === a._datatype ? A : void 0 });
  };
}), Hi = "matAlgo13xDD", ki = ["typed"], ji = G(Hi, ki, (r) => {
  var { typed: e } = r;
  return function(t, a, s) {
    var D = t._data, l = t._size, f = t._datatype, o = a._data, c = a._size, p = a._datatype, v = [];
    if (l.length !== c.length) throw new dr(l.length, c.length);
    for (var d = 0; d < l.length; d++) {
      if (l[d] !== c[d]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + c + ")");
      v[d] = l[d];
    }
    var i, h = s;
    typeof f == "string" && f === p && (i = f, h = e.find(s, [i, i]));
    var m = v.length > 0 ? n(h, 0, v, v[0], D, o) : [];
    return t.createDenseMatrix({ data: m, size: v, datatype: i });
  };
  function n(u, t, a, s, D, l) {
    var f = [];
    if (t === a.length - 1) for (var o = 0; o < s; o++) f[o] = u(D[o], l[o]);
    else for (var c = 0; c < s; c++) f[c] = n(u, t + 1, a, a[t + 1], D[c], l[c]);
    return f;
  }
});
function Tr(r, e) {
  if (De(r.size(), e.size())) return [r, e];
  var n = tu(r.size(), e.size());
  return [r, e].map((u) => ro(u, n));
}
function ro(r, e) {
  return De(r.size(), e) ? r : r.create(yt(r.valueOf(), e), r.datatype());
}
var eo = "matrixAlgorithmSuite", to = ["typed", "matrix"], Ae = G(eo, to, (r) => {
  var { typed: e, matrix: n } = r, u = ji({ typed: e }), t = vu({ typed: e });
  return function(s) {
    var D = s.elop, l = s.SD || s.DS, f;
    D ? (f = { "DenseMatrix, DenseMatrix": (v, d) => u(...Tr(v, d), D), "Array, Array": (v, d) => u(...Tr(n(v), n(d)), D).valueOf(), "Array, DenseMatrix": (v, d) => u(...Tr(n(v), d), D), "DenseMatrix, Array": (v, d) => u(...Tr(v, n(d)), D) }, s.SS && (f["SparseMatrix, SparseMatrix"] = (v, d) => s.SS(...Tr(v, d), D, false)), s.DS && (f["DenseMatrix, SparseMatrix"] = (v, d) => s.DS(...Tr(v, d), D, false), f["Array, SparseMatrix"] = (v, d) => s.DS(...Tr(n(v), d), D, false)), l && (f["SparseMatrix, DenseMatrix"] = (v, d) => l(...Tr(d, v), D, true), f["SparseMatrix, Array"] = (v, d) => l(...Tr(n(d), v), D, true))) : (f = { "DenseMatrix, DenseMatrix": e.referToSelf((v) => (d, i) => u(...Tr(d, i), v)), "Array, Array": e.referToSelf((v) => (d, i) => u(...Tr(n(d), n(i)), v).valueOf()), "Array, DenseMatrix": e.referToSelf((v) => (d, i) => u(...Tr(n(d), i), v)), "DenseMatrix, Array": e.referToSelf((v) => (d, i) => u(...Tr(d, n(i)), v)) }, s.SS && (f["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (d, i) => s.SS(...Tr(d, i), v, false))), s.DS && (f["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (d, i) => s.DS(...Tr(d, i), v, false)), f["Array, SparseMatrix"] = e.referToSelf((v) => (d, i) => s.DS(...Tr(n(d), i), v, false))), l && (f["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (d, i) => l(...Tr(i, d), v, true)), f["SparseMatrix, Array"] = e.referToSelf((v) => (d, i) => l(...Tr(n(i), d), v, true))));
    var o = s.scalar || "any", c = s.Ds || s.Ss;
    c && (D ? (f["DenseMatrix," + o] = (v, d) => t(v, d, D, false), f[o + ", DenseMatrix"] = (v, d) => t(d, v, D, true), f["Array," + o] = (v, d) => t(n(v), d, D, false).valueOf(), f[o + ", Array"] = (v, d) => t(n(d), v, D, true).valueOf()) : (f["DenseMatrix," + o] = e.referToSelf((v) => (d, i) => t(d, i, v, false)), f[o + ", DenseMatrix"] = e.referToSelf((v) => (d, i) => t(i, d, v, true)), f["Array," + o] = e.referToSelf((v) => (d, i) => t(n(d), i, v, false).valueOf()), f[o + ", Array"] = e.referToSelf((v) => (d, i) => t(n(i), d, v, true).valueOf())));
    var p = s.sS !== void 0 ? s.sS : s.Ss;
    return D ? (s.Ss && (f["SparseMatrix," + o] = (v, d) => s.Ss(v, d, D, false)), p && (f[o + ", SparseMatrix"] = (v, d) => p(d, v, D, true))) : (s.Ss && (f["SparseMatrix," + o] = e.referToSelf((v) => (d, i) => s.Ss(d, i, v, false))), p && (f[o + ", SparseMatrix"] = e.referToSelf((v) => (d, i) => p(i, d, v, true)))), D && D.signatures && sa(f, D.signatures), f;
  };
}), no = "matAlgo01xDSid", uo = ["typed"], Du = G(no, uo, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, l = u._size, f = u._datatype || u.getDataType(), o = t._values, c = t._index, p = t._ptr, v = t._size, d = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (l.length !== v.length) throw new dr(l.length, v.length);
    if (l[0] !== v[0] || l[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = l[0], h = l[1], m = typeof f == "string" && f !== "mixed" && f === d ? f : void 0, C = m ? e.find(a, [m, m]) : a, A, w, y = [];
    for (A = 0; A < i; A++) y[A] = [];
    var F = [], b = [];
    for (w = 0; w < h; w++) {
      for (var E = w + 1, g = p[w], B = p[w + 1], _ = g; _ < B; _++) A = c[_], F[A] = s ? C(o[_], D[A][w]) : C(D[A][w], o[_]), b[A] = E;
      for (A = 0; A < i; A++) b[A] === E ? y[A][w] = F[A] : y[A][w] = D[A][w];
    }
    return u.createDenseMatrix({ data: y, size: [i, h], datatype: f === u._datatype && d === t._datatype ? m : void 0 });
  };
}), ao = "matAlgo04xSidSid", io = ["typed", "equalScalar"], oo = G(ao, io, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, l = t._index, f = t._ptr, o = t._size, c = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), p = a._values, v = a._index, d = a._ptr, i = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new dr(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var m = o[0], C = o[1], A, w = n, y = 0, F = s;
    typeof c == "string" && c === h && c !== "mixed" && (A = c, w = e.find(n, [A, A]), y = e.convert(0, A), F = e.find(s, [A, A]));
    var b = D && p ? [] : void 0, E = [], g = [], B = D && p ? [] : void 0, _ = D && p ? [] : void 0, x = [], O = [], S, U, z, X, R;
    for (U = 0; U < C; U++) {
      g[U] = E.length;
      var V = U + 1;
      for (X = f[U], R = f[U + 1], z = X; z < R; z++) S = l[z], E.push(S), x[S] = V, B && (B[S] = D[z]);
      for (X = d[U], R = d[U + 1], z = X; z < R; z++) if (S = v[z], x[S] === V) {
        if (B) {
          var I = F(B[S], p[z]);
          w(I, y) ? x[S] = null : B[S] = I;
        }
      } else E.push(S), O[S] = V, _ && (_[S] = p[z]);
      if (B && _) for (z = g[U]; z < E.length; ) S = E[z], x[S] === V ? (b[z] = B[S], z++) : O[S] === V ? (b[z] = _[S], z++) : E.splice(z, 1);
    }
    return g[C] = E.length, t.createSparseMatrix({ values: b, index: E, ptr: g, size: [m, C], datatype: c === t._datatype && h === a._datatype ? A : void 0 });
  };
}), so = "matAlgo10xSids", fo = ["typed", "DenseMatrix"], pu = G(so, fo, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var l = t._values, f = t._index, o = t._ptr, c = t._size, p = t._datatype;
    if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = c[0], d = c[1], i, h = s;
    typeof p == "string" && (i = p, a = e.convert(a, i), h = e.find(s, [i, i]));
    for (var m = [], C = [], A = [], w = 0; w < d; w++) {
      for (var y = w + 1, F = o[w], b = o[w + 1], E = F; E < b; E++) {
        var g = f[E];
        C[g] = l[E], A[g] = y;
      }
      for (var B = 0; B < v; B++) w === 0 && (m[B] = []), A[B] === y ? m[B][w] = D ? h(a, C[B]) : h(C[B], a) : m[B][w] = a;
    }
    return new n({ data: m, size: [v, d], datatype: i });
  };
}), co = "multiplyScalar", lo = ["typed"], vo = G(co, lo, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": su, "Complex, Complex": function(u, t) {
    return u.mul(t);
  }, "BigNumber, BigNumber": function(u, t) {
    return u.times(t);
  }, "bigint, bigint": function(u, t) {
    return u * t;
  }, "Fraction, Fraction": function(u, t) {
    return u.mul(t);
  }, "number | Fraction | BigNumber | Complex, Unit": (n, u) => u.multiply(n), "Unit, number | Fraction | BigNumber | Complex | Unit": (n, u) => n.multiply(u) });
}), an = "multiply", Do = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], po = G(an, Do, (r) => {
  var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: s } = r, D = Li({ typed: e, equalScalar: a }), l = vu({ typed: e });
  function f(y, F) {
    switch (y.length) {
      case 1:
        switch (F.length) {
          case 1:
            if (y[0] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (y[0] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + y[0] + ") must match Matrix rows (" + F[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + F.length + " dimensions)");
        }
        break;
      case 2:
        switch (F.length) {
          case 1:
            if (y[1] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + y[1] + ") must match Vector length (" + F[0] + ")");
            break;
          case 2:
            if (y[1] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + y[1] + ") must match Matrix B rows (" + F[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + F.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + y.length + " dimensions)");
    }
  }
  function o(y, F, b) {
    if (b === 0) throw new Error("Cannot multiply two empty vectors");
    return s(y, F);
  }
  function c(y, F) {
    if (F.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
    return p(y, F);
  }
  function p(y, F) {
    var b = y._data, E = y._size, g = y._datatype || y.getDataType(), B = F._data, _ = F._size, x = F._datatype || F.getDataType(), O = E[0], S = _[1], U, z = u, X = t;
    g && x && g === x && typeof g == "string" && g !== "mixed" && (U = g, z = e.find(u, [U, U]), X = e.find(t, [U, U]));
    for (var R = [], V = 0; V < S; V++) {
      for (var I = X(b[0], B[0][V]), $ = 1; $ < O; $++) I = z(I, X(b[$], B[$][V]));
      R[V] = I;
    }
    return y.createDenseMatrix({ data: R, size: [S], datatype: g === y._datatype && x === F._datatype ? U : void 0 });
  }
  var v = e("_multiplyMatrixVector", { "DenseMatrix, any": i, "SparseMatrix, any": C }), d = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": h, "DenseMatrix, SparseMatrix": m, "SparseMatrix, DenseMatrix": A, "SparseMatrix, SparseMatrix": w });
  function i(y, F) {
    var b = y._data, E = y._size, g = y._datatype || y.getDataType(), B = F._data, _ = F._datatype || F.getDataType(), x = E[0], O = E[1], S, U = u, z = t;
    g && _ && g === _ && typeof g == "string" && g !== "mixed" && (S = g, U = e.find(u, [S, S]), z = e.find(t, [S, S]));
    for (var X = [], R = 0; R < x; R++) {
      for (var V = b[R], I = z(V[0], B[0]), $ = 1; $ < O; $++) I = U(I, z(V[$], B[$]));
      X[R] = I;
    }
    return y.createDenseMatrix({ data: X, size: [x], datatype: g === y._datatype && _ === F._datatype ? S : void 0 });
  }
  function h(y, F) {
    var b = y._data, E = y._size, g = y._datatype || y.getDataType(), B = F._data, _ = F._size, x = F._datatype || F.getDataType(), O = E[0], S = E[1], U = _[1], z, X = u, R = t;
    g && x && g === x && typeof g == "string" && g !== "mixed" && g !== "mixed" && (z = g, X = e.find(u, [z, z]), R = e.find(t, [z, z]));
    for (var V = [], I = 0; I < O; I++) {
      var $ = b[I];
      V[I] = [];
      for (var M = 0; M < U; M++) {
        for (var N = R($[0], B[0][M]), Q = 1; Q < S; Q++) N = X(N, R($[Q], B[Q][M]));
        V[I][M] = N;
      }
    }
    return y.createDenseMatrix({ data: V, size: [O, U], datatype: g === y._datatype && x === F._datatype ? z : void 0 });
  }
  function m(y, F) {
    var b = y._data, E = y._size, g = y._datatype || y.getDataType(), B = F._values, _ = F._index, x = F._ptr, O = F._size, S = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!B) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var U = E[0], z = O[1], X, R = u, V = t, I = a, $ = 0;
    g && S && g === S && typeof g == "string" && g !== "mixed" && (X = g, R = e.find(u, [X, X]), V = e.find(t, [X, X]), I = e.find(a, [X, X]), $ = e.convert(0, X));
    for (var M = [], N = [], Q = [], W = F.createSparseMatrix({ values: M, index: N, ptr: Q, size: [U, z], datatype: g === y._datatype && S === F._datatype ? X : void 0 }), q = 0; q < z; q++) {
      Q[q] = N.length;
      var T = x[q], P = x[q + 1];
      if (P > T) for (var L = 0, Z = 0; Z < U; Z++) {
        for (var Y = Z + 1, J = void 0, H = T; H < P; H++) {
          var k = _[H];
          L !== Y ? (J = V(b[Z][k], B[H]), L = Y) : J = R(J, V(b[Z][k], B[H]));
        }
        L === Y && !I(J, $) && (N.push(Z), M.push(J));
      }
    }
    return Q[z] = N.length, W;
  }
  function C(y, F) {
    var b = y._values, E = y._index, g = y._ptr, B = y._datatype || y._data === void 0 ? y._datatype : y.getDataType();
    if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var _ = F._data, x = F._datatype || F.getDataType(), O = y._size[0], S = F._size[0], U = [], z = [], X = [], R, V = u, I = t, $ = a, M = 0;
    B && x && B === x && typeof B == "string" && B !== "mixed" && (R = B, V = e.find(u, [R, R]), I = e.find(t, [R, R]), $ = e.find(a, [R, R]), M = e.convert(0, R));
    var N = [], Q = [];
    X[0] = 0;
    for (var W = 0; W < S; W++) {
      var q = _[W];
      if (!$(q, M)) for (var T = g[W], P = g[W + 1], L = T; L < P; L++) {
        var Z = E[L];
        Q[Z] ? N[Z] = V(N[Z], I(q, b[L])) : (Q[Z] = true, z.push(Z), N[Z] = I(q, b[L]));
      }
    }
    for (var Y = z.length, J = 0; J < Y; J++) {
      var H = z[J];
      U[J] = N[H];
    }
    return X[1] = z.length, y.createSparseMatrix({ values: U, index: z, ptr: X, size: [O, 1], datatype: B === y._datatype && x === F._datatype ? R : void 0 });
  }
  function A(y, F) {
    var b = y._values, E = y._index, g = y._ptr, B = y._datatype || y._data === void 0 ? y._datatype : y.getDataType();
    if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var _ = F._data, x = F._datatype || F.getDataType(), O = y._size[0], S = F._size[0], U = F._size[1], z, X = u, R = t, V = a, I = 0;
    B && x && B === x && typeof B == "string" && B !== "mixed" && (z = B, X = e.find(u, [z, z]), R = e.find(t, [z, z]), V = e.find(a, [z, z]), I = e.convert(0, z));
    for (var $ = [], M = [], N = [], Q = y.createSparseMatrix({ values: $, index: M, ptr: N, size: [O, U], datatype: B === y._datatype && x === F._datatype ? z : void 0 }), W = [], q = [], T = 0; T < U; T++) {
      N[T] = M.length;
      for (var P = T + 1, L = 0; L < S; L++) {
        var Z = _[L][T];
        if (!V(Z, I)) for (var Y = g[L], J = g[L + 1], H = Y; H < J; H++) {
          var k = E[H];
          q[k] !== P ? (q[k] = P, M.push(k), W[k] = R(Z, b[H])) : W[k] = X(W[k], R(Z, b[H]));
        }
      }
      for (var nr = N[T], ur = M.length, tr = nr; tr < ur; tr++) {
        var sr = M[tr];
        $[tr] = W[sr];
      }
    }
    return N[U] = M.length, Q;
  }
  function w(y, F) {
    var b = y._values, E = y._index, g = y._ptr, B = y._datatype || y._data === void 0 ? y._datatype : y.getDataType(), _ = F._values, x = F._index, O = F._ptr, S = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), U = y._size[0], z = F._size[1], X = b && _, R, V = u, I = t;
    B && S && B === S && typeof B == "string" && B !== "mixed" && (R = B, V = e.find(u, [R, R]), I = e.find(t, [R, R]));
    for (var $ = X ? [] : void 0, M = [], N = [], Q = y.createSparseMatrix({ values: $, index: M, ptr: N, size: [U, z], datatype: B === y._datatype && S === F._datatype ? R : void 0 }), W = X ? [] : void 0, q = [], T, P, L, Z, Y, J, H, k, nr = 0; nr < z; nr++) {
      N[nr] = M.length;
      var ur = nr + 1;
      for (Y = O[nr], J = O[nr + 1], Z = Y; Z < J; Z++) if (k = x[Z], X) for (P = g[k], L = g[k + 1], T = P; T < L; T++) H = E[T], q[H] !== ur ? (q[H] = ur, M.push(H), W[H] = I(_[Z], b[T])) : W[H] = V(W[H], I(_[Z], b[T]));
      else for (P = g[k], L = g[k + 1], T = P; T < L; T++) H = E[T], q[H] !== ur && (q[H] = ur, M.push(H));
      if (X) for (var tr = N[nr], sr = M.length, cr = tr; cr < sr; cr++) {
        var fr = M[cr];
        $[cr] = W[fr];
      }
    }
    return N[z] = M.length, Q;
  }
  return e(an, t, { "Array, Array": e.referTo("Matrix, Matrix", (y) => (F, b) => {
    f(pr(F), pr(b));
    var E = y(n(F), n(b));
    return mr(E) ? E.valueOf() : E;
  }), "Matrix, Matrix": function(F, b) {
    var E = F.size(), g = b.size();
    return f(E, g), E.length === 1 ? g.length === 1 ? o(F, b, E[0]) : c(F, b) : g.length === 1 ? v(F, b) : d(F, b);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (y) => (F, b) => y(F, n(b))), "Array, Matrix": e.referToSelf((y) => (F, b) => y(n(F, b.storage()), b)), "SparseMatrix, any": function(F, b) {
    return D(F, b, t, false);
  }, "DenseMatrix, any": function(F, b) {
    return l(F, b, t, false);
  }, "any, SparseMatrix": function(F, b) {
    return D(b, F, t, true);
  }, "any, DenseMatrix": function(F, b) {
    return l(b, F, t, true);
  }, "Array, any": function(F, b) {
    return l(n(F), b, t, false).valueOf();
  }, "any, Array": function(F, b) {
    return l(n(b), F, t, true).valueOf();
  }, "any, any": t, "any, any, ...any": e.referToSelf((y) => (F, b, E) => {
    for (var g = y(F, b), B = 0; B < E.length; B++) g = y(g, E[B]);
    return g;
  }) });
}), on = "sign", ho = ["typed", "BigNumber", "Fraction", "complex"], mo = G(on, ho, (r) => {
  var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
  return e(on, { number: At, Complex: function(s) {
    return s.im === 0 ? u(At(s.re)) : s.sign();
  }, BigNumber: function(s) {
    return new n(s.cmp(0));
  }, bigint: function(s) {
    return s > 0n ? 1n : s < 0n ? -1n : 0n;
  }, Fraction: function(s) {
    return new t(s.s);
  }, "Array | Matrix": e.referToSelf((a) => (s) => Pr(s, a, true)), Unit: e.referToSelf((a) => (s) => {
    if (!s._isDerived() && s.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
    return e.find(a, s.valueType())(s.value);
  }) });
}), go = "sqrt", yo = ["config", "typed", "Complex"], Ao = G(go, yo, (r) => {
  var { config: e, typed: n, Complex: u } = r;
  return n("sqrt", { number: t, Complex: function(s) {
    return s.sqrt();
  }, BigNumber: function(s) {
    return !s.isNegative() || e.predictable ? s.sqrt() : t(s.toNumber());
  }, Unit: function(s) {
    return s.pow(0.5);
  } });
  function t(a) {
    return isNaN(a) ? NaN : a >= 0 || e.predictable ? Math.sqrt(a) : new u(a, 0).sqrt();
  }
}), sn = "subtract", Fo = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Eo = G(sn, Fo, (r) => {
  var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: s, concat: D } = r, l = Du({ typed: e }), f = xe({ typed: e }), o = Ki({ typed: e, equalScalar: u }), c = pu({ typed: e, DenseMatrix: s }), p = Be({ typed: e, DenseMatrix: s }), v = Ae({ typed: e, matrix: n, concat: D });
  return e(sn, { "any, any": t }, v({ elop: t, SS: o, DS: l, SD: f, Ss: p, sS: c }));
}), Co = "matAlgo07xSSf", bo = ["typed", "SparseMatrix"], Ie = G(Co, bo, (r) => {
  var { typed: e, SparseMatrix: n } = r;
  return function(a, s, D) {
    var l = a._size, f = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), o = s._size, c = s._datatype || s._data === void 0 ? s._datatype : s.getDataType();
    if (l.length !== o.length) throw new dr(l.length, o.length);
    if (l[0] !== o[0] || l[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + o + ")");
    var p = l[0], v = l[1], d, i = 0, h = D;
    typeof f == "string" && f === c && f !== "mixed" && (d = f, i = e.convert(0, d), h = e.find(D, [d, d]));
    for (var m = [], C = [], A = new Array(v + 1).fill(0), w = [], y = [], F = [], b = [], E = 0; E < v; E++) {
      var g = E + 1, B = 0;
      u(a, E, F, w, g), u(s, E, b, y, g);
      for (var _ = 0; _ < p; _++) {
        var x = F[_] === g ? w[_] : i, O = b[_] === g ? y[_] : i, S = h(x, O);
        S !== 0 && S !== false && (C.push(_), m.push(S), B++);
      }
      A[E + 1] = A[E] + B;
    }
    return new n({ values: m, index: C, ptr: A, size: [p, v], datatype: f === a._datatype && c === s._datatype ? d : void 0 });
  };
  function u(t, a, s, D, l) {
    for (var f = t._values, o = t._index, c = t._ptr, p = c[a], v = c[a + 1]; p < v; p++) {
      var d = o[p];
      s[d] = l, D[d] = f[p];
    }
  }
}), fn = "conj", wo = ["typed"], _o = G(fn, wo, (r) => {
  var { typed: e } = r;
  return e(fn, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.conjugate(), "Array | Matrix": e.referToSelf((n) => (u) => Pr(u, n)) });
}), cn = "im", Bo = ["typed"], xo = G(cn, Bo, (r) => {
  var { typed: e } = r;
  return e(cn, { number: () => 0, "BigNumber | Fraction": (n) => n.mul(0), Complex: (n) => n.im, "Array | Matrix": e.referToSelf((n) => (u) => Pr(u, n)) });
}), ln = "re", So = ["typed"], Mo = G(ln, So, (r) => {
  var { typed: e } = r;
  return e(ln, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.re, "Array | Matrix": e.referToSelf((n) => (u) => Pr(u, n)) });
}), vn = "concat", No = ["typed", "matrix", "isInteger"], To = G(vn, No, (r) => {
  var { typed: e, matrix: n, isInteger: u } = r;
  return e(vn, { "...Array | Matrix | number | BigNumber": function(a) {
    var s, D = a.length, l = -1, f, o = false, c = [];
    for (s = 0; s < D; s++) {
      var p = a[s];
      if (mr(p) && (o = true), yr(p) || _r(p)) {
        if (s !== D - 1) throw new Error("Dimension must be specified as last argument");
        if (f = l, l = p.valueOf(), !u(l)) throw new TypeError("Integer number expected for dimension");
        if (l < 0 || s > 0 && l > f) throw new ye(l, f + 1);
      } else {
        var v = Dr(p).valueOf(), d = pr(v);
        if (c[s] = v, f = l, l = d.length - 1, s > 0 && l !== f) throw new dr(f + 1, l + 1);
      }
    }
    if (c.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var i = c.shift(); c.length; ) i = eu(i, c.shift(), l);
    return o ? n(i) : i;
  }, "...string": function(a) {
    return a.join("");
  } });
}), Dn = "column", zo = ["typed", "Index", "matrix", "range"], Oo = G(Dn, zo, (r) => {
  var { typed: e, Index: n, matrix: u, range: t } = r;
  return e(Dn, { "Matrix, number": a, "Array, number": function(D, l) {
    return a(u(Dr(D)), l).valueOf();
  } });
  function a(s, D) {
    if (s.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
    wr(D, s.size()[1]);
    var l = t(0, s.size()[0]), f = new n(l, D), o = s.subset(f);
    return mr(o) ? o : u([[o]]);
  }
}), pn = "cross", $o = ["typed", "matrix", "subtract", "multiply"], Io = G(pn, $o, (r) => {
  var { typed: e, matrix: n, subtract: u, multiply: t } = r;
  return e(pn, { "Matrix, Matrix": function(D, l) {
    return n(a(D.toArray(), l.toArray()));
  }, "Matrix, Array": function(D, l) {
    return n(a(D.toArray(), l));
  }, "Array, Matrix": function(D, l) {
    return n(a(D, l.toArray()));
  }, "Array, Array": a });
  function a(s, D) {
    var l = Math.max(pr(s).length, pr(D).length);
    s = Jt(s), D = Jt(D);
    var f = pr(s), o = pr(D);
    if (f.length !== 1 || o.length !== 1 || f[0] !== 3 || o[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + f.join(", ") + "], B = [" + o.join(", ") + "])");
    var c = [u(t(s[1], D[2]), t(s[2], D[1])), u(t(s[2], D[0]), t(s[0], D[2])), u(t(s[0], D[1]), t(s[1], D[0]))];
    return l > 1 ? [c] : c;
  }
}), dn = "diag", qo = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], Ro = G(dn, qo, (r) => {
  var { typed: e, matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(dn, { Array: function(f) {
    return a(f, 0, pr(f), null);
  }, "Array, number": function(f, o) {
    return a(f, o, pr(f), null);
  }, "Array, BigNumber": function(f, o) {
    return a(f, o.toNumber(), pr(f), null);
  }, "Array, string": function(f, o) {
    return a(f, 0, pr(f), o);
  }, "Array, number, string": function(f, o, c) {
    return a(f, o, pr(f), c);
  }, "Array, BigNumber, string": function(f, o, c) {
    return a(f, o.toNumber(), pr(f), c);
  }, Matrix: function(f) {
    return a(f, 0, f.size(), f.storage());
  }, "Matrix, number": function(f, o) {
    return a(f, o, f.size(), f.storage());
  }, "Matrix, BigNumber": function(f, o) {
    return a(f, o.toNumber(), f.size(), f.storage());
  }, "Matrix, string": function(f, o) {
    return a(f, 0, f.size(), o);
  }, "Matrix, number, string": function(f, o, c) {
    return a(f, o, f.size(), c);
  }, "Matrix, BigNumber, string": function(f, o, c) {
    return a(f, o.toNumber(), f.size(), c);
  } });
  function a(l, f, o, c) {
    if (!Ar(f)) throw new TypeError("Second parameter in function diag must be an integer");
    var p = f > 0 ? f : 0, v = f < 0 ? -f : 0;
    switch (o.length) {
      case 1:
        return s(l, f, c, o[0], v, p);
      case 2:
        return D(l, f, c, o, v, p);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function s(l, f, o, c, p, v) {
    var d = [c + p, c + v];
    if (o && o !== "sparse" && o !== "dense") throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var i = o === "sparse" ? t.diagonal(d, l, f) : u.diagonal(d, l, f);
    return o !== null ? i : i.valueOf();
  }
  function D(l, f, o, c, p, v) {
    if (mr(l)) {
      var d = l.diagonal(f);
      return o !== null ? o !== d.storage() ? n(d, o) : d : d.valueOf();
    }
    for (var i = Math.min(c[0] - p, c[1] - v), h = [], m = 0; m < i; m++) h[m] = l[m + p][m + v];
    return o !== null ? n(h) : h;
  }
}), hn = "flatten", Uo = ["typed"], Po = G(hn, Uo, (r) => {
  var { typed: e } = r;
  return e(hn, { Array: function(u) {
    return gt(u);
  }, Matrix: function(u) {
    return u.create(gt(u.valueOf(), true), u.datatype());
  } });
}), mn = "getMatrixDataType", Lo = ["typed"], Qo = G(mn, Lo, (r) => {
  var { typed: e } = r;
  return e(mn, { Array: function(u) {
    return at(u, Yr);
  }, Matrix: function(u) {
    return u.getDataType();
  } });
}), gn = "identity", Vo = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Zo = G(gn, Vo, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t, DenseMatrix: a, SparseMatrix: s } = r;
  return e(gn, { "": function() {
    return n.matrix === "Matrix" ? u([]) : [];
  }, string: function(o) {
    return u(o);
  }, "number | BigNumber": function(o) {
    return l(o, o, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(o, c) {
    return l(o, o, c);
  }, "number | BigNumber, number | BigNumber": function(o, c) {
    return l(o, c, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(o, c, p) {
    return l(o, c, p);
  }, Array: function(o) {
    return D(o);
  }, "Array, string": function(o, c) {
    return D(o, c);
  }, Matrix: function(o) {
    return D(o.valueOf(), o.storage());
  }, "Matrix, string": function(o, c) {
    return D(o.valueOf(), c);
  } });
  function D(f, o) {
    switch (f.length) {
      case 0:
        return o ? u(o) : [];
      case 1:
        return l(f[0], f[0], o);
      case 2:
        return l(f[0], f[1], o);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function l(f, o, c) {
    var p = _r(f) || _r(o) ? t : null;
    if (_r(f) && (f = f.toNumber()), _r(o) && (o = o.toNumber()), !Ar(f) || f < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!Ar(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
    var v = p ? new t(1) : 1, d = p ? new p(0) : 0, i = [f, o];
    if (c) {
      if (c === "sparse") return s.diagonal(i, v, 0, d);
      if (c === "dense") return a.diagonal(i, v, 0, d);
      throw new TypeError('Unknown matrix type "'.concat(c, '"'));
    }
    for (var h = Ye([], i, d), m = f < o ? f : o, C = 0; C < m; C++) h[C][C] = v;
    return h;
  }
}), yn = "kron", Xo = ["typed", "matrix", "multiplyScalar"], Wo = G(yn, Xo, (r) => {
  var { typed: e, matrix: n, multiplyScalar: u } = r;
  return e(yn, { "Matrix, Matrix": function(s, D) {
    return n(t(s.toArray(), D.toArray()));
  }, "Matrix, Array": function(s, D) {
    return n(t(s.toArray(), D));
  }, "Array, Matrix": function(s, D) {
    return n(t(s, D.toArray()));
  }, "Array, Array": t });
  function t(a, s) {
    if (pr(a).length === 1 && (a = [a]), pr(s).length === 1 && (s = [s]), pr(a).length > 2 || pr(s).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(a.length) + ", y = " + JSON.stringify(s.length) + ")");
    var D = [], l = [];
    return a.map(function(f) {
      return s.map(function(o) {
        return l = [], D.push(l), f.map(function(c) {
          return o.map(function(p) {
            return l.push(u(c, p));
          });
        });
      });
    }) && D;
  }
});
function du() {
  throw new Error('No "bignumber" implementation available');
}
function Jo() {
  throw new Error('No "fraction" implementation available');
}
function hu() {
  throw new Error('No "matrix" implementation available');
}
var An = "range", Yo = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], Go = G(An, Yo, (r) => {
  var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: s, larger: D, largerEq: l, add: f, isPositive: o } = r;
  return e(An, { string: p, "string, boolean": p, number: function(h) {
    throw new TypeError("Too few arguments to function range(): ".concat(h));
  }, boolean: function(h) {
    throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(h, ", number|bigint|BigNumber|Fraction"));
  }, "number, number": function(h, m) {
    return c(v(h, m, 1, false));
  }, "number, number, number": function(h, m, C) {
    return c(v(h, m, C, false));
  }, "number, number, boolean": function(h, m, C) {
    return c(v(h, m, 1, C));
  }, "number, number, number, boolean": function(h, m, C, A) {
    return c(v(h, m, C, A));
  }, "bigint, bigint|number": function(h, m) {
    return c(v(h, m, 1n, false));
  }, "number, bigint": function(h, m) {
    return c(v(BigInt(h), m, 1n, false));
  }, "bigint, bigint|number, bigint|number": function(h, m, C) {
    return c(v(h, m, BigInt(C), false));
  }, "number, bigint, bigint|number": function(h, m, C) {
    return c(v(BigInt(h), m, BigInt(C), false));
  }, "bigint, bigint|number, boolean": function(h, m, C) {
    return c(v(h, m, 1n, C));
  }, "number, bigint, boolean": function(h, m, C) {
    return c(v(BigInt(h), m, 1n, C));
  }, "bigint, bigint|number, bigint|number, boolean": function(h, m, C, A) {
    return c(v(h, m, BigInt(C), A));
  }, "number, bigint, bigint|number, boolean": function(h, m, C, A) {
    return c(v(BigInt(h), m, BigInt(C), A));
  }, "BigNumber, BigNumber": function(h, m) {
    var C = h.constructor;
    return c(v(h, m, new C(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(h, m, C) {
    return c(v(h, m, C, false));
  }, "BigNumber, BigNumber, boolean": function(h, m, C) {
    var A = h.constructor;
    return c(v(h, m, new A(1), C));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(h, m, C, A) {
    return c(v(h, m, C, A));
  }, "Fraction, Fraction": function(h, m) {
    return c(v(h, m, 1, false));
  }, "Fraction, Fraction, Fraction": function(h, m, C) {
    return c(v(h, m, C, false));
  }, "Fraction, Fraction, boolean": function(h, m, C) {
    return c(v(h, m, 1, C));
  }, "Fraction, Fraction, Fraction, boolean": function(h, m, C, A) {
    return c(v(h, m, C, A));
  }, "Unit, Unit, Unit": function(h, m, C) {
    return c(v(h, m, C, false));
  }, "Unit, Unit, Unit, boolean": function(h, m, C, A) {
    return c(v(h, m, C, A));
  } });
  function c(i) {
    return n.matrix === "Matrix" ? u ? u(i) : hu() : i;
  }
  function p(i, h) {
    var m = d(i);
    if (!m) throw new SyntaxError('String "' + i + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && du(), c(v(t(m.start), t(m.end), t(m.step)))) : c(v(m.start, m.end, m.step, h));
  }
  function v(i, h, m, C) {
    for (var A = [], w = o(m) ? C ? s : a : C ? l : D, y = i; w(y, h); ) A.push(y), y = f(y, m);
    return A;
  }
  function d(i) {
    var h = i.split(":"), m = h.map(function(A) {
      return Number(A);
    }), C = m.some(function(A) {
      return isNaN(A);
    });
    if (C) return null;
    switch (m.length) {
      case 2:
        return { start: m[0], end: m[1], step: 1 };
      case 3:
        return { start: m[0], end: m[2], step: m[1] };
      default:
        return null;
    }
  }
}), Fn = "reshape", Ko = ["typed", "isInteger", "matrix"], Ho = G(Fn, Ko, (r) => {
  var { typed: e, isInteger: n } = r;
  return e(Fn, { "Matrix, Array": function(t, a) {
    return t.reshape(a, true);
  }, "Array, Array": function(t, a) {
    return a.forEach(function(s) {
      if (!n(s)) throw new TypeError("Invalid size for dimension: " + s);
    }), _t(t, a);
  } });
}), En = "size", ko = ["typed", "config", "?matrix"], jo = G(En, ko, (r) => {
  var { typed: e, config: n, matrix: u } = r;
  return e(En, { Matrix: function(a) {
    return a.create(a.size(), "number");
  }, Array: pr, string: function(a) {
    return n.matrix === "Array" ? [a.length] : u([a.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(a) {
    return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : hu();
  } });
}), Cn = "transpose", rs = ["typed", "matrix"], es = G(Cn, rs, (r) => {
  var { typed: e, matrix: n } = r;
  return e(Cn, { Array: (s) => u(n(s)).valueOf(), Matrix: u, any: Dr });
  function u(s) {
    var D = s.size(), l;
    switch (D.length) {
      case 1:
        l = s.clone();
        break;
      case 2:
        {
          var f = D[0], o = D[1];
          if (o === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Fr(D) + ")");
          switch (s.storage()) {
            case "dense":
              l = t(s, f, o);
              break;
            case "sparse":
              l = a(s, f, o);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Fr(D) + ")");
    }
    return l;
  }
  function t(s, D, l) {
    for (var f = s._data, o = [], c, p = 0; p < l; p++) {
      c = o[p] = [];
      for (var v = 0; v < D; v++) c[v] = Dr(f[v][p]);
    }
    return s.createDenseMatrix({ data: o, size: [l, D], datatype: s._datatype });
  }
  function a(s, D, l) {
    for (var f = s._values, o = s._index, c = s._ptr, p = f ? [] : void 0, v = [], d = [], i = [], h = 0; h < D; h++) i[h] = 0;
    var m, C, A;
    for (m = 0, C = o.length; m < C; m++) i[o[m]]++;
    for (var w = 0, y = 0; y < D; y++) d.push(w), w += i[y], i[y] = d[y];
    for (d.push(w), A = 0; A < l; A++) for (var F = c[A], b = c[A + 1], E = F; E < b; E++) {
      var g = i[o[E]]++;
      v[g] = A, f && (p[g] = Dr(f[E]));
    }
    return s.createSparseMatrix({ values: p, index: v, ptr: d, size: [l, D], datatype: s._datatype });
  }
}), bn = "ctranspose", ts = ["typed", "transpose", "conj"], ns = G(bn, ts, (r) => {
  var { typed: e, transpose: n, conj: u } = r;
  return e(bn, { any: function(a) {
    return u(n(a));
  } });
}), wn = "zeros", us = ["typed", "config", "matrix", "BigNumber"], as = G(wn, us, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t } = r;
  return e(wn, { "": function() {
    return n.matrix === "Array" ? a([]) : a([], "default");
  }, "...number | BigNumber | string": function(f) {
    var o = f[f.length - 1];
    if (typeof o == "string") {
      var c = f.pop();
      return a(f, c);
    } else return n.matrix === "Array" ? a(f) : a(f, "default");
  }, Array: a, Matrix: function(f) {
    var o = f.storage();
    return a(f.valueOf(), o);
  }, "Array | Matrix, string": function(f, o) {
    return a(f.valueOf(), o);
  } });
  function a(l, f) {
    var o = s(l), c = o ? new t(0) : 0;
    if (D(l), f) {
      var p = u(f);
      return l.length > 0 ? p.resize(l, c) : p;
    } else {
      var v = [];
      return l.length > 0 ? Ye(v, l, c) : v;
    }
  }
  function s(l) {
    var f = false;
    return l.forEach(function(o, c, p) {
      _r(o) && (f = true, p[c] = o.toNumber());
    }), f;
  }
  function D(l) {
    l.forEach(function(f) {
      if (typeof f != "number" || !Ar(f) || f < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), is = "numeric", os = ["number", "?bignumber", "?fraction"], ss = G(is, os, (r) => {
  var { number: e, bignumber: n, fraction: u } = r, t = { string: true, number: true, BigNumber: true, Fraction: true }, a = { number: (s) => e(s), BigNumber: n ? (s) => n(s) : du, bigint: (s) => BigInt(s), Fraction: u ? (s) => u(s) : Jo };
  return function(D) {
    var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", f = arguments.length > 2 ? arguments[2] : void 0;
    if (f !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var o = Yr(D);
    if (!(o in t)) throw new TypeError("Cannot convert " + D + ' of type "' + o + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(l in a)) throw new TypeError("Cannot convert " + D + ' to type "' + l + '"; valid output types are ' + Object.keys(a).join(", "));
    return l === o ? D : a[l](D);
  };
}), _n = "divideScalar", fs = ["typed", "numeric"], cs = G(_n, fs, (r) => {
  var { typed: e, numeric: n } = r;
  return e(_n, { "number, number": function(t, a) {
    return t / a;
  }, "Complex, Complex": function(t, a) {
    return t.div(a);
  }, "BigNumber, BigNumber": function(t, a) {
    return t.div(a);
  }, "bigint, bigint": function(t, a) {
    return t / a;
  }, "Fraction, Fraction": function(t, a) {
    return t.div(a);
  }, "Unit, number | Complex | Fraction | BigNumber | Unit": (u, t) => u.divide(t), "number | Fraction | Complex | BigNumber, Unit": (u, t) => t.divideInto(u) });
}), Bn = "pow", ls = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], vs = G(Bn, ls, (r) => {
  var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: s, number: D, fraction: l, Complex: f } = r;
  return e(Bn, { "number, number": o, "Complex, Complex": function(d, i) {
    return d.pow(i);
  }, "BigNumber, BigNumber": function(d, i) {
    return i.isInteger() || d >= 0 || n.predictable ? d.pow(i) : new f(d.toNumber(), 0).pow(i.toNumber(), 0);
  }, "bigint, bigint": (v, d) => v ** d, "Fraction, Fraction": function(d, i) {
    var h = d.pow(i);
    if (h != null) return h;
    if (n.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return o(d.valueOf(), i.valueOf());
  }, "Array, number": c, "Array, BigNumber": function(d, i) {
    return c(d, i.toNumber());
  }, "Matrix, number": p, "Matrix, BigNumber": function(d, i) {
    return p(d, i.toNumber());
  }, "Unit, number | BigNumber": function(d, i) {
    return d.pow(i);
  } });
  function o(v, d) {
    if (n.predictable && !Ar(d) && v < 0) try {
      var i = l(d), h = D(i);
      if ((d === h || Math.abs((d - h) / d) < 1e-14) && i.d % 2n === 1n) return (i.n % 2n === 0n ? 1 : -1) * Math.pow(-v, d);
    } catch {
    }
    return n.predictable && (v < -1 && d === 1 / 0 || v > -1 && v < 0 && d === -1 / 0) ? NaN : Ar(d) || v >= 0 || n.predictable ? cu(v, d) : v * v < 1 && d === 1 / 0 || v * v > 1 && d === -1 / 0 ? 0 : new f(v, 0).pow(d, 0);
  }
  function c(v, d) {
    if (!Ar(d)) throw new TypeError("For A^b, b must be an integer (value is " + d + ")");
    var i = pr(v);
    if (i.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + i.length + " dimensions)");
    if (i[0] !== i[1]) throw new Error("For A^b, A must be square (size is " + i[0] + "x" + i[1] + ")");
    if (d < 0) try {
      return c(s(v), -d);
    } catch (C) {
      throw C.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + d + ")") : C;
    }
    for (var h = u(i[0]).valueOf(), m = v; d >= 1; ) (d & 1) === 1 && (h = t(m, h)), d >>= 1, m = t(m, m);
    return h;
  }
  function p(v, d) {
    return a(c(v.valueOf(), d));
  }
});
function mu(r) {
  var { DenseMatrix: e } = r;
  return function(u, t, a) {
    var s = u.size();
    if (s.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + Fr(s) + ")");
    var D = s[0], l = s[1];
    if (D !== l) throw new RangeError("Matrix must be square (size: " + Fr(s) + ")");
    var f = [];
    if (mr(t)) {
      var o = t.size(), c = t._data;
      if (o.length === 1) {
        if (o[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var p = 0; p < D; p++) f[p] = [c[p]];
        return new e({ data: f, size: [D, 1], datatype: t._datatype });
      }
      if (o.length === 2) {
        if (o[0] !== D || o[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (Qn(t)) {
          if (a) {
            f = [];
            for (var v = 0; v < D; v++) f[v] = [c[v][0]];
            return new e({ data: f, size: [D, 1], datatype: t._datatype });
          }
          return t;
        }
        if (Vn(t)) {
          for (var d = 0; d < D; d++) f[d] = [0];
          for (var i = t._values, h = t._index, m = t._ptr, C = m[1], A = m[0]; A < C; A++) {
            var w = h[A];
            f[w][0] = i[A];
          }
          return new e({ data: f, size: [D, 1], datatype: t._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Cr(t)) {
      var y = pr(t);
      if (y.length === 1) {
        if (y[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var F = 0; F < D; F++) f[F] = [t[F]];
        return new e({ data: f, size: [D, 1] });
      }
      if (y.length === 2) {
        if (y[0] !== D || y[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var b = 0; b < D; b++) f[b] = [t[b][0]];
        return new e({ data: f, size: [D, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var xn = "usolve", Ds = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], ps = G(xn, Ds, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, l = mu({ DenseMatrix: D });
  return e(xn, { "SparseMatrix, Array | Matrix": function(p, v) {
    return o(p, v);
  }, "DenseMatrix, Array | Matrix": function(p, v) {
    return f(p, v);
  }, "Array, Array | Matrix": function(p, v) {
    var d = n(p), i = f(d, v);
    return i.valueOf();
  } });
  function f(c, p) {
    p = l(c, p, true);
    for (var v = p._data, d = c._size[0], i = c._size[1], h = [], m = c._data, C = i - 1; C >= 0; C--) {
      var A = v[C][0] || 0, w = void 0;
      if (s(A, 0)) w = 0;
      else {
        var y = m[C][C];
        if (s(y, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        w = u(A, y);
        for (var F = C - 1; F >= 0; F--) v[F] = [a(v[F][0] || 0, t(w, m[F][C]))];
      }
      h[C] = [w];
    }
    return new D({ data: h, size: [d, 1] });
  }
  function o(c, p) {
    p = l(c, p, true);
    for (var v = p._data, d = c._size[0], i = c._size[1], h = c._values, m = c._index, C = c._ptr, A = [], w = i - 1; w >= 0; w--) {
      var y = v[w][0] || 0;
      if (s(y, 0)) A[w] = [0];
      else {
        for (var F = 0, b = [], E = [], g = C[w], B = C[w + 1], _ = B - 1; _ >= g; _--) {
          var x = m[_];
          x === w ? F = h[_] : x < w && (b.push(h[_]), E.push(x));
        }
        if (s(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = u(y, F), S = 0, U = E.length; S < U; S++) {
          var z = E[S];
          v[z] = [a(v[z][0], t(O, b[S]))];
        }
        A[w] = [O];
      }
    }
    return new D({ data: A, size: [d, 1] });
  }
}), Sn = "usolveAll", ds = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], hs = G(Sn, ds, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, l = mu({ DenseMatrix: D });
  return e(Sn, { "SparseMatrix, Array | Matrix": function(p, v) {
    return o(p, v);
  }, "DenseMatrix, Array | Matrix": function(p, v) {
    return f(p, v);
  }, "Array, Array | Matrix": function(p, v) {
    var d = n(p), i = f(d, v);
    return i.map((h) => h.valueOf());
  } });
  function f(c, p) {
    for (var v = [l(c, p, true)._data.map((E) => E[0])], d = c._data, i = c._size[0], h = c._size[1], m = h - 1; m >= 0; m--) for (var C = v.length, A = 0; A < C; A++) {
      var w = v[A];
      if (s(d[m][m], 0)) if (s(w[m], 0)) {
        if (A === 0) {
          var F = [...w];
          F[m] = 1;
          for (var b = m - 1; b >= 0; b--) F[b] = a(F[b], d[b][m]);
          v.push(F);
        }
      } else {
        if (A === 0) return [];
        v.splice(A, 1), A -= 1, C -= 1;
      }
      else {
        w[m] = u(w[m], d[m][m]);
        for (var y = m - 1; y >= 0; y--) w[y] = a(w[y], t(w[m], d[y][m]));
      }
    }
    return v.map((E) => new D({ data: E.map((g) => [g]), size: [i, 1] }));
  }
  function o(c, p) {
    for (var v = [l(c, p, true)._data.map(($) => $[0])], d = c._size[0], i = c._size[1], h = c._values, m = c._index, C = c._ptr, A = i - 1; A >= 0; A--) for (var w = v.length, y = 0; y < w; y++) {
      for (var F = v[y], b = [], E = [], g = C[A], B = C[A + 1], _ = 0, x = B - 1; x >= g; x--) {
        var O = m[x];
        O === A ? _ = h[x] : O < A && (b.push(h[x]), E.push(O));
      }
      if (s(_, 0)) if (s(F[A], 0)) {
        if (y === 0) {
          var X = [...F];
          X[A] = 1;
          for (var R = 0, V = E.length; R < V; R++) {
            var I = E[R];
            X[I] = a(X[I], b[R]);
          }
          v.push(X);
        }
      } else {
        if (y === 0) return [];
        v.splice(y, 1), y -= 1, w -= 1;
      }
      else {
        F[A] = u(F[A], _);
        for (var S = 0, U = E.length; S < U; S++) {
          var z = E[S];
          F[z] = a(F[z], t(F[A], b[S]));
        }
      }
    }
    return v.map(($) => new D({ data: $.map((M) => [M]), size: [d, 1] }));
  }
}), He = "equal", ms = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat", "SparseMatrix"], gs = G(He, ms, (r) => {
  var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = xe({ typed: e }), l = Ie({ typed: e, SparseMatrix: s }), f = Be({ typed: e, DenseMatrix: t }), o = Ae({ typed: e, matrix: n, concat: a });
  return e(He, ys({ typed: e, equalScalar: u }), o({ elop: u, SS: l, DS: D, Ss: f }));
}), ys = G(He, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(He, { "any, any": function(t, a) {
    return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
  } });
}), ke = "smaller", As = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Fs = G(ke, As, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, l = xe({ typed: e }), f = Ie({ typed: e, SparseMatrix: D }), o = Be({ typed: e, DenseMatrix: a }), c = Ae({ typed: e, matrix: t, concat: s }), p = $e({ typed: e });
  function v(d, i) {
    return d.lt(i) && !_e(d, i, n.relTol, n.absTol);
  }
  return e(ke, Es({ typed: e, config: n }), { "boolean, boolean": (d, i) => d < i, "BigNumber, BigNumber": v, "bigint, bigint": (d, i) => d < i, "Fraction, Fraction": (d, i) => d.compare(i) === -1, "Fraction, BigNumber": function(i, h) {
    return v(u(i), h);
  }, "BigNumber, Fraction": function(i, h) {
    return v(i, u(h));
  }, "Complex, Complex": function(i, h) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, p, c({ SS: f, DS: l, Ss: o }));
}), Es = G(ke, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(ke, { "number, number": function(t, a) {
    return t < a && !oe(t, a, n.relTol, n.absTol);
  } });
}), je = "smallerEq", Cs = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], bs = G(je, Cs, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = xe({ typed: e }), l = Ie({ typed: e, SparseMatrix: s }), f = Be({ typed: e, DenseMatrix: t }), o = Ae({ typed: e, matrix: u, concat: a }), c = $e({ typed: e });
  return e(je, ws({ typed: e, config: n }), { "boolean, boolean": (p, v) => p <= v, "BigNumber, BigNumber": function(v, d) {
    return v.lte(d) || _e(v, d, n.relTol, n.absTol);
  }, "bigint, bigint": (p, v) => p <= v, "Fraction, Fraction": (p, v) => p.compare(v) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, c, o({ SS: l, DS: D, Ss: f }));
}), ws = G(je, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(je, { "number, number": function(t, a) {
    return t <= a || oe(t, a, n.relTol, n.absTol);
  } });
}), rt = "larger", _s = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Bs = G(rt, _s, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, l = xe({ typed: e }), f = Ie({ typed: e, SparseMatrix: D }), o = Be({ typed: e, DenseMatrix: a }), c = Ae({ typed: e, matrix: t, concat: s }), p = $e({ typed: e });
  function v(d, i) {
    return d.gt(i) && !_e(d, i, n.relTol, n.absTol);
  }
  return e(rt, xs({ typed: e, config: n }), { "boolean, boolean": (d, i) => d > i, "BigNumber, BigNumber": v, "bigint, bigint": (d, i) => d > i, "Fraction, Fraction": (d, i) => d.compare(i) === 1, "Fraction, BigNumber": function(i, h) {
    return v(u(i), h);
  }, "BigNumber, Fraction": function(i, h) {
    return v(i, u(h));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, p, c({ SS: f, DS: l, Ss: o }));
}), xs = G(rt, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(rt, { "number, number": function(t, a) {
    return t > a && !oe(t, a, n.relTol, n.absTol);
  } });
}), et = "largerEq", Ss = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Ms = G(et, Ss, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = xe({ typed: e }), l = Ie({ typed: e, SparseMatrix: s }), f = Be({ typed: e, DenseMatrix: t }), o = Ae({ typed: e, matrix: u, concat: a }), c = $e({ typed: e });
  return e(et, Ns({ typed: e, config: n }), { "boolean, boolean": (p, v) => p >= v, "BigNumber, BigNumber": function(v, d) {
    return v.gte(d) || _e(v, d, n.relTol, n.absTol);
  }, "bigint, bigint": function(v, d) {
    return v >= d;
  }, "Fraction, Fraction": (p, v) => p.compare(v) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, c, o({ SS: l, DS: D, Ss: f }));
}), Ns = G(et, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(et, { "number, number": function(t, a) {
    return t >= a || oe(t, a, n.relTol, n.absTol);
  } });
}), Ts = "ImmutableDenseMatrix", zs = ["smaller", "DenseMatrix"], Os = G(Ts, zs, (r) => {
  var { smaller: e, DenseMatrix: n } = r;
  function u(t, a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !Jr(a)) throw new Error("Invalid datatype: " + a);
    if (mr(t) || Cr(t)) {
      var s = new n(t, a);
      this._data = s._data, this._size = s._size, this._datatype = s._datatype, this._min = null, this._max = null;
    } else if (t && Cr(t.data) && Cr(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t) throw new TypeError("Unsupported type of data (" + Yr(t) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return u.prototype = new n(), u.prototype.type = "ImmutableDenseMatrix", u.prototype.isImmutableDenseMatrix = true, u.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var a = n.prototype.subset.call(this, t);
        return mr(a) ? new u({ data: a._data, size: a._size, datatype: a._datatype }) : a;
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
    return new u({ data: Dr(this._data), size: Dr(this._size), datatype: this._datatype });
  }, u.prototype.toJSON = function() {
    return { mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
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
}, { isClass: true }), $s = "Index", Is = ["ImmutableDenseMatrix", "getMatrixDataType"], qs = G($s, Is, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
  function u(a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var s = 0, D = arguments.length; s < D; s++) {
      var l = arguments[s], f = Cr(l), o = mr(l), c = typeof l, p = null;
      if (Zn(l)) this._dimensions.push(l), this._isScalar = false;
      else if (f || o) {
        var v = void 0;
        n(l) === "boolean" ? (f && (v = t(Mn(l).valueOf())), o && (v = t(Mn(l._data).valueOf())), p = l.valueOf().length) : v = t(l.valueOf()), this._dimensions.push(v);
        var d = v.size();
        (d.length !== 1 || d[0] !== 1 || p !== null) && (this._isScalar = false);
      } else if (c === "number") this._dimensions.push(t([l]));
      else if (c === "bigint") this._dimensions.push(t([Number(l)]));
      else if (c === "string") this._dimensions.push(l);
      else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
      this._sourceSize.push(p);
    }
  }
  u.prototype.type = "Index", u.prototype.isIndex = true;
  function t(a) {
    for (var s = 0, D = a.length; s < D; s++) if (typeof a[s] != "number" || !Ar(a[s])) throw new TypeError("Index parameters must be positive integer numbers");
    return new e(a);
  }
  return u.prototype.clone = function() {
    var a = new u();
    return a._dimensions = Dr(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
  }, u.create = function(a) {
    var s = new u();
    return u.apply(s, a), s;
  }, u.prototype.size = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var l = this._dimensions[s];
      a[s] = typeof l == "string" ? 1 : l.size()[0];
    }
    return a;
  }, u.prototype.max = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var l = this._dimensions[s];
      a[s] = typeof l == "string" ? l : l.max();
    }
    return a;
  }, u.prototype.min = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var l = this._dimensions[s];
      a[s] = typeof l == "string" ? l : l.min();
    }
    return a;
  }, u.prototype.forEach = function(a) {
    for (var s = 0, D = this._dimensions.length; s < D; s++) a(this._dimensions[s], s, this);
  }, u.prototype.dimension = function(a) {
    return typeof a != "number" ? null : this._dimensions[a] || null;
  }, u.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, u.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, u.prototype.isScalar = function() {
    return this._isScalar;
  }, u.prototype.toArray = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var l = this._dimensions[s];
      a.push(typeof l == "string" ? l : l.toArray());
    }
    return a;
  }, u.prototype.valueOf = u.prototype.toArray, u.prototype.toString = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var l = this._dimensions[s];
      typeof l == "string" ? a.push(JSON.stringify(l)) : a.push(l.toString());
    }
    return "[" + a.join(", ") + "]";
  }, u.prototype.toJSON = function() {
    return { mathjs: "Index", dimensions: this._dimensions };
  }, u.fromJSON = function(a) {
    return u.create(a.dimensions);
  }, u;
}, { isClass: true });
function Mn(r) {
  var e = [];
  return r.forEach((n, u) => {
    n && e.push(u);
  }), e;
}
var Rs = "atan", Us = ["typed"], Ps = G(Rs, Us, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(u) {
    return Math.atan(u);
  }, Complex: function(u) {
    return u.atan();
  }, BigNumber: function(u) {
    return u.atan();
  } });
}), gu = G("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((n) => (u) => {
    if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(n, u.valueType())(u.value);
  }) };
}), Nn = "cos", Ls = ["typed"], Qs = G(Nn, Ls, (r) => {
  var { typed: e } = r, n = gu({ typed: e });
  return e(Nn, { number: Math.cos, "Complex | BigNumber": (u) => u.cos() }, n);
}), Tn = "sin", Vs = ["typed"], Zs = G(Tn, Vs, (r) => {
  var { typed: e } = r, n = gu({ typed: e });
  return e(Tn, { number: Math.sin, "Complex | BigNumber": (u) => u.sin() }, n);
}), zn = "add", Xs = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], Ws = G(zn, Xs, (r) => {
  var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: s, concat: D } = r, l = Du({ typed: e }), f = oo({ typed: e, equalScalar: t }), o = pu({ typed: e, DenseMatrix: a }), c = Ae({ typed: e, matrix: n, concat: D });
  return e(zn, { "any, any": u, "any, any, ...any": e.referToSelf((p) => (v, d, i) => {
    for (var h = p(v, d), m = 0; m < i.length; m++) h = p(h, i[m]);
    return h;
  }) }, c({ elop: u, DS: l, SS: f, Ss: o }));
}), On = "norm", Js = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], Ys = G(On, Js, (r) => {
  var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: s, multiply: D, equalScalar: l, larger: f, smaller: o, matrix: c, ctranspose: p, eigs: v } = r;
  return e(On, { number: Math.abs, Complex: function(E) {
    return E.abs();
  }, BigNumber: function(E) {
    return E.abs();
  }, boolean: function(E) {
    return Math.abs(E);
  }, Array: function(E) {
    return F(c(E), 2);
  }, Matrix: function(E) {
    return F(E, 2);
  }, "Array, number | BigNumber | string": function(E, g) {
    return F(c(E), g);
  }, "Matrix, number | BigNumber | string": function(E, g) {
    return F(E, g);
  } });
  function d(b) {
    var E = 0;
    return b.forEach(function(g) {
      var B = n(g);
      f(B, E) && (E = B);
    }, true), E;
  }
  function i(b) {
    var E;
    return b.forEach(function(g) {
      var B = n(g);
      (!E || o(B, E)) && (E = B);
    }, true), E || 0;
  }
  function h(b, E) {
    if (E === Number.POSITIVE_INFINITY || E === "inf") return d(b);
    if (E === Number.NEGATIVE_INFINITY || E === "-inf") return i(b);
    if (E === "fro") return F(b, 2);
    if (typeof E == "number" && !isNaN(E)) {
      if (!l(E, 0)) {
        var g = 0;
        return b.forEach(function(B) {
          g = u(t(n(B), E), g);
        }, true), t(g, 1 / E);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function m(b) {
    var E = 0;
    return b.forEach(function(g, B) {
      E = u(E, D(g, a(g)));
    }), n(s(E));
  }
  function C(b) {
    var E = [], g = 0;
    return b.forEach(function(B, _) {
      var x = _[1], O = u(E[x] || 0, n(B));
      f(O, g) && (g = O), E[x] = O;
    }, true), g;
  }
  function A(b) {
    var E = b.size();
    if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
    var g = p(b), B = D(g, b), _ = v(B).values.toArray(), x = _[_.length - 1];
    return n(s(x));
  }
  function w(b) {
    var E = [], g = 0;
    return b.forEach(function(B, _) {
      var x = _[0], O = u(E[x] || 0, n(B));
      f(O, g) && (g = O), E[x] = O;
    }, true), g;
  }
  function y(b, E) {
    if (E === 1) return C(b);
    if (E === Number.POSITIVE_INFINITY || E === "inf") return w(b);
    if (E === "fro") return m(b);
    if (E === 2) return A(b);
    throw new Error("Unsupported parameter value " + E);
  }
  function F(b, E) {
    var g = b.size();
    if (g.length === 1) return h(b, E);
    if (g.length === 2) {
      if (g[0] && g[1]) return y(b, E);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), $n = "dot", Gs = ["typed", "addScalar", "multiplyScalar", "conj", "size"], Ks = G($n, Gs, (r) => {
  var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
  return e($n, { "Array | DenseMatrix, Array | DenseMatrix": D, "SparseMatrix, SparseMatrix": l });
  function s(o, c) {
    var p = f(o), v = f(c), d, i;
    if (p.length === 1) d = p[0];
    else if (p.length === 2 && p[1] === 1) d = p[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
    if (v.length === 1) i = v[0];
    else if (v.length === 2 && v[1] === 1) i = v[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
    if (d !== i) throw new RangeError("Vectors must have equal length (" + d + " != " + i + ")");
    if (d === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return d;
  }
  function D(o, c) {
    var p = s(o, c), v = mr(o) ? o._data : o, d = mr(o) ? o._datatype || o.getDataType() : void 0, i = mr(c) ? c._data : c, h = mr(c) ? c._datatype || c.getDataType() : void 0, m = f(o).length === 2, C = f(c).length === 2, A = n, w = u;
    if (d && h && d === h && typeof d == "string" && d !== "mixed") {
      var y = d;
      A = e.find(n, [y, y]), w = e.find(u, [y, y]);
    }
    if (!m && !C) {
      for (var F = w(t(v[0]), i[0]), b = 1; b < p; b++) F = A(F, w(t(v[b]), i[b]));
      return F;
    }
    if (!m && C) {
      for (var E = w(t(v[0]), i[0][0]), g = 1; g < p; g++) E = A(E, w(t(v[g]), i[g][0]));
      return E;
    }
    if (m && !C) {
      for (var B = w(t(v[0][0]), i[0]), _ = 1; _ < p; _++) B = A(B, w(t(v[_][0]), i[_]));
      return B;
    }
    if (m && C) {
      for (var x = w(t(v[0][0]), i[0][0]), O = 1; O < p; O++) x = A(x, w(t(v[O][0]), i[O][0]));
      return x;
    }
  }
  function l(o, c) {
    s(o, c);
    for (var p = o._index, v = o._values, d = c._index, i = c._values, h = 0, m = n, C = u, A = 0, w = 0; A < p.length && w < d.length; ) {
      var y = p[A], F = d[w];
      if (y < F) {
        A++;
        continue;
      }
      if (y > F) {
        w++;
        continue;
      }
      y === F && (h = m(h, C(v[A], i[w])), A++, w++);
    }
    return h;
  }
  function f(o) {
    return mr(o) ? o.size() : a(o);
  }
}), In = "qr", Hs = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], ks = G(In, Hs, (r) => {
  var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: s, sign: D, sqrt: l, conj: f, unaryMinus: o, addScalar: c, divideScalar: p, multiplyScalar: v, subtractScalar: d, complex: i } = r;
  return tt(e(In, { DenseMatrix: function(w) {
    return m(w);
  }, SparseMatrix: function(w) {
    return C();
  }, Array: function(w) {
    var y = n(w), F = m(y);
    return { Q: F.Q.valueOf(), R: F.R.valueOf() };
  } }), { _denseQRimpl: h });
  function h(A) {
    var w = A._size[0], y = A._size[1], F = t([w], "dense"), b = F._data, E = A.clone(), g = E._data, B, _, x, O = u([w], "");
    for (x = 0; x < Math.min(y, w); ++x) {
      var S = g[x][x], U = o(s(S, 0) ? 1 : D(S)), z = f(U), X = 0;
      for (B = x; B < w; B++) X = c(X, v(g[B][x], f(g[B][x])));
      var R = v(U, l(X));
      if (!a(R)) {
        var V = d(S, R);
        for (O[x] = 1, B = x + 1; B < w; B++) O[B] = p(g[B][x], V);
        var I = o(f(p(V, R))), $ = void 0;
        for (_ = x; _ < y; _++) {
          for ($ = 0, B = x; B < w; B++) $ = c($, v(f(O[B]), g[B][_]));
          for ($ = v($, I), B = x; B < w; B++) g[B][_] = v(d(g[B][_], v(O[B], $)), z);
        }
        for (B = 0; B < w; B++) {
          for ($ = 0, _ = x; _ < w; _++) $ = c($, v(b[B][_], O[_]));
          for ($ = v($, I), _ = x; _ < w; ++_) b[B][_] = p(d(b[B][_], v($, f(O[_]))), z);
        }
      }
    }
    return { Q: F, R: E, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function m(A) {
    var w = h(A), y = w.R._data;
    if (A._data.length > 0) for (var F = y[0][0].type === "Complex" ? i(0) : 0, b = 0; b < y.length; ++b) for (var E = 0; E < b && E < (y[0] || []).length; ++E) y[b][E] = F;
    return w;
  }
  function C(A) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
}), qn = "det", js = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], rf = G(qn, js, (r) => {
  var { typed: e, matrix: n, subtractScalar: u, multiply: t, divideScalar: a, isZero: s, unaryMinus: D } = r;
  return e(qn, { any: function(o) {
    return Dr(o);
  }, "Array | Matrix": function(o) {
    var c;
    switch (mr(o) ? c = o.size() : Array.isArray(o) ? (o = n(o), c = o.size()) : c = [], c.length) {
      case 0:
        return Dr(o);
      case 1:
        if (c[0] === 1) return Dr(o.valueOf()[0]);
        if (c[0] === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + Fr(c) + ")");
      case 2: {
        var p = c[0], v = c[1];
        if (p === v) return l(o.clone().valueOf(), p);
        if (v === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + Fr(c) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Fr(c) + ")");
    }
  } });
  function l(f, o, c) {
    if (o === 1) return Dr(f[0][0]);
    if (o === 2) return u(t(f[0][0], f[1][1]), t(f[1][0], f[0][1]));
    for (var p = false, v = new Array(o).fill(0).map((b, E) => E), d = 0; d < o; d++) {
      var i = v[d];
      if (s(f[i][d])) {
        var h = void 0;
        for (h = d + 1; h < o; h++) if (!s(f[v[h]][d])) {
          i = v[h], v[h] = v[d], v[d] = i, p = !p;
          break;
        }
        if (h === o) return f[i][d];
      }
      for (var m = f[i][d], C = d === 0 ? 1 : f[v[d - 1]][d - 1], A = d + 1; A < o; A++) for (var w = v[A], y = d + 1; y < o; y++) f[w][y] = a(u(t(f[w][y], m), t(f[w][d], f[i][y])), C);
    }
    var F = f[v[o - 1]][o - 1];
    return p ? D(F) : F;
  }
}), Rn = "inv", ef = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], tf = G(Rn, ef, (r) => {
  var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: s, det: D, identity: l, abs: f } = r;
  return e(Rn, { "Array | Matrix": function(p) {
    var v = mr(p) ? p.size() : pr(p);
    switch (v.length) {
      case 1:
        if (v[0] === 1) return mr(p) ? n([u(1, p.valueOf()[0])]) : [u(1, p[0])];
        throw new RangeError("Matrix must be square (size: " + Fr(v) + ")");
      case 2: {
        var d = v[0], i = v[1];
        if (d === i) return mr(p) ? n(o(p.valueOf(), d, i), p.storage()) : o(p, d, i);
        throw new RangeError("Matrix must be square (size: " + Fr(v) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Fr(v) + ")");
    }
  }, any: function(p) {
    return u(1, p);
  } });
  function o(c, p, v) {
    var d, i, h, m, C;
    if (p === 1) {
      if (m = c[0][0], m === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(1, m)]];
    } else if (p === 2) {
      var A = D(c);
      if (A === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(c[1][1], A), u(s(c[0][1]), A)], [u(s(c[1][0]), A), u(c[0][0], A)]];
    } else {
      var w = c.concat();
      for (d = 0; d < p; d++) w[d] = w[d].concat();
      for (var y = l(p).valueOf(), F = 0; F < v; F++) {
        var b = f(w[F][F]), E = F;
        for (d = F + 1; d < p; ) f(w[d][F]) > b && (b = f(w[d][F]), E = d), d++;
        if (b === 0) throw Error("Cannot calculate inverse, determinant is zero");
        d = E, d !== F && (C = w[F], w[F] = w[d], w[d] = C, C = y[F], y[F] = y[d], y[d] = C);
        var g = w[F], B = y[F];
        for (d = 0; d < p; d++) {
          var _ = w[d], x = y[d];
          if (d !== F) {
            if (_[F] !== 0) {
              for (h = u(s(_[F]), g[F]), i = F; i < v; i++) _[i] = t(_[i], a(h, g[i]));
              for (i = 0; i < v; i++) x[i] = t(x[i], a(h, B[i]));
            }
          } else {
            for (h = g[F], i = F; i < v; i++) _[i] = u(_[i], h);
            for (i = 0; i < v; i++) x[i] = u(x[i], h);
          }
        }
      }
      return y;
    }
  }
});
function nf(r) {
  var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: s, sqrt: D, abs: l, bignumber: f, diag: o, size: c, reshape: p, inv: v, qr: d, usolve: i, usolveAll: h, equal: m, complex: C, larger: A, smaller: w, matrixFromColumns: y, dot: F } = r;
  function b(M, N, Q, W) {
    var q = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, T = E(M, N, Q, W, q);
    g(M, N, Q, W, q, T);
    var { values: P, C: L } = B(M, N, Q, W, q);
    if (q) {
      var Z = _(M, N, L, T, P, Q, W);
      return { values: P, eigenvectors: Z };
    }
    return { values: P };
  }
  function E(M, N, Q, W, q) {
    var T = W === "BigNumber", P = W === "Complex", L = T ? f(0) : 0, Z = T ? f(1) : P ? C(1) : 1, Y = T ? f(1) : 1, J = T ? f(10) : 2, H = a(J, J), k;
    q && (k = Array(N).fill(Z));
    for (var nr = false; !nr; ) {
      nr = true;
      for (var ur = 0; ur < N; ur++) {
        for (var tr = L, sr = L, cr = 0; cr < N; cr++) ur !== cr && (tr = e(tr, l(M[cr][ur])), sr = e(sr, l(M[ur][cr])));
        if (!m(tr, 0) && !m(sr, 0)) {
          for (var fr = Y, lr = tr, Br = s(sr, J), Mr = a(sr, J); w(lr, Br); ) lr = a(lr, H), fr = a(fr, J);
          for (; A(lr, Mr); ) lr = s(lr, H), fr = s(fr, J);
          var br = w(s(e(lr, sr), fr), a(e(tr, sr), 0.95));
          if (br) {
            nr = false;
            for (var Ur = s(1, fr), Sr = 0; Sr < N; Sr++) ur !== Sr && (M[ur][Sr] = a(M[ur][Sr], Ur), M[Sr][ur] = a(M[Sr][ur], fr));
            q && (k[ur] = a(k[ur], Ur));
          }
        }
      }
    }
    return q ? o(k) : null;
  }
  function g(M, N, Q, W, q, T) {
    var P = W === "BigNumber", L = W === "Complex", Z = P ? f(0) : L ? C(0) : 0;
    P && (Q = f(Q));
    for (var Y = 0; Y < N - 2; Y++) {
      for (var J = 0, H = Z, k = Y + 1; k < N; k++) {
        var nr = M[k][Y];
        w(l(H), l(nr)) && (H = nr, J = k);
      }
      if (!w(l(H), Q)) {
        if (J !== Y + 1) {
          var ur = M[J];
          M[J] = M[Y + 1], M[Y + 1] = ur;
          for (var tr = 0; tr < N; tr++) {
            var sr = M[tr][J];
            M[tr][J] = M[tr][Y + 1], M[tr][Y + 1] = sr;
          }
          if (q) {
            var cr = T[J];
            T[J] = T[Y + 1], T[Y + 1] = cr;
          }
        }
        for (var fr = Y + 2; fr < N; fr++) {
          var lr = s(M[fr][Y], H);
          if (lr !== 0) {
            for (var Br = 0; Br < N; Br++) M[fr][Br] = n(M[fr][Br], a(lr, M[Y + 1][Br]));
            for (var Mr = 0; Mr < N; Mr++) M[Mr][Y + 1] = e(M[Mr][Y + 1], a(lr, M[Mr][fr]));
            if (q) for (var br = 0; br < N; br++) T[fr][br] = n(T[fr][br], a(lr, T[Y + 1][br]));
          }
        }
      }
    }
    return T;
  }
  function B(M, N, Q, W, q) {
    var T = W === "BigNumber", P = W === "Complex", L = T ? f(1) : P ? C(1) : 1;
    T && (Q = f(Q));
    for (var Z = Dr(M), Y = [], J = N, H = [], k = q ? o(Array(N).fill(L)) : void 0, nr = q ? o(Array(J).fill(L)) : void 0, ur = 0; ur <= 100; ) {
      ur += 1;
      for (var tr = Z[J - 1][J - 1], sr = 0; sr < J; sr++) Z[sr][sr] = n(Z[sr][sr], tr);
      var { Q: cr, R: fr } = d(Z);
      Z = t(fr, cr);
      for (var lr = 0; lr < J; lr++) Z[lr][lr] = e(Z[lr][lr], tr);
      if (q && (nr = t(nr, cr)), J === 1 || w(l(Z[J - 1][J - 2]), Q)) {
        ur = 0, Y.push(Z[J - 1][J - 1]), q && (H.unshift([[1]]), S(nr, N), k = t(k, nr), J > 1 && (nr = o(Array(J - 1).fill(L)))), J -= 1, Z.pop();
        for (var Br = 0; Br < J; Br++) Z[Br].pop();
      } else if (J === 2 || w(l(Z[J - 2][J - 3]), Q)) {
        ur = 0;
        var Mr = x(Z[J - 2][J - 2], Z[J - 2][J - 1], Z[J - 1][J - 2], Z[J - 1][J - 1]);
        Y.push(...Mr), q && (H.unshift(O(Z[J - 2][J - 2], Z[J - 2][J - 1], Z[J - 1][J - 2], Z[J - 1][J - 1], Mr[0], Mr[1], Q, W)), S(nr, N), k = t(k, nr), J > 2 && (nr = o(Array(J - 2).fill(L)))), J -= 2, Z.pop(), Z.pop();
        for (var br = 0; br < J; br++) Z[br].pop(), Z[br].pop();
      }
      if (J === 0) break;
    }
    if (Y.sort((Gr, Ir) => +n(l(Gr), l(Ir))), ur > 100) {
      var Ur = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + Y.join(", "));
      throw Ur.values = Y, Ur.vectors = [], Ur;
    }
    var Sr = q ? t(k, U(H, N)) : void 0;
    return { values: Y, C: Sr };
  }
  function _(M, N, Q, W, q, T, P) {
    var L = v(Q), Z = t(L, M, Q), Y = P === "BigNumber", J = P === "Complex", H = Y ? f(0) : J ? C(0) : 0, k = Y ? f(1) : J ? C(1) : 1, nr = [], ur = [];
    for (var tr of q) {
      var sr = z(nr, tr, m);
      sr === -1 ? (nr.push(tr), ur.push(1)) : ur[sr] += 1;
    }
    for (var cr = [], fr = nr.length, lr = Array(N).fill(H), Br = o(Array(N).fill(k)), Mr = function() {
      var Sr = nr[br], Gr = n(Z, t(Sr, Br)), Ir = h(Gr, lr);
      for (Ir.shift(); Ir.length < ur[br]; ) {
        var pe = X(Gr, N, Ir, T, P);
        if (pe === null) break;
        Ir.push(pe);
      }
      var Kr = t(v(W), Q);
      Ir = Ir.map((Lr) => t(Kr, Lr)), cr.push(...Ir.map((Lr) => ({ value: Sr, vector: u(Lr) })));
    }, br = 0; br < fr; br++) Mr();
    return cr;
  }
  function x(M, N, Q, W) {
    var q = e(M, W), T = n(a(M, W), a(N, Q)), P = a(q, 0.5), L = a(D(n(a(q, q), a(4, T))), 0.5);
    return [e(P, L), n(P, L)];
  }
  function O(M, N, Q, W, q, T, P, L) {
    var Z = L === "BigNumber", Y = L === "Complex", J = Z ? f(0) : Y ? C(0) : 0, H = Z ? f(1) : Y ? C(1) : 1;
    if (w(l(Q), P)) return [[H, J], [J, H]];
    if (A(l(n(q, T)), P)) return [[n(q, W), n(T, W)], [Q, Q]];
    var k = n(M, q), nr = n(W, q);
    return w(l(N), P) && w(l(nr), P) ? [[k, H], [Q, J]] : [[N, J], [nr, H]];
  }
  function S(M, N) {
    for (var Q = 0; Q < M.length; Q++) M[Q].push(...Array(N - M[Q].length).fill(0));
    for (var W = M.length; W < N; W++) M.push(Array(N).fill(0)), M[W][W] = 1;
    return M;
  }
  function U(M, N) {
    for (var Q = [], W = 0; W < N; W++) Q[W] = Array(N).fill(0);
    var q = 0;
    for (var T of M) {
      for (var P = T.length, L = 0; L < P; L++) for (var Z = 0; Z < P; Z++) Q[q + L][q + Z] = T[L][Z];
      q += P;
    }
    return Q;
  }
  function z(M, N, Q) {
    for (var W = 0; W < M.length; W++) if (Q(M[W], N)) return W;
    return -1;
  }
  function X(M, N, Q, W, q) {
    for (var T = q === "BigNumber" ? f(1e3) : 1e3, P, L = 0; L < 5; ++L) {
      P = R(N, Q, q);
      try {
        P = i(M, P);
      } catch {
        continue;
      }
      if (A(I(P), T)) break;
    }
    if (L >= 5) return null;
    for (L = 0; ; ) {
      var Z = i(M, P);
      if (w(I(V(P, [Z])), W)) break;
      if (++L >= 10) return null;
      P = $(Z);
    }
    return P;
  }
  function R(M, N, Q) {
    var W = Q === "BigNumber", q = Q === "Complex", T = Array(M).fill(0).map((P) => 2 * Math.random() - 1);
    return W && (T = T.map((P) => f(P))), q && (T = T.map((P) => C(P))), T = V(T, N), $(T, Q);
  }
  function V(M, N) {
    var Q = c(M);
    for (var W of N) W = p(W, Q), M = n(M, t(s(F(W, M), F(W, W)), W));
    return M;
  }
  function I(M) {
    return l(D(F(M, M)));
  }
  function $(M, N) {
    var Q = N === "BigNumber", W = N === "Complex", q = Q ? f(1) : W ? C(1) : 1;
    return t(s(q, I(M)), M);
  }
  return b;
}
function uf(r) {
  var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: s, sin: D, multiplyScalar: l, inv: f, bignumber: o, multiply: c, add: p } = r;
  function v(g, B) {
    var _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, x = arguments.length > 3 ? arguments[3] : void 0, O = arguments.length > 4 ? arguments[4] : void 0;
    if (x === "number") return d(g, _, O);
    if (x === "BigNumber") return i(g, _, O);
    throw TypeError("Unsupported data type: " + x);
  }
  function d(g, B, _) {
    var x = g.length, O = Math.abs(B / x), S, U;
    if (_) {
      U = new Array(x);
      for (var z = 0; z < x; z++) U[z] = Array(x).fill(0), U[z][z] = 1;
    }
    for (var X = F(g); Math.abs(X[1]) >= Math.abs(O); ) {
      var R = X[0][0], V = X[0][1];
      S = h(g[R][R], g[V][V], g[R][V]), g = y(g, S, R, V), _ && (U = C(U, S, R, V)), X = F(g);
    }
    for (var I = Array(x).fill(0), $ = 0; $ < x; $++) I[$] = g[$][$];
    return E(Dr(I), U, _);
  }
  function i(g, B, _) {
    var x = g.length, O = t(B / x), S, U;
    if (_) {
      U = new Array(x);
      for (var z = 0; z < x; z++) U[z] = Array(x).fill(0), U[z][z] = 1;
    }
    for (var X = b(g); t(X[1]) >= t(O); ) {
      var R = X[0][0], V = X[0][1];
      S = m(g[R][R], g[V][V], g[R][V]), g = w(g, S, R, V), _ && (U = A(U, S, R, V)), X = b(g);
    }
    for (var I = Array(x).fill(0), $ = 0; $ < x; $++) I[$] = g[$][$];
    return E(Dr(I), U, _);
  }
  function h(g, B, _) {
    var x = B - g;
    return Math.abs(x) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * _ / (B - g));
  }
  function m(g, B, _) {
    var x = u(B, g);
    return t(x) <= e.relTol ? o(-1).acos().div(4) : l(0.5, a(c(2, _, f(x))));
  }
  function C(g, B, _, x) {
    for (var O = g.length, S = Math.cos(B), U = Math.sin(B), z = Array(O).fill(0), X = Array(O).fill(0), R = 0; R < O; R++) z[R] = S * g[R][_] - U * g[R][x], X[R] = U * g[R][_] + S * g[R][x];
    for (var V = 0; V < O; V++) g[V][_] = z[V], g[V][x] = X[V];
    return g;
  }
  function A(g, B, _, x) {
    for (var O = g.length, S = s(B), U = D(B), z = Array(O).fill(o(0)), X = Array(O).fill(o(0)), R = 0; R < O; R++) z[R] = u(l(S, g[R][_]), l(U, g[R][x])), X[R] = n(l(U, g[R][_]), l(S, g[R][x]));
    for (var V = 0; V < O; V++) g[V][_] = z[V], g[V][x] = X[V];
    return g;
  }
  function w(g, B, _, x) {
    for (var O = g.length, S = o(s(B)), U = o(D(B)), z = l(S, S), X = l(U, U), R = Array(O).fill(o(0)), V = Array(O).fill(o(0)), I = c(o(2), S, U, g[_][x]), $ = n(u(l(z, g[_][_]), I), l(X, g[x][x])), M = p(l(X, g[_][_]), I, l(z, g[x][x])), N = 0; N < O; N++) R[N] = u(l(S, g[_][N]), l(U, g[x][N])), V[N] = n(l(U, g[_][N]), l(S, g[x][N]));
    g[_][_] = $, g[x][x] = M, g[_][x] = o(0), g[x][_] = o(0);
    for (var Q = 0; Q < O; Q++) Q !== _ && Q !== x && (g[_][Q] = R[Q], g[Q][_] = R[Q], g[x][Q] = V[Q], g[Q][x] = V[Q]);
    return g;
  }
  function y(g, B, _, x) {
    for (var O = g.length, S = Math.cos(B), U = Math.sin(B), z = S * S, X = U * U, R = Array(O).fill(0), V = Array(O).fill(0), I = z * g[_][_] - 2 * S * U * g[_][x] + X * g[x][x], $ = X * g[_][_] + 2 * S * U * g[_][x] + z * g[x][x], M = 0; M < O; M++) R[M] = S * g[_][M] - U * g[x][M], V[M] = U * g[_][M] + S * g[x][M];
    g[_][_] = I, g[x][x] = $, g[_][x] = 0, g[x][_] = 0;
    for (var N = 0; N < O; N++) N !== _ && N !== x && (g[_][N] = R[N], g[N][_] = R[N], g[x][N] = V[N], g[N][x] = V[N]);
    return g;
  }
  function F(g) {
    for (var B = g.length, _ = 0, x = [0, 1], O = 0; O < B; O++) for (var S = O + 1; S < B; S++) Math.abs(_) < Math.abs(g[O][S]) && (_ = Math.abs(g[O][S]), x = [O, S]);
    return [x, _];
  }
  function b(g) {
    for (var B = g.length, _ = 0, x = [0, 1], O = 0; O < B; O++) for (var S = O + 1; S < B; S++) t(_) < t(g[O][S]) && (_ = t(g[O][S]), x = [O, S]);
    return [x, _];
  }
  function E(g, B, _) {
    var x = g.length, O = Array(x), S;
    if (_) {
      S = Array(x);
      for (var U = 0; U < x; U++) S[U] = Array(x);
    }
    for (var z = 0; z < x; z++) {
      for (var X = 0, R = g[0], V = 0; V < g.length; V++) t(g[V]) < t(R) && (X = V, R = g[X]);
      if (O[z] = g.splice(X, 1)[0], _) for (var I = 0; I < x; I++) S[z][I] = B[I][X], B[I].splice(X, 1);
    }
    if (!_) return { values: O };
    var $ = S.map((M, N) => ({ value: O[N], vector: M }));
    return { values: O, eigenvectors: $ };
  }
  return v;
}
var af = "eigs", of = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], sf = G(af, of, (r) => {
  var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: s, abs: D, atan: l, cos: f, sin: o, multiplyScalar: c, divideScalar: p, inv: v, bignumber: d, multiply: i, add: h, larger: m, column: C, flatten: A, number: w, complex: y, sqrt: F, diag: b, size: E, reshape: g, qr: B, usolve: _, usolveAll: x, im: O, re: S, smaller: U, matrixFromColumns: z, dot: X } = r, R = uf({ config: e, addScalar: t, subtract: a, abs: D, atan: l, cos: f, sin: o, multiplyScalar: c, inv: v, bignumber: d, multiply: i, add: h }), V = nf({ addScalar: t, subtract: a, multiply: i, multiplyScalar: c, flatten: A, divideScalar: p, sqrt: F, abs: D, bignumber: d, diag: b, size: E, reshape: g, qr: B, inv: v, usolve: _, usolveAll: x, equal: s, complex: y, larger: m, smaller: U, matrixFromColumns: z, dot: X });
  return n("eigs", { Array: function(T) {
    return I(u(T));
  }, "Array, number|BigNumber": function(T, P) {
    return I(u(T), { precision: P });
  }, "Array, Object"(q, T) {
    return I(u(q), T);
  }, Matrix: function(T) {
    return I(T, { matricize: true });
  }, "Matrix, number|BigNumber": function(T, P) {
    return I(T, { precision: P, matricize: true });
  }, "Matrix, Object": function(T, P) {
    var L = { matricize: true };
    return tt(L, P), I(T, L);
  } });
  function I(q) {
    var T, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = "eigenvectors" in P ? P.eigenvectors : true, Z = (T = P.precision) !== null && T !== void 0 ? T : e.relTol, Y = $(q, Z, L);
    return P.matricize && (Y.values = u(Y.values), L && (Y.eigenvectors = Y.eigenvectors.map((J) => {
      var { value: H, vector: k } = J;
      return { value: H, vector: u(k) };
    }))), L && Object.defineProperty(Y, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), Y;
  }
  function $(q, T, P) {
    var L = q.toArray(), Z = q.size();
    if (Z.length !== 2 || Z[0] !== Z[1]) throw new RangeError("Matrix must be square (size: ".concat(Fr(Z), ")"));
    var Y = Z[0];
    if (N(L, Y, T) && (Q(L, Y), M(L, Y, T))) {
      var J = W(q, L, Y);
      return R(L, Y, T, J, P);
    }
    var H = W(q, L, Y);
    return V(L, Y, T, H, P);
  }
  function M(q, T, P) {
    for (var L = 0; L < T; L++) for (var Z = L; Z < T; Z++) if (m(d(D(a(q[L][Z], q[Z][L]))), P)) return false;
    return true;
  }
  function N(q, T, P) {
    for (var L = 0; L < T; L++) for (var Z = 0; Z < T; Z++) if (m(d(D(O(q[L][Z]))), P)) return false;
    return true;
  }
  function Q(q, T) {
    for (var P = 0; P < T; P++) for (var L = 0; L < T; L++) q[P][L] = S(q[P][L]);
  }
  function W(q, T, P) {
    var L = q.datatype();
    if (L === "number" || L === "BigNumber" || L === "Complex") return L;
    for (var Z = false, Y = false, J = false, H = 0; H < P; H++) for (var k = 0; k < P; k++) {
      var nr = T[H][k];
      if (yr(nr) || Et(nr)) Z = true;
      else if (_r(nr)) Y = true;
      else if (Ft(nr)) J = true;
      else throw TypeError("Unsupported type in Matrix: " + Yr(nr));
    }
    if (Y && J && console.warn("Complex BigNumbers not supported, this operation will lose precission."), J) {
      for (var ur = 0; ur < P; ur++) for (var tr = 0; tr < P; tr++) T[ur][tr] = y(T[ur][tr]);
      return "Complex";
    }
    if (Y) {
      for (var sr = 0; sr < P; sr++) for (var cr = 0; cr < P; cr++) T[sr][cr] = d(T[sr][cr]);
      return "BigNumber";
    }
    if (Z) {
      for (var fr = 0; fr < P; fr++) for (var lr = 0; lr < P; lr++) T[fr][lr] = w(T[fr][lr]);
      return "number";
    } else throw TypeError("Matrix contains unsupported types only.");
  }
}), qe = wa({ config: $r }), ot = xa({}), St = $a({}), Mt = Ra({}), Rr = ja({ Matrix: Mt }), er = Fa({ BigNumber: qe, Complex: ot, DenseMatrix: Rr, Fraction: St }), Nt = Oi({ typed: er }), Se = Ii({ typed: er }), ff = Ps({ typed: er }), Tt = Ci({ Complex: ot, typed: er }), st = _o({ typed: er }), cf = Qs({ typed: er }), se = fi({ config: $r, typed: er }), yu = Po({ typed: er }), lf = Qo({ typed: er }), vf = xo({ typed: er }), Au = ei({ typed: er }), Df = ui({ config: $r, typed: er }), Fu = ii({ equalScalar: se, typed: er }), Fe = vo({ typed: er }), zt = mi({ typed: er }), pf = Mo({ typed: er }), df = mo({ BigNumber: qe, Fraction: St, complex: Tt, typed: er }), hf = Zs({ typed: er }), fe = vi({ Matrix: Mt, equalScalar: se, typed: er }), Re = Ri({ typed: er }), Ue = Ai({ BigNumber: qe, typed: er }), j = xi({ DenseMatrix: Rr, Matrix: Mt, SparseMatrix: fe, typed: er }), mf = Ho({ isInteger: Au, matrix: j, typed: er }), Ot = Ao({ Complex: ot, config: $r, typed: er }), ie = es({ matrix: j, typed: er }), hr = as({ BigNumber: qe, config: $r, matrix: j, typed: er }), Ee = To({ isInteger: Au, matrix: j, typed: er }), gf = ns({ conj: st, transpose: ie, typed: er }), yf = Ro({ DenseMatrix: Rr, SparseMatrix: fe, matrix: j, typed: er }), Eu = gs({ DenseMatrix: Rr, SparseMatrix: fe, concat: Ee, equalScalar: se, matrix: j, typed: er }), Cu = _i({ Fraction: St, typed: er }), Pe = Zo({ BigNumber: qe, DenseMatrix: Rr, SparseMatrix: fe, config: $r, matrix: j, typed: er }), Af = Wo({ matrix: j, multiplyScalar: Fe, typed: er }), Ff = Ms({ DenseMatrix: Rr, SparseMatrix: fe, concat: Ee, config: $r, matrix: j, typed: er }), Ef = ss({ bignumber: Ue, fraction: Cu, number: zt }), $t = jo({ matrix: j, config: $r, typed: er }), ft = Fs({ DenseMatrix: Rr, SparseMatrix: fe, bignumber: Ue, concat: Ee, config: $r, matrix: j, typed: er }), ct = Ti({ typed: er }), ee = Ws({ DenseMatrix: Rr, SparseMatrix: fe, addScalar: Se, concat: Ee, equalScalar: se, matrix: j, typed: er }), Me = cs({ numeric: Ef, typed: er }), Cf = Os({ DenseMatrix: Rr, smaller: ft }), bf = qs({ ImmutableDenseMatrix: Cf, getMatrixDataType: lf }), It = Bs({ DenseMatrix: Rr, SparseMatrix: fe, bignumber: Ue, concat: Ee, config: $r, matrix: j, typed: er }), wf = Mi({ flatten: yu, matrix: j, size: $t, typed: er }), _f = ks({ addScalar: Se, complex: Tt, conj: st, divideScalar: Me, equal: Eu, identity: Pe, isZero: Fu, matrix: j, multiplyScalar: Fe, sign: df, sqrt: Ot, subtractScalar: Re, typed: er, unaryMinus: ct, zeros: hr }), Bf = bs({ DenseMatrix: Rr, SparseMatrix: fe, concat: Ee, config: $r, matrix: j, typed: er }), lt = Eo({ DenseMatrix: Rr, concat: Ee, equalScalar: se, matrix: j, subtractScalar: Re, typed: er, unaryMinus: ct }), xf = ps({ DenseMatrix: Rr, divideScalar: Me, equalScalar: se, matrix: j, multiplyScalar: Fe, subtractScalar: Re, typed: er }), Ne = Ks({ addScalar: Se, conj: st, multiplyScalar: Fe, size: $t, typed: er }), vr = po({ addScalar: Se, dot: Ne, equalScalar: se, matrix: j, multiplyScalar: Fe, typed: er }), Sf = Go({ bignumber: Ue, matrix: j, add: ee, config: $r, isPositive: Df, larger: It, largerEq: Ff, smaller: ft, smallerEq: Bf, typed: er }), Mf = hs({ DenseMatrix: Rr, divideScalar: Me, equalScalar: se, matrix: j, multiplyScalar: Fe, subtractScalar: Re, typed: er }), Nf = Oo({ Index: bf, matrix: j, range: Sf, typed: er }), Un = Io({ matrix: j, multiply: vr, subtract: lt, typed: er }), Tf = rf({ divideScalar: Me, isZero: Fu, matrix: j, multiply: vr, subtractScalar: Re, typed: er, unaryMinus: ct }), bu = tf({ abs: Nt, addScalar: Se, det: Tf, divideScalar: Me, identity: Pe, matrix: j, multiply: vr, typed: er, unaryMinus: ct }), zf = vs({ Complex: ot, config: $r, fraction: Cu, identity: Pe, inv: bu, matrix: j, multiply: vr, number: zt, typed: er }), Of = sf({ abs: Nt, add: ee, addScalar: Se, atan: ff, bignumber: Ue, column: Nf, complex: Tt, config: $r, cos: cf, diag: yf, divideScalar: Me, dot: Ne, equal: Eu, flatten: yu, im: vf, inv: bu, larger: It, matrix: j, matrixFromColumns: wf, multiply: vr, multiplyScalar: Fe, number: zt, qr: _f, re: pf, reshape: mf, sin: hf, size: $t, smaller: ft, sqrt: Ot, subtract: lt, typed: er, usolve: xf, usolveAll: Mf }), Te = Ys({ abs: Nt, add: ee, conj: st, ctranspose: gf, eigs: Of, equalScalar: se, larger: It, matrix: j, multiply: vr, pow: zf, smaller: ft, sqrt: Ot, typed: er });
function $f(r) {
  if (r.length === 2) return If(r);
  if (r.length === 3) return qf(r);
}
function If(r) {
  const e = lt(r[1], r[0]), n = Te(e), u = Ne(e, [1, 0, 0]) / n, t = Ne(e, [0, 1, 0]) / n, a = Ne(e, [0, 0, 1]) / n, s = Math.sqrt(u ** 2 + t ** 2);
  let D = [[u, t, a], [-t / s, u / s, 0], [-u * a / s, -t * a / s, s]];
  return a === 1 && (D = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]]), a === -1 && (D = [[0, 0, -1], [0, 1, 0], [1, 0, 0]]), Af(Pe(4), D).toArray();
}
function qf(r) {
  const a = [r[0], r[1], r[2]], s = hr(3, 3).toArray();
  for (let y = 0; y < 3; y++) for (let F = 0; F < 3; F++) s[y][F] = a[F][y];
  const D = [-1, 1, 0], l = [-1, 0, 1], f = hr(3, 2).toArray();
  for (let y = 0; y < 3; y++) for (let F = 0; F < 3; F++) f[y][0] += s[y][F] * D[F], f[y][1] += s[y][F] * l[F];
  const o = f.map((y) => y[0]), c = f.map((y) => y[1]);
  let p = Un(o, c), v = Te(p);
  if (v === 0) return console.warn("Degenerate triangle: nodes are collinear or coincident."), hr(18, 18).toArray();
  p = p.map((y) => y / v);
  const d = [...p], i = Pe(3).toArray(), h = p[0];
  let m;
  if (Math.abs(h) > 1 - 1e-10) {
    const y = p[2];
    m = i.map((F, b) => F[2] - y * p[b]);
  } else m = i.map((y, F) => y[0] - h * p[F]);
  if (v = Te(m), v === 0) return console.warn("Degenerate local X-axis detected."), hr(18, 18).toArray();
  m = m.map((y) => y / v);
  let C = Un(d, m);
  if (v = Te(C), v === 0) return console.warn("Degenerate local Y-axis detected."), hr(18, 18).toArray();
  C = C.map((y) => y / v);
  const A = [m, C, d], w = hr(18, 18).toArray();
  for (let y = 0; y < 3; y++) {
    const F = y * 6, b = F + 3;
    for (let E = 0; E < 3; E++) for (let g = 0; g < 3; g++) w[F + E][F + g] = A[E][g], w[b + E][b + g] = A[E][g];
  }
  return w;
}
function Rf(r, e, n) {
  if (r.length === 2) return Uf(r, e, n);
  if (r.length === 3) return Pf(r, e, n);
}
function Uf(r, e, n) {
  var _a2, _b, _c, _d, _e2, _f2;
  const u = ((_a2 = e == null ? void 0 : e.momentsOfInertiaZ) == null ? void 0 : _a2.get(n)) ?? 0, t = ((_b = e == null ? void 0 : e.momentsOfInertiaY) == null ? void 0 : _b.get(n)) ?? 0, a = ((_c = e == null ? void 0 : e.elasticities) == null ? void 0 : _c.get(n)) ?? 0, s = ((_d = e == null ? void 0 : e.areas) == null ? void 0 : _d.get(n)) ?? 0, D = ((_e2 = e == null ? void 0 : e.shearModuli) == null ? void 0 : _e2.get(n)) ?? 0, l = ((_f2 = e == null ? void 0 : e.torsionalConstants) == null ? void 0 : _f2.get(n)) ?? 0, f = Te(lt(r[0], r[1])), o = a * s / f, c = a * u / f ** 3, p = a * t / f ** 3, v = D * l / f;
  return [[o, 0, 0, 0, 0, 0, -o, 0, 0, 0, 0, 0], [0, 12 * c, 0, 0, 0, 6 * f * c, 0, -12 * c, 0, 0, 0, 6 * f * c], [0, 0, 12 * p, 0, -6 * f * p, 0, 0, 0, -12 * p, 0, -6 * f * p, 0], [0, 0, 0, v, 0, 0, 0, 0, 0, -v, 0, 0], [0, 0, -6 * f * p, 0, 4 * p * f ** 2, 0, 0, 0, 6 * f * p, 0, 2 * p * f ** 2, 0], [0, 6 * f * c, 0, 0, 0, 4 * c * f ** 2, 0, -6 * f * c, 0, 0, 0, 2 * c * f ** 2], [-o, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0], [0, -12 * c, 0, 0, 0, -6 * c * f, 0, 12 * c, 0, 0, 0, -6 * c * f], [0, 0, -12 * p, 0, 6 * f * p, 0, 0, 0, 12 * p, 0, 6 * f * p, 0], [0, 0, 0, -v, 0, 0, 0, 0, 0, v, 0, 0], [0, 0, -6 * f * p, 0, 2 * p * f ** 2, 0, 0, 0, 6 * f * p, 0, 4 * p * f ** 2, 0], [0, 6 * f * c, 0, 0, 0, 2 * c * f ** 2, 0, -6 * f * c, 0, 0, 0, 4 * c * f ** 2]];
}
function Pf(r, e, n) {
  var _a2, _b, _c, _d, _e2;
  const u = ((_a2 = e.elasticities) == null ? void 0 : _a2.get(n)) ?? 0, t = ((_b = e.elasticitiesOrthogonal) == null ? void 0 : _b.get(n)) ?? 0, a = ((_c = e.poissonsRatios) == null ? void 0 : _c.get(n)) ?? 0, s = ((_d = e.shearModuli) == null ? void 0 : _d.get(n)) ?? 0, D = ((_e2 = e.thicknesses) == null ? void 0 : _e2.get(n)) ?? 0, l = t > 0, f = l ? x(u, t, s, a, D) : B(u, a, D), o = l ? O(s, D) : _(u, a, D), c = l ? R(u, t, s, a) : X(u, a), p = r.map(([I, $]) => [I, $]), v = p[1][0] - p[0][0], d = p[2][0] - p[0][0], i = p[0][1] - p[1][1], h = p[2][1] - p[0][1], m = 0.5 * (v * h - d * -i), C = S(p), A = z(p), w = V(p, c, D), y = vr(vr(ie(C), o), C), F = vr(vr(ie(A), f), A), b = hr(18, 18).toArray(), E = vr(ee(y, F), m), g = [[0, 1, 5], [6, 7, 11], [12, 13, 17]];
  for (let I = 0; I < 3; I++) for (let $ = 0; $ < 3; $++) for (let M = 0; M < 3; M++) {
    const N = g[I][$], Q = g[M][$];
    b[N][Q] = w[I * 3 + $][M * 3 + $];
  }
  for (let I = 0; I < 18; I++) for (let $ = 0; $ < 18; $++) b[I][$] = (b[I][$] ?? 0) + E.get([I, $]);
  return b;
  function B(I, $, M) {
    const N = I / (1 - $ * $), Q = j([[N, N * $, 0], [N * $, N, 0], [0, 0, N * (1 - $) / 2]]);
    return vr(M ** 3 / 12, Q);
  }
  function _(I, $, M) {
    const N = 0.8333333333333334, Q = I / (2 * (1 + $)), W = N * Q * M;
    return j([[W, 0], [0, W]]);
  }
  function x(I, $, M, N, Q) {
    const W = $ * N / I, q = 1 - N * W, T = I / q, P = $ / q, L = N * $ / q, Y = j([[T, L, 0], [L, P, 0], [0, 0, M]]);
    return vr(Q ** 3 / 12, Y);
  }
  function O(I, $) {
    const N = 0.8333333333333334 * I * $;
    return j([[N, 0], [0, N]]);
  }
  function S(I) {
    const $ = hr(2, 18).toArray(), [M, N] = I[0], [Q, W] = I[1], [q, T] = I[2], P = 0.5 * ((Q - M) * (T - N) - (q - M) * -(N - W)), L = (M + Q + q) / 3, Z = (N + W + T) / 3, Y = [L, M, Q], J = [Z, N, W], H = [L, Q, q], k = [Z, W, T], nr = [L, q, M], ur = [Z, T, N], tr = 1 / 3, [sr, cr, fr, lr] = U(Y, J), [Br, Mr, br, Ur] = U(H, k), [Sr, Gr, Ir, pe] = U(nr, ur), Kr = hr(2, 18).toArray(), Lr = hr(2, 18).toArray(), ce = hr(2, 18).toArray();
    for (let or = 0; or < 2; or++) for (let ar = 0; ar < 6; ar++) Kr[or][ar] = tr * sr[or][ar] + cr[or][ar], Kr[or][ar + 6] = tr * sr[or][ar] + fr[or][ar], Kr[or][ar + 12] = tr * sr[or][ar], Lr[or][ar] = tr * Br[or][ar], Lr[or][ar + 6] = tr * Br[or][ar] + Mr[or][ar], Lr[or][ar + 12] = tr * Br[or][ar] + br[or][ar], ce[or][ar] = tr * Sr[or][ar] + Ir[or][ar], ce[or][ar + 6] = tr * Sr[or][ar], ce[or][ar + 12] = tr * Sr[or][ar] + Gr[or][ar];
    for (let or = 0; or < 2; or++) for (let ar = 0; ar < 18; ar++) Kr[or][ar] *= lr, Lr[or][ar] *= Ur, ce[or][ar] *= pe, $[or][ar] = (Kr[or][ar] + Lr[or][ar] + ce[or][ar]) / P;
    return $;
  }
  function U(I, $) {
    const M = hr(2, 6).toArray(), N = hr(2, 6).toArray(), Q = hr(2, 6).toArray(), W = I[1] - I[0], q = I[0] - I[2], T = $[2] - $[0], P = $[0] - $[1], L = I[2] - I[1], Z = $[1] - $[2], Y = 0.5 * (W * T - q * P), J = 0.5 * P * q, H = 0.5 * T * W, k = 0.5 * W * q, nr = 0.5 * P * T;
    return M[0][2] = 0.5 * L / Y, M[0][3] = -0.5, M[1][2] = 0.5 * Z / Y, M[1][4] = 0.5, N[0][2] = 0.5 * q / Y, N[0][3] = 0.5 * J / Y, N[0][4] = 0.5 * k / Y, N[1][2] = 0.5 * T / Y, N[1][3] = 0.5 * nr / Y, N[1][4] = 0.5 * H / Y, Q[0][2] = 0.5 * W / Y, Q[0][3] = -0.5 * H / Y, Q[0][4] = -0.5 * k / Y, Q[1][2] = 0.5 * P / Y, Q[1][3] = -0.5 * nr / Y, Q[1][4] = -0.5 * J / Y, [M, N, Q, Y];
  }
  function z(I) {
    const $ = hr(3, 18).toArray(), [M, N] = I[0], [Q, W] = I[1], [q, T] = I[2], P = Q - M, L = q - M, Z = q - Q, Y = W - T, J = T - N, H = N - W, k = 0.5 * (P * J - L * -H), nr = Y / (2 * k), ur = Z / (2 * k), tr = J / (2 * k), sr = -L / (2 * k), cr = H / (2 * k), fr = P / (2 * k);
    return $[0][4] = nr, $[0][10] = tr, $[0][16] = cr, $[1][3] = -ur, $[1][9] = -sr, $[1][15] = -fr, $[2][3] = -nr, $[2][4] = ur, $[2][9] = -tr, $[2][10] = sr, $[2][15] = -cr, $[2][16] = fr, $;
  }
  function X(I, $) {
    const M = I / (1 - $ * $);
    return j([[M, M * $, 0], [M * $, M, 0], [0, 0, M * (1 - $) / 2]]);
  }
  function R(I, $, M, N) {
    const Q = $ * N / I, W = 1 - N * Q, q = I / W, T = $ / W, P = N * $ / W;
    return j([[q, P, 0], [P, T, 0], [0, 0, M]]);
  }
  function V(I, $, M) {
    let N = hr(9, 9).toArray(), Q = hr(9, 9).toArray(), W = hr(9, 9).toArray(), q = hr(9, 3).toArray(), T = hr(3, 9).toArray(), P = hr(3, 3).toArray(), L = hr(3, 3).toArray(), Z = hr(3, 3).toArray(), Y = hr(3, 3).toArray(), J = hr(3, 3).toArray(), H = hr(3, 3).toArray(), k = hr(3, 3).toArray(), nr = hr(3, 3).toArray();
    const ur = 1 / 8, tr = ur / 6, sr = ur ** 2 / 4, cr = 1, fr = 2, lr = 1, Br = 0, Mr = 1, br = -1, Ur = -1, Sr = -1, Gr = -2, Ir = I[0][0], pe = I[0][1], Kr = I[1][0], Lr = I[1][1], ce = I[2][0], or = I[2][1], ar = Ir - Kr, de = Kr - ce, le = ce - Ir, he = pe - Lr, Ce = Lr - or, me = or - pe, Hr = -ar, te = -de, ne = -le, kr = -he, jr = -Ce, re = -me, Le = 0.5 * (Hr * me - le * -he), wu = 2 * Le, Nr = 4 * Le, xr = 0.5 * M, qt = Le * M, Qr = Hr ** 2 + kr ** 2, Vr = te ** 2 + jr ** 2, Zr = ne ** 2 + re ** 2;
    q[0][0] = xr * Ce, q[0][2] = xr * te, q[1][1] = xr * te, q[1][2] = xr * Ce, q[2][0] = xr * Ce * (re - kr) * tr, q[2][1] = xr * te * (le - ar) * tr, q[2][2] = xr * (le * re - ar * kr) * 2 * tr, q[3][0] = xr * me, q[3][2] = xr * ne, q[4][1] = xr * ne, q[4][2] = xr * me, q[5][0] = xr * me * (kr - jr) * tr, q[5][1] = xr * ne * (ar - de) * tr, q[5][2] = xr * (ar * kr - de * jr) * 2 * tr, q[6][0] = xr * he, q[6][2] = xr * Hr, q[7][1] = xr * Hr, q[7][2] = xr * he, q[8][0] = xr * he * (jr - re) * tr, q[8][1] = xr * Hr * (de - le) * tr, q[8][2] = xr * (de * jr - le * re) * 2 * tr, W = vr(vr(j(q), $), ie(j(q))).toArray(), W = vr(j(W), 1 / qt).toArray(), T[0][0] = te / Nr, T[0][1] = jr / Nr, T[0][2] = 1, T[0][3] = ne / Nr, T[0][4] = re / Nr, T[0][6] = Hr / Nr, T[0][7] = kr / Nr, T[1][0] = te / Nr, T[1][1] = jr / Nr, T[1][3] = ne / Nr, T[1][4] = re / Nr, T[1][5] = 1, T[1][6] = Hr / Nr, T[1][7] = kr / Nr, T[2][0] = te / Nr, T[2][1] = jr / Nr, T[2][3] = ne / Nr, T[2][4] = re / Nr, T[2][6] = Hr / Nr, T[2][7] = kr / Nr, T[2][8] = 1;
    const ue = 1 / (Le * Nr);
    P[0][0] = ue * Ce * re * Qr, P[0][1] = ue * me * kr * Vr, P[0][2] = ue * he * jr * Zr, P[1][0] = ue * de * ne * Qr, P[1][1] = ue * le * Hr * Vr, P[1][2] = ue * ar * te * Zr, P[2][0] = ue * (Ce * le + te * re) * Qr, P[2][1] = ue * (me * ar + ne * kr) * Vr, P[2][2] = ue * (he * de + Hr * jr) * Zr;
    const gr = wu / 3;
    L[0][0] = gr * cr / Qr, L[0][1] = gr * fr / Qr, L[0][2] = gr * lr / Qr, L[1][0] = gr * Br / Vr, L[1][1] = gr * Mr / Vr, L[1][2] = gr * br / Vr, L[2][0] = gr * Ur / Zr, L[2][1] = gr * Sr / Zr, L[2][2] = gr * Gr / Zr, Z[0][0] = gr * Gr / Qr, Z[0][1] = gr * Ur / Qr, Z[0][2] = gr * Sr / Qr, Z[1][0] = gr * lr / Vr, Z[1][1] = gr * cr / Vr, Z[1][2] = gr * fr / Vr, Z[2][0] = gr * br / Zr, Z[2][1] = gr * Br / Zr, Z[2][2] = gr * Mr / Zr, Y[0][0] = gr * Mr / Qr, Y[0][1] = gr * br / Qr, Y[0][2] = gr * Br / Qr, Y[1][0] = gr * Sr / Vr, Y[1][1] = gr * Gr / Vr, Y[1][2] = gr * Ur / Vr, Y[2][0] = gr * fr / Zr, Y[2][1] = gr * lr / Zr, Y[2][2] = gr * cr / Zr, J = vr(ee(j(L), j(Z)), 0.5).toArray(), H = vr(ee(j(Z), j(Y)), 0.5).toArray(), k = vr(ee(j(Y), j(L)), 0.5).toArray();
    const vt = vr(vr(ie(j(P)), $), j(P));
    return nr = ee(ee(vr(vr(ie(j(J)), vt), j(J)), vr(vr(ie(j(H)), vt), j(H))), vr(vr(ie(j(k)), vt), j(k))).toArray(), nr = vr(j(nr), 3 / 4 * sr * qt).toArray(), Q = vr(vr(ie(j(T)), j(nr)), j(T)).toArray(), N = ee(j(W), j(Q)).toArray(), N;
  }
}
function Qf(r, e, n, u) {
  const t = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map(), bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map() };
  return e.forEach((a, s) => {
    const D = a.map((v) => r[v]), l = a.reduce((v, d) => v.concat(u.deformations.get(d)), []), f = $f(D), o = vr(f, l), c = Rf(D, n, s);
    let p = vr(c, o);
    a.length === 2 ? (t.normals.set(s, [p[0], p[6]]), t.shearsY.set(s, [p[1], p[7]]), t.shearsZ.set(s, [p[2], p[8]]), t.torsions.set(s, [p[3], p[9]]), t.bendingsY.set(s, [p[4], p[10]]), t.bendingsZ.set(s, [p[5], p[11]])) : (t.bendingXY.set(s, [p[2], p[8], p[14]]), t.bendingXX.set(s, [p[3], p[9], p[15]]), t.bendingXX.set(s, [p[4], p[10], p[16]]));
  }), t;
}
export {
  Qf as a
};
