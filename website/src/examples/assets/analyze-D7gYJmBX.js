import { _ as Ne, t as Ae, D as ht, C as wr } from "./complex-i8qiIvCl.js";
var mn = { relTol: 1e-12, absTol: 1e-15, matrix: "Matrix", number: "number", numberFallback: "number", precision: 64, predictable: false, randomSeed: null };
function au(r, e) {
  if (Fe(r, e)) return r[e];
  throw typeof r[e] == "function" && ou(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function iu(r, e, n) {
  if (Fe(r, e)) return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function Fe(r, e) {
  return !su(r) && !Array.isArray(r) ? false : ie(fu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function ou(r, e) {
  return r == null || typeof r[e] != "function" || ie(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : ie(lu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function su(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var fu = { length: true, name: true }, lu = { toString: true, valueOf: true, toLocaleString: true };
class cu {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
  }
  get(e) {
    return au(this.wrappedObject, e);
  }
  set(e, n) {
    return iu(this.wrappedObject, e, n), this;
  }
  has(e) {
    return Fe(this.wrappedObject, e) && e in this.wrappedObject;
  }
  entries() {
    return vu(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var n of this.keys()) e(this.get(n), n, this);
  }
  delete(e) {
    Fe(this.wrappedObject, e) && delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys()) this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
function vu(r, e) {
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
function Du(r) {
  return typeof r == "bigint";
}
function He(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function je(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function gn(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function $r(r) {
  return typeof r == "string";
}
var mr = Array.isArray;
function lr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function Ee(r) {
  return Array.isArray(r) || lr(r);
}
function yn(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function An(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function Fn(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function ke(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function pu(r) {
  return typeof r == "boolean";
}
function du(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function hu(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function mu(r) {
  return typeof r == "function";
}
function gu(r) {
  return r instanceof Date;
}
function yu(r) {
  return r instanceof RegExp;
}
function rt(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !He(r) && !je(r));
}
function Au(r) {
  return r ? r instanceof Map || r instanceof cu || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
function Fu(r) {
  return r === null;
}
function Eu(r) {
  return r === void 0;
}
function Cu(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function wu(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function bu(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function _u(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Bu(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function xu(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function Su(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Mu(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function Nu(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function Tu(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function zu(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function Ou(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function $u(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function Iu(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function qu(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function Ru(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function Uu(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function Ir(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : Ar(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function ar(r) {
  var e = typeof r;
  if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
  if (typeof r.clone == "function") return r.clone();
  if (Array.isArray(r)) return r.map(function(n) {
    return ar(n);
  });
  if (r instanceof Date) return new Date(r.valueOf());
  if (Ar(r)) return r;
  if (rt(r)) return Pu(r, ar);
  if (e === "function") return r;
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function Pu(r, e) {
  var n = {};
  for (var u in r) ie(r, u) && (n[u] = e(r[u]));
  return n;
}
function En(r, e) {
  for (var n in e) ie(e, n) && (r[n] = e[n]);
  return r;
}
function Jr(r, e) {
  var n, u, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length) return false;
    for (u = 0, t = r.length; u < t; u++) if (!Jr(r[u], e[u])) return false;
    return true;
  } else {
    if (typeof r == "function") return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object)) return false;
      for (n in r) if (!(n in e) || !Jr(r[n], e[n])) return false;
      for (n in e) if (!(n in r)) return false;
      return true;
    } else return r === e;
  }
}
function ie(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function Lu(r, e) {
  for (var n = {}, u = 0; u < e.length; u++) {
    var t = e[u], a = r[t];
    a !== void 0 && (n[t] = a);
  }
  return n;
}
var Vu = ["Matrix", "Array"], Zu = ["number", "BigNumber", "Fraction"], br = function(e) {
  if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(mn);
};
Ne(br, mn, { MATRIX_OPTIONS: Vu, NUMBER_OPTIONS: Zu });
function G(r, e, n, u) {
  function t(a) {
    var s = Lu(a, e.map(Wu));
    return Ju(r, e, a), n(s);
  }
  return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), u && (t.meta = u), t;
}
function Ju(r, e, n) {
  var u = e.filter((a) => !Qu(a)).every((a) => n[a] !== void 0);
  if (!u) {
    var t = e.filter((a) => n[a] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Qu(r) {
  return r && r[0] === "?";
}
function Wu(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function pr(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var Gu = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function Ve(r, e, n) {
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
function Je(r, e) {
  if (typeof e == "function") return e(r);
  if (r === 1 / 0) return "Infinity";
  if (r === -1 / 0) return "-Infinity";
  if (isNaN(r)) return "NaN";
  var { notation: n, precision: u, wordSize: t } = Cn(e);
  switch (n) {
    case "fixed":
      return Xu(r, u);
    case "exponential":
      return wn(r, u);
    case "engineering":
      return Yu(r, u);
    case "bin":
      return Ve(r, 2, t);
    case "oct":
      return Ve(r, 8, t);
    case "hex":
      return Ve(r, 16, t);
    case "auto":
      return Ku(r, u, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], s = arguments[4];
        return a !== "." ? a + s : s;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Cn(r) {
  var e = "auto", n, u;
  if (r !== void 0) if (vr(r)) n = r;
  else if (Ar(r)) n = r.toNumber();
  else if (rt(r)) r.precision !== void 0 && (n = mt(r.precision, () => {
    throw new Error('Option "precision" must be a number or BigNumber');
  })), r.wordSize !== void 0 && (u = mt(r.wordSize, () => {
    throw new Error('Option "wordSize" must be a number or BigNumber');
  })), r.notation && (e = r.notation);
  else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: n, wordSize: u };
}
function Te(r) {
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
function Yu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Te(r), u = ze(n, e), t = u.exponent, a = u.coefficients, s = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if (vr(e)) for (; e > a.length || t - s + 1 > a.length; ) a.push(0);
  else for (var D = Math.abs(t - s) - (a.length - 1), c = 0; c < D; c++) a.push(0);
  for (var f = Math.abs(t - s), o = 1; f > 0; ) o++, f--;
  var l = a.slice(o).join(""), m = vr(e) && l.length || l.match(/[1-9]/) ? "." + l : "", v = a.slice(0, o).join("") + m + "e" + (t >= 0 ? "+" : "") + s.toString();
  return u.sign + v;
}
function Xu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Te(r), u = typeof e == "number" ? ze(n, n.exponent + 1 + e) : n, t = u.coefficients, a = u.exponent + 1, s = a + (e || 0);
  return t.length < s && (t = t.concat(re(s - t.length))), a < 0 && (t = re(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), u.sign + t.join("");
}
function wn(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Te(r), u = e ? ze(n, e) : n, t = u.coefficients, a = u.exponent;
  t.length < e && (t = t.concat(re(e - t.length)));
  var s = t.shift();
  return u.sign + s + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function Ku(r, e, n) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var u = gt(n == null ? void 0 : n.lowerExp, -3), t = gt(n == null ? void 0 : n.upperExp, 5), a = Te(r), s = e ? ze(a, e) : a;
  if (s.exponent < u || s.exponent >= t) return wn(r, e);
  var D = s.coefficients, c = s.exponent;
  D.length < e && (D = D.concat(re(e - D.length))), D = D.concat(re(c - D.length + 1 + (D.length < e ? e - D.length : 0))), D = re(-c).concat(D);
  var f = c > 0 ? c : 0;
  return f < D.length - 1 && D.splice(f + 1, 0, "."), s.sign + D.join("");
}
function ze(r, e) {
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
function re(r) {
  for (var e = [], n = 0; n < r; n++) e.push(0);
  return e;
}
function Hu(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function Pr(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), u);
}
function mt(r, e) {
  if (vr(r)) return r;
  if (Ar(r)) return r.toNumber();
  e();
}
function gt(r, e) {
  return vr(r) ? r : Ar(r) ? r.toNumber() : e;
}
var bn = function() {
  return bn = Ae.create, Ae;
}, ju = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], ku = G("typed", ju, function(e) {
  var { BigNumber: n, Complex: u, DenseMatrix: t, Fraction: a } = e, s = bn();
  return s.clear(), s.addTypes([{ name: "number", test: vr }, { name: "Complex", test: He }, { name: "BigNumber", test: Ar }, { name: "bigint", test: Du }, { name: "Fraction", test: je }, { name: "Unit", test: gn }, { name: "identifier", test: (D) => $r && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D) }, { name: "string", test: $r }, { name: "Chain", test: Uu }, { name: "Array", test: mr }, { name: "Matrix", test: lr }, { name: "DenseMatrix", test: yn }, { name: "SparseMatrix", test: An }, { name: "Range", test: Fn }, { name: "Index", test: ke }, { name: "boolean", test: pu }, { name: "ResultSet", test: du }, { name: "Help", test: hu }, { name: "function", test: mu }, { name: "Date", test: gu }, { name: "RegExp", test: yu }, { name: "null", test: Fu }, { name: "undefined", test: Eu }, { name: "AccessorNode", test: Cu }, { name: "ArrayNode", test: wu }, { name: "AssignmentNode", test: bu }, { name: "BlockNode", test: _u }, { name: "ConditionalNode", test: Bu }, { name: "ConstantNode", test: xu }, { name: "FunctionNode", test: Mu }, { name: "FunctionAssignmentNode", test: Su }, { name: "IndexNode", test: Nu }, { name: "Node", test: Tu }, { name: "ObjectNode", test: zu }, { name: "OperatorNode", test: Ou }, { name: "ParenthesisNode", test: $u }, { name: "RangeNode", test: Iu }, { name: "RelationalNode", test: qu }, { name: "SymbolNode", test: Ru }, { name: "Map", test: Au }, { name: "Object", test: rt }]), s.addConversions([{ from: "number", to: "BigNumber", convert: function(c) {
    if (n || de(c), Hu(c) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + c + "). Use function bignumber(x) to convert to BigNumber.");
    return new n(c);
  } }, { from: "number", to: "Complex", convert: function(c) {
    return u || he(c), new u(c, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(c) {
    return u || he(c), new u(c.toNumber(), 0);
  } }, { from: "bigint", to: "number", convert: function(c) {
    if (c > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + c + ")");
    return Number(c);
  } }, { from: "bigint", to: "BigNumber", convert: function(c) {
    return n || de(c), new n(c.toString());
  } }, { from: "bigint", to: "Fraction", convert: function(c) {
    return a || me(c), new a(c);
  } }, { from: "Fraction", to: "BigNumber", convert: function(c) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(c) {
    return u || he(c), new u(c.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(c) {
    a || me(c);
    var f = new a(c);
    if (f.valueOf() !== c) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + c + "). Use function fraction(x) to convert to Fraction.");
    return f;
  } }, { from: "string", to: "number", convert: function(c) {
    var f = Number(c);
    if (isNaN(f)) throw new Error('Cannot convert "' + c + '" to a number');
    return f;
  } }, { from: "string", to: "BigNumber", convert: function(c) {
    n || de(c);
    try {
      return new n(c);
    } catch {
      throw new Error('Cannot convert "' + c + '" to BigNumber');
    }
  } }, { from: "string", to: "bigint", convert: function(c) {
    try {
      return BigInt(c);
    } catch {
      throw new Error('Cannot convert "' + c + '" to BigInt');
    }
  } }, { from: "string", to: "Fraction", convert: function(c) {
    a || me(c);
    try {
      return new a(c);
    } catch {
      throw new Error('Cannot convert "' + c + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(c) {
    u || he(c);
    try {
      return new u(c);
    } catch {
      throw new Error('Cannot convert "' + c + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(c) {
    return +c;
  } }, { from: "boolean", to: "BigNumber", convert: function(c) {
    return n || de(c), new n(+c);
  } }, { from: "boolean", to: "bigint", convert: function(c) {
    return BigInt(+c);
  } }, { from: "boolean", to: "Fraction", convert: function(c) {
    return a || me(c), new a(+c);
  } }, { from: "boolean", to: "string", convert: function(c) {
    return String(c);
  } }, { from: "Array", to: "Matrix", convert: function(c) {
    return t || ra(), new t(c);
  } }, { from: "Matrix", to: "Array", convert: function(c) {
    return c.valueOf();
  } }]), s.onMismatch = (D, c, f) => {
    var o = s.createError(D, c, f);
    if (["wrongType", "mismatch"].includes(o.data.category) && c.length === 1 && Ee(c[0]) && f.some((m) => !m.params.includes(","))) {
      var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw l.data = o.data, l;
    }
    throw o;
  }, s.onMismatch = (D, c, f) => {
    var o = s.createError(D, c, f);
    if (["wrongType", "mismatch"].includes(o.data.category) && c.length === 1 && Ee(c[0]) && f.some((m) => !m.params.includes(","))) {
      var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw l.data = o.data, l;
    }
    throw o;
  }, s;
});
function de(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function he(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function ra() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function me(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var ea = "BigNumber", ta = ["?on", "config"], na = G(ea, ta, (r) => {
  var { on: e, config: n } = r, u = ht.clone({ precision: n.precision, modulo: ht.EUCLID });
  return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, u.fromJSON = function(t) {
    return new u(t.value);
  }, e && e("config", function(t, a) {
    t.precision !== a.precision && u.config({ precision: t.precision });
  }), u;
}, { isClass: true }), ua = "Complex", aa = [], ia = G(ua, aa, () => (Object.defineProperty(wr, "name", { value: "Complex" }), wr.prototype.constructor = wr, wr.prototype.type = "Complex", wr.prototype.isComplex = true, wr.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, wr.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, wr.prototype.format = function(r) {
  var e = "", n = this.im, u = this.re, t = Je(this.re, r), a = Je(this.im, r), s = vr(r) ? r : r ? r.precision : null;
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
        if (gn(u) && u.hasBase("ANGLE") && (u = u.toNumber("rad")), vr(u)) return new wr({ r: n, phi: u });
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
const k = BigInt(0), er = BigInt(1), oe = BigInt(2), Qe = BigInt(5), _r = BigInt(10), oa = 2e3, X = { s: er, n: k, d: er };
function Ur(r, e) {
  try {
    r = BigInt(r);
  } catch {
    throw Vr();
  }
  return r * e;
}
function Or(r) {
  return typeof r == "bigint" ? r : Math.floor(r);
}
function hr(r, e) {
  if (e === k) throw et();
  const n = Object.create(zr.prototype);
  n.s = r < k ? -er : er, r = r < k ? -r : r;
  const u = Wr(r, e);
  return n.n = r / u, n.d = e / u, n;
}
function jr(r) {
  const e = {};
  let n = r, u = oe, t = Qe - er;
  for (; t <= n; ) {
    for (; n % u === k; ) n /= u, e[u] = (e[u] || k) + er;
    t += er + oe * u++;
  }
  return n !== r ? n > 1 && (e[n] = (e[n] || k) + er) : e[r] = (e[r] || k) + er, e;
}
const Er = function(r, e) {
  let n = k, u = er, t = er;
  if (r != null) if (e !== void 0) {
    if (typeof r == "bigint") n = r;
    else {
      if (isNaN(r)) throw Vr();
      if (r % 1 !== 0) throw yt();
      n = BigInt(r);
    }
    if (typeof e == "bigint") u = e;
    else {
      if (isNaN(e)) throw Vr();
      if (e % 1 !== 0) throw yt();
      u = BigInt(e);
    }
    t = n * u;
  } else if (typeof r == "object") {
    if ("d" in r && "n" in r) n = BigInt(r.n), u = BigInt(r.d), "s" in r && (n *= BigInt(r.s));
    else if (0 in r) n = BigInt(r[0]), 1 in r && (u = BigInt(r[1]));
    else if (typeof r == "bigint") n = r;
    else throw Vr();
    t = n * u;
  } else if (typeof r == "number") {
    if (isNaN(r)) throw Vr();
    if (r < 0 && (t = -er, r = -r), r % 1 === 0) n = BigInt(r);
    else {
      let a = 1, s = 0, D = 1, c = 1, f = 1, o = 1e7;
      for (r >= 1 && (a = 10 ** Math.floor(1 + Math.log10(r)), r /= a); D <= o && f <= o; ) {
        let l = (s + c) / (D + f);
        if (r === l) {
          D + f <= o ? (n = s + c, u = D + f) : f > D ? (n = c, u = f) : (n = s, u = D);
          break;
        } else r > l ? (s += c, D += f) : (c += s, f += D), D > o ? (n = c, u = f) : (n = s, u = D);
      }
      n = BigInt(n) * BigInt(a), u = BigInt(u);
    }
  } else if (typeof r == "string") {
    let a = 0, s = k, D = k, c = k, f = er, o = er, l = r.replace(/_/g, "").match(/\d+|./g);
    if (l === null) throw Vr();
    if (l[a] === "-" ? (t = -er, a++) : l[a] === "+" && a++, l.length === a + 1 ? D = Ur(l[a++], t) : l[a + 1] === "." || l[a] === "." ? (l[a] !== "." && (s = Ur(l[a++], t)), a++, (a + 1 === l.length || l[a + 1] === "(" && l[a + 3] === ")" || l[a + 1] === "'" && l[a + 3] === "'") && (D = Ur(l[a], t), f = _r ** BigInt(l[a].length), a++), (l[a] === "(" && l[a + 2] === ")" || l[a] === "'" && l[a + 2] === "'") && (c = Ur(l[a + 1], t), o = _r ** BigInt(l[a + 1].length) - er, a += 3)) : l[a + 1] === "/" || l[a + 1] === ":" ? (D = Ur(l[a], t), f = Ur(l[a + 2], er), a += 3) : l[a + 3] === "/" && l[a + 1] === " " && (s = Ur(l[a], t), D = Ur(l[a + 2], t), f = Ur(l[a + 4], er), a += 5), l.length <= a) u = f * o, t = n = c + u * s + o * D;
    else throw Vr();
  } else if (typeof r == "bigint") n = r, t = r, u = er;
  else throw Vr();
  if (u === k) throw et();
  X.s = t < k ? -er : er, X.n = n < k ? -n : n, X.d = u < k ? -u : u;
};
function sa(r, e, n) {
  let u = er;
  for (; e > k; r = r * r % n, e >>= er) e & er && (u = u * r % n);
  return u;
}
function fa(r, e) {
  for (; e % oe === k; e /= oe) ;
  for (; e % Qe === k; e /= Qe) ;
  if (e === er) return k;
  let n = _r % e, u = 1;
  for (; n !== er; u++) if (n = n * _r % e, u > oa) return k;
  return BigInt(u);
}
function la(r, e, n) {
  let u = er, t = sa(_r, n, e);
  for (let a = 0; a < 300; a++) {
    if (u === t) return BigInt(a);
    u = u * _r % e, t = t * _r % e;
  }
  return 0;
}
function Wr(r, e) {
  if (!r) return e;
  if (!e) return r;
  for (; ; ) {
    if (r %= e, !r) return e;
    if (e %= r, !e) return r;
  }
}
function zr(r, e) {
  if (Er(r, e), this instanceof zr) r = Wr(X.d, X.n), this.s = X.s, this.n = X.n / r, this.d = X.d / r;
  else return hr(X.s * X.n, X.d);
}
var et = function() {
  return new Error("Division by Zero");
}, Vr = function() {
  return new Error("Invalid argument");
}, yt = function() {
  return new Error("Parameters must be integer");
};
zr.prototype = { s: er, n: k, d: er, abs: function() {
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
  if (r === void 0) return hr(this.s * this.n % this.d, er);
  if (Er(r, e), k === X.n * this.d) throw et();
  return hr(this.s * (X.d * this.n) % (X.n * this.d), X.d * this.d);
}, gcd: function(r, e) {
  return Er(r, e), hr(Wr(X.n, this.n) * Wr(X.d, this.d), X.d * this.d);
}, lcm: function(r, e) {
  return Er(r, e), X.n === k && this.n === k ? hr(k, er) : hr(X.n * this.n, Wr(X.n, this.n) * Wr(X.d, this.d));
}, inverse: function() {
  return hr(this.s * this.d, this.n);
}, pow: function(r, e) {
  if (Er(r, e), X.d === er) return X.s < k ? hr((this.s * this.d) ** X.n, this.n ** X.n) : hr((this.s * this.n) ** X.n, this.d ** X.n);
  if (this.s < k) return null;
  let n = jr(this.n), u = jr(this.d), t = er, a = er;
  for (let s in n) if (s !== "1") {
    if (s === "0") {
      t = k;
      break;
    }
    if (n[s] *= X.n, n[s] % X.d === k) n[s] /= X.d;
    else return null;
    t *= BigInt(s) ** n[s];
  }
  for (let s in u) if (s !== "1") {
    if (u[s] *= X.n, u[s] % X.d === k) u[s] /= X.d;
    else return null;
    a *= BigInt(s) ** u[s];
  }
  return X.s < k ? hr(a, t) : hr(t, a);
}, log: function(r, e) {
  if (Er(r, e), this.s <= k || X.s <= k) return null;
  const n = {}, u = jr(X.n), t = jr(X.d), a = jr(this.n), s = jr(this.d);
  for (const f in t) u[f] = (u[f] || k) - t[f];
  for (const f in s) a[f] = (a[f] || k) - s[f];
  for (const f in u) f !== "1" && (n[f] = true);
  for (const f in a) f !== "1" && (n[f] = true);
  let D = null, c = null;
  for (const f in n) {
    const o = u[f] || k, l = a[f] || k;
    if (o === k) {
      if (l !== k) return null;
      continue;
    }
    let m = l, v = o;
    const p = Wr(m, v);
    if (m /= p, v /= p, D === null && c === null) D = m, c = v;
    else if (m * c !== D * v) return null;
  }
  return D !== null && c !== null ? hr(D, c) : null;
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
  return (k < n) - (n < k);
}, ceil: function(r) {
  return r = _r ** BigInt(r || 0), hr(Or(this.s * r * this.n / this.d) + (r * this.n % this.d > k && this.s >= k ? er : k), r);
}, floor: function(r) {
  return r = _r ** BigInt(r || 0), hr(Or(this.s * r * this.n / this.d) - (r * this.n % this.d > k && this.s < k ? er : k), r);
}, round: function(r) {
  return r = _r ** BigInt(r || 0), hr(Or(this.s * r * this.n / this.d) + this.s * ((this.s >= k ? er : k) + oe * (r * this.n % this.d) > this.d ? er : k), r);
}, roundTo: function(r, e) {
  Er(r, e);
  const n = this.n * X.d, u = this.d * X.n, t = n % u;
  let a = Or(n / u);
  return t + t >= u && a++, hr(this.s * a * X.n, X.d);
}, divisible: function(r, e) {
  return Er(r, e), !(!(X.n * this.d) || this.n * X.d % (X.n * this.d));
}, valueOf: function() {
  return Number(this.s * this.n) / Number(this.d);
}, toString: function(r) {
  let e = this.n, n = this.d;
  r = r || 15;
  let u = fa(e, n), t = la(e, n, u), a = this.s < k ? "-" : "";
  if (a += Or(e / n), e %= n, e *= _r, e && (a += "."), u) {
    for (let s = t; s--; ) a += Or(e / n), e %= n, e *= _r;
    a += "(";
    for (let s = u; s--; ) a += Or(e / n), e %= n, e *= _r;
    a += ")";
  } else for (let s = r; e && s--; ) a += Or(e / n), e %= n, e *= _r;
  return a;
}, toFraction: function(r) {
  let e = this.n, n = this.d, u = this.s < k ? "-" : "";
  if (n === er) u += e;
  else {
    let t = Or(e / n);
    r && t > k && (u += t, u += " ", e %= n), u += e, u += "/", u += n;
  }
  return u;
}, toLatex: function(r) {
  let e = this.n, n = this.d, u = this.s < k ? "-" : "";
  if (n === er) u += e;
  else {
    let t = Or(e / n);
    r && t > k && (u += t, e %= n), u += "\\frac{", u += e, u += "}{", u += n, u += "}";
  }
  return u;
}, toContinued: function() {
  let r = this.n, e = this.d, n = [];
  do {
    n.push(Or(r / e));
    let u = r % e;
    r = e, e = u;
  } while (r !== er);
  return n;
}, simplify: function(r) {
  const e = BigInt(1 / (r || 1e-3) | 0), n = this.abs(), u = n.toContinued();
  for (let t = 1; t < u.length; t++) {
    let a = hr(u[t - 1], er);
    for (let D = t - 2; D >= 0; D--) a = a.inverse().add(u[D]);
    let s = a.sub(n);
    if (s.n * e < s.d) return a.mul(this.s);
  }
  return this;
} };
var ca = "Fraction", va = [], Da = G(ca, va, () => (Object.defineProperty(zr, "name", { value: "Fraction" }), zr.prototype.constructor = zr, zr.prototype.type = "Fraction", zr.prototype.isFraction = true, zr.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: String(this.s * this.n), d: String(this.d) };
}, zr.fromJSON = function(r) {
  return new zr(r);
}, zr), { isClass: true }), pa = "Matrix", da = [], ha = G(pa, da, () => {
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
function Ze(r, e, n) {
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
function ma(r, e) {
  if (typeof e == "function") return e(r);
  if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: n, precision: u, wordSize: t } = Cn(e);
  switch (n) {
    case "fixed":
      return ya(r, u);
    case "exponential":
      return At(r, u);
    case "engineering":
      return ga(r, u);
    case "bin":
      return Ze(r, 2, t);
    case "oct":
      return Ze(r, 8, t);
    case "hex":
      return Ze(r, 16, t);
    case "auto": {
      var a = Ft(e == null ? void 0 : e.lowerExp, -3), s = Ft(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero()) return "0";
      var D, c = r.toSignificantDigits(u), f = c.e;
      return f >= a && f < s ? D = c.toFixed() : D = At(r, u), D.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], l = arguments[4];
        return o !== "." ? o + l : l;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function ga(r, e) {
  var n = r.e, u = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -u)), a = t.toPrecision(e);
  if (a.includes("e")) {
    var s = r.constructor;
    a = new s(a).toFixed();
  }
  return a + "e" + (n >= 0 ? "+" : "") + u.toString();
}
function At(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function ya(r, e) {
  return r.toFixed(e);
}
function Ft(r, e) {
  return vr(r) ? r : Ar(r) ? r.toNumber() : e;
}
function dr(r, e) {
  var n = Aa(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function Aa(r, e) {
  if (typeof r == "number") return Je(r, e);
  if (Ar(r)) return ma(r, e);
  if (Fa(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
  if (Array.isArray(r)) return _n(r, e);
  if ($r(r)) return Et(r);
  if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function") return r.format(e);
    if (r && r.toString(e) !== {}.toString()) return r.toString(e);
    var n = Object.keys(r).map((u) => Et(u) + ": " + dr(r[u], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function Et(r) {
  for (var e = String(r), n = "", u = 0; u < e.length; ) {
    var t = e.charAt(u);
    n += t in Ct ? Ct[t] : t, u++;
  }
  return '"' + n + '"';
}
var Ct = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function _n(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", u = r.length, t = 0; t < u; t++) t !== 0 && (n += ", "), n += _n(r[t], e);
    return n += "]", n;
  } else return dr(r, e);
}
function Fa(r) {
  return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
}
function or(r, e, n) {
  if (!(this instanceof or)) throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
or.prototype = new RangeError();
or.prototype.constructor = RangeError;
or.prototype.name = "DimensionError";
or.prototype.isDimensionError = true;
function Gr(r, e, n) {
  if (!(this instanceof Gr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Gr.prototype = new RangeError();
Gr.prototype.constructor = RangeError;
Gr.prototype.name = "IndexError";
Gr.prototype.isIndexError = true;
function ir(r) {
  for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
  return e;
}
function Bn(r, e, n) {
  var u, t = r.length;
  if (t !== e[n]) throw new or(t, e[n]);
  if (n < e.length - 1) {
    var a = n + 1;
    for (u = 0; u < t; u++) {
      var s = r[u];
      if (!Array.isArray(s)) throw new or(e.length - 1, e.length, "<");
      Bn(r[u], e, a);
    }
  } else for (u = 0; u < t; u++) if (Array.isArray(r[u])) throw new or(e.length + 1, e.length, ">");
}
function wt(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r)) throw new or(r.length, 0);
  } else Bn(r, e, 0);
}
function yr(r, e) {
  if (r !== void 0) {
    if (!vr(r) || !pr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e) throw new Gr(r, e);
  }
}
function Ce(r, e, n) {
  if (!Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!vr(t) || !pr(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + dr(e) + ")");
  }), (vr(r) || Ar(r)) && (r = [r]);
  var u = n !== void 0 ? n : 0;
  return We(r, e, 0, u), r;
}
function We(r, e, n, u) {
  var t, a, s = r.length, D = e[n], c = Math.min(s, D);
  if (r.length = D, n < e.length - 1) {
    var f = n + 1;
    for (t = 0; t < c; t++) a = r[t], Array.isArray(a) || (a = [a], r[t] = a), We(a, e, f, u);
    for (t = c; t < D; t++) a = [], r[t] = a, We(a, e, f, u);
  } else {
    for (t = 0; t < c; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
    for (t = c; t < D; t++) r[t] = u;
  }
}
function tt(r, e) {
  var n = Ge(r, true), u = n.length;
  if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new or(0, u, "!=");
  e = nt(e, u);
  var t = xn(e);
  if (u !== t) throw new or(t, u, "!=");
  try {
    return Ea(n, e);
  } catch (a) {
    throw a instanceof or ? new or(t, u, "!=") : a;
  }
}
function nt(r, e) {
  var n = xn(r), u = r.slice(), t = -1, a = r.indexOf(t), s = r.indexOf(t, a + 1) >= 0;
  if (s) throw new Error("More than one wildcard in sizes");
  var D = a >= 0, c = e % n === 0;
  if (D) if (c) u[a] = -e / n;
  else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return u;
}
function xn(r) {
  return r.reduce((e, n) => e * n, 1);
}
function Ea(r, e) {
  for (var n = r, u, t = e.length - 1; t > 0; t--) {
    var a = e[t];
    u = [];
    for (var s = n.length / a, D = 0; D < s; D++) u.push(n.slice(D * a, (D + 1) * a));
    n = u;
  }
  return n;
}
function bt(r, e) {
  for (var n = ir(r); Array.isArray(r) && r.length === 1; ) r = r[0], n.shift();
  for (var u = n.length; n[u - 1] === 1; ) u--;
  return u < n.length && (r = Sn(r, u, 0), n.length = u), r;
}
function Sn(r, e, n) {
  var u, t;
  if (n < e) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = Sn(r[u], e, a);
  } else for (; Array.isArray(r); ) r = r[0];
  return r;
}
function Mn(r, e, n, u) {
  var t = u || ir(r);
  if (n) for (var a = 0; a < n; a++) r = [r], t.unshift(1);
  for (r = Nn(r, e, 0); t.length < e; ) t.push(1);
  return r;
}
function Nn(r, e, n) {
  var u, t;
  if (Array.isArray(r)) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = Nn(r[u], e, a);
  } else for (var s = n; s < e; s++) r = [r];
  return r;
}
function Ge(r) {
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
function Oe(r, e) {
  for (var n, u = 0, t = 0; t < r.length; t++) {
    var a = r[t], s = Array.isArray(a);
    if (t === 0 && s && (u = a.length), s && a.length !== u) return;
    var D = s ? Oe(a, e) : e(a);
    if (n === void 0) n = D;
    else if (n !== D) return "mixed";
  }
  return n;
}
function Tn(r, e, n, u) {
  if (u < n) {
    if (r.length !== e.length) throw new or(r.length, e.length);
    for (var t = [], a = 0; a < r.length; a++) t[a] = Tn(r[a], e[a], n, u + 1);
    return t;
  } else return r.concat(e);
}
function zn() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1) return r[0];
  if (r.length > 1) return r.slice(1).reduce(function(n, u) {
    return Tn(n, u, e, 0);
  }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function On() {
  for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
  for (var u = e.map((m) => m.length), t = Math.max(...u), a = new Array(t).fill(null), s = 0; s < e.length; s++) for (var D = e[s], c = u[s], f = 0; f < c; f++) {
    var o = t - c + f;
    D[f] > a[o] && (a[o] = D[f]);
  }
  for (var l = 0; l < e.length; l++) $n(e[l], a);
  return a;
}
function $n(r, e) {
  for (var n = e.length, u = r.length, t = 0; t < u; t++) {
    var a = n - u + t;
    if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(u, " with size ").concat(r[t], " to size ").concat(e[a]));
  }
}
function Ye(r, e) {
  var n = ir(r);
  if (Jr(n, e)) return r;
  $n(n, e);
  var u = On(n, e), t = u.length, a = [...Array(t - n.length).fill(1), ...n], s = wa(r);
  n.length < t && (s = tt(s, a), n = ir(s));
  for (var D = 0; D < t; D++) n[D] < u[D] && (s = Ca(s, u[D], D), n = ir(s));
  return s;
}
function Ca(r, e, n) {
  return zn(...Array(e).fill(r), n);
}
function In(r, e) {
  if (!Array.isArray(r)) throw new Error("Array expected");
  var n = ir(r);
  if (e.length !== n.length) throw new or(e.length, n.length);
  for (var u = 0; u < e.length; u++) yr(e[u], n[u]);
  return e.reduce((t, a) => t[a], r);
}
function _t(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  if (r.length === 0) return [];
  if (n) return a(r);
  var u = [];
  return t(r, 0);
  function t(s, D) {
    if (Array.isArray(s)) {
      for (var c = s.length, f = Array(c), o = 0; o < c; o++) u[D] = o, f[o] = t(s[o], D + 1);
      return f;
    } else return e(s, u.slice(0, D), r);
  }
  function a(s) {
    if (Array.isArray(s)) {
      for (var D = s.length, c = Array(D), f = 0; f < D; f++) c[f] = a(s[f]);
      return c;
    } else return e(s);
  }
}
function wa(r) {
  return Ne([], r);
}
function we(r, e, n) {
  var u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (Ae.isTypedFunction(r)) {
    var t;
    if (u) t = 1;
    else {
      var a = (e.isMatrix ? e.size() : ir(e)).map(() => 0), s = e.isMatrix ? e.get(a) : In(e, a);
      t = Ba(r, s, a, e);
    }
    var D;
    if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
      var c = ba(r, t);
      D = c !== void 0 ? c : r;
    } else D = r;
    return t >= 1 && t <= 3 ? { isUnary: t === 1, fn: function() {
      for (var o = arguments.length, l = new Array(o), m = 0; m < o; m++) l[m] = arguments[m];
      return Bt(D, l.slice(0, t), n, r.name);
    } } : { isUnary: false, fn: function() {
      for (var o = arguments.length, l = new Array(o), m = 0; m < o; m++) l[m] = arguments[m];
      return Bt(D, l, n, r.name);
    } };
  }
  return u === void 0 ? { isUnary: _a(r), fn: r } : { isUnary: u, fn: r };
}
function ba(r, e) {
  var n = [];
  if (Object.entries(r.signatures).forEach((u) => {
    var [t, a] = u;
    t.split(",").length === e && n.push(a);
  }), n.length === 1) return n[0];
}
function _a(r) {
  if (r.length !== 1) return false;
  var e = r.toString();
  if (/arguments/.test(e)) return false;
  var n = e.match(/\(.*?\)/);
  return !/\.\.\./.test(n);
}
function Ba(r, e, n, u) {
  for (var t = [e, n, u], a = 3; a > 0; a--) {
    var s = t.slice(0, a);
    if (Ae.resolve(r, s) !== null) return a;
  }
}
function Bt(r, e, n, u) {
  try {
    return r(...e);
  } catch (t) {
    xa(t, e, n, u);
  }
}
function xa(r, e, n, u) {
  var t;
  if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
    var a = [];
    throw a.push("value: ".concat(Ir(e[0]))), e.length >= 2 && a.push("index: ".concat(Ir(e[1]))), e.length >= 3 && a.push("array: ".concat(Ir(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(u, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
  } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(u, ": ").concat(r.message));
}
var Sa = "DenseMatrix", Ma = ["Matrix"], Na = G(Sa, Ma, (r) => {
  var { Matrix: e } = r;
  function n(o, l) {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    if (l && !$r(l)) throw new Error("Invalid datatype: " + l);
    if (lr(o)) o.type === "DenseMatrix" ? (this._data = ar(o._data), this._size = ar(o._size), this._datatype = l || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = l || o._datatype);
    else if (o && mr(o.data) && mr(o.size)) this._data = o.data, this._size = o.size, wt(this._data, this._size), this._datatype = l || o.datatype;
    else if (mr(o)) this._data = f(o), this._size = ir(this._data), wt(this._data, this._size), this._datatype = l;
    else {
      if (o) throw new TypeError("Unsupported type of data (" + Ir(o) + ")");
      this._data = [], this._size = [0], this._datatype = l;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(o, l) {
    return new n(o, l);
  }, Object.defineProperty(n, "name", { value: "DenseMatrix" }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
    return Oe(this._data, Ir);
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
    return In(this._data, o);
  }, n.prototype.set = function(o, l, m) {
    if (!mr(o)) throw new TypeError("Array expected");
    if (o.length < this._size.length) throw new or(o.length, this._size.length, "<");
    var v, p, i, d = o.map(function(w) {
      return w + 1;
    });
    c(this, d, m);
    var g = this._data;
    for (v = 0, p = o.length - 1; v < p; v++) i = o[v], yr(i, g.length), g = g[i];
    return i = o[o.length - 1], yr(i, g.length), g[i] = l, this;
  };
  function u(o, l) {
    if (!ke(l)) throw new TypeError("Invalid index");
    var m = l.isScalar();
    if (m) return o.get(l.min());
    var v = l.size();
    if (v.length !== o._size.length) throw new or(v.length, o._size.length);
    for (var p = l.min(), i = l.max(), d = 0, g = o._size.length; d < g; d++) yr(p[d], o._size[d]), yr(i[d], o._size[d]);
    return new n(t(o._data, l, v.length, 0), o._datatype);
  }
  function t(o, l, m, v) {
    var p = v === m - 1, i = l.dimension(v);
    return p ? i.map(function(d) {
      return yr(d, o.length), o[d];
    }).valueOf() : i.map(function(d) {
      yr(d, o.length);
      var g = o[d];
      return t(g, l, m, v + 1);
    }).valueOf();
  }
  function a(o, l, m, v) {
    if (!l || l.isIndex !== true) throw new TypeError("Invalid index");
    var p = l.size(), i = l.isScalar(), d;
    if (lr(m) ? (d = m.size(), m = m.valueOf()) : d = ir(m), i) {
      if (d.length !== 0) throw new TypeError("Scalar expected");
      o.set(l.min(), m, v);
    } else {
      if (!Jr(d, p)) try {
        d.length === 0 ? m = Ye([m], p) : m = Ye(m, p), d = ir(m);
      } catch {
      }
      if (p.length < o._size.length) throw new or(p.length, o._size.length, "<");
      if (d.length < p.length) {
        for (var g = 0, w = 0; p[g] === 1 && d[g] === 1; ) g++;
        for (; p[g] === 1; ) w++, g++;
        m = Mn(m, p.length, w, d);
      }
      if (!Jr(p, d)) throw new or(p, d, ">");
      var A = l.max().map(function(F) {
        return F + 1;
      });
      c(o, A, v);
      var _ = p.length, E = 0;
      s(o._data, l, m, _, E);
    }
    return o;
  }
  function s(o, l, m, v, p) {
    var i = p === v - 1, d = l.dimension(p);
    i ? d.forEach(function(g, w) {
      yr(g), o[g] = m[w[0]];
    }) : d.forEach(function(g, w) {
      yr(g), s(o[g], l, m[w[0]], v, p + 1);
    });
  }
  n.prototype.resize = function(o, l, m) {
    if (!Ee(o)) throw new TypeError("Array or Matrix expected");
    var v = o.valueOf().map((i) => Array.isArray(i) && i.length === 1 ? i[0] : i), p = m ? this.clone() : this;
    return D(p, v, l);
  };
  function D(o, l, m) {
    if (l.length === 0) {
      for (var v = o._data; mr(v); ) v = v[0];
      return v;
    }
    return o._size = l.slice(0), o._data = Ce(o._data, o._size, m), o;
  }
  n.prototype.reshape = function(o, l) {
    var m = l ? this.clone() : this;
    m._data = tt(m._data, o);
    var v = m._size.reduce((p, i) => p * i);
    return m._size = nt(o, v), m;
  };
  function c(o, l, m) {
    for (var v = o._size.slice(0), p = false; v.length < l.length; ) v.push(0), p = true;
    for (var i = 0, d = l.length; i < d; i++) l[i] > v[i] && (v[i] = l[i], p = true);
    p && D(o, v, m);
  }
  n.prototype.clone = function() {
    var o = new n({ data: ar(this._data), size: ar(this._size), datatype: this._datatype });
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
    function i(g) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (w < m) for (var A = 0; A < g.length; A++) p[w] = A, i(g[A], w + 1);
      else for (var _ = 0; _ < g.length; _++) p[w] = _, o(g, _, p.slice());
    }
    function d(g) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (w < m) for (var A = 0; A < g.length; A++) d(g[A], w + 1);
      else for (var _ = 0; _ < g.length; _++) o(g, _);
    }
  }, n.prototype.map = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, m = this, v = new n(m), p = we(o, m._data, "map", l), i = l || p.isUnary ? (d, g) => {
      d[g] = p.fn(d[g]);
    } : (d, g, w) => {
      d[g] = p.fn(d[g], w, m);
    };
    return v._forEach(i), v;
  }, n.prototype.forEach = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, m = this, v = we(o, m._data, "map", l), p = l || v.isUnary ? (i, d) => {
      v.fn(i[d]);
    } : (i, d, g) => {
      v.fn(i[d], g, m);
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
        if (d < o) for (var g = 0; g < i.length; g++) m[d] = g, yield* v(i[g], d + 1);
        else for (var w = 0; w < i.length; w++) m[d] = w, yield { value: i[w], index: m.slice() };
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
    for (var v = this._data, p = function(g) {
      var w = v.map((A) => [A[g]]);
      l.push(new n(w, o._datatype));
    }, i = 0; i < m[1]; i++) p(i);
    return l;
  }, n.prototype.toArray = function() {
    return ar(this._data);
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
    for (var l = o > 0 ? o : 0, m = o < 0 ? -o : 0, v = this._size[0], p = this._size[1], i = Math.min(v - m, p - l), d = [], g = 0; g < i; g++) d[g] = this._data[g + m][g + l];
    return new n({ data: d, size: [i], datatype: this._datatype });
  }, n.diagonal = function(o, l, m, v) {
    if (!mr(o)) throw new TypeError("Array expected, size parameter");
    if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(B) {
      if (Ar(B) && (B = B.toNumber()), !vr(B) || !pr(B) || B < 1) throw new Error("Size values must be positive integers");
      return B;
    }), m) {
      if (Ar(m) && (m = m.toNumber()), !vr(m) || !pr(m)) throw new TypeError("The parameter k must be an integer number");
    } else m = 0;
    var p = m > 0 ? m : 0, i = m < 0 ? -m : 0, d = o[0], g = o[1], w = Math.min(d - i, g - p), A;
    if (mr(l)) {
      if (l.length !== w) throw new Error("Invalid value array length");
      A = function(C) {
        return l[C];
      };
    } else if (lr(l)) {
      var _ = l.size();
      if (_.length !== 1 || _[0] !== w) throw new Error("Invalid matrix length");
      A = function(C) {
        return l.get([C]);
      };
    } else A = function() {
      return l;
    };
    v || (v = Ar(A(0)) ? A(0).mul(0) : 0);
    var E = [];
    if (o.length > 0) {
      E = Ce(E, o, v);
      for (var F = 0; F < w; F++) E[F + i][F + p] = A(F);
    }
    return new n({ data: E, size: [d, g] });
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
  function f(o) {
    return lr(o) ? f(o.valueOf()) : mr(o) ? o.map(f) : o;
  }
  return n;
}, { isClass: true });
function Nr(r, e, n) {
  if (!n) return lr(r) ? r.map((t) => e(t), false, true) : _t(r, e, true);
  var u = (t) => t === 0 ? t : e(t);
  return lr(r) ? r.map((t) => u(t), false, true) : _t(r, u, true);
}
var xt = "isInteger", Ta = ["typed"], za = G(xt, Ta, (r) => {
  var { typed: e } = r;
  return e(xt, { number: pr, BigNumber: function(u) {
    return u.isInt();
  }, bigint: function(u) {
    return true;
  }, Fraction: function(u) {
    return u.d === 1n;
  }, "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n)) });
}), ut = "number", $e = "number, number";
function qn(r) {
  return Math.abs(r);
}
qn.signature = ut;
function Rn(r, e) {
  return r + e;
}
Rn.signature = $e;
function Un(r, e) {
  return r - e;
}
Un.signature = $e;
function Pn(r, e) {
  return r * e;
}
Pn.signature = $e;
function Ln(r) {
  return -r;
}
Ln.signature = ut;
function Xe(r) {
  return Gu(r);
}
Xe.signature = ut;
function Vn(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
Vn.signature = $e;
var Oa = "number";
function Zn(r) {
  return r > 0;
}
Zn.signature = Oa;
function ee(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), u));
}
var St = "isPositive", $a = ["typed", "config"], Ia = G(St, $a, (r) => {
  var { typed: e, config: n } = r;
  return e(St, { number: (u) => Pr(u, 0, n.relTol, n.absTol) ? false : Zn(u), BigNumber: (u) => ee(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(), bigint: (u) => u > 0n, Fraction: (u) => u.s > 0n && u.n > 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
}), Mt = "isZero", qa = ["typed", "equalScalar"], Ra = G(Mt, qa, (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(Mt, { "number | BigNumber | Complex | Fraction": (u) => n(u, 0), bigint: (u) => u === 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
});
function Ua(r, e, n, u) {
  return Pr(r.re, e.re, n, u) && Pr(r.im, e.im, n, u);
}
var se = G("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
    return e.find(n, [u.valueType(), t.valueType()])(u.value, t.value);
  }) };
}), be = "equalScalar", Pa = ["typed", "config"], La = G(be, Pa, (r) => {
  var { typed: e, config: n } = r, u = se({ typed: e });
  return e(be, { "boolean, boolean": function(a, s) {
    return a === s;
  }, "number, number": function(a, s) {
    return Pr(a, s, n.relTol, n.absTol);
  }, "BigNumber, BigNumber": function(a, s) {
    return a.eq(s) || ee(a, s, n.relTol, n.absTol);
  }, "bigint, bigint": function(a, s) {
    return a === s;
  }, "Fraction, Fraction": function(a, s) {
    return a.equals(s);
  }, "Complex, Complex": function(a, s) {
    return Ua(a, s, n.relTol, n.absTol);
  } }, u);
});
G(be, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(be, { "number, number": function(t, a) {
    return Pr(t, a, n.relTol, n.absTol);
  } });
});
var Va = "SparseMatrix", Za = ["typed", "equalScalar", "Matrix"], Ja = G(Va, Za, (r) => {
  var { typed: e, equalScalar: n, Matrix: u } = r;
  function t(i, d) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (d && !$r(d)) throw new Error("Invalid datatype: " + d);
    if (lr(i)) a(this, i, d);
    else if (i && mr(i.index) && mr(i.ptr) && mr(i.size)) this._values = i.values, this._index = i.index, this._ptr = i.ptr, this._size = i.size, this._datatype = d || i.datatype;
    else if (mr(i)) s(this, i, d);
    else {
      if (i) throw new TypeError("Unsupported type of data (" + Ir(i) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = d;
    }
  }
  function a(i, d, g) {
    d.type === "SparseMatrix" ? (i._values = d._values ? ar(d._values) : void 0, i._index = ar(d._index), i._ptr = ar(d._ptr), i._size = ar(d._size), i._datatype = g || d._datatype) : s(i, d.valueOf(), g || d._datatype);
  }
  function s(i, d, g) {
    i._values = [], i._index = [], i._ptr = [], i._datatype = g;
    var w = d.length, A = 0, _ = n, E = 0;
    if ($r(g) && (_ = e.find(n, [g, g]) || n, E = e.convert(0, g)), w > 0) {
      var F = 0;
      do {
        i._ptr.push(i._index.length);
        for (var B = 0; B < w; B++) {
          var C = d[B];
          if (mr(C)) {
            if (F === 0 && A < C.length && (A = C.length), F < C.length) {
              var y = C[F];
              _(y, E) || (i._values.push(y), i._index.push(B));
            }
          } else F === 0 && A < 1 && (A = 1), _(C, E) || (i._values.push(C), i._index.push(B));
        }
        F++;
      } while (F < A);
    }
    i._ptr.push(i._index.length), i._size = [w, A];
  }
  t.prototype = new u(), t.prototype.createSparseMatrix = function(i, d) {
    return new t(i, d);
  }, Object.defineProperty(t, "name", { value: "SparseMatrix" }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
    return Oe(this._values, Ir);
  }, t.prototype.storage = function() {
    return "sparse";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(i, d) {
    return new t(i, d);
  }, t.prototype.density = function() {
    var i = this._size[0], d = this._size[1];
    return i !== 0 && d !== 0 ? this._index.length / (i * d) : 0;
  }, t.prototype.subset = function(i, d, g) {
    if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return D(this, i);
      case 2:
      case 3:
        return c(this, i, d, g);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function D(i, d) {
    if (!ke(d)) throw new TypeError("Invalid index");
    var g = d.isScalar();
    if (g) return i.get(d.min());
    var w = d.size();
    if (w.length !== i._size.length) throw new or(w.length, i._size.length);
    var A, _, E, F, B = d.min(), C = d.max();
    for (A = 0, _ = i._size.length; A < _; A++) yr(B[A], i._size[A]), yr(C[A], i._size[A]);
    var y = i._values, x = i._index, h = i._ptr, b = d.dimension(0), M = d.dimension(1), S = [], z = [];
    b.forEach(function(O, P) {
      z[O] = P[0], S[O] = true;
    });
    var N = y ? [] : void 0, I = [], T = [];
    return M.forEach(function(O) {
      for (T.push(I.length), E = h[O], F = h[O + 1]; E < F; E++) A = x[E], S[A] === true && (I.push(z[A]), N && N.push(y[E]));
    }), T.push(I.length), new t({ values: N, index: I, ptr: T, size: w, datatype: i._datatype });
  }
  function c(i, d, g, w) {
    if (!d || d.isIndex !== true) throw new TypeError("Invalid index");
    var A = d.size(), _ = d.isScalar(), E;
    if (lr(g) ? (E = g.size(), g = g.toArray()) : E = ir(g), _) {
      if (E.length !== 0) throw new TypeError("Scalar expected");
      i.set(d.min(), g, w);
    } else {
      if (A.length !== 1 && A.length !== 2) throw new or(A.length, i._size.length, "<");
      if (E.length < A.length) {
        for (var F = 0, B = 0; A[F] === 1 && E[F] === 1; ) F++;
        for (; A[F] === 1; ) B++, F++;
        g = Mn(g, A.length, B, E);
      }
      if (!Jr(A, E)) throw new or(A, E, ">");
      if (A.length === 1) {
        var C = d.dimension(0);
        C.forEach(function(h, b) {
          yr(h), i.set([h, 0], g[b[0]], w);
        });
      } else {
        var y = d.dimension(0), x = d.dimension(1);
        y.forEach(function(h, b) {
          yr(h), x.forEach(function(M, S) {
            yr(M), i.set([h, M], g[b[0]][S[0]], w);
          });
        });
      }
    }
    return i;
  }
  t.prototype.get = function(i) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new or(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
    var d = i[0], g = i[1];
    yr(d, this._size[0]), yr(g, this._size[1]);
    var w = f(d, this._ptr[g], this._ptr[g + 1], this._index);
    return w < this._ptr[g + 1] && this._index[w] === d ? this._values[w] : 0;
  }, t.prototype.set = function(i, d, g) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new or(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = i[0], A = i[1], _ = this._size[0], E = this._size[1], F = n, B = 0;
    $r(this._datatype) && (F = e.find(n, [this._datatype, this._datatype]) || n, B = e.convert(0, this._datatype)), (w > _ - 1 || A > E - 1) && (m(this, Math.max(w + 1, _), Math.max(A + 1, E), g), _ = this._size[0], E = this._size[1]), yr(w, _), yr(A, E);
    var C = f(w, this._ptr[A], this._ptr[A + 1], this._index);
    return C < this._ptr[A + 1] && this._index[C] === w ? F(d, B) ? o(C, A, this._values, this._index, this._ptr) : this._values[C] = d : F(d, B) || l(C, w, A, d, this._values, this._index, this._ptr), this;
  };
  function f(i, d, g, w) {
    if (g - d === 0) return g;
    for (var A = d; A < g; A++) if (w[A] === i) return A;
    return d;
  }
  function o(i, d, g, w, A) {
    g.splice(i, 1), w.splice(i, 1);
    for (var _ = d + 1; _ < A.length; _++) A[_]--;
  }
  function l(i, d, g, w, A, _, E) {
    A.splice(i, 0, w), _.splice(i, 0, d);
    for (var F = g + 1; F < E.length; F++) E[F]++;
  }
  t.prototype.resize = function(i, d, g) {
    if (!Ee(i)) throw new TypeError("Array or Matrix expected");
    var w = i.valueOf().map((_) => Array.isArray(_) && _.length === 1 ? _[0] : _);
    if (w.length !== 2) throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(_) {
      if (!vr(_) || !pr(_) || _ < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + dr(w) + ")");
    });
    var A = g ? this.clone() : this;
    return m(A, w[0], w[1], d);
  };
  function m(i, d, g, w) {
    var A = w || 0, _ = n, E = 0;
    $r(i._datatype) && (_ = e.find(n, [i._datatype, i._datatype]) || n, E = e.convert(0, i._datatype), A = e.convert(A, i._datatype));
    var F = !_(A, E), B = i._size[0], C = i._size[1], y, x, h;
    if (g > C) {
      for (x = C; x < g; x++) if (i._ptr[x] = i._values.length, F) for (y = 0; y < B; y++) i._values.push(A), i._index.push(y);
      i._ptr[g] = i._values.length;
    } else g < C && (i._ptr.splice(g + 1, C - g), i._values.splice(i._ptr[g], i._values.length), i._index.splice(i._ptr[g], i._index.length));
    if (C = g, d > B) {
      if (F) {
        var b = 0;
        for (x = 0; x < C; x++) {
          i._ptr[x] = i._ptr[x] + b, h = i._ptr[x + 1] + b;
          var M = 0;
          for (y = B; y < d; y++, M++) i._values.splice(h + M, 0, A), i._index.splice(h + M, 0, y), b++;
        }
        i._ptr[C] = i._values.length;
      }
    } else if (d < B) {
      var S = 0;
      for (x = 0; x < C; x++) {
        i._ptr[x] = i._ptr[x] - S;
        var z = i._ptr[x], N = i._ptr[x + 1] - S;
        for (h = z; h < N; h++) y = i._index[h], y > d - 1 && (i._values.splice(h, 1), i._index.splice(h, 1), S++);
      }
      i._ptr[x] = i._values.length;
    }
    return i._size[0] = d, i._size[1] = g, i;
  }
  t.prototype.reshape = function(i, d) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    i.forEach(function(O) {
      if (!vr(O) || !pr(O) || O <= -2 || O === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + dr(i) + ")");
    });
    var g = this._size[0] * this._size[1];
    i = nt(i, g);
    var w = i[0] * i[1];
    if (g !== w) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var A = d ? this.clone() : this;
    if (this._size[0] === i[0] && this._size[1] === i[1]) return A;
    for (var _ = [], E = 0; E < A._ptr.length; E++) for (var F = 0; F < A._ptr[E + 1] - A._ptr[E]; F++) _.push(E);
    for (var B = A._values.slice(), C = A._index.slice(), y = 0; y < A._index.length; y++) {
      var x = C[y], h = _[y], b = x * A._size[1] + h;
      _[y] = b % i[1], C[y] = Math.floor(b / i[1]);
    }
    A._values.length = 0, A._index.length = 0, A._ptr.length = i[1] + 1, A._size = i.slice();
    for (var M = 0; M < A._ptr.length; M++) A._ptr[M] = 0;
    for (var S = 0; S < B.length; S++) {
      var z = C[S], N = _[S], I = B[S], T = f(z, A._ptr[N], A._ptr[N + 1], A._index);
      l(T, z, N, I, A._values, A._index, A._ptr);
    }
    return A;
  }, t.prototype.clone = function() {
    var i = new t({ values: this._values ? ar(this._values) : void 0, index: ar(this._index), ptr: ar(this._ptr), size: ar(this._size), datatype: this._datatype });
    return i;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(i, d) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var g = this, w = this._size[0], A = this._size[1], _ = we(i, g, "map"), E = function(B, C, y) {
      return _.fn(B, [C, y], g);
    };
    return v(this, 0, w - 1, 0, A - 1, E, d);
  };
  function v(i, d, g, w, A, _, E) {
    var F = [], B = [], C = [], y = n, x = 0;
    $r(i._datatype) && (y = e.find(n, [i._datatype, i._datatype]) || n, x = e.convert(0, i._datatype));
    for (var h = function(q, V, Y) {
      var Z = _(q, V, Y);
      y(Z, x) || (F.push(Z), B.push(V));
    }, b = w; b <= A; b++) {
      C.push(F.length);
      var M = i._ptr[b], S = i._ptr[b + 1];
      if (E) for (var z = M; z < S; z++) {
        var N = i._index[z];
        N >= d && N <= g && h(i._values[z], N - d, b - w);
      }
      else {
        for (var I = {}, T = M; T < S; T++) {
          var O = i._index[T];
          I[O] = i._values[T];
        }
        for (var P = d; P <= g; P++) {
          var W = P in I ? I[P] : 0;
          h(W, P - d, b - w);
        }
      }
    }
    return C.push(F.length), new t({ values: F, index: B, ptr: C, size: [g - d + 1, A - w + 1] });
  }
  t.prototype.forEach = function(i, d) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var g = this, w = this._size[0], A = this._size[1], _ = we(i, g, "forEach"), E = 0; E < A; E++) {
      var F = this._ptr[E], B = this._ptr[E + 1];
      if (d) for (var C = F; C < B; C++) {
        var y = this._index[C];
        _.fn(this._values[C], [y, E], g);
      }
      else {
        for (var x = {}, h = F; h < B; h++) {
          var b = this._index[h];
          x[b] = this._values[h];
        }
        for (var M = 0; M < w; M++) {
          var S = M in x ? x[M] : 0;
          _.fn(S, [M, E], g);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var i = this._size[1], d = 0; d < i; d++) for (var g = this._ptr[d], w = this._ptr[d + 1], A = g; A < w; A++) {
      var _ = this._index[A];
      yield { value: this._values[A], index: [_, d] };
    }
  }, t.prototype.toArray = function() {
    return p(this._values, this._index, this._ptr, this._size, true);
  }, t.prototype.valueOf = function() {
    return p(this._values, this._index, this._ptr, this._size, false);
  };
  function p(i, d, g, w, A) {
    var _ = w[0], E = w[1], F = [], B, C;
    for (B = 0; B < _; B++) for (F[B] = [], C = 0; C < E; C++) F[B][C] = 0;
    for (C = 0; C < E; C++) for (var y = g[C], x = g[C + 1], h = y; h < x; h++) B = d[h], F[B][C] = i ? A ? ar(i[h]) : i[h] : 1;
    return F;
  }
  return t.prototype.format = function(i) {
    for (var d = this._size[0], g = this._size[1], w = this.density(), A = "Sparse Matrix [" + dr(d, i) + " x " + dr(g, i) + "] density: " + dr(w, i) + `
`, _ = 0; _ < g; _++) for (var E = this._ptr[_], F = this._ptr[_ + 1], B = E; B < F; B++) {
      var C = this._index[B];
      A += `
    (` + dr(C, i) + ", " + dr(_, i) + ") ==> " + (this._values ? dr(this._values[B], i) : "X");
    }
    return A;
  }, t.prototype.toString = function() {
    return dr(this.toArray());
  }, t.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(i) {
    if (i) {
      if (Ar(i) && (i = i.toNumber()), !vr(i) || !pr(i)) throw new TypeError("The parameter k must be an integer number");
    } else i = 0;
    var d = i > 0 ? i : 0, g = i < 0 ? -i : 0, w = this._size[0], A = this._size[1], _ = Math.min(w - g, A - d), E = [], F = [], B = [];
    B[0] = 0;
    for (var C = d; C < A && E.length < _; C++) for (var y = this._ptr[C], x = this._ptr[C + 1], h = y; h < x; h++) {
      var b = this._index[h];
      if (b === C - d + g) {
        E.push(this._values[h]), F[E.length - 1] = b - g;
        break;
      }
    }
    return B.push(E.length), new t({ values: E, index: F, ptr: B, size: [_, 1] });
  }, t.fromJSON = function(i) {
    return new t(i);
  }, t.diagonal = function(i, d, g, w, A) {
    if (!mr(i)) throw new TypeError("Array expected, size parameter");
    if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (i = i.map(function(O) {
      if (Ar(O) && (O = O.toNumber()), !vr(O) || !pr(O) || O < 1) throw new Error("Size values must be positive integers");
      return O;
    }), g) {
      if (Ar(g) && (g = g.toNumber()), !vr(g) || !pr(g)) throw new TypeError("The parameter k must be an integer number");
    } else g = 0;
    var _ = n, E = 0;
    $r(A) && (_ = e.find(n, [A, A]) || n, E = e.convert(0, A));
    var F = g > 0 ? g : 0, B = g < 0 ? -g : 0, C = i[0], y = i[1], x = Math.min(C - B, y - F), h;
    if (mr(d)) {
      if (d.length !== x) throw new Error("Invalid value array length");
      h = function(P) {
        return d[P];
      };
    } else if (lr(d)) {
      var b = d.size();
      if (b.length !== 1 || b[0] !== x) throw new Error("Invalid matrix length");
      h = function(P) {
        return d.get([P]);
      };
    } else h = function() {
      return d;
    };
    for (var M = [], S = [], z = [], N = 0; N < y; N++) {
      z.push(M.length);
      var I = N - F;
      if (I >= 0 && I < x) {
        var T = h(I);
        _(T, E) || (S.push(I + B), M.push(T));
      }
    }
    return z.push(M.length), new t({ values: M, index: S, ptr: z, size: [C, y] });
  }, t.prototype.swapRows = function(i, d) {
    if (!vr(i) || !pr(i) || !vr(d) || !pr(d)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return yr(i, this._size[0]), yr(d, this._size[0]), t._swapRows(i, d, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(i, d, g, w, A) {
    for (var _ = w[i], E = w[i + 1], F = _; F < E; F++) A(g[F], d[F]);
  }, t._swapRows = function(i, d, g, w, A, _) {
    for (var E = 0; E < g; E++) {
      var F = _[E], B = _[E + 1], C = f(i, F, B, A), y = f(d, F, B, A);
      if (C < B && y < B && A[C] === i && A[y] === d) {
        if (w) {
          var x = w[C];
          w[C] = w[y], w[y] = x;
        }
        continue;
      }
      if (C < B && A[C] === i && (y >= B || A[y] !== d)) {
        var h = w ? w[C] : void 0;
        A.splice(y, 0, d), w && w.splice(y, 0, h), A.splice(y <= C ? C + 1 : C, 1), w && w.splice(y <= C ? C + 1 : C, 1);
        continue;
      }
      if (y < B && A[y] === d && (C >= B || A[C] !== i)) {
        var b = w ? w[y] : void 0;
        A.splice(C, 0, i), w && w.splice(C, 0, b), A.splice(C <= y ? y + 1 : y, 1), w && w.splice(C <= y ? y + 1 : y, 1);
      }
    }
  }, t;
}, { isClass: true }), Qa = "number", Wa = ["typed"];
function Ga(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], u = e[2], t = e[3];
    return { input: r, radix: n, integerPart: u, fractionalPart: t };
  } else return null;
}
function Ya(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, u = 0; u < r.fractionalPart.length; u++) {
    var t = parseInt(r.fractionalPart[u], r.radix);
    n += t / Math.pow(r.radix, u + 1);
  }
  var a = e + n;
  if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return a;
}
var Xa = G(Qa, Wa, (r) => {
  var { typed: e } = r, n = e("number", { "": function() {
    return 0;
  }, number: function(t) {
    return t;
  }, string: function(t) {
    if (t === "NaN") return NaN;
    var a = Ga(t);
    if (a) return Ya(a);
    var s = 0, D = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    D && (s = Number(D[2]), t = D[1]);
    var c = Number(t);
    if (isNaN(c)) throw new SyntaxError('String "' + t + '" is not a valid number');
    if (D) {
      if (c > 2 ** s - 1) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      c >= 2 ** (s - 1) && (c = c - 2 ** s);
    }
    return c;
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
  return n.fromJSON = function(u) {
    return parseFloat(u.value);
  }, n;
}), Ka = "bignumber", Ha = ["typed", "BigNumber"], ja = G(Ka, Ha, (r) => {
  var { typed: e, BigNumber: n } = r;
  return e("bignumber", { "": function() {
    return new n(0);
  }, number: function(t) {
    return new n(t + "");
  }, string: function(t) {
    var a = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (a) {
      var s = a[2], D = n(a[1]), c = new n(2).pow(Number(s));
      if (D.gt(c.sub(1))) throw new SyntaxError('String "'.concat(t, '" is out of range'));
      var f = new n(2).pow(Number(s) - 1);
      return D.gte(f) ? D.sub(c) : D;
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
}), ka = "complex", ri = ["typed", "Complex"], ei = G(ka, ri, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
}), ti = "fraction", ni = ["typed", "Fraction"], ui = G(ti, ni, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
}), Nt = "matrix", ai = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], ii = G(Nt, ai, (r) => {
  var { typed: e, Matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(Nt, { "": function() {
    return a([]);
  }, string: function(D) {
    return a([], D);
  }, "string, string": function(D, c) {
    return a([], D, c);
  }, Array: function(D) {
    return a(D);
  }, Matrix: function(D) {
    return a(D, D.storage());
  }, "Array | Matrix, string": a, "Array | Matrix, string, string": a });
  function a(s, D, c) {
    if (D === "dense" || D === "default" || D === void 0) return new u(s, c);
    if (D === "sparse") return new t(s, c);
    throw new TypeError("Unknown matrix type " + JSON.stringify(D) + ".");
  }
}), Tt = "matrixFromColumns", oi = ["typed", "matrix", "flatten", "size"], si = G(Tt, oi, (r) => {
  var { typed: e, matrix: n, flatten: u, size: t } = r;
  return e(Tt, { "...Array": function(c) {
    return a(c);
  }, "...Matrix": function(c) {
    return n(a(c.map((f) => f.toArray())));
  } });
  function a(D) {
    if (D.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
    for (var c = s(D[0]), f = [], o = 0; o < c; o++) f[o] = [];
    for (var l of D) {
      var m = s(l);
      if (m !== c) throw new TypeError("The vectors had different length: " + (c | 0) + " \u2260 " + (m | 0));
      for (var v = u(l), p = 0; p < c; p++) f[p].push(v[p]);
    }
    return f;
  }
  function s(D) {
    var c = t(D);
    if (c.length === 1) return c[0];
    if (c.length === 2) {
      if (c[0] === 1) return c[1];
      if (c[1] === 1) return c[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), zt = "unaryMinus", fi = ["typed"], li = G(zt, fi, (r) => {
  var { typed: e } = r;
  return e(zt, { number: Ln, "Complex | BigNumber | Fraction": (n) => n.neg(), bigint: (n) => -n, Unit: e.referToSelf((n) => (u) => {
    var t = u.clone();
    return t.value = e.find(n, t.valueType())(u.value), t;
  }), "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n, true)) });
}), Ot = "abs", ci = ["typed"], vi = G(Ot, ci, (r) => {
  var { typed: e } = r;
  return e(Ot, { number: qn, "Complex | BigNumber | Fraction | Unit": (n) => n.abs(), bigint: (n) => n < 0n ? -n : n, "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n, true)) });
}), $t = "addScalar", Di = ["typed"], pi = G($t, Di, (r) => {
  var { typed: e } = r;
  return e($t, { "number, number": Rn, "Complex, Complex": function(u, t) {
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
}), It = "subtractScalar", di = ["typed"], hi = G(It, di, (r) => {
  var { typed: e } = r;
  return e(It, { "number, number": Un, "Complex, Complex": function(u, t) {
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
}), mi = "matAlgo11xS0s", gi = ["typed", "equalScalar"], Jn = G(mi, gi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s, D) {
    var c = t._values, f = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = n, g = 0, w = s;
    typeof m == "string" && (i = m, d = e.find(n, [i, i]), g = e.convert(0, i), a = e.convert(a, i), w = e.find(s, [i, i]));
    for (var A = [], _ = [], E = [], F = 0; F < p; F++) {
      E[F] = _.length;
      for (var B = o[F], C = o[F + 1], y = B; y < C; y++) {
        var x = f[y], h = D ? w(a, c[y]) : w(c[y], a);
        d(h, g) || (_.push(x), A.push(h));
      }
    }
    return E[p] = _.length, t.createSparseMatrix({ values: A, index: _, ptr: E, size: [v, p], datatype: i });
  };
}), yi = "matAlgo12xSfs", Ai = ["typed", "DenseMatrix"], te = G(yi, Ai, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var c = t._values, f = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = s;
    typeof m == "string" && (i = m, a = e.convert(a, i), d = e.find(s, [i, i]));
    for (var g = [], w = [], A = [], _ = 0; _ < p; _++) {
      for (var E = _ + 1, F = o[_], B = o[_ + 1], C = F; C < B; C++) {
        var y = f[C];
        w[y] = c[C], A[y] = E;
      }
      for (var x = 0; x < v; x++) _ === 0 && (g[x] = []), A[x] === E ? g[x][_] = D ? d(a, w[x]) : d(w[x], a) : g[x][_] = D ? d(a, 0) : d(0, a);
    }
    return new n({ data: g, size: [v, p], datatype: i });
  };
}), Fi = "matAlgo14xDs", Ei = ["typed"], at = G(Fi, Ei, (r) => {
  var { typed: e } = r;
  return function(t, a, s, D) {
    var c = t._data, f = t._size, o = t._datatype, l, m = s;
    typeof o == "string" && (l = o, a = e.convert(a, l), m = e.find(s, [l, l]));
    var v = f.length > 0 ? n(m, 0, f, f[0], c, a, D) : [];
    return t.createDenseMatrix({ data: v, size: ar(f), datatype: l });
  };
  function n(u, t, a, s, D, c, f) {
    var o = [];
    if (t === a.length - 1) for (var l = 0; l < s; l++) o[l] = f ? u(c, D[l]) : u(D[l], c);
    else for (var m = 0; m < s; m++) o[m] = n(u, t + 1, a, a[t + 1], D[m], c, f);
    return o;
  }
}), Ci = "matAlgo03xDSf", wi = ["typed"], ne = G(Ci, wi, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, c = u._size, f = u._datatype || u.getDataType(), o = t._values, l = t._index, m = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (c.length !== v.length) throw new or(c.length, v.length);
    if (c[0] !== v[0] || c[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = c[0], d = c[1], g, w = 0, A = a;
    typeof f == "string" && f === p && f !== "mixed" && (g = f, w = e.convert(0, g), A = e.find(a, [g, g]));
    for (var _ = [], E = 0; E < i; E++) _[E] = [];
    for (var F = [], B = [], C = 0; C < d; C++) {
      for (var y = C + 1, x = m[C], h = m[C + 1], b = x; b < h; b++) {
        var M = l[b];
        F[M] = s ? A(o[b], D[M][C]) : A(D[M][C], o[b]), B[M] = y;
      }
      for (var S = 0; S < i; S++) B[S] === y ? _[S][C] = F[S] : _[S][C] = s ? A(w, D[S][C]) : A(D[S][C], w);
    }
    return u.createDenseMatrix({ data: _, size: [i, d], datatype: f === u._datatype && p === t._datatype ? g : void 0 });
  };
}), bi = "matAlgo05xSfSf", _i = ["typed", "equalScalar"], Bi = G(bi, _i, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, c = t._index, f = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), m = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new or(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var g = o[0], w = o[1], A, _ = n, E = 0, F = s;
    typeof l == "string" && l === d && l !== "mixed" && (A = l, _ = e.find(n, [A, A]), E = e.convert(0, A), F = e.find(s, [A, A]));
    var B = D && m ? [] : void 0, C = [], y = [], x = B ? [] : void 0, h = B ? [] : void 0, b = [], M = [], S, z, N, I;
    for (z = 0; z < w; z++) {
      y[z] = C.length;
      var T = z + 1;
      for (N = f[z], I = f[z + 1]; N < I; N++) S = c[N], C.push(S), b[S] = T, x && (x[S] = D[N]);
      for (N = p[z], I = p[z + 1]; N < I; N++) S = v[N], b[S] !== T && C.push(S), M[S] = T, h && (h[S] = m[N]);
      if (B) for (N = y[z]; N < C.length; ) {
        S = C[N];
        var O = b[S], P = M[S];
        if (O === T || P === T) {
          var W = O === T ? x[S] : E, $ = P === T ? h[S] : E, q = F(W, $);
          _(q, E) ? C.splice(N, 1) : (B.push(q), N++);
        }
      }
    }
    return y[w] = C.length, t.createSparseMatrix({ values: B, index: C, ptr: y, size: [g, w], datatype: l === t._datatype && d === a._datatype ? A : void 0 });
  };
}), xi = "matAlgo13xDD", Si = ["typed"], Mi = G(xi, Si, (r) => {
  var { typed: e } = r;
  return function(t, a, s) {
    var D = t._data, c = t._size, f = t._datatype, o = a._data, l = a._size, m = a._datatype, v = [];
    if (c.length !== l.length) throw new or(c.length, l.length);
    for (var p = 0; p < c.length; p++) {
      if (c[p] !== l[p]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + l + ")");
      v[p] = c[p];
    }
    var i, d = s;
    typeof f == "string" && f === m && (i = f, d = e.find(s, [i, i]));
    var g = v.length > 0 ? n(d, 0, v, v[0], D, o) : [];
    return t.createDenseMatrix({ data: g, size: v, datatype: i });
  };
  function n(u, t, a, s, D, c) {
    var f = [];
    if (t === a.length - 1) for (var o = 0; o < s; o++) f[o] = u(D[o], c[o]);
    else for (var l = 0; l < s; l++) f[l] = n(u, t + 1, a, a[t + 1], D[l], c[l]);
    return f;
  }
});
function Fr(r, e) {
  if (Jr(r.size(), e.size())) return [r, e];
  var n = On(r.size(), e.size());
  return [r, e].map((u) => Ni(u, n));
}
function Ni(r, e) {
  return Jr(r.size(), e) ? r : r.create(Ye(r.valueOf(), e), r.datatype());
}
var Ti = "matrixAlgorithmSuite", zi = ["typed", "matrix"], Yr = G(Ti, zi, (r) => {
  var { typed: e, matrix: n } = r, u = Mi({ typed: e }), t = at({ typed: e });
  return function(s) {
    var D = s.elop, c = s.SD || s.DS, f;
    D ? (f = { "DenseMatrix, DenseMatrix": (v, p) => u(...Fr(v, p), D), "Array, Array": (v, p) => u(...Fr(n(v), n(p)), D).valueOf(), "Array, DenseMatrix": (v, p) => u(...Fr(n(v), p), D), "DenseMatrix, Array": (v, p) => u(...Fr(v, n(p)), D) }, s.SS && (f["SparseMatrix, SparseMatrix"] = (v, p) => s.SS(...Fr(v, p), D, false)), s.DS && (f["DenseMatrix, SparseMatrix"] = (v, p) => s.DS(...Fr(v, p), D, false), f["Array, SparseMatrix"] = (v, p) => s.DS(...Fr(n(v), p), D, false)), c && (f["SparseMatrix, DenseMatrix"] = (v, p) => c(...Fr(p, v), D, true), f["SparseMatrix, Array"] = (v, p) => c(...Fr(n(p), v), D, true))) : (f = { "DenseMatrix, DenseMatrix": e.referToSelf((v) => (p, i) => u(...Fr(p, i), v)), "Array, Array": e.referToSelf((v) => (p, i) => u(...Fr(n(p), n(i)), v).valueOf()), "Array, DenseMatrix": e.referToSelf((v) => (p, i) => u(...Fr(n(p), i), v)), "DenseMatrix, Array": e.referToSelf((v) => (p, i) => u(...Fr(p, n(i)), v)) }, s.SS && (f["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.SS(...Fr(p, i), v, false))), s.DS && (f["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...Fr(p, i), v, false)), f["Array, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...Fr(n(p), i), v, false))), c && (f["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (p, i) => c(...Fr(i, p), v, true)), f["SparseMatrix, Array"] = e.referToSelf((v) => (p, i) => c(...Fr(n(i), p), v, true))));
    var o = s.scalar || "any", l = s.Ds || s.Ss;
    l && (D ? (f["DenseMatrix," + o] = (v, p) => t(v, p, D, false), f[o + ", DenseMatrix"] = (v, p) => t(p, v, D, true), f["Array," + o] = (v, p) => t(n(v), p, D, false).valueOf(), f[o + ", Array"] = (v, p) => t(n(p), v, D, true).valueOf()) : (f["DenseMatrix," + o] = e.referToSelf((v) => (p, i) => t(p, i, v, false)), f[o + ", DenseMatrix"] = e.referToSelf((v) => (p, i) => t(i, p, v, true)), f["Array," + o] = e.referToSelf((v) => (p, i) => t(n(p), i, v, false).valueOf()), f[o + ", Array"] = e.referToSelf((v) => (p, i) => t(n(i), p, v, true).valueOf())));
    var m = s.sS !== void 0 ? s.sS : s.Ss;
    return D ? (s.Ss && (f["SparseMatrix," + o] = (v, p) => s.Ss(v, p, D, false)), m && (f[o + ", SparseMatrix"] = (v, p) => m(p, v, D, true))) : (s.Ss && (f["SparseMatrix," + o] = e.referToSelf((v) => (p, i) => s.Ss(p, i, v, false))), m && (f[o + ", SparseMatrix"] = e.referToSelf((v) => (p, i) => m(i, p, v, true)))), D && D.signatures && En(f, D.signatures), f;
  };
}), Oi = "matAlgo01xDSid", $i = ["typed"], Qn = G(Oi, $i, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, c = u._size, f = u._datatype || u.getDataType(), o = t._values, l = t._index, m = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (c.length !== v.length) throw new or(c.length, v.length);
    if (c[0] !== v[0] || c[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = c[0], d = c[1], g = typeof f == "string" && f !== "mixed" && f === p ? f : void 0, w = g ? e.find(a, [g, g]) : a, A, _, E = [];
    for (A = 0; A < i; A++) E[A] = [];
    var F = [], B = [];
    for (_ = 0; _ < d; _++) {
      for (var C = _ + 1, y = m[_], x = m[_ + 1], h = y; h < x; h++) A = l[h], F[A] = s ? w(o[h], D[A][_]) : w(D[A][_], o[h]), B[A] = C;
      for (A = 0; A < i; A++) B[A] === C ? E[A][_] = F[A] : E[A][_] = D[A][_];
    }
    return u.createDenseMatrix({ data: E, size: [i, d], datatype: f === u._datatype && p === t._datatype ? g : void 0 });
  };
}), Ii = "matAlgo04xSidSid", qi = ["typed", "equalScalar"], Ri = G(Ii, qi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, c = t._index, f = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), m = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new or(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var g = o[0], w = o[1], A, _ = n, E = 0, F = s;
    typeof l == "string" && l === d && l !== "mixed" && (A = l, _ = e.find(n, [A, A]), E = e.convert(0, A), F = e.find(s, [A, A]));
    var B = D && m ? [] : void 0, C = [], y = [], x = D && m ? [] : void 0, h = D && m ? [] : void 0, b = [], M = [], S, z, N, I, T;
    for (z = 0; z < w; z++) {
      y[z] = C.length;
      var O = z + 1;
      for (I = f[z], T = f[z + 1], N = I; N < T; N++) S = c[N], C.push(S), b[S] = O, x && (x[S] = D[N]);
      for (I = p[z], T = p[z + 1], N = I; N < T; N++) if (S = v[N], b[S] === O) {
        if (x) {
          var P = F(x[S], m[N]);
          _(P, E) ? b[S] = null : x[S] = P;
        }
      } else C.push(S), M[S] = O, h && (h[S] = m[N]);
      if (x && h) for (N = y[z]; N < C.length; ) S = C[N], b[S] === O ? (B[N] = x[S], N++) : M[S] === O ? (B[N] = h[S], N++) : C.splice(N, 1);
    }
    return y[w] = C.length, t.createSparseMatrix({ values: B, index: C, ptr: y, size: [g, w], datatype: l === t._datatype && d === a._datatype ? A : void 0 });
  };
}), Ui = "matAlgo10xSids", Pi = ["typed", "DenseMatrix"], Wn = G(Ui, Pi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var c = t._values, f = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = s;
    typeof m == "string" && (i = m, a = e.convert(a, i), d = e.find(s, [i, i]));
    for (var g = [], w = [], A = [], _ = 0; _ < p; _++) {
      for (var E = _ + 1, F = o[_], B = o[_ + 1], C = F; C < B; C++) {
        var y = f[C];
        w[y] = c[C], A[y] = E;
      }
      for (var x = 0; x < v; x++) _ === 0 && (g[x] = []), A[x] === E ? g[x][_] = D ? d(a, w[x]) : d(w[x], a) : g[x][_] = a;
    }
    return new n({ data: g, size: [v, p], datatype: i });
  };
}), Li = "multiplyScalar", Vi = ["typed"], Zi = G(Li, Vi, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": Pn, "Complex, Complex": function(u, t) {
    return u.mul(t);
  }, "BigNumber, BigNumber": function(u, t) {
    return u.times(t);
  }, "bigint, bigint": function(u, t) {
    return u * t;
  }, "Fraction, Fraction": function(u, t) {
    return u.mul(t);
  }, "number | Fraction | BigNumber | Complex, Unit": (n, u) => u.multiply(n), "Unit, number | Fraction | BigNumber | Complex | Unit": (n, u) => n.multiply(u) });
}), qt = "multiply", Ji = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Qi = G(qt, Ji, (r) => {
  var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: s } = r, D = Jn({ typed: e, equalScalar: a }), c = at({ typed: e });
  function f(E, F) {
    switch (E.length) {
      case 1:
        switch (F.length) {
          case 1:
            if (E[0] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (E[0] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + E[0] + ") must match Matrix rows (" + F[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + F.length + " dimensions)");
        }
        break;
      case 2:
        switch (F.length) {
          case 1:
            if (E[1] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + E[1] + ") must match Vector length (" + F[0] + ")");
            break;
          case 2:
            if (E[1] !== F[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + E[1] + ") must match Matrix B rows (" + F[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + F.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + E.length + " dimensions)");
    }
  }
  function o(E, F, B) {
    if (B === 0) throw new Error("Cannot multiply two empty vectors");
    return s(E, F);
  }
  function l(E, F) {
    if (F.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
    return m(E, F);
  }
  function m(E, F) {
    var B = E._data, C = E._size, y = E._datatype || E.getDataType(), x = F._data, h = F._size, b = F._datatype || F.getDataType(), M = C[0], S = h[1], z, N = u, I = t;
    y && b && y === b && typeof y == "string" && y !== "mixed" && (z = y, N = e.find(u, [z, z]), I = e.find(t, [z, z]));
    for (var T = [], O = 0; O < S; O++) {
      for (var P = I(B[0], x[0][O]), W = 1; W < M; W++) P = N(P, I(B[W], x[W][O]));
      T[O] = P;
    }
    return E.createDenseMatrix({ data: T, size: [S], datatype: y === E._datatype && b === F._datatype ? z : void 0 });
  }
  var v = e("_multiplyMatrixVector", { "DenseMatrix, any": i, "SparseMatrix, any": w }), p = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": d, "DenseMatrix, SparseMatrix": g, "SparseMatrix, DenseMatrix": A, "SparseMatrix, SparseMatrix": _ });
  function i(E, F) {
    var B = E._data, C = E._size, y = E._datatype || E.getDataType(), x = F._data, h = F._datatype || F.getDataType(), b = C[0], M = C[1], S, z = u, N = t;
    y && h && y === h && typeof y == "string" && y !== "mixed" && (S = y, z = e.find(u, [S, S]), N = e.find(t, [S, S]));
    for (var I = [], T = 0; T < b; T++) {
      for (var O = B[T], P = N(O[0], x[0]), W = 1; W < M; W++) P = z(P, N(O[W], x[W]));
      I[T] = P;
    }
    return E.createDenseMatrix({ data: I, size: [b], datatype: y === E._datatype && h === F._datatype ? S : void 0 });
  }
  function d(E, F) {
    var B = E._data, C = E._size, y = E._datatype || E.getDataType(), x = F._data, h = F._size, b = F._datatype || F.getDataType(), M = C[0], S = C[1], z = h[1], N, I = u, T = t;
    y && b && y === b && typeof y == "string" && y !== "mixed" && y !== "mixed" && (N = y, I = e.find(u, [N, N]), T = e.find(t, [N, N]));
    for (var O = [], P = 0; P < M; P++) {
      var W = B[P];
      O[P] = [];
      for (var $ = 0; $ < z; $++) {
        for (var q = T(W[0], x[0][$]), V = 1; V < S; V++) q = I(q, T(W[V], x[V][$]));
        O[P][$] = q;
      }
    }
    return E.createDenseMatrix({ data: O, size: [M, z], datatype: y === E._datatype && b === F._datatype ? N : void 0 });
  }
  function g(E, F) {
    var B = E._data, C = E._size, y = E._datatype || E.getDataType(), x = F._values, h = F._index, b = F._ptr, M = F._size, S = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!x) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var z = C[0], N = M[1], I, T = u, O = t, P = a, W = 0;
    y && S && y === S && typeof y == "string" && y !== "mixed" && (I = y, T = e.find(u, [I, I]), O = e.find(t, [I, I]), P = e.find(a, [I, I]), W = e.convert(0, I));
    for (var $ = [], q = [], V = [], Y = F.createSparseMatrix({ values: $, index: q, ptr: V, size: [z, N], datatype: y === E._datatype && S === F._datatype ? I : void 0 }), Z = 0; Z < N; Z++) {
      V[Z] = q.length;
      var R = b[Z], J = b[Z + 1];
      if (J > R) for (var L = 0, U = 0; U < z; U++) {
        for (var K = U + 1, Q = void 0, j = R; j < J; j++) {
          var rr = h[j];
          L !== K ? (Q = O(B[U][rr], x[j]), L = K) : Q = T(Q, O(B[U][rr], x[j]));
        }
        L === K && !P(Q, W) && (q.push(U), $.push(Q));
      }
    }
    return V[N] = q.length, Y;
  }
  function w(E, F) {
    var B = E._values, C = E._index, y = E._ptr, x = E._datatype || E._data === void 0 ? E._datatype : E.getDataType();
    if (!B) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var h = F._data, b = F._datatype || F.getDataType(), M = E._size[0], S = F._size[0], z = [], N = [], I = [], T, O = u, P = t, W = a, $ = 0;
    x && b && x === b && typeof x == "string" && x !== "mixed" && (T = x, O = e.find(u, [T, T]), P = e.find(t, [T, T]), W = e.find(a, [T, T]), $ = e.convert(0, T));
    var q = [], V = [];
    I[0] = 0;
    for (var Y = 0; Y < S; Y++) {
      var Z = h[Y];
      if (!W(Z, $)) for (var R = y[Y], J = y[Y + 1], L = R; L < J; L++) {
        var U = C[L];
        V[U] ? q[U] = O(q[U], P(Z, B[L])) : (V[U] = true, N.push(U), q[U] = P(Z, B[L]));
      }
    }
    for (var K = N.length, Q = 0; Q < K; Q++) {
      var j = N[Q];
      z[Q] = q[j];
    }
    return I[1] = N.length, E.createSparseMatrix({ values: z, index: N, ptr: I, size: [M, 1], datatype: x === E._datatype && b === F._datatype ? T : void 0 });
  }
  function A(E, F) {
    var B = E._values, C = E._index, y = E._ptr, x = E._datatype || E._data === void 0 ? E._datatype : E.getDataType();
    if (!B) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var h = F._data, b = F._datatype || F.getDataType(), M = E._size[0], S = F._size[0], z = F._size[1], N, I = u, T = t, O = a, P = 0;
    x && b && x === b && typeof x == "string" && x !== "mixed" && (N = x, I = e.find(u, [N, N]), T = e.find(t, [N, N]), O = e.find(a, [N, N]), P = e.convert(0, N));
    for (var W = [], $ = [], q = [], V = E.createSparseMatrix({ values: W, index: $, ptr: q, size: [M, z], datatype: x === E._datatype && b === F._datatype ? N : void 0 }), Y = [], Z = [], R = 0; R < z; R++) {
      q[R] = $.length;
      for (var J = R + 1, L = 0; L < S; L++) {
        var U = h[L][R];
        if (!O(U, P)) for (var K = y[L], Q = y[L + 1], j = K; j < Q; j++) {
          var rr = C[j];
          Z[rr] !== J ? (Z[rr] = J, $.push(rr), Y[rr] = T(U, B[j])) : Y[rr] = I(Y[rr], T(U, B[j]));
        }
      }
      for (var tr = q[R], nr = $.length, ur = tr; ur < nr; ur++) {
        var fr = $[ur];
        W[ur] = Y[fr];
      }
    }
    return q[z] = $.length, V;
  }
  function _(E, F) {
    var B = E._values, C = E._index, y = E._ptr, x = E._datatype || E._data === void 0 ? E._datatype : E.getDataType(), h = F._values, b = F._index, M = F._ptr, S = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), z = E._size[0], N = F._size[1], I = B && h, T, O = u, P = t;
    x && S && x === S && typeof x == "string" && x !== "mixed" && (T = x, O = e.find(u, [T, T]), P = e.find(t, [T, T]));
    for (var W = I ? [] : void 0, $ = [], q = [], V = E.createSparseMatrix({ values: W, index: $, ptr: q, size: [z, N], datatype: x === E._datatype && S === F._datatype ? T : void 0 }), Y = I ? [] : void 0, Z = [], R, J, L, U, K, Q, j, rr, tr = 0; tr < N; tr++) {
      q[tr] = $.length;
      var nr = tr + 1;
      for (K = M[tr], Q = M[tr + 1], U = K; U < Q; U++) if (rr = b[U], I) for (J = y[rr], L = y[rr + 1], R = J; R < L; R++) j = C[R], Z[j] !== nr ? (Z[j] = nr, $.push(j), Y[j] = P(h[U], B[R])) : Y[j] = O(Y[j], P(h[U], B[R]));
      else for (J = y[rr], L = y[rr + 1], R = J; R < L; R++) j = C[R], Z[j] !== nr && (Z[j] = nr, $.push(j));
      if (I) for (var ur = q[tr], fr = $.length, gr = ur; gr < fr; gr++) {
        var cr = $[gr];
        W[gr] = Y[cr];
      }
    }
    return q[N] = $.length, V;
  }
  return e(qt, t, { "Array, Array": e.referTo("Matrix, Matrix", (E) => (F, B) => {
    f(ir(F), ir(B));
    var C = E(n(F), n(B));
    return lr(C) ? C.valueOf() : C;
  }), "Matrix, Matrix": function(F, B) {
    var C = F.size(), y = B.size();
    return f(C, y), C.length === 1 ? y.length === 1 ? o(F, B, C[0]) : l(F, B) : y.length === 1 ? v(F, B) : p(F, B);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (E) => (F, B) => E(F, n(B))), "Array, Matrix": e.referToSelf((E) => (F, B) => E(n(F, B.storage()), B)), "SparseMatrix, any": function(F, B) {
    return D(F, B, t, false);
  }, "DenseMatrix, any": function(F, B) {
    return c(F, B, t, false);
  }, "any, SparseMatrix": function(F, B) {
    return D(B, F, t, true);
  }, "any, DenseMatrix": function(F, B) {
    return c(B, F, t, true);
  }, "Array, any": function(F, B) {
    return c(n(F), B, t, false).valueOf();
  }, "any, Array": function(F, B) {
    return c(n(B), F, t, true).valueOf();
  }, "any, any": t, "any, any, ...any": e.referToSelf((E) => (F, B, C) => {
    for (var y = E(F, B), x = 0; x < C.length; x++) y = E(y, C[x]);
    return y;
  }) });
}), Rt = "sign", Wi = ["typed", "BigNumber", "Fraction", "complex"], Gi = G(Rt, Wi, (r) => {
  var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
  return e(Rt, { number: Xe, Complex: function(s) {
    return s.im === 0 ? u(Xe(s.re)) : s.sign();
  }, BigNumber: function(s) {
    return new n(s.cmp(0));
  }, bigint: function(s) {
    return s > 0n ? 1n : s < 0n ? -1n : 0n;
  }, Fraction: function(s) {
    return new t(s.s);
  }, "Array | Matrix": e.referToSelf((a) => (s) => Nr(s, a, true)), Unit: e.referToSelf((a) => (s) => {
    if (!s._isDerived() && s.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
    return e.find(a, s.valueType())(s.value);
  }) });
}), Yi = "sqrt", Xi = ["config", "typed", "Complex"], Ki = G(Yi, Xi, (r) => {
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
}), Ut = "subtract", Hi = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], ji = G(Ut, Hi, (r) => {
  var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: s, concat: D } = r, c = Qn({ typed: e }), f = ne({ typed: e }), o = Bi({ typed: e, equalScalar: u }), l = Wn({ typed: e, DenseMatrix: s }), m = te({ typed: e, DenseMatrix: s }), v = Yr({ typed: e, matrix: n, concat: D });
  return e(Ut, { "any, any": t }, v({ elop: t, SS: o, DS: c, SD: f, Ss: m, sS: l }));
}), ki = "matAlgo07xSSf", ro = ["typed", "SparseMatrix"], fe = G(ki, ro, (r) => {
  var { typed: e, SparseMatrix: n } = r;
  return function(a, s, D) {
    var c = a._size, f = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), o = s._size, l = s._datatype || s._data === void 0 ? s._datatype : s.getDataType();
    if (c.length !== o.length) throw new or(c.length, o.length);
    if (c[0] !== o[0] || c[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + o + ")");
    var m = c[0], v = c[1], p, i = 0, d = D;
    typeof f == "string" && f === l && f !== "mixed" && (p = f, i = e.convert(0, p), d = e.find(D, [p, p]));
    for (var g = [], w = [], A = new Array(v + 1).fill(0), _ = [], E = [], F = [], B = [], C = 0; C < v; C++) {
      var y = C + 1, x = 0;
      u(a, C, F, _, y), u(s, C, B, E, y);
      for (var h = 0; h < m; h++) {
        var b = F[h] === y ? _[h] : i, M = B[h] === y ? E[h] : i, S = d(b, M);
        S !== 0 && S !== false && (w.push(h), g.push(S), x++);
      }
      A[C + 1] = A[C] + x;
    }
    return new n({ values: g, index: w, ptr: A, size: [m, v], datatype: f === a._datatype && l === s._datatype ? p : void 0 });
  };
  function u(t, a, s, D, c) {
    for (var f = t._values, o = t._index, l = t._ptr, m = l[a], v = l[a + 1]; m < v; m++) {
      var p = o[m];
      s[p] = c, D[p] = f[m];
    }
  }
}), Pt = "conj", eo = ["typed"], to = G(Pt, eo, (r) => {
  var { typed: e } = r;
  return e(Pt, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.conjugate(), "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n)) });
}), Lt = "im", no = ["typed"], uo = G(Lt, no, (r) => {
  var { typed: e } = r;
  return e(Lt, { number: () => 0, "BigNumber | Fraction": (n) => n.mul(0), Complex: (n) => n.im, "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n)) });
}), Vt = "re", ao = ["typed"], io = G(Vt, ao, (r) => {
  var { typed: e } = r;
  return e(Vt, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.re, "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n)) });
}), Zt = "concat", oo = ["typed", "matrix", "isInteger"], so = G(Zt, oo, (r) => {
  var { typed: e, matrix: n, isInteger: u } = r;
  return e(Zt, { "...Array | Matrix | number | BigNumber": function(a) {
    var s, D = a.length, c = -1, f, o = false, l = [];
    for (s = 0; s < D; s++) {
      var m = a[s];
      if (lr(m) && (o = true), vr(m) || Ar(m)) {
        if (s !== D - 1) throw new Error("Dimension must be specified as last argument");
        if (f = c, c = m.valueOf(), !u(c)) throw new TypeError("Integer number expected for dimension");
        if (c < 0 || s > 0 && c > f) throw new Gr(c, f + 1);
      } else {
        var v = ar(m).valueOf(), p = ir(v);
        if (l[s] = v, f = c, c = p.length - 1, s > 0 && c !== f) throw new or(f + 1, c + 1);
      }
    }
    if (l.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var i = l.shift(); l.length; ) i = zn(i, l.shift(), c);
    return o ? n(i) : i;
  }, "...string": function(a) {
    return a.join("");
  } });
}), Jt = "column", fo = ["typed", "Index", "matrix", "range"], lo = G(Jt, fo, (r) => {
  var { typed: e, Index: n, matrix: u, range: t } = r;
  return e(Jt, { "Matrix, number": a, "Array, number": function(D, c) {
    return a(u(ar(D)), c).valueOf();
  } });
  function a(s, D) {
    if (s.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
    yr(D, s.size()[1]);
    var c = t(0, s.size()[0]), f = new n(c, D), o = s.subset(f);
    return lr(o) ? o : u([[o]]);
  }
}), Qt = "cross", co = ["typed", "matrix", "subtract", "multiply"], vo = G(Qt, co, (r) => {
  var { typed: e, matrix: n, subtract: u, multiply: t } = r;
  return e(Qt, { "Matrix, Matrix": function(D, c) {
    return n(a(D.toArray(), c.toArray()));
  }, "Matrix, Array": function(D, c) {
    return n(a(D.toArray(), c));
  }, "Array, Matrix": function(D, c) {
    return n(a(D, c.toArray()));
  }, "Array, Array": a });
  function a(s, D) {
    var c = Math.max(ir(s).length, ir(D).length);
    s = bt(s), D = bt(D);
    var f = ir(s), o = ir(D);
    if (f.length !== 1 || o.length !== 1 || f[0] !== 3 || o[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + f.join(", ") + "], B = [" + o.join(", ") + "])");
    var l = [u(t(s[1], D[2]), t(s[2], D[1])), u(t(s[2], D[0]), t(s[0], D[2])), u(t(s[0], D[1]), t(s[1], D[0]))];
    return c > 1 ? [l] : l;
  }
}), Wt = "diag", Do = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], po = G(Wt, Do, (r) => {
  var { typed: e, matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(Wt, { Array: function(f) {
    return a(f, 0, ir(f), null);
  }, "Array, number": function(f, o) {
    return a(f, o, ir(f), null);
  }, "Array, BigNumber": function(f, o) {
    return a(f, o.toNumber(), ir(f), null);
  }, "Array, string": function(f, o) {
    return a(f, 0, ir(f), o);
  }, "Array, number, string": function(f, o, l) {
    return a(f, o, ir(f), l);
  }, "Array, BigNumber, string": function(f, o, l) {
    return a(f, o.toNumber(), ir(f), l);
  }, Matrix: function(f) {
    return a(f, 0, f.size(), f.storage());
  }, "Matrix, number": function(f, o) {
    return a(f, o, f.size(), f.storage());
  }, "Matrix, BigNumber": function(f, o) {
    return a(f, o.toNumber(), f.size(), f.storage());
  }, "Matrix, string": function(f, o) {
    return a(f, 0, f.size(), o);
  }, "Matrix, number, string": function(f, o, l) {
    return a(f, o, f.size(), l);
  }, "Matrix, BigNumber, string": function(f, o, l) {
    return a(f, o.toNumber(), f.size(), l);
  } });
  function a(c, f, o, l) {
    if (!pr(f)) throw new TypeError("Second parameter in function diag must be an integer");
    var m = f > 0 ? f : 0, v = f < 0 ? -f : 0;
    switch (o.length) {
      case 1:
        return s(c, f, l, o[0], v, m);
      case 2:
        return D(c, f, l, o, v, m);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function s(c, f, o, l, m, v) {
    var p = [l + m, l + v];
    if (o && o !== "sparse" && o !== "dense") throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var i = o === "sparse" ? t.diagonal(p, c, f) : u.diagonal(p, c, f);
    return o !== null ? i : i.valueOf();
  }
  function D(c, f, o, l, m, v) {
    if (lr(c)) {
      var p = c.diagonal(f);
      return o !== null ? o !== p.storage() ? n(p, o) : p : p.valueOf();
    }
    for (var i = Math.min(l[0] - m, l[1] - v), d = [], g = 0; g < i; g++) d[g] = c[g + m][g + v];
    return o !== null ? n(d) : d;
  }
}), Gt = "flatten", ho = ["typed"], mo = G(Gt, ho, (r) => {
  var { typed: e } = r;
  return e(Gt, { Array: function(u) {
    return Ge(u);
  }, Matrix: function(u) {
    return u.create(Ge(u.valueOf(), true), u.datatype());
  } });
}), Yt = "getMatrixDataType", go = ["typed"], yo = G(Yt, go, (r) => {
  var { typed: e } = r;
  return e(Yt, { Array: function(u) {
    return Oe(u, Ir);
  }, Matrix: function(u) {
    return u.getDataType();
  } });
}), Xt = "identity", Ao = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Fo = G(Xt, Ao, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t, DenseMatrix: a, SparseMatrix: s } = r;
  return e(Xt, { "": function() {
    return n.matrix === "Matrix" ? u([]) : [];
  }, string: function(o) {
    return u(o);
  }, "number | BigNumber": function(o) {
    return c(o, o, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(o, l) {
    return c(o, o, l);
  }, "number | BigNumber, number | BigNumber": function(o, l) {
    return c(o, l, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(o, l, m) {
    return c(o, l, m);
  }, Array: function(o) {
    return D(o);
  }, "Array, string": function(o, l) {
    return D(o, l);
  }, Matrix: function(o) {
    return D(o.valueOf(), o.storage());
  }, "Matrix, string": function(o, l) {
    return D(o.valueOf(), l);
  } });
  function D(f, o) {
    switch (f.length) {
      case 0:
        return o ? u(o) : [];
      case 1:
        return c(f[0], f[0], o);
      case 2:
        return c(f[0], f[1], o);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function c(f, o, l) {
    var m = Ar(f) || Ar(o) ? t : null;
    if (Ar(f) && (f = f.toNumber()), Ar(o) && (o = o.toNumber()), !pr(f) || f < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!pr(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
    var v = m ? new t(1) : 1, p = m ? new m(0) : 0, i = [f, o];
    if (l) {
      if (l === "sparse") return s.diagonal(i, v, 0, p);
      if (l === "dense") return a.diagonal(i, v, 0, p);
      throw new TypeError('Unknown matrix type "'.concat(l, '"'));
    }
    for (var d = Ce([], i, p), g = f < o ? f : o, w = 0; w < g; w++) d[w][w] = v;
    return d;
  }
}), Kt = "kron", Eo = ["typed", "matrix", "multiplyScalar"], Co = G(Kt, Eo, (r) => {
  var { typed: e, matrix: n, multiplyScalar: u } = r;
  return e(Kt, { "Matrix, Matrix": function(s, D) {
    return n(t(s.toArray(), D.toArray()));
  }, "Matrix, Array": function(s, D) {
    return n(t(s.toArray(), D));
  }, "Array, Matrix": function(s, D) {
    return n(t(s, D.toArray()));
  }, "Array, Array": t });
  function t(a, s) {
    if (ir(a).length === 1 && (a = [a]), ir(s).length === 1 && (s = [s]), ir(a).length > 2 || ir(s).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(a.length) + ", y = " + JSON.stringify(s.length) + ")");
    var D = [], c = [];
    return a.map(function(f) {
      return s.map(function(o) {
        return c = [], D.push(c), f.map(function(l) {
          return o.map(function(m) {
            return c.push(u(l, m));
          });
        });
      });
    }) && D;
  }
});
function Gn() {
  throw new Error('No "bignumber" implementation available');
}
function wo() {
  throw new Error('No "fraction" implementation available');
}
function Yn() {
  throw new Error('No "matrix" implementation available');
}
var Ht = "range", bo = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], _o = G(Ht, bo, (r) => {
  var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: s, larger: D, largerEq: c, add: f, isPositive: o } = r;
  return e(Ht, { string: m, "string, boolean": m, number: function(d) {
    throw new TypeError("Too few arguments to function range(): ".concat(d));
  }, boolean: function(d) {
    throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(d, ", number|bigint|BigNumber|Fraction"));
  }, "number, number": function(d, g) {
    return l(v(d, g, 1, false));
  }, "number, number, number": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "number, number, boolean": function(d, g, w) {
    return l(v(d, g, 1, w));
  }, "number, number, number, boolean": function(d, g, w, A) {
    return l(v(d, g, w, A));
  }, "bigint, bigint|number": function(d, g) {
    return l(v(d, g, 1n, false));
  }, "number, bigint": function(d, g) {
    return l(v(BigInt(d), g, 1n, false));
  }, "bigint, bigint|number, bigint|number": function(d, g, w) {
    return l(v(d, g, BigInt(w), false));
  }, "number, bigint, bigint|number": function(d, g, w) {
    return l(v(BigInt(d), g, BigInt(w), false));
  }, "bigint, bigint|number, boolean": function(d, g, w) {
    return l(v(d, g, 1n, w));
  }, "number, bigint, boolean": function(d, g, w) {
    return l(v(BigInt(d), g, 1n, w));
  }, "bigint, bigint|number, bigint|number, boolean": function(d, g, w, A) {
    return l(v(d, g, BigInt(w), A));
  }, "number, bigint, bigint|number, boolean": function(d, g, w, A) {
    return l(v(BigInt(d), g, BigInt(w), A));
  }, "BigNumber, BigNumber": function(d, g) {
    var w = d.constructor;
    return l(v(d, g, new w(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "BigNumber, BigNumber, boolean": function(d, g, w) {
    var A = d.constructor;
    return l(v(d, g, new A(1), w));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(d, g, w, A) {
    return l(v(d, g, w, A));
  }, "Fraction, Fraction": function(d, g) {
    return l(v(d, g, 1, false));
  }, "Fraction, Fraction, Fraction": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "Fraction, Fraction, boolean": function(d, g, w) {
    return l(v(d, g, 1, w));
  }, "Fraction, Fraction, Fraction, boolean": function(d, g, w, A) {
    return l(v(d, g, w, A));
  }, "Unit, Unit, Unit": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "Unit, Unit, Unit, boolean": function(d, g, w, A) {
    return l(v(d, g, w, A));
  } });
  function l(i) {
    return n.matrix === "Matrix" ? u ? u(i) : Yn() : i;
  }
  function m(i, d) {
    var g = p(i);
    if (!g) throw new SyntaxError('String "' + i + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && Gn(), l(v(t(g.start), t(g.end), t(g.step)))) : l(v(g.start, g.end, g.step, d));
  }
  function v(i, d, g, w) {
    for (var A = [], _ = o(g) ? w ? s : a : w ? c : D, E = i; _(E, d); ) A.push(E), E = f(E, g);
    return A;
  }
  function p(i) {
    var d = i.split(":"), g = d.map(function(A) {
      return Number(A);
    }), w = g.some(function(A) {
      return isNaN(A);
    });
    if (w) return null;
    switch (g.length) {
      case 2:
        return { start: g[0], end: g[1], step: 1 };
      case 3:
        return { start: g[0], end: g[2], step: g[1] };
      default:
        return null;
    }
  }
}), jt = "reshape", Bo = ["typed", "isInteger", "matrix"], xo = G(jt, Bo, (r) => {
  var { typed: e, isInteger: n } = r;
  return e(jt, { "Matrix, Array": function(t, a) {
    return t.reshape(a, true);
  }, "Array, Array": function(t, a) {
    return a.forEach(function(s) {
      if (!n(s)) throw new TypeError("Invalid size for dimension: " + s);
    }), tt(t, a);
  } });
}), kt = "size", So = ["typed", "config", "?matrix"], Mo = G(kt, So, (r) => {
  var { typed: e, config: n, matrix: u } = r;
  return e(kt, { Matrix: function(a) {
    return a.create(a.size(), "number");
  }, Array: ir, string: function(a) {
    return n.matrix === "Array" ? [a.length] : u([a.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(a) {
    return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : Yn();
  } });
}), rn = "transpose", No = ["typed", "matrix"], To = G(rn, No, (r) => {
  var { typed: e, matrix: n } = r;
  return e(rn, { Array: (s) => u(n(s)).valueOf(), Matrix: u, any: ar });
  function u(s) {
    var D = s.size(), c;
    switch (D.length) {
      case 1:
        c = s.clone();
        break;
      case 2:
        {
          var f = D[0], o = D[1];
          if (o === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + dr(D) + ")");
          switch (s.storage()) {
            case "dense":
              c = t(s, f, o);
              break;
            case "sparse":
              c = a(s, f, o);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + dr(D) + ")");
    }
    return c;
  }
  function t(s, D, c) {
    for (var f = s._data, o = [], l, m = 0; m < c; m++) {
      l = o[m] = [];
      for (var v = 0; v < D; v++) l[v] = ar(f[v][m]);
    }
    return s.createDenseMatrix({ data: o, size: [c, D], datatype: s._datatype });
  }
  function a(s, D, c) {
    for (var f = s._values, o = s._index, l = s._ptr, m = f ? [] : void 0, v = [], p = [], i = [], d = 0; d < D; d++) i[d] = 0;
    var g, w, A;
    for (g = 0, w = o.length; g < w; g++) i[o[g]]++;
    for (var _ = 0, E = 0; E < D; E++) p.push(_), _ += i[E], i[E] = p[E];
    for (p.push(_), A = 0; A < c; A++) for (var F = l[A], B = l[A + 1], C = F; C < B; C++) {
      var y = i[o[C]]++;
      v[y] = A, f && (m[y] = ar(f[C]));
    }
    return s.createSparseMatrix({ values: m, index: v, ptr: p, size: [c, D], datatype: s._datatype });
  }
}), en = "ctranspose", zo = ["typed", "transpose", "conj"], Oo = G(en, zo, (r) => {
  var { typed: e, transpose: n, conj: u } = r;
  return e(en, { any: function(a) {
    return u(n(a));
  } });
}), tn = "zeros", $o = ["typed", "config", "matrix", "BigNumber"], Io = G(tn, $o, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t } = r;
  return e(tn, { "": function() {
    return n.matrix === "Array" ? a([]) : a([], "default");
  }, "...number | BigNumber | string": function(f) {
    var o = f[f.length - 1];
    if (typeof o == "string") {
      var l = f.pop();
      return a(f, l);
    } else return n.matrix === "Array" ? a(f) : a(f, "default");
  }, Array: a, Matrix: function(f) {
    var o = f.storage();
    return a(f.valueOf(), o);
  }, "Array | Matrix, string": function(f, o) {
    return a(f.valueOf(), o);
  } });
  function a(c, f) {
    var o = s(c), l = o ? new t(0) : 0;
    if (D(c), f) {
      var m = u(f);
      return c.length > 0 ? m.resize(c, l) : m;
    } else {
      var v = [];
      return c.length > 0 ? Ce(v, c, l) : v;
    }
  }
  function s(c) {
    var f = false;
    return c.forEach(function(o, l, m) {
      Ar(o) && (f = true, m[l] = o.toNumber());
    }), f;
  }
  function D(c) {
    c.forEach(function(f) {
      if (typeof f != "number" || !pr(f) || f < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), qo = "numeric", Ro = ["number", "?bignumber", "?fraction"], Uo = G(qo, Ro, (r) => {
  var { number: e, bignumber: n, fraction: u } = r, t = { string: true, number: true, BigNumber: true, Fraction: true }, a = { number: (s) => e(s), BigNumber: n ? (s) => n(s) : Gn, bigint: (s) => BigInt(s), Fraction: u ? (s) => u(s) : wo };
  return function(D) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", f = arguments.length > 2 ? arguments[2] : void 0;
    if (f !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var o = Ir(D);
    if (!(o in t)) throw new TypeError("Cannot convert " + D + ' of type "' + o + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(c in a)) throw new TypeError("Cannot convert " + D + ' to type "' + c + '"; valid output types are ' + Object.keys(a).join(", "));
    return c === o ? D : a[c](D);
  };
}), nn = "divideScalar", Po = ["typed", "numeric"], Lo = G(nn, Po, (r) => {
  var { typed: e, numeric: n } = r;
  return e(nn, { "number, number": function(t, a) {
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
}), un = "pow", Vo = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], Zo = G(un, Vo, (r) => {
  var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: s, number: D, fraction: c, Complex: f } = r;
  return e(un, { "number, number": o, "Complex, Complex": function(p, i) {
    return p.pow(i);
  }, "BigNumber, BigNumber": function(p, i) {
    return i.isInteger() || p >= 0 || n.predictable ? p.pow(i) : new f(p.toNumber(), 0).pow(i.toNumber(), 0);
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
      var i = c(p), d = D(i);
      if ((p === d || Math.abs((p - d) / p) < 1e-14) && i.d % 2n === 1n) return (i.n % 2n === 0n ? 1 : -1) * Math.pow(-v, p);
    } catch {
    }
    return n.predictable && (v < -1 && p === 1 / 0 || v > -1 && v < 0 && p === -1 / 0) ? NaN : pr(p) || v >= 0 || n.predictable ? Vn(v, p) : v * v < 1 && p === 1 / 0 || v * v > 1 && p === -1 / 0 ? 0 : new f(v, 0).pow(p, 0);
  }
  function l(v, p) {
    if (!pr(p)) throw new TypeError("For A^b, b must be an integer (value is " + p + ")");
    var i = ir(v);
    if (i.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + i.length + " dimensions)");
    if (i[0] !== i[1]) throw new Error("For A^b, A must be square (size is " + i[0] + "x" + i[1] + ")");
    if (p < 0) try {
      return l(s(v), -p);
    } catch (w) {
      throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + p + ")") : w;
    }
    for (var d = u(i[0]).valueOf(), g = v; p >= 1; ) (p & 1) === 1 && (d = t(g, d)), p >>= 1, g = t(g, g);
    return d;
  }
  function m(v, p) {
    return a(l(v.valueOf(), p));
  }
});
function Xn(r) {
  var { DenseMatrix: e } = r;
  return function(u, t, a) {
    var s = u.size();
    if (s.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + dr(s) + ")");
    var D = s[0], c = s[1];
    if (D !== c) throw new RangeError("Matrix must be square (size: " + dr(s) + ")");
    var f = [];
    if (lr(t)) {
      var o = t.size(), l = t._data;
      if (o.length === 1) {
        if (o[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var m = 0; m < D; m++) f[m] = [l[m]];
        return new e({ data: f, size: [D, 1], datatype: t._datatype });
      }
      if (o.length === 2) {
        if (o[0] !== D || o[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (yn(t)) {
          if (a) {
            f = [];
            for (var v = 0; v < D; v++) f[v] = [l[v][0]];
            return new e({ data: f, size: [D, 1], datatype: t._datatype });
          }
          return t;
        }
        if (An(t)) {
          for (var p = 0; p < D; p++) f[p] = [0];
          for (var i = t._values, d = t._index, g = t._ptr, w = g[1], A = g[0]; A < w; A++) {
            var _ = d[A];
            f[_][0] = i[A];
          }
          return new e({ data: f, size: [D, 1], datatype: t._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (mr(t)) {
      var E = ir(t);
      if (E.length === 1) {
        if (E[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var F = 0; F < D; F++) f[F] = [t[F]];
        return new e({ data: f, size: [D, 1] });
      }
      if (E.length === 2) {
        if (E[0] !== D || E[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var B = 0; B < D; B++) f[B] = [t[B][0]];
        return new e({ data: f, size: [D, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var an = "usolve", Jo = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Qo = G(an, Jo, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, c = Xn({ DenseMatrix: D });
  return e(an, { "SparseMatrix, Array | Matrix": function(m, v) {
    return o(m, v);
  }, "DenseMatrix, Array | Matrix": function(m, v) {
    return f(m, v);
  }, "Array, Array | Matrix": function(m, v) {
    var p = n(m), i = f(p, v);
    return i.valueOf();
  } });
  function f(l, m) {
    m = c(l, m, true);
    for (var v = m._data, p = l._size[0], i = l._size[1], d = [], g = l._data, w = i - 1; w >= 0; w--) {
      var A = v[w][0] || 0, _ = void 0;
      if (s(A, 0)) _ = 0;
      else {
        var E = g[w][w];
        if (s(E, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        _ = u(A, E);
        for (var F = w - 1; F >= 0; F--) v[F] = [a(v[F][0] || 0, t(_, g[F][w]))];
      }
      d[w] = [_];
    }
    return new D({ data: d, size: [p, 1] });
  }
  function o(l, m) {
    m = c(l, m, true);
    for (var v = m._data, p = l._size[0], i = l._size[1], d = l._values, g = l._index, w = l._ptr, A = [], _ = i - 1; _ >= 0; _--) {
      var E = v[_][0] || 0;
      if (s(E, 0)) A[_] = [0];
      else {
        for (var F = 0, B = [], C = [], y = w[_], x = w[_ + 1], h = x - 1; h >= y; h--) {
          var b = g[h];
          b === _ ? F = d[h] : b < _ && (B.push(d[h]), C.push(b));
        }
        if (s(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var M = u(E, F), S = 0, z = C.length; S < z; S++) {
          var N = C[S];
          v[N] = [a(v[N][0], t(M, B[S]))];
        }
        A[_] = [M];
      }
    }
    return new D({ data: A, size: [p, 1] });
  }
}), on = "usolveAll", Wo = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Go = G(on, Wo, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, c = Xn({ DenseMatrix: D });
  return e(on, { "SparseMatrix, Array | Matrix": function(m, v) {
    return o(m, v);
  }, "DenseMatrix, Array | Matrix": function(m, v) {
    return f(m, v);
  }, "Array, Array | Matrix": function(m, v) {
    var p = n(m), i = f(p, v);
    return i.map((d) => d.valueOf());
  } });
  function f(l, m) {
    for (var v = [c(l, m, true)._data.map((C) => C[0])], p = l._data, i = l._size[0], d = l._size[1], g = d - 1; g >= 0; g--) for (var w = v.length, A = 0; A < w; A++) {
      var _ = v[A];
      if (s(p[g][g], 0)) if (s(_[g], 0)) {
        if (A === 0) {
          var F = [..._];
          F[g] = 1;
          for (var B = g - 1; B >= 0; B--) F[B] = a(F[B], p[B][g]);
          v.push(F);
        }
      } else {
        if (A === 0) return [];
        v.splice(A, 1), A -= 1, w -= 1;
      }
      else {
        _[g] = u(_[g], p[g][g]);
        for (var E = g - 1; E >= 0; E--) _[E] = a(_[E], t(_[g], p[E][g]));
      }
    }
    return v.map((C) => new D({ data: C.map((y) => [y]), size: [i, 1] }));
  }
  function o(l, m) {
    for (var v = [c(l, m, true)._data.map((W) => W[0])], p = l._size[0], i = l._size[1], d = l._values, g = l._index, w = l._ptr, A = i - 1; A >= 0; A--) for (var _ = v.length, E = 0; E < _; E++) {
      for (var F = v[E], B = [], C = [], y = w[A], x = w[A + 1], h = 0, b = x - 1; b >= y; b--) {
        var M = g[b];
        M === A ? h = d[b] : M < A && (B.push(d[b]), C.push(M));
      }
      if (s(h, 0)) if (s(F[A], 0)) {
        if (E === 0) {
          var I = [...F];
          I[A] = 1;
          for (var T = 0, O = C.length; T < O; T++) {
            var P = C[T];
            I[P] = a(I[P], B[T]);
          }
          v.push(I);
        }
      } else {
        if (E === 0) return [];
        v.splice(E, 1), E -= 1, _ -= 1;
      }
      else {
        F[A] = u(F[A], h);
        for (var S = 0, z = C.length; S < z; S++) {
          var N = C[S];
          F[N] = a(F[N], t(F[A], B[S]));
        }
      }
    }
    return v.map((W) => new D({ data: W.map(($) => [$]), size: [p, 1] }));
  }
}), _e = "equal", Yo = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat", "SparseMatrix"], Xo = G(_e, Yo, (r) => {
  var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ne({ typed: e }), c = fe({ typed: e, SparseMatrix: s }), f = te({ typed: e, DenseMatrix: t }), o = Yr({ typed: e, matrix: n, concat: a });
  return e(_e, Ko({ typed: e, equalScalar: u }), o({ elop: u, SS: c, DS: D, Ss: f }));
}), Ko = G(_e, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(_e, { "any, any": function(t, a) {
    return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
  } });
}), Be = "smaller", Ho = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], jo = G(Be, Ho, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, c = ne({ typed: e }), f = fe({ typed: e, SparseMatrix: D }), o = te({ typed: e, DenseMatrix: a }), l = Yr({ typed: e, matrix: t, concat: s }), m = se({ typed: e });
  function v(p, i) {
    return p.lt(i) && !ee(p, i, n.relTol, n.absTol);
  }
  return e(Be, ko({ typed: e, config: n }), { "boolean, boolean": (p, i) => p < i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p < i, "Fraction, Fraction": (p, i) => p.compare(i) === -1, "Fraction, BigNumber": function(i, d) {
    return v(u(i), d);
  }, "BigNumber, Fraction": function(i, d) {
    return v(i, u(d));
  }, "Complex, Complex": function(i, d) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, m, l({ SS: f, DS: c, Ss: o }));
}), ko = G(Be, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Be, { "number, number": function(t, a) {
    return t < a && !Pr(t, a, n.relTol, n.absTol);
  } });
}), xe = "smallerEq", rs = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], es = G(xe, rs, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ne({ typed: e }), c = fe({ typed: e, SparseMatrix: s }), f = te({ typed: e, DenseMatrix: t }), o = Yr({ typed: e, matrix: u, concat: a }), l = se({ typed: e });
  return e(xe, ts({ typed: e, config: n }), { "boolean, boolean": (m, v) => m <= v, "BigNumber, BigNumber": function(v, p) {
    return v.lte(p) || ee(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": (m, v) => m <= v, "Fraction, Fraction": (m, v) => m.compare(v) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: c, DS: D, Ss: f }));
}), ts = G(xe, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(xe, { "number, number": function(t, a) {
    return t <= a || Pr(t, a, n.relTol, n.absTol);
  } });
}), Se = "larger", ns = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], us = G(Se, ns, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, c = ne({ typed: e }), f = fe({ typed: e, SparseMatrix: D }), o = te({ typed: e, DenseMatrix: a }), l = Yr({ typed: e, matrix: t, concat: s }), m = se({ typed: e });
  function v(p, i) {
    return p.gt(i) && !ee(p, i, n.relTol, n.absTol);
  }
  return e(Se, as({ typed: e, config: n }), { "boolean, boolean": (p, i) => p > i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p > i, "Fraction, Fraction": (p, i) => p.compare(i) === 1, "Fraction, BigNumber": function(i, d) {
    return v(u(i), d);
  }, "BigNumber, Fraction": function(i, d) {
    return v(i, u(d));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, m, l({ SS: f, DS: c, Ss: o }));
}), as = G(Se, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Se, { "number, number": function(t, a) {
    return t > a && !Pr(t, a, n.relTol, n.absTol);
  } });
}), Me = "largerEq", is = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], os = G(Me, is, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ne({ typed: e }), c = fe({ typed: e, SparseMatrix: s }), f = te({ typed: e, DenseMatrix: t }), o = Yr({ typed: e, matrix: u, concat: a }), l = se({ typed: e });
  return e(Me, ss({ typed: e, config: n }), { "boolean, boolean": (m, v) => m >= v, "BigNumber, BigNumber": function(v, p) {
    return v.gte(p) || ee(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": function(v, p) {
    return v >= p;
  }, "Fraction, Fraction": (m, v) => m.compare(v) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: c, DS: D, Ss: f }));
}), ss = G(Me, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Me, { "number, number": function(t, a) {
    return t >= a || Pr(t, a, n.relTol, n.absTol);
  } });
}), fs = "ImmutableDenseMatrix", ls = ["smaller", "DenseMatrix"], cs = G(fs, ls, (r) => {
  var { smaller: e, DenseMatrix: n } = r;
  function u(t, a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !$r(a)) throw new Error("Invalid datatype: " + a);
    if (lr(t) || mr(t)) {
      var s = new n(t, a);
      this._data = s._data, this._size = s._size, this._datatype = s._datatype, this._min = null, this._max = null;
    } else if (t && mr(t.data) && mr(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t) throw new TypeError("Unsupported type of data (" + Ir(t) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return u.prototype = new n(), u.prototype.type = "ImmutableDenseMatrix", u.prototype.isImmutableDenseMatrix = true, u.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var a = n.prototype.subset.call(this, t);
        return lr(a) ? new u({ data: a._data, size: a._size, datatype: a._datatype }) : a;
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
    return new u({ data: ar(this._data), size: ar(this._size), datatype: this._datatype });
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
}, { isClass: true }), vs = "Index", Ds = ["ImmutableDenseMatrix", "getMatrixDataType"], ps = G(vs, Ds, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
  function u(a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var s = 0, D = arguments.length; s < D; s++) {
      var c = arguments[s], f = mr(c), o = lr(c), l = typeof c, m = null;
      if (Fn(c)) this._dimensions.push(c), this._isScalar = false;
      else if (f || o) {
        var v = void 0;
        n(c) === "boolean" ? (f && (v = t(sn(c).valueOf())), o && (v = t(sn(c._data).valueOf())), m = c.valueOf().length) : v = t(c.valueOf()), this._dimensions.push(v);
        var p = v.size();
        (p.length !== 1 || p[0] !== 1 || m !== null) && (this._isScalar = false);
      } else if (l === "number") this._dimensions.push(t([c]));
      else if (l === "bigint") this._dimensions.push(t([Number(c)]));
      else if (l === "string") this._dimensions.push(c);
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
    return a._dimensions = ar(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
  }, u.create = function(a) {
    var s = new u();
    return u.apply(s, a), s;
  }, u.prototype.size = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var c = this._dimensions[s];
      a[s] = typeof c == "string" ? 1 : c.size()[0];
    }
    return a;
  }, u.prototype.max = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var c = this._dimensions[s];
      a[s] = typeof c == "string" ? c : c.max();
    }
    return a;
  }, u.prototype.min = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var c = this._dimensions[s];
      a[s] = typeof c == "string" ? c : c.min();
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
      var c = this._dimensions[s];
      a.push(typeof c == "string" ? c : c.toArray());
    }
    return a;
  }, u.prototype.valueOf = u.prototype.toArray, u.prototype.toString = function() {
    for (var a = [], s = 0, D = this._dimensions.length; s < D; s++) {
      var c = this._dimensions[s];
      typeof c == "string" ? a.push(JSON.stringify(c)) : a.push(c.toString());
    }
    return "[" + a.join(", ") + "]";
  }, u.prototype.toJSON = function() {
    return { mathjs: "Index", dimensions: this._dimensions };
  }, u.fromJSON = function(a) {
    return u.create(a.dimensions);
  }, u;
}, { isClass: true });
function sn(r) {
  var e = [];
  return r.forEach((n, u) => {
    n && e.push(u);
  }), e;
}
var ds = "atan", hs = ["typed"], ms = G(ds, hs, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(u) {
    return Math.atan(u);
  }, Complex: function(u) {
    return u.atan();
  }, BigNumber: function(u) {
    return u.atan();
  } });
}), Kn = G("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((n) => (u) => {
    if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(n, u.valueType())(u.value);
  }) };
}), fn = "cos", gs = ["typed"], ys = G(fn, gs, (r) => {
  var { typed: e } = r, n = Kn({ typed: e });
  return e(fn, { number: Math.cos, "Complex | BigNumber": (u) => u.cos() }, n);
}), ln = "sin", As = ["typed"], Fs = G(ln, As, (r) => {
  var { typed: e } = r, n = Kn({ typed: e });
  return e(ln, { number: Math.sin, "Complex | BigNumber": (u) => u.sin() }, n);
}), cn = "add", Es = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], Cs = G(cn, Es, (r) => {
  var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: s, concat: D } = r, c = Qn({ typed: e }), f = Ri({ typed: e, equalScalar: t }), o = Wn({ typed: e, DenseMatrix: a }), l = Yr({ typed: e, matrix: n, concat: D });
  return e(cn, { "any, any": u, "any, any, ...any": e.referToSelf((m) => (v, p, i) => {
    for (var d = m(v, p), g = 0; g < i.length; g++) d = m(d, i[g]);
    return d;
  }) }, l({ elop: u, DS: c, SS: f, Ss: o }));
}), vn = "norm", ws = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], bs = G(vn, ws, (r) => {
  var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: s, multiply: D, equalScalar: c, larger: f, smaller: o, matrix: l, ctranspose: m, eigs: v } = r;
  return e(vn, { number: Math.abs, Complex: function(C) {
    return C.abs();
  }, BigNumber: function(C) {
    return C.abs();
  }, boolean: function(C) {
    return Math.abs(C);
  }, Array: function(C) {
    return F(l(C), 2);
  }, Matrix: function(C) {
    return F(C, 2);
  }, "Array, number | BigNumber | string": function(C, y) {
    return F(l(C), y);
  }, "Matrix, number | BigNumber | string": function(C, y) {
    return F(C, y);
  } });
  function p(B) {
    var C = 0;
    return B.forEach(function(y) {
      var x = n(y);
      f(x, C) && (C = x);
    }, true), C;
  }
  function i(B) {
    var C;
    return B.forEach(function(y) {
      var x = n(y);
      (!C || o(x, C)) && (C = x);
    }, true), C || 0;
  }
  function d(B, C) {
    if (C === Number.POSITIVE_INFINITY || C === "inf") return p(B);
    if (C === Number.NEGATIVE_INFINITY || C === "-inf") return i(B);
    if (C === "fro") return F(B, 2);
    if (typeof C == "number" && !isNaN(C)) {
      if (!c(C, 0)) {
        var y = 0;
        return B.forEach(function(x) {
          y = u(t(n(x), C), y);
        }, true), t(y, 1 / C);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function g(B) {
    var C = 0;
    return B.forEach(function(y, x) {
      C = u(C, D(y, a(y)));
    }), n(s(C));
  }
  function w(B) {
    var C = [], y = 0;
    return B.forEach(function(x, h) {
      var b = h[1], M = u(C[b] || 0, n(x));
      f(M, y) && (y = M), C[b] = M;
    }, true), y;
  }
  function A(B) {
    var C = B.size();
    if (C[0] !== C[1]) throw new RangeError("Invalid matrix dimensions");
    var y = m(B), x = D(y, B), h = v(x).values.toArray(), b = h[h.length - 1];
    return n(s(b));
  }
  function _(B) {
    var C = [], y = 0;
    return B.forEach(function(x, h) {
      var b = h[0], M = u(C[b] || 0, n(x));
      f(M, y) && (y = M), C[b] = M;
    }, true), y;
  }
  function E(B, C) {
    if (C === 1) return w(B);
    if (C === Number.POSITIVE_INFINITY || C === "inf") return _(B);
    if (C === "fro") return g(B);
    if (C === 2) return A(B);
    throw new Error("Unsupported parameter value " + C);
  }
  function F(B, C) {
    var y = B.size();
    if (y.length === 1) return d(B, C);
    if (y.length === 2) {
      if (y[0] && y[1]) return E(B, C);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), Dn = "dot", _s = ["typed", "addScalar", "multiplyScalar", "conj", "size"], Bs = G(Dn, _s, (r) => {
  var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
  return e(Dn, { "Array | DenseMatrix, Array | DenseMatrix": D, "SparseMatrix, SparseMatrix": c });
  function s(o, l) {
    var m = f(o), v = f(l), p, i;
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
    var m = s(o, l), v = lr(o) ? o._data : o, p = lr(o) ? o._datatype || o.getDataType() : void 0, i = lr(l) ? l._data : l, d = lr(l) ? l._datatype || l.getDataType() : void 0, g = f(o).length === 2, w = f(l).length === 2, A = n, _ = u;
    if (p && d && p === d && typeof p == "string" && p !== "mixed") {
      var E = p;
      A = e.find(n, [E, E]), _ = e.find(u, [E, E]);
    }
    if (!g && !w) {
      for (var F = _(t(v[0]), i[0]), B = 1; B < m; B++) F = A(F, _(t(v[B]), i[B]));
      return F;
    }
    if (!g && w) {
      for (var C = _(t(v[0]), i[0][0]), y = 1; y < m; y++) C = A(C, _(t(v[y]), i[y][0]));
      return C;
    }
    if (g && !w) {
      for (var x = _(t(v[0][0]), i[0]), h = 1; h < m; h++) x = A(x, _(t(v[h][0]), i[h]));
      return x;
    }
    if (g && w) {
      for (var b = _(t(v[0][0]), i[0][0]), M = 1; M < m; M++) b = A(b, _(t(v[M][0]), i[M][0]));
      return b;
    }
  }
  function c(o, l) {
    s(o, l);
    for (var m = o._index, v = o._values, p = l._index, i = l._values, d = 0, g = n, w = u, A = 0, _ = 0; A < m.length && _ < p.length; ) {
      var E = m[A], F = p[_];
      if (E < F) {
        A++;
        continue;
      }
      if (E > F) {
        _++;
        continue;
      }
      E === F && (d = g(d, w(v[A], i[_])), A++, _++);
    }
    return d;
  }
  function f(o) {
    return lr(o) ? o.size() : a(o);
  }
}), pn = "qr", xs = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], Ss = G(pn, xs, (r) => {
  var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: s, sign: D, sqrt: c, conj: f, unaryMinus: o, addScalar: l, divideScalar: m, multiplyScalar: v, subtractScalar: p, complex: i } = r;
  return Ne(e(pn, { DenseMatrix: function(_) {
    return g(_);
  }, SparseMatrix: function(_) {
    return w();
  }, Array: function(_) {
    var E = n(_), F = g(E);
    return { Q: F.Q.valueOf(), R: F.R.valueOf() };
  } }), { _denseQRimpl: d });
  function d(A) {
    var _ = A._size[0], E = A._size[1], F = t([_], "dense"), B = F._data, C = A.clone(), y = C._data, x, h, b, M = u([_], "");
    for (b = 0; b < Math.min(E, _); ++b) {
      var S = y[b][b], z = o(s(S, 0) ? 1 : D(S)), N = f(z), I = 0;
      for (x = b; x < _; x++) I = l(I, v(y[x][b], f(y[x][b])));
      var T = v(z, c(I));
      if (!a(T)) {
        var O = p(S, T);
        for (M[b] = 1, x = b + 1; x < _; x++) M[x] = m(y[x][b], O);
        var P = o(f(m(O, T))), W = void 0;
        for (h = b; h < E; h++) {
          for (W = 0, x = b; x < _; x++) W = l(W, v(f(M[x]), y[x][h]));
          for (W = v(W, P), x = b; x < _; x++) y[x][h] = v(p(y[x][h], v(M[x], W)), N);
        }
        for (x = 0; x < _; x++) {
          for (W = 0, h = b; h < _; h++) W = l(W, v(B[x][h], M[h]));
          for (W = v(W, P), h = b; h < _; ++h) B[x][h] = m(p(B[x][h], v(W, f(M[h]))), N);
        }
      }
    }
    return { Q: F, R: C, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function g(A) {
    var _ = d(A), E = _.R._data;
    if (A._data.length > 0) for (var F = E[0][0].type === "Complex" ? i(0) : 0, B = 0; B < E.length; ++B) for (var C = 0; C < B && C < (E[0] || []).length; ++C) E[B][C] = F;
    return _;
  }
  function w(A) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
}), dn = "det", Ms = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], Ns = G(dn, Ms, (r) => {
  var { typed: e, matrix: n, subtractScalar: u, multiply: t, divideScalar: a, isZero: s, unaryMinus: D } = r;
  return e(dn, { any: function(o) {
    return ar(o);
  }, "Array | Matrix": function(o) {
    var l;
    switch (lr(o) ? l = o.size() : Array.isArray(o) ? (o = n(o), l = o.size()) : l = [], l.length) {
      case 0:
        return ar(o);
      case 1:
        if (l[0] === 1) return ar(o.valueOf()[0]);
        if (l[0] === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + dr(l) + ")");
      case 2: {
        var m = l[0], v = l[1];
        if (m === v) return c(o.clone().valueOf(), m);
        if (v === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + dr(l) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + dr(l) + ")");
    }
  } });
  function c(f, o, l) {
    if (o === 1) return ar(f[0][0]);
    if (o === 2) return u(t(f[0][0], f[1][1]), t(f[1][0], f[0][1]));
    for (var m = false, v = new Array(o).fill(0).map((B, C) => C), p = 0; p < o; p++) {
      var i = v[p];
      if (s(f[i][p])) {
        var d = void 0;
        for (d = p + 1; d < o; d++) if (!s(f[v[d]][p])) {
          i = v[d], v[d] = v[p], v[p] = i, m = !m;
          break;
        }
        if (d === o) return f[i][p];
      }
      for (var g = f[i][p], w = p === 0 ? 1 : f[v[p - 1]][p - 1], A = p + 1; A < o; A++) for (var _ = v[A], E = p + 1; E < o; E++) f[_][E] = a(u(t(f[_][E], g), t(f[_][p], f[i][E])), w);
    }
    var F = f[v[o - 1]][o - 1];
    return m ? D(F) : F;
  }
}), hn = "inv", Ts = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], zs = G(hn, Ts, (r) => {
  var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: s, det: D, identity: c, abs: f } = r;
  return e(hn, { "Array | Matrix": function(m) {
    var v = lr(m) ? m.size() : ir(m);
    switch (v.length) {
      case 1:
        if (v[0] === 1) return lr(m) ? n([u(1, m.valueOf()[0])]) : [u(1, m[0])];
        throw new RangeError("Matrix must be square (size: " + dr(v) + ")");
      case 2: {
        var p = v[0], i = v[1];
        if (p === i) return lr(m) ? n(o(m.valueOf(), p, i), m.storage()) : o(m, p, i);
        throw new RangeError("Matrix must be square (size: " + dr(v) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + dr(v) + ")");
    }
  }, any: function(m) {
    return u(1, m);
  } });
  function o(l, m, v) {
    var p, i, d, g, w;
    if (m === 1) {
      if (g = l[0][0], g === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(1, g)]];
    } else if (m === 2) {
      var A = D(l);
      if (A === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(l[1][1], A), u(s(l[0][1]), A)], [u(s(l[1][0]), A), u(l[0][0], A)]];
    } else {
      var _ = l.concat();
      for (p = 0; p < m; p++) _[p] = _[p].concat();
      for (var E = c(m).valueOf(), F = 0; F < v; F++) {
        var B = f(_[F][F]), C = F;
        for (p = F + 1; p < m; ) f(_[p][F]) > B && (B = f(_[p][F]), C = p), p++;
        if (B === 0) throw Error("Cannot calculate inverse, determinant is zero");
        p = C, p !== F && (w = _[F], _[F] = _[p], _[p] = w, w = E[F], E[F] = E[p], E[p] = w);
        var y = _[F], x = E[F];
        for (p = 0; p < m; p++) {
          var h = _[p], b = E[p];
          if (p !== F) {
            if (h[F] !== 0) {
              for (d = u(s(h[F]), y[F]), i = F; i < v; i++) h[i] = t(h[i], a(d, y[i]));
              for (i = 0; i < v; i++) b[i] = t(b[i], a(d, x[i]));
            }
          } else {
            for (d = y[F], i = F; i < v; i++) h[i] = u(h[i], d);
            for (i = 0; i < v; i++) b[i] = u(b[i], d);
          }
        }
      }
      return E;
    }
  }
});
function Os(r) {
  var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: s, sqrt: D, abs: c, bignumber: f, diag: o, size: l, reshape: m, inv: v, qr: p, usolve: i, usolveAll: d, equal: g, complex: w, larger: A, smaller: _, matrixFromColumns: E, dot: F } = r;
  function B($, q, V, Y) {
    var Z = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, R = C($, q, V, Y, Z);
    y($, q, V, Y, Z, R);
    var { values: J, C: L } = x($, q, V, Y, Z);
    if (Z) {
      var U = h($, q, L, R, J, V, Y);
      return { values: J, eigenvectors: U };
    }
    return { values: J };
  }
  function C($, q, V, Y, Z) {
    var R = Y === "BigNumber", J = Y === "Complex", L = R ? f(0) : 0, U = R ? f(1) : J ? w(1) : 1, K = R ? f(1) : 1, Q = R ? f(10) : 2, j = a(Q, Q), rr;
    Z && (rr = Array(q).fill(U));
    for (var tr = false; !tr; ) {
      tr = true;
      for (var nr = 0; nr < q; nr++) {
        for (var ur = L, fr = L, gr = 0; gr < q; gr++) nr !== gr && (ur = e(ur, c($[gr][nr])), fr = e(fr, c($[nr][gr])));
        if (!g(ur, 0) && !g(fr, 0)) {
          for (var cr = K, Dr = ur, xr = s(fr, Q), Sr = a(fr, Q); _(Dr, xr); ) Dr = a(Dr, j), cr = a(cr, Q);
          for (; A(Dr, Sr); ) Dr = s(Dr, j), cr = s(cr, Q);
          var Cr = _(s(e(Dr, fr), cr), a(e(ur, fr), 0.95));
          if (Cr) {
            tr = false;
            for (var Qr = s(1, cr), Tr = 0; Tr < q; Tr++) nr !== Tr && ($[nr][Tr] = a($[nr][Tr], Qr), $[Tr][nr] = a($[Tr][nr], cr));
            Z && (rr[nr] = a(rr[nr], Qr));
          }
        }
      }
    }
    return Z ? o(rr) : null;
  }
  function y($, q, V, Y, Z, R) {
    var J = Y === "BigNumber", L = Y === "Complex", U = J ? f(0) : L ? w(0) : 0;
    J && (V = f(V));
    for (var K = 0; K < q - 2; K++) {
      for (var Q = 0, j = U, rr = K + 1; rr < q; rr++) {
        var tr = $[rr][K];
        _(c(j), c(tr)) && (j = tr, Q = rr);
      }
      if (!_(c(j), V)) {
        if (Q !== K + 1) {
          var nr = $[Q];
          $[Q] = $[K + 1], $[K + 1] = nr;
          for (var ur = 0; ur < q; ur++) {
            var fr = $[ur][Q];
            $[ur][Q] = $[ur][K + 1], $[ur][K + 1] = fr;
          }
          if (Z) {
            var gr = R[Q];
            R[Q] = R[K + 1], R[K + 1] = gr;
          }
        }
        for (var cr = K + 2; cr < q; cr++) {
          var Dr = s($[cr][K], j);
          if (Dr !== 0) {
            for (var xr = 0; xr < q; xr++) $[cr][xr] = n($[cr][xr], a(Dr, $[K + 1][xr]));
            for (var Sr = 0; Sr < q; Sr++) $[Sr][K + 1] = e($[Sr][K + 1], a(Dr, $[Sr][cr]));
            if (Z) for (var Cr = 0; Cr < q; Cr++) R[cr][Cr] = n(R[cr][Cr], a(Dr, R[K + 1][Cr]));
          }
        }
      }
    }
    return R;
  }
  function x($, q, V, Y, Z) {
    var R = Y === "BigNumber", J = Y === "Complex", L = R ? f(1) : J ? w(1) : 1;
    R && (V = f(V));
    for (var U = ar($), K = [], Q = q, j = [], rr = Z ? o(Array(q).fill(L)) : void 0, tr = Z ? o(Array(Q).fill(L)) : void 0, nr = 0; nr <= 100; ) {
      nr += 1;
      for (var ur = U[Q - 1][Q - 1], fr = 0; fr < Q; fr++) U[fr][fr] = n(U[fr][fr], ur);
      var { Q: gr, R: cr } = p(U);
      U = t(cr, gr);
      for (var Dr = 0; Dr < Q; Dr++) U[Dr][Dr] = e(U[Dr][Dr], ur);
      if (Z && (tr = t(tr, gr)), Q === 1 || _(c(U[Q - 1][Q - 2]), V)) {
        nr = 0, K.push(U[Q - 1][Q - 1]), Z && (j.unshift([[1]]), S(tr, q), rr = t(rr, tr), Q > 1 && (tr = o(Array(Q - 1).fill(L)))), Q -= 1, U.pop();
        for (var xr = 0; xr < Q; xr++) U[xr].pop();
      } else if (Q === 2 || _(c(U[Q - 2][Q - 3]), V)) {
        nr = 0;
        var Sr = b(U[Q - 2][Q - 2], U[Q - 2][Q - 1], U[Q - 1][Q - 2], U[Q - 1][Q - 1]);
        K.push(...Sr), Z && (j.unshift(M(U[Q - 2][Q - 2], U[Q - 2][Q - 1], U[Q - 1][Q - 2], U[Q - 1][Q - 1], Sr[0], Sr[1], V, Y)), S(tr, q), rr = t(rr, tr), Q > 2 && (tr = o(Array(Q - 2).fill(L)))), Q -= 2, U.pop(), U.pop();
        for (var Cr = 0; Cr < Q; Cr++) U[Cr].pop(), U[Cr].pop();
      }
      if (Q === 0) break;
    }
    if (K.sort((pe, Rr) => +n(c(pe), c(Rr))), nr > 100) {
      var Qr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + K.join(", "));
      throw Qr.values = K, Qr.vectors = [], Qr;
    }
    var Tr = Z ? t(rr, z(j, q)) : void 0;
    return { values: K, C: Tr };
  }
  function h($, q, V, Y, Z, R, J) {
    var L = v(V), U = t(L, $, V), K = J === "BigNumber", Q = J === "Complex", j = K ? f(0) : Q ? w(0) : 0, rr = K ? f(1) : Q ? w(1) : 1, tr = [], nr = [];
    for (var ur of Z) {
      var fr = N(tr, ur, g);
      fr === -1 ? (tr.push(ur), nr.push(1)) : nr[fr] += 1;
    }
    for (var gr = [], cr = tr.length, Dr = Array(q).fill(j), xr = o(Array(q).fill(rr)), Sr = function() {
      var Tr = tr[Cr], pe = n(U, t(Tr, xr)), Rr = d(pe, Dr);
      for (Rr.shift(); Rr.length < nr[Cr]; ) {
        var dt = I(pe, q, Rr, R, J);
        if (dt === null) break;
        Rr.push(dt);
      }
      var uu = t(v(Y), V);
      Rr = Rr.map((Le) => t(uu, Le)), gr.push(...Rr.map((Le) => ({ value: Tr, vector: u(Le) })));
    }, Cr = 0; Cr < cr; Cr++) Sr();
    return gr;
  }
  function b($, q, V, Y) {
    var Z = e($, Y), R = n(a($, Y), a(q, V)), J = a(Z, 0.5), L = a(D(n(a(Z, Z), a(4, R))), 0.5);
    return [e(J, L), n(J, L)];
  }
  function M($, q, V, Y, Z, R, J, L) {
    var U = L === "BigNumber", K = L === "Complex", Q = U ? f(0) : K ? w(0) : 0, j = U ? f(1) : K ? w(1) : 1;
    if (_(c(V), J)) return [[j, Q], [Q, j]];
    if (A(c(n(Z, R)), J)) return [[n(Z, Y), n(R, Y)], [V, V]];
    var rr = n($, Z), tr = n(Y, Z);
    return _(c(q), J) && _(c(tr), J) ? [[rr, j], [V, Q]] : [[q, Q], [tr, j]];
  }
  function S($, q) {
    for (var V = 0; V < $.length; V++) $[V].push(...Array(q - $[V].length).fill(0));
    for (var Y = $.length; Y < q; Y++) $.push(Array(q).fill(0)), $[Y][Y] = 1;
    return $;
  }
  function z($, q) {
    for (var V = [], Y = 0; Y < q; Y++) V[Y] = Array(q).fill(0);
    var Z = 0;
    for (var R of $) {
      for (var J = R.length, L = 0; L < J; L++) for (var U = 0; U < J; U++) V[Z + L][Z + U] = R[L][U];
      Z += J;
    }
    return V;
  }
  function N($, q, V) {
    for (var Y = 0; Y < $.length; Y++) if (V($[Y], q)) return Y;
    return -1;
  }
  function I($, q, V, Y, Z) {
    for (var R = Z === "BigNumber" ? f(1e3) : 1e3, J, L = 0; L < 5; ++L) {
      J = T(q, V, Z);
      try {
        J = i($, J);
      } catch {
        continue;
      }
      if (A(P(J), R)) break;
    }
    if (L >= 5) return null;
    for (L = 0; ; ) {
      var U = i($, J);
      if (_(P(O(J, [U])), Y)) break;
      if (++L >= 10) return null;
      J = W(U);
    }
    return J;
  }
  function T($, q, V) {
    var Y = V === "BigNumber", Z = V === "Complex", R = Array($).fill(0).map((J) => 2 * Math.random() - 1);
    return Y && (R = R.map((J) => f(J))), Z && (R = R.map((J) => w(J))), R = O(R, q), W(R, V);
  }
  function O($, q) {
    var V = l($);
    for (var Y of q) Y = m(Y, V), $ = n($, t(s(F(Y, $), F(Y, Y)), Y));
    return $;
  }
  function P($) {
    return c(D(F($, $)));
  }
  function W($, q) {
    var V = q === "BigNumber", Y = q === "Complex", Z = V ? f(1) : Y ? w(1) : 1;
    return t(s(Z, P($)), $);
  }
  return B;
}
function $s(r) {
  var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: s, sin: D, multiplyScalar: c, inv: f, bignumber: o, multiply: l, add: m } = r;
  function v(y, x) {
    var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, b = arguments.length > 3 ? arguments[3] : void 0, M = arguments.length > 4 ? arguments[4] : void 0;
    if (b === "number") return p(y, h, M);
    if (b === "BigNumber") return i(y, h, M);
    throw TypeError("Unsupported data type: " + b);
  }
  function p(y, x, h) {
    var b = y.length, M = Math.abs(x / b), S, z;
    if (h) {
      z = new Array(b);
      for (var N = 0; N < b; N++) z[N] = Array(b).fill(0), z[N][N] = 1;
    }
    for (var I = F(y); Math.abs(I[1]) >= Math.abs(M); ) {
      var T = I[0][0], O = I[0][1];
      S = d(y[T][T], y[O][O], y[T][O]), y = E(y, S, T, O), h && (z = w(z, S, T, O)), I = F(y);
    }
    for (var P = Array(b).fill(0), W = 0; W < b; W++) P[W] = y[W][W];
    return C(ar(P), z, h);
  }
  function i(y, x, h) {
    var b = y.length, M = t(x / b), S, z;
    if (h) {
      z = new Array(b);
      for (var N = 0; N < b; N++) z[N] = Array(b).fill(0), z[N][N] = 1;
    }
    for (var I = B(y); t(I[1]) >= t(M); ) {
      var T = I[0][0], O = I[0][1];
      S = g(y[T][T], y[O][O], y[T][O]), y = _(y, S, T, O), h && (z = A(z, S, T, O)), I = B(y);
    }
    for (var P = Array(b).fill(0), W = 0; W < b; W++) P[W] = y[W][W];
    return C(ar(P), z, h);
  }
  function d(y, x, h) {
    var b = x - y;
    return Math.abs(b) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * h / (x - y));
  }
  function g(y, x, h) {
    var b = u(x, y);
    return t(b) <= e.relTol ? o(-1).acos().div(4) : c(0.5, a(l(2, h, f(b))));
  }
  function w(y, x, h, b) {
    for (var M = y.length, S = Math.cos(x), z = Math.sin(x), N = Array(M).fill(0), I = Array(M).fill(0), T = 0; T < M; T++) N[T] = S * y[T][h] - z * y[T][b], I[T] = z * y[T][h] + S * y[T][b];
    for (var O = 0; O < M; O++) y[O][h] = N[O], y[O][b] = I[O];
    return y;
  }
  function A(y, x, h, b) {
    for (var M = y.length, S = s(x), z = D(x), N = Array(M).fill(o(0)), I = Array(M).fill(o(0)), T = 0; T < M; T++) N[T] = u(c(S, y[T][h]), c(z, y[T][b])), I[T] = n(c(z, y[T][h]), c(S, y[T][b]));
    for (var O = 0; O < M; O++) y[O][h] = N[O], y[O][b] = I[O];
    return y;
  }
  function _(y, x, h, b) {
    for (var M = y.length, S = o(s(x)), z = o(D(x)), N = c(S, S), I = c(z, z), T = Array(M).fill(o(0)), O = Array(M).fill(o(0)), P = l(o(2), S, z, y[h][b]), W = n(u(c(N, y[h][h]), P), c(I, y[b][b])), $ = m(c(I, y[h][h]), P, c(N, y[b][b])), q = 0; q < M; q++) T[q] = u(c(S, y[h][q]), c(z, y[b][q])), O[q] = n(c(z, y[h][q]), c(S, y[b][q]));
    y[h][h] = W, y[b][b] = $, y[h][b] = o(0), y[b][h] = o(0);
    for (var V = 0; V < M; V++) V !== h && V !== b && (y[h][V] = T[V], y[V][h] = T[V], y[b][V] = O[V], y[V][b] = O[V]);
    return y;
  }
  function E(y, x, h, b) {
    for (var M = y.length, S = Math.cos(x), z = Math.sin(x), N = S * S, I = z * z, T = Array(M).fill(0), O = Array(M).fill(0), P = N * y[h][h] - 2 * S * z * y[h][b] + I * y[b][b], W = I * y[h][h] + 2 * S * z * y[h][b] + N * y[b][b], $ = 0; $ < M; $++) T[$] = S * y[h][$] - z * y[b][$], O[$] = z * y[h][$] + S * y[b][$];
    y[h][h] = P, y[b][b] = W, y[h][b] = 0, y[b][h] = 0;
    for (var q = 0; q < M; q++) q !== h && q !== b && (y[h][q] = T[q], y[q][h] = T[q], y[b][q] = O[q], y[q][b] = O[q]);
    return y;
  }
  function F(y) {
    for (var x = y.length, h = 0, b = [0, 1], M = 0; M < x; M++) for (var S = M + 1; S < x; S++) Math.abs(h) < Math.abs(y[M][S]) && (h = Math.abs(y[M][S]), b = [M, S]);
    return [b, h];
  }
  function B(y) {
    for (var x = y.length, h = 0, b = [0, 1], M = 0; M < x; M++) for (var S = M + 1; S < x; S++) t(h) < t(y[M][S]) && (h = t(y[M][S]), b = [M, S]);
    return [b, h];
  }
  function C(y, x, h) {
    var b = y.length, M = Array(b), S;
    if (h) {
      S = Array(b);
      for (var z = 0; z < b; z++) S[z] = Array(b);
    }
    for (var N = 0; N < b; N++) {
      for (var I = 0, T = y[0], O = 0; O < y.length; O++) t(y[O]) < t(T) && (I = O, T = y[I]);
      if (M[N] = y.splice(I, 1)[0], h) for (var P = 0; P < b; P++) S[N][P] = x[P][I], x[P].splice(I, 1);
    }
    if (!h) return { values: M };
    var W = S.map(($, q) => ({ value: M[q], vector: $ }));
    return { values: M, eigenvectors: W };
  }
  return v;
}
var Is = "eigs", qs = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], Rs = G(Is, qs, (r) => {
  var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: s, abs: D, atan: c, cos: f, sin: o, multiplyScalar: l, divideScalar: m, inv: v, bignumber: p, multiply: i, add: d, larger: g, column: w, flatten: A, number: _, complex: E, sqrt: F, diag: B, size: C, reshape: y, qr: x, usolve: h, usolveAll: b, im: M, re: S, smaller: z, matrixFromColumns: N, dot: I } = r, T = $s({ config: e, addScalar: t, subtract: a, abs: D, atan: c, cos: f, sin: o, multiplyScalar: l, inv: v, bignumber: p, multiply: i, add: d }), O = Os({ addScalar: t, subtract: a, multiply: i, multiplyScalar: l, flatten: A, divideScalar: m, sqrt: F, abs: D, bignumber: p, diag: B, size: C, reshape: y, qr: x, inv: v, usolve: h, usolveAll: b, equal: s, complex: E, larger: g, smaller: z, matrixFromColumns: N, dot: I });
  return n("eigs", { Array: function(R) {
    return P(u(R));
  }, "Array, number|BigNumber": function(R, J) {
    return P(u(R), { precision: J });
  }, "Array, Object"(Z, R) {
    return P(u(Z), R);
  }, Matrix: function(R) {
    return P(R, { matricize: true });
  }, "Matrix, number|BigNumber": function(R, J) {
    return P(R, { precision: J, matricize: true });
  }, "Matrix, Object": function(R, J) {
    var L = { matricize: true };
    return Ne(L, J), P(R, L);
  } });
  function P(Z) {
    var R, J = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = "eigenvectors" in J ? J.eigenvectors : true, U = (R = J.precision) !== null && R !== void 0 ? R : e.relTol, K = W(Z, U, L);
    return J.matricize && (K.values = u(K.values), L && (K.eigenvectors = K.eigenvectors.map((Q) => {
      var { value: j, vector: rr } = Q;
      return { value: j, vector: u(rr) };
    }))), L && Object.defineProperty(K, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), K;
  }
  function W(Z, R, J) {
    var L = Z.toArray(), U = Z.size();
    if (U.length !== 2 || U[0] !== U[1]) throw new RangeError("Matrix must be square (size: ".concat(dr(U), ")"));
    var K = U[0];
    if (q(L, K, R) && (V(L, K), $(L, K, R))) {
      var Q = Y(Z, L, K);
      return T(L, K, R, Q, J);
    }
    var j = Y(Z, L, K);
    return O(L, K, R, j, J);
  }
  function $(Z, R, J) {
    for (var L = 0; L < R; L++) for (var U = L; U < R; U++) if (g(p(D(a(Z[L][U], Z[U][L]))), J)) return false;
    return true;
  }
  function q(Z, R, J) {
    for (var L = 0; L < R; L++) for (var U = 0; U < R; U++) if (g(p(D(M(Z[L][U]))), J)) return false;
    return true;
  }
  function V(Z, R) {
    for (var J = 0; J < R; J++) for (var L = 0; L < R; L++) Z[J][L] = S(Z[J][L]);
  }
  function Y(Z, R, J) {
    var L = Z.datatype();
    if (L === "number" || L === "BigNumber" || L === "Complex") return L;
    for (var U = false, K = false, Q = false, j = 0; j < J; j++) for (var rr = 0; rr < J; rr++) {
      var tr = R[j][rr];
      if (vr(tr) || je(tr)) U = true;
      else if (Ar(tr)) K = true;
      else if (He(tr)) Q = true;
      else throw TypeError("Unsupported type in Matrix: " + Ir(tr));
    }
    if (K && Q && console.warn("Complex BigNumbers not supported, this operation will lose precission."), Q) {
      for (var nr = 0; nr < J; nr++) for (var ur = 0; ur < J; ur++) R[nr][ur] = E(R[nr][ur]);
      return "Complex";
    }
    if (K) {
      for (var fr = 0; fr < J; fr++) for (var gr = 0; gr < J; gr++) R[fr][gr] = p(R[fr][gr]);
      return "BigNumber";
    }
    if (U) {
      for (var cr = 0; cr < J; cr++) for (var Dr = 0; Dr < J; Dr++) R[cr][Dr] = _(R[cr][Dr]);
      return "number";
    } else throw TypeError("Matrix contains unsupported types only.");
  }
}), Us = "divide", Ps = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], Ls = G(Us, Ps, (r) => {
  var { typed: e, matrix: n, multiply: u, equalScalar: t, divideScalar: a, inv: s } = r, D = Jn({ typed: e, equalScalar: t }), c = at({ typed: e });
  return e("divide", En({ "Array | Matrix, Array | Matrix": function(o, l) {
    return u(o, s(l));
  }, "DenseMatrix, any": function(o, l) {
    return c(o, l, a, false);
  }, "SparseMatrix, any": function(o, l) {
    return D(o, l, a, false);
  }, "Array, any": function(o, l) {
    return c(n(o), l, a, false).valueOf();
  }, "any, Array | Matrix": function(o, l) {
    return u(o, s(l));
  } }, a.signatures));
}), le = na({ config: br }), Ie = ia({}), it = Da({}), ot = ha({}), Br = Na({ Matrix: ot }), H = ku({ BigNumber: le, Complex: Ie, DenseMatrix: Br, Fraction: it }), st = vi({ typed: H }), ue = pi({ typed: H }), Vs = ms({ typed: H }), ft = ei({ Complex: Ie, typed: H }), qe = to({ typed: H }), Zs = ys({ typed: H }), qr = La({ config: br, typed: H }), Hn = mo({ typed: H }), Js = yo({ typed: H }), Qs = uo({ typed: H }), jn = za({ typed: H }), Ws = Ia({ config: br, typed: H }), kn = Ra({ equalScalar: qr, typed: H }), Xr = Zi({ typed: H }), lt = Xa({ typed: H }), Gs = io({ typed: H }), Ys = Gi({ BigNumber: le, Fraction: it, complex: ft, typed: H }), Xs = Fs({ typed: H }), Lr = Ja({ Matrix: ot, equalScalar: qr, typed: H }), ce = hi({ typed: H }), ve = ja({ BigNumber: le, typed: H }), sr = ii({ DenseMatrix: Br, Matrix: ot, SparseMatrix: Lr, typed: H }), Ks = xo({ isInteger: jn, matrix: sr, typed: H }), ct = Ki({ Complex: Ie, config: br, typed: H }), ru = To({ matrix: sr, typed: H }), Ke = Io({ BigNumber: le, config: br, matrix: sr, typed: H }), Kr = so({ isInteger: jn, matrix: sr, typed: H }), Hs = Oo({ conj: qe, transpose: ru, typed: H }), js = po({ DenseMatrix: Br, SparseMatrix: Lr, matrix: sr, typed: H }), eu = Xo({ DenseMatrix: Br, SparseMatrix: Lr, concat: Kr, equalScalar: qr, matrix: sr, typed: H }), tu = ui({ Fraction: it, typed: H }), De = Fo({ BigNumber: le, DenseMatrix: Br, SparseMatrix: Lr, config: br, matrix: sr, typed: H }), nu = Co({ matrix: sr, multiplyScalar: Xr, typed: H }), ks = os({ DenseMatrix: Br, SparseMatrix: Lr, concat: Kr, config: br, matrix: sr, typed: H }), rf = Uo({ bignumber: ve, fraction: tu, number: lt }), vt = Mo({ matrix: sr, config: br, typed: H }), Re = jo({ DenseMatrix: Br, SparseMatrix: Lr, bignumber: ve, concat: Kr, config: br, matrix: sr, typed: H }), Ue = li({ typed: H }), Pe = Cs({ DenseMatrix: Br, SparseMatrix: Lr, addScalar: ue, concat: Kr, equalScalar: qr, matrix: sr, typed: H }), Hr = Lo({ numeric: rf, typed: H }), ef = cs({ DenseMatrix: Br, smaller: Re }), tf = ps({ ImmutableDenseMatrix: ef, getMatrixDataType: Js }), Dt = us({ DenseMatrix: Br, SparseMatrix: Lr, bignumber: ve, concat: Kr, config: br, matrix: sr, typed: H }), nf = si({ flatten: Hn, matrix: sr, size: vt, typed: H }), uf = Ss({ addScalar: ue, complex: ft, conj: qe, divideScalar: Hr, equal: eu, identity: De, isZero: kn, matrix: sr, multiplyScalar: Xr, sign: Ys, sqrt: ct, subtractScalar: ce, typed: H, unaryMinus: Ue, zeros: Ke }), af = es({ DenseMatrix: Br, SparseMatrix: Lr, concat: Kr, config: br, matrix: sr, typed: H }), Zr = ji({ DenseMatrix: Br, concat: Kr, equalScalar: qr, matrix: sr, subtractScalar: ce, typed: H, unaryMinus: Ue }), of = Qo({ DenseMatrix: Br, divideScalar: Hr, equalScalar: qr, matrix: sr, multiplyScalar: Xr, subtractScalar: ce, typed: H }), ae = Bs({ addScalar: ue, conj: qe, multiplyScalar: Xr, size: vt, typed: H }), Mr = Qi({ addScalar: ue, dot: ae, equalScalar: qr, matrix: sr, multiplyScalar: Xr, typed: H }), sf = _o({ bignumber: ve, matrix: sr, add: Pe, config: br, isPositive: Ws, larger: Dt, largerEq: ks, smaller: Re, smallerEq: af, typed: H }), ff = Go({ DenseMatrix: Br, divideScalar: Hr, equalScalar: qr, matrix: sr, multiplyScalar: Xr, subtractScalar: ce, typed: H }), lf = lo({ Index: tf, matrix: sr, range: sf, typed: H }), ge = vo({ matrix: sr, multiply: Mr, subtract: Zr, typed: H }), cf = Ns({ divideScalar: Hr, isZero: kn, matrix: sr, multiply: Mr, subtractScalar: ce, typed: H, unaryMinus: Ue }), pt = zs({ abs: st, addScalar: ue, det: cf, divideScalar: Hr, identity: De, matrix: sr, multiply: Mr, typed: H, unaryMinus: Ue }), vf = Zo({ Complex: Ie, config: br, fraction: tu, identity: De, inv: pt, matrix: sr, multiply: Mr, number: lt, typed: H }), ye = Ls({ divideScalar: Hr, equalScalar: qr, inv: pt, matrix: sr, multiply: Mr, typed: H }), Df = Rs({ abs: st, add: Pe, addScalar: ue, atan: Vs, bignumber: ve, column: lf, complex: ft, config: br, cos: Zs, diag: js, divideScalar: Hr, dot: ae, equal: eu, flatten: Hn, im: Qs, inv: pt, larger: Dt, matrix: sr, matrixFromColumns: nf, multiply: Mr, multiplyScalar: Xr, number: lt, qr: uf, re: Gs, reshape: Ks, sin: Xs, size: vt, smaller: Re, sqrt: ct, subtract: Zr, typed: H, usolve: of, usolveAll: ff }), kr = bs({ abs: st, add: Pe, conj: qe, ctranspose: Hs, eigs: Df, equalScalar: qr, larger: Dt, matrix: sr, multiply: Mr, pow: vf, smaller: Re, sqrt: ct, typed: H });
function pf(r) {
  if (r.length === 2) return df(r[0], r[1]);
  if (r.length === 3) return hf(r[0], r[1], r[2]);
}
function df(r, e) {
  const n = Zr(e, r), u = kr(n), t = ae(n, [1, 0, 0]) / u, a = ae(n, [0, 1, 0]) / u, s = ae(n, [0, 0, 1]) / u, D = Math.sqrt(t ** 2 + a ** 2);
  let c = [[t, a, s], [-a / D, t / D, 0], [-t * s / D, -a * s / D, D]];
  return s === 1 && (c = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]]), s === -1 && (c = [[0, 0, -1], [0, 1, 0], [1, 0, 0]]), nu(De(4), c).toArray();
}
function hf(r, e, n) {
  const u = l([e, n]), t = l([r, n]), a = l([r, e]), s = ye(Zr(u, t), kr(Zr(u, t))), D = ye(Zr(n, a), kr(Zr(u, t))), c = ye(ge(s, D), kr(ge(s, D))), f = ye(ge(c, s), kr(ge(c, s))), o = [[s[0], f[0], c[0]], [s[1], f[1], c[1]], [s[2], f[2], c[2]]];
  return nu(De(6), o).toArray();
  function l(m) {
    const v = m.reduce((i, d) => [i[0] + d[0], i[1] + d[1], i[2] + d[2]], [0, 0, 0]), p = m.length;
    return [v[0] / p, v[1] / p, v[2] / p];
  }
}
function mf(r, e, n) {
  if (r.length === 2) return gf(r, e, n);
  if (r.length === 3) return Af(r, e, n);
}
function gf(r, e, n) {
  var _a2, _b, _c, _d, _e2, _f;
  const u = ((_a2 = e == null ? void 0 : e.momentsOfInertiaZ) == null ? void 0 : _a2.get(n)) ?? 0, t = ((_b = e == null ? void 0 : e.momentsOfInertiaY) == null ? void 0 : _b.get(n)) ?? 0, a = ((_c = e == null ? void 0 : e.elasticities) == null ? void 0 : _c.get(n)) ?? 0, s = ((_d = e == null ? void 0 : e.areas) == null ? void 0 : _d.get(n)) ?? 0, D = ((_e2 = e == null ? void 0 : e.shearModuli) == null ? void 0 : _e2.get(n)) ?? 0, c = ((_f = e == null ? void 0 : e.torsionalConstants) == null ? void 0 : _f.get(n)) ?? 0, f = kr(Zr(r[0], r[1])), o = a * s / f, l = a * u / f ** 3, m = a * t / f ** 3, v = D * c / f;
  return [[o, 0, 0, 0, 0, 0, -o, 0, 0, 0, 0, 0], [0, 12 * l, 0, 0, 0, 6 * f * l, 0, -12 * l, 0, 0, 0, 6 * f * l], [0, 0, 12 * m, 0, -6 * f * m, 0, 0, 0, -12 * m, 0, -6 * f * m, 0], [0, 0, 0, v, 0, 0, 0, 0, 0, -v, 0, 0], [0, 0, -6 * f * m, 0, 4 * m * f ** 2, 0, 0, 0, 6 * f * m, 0, 2 * m * f ** 2, 0], [0, 6 * f * l, 0, 0, 0, 4 * l * f ** 2, 0, -6 * f * l, 0, 0, 0, 2 * l * f ** 2], [-o, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0], [0, -12 * l, 0, 0, 0, -6 * l * f, 0, 12 * l, 0, 0, 0, -6 * l * f], [0, 0, -12 * m, 0, 6 * f * m, 0, 0, 0, 12 * m, 0, 6 * f * m, 0], [0, 0, 0, -v, 0, 0, 0, 0, 0, v, 0, 0], [0, 0, -6 * f * m, 0, 2 * m * f ** 2, 0, 0, 0, 6 * f * m, 0, 4 * m * f ** 2, 0], [0, 6 * f * l, 0, 0, 0, 2 * l * f ** 2, 0, -6 * f * l, 0, 0, 0, 4 * l * f ** 2]];
}
function yf(r, e, n, u, t) {
  const a = e * u / r, s = 1 - u * a, D = r / s, c = e / s, f = u * e / s;
  let l = sr([[D, f, 0], [f, c, 0], [0, 0, n]]);
  return Mr(t ** 3 / 12, l);
}
function Af(r, e, n) {
  var _a2, _b, _c, _d, _e2;
  const u = ((_a2 = e == null ? void 0 : e.elasticities) == null ? void 0 : _a2.get(n)) ?? 0, t = ((_b = e.elasticitiesOrthogonal) == null ? void 0 : _b.get(n)) ?? 0, a = ((_c = e == null ? void 0 : e.poissonsRatios) == null ? void 0 : _c.get(n)) ?? 0, s = ((_d = e.shearModuli) == null ? void 0 : _d.get(n)) ?? 0, D = ((_e2 = e == null ? void 0 : e.thicknesses) == null ? void 0 : _e2.get(n)) ?? 0;
  let c;
  t ? c = yf(u, t, s, a, D) : c = y(u, a, D);
  const [f, o] = [r[0][0], r[0][1]], [l, m] = [r[1][0], r[1][1]], [v, p] = [r[2][0], r[2][1]], i = f * (m - p) + l * (p - o) + v * (o - m), d = 0.5 * Math.abs(i), g = [[0.5, 0, 1 / 3], [0, 0.5, 1 / 3], [0.5, 0.5, 1 / 3]];
  let w = Ke(9, 9);
  for (const [h, b, M] of g) {
    const S = C(h, b, f, o, l, m, v, p), z = ru(S), N = 2 * d * M, I = Mr(z, c), T = Mr(I, S), O = Mr(N, T);
    w = Pe(w, O);
  }
  return x(w.toArray());
  function A(h, b, M, S, z, N) {
    const I = h - M, T = b - S, O = M - z, P = S - N, W = z - h, $ = N - b, q = I * I + T * T, V = O * O + P * P, Y = W * W + $ * $, Z = -6 * O / V, R = -6 * W / Y, J = -6 * I / q, L = 3 * O * P / V, U = 3 * W * $ / Y, K = 3 * I * T / q, Q = 3 * (P * P) / V, j = 3 * ($ * $) / Y, rr = 3 * (T * T) / q, tr = -6 * P / V, nr = -6 * $ / Y, ur = -6 * T / q;
    return { x12: I, y12: T, x23: O, y23: P, x31: W, y31: $, l12: q, l23: V, l31: Y, P4: Z, P5: R, P6: J, q4: L, q5: U, q6: K, r4: Q, r5: j, r6: rr, t4: tr, t5: nr, t6: ur };
  }
  function _(h, b, M) {
    const { P5: S, P6: z, q5: N, q6: I, r5: T, r6: O } = M;
    return [z * (1 - 2 * h) + (S - z) * b, I * (1 - 2 * h) - (N + I) * b, -4 + 6 * (h + b) + O * (1 - 2 * h) - b * (T + O), -z * (1 - 2 * h) + b * (M.P4 + z), I * (1 - 2 * h) - b * (I - M.q4), -2 + 6 * h + O * (1 - 2 * h) + b * (M.r4 - O), -b * (S + M.P4), b * (M.q4 - N), -b * (T - M.r4)];
  }
  function E(h, b, M) {
    const { t5: S, t6: z, r5: N, r6: I, q5: T, q6: O } = M;
    return [z * (1 - 2 * h) + b * (S - z), 1 + I * (1 - 2 * h) - b * (N + I), -O * (1 - 2 * h) + b * (T + O), -z * (1 - 2 * h) + b * (M.t4 + z), -1 + I * (1 - 2 * h) + b * (M.r4 - I), -O * (1 - 2 * h) - b * (M.q4 - O), -b * (M.t4 + S), b * (M.r4 - N), -b * (M.q4 - T)];
  }
  function F(h, b, M) {
    const { P4: S, P5: z, P6: N, q4: I, q5: T, q6: O, r4: P, r5: W, r6: $ } = M;
    return [-z * (1 - 2 * b) - h * (N - z), T * (1 - 2 * b) - h * (T + O), -4 + 6 * (h + b) + W * (1 - 2 * b) - h * (W + $), h * (S + N), h * (I - O), -h * ($ - P), z * (1 - 2 * b) - h * (S + z), T * (1 - 2 * b) + h * (I - T), -2 + 6 * b + W * (1 - 2 * b) + h * (P - W)];
  }
  function B(h, b, M) {
    const { t4: S, t5: z, t6: N, r4: I, r5: T, r6: O, q4: P, q5: W, q6: $ } = M;
    return [-z * (1 - 2 * b) - h * (N - z), 1 + T * (1 - 2 * b) - h * (T + O), -W * (1 - 2 * b) + h * (W + $), h * (S + N), h * (I - O), -h * (P - $), z * (1 - 2 * b) - h * (S + z), -1 + T * (1 - 2 * b) + h * (I - T), -W * (1 - 2 * b) - h * (P - W)];
  }
  function C(h, b, M, S, z, N, I, T) {
    const O = M * (N - T) + z * (T - S) + I * (S - N), P = A(M, S, z, N, I, T), W = _(h, b, P), $ = F(h, b, P), q = E(h, b, P), V = B(h, b, P), { x31: Y, y31: Z, x12: R, y12: J } = P;
    let L = Ke(3, 9);
    for (let U = 0; U < 9; U++) {
      const K = (Z * W[U] + J * $[U]) / O;
      L.set([0, U], K);
      const Q = (-Y * q[U] - R * V[U]) / O;
      L.set([1, U], Q);
      const j = (-Y * W[U] - R * $[U] + Z * q[U] + J * V[U]) / O;
      L.set([2, U], j);
    }
    return L;
  }
  function y(h, b, M) {
    const S = h * M ** 3 / (12 * (1 - b * b)), z = [[1, b, 0], [b, 1, 0], [0, 0, (1 - b) / 2]].map((N) => N.map((I) => I * S));
    return sr(z);
  }
  function x(h) {
    return [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, h[0][0], h[0][2], h[0][1], 0, 0, 0, h[0][3], h[0][5], h[0][4], 0, 0, 0, h[0][6], h[0][8], h[0][7], 0], [0, 0, h[2][0], h[2][2], h[2][1], 0, 0, 0, h[2][3], h[2][5], h[2][4], 0, 0, 0, h[2][6], h[2][8], h[2][7], 0], [0, 0, h[1][0], h[1][2], h[1][1], 0, 0, 0, h[1][3], h[1][5], h[1][4], 0, 0, 0, h[1][6], h[1][8], h[1][7], 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, h[3][0], h[3][2], h[3][1], 0, 0, 0, h[3][3], h[3][5], h[3][4], 0, 0, 0, h[3][6], h[3][8], h[3][7], 0], [0, 0, h[5][0], h[5][2], h[5][1], 0, 0, 0, h[5][3], h[5][5], h[5][4], 0, 0, 0, h[5][6], h[5][8], h[5][7], 0], [0, 0, h[4][0], h[4][2], h[4][1], 0, 0, 0, h[4][3], h[4][5], h[4][4], 0, 0, 0, h[4][6], h[4][8], h[4][7], 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, h[6][0], h[6][2], h[6][1], 0, 0, 0, h[6][3], h[6][5], h[6][4], 0, 0, 0, h[6][6], h[6][8], h[6][7], 0], [0, 0, h[8][0], h[8][2], h[8][1], 0, 0, 0, h[8][3], h[8][5], h[8][4], 0, 0, 0, h[8][6], h[8][8], h[8][7], 0], [0, 0, h[7][0], h[7][2], h[7][1], 0, 0, 0, h[7][3], h[7][5], h[7][4], 0, 0, 0, h[7][6], h[7][8], h[7][7], 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  }
}
function Ef(r, e, n, u) {
  const t = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map() };
  return e.forEach((a, s) => {
    const D = r[a[0]], c = r[a[1]], f = [...u.deformations.get(a[0]), ...u.deformations.get(a[1])], o = pf([D, c]), l = Mr(o, f), m = mf([D, c], n, s);
    let v = Mr(m, l);
    t.normals.set(s, [v[0], v[6]]), t.shearsY.set(s, [v[1], v[7]]), t.shearsZ.set(s, [v[2], v[8]]), t.torsions.set(s, [v[3], v[9]]), t.bendingsY.set(s, [v[4], v[10]]), t.bendingsZ.set(s, [v[5], v[11]]);
  }), t;
}
export {
  Ef as a
};
