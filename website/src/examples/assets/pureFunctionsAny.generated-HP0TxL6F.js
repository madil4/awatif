import { _ as be, t as pe, D as ft, C as Fr } from "./complex-ViNjxWW9.js";
var yn = { relTol: 1e-12, absTol: 1e-15, matrix: "Matrix", number: "number", numberFallback: "number", precision: 64, predictable: false, randomSeed: null };
function An(r, e) {
  if (he(r, e)) return r[e];
  throw typeof r[e] == "function" && pa(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function Fn(r, e, n) {
  if (he(r, e)) return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function he(r, e) {
  return !ha(r) && !Array.isArray(r) ? false : te(da, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function pa(r, e) {
  return r == null || typeof r[e] != "function" || te(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : te(ma, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function ha(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var da = { length: true, name: true }, ma = { toString: true, valueOf: true, toLocaleString: true };
class ga {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
  }
  get(e) {
    return An(this.wrappedObject, e);
  }
  set(e, n) {
    return Fn(this.wrappedObject, e, n), this;
  }
  has(e) {
    return he(this.wrappedObject, e) && e in this.wrappedObject;
  }
  entries() {
    return ya(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var n of this.keys()) e(this.get(n), n, this);
  }
  delete(e) {
    he(this.wrappedObject, e) && delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys()) this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
function ya(r, e) {
  return { next: () => {
    var n = r.next();
    return n.done ? n : { value: e(n.value), done: false };
  } };
}
function pr(r) {
  return typeof r == "number";
}
function mr(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function Aa(r) {
  return typeof r == "bigint";
}
function Je(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function Qe(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function En(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function Nr(r) {
  return typeof r == "string";
}
var lr = Array.isArray;
function cr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function de(r) {
  return Array.isArray(r) || cr(r);
}
function wn(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Cn(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function _n(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function xe(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function Fa(r) {
  return typeof r == "boolean";
}
function Ea(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function wa(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function Ca(r) {
  return typeof r == "function";
}
function _a(r) {
  return r instanceof Date;
}
function ba(r) {
  return r instanceof RegExp;
}
function Ge(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !Je(r) && !Qe(r));
}
function xa(r) {
  return r ? r instanceof Map || r instanceof ga || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
function Ba(r) {
  return r === null;
}
function Sa(r) {
  return r === void 0;
}
function Ma(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function Na(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function za(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Ta(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function $a(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function Oa(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function qa(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Ia(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function Ra(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function Ua(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function Pa(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function La(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function Va(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function Za(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function Ja(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function Qa(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function Ga(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function zr(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : mr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function ir(r) {
  var e = typeof r;
  if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
  if (typeof r.clone == "function") return r.clone();
  if (Array.isArray(r)) return r.map(function(n) {
    return ir(n);
  });
  if (r instanceof Date) return new Date(r.valueOf());
  if (mr(r)) return r;
  if (Ge(r)) return Xa(r, ir);
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function Xa(r, e) {
  var n = {};
  for (var a in r) te(r, a) && (n[a] = e(r[a]));
  return n;
}
function bn(r, e) {
  for (var n in e) te(e, n) && (r[n] = e[n]);
  return r;
}
function Lr(r, e) {
  var n, a, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length) return false;
    for (a = 0, t = r.length; a < t; a++) if (!Lr(r[a], e[a])) return false;
    return true;
  } else {
    if (typeof r == "function") return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object)) return false;
      for (n in r) if (!(n in e) || !Lr(r[n], e[n])) return false;
      for (n in e) if (!(n in r)) return false;
      return true;
    } else return r === e;
  }
}
function te(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function Ya(r, e) {
  for (var n = {}, a = 0; a < e.length; a++) {
    var t = e[a], i = r[t];
    i !== void 0 && (n[t] = i);
  }
  return n;
}
var Ka = ["Matrix", "Array"], Wa = ["number", "BigNumber", "Fraction"], xr = function(e) {
  if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(yn);
};
be(xr, yn, { MATRIX_OPTIONS: Ka, NUMBER_OPTIONS: Wa });
function G(r, e, n, a) {
  function t(i) {
    var v = Ya(i, e.map(ja));
    return Ha(r, e, i), n(v);
  }
  return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), a && (t.meta = a), t;
}
function Ha(r, e, n) {
  var a = e.filter((i) => !ka(i)).every((i) => n[i] !== void 0);
  if (!a) {
    var t = e.filter((i) => n[i] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((i) => '"'.concat(i, '"')).join(", "), "."));
  }
}
function ka(r) {
  return r && r[0] === "?";
}
function ja(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function hr(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var ru = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function qe(r, e, n) {
  var a = { 2: "0b", 8: "0o", 16: "0x" }, t = a[e], i = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!hr(n)) throw new Error("size must be an integer");
    if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!hr(r)) throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** n), i = "i".concat(n);
  }
  var v = "";
  return r < 0 && (r = -r, v = "-"), "".concat(v).concat(t).concat(r.toString(e)).concat(i);
}
function Re(r, e) {
  if (typeof e == "function") return e(r);
  if (r === 1 / 0) return "Infinity";
  if (r === -1 / 0) return "-Infinity";
  if (isNaN(r)) return "NaN";
  var { notation: n, precision: a, wordSize: t } = xn(e);
  switch (n) {
    case "fixed":
      return tu(r, a);
    case "exponential":
      return Bn(r, a);
    case "engineering":
      return eu(r, a);
    case "bin":
      return qe(r, 2, t);
    case "oct":
      return qe(r, 8, t);
    case "hex":
      return qe(r, 16, t);
    case "auto":
      return nu(r, a, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var i = arguments[2], v = arguments[4];
        return i !== "." ? i + v : v;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function xn(r) {
  var e = "auto", n, a;
  if (r !== void 0) if (pr(r)) n = r;
  else if (mr(r)) n = r.toNumber();
  else if (Ge(r)) r.precision !== void 0 && (n = vt(r.precision, () => {
    throw new Error('Option "precision" must be a number or BigNumber');
  })), r.wordSize !== void 0 && (a = vt(r.wordSize, () => {
    throw new Error('Option "wordSize" must be a number or BigNumber');
  })), r.notation && (e = r.notation);
  else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: n, wordSize: a };
}
function Be(r) {
  var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e) throw new SyntaxError("Invalid number " + r);
  var n = e[1], a = e[2], t = parseFloat(e[4] || "0"), i = a.indexOf(".");
  t += i !== -1 ? i - 1 : a.length - 1;
  var v = a.replace(".", "").replace(/^0*/, function(p) {
    return t -= p.length, "";
  }).replace(/0*$/, "").split("").map(function(p) {
    return parseInt(p);
  });
  return v.length === 0 && (v.push(0), t++), { sign: n, coefficients: v, exponent: t };
}
function eu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Be(r), a = Se(n, e), t = a.exponent, i = a.coefficients, v = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if (pr(e)) for (; e > i.length || t - v + 1 > i.length; ) i.push(0);
  else for (var p = Math.abs(t - v) - (i.length - 1), f = 0; f < p; f++) i.push(0);
  for (var l = Math.abs(t - v), u = 1; l > 0; ) u++, l--;
  var o = i.slice(u).join(""), D = pr(e) && o.length || o.match(/[1-9]/) ? "." + o : "", c = i.slice(0, u).join("") + D + "e" + (t >= 0 ? "+" : "") + v.toString();
  return a.sign + c;
}
function tu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Be(r), a = typeof e == "number" ? Se(n, n.exponent + 1 + e) : n, t = a.coefficients, i = a.exponent + 1, v = i + (e || 0);
  return t.length < v && (t = t.concat(Wr(v - t.length))), i < 0 && (t = Wr(-i + 1).concat(t), i = 1), i < t.length && t.splice(i, 0, i === 0 ? "0." : "."), a.sign + t.join("");
}
function Bn(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Be(r), a = e ? Se(n, e) : n, t = a.coefficients, i = a.exponent;
  t.length < e && (t = t.concat(Wr(e - t.length)));
  var v = t.shift();
  return a.sign + v + (t.length > 0 ? "." + t.join("") : "") + "e" + (i >= 0 ? "+" : "") + i;
}
function nu(r, e, n) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var a = lt(n == null ? void 0 : n.lowerExp, -3), t = lt(n == null ? void 0 : n.upperExp, 5), i = Be(r), v = e ? Se(i, e) : i;
  if (v.exponent < a || v.exponent >= t) return Bn(r, e);
  var p = v.coefficients, f = v.exponent;
  p.length < e && (p = p.concat(Wr(e - p.length))), p = p.concat(Wr(f - p.length + 1 + (p.length < e ? e - p.length : 0))), p = Wr(-f).concat(p);
  var l = f > 0 ? f : 0;
  return l < p.length - 1 && p.splice(l + 1, 0, "."), v.sign + p.join("");
}
function Se(r, e) {
  for (var n = { sign: r.sign, coefficients: r.coefficients, exponent: r.exponent }, a = n.coefficients; e <= 0; ) a.unshift(0), n.exponent++, e++;
  if (a.length > e) {
    var t = a.splice(e, a.length - e);
    if (t[0] >= 5) {
      var i = e - 1;
      for (a[i]++; a[i] === 10; ) a.pop(), i === 0 && (a.unshift(0), n.exponent++, i++), i--, a[i]++;
    }
  }
  return n;
}
function Wr(r) {
  for (var e = [], n = 0; n < r; n++) e.push(0);
  return e;
}
function au(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function Ir(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (a < 0) throw new Error("Absolute tolerance must be at least 0");
  return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), a);
}
function vt(r, e) {
  if (pr(r)) return r;
  if (mr(r)) return r.toNumber();
  e();
}
function lt(r, e) {
  return pr(r) ? r : mr(r) ? r.toNumber() : e;
}
var Sn = function() {
  return Sn = pe.create, pe;
}, uu = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], iu = G("typed", uu, function(e) {
  var { BigNumber: n, Complex: a, DenseMatrix: t, Fraction: i } = e, v = Sn();
  return v.clear(), v.addTypes([{ name: "number", test: pr }, { name: "Complex", test: Je }, { name: "BigNumber", test: mr }, { name: "bigint", test: Aa }, { name: "Fraction", test: Qe }, { name: "Unit", test: En }, { name: "identifier", test: (p) => Nr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(p) }, { name: "string", test: Nr }, { name: "Chain", test: Ga }, { name: "Array", test: lr }, { name: "Matrix", test: cr }, { name: "DenseMatrix", test: wn }, { name: "SparseMatrix", test: Cn }, { name: "Range", test: _n }, { name: "Index", test: xe }, { name: "boolean", test: Fa }, { name: "ResultSet", test: Ea }, { name: "Help", test: wa }, { name: "function", test: Ca }, { name: "Date", test: _a }, { name: "RegExp", test: ba }, { name: "null", test: Ba }, { name: "undefined", test: Sa }, { name: "AccessorNode", test: Ma }, { name: "ArrayNode", test: Na }, { name: "AssignmentNode", test: za }, { name: "BlockNode", test: Ta }, { name: "ConditionalNode", test: $a }, { name: "ConstantNode", test: Oa }, { name: "FunctionNode", test: Ia }, { name: "FunctionAssignmentNode", test: qa }, { name: "IndexNode", test: Ra }, { name: "Node", test: Ua }, { name: "ObjectNode", test: Pa }, { name: "OperatorNode", test: La }, { name: "ParenthesisNode", test: Va }, { name: "RangeNode", test: Za }, { name: "RelationalNode", test: Ja }, { name: "SymbolNode", test: Qa }, { name: "Map", test: xa }, { name: "Object", test: Ge }]), v.addConversions([{ from: "number", to: "BigNumber", convert: function(f) {
    if (n || ve(f), au(f) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + f + "). Use function bignumber(x) to convert to BigNumber.");
    return new n(f);
  } }, { from: "number", to: "Complex", convert: function(f) {
    return a || le(f), new a(f, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(f) {
    return a || le(f), new a(f.toNumber(), 0);
  } }, { from: "bigint", to: "number", convert: function(f) {
    if (f > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + f + ")");
    return Number(f);
  } }, { from: "bigint", to: "BigNumber", convert: function(f) {
    return n || ve(f), new n(f.toString());
  } }, { from: "bigint", to: "Fraction", convert: function(f) {
    return i || ce(f), new i(f.toString());
  } }, { from: "Fraction", to: "BigNumber", convert: function(f) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(f) {
    return a || le(f), new a(f.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(f) {
    i || ce(f);
    var l = new i(f);
    if (l.valueOf() !== f) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + f + "). Use function fraction(x) to convert to Fraction.");
    return l;
  } }, { from: "string", to: "number", convert: function(f) {
    var l = Number(f);
    if (isNaN(l)) throw new Error('Cannot convert "' + f + '" to a number');
    return l;
  } }, { from: "string", to: "BigNumber", convert: function(f) {
    n || ve(f);
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
    i || ce(f);
    try {
      return new i(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(f) {
    a || le(f);
    try {
      return new a(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(f) {
    return +f;
  } }, { from: "boolean", to: "BigNumber", convert: function(f) {
    return n || ve(f), new n(+f);
  } }, { from: "boolean", to: "bigint", convert: function(f) {
    return BigInt(+f);
  } }, { from: "boolean", to: "Fraction", convert: function(f) {
    return i || ce(f), new i(+f);
  } }, { from: "boolean", to: "string", convert: function(f) {
    return String(f);
  } }, { from: "Array", to: "Matrix", convert: function(f) {
    return t || ou(), new t(f);
  } }, { from: "Matrix", to: "Array", convert: function(f) {
    return f.valueOf();
  } }]), v.onMismatch = (p, f, l) => {
    var u = v.createError(p, f, l);
    if (["wrongType", "mismatch"].includes(u.data.category) && f.length === 1 && de(f[0]) && l.some((D) => !D.params.includes(","))) {
      var o = new TypeError("Function '".concat(p, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(p, ")'."));
      throw o.data = u.data, o;
    }
    throw u;
  }, v.onMismatch = (p, f, l) => {
    var u = v.createError(p, f, l);
    if (["wrongType", "mismatch"].includes(u.data.category) && f.length === 1 && de(f[0]) && l.some((D) => !D.params.includes(","))) {
      var o = new TypeError("Function '".concat(p, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(p, ")'."));
      throw o.data = u.data, o;
    }
    throw u;
  }, v;
});
function ve(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function le(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function ou() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function ce(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var su = "BigNumber", fu = ["?on", "config"], vu = G(su, fu, (r) => {
  var { on: e, config: n } = r, a = ft.clone({ precision: n.precision, modulo: ft.EUCLID });
  return a.prototype = Object.create(a.prototype), a.prototype.type = "BigNumber", a.prototype.isBigNumber = true, a.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, a.fromJSON = function(t) {
    return new a(t.value);
  }, e && e("config", function(t, i) {
    t.precision !== i.precision && a.config({ precision: t.precision });
  }), a;
}, { isClass: true }), lu = "Complex", cu = [], Du = G(lu, cu, () => (Object.defineProperty(Fr, "name", { value: "Complex" }), Fr.prototype.constructor = Fr, Fr.prototype.type = "Complex", Fr.prototype.isComplex = true, Fr.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, Fr.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, Fr.prototype.format = function(r) {
  var e = "", n = this.im, a = this.re, t = Re(this.re, r), i = Re(this.im, r), v = pr(r) ? r : r ? r.precision : null;
  if (v !== null) {
    var p = Math.pow(10, -v);
    Math.abs(a / n) < p && (a = 0), Math.abs(n / a) < p && (n = 0);
  }
  return n === 0 ? e = t : a === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = i + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + i.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + i + "i", e;
}, Fr.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object") return Fr(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], a = arguments[1];
      if (pr(n)) {
        if (En(a) && a.hasBase("ANGLE") && (a = a.toNumber("rad")), pr(a)) return new Fr({ r: n, phi: a });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Fr.prototype.valueOf = Fr.prototype.toString, Fr.fromJSON = function(r) {
  return new Fr(r);
}, Fr.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, Fr), { isClass: true });
/**
* @license Fraction.js v4.3.7 31/08/2023
* https://www.xarg.org/2014/03/rational-numbers-in-javascript/
*
* Copyright (c) 2023, Robert Eisele (robert@raw.org)
* Dual licensed under the MIT or GPL Version 2 licenses.
**/
var pu = 2e3, k = { s: 1, n: 0, d: 1 };
function qr(r, e) {
  if (isNaN(r = parseInt(r, 10))) throw De();
  return r * e;
}
function gr(r, e) {
  if (e === 0) throw Xe();
  var n = Object.create(_r.prototype);
  n.s = r < 0 ? -1 : 1, r = r < 0 ? -r : r;
  var a = Kr(r, e);
  return n.n = r / a, n.d = e / a, n;
}
function ct(r) {
  for (var e = {}, n = r, a = 2, t = 4; t <= n; ) {
    for (; n % a === 0; ) n /= a, e[a] = (e[a] || 0) + 1;
    t += 1 + 2 * a++;
  }
  return n !== r ? n > 1 && (e[n] = (e[n] || 0) + 1) : e[r] = (e[r] || 0) + 1, e;
}
var Sr = function(r, e) {
  var n = 0, a = 1, t = 1, i = 0, v = 0, p = 0, f = 1, l = 1, u = 0, o = 1, D = 1, c = 1, h = 1e7, s;
  if (r != null) if (e !== void 0) {
    if (n = r, a = e, t = n * a, n % 1 !== 0 || a % 1 !== 0) throw gu();
  } else switch (typeof r) {
    case "object": {
      if ("d" in r && "n" in r) n = r.n, a = r.d, "s" in r && (n *= r.s);
      else if (0 in r) n = r[0], 1 in r && (a = r[1]);
      else throw De();
      t = n * a;
      break;
    }
    case "number": {
      if (r < 0 && (t = r, r = -r), r % 1 === 0) n = r;
      else if (r > 0) {
        for (r >= 1 && (l = Math.pow(10, Math.floor(1 + Math.log(r) / Math.LN10)), r /= l); o <= h && c <= h; ) if (s = (u + D) / (o + c), r === s) {
          o + c <= h ? (n = u + D, a = o + c) : c > o ? (n = D, a = c) : (n = u, a = o);
          break;
        } else r > s ? (u += D, o += c) : (D += u, c += o), o > h ? (n = D, a = c) : (n = u, a = o);
        n *= l;
      } else (isNaN(r) || isNaN(e)) && (a = n = NaN);
      break;
    }
    case "string": {
      if (o = r.match(/\d+|./g), o === null) throw De();
      if (o[u] === "-" ? (t = -1, u++) : o[u] === "+" && u++, o.length === u + 1 ? v = qr(o[u++], t) : o[u + 1] === "." || o[u] === "." ? (o[u] !== "." && (i = qr(o[u++], t)), u++, (u + 1 === o.length || o[u + 1] === "(" && o[u + 3] === ")" || o[u + 1] === "'" && o[u + 3] === "'") && (v = qr(o[u], t), f = Math.pow(10, o[u].length), u++), (o[u] === "(" && o[u + 2] === ")" || o[u] === "'" && o[u + 2] === "'") && (p = qr(o[u + 1], t), l = Math.pow(10, o[u + 1].length) - 1, u += 3)) : o[u + 1] === "/" || o[u + 1] === ":" ? (v = qr(o[u], t), f = qr(o[u + 2], 1), u += 3) : o[u + 3] === "/" && o[u + 1] === " " && (i = qr(o[u], t), v = qr(o[u + 2], t), f = qr(o[u + 4], 1), u += 5), o.length <= u) {
        a = f * l, t = n = p + a * i + l * v;
        break;
      }
    }
    default:
      throw De();
  }
  if (a === 0) throw Xe();
  k.s = t < 0 ? -1 : 1, k.n = Math.abs(n), k.d = Math.abs(a);
};
function hu(r, e, n) {
  for (var a = 1; e > 0; r = r * r % n, e >>= 1) e & 1 && (a = a * r % n);
  return a;
}
function du(r, e) {
  for (; e % 2 === 0; e /= 2) ;
  for (; e % 5 === 0; e /= 5) ;
  if (e === 1) return 0;
  for (var n = 10 % e, a = 1; n !== 1; a++) if (n = n * 10 % e, a > pu) return 0;
  return a;
}
function mu(r, e, n) {
  for (var a = 1, t = hu(10, n, e), i = 0; i < 300; i++) {
    if (a === t) return i;
    a = a * 10 % e, t = t * 10 % e;
  }
  return 0;
}
function Kr(r, e) {
  if (!r) return e;
  if (!e) return r;
  for (; ; ) {
    if (r %= e, !r) return e;
    if (e %= r, !e) return r;
  }
}
function _r(r, e) {
  if (Sr(r, e), this instanceof _r) r = Kr(k.d, k.n), this.s = k.s, this.n = k.n / r, this.d = k.d / r;
  else return gr(k.s * k.n, k.d);
}
var Xe = function() {
  return new Error("Division by Zero");
}, De = function() {
  return new Error("Invalid argument");
}, gu = function() {
  return new Error("Parameters must be integer");
};
_r.prototype = { s: 1, n: 0, d: 1, abs: function() {
  return gr(this.n, this.d);
}, neg: function() {
  return gr(-this.s * this.n, this.d);
}, add: function(r, e) {
  return Sr(r, e), gr(this.s * this.n * k.d + k.s * this.d * k.n, this.d * k.d);
}, sub: function(r, e) {
  return Sr(r, e), gr(this.s * this.n * k.d - k.s * this.d * k.n, this.d * k.d);
}, mul: function(r, e) {
  return Sr(r, e), gr(this.s * k.s * this.n * k.n, this.d * k.d);
}, div: function(r, e) {
  return Sr(r, e), gr(this.s * k.s * this.n * k.d, this.d * k.n);
}, clone: function() {
  return gr(this.s * this.n, this.d);
}, mod: function(r, e) {
  if (isNaN(this.n) || isNaN(this.d)) return new _r(NaN);
  if (r === void 0) return gr(this.s * this.n % this.d, 1);
  if (Sr(r, e), k.n === 0 && this.d === 0) throw Xe();
  return gr(this.s * (k.d * this.n) % (k.n * this.d), k.d * this.d);
}, gcd: function(r, e) {
  return Sr(r, e), gr(Kr(k.n, this.n) * Kr(k.d, this.d), k.d * this.d);
}, lcm: function(r, e) {
  return Sr(r, e), k.n === 0 && this.n === 0 ? gr(0, 1) : gr(k.n * this.n, Kr(k.n, this.n) * Kr(k.d, this.d));
}, ceil: function(r) {
  return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new _r(NaN) : gr(Math.ceil(r * this.s * this.n / this.d), r);
}, floor: function(r) {
  return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new _r(NaN) : gr(Math.floor(r * this.s * this.n / this.d), r);
}, round: function(r) {
  return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new _r(NaN) : gr(Math.round(r * this.s * this.n / this.d), r);
}, roundTo: function(r, e) {
  return Sr(r, e), gr(this.s * Math.round(this.n * k.d / (this.d * k.n)) * k.n, k.d);
}, inverse: function() {
  return gr(this.s * this.d, this.n);
}, pow: function(r, e) {
  if (Sr(r, e), k.d === 1) return k.s < 0 ? gr(Math.pow(this.s * this.d, k.n), Math.pow(this.n, k.n)) : gr(Math.pow(this.s * this.n, k.n), Math.pow(this.d, k.n));
  if (this.s < 0) return null;
  var n = ct(this.n), a = ct(this.d), t = 1, i = 1;
  for (var v in n) if (v !== "1") {
    if (v === "0") {
      t = 0;
      break;
    }
    if (n[v] *= k.n, n[v] % k.d === 0) n[v] /= k.d;
    else return null;
    t *= Math.pow(v, n[v]);
  }
  for (var v in a) if (v !== "1") {
    if (a[v] *= k.n, a[v] % k.d === 0) a[v] /= k.d;
    else return null;
    i *= Math.pow(v, a[v]);
  }
  return k.s < 0 ? gr(i, t) : gr(t, i);
}, equals: function(r, e) {
  return Sr(r, e), this.s * this.n * k.d === k.s * k.n * this.d;
}, compare: function(r, e) {
  Sr(r, e);
  var n = this.s * this.n * k.d - k.s * k.n * this.d;
  return (0 < n) - (n < 0);
}, simplify: function(r) {
  if (isNaN(this.n) || isNaN(this.d)) return this;
  r = r || 1e-3;
  for (var e = this.abs(), n = e.toContinued(), a = 1; a < n.length; a++) {
    for (var t = gr(n[a - 1], 1), i = a - 2; i >= 0; i--) t = t.inverse().add(n[i]);
    if (Math.abs(t.sub(e).valueOf()) < r) return t.mul(this.s);
  }
  return this;
}, divisible: function(r, e) {
  return Sr(r, e), !(!(k.n * this.d) || this.n * k.d % (k.n * this.d));
}, valueOf: function() {
  return this.s * this.n / this.d;
}, toFraction: function(r) {
  var e, n = "", a = this.n, t = this.d;
  return this.s < 0 && (n += "-"), t === 1 ? n += a : (r && (e = Math.floor(a / t)) > 0 && (n += e, n += " ", a %= t), n += a, n += "/", n += t), n;
}, toLatex: function(r) {
  var e, n = "", a = this.n, t = this.d;
  return this.s < 0 && (n += "-"), t === 1 ? n += a : (r && (e = Math.floor(a / t)) > 0 && (n += e, a %= t), n += "\\frac{", n += a, n += "}{", n += t, n += "}"), n;
}, toContinued: function() {
  var r, e = this.n, n = this.d, a = [];
  if (isNaN(e) || isNaN(n)) return a;
  do
    a.push(Math.floor(e / n)), r = e % n, e = n, n = r;
  while (e !== 1);
  return a;
}, toString: function(r) {
  var e = this.n, n = this.d;
  if (isNaN(e) || isNaN(n)) return "NaN";
  r = r || 15;
  var a = du(e, n), t = mu(e, n, a), i = this.s < 0 ? "-" : "";
  if (i += e / n | 0, e %= n, e *= 10, e && (i += "."), a) {
    for (var v = t; v--; ) i += e / n | 0, e %= n, e *= 10;
    i += "(";
    for (var v = a; v--; ) i += e / n | 0, e %= n, e *= 10;
    i += ")";
  } else for (var v = r; e && v--; ) i += e / n | 0, e %= n, e *= 10;
  return i;
} };
var yu = "Fraction", Au = [], Fu = G(yu, Au, () => (Object.defineProperty(_r, "name", { value: "Fraction" }), _r.prototype.constructor = _r, _r.prototype.type = "Fraction", _r.prototype.isFraction = true, _r.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: this.s * this.n, d: this.d };
}, _r.fromJSON = function(r) {
  return new _r(r);
}, _r), { isClass: true }), Eu = "Matrix", wu = [], Cu = G(Eu, wu, () => {
  function r() {
    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
  }
  return r.prototype.type = "Matrix", r.prototype.isMatrix = true, r.prototype.storage = function() {
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
}, { isClass: true });
function Ie(r, e, n) {
  var a = r.constructor, t = new a(2), i = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!hr(n)) throw new Error("size must be an integer");
    if (r.greaterThan(t.pow(n - 1).sub(1)) || r.lessThan(t.pow(n - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!r.isInteger()) throw new Error("Value must be an integer");
    r.lessThan(0) && (r = r.add(t.pow(n))), i = "i".concat(n);
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
function _u(r, e) {
  if (typeof e == "function") return e(r);
  if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: n, precision: a, wordSize: t } = xn(e);
  switch (n) {
    case "fixed":
      return xu(r, a);
    case "exponential":
      return Dt(r, a);
    case "engineering":
      return bu(r, a);
    case "bin":
      return Ie(r, 2, t);
    case "oct":
      return Ie(r, 8, t);
    case "hex":
      return Ie(r, 16, t);
    case "auto": {
      var i = pt(e == null ? void 0 : e.lowerExp, -3), v = pt(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero()) return "0";
      var p, f = r.toSignificantDigits(a), l = f.e;
      return l >= i && l < v ? p = f.toFixed() : p = Dt(r, a), p.replace(/((\.\d*?)(0+))($|e)/, function() {
        var u = arguments[2], o = arguments[4];
        return u !== "." ? u + o : o;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function bu(r, e) {
  var n = r.e, a = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -a)), i = t.toPrecision(e);
  if (i.includes("e")) {
    var v = r.constructor;
    i = new v(i).toFixed();
  }
  return i + "e" + (n >= 0 ? "+" : "") + a.toString();
}
function Dt(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function xu(r, e) {
  return r.toFixed(e);
}
function pt(r, e) {
  return pr(r) ? r : mr(r) ? r.toNumber() : e;
}
function dr(r, e) {
  var n = Bu(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function Bu(r, e) {
  if (typeof r == "number") return Re(r, e);
  if (mr(r)) return _u(r, e);
  if (Su(r)) return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
  if (Array.isArray(r)) return Mn(r, e);
  if (Nr(r)) return ht(r);
  if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function") return r.format(e);
    if (r && r.toString(e) !== {}.toString()) return r.toString(e);
    var n = Object.keys(r).map((a) => ht(a) + ": " + dr(r[a], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function ht(r) {
  for (var e = String(r), n = "", a = 0; a < e.length; ) {
    var t = e.charAt(a);
    n += t in dt ? dt[t] : t, a++;
  }
  return '"' + n + '"';
}
var dt = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function Mn(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", a = r.length, t = 0; t < a; t++) t !== 0 && (n += ", "), n += Mn(r[t], e);
    return n += "]", n;
  } else return dr(r, e);
}
function Su(r) {
  return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || false;
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
function Nn(r, e, n) {
  var a, t = r.length;
  if (t !== e[n]) throw new ar(t, e[n]);
  if (n < e.length - 1) {
    var i = n + 1;
    for (a = 0; a < t; a++) {
      var v = r[a];
      if (!Array.isArray(v)) throw new ar(e.length - 1, e.length, "<");
      Nn(r[a], e, i);
    }
  } else for (a = 0; a < t; a++) if (Array.isArray(r[a])) throw new ar(e.length + 1, e.length, ">");
}
function mt(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r)) throw new ar(r.length, 0);
  } else Nn(r, e, 0);
}
function me(r, e) {
  var n = r.isMatrix ? r._size : sr(r), a = e._sourceSize;
  a.forEach((t, i) => {
    if (t !== null && t !== n[i]) throw new ar(t, n[i]);
  });
}
function Dr(r, e) {
  if (r !== void 0) {
    if (!pr(r) || !hr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e) throw new Jr(r, e);
  }
}
function Hr(r) {
  for (var e = 0; e < r._dimensions.length; ++e) {
    var n = r._dimensions[e];
    if (n._data && lr(n._data)) {
      if (n._size[0] === 0) return true;
    } else if (n.isRange) {
      if (n.start === n.end) return true;
    } else if (Nr(n) && n.length === 0) return true;
  }
  return false;
}
function ge(r, e, n) {
  if (!Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!pr(t) || !hr(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + dr(e) + ")");
  }), (pr(r) || mr(r)) && (r = [r]);
  var a = n !== void 0 ? n : 0;
  return Ue(r, e, 0, a), r;
}
function Ue(r, e, n, a) {
  var t, i, v = r.length, p = e[n], f = Math.min(v, p);
  if (r.length = p, n < e.length - 1) {
    var l = n + 1;
    for (t = 0; t < f; t++) i = r[t], Array.isArray(i) || (i = [i], r[t] = i), Ue(i, e, l, a);
    for (t = f; t < p; t++) i = [], r[t] = i, Ue(i, e, l, a);
  } else {
    for (t = 0; t < f; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
    for (t = f; t < p; t++) r[t] = a;
  }
}
function Ye(r, e) {
  var n = Pe(r), a = n.length;
  if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new ar(0, a, "!=");
  e = Ke(e, a);
  var t = zn(e);
  if (a !== t) throw new ar(t, a, "!=");
  try {
    return Mu(n, e);
  } catch (i) {
    throw i instanceof ar ? new ar(t, a, "!=") : i;
  }
}
function Ke(r, e) {
  var n = zn(r), a = r.slice(), t = -1, i = r.indexOf(t), v = r.indexOf(t, i + 1) >= 0;
  if (v) throw new Error("More than one wildcard in sizes");
  var p = i >= 0, f = e % n === 0;
  if (p) if (f) a[i] = -e / n;
  else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return a;
}
function zn(r) {
  return r.reduce((e, n) => e * n, 1);
}
function Mu(r, e) {
  for (var n = r, a, t = e.length - 1; t > 0; t--) {
    var i = e[t];
    a = [];
    for (var v = n.length / i, p = 0; p < v; p++) a.push(n.slice(p * i, (p + 1) * i));
    n = a;
  }
  return n;
}
function gt(r, e) {
  for (var n = sr(r); Array.isArray(r) && r.length === 1; ) r = r[0], n.shift();
  for (var a = n.length; n[a - 1] === 1; ) a--;
  return a < n.length && (r = Tn(r, a, 0), n.length = a), r;
}
function Tn(r, e, n) {
  var a, t;
  if (n < e) {
    var i = n + 1;
    for (a = 0, t = r.length; a < t; a++) r[a] = Tn(r[a], e, i);
  } else for (; Array.isArray(r); ) r = r[0];
  return r;
}
function $n(r, e, n, a) {
  var t = a || sr(r);
  if (n) for (var i = 0; i < n; i++) r = [r], t.unshift(1);
  for (r = On(r, e, 0); t.length < e; ) t.push(1);
  return r;
}
function On(r, e, n) {
  var a, t;
  if (Array.isArray(r)) {
    var i = n + 1;
    for (a = 0, t = r.length; a < t; a++) r[a] = On(r[a], e, i);
  } else for (var v = n; v < e; v++) r = [r];
  return r;
}
function Pe(r) {
  if (!Array.isArray(r)) return r;
  var e = [];
  return r.forEach(function n(a) {
    Array.isArray(a) ? a.forEach(n) : e.push(a);
  }), e;
}
function Me(r, e) {
  for (var n, a = 0, t = 0; t < r.length; t++) {
    var i = r[t], v = Array.isArray(i);
    if (t === 0 && v && (a = i.length), v && i.length !== a) return;
    var p = v ? Me(i, e) : e(i);
    if (n === void 0) n = p;
    else if (n !== p) return "mixed";
  }
  return n;
}
function qn(r, e, n, a) {
  if (a < n) {
    if (r.length !== e.length) throw new ar(r.length, e.length);
    for (var t = [], i = 0; i < r.length; i++) t[i] = qn(r[i], e[i], n, a + 1);
    return t;
  } else return r.concat(e);
}
function In() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1) return r[0];
  if (r.length > 1) return r.slice(1).reduce(function(n, a) {
    return qn(n, a, e, 0);
  }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Rn() {
  for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
  for (var a = e.map((D) => D.length), t = Math.max(...a), i = new Array(t).fill(null), v = 0; v < e.length; v++) for (var p = e[v], f = a[v], l = 0; l < f; l++) {
    var u = t - f + l;
    p[l] > i[u] && (i[u] = p[l]);
  }
  for (var o = 0; o < e.length; o++) Un(e[o], i);
  return i;
}
function Un(r, e) {
  for (var n = e.length, a = r.length, t = 0; t < a; t++) {
    var i = n - a + t;
    if (r[t] < e[i] && r[t] > 1 || r[t] > e[i]) throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(a, " with size ").concat(r[t], " to size ").concat(e[i]));
  }
}
function Le(r, e) {
  var n = sr(r);
  if (Lr(n, e)) return r;
  Un(n, e);
  var a = Rn(n, e), t = a.length, i = [...Array(t - n.length).fill(1), ...n], v = zu(r);
  n.length < t && (v = Ye(v, i), n = sr(v));
  for (var p = 0; p < t; p++) n[p] < a[p] && (v = Nu(v, a[p], p), n = sr(v));
  return v;
}
function Nu(r, e, n) {
  return In(...Array(e).fill(r), n);
}
function Pn(r, e) {
  if (!Array.isArray(r)) throw new Error("Array expected");
  var n = sr(r);
  if (e.length !== n.length) throw new ar(e.length, n.length);
  for (var a = 0; a < e.length; a++) Dr(e[a], n[a]);
  return e.reduce((t, i) => t[i], r);
}
function zu(r) {
  return be([], r);
}
function ye(r, e, n) {
  if (pe.isTypedFunction(r)) {
    var a = (e.isMatrix ? e.size() : sr(e)).map(() => 0), t = e.isMatrix ? e.get(a) : Pn(e, a), i = Object.keys(r.signatures).length === 1, v = Tu(r, t, a, e), p = i ? Object.values(r.signatures)[0] : r;
    return v >= 1 && v <= 3 ? function() {
      for (var f = arguments.length, l = new Array(f), u = 0; u < f; u++) l[u] = arguments[u];
      return yt(p, l.slice(0, v), n, r.name);
    } : function() {
      for (var f = arguments.length, l = new Array(f), u = 0; u < f; u++) l[u] = arguments[u];
      return yt(p, l, n, r.name);
    };
  }
  return r;
}
function Tu(r, e, n, a) {
  for (var t = [e, n, a], i = 3; i > 0; i--) {
    var v = t.slice(0, i);
    if (pe.resolve(r, v) !== null) return i;
  }
}
function yt(r, e, n, a) {
  try {
    return r(...e);
  } catch (t) {
    $u(t, e, n, a);
  }
}
function $u(r, e, n, a) {
  var t;
  if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
    var i = [];
    throw i.push("value: ".concat(zr(e[0]))), e.length >= 2 && i.push("index: ".concat(zr(e[1]))), e.length >= 3 && i.push("array: ".concat(zr(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(a, "(").concat(i.join(", "), ") at index ").concat(JSON.stringify(e[1])));
  } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(a, ": ").concat(r.message));
}
var Ou = "DenseMatrix", qu = ["Matrix"], Iu = G(Ou, qu, (r) => {
  var { Matrix: e } = r;
  function n(u, o) {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    if (o && !Nr(o)) throw new Error("Invalid datatype: " + o);
    if (cr(u)) u.type === "DenseMatrix" ? (this._data = ir(u._data), this._size = ir(u._size), this._datatype = o || u._datatype) : (this._data = u.toArray(), this._size = u.size(), this._datatype = o || u._datatype);
    else if (u && lr(u.data) && lr(u.size)) this._data = u.data, this._size = u.size, mt(this._data, this._size), this._datatype = o || u.datatype;
    else if (lr(u)) this._data = l(u), this._size = sr(this._data), mt(this._data, this._size), this._datatype = o;
    else {
      if (u) throw new TypeError("Unsupported type of data (" + zr(u) + ")");
      this._data = [], this._size = [0], this._datatype = o;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(u, o) {
    return new n(u, o);
  }, Object.defineProperty(n, "name", { value: "DenseMatrix" }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
    return Me(this._data, zr);
  }, n.prototype.storage = function() {
    return "dense";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(u, o) {
    return new n(u, o);
  }, n.prototype.subset = function(u, o, D) {
    switch (arguments.length) {
      case 1:
        return a(this, u);
      case 2:
      case 3:
        return i(this, u, o, D);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.get = function(u) {
    return Pn(this._data, u);
  }, n.prototype.set = function(u, o, D) {
    if (!lr(u)) throw new TypeError("Array expected");
    if (u.length < this._size.length) throw new ar(u.length, this._size.length, "<");
    var c, h, s, g = u.map(function(w) {
      return w + 1;
    });
    f(this, g, D);
    var m = this._data;
    for (c = 0, h = u.length - 1; c < h; c++) s = u[c], Dr(s, m.length), m = m[s];
    return s = u[u.length - 1], Dr(s, m.length), m[s] = o, this;
  };
  function a(u, o) {
    if (!xe(o)) throw new TypeError("Invalid index");
    var D = o.isScalar();
    if (D) return u.get(o.min());
    var c = o.size();
    if (c.length !== u._size.length) throw new ar(c.length, u._size.length);
    for (var h = o.min(), s = o.max(), g = 0, m = u._size.length; g < m; g++) Dr(h[g], u._size[g]), Dr(s[g], u._size[g]);
    return new n(t(u._data, o, c.length, 0), u._datatype);
  }
  function t(u, o, D, c) {
    var h = c === D - 1, s = o.dimension(c);
    return h ? s.map(function(g) {
      return Dr(g, u.length), u[g];
    }).valueOf() : s.map(function(g) {
      Dr(g, u.length);
      var m = u[g];
      return t(m, o, D, c + 1);
    }).valueOf();
  }
  function i(u, o, D, c) {
    if (!o || o.isIndex !== true) throw new TypeError("Invalid index");
    var h = o.size(), s = o.isScalar(), g;
    if (cr(D) ? (g = D.size(), D = D.valueOf()) : g = sr(D), s) {
      if (g.length !== 0) throw new TypeError("Scalar expected");
      u.set(o.min(), D, c);
    } else {
      if (!Lr(g, h)) try {
        g.length === 0 ? D = Le([D], h) : D = Le(D, h), g = sr(D);
      } catch {
      }
      if (h.length < u._size.length) throw new ar(h.length, u._size.length, "<");
      if (g.length < h.length) {
        for (var m = 0, w = 0; h[m] === 1 && g[m] === 1; ) m++;
        for (; h[m] === 1; ) w++, m++;
        D = $n(D, h.length, w, g);
      }
      if (!Lr(h, g)) throw new ar(h, g, ">");
      var A = o.max().map(function(d) {
        return d + 1;
      });
      f(u, A, c);
      var _ = h.length, F = 0;
      v(u._data, o, D, _, F);
    }
    return u;
  }
  function v(u, o, D, c, h) {
    var s = h === c - 1, g = o.dimension(h);
    s ? g.forEach(function(m, w) {
      Dr(m), u[m] = D[w[0]];
    }) : g.forEach(function(m, w) {
      Dr(m), v(u[m], o, D[w[0]], c, h + 1);
    });
  }
  n.prototype.resize = function(u, o, D) {
    if (!de(u)) throw new TypeError("Array or Matrix expected");
    var c = u.valueOf().map((s) => Array.isArray(s) && s.length === 1 ? s[0] : s), h = D ? this.clone() : this;
    return p(h, c, o);
  };
  function p(u, o, D) {
    if (o.length === 0) {
      for (var c = u._data; lr(c); ) c = c[0];
      return c;
    }
    return u._size = o.slice(0), u._data = ge(u._data, u._size, D), u;
  }
  n.prototype.reshape = function(u, o) {
    var D = o ? this.clone() : this;
    D._data = Ye(D._data, u);
    var c = D._size.reduce((h, s) => h * s);
    return D._size = Ke(u, c), D;
  };
  function f(u, o, D) {
    for (var c = u._size.slice(0), h = false; c.length < o.length; ) c.push(0), h = true;
    for (var s = 0, g = o.length; s < g; s++) o[s] > c[s] && (c[s] = o[s], h = true);
    h && p(u, c, D);
  }
  n.prototype.clone = function() {
    var u = new n({ data: ir(this._data), size: ir(this._size), datatype: this._datatype });
    return u;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype._forEach = function(u) {
    var o = this, D = o.size();
    if (D.length === 1) {
      for (var c = 0; c < D[0]; c++) u(o._data, c, [c]);
      return;
    }
    var h = Array(D.length).fill(0), s = Array(D.length - 1), g = s.length - 1;
    s[0] = o._data[0];
    for (var m = 0; m < g; m++) s[m + 1] = s[m][0];
    for (h[g] = -1; ; ) {
      var w = void 0;
      for (w = g; w >= 0; w--) {
        if (h[w]++, h[w] === D[w]) {
          h[w] = 0;
          continue;
        }
        s[w] = w === 0 ? o._data[h[w]] : s[w - 1][h[w]];
        for (var A = w; A < g; A++) s[A + 1] = s[A][0];
        for (var _ = 0; _ < D[s.length]; _++) h[s.length] = _, u(s[g], _, h.slice(0));
        break;
      }
      if (w === -1) break;
    }
  }, n.prototype.map = function(u) {
    var o = this, D = new n(o), c = ye(u, o._data, "map");
    return D._forEach(function(h, s, g) {
      h[s] = c(h[s], g, o);
    }), D;
  }, n.prototype.forEach = function(u) {
    var o = this, D = ye(u, o._data, "map");
    o._forEach(function(c, h, s) {
      D(c[h], s, o);
    });
  }, n.prototype[Symbol.iterator] = function* () {
    var u = function* (D, c) {
      if (lr(D)) for (var h = 0; h < D.length; h++) yield* u(D[h], c.concat(h));
      else yield { value: D, index: c };
    };
    yield* u(this._data, []);
  }, n.prototype.rows = function() {
    var u = [], o = this.size();
    if (o.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    var D = this._data;
    for (var c of D) u.push(new n([c], this._datatype));
    return u;
  }, n.prototype.columns = function() {
    var u = this, o = [], D = this.size();
    if (D.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var c = this._data, h = function(m) {
      var w = c.map((A) => [A[m]]);
      o.push(new n(w, u._datatype));
    }, s = 0; s < D[1]; s++) h(s);
    return o;
  }, n.prototype.toArray = function() {
    return ir(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(u) {
    return dr(this._data, u);
  }, n.prototype.toString = function() {
    return dr(this._data);
  }, n.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(u) {
    if (u) {
      if (mr(u) && (u = u.toNumber()), !pr(u) || !hr(u)) throw new TypeError("The parameter k must be an integer number");
    } else u = 0;
    for (var o = u > 0 ? u : 0, D = u < 0 ? -u : 0, c = this._size[0], h = this._size[1], s = Math.min(c - D, h - o), g = [], m = 0; m < s; m++) g[m] = this._data[m + D][m + o];
    return new n({ data: g, size: [s], datatype: this._datatype });
  }, n.diagonal = function(u, o, D, c) {
    if (!lr(u)) throw new TypeError("Array expected, size parameter");
    if (u.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (u = u.map(function(C) {
      if (mr(C) && (C = C.toNumber()), !pr(C) || !hr(C) || C < 1) throw new Error("Size values must be positive integers");
      return C;
    }), D) {
      if (mr(D) && (D = D.toNumber()), !pr(D) || !hr(D)) throw new TypeError("The parameter k must be an integer number");
    } else D = 0;
    var h = D > 0 ? D : 0, s = D < 0 ? -D : 0, g = u[0], m = u[1], w = Math.min(g - s, m - h), A;
    if (lr(o)) {
      if (o.length !== w) throw new Error("Invalid value array length");
      A = function(E) {
        return o[E];
      };
    } else if (cr(o)) {
      var _ = o.size();
      if (_.length !== 1 || _[0] !== w) throw new Error("Invalid matrix length");
      A = function(E) {
        return o.get([E]);
      };
    } else A = function() {
      return o;
    };
    c || (c = mr(A(0)) ? A(0).mul(0) : 0);
    var F = [];
    if (u.length > 0) {
      F = ge(F, u, c);
      for (var d = 0; d < w; d++) F[d + s][d + h] = A(d);
    }
    return new n({ data: F, size: [g, m] });
  }, n.fromJSON = function(u) {
    return new n(u);
  }, n.prototype.swapRows = function(u, o) {
    if (!pr(u) || !hr(u) || !pr(o) || !hr(o)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return Dr(u, this._size[0]), Dr(o, this._size[0]), n._swapRows(u, o, this._data), this;
  }, n._swapRows = function(u, o, D) {
    var c = D[u];
    D[u] = D[o], D[o] = c;
  };
  function l(u) {
    return cr(u) ? l(u.valueOf()) : lr(u) ? u.map(l) : u;
  }
  return n;
}, { isClass: true });
function Br(r, e, n) {
  return r && typeof r.map == "function" ? r.map(function(a) {
    return Br(a, e);
  }) : e(r);
}
var At = "isInteger", Ru = ["typed"], Uu = G(At, Ru, (r) => {
  var { typed: e } = r;
  return e(At, { number: hr, BigNumber: function(a) {
    return a.isInt();
  }, bigint: function(a) {
    return true;
  }, Fraction: function(a) {
    return a.d === 1 && isFinite(a.n);
  }, "Array | Matrix": e.referToSelf((n) => (a) => Br(a, n)) });
}), We = "number", Ne = "number, number";
function Ln(r) {
  return Math.abs(r);
}
Ln.signature = We;
function Vn(r, e) {
  return r + e;
}
Vn.signature = Ne;
function Zn(r, e) {
  return r - e;
}
Zn.signature = Ne;
function Jn(r, e) {
  return r * e;
}
Jn.signature = Ne;
function Qn(r) {
  return -r;
}
Qn.signature = We;
function Ve(r) {
  return ru(r);
}
Ve.signature = We;
function Gn(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
Gn.signature = Ne;
var Pu = "number";
function Xn(r) {
  return r > 0;
}
Xn.signature = Pu;
function kr(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (a < 0) throw new Error("Absolute tolerance must be at least 0");
  return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), a));
}
var Ft = "isPositive", Lu = ["typed", "config"], Vu = G(Ft, Lu, (r) => {
  var { typed: e, config: n } = r;
  return e(Ft, { number: (a) => Ir(a, 0, n.relTol, n.absTol) ? false : Xn(a), BigNumber: (a) => kr(a, new a.constructor(0), n.relTol, n.absTol) ? false : !a.isNeg() && !a.isZero() && !a.isNaN(), bigint: (a) => a > 0n, Fraction: (a) => a.s > 0 && a.n > 0, Unit: e.referToSelf((a) => (t) => e.find(a, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((a) => (t) => Br(t, a)) });
}), Et = "isZero", Zu = ["typed", "equalScalar"], Ju = G(Et, Zu, (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(Et, { "number | BigNumber | Complex | Fraction": (a) => n(a, 0), bigint: (a) => a === 0n, Unit: e.referToSelf((a) => (t) => e.find(a, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((a) => (t) => Br(t, a)) });
});
function Qu(r, e, n, a) {
  return Ir(r.re, e.re, n, a) && Ir(r.im, e.im, n, a);
}
var ne = G("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((n) => (a, t) => {
    if (!a.equalBase(t)) throw new Error("Cannot compare units with different base");
    return e.find(n, [a.valueType(), t.valueType()])(a.value, t.value);
  }) };
}), Ae = "equalScalar", Gu = ["typed", "config"], Xu = G(Ae, Gu, (r) => {
  var { typed: e, config: n } = r, a = ne({ typed: e });
  return e(Ae, { "boolean, boolean": function(i, v) {
    return i === v;
  }, "number, number": function(i, v) {
    return Ir(i, v, n.relTol, n.absTol);
  }, "BigNumber, BigNumber": function(i, v) {
    return i.eq(v) || kr(i, v, n.relTol, n.absTol);
  }, "bigint, bigint": function(i, v) {
    return i === v;
  }, "Fraction, Fraction": function(i, v) {
    return i.equals(v);
  }, "Complex, Complex": function(i, v) {
    return Qu(i, v, n.relTol, n.absTol);
  } }, a);
});
G(Ae, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Ae, { "number, number": function(t, i) {
    return Ir(t, i, n.relTol, n.absTol);
  } });
});
var Yu = "SparseMatrix", Ku = ["typed", "equalScalar", "Matrix"], Wu = G(Yu, Ku, (r) => {
  var { typed: e, equalScalar: n, Matrix: a } = r;
  function t(s, g) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (g && !Nr(g)) throw new Error("Invalid datatype: " + g);
    if (cr(s)) i(this, s, g);
    else if (s && lr(s.index) && lr(s.ptr) && lr(s.size)) this._values = s.values, this._index = s.index, this._ptr = s.ptr, this._size = s.size, this._datatype = g || s.datatype;
    else if (lr(s)) v(this, s, g);
    else {
      if (s) throw new TypeError("Unsupported type of data (" + zr(s) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = g;
    }
  }
  function i(s, g, m) {
    g.type === "SparseMatrix" ? (s._values = g._values ? ir(g._values) : void 0, s._index = ir(g._index), s._ptr = ir(g._ptr), s._size = ir(g._size), s._datatype = m || g._datatype) : v(s, g.valueOf(), m || g._datatype);
  }
  function v(s, g, m) {
    s._values = [], s._index = [], s._ptr = [], s._datatype = m;
    var w = g.length, A = 0, _ = n, F = 0;
    if (Nr(m) && (_ = e.find(n, [m, m]) || n, F = e.convert(0, m)), w > 0) {
      var d = 0;
      do {
        s._ptr.push(s._index.length);
        for (var C = 0; C < w; C++) {
          var E = g[C];
          if (lr(E)) {
            if (d === 0 && A < E.length && (A = E.length), d < E.length) {
              var y = E[d];
              _(y, F) || (s._values.push(y), s._index.push(C));
            }
          } else d === 0 && A < 1 && (A = 1), _(E, F) || (s._values.push(E), s._index.push(C));
        }
        d++;
      } while (d < A);
    }
    s._ptr.push(s._index.length), s._size = [w, A];
  }
  t.prototype = new a(), t.prototype.createSparseMatrix = function(s, g) {
    return new t(s, g);
  }, Object.defineProperty(t, "name", { value: "SparseMatrix" }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
    return Me(this._values, zr);
  }, t.prototype.storage = function() {
    return "sparse";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(s, g) {
    return new t(s, g);
  }, t.prototype.density = function() {
    var s = this._size[0], g = this._size[1];
    return s !== 0 && g !== 0 ? this._index.length / (s * g) : 0;
  }, t.prototype.subset = function(s, g, m) {
    if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return p(this, s);
      case 2:
      case 3:
        return f(this, s, g, m);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function p(s, g) {
    if (!xe(g)) throw new TypeError("Invalid index");
    var m = g.isScalar();
    if (m) return s.get(g.min());
    var w = g.size();
    if (w.length !== s._size.length) throw new ar(w.length, s._size.length);
    var A, _, F, d, C = g.min(), E = g.max();
    for (A = 0, _ = s._size.length; A < _; A++) Dr(C[A], s._size[A]), Dr(E[A], s._size[A]);
    var y = s._values, b = s._index, x = s._ptr, B = g.dimension(0), z = g.dimension(1), N = [], T = [];
    B.forEach(function(S, I) {
      T[S] = I[0], N[S] = true;
    });
    var M = y ? [] : void 0, P = [], $ = [];
    return z.forEach(function(S) {
      for ($.push(P.length), F = x[S], d = x[S + 1]; F < d; F++) A = b[F], N[A] === true && (P.push(T[A]), M && M.push(y[F]));
    }), $.push(P.length), new t({ values: M, index: P, ptr: $, size: w, datatype: s._datatype });
  }
  function f(s, g, m, w) {
    if (!g || g.isIndex !== true) throw new TypeError("Invalid index");
    var A = g.size(), _ = g.isScalar(), F;
    if (cr(m) ? (F = m.size(), m = m.toArray()) : F = sr(m), _) {
      if (F.length !== 0) throw new TypeError("Scalar expected");
      s.set(g.min(), m, w);
    } else {
      if (A.length !== 1 && A.length !== 2) throw new ar(A.length, s._size.length, "<");
      if (F.length < A.length) {
        for (var d = 0, C = 0; A[d] === 1 && F[d] === 1; ) d++;
        for (; A[d] === 1; ) C++, d++;
        m = $n(m, A.length, C, F);
      }
      if (!Lr(A, F)) throw new ar(A, F, ">");
      if (A.length === 1) {
        var E = g.dimension(0);
        E.forEach(function(x, B) {
          Dr(x), s.set([x, 0], m[B[0]], w);
        });
      } else {
        var y = g.dimension(0), b = g.dimension(1);
        y.forEach(function(x, B) {
          Dr(x), b.forEach(function(z, N) {
            Dr(z), s.set([x, z], m[B[0]][N[0]], w);
          });
        });
      }
    }
    return s;
  }
  t.prototype.get = function(s) {
    if (!lr(s)) throw new TypeError("Array expected");
    if (s.length !== this._size.length) throw new ar(s.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
    var g = s[0], m = s[1];
    Dr(g, this._size[0]), Dr(m, this._size[1]);
    var w = l(g, this._ptr[m], this._ptr[m + 1], this._index);
    return w < this._ptr[m + 1] && this._index[w] === g ? this._values[w] : 0;
  }, t.prototype.set = function(s, g, m) {
    if (!lr(s)) throw new TypeError("Array expected");
    if (s.length !== this._size.length) throw new ar(s.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = s[0], A = s[1], _ = this._size[0], F = this._size[1], d = n, C = 0;
    Nr(this._datatype) && (d = e.find(n, [this._datatype, this._datatype]) || n, C = e.convert(0, this._datatype)), (w > _ - 1 || A > F - 1) && (D(this, Math.max(w + 1, _), Math.max(A + 1, F), m), _ = this._size[0], F = this._size[1]), Dr(w, _), Dr(A, F);
    var E = l(w, this._ptr[A], this._ptr[A + 1], this._index);
    return E < this._ptr[A + 1] && this._index[E] === w ? d(g, C) ? u(E, A, this._values, this._index, this._ptr) : this._values[E] = g : d(g, C) || o(E, w, A, g, this._values, this._index, this._ptr), this;
  };
  function l(s, g, m, w) {
    if (m - g === 0) return m;
    for (var A = g; A < m; A++) if (w[A] === s) return A;
    return g;
  }
  function u(s, g, m, w, A) {
    m.splice(s, 1), w.splice(s, 1);
    for (var _ = g + 1; _ < A.length; _++) A[_]--;
  }
  function o(s, g, m, w, A, _, F) {
    A.splice(s, 0, w), _.splice(s, 0, g);
    for (var d = m + 1; d < F.length; d++) F[d]++;
  }
  t.prototype.resize = function(s, g, m) {
    if (!de(s)) throw new TypeError("Array or Matrix expected");
    var w = s.valueOf().map((_) => Array.isArray(_) && _.length === 1 ? _[0] : _);
    if (w.length !== 2) throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(_) {
      if (!pr(_) || !hr(_) || _ < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + dr(w) + ")");
    });
    var A = m ? this.clone() : this;
    return D(A, w[0], w[1], g);
  };
  function D(s, g, m, w) {
    var A = w || 0, _ = n, F = 0;
    Nr(s._datatype) && (_ = e.find(n, [s._datatype, s._datatype]) || n, F = e.convert(0, s._datatype), A = e.convert(A, s._datatype));
    var d = !_(A, F), C = s._size[0], E = s._size[1], y, b, x;
    if (m > E) {
      for (b = E; b < m; b++) if (s._ptr[b] = s._values.length, d) for (y = 0; y < C; y++) s._values.push(A), s._index.push(y);
      s._ptr[m] = s._values.length;
    } else m < E && (s._ptr.splice(m + 1, E - m), s._values.splice(s._ptr[m], s._values.length), s._index.splice(s._ptr[m], s._index.length));
    if (E = m, g > C) {
      if (d) {
        var B = 0;
        for (b = 0; b < E; b++) {
          s._ptr[b] = s._ptr[b] + B, x = s._ptr[b + 1] + B;
          var z = 0;
          for (y = C; y < g; y++, z++) s._values.splice(x + z, 0, A), s._index.splice(x + z, 0, y), B++;
        }
        s._ptr[E] = s._values.length;
      }
    } else if (g < C) {
      var N = 0;
      for (b = 0; b < E; b++) {
        s._ptr[b] = s._ptr[b] - N;
        var T = s._ptr[b], M = s._ptr[b + 1] - N;
        for (x = T; x < M; x++) y = s._index[x], y > g - 1 && (s._values.splice(x, 1), s._index.splice(x, 1), N++);
      }
      s._ptr[b] = s._values.length;
    }
    return s._size[0] = g, s._size[1] = m, s;
  }
  t.prototype.reshape = function(s, g) {
    if (!lr(s)) throw new TypeError("Array expected");
    if (s.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    s.forEach(function(S) {
      if (!pr(S) || !hr(S) || S <= -2 || S === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + dr(s) + ")");
    });
    var m = this._size[0] * this._size[1];
    s = Ke(s, m);
    var w = s[0] * s[1];
    if (m !== w) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var A = g ? this.clone() : this;
    if (this._size[0] === s[0] && this._size[1] === s[1]) return A;
    for (var _ = [], F = 0; F < A._ptr.length; F++) for (var d = 0; d < A._ptr[F + 1] - A._ptr[F]; d++) _.push(F);
    for (var C = A._values.slice(), E = A._index.slice(), y = 0; y < A._index.length; y++) {
      var b = E[y], x = _[y], B = b * A._size[1] + x;
      _[y] = B % s[1], E[y] = Math.floor(B / s[1]);
    }
    A._values.length = 0, A._index.length = 0, A._ptr.length = s[1] + 1, A._size = s.slice();
    for (var z = 0; z < A._ptr.length; z++) A._ptr[z] = 0;
    for (var N = 0; N < C.length; N++) {
      var T = E[N], M = _[N], P = C[N], $ = l(T, A._ptr[M], A._ptr[M + 1], A._index);
      o($, T, M, P, A._values, A._index, A._ptr);
    }
    return A;
  }, t.prototype.clone = function() {
    var s = new t({ values: this._values ? ir(this._values) : void 0, index: ir(this._index), ptr: ir(this._ptr), size: ir(this._size), datatype: this._datatype });
    return s;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(s, g) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var m = this, w = this._size[0], A = this._size[1], _ = ye(s, m, "map"), F = function(C, E, y) {
      return _(C, [E, y], m);
    };
    return c(this, 0, w - 1, 0, A - 1, F, g);
  };
  function c(s, g, m, w, A, _, F) {
    var d = [], C = [], E = [], y = n, b = 0;
    Nr(s._datatype) && (y = e.find(n, [s._datatype, s._datatype]) || n, b = e.convert(0, s._datatype));
    for (var x = function(q, U, Y) {
      var J = _(q, U, Y);
      y(J, b) || (d.push(J), C.push(U));
    }, B = w; B <= A; B++) {
      E.push(d.length);
      var z = s._ptr[B], N = s._ptr[B + 1];
      if (F) for (var T = z; T < N; T++) {
        var M = s._index[T];
        M >= g && M <= m && x(s._values[T], M - g, B - w);
      }
      else {
        for (var P = {}, $ = z; $ < N; $++) {
          var S = s._index[$];
          P[S] = s._values[$];
        }
        for (var I = g; I <= m; I++) {
          var Z = I in P ? P[I] : 0;
          x(Z, I - g, B - w);
        }
      }
    }
    return E.push(d.length), new t({ values: d, index: C, ptr: E, size: [m - g + 1, A - w + 1] });
  }
  t.prototype.forEach = function(s, g) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var m = this, w = this._size[0], A = this._size[1], _ = ye(s, m, "forEach"), F = 0; F < A; F++) {
      var d = this._ptr[F], C = this._ptr[F + 1];
      if (g) for (var E = d; E < C; E++) {
        var y = this._index[E];
        _(this._values[E], [y, F], m);
      }
      else {
        for (var b = {}, x = d; x < C; x++) {
          var B = this._index[x];
          b[B] = this._values[x];
        }
        for (var z = 0; z < w; z++) {
          var N = z in b ? b[z] : 0;
          _(N, [z, F], m);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var s = this._size[1], g = 0; g < s; g++) for (var m = this._ptr[g], w = this._ptr[g + 1], A = m; A < w; A++) {
      var _ = this._index[A];
      yield { value: this._values[A], index: [_, g] };
    }
  }, t.prototype.toArray = function() {
    return h(this._values, this._index, this._ptr, this._size, true);
  }, t.prototype.valueOf = function() {
    return h(this._values, this._index, this._ptr, this._size, false);
  };
  function h(s, g, m, w, A) {
    var _ = w[0], F = w[1], d = [], C, E;
    for (C = 0; C < _; C++) for (d[C] = [], E = 0; E < F; E++) d[C][E] = 0;
    for (E = 0; E < F; E++) for (var y = m[E], b = m[E + 1], x = y; x < b; x++) C = g[x], d[C][E] = s ? A ? ir(s[x]) : s[x] : 1;
    return d;
  }
  return t.prototype.format = function(s) {
    for (var g = this._size[0], m = this._size[1], w = this.density(), A = "Sparse Matrix [" + dr(g, s) + " x " + dr(m, s) + "] density: " + dr(w, s) + `
`, _ = 0; _ < m; _++) for (var F = this._ptr[_], d = this._ptr[_ + 1], C = F; C < d; C++) {
      var E = this._index[C];
      A += `
    (` + dr(E, s) + ", " + dr(_, s) + ") ==> " + (this._values ? dr(this._values[C], s) : "X");
    }
    return A;
  }, t.prototype.toString = function() {
    return dr(this.toArray());
  }, t.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(s) {
    if (s) {
      if (mr(s) && (s = s.toNumber()), !pr(s) || !hr(s)) throw new TypeError("The parameter k must be an integer number");
    } else s = 0;
    var g = s > 0 ? s : 0, m = s < 0 ? -s : 0, w = this._size[0], A = this._size[1], _ = Math.min(w - m, A - g), F = [], d = [], C = [];
    C[0] = 0;
    for (var E = g; E < A && F.length < _; E++) for (var y = this._ptr[E], b = this._ptr[E + 1], x = y; x < b; x++) {
      var B = this._index[x];
      if (B === E - g + m) {
        F.push(this._values[x]), d[F.length - 1] = B - m;
        break;
      }
    }
    return C.push(F.length), new t({ values: F, index: d, ptr: C, size: [_, 1] });
  }, t.fromJSON = function(s) {
    return new t(s);
  }, t.diagonal = function(s, g, m, w, A) {
    if (!lr(s)) throw new TypeError("Array expected, size parameter");
    if (s.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (s = s.map(function(S) {
      if (mr(S) && (S = S.toNumber()), !pr(S) || !hr(S) || S < 1) throw new Error("Size values must be positive integers");
      return S;
    }), m) {
      if (mr(m) && (m = m.toNumber()), !pr(m) || !hr(m)) throw new TypeError("The parameter k must be an integer number");
    } else m = 0;
    var _ = n, F = 0;
    Nr(A) && (_ = e.find(n, [A, A]) || n, F = e.convert(0, A));
    var d = m > 0 ? m : 0, C = m < 0 ? -m : 0, E = s[0], y = s[1], b = Math.min(E - C, y - d), x;
    if (lr(g)) {
      if (g.length !== b) throw new Error("Invalid value array length");
      x = function(I) {
        return g[I];
      };
    } else if (cr(g)) {
      var B = g.size();
      if (B.length !== 1 || B[0] !== b) throw new Error("Invalid matrix length");
      x = function(I) {
        return g.get([I]);
      };
    } else x = function() {
      return g;
    };
    for (var z = [], N = [], T = [], M = 0; M < y; M++) {
      T.push(z.length);
      var P = M - d;
      if (P >= 0 && P < b) {
        var $ = x(P);
        _($, F) || (N.push(P + C), z.push($));
      }
    }
    return T.push(z.length), new t({ values: z, index: N, ptr: T, size: [E, y] });
  }, t.prototype.swapRows = function(s, g) {
    if (!pr(s) || !hr(s) || !pr(g) || !hr(g)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return Dr(s, this._size[0]), Dr(g, this._size[0]), t._swapRows(s, g, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(s, g, m, w, A) {
    for (var _ = w[s], F = w[s + 1], d = _; d < F; d++) A(m[d], g[d]);
  }, t._swapRows = function(s, g, m, w, A, _) {
    for (var F = 0; F < m; F++) {
      var d = _[F], C = _[F + 1], E = l(s, d, C, A), y = l(g, d, C, A);
      if (E < C && y < C && A[E] === s && A[y] === g) {
        if (w) {
          var b = w[E];
          w[E] = w[y], w[y] = b;
        }
        continue;
      }
      if (E < C && A[E] === s && (y >= C || A[y] !== g)) {
        var x = w ? w[E] : void 0;
        A.splice(y, 0, g), w && w.splice(y, 0, x), A.splice(y <= E ? E + 1 : E, 1), w && w.splice(y <= E ? E + 1 : E, 1);
        continue;
      }
      if (y < C && A[y] === g && (E >= C || A[E] !== s)) {
        var B = w ? w[y] : void 0;
        A.splice(E, 0, s), w && w.splice(E, 0, B), A.splice(E <= y ? y + 1 : y, 1), w && w.splice(E <= y ? y + 1 : y, 1);
      }
    }
  }, t;
}, { isClass: true }), Hu = "number", ku = ["typed"];
function ju(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], a = e[2], t = e[3];
    return { input: r, radix: n, integerPart: a, fractionalPart: t };
  } else return null;
}
function ri(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, a = 0; a < r.fractionalPart.length; a++) {
    var t = parseInt(r.fractionalPart[a], r.radix);
    n += t / Math.pow(r.radix, a + 1);
  }
  var i = e + n;
  if (isNaN(i)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return i;
}
var ei = G(Hu, ku, (r) => {
  var { typed: e } = r, n = e("number", { "": function() {
    return 0;
  }, number: function(t) {
    return t;
  }, string: function(t) {
    if (t === "NaN") return NaN;
    var i = ju(t);
    if (i) return ri(i);
    var v = 0, p = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    p && (v = Number(p[2]), t = p[1]);
    var f = Number(t);
    if (isNaN(f)) throw new SyntaxError('String "' + t + '" is not a valid number');
    if (p) {
      if (f > 2 ** v - 1) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      f >= 2 ** (v - 1) && (f = f - 2 ** v);
    }
    return f;
  }, BigNumber: function(t) {
    return t.toNumber();
  }, bigint: function(t) {
    return Number(t);
  }, Fraction: function(t) {
    return t.valueOf();
  }, Unit: e.referToSelf((a) => (t) => {
    var i = t.clone();
    return i.value = a(t.value), i;
  }), null: function(t) {
    return 0;
  }, "Unit, string | Unit": function(t, i) {
    return t.toNumber(i);
  }, "Array | Matrix": e.referToSelf((a) => (t) => Br(t, a)) });
  return n.fromJSON = function(a) {
    return parseFloat(a.value);
  }, n;
}), ti = "bignumber", ni = ["typed", "BigNumber"], ai = G(ti, ni, (r) => {
  var { typed: e, BigNumber: n } = r;
  return e("bignumber", { "": function() {
    return new n(0);
  }, number: function(t) {
    return new n(t + "");
  }, string: function(t) {
    var i = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (i) {
      var v = i[2], p = n(i[1]), f = new n(2).pow(Number(v));
      if (p.gt(f.sub(1))) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      var l = new n(2).pow(Number(v) - 1);
      return p.gte(l) ? p.sub(f) : p;
    }
    return new n(t);
  }, BigNumber: function(t) {
    return t;
  }, bigint: function(t) {
    return new n(t.toString());
  }, Unit: e.referToSelf((a) => (t) => {
    var i = t.clone();
    return i.value = a(t.value), i;
  }), Fraction: function(t) {
    return new n(t.n).div(t.d).times(t.s);
  }, null: function(t) {
    return new n(0);
  }, "Array | Matrix": e.referToSelf((a) => (t) => Br(t, a)) });
}), ui = "complex", ii = ["typed", "Complex"], oi = G(ui, ii, (r) => {
  var { typed: e, Complex: n } = r;
  return e("complex", { "": function() {
    return n.ZERO;
  }, number: function(t) {
    return new n(t, 0);
  }, "number, number": function(t, i) {
    return new n(t, i);
  }, "BigNumber, BigNumber": function(t, i) {
    return new n(t.toNumber(), i.toNumber());
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
  }, "Array | Matrix": e.referToSelf((a) => (t) => Br(t, a)) });
}), si = "fraction", fi = ["typed", "Fraction"], vi = G(si, fi, (r) => {
  var { typed: e, Fraction: n } = r;
  return e("fraction", { number: function(t) {
    if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");
    return new n(t);
  }, string: function(t) {
    return new n(t);
  }, "number, number": function(t, i) {
    return new n(t, i);
  }, null: function(t) {
    return new n(0);
  }, BigNumber: function(t) {
    return new n(t.toString());
  }, bigint: function(t) {
    return new n(t.toString());
  }, Fraction: function(t) {
    return t;
  }, Unit: e.referToSelf((a) => (t) => {
    var i = t.clone();
    return i.value = a(t.value), i;
  }), Object: function(t) {
    return new n(t);
  }, "Array | Matrix": e.referToSelf((a) => (t) => Br(t, a)) });
}), wt = "matrix", li = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], ci = G(wt, li, (r) => {
  var { typed: e, Matrix: n, DenseMatrix: a, SparseMatrix: t } = r;
  return e(wt, { "": function() {
    return i([]);
  }, string: function(p) {
    return i([], p);
  }, "string, string": function(p, f) {
    return i([], p, f);
  }, Array: function(p) {
    return i(p);
  }, Matrix: function(p) {
    return i(p, p.storage());
  }, "Array | Matrix, string": i, "Array | Matrix, string, string": i });
  function i(v, p, f) {
    if (p === "dense" || p === "default" || p === void 0) return new a(v, f);
    if (p === "sparse") return new t(v, f);
    throw new TypeError("Unknown matrix type " + JSON.stringify(p) + ".");
  }
}), Ct = "matrixFromColumns", Di = ["typed", "matrix", "flatten", "size"], pi = G(Ct, Di, (r) => {
  var { typed: e, matrix: n, flatten: a, size: t } = r;
  return e(Ct, { "...Array": function(f) {
    return i(f);
  }, "...Matrix": function(f) {
    return n(i(f.map((l) => l.toArray())));
  } });
  function i(p) {
    if (p.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
    for (var f = v(p[0]), l = [], u = 0; u < f; u++) l[u] = [];
    for (var o of p) {
      var D = v(o);
      if (D !== f) throw new TypeError("The vectors had different length: " + (f | 0) + " \u2260 " + (D | 0));
      for (var c = a(o), h = 0; h < f; h++) l[h].push(c[h]);
    }
    return l;
  }
  function v(p) {
    var f = t(p);
    if (f.length === 1) return f[0];
    if (f.length === 2) {
      if (f[0] === 1) return f[1];
      if (f[1] === 1) return f[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), _t = "unaryMinus", hi = ["typed"], di = G(_t, hi, (r) => {
  var { typed: e } = r;
  return e(_t, { number: Qn, "Complex | BigNumber | Fraction": (n) => n.neg(), bigint: (n) => -n, Unit: e.referToSelf((n) => (a) => {
    var t = a.clone();
    return t.value = e.find(n, t.valueType())(a.value), t;
  }), "Array | Matrix": e.referToSelf((n) => (a) => Br(a, n)) });
}), bt = "abs", mi = ["typed"], gi = G(bt, mi, (r) => {
  var { typed: e } = r;
  return e(bt, { number: Ln, "Complex | BigNumber | Fraction | Unit": (n) => n.abs(), bigint: (n) => n < 0n ? -n : n, "Array | Matrix": e.referToSelf((n) => (a) => Br(a, n)) });
}), xt = "addScalar", yi = ["typed"], Ai = G(xt, yi, (r) => {
  var { typed: e } = r;
  return e(xt, { "number, number": Vn, "Complex, Complex": function(a, t) {
    return a.add(t);
  }, "BigNumber, BigNumber": function(a, t) {
    return a.plus(t);
  }, "bigint, bigint": function(a, t) {
    return a + t;
  }, "Fraction, Fraction": function(a, t) {
    return a.add(t);
  }, "Unit, Unit": e.referToSelf((n) => (a, t) => {
    if (a.value === null || a.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
    if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
    if (!a.equalBase(t)) throw new Error("Units do not match");
    var i = a.clone();
    return i.value = e.find(n, [i.valueType(), t.valueType()])(i.value, t.value), i.fixPrefix = false, i;
  }) });
}), Bt = "subtractScalar", Fi = ["typed"], Ei = G(Bt, Fi, (r) => {
  var { typed: e } = r;
  return e(Bt, { "number, number": Zn, "Complex, Complex": function(a, t) {
    return a.sub(t);
  }, "BigNumber, BigNumber": function(a, t) {
    return a.minus(t);
  }, "bigint, bigint": function(a, t) {
    return a - t;
  }, "Fraction, Fraction": function(a, t) {
    return a.sub(t);
  }, "Unit, Unit": e.referToSelf((n) => (a, t) => {
    if (a.value === null || a.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
    if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
    if (!a.equalBase(t)) throw new Error("Units do not match");
    var i = a.clone();
    return i.value = e.find(n, [i.valueType(), t.valueType()])(i.value, t.value), i.fixPrefix = false, i;
  }) });
}), wi = "matAlgo11xS0s", Ci = ["typed", "equalScalar"], Yn = G(wi, Ci, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, i, v, p) {
    var f = t._values, l = t._index, u = t._ptr, o = t._size, D = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var c = o[0], h = o[1], s, g = n, m = 0, w = v;
    typeof D == "string" && (s = D, g = e.find(n, [s, s]), m = e.convert(0, s), i = e.convert(i, s), w = e.find(v, [s, s]));
    for (var A = [], _ = [], F = [], d = 0; d < h; d++) {
      F[d] = _.length;
      for (var C = u[d], E = u[d + 1], y = C; y < E; y++) {
        var b = l[y], x = p ? w(i, f[y]) : w(f[y], i);
        g(x, m) || (_.push(b), A.push(x));
      }
    }
    return F[h] = _.length, t.createSparseMatrix({ values: A, index: _, ptr: F, size: [c, h], datatype: s });
  };
}), _i = "matAlgo12xSfs", bi = ["typed", "DenseMatrix"], jr = G(_i, bi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, i, v, p) {
    var f = t._values, l = t._index, u = t._ptr, o = t._size, D = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var c = o[0], h = o[1], s, g = v;
    typeof D == "string" && (s = D, i = e.convert(i, s), g = e.find(v, [s, s]));
    for (var m = [], w = [], A = [], _ = 0; _ < h; _++) {
      for (var F = _ + 1, d = u[_], C = u[_ + 1], E = d; E < C; E++) {
        var y = l[E];
        w[y] = f[E], A[y] = F;
      }
      for (var b = 0; b < c; b++) _ === 0 && (m[b] = []), A[b] === F ? m[b][_] = p ? g(i, w[b]) : g(w[b], i) : m[b][_] = p ? g(i, 0) : g(0, i);
    }
    return new n({ data: m, size: [c, h], datatype: s });
  };
}), xi = "matAlgo14xDs", Bi = ["typed"], He = G(xi, Bi, (r) => {
  var { typed: e } = r;
  return function(t, i, v, p) {
    var f = t._data, l = t._size, u = t._datatype, o, D = v;
    typeof u == "string" && (o = u, i = e.convert(i, o), D = e.find(v, [o, o]));
    var c = l.length > 0 ? n(D, 0, l, l[0], f, i, p) : [];
    return t.createDenseMatrix({ data: c, size: ir(l), datatype: o });
  };
  function n(a, t, i, v, p, f, l) {
    var u = [];
    if (t === i.length - 1) for (var o = 0; o < v; o++) u[o] = l ? a(f, p[o]) : a(p[o], f);
    else for (var D = 0; D < v; D++) u[D] = n(a, t + 1, i, i[t + 1], p[D], f, l);
    return u;
  }
}), Si = "matAlgo03xDSf", Mi = ["typed"], re = G(Si, Mi, (r) => {
  var { typed: e } = r;
  return function(a, t, i, v) {
    var p = a._data, f = a._size, l = a._datatype || a.getDataType(), u = t._values, o = t._index, D = t._ptr, c = t._size, h = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (f.length !== c.length) throw new ar(f.length, c.length);
    if (f[0] !== c[0] || f[1] !== c[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + c + ")");
    if (!u) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var s = f[0], g = f[1], m, w = 0, A = i;
    typeof l == "string" && l === h && l !== "mixed" && (m = l, w = e.convert(0, m), A = e.find(i, [m, m]));
    for (var _ = [], F = 0; F < s; F++) _[F] = [];
    for (var d = [], C = [], E = 0; E < g; E++) {
      for (var y = E + 1, b = D[E], x = D[E + 1], B = b; B < x; B++) {
        var z = o[B];
        d[z] = v ? A(u[B], p[z][E]) : A(p[z][E], u[B]), C[z] = y;
      }
      for (var N = 0; N < s; N++) C[N] === y ? _[N][E] = d[N] : _[N][E] = v ? A(w, p[N][E]) : A(p[N][E], w);
    }
    return a.createDenseMatrix({ data: _, size: [s, g], datatype: l === a._datatype && h === t._datatype ? m : void 0 });
  };
}), Ni = "matAlgo05xSfSf", zi = ["typed", "equalScalar"], Ti = G(Ni, zi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, i, v) {
    var p = t._values, f = t._index, l = t._ptr, u = t._size, o = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), D = i._values, c = i._index, h = i._ptr, s = i._size, g = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (u.length !== s.length) throw new ar(u.length, s.length);
    if (u[0] !== s[0] || u[1] !== s[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + s + ")");
    var m = u[0], w = u[1], A, _ = n, F = 0, d = v;
    typeof o == "string" && o === g && o !== "mixed" && (A = o, _ = e.find(n, [A, A]), F = e.convert(0, A), d = e.find(v, [A, A]));
    var C = p && D ? [] : void 0, E = [], y = [], b = C ? [] : void 0, x = C ? [] : void 0, B = [], z = [], N, T, M, P;
    for (T = 0; T < w; T++) {
      y[T] = E.length;
      var $ = T + 1;
      for (M = l[T], P = l[T + 1]; M < P; M++) N = f[M], E.push(N), B[N] = $, b && (b[N] = p[M]);
      for (M = h[T], P = h[T + 1]; M < P; M++) N = c[M], B[N] !== $ && E.push(N), z[N] = $, x && (x[N] = D[M]);
      if (C) for (M = y[T]; M < E.length; ) {
        N = E[M];
        var S = B[N], I = z[N];
        if (S === $ || I === $) {
          var Z = S === $ ? b[N] : F, O = I === $ ? x[N] : F, q = d(Z, O);
          _(q, F) ? E.splice(M, 1) : (C.push(q), M++);
        }
      }
    }
    return y[w] = E.length, t.createSparseMatrix({ values: C, index: E, ptr: y, size: [m, w], datatype: o === t._datatype && g === i._datatype ? A : void 0 });
  };
}), $i = "matAlgo13xDD", Oi = ["typed"], qi = G($i, Oi, (r) => {
  var { typed: e } = r;
  return function(t, i, v) {
    var p = t._data, f = t._size, l = t._datatype, u = i._data, o = i._size, D = i._datatype, c = [];
    if (f.length !== o.length) throw new ar(f.length, o.length);
    for (var h = 0; h < f.length; h++) {
      if (f[h] !== o[h]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + o + ")");
      c[h] = f[h];
    }
    var s, g = v;
    typeof l == "string" && l === D && (s = l, g = e.find(v, [s, s]));
    var m = c.length > 0 ? n(g, 0, c, c[0], p, u) : [];
    return t.createDenseMatrix({ data: m, size: c, datatype: s });
  };
  function n(a, t, i, v, p, f) {
    var l = [];
    if (t === i.length - 1) for (var u = 0; u < v; u++) l[u] = a(p[u], f[u]);
    else for (var o = 0; o < v; o++) l[o] = n(a, t + 1, i, i[t + 1], p[o], f[o]);
    return l;
  }
});
function Ar(r, e) {
  if (Lr(r.size(), e.size())) return [r, e];
  var n = Rn(r.size(), e.size());
  return [r, e].map((a) => Ii(a, n));
}
function Ii(r, e) {
  return Lr(r.size(), e) ? r : r.create(Le(r.valueOf(), e), r.datatype());
}
var Ri = "matrixAlgorithmSuite", Ui = ["typed", "matrix"], Qr = G(Ri, Ui, (r) => {
  var { typed: e, matrix: n } = r, a = qi({ typed: e }), t = He({ typed: e });
  return function(v) {
    var p = v.elop, f = v.SD || v.DS, l;
    p ? (l = { "DenseMatrix, DenseMatrix": (c, h) => a(...Ar(c, h), p), "Array, Array": (c, h) => a(...Ar(n(c), n(h)), p).valueOf(), "Array, DenseMatrix": (c, h) => a(...Ar(n(c), h), p), "DenseMatrix, Array": (c, h) => a(...Ar(c, n(h)), p) }, v.SS && (l["SparseMatrix, SparseMatrix"] = (c, h) => v.SS(...Ar(c, h), p, false)), v.DS && (l["DenseMatrix, SparseMatrix"] = (c, h) => v.DS(...Ar(c, h), p, false), l["Array, SparseMatrix"] = (c, h) => v.DS(...Ar(n(c), h), p, false)), f && (l["SparseMatrix, DenseMatrix"] = (c, h) => f(...Ar(h, c), p, true), l["SparseMatrix, Array"] = (c, h) => f(...Ar(n(h), c), p, true))) : (l = { "DenseMatrix, DenseMatrix": e.referToSelf((c) => (h, s) => a(...Ar(h, s), c)), "Array, Array": e.referToSelf((c) => (h, s) => a(...Ar(n(h), n(s)), c).valueOf()), "Array, DenseMatrix": e.referToSelf((c) => (h, s) => a(...Ar(n(h), s), c)), "DenseMatrix, Array": e.referToSelf((c) => (h, s) => a(...Ar(h, n(s)), c)) }, v.SS && (l["SparseMatrix, SparseMatrix"] = e.referToSelf((c) => (h, s) => v.SS(...Ar(h, s), c, false))), v.DS && (l["DenseMatrix, SparseMatrix"] = e.referToSelf((c) => (h, s) => v.DS(...Ar(h, s), c, false)), l["Array, SparseMatrix"] = e.referToSelf((c) => (h, s) => v.DS(...Ar(n(h), s), c, false))), f && (l["SparseMatrix, DenseMatrix"] = e.referToSelf((c) => (h, s) => f(...Ar(s, h), c, true)), l["SparseMatrix, Array"] = e.referToSelf((c) => (h, s) => f(...Ar(n(s), h), c, true))));
    var u = v.scalar || "any", o = v.Ds || v.Ss;
    o && (p ? (l["DenseMatrix," + u] = (c, h) => t(c, h, p, false), l[u + ", DenseMatrix"] = (c, h) => t(h, c, p, true), l["Array," + u] = (c, h) => t(n(c), h, p, false).valueOf(), l[u + ", Array"] = (c, h) => t(n(h), c, p, true).valueOf()) : (l["DenseMatrix," + u] = e.referToSelf((c) => (h, s) => t(h, s, c, false)), l[u + ", DenseMatrix"] = e.referToSelf((c) => (h, s) => t(s, h, c, true)), l["Array," + u] = e.referToSelf((c) => (h, s) => t(n(h), s, c, false).valueOf()), l[u + ", Array"] = e.referToSelf((c) => (h, s) => t(n(s), h, c, true).valueOf())));
    var D = v.sS !== void 0 ? v.sS : v.Ss;
    return p ? (v.Ss && (l["SparseMatrix," + u] = (c, h) => v.Ss(c, h, p, false)), D && (l[u + ", SparseMatrix"] = (c, h) => D(h, c, p, true))) : (v.Ss && (l["SparseMatrix," + u] = e.referToSelf((c) => (h, s) => v.Ss(h, s, c, false))), D && (l[u + ", SparseMatrix"] = e.referToSelf((c) => (h, s) => D(s, h, c, true)))), p && p.signatures && bn(l, p.signatures), l;
  };
}), Pi = "matAlgo01xDSid", Li = ["typed"], Kn = G(Pi, Li, (r) => {
  var { typed: e } = r;
  return function(a, t, i, v) {
    var p = a._data, f = a._size, l = a._datatype || a.getDataType(), u = t._values, o = t._index, D = t._ptr, c = t._size, h = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (f.length !== c.length) throw new ar(f.length, c.length);
    if (f[0] !== c[0] || f[1] !== c[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + c + ")");
    if (!u) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var s = f[0], g = f[1], m = typeof l == "string" && l !== "mixed" && l === h ? l : void 0, w = m ? e.find(i, [m, m]) : i, A, _, F = [];
    for (A = 0; A < s; A++) F[A] = [];
    var d = [], C = [];
    for (_ = 0; _ < g; _++) {
      for (var E = _ + 1, y = D[_], b = D[_ + 1], x = y; x < b; x++) A = o[x], d[A] = v ? w(u[x], p[A][_]) : w(p[A][_], u[x]), C[A] = E;
      for (A = 0; A < s; A++) C[A] === E ? F[A][_] = d[A] : F[A][_] = p[A][_];
    }
    return a.createDenseMatrix({ data: F, size: [s, g], datatype: l === a._datatype && h === t._datatype ? m : void 0 });
  };
}), Vi = "matAlgo04xSidSid", Zi = ["typed", "equalScalar"], Ji = G(Vi, Zi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, i, v) {
    var p = t._values, f = t._index, l = t._ptr, u = t._size, o = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), D = i._values, c = i._index, h = i._ptr, s = i._size, g = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (u.length !== s.length) throw new ar(u.length, s.length);
    if (u[0] !== s[0] || u[1] !== s[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + s + ")");
    var m = u[0], w = u[1], A, _ = n, F = 0, d = v;
    typeof o == "string" && o === g && o !== "mixed" && (A = o, _ = e.find(n, [A, A]), F = e.convert(0, A), d = e.find(v, [A, A]));
    var C = p && D ? [] : void 0, E = [], y = [], b = p && D ? [] : void 0, x = p && D ? [] : void 0, B = [], z = [], N, T, M, P, $;
    for (T = 0; T < w; T++) {
      y[T] = E.length;
      var S = T + 1;
      for (P = l[T], $ = l[T + 1], M = P; M < $; M++) N = f[M], E.push(N), B[N] = S, b && (b[N] = p[M]);
      for (P = h[T], $ = h[T + 1], M = P; M < $; M++) if (N = c[M], B[N] === S) {
        if (b) {
          var I = d(b[N], D[M]);
          _(I, F) ? B[N] = null : b[N] = I;
        }
      } else E.push(N), z[N] = S, x && (x[N] = D[M]);
      if (b && x) for (M = y[T]; M < E.length; ) N = E[M], B[N] === S ? (C[M] = b[N], M++) : z[N] === S ? (C[M] = x[N], M++) : E.splice(M, 1);
    }
    return y[w] = E.length, t.createSparseMatrix({ values: C, index: E, ptr: y, size: [m, w], datatype: o === t._datatype && g === i._datatype ? A : void 0 });
  };
}), Qi = "matAlgo10xSids", Gi = ["typed", "DenseMatrix"], Wn = G(Qi, Gi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, i, v, p) {
    var f = t._values, l = t._index, u = t._ptr, o = t._size, D = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var c = o[0], h = o[1], s, g = v;
    typeof D == "string" && (s = D, i = e.convert(i, s), g = e.find(v, [s, s]));
    for (var m = [], w = [], A = [], _ = 0; _ < h; _++) {
      for (var F = _ + 1, d = u[_], C = u[_ + 1], E = d; E < C; E++) {
        var y = l[E];
        w[y] = f[E], A[y] = F;
      }
      for (var b = 0; b < c; b++) _ === 0 && (m[b] = []), A[b] === F ? m[b][_] = p ? g(i, w[b]) : g(w[b], i) : m[b][_] = i;
    }
    return new n({ data: m, size: [c, h], datatype: s });
  };
}), Xi = "multiplyScalar", Yi = ["typed"], Ki = G(Xi, Yi, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": Jn, "Complex, Complex": function(a, t) {
    return a.mul(t);
  }, "BigNumber, BigNumber": function(a, t) {
    return a.times(t);
  }, "bigint, bigint": function(a, t) {
    return a * t;
  }, "Fraction, Fraction": function(a, t) {
    return a.mul(t);
  }, "number | Fraction | BigNumber | Complex, Unit": (n, a) => a.multiply(n), "Unit, number | Fraction | BigNumber | Complex | Unit": (n, a) => n.multiply(a) });
}), St = "multiply", Wi = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Hi = G(St, Wi, (r) => {
  var { typed: e, matrix: n, addScalar: a, multiplyScalar: t, equalScalar: i, dot: v } = r, p = Yn({ typed: e, equalScalar: i }), f = He({ typed: e });
  function l(F, d) {
    switch (F.length) {
      case 1:
        switch (d.length) {
          case 1:
            if (F[0] !== d[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (F[0] !== d[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + F[0] + ") must match Matrix rows (" + d[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + d.length + " dimensions)");
        }
        break;
      case 2:
        switch (d.length) {
          case 1:
            if (F[1] !== d[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + F[1] + ") must match Vector length (" + d[0] + ")");
            break;
          case 2:
            if (F[1] !== d[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + F[1] + ") must match Matrix B rows (" + d[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + d.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + F.length + " dimensions)");
    }
  }
  function u(F, d, C) {
    if (C === 0) throw new Error("Cannot multiply two empty vectors");
    return v(F, d);
  }
  function o(F, d) {
    if (d.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
    return D(F, d);
  }
  function D(F, d) {
    var C = F._data, E = F._size, y = F._datatype || F.getDataType(), b = d._data, x = d._size, B = d._datatype || d.getDataType(), z = E[0], N = x[1], T, M = a, P = t;
    y && B && y === B && typeof y == "string" && y !== "mixed" && (T = y, M = e.find(a, [T, T]), P = e.find(t, [T, T]));
    for (var $ = [], S = 0; S < N; S++) {
      for (var I = P(C[0], b[0][S]), Z = 1; Z < z; Z++) I = M(I, P(C[Z], b[Z][S]));
      $[S] = I;
    }
    return F.createDenseMatrix({ data: $, size: [N], datatype: y === F._datatype && B === d._datatype ? T : void 0 });
  }
  var c = e("_multiplyMatrixVector", { "DenseMatrix, any": s, "SparseMatrix, any": w }), h = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": g, "DenseMatrix, SparseMatrix": m, "SparseMatrix, DenseMatrix": A, "SparseMatrix, SparseMatrix": _ });
  function s(F, d) {
    var C = F._data, E = F._size, y = F._datatype || F.getDataType(), b = d._data, x = d._datatype || d.getDataType(), B = E[0], z = E[1], N, T = a, M = t;
    y && x && y === x && typeof y == "string" && y !== "mixed" && (N = y, T = e.find(a, [N, N]), M = e.find(t, [N, N]));
    for (var P = [], $ = 0; $ < B; $++) {
      for (var S = C[$], I = M(S[0], b[0]), Z = 1; Z < z; Z++) I = T(I, M(S[Z], b[Z]));
      P[$] = I;
    }
    return F.createDenseMatrix({ data: P, size: [B], datatype: y === F._datatype && x === d._datatype ? N : void 0 });
  }
  function g(F, d) {
    var C = F._data, E = F._size, y = F._datatype || F.getDataType(), b = d._data, x = d._size, B = d._datatype || d.getDataType(), z = E[0], N = E[1], T = x[1], M, P = a, $ = t;
    y && B && y === B && typeof y == "string" && y !== "mixed" && y !== "mixed" && (M = y, P = e.find(a, [M, M]), $ = e.find(t, [M, M]));
    for (var S = [], I = 0; I < z; I++) {
      var Z = C[I];
      S[I] = [];
      for (var O = 0; O < T; O++) {
        for (var q = $(Z[0], b[0][O]), U = 1; U < N; U++) q = P(q, $(Z[U], b[U][O]));
        S[I][O] = q;
      }
    }
    return F.createDenseMatrix({ data: S, size: [z, T], datatype: y === F._datatype && B === d._datatype ? M : void 0 });
  }
  function m(F, d) {
    var C = F._data, E = F._size, y = F._datatype || F.getDataType(), b = d._values, x = d._index, B = d._ptr, z = d._size, N = d._datatype || d._data === void 0 ? d._datatype : d.getDataType();
    if (!b) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var T = E[0], M = z[1], P, $ = a, S = t, I = i, Z = 0;
    y && N && y === N && typeof y == "string" && y !== "mixed" && (P = y, $ = e.find(a, [P, P]), S = e.find(t, [P, P]), I = e.find(i, [P, P]), Z = e.convert(0, P));
    for (var O = [], q = [], U = [], Y = d.createSparseMatrix({ values: O, index: q, ptr: U, size: [T, M], datatype: y === F._datatype && N === d._datatype ? P : void 0 }), J = 0; J < M; J++) {
      U[J] = q.length;
      var R = B[J], V = B[J + 1];
      if (V > R) for (var Q = 0, L = 0; L < T; L++) {
        for (var K = L + 1, X = void 0, W = R; W < V; W++) {
          var j = x[W];
          Q !== K ? (X = S(C[L][j], b[W]), Q = K) : X = $(X, S(C[L][j], b[W]));
        }
        Q === K && !I(X, Z) && (q.push(L), O.push(X));
      }
    }
    return U[M] = q.length, Y;
  }
  function w(F, d) {
    var C = F._values, E = F._index, y = F._ptr, b = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!C) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var x = d._data, B = d._datatype || d.getDataType(), z = F._size[0], N = d._size[0], T = [], M = [], P = [], $, S = a, I = t, Z = i, O = 0;
    b && B && b === B && typeof b == "string" && b !== "mixed" && ($ = b, S = e.find(a, [$, $]), I = e.find(t, [$, $]), Z = e.find(i, [$, $]), O = e.convert(0, $));
    var q = [], U = [];
    P[0] = 0;
    for (var Y = 0; Y < N; Y++) {
      var J = x[Y];
      if (!Z(J, O)) for (var R = y[Y], V = y[Y + 1], Q = R; Q < V; Q++) {
        var L = E[Q];
        U[L] ? q[L] = S(q[L], I(J, C[Q])) : (U[L] = true, M.push(L), q[L] = I(J, C[Q]));
      }
    }
    for (var K = M.length, X = 0; X < K; X++) {
      var W = M[X];
      T[X] = q[W];
    }
    return P[1] = M.length, F.createSparseMatrix({ values: T, index: M, ptr: P, size: [z, 1], datatype: b === F._datatype && B === d._datatype ? $ : void 0 });
  }
  function A(F, d) {
    var C = F._values, E = F._index, y = F._ptr, b = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!C) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var x = d._data, B = d._datatype || d.getDataType(), z = F._size[0], N = d._size[0], T = d._size[1], M, P = a, $ = t, S = i, I = 0;
    b && B && b === B && typeof b == "string" && b !== "mixed" && (M = b, P = e.find(a, [M, M]), $ = e.find(t, [M, M]), S = e.find(i, [M, M]), I = e.convert(0, M));
    for (var Z = [], O = [], q = [], U = F.createSparseMatrix({ values: Z, index: O, ptr: q, size: [z, T], datatype: b === F._datatype && B === d._datatype ? M : void 0 }), Y = [], J = [], R = 0; R < T; R++) {
      q[R] = O.length;
      for (var V = R + 1, Q = 0; Q < N; Q++) {
        var L = x[Q][R];
        if (!S(L, I)) for (var K = y[Q], X = y[Q + 1], W = K; W < X; W++) {
          var j = E[W];
          J[j] !== V ? (J[j] = V, O.push(j), Y[j] = $(L, C[W])) : Y[j] = P(Y[j], $(L, C[W]));
        }
      }
      for (var er = q[R], tr = O.length, nr = er; nr < tr; nr++) {
        var rr = O[nr];
        Z[nr] = Y[rr];
      }
    }
    return q[T] = O.length, U;
  }
  function _(F, d) {
    var C = F._values, E = F._index, y = F._ptr, b = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), x = d._values, B = d._index, z = d._ptr, N = d._datatype || d._data === void 0 ? d._datatype : d.getDataType(), T = F._size[0], M = d._size[1], P = C && x, $, S = a, I = t;
    b && N && b === N && typeof b == "string" && b !== "mixed" && ($ = b, S = e.find(a, [$, $]), I = e.find(t, [$, $]));
    for (var Z = P ? [] : void 0, O = [], q = [], U = F.createSparseMatrix({ values: Z, index: O, ptr: q, size: [T, M], datatype: b === F._datatype && N === d._datatype ? $ : void 0 }), Y = P ? [] : void 0, J = [], R, V, Q, L, K, X, W, j, er = 0; er < M; er++) {
      q[er] = O.length;
      var tr = er + 1;
      for (K = z[er], X = z[er + 1], L = K; L < X; L++) if (j = B[L], P) for (V = y[j], Q = y[j + 1], R = V; R < Q; R++) W = E[R], J[W] !== tr ? (J[W] = tr, O.push(W), Y[W] = I(x[L], C[R])) : Y[W] = S(Y[W], I(x[L], C[R]));
      else for (V = y[j], Q = y[j + 1], R = V; R < Q; R++) W = E[R], J[W] !== tr && (J[W] = tr, O.push(W));
      if (P) for (var nr = q[er], rr = O.length, or = nr; or < rr; or++) {
        var ur = O[or];
        Z[or] = Y[ur];
      }
    }
    return q[M] = O.length, U;
  }
  return e(St, t, { "Array, Array": e.referTo("Matrix, Matrix", (F) => (d, C) => {
    l(sr(d), sr(C));
    var E = F(n(d), n(C));
    return cr(E) ? E.valueOf() : E;
  }), "Matrix, Matrix": function(d, C) {
    var E = d.size(), y = C.size();
    return l(E, y), E.length === 1 ? y.length === 1 ? u(d, C, E[0]) : o(d, C) : y.length === 1 ? c(d, C) : h(d, C);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (d, C) => F(d, n(C))), "Array, Matrix": e.referToSelf((F) => (d, C) => F(n(d, C.storage()), C)), "SparseMatrix, any": function(d, C) {
    return p(d, C, t, false);
  }, "DenseMatrix, any": function(d, C) {
    return f(d, C, t, false);
  }, "any, SparseMatrix": function(d, C) {
    return p(C, d, t, true);
  }, "any, DenseMatrix": function(d, C) {
    return f(C, d, t, true);
  }, "Array, any": function(d, C) {
    return f(n(d), C, t, false).valueOf();
  }, "any, Array": function(d, C) {
    return f(n(C), d, t, true).valueOf();
  }, "any, any": t, "any, any, ...any": e.referToSelf((F) => (d, C, E) => {
    for (var y = F(d, C), b = 0; b < E.length; b++) y = F(y, E[b]);
    return y;
  }) });
}), Mt = "sign", ki = ["typed", "BigNumber", "Fraction", "complex"], ji = G(Mt, ki, (r) => {
  var { typed: e, BigNumber: n, complex: a, Fraction: t } = r;
  return e(Mt, { number: Ve, Complex: function(v) {
    return v.im === 0 ? a(Ve(v.re)) : v.sign();
  }, BigNumber: function(v) {
    return new n(v.cmp(0));
  }, bigint: function(v) {
    return v > 0n ? 1n : v < 0n ? -1n : 0n;
  }, Fraction: function(v) {
    return new t(v.s, 1);
  }, "Array | Matrix": e.referToSelf((i) => (v) => Br(v, i)), Unit: e.referToSelf((i) => (v) => {
    if (!v._isDerived() && v.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
    return e.find(i, v.valueType())(v.value);
  }) });
}), ro = "sqrt", eo = ["config", "typed", "Complex"], to = G(ro, eo, (r) => {
  var { config: e, typed: n, Complex: a } = r;
  return n("sqrt", { number: t, Complex: function(v) {
    return v.sqrt();
  }, BigNumber: function(v) {
    return !v.isNegative() || e.predictable ? v.sqrt() : t(v.toNumber());
  }, Unit: function(v) {
    return v.pow(0.5);
  } });
  function t(i) {
    return isNaN(i) ? NaN : i >= 0 || e.predictable ? Math.sqrt(i) : new a(i, 0).sqrt();
  }
}), Nt = "subtract", no = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], ao = G(Nt, no, (r) => {
  var { typed: e, matrix: n, equalScalar: a, subtractScalar: t, unaryMinus: i, DenseMatrix: v, concat: p } = r, f = Kn({ typed: e }), l = re({ typed: e }), u = Ti({ typed: e, equalScalar: a }), o = Wn({ typed: e, DenseMatrix: v }), D = jr({ typed: e, DenseMatrix: v }), c = Qr({ typed: e, matrix: n, concat: p });
  return e(Nt, { "any, any": t }, c({ elop: t, SS: u, DS: f, SD: l, Ss: D, sS: o }));
}), uo = "matAlgo07xSSf", io = ["typed", "DenseMatrix"], ae = G(uo, io, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(i, v, p) {
    var f = i._size, l = i._datatype || i._data === void 0 ? i._datatype : i.getDataType(), u = v._size, o = v._datatype || v._data === void 0 ? v._datatype : v.getDataType();
    if (f.length !== u.length) throw new ar(f.length, u.length);
    if (f[0] !== u[0] || f[1] !== u[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + u + ")");
    var D = f[0], c = f[1], h, s = 0, g = p;
    typeof l == "string" && l === o && l !== "mixed" && (h = l, s = e.convert(0, h), g = e.find(p, [h, h]));
    var m, w, A = [];
    for (m = 0; m < D; m++) A[m] = [];
    var _ = [], F = [], d = [], C = [];
    for (w = 0; w < c; w++) {
      var E = w + 1;
      for (a(i, w, d, _, E), a(v, w, C, F, E), m = 0; m < D; m++) {
        var y = d[m] === E ? _[m] : s, b = C[m] === E ? F[m] : s;
        A[m][w] = g(y, b);
      }
    }
    return new n({ data: A, size: [D, c], datatype: l === i._datatype && o === v._datatype ? h : void 0 });
  };
  function a(t, i, v, p, f) {
    for (var l = t._values, u = t._index, o = t._ptr, D = o[i], c = o[i + 1]; D < c; D++) {
      var h = u[D];
      v[h] = f, p[h] = l[D];
    }
  }
}), zt = "conj", oo = ["typed"], so = G(zt, oo, (r) => {
  var { typed: e } = r;
  return e(zt, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.conjugate(), "Array | Matrix": e.referToSelf((n) => (a) => Br(a, n)) });
}), Tt = "im", fo = ["typed"], vo = G(Tt, fo, (r) => {
  var { typed: e } = r;
  return e(Tt, { number: () => 0, "BigNumber | Fraction": (n) => n.mul(0), Complex: (n) => n.im, "Array | Matrix": e.referToSelf((n) => (a) => Br(a, n)) });
}), $t = "re", lo = ["typed"], co = G($t, lo, (r) => {
  var { typed: e } = r;
  return e($t, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.re, "Array | Matrix": e.referToSelf((n) => (a) => Br(a, n)) });
}), Ot = "concat", Do = ["typed", "matrix", "isInteger"], po = G(Ot, Do, (r) => {
  var { typed: e, matrix: n, isInteger: a } = r;
  return e(Ot, { "...Array | Matrix | number | BigNumber": function(i) {
    var v, p = i.length, f = -1, l, u = false, o = [];
    for (v = 0; v < p; v++) {
      var D = i[v];
      if (cr(D) && (u = true), pr(D) || mr(D)) {
        if (v !== p - 1) throw new Error("Dimension must be specified as last argument");
        if (l = f, f = D.valueOf(), !a(f)) throw new TypeError("Integer number expected for dimension");
        if (f < 0 || v > 0 && f > l) throw new Jr(f, l + 1);
      } else {
        var c = ir(D).valueOf(), h = sr(c);
        if (o[v] = c, l = f, f = h.length - 1, v > 0 && f !== l) throw new ar(l + 1, f + 1);
      }
    }
    if (o.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var s = o.shift(); o.length; ) s = In(s, o.shift(), f);
    return u ? n(s) : s;
  }, "...string": function(i) {
    return i.join("");
  } });
}), qt = "column", ho = ["typed", "Index", "matrix", "range"], mo = G(qt, ho, (r) => {
  var { typed: e, Index: n, matrix: a, range: t } = r;
  return e(qt, { "Matrix, number": i, "Array, number": function(p, f) {
    return i(a(ir(p)), f).valueOf();
  } });
  function i(v, p) {
    if (v.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
    Dr(p, v.size()[1]);
    var f = t(0, v.size()[0]), l = new n(f, p), u = v.subset(l);
    return cr(u) ? u : a([[u]]);
  }
}), It = "cross", go = ["typed", "matrix", "subtract", "multiply"], yo = G(It, go, (r) => {
  var { typed: e, matrix: n, subtract: a, multiply: t } = r;
  return e(It, { "Matrix, Matrix": function(p, f) {
    return n(i(p.toArray(), f.toArray()));
  }, "Matrix, Array": function(p, f) {
    return n(i(p.toArray(), f));
  }, "Array, Matrix": function(p, f) {
    return n(i(p, f.toArray()));
  }, "Array, Array": i });
  function i(v, p) {
    var f = Math.max(sr(v).length, sr(p).length);
    v = gt(v), p = gt(p);
    var l = sr(v), u = sr(p);
    if (l.length !== 1 || u.length !== 1 || l[0] !== 3 || u[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + l.join(", ") + "], B = [" + u.join(", ") + "])");
    var o = [a(t(v[1], p[2]), t(v[2], p[1])), a(t(v[2], p[0]), t(v[0], p[2])), a(t(v[0], p[1]), t(v[1], p[0]))];
    return f > 1 ? [o] : o;
  }
}), Rt = "diag", Ao = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], Fo = G(Rt, Ao, (r) => {
  var { typed: e, matrix: n, DenseMatrix: a, SparseMatrix: t } = r;
  return e(Rt, { Array: function(l) {
    return i(l, 0, sr(l), null);
  }, "Array, number": function(l, u) {
    return i(l, u, sr(l), null);
  }, "Array, BigNumber": function(l, u) {
    return i(l, u.toNumber(), sr(l), null);
  }, "Array, string": function(l, u) {
    return i(l, 0, sr(l), u);
  }, "Array, number, string": function(l, u, o) {
    return i(l, u, sr(l), o);
  }, "Array, BigNumber, string": function(l, u, o) {
    return i(l, u.toNumber(), sr(l), o);
  }, Matrix: function(l) {
    return i(l, 0, l.size(), l.storage());
  }, "Matrix, number": function(l, u) {
    return i(l, u, l.size(), l.storage());
  }, "Matrix, BigNumber": function(l, u) {
    return i(l, u.toNumber(), l.size(), l.storage());
  }, "Matrix, string": function(l, u) {
    return i(l, 0, l.size(), u);
  }, "Matrix, number, string": function(l, u, o) {
    return i(l, u, l.size(), o);
  }, "Matrix, BigNumber, string": function(l, u, o) {
    return i(l, u.toNumber(), l.size(), o);
  } });
  function i(f, l, u, o) {
    if (!hr(l)) throw new TypeError("Second parameter in function diag must be an integer");
    var D = l > 0 ? l : 0, c = l < 0 ? -l : 0;
    switch (u.length) {
      case 1:
        return v(f, l, o, u[0], c, D);
      case 2:
        return p(f, l, o, u, c, D);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function v(f, l, u, o, D, c) {
    var h = [o + D, o + c];
    if (u && u !== "sparse" && u !== "dense") throw new TypeError("Unknown matrix type ".concat(u, '"'));
    var s = u === "sparse" ? t.diagonal(h, f, l) : a.diagonal(h, f, l);
    return u !== null ? s : s.valueOf();
  }
  function p(f, l, u, o, D, c) {
    if (cr(f)) {
      var h = f.diagonal(l);
      return u !== null ? u !== h.storage() ? n(h, u) : h : h.valueOf();
    }
    for (var s = Math.min(o[0] - D, o[1] - c), g = [], m = 0; m < s; m++) g[m] = f[m + D][m + c];
    return u !== null ? n(g) : g;
  }
}), Ut = "flatten", Eo = ["typed"], wo = G(Ut, Eo, (r) => {
  var { typed: e } = r;
  return e(Ut, { Array: function(a) {
    return Pe(a);
  }, Matrix: function(a) {
    return a.create(Pe(a.toArray()), a.datatype());
  } });
}), Pt = "getMatrixDataType", Co = ["typed"], _o = G(Pt, Co, (r) => {
  var { typed: e } = r;
  return e(Pt, { Array: function(a) {
    return Me(a, zr);
  }, Matrix: function(a) {
    return a.getDataType();
  } });
}), Lt = "identity", bo = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], xo = G(Lt, bo, (r) => {
  var { typed: e, config: n, matrix: a, BigNumber: t, DenseMatrix: i, SparseMatrix: v } = r;
  return e(Lt, { "": function() {
    return n.matrix === "Matrix" ? a([]) : [];
  }, string: function(u) {
    return a(u);
  }, "number | BigNumber": function(u) {
    return f(u, u, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(u, o) {
    return f(u, u, o);
  }, "number | BigNumber, number | BigNumber": function(u, o) {
    return f(u, o, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(u, o, D) {
    return f(u, o, D);
  }, Array: function(u) {
    return p(u);
  }, "Array, string": function(u, o) {
    return p(u, o);
  }, Matrix: function(u) {
    return p(u.valueOf(), u.storage());
  }, "Matrix, string": function(u, o) {
    return p(u.valueOf(), o);
  } });
  function p(l, u) {
    switch (l.length) {
      case 0:
        return u ? a(u) : [];
      case 1:
        return f(l[0], l[0], u);
      case 2:
        return f(l[0], l[1], u);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function f(l, u, o) {
    var D = mr(l) || mr(u) ? t : null;
    if (mr(l) && (l = l.toNumber()), mr(u) && (u = u.toNumber()), !hr(l) || l < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!hr(u) || u < 1) throw new Error("Parameters in function identity must be positive integers");
    var c = D ? new t(1) : 1, h = D ? new D(0) : 0, s = [l, u];
    if (o) {
      if (o === "sparse") return v.diagonal(s, c, 0, h);
      if (o === "dense") return i.diagonal(s, c, 0, h);
      throw new TypeError('Unknown matrix type "'.concat(o, '"'));
    }
    for (var g = ge([], s, h), m = l < u ? l : u, w = 0; w < m; w++) g[w][w] = c;
    return g;
  }
}), Vt = "kron", Bo = ["typed", "matrix", "multiplyScalar"], So = G(Vt, Bo, (r) => {
  var { typed: e, matrix: n, multiplyScalar: a } = r;
  return e(Vt, { "Matrix, Matrix": function(v, p) {
    return n(t(v.toArray(), p.toArray()));
  }, "Matrix, Array": function(v, p) {
    return n(t(v.toArray(), p));
  }, "Array, Matrix": function(v, p) {
    return n(t(v, p.toArray()));
  }, "Array, Array": t });
  function t(i, v) {
    if (sr(i).length === 1 && (i = [i]), sr(v).length === 1 && (v = [v]), sr(i).length > 2 || sr(v).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(i.length) + ", y = " + JSON.stringify(v.length) + ")");
    var p = [], f = [];
    return i.map(function(l) {
      return v.map(function(u) {
        return f = [], p.push(f), l.map(function(o) {
          return u.map(function(D) {
            return f.push(a(o, D));
          });
        });
      });
    }) && p;
  }
});
function Hn() {
  throw new Error('No "bignumber" implementation available');
}
function Mo() {
  throw new Error('No "fraction" implementation available');
}
function kn() {
  throw new Error('No "matrix" implementation available');
}
var Zt = "range", No = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], zo = G(Zt, No, (r) => {
  var { typed: e, config: n, matrix: a, bignumber: t, smaller: i, smallerEq: v, larger: p, largerEq: f, add: l, isPositive: u } = r;
  return e(Zt, { string: D, "string, boolean": D, "number, number": function(g, m) {
    return o(c(g, m, 1, false));
  }, "number, number, number": function(g, m, w) {
    return o(c(g, m, w, false));
  }, "number, number, boolean": function(g, m, w) {
    return o(c(g, m, 1, w));
  }, "number, number, number, boolean": function(g, m, w, A) {
    return o(c(g, m, w, A));
  }, "BigNumber, BigNumber": function(g, m) {
    var w = g.constructor;
    return o(c(g, m, new w(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(g, m, w) {
    return o(c(g, m, w, false));
  }, "BigNumber, BigNumber, boolean": function(g, m, w) {
    var A = g.constructor;
    return o(c(g, m, new A(1), w));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(g, m, w, A) {
    return o(c(g, m, w, A));
  }, "Unit, Unit, Unit": function(g, m, w) {
    return o(c(g, m, w, false));
  }, "Unit, Unit, Unit, boolean": function(g, m, w, A) {
    return o(c(g, m, w, A));
  } });
  function o(s) {
    return n.matrix === "Matrix" ? a ? a(s) : kn() : s;
  }
  function D(s, g) {
    var m = h(s);
    if (!m) throw new SyntaxError('String "' + s + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && Hn(), o(c(t(m.start), t(m.end), t(m.step)))) : o(c(m.start, m.end, m.step, g));
  }
  function c(s, g, m, w) {
    for (var A = [], _ = u(m) ? w ? v : i : w ? f : p, F = s; _(F, g); ) A.push(F), F = l(F, m);
    return A;
  }
  function h(s) {
    var g = s.split(":"), m = g.map(function(A) {
      return Number(A);
    }), w = m.some(function(A) {
      return isNaN(A);
    });
    if (w) return null;
    switch (m.length) {
      case 2:
        return { start: m[0], end: m[1], step: 1 };
      case 3:
        return { start: m[0], end: m[2], step: m[1] };
      default:
        return null;
    }
  }
}), Jt = "reshape", To = ["typed", "isInteger", "matrix"], $o = G(Jt, To, (r) => {
  var { typed: e, isInteger: n } = r;
  return e(Jt, { "Matrix, Array": function(t, i) {
    return t.reshape(i, true);
  }, "Array, Array": function(t, i) {
    return i.forEach(function(v) {
      if (!n(v)) throw new TypeError("Invalid size for dimension: " + v);
    }), Ye(t, i);
  } });
}), Qt = "size", Oo = ["typed", "config", "?matrix"], qo = G(Qt, Oo, (r) => {
  var { typed: e, config: n, matrix: a } = r;
  return e(Qt, { Matrix: function(i) {
    return i.create(i.size(), "number");
  }, Array: sr, string: function(i) {
    return n.matrix === "Array" ? [i.length] : a([i.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(i) {
    return n.matrix === "Array" ? [] : a ? a([], "dense", "number") : kn();
  } });
}), Gt = "subset", Io = ["typed", "matrix", "zeros", "add"], Ro = G(Gt, Io, (r) => {
  var { typed: e, matrix: n, zeros: a, add: t } = r;
  return e(Gt, { "Matrix, Index": function(p, f) {
    return Hr(f) ? n() : (me(p, f), p.subset(f));
  }, "Array, Index": e.referTo("Matrix, Index", function(v) {
    return function(p, f) {
      var l = v(n(p), f);
      return f.isScalar() ? l : l.valueOf();
    };
  }), "Object, Index": Po, "string, Index": Uo, "Matrix, Index, any, any": function(p, f, l, u) {
    return Hr(f) ? p : (me(p, f), p.clone().subset(f, i(l, f), u));
  }, "Array, Index, any, any": e.referTo("Matrix, Index, any, any", function(v) {
    return function(p, f, l, u) {
      var o = v(n(p), f, l, u);
      return o.isMatrix ? o.valueOf() : o;
    };
  }), "Array, Index, any": e.referTo("Matrix, Index, any, any", function(v) {
    return function(p, f, l) {
      return v(n(p), f, l, void 0).valueOf();
    };
  }), "Matrix, Index, any": e.referTo("Matrix, Index, any, any", function(v) {
    return function(p, f, l) {
      return v(p, f, l, void 0);
    };
  }), "string, Index, string": Xt, "string, Index, string, string": Xt, "Object, Index, any": Lo });
  function i(v, p) {
    if (typeof v == "string") throw new Error("can't boradcast a string");
    if (p._isScalar) return v;
    var f = p.size();
    if (f.every((l) => l > 0)) try {
      return t(v, a(f));
    } catch {
      return v;
    }
    else return v;
  }
});
function Uo(r, e) {
  if (!xe(e)) throw new TypeError("Index expected");
  if (Hr(e)) return "";
  if (me(Array.from(r), e), e.size().length !== 1) throw new ar(e.size().length, 1);
  var n = r.length;
  Dr(e.min()[0], n), Dr(e.max()[0], n);
  var a = e.dimension(0), t = "";
  return a.forEach(function(i) {
    t += r.charAt(i);
  }), t;
}
function Xt(r, e, n, a) {
  if (!e || e.isIndex !== true) throw new TypeError("Index expected");
  if (Hr(e)) return r;
  if (me(Array.from(r), e), e.size().length !== 1) throw new ar(e.size().length, 1);
  if (a !== void 0) {
    if (typeof a != "string" || a.length !== 1) throw new TypeError("Single character expected as defaultValue");
  } else a = " ";
  var t = e.dimension(0), i = t.size()[0];
  if (i !== n.length) throw new ar(t.size()[0], n.length);
  var v = r.length;
  Dr(e.min()[0]), Dr(e.max()[0]);
  for (var p = [], f = 0; f < v; f++) p[f] = r.charAt(f);
  if (t.forEach(function(o, D) {
    p[o] = n.charAt(D[0]);
  }), p.length > v) for (var l = v - 1, u = p.length; l < u; l++) p[l] || (p[l] = a);
  return p.join("");
}
function Po(r, e) {
  if (!Hr(e)) {
    if (e.size().length !== 1) throw new ar(e.size(), 1);
    var n = e.dimension(0);
    if (typeof n != "string") throw new TypeError("String expected as index to retrieve an object property");
    return An(r, n);
  }
}
function Lo(r, e, n) {
  if (Hr(e)) return r;
  if (e.size().length !== 1) throw new ar(e.size(), 1);
  var a = e.dimension(0);
  if (typeof a != "string") throw new TypeError("String expected as index to retrieve an object property");
  var t = ir(r);
  return Fn(t, a, n), t;
}
var Yt = "transpose", Vo = ["typed", "matrix"], Zo = G(Yt, Vo, (r) => {
  var { typed: e, matrix: n } = r;
  return e(Yt, { Array: (v) => a(n(v)).valueOf(), Matrix: a, any: ir });
  function a(v) {
    var p = v.size(), f;
    switch (p.length) {
      case 1:
        f = v.clone();
        break;
      case 2:
        {
          var l = p[0], u = p[1];
          if (u === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + dr(p) + ")");
          switch (v.storage()) {
            case "dense":
              f = t(v, l, u);
              break;
            case "sparse":
              f = i(v, l, u);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + dr(p) + ")");
    }
    return f;
  }
  function t(v, p, f) {
    for (var l = v._data, u = [], o, D = 0; D < f; D++) {
      o = u[D] = [];
      for (var c = 0; c < p; c++) o[c] = ir(l[c][D]);
    }
    return v.createDenseMatrix({ data: u, size: [f, p], datatype: v._datatype });
  }
  function i(v, p, f) {
    for (var l = v._values, u = v._index, o = v._ptr, D = l ? [] : void 0, c = [], h = [], s = [], g = 0; g < p; g++) s[g] = 0;
    var m, w, A;
    for (m = 0, w = u.length; m < w; m++) s[u[m]]++;
    for (var _ = 0, F = 0; F < p; F++) h.push(_), _ += s[F], s[F] = h[F];
    for (h.push(_), A = 0; A < f; A++) for (var d = o[A], C = o[A + 1], E = d; E < C; E++) {
      var y = s[u[E]]++;
      c[y] = A, l && (D[y] = ir(l[E]));
    }
    return v.createSparseMatrix({ values: D, index: c, ptr: h, size: [f, p], datatype: v._datatype });
  }
}), Kt = "ctranspose", Jo = ["typed", "transpose", "conj"], Qo = G(Kt, Jo, (r) => {
  var { typed: e, transpose: n, conj: a } = r;
  return e(Kt, { any: function(i) {
    return a(n(i));
  } });
}), Wt = "zeros", Go = ["typed", "config", "matrix", "BigNumber"], Xo = G(Wt, Go, (r) => {
  var { typed: e, config: n, matrix: a, BigNumber: t } = r;
  return e(Wt, { "": function() {
    return n.matrix === "Array" ? i([]) : i([], "default");
  }, "...number | BigNumber | string": function(l) {
    var u = l[l.length - 1];
    if (typeof u == "string") {
      var o = l.pop();
      return i(l, o);
    } else return n.matrix === "Array" ? i(l) : i(l, "default");
  }, Array: i, Matrix: function(l) {
    var u = l.storage();
    return i(l.valueOf(), u);
  }, "Array | Matrix, string": function(l, u) {
    return i(l.valueOf(), u);
  } });
  function i(f, l) {
    var u = v(f), o = u ? new t(0) : 0;
    if (p(f), l) {
      var D = a(l);
      return f.length > 0 ? D.resize(f, o) : D;
    } else {
      var c = [];
      return f.length > 0 ? ge(c, f, o) : c;
    }
  }
  function v(f) {
    var l = false;
    return f.forEach(function(u, o, D) {
      mr(u) && (l = true, D[o] = u.toNumber());
    }), l;
  }
  function p(f) {
    f.forEach(function(l) {
      if (typeof l != "number" || !hr(l) || l < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), Yo = "numeric", Ko = ["number", "?bignumber", "?fraction"], Wo = G(Yo, Ko, (r) => {
  var { number: e, bignumber: n, fraction: a } = r, t = { string: true, number: true, BigNumber: true, Fraction: true }, i = { number: (v) => e(v), BigNumber: n ? (v) => n(v) : Hn, bigint: (v) => BigInt(v), Fraction: a ? (v) => a(v) : Mo };
  return function(p) {
    var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", l = arguments.length > 2 ? arguments[2] : void 0;
    if (l !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var u = zr(p);
    if (!(u in t)) throw new TypeError("Cannot convert " + p + ' of type "' + u + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(f in i)) throw new TypeError("Cannot convert " + p + ' to type "' + f + '"; valid output types are ' + Object.keys(i).join(", "));
    return f === u ? p : i[f](p);
  };
}), Ht = "divideScalar", Ho = ["typed", "numeric"], ko = G(Ht, Ho, (r) => {
  var { typed: e, numeric: n } = r;
  return e(Ht, { "number, number": function(t, i) {
    return t / i;
  }, "Complex, Complex": function(t, i) {
    return t.div(i);
  }, "BigNumber, BigNumber": function(t, i) {
    return t.div(i);
  }, "bigint, bigint": function(t, i) {
    return t / i;
  }, "Fraction, Fraction": function(t, i) {
    return t.div(i);
  }, "Unit, number | Complex | Fraction | BigNumber | Unit": (a, t) => a.divide(t), "number | Fraction | Complex | BigNumber, Unit": (a, t) => t.divideInto(a) });
}), kt = "pow", jo = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], rs = G(kt, jo, (r) => {
  var { typed: e, config: n, identity: a, multiply: t, matrix: i, inv: v, number: p, fraction: f, Complex: l } = r;
  return e(kt, { "number, number": u, "Complex, Complex": function(h, s) {
    return h.pow(s);
  }, "BigNumber, BigNumber": function(h, s) {
    return s.isInteger() || h >= 0 || n.predictable ? h.pow(s) : new l(h.toNumber(), 0).pow(s.toNumber(), 0);
  }, "bigint, bigint": (c, h) => c ** h, "Fraction, Fraction": function(h, s) {
    var g = h.pow(s);
    if (g != null) return g;
    if (n.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return u(h.valueOf(), s.valueOf());
  }, "Array, number": o, "Array, BigNumber": function(h, s) {
    return o(h, s.toNumber());
  }, "Matrix, number": D, "Matrix, BigNumber": function(h, s) {
    return D(h, s.toNumber());
  }, "Unit, number | BigNumber": function(h, s) {
    return h.pow(s);
  } });
  function u(c, h) {
    if (n.predictable && !hr(h) && c < 0) try {
      var s = f(h), g = p(s);
      if ((h === g || Math.abs((h - g) / h) < 1e-14) && s.d % 2 === 1) return (s.n % 2 === 0 ? 1 : -1) * Math.pow(-c, h);
    } catch {
    }
    return n.predictable && (c < -1 && h === 1 / 0 || c > -1 && c < 0 && h === -1 / 0) ? NaN : hr(h) || c >= 0 || n.predictable ? Gn(c, h) : c * c < 1 && h === 1 / 0 || c * c > 1 && h === -1 / 0 ? 0 : new l(c, 0).pow(h, 0);
  }
  function o(c, h) {
    if (!hr(h)) throw new TypeError("For A^b, b must be an integer (value is " + h + ")");
    var s = sr(c);
    if (s.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + s.length + " dimensions)");
    if (s[0] !== s[1]) throw new Error("For A^b, A must be square (size is " + s[0] + "x" + s[1] + ")");
    if (h < 0) try {
      return o(v(c), -h);
    } catch (w) {
      throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + h + ")") : w;
    }
    for (var g = a(s[0]).valueOf(), m = c; h >= 1; ) (h & 1) === 1 && (g = t(m, g)), h >>= 1, m = t(m, m);
    return g;
  }
  function D(c, h) {
    return i(o(c.valueOf(), h));
  }
});
function ze(r) {
  var { DenseMatrix: e } = r;
  return function(a, t, i) {
    var v = a.size();
    if (v.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + dr(v) + ")");
    var p = v[0], f = v[1];
    if (p !== f) throw new RangeError("Matrix must be square (size: " + dr(v) + ")");
    var l = [];
    if (cr(t)) {
      var u = t.size(), o = t._data;
      if (u.length === 1) {
        if (u[0] !== p) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var D = 0; D < p; D++) l[D] = [o[D]];
        return new e({ data: l, size: [p, 1], datatype: t._datatype });
      }
      if (u.length === 2) {
        if (u[0] !== p || u[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (wn(t)) {
          if (i) {
            l = [];
            for (var c = 0; c < p; c++) l[c] = [o[c][0]];
            return new e({ data: l, size: [p, 1], datatype: t._datatype });
          }
          return t;
        }
        if (Cn(t)) {
          for (var h = 0; h < p; h++) l[h] = [0];
          for (var s = t._values, g = t._index, m = t._ptr, w = m[1], A = m[0]; A < w; A++) {
            var _ = g[A];
            l[_][0] = s[A];
          }
          return new e({ data: l, size: [p, 1], datatype: t._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (lr(t)) {
      var F = sr(t);
      if (F.length === 1) {
        if (F[0] !== p) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var d = 0; d < p; d++) l[d] = [t[d]];
        return new e({ data: l, size: [p, 1] });
      }
      if (F.length === 2) {
        if (F[0] !== p || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var C = 0; C < p; C++) l[C] = [t[C][0]];
        return new e({ data: l, size: [p, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var jt = "lsolve", es = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], ts = G(jt, es, (r) => {
  var { typed: e, matrix: n, divideScalar: a, multiplyScalar: t, subtractScalar: i, equalScalar: v, DenseMatrix: p } = r, f = ze({ DenseMatrix: p });
  return e(jt, { "SparseMatrix, Array | Matrix": function(D, c) {
    return u(D, c);
  }, "DenseMatrix, Array | Matrix": function(D, c) {
    return l(D, c);
  }, "Array, Array | Matrix": function(D, c) {
    var h = n(D), s = l(h, c);
    return s.valueOf();
  } });
  function l(o, D) {
    D = f(o, D, true);
    for (var c = D._data, h = o._size[0], s = o._size[1], g = [], m = o._data, w = 0; w < s; w++) {
      var A = c[w][0] || 0, _ = void 0;
      if (v(A, 0)) _ = 0;
      else {
        var F = m[w][w];
        if (v(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        _ = a(A, F);
        for (var d = w + 1; d < h; d++) c[d] = [i(c[d][0] || 0, t(_, m[d][w]))];
      }
      g[w] = [_];
    }
    return new p({ data: g, size: [h, 1] });
  }
  function u(o, D) {
    D = f(o, D, true);
    for (var c = D._data, h = o._size[0], s = o._size[1], g = o._values, m = o._index, w = o._ptr, A = [], _ = 0; _ < s; _++) {
      var F = c[_][0] || 0;
      if (v(F, 0)) A[_] = [0];
      else {
        for (var d = 0, C = [], E = [], y = w[_], b = w[_ + 1], x = y; x < b; x++) {
          var B = m[x];
          B === _ ? d = g[x] : B > _ && (C.push(g[x]), E.push(B));
        }
        if (v(d, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var z = a(F, d), N = 0, T = E.length; N < T; N++) {
          var M = E[N];
          c[M] = [i(c[M][0] || 0, t(z, C[N]))];
        }
        A[_] = [z];
      }
    }
    return new p({ data: A, size: [h, 1] });
  }
}), rn = "usolve", ns = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], as = G(rn, ns, (r) => {
  var { typed: e, matrix: n, divideScalar: a, multiplyScalar: t, subtractScalar: i, equalScalar: v, DenseMatrix: p } = r, f = ze({ DenseMatrix: p });
  return e(rn, { "SparseMatrix, Array | Matrix": function(D, c) {
    return u(D, c);
  }, "DenseMatrix, Array | Matrix": function(D, c) {
    return l(D, c);
  }, "Array, Array | Matrix": function(D, c) {
    var h = n(D), s = l(h, c);
    return s.valueOf();
  } });
  function l(o, D) {
    D = f(o, D, true);
    for (var c = D._data, h = o._size[0], s = o._size[1], g = [], m = o._data, w = s - 1; w >= 0; w--) {
      var A = c[w][0] || 0, _ = void 0;
      if (v(A, 0)) _ = 0;
      else {
        var F = m[w][w];
        if (v(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        _ = a(A, F);
        for (var d = w - 1; d >= 0; d--) c[d] = [i(c[d][0] || 0, t(_, m[d][w]))];
      }
      g[w] = [_];
    }
    return new p({ data: g, size: [h, 1] });
  }
  function u(o, D) {
    D = f(o, D, true);
    for (var c = D._data, h = o._size[0], s = o._size[1], g = o._values, m = o._index, w = o._ptr, A = [], _ = s - 1; _ >= 0; _--) {
      var F = c[_][0] || 0;
      if (v(F, 0)) A[_] = [0];
      else {
        for (var d = 0, C = [], E = [], y = w[_], b = w[_ + 1], x = b - 1; x >= y; x--) {
          var B = m[x];
          B === _ ? d = g[x] : B < _ && (C.push(g[x]), E.push(B));
        }
        if (v(d, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var z = a(F, d), N = 0, T = E.length; N < T; N++) {
          var M = E[N];
          c[M] = [i(c[M][0], t(z, C[N]))];
        }
        A[_] = [z];
      }
    }
    return new p({ data: A, size: [h, 1] });
  }
}), en = "usolveAll", us = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], is = G(en, us, (r) => {
  var { typed: e, matrix: n, divideScalar: a, multiplyScalar: t, subtractScalar: i, equalScalar: v, DenseMatrix: p } = r, f = ze({ DenseMatrix: p });
  return e(en, { "SparseMatrix, Array | Matrix": function(D, c) {
    return u(D, c);
  }, "DenseMatrix, Array | Matrix": function(D, c) {
    return l(D, c);
  }, "Array, Array | Matrix": function(D, c) {
    var h = n(D), s = l(h, c);
    return s.map((g) => g.valueOf());
  } });
  function l(o, D) {
    for (var c = [f(o, D, true)._data.map((E) => E[0])], h = o._data, s = o._size[0], g = o._size[1], m = g - 1; m >= 0; m--) for (var w = c.length, A = 0; A < w; A++) {
      var _ = c[A];
      if (v(h[m][m], 0)) if (v(_[m], 0)) {
        if (A === 0) {
          var d = [..._];
          d[m] = 1;
          for (var C = m - 1; C >= 0; C--) d[C] = i(d[C], h[C][m]);
          c.push(d);
        }
      } else {
        if (A === 0) return [];
        c.splice(A, 1), A -= 1, w -= 1;
      }
      else {
        _[m] = a(_[m], h[m][m]);
        for (var F = m - 1; F >= 0; F--) _[F] = i(_[F], t(_[m], h[F][m]));
      }
    }
    return c.map((E) => new p({ data: E.map((y) => [y]), size: [s, 1] }));
  }
  function u(o, D) {
    for (var c = [f(o, D, true)._data.map((Z) => Z[0])], h = o._size[0], s = o._size[1], g = o._values, m = o._index, w = o._ptr, A = s - 1; A >= 0; A--) for (var _ = c.length, F = 0; F < _; F++) {
      for (var d = c[F], C = [], E = [], y = w[A], b = w[A + 1], x = 0, B = b - 1; B >= y; B--) {
        var z = m[B];
        z === A ? x = g[B] : z < A && (C.push(g[B]), E.push(z));
      }
      if (v(x, 0)) if (v(d[A], 0)) {
        if (F === 0) {
          var P = [...d];
          P[A] = 1;
          for (var $ = 0, S = E.length; $ < S; $++) {
            var I = E[$];
            P[I] = i(P[I], C[$]);
          }
          c.push(P);
        }
      } else {
        if (F === 0) return [];
        c.splice(F, 1), F -= 1, _ -= 1;
      }
      else {
        d[A] = a(d[A], x);
        for (var N = 0, T = E.length; N < T; N++) {
          var M = E[N];
          d[M] = i(d[M], t(d[A], C[N]));
        }
      }
    }
    return c.map((Z) => new p({ data: Z.map((O) => [O]), size: [h, 1] }));
  }
}), Fe = "equal", os = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], ss = G(Fe, os, (r) => {
  var { typed: e, matrix: n, equalScalar: a, DenseMatrix: t, concat: i } = r, v = re({ typed: e }), p = ae({ typed: e, DenseMatrix: t }), f = jr({ typed: e, DenseMatrix: t }), l = Qr({ typed: e, matrix: n, concat: i });
  return e(Fe, fs({ typed: e, equalScalar: a }), l({ elop: a, SS: p, DS: v, Ss: f }));
}), fs = G(Fe, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(Fe, { "any, any": function(t, i) {
    return t === null ? i === null : i === null ? t === null : t === void 0 ? i === void 0 : i === void 0 ? t === void 0 : n(t, i);
  } });
}), Ee = "smaller", vs = ["typed", "config", "matrix", "DenseMatrix", "concat"], ls = G(Ee, vs, (r) => {
  var { typed: e, config: n, matrix: a, DenseMatrix: t, concat: i } = r, v = re({ typed: e }), p = ae({ typed: e, DenseMatrix: t }), f = jr({ typed: e, DenseMatrix: t }), l = Qr({ typed: e, matrix: a, concat: i }), u = ne({ typed: e });
  return e(Ee, cs({ typed: e, config: n }), { "boolean, boolean": (o, D) => o < D, "BigNumber, BigNumber": function(D, c) {
    return D.lt(c) && !kr(D, c, n.relTol, n.absTol);
  }, "bigint, bigint": (o, D) => o < D, "Fraction, Fraction": (o, D) => o.compare(D) === -1, "Complex, Complex": function(D, c) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, u, l({ SS: p, DS: v, Ss: f }));
}), cs = G(Ee, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Ee, { "number, number": function(t, i) {
    return t < i && !Ir(t, i, n.relTol, n.absTol);
  } });
}), we = "smallerEq", Ds = ["typed", "config", "matrix", "DenseMatrix", "concat"], ps = G(we, Ds, (r) => {
  var { typed: e, config: n, matrix: a, DenseMatrix: t, concat: i } = r, v = re({ typed: e }), p = ae({ typed: e, DenseMatrix: t }), f = jr({ typed: e, DenseMatrix: t }), l = Qr({ typed: e, matrix: a, concat: i }), u = ne({ typed: e });
  return e(we, hs({ typed: e, config: n }), { "boolean, boolean": (o, D) => o <= D, "BigNumber, BigNumber": function(D, c) {
    return D.lte(c) || kr(D, c, n.relTol, n.absTol);
  }, "bigint, bigint": (o, D) => o <= D, "Fraction, Fraction": (o, D) => o.compare(D) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, u, l({ SS: p, DS: v, Ss: f }));
}), hs = G(we, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(we, { "number, number": function(t, i) {
    return t <= i || Ir(t, i, n.relTol, n.absTol);
  } });
}), Ce = "larger", ds = ["typed", "config", "matrix", "DenseMatrix", "concat"], ms = G(Ce, ds, (r) => {
  var { typed: e, config: n, matrix: a, DenseMatrix: t, concat: i } = r, v = re({ typed: e }), p = ae({ typed: e, DenseMatrix: t }), f = jr({ typed: e, DenseMatrix: t }), l = Qr({ typed: e, matrix: a, concat: i }), u = ne({ typed: e });
  return e(Ce, gs({ typed: e, config: n }), { "boolean, boolean": (o, D) => o > D, "BigNumber, BigNumber": function(D, c) {
    return D.gt(c) && !kr(D, c, n.relTol, n.absTol);
  }, "bigint, bigint": (o, D) => o > D, "Fraction, Fraction": (o, D) => o.compare(D) === 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, u, l({ SS: p, DS: v, Ss: f }));
}), gs = G(Ce, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Ce, { "number, number": function(t, i) {
    return t > i && !Ir(t, i, n.relTol, n.absTol);
  } });
}), _e = "largerEq", ys = ["typed", "config", "matrix", "DenseMatrix", "concat"], As = G(_e, ys, (r) => {
  var { typed: e, config: n, matrix: a, DenseMatrix: t, concat: i } = r, v = re({ typed: e }), p = ae({ typed: e, DenseMatrix: t }), f = jr({ typed: e, DenseMatrix: t }), l = Qr({ typed: e, matrix: a, concat: i }), u = ne({ typed: e });
  return e(_e, Fs({ typed: e, config: n }), { "boolean, boolean": (o, D) => o >= D, "BigNumber, BigNumber": function(D, c) {
    return D.gte(c) || kr(D, c, n.relTol, n.absTol);
  }, "bigint, bigint": function(D, c) {
    return D >= c;
  }, "Fraction, Fraction": (o, D) => o.compare(D) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, u, l({ SS: p, DS: v, Ss: f }));
}), Fs = G(_e, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(_e, { "number, number": function(t, i) {
    return t >= i || Ir(t, i, n.relTol, n.absTol);
  } });
}), Es = "ImmutableDenseMatrix", ws = ["smaller", "DenseMatrix"], Cs = G(Es, ws, (r) => {
  var { smaller: e, DenseMatrix: n } = r;
  function a(t, i) {
    if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
    if (i && !Nr(i)) throw new Error("Invalid datatype: " + i);
    if (cr(t) || lr(t)) {
      var v = new n(t, i);
      this._data = v._data, this._size = v._size, this._datatype = v._datatype, this._min = null, this._max = null;
    } else if (t && lr(t.data) && lr(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t) throw new TypeError("Unsupported type of data (" + zr(t) + ")");
      this._data = [], this._size = [0], this._datatype = i, this._min = null, this._max = null;
    }
  }
  return a.prototype = new n(), a.prototype.type = "ImmutableDenseMatrix", a.prototype.isImmutableDenseMatrix = true, a.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var i = n.prototype.subset.call(this, t);
        return cr(i) ? new a({ data: i._data, size: i._size, datatype: i._datatype }) : i;
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
    return new a({ data: ir(this._data), size: ir(this._size), datatype: this._datatype });
  }, a.prototype.toJSON = function() {
    return { mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, a.fromJSON = function(t) {
    return new a(t);
  }, a.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, a.prototype.min = function() {
    if (this._min === null) {
      var t = null;
      this.forEach(function(i) {
        (t === null || e(i, t)) && (t = i);
      }), this._min = t !== null ? t : void 0;
    }
    return this._min;
  }, a.prototype.max = function() {
    if (this._max === null) {
      var t = null;
      this.forEach(function(i) {
        (t === null || e(t, i)) && (t = i);
      }), this._max = t !== null ? t : void 0;
    }
    return this._max;
  }, a;
}, { isClass: true }), _s = "Index", bs = ["ImmutableDenseMatrix", "getMatrixDataType"], xs = G(_s, bs, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
  function a(i) {
    if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var v = 0, p = arguments.length; v < p; v++) {
      var f = arguments[v], l = lr(f), u = cr(f), o = null;
      if (_n(f)) this._dimensions.push(f), this._isScalar = false;
      else if (l || u) {
        var D = void 0;
        n(f) === "boolean" ? (l && (D = t(tn(f).valueOf())), u && (D = t(tn(f._data).valueOf())), o = f.valueOf().length) : D = t(f.valueOf()), this._dimensions.push(D);
        var c = D.size();
        (c.length !== 1 || c[0] !== 1 || o !== null) && (this._isScalar = false);
      } else if (typeof f == "number") this._dimensions.push(t([f]));
      else if (typeof f == "string") this._dimensions.push(f);
      else throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      this._sourceSize.push(o);
    }
  }
  a.prototype.type = "Index", a.prototype.isIndex = true;
  function t(i) {
    for (var v = 0, p = i.length; v < p; v++) if (typeof i[v] != "number" || !hr(i[v])) throw new TypeError("Index parameters must be positive integer numbers");
    return new e(i);
  }
  return a.prototype.clone = function() {
    var i = new a();
    return i._dimensions = ir(this._dimensions), i._isScalar = this._isScalar, i._sourceSize = this._sourceSize, i;
  }, a.create = function(i) {
    var v = new a();
    return a.apply(v, i), v;
  }, a.prototype.size = function() {
    for (var i = [], v = 0, p = this._dimensions.length; v < p; v++) {
      var f = this._dimensions[v];
      i[v] = typeof f == "string" ? 1 : f.size()[0];
    }
    return i;
  }, a.prototype.max = function() {
    for (var i = [], v = 0, p = this._dimensions.length; v < p; v++) {
      var f = this._dimensions[v];
      i[v] = typeof f == "string" ? f : f.max();
    }
    return i;
  }, a.prototype.min = function() {
    for (var i = [], v = 0, p = this._dimensions.length; v < p; v++) {
      var f = this._dimensions[v];
      i[v] = typeof f == "string" ? f : f.min();
    }
    return i;
  }, a.prototype.forEach = function(i) {
    for (var v = 0, p = this._dimensions.length; v < p; v++) i(this._dimensions[v], v, this);
  }, a.prototype.dimension = function(i) {
    return this._dimensions[i] || null;
  }, a.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, a.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, a.prototype.isScalar = function() {
    return this._isScalar;
  }, a.prototype.toArray = function() {
    for (var i = [], v = 0, p = this._dimensions.length; v < p; v++) {
      var f = this._dimensions[v];
      i.push(typeof f == "string" ? f : f.toArray());
    }
    return i;
  }, a.prototype.valueOf = a.prototype.toArray, a.prototype.toString = function() {
    for (var i = [], v = 0, p = this._dimensions.length; v < p; v++) {
      var f = this._dimensions[v];
      typeof f == "string" ? i.push(JSON.stringify(f)) : i.push(f.toString());
    }
    return "[" + i.join(", ") + "]";
  }, a.prototype.toJSON = function() {
    return { mathjs: "Index", dimensions: this._dimensions };
  }, a.fromJSON = function(i) {
    return a.create(i.dimensions);
  }, a;
}, { isClass: true });
function tn(r) {
  var e = [];
  return r.forEach((n, a) => {
    n && e.push(a);
  }), e;
}
var Bs = "FibonacciHeap", Ss = ["smaller", "larger"], Ms = G(Bs, Ss, (r) => {
  var { smaller: e, larger: n } = r, a = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function t() {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  t.prototype.type = "FibonacciHeap", t.prototype.isFibonacciHeap = true, t.prototype.insert = function(u, o) {
    var D = { key: u, value: o, degree: 0 };
    if (this._minimum) {
      var c = this._minimum;
      D.left = c, D.right = c.right, c.right = D, D.right.left = D, e(u, c.key) && (this._minimum = D);
    } else D.left = D, D.right = D, this._minimum = D;
    return this._size++, D;
  }, t.prototype.size = function() {
    return this._size;
  }, t.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, t.prototype.isEmpty = function() {
    return this._size === 0;
  }, t.prototype.extractMinimum = function() {
    var u = this._minimum;
    if (u === null) return u;
    for (var o = this._minimum, D = u.degree, c = u.child; D > 0; ) {
      var h = c.right;
      c.left.right = c.right, c.right.left = c.left, c.left = o, c.right = o.right, o.right = c, c.right.left = c, c.parent = null, c = h, D--;
    }
    return u.left.right = u.right, u.right.left = u.left, u === u.right ? o = null : (o = u.right, o = l(o, this._size)), this._size--, this._minimum = o, u;
  }, t.prototype.remove = function(u) {
    this._minimum = i(this._minimum, u, -1), this.extractMinimum();
  };
  function i(u, o, D) {
    o.key = D;
    var c = o.parent;
    return c && e(o.key, c.key) && (v(u, o, c), p(u, c)), e(o.key, u.key) && (u = o), u;
  }
  function v(u, o, D) {
    o.left.right = o.right, o.right.left = o.left, D.degree--, D.child === o && (D.child = o.right), D.degree === 0 && (D.child = null), o.left = u, o.right = u.right, u.right = o, o.right.left = o, o.parent = null, o.mark = false;
  }
  function p(u, o) {
    var D = o.parent;
    D && (o.mark ? (v(u, o, D), p(D)) : o.mark = true);
  }
  var f = function(o, D) {
    o.left.right = o.right, o.right.left = o.left, o.parent = D, D.child ? (o.left = D.child, o.right = D.child.right, D.child.right = o, o.right.left = o) : (D.child = o, o.right = o, o.left = o), D.degree++, o.mark = false;
  };
  function l(u, o) {
    var D = Math.floor(Math.log(o) * a) + 1, c = new Array(D), h = 0, s = u;
    if (s) for (h++, s = s.right; s !== u; ) h++, s = s.right;
    for (var g; h > 0; ) {
      for (var m = s.degree, w = s.right; g = c[m], !!g; ) {
        if (n(s.key, g.key)) {
          var A = g;
          g = s, s = A;
        }
        f(g, s), c[m] = null, m++;
      }
      c[m] = s, s = w, h--;
    }
    u = null;
    for (var _ = 0; _ < D; _++) g = c[_], g && (u ? (g.left.right = g.right, g.right.left = g.left, g.left = u, g.right = u.right, u.right = g, g.right.left = g, e(g.key, u.key) && (u = g)) : u = g);
    return u;
  }
  return t;
}, { isClass: true }), Ns = "Spa", zs = ["addScalar", "equalScalar", "FibonacciHeap"], Ts = G(Ns, zs, (r) => {
  var { addScalar: e, equalScalar: n, FibonacciHeap: a } = r;
  function t() {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new a();
  }
  return t.prototype.type = "Spa", t.prototype.isSpa = true, t.prototype.set = function(i, v) {
    if (this._values[i]) this._values[i].value = v;
    else {
      var p = this._heap.insert(i, v);
      this._values[i] = p;
    }
  }, t.prototype.get = function(i) {
    var v = this._values[i];
    return v ? v.value : 0;
  }, t.prototype.accumulate = function(i, v) {
    var p = this._values[i];
    p ? p.value = e(p.value, v) : (p = this._heap.insert(i, v), this._values[i] = p);
  }, t.prototype.forEach = function(i, v, p) {
    var f = this._heap, l = this._values, u = [], o = f.extractMinimum();
    for (o && u.push(o); o && o.key <= v; ) o.key >= i && (n(o.value, 0) || p(o.key, o.value, this)), o = f.extractMinimum(), o && u.push(o);
    for (var D = 0; D < u.length; D++) {
      var c = u[D];
      o = f.insert(c.key, c.value), l[o.key] = o;
    }
  }, t.prototype.swap = function(i, v) {
    var p = this._values[i], f = this._values[v];
    if (!p && f) p = this._heap.insert(i, f.value), this._heap.remove(f), this._values[i] = p, this._values[v] = void 0;
    else if (p && !f) f = this._heap.insert(v, p.value), this._heap.remove(p), this._values[v] = f, this._values[i] = void 0;
    else if (p && f) {
      var l = p.value;
      p.value = f.value, f.value = l;
    }
  }, t;
}, { isClass: true }), nn = "sparse", $s = ["typed", "SparseMatrix"], Os = G(nn, $s, (r) => {
  var { typed: e, SparseMatrix: n } = r;
  return e(nn, { "": function() {
    return new n([]);
  }, string: function(t) {
    return new n([], t);
  }, "Array | Matrix": function(t) {
    return new n(t);
  }, "Array | Matrix, string": function(t, i) {
    return new n(t, i);
  } });
}), qs = "atan", Is = ["typed"], Rs = G(qs, Is, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(a) {
    return Math.atan(a);
  }, Complex: function(a) {
    return a.atan();
  }, BigNumber: function(a) {
    return a.atan();
  } });
}), jn = G("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((n) => (a) => {
    if (!a.hasBase(a.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(n, a.valueType())(a.value);
  }) };
}), an = "cos", Us = ["typed"], Ps = G(an, Us, (r) => {
  var { typed: e } = r, n = jn({ typed: e });
  return e(an, { number: Math.cos, "Complex | BigNumber": (a) => a.cos() }, n);
}), un = "sin", Ls = ["typed"], Vs = G(un, Ls, (r) => {
  var { typed: e } = r, n = jn({ typed: e });
  return e(un, { number: Math.sin, "Complex | BigNumber": (a) => a.sin() }, n);
}), on = "add", Zs = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], Js = G(on, Zs, (r) => {
  var { typed: e, matrix: n, addScalar: a, equalScalar: t, DenseMatrix: i, SparseMatrix: v, concat: p } = r, f = Kn({ typed: e }), l = Ji({ typed: e, equalScalar: t }), u = Wn({ typed: e, DenseMatrix: i }), o = Qr({ typed: e, matrix: n, concat: p });
  return e(on, { "any, any": a, "any, any, ...any": e.referToSelf((D) => (c, h, s) => {
    for (var g = D(c, h), m = 0; m < s.length; m++) g = D(g, s[m]);
    return g;
  }) }, o({ elop: a, DS: f, SS: l, Ss: u }));
}), sn = "norm", Qs = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], Gs = G(sn, Qs, (r) => {
  var { typed: e, abs: n, add: a, pow: t, conj: i, sqrt: v, multiply: p, equalScalar: f, larger: l, smaller: u, matrix: o, ctranspose: D, eigs: c } = r;
  return e(sn, { number: Math.abs, Complex: function(E) {
    return E.abs();
  }, BigNumber: function(E) {
    return E.abs();
  }, boolean: function(E) {
    return Math.abs(E);
  }, Array: function(E) {
    return d(o(E), 2);
  }, Matrix: function(E) {
    return d(E, 2);
  }, "Array, number | BigNumber | string": function(E, y) {
    return d(o(E), y);
  }, "Matrix, number | BigNumber | string": function(E, y) {
    return d(E, y);
  } });
  function h(C) {
    var E = 0;
    return C.forEach(function(y) {
      var b = n(y);
      l(b, E) && (E = b);
    }, true), E;
  }
  function s(C) {
    var E;
    return C.forEach(function(y) {
      var b = n(y);
      (!E || u(b, E)) && (E = b);
    }, true), E || 0;
  }
  function g(C, E) {
    if (E === Number.POSITIVE_INFINITY || E === "inf") return h(C);
    if (E === Number.NEGATIVE_INFINITY || E === "-inf") return s(C);
    if (E === "fro") return d(C, 2);
    if (typeof E == "number" && !isNaN(E)) {
      if (!f(E, 0)) {
        var y = 0;
        return C.forEach(function(b) {
          y = a(t(n(b), E), y);
        }, true), t(y, 1 / E);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function m(C) {
    var E = 0;
    return C.forEach(function(y, b) {
      E = a(E, p(y, i(y)));
    }), n(v(E));
  }
  function w(C) {
    var E = [], y = 0;
    return C.forEach(function(b, x) {
      var B = x[1], z = a(E[B] || 0, n(b));
      l(z, y) && (y = z), E[B] = z;
    }, true), y;
  }
  function A(C) {
    var E = C.size();
    if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
    var y = D(C), b = p(y, C), x = c(b).values.toArray(), B = x[x.length - 1];
    return n(v(B));
  }
  function _(C) {
    var E = [], y = 0;
    return C.forEach(function(b, x) {
      var B = x[0], z = a(E[B] || 0, n(b));
      l(z, y) && (y = z), E[B] = z;
    }, true), y;
  }
  function F(C, E) {
    if (E === 1) return w(C);
    if (E === Number.POSITIVE_INFINITY || E === "inf") return _(C);
    if (E === "fro") return m(C);
    if (E === 2) return A(C);
    throw new Error("Unsupported parameter value " + E);
  }
  function d(C, E) {
    var y = C.size();
    if (y.length === 1) return g(C, E);
    if (y.length === 2) {
      if (y[0] && y[1]) return F(C, E);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), fn = "dot", Xs = ["typed", "addScalar", "multiplyScalar", "conj", "size"], Ys = G(fn, Xs, (r) => {
  var { typed: e, addScalar: n, multiplyScalar: a, conj: t, size: i } = r;
  return e(fn, { "Array | DenseMatrix, Array | DenseMatrix": p, "SparseMatrix, SparseMatrix": f });
  function v(u, o) {
    var D = l(u), c = l(o), h, s;
    if (D.length === 1) h = D[0];
    else if (D.length === 2 && D[1] === 1) h = D[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + D.join(", ") + ")");
    if (c.length === 1) s = c[0];
    else if (c.length === 2 && c[1] === 1) s = c[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + c.join(", ") + ")");
    if (h !== s) throw new RangeError("Vectors must have equal length (" + h + " != " + s + ")");
    if (h === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return h;
  }
  function p(u, o) {
    var D = v(u, o), c = cr(u) ? u._data : u, h = cr(u) ? u._datatype || u.getDataType() : void 0, s = cr(o) ? o._data : o, g = cr(o) ? o._datatype || o.getDataType() : void 0, m = l(u).length === 2, w = l(o).length === 2, A = n, _ = a;
    if (h && g && h === g && typeof h == "string" && h !== "mixed") {
      var F = h;
      A = e.find(n, [F, F]), _ = e.find(a, [F, F]);
    }
    if (!m && !w) {
      for (var d = _(t(c[0]), s[0]), C = 1; C < D; C++) d = A(d, _(t(c[C]), s[C]));
      return d;
    }
    if (!m && w) {
      for (var E = _(t(c[0]), s[0][0]), y = 1; y < D; y++) E = A(E, _(t(c[y]), s[y][0]));
      return E;
    }
    if (m && !w) {
      for (var b = _(t(c[0][0]), s[0]), x = 1; x < D; x++) b = A(b, _(t(c[x][0]), s[x]));
      return b;
    }
    if (m && w) {
      for (var B = _(t(c[0][0]), s[0][0]), z = 1; z < D; z++) B = A(B, _(t(c[z][0]), s[z][0]));
      return B;
    }
  }
  function f(u, o) {
    v(u, o);
    for (var D = u._index, c = u._values, h = o._index, s = o._values, g = 0, m = n, w = a, A = 0, _ = 0; A < D.length && _ < h.length; ) {
      var F = D[A], d = h[_];
      if (F < d) {
        A++;
        continue;
      }
      if (F > d) {
        _++;
        continue;
      }
      F === d && (g = m(g, w(c[A], s[_])), A++, _++);
    }
    return g;
  }
  function l(u) {
    return cr(u) ? u.size() : i(u);
  }
}), vn = "index", Ks = ["typed", "Index"], Ws = G(vn, Ks, (r) => {
  var { typed: e, Index: n } = r;
  return e(vn, { "...number | string | BigNumber | Range | Array | Matrix": function(t) {
    var i = t.map(function(p) {
      return mr(p) ? p.toNumber() : lr(p) || cr(p) ? p.map(function(f) {
        return mr(f) ? f.toNumber() : f;
      }) : p;
    }), v = new n();
    return n.apply(v, i), v;
  } });
}), ln = "lup", Hs = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], ks = G(ln, Hs, (r) => {
  var { typed: e, matrix: n, abs: a, addScalar: t, divideScalar: i, multiplyScalar: v, subtractScalar: p, larger: f, equalScalar: l, unaryMinus: u, DenseMatrix: o, SparseMatrix: D, Spa: c } = r;
  return e(ln, { DenseMatrix: function(m) {
    return h(m);
  }, SparseMatrix: function(m) {
    return s(m);
  }, Array: function(m) {
    var w = n(m), A = h(w);
    return { L: A.L.valueOf(), U: A.U.valueOf(), p: A.p };
  } });
  function h(g) {
    var m = g._size[0], w = g._size[1], A = Math.min(m, w), _ = ir(g._data), F = [], d = [m, A], C = [], E = [A, w], y, b, x, B = [];
    for (y = 0; y < m; y++) B[y] = y;
    for (b = 0; b < w; b++) {
      if (b > 0) for (y = 0; y < m; y++) {
        var z = Math.min(y, b), N = 0;
        for (x = 0; x < z; x++) N = t(N, v(_[y][x], _[x][b]));
        _[y][b] = p(_[y][b], N);
      }
      var T = b, M = 0, P = 0;
      for (y = b; y < m; y++) {
        var $ = _[y][b], S = a($);
        f(S, M) && (T = y, M = S, P = $);
      }
      if (b !== T && (B[b] = [B[T], B[T] = B[b]][0], o._swapRows(b, T, _)), b < m) for (y = b + 1; y < m; y++) {
        var I = _[y][b];
        l(I, 0) || (_[y][b] = i(_[y][b], P));
      }
    }
    for (b = 0; b < w; b++) for (y = 0; y < m; y++) {
      if (b === 0 && (y < w && (C[y] = []), F[y] = []), y < b) {
        y < w && (C[y][b] = _[y][b]), b < m && (F[y][b] = 0);
        continue;
      }
      if (y === b) {
        y < w && (C[y][b] = _[y][b]), b < m && (F[y][b] = 1);
        continue;
      }
      y < w && (C[y][b] = 0), b < m && (F[y][b] = _[y][b]);
    }
    var Z = new o({ data: F, size: d }), O = new o({ data: C, size: E }), q = [];
    for (y = 0, A = B.length; y < A; y++) q[B[y]] = y;
    return { L: Z, U: O, p: q, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
  function s(g) {
    var m = g._size[0], w = g._size[1], A = Math.min(m, w), _ = g._values, F = g._index, d = g._ptr, C = [], E = [], y = [], b = [m, A], x = [], B = [], z = [], N = [A, w], T, M, P, $ = [], S = [];
    for (T = 0; T < m; T++) $[T] = T, S[T] = T;
    var I = function(q, U) {
      var Y = S[q], J = S[U];
      $[Y] = U, $[J] = q, S[q] = J, S[U] = Y;
    }, Z = function() {
      var q = new c();
      M < m && (y.push(C.length), C.push(1), E.push(M)), z.push(x.length);
      var U = d[M], Y = d[M + 1];
      for (P = U; P < Y; P++) T = F[P], q.set($[T], _[P]);
      M > 0 && q.forEach(0, M - 1, function(Q, L) {
        D._forEachRow(Q, C, E, y, function(K, X) {
          K > Q && q.accumulate(K, u(v(X, L)));
        });
      });
      var J = M, R = q.get(M), V = a(R);
      q.forEach(M + 1, m - 1, function(Q, L) {
        var K = a(L);
        f(K, V) && (J = Q, V = K, R = L);
      }), M !== J && (D._swapRows(M, J, b[1], C, E, y), D._swapRows(M, J, N[1], x, B, z), q.swap(M, J), I(M, J)), q.forEach(0, m - 1, function(Q, L) {
        Q <= M ? (x.push(L), B.push(Q)) : (L = i(L, R), l(L, 0) || (C.push(L), E.push(Q)));
      });
    };
    for (M = 0; M < w; M++) Z();
    return z.push(x.length), y.push(C.length), { L: new D({ values: C, index: E, ptr: y, size: b }), U: new D({ values: x, index: B, ptr: z, size: N }), p: $, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
}), cn = "qr", js = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], rf = G(cn, js, (r) => {
  var { typed: e, matrix: n, zeros: a, identity: t, isZero: i, equal: v, sign: p, sqrt: f, conj: l, unaryMinus: u, addScalar: o, divideScalar: D, multiplyScalar: c, subtractScalar: h, complex: s } = r;
  return be(e(cn, { DenseMatrix: function(_) {
    return m(_);
  }, SparseMatrix: function(_) {
    return w();
  }, Array: function(_) {
    var F = n(_), d = m(F);
    return { Q: d.Q.valueOf(), R: d.R.valueOf() };
  } }), { _denseQRimpl: g });
  function g(A) {
    var _ = A._size[0], F = A._size[1], d = t([_], "dense"), C = d._data, E = A.clone(), y = E._data, b, x, B, z = a([_], "");
    for (B = 0; B < Math.min(F, _); ++B) {
      var N = y[B][B], T = u(v(N, 0) ? 1 : p(N)), M = l(T), P = 0;
      for (b = B; b < _; b++) P = o(P, c(y[b][B], l(y[b][B])));
      var $ = c(T, f(P));
      if (!i($)) {
        var S = h(N, $);
        for (z[B] = 1, b = B + 1; b < _; b++) z[b] = D(y[b][B], S);
        var I = u(l(D(S, $))), Z = void 0;
        for (x = B; x < F; x++) {
          for (Z = 0, b = B; b < _; b++) Z = o(Z, c(l(z[b]), y[b][x]));
          for (Z = c(Z, I), b = B; b < _; b++) y[b][x] = c(h(y[b][x], c(z[b], Z)), M);
        }
        for (b = 0; b < _; b++) {
          for (Z = 0, x = B; x < _; x++) Z = o(Z, c(C[b][x], z[x]));
          for (Z = c(Z, I), x = B; x < _; ++x) C[b][x] = D(h(C[b][x], c(Z, l(z[x]))), M);
        }
      }
    }
    return { Q: d, R: E, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function m(A) {
    var _ = g(A), F = _.R._data;
    if (A._data.length > 0) for (var d = F[0][0].type === "Complex" ? s(0) : 0, C = 0; C < F.length; ++C) for (var E = 0; E < C && E < (F[0] || []).length; ++E) F[C][E] = d;
    return _;
  }
  function w(A) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function ef(r, e, n, a) {
  r._values;
  for (var t = r._index, i = r._ptr, v = r._size, p = r._datatype, f = v[0], l = v[1], u = null, o = [], D = [], c = 0, h = 0; h < l; h++) {
    D[h] = c;
    for (var s = n ? n[h] : h, g = i[s], m = i[s + 1], w = g; w < m; w++) {
      var A = t[w];
      o[c] = A, c++;
    }
  }
  return D[l] = c, r.createSparseMatrix({ values: u, index: o, ptr: D, size: [f, l], datatype: p });
}
function ra(r, e, n, a, t, i, v) {
  var p = 0;
  for (n[v] = r; p >= 0; ) {
    var f = n[v + p], l = n[a + f];
    l === -1 ? (p--, i[e++] = f) : (n[a + f] = n[t + l], ++p, n[v + p] = l);
  }
  return e;
}
function tf(r, e) {
  if (!r) return null;
  var n = 0, a, t = [], i = [], v = 0, p = e, f = 2 * e;
  for (a = 0; a < e; a++) i[v + a] = -1;
  for (a = e - 1; a >= 0; a--) r[a] !== -1 && (i[p + a] = i[v + r[a]], i[v + r[a]] = a);
  for (a = 0; a < e; a++) r[a] === -1 && (n = ra(a, n, i, v, p, t, f));
  return t;
}
function nf(r, e) {
  if (!r) return null;
  var n = r._index, a = r._ptr, t = r._size, i = t[0], v = t[1], p = [], f = [], l = 0, u = v, o, D;
  for (o = 0; o < i; o++) f[u + o] = -1;
  for (var c = 0; c < v; c++) {
    p[c] = -1, f[l + c] = -1;
    for (var h = a[c], s = a[c + 1], g = h; g < s; g++) {
      var m = n[g];
      for (o = f[u + m]; o !== -1 && o < c; o = D) D = f[l + o], f[l + o] = c, D === -1 && (p[o] = c);
      f[u + m] = c;
    }
  }
  return p;
}
function af(r, e, n) {
  for (var a = r._values, t = r._index, i = r._ptr, v = r._size, p = v[1], f = 0, l = 0; l < p; l++) {
    var u = i[l];
    for (i[l] = f; u < i[l + 1]; u++) e(t[u], l, a ? a[u] : 1, n) && (t[f] = t[u], a && (a[f] = a[u]), f++);
  }
  return i[p] = f, t.splice(f, t.length - f), a && a.splice(f, a.length - f), f;
}
function Pr(r) {
  return -r - 2;
}
var uf = "csAmd", of = ["add", "multiply", "transpose"], sf = G(uf, of, (r) => {
  var { add: e, multiply: n, transpose: a } = r;
  return function(u, o) {
    if (!o || u <= 0 || u > 3) return null;
    var D = o._size, c = D[0], h = D[1], s = 0, g = Math.max(16, 10 * Math.sqrt(h));
    g = Math.min(h - 2, g);
    var m = t(u, o, c, h, g);
    af(m, f, null);
    for (var w = m._index, A = m._ptr, _ = A[h], F = [], d = [], C = 0, E = h + 1, y = 2 * (h + 1), b = 3 * (h + 1), x = 4 * (h + 1), B = 5 * (h + 1), z = 6 * (h + 1), N = 7 * (h + 1), T = F, M = i(h, A, d, C, b, T, y, N, E, z, x, B), P = v(h, A, d, B, x, z, g, E, b, T, y), $ = 0, S, I, Z, O, q, U, Y, J, R, V, Q, L, K, X, W, j; P < h; ) {
      for (Z = -1; $ < h && (Z = d[b + $]) === -1; $++) ;
      d[y + Z] !== -1 && (T[d[y + Z]] = -1), d[b + $] = d[y + Z];
      var er = d[x + Z], tr = d[E + Z];
      P += tr;
      var nr = 0;
      d[E + Z] = -tr;
      var rr = A[Z], or = er === 0 ? rr : _, ur = or;
      for (O = 1; O <= er + 1; O++) {
        for (O > er ? (U = Z, Y = rr, J = d[C + Z] - er) : (U = w[rr++], Y = A[U], J = d[C + U]), q = 1; q <= J; q++) S = w[Y++], !((R = d[E + S]) <= 0) && (nr += R, d[E + S] = -R, w[ur++] = S, d[y + S] !== -1 && (T[d[y + S]] = T[S]), T[S] !== -1 ? d[y + T[S]] = d[y + S] : d[b + d[B + S]] = d[y + S]);
        U !== Z && (A[U] = Pr(Z), d[z + U] = 0);
      }
      for (er !== 0 && (_ = ur), d[B + Z] = nr, A[Z] = or, d[C + Z] = ur - or, d[x + Z] = -2, M = p(M, s, d, z, h), V = or; V < ur; V++) if (S = w[V], !((Q = d[x + S]) <= 0)) {
        R = -d[E + S];
        var vr = M - R;
        for (rr = A[S], L = A[S] + Q - 1; rr <= L; rr++) U = w[rr], d[z + U] >= M ? d[z + U] -= R : d[z + U] !== 0 && (d[z + U] = d[B + U] + vr);
      }
      for (V = or; V < ur; V++) {
        for (S = w[V], L = A[S], K = L + d[x + S] - 1, X = L, W = 0, j = 0, rr = L; rr <= K; rr++) if (U = w[rr], d[z + U] !== 0) {
          var wr = d[z + U] - M;
          wr > 0 ? (j += wr, w[X++] = U, W += U) : (A[U] = Pr(Z), d[z + U] = 0);
        }
        d[x + S] = X - L + 1;
        var Cr = X, yr = L + d[C + S];
        for (rr = K + 1; rr < yr; rr++) {
          I = w[rr];
          var Tr = d[E + I];
          Tr <= 0 || (j += Tr, w[X++] = I, W += I);
        }
        j === 0 ? (A[S] = Pr(Z), R = -d[E + S], nr -= R, tr += R, P += R, d[E + S] = 0, d[x + S] = -1) : (d[B + S] = Math.min(d[B + S], j), w[X] = w[Cr], w[Cr] = w[L], w[L] = Z, d[C + S] = X - L + 1, W = (W < 0 ? -W : W) % h, d[y + S] = d[N + W], d[N + W] = S, T[S] = W);
      }
      for (d[B + Z] = nr, s = Math.max(s, nr), M = p(M + s, s, d, z, h), V = or; V < ur; V++) if (S = w[V], !(d[E + S] >= 0)) for (W = T[S], S = d[N + W], d[N + W] = -1; S !== -1 && d[y + S] !== -1; S = d[y + S], M++) {
        for (J = d[C + S], Q = d[x + S], rr = A[S] + 1; rr <= A[S] + J - 1; rr++) d[z + w[rr]] = M;
        var br = S;
        for (I = d[y + S]; I !== -1; ) {
          var Ur = d[C + I] === J && d[x + I] === Q;
          for (rr = A[I] + 1; Ur && rr <= A[I] + J - 1; rr++) d[z + w[rr]] !== M && (Ur = 0);
          Ur ? (A[I] = Pr(S), d[E + S] += d[E + I], d[E + I] = 0, d[x + I] = -1, I = d[y + I], d[y + br] = I) : (br = I, I = d[y + I]);
        }
      }
      for (rr = or, V = or; V < ur; V++) S = w[V], !((R = -d[E + S]) <= 0) && (d[E + S] = R, j = d[B + S] + nr - R, j = Math.min(j, h - P - R), d[b + j] !== -1 && (T[d[b + j]] = S), d[y + S] = d[b + j], T[S] = -1, d[b + j] = S, $ = Math.min($, j), d[B + S] = j, w[rr++] = S);
      d[E + Z] = tr, (d[C + Z] = rr - or) === 0 && (A[Z] = -1, d[z + Z] = 0), er !== 0 && (_ = rr);
    }
    for (S = 0; S < h; S++) A[S] = Pr(A[S]);
    for (I = 0; I <= h; I++) d[b + I] = -1;
    for (I = h; I >= 0; I--) d[E + I] > 0 || (d[y + I] = d[b + A[I]], d[b + A[I]] = I);
    for (U = h; U >= 0; U--) d[E + U] <= 0 || A[U] !== -1 && (d[y + U] = d[b + A[U]], d[b + A[U]] = U);
    for (Z = 0, S = 0; S <= h; S++) A[S] === -1 && (Z = ra(S, Z, d, b, y, F, z));
    return F.splice(F.length - 1, 1), F;
  };
  function t(l, u, o, D, c) {
    var h = a(u);
    if (l === 1 && D === o) return e(u, h);
    if (l === 2) {
      for (var s = h._index, g = h._ptr, m = 0, w = 0; w < o; w++) {
        var A = g[w];
        if (g[w] = m, !(g[w + 1] - A > c)) for (var _ = g[w + 1]; A < _; A++) s[m++] = s[A];
      }
      return g[o] = m, u = a(h), n(h, u);
    }
    return n(h, u);
  }
  function i(l, u, o, D, c, h, s, g, m, w, A, _) {
    for (var F = 0; F < l; F++) o[D + F] = u[F + 1] - u[F];
    o[D + l] = 0;
    for (var d = 0; d <= l; d++) o[c + d] = -1, h[d] = -1, o[s + d] = -1, o[g + d] = -1, o[m + d] = 1, o[w + d] = 1, o[A + d] = 0, o[_ + d] = o[D + d];
    var C = p(0, 0, o, w, l);
    return o[A + l] = -2, u[l] = -1, o[w + l] = 0, C;
  }
  function v(l, u, o, D, c, h, s, g, m, w, A) {
    for (var _ = 0, F = 0; F < l; F++) {
      var d = o[D + F];
      if (d === 0) o[c + F] = -2, _++, u[F] = -1, o[h + F] = 0;
      else if (d > s) o[g + F] = 0, o[c + F] = -1, _++, u[F] = Pr(l), o[g + l]++;
      else {
        var C = o[m + d];
        C !== -1 && (w[C] = F), o[A + F] = o[m + d], o[m + d] = F;
      }
    }
    return _;
  }
  function p(l, u, o, D, c) {
    if (l < 2 || l + u < 0) {
      for (var h = 0; h < c; h++) o[D + h] !== 0 && (o[D + h] = 1);
      l = 2;
    }
    return l;
  }
  function f(l, u) {
    return l !== u;
  }
});
function ff(r, e, n, a, t, i, v) {
  var p, f, l = 0, u;
  if (r <= e || n[a + e] <= n[t + r]) return -1;
  n[t + r] = n[a + e];
  var o = n[i + r];
  if (n[i + r] = e, o === -1) l = 1, u = r;
  else {
    for (l = 2, u = o; u !== n[v + u]; u = n[v + u]) ;
    for (p = o; p !== u; p = f) f = n[v + p], n[v + p] = u;
  }
  return { jleaf: l, q: u };
}
var vf = "csCounts", lf = ["transpose"], cf = G(vf, lf, (r) => {
  var { transpose: e } = r;
  return function(n, a, t, i) {
    if (!n || !a || !t) return null;
    var v = n._size, p = v[0], f = v[1], l, u, o, D, c, h, s, g = 4 * f + (i ? f + p + 1 : 0), m = [], w = 0, A = f, _ = 2 * f, F = 3 * f, d = 4 * f, C = 5 * f + 1;
    for (o = 0; o < g; o++) m[o] = -1;
    var E = [], y = e(n), b = y._index, x = y._ptr;
    for (o = 0; o < f; o++) for (u = t[o], E[u] = m[F + u] === -1 ? 1 : 0; u !== -1 && m[F + u] === -1; u = a[u]) m[F + u] = o;
    if (i) {
      for (o = 0; o < f; o++) m[t[o]] = o;
      for (l = 0; l < p; l++) {
        for (o = f, h = x[l], s = x[l + 1], c = h; c < s; c++) o = Math.min(o, m[b[c]]);
        m[C + l] = m[d + o], m[d + o] = l;
      }
    }
    for (l = 0; l < f; l++) m[w + l] = l;
    for (o = 0; o < f; o++) {
      for (u = t[o], a[u] !== -1 && E[a[u]]--, D = i ? m[d + o] : u; D !== -1; D = i ? m[C + D] : -1) for (c = x[D]; c < x[D + 1]; c++) {
        l = b[c];
        var B = ff(l, u, m, F, A, _, w);
        B.jleaf >= 1 && E[u]++, B.jleaf === 2 && E[B.q]--;
      }
      a[u] !== -1 && (m[w + u] = a[u]);
    }
    for (u = 0; u < f; u++) a[u] !== -1 && (E[a[u]] += E[u]);
    return E;
  };
}), Df = "csSqr", pf = ["add", "multiply", "transpose"], hf = G(Df, pf, (r) => {
  var { add: e, multiply: n, transpose: a } = r, t = sf({ add: e, multiply: n, transpose: a }), i = cf({ transpose: a });
  return function(f, l, u) {
    var o = l._ptr, D = l._size, c = D[1], h, s = {};
    if (s.q = t(f, l), f && !s.q) return null;
    if (u) {
      var g = f ? ef(l, null, s.q) : l;
      s.parent = nf(g);
      var m = tf(s.parent, c);
      if (s.cp = i(g, s.parent, m, 1), g && s.parent && s.cp && v(g, s)) for (s.unz = 0, h = 0; h < c; h++) s.unz += s.cp[h];
    } else s.unz = 4 * o[c] + c, s.lnz = s.unz;
    return s;
  };
  function v(p, f) {
    var l = p._ptr, u = p._index, o = p._size, D = o[0], c = o[1];
    f.pinv = [], f.leftmost = [];
    var h = f.parent, s = f.pinv, g = f.leftmost, m = [], w = 0, A = D, _ = D + c, F = D + 2 * c, d, C, E, y, b;
    for (C = 0; C < c; C++) m[A + C] = -1, m[_ + C] = -1, m[F + C] = 0;
    for (d = 0; d < D; d++) g[d] = -1;
    for (C = c - 1; C >= 0; C--) for (y = l[C], b = l[C + 1], E = y; E < b; E++) g[u[E]] = C;
    for (d = D - 1; d >= 0; d--) s[d] = -1, C = g[d], C !== -1 && (m[F + C]++ === 0 && (m[_ + C] = d), m[w + d] = m[A + C], m[A + C] = d);
    for (f.lnz = 0, f.m2 = D, C = 0; C < c; C++) if (d = m[A + C], f.lnz++, d < 0 && (d = f.m2++), s[d] = C, !(--F[C] <= 0)) {
      f.lnz += m[F + C];
      var x = h[C];
      x !== -1 && (m[F + x] === 0 && (m[_ + x] = m[_ + C]), m[w + m[_ + C]] = m[A + x], m[A + x] = m[w + d], m[F + x] += m[F + C]);
    }
    for (d = 0; d < D; d++) s[d] < 0 && (s[d] = C++);
    return true;
  }
});
function Ze(r, e) {
  return r[e] < 0;
}
function ea(r, e) {
  r[e] = Pr(r[e]);
}
function Dn(r) {
  return r < 0 ? Pr(r) : r;
}
function df(r, e, n, a, t) {
  var i = e._index, v = e._ptr, p = e._size, f = p[1], l, u, o, D = 0;
  for (a[0] = r; D >= 0; ) {
    r = a[D];
    var c = t ? t[r] : r;
    Ze(v, r) || (ea(v, r), a[f + D] = c < 0 ? 0 : Dn(v[c]));
    var h = 1;
    for (u = a[f + D], o = c < 0 ? 0 : Dn(v[c + 1]); u < o; u++) if (l = i[u], !Ze(v, l)) {
      a[f + D] = u, a[++D] = l, h = 0;
      break;
    }
    h && (D--, a[--n] = r);
  }
  return n;
}
function mf(r, e, n, a, t) {
  var i = r._ptr, v = r._size, p = e._index, f = e._ptr, l = v[1], u, o, D, c = l;
  for (o = f[n], D = f[n + 1], u = o; u < D; u++) {
    var h = p[u];
    Ze(i, h) || (c = df(h, r, c, a, t));
  }
  for (u = c; u < l; u++) ea(i, a[u]);
  return c;
}
var gf = "csSpsolve", yf = ["divideScalar", "multiply", "subtract"], Af = G(gf, yf, (r) => {
  var { divideScalar: e, multiply: n, subtract: a } = r;
  return function(i, v, p, f, l, u, o) {
    var D = i._values, c = i._index, h = i._ptr, s = i._size, g = s[1], m = v._values, w = v._index, A = v._ptr, _, F, d, C, E = mf(i, v, p, f, u);
    for (_ = E; _ < g; _++) l[f[_]] = 0;
    for (F = A[p], d = A[p + 1], _ = F; _ < d; _++) l[w[_]] = m[_];
    for (var y = E; y < g; y++) {
      var b = f[y], x = u ? u[b] : b;
      if (!(x < 0)) for (F = h[x], d = h[x + 1], l[b] = e(l[b], D[o ? F : d - 1]), _ = o ? F + 1 : F, C = o ? d : d - 1; _ < C; _++) {
        var B = c[_];
        l[B] = a(l[B], n(D[_], l[b]));
      }
    }
    return E;
  };
}), Ff = "csLu", Ef = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], wf = G(Ff, Ef, (r) => {
  var { abs: e, divideScalar: n, multiply: a, subtract: t, larger: i, largerEq: v, SparseMatrix: p } = r, f = Af({ divideScalar: n, multiply: a, subtract: t });
  return function(u, o, D) {
    if (!u) return null;
    var c = u._size, h = c[1], s, g = 100, m = 100;
    o && (s = o.q, g = o.lnz || g, m = o.unz || m);
    var w = [], A = [], _ = [], F = new p({ values: w, index: A, ptr: _, size: [h, h] }), d = [], C = [], E = [], y = new p({ values: d, index: C, ptr: E, size: [h, h] }), b = [], x, B, z = [], N = [];
    for (x = 0; x < h; x++) z[x] = 0, b[x] = -1, _[x + 1] = 0;
    g = 0, m = 0;
    for (var T = 0; T < h; T++) {
      _[T] = g, E[T] = m;
      var M = s ? s[T] : T, P = f(F, u, M, N, z, b, 1), $ = -1, S = -1;
      for (B = P; B < h; B++) if (x = N[B], b[x] < 0) {
        var I = e(z[x]);
        i(I, S) && (S = I, $ = x);
      } else C[m] = b[x], d[m++] = z[x];
      if ($ === -1 || S <= 0) return null;
      b[M] < 0 && v(e(z[M]), a(S, D)) && ($ = M);
      var Z = z[$];
      for (C[m] = T, d[m++] = Z, b[$] = T, A[g] = $, w[g++] = 1, B = P; B < h; B++) x = N[B], b[x] < 0 && (A[g] = x, w[g++] = n(z[x], Z)), z[x] = 0;
    }
    for (_[h] = g, E[h] = m, B = 0; B < g; B++) A[B] = b[A[B]];
    return w.splice(g, w.length - g), A.splice(g, A.length - g), d.splice(m, d.length - m), C.splice(m, C.length - m), { L: F, U: y, pinv: b };
  };
}), pn = "slu", Cf = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], _f = G(pn, Cf, (r) => {
  var { typed: e, abs: n, add: a, multiply: t, transpose: i, divideScalar: v, subtract: p, larger: f, largerEq: l, SparseMatrix: u } = r, o = hf({ add: a, multiply: t, transpose: i }), D = wf({ abs: n, divideScalar: v, multiply: t, subtract: p, larger: f, largerEq: l, SparseMatrix: u });
  return e(pn, { "SparseMatrix, number, number": function(h, s, g) {
    if (!hr(s) || s < 0 || s > 3) throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
    if (g < 0 || g > 1) throw new Error("Partial pivoting threshold must be a number from 0 to 1");
    var m = o(s, h, false), w = D(h, m, g);
    return { L: w.L, U: w.U, p: w.pinv, q: m.q, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
    } };
  } });
});
function hn(r, e) {
  var n, a = e.length, t = [];
  if (r) for (n = 0; n < a; n++) t[r[n]] = e[n];
  else for (n = 0; n < a; n++) t[n] = e[n];
  return t;
}
var dn = "lusolve", bf = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], xf = G(dn, bf, (r) => {
  var { typed: e, matrix: n, lup: a, slu: t, usolve: i, lsolve: v, DenseMatrix: p } = r, f = ze({ DenseMatrix: p });
  return e(dn, { "Array, Array | Matrix": function(D, c) {
    D = n(D);
    var h = a(D), s = u(h.L, h.U, h.p, null, c);
    return s.valueOf();
  }, "DenseMatrix, Array | Matrix": function(D, c) {
    var h = a(D);
    return u(h.L, h.U, h.p, null, c);
  }, "SparseMatrix, Array | Matrix": function(D, c) {
    var h = a(D);
    return u(h.L, h.U, h.p, null, c);
  }, "SparseMatrix, Array | Matrix, number, number": function(D, c, h, s) {
    var g = t(D, h, s);
    return u(g.L, g.U, g.p, g.q, c);
  }, "Object, Array | Matrix": function(D, c) {
    return u(D.L, D.U, D.p, D.q, c);
  } });
  function l(o) {
    if (cr(o)) return o;
    if (lr(o)) return n(o);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function u(o, D, c, h, s) {
    o = l(o), D = l(D), c && (s = f(o, s, true), s._data = hn(c, s._data));
    var g = v(o, s), m = i(D, g);
    return h && (m._data = hn(h, m._data)), m;
  }
}), mn = "det", Bf = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], Sf = G(mn, Bf, (r) => {
  var { typed: e, matrix: n, subtractScalar: a, multiply: t, divideScalar: i, isZero: v, unaryMinus: p } = r;
  return e(mn, { any: function(u) {
    return ir(u);
  }, "Array | Matrix": function(u) {
    var o;
    switch (cr(u) ? o = u.size() : Array.isArray(u) ? (u = n(u), o = u.size()) : o = [], o.length) {
      case 0:
        return ir(u);
      case 1:
        if (o[0] === 1) return ir(u.valueOf()[0]);
        if (o[0] === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + dr(o) + ")");
      case 2: {
        var D = o[0], c = o[1];
        if (D === c) return f(u.clone().valueOf(), D);
        if (c === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + dr(o) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + dr(o) + ")");
    }
  } });
  function f(l, u, o) {
    if (u === 1) return ir(l[0][0]);
    if (u === 2) return a(t(l[0][0], l[1][1]), t(l[1][0], l[0][1]));
    for (var D = false, c = new Array(u).fill(0).map((C, E) => E), h = 0; h < u; h++) {
      var s = c[h];
      if (v(l[s][h])) {
        var g = void 0;
        for (g = h + 1; g < u; g++) if (!v(l[c[g]][h])) {
          s = c[g], c[g] = c[h], c[h] = s, D = !D;
          break;
        }
        if (g === u) return l[s][h];
      }
      for (var m = l[s][h], w = h === 0 ? 1 : l[c[h - 1]][h - 1], A = h + 1; A < u; A++) for (var _ = c[A], F = h + 1; F < u; F++) l[_][F] = i(a(t(l[_][F], m), t(l[_][h], l[s][F])), w);
    }
    var d = l[c[u - 1]][u - 1];
    return D ? p(d) : d;
  }
}), gn = "inv", Mf = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], Nf = G(gn, Mf, (r) => {
  var { typed: e, matrix: n, divideScalar: a, addScalar: t, multiply: i, unaryMinus: v, det: p, identity: f, abs: l } = r;
  return e(gn, { "Array | Matrix": function(D) {
    var c = cr(D) ? D.size() : sr(D);
    switch (c.length) {
      case 1:
        if (c[0] === 1) return cr(D) ? n([a(1, D.valueOf()[0])]) : [a(1, D[0])];
        throw new RangeError("Matrix must be square (size: " + dr(c) + ")");
      case 2: {
        var h = c[0], s = c[1];
        if (h === s) return cr(D) ? n(u(D.valueOf(), h, s), D.storage()) : u(D, h, s);
        throw new RangeError("Matrix must be square (size: " + dr(c) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + dr(c) + ")");
    }
  }, any: function(D) {
    return a(1, D);
  } });
  function u(o, D, c) {
    var h, s, g, m, w;
    if (D === 1) {
      if (m = o[0][0], m === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(1, m)]];
    } else if (D === 2) {
      var A = p(o);
      if (A === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(o[1][1], A), a(v(o[0][1]), A)], [a(v(o[1][0]), A), a(o[0][0], A)]];
    } else {
      var _ = o.concat();
      for (h = 0; h < D; h++) _[h] = _[h].concat();
      for (var F = f(D).valueOf(), d = 0; d < c; d++) {
        var C = l(_[d][d]), E = d;
        for (h = d + 1; h < D; ) l(_[h][d]) > C && (C = l(_[h][d]), E = h), h++;
        if (C === 0) throw Error("Cannot calculate inverse, determinant is zero");
        h = E, h !== d && (w = _[d], _[d] = _[h], _[h] = w, w = F[d], F[d] = F[h], F[h] = w);
        var y = _[d], b = F[d];
        for (h = 0; h < D; h++) {
          var x = _[h], B = F[h];
          if (h !== d) {
            if (x[d] !== 0) {
              for (g = a(v(x[d]), y[d]), s = d; s < c; s++) x[s] = t(x[s], i(g, y[s]));
              for (s = 0; s < c; s++) B[s] = t(B[s], i(g, b[s]));
            }
          } else {
            for (g = y[d], s = d; s < c; s++) x[s] = a(x[s], g);
            for (s = 0; s < c; s++) B[s] = a(B[s], g);
          }
        }
      }
      return F;
    }
  }
});
function zf(r) {
  var { addScalar: e, subtract: n, flatten: a, multiply: t, multiplyScalar: i, divideScalar: v, sqrt: p, abs: f, bignumber: l, diag: u, size: o, reshape: D, inv: c, qr: h, usolve: s, usolveAll: g, equal: m, complex: w, larger: A, smaller: _, matrixFromColumns: F, dot: d } = r;
  function C(O, q, U, Y) {
    var J = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, R = E(O, q, U, Y, J);
    y(O, q, U, Y, J, R);
    var { values: V, C: Q } = b(O, q, U, Y, J);
    if (J) {
      var L = x(O, q, Q, R, V, U, Y);
      return { values: V, eigenvectors: L };
    }
    return { values: V };
  }
  function E(O, q, U, Y, J) {
    var R = Y === "BigNumber", V = Y === "Complex", Q = R ? l(0) : 0, L = R ? l(1) : V ? w(1) : 1, K = R ? l(1) : 1, X = R ? l(10) : 2, W = i(X, X), j;
    J && (j = Array(q).fill(L));
    for (var er = false; !er; ) {
      er = true;
      for (var tr = 0; tr < q; tr++) {
        for (var nr = Q, rr = Q, or = 0; or < q; or++) tr !== or && (nr = e(nr, f(O[or][tr])), rr = e(rr, f(O[tr][or])));
        if (!m(nr, 0) && !m(rr, 0)) {
          for (var ur = K, vr = nr, wr = v(rr, X), Cr = i(rr, X); _(vr, wr); ) vr = i(vr, W), ur = i(ur, X);
          for (; A(vr, Cr); ) vr = v(vr, W), ur = v(ur, X);
          var yr = _(v(e(vr, rr), ur), i(e(nr, rr), 0.95));
          if (yr) {
            er = false;
            for (var Tr = v(1, ur), br = 0; br < q; br++) tr !== br && (O[tr][br] = i(O[tr][br], Tr), O[br][tr] = i(O[br][tr], ur));
            J && (j[tr] = i(j[tr], Tr));
          }
        }
      }
    }
    return J ? u(j) : null;
  }
  function y(O, q, U, Y, J, R) {
    var V = Y === "BigNumber", Q = Y === "Complex", L = V ? l(0) : Q ? w(0) : 0;
    V && (U = l(U));
    for (var K = 0; K < q - 2; K++) {
      for (var X = 0, W = L, j = K + 1; j < q; j++) {
        var er = O[j][K];
        _(f(W), f(er)) && (W = er, X = j);
      }
      if (!_(f(W), U)) {
        if (X !== K + 1) {
          var tr = O[X];
          O[X] = O[K + 1], O[K + 1] = tr;
          for (var nr = 0; nr < q; nr++) {
            var rr = O[nr][X];
            O[nr][X] = O[nr][K + 1], O[nr][K + 1] = rr;
          }
          if (J) {
            var or = R[X];
            R[X] = R[K + 1], R[K + 1] = or;
          }
        }
        for (var ur = K + 2; ur < q; ur++) {
          var vr = v(O[ur][K], W);
          if (vr !== 0) {
            for (var wr = 0; wr < q; wr++) O[ur][wr] = n(O[ur][wr], i(vr, O[K + 1][wr]));
            for (var Cr = 0; Cr < q; Cr++) O[Cr][K + 1] = e(O[Cr][K + 1], i(vr, O[Cr][ur]));
            if (J) for (var yr = 0; yr < q; yr++) R[ur][yr] = n(R[ur][yr], i(vr, R[K + 1][yr]));
          }
        }
      }
    }
    return R;
  }
  function b(O, q, U, Y, J) {
    var R = Y === "BigNumber", V = Y === "Complex", Q = R ? l(1) : V ? w(1) : 1;
    R && (U = l(U));
    for (var L = ir(O), K = [], X = q, W = [], j = J ? u(Array(q).fill(Q)) : void 0, er = J ? u(Array(X).fill(Q)) : void 0, tr = 0; tr <= 100; ) {
      tr += 1;
      for (var nr = L[X - 1][X - 1], rr = 0; rr < X; rr++) L[rr][rr] = n(L[rr][rr], nr);
      var { Q: or, R: ur } = h(L);
      L = t(ur, or);
      for (var vr = 0; vr < X; vr++) L[vr][vr] = e(L[vr][vr], nr);
      if (J && (er = t(er, or)), X === 1 || _(f(L[X - 1][X - 2]), U)) {
        tr = 0, K.push(L[X - 1][X - 1]), J && (W.unshift([[1]]), N(er, q), j = t(j, er), X > 1 && (er = u(Array(X - 1).fill(Q)))), X -= 1, L.pop();
        for (var wr = 0; wr < X; wr++) L[wr].pop();
      } else if (X === 2 || _(f(L[X - 2][X - 3]), U)) {
        tr = 0;
        var Cr = B(L[X - 2][X - 2], L[X - 2][X - 1], L[X - 1][X - 2], L[X - 1][X - 1]);
        K.push(...Cr), J && (W.unshift(z(L[X - 2][X - 2], L[X - 2][X - 1], L[X - 1][X - 2], L[X - 1][X - 1], Cr[0], Cr[1], U, Y)), N(er, q), j = t(j, er), X > 2 && (er = u(Array(X - 2).fill(Q)))), X -= 2, L.pop(), L.pop();
        for (var yr = 0; yr < X; yr++) L[yr].pop(), L[yr].pop();
      }
      if (X === 0) break;
    }
    if (K.sort((Ur, Or) => +n(f(Ur), f(Or))), tr > 100) {
      var Tr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + K.join(", "));
      throw Tr.values = K, Tr.vectors = [], Tr;
    }
    var br = J ? t(j, T(W, q)) : void 0;
    return { values: K, C: br };
  }
  function x(O, q, U, Y, J, R, V) {
    var Q = c(U), L = t(Q, O, U), K = V === "BigNumber", X = V === "Complex", W = K ? l(0) : X ? w(0) : 0, j = K ? l(1) : X ? w(1) : 1, er = [], tr = [];
    for (var nr of J) {
      var rr = M(er, nr, m);
      rr === -1 ? (er.push(nr), tr.push(1)) : tr[rr] += 1;
    }
    for (var or = [], ur = er.length, vr = Array(q).fill(W), wr = u(Array(q).fill(j)), Cr = function() {
      var br = er[yr], Ur = n(L, t(br, wr)), Or = g(Ur, vr);
      for (Or.shift(); Or.length < tr[yr]; ) {
        var st = P(Ur, q, Or, R, V);
        if (st === null) break;
        Or.push(st);
      }
      var Da = t(c(Y), U);
      Or = Or.map((Oe) => t(Da, Oe)), or.push(...Or.map((Oe) => ({ value: br, vector: a(Oe) })));
    }, yr = 0; yr < ur; yr++) Cr();
    return or;
  }
  function B(O, q, U, Y) {
    var J = e(O, Y), R = n(i(O, Y), i(q, U)), V = i(J, 0.5), Q = i(p(n(i(J, J), i(4, R))), 0.5);
    return [e(V, Q), n(V, Q)];
  }
  function z(O, q, U, Y, J, R, V, Q) {
    var L = Q === "BigNumber", K = Q === "Complex", X = L ? l(0) : K ? w(0) : 0, W = L ? l(1) : K ? w(1) : 1;
    if (_(f(U), V)) return [[W, X], [X, W]];
    if (A(f(n(J, R)), V)) return [[n(J, Y), n(R, Y)], [U, U]];
    var j = n(O, J), er = n(Y, J);
    return _(f(q), V) && _(f(er), V) ? [[j, W], [U, X]] : [[q, X], [er, W]];
  }
  function N(O, q) {
    for (var U = 0; U < O.length; U++) O[U].push(...Array(q - O[U].length).fill(0));
    for (var Y = O.length; Y < q; Y++) O.push(Array(q).fill(0)), O[Y][Y] = 1;
    return O;
  }
  function T(O, q) {
    for (var U = [], Y = 0; Y < q; Y++) U[Y] = Array(q).fill(0);
    var J = 0;
    for (var R of O) {
      for (var V = R.length, Q = 0; Q < V; Q++) for (var L = 0; L < V; L++) U[J + Q][J + L] = R[Q][L];
      J += V;
    }
    return U;
  }
  function M(O, q, U) {
    for (var Y = 0; Y < O.length; Y++) if (U(O[Y], q)) return Y;
    return -1;
  }
  function P(O, q, U, Y, J) {
    for (var R = J === "BigNumber" ? l(1e3) : 1e3, V, Q = 0; Q < 5; ++Q) {
      V = $(q, U, J);
      try {
        V = s(O, V);
      } catch {
        continue;
      }
      if (A(I(V), R)) break;
    }
    if (Q >= 5) return null;
    for (Q = 0; ; ) {
      var L = s(O, V);
      if (_(I(S(V, [L])), Y)) break;
      if (++Q >= 10) return null;
      V = Z(L);
    }
    return V;
  }
  function $(O, q, U) {
    var Y = U === "BigNumber", J = U === "Complex", R = Array(O).fill(0).map((V) => 2 * Math.random() - 1);
    return Y && (R = R.map((V) => l(V))), J && (R = R.map((V) => w(V))), R = S(R, q), Z(R, U);
  }
  function S(O, q) {
    var U = o(O);
    for (var Y of q) Y = D(Y, U), O = n(O, t(v(d(Y, O), d(Y, Y)), Y));
    return O;
  }
  function I(O) {
    return f(p(d(O, O)));
  }
  function Z(O, q) {
    var U = q === "BigNumber", Y = q === "Complex", J = U ? l(1) : Y ? w(1) : 1;
    return t(v(J, I(O)), O);
  }
  return C;
}
function Tf(r) {
  var { config: e, addScalar: n, subtract: a, abs: t, atan: i, cos: v, sin: p, multiplyScalar: f, inv: l, bignumber: u, multiply: o, add: D } = r;
  function c(y, b) {
    var x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, B = arguments.length > 3 ? arguments[3] : void 0, z = arguments.length > 4 ? arguments[4] : void 0;
    if (B === "number") return h(y, x, z);
    if (B === "BigNumber") return s(y, x, z);
    throw TypeError("Unsupported data type: " + B);
  }
  function h(y, b, x) {
    var B = y.length, z = Math.abs(b / B), N, T;
    if (x) {
      T = new Array(B);
      for (var M = 0; M < B; M++) T[M] = Array(B).fill(0), T[M][M] = 1;
    }
    for (var P = d(y); Math.abs(P[1]) >= Math.abs(z); ) {
      var $ = P[0][0], S = P[0][1];
      N = g(y[$][$], y[S][S], y[$][S]), y = F(y, N, $, S), x && (T = w(T, N, $, S)), P = d(y);
    }
    for (var I = Array(B).fill(0), Z = 0; Z < B; Z++) I[Z] = y[Z][Z];
    return E(ir(I), T, x);
  }
  function s(y, b, x) {
    var B = y.length, z = t(b / B), N, T;
    if (x) {
      T = new Array(B);
      for (var M = 0; M < B; M++) T[M] = Array(B).fill(0), T[M][M] = 1;
    }
    for (var P = C(y); t(P[1]) >= t(z); ) {
      var $ = P[0][0], S = P[0][1];
      N = m(y[$][$], y[S][S], y[$][S]), y = _(y, N, $, S), x && (T = A(T, N, $, S)), P = C(y);
    }
    for (var I = Array(B).fill(0), Z = 0; Z < B; Z++) I[Z] = y[Z][Z];
    return E(ir(I), T, x);
  }
  function g(y, b, x) {
    var B = b - y;
    return Math.abs(B) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * x / (b - y));
  }
  function m(y, b, x) {
    var B = a(b, y);
    return t(B) <= e.relTol ? u(-1).acos().div(4) : f(0.5, i(o(2, x, l(B))));
  }
  function w(y, b, x, B) {
    for (var z = y.length, N = Math.cos(b), T = Math.sin(b), M = Array(z).fill(0), P = Array(z).fill(0), $ = 0; $ < z; $++) M[$] = N * y[$][x] - T * y[$][B], P[$] = T * y[$][x] + N * y[$][B];
    for (var S = 0; S < z; S++) y[S][x] = M[S], y[S][B] = P[S];
    return y;
  }
  function A(y, b, x, B) {
    for (var z = y.length, N = v(b), T = p(b), M = Array(z).fill(u(0)), P = Array(z).fill(u(0)), $ = 0; $ < z; $++) M[$] = a(f(N, y[$][x]), f(T, y[$][B])), P[$] = n(f(T, y[$][x]), f(N, y[$][B]));
    for (var S = 0; S < z; S++) y[S][x] = M[S], y[S][B] = P[S];
    return y;
  }
  function _(y, b, x, B) {
    for (var z = y.length, N = u(v(b)), T = u(p(b)), M = f(N, N), P = f(T, T), $ = Array(z).fill(u(0)), S = Array(z).fill(u(0)), I = o(u(2), N, T, y[x][B]), Z = n(a(f(M, y[x][x]), I), f(P, y[B][B])), O = D(f(P, y[x][x]), I, f(M, y[B][B])), q = 0; q < z; q++) $[q] = a(f(N, y[x][q]), f(T, y[B][q])), S[q] = n(f(T, y[x][q]), f(N, y[B][q]));
    y[x][x] = Z, y[B][B] = O, y[x][B] = u(0), y[B][x] = u(0);
    for (var U = 0; U < z; U++) U !== x && U !== B && (y[x][U] = $[U], y[U][x] = $[U], y[B][U] = S[U], y[U][B] = S[U]);
    return y;
  }
  function F(y, b, x, B) {
    for (var z = y.length, N = Math.cos(b), T = Math.sin(b), M = N * N, P = T * T, $ = Array(z).fill(0), S = Array(z).fill(0), I = M * y[x][x] - 2 * N * T * y[x][B] + P * y[B][B], Z = P * y[x][x] + 2 * N * T * y[x][B] + M * y[B][B], O = 0; O < z; O++) $[O] = N * y[x][O] - T * y[B][O], S[O] = T * y[x][O] + N * y[B][O];
    y[x][x] = I, y[B][B] = Z, y[x][B] = 0, y[B][x] = 0;
    for (var q = 0; q < z; q++) q !== x && q !== B && (y[x][q] = $[q], y[q][x] = $[q], y[B][q] = S[q], y[q][B] = S[q]);
    return y;
  }
  function d(y) {
    for (var b = y.length, x = 0, B = [0, 1], z = 0; z < b; z++) for (var N = z + 1; N < b; N++) Math.abs(x) < Math.abs(y[z][N]) && (x = Math.abs(y[z][N]), B = [z, N]);
    return [B, x];
  }
  function C(y) {
    for (var b = y.length, x = 0, B = [0, 1], z = 0; z < b; z++) for (var N = z + 1; N < b; N++) t(x) < t(y[z][N]) && (x = t(y[z][N]), B = [z, N]);
    return [B, x];
  }
  function E(y, b, x) {
    var B = y.length, z = Array(B), N;
    if (x) {
      N = Array(B);
      for (var T = 0; T < B; T++) N[T] = Array(B);
    }
    for (var M = 0; M < B; M++) {
      for (var P = 0, $ = y[0], S = 0; S < y.length; S++) t(y[S]) < t($) && (P = S, $ = y[P]);
      if (z[M] = y.splice(P, 1)[0], x) for (var I = 0; I < B; I++) N[M][I] = b[I][P], b[I].splice(P, 1);
    }
    if (!x) return { values: z };
    var Z = N.map((O, q) => ({ value: z[q], vector: O }));
    return { values: z, eigenvectors: Z };
  }
  return c;
}
var $f = "eigs", Of = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], qf = G($f, Of, (r) => {
  var { config: e, typed: n, matrix: a, addScalar: t, subtract: i, equal: v, abs: p, atan: f, cos: l, sin: u, multiplyScalar: o, divideScalar: D, inv: c, bignumber: h, multiply: s, add: g, larger: m, column: w, flatten: A, number: _, complex: F, sqrt: d, diag: C, size: E, reshape: y, qr: b, usolve: x, usolveAll: B, im: z, re: N, smaller: T, matrixFromColumns: M, dot: P } = r, $ = Tf({ config: e, addScalar: t, subtract: i, abs: p, atan: f, cos: l, sin: u, multiplyScalar: o, inv: c, bignumber: h, multiply: s, add: g }), S = zf({ addScalar: t, subtract: i, multiply: s, multiplyScalar: o, flatten: A, divideScalar: D, sqrt: d, abs: p, bignumber: h, diag: C, size: E, reshape: y, qr: b, inv: c, usolve: x, usolveAll: B, equal: v, complex: F, larger: m, smaller: T, matrixFromColumns: M, dot: P });
  return n("eigs", { Array: function(R) {
    return I(a(R));
  }, "Array, number|BigNumber": function(R, V) {
    return I(a(R), { precision: V });
  }, "Array, Object"(J, R) {
    return I(a(J), R);
  }, Matrix: function(R) {
    return I(R, { matricize: true });
  }, "Matrix, number|BigNumber": function(R, V) {
    return I(R, { precision: V, matricize: true });
  }, "Matrix, Object": function(R, V) {
    var Q = { matricize: true };
    return be(Q, V), I(R, Q);
  } });
  function I(J) {
    var R, V = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, Q = "eigenvectors" in V ? V.eigenvectors : true, L = (R = V.precision) !== null && R !== void 0 ? R : e.relTol, K = Z(J, L, Q);
    return V.matricize && (K.values = a(K.values), Q && (K.eigenvectors = K.eigenvectors.map((X) => {
      var { value: W, vector: j } = X;
      return { value: W, vector: a(j) };
    }))), Q && Object.defineProperty(K, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), K;
  }
  function Z(J, R, V) {
    var Q = J.toArray(), L = J.size();
    if (L.length !== 2 || L[0] !== L[1]) throw new RangeError("Matrix must be square (size: ".concat(dr(L), ")"));
    var K = L[0];
    if (q(Q, K, R) && (U(Q, K), O(Q, K, R))) {
      var X = Y(J, Q, K);
      return $(Q, K, R, X, V);
    }
    var W = Y(J, Q, K);
    return S(Q, K, R, W, V);
  }
  function O(J, R, V) {
    for (var Q = 0; Q < R; Q++) for (var L = Q; L < R; L++) if (m(h(p(i(J[Q][L], J[L][Q]))), V)) return false;
    return true;
  }
  function q(J, R, V) {
    for (var Q = 0; Q < R; Q++) for (var L = 0; L < R; L++) if (m(h(p(z(J[Q][L]))), V)) return false;
    return true;
  }
  function U(J, R) {
    for (var V = 0; V < R; V++) for (var Q = 0; Q < R; Q++) J[V][Q] = N(J[V][Q]);
  }
  function Y(J, R, V) {
    var Q = J.datatype();
    if (Q === "number" || Q === "BigNumber" || Q === "Complex") return Q;
    for (var L = false, K = false, X = false, W = 0; W < V; W++) for (var j = 0; j < V; j++) {
      var er = R[W][j];
      if (pr(er) || Qe(er)) L = true;
      else if (mr(er)) K = true;
      else if (Je(er)) X = true;
      else throw TypeError("Unsupported type in Matrix: " + zr(er));
    }
    if (K && X && console.warn("Complex BigNumbers not supported, this operation will lose precission."), X) {
      for (var tr = 0; tr < V; tr++) for (var nr = 0; nr < V; nr++) R[tr][nr] = F(R[tr][nr]);
      return "Complex";
    }
    if (K) {
      for (var rr = 0; rr < V; rr++) for (var or = 0; or < V; or++) R[rr][or] = h(R[rr][or]);
      return "BigNumber";
    }
    if (L) {
      for (var ur = 0; ur < V; ur++) for (var vr = 0; vr < V; vr++) R[ur][vr] = _(R[ur][vr]);
      return "number";
    } else throw TypeError("Matrix contains unsupported types only.");
  }
}), If = "divide", Rf = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], Uf = G(If, Rf, (r) => {
  var { typed: e, matrix: n, multiply: a, equalScalar: t, divideScalar: i, inv: v } = r, p = Yn({ typed: e, equalScalar: t }), f = He({ typed: e });
  return e("divide", bn({ "Array | Matrix, Array | Matrix": function(u, o) {
    return a(u, v(o));
  }, "DenseMatrix, any": function(u, o) {
    return f(u, o, i, false);
  }, "SparseMatrix, any": function(u, o) {
    return p(u, o, i, false);
  }, "Array, any": function(u, o) {
    return f(n(u), o, i, false).valueOf();
  }, "any, Array | Matrix": function(u, o) {
    return a(u, v(o));
  } }, i.signatures));
}), ue = vu({ config: xr }), Te = Du({}), ke = Fu({}), je = Cu({}), Er = Iu({ Matrix: je }), H = iu({ BigNumber: ue, Complex: Te, DenseMatrix: Er, Fraction: ke }), ie = gi({ typed: H }), Vr = Ai({ typed: H }), Pf = Rs({ typed: H }), rt = oi({ Complex: Te, typed: H }), $e = so({ typed: H }), Lf = Ps({ typed: H }), Mr = Xu({ config: xr, typed: H }), ta = wo({ typed: H }), Vf = _o({ typed: H }), Zf = vo({ typed: H }), na = Uu({ typed: H }), Jf = Vu({ config: xr, typed: H }), aa = Ju({ equalScalar: Mr, typed: H }), Rr = Ki({ typed: H }), et = ei({ typed: H }), Qf = co({ typed: H }), Gf = ji({ BigNumber: ue, Fraction: ke, complex: rt, typed: H }), Xf = Vs({ typed: H }), Gr = Wu({ Matrix: je, equalScalar: Mr, typed: H }), Xr = Ei({ typed: H }), tt = ai({ BigNumber: ue, typed: H }), pv = Os({ SparseMatrix: Gr, typed: H }), nt = to({ Complex: Te, config: xr, typed: H }), oe = di({ typed: H }), ua = vi({ Fraction: ke, typed: H }), fr = ci({ DenseMatrix: Er, Matrix: je, SparseMatrix: Gr, typed: H }), Yf = Wo({ bignumber: tt, fraction: ua, number: et }), Kf = $o({ isInteger: na, matrix: fr, typed: H }), at = qo({ matrix: fr, config: xr, typed: H }), ia = Zo({ matrix: fr, typed: H }), oa = Xo({ BigNumber: ue, config: xr, matrix: fr, typed: H }), Yr = po({ isInteger: na, matrix: fr, typed: H }), Wf = Qo({ conj: $e, transpose: ia, typed: H }), Hf = Fo({ DenseMatrix: Er, SparseMatrix: Gr, matrix: fr, typed: H }), $r = ko({ numeric: Yf, typed: H }), sa = ss({ DenseMatrix: Er, concat: Yr, equalScalar: Mr, matrix: fr, typed: H }), ut = xo({ BigNumber: ue, DenseMatrix: Er, SparseMatrix: Gr, config: xr, matrix: fr, typed: H }), hv = So({ matrix: fr, multiplyScalar: Rr, typed: H }), fa = As({ DenseMatrix: Er, concat: Yr, config: xr, matrix: fr, typed: H }), kf = ts({ DenseMatrix: Er, divideScalar: $r, equalScalar: Mr, matrix: fr, multiplyScalar: Rr, subtractScalar: Xr, typed: H }), jf = pi({ flatten: ta, matrix: fr, size: at, typed: H }), rv = rf({ addScalar: Vr, complex: rt, conj: $e, divideScalar: $r, equal: sa, identity: ut, isZero: aa, matrix: fr, multiplyScalar: Rr, sign: Gf, sqrt: nt, subtractScalar: Xr, typed: H, unaryMinus: oe, zeros: oa }), se = ls({ DenseMatrix: Er, concat: Yr, config: xr, matrix: fr, typed: H }), it = ao({ DenseMatrix: Er, concat: Yr, equalScalar: Mr, matrix: fr, subtractScalar: Xr, typed: H, unaryMinus: oe }), va = as({ DenseMatrix: Er, divideScalar: $r, equalScalar: Mr, matrix: fr, multiplyScalar: Rr, subtractScalar: Xr, typed: H }), fe = Js({ DenseMatrix: Er, SparseMatrix: Gr, addScalar: Vr, concat: Yr, equalScalar: Mr, matrix: fr, typed: H }), la = Ys({ addScalar: Vr, conj: $e, multiplyScalar: Rr, size: at, typed: H }), ev = Cs({ DenseMatrix: Er, smaller: se }), ca = xs({ ImmutableDenseMatrix: ev, getMatrixDataType: Vf }), ee = ms({ DenseMatrix: Er, concat: Yr, config: xr, matrix: fr, typed: H }), Zr = Hi({ addScalar: Vr, dot: la, equalScalar: Mr, matrix: fr, multiplyScalar: Rr, typed: H }), tv = _f({ SparseMatrix: Gr, abs: ie, add: fe, divideScalar: $r, larger: ee, largerEq: fa, multiply: Zr, subtract: it, transpose: ia, typed: H }), dv = Ro({ add: fe, matrix: fr, typed: H, zeros: oa }), nv = is({ DenseMatrix: Er, divideScalar: $r, equalScalar: Mr, matrix: fr, multiplyScalar: Rr, subtractScalar: Xr, typed: H }), mv = yo({ matrix: fr, multiply: Zr, subtract: it, typed: H }), av = Sf({ divideScalar: $r, isZero: aa, matrix: fr, multiply: Zr, subtractScalar: Xr, typed: H, unaryMinus: oe }), uv = Ms({ larger: ee, smaller: se }), gv = Ws({ Index: ca, typed: H }), iv = ps({ DenseMatrix: Er, concat: Yr, config: xr, matrix: fr, typed: H }), ov = zo({ bignumber: tt, matrix: fr, add: fe, config: xr, isPositive: Jf, larger: ee, largerEq: fa, smaller: se, smallerEq: iv, typed: H }), sv = Ts({ FibonacciHeap: uv, addScalar: Vr, equalScalar: Mr }), fv = mo({ Index: ca, matrix: fr, range: ov, typed: H }), ot = Nf({ abs: ie, addScalar: Vr, det: av, divideScalar: $r, identity: ut, matrix: fr, multiply: Zr, typed: H, unaryMinus: oe }), vv = ks({ DenseMatrix: Er, Spa: sv, SparseMatrix: Gr, abs: ie, addScalar: Vr, divideScalar: $r, equalScalar: Mr, larger: ee, matrix: fr, multiplyScalar: Rr, subtractScalar: Xr, typed: H, unaryMinus: oe }), lv = rs({ Complex: Te, config: xr, fraction: ua, identity: ut, inv: ot, matrix: fr, multiply: Zr, number: et, typed: H }), yv = Uf({ divideScalar: $r, equalScalar: Mr, inv: ot, matrix: fr, multiply: Zr, typed: H }), Av = xf({ DenseMatrix: Er, lsolve: kf, lup: vv, matrix: fr, slu: tv, typed: H, usolve: va }), cv = qf({ abs: ie, add: fe, addScalar: Vr, atan: Pf, bignumber: tt, column: fv, complex: rt, config: xr, cos: Lf, diag: Hf, divideScalar: $r, dot: la, equal: sa, flatten: ta, im: Zf, inv: ot, larger: ee, matrix: fr, matrixFromColumns: jf, multiply: Zr, multiplyScalar: Rr, number: et, qr: rv, re: Qf, reshape: Kf, sin: Xf, size: at, smaller: se, sqrt: nt, subtract: it, typed: H, usolve: va, usolveAll: nv }), Fv = Gs({ abs: ie, add: fe, conj: $e, ctranspose: Wf, eigs: cv, equalScalar: Mr, larger: ee, matrix: fr, multiply: Zr, pow: lv, smaller: se, sqrt: nt, typed: H });
export {
  yv as a,
  fe as b,
  mv as c,
  la as d,
  fr as e,
  dv as f,
  gv as g,
  pv as h,
  ut as i,
  Av as j,
  hv as k,
  vv as l,
  Zr as m,
  Fv as n,
  ta as o,
  it as s,
  ia as t,
  oa as z
};
