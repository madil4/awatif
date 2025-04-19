import { _ as me, t as ie, D as nt, C as Fr } from "./complex-ViNjxWW9.js";
var tn = { relTol: 1e-12, absTol: 1e-15, matrix: "Matrix", number: "number", numberFallback: "number", precision: 64, predictable: false, randomSeed: null };
function Wn(r, e) {
  if (oe(r, e)) return r[e];
  throw typeof r[e] == "function" && Xn(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function Qn(r, e, n) {
  if (oe(r, e)) return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function oe(r, e) {
  return !Gn(r) && !Array.isArray(r) ? false : Kr(Yn, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function Xn(r, e) {
  return r == null || typeof r[e] != "function" || Kr(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : Kr(Kn, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function Gn(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var Yn = { length: true, name: true }, Kn = { toString: true, valueOf: true, toLocaleString: true };
class Hn {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
  }
  get(e) {
    return Wn(this.wrappedObject, e);
  }
  set(e, n) {
    return Qn(this.wrappedObject, e, n), this;
  }
  has(e) {
    return oe(this.wrappedObject, e) && e in this.wrappedObject;
  }
  entries() {
    return kn(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var n of this.keys()) e(this.get(n), n, this);
  }
  delete(e) {
    oe(this.wrappedObject, e) && delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys()) this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
function kn(r, e) {
  return { next: () => {
    var n = r.next();
    return n.done ? n : { value: e(n.value), done: false };
  } };
}
function fr(r) {
  return typeof r == "number";
}
function gr(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function jn(r) {
  return typeof r == "bigint";
}
function $e(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function Ie(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function nn(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function Mr(r) {
  return typeof r == "string";
}
var Dr = Array.isArray;
function cr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function se(r) {
  return Array.isArray(r) || cr(r);
}
function un(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function an(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function on(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function qe(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function ru(r) {
  return typeof r == "boolean";
}
function eu(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function tu(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function nu(r) {
  return typeof r == "function";
}
function uu(r) {
  return r instanceof Date;
}
function au(r) {
  return r instanceof RegExp;
}
function Re(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !$e(r) && !Ie(r));
}
function iu(r) {
  return r ? r instanceof Map || r instanceof Hn || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
function ou(r) {
  return r === null;
}
function su(r) {
  return r === void 0;
}
function fu(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function lu(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function vu(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function cu(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Du(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function pu(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function du(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function hu(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function mu(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function gu(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function yu(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function Au(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function Fu(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function Eu(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function wu(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function Cu(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function bu(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function Nr(r) {
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
  if (Re(r)) return _u(r, tr);
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function _u(r, e) {
  var n = {};
  for (var u in r) Kr(r, u) && (n[u] = e(r[u]));
  return n;
}
function sn(r, e) {
  for (var n in e) Kr(e, n) && (r[n] = e[n]);
  return r;
}
function Ir(r, e) {
  var n, u, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length) return false;
    for (u = 0, t = r.length; u < t; u++) if (!Ir(r[u], e[u])) return false;
    return true;
  } else {
    if (typeof r == "function") return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object)) return false;
      for (n in r) if (!(n in e) || !Ir(r[n], e[n])) return false;
      for (n in e) if (!(n in r)) return false;
      return true;
    } else return r === e;
  }
}
function Kr(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function Bu(r, e) {
  for (var n = {}, u = 0; u < e.length; u++) {
    var t = e[u], a = r[t];
    a !== void 0 && (n[t] = a);
  }
  return n;
}
var xu = ["Matrix", "Array"], Su = ["number", "BigNumber", "Fraction"], wr = function(e) {
  if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(tn);
};
me(wr, tn, { MATRIX_OPTIONS: xu, NUMBER_OPTIONS: Su });
function J(r, e, n, u) {
  function t(a) {
    var s = Bu(a, e.map(Tu));
    return Mu(r, e, a), n(s);
  }
  return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), u && (t.meta = u), t;
}
function Mu(r, e, n) {
  var u = e.filter((a) => !Nu(a)).every((a) => n[a] !== void 0);
  if (!u) {
    var t = e.filter((a) => n[a] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Nu(r) {
  return r && r[0] === "?";
}
function Tu(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function vr(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var zu = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function xe(r, e, n) {
  var u = { 2: "0b", 8: "0o", 16: "0x" }, t = u[e], a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!vr(n)) throw new Error("size must be an integer");
    if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!vr(r)) throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** n), a = "i".concat(n);
  }
  var s = "";
  return r < 0 && (r = -r, s = "-"), "".concat(s).concat(t).concat(r.toString(e)).concat(a);
}
function Me(r, e) {
  if (typeof e == "function") return e(r);
  if (r === 1 / 0) return "Infinity";
  if (r === -1 / 0) return "-Infinity";
  if (isNaN(r)) return "NaN";
  var { notation: n, precision: u, wordSize: t } = fn(e);
  switch (n) {
    case "fixed":
      return $u(r, u);
    case "exponential":
      return ln(r, u);
    case "engineering":
      return Ou(r, u);
    case "bin":
      return xe(r, 2, t);
    case "oct":
      return xe(r, 8, t);
    case "hex":
      return xe(r, 16, t);
    case "auto":
      return Iu(r, u, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], s = arguments[4];
        return a !== "." ? a + s : s;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function fn(r) {
  var e = "auto", n, u;
  if (r !== void 0) if (fr(r)) n = r;
  else if (gr(r)) n = r.toNumber();
  else if (Re(r)) r.precision !== void 0 && (n = ut(r.precision, () => {
    throw new Error('Option "precision" must be a number or BigNumber');
  })), r.wordSize !== void 0 && (u = ut(r.wordSize, () => {
    throw new Error('Option "wordSize" must be a number or BigNumber');
  })), r.notation && (e = r.notation);
  else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: n, wordSize: u };
}
function ge(r) {
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
function Ou(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = ge(r), u = ye(n, e), t = u.exponent, a = u.coefficients, s = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if (fr(e)) for (; e > a.length || t - s + 1 > a.length; ) a.push(0);
  else for (var D = Math.abs(t - s) - (a.length - 1), l = 0; l < D; l++) a.push(0);
  for (var v = Math.abs(t - s), i = 1; v > 0; ) i++, v--;
  var f = a.slice(i).join(""), d = fr(e) && f.length || f.match(/[1-9]/) ? "." + f : "", c = a.slice(0, i).join("") + d + "e" + (t >= 0 ? "+" : "") + s.toString();
  return u.sign + c;
}
function $u(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = ge(r), u = typeof e == "number" ? ye(n, n.exponent + 1 + e) : n, t = u.coefficients, a = u.exponent + 1, s = a + (e || 0);
  return t.length < s && (t = t.concat(Wr(s - t.length))), a < 0 && (t = Wr(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), u.sign + t.join("");
}
function ln(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var n = ge(r), u = e ? ye(n, e) : n, t = u.coefficients, a = u.exponent;
  t.length < e && (t = t.concat(Wr(e - t.length)));
  var s = t.shift();
  return u.sign + s + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function Iu(r, e, n) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var u = at(n == null ? void 0 : n.lowerExp, -3), t = at(n == null ? void 0 : n.upperExp, 5), a = ge(r), s = e ? ye(a, e) : a;
  if (s.exponent < u || s.exponent >= t) return ln(r, e);
  var D = s.coefficients, l = s.exponent;
  D.length < e && (D = D.concat(Wr(e - D.length))), D = D.concat(Wr(l - D.length + 1 + (D.length < e ? e - D.length : 0))), D = Wr(-l).concat(D);
  var v = l > 0 ? l : 0;
  return v < D.length - 1 && D.splice(v + 1, 0, "."), s.sign + D.join("");
}
function ye(r, e) {
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
function Wr(r) {
  for (var e = [], n = 0; n < r; n++) e.push(0);
  return e;
}
function qu(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function $r(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), u);
}
function ut(r, e) {
  if (fr(r)) return r;
  if (gr(r)) return r.toNumber();
  e();
}
function at(r, e) {
  return fr(r) ? r : gr(r) ? r.toNumber() : e;
}
var vn = function() {
  return vn = ie.create, ie;
}, Ru = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], Uu = J("typed", Ru, function(e) {
  var { BigNumber: n, Complex: u, DenseMatrix: t, Fraction: a } = e, s = vn();
  return s.clear(), s.addTypes([{ name: "number", test: fr }, { name: "Complex", test: $e }, { name: "BigNumber", test: gr }, { name: "bigint", test: jn }, { name: "Fraction", test: Ie }, { name: "Unit", test: nn }, { name: "identifier", test: (D) => Mr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D) }, { name: "string", test: Mr }, { name: "Chain", test: bu }, { name: "Array", test: Dr }, { name: "Matrix", test: cr }, { name: "DenseMatrix", test: un }, { name: "SparseMatrix", test: an }, { name: "Range", test: on }, { name: "Index", test: qe }, { name: "boolean", test: ru }, { name: "ResultSet", test: eu }, { name: "Help", test: tu }, { name: "function", test: nu }, { name: "Date", test: uu }, { name: "RegExp", test: au }, { name: "null", test: ou }, { name: "undefined", test: su }, { name: "AccessorNode", test: fu }, { name: "ArrayNode", test: lu }, { name: "AssignmentNode", test: vu }, { name: "BlockNode", test: cu }, { name: "ConditionalNode", test: Du }, { name: "ConstantNode", test: pu }, { name: "FunctionNode", test: hu }, { name: "FunctionAssignmentNode", test: du }, { name: "IndexNode", test: mu }, { name: "Node", test: gu }, { name: "ObjectNode", test: yu }, { name: "OperatorNode", test: Au }, { name: "ParenthesisNode", test: Fu }, { name: "RangeNode", test: Eu }, { name: "RelationalNode", test: wu }, { name: "SymbolNode", test: Cu }, { name: "Map", test: iu }, { name: "Object", test: Re }]), s.addConversions([{ from: "number", to: "BigNumber", convert: function(l) {
    if (n || te(l), qu(l) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + l + "). Use function bignumber(x) to convert to BigNumber.");
    return new n(l);
  } }, { from: "number", to: "Complex", convert: function(l) {
    return u || ne(l), new u(l, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(l) {
    return u || ne(l), new u(l.toNumber(), 0);
  } }, { from: "bigint", to: "number", convert: function(l) {
    if (l > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + l + ")");
    return Number(l);
  } }, { from: "bigint", to: "BigNumber", convert: function(l) {
    return n || te(l), new n(l.toString());
  } }, { from: "bigint", to: "Fraction", convert: function(l) {
    return a || ue(l), new a(l.toString());
  } }, { from: "Fraction", to: "BigNumber", convert: function(l) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(l) {
    return u || ne(l), new u(l.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(l) {
    a || ue(l);
    var v = new a(l);
    if (v.valueOf() !== l) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + l + "). Use function fraction(x) to convert to Fraction.");
    return v;
  } }, { from: "string", to: "number", convert: function(l) {
    var v = Number(l);
    if (isNaN(v)) throw new Error('Cannot convert "' + l + '" to a number');
    return v;
  } }, { from: "string", to: "BigNumber", convert: function(l) {
    n || te(l);
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
    a || ue(l);
    try {
      return new a(l);
    } catch {
      throw new Error('Cannot convert "' + l + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(l) {
    u || ne(l);
    try {
      return new u(l);
    } catch {
      throw new Error('Cannot convert "' + l + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(l) {
    return +l;
  } }, { from: "boolean", to: "BigNumber", convert: function(l) {
    return n || te(l), new n(+l);
  } }, { from: "boolean", to: "bigint", convert: function(l) {
    return BigInt(+l);
  } }, { from: "boolean", to: "Fraction", convert: function(l) {
    return a || ue(l), new a(+l);
  } }, { from: "boolean", to: "string", convert: function(l) {
    return String(l);
  } }, { from: "Array", to: "Matrix", convert: function(l) {
    return t || Pu(), new t(l);
  } }, { from: "Matrix", to: "Array", convert: function(l) {
    return l.valueOf();
  } }]), s.onMismatch = (D, l, v) => {
    var i = s.createError(D, l, v);
    if (["wrongType", "mismatch"].includes(i.data.category) && l.length === 1 && se(l[0]) && v.some((d) => !d.params.includes(","))) {
      var f = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw f.data = i.data, f;
    }
    throw i;
  }, s.onMismatch = (D, l, v) => {
    var i = s.createError(D, l, v);
    if (["wrongType", "mismatch"].includes(i.data.category) && l.length === 1 && se(l[0]) && v.some((d) => !d.params.includes(","))) {
      var f = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw f.data = i.data, f;
    }
    throw i;
  }, s;
});
function te(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function ne(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function Pu() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function ue(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var Lu = "BigNumber", Vu = ["?on", "config"], Zu = J(Lu, Vu, (r) => {
  var { on: e, config: n } = r, u = nt.clone({ precision: n.precision, modulo: nt.EUCLID });
  return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, u.fromJSON = function(t) {
    return new u(t.value);
  }, e && e("config", function(t, a) {
    t.precision !== a.precision && u.config({ precision: t.precision });
  }), u;
}, { isClass: true }), Ju = "Complex", Wu = [], Qu = J(Ju, Wu, () => (Object.defineProperty(Fr, "name", { value: "Complex" }), Fr.prototype.constructor = Fr, Fr.prototype.type = "Complex", Fr.prototype.isComplex = true, Fr.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, Fr.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, Fr.prototype.format = function(r) {
  var e = "", n = this.im, u = this.re, t = Me(this.re, r), a = Me(this.im, r), s = fr(r) ? r : r ? r.precision : null;
  if (s !== null) {
    var D = Math.pow(10, -s);
    Math.abs(u / n) < D && (u = 0), Math.abs(n / u) < D && (n = 0);
  }
  return n === 0 ? e = t : u === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = a + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + a.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + a + "i", e;
}, Fr.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object") return Fr(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], u = arguments[1];
      if (fr(n)) {
        if (nn(u) && u.hasBase("ANGLE") && (u = u.toNumber("rad")), fr(u)) return new Fr({ r: n, phi: u });
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
var Xu = 2e3, K = { s: 1, n: 0, d: 1 };
function Or(r, e) {
  if (isNaN(r = parseInt(r, 10))) throw ae();
  return r * e;
}
function hr(r, e) {
  if (e === 0) throw Ue();
  var n = Object.create(Er.prototype);
  n.s = r < 0 ? -1 : 1, r = r < 0 ? -r : r;
  var u = Jr(r, e);
  return n.n = r / u, n.d = e / u, n;
}
function it(r) {
  for (var e = {}, n = r, u = 2, t = 4; t <= n; ) {
    for (; n % u === 0; ) n /= u, e[u] = (e[u] || 0) + 1;
    t += 1 + 2 * u++;
  }
  return n !== r ? n > 1 && (e[n] = (e[n] || 0) + 1) : e[r] = (e[r] || 0) + 1, e;
}
var xr = function(r, e) {
  var n = 0, u = 1, t = 1, a = 0, s = 0, D = 0, l = 1, v = 1, i = 0, f = 1, d = 1, c = 1, p = 1e7, o;
  if (r != null) if (e !== void 0) {
    if (n = r, u = e, t = n * u, n % 1 !== 0 || u % 1 !== 0) throw Hu();
  } else switch (typeof r) {
    case "object": {
      if ("d" in r && "n" in r) n = r.n, u = r.d, "s" in r && (n *= r.s);
      else if (0 in r) n = r[0], 1 in r && (u = r[1]);
      else throw ae();
      t = n * u;
      break;
    }
    case "number": {
      if (r < 0 && (t = r, r = -r), r % 1 === 0) n = r;
      else if (r > 0) {
        for (r >= 1 && (v = Math.pow(10, Math.floor(1 + Math.log(r) / Math.LN10)), r /= v); f <= p && c <= p; ) if (o = (i + d) / (f + c), r === o) {
          f + c <= p ? (n = i + d, u = f + c) : c > f ? (n = d, u = c) : (n = i, u = f);
          break;
        } else r > o ? (i += d, f += c) : (d += i, c += f), f > p ? (n = d, u = c) : (n = i, u = f);
        n *= v;
      } else (isNaN(r) || isNaN(e)) && (u = n = NaN);
      break;
    }
    case "string": {
      if (f = r.match(/\d+|./g), f === null) throw ae();
      if (f[i] === "-" ? (t = -1, i++) : f[i] === "+" && i++, f.length === i + 1 ? s = Or(f[i++], t) : f[i + 1] === "." || f[i] === "." ? (f[i] !== "." && (a = Or(f[i++], t)), i++, (i + 1 === f.length || f[i + 1] === "(" && f[i + 3] === ")" || f[i + 1] === "'" && f[i + 3] === "'") && (s = Or(f[i], t), l = Math.pow(10, f[i].length), i++), (f[i] === "(" && f[i + 2] === ")" || f[i] === "'" && f[i + 2] === "'") && (D = Or(f[i + 1], t), v = Math.pow(10, f[i + 1].length) - 1, i += 3)) : f[i + 1] === "/" || f[i + 1] === ":" ? (s = Or(f[i], t), l = Or(f[i + 2], 1), i += 3) : f[i + 3] === "/" && f[i + 1] === " " && (a = Or(f[i], t), s = Or(f[i + 2], t), l = Or(f[i + 4], 1), i += 5), f.length <= i) {
        u = l * v, t = n = D + u * a + v * s;
        break;
      }
    }
    default:
      throw ae();
  }
  if (u === 0) throw Ue();
  K.s = t < 0 ? -1 : 1, K.n = Math.abs(n), K.d = Math.abs(u);
};
function Gu(r, e, n) {
  for (var u = 1; e > 0; r = r * r % n, e >>= 1) e & 1 && (u = u * r % n);
  return u;
}
function Yu(r, e) {
  for (; e % 2 === 0; e /= 2) ;
  for (; e % 5 === 0; e /= 5) ;
  if (e === 1) return 0;
  for (var n = 10 % e, u = 1; n !== 1; u++) if (n = n * 10 % e, u > Xu) return 0;
  return u;
}
function Ku(r, e, n) {
  for (var u = 1, t = Gu(10, n, e), a = 0; a < 300; a++) {
    if (u === t) return a;
    u = u * 10 % e, t = t * 10 % e;
  }
  return 0;
}
function Jr(r, e) {
  if (!r) return e;
  if (!e) return r;
  for (; ; ) {
    if (r %= e, !r) return e;
    if (e %= r, !e) return r;
  }
}
function Er(r, e) {
  if (xr(r, e), this instanceof Er) r = Jr(K.d, K.n), this.s = K.s, this.n = K.n / r, this.d = K.d / r;
  else return hr(K.s * K.n, K.d);
}
var Ue = function() {
  return new Error("Division by Zero");
}, ae = function() {
  return new Error("Invalid argument");
}, Hu = function() {
  return new Error("Parameters must be integer");
};
Er.prototype = { s: 1, n: 0, d: 1, abs: function() {
  return hr(this.n, this.d);
}, neg: function() {
  return hr(-this.s * this.n, this.d);
}, add: function(r, e) {
  return xr(r, e), hr(this.s * this.n * K.d + K.s * this.d * K.n, this.d * K.d);
}, sub: function(r, e) {
  return xr(r, e), hr(this.s * this.n * K.d - K.s * this.d * K.n, this.d * K.d);
}, mul: function(r, e) {
  return xr(r, e), hr(this.s * K.s * this.n * K.n, this.d * K.d);
}, div: function(r, e) {
  return xr(r, e), hr(this.s * K.s * this.n * K.d, this.d * K.n);
}, clone: function() {
  return hr(this.s * this.n, this.d);
}, mod: function(r, e) {
  if (isNaN(this.n) || isNaN(this.d)) return new Er(NaN);
  if (r === void 0) return hr(this.s * this.n % this.d, 1);
  if (xr(r, e), K.n === 0 && this.d === 0) throw Ue();
  return hr(this.s * (K.d * this.n) % (K.n * this.d), K.d * this.d);
}, gcd: function(r, e) {
  return xr(r, e), hr(Jr(K.n, this.n) * Jr(K.d, this.d), K.d * this.d);
}, lcm: function(r, e) {
  return xr(r, e), K.n === 0 && this.n === 0 ? hr(0, 1) : hr(K.n * this.n, Jr(K.n, this.n) * Jr(K.d, this.d));
}, ceil: function(r) {
  return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new Er(NaN) : hr(Math.ceil(r * this.s * this.n / this.d), r);
}, floor: function(r) {
  return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new Er(NaN) : hr(Math.floor(r * this.s * this.n / this.d), r);
}, round: function(r) {
  return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new Er(NaN) : hr(Math.round(r * this.s * this.n / this.d), r);
}, roundTo: function(r, e) {
  return xr(r, e), hr(this.s * Math.round(this.n * K.d / (this.d * K.n)) * K.n, K.d);
}, inverse: function() {
  return hr(this.s * this.d, this.n);
}, pow: function(r, e) {
  if (xr(r, e), K.d === 1) return K.s < 0 ? hr(Math.pow(this.s * this.d, K.n), Math.pow(this.n, K.n)) : hr(Math.pow(this.s * this.n, K.n), Math.pow(this.d, K.n));
  if (this.s < 0) return null;
  var n = it(this.n), u = it(this.d), t = 1, a = 1;
  for (var s in n) if (s !== "1") {
    if (s === "0") {
      t = 0;
      break;
    }
    if (n[s] *= K.n, n[s] % K.d === 0) n[s] /= K.d;
    else return null;
    t *= Math.pow(s, n[s]);
  }
  for (var s in u) if (s !== "1") {
    if (u[s] *= K.n, u[s] % K.d === 0) u[s] /= K.d;
    else return null;
    a *= Math.pow(s, u[s]);
  }
  return K.s < 0 ? hr(a, t) : hr(t, a);
}, equals: function(r, e) {
  return xr(r, e), this.s * this.n * K.d === K.s * K.n * this.d;
}, compare: function(r, e) {
  xr(r, e);
  var n = this.s * this.n * K.d - K.s * K.n * this.d;
  return (0 < n) - (n < 0);
}, simplify: function(r) {
  if (isNaN(this.n) || isNaN(this.d)) return this;
  r = r || 1e-3;
  for (var e = this.abs(), n = e.toContinued(), u = 1; u < n.length; u++) {
    for (var t = hr(n[u - 1], 1), a = u - 2; a >= 0; a--) t = t.inverse().add(n[a]);
    if (Math.abs(t.sub(e).valueOf()) < r) return t.mul(this.s);
  }
  return this;
}, divisible: function(r, e) {
  return xr(r, e), !(!(K.n * this.d) || this.n * K.d % (K.n * this.d));
}, valueOf: function() {
  return this.s * this.n / this.d;
}, toFraction: function(r) {
  var e, n = "", u = this.n, t = this.d;
  return this.s < 0 && (n += "-"), t === 1 ? n += u : (r && (e = Math.floor(u / t)) > 0 && (n += e, n += " ", u %= t), n += u, n += "/", n += t), n;
}, toLatex: function(r) {
  var e, n = "", u = this.n, t = this.d;
  return this.s < 0 && (n += "-"), t === 1 ? n += u : (r && (e = Math.floor(u / t)) > 0 && (n += e, u %= t), n += "\\frac{", n += u, n += "}{", n += t, n += "}"), n;
}, toContinued: function() {
  var r, e = this.n, n = this.d, u = [];
  if (isNaN(e) || isNaN(n)) return u;
  do
    u.push(Math.floor(e / n)), r = e % n, e = n, n = r;
  while (e !== 1);
  return u;
}, toString: function(r) {
  var e = this.n, n = this.d;
  if (isNaN(e) || isNaN(n)) return "NaN";
  r = r || 15;
  var u = Yu(e, n), t = Ku(e, n, u), a = this.s < 0 ? "-" : "";
  if (a += e / n | 0, e %= n, e *= 10, e && (a += "."), u) {
    for (var s = t; s--; ) a += e / n | 0, e %= n, e *= 10;
    a += "(";
    for (var s = u; s--; ) a += e / n | 0, e %= n, e *= 10;
    a += ")";
  } else for (var s = r; e && s--; ) a += e / n | 0, e %= n, e *= 10;
  return a;
} };
var ku = "Fraction", ju = [], ra = J(ku, ju, () => (Object.defineProperty(Er, "name", { value: "Fraction" }), Er.prototype.constructor = Er, Er.prototype.type = "Fraction", Er.prototype.isFraction = true, Er.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: this.s * this.n, d: this.d };
}, Er.fromJSON = function(r) {
  return new Er(r);
}, Er), { isClass: true }), ea = "Matrix", ta = [], na = J(ea, ta, () => {
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
function Se(r, e, n) {
  var u = r.constructor, t = new u(2), a = "";
  if (n) {
    if (n < 1) throw new Error("size must be in greater than 0");
    if (!vr(n)) throw new Error("size must be an integer");
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
function ua(r, e) {
  if (typeof e == "function") return e(r);
  if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: n, precision: u, wordSize: t } = fn(e);
  switch (n) {
    case "fixed":
      return ia(r, u);
    case "exponential":
      return ot(r, u);
    case "engineering":
      return aa(r, u);
    case "bin":
      return Se(r, 2, t);
    case "oct":
      return Se(r, 8, t);
    case "hex":
      return Se(r, 16, t);
    case "auto": {
      var a = st(e == null ? void 0 : e.lowerExp, -3), s = st(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero()) return "0";
      var D, l = r.toSignificantDigits(u), v = l.e;
      return v >= a && v < s ? D = l.toFixed() : D = ot(r, u), D.replace(/((\.\d*?)(0+))($|e)/, function() {
        var i = arguments[2], f = arguments[4];
        return i !== "." ? i + f : f;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function aa(r, e) {
  var n = r.e, u = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -u)), a = t.toPrecision(e);
  if (a.includes("e")) {
    var s = r.constructor;
    a = new s(a).toFixed();
  }
  return a + "e" + (n >= 0 ? "+" : "") + u.toString();
}
function ot(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function ia(r, e) {
  return r.toFixed(e);
}
function st(r, e) {
  return fr(r) ? r : gr(r) ? r.toNumber() : e;
}
function pr(r, e) {
  var n = oa(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function oa(r, e) {
  if (typeof r == "number") return Me(r, e);
  if (gr(r)) return ua(r, e);
  if (sa(r)) return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
  if (Array.isArray(r)) return cn(r, e);
  if (Mr(r)) return ft(r);
  if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function") return r.format(e);
    if (r && r.toString(e) !== {}.toString()) return r.toString(e);
    var n = Object.keys(r).map((u) => ft(u) + ": " + pr(r[u], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function ft(r) {
  for (var e = String(r), n = "", u = 0; u < e.length; ) {
    var t = e.charAt(u);
    n += t in lt ? lt[t] : t, u++;
  }
  return '"' + n + '"';
}
var lt = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function cn(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", u = r.length, t = 0; t < u; t++) t !== 0 && (n += ", "), n += cn(r[t], e);
    return n += "]", n;
  } else return pr(r, e);
}
function sa(r) {
  return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || false;
}
function ur(r, e, n) {
  if (!(this instanceof ur)) throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
ur.prototype = new RangeError();
ur.prototype.constructor = RangeError;
ur.prototype.name = "DimensionError";
ur.prototype.isDimensionError = true;
function Rr(r, e, n) {
  if (!(this instanceof Rr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Rr.prototype = new RangeError();
Rr.prototype.constructor = RangeError;
Rr.prototype.name = "IndexError";
Rr.prototype.isIndexError = true;
function nr(r) {
  for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
  return e;
}
function Dn(r, e, n) {
  var u, t = r.length;
  if (t !== e[n]) throw new ur(t, e[n]);
  if (n < e.length - 1) {
    var a = n + 1;
    for (u = 0; u < t; u++) {
      var s = r[u];
      if (!Array.isArray(s)) throw new ur(e.length - 1, e.length, "<");
      Dn(r[u], e, a);
    }
  } else for (u = 0; u < t; u++) if (Array.isArray(r[u])) throw new ur(e.length + 1, e.length, ">");
}
function vt(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r)) throw new ur(r.length, 0);
  } else Dn(r, e, 0);
}
function mr(r, e) {
  if (r !== void 0) {
    if (!fr(r) || !vr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e) throw new Rr(r, e);
  }
}
function fe(r, e, n) {
  if (!Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!fr(t) || !vr(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + pr(e) + ")");
  }), (fr(r) || gr(r)) && (r = [r]);
  var u = n !== void 0 ? n : 0;
  return Ne(r, e, 0, u), r;
}
function Ne(r, e, n, u) {
  var t, a, s = r.length, D = e[n], l = Math.min(s, D);
  if (r.length = D, n < e.length - 1) {
    var v = n + 1;
    for (t = 0; t < l; t++) a = r[t], Array.isArray(a) || (a = [a], r[t] = a), Ne(a, e, v, u);
    for (t = l; t < D; t++) a = [], r[t] = a, Ne(a, e, v, u);
  } else {
    for (t = 0; t < l; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
    for (t = l; t < D; t++) r[t] = u;
  }
}
function Pe(r, e) {
  var n = Te(r), u = n.length;
  if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new ur(0, u, "!=");
  e = Le(e, u);
  var t = pn(e);
  if (u !== t) throw new ur(t, u, "!=");
  try {
    return fa(n, e);
  } catch (a) {
    throw a instanceof ur ? new ur(t, u, "!=") : a;
  }
}
function Le(r, e) {
  var n = pn(r), u = r.slice(), t = -1, a = r.indexOf(t), s = r.indexOf(t, a + 1) >= 0;
  if (s) throw new Error("More than one wildcard in sizes");
  var D = a >= 0, l = e % n === 0;
  if (D) if (l) u[a] = -e / n;
  else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return u;
}
function pn(r) {
  return r.reduce((e, n) => e * n, 1);
}
function fa(r, e) {
  for (var n = r, u, t = e.length - 1; t > 0; t--) {
    var a = e[t];
    u = [];
    for (var s = n.length / a, D = 0; D < s; D++) u.push(n.slice(D * a, (D + 1) * a));
    n = u;
  }
  return n;
}
function ct(r, e) {
  for (var n = nr(r); Array.isArray(r) && r.length === 1; ) r = r[0], n.shift();
  for (var u = n.length; n[u - 1] === 1; ) u--;
  return u < n.length && (r = dn(r, u, 0), n.length = u), r;
}
function dn(r, e, n) {
  var u, t;
  if (n < e) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = dn(r[u], e, a);
  } else for (; Array.isArray(r); ) r = r[0];
  return r;
}
function hn(r, e, n, u) {
  var t = u || nr(r);
  if (n) for (var a = 0; a < n; a++) r = [r], t.unshift(1);
  for (r = mn(r, e, 0); t.length < e; ) t.push(1);
  return r;
}
function mn(r, e, n) {
  var u, t;
  if (Array.isArray(r)) {
    var a = n + 1;
    for (u = 0, t = r.length; u < t; u++) r[u] = mn(r[u], e, a);
  } else for (var s = n; s < e; s++) r = [r];
  return r;
}
function Te(r) {
  if (!Array.isArray(r)) return r;
  var e = [];
  return r.forEach(function n(u) {
    Array.isArray(u) ? u.forEach(n) : e.push(u);
  }), e;
}
function Ae(r, e) {
  for (var n, u = 0, t = 0; t < r.length; t++) {
    var a = r[t], s = Array.isArray(a);
    if (t === 0 && s && (u = a.length), s && a.length !== u) return;
    var D = s ? Ae(a, e) : e(a);
    if (n === void 0) n = D;
    else if (n !== D) return "mixed";
  }
  return n;
}
function gn(r, e, n, u) {
  if (u < n) {
    if (r.length !== e.length) throw new ur(r.length, e.length);
    for (var t = [], a = 0; a < r.length; a++) t[a] = gn(r[a], e[a], n, u + 1);
    return t;
  } else return r.concat(e);
}
function yn() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1) return r[0];
  if (r.length > 1) return r.slice(1).reduce(function(n, u) {
    return gn(n, u, e, 0);
  }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function An() {
  for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
  for (var u = e.map((d) => d.length), t = Math.max(...u), a = new Array(t).fill(null), s = 0; s < e.length; s++) for (var D = e[s], l = u[s], v = 0; v < l; v++) {
    var i = t - l + v;
    D[v] > a[i] && (a[i] = D[v]);
  }
  for (var f = 0; f < e.length; f++) Fn(e[f], a);
  return a;
}
function Fn(r, e) {
  for (var n = e.length, u = r.length, t = 0; t < u; t++) {
    var a = n - u + t;
    if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(u, " with size ").concat(r[t], " to size ").concat(e[a]));
  }
}
function ze(r, e) {
  var n = nr(r);
  if (Ir(n, e)) return r;
  Fn(n, e);
  var u = An(n, e), t = u.length, a = [...Array(t - n.length).fill(1), ...n], s = va(r);
  n.length < t && (s = Pe(s, a), n = nr(s));
  for (var D = 0; D < t; D++) n[D] < u[D] && (s = la(s, u[D], D), n = nr(s));
  return s;
}
function la(r, e, n) {
  return yn(...Array(e).fill(r), n);
}
function En(r, e) {
  if (!Array.isArray(r)) throw new Error("Array expected");
  var n = nr(r);
  if (e.length !== n.length) throw new ur(e.length, n.length);
  for (var u = 0; u < e.length; u++) mr(e[u], n[u]);
  return e.reduce((t, a) => t[a], r);
}
function va(r) {
  return me([], r);
}
function le(r, e, n) {
  if (ie.isTypedFunction(r)) {
    var u = (e.isMatrix ? e.size() : nr(e)).map(() => 0), t = e.isMatrix ? e.get(u) : En(e, u), a = Object.keys(r.signatures).length === 1, s = ca(r, t, u, e), D = a ? Object.values(r.signatures)[0] : r;
    return s >= 1 && s <= 3 ? function() {
      for (var l = arguments.length, v = new Array(l), i = 0; i < l; i++) v[i] = arguments[i];
      return Dt(D, v.slice(0, s), n, r.name);
    } : function() {
      for (var l = arguments.length, v = new Array(l), i = 0; i < l; i++) v[i] = arguments[i];
      return Dt(D, v, n, r.name);
    };
  }
  return r;
}
function ca(r, e, n, u) {
  for (var t = [e, n, u], a = 3; a > 0; a--) {
    var s = t.slice(0, a);
    if (ie.resolve(r, s) !== null) return a;
  }
}
function Dt(r, e, n, u) {
  try {
    return r(...e);
  } catch (t) {
    Da(t, e, n, u);
  }
}
function Da(r, e, n, u) {
  var t;
  if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
    var a = [];
    throw a.push("value: ".concat(Nr(e[0]))), e.length >= 2 && a.push("index: ".concat(Nr(e[1]))), e.length >= 3 && a.push("array: ".concat(Nr(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(u, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
  } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(u, ": ").concat(r.message));
}
var pa = "DenseMatrix", da = ["Matrix"], ha = J(pa, da, (r) => {
  var { Matrix: e } = r;
  function n(i, f) {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    if (f && !Mr(f)) throw new Error("Invalid datatype: " + f);
    if (cr(i)) i.type === "DenseMatrix" ? (this._data = tr(i._data), this._size = tr(i._size), this._datatype = f || i._datatype) : (this._data = i.toArray(), this._size = i.size(), this._datatype = f || i._datatype);
    else if (i && Dr(i.data) && Dr(i.size)) this._data = i.data, this._size = i.size, vt(this._data, this._size), this._datatype = f || i.datatype;
    else if (Dr(i)) this._data = v(i), this._size = nr(this._data), vt(this._data, this._size), this._datatype = f;
    else {
      if (i) throw new TypeError("Unsupported type of data (" + Nr(i) + ")");
      this._data = [], this._size = [0], this._datatype = f;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(i, f) {
    return new n(i, f);
  }, Object.defineProperty(n, "name", { value: "DenseMatrix" }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
    return Ae(this._data, Nr);
  }, n.prototype.storage = function() {
    return "dense";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(i, f) {
    return new n(i, f);
  }, n.prototype.subset = function(i, f, d) {
    switch (arguments.length) {
      case 1:
        return u(this, i);
      case 2:
      case 3:
        return a(this, i, f, d);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.get = function(i) {
    return En(this._data, i);
  }, n.prototype.set = function(i, f, d) {
    if (!Dr(i)) throw new TypeError("Array expected");
    if (i.length < this._size.length) throw new ur(i.length, this._size.length, "<");
    var c, p, o, h = i.map(function(w) {
      return w + 1;
    });
    l(this, h, d);
    var g = this._data;
    for (c = 0, p = i.length - 1; c < p; c++) o = i[c], mr(o, g.length), g = g[o];
    return o = i[i.length - 1], mr(o, g.length), g[o] = f, this;
  };
  function u(i, f) {
    if (!qe(f)) throw new TypeError("Invalid index");
    var d = f.isScalar();
    if (d) return i.get(f.min());
    var c = f.size();
    if (c.length !== i._size.length) throw new ur(c.length, i._size.length);
    for (var p = f.min(), o = f.max(), h = 0, g = i._size.length; h < g; h++) mr(p[h], i._size[h]), mr(o[h], i._size[h]);
    return new n(t(i._data, f, c.length, 0), i._datatype);
  }
  function t(i, f, d, c) {
    var p = c === d - 1, o = f.dimension(c);
    return p ? o.map(function(h) {
      return mr(h, i.length), i[h];
    }).valueOf() : o.map(function(h) {
      mr(h, i.length);
      var g = i[h];
      return t(g, f, d, c + 1);
    }).valueOf();
  }
  function a(i, f, d, c) {
    if (!f || f.isIndex !== true) throw new TypeError("Invalid index");
    var p = f.size(), o = f.isScalar(), h;
    if (cr(d) ? (h = d.size(), d = d.valueOf()) : h = nr(d), o) {
      if (h.length !== 0) throw new TypeError("Scalar expected");
      i.set(f.min(), d, c);
    } else {
      if (!Ir(h, p)) try {
        h.length === 0 ? d = ze([d], p) : d = ze(d, p), h = nr(d);
      } catch {
      }
      if (p.length < i._size.length) throw new ur(p.length, i._size.length, "<");
      if (h.length < p.length) {
        for (var g = 0, w = 0; p[g] === 1 && h[g] === 1; ) g++;
        for (; p[g] === 1; ) w++, g++;
        d = hn(d, p.length, w, h);
      }
      if (!Ir(p, h)) throw new ur(p, h, ">");
      var y = f.max().map(function(A) {
        return A + 1;
      });
      l(i, y, c);
      var b = p.length, F = 0;
      s(i._data, f, d, b, F);
    }
    return i;
  }
  function s(i, f, d, c, p) {
    var o = p === c - 1, h = f.dimension(p);
    o ? h.forEach(function(g, w) {
      mr(g), i[g] = d[w[0]];
    }) : h.forEach(function(g, w) {
      mr(g), s(i[g], f, d[w[0]], c, p + 1);
    });
  }
  n.prototype.resize = function(i, f, d) {
    if (!se(i)) throw new TypeError("Array or Matrix expected");
    var c = i.valueOf().map((o) => Array.isArray(o) && o.length === 1 ? o[0] : o), p = d ? this.clone() : this;
    return D(p, c, f);
  };
  function D(i, f, d) {
    if (f.length === 0) {
      for (var c = i._data; Dr(c); ) c = c[0];
      return c;
    }
    return i._size = f.slice(0), i._data = fe(i._data, i._size, d), i;
  }
  n.prototype.reshape = function(i, f) {
    var d = f ? this.clone() : this;
    d._data = Pe(d._data, i);
    var c = d._size.reduce((p, o) => p * o);
    return d._size = Le(i, c), d;
  };
  function l(i, f, d) {
    for (var c = i._size.slice(0), p = false; c.length < f.length; ) c.push(0), p = true;
    for (var o = 0, h = f.length; o < h; o++) f[o] > c[o] && (c[o] = f[o], p = true);
    p && D(i, c, d);
  }
  n.prototype.clone = function() {
    var i = new n({ data: tr(this._data), size: tr(this._size), datatype: this._datatype });
    return i;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype._forEach = function(i) {
    var f = this, d = f.size();
    if (d.length === 1) {
      for (var c = 0; c < d[0]; c++) i(f._data, c, [c]);
      return;
    }
    var p = Array(d.length).fill(0), o = Array(d.length - 1), h = o.length - 1;
    o[0] = f._data[0];
    for (var g = 0; g < h; g++) o[g + 1] = o[g][0];
    for (p[h] = -1; ; ) {
      var w = void 0;
      for (w = h; w >= 0; w--) {
        if (p[w]++, p[w] === d[w]) {
          p[w] = 0;
          continue;
        }
        o[w] = w === 0 ? f._data[p[w]] : o[w - 1][p[w]];
        for (var y = w; y < h; y++) o[y + 1] = o[y][0];
        for (var b = 0; b < d[o.length]; b++) p[o.length] = b, i(o[h], b, p.slice(0));
        break;
      }
      if (w === -1) break;
    }
  }, n.prototype.map = function(i) {
    var f = this, d = new n(f), c = le(i, f._data, "map");
    return d._forEach(function(p, o, h) {
      p[o] = c(p[o], h, f);
    }), d;
  }, n.prototype.forEach = function(i) {
    var f = this, d = le(i, f._data, "map");
    f._forEach(function(c, p, o) {
      d(c[p], o, f);
    });
  }, n.prototype[Symbol.iterator] = function* () {
    var i = function* (d, c) {
      if (Dr(d)) for (var p = 0; p < d.length; p++) yield* i(d[p], c.concat(p));
      else yield { value: d, index: c };
    };
    yield* i(this._data, []);
  }, n.prototype.rows = function() {
    var i = [], f = this.size();
    if (f.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    var d = this._data;
    for (var c of d) i.push(new n([c], this._datatype));
    return i;
  }, n.prototype.columns = function() {
    var i = this, f = [], d = this.size();
    if (d.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var c = this._data, p = function(g) {
      var w = c.map((y) => [y[g]]);
      f.push(new n(w, i._datatype));
    }, o = 0; o < d[1]; o++) p(o);
    return f;
  }, n.prototype.toArray = function() {
    return tr(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(i) {
    return pr(this._data, i);
  }, n.prototype.toString = function() {
    return pr(this._data);
  }, n.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(i) {
    if (i) {
      if (gr(i) && (i = i.toNumber()), !fr(i) || !vr(i)) throw new TypeError("The parameter k must be an integer number");
    } else i = 0;
    for (var f = i > 0 ? i : 0, d = i < 0 ? -i : 0, c = this._size[0], p = this._size[1], o = Math.min(c - d, p - f), h = [], g = 0; g < o; g++) h[g] = this._data[g + d][g + f];
    return new n({ data: h, size: [o], datatype: this._datatype });
  }, n.diagonal = function(i, f, d, c) {
    if (!Dr(i)) throw new TypeError("Array expected, size parameter");
    if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (i = i.map(function(C) {
      if (gr(C) && (C = C.toNumber()), !fr(C) || !vr(C) || C < 1) throw new Error("Size values must be positive integers");
      return C;
    }), d) {
      if (gr(d) && (d = d.toNumber()), !fr(d) || !vr(d)) throw new TypeError("The parameter k must be an integer number");
    } else d = 0;
    var p = d > 0 ? d : 0, o = d < 0 ? -d : 0, h = i[0], g = i[1], w = Math.min(h - o, g - p), y;
    if (Dr(f)) {
      if (f.length !== w) throw new Error("Invalid value array length");
      y = function(E) {
        return f[E];
      };
    } else if (cr(f)) {
      var b = f.size();
      if (b.length !== 1 || b[0] !== w) throw new Error("Invalid matrix length");
      y = function(E) {
        return f.get([E]);
      };
    } else y = function() {
      return f;
    };
    c || (c = gr(y(0)) ? y(0).mul(0) : 0);
    var F = [];
    if (i.length > 0) {
      F = fe(F, i, c);
      for (var A = 0; A < w; A++) F[A + o][A + p] = y(A);
    }
    return new n({ data: F, size: [h, g] });
  }, n.fromJSON = function(i) {
    return new n(i);
  }, n.prototype.swapRows = function(i, f) {
    if (!fr(i) || !vr(i) || !fr(f) || !vr(f)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return mr(i, this._size[0]), mr(f, this._size[0]), n._swapRows(i, f, this._data), this;
  }, n._swapRows = function(i, f, d) {
    var c = d[i];
    d[i] = d[f], d[f] = c;
  };
  function v(i) {
    return cr(i) ? v(i.valueOf()) : Dr(i) ? i.map(v) : i;
  }
  return n;
}, { isClass: true });
function Cr(r, e, n) {
  return r && typeof r.map == "function" ? r.map(function(u) {
    return Cr(u, e);
  }) : e(r);
}
var pt = "isInteger", ma = ["typed"], ga = J(pt, ma, (r) => {
  var { typed: e } = r;
  return e(pt, { number: vr, BigNumber: function(u) {
    return u.isInt();
  }, bigint: function(u) {
    return true;
  }, Fraction: function(u) {
    return u.d === 1 && isFinite(u.n);
  }, "Array | Matrix": e.referToSelf((n) => (u) => Cr(u, n)) });
}), Ve = "number", Fe = "number, number";
function wn(r) {
  return Math.abs(r);
}
wn.signature = Ve;
function Cn(r, e) {
  return r + e;
}
Cn.signature = Fe;
function bn(r, e) {
  return r - e;
}
bn.signature = Fe;
function _n(r, e) {
  return r * e;
}
_n.signature = Fe;
function Bn(r) {
  return -r;
}
Bn.signature = Ve;
function Oe(r) {
  return zu(r);
}
Oe.signature = Ve;
function xn(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
xn.signature = Fe;
var ya = "number";
function Sn(r) {
  return r > 0;
}
Sn.signature = ya;
function Qr(r, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (u < 0) throw new Error("Absolute tolerance must be at least 0");
  return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), u));
}
var dt = "isPositive", Aa = ["typed", "config"], Fa = J(dt, Aa, (r) => {
  var { typed: e, config: n } = r;
  return e(dt, { number: (u) => $r(u, 0, n.relTol, n.absTol) ? false : Sn(u), BigNumber: (u) => Qr(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(), bigint: (u) => u > 0n, Fraction: (u) => u.s > 0 && u.n > 0, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Cr(t, u)) });
}), ht = "isZero", Ea = ["typed", "equalScalar"], wa = J(ht, Ea, (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(ht, { "number | BigNumber | Complex | Fraction": (u) => n(u, 0), bigint: (u) => u === 0n, Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)), "Array | Matrix": e.referToSelf((u) => (t) => Cr(t, u)) });
});
function Ca(r, e, n, u) {
  return $r(r.re, e.re, n, u) && $r(r.im, e.im, n, u);
}
var Hr = J("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((n) => (u, t) => {
    if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
    return e.find(n, [u.valueType(), t.valueType()])(u.value, t.value);
  }) };
}), ve = "equalScalar", ba = ["typed", "config"], _a = J(ve, ba, (r) => {
  var { typed: e, config: n } = r, u = Hr({ typed: e });
  return e(ve, { "boolean, boolean": function(a, s) {
    return a === s;
  }, "number, number": function(a, s) {
    return $r(a, s, n.relTol, n.absTol);
  }, "BigNumber, BigNumber": function(a, s) {
    return a.eq(s) || Qr(a, s, n.relTol, n.absTol);
  }, "bigint, bigint": function(a, s) {
    return a === s;
  }, "Fraction, Fraction": function(a, s) {
    return a.equals(s);
  }, "Complex, Complex": function(a, s) {
    return Ca(a, s, n.relTol, n.absTol);
  } }, u);
});
J(ve, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(ve, { "number, number": function(t, a) {
    return $r(t, a, n.relTol, n.absTol);
  } });
});
var Ba = "SparseMatrix", xa = ["typed", "equalScalar", "Matrix"], Sa = J(Ba, xa, (r) => {
  var { typed: e, equalScalar: n, Matrix: u } = r;
  function t(o, h) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (h && !Mr(h)) throw new Error("Invalid datatype: " + h);
    if (cr(o)) a(this, o, h);
    else if (o && Dr(o.index) && Dr(o.ptr) && Dr(o.size)) this._values = o.values, this._index = o.index, this._ptr = o.ptr, this._size = o.size, this._datatype = h || o.datatype;
    else if (Dr(o)) s(this, o, h);
    else {
      if (o) throw new TypeError("Unsupported type of data (" + Nr(o) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = h;
    }
  }
  function a(o, h, g) {
    h.type === "SparseMatrix" ? (o._values = h._values ? tr(h._values) : void 0, o._index = tr(h._index), o._ptr = tr(h._ptr), o._size = tr(h._size), o._datatype = g || h._datatype) : s(o, h.valueOf(), g || h._datatype);
  }
  function s(o, h, g) {
    o._values = [], o._index = [], o._ptr = [], o._datatype = g;
    var w = h.length, y = 0, b = n, F = 0;
    if (Mr(g) && (b = e.find(n, [g, g]) || n, F = e.convert(0, g)), w > 0) {
      var A = 0;
      do {
        o._ptr.push(o._index.length);
        for (var C = 0; C < w; C++) {
          var E = h[C];
          if (Dr(E)) {
            if (A === 0 && y < E.length && (y = E.length), A < E.length) {
              var m = E[A];
              b(m, F) || (o._values.push(m), o._index.push(C));
            }
          } else A === 0 && y < 1 && (y = 1), b(E, F) || (o._values.push(E), o._index.push(C));
        }
        A++;
      } while (A < y);
    }
    o._ptr.push(o._index.length), o._size = [w, y];
  }
  t.prototype = new u(), t.prototype.createSparseMatrix = function(o, h) {
    return new t(o, h);
  }, Object.defineProperty(t, "name", { value: "SparseMatrix" }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
    return Ae(this._values, Nr);
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
        return l(this, o, h, g);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function D(o, h) {
    if (!qe(h)) throw new TypeError("Invalid index");
    var g = h.isScalar();
    if (g) return o.get(h.min());
    var w = h.size();
    if (w.length !== o._size.length) throw new ur(w.length, o._size.length);
    var y, b, F, A, C = h.min(), E = h.max();
    for (y = 0, b = o._size.length; y < b; y++) mr(C[y], o._size[y]), mr(E[y], o._size[y]);
    var m = o._values, _ = o._index, B = o._ptr, x = h.dimension(0), N = h.dimension(1), S = [], O = [];
    x.forEach(function($, Q) {
      O[$] = Q[0], S[$] = true;
    });
    var M = m ? [] : void 0, R = [], T = [];
    return N.forEach(function($) {
      for (T.push(R.length), F = B[$], A = B[$ + 1]; F < A; F++) y = _[F], S[y] === true && (R.push(O[y]), M && M.push(m[F]));
    }), T.push(R.length), new t({ values: M, index: R, ptr: T, size: w, datatype: o._datatype });
  }
  function l(o, h, g, w) {
    if (!h || h.isIndex !== true) throw new TypeError("Invalid index");
    var y = h.size(), b = h.isScalar(), F;
    if (cr(g) ? (F = g.size(), g = g.toArray()) : F = nr(g), b) {
      if (F.length !== 0) throw new TypeError("Scalar expected");
      o.set(h.min(), g, w);
    } else {
      if (y.length !== 1 && y.length !== 2) throw new ur(y.length, o._size.length, "<");
      if (F.length < y.length) {
        for (var A = 0, C = 0; y[A] === 1 && F[A] === 1; ) A++;
        for (; y[A] === 1; ) C++, A++;
        g = hn(g, y.length, C, F);
      }
      if (!Ir(y, F)) throw new ur(y, F, ">");
      if (y.length === 1) {
        var E = h.dimension(0);
        E.forEach(function(B, x) {
          mr(B), o.set([B, 0], g[x[0]], w);
        });
      } else {
        var m = h.dimension(0), _ = h.dimension(1);
        m.forEach(function(B, x) {
          mr(B), _.forEach(function(N, S) {
            mr(N), o.set([B, N], g[x[0]][S[0]], w);
          });
        });
      }
    }
    return o;
  }
  t.prototype.get = function(o) {
    if (!Dr(o)) throw new TypeError("Array expected");
    if (o.length !== this._size.length) throw new ur(o.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
    var h = o[0], g = o[1];
    mr(h, this._size[0]), mr(g, this._size[1]);
    var w = v(h, this._ptr[g], this._ptr[g + 1], this._index);
    return w < this._ptr[g + 1] && this._index[w] === h ? this._values[w] : 0;
  }, t.prototype.set = function(o, h, g) {
    if (!Dr(o)) throw new TypeError("Array expected");
    if (o.length !== this._size.length) throw new ur(o.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = o[0], y = o[1], b = this._size[0], F = this._size[1], A = n, C = 0;
    Mr(this._datatype) && (A = e.find(n, [this._datatype, this._datatype]) || n, C = e.convert(0, this._datatype)), (w > b - 1 || y > F - 1) && (d(this, Math.max(w + 1, b), Math.max(y + 1, F), g), b = this._size[0], F = this._size[1]), mr(w, b), mr(y, F);
    var E = v(w, this._ptr[y], this._ptr[y + 1], this._index);
    return E < this._ptr[y + 1] && this._index[E] === w ? A(h, C) ? i(E, y, this._values, this._index, this._ptr) : this._values[E] = h : A(h, C) || f(E, w, y, h, this._values, this._index, this._ptr), this;
  };
  function v(o, h, g, w) {
    if (g - h === 0) return g;
    for (var y = h; y < g; y++) if (w[y] === o) return y;
    return h;
  }
  function i(o, h, g, w, y) {
    g.splice(o, 1), w.splice(o, 1);
    for (var b = h + 1; b < y.length; b++) y[b]--;
  }
  function f(o, h, g, w, y, b, F) {
    y.splice(o, 0, w), b.splice(o, 0, h);
    for (var A = g + 1; A < F.length; A++) F[A]++;
  }
  t.prototype.resize = function(o, h, g) {
    if (!se(o)) throw new TypeError("Array or Matrix expected");
    var w = o.valueOf().map((b) => Array.isArray(b) && b.length === 1 ? b[0] : b);
    if (w.length !== 2) throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(b) {
      if (!fr(b) || !vr(b) || b < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + pr(w) + ")");
    });
    var y = g ? this.clone() : this;
    return d(y, w[0], w[1], h);
  };
  function d(o, h, g, w) {
    var y = w || 0, b = n, F = 0;
    Mr(o._datatype) && (b = e.find(n, [o._datatype, o._datatype]) || n, F = e.convert(0, o._datatype), y = e.convert(y, o._datatype));
    var A = !b(y, F), C = o._size[0], E = o._size[1], m, _, B;
    if (g > E) {
      for (_ = E; _ < g; _++) if (o._ptr[_] = o._values.length, A) for (m = 0; m < C; m++) o._values.push(y), o._index.push(m);
      o._ptr[g] = o._values.length;
    } else g < E && (o._ptr.splice(g + 1, E - g), o._values.splice(o._ptr[g], o._values.length), o._index.splice(o._ptr[g], o._index.length));
    if (E = g, h > C) {
      if (A) {
        var x = 0;
        for (_ = 0; _ < E; _++) {
          o._ptr[_] = o._ptr[_] + x, B = o._ptr[_ + 1] + x;
          var N = 0;
          for (m = C; m < h; m++, N++) o._values.splice(B + N, 0, y), o._index.splice(B + N, 0, m), x++;
        }
        o._ptr[E] = o._values.length;
      }
    } else if (h < C) {
      var S = 0;
      for (_ = 0; _ < E; _++) {
        o._ptr[_] = o._ptr[_] - S;
        var O = o._ptr[_], M = o._ptr[_ + 1] - S;
        for (B = O; B < M; B++) m = o._index[B], m > h - 1 && (o._values.splice(B, 1), o._index.splice(B, 1), S++);
      }
      o._ptr[_] = o._values.length;
    }
    return o._size[0] = h, o._size[1] = g, o;
  }
  t.prototype.reshape = function(o, h) {
    if (!Dr(o)) throw new TypeError("Array expected");
    if (o.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    o.forEach(function($) {
      if (!fr($) || !vr($) || $ <= -2 || $ === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + pr(o) + ")");
    });
    var g = this._size[0] * this._size[1];
    o = Le(o, g);
    var w = o[0] * o[1];
    if (g !== w) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var y = h ? this.clone() : this;
    if (this._size[0] === o[0] && this._size[1] === o[1]) return y;
    for (var b = [], F = 0; F < y._ptr.length; F++) for (var A = 0; A < y._ptr[F + 1] - y._ptr[F]; A++) b.push(F);
    for (var C = y._values.slice(), E = y._index.slice(), m = 0; m < y._index.length; m++) {
      var _ = E[m], B = b[m], x = _ * y._size[1] + B;
      b[m] = x % o[1], E[m] = Math.floor(x / o[1]);
    }
    y._values.length = 0, y._index.length = 0, y._ptr.length = o[1] + 1, y._size = o.slice();
    for (var N = 0; N < y._ptr.length; N++) y._ptr[N] = 0;
    for (var S = 0; S < C.length; S++) {
      var O = E[S], M = b[S], R = C[S], T = v(O, y._ptr[M], y._ptr[M + 1], y._index);
      f(T, O, M, R, y._values, y._index, y._ptr);
    }
    return y;
  }, t.prototype.clone = function() {
    var o = new t({ values: this._values ? tr(this._values) : void 0, index: tr(this._index), ptr: tr(this._ptr), size: tr(this._size), datatype: this._datatype });
    return o;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(o, h) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var g = this, w = this._size[0], y = this._size[1], b = le(o, g, "map"), F = function(C, E, m) {
      return b(C, [E, m], g);
    };
    return c(this, 0, w - 1, 0, y - 1, F, h);
  };
  function c(o, h, g, w, y, b, F) {
    var A = [], C = [], E = [], m = n, _ = 0;
    Mr(o._datatype) && (m = e.find(n, [o._datatype, o._datatype]) || n, _ = e.convert(0, o._datatype));
    for (var B = function(I, W, X) {
      var V = b(I, W, X);
      m(V, _) || (A.push(V), C.push(W));
    }, x = w; x <= y; x++) {
      E.push(A.length);
      var N = o._ptr[x], S = o._ptr[x + 1];
      if (F) for (var O = N; O < S; O++) {
        var M = o._index[O];
        M >= h && M <= g && B(o._values[O], M - h, x - w);
      }
      else {
        for (var R = {}, T = N; T < S; T++) {
          var $ = o._index[T];
          R[$] = o._values[T];
        }
        for (var Q = h; Q <= g; Q++) {
          var G = Q in R ? R[Q] : 0;
          B(G, Q - h, x - w);
        }
      }
    }
    return E.push(A.length), new t({ values: A, index: C, ptr: E, size: [g - h + 1, y - w + 1] });
  }
  t.prototype.forEach = function(o, h) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var g = this, w = this._size[0], y = this._size[1], b = le(o, g, "forEach"), F = 0; F < y; F++) {
      var A = this._ptr[F], C = this._ptr[F + 1];
      if (h) for (var E = A; E < C; E++) {
        var m = this._index[E];
        b(this._values[E], [m, F], g);
      }
      else {
        for (var _ = {}, B = A; B < C; B++) {
          var x = this._index[B];
          _[x] = this._values[B];
        }
        for (var N = 0; N < w; N++) {
          var S = N in _ ? _[N] : 0;
          b(S, [N, F], g);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var o = this._size[1], h = 0; h < o; h++) for (var g = this._ptr[h], w = this._ptr[h + 1], y = g; y < w; y++) {
      var b = this._index[y];
      yield { value: this._values[y], index: [b, h] };
    }
  }, t.prototype.toArray = function() {
    return p(this._values, this._index, this._ptr, this._size, true);
  }, t.prototype.valueOf = function() {
    return p(this._values, this._index, this._ptr, this._size, false);
  };
  function p(o, h, g, w, y) {
    var b = w[0], F = w[1], A = [], C, E;
    for (C = 0; C < b; C++) for (A[C] = [], E = 0; E < F; E++) A[C][E] = 0;
    for (E = 0; E < F; E++) for (var m = g[E], _ = g[E + 1], B = m; B < _; B++) C = h[B], A[C][E] = o ? y ? tr(o[B]) : o[B] : 1;
    return A;
  }
  return t.prototype.format = function(o) {
    for (var h = this._size[0], g = this._size[1], w = this.density(), y = "Sparse Matrix [" + pr(h, o) + " x " + pr(g, o) + "] density: " + pr(w, o) + `
`, b = 0; b < g; b++) for (var F = this._ptr[b], A = this._ptr[b + 1], C = F; C < A; C++) {
      var E = this._index[C];
      y += `
    (` + pr(E, o) + ", " + pr(b, o) + ") ==> " + (this._values ? pr(this._values[C], o) : "X");
    }
    return y;
  }, t.prototype.toString = function() {
    return pr(this.toArray());
  }, t.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(o) {
    if (o) {
      if (gr(o) && (o = o.toNumber()), !fr(o) || !vr(o)) throw new TypeError("The parameter k must be an integer number");
    } else o = 0;
    var h = o > 0 ? o : 0, g = o < 0 ? -o : 0, w = this._size[0], y = this._size[1], b = Math.min(w - g, y - h), F = [], A = [], C = [];
    C[0] = 0;
    for (var E = h; E < y && F.length < b; E++) for (var m = this._ptr[E], _ = this._ptr[E + 1], B = m; B < _; B++) {
      var x = this._index[B];
      if (x === E - h + g) {
        F.push(this._values[B]), A[F.length - 1] = x - g;
        break;
      }
    }
    return C.push(F.length), new t({ values: F, index: A, ptr: C, size: [b, 1] });
  }, t.fromJSON = function(o) {
    return new t(o);
  }, t.diagonal = function(o, h, g, w, y) {
    if (!Dr(o)) throw new TypeError("Array expected, size parameter");
    if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function($) {
      if (gr($) && ($ = $.toNumber()), !fr($) || !vr($) || $ < 1) throw new Error("Size values must be positive integers");
      return $;
    }), g) {
      if (gr(g) && (g = g.toNumber()), !fr(g) || !vr(g)) throw new TypeError("The parameter k must be an integer number");
    } else g = 0;
    var b = n, F = 0;
    Mr(y) && (b = e.find(n, [y, y]) || n, F = e.convert(0, y));
    var A = g > 0 ? g : 0, C = g < 0 ? -g : 0, E = o[0], m = o[1], _ = Math.min(E - C, m - A), B;
    if (Dr(h)) {
      if (h.length !== _) throw new Error("Invalid value array length");
      B = function(Q) {
        return h[Q];
      };
    } else if (cr(h)) {
      var x = h.size();
      if (x.length !== 1 || x[0] !== _) throw new Error("Invalid matrix length");
      B = function(Q) {
        return h.get([Q]);
      };
    } else B = function() {
      return h;
    };
    for (var N = [], S = [], O = [], M = 0; M < m; M++) {
      O.push(N.length);
      var R = M - A;
      if (R >= 0 && R < _) {
        var T = B(R);
        b(T, F) || (S.push(R + C), N.push(T));
      }
    }
    return O.push(N.length), new t({ values: N, index: S, ptr: O, size: [E, m] });
  }, t.prototype.swapRows = function(o, h) {
    if (!fr(o) || !vr(o) || !fr(h) || !vr(h)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return mr(o, this._size[0]), mr(h, this._size[0]), t._swapRows(o, h, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(o, h, g, w, y) {
    for (var b = w[o], F = w[o + 1], A = b; A < F; A++) y(g[A], h[A]);
  }, t._swapRows = function(o, h, g, w, y, b) {
    for (var F = 0; F < g; F++) {
      var A = b[F], C = b[F + 1], E = v(o, A, C, y), m = v(h, A, C, y);
      if (E < C && m < C && y[E] === o && y[m] === h) {
        if (w) {
          var _ = w[E];
          w[E] = w[m], w[m] = _;
        }
        continue;
      }
      if (E < C && y[E] === o && (m >= C || y[m] !== h)) {
        var B = w ? w[E] : void 0;
        y.splice(m, 0, h), w && w.splice(m, 0, B), y.splice(m <= E ? E + 1 : E, 1), w && w.splice(m <= E ? E + 1 : E, 1);
        continue;
      }
      if (m < C && y[m] === h && (E >= C || y[E] !== o)) {
        var x = w ? w[m] : void 0;
        y.splice(E, 0, o), w && w.splice(E, 0, x), y.splice(E <= m ? m + 1 : m, 1), w && w.splice(E <= m ? m + 1 : m, 1);
      }
    }
  }, t;
}, { isClass: true }), Ma = "number", Na = ["typed"];
function Ta(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], u = e[2], t = e[3];
    return { input: r, radix: n, integerPart: u, fractionalPart: t };
  } else return null;
}
function za(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, u = 0; u < r.fractionalPart.length; u++) {
    var t = parseInt(r.fractionalPart[u], r.radix);
    n += t / Math.pow(r.radix, u + 1);
  }
  var a = e + n;
  if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return a;
}
var Oa = J(Ma, Na, (r) => {
  var { typed: e } = r, n = e("number", { "": function() {
    return 0;
  }, number: function(t) {
    return t;
  }, string: function(t) {
    if (t === "NaN") return NaN;
    var a = Ta(t);
    if (a) return za(a);
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Cr(t, u)) });
  return n.fromJSON = function(u) {
    return parseFloat(u.value);
  }, n;
}), $a = "bignumber", Ia = ["typed", "BigNumber"], qa = J($a, Ia, (r) => {
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
      var v = new n(2).pow(Number(s) - 1);
      return D.gte(v) ? D.sub(l) : D;
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
    return new n(t.n).div(t.d).times(t.s);
  }, null: function(t) {
    return new n(0);
  }, "Array | Matrix": e.referToSelf((u) => (t) => Cr(t, u)) });
}), Ra = "complex", Ua = ["typed", "Complex"], Pa = J(Ra, Ua, (r) => {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Cr(t, u)) });
}), La = "fraction", Va = ["typed", "Fraction"], Za = J(La, Va, (r) => {
  var { typed: e, Fraction: n } = r;
  return e("fraction", { number: function(t) {
    if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");
    return new n(t);
  }, string: function(t) {
    return new n(t);
  }, "number, number": function(t, a) {
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
  }, "Array | Matrix": e.referToSelf((u) => (t) => Cr(t, u)) });
}), mt = "matrix", Ja = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], Wa = J(mt, Ja, (r) => {
  var { typed: e, Matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(mt, { "": function() {
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
}), gt = "matrixFromColumns", Qa = ["typed", "matrix", "flatten", "size"], Xa = J(gt, Qa, (r) => {
  var { typed: e, matrix: n, flatten: u, size: t } = r;
  return e(gt, { "...Array": function(l) {
    return a(l);
  }, "...Matrix": function(l) {
    return n(a(l.map((v) => v.toArray())));
  } });
  function a(D) {
    if (D.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
    for (var l = s(D[0]), v = [], i = 0; i < l; i++) v[i] = [];
    for (var f of D) {
      var d = s(f);
      if (d !== l) throw new TypeError("The vectors had different length: " + (l | 0) + " \u2260 " + (d | 0));
      for (var c = u(f), p = 0; p < l; p++) v[p].push(c[p]);
    }
    return v;
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
}), yt = "unaryMinus", Ga = ["typed"], Ya = J(yt, Ga, (r) => {
  var { typed: e } = r;
  return e(yt, { number: Bn, "Complex | BigNumber | Fraction": (n) => n.neg(), bigint: (n) => -n, Unit: e.referToSelf((n) => (u) => {
    var t = u.clone();
    return t.value = e.find(n, t.valueType())(u.value), t;
  }), "Array | Matrix": e.referToSelf((n) => (u) => Cr(u, n)) });
}), At = "abs", Ka = ["typed"], Ha = J(At, Ka, (r) => {
  var { typed: e } = r;
  return e(At, { number: wn, "Complex | BigNumber | Fraction | Unit": (n) => n.abs(), bigint: (n) => n < 0n ? -n : n, "Array | Matrix": e.referToSelf((n) => (u) => Cr(u, n)) });
}), Ft = "addScalar", ka = ["typed"], ja = J(Ft, ka, (r) => {
  var { typed: e } = r;
  return e(Ft, { "number, number": Cn, "Complex, Complex": function(u, t) {
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
}), Et = "subtractScalar", ri = ["typed"], ei = J(Et, ri, (r) => {
  var { typed: e } = r;
  return e(Et, { "number, number": bn, "Complex, Complex": function(u, t) {
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
}), ti = "matAlgo11xS0s", ni = ["typed", "equalScalar"], Mn = J(ti, ni, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s, D) {
    var l = t._values, v = t._index, i = t._ptr, f = t._size, d = t._datatype;
    if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var c = f[0], p = f[1], o, h = n, g = 0, w = s;
    typeof d == "string" && (o = d, h = e.find(n, [o, o]), g = e.convert(0, o), a = e.convert(a, o), w = e.find(s, [o, o]));
    for (var y = [], b = [], F = [], A = 0; A < p; A++) {
      F[A] = b.length;
      for (var C = i[A], E = i[A + 1], m = C; m < E; m++) {
        var _ = v[m], B = D ? w(a, l[m]) : w(l[m], a);
        h(B, g) || (b.push(_), y.push(B));
      }
    }
    return F[p] = b.length, t.createSparseMatrix({ values: y, index: b, ptr: F, size: [c, p], datatype: o });
  };
}), ui = "matAlgo12xSfs", ai = ["typed", "DenseMatrix"], Xr = J(ui, ai, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var l = t._values, v = t._index, i = t._ptr, f = t._size, d = t._datatype;
    if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var c = f[0], p = f[1], o, h = s;
    typeof d == "string" && (o = d, a = e.convert(a, o), h = e.find(s, [o, o]));
    for (var g = [], w = [], y = [], b = 0; b < p; b++) {
      for (var F = b + 1, A = i[b], C = i[b + 1], E = A; E < C; E++) {
        var m = v[E];
        w[m] = l[E], y[m] = F;
      }
      for (var _ = 0; _ < c; _++) b === 0 && (g[_] = []), y[_] === F ? g[_][b] = D ? h(a, w[_]) : h(w[_], a) : g[_][b] = D ? h(a, 0) : h(0, a);
    }
    return new n({ data: g, size: [c, p], datatype: o });
  };
}), ii = "matAlgo14xDs", oi = ["typed"], Ze = J(ii, oi, (r) => {
  var { typed: e } = r;
  return function(t, a, s, D) {
    var l = t._data, v = t._size, i = t._datatype, f, d = s;
    typeof i == "string" && (f = i, a = e.convert(a, f), d = e.find(s, [f, f]));
    var c = v.length > 0 ? n(d, 0, v, v[0], l, a, D) : [];
    return t.createDenseMatrix({ data: c, size: tr(v), datatype: f });
  };
  function n(u, t, a, s, D, l, v) {
    var i = [];
    if (t === a.length - 1) for (var f = 0; f < s; f++) i[f] = v ? u(l, D[f]) : u(D[f], l);
    else for (var d = 0; d < s; d++) i[d] = n(u, t + 1, a, a[t + 1], D[d], l, v);
    return i;
  }
}), si = "matAlgo03xDSf", fi = ["typed"], Gr = J(si, fi, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, l = u._size, v = u._datatype || u.getDataType(), i = t._values, f = t._index, d = t._ptr, c = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (l.length !== c.length) throw new ur(l.length, c.length);
    if (l[0] !== c[0] || l[1] !== c[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + c + ")");
    if (!i) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var o = l[0], h = l[1], g, w = 0, y = a;
    typeof v == "string" && v === p && v !== "mixed" && (g = v, w = e.convert(0, g), y = e.find(a, [g, g]));
    for (var b = [], F = 0; F < o; F++) b[F] = [];
    for (var A = [], C = [], E = 0; E < h; E++) {
      for (var m = E + 1, _ = d[E], B = d[E + 1], x = _; x < B; x++) {
        var N = f[x];
        A[N] = s ? y(i[x], D[N][E]) : y(D[N][E], i[x]), C[N] = m;
      }
      for (var S = 0; S < o; S++) C[S] === m ? b[S][E] = A[S] : b[S][E] = s ? y(w, D[S][E]) : y(D[S][E], w);
    }
    return u.createDenseMatrix({ data: b, size: [o, h], datatype: v === u._datatype && p === t._datatype ? g : void 0 });
  };
}), li = "matAlgo05xSfSf", vi = ["typed", "equalScalar"], ci = J(li, vi, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, l = t._index, v = t._ptr, i = t._size, f = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), d = a._values, c = a._index, p = a._ptr, o = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (i.length !== o.length) throw new ur(i.length, o.length);
    if (i[0] !== o[0] || i[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + i + ") must match Matrix B (" + o + ")");
    var g = i[0], w = i[1], y, b = n, F = 0, A = s;
    typeof f == "string" && f === h && f !== "mixed" && (y = f, b = e.find(n, [y, y]), F = e.convert(0, y), A = e.find(s, [y, y]));
    var C = D && d ? [] : void 0, E = [], m = [], _ = C ? [] : void 0, B = C ? [] : void 0, x = [], N = [], S, O, M, R;
    for (O = 0; O < w; O++) {
      m[O] = E.length;
      var T = O + 1;
      for (M = v[O], R = v[O + 1]; M < R; M++) S = l[M], E.push(S), x[S] = T, _ && (_[S] = D[M]);
      for (M = p[O], R = p[O + 1]; M < R; M++) S = c[M], x[S] !== T && E.push(S), N[S] = T, B && (B[S] = d[M]);
      if (C) for (M = m[O]; M < E.length; ) {
        S = E[M];
        var $ = x[S], Q = N[S];
        if ($ === T || Q === T) {
          var G = $ === T ? _[S] : F, z = Q === T ? B[S] : F, I = A(G, z);
          b(I, F) ? E.splice(M, 1) : (C.push(I), M++);
        }
      }
    }
    return m[w] = E.length, t.createSparseMatrix({ values: C, index: E, ptr: m, size: [g, w], datatype: f === t._datatype && h === a._datatype ? y : void 0 });
  };
}), Di = "matAlgo13xDD", pi = ["typed"], di = J(Di, pi, (r) => {
  var { typed: e } = r;
  return function(t, a, s) {
    var D = t._data, l = t._size, v = t._datatype, i = a._data, f = a._size, d = a._datatype, c = [];
    if (l.length !== f.length) throw new ur(l.length, f.length);
    for (var p = 0; p < l.length; p++) {
      if (l[p] !== f[p]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + f + ")");
      c[p] = l[p];
    }
    var o, h = s;
    typeof v == "string" && v === d && (o = v, h = e.find(s, [o, o]));
    var g = c.length > 0 ? n(h, 0, c, c[0], D, i) : [];
    return t.createDenseMatrix({ data: g, size: c, datatype: o });
  };
  function n(u, t, a, s, D, l) {
    var v = [];
    if (t === a.length - 1) for (var i = 0; i < s; i++) v[i] = u(D[i], l[i]);
    else for (var f = 0; f < s; f++) v[f] = n(u, t + 1, a, a[t + 1], D[f], l[f]);
    return v;
  }
});
function yr(r, e) {
  if (Ir(r.size(), e.size())) return [r, e];
  var n = An(r.size(), e.size());
  return [r, e].map((u) => hi(u, n));
}
function hi(r, e) {
  return Ir(r.size(), e) ? r : r.create(ze(r.valueOf(), e), r.datatype());
}
var mi = "matrixAlgorithmSuite", gi = ["typed", "matrix"], Ur = J(mi, gi, (r) => {
  var { typed: e, matrix: n } = r, u = di({ typed: e }), t = Ze({ typed: e });
  return function(s) {
    var D = s.elop, l = s.SD || s.DS, v;
    D ? (v = { "DenseMatrix, DenseMatrix": (c, p) => u(...yr(c, p), D), "Array, Array": (c, p) => u(...yr(n(c), n(p)), D).valueOf(), "Array, DenseMatrix": (c, p) => u(...yr(n(c), p), D), "DenseMatrix, Array": (c, p) => u(...yr(c, n(p)), D) }, s.SS && (v["SparseMatrix, SparseMatrix"] = (c, p) => s.SS(...yr(c, p), D, false)), s.DS && (v["DenseMatrix, SparseMatrix"] = (c, p) => s.DS(...yr(c, p), D, false), v["Array, SparseMatrix"] = (c, p) => s.DS(...yr(n(c), p), D, false)), l && (v["SparseMatrix, DenseMatrix"] = (c, p) => l(...yr(p, c), D, true), v["SparseMatrix, Array"] = (c, p) => l(...yr(n(p), c), D, true))) : (v = { "DenseMatrix, DenseMatrix": e.referToSelf((c) => (p, o) => u(...yr(p, o), c)), "Array, Array": e.referToSelf((c) => (p, o) => u(...yr(n(p), n(o)), c).valueOf()), "Array, DenseMatrix": e.referToSelf((c) => (p, o) => u(...yr(n(p), o), c)), "DenseMatrix, Array": e.referToSelf((c) => (p, o) => u(...yr(p, n(o)), c)) }, s.SS && (v["SparseMatrix, SparseMatrix"] = e.referToSelf((c) => (p, o) => s.SS(...yr(p, o), c, false))), s.DS && (v["DenseMatrix, SparseMatrix"] = e.referToSelf((c) => (p, o) => s.DS(...yr(p, o), c, false)), v["Array, SparseMatrix"] = e.referToSelf((c) => (p, o) => s.DS(...yr(n(p), o), c, false))), l && (v["SparseMatrix, DenseMatrix"] = e.referToSelf((c) => (p, o) => l(...yr(o, p), c, true)), v["SparseMatrix, Array"] = e.referToSelf((c) => (p, o) => l(...yr(n(o), p), c, true))));
    var i = s.scalar || "any", f = s.Ds || s.Ss;
    f && (D ? (v["DenseMatrix," + i] = (c, p) => t(c, p, D, false), v[i + ", DenseMatrix"] = (c, p) => t(p, c, D, true), v["Array," + i] = (c, p) => t(n(c), p, D, false).valueOf(), v[i + ", Array"] = (c, p) => t(n(p), c, D, true).valueOf()) : (v["DenseMatrix," + i] = e.referToSelf((c) => (p, o) => t(p, o, c, false)), v[i + ", DenseMatrix"] = e.referToSelf((c) => (p, o) => t(o, p, c, true)), v["Array," + i] = e.referToSelf((c) => (p, o) => t(n(p), o, c, false).valueOf()), v[i + ", Array"] = e.referToSelf((c) => (p, o) => t(n(o), p, c, true).valueOf())));
    var d = s.sS !== void 0 ? s.sS : s.Ss;
    return D ? (s.Ss && (v["SparseMatrix," + i] = (c, p) => s.Ss(c, p, D, false)), d && (v[i + ", SparseMatrix"] = (c, p) => d(p, c, D, true))) : (s.Ss && (v["SparseMatrix," + i] = e.referToSelf((c) => (p, o) => s.Ss(p, o, c, false))), d && (v[i + ", SparseMatrix"] = e.referToSelf((c) => (p, o) => d(o, p, c, true)))), D && D.signatures && sn(v, D.signatures), v;
  };
}), yi = "matAlgo01xDSid", Ai = ["typed"], Nn = J(yi, Ai, (r) => {
  var { typed: e } = r;
  return function(u, t, a, s) {
    var D = u._data, l = u._size, v = u._datatype || u.getDataType(), i = t._values, f = t._index, d = t._ptr, c = t._size, p = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
    if (l.length !== c.length) throw new ur(l.length, c.length);
    if (l[0] !== c[0] || l[1] !== c[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + c + ")");
    if (!i) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var o = l[0], h = l[1], g = typeof v == "string" && v !== "mixed" && v === p ? v : void 0, w = g ? e.find(a, [g, g]) : a, y, b, F = [];
    for (y = 0; y < o; y++) F[y] = [];
    var A = [], C = [];
    for (b = 0; b < h; b++) {
      for (var E = b + 1, m = d[b], _ = d[b + 1], B = m; B < _; B++) y = f[B], A[y] = s ? w(i[B], D[y][b]) : w(D[y][b], i[B]), C[y] = E;
      for (y = 0; y < o; y++) C[y] === E ? F[y][b] = A[y] : F[y][b] = D[y][b];
    }
    return u.createDenseMatrix({ data: F, size: [o, h], datatype: v === u._datatype && p === t._datatype ? g : void 0 });
  };
}), Fi = "matAlgo04xSidSid", Ei = ["typed", "equalScalar"], wi = J(Fi, Ei, (r) => {
  var { typed: e, equalScalar: n } = r;
  return function(t, a, s) {
    var D = t._values, l = t._index, v = t._ptr, i = t._size, f = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), d = a._values, c = a._index, p = a._ptr, o = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (i.length !== o.length) throw new ur(i.length, o.length);
    if (i[0] !== o[0] || i[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + i + ") must match Matrix B (" + o + ")");
    var g = i[0], w = i[1], y, b = n, F = 0, A = s;
    typeof f == "string" && f === h && f !== "mixed" && (y = f, b = e.find(n, [y, y]), F = e.convert(0, y), A = e.find(s, [y, y]));
    var C = D && d ? [] : void 0, E = [], m = [], _ = D && d ? [] : void 0, B = D && d ? [] : void 0, x = [], N = [], S, O, M, R, T;
    for (O = 0; O < w; O++) {
      m[O] = E.length;
      var $ = O + 1;
      for (R = v[O], T = v[O + 1], M = R; M < T; M++) S = l[M], E.push(S), x[S] = $, _ && (_[S] = D[M]);
      for (R = p[O], T = p[O + 1], M = R; M < T; M++) if (S = c[M], x[S] === $) {
        if (_) {
          var Q = A(_[S], d[M]);
          b(Q, F) ? x[S] = null : _[S] = Q;
        }
      } else E.push(S), N[S] = $, B && (B[S] = d[M]);
      if (_ && B) for (M = m[O]; M < E.length; ) S = E[M], x[S] === $ ? (C[M] = _[S], M++) : N[S] === $ ? (C[M] = B[S], M++) : E.splice(M, 1);
    }
    return m[w] = E.length, t.createSparseMatrix({ values: C, index: E, ptr: m, size: [g, w], datatype: f === t._datatype && h === a._datatype ? y : void 0 });
  };
}), Ci = "matAlgo10xSids", bi = ["typed", "DenseMatrix"], Tn = J(Ci, bi, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(t, a, s, D) {
    var l = t._values, v = t._index, i = t._ptr, f = t._size, d = t._datatype;
    if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var c = f[0], p = f[1], o, h = s;
    typeof d == "string" && (o = d, a = e.convert(a, o), h = e.find(s, [o, o]));
    for (var g = [], w = [], y = [], b = 0; b < p; b++) {
      for (var F = b + 1, A = i[b], C = i[b + 1], E = A; E < C; E++) {
        var m = v[E];
        w[m] = l[E], y[m] = F;
      }
      for (var _ = 0; _ < c; _++) b === 0 && (g[_] = []), y[_] === F ? g[_][b] = D ? h(a, w[_]) : h(w[_], a) : g[_][b] = a;
    }
    return new n({ data: g, size: [c, p], datatype: o });
  };
}), _i = "multiplyScalar", Bi = ["typed"], xi = J(_i, Bi, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": _n, "Complex, Complex": function(u, t) {
    return u.mul(t);
  }, "BigNumber, BigNumber": function(u, t) {
    return u.times(t);
  }, "bigint, bigint": function(u, t) {
    return u * t;
  }, "Fraction, Fraction": function(u, t) {
    return u.mul(t);
  }, "number | Fraction | BigNumber | Complex, Unit": (n, u) => u.multiply(n), "Unit, number | Fraction | BigNumber | Complex | Unit": (n, u) => n.multiply(u) });
}), wt = "multiply", Si = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Mi = J(wt, Si, (r) => {
  var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: s } = r, D = Mn({ typed: e, equalScalar: a }), l = Ze({ typed: e });
  function v(F, A) {
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
  function i(F, A, C) {
    if (C === 0) throw new Error("Cannot multiply two empty vectors");
    return s(F, A);
  }
  function f(F, A) {
    if (A.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
    return d(F, A);
  }
  function d(F, A) {
    var C = F._data, E = F._size, m = F._datatype || F.getDataType(), _ = A._data, B = A._size, x = A._datatype || A.getDataType(), N = E[0], S = B[1], O, M = u, R = t;
    m && x && m === x && typeof m == "string" && m !== "mixed" && (O = m, M = e.find(u, [O, O]), R = e.find(t, [O, O]));
    for (var T = [], $ = 0; $ < S; $++) {
      for (var Q = R(C[0], _[0][$]), G = 1; G < N; G++) Q = M(Q, R(C[G], _[G][$]));
      T[$] = Q;
    }
    return F.createDenseMatrix({ data: T, size: [S], datatype: m === F._datatype && x === A._datatype ? O : void 0 });
  }
  var c = e("_multiplyMatrixVector", { "DenseMatrix, any": o, "SparseMatrix, any": w }), p = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": h, "DenseMatrix, SparseMatrix": g, "SparseMatrix, DenseMatrix": y, "SparseMatrix, SparseMatrix": b });
  function o(F, A) {
    var C = F._data, E = F._size, m = F._datatype || F.getDataType(), _ = A._data, B = A._datatype || A.getDataType(), x = E[0], N = E[1], S, O = u, M = t;
    m && B && m === B && typeof m == "string" && m !== "mixed" && (S = m, O = e.find(u, [S, S]), M = e.find(t, [S, S]));
    for (var R = [], T = 0; T < x; T++) {
      for (var $ = C[T], Q = M($[0], _[0]), G = 1; G < N; G++) Q = O(Q, M($[G], _[G]));
      R[T] = Q;
    }
    return F.createDenseMatrix({ data: R, size: [x], datatype: m === F._datatype && B === A._datatype ? S : void 0 });
  }
  function h(F, A) {
    var C = F._data, E = F._size, m = F._datatype || F.getDataType(), _ = A._data, B = A._size, x = A._datatype || A.getDataType(), N = E[0], S = E[1], O = B[1], M, R = u, T = t;
    m && x && m === x && typeof m == "string" && m !== "mixed" && m !== "mixed" && (M = m, R = e.find(u, [M, M]), T = e.find(t, [M, M]));
    for (var $ = [], Q = 0; Q < N; Q++) {
      var G = C[Q];
      $[Q] = [];
      for (var z = 0; z < O; z++) {
        for (var I = T(G[0], _[0][z]), W = 1; W < S; W++) I = R(I, T(G[W], _[W][z]));
        $[Q][z] = I;
      }
    }
    return F.createDenseMatrix({ data: $, size: [N, O], datatype: m === F._datatype && x === A._datatype ? M : void 0 });
  }
  function g(F, A) {
    var C = F._data, E = F._size, m = F._datatype || F.getDataType(), _ = A._values, B = A._index, x = A._ptr, N = A._size, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
    if (!_) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var O = E[0], M = N[1], R, T = u, $ = t, Q = a, G = 0;
    m && S && m === S && typeof m == "string" && m !== "mixed" && (R = m, T = e.find(u, [R, R]), $ = e.find(t, [R, R]), Q = e.find(a, [R, R]), G = e.convert(0, R));
    for (var z = [], I = [], W = [], X = A.createSparseMatrix({ values: z, index: I, ptr: W, size: [O, M], datatype: m === F._datatype && S === A._datatype ? R : void 0 }), V = 0; V < M; V++) {
      W[V] = I.length;
      var q = x[V], Z = x[V + 1];
      if (Z > q) for (var P = 0, U = 0; U < O; U++) {
        for (var Y = U + 1, L = void 0, k = q; k < Z; k++) {
          var j = B[k];
          P !== Y ? (L = $(C[U][j], _[k]), P = Y) : L = T(L, $(C[U][j], _[k]));
        }
        P === Y && !Q(L, G) && (I.push(U), z.push(L));
      }
    }
    return W[M] = I.length, X;
  }
  function w(F, A) {
    var C = F._values, E = F._index, m = F._ptr, _ = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!C) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var B = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], O = [], M = [], R = [], T, $ = u, Q = t, G = a, z = 0;
    _ && x && _ === x && typeof _ == "string" && _ !== "mixed" && (T = _, $ = e.find(u, [T, T]), Q = e.find(t, [T, T]), G = e.find(a, [T, T]), z = e.convert(0, T));
    var I = [], W = [];
    R[0] = 0;
    for (var X = 0; X < S; X++) {
      var V = B[X];
      if (!G(V, z)) for (var q = m[X], Z = m[X + 1], P = q; P < Z; P++) {
        var U = E[P];
        W[U] ? I[U] = $(I[U], Q(V, C[P])) : (W[U] = true, M.push(U), I[U] = Q(V, C[P]));
      }
    }
    for (var Y = M.length, L = 0; L < Y; L++) {
      var k = M[L];
      O[L] = I[k];
    }
    return R[1] = M.length, F.createSparseMatrix({ values: O, index: M, ptr: R, size: [N, 1], datatype: _ === F._datatype && x === A._datatype ? T : void 0 });
  }
  function y(F, A) {
    var C = F._values, E = F._index, m = F._ptr, _ = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!C) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var B = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], O = A._size[1], M, R = u, T = t, $ = a, Q = 0;
    _ && x && _ === x && typeof _ == "string" && _ !== "mixed" && (M = _, R = e.find(u, [M, M]), T = e.find(t, [M, M]), $ = e.find(a, [M, M]), Q = e.convert(0, M));
    for (var G = [], z = [], I = [], W = F.createSparseMatrix({ values: G, index: z, ptr: I, size: [N, O], datatype: _ === F._datatype && x === A._datatype ? M : void 0 }), X = [], V = [], q = 0; q < O; q++) {
      I[q] = z.length;
      for (var Z = q + 1, P = 0; P < S; P++) {
        var U = B[P][q];
        if (!$(U, Q)) for (var Y = m[P], L = m[P + 1], k = Y; k < L; k++) {
          var j = E[k];
          V[j] !== Z ? (V[j] = Z, z.push(j), X[j] = T(U, C[k])) : X[j] = R(X[j], T(U, C[k]));
        }
      }
      for (var rr = I[q], er = z.length, ar = rr; ar < er; ar++) {
        var or = z[ar];
        G[ar] = X[or];
      }
    }
    return I[O] = z.length, W;
  }
  function b(F, A) {
    var C = F._values, E = F._index, m = F._ptr, _ = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), B = A._values, x = A._index, N = A._ptr, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), O = F._size[0], M = A._size[1], R = C && B, T, $ = u, Q = t;
    _ && S && _ === S && typeof _ == "string" && _ !== "mixed" && (T = _, $ = e.find(u, [T, T]), Q = e.find(t, [T, T]));
    for (var G = R ? [] : void 0, z = [], I = [], W = F.createSparseMatrix({ values: G, index: z, ptr: I, size: [O, M], datatype: _ === F._datatype && S === A._datatype ? T : void 0 }), X = R ? [] : void 0, V = [], q, Z, P, U, Y, L, k, j, rr = 0; rr < M; rr++) {
      I[rr] = z.length;
      var er = rr + 1;
      for (Y = N[rr], L = N[rr + 1], U = Y; U < L; U++) if (j = x[U], R) for (Z = m[j], P = m[j + 1], q = Z; q < P; q++) k = E[q], V[k] !== er ? (V[k] = er, z.push(k), X[k] = Q(B[U], C[q])) : X[k] = $(X[k], Q(B[U], C[q]));
      else for (Z = m[j], P = m[j + 1], q = Z; q < P; q++) k = E[q], V[k] !== er && (V[k] = er, z.push(k));
      if (R) for (var ar = I[rr], or = z.length, dr = ar; dr < or; dr++) {
        var sr = z[dr];
        G[dr] = X[sr];
      }
    }
    return I[M] = z.length, W;
  }
  return e(wt, t, { "Array, Array": e.referTo("Matrix, Matrix", (F) => (A, C) => {
    v(nr(A), nr(C));
    var E = F(n(A), n(C));
    return cr(E) ? E.valueOf() : E;
  }), "Matrix, Matrix": function(A, C) {
    var E = A.size(), m = C.size();
    return v(E, m), E.length === 1 ? m.length === 1 ? i(A, C, E[0]) : f(A, C) : m.length === 1 ? c(A, C) : p(A, C);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (A, C) => F(A, n(C))), "Array, Matrix": e.referToSelf((F) => (A, C) => F(n(A, C.storage()), C)), "SparseMatrix, any": function(A, C) {
    return D(A, C, t, false);
  }, "DenseMatrix, any": function(A, C) {
    return l(A, C, t, false);
  }, "any, SparseMatrix": function(A, C) {
    return D(C, A, t, true);
  }, "any, DenseMatrix": function(A, C) {
    return l(C, A, t, true);
  }, "Array, any": function(A, C) {
    return l(n(A), C, t, false).valueOf();
  }, "any, Array": function(A, C) {
    return l(n(C), A, t, true).valueOf();
  }, "any, any": t, "any, any, ...any": e.referToSelf((F) => (A, C, E) => {
    for (var m = F(A, C), _ = 0; _ < E.length; _++) m = F(m, E[_]);
    return m;
  }) });
}), Ct = "sign", Ni = ["typed", "BigNumber", "Fraction", "complex"], Ti = J(Ct, Ni, (r) => {
  var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
  return e(Ct, { number: Oe, Complex: function(s) {
    return s.im === 0 ? u(Oe(s.re)) : s.sign();
  }, BigNumber: function(s) {
    return new n(s.cmp(0));
  }, bigint: function(s) {
    return s > 0n ? 1n : s < 0n ? -1n : 0n;
  }, Fraction: function(s) {
    return new t(s.s, 1);
  }, "Array | Matrix": e.referToSelf((a) => (s) => Cr(s, a)), Unit: e.referToSelf((a) => (s) => {
    if (!s._isDerived() && s.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
    return e.find(a, s.valueType())(s.value);
  }) });
}), zi = "sqrt", Oi = ["config", "typed", "Complex"], $i = J(zi, Oi, (r) => {
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
}), bt = "subtract", Ii = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], qi = J(bt, Ii, (r) => {
  var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: s, concat: D } = r, l = Nn({ typed: e }), v = Gr({ typed: e }), i = ci({ typed: e, equalScalar: u }), f = Tn({ typed: e, DenseMatrix: s }), d = Xr({ typed: e, DenseMatrix: s }), c = Ur({ typed: e, matrix: n, concat: D });
  return e(bt, { "any, any": t }, c({ elop: t, SS: i, DS: l, SD: v, Ss: d, sS: f }));
}), Ri = "matAlgo07xSSf", Ui = ["typed", "DenseMatrix"], kr = J(Ri, Ui, (r) => {
  var { typed: e, DenseMatrix: n } = r;
  return function(a, s, D) {
    var l = a._size, v = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), i = s._size, f = s._datatype || s._data === void 0 ? s._datatype : s.getDataType();
    if (l.length !== i.length) throw new ur(l.length, i.length);
    if (l[0] !== i[0] || l[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + i + ")");
    var d = l[0], c = l[1], p, o = 0, h = D;
    typeof v == "string" && v === f && v !== "mixed" && (p = v, o = e.convert(0, p), h = e.find(D, [p, p]));
    var g, w, y = [];
    for (g = 0; g < d; g++) y[g] = [];
    var b = [], F = [], A = [], C = [];
    for (w = 0; w < c; w++) {
      var E = w + 1;
      for (u(a, w, A, b, E), u(s, w, C, F, E), g = 0; g < d; g++) {
        var m = A[g] === E ? b[g] : o, _ = C[g] === E ? F[g] : o;
        y[g][w] = h(m, _);
      }
    }
    return new n({ data: y, size: [d, c], datatype: v === a._datatype && f === s._datatype ? p : void 0 });
  };
  function u(t, a, s, D, l) {
    for (var v = t._values, i = t._index, f = t._ptr, d = f[a], c = f[a + 1]; d < c; d++) {
      var p = i[d];
      s[p] = l, D[p] = v[d];
    }
  }
}), _t = "conj", Pi = ["typed"], Li = J(_t, Pi, (r) => {
  var { typed: e } = r;
  return e(_t, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.conjugate(), "Array | Matrix": e.referToSelf((n) => (u) => Cr(u, n)) });
}), Bt = "im", Vi = ["typed"], Zi = J(Bt, Vi, (r) => {
  var { typed: e } = r;
  return e(Bt, { number: () => 0, "BigNumber | Fraction": (n) => n.mul(0), Complex: (n) => n.im, "Array | Matrix": e.referToSelf((n) => (u) => Cr(u, n)) });
}), xt = "re", Ji = ["typed"], Wi = J(xt, Ji, (r) => {
  var { typed: e } = r;
  return e(xt, { "number | BigNumber | Fraction": (n) => n, Complex: (n) => n.re, "Array | Matrix": e.referToSelf((n) => (u) => Cr(u, n)) });
}), St = "concat", Qi = ["typed", "matrix", "isInteger"], Xi = J(St, Qi, (r) => {
  var { typed: e, matrix: n, isInteger: u } = r;
  return e(St, { "...Array | Matrix | number | BigNumber": function(a) {
    var s, D = a.length, l = -1, v, i = false, f = [];
    for (s = 0; s < D; s++) {
      var d = a[s];
      if (cr(d) && (i = true), fr(d) || gr(d)) {
        if (s !== D - 1) throw new Error("Dimension must be specified as last argument");
        if (v = l, l = d.valueOf(), !u(l)) throw new TypeError("Integer number expected for dimension");
        if (l < 0 || s > 0 && l > v) throw new Rr(l, v + 1);
      } else {
        var c = tr(d).valueOf(), p = nr(c);
        if (f[s] = c, v = l, l = p.length - 1, s > 0 && l !== v) throw new ur(v + 1, l + 1);
      }
    }
    if (f.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var o = f.shift(); f.length; ) o = yn(o, f.shift(), l);
    return i ? n(o) : o;
  }, "...string": function(a) {
    return a.join("");
  } });
}), Mt = "column", Gi = ["typed", "Index", "matrix", "range"], Yi = J(Mt, Gi, (r) => {
  var { typed: e, Index: n, matrix: u, range: t } = r;
  return e(Mt, { "Matrix, number": a, "Array, number": function(D, l) {
    return a(u(tr(D)), l).valueOf();
  } });
  function a(s, D) {
    if (s.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
    mr(D, s.size()[1]);
    var l = t(0, s.size()[0]), v = new n(l, D), i = s.subset(v);
    return cr(i) ? i : u([[i]]);
  }
}), Nt = "cross", Ki = ["typed", "matrix", "subtract", "multiply"], Hi = J(Nt, Ki, (r) => {
  var { typed: e, matrix: n, subtract: u, multiply: t } = r;
  return e(Nt, { "Matrix, Matrix": function(D, l) {
    return n(a(D.toArray(), l.toArray()));
  }, "Matrix, Array": function(D, l) {
    return n(a(D.toArray(), l));
  }, "Array, Matrix": function(D, l) {
    return n(a(D, l.toArray()));
  }, "Array, Array": a });
  function a(s, D) {
    var l = Math.max(nr(s).length, nr(D).length);
    s = ct(s), D = ct(D);
    var v = nr(s), i = nr(D);
    if (v.length !== 1 || i.length !== 1 || v[0] !== 3 || i[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + v.join(", ") + "], B = [" + i.join(", ") + "])");
    var f = [u(t(s[1], D[2]), t(s[2], D[1])), u(t(s[2], D[0]), t(s[0], D[2])), u(t(s[0], D[1]), t(s[1], D[0]))];
    return l > 1 ? [f] : f;
  }
}), Tt = "diag", ki = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], ji = J(Tt, ki, (r) => {
  var { typed: e, matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
  return e(Tt, { Array: function(v) {
    return a(v, 0, nr(v), null);
  }, "Array, number": function(v, i) {
    return a(v, i, nr(v), null);
  }, "Array, BigNumber": function(v, i) {
    return a(v, i.toNumber(), nr(v), null);
  }, "Array, string": function(v, i) {
    return a(v, 0, nr(v), i);
  }, "Array, number, string": function(v, i, f) {
    return a(v, i, nr(v), f);
  }, "Array, BigNumber, string": function(v, i, f) {
    return a(v, i.toNumber(), nr(v), f);
  }, Matrix: function(v) {
    return a(v, 0, v.size(), v.storage());
  }, "Matrix, number": function(v, i) {
    return a(v, i, v.size(), v.storage());
  }, "Matrix, BigNumber": function(v, i) {
    return a(v, i.toNumber(), v.size(), v.storage());
  }, "Matrix, string": function(v, i) {
    return a(v, 0, v.size(), i);
  }, "Matrix, number, string": function(v, i, f) {
    return a(v, i, v.size(), f);
  }, "Matrix, BigNumber, string": function(v, i, f) {
    return a(v, i.toNumber(), v.size(), f);
  } });
  function a(l, v, i, f) {
    if (!vr(v)) throw new TypeError("Second parameter in function diag must be an integer");
    var d = v > 0 ? v : 0, c = v < 0 ? -v : 0;
    switch (i.length) {
      case 1:
        return s(l, v, f, i[0], c, d);
      case 2:
        return D(l, v, f, i, c, d);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function s(l, v, i, f, d, c) {
    var p = [f + d, f + c];
    if (i && i !== "sparse" && i !== "dense") throw new TypeError("Unknown matrix type ".concat(i, '"'));
    var o = i === "sparse" ? t.diagonal(p, l, v) : u.diagonal(p, l, v);
    return i !== null ? o : o.valueOf();
  }
  function D(l, v, i, f, d, c) {
    if (cr(l)) {
      var p = l.diagonal(v);
      return i !== null ? i !== p.storage() ? n(p, i) : p : p.valueOf();
    }
    for (var o = Math.min(f[0] - d, f[1] - c), h = [], g = 0; g < o; g++) h[g] = l[g + d][g + c];
    return i !== null ? n(h) : h;
  }
}), zt = "flatten", ro = ["typed"], eo = J(zt, ro, (r) => {
  var { typed: e } = r;
  return e(zt, { Array: function(u) {
    return Te(u);
  }, Matrix: function(u) {
    return u.create(Te(u.toArray()), u.datatype());
  } });
}), Ot = "getMatrixDataType", to = ["typed"], no = J(Ot, to, (r) => {
  var { typed: e } = r;
  return e(Ot, { Array: function(u) {
    return Ae(u, Nr);
  }, Matrix: function(u) {
    return u.getDataType();
  } });
}), $t = "identity", uo = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], ao = J($t, uo, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t, DenseMatrix: a, SparseMatrix: s } = r;
  return e($t, { "": function() {
    return n.matrix === "Matrix" ? u([]) : [];
  }, string: function(i) {
    return u(i);
  }, "number | BigNumber": function(i) {
    return l(i, i, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(i, f) {
    return l(i, i, f);
  }, "number | BigNumber, number | BigNumber": function(i, f) {
    return l(i, f, n.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(i, f, d) {
    return l(i, f, d);
  }, Array: function(i) {
    return D(i);
  }, "Array, string": function(i, f) {
    return D(i, f);
  }, Matrix: function(i) {
    return D(i.valueOf(), i.storage());
  }, "Matrix, string": function(i, f) {
    return D(i.valueOf(), f);
  } });
  function D(v, i) {
    switch (v.length) {
      case 0:
        return i ? u(i) : [];
      case 1:
        return l(v[0], v[0], i);
      case 2:
        return l(v[0], v[1], i);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function l(v, i, f) {
    var d = gr(v) || gr(i) ? t : null;
    if (gr(v) && (v = v.toNumber()), gr(i) && (i = i.toNumber()), !vr(v) || v < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!vr(i) || i < 1) throw new Error("Parameters in function identity must be positive integers");
    var c = d ? new t(1) : 1, p = d ? new d(0) : 0, o = [v, i];
    if (f) {
      if (f === "sparse") return s.diagonal(o, c, 0, p);
      if (f === "dense") return a.diagonal(o, c, 0, p);
      throw new TypeError('Unknown matrix type "'.concat(f, '"'));
    }
    for (var h = fe([], o, p), g = v < i ? v : i, w = 0; w < g; w++) h[w][w] = c;
    return h;
  }
}), It = "kron", io = ["typed", "matrix", "multiplyScalar"], oo = J(It, io, (r) => {
  var { typed: e, matrix: n, multiplyScalar: u } = r;
  return e(It, { "Matrix, Matrix": function(s, D) {
    return n(t(s.toArray(), D.toArray()));
  }, "Matrix, Array": function(s, D) {
    return n(t(s.toArray(), D));
  }, "Array, Matrix": function(s, D) {
    return n(t(s, D.toArray()));
  }, "Array, Array": t });
  function t(a, s) {
    if (nr(a).length === 1 && (a = [a]), nr(s).length === 1 && (s = [s]), nr(a).length > 2 || nr(s).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(a.length) + ", y = " + JSON.stringify(s.length) + ")");
    var D = [], l = [];
    return a.map(function(v) {
      return s.map(function(i) {
        return l = [], D.push(l), v.map(function(f) {
          return i.map(function(d) {
            return l.push(u(f, d));
          });
        });
      });
    }) && D;
  }
});
function zn() {
  throw new Error('No "bignumber" implementation available');
}
function so() {
  throw new Error('No "fraction" implementation available');
}
function On() {
  throw new Error('No "matrix" implementation available');
}
var qt = "range", fo = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], lo = J(qt, fo, (r) => {
  var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: s, larger: D, largerEq: l, add: v, isPositive: i } = r;
  return e(qt, { string: d, "string, boolean": d, "number, number": function(h, g) {
    return f(c(h, g, 1, false));
  }, "number, number, number": function(h, g, w) {
    return f(c(h, g, w, false));
  }, "number, number, boolean": function(h, g, w) {
    return f(c(h, g, 1, w));
  }, "number, number, number, boolean": function(h, g, w, y) {
    return f(c(h, g, w, y));
  }, "BigNumber, BigNumber": function(h, g) {
    var w = h.constructor;
    return f(c(h, g, new w(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(h, g, w) {
    return f(c(h, g, w, false));
  }, "BigNumber, BigNumber, boolean": function(h, g, w) {
    var y = h.constructor;
    return f(c(h, g, new y(1), w));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(h, g, w, y) {
    return f(c(h, g, w, y));
  }, "Unit, Unit, Unit": function(h, g, w) {
    return f(c(h, g, w, false));
  }, "Unit, Unit, Unit, boolean": function(h, g, w, y) {
    return f(c(h, g, w, y));
  } });
  function f(o) {
    return n.matrix === "Matrix" ? u ? u(o) : On() : o;
  }
  function d(o, h) {
    var g = p(o);
    if (!g) throw new SyntaxError('String "' + o + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && zn(), f(c(t(g.start), t(g.end), t(g.step)))) : f(c(g.start, g.end, g.step, h));
  }
  function c(o, h, g, w) {
    for (var y = [], b = i(g) ? w ? s : a : w ? l : D, F = o; b(F, h); ) y.push(F), F = v(F, g);
    return y;
  }
  function p(o) {
    var h = o.split(":"), g = h.map(function(y) {
      return Number(y);
    }), w = g.some(function(y) {
      return isNaN(y);
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
}), Rt = "reshape", vo = ["typed", "isInteger", "matrix"], co = J(Rt, vo, (r) => {
  var { typed: e, isInteger: n } = r;
  return e(Rt, { "Matrix, Array": function(t, a) {
    return t.reshape(a, true);
  }, "Array, Array": function(t, a) {
    return a.forEach(function(s) {
      if (!n(s)) throw new TypeError("Invalid size for dimension: " + s);
    }), Pe(t, a);
  } });
}), Ut = "size", Do = ["typed", "config", "?matrix"], po = J(Ut, Do, (r) => {
  var { typed: e, config: n, matrix: u } = r;
  return e(Ut, { Matrix: function(a) {
    return a.create(a.size(), "number");
  }, Array: nr, string: function(a) {
    return n.matrix === "Array" ? [a.length] : u([a.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(a) {
    return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : On();
  } });
}), Pt = "transpose", ho = ["typed", "matrix"], mo = J(Pt, ho, (r) => {
  var { typed: e, matrix: n } = r;
  return e(Pt, { Array: (s) => u(n(s)).valueOf(), Matrix: u, any: tr });
  function u(s) {
    var D = s.size(), l;
    switch (D.length) {
      case 1:
        l = s.clone();
        break;
      case 2:
        {
          var v = D[0], i = D[1];
          if (i === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + pr(D) + ")");
          switch (s.storage()) {
            case "dense":
              l = t(s, v, i);
              break;
            case "sparse":
              l = a(s, v, i);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + pr(D) + ")");
    }
    return l;
  }
  function t(s, D, l) {
    for (var v = s._data, i = [], f, d = 0; d < l; d++) {
      f = i[d] = [];
      for (var c = 0; c < D; c++) f[c] = tr(v[c][d]);
    }
    return s.createDenseMatrix({ data: i, size: [l, D], datatype: s._datatype });
  }
  function a(s, D, l) {
    for (var v = s._values, i = s._index, f = s._ptr, d = v ? [] : void 0, c = [], p = [], o = [], h = 0; h < D; h++) o[h] = 0;
    var g, w, y;
    for (g = 0, w = i.length; g < w; g++) o[i[g]]++;
    for (var b = 0, F = 0; F < D; F++) p.push(b), b += o[F], o[F] = p[F];
    for (p.push(b), y = 0; y < l; y++) for (var A = f[y], C = f[y + 1], E = A; E < C; E++) {
      var m = o[i[E]]++;
      c[m] = y, v && (d[m] = tr(v[E]));
    }
    return s.createSparseMatrix({ values: d, index: c, ptr: p, size: [l, D], datatype: s._datatype });
  }
}), Lt = "ctranspose", go = ["typed", "transpose", "conj"], yo = J(Lt, go, (r) => {
  var { typed: e, transpose: n, conj: u } = r;
  return e(Lt, { any: function(a) {
    return u(n(a));
  } });
}), Vt = "zeros", Ao = ["typed", "config", "matrix", "BigNumber"], Fo = J(Vt, Ao, (r) => {
  var { typed: e, config: n, matrix: u, BigNumber: t } = r;
  return e(Vt, { "": function() {
    return n.matrix === "Array" ? a([]) : a([], "default");
  }, "...number | BigNumber | string": function(v) {
    var i = v[v.length - 1];
    if (typeof i == "string") {
      var f = v.pop();
      return a(v, f);
    } else return n.matrix === "Array" ? a(v) : a(v, "default");
  }, Array: a, Matrix: function(v) {
    var i = v.storage();
    return a(v.valueOf(), i);
  }, "Array | Matrix, string": function(v, i) {
    return a(v.valueOf(), i);
  } });
  function a(l, v) {
    var i = s(l), f = i ? new t(0) : 0;
    if (D(l), v) {
      var d = u(v);
      return l.length > 0 ? d.resize(l, f) : d;
    } else {
      var c = [];
      return l.length > 0 ? fe(c, l, f) : c;
    }
  }
  function s(l) {
    var v = false;
    return l.forEach(function(i, f, d) {
      gr(i) && (v = true, d[f] = i.toNumber());
    }), v;
  }
  function D(l) {
    l.forEach(function(v) {
      if (typeof v != "number" || !vr(v) || v < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), Eo = "numeric", wo = ["number", "?bignumber", "?fraction"], Co = J(Eo, wo, (r) => {
  var { number: e, bignumber: n, fraction: u } = r, t = { string: true, number: true, BigNumber: true, Fraction: true }, a = { number: (s) => e(s), BigNumber: n ? (s) => n(s) : zn, bigint: (s) => BigInt(s), Fraction: u ? (s) => u(s) : so };
  return function(D) {
    var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", v = arguments.length > 2 ? arguments[2] : void 0;
    if (v !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var i = Nr(D);
    if (!(i in t)) throw new TypeError("Cannot convert " + D + ' of type "' + i + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(l in a)) throw new TypeError("Cannot convert " + D + ' to type "' + l + '"; valid output types are ' + Object.keys(a).join(", "));
    return l === i ? D : a[l](D);
  };
}), Zt = "divideScalar", bo = ["typed", "numeric"], _o = J(Zt, bo, (r) => {
  var { typed: e, numeric: n } = r;
  return e(Zt, { "number, number": function(t, a) {
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
}), Jt = "pow", Bo = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], xo = J(Jt, Bo, (r) => {
  var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: s, number: D, fraction: l, Complex: v } = r;
  return e(Jt, { "number, number": i, "Complex, Complex": function(p, o) {
    return p.pow(o);
  }, "BigNumber, BigNumber": function(p, o) {
    return o.isInteger() || p >= 0 || n.predictable ? p.pow(o) : new v(p.toNumber(), 0).pow(o.toNumber(), 0);
  }, "bigint, bigint": (c, p) => c ** p, "Fraction, Fraction": function(p, o) {
    var h = p.pow(o);
    if (h != null) return h;
    if (n.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return i(p.valueOf(), o.valueOf());
  }, "Array, number": f, "Array, BigNumber": function(p, o) {
    return f(p, o.toNumber());
  }, "Matrix, number": d, "Matrix, BigNumber": function(p, o) {
    return d(p, o.toNumber());
  }, "Unit, number | BigNumber": function(p, o) {
    return p.pow(o);
  } });
  function i(c, p) {
    if (n.predictable && !vr(p) && c < 0) try {
      var o = l(p), h = D(o);
      if ((p === h || Math.abs((p - h) / p) < 1e-14) && o.d % 2 === 1) return (o.n % 2 === 0 ? 1 : -1) * Math.pow(-c, p);
    } catch {
    }
    return n.predictable && (c < -1 && p === 1 / 0 || c > -1 && c < 0 && p === -1 / 0) ? NaN : vr(p) || c >= 0 || n.predictable ? xn(c, p) : c * c < 1 && p === 1 / 0 || c * c > 1 && p === -1 / 0 ? 0 : new v(c, 0).pow(p, 0);
  }
  function f(c, p) {
    if (!vr(p)) throw new TypeError("For A^b, b must be an integer (value is " + p + ")");
    var o = nr(c);
    if (o.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + o.length + " dimensions)");
    if (o[0] !== o[1]) throw new Error("For A^b, A must be square (size is " + o[0] + "x" + o[1] + ")");
    if (p < 0) try {
      return f(s(c), -p);
    } catch (w) {
      throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + p + ")") : w;
    }
    for (var h = u(o[0]).valueOf(), g = c; p >= 1; ) (p & 1) === 1 && (h = t(g, h)), p >>= 1, g = t(g, g);
    return h;
  }
  function d(c, p) {
    return a(f(c.valueOf(), p));
  }
});
function $n(r) {
  var { DenseMatrix: e } = r;
  return function(u, t, a) {
    var s = u.size();
    if (s.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + pr(s) + ")");
    var D = s[0], l = s[1];
    if (D !== l) throw new RangeError("Matrix must be square (size: " + pr(s) + ")");
    var v = [];
    if (cr(t)) {
      var i = t.size(), f = t._data;
      if (i.length === 1) {
        if (i[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var d = 0; d < D; d++) v[d] = [f[d]];
        return new e({ data: v, size: [D, 1], datatype: t._datatype });
      }
      if (i.length === 2) {
        if (i[0] !== D || i[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (un(t)) {
          if (a) {
            v = [];
            for (var c = 0; c < D; c++) v[c] = [f[c][0]];
            return new e({ data: v, size: [D, 1], datatype: t._datatype });
          }
          return t;
        }
        if (an(t)) {
          for (var p = 0; p < D; p++) v[p] = [0];
          for (var o = t._values, h = t._index, g = t._ptr, w = g[1], y = g[0]; y < w; y++) {
            var b = h[y];
            v[b][0] = o[y];
          }
          return new e({ data: v, size: [D, 1], datatype: t._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Dr(t)) {
      var F = nr(t);
      if (F.length === 1) {
        if (F[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var A = 0; A < D; A++) v[A] = [t[A]];
        return new e({ data: v, size: [D, 1] });
      }
      if (F.length === 2) {
        if (F[0] !== D || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var C = 0; C < D; C++) v[C] = [t[C][0]];
        return new e({ data: v, size: [D, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var Wt = "usolve", So = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Mo = J(Wt, So, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, l = $n({ DenseMatrix: D });
  return e(Wt, { "SparseMatrix, Array | Matrix": function(d, c) {
    return i(d, c);
  }, "DenseMatrix, Array | Matrix": function(d, c) {
    return v(d, c);
  }, "Array, Array | Matrix": function(d, c) {
    var p = n(d), o = v(p, c);
    return o.valueOf();
  } });
  function v(f, d) {
    d = l(f, d, true);
    for (var c = d._data, p = f._size[0], o = f._size[1], h = [], g = f._data, w = o - 1; w >= 0; w--) {
      var y = c[w][0] || 0, b = void 0;
      if (s(y, 0)) b = 0;
      else {
        var F = g[w][w];
        if (s(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        b = u(y, F);
        for (var A = w - 1; A >= 0; A--) c[A] = [a(c[A][0] || 0, t(b, g[A][w]))];
      }
      h[w] = [b];
    }
    return new D({ data: h, size: [p, 1] });
  }
  function i(f, d) {
    d = l(f, d, true);
    for (var c = d._data, p = f._size[0], o = f._size[1], h = f._values, g = f._index, w = f._ptr, y = [], b = o - 1; b >= 0; b--) {
      var F = c[b][0] || 0;
      if (s(F, 0)) y[b] = [0];
      else {
        for (var A = 0, C = [], E = [], m = w[b], _ = w[b + 1], B = _ - 1; B >= m; B--) {
          var x = g[B];
          x === b ? A = h[B] : x < b && (C.push(h[B]), E.push(x));
        }
        if (s(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var N = u(F, A), S = 0, O = E.length; S < O; S++) {
          var M = E[S];
          c[M] = [a(c[M][0], t(N, C[S]))];
        }
        y[b] = [N];
      }
    }
    return new D({ data: y, size: [p, 1] });
  }
}), Qt = "usolveAll", No = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], To = J(Qt, No, (r) => {
  var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: s, DenseMatrix: D } = r, l = $n({ DenseMatrix: D });
  return e(Qt, { "SparseMatrix, Array | Matrix": function(d, c) {
    return i(d, c);
  }, "DenseMatrix, Array | Matrix": function(d, c) {
    return v(d, c);
  }, "Array, Array | Matrix": function(d, c) {
    var p = n(d), o = v(p, c);
    return o.map((h) => h.valueOf());
  } });
  function v(f, d) {
    for (var c = [l(f, d, true)._data.map((E) => E[0])], p = f._data, o = f._size[0], h = f._size[1], g = h - 1; g >= 0; g--) for (var w = c.length, y = 0; y < w; y++) {
      var b = c[y];
      if (s(p[g][g], 0)) if (s(b[g], 0)) {
        if (y === 0) {
          var A = [...b];
          A[g] = 1;
          for (var C = g - 1; C >= 0; C--) A[C] = a(A[C], p[C][g]);
          c.push(A);
        }
      } else {
        if (y === 0) return [];
        c.splice(y, 1), y -= 1, w -= 1;
      }
      else {
        b[g] = u(b[g], p[g][g]);
        for (var F = g - 1; F >= 0; F--) b[F] = a(b[F], t(b[g], p[F][g]));
      }
    }
    return c.map((E) => new D({ data: E.map((m) => [m]), size: [o, 1] }));
  }
  function i(f, d) {
    for (var c = [l(f, d, true)._data.map((G) => G[0])], p = f._size[0], o = f._size[1], h = f._values, g = f._index, w = f._ptr, y = o - 1; y >= 0; y--) for (var b = c.length, F = 0; F < b; F++) {
      for (var A = c[F], C = [], E = [], m = w[y], _ = w[y + 1], B = 0, x = _ - 1; x >= m; x--) {
        var N = g[x];
        N === y ? B = h[x] : N < y && (C.push(h[x]), E.push(N));
      }
      if (s(B, 0)) if (s(A[y], 0)) {
        if (F === 0) {
          var R = [...A];
          R[y] = 1;
          for (var T = 0, $ = E.length; T < $; T++) {
            var Q = E[T];
            R[Q] = a(R[Q], C[T]);
          }
          c.push(R);
        }
      } else {
        if (F === 0) return [];
        c.splice(F, 1), F -= 1, b -= 1;
      }
      else {
        A[y] = u(A[y], B);
        for (var S = 0, O = E.length; S < O; S++) {
          var M = E[S];
          A[M] = a(A[M], t(A[y], C[S]));
        }
      }
    }
    return c.map((G) => new D({ data: G.map((z) => [z]), size: [p, 1] }));
  }
}), ce = "equal", zo = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], Oo = J(ce, zo, (r) => {
  var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a } = r, s = Gr({ typed: e }), D = kr({ typed: e, DenseMatrix: t }), l = Xr({ typed: e, DenseMatrix: t }), v = Ur({ typed: e, matrix: n, concat: a });
  return e(ce, $o({ typed: e, equalScalar: u }), v({ elop: u, SS: D, DS: s, Ss: l }));
}), $o = J(ce, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: n } = r;
  return e(ce, { "any, any": function(t, a) {
    return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
  } });
}), De = "smaller", Io = ["typed", "config", "matrix", "DenseMatrix", "concat"], qo = J(De, Io, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, s = Gr({ typed: e }), D = kr({ typed: e, DenseMatrix: t }), l = Xr({ typed: e, DenseMatrix: t }), v = Ur({ typed: e, matrix: u, concat: a }), i = Hr({ typed: e });
  return e(De, Ro({ typed: e, config: n }), { "boolean, boolean": (f, d) => f < d, "BigNumber, BigNumber": function(d, c) {
    return d.lt(c) && !Qr(d, c, n.relTol, n.absTol);
  }, "bigint, bigint": (f, d) => f < d, "Fraction, Fraction": (f, d) => f.compare(d) === -1, "Complex, Complex": function(d, c) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, i, v({ SS: D, DS: s, Ss: l }));
}), Ro = J(De, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(De, { "number, number": function(t, a) {
    return t < a && !$r(t, a, n.relTol, n.absTol);
  } });
}), pe = "smallerEq", Uo = ["typed", "config", "matrix", "DenseMatrix", "concat"], Po = J(pe, Uo, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, s = Gr({ typed: e }), D = kr({ typed: e, DenseMatrix: t }), l = Xr({ typed: e, DenseMatrix: t }), v = Ur({ typed: e, matrix: u, concat: a }), i = Hr({ typed: e });
  return e(pe, Lo({ typed: e, config: n }), { "boolean, boolean": (f, d) => f <= d, "BigNumber, BigNumber": function(d, c) {
    return d.lte(c) || Qr(d, c, n.relTol, n.absTol);
  }, "bigint, bigint": (f, d) => f <= d, "Fraction, Fraction": (f, d) => f.compare(d) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, i, v({ SS: D, DS: s, Ss: l }));
}), Lo = J(pe, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(pe, { "number, number": function(t, a) {
    return t <= a || $r(t, a, n.relTol, n.absTol);
  } });
}), de = "larger", Vo = ["typed", "config", "matrix", "DenseMatrix", "concat"], Zo = J(de, Vo, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, s = Gr({ typed: e }), D = kr({ typed: e, DenseMatrix: t }), l = Xr({ typed: e, DenseMatrix: t }), v = Ur({ typed: e, matrix: u, concat: a }), i = Hr({ typed: e });
  return e(de, Jo({ typed: e, config: n }), { "boolean, boolean": (f, d) => f > d, "BigNumber, BigNumber": function(d, c) {
    return d.gt(c) && !Qr(d, c, n.relTol, n.absTol);
  }, "bigint, bigint": (f, d) => f > d, "Fraction, Fraction": (f, d) => f.compare(d) === 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, i, v({ SS: D, DS: s, Ss: l }));
}), Jo = J(de, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(de, { "number, number": function(t, a) {
    return t > a && !$r(t, a, n.relTol, n.absTol);
  } });
}), he = "largerEq", Wo = ["typed", "config", "matrix", "DenseMatrix", "concat"], Qo = J(he, Wo, (r) => {
  var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, s = Gr({ typed: e }), D = kr({ typed: e, DenseMatrix: t }), l = Xr({ typed: e, DenseMatrix: t }), v = Ur({ typed: e, matrix: u, concat: a }), i = Hr({ typed: e });
  return e(he, Xo({ typed: e, config: n }), { "boolean, boolean": (f, d) => f >= d, "BigNumber, BigNumber": function(d, c) {
    return d.gte(c) || Qr(d, c, n.relTol, n.absTol);
  }, "bigint, bigint": function(d, c) {
    return d >= c;
  }, "Fraction, Fraction": (f, d) => f.compare(d) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, i, v({ SS: D, DS: s, Ss: l }));
}), Xo = J(he, ["typed", "config"], (r) => {
  var { typed: e, config: n } = r;
  return e(he, { "number, number": function(t, a) {
    return t >= a || $r(t, a, n.relTol, n.absTol);
  } });
}), Go = "ImmutableDenseMatrix", Yo = ["smaller", "DenseMatrix"], Ko = J(Go, Yo, (r) => {
  var { smaller: e, DenseMatrix: n } = r;
  function u(t, a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !Mr(a)) throw new Error("Invalid datatype: " + a);
    if (cr(t) || Dr(t)) {
      var s = new n(t, a);
      this._data = s._data, this._size = s._size, this._datatype = s._datatype, this._min = null, this._max = null;
    } else if (t && Dr(t.data) && Dr(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t) throw new TypeError("Unsupported type of data (" + Nr(t) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return u.prototype = new n(), u.prototype.type = "ImmutableDenseMatrix", u.prototype.isImmutableDenseMatrix = true, u.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var a = n.prototype.subset.call(this, t);
        return cr(a) ? new u({ data: a._data, size: a._size, datatype: a._datatype }) : a;
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
    return new u({ data: tr(this._data), size: tr(this._size), datatype: this._datatype });
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
}, { isClass: true }), Ho = "Index", ko = ["ImmutableDenseMatrix", "getMatrixDataType"], jo = J(Ho, ko, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
  function u(a) {
    if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var s = 0, D = arguments.length; s < D; s++) {
      var l = arguments[s], v = Dr(l), i = cr(l), f = null;
      if (on(l)) this._dimensions.push(l), this._isScalar = false;
      else if (v || i) {
        var d = void 0;
        n(l) === "boolean" ? (v && (d = t(Xt(l).valueOf())), i && (d = t(Xt(l._data).valueOf())), f = l.valueOf().length) : d = t(l.valueOf()), this._dimensions.push(d);
        var c = d.size();
        (c.length !== 1 || c[0] !== 1 || f !== null) && (this._isScalar = false);
      } else if (typeof l == "number") this._dimensions.push(t([l]));
      else if (typeof l == "string") this._dimensions.push(l);
      else throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      this._sourceSize.push(f);
    }
  }
  u.prototype.type = "Index", u.prototype.isIndex = true;
  function t(a) {
    for (var s = 0, D = a.length; s < D; s++) if (typeof a[s] != "number" || !vr(a[s])) throw new TypeError("Index parameters must be positive integer numbers");
    return new e(a);
  }
  return u.prototype.clone = function() {
    var a = new u();
    return a._dimensions = tr(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
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
    return this._dimensions[a] || null;
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
function Xt(r) {
  var e = [];
  return r.forEach((n, u) => {
    n && e.push(u);
  }), e;
}
var rs = "atan", es = ["typed"], ts = J(rs, es, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(u) {
    return Math.atan(u);
  }, Complex: function(u) {
    return u.atan();
  }, BigNumber: function(u) {
    return u.atan();
  } });
}), In = J("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((n) => (u) => {
    if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(n, u.valueType())(u.value);
  }) };
}), Gt = "cos", ns = ["typed"], us = J(Gt, ns, (r) => {
  var { typed: e } = r, n = In({ typed: e });
  return e(Gt, { number: Math.cos, "Complex | BigNumber": (u) => u.cos() }, n);
}), Yt = "sin", as = ["typed"], is = J(Yt, as, (r) => {
  var { typed: e } = r, n = In({ typed: e });
  return e(Yt, { number: Math.sin, "Complex | BigNumber": (u) => u.sin() }, n);
}), Kt = "add", os = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], ss = J(Kt, os, (r) => {
  var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: s, concat: D } = r, l = Nn({ typed: e }), v = wi({ typed: e, equalScalar: t }), i = Tn({ typed: e, DenseMatrix: a }), f = Ur({ typed: e, matrix: n, concat: D });
  return e(Kt, { "any, any": u, "any, any, ...any": e.referToSelf((d) => (c, p, o) => {
    for (var h = d(c, p), g = 0; g < o.length; g++) h = d(h, o[g]);
    return h;
  }) }, f({ elop: u, DS: l, SS: v, Ss: i }));
}), Ht = "norm", fs = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], ls = J(Ht, fs, (r) => {
  var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: s, multiply: D, equalScalar: l, larger: v, smaller: i, matrix: f, ctranspose: d, eigs: c } = r;
  return e(Ht, { number: Math.abs, Complex: function(E) {
    return E.abs();
  }, BigNumber: function(E) {
    return E.abs();
  }, boolean: function(E) {
    return Math.abs(E);
  }, Array: function(E) {
    return A(f(E), 2);
  }, Matrix: function(E) {
    return A(E, 2);
  }, "Array, number | BigNumber | string": function(E, m) {
    return A(f(E), m);
  }, "Matrix, number | BigNumber | string": function(E, m) {
    return A(E, m);
  } });
  function p(C) {
    var E = 0;
    return C.forEach(function(m) {
      var _ = n(m);
      v(_, E) && (E = _);
    }, true), E;
  }
  function o(C) {
    var E;
    return C.forEach(function(m) {
      var _ = n(m);
      (!E || i(_, E)) && (E = _);
    }, true), E || 0;
  }
  function h(C, E) {
    if (E === Number.POSITIVE_INFINITY || E === "inf") return p(C);
    if (E === Number.NEGATIVE_INFINITY || E === "-inf") return o(C);
    if (E === "fro") return A(C, 2);
    if (typeof E == "number" && !isNaN(E)) {
      if (!l(E, 0)) {
        var m = 0;
        return C.forEach(function(_) {
          m = u(t(n(_), E), m);
        }, true), t(m, 1 / E);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function g(C) {
    var E = 0;
    return C.forEach(function(m, _) {
      E = u(E, D(m, a(m)));
    }), n(s(E));
  }
  function w(C) {
    var E = [], m = 0;
    return C.forEach(function(_, B) {
      var x = B[1], N = u(E[x] || 0, n(_));
      v(N, m) && (m = N), E[x] = N;
    }, true), m;
  }
  function y(C) {
    var E = C.size();
    if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
    var m = d(C), _ = D(m, C), B = c(_).values.toArray(), x = B[B.length - 1];
    return n(s(x));
  }
  function b(C) {
    var E = [], m = 0;
    return C.forEach(function(_, B) {
      var x = B[0], N = u(E[x] || 0, n(_));
      v(N, m) && (m = N), E[x] = N;
    }, true), m;
  }
  function F(C, E) {
    if (E === 1) return w(C);
    if (E === Number.POSITIVE_INFINITY || E === "inf") return b(C);
    if (E === "fro") return g(C);
    if (E === 2) return y(C);
    throw new Error("Unsupported parameter value " + E);
  }
  function A(C, E) {
    var m = C.size();
    if (m.length === 1) return h(C, E);
    if (m.length === 2) {
      if (m[0] && m[1]) return F(C, E);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), kt = "dot", vs = ["typed", "addScalar", "multiplyScalar", "conj", "size"], cs = J(kt, vs, (r) => {
  var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
  return e(kt, { "Array | DenseMatrix, Array | DenseMatrix": D, "SparseMatrix, SparseMatrix": l });
  function s(i, f) {
    var d = v(i), c = v(f), p, o;
    if (d.length === 1) p = d[0];
    else if (d.length === 2 && d[1] === 1) p = d[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + d.join(", ") + ")");
    if (c.length === 1) o = c[0];
    else if (c.length === 2 && c[1] === 1) o = c[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + c.join(", ") + ")");
    if (p !== o) throw new RangeError("Vectors must have equal length (" + p + " != " + o + ")");
    if (p === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return p;
  }
  function D(i, f) {
    var d = s(i, f), c = cr(i) ? i._data : i, p = cr(i) ? i._datatype || i.getDataType() : void 0, o = cr(f) ? f._data : f, h = cr(f) ? f._datatype || f.getDataType() : void 0, g = v(i).length === 2, w = v(f).length === 2, y = n, b = u;
    if (p && h && p === h && typeof p == "string" && p !== "mixed") {
      var F = p;
      y = e.find(n, [F, F]), b = e.find(u, [F, F]);
    }
    if (!g && !w) {
      for (var A = b(t(c[0]), o[0]), C = 1; C < d; C++) A = y(A, b(t(c[C]), o[C]));
      return A;
    }
    if (!g && w) {
      for (var E = b(t(c[0]), o[0][0]), m = 1; m < d; m++) E = y(E, b(t(c[m]), o[m][0]));
      return E;
    }
    if (g && !w) {
      for (var _ = b(t(c[0][0]), o[0]), B = 1; B < d; B++) _ = y(_, b(t(c[B][0]), o[B]));
      return _;
    }
    if (g && w) {
      for (var x = b(t(c[0][0]), o[0][0]), N = 1; N < d; N++) x = y(x, b(t(c[N][0]), o[N][0]));
      return x;
    }
  }
  function l(i, f) {
    s(i, f);
    for (var d = i._index, c = i._values, p = f._index, o = f._values, h = 0, g = n, w = u, y = 0, b = 0; y < d.length && b < p.length; ) {
      var F = d[y], A = p[b];
      if (F < A) {
        y++;
        continue;
      }
      if (F > A) {
        b++;
        continue;
      }
      F === A && (h = g(h, w(c[y], o[b])), y++, b++);
    }
    return h;
  }
  function v(i) {
    return cr(i) ? i.size() : a(i);
  }
}), jt = "qr", Ds = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], ps = J(jt, Ds, (r) => {
  var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: s, sign: D, sqrt: l, conj: v, unaryMinus: i, addScalar: f, divideScalar: d, multiplyScalar: c, subtractScalar: p, complex: o } = r;
  return me(e(jt, { DenseMatrix: function(b) {
    return g(b);
  }, SparseMatrix: function(b) {
    return w();
  }, Array: function(b) {
    var F = n(b), A = g(F);
    return { Q: A.Q.valueOf(), R: A.R.valueOf() };
  } }), { _denseQRimpl: h });
  function h(y) {
    var b = y._size[0], F = y._size[1], A = t([b], "dense"), C = A._data, E = y.clone(), m = E._data, _, B, x, N = u([b], "");
    for (x = 0; x < Math.min(F, b); ++x) {
      var S = m[x][x], O = i(s(S, 0) ? 1 : D(S)), M = v(O), R = 0;
      for (_ = x; _ < b; _++) R = f(R, c(m[_][x], v(m[_][x])));
      var T = c(O, l(R));
      if (!a(T)) {
        var $ = p(S, T);
        for (N[x] = 1, _ = x + 1; _ < b; _++) N[_] = d(m[_][x], $);
        var Q = i(v(d($, T))), G = void 0;
        for (B = x; B < F; B++) {
          for (G = 0, _ = x; _ < b; _++) G = f(G, c(v(N[_]), m[_][B]));
          for (G = c(G, Q), _ = x; _ < b; _++) m[_][B] = c(p(m[_][B], c(N[_], G)), M);
        }
        for (_ = 0; _ < b; _++) {
          for (G = 0, B = x; B < b; B++) G = f(G, c(C[_][B], N[B]));
          for (G = c(G, Q), B = x; B < b; ++B) C[_][B] = d(p(C[_][B], c(G, v(N[B]))), M);
        }
      }
    }
    return { Q: A, R: E, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function g(y) {
    var b = h(y), F = b.R._data;
    if (y._data.length > 0) for (var A = F[0][0].type === "Complex" ? o(0) : 0, C = 0; C < F.length; ++C) for (var E = 0; E < C && E < (F[0] || []).length; ++E) F[C][E] = A;
    return b;
  }
  function w(y) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
}), rn = "det", ds = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], hs = J(rn, ds, (r) => {
  var { typed: e, matrix: n, subtractScalar: u, multiply: t, divideScalar: a, isZero: s, unaryMinus: D } = r;
  return e(rn, { any: function(i) {
    return tr(i);
  }, "Array | Matrix": function(i) {
    var f;
    switch (cr(i) ? f = i.size() : Array.isArray(i) ? (i = n(i), f = i.size()) : f = [], f.length) {
      case 0:
        return tr(i);
      case 1:
        if (f[0] === 1) return tr(i.valueOf()[0]);
        if (f[0] === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + pr(f) + ")");
      case 2: {
        var d = f[0], c = f[1];
        if (d === c) return l(i.clone().valueOf(), d);
        if (c === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + pr(f) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + pr(f) + ")");
    }
  } });
  function l(v, i, f) {
    if (i === 1) return tr(v[0][0]);
    if (i === 2) return u(t(v[0][0], v[1][1]), t(v[1][0], v[0][1]));
    for (var d = false, c = new Array(i).fill(0).map((C, E) => E), p = 0; p < i; p++) {
      var o = c[p];
      if (s(v[o][p])) {
        var h = void 0;
        for (h = p + 1; h < i; h++) if (!s(v[c[h]][p])) {
          o = c[h], c[h] = c[p], c[p] = o, d = !d;
          break;
        }
        if (h === i) return v[o][p];
      }
      for (var g = v[o][p], w = p === 0 ? 1 : v[c[p - 1]][p - 1], y = p + 1; y < i; y++) for (var b = c[y], F = p + 1; F < i; F++) v[b][F] = a(u(t(v[b][F], g), t(v[b][p], v[o][F])), w);
    }
    var A = v[c[i - 1]][i - 1];
    return d ? D(A) : A;
  }
}), en = "inv", ms = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], gs = J(en, ms, (r) => {
  var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: s, det: D, identity: l, abs: v } = r;
  return e(en, { "Array | Matrix": function(d) {
    var c = cr(d) ? d.size() : nr(d);
    switch (c.length) {
      case 1:
        if (c[0] === 1) return cr(d) ? n([u(1, d.valueOf()[0])]) : [u(1, d[0])];
        throw new RangeError("Matrix must be square (size: " + pr(c) + ")");
      case 2: {
        var p = c[0], o = c[1];
        if (p === o) return cr(d) ? n(i(d.valueOf(), p, o), d.storage()) : i(d, p, o);
        throw new RangeError("Matrix must be square (size: " + pr(c) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + pr(c) + ")");
    }
  }, any: function(d) {
    return u(1, d);
  } });
  function i(f, d, c) {
    var p, o, h, g, w;
    if (d === 1) {
      if (g = f[0][0], g === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(1, g)]];
    } else if (d === 2) {
      var y = D(f);
      if (y === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[u(f[1][1], y), u(s(f[0][1]), y)], [u(s(f[1][0]), y), u(f[0][0], y)]];
    } else {
      var b = f.concat();
      for (p = 0; p < d; p++) b[p] = b[p].concat();
      for (var F = l(d).valueOf(), A = 0; A < c; A++) {
        var C = v(b[A][A]), E = A;
        for (p = A + 1; p < d; ) v(b[p][A]) > C && (C = v(b[p][A]), E = p), p++;
        if (C === 0) throw Error("Cannot calculate inverse, determinant is zero");
        p = E, p !== A && (w = b[A], b[A] = b[p], b[p] = w, w = F[A], F[A] = F[p], F[p] = w);
        var m = b[A], _ = F[A];
        for (p = 0; p < d; p++) {
          var B = b[p], x = F[p];
          if (p !== A) {
            if (B[A] !== 0) {
              for (h = u(s(B[A]), m[A]), o = A; o < c; o++) B[o] = t(B[o], a(h, m[o]));
              for (o = 0; o < c; o++) x[o] = t(x[o], a(h, _[o]));
            }
          } else {
            for (h = m[A], o = A; o < c; o++) B[o] = u(B[o], h);
            for (o = 0; o < c; o++) x[o] = u(x[o], h);
          }
        }
      }
      return F;
    }
  }
});
function ys(r) {
  var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: s, sqrt: D, abs: l, bignumber: v, diag: i, size: f, reshape: d, inv: c, qr: p, usolve: o, usolveAll: h, equal: g, complex: w, larger: y, smaller: b, matrixFromColumns: F, dot: A } = r;
  function C(z, I, W, X) {
    var V = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, q = E(z, I, W, X, V);
    m(z, I, W, X, V, q);
    var { values: Z, C: P } = _(z, I, W, X, V);
    if (V) {
      var U = B(z, I, P, q, Z, W, X);
      return { values: Z, eigenvectors: U };
    }
    return { values: Z };
  }
  function E(z, I, W, X, V) {
    var q = X === "BigNumber", Z = X === "Complex", P = q ? v(0) : 0, U = q ? v(1) : Z ? w(1) : 1, Y = q ? v(1) : 1, L = q ? v(10) : 2, k = a(L, L), j;
    V && (j = Array(I).fill(U));
    for (var rr = false; !rr; ) {
      rr = true;
      for (var er = 0; er < I; er++) {
        for (var ar = P, or = P, dr = 0; dr < I; dr++) er !== dr && (ar = e(ar, l(z[dr][er])), or = e(or, l(z[er][dr])));
        if (!g(ar, 0) && !g(or, 0)) {
          for (var sr = Y, lr = ar, _r = s(or, L), Br = a(or, L); b(lr, _r); ) lr = a(lr, k), sr = a(sr, L);
          for (; y(lr, Br); ) lr = s(lr, k), sr = s(sr, L);
          var Ar = b(s(e(lr, or), sr), a(e(ar, or), 0.95));
          if (Ar) {
            rr = false;
            for (var qr = s(1, sr), Sr = 0; Sr < I; Sr++) er !== Sr && (z[er][Sr] = a(z[er][Sr], qr), z[Sr][er] = a(z[Sr][er], sr));
            V && (j[er] = a(j[er], qr));
          }
        }
      }
    }
    return V ? i(j) : null;
  }
  function m(z, I, W, X, V, q) {
    var Z = X === "BigNumber", P = X === "Complex", U = Z ? v(0) : P ? w(0) : 0;
    Z && (W = v(W));
    for (var Y = 0; Y < I - 2; Y++) {
      for (var L = 0, k = U, j = Y + 1; j < I; j++) {
        var rr = z[j][Y];
        b(l(k), l(rr)) && (k = rr, L = j);
      }
      if (!b(l(k), W)) {
        if (L !== Y + 1) {
          var er = z[L];
          z[L] = z[Y + 1], z[Y + 1] = er;
          for (var ar = 0; ar < I; ar++) {
            var or = z[ar][L];
            z[ar][L] = z[ar][Y + 1], z[ar][Y + 1] = or;
          }
          if (V) {
            var dr = q[L];
            q[L] = q[Y + 1], q[Y + 1] = dr;
          }
        }
        for (var sr = Y + 2; sr < I; sr++) {
          var lr = s(z[sr][Y], k);
          if (lr !== 0) {
            for (var _r = 0; _r < I; _r++) z[sr][_r] = n(z[sr][_r], a(lr, z[Y + 1][_r]));
            for (var Br = 0; Br < I; Br++) z[Br][Y + 1] = e(z[Br][Y + 1], a(lr, z[Br][sr]));
            if (V) for (var Ar = 0; Ar < I; Ar++) q[sr][Ar] = n(q[sr][Ar], a(lr, q[Y + 1][Ar]));
          }
        }
      }
    }
    return q;
  }
  function _(z, I, W, X, V) {
    var q = X === "BigNumber", Z = X === "Complex", P = q ? v(1) : Z ? w(1) : 1;
    q && (W = v(W));
    for (var U = tr(z), Y = [], L = I, k = [], j = V ? i(Array(I).fill(P)) : void 0, rr = V ? i(Array(L).fill(P)) : void 0, er = 0; er <= 100; ) {
      er += 1;
      for (var ar = U[L - 1][L - 1], or = 0; or < L; or++) U[or][or] = n(U[or][or], ar);
      var { Q: dr, R: sr } = p(U);
      U = t(sr, dr);
      for (var lr = 0; lr < L; lr++) U[lr][lr] = e(U[lr][lr], ar);
      if (V && (rr = t(rr, dr)), L === 1 || b(l(U[L - 1][L - 2]), W)) {
        er = 0, Y.push(U[L - 1][L - 1]), V && (k.unshift([[1]]), S(rr, I), j = t(j, rr), L > 1 && (rr = i(Array(L - 1).fill(P)))), L -= 1, U.pop();
        for (var _r = 0; _r < L; _r++) U[_r].pop();
      } else if (L === 2 || b(l(U[L - 2][L - 3]), W)) {
        er = 0;
        var Br = x(U[L - 2][L - 2], U[L - 2][L - 1], U[L - 1][L - 2], U[L - 1][L - 1]);
        Y.push(...Br), V && (k.unshift(N(U[L - 2][L - 2], U[L - 2][L - 1], U[L - 1][L - 2], U[L - 1][L - 1], Br[0], Br[1], W, X)), S(rr, I), j = t(j, rr), L > 2 && (rr = i(Array(L - 2).fill(P)))), L -= 2, U.pop(), U.pop();
        for (var Ar = 0; Ar < L; Ar++) U[Ar].pop(), U[Ar].pop();
      }
      if (L === 0) break;
    }
    if (Y.sort((ee, zr) => +n(l(ee), l(zr))), er > 100) {
      var qr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + Y.join(", "));
      throw qr.values = Y, qr.vectors = [], qr;
    }
    var Sr = V ? t(j, O(k, I)) : void 0;
    return { values: Y, C: Sr };
  }
  function B(z, I, W, X, V, q, Z) {
    var P = c(W), U = t(P, z, W), Y = Z === "BigNumber", L = Z === "Complex", k = Y ? v(0) : L ? w(0) : 0, j = Y ? v(1) : L ? w(1) : 1, rr = [], er = [];
    for (var ar of V) {
      var or = M(rr, ar, g);
      or === -1 ? (rr.push(ar), er.push(1)) : er[or] += 1;
    }
    for (var dr = [], sr = rr.length, lr = Array(I).fill(k), _r = i(Array(I).fill(j)), Br = function() {
      var Sr = rr[Ar], ee = n(U, t(Sr, _r)), zr = h(ee, lr);
      for (zr.shift(); zr.length < er[Ar]; ) {
        var tt = R(ee, I, zr, q, Z);
        if (tt === null) break;
        zr.push(tt);
      }
      var Jn = t(c(X), W);
      zr = zr.map((Be) => t(Jn, Be)), dr.push(...zr.map((Be) => ({ value: Sr, vector: u(Be) })));
    }, Ar = 0; Ar < sr; Ar++) Br();
    return dr;
  }
  function x(z, I, W, X) {
    var V = e(z, X), q = n(a(z, X), a(I, W)), Z = a(V, 0.5), P = a(D(n(a(V, V), a(4, q))), 0.5);
    return [e(Z, P), n(Z, P)];
  }
  function N(z, I, W, X, V, q, Z, P) {
    var U = P === "BigNumber", Y = P === "Complex", L = U ? v(0) : Y ? w(0) : 0, k = U ? v(1) : Y ? w(1) : 1;
    if (b(l(W), Z)) return [[k, L], [L, k]];
    if (y(l(n(V, q)), Z)) return [[n(V, X), n(q, X)], [W, W]];
    var j = n(z, V), rr = n(X, V);
    return b(l(I), Z) && b(l(rr), Z) ? [[j, k], [W, L]] : [[I, L], [rr, k]];
  }
  function S(z, I) {
    for (var W = 0; W < z.length; W++) z[W].push(...Array(I - z[W].length).fill(0));
    for (var X = z.length; X < I; X++) z.push(Array(I).fill(0)), z[X][X] = 1;
    return z;
  }
  function O(z, I) {
    for (var W = [], X = 0; X < I; X++) W[X] = Array(I).fill(0);
    var V = 0;
    for (var q of z) {
      for (var Z = q.length, P = 0; P < Z; P++) for (var U = 0; U < Z; U++) W[V + P][V + U] = q[P][U];
      V += Z;
    }
    return W;
  }
  function M(z, I, W) {
    for (var X = 0; X < z.length; X++) if (W(z[X], I)) return X;
    return -1;
  }
  function R(z, I, W, X, V) {
    for (var q = V === "BigNumber" ? v(1e3) : 1e3, Z, P = 0; P < 5; ++P) {
      Z = T(I, W, V);
      try {
        Z = o(z, Z);
      } catch {
        continue;
      }
      if (y(Q(Z), q)) break;
    }
    if (P >= 5) return null;
    for (P = 0; ; ) {
      var U = o(z, Z);
      if (b(Q($(Z, [U])), X)) break;
      if (++P >= 10) return null;
      Z = G(U);
    }
    return Z;
  }
  function T(z, I, W) {
    var X = W === "BigNumber", V = W === "Complex", q = Array(z).fill(0).map((Z) => 2 * Math.random() - 1);
    return X && (q = q.map((Z) => v(Z))), V && (q = q.map((Z) => w(Z))), q = $(q, I), G(q, W);
  }
  function $(z, I) {
    var W = f(z);
    for (var X of I) X = d(X, W), z = n(z, t(s(A(X, z), A(X, X)), X));
    return z;
  }
  function Q(z) {
    return l(D(A(z, z)));
  }
  function G(z, I) {
    var W = I === "BigNumber", X = I === "Complex", V = W ? v(1) : X ? w(1) : 1;
    return t(s(V, Q(z)), z);
  }
  return C;
}
function As(r) {
  var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: s, sin: D, multiplyScalar: l, inv: v, bignumber: i, multiply: f, add: d } = r;
  function c(m, _) {
    var B = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, x = arguments.length > 3 ? arguments[3] : void 0, N = arguments.length > 4 ? arguments[4] : void 0;
    if (x === "number") return p(m, B, N);
    if (x === "BigNumber") return o(m, B, N);
    throw TypeError("Unsupported data type: " + x);
  }
  function p(m, _, B) {
    var x = m.length, N = Math.abs(_ / x), S, O;
    if (B) {
      O = new Array(x);
      for (var M = 0; M < x; M++) O[M] = Array(x).fill(0), O[M][M] = 1;
    }
    for (var R = A(m); Math.abs(R[1]) >= Math.abs(N); ) {
      var T = R[0][0], $ = R[0][1];
      S = h(m[T][T], m[$][$], m[T][$]), m = F(m, S, T, $), B && (O = w(O, S, T, $)), R = A(m);
    }
    for (var Q = Array(x).fill(0), G = 0; G < x; G++) Q[G] = m[G][G];
    return E(tr(Q), O, B);
  }
  function o(m, _, B) {
    var x = m.length, N = t(_ / x), S, O;
    if (B) {
      O = new Array(x);
      for (var M = 0; M < x; M++) O[M] = Array(x).fill(0), O[M][M] = 1;
    }
    for (var R = C(m); t(R[1]) >= t(N); ) {
      var T = R[0][0], $ = R[0][1];
      S = g(m[T][T], m[$][$], m[T][$]), m = b(m, S, T, $), B && (O = y(O, S, T, $)), R = C(m);
    }
    for (var Q = Array(x).fill(0), G = 0; G < x; G++) Q[G] = m[G][G];
    return E(tr(Q), O, B);
  }
  function h(m, _, B) {
    var x = _ - m;
    return Math.abs(x) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * B / (_ - m));
  }
  function g(m, _, B) {
    var x = u(_, m);
    return t(x) <= e.relTol ? i(-1).acos().div(4) : l(0.5, a(f(2, B, v(x))));
  }
  function w(m, _, B, x) {
    for (var N = m.length, S = Math.cos(_), O = Math.sin(_), M = Array(N).fill(0), R = Array(N).fill(0), T = 0; T < N; T++) M[T] = S * m[T][B] - O * m[T][x], R[T] = O * m[T][B] + S * m[T][x];
    for (var $ = 0; $ < N; $++) m[$][B] = M[$], m[$][x] = R[$];
    return m;
  }
  function y(m, _, B, x) {
    for (var N = m.length, S = s(_), O = D(_), M = Array(N).fill(i(0)), R = Array(N).fill(i(0)), T = 0; T < N; T++) M[T] = u(l(S, m[T][B]), l(O, m[T][x])), R[T] = n(l(O, m[T][B]), l(S, m[T][x]));
    for (var $ = 0; $ < N; $++) m[$][B] = M[$], m[$][x] = R[$];
    return m;
  }
  function b(m, _, B, x) {
    for (var N = m.length, S = i(s(_)), O = i(D(_)), M = l(S, S), R = l(O, O), T = Array(N).fill(i(0)), $ = Array(N).fill(i(0)), Q = f(i(2), S, O, m[B][x]), G = n(u(l(M, m[B][B]), Q), l(R, m[x][x])), z = d(l(R, m[B][B]), Q, l(M, m[x][x])), I = 0; I < N; I++) T[I] = u(l(S, m[B][I]), l(O, m[x][I])), $[I] = n(l(O, m[B][I]), l(S, m[x][I]));
    m[B][B] = G, m[x][x] = z, m[B][x] = i(0), m[x][B] = i(0);
    for (var W = 0; W < N; W++) W !== B && W !== x && (m[B][W] = T[W], m[W][B] = T[W], m[x][W] = $[W], m[W][x] = $[W]);
    return m;
  }
  function F(m, _, B, x) {
    for (var N = m.length, S = Math.cos(_), O = Math.sin(_), M = S * S, R = O * O, T = Array(N).fill(0), $ = Array(N).fill(0), Q = M * m[B][B] - 2 * S * O * m[B][x] + R * m[x][x], G = R * m[B][B] + 2 * S * O * m[B][x] + M * m[x][x], z = 0; z < N; z++) T[z] = S * m[B][z] - O * m[x][z], $[z] = O * m[B][z] + S * m[x][z];
    m[B][B] = Q, m[x][x] = G, m[B][x] = 0, m[x][B] = 0;
    for (var I = 0; I < N; I++) I !== B && I !== x && (m[B][I] = T[I], m[I][B] = T[I], m[x][I] = $[I], m[I][x] = $[I]);
    return m;
  }
  function A(m) {
    for (var _ = m.length, B = 0, x = [0, 1], N = 0; N < _; N++) for (var S = N + 1; S < _; S++) Math.abs(B) < Math.abs(m[N][S]) && (B = Math.abs(m[N][S]), x = [N, S]);
    return [x, B];
  }
  function C(m) {
    for (var _ = m.length, B = 0, x = [0, 1], N = 0; N < _; N++) for (var S = N + 1; S < _; S++) t(B) < t(m[N][S]) && (B = t(m[N][S]), x = [N, S]);
    return [x, B];
  }
  function E(m, _, B) {
    var x = m.length, N = Array(x), S;
    if (B) {
      S = Array(x);
      for (var O = 0; O < x; O++) S[O] = Array(x);
    }
    for (var M = 0; M < x; M++) {
      for (var R = 0, T = m[0], $ = 0; $ < m.length; $++) t(m[$]) < t(T) && (R = $, T = m[R]);
      if (N[M] = m.splice(R, 1)[0], B) for (var Q = 0; Q < x; Q++) S[M][Q] = _[Q][R], _[Q].splice(R, 1);
    }
    if (!B) return { values: N };
    var G = S.map((z, I) => ({ value: N[I], vector: z }));
    return { values: N, eigenvectors: G };
  }
  return c;
}
var Fs = "eigs", Es = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], ws = J(Fs, Es, (r) => {
  var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: s, abs: D, atan: l, cos: v, sin: i, multiplyScalar: f, divideScalar: d, inv: c, bignumber: p, multiply: o, add: h, larger: g, column: w, flatten: y, number: b, complex: F, sqrt: A, diag: C, size: E, reshape: m, qr: _, usolve: B, usolveAll: x, im: N, re: S, smaller: O, matrixFromColumns: M, dot: R } = r, T = As({ config: e, addScalar: t, subtract: a, abs: D, atan: l, cos: v, sin: i, multiplyScalar: f, inv: c, bignumber: p, multiply: o, add: h }), $ = ys({ addScalar: t, subtract: a, multiply: o, multiplyScalar: f, flatten: y, divideScalar: d, sqrt: A, abs: D, bignumber: p, diag: C, size: E, reshape: m, qr: _, inv: c, usolve: B, usolveAll: x, equal: s, complex: F, larger: g, smaller: O, matrixFromColumns: M, dot: R });
  return n("eigs", { Array: function(q) {
    return Q(u(q));
  }, "Array, number|BigNumber": function(q, Z) {
    return Q(u(q), { precision: Z });
  }, "Array, Object"(V, q) {
    return Q(u(V), q);
  }, Matrix: function(q) {
    return Q(q, { matricize: true });
  }, "Matrix, number|BigNumber": function(q, Z) {
    return Q(q, { precision: Z, matricize: true });
  }, "Matrix, Object": function(q, Z) {
    var P = { matricize: true };
    return me(P, Z), Q(q, P);
  } });
  function Q(V) {
    var q, Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, P = "eigenvectors" in Z ? Z.eigenvectors : true, U = (q = Z.precision) !== null && q !== void 0 ? q : e.relTol, Y = G(V, U, P);
    return Z.matricize && (Y.values = u(Y.values), P && (Y.eigenvectors = Y.eigenvectors.map((L) => {
      var { value: k, vector: j } = L;
      return { value: k, vector: u(j) };
    }))), P && Object.defineProperty(Y, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), Y;
  }
  function G(V, q, Z) {
    var P = V.toArray(), U = V.size();
    if (U.length !== 2 || U[0] !== U[1]) throw new RangeError("Matrix must be square (size: ".concat(pr(U), ")"));
    var Y = U[0];
    if (I(P, Y, q) && (W(P, Y), z(P, Y, q))) {
      var L = X(V, P, Y);
      return T(P, Y, q, L, Z);
    }
    var k = X(V, P, Y);
    return $(P, Y, q, k, Z);
  }
  function z(V, q, Z) {
    for (var P = 0; P < q; P++) for (var U = P; U < q; U++) if (g(p(D(a(V[P][U], V[U][P]))), Z)) return false;
    return true;
  }
  function I(V, q, Z) {
    for (var P = 0; P < q; P++) for (var U = 0; U < q; U++) if (g(p(D(N(V[P][U]))), Z)) return false;
    return true;
  }
  function W(V, q) {
    for (var Z = 0; Z < q; Z++) for (var P = 0; P < q; P++) V[Z][P] = S(V[Z][P]);
  }
  function X(V, q, Z) {
    var P = V.datatype();
    if (P === "number" || P === "BigNumber" || P === "Complex") return P;
    for (var U = false, Y = false, L = false, k = 0; k < Z; k++) for (var j = 0; j < Z; j++) {
      var rr = q[k][j];
      if (fr(rr) || Ie(rr)) U = true;
      else if (gr(rr)) Y = true;
      else if ($e(rr)) L = true;
      else throw TypeError("Unsupported type in Matrix: " + Nr(rr));
    }
    if (Y && L && console.warn("Complex BigNumbers not supported, this operation will lose precission."), L) {
      for (var er = 0; er < Z; er++) for (var ar = 0; ar < Z; ar++) q[er][ar] = F(q[er][ar]);
      return "Complex";
    }
    if (Y) {
      for (var or = 0; or < Z; or++) for (var dr = 0; dr < Z; dr++) q[or][dr] = p(q[or][dr]);
      return "BigNumber";
    }
    if (U) {
      for (var sr = 0; sr < Z; sr++) for (var lr = 0; lr < Z; lr++) q[sr][lr] = b(q[sr][lr]);
      return "number";
    } else throw TypeError("Matrix contains unsupported types only.");
  }
}), Cs = "divide", bs = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], _s = J(Cs, bs, (r) => {
  var { typed: e, matrix: n, multiply: u, equalScalar: t, divideScalar: a, inv: s } = r, D = Mn({ typed: e, equalScalar: t }), l = Ze({ typed: e });
  return e("divide", sn({ "Array | Matrix, Array | Matrix": function(i, f) {
    return u(i, s(f));
  }, "DenseMatrix, any": function(i, f) {
    return l(i, f, a, false);
  }, "SparseMatrix, any": function(i, f) {
    return D(i, f, a, false);
  }, "Array, any": function(i, f) {
    return l(n(i), f, a, false).valueOf();
  }, "any, Array | Matrix": function(i, f) {
    return u(i, s(f));
  } }, a.signatures));
}), jr = Zu({ config: wr }), Ee = Qu({}), Je = ra({}), We = na({}), br = ha({ Matrix: We }), H = Uu({ BigNumber: jr, Complex: Ee, DenseMatrix: br, Fraction: Je }), Qe = Ha({ typed: H }), Yr = ja({ typed: H }), Bs = ts({ typed: H }), Xe = Pa({ Complex: Ee, typed: H }), we = Li({ typed: H }), xs = us({ typed: H }), Tr = _a({ config: wr, typed: H }), qn = eo({ typed: H }), Ss = no({ typed: H }), Ms = Zi({ typed: H }), Rn = ga({ typed: H }), Ns = Fa({ config: wr, typed: H }), Un = wa({ equalScalar: Tr, typed: H }), Pr = xi({ typed: H }), Ge = Oa({ typed: H }), Ts = Wi({ typed: H }), zs = Ti({ BigNumber: jr, Fraction: Je, complex: Xe, typed: H }), Os = is({ typed: H }), Ce = Sa({ Matrix: We, equalScalar: Tr, typed: H }), re = ei({ typed: H }), Ye = qa({ BigNumber: jr, typed: H }), Ke = $i({ Complex: Ee, config: wr, typed: H }), be = Ya({ typed: H }), Pn = Za({ Fraction: Je, typed: H }), ir = Wa({ DenseMatrix: br, Matrix: We, SparseMatrix: Ce, typed: H }), $s = Co({ bignumber: Ye, fraction: Pn, number: Ge }), Is = co({ isInteger: Rn, matrix: ir, typed: H }), He = po({ matrix: ir, config: wr, typed: H }), qs = mo({ matrix: ir, typed: H }), Rs = Fo({ BigNumber: jr, config: wr, matrix: ir, typed: H }), Lr = Xi({ isInteger: Rn, matrix: ir, typed: H }), Us = yo({ conj: we, transpose: qs, typed: H }), Ps = ji({ DenseMatrix: br, SparseMatrix: Ce, matrix: ir, typed: H }), Vr = _o({ numeric: $s, typed: H }), Ln = Oo({ DenseMatrix: br, concat: Lr, equalScalar: Tr, matrix: ir, typed: H }), ke = ao({ BigNumber: jr, DenseMatrix: br, SparseMatrix: Ce, config: wr, matrix: ir, typed: H }), ef = oo({ matrix: ir, multiplyScalar: Pr, typed: H }), Ls = Qo({ DenseMatrix: br, concat: Lr, config: wr, matrix: ir, typed: H }), Vs = Xa({ flatten: qn, matrix: ir, size: He, typed: H }), Zs = ps({ addScalar: Yr, complex: Xe, conj: we, divideScalar: Vr, equal: Ln, identity: ke, isZero: Un, matrix: ir, multiplyScalar: Pr, sign: zs, sqrt: Ke, subtractScalar: re, typed: H, unaryMinus: be, zeros: Rs }), _e = qo({ DenseMatrix: br, concat: Lr, config: wr, matrix: ir, typed: H }), Vn = qi({ DenseMatrix: br, concat: Lr, equalScalar: Tr, matrix: ir, subtractScalar: re, typed: H, unaryMinus: be }), Js = Mo({ DenseMatrix: br, divideScalar: Vr, equalScalar: Tr, matrix: ir, multiplyScalar: Pr, subtractScalar: re, typed: H }), je = ss({ DenseMatrix: br, SparseMatrix: Ce, addScalar: Yr, concat: Lr, equalScalar: Tr, matrix: ir, typed: H }), Zn = cs({ addScalar: Yr, conj: we, multiplyScalar: Pr, size: He, typed: H }), Ws = Ko({ DenseMatrix: br, smaller: _e }), Qs = jo({ ImmutableDenseMatrix: Ws, getMatrixDataType: Ss }), rt = Zo({ DenseMatrix: br, concat: Lr, config: wr, matrix: ir, typed: H }), Zr = Mi({ addScalar: Yr, dot: Zn, equalScalar: Tr, matrix: ir, multiplyScalar: Pr, typed: H }), Xs = To({ DenseMatrix: br, divideScalar: Vr, equalScalar: Tr, matrix: ir, multiplyScalar: Pr, subtractScalar: re, typed: H }), tf = Hi({ matrix: ir, multiply: Zr, subtract: Vn, typed: H }), Gs = hs({ divideScalar: Vr, isZero: Un, matrix: ir, multiply: Zr, subtractScalar: re, typed: H, unaryMinus: be }), Ys = Po({ DenseMatrix: br, concat: Lr, config: wr, matrix: ir, typed: H }), Ks = lo({ bignumber: Ye, matrix: ir, add: je, config: wr, isPositive: Ns, larger: rt, largerEq: Ls, smaller: _e, smallerEq: Ys, typed: H }), Hs = Yi({ Index: Qs, matrix: ir, range: Ks, typed: H }), et = gs({ abs: Qe, addScalar: Yr, det: Gs, divideScalar: Vr, identity: ke, matrix: ir, multiply: Zr, typed: H, unaryMinus: be }), ks = xo({ Complex: Ee, config: wr, fraction: Pn, identity: ke, inv: et, matrix: ir, multiply: Zr, number: Ge, typed: H }), nf = _s({ divideScalar: Vr, equalScalar: Tr, inv: et, matrix: ir, multiply: Zr, typed: H }), js = ws({ abs: Qe, add: je, addScalar: Yr, atan: Bs, bignumber: Ye, column: Hs, complex: Xe, config: wr, cos: xs, diag: Ps, divideScalar: Vr, dot: Zn, equal: Ln, flatten: qn, im: Ms, inv: et, larger: rt, matrix: ir, matrixFromColumns: Vs, multiply: Zr, multiplyScalar: Pr, number: Ge, qr: Zs, re: Ts, reshape: Is, sin: Os, size: He, smaller: _e, sqrt: Ke, subtract: Vn, typed: H, usolve: Js, usolveAll: Xs }), uf = ls({ abs: Qe, add: je, conj: we, ctranspose: Us, eigs: js, equalScalar: Tr, larger: rt, matrix: ir, multiply: Zr, pow: ks, smaller: _e, sqrt: Ke, typed: H });
export {
  nf as a,
  je as b,
  tf as c,
  Zn as d,
  ir as e,
  ke as i,
  ef as k,
  Zr as m,
  uf as n,
  Vn as s,
  qs as t,
  Rs as z
};
