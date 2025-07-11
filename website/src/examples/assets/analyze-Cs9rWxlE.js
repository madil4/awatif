import { _ as Se, t as ge, D as Dt, C as xr } from "./complex-i8qiIvCl.js";
var dn = { relTol: 1e-12, absTol: 1e-15, matrix: "Matrix", number: "number", numberFallback: "number", precision: 64, predictable: false, randomSeed: null };
function eu(r, e) {
  if (ye(r, e)) return r[e];
  throw typeof r[e] == "function" && nu(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function tu(r, e, n) {
  if (ye(r, e)) return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function ye(r, e) {
  return !uu(r) && !Array.isArray(r) ? false : ie(au, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function nu(r, e) {
  return r == null || typeof r[e] != "function" || ie(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : ie(iu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function uu(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var au = { length: true, name: true }, iu = { toString: true, valueOf: true, toLocaleString: true };
class ou {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
  }
  get(e) {
    return eu(this.wrappedObject, e);
  }
  set(e, n) {
    return tu(this.wrappedObject, e, n), this;
  }
  has(e) {
    return ye(this.wrappedObject, e) && e in this.wrappedObject;
  }
  entries() {
    return su(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var n of this.keys()) e(this.get(n), n, this);
  }
  delete(e) {
    ye(this.wrappedObject, e) && delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys()) this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
function su(r, e) {
  return { next: () => {
    var n = r.next();
    return n.done ? n : { value: e(n.value), done: false };
  } };
}
function dr(r) {
  return typeof r == "number";
}
function Cr(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function fu(r) {
  return typeof r == "bigint";
}
function Xe(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function He(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function hn(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function qr(r) {
  return typeof r == "string";
}
var Ar = Array.isArray;
function pr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function Ae(r) {
  return Array.isArray(r) || pr(r);
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
function ke(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function cu(r) {
  return typeof r == "boolean";
}
function lu(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function vu(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function Du(r) {
  return typeof r == "function";
}
function pu(r) {
  return r instanceof Date;
}
function du(r) {
  return r instanceof RegExp;
}
function je(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !Xe(r) && !He(r));
}
function hu(r) {
  return r ? r instanceof Map || r instanceof ou || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
function mu(r) {
  return r === null;
}
function gu(r) {
  return r === void 0;
}
function yu(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function Au(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function Fu(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Eu(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Cu(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function wu(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function bu(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function _u(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function Bu(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function xu(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function Su(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function Mu(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function Nu(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function Tu(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function zu(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function Ou(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function $u(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function Rr(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : Cr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function sr(r) {
  var e = typeof r;
  if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
  if (typeof r.clone == "function") return r.clone();
  if (Array.isArray(r)) return r.map(function(n) {
    return sr(n);
  });
  if (r instanceof Date) return new Date(r.valueOf());
  if (Cr(r)) return r;
  if (je(r)) return Iu(r, sr);
  if (e === "function") return r;
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function Iu(r, e) {
  var n = {};
  for (var u in r) ie(r, u) && (n[u] = e(r[u]));
  return n;
}
function qu(r, e) {
  for (var n in e) ie(e, n) && (r[n] = e[n]);
  return r;
}
function Qr(r, e) {
  var n, u, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length) return false;
    for (u = 0, t = r.length; u < t; u++) if (!Qr(r[u], e[u])) return false;
    return true;
  } else {
    if (typeof r == "function") return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object)) return false;
      for (n in r) if (!(n in e) || !Qr(r[n], e[n])) return false;
      for (n in e) if (!(n in r)) return false;
      return true;
    } else return r === e;
  }
}
function ie(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function Ru(r, e) {
  for (var n = {}, u = 0; u < e.length; u++) {
    var t = e[u], a = r[t];
    a !== void 0 && (n[t] = a);
  }
  return n;
}
var Uu = ["Matrix", "Array"], Pu = ["number", "BigNumber", "Fraction"], Nr = function(e) {
  if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(dn);
};
Se(Nr, dn, { MATRIX_OPTIONS: Uu, NUMBER_OPTIONS: Pu });
function W(r, e, n, u) {
  function t(a) {
    var s = Ru(a, e.map(Zu));
    return Lu(r, e, a), n(s);
  }
  return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), u && (t.meta = u), t;
}
function Lu(r, e, n) {
  var u = e.filter((a) => !Vu(a)).every((a) => n[a] !== void 0);
  if (!u) {
    var t = e.filter((a) => n[a] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Vu(r) {
  return r && r[0] === "?";
}
function Zu(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function hr(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var Ju = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function Le(r, e, n) {
  var u = { 2: "0b", 8: "0o", 16: "0x" }, t = u[e], a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!hr(n)) throw new Error("size must be an integer");
    if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!hr(r)) throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** n), a = "i".concat(n);
  }
  var s = "";
  return r < 0 && (r = -r, s = "-"), "".concat(s).concat(t).concat(r.toString(e)).concat(a);
}
function Ze(r, e) {
  if (typeof e == "function") return e(r);
  if (r === 1 / 0) return "Infinity";
  if (r === -1 / 0) return "-Infinity";
  if (isNaN(r)) return "NaN";
  var { notation: n, precision: u, wordSize: t } = An(e);
  switch (n) {
    case "fixed":
      return Wu(r, u);
    case "exponential":
      return Fn(r, u);
    case "engineering":
      return Qu(r, u);
    case "bin":
      return Le(r, 2, t);
    case "oct":
      return Le(r, 8, t);
    case "hex":
      return Le(r, 16, t);
    case "auto":
      return Yu(r, u, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], s = arguments[4];
        return a !== "." ? a + s : s;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function An(r) {
  var e = "auto", n, u;
  if (r !== void 0) if (dr(r)) n = r;
  else if (Cr(r)) n = r.toNumber();
  else if (je(r)) r.precision !== void 0 && (n = pt(r.precision, () => {
    throw new Error('Option "precision" must be a number or BigNumber');
  })), r.wordSize !== void 0 && (u = pt(r.wordSize, () => {
    throw new Error('Option "wordSize" must be a number or BigNumber');
  })), r.notation && (e = r.notation);
  else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: n, wordSize: u };
}
function Me(r) {
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
function Qu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Me(r), u = Ne(n, e), t = u.exponent, a = u.coefficients, s = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if (dr(e)) for (; e > a.length || t - s + 1 > a.length; ) a.push(0);
  else for (var D = Math.abs(t - s) - (a.length - 1), f = 0; f < D; f++) a.push(0);
  for (var c = Math.abs(t - s), o = 1; c > 0; ) o++, c--;
  var l = a.slice(o).join(""), m = dr(e) && l.length || l.match(/[1-9]/) ? "." + l : "", v = a.slice(0, o).join("") + m + "e" + (t >= 0 ? "+" : "") + s.toString();
  return u.sign + v;
}
function Wu(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Me(r), u = typeof e == "number" ? Ne(n, n.exponent + 1 + e) : n, t = u.coefficients, a = u.exponent + 1, s = a + (e || 0);
  return t.length < s && (t = t.concat(kr(s - t.length))), a < 0 && (t = kr(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), u.sign + t.join("");
}
function Fn(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = Me(r), u = e ? Ne(n, e) : n, t = u.coefficients, a = u.exponent;
  t.length < e && (t = t.concat(kr(e - t.length)));
  var s = t.shift();
  return u.sign + s + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function Yu(r, e, n) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var u = dt(n == null ? void 0 : n.lowerExp, -3), t = dt(n == null ? void 0 : n.upperExp, 5), a = Me(r), s = e ? Ne(a, e) : a;
  if (s.exponent < u || s.exponent >= t) return Fn(r, e);
  var D = s.coefficients, f = s.exponent;
  D.length < e && (D = D.concat(kr(e - D.length))), D = D.concat(kr(f - D.length + 1 + (D.length < e ? e - D.length : 0))), D = kr(-f).concat(D);
  var c = f > 0 ? f : 0;
  return c < D.length - 1 && D.splice(c + 1, 0, "."), s.sign + D.join("");
}
function Ne(r, e) {
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
function kr(r) {
  for (var e = [], n = 0; n < r; n++) e.push(0);
  return e;
}
function Gu(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function Lr(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), u);
}
function pt(r, e) {
  if (dr(r)) return r;
  if (Cr(r)) return r.toNumber();
  e();
}
function dt(r, e) {
  return dr(r) ? r : Cr(r) ? r.toNumber() : e;
}
var En = function() {
  return En = ge.create, ge;
}, Ku = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], Xu = W("typed", Ku, function(e) {
  var { BigNumber: n, Complex: u, DenseMatrix: t, Fraction: a } = e, s = En();
  return s.clear(), s.addTypes([{ name: "number", test: dr }, { name: "Complex", test: Xe }, { name: "BigNumber", test: Cr }, { name: "bigint", test: fu }, { name: "Fraction", test: He }, { name: "Unit", test: hn }, { name: "identifier", test: (D) => qr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D) }, { name: "string", test: qr }, { name: "Chain", test: $u }, { name: "Array", test: Ar }, { name: "Matrix", test: pr }, { name: "DenseMatrix", test: mn }, { name: "SparseMatrix", test: gn }, { name: "Range", test: yn }, { name: "Index", test: ke }, { name: "boolean", test: cu }, { name: "ResultSet", test: lu }, { name: "Help", test: vu }, { name: "function", test: Du }, { name: "Date", test: pu }, { name: "RegExp", test: du }, { name: "null", test: mu }, { name: "undefined", test: gu }, { name: "AccessorNode", test: yu }, { name: "ArrayNode", test: Au }, { name: "AssignmentNode", test: Fu }, { name: "BlockNode", test: Eu }, { name: "ConditionalNode", test: Cu }, { name: "ConstantNode", test: wu }, { name: "FunctionNode", test: _u }, { name: "FunctionAssignmentNode", test: bu }, { name: "IndexNode", test: Bu }, { name: "Node", test: xu }, { name: "ObjectNode", test: Su }, { name: "OperatorNode", test: Mu }, { name: "ParenthesisNode", test: Nu }, { name: "RangeNode", test: Tu }, { name: "RelationalNode", test: zu }, { name: "SymbolNode", test: Ou }, { name: "Map", test: hu }, { name: "Object", test: je }]), s.addConversions([{ from: "number", to: "BigNumber", convert: function(f) {
    if (n || de(f), Gu(f) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + f + "). Use function bignumber(x) to convert to BigNumber.");
    return new n(f);
  } }, { from: "number", to: "Complex", convert: function(f) {
    return u || he(f), new u(f, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(f) {
    return u || he(f), new u(f.toNumber(), 0);
  } }, { from: "bigint", to: "number", convert: function(f) {
    if (f > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + f + ")");
    return Number(f);
  } }, { from: "bigint", to: "BigNumber", convert: function(f) {
    return n || de(f), new n(f.toString());
  } }, { from: "bigint", to: "Fraction", convert: function(f) {
    return a || me(f), new a(f);
  } }, { from: "Fraction", to: "BigNumber", convert: function(f) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(f) {
    return u || he(f), new u(f.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(f) {
    a || me(f);
    var c = new a(f);
    if (c.valueOf() !== f) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + f + "). Use function fraction(x) to convert to Fraction.");
    return c;
  } }, { from: "string", to: "number", convert: function(f) {
    var c = Number(f);
    if (isNaN(c)) throw new Error('Cannot convert "' + f + '" to a number');
    return c;
  } }, { from: "string", to: "BigNumber", convert: function(f) {
    n || de(f);
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
    a || me(f);
    try {
      return new a(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(f) {
    u || he(f);
    try {
      return new u(f);
    } catch {
      throw new Error('Cannot convert "' + f + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(f) {
    return +f;
  } }, { from: "boolean", to: "BigNumber", convert: function(f) {
    return n || de(f), new n(+f);
  } }, { from: "boolean", to: "bigint", convert: function(f) {
    return BigInt(+f);
  } }, { from: "boolean", to: "Fraction", convert: function(f) {
    return a || me(f), new a(+f);
  } }, { from: "boolean", to: "string", convert: function(f) {
    return String(f);
  } }, { from: "Array", to: "Matrix", convert: function(f) {
    return t || Hu(), new t(f);
  } }, { from: "Matrix", to: "Array", convert: function(f) {
    return f.valueOf();
  } }]), s.onMismatch = (D, f, c) => {
    var o = s.createError(D, f, c);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && Ae(f[0]) && c.some((m) => !m.params.includes(","))) {
      var l = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw l.data = o.data, l;
    }
    throw o;
  }, s.onMismatch = (D, f, c) => {
    var o = s.createError(D, f, c);
    if (["wrongType", "mismatch"].includes(o.data.category) && f.length === 1 && Ae(f[0]) && c.some((m) => !m.params.includes(","))) {
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
function Hu() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function me(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var ku = "BigNumber", ju = ["?on", "config"], ra = W(ku, ju, (r) => {
  var { on: e, config: n } = r, u = Dt.clone({ precision: n.precision, modulo: Dt.EUCLID });
  return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, u.fromJSON = function(t) {
    return new u(t.value);
  }, e && e("config", function(t, a) {
    t.precision !== a.precision && u.config({ precision: t.precision });
  }), u;
}, { isClass: true }), ea = "Complex", ta = [], na = W(ea, ta, () => (Object.defineProperty(xr, "name", { value: "Complex" }), xr.prototype.constructor = xr, xr.prototype.type = "Complex", xr.prototype.isComplex = true, xr.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, xr.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, xr.prototype.format = function(r) {
  var e = "", n = this.im, u = this.re, t = Ze(this.re, r), a = Ze(this.im, r), s = dr(r) ? r : r ? r.precision : null;
  if (s !== null) {
    var D = Math.pow(10, -s);
    Math.abs(u / n) < D && (u = 0), Math.abs(n / u) < D && (n = 0);
  }
  return n === 0 ? e = t : u === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = a + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + a.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + a + "i", e;
}, xr.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object") return xr(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], u = arguments[1];
      if (dr(n)) {
        if (hn(u) && u.hasBase("ANGLE") && (u = u.toNumber("rad")), dr(u)) return new xr({ r: n, phi: u });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, xr.prototype.valueOf = xr.prototype.toString, xr.fromJSON = function(r) {
  return new xr(r);
}, xr.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, xr), { isClass: true });
typeof BigInt > "u" && (BigInt = function(r) {
  if (isNaN(r)) throw new Error("");
  return r;
});
const H = BigInt(0), nr = BigInt(1), oe = BigInt(2), Je = BigInt(5), Tr = BigInt(10), ua = 2e3, K = { s: nr, n: H, d: nr };
function Pr(r, e) {
  try {
    r = BigInt(r);
  } catch {
    throw Jr();
  }
  return r * e;
}
function Ir(r) {
  return typeof r == "bigint" ? r : Math.floor(r);
}
function yr(r, e) {
  if (e === H) throw rt();
  const n = Object.create($r.prototype);
  n.s = r < H ? -nr : nr, r = r < H ? -r : r;
  const u = Wr(r, e);
  return n.n = r / u, n.d = e / u, n;
}
function Hr(r) {
  const e = {};
  let n = r, u = oe, t = Je - nr;
  for (; t <= n; ) {
    for (; n % u === H; ) n /= u, e[u] = (e[u] || H) + nr;
    t += nr + oe * u++;
  }
  return n !== r ? n > 1 && (e[n] = (e[n] || H) + nr) : e[r] = (e[r] || H) + nr, e;
}
const Br = function(r, e) {
  let n = H, u = nr, t = nr;
  if (r != null) if (e !== void 0) {
    if (typeof r == "bigint") n = r;
    else {
      if (isNaN(r)) throw Jr();
      if (r % 1 !== 0) throw ht();
      n = BigInt(r);
    }
    if (typeof e == "bigint") u = e;
    else {
      if (isNaN(e)) throw Jr();
      if (e % 1 !== 0) throw ht();
      u = BigInt(e);
    }
    t = n * u;
  } else if (typeof r == "object") {
    if ("d" in r && "n" in r) n = BigInt(r.n), u = BigInt(r.d), "s" in r && (n *= BigInt(r.s));
    else if (0 in r) n = BigInt(r[0]), 1 in r && (u = BigInt(r[1]));
    else if (typeof r == "bigint") n = r;
    else throw Jr();
    t = n * u;
  } else if (typeof r == "number") {
    if (isNaN(r)) throw Jr();
    if (r < 0 && (t = -nr, r = -r), r % 1 === 0) n = BigInt(r);
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
    let a = 0, s = H, D = H, f = H, c = nr, o = nr, l = r.replace(/_/g, "").match(/\d+|./g);
    if (l === null) throw Jr();
    if (l[a] === "-" ? (t = -nr, a++) : l[a] === "+" && a++, l.length === a + 1 ? D = Pr(l[a++], t) : l[a + 1] === "." || l[a] === "." ? (l[a] !== "." && (s = Pr(l[a++], t)), a++, (a + 1 === l.length || l[a + 1] === "(" && l[a + 3] === ")" || l[a + 1] === "'" && l[a + 3] === "'") && (D = Pr(l[a], t), c = Tr ** BigInt(l[a].length), a++), (l[a] === "(" && l[a + 2] === ")" || l[a] === "'" && l[a + 2] === "'") && (f = Pr(l[a + 1], t), o = Tr ** BigInt(l[a + 1].length) - nr, a += 3)) : l[a + 1] === "/" || l[a + 1] === ":" ? (D = Pr(l[a], t), c = Pr(l[a + 2], nr), a += 3) : l[a + 3] === "/" && l[a + 1] === " " && (s = Pr(l[a], t), D = Pr(l[a + 2], t), c = Pr(l[a + 4], nr), a += 5), l.length <= a) u = c * o, t = n = f + u * s + o * D;
    else throw Jr();
  } else if (typeof r == "bigint") n = r, t = r, u = nr;
  else throw Jr();
  if (u === H) throw rt();
  K.s = t < H ? -nr : nr, K.n = n < H ? -n : n, K.d = u < H ? -u : u;
};
function aa(r, e, n) {
  let u = nr;
  for (; e > H; r = r * r % n, e >>= nr) e & nr && (u = u * r % n);
  return u;
}
function ia(r, e) {
  for (; e % oe === H; e /= oe) ;
  for (; e % Je === H; e /= Je) ;
  if (e === nr) return H;
  let n = Tr % e, u = 1;
  for (; n !== nr; u++) if (n = n * Tr % e, u > ua) return H;
  return BigInt(u);
}
function oa(r, e, n) {
  let u = nr, t = aa(Tr, n, e);
  for (let a = 0; a < 300; a++) {
    if (u === t) return BigInt(a);
    u = u * Tr % e, t = t * Tr % e;
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
function $r(r, e) {
  if (Br(r, e), this instanceof $r) r = Wr(K.d, K.n), this.s = K.s, this.n = K.n / r, this.d = K.d / r;
  else return yr(K.s * K.n, K.d);
}
var rt = function() {
  return new Error("Division by Zero");
}, Jr = function() {
  return new Error("Invalid argument");
}, ht = function() {
  return new Error("Parameters must be integer");
};
$r.prototype = { s: nr, n: H, d: nr, abs: function() {
  return yr(this.n, this.d);
}, neg: function() {
  return yr(-this.s * this.n, this.d);
}, add: function(r, e) {
  return Br(r, e), yr(this.s * this.n * K.d + K.s * this.d * K.n, this.d * K.d);
}, sub: function(r, e) {
  return Br(r, e), yr(this.s * this.n * K.d - K.s * this.d * K.n, this.d * K.d);
}, mul: function(r, e) {
  return Br(r, e), yr(this.s * K.s * this.n * K.n, this.d * K.d);
}, div: function(r, e) {
  return Br(r, e), yr(this.s * K.s * this.n * K.d, this.d * K.n);
}, clone: function() {
  return yr(this.s * this.n, this.d);
}, mod: function(r, e) {
  if (r === void 0) return yr(this.s * this.n % this.d, nr);
  if (Br(r, e), H === K.n * this.d) throw rt();
  return yr(this.s * (K.d * this.n) % (K.n * this.d), K.d * this.d);
}, gcd: function(r, e) {
  return Br(r, e), yr(Wr(K.n, this.n) * Wr(K.d, this.d), K.d * this.d);
}, lcm: function(r, e) {
  return Br(r, e), K.n === H && this.n === H ? yr(H, nr) : yr(K.n * this.n, Wr(K.n, this.n) * Wr(K.d, this.d));
}, inverse: function() {
  return yr(this.s * this.d, this.n);
}, pow: function(r, e) {
  if (Br(r, e), K.d === nr) return K.s < H ? yr((this.s * this.d) ** K.n, this.n ** K.n) : yr((this.s * this.n) ** K.n, this.d ** K.n);
  if (this.s < H) return null;
  let n = Hr(this.n), u = Hr(this.d), t = nr, a = nr;
  for (let s in n) if (s !== "1") {
    if (s === "0") {
      t = H;
      break;
    }
    if (n[s] *= K.n, n[s] % K.d === H) n[s] /= K.d;
    else return null;
    t *= BigInt(s) ** n[s];
  }
  for (let s in u) if (s !== "1") {
    if (u[s] *= K.n, u[s] % K.d === H) u[s] /= K.d;
    else return null;
    a *= BigInt(s) ** u[s];
  }
  return K.s < H ? yr(a, t) : yr(t, a);
}, log: function(r, e) {
  if (Br(r, e), this.s <= H || K.s <= H) return null;
  const n = {}, u = Hr(K.n), t = Hr(K.d), a = Hr(this.n), s = Hr(this.d);
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
    const p = Wr(m, v);
    if (m /= p, v /= p, D === null && f === null) D = m, f = v;
    else if (m * f !== D * v) return null;
  }
  return D !== null && f !== null ? yr(D, f) : null;
}, equals: function(r, e) {
  return Br(r, e), this.s * this.n * K.d === K.s * K.n * this.d;
}, lt: function(r, e) {
  return Br(r, e), this.s * this.n * K.d < K.s * K.n * this.d;
}, lte: function(r, e) {
  return Br(r, e), this.s * this.n * K.d <= K.s * K.n * this.d;
}, gt: function(r, e) {
  return Br(r, e), this.s * this.n * K.d > K.s * K.n * this.d;
}, gte: function(r, e) {
  return Br(r, e), this.s * this.n * K.d >= K.s * K.n * this.d;
}, compare: function(r, e) {
  Br(r, e);
  let n = this.s * this.n * K.d - K.s * K.n * this.d;
  return (H < n) - (n < H);
}, ceil: function(r) {
  return r = Tr ** BigInt(r || 0), yr(Ir(this.s * r * this.n / this.d) + (r * this.n % this.d > H && this.s >= H ? nr : H), r);
}, floor: function(r) {
  return r = Tr ** BigInt(r || 0), yr(Ir(this.s * r * this.n / this.d) - (r * this.n % this.d > H && this.s < H ? nr : H), r);
}, round: function(r) {
  return r = Tr ** BigInt(r || 0), yr(Ir(this.s * r * this.n / this.d) + this.s * ((this.s >= H ? nr : H) + oe * (r * this.n % this.d) > this.d ? nr : H), r);
}, roundTo: function(r, e) {
  Br(r, e);
  const n = this.n * K.d, u = this.d * K.n, t = n % u;
  let a = Ir(n / u);
  return t + t >= u && a++, yr(this.s * a * K.n, K.d);
}, divisible: function(r, e) {
  return Br(r, e), !(!(K.n * this.d) || this.n * K.d % (K.n * this.d));
}, valueOf: function() {
  return Number(this.s * this.n) / Number(this.d);
}, toString: function(r) {
  let e = this.n, n = this.d;
  r = r || 15;
  let u = ia(e, n), t = oa(e, n, u), a = this.s < H ? "-" : "";
  if (a += Ir(e / n), e %= n, e *= Tr, e && (a += "."), u) {
    for (let s = t; s--; ) a += Ir(e / n), e %= n, e *= Tr;
    a += "(";
    for (let s = u; s--; ) a += Ir(e / n), e %= n, e *= Tr;
    a += ")";
  } else for (let s = r; e && s--; ) a += Ir(e / n), e %= n, e *= Tr;
  return a;
}, toFraction: function(r) {
  let e = this.n, n = this.d, u = this.s < H ? "-" : "";
  if (n === nr) u += e;
  else {
    let t = Ir(e / n);
    r && t > H && (u += t, u += " ", e %= n), u += e, u += "/", u += n;
  }
  return u;
}, toLatex: function(r) {
  let e = this.n, n = this.d, u = this.s < H ? "-" : "";
  if (n === nr) u += e;
  else {
    let t = Ir(e / n);
    r && t > H && (u += t, e %= n), u += "\\frac{", u += e, u += "}{", u += n, u += "}";
  }
  return u;
}, toContinued: function() {
  let r = this.n, e = this.d, n = [];
  do {
    n.push(Ir(r / e));
    let u = r % e;
    r = e, e = u;
  } while (r !== nr);
  return n;
}, simplify: function(r) {
  const e = BigInt(1 / (r || 1e-3) | 0), n = this.abs(), u = n.toContinued();
  for (let t = 1; t < u.length; t++) {
    let a = yr(u[t - 1], nr);
    for (let D = t - 2; D >= 0; D--) a = a.inverse().add(u[D]);
    let s = a.sub(n);
    if (s.n * e < s.d) return a.mul(this.s);
  }
  return this;
} };
var sa = "Fraction", fa = [], ca = W(sa, fa, () => (Object.defineProperty($r, "name", { value: "Fraction" }), $r.prototype.constructor = $r, $r.prototype.type = "Fraction", $r.prototype.isFraction = true, $r.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: String(this.s * this.n), d: String(this.d) };
}, $r.fromJSON = function(r) {
  return new $r(r);
}, $r), { isClass: true }), la = "Matrix", va = [], Da = W(la, va, () => {
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
function Ve(r, e, n) {
  var u = r.constructor, t = new u(2), a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!hr(n)) throw new Error("size must be an integer");
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
function pa(r, e) {
  if (typeof e == "function") return e(r);
  if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: n, precision: u, wordSize: t } = An(e);
  switch (n) {
    case "fixed":
      return ha(r, u);
    case "exponential":
      return mt(r, u);
    case "engineering":
      return da(r, u);
    case "bin":
      return Ve(r, 2, t);
    case "oct":
      return Ve(r, 8, t);
    case "hex":
      return Ve(r, 16, t);
    case "auto": {
      var a = gt(e == null ? void 0 : e.lowerExp, -3), s = gt(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero()) return "0";
      var D, f = r.toSignificantDigits(u), c = f.e;
      return c >= a && c < s ? D = f.toFixed() : D = mt(r, u), D.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], l = arguments[4];
        return o !== "." ? o + l : l;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function da(r, e) {
  var n = r.e, u = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -u)), a = t.toPrecision(e);
  if (a.includes("e")) {
    var s = r.constructor;
    a = new s(a).toFixed();
  }
  return a + "e" + (n >= 0 ? "+" : "") + u.toString();
}
function mt(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function ha(r, e) {
  return r.toFixed(e);
}
function gt(r, e) {
  return dr(r) ? r : Cr(r) ? r.toNumber() : e;
}
function gr(r, e) {
  var n = ma(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function ma(r, e) {
  if (typeof r == "number") return Ze(r, e);
  if (Cr(r)) return pa(r, e);
  if (ga(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
  if (Array.isArray(r)) return Cn(r, e);
  if (qr(r)) return yt(r);
  if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function") return r.format(e);
    if (r && r.toString(e) !== {}.toString()) return r.toString(e);
    var n = Object.keys(r).map((u) => yt(u) + ": " + gr(r[u], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function yt(r) {
  for (var e = String(r), n = "", u = 0; u < e.length; ) {
    var t = e.charAt(u);
    n += t in At ? At[t] : t, u++;
  }
  return '"' + n + '"';
}
var At = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function Cn(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", u = r.length, t = 0; t < u; t++) t !== 0 && (n += ", "), n += Cn(r[t], e);
    return n += "]", n;
  } else return gr(r, e);
}
function ga(r) {
  return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
}
function lr(r, e, n) {
  if (!(this instanceof lr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
lr.prototype = new RangeError();
lr.prototype.constructor = RangeError;
lr.prototype.name = "DimensionError";
lr.prototype.isDimensionError = true;
function Yr(r, e, n) {
  if (!(this instanceof Yr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Yr.prototype = new RangeError();
Yr.prototype.constructor = RangeError;
Yr.prototype.name = "IndexError";
Yr.prototype.isIndexError = true;
function fr(r) {
  for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
  return e;
}
function wn(r, e, n) {
  var u, t = r.length;
  if (t !== e[n]) throw new lr(t, e[n]);
  if (n < e.length - 1) {
    var a = n + 1;
    for (u = 0; u < t; u++) {
      var s = r[u];
      if (!Array.isArray(s)) throw new lr(e.length - 1, e.length, "<");
      wn(r[u], e, a);
    }
  } else for (u = 0; u < t; u++) if (Array.isArray(r[u])) throw new lr(e.length + 1, e.length, ">");
}
function Ft(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r)) throw new lr(r.length, 0);
  } else wn(r, e, 0);
}
function Er(r, e) {
  if (r !== void 0) {
    if (!dr(r) || !hr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e) throw new Yr(r, e);
  }
}
function Fe(r, e, n) {
  if (!Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!dr(t) || !hr(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + gr(e) + ")");
  }), (dr(r) || Cr(r)) && (r = [r]);
  var u = n !== void 0 ? n : 0;
  return Qe(r, e, 0, u), r;
}
function Qe(r, e, n, u) {
  var t, a, s = r.length, D = e[n], f = Math.min(s, D);
  if (r.length = D, n < e.length - 1) {
    var c = n + 1;
    for (t = 0; t < f; t++) a = r[t], Array.isArray(a) || (a = [a], r[t] = a), Qe(a, e, c, u);
    for (t = f; t < D; t++) a = [], r[t] = a, Qe(a, e, c, u);
  } else {
    for (t = 0; t < f; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
    for (t = f; t < D; t++) r[t] = u;
  }
}
function et(r, e) {
  var n = We(r, true), u = n.length;
  if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new lr(0, u, "!=");
  e = tt(e, u);
  var t = bn(e);
  if (u !== t) throw new lr(t, u, "!=");
  try {
    return ya(n, e);
  } catch (a) {
    throw a instanceof lr ? new lr(t, u, "!=") : a;
  }
}
function tt(r, e) {
  var n = bn(r), u = r.slice(), t = -1, a = r.indexOf(t), s = r.indexOf(t, a + 1) >= 0;
  if (s) throw new Error("More than one wildcard in sizes");
  var D = a >= 0, f = e % n === 0;
  if (D) if (f) u[a] = -e / n;
  else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return u;
}
function bn(r) {
  return r.reduce((e, n) => e * n, 1);
}
function ya(r, e) {
  for (var n = r, u, t = e.length - 1; t > 0; t--) {
    var a = e[t];
    u = [];
    for (var s = n.length / a, D = 0; D < s; D++) u.push(n.slice(D * a, (D + 1) * a));
    n = u;
  }
  return n;
}
function Et(r, e) {
  for (var n = fr(r); Array.isArray(r) && r.length === 1; ) r = r[0], n.shift();
  for (var u = n.length; n[u - 1] === 1; ) u--;
  return u < n.length && (r = _n(r, u, 0), n.length = u), r;
}
function _n(r, e, n) {
  var u, t;
  if (n < e) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = _n(r[u], e, a);
  } else for (; Array.isArray(r); ) r = r[0];
  return r;
}
function Bn(r, e, n, u) {
  var t = u || fr(r);
  if (n) for (var a = 0; a < n; a++) r = [r], t.unshift(1);
  for (r = xn(r, e, 0); t.length < e; ) t.push(1);
  return r;
}
function xn(r, e, n) {
  var u, t;
  if (Array.isArray(r)) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = xn(r[u], e, a);
  } else for (var s = n; s < e; s++) r = [r];
  return r;
}
function We(r) {
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
function Te(r, e) {
  for (var n, u = 0, t = 0; t < r.length; t++) {
    var a = r[t], s = Array.isArray(a);
    if (t === 0 && s && (u = a.length), s && a.length !== u) return;
    var D = s ? Te(a, e) : e(a);
    if (n === void 0) n = D;
    else if (n !== D) return "mixed";
  }
  return n;
}
function Sn(r, e, n, u) {
  if (u < n) {
    if (r.length !== e.length) throw new lr(r.length, e.length);
    for (var t = [], a = 0; a < r.length; a++) t[a] = Sn(r[a], e[a], n, u + 1);
    return t;
  } else return r.concat(e);
}
function Mn() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1) return r[0];
  if (r.length > 1) return r.slice(1).reduce(function(n, u) {
    return Sn(n, u, e, 0);
  }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Nn() {
  for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
  for (var u = e.map((m) => m.length), t = Math.max(...u), a = new Array(t).fill(null), s = 0; s < e.length; s++) for (var D = e[s], f = u[s], c = 0; c < f; c++) {
    var o = t - f + c;
    D[c] > a[o] && (a[o] = D[c]);
  }
  for (var l = 0; l < e.length; l++) Tn(e[l], a);
  return a;
}
function Tn(r, e) {
  for (var n = e.length, u = r.length, t = 0; t < u; t++) {
    var a = n - u + t;
    if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(u, " with size ").concat(r[t], " to size ").concat(e[a]));
  }
}
function Ye(r, e) {
  var n = fr(r);
  if (Qr(n, e)) return r;
  Tn(n, e);
  var u = Nn(n, e), t = u.length, a = [...Array(t - n.length).fill(1), ...n], s = Fa(r);
  n.length < t && (s = et(s, a), n = fr(s));
  for (var D = 0; D < t; D++) n[D] < u[D] && (s = Aa(s, u[D], D), n = fr(s));
  return s;
}
function Aa(r, e, n) {
  return Mn(...Array(e).fill(r), n);
}
function zn(r, e) {
  if (!Array.isArray(r)) throw new Error("Array expected");
  var n = fr(r);
  if (e.length !== n.length) throw new lr(e.length, n.length);
  for (var u = 0; u < e.length; u++) Er(e[u], n[u]);
  return e.reduce((t, a) => t[a], r);
}
function Ct(r, e) {
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
function Fa(r) {
  return Se([], r);
}
function Ee(r, e, n) {
  var u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (ge.isTypedFunction(r)) {
    var t;
    if (u) t = 1;
    else {
      var a = (e.isMatrix ? e.size() : fr(e)).map(() => 0), s = e.isMatrix ? e.get(a) : zn(e, a);
      t = wa(r, s, a, e);
    }
    var D;
    if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
      var f = Ea(r, t);
      D = f !== void 0 ? f : r;
    } else D = r;
    return t >= 1 && t <= 3 ? { isUnary: t === 1, fn: function() {
      for (var o = arguments.length, l = new Array(o), m = 0; m < o; m++) l[m] = arguments[m];
      return wt(D, l.slice(0, t), n, r.name);
    } } : { isUnary: false, fn: function() {
      for (var o = arguments.length, l = new Array(o), m = 0; m < o; m++) l[m] = arguments[m];
      return wt(D, l, n, r.name);
    } };
  }
  return u === void 0 ? { isUnary: Ca(r), fn: r } : { isUnary: u, fn: r };
}
function Ea(r, e) {
  var n = [];
  if (Object.entries(r.signatures).forEach((u) => {
    var [t, a] = u;
    t.split(",").length === e && n.push(a);
  }), n.length === 1) return n[0];
}
function Ca(r) {
  if (r.length !== 1) return false;
  var e = r.toString();
  if (/arguments/.test(e)) return false;
  var n = e.match(/\(.*?\)/);
  return !/\.\.\./.test(n);
}
function wa(r, e, n, u) {
  for (var t = [e, n, u], a = 3; a > 0; a--) {
    var s = t.slice(0, a);
    if (ge.resolve(r, s) !== null) return a;
  }
}
function wt(r, e, n, u) {
  try {
    return r(...e);
  } catch (t) {
    ba(t, e, n, u);
  }
}
function ba(r, e, n, u) {
  var t;
  if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
    var a = [];
    throw a.push("value: ".concat(Rr(e[0]))), e.length >= 2 && a.push("index: ".concat(Rr(e[1]))), e.length >= 3 && a.push("array: ".concat(Rr(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(u, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
  } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(u, ": ").concat(r.message));
}
var _a = "DenseMatrix", Ba = ["Matrix"], xa = W(_a, Ba, (r) => {
  var { Matrix: e } = r;
  function n(o, l) {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    if (l && !qr(l)) throw new Error("Invalid datatype: " + l);
    if (pr(o)) o.type === "DenseMatrix" ? (this._data = sr(o._data), this._size = sr(o._size), this._datatype = l || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = l || o._datatype);
    else if (o && Ar(o.data) && Ar(o.size)) this._data = o.data, this._size = o.size, Ft(this._data, this._size), this._datatype = l || o.datatype;
    else if (Ar(o)) this._data = c(o), this._size = fr(this._data), Ft(this._data, this._size), this._datatype = l;
    else {
      if (o) throw new TypeError("Unsupported type of data (" + Rr(o) + ")");
      this._data = [], this._size = [0], this._datatype = l;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(o, l) {
    return new n(o, l);
  }, Object.defineProperty(n, "name", { value: "DenseMatrix" }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
    return Te(this._data, Rr);
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
    return zn(this._data, o);
  }, n.prototype.set = function(o, l, m) {
    if (!Ar(o)) throw new TypeError("Array expected");
    if (o.length < this._size.length) throw new lr(o.length, this._size.length, "<");
    var v, p, i, d = o.map(function(w) {
      return w + 1;
    });
    f(this, d, m);
    var g = this._data;
    for (v = 0, p = o.length - 1; v < p; v++) i = o[v], Er(i, g.length), g = g[i];
    return i = o[o.length - 1], Er(i, g.length), g[i] = l, this;
  };
  function u(o, l) {
    if (!ke(l)) throw new TypeError("Invalid index");
    var m = l.isScalar();
    if (m) return o.get(l.min());
    var v = l.size();
    if (v.length !== o._size.length) throw new lr(v.length, o._size.length);
    for (var p = l.min(), i = l.max(), d = 0, g = o._size.length; d < g; d++) Er(p[d], o._size[d]), Er(i[d], o._size[d]);
    return new n(t(o._data, l, v.length, 0), o._datatype);
  }
  function t(o, l, m, v) {
    var p = v === m - 1, i = l.dimension(v);
    return p ? i.map(function(d) {
      return Er(d, o.length), o[d];
    }).valueOf() : i.map(function(d) {
      Er(d, o.length);
      var g = o[d];
      return t(g, l, m, v + 1);
    }).valueOf();
  }
  function a(o, l, m, v) {
    if (!l || l.isIndex !== true) throw new TypeError("Invalid index");
    var p = l.size(), i = l.isScalar(), d;
    if (pr(m) ? (d = m.size(), m = m.valueOf()) : d = fr(m), i) {
      if (d.length !== 0) throw new TypeError("Scalar expected");
      o.set(l.min(), m, v);
    } else {
      if (!Qr(d, p)) try {
        d.length === 0 ? m = Ye([m], p) : m = Ye(m, p), d = fr(m);
      } catch {
      }
      if (p.length < o._size.length) throw new lr(p.length, o._size.length, "<");
      if (d.length < p.length) {
        for (var g = 0, w = 0; p[g] === 1 && d[g] === 1; ) g++;
        for (; p[g] === 1; ) w++, g++;
        m = Bn(m, p.length, w, d);
      }
      if (!Qr(p, d)) throw new lr(p, d, ">");
      var h = l.max().map(function(A) {
        return A + 1;
      });
      f(o, h, v);
      var C = p.length, E = 0;
      s(o._data, l, m, C, E);
    }
    return o;
  }
  function s(o, l, m, v, p) {
    var i = p === v - 1, d = l.dimension(p);
    i ? d.forEach(function(g, w) {
      Er(g), o[g] = m[w[0]];
    }) : d.forEach(function(g, w) {
      Er(g), s(o[g], l, m[w[0]], v, p + 1);
    });
  }
  n.prototype.resize = function(o, l, m) {
    if (!Ae(o)) throw new TypeError("Array or Matrix expected");
    var v = o.valueOf().map((i) => Array.isArray(i) && i.length === 1 ? i[0] : i), p = m ? this.clone() : this;
    return D(p, v, l);
  };
  function D(o, l, m) {
    if (l.length === 0) {
      for (var v = o._data; Ar(v); ) v = v[0];
      return v;
    }
    return o._size = l.slice(0), o._data = Fe(o._data, o._size, m), o;
  }
  n.prototype.reshape = function(o, l) {
    var m = l ? this.clone() : this;
    m._data = et(m._data, o);
    var v = m._size.reduce((p, i) => p * i);
    return m._size = tt(o, v), m;
  };
  function f(o, l, m) {
    for (var v = o._size.slice(0), p = false; v.length < l.length; ) v.push(0), p = true;
    for (var i = 0, d = l.length; i < d; i++) l[i] > v[i] && (v[i] = l[i], p = true);
    p && D(o, v, m);
  }
  n.prototype.clone = function() {
    var o = new n({ data: sr(this._data), size: sr(this._size), datatype: this._datatype });
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
      if (w < m) for (var h = 0; h < g.length; h++) p[w] = h, i(g[h], w + 1);
      else for (var C = 0; C < g.length; C++) p[w] = C, o(g, C, p.slice());
    }
    function d(g) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (w < m) for (var h = 0; h < g.length; h++) d(g[h], w + 1);
      else for (var C = 0; C < g.length; C++) o(g, C);
    }
  }, n.prototype.map = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, m = this, v = new n(m), p = Ee(o, m._data, "map", l), i = l || p.isUnary ? (d, g) => {
      d[g] = p.fn(d[g]);
    } : (d, g, w) => {
      d[g] = p.fn(d[g], w, m);
    };
    return v._forEach(i), v;
  }, n.prototype.forEach = function(o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, m = this, v = Ee(o, m._data, "map", l), p = l || v.isUnary ? (i, d) => {
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
      var w = v.map((h) => [h[g]]);
      l.push(new n(w, o._datatype));
    }, i = 0; i < m[1]; i++) p(i);
    return l;
  }, n.prototype.toArray = function() {
    return sr(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(o) {
    return gr(this._data, o);
  }, n.prototype.toString = function() {
    return gr(this._data);
  }, n.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(o) {
    if (o) {
      if (Cr(o) && (o = o.toNumber()), !dr(o) || !hr(o)) throw new TypeError("The parameter k must be an integer number");
    } else o = 0;
    for (var l = o > 0 ? o : 0, m = o < 0 ? -o : 0, v = this._size[0], p = this._size[1], i = Math.min(v - m, p - l), d = [], g = 0; g < i; g++) d[g] = this._data[g + m][g + l];
    return new n({ data: d, size: [i], datatype: this._datatype });
  }, n.diagonal = function(o, l, m, v) {
    if (!Ar(o)) throw new TypeError("Array expected, size parameter");
    if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(b) {
      if (Cr(b) && (b = b.toNumber()), !dr(b) || !hr(b) || b < 1) throw new Error("Size values must be positive integers");
      return b;
    }), m) {
      if (Cr(m) && (m = m.toNumber()), !dr(m) || !hr(m)) throw new TypeError("The parameter k must be an integer number");
    } else m = 0;
    var p = m > 0 ? m : 0, i = m < 0 ? -m : 0, d = o[0], g = o[1], w = Math.min(d - i, g - p), h;
    if (Ar(l)) {
      if (l.length !== w) throw new Error("Invalid value array length");
      h = function(F) {
        return l[F];
      };
    } else if (pr(l)) {
      var C = l.size();
      if (C.length !== 1 || C[0] !== w) throw new Error("Invalid matrix length");
      h = function(F) {
        return l.get([F]);
      };
    } else h = function() {
      return l;
    };
    v || (v = Cr(h(0)) ? h(0).mul(0) : 0);
    var E = [];
    if (o.length > 0) {
      E = Fe(E, o, v);
      for (var A = 0; A < w; A++) E[A + i][A + p] = h(A);
    }
    return new n({ data: E, size: [d, g] });
  }, n.fromJSON = function(o) {
    return new n(o);
  }, n.prototype.swapRows = function(o, l) {
    if (!dr(o) || !hr(o) || !dr(l) || !hr(l)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return Er(o, this._size[0]), Er(l, this._size[0]), n._swapRows(o, l, this._data), this;
  }, n._swapRows = function(o, l, m) {
    var v = m[o];
    m[o] = m[l], m[l] = v;
  };
  function c(o) {
    return pr(o) ? c(o.valueOf()) : Ar(o) ? o.map(c) : o;
  }
  return n;
}, { isClass: true });
function Or(r, e, n) {
  if (!n) return pr(r) ? r.map((t) => e(t), false, true) : Ct(r, e, true);
  var u = (t) => t === 0 ? t : e(t);
  return pr(r) ? r.map((t) => u(t), false, true) : Ct(r, u, true);
}
var bt = "isInteger", Sa = ["typed"], Ma = W(bt, Sa, (r) => {
  var { typed: e } = r;
  return e(bt, { number: hr, BigNumber: function(u) {
    return u.isInt();
  }, bigint: function(u) {
    return true;
  }, Fraction: function(u) {
    return u.d === 1n;
  }, "Array | Matrix": e.referToSelf((n) => (u) => Or(u, n)) });
}), nt = "number", ze = "number, number";
function On(r) {
  return Math.abs(r);
}
On.signature = nt;
function $n(r, e) {
  return r + e;
}
$n.signature = ze;
function In(r, e) {
  return r - e;
}
In.signature = ze;
function qn(r, e) {
  return r * e;
}
qn.signature = ze;
function Rn(r) {
  return -r;
}
Rn.signature = nt;
function Ge(r) {
  return Ju(r);
}
Ge.signature = nt;
function Un(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
Un.signature = ze;
var Na = "number";
function Pn(r) {
  return r > 0;
}
Pn.signature = Na;
function jr(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), u));
}
var _t = "isPositive", Ta = ["typed", "config"], za = W(_t, Ta, (r) => {
  var { typed: e, config: n } = r;
  return e(_t, { number: (u) => Lr(u, 0, n.relTol, n.absTol) ? false : Pn(u), BigNumber: (u) => jr(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(), bigint: (u) => u > 0n, Fraction: (u) => u.s > 0n && u.n > 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Or(t, u)) });
}), Bt = "isZero", Oa = ["typed", "equalScalar"], $a = W(Bt, Oa, (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(Bt, { "number | BigNumber | Complex | Fraction": (u) => n(u, 0), bigint: (u) => u === 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Or(t, u)) });
});
function Ia(r, e, n, u) {
  return Lr(r.re, e.re, n, u) && Lr(r.im, e.im, n, u);
}
var se = W("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
    return e.find(n, [u.valueType(), t.valueType()])(u.value, t.value);
  }) };
}), Ce = "equalScalar", qa = ["typed", "config"], Ra = W(Ce, qa, (r) => {
  var { typed: e, config: n } = r, u = se({ typed: e });
  return e(Ce, { "boolean, boolean": function(a, s) {
    return a === s;
  }, "number, number": function(a, s) {
    return Lr(a, s, n.relTol, n.absTol);
  }, "BigNumber, BigNumber": function(a, s) {
    return a.eq(s) || jr(a, s, n.relTol, n.absTol);
  }, "bigint, bigint": function(a, s) {
    return a === s;
  }, "Fraction, Fraction": function(a, s) {
    return a.equals(s);
  }, "Complex, Complex": function(a, s) {
    return Ia(a, s, n.relTol, n.absTol);
  } }, u);
});
W(Ce, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Ce, { "number, number": function(t, a) {
    return Lr(t, a, n.relTol, n.absTol);
  } });
});
var Ua = "SparseMatrix", Pa = ["typed", "equalScalar", "Matrix"], La = W(Ua, Pa, (r) => {
  var { typed: e, equalScalar: n, Matrix: u } = r;
  function t(i, d) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (d && !qr(d)) throw new Error("Invalid datatype: " + d);
    if (pr(i)) a(this, i, d);
    else if (i && Ar(i.index) && Ar(i.ptr) && Ar(i.size)) this._values = i.values, this._index = i.index, this._ptr = i.ptr, this._size = i.size, this._datatype = d || i.datatype;
    else if (Ar(i)) s(this, i, d);
    else {
      if (i) throw new TypeError("Unsupported type of data (" + Rr(i) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = d;
    }
  }
  function a(i, d, g) {
    d.type === "SparseMatrix" ? (i._values = d._values ? sr(d._values) : void 0, i._index = sr(d._index), i._ptr = sr(d._ptr), i._size = sr(d._size), i._datatype = g || d._datatype) : s(i, d.valueOf(), g || d._datatype);
  }
  function s(i, d, g) {
    i._values = [], i._index = [], i._ptr = [], i._datatype = g;
    var w = d.length, h = 0, C = n, E = 0;
    if (qr(g) && (C = e.find(n, [g, g]) || n, E = e.convert(0, g)), w > 0) {
      var A = 0;
      do {
        i._ptr.push(i._index.length);
        for (var b = 0; b < w; b++) {
          var F = d[b];
          if (Ar(F)) {
            if (A === 0 && h < F.length && (h = F.length), A < F.length) {
              var y = F[A];
              C(y, E) || (i._values.push(y), i._index.push(b));
            }
          } else A === 0 && h < 1 && (h = 1), C(F, E) || (i._values.push(F), i._index.push(b));
        }
        A++;
      } while (A < h);
    }
    i._ptr.push(i._index.length), i._size = [w, h];
  }
  t.prototype = new u(), t.prototype.createSparseMatrix = function(i, d) {
    return new t(i, d);
  }, Object.defineProperty(t, "name", { value: "SparseMatrix" }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
    return Te(this._values, Rr);
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
        return f(this, i, d, g);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function D(i, d) {
    if (!ke(d)) throw new TypeError("Invalid index");
    var g = d.isScalar();
    if (g) return i.get(d.min());
    var w = d.size();
    if (w.length !== i._size.length) throw new lr(w.length, i._size.length);
    var h, C, E, A, b = d.min(), F = d.max();
    for (h = 0, C = i._size.length; h < C; h++) Er(b[h], i._size[h]), Er(F[h], i._size[h]);
    var y = i._values, x = i._index, B = i._ptr, _ = d.dimension(0), M = d.dimension(1), S = [], T = [];
    _.forEach(function(I, P) {
      T[I] = P[0], S[I] = true;
    });
    var N = y ? [] : void 0, q = [], z = [];
    return M.forEach(function(I) {
      for (z.push(q.length), E = B[I], A = B[I + 1]; E < A; E++) h = x[E], S[h] === true && (q.push(T[h]), N && N.push(y[E]));
    }), z.push(q.length), new t({ values: N, index: q, ptr: z, size: w, datatype: i._datatype });
  }
  function f(i, d, g, w) {
    if (!d || d.isIndex !== true) throw new TypeError("Invalid index");
    var h = d.size(), C = d.isScalar(), E;
    if (pr(g) ? (E = g.size(), g = g.toArray()) : E = fr(g), C) {
      if (E.length !== 0) throw new TypeError("Scalar expected");
      i.set(d.min(), g, w);
    } else {
      if (h.length !== 1 && h.length !== 2) throw new lr(h.length, i._size.length, "<");
      if (E.length < h.length) {
        for (var A = 0, b = 0; h[A] === 1 && E[A] === 1; ) A++;
        for (; h[A] === 1; ) b++, A++;
        g = Bn(g, h.length, b, E);
      }
      if (!Qr(h, E)) throw new lr(h, E, ">");
      if (h.length === 1) {
        var F = d.dimension(0);
        F.forEach(function(B, _) {
          Er(B), i.set([B, 0], g[_[0]], w);
        });
      } else {
        var y = d.dimension(0), x = d.dimension(1);
        y.forEach(function(B, _) {
          Er(B), x.forEach(function(M, S) {
            Er(M), i.set([B, M], g[_[0]][S[0]], w);
          });
        });
      }
    }
    return i;
  }
  t.prototype.get = function(i) {
    if (!Ar(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new lr(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
    var d = i[0], g = i[1];
    Er(d, this._size[0]), Er(g, this._size[1]);
    var w = c(d, this._ptr[g], this._ptr[g + 1], this._index);
    return w < this._ptr[g + 1] && this._index[w] === d ? this._values[w] : 0;
  }, t.prototype.set = function(i, d, g) {
    if (!Ar(i)) throw new TypeError("Array expected");
    if (i.length !== this._size.length) throw new lr(i.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = i[0], h = i[1], C = this._size[0], E = this._size[1], A = n, b = 0;
    qr(this._datatype) && (A = e.find(n, [this._datatype, this._datatype]) || n, b = e.convert(0, this._datatype)), (w > C - 1 || h > E - 1) && (m(this, Math.max(w + 1, C), Math.max(h + 1, E), g), C = this._size[0], E = this._size[1]), Er(w, C), Er(h, E);
    var F = c(w, this._ptr[h], this._ptr[h + 1], this._index);
    return F < this._ptr[h + 1] && this._index[F] === w ? A(d, b) ? o(F, h, this._values, this._index, this._ptr) : this._values[F] = d : A(d, b) || l(F, w, h, d, this._values, this._index, this._ptr), this;
  };
  function c(i, d, g, w) {
    if (g - d === 0) return g;
    for (var h = d; h < g; h++) if (w[h] === i) return h;
    return d;
  }
  function o(i, d, g, w, h) {
    g.splice(i, 1), w.splice(i, 1);
    for (var C = d + 1; C < h.length; C++) h[C]--;
  }
  function l(i, d, g, w, h, C, E) {
    h.splice(i, 0, w), C.splice(i, 0, d);
    for (var A = g + 1; A < E.length; A++) E[A]++;
  }
  t.prototype.resize = function(i, d, g) {
    if (!Ae(i)) throw new TypeError("Array or Matrix expected");
    var w = i.valueOf().map((C) => Array.isArray(C) && C.length === 1 ? C[0] : C);
    if (w.length !== 2) throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(C) {
      if (!dr(C) || !hr(C) || C < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + gr(w) + ")");
    });
    var h = g ? this.clone() : this;
    return m(h, w[0], w[1], d);
  };
  function m(i, d, g, w) {
    var h = w || 0, C = n, E = 0;
    qr(i._datatype) && (C = e.find(n, [i._datatype, i._datatype]) || n, E = e.convert(0, i._datatype), h = e.convert(h, i._datatype));
    var A = !C(h, E), b = i._size[0], F = i._size[1], y, x, B;
    if (g > F) {
      for (x = F; x < g; x++) if (i._ptr[x] = i._values.length, A) for (y = 0; y < b; y++) i._values.push(h), i._index.push(y);
      i._ptr[g] = i._values.length;
    } else g < F && (i._ptr.splice(g + 1, F - g), i._values.splice(i._ptr[g], i._values.length), i._index.splice(i._ptr[g], i._index.length));
    if (F = g, d > b) {
      if (A) {
        var _ = 0;
        for (x = 0; x < F; x++) {
          i._ptr[x] = i._ptr[x] + _, B = i._ptr[x + 1] + _;
          var M = 0;
          for (y = b; y < d; y++, M++) i._values.splice(B + M, 0, h), i._index.splice(B + M, 0, y), _++;
        }
        i._ptr[F] = i._values.length;
      }
    } else if (d < b) {
      var S = 0;
      for (x = 0; x < F; x++) {
        i._ptr[x] = i._ptr[x] - S;
        var T = i._ptr[x], N = i._ptr[x + 1] - S;
        for (B = T; B < N; B++) y = i._index[B], y > d - 1 && (i._values.splice(B, 1), i._index.splice(B, 1), S++);
      }
      i._ptr[x] = i._values.length;
    }
    return i._size[0] = d, i._size[1] = g, i;
  }
  t.prototype.reshape = function(i, d) {
    if (!Ar(i)) throw new TypeError("Array expected");
    if (i.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    i.forEach(function(I) {
      if (!dr(I) || !hr(I) || I <= -2 || I === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + gr(i) + ")");
    });
    var g = this._size[0] * this._size[1];
    i = tt(i, g);
    var w = i[0] * i[1];
    if (g !== w) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var h = d ? this.clone() : this;
    if (this._size[0] === i[0] && this._size[1] === i[1]) return h;
    for (var C = [], E = 0; E < h._ptr.length; E++) for (var A = 0; A < h._ptr[E + 1] - h._ptr[E]; A++) C.push(E);
    for (var b = h._values.slice(), F = h._index.slice(), y = 0; y < h._index.length; y++) {
      var x = F[y], B = C[y], _ = x * h._size[1] + B;
      C[y] = _ % i[1], F[y] = Math.floor(_ / i[1]);
    }
    h._values.length = 0, h._index.length = 0, h._ptr.length = i[1] + 1, h._size = i.slice();
    for (var M = 0; M < h._ptr.length; M++) h._ptr[M] = 0;
    for (var S = 0; S < b.length; S++) {
      var T = F[S], N = C[S], q = b[S], z = c(T, h._ptr[N], h._ptr[N + 1], h._index);
      l(z, T, N, q, h._values, h._index, h._ptr);
    }
    return h;
  }, t.prototype.clone = function() {
    var i = new t({ values: this._values ? sr(this._values) : void 0, index: sr(this._index), ptr: sr(this._ptr), size: sr(this._size), datatype: this._datatype });
    return i;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(i, d) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var g = this, w = this._size[0], h = this._size[1], C = Ee(i, g, "map"), E = function(b, F, y) {
      return C.fn(b, [F, y], g);
    };
    return v(this, 0, w - 1, 0, h - 1, E, d);
  };
  function v(i, d, g, w, h, C, E) {
    var A = [], b = [], F = [], y = n, x = 0;
    qr(i._datatype) && (y = e.find(n, [i._datatype, i._datatype]) || n, x = e.convert(0, i._datatype));
    for (var B = function(O, Z, Y) {
      var L = C(O, Z, Y);
      y(L, x) || (A.push(L), b.push(Z));
    }, _ = w; _ <= h; _++) {
      F.push(A.length);
      var M = i._ptr[_], S = i._ptr[_ + 1];
      if (E) for (var T = M; T < S; T++) {
        var N = i._index[T];
        N >= d && N <= g && B(i._values[T], N - d, _ - w);
      }
      else {
        for (var q = {}, z = M; z < S; z++) {
          var I = i._index[z];
          q[I] = i._values[z];
        }
        for (var P = d; P <= g; P++) {
          var G = P in q ? q[P] : 0;
          B(G, P - d, _ - w);
        }
      }
    }
    return F.push(A.length), new t({ values: A, index: b, ptr: F, size: [g - d + 1, h - w + 1] });
  }
  t.prototype.forEach = function(i, d) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var g = this, w = this._size[0], h = this._size[1], C = Ee(i, g, "forEach"), E = 0; E < h; E++) {
      var A = this._ptr[E], b = this._ptr[E + 1];
      if (d) for (var F = A; F < b; F++) {
        var y = this._index[F];
        C.fn(this._values[F], [y, E], g);
      }
      else {
        for (var x = {}, B = A; B < b; B++) {
          var _ = this._index[B];
          x[_] = this._values[B];
        }
        for (var M = 0; M < w; M++) {
          var S = M in x ? x[M] : 0;
          C.fn(S, [M, E], g);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var i = this._size[1], d = 0; d < i; d++) for (var g = this._ptr[d], w = this._ptr[d + 1], h = g; h < w; h++) {
      var C = this._index[h];
      yield { value: this._values[h], index: [C, d] };
    }
  }, t.prototype.toArray = function() {
    return p(this._values, this._index, this._ptr, this._size, true);
  }, t.prototype.valueOf = function() {
    return p(this._values, this._index, this._ptr, this._size, false);
  };
  function p(i, d, g, w, h) {
    var C = w[0], E = w[1], A = [], b, F;
    for (b = 0; b < C; b++) for (A[b] = [], F = 0; F < E; F++) A[b][F] = 0;
    for (F = 0; F < E; F++) for (var y = g[F], x = g[F + 1], B = y; B < x; B++) b = d[B], A[b][F] = i ? h ? sr(i[B]) : i[B] : 1;
    return A;
  }
  return t.prototype.format = function(i) {
    for (var d = this._size[0], g = this._size[1], w = this.density(), h = "Sparse Matrix [" + gr(d, i) + " x " + gr(g, i) + "] density: " + gr(w, i) + `
`, C = 0; C < g; C++) for (var E = this._ptr[C], A = this._ptr[C + 1], b = E; b < A; b++) {
      var F = this._index[b];
      h += `
    (` + gr(F, i) + ", " + gr(C, i) + ") ==> " + (this._values ? gr(this._values[b], i) : "X");
    }
    return h;
  }, t.prototype.toString = function() {
    return gr(this.toArray());
  }, t.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(i) {
    if (i) {
      if (Cr(i) && (i = i.toNumber()), !dr(i) || !hr(i)) throw new TypeError("The parameter k must be an integer number");
    } else i = 0;
    var d = i > 0 ? i : 0, g = i < 0 ? -i : 0, w = this._size[0], h = this._size[1], C = Math.min(w - g, h - d), E = [], A = [], b = [];
    b[0] = 0;
    for (var F = d; F < h && E.length < C; F++) for (var y = this._ptr[F], x = this._ptr[F + 1], B = y; B < x; B++) {
      var _ = this._index[B];
      if (_ === F - d + g) {
        E.push(this._values[B]), A[E.length - 1] = _ - g;
        break;
      }
    }
    return b.push(E.length), new t({ values: E, index: A, ptr: b, size: [C, 1] });
  }, t.fromJSON = function(i) {
    return new t(i);
  }, t.diagonal = function(i, d, g, w, h) {
    if (!Ar(i)) throw new TypeError("Array expected, size parameter");
    if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (i = i.map(function(I) {
      if (Cr(I) && (I = I.toNumber()), !dr(I) || !hr(I) || I < 1) throw new Error("Size values must be positive integers");
      return I;
    }), g) {
      if (Cr(g) && (g = g.toNumber()), !dr(g) || !hr(g)) throw new TypeError("The parameter k must be an integer number");
    } else g = 0;
    var C = n, E = 0;
    qr(h) && (C = e.find(n, [h, h]) || n, E = e.convert(0, h));
    var A = g > 0 ? g : 0, b = g < 0 ? -g : 0, F = i[0], y = i[1], x = Math.min(F - b, y - A), B;
    if (Ar(d)) {
      if (d.length !== x) throw new Error("Invalid value array length");
      B = function(P) {
        return d[P];
      };
    } else if (pr(d)) {
      var _ = d.size();
      if (_.length !== 1 || _[0] !== x) throw new Error("Invalid matrix length");
      B = function(P) {
        return d.get([P]);
      };
    } else B = function() {
      return d;
    };
    for (var M = [], S = [], T = [], N = 0; N < y; N++) {
      T.push(M.length);
      var q = N - A;
      if (q >= 0 && q < x) {
        var z = B(q);
        C(z, E) || (S.push(q + b), M.push(z));
      }
    }
    return T.push(M.length), new t({ values: M, index: S, ptr: T, size: [F, y] });
  }, t.prototype.swapRows = function(i, d) {
    if (!dr(i) || !hr(i) || !dr(d) || !hr(d)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return Er(i, this._size[0]), Er(d, this._size[0]), t._swapRows(i, d, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(i, d, g, w, h) {
    for (var C = w[i], E = w[i + 1], A = C; A < E; A++) h(g[A], d[A]);
  }, t._swapRows = function(i, d, g, w, h, C) {
    for (var E = 0; E < g; E++) {
      var A = C[E], b = C[E + 1], F = c(i, A, b, h), y = c(d, A, b, h);
      if (F < b && y < b && h[F] === i && h[y] === d) {
        if (w) {
          var x = w[F];
          w[F] = w[y], w[y] = x;
        }
        continue;
      }
      if (F < b && h[F] === i && (y >= b || h[y] !== d)) {
        var B = w ? w[F] : void 0;
        h.splice(y, 0, d), w && w.splice(y, 0, B), h.splice(y <= F ? F + 1 : F, 1), w && w.splice(y <= F ? F + 1 : F, 1);
        continue;
      }
      if (y < b && h[y] === d && (F >= b || h[F] !== i)) {
        var _ = w ? w[y] : void 0;
        h.splice(F, 0, i), w && w.splice(F, 0, _), h.splice(F <= y ? y + 1 : y, 1), w && w.splice(F <= y ? y + 1 : y, 1);
      }
    }
  }, t;
}, { isClass: true }), Va = "number", Za = ["typed"];
function Ja(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], u = e[2], t = e[3];
    return { input: r, radix: n, integerPart: u, fractionalPart: t };
  } else return null;
}
function Qa(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, u = 0; u < r.fractionalPart.length; u++) {
    var t = parseInt(r.fractionalPart[u], r.radix);
    n += t / Math.pow(r.radix, u + 1);
  }
  var a = e + n;
  if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return a;
}
var Wa = W(Va, Za, (r) => {
  var { typed: e } = r, n = e("number", { "": function() {
    return 0;
  }, number: function(t) {
    return t;
  }, string: function(t) {
    if (t === "NaN") return NaN;
    var a = Ja(t);
    if (a) return Qa(a);
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Or(t, u)) });
  return n.fromJSON = function(u) {
    return parseFloat(u.value);
  }, n;
}), Ya = "bignumber", Ga = ["typed", "BigNumber"], Ka = W(Ya, Ga, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Or(t, u)) });
}), Xa = "complex", Ha = ["typed", "Complex"], ka = W(Xa, Ha, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Or(t, u)) });
}), ja = "fraction", ri = ["typed", "Fraction"], ei = W(ja, ri, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Or(t, u)) });
}), xt = "matrix", ti = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], ni = W(xt, ti, (r) => {
  var { typed: e, Matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(xt, { "": function() {
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
}), St = "matrixFromColumns", ui = ["typed", "matrix", "flatten", "size"], ai = W(St, ui, (r) => {
  var { typed: e, matrix: n, flatten: u, size: t } = r;
  return e(St, { "...Array": function(f) {
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
}), Mt = "unaryMinus", ii = ["typed"], oi = W(Mt, ii, (r) => {
  var { typed: e } = r;
  return e(Mt, { number: Rn, "Complex | BigNumber | Fraction": (n) => n.neg(), bigint: (n) => -n, Unit: e.referToSelf((n) => (u) => {
    var t = u.clone();
    return t.value = e.find(n, t.valueType())(u.value), t;
  }), "Array | Matrix": e.referToSelf((n) => (u) => Or(u, n, true)) });
}), Nt = "abs", si = ["typed"], fi = W(Nt, si, (r) => {
  var { typed: e } = r;
  return e(Nt, { number: On, "Complex | BigNumber | Fraction | Unit": (n) => n.abs(), bigint: (n) => n < 0n ? -n : n, "Array | Matrix": e.referToSelf((n) => (u) => Or(u, n, true)) });
}), Tt = "addScalar", ci = ["typed"], li = W(Tt, ci, (r) => {
  var { typed: e } = r;
  return e(Tt, { "number, number": $n, "Complex, Complex": function(u, t) {
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
}), zt = "subtractScalar", vi = ["typed"], Di = W(zt, vi, (r) => {
  var { typed: e } = r;
  return e(zt, { "number, number": In, "Complex, Complex": function(u, t) {
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
}), pi = "matAlgo11xS0s", di = ["typed", "equalScalar"], hi = W(pi, di, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s, D) {
    var f = t._values, c = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = n, g = 0, w = s;
    typeof m == "string" && (i = m, d = e.find(n, [i, i]), g = e.convert(0, i), a = e.convert(a, i), w = e.find(s, [i, i]));
    for (var h = [], C = [], E = [], A = 0; A < p; A++) {
      E[A] = C.length;
      for (var b = o[A], F = o[A + 1], y = b; y < F; y++) {
        var x = c[y], B = D ? w(a, f[y]) : w(f[y], a);
        d(B, g) || (C.push(x), h.push(B));
      }
    }
    return E[p] = C.length, t.createSparseMatrix({ values: h, index: C, ptr: E, size: [v, p], datatype: i });
  };
}), mi = "matAlgo12xSfs", gi = ["typed", "DenseMatrix"], re = W(mi, gi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var f = t._values, c = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = s;
    typeof m == "string" && (i = m, a = e.convert(a, i), d = e.find(s, [i, i]));
    for (var g = [], w = [], h = [], C = 0; C < p; C++) {
      for (var E = C + 1, A = o[C], b = o[C + 1], F = A; F < b; F++) {
        var y = c[F];
        w[y] = f[F], h[y] = E;
      }
      for (var x = 0; x < v; x++) C === 0 && (g[x] = []), h[x] === E ? g[x][C] = D ? d(a, w[x]) : d(w[x], a) : g[x][C] = D ? d(a, 0) : d(0, a);
    }
    return new n({ data: g, size: [v, p], datatype: i });
  };
}), yi = "matAlgo14xDs", Ai = ["typed"], Ln = W(yi, Ai, (r) => {
  var { typed: e } = r;
  return function(t, a, s, D) {
    var f = t._data, c = t._size, o = t._datatype, l, m = s;
    typeof o == "string" && (l = o, a = e.convert(a, l), m = e.find(s, [l, l]));
    var v = c.length > 0 ? n(m, 0, c, c[0], f, a, D) : [];
    return t.createDenseMatrix({ data: v, size: sr(c), datatype: l });
  };
  function n(u, t, a, s, D, f, c) {
    var o = [];
    if (t === a.length - 1) for (var l = 0; l < s; l++) o[l] = c ? u(f, D[l]) : u(D[l], f);
    else for (var m = 0; m < s; m++) o[m] = n(u, t + 1, a, a[t + 1], D[m], f, c);
    return o;
  }
}), Fi = "matAlgo03xDSf", Ei = ["typed"], ee = W(Fi, Ei, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, f = u._size, c = u._datatype || u.getDataType(), o = t._values, l = t._index, m = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (f.length !== v.length) throw new lr(f.length, v.length);
    if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = f[0], d = f[1], g, w = 0, h = a;
    typeof c == "string" && c === p && c !== "mixed" && (g = c, w = e.convert(0, g), h = e.find(a, [g, g]));
    for (var C = [], E = 0; E < i; E++) C[E] = [];
    for (var A = [], b = [], F = 0; F < d; F++) {
      for (var y = F + 1, x = m[F], B = m[F + 1], _ = x; _ < B; _++) {
        var M = l[_];
        A[M] = s ? h(o[_], D[M][F]) : h(D[M][F], o[_]), b[M] = y;
      }
      for (var S = 0; S < i; S++) b[S] === y ? C[S][F] = A[S] : C[S][F] = s ? h(w, D[S][F]) : h(D[S][F], w);
    }
    return u.createDenseMatrix({ data: C, size: [i, d], datatype: c === u._datatype && p === t._datatype ? g : void 0 });
  };
}), Ci = "matAlgo05xSfSf", wi = ["typed", "equalScalar"], bi = W(Ci, wi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, f = t._index, c = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), m = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new lr(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var g = o[0], w = o[1], h, C = n, E = 0, A = s;
    typeof l == "string" && l === d && l !== "mixed" && (h = l, C = e.find(n, [h, h]), E = e.convert(0, h), A = e.find(s, [h, h]));
    var b = D && m ? [] : void 0, F = [], y = [], x = b ? [] : void 0, B = b ? [] : void 0, _ = [], M = [], S, T, N, q;
    for (T = 0; T < w; T++) {
      y[T] = F.length;
      var z = T + 1;
      for (N = c[T], q = c[T + 1]; N < q; N++) S = f[N], F.push(S), _[S] = z, x && (x[S] = D[N]);
      for (N = p[T], q = p[T + 1]; N < q; N++) S = v[N], _[S] !== z && F.push(S), M[S] = z, B && (B[S] = m[N]);
      if (b) for (N = y[T]; N < F.length; ) {
        S = F[N];
        var I = _[S], P = M[S];
        if (I === z || P === z) {
          var G = I === z ? x[S] : E, $ = P === z ? B[S] : E, O = A(G, $);
          C(O, E) ? F.splice(N, 1) : (b.push(O), N++);
        }
      }
    }
    return y[w] = F.length, t.createSparseMatrix({ values: b, index: F, ptr: y, size: [g, w], datatype: l === t._datatype && d === a._datatype ? h : void 0 });
  };
}), _i = "matAlgo13xDD", Bi = ["typed"], xi = W(_i, Bi, (r) => {
  var { typed: e } = r;
  return function(t, a, s) {
    var D = t._data, f = t._size, c = t._datatype, o = a._data, l = a._size, m = a._datatype, v = [];
    if (f.length !== l.length) throw new lr(f.length, l.length);
    for (var p = 0; p < f.length; p++) {
      if (f[p] !== l[p]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + l + ")");
      v[p] = f[p];
    }
    var i, d = s;
    typeof c == "string" && c === m && (i = c, d = e.find(s, [i, i]));
    var g = v.length > 0 ? n(d, 0, v, v[0], D, o) : [];
    return t.createDenseMatrix({ data: g, size: v, datatype: i });
  };
  function n(u, t, a, s, D, f) {
    var c = [];
    if (t === a.length - 1) for (var o = 0; o < s; o++) c[o] = u(D[o], f[o]);
    else for (var l = 0; l < s; l++) c[l] = n(u, t + 1, a, a[t + 1], D[l], f[l]);
    return c;
  }
});
function _r(r, e) {
  if (Qr(r.size(), e.size())) return [r, e];
  var n = Nn(r.size(), e.size());
  return [r, e].map((u) => Si(u, n));
}
function Si(r, e) {
  return Qr(r.size(), e) ? r : r.create(Ye(r.valueOf(), e), r.datatype());
}
var Mi = "matrixAlgorithmSuite", Ni = ["typed", "matrix"], Gr = W(Mi, Ni, (r) => {
  var { typed: e, matrix: n } = r, u = xi({ typed: e }), t = Ln({ typed: e });
  return function(s) {
    var D = s.elop, f = s.SD || s.DS, c;
    D ? (c = { "DenseMatrix, DenseMatrix": (v, p) => u(..._r(v, p), D), "Array, Array": (v, p) => u(..._r(n(v), n(p)), D).valueOf(), "Array, DenseMatrix": (v, p) => u(..._r(n(v), p), D), "DenseMatrix, Array": (v, p) => u(..._r(v, n(p)), D) }, s.SS && (c["SparseMatrix, SparseMatrix"] = (v, p) => s.SS(..._r(v, p), D, false)), s.DS && (c["DenseMatrix, SparseMatrix"] = (v, p) => s.DS(..._r(v, p), D, false), c["Array, SparseMatrix"] = (v, p) => s.DS(..._r(n(v), p), D, false)), f && (c["SparseMatrix, DenseMatrix"] = (v, p) => f(..._r(p, v), D, true), c["SparseMatrix, Array"] = (v, p) => f(..._r(n(p), v), D, true))) : (c = { "DenseMatrix, DenseMatrix": e.referToSelf((v) => (p, i) => u(..._r(p, i), v)), "Array, Array": e.referToSelf((v) => (p, i) => u(..._r(n(p), n(i)), v).valueOf()), "Array, DenseMatrix": e.referToSelf((v) => (p, i) => u(..._r(n(p), i), v)), "DenseMatrix, Array": e.referToSelf((v) => (p, i) => u(..._r(p, n(i)), v)) }, s.SS && (c["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.SS(..._r(p, i), v, false))), s.DS && (c["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(..._r(p, i), v, false)), c["Array, SparseMatrix"] = e.referToSelf((v) => (p, i) => s.DS(..._r(n(p), i), v, false))), f && (c["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (p, i) => f(..._r(i, p), v, true)), c["SparseMatrix, Array"] = e.referToSelf((v) => (p, i) => f(..._r(n(i), p), v, true))));
    var o = s.scalar || "any", l = s.Ds || s.Ss;
    l && (D ? (c["DenseMatrix," + o] = (v, p) => t(v, p, D, false), c[o + ", DenseMatrix"] = (v, p) => t(p, v, D, true), c["Array," + o] = (v, p) => t(n(v), p, D, false).valueOf(), c[o + ", Array"] = (v, p) => t(n(p), v, D, true).valueOf()) : (c["DenseMatrix," + o] = e.referToSelf((v) => (p, i) => t(p, i, v, false)), c[o + ", DenseMatrix"] = e.referToSelf((v) => (p, i) => t(i, p, v, true)), c["Array," + o] = e.referToSelf((v) => (p, i) => t(n(p), i, v, false).valueOf()), c[o + ", Array"] = e.referToSelf((v) => (p, i) => t(n(i), p, v, true).valueOf())));
    var m = s.sS !== void 0 ? s.sS : s.Ss;
    return D ? (s.Ss && (c["SparseMatrix," + o] = (v, p) => s.Ss(v, p, D, false)), m && (c[o + ", SparseMatrix"] = (v, p) => m(p, v, D, true))) : (s.Ss && (c["SparseMatrix," + o] = e.referToSelf((v) => (p, i) => s.Ss(p, i, v, false))), m && (c[o + ", SparseMatrix"] = e.referToSelf((v) => (p, i) => m(i, p, v, true)))), D && D.signatures && qu(c, D.signatures), c;
  };
}), Ti = "matAlgo01xDSid", zi = ["typed"], Vn = W(Ti, zi, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, f = u._size, c = u._datatype || u.getDataType(), o = t._values, l = t._index, m = t._ptr, v = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (f.length !== v.length) throw new lr(f.length, v.length);
    if (f[0] !== v[0] || f[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var i = f[0], d = f[1], g = typeof c == "string" && c !== "mixed" && c === p ? c : void 0, w = g ? e.find(a, [g, g]) : a, h, C, E = [];
    for (h = 0; h < i; h++) E[h] = [];
    var A = [], b = [];
    for (C = 0; C < d; C++) {
      for (var F = C + 1, y = m[C], x = m[C + 1], B = y; B < x; B++) h = l[B], A[h] = s ? w(o[B], D[h][C]) : w(D[h][C], o[B]), b[h] = F;
      for (h = 0; h < i; h++) b[h] === F ? E[h][C] = A[h] : E[h][C] = D[h][C];
    }
    return u.createDenseMatrix({ data: E, size: [i, d], datatype: c === u._datatype && p === t._datatype ? g : void 0 });
  };
}), Oi = "matAlgo04xSidSid", $i = ["typed", "equalScalar"], Ii = W(Oi, $i, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, f = t._index, c = t._ptr, o = t._size, l = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), m = a._values, v = a._index, p = a._ptr, i = a._size, d = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (o.length !== i.length) throw new lr(o.length, i.length);
    if (o[0] !== i[0] || o[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + i + ")");
    var g = o[0], w = o[1], h, C = n, E = 0, A = s;
    typeof l == "string" && l === d && l !== "mixed" && (h = l, C = e.find(n, [h, h]), E = e.convert(0, h), A = e.find(s, [h, h]));
    var b = D && m ? [] : void 0, F = [], y = [], x = D && m ? [] : void 0, B = D && m ? [] : void 0, _ = [], M = [], S, T, N, q, z;
    for (T = 0; T < w; T++) {
      y[T] = F.length;
      var I = T + 1;
      for (q = c[T], z = c[T + 1], N = q; N < z; N++) S = f[N], F.push(S), _[S] = I, x && (x[S] = D[N]);
      for (q = p[T], z = p[T + 1], N = q; N < z; N++) if (S = v[N], _[S] === I) {
        if (x) {
          var P = A(x[S], m[N]);
          C(P, E) ? _[S] = null : x[S] = P;
        }
      } else F.push(S), M[S] = I, B && (B[S] = m[N]);
      if (x && B) for (N = y[T]; N < F.length; ) S = F[N], _[S] === I ? (b[N] = x[S], N++) : M[S] === I ? (b[N] = B[S], N++) : F.splice(N, 1);
    }
    return y[w] = F.length, t.createSparseMatrix({ values: b, index: F, ptr: y, size: [g, w], datatype: l === t._datatype && d === a._datatype ? h : void 0 });
  };
}), qi = "matAlgo10xSids", Ri = ["typed", "DenseMatrix"], Zn = W(qi, Ri, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var f = t._values, c = t._index, o = t._ptr, l = t._size, m = t._datatype;
    if (!f) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = l[0], p = l[1], i, d = s;
    typeof m == "string" && (i = m, a = e.convert(a, i), d = e.find(s, [i, i]));
    for (var g = [], w = [], h = [], C = 0; C < p; C++) {
      for (var E = C + 1, A = o[C], b = o[C + 1], F = A; F < b; F++) {
        var y = c[F];
        w[y] = f[F], h[y] = E;
      }
      for (var x = 0; x < v; x++) C === 0 && (g[x] = []), h[x] === E ? g[x][C] = D ? d(a, w[x]) : d(w[x], a) : g[x][C] = a;
    }
    return new n({ data: g, size: [v, p], datatype: i });
  };
}), Ui = "multiplyScalar", Pi = ["typed"], Li = W(Ui, Pi, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": qn, "Complex, Complex": function(u, t) {
    return u.mul(t);
  }, "BigNumber, BigNumber": function(u, t) {
    return u.times(t);
  }, "bigint, bigint": function(u, t) {
    return u * t;
  }, "Fraction, Fraction": function(u, t) {
    return u.mul(t);
  }, "number | Fraction | BigNumber | Complex, Unit": (n, u) => u.multiply(n), "Unit, number | Fraction | BigNumber | Complex | Unit": (n, u) => n.multiply(u) });
}), Ot = "multiply", Vi = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Zi = W(Ot, Vi, (r) => {
  var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: s } = r, D = hi({ typed: e, equalScalar: a }), f = Ln({ typed: e });
  function c(E, A) {
    switch (E.length) {
      case 1:
        switch (A.length) {
          case 1:
            if (E[0] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (E[0] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + E[0] + ") must match Matrix rows (" + A[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + A.length + " dimensions)");
        }
        break;
      case 2:
        switch (A.length) {
          case 1:
            if (E[1] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + E[1] + ") must match Vector length (" + A[0] + ")");
            break;
          case 2:
            if (E[1] !== A[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + E[1] + ") must match Matrix B rows (" + A[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + A.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + E.length + " dimensions)");
    }
  }
  function o(E, A, b) {
    if (b === 0) throw new Error("Cannot multiply two empty vectors");
    return s(E, A);
  }
  function l(E, A) {
    if (A.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
    return m(E, A);
  }
  function m(E, A) {
    var b = E._data, F = E._size, y = E._datatype || E.getDataType(), x = A._data, B = A._size, _ = A._datatype || A.getDataType(), M = F[0], S = B[1], T, N = u, q = t;
    y && _ && y === _ && typeof y == "string" && y !== "mixed" && (T = y, N = e.find(u, [T, T]), q = e.find(t, [T, T]));
    for (var z = [], I = 0; I < S; I++) {
      for (var P = q(b[0], x[0][I]), G = 1; G < M; G++) P = N(P, q(b[G], x[G][I]));
      z[I] = P;
    }
    return E.createDenseMatrix({ data: z, size: [S], datatype: y === E._datatype && _ === A._datatype ? T : void 0 });
  }
  var v = e("_multiplyMatrixVector", { "DenseMatrix, any": i, "SparseMatrix, any": w }), p = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": d, "DenseMatrix, SparseMatrix": g, "SparseMatrix, DenseMatrix": h, "SparseMatrix, SparseMatrix": C });
  function i(E, A) {
    var b = E._data, F = E._size, y = E._datatype || E.getDataType(), x = A._data, B = A._datatype || A.getDataType(), _ = F[0], M = F[1], S, T = u, N = t;
    y && B && y === B && typeof y == "string" && y !== "mixed" && (S = y, T = e.find(u, [S, S]), N = e.find(t, [S, S]));
    for (var q = [], z = 0; z < _; z++) {
      for (var I = b[z], P = N(I[0], x[0]), G = 1; G < M; G++) P = T(P, N(I[G], x[G]));
      q[z] = P;
    }
    return E.createDenseMatrix({ data: q, size: [_], datatype: y === E._datatype && B === A._datatype ? S : void 0 });
  }
  function d(E, A) {
    var b = E._data, F = E._size, y = E._datatype || E.getDataType(), x = A._data, B = A._size, _ = A._datatype || A.getDataType(), M = F[0], S = F[1], T = B[1], N, q = u, z = t;
    y && _ && y === _ && typeof y == "string" && y !== "mixed" && y !== "mixed" && (N = y, q = e.find(u, [N, N]), z = e.find(t, [N, N]));
    for (var I = [], P = 0; P < M; P++) {
      var G = b[P];
      I[P] = [];
      for (var $ = 0; $ < T; $++) {
        for (var O = z(G[0], x[0][$]), Z = 1; Z < S; Z++) O = q(O, z(G[Z], x[Z][$]));
        I[P][$] = O;
      }
    }
    return E.createDenseMatrix({ data: I, size: [M, T], datatype: y === E._datatype && _ === A._datatype ? N : void 0 });
  }
  function g(E, A) {
    var b = E._data, F = E._size, y = E._datatype || E.getDataType(), x = A._values, B = A._index, _ = A._ptr, M = A._size, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
    if (!x) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var T = F[0], N = M[1], q, z = u, I = t, P = a, G = 0;
    y && S && y === S && typeof y == "string" && y !== "mixed" && (q = y, z = e.find(u, [q, q]), I = e.find(t, [q, q]), P = e.find(a, [q, q]), G = e.convert(0, q));
    for (var $ = [], O = [], Z = [], Y = A.createSparseMatrix({ values: $, index: O, ptr: Z, size: [T, N], datatype: y === E._datatype && S === A._datatype ? q : void 0 }), L = 0; L < N; L++) {
      Z[L] = O.length;
      var R = _[L], Q = _[L + 1];
      if (Q > R) for (var U = 0, V = 0; V < T; V++) {
        for (var X = V + 1, J = void 0, j = R; j < Q; j++) {
          var er = B[j];
          U !== X ? (J = I(b[V][er], x[j]), U = X) : J = z(J, I(b[V][er], x[j]));
        }
        U === X && !P(J, G) && (O.push(V), $.push(J));
      }
    }
    return Z[N] = O.length, Y;
  }
  function w(E, A) {
    var b = E._values, F = E._index, y = E._ptr, x = E._datatype || E._data === void 0 ? E._datatype : E.getDataType();
    if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var B = A._data, _ = A._datatype || A.getDataType(), M = E._size[0], S = A._size[0], T = [], N = [], q = [], z, I = u, P = t, G = a, $ = 0;
    x && _ && x === _ && typeof x == "string" && x !== "mixed" && (z = x, I = e.find(u, [z, z]), P = e.find(t, [z, z]), G = e.find(a, [z, z]), $ = e.convert(0, z));
    var O = [], Z = [];
    q[0] = 0;
    for (var Y = 0; Y < S; Y++) {
      var L = B[Y];
      if (!G(L, $)) for (var R = y[Y], Q = y[Y + 1], U = R; U < Q; U++) {
        var V = F[U];
        Z[V] ? O[V] = I(O[V], P(L, b[U])) : (Z[V] = true, N.push(V), O[V] = P(L, b[U]));
      }
    }
    for (var X = N.length, J = 0; J < X; J++) {
      var j = N[J];
      T[J] = O[j];
    }
    return q[1] = N.length, E.createSparseMatrix({ values: T, index: N, ptr: q, size: [M, 1], datatype: x === E._datatype && _ === A._datatype ? z : void 0 });
  }
  function h(E, A) {
    var b = E._values, F = E._index, y = E._ptr, x = E._datatype || E._data === void 0 ? E._datatype : E.getDataType();
    if (!b) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var B = A._data, _ = A._datatype || A.getDataType(), M = E._size[0], S = A._size[0], T = A._size[1], N, q = u, z = t, I = a, P = 0;
    x && _ && x === _ && typeof x == "string" && x !== "mixed" && (N = x, q = e.find(u, [N, N]), z = e.find(t, [N, N]), I = e.find(a, [N, N]), P = e.convert(0, N));
    for (var G = [], $ = [], O = [], Z = E.createSparseMatrix({ values: G, index: $, ptr: O, size: [M, T], datatype: x === E._datatype && _ === A._datatype ? N : void 0 }), Y = [], L = [], R = 0; R < T; R++) {
      O[R] = $.length;
      for (var Q = R + 1, U = 0; U < S; U++) {
        var V = B[U][R];
        if (!I(V, P)) for (var X = y[U], J = y[U + 1], j = X; j < J; j++) {
          var er = F[j];
          L[er] !== Q ? (L[er] = Q, $.push(er), Y[er] = z(V, b[j])) : Y[er] = q(Y[er], z(V, b[j]));
        }
      }
      for (var ur = O[R], ar = $.length, ir = ur; ir < ar; ir++) {
        var or = $[ir];
        G[ir] = Y[or];
      }
    }
    return O[T] = $.length, Z;
  }
  function C(E, A) {
    var b = E._values, F = E._index, y = E._ptr, x = E._datatype || E._data === void 0 ? E._datatype : E.getDataType(), B = A._values, _ = A._index, M = A._ptr, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), T = E._size[0], N = A._size[1], q = b && B, z, I = u, P = t;
    x && S && x === S && typeof x == "string" && x !== "mixed" && (z = x, I = e.find(u, [z, z]), P = e.find(t, [z, z]));
    for (var G = q ? [] : void 0, $ = [], O = [], Z = E.createSparseMatrix({ values: G, index: $, ptr: O, size: [T, N], datatype: x === E._datatype && S === A._datatype ? z : void 0 }), Y = q ? [] : void 0, L = [], R, Q, U, V, X, J, j, er, ur = 0; ur < N; ur++) {
      O[ur] = $.length;
      var ar = ur + 1;
      for (X = M[ur], J = M[ur + 1], V = X; V < J; V++) if (er = _[V], q) for (Q = y[er], U = y[er + 1], R = Q; R < U; R++) j = F[R], L[j] !== ar ? (L[j] = ar, $.push(j), Y[j] = P(B[V], b[R])) : Y[j] = I(Y[j], P(B[V], b[R]));
      else for (Q = y[er], U = y[er + 1], R = Q; R < U; R++) j = F[R], L[j] !== ar && (L[j] = ar, $.push(j));
      if (q) for (var ir = O[ur], or = $.length, mr = ir; mr < or; mr++) {
        var vr = $[mr];
        G[mr] = Y[vr];
      }
    }
    return O[N] = $.length, Z;
  }
  return e(Ot, t, { "Array, Array": e.referTo("Matrix, Matrix", (E) => (A, b) => {
    c(fr(A), fr(b));
    var F = E(n(A), n(b));
    return pr(F) ? F.valueOf() : F;
  }), "Matrix, Matrix": function(A, b) {
    var F = A.size(), y = b.size();
    return c(F, y), F.length === 1 ? y.length === 1 ? o(A, b, F[0]) : l(A, b) : y.length === 1 ? v(A, b) : p(A, b);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (E) => (A, b) => E(A, n(b))), "Array, Matrix": e.referToSelf((E) => (A, b) => E(n(A, b.storage()), b)), "SparseMatrix, any": function(A, b) {
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
  }, "any, any": t, "any, any, ...any": e.referToSelf((E) => (A, b, F) => {
    for (var y = E(A, b), x = 0; x < F.length; x++) y = E(y, F[x]);
    return y;
  }) });
}), $t = "sign", Ji = ["typed", "BigNumber", "Fraction", "complex"], Qi = W($t, Ji, (r) => {
  var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
  return e($t, { number: Ge, Complex: function(s) {
    return s.im === 0 ? u(Ge(s.re)) : s.sign();
  }, BigNumber: function(s) {
    return new n(s.cmp(0));
  }, bigint: function(s) {
    return s > 0n ? 1n : s < 0n ? -1n : 0n;
  }, Fraction: function(s) {
    return new t(s.s);
  }, "Array | Matrix": e.referToSelf((a) => (s) => Or(s, a, true)), Unit: e.referToSelf((a) => (s) => {
    if (!s._isDerived() && s.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
    return e.find(a, s.valueType())(s.value);
  }) });
}), Wi = "sqrt", Yi = ["config", "typed", "Complex"], Gi = W(Wi, Yi, (r) => {
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
}), It = "subtract", Ki = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Xi = W(It, Ki, (r) => {
  var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: s, concat: D } = r, f = Vn({ typed: e }), c = ee({ typed: e }), o = bi({ typed: e, equalScalar: u }), l = Zn({ typed: e, DenseMatrix: s }), m = re({ typed: e, DenseMatrix: s }), v = Gr({ typed: e, matrix: n, concat: D });
  return e(It, { "any, any": t }, v({ elop: t, SS: o, DS: f, SD: c, Ss: m, sS: l }));
}), Hi = "matAlgo07xSSf", ki = ["typed", "SparseMatrix"], fe = W(Hi, ki, (r) => {
  var { typed: e, SparseMatrix: n } = r;
  return function(a, s, D) {
    var f = a._size, c = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), o = s._size, l = s._datatype || s._data === void 0 ? s._datatype : s.getDataType();
    if (f.length !== o.length) throw new lr(f.length, o.length);
    if (f[0] !== o[0] || f[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + o + ")");
    var m = f[0], v = f[1], p, i = 0, d = D;
    typeof c == "string" && c === l && c !== "mixed" && (p = c, i = e.convert(0, p), d = e.find(D, [p, p]));
    for (var g = [], w = [], h = new Array(v + 1).fill(0), C = [], E = [], A = [], b = [], F = 0; F < v; F++) {
      var y = F + 1, x = 0;
      u(a, F, A, C, y), u(s, F, b, E, y);
      for (var B = 0; B < m; B++) {
        var _ = A[B] === y ? C[B] : i, M = b[B] === y ? E[B] : i, S = d(_, M);
        S !== 0 && S !== false && (w.push(B), g.push(S), x++);
      }
      h[F + 1] = h[F] + x;
    }
    return new n({ values: g, index: w, ptr: h, size: [m, v], datatype: c === a._datatype && l === s._datatype ? p : void 0 });
  };
  function u(t, a, s, D, f) {
    for (var c = t._values, o = t._index, l = t._ptr, m = l[a], v = l[a + 1]; m < v; m++) {
      var p = o[m];
      s[p] = f, D[p] = c[m];
    }
  }
}), qt = "conj", ji = ["typed"], ro = W(qt, ji, (r) => {
  var { typed: e } = r;
  return e(qt, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.conjugate(), "Array | Matrix": e.referToSelf((n) => (u) => Or(u, n)) });
}), Rt = "im", eo = ["typed"], to = W(Rt, eo, (r) => {
  var { typed: e } = r;
  return e(Rt, { number: () => 0, "BigNumber | Fraction": (n) => n.mul(0), Complex: (n) => n.im, "Array | Matrix": e.referToSelf((n) => (u) => Or(u, n)) });
}), Ut = "re", no = ["typed"], uo = W(Ut, no, (r) => {
  var { typed: e } = r;
  return e(Ut, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.re, "Array | Matrix": e.referToSelf((n) => (u) => Or(u, n)) });
}), Pt = "concat", ao = ["typed", "matrix", "isInteger"], io = W(Pt, ao, (r) => {
  var { typed: e, matrix: n, isInteger: u } = r;
  return e(Pt, { "...Array | Matrix | number | BigNumber": function(a) {
    var s, D = a.length, f = -1, c, o = false, l = [];
    for (s = 0; s < D; s++) {
      var m = a[s];
      if (pr(m) && (o = true), dr(m) || Cr(m)) {
        if (s !== D - 1) throw new Error("Dimension must be specified as last argument");
        if (c = f, f = m.valueOf(), !u(f)) throw new TypeError("Integer number expected for dimension");
        if (f < 0 || s > 0 && f > c) throw new Yr(f, c + 1);
      } else {
        var v = sr(m).valueOf(), p = fr(v);
        if (l[s] = v, c = f, f = p.length - 1, s > 0 && f !== c) throw new lr(c + 1, f + 1);
      }
    }
    if (l.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var i = l.shift(); l.length; ) i = Mn(i, l.shift(), f);
    return o ? n(i) : i;
  }, "...string": function(a) {
    return a.join("");
  } });
}), Lt = "column", oo = ["typed", "Index", "matrix", "range"], so = W(Lt, oo, (r) => {
  var { typed: e, Index: n, matrix: u, range: t } = r;
  return e(Lt, { "Matrix, number": a, "Array, number": function(D, f) {
    return a(u(sr(D)), f).valueOf();
  } });
  function a(s, D) {
    if (s.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
    Er(D, s.size()[1]);
    var f = t(0, s.size()[0]), c = new n(f, D), o = s.subset(c);
    return pr(o) ? o : u([[o]]);
  }
}), Vt = "cross", fo = ["typed", "matrix", "subtract", "multiply"], co = W(Vt, fo, (r) => {
  var { typed: e, matrix: n, subtract: u, multiply: t } = r;
  return e(Vt, { "Matrix, Matrix": function(D, f) {
    return n(a(D.toArray(), f.toArray()));
  }, "Matrix, Array": function(D, f) {
    return n(a(D.toArray(), f));
  }, "Array, Matrix": function(D, f) {
    return n(a(D, f.toArray()));
  }, "Array, Array": a });
  function a(s, D) {
    var f = Math.max(fr(s).length, fr(D).length);
    s = Et(s), D = Et(D);
    var c = fr(s), o = fr(D);
    if (c.length !== 1 || o.length !== 1 || c[0] !== 3 || o[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + c.join(", ") + "], B = [" + o.join(", ") + "])");
    var l = [u(t(s[1], D[2]), t(s[2], D[1])), u(t(s[2], D[0]), t(s[0], D[2])), u(t(s[0], D[1]), t(s[1], D[0]))];
    return f > 1 ? [l] : l;
  }
}), Zt = "diag", lo = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], vo = W(Zt, lo, (r) => {
  var { typed: e, matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(Zt, { Array: function(c) {
    return a(c, 0, fr(c), null);
  }, "Array, number": function(c, o) {
    return a(c, o, fr(c), null);
  }, "Array, BigNumber": function(c, o) {
    return a(c, o.toNumber(), fr(c), null);
  }, "Array, string": function(c, o) {
    return a(c, 0, fr(c), o);
  }, "Array, number, string": function(c, o, l) {
    return a(c, o, fr(c), l);
  }, "Array, BigNumber, string": function(c, o, l) {
    return a(c, o.toNumber(), fr(c), l);
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
    if (!hr(c)) throw new TypeError("Second parameter in function diag must be an integer");
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
    if (pr(f)) {
      var p = f.diagonal(c);
      return o !== null ? o !== p.storage() ? n(p, o) : p : p.valueOf();
    }
    for (var i = Math.min(l[0] - m, l[1] - v), d = [], g = 0; g < i; g++) d[g] = f[g + m][g + v];
    return o !== null ? n(d) : d;
  }
}), Jt = "flatten", Do = ["typed"], po = W(Jt, Do, (r) => {
  var { typed: e } = r;
  return e(Jt, { Array: function(u) {
    return We(u);
  }, Matrix: function(u) {
    return u.create(We(u.valueOf(), true), u.datatype());
  } });
}), Qt = "getMatrixDataType", ho = ["typed"], mo = W(Qt, ho, (r) => {
  var { typed: e } = r;
  return e(Qt, { Array: function(u) {
    return Te(u, Rr);
  }, Matrix: function(u) {
    return u.getDataType();
  } });
}), Wt = "identity", go = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], yo = W(Wt, go, (r) => {
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
    var m = Cr(c) || Cr(o) ? t : null;
    if (Cr(c) && (c = c.toNumber()), Cr(o) && (o = o.toNumber()), !hr(c) || c < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!hr(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
    var v = m ? new t(1) : 1, p = m ? new m(0) : 0, i = [c, o];
    if (l) {
      if (l === "sparse") return s.diagonal(i, v, 0, p);
      if (l === "dense") return a.diagonal(i, v, 0, p);
      throw new TypeError('Unknown matrix type "'.concat(l, '"'));
    }
    for (var d = Fe([], i, p), g = c < o ? c : o, w = 0; w < g; w++) d[w][w] = v;
    return d;
  }
}), Yt = "kron", Ao = ["typed", "matrix", "multiplyScalar"], Fo = W(Yt, Ao, (r) => {
  var { typed: e, matrix: n, multiplyScalar: u } = r;
  return e(Yt, { "Matrix, Matrix": function(s, D) {
    return n(t(s.toArray(), D.toArray()));
  }, "Matrix, Array": function(s, D) {
    return n(t(s.toArray(), D));
  }, "Array, Matrix": function(s, D) {
    return n(t(s, D.toArray()));
  }, "Array, Array": t });
  function t(a, s) {
    if (fr(a).length === 1 && (a = [a]), fr(s).length === 1 && (s = [s]), fr(a).length > 2 || fr(s).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(a.length) + ", y = " + JSON.stringify(s.length) + ")");
    var D = [], f = [];
    return a.map(function(c) {
      return s.map(function(o) {
        return f = [], D.push(f), c.map(function(l) {
          return o.map(function(m) {
            return f.push(u(l, m));
          });
        });
      });
    }) && D;
  }
});
function Jn() {
  throw new Error('No "bignumber" implementation available');
}
function Eo() {
  throw new Error('No "fraction" implementation available');
}
function Qn() {
  throw new Error('No "matrix" implementation available');
}
var Gt = "range", Co = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], wo = W(Gt, Co, (r) => {
  var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: s, larger: D, largerEq: f, add: c, isPositive: o } = r;
  return e(Gt, { string: m, "string, boolean": m, number: function(d) {
    throw new TypeError("Too few arguments to function range(): ".concat(d));
  }, boolean: function(d) {
    throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(d, ", number|bigint|BigNumber|Fraction"));
  }, "number, number": function(d, g) {
    return l(v(d, g, 1, false));
  }, "number, number, number": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "number, number, boolean": function(d, g, w) {
    return l(v(d, g, 1, w));
  }, "number, number, number, boolean": function(d, g, w, h) {
    return l(v(d, g, w, h));
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
  }, "bigint, bigint|number, bigint|number, boolean": function(d, g, w, h) {
    return l(v(d, g, BigInt(w), h));
  }, "number, bigint, bigint|number, boolean": function(d, g, w, h) {
    return l(v(BigInt(d), g, BigInt(w), h));
  }, "BigNumber, BigNumber": function(d, g) {
    var w = d.constructor;
    return l(v(d, g, new w(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "BigNumber, BigNumber, boolean": function(d, g, w) {
    var h = d.constructor;
    return l(v(d, g, new h(1), w));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(d, g, w, h) {
    return l(v(d, g, w, h));
  }, "Fraction, Fraction": function(d, g) {
    return l(v(d, g, 1, false));
  }, "Fraction, Fraction, Fraction": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "Fraction, Fraction, boolean": function(d, g, w) {
    return l(v(d, g, 1, w));
  }, "Fraction, Fraction, Fraction, boolean": function(d, g, w, h) {
    return l(v(d, g, w, h));
  }, "Unit, Unit, Unit": function(d, g, w) {
    return l(v(d, g, w, false));
  }, "Unit, Unit, Unit, boolean": function(d, g, w, h) {
    return l(v(d, g, w, h));
  } });
  function l(i) {
    return n.matrix === "Matrix" ? u ? u(i) : Qn() : i;
  }
  function m(i, d) {
    var g = p(i);
    if (!g) throw new SyntaxError('String "' + i + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && Jn(), l(v(t(g.start), t(g.end), t(g.step)))) : l(v(g.start, g.end, g.step, d));
  }
  function v(i, d, g, w) {
    for (var h = [], C = o(g) ? w ? s : a : w ? f : D, E = i; C(E, d); ) h.push(E), E = c(E, g);
    return h;
  }
  function p(i) {
    var d = i.split(":"), g = d.map(function(h) {
      return Number(h);
    }), w = g.some(function(h) {
      return isNaN(h);
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
}), Kt = "reshape", bo = ["typed", "isInteger", "matrix"], _o = W(Kt, bo, (r) => {
  var { typed: e, isInteger: n } = r;
  return e(Kt, { "Matrix, Array": function(t, a) {
    return t.reshape(a, true);
  }, "Array, Array": function(t, a) {
    return a.forEach(function(s) {
      if (!n(s)) throw new TypeError("Invalid size for dimension: " + s);
    }), et(t, a);
  } });
}), Xt = "size", Bo = ["typed", "config", "?matrix"], xo = W(Xt, Bo, (r) => {
  var { typed: e, config: n, matrix: u } = r;
  return e(Xt, { Matrix: function(a) {
    return a.create(a.size(), "number");
  }, Array: fr, string: function(a) {
    return n.matrix === "Array" ? [a.length] : u([a.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(a) {
    return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : Qn();
  } });
}), Ht = "transpose", So = ["typed", "matrix"], Mo = W(Ht, So, (r) => {
  var { typed: e, matrix: n } = r;
  return e(Ht, { Array: (s) => u(n(s)).valueOf(), Matrix: u, any: sr });
  function u(s) {
    var D = s.size(), f;
    switch (D.length) {
      case 1:
        f = s.clone();
        break;
      case 2:
        {
          var c = D[0], o = D[1];
          if (o === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + gr(D) + ")");
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
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + gr(D) + ")");
    }
    return f;
  }
  function t(s, D, f) {
    for (var c = s._data, o = [], l, m = 0; m < f; m++) {
      l = o[m] = [];
      for (var v = 0; v < D; v++) l[v] = sr(c[v][m]);
    }
    return s.createDenseMatrix({ data: o, size: [f, D], datatype: s._datatype });
  }
  function a(s, D, f) {
    for (var c = s._values, o = s._index, l = s._ptr, m = c ? [] : void 0, v = [], p = [], i = [], d = 0; d < D; d++) i[d] = 0;
    var g, w, h;
    for (g = 0, w = o.length; g < w; g++) i[o[g]]++;
    for (var C = 0, E = 0; E < D; E++) p.push(C), C += i[E], i[E] = p[E];
    for (p.push(C), h = 0; h < f; h++) for (var A = l[h], b = l[h + 1], F = A; F < b; F++) {
      var y = i[o[F]]++;
      v[y] = h, c && (m[y] = sr(c[F]));
    }
    return s.createSparseMatrix({ values: m, index: v, ptr: p, size: [f, D], datatype: s._datatype });
  }
}), kt = "ctranspose", No = ["typed", "transpose", "conj"], To = W(kt, No, (r) => {
  var { typed: e, transpose: n, conj: u } = r;
  return e(kt, { any: function(a) {
    return u(n(a));
  } });
}), jt = "zeros", zo = ["typed", "config", "matrix", "BigNumber"], Oo = W(jt, zo, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t } = r;
  return e(jt, { "": function() {
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
      return f.length > 0 ? Fe(v, f, l) : v;
    }
  }
  function s(f) {
    var c = false;
    return f.forEach(function(o, l, m) {
      Cr(o) && (c = true, m[l] = o.toNumber());
    }), c;
  }
  function D(f) {
    f.forEach(function(c) {
      if (typeof c != "number" || !hr(c) || c < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), $o = "numeric", Io = ["number", "?bignumber", "?fraction"], qo = W($o, Io, (r) => {
  var { number: e, bignumber: n, fraction: u } = r, t = { string: true, number: true, BigNumber: true, Fraction: true }, a = { number: (s) => e(s), BigNumber: n ? (s) => n(s) : Jn, bigint: (s) => BigInt(s), Fraction: u ? (s) => u(s) : Eo };
  return function(D) {
    var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", c = arguments.length > 2 ? arguments[2] : void 0;
    if (c !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var o = Rr(D);
    if (!(o in t)) throw new TypeError("Cannot convert " + D + ' of type "' + o + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(f in a)) throw new TypeError("Cannot convert " + D + ' to type "' + f + '"; valid output types are ' + Object.keys(a).join(", "));
    return f === o ? D : a[f](D);
  };
}), rn = "divideScalar", Ro = ["typed", "numeric"], Uo = W(rn, Ro, (r) => {
  var { typed: e, numeric: n } = r;
  return e(rn, { "number, number": function(t, a) {
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
}), en = "pow", Po = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], Lo = W(en, Po, (r) => {
  var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: s, number: D, fraction: f, Complex: c } = r;
  return e(en, { "number, number": o, "Complex, Complex": function(p, i) {
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
    if (n.predictable && !hr(p) && v < 0) try {
      var i = f(p), d = D(i);
      if ((p === d || Math.abs((p - d) / p) < 1e-14) && i.d % 2n === 1n) return (i.n % 2n === 0n ? 1 : -1) * Math.pow(-v, p);
    } catch {
    }
    return n.predictable && (v < -1 && p === 1 / 0 || v > -1 && v < 0 && p === -1 / 0) ? NaN : hr(p) || v >= 0 || n.predictable ? Un(v, p) : v * v < 1 && p === 1 / 0 || v * v > 1 && p === -1 / 0 ? 0 : new c(v, 0).pow(p, 0);
  }
  function l(v, p) {
    if (!hr(p)) throw new TypeError("For A^b, b must be an integer (value is " + p + ")");
    var i = fr(v);
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
function Wn(r) {
  var { DenseMatrix: e } = r;
  return function(u, t, a) {
    var s = u.size();
    if (s.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + gr(s) + ")");
    var D = s[0], f = s[1];
    if (D !== f) throw new RangeError("Matrix must be square (size: " + gr(s) + ")");
    var c = [];
    if (pr(t)) {
      var o = t.size(), l = t._data;
      if (o.length === 1) {
        if (o[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var m = 0; m < D; m++) c[m] = [l[m]];
        return new e({ data: c, size: [D, 1], datatype: t._datatype });
      }
      if (o.length === 2) {
        if (o[0] !== D || o[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (mn(t)) {
          if (a) {
            c = [];
            for (var v = 0; v < D; v++) c[v] = [l[v][0]];
            return new e({ data: c, size: [D, 1], datatype: t._datatype });
          }
          return t;
        }
        if (gn(t)) {
          for (var p = 0; p < D; p++) c[p] = [0];
          for (var i = t._values, d = t._index, g = t._ptr, w = g[1], h = g[0]; h < w; h++) {
            var C = d[h];
            c[C][0] = i[h];
          }
          return new e({ data: c, size: [D, 1], datatype: t._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Ar(t)) {
      var E = fr(t);
      if (E.length === 1) {
        if (E[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var A = 0; A < D; A++) c[A] = [t[A]];
        return new e({ data: c, size: [D, 1] });
      }
      if (E.length === 2) {
        if (E[0] !== D || E[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var b = 0; b < D; b++) c[b] = [t[b][0]];
        return new e({ data: c, size: [D, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var tn = "usolve", Vo = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Zo = W(tn, Vo, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, f = Wn({ DenseMatrix: D });
  return e(tn, { "SparseMatrix, Array | Matrix": function(m, v) {
    return o(m, v);
  }, "DenseMatrix, Array | Matrix": function(m, v) {
    return c(m, v);
  }, "Array, Array | Matrix": function(m, v) {
    var p = n(m), i = c(p, v);
    return i.valueOf();
  } });
  function c(l, m) {
    m = f(l, m, true);
    for (var v = m._data, p = l._size[0], i = l._size[1], d = [], g = l._data, w = i - 1; w >= 0; w--) {
      var h = v[w][0] || 0, C = void 0;
      if (s(h, 0)) C = 0;
      else {
        var E = g[w][w];
        if (s(E, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        C = u(h, E);
        for (var A = w - 1; A >= 0; A--) v[A] = [a(v[A][0] || 0, t(C, g[A][w]))];
      }
      d[w] = [C];
    }
    return new D({ data: d, size: [p, 1] });
  }
  function o(l, m) {
    m = f(l, m, true);
    for (var v = m._data, p = l._size[0], i = l._size[1], d = l._values, g = l._index, w = l._ptr, h = [], C = i - 1; C >= 0; C--) {
      var E = v[C][0] || 0;
      if (s(E, 0)) h[C] = [0];
      else {
        for (var A = 0, b = [], F = [], y = w[C], x = w[C + 1], B = x - 1; B >= y; B--) {
          var _ = g[B];
          _ === C ? A = d[B] : _ < C && (b.push(d[B]), F.push(_));
        }
        if (s(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var M = u(E, A), S = 0, T = F.length; S < T; S++) {
          var N = F[S];
          v[N] = [a(v[N][0], t(M, b[S]))];
        }
        h[C] = [M];
      }
    }
    return new D({ data: h, size: [p, 1] });
  }
}), nn = "usolveAll", Jo = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Qo = W(nn, Jo, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, f = Wn({ DenseMatrix: D });
  return e(nn, { "SparseMatrix, Array | Matrix": function(m, v) {
    return o(m, v);
  }, "DenseMatrix, Array | Matrix": function(m, v) {
    return c(m, v);
  }, "Array, Array | Matrix": function(m, v) {
    var p = n(m), i = c(p, v);
    return i.map((d) => d.valueOf());
  } });
  function c(l, m) {
    for (var v = [f(l, m, true)._data.map((F) => F[0])], p = l._data, i = l._size[0], d = l._size[1], g = d - 1; g >= 0; g--) for (var w = v.length, h = 0; h < w; h++) {
      var C = v[h];
      if (s(p[g][g], 0)) if (s(C[g], 0)) {
        if (h === 0) {
          var A = [...C];
          A[g] = 1;
          for (var b = g - 1; b >= 0; b--) A[b] = a(A[b], p[b][g]);
          v.push(A);
        }
      } else {
        if (h === 0) return [];
        v.splice(h, 1), h -= 1, w -= 1;
      }
      else {
        C[g] = u(C[g], p[g][g]);
        for (var E = g - 1; E >= 0; E--) C[E] = a(C[E], t(C[g], p[E][g]));
      }
    }
    return v.map((F) => new D({ data: F.map((y) => [y]), size: [i, 1] }));
  }
  function o(l, m) {
    for (var v = [f(l, m, true)._data.map((G) => G[0])], p = l._size[0], i = l._size[1], d = l._values, g = l._index, w = l._ptr, h = i - 1; h >= 0; h--) for (var C = v.length, E = 0; E < C; E++) {
      for (var A = v[E], b = [], F = [], y = w[h], x = w[h + 1], B = 0, _ = x - 1; _ >= y; _--) {
        var M = g[_];
        M === h ? B = d[_] : M < h && (b.push(d[_]), F.push(M));
      }
      if (s(B, 0)) if (s(A[h], 0)) {
        if (E === 0) {
          var q = [...A];
          q[h] = 1;
          for (var z = 0, I = F.length; z < I; z++) {
            var P = F[z];
            q[P] = a(q[P], b[z]);
          }
          v.push(q);
        }
      } else {
        if (E === 0) return [];
        v.splice(E, 1), E -= 1, C -= 1;
      }
      else {
        A[h] = u(A[h], B);
        for (var S = 0, T = F.length; S < T; S++) {
          var N = F[S];
          A[N] = a(A[N], t(A[h], b[S]));
        }
      }
    }
    return v.map((G) => new D({ data: G.map(($) => [$]), size: [p, 1] }));
  }
}), we = "equal", Wo = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat", "SparseMatrix"], Yo = W(we, Wo, (r) => {
  var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ee({ typed: e }), f = fe({ typed: e, SparseMatrix: s }), c = re({ typed: e, DenseMatrix: t }), o = Gr({ typed: e, matrix: n, concat: a });
  return e(we, Go({ typed: e, equalScalar: u }), o({ elop: u, SS: f, DS: D, Ss: c }));
}), Go = W(we, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(we, { "any, any": function(t, a) {
    return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
  } });
}), be = "smaller", Ko = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Xo = W(be, Ko, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, f = ee({ typed: e }), c = fe({ typed: e, SparseMatrix: D }), o = re({ typed: e, DenseMatrix: a }), l = Gr({ typed: e, matrix: t, concat: s }), m = se({ typed: e });
  function v(p, i) {
    return p.lt(i) && !jr(p, i, n.relTol, n.absTol);
  }
  return e(be, Ho({ typed: e, config: n }), { "boolean, boolean": (p, i) => p < i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p < i, "Fraction, Fraction": (p, i) => p.compare(i) === -1, "Fraction, BigNumber": function(i, d) {
    return v(u(i), d);
  }, "BigNumber, Fraction": function(i, d) {
    return v(i, u(d));
  }, "Complex, Complex": function(i, d) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, m, l({ SS: c, DS: f, Ss: o }));
}), Ho = W(be, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(be, { "number, number": function(t, a) {
    return t < a && !Lr(t, a, n.relTol, n.absTol);
  } });
}), _e = "smallerEq", ko = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], jo = W(_e, ko, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ee({ typed: e }), f = fe({ typed: e, SparseMatrix: s }), c = re({ typed: e, DenseMatrix: t }), o = Gr({ typed: e, matrix: u, concat: a }), l = se({ typed: e });
  return e(_e, rs({ typed: e, config: n }), { "boolean, boolean": (m, v) => m <= v, "BigNumber, BigNumber": function(v, p) {
    return v.lte(p) || jr(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": (m, v) => m <= v, "Fraction, Fraction": (m, v) => m.compare(v) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: f, DS: D, Ss: c }));
}), rs = W(_e, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(_e, { "number, number": function(t, a) {
    return t <= a || Lr(t, a, n.relTol, n.absTol);
  } });
}), Be = "larger", es = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], ts = W(Be, es, (r) => {
  var { typed: e, config: n, bignumber: u, matrix: t, DenseMatrix: a, concat: s, SparseMatrix: D } = r, f = ee({ typed: e }), c = fe({ typed: e, SparseMatrix: D }), o = re({ typed: e, DenseMatrix: a }), l = Gr({ typed: e, matrix: t, concat: s }), m = se({ typed: e });
  function v(p, i) {
    return p.gt(i) && !jr(p, i, n.relTol, n.absTol);
  }
  return e(Be, ns({ typed: e, config: n }), { "boolean, boolean": (p, i) => p > i, "BigNumber, BigNumber": v, "bigint, bigint": (p, i) => p > i, "Fraction, Fraction": (p, i) => p.compare(i) === 1, "Fraction, BigNumber": function(i, d) {
    return v(u(i), d);
  }, "BigNumber, Fraction": function(i, d) {
    return v(i, u(d));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, m, l({ SS: c, DS: f, Ss: o }));
}), ns = W(Be, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(Be, { "number, number": function(t, a) {
    return t > a && !Lr(t, a, n.relTol, n.absTol);
  } });
}), xe = "largerEq", us = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], as = W(xe, us, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a, SparseMatrix: s } = r, D = ee({ typed: e }), f = fe({ typed: e, SparseMatrix: s }), c = re({ typed: e, DenseMatrix: t }), o = Gr({ typed: e, matrix: u, concat: a }), l = se({ typed: e });
  return e(xe, is({ typed: e, config: n }), { "boolean, boolean": (m, v) => m >= v, "BigNumber, BigNumber": function(v, p) {
    return v.gte(p) || jr(v, p, n.relTol, n.absTol);
  }, "bigint, bigint": function(v, p) {
    return v >= p;
  }, "Fraction, Fraction": (m, v) => m.compare(v) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, l, o({ SS: f, DS: D, Ss: c }));
}), is = W(xe, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(xe, { "number, number": function(t, a) {
    return t >= a || Lr(t, a, n.relTol, n.absTol);
  } });
}), os = "ImmutableDenseMatrix", ss = ["smaller", "DenseMatrix"], fs = W(os, ss, (r) => {
  var { smaller: e, DenseMatrix: n } = r;
  function u(t, a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !qr(a)) throw new Error("Invalid datatype: " + a);
    if (pr(t) || Ar(t)) {
      var s = new n(t, a);
      this._data = s._data, this._size = s._size, this._datatype = s._datatype, this._min = null, this._max = null;
    } else if (t && Ar(t.data) && Ar(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t) throw new TypeError("Unsupported type of data (" + Rr(t) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return u.prototype = new n(), u.prototype.type = "ImmutableDenseMatrix", u.prototype.isImmutableDenseMatrix = true, u.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var a = n.prototype.subset.call(this, t);
        return pr(a) ? new u({ data: a._data, size: a._size, datatype: a._datatype }) : a;
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
    return new u({ data: sr(this._data), size: sr(this._size), datatype: this._datatype });
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
}, { isClass: true }), cs = "Index", ls = ["ImmutableDenseMatrix", "getMatrixDataType"], vs = W(cs, ls, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
  function u(a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var s = 0, D = arguments.length; s < D; s++) {
      var f = arguments[s], c = Ar(f), o = pr(f), l = typeof f, m = null;
      if (yn(f)) this._dimensions.push(f), this._isScalar = false;
      else if (c || o) {
        var v = void 0;
        n(f) === "boolean" ? (c && (v = t(un(f).valueOf())), o && (v = t(un(f._data).valueOf())), m = f.valueOf().length) : v = t(f.valueOf()), this._dimensions.push(v);
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
    for (var s = 0, D = a.length; s < D; s++) if (typeof a[s] != "number" || !hr(a[s])) throw new TypeError("Index parameters must be positive integer numbers");
    return new e(a);
  }
  return u.prototype.clone = function() {
    var a = new u();
    return a._dimensions = sr(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
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
function un(r) {
  var e = [];
  return r.forEach((n, u) => {
    n && e.push(u);
  }), e;
}
var Ds = "atan", ps = ["typed"], ds = W(Ds, ps, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(u) {
    return Math.atan(u);
  }, Complex: function(u) {
    return u.atan();
  }, BigNumber: function(u) {
    return u.atan();
  } });
}), Yn = W("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((n) => (u) => {
    if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(n, u.valueType())(u.value);
  }) };
}), an = "cos", hs = ["typed"], ms = W(an, hs, (r) => {
  var { typed: e } = r, n = Yn({ typed: e });
  return e(an, { number: Math.cos, "Complex | BigNumber": (u) => u.cos() }, n);
}), on = "sin", gs = ["typed"], ys = W(on, gs, (r) => {
  var { typed: e } = r, n = Yn({ typed: e });
  return e(on, { number: Math.sin, "Complex | BigNumber": (u) => u.sin() }, n);
}), sn = "add", As = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], Fs = W(sn, As, (r) => {
  var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: s, concat: D } = r, f = Vn({ typed: e }), c = Ii({ typed: e, equalScalar: t }), o = Zn({ typed: e, DenseMatrix: a }), l = Gr({ typed: e, matrix: n, concat: D });
  return e(sn, { "any, any": u, "any, any, ...any": e.referToSelf((m) => (v, p, i) => {
    for (var d = m(v, p), g = 0; g < i.length; g++) d = m(d, i[g]);
    return d;
  }) }, l({ elop: u, DS: f, SS: c, Ss: o }));
}), fn = "norm", Es = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], Cs = W(fn, Es, (r) => {
  var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: s, multiply: D, equalScalar: f, larger: c, smaller: o, matrix: l, ctranspose: m, eigs: v } = r;
  return e(fn, { number: Math.abs, Complex: function(F) {
    return F.abs();
  }, BigNumber: function(F) {
    return F.abs();
  }, boolean: function(F) {
    return Math.abs(F);
  }, Array: function(F) {
    return A(l(F), 2);
  }, Matrix: function(F) {
    return A(F, 2);
  }, "Array, number | BigNumber | string": function(F, y) {
    return A(l(F), y);
  }, "Matrix, number | BigNumber | string": function(F, y) {
    return A(F, y);
  } });
  function p(b) {
    var F = 0;
    return b.forEach(function(y) {
      var x = n(y);
      c(x, F) && (F = x);
    }, true), F;
  }
  function i(b) {
    var F;
    return b.forEach(function(y) {
      var x = n(y);
      (!F || o(x, F)) && (F = x);
    }, true), F || 0;
  }
  function d(b, F) {
    if (F === Number.POSITIVE_INFINITY || F === "inf") return p(b);
    if (F === Number.NEGATIVE_INFINITY || F === "-inf") return i(b);
    if (F === "fro") return A(b, 2);
    if (typeof F == "number" && !isNaN(F)) {
      if (!f(F, 0)) {
        var y = 0;
        return b.forEach(function(x) {
          y = u(t(n(x), F), y);
        }, true), t(y, 1 / F);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function g(b) {
    var F = 0;
    return b.forEach(function(y, x) {
      F = u(F, D(y, a(y)));
    }), n(s(F));
  }
  function w(b) {
    var F = [], y = 0;
    return b.forEach(function(x, B) {
      var _ = B[1], M = u(F[_] || 0, n(x));
      c(M, y) && (y = M), F[_] = M;
    }, true), y;
  }
  function h(b) {
    var F = b.size();
    if (F[0] !== F[1]) throw new RangeError("Invalid matrix dimensions");
    var y = m(b), x = D(y, b), B = v(x).values.toArray(), _ = B[B.length - 1];
    return n(s(_));
  }
  function C(b) {
    var F = [], y = 0;
    return b.forEach(function(x, B) {
      var _ = B[0], M = u(F[_] || 0, n(x));
      c(M, y) && (y = M), F[_] = M;
    }, true), y;
  }
  function E(b, F) {
    if (F === 1) return w(b);
    if (F === Number.POSITIVE_INFINITY || F === "inf") return C(b);
    if (F === "fro") return g(b);
    if (F === 2) return h(b);
    throw new Error("Unsupported parameter value " + F);
  }
  function A(b, F) {
    var y = b.size();
    if (y.length === 1) return d(b, F);
    if (y.length === 2) {
      if (y[0] && y[1]) return E(b, F);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), cn = "dot", ws = ["typed", "addScalar", "multiplyScalar", "conj", "size"], bs = W(cn, ws, (r) => {
  var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
  return e(cn, { "Array | DenseMatrix, Array | DenseMatrix": D, "SparseMatrix, SparseMatrix": f });
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
    var m = s(o, l), v = pr(o) ? o._data : o, p = pr(o) ? o._datatype || o.getDataType() : void 0, i = pr(l) ? l._data : l, d = pr(l) ? l._datatype || l.getDataType() : void 0, g = c(o).length === 2, w = c(l).length === 2, h = n, C = u;
    if (p && d && p === d && typeof p == "string" && p !== "mixed") {
      var E = p;
      h = e.find(n, [E, E]), C = e.find(u, [E, E]);
    }
    if (!g && !w) {
      for (var A = C(t(v[0]), i[0]), b = 1; b < m; b++) A = h(A, C(t(v[b]), i[b]));
      return A;
    }
    if (!g && w) {
      for (var F = C(t(v[0]), i[0][0]), y = 1; y < m; y++) F = h(F, C(t(v[y]), i[y][0]));
      return F;
    }
    if (g && !w) {
      for (var x = C(t(v[0][0]), i[0]), B = 1; B < m; B++) x = h(x, C(t(v[B][0]), i[B]));
      return x;
    }
    if (g && w) {
      for (var _ = C(t(v[0][0]), i[0][0]), M = 1; M < m; M++) _ = h(_, C(t(v[M][0]), i[M][0]));
      return _;
    }
  }
  function f(o, l) {
    s(o, l);
    for (var m = o._index, v = o._values, p = l._index, i = l._values, d = 0, g = n, w = u, h = 0, C = 0; h < m.length && C < p.length; ) {
      var E = m[h], A = p[C];
      if (E < A) {
        h++;
        continue;
      }
      if (E > A) {
        C++;
        continue;
      }
      E === A && (d = g(d, w(v[h], i[C])), h++, C++);
    }
    return d;
  }
  function c(o) {
    return pr(o) ? o.size() : a(o);
  }
}), ln = "qr", _s = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], Bs = W(ln, _s, (r) => {
  var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: s, sign: D, sqrt: f, conj: c, unaryMinus: o, addScalar: l, divideScalar: m, multiplyScalar: v, subtractScalar: p, complex: i } = r;
  return Se(e(ln, { DenseMatrix: function(C) {
    return g(C);
  }, SparseMatrix: function(C) {
    return w();
  }, Array: function(C) {
    var E = n(C), A = g(E);
    return { Q: A.Q.valueOf(), R: A.R.valueOf() };
  } }), { _denseQRimpl: d });
  function d(h) {
    var C = h._size[0], E = h._size[1], A = t([C], "dense"), b = A._data, F = h.clone(), y = F._data, x, B, _, M = u([C], "");
    for (_ = 0; _ < Math.min(E, C); ++_) {
      var S = y[_][_], T = o(s(S, 0) ? 1 : D(S)), N = c(T), q = 0;
      for (x = _; x < C; x++) q = l(q, v(y[x][_], c(y[x][_])));
      var z = v(T, f(q));
      if (!a(z)) {
        var I = p(S, z);
        for (M[_] = 1, x = _ + 1; x < C; x++) M[x] = m(y[x][_], I);
        var P = o(c(m(I, z))), G = void 0;
        for (B = _; B < E; B++) {
          for (G = 0, x = _; x < C; x++) G = l(G, v(c(M[x]), y[x][B]));
          for (G = v(G, P), x = _; x < C; x++) y[x][B] = v(p(y[x][B], v(M[x], G)), N);
        }
        for (x = 0; x < C; x++) {
          for (G = 0, B = _; B < C; B++) G = l(G, v(b[x][B], M[B]));
          for (G = v(G, P), B = _; B < C; ++B) b[x][B] = m(p(b[x][B], v(G, c(M[B]))), N);
        }
      }
    }
    return { Q: A, R: F, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function g(h) {
    var C = d(h), E = C.R._data;
    if (h._data.length > 0) for (var A = E[0][0].type === "Complex" ? i(0) : 0, b = 0; b < E.length; ++b) for (var F = 0; F < b && F < (E[0] || []).length; ++F) E[b][F] = A;
    return C;
  }
  function w(h) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
}), vn = "det", xs = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], Ss = W(vn, xs, (r) => {
  var { typed: e, matrix: n, subtractScalar: u, multiply: t, divideScalar: a, isZero: s, unaryMinus: D } = r;
  return e(vn, { any: function(o) {
    return sr(o);
  }, "Array | Matrix": function(o) {
    var l;
    switch (pr(o) ? l = o.size() : Array.isArray(o) ? (o = n(o), l = o.size()) : l = [], l.length) {
      case 0:
        return sr(o);
      case 1:
        if (l[0] === 1) return sr(o.valueOf()[0]);
        if (l[0] === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + gr(l) + ")");
      case 2: {
        var m = l[0], v = l[1];
        if (m === v) return f(o.clone().valueOf(), m);
        if (v === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + gr(l) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + gr(l) + ")");
    }
  } });
  function f(c, o, l) {
    if (o === 1) return sr(c[0][0]);
    if (o === 2) return u(t(c[0][0], c[1][1]), t(c[1][0], c[0][1]));
    for (var m = false, v = new Array(o).fill(0).map((b, F) => F), p = 0; p < o; p++) {
      var i = v[p];
      if (s(c[i][p])) {
        var d = void 0;
        for (d = p + 1; d < o; d++) if (!s(c[v[d]][p])) {
          i = v[d], v[d] = v[p], v[p] = i, m = !m;
          break;
        }
        if (d === o) return c[i][p];
      }
      for (var g = c[i][p], w = p === 0 ? 1 : c[v[p - 1]][p - 1], h = p + 1; h < o; h++) for (var C = v[h], E = p + 1; E < o; E++) c[C][E] = a(u(t(c[C][E], g), t(c[C][p], c[i][E])), w);
    }
    var A = c[v[o - 1]][o - 1];
    return m ? D(A) : A;
  }
}), Dn = "inv", Ms = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], Ns = W(Dn, Ms, (r) => {
  var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: s, det: D, identity: f, abs: c } = r;
  return e(Dn, { "Array | Matrix": function(m) {
    var v = pr(m) ? m.size() : fr(m);
    switch (v.length) {
      case 1:
        if (v[0] === 1) return pr(m) ? n([u(1, m.valueOf()[0])]) : [u(1, m[0])];
        throw new RangeError("Matrix must be square (size: " + gr(v) + ")");
      case 2: {
        var p = v[0], i = v[1];
        if (p === i) return pr(m) ? n(o(m.valueOf(), p, i), m.storage()) : o(m, p, i);
        throw new RangeError("Matrix must be square (size: " + gr(v) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + gr(v) + ")");
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
      var h = D(l);
      if (h === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(l[1][1], h), u(s(l[0][1]), h)], [u(s(l[1][0]), h), u(l[0][0], h)]];
    } else {
      var C = l.concat();
      for (p = 0; p < m; p++) C[p] = C[p].concat();
      for (var E = f(m).valueOf(), A = 0; A < v; A++) {
        var b = c(C[A][A]), F = A;
        for (p = A + 1; p < m; ) c(C[p][A]) > b && (b = c(C[p][A]), F = p), p++;
        if (b === 0) throw Error("Cannot calculate inverse, determinant is zero");
        p = F, p !== A && (w = C[A], C[A] = C[p], C[p] = w, w = E[A], E[A] = E[p], E[p] = w);
        var y = C[A], x = E[A];
        for (p = 0; p < m; p++) {
          var B = C[p], _ = E[p];
          if (p !== A) {
            if (B[A] !== 0) {
              for (d = u(s(B[A]), y[A]), i = A; i < v; i++) B[i] = t(B[i], a(d, y[i]));
              for (i = 0; i < v; i++) _[i] = t(_[i], a(d, x[i]));
            }
          } else {
            for (d = y[A], i = A; i < v; i++) B[i] = u(B[i], d);
            for (i = 0; i < v; i++) _[i] = u(_[i], d);
          }
        }
      }
      return E;
    }
  }
});
function Ts(r) {
  var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: s, sqrt: D, abs: f, bignumber: c, diag: o, size: l, reshape: m, inv: v, qr: p, usolve: i, usolveAll: d, equal: g, complex: w, larger: h, smaller: C, matrixFromColumns: E, dot: A } = r;
  function b($, O, Z, Y) {
    var L = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, R = F($, O, Z, Y, L);
    y($, O, Z, Y, L, R);
    var { values: Q, C: U } = x($, O, Z, Y, L);
    if (L) {
      var V = B($, O, U, R, Q, Z, Y);
      return { values: Q, eigenvectors: V };
    }
    return { values: Q };
  }
  function F($, O, Z, Y, L) {
    var R = Y === "BigNumber", Q = Y === "Complex", U = R ? c(0) : 0, V = R ? c(1) : Q ? w(1) : 1, X = R ? c(1) : 1, J = R ? c(10) : 2, j = a(J, J), er;
    L && (er = Array(O).fill(V));
    for (var ur = false; !ur; ) {
      ur = true;
      for (var ar = 0; ar < O; ar++) {
        for (var ir = U, or = U, mr = 0; mr < O; mr++) ar !== mr && (ir = e(ir, f($[mr][ar])), or = e(or, f($[ar][mr])));
        if (!g(ir, 0) && !g(or, 0)) {
          for (var vr = X, Dr = ir, wr = s(or, J), br = a(or, J); C(Dr, wr); ) Dr = a(Dr, j), vr = a(vr, J);
          for (; h(Dr, br); ) Dr = s(Dr, j), vr = s(vr, J);
          var Fr = C(s(e(Dr, or), vr), a(e(ir, or), 0.95));
          if (Fr) {
            ur = false;
            for (var tr = s(1, vr), rr = 0; rr < O; rr++) ar !== rr && ($[ar][rr] = a($[ar][rr], tr), $[rr][ar] = a($[rr][ar], vr));
            L && (er[ar] = a(er[ar], tr));
          }
        }
      }
    }
    return L ? o(er) : null;
  }
  function y($, O, Z, Y, L, R) {
    var Q = Y === "BigNumber", U = Y === "Complex", V = Q ? c(0) : U ? w(0) : 0;
    Q && (Z = c(Z));
    for (var X = 0; X < O - 2; X++) {
      for (var J = 0, j = V, er = X + 1; er < O; er++) {
        var ur = $[er][X];
        C(f(j), f(ur)) && (j = ur, J = er);
      }
      if (!C(f(j), Z)) {
        if (J !== X + 1) {
          var ar = $[J];
          $[J] = $[X + 1], $[X + 1] = ar;
          for (var ir = 0; ir < O; ir++) {
            var or = $[ir][J];
            $[ir][J] = $[ir][X + 1], $[ir][X + 1] = or;
          }
          if (L) {
            var mr = R[J];
            R[J] = R[X + 1], R[X + 1] = mr;
          }
        }
        for (var vr = X + 2; vr < O; vr++) {
          var Dr = s($[vr][X], j);
          if (Dr !== 0) {
            for (var wr = 0; wr < O; wr++) $[vr][wr] = n($[vr][wr], a(Dr, $[X + 1][wr]));
            for (var br = 0; br < O; br++) $[br][X + 1] = e($[br][X + 1], a(Dr, $[br][vr]));
            if (L) for (var Fr = 0; Fr < O; Fr++) R[vr][Fr] = n(R[vr][Fr], a(Dr, R[X + 1][Fr]));
          }
        }
      }
    }
    return R;
  }
  function x($, O, Z, Y, L) {
    var R = Y === "BigNumber", Q = Y === "Complex", U = R ? c(1) : Q ? w(1) : 1;
    R && (Z = c(Z));
    for (var V = sr($), X = [], J = O, j = [], er = L ? o(Array(O).fill(U)) : void 0, ur = L ? o(Array(J).fill(U)) : void 0, ar = 0; ar <= 100; ) {
      ar += 1;
      for (var ir = V[J - 1][J - 1], or = 0; or < J; or++) V[or][or] = n(V[or][or], ir);
      var { Q: mr, R: vr } = p(V);
      V = t(vr, mr);
      for (var Dr = 0; Dr < J; Dr++) V[Dr][Dr] = e(V[Dr][Dr], ir);
      if (L && (ur = t(ur, mr)), J === 1 || C(f(V[J - 1][J - 2]), Z)) {
        ar = 0, X.push(V[J - 1][J - 1]), L && (j.unshift([[1]]), S(ur, O), er = t(er, ur), J > 1 && (ur = o(Array(J - 1).fill(U)))), J -= 1, V.pop();
        for (var wr = 0; wr < J; wr++) V[wr].pop();
      } else if (J === 2 || C(f(V[J - 2][J - 3]), Z)) {
        ar = 0;
        var br = _(V[J - 2][J - 2], V[J - 2][J - 1], V[J - 1][J - 2], V[J - 1][J - 1]);
        X.push(...br), L && (j.unshift(M(V[J - 2][J - 2], V[J - 2][J - 1], V[J - 1][J - 2], V[J - 1][J - 1], br[0], br[1], Z, Y)), S(ur, O), er = t(er, ur), J > 2 && (ur = o(Array(J - 2).fill(U)))), J -= 2, V.pop(), V.pop();
        for (var Fr = 0; Fr < J; Fr++) V[Fr].pop(), V[Fr].pop();
      }
      if (J === 0) break;
    }
    if (X.sort((pe, Ur) => +n(f(pe), f(Ur))), ar > 100) {
      var tr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + X.join(", "));
      throw tr.values = X, tr.vectors = [], tr;
    }
    var rr = L ? t(er, T(j, O)) : void 0;
    return { values: X, C: rr };
  }
  function B($, O, Z, Y, L, R, Q) {
    var U = v(Z), V = t(U, $, Z), X = Q === "BigNumber", J = Q === "Complex", j = X ? c(0) : J ? w(0) : 0, er = X ? c(1) : J ? w(1) : 1, ur = [], ar = [];
    for (var ir of L) {
      var or = N(ur, ir, g);
      or === -1 ? (ur.push(ir), ar.push(1)) : ar[or] += 1;
    }
    for (var mr = [], vr = ur.length, Dr = Array(O).fill(j), wr = o(Array(O).fill(er)), br = function() {
      var rr = ur[Fr], pe = n(V, t(rr, wr)), Ur = d(pe, Dr);
      for (Ur.shift(); Ur.length < ar[Fr]; ) {
        var vt = q(pe, O, Ur, R, Q);
        if (vt === null) break;
        Ur.push(vt);
      }
      var ru = t(v(Y), Z);
      Ur = Ur.map((Pe) => t(ru, Pe)), mr.push(...Ur.map((Pe) => ({ value: rr, vector: u(Pe) })));
    }, Fr = 0; Fr < vr; Fr++) br();
    return mr;
  }
  function _($, O, Z, Y) {
    var L = e($, Y), R = n(a($, Y), a(O, Z)), Q = a(L, 0.5), U = a(D(n(a(L, L), a(4, R))), 0.5);
    return [e(Q, U), n(Q, U)];
  }
  function M($, O, Z, Y, L, R, Q, U) {
    var V = U === "BigNumber", X = U === "Complex", J = V ? c(0) : X ? w(0) : 0, j = V ? c(1) : X ? w(1) : 1;
    if (C(f(Z), Q)) return [[j, J], [J, j]];
    if (h(f(n(L, R)), Q)) return [[n(L, Y), n(R, Y)], [Z, Z]];
    var er = n($, L), ur = n(Y, L);
    return C(f(O), Q) && C(f(ur), Q) ? [[er, j], [Z, J]] : [[O, J], [ur, j]];
  }
  function S($, O) {
    for (var Z = 0; Z < $.length; Z++) $[Z].push(...Array(O - $[Z].length).fill(0));
    for (var Y = $.length; Y < O; Y++) $.push(Array(O).fill(0)), $[Y][Y] = 1;
    return $;
  }
  function T($, O) {
    for (var Z = [], Y = 0; Y < O; Y++) Z[Y] = Array(O).fill(0);
    var L = 0;
    for (var R of $) {
      for (var Q = R.length, U = 0; U < Q; U++) for (var V = 0; V < Q; V++) Z[L + U][L + V] = R[U][V];
      L += Q;
    }
    return Z;
  }
  function N($, O, Z) {
    for (var Y = 0; Y < $.length; Y++) if (Z($[Y], O)) return Y;
    return -1;
  }
  function q($, O, Z, Y, L) {
    for (var R = L === "BigNumber" ? c(1e3) : 1e3, Q, U = 0; U < 5; ++U) {
      Q = z(O, Z, L);
      try {
        Q = i($, Q);
      } catch {
        continue;
      }
      if (h(P(Q), R)) break;
    }
    if (U >= 5) return null;
    for (U = 0; ; ) {
      var V = i($, Q);
      if (C(P(I(Q, [V])), Y)) break;
      if (++U >= 10) return null;
      Q = G(V);
    }
    return Q;
  }
  function z($, O, Z) {
    var Y = Z === "BigNumber", L = Z === "Complex", R = Array($).fill(0).map((Q) => 2 * Math.random() - 1);
    return Y && (R = R.map((Q) => c(Q))), L && (R = R.map((Q) => w(Q))), R = I(R, O), G(R, Z);
  }
  function I($, O) {
    var Z = l($);
    for (var Y of O) Y = m(Y, Z), $ = n($, t(s(A(Y, $), A(Y, Y)), Y));
    return $;
  }
  function P($) {
    return f(D(A($, $)));
  }
  function G($, O) {
    var Z = O === "BigNumber", Y = O === "Complex", L = Z ? c(1) : Y ? w(1) : 1;
    return t(s(L, P($)), $);
  }
  return b;
}
function zs(r) {
  var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: s, sin: D, multiplyScalar: f, inv: c, bignumber: o, multiply: l, add: m } = r;
  function v(y, x) {
    var B = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, _ = arguments.length > 3 ? arguments[3] : void 0, M = arguments.length > 4 ? arguments[4] : void 0;
    if (_ === "number") return p(y, B, M);
    if (_ === "BigNumber") return i(y, B, M);
    throw TypeError("Unsupported data type: " + _);
  }
  function p(y, x, B) {
    var _ = y.length, M = Math.abs(x / _), S, T;
    if (B) {
      T = new Array(_);
      for (var N = 0; N < _; N++) T[N] = Array(_).fill(0), T[N][N] = 1;
    }
    for (var q = A(y); Math.abs(q[1]) >= Math.abs(M); ) {
      var z = q[0][0], I = q[0][1];
      S = d(y[z][z], y[I][I], y[z][I]), y = E(y, S, z, I), B && (T = w(T, S, z, I)), q = A(y);
    }
    for (var P = Array(_).fill(0), G = 0; G < _; G++) P[G] = y[G][G];
    return F(sr(P), T, B);
  }
  function i(y, x, B) {
    var _ = y.length, M = t(x / _), S, T;
    if (B) {
      T = new Array(_);
      for (var N = 0; N < _; N++) T[N] = Array(_).fill(0), T[N][N] = 1;
    }
    for (var q = b(y); t(q[1]) >= t(M); ) {
      var z = q[0][0], I = q[0][1];
      S = g(y[z][z], y[I][I], y[z][I]), y = C(y, S, z, I), B && (T = h(T, S, z, I)), q = b(y);
    }
    for (var P = Array(_).fill(0), G = 0; G < _; G++) P[G] = y[G][G];
    return F(sr(P), T, B);
  }
  function d(y, x, B) {
    var _ = x - y;
    return Math.abs(_) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * B / (x - y));
  }
  function g(y, x, B) {
    var _ = u(x, y);
    return t(_) <= e.relTol ? o(-1).acos().div(4) : f(0.5, a(l(2, B, c(_))));
  }
  function w(y, x, B, _) {
    for (var M = y.length, S = Math.cos(x), T = Math.sin(x), N = Array(M).fill(0), q = Array(M).fill(0), z = 0; z < M; z++) N[z] = S * y[z][B] - T * y[z][_], q[z] = T * y[z][B] + S * y[z][_];
    for (var I = 0; I < M; I++) y[I][B] = N[I], y[I][_] = q[I];
    return y;
  }
  function h(y, x, B, _) {
    for (var M = y.length, S = s(x), T = D(x), N = Array(M).fill(o(0)), q = Array(M).fill(o(0)), z = 0; z < M; z++) N[z] = u(f(S, y[z][B]), f(T, y[z][_])), q[z] = n(f(T, y[z][B]), f(S, y[z][_]));
    for (var I = 0; I < M; I++) y[I][B] = N[I], y[I][_] = q[I];
    return y;
  }
  function C(y, x, B, _) {
    for (var M = y.length, S = o(s(x)), T = o(D(x)), N = f(S, S), q = f(T, T), z = Array(M).fill(o(0)), I = Array(M).fill(o(0)), P = l(o(2), S, T, y[B][_]), G = n(u(f(N, y[B][B]), P), f(q, y[_][_])), $ = m(f(q, y[B][B]), P, f(N, y[_][_])), O = 0; O < M; O++) z[O] = u(f(S, y[B][O]), f(T, y[_][O])), I[O] = n(f(T, y[B][O]), f(S, y[_][O]));
    y[B][B] = G, y[_][_] = $, y[B][_] = o(0), y[_][B] = o(0);
    for (var Z = 0; Z < M; Z++) Z !== B && Z !== _ && (y[B][Z] = z[Z], y[Z][B] = z[Z], y[_][Z] = I[Z], y[Z][_] = I[Z]);
    return y;
  }
  function E(y, x, B, _) {
    for (var M = y.length, S = Math.cos(x), T = Math.sin(x), N = S * S, q = T * T, z = Array(M).fill(0), I = Array(M).fill(0), P = N * y[B][B] - 2 * S * T * y[B][_] + q * y[_][_], G = q * y[B][B] + 2 * S * T * y[B][_] + N * y[_][_], $ = 0; $ < M; $++) z[$] = S * y[B][$] - T * y[_][$], I[$] = T * y[B][$] + S * y[_][$];
    y[B][B] = P, y[_][_] = G, y[B][_] = 0, y[_][B] = 0;
    for (var O = 0; O < M; O++) O !== B && O !== _ && (y[B][O] = z[O], y[O][B] = z[O], y[_][O] = I[O], y[O][_] = I[O]);
    return y;
  }
  function A(y) {
    for (var x = y.length, B = 0, _ = [0, 1], M = 0; M < x; M++) for (var S = M + 1; S < x; S++) Math.abs(B) < Math.abs(y[M][S]) && (B = Math.abs(y[M][S]), _ = [M, S]);
    return [_, B];
  }
  function b(y) {
    for (var x = y.length, B = 0, _ = [0, 1], M = 0; M < x; M++) for (var S = M + 1; S < x; S++) t(B) < t(y[M][S]) && (B = t(y[M][S]), _ = [M, S]);
    return [_, B];
  }
  function F(y, x, B) {
    var _ = y.length, M = Array(_), S;
    if (B) {
      S = Array(_);
      for (var T = 0; T < _; T++) S[T] = Array(_);
    }
    for (var N = 0; N < _; N++) {
      for (var q = 0, z = y[0], I = 0; I < y.length; I++) t(y[I]) < t(z) && (q = I, z = y[q]);
      if (M[N] = y.splice(q, 1)[0], B) for (var P = 0; P < _; P++) S[N][P] = x[P][q], x[P].splice(q, 1);
    }
    if (!B) return { values: M };
    var G = S.map(($, O) => ({ value: M[O], vector: $ }));
    return { values: M, eigenvectors: G };
  }
  return v;
}
var Os = "eigs", $s = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], Is = W(Os, $s, (r) => {
  var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: s, abs: D, atan: f, cos: c, sin: o, multiplyScalar: l, divideScalar: m, inv: v, bignumber: p, multiply: i, add: d, larger: g, column: w, flatten: h, number: C, complex: E, sqrt: A, diag: b, size: F, reshape: y, qr: x, usolve: B, usolveAll: _, im: M, re: S, smaller: T, matrixFromColumns: N, dot: q } = r, z = zs({ config: e, addScalar: t, subtract: a, abs: D, atan: f, cos: c, sin: o, multiplyScalar: l, inv: v, bignumber: p, multiply: i, add: d }), I = Ts({ addScalar: t, subtract: a, multiply: i, multiplyScalar: l, flatten: h, divideScalar: m, sqrt: A, abs: D, bignumber: p, diag: b, size: F, reshape: y, qr: x, inv: v, usolve: B, usolveAll: _, equal: s, complex: E, larger: g, smaller: T, matrixFromColumns: N, dot: q });
  return n("eigs", { Array: function(R) {
    return P(u(R));
  }, "Array, number|BigNumber": function(R, Q) {
    return P(u(R), { precision: Q });
  }, "Array, Object"(L, R) {
    return P(u(L), R);
  }, Matrix: function(R) {
    return P(R, { matricize: true });
  }, "Matrix, number|BigNumber": function(R, Q) {
    return P(R, { precision: Q, matricize: true });
  }, "Matrix, Object": function(R, Q) {
    var U = { matricize: true };
    return Se(U, Q), P(R, U);
  } });
  function P(L) {
    var R, Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, U = "eigenvectors" in Q ? Q.eigenvectors : true, V = (R = Q.precision) !== null && R !== void 0 ? R : e.relTol, X = G(L, V, U);
    return Q.matricize && (X.values = u(X.values), U && (X.eigenvectors = X.eigenvectors.map((J) => {
      var { value: j, vector: er } = J;
      return { value: j, vector: u(er) };
    }))), U && Object.defineProperty(X, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), X;
  }
  function G(L, R, Q) {
    var U = L.toArray(), V = L.size();
    if (V.length !== 2 || V[0] !== V[1]) throw new RangeError("Matrix must be square (size: ".concat(gr(V), ")"));
    var X = V[0];
    if (O(U, X, R) && (Z(U, X), $(U, X, R))) {
      var J = Y(L, U, X);
      return z(U, X, R, J, Q);
    }
    var j = Y(L, U, X);
    return I(U, X, R, j, Q);
  }
  function $(L, R, Q) {
    for (var U = 0; U < R; U++) for (var V = U; V < R; V++) if (g(p(D(a(L[U][V], L[V][U]))), Q)) return false;
    return true;
  }
  function O(L, R, Q) {
    for (var U = 0; U < R; U++) for (var V = 0; V < R; V++) if (g(p(D(M(L[U][V]))), Q)) return false;
    return true;
  }
  function Z(L, R) {
    for (var Q = 0; Q < R; Q++) for (var U = 0; U < R; U++) L[Q][U] = S(L[Q][U]);
  }
  function Y(L, R, Q) {
    var U = L.datatype();
    if (U === "number" || U === "BigNumber" || U === "Complex") return U;
    for (var V = false, X = false, J = false, j = 0; j < Q; j++) for (var er = 0; er < Q; er++) {
      var ur = R[j][er];
      if (dr(ur) || He(ur)) V = true;
      else if (Cr(ur)) X = true;
      else if (Xe(ur)) J = true;
      else throw TypeError("Unsupported type in Matrix: " + Rr(ur));
    }
    if (X && J && console.warn("Complex BigNumbers not supported, this operation will lose precission."), J) {
      for (var ar = 0; ar < Q; ar++) for (var ir = 0; ir < Q; ir++) R[ar][ir] = E(R[ar][ir]);
      return "Complex";
    }
    if (X) {
      for (var or = 0; or < Q; or++) for (var mr = 0; mr < Q; mr++) R[or][mr] = p(R[or][mr]);
      return "BigNumber";
    }
    if (V) {
      for (var vr = 0; vr < Q; vr++) for (var Dr = 0; Dr < Q; Dr++) R[vr][Dr] = C(R[vr][Dr]);
      return "number";
    } else throw TypeError("Matrix contains unsupported types only.");
  }
}), ce = ra({ config: Nr }), Oe = na({}), ut = ca({}), at = Da({}), zr = xa({ Matrix: at }), k = Xu({ BigNumber: ce, Complex: Oe, DenseMatrix: zr, Fraction: ut }), it = fi({ typed: k }), te = li({ typed: k }), qs = ds({ typed: k }), ot = ka({ Complex: Oe, typed: k }), $e = ro({ typed: k }), Rs = ms({ typed: k }), Vr = Ra({ config: Nr, typed: k }), Gn = po({ typed: k }), Us = mo({ typed: k }), Ps = to({ typed: k }), Kn = Ma({ typed: k }), Ls = za({ config: Nr, typed: k }), Xn = $a({ equalScalar: Vr, typed: k }), Kr = Li({ typed: k }), st = Wa({ typed: k }), Vs = uo({ typed: k }), Zs = Qi({ BigNumber: ce, Fraction: ut, complex: ot, typed: k }), Js = ys({ typed: k }), Zr = La({ Matrix: at, equalScalar: Vr, typed: k }), le = Di({ typed: k }), ve = Ka({ BigNumber: ce, typed: k }), cr = ni({ DenseMatrix: zr, Matrix: at, SparseMatrix: Zr, typed: k }), Qs = _o({ isInteger: Kn, matrix: cr, typed: k }), ft = Gi({ Complex: Oe, config: Nr, typed: k }), Ke = Mo({ matrix: cr, typed: k }), Sr = Oo({ BigNumber: ce, config: Nr, matrix: cr, typed: k }), Xr = io({ isInteger: Kn, matrix: cr, typed: k }), Ws = To({ conj: $e, transpose: Ke, typed: k }), Ys = vo({ DenseMatrix: zr, SparseMatrix: Zr, matrix: cr, typed: k }), Hn = Yo({ DenseMatrix: zr, SparseMatrix: Zr, concat: Xr, equalScalar: Vr, matrix: cr, typed: k }), kn = ei({ Fraction: ut, typed: k }), De = yo({ BigNumber: ce, DenseMatrix: zr, SparseMatrix: Zr, config: Nr, matrix: cr, typed: k }), Gs = Fo({ matrix: cr, multiplyScalar: Kr, typed: k }), Ks = as({ DenseMatrix: zr, SparseMatrix: Zr, concat: Xr, config: Nr, matrix: cr, typed: k }), Xs = qo({ bignumber: ve, fraction: kn, number: st }), ct = xo({ matrix: cr, config: Nr, typed: k }), Ie = Xo({ DenseMatrix: zr, SparseMatrix: Zr, bignumber: ve, concat: Xr, config: Nr, matrix: cr, typed: k }), qe = oi({ typed: k }), Re = Fs({ DenseMatrix: zr, SparseMatrix: Zr, addScalar: te, concat: Xr, equalScalar: Vr, matrix: cr, typed: k }), ne = Uo({ numeric: Xs, typed: k }), Hs = fs({ DenseMatrix: zr, smaller: Ie }), ks = vs({ ImmutableDenseMatrix: Hs, getMatrixDataType: Us }), lt = ts({ DenseMatrix: zr, SparseMatrix: Zr, bignumber: ve, concat: Xr, config: Nr, matrix: cr, typed: k }), js = ai({ flatten: Gn, matrix: cr, size: ct, typed: k }), rf = Bs({ addScalar: te, complex: ot, conj: $e, divideScalar: ne, equal: Hn, identity: De, isZero: Xn, matrix: cr, multiplyScalar: Kr, sign: Zs, sqrt: ft, subtractScalar: le, typed: k, unaryMinus: qe, zeros: Sr }), ef = jo({ DenseMatrix: zr, SparseMatrix: Zr, concat: Xr, config: Nr, matrix: cr, typed: k }), Ue = Xi({ DenseMatrix: zr, concat: Xr, equalScalar: Vr, matrix: cr, subtractScalar: le, typed: k, unaryMinus: qe }), tf = Zo({ DenseMatrix: zr, divideScalar: ne, equalScalar: Vr, matrix: cr, multiplyScalar: Kr, subtractScalar: le, typed: k }), ue = bs({ addScalar: te, conj: $e, multiplyScalar: Kr, size: ct, typed: k }), Mr = Zi({ addScalar: te, dot: ue, equalScalar: Vr, matrix: cr, multiplyScalar: Kr, typed: k }), nf = wo({ bignumber: ve, matrix: cr, add: Re, config: Nr, isPositive: Ls, larger: lt, largerEq: Ks, smaller: Ie, smallerEq: ef, typed: k }), uf = Qo({ DenseMatrix: zr, divideScalar: ne, equalScalar: Vr, matrix: cr, multiplyScalar: Kr, subtractScalar: le, typed: k }), af = so({ Index: ks, matrix: cr, range: nf, typed: k }), pn = co({ matrix: cr, multiply: Mr, subtract: Ue, typed: k }), of = Ss({ divideScalar: ne, isZero: Xn, matrix: cr, multiply: Mr, subtractScalar: le, typed: k, unaryMinus: qe }), jn = Ns({ abs: it, addScalar: te, det: of, divideScalar: ne, identity: De, matrix: cr, multiply: Mr, typed: k, unaryMinus: qe }), sf = Lo({ Complex: Oe, config: Nr, fraction: kn, identity: De, inv: jn, matrix: cr, multiply: Mr, number: st, typed: k }), ff = Is({ abs: it, add: Re, addScalar: te, atan: qs, bignumber: ve, column: af, complex: ot, config: Nr, cos: Rs, diag: Ys, divideScalar: ne, dot: ue, equal: Hn, flatten: Gn, im: Ps, inv: jn, larger: lt, matrix: cr, matrixFromColumns: js, multiply: Mr, multiplyScalar: Kr, number: st, qr: rf, re: Vs, reshape: Qs, sin: Js, size: ct, smaller: Ie, sqrt: ft, subtract: Ue, typed: k, usolve: tf, usolveAll: uf }), ae = Cs({ abs: it, add: Re, conj: $e, ctranspose: Ws, eigs: ff, equalScalar: Vr, larger: lt, matrix: cr, multiply: Mr, pow: sf, smaller: Ie, sqrt: ft, typed: k });
function cf(r) {
  if (r.length === 2) return lf(r[0], r[1]);
  if (r.length === 3) return vf(r[0], r[1], r[2]);
}
function lf(r, e) {
  const n = Ue(e, r), u = ae(n), t = ue(n, [1, 0, 0]) / u, a = ue(n, [0, 1, 0]) / u, s = ue(n, [0, 0, 1]) / u, D = Math.sqrt(t ** 2 + a ** 2);
  let f = [[t, a, s], [-a / D, t / D, 0], [-t * s / D, -a * s / D, D]];
  return s === 1 && (f = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]]), s === -1 && (f = [[0, 0, -1], [0, 1, 0], [1, 0, 0]]), Gs(De(4), f).toArray();
}
function vf(r, e, n) {
  let u = [0, 0, 0], t = [0, 0, 0], a = [0, 0, 0], s, D, f = [0, 0, 0], c = 0, o = 0;
  const l = Sr(3, 3).toArray(), m = Sr(3, 7).toArray(), v = Sr(7, 3).toArray(), p = De(3).toArray(), i = Sr(3, 3).toArray(), d = Sr(18, 18).toArray(), g = [r, e, n];
  for (let h = 0; h < 3; h++) for (let C = 0; C < 3; C++) l[h][C] = g[C][h];
  w(c, o, l, f, m, v), s = ae(f);
  for (let h = 0; h < 3; h++) f[h] = f[h] / s;
  if (D = p[0][0] * f[0] + p[1][0] * f[1] + p[2][0] * f[2], Math.abs(D) > 0.999999999536) {
    D = p[0][2] * f[0] + p[1][2] * f[1] + p[2][2] * f[2];
    for (let h = 0; h < 3; h++) u[h] = p[h][2] - D * f[h];
  } else for (let h = 0; h < 3; h++) u[h] = p[h][0] - D * f[h];
  s = ae(u);
  for (let h = 0; h < 3; h++) u[h] = u[h] / s;
  t = pn(f, u), s = ae(t);
  for (let h = 0; h < 3; h++) t[h] = t[h] / s;
  a = [...f];
  for (let h = 0; h < 3; h++) i[0][h] = u[h], i[1][h] = t[h], i[2][h] = a[h];
  for (let h = 0; h < 3; h++) for (let C = 0; C < 3; C++) d[h][C] = i[h][C], d[h + 3][C + 3] = i[h][C], d[h + 6][C + 6] = i[h][C], d[h + 9][C + 9] = i[h][C], d[h + 12][C + 12] = i[h][C], d[h + 15][C + 15] = i[h][C];
  return d;
  function w(h, C, E, A, b, F, y) {
    Sr(2, 3), F[3][0] = 1 - h - C, F[3][1] = h, F[3][2] = C, F[0][0] = -1, F[0][1] = 1, F[0][2] = 0, F[1][0] = -1, F[1][1] = 0, F[1][2] = 1;
    for (let M = 0; M < 3; M++) for (let S = 0; S < 2; S++) {
      b[M][S] = 0;
      for (let T = 0; T < 3; T++) b[M][S] += E[M][T] * F[S][T];
    }
    const x = [b[0][0], b[1][0], b[2][0]], B = [b[0][1], b[1][1], b[2][1]], _ = pn(x, B);
    A[0] = _[0], A[1] = _[1], A[2] = _[2];
  }
}
function Df(r, e, n) {
  if (r.length === 2) return pf(r, e, n);
  if (r.length === 3) return df(r, e, n);
}
function pf(r, e, n) {
  var _a2, _b, _c, _d, _e2, _f;
  const u = ((_a2 = e == null ? void 0 : e.momentsOfInertiaZ) == null ? void 0 : _a2.get(n)) ?? 0, t = ((_b = e == null ? void 0 : e.momentsOfInertiaY) == null ? void 0 : _b.get(n)) ?? 0, a = ((_c = e == null ? void 0 : e.elasticities) == null ? void 0 : _c.get(n)) ?? 0, s = ((_d = e == null ? void 0 : e.areas) == null ? void 0 : _d.get(n)) ?? 0, D = ((_e2 = e == null ? void 0 : e.shearModuli) == null ? void 0 : _e2.get(n)) ?? 0, f = ((_f = e == null ? void 0 : e.torsionalConstants) == null ? void 0 : _f.get(n)) ?? 0, c = ae(Ue(r[0], r[1])), o = a * s / c, l = a * u / c ** 3, m = a * t / c ** 3, v = D * f / c;
  return [[o, 0, 0, 0, 0, 0, -o, 0, 0, 0, 0, 0], [0, 12 * l, 0, 0, 0, 6 * c * l, 0, -12 * l, 0, 0, 0, 6 * c * l], [0, 0, 12 * m, 0, -6 * c * m, 0, 0, 0, -12 * m, 0, -6 * c * m, 0], [0, 0, 0, v, 0, 0, 0, 0, 0, -v, 0, 0], [0, 0, -6 * c * m, 0, 4 * m * c ** 2, 0, 0, 0, 6 * c * m, 0, 2 * m * c ** 2, 0], [0, 6 * c * l, 0, 0, 0, 4 * l * c ** 2, 0, -6 * c * l, 0, 0, 0, 2 * l * c ** 2], [-o, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0], [0, -12 * l, 0, 0, 0, -6 * l * c, 0, 12 * l, 0, 0, 0, -6 * l * c], [0, 0, -12 * m, 0, 6 * c * m, 0, 0, 0, 12 * m, 0, 6 * c * m, 0], [0, 0, 0, -v, 0, 0, 0, 0, 0, v, 0, 0], [0, 0, -6 * c * m, 0, 2 * m * c ** 2, 0, 0, 0, 6 * c * m, 0, 4 * m * c ** 2, 0], [0, 6 * c * l, 0, 0, 0, 2 * l * c ** 2, 0, -6 * c * l, 0, 0, 0, 4 * l * c ** 2]];
}
function df(r, e, n) {
  var _a2, _b, _c, _d, _e2;
  const u = ((_a2 = e.elasticities) == null ? void 0 : _a2.get(n)) ?? 0, t = ((_b = e.elasticitiesOrthogonal) == null ? void 0 : _b.get(n)) ?? 0, a = ((_c = e.poissonsRatios) == null ? void 0 : _c.get(n)) ?? 0, s = ((_d = e.shearModuli) == null ? void 0 : _d.get(n)) ?? 0, D = ((_e2 = e.thicknesses) == null ? void 0 : _e2.get(n)) ?? 0, f = t ? b(u, t, s, a, D) : E(u, a, D), c = t ? F(s, D) : A(u, a, D), o = r.map(([_, M]) => [_, M]), l = o[1][0] - o[0][0], m = o[2][0] - o[0][0], v = o[0][1] - o[1][1], p = o[2][1] - o[0][1], i = 0.5 * (l * p - m * -v), d = x(o), g = B(o), w = Mr(Mr(Ke(d), c), d), h = Mr(Mr(Ke(g), f), g);
  return Mr(Re(w, h), i).toArray();
  function E(_, M, S) {
    const T = _ / (1 - M * M), N = cr([[T, T * M, 0], [T * M, T, 0], [0, 0, T * (1 - M) / 2]]);
    return Mr(S ** 3 / 12, N);
  }
  function A(_, M, S) {
    const T = 0.8333333333333334, N = _ / (2 * (1 + M));
    return cr([[T * N * S, 0], [0, T * N * S]]);
  }
  function b(_, M, S, T, N) {
    const q = M * T / _, z = 1 - T * q, I = _ / z, P = M / z, G = T * M / z, O = cr([[I, G, 0], [G, P, 0], [0, 0, S]]);
    return Mr(N ** 3 / 12, O);
  }
  function F(_, M) {
    const S = 0.8333333333333334;
    return cr([[S * _ * M, 0], [0, S * _ * M]]);
  }
  function y(_, M) {
    const S = Sr(2, 6).toArray(), T = Sr(2, 6).toArray(), N = Sr(2, 6).toArray(), q = _[1] - _[0], z = _[0] - _[2], I = M[2] - M[0], P = M[0] - M[1], G = _[2] - _[1], $ = M[1] - M[2], O = 0.5 * (q * I - z * P), Z = 0.5 * P * z, Y = 0.5 * I * q, L = 0.5 * q * z, R = 0.5 * P * I;
    return S[0][2] = 0.5 * G / O, S[0][3] = -0.5, S[1][2] = 0.5 * $ / O, S[1][4] = 0.5, T[0][2] = 0.5 * z / O, T[0][3] = 0.5 * Z / O, T[0][4] = 0.5 * L / O, T[1][2] = 0.5 * I / O, T[1][3] = 0.5 * R / O, T[1][4] = 0.5 * Y / O, N[0][2] = 0.5 * q / O, N[0][3] = -0.5 * Y / O, N[0][4] = -0.5 * L / O, N[1][2] = 0.5 * P / O, N[1][3] = -0.5 * R / O, N[1][4] = -0.5 * Z / O, [S, T, N, O];
  }
  function x(_) {
    const M = Sr(2, 18).toArray(), S = _[0][0], T = _[1][0], N = _[2][0], q = _[0][1], z = _[1][1], I = _[2][1], P = 0.5 * ((T - S) * (I - q) - (N - S) * -(q - z)), G = (S + T + N) / 3, $ = (q + z + I) / 3, O = [G, S, T], Z = [$, q, z], Y = [G, T, N], L = [$, z, I], R = [G, N, S], Q = [$, I, q], U = 1 / 3, [V, X, J, j] = y(O, Z), [er, ur, ar, ir] = y(Y, L), [or, mr, vr, Dr] = y(R, Q), wr = Sr(2, 18).toArray(), br = Sr(2, 18).toArray(), Fr = Sr(2, 18).toArray();
    for (let tr = 0; tr < 2; tr++) for (let rr = 0; rr < 6; rr++) wr[tr][rr] = U * V[tr][rr] + X[tr][rr], wr[tr][rr + 6] = U * V[tr][rr] + J[tr][rr], wr[tr][rr + 12] = U * V[tr][rr], br[tr][rr] = U * er[tr][rr], br[tr][rr + 6] = U * er[tr][rr] + ur[tr][rr], br[tr][rr + 12] = U * er[tr][rr] + ar[tr][rr], Fr[tr][rr] = U * or[tr][rr] + vr[tr][rr], Fr[tr][rr + 6] = U * or[tr][rr], Fr[tr][rr + 12] = U * or[tr][rr] + mr[tr][rr];
    for (let tr = 0; tr < 2; tr++) for (let rr = 0; rr < 18; rr++) wr[tr][rr] *= j, br[tr][rr] *= ir, Fr[tr][rr] *= Dr, M[tr][rr] = (wr[tr][rr] + br[tr][rr] + Fr[tr][rr]) / P;
    return M;
  }
  function B(_) {
    const M = Sr(3, 18).toArray(), S = _[1][0] - _[0][0], T = _[2][0] - _[0][0], N = _[2][0] - _[1][0], q = _[1][1] - _[2][1], z = _[2][1] - _[0][1], I = _[0][1] - _[1][1], P = 0.5 * (S * z - T * -I), G = q / (2 * P), $ = N / (2 * P), O = z / (2 * P), Z = -T / (2 * P), Y = I / (2 * P), L = S / (2 * P);
    return M[0][4] = G, M[0][10] = O, M[0][16] = Y, M[1][3] = -$, M[1][9] = -Z, M[1][15] = -L, M[2][3] = -G, M[2][4] = $, M[2][9] = -O, M[2][10] = Z, M[2][15] = -Y, M[2][16] = L, M;
  }
}
function mf(r, e, n, u) {
  const t = { normals: /* @__PURE__ */ new Map(), shearsY: /* @__PURE__ */ new Map(), shearsZ: /* @__PURE__ */ new Map(), torsions: /* @__PURE__ */ new Map(), bendingsY: /* @__PURE__ */ new Map(), bendingsZ: /* @__PURE__ */ new Map(), bendingXX: /* @__PURE__ */ new Map(), bendingYY: /* @__PURE__ */ new Map(), bendingXY: /* @__PURE__ */ new Map() };
  return e.forEach((a, s) => {
    const D = a.map((v) => r[v]), f = a.reduce((v, p) => v.concat(u.deformations.get(p)), []), c = cf(D), o = Mr(c, f), l = Df(D, n, s);
    let m = Mr(l, o);
    a.length === 2 ? (t.normals.set(s, [m[0], m[6]]), t.shearsY.set(s, [m[1], m[7]]), t.shearsZ.set(s, [m[2], m[8]]), t.torsions.set(s, [m[3], m[9]]), t.bendingsY.set(s, [m[4], m[10]]), t.bendingsZ.set(s, [m[5], m[11]])) : (t.bendingXY.set(s, [m[2], m[8], m[14]]), t.bendingXX.set(s, [m[3], m[9], m[15]]), t.bendingXX.set(s, [m[4], m[10], m[16]]));
  }), t;
}
export {
  mf as a
};
