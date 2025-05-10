import { _ as be, t as pe, D as lt, C as wr } from "./complex-i8qiIvCl.js";
var ln = { relTol: 1e-12, absTol: 1e-15, matrix: "Matrix", number: "number", numberFallback: "number", precision: 64, predictable: false, randomSeed: null };
function kn(r, e) {
  if (de(r, e)) return r[e];
  throw typeof r[e] == "function" && ru(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function jn(r, e, n) {
  if (de(r, e)) return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function de(r, e) {
  return !eu(r) && !Array.isArray(r) ? false : ne(tu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function ru(r, e) {
  return r == null || typeof r[e] != "function" || ne(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : ne(nu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function eu(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var tu = { length: true, name: true }, nu = { toString: true, valueOf: true, toLocaleString: true };
class uu {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
  }
  get(e) {
    return kn(this.wrappedObject, e);
  }
  set(e, n) {
    return jn(this.wrappedObject, e, n), this;
  }
  has(e) {
    return de(this.wrappedObject, e) && e in this.wrappedObject;
  }
  entries() {
    return au(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var n of this.keys()) e(this.get(n), n, this);
  }
  delete(e) {
    de(this.wrappedObject, e) && delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys()) this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
function au(r, e) {
  return { next: () => {
    var n = r.next();
    return n.done ? n : { value: e(n.value), done: false };
  } };
}
function vr(r) {
  return typeof r == "number";
}
function Ar(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function iu(r) {
  return typeof r == "bigint";
}
function We(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function Ze(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function cn(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function Or(r) {
  return typeof r == "string";
}
var mr = Array.isArray;
function fr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function he(r) {
  return Array.isArray(r) || fr(r);
}
function vn(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Dn(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function pn(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function Je(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function ou(r) {
  return typeof r == "boolean";
}
function su(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function fu(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function lu(r) {
  return typeof r == "function";
}
function cu(r) {
  return r instanceof Date;
}
function vu(r) {
  return r instanceof RegExp;
}
function Qe(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !We(r) && !Ze(r));
}
function Du(r) {
  return r ? r instanceof Map || r instanceof uu || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
function pu(r) {
  return r === null;
}
function du(r) {
  return r === void 0;
}
function hu(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function mu(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function gu(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function yu(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Au(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function Fu(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function Eu(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Cu(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function wu(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function bu(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function _u(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function Bu(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function xu(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function Su(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function Mu(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function Nu(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function Tu(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function $r(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : Ar(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function ur(r) {
  var e = typeof r;
  if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
  if (typeof r.clone == "function") return r.clone();
  if (Array.isArray(r)) return r.map(function(n) {
    return ur(n);
  });
  if (r instanceof Date) return new Date(r.valueOf());
  if (Ar(r)) return r;
  if (Qe(r)) return zu(r, ur);
  if (e === "function") return r;
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function zu(r, e) {
  var n = {};
  for (var u in r) ne(r, u) && (n[u] = e(r[u]));
  return n;
}
function dn(r, e) {
  for (var n in e) ne(e, n) && (r[n] = e[n]);
  return r;
}
function Vr(r, e) {
  var n, u, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length) return false;
    for (u = 0, t = r.length; u < t; u++) if (!Vr(r[u], e[u])) return false;
    return true;
  } else {
    if (typeof r == "function") return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object)) return false;
      for (n in r) if (!(n in e) || !Vr(r[n], e[n])) return false;
      for (n in e) if (!(n in r)) return false;
      return true;
    } else return r === e;
  }
}
function ne(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function Ou(r, e) {
  for (var n = {}, u = 0; u < e.length; u++) {
    var t = e[u], a = r[t];
    a !== void 0 && (n[t] = a);
  }
  return n;
}
var $u = ["Matrix", "Array"], Iu = ["number", "BigNumber", "Fraction"], br = function(e) {
  if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(ln);
};
be(br, ln, { MATRIX_OPTIONS: $u, NUMBER_OPTIONS: Iu });
function Z(r, e, n, u) {
  function t(a) {
    var s = Ou(a, e.map(Uu));
    return qu(r, e, a), n(s);
  }
  return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), u && (t.meta = u), t;
}
function qu(r, e, n) {
  var u = e.filter((a) => !Ru(a)).every((a) => n[a] !== void 0);
  if (!u) {
    var t = e.filter((a) => n[a] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Ru(r) {
  return r && r[0] === "?";
}
function Uu(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function pr(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var Pu = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function $e(r, e, n) {
  var u = { 2: "0b", 8: "0o", 16: "0x" }, t = u[e], a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!pr(n)) throw new Error("size must be an integer");
    if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!pr(r)) throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** n), a = "i".concat(n);
  }
  var s = "";
  return r < 0 && (r = -r, s = "-"), "".concat(s).concat(t).concat(r.toString(e)).concat(a);
}
function qe(r, e) {
  if (typeof e == "function") return e(r);
  if (r === 1 / 0) return "Infinity";
  if (r === -1 / 0) return "-Infinity";
  if (isNaN(r)) return "NaN";
  var { notation: n, precision: u, wordSize: t } = hn(e);
  switch (n) {
    case "fixed":
      return Vu(r, u);
    case "exponential":
      return mn(r, u);
    case "engineering":
      return Lu(r, u);
    case "bin":
      return $e(r, 2, t);
    case "oct":
      return $e(r, 8, t);
    case "hex":
      return $e(r, 16, t);
    case "auto":
      return Wu(r, u, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], s = arguments[4];
        return a !== "." ? a + s : s;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function hn(r) {
  var e = "auto", n, u;
  if (r !== void 0) if (vr(r)) n = r;
  else if (Ar(r)) n = r.toNumber();
  else if (Qe(r)) r.precision !== void 0 && (n = ct(r.precision, () => {
    throw new Error('Option "precision" must be a number or BigNumber');
  })), r.wordSize !== void 0 && (u = ct(r.wordSize, () => {
    throw new Error('Option "wordSize" must be a number or BigNumber');
  })), r.notation && (e = r.notation);
  else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: n, wordSize: u };
}
function _e(r) {
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
function Lu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = _e(r), u = Be(n, e), t = u.exponent, a = u.coefficients, s = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if (vr(e)) for (; e > a.length || t - s + 1 > a.length; ) a.push(0);
  else for (var D = Math.abs(t - s) - (a.length - 1), f = 0; f < D; f++) a.push(0);
  for (var c = Math.abs(t - s), o = 1; c > 0; ) o++, c--;
  var l = a.slice(o).join(""), m = vr(e) && l.length || l.match(/[1-9]/) ? "." + l : "", v = a.slice(0, o).join("") + m + "e" + (t >= 0 ? "+" : "") + s.toString();
  return u.sign + v;
}
function Vu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = _e(r), u = typeof e == "number" ? Be(n, n.exponent + 1 + e) : n, t = u.coefficients, a = u.exponent + 1, s = a + (e || 0);
  return t.length < s && (t = t.concat(Hr(s - t.length))), a < 0 && (t = Hr(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), u.sign + t.join("");
}
function mn(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = _e(r), u = e ? Be(n, e) : n, t = u.coefficients, a = u.exponent;
  t.length < e && (t = t.concat(Hr(e - t.length)));
  var s = t.shift();
  return u.sign + s + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function Wu(r, e, n) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var u = vt(n == null ? void 0 : n.lowerExp, -3), t = vt(n == null ? void 0 : n.upperExp, 5), a = _e(r), s = e ? Be(a, e) : a;
  if (s.exponent < u || s.exponent >= t) return mn(r, e);
  var D = s.coefficients, f = s.exponent;
  D.length < e && (D = D.concat(Hr(e - D.length))), D = D.concat(Hr(f - D.length + 1 + (D.length < e ? e - D.length : 0))), D = Hr(-f).concat(D);
  var c = f > 0 ? f : 0;
  return c < D.length - 1 && D.splice(c + 1, 0, "."), s.sign + D.join("");
}
function Be(r, e) {
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
function Hr(r) {
  for (var e = [], n = 0; n < r; n++) e.push(0);
  return e;
}
function Zu(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function Ur(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), u);
}
function ct(r, e) {
  if (vr(r)) return r;
  if (Ar(r)) return r.toNumber();
  e();
}
function vt(r, e) {
  return vr(r) ? r : Ar(r) ? r.toNumber() : e;
}
var gn = function() {
  return gn = pe.create, pe;
}, Ju = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], Qu = Z("typed", Ju, function(e) {
  var { BigNumber: n, Complex: u, DenseMatrix: t, Fraction: a } = e, s = gn();
  return s.clear(), s.addTypes([{ name: "number", test: vr }, { name: "Complex", test: We }, { name: "BigNumber", test: Ar }, { name: "bigint", test: iu }, { name: "Fraction", test: Ze }, { name: "Unit", test: cn }, { name: "identifier", test: (D) => Or && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D) }, { name: "string", test: Or }, { name: "Chain", test: Tu }, { name: "Array", test: mr }, { name: "Matrix", test: fr }, { name: "DenseMatrix", test: vn }, { name: "SparseMatrix", test: Dn }, { name: "Range", test: pn }, { name: "Index", test: Je }, { name: "boolean", test: ou }, { name: "ResultSet", test: su }, { name: "Help", test: fu }, { name: "function", test: lu }, { name: "Date", test: cu }, { name: "RegExp", test: vu }, { name: "null", test: pu }, { name: "undefined", test: du }, { name: "AccessorNode", test: hu }, { name: "ArrayNode", test: mu }, { name: "AssignmentNode", test: gu }, { name: "BlockNode", test: yu }, { name: "ConditionalNode", test: Au }, { name: "ConstantNode", test: Fu }, { name: "FunctionNode", test: Cu }, { name: "FunctionAssignmentNode", test: Eu }, { name: "IndexNode", test: wu }, { name: "Node", test: bu }, { name: "ObjectNode", test: _u }, { name: "OperatorNode", test: Bu }, { name: "ParenthesisNode", test: xu }, { name: "RangeNode", test: Su }, { name: "RelationalNode", test: Mu }, { name: "SymbolNode", test: Nu }, { name: "Map", test: Du }, { name: "Object", test: Qe }]), s.addConversions([{ from: "number", to: "BigNumber", convert: function(f) {
    if (n || ce(f), Zu(f) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + f + "). Use function bignumber(x) to convert to BigNumber.");
    return new n(f);
  } }, { from: "number", to: "Complex", convert: function(f) {
    return u || ve(f), new u(f, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(f) {
    return u || ve(f), new u(f.toNumber(), 0);
  } }, { from: "bigint", to: "number", convert: function(f) {
    if (f > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + f + ")");
    return Number(f);
  } }, { from: "bigint", to: "BigNumber", convert: function(f) {
    return n || ce(f), new n(f.toString());
  } }, { from: "bigint", to: "Fraction", convert: function(f) {
    return a || De(f), new a(f);
  } }, { from: "Fraction", to: "BigNumber", convert: function(f) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(f) {
    return u || ve(f), new u(f.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(f) {
    a || De(f);
    var c = new a(f);
    if (c.valueOf() !== f) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + f + "). Use function fraction(x) to convert to Fraction.");
    return c;
  } }, { from: "string", to: "number", convert: function(f) {
    var c = Number(f);
    if (isNaN(c)) throw new Error('Cannot convert "' + f + '" to a number');
    return c;
  } }, { from: "string", to: "BigNumber", convert: function(f) {
    n || ce(f);
    try {
      return new n(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to BigNumber');
    }
  } }, { from: "string", to: "bigint", convert: function(f) {
    try {
      return BigInt(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to BigInt');
    }
  } }, { from: "string", to: "Fraction", convert: function(f) {
    a || De(f);
    try {
      return new a(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(f) {
    u || ve(f);
    try {
      return new u(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(f) {
    return +f;
  } }, { from: "boolean", to: "BigNumber", convert: function(f) {
    return n || ce(f), new n(+f);
  } }, { from: "boolean", to: "bigint", convert: function(f) {
    return BigInt(+f);
  } }, { from: "boolean", to: "Fraction", convert: function(f) {
    return a || De(f), new a(+f);
  } }, { from: "boolean", to: "string", convert: function(f) {
    return String(f);
  } }, { from: "Array", to: "Matrix", convert: function(f) {
    return t || Xu(), new t(f);
  } }, { from: "Matrix", to: "Array", convert: function(f) {
    return f.valueOf();
  } }]), s.onMismatch = (D, f, c) => {
    var o = s.createError(D, f, c);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && he(f[0]) && c.some((m) => !m.params.includes(","))) {
      var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw l.data = o.data, l;
    }
    throw o;
  }, s.onMismatch = (D, f, c) => {
    var o = s.createError(D, f, c);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && he(f[0]) && c.some((m) => !m.params.includes(","))) {
      var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw l.data = o.data, l;
    }
    throw o;
  }, s;
});
function ce(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function ve(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function Xu() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function De(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var Gu = "BigNumber", Yu = ["?on", "config"], Ku = Z(Gu, Yu, (r) => {
  var { on: e, config: n } = r, u = lt.clone({ precision: n.precision, modulo: lt.EUCLID });
  return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, u.fromJSON = function(t) {
    return new u(t.value);
  }, e && e("config", function(t, a) {
    t.precision !== a.precision && u.config({ precision: t.precision });
  }), u;
}, { isClass: true }), Hu = "Complex", ku = [], ju = Z(Hu, ku, () => (Object.defineProperty(wr, "name", { value: "Complex" }), wr.prototype.constructor = wr, wr.prototype.type = "Complex", wr.prototype.isComplex = true, wr.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, wr.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, wr.prototype.format = function(r) {
  var e = "", n = this.im, u = this.re, t = qe(this.re, r), a = qe(this.im, r), s = vr(r) ? r : r ? r.precision : null;
  if (s !== null) {
    var D = Math.pow(10, -s);
    Math.abs(u / n) < D && (u = 0), Math.abs(n / u) < D && (n = 0);
  }
  return n === 0 ? e = t : u === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = a + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + a.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + a + "i", e;
}, wr.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object") return wr(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], u = arguments[1];
      if (vr(n)) {
        if (cn(u) && u.hasBase("ANGLE") && (u = u.toNumber("rad")), vr(u)) return new wr({ r: n, phi: u });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, wr.prototype.valueOf = wr.prototype.toString, wr.fromJSON = function(r) {
  return new wr(r);
}, wr.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, wr), { isClass: true });
typeof BigInt > "u" && (BigInt = function(r) {
  if (isNaN(r)) throw new Error("");
  return r;
});
const H = BigInt(0), rr = BigInt(1), ue = BigInt(2), Re = BigInt(5), _r = BigInt(10), ra = 2e3, X = { s: rr, n: H, d: rr };
function Rr(r, e) {
  try {
    r = BigInt(r);
  } catch {
    throw Lr();
  }
  return r * e;
}
function zr(r) {
  return typeof r == "bigint" ? r : Math.floor(r);
}
function hr(r, e) {
  if (e === H) throw Xe();
  const n = Object.create(Tr.prototype);
  n.s = r < H ? -rr : rr, r = r < H ? -r : r;
  const u = Zr(r, e);
  return n.n = r / u, n.d = e / u, n;
}
function Kr(r) {
  const e = {};
  let n = r, u = ue, t = Re - rr;
  for (; t <= n; ) {
    for (; n % u === H; ) n /= u, e[u] = (e[u] || H) + rr;
    t += rr + ue * u++;
  }
  return n !== r ? n > 1 && (e[n] = (e[n] || H) + rr) : e[r] = (e[r] || H) + rr, e;
}
const Er = function(r, e) {
  let n = H, u = rr, t = rr;
  if (r != null) if (e !== void 0) {
    if (typeof r == "bigint") n = r;
    else {
      if (isNaN(r)) throw Lr();
      if (r % 1 !== 0) throw Dt();
      n = BigInt(r);
    }
    if (typeof e == "bigint") u = e;
    else {
      if (isNaN(e)) throw Lr();
      if (e % 1 !== 0) throw Dt();
      u = BigInt(e);
    }
    t = n * u;
  } else if (typeof r == "object") {
    if ("d" in r && "n" in r) n = BigInt(r.n), u = BigInt(r.d), "s" in r && (n *= BigInt(r.s));
    else if (0 in r) n = BigInt(r[0]), 1 in r && (u = BigInt(r[1]));
    else if (typeof r == "bigint") n = r;
    else throw Lr();
    t = n * u;
  } else if (typeof r == "number") {
    if (isNaN(r)) throw Lr();
    if (r < 0 && (t = -rr, r = -r), r % 1 === 0) n = BigInt(r);
    else {
      let a = 1, s = 0, D = 1, f = 1, c = 1, o = 1e7;
      for (r >= 1 && (a = 10 ** Math.floor(1 + Math.log10(r)), r /= a); D <= o && c <= o; ) {
        let l = (s + f) / (D + c);
        if (r === l) {
          D + c <= o ? (n = s + f, u = D + c) : c > D ? (n = f, u = c) : (n = s, u = D);
          break;
        } else r > l ? (s += f, D += c) : (f += s, c += D), D > o ? (n = f, u = c) : (n = s, u = D);
      }
      n = BigInt(n) * BigInt(a), u = BigInt(u);
    }
  } else if (typeof r == "string") {
    let a = 0, s = H, D = H, f = H, c = rr, o = rr, l = r.replace(/_/g, "").match(/\d+|./g);
    if (l === null) throw Lr();
    if (l[a] === "-" ? (t = -rr, a++) : l[a] === "+" && a++, l.length === a + 1 ? D = Rr(l[a++], t) : l[a + 1] === "." || l[a] === "." ? (l[a] !== "." && (s = Rr(l[a++], t)), a++, (a + 1 === l.length || l[a + 1] === "(" && l[a + 3] === ")" || l[a + 1] === "'" && l[a + 3] === "'") && (D = Rr(l[a], t), c = _r ** BigInt(l[a].length), a++), (l[a] === "(" && l[a + 2] === ")" || l[a] === "'" && l[a + 2] === "'") && (f = Rr(l[a + 1], t), o = _r ** BigInt(l[a + 1].length) - rr, a += 3)) : l[a + 1] === "/" || l[a + 1] === ":" ? (D = Rr(l[a], t), c = Rr(l[a + 2], rr), a += 3) : l[a + 3] === "/" && l[a + 1] === " " && (s = Rr(l[a], t), D = Rr(l[a + 2], t), c = Rr(l[a + 4], rr), a += 5), l.length <= a) u = c * o, t = n = f + u * s + o * D;
    else throw Lr();
  } else if (typeof r == "bigint") n = r, t = r, u = rr;
  else throw Lr();
  if (u === H) throw Xe();
  X.s = t < H ? -rr : rr, X.n = n < H ? -n : n, X.d = u < H ? -u : u;
};
function ea(r, e, n) {
  let u = rr;
  for (; e > H; r = r * r % n, e >>= rr) e & rr && (u = u * r % n);
  return u;
}
function ta(r, e) {
  for (; e % ue === H; e /= ue) ;
  for (; e % Re === H; e /= Re) ;
  if (e === rr) return H;
  let n = _r % e, u = 1;
  for (; n !== rr; u++) if (n = n * _r % e, u > ra) return H;
  return BigInt(u);
}
function na(r, e, n) {
  let u = rr, t = ea(_r, n, e);
  for (let a = 0; a < 300; a++) {
    if (u === t) return BigInt(a);
    u = u * _r % e, t = t * _r % e;
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
function Tr(r, e) {
  if (Er(r, e), this instanceof Tr) r = Zr(X.d, X.n), this.s = X.s, this.n = X.n / r, this.d = X.d / r;
  else return hr(X.s * X.n, X.d);
}
var Xe = function() {
  return new Error("Division by Zero");
}, Lr = function() {
  return new Error("Invalid argument");
}, Dt = function() {
  return new Error("Parameters must be integer");
};
Tr.prototype = { s: rr, n: H, d: rr, abs: function() {
  return hr(this.n, this.d);
}, neg: function() {
  return hr(-this.s * this.n, this.d);
}, add: function(r, e) {
  return Er(r, e), hr(this.s * this.n * X.d + X.s * this.d * X.n, this.d * X.d);
}, sub: function(r, e) {
  return Er(r, e), hr(this.s * this.n * X.d - X.s * this.d * X.n, this.d * X.d);
}, mul: function(r, e) {
  return Er(r, e), hr(this.s * X.s * this.n * X.n, this.d * X.d);
}, div: function(r, e) {
  return Er(r, e), hr(this.s * X.s * this.n * X.d, this.d * X.n);
}, clone: function() {
  return hr(this.s * this.n, this.d);
}, mod: function(r, e) {
  if (r === void 0) return hr(this.s * this.n % this.d, rr);
  if (Er(r, e), H === X.n * this.d) throw Xe();
  return hr(this.s * (X.d * this.n) % (X.n * this.d), X.d * this.d);
}, gcd: function(r, e) {
  return Er(r, e), hr(Zr(X.n, this.n) * Zr(X.d, this.d), X.d * this.d);
}, lcm: function(r, e) {
  return Er(r, e), X.n === H && this.n === H ? hr(H, rr) : hr(X.n * this.n, Zr(X.n, this.n) * Zr(X.d, this.d));
}, inverse: function() {
  return hr(this.s * this.d, this.n);
}, pow: function(r, e) {
  if (Er(r, e), X.d === rr) return X.s < H ? hr((this.s * this.d) ** X.n, this.n ** X.n) : hr((this.s * this.n) ** X.n, this.d ** X.n);
  if (this.s < H) return null;
  let n = Kr(this.n), u = Kr(this.d), t = rr, a = rr;
  for (let s in n) if (s !== "1") {
    if (s === "0") {
      t = H;
      break;
    }
    if (n[s] *= X.n, n[s] % X.d === H) n[s] /= X.d;
    else return null;
    t *= BigInt(s) ** n[s];
  }
  for (let s in u) if (s !== "1") {
    if (u[s] *= X.n, u[s] % X.d === H) u[s] /= X.d;
    else return null;
    a *= BigInt(s) ** u[s];
  }
  return X.s < H ? hr(a, t) : hr(t, a);
}, log: function(r, e) {
  if (Er(r, e), this.s <= H || X.s <= H) return null;
  const n = {}, u = Kr(X.n), t = Kr(X.d), a = Kr(this.n), s = Kr(this.d);
  for (const c in t) u[c] = (u[c] || H) - t[c];
  for (const c in s) a[c] = (a[c] || H) - s[c];
  for (const c in u) c !== "1" && (n[c] = true);
  for (const c in a) c !== "1" && (n[c] = true);
  let D = null, f = null;
  for (const c in n) {
    const o = u[c] || H, l = a[c] || H;
    if (o === H) {
      if (l !== H) return null;
      continue;
    }
    let m = l, v = o;
    const p = Zr(m, v);
    if (m /= p, v /= p, D === null && f === null) D = m, f = v;
    else if (m * f !== D * v) return null;
  }
  return D !== null && f !== null ? hr(D, f) : null;
}, equals: function(r, e) {
  return Er(r, e), this.s * this.n * X.d === X.s * X.n * this.d;
}, lt: function(r, e) {
  return Er(r, e), this.s * this.n * X.d < X.s * X.n * this.d;
}, lte: function(r, e) {
  return Er(r, e), this.s * this.n * X.d <= X.s * X.n * this.d;
}, gt: function(r, e) {
  return Er(r, e), this.s * this.n * X.d > X.s * X.n * this.d;
}, gte: function(r, e) {
  return Er(r, e), this.s * this.n * X.d >= X.s * X.n * this.d;
}, compare: function(r, e) {
  Er(r, e);
  let n = this.s * this.n * X.d - X.s * X.n * this.d;
  return (H < n) - (n < H);
}, ceil: function(r) {
  return r = _r ** BigInt(r || 0), hr(zr(this.s * r * this.n / this.d) + (r * this.n % this.d > H && this.s >= H ? rr : H), r);
}, floor: function(r) {
  return r = _r ** BigInt(r || 0), hr(zr(this.s * r * this.n / this.d) - (r * this.n % this.d > H && this.s < H ? rr : H), r);
}, round: function(r) {
  return r = _r ** BigInt(r || 0), hr(zr(this.s * r * this.n / this.d) + this.s * ((this.s >= H ? rr : H) + ue * (r * this.n % this.d) > this.d ? rr : H), r);
}, roundTo: function(r, e) {
  Er(r, e);
  const n = this.n * X.d, u = this.d * X.n, t = n % u;
  let a = zr(n / u);
  return t + t >= u && a++, hr(this.s * a * X.n, X.d);
}, divisible: function(r, e) {
  return Er(r, e), !(!(X.n * this.d) || this.n * X.d % (X.n * this.d));
}, valueOf: function() {
  return Number(this.s * this.n) / Number(this.d);
}, toString: function(r) {
  let e = this.n, n = this.d;
  r = r || 15;
  let u = ta(e, n), t = na(e, n, u), a = this.s < H ? "-" : "";
  if (a += zr(e / n), e %= n, e *= _r, e && (a += "."), u) {
    for (let s = t; s--; ) a += zr(e / n), e %= n, e *= _r;
    a += "(";
    for (let s = u; s--; ) a += zr(e / n), e %= n, e *= _r;
    a += ")";
  } else for (let s = r; e && s--; ) a += zr(e / n), e %= n, e *= _r;
  return a;
}, toFraction: function(r) {
  let e = this.n, n = this.d, u = this.s < H ? "-" : "";
  if (n === rr) u += e;
  else {
    let t = zr(e / n);
    r && t > H && (u += t, u += " ", e %= n), u += e, u += "/", u += n;
  }
  return u;
}, toLatex: function(r) {
  let e = this.n, n = this.d, u = this.s < H ? "-" : "";
  if (n === rr) u += e;
  else {
    let t = zr(e / n);
    r && t > H && (u += t, e %= n), u += "\\frac{", u += e, u += "}{", u += n, u += "}";
  }
  return u;
}, toContinued: function() {
  let r = this.n, e = this.d, n = [];
  do {
    n.push(zr(r / e));
    let u = r % e;
    r = e, e = u;
  } while (r !== rr);
  return n;
}, simplify: function(r) {
  const e = BigInt(1 / (r || 1e-3) | 0), n = this.abs(), u = n.toContinued();
  for (let t = 1; t < u.length; t++) {
    let a = hr(u[t - 1], rr);
    for (let D = t - 2; D >= 0; D--) a = a.inverse().add(u[D]);
    let s = a.sub(n);
    if (s.n * e < s.d) return a.mul(this.s);
  }
  return this;
} };
var ua = "Fraction", aa = [], ia = Z(ua, aa, () => (Object.defineProperty(Tr, "name", { value: "Fraction" }), Tr.prototype.constructor = Tr, Tr.prototype.type = "Fraction", Tr.prototype.isFraction = true, Tr.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: String(this.s * this.n), d: String(this.d) };
}, Tr.fromJSON = function(r) {
  return new Tr(r);
}, Tr), { isClass: true }), oa = "Matrix", sa = [], fa = Z(oa, sa, () => {
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
function Ie(r, e, n) {
  var u = r.constructor, t = new u(2), a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!pr(n)) throw new Error("size must be an integer");
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
function la(r, e) {
  if (typeof e == "function") return e(r);
  if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: n, precision: u, wordSize: t } = hn(e);
  switch (n) {
    case "fixed":
      return va(r, u);
    case "exponential":
      return pt(r, u);
    case "engineering":
      return ca(r, u);
    case "bin":
      return Ie(r, 2, t);
    case "oct":
      return Ie(r, 8, t);
    case "hex":
      return Ie(r, 16, t);
    case "auto": {
      var a = dt(e == null ? void 0 : e.lowerExp, -3), s = dt(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero()) return "0";
      var D, f = r.toSignificantDigits(u), c = f.e;
      return c >= a && c < s ? D = f.toFixed() : D = pt(r, u), D.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], l = arguments[4];
        return o !== "." ? o + l : l;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function ca(r, e) {
  var n = r.e, u = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -u)), a = t.toPrecision(e);
  if (a.includes("e")) {
    var s = r.constructor;
    a = new s(a).toFixed();
  }
  return a + "e" + (n >= 0 ? "+" : "") + u.toString();
}
function pt(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function va(r, e) {
  return r.toFixed(e);
}
function dt(r, e) {
  return vr(r) ? r : Ar(r) ? r.toNumber() : e;
}
function dr(r, e) {
  var n = Da(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function Da(r, e) {
  if (typeof r == "number") return qe(r, e);
  if (Ar(r)) return la(r, e);
  if (pa(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
  if (Array.isArray(r)) return yn(r, e);
  if (Or(r)) return ht(r);
  if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function") return r.format(e);
    if (r && r.toString(e) !== {}.toString()) return r.toString(e);
    var n = Object.keys(r).map((u) => ht(u) + ": " + dr(r[u], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function ht(r) {
  for (var e = String(r), n = "", u = 0; u < e.length; ) {
    var t = e.charAt(u);
    n += t in mt ? mt[t] : t, u++;
  }
  return '"' + n + '"';
}
var mt = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function yn(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", u = r.length, t = 0; t < u; t++) t !== 0 && (n += ", "), n += yn(r[t], e);
    return n += "]", n;
  } else return dr(r, e);
}
function pa(r) {
  return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
}
function ar(r, e, n) {
  if (!(this instanceof ar)) throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
ar.prototype = new RangeError();
ar.prototype.constructor = RangeError;
ar.prototype.name = "DimensionError";
ar.prototype.isDimensionError = true;
function Jr(r, e, n) {
  if (!(this instanceof Jr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Jr.prototype = new RangeError();
Jr.prototype.constructor = RangeError;
Jr.prototype.name = "IndexError";
Jr.prototype.isIndexError = true;
function sr(r) {
  for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
  return e;
}
function An(r, e, n) {
  var u, t = r.length;
  if (t !== e[n]) throw new ar(t, e[n]);
  if (n < e.length - 1) {
    var a = n + 1;
    for (u = 0; u < t; u++) {
      var s = r[u];
      if (!Array.isArray(s)) throw new ar(e.length - 1, e.length, "<");
      An(r[u], e, a);
    }
  } else for (u = 0; u < t; u++) if (Array.isArray(r[u])) throw new ar(e.length + 1, e.length, ">");
}
function gt(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r)) throw new ar(r.length, 0);
  } else An(r, e, 0);
}
function yr(r, e) {
  if (r !== void 0) {
    if (!vr(r) || !pr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e) throw new Jr(r, e);
  }
}
function me(r, e, n) {
  if (!Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!vr(t) || !pr(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + dr(e) + ")");
  }), (vr(r) || Ar(r)) && (r = [r]);
  var u = n !== void 0 ? n : 0;
  return Ue(r, e, 0, u), r;
}
function Ue(r, e, n, u) {
  var t, a, s = r.length, D = e[n], f = Math.min(s, D);
  if (r.length = D, n < e.length - 1) {
    var c = n + 1;
    for (t = 0; t < f; t++) a = r[t], Array.isArray(a) || (a = [a], r[t] = a), Ue(a, e, c, u);
    for (t = f; t < D; t++) a = [], r[t] = a, Ue(a, e, c, u);
  } else {
    for (t = 0; t < f; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
    for (t = f; t < D; t++) r[t] = u;
  }
}
function Ge(r, e) {
  var n = Pe(r, true), u = n.length;
  if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new ar(0, u, "!=");
  e = Ye(e, u);
  var t = Fn(e);
  if (u !== t) throw new ar(t, u, "!=");
  try {
    return da(n, e);
  } catch (a) {
    throw a instanceof ar ? new ar(t, u, "!=") : a;
  }
}
function Ye(r, e) {
  var n = Fn(r), u = r.slice(), t = -1, a = r.indexOf(t), s = r.indexOf(t, a + 1) >= 0;
  if (s) throw new Error("More than one wildcard in sizes");
  var D = a >= 0, f = e % n === 0;
  if (D) if (f) u[a] = -e / n;
  else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return u;
}
function Fn(r) {
  return r.reduce((e, n) => e * n, 1);
}
function da(r, e) {
  for (var n = r, u, t = e.length - 1; t > 0; t--) {
    var a = e[t];
    u = [];
    for (var s = n.length / a, D = 0; D < s; D++) u.push(n.slice(D * a, (D + 1) * a));
    n = u;
  }
  return n;
}
function yt(r, e) {
  for (var n = sr(r); Array.isArray(r) && r.length === 1; ) r = r[0], n.shift();
  for (var u = n.length; n[u - 1] === 1; ) u--;
  return u < n.length && (r = En(r, u, 0), n.length = u), r;
}
function En(r, e, n) {
  var u, t;
  if (n < e) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = En(r[u], e, a);
  } else for (; Array.isArray(r); ) r = r[0];
  return r;
}
function Cn(r, e, n, u) {
  var t = u || sr(r);
  if (n) for (var a = 0; a < n; a++) r = [r], t.unshift(1);
  for (r = wn(r, e, 0); t.length < e; ) t.push(1);
  return r;
}
function wn(r, e, n) {
  var u, t;
  if (Array.isArray(r)) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = wn(r[u], e, a);
  } else for (var s = n; s < e; s++) r = [r];
  return r;
}
function Pe(r) {
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
function xe(r, e) {
  for (var n, u = 0, t = 0; t < r.length; t++) {
    var a = r[t], s = Array.isArray(a);
    if (t === 0 && s && (u = a.length), s && a.length !== u) return;
    var D = s ? xe(a, e) : e(a);
    if (n === void 0) n = D;
    else if (n !== D) return "mixed";
  }
  return n;
}
function bn(r, e, n, u) {
  if (u < n) {
    if (r.length !== e.length) throw new ar(r.length, e.length);
    for (var t = [], a = 0; a < r.length; a++) t[a] = bn(r[a], e[a], n, u + 1);
    return t;
  } else return r.concat(e);
}
function _n() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1) return r[0];
  if (r.length > 1) return r.slice(1).reduce(function(n, u) {
    return bn(n, u, e, 0);
  }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Bn() {
  for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
  for (var u = e.map((m) => m.length), t = Math.max(...u), a = new Array(t).fill(null), s = 0; s < e.length; s++) for (var D = e[s], f = u[s], c = 0; c < f; c++) {
    var o = t - f + c;
    D[c] > a[o] && (a[o] = D[c]);
  }
  for (var l = 0; l < e.length; l++) xn(e[l], a);
  return a;
}
function xn(r, e) {
  for (var n = e.length, u = r.length, t = 0; t < u; t++) {
    var a = n - u + t;
    if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(u, " with size ").concat(r[t], " to size ").concat(e[a]));
  }
}
function Le(r, e) {
  var n = sr(r);
  if (Vr(n, e)) return r;
  xn(n, e);
  var u = Bn(n, e), t = u.length, a = [...Array(t - n.length).fill(1), ...n], s = ma(r);
  n.length < t && (s = Ge(s, a), n = sr(s));
  for (var D = 0; D < t; D++) n[D] < u[D] && (s = ha(s, u[D], D), n = sr(s));
  return s;
}
function ha(r, e, n) {
  return _n(...Array(e).fill(r), n);
}
function Sn(r, e) {
  if (!Array.isArray(r)) throw new Error("Array expected");
  var n = sr(r);
  if (e.length !== n.length) throw new ar(e.length, n.length);
  for (var u = 0; u < e.length; u++) yr(e[u], n[u]);
  return e.reduce((t, a) => t[a], r);
}
function At(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  if (r.length === 0) return [];
  if (n) return a(r);
  var u = [];
  return t(r, 0);
  function t(s, D) {
    if (Array.isArray(s)) {
      for (var f = s.length, c = Array(f), o = 0; o < f; o++) u[D] = o, c[o] = t(s[o], D + 1);
      return c;
    } else return e(s, u.slice(0, D), r);
  }
  function a(s) {
    if (Array.isArray(s)) {
      for (var D = s.length, f = Array(D), c = 0; c < D; c++) f[c] = a(s[c]);
      return f;
    } else return e(s);
  }
}
function ma(r) {
  return be([], r);
}
function ge(r, e, n) {
  var u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (pe.isTypedFunction(r)) {
    var t;
    if (u) t = 1;
    else {
      var a = (e.isMatrix ? e.size() : sr(e)).map(() => 0), s = e.isMatrix ? e.get(a) : Sn(e, a);
      t = Aa(r, s, a, e);
    }
    var D;
    if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
      var f = ga(r, t);
      D = f !== void 0 ? f : r;
    } else D = r;
    return t >= 1 && t <= 3 ? { isUnary: t === 1, fn: function() {
      for (var o = arguments.length, l = new Array(o), m = 0; m < o; m++) l[m] = arguments[m];
      return Ft(D, l.slice(0, t), n, r.name);
    } } : { isUnary: false, fn: function() {
      for (var o = arguments.length, l = new Array(o), m = 0; m < o; m++) l[m] = arguments[m];
      return Ft(D, l, n, r.name);
    } };
  }
  return u === void 0 ? { isUnary: ya(r), fn: r } : { isUnary: u, fn: r };
}
function ga(r, e) {
  var n = [];
  if (Object.entries(r.signatures).forEach((u) => {
    var [t, a] = u;
    t.split(",").length === e && n.push(a);
  }), n.length === 1) return n[0];
}
function ya(r) {
  if (r.length !== 1) return false;
  var e = r.toString();
  if (/arguments/.test(e)) return false;
  var n = e.match(/\(.*?\)/);
  return !/\.\.\./.test(n);
}
function Aa(r, e, n, u) {
  for (var t = [e, n, u], a = 3; a > 0; a--) {
    var s = t.slice(0, a);
    if (pe.resolve(r, s) !== null) return a;
  }
}
function Ft(r, e, n, u) {
  try {
    return r(...e);
  } catch (t) {
    Fa(t, e, n, u);
  }
}
function Fa(r, e, n, u) {
  var t;
  if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
    var a = [];
    throw a.push("value: ".concat($r(e[0]))), e.length >= 2 && a.push("index: ".concat($r(e[1]))), e.length >= 3 && a.push("array: ".concat($r(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(u, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
  } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(u, ": ").concat(r.message));
}
var Ea = "DenseMatrix", Ca = ["Matrix"], wa = Z(Ea, Ca, (r) => {
  var { Matrix: e } = r;
  function n(o, l) {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    if (l && !Or(l)) throw new Error("Invalid datatype: " + l);
    if (fr(o)) o.type === "DenseMatrix" ? (this._data = ur(o._data), this._size = ur(o._size), this._datatype = l || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = l || o._datatype);
    else if (o && mr(o.data) && mr(o.size)) this._data = o.data, this._size = o.size, gt(this._data, this._size), this._datatype = l || o.datatype;
    else if (mr(o)) this._data = c(o), this._size = sr(this._data), gt(this._data, this._size), this._datatype = l;
    else {
      if (o) throw new TypeError("Unsupported type of data (" + $r(o) + ")");
      this._data = [], this._size = [0], this._datatype = l;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(o, l) {
    return new n(o, l);
  }, Object.defineProperty(n, "name", { value: "DenseMatrix" }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
    return xe(this._data, $r);
  }, n.prototype.storage = function() {
    return "dense";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(o, l) {
    return new n(o, l);
  }, n.prototype.subset = function(o, l, m) {
    switch (arguments.length) {
      case 1:
        return u(this, o);
      case 2:
      case 3:
        return a(this, o, l, m);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.get = function(o) {
    return Sn(this._data, o);
  }, n.prototype.set = function(o, l, m) {
    if (!mr(o)) throw new TypeError("Array expected");
    if (o.length < this._size.length) throw new ar(o.length, this._size.length, "<");
    var v, p, i, d = o.map(function(C) {
      return C + 1;
    });
    f(this, d, m);
    var h = this._data;
    for (v = 0, p = o.length - 1; v < p; v++) i = o[v], yr(i, h.length), h = h[i];
    return i = o[o.length - 1], yr(i, h.length), h[i] = l, this;
  };
  function u(o, l) {
    if (!Je(l)) throw new TypeError("Invalid index");
    var m = l.isScalar();
    if (m) return o.get(l.min());
    var v = l.size();
    if (v.length !== o._size.length) throw new ar(v.length, o._size.length);
    for (var p = l.min(), i = l.max(), d = 0, h = o._size.length; d < h; d++) yr(p[d], o._size[d]), yr(i[d], o._size[d]);
    return new n(t(o._data, l, v.length, 0), o._datatype);
  }
  function t(o, l, m, v) {
    var p = v === m - 1, i = l.dimension(v);
    return p ? i.map(function(d) {
      return yr(d, o.length), o[d];
    }).valueOf() : i.map(function(d) {
      yr(d, o.length);
      var h = o[d];
      return t(h, l, m, v + 1);
    }).valueOf();
  }
  function a(o, l, m, v) {
    if (!l || l.isIndex !== true) throw new TypeError("Invalid index");
    var p = l.size(), i = l.isScalar(), d;
    if (fr(m) ? (d = m.size(), m = m.valueOf()) : d = sr(m), i) {
      if (d.length !== 0) throw new TypeError("Scalar expected");
      o.set(l.min(), m, v);
    } else {
      if (!Vr(d, p)) try {
        d.length === 0 ? m = Le([m], p) : m = Le(m, p), d = sr(m);
      } catch {
      }
      if (p.length < o._size.length) throw new ar(p.length, o._size.length, "<");
      if (d.length < p.length) {
        for (var h = 0, C = 0; p[h] === 1 && d[h] === 1; ) h++;
        for (; p[h] === 1; ) C++, h++;
        m = Cn(m, p.length, C, d);
      }
      if (!Vr(p, d)) throw new ar(p, d, ">");
      var y = l.max().map(function(A) {
        return A + 1;
      });
      f(o, y, v);
      var w = p.length, F = 0;
      s(o._data, l, m, w, F);
    }
    return o;
  }
  function s(o, l, m, v, p) {
    var i = p === v - 1, d = l.dimension(p);
    i ? d.forEach(function(h, C) {
      yr(h), o[h] = m[C[0]];
    }) : d.forEach(function(h, C) {
      yr(h), s(o[h], l, m[C[0]], v, p + 1);
    });
  }
  n.prototype.resize = function(o, l, m) {
    if (!he(o)) throw new TypeError("Array or Matrix expected");
    var v = o.valueOf().map((i) => Array.isArray(i) && i.length === 1 ? i[0] : i), p = m ? this.clone() : this;
    return D(p, v, l);
  };
  function D(o, l, m) {
    if (l.length === 0) {
      for (var v = o._data; mr(v); ) v = v[0];
      return v;
    }
    return o._size = l.slice(0), o._data = me(o._data, o._size, m), o;
  }
  n.prototype.reshape = function(o, l) {
    var m = l ? this.clone() : this;
    m._data = Ge(m._data, o);
    var v = m._size.reduce((p, i) => p * i);
    return m._size = Ye(o, v), m;
  };
  function f(o, l, m) {
    for (var v = o._size.slice(0), p = false; v.length < l.length; ) v.push(0), p = true;
    for (var i = 0, d = l.length; i < d; i++) l[i] > v[i] && (v[i] = l[i], p = true);
    p && D(o, v, m);
  }
  n.prototype.clone = function() {
    var o = new n({ data: ur(this._data), size: ur(this._size), datatype: this._datatype });
    return o;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype._forEach = function(o) {
    var l = o.length === 2, m = this._size.length - 1;
    if (m < 0) return;
    if (l) {
      d(this._data);
      return;
    }
    if (m === 0) {
      for (var v = 0; v < this._data.length; v++) o(this._data, v, [v]);
      return;
    }
    var p = new Array(m + 1);
    i(this._data);
    function i(h) {
      var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (C < m) for (var y = 0; y < h.length; y++) p[C] = y, i(h[y], C + 1);
      else for (var w = 0; w < h.length; w++) p[C] = w, o(h, w, p.slice());
    }
    function d(h) {
      var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (C < m) for (var y = 0; y < h.length; y++) d(h[y], C + 1);
      else for (var w = 0; w < h.length; w++) o(h, w);
    }
  }, n.prototype.map = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, m = this, v = new n(m), p = ge(o, m._data, "map", l), i = l || p.isUnary ? (d, h) => {
      d[h] = p.fn(d[h]);
    } : (d, h, C) => {
      d[h] = p.fn(d[h], C, m);
    };
    return v._forEach(i), v;
  }, n.prototype.forEach = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, m = this, v = ge(o, m._data, "map", l), p = l || v.isUnary ? (i, d) => {
      v.fn(i[d]);
    } : (i, d, h) => {
      v.fn(i[d], h, m);
    };
    m._forEach(p);
  }, n.prototype[Symbol.iterator] = function* () {
    var o = this._size.length - 1;
    if (!(o < 0)) {
      if (o === 0) {
        for (var l = 0; l < this._data.length; l++) yield { value: this._data[l], index: [l] };
        return;
      }
      var m = [], v = function* (i, d) {
        if (d < o) for (var h = 0; h < i.length; h++) m[d] = h, yield* v(i[h], d + 1);
        else for (var C = 0; C < i.length; C++) m[d] = C, yield { value: i[C], index: m.slice() };
      };
      yield* v(this._data, 0);
    }
  }, n.prototype.rows = function() {
    var o = [], l = this.size();
    if (l.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    var m = this._data;
    for (var v of m) o.push(new n([v], this._datatype));
    return o;
  }, n.prototype.columns = function() {
    var o = this, l = [], m = this.size();
    if (m.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var v = this._data, p = function(h) {
      var C = v.map((y) => [y[h]]);
      l.push(new n(C, o._datatype));
    }, i = 0; i < m[1]; i++) p(i);
    return l;
  }, n.prototype.toArray = function() {
    return ur(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(o) {
    return dr(this._data, o);
  }, n.prototype.toString = function() {
    return dr(this._data);
  }, n.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(o) {
    if (o) {
      if (Ar(o) && (o = o.toNumber()), !vr(o) || !pr(o)) throw new TypeError("The parameter k must be an integer number");
    } else o = 0;
    for (var l = o > 0 ? o : 0, m = o < 0 ? -o : 0, v = this._size[0], p = this._size[1], i = Math.min(v - m, p - l), d = [], h = 0; h < i; h++) d[h] = this._data[h + m][h + l];
    return new n({ data: d, size: [i], datatype: this._datatype });
  }, n.diagonal = function(o, l, m, v) {
    if (!mr(o)) throw new TypeError("Array expected, size parameter");
    if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(b) {
      if (Ar(b) && (b = b.toNumber()), !vr(b) || !pr(b) || b < 1) throw new Error("Size values must be positive integers");
      return b;
    }), m) {
      if (Ar(m) && (m = m.toNumber()), !vr(m) || !pr(m)) throw new TypeError("The parameter k must be an integer number");
    } else m = 0;
    var p = m > 0 ? m : 0, i = m < 0 ? -m : 0, d = o[0], h = o[1], C = Math.min(d - i, h - p), y;
    if (mr(l)) {
      if (l.length !== C) throw new Error("Invalid value array length");
      y = function(E) {
        return l[E];
      };
    } else if (fr(l)) {
      var w = l.size();
      if (w.length !== 1 || w[0] !== C) throw new Error("Invalid matrix length");
      y = function(E) {
        return l.get([E]);
      };
    } else y = function() {
      return l;
    };
    v || (v = Ar(y(0)) ? y(0).mul(0) : 0);
    var F = [];
    if (o.length > 0) {
      F = me(F, o, v);
      for (var A = 0; A < C; A++) F[A + i][A + p] = y(A);
    }
    return new n({ data: F, size: [d, h] });
  }, n.fromJSON = function(o) {
    return new n(o);
  }, n.prototype.swapRows = function(o, l) {
    if (!vr(o) || !pr(o) || !vr(l) || !pr(l)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return yr(o, this._size[0]), yr(l, this._size[0]), n._swapRows(o, l, this._data), this;
  }, n._swapRows = function(o, l, m) {
    var v = m[o];
    m[o] = m[l], m[l] = v;
  };
  function c(o) {
    return fr(o) ? c(o.valueOf()) : mr(o) ? o.map(c) : o;
  }
  return n;
}, { isClass: true });
function Mr(r, e, n) {
  if (!n) return fr(r) ? r.map((t) => e(t), false, true) : At(r, e, true);
  var u = (t) => t === 0 ? t : e(t);
  return fr(r) ? r.map((t) => u(t), false, true) : At(r, u, true);
}
var Et = "isInteger", ba = ["typed"], _a = Z(Et, ba, (r) => {
  var { typed: e } = r;
  return e(Et, { number: pr, BigNumber: function(u) {
    return u.isInt();
  }, bigint: function(u) {
    return true;
  }, Fraction: function(u) {
    return u.d === 1n;
  }, "Array | Matrix": e.referToSelf((n) => (u) => Mr(u, n)) });
}), Ke = "number", Se = "number, number";
function Mn(r) {
  return Math.abs(r);
}
Mn.signature = Ke;
function Nn(r, e) {
  return r + e;
}
Nn.signature = Se;
function Tn(r, e) {
  return r - e;
}
Tn.signature = Se;
function zn(r, e) {
  return r * e;
}
zn.signature = Se;
function On(r) {
  return -r;
}
On.signature = Ke;
function Ve(r) {
  return Pu(r);
}
Ve.signature = Ke;
function $n(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
$n.signature = Se;
var Ba = "number";
function In(r) {
  return r > 0;
}
In.signature = Ba;
function kr(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), u));
}
var Ct = "isPositive", xa = ["typed", "config"], Sa = Z(Ct, xa, (r) => {
  var { typed: e, config: n } = r;
  return e(Ct, { number: (u) => Ur(u, 0, n.relTol, n.absTol) ? false : In(u), BigNumber: (u) => kr(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(), bigint: (u) => u > 0n, Fraction: (u) => u.s > 0n && u.n > 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Mr(t, u)) });
}), wt = "isZero", Ma = ["typed", "equalScalar"], Na = Z(wt, Ma, (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(wt, { "number | BigNumber | Complex | Fraction": (u) => n(u, 0), bigint: (u) => u === 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Mr(t, u)) });
});
function Ta(r, e, n, u) {
  return Ur(r.re, e.re, n, u) && Ur(r.im, e.im, n, u);
}
var ae = Z("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
    return e.find(n, [u.valueType(), t.valueType()])(u.value, t.value);
  }) };
}), ye = "equalScalar", za = ["typed", "config"], Oa = Z(ye, za, (r) => {
  var { typed: e, config: n } = r, u = ae({ typed: e });
  return e(ye, { "boolean, boolean": function(a, s) {
    return a === s;
  }, "number, number": function(a, s) {
    return Ur(a, s, n.relTol, n.absTol);
  }, "BigNumber, BigNumber": function(a, s) {
    return a.eq(s) || kr(a, s, n.relTol, n.absTol);
  }, "bigint, bigint": function(a, s) {
    return a === s;
  }, "Fraction, Fraction": function(a, s) {
    return a.equals(s);
  }, "Complex, Complex": function(a, s) {
    return Ta(a, s, n.relTol, n.absTol);
  } }, u);
});
Z(ye, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(ye, { "number, number": function(t, a) {
    return Ur(t, a, n.relTol, n.absTol);
  } });
});
var $a = "SparseMatrix", Ia = ["typed", "equalScalar", "Matrix"], qa = Z($a, Ia, (r) => {
  var { typed: e, equalScalar: n, Matrix: u } = r;
  function t(i, d) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (d && !Or(d)) throw new Error("Invalid datatype: " + d);
    if (fr(i)) a(this, i, d);
    else if (i && mr(i.index) && mr(i.ptr) && mr(i.size)) this._values = i.values, this._index = i.index, this._ptr = i.ptr, this._size = i.size, this._datatype = d || i.datatype;
    else if (mr(i)) s(this, i, d);
    else {
      if (i) throw new TypeError("Unsupported type of data (" + $r(i) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = d;
    }
  }
  function a(i, d, h) {
    d.type === "SparseMatrix" ? (i._values = d._values ? ur(d._values) : void 0, i._index = ur(d._index), i._ptr = ur(d._ptr), i._size = ur(d._size), i._datatype = h || d._datatype) : s(i, d.valueOf(), h || d._datatype);
  }
  function s(i, d, h) {
    i._values = [], i._index = [], i._ptr = [], i._datatype = h;
    var C = d.length, y = 0, w = n, F = 0;
    if (Or(h) && (w = e.find(n, [h, h]) || n, F = e.convert(0, h)), C > 0) {
      var A = 0;
      do {
        i._ptr.push(i._index.length);
        for (var b = 0; b < C; b++) {
          var E = d[b];
          if (mr(E)) {
            if (A === 0 && y < E.length && (y = E.length), A < E.length) {
              var g = E[A];
              w(g, F) || (i._values.push(g), i._index.push(b));
            }
          } else A === 0 && y < 1 && (y = 1), w(E, F) || (i._values.push(E), i._index.push(b));
        }
        A++;
      } while (A < y);
    }
    i._ptr.push(i._index.length), i._size = [C, y];
  }
  t.prototype = new u(), t.prototype.createSparseMatrix = function(i, d) {
    return new t(i, d);
  }, Object.defineProperty(t, "name", { value: "SparseMatrix" }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
    return xe(this._values, $r);
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
    if (!Je(d)) throw new TypeError("Invalid index");
    var h = d.isScalar();
    if (h) return i.get(d.min());
    var C = d.size();
    if (C.length !== i._size.length) throw new ar(C.length, i._size.length);
    var y, w, F, A, b = d.min(), E = d.max();
    for (y = 0, w = i._size.length; y < w; y++) yr(b[y], i._size[y]), yr(E[y], i._size[y]);
    var g = i._values, B = i._index, _ = i._ptr, x = d.dimension(0), N = d.dimension(1), S = [], O = [];
    x.forEach(function($, Q) {
      O[$] = Q[0], S[$] = true;
    });
    var M = g ? [] : void 0, R = [], T = [];
    return N.forEach(function($) {
      for (T.push(R.length), F = _[$], A = _[$ + 1]; F < A; F++) y = B[F], S[y] === true && (R.push(O[y]), M && M.push(g[F]));
    }), T.push(R.length), new t({ values: M, index: R, ptr: T, size: C, datatype: i._datatype });
  }
  function f(i, d, h, C) {
    if (!d || d.isIndex !== true) throw new TypeError("Invalid index");
    var y = d.size(), w = d.isScalar(), F;
    if (fr(h) ? (F = h.size(), h = h.toArray()) : F = sr(h), w) {
      if (F.length !== 0) throw new TypeError("Scalar expected");
      i.set(d.min(), h, C);
    } else {
      if (y.length !== 1 && y.length !== 2) throw new ar(y.length, i._size.length, "<");
      if (F.length < y.length) {
        for (var A = 0, b = 0; y[A] === 1 && F[A] === 1; ) A++;
        for (; y[A] === 1; ) b++, A++;
        h = Cn(h, y.length, b, F);
      }
      if (!Vr(y, F)) throw new ar(y, F, ">");
      if (y.length === 1) {
        var E = d.dimension(0);
        E.forEach(function(_, x) {
          yr(_), i.set([_, 0], h[x[0]], C);
        });
      } else {
        var g = d.dimension(0), B = d.dimension(1);
        g.forEach(function(_, x) {
          yr(_), B.forEach(function(N, S) {
            yr(N), i.set([_, N], h[x[0]][S[0]], C);
          });
        });
      }
    }
    return i;
  }
  t.prototype.get = function(i) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new ar(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
    var d = i[0], h = i[1];
    yr(d, this._size[0]), yr(h, this._size[1]);
    var C = c(d, this._ptr[h], this._ptr[h + 1], this._index);
    return C < this._ptr[h + 1] && this._index[C] === d ? this._values[C] : 0;
  }, t.prototype.set = function(i, d, h) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new ar(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var C = i[0], y = i[1], w = this._size[0], F = this._size[1], A = n, b = 0;
    Or(this._datatype) && (A = e.find(n, [this._datatype, this._datatype]) || n, b = e.convert(0, this._datatype)), (C > w - 1 || y > F - 1) && (m(this, Math.max(C + 1, w), Math.max(y + 1, F), h), w = this._size[0], F = this._size[1]), yr(C, w), yr(y, F);
    var E = c(C, this._ptr[y], this._ptr[y + 1], this._index);
    return E < this._ptr[y + 1] && this._index[E] === C ? A(d, b) ? o(E, y, this._values, this._index, this._ptr) : this._values[E] = d : A(d, b) || l(E, C, y, d, this._values, this._index, this._ptr), this;
  };
  function c(i, d, h, C) {
    if (h - d === 0) return h;
    for (var y = d; y < h; y++) if (C[y] === i) return y;
    return d;
  }
  function o(i, d, h, C, y) {
    h.splice(i, 1), C.splice(i, 1);
    for (var w = d + 1; w < y.length; w++) y[w]--;
  }
  function l(i, d, h, C, y, w, F) {
    y.splice(i, 0, C), w.splice(i, 0, d);
    for (var A = h + 1; A < F.length; A++) F[A]++;
  }
  t.prototype.resize = function(i, d, h) {
    if (!he(i)) throw new TypeError("Array or Matrix expected");
    var C = i.valueOf().map((w) => Array.isArray(w) && w.length === 1 ? w[0] : w);
    if (C.length !== 2) throw new Error("Only two dimensions matrix are supported");
    C.forEach(function(w) {
      if (!vr(w) || !pr(w) || w < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + dr(C) + ")");
    });
    var y = h ? this.clone() : this;
    return m(y, C[0], C[1], d);
  };
  function m(i, d, h, C) {
    var y = C || 0, w = n, F = 0;
    Or(i._datatype) && (w = e.find(n, [i._datatype, i._datatype]) || n, F = e.convert(0, i._datatype), y = e.convert(y, i._datatype));
    var A = !w(y, F), b = i._size[0], E = i._size[1], g, B, _;
    if (h > E) {
      for (B = E; B < h; B++) if (i._ptr[B] = i._values.length, A) for (g = 0; g < b; g++) i._values.push(y), i._index.push(g);
      i._ptr[h] = i._values.length;
    } else h < E && (i._ptr.splice(h + 1, E - h), i._values.splice(i._ptr[h], i._values.length), i._index.splice(i._ptr[h], i._index.length));
    if (E = h, d > b) {
      if (A) {
        var x = 0;
        for (B = 0; B < E; B++) {
          i._ptr[B] = i._ptr[B] + x, _ = i._ptr[B + 1] + x;
          var N = 0;
          for (g = b; g < d; g++, N++) i._values.splice(_ + N, 0, y), i._index.splice(_ + N, 0, g), x++;
        }
        i._ptr[E] = i._values.length;
      }
    } else if (d < b) {
      var S = 0;
      for (B = 0; B < E; B++) {
        i._ptr[B] = i._ptr[B] - S;
        var O = i._ptr[B], M = i._ptr[B + 1] - S;
        for (_ = O; _ < M; _++) g = i._index[_], g > d - 1 && (i._values.splice(_, 1), i._index.splice(_, 1), S++);
      }
      i._ptr[B] = i._values.length;
    }
    return i._size[0] = d, i._size[1] = h, i;
  }
  t.prototype.reshape = function(i, d) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    i.forEach(function($) {
      if (!vr($) || !pr($) || $ <= -2 || $ === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + dr(i) + ")");
    });
    var h = this._size[0] * this._size[1];
    i = Ye(i, h);
    var C = i[0] * i[1];
    if (h !== C) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var y = d ? this.clone() : this;
    if (this._size[0] === i[0] && this._size[1] === i[1]) return y;
    for (var w = [], F = 0; F < y._ptr.length; F++) for (var A = 0; A < y._ptr[F + 1] - y._ptr[F]; A++) w.push(F);
    for (var b = y._values.slice(), E = y._index.slice(), g = 0; g < y._index.length; g++) {
      var B = E[g], _ = w[g], x = B * y._size[1] + _;
      w[g] = x % i[1], E[g] = Math.floor(x / i[1]);
    }
    y._values.length = 0, y._index.length = 0, y._ptr.length = i[1] + 1, y._size = i.slice();
    for (var N = 0; N < y._ptr.length; N++) y._ptr[N] = 0;
    for (var S = 0; S < b.length; S++) {
      var O = E[S], M = w[S], R = b[S], T = c(O, y._ptr[M], y._ptr[M + 1], y._index);
      l(T, O, M, R, y._values, y._index, y._ptr);
    }
    return y;
  }, t.prototype.clone = function() {
    var i = new t({ values: this._values ? ur(this._values) : void 0, index: ur(this._index), ptr: ur(this._ptr), size: ur(this._size), datatype: this._datatype });
    return i;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(i, d) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var h = this, C = this._size[0], y = this._size[1], w = ge(i, h, "map"), F = function(b, E, g) {
      return w.fn(b, [E, g], h);
    };
    return v(this, 0, C - 1, 0, y - 1, F, d);
  };
  function v(i, d, h, C, y, w, F) {
    var A = [], b = [], E = [], g = n, B = 0;
    Or(i._datatype) && (g = e.find(n, [i._datatype, i._datatype]) || n, B = e.convert(0, i._datatype));
    for (var _ = function(I, J, G) {
      var V = w(I, J, G);
      g(V, B) || (A.push(V), b.push(J));
    }, x = C; x <= y; x++) {
      E.push(A.length);
      var N = i._ptr[x], S = i._ptr[x + 1];
      if (F) for (var O = N; O < S; O++) {
        var M = i._index[O];
        M >= d && M <= h && _(i._values[O], M - d, x - C);
      }
      else {
        for (var R = {}, T = N; T < S; T++) {
          var $ = i._index[T];
          R[$] = i._values[T];
        }
        for (var Q = d; Q <= h; Q++) {
          var Y = Q in R ? R[Q] : 0;
          _(Y, Q - d, x - C);
        }
      }
    }
    return E.push(A.length), new t({ values: A, index: b, ptr: E, size: [h - d + 1, y - C + 1] });
  }
  t.prototype.forEach = function(i, d) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var h = this, C = this._size[0], y = this._size[1], w = ge(i, h, "forEach"), F = 0; F < y; F++) {
      var A = this._ptr[F], b = this._ptr[F + 1];
      if (d) for (var E = A; E < b; E++) {
        var g = this._index[E];
        w.fn(this._values[E], [g, F], h);
      }
      else {
        for (var B = {}, _ = A; _ < b; _++) {
          var x = this._index[_];
          B[x] = this._values[_];
        }
        for (var N = 0; N < C; N++) {
          var S = N in B ? B[N] : 0;
          w.fn(S, [N, F], h);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var i = this._size[1], d = 0; d < i; d++) for (var h = this._ptr[d], C = this._ptr[d + 1], y = h; y < C; y++) {
      var w = this._index[y];
      yield { value: this._values[y], index: [w, d] };
    }
  }, t.prototype.toArray = function() {
    return p(this._values, this._index, this._ptr, this._size, true);
  }, t.prototype.valueOf = function() {
    return p(this._values, this._index, this._ptr, this._size, false);
  };
  function p(i, d, h, C, y) {
    var w = C[0], F = C[1], A = [], b, E;
    for (b = 0; b < w; b++) for (A[b] = [], E = 0; E < F; E++) A[b][E] = 0;
    for (E = 0; E < F; E++) for (var g = h[E], B = h[E + 1], _ = g; _ < B; _++) b = d[_], A[b][E] = i ? y ? ur(i[_]) : i[_] : 1;
    return A;
  }
  return t.prototype.format = function(i) {
    for (var d = this._size[0], h = this._size[1], C = this.density(), y = "Sparse Matrix [" + dr(d, i) + " x " + dr(h, i) + "] density: " + dr(C, i) + `
`, w = 0; w < h; w++) for (var F = this._ptr[w], A = this._ptr[w + 1], b = F; b < A; b++) {
      var E = this._index[b];
      y += `
    (` + dr(E, i) + ", " + dr(w, i) + ") ==> " + (this._values ? dr(this._values[b], i) : "X");
    }
    return y;
  }, t.prototype.toString = function() {
    return dr(this.toArray());
  }, t.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(i) {
    if (i) {
      if (Ar(i) && (i = i.toNumber()), !vr(i) || !pr(i)) throw new TypeError("The parameter k must be an integer number");
    } else i = 0;
    var d = i > 0 ? i : 0, h = i < 0 ? -i : 0, C = this._size[0], y = this._size[1], w = Math.min(C - h, y - d), F = [], A = [], b = [];
    b[0] = 0;
    for (var E = d; E < y && F.length < w; E++) for (var g = this._ptr[E], B = this._ptr[E + 1], _ = g; _ < B; _++) {
      var x = this._index[_];
      if (x === E - d + h) {
        F.push(this._values[_]), A[F.length - 1] = x - h;
        break;
      }
    }
    return b.push(F.length), new t({ values: F, index: A, ptr: b, size: [w, 1] });
  }, t.fromJSON = function(i) {
    return new t(i);
  }, t.diagonal = function(i, d, h, C, y) {
    if (!mr(i)) throw new TypeError("Array expected, size parameter");
    if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (i = i.map(function($) {
      if (Ar($) && ($ = $.toNumber()), !vr($) || !pr($) || $ < 1) throw new Error("Size values must be positive integers");
      return $;
    }), h) {
      if (Ar(h) && (h = h.toNumber()), !vr(h) || !pr(h)) throw new TypeError("The parameter k must be an integer number");
    } else h = 0;
    var w = n, F = 0;
    Or(y) && (w = e.find(n, [y, y]) || n, F = e.convert(0, y));
    var A = h > 0 ? h : 0, b = h < 0 ? -h : 0, E = i[0], g = i[1], B = Math.min(E - b, g - A), _;
    if (mr(d)) {
      if (d.length !== B) throw new Error("Invalid value array length");
      _ = function(Q) {
        return d[Q];
      };
    } else if (fr(d)) {
      var x = d.size();
      if (x.length !== 1 || x[0] !== B) throw new Error("Invalid matrix length");
      _ = function(Q) {
        return d.get([Q]);
      };
    } else _ = function() {
      return d;
    };
    for (var N = [], S = [], O = [], M = 0; M < g; M++) {
      O.push(N.length);
      var R = M - A;
      if (R >= 0 && R < B) {
        var T = _(R);
        w(T, F) || (S.push(R + b), N.push(T));
      }
    }
    return O.push(N.length), new t({ values: N, index: S, ptr: O, size: [E, g] });
  }, t.prototype.swapRows = function(i, d) {
    if (!vr(i) || !pr(i) || !vr(d) || !pr(d)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return yr(i, this._size[0]), yr(d, this._size[0]), t._swapRows(i, d, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(i, d, h, C, y) {
    for (var w = C[i], F = C[i + 1], A = w; A < F; A++) y(h[A], d[A]);
  }, t._swapRows = function(i, d, h, C, y, w) {
    for (var F = 0; F < h; F++) {
      var A = w[F], b = w[F + 1], E = c(i, A, b, y), g = c(d, A, b, y);
      if (E < b && g < b && y[E] === i && y[g] === d) {
        if (C) {
          var B = C[E];
          C[E] = C[g], C[g] = B;
        }
        continue;
      }
      if (E < b && y[E] === i && (g >= b || y[g] !== d)) {
        var _ = C ? C[E] : void 0;
        y.splice(g, 0, d), C && C.splice(g, 0, _), y.splice(g <= E ? E + 1 : E, 1), C && C.splice(g <= E ? E + 1 : E, 1);
        continue;
      }
      if (g < b && y[g] === d && (E >= b || y[E] !== i)) {
        var x = C ? C[g] : void 0;
        y.splice(E, 0, i), C && C.splice(E, 0, x), y.splice(E <= g ? g + 1 : g, 1), C && C.splice(E <= g ? g + 1 : g, 1);
      }
    }
  }, t;
}, { isClass: true }), Ra = "number", Ua = ["typed"];
function Pa(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], u = e[2], t = e[3];
    return { input: r, radix: n, integerPart: u, fractionalPart: t };
  } else return null;
}
function La(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, u = 0; u < r.fractionalPart.length; u++) {
    var t = parseInt(r.fractionalPart[u], r.radix);
    n += t / Math.pow(r.radix, u + 1);
  }
  var a = e + n;
  if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return a;
}
var Va = Z(Ra, Ua, (r) => {
  var { typed: e } = r, n = e("number", { "": function() {
    return 0;
  }, number: function(t) {
    return t;
  }, string: function(t) {
    if (t === "NaN") return NaN;
    var a = Pa(t);
    if (a) return La(a);
    var s = 0, D = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    D && (s = Number(D[2]), t = D[1]);
    var f = Number(t);
    if (isNaN(f)) throw new SyntaxError('String "' + t + '" is not a valid number');
    if (D) {
      if (f > 2 ** s - 1) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      f >= 2 ** (s - 1) && (f = f - 2 ** s);
    }
    return f;
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Mr(t, u)) });
  return n.fromJSON = function(u) {
    return parseFloat(u.value);
  }, n;
}), Wa = "bignumber", Za = ["typed", "BigNumber"], Ja = Z(Wa, Za, (r) => {
  var { typed: e, BigNumber: n } = r;
  return e("bignumber", { "": function() {
    return new n(0);
  }, number: function(t) {
    return new n(t + "");
  }, string: function(t) {
    var a = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (a) {
      var s = a[2], D = n(a[1]), f = new n(2).pow(Number(s));
      if (D.gt(f.sub(1))) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      var c = new n(2).pow(Number(s) - 1);
      return D.gte(c) ? D.sub(f) : D;
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Mr(t, u)) });
}), Qa = "complex", Xa = ["typed", "Complex"], Ga = Z(Qa, Xa, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Mr(t, u)) });
}), Ya = "fraction", Ka = ["typed", "Fraction"], Ha = Z(Ya, Ka, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Mr(t, u)) });
}), bt = "matrix", ka = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], ja = Z(bt, ka, (r) => {
  var { typed: e, Matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(bt, { "": function() {
    return a([]);
  }, string: function(D) {
    return a([], D);
  }, "string, string": function(D, f) {
    return a([], D, f);
  }, Array: function(D) {
    return a(D);
  }, Matrix: function(D) {
    return a(D, D.storage());
  }, "Array | Matrix, string": a, "Array | Matrix, string, string": a });
  function a(s, D, f) {
    if (D === "dense" || D === "default" || D === void 0) return new u(s, f);
    if (D === "sparse") return new t(s, f);
    throw new TypeError("Unknown matrix type " + JSON.stringify(D) + ".");
  }
}), _t = "matrixFromColumns", ri = ["typed", "matrix", "flatten", "size"], ei = Z(_t, ri, (r) => {
  var { typed: e, matrix: n, flatten: u, size: t } = r;
  return e(_t, { "...Array": function(f) {
    return a(f);
  }, "...Matrix": function(f) {
    return n(a(f.map((c) => c.toArray())));
  } });
  function a(D) {
    if (D.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
    for (var f = s(D[0]), c = [], o = 0; o < f; o++) c[o] = [];
    for (var l of D) {
      var m = s(l);
      if (m !== f) throw new TypeError("The vectors had different length: " + (f | 0) + " \u2260 " + (m | 0));
      for (var v = u(l), p = 0; p < f; p++) c[p].push(v[p]);
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
}), Bt = "unaryMinus", ti = ["typed"], ni = Z(Bt, ti, (r) => {
  var { typed: e } = r;
  return e(Bt, { number: On, "Complex | BigNumber | Fraction": (n) => n.neg(), bigint: (n) => -n, Unit: e.referToSelf((n) => (u) => {
    var t = u.clone();
    return t.value = e.find(n, t.valueType())(u.value), t;
  }), "Array | Matrix": e.referToSelf((n) => (u) => Mr(u, n, true)) });
}), xt = "abs", ui = ["typed"], ai = Z(xt, ui, (r) => {
  var { typed: e } = r;
  return e(xt, { number: Mn, "Complex | BigNumber | Fraction | Unit": (n) => n.abs(), bigint: (n) => n < 0n ? -n : n, "Array | Matrix": e.referToSelf((n) => (u) => Mr(u, n, true)) });
}), St = "addScalar", ii = ["typed"], oi = Z(St, ii, (r) => {
  var { typed: e } = r;
  return e(St, { "number, number": Nn, "Complex, Complex": function(u, t) {
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
}), Mt = "subtractScalar", si = ["typed"], fi = Z(Mt, si, (r) => {
  var { typed: e } = r;
  return e(Mt, { "number, number": Tn, "Complex, Complex": function(u, t) {
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
}), li = "matAlgo11xS0s", ci = ["typed", "equalScalar"], qn = Z(li, ci, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s, D) {
    var f = t._values, c = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = n, h = 0, C = s;
    typeof m == "string" && (i = m, d = e.find(n, [i, i]), h = e.convert(0, i), a = e.convert(a, i), C = e.find(s, [i, i]));
    for (var y = [], w = [], F = [], A = 0; A < p; A++) {
      F[A] = w.length;
      for (var b = o[A], E = o[A + 1], g = b; g < E; g++) {
        var B = c[g], _ = D ? C(a, f[g]) : C(f[g], a);
        d(_, h) || (w.push(B), y.push(_));
      }
    }
    return F[p] = w.length, t.createSparseMatrix({ values: y, index: w, ptr: F, size: [v, p], datatype: i });
  };
}), vi = "matAlgo12xSfs", Di = ["typed", "DenseMatrix"], jr = Z(vi, Di, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var f = t._values, c = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = s;
    typeof m == "string" && (i = m, a = e.convert(a, i), d = e.find(s, [i, i]));
    for (var h = [], C = [], y = [], w = 0; w < p; w++) {
      for (var F = w + 1, A = o[w], b = o[w + 1], E = A; E < b; E++) {
        var g = c[E];
        C[g] = f[E], y[g] = F;
      }
      for (var B = 0; B < v; B++) w === 0 && (h[B] = []), y[B] === F ? h[B][w] = D ? d(a, C[B]) : d(C[B], a) : h[B][w] = D ? d(a, 0) : d(0, a);
    }
    return new n({ data: h, size: [v, p], datatype: i });
  };
}), pi = "matAlgo14xDs", di = ["typed"], He = Z(pi, di, (r) => {
  var { typed: e } = r;
  return function(t, a, s, D) {
    var f = t._data, c = t._size, o = t._datatype, l, m = s;
    typeof o == "string" && (l = o, a = e.convert(a, l), m = e.find(s, [l, l]));
    var v = c.length > 0 ? n(m, 0, c, c[0], f, a, D) : [];
    return t.createDenseMatrix({ data: v, size: ur(c), datatype: l });
  };
  function n(u, t, a, s, D, f, c) {
    var o = [];
    if (t === a.length - 1) for (var l = 0; l < s; l++) o[l] = c ? u(f, D[l]) : u(D[l], f);
    else for (var m = 0; m < s; m++) o[m] = n(u, t + 1, a, a[t + 1], D[m], f, c);
    return o;
  }
}), hi = "matAlgo03xDSf", mi = ["typed"], re = Z(hi, mi, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, f = u._size, c = u._datatype || u.getDataType(), o = t._values, l = t._index, m = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (f.length !== v.length) throw new ar(f.length, v.length);
    if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = f[0], d = f[1], h, C = 0, y = a;
    typeof c == "string" && c === p && c !== "mixed" && (h = c, C = e.convert(0, h), y = e.find(a, [h, h]));
    for (var w = [], F = 0; F < i; F++) w[F] = [];
    for (var A = [], b = [], E = 0; E < d; E++) {
      for (var g = E + 1, B = m[E], _ = m[E + 1], x = B; x < _; x++) {
        var N = l[x];
        A[N] = s ? y(o[x], D[N][E]) : y(D[N][E], o[x]), b[N] = g;
      }
      for (var S = 0; S < i; S++) b[S] === g ? w[S][E] = A[S] : w[S][E] = s ? y(C, D[S][E]) : y(D[S][E], C);
    }
    return u.createDenseMatrix({ data: w, size: [i, d], datatype: c === u._datatype && p === t._datatype ? h : void 0 });
  };
}), gi = "matAlgo05xSfSf", yi = ["typed", "equalScalar"], Ai = Z(gi, yi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, f = t._index, c = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), m = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new ar(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var h = o[0], C = o[1], y, w = n, F = 0, A = s;
    typeof l == "string" && l === d && l !== "mixed" && (y = l, w = e.find(n, [y, y]), F = e.convert(0, y), A = e.find(s, [y, y]));
    var b = D && m ? [] : void 0, E = [], g = [], B = b ? [] : void 0, _ = b ? [] : void 0, x = [], N = [], S, O, M, R;
    for (O = 0; O < C; O++) {
      g[O] = E.length;
      var T = O + 1;
      for (M = c[O], R = c[O + 1]; M < R; M++) S = f[M], E.push(S), x[S] = T, B && (B[S] = D[M]);
      for (M = p[O], R = p[O + 1]; M < R; M++) S = v[M], x[S] !== T && E.push(S), N[S] = T, _ && (_[S] = m[M]);
      if (b) for (M = g[O]; M < E.length; ) {
        S = E[M];
        var $ = x[S], Q = N[S];
        if ($ === T || Q === T) {
          var Y = $ === T ? B[S] : F, z = Q === T ? _[S] : F, I = A(Y, z);
          w(I, F) ? E.splice(M, 1) : (b.push(I), M++);
        }
      }
    }
    return g[C] = E.length, t.createSparseMatrix({ values: b, index: E, ptr: g, size: [h, C], datatype: l === t._datatype && d === a._datatype ? y : void 0 });
  };
}), Fi = "matAlgo13xDD", Ei = ["typed"], Ci = Z(Fi, Ei, (r) => {
  var { typed: e } = r;
  return function(t, a, s) {
    var D = t._data, f = t._size, c = t._datatype, o = a._data, l = a._size, m = a._datatype, v = [];
    if (f.length !== l.length) throw new ar(f.length, l.length);
    for (var p = 0; p < f.length; p++) {
      if (f[p] !== l[p]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + l + ")");
      v[p] = f[p];
    }
    var i, d = s;
    typeof c == "string" && c === m && (i = c, d = e.find(s, [i, i]));
    var h = v.length > 0 ? n(d, 0, v, v[0], D, o) : [];
    return t.createDenseMatrix({ data: h, size: v, datatype: i });
  };
  function n(u, t, a, s, D, f) {
    var c = [];
    if (t === a.length - 1) for (var o = 0; o < s; o++) c[o] = u(D[o], f[o]);
    else for (var l = 0; l < s; l++) c[l] = n(u, t + 1, a, a[t + 1], D[l], f[l]);
    return c;
  }
});
function Fr(r, e) {
  if (Vr(r.size(), e.size())) return [r, e];
  var n = Bn(r.size(), e.size());
  return [r, e].map((u) => wi(u, n));
}
function wi(r, e) {
  return Vr(r.size(), e) ? r : r.create(Le(r.valueOf(), e), r.datatype());
}
var bi = "matrixAlgorithmSuite", _i = ["typed", "matrix"], Qr = Z(bi, _i, (r) => {
  var { typed: e, matrix: n } = r, u = Ci({ typed: e }), t = He({ typed: e });
  return function(s) {
    var D = s.elop, f = s.SD || s.DS, c;
    D ? (c = { "DenseMatrix, DenseMatrix": (v, p) => u(...Fr(v, p), D), "Array, Array": (v, p) => u(...Fr(n(v), n(p)), D).valueOf(), "Array, DenseMatrix": (v, p) => u(...Fr(n(v), p), D), "DenseMatrix, Array": (v, p) => u(...Fr(v, n(p)), D) }, s.SS && (c["SparseMatrix, SparseMatrix"] = (v, p) => s.SS(...Fr(v, p), D, false)), s.DS && (c["DenseMatrix, SparseMatrix"] = (v, p) => s.DS(...Fr(v, p), D, false), c["Array, SparseMatrix"] = (v, p) => s.DS(...Fr(n(v), p), D, false)), f && (c["SparseMatrix, DenseMatrix"] = (v, p) => f(...Fr(p, v), D, true), c["SparseMatrix, Array"] = (v, p) => f(...Fr(n(p), v), D, true))) : (c = { "DenseMatrix, DenseMatrix": e.referToSelf((v) => (p, i) => u(...Fr(p, i), v)), "Array, Array": e.referToSelf((v) => (p, i) => u(...Fr(n(p), n(i)), v).valueOf()), "Array, DenseMatrix": e.referToSelf((v) => (p, i) => u(...Fr(n(p), i), v)), "DenseMatrix, Array": e.referToSelf((v) => (p, i) => u(...Fr(p, n(i)), v)) }, s.SS && (c["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.SS(...Fr(p, i), v, false))), s.DS && (c["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...Fr(p, i), v, false)), c["Array, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...Fr(n(p), i), v, false))), f && (c["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (p, i) => f(...Fr(i, p), v, true)), c["SparseMatrix, Array"] = e.referToSelf((v) => (p, i) => f(...Fr(n(i), p), v, true))));
    var o = s.scalar || "any", l = s.Ds || s.Ss;
    l && (D ? (c["DenseMatrix," + o] = (v, p) => t(v, p, D, false), c[o + ", DenseMatrix"] = (v, p) => t(p, v, D, true), c["Array," + o] = (v, p) => t(n(v), p, D, false).valueOf(), c[o + ", Array"] = (v, p) => t(n(p), v, D, true).valueOf()) : (c["DenseMatrix," + o] = e.referToSelf((v) => (p, i) => t(p, i, v, false)), c[o + ", DenseMatrix"] = e.referToSelf((v) => (p, i) => t(i, p, v, true)), c["Array," + o] = e.referToSelf((v) => (p, i) => t(n(p), i, v, false).valueOf()), c[o + ", Array"] = e.referToSelf((v) => (p, i) => t(n(i), p, v, true).valueOf())));
    var m = s.sS !== void 0 ? s.sS : s.Ss;
    return D ? (s.Ss && (c["SparseMatrix," + o] = (v, p) => s.Ss(v, p, D, false)), m && (c[o + ", SparseMatrix"] = (v, p) => m(p, v, D, true))) : (s.Ss && (c["SparseMatrix," + o] = e.referToSelf((v) => (p, i) => s.Ss(p, i, v, false))), m && (c[o + ", SparseMatrix"] = e.referToSelf((v) => (p, i) => m(i, p, v, true)))), D && D.signatures && dn(c, D.signatures), c;
  };
}), Bi = "matAlgo01xDSid", xi = ["typed"], Rn = Z(Bi, xi, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, f = u._size, c = u._datatype || u.getDataType(), o = t._values, l = t._index, m = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (f.length !== v.length) throw new ar(f.length, v.length);
    if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = f[0], d = f[1], h = typeof c == "string" && c !== "mixed" && c === p ? c : void 0, C = h ? e.find(a, [h, h]) : a, y, w, F = [];
    for (y = 0; y < i; y++) F[y] = [];
    var A = [], b = [];
    for (w = 0; w < d; w++) {
      for (var E = w + 1, g = m[w], B = m[w + 1], _ = g; _ < B; _++) y = l[_], A[y] = s ? C(o[_], D[y][w]) : C(D[y][w], o[_]), b[y] = E;
      for (y = 0; y < i; y++) b[y] === E ? F[y][w] = A[y] : F[y][w] = D[y][w];
    }
    return u.createDenseMatrix({ data: F, size: [i, d], datatype: c === u._datatype && p === t._datatype ? h : void 0 });
  };
}), Si = "matAlgo04xSidSid", Mi = ["typed", "equalScalar"], Ni = Z(Si, Mi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, f = t._index, c = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), m = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new ar(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var h = o[0], C = o[1], y, w = n, F = 0, A = s;
    typeof l == "string" && l === d && l !== "mixed" && (y = l, w = e.find(n, [y, y]), F = e.convert(0, y), A = e.find(s, [y, y]));
    var b = D && m ? [] : void 0, E = [], g = [], B = D && m ? [] : void 0, _ = D && m ? [] : void 0, x = [], N = [], S, O, M, R, T;
    for (O = 0; O < C; O++) {
      g[O] = E.length;
      var $ = O + 1;
      for (R = c[O], T = c[O + 1], M = R; M < T; M++) S = f[M], E.push(S), x[S] = $, B && (B[S] = D[M]);
      for (R = p[O], T = p[O + 1], M = R; M < T; M++) if (S = v[M], x[S] === $) {
        if (B) {
          var Q = A(B[S], m[M]);
          w(Q, F) ? x[S] = null : B[S] = Q;
        }
      } else E.push(S), N[S] = $, _ && (_[S] = m[M]);
      if (B && _) for (M = g[O]; M < E.length; ) S = E[M], x[S] === $ ? (b[M] = B[S], M++) : N[S] === $ ? (b[M] = _[S], M++) : E.splice(M, 1);
    }
    return g[C] = E.length, t.createSparseMatrix({ values: b, index: E, ptr: g, size: [h, C], datatype: l === t._datatype && d === a._datatype ? y : void 0 });
  };
}), Ti = "matAlgo10xSids", zi = ["typed", "DenseMatrix"], Un = Z(Ti, zi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var f = t._values, c = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = s;
    typeof m == "string" && (i = m, a = e.convert(a, i), d = e.find(s, [i, i]));
    for (var h = [], C = [], y = [], w = 0; w < p; w++) {
      for (var F = w + 1, A = o[w], b = o[w + 1], E = A; E < b; E++) {
        var g = c[E];
        C[g] = f[E], y[g] = F;
      }
      for (var B = 0; B < v; B++) w === 0 && (h[B] = []), y[B] === F ? h[B][w] = D ? d(a, C[B]) : d(C[B], a) : h[B][w] = a;
    }
    return new n({ data: h, size: [v, p], datatype: i });
  };
}), Oi = "multiplyScalar", $i = ["typed"], Ii = Z(Oi, $i, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": zn, "Complex, Complex": function(u, t) {
    return u.mul(t);
  }, "BigNumber, BigNumber": function(u, t) {
    return u.times(t);
  }, "bigint, bigint": function(u, t) {
    return u * t;
  }, "Fraction, Fraction": function(u, t) {
    return u.mul(t);
  }, "number | Fraction | BigNumber | Complex, Unit": (n, u) => u.multiply(n), "Unit, number | Fraction | BigNumber | Complex | Unit": (n, u) => n.multiply(u) });
}), Nt = "multiply", qi = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Ri = Z(Nt, qi, (r) => {
  var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: s } = r, D = qn({ typed: e, equalScalar: a }), f = He({ typed: e });
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
    return m(F, A);
  }
  function m(F, A) {
    var b = F._data, E = F._size, g = F._datatype || F.getDataType(), B = A._data, _ = A._size, x = A._datatype || A.getDataType(), N = E[0], S = _[1], O, M = u, R = t;
    g && x && g === x && typeof g == "string" && g !== "mixed" && (O = g, M = e.find(u, [O, O]), R = e.find(t, [O, O]));
    for (var T = [], $ = 0; $ < S; $++) {
      for (var Q = R(b[0], B[0][$]), Y = 1; Y < N; Y++) Q = M(Q, R(b[Y], B[Y][$]));
      T[$] = Q;
    }
    return F.createDenseMatrix({ data: T, size: [S], datatype: g === F._datatype && x === A._datatype ? O : void 0 });
  }
  var v = e("_multiplyMatrixVector", { "DenseMatrix, any": i, "SparseMatrix, any": C }), p = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": d, "DenseMatrix, SparseMatrix": h, "SparseMatrix, DenseMatrix": y, "SparseMatrix, SparseMatrix": w });
  function i(F, A) {
    var b = F._data, E = F._size, g = F._datatype || F.getDataType(), B = A._data, _ = A._datatype || A.getDataType(), x = E[0], N = E[1], S, O = u, M = t;
    g && _ && g === _ && typeof g == "string" && g !== "mixed" && (S = g, O = e.find(u, [S, S]), M = e.find(t, [S, S]));
    for (var R = [], T = 0; T < x; T++) {
      for (var $ = b[T], Q = M($[0], B[0]), Y = 1; Y < N; Y++) Q = O(Q, M($[Y], B[Y]));
      R[T] = Q;
    }
    return F.createDenseMatrix({ data: R, size: [x], datatype: g === F._datatype && _ === A._datatype ? S : void 0 });
  }
  function d(F, A) {
    var b = F._data, E = F._size, g = F._datatype || F.getDataType(), B = A._data, _ = A._size, x = A._datatype || A.getDataType(), N = E[0], S = E[1], O = _[1], M, R = u, T = t;
    g && x && g === x && typeof g == "string" && g !== "mixed" && g !== "mixed" && (M = g, R = e.find(u, [M, M]), T = e.find(t, [M, M]));
    for (var $ = [], Q = 0; Q < N; Q++) {
      var Y = b[Q];
      $[Q] = [];
      for (var z = 0; z < O; z++) {
        for (var I = T(Y[0], B[0][z]), J = 1; J < S; J++) I = R(I, T(Y[J], B[J][z]));
        $[Q][z] = I;
      }
    }
    return F.createDenseMatrix({ data: $, size: [N, O], datatype: g === F._datatype && x === A._datatype ? M : void 0 });
  }
  function h(F, A) {
    var b = F._data, E = F._size, g = F._datatype || F.getDataType(), B = A._values, _ = A._index, x = A._ptr, N = A._size, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
    if (!B) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var O = E[0], M = N[1], R, T = u, $ = t, Q = a, Y = 0;
    g && S && g === S && typeof g == "string" && g !== "mixed" && (R = g, T = e.find(u, [R, R]), $ = e.find(t, [R, R]), Q = e.find(a, [R, R]), Y = e.convert(0, R));
    for (var z = [], I = [], J = [], G = A.createSparseMatrix({ values: z, index: I, ptr: J, size: [O, M], datatype: g === F._datatype && S === A._datatype ? R : void 0 }), V = 0; V < M; V++) {
      J[V] = I.length;
      var q = x[V], W = x[V + 1];
      if (W > q) for (var P = 0, U = 0; U < O; U++) {
        for (var K = U + 1, L = void 0, j = q; j < W; j++) {
          var er = _[j];
          P !== K ? (L = $(b[U][er], B[j]), P = K) : L = T(L, $(b[U][er], B[j]));
        }
        P === K && !Q(L, Y) && (I.push(U), z.push(L));
      }
    }
    return J[M] = I.length, G;
  }
  function C(F, A) {
    var b = F._values, E = F._index, g = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var _ = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], O = [], M = [], R = [], T, $ = u, Q = t, Y = a, z = 0;
    B && x && B === x && typeof B == "string" && B !== "mixed" && (T = B, $ = e.find(u, [T, T]), Q = e.find(t, [T, T]), Y = e.find(a, [T, T]), z = e.convert(0, T));
    var I = [], J = [];
    R[0] = 0;
    for (var G = 0; G < S; G++) {
      var V = _[G];
      if (!Y(V, z)) for (var q = g[G], W = g[G + 1], P = q; P < W; P++) {
        var U = E[P];
        J[U] ? I[U] = $(I[U], Q(V, b[P])) : (J[U] = true, M.push(U), I[U] = Q(V, b[P]));
      }
    }
    for (var K = M.length, L = 0; L < K; L++) {
      var j = M[L];
      O[L] = I[j];
    }
    return R[1] = M.length, F.createSparseMatrix({ values: O, index: M, ptr: R, size: [N, 1], datatype: B === F._datatype && x === A._datatype ? T : void 0 });
  }
  function y(F, A) {
    var b = F._values, E = F._index, g = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var _ = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], O = A._size[1], M, R = u, T = t, $ = a, Q = 0;
    B && x && B === x && typeof B == "string" && B !== "mixed" && (M = B, R = e.find(u, [M, M]), T = e.find(t, [M, M]), $ = e.find(a, [M, M]), Q = e.convert(0, M));
    for (var Y = [], z = [], I = [], J = F.createSparseMatrix({ values: Y, index: z, ptr: I, size: [N, O], datatype: B === F._datatype && x === A._datatype ? M : void 0 }), G = [], V = [], q = 0; q < O; q++) {
      I[q] = z.length;
      for (var W = q + 1, P = 0; P < S; P++) {
        var U = _[P][q];
        if (!$(U, Q)) for (var K = g[P], L = g[P + 1], j = K; j < L; j++) {
          var er = E[j];
          V[er] !== W ? (V[er] = W, z.push(er), G[er] = T(U, b[j])) : G[er] = R(G[er], T(U, b[j]));
        }
      }
      for (var tr = I[q], nr = z.length, ir = tr; ir < nr; ir++) {
        var or = z[ir];
        Y[ir] = G[or];
      }
    }
    return I[O] = z.length, J;
  }
  function w(F, A) {
    var b = F._values, E = F._index, g = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), _ = A._values, x = A._index, N = A._ptr, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), O = F._size[0], M = A._size[1], R = b && _, T, $ = u, Q = t;
    B && S && B === S && typeof B == "string" && B !== "mixed" && (T = B, $ = e.find(u, [T, T]), Q = e.find(t, [T, T]));
    for (var Y = R ? [] : void 0, z = [], I = [], J = F.createSparseMatrix({ values: Y, index: z, ptr: I, size: [O, M], datatype: B === F._datatype && S === A._datatype ? T : void 0 }), G = R ? [] : void 0, V = [], q, W, P, U, K, L, j, er, tr = 0; tr < M; tr++) {
      I[tr] = z.length;
      var nr = tr + 1;
      for (K = N[tr], L = N[tr + 1], U = K; U < L; U++) if (er = x[U], R) for (W = g[er], P = g[er + 1], q = W; q < P; q++) j = E[q], V[j] !== nr ? (V[j] = nr, z.push(j), G[j] = Q(_[U], b[q])) : G[j] = $(G[j], Q(_[U], b[q]));
      else for (W = g[er], P = g[er + 1], q = W; q < P; q++) j = E[q], V[j] !== nr && (V[j] = nr, z.push(j));
      if (R) for (var ir = I[tr], or = z.length, gr = ir; gr < or; gr++) {
        var cr = z[gr];
        Y[gr] = G[cr];
      }
    }
    return I[M] = z.length, J;
  }
  return e(Nt, t, { "Array, Array": e.referTo("Matrix, Matrix", (F) => (A, b) => {
    c(sr(A), sr(b));
    var E = F(n(A), n(b));
    return fr(E) ? E.valueOf() : E;
  }), "Matrix, Matrix": function(A, b) {
    var E = A.size(), g = b.size();
    return c(E, g), E.length === 1 ? g.length === 1 ? o(A, b, E[0]) : l(A, b) : g.length === 1 ? v(A, b) : p(A, b);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (A, b) => F(A, n(b))), "Array, Matrix": e.referToSelf((F) => (A, b) => F(n(A, b.storage()), b)), "SparseMatrix, any": function(A, b) {
    return D(A, b, t, false);
  }, "DenseMatrix, any": function(A, b) {
    return f(A, b, t, false);
  }, "any, SparseMatrix": function(A, b) {
    return D(b, A, t, true);
  }, "any, DenseMatrix": function(A, b) {
    return f(b, A, t, true);
  }, "Array, any": function(A, b) {
    return f(n(A), b, t, false).valueOf();
  }, "any, Array": function(A, b) {
    return f(n(b), A, t, true).valueOf();
  }, "any, any": t, "any, any, ...any": e.referToSelf((F) => (A, b, E) => {
    for (var g = F(A, b), B = 0; B < E.length; B++) g = F(g, E[B]);
    return g;
  }) });
}), Tt = "sign", Ui = ["typed", "BigNumber", "Fraction", "complex"], Pi = Z(Tt, Ui, (r) => {
  var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
  return e(Tt, { number: Ve, Complex: function(s) {
    return s.im === 0 ? u(Ve(s.re)) : s.sign();
  }, BigNumber: function(s) {
    return new n(s.cmp(0));
  }, bigint: function(s) {
    return s > 0n ? 1n : s < 0n ? -1n : 0n;
  }, Fraction: function(s) {
    return new t(s.s);
  }, "Array | Matrix": e.referToSelf((a) => (s) => Mr(s, a, true)), Unit: e.referToSelf((a) => (s) => {
    if (!s._isDerived() && s.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
    return e.find(a, s.valueType())(s.value);
  }) });
}), Li = "sqrt", Vi = ["config", "typed", "Complex"], Wi = Z(Li, Vi, (r) => {
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
}), zt = "subtract", Zi = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Ji = Z(zt, Zi, (r) => {
  var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: s, concat: D } = r, f = Rn({ typed: e }), c = re({ typed: e }), o = Ai({ typed: e, equalScalar: u }), l = Un({ typed: e, DenseMatrix: s }), m = jr({ typed: e, DenseMatrix: s }), v = Qr({ typed: e, matrix: n, concat: D });
  return e(zt, { "any, any": t }, v({ elop: t, SS: o, DS: f, SD: c, Ss: m, sS: l }));
}), Qi = "matAlgo07xSSf", Xi = ["typed", "SparseMatrix"], ie = Z(Qi, Xi, (r) => {
  var { typed: e, SparseMatrix: n } = r;
  return function(a, s, D) {
    var f = a._size, c = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), o = s._size, l = s._datatype || s._data === void 0 ? s._datatype : s.getDataType();
    if (f.length !== o.length) throw new ar(f.length, o.length);
    if (f[0] !== o[0] || f[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + o + ")");
    var m = f[0], v = f[1], p, i = 0, d = D;
    typeof c == "string" && c === l && c !== "mixed" && (p = c, i = e.convert(0, p), d = e.find(D, [p, p]));
    for (var h = [], C = [], y = new Array(v + 1).fill(0), w = [], F = [], A = [], b = [], E = 0; E < v; E++) {
      var g = E + 1, B = 0;
      u(a, E, A, w, g), u(s, E, b, F, g);
      for (var _ = 0; _ < m; _++) {
        var x = A[_] === g ? w[_] : i, N = b[_] === g ? F[_] : i, S = d(x, N);
        S !== 0 && S !== false && (C.push(_), h.push(S), B++);
      }
      y[E + 1] = y[E] + B;
    }
    return new n({ values: h, index: C, ptr: y, size: [m, v], datatype: c === a._datatype && l === s._datatype ? p : void 0 });
  };
  function u(t, a, s, D, f) {
    for (var c = t._values, o = t._index, l = t._ptr, m = l[a], v = l[a + 1]; m < v; m++) {
      var p = o[m];
      s[p] = f, D[p] = c[m];
    }
  }
}), Ot = "conj", Gi = ["typed"], Yi = Z(Ot, Gi, (r) => {
  var { typed: e } = r;
  return e(Ot, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.conjugate(), "Array | Matrix": e.referToSelf((n) => (u) => Mr(u, n)) });
}), $t = "im", Ki = ["typed"], Hi = Z($t, Ki, (r) => {
  var { typed: e } = r;
  return e($t, { number: () => 0, "BigNumber | Fraction": (n) => n.mul(0), Complex: (n) => n.im, "Array | Matrix": e.referToSelf((n) => (u) => Mr(u, n)) });
}), It = "re", ki = ["typed"], ji = Z(It, ki, (r) => {
  var { typed: e } = r;
  return e(It, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.re, "Array | Matrix": e.referToSelf((n) => (u) => Mr(u, n)) });
}), qt = "concat", ro = ["typed", "matrix", "isInteger"], eo = Z(qt, ro, (r) => {
  var { typed: e, matrix: n, isInteger: u } = r;
  return e(qt, { "...Array | Matrix | number | BigNumber": function(a) {
    var s, D = a.length, f = -1, c, o = false, l = [];
    for (s = 0; s < D; s++) {
      var m = a[s];
      if (fr(m) && (o = true), vr(m) || Ar(m)) {
        if (s !== D - 1) throw new Error("Dimension must be specified as last argument");
        if (c = f, f = m.valueOf(), !u(f)) throw new TypeError("Integer number expected for dimension");
        if (f < 0 || s > 0 && f > c) throw new Jr(f, c + 1);
      } else {
        var v = ur(m).valueOf(), p = sr(v);
        if (l[s] = v, c = f, f = p.length - 1, s > 0 && f !== c) throw new ar(c + 1, f + 1);
      }
    }
    if (l.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var i = l.shift(); l.length; ) i = _n(i, l.shift(), f);
    return o ? n(i) : i;
  }, "...string": function(a) {
    return a.join("");
  } });
}), Rt = "column", to = ["typed", "Index", "matrix", "range"], no = Z(Rt, to, (r) => {
  var { typed: e, Index: n, matrix: u, range: t } = r;
  return e(Rt, { "Matrix, number": a, "Array, number": function(D, f) {
    return a(u(ur(D)), f).valueOf();
  } });
  function a(s, D) {
    if (s.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
    yr(D, s.size()[1]);
    var f = t(0, s.size()[0]), c = new n(f, D), o = s.subset(c);
    return fr(o) ? o : u([[o]]);
  }
}), Ut = "cross", uo = ["typed", "matrix", "subtract", "multiply"], ao = Z(Ut, uo, (r) => {
  var { typed: e, matrix: n, subtract: u, multiply: t } = r;
  return e(Ut, { "Matrix, Matrix": function(D, f) {
    return n(a(D.toArray(), f.toArray()));
  }, "Matrix, Array": function(D, f) {
    return n(a(D.toArray(), f));
  }, "Array, Matrix": function(D, f) {
    return n(a(D, f.toArray()));
  }, "Array, Array": a });
  function a(s, D) {
    var f = Math.max(sr(s).length, sr(D).length);
    s = yt(s), D = yt(D);
    var c = sr(s), o = sr(D);
    if (c.length !== 1 || o.length !== 1 || c[0] !== 3 || o[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + c.join(", ") + "], B = [" + o.join(", ") + "])");
    var l = [u(t(s[1], D[2]), t(s[2], D[1])), u(t(s[2], D[0]), t(s[0], D[2])), u(t(s[0], D[1]), t(s[1], D[0]))];
    return f > 1 ? [l] : l;
  }
}), Pt = "diag", io = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], oo = Z(Pt, io, (r) => {
  var { typed: e, matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(Pt, { Array: function(c) {
    return a(c, 0, sr(c), null);
  }, "Array, number": function(c, o) {
    return a(c, o, sr(c), null);
  }, "Array, BigNumber": function(c, o) {
    return a(c, o.toNumber(), sr(c), null);
  }, "Array, string": function(c, o) {
    return a(c, 0, sr(c), o);
  }, "Array, number, string": function(c, o, l) {
    return a(c, o, sr(c), l);
  }, "Array, BigNumber, string": function(c, o, l) {
    return a(c, o.toNumber(), sr(c), l);
  }, Matrix: function(c) {
    return a(c, 0, c.size(), c.storage());
  }, "Matrix, number": function(c, o) {
    return a(c, o, c.size(), c.storage());
  }, "Matrix, BigNumber": function(c, o) {
    return a(c, o.toNumber(), c.size(), c.storage());
  }, "Matrix, string": function(c, o) {
    return a(c, 0, c.size(), o);
  }, "Matrix, number, string": function(c, o, l) {
    return a(c, o, c.size(), l);
  }, "Matrix, BigNumber, string": function(c, o, l) {
    return a(c, o.toNumber(), c.size(), l);
  } });
  function a(f, c, o, l) {
    if (!pr(c)) throw new TypeError("Second parameter in function diag must be an integer");
    var m = c > 0 ? c : 0, v = c < 0 ? -c : 0;
    switch (o.length) {
      case 1:
        return s(f, c, l, o[0], v, m);
      case 2:
        return D(f, c, l, o, v, m);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function s(f, c, o, l, m, v) {
    var p = [l + m, l + v];
    if (o && o !== "sparse" && o !== "dense") throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var i = o === "sparse" ? t.diagonal(p, f, c) : u.diagonal(p, f, c);
    return o !== null ? i : i.valueOf();
  }
  function D(f, c, o, l, m, v) {
    if (fr(f)) {
      var p = f.diagonal(c);
      return o !== null ? o !== p.storage() ? n(p, o) : p : p.valueOf();
    }
    for (var i = Math.min(l[0] - m, l[1] - v), d = [], h = 0; h < i; h++) d[h] = f[h + m][h + v];
    return o !== null ? n(d) : d;
  }
}), Lt = "flatten", so = ["typed"], fo = Z(Lt, so, (r) => {
  var { typed: e } = r;
  return e(Lt, { Array: function(u) {
    return Pe(u);
  }, Matrix: function(u) {
    return u.create(Pe(u.valueOf(), true), u.datatype());
  } });
}), Vt = "getMatrixDataType", lo = ["typed"], co = Z(Vt, lo, (r) => {
  var { typed: e } = r;
  return e(Vt, { Array: function(u) {
    return xe(u, $r);
  }, Matrix: function(u) {
    return u.getDataType();
  } });
}), Wt = "identity", vo = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Do = Z(Wt, vo, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t, DenseMatrix: a, SparseMatrix: s } = r;
  return e(Wt, { "": function() {
    return n.matrix === "Matrix" ? u([]) : [];
  }, string: function(o) {
    return u(o);
  }, "number | BigNumber": function(o) {
    return f(o, o, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(o, l) {
    return f(o, o, l);
  }, "number | BigNumber, number | BigNumber": function(o, l) {
    return f(o, l, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(o, l, m) {
    return f(o, l, m);
  }, Array: function(o) {
    return D(o);
  }, "Array, string": function(o, l) {
    return D(o, l);
  }, Matrix: function(o) {
    return D(o.valueOf(), o.storage());
  }, "Matrix, string": function(o, l) {
    return D(o.valueOf(), l);
  } });
  function D(c, o) {
    switch (c.length) {
      case 0:
        return o ? u(o) : [];
      case 1:
        return f(c[0], c[0], o);
      case 2:
        return f(c[0], c[1], o);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function f(c, o, l) {
    var m = Ar(c) || Ar(o) ? t : null;
    if (Ar(c) && (c = c.toNumber()), Ar(o) && (o = o.toNumber()), !pr(c) || c < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!pr(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
    var v = m ? new t(1) : 1, p = m ? new m(0) : 0, i = [c, o];
    if (l) {
      if (l === "sparse") return s.diagonal(i, v, 0, p);
      if (l === "dense") return a.diagonal(i, v, 0, p);
      throw new TypeError('Unknown matrix type "'.concat(l, '"'));
    }
    for (var d = me([], i, p), h = c < o ? c : o, C = 0; C < h; C++) d[C][C] = v;
    return d;
  }
});
function Pn() {
  throw new Error('No "bignumber" implementation available');
}
function po() {
  throw new Error('No "fraction" implementation available');
}
function Ln() {
  throw new Error('No "matrix" implementation available');
}
var Zt = "range", ho = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], mo = Z(Zt, ho, (r) => {
  var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: s, larger: D, largerEq: f, add: c, isPositive: o } = r;
  return e(Zt, { string: m, "string, boolean": m, number: function(d) {
    throw new TypeError("Too few arguments to function range(): ".concat(d));
  }, boolean: function(d) {
    throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(d, ", number|bigint|BigNumber|Fraction"));
  }, "number, number": function(d, h) {
    return l(v(d, h, 1, false));
  }, "number, number, number": function(d, h, C) {
    return l(v(d, h, C, false));
  }, "number, number, boolean": function(d, h, C) {
    return l(v(d, h, 1, C));
  }, "number, number, number, boolean": function(d, h, C, y) {
    return l(v(d, h, C, y));
  }, "bigint, bigint|number": function(d, h) {
    return l(v(d, h, 1n, false));
  }, "number, bigint": function(d, h) {
    return l(v(BigInt(d), h, 1n, false));
  }, "bigint, bigint|number, bigint|number": function(d, h, C) {
    return l(v(d, h, BigInt(C), false));
  }, "number, bigint, bigint|number": function(d, h, C) {
    return l(v(BigInt(d), h, BigInt(C), false));
  }, "bigint, bigint|number, boolean": function(d, h, C) {
    return l(v(d, h, 1n, C));
  }, "number, bigint, boolean": function(d, h, C) {
    return l(v(BigInt(d), h, 1n, C));
  }, "bigint, bigint|number, bigint|number, boolean": function(d, h, C, y) {
    return l(v(d, h, BigInt(C), y));
  }, "number, bigint, bigint|number, boolean": function(d, h, C, y) {
    return l(v(BigInt(d), h, BigInt(C), y));
  }, "BigNumber, BigNumber": function(d, h) {
    var C = d.constructor;
    return l(v(d, h, new C(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(d, h, C) {
    return l(v(d, h, C, false));
  }, "BigNumber, BigNumber, boolean": function(d, h, C) {
    var y = d.constructor;
    return l(v(d, h, new y(1), C));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(d, h, C, y) {
    return l(v(d, h, C, y));
  }, "Fraction, Fraction": function(d, h) {
    return l(v(d, h, 1, false));
  }, "Fraction, Fraction, Fraction": function(d, h, C) {
    return l(v(d, h, C, false));
  }, "Fraction, Fraction, boolean": function(d, h, C) {
    return l(v(d, h, 1, C));
  }, "Fraction, Fraction, Fraction, boolean": function(d, h, C, y) {
    return l(v(d, h, C, y));
  }, "Unit, Unit, Unit": function(d, h, C) {
    return l(v(d, h, C, false));
  }, "Unit, Unit, Unit, boolean": function(d, h, C, y) {
    return l(v(d, h, C, y));
  } });
  function l(i) {
    return n.matrix === "Matrix" ? u ? u(i) : Ln() : i;
  }
  function m(i, d) {
    var h = p(i);
    if (!h) throw new SyntaxError('String "' + i + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && Pn(), l(v(t(h.start), t(h.end), t(h.step)))) : l(v(h.start, h.end, h.step, d));
  }
  function v(i, d, h, C) {
    for (var y = [], w = o(h) ? C ? s : a : C ? f : D, F = i; w(F, d); ) y.push(F), F = c(F, h);
    return y;
  }
  function p(i) {
    var d = i.split(":"), h = d.map(function(y) {
      return Number(y);
    }), C = h.some(function(y) {
      return isNaN(y);
    });
    if (C) return null;
    switch (h.length) {
      case 2:
        return { start: h[0], end: h[1], step: 1 };
      case 3:
        return { start: h[0], end: h[2], step: h[1] };
      default:
        return null;
    }
  }
}), Jt = "reshape", go = ["typed", "isInteger", "matrix"], yo = Z(Jt, go, (r) => {
  var { typed: e, isInteger: n } = r;
  return e(Jt, { "Matrix, Array": function(t, a) {
    return t.reshape(a, true);
  }, "Array, Array": function(t, a) {
    return a.forEach(function(s) {
      if (!n(s)) throw new TypeError("Invalid size for dimension: " + s);
    }), Ge(t, a);
  } });
}), Qt = "size", Ao = ["typed", "config", "?matrix"], Fo = Z(Qt, Ao, (r) => {
  var { typed: e, config: n, matrix: u } = r;
  return e(Qt, { Matrix: function(a) {
    return a.create(a.size(), "number");
  }, Array: sr, string: function(a) {
    return n.matrix === "Array" ? [a.length] : u([a.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(a) {
    return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : Ln();
  } });
}), Xt = "transpose", Eo = ["typed", "matrix"], Co = Z(Xt, Eo, (r) => {
  var { typed: e, matrix: n } = r;
  return e(Xt, { Array: (s) => u(n(s)).valueOf(), Matrix: u, any: ur });
  function u(s) {
    var D = s.size(), f;
    switch (D.length) {
      case 1:
        f = s.clone();
        break;
      case 2:
        {
          var c = D[0], o = D[1];
          if (o === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + dr(D) + ")");
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
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + dr(D) + ")");
    }
    return f;
  }
  function t(s, D, f) {
    for (var c = s._data, o = [], l, m = 0; m < f; m++) {
      l = o[m] = [];
      for (var v = 0; v < D; v++) l[v] = ur(c[v][m]);
    }
    return s.createDenseMatrix({ data: o, size: [f, D], datatype: s._datatype });
  }
  function a(s, D, f) {
    for (var c = s._values, o = s._index, l = s._ptr, m = c ? [] : void 0, v = [], p = [], i = [], d = 0; d < D; d++) i[d] = 0;
    var h, C, y;
    for (h = 0, C = o.length; h < C; h++) i[o[h]]++;
    for (var w = 0, F = 0; F < D; F++) p.push(w), w += i[F], i[F] = p[F];
    for (p.push(w), y = 0; y < f; y++) for (var A = l[y], b = l[y + 1], E = A; E < b; E++) {
      var g = i[o[E]]++;
      v[g] = y, c && (m[g] = ur(c[E]));
    }
    return s.createSparseMatrix({ values: m, index: v, ptr: p, size: [f, D], datatype: s._datatype });
  }
}), Gt = "ctranspose", wo = ["typed", "transpose", "conj"], bo = Z(Gt, wo, (r) => {
  var { typed: e, transpose: n, conj: u } = r;
  return e(Gt, { any: function(a) {
    return u(n(a));
  } });
}), Yt = "zeros", _o = ["typed", "config", "matrix", "BigNumber"], Bo = Z(Yt, _o, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t } = r;
  return e(Yt, { "": function() {
    return n.matrix === "Array" ? a([]) : a([], "default");
  }, "...number | BigNumber | string": function(c) {
    var o = c[c.length - 1];
    if (typeof o == "string") {
      var l = c.pop();
      return a(c, l);
    } else return n.matrix === "Array" ? a(c) : a(c, "default");
  }, Array: a, Matrix: function(c) {
    var o = c.storage();
    return a(c.valueOf(), o);
  }, "Array | Matrix, string": function(c, o) {
    return a(c.valueOf(), o);
  } });
  function a(f, c) {
    var o = s(f), l = o ? new t(0) : 0;
    if (D(f), c) {
      var m = u(c);
      return f.length > 0 ? m.resize(f, l) : m;
    } else {
      var v = [];
      return f.length > 0 ? me(v, f, l) : v;
    }
  }
  function s(f) {
    var c = false;
    return f.forEach(function(o, l, m) {
      Ar(o) && (c = true, m[l] = o.toNumber());
    }), c;
  }
  function D(f) {
    f.forEach(function(c) {
      if (typeof c != "number" || !pr(c) || c < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), xo = "numeric", So = ["number", "?bignumber", "?fraction"], Mo = Z(xo, So, (r) => {
  var { number: e, bignumber: n, fraction: u } = r, t = { string: true, number: true, BigNumber: true, Fraction: true }, a = { number: (s) => e(s), BigNumber: n ? (s) => n(s) : Pn, bigint: (s) => BigInt(s), Fraction: u ? (s) => u(s) : po };
  return function(D) {
    var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", c = arguments.length > 2 ? arguments[2] : void 0;
    if (c !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var o = $r(D);
    if (!(o in t)) throw new TypeError("Cannot convert " + D + ' of type "' + o + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(f in a)) throw new TypeError("Cannot convert " + D + ' to type "' + f + '"; valid output types are ' + Object.keys(a).join(", "));
    return f === o ? D : a[f](D);
  };
}), Kt = "divideScalar", No = ["typed", "numeric"], To = Z(Kt, No, (r) => {
  var { typed: e, numeric: n } = r;
  return e(Kt, { "number, number": function(t, a) {
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
}), Ht = "pow", zo = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], Oo = Z(Ht, zo, (r) => {
  var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: s, number: D, fraction: f, Complex: c } = r;
  return e(Ht, { "number, number": o, "Complex, Complex": function(p, i) {
    return p.pow(i);
  }, "BigNumber, BigNumber": function(p, i) {
    return i.isInteger() || p >= 0 || n.predictable ? p.pow(i) : new c(p.toNumber(), 0).pow(i.toNumber(), 0);
  }, "bigint, bigint": (v, p) => v ** p, "Fraction, Fraction": function(p, i) {
    var d = p.pow(i);
    if (d != null) return d;
    if (n.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return o(p.valueOf(), i.valueOf());
  }, "Array, number": l, "Array, BigNumber": function(p, i) {
    return l(p, i.toNumber());
  }, "Matrix, number": m, "Matrix, BigNumber": function(p, i) {
    return m(p, i.toNumber());
  }, "Unit, number | BigNumber": function(p, i) {
    return p.pow(i);
  } });
  function o(v, p) {
    if (n.predictable && !pr(p) && v < 0) try {
      var i = f(p), d = D(i);
      if ((p === d || Math.abs((p - d) / p) < 1e-14) && i.d % 2n === 1n) return (i.n % 2n === 0n ? 1 : -1) * Math.pow(-v, p);
    } catch {
    }
    return n.predictable && (v < -1 && p === 1 / 0 || v > -1 && v < 0 && p === -1 / 0) ? NaN : pr(p) || v >= 0 || n.predictable ? $n(v, p) : v * v < 1 && p === 1 / 0 || v * v > 1 && p === -1 / 0 ? 0 : new c(v, 0).pow(p, 0);
  }
  function l(v, p) {
    if (!pr(p)) throw new TypeError("For A^b, b must be an integer (value is " + p + ")");
    var i = sr(v);
    if (i.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + i.length + " dimensions)");
    if (i[0] !== i[1]) throw new Error("For A^b, A must be square (size is " + i[0] + "x" + i[1] + ")");
    if (p < 0) try {
      return l(s(v), -p);
    } catch (C) {
      throw C.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + p + ")") : C;
    }
    for (var d = u(i[0]).valueOf(), h = v; p >= 1; ) (p & 1) === 1 && (d = t(h, d)), p >>= 1, h = t(h, h);
    return d;
  }
  function m(v, p) {
    return a(l(v.valueOf(), p));
  }
});
function Vn(r) {
  var { DenseMatrix: e } = r;
  return function(u, t, a) {
    var s = u.size();
    if (s.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + dr(s) + ")");
    var D = s[0], f = s[1];
    if (D !== f) throw new RangeError("Matrix must be square (size: " + dr(s) + ")");
    var c = [];
    if (fr(t)) {
      var o = t.size(), l = t._data;
      if (o.length === 1) {
        if (o[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var m = 0; m < D; m++) c[m] = [l[m]];
        return new e({ data: c, size: [D, 1], datatype: t._datatype });
      }
      if (o.length === 2) {
        if (o[0] !== D || o[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (vn(t)) {
          if (a) {
            c = [];
            for (var v = 0; v < D; v++) c[v] = [l[v][0]];
            return new e({ data: c, size: [D, 1], datatype: t._datatype });
          }
          return t;
        }
        if (Dn(t)) {
          for (var p = 0; p < D; p++) c[p] = [0];
          for (var i = t._values, d = t._index, h = t._ptr, C = h[1], y = h[0]; y < C; y++) {
            var w = d[y];
            c[w][0] = i[y];
          }
          return new e({ data: c, size: [D, 1], datatype: t._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (mr(t)) {
      var F = sr(t);
      if (F.length === 1) {
        if (F[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var A = 0; A < D; A++) c[A] = [t[A]];
        return new e({ data: c, size: [D, 1] });
      }
      if (F.length === 2) {
        if (F[0] !== D || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var b = 0; b < D; b++) c[b] = [t[b][0]];
        return new e({ data: c, size: [D, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var kt = "usolve", $o = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Io = Z(kt, $o, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, f = Vn({ DenseMatrix: D });
  return e(kt, { "SparseMatrix, Array | Matrix": function(m, v) {
    return o(m, v);
  }, "DenseMatrix, Array | Matrix": function(m, v) {
    return c(m, v);
  }, "Array, Array | Matrix": function(m, v) {
    var p = n(m), i = c(p, v);
    return i.valueOf();
  } });
  function c(l, m) {
    m = f(l, m, true);
    for (var v = m._data, p = l._size[0], i = l._size[1], d = [], h = l._data, C = i - 1; C >= 0; C--) {
      var y = v[C][0] || 0, w = void 0;
      if (s(y, 0)) w = 0;
      else {
        var F = h[C][C];
        if (s(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        w = u(y, F);
        for (var A = C - 1; A >= 0; A--) v[A] = [a(v[A][0] || 0, t(w, h[A][C]))];
      }
      d[C] = [w];
    }
    return new D({ data: d, size: [p, 1] });
  }
  function o(l, m) {
    m = f(l, m, true);
    for (var v = m._data, p = l._size[0], i = l._size[1], d = l._values, h = l._index, C = l._ptr, y = [], w = i - 1; w >= 0; w--) {
      var F = v[w][0] || 0;
      if (s(F, 0)) y[w] = [0];
      else {
        for (var A = 0, b = [], E = [], g = C[w], B = C[w + 1], _ = B - 1; _ >= g; _--) {
          var x = h[_];
          x === w ? A = d[_] : x < w && (b.push(d[_]), E.push(x));
        }
        if (s(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var N = u(F, A), S = 0, O = E.length; S < O; S++) {
          var M = E[S];
          v[M] = [a(v[M][0], t(N, b[S]))];
        }
        y[w] = [N];
      }
    }
    return new D({ data: y, size: [p, 1] });
  }
}), jt = "usolveAll", qo = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Ro = Z(jt, qo, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, f = Vn({ DenseMatrix: D });
  return e(jt, { "SparseMatrix, Array | Matrix": function(m, v) {
    return o(m, v);
  }, "DenseMatrix, Array | Matrix": function(m, v) {
    return c(m, v);
  }, "Array, Array | Matrix": function(m, v) {
    var p = n(m), i = c(p, v);
    return i.map((d) => d.valueOf());
  } });
  function c(l, m) {
    for (var v = [f(l, m, true)._data.map((E) => E[0])], p = l._data, i = l._size[0], d = l._size[1], h = d - 1; h >= 0; h--) for (var C = v.length, y = 0; y < C; y++) {
      var w = v[y];
      if (s(p[h][h], 0)) if (s(w[h], 0)) {
        if (y === 0) {
          var A = [...w];
          A[h] = 1;
          for (var b = h - 1; b >= 0; b--) A[b] = a(A[b], p[b][h]);
          v.push(A);
        }
      } else {
        if (y === 0) return [];
        v.splice(y, 1), y -= 1, C -= 1;
      }
      else {
        w[h] = u(w[h], p[h][h]);
        for (var F = h - 1; F >= 0; F--) w[F] = a(w[F], t(w[h], p[F][h]));
      }
    }
    return v.map((E) => new D({ data: E.map((g) => [g]), size: [i, 1] }));
  }
  function o(l, m) {
    for (var v = [f(l, m, true)._data.map((Y) => Y[0])], p = l._size[0], i = l._size[1], d = l._values, h = l._index, C = l._ptr, y = i - 1; y >= 0; y--) for (var w = v.length, F = 0; F < w; F++) {
      for (var A = v[F], b = [], E = [], g = C[y], B = C[y + 1], _ = 0, x = B - 1; x >= g; x--) {
        var N = h[x];
        N === y ? _ = d[x] : N < y && (b.push(d[x]), E.push(N));
      }
      if (s(_, 0)) if (s(A[y], 0)) {
        if (F === 0) {
          var R = [...A];
          R[y] = 1;
          for (var T = 0, $ = E.length; T < $; T++) {
            var Q = E[T];
            R[Q] = a(R[Q], b[T]);
          }
          v.push(R);
        }
      } else {
        if (F === 0) return [];
        v.splice(F, 1), F -= 1, w -= 1;
      }
      else {
        A[y] = u(A[y], _);
        for (var S = 0, O = E.length; S < O; S++) {
          var M = E[S];
          A[M] = a(A[M], t(A[y], b[S]));
        }
      }
    }
    return v.map((Y) => new D({ data: Y.map((z) => [z]), size: [p, 1] }));
  }
}), Ae = "equal", Uo = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat", "SparseMatrix"], Po = Z(Ae, Uo, (r) => {
  var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = re({ typed: e }), f = ie({ typed: e, SparseMatrix: s }), c = jr({ typed: e, DenseMatrix: t }), o = Qr({ typed: e, matrix: n, concat: a });
  return e(Ae, Lo({ typed: e, equalScalar: u }), o({ elop: u, SS: f, DS: D, Ss: c }));
}), Lo = Z(Ae, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(Ae, { "any, any": function(t, a) {
    return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
  } });
}), Fe = "smaller", Vo = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Wo = Z(Fe, Vo, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, f = re({ typed: e }), c = ie({ typed: e, SparseMatrix: D }), o = jr({ typed: e, DenseMatrix: a }), l = Qr({ typed: e, matrix: t, concat: s }), m = ae({ typed: e });
  function v(p, i) {
    return p.lt(i) && !kr(p, i, n.relTol, n.absTol);
  }
  return e(Fe, Zo({ typed: e, config: n }), { "boolean, boolean": (p, i) => p < i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p < i, "Fraction, Fraction": (p, i) => p.compare(i) === -1, "Fraction, BigNumber": function(i, d) {
    return v(u(i), d);
  }, "BigNumber, Fraction": function(i, d) {
    return v(i, u(d));
  }, "Complex, Complex": function(i, d) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, m, l({ SS: c, DS: f, Ss: o }));
}), Zo = Z(Fe, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Fe, { "number, number": function(t, a) {
    return t < a && !Ur(t, a, n.relTol, n.absTol);
  } });
}), Ee = "smallerEq", Jo = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Qo = Z(Ee, Jo, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = re({ typed: e }), f = ie({ typed: e, SparseMatrix: s }), c = jr({ typed: e, DenseMatrix: t }), o = Qr({ typed: e, matrix: u, concat: a }), l = ae({ typed: e });
  return e(Ee, Xo({ typed: e, config: n }), { "boolean, boolean": (m, v) => m <= v, "BigNumber, BigNumber": function(v, p) {
    return v.lte(p) || kr(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": (m, v) => m <= v, "Fraction, Fraction": (m, v) => m.compare(v) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: f, DS: D, Ss: c }));
}), Xo = Z(Ee, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Ee, { "number, number": function(t, a) {
    return t <= a || Ur(t, a, n.relTol, n.absTol);
  } });
}), Ce = "larger", Go = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Yo = Z(Ce, Go, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, f = re({ typed: e }), c = ie({ typed: e, SparseMatrix: D }), o = jr({ typed: e, DenseMatrix: a }), l = Qr({ typed: e, matrix: t, concat: s }), m = ae({ typed: e });
  function v(p, i) {
    return p.gt(i) && !kr(p, i, n.relTol, n.absTol);
  }
  return e(Ce, Ko({ typed: e, config: n }), { "boolean, boolean": (p, i) => p > i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p > i, "Fraction, Fraction": (p, i) => p.compare(i) === 1, "Fraction, BigNumber": function(i, d) {
    return v(u(i), d);
  }, "BigNumber, Fraction": function(i, d) {
    return v(i, u(d));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, m, l({ SS: c, DS: f, Ss: o }));
}), Ko = Z(Ce, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Ce, { "number, number": function(t, a) {
    return t > a && !Ur(t, a, n.relTol, n.absTol);
  } });
}), we = "largerEq", Ho = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], ko = Z(we, Ho, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = re({ typed: e }), f = ie({ typed: e, SparseMatrix: s }), c = jr({ typed: e, DenseMatrix: t }), o = Qr({ typed: e, matrix: u, concat: a }), l = ae({ typed: e });
  return e(we, jo({ typed: e, config: n }), { "boolean, boolean": (m, v) => m >= v, "BigNumber, BigNumber": function(v, p) {
    return v.gte(p) || kr(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": function(v, p) {
    return v >= p;
  }, "Fraction, Fraction": (m, v) => m.compare(v) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: f, DS: D, Ss: c }));
}), jo = Z(we, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(we, { "number, number": function(t, a) {
    return t >= a || Ur(t, a, n.relTol, n.absTol);
  } });
}), rs = "ImmutableDenseMatrix", es = ["smaller", "DenseMatrix"], ts = Z(rs, es, (r) => {
  var { smaller: e, DenseMatrix: n } = r;
  function u(t, a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !Or(a)) throw new Error("Invalid datatype: " + a);
    if (fr(t) || mr(t)) {
      var s = new n(t, a);
      this._data = s._data, this._size = s._size, this._datatype = s._datatype, this._min = null, this._max = null;
    } else if (t && mr(t.data) && mr(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t) throw new TypeError("Unsupported type of data (" + $r(t) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return u.prototype = new n(), u.prototype.type = "ImmutableDenseMatrix", u.prototype.isImmutableDenseMatrix = true, u.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var a = n.prototype.subset.call(this, t);
        return fr(a) ? new u({ data: a._data, size: a._size, datatype: a._datatype }) : a;
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
    return new u({ data: ur(this._data), size: ur(this._size), datatype: this._datatype });
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
}, { isClass: true }), ns = "Index", us = ["ImmutableDenseMatrix", "getMatrixDataType"], as = Z(ns, us, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
  function u(a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var s = 0, D = arguments.length; s < D; s++) {
      var f = arguments[s], c = mr(f), o = fr(f), l = typeof f, m = null;
      if (pn(f)) this._dimensions.push(f), this._isScalar = false;
      else if (c || o) {
        var v = void 0;
        n(f) === "boolean" ? (c && (v = t(rn(f).valueOf())), o && (v = t(rn(f._data).valueOf())), m = f.valueOf().length) : v = t(f.valueOf()), this._dimensions.push(v);
        var p = v.size();
        (p.length !== 1 || p[0] !== 1 || m !== null) && (this._isScalar = false);
      } else if (l === "number") this._dimensions.push(t([f]));
      else if (l === "bigint") this._dimensions.push(t([Number(f)]));
      else if (l === "string") this._dimensions.push(f);
      else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
      this._sourceSize.push(m);
    }
  }
  u.prototype.type = "Index", u.prototype.isIndex = true;
  function t(a) {
    for (var s = 0, D = a.length; s < D; s++) if (typeof a[s] != "number" || !pr(a[s])) throw new TypeError("Index parameters must be positive integer numbers");
    return new e(a);
  }
  return u.prototype.clone = function() {
    var a = new u();
    return a._dimensions = ur(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
  }, u.create = function(a) {
    var s = new u();
    return u.apply(s, a), s;
  }, u.prototype.size = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var f = this._dimensions[s];
      a[s] = typeof f == "string" ? 1 : f.size()[0];
    }
    return a;
  }, u.prototype.max = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var f = this._dimensions[s];
      a[s] = typeof f == "string" ? f : f.max();
    }
    return a;
  }, u.prototype.min = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var f = this._dimensions[s];
      a[s] = typeof f == "string" ? f : f.min();
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
      var f = this._dimensions[s];
      a.push(typeof f == "string" ? f : f.toArray());
    }
    return a;
  }, u.prototype.valueOf = u.prototype.toArray, u.prototype.toString = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var f = this._dimensions[s];
      typeof f == "string" ? a.push(JSON.stringify(f)) : a.push(f.toString());
    }
    return "[" + a.join(", ") + "]";
  }, u.prototype.toJSON = function() {
    return { mathjs: "Index", dimensions: this._dimensions };
  }, u.fromJSON = function(a) {
    return u.create(a.dimensions);
  }, u;
}, { isClass: true });
function rn(r) {
  var e = [];
  return r.forEach((n, u) => {
    n && e.push(u);
  }), e;
}
var is = "atan", os = ["typed"], ss = Z(is, os, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(u) {
    return Math.atan(u);
  }, Complex: function(u) {
    return u.atan();
  }, BigNumber: function(u) {
    return u.atan();
  } });
}), Wn = Z("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((n) => (u) => {
    if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(n, u.valueType())(u.value);
  }) };
}), en = "cos", fs = ["typed"], ls = Z(en, fs, (r) => {
  var { typed: e } = r, n = Wn({ typed: e });
  return e(en, { number: Math.cos, "Complex | BigNumber": (u) => u.cos() }, n);
}), tn = "sin", cs = ["typed"], vs = Z(tn, cs, (r) => {
  var { typed: e } = r, n = Wn({ typed: e });
  return e(tn, { number: Math.sin, "Complex | BigNumber": (u) => u.sin() }, n);
}), nn = "add", Ds = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], ps = Z(nn, Ds, (r) => {
  var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: s, concat: D } = r, f = Rn({ typed: e }), c = Ni({ typed: e, equalScalar: t }), o = Un({ typed: e, DenseMatrix: a }), l = Qr({ typed: e, matrix: n, concat: D });
  return e(nn, { "any, any": u, "any, any, ...any": e.referToSelf((m) => (v, p, i) => {
    for (var d = m(v, p), h = 0; h < i.length; h++) d = m(d, i[h]);
    return d;
  }) }, l({ elop: u, DS: f, SS: c, Ss: o }));
}), un = "norm", ds = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], hs = Z(un, ds, (r) => {
  var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: s, multiply: D, equalScalar: f, larger: c, smaller: o, matrix: l, ctranspose: m, eigs: v } = r;
  return e(un, { number: Math.abs, Complex: function(E) {
    return E.abs();
  }, BigNumber: function(E) {
    return E.abs();
  }, boolean: function(E) {
    return Math.abs(E);
  }, Array: function(E) {
    return A(l(E), 2);
  }, Matrix: function(E) {
    return A(E, 2);
  }, "Array, number | BigNumber | string": function(E, g) {
    return A(l(E), g);
  }, "Matrix, number | BigNumber | string": function(E, g) {
    return A(E, g);
  } });
  function p(b) {
    var E = 0;
    return b.forEach(function(g) {
      var B = n(g);
      c(B, E) && (E = B);
    }, true), E;
  }
  function i(b) {
    var E;
    return b.forEach(function(g) {
      var B = n(g);
      (!E || o(B, E)) && (E = B);
    }, true), E || 0;
  }
  function d(b, E) {
    if (E === Number.POSITIVE_INFINITY || E === "inf") return p(b);
    if (E === Number.NEGATIVE_INFINITY || E === "-inf") return i(b);
    if (E === "fro") return A(b, 2);
    if (typeof E == "number" && !isNaN(E)) {
      if (!f(E, 0)) {
        var g = 0;
        return b.forEach(function(B) {
          g = u(t(n(B), E), g);
        }, true), t(g, 1 / E);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function h(b) {
    var E = 0;
    return b.forEach(function(g, B) {
      E = u(E, D(g, a(g)));
    }), n(s(E));
  }
  function C(b) {
    var E = [], g = 0;
    return b.forEach(function(B, _) {
      var x = _[1], N = u(E[x] || 0, n(B));
      c(N, g) && (g = N), E[x] = N;
    }, true), g;
  }
  function y(b) {
    var E = b.size();
    if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
    var g = m(b), B = D(g, b), _ = v(B).values.toArray(), x = _[_.length - 1];
    return n(s(x));
  }
  function w(b) {
    var E = [], g = 0;
    return b.forEach(function(B, _) {
      var x = _[0], N = u(E[x] || 0, n(B));
      c(N, g) && (g = N), E[x] = N;
    }, true), g;
  }
  function F(b, E) {
    if (E === 1) return C(b);
    if (E === Number.POSITIVE_INFINITY || E === "inf") return w(b);
    if (E === "fro") return h(b);
    if (E === 2) return y(b);
    throw new Error("Unsupported parameter value " + E);
  }
  function A(b, E) {
    var g = b.size();
    if (g.length === 1) return d(b, E);
    if (g.length === 2) {
      if (g[0] && g[1]) return F(b, E);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), an = "dot", ms = ["typed", "addScalar", "multiplyScalar", "conj", "size"], gs = Z(an, ms, (r) => {
  var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
  return e(an, { "Array | DenseMatrix, Array | DenseMatrix": D, "SparseMatrix, SparseMatrix": f });
  function s(o, l) {
    var m = c(o), v = c(l), p, i;
    if (m.length === 1) p = m[0];
    else if (m.length === 2 && m[1] === 1) p = m[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + m.join(", ") + ")");
    if (v.length === 1) i = v[0];
    else if (v.length === 2 && v[1] === 1) i = v[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
    if (p !== i) throw new RangeError("Vectors must have equal length (" + p + " != " + i + ")");
    if (p === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return p;
  }
  function D(o, l) {
    var m = s(o, l), v = fr(o) ? o._data : o, p = fr(o) ? o._datatype || o.getDataType() : void 0, i = fr(l) ? l._data : l, d = fr(l) ? l._datatype || l.getDataType() : void 0, h = c(o).length === 2, C = c(l).length === 2, y = n, w = u;
    if (p && d && p === d && typeof p == "string" && p !== "mixed") {
      var F = p;
      y = e.find(n, [F, F]), w = e.find(u, [F, F]);
    }
    if (!h && !C) {
      for (var A = w(t(v[0]), i[0]), b = 1; b < m; b++) A = y(A, w(t(v[b]), i[b]));
      return A;
    }
    if (!h && C) {
      for (var E = w(t(v[0]), i[0][0]), g = 1; g < m; g++) E = y(E, w(t(v[g]), i[g][0]));
      return E;
    }
    if (h && !C) {
      for (var B = w(t(v[0][0]), i[0]), _ = 1; _ < m; _++) B = y(B, w(t(v[_][0]), i[_]));
      return B;
    }
    if (h && C) {
      for (var x = w(t(v[0][0]), i[0][0]), N = 1; N < m; N++) x = y(x, w(t(v[N][0]), i[N][0]));
      return x;
    }
  }
  function f(o, l) {
    s(o, l);
    for (var m = o._index, v = o._values, p = l._index, i = l._values, d = 0, h = n, C = u, y = 0, w = 0; y < m.length && w < p.length; ) {
      var F = m[y], A = p[w];
      if (F < A) {
        y++;
        continue;
      }
      if (F > A) {
        w++;
        continue;
      }
      F === A && (d = h(d, C(v[y], i[w])), y++, w++);
    }
    return d;
  }
  function c(o) {
    return fr(o) ? o.size() : a(o);
  }
}), on = "qr", ys = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], As = Z(on, ys, (r) => {
  var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: s, sign: D, sqrt: f, conj: c, unaryMinus: o, addScalar: l, divideScalar: m, multiplyScalar: v, subtractScalar: p, complex: i } = r;
  return be(e(on, { DenseMatrix: function(w) {
    return h(w);
  }, SparseMatrix: function(w) {
    return C();
  }, Array: function(w) {
    var F = n(w), A = h(F);
    return { Q: A.Q.valueOf(), R: A.R.valueOf() };
  } }), { _denseQRimpl: d });
  function d(y) {
    var w = y._size[0], F = y._size[1], A = t([w], "dense"), b = A._data, E = y.clone(), g = E._data, B, _, x, N = u([w], "");
    for (x = 0; x < Math.min(F, w); ++x) {
      var S = g[x][x], O = o(s(S, 0) ? 1 : D(S)), M = c(O), R = 0;
      for (B = x; B < w; B++) R = l(R, v(g[B][x], c(g[B][x])));
      var T = v(O, f(R));
      if (!a(T)) {
        var $ = p(S, T);
        for (N[x] = 1, B = x + 1; B < w; B++) N[B] = m(g[B][x], $);
        var Q = o(c(m($, T))), Y = void 0;
        for (_ = x; _ < F; _++) {
          for (Y = 0, B = x; B < w; B++) Y = l(Y, v(c(N[B]), g[B][_]));
          for (Y = v(Y, Q), B = x; B < w; B++) g[B][_] = v(p(g[B][_], v(N[B], Y)), M);
        }
        for (B = 0; B < w; B++) {
          for (Y = 0, _ = x; _ < w; _++) Y = l(Y, v(b[B][_], N[_]));
          for (Y = v(Y, Q), _ = x; _ < w; ++_) b[B][_] = m(p(b[B][_], v(Y, c(N[_]))), M);
        }
      }
    }
    return { Q: A, R: E, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function h(y) {
    var w = d(y), F = w.R._data;
    if (y._data.length > 0) for (var A = F[0][0].type === "Complex" ? i(0) : 0, b = 0; b < F.length; ++b) for (var E = 0; E < b && E < (F[0] || []).length; ++E) F[b][E] = A;
    return w;
  }
  function C(y) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
}), sn = "det", Fs = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], Es = Z(sn, Fs, (r) => {
  var { typed: e, matrix: n, subtractScalar: u, multiply: t, divideScalar: a, isZero: s, unaryMinus: D } = r;
  return e(sn, { any: function(o) {
    return ur(o);
  }, "Array | Matrix": function(o) {
    var l;
    switch (fr(o) ? l = o.size() : Array.isArray(o) ? (o = n(o), l = o.size()) : l = [], l.length) {
      case 0:
        return ur(o);
      case 1:
        if (l[0] === 1) return ur(o.valueOf()[0]);
        if (l[0] === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + dr(l) + ")");
      case 2: {
        var m = l[0], v = l[1];
        if (m === v) return f(o.clone().valueOf(), m);
        if (v === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + dr(l) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + dr(l) + ")");
    }
  } });
  function f(c, o, l) {
    if (o === 1) return ur(c[0][0]);
    if (o === 2) return u(t(c[0][0], c[1][1]), t(c[1][0], c[0][1]));
    for (var m = false, v = new Array(o).fill(0).map((b, E) => E), p = 0; p < o; p++) {
      var i = v[p];
      if (s(c[i][p])) {
        var d = void 0;
        for (d = p + 1; d < o; d++) if (!s(c[v[d]][p])) {
          i = v[d], v[d] = v[p], v[p] = i, m = !m;
          break;
        }
        if (d === o) return c[i][p];
      }
      for (var h = c[i][p], C = p === 0 ? 1 : c[v[p - 1]][p - 1], y = p + 1; y < o; y++) for (var w = v[y], F = p + 1; F < o; F++) c[w][F] = a(u(t(c[w][F], h), t(c[w][p], c[i][F])), C);
    }
    var A = c[v[o - 1]][o - 1];
    return m ? D(A) : A;
  }
}), fn = "inv", Cs = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], ws = Z(fn, Cs, (r) => {
  var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: s, det: D, identity: f, abs: c } = r;
  return e(fn, { "Array | Matrix": function(m) {
    var v = fr(m) ? m.size() : sr(m);
    switch (v.length) {
      case 1:
        if (v[0] === 1) return fr(m) ? n([u(1, m.valueOf()[0])]) : [u(1, m[0])];
        throw new RangeError("Matrix must be square (size: " + dr(v) + ")");
      case 2: {
        var p = v[0], i = v[1];
        if (p === i) return fr(m) ? n(o(m.valueOf(), p, i), m.storage()) : o(m, p, i);
        throw new RangeError("Matrix must be square (size: " + dr(v) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + dr(v) + ")");
    }
  }, any: function(m) {
    return u(1, m);
  } });
  function o(l, m, v) {
    var p, i, d, h, C;
    if (m === 1) {
      if (h = l[0][0], h === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(1, h)]];
    } else if (m === 2) {
      var y = D(l);
      if (y === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(l[1][1], y), u(s(l[0][1]), y)], [u(s(l[1][0]), y), u(l[0][0], y)]];
    } else {
      var w = l.concat();
      for (p = 0; p < m; p++) w[p] = w[p].concat();
      for (var F = f(m).valueOf(), A = 0; A < v; A++) {
        var b = c(w[A][A]), E = A;
        for (p = A + 1; p < m; ) c(w[p][A]) > b && (b = c(w[p][A]), E = p), p++;
        if (b === 0) throw Error("Cannot calculate inverse, determinant is zero");
        p = E, p !== A && (C = w[A], w[A] = w[p], w[p] = C, C = F[A], F[A] = F[p], F[p] = C);
        var g = w[A], B = F[A];
        for (p = 0; p < m; p++) {
          var _ = w[p], x = F[p];
          if (p !== A) {
            if (_[A] !== 0) {
              for (d = u(s(_[A]), g[A]), i = A; i < v; i++) _[i] = t(_[i], a(d, g[i]));
              for (i = 0; i < v; i++) x[i] = t(x[i], a(d, B[i]));
            }
          } else {
            for (d = g[A], i = A; i < v; i++) _[i] = u(_[i], d);
            for (i = 0; i < v; i++) x[i] = u(x[i], d);
          }
        }
      }
      return F;
    }
  }
});
function bs(r) {
  var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: s, sqrt: D, abs: f, bignumber: c, diag: o, size: l, reshape: m, inv: v, qr: p, usolve: i, usolveAll: d, equal: h, complex: C, larger: y, smaller: w, matrixFromColumns: F, dot: A } = r;
  function b(z, I, J, G) {
    var V = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, q = E(z, I, J, G, V);
    g(z, I, J, G, V, q);
    var { values: W, C: P } = B(z, I, J, G, V);
    if (V) {
      var U = _(z, I, P, q, W, J, G);
      return { values: W, eigenvectors: U };
    }
    return { values: W };
  }
  function E(z, I, J, G, V) {
    var q = G === "BigNumber", W = G === "Complex", P = q ? c(0) : 0, U = q ? c(1) : W ? C(1) : 1, K = q ? c(1) : 1, L = q ? c(10) : 2, j = a(L, L), er;
    V && (er = Array(I).fill(U));
    for (var tr = false; !tr; ) {
      tr = true;
      for (var nr = 0; nr < I; nr++) {
        for (var ir = P, or = P, gr = 0; gr < I; gr++) nr !== gr && (ir = e(ir, f(z[gr][nr])), or = e(or, f(z[nr][gr])));
        if (!h(ir, 0) && !h(or, 0)) {
          for (var cr = K, Dr = ir, xr = s(or, L), Sr = a(or, L); w(Dr, xr); ) Dr = a(Dr, j), cr = a(cr, L);
          for (; y(Dr, Sr); ) Dr = s(Dr, j), cr = s(cr, L);
          var Cr = w(s(e(Dr, or), cr), a(e(ir, or), 0.95));
          if (Cr) {
            tr = false;
            for (var Wr = s(1, cr), Nr = 0; Nr < I; Nr++) nr !== Nr && (z[nr][Nr] = a(z[nr][Nr], Wr), z[Nr][nr] = a(z[Nr][nr], cr));
            V && (er[nr] = a(er[nr], Wr));
          }
        }
      }
    }
    return V ? o(er) : null;
  }
  function g(z, I, J, G, V, q) {
    var W = G === "BigNumber", P = G === "Complex", U = W ? c(0) : P ? C(0) : 0;
    W && (J = c(J));
    for (var K = 0; K < I - 2; K++) {
      for (var L = 0, j = U, er = K + 1; er < I; er++) {
        var tr = z[er][K];
        w(f(j), f(tr)) && (j = tr, L = er);
      }
      if (!w(f(j), J)) {
        if (L !== K + 1) {
          var nr = z[L];
          z[L] = z[K + 1], z[K + 1] = nr;
          for (var ir = 0; ir < I; ir++) {
            var or = z[ir][L];
            z[ir][L] = z[ir][K + 1], z[ir][K + 1] = or;
          }
          if (V) {
            var gr = q[L];
            q[L] = q[K + 1], q[K + 1] = gr;
          }
        }
        for (var cr = K + 2; cr < I; cr++) {
          var Dr = s(z[cr][K], j);
          if (Dr !== 0) {
            for (var xr = 0; xr < I; xr++) z[cr][xr] = n(z[cr][xr], a(Dr, z[K + 1][xr]));
            for (var Sr = 0; Sr < I; Sr++) z[Sr][K + 1] = e(z[Sr][K + 1], a(Dr, z[Sr][cr]));
            if (V) for (var Cr = 0; Cr < I; Cr++) q[cr][Cr] = n(q[cr][Cr], a(Dr, q[K + 1][Cr]));
          }
        }
      }
    }
    return q;
  }
  function B(z, I, J, G, V) {
    var q = G === "BigNumber", W = G === "Complex", P = q ? c(1) : W ? C(1) : 1;
    q && (J = c(J));
    for (var U = ur(z), K = [], L = I, j = [], er = V ? o(Array(I).fill(P)) : void 0, tr = V ? o(Array(L).fill(P)) : void 0, nr = 0; nr <= 100; ) {
      nr += 1;
      for (var ir = U[L - 1][L - 1], or = 0; or < L; or++) U[or][or] = n(U[or][or], ir);
      var { Q: gr, R: cr } = p(U);
      U = t(cr, gr);
      for (var Dr = 0; Dr < L; Dr++) U[Dr][Dr] = e(U[Dr][Dr], ir);
      if (V && (tr = t(tr, gr)), L === 1 || w(f(U[L - 1][L - 2]), J)) {
        nr = 0, K.push(U[L - 1][L - 1]), V && (j.unshift([[1]]), S(tr, I), er = t(er, tr), L > 1 && (tr = o(Array(L - 1).fill(P)))), L -= 1, U.pop();
        for (var xr = 0; xr < L; xr++) U[xr].pop();
      } else if (L === 2 || w(f(U[L - 2][L - 3]), J)) {
        nr = 0;
        var Sr = x(U[L - 2][L - 2], U[L - 2][L - 1], U[L - 1][L - 2], U[L - 1][L - 1]);
        K.push(...Sr), V && (j.unshift(N(U[L - 2][L - 2], U[L - 2][L - 1], U[L - 1][L - 2], U[L - 1][L - 1], Sr[0], Sr[1], J, G)), S(tr, I), er = t(er, tr), L > 2 && (tr = o(Array(L - 2).fill(P)))), L -= 2, U.pop(), U.pop();
        for (var Cr = 0; Cr < L; Cr++) U[Cr].pop(), U[Cr].pop();
      }
      if (L === 0) break;
    }
    if (K.sort((le, qr) => +n(f(le), f(qr))), nr > 100) {
      var Wr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + K.join(", "));
      throw Wr.values = K, Wr.vectors = [], Wr;
    }
    var Nr = V ? t(er, O(j, I)) : void 0;
    return { values: K, C: Nr };
  }
  function _(z, I, J, G, V, q, W) {
    var P = v(J), U = t(P, z, J), K = W === "BigNumber", L = W === "Complex", j = K ? c(0) : L ? C(0) : 0, er = K ? c(1) : L ? C(1) : 1, tr = [], nr = [];
    for (var ir of V) {
      var or = M(tr, ir, h);
      or === -1 ? (tr.push(ir), nr.push(1)) : nr[or] += 1;
    }
    for (var gr = [], cr = tr.length, Dr = Array(I).fill(j), xr = o(Array(I).fill(er)), Sr = function() {
      var Nr = tr[Cr], le = n(U, t(Nr, xr)), qr = d(le, Dr);
      for (qr.shift(); qr.length < nr[Cr]; ) {
        var ft = R(le, I, qr, q, W);
        if (ft === null) break;
        qr.push(ft);
      }
      var Hn = t(v(G), J);
      qr = qr.map((Oe) => t(Hn, Oe)), gr.push(...qr.map((Oe) => ({ value: Nr, vector: u(Oe) })));
    }, Cr = 0; Cr < cr; Cr++) Sr();
    return gr;
  }
  function x(z, I, J, G) {
    var V = e(z, G), q = n(a(z, G), a(I, J)), W = a(V, 0.5), P = a(D(n(a(V, V), a(4, q))), 0.5);
    return [e(W, P), n(W, P)];
  }
  function N(z, I, J, G, V, q, W, P) {
    var U = P === "BigNumber", K = P === "Complex", L = U ? c(0) : K ? C(0) : 0, j = U ? c(1) : K ? C(1) : 1;
    if (w(f(J), W)) return [[j, L], [L, j]];
    if (y(f(n(V, q)), W)) return [[n(V, G), n(q, G)], [J, J]];
    var er = n(z, V), tr = n(G, V);
    return w(f(I), W) && w(f(tr), W) ? [[er, j], [J, L]] : [[I, L], [tr, j]];
  }
  function S(z, I) {
    for (var J = 0; J < z.length; J++) z[J].push(...Array(I - z[J].length).fill(0));
    for (var G = z.length; G < I; G++) z.push(Array(I).fill(0)), z[G][G] = 1;
    return z;
  }
  function O(z, I) {
    for (var J = [], G = 0; G < I; G++) J[G] = Array(I).fill(0);
    var V = 0;
    for (var q of z) {
      for (var W = q.length, P = 0; P < W; P++) for (var U = 0; U < W; U++) J[V + P][V + U] = q[P][U];
      V += W;
    }
    return J;
  }
  function M(z, I, J) {
    for (var G = 0; G < z.length; G++) if (J(z[G], I)) return G;
    return -1;
  }
  function R(z, I, J, G, V) {
    for (var q = V === "BigNumber" ? c(1e3) : 1e3, W, P = 0; P < 5; ++P) {
      W = T(I, J, V);
      try {
        W = i(z, W);
      } catch {
        continue;
      }
      if (y(Q(W), q)) break;
    }
    if (P >= 5) return null;
    for (P = 0; ; ) {
      var U = i(z, W);
      if (w(Q($(W, [U])), G)) break;
      if (++P >= 10) return null;
      W = Y(U);
    }
    return W;
  }
  function T(z, I, J) {
    var G = J === "BigNumber", V = J === "Complex", q = Array(z).fill(0).map((W) => 2 * Math.random() - 1);
    return G && (q = q.map((W) => c(W))), V && (q = q.map((W) => C(W))), q = $(q, I), Y(q, J);
  }
  function $(z, I) {
    var J = l(z);
    for (var G of I) G = m(G, J), z = n(z, t(s(A(G, z), A(G, G)), G));
    return z;
  }
  function Q(z) {
    return f(D(A(z, z)));
  }
  function Y(z, I) {
    var J = I === "BigNumber", G = I === "Complex", V = J ? c(1) : G ? C(1) : 1;
    return t(s(V, Q(z)), z);
  }
  return b;
}
function _s(r) {
  var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: s, sin: D, multiplyScalar: f, inv: c, bignumber: o, multiply: l, add: m } = r;
  function v(g, B) {
    var _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, x = arguments.length > 3 ? arguments[3] : void 0, N = arguments.length > 4 ? arguments[4] : void 0;
    if (x === "number") return p(g, _, N);
    if (x === "BigNumber") return i(g, _, N);
    throw TypeError("Unsupported data type: " + x);
  }
  function p(g, B, _) {
    var x = g.length, N = Math.abs(B / x), S, O;
    if (_) {
      O = new Array(x);
      for (var M = 0; M < x; M++) O[M] = Array(x).fill(0), O[M][M] = 1;
    }
    for (var R = A(g); Math.abs(R[1]) >= Math.abs(N); ) {
      var T = R[0][0], $ = R[0][1];
      S = d(g[T][T], g[$][$], g[T][$]), g = F(g, S, T, $), _ && (O = C(O, S, T, $)), R = A(g);
    }
    for (var Q = Array(x).fill(0), Y = 0; Y < x; Y++) Q[Y] = g[Y][Y];
    return E(ur(Q), O, _);
  }
  function i(g, B, _) {
    var x = g.length, N = t(B / x), S, O;
    if (_) {
      O = new Array(x);
      for (var M = 0; M < x; M++) O[M] = Array(x).fill(0), O[M][M] = 1;
    }
    for (var R = b(g); t(R[1]) >= t(N); ) {
      var T = R[0][0], $ = R[0][1];
      S = h(g[T][T], g[$][$], g[T][$]), g = w(g, S, T, $), _ && (O = y(O, S, T, $)), R = b(g);
    }
    for (var Q = Array(x).fill(0), Y = 0; Y < x; Y++) Q[Y] = g[Y][Y];
    return E(ur(Q), O, _);
  }
  function d(g, B, _) {
    var x = B - g;
    return Math.abs(x) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * _ / (B - g));
  }
  function h(g, B, _) {
    var x = u(B, g);
    return t(x) <= e.relTol ? o(-1).acos().div(4) : f(0.5, a(l(2, _, c(x))));
  }
  function C(g, B, _, x) {
    for (var N = g.length, S = Math.cos(B), O = Math.sin(B), M = Array(N).fill(0), R = Array(N).fill(0), T = 0; T < N; T++) M[T] = S * g[T][_] - O * g[T][x], R[T] = O * g[T][_] + S * g[T][x];
    for (var $ = 0; $ < N; $++) g[$][_] = M[$], g[$][x] = R[$];
    return g;
  }
  function y(g, B, _, x) {
    for (var N = g.length, S = s(B), O = D(B), M = Array(N).fill(o(0)), R = Array(N).fill(o(0)), T = 0; T < N; T++) M[T] = u(f(S, g[T][_]), f(O, g[T][x])), R[T] = n(f(O, g[T][_]), f(S, g[T][x]));
    for (var $ = 0; $ < N; $++) g[$][_] = M[$], g[$][x] = R[$];
    return g;
  }
  function w(g, B, _, x) {
    for (var N = g.length, S = o(s(B)), O = o(D(B)), M = f(S, S), R = f(O, O), T = Array(N).fill(o(0)), $ = Array(N).fill(o(0)), Q = l(o(2), S, O, g[_][x]), Y = n(u(f(M, g[_][_]), Q), f(R, g[x][x])), z = m(f(R, g[_][_]), Q, f(M, g[x][x])), I = 0; I < N; I++) T[I] = u(f(S, g[_][I]), f(O, g[x][I])), $[I] = n(f(O, g[_][I]), f(S, g[x][I]));
    g[_][_] = Y, g[x][x] = z, g[_][x] = o(0), g[x][_] = o(0);
    for (var J = 0; J < N; J++) J !== _ && J !== x && (g[_][J] = T[J], g[J][_] = T[J], g[x][J] = $[J], g[J][x] = $[J]);
    return g;
  }
  function F(g, B, _, x) {
    for (var N = g.length, S = Math.cos(B), O = Math.sin(B), M = S * S, R = O * O, T = Array(N).fill(0), $ = Array(N).fill(0), Q = M * g[_][_] - 2 * S * O * g[_][x] + R * g[x][x], Y = R * g[_][_] + 2 * S * O * g[_][x] + M * g[x][x], z = 0; z < N; z++) T[z] = S * g[_][z] - O * g[x][z], $[z] = O * g[_][z] + S * g[x][z];
    g[_][_] = Q, g[x][x] = Y, g[_][x] = 0, g[x][_] = 0;
    for (var I = 0; I < N; I++) I !== _ && I !== x && (g[_][I] = T[I], g[I][_] = T[I], g[x][I] = $[I], g[I][x] = $[I]);
    return g;
  }
  function A(g) {
    for (var B = g.length, _ = 0, x = [0, 1], N = 0; N < B; N++) for (var S = N + 1; S < B; S++) Math.abs(_) < Math.abs(g[N][S]) && (_ = Math.abs(g[N][S]), x = [N, S]);
    return [x, _];
  }
  function b(g) {
    for (var B = g.length, _ = 0, x = [0, 1], N = 0; N < B; N++) for (var S = N + 1; S < B; S++) t(_) < t(g[N][S]) && (_ = t(g[N][S]), x = [N, S]);
    return [x, _];
  }
  function E(g, B, _) {
    var x = g.length, N = Array(x), S;
    if (_) {
      S = Array(x);
      for (var O = 0; O < x; O++) S[O] = Array(x);
    }
    for (var M = 0; M < x; M++) {
      for (var R = 0, T = g[0], $ = 0; $ < g.length; $++) t(g[$]) < t(T) && (R = $, T = g[R]);
      if (N[M] = g.splice(R, 1)[0], _) for (var Q = 0; Q < x; Q++) S[M][Q] = B[Q][R], B[Q].splice(R, 1);
    }
    if (!_) return { values: N };
    var Y = S.map((z, I) => ({ value: N[I], vector: z }));
    return { values: N, eigenvectors: Y };
  }
  return v;
}
var Bs = "eigs", xs = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], Ss = Z(Bs, xs, (r) => {
  var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: s, abs: D, atan: f, cos: c, sin: o, multiplyScalar: l, divideScalar: m, inv: v, bignumber: p, multiply: i, add: d, larger: h, column: C, flatten: y, number: w, complex: F, sqrt: A, diag: b, size: E, reshape: g, qr: B, usolve: _, usolveAll: x, im: N, re: S, smaller: O, matrixFromColumns: M, dot: R } = r, T = _s({ config: e, addScalar: t, subtract: a, abs: D, atan: f, cos: c, sin: o, multiplyScalar: l, inv: v, bignumber: p, multiply: i, add: d }), $ = bs({ addScalar: t, subtract: a, multiply: i, multiplyScalar: l, flatten: y, divideScalar: m, sqrt: A, abs: D, bignumber: p, diag: b, size: E, reshape: g, qr: B, inv: v, usolve: _, usolveAll: x, equal: s, complex: F, larger: h, smaller: O, matrixFromColumns: M, dot: R });
  return n("eigs", { Array: function(q) {
    return Q(u(q));
  }, "Array, number|BigNumber": function(q, W) {
    return Q(u(q), { precision: W });
  }, "Array, Object"(V, q) {
    return Q(u(V), q);
  }, Matrix: function(q) {
    return Q(q, { matricize: true });
  }, "Matrix, number|BigNumber": function(q, W) {
    return Q(q, { precision: W, matricize: true });
  }, "Matrix, Object": function(q, W) {
    var P = { matricize: true };
    return be(P, W), Q(q, P);
  } });
  function Q(V) {
    var q, W = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, P = "eigenvectors" in W ? W.eigenvectors : true, U = (q = W.precision) !== null && q !== void 0 ? q : e.relTol, K = Y(V, U, P);
    return W.matricize && (K.values = u(K.values), P && (K.eigenvectors = K.eigenvectors.map((L) => {
      var { value: j, vector: er } = L;
      return { value: j, vector: u(er) };
    }))), P && Object.defineProperty(K, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), K;
  }
  function Y(V, q, W) {
    var P = V.toArray(), U = V.size();
    if (U.length !== 2 || U[0] !== U[1]) throw new RangeError("Matrix must be square (size: ".concat(dr(U), ")"));
    var K = U[0];
    if (I(P, K, q) && (J(P, K), z(P, K, q))) {
      var L = G(V, P, K);
      return T(P, K, q, L, W);
    }
    var j = G(V, P, K);
    return $(P, K, q, j, W);
  }
  function z(V, q, W) {
    for (var P = 0; P < q; P++) for (var U = P; U < q; U++) if (h(p(D(a(V[P][U], V[U][P]))), W)) return false;
    return true;
  }
  function I(V, q, W) {
    for (var P = 0; P < q; P++) for (var U = 0; U < q; U++) if (h(p(D(N(V[P][U]))), W)) return false;
    return true;
  }
  function J(V, q) {
    for (var W = 0; W < q; W++) for (var P = 0; P < q; P++) V[W][P] = S(V[W][P]);
  }
  function G(V, q, W) {
    var P = V.datatype();
    if (P === "number" || P === "BigNumber" || P === "Complex") return P;
    for (var U = false, K = false, L = false, j = 0; j < W; j++) for (var er = 0; er < W; er++) {
      var tr = q[j][er];
      if (vr(tr) || Ze(tr)) U = true;
      else if (Ar(tr)) K = true;
      else if (We(tr)) L = true;
      else throw TypeError("Unsupported type in Matrix: " + $r(tr));
    }
    if (K && L && console.warn("Complex BigNumbers not supported, this operation will lose precission."), L) {
      for (var nr = 0; nr < W; nr++) for (var ir = 0; ir < W; ir++) q[nr][ir] = F(q[nr][ir]);
      return "Complex";
    }
    if (K) {
      for (var or = 0; or < W; or++) for (var gr = 0; gr < W; gr++) q[or][gr] = p(q[or][gr]);
      return "BigNumber";
    }
    if (U) {
      for (var cr = 0; cr < W; cr++) for (var Dr = 0; Dr < W; Dr++) q[cr][Dr] = w(q[cr][Dr]);
      return "number";
    } else throw TypeError("Matrix contains unsupported types only.");
  }
}), Ms = "divide", Ns = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], Ts = Z(Ms, Ns, (r) => {
  var { typed: e, matrix: n, multiply: u, equalScalar: t, divideScalar: a, inv: s } = r, D = qn({ typed: e, equalScalar: t }), f = He({ typed: e });
  return e("divide", dn({ "Array | Matrix, Array | Matrix": function(o, l) {
    return u(o, s(l));
  }, "DenseMatrix, any": function(o, l) {
    return f(o, l, a, false);
  }, "SparseMatrix, any": function(o, l) {
    return D(o, l, a, false);
  }, "Array, any": function(o, l) {
    return f(n(o), l, a, false).valueOf();
  }, "any, Array | Matrix": function(o, l) {
    return u(o, s(l));
  } }, a.signatures));
}), oe = Ku({ config: br }), Me = ju({}), ke = ia({}), je = fa({}), Br = wa({ Matrix: je }), k = Qu({ BigNumber: oe, Complex: Me, DenseMatrix: Br, Fraction: ke }), rt = ai({ typed: k }), ee = oi({ typed: k }), zs = ss({ typed: k }), et = Ga({ Complex: Me, typed: k }), Ne = Yi({ typed: k }), Os = ls({ typed: k }), Ir = Oa({ config: br, typed: k }), Zn = fo({ typed: k }), $s = co({ typed: k }), Is = Hi({ typed: k }), Jn = _a({ typed: k }), qs = Sa({ config: br, typed: k }), Qn = Na({ equalScalar: Ir, typed: k }), te = Ii({ typed: k }), tt = Va({ typed: k }), Rs = ji({ typed: k }), Us = Pi({ BigNumber: oe, Fraction: ke, complex: et, typed: k }), Ps = vs({ typed: k }), Pr = qa({ Matrix: je, equalScalar: Ir, typed: k }), se = fi({ typed: k }), fe = Ja({ BigNumber: oe, typed: k }), lr = ja({ DenseMatrix: Br, Matrix: je, SparseMatrix: Pr, typed: k }), Ls = yo({ isInteger: Jn, matrix: lr, typed: k }), nt = Wi({ Complex: Me, config: br, typed: k }), Vs = Co({ matrix: lr, typed: k }), Ws = Bo({ BigNumber: oe, config: br, matrix: lr, typed: k }), Xr = eo({ isInteger: Jn, matrix: lr, typed: k }), Zs = bo({ conj: Ne, transpose: Vs, typed: k }), Js = oo({ DenseMatrix: Br, SparseMatrix: Pr, matrix: lr, typed: k }), Xn = Po({ DenseMatrix: Br, SparseMatrix: Pr, concat: Xr, equalScalar: Ir, matrix: lr, typed: k }), Gn = Ha({ Fraction: ke, typed: k }), ut = Do({ BigNumber: oe, DenseMatrix: Br, SparseMatrix: Pr, config: br, matrix: lr, typed: k }), Qs = ko({ DenseMatrix: Br, SparseMatrix: Pr, concat: Xr, config: br, matrix: lr, typed: k }), Xs = Mo({ bignumber: fe, fraction: Gn, number: tt }), at = Fo({ matrix: lr, config: br, typed: k }), Te = Wo({ DenseMatrix: Br, SparseMatrix: Pr, bignumber: fe, concat: Xr, config: br, matrix: lr, typed: k }), ze = ni({ typed: k }), it = ps({ DenseMatrix: Br, SparseMatrix: Pr, addScalar: ee, concat: Xr, equalScalar: Ir, matrix: lr, typed: k }), Gr = To({ numeric: Xs, typed: k }), Gs = ts({ DenseMatrix: Br, smaller: Te }), Ys = as({ ImmutableDenseMatrix: Gs, getMatrixDataType: $s }), ot = Yo({ DenseMatrix: Br, SparseMatrix: Pr, bignumber: fe, concat: Xr, config: br, matrix: lr, typed: k }), Ks = ei({ flatten: Zn, matrix: lr, size: at, typed: k }), Hs = As({ addScalar: ee, complex: et, conj: Ne, divideScalar: Gr, equal: Xn, identity: ut, isZero: Qn, matrix: lr, multiplyScalar: te, sign: Us, sqrt: nt, subtractScalar: se, typed: k, unaryMinus: ze, zeros: Ws }), ks = Qo({ DenseMatrix: Br, SparseMatrix: Pr, concat: Xr, config: br, matrix: lr, typed: k }), Yn = Ji({ DenseMatrix: Br, concat: Xr, equalScalar: Ir, matrix: lr, subtractScalar: se, typed: k, unaryMinus: ze }), js = Io({ DenseMatrix: Br, divideScalar: Gr, equalScalar: Ir, matrix: lr, multiplyScalar: te, subtractScalar: se, typed: k }), Kn = gs({ addScalar: ee, conj: Ne, multiplyScalar: te, size: at, typed: k }), Yr = Ri({ addScalar: ee, dot: Kn, equalScalar: Ir, matrix: lr, multiplyScalar: te, typed: k }), rf = mo({ bignumber: fe, matrix: lr, add: it, config: br, isPositive: qs, larger: ot, largerEq: Qs, smaller: Te, smallerEq: ks, typed: k }), ef = Ro({ DenseMatrix: Br, divideScalar: Gr, equalScalar: Ir, matrix: lr, multiplyScalar: te, subtractScalar: se, typed: k }), tf = no({ Index: Ys, matrix: lr, range: rf, typed: k }), sf = ao({ matrix: lr, multiply: Yr, subtract: Yn, typed: k }), nf = Es({ divideScalar: Gr, isZero: Qn, matrix: lr, multiply: Yr, subtractScalar: se, typed: k, unaryMinus: ze }), st = ws({ abs: rt, addScalar: ee, det: nf, divideScalar: Gr, identity: ut, matrix: lr, multiply: Yr, typed: k, unaryMinus: ze }), uf = Oo({ Complex: Me, config: br, fraction: Gn, identity: ut, inv: st, matrix: lr, multiply: Yr, number: tt, typed: k }), ff = Ts({ divideScalar: Gr, equalScalar: Ir, inv: st, matrix: lr, multiply: Yr, typed: k }), af = Ss({ abs: rt, add: it, addScalar: ee, atan: zs, bignumber: fe, column: tf, complex: et, config: br, cos: Os, diag: Js, divideScalar: Gr, dot: Kn, equal: Xn, flatten: Zn, im: Is, inv: st, larger: ot, matrix: lr, matrixFromColumns: Ks, multiply: Yr, multiplyScalar: te, number: tt, qr: Hs, re: Rs, reshape: Ls, sin: Ps, size: at, smaller: Te, sqrt: nt, subtract: Yn, typed: k, usolve: js, usolveAll: ef }), lf = hs({ abs: rt, add: it, conj: Ne, ctranspose: Zs, eigs: af, equalScalar: Ir, larger: ot, matrix: lr, multiply: Yr, pow: uf, smaller: Te, sqrt: nt, typed: k });
export {
  it as a,
  sf as c,
  ff as d,
  Yr as m,
  lf as n,
  Yn as s
};
