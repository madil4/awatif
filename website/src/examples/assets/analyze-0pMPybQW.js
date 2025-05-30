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
function X(r, e, n, u) {
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
var Xu = Math.sign || function(r) {
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
      return Gu(r, u);
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
  var l = a.slice(o).join(""), d = vr(e) && l.length || l.match(/[1-9]/) ? "." + l : "", v = a.slice(0, o).join("") + d + "e" + (t >= 0 ? "+" : "") + s.toString();
  return u.sign + v;
}
function Gu(r, e) {
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
}, ju = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], ku = X("typed", ju, function(e) {
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
    if (["wrongType", "mismatch"].includes(o.data.category) && c.length === 1 && Ee(c[0]) && f.some((d) => !d.params.includes(","))) {
      var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw l.data = o.data, l;
    }
    throw o;
  }, s.onMismatch = (D, c, f) => {
    var o = s.createError(D, c, f);
    if (["wrongType", "mismatch"].includes(o.data.category) && c.length === 1 && Ee(c[0]) && f.some((d) => !d.params.includes(","))) {
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
var ea = "BigNumber", ta = ["?on", "config"], na = X(ea, ta, (r) => {
  var { on: e, config: n } = r, u = ht.clone({ precision: n.precision, modulo: ht.EUCLID });
  return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, u.fromJSON = function(t) {
    return new u(t.value);
  }, e && e("config", function(t, a) {
    t.precision !== a.precision && u.config({ precision: t.precision });
  }), u;
}, { isClass: true }), ua = "Complex", aa = [], ia = X(ua, aa, () => (Object.defineProperty(wr, "name", { value: "Complex" }), wr.prototype.constructor = wr, wr.prototype.type = "Complex", wr.prototype.isComplex = true, wr.prototype.toJSON = function() {
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
const k = BigInt(0), er = BigInt(1), oe = BigInt(2), Qe = BigInt(5), _r = BigInt(10), oa = 2e3, G = { s: er, n: k, d: er };
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
  G.s = t < k ? -er : er, G.n = n < k ? -n : n, G.d = u < k ? -u : u;
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
  if (Er(r, e), this instanceof zr) r = Wr(G.d, G.n), this.s = G.s, this.n = G.n / r, this.d = G.d / r;
  else return hr(G.s * G.n, G.d);
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
  return Er(r, e), hr(this.s * this.n * G.d + G.s * this.d * G.n, this.d * G.d);
}, sub: function(r, e) {
  return Er(r, e), hr(this.s * this.n * G.d - G.s * this.d * G.n, this.d * G.d);
}, mul: function(r, e) {
  return Er(r, e), hr(this.s * G.s * this.n * G.n, this.d * G.d);
}, div: function(r, e) {
  return Er(r, e), hr(this.s * G.s * this.n * G.d, this.d * G.n);
}, clone: function() {
  return hr(this.s * this.n, this.d);
}, mod: function(r, e) {
  if (r === void 0) return hr(this.s * this.n % this.d, er);
  if (Er(r, e), k === G.n * this.d) throw et();
  return hr(this.s * (G.d * this.n) % (G.n * this.d), G.d * this.d);
}, gcd: function(r, e) {
  return Er(r, e), hr(Wr(G.n, this.n) * Wr(G.d, this.d), G.d * this.d);
}, lcm: function(r, e) {
  return Er(r, e), G.n === k && this.n === k ? hr(k, er) : hr(G.n * this.n, Wr(G.n, this.n) * Wr(G.d, this.d));
}, inverse: function() {
  return hr(this.s * this.d, this.n);
}, pow: function(r, e) {
  if (Er(r, e), G.d === er) return G.s < k ? hr((this.s * this.d) ** G.n, this.n ** G.n) : hr((this.s * this.n) ** G.n, this.d ** G.n);
  if (this.s < k) return null;
  let n = jr(this.n), u = jr(this.d), t = er, a = er;
  for (let s in n) if (s !== "1") {
    if (s === "0") {
      t = k;
      break;
    }
    if (n[s] *= G.n, n[s] % G.d === k) n[s] /= G.d;
    else return null;
    t *= BigInt(s) ** n[s];
  }
  for (let s in u) if (s !== "1") {
    if (u[s] *= G.n, u[s] % G.d === k) u[s] /= G.d;
    else return null;
    a *= BigInt(s) ** u[s];
  }
  return G.s < k ? hr(a, t) : hr(t, a);
}, log: function(r, e) {
  if (Er(r, e), this.s <= k || G.s <= k) return null;
  const n = {}, u = jr(G.n), t = jr(G.d), a = jr(this.n), s = jr(this.d);
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
    let d = l, v = o;
    const p = Wr(d, v);
    if (d /= p, v /= p, D === null && c === null) D = d, c = v;
    else if (d * c !== D * v) return null;
  }
  return D !== null && c !== null ? hr(D, c) : null;
}, equals: function(r, e) {
  return Er(r, e), this.s * this.n * G.d === G.s * G.n * this.d;
}, lt: function(r, e) {
  return Er(r, e), this.s * this.n * G.d < G.s * G.n * this.d;
}, lte: function(r, e) {
  return Er(r, e), this.s * this.n * G.d <= G.s * G.n * this.d;
}, gt: function(r, e) {
  return Er(r, e), this.s * this.n * G.d > G.s * G.n * this.d;
}, gte: function(r, e) {
  return Er(r, e), this.s * this.n * G.d >= G.s * G.n * this.d;
}, compare: function(r, e) {
  Er(r, e);
  let n = this.s * this.n * G.d - G.s * G.n * this.d;
  return (k < n) - (n < k);
}, ceil: function(r) {
  return r = _r ** BigInt(r || 0), hr(Or(this.s * r * this.n / this.d) + (r * this.n % this.d > k && this.s >= k ? er : k), r);
}, floor: function(r) {
  return r = _r ** BigInt(r || 0), hr(Or(this.s * r * this.n / this.d) - (r * this.n % this.d > k && this.s < k ? er : k), r);
}, round: function(r) {
  return r = _r ** BigInt(r || 0), hr(Or(this.s * r * this.n / this.d) + this.s * ((this.s >= k ? er : k) + oe * (r * this.n % this.d) > this.d ? er : k), r);
}, roundTo: function(r, e) {
  Er(r, e);
  const n = this.n * G.d, u = this.d * G.n, t = n % u;
  let a = Or(n / u);
  return t + t >= u && a++, hr(this.s * a * G.n, G.d);
}, divisible: function(r, e) {
  return Er(r, e), !(!(G.n * this.d) || this.n * G.d % (G.n * this.d));
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
var ca = "Fraction", va = [], Da = X(ca, va, () => (Object.defineProperty(zr, "name", { value: "Fraction" }), zr.prototype.constructor = zr, zr.prototype.type = "Fraction", zr.prototype.isFraction = true, zr.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: String(this.s * this.n), d: String(this.d) };
}, zr.fromJSON = function(r) {
  return new zr(r);
}, zr), { isClass: true }), pa = "Matrix", da = [], ha = X(pa, da, () => {
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
function Xr(r, e, n) {
  if (!(this instanceof Xr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Xr.prototype = new RangeError();
Xr.prototype.constructor = RangeError;
Xr.prototype.name = "IndexError";
Xr.prototype.isIndexError = true;
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
    if (r < 0 || typeof e == "number" && r >= e) throw new Xr(r, e);
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
  var n = Xe(r, true), u = n.length;
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
function Xe(r) {
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
  for (var u = e.map((d) => d.length), t = Math.max(...u), a = new Array(t).fill(null), s = 0; s < e.length; s++) for (var D = e[s], c = u[s], f = 0; f < c; f++) {
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
      for (var o = arguments.length, l = new Array(o), d = 0; d < o; d++) l[d] = arguments[d];
      return Bt(D, l.slice(0, t), n, r.name);
    } } : { isUnary: false, fn: function() {
      for (var o = arguments.length, l = new Array(o), d = 0; d < o; d++) l[d] = arguments[d];
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
var Sa = "DenseMatrix", Ma = ["Matrix"], Na = X(Sa, Ma, (r) => {
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
  }, n.prototype.subset = function(o, l, d) {
    switch (arguments.length) {
      case 1:
        return u(this, o);
      case 2:
      case 3:
        return a(this, o, l, d);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.get = function(o) {
    return In(this._data, o);
  }, n.prototype.set = function(o, l, d) {
    if (!mr(o)) throw new TypeError("Array expected");
    if (o.length < this._size.length) throw new or(o.length, this._size.length, "<");
    var v, p, i, h = o.map(function(b) {
      return b + 1;
    });
    c(this, h, d);
    var m = this._data;
    for (v = 0, p = o.length - 1; v < p; v++) i = o[v], yr(i, m.length), m = m[i];
    return i = o[o.length - 1], yr(i, m.length), m[i] = l, this;
  };
  function u(o, l) {
    if (!ke(l)) throw new TypeError("Invalid index");
    var d = l.isScalar();
    if (d) return o.get(l.min());
    var v = l.size();
    if (v.length !== o._size.length) throw new or(v.length, o._size.length);
    for (var p = l.min(), i = l.max(), h = 0, m = o._size.length; h < m; h++) yr(p[h], o._size[h]), yr(i[h], o._size[h]);
    return new n(t(o._data, l, v.length, 0), o._datatype);
  }
  function t(o, l, d, v) {
    var p = v === d - 1, i = l.dimension(v);
    return p ? i.map(function(h) {
      return yr(h, o.length), o[h];
    }).valueOf() : i.map(function(h) {
      yr(h, o.length);
      var m = o[h];
      return t(m, l, d, v + 1);
    }).valueOf();
  }
  function a(o, l, d, v) {
    if (!l || l.isIndex !== true) throw new TypeError("Invalid index");
    var p = l.size(), i = l.isScalar(), h;
    if (lr(d) ? (h = d.size(), d = d.valueOf()) : h = ir(d), i) {
      if (h.length !== 0) throw new TypeError("Scalar expected");
      o.set(l.min(), d, v);
    } else {
      if (!Jr(h, p)) try {
        h.length === 0 ? d = Ye([d], p) : d = Ye(d, p), h = ir(d);
      } catch {
      }
      if (p.length < o._size.length) throw new or(p.length, o._size.length, "<");
      if (h.length < p.length) {
        for (var m = 0, b = 0; p[m] === 1 && h[m] === 1; ) m++;
        for (; p[m] === 1; ) b++, m++;
        d = Mn(d, p.length, b, h);
      }
      if (!Jr(p, h)) throw new or(p, h, ">");
      var y = l.max().map(function(A) {
        return A + 1;
      });
      c(o, y, v);
      var _ = p.length, F = 0;
      s(o._data, l, d, _, F);
    }
    return o;
  }
  function s(o, l, d, v, p) {
    var i = p === v - 1, h = l.dimension(p);
    i ? h.forEach(function(m, b) {
      yr(m), o[m] = d[b[0]];
    }) : h.forEach(function(m, b) {
      yr(m), s(o[m], l, d[b[0]], v, p + 1);
    });
  }
  n.prototype.resize = function(o, l, d) {
    if (!Ee(o)) throw new TypeError("Array or Matrix expected");
    var v = o.valueOf().map((i) => Array.isArray(i) && i.length === 1 ? i[0] : i), p = d ? this.clone() : this;
    return D(p, v, l);
  };
  function D(o, l, d) {
    if (l.length === 0) {
      for (var v = o._data; mr(v); ) v = v[0];
      return v;
    }
    return o._size = l.slice(0), o._data = Ce(o._data, o._size, d), o;
  }
  n.prototype.reshape = function(o, l) {
    var d = l ? this.clone() : this;
    d._data = tt(d._data, o);
    var v = d._size.reduce((p, i) => p * i);
    return d._size = nt(o, v), d;
  };
  function c(o, l, d) {
    for (var v = o._size.slice(0), p = false; v.length < l.length; ) v.push(0), p = true;
    for (var i = 0, h = l.length; i < h; i++) l[i] > v[i] && (v[i] = l[i], p = true);
    p && D(o, v, d);
  }
  n.prototype.clone = function() {
    var o = new n({ data: ar(this._data), size: ar(this._size), datatype: this._datatype });
    return o;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype._forEach = function(o) {
    var l = o.length === 2, d = this._size.length - 1;
    if (d < 0) return;
    if (l) {
      h(this._data);
      return;
    }
    if (d === 0) {
      for (var v = 0; v < this._data.length; v++) o(this._data, v, [v]);
      return;
    }
    var p = new Array(d + 1);
    i(this._data);
    function i(m) {
      var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (b < d) for (var y = 0; y < m.length; y++) p[b] = y, i(m[y], b + 1);
      else for (var _ = 0; _ < m.length; _++) p[b] = _, o(m, _, p.slice());
    }
    function h(m) {
      var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (b < d) for (var y = 0; y < m.length; y++) h(m[y], b + 1);
      else for (var _ = 0; _ < m.length; _++) o(m, _);
    }
  }, n.prototype.map = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, d = this, v = new n(d), p = we(o, d._data, "map", l), i = l || p.isUnary ? (h, m) => {
      h[m] = p.fn(h[m]);
    } : (h, m, b) => {
      h[m] = p.fn(h[m], b, d);
    };
    return v._forEach(i), v;
  }, n.prototype.forEach = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, d = this, v = we(o, d._data, "map", l), p = l || v.isUnary ? (i, h) => {
      v.fn(i[h]);
    } : (i, h, m) => {
      v.fn(i[h], m, d);
    };
    d._forEach(p);
  }, n.prototype[Symbol.iterator] = function* () {
    var o = this._size.length - 1;
    if (!(o < 0)) {
      if (o === 0) {
        for (var l = 0; l < this._data.length; l++) yield { value: this._data[l], index: [l] };
        return;
      }
      var d = [], v = function* (i, h) {
        if (h < o) for (var m = 0; m < i.length; m++) d[h] = m, yield* v(i[m], h + 1);
        else for (var b = 0; b < i.length; b++) d[h] = b, yield { value: i[b], index: d.slice() };
      };
      yield* v(this._data, 0);
    }
  }, n.prototype.rows = function() {
    var o = [], l = this.size();
    if (l.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    var d = this._data;
    for (var v of d) o.push(new n([v], this._datatype));
    return o;
  }, n.prototype.columns = function() {
    var o = this, l = [], d = this.size();
    if (d.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var v = this._data, p = function(m) {
      var b = v.map((y) => [y[m]]);
      l.push(new n(b, o._datatype));
    }, i = 0; i < d[1]; i++) p(i);
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
    for (var l = o > 0 ? o : 0, d = o < 0 ? -o : 0, v = this._size[0], p = this._size[1], i = Math.min(v - d, p - l), h = [], m = 0; m < i; m++) h[m] = this._data[m + d][m + l];
    return new n({ data: h, size: [i], datatype: this._datatype });
  }, n.diagonal = function(o, l, d, v) {
    if (!mr(o)) throw new TypeError("Array expected, size parameter");
    if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(B) {
      if (Ar(B) && (B = B.toNumber()), !vr(B) || !pr(B) || B < 1) throw new Error("Size values must be positive integers");
      return B;
    }), d) {
      if (Ar(d) && (d = d.toNumber()), !vr(d) || !pr(d)) throw new TypeError("The parameter k must be an integer number");
    } else d = 0;
    var p = d > 0 ? d : 0, i = d < 0 ? -d : 0, h = o[0], m = o[1], b = Math.min(h - i, m - p), y;
    if (mr(l)) {
      if (l.length !== b) throw new Error("Invalid value array length");
      y = function(E) {
        return l[E];
      };
    } else if (lr(l)) {
      var _ = l.size();
      if (_.length !== 1 || _[0] !== b) throw new Error("Invalid matrix length");
      y = function(E) {
        return l.get([E]);
      };
    } else y = function() {
      return l;
    };
    v || (v = Ar(y(0)) ? y(0).mul(0) : 0);
    var F = [];
    if (o.length > 0) {
      F = Ce(F, o, v);
      for (var A = 0; A < b; A++) F[A + i][A + p] = y(A);
    }
    return new n({ data: F, size: [h, m] });
  }, n.fromJSON = function(o) {
    return new n(o);
  }, n.prototype.swapRows = function(o, l) {
    if (!vr(o) || !pr(o) || !vr(l) || !pr(l)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return yr(o, this._size[0]), yr(l, this._size[0]), n._swapRows(o, l, this._data), this;
  }, n._swapRows = function(o, l, d) {
    var v = d[o];
    d[o] = d[l], d[l] = v;
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
var xt = "isInteger", Ta = ["typed"], za = X(xt, Ta, (r) => {
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
function Ge(r) {
  return Xu(r);
}
Ge.signature = ut;
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
var St = "isPositive", $a = ["typed", "config"], Ia = X(St, $a, (r) => {
  var { typed: e, config: n } = r;
  return e(St, { number: (u) => Pr(u, 0, n.relTol, n.absTol) ? false : Zn(u), BigNumber: (u) => ee(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(), bigint: (u) => u > 0n, Fraction: (u) => u.s > 0n && u.n > 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
}), Mt = "isZero", qa = ["typed", "equalScalar"], Ra = X(Mt, qa, (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(Mt, { "number | BigNumber | Complex | Fraction": (u) => n(u, 0), bigint: (u) => u === 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Nr(t, u)) });
});
function Ua(r, e, n, u) {
  return Pr(r.re, e.re, n, u) && Pr(r.im, e.im, n, u);
}
var se = X("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
    return e.find(n, [u.valueType(), t.valueType()])(u.value, t.value);
  }) };
}), be = "equalScalar", Pa = ["typed", "config"], La = X(be, Pa, (r) => {
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
X(be, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(be, { "number, number": function(t, a) {
    return Pr(t, a, n.relTol, n.absTol);
  } });
});
var Va = "SparseMatrix", Za = ["typed", "equalScalar", "Matrix"], Ja = X(Va, Za, (r) => {
  var { typed: e, equalScalar: n, Matrix: u } = r;
  function t(i, h) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (h && !$r(h)) throw new Error("Invalid datatype: " + h);
    if (lr(i)) a(this, i, h);
    else if (i && mr(i.index) && mr(i.ptr) && mr(i.size)) this._values = i.values, this._index = i.index, this._ptr = i.ptr, this._size = i.size, this._datatype = h || i.datatype;
    else if (mr(i)) s(this, i, h);
    else {
      if (i) throw new TypeError("Unsupported type of data (" + Ir(i) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = h;
    }
  }
  function a(i, h, m) {
    h.type === "SparseMatrix" ? (i._values = h._values ? ar(h._values) : void 0, i._index = ar(h._index), i._ptr = ar(h._ptr), i._size = ar(h._size), i._datatype = m || h._datatype) : s(i, h.valueOf(), m || h._datatype);
  }
  function s(i, h, m) {
    i._values = [], i._index = [], i._ptr = [], i._datatype = m;
    var b = h.length, y = 0, _ = n, F = 0;
    if ($r(m) && (_ = e.find(n, [m, m]) || n, F = e.convert(0, m)), b > 0) {
      var A = 0;
      do {
        i._ptr.push(i._index.length);
        for (var B = 0; B < b; B++) {
          var E = h[B];
          if (mr(E)) {
            if (A === 0 && y < E.length && (y = E.length), A < E.length) {
              var g = E[A];
              _(g, F) || (i._values.push(g), i._index.push(B));
            }
          } else A === 0 && y < 1 && (y = 1), _(E, F) || (i._values.push(E), i._index.push(B));
        }
        A++;
      } while (A < y);
    }
    i._ptr.push(i._index.length), i._size = [b, y];
  }
  t.prototype = new u(), t.prototype.createSparseMatrix = function(i, h) {
    return new t(i, h);
  }, Object.defineProperty(t, "name", { value: "SparseMatrix" }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
    return Oe(this._values, Ir);
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
        return c(this, i, h, m);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function D(i, h) {
    if (!ke(h)) throw new TypeError("Invalid index");
    var m = h.isScalar();
    if (m) return i.get(h.min());
    var b = h.size();
    if (b.length !== i._size.length) throw new or(b.length, i._size.length);
    var y, _, F, A, B = h.min(), E = h.max();
    for (y = 0, _ = i._size.length; y < _; y++) yr(B[y], i._size[y]), yr(E[y], i._size[y]);
    var g = i._values, x = i._index, C = i._ptr, w = h.dimension(0), M = h.dimension(1), S = [], T = [];
    w.forEach(function(O, P) {
      T[O] = P[0], S[O] = true;
    });
    var N = g ? [] : void 0, I = [], z = [];
    return M.forEach(function(O) {
      for (z.push(I.length), F = C[O], A = C[O + 1]; F < A; F++) y = x[F], S[y] === true && (I.push(T[y]), N && N.push(g[F]));
    }), z.push(I.length), new t({ values: N, index: I, ptr: z, size: b, datatype: i._datatype });
  }
  function c(i, h, m, b) {
    if (!h || h.isIndex !== true) throw new TypeError("Invalid index");
    var y = h.size(), _ = h.isScalar(), F;
    if (lr(m) ? (F = m.size(), m = m.toArray()) : F = ir(m), _) {
      if (F.length !== 0) throw new TypeError("Scalar expected");
      i.set(h.min(), m, b);
    } else {
      if (y.length !== 1 && y.length !== 2) throw new or(y.length, i._size.length, "<");
      if (F.length < y.length) {
        for (var A = 0, B = 0; y[A] === 1 && F[A] === 1; ) A++;
        for (; y[A] === 1; ) B++, A++;
        m = Mn(m, y.length, B, F);
      }
      if (!Jr(y, F)) throw new or(y, F, ">");
      if (y.length === 1) {
        var E = h.dimension(0);
        E.forEach(function(C, w) {
          yr(C), i.set([C, 0], m[w[0]], b);
        });
      } else {
        var g = h.dimension(0), x = h.dimension(1);
        g.forEach(function(C, w) {
          yr(C), x.forEach(function(M, S) {
            yr(M), i.set([C, M], m[w[0]][S[0]], b);
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
    var h = i[0], m = i[1];
    yr(h, this._size[0]), yr(m, this._size[1]);
    var b = f(h, this._ptr[m], this._ptr[m + 1], this._index);
    return b < this._ptr[m + 1] && this._index[b] === h ? this._values[b] : 0;
  }, t.prototype.set = function(i, h, m) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new or(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var b = i[0], y = i[1], _ = this._size[0], F = this._size[1], A = n, B = 0;
    $r(this._datatype) && (A = e.find(n, [this._datatype, this._datatype]) || n, B = e.convert(0, this._datatype)), (b > _ - 1 || y > F - 1) && (d(this, Math.max(b + 1, _), Math.max(y + 1, F), m), _ = this._size[0], F = this._size[1]), yr(b, _), yr(y, F);
    var E = f(b, this._ptr[y], this._ptr[y + 1], this._index);
    return E < this._ptr[y + 1] && this._index[E] === b ? A(h, B) ? o(E, y, this._values, this._index, this._ptr) : this._values[E] = h : A(h, B) || l(E, b, y, h, this._values, this._index, this._ptr), this;
  };
  function f(i, h, m, b) {
    if (m - h === 0) return m;
    for (var y = h; y < m; y++) if (b[y] === i) return y;
    return h;
  }
  function o(i, h, m, b, y) {
    m.splice(i, 1), b.splice(i, 1);
    for (var _ = h + 1; _ < y.length; _++) y[_]--;
  }
  function l(i, h, m, b, y, _, F) {
    y.splice(i, 0, b), _.splice(i, 0, h);
    for (var A = m + 1; A < F.length; A++) F[A]++;
  }
  t.prototype.resize = function(i, h, m) {
    if (!Ee(i)) throw new TypeError("Array or Matrix expected");
    var b = i.valueOf().map((_) => Array.isArray(_) && _.length === 1 ? _[0] : _);
    if (b.length !== 2) throw new Error("Only two dimensions matrix are supported");
    b.forEach(function(_) {
      if (!vr(_) || !pr(_) || _ < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + dr(b) + ")");
    });
    var y = m ? this.clone() : this;
    return d(y, b[0], b[1], h);
  };
  function d(i, h, m, b) {
    var y = b || 0, _ = n, F = 0;
    $r(i._datatype) && (_ = e.find(n, [i._datatype, i._datatype]) || n, F = e.convert(0, i._datatype), y = e.convert(y, i._datatype));
    var A = !_(y, F), B = i._size[0], E = i._size[1], g, x, C;
    if (m > E) {
      for (x = E; x < m; x++) if (i._ptr[x] = i._values.length, A) for (g = 0; g < B; g++) i._values.push(y), i._index.push(g);
      i._ptr[m] = i._values.length;
    } else m < E && (i._ptr.splice(m + 1, E - m), i._values.splice(i._ptr[m], i._values.length), i._index.splice(i._ptr[m], i._index.length));
    if (E = m, h > B) {
      if (A) {
        var w = 0;
        for (x = 0; x < E; x++) {
          i._ptr[x] = i._ptr[x] + w, C = i._ptr[x + 1] + w;
          var M = 0;
          for (g = B; g < h; g++, M++) i._values.splice(C + M, 0, y), i._index.splice(C + M, 0, g), w++;
        }
        i._ptr[E] = i._values.length;
      }
    } else if (h < B) {
      var S = 0;
      for (x = 0; x < E; x++) {
        i._ptr[x] = i._ptr[x] - S;
        var T = i._ptr[x], N = i._ptr[x + 1] - S;
        for (C = T; C < N; C++) g = i._index[C], g > h - 1 && (i._values.splice(C, 1), i._index.splice(C, 1), S++);
      }
      i._ptr[x] = i._values.length;
    }
    return i._size[0] = h, i._size[1] = m, i;
  }
  t.prototype.reshape = function(i, h) {
    if (!mr(i)) throw new TypeError("Array expected");
    if (i.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    i.forEach(function(O) {
      if (!vr(O) || !pr(O) || O <= -2 || O === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + dr(i) + ")");
    });
    var m = this._size[0] * this._size[1];
    i = nt(i, m);
    var b = i[0] * i[1];
    if (m !== b) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var y = h ? this.clone() : this;
    if (this._size[0] === i[0] && this._size[1] === i[1]) return y;
    for (var _ = [], F = 0; F < y._ptr.length; F++) for (var A = 0; A < y._ptr[F + 1] - y._ptr[F]; A++) _.push(F);
    for (var B = y._values.slice(), E = y._index.slice(), g = 0; g < y._index.length; g++) {
      var x = E[g], C = _[g], w = x * y._size[1] + C;
      _[g] = w % i[1], E[g] = Math.floor(w / i[1]);
    }
    y._values.length = 0, y._index.length = 0, y._ptr.length = i[1] + 1, y._size = i.slice();
    for (var M = 0; M < y._ptr.length; M++) y._ptr[M] = 0;
    for (var S = 0; S < B.length; S++) {
      var T = E[S], N = _[S], I = B[S], z = f(T, y._ptr[N], y._ptr[N + 1], y._index);
      l(z, T, N, I, y._values, y._index, y._ptr);
    }
    return y;
  }, t.prototype.clone = function() {
    var i = new t({ values: this._values ? ar(this._values) : void 0, index: ar(this._index), ptr: ar(this._ptr), size: ar(this._size), datatype: this._datatype });
    return i;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(i, h) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var m = this, b = this._size[0], y = this._size[1], _ = we(i, m, "map"), F = function(B, E, g) {
      return _.fn(B, [E, g], m);
    };
    return v(this, 0, b - 1, 0, y - 1, F, h);
  };
  function v(i, h, m, b, y, _, F) {
    var A = [], B = [], E = [], g = n, x = 0;
    $r(i._datatype) && (g = e.find(n, [i._datatype, i._datatype]) || n, x = e.convert(0, i._datatype));
    for (var C = function(q, V, Y) {
      var Z = _(q, V, Y);
      g(Z, x) || (A.push(Z), B.push(V));
    }, w = b; w <= y; w++) {
      E.push(A.length);
      var M = i._ptr[w], S = i._ptr[w + 1];
      if (F) for (var T = M; T < S; T++) {
        var N = i._index[T];
        N >= h && N <= m && C(i._values[T], N - h, w - b);
      }
      else {
        for (var I = {}, z = M; z < S; z++) {
          var O = i._index[z];
          I[O] = i._values[z];
        }
        for (var P = h; P <= m; P++) {
          var W = P in I ? I[P] : 0;
          C(W, P - h, w - b);
        }
      }
    }
    return E.push(A.length), new t({ values: A, index: B, ptr: E, size: [m - h + 1, y - b + 1] });
  }
  t.prototype.forEach = function(i, h) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var m = this, b = this._size[0], y = this._size[1], _ = we(i, m, "forEach"), F = 0; F < y; F++) {
      var A = this._ptr[F], B = this._ptr[F + 1];
      if (h) for (var E = A; E < B; E++) {
        var g = this._index[E];
        _.fn(this._values[E], [g, F], m);
      }
      else {
        for (var x = {}, C = A; C < B; C++) {
          var w = this._index[C];
          x[w] = this._values[C];
        }
        for (var M = 0; M < b; M++) {
          var S = M in x ? x[M] : 0;
          _.fn(S, [M, F], m);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var i = this._size[1], h = 0; h < i; h++) for (var m = this._ptr[h], b = this._ptr[h + 1], y = m; y < b; y++) {
      var _ = this._index[y];
      yield { value: this._values[y], index: [_, h] };
    }
  }, t.prototype.toArray = function() {
    return p(this._values, this._index, this._ptr, this._size, true);
  }, t.prototype.valueOf = function() {
    return p(this._values, this._index, this._ptr, this._size, false);
  };
  function p(i, h, m, b, y) {
    var _ = b[0], F = b[1], A = [], B, E;
    for (B = 0; B < _; B++) for (A[B] = [], E = 0; E < F; E++) A[B][E] = 0;
    for (E = 0; E < F; E++) for (var g = m[E], x = m[E + 1], C = g; C < x; C++) B = h[C], A[B][E] = i ? y ? ar(i[C]) : i[C] : 1;
    return A;
  }
  return t.prototype.format = function(i) {
    for (var h = this._size[0], m = this._size[1], b = this.density(), y = "Sparse Matrix [" + dr(h, i) + " x " + dr(m, i) + "] density: " + dr(b, i) + `
`, _ = 0; _ < m; _++) for (var F = this._ptr[_], A = this._ptr[_ + 1], B = F; B < A; B++) {
      var E = this._index[B];
      y += `
    (` + dr(E, i) + ", " + dr(_, i) + ") ==> " + (this._values ? dr(this._values[B], i) : "X");
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
    var h = i > 0 ? i : 0, m = i < 0 ? -i : 0, b = this._size[0], y = this._size[1], _ = Math.min(b - m, y - h), F = [], A = [], B = [];
    B[0] = 0;
    for (var E = h; E < y && F.length < _; E++) for (var g = this._ptr[E], x = this._ptr[E + 1], C = g; C < x; C++) {
      var w = this._index[C];
      if (w === E - h + m) {
        F.push(this._values[C]), A[F.length - 1] = w - m;
        break;
      }
    }
    return B.push(F.length), new t({ values: F, index: A, ptr: B, size: [_, 1] });
  }, t.fromJSON = function(i) {
    return new t(i);
  }, t.diagonal = function(i, h, m, b, y) {
    if (!mr(i)) throw new TypeError("Array expected, size parameter");
    if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (i = i.map(function(O) {
      if (Ar(O) && (O = O.toNumber()), !vr(O) || !pr(O) || O < 1) throw new Error("Size values must be positive integers");
      return O;
    }), m) {
      if (Ar(m) && (m = m.toNumber()), !vr(m) || !pr(m)) throw new TypeError("The parameter k must be an integer number");
    } else m = 0;
    var _ = n, F = 0;
    $r(y) && (_ = e.find(n, [y, y]) || n, F = e.convert(0, y));
    var A = m > 0 ? m : 0, B = m < 0 ? -m : 0, E = i[0], g = i[1], x = Math.min(E - B, g - A), C;
    if (mr(h)) {
      if (h.length !== x) throw new Error("Invalid value array length");
      C = function(P) {
        return h[P];
      };
    } else if (lr(h)) {
      var w = h.size();
      if (w.length !== 1 || w[0] !== x) throw new Error("Invalid matrix length");
      C = function(P) {
        return h.get([P]);
      };
    } else C = function() {
      return h;
    };
    for (var M = [], S = [], T = [], N = 0; N < g; N++) {
      T.push(M.length);
      var I = N - A;
      if (I >= 0 && I < x) {
        var z = C(I);
        _(z, F) || (S.push(I + B), M.push(z));
      }
    }
    return T.push(M.length), new t({ values: M, index: S, ptr: T, size: [E, g] });
  }, t.prototype.swapRows = function(i, h) {
    if (!vr(i) || !pr(i) || !vr(h) || !pr(h)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return yr(i, this._size[0]), yr(h, this._size[0]), t._swapRows(i, h, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(i, h, m, b, y) {
    for (var _ = b[i], F = b[i + 1], A = _; A < F; A++) y(m[A], h[A]);
  }, t._swapRows = function(i, h, m, b, y, _) {
    for (var F = 0; F < m; F++) {
      var A = _[F], B = _[F + 1], E = f(i, A, B, y), g = f(h, A, B, y);
      if (E < B && g < B && y[E] === i && y[g] === h) {
        if (b) {
          var x = b[E];
          b[E] = b[g], b[g] = x;
        }
        continue;
      }
      if (E < B && y[E] === i && (g >= B || y[g] !== h)) {
        var C = b ? b[E] : void 0;
        y.splice(g, 0, h), b && b.splice(g, 0, C), y.splice(g <= E ? E + 1 : E, 1), b && b.splice(g <= E ? E + 1 : E, 1);
        continue;
      }
      if (g < B && y[g] === h && (E >= B || y[E] !== i)) {
        var w = b ? b[g] : void 0;
        y.splice(E, 0, i), b && b.splice(E, 0, w), y.splice(E <= g ? g + 1 : g, 1), b && b.splice(E <= g ? g + 1 : g, 1);
      }
    }
  }, t;
}, { isClass: true }), Qa = "number", Wa = ["typed"];
function Xa(r) {
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
var Ga = X(Qa, Wa, (r) => {
  var { typed: e } = r, n = e("number", { "": function() {
    return 0;
  }, number: function(t) {
    return t;
  }, string: function(t) {
    if (t === "NaN") return NaN;
    var a = Xa(t);
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
}), Ka = "bignumber", Ha = ["typed", "BigNumber"], ja = X(Ka, Ha, (r) => {
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
}), ka = "complex", ri = ["typed", "Complex"], ei = X(ka, ri, (r) => {
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
}), ti = "fraction", ni = ["typed", "Fraction"], ui = X(ti, ni, (r) => {
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
}), Nt = "matrix", ai = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], ii = X(Nt, ai, (r) => {
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
}), Tt = "matrixFromColumns", oi = ["typed", "matrix", "flatten", "size"], si = X(Tt, oi, (r) => {
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
      var d = s(l);
      if (d !== c) throw new TypeError("The vectors had different length: " + (c | 0) + " \u2260 " + (d | 0));
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
}), zt = "unaryMinus", fi = ["typed"], li = X(zt, fi, (r) => {
  var { typed: e } = r;
  return e(zt, { number: Ln, "Complex | BigNumber | Fraction": (n) => n.neg(), bigint: (n) => -n, Unit: e.referToSelf((n) => (u) => {
    var t = u.clone();
    return t.value = e.find(n, t.valueType())(u.value), t;
  }), "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n, true)) });
}), Ot = "abs", ci = ["typed"], vi = X(Ot, ci, (r) => {
  var { typed: e } = r;
  return e(Ot, { number: qn, "Complex | BigNumber | Fraction | Unit": (n) => n.abs(), bigint: (n) => n < 0n ? -n : n, "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n, true)) });
}), $t = "addScalar", Di = ["typed"], pi = X($t, Di, (r) => {
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
}), It = "subtractScalar", di = ["typed"], hi = X(It, di, (r) => {
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
}), mi = "matAlgo11xS0s", gi = ["typed", "equalScalar"], Jn = X(mi, gi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s, D) {
    var c = t._values, f = t._index, o = t._ptr, l = t._size, d = t._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, h = n, m = 0, b = s;
    typeof d == "string" && (i = d, h = e.find(n, [i, i]), m = e.convert(0, i), a = e.convert(a, i), b = e.find(s, [i, i]));
    for (var y = [], _ = [], F = [], A = 0; A < p; A++) {
      F[A] = _.length;
      for (var B = o[A], E = o[A + 1], g = B; g < E; g++) {
        var x = f[g], C = D ? b(a, c[g]) : b(c[g], a);
        h(C, m) || (_.push(x), y.push(C));
      }
    }
    return F[p] = _.length, t.createSparseMatrix({ values: y, index: _, ptr: F, size: [v, p], datatype: i });
  };
}), yi = "matAlgo12xSfs", Ai = ["typed", "DenseMatrix"], te = X(yi, Ai, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var c = t._values, f = t._index, o = t._ptr, l = t._size, d = t._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, h = s;
    typeof d == "string" && (i = d, a = e.convert(a, i), h = e.find(s, [i, i]));
    for (var m = [], b = [], y = [], _ = 0; _ < p; _++) {
      for (var F = _ + 1, A = o[_], B = o[_ + 1], E = A; E < B; E++) {
        var g = f[E];
        b[g] = c[E], y[g] = F;
      }
      for (var x = 0; x < v; x++) _ === 0 && (m[x] = []), y[x] === F ? m[x][_] = D ? h(a, b[x]) : h(b[x], a) : m[x][_] = D ? h(a, 0) : h(0, a);
    }
    return new n({ data: m, size: [v, p], datatype: i });
  };
}), Fi = "matAlgo14xDs", Ei = ["typed"], at = X(Fi, Ei, (r) => {
  var { typed: e } = r;
  return function(t, a, s, D) {
    var c = t._data, f = t._size, o = t._datatype, l, d = s;
    typeof o == "string" && (l = o, a = e.convert(a, l), d = e.find(s, [l, l]));
    var v = f.length > 0 ? n(d, 0, f, f[0], c, a, D) : [];
    return t.createDenseMatrix({ data: v, size: ar(f), datatype: l });
  };
  function n(u, t, a, s, D, c, f) {
    var o = [];
    if (t === a.length - 1) for (var l = 0; l < s; l++) o[l] = f ? u(c, D[l]) : u(D[l], c);
    else for (var d = 0; d < s; d++) o[d] = n(u, t + 1, a, a[t + 1], D[d], c, f);
    return o;
  }
}), Ci = "matAlgo03xDSf", wi = ["typed"], ne = X(Ci, wi, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, c = u._size, f = u._datatype || u.getDataType(), o = t._values, l = t._index, d = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (c.length !== v.length) throw new or(c.length, v.length);
    if (c[0] !== v[0] || c[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = c[0], h = c[1], m, b = 0, y = a;
    typeof f == "string" && f === p && f !== "mixed" && (m = f, b = e.convert(0, m), y = e.find(a, [m, m]));
    for (var _ = [], F = 0; F < i; F++) _[F] = [];
    for (var A = [], B = [], E = 0; E < h; E++) {
      for (var g = E + 1, x = d[E], C = d[E + 1], w = x; w < C; w++) {
        var M = l[w];
        A[M] = s ? y(o[w], D[M][E]) : y(D[M][E], o[w]), B[M] = g;
      }
      for (var S = 0; S < i; S++) B[S] === g ? _[S][E] = A[S] : _[S][E] = s ? y(b, D[S][E]) : y(D[S][E], b);
    }
    return u.createDenseMatrix({ data: _, size: [i, h], datatype: f === u._datatype && p === t._datatype ? m : void 0 });
  };
}), bi = "matAlgo05xSfSf", _i = ["typed", "equalScalar"], Bi = X(bi, _i, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, c = t._index, f = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), d = a._values, v = a._index, p = a._ptr, i = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new or(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var m = o[0], b = o[1], y, _ = n, F = 0, A = s;
    typeof l == "string" && l === h && l !== "mixed" && (y = l, _ = e.find(n, [y, y]), F = e.convert(0, y), A = e.find(s, [y, y]));
    var B = D && d ? [] : void 0, E = [], g = [], x = B ? [] : void 0, C = B ? [] : void 0, w = [], M = [], S, T, N, I;
    for (T = 0; T < b; T++) {
      g[T] = E.length;
      var z = T + 1;
      for (N = f[T], I = f[T + 1]; N < I; N++) S = c[N], E.push(S), w[S] = z, x && (x[S] = D[N]);
      for (N = p[T], I = p[T + 1]; N < I; N++) S = v[N], w[S] !== z && E.push(S), M[S] = z, C && (C[S] = d[N]);
      if (B) for (N = g[T]; N < E.length; ) {
        S = E[N];
        var O = w[S], P = M[S];
        if (O === z || P === z) {
          var W = O === z ? x[S] : F, $ = P === z ? C[S] : F, q = A(W, $);
          _(q, F) ? E.splice(N, 1) : (B.push(q), N++);
        }
      }
    }
    return g[b] = E.length, t.createSparseMatrix({ values: B, index: E, ptr: g, size: [m, b], datatype: l === t._datatype && h === a._datatype ? y : void 0 });
  };
}), xi = "matAlgo13xDD", Si = ["typed"], Mi = X(xi, Si, (r) => {
  var { typed: e } = r;
  return function(t, a, s) {
    var D = t._data, c = t._size, f = t._datatype, o = a._data, l = a._size, d = a._datatype, v = [];
    if (c.length !== l.length) throw new or(c.length, l.length);
    for (var p = 0; p < c.length; p++) {
      if (c[p] !== l[p]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + l + ")");
      v[p] = c[p];
    }
    var i, h = s;
    typeof f == "string" && f === d && (i = f, h = e.find(s, [i, i]));
    var m = v.length > 0 ? n(h, 0, v, v[0], D, o) : [];
    return t.createDenseMatrix({ data: m, size: v, datatype: i });
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
var Ti = "matrixAlgorithmSuite", zi = ["typed", "matrix"], Yr = X(Ti, zi, (r) => {
  var { typed: e, matrix: n } = r, u = Mi({ typed: e }), t = at({ typed: e });
  return function(s) {
    var D = s.elop, c = s.SD || s.DS, f;
    D ? (f = { "DenseMatrix, DenseMatrix": (v, p) => u(...Fr(v, p), D), "Array, Array": (v, p) => u(...Fr(n(v), n(p)), D).valueOf(), "Array, DenseMatrix": (v, p) => u(...Fr(n(v), p), D), "DenseMatrix, Array": (v, p) => u(...Fr(v, n(p)), D) }, s.SS && (f["SparseMatrix, SparseMatrix"] = (v, p) => s.SS(...Fr(v, p), D, false)), s.DS && (f["DenseMatrix, SparseMatrix"] = (v, p) => s.DS(...Fr(v, p), D, false), f["Array, SparseMatrix"] = (v, p) => s.DS(...Fr(n(v), p), D, false)), c && (f["SparseMatrix, DenseMatrix"] = (v, p) => c(...Fr(p, v), D, true), f["SparseMatrix, Array"] = (v, p) => c(...Fr(n(p), v), D, true))) : (f = { "DenseMatrix, DenseMatrix": e.referToSelf((v) => (p, i) => u(...Fr(p, i), v)), "Array, Array": e.referToSelf((v) => (p, i) => u(...Fr(n(p), n(i)), v).valueOf()), "Array, DenseMatrix": e.referToSelf((v) => (p, i) => u(...Fr(n(p), i), v)), "DenseMatrix, Array": e.referToSelf((v) => (p, i) => u(...Fr(p, n(i)), v)) }, s.SS && (f["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.SS(...Fr(p, i), v, false))), s.DS && (f["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...Fr(p, i), v, false)), f["Array, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(...Fr(n(p), i), v, false))), c && (f["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (p, i) => c(...Fr(i, p), v, true)), f["SparseMatrix, Array"] = e.referToSelf((v) => (p, i) => c(...Fr(n(i), p), v, true))));
    var o = s.scalar || "any", l = s.Ds || s.Ss;
    l && (D ? (f["DenseMatrix," + o] = (v, p) => t(v, p, D, false), f[o + ", DenseMatrix"] = (v, p) => t(p, v, D, true), f["Array," + o] = (v, p) => t(n(v), p, D, false).valueOf(), f[o + ", Array"] = (v, p) => t(n(p), v, D, true).valueOf()) : (f["DenseMatrix," + o] = e.referToSelf((v) => (p, i) => t(p, i, v, false)), f[o + ", DenseMatrix"] = e.referToSelf((v) => (p, i) => t(i, p, v, true)), f["Array," + o] = e.referToSelf((v) => (p, i) => t(n(p), i, v, false).valueOf()), f[o + ", Array"] = e.referToSelf((v) => (p, i) => t(n(i), p, v, true).valueOf())));
    var d = s.sS !== void 0 ? s.sS : s.Ss;
    return D ? (s.Ss && (f["SparseMatrix," + o] = (v, p) => s.Ss(v, p, D, false)), d && (f[o + ", SparseMatrix"] = (v, p) => d(p, v, D, true))) : (s.Ss && (f["SparseMatrix," + o] = e.referToSelf((v) => (p, i) => s.Ss(p, i, v, false))), d && (f[o + ", SparseMatrix"] = e.referToSelf((v) => (p, i) => d(i, p, v, true)))), D && D.signatures && En(f, D.signatures), f;
  };
}), Oi = "matAlgo01xDSid", $i = ["typed"], Qn = X(Oi, $i, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, c = u._size, f = u._datatype || u.getDataType(), o = t._values, l = t._index, d = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (c.length !== v.length) throw new or(c.length, v.length);
    if (c[0] !== v[0] || c[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = c[0], h = c[1], m = typeof f == "string" && f !== "mixed" && f === p ? f : void 0, b = m ? e.find(a, [m, m]) : a, y, _, F = [];
    for (y = 0; y < i; y++) F[y] = [];
    var A = [], B = [];
    for (_ = 0; _ < h; _++) {
      for (var E = _ + 1, g = d[_], x = d[_ + 1], C = g; C < x; C++) y = l[C], A[y] = s ? b(o[C], D[y][_]) : b(D[y][_], o[C]), B[y] = E;
      for (y = 0; y < i; y++) B[y] === E ? F[y][_] = A[y] : F[y][_] = D[y][_];
    }
    return u.createDenseMatrix({ data: F, size: [i, h], datatype: f === u._datatype && p === t._datatype ? m : void 0 });
  };
}), Ii = "matAlgo04xSidSid", qi = ["typed", "equalScalar"], Ri = X(Ii, qi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, c = t._index, f = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), d = a._values, v = a._index, p = a._ptr, i = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new or(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var m = o[0], b = o[1], y, _ = n, F = 0, A = s;
    typeof l == "string" && l === h && l !== "mixed" && (y = l, _ = e.find(n, [y, y]), F = e.convert(0, y), A = e.find(s, [y, y]));
    var B = D && d ? [] : void 0, E = [], g = [], x = D && d ? [] : void 0, C = D && d ? [] : void 0, w = [], M = [], S, T, N, I, z;
    for (T = 0; T < b; T++) {
      g[T] = E.length;
      var O = T + 1;
      for (I = f[T], z = f[T + 1], N = I; N < z; N++) S = c[N], E.push(S), w[S] = O, x && (x[S] = D[N]);
      for (I = p[T], z = p[T + 1], N = I; N < z; N++) if (S = v[N], w[S] === O) {
        if (x) {
          var P = A(x[S], d[N]);
          _(P, F) ? w[S] = null : x[S] = P;
        }
      } else E.push(S), M[S] = O, C && (C[S] = d[N]);
      if (x && C) for (N = g[T]; N < E.length; ) S = E[N], w[S] === O ? (B[N] = x[S], N++) : M[S] === O ? (B[N] = C[S], N++) : E.splice(N, 1);
    }
    return g[b] = E.length, t.createSparseMatrix({ values: B, index: E, ptr: g, size: [m, b], datatype: l === t._datatype && h === a._datatype ? y : void 0 });
  };
}), Ui = "matAlgo10xSids", Pi = ["typed", "DenseMatrix"], Wn = X(Ui, Pi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var c = t._values, f = t._index, o = t._ptr, l = t._size, d = t._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, h = s;
    typeof d == "string" && (i = d, a = e.convert(a, i), h = e.find(s, [i, i]));
    for (var m = [], b = [], y = [], _ = 0; _ < p; _++) {
      for (var F = _ + 1, A = o[_], B = o[_ + 1], E = A; E < B; E++) {
        var g = f[E];
        b[g] = c[E], y[g] = F;
      }
      for (var x = 0; x < v; x++) _ === 0 && (m[x] = []), y[x] === F ? m[x][_] = D ? h(a, b[x]) : h(b[x], a) : m[x][_] = a;
    }
    return new n({ data: m, size: [v, p], datatype: i });
  };
}), Li = "multiplyScalar", Vi = ["typed"], Zi = X(Li, Vi, (r) => {
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
}), qt = "multiply", Ji = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Qi = X(qt, Ji, (r) => {
  var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: s } = r, D = Jn({ typed: e, equalScalar: a }), c = at({ typed: e });
  function f(F, A) {
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
  function o(F, A, B) {
    if (B === 0) throw new Error("Cannot multiply two empty vectors");
    return s(F, A);
  }
  function l(F, A) {
    if (A.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
    return d(F, A);
  }
  function d(F, A) {
    var B = F._data, E = F._size, g = F._datatype || F.getDataType(), x = A._data, C = A._size, w = A._datatype || A.getDataType(), M = E[0], S = C[1], T, N = u, I = t;
    g && w && g === w && typeof g == "string" && g !== "mixed" && (T = g, N = e.find(u, [T, T]), I = e.find(t, [T, T]));
    for (var z = [], O = 0; O < S; O++) {
      for (var P = I(B[0], x[0][O]), W = 1; W < M; W++) P = N(P, I(B[W], x[W][O]));
      z[O] = P;
    }
    return F.createDenseMatrix({ data: z, size: [S], datatype: g === F._datatype && w === A._datatype ? T : void 0 });
  }
  var v = e("_multiplyMatrixVector", { "DenseMatrix, any": i, "SparseMatrix, any": b }), p = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": h, "DenseMatrix, SparseMatrix": m, "SparseMatrix, DenseMatrix": y, "SparseMatrix, SparseMatrix": _ });
  function i(F, A) {
    var B = F._data, E = F._size, g = F._datatype || F.getDataType(), x = A._data, C = A._datatype || A.getDataType(), w = E[0], M = E[1], S, T = u, N = t;
    g && C && g === C && typeof g == "string" && g !== "mixed" && (S = g, T = e.find(u, [S, S]), N = e.find(t, [S, S]));
    for (var I = [], z = 0; z < w; z++) {
      for (var O = B[z], P = N(O[0], x[0]), W = 1; W < M; W++) P = T(P, N(O[W], x[W]));
      I[z] = P;
    }
    return F.createDenseMatrix({ data: I, size: [w], datatype: g === F._datatype && C === A._datatype ? S : void 0 });
  }
  function h(F, A) {
    var B = F._data, E = F._size, g = F._datatype || F.getDataType(), x = A._data, C = A._size, w = A._datatype || A.getDataType(), M = E[0], S = E[1], T = C[1], N, I = u, z = t;
    g && w && g === w && typeof g == "string" && g !== "mixed" && g !== "mixed" && (N = g, I = e.find(u, [N, N]), z = e.find(t, [N, N]));
    for (var O = [], P = 0; P < M; P++) {
      var W = B[P];
      O[P] = [];
      for (var $ = 0; $ < T; $++) {
        for (var q = z(W[0], x[0][$]), V = 1; V < S; V++) q = I(q, z(W[V], x[V][$]));
        O[P][$] = q;
      }
    }
    return F.createDenseMatrix({ data: O, size: [M, T], datatype: g === F._datatype && w === A._datatype ? N : void 0 });
  }
  function m(F, A) {
    var B = F._data, E = F._size, g = F._datatype || F.getDataType(), x = A._values, C = A._index, w = A._ptr, M = A._size, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
    if (!x) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var T = E[0], N = M[1], I, z = u, O = t, P = a, W = 0;
    g && S && g === S && typeof g == "string" && g !== "mixed" && (I = g, z = e.find(u, [I, I]), O = e.find(t, [I, I]), P = e.find(a, [I, I]), W = e.convert(0, I));
    for (var $ = [], q = [], V = [], Y = A.createSparseMatrix({ values: $, index: q, ptr: V, size: [T, N], datatype: g === F._datatype && S === A._datatype ? I : void 0 }), Z = 0; Z < N; Z++) {
      V[Z] = q.length;
      var R = w[Z], J = w[Z + 1];
      if (J > R) for (var L = 0, U = 0; U < T; U++) {
        for (var K = U + 1, Q = void 0, j = R; j < J; j++) {
          var rr = C[j];
          L !== K ? (Q = O(B[U][rr], x[j]), L = K) : Q = z(Q, O(B[U][rr], x[j]));
        }
        L === K && !P(Q, W) && (q.push(U), $.push(Q));
      }
    }
    return V[N] = q.length, Y;
  }
  function b(F, A) {
    var B = F._values, E = F._index, g = F._ptr, x = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!B) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var C = A._data, w = A._datatype || A.getDataType(), M = F._size[0], S = A._size[0], T = [], N = [], I = [], z, O = u, P = t, W = a, $ = 0;
    x && w && x === w && typeof x == "string" && x !== "mixed" && (z = x, O = e.find(u, [z, z]), P = e.find(t, [z, z]), W = e.find(a, [z, z]), $ = e.convert(0, z));
    var q = [], V = [];
    I[0] = 0;
    for (var Y = 0; Y < S; Y++) {
      var Z = C[Y];
      if (!W(Z, $)) for (var R = g[Y], J = g[Y + 1], L = R; L < J; L++) {
        var U = E[L];
        V[U] ? q[U] = O(q[U], P(Z, B[L])) : (V[U] = true, N.push(U), q[U] = P(Z, B[L]));
      }
    }
    for (var K = N.length, Q = 0; Q < K; Q++) {
      var j = N[Q];
      T[Q] = q[j];
    }
    return I[1] = N.length, F.createSparseMatrix({ values: T, index: N, ptr: I, size: [M, 1], datatype: x === F._datatype && w === A._datatype ? z : void 0 });
  }
  function y(F, A) {
    var B = F._values, E = F._index, g = F._ptr, x = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!B) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var C = A._data, w = A._datatype || A.getDataType(), M = F._size[0], S = A._size[0], T = A._size[1], N, I = u, z = t, O = a, P = 0;
    x && w && x === w && typeof x == "string" && x !== "mixed" && (N = x, I = e.find(u, [N, N]), z = e.find(t, [N, N]), O = e.find(a, [N, N]), P = e.convert(0, N));
    for (var W = [], $ = [], q = [], V = F.createSparseMatrix({ values: W, index: $, ptr: q, size: [M, T], datatype: x === F._datatype && w === A._datatype ? N : void 0 }), Y = [], Z = [], R = 0; R < T; R++) {
      q[R] = $.length;
      for (var J = R + 1, L = 0; L < S; L++) {
        var U = C[L][R];
        if (!O(U, P)) for (var K = g[L], Q = g[L + 1], j = K; j < Q; j++) {
          var rr = E[j];
          Z[rr] !== J ? (Z[rr] = J, $.push(rr), Y[rr] = z(U, B[j])) : Y[rr] = I(Y[rr], z(U, B[j]));
        }
      }
      for (var tr = q[R], nr = $.length, ur = tr; ur < nr; ur++) {
        var fr = $[ur];
        W[ur] = Y[fr];
      }
    }
    return q[T] = $.length, V;
  }
  function _(F, A) {
    var B = F._values, E = F._index, g = F._ptr, x = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), C = A._values, w = A._index, M = A._ptr, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), T = F._size[0], N = A._size[1], I = B && C, z, O = u, P = t;
    x && S && x === S && typeof x == "string" && x !== "mixed" && (z = x, O = e.find(u, [z, z]), P = e.find(t, [z, z]));
    for (var W = I ? [] : void 0, $ = [], q = [], V = F.createSparseMatrix({ values: W, index: $, ptr: q, size: [T, N], datatype: x === F._datatype && S === A._datatype ? z : void 0 }), Y = I ? [] : void 0, Z = [], R, J, L, U, K, Q, j, rr, tr = 0; tr < N; tr++) {
      q[tr] = $.length;
      var nr = tr + 1;
      for (K = M[tr], Q = M[tr + 1], U = K; U < Q; U++) if (rr = w[U], I) for (J = g[rr], L = g[rr + 1], R = J; R < L; R++) j = E[R], Z[j] !== nr ? (Z[j] = nr, $.push(j), Y[j] = P(C[U], B[R])) : Y[j] = O(Y[j], P(C[U], B[R]));
      else for (J = g[rr], L = g[rr + 1], R = J; R < L; R++) j = E[R], Z[j] !== nr && (Z[j] = nr, $.push(j));
      if (I) for (var ur = q[tr], fr = $.length, gr = ur; gr < fr; gr++) {
        var cr = $[gr];
        W[gr] = Y[cr];
      }
    }
    return q[N] = $.length, V;
  }
  return e(qt, t, { "Array, Array": e.referTo("Matrix, Matrix", (F) => (A, B) => {
    f(ir(A), ir(B));
    var E = F(n(A), n(B));
    return lr(E) ? E.valueOf() : E;
  }), "Matrix, Matrix": function(A, B) {
    var E = A.size(), g = B.size();
    return f(E, g), E.length === 1 ? g.length === 1 ? o(A, B, E[0]) : l(A, B) : g.length === 1 ? v(A, B) : p(A, B);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (A, B) => F(A, n(B))), "Array, Matrix": e.referToSelf((F) => (A, B) => F(n(A, B.storage()), B)), "SparseMatrix, any": function(A, B) {
    return D(A, B, t, false);
  }, "DenseMatrix, any": function(A, B) {
    return c(A, B, t, false);
  }, "any, SparseMatrix": function(A, B) {
    return D(B, A, t, true);
  }, "any, DenseMatrix": function(A, B) {
    return c(B, A, t, true);
  }, "Array, any": function(A, B) {
    return c(n(A), B, t, false).valueOf();
  }, "any, Array": function(A, B) {
    return c(n(B), A, t, true).valueOf();
  }, "any, any": t, "any, any, ...any": e.referToSelf((F) => (A, B, E) => {
    for (var g = F(A, B), x = 0; x < E.length; x++) g = F(g, E[x]);
    return g;
  }) });
}), Rt = "sign", Wi = ["typed", "BigNumber", "Fraction", "complex"], Xi = X(Rt, Wi, (r) => {
  var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
  return e(Rt, { number: Ge, Complex: function(s) {
    return s.im === 0 ? u(Ge(s.re)) : s.sign();
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
}), Yi = "sqrt", Gi = ["config", "typed", "Complex"], Ki = X(Yi, Gi, (r) => {
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
}), Ut = "subtract", Hi = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], ji = X(Ut, Hi, (r) => {
  var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: s, concat: D } = r, c = Qn({ typed: e }), f = ne({ typed: e }), o = Bi({ typed: e, equalScalar: u }), l = Wn({ typed: e, DenseMatrix: s }), d = te({ typed: e, DenseMatrix: s }), v = Yr({ typed: e, matrix: n, concat: D });
  return e(Ut, { "any, any": t }, v({ elop: t, SS: o, DS: c, SD: f, Ss: d, sS: l }));
}), ki = "matAlgo07xSSf", ro = ["typed", "SparseMatrix"], fe = X(ki, ro, (r) => {
  var { typed: e, SparseMatrix: n } = r;
  return function(a, s, D) {
    var c = a._size, f = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), o = s._size, l = s._datatype || s._data === void 0 ? s._datatype : s.getDataType();
    if (c.length !== o.length) throw new or(c.length, o.length);
    if (c[0] !== o[0] || c[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + o + ")");
    var d = c[0], v = c[1], p, i = 0, h = D;
    typeof f == "string" && f === l && f !== "mixed" && (p = f, i = e.convert(0, p), h = e.find(D, [p, p]));
    for (var m = [], b = [], y = new Array(v + 1).fill(0), _ = [], F = [], A = [], B = [], E = 0; E < v; E++) {
      var g = E + 1, x = 0;
      u(a, E, A, _, g), u(s, E, B, F, g);
      for (var C = 0; C < d; C++) {
        var w = A[C] === g ? _[C] : i, M = B[C] === g ? F[C] : i, S = h(w, M);
        S !== 0 && S !== false && (b.push(C), m.push(S), x++);
      }
      y[E + 1] = y[E] + x;
    }
    return new n({ values: m, index: b, ptr: y, size: [d, v], datatype: f === a._datatype && l === s._datatype ? p : void 0 });
  };
  function u(t, a, s, D, c) {
    for (var f = t._values, o = t._index, l = t._ptr, d = l[a], v = l[a + 1]; d < v; d++) {
      var p = o[d];
      s[p] = c, D[p] = f[d];
    }
  }
}), Pt = "conj", eo = ["typed"], to = X(Pt, eo, (r) => {
  var { typed: e } = r;
  return e(Pt, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.conjugate(), "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n)) });
}), Lt = "im", no = ["typed"], uo = X(Lt, no, (r) => {
  var { typed: e } = r;
  return e(Lt, { number: () => 0, "BigNumber | Fraction": (n) => n.mul(0), Complex: (n) => n.im, "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n)) });
}), Vt = "re", ao = ["typed"], io = X(Vt, ao, (r) => {
  var { typed: e } = r;
  return e(Vt, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.re, "Array | Matrix": e.referToSelf((n) => (u) => Nr(u, n)) });
}), Zt = "concat", oo = ["typed", "matrix", "isInteger"], so = X(Zt, oo, (r) => {
  var { typed: e, matrix: n, isInteger: u } = r;
  return e(Zt, { "...Array | Matrix | number | BigNumber": function(a) {
    var s, D = a.length, c = -1, f, o = false, l = [];
    for (s = 0; s < D; s++) {
      var d = a[s];
      if (lr(d) && (o = true), vr(d) || Ar(d)) {
        if (s !== D - 1) throw new Error("Dimension must be specified as last argument");
        if (f = c, c = d.valueOf(), !u(c)) throw new TypeError("Integer number expected for dimension");
        if (c < 0 || s > 0 && c > f) throw new Xr(c, f + 1);
      } else {
        var v = ar(d).valueOf(), p = ir(v);
        if (l[s] = v, f = c, c = p.length - 1, s > 0 && c !== f) throw new or(f + 1, c + 1);
      }
    }
    if (l.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var i = l.shift(); l.length; ) i = zn(i, l.shift(), c);
    return o ? n(i) : i;
  }, "...string": function(a) {
    return a.join("");
  } });
}), Jt = "column", fo = ["typed", "Index", "matrix", "range"], lo = X(Jt, fo, (r) => {
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
}), Qt = "cross", co = ["typed", "matrix", "subtract", "multiply"], vo = X(Qt, co, (r) => {
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
}), Wt = "diag", Do = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], po = X(Wt, Do, (r) => {
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
    var d = f > 0 ? f : 0, v = f < 0 ? -f : 0;
    switch (o.length) {
      case 1:
        return s(c, f, l, o[0], v, d);
      case 2:
        return D(c, f, l, o, v, d);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function s(c, f, o, l, d, v) {
    var p = [l + d, l + v];
    if (o && o !== "sparse" && o !== "dense") throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var i = o === "sparse" ? t.diagonal(p, c, f) : u.diagonal(p, c, f);
    return o !== null ? i : i.valueOf();
  }
  function D(c, f, o, l, d, v) {
    if (lr(c)) {
      var p = c.diagonal(f);
      return o !== null ? o !== p.storage() ? n(p, o) : p : p.valueOf();
    }
    for (var i = Math.min(l[0] - d, l[1] - v), h = [], m = 0; m < i; m++) h[m] = c[m + d][m + v];
    return o !== null ? n(h) : h;
  }
}), Xt = "flatten", ho = ["typed"], mo = X(Xt, ho, (r) => {
  var { typed: e } = r;
  return e(Xt, { Array: function(u) {
    return Xe(u);
  }, Matrix: function(u) {
    return u.create(Xe(u.valueOf(), true), u.datatype());
  } });
}), Yt = "getMatrixDataType", go = ["typed"], yo = X(Yt, go, (r) => {
  var { typed: e } = r;
  return e(Yt, { Array: function(u) {
    return Oe(u, Ir);
  }, Matrix: function(u) {
    return u.getDataType();
  } });
}), Gt = "identity", Ao = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Fo = X(Gt, Ao, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t, DenseMatrix: a, SparseMatrix: s } = r;
  return e(Gt, { "": function() {
    return n.matrix === "Matrix" ? u([]) : [];
  }, string: function(o) {
    return u(o);
  }, "number | BigNumber": function(o) {
    return c(o, o, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(o, l) {
    return c(o, o, l);
  }, "number | BigNumber, number | BigNumber": function(o, l) {
    return c(o, l, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(o, l, d) {
    return c(o, l, d);
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
    var d = Ar(f) || Ar(o) ? t : null;
    if (Ar(f) && (f = f.toNumber()), Ar(o) && (o = o.toNumber()), !pr(f) || f < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!pr(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
    var v = d ? new t(1) : 1, p = d ? new d(0) : 0, i = [f, o];
    if (l) {
      if (l === "sparse") return s.diagonal(i, v, 0, p);
      if (l === "dense") return a.diagonal(i, v, 0, p);
      throw new TypeError('Unknown matrix type "'.concat(l, '"'));
    }
    for (var h = Ce([], i, p), m = f < o ? f : o, b = 0; b < m; b++) h[b][b] = v;
    return h;
  }
}), Kt = "kron", Eo = ["typed", "matrix", "multiplyScalar"], Co = X(Kt, Eo, (r) => {
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
          return o.map(function(d) {
            return c.push(u(l, d));
          });
        });
      });
    }) && D;
  }
});
function Xn() {
  throw new Error('No "bignumber" implementation available');
}
function wo() {
  throw new Error('No "fraction" implementation available');
}
function Yn() {
  throw new Error('No "matrix" implementation available');
}
var Ht = "range", bo = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], _o = X(Ht, bo, (r) => {
  var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: s, larger: D, largerEq: c, add: f, isPositive: o } = r;
  return e(Ht, { string: d, "string, boolean": d, number: function(h) {
    throw new TypeError("Too few arguments to function range(): ".concat(h));
  }, boolean: function(h) {
    throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(h, ", number|bigint|BigNumber|Fraction"));
  }, "number, number": function(h, m) {
    return l(v(h, m, 1, false));
  }, "number, number, number": function(h, m, b) {
    return l(v(h, m, b, false));
  }, "number, number, boolean": function(h, m, b) {
    return l(v(h, m, 1, b));
  }, "number, number, number, boolean": function(h, m, b, y) {
    return l(v(h, m, b, y));
  }, "bigint, bigint|number": function(h, m) {
    return l(v(h, m, 1n, false));
  }, "number, bigint": function(h, m) {
    return l(v(BigInt(h), m, 1n, false));
  }, "bigint, bigint|number, bigint|number": function(h, m, b) {
    return l(v(h, m, BigInt(b), false));
  }, "number, bigint, bigint|number": function(h, m, b) {
    return l(v(BigInt(h), m, BigInt(b), false));
  }, "bigint, bigint|number, boolean": function(h, m, b) {
    return l(v(h, m, 1n, b));
  }, "number, bigint, boolean": function(h, m, b) {
    return l(v(BigInt(h), m, 1n, b));
  }, "bigint, bigint|number, bigint|number, boolean": function(h, m, b, y) {
    return l(v(h, m, BigInt(b), y));
  }, "number, bigint, bigint|number, boolean": function(h, m, b, y) {
    return l(v(BigInt(h), m, BigInt(b), y));
  }, "BigNumber, BigNumber": function(h, m) {
    var b = h.constructor;
    return l(v(h, m, new b(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(h, m, b) {
    return l(v(h, m, b, false));
  }, "BigNumber, BigNumber, boolean": function(h, m, b) {
    var y = h.constructor;
    return l(v(h, m, new y(1), b));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(h, m, b, y) {
    return l(v(h, m, b, y));
  }, "Fraction, Fraction": function(h, m) {
    return l(v(h, m, 1, false));
  }, "Fraction, Fraction, Fraction": function(h, m, b) {
    return l(v(h, m, b, false));
  }, "Fraction, Fraction, boolean": function(h, m, b) {
    return l(v(h, m, 1, b));
  }, "Fraction, Fraction, Fraction, boolean": function(h, m, b, y) {
    return l(v(h, m, b, y));
  }, "Unit, Unit, Unit": function(h, m, b) {
    return l(v(h, m, b, false));
  }, "Unit, Unit, Unit, boolean": function(h, m, b, y) {
    return l(v(h, m, b, y));
  } });
  function l(i) {
    return n.matrix === "Matrix" ? u ? u(i) : Yn() : i;
  }
  function d(i, h) {
    var m = p(i);
    if (!m) throw new SyntaxError('String "' + i + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && Xn(), l(v(t(m.start), t(m.end), t(m.step)))) : l(v(m.start, m.end, m.step, h));
  }
  function v(i, h, m, b) {
    for (var y = [], _ = o(m) ? b ? s : a : b ? c : D, F = i; _(F, h); ) y.push(F), F = f(F, m);
    return y;
  }
  function p(i) {
    var h = i.split(":"), m = h.map(function(y) {
      return Number(y);
    }), b = m.some(function(y) {
      return isNaN(y);
    });
    if (b) return null;
    switch (m.length) {
      case 2:
        return { start: m[0], end: m[1], step: 1 };
      case 3:
        return { start: m[0], end: m[2], step: m[1] };
      default:
        return null;
    }
  }
}), jt = "reshape", Bo = ["typed", "isInteger", "matrix"], xo = X(jt, Bo, (r) => {
  var { typed: e, isInteger: n } = r;
  return e(jt, { "Matrix, Array": function(t, a) {
    return t.reshape(a, true);
  }, "Array, Array": function(t, a) {
    return a.forEach(function(s) {
      if (!n(s)) throw new TypeError("Invalid size for dimension: " + s);
    }), tt(t, a);
  } });
}), kt = "size", So = ["typed", "config", "?matrix"], Mo = X(kt, So, (r) => {
  var { typed: e, config: n, matrix: u } = r;
  return e(kt, { Matrix: function(a) {
    return a.create(a.size(), "number");
  }, Array: ir, string: function(a) {
    return n.matrix === "Array" ? [a.length] : u([a.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(a) {
    return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : Yn();
  } });
}), rn = "transpose", No = ["typed", "matrix"], To = X(rn, No, (r) => {
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
    for (var f = s._data, o = [], l, d = 0; d < c; d++) {
      l = o[d] = [];
      for (var v = 0; v < D; v++) l[v] = ar(f[v][d]);
    }
    return s.createDenseMatrix({ data: o, size: [c, D], datatype: s._datatype });
  }
  function a(s, D, c) {
    for (var f = s._values, o = s._index, l = s._ptr, d = f ? [] : void 0, v = [], p = [], i = [], h = 0; h < D; h++) i[h] = 0;
    var m, b, y;
    for (m = 0, b = o.length; m < b; m++) i[o[m]]++;
    for (var _ = 0, F = 0; F < D; F++) p.push(_), _ += i[F], i[F] = p[F];
    for (p.push(_), y = 0; y < c; y++) for (var A = l[y], B = l[y + 1], E = A; E < B; E++) {
      var g = i[o[E]]++;
      v[g] = y, f && (d[g] = ar(f[E]));
    }
    return s.createSparseMatrix({ values: d, index: v, ptr: p, size: [c, D], datatype: s._datatype });
  }
}), en = "ctranspose", zo = ["typed", "transpose", "conj"], Oo = X(en, zo, (r) => {
  var { typed: e, transpose: n, conj: u } = r;
  return e(en, { any: function(a) {
    return u(n(a));
  } });
}), tn = "zeros", $o = ["typed", "config", "matrix", "BigNumber"], Io = X(tn, $o, (r) => {
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
      var d = u(f);
      return c.length > 0 ? d.resize(c, l) : d;
    } else {
      var v = [];
      return c.length > 0 ? Ce(v, c, l) : v;
    }
  }
  function s(c) {
    var f = false;
    return c.forEach(function(o, l, d) {
      Ar(o) && (f = true, d[l] = o.toNumber());
    }), f;
  }
  function D(c) {
    c.forEach(function(f) {
      if (typeof f != "number" || !pr(f) || f < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), qo = "numeric", Ro = ["number", "?bignumber", "?fraction"], Uo = X(qo, Ro, (r) => {
  var { number: e, bignumber: n, fraction: u } = r, t = { string: true, number: true, BigNumber: true, Fraction: true }, a = { number: (s) => e(s), BigNumber: n ? (s) => n(s) : Xn, bigint: (s) => BigInt(s), Fraction: u ? (s) => u(s) : wo };
  return function(D) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", f = arguments.length > 2 ? arguments[2] : void 0;
    if (f !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var o = Ir(D);
    if (!(o in t)) throw new TypeError("Cannot convert " + D + ' of type "' + o + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(c in a)) throw new TypeError("Cannot convert " + D + ' to type "' + c + '"; valid output types are ' + Object.keys(a).join(", "));
    return c === o ? D : a[c](D);
  };
}), nn = "divideScalar", Po = ["typed", "numeric"], Lo = X(nn, Po, (r) => {
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
}), un = "pow", Vo = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], Zo = X(un, Vo, (r) => {
  var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: s, number: D, fraction: c, Complex: f } = r;
  return e(un, { "number, number": o, "Complex, Complex": function(p, i) {
    return p.pow(i);
  }, "BigNumber, BigNumber": function(p, i) {
    return i.isInteger() || p >= 0 || n.predictable ? p.pow(i) : new f(p.toNumber(), 0).pow(i.toNumber(), 0);
  }, "bigint, bigint": (v, p) => v ** p, "Fraction, Fraction": function(p, i) {
    var h = p.pow(i);
    if (h != null) return h;
    if (n.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return o(p.valueOf(), i.valueOf());
  }, "Array, number": l, "Array, BigNumber": function(p, i) {
    return l(p, i.toNumber());
  }, "Matrix, number": d, "Matrix, BigNumber": function(p, i) {
    return d(p, i.toNumber());
  }, "Unit, number | BigNumber": function(p, i) {
    return p.pow(i);
  } });
  function o(v, p) {
    if (n.predictable && !pr(p) && v < 0) try {
      var i = c(p), h = D(i);
      if ((p === h || Math.abs((p - h) / p) < 1e-14) && i.d % 2n === 1n) return (i.n % 2n === 0n ? 1 : -1) * Math.pow(-v, p);
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
    } catch (b) {
      throw b.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + p + ")") : b;
    }
    for (var h = u(i[0]).valueOf(), m = v; p >= 1; ) (p & 1) === 1 && (h = t(m, h)), p >>= 1, m = t(m, m);
    return h;
  }
  function d(v, p) {
    return a(l(v.valueOf(), p));
  }
});
function Gn(r) {
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
        for (var d = 0; d < D; d++) f[d] = [l[d]];
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
          for (var i = t._values, h = t._index, m = t._ptr, b = m[1], y = m[0]; y < b; y++) {
            var _ = h[y];
            f[_][0] = i[y];
          }
          return new e({ data: f, size: [D, 1], datatype: t._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (mr(t)) {
      var F = ir(t);
      if (F.length === 1) {
        if (F[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var A = 0; A < D; A++) f[A] = [t[A]];
        return new e({ data: f, size: [D, 1] });
      }
      if (F.length === 2) {
        if (F[0] !== D || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var B = 0; B < D; B++) f[B] = [t[B][0]];
        return new e({ data: f, size: [D, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var an = "usolve", Jo = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Qo = X(an, Jo, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, c = Gn({ DenseMatrix: D });
  return e(an, { "SparseMatrix, Array | Matrix": function(d, v) {
    return o(d, v);
  }, "DenseMatrix, Array | Matrix": function(d, v) {
    return f(d, v);
  }, "Array, Array | Matrix": function(d, v) {
    var p = n(d), i = f(p, v);
    return i.valueOf();
  } });
  function f(l, d) {
    d = c(l, d, true);
    for (var v = d._data, p = l._size[0], i = l._size[1], h = [], m = l._data, b = i - 1; b >= 0; b--) {
      var y = v[b][0] || 0, _ = void 0;
      if (s(y, 0)) _ = 0;
      else {
        var F = m[b][b];
        if (s(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        _ = u(y, F);
        for (var A = b - 1; A >= 0; A--) v[A] = [a(v[A][0] || 0, t(_, m[A][b]))];
      }
      h[b] = [_];
    }
    return new D({ data: h, size: [p, 1] });
  }
  function o(l, d) {
    d = c(l, d, true);
    for (var v = d._data, p = l._size[0], i = l._size[1], h = l._values, m = l._index, b = l._ptr, y = [], _ = i - 1; _ >= 0; _--) {
      var F = v[_][0] || 0;
      if (s(F, 0)) y[_] = [0];
      else {
        for (var A = 0, B = [], E = [], g = b[_], x = b[_ + 1], C = x - 1; C >= g; C--) {
          var w = m[C];
          w === _ ? A = h[C] : w < _ && (B.push(h[C]), E.push(w));
        }
        if (s(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var M = u(F, A), S = 0, T = E.length; S < T; S++) {
          var N = E[S];
          v[N] = [a(v[N][0], t(M, B[S]))];
        }
        y[_] = [M];
      }
    }
    return new D({ data: y, size: [p, 1] });
  }
}), on = "usolveAll", Wo = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Xo = X(on, Wo, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, c = Gn({ DenseMatrix: D });
  return e(on, { "SparseMatrix, Array | Matrix": function(d, v) {
    return o(d, v);
  }, "DenseMatrix, Array | Matrix": function(d, v) {
    return f(d, v);
  }, "Array, Array | Matrix": function(d, v) {
    var p = n(d), i = f(p, v);
    return i.map((h) => h.valueOf());
  } });
  function f(l, d) {
    for (var v = [c(l, d, true)._data.map((E) => E[0])], p = l._data, i = l._size[0], h = l._size[1], m = h - 1; m >= 0; m--) for (var b = v.length, y = 0; y < b; y++) {
      var _ = v[y];
      if (s(p[m][m], 0)) if (s(_[m], 0)) {
        if (y === 0) {
          var A = [..._];
          A[m] = 1;
          for (var B = m - 1; B >= 0; B--) A[B] = a(A[B], p[B][m]);
          v.push(A);
        }
      } else {
        if (y === 0) return [];
        v.splice(y, 1), y -= 1, b -= 1;
      }
      else {
        _[m] = u(_[m], p[m][m]);
        for (var F = m - 1; F >= 0; F--) _[F] = a(_[F], t(_[m], p[F][m]));
      }
    }
    return v.map((E) => new D({ data: E.map((g) => [g]), size: [i, 1] }));
  }
  function o(l, d) {
    for (var v = [c(l, d, true)._data.map((W) => W[0])], p = l._size[0], i = l._size[1], h = l._values, m = l._index, b = l._ptr, y = i - 1; y >= 0; y--) for (var _ = v.length, F = 0; F < _; F++) {
      for (var A = v[F], B = [], E = [], g = b[y], x = b[y + 1], C = 0, w = x - 1; w >= g; w--) {
        var M = m[w];
        M === y ? C = h[w] : M < y && (B.push(h[w]), E.push(M));
      }
      if (s(C, 0)) if (s(A[y], 0)) {
        if (F === 0) {
          var I = [...A];
          I[y] = 1;
          for (var z = 0, O = E.length; z < O; z++) {
            var P = E[z];
            I[P] = a(I[P], B[z]);
          }
          v.push(I);
        }
      } else {
        if (F === 0) return [];
        v.splice(F, 1), F -= 1, _ -= 1;
      }
      else {
        A[y] = u(A[y], C);
        for (var S = 0, T = E.length; S < T; S++) {
          var N = E[S];
          A[N] = a(A[N], t(A[y], B[S]));
        }
      }
    }
    return v.map((W) => new D({ data: W.map(($) => [$]), size: [p, 1] }));
  }
}), _e = "equal", Yo = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat", "SparseMatrix"], Go = X(_e, Yo, (r) => {
  var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ne({ typed: e }), c = fe({ typed: e, SparseMatrix: s }), f = te({ typed: e, DenseMatrix: t }), o = Yr({ typed: e, matrix: n, concat: a });
  return e(_e, Ko({ typed: e, equalScalar: u }), o({ elop: u, SS: c, DS: D, Ss: f }));
}), Ko = X(_e, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(_e, { "any, any": function(t, a) {
    return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
  } });
}), Be = "smaller", Ho = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], jo = X(Be, Ho, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, c = ne({ typed: e }), f = fe({ typed: e, SparseMatrix: D }), o = te({ typed: e, DenseMatrix: a }), l = Yr({ typed: e, matrix: t, concat: s }), d = se({ typed: e });
  function v(p, i) {
    return p.lt(i) && !ee(p, i, n.relTol, n.absTol);
  }
  return e(Be, ko({ typed: e, config: n }), { "boolean, boolean": (p, i) => p < i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p < i, "Fraction, Fraction": (p, i) => p.compare(i) === -1, "Fraction, BigNumber": function(i, h) {
    return v(u(i), h);
  }, "BigNumber, Fraction": function(i, h) {
    return v(i, u(h));
  }, "Complex, Complex": function(i, h) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, d, l({ SS: f, DS: c, Ss: o }));
}), ko = X(Be, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Be, { "number, number": function(t, a) {
    return t < a && !Pr(t, a, n.relTol, n.absTol);
  } });
}), xe = "smallerEq", rs = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], es = X(xe, rs, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ne({ typed: e }), c = fe({ typed: e, SparseMatrix: s }), f = te({ typed: e, DenseMatrix: t }), o = Yr({ typed: e, matrix: u, concat: a }), l = se({ typed: e });
  return e(xe, ts({ typed: e, config: n }), { "boolean, boolean": (d, v) => d <= v, "BigNumber, BigNumber": function(v, p) {
    return v.lte(p) || ee(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": (d, v) => d <= v, "Fraction, Fraction": (d, v) => d.compare(v) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: c, DS: D, Ss: f }));
}), ts = X(xe, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(xe, { "number, number": function(t, a) {
    return t <= a || Pr(t, a, n.relTol, n.absTol);
  } });
}), Se = "larger", ns = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], us = X(Se, ns, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, c = ne({ typed: e }), f = fe({ typed: e, SparseMatrix: D }), o = te({ typed: e, DenseMatrix: a }), l = Yr({ typed: e, matrix: t, concat: s }), d = se({ typed: e });
  function v(p, i) {
    return p.gt(i) && !ee(p, i, n.relTol, n.absTol);
  }
  return e(Se, as({ typed: e, config: n }), { "boolean, boolean": (p, i) => p > i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p > i, "Fraction, Fraction": (p, i) => p.compare(i) === 1, "Fraction, BigNumber": function(i, h) {
    return v(u(i), h);
  }, "BigNumber, Fraction": function(i, h) {
    return v(i, u(h));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, d, l({ SS: f, DS: c, Ss: o }));
}), as = X(Se, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Se, { "number, number": function(t, a) {
    return t > a && !Pr(t, a, n.relTol, n.absTol);
  } });
}), Me = "largerEq", is = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], os = X(Me, is, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ne({ typed: e }), c = fe({ typed: e, SparseMatrix: s }), f = te({ typed: e, DenseMatrix: t }), o = Yr({ typed: e, matrix: u, concat: a }), l = se({ typed: e });
  return e(Me, ss({ typed: e, config: n }), { "boolean, boolean": (d, v) => d >= v, "BigNumber, BigNumber": function(v, p) {
    return v.gte(p) || ee(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": function(v, p) {
    return v >= p;
  }, "Fraction, Fraction": (d, v) => d.compare(v) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: c, DS: D, Ss: f }));
}), ss = X(Me, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Me, { "number, number": function(t, a) {
    return t >= a || Pr(t, a, n.relTol, n.absTol);
  } });
}), fs = "ImmutableDenseMatrix", ls = ["smaller", "DenseMatrix"], cs = X(fs, ls, (r) => {
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
}, { isClass: true }), vs = "Index", Ds = ["ImmutableDenseMatrix", "getMatrixDataType"], ps = X(vs, Ds, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
  function u(a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var s = 0, D = arguments.length; s < D; s++) {
      var c = arguments[s], f = mr(c), o = lr(c), l = typeof c, d = null;
      if (Fn(c)) this._dimensions.push(c), this._isScalar = false;
      else if (f || o) {
        var v = void 0;
        n(c) === "boolean" ? (f && (v = t(sn(c).valueOf())), o && (v = t(sn(c._data).valueOf())), d = c.valueOf().length) : v = t(c.valueOf()), this._dimensions.push(v);
        var p = v.size();
        (p.length !== 1 || p[0] !== 1 || d !== null) && (this._isScalar = false);
      } else if (l === "number") this._dimensions.push(t([c]));
      else if (l === "bigint") this._dimensions.push(t([Number(c)]));
      else if (l === "string") this._dimensions.push(c);
      else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
      this._sourceSize.push(d);
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
var ds = "atan", hs = ["typed"], ms = X(ds, hs, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(u) {
    return Math.atan(u);
  }, Complex: function(u) {
    return u.atan();
  }, BigNumber: function(u) {
    return u.atan();
  } });
}), Kn = X("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((n) => (u) => {
    if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(n, u.valueType())(u.value);
  }) };
}), fn = "cos", gs = ["typed"], ys = X(fn, gs, (r) => {
  var { typed: e } = r, n = Kn({ typed: e });
  return e(fn, { number: Math.cos, "Complex | BigNumber": (u) => u.cos() }, n);
}), ln = "sin", As = ["typed"], Fs = X(ln, As, (r) => {
  var { typed: e } = r, n = Kn({ typed: e });
  return e(ln, { number: Math.sin, "Complex | BigNumber": (u) => u.sin() }, n);
}), cn = "add", Es = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], Cs = X(cn, Es, (r) => {
  var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: s, concat: D } = r, c = Qn({ typed: e }), f = Ri({ typed: e, equalScalar: t }), o = Wn({ typed: e, DenseMatrix: a }), l = Yr({ typed: e, matrix: n, concat: D });
  return e(cn, { "any, any": u, "any, any, ...any": e.referToSelf((d) => (v, p, i) => {
    for (var h = d(v, p), m = 0; m < i.length; m++) h = d(h, i[m]);
    return h;
  }) }, l({ elop: u, DS: c, SS: f, Ss: o }));
}), vn = "norm", ws = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], bs = X(vn, ws, (r) => {
  var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: s, multiply: D, equalScalar: c, larger: f, smaller: o, matrix: l, ctranspose: d, eigs: v } = r;
  return e(vn, { number: Math.abs, Complex: function(E) {
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
  function p(B) {
    var E = 0;
    return B.forEach(function(g) {
      var x = n(g);
      f(x, E) && (E = x);
    }, true), E;
  }
  function i(B) {
    var E;
    return B.forEach(function(g) {
      var x = n(g);
      (!E || o(x, E)) && (E = x);
    }, true), E || 0;
  }
  function h(B, E) {
    if (E === Number.POSITIVE_INFINITY || E === "inf") return p(B);
    if (E === Number.NEGATIVE_INFINITY || E === "-inf") return i(B);
    if (E === "fro") return A(B, 2);
    if (typeof E == "number" && !isNaN(E)) {
      if (!c(E, 0)) {
        var g = 0;
        return B.forEach(function(x) {
          g = u(t(n(x), E), g);
        }, true), t(g, 1 / E);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function m(B) {
    var E = 0;
    return B.forEach(function(g, x) {
      E = u(E, D(g, a(g)));
    }), n(s(E));
  }
  function b(B) {
    var E = [], g = 0;
    return B.forEach(function(x, C) {
      var w = C[1], M = u(E[w] || 0, n(x));
      f(M, g) && (g = M), E[w] = M;
    }, true), g;
  }
  function y(B) {
    var E = B.size();
    if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
    var g = d(B), x = D(g, B), C = v(x).values.toArray(), w = C[C.length - 1];
    return n(s(w));
  }
  function _(B) {
    var E = [], g = 0;
    return B.forEach(function(x, C) {
      var w = C[0], M = u(E[w] || 0, n(x));
      f(M, g) && (g = M), E[w] = M;
    }, true), g;
  }
  function F(B, E) {
    if (E === 1) return b(B);
    if (E === Number.POSITIVE_INFINITY || E === "inf") return _(B);
    if (E === "fro") return m(B);
    if (E === 2) return y(B);
    throw new Error("Unsupported parameter value " + E);
  }
  function A(B, E) {
    var g = B.size();
    if (g.length === 1) return h(B, E);
    if (g.length === 2) {
      if (g[0] && g[1]) return F(B, E);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), Dn = "dot", _s = ["typed", "addScalar", "multiplyScalar", "conj", "size"], Bs = X(Dn, _s, (r) => {
  var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
  return e(Dn, { "Array | DenseMatrix, Array | DenseMatrix": D, "SparseMatrix, SparseMatrix": c });
  function s(o, l) {
    var d = f(o), v = f(l), p, i;
    if (d.length === 1) p = d[0];
    else if (d.length === 2 && d[1] === 1) p = d[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + d.join(", ") + ")");
    if (v.length === 1) i = v[0];
    else if (v.length === 2 && v[1] === 1) i = v[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
    if (p !== i) throw new RangeError("Vectors must have equal length (" + p + " != " + i + ")");
    if (p === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return p;
  }
  function D(o, l) {
    var d = s(o, l), v = lr(o) ? o._data : o, p = lr(o) ? o._datatype || o.getDataType() : void 0, i = lr(l) ? l._data : l, h = lr(l) ? l._datatype || l.getDataType() : void 0, m = f(o).length === 2, b = f(l).length === 2, y = n, _ = u;
    if (p && h && p === h && typeof p == "string" && p !== "mixed") {
      var F = p;
      y = e.find(n, [F, F]), _ = e.find(u, [F, F]);
    }
    if (!m && !b) {
      for (var A = _(t(v[0]), i[0]), B = 1; B < d; B++) A = y(A, _(t(v[B]), i[B]));
      return A;
    }
    if (!m && b) {
      for (var E = _(t(v[0]), i[0][0]), g = 1; g < d; g++) E = y(E, _(t(v[g]), i[g][0]));
      return E;
    }
    if (m && !b) {
      for (var x = _(t(v[0][0]), i[0]), C = 1; C < d; C++) x = y(x, _(t(v[C][0]), i[C]));
      return x;
    }
    if (m && b) {
      for (var w = _(t(v[0][0]), i[0][0]), M = 1; M < d; M++) w = y(w, _(t(v[M][0]), i[M][0]));
      return w;
    }
  }
  function c(o, l) {
    s(o, l);
    for (var d = o._index, v = o._values, p = l._index, i = l._values, h = 0, m = n, b = u, y = 0, _ = 0; y < d.length && _ < p.length; ) {
      var F = d[y], A = p[_];
      if (F < A) {
        y++;
        continue;
      }
      if (F > A) {
        _++;
        continue;
      }
      F === A && (h = m(h, b(v[y], i[_])), y++, _++);
    }
    return h;
  }
  function f(o) {
    return lr(o) ? o.size() : a(o);
  }
}), pn = "qr", xs = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], Ss = X(pn, xs, (r) => {
  var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: s, sign: D, sqrt: c, conj: f, unaryMinus: o, addScalar: l, divideScalar: d, multiplyScalar: v, subtractScalar: p, complex: i } = r;
  return Ne(e(pn, { DenseMatrix: function(_) {
    return m(_);
  }, SparseMatrix: function(_) {
    return b();
  }, Array: function(_) {
    var F = n(_), A = m(F);
    return { Q: A.Q.valueOf(), R: A.R.valueOf() };
  } }), { _denseQRimpl: h });
  function h(y) {
    var _ = y._size[0], F = y._size[1], A = t([_], "dense"), B = A._data, E = y.clone(), g = E._data, x, C, w, M = u([_], "");
    for (w = 0; w < Math.min(F, _); ++w) {
      var S = g[w][w], T = o(s(S, 0) ? 1 : D(S)), N = f(T), I = 0;
      for (x = w; x < _; x++) I = l(I, v(g[x][w], f(g[x][w])));
      var z = v(T, c(I));
      if (!a(z)) {
        var O = p(S, z);
        for (M[w] = 1, x = w + 1; x < _; x++) M[x] = d(g[x][w], O);
        var P = o(f(d(O, z))), W = void 0;
        for (C = w; C < F; C++) {
          for (W = 0, x = w; x < _; x++) W = l(W, v(f(M[x]), g[x][C]));
          for (W = v(W, P), x = w; x < _; x++) g[x][C] = v(p(g[x][C], v(M[x], W)), N);
        }
        for (x = 0; x < _; x++) {
          for (W = 0, C = w; C < _; C++) W = l(W, v(B[x][C], M[C]));
          for (W = v(W, P), C = w; C < _; ++C) B[x][C] = d(p(B[x][C], v(W, f(M[C]))), N);
        }
      }
    }
    return { Q: A, R: E, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function m(y) {
    var _ = h(y), F = _.R._data;
    if (y._data.length > 0) for (var A = F[0][0].type === "Complex" ? i(0) : 0, B = 0; B < F.length; ++B) for (var E = 0; E < B && E < (F[0] || []).length; ++E) F[B][E] = A;
    return _;
  }
  function b(y) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
}), dn = "det", Ms = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], Ns = X(dn, Ms, (r) => {
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
        var d = l[0], v = l[1];
        if (d === v) return c(o.clone().valueOf(), d);
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
    for (var d = false, v = new Array(o).fill(0).map((B, E) => E), p = 0; p < o; p++) {
      var i = v[p];
      if (s(f[i][p])) {
        var h = void 0;
        for (h = p + 1; h < o; h++) if (!s(f[v[h]][p])) {
          i = v[h], v[h] = v[p], v[p] = i, d = !d;
          break;
        }
        if (h === o) return f[i][p];
      }
      for (var m = f[i][p], b = p === 0 ? 1 : f[v[p - 1]][p - 1], y = p + 1; y < o; y++) for (var _ = v[y], F = p + 1; F < o; F++) f[_][F] = a(u(t(f[_][F], m), t(f[_][p], f[i][F])), b);
    }
    var A = f[v[o - 1]][o - 1];
    return d ? D(A) : A;
  }
}), hn = "inv", Ts = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], zs = X(hn, Ts, (r) => {
  var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: s, det: D, identity: c, abs: f } = r;
  return e(hn, { "Array | Matrix": function(d) {
    var v = lr(d) ? d.size() : ir(d);
    switch (v.length) {
      case 1:
        if (v[0] === 1) return lr(d) ? n([u(1, d.valueOf()[0])]) : [u(1, d[0])];
        throw new RangeError("Matrix must be square (size: " + dr(v) + ")");
      case 2: {
        var p = v[0], i = v[1];
        if (p === i) return lr(d) ? n(o(d.valueOf(), p, i), d.storage()) : o(d, p, i);
        throw new RangeError("Matrix must be square (size: " + dr(v) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + dr(v) + ")");
    }
  }, any: function(d) {
    return u(1, d);
  } });
  function o(l, d, v) {
    var p, i, h, m, b;
    if (d === 1) {
      if (m = l[0][0], m === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(1, m)]];
    } else if (d === 2) {
      var y = D(l);
      if (y === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(l[1][1], y), u(s(l[0][1]), y)], [u(s(l[1][0]), y), u(l[0][0], y)]];
    } else {
      var _ = l.concat();
      for (p = 0; p < d; p++) _[p] = _[p].concat();
      for (var F = c(d).valueOf(), A = 0; A < v; A++) {
        var B = f(_[A][A]), E = A;
        for (p = A + 1; p < d; ) f(_[p][A]) > B && (B = f(_[p][A]), E = p), p++;
        if (B === 0) throw Error("Cannot calculate inverse, determinant is zero");
        p = E, p !== A && (b = _[A], _[A] = _[p], _[p] = b, b = F[A], F[A] = F[p], F[p] = b);
        var g = _[A], x = F[A];
        for (p = 0; p < d; p++) {
          var C = _[p], w = F[p];
          if (p !== A) {
            if (C[A] !== 0) {
              for (h = u(s(C[A]), g[A]), i = A; i < v; i++) C[i] = t(C[i], a(h, g[i]));
              for (i = 0; i < v; i++) w[i] = t(w[i], a(h, x[i]));
            }
          } else {
            for (h = g[A], i = A; i < v; i++) C[i] = u(C[i], h);
            for (i = 0; i < v; i++) w[i] = u(w[i], h);
          }
        }
      }
      return F;
    }
  }
});
function Os(r) {
  var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: s, sqrt: D, abs: c, bignumber: f, diag: o, size: l, reshape: d, inv: v, qr: p, usolve: i, usolveAll: h, equal: m, complex: b, larger: y, smaller: _, matrixFromColumns: F, dot: A } = r;
  function B($, q, V, Y) {
    var Z = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, R = E($, q, V, Y, Z);
    g($, q, V, Y, Z, R);
    var { values: J, C: L } = x($, q, V, Y, Z);
    if (Z) {
      var U = C($, q, L, R, J, V, Y);
      return { values: J, eigenvectors: U };
    }
    return { values: J };
  }
  function E($, q, V, Y, Z) {
    var R = Y === "BigNumber", J = Y === "Complex", L = R ? f(0) : 0, U = R ? f(1) : J ? b(1) : 1, K = R ? f(1) : 1, Q = R ? f(10) : 2, j = a(Q, Q), rr;
    Z && (rr = Array(q).fill(U));
    for (var tr = false; !tr; ) {
      tr = true;
      for (var nr = 0; nr < q; nr++) {
        for (var ur = L, fr = L, gr = 0; gr < q; gr++) nr !== gr && (ur = e(ur, c($[gr][nr])), fr = e(fr, c($[nr][gr])));
        if (!m(ur, 0) && !m(fr, 0)) {
          for (var cr = K, Dr = ur, xr = s(fr, Q), Sr = a(fr, Q); _(Dr, xr); ) Dr = a(Dr, j), cr = a(cr, Q);
          for (; y(Dr, Sr); ) Dr = s(Dr, j), cr = s(cr, Q);
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
  function g($, q, V, Y, Z, R) {
    var J = Y === "BigNumber", L = Y === "Complex", U = J ? f(0) : L ? b(0) : 0;
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
    var R = Y === "BigNumber", J = Y === "Complex", L = R ? f(1) : J ? b(1) : 1;
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
        var Sr = w(U[Q - 2][Q - 2], U[Q - 2][Q - 1], U[Q - 1][Q - 2], U[Q - 1][Q - 1]);
        K.push(...Sr), Z && (j.unshift(M(U[Q - 2][Q - 2], U[Q - 2][Q - 1], U[Q - 1][Q - 2], U[Q - 1][Q - 1], Sr[0], Sr[1], V, Y)), S(tr, q), rr = t(rr, tr), Q > 2 && (tr = o(Array(Q - 2).fill(L)))), Q -= 2, U.pop(), U.pop();
        for (var Cr = 0; Cr < Q; Cr++) U[Cr].pop(), U[Cr].pop();
      }
      if (Q === 0) break;
    }
    if (K.sort((pe, Rr) => +n(c(pe), c(Rr))), nr > 100) {
      var Qr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + K.join(", "));
      throw Qr.values = K, Qr.vectors = [], Qr;
    }
    var Tr = Z ? t(rr, T(j, q)) : void 0;
    return { values: K, C: Tr };
  }
  function C($, q, V, Y, Z, R, J) {
    var L = v(V), U = t(L, $, V), K = J === "BigNumber", Q = J === "Complex", j = K ? f(0) : Q ? b(0) : 0, rr = K ? f(1) : Q ? b(1) : 1, tr = [], nr = [];
    for (var ur of Z) {
      var fr = N(tr, ur, m);
      fr === -1 ? (tr.push(ur), nr.push(1)) : nr[fr] += 1;
    }
    for (var gr = [], cr = tr.length, Dr = Array(q).fill(j), xr = o(Array(q).fill(rr)), Sr = function() {
      var Tr = tr[Cr], pe = n(U, t(Tr, xr)), Rr = h(pe, Dr);
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
  function w($, q, V, Y) {
    var Z = e($, Y), R = n(a($, Y), a(q, V)), J = a(Z, 0.5), L = a(D(n(a(Z, Z), a(4, R))), 0.5);
    return [e(J, L), n(J, L)];
  }
  function M($, q, V, Y, Z, R, J, L) {
    var U = L === "BigNumber", K = L === "Complex", Q = U ? f(0) : K ? b(0) : 0, j = U ? f(1) : K ? b(1) : 1;
    if (_(c(V), J)) return [[j, Q], [Q, j]];
    if (y(c(n(Z, R)), J)) return [[n(Z, Y), n(R, Y)], [V, V]];
    var rr = n($, Z), tr = n(Y, Z);
    return _(c(q), J) && _(c(tr), J) ? [[rr, j], [V, Q]] : [[q, Q], [tr, j]];
  }
  function S($, q) {
    for (var V = 0; V < $.length; V++) $[V].push(...Array(q - $[V].length).fill(0));
    for (var Y = $.length; Y < q; Y++) $.push(Array(q).fill(0)), $[Y][Y] = 1;
    return $;
  }
  function T($, q) {
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
      J = z(q, V, Z);
      try {
        J = i($, J);
      } catch {
        continue;
      }
      if (y(P(J), R)) break;
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
  function z($, q, V) {
    var Y = V === "BigNumber", Z = V === "Complex", R = Array($).fill(0).map((J) => 2 * Math.random() - 1);
    return Y && (R = R.map((J) => f(J))), Z && (R = R.map((J) => b(J))), R = O(R, q), W(R, V);
  }
  function O($, q) {
    var V = l($);
    for (var Y of q) Y = d(Y, V), $ = n($, t(s(A(Y, $), A(Y, Y)), Y));
    return $;
  }
  function P($) {
    return c(D(A($, $)));
  }
  function W($, q) {
    var V = q === "BigNumber", Y = q === "Complex", Z = V ? f(1) : Y ? b(1) : 1;
    return t(s(Z, P($)), $);
  }
  return B;
}
function $s(r) {
  var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: s, sin: D, multiplyScalar: c, inv: f, bignumber: o, multiply: l, add: d } = r;
  function v(g, x) {
    var C = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, w = arguments.length > 3 ? arguments[3] : void 0, M = arguments.length > 4 ? arguments[4] : void 0;
    if (w === "number") return p(g, C, M);
    if (w === "BigNumber") return i(g, C, M);
    throw TypeError("Unsupported data type: " + w);
  }
  function p(g, x, C) {
    var w = g.length, M = Math.abs(x / w), S, T;
    if (C) {
      T = new Array(w);
      for (var N = 0; N < w; N++) T[N] = Array(w).fill(0), T[N][N] = 1;
    }
    for (var I = A(g); Math.abs(I[1]) >= Math.abs(M); ) {
      var z = I[0][0], O = I[0][1];
      S = h(g[z][z], g[O][O], g[z][O]), g = F(g, S, z, O), C && (T = b(T, S, z, O)), I = A(g);
    }
    for (var P = Array(w).fill(0), W = 0; W < w; W++) P[W] = g[W][W];
    return E(ar(P), T, C);
  }
  function i(g, x, C) {
    var w = g.length, M = t(x / w), S, T;
    if (C) {
      T = new Array(w);
      for (var N = 0; N < w; N++) T[N] = Array(w).fill(0), T[N][N] = 1;
    }
    for (var I = B(g); t(I[1]) >= t(M); ) {
      var z = I[0][0], O = I[0][1];
      S = m(g[z][z], g[O][O], g[z][O]), g = _(g, S, z, O), C && (T = y(T, S, z, O)), I = B(g);
    }
    for (var P = Array(w).fill(0), W = 0; W < w; W++) P[W] = g[W][W];
    return E(ar(P), T, C);
  }
  function h(g, x, C) {
    var w = x - g;
    return Math.abs(w) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * C / (x - g));
  }
  function m(g, x, C) {
    var w = u(x, g);
    return t(w) <= e.relTol ? o(-1).acos().div(4) : c(0.5, a(l(2, C, f(w))));
  }
  function b(g, x, C, w) {
    for (var M = g.length, S = Math.cos(x), T = Math.sin(x), N = Array(M).fill(0), I = Array(M).fill(0), z = 0; z < M; z++) N[z] = S * g[z][C] - T * g[z][w], I[z] = T * g[z][C] + S * g[z][w];
    for (var O = 0; O < M; O++) g[O][C] = N[O], g[O][w] = I[O];
    return g;
  }
  function y(g, x, C, w) {
    for (var M = g.length, S = s(x), T = D(x), N = Array(M).fill(o(0)), I = Array(M).fill(o(0)), z = 0; z < M; z++) N[z] = u(c(S, g[z][C]), c(T, g[z][w])), I[z] = n(c(T, g[z][C]), c(S, g[z][w]));
    for (var O = 0; O < M; O++) g[O][C] = N[O], g[O][w] = I[O];
    return g;
  }
  function _(g, x, C, w) {
    for (var M = g.length, S = o(s(x)), T = o(D(x)), N = c(S, S), I = c(T, T), z = Array(M).fill(o(0)), O = Array(M).fill(o(0)), P = l(o(2), S, T, g[C][w]), W = n(u(c(N, g[C][C]), P), c(I, g[w][w])), $ = d(c(I, g[C][C]), P, c(N, g[w][w])), q = 0; q < M; q++) z[q] = u(c(S, g[C][q]), c(T, g[w][q])), O[q] = n(c(T, g[C][q]), c(S, g[w][q]));
    g[C][C] = W, g[w][w] = $, g[C][w] = o(0), g[w][C] = o(0);
    for (var V = 0; V < M; V++) V !== C && V !== w && (g[C][V] = z[V], g[V][C] = z[V], g[w][V] = O[V], g[V][w] = O[V]);
    return g;
  }
  function F(g, x, C, w) {
    for (var M = g.length, S = Math.cos(x), T = Math.sin(x), N = S * S, I = T * T, z = Array(M).fill(0), O = Array(M).fill(0), P = N * g[C][C] - 2 * S * T * g[C][w] + I * g[w][w], W = I * g[C][C] + 2 * S * T * g[C][w] + N * g[w][w], $ = 0; $ < M; $++) z[$] = S * g[C][$] - T * g[w][$], O[$] = T * g[C][$] + S * g[w][$];
    g[C][C] = P, g[w][w] = W, g[C][w] = 0, g[w][C] = 0;
    for (var q = 0; q < M; q++) q !== C && q !== w && (g[C][q] = z[q], g[q][C] = z[q], g[w][q] = O[q], g[q][w] = O[q]);
    return g;
  }
  function A(g) {
    for (var x = g.length, C = 0, w = [0, 1], M = 0; M < x; M++) for (var S = M + 1; S < x; S++) Math.abs(C) < Math.abs(g[M][S]) && (C = Math.abs(g[M][S]), w = [M, S]);
    return [w, C];
  }
  function B(g) {
    for (var x = g.length, C = 0, w = [0, 1], M = 0; M < x; M++) for (var S = M + 1; S < x; S++) t(C) < t(g[M][S]) && (C = t(g[M][S]), w = [M, S]);
    return [w, C];
  }
  function E(g, x, C) {
    var w = g.length, M = Array(w), S;
    if (C) {
      S = Array(w);
      for (var T = 0; T < w; T++) S[T] = Array(w);
    }
    for (var N = 0; N < w; N++) {
      for (var I = 0, z = g[0], O = 0; O < g.length; O++) t(g[O]) < t(z) && (I = O, z = g[I]);
      if (M[N] = g.splice(I, 1)[0], C) for (var P = 0; P < w; P++) S[N][P] = x[P][I], x[P].splice(I, 1);
    }
    if (!C) return { values: M };
    var W = S.map(($, q) => ({ value: M[q], vector: $ }));
    return { values: M, eigenvectors: W };
  }
  return v;
}
var Is = "eigs", qs = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], Rs = X(Is, qs, (r) => {
  var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: s, abs: D, atan: c, cos: f, sin: o, multiplyScalar: l, divideScalar: d, inv: v, bignumber: p, multiply: i, add: h, larger: m, column: b, flatten: y, number: _, complex: F, sqrt: A, diag: B, size: E, reshape: g, qr: x, usolve: C, usolveAll: w, im: M, re: S, smaller: T, matrixFromColumns: N, dot: I } = r, z = $s({ config: e, addScalar: t, subtract: a, abs: D, atan: c, cos: f, sin: o, multiplyScalar: l, inv: v, bignumber: p, multiply: i, add: h }), O = Os({ addScalar: t, subtract: a, multiply: i, multiplyScalar: l, flatten: y, divideScalar: d, sqrt: A, abs: D, bignumber: p, diag: B, size: E, reshape: g, qr: x, inv: v, usolve: C, usolveAll: w, equal: s, complex: F, larger: m, smaller: T, matrixFromColumns: N, dot: I });
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
      return z(L, K, R, Q, J);
    }
    var j = Y(Z, L, K);
    return O(L, K, R, j, J);
  }
  function $(Z, R, J) {
    for (var L = 0; L < R; L++) for (var U = L; U < R; U++) if (m(p(D(a(Z[L][U], Z[U][L]))), J)) return false;
    return true;
  }
  function q(Z, R, J) {
    for (var L = 0; L < R; L++) for (var U = 0; U < R; U++) if (m(p(D(M(Z[L][U]))), J)) return false;
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
      for (var nr = 0; nr < J; nr++) for (var ur = 0; ur < J; ur++) R[nr][ur] = F(R[nr][ur]);
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
}), Us = "divide", Ps = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], Ls = X(Us, Ps, (r) => {
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
}), le = na({ config: br }), Ie = ia({}), it = Da({}), ot = ha({}), Br = Na({ Matrix: ot }), H = ku({ BigNumber: le, Complex: Ie, DenseMatrix: Br, Fraction: it }), st = vi({ typed: H }), ue = pi({ typed: H }), Vs = ms({ typed: H }), ft = ei({ Complex: Ie, typed: H }), qe = to({ typed: H }), Zs = ys({ typed: H }), qr = La({ config: br, typed: H }), Hn = mo({ typed: H }), Js = yo({ typed: H }), Qs = uo({ typed: H }), jn = za({ typed: H }), Ws = Ia({ config: br, typed: H }), kn = Ra({ equalScalar: qr, typed: H }), Gr = Zi({ typed: H }), lt = Ga({ typed: H }), Xs = io({ typed: H }), Ys = Xi({ BigNumber: le, Fraction: it, complex: ft, typed: H }), Gs = Fs({ typed: H }), Lr = Ja({ Matrix: ot, equalScalar: qr, typed: H }), ce = hi({ typed: H }), ve = ja({ BigNumber: le, typed: H }), sr = ii({ DenseMatrix: Br, Matrix: ot, SparseMatrix: Lr, typed: H }), Ks = xo({ isInteger: jn, matrix: sr, typed: H }), ct = Ki({ Complex: Ie, config: br, typed: H }), ru = To({ matrix: sr, typed: H }), Ke = Io({ BigNumber: le, config: br, matrix: sr, typed: H }), Kr = so({ isInteger: jn, matrix: sr, typed: H }), Hs = Oo({ conj: qe, transpose: ru, typed: H }), js = po({ DenseMatrix: Br, SparseMatrix: Lr, matrix: sr, typed: H }), eu = Go({ DenseMatrix: Br, SparseMatrix: Lr, concat: Kr, equalScalar: qr, matrix: sr, typed: H }), tu = ui({ Fraction: it, typed: H }), De = Fo({ BigNumber: le, DenseMatrix: Br, SparseMatrix: Lr, config: br, matrix: sr, typed: H }), nu = Co({ matrix: sr, multiplyScalar: Gr, typed: H }), ks = os({ DenseMatrix: Br, SparseMatrix: Lr, concat: Kr, config: br, matrix: sr, typed: H }), rf = Uo({ bignumber: ve, fraction: tu, number: lt }), vt = Mo({ matrix: sr, config: br, typed: H }), Re = jo({ DenseMatrix: Br, SparseMatrix: Lr, bignumber: ve, concat: Kr, config: br, matrix: sr, typed: H }), Ue = li({ typed: H }), Pe = Cs({ DenseMatrix: Br, SparseMatrix: Lr, addScalar: ue, concat: Kr, equalScalar: qr, matrix: sr, typed: H }), Hr = Lo({ numeric: rf, typed: H }), ef = cs({ DenseMatrix: Br, smaller: Re }), tf = ps({ ImmutableDenseMatrix: ef, getMatrixDataType: Js }), Dt = us({ DenseMatrix: Br, SparseMatrix: Lr, bignumber: ve, concat: Kr, config: br, matrix: sr, typed: H }), nf = si({ flatten: Hn, matrix: sr, size: vt, typed: H }), uf = Ss({ addScalar: ue, complex: ft, conj: qe, divideScalar: Hr, equal: eu, identity: De, isZero: kn, matrix: sr, multiplyScalar: Gr, sign: Ys, sqrt: ct, subtractScalar: ce, typed: H, unaryMinus: Ue, zeros: Ke }), af = es({ DenseMatrix: Br, SparseMatrix: Lr, concat: Kr, config: br, matrix: sr, typed: H }), Zr = ji({ DenseMatrix: Br, concat: Kr, equalScalar: qr, matrix: sr, subtractScalar: ce, typed: H, unaryMinus: Ue }), of = Qo({ DenseMatrix: Br, divideScalar: Hr, equalScalar: qr, matrix: sr, multiplyScalar: Gr, subtractScalar: ce, typed: H }), ae = Bs({ addScalar: ue, conj: qe, multiplyScalar: Gr, size: vt, typed: H }), Mr = Qi({ addScalar: ue, dot: ae, equalScalar: qr, matrix: sr, multiplyScalar: Gr, typed: H }), sf = _o({ bignumber: ve, matrix: sr, add: Pe, config: br, isPositive: Ws, larger: Dt, largerEq: ks, smaller: Re, smallerEq: af, typed: H }), ff = Xo({ DenseMatrix: Br, divideScalar: Hr, equalScalar: qr, matrix: sr, multiplyScalar: Gr, subtractScalar: ce, typed: H }), lf = lo({ Index: tf, matrix: sr, range: sf, typed: H }), ge = vo({ matrix: sr, multiply: Mr, subtract: Zr, typed: H }), cf = Ns({ divideScalar: Hr, isZero: kn, matrix: sr, multiply: Mr, subtractScalar: ce, typed: H, unaryMinus: Ue }), pt = zs({ abs: st, addScalar: ue, det: cf, divideScalar: Hr, identity: De, matrix: sr, multiply: Mr, typed: H, unaryMinus: Ue }), vf = Zo({ Complex: Ie, config: br, fraction: tu, identity: De, inv: pt, matrix: sr, multiply: Mr, number: lt, typed: H }), ye = Ls({ divideScalar: Hr, equalScalar: qr, inv: pt, matrix: sr, multiply: Mr, typed: H }), Df = Rs({ abs: st, add: Pe, addScalar: ue, atan: Vs, bignumber: ve, column: lf, complex: ft, config: br, cos: Zs, diag: js, divideScalar: Hr, dot: ae, equal: eu, flatten: Hn, im: Qs, inv: pt, larger: Dt, matrix: sr, matrixFromColumns: nf, multiply: Mr, multiplyScalar: Gr, number: lt, qr: uf, re: Xs, reshape: Ks, sin: Gs, size: vt, smaller: Re, sqrt: ct, subtract: Zr, typed: H, usolve: of, usolveAll: ff }), kr = bs({ abs: st, add: Pe, conj: qe, ctranspose: Hs, eigs: Df, equalScalar: qr, larger: Dt, matrix: sr, multiply: Mr, pow: vf, smaller: Re, sqrt: ct, typed: H });
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
  function l(d) {
    const v = d.reduce((i, h) => [i[0] + h[0], i[1] + h[1], i[2] + h[2]], [0, 0, 0]), p = d.length;
    return [v[0] / p, v[1] / p, v[2] / p];
  }
}
function mf(r, e, n) {
  if (r.length === 2) return gf(r, e, n);
  if (r.length === 3) return Af(r, e, n);
}
function gf(r, e, n) {
  var _a2, _b, _c, _d, _e2, _f;
  const u = ((_a2 = e == null ? void 0 : e.momentsOfInertiaZ) == null ? void 0 : _a2.get(n)) ?? 0, t = ((_b = e == null ? void 0 : e.momentsOfInertiaY) == null ? void 0 : _b.get(n)) ?? 0, a = ((_c = e == null ? void 0 : e.elasticities) == null ? void 0 : _c.get(n)) ?? 0, s = ((_d = e == null ? void 0 : e.areas) == null ? void 0 : _d.get(n)) ?? 0, D = ((_e2 = e == null ? void 0 : e.shearModuli) == null ? void 0 : _e2.get(n)) ?? 0, c = ((_f = e == null ? void 0 : e.torsionalConstants) == null ? void 0 : _f.get(n)) ?? 0, f = kr(Zr(r[0], r[1])), o = a * s / f, l = a * u / f ** 3, d = a * t / f ** 3, v = D * c / f;
  return [[o, 0, 0, 0, 0, 0, -o, 0, 0, 0, 0, 0], [0, 12 * l, 0, 0, 0, 6 * f * l, 0, -12 * l, 0, 0, 0, 6 * f * l], [0, 0, 12 * d, 0, -6 * f * d, 0, 0, 0, -12 * d, 0, -6 * f * d, 0], [0, 0, 0, v, 0, 0, 0, 0, 0, -v, 0, 0], [0, 0, -6 * f * d, 0, 4 * d * f ** 2, 0, 0, 0, 6 * f * d, 0, 2 * d * f ** 2, 0], [0, 6 * f * l, 0, 0, 0, 4 * l * f ** 2, 0, -6 * f * l, 0, 0, 0, 2 * l * f ** 2], [-o, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0], [0, -12 * l, 0, 0, 0, -6 * l * f, 0, 12 * l, 0, 0, 0, -6 * l * f], [0, 0, -12 * d, 0, 6 * f * d, 0, 0, 0, 12 * d, 0, 6 * f * d, 0], [0, 0, 0, -v, 0, 0, 0, 0, 0, v, 0, 0], [0, 0, -6 * f * d, 0, 2 * d * f ** 2, 0, 0, 0, 6 * f * d, 0, 4 * d * f ** 2, 0], [0, 6 * f * l, 0, 0, 0, 2 * l * f ** 2, 0, -6 * f * l, 0, 0, 0, 4 * l * f ** 2]];
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
  t ? c = yf(u, t, s, a, D) : c = g(u, a, D);
  const [f, o] = [r[0][0], r[0][1]], [l, d] = [r[1][0], r[1][1]], [v, p] = [r[2][0], r[2][1]], i = f * (d - p) + l * (p - o) + v * (o - d), h = 0.5 * Math.abs(i), m = [[0.5, 0, 1 / 3], [0, 0.5, 1 / 3], [0.5, 0.5, 1 / 3]];
  let b = Ke(9, 9);
  for (const [C, w, M] of m) {
    const S = E(C, w, f, o, l, d, v, p), T = ru(S), N = 2 * h * M, I = Mr(T, c), z = Mr(I, S), O = Mr(N, z);
    b = Pe(b, O);
  }
  return x(b.toArray());
  function y(C, w, M, S, T, N) {
    const I = C - M, z = w - S, O = M - T, P = S - N, W = T - C, $ = N - w, q = I * I + z * z, V = O * O + P * P, Y = W * W + $ * $, Z = -6 * O / V, R = -6 * W / Y, J = -6 * I / q, L = 3 * O * P / V, U = 3 * W * $ / Y, K = 3 * I * z / q, Q = 3 * (P * P) / V, j = 3 * ($ * $) / Y, rr = 3 * (z * z) / q, tr = -6 * P / V, nr = -6 * $ / Y, ur = -6 * z / q;
    return { x12: I, y12: z, x23: O, y23: P, x31: W, y31: $, l12: q, l23: V, l31: Y, P4: Z, P5: R, P6: J, q4: L, q5: U, q6: K, r4: Q, r5: j, r6: rr, t4: tr, t5: nr, t6: ur };
  }
  function _(C, w, M) {
    const { P5: S, P6: T, q5: N, q6: I, r5: z, r6: O } = M;
    return [T * (1 - 2 * C) + (S - T) * w, I * (1 - 2 * C) - (N + I) * w, -4 + 6 * (C + w) + O * (1 - 2 * C) - w * (z + O), -T * (1 - 2 * C) + w * (M.P4 + T), I * (1 - 2 * C) - w * (I - M.q4), -2 + 6 * C + O * (1 - 2 * C) + w * (M.r4 - O), -w * (S + M.P4), w * (M.q4 - N), -w * (z - M.r4)];
  }
  function F(C, w, M) {
    const { t5: S, t6: T, r5: N, r6: I, q5: z, q6: O } = M;
    return [T * (1 - 2 * C) + w * (S - T), 1 + I * (1 - 2 * C) - w * (N + I), -O * (1 - 2 * C) + w * (z + O), -T * (1 - 2 * C) + w * (M.t4 + T), -1 + I * (1 - 2 * C) + w * (M.r4 - I), -O * (1 - 2 * C) - w * (M.q4 - O), -w * (M.t4 + S), w * (M.r4 - N), -w * (M.q4 - z)];
  }
  function A(C, w, M) {
    const { P4: S, P5: T, P6: N, q4: I, q5: z, q6: O, r4: P, r5: W, r6: $ } = M;
    return [-T * (1 - 2 * w) - C * (N - T), z * (1 - 2 * w) - C * (z + O), -4 + 6 * (C + w) + W * (1 - 2 * w) - C * (W + $), C * (S + N), C * (I - O), -C * ($ - P), T * (1 - 2 * w) - C * (S + T), z * (1 - 2 * w) + C * (I - z), -2 + 6 * w + W * (1 - 2 * w) + C * (P - W)];
  }
  function B(C, w, M) {
    const { t4: S, t5: T, t6: N, r4: I, r5: z, r6: O, q4: P, q5: W, q6: $ } = M;
    return [-T * (1 - 2 * w) - C * (N - T), 1 + z * (1 - 2 * w) - C * (z + O), -W * (1 - 2 * w) + C * (W + $), C * (S + N), C * (I - O), -C * (P - $), T * (1 - 2 * w) - C * (S + T), -1 + z * (1 - 2 * w) + C * (I - z), -W * (1 - 2 * w) - C * (P - W)];
  }
  function E(C, w, M, S, T, N, I, z) {
    const O = M * (N - z) + T * (z - S) + I * (S - N), P = y(M, S, T, N, I, z), W = _(C, w, P), $ = A(C, w, P), q = F(C, w, P), V = B(C, w, P), { x31: Y, y31: Z, x12: R, y12: J } = P;
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
  function g(C, w, M) {
    const S = C * M ** 3 / (12 * (1 - w * w)), T = [[1, w, 0], [w, 1, 0], [0, 0, (1 - w) / 2]].map((N) => N.map((I) => I * S));
    return sr(T);
  }
  function x(C) {
    const w = Array(18).fill(0).map(() => Array(18).fill(0)), M = [2, 3, 4, 8, 9, 10, 14, 15, 16];
    for (let S = 0; S < 9; S++) for (let T = 0; T < 9; T++) w[M[S]][M[T]] = C[S][T];
    return w;
  }
}
function Ef(r, e, n, u) {
  const t = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map(), bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map() };
  return e.forEach((a, s) => {
    const D = a.map((v) => r[v]), c = a.reduce((v, p) => v.concat(u.deformations.get(p)), []), f = pf(D), o = Mr(f, c), l = mf(D, n, s);
    let d = Mr(l, o);
    a.length === 2 ? (t.normals.set(s, [d[0], d[6]]), t.shearsY.set(s, [d[1], d[7]]), t.shearsZ.set(s, [d[2], d[8]]), t.torsions.set(s, [d[3], d[9]]), t.bendingsY.set(s, [d[4], d[10]]), t.bendingsZ.set(s, [d[5], d[11]])) : (t.bendingXY.set(s, [d[2], d[8], d[14]]), t.bendingXX.set(s, [d[3], d[9], d[15]]), t.bendingXX.set(s, [d[4], d[10], d[16]]));
  }), t;
}
export {
  Ef as a
};
