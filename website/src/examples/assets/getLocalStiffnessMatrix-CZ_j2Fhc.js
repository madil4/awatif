import { _ as pt, t as rt, D as Wt, C as Ir } from "./complex-i8qiIvCl.js";
const et = Math.PI / 180, Ht = /* @__PURE__ */ new WeakMap();
function Du(r) {
  const e = Ht.get(r);
  if (e) return e;
  if (!r.layers.length) throw new Error("CLT layup must contain at least one layer.");
  const t = { r33: 1, r66: 1, r77: 1, r88: 1, ...r.options }, a = r.layers.reduce((v, h) => v + h.thickness, 0), n = pu(r.layers, a, t.noGlueAtNarrowSide), u = We(3, 3), f = We(3, 3), D = We(3, 3);
  for (const v of n) {
    const h = v.zTop - v.zBot;
    ze(u, v.qLocal, h), t.shearCoupling ? (ze(f, v.qLocal, 0.5 * (v.zTop ** 2 - v.zBot ** 2)), ze(D, v.qLocal, (v.zTop ** 3 - v.zBot ** 3) / 3)) : ze(D, v.qLocal, v.layer.thickness ** 3 / 12);
  }
  t.shearCoupling || gu(f);
  let c = We(2, 2), l, o, i;
  if (t.shearCoupling) {
    const v = du(u);
    i = v / et;
    const h = n.map((d) => {
      const E = v - d.layer.thetaDeg * et, A = ga(da(d.layer, t.noGlueAtNarrowSide), E), b = ya(ma(d.layer), E);
      return { zBot: d.zBot, zTop: d.zTop, q11: A[0][0], q22: A[1][1], q55: b[0][0], q44: b[1][1] };
    });
    l = kt(h.map((d) => ({ zBot: d.zBot, zTop: d.zTop, qn: d.q11, qs: d.q55 }))), o = kt(h.map((d) => ({ zBot: d.zBot, zTop: d.zTop, qn: d.q22, qs: d.q44 })));
    const s = l * h.reduce((d, E) => d + E.q55 * (E.zTop - E.zBot), 0), m = o * h.reduce((d, E) => d + E.q44 * (E.zTop - E.zBot), 0);
    c = hu([[s, 0], [0, m]], v);
  } else {
    for (const v of n) ze(c, v.qShearLocal, v.zTop - v.zBot);
    mu(c, 5 / 6);
  }
  u[2][2] *= t.r66, D[2][2] *= t.r33, c[0][0] *= t.r77, c[1][1] *= t.r88;
  const p = { t: a, A: u, B: f, D, S: c, rho13: l, rho23: o, alphaDeg: i };
  return Ht.set(r, p), p;
}
function pu(r, e, t) {
  let a = e / 2;
  const n = [];
  for (const u of r) {
    const f = a - u.thickness, D = da(u, t), c = ga(D, u.thetaDeg * et), l = ya(ma(u), u.thetaDeg * et);
    n.push({ layer: u, zTop: a, zBot: f, qLocal: c, qShearLocal: l }), a = f;
  }
  return n;
}
function da(r, e) {
  const t = r.Ex, a = e ? 0 : r.Ey, n = r.nuXY, u = t === 0 ? 0 : n * a / t, f = 1 - n * u, D = t / f, c = a / f, l = n * a / f, o = r.Gxy;
  return [[D, l, 0], [l, c, 0], [0, 0, o]];
}
function ma(r) {
  return [[r.Gxz, 0], [0, r.Gyz]];
}
function ga(r, e) {
  const t = Math.cos(e), a = Math.sin(e), n = r[0][0], u = r[1][1], f = r[0][1], D = r[2][2], c = t * t, l = a * a, o = c * t, i = l * a, p = c * c, v = l * l, h = n * p + 2 * (f + 2 * D) * c * l + u * v, s = n * v + 2 * (f + 2 * D) * c * l + u * p, m = (n + u - 4 * D) * c * l + f * (p + v), d = (n - f - 2 * D) * o * a - (u - f - 2 * D) * t * i, E = (n - f - 2 * D) * t * i - (u - f - 2 * D) * o * a, A = (n + u - 2 * f - 2 * D) * c * l + D * (p + v);
  return [[h, m, d], [m, s, E], [d, E, A]];
}
function ya(r, e) {
  const t = Math.cos(e), a = Math.sin(e), n = [[t, a], [-a, t]];
  return tt(tt(n, r), Aa(n));
}
function hu(r, e) {
  const t = Math.cos(e), a = Math.sin(e), n = [[t, -a], [a, t]];
  return tt(tt(n, r), Aa(n));
}
function du(r) {
  const e = r[0][0], t = r[1][1], a = r[0][1], n = r[2][2], u = r[0][2], f = r[1][2], c = 1e-12 * Math.max(1, Math.abs(e), Math.abs(t), Math.abs(a), Math.abs(n));
  if (Math.abs(u) <= c && Math.abs(f) <= c) return e >= t ? 0 : Math.PI / 2;
  const l = (v) => {
    const h = Math.cos(v), s = Math.sin(v), m = h * h, d = s * s, E = m * h, A = d * s, b = m * m, F = d * d;
    return b * e + F * t + m * d * (2 * a + 4 * n) + 4 * E * s * u + 4 * h * A * f;
  };
  let o = 0, i = Number.NEGATIVE_INFINITY;
  const p = Math.PI / 7200;
  for (let v = 0; v < Math.PI; v += p) {
    const h = l(v);
    h > i && (i = h, o = v);
  }
  return o;
}
function kt(r) {
  const e = [...r].sort((i, p) => i.zBot - p.zBot), t = 1e-12;
  let a = 0, n = 0;
  for (const i of e) a += i.qn * 0.5 * (i.zTop ** 2 - i.zBot ** 2), n += i.qn * (i.zTop - i.zBot);
  const u = n === 0 ? 0 : a / n;
  let f = 0;
  for (const i of e) f += i.qn * ((i.zTop - u) ** 3 - (i.zBot - u) ** 3) / 3;
  let D = 0, c = 0, l = 0;
  for (const i of e) {
    const { zBot: p, zTop: v, qn: h, qs: s } = i;
    D += s * (v - p);
    const m = l + 0.5 * h * (p - u) ** 2, d = -0.5 * h, E = h * u, A = m - 0.5 * h * u ** 2, b = (g) => d ** 2 * g ** 5 / 5 + 2 * d * E * g ** 4 / 4 + (2 * d * A + E ** 2) * g ** 3 / 3 + 2 * E * A * g ** 2 / 2 + A ** 2 * g;
    c += (b(v) - b(p)) / Math.max(s, t), l = l - 0.5 * h * ((v - u) ** 2 - (p - u) ** 2);
  }
  const o = Math.max(D * c, t);
  return f * f / o;
}
function tt(r, e) {
  return [[r[0][0] * e[0][0] + r[0][1] * e[1][0], r[0][0] * e[0][1] + r[0][1] * e[1][1]], [r[1][0] * e[0][0] + r[1][1] * e[1][0], r[1][0] * e[0][1] + r[1][1] * e[1][1]]];
}
function Aa(r) {
  return [[r[0][0], r[1][0]], [r[0][1], r[1][1]]];
}
function We(r, e) {
  return Array.from({ length: r }, () => Array(e).fill(0));
}
function ze(r, e, t) {
  for (let a = 0; a < r.length; a++) for (let n = 0; n < r[0].length; n++) r[a][n] += e[a][n] * t;
}
function mu(r, e) {
  for (let t = 0; t < r.length; t++) for (let a = 0; a < r[0].length; a++) r[t][a] *= e;
}
function gu(r) {
  for (let e = 0; e < r.length; e++) for (let t = 0; t < r[0].length; t++) r[e][t] = 0;
}
var Fa = { relTol: 1e-12, absTol: 1e-15, matrix: "Matrix", number: "number", numberFallback: "number", precision: 64, predictable: false, randomSeed: null };
function Ea(r, e) {
  if (nt(r, e)) return r[e];
  throw typeof r[e] == "function" && yu(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function wa(r, e, t) {
  if (nt(r, e)) return r[e] = t, t;
  throw new Error('No access to property "' + e + '"');
}
function nt(r, e) {
  return !Au(r) && !Array.isArray(r) ? false : Ue(Fu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function yu(r, e) {
  return r == null || typeof r[e] != "function" || Ue(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : Ue(Eu, e) ? true : !(e in Object.prototype || e in Function.prototype);
}
function Au(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var Fu = { length: true, name: true }, Eu = { toString: true, valueOf: true, toLocaleString: true };
class wu {
  constructor(e) {
    this.wrappedObject = e, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
  }
  get(e) {
    return Ea(this.wrappedObject, e);
  }
  set(e, t) {
    return wa(this.wrappedObject, e, t), this;
  }
  has(e) {
    return nt(this.wrappedObject, e) && e in this.wrappedObject;
  }
  entries() {
    return bu(this.keys(), (e) => [e, this.get(e)]);
  }
  forEach(e) {
    for (var t of this.keys()) e(this.get(t), t, this);
  }
  delete(e) {
    nt(this.wrappedObject, e) && delete this.wrappedObject[e];
  }
  clear() {
    for (var e of this.keys()) this.delete(e);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
function bu(r, e) {
  return { next: () => {
    var t = r.next();
    return t.done ? t : { value: e(t.value), done: false };
  } };
}
function Fr(r) {
  return typeof r == "number";
}
function Cr(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
}
function Cu(r) {
  return typeof r == "bigint";
}
function $t(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
}
function Ot(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
}
function ba(r) {
  return r && r.constructor.prototype.isUnit === true || false;
}
function Kr(r) {
  return typeof r == "string";
}
var Ar = Array.isArray;
function dr(r) {
  return r && r.constructor.prototype.isMatrix === true || false;
}
function qe(r) {
  return Array.isArray(r) || dr(r);
}
function Ca(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function _a(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
}
function xa(r) {
  return r && r.constructor.prototype.isRange === true || false;
}
function ht(r) {
  return r && r.constructor.prototype.isIndex === true || false;
}
function _u(r) {
  return typeof r == "boolean";
}
function xu(r) {
  return r && r.constructor.prototype.isResultSet === true || false;
}
function Bu(r) {
  return r && r.constructor.prototype.isHelp === true || false;
}
function Su(r) {
  return typeof r == "function";
}
function Mu(r) {
  return r instanceof Date;
}
function Nu(r) {
  return r instanceof RegExp;
}
function It(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !$t(r) && !Ot(r));
}
function zu(r) {
  return r ? r instanceof Map || r instanceof wu || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
}
function Tu(r) {
  return r === null;
}
function $u(r) {
  return r === void 0;
}
function Ou(r) {
  return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
}
function Iu(r) {
  return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
}
function qu(r) {
  return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Uu(r) {
  return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
}
function Ru(r) {
  return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
}
function Pu(r) {
  return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
}
function Lu(r) {
  return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
}
function Qu(r) {
  return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
}
function Vu(r) {
  return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
}
function Zu(r) {
  return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
}
function Xu(r) {
  return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
}
function Ju(r) {
  return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
}
function Gu(r) {
  return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
}
function Yu(r) {
  return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
}
function Ku(r) {
  return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
}
function Wu(r) {
  return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
}
function Hu(r) {
  return r && r.constructor.prototype.isChain === true || false;
}
function Qr(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : Cr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function pr(r) {
  var e = typeof r;
  if (e === "number" || e === "bigint" || e === "string" || e === "boolean" || r === null || r === void 0) return r;
  if (typeof r.clone == "function") return r.clone();
  if (Array.isArray(r)) return r.map(function(t) {
    return pr(t);
  });
  if (r instanceof Date) return new Date(r.valueOf());
  if (Cr(r)) return r;
  if (It(r)) return ku(r, pr);
  if (e === "function") return r;
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function ku(r, e) {
  var t = {};
  for (var a in r) Ue(r, a) && (t[a] = e(r[a]));
  return t;
}
function Ba(r, e) {
  for (var t in e) Ue(e, t) && (r[t] = e[t]);
  return r;
}
function pe(r, e) {
  var t, a, n;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length) return false;
    for (a = 0, n = r.length; a < n; a++) if (!pe(r[a], e[a])) return false;
    return true;
  } else {
    if (typeof r == "function") return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object)) return false;
      for (t in r) if (!(t in e) || !pe(r[t], e[t])) return false;
      for (t in e) if (!(t in r)) return false;
      return true;
    } else return r === e;
  }
}
function Ue(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function ju(r, e) {
  for (var t = {}, a = 0; a < e.length; a++) {
    var n = e[a], u = r[n];
    u !== void 0 && (t[n] = u);
  }
  return t;
}
var ri = ["Matrix", "Array"], ei = ["number", "BigNumber", "Fraction"], Rr = function(e) {
  if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(Fa);
};
pt(Rr, Fa, { MATRIX_OPTIONS: ri, NUMBER_OPTIONS: ei });
function Y(r, e, t, a) {
  function n(u) {
    var f = ju(u, e.map(ai));
    return ti(r, e, u), t(f);
  }
  return n.isFactory = true, n.fn = r, n.dependencies = e.slice().sort(), a && (n.meta = a), n;
}
function ti(r, e, t) {
  var a = e.filter((u) => !ni(u)).every((u) => t[u] !== void 0);
  if (!a) {
    var n = e.filter((u) => t[u] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(n.map((u) => '"'.concat(u, '"')).join(", "), "."));
  }
}
function ni(r) {
  return r && r[0] === "?";
}
function ai(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function Er(r) {
  return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
}
var ui = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function bt(r, e, t) {
  var a = { 2: "0b", 8: "0o", 16: "0x" }, n = a[e], u = "";
  if (t) {
    if (t < 1) throw new Error("size must be in greater than 0");
    if (!Er(t)) throw new Error("size must be an integer");
    if (r > 2 ** (t - 1) - 1 || r < -(2 ** (t - 1))) throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!Er(r)) throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** t), u = "i".concat(t);
  }
  var f = "";
  return r < 0 && (r = -r, f = "-"), "".concat(f).concat(n).concat(r.toString(e)).concat(u);
}
function xt(r, e) {
  if (typeof e == "function") return e(r);
  if (r === 1 / 0) return "Infinity";
  if (r === -1 / 0) return "-Infinity";
  if (isNaN(r)) return "NaN";
  var { notation: t, precision: a, wordSize: n } = Sa(e);
  switch (t) {
    case "fixed":
      return oi(r, a);
    case "exponential":
      return Ma(r, a);
    case "engineering":
      return ii(r, a);
    case "bin":
      return bt(r, 2, n);
    case "oct":
      return bt(r, 8, n);
    case "hex":
      return bt(r, 16, n);
    case "auto":
      return si(r, a, e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var u = arguments[2], f = arguments[4];
        return u !== "." ? u + f : f;
      });
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Sa(r) {
  var e = "auto", t, a;
  if (r !== void 0) if (Fr(r)) t = r;
  else if (Cr(r)) t = r.toNumber();
  else if (It(r)) r.precision !== void 0 && (t = jt(r.precision, () => {
    throw new Error('Option "precision" must be a number or BigNumber');
  })), r.wordSize !== void 0 && (a = jt(r.wordSize, () => {
    throw new Error('Option "wordSize" must be a number or BigNumber');
  })), r.notation && (e = r.notation);
  else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return { notation: e, precision: t, wordSize: a };
}
function dt(r) {
  var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e) throw new SyntaxError("Invalid number " + r);
  var t = e[1], a = e[2], n = parseFloat(e[4] || "0"), u = a.indexOf(".");
  n += u !== -1 ? u - 1 : a.length - 1;
  var f = a.replace(".", "").replace(/^0*/, function(D) {
    return n -= D.length, "";
  }).replace(/0*$/, "").split("").map(function(D) {
    return parseInt(D);
  });
  return f.length === 0 && (f.push(0), n++), { sign: t, coefficients: f, exponent: n };
}
function ii(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var t = dt(r), a = mt(t, e), n = a.exponent, u = a.coefficients, f = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3;
  if (Fr(e)) for (; e > u.length || n - f + 1 > u.length; ) u.push(0);
  else for (var D = Math.abs(n - f) - (u.length - 1), c = 0; c < D; c++) u.push(0);
  for (var l = Math.abs(n - f), o = 1; l > 0; ) o++, l--;
  var i = u.slice(o).join(""), p = Fr(e) && i.length || i.match(/[1-9]/) ? "." + i : "", v = u.slice(0, o).join("") + p + "e" + (n >= 0 ? "+" : "") + f.toString();
  return a.sign + v;
}
function oi(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var t = dt(r), a = typeof e == "number" ? mt(t, t.exponent + 1 + e) : t, n = a.coefficients, u = a.exponent + 1, f = u + (e || 0);
  return n.length < f && (n = n.concat(_e(f - n.length))), u < 0 && (n = _e(-u + 1).concat(n), u = 1), u < n.length && n.splice(u, 0, u === 0 ? "0." : "."), a.sign + n.join("");
}
function Ma(r, e) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var t = dt(r), a = e ? mt(t, e) : t, n = a.coefficients, u = a.exponent;
  n.length < e && (n = n.concat(_e(e - n.length)));
  var f = n.shift();
  return a.sign + f + (n.length > 0 ? "." + n.join("") : "") + "e" + (u >= 0 ? "+" : "") + u;
}
function si(r, e, t) {
  if (isNaN(r) || !isFinite(r)) return String(r);
  var a = rn(t == null ? void 0 : t.lowerExp, -3), n = rn(t == null ? void 0 : t.upperExp, 5), u = dt(r), f = e ? mt(u, e) : u;
  if (f.exponent < a || f.exponent >= n) return Ma(r, e);
  var D = f.coefficients, c = f.exponent;
  D.length < e && (D = D.concat(_e(e - D.length))), D = D.concat(_e(c - D.length + 1 + (D.length < e ? e - D.length : 0))), D = _e(-c).concat(D);
  var l = c > 0 ? c : 0;
  return l < D.length - 1 && D.splice(l + 1, 0, "."), f.sign + D.join("");
}
function mt(r, e) {
  for (var t = { sign: r.sign, coefficients: r.coefficients, exponent: r.exponent }, a = t.coefficients; e <= 0; ) a.unshift(0), t.exponent++, e++;
  if (a.length > e) {
    var n = a.splice(e, a.length - e);
    if (n[0] >= 5) {
      var u = e - 1;
      for (a[u]++; a[u] === 10; ) a.pop(), u === 0 && (a.unshift(0), t.exponent++, u++), u--, a[u]++;
    }
  }
  return t;
}
function _e(r) {
  for (var e = [], t = 0; t < r; t++) e.push(0);
  return e;
}
function fi(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function fe(r, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (t <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (a < 0) throw new Error("Absolute tolerance must be at least 0");
  return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(t * Math.max(Math.abs(r), Math.abs(e)), a);
}
function jt(r, e) {
  if (Fr(r)) return r;
  if (Cr(r)) return r.toNumber();
  e();
}
function rn(r, e) {
  return Fr(r) ? r : Cr(r) ? r.toNumber() : e;
}
var Na = function() {
  return Na = rt.create, rt;
}, ci = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], li = Y("typed", ci, function(e) {
  var { BigNumber: t, Complex: a, DenseMatrix: n, Fraction: u } = e, f = Na();
  return f.clear(), f.addTypes([{ name: "number", test: Fr }, { name: "Complex", test: $t }, { name: "BigNumber", test: Cr }, { name: "bigint", test: Cu }, { name: "Fraction", test: Ot }, { name: "Unit", test: ba }, { name: "identifier", test: (D) => Kr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(D) }, { name: "string", test: Kr }, { name: "Chain", test: Hu }, { name: "Array", test: Ar }, { name: "Matrix", test: dr }, { name: "DenseMatrix", test: Ca }, { name: "SparseMatrix", test: _a }, { name: "Range", test: xa }, { name: "Index", test: ht }, { name: "boolean", test: _u }, { name: "ResultSet", test: xu }, { name: "Help", test: Bu }, { name: "function", test: Su }, { name: "Date", test: Mu }, { name: "RegExp", test: Nu }, { name: "null", test: Tu }, { name: "undefined", test: $u }, { name: "AccessorNode", test: Ou }, { name: "ArrayNode", test: Iu }, { name: "AssignmentNode", test: qu }, { name: "BlockNode", test: Uu }, { name: "ConditionalNode", test: Ru }, { name: "ConstantNode", test: Pu }, { name: "FunctionNode", test: Qu }, { name: "FunctionAssignmentNode", test: Lu }, { name: "IndexNode", test: Vu }, { name: "Node", test: Zu }, { name: "ObjectNode", test: Xu }, { name: "OperatorNode", test: Ju }, { name: "ParenthesisNode", test: Gu }, { name: "RangeNode", test: Yu }, { name: "RelationalNode", test: Ku }, { name: "SymbolNode", test: Wu }, { name: "Map", test: zu }, { name: "Object", test: It }]), f.addConversions([{ from: "number", to: "BigNumber", convert: function(c) {
    if (t || He(c), fi(c) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + c + "). Use function bignumber(x) to convert to BigNumber.");
    return new t(c);
  } }, { from: "number", to: "Complex", convert: function(c) {
    return a || ke(c), new a(c, 0);
  } }, { from: "BigNumber", to: "Complex", convert: function(c) {
    return a || ke(c), new a(c.toNumber(), 0);
  } }, { from: "bigint", to: "number", convert: function(c) {
    if (c > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + c + ")");
    return Number(c);
  } }, { from: "bigint", to: "BigNumber", convert: function(c) {
    return t || He(c), new t(c.toString());
  } }, { from: "bigint", to: "Fraction", convert: function(c) {
    return u || je(c), new u(c);
  } }, { from: "Fraction", to: "BigNumber", convert: function(c) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  } }, { from: "Fraction", to: "Complex", convert: function(c) {
    return a || ke(c), new a(c.valueOf(), 0);
  } }, { from: "number", to: "Fraction", convert: function(c) {
    u || je(c);
    var l = new u(c);
    if (l.valueOf() !== c) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + c + "). Use function fraction(x) to convert to Fraction.");
    return l;
  } }, { from: "string", to: "number", convert: function(c) {
    var l = Number(c);
    if (isNaN(l)) throw new Error('Cannot convert "' + c + '" to a number');
    return l;
  } }, { from: "string", to: "BigNumber", convert: function(c) {
    t || He(c);
    try {
      return new t(c);
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
    u || je(c);
    try {
      return new u(c);
    } catch {
      throw new Error('Cannot convert "' + c + '" to Fraction');
    }
  } }, { from: "string", to: "Complex", convert: function(c) {
    a || ke(c);
    try {
      return new a(c);
    } catch {
      throw new Error('Cannot convert "' + c + '" to Complex');
    }
  } }, { from: "boolean", to: "number", convert: function(c) {
    return +c;
  } }, { from: "boolean", to: "BigNumber", convert: function(c) {
    return t || He(c), new t(+c);
  } }, { from: "boolean", to: "bigint", convert: function(c) {
    return BigInt(+c);
  } }, { from: "boolean", to: "Fraction", convert: function(c) {
    return u || je(c), new u(+c);
  } }, { from: "boolean", to: "string", convert: function(c) {
    return String(c);
  } }, { from: "Array", to: "Matrix", convert: function(c) {
    return n || vi(), new n(c);
  } }, { from: "Matrix", to: "Array", convert: function(c) {
    return c.valueOf();
  } }]), f.onMismatch = (D, c, l) => {
    var o = f.createError(D, c, l);
    if (["wrongType", "mismatch"].includes(o.data.category) && c.length === 1 && qe(c[0]) && l.some((p) => !p.params.includes(","))) {
      var i = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw i.data = o.data, i;
    }
    throw o;
  }, f.onMismatch = (D, c, l) => {
    var o = f.createError(D, c, l);
    if (["wrongType", "mismatch"].includes(o.data.category) && c.length === 1 && qe(c[0]) && l.some((p) => !p.params.includes(","))) {
      var i = new TypeError("Function '".concat(D, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(D, ")'."));
      throw i.data = o.data, i;
    }
    throw o;
  }, f;
});
function He(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function ke(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function vi() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function je(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
var Di = "BigNumber", pi = ["?on", "config"], hi = Y(Di, pi, (r) => {
  var { on: e, config: t } = r, a = Wt.clone({ precision: t.precision, modulo: Wt.EUCLID });
  return a.prototype = Object.create(a.prototype), a.prototype.type = "BigNumber", a.prototype.isBigNumber = true, a.prototype.toJSON = function() {
    return { mathjs: "BigNumber", value: this.toString() };
  }, a.fromJSON = function(n) {
    return new a(n.value);
  }, e && e("config", function(n, u) {
    n.precision !== u.precision && a.config({ precision: n.precision });
  }), a;
}, { isClass: true }), di = "Complex", mi = [], gi = Y(di, mi, () => (Object.defineProperty(Ir, "name", { value: "Complex" }), Ir.prototype.constructor = Ir, Ir.prototype.type = "Complex", Ir.prototype.isComplex = true, Ir.prototype.toJSON = function() {
  return { mathjs: "Complex", re: this.re, im: this.im };
}, Ir.prototype.toPolar = function() {
  return { r: this.abs(), phi: this.arg() };
}, Ir.prototype.format = function(r) {
  var e = "", t = this.im, a = this.re, n = xt(this.re, r), u = xt(this.im, r), f = Fr(r) ? r : r ? r.precision : null;
  if (f !== null) {
    var D = Math.pow(10, -f);
    Math.abs(a / t) < D && (a = 0), Math.abs(t / a) < D && (t = 0);
  }
  return t === 0 ? e = n : a === 0 ? t === 1 ? e = "i" : t === -1 ? e = "-i" : e = u + "i" : t < 0 ? t === -1 ? e = n + " - i" : e = n + " - " + u.substring(1) + "i" : t === 1 ? e = n + " + i" : e = n + " + " + u + "i", e;
}, Ir.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object") return Ir(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var t = arguments[0], a = arguments[1];
      if (Fr(t)) {
        if (ba(a) && a.hasBase("ANGLE") && (a = a.toNumber("rad")), Fr(a)) return new Ir({ r: t, phi: a });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Ir.prototype.valueOf = Ir.prototype.toString, Ir.fromJSON = function(r) {
  return new Ir(r);
}, Ir.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, Ir), { isClass: true });
typeof BigInt > "u" && (BigInt = function(r) {
  if (isNaN(r)) throw new Error("");
  return r;
});
const tr = BigInt(0), or = BigInt(1), Re = BigInt(2), Bt = BigInt(5), Pr = BigInt(10), yi = 2e3, H = { s: or, n: tr, d: or };
function se(r, e) {
  try {
    r = BigInt(r);
  } catch {
    throw ve();
  }
  return r * e;
}
function kr(r) {
  return typeof r == "bigint" ? r : Math.floor(r);
}
function xr(r, e) {
  if (e === tr) throw qt();
  const t = Object.create(Yr.prototype);
  t.s = r < tr ? -or : or, r = r < tr ? -r : r;
  const a = Ae(r, e);
  return t.n = r / a, t.d = e / a, t;
}
function Ce(r) {
  const e = {};
  let t = r, a = Re, n = Bt - or;
  for (; n <= t; ) {
    for (; t % a === tr; ) t /= a, e[a] = (e[a] || tr) + or;
    n += or + Re * a++;
  }
  return t !== r ? t > 1 && (e[t] = (e[t] || tr) + or) : e[r] = (e[r] || tr) + or, e;
}
const $r = function(r, e) {
  let t = tr, a = or, n = or;
  if (r != null) if (e !== void 0) {
    if (typeof r == "bigint") t = r;
    else {
      if (isNaN(r)) throw ve();
      if (r % 1 !== 0) throw en();
      t = BigInt(r);
    }
    if (typeof e == "bigint") a = e;
    else {
      if (isNaN(e)) throw ve();
      if (e % 1 !== 0) throw en();
      a = BigInt(e);
    }
    n = t * a;
  } else if (typeof r == "object") {
    if ("d" in r && "n" in r) t = BigInt(r.n), a = BigInt(r.d), "s" in r && (t *= BigInt(r.s));
    else if (0 in r) t = BigInt(r[0]), 1 in r && (a = BigInt(r[1]));
    else if (typeof r == "bigint") t = r;
    else throw ve();
    n = t * a;
  } else if (typeof r == "number") {
    if (isNaN(r)) throw ve();
    if (r < 0 && (n = -or, r = -r), r % 1 === 0) t = BigInt(r);
    else {
      let u = 1, f = 0, D = 1, c = 1, l = 1, o = 1e7;
      for (r >= 1 && (u = 10 ** Math.floor(1 + Math.log10(r)), r /= u); D <= o && l <= o; ) {
        let i = (f + c) / (D + l);
        if (r === i) {
          D + l <= o ? (t = f + c, a = D + l) : l > D ? (t = c, a = l) : (t = f, a = D);
          break;
        } else r > i ? (f += c, D += l) : (c += f, l += D), D > o ? (t = c, a = l) : (t = f, a = D);
      }
      t = BigInt(t) * BigInt(u), a = BigInt(a);
    }
  } else if (typeof r == "string") {
    let u = 0, f = tr, D = tr, c = tr, l = or, o = or, i = r.replace(/_/g, "").match(/\d+|./g);
    if (i === null) throw ve();
    if (i[u] === "-" ? (n = -or, u++) : i[u] === "+" && u++, i.length === u + 1 ? D = se(i[u++], n) : i[u + 1] === "." || i[u] === "." ? (i[u] !== "." && (f = se(i[u++], n)), u++, (u + 1 === i.length || i[u + 1] === "(" && i[u + 3] === ")" || i[u + 1] === "'" && i[u + 3] === "'") && (D = se(i[u], n), l = Pr ** BigInt(i[u].length), u++), (i[u] === "(" && i[u + 2] === ")" || i[u] === "'" && i[u + 2] === "'") && (c = se(i[u + 1], n), o = Pr ** BigInt(i[u + 1].length) - or, u += 3)) : i[u + 1] === "/" || i[u + 1] === ":" ? (D = se(i[u], n), l = se(i[u + 2], or), u += 3) : i[u + 3] === "/" && i[u + 1] === " " && (f = se(i[u], n), D = se(i[u + 2], n), l = se(i[u + 4], or), u += 5), i.length <= u) a = l * o, n = t = c + a * f + o * D;
    else throw ve();
  } else if (typeof r == "bigint") t = r, n = r, a = or;
  else throw ve();
  if (a === tr) throw qt();
  H.s = n < tr ? -or : or, H.n = t < tr ? -t : t, H.d = a < tr ? -a : a;
};
function Ai(r, e, t) {
  let a = or;
  for (; e > tr; r = r * r % t, e >>= or) e & or && (a = a * r % t);
  return a;
}
function Fi(r, e) {
  for (; e % Re === tr; e /= Re) ;
  for (; e % Bt === tr; e /= Bt) ;
  if (e === or) return tr;
  let t = Pr % e, a = 1;
  for (; t !== or; a++) if (t = t * Pr % e, a > yi) return tr;
  return BigInt(a);
}
function Ei(r, e, t) {
  let a = or, n = Ai(Pr, t, e);
  for (let u = 0; u < 300; u++) {
    if (a === n) return BigInt(u);
    a = a * Pr % e, n = n * Pr % e;
  }
  return 0;
}
function Ae(r, e) {
  if (!r) return e;
  if (!e) return r;
  for (; ; ) {
    if (r %= e, !r) return e;
    if (e %= r, !e) return r;
  }
}
function Yr(r, e) {
  if ($r(r, e), this instanceof Yr) r = Ae(H.d, H.n), this.s = H.s, this.n = H.n / r, this.d = H.d / r;
  else return xr(H.s * H.n, H.d);
}
var qt = function() {
  return new Error("Division by Zero");
}, ve = function() {
  return new Error("Invalid argument");
}, en = function() {
  return new Error("Parameters must be integer");
};
Yr.prototype = { s: or, n: tr, d: or, abs: function() {
  return xr(this.n, this.d);
}, neg: function() {
  return xr(-this.s * this.n, this.d);
}, add: function(r, e) {
  return $r(r, e), xr(this.s * this.n * H.d + H.s * this.d * H.n, this.d * H.d);
}, sub: function(r, e) {
  return $r(r, e), xr(this.s * this.n * H.d - H.s * this.d * H.n, this.d * H.d);
}, mul: function(r, e) {
  return $r(r, e), xr(this.s * H.s * this.n * H.n, this.d * H.d);
}, div: function(r, e) {
  return $r(r, e), xr(this.s * H.s * this.n * H.d, this.d * H.n);
}, clone: function() {
  return xr(this.s * this.n, this.d);
}, mod: function(r, e) {
  if (r === void 0) return xr(this.s * this.n % this.d, or);
  if ($r(r, e), tr === H.n * this.d) throw qt();
  return xr(this.s * (H.d * this.n) % (H.n * this.d), H.d * this.d);
}, gcd: function(r, e) {
  return $r(r, e), xr(Ae(H.n, this.n) * Ae(H.d, this.d), H.d * this.d);
}, lcm: function(r, e) {
  return $r(r, e), H.n === tr && this.n === tr ? xr(tr, or) : xr(H.n * this.n, Ae(H.n, this.n) * Ae(H.d, this.d));
}, inverse: function() {
  return xr(this.s * this.d, this.n);
}, pow: function(r, e) {
  if ($r(r, e), H.d === or) return H.s < tr ? xr((this.s * this.d) ** H.n, this.n ** H.n) : xr((this.s * this.n) ** H.n, this.d ** H.n);
  if (this.s < tr) return null;
  let t = Ce(this.n), a = Ce(this.d), n = or, u = or;
  for (let f in t) if (f !== "1") {
    if (f === "0") {
      n = tr;
      break;
    }
    if (t[f] *= H.n, t[f] % H.d === tr) t[f] /= H.d;
    else return null;
    n *= BigInt(f) ** t[f];
  }
  for (let f in a) if (f !== "1") {
    if (a[f] *= H.n, a[f] % H.d === tr) a[f] /= H.d;
    else return null;
    u *= BigInt(f) ** a[f];
  }
  return H.s < tr ? xr(u, n) : xr(n, u);
}, log: function(r, e) {
  if ($r(r, e), this.s <= tr || H.s <= tr) return null;
  const t = {}, a = Ce(H.n), n = Ce(H.d), u = Ce(this.n), f = Ce(this.d);
  for (const l in n) a[l] = (a[l] || tr) - n[l];
  for (const l in f) u[l] = (u[l] || tr) - f[l];
  for (const l in a) l !== "1" && (t[l] = true);
  for (const l in u) l !== "1" && (t[l] = true);
  let D = null, c = null;
  for (const l in t) {
    const o = a[l] || tr, i = u[l] || tr;
    if (o === tr) {
      if (i !== tr) return null;
      continue;
    }
    let p = i, v = o;
    const h = Ae(p, v);
    if (p /= h, v /= h, D === null && c === null) D = p, c = v;
    else if (p * c !== D * v) return null;
  }
  return D !== null && c !== null ? xr(D, c) : null;
}, equals: function(r, e) {
  return $r(r, e), this.s * this.n * H.d === H.s * H.n * this.d;
}, lt: function(r, e) {
  return $r(r, e), this.s * this.n * H.d < H.s * H.n * this.d;
}, lte: function(r, e) {
  return $r(r, e), this.s * this.n * H.d <= H.s * H.n * this.d;
}, gt: function(r, e) {
  return $r(r, e), this.s * this.n * H.d > H.s * H.n * this.d;
}, gte: function(r, e) {
  return $r(r, e), this.s * this.n * H.d >= H.s * H.n * this.d;
}, compare: function(r, e) {
  $r(r, e);
  let t = this.s * this.n * H.d - H.s * H.n * this.d;
  return (tr < t) - (t < tr);
}, ceil: function(r) {
  return r = Pr ** BigInt(r || 0), xr(kr(this.s * r * this.n / this.d) + (r * this.n % this.d > tr && this.s >= tr ? or : tr), r);
}, floor: function(r) {
  return r = Pr ** BigInt(r || 0), xr(kr(this.s * r * this.n / this.d) - (r * this.n % this.d > tr && this.s < tr ? or : tr), r);
}, round: function(r) {
  return r = Pr ** BigInt(r || 0), xr(kr(this.s * r * this.n / this.d) + this.s * ((this.s >= tr ? or : tr) + Re * (r * this.n % this.d) > this.d ? or : tr), r);
}, roundTo: function(r, e) {
  $r(r, e);
  const t = this.n * H.d, a = this.d * H.n, n = t % a;
  let u = kr(t / a);
  return n + n >= a && u++, xr(this.s * u * H.n, H.d);
}, divisible: function(r, e) {
  return $r(r, e), !(!(H.n * this.d) || this.n * H.d % (H.n * this.d));
}, valueOf: function() {
  return Number(this.s * this.n) / Number(this.d);
}, toString: function(r) {
  let e = this.n, t = this.d;
  r = r || 15;
  let a = Fi(e, t), n = Ei(e, t, a), u = this.s < tr ? "-" : "";
  if (u += kr(e / t), e %= t, e *= Pr, e && (u += "."), a) {
    for (let f = n; f--; ) u += kr(e / t), e %= t, e *= Pr;
    u += "(";
    for (let f = a; f--; ) u += kr(e / t), e %= t, e *= Pr;
    u += ")";
  } else for (let f = r; e && f--; ) u += kr(e / t), e %= t, e *= Pr;
  return u;
}, toFraction: function(r) {
  let e = this.n, t = this.d, a = this.s < tr ? "-" : "";
  if (t === or) a += e;
  else {
    let n = kr(e / t);
    r && n > tr && (a += n, a += " ", e %= t), a += e, a += "/", a += t;
  }
  return a;
}, toLatex: function(r) {
  let e = this.n, t = this.d, a = this.s < tr ? "-" : "";
  if (t === or) a += e;
  else {
    let n = kr(e / t);
    r && n > tr && (a += n, e %= t), a += "\\frac{", a += e, a += "}{", a += t, a += "}";
  }
  return a;
}, toContinued: function() {
  let r = this.n, e = this.d, t = [];
  do {
    t.push(kr(r / e));
    let a = r % e;
    r = e, e = a;
  } while (r !== or);
  return t;
}, simplify: function(r) {
  const e = BigInt(1 / (r || 1e-3) | 0), t = this.abs(), a = t.toContinued();
  for (let n = 1; n < a.length; n++) {
    let u = xr(a[n - 1], or);
    for (let D = n - 2; D >= 0; D--) u = u.inverse().add(a[D]);
    let f = u.sub(t);
    if (f.n * e < f.d) return u.mul(this.s);
  }
  return this;
} };
var wi = "Fraction", bi = [], Ci = Y(wi, bi, () => (Object.defineProperty(Yr, "name", { value: "Fraction" }), Yr.prototype.constructor = Yr, Yr.prototype.type = "Fraction", Yr.prototype.isFraction = true, Yr.prototype.toJSON = function() {
  return { mathjs: "Fraction", n: String(this.s * this.n), d: String(this.d) };
}, Yr.fromJSON = function(r) {
  return new Yr(r);
}, Yr), { isClass: true }), _i = "Matrix", xi = [], Bi = Y(_i, xi, () => {
  function r() {
    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
  }
  return r.prototype.type = "Matrix", r.prototype.isMatrix = true, r.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, r.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, r.prototype.create = function(e, t) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, r.prototype.subset = function(e, t, a) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, r.prototype.get = function(e) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, r.prototype.set = function(e, t, a) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, r.prototype.resize = function(e, t) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, r.prototype.reshape = function(e, t) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, r.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, r.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, r.prototype.map = function(e, t) {
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
function Ct(r, e, t) {
  var a = r.constructor, n = new a(2), u = "";
  if (t) {
    if (t < 1) throw new Error("size must be in greater than 0");
    if (!Er(t)) throw new Error("size must be an integer");
    if (r.greaterThan(n.pow(t - 1).sub(1)) || r.lessThan(n.pow(t - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!r.isInteger()) throw new Error("Value must be an integer");
    r.lessThan(0) && (r = r.add(n.pow(t))), u = "i".concat(t);
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
function Si(r, e) {
  if (typeof e == "function") return e(r);
  if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var { notation: t, precision: a, wordSize: n } = Sa(e);
  switch (t) {
    case "fixed":
      return Ni(r, a);
    case "exponential":
      return tn(r, a);
    case "engineering":
      return Mi(r, a);
    case "bin":
      return Ct(r, 2, n);
    case "oct":
      return Ct(r, 8, n);
    case "hex":
      return Ct(r, 16, n);
    case "auto": {
      var u = nn(e == null ? void 0 : e.lowerExp, -3), f = nn(e == null ? void 0 : e.upperExp, 5);
      if (r.isZero()) return "0";
      var D, c = r.toSignificantDigits(a), l = c.e;
      return l >= u && l < f ? D = c.toFixed() : D = tn(r, a), D.replace(/((\.\d*?)(0+))($|e)/, function() {
        var o = arguments[2], i = arguments[4];
        return o !== "." ? o + i : i;
      });
    }
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Mi(r, e) {
  var t = r.e, a = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3, n = r.mul(Math.pow(10, -a)), u = n.toPrecision(e);
  if (u.includes("e")) {
    var f = r.constructor;
    u = new f(u).toFixed();
  }
  return u + "e" + (t >= 0 ? "+" : "") + a.toString();
}
function tn(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function Ni(r, e) {
  return r.toFixed(e);
}
function nn(r, e) {
  return Fr(r) ? r : Cr(r) ? r.toNumber() : e;
}
function br(r, e) {
  var t = zi(r, e);
  return e && typeof e == "object" && "truncate" in e && t.length > e.truncate ? t.substring(0, e.truncate - 3) + "..." : t;
}
function zi(r, e) {
  if (typeof r == "number") return xt(r, e);
  if (Cr(r)) return Si(r, e);
  if (Ti(r)) return !e || e.fraction !== "decimal" ? "".concat(r.s * r.n, "/").concat(r.d) : r.toString();
  if (Array.isArray(r)) return za(r, e);
  if (Kr(r)) return an(r);
  if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function") return r.format(e);
    if (r && r.toString(e) !== {}.toString()) return r.toString(e);
    var t = Object.keys(r).map((a) => an(a) + ": " + br(r[a], e));
    return "{" + t.join(", ") + "}";
  }
  return String(r);
}
function an(r) {
  for (var e = String(r), t = "", a = 0; a < e.length; ) {
    var n = e.charAt(a);
    t += n in un ? un[n] : n, a++;
  }
  return '"' + t + '"';
}
var un = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t" };
function za(r, e) {
  if (Array.isArray(r)) {
    for (var t = "[", a = r.length, n = 0; n < a; n++) n !== 0 && (t += ", "), t += za(r[n], e);
    return t += "]", t;
  } else return br(r, e);
}
function Ti(r) {
  return r && typeof r == "object" && typeof r.s == "bigint" && typeof r.n == "bigint" && typeof r.d == "bigint" || false;
}
function lr(r, e, t) {
  if (!(this instanceof lr)) throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = t, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
lr.prototype = new RangeError();
lr.prototype.constructor = RangeError;
lr.prototype.name = "DimensionError";
lr.prototype.isDimensionError = true;
function he(r, e, t) {
  if (!(this instanceof he)) throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = t), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
he.prototype = new RangeError();
he.prototype.constructor = RangeError;
he.prototype.name = "IndexError";
he.prototype.isIndexError = true;
function vr(r) {
  for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
  return e;
}
function Ta(r, e, t) {
  var a, n = r.length;
  if (n !== e[t]) throw new lr(n, e[t]);
  if (t < e.length - 1) {
    var u = t + 1;
    for (a = 0; a < n; a++) {
      var f = r[a];
      if (!Array.isArray(f)) throw new lr(e.length - 1, e.length, "<");
      Ta(r[a], e, u);
    }
  } else for (a = 0; a < n; a++) if (Array.isArray(r[a])) throw new lr(e.length + 1, e.length, ">");
}
function on(r, e) {
  var t = e.length === 0;
  if (t) {
    if (Array.isArray(r)) throw new lr(r.length, 0);
  } else Ta(r, e, 0);
}
function at(r, e) {
  var t = r.isMatrix ? r._size : vr(r), a = e._sourceSize;
  a.forEach((n, u) => {
    if (n !== null && n !== t[u]) throw new lr(n, t[u]);
  });
}
function yr(r, e) {
  if (r !== void 0) {
    if (!Fr(r) || !Er(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e) throw new he(r, e);
  }
}
function xe(r) {
  for (var e = 0; e < r._dimensions.length; ++e) {
    var t = r._dimensions[e];
    if (t._data && Ar(t._data)) {
      if (t._size[0] === 0) return true;
    } else if (t.isRange) {
      if (t.start === t.end) return true;
    } else if (Kr(t) && t.length === 0) return true;
  }
  return false;
}
function ut(r, e, t) {
  if (!Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new Error("Resizing to scalar is not supported");
  e.forEach(function(n) {
    if (!Fr(n) || !Er(n) || n < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + br(e) + ")");
  }), (Fr(r) || Cr(r)) && (r = [r]);
  var a = t !== void 0 ? t : 0;
  return St(r, e, 0, a), r;
}
function St(r, e, t, a) {
  var n, u, f = r.length, D = e[t], c = Math.min(f, D);
  if (r.length = D, t < e.length - 1) {
    var l = t + 1;
    for (n = 0; n < c; n++) u = r[n], Array.isArray(u) || (u = [u], r[n] = u), St(u, e, l, a);
    for (n = c; n < D; n++) u = [], r[n] = u, St(u, e, l, a);
  } else {
    for (n = 0; n < c; n++) for (; Array.isArray(r[n]); ) r[n] = r[n][0];
    for (n = c; n < D; n++) r[n] = a;
  }
}
function Ut(r, e) {
  var t = Mt(r, true), a = t.length;
  if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
  if (e.length === 0) throw new lr(0, a, "!=");
  e = Rt(e, a);
  var n = $a(e);
  if (a !== n) throw new lr(n, a, "!=");
  try {
    return $i(t, e);
  } catch (u) {
    throw u instanceof lr ? new lr(n, a, "!=") : u;
  }
}
function Rt(r, e) {
  var t = $a(r), a = r.slice(), n = -1, u = r.indexOf(n), f = r.indexOf(n, u + 1) >= 0;
  if (f) throw new Error("More than one wildcard in sizes");
  var D = u >= 0, c = e % t === 0;
  if (D) if (c) a[u] = -e / t;
  else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -t);
  return a;
}
function $a(r) {
  return r.reduce((e, t) => e * t, 1);
}
function $i(r, e) {
  for (var t = r, a, n = e.length - 1; n > 0; n--) {
    var u = e[n];
    a = [];
    for (var f = t.length / u, D = 0; D < f; D++) a.push(t.slice(D * u, (D + 1) * u));
    t = a;
  }
  return t;
}
function sn(r, e) {
  for (var t = vr(r); Array.isArray(r) && r.length === 1; ) r = r[0], t.shift();
  for (var a = t.length; t[a - 1] === 1; ) a--;
  return a < t.length && (r = Oa(r, a, 0), t.length = a), r;
}
function Oa(r, e, t) {
  var a, n;
  if (t < e) {
    var u = t + 1;
    for (a = 0, n = r.length; a < n; a++) r[a] = Oa(r[a], e, u);
  } else for (; Array.isArray(r); ) r = r[0];
  return r;
}
function Ia(r, e, t, a) {
  var n = a || vr(r);
  if (t) for (var u = 0; u < t; u++) r = [r], n.unshift(1);
  for (r = qa(r, e, 0); n.length < e; ) n.push(1);
  return r;
}
function qa(r, e, t) {
  var a, n;
  if (Array.isArray(r)) {
    var u = t + 1;
    for (a = 0, n = r.length; a < n; a++) r[a] = qa(r[a], e, u);
  } else for (var f = t; f < e; f++) r = [r];
  return r;
}
function Mt(r) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (!Array.isArray(r)) return r;
  if (typeof e != "boolean") throw new TypeError("Boolean expected for second argument of flatten");
  var t = [];
  return e ? n(r) : a(r), t;
  function a(u) {
    for (var f = 0; f < u.length; f++) {
      var D = u[f];
      Array.isArray(D) ? a(D) : t.push(D);
    }
  }
  function n(u) {
    if (Array.isArray(u[0])) for (var f = 0; f < u.length; f++) n(u[f]);
    else for (var D = 0; D < u.length; D++) t.push(u[D]);
  }
}
function gt(r, e) {
  for (var t, a = 0, n = 0; n < r.length; n++) {
    var u = r[n], f = Array.isArray(u);
    if (n === 0 && f && (a = u.length), f && u.length !== a) return;
    var D = f ? gt(u, e) : e(u);
    if (t === void 0) t = D;
    else if (t !== D) return "mixed";
  }
  return t;
}
function Ua(r, e, t, a) {
  if (a < t) {
    if (r.length !== e.length) throw new lr(r.length, e.length);
    for (var n = [], u = 0; u < r.length; u++) n[u] = Ua(r[u], e[u], t, a + 1);
    return n;
  } else return r.concat(e);
}
function Ra() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1) return r[0];
  if (r.length > 1) return r.slice(1).reduce(function(t, a) {
    return Ua(t, a, e, 0);
  }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Pa() {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++) e[t] = arguments[t];
  for (var a = e.map((p) => p.length), n = Math.max(...a), u = new Array(n).fill(null), f = 0; f < e.length; f++) for (var D = e[f], c = a[f], l = 0; l < c; l++) {
    var o = n - c + l;
    D[l] > u[o] && (u[o] = D[l]);
  }
  for (var i = 0; i < e.length; i++) La(e[i], u);
  return u;
}
function La(r, e) {
  for (var t = e.length, a = r.length, n = 0; n < a; n++) {
    var u = t - a + n;
    if (r[n] < e[u] && r[n] > 1 || r[n] > e[u]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(a, " with size ").concat(r[n], " to size ").concat(e[u]));
  }
}
function Nt(r, e) {
  var t = vr(r);
  if (pe(t, e)) return r;
  La(t, e);
  var a = Pa(t, e), n = a.length, u = [...Array(n - t.length).fill(1), ...t], f = qi(r);
  t.length < n && (f = Ut(f, u), t = vr(f));
  for (var D = 0; D < n; D++) t[D] < a[D] && (f = Oi(f, a[D], D), t = vr(f));
  return f;
}
function Oi(r, e, t) {
  return Ra(...Array(e).fill(r), t);
}
function Qa(r, e) {
  if (!Array.isArray(r)) throw new Error("Array expected");
  var t = vr(r);
  if (e.length !== t.length) throw new lr(e.length, t.length);
  for (var a = 0; a < e.length; a++) yr(e[a], t[a]);
  return e.reduce((n, u) => n[u], r);
}
function fn(r, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  if (r.length === 0) return [];
  if (t) return u(r);
  var a = [];
  return n(r, 0);
  function n(f, D) {
    if (Array.isArray(f)) {
      for (var c = f.length, l = Array(c), o = 0; o < c; o++) a[D] = o, l[o] = n(f[o], D + 1);
      return l;
    } else return e(f, a.slice(0, D), r);
  }
  function u(f) {
    if (Array.isArray(f)) {
      for (var D = f.length, c = Array(D), l = 0; l < D; l++) c[l] = u(f[l]);
      return c;
    } else return e(f);
  }
}
function Ii(r, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  if (r.length === 0) return;
  if (t) {
    u(r);
    return;
  }
  var a = [];
  n(r, 0);
  function n(f, D) {
    if (Array.isArray(f)) for (var c = f.length, l = 0; l < c; l++) a[D] = l, n(f[l], D + 1);
    else e(f, a.slice(0, D), r);
  }
  function u(f) {
    if (Array.isArray(f)) for (var D = f.length, c = 0; c < D; c++) u(f[c]);
    else e(f);
  }
}
function qi(r) {
  return pt([], r);
}
function it(r, e, t) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (rt.isTypedFunction(r)) {
    var n;
    if (a) n = 1;
    else {
      var u = (e.isMatrix ? e.size() : vr(e)).map(() => 0), f = e.isMatrix ? e.get(u) : Qa(e, u);
      n = Pi(r, f, u, e);
    }
    var D;
    if (e.isMatrix && e.dataType !== "mixed" && e.dataType !== void 0) {
      var c = Ui(r, n);
      D = c !== void 0 ? c : r;
    } else D = r;
    return n >= 1 && n <= 3 ? { isUnary: n === 1, fn: function() {
      for (var o = arguments.length, i = new Array(o), p = 0; p < o; p++) i[p] = arguments[p];
      return cn(D, i.slice(0, n), t, r.name);
    } } : { isUnary: false, fn: function() {
      for (var o = arguments.length, i = new Array(o), p = 0; p < o; p++) i[p] = arguments[p];
      return cn(D, i, t, r.name);
    } };
  }
  return a === void 0 ? { isUnary: Ri(r), fn: r } : { isUnary: a, fn: r };
}
function Ui(r, e) {
  var t = [];
  if (Object.entries(r.signatures).forEach((a) => {
    var [n, u] = a;
    n.split(",").length === e && t.push(u);
  }), t.length === 1) return t[0];
}
function Ri(r) {
  if (r.length !== 1) return false;
  var e = r.toString();
  if (/arguments/.test(e)) return false;
  var t = e.match(/\(.*?\)/);
  return !/\.\.\./.test(t);
}
function Pi(r, e, t, a) {
  for (var n = [e, t, a], u = 3; u > 0; u--) {
    var f = n.slice(0, u);
    if (rt.resolve(r, f) !== null) return u;
  }
}
function cn(r, e, t, a) {
  try {
    return r(...e);
  } catch (n) {
    Li(n, e, t, a);
  }
}
function Li(r, e, t, a) {
  var n;
  if (r instanceof TypeError && ((n = r.data) === null || n === void 0 ? void 0 : n.category) === "wrongType") {
    var u = [];
    throw u.push("value: ".concat(Qr(e[0]))), e.length >= 2 && u.push("index: ".concat(Qr(e[1]))), e.length >= 3 && u.push("array: ".concat(Qr(e[2]))), new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "".concat(a, "(").concat(u.join(", "), ") at index ").concat(JSON.stringify(e[1])));
  } else throw new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "to function ".concat(a, ": ").concat(r.message));
}
var Qi = "DenseMatrix", Vi = ["Matrix"], Zi = Y(Qi, Vi, (r) => {
  var { Matrix: e } = r;
  function t(o, i) {
    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
    if (i && !Kr(i)) throw new Error("Invalid datatype: " + i);
    if (dr(o)) o.type === "DenseMatrix" ? (this._data = pr(o._data), this._size = pr(o._size), this._datatype = i || o._datatype) : (this._data = o.toArray(), this._size = o.size(), this._datatype = i || o._datatype);
    else if (o && Ar(o.data) && Ar(o.size)) this._data = o.data, this._size = o.size, on(this._data, this._size), this._datatype = i || o.datatype;
    else if (Ar(o)) this._data = l(o), this._size = vr(this._data), on(this._data, this._size), this._datatype = i;
    else {
      if (o) throw new TypeError("Unsupported type of data (" + Qr(o) + ")");
      this._data = [], this._size = [0], this._datatype = i;
    }
  }
  t.prototype = new e(), t.prototype.createDenseMatrix = function(o, i) {
    return new t(o, i);
  }, Object.defineProperty(t, "name", { value: "DenseMatrix" }), t.prototype.constructor = t, t.prototype.type = "DenseMatrix", t.prototype.isDenseMatrix = true, t.prototype.getDataType = function() {
    return gt(this._data, Qr);
  }, t.prototype.storage = function() {
    return "dense";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(o, i) {
    return new t(o, i);
  }, t.prototype.subset = function(o, i, p) {
    switch (arguments.length) {
      case 1:
        return a(this, o);
      case 2:
      case 3:
        return u(this, o, i, p);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, t.prototype.get = function(o) {
    return Qa(this._data, o);
  }, t.prototype.set = function(o, i, p) {
    if (!Ar(o)) throw new TypeError("Array expected");
    if (o.length < this._size.length) throw new lr(o.length, this._size.length, "<");
    var v, h, s, m = o.map(function(E) {
      return E + 1;
    });
    c(this, m, p);
    var d = this._data;
    for (v = 0, h = o.length - 1; v < h; v++) s = o[v], yr(s, d.length), d = d[s];
    return s = o[o.length - 1], yr(s, d.length), d[s] = i, this;
  };
  function a(o, i) {
    if (!ht(i)) throw new TypeError("Invalid index");
    var p = i.isScalar();
    if (p) return o.get(i.min());
    var v = i.size();
    if (v.length !== o._size.length) throw new lr(v.length, o._size.length);
    for (var h = i.min(), s = i.max(), m = 0, d = o._size.length; m < d; m++) yr(h[m], o._size[m]), yr(s[m], o._size[m]);
    return new t(n(o._data, i, v.length, 0), o._datatype);
  }
  function n(o, i, p, v) {
    var h = v === p - 1, s = i.dimension(v);
    return h ? s.map(function(m) {
      return yr(m, o.length), o[m];
    }).valueOf() : s.map(function(m) {
      yr(m, o.length);
      var d = o[m];
      return n(d, i, p, v + 1);
    }).valueOf();
  }
  function u(o, i, p, v) {
    if (!i || i.isIndex !== true) throw new TypeError("Invalid index");
    var h = i.size(), s = i.isScalar(), m;
    if (dr(p) ? (m = p.size(), p = p.valueOf()) : m = vr(p), s) {
      if (m.length !== 0) throw new TypeError("Scalar expected");
      o.set(i.min(), p, v);
    } else {
      if (!pe(m, h)) try {
        m.length === 0 ? p = Nt([p], h) : p = Nt(p, h), m = vr(p);
      } catch {
      }
      if (h.length < o._size.length) throw new lr(h.length, o._size.length, "<");
      if (m.length < h.length) {
        for (var d = 0, E = 0; h[d] === 1 && m[d] === 1; ) d++;
        for (; h[d] === 1; ) E++, d++;
        p = Ia(p, h.length, E, m);
      }
      if (!pe(h, m)) throw new lr(h, m, ">");
      var A = i.max().map(function(g) {
        return g + 1;
      });
      c(o, A, v);
      var b = h.length, F = 0;
      f(o._data, i, p, b, F);
    }
    return o;
  }
  function f(o, i, p, v, h) {
    var s = h === v - 1, m = i.dimension(h);
    s ? m.forEach(function(d, E) {
      yr(d), o[d] = p[E[0]];
    }) : m.forEach(function(d, E) {
      yr(d), f(o[d], i, p[E[0]], v, h + 1);
    });
  }
  t.prototype.resize = function(o, i, p) {
    if (!qe(o)) throw new TypeError("Array or Matrix expected");
    var v = o.valueOf().map((s) => Array.isArray(s) && s.length === 1 ? s[0] : s), h = p ? this.clone() : this;
    return D(h, v, i);
  };
  function D(o, i, p) {
    if (i.length === 0) {
      for (var v = o._data; Ar(v); ) v = v[0];
      return v;
    }
    return o._size = i.slice(0), o._data = ut(o._data, o._size, p), o;
  }
  t.prototype.reshape = function(o, i) {
    var p = i ? this.clone() : this;
    p._data = Ut(p._data, o);
    var v = p._size.reduce((h, s) => h * s);
    return p._size = Rt(o, v), p;
  };
  function c(o, i, p) {
    for (var v = o._size.slice(0), h = false; v.length < i.length; ) v.push(0), h = true;
    for (var s = 0, m = i.length; s < m; s++) i[s] > v[s] && (v[s] = i[s], h = true);
    h && D(o, v, p);
  }
  t.prototype.clone = function() {
    var o = new t({ data: pr(this._data), size: pr(this._size), datatype: this._datatype });
    return o;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype._forEach = function(o) {
    var i = o.length === 2, p = this._size.length - 1;
    if (p < 0) return;
    if (i) {
      m(this._data);
      return;
    }
    if (p === 0) {
      for (var v = 0; v < this._data.length; v++) o(this._data, v, [v]);
      return;
    }
    var h = new Array(p + 1);
    s(this._data);
    function s(d) {
      var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (E < p) for (var A = 0; A < d.length; A++) h[E] = A, s(d[A], E + 1);
      else for (var b = 0; b < d.length; b++) h[E] = b, o(d, b, h.slice());
    }
    function m(d) {
      var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (E < p) for (var A = 0; A < d.length; A++) m(d[A], E + 1);
      else for (var b = 0; b < d.length; b++) o(d, b);
    }
  }, t.prototype.map = function(o) {
    var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, p = this, v = new t(p), h = it(o, p._data, "map", i), s = i || h.isUnary ? (m, d) => {
      m[d] = h.fn(m[d]);
    } : (m, d, E) => {
      m[d] = h.fn(m[d], E, p);
    };
    return v._forEach(s), v;
  }, t.prototype.forEach = function(o) {
    var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, p = this, v = it(o, p._data, "map", i), h = i || v.isUnary ? (s, m) => {
      v.fn(s[m]);
    } : (s, m, d) => {
      v.fn(s[m], d, p);
    };
    p._forEach(h);
  }, t.prototype[Symbol.iterator] = function* () {
    var o = this._size.length - 1;
    if (!(o < 0)) {
      if (o === 0) {
        for (var i = 0; i < this._data.length; i++) yield { value: this._data[i], index: [i] };
        return;
      }
      var p = [], v = function* (s, m) {
        if (m < o) for (var d = 0; d < s.length; d++) p[m] = d, yield* v(s[d], m + 1);
        else for (var E = 0; E < s.length; E++) p[m] = E, yield { value: s[E], index: p.slice() };
      };
      yield* v(this._data, 0);
    }
  }, t.prototype.rows = function() {
    var o = [], i = this.size();
    if (i.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    var p = this._data;
    for (var v of p) o.push(new t([v], this._datatype));
    return o;
  }, t.prototype.columns = function() {
    var o = this, i = [], p = this.size();
    if (p.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var v = this._data, h = function(d) {
      var E = v.map((A) => [A[d]]);
      i.push(new t(E, o._datatype));
    }, s = 0; s < p[1]; s++) h(s);
    return i;
  }, t.prototype.toArray = function() {
    return pr(this._data);
  }, t.prototype.valueOf = function() {
    return this._data;
  }, t.prototype.format = function(o) {
    return br(this._data, o);
  }, t.prototype.toString = function() {
    return br(this._data);
  }, t.prototype.toJSON = function() {
    return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, t.prototype.diagonal = function(o) {
    if (o) {
      if (Cr(o) && (o = o.toNumber()), !Fr(o) || !Er(o)) throw new TypeError("The parameter k must be an integer number");
    } else o = 0;
    for (var i = o > 0 ? o : 0, p = o < 0 ? -o : 0, v = this._size[0], h = this._size[1], s = Math.min(v - p, h - i), m = [], d = 0; d < s; d++) m[d] = this._data[d + p][d + i];
    return new t({ data: m, size: [s], datatype: this._datatype });
  }, t.diagonal = function(o, i, p, v) {
    if (!Ar(o)) throw new TypeError("Array expected, size parameter");
    if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (o = o.map(function(C) {
      if (Cr(C) && (C = C.toNumber()), !Fr(C) || !Er(C) || C < 1) throw new Error("Size values must be positive integers");
      return C;
    }), p) {
      if (Cr(p) && (p = p.toNumber()), !Fr(p) || !Er(p)) throw new TypeError("The parameter k must be an integer number");
    } else p = 0;
    var h = p > 0 ? p : 0, s = p < 0 ? -p : 0, m = o[0], d = o[1], E = Math.min(m - s, d - h), A;
    if (Ar(i)) {
      if (i.length !== E) throw new Error("Invalid value array length");
      A = function(w) {
        return i[w];
      };
    } else if (dr(i)) {
      var b = i.size();
      if (b.length !== 1 || b[0] !== E) throw new Error("Invalid matrix length");
      A = function(w) {
        return i.get([w]);
      };
    } else A = function() {
      return i;
    };
    v || (v = Cr(A(0)) ? A(0).mul(0) : 0);
    var F = [];
    if (o.length > 0) {
      F = ut(F, o, v);
      for (var g = 0; g < E; g++) F[g + s][g + h] = A(g);
    }
    return new t({ data: F, size: [m, d] });
  }, t.fromJSON = function(o) {
    return new t(o);
  }, t.prototype.swapRows = function(o, i) {
    if (!Fr(o) || !Er(o) || !Fr(i) || !Er(i)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return yr(o, this._size[0]), yr(i, this._size[0]), t._swapRows(o, i, this._data), this;
  }, t._swapRows = function(o, i, p) {
    var v = p[o];
    p[o] = p[i], p[i] = v;
  };
  function l(o) {
    return dr(o) ? l(o.valueOf()) : Ar(o) ? o.map(l) : o;
  }
  return t;
}, { isClass: true });
function Xi(r) {
  var e = r.length, t = r[0].length, a, n, u = [];
  for (n = 0; n < t; n++) {
    var f = [];
    for (a = 0; a < e; a++) f.push(r[a][n]);
    u.push(f);
  }
  return u;
}
function Ji(r) {
  for (var e = 0; e < r.length; e++) if (qe(r[e])) return true;
  return false;
}
function Gi(r, e) {
  dr(r) ? r.forEach((t) => e(t), false, true) : Ii(r, e, true);
}
function Vr(r, e, t) {
  if (!t) return dr(r) ? r.map((n) => e(n), false, true) : fn(r, e, true);
  var a = (n) => n === 0 ? n : e(n);
  return dr(r) ? r.map((n) => a(n), false, true) : fn(r, a, true);
}
function Yi(r, e, t) {
  var a = Array.isArray(r) ? vr(r) : r.size();
  if (e < 0 || e >= a.length) throw new he(e, a.length);
  return dr(r) ? r.create(ot(r.valueOf(), e, t), r.datatype()) : ot(r, e, t);
}
function ot(r, e, t) {
  var a, n, u, f;
  if (e <= 0) if (Array.isArray(r[0])) {
    for (f = Xi(r), n = [], a = 0; a < f.length; a++) n[a] = ot(f[a], e - 1, t);
    return n;
  } else {
    for (u = r[0], a = 1; a < r.length; a++) u = t(u, r[a]);
    return u;
  }
  else {
    for (n = [], a = 0; a < r.length; a++) n[a] = ot(r[a], e - 1, t);
    return n;
  }
}
var ln = "isInteger", Ki = ["typed"], Wi = Y(ln, Ki, (r) => {
  var { typed: e } = r;
  return e(ln, { number: Er, BigNumber: function(a) {
    return a.isInt();
  }, bigint: function(a) {
    return true;
  }, Fraction: function(a) {
    return a.d === 1n;
  }, "Array | Matrix": e.referToSelf((t) => (a) => Vr(a, t)) });
}), Pt = "number", yt = "number, number";
function Va(r) {
  return Math.abs(r);
}
Va.signature = Pt;
function Za(r, e) {
  return r + e;
}
Za.signature = yt;
function Xa(r, e) {
  return r - e;
}
Xa.signature = yt;
function Ja(r, e) {
  return r * e;
}
Ja.signature = yt;
function Ga(r) {
  return -r;
}
Ga.signature = Pt;
function zt(r) {
  return ui(r);
}
zt.signature = Pt;
function Ya(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
Ya.signature = yt;
var Hi = "number";
function Ka(r) {
  return r > 0;
}
Ka.signature = Hi;
function Be(r, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (t <= 0) throw new Error("Relative tolerance must be greater than 0");
  if (a < 0) throw new Error("Absolute tolerance must be at least 0");
  return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(t), a));
}
var vn = "isPositive", ki = ["typed", "config"], ji = Y(vn, ki, (r) => {
  var { typed: e, config: t } = r;
  return e(vn, { number: (a) => fe(a, 0, t.relTol, t.absTol) ? false : Ka(a), BigNumber: (a) => Be(a, new a.constructor(0), t.relTol, t.absTol) ? false : !a.isNeg() && !a.isZero() && !a.isNaN(), bigint: (a) => a > 0n, Fraction: (a) => a.s > 0n && a.n > 0n, Unit: e.referToSelf((a) => (n) => e.find(a, n.valueType())(n.value)), "Array | Matrix": e.referToSelf((a) => (n) => Vr(n, a)) });
}), Dn = "isZero", ro = ["typed", "equalScalar"], eo = Y(Dn, ro, (r) => {
  var { typed: e, equalScalar: t } = r;
  return e(Dn, { "number | BigNumber | Complex | Fraction": (a) => t(a, 0), bigint: (a) => a === 0n, Unit: e.referToSelf((a) => (n) => e.find(a, n.valueType())(n.value)), "Array | Matrix": e.referToSelf((a) => (n) => Vr(n, a)) });
});
function to(r, e, t, a) {
  return fe(r.re, e.re, t, a) && fe(r.im, e.im, t, a);
}
var Pe = Y("compareUnits", ["typed"], (r) => {
  var { typed: e } = r;
  return { "Unit, Unit": e.referToSelf((t) => (a, n) => {
    if (!a.equalBase(n)) throw new Error("Cannot compare units with different base");
    return e.find(t, [a.valueType(), n.valueType()])(a.value, n.value);
  }) };
}), st = "equalScalar", no = ["typed", "config"], ao = Y(st, no, (r) => {
  var { typed: e, config: t } = r, a = Pe({ typed: e });
  return e(st, { "boolean, boolean": function(u, f) {
    return u === f;
  }, "number, number": function(u, f) {
    return fe(u, f, t.relTol, t.absTol);
  }, "BigNumber, BigNumber": function(u, f) {
    return u.eq(f) || Be(u, f, t.relTol, t.absTol);
  }, "bigint, bigint": function(u, f) {
    return u === f;
  }, "Fraction, Fraction": function(u, f) {
    return u.equals(f);
  }, "Complex, Complex": function(u, f) {
    return to(u, f, t.relTol, t.absTol);
  } }, a);
});
Y(st, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(st, { "number, number": function(n, u) {
    return fe(n, u, t.relTol, t.absTol);
  } });
});
var uo = "SparseMatrix", io = ["typed", "equalScalar", "Matrix"], oo = Y(uo, io, (r) => {
  var { typed: e, equalScalar: t, Matrix: a } = r;
  function n(s, m) {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    if (m && !Kr(m)) throw new Error("Invalid datatype: " + m);
    if (dr(s)) u(this, s, m);
    else if (s && Ar(s.index) && Ar(s.ptr) && Ar(s.size)) this._values = s.values, this._index = s.index, this._ptr = s.ptr, this._size = s.size, this._datatype = m || s.datatype;
    else if (Ar(s)) f(this, s, m);
    else {
      if (s) throw new TypeError("Unsupported type of data (" + Qr(s) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = m;
    }
  }
  function u(s, m, d) {
    m.type === "SparseMatrix" ? (s._values = m._values ? pr(m._values) : void 0, s._index = pr(m._index), s._ptr = pr(m._ptr), s._size = pr(m._size), s._datatype = d || m._datatype) : f(s, m.valueOf(), d || m._datatype);
  }
  function f(s, m, d) {
    s._values = [], s._index = [], s._ptr = [], s._datatype = d;
    var E = m.length, A = 0, b = t, F = 0;
    if (Kr(d) && (b = e.find(t, [d, d]) || t, F = e.convert(0, d)), E > 0) {
      var g = 0;
      do {
        s._ptr.push(s._index.length);
        for (var C = 0; C < E; C++) {
          var w = m[C];
          if (Ar(w)) {
            if (g === 0 && A < w.length && (A = w.length), g < w.length) {
              var y = w[g];
              b(y, F) || (s._values.push(y), s._index.push(C));
            }
          } else g === 0 && A < 1 && (A = 1), b(w, F) || (s._values.push(w), s._index.push(C));
        }
        g++;
      } while (g < A);
    }
    s._ptr.push(s._index.length), s._size = [E, A];
  }
  n.prototype = new a(), n.prototype.createSparseMatrix = function(s, m) {
    return new n(s, m);
  }, Object.defineProperty(n, "name", { value: "SparseMatrix" }), n.prototype.constructor = n, n.prototype.type = "SparseMatrix", n.prototype.isSparseMatrix = true, n.prototype.getDataType = function() {
    return gt(this._values, Qr);
  }, n.prototype.storage = function() {
    return "sparse";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(s, m) {
    return new n(s, m);
  }, n.prototype.density = function() {
    var s = this._size[0], m = this._size[1];
    return s !== 0 && m !== 0 ? this._index.length / (s * m) : 0;
  }, n.prototype.subset = function(s, m, d) {
    if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return D(this, s);
      case 2:
      case 3:
        return c(this, s, m, d);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function D(s, m) {
    if (!ht(m)) throw new TypeError("Invalid index");
    var d = m.isScalar();
    if (d) return s.get(m.min());
    var E = m.size();
    if (E.length !== s._size.length) throw new lr(E.length, s._size.length);
    var A, b, F, g, C = m.min(), w = m.max();
    for (A = 0, b = s._size.length; A < b; A++) yr(C[A], s._size[A]), yr(w[A], s._size[A]);
    var y = s._values, _ = s._index, x = s._ptr, B = m.dimension(0), T = m.dimension(1), N = [], U = [];
    B.forEach(function(S, q) {
      U[S] = q[0], N[S] = true;
    });
    var z = y ? [] : void 0, O = [], M = [];
    return T.forEach(function(S) {
      for (M.push(O.length), F = x[S], g = x[S + 1]; F < g; F++) A = _[F], N[A] === true && (O.push(U[A]), z && z.push(y[F]));
    }), M.push(O.length), new n({ values: z, index: O, ptr: M, size: E, datatype: s._datatype });
  }
  function c(s, m, d, E) {
    if (!m || m.isIndex !== true) throw new TypeError("Invalid index");
    var A = m.size(), b = m.isScalar(), F;
    if (dr(d) ? (F = d.size(), d = d.toArray()) : F = vr(d), b) {
      if (F.length !== 0) throw new TypeError("Scalar expected");
      s.set(m.min(), d, E);
    } else {
      if (A.length !== 1 && A.length !== 2) throw new lr(A.length, s._size.length, "<");
      if (F.length < A.length) {
        for (var g = 0, C = 0; A[g] === 1 && F[g] === 1; ) g++;
        for (; A[g] === 1; ) C++, g++;
        d = Ia(d, A.length, C, F);
      }
      if (!pe(A, F)) throw new lr(A, F, ">");
      if (A.length === 1) {
        var w = m.dimension(0);
        w.forEach(function(x, B) {
          yr(x), s.set([x, 0], d[B[0]], E);
        });
      } else {
        var y = m.dimension(0), _ = m.dimension(1);
        y.forEach(function(x, B) {
          yr(x), _.forEach(function(T, N) {
            yr(T), s.set([x, T], d[B[0]][N[0]], E);
          });
        });
      }
    }
    return s;
  }
  n.prototype.get = function(s) {
    if (!Ar(s)) throw new TypeError("Array expected");
    if (s.length !== this._size.length) throw new lr(s.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
    var m = s[0], d = s[1];
    yr(m, this._size[0]), yr(d, this._size[1]);
    var E = l(m, this._ptr[d], this._ptr[d + 1], this._index);
    return E < this._ptr[d + 1] && this._index[E] === m ? this._values[E] : 0;
  }, n.prototype.set = function(s, m, d) {
    if (!Ar(s)) throw new TypeError("Array expected");
    if (s.length !== this._size.length) throw new lr(s.length, this._size.length);
    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
    var E = s[0], A = s[1], b = this._size[0], F = this._size[1], g = t, C = 0;
    Kr(this._datatype) && (g = e.find(t, [this._datatype, this._datatype]) || t, C = e.convert(0, this._datatype)), (E > b - 1 || A > F - 1) && (p(this, Math.max(E + 1, b), Math.max(A + 1, F), d), b = this._size[0], F = this._size[1]), yr(E, b), yr(A, F);
    var w = l(E, this._ptr[A], this._ptr[A + 1], this._index);
    return w < this._ptr[A + 1] && this._index[w] === E ? g(m, C) ? o(w, A, this._values, this._index, this._ptr) : this._values[w] = m : g(m, C) || i(w, E, A, m, this._values, this._index, this._ptr), this;
  };
  function l(s, m, d, E) {
    if (d - m === 0) return d;
    for (var A = m; A < d; A++) if (E[A] === s) return A;
    return m;
  }
  function o(s, m, d, E, A) {
    d.splice(s, 1), E.splice(s, 1);
    for (var b = m + 1; b < A.length; b++) A[b]--;
  }
  function i(s, m, d, E, A, b, F) {
    A.splice(s, 0, E), b.splice(s, 0, m);
    for (var g = d + 1; g < F.length; g++) F[g]++;
  }
  n.prototype.resize = function(s, m, d) {
    if (!qe(s)) throw new TypeError("Array or Matrix expected");
    var E = s.valueOf().map((b) => Array.isArray(b) && b.length === 1 ? b[0] : b);
    if (E.length !== 2) throw new Error("Only two dimensions matrix are supported");
    E.forEach(function(b) {
      if (!Fr(b) || !Er(b) || b < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + br(E) + ")");
    });
    var A = d ? this.clone() : this;
    return p(A, E[0], E[1], m);
  };
  function p(s, m, d, E) {
    var A = E || 0, b = t, F = 0;
    Kr(s._datatype) && (b = e.find(t, [s._datatype, s._datatype]) || t, F = e.convert(0, s._datatype), A = e.convert(A, s._datatype));
    var g = !b(A, F), C = s._size[0], w = s._size[1], y, _, x;
    if (d > w) {
      for (_ = w; _ < d; _++) if (s._ptr[_] = s._values.length, g) for (y = 0; y < C; y++) s._values.push(A), s._index.push(y);
      s._ptr[d] = s._values.length;
    } else d < w && (s._ptr.splice(d + 1, w - d), s._values.splice(s._ptr[d], s._values.length), s._index.splice(s._ptr[d], s._index.length));
    if (w = d, m > C) {
      if (g) {
        var B = 0;
        for (_ = 0; _ < w; _++) {
          s._ptr[_] = s._ptr[_] + B, x = s._ptr[_ + 1] + B;
          var T = 0;
          for (y = C; y < m; y++, T++) s._values.splice(x + T, 0, A), s._index.splice(x + T, 0, y), B++;
        }
        s._ptr[w] = s._values.length;
      }
    } else if (m < C) {
      var N = 0;
      for (_ = 0; _ < w; _++) {
        s._ptr[_] = s._ptr[_] - N;
        var U = s._ptr[_], z = s._ptr[_ + 1] - N;
        for (x = U; x < z; x++) y = s._index[x], y > m - 1 && (s._values.splice(x, 1), s._index.splice(x, 1), N++);
      }
      s._ptr[_] = s._values.length;
    }
    return s._size[0] = m, s._size[1] = d, s;
  }
  n.prototype.reshape = function(s, m) {
    if (!Ar(s)) throw new TypeError("Array expected");
    if (s.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
    s.forEach(function(S) {
      if (!Fr(S) || !Er(S) || S <= -2 || S === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + br(s) + ")");
    });
    var d = this._size[0] * this._size[1];
    s = Rt(s, d);
    var E = s[0] * s[1];
    if (d !== E) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var A = m ? this.clone() : this;
    if (this._size[0] === s[0] && this._size[1] === s[1]) return A;
    for (var b = [], F = 0; F < A._ptr.length; F++) for (var g = 0; g < A._ptr[F + 1] - A._ptr[F]; g++) b.push(F);
    for (var C = A._values.slice(), w = A._index.slice(), y = 0; y < A._index.length; y++) {
      var _ = w[y], x = b[y], B = _ * A._size[1] + x;
      b[y] = B % s[1], w[y] = Math.floor(B / s[1]);
    }
    A._values.length = 0, A._index.length = 0, A._ptr.length = s[1] + 1, A._size = s.slice();
    for (var T = 0; T < A._ptr.length; T++) A._ptr[T] = 0;
    for (var N = 0; N < C.length; N++) {
      var U = w[N], z = b[N], O = C[N], M = l(U, A._ptr[z], A._ptr[z + 1], A._index);
      i(M, U, z, O, A._values, A._index, A._ptr);
    }
    return A;
  }, n.prototype.clone = function() {
    var s = new n({ values: this._values ? pr(this._values) : void 0, index: pr(this._index), ptr: pr(this._ptr), size: pr(this._size), datatype: this._datatype });
    return s;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype.map = function(s, m) {
    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
    var d = this, E = this._size[0], A = this._size[1], b = it(s, d, "map"), F = function(C, w, y) {
      return b.fn(C, [w, y], d);
    };
    return v(this, 0, E - 1, 0, A - 1, F, m);
  };
  function v(s, m, d, E, A, b, F) {
    var g = [], C = [], w = [], y = t, _ = 0;
    Kr(s._datatype) && (y = e.find(t, [s._datatype, s._datatype]) || t, _ = e.convert(0, s._datatype));
    for (var x = function($, I, G) {
      var V = b($, I, G);
      y(V, _) || (g.push(V), C.push(I));
    }, B = E; B <= A; B++) {
      w.push(g.length);
      var T = s._ptr[B], N = s._ptr[B + 1];
      if (F) for (var U = T; U < N; U++) {
        var z = s._index[U];
        z >= m && z <= d && x(s._values[U], z - m, B - E);
      }
      else {
        for (var O = {}, M = T; M < N; M++) {
          var S = s._index[M];
          O[S] = s._values[M];
        }
        for (var q = m; q <= d; q++) {
          var Q = q in O ? O[q] : 0;
          x(Q, q - m, B - E);
        }
      }
    }
    return w.push(g.length), new n({ values: g, index: C, ptr: w, size: [d - m + 1, A - E + 1] });
  }
  n.prototype.forEach = function(s, m) {
    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var d = this, E = this._size[0], A = this._size[1], b = it(s, d, "forEach"), F = 0; F < A; F++) {
      var g = this._ptr[F], C = this._ptr[F + 1];
      if (m) for (var w = g; w < C; w++) {
        var y = this._index[w];
        b.fn(this._values[w], [y, F], d);
      }
      else {
        for (var _ = {}, x = g; x < C; x++) {
          var B = this._index[x];
          _[B] = this._values[x];
        }
        for (var T = 0; T < E; T++) {
          var N = T in _ ? _[T] : 0;
          b.fn(N, [T, F], d);
        }
      }
    }
  }, n.prototype[Symbol.iterator] = function* () {
    if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
    for (var s = this._size[1], m = 0; m < s; m++) for (var d = this._ptr[m], E = this._ptr[m + 1], A = d; A < E; A++) {
      var b = this._index[A];
      yield { value: this._values[A], index: [b, m] };
    }
  }, n.prototype.toArray = function() {
    return h(this._values, this._index, this._ptr, this._size, true);
  }, n.prototype.valueOf = function() {
    return h(this._values, this._index, this._ptr, this._size, false);
  };
  function h(s, m, d, E, A) {
    var b = E[0], F = E[1], g = [], C, w;
    for (C = 0; C < b; C++) for (g[C] = [], w = 0; w < F; w++) g[C][w] = 0;
    for (w = 0; w < F; w++) for (var y = d[w], _ = d[w + 1], x = y; x < _; x++) C = m[x], g[C][w] = s ? A ? pr(s[x]) : s[x] : 1;
    return g;
  }
  return n.prototype.format = function(s) {
    for (var m = this._size[0], d = this._size[1], E = this.density(), A = "Sparse Matrix [" + br(m, s) + " x " + br(d, s) + "] density: " + br(E, s) + `
`, b = 0; b < d; b++) for (var F = this._ptr[b], g = this._ptr[b + 1], C = F; C < g; C++) {
      var w = this._index[C];
      A += `
    (` + br(w, s) + ", " + br(b, s) + ") ==> " + (this._values ? br(this._values[C], s) : "X");
    }
    return A;
  }, n.prototype.toString = function() {
    return br(this.toArray());
  }, n.prototype.toJSON = function() {
    return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
  }, n.prototype.diagonal = function(s) {
    if (s) {
      if (Cr(s) && (s = s.toNumber()), !Fr(s) || !Er(s)) throw new TypeError("The parameter k must be an integer number");
    } else s = 0;
    var m = s > 0 ? s : 0, d = s < 0 ? -s : 0, E = this._size[0], A = this._size[1], b = Math.min(E - d, A - m), F = [], g = [], C = [];
    C[0] = 0;
    for (var w = m; w < A && F.length < b; w++) for (var y = this._ptr[w], _ = this._ptr[w + 1], x = y; x < _; x++) {
      var B = this._index[x];
      if (B === w - m + d) {
        F.push(this._values[x]), g[F.length - 1] = B - d;
        break;
      }
    }
    return C.push(F.length), new n({ values: F, index: g, ptr: C, size: [b, 1] });
  }, n.fromJSON = function(s) {
    return new n(s);
  }, n.diagonal = function(s, m, d, E, A) {
    if (!Ar(s)) throw new TypeError("Array expected, size parameter");
    if (s.length !== 2) throw new Error("Only two dimensions matrix are supported");
    if (s = s.map(function(S) {
      if (Cr(S) && (S = S.toNumber()), !Fr(S) || !Er(S) || S < 1) throw new Error("Size values must be positive integers");
      return S;
    }), d) {
      if (Cr(d) && (d = d.toNumber()), !Fr(d) || !Er(d)) throw new TypeError("The parameter k must be an integer number");
    } else d = 0;
    var b = t, F = 0;
    Kr(A) && (b = e.find(t, [A, A]) || t, F = e.convert(0, A));
    var g = d > 0 ? d : 0, C = d < 0 ? -d : 0, w = s[0], y = s[1], _ = Math.min(w - C, y - g), x;
    if (Ar(m)) {
      if (m.length !== _) throw new Error("Invalid value array length");
      x = function(q) {
        return m[q];
      };
    } else if (dr(m)) {
      var B = m.size();
      if (B.length !== 1 || B[0] !== _) throw new Error("Invalid matrix length");
      x = function(q) {
        return m.get([q]);
      };
    } else x = function() {
      return m;
    };
    for (var T = [], N = [], U = [], z = 0; z < y; z++) {
      U.push(T.length);
      var O = z - g;
      if (O >= 0 && O < _) {
        var M = x(O);
        b(M, F) || (N.push(O + C), T.push(M));
      }
    }
    return U.push(T.length), new n({ values: T, index: N, ptr: U, size: [w, y] });
  }, n.prototype.swapRows = function(s, m) {
    if (!Fr(s) || !Er(s) || !Fr(m) || !Er(m)) throw new Error("Row index must be positive integers");
    if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
    return yr(s, this._size[0]), yr(m, this._size[0]), n._swapRows(s, m, this._size[1], this._values, this._index, this._ptr), this;
  }, n._forEachRow = function(s, m, d, E, A) {
    for (var b = E[s], F = E[s + 1], g = b; g < F; g++) A(d[g], m[g]);
  }, n._swapRows = function(s, m, d, E, A, b) {
    for (var F = 0; F < d; F++) {
      var g = b[F], C = b[F + 1], w = l(s, g, C, A), y = l(m, g, C, A);
      if (w < C && y < C && A[w] === s && A[y] === m) {
        if (E) {
          var _ = E[w];
          E[w] = E[y], E[y] = _;
        }
        continue;
      }
      if (w < C && A[w] === s && (y >= C || A[y] !== m)) {
        var x = E ? E[w] : void 0;
        A.splice(y, 0, m), E && E.splice(y, 0, x), A.splice(y <= w ? w + 1 : w, 1), E && E.splice(y <= w ? w + 1 : w, 1);
        continue;
      }
      if (y < C && A[y] === m && (w >= C || A[w] !== s)) {
        var B = E ? E[y] : void 0;
        A.splice(w, 0, s), E && E.splice(w, 0, B), A.splice(w <= y ? y + 1 : y, 1), E && E.splice(w <= y ? y + 1 : y, 1);
      }
    }
  }, n;
}, { isClass: true }), so = "number", fo = ["typed"];
function co(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var t = { "0b": 2, "0o": 8, "0x": 16 }[e[1]], a = e[2], n = e[3];
    return { input: r, radix: t, integerPart: a, fractionalPart: n };
  } else return null;
}
function lo(r) {
  for (var e = parseInt(r.integerPart, r.radix), t = 0, a = 0; a < r.fractionalPart.length; a++) {
    var n = parseInt(r.fractionalPart[a], r.radix);
    t += n / Math.pow(r.radix, a + 1);
  }
  var u = e + t;
  if (isNaN(u)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return u;
}
var vo = Y(so, fo, (r) => {
  var { typed: e } = r, t = e("number", { "": function() {
    return 0;
  }, number: function(n) {
    return n;
  }, string: function(n) {
    if (n === "NaN") return NaN;
    var u = co(n);
    if (u) return lo(u);
    var f = 0, D = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    D && (f = Number(D[2]), n = D[1]);
    var c = Number(n);
    if (isNaN(c)) throw new SyntaxError('String "' + n + '" is not a valid number');
    if (D) {
      if (c > 2 ** f - 1) throw new SyntaxError('String "'.concat(n, '" is out of range'));
      c >= 2 ** (f - 1) && (c = c - 2 ** f);
    }
    return c;
  }, BigNumber: function(n) {
    return n.toNumber();
  }, bigint: function(n) {
    return Number(n);
  }, Fraction: function(n) {
    return n.valueOf();
  }, Unit: e.referToSelf((a) => (n) => {
    var u = n.clone();
    return u.value = a(n.value), u;
  }), null: function(n) {
    return 0;
  }, "Unit, string | Unit": function(n, u) {
    return n.toNumber(u);
  }, "Array | Matrix": e.referToSelf((a) => (n) => Vr(n, a)) });
  return t.fromJSON = function(a) {
    return parseFloat(a.value);
  }, t;
}), Do = "bignumber", po = ["typed", "BigNumber"], ho = Y(Do, po, (r) => {
  var { typed: e, BigNumber: t } = r;
  return e("bignumber", { "": function() {
    return new t(0);
  }, number: function(n) {
    return new t(n + "");
  }, string: function(n) {
    var u = n.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (u) {
      var f = u[2], D = t(u[1]), c = new t(2).pow(Number(f));
      if (D.gt(c.sub(1))) throw new SyntaxError('String "'.concat(n, '" is out of range'));
      var l = new t(2).pow(Number(f) - 1);
      return D.gte(l) ? D.sub(c) : D;
    }
    return new t(n);
  }, BigNumber: function(n) {
    return n;
  }, bigint: function(n) {
    return new t(n.toString());
  }, Unit: e.referToSelf((a) => (n) => {
    var u = n.clone();
    return u.value = a(n.value), u;
  }), Fraction: function(n) {
    return new t(String(n.n)).div(String(n.d)).times(String(n.s));
  }, null: function(n) {
    return new t(0);
  }, "Array | Matrix": e.referToSelf((a) => (n) => Vr(n, a)) });
}), mo = "complex", go = ["typed", "Complex"], yo = Y(mo, go, (r) => {
  var { typed: e, Complex: t } = r;
  return e("complex", { "": function() {
    return t.ZERO;
  }, number: function(n) {
    return new t(n, 0);
  }, "number, number": function(n, u) {
    return new t(n, u);
  }, "BigNumber, BigNumber": function(n, u) {
    return new t(n.toNumber(), u.toNumber());
  }, Fraction: function(n) {
    return new t(n.valueOf(), 0);
  }, Complex: function(n) {
    return n.clone();
  }, string: function(n) {
    return t(n);
  }, null: function(n) {
    return t(0);
  }, Object: function(n) {
    if ("re" in n && "im" in n) return new t(n.re, n.im);
    if ("r" in n && "phi" in n || "abs" in n && "arg" in n) return new t(n);
    throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
  }, "Array | Matrix": e.referToSelf((a) => (n) => Vr(n, a)) });
}), Ao = "fraction", Fo = ["typed", "Fraction"], Eo = Y(Ao, Fo, (r) => {
  var { typed: e, Fraction: t } = r;
  return e("fraction", { number: function(n) {
    if (!isFinite(n) || isNaN(n)) throw new Error(n + " cannot be represented as a fraction");
    return new t(n);
  }, string: function(n) {
    return new t(n);
  }, "number, number": function(n, u) {
    return new t(n, u);
  }, "bigint, bigint": function(n, u) {
    return new t(n, u);
  }, null: function(n) {
    return new t(0);
  }, BigNumber: function(n) {
    return new t(n.toString());
  }, bigint: function(n) {
    return new t(n.toString());
  }, Fraction: function(n) {
    return n;
  }, Unit: e.referToSelf((a) => (n) => {
    var u = n.clone();
    return u.value = a(n.value), u;
  }), Object: function(n) {
    return new t(n);
  }, "Array | Matrix": e.referToSelf((a) => (n) => Vr(n, a)) });
}), pn = "matrix", wo = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], bo = Y(pn, wo, (r) => {
  var { typed: e, Matrix: t, DenseMatrix: a, SparseMatrix: n } = r;
  return e(pn, { "": function() {
    return u([]);
  }, string: function(D) {
    return u([], D);
  }, "string, string": function(D, c) {
    return u([], D, c);
  }, Array: function(D) {
    return u(D);
  }, Matrix: function(D) {
    return u(D, D.storage());
  }, "Array | Matrix, string": u, "Array | Matrix, string, string": u });
  function u(f, D, c) {
    if (D === "dense" || D === "default" || D === void 0) return new a(f, c);
    if (D === "sparse") return new n(f, c);
    throw new TypeError("Unknown matrix type " + JSON.stringify(D) + ".");
  }
}), hn = "matrixFromColumns", Co = ["typed", "matrix", "flatten", "size"], _o = Y(hn, Co, (r) => {
  var { typed: e, matrix: t, flatten: a, size: n } = r;
  return e(hn, { "...Array": function(c) {
    return u(c);
  }, "...Matrix": function(c) {
    return t(u(c.map((l) => l.toArray())));
  } });
  function u(D) {
    if (D.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
    for (var c = f(D[0]), l = [], o = 0; o < c; o++) l[o] = [];
    for (var i of D) {
      var p = f(i);
      if (p !== c) throw new TypeError("The vectors had different length: " + (c | 0) + " \u2260 " + (p | 0));
      for (var v = a(i), h = 0; h < c; h++) l[h].push(v[h]);
    }
    return l;
  }
  function f(D) {
    var c = n(D);
    if (c.length === 1) return c[0];
    if (c.length === 2) {
      if (c[0] === 1) return c[1];
      if (c[1] === 1) return c[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), dn = "unaryMinus", xo = ["typed"], Bo = Y(dn, xo, (r) => {
  var { typed: e } = r;
  return e(dn, { number: Ga, "Complex | BigNumber | Fraction": (t) => t.neg(), bigint: (t) => -t, Unit: e.referToSelf((t) => (a) => {
    var n = a.clone();
    return n.value = e.find(t, n.valueType())(a.value), n;
  }), "Array | Matrix": e.referToSelf((t) => (a) => Vr(a, t, true)) });
}), mn = "abs", So = ["typed"], Mo = Y(mn, So, (r) => {
  var { typed: e } = r;
  return e(mn, { number: Va, "Complex | BigNumber | Fraction | Unit": (t) => t.abs(), bigint: (t) => t < 0n ? -t : t, "Array | Matrix": e.referToSelf((t) => (a) => Vr(a, t, true)) });
}), gn = "addScalar", No = ["typed"], zo = Y(gn, No, (r) => {
  var { typed: e } = r;
  return e(gn, { "number, number": Za, "Complex, Complex": function(a, n) {
    return a.add(n);
  }, "BigNumber, BigNumber": function(a, n) {
    return a.plus(n);
  }, "bigint, bigint": function(a, n) {
    return a + n;
  }, "Fraction, Fraction": function(a, n) {
    return a.add(n);
  }, "Unit, Unit": e.referToSelf((t) => (a, n) => {
    if (a.value === null || a.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
    if (n.value === null || n.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
    if (!a.equalBase(n)) throw new Error("Units do not match");
    var u = a.clone();
    return u.value = e.find(t, [u.valueType(), n.valueType()])(u.value, n.value), u.fixPrefix = false, u;
  }) });
}), yn = "subtractScalar", To = ["typed"], $o = Y(yn, To, (r) => {
  var { typed: e } = r;
  return e(yn, { "number, number": Xa, "Complex, Complex": function(a, n) {
    return a.sub(n);
  }, "BigNumber, BigNumber": function(a, n) {
    return a.minus(n);
  }, "bigint, bigint": function(a, n) {
    return a - n;
  }, "Fraction, Fraction": function(a, n) {
    return a.sub(n);
  }, "Unit, Unit": e.referToSelf((t) => (a, n) => {
    if (a.value === null || a.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
    if (n.value === null || n.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
    if (!a.equalBase(n)) throw new Error("Units do not match");
    var u = a.clone();
    return u.value = e.find(t, [u.valueType(), n.valueType()])(u.value, n.value), u.fixPrefix = false, u;
  }) });
}), Oo = "matAlgo11xS0s", Io = ["typed", "equalScalar"], Wa = Y(Oo, Io, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, u, f, D) {
    var c = n._values, l = n._index, o = n._ptr, i = n._size, p = n._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = i[0], h = i[1], s, m = t, d = 0, E = f;
    typeof p == "string" && (s = p, m = e.find(t, [s, s]), d = e.convert(0, s), u = e.convert(u, s), E = e.find(f, [s, s]));
    for (var A = [], b = [], F = [], g = 0; g < h; g++) {
      F[g] = b.length;
      for (var C = o[g], w = o[g + 1], y = C; y < w; y++) {
        var _ = l[y], x = D ? E(u, c[y]) : E(c[y], u);
        m(x, d) || (b.push(_), A.push(x));
      }
    }
    return F[h] = b.length, n.createSparseMatrix({ values: A, index: b, ptr: F, size: [v, h], datatype: s });
  };
}), qo = "matAlgo12xSfs", Uo = ["typed", "DenseMatrix"], Se = Y(qo, Uo, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(n, u, f, D) {
    var c = n._values, l = n._index, o = n._ptr, i = n._size, p = n._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = i[0], h = i[1], s, m = f;
    typeof p == "string" && (s = p, u = e.convert(u, s), m = e.find(f, [s, s]));
    for (var d = [], E = [], A = [], b = 0; b < h; b++) {
      for (var F = b + 1, g = o[b], C = o[b + 1], w = g; w < C; w++) {
        var y = l[w];
        E[y] = c[w], A[y] = F;
      }
      for (var _ = 0; _ < v; _++) b === 0 && (d[_] = []), A[_] === F ? d[_][b] = D ? m(u, E[_]) : m(E[_], u) : d[_][b] = D ? m(u, 0) : m(0, u);
    }
    return new t({ data: d, size: [v, h], datatype: s });
  };
}), Ro = "matAlgo14xDs", Po = ["typed"], Lt = Y(Ro, Po, (r) => {
  var { typed: e } = r;
  return function(n, u, f, D) {
    var c = n._data, l = n._size, o = n._datatype, i, p = f;
    typeof o == "string" && (i = o, u = e.convert(u, i), p = e.find(f, [i, i]));
    var v = l.length > 0 ? t(p, 0, l, l[0], c, u, D) : [];
    return n.createDenseMatrix({ data: v, size: pr(l), datatype: i });
  };
  function t(a, n, u, f, D, c, l) {
    var o = [];
    if (n === u.length - 1) for (var i = 0; i < f; i++) o[i] = l ? a(c, D[i]) : a(D[i], c);
    else for (var p = 0; p < f; p++) o[p] = t(a, n + 1, u, u[n + 1], D[p], c, l);
    return o;
  }
}), Lo = "matAlgo03xDSf", Qo = ["typed"], Me = Y(Lo, Qo, (r) => {
  var { typed: e } = r;
  return function(a, n, u, f) {
    var D = a._data, c = a._size, l = a._datatype || a.getDataType(), o = n._values, i = n._index, p = n._ptr, v = n._size, h = n._datatype || n._data === void 0 ? n._datatype : n.getDataType();
    if (c.length !== v.length) throw new lr(c.length, v.length);
    if (c[0] !== v[0] || c[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var s = c[0], m = c[1], d, E = 0, A = u;
    typeof l == "string" && l === h && l !== "mixed" && (d = l, E = e.convert(0, d), A = e.find(u, [d, d]));
    for (var b = [], F = 0; F < s; F++) b[F] = [];
    for (var g = [], C = [], w = 0; w < m; w++) {
      for (var y = w + 1, _ = p[w], x = p[w + 1], B = _; B < x; B++) {
        var T = i[B];
        g[T] = f ? A(o[B], D[T][w]) : A(D[T][w], o[B]), C[T] = y;
      }
      for (var N = 0; N < s; N++) C[N] === y ? b[N][w] = g[N] : b[N][w] = f ? A(E, D[N][w]) : A(D[N][w], E);
    }
    return a.createDenseMatrix({ data: b, size: [s, m], datatype: l === a._datatype && h === n._datatype ? d : void 0 });
  };
}), Vo = "matAlgo05xSfSf", Zo = ["typed", "equalScalar"], Xo = Y(Vo, Zo, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, u, f) {
    var D = n._values, c = n._index, l = n._ptr, o = n._size, i = n._datatype || n._data === void 0 ? n._datatype : n.getDataType(), p = u._values, v = u._index, h = u._ptr, s = u._size, m = u._datatype || u._data === void 0 ? u._datatype : u.getDataType();
    if (o.length !== s.length) throw new lr(o.length, s.length);
    if (o[0] !== s[0] || o[1] !== s[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + s + ")");
    var d = o[0], E = o[1], A, b = t, F = 0, g = f;
    typeof i == "string" && i === m && i !== "mixed" && (A = i, b = e.find(t, [A, A]), F = e.convert(0, A), g = e.find(f, [A, A]));
    var C = D && p ? [] : void 0, w = [], y = [], _ = C ? [] : void 0, x = C ? [] : void 0, B = [], T = [], N, U, z, O;
    for (U = 0; U < E; U++) {
      y[U] = w.length;
      var M = U + 1;
      for (z = l[U], O = l[U + 1]; z < O; z++) N = c[z], w.push(N), B[N] = M, _ && (_[N] = D[z]);
      for (z = h[U], O = h[U + 1]; z < O; z++) N = v[z], B[N] !== M && w.push(N), T[N] = M, x && (x[N] = p[z]);
      if (C) for (z = y[U]; z < w.length; ) {
        N = w[z];
        var S = B[N], q = T[N];
        if (S === M || q === M) {
          var Q = S === M ? _[N] : F, R = q === M ? x[N] : F, $ = g(Q, R);
          b($, F) ? w.splice(z, 1) : (C.push($), z++);
        }
      }
    }
    return y[E] = w.length, n.createSparseMatrix({ values: C, index: w, ptr: y, size: [d, E], datatype: i === n._datatype && m === u._datatype ? A : void 0 });
  };
}), Jo = "matAlgo13xDD", Go = ["typed"], Yo = Y(Jo, Go, (r) => {
  var { typed: e } = r;
  return function(n, u, f) {
    var D = n._data, c = n._size, l = n._datatype, o = u._data, i = u._size, p = u._datatype, v = [];
    if (c.length !== i.length) throw new lr(c.length, i.length);
    for (var h = 0; h < c.length; h++) {
      if (c[h] !== i[h]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + i + ")");
      v[h] = c[h];
    }
    var s, m = f;
    typeof l == "string" && l === p && (s = l, m = e.find(f, [s, s]));
    var d = v.length > 0 ? t(m, 0, v, v[0], D, o) : [];
    return n.createDenseMatrix({ data: d, size: v, datatype: s });
  };
  function t(a, n, u, f, D, c) {
    var l = [];
    if (n === u.length - 1) for (var o = 0; o < f; o++) l[o] = a(D[o], c[o]);
    else for (var i = 0; i < f; i++) l[i] = t(a, n + 1, u, u[n + 1], D[i], c[i]);
    return l;
  }
});
function Tr(r, e) {
  if (pe(r.size(), e.size())) return [r, e];
  var t = Pa(r.size(), e.size());
  return [r, e].map((a) => Ko(a, t));
}
function Ko(r, e) {
  return pe(r.size(), e) ? r : r.create(Nt(r.valueOf(), e), r.datatype());
}
var Wo = "matrixAlgorithmSuite", Ho = ["typed", "matrix"], Fe = Y(Wo, Ho, (r) => {
  var { typed: e, matrix: t } = r, a = Yo({ typed: e }), n = Lt({ typed: e });
  return function(f) {
    var D = f.elop, c = f.SD || f.DS, l;
    D ? (l = { "DenseMatrix, DenseMatrix": (v, h) => a(...Tr(v, h), D), "Array, Array": (v, h) => a(...Tr(t(v), t(h)), D).valueOf(), "Array, DenseMatrix": (v, h) => a(...Tr(t(v), h), D), "DenseMatrix, Array": (v, h) => a(...Tr(v, t(h)), D) }, f.SS && (l["SparseMatrix, SparseMatrix"] = (v, h) => f.SS(...Tr(v, h), D, false)), f.DS && (l["DenseMatrix, SparseMatrix"] = (v, h) => f.DS(...Tr(v, h), D, false), l["Array, SparseMatrix"] = (v, h) => f.DS(...Tr(t(v), h), D, false)), c && (l["SparseMatrix, DenseMatrix"] = (v, h) => c(...Tr(h, v), D, true), l["SparseMatrix, Array"] = (v, h) => c(...Tr(t(h), v), D, true))) : (l = { "DenseMatrix, DenseMatrix": e.referToSelf((v) => (h, s) => a(...Tr(h, s), v)), "Array, Array": e.referToSelf((v) => (h, s) => a(...Tr(t(h), t(s)), v).valueOf()), "Array, DenseMatrix": e.referToSelf((v) => (h, s) => a(...Tr(t(h), s), v)), "DenseMatrix, Array": e.referToSelf((v) => (h, s) => a(...Tr(h, t(s)), v)) }, f.SS && (l["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (h, s) => f.SS(...Tr(h, s), v, false))), f.DS && (l["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (h, s) => f.DS(...Tr(h, s), v, false)), l["Array, SparseMatrix"] = e.referToSelf((v) => (h, s) => f.DS(...Tr(t(h), s), v, false))), c && (l["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (h, s) => c(...Tr(s, h), v, true)), l["SparseMatrix, Array"] = e.referToSelf((v) => (h, s) => c(...Tr(t(s), h), v, true))));
    var o = f.scalar || "any", i = f.Ds || f.Ss;
    i && (D ? (l["DenseMatrix," + o] = (v, h) => n(v, h, D, false), l[o + ", DenseMatrix"] = (v, h) => n(h, v, D, true), l["Array," + o] = (v, h) => n(t(v), h, D, false).valueOf(), l[o + ", Array"] = (v, h) => n(t(h), v, D, true).valueOf()) : (l["DenseMatrix," + o] = e.referToSelf((v) => (h, s) => n(h, s, v, false)), l[o + ", DenseMatrix"] = e.referToSelf((v) => (h, s) => n(s, h, v, true)), l["Array," + o] = e.referToSelf((v) => (h, s) => n(t(h), s, v, false).valueOf()), l[o + ", Array"] = e.referToSelf((v) => (h, s) => n(t(s), h, v, true).valueOf())));
    var p = f.sS !== void 0 ? f.sS : f.Ss;
    return D ? (f.Ss && (l["SparseMatrix," + o] = (v, h) => f.Ss(v, h, D, false)), p && (l[o + ", SparseMatrix"] = (v, h) => p(h, v, D, true))) : (f.Ss && (l["SparseMatrix," + o] = e.referToSelf((v) => (h, s) => f.Ss(h, s, v, false))), p && (l[o + ", SparseMatrix"] = e.referToSelf((v) => (h, s) => p(s, h, v, true)))), D && D.signatures && Ba(l, D.signatures), l;
  };
}), ko = "matAlgo01xDSid", jo = ["typed"], Ha = Y(ko, jo, (r) => {
  var { typed: e } = r;
  return function(a, n, u, f) {
    var D = a._data, c = a._size, l = a._datatype || a.getDataType(), o = n._values, i = n._index, p = n._ptr, v = n._size, h = n._datatype || n._data === void 0 ? n._datatype : n.getDataType();
    if (c.length !== v.length) throw new lr(c.length, v.length);
    if (c[0] !== v[0] || c[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + v + ")");
    if (!o) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var s = c[0], m = c[1], d = typeof l == "string" && l !== "mixed" && l === h ? l : void 0, E = d ? e.find(u, [d, d]) : u, A, b, F = [];
    for (A = 0; A < s; A++) F[A] = [];
    var g = [], C = [];
    for (b = 0; b < m; b++) {
      for (var w = b + 1, y = p[b], _ = p[b + 1], x = y; x < _; x++) A = i[x], g[A] = f ? E(o[x], D[A][b]) : E(D[A][b], o[x]), C[A] = w;
      for (A = 0; A < s; A++) C[A] === w ? F[A][b] = g[A] : F[A][b] = D[A][b];
    }
    return a.createDenseMatrix({ data: F, size: [s, m], datatype: l === a._datatype && h === n._datatype ? d : void 0 });
  };
}), rs = "matAlgo04xSidSid", es = ["typed", "equalScalar"], ts = Y(rs, es, (r) => {
  var { typed: e, equalScalar: t } = r;
  return function(n, u, f) {
    var D = n._values, c = n._index, l = n._ptr, o = n._size, i = n._datatype || n._data === void 0 ? n._datatype : n.getDataType(), p = u._values, v = u._index, h = u._ptr, s = u._size, m = u._datatype || u._data === void 0 ? u._datatype : u.getDataType();
    if (o.length !== s.length) throw new lr(o.length, s.length);
    if (o[0] !== s[0] || o[1] !== s[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + s + ")");
    var d = o[0], E = o[1], A, b = t, F = 0, g = f;
    typeof i == "string" && i === m && i !== "mixed" && (A = i, b = e.find(t, [A, A]), F = e.convert(0, A), g = e.find(f, [A, A]));
    var C = D && p ? [] : void 0, w = [], y = [], _ = D && p ? [] : void 0, x = D && p ? [] : void 0, B = [], T = [], N, U, z, O, M;
    for (U = 0; U < E; U++) {
      y[U] = w.length;
      var S = U + 1;
      for (O = l[U], M = l[U + 1], z = O; z < M; z++) N = c[z], w.push(N), B[N] = S, _ && (_[N] = D[z]);
      for (O = h[U], M = h[U + 1], z = O; z < M; z++) if (N = v[z], B[N] === S) {
        if (_) {
          var q = g(_[N], p[z]);
          b(q, F) ? B[N] = null : _[N] = q;
        }
      } else w.push(N), T[N] = S, x && (x[N] = p[z]);
      if (_ && x) for (z = y[U]; z < w.length; ) N = w[z], B[N] === S ? (C[z] = _[N], z++) : T[N] === S ? (C[z] = x[N], z++) : w.splice(z, 1);
    }
    return y[E] = w.length, n.createSparseMatrix({ values: C, index: w, ptr: y, size: [d, E], datatype: i === n._datatype && m === u._datatype ? A : void 0 });
  };
}), ns = "matAlgo10xSids", as = ["typed", "DenseMatrix"], ka = Y(ns, as, (r) => {
  var { typed: e, DenseMatrix: t } = r;
  return function(n, u, f, D) {
    var c = n._values, l = n._index, o = n._ptr, i = n._size, p = n._datatype;
    if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = i[0], h = i[1], s, m = f;
    typeof p == "string" && (s = p, u = e.convert(u, s), m = e.find(f, [s, s]));
    for (var d = [], E = [], A = [], b = 0; b < h; b++) {
      for (var F = b + 1, g = o[b], C = o[b + 1], w = g; w < C; w++) {
        var y = l[w];
        E[y] = c[w], A[y] = F;
      }
      for (var _ = 0; _ < v; _++) b === 0 && (d[_] = []), A[_] === F ? d[_][b] = D ? m(u, E[_]) : m(E[_], u) : d[_][b] = u;
    }
    return new t({ data: d, size: [v, h], datatype: s });
  };
}), us = "multiplyScalar", is = ["typed"], os = Y(us, is, (r) => {
  var { typed: e } = r;
  return e("multiplyScalar", { "number, number": Ja, "Complex, Complex": function(a, n) {
    return a.mul(n);
  }, "BigNumber, BigNumber": function(a, n) {
    return a.times(n);
  }, "bigint, bigint": function(a, n) {
    return a * n;
  }, "Fraction, Fraction": function(a, n) {
    return a.mul(n);
  }, "number | Fraction | BigNumber | Complex, Unit": (t, a) => a.multiply(t), "Unit, number | Fraction | BigNumber | Complex | Unit": (t, a) => t.multiply(a) });
}), An = "multiply", ss = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], fs = Y(An, ss, (r) => {
  var { typed: e, matrix: t, addScalar: a, multiplyScalar: n, equalScalar: u, dot: f } = r, D = Wa({ typed: e, equalScalar: u }), c = Lt({ typed: e });
  function l(F, g) {
    switch (F.length) {
      case 1:
        switch (g.length) {
          case 1:
            if (F[0] !== g[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (F[0] !== g[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + F[0] + ") must match Matrix rows (" + g[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + g.length + " dimensions)");
        }
        break;
      case 2:
        switch (g.length) {
          case 1:
            if (F[1] !== g[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + F[1] + ") must match Vector length (" + g[0] + ")");
            break;
          case 2:
            if (F[1] !== g[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + F[1] + ") must match Matrix B rows (" + g[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + g.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + F.length + " dimensions)");
    }
  }
  function o(F, g, C) {
    if (C === 0) throw new Error("Cannot multiply two empty vectors");
    return f(F, g);
  }
  function i(F, g) {
    if (g.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
    return p(F, g);
  }
  function p(F, g) {
    var C = F._data, w = F._size, y = F._datatype || F.getDataType(), _ = g._data, x = g._size, B = g._datatype || g.getDataType(), T = w[0], N = x[1], U, z = a, O = n;
    y && B && y === B && typeof y == "string" && y !== "mixed" && (U = y, z = e.find(a, [U, U]), O = e.find(n, [U, U]));
    for (var M = [], S = 0; S < N; S++) {
      for (var q = O(C[0], _[0][S]), Q = 1; Q < T; Q++) q = z(q, O(C[Q], _[Q][S]));
      M[S] = q;
    }
    return F.createDenseMatrix({ data: M, size: [N], datatype: y === F._datatype && B === g._datatype ? U : void 0 });
  }
  var v = e("_multiplyMatrixVector", { "DenseMatrix, any": s, "SparseMatrix, any": E }), h = e("_multiplyMatrixMatrix", { "DenseMatrix, DenseMatrix": m, "DenseMatrix, SparseMatrix": d, "SparseMatrix, DenseMatrix": A, "SparseMatrix, SparseMatrix": b });
  function s(F, g) {
    var C = F._data, w = F._size, y = F._datatype || F.getDataType(), _ = g._data, x = g._datatype || g.getDataType(), B = w[0], T = w[1], N, U = a, z = n;
    y && x && y === x && typeof y == "string" && y !== "mixed" && (N = y, U = e.find(a, [N, N]), z = e.find(n, [N, N]));
    for (var O = [], M = 0; M < B; M++) {
      for (var S = C[M], q = z(S[0], _[0]), Q = 1; Q < T; Q++) q = U(q, z(S[Q], _[Q]));
      O[M] = q;
    }
    return F.createDenseMatrix({ data: O, size: [B], datatype: y === F._datatype && x === g._datatype ? N : void 0 });
  }
  function m(F, g) {
    var C = F._data, w = F._size, y = F._datatype || F.getDataType(), _ = g._data, x = g._size, B = g._datatype || g.getDataType(), T = w[0], N = w[1], U = x[1], z, O = a, M = n;
    y && B && y === B && typeof y == "string" && y !== "mixed" && y !== "mixed" && (z = y, O = e.find(a, [z, z]), M = e.find(n, [z, z]));
    for (var S = [], q = 0; q < T; q++) {
      var Q = C[q];
      S[q] = [];
      for (var R = 0; R < U; R++) {
        for (var $ = M(Q[0], _[0][R]), I = 1; I < N; I++) $ = O($, M(Q[I], _[I][R]));
        S[q][R] = $;
      }
    }
    return F.createDenseMatrix({ data: S, size: [T, U], datatype: y === F._datatype && B === g._datatype ? z : void 0 });
  }
  function d(F, g) {
    var C = F._data, w = F._size, y = F._datatype || F.getDataType(), _ = g._values, x = g._index, B = g._ptr, T = g._size, N = g._datatype || g._data === void 0 ? g._datatype : g.getDataType();
    if (!_) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var U = w[0], z = T[1], O, M = a, S = n, q = u, Q = 0;
    y && N && y === N && typeof y == "string" && y !== "mixed" && (O = y, M = e.find(a, [O, O]), S = e.find(n, [O, O]), q = e.find(u, [O, O]), Q = e.convert(0, O));
    for (var R = [], $ = [], I = [], G = g.createSparseMatrix({ values: R, index: $, ptr: I, size: [U, z], datatype: y === F._datatype && N === g._datatype ? O : void 0 }), V = 0; V < z; V++) {
      I[V] = $.length;
      var P = B[V], L = B[V + 1];
      if (L > P) for (var X = 0, Z = 0; Z < U; Z++) {
        for (var K = Z + 1, J = void 0, k = P; k < L; k++) {
          var W = x[k];
          X !== K ? (J = S(C[Z][W], _[k]), X = K) : J = M(J, S(C[Z][W], _[k]));
        }
        X === K && !q(J, Q) && ($.push(Z), R.push(J));
      }
    }
    return I[z] = $.length, G;
  }
  function E(F, g) {
    var C = F._values, w = F._index, y = F._ptr, _ = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!C) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var x = g._data, B = g._datatype || g.getDataType(), T = F._size[0], N = g._size[0], U = [], z = [], O = [], M, S = a, q = n, Q = u, R = 0;
    _ && B && _ === B && typeof _ == "string" && _ !== "mixed" && (M = _, S = e.find(a, [M, M]), q = e.find(n, [M, M]), Q = e.find(u, [M, M]), R = e.convert(0, M));
    var $ = [], I = [];
    O[0] = 0;
    for (var G = 0; G < N; G++) {
      var V = x[G];
      if (!Q(V, R)) for (var P = y[G], L = y[G + 1], X = P; X < L; X++) {
        var Z = w[X];
        I[Z] ? $[Z] = S($[Z], q(V, C[X])) : (I[Z] = true, z.push(Z), $[Z] = q(V, C[X]));
      }
    }
    for (var K = z.length, J = 0; J < K; J++) {
      var k = z[J];
      U[J] = $[k];
    }
    return O[1] = z.length, F.createSparseMatrix({ values: U, index: z, ptr: O, size: [T, 1], datatype: _ === F._datatype && B === g._datatype ? M : void 0 });
  }
  function A(F, g) {
    var C = F._values, w = F._index, y = F._ptr, _ = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
    if (!C) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var x = g._data, B = g._datatype || g.getDataType(), T = F._size[0], N = g._size[0], U = g._size[1], z, O = a, M = n, S = u, q = 0;
    _ && B && _ === B && typeof _ == "string" && _ !== "mixed" && (z = _, O = e.find(a, [z, z]), M = e.find(n, [z, z]), S = e.find(u, [z, z]), q = e.convert(0, z));
    for (var Q = [], R = [], $ = [], I = F.createSparseMatrix({ values: Q, index: R, ptr: $, size: [T, U], datatype: _ === F._datatype && B === g._datatype ? z : void 0 }), G = [], V = [], P = 0; P < U; P++) {
      $[P] = R.length;
      for (var L = P + 1, X = 0; X < N; X++) {
        var Z = x[X][P];
        if (!S(Z, q)) for (var K = y[X], J = y[X + 1], k = K; k < J; k++) {
          var W = w[k];
          V[W] !== L ? (V[W] = L, R.push(W), G[W] = M(Z, C[k])) : G[W] = O(G[W], M(Z, C[k]));
        }
      }
      for (var nr = $[P], ar = R.length, ir = nr; ir < ar; ir++) {
        var er = R[ir];
        Q[ir] = G[er];
      }
    }
    return $[U] = R.length, I;
  }
  function b(F, g) {
    var C = F._values, w = F._index, y = F._ptr, _ = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), x = g._values, B = g._index, T = g._ptr, N = g._datatype || g._data === void 0 ? g._datatype : g.getDataType(), U = F._size[0], z = g._size[1], O = C && x, M, S = a, q = n;
    _ && N && _ === N && typeof _ == "string" && _ !== "mixed" && (M = _, S = e.find(a, [M, M]), q = e.find(n, [M, M]));
    for (var Q = O ? [] : void 0, R = [], $ = [], I = F.createSparseMatrix({ values: Q, index: R, ptr: $, size: [U, z], datatype: _ === F._datatype && N === g._datatype ? M : void 0 }), G = O ? [] : void 0, V = [], P, L, X, Z, K, J, k, W, nr = 0; nr < z; nr++) {
      $[nr] = R.length;
      var ar = nr + 1;
      for (K = T[nr], J = T[nr + 1], Z = K; Z < J; Z++) if (W = B[Z], O) for (L = y[W], X = y[W + 1], P = L; P < X; P++) k = w[P], V[k] !== ar ? (V[k] = ar, R.push(k), G[k] = q(x[Z], C[P])) : G[k] = S(G[k], q(x[Z], C[P]));
      else for (L = y[W], X = y[W + 1], P = L; P < X; P++) k = w[P], V[k] !== ar && (V[k] = ar, R.push(k));
      if (O) for (var ir = $[nr], er = R.length, sr = ir; sr < er; sr++) {
        var fr = R[sr];
        Q[sr] = G[fr];
      }
    }
    return $[z] = R.length, I;
  }
  return e(An, n, { "Array, Array": e.referTo("Matrix, Matrix", (F) => (g, C) => {
    l(vr(g), vr(C));
    var w = F(t(g), t(C));
    return dr(w) ? w.valueOf() : w;
  }), "Matrix, Matrix": function(g, C) {
    var w = g.size(), y = C.size();
    return l(w, y), w.length === 1 ? y.length === 1 ? o(g, C, w[0]) : i(g, C) : y.length === 1 ? v(g, C) : h(g, C);
  }, "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (g, C) => F(g, t(C))), "Array, Matrix": e.referToSelf((F) => (g, C) => F(t(g, C.storage()), C)), "SparseMatrix, any": function(g, C) {
    return D(g, C, n, false);
  }, "DenseMatrix, any": function(g, C) {
    return c(g, C, n, false);
  }, "any, SparseMatrix": function(g, C) {
    return D(C, g, n, true);
  }, "any, DenseMatrix": function(g, C) {
    return c(C, g, n, true);
  }, "Array, any": function(g, C) {
    return c(t(g), C, n, false).valueOf();
  }, "any, Array": function(g, C) {
    return c(t(C), g, n, true).valueOf();
  }, "any, any": n, "any, any, ...any": e.referToSelf((F) => (g, C, w) => {
    for (var y = F(g, C), _ = 0; _ < w.length; _++) y = F(y, w[_]);
    return y;
  }) });
}), Fn = "sign", cs = ["typed", "BigNumber", "Fraction", "complex"], ls = Y(Fn, cs, (r) => {
  var { typed: e, BigNumber: t, complex: a, Fraction: n } = r;
  return e(Fn, { number: zt, Complex: function(f) {
    return f.im === 0 ? a(zt(f.re)) : f.sign();
  }, BigNumber: function(f) {
    return new t(f.cmp(0));
  }, bigint: function(f) {
    return f > 0n ? 1n : f < 0n ? -1n : 0n;
  }, Fraction: function(f) {
    return new n(f.s);
  }, "Array | Matrix": e.referToSelf((u) => (f) => Vr(f, u, true)), Unit: e.referToSelf((u) => (f) => {
    if (!f._isDerived() && f.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
    return e.find(u, f.valueType())(f.value);
  }) });
}), vs = "sqrt", Ds = ["config", "typed", "Complex"], ps = Y(vs, Ds, (r) => {
  var { config: e, typed: t, Complex: a } = r;
  return t("sqrt", { number: n, Complex: function(f) {
    return f.sqrt();
  }, BigNumber: function(f) {
    return !f.isNegative() || e.predictable ? f.sqrt() : n(f.toNumber());
  }, Unit: function(f) {
    return f.pow(0.5);
  } });
  function n(u) {
    return isNaN(u) ? NaN : u >= 0 || e.predictable ? Math.sqrt(u) : new a(u, 0).sqrt();
  }
}), En = "subtract", hs = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], ds = Y(En, hs, (r) => {
  var { typed: e, matrix: t, equalScalar: a, subtractScalar: n, unaryMinus: u, DenseMatrix: f, concat: D } = r, c = Ha({ typed: e }), l = Me({ typed: e }), o = Xo({ typed: e, equalScalar: a }), i = ka({ typed: e, DenseMatrix: f }), p = Se({ typed: e, DenseMatrix: f }), v = Fe({ typed: e, matrix: t, concat: D });
  return e(En, { "any, any": n }, v({ elop: n, SS: o, DS: c, SD: l, Ss: p, sS: i }));
}), ms = "matAlgo07xSSf", gs = ["typed", "SparseMatrix"], Le = Y(ms, gs, (r) => {
  var { typed: e, SparseMatrix: t } = r;
  return function(u, f, D) {
    var c = u._size, l = u._datatype || u._data === void 0 ? u._datatype : u.getDataType(), o = f._size, i = f._datatype || f._data === void 0 ? f._datatype : f.getDataType();
    if (c.length !== o.length) throw new lr(c.length, o.length);
    if (c[0] !== o[0] || c[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + o + ")");
    var p = c[0], v = c[1], h, s = 0, m = D;
    typeof l == "string" && l === i && l !== "mixed" && (h = l, s = e.convert(0, h), m = e.find(D, [h, h]));
    for (var d = [], E = [], A = new Array(v + 1).fill(0), b = [], F = [], g = [], C = [], w = 0; w < v; w++) {
      var y = w + 1, _ = 0;
      a(u, w, g, b, y), a(f, w, C, F, y);
      for (var x = 0; x < p; x++) {
        var B = g[x] === y ? b[x] : s, T = C[x] === y ? F[x] : s, N = m(B, T);
        N !== 0 && N !== false && (E.push(x), d.push(N), _++);
      }
      A[w + 1] = A[w] + _;
    }
    return new t({ values: d, index: E, ptr: A, size: [p, v], datatype: l === u._datatype && i === f._datatype ? h : void 0 });
  };
  function a(n, u, f, D, c) {
    for (var l = n._values, o = n._index, i = n._ptr, p = i[u], v = i[u + 1]; p < v; p++) {
      var h = o[p];
      f[h] = c, D[h] = l[p];
    }
  }
}), wn = "conj", ys = ["typed"], As = Y(wn, ys, (r) => {
  var { typed: e } = r;
  return e(wn, { "number | BigNumber | Fraction": (t) => t, Complex: (t) => t.conjugate(), "Array | Matrix": e.referToSelf((t) => (a) => Vr(a, t)) });
}), bn = "im", Fs = ["typed"], Es = Y(bn, Fs, (r) => {
  var { typed: e } = r;
  return e(bn, { number: () => 0, "BigNumber | Fraction": (t) => t.mul(0), Complex: (t) => t.im, "Array | Matrix": e.referToSelf((t) => (a) => Vr(a, t)) });
}), Cn = "re", ws = ["typed"], bs = Y(Cn, ws, (r) => {
  var { typed: e } = r;
  return e(Cn, { "number | BigNumber | Fraction": (t) => t, Complex: (t) => t.re, "Array | Matrix": e.referToSelf((t) => (a) => Vr(a, t)) });
}), _n = "concat", Cs = ["typed", "matrix", "isInteger"], _s = Y(_n, Cs, (r) => {
  var { typed: e, matrix: t, isInteger: a } = r;
  return e(_n, { "...Array | Matrix | number | BigNumber": function(u) {
    var f, D = u.length, c = -1, l, o = false, i = [];
    for (f = 0; f < D; f++) {
      var p = u[f];
      if (dr(p) && (o = true), Fr(p) || Cr(p)) {
        if (f !== D - 1) throw new Error("Dimension must be specified as last argument");
        if (l = c, c = p.valueOf(), !a(c)) throw new TypeError("Integer number expected for dimension");
        if (c < 0 || f > 0 && c > l) throw new he(c, l + 1);
      } else {
        var v = pr(p).valueOf(), h = vr(v);
        if (i[f] = v, l = c, c = h.length - 1, f > 0 && c !== l) throw new lr(l + 1, c + 1);
      }
    }
    if (i.length === 0) throw new SyntaxError("At least one matrix expected");
    for (var s = i.shift(); i.length; ) s = Ra(s, i.shift(), c);
    return o ? t(s) : s;
  }, "...string": function(u) {
    return u.join("");
  } });
}), xn = "column", xs = ["typed", "Index", "matrix", "range"], Bs = Y(xn, xs, (r) => {
  var { typed: e, Index: t, matrix: a, range: n } = r;
  return e(xn, { "Matrix, number": u, "Array, number": function(D, c) {
    return u(a(pr(D)), c).valueOf();
  } });
  function u(f, D) {
    if (f.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
    yr(D, f.size()[1]);
    var c = n(0, f.size()[0]), l = new t(c, D), o = f.subset(l);
    return dr(o) ? o : a([[o]]);
  }
}), Bn = "cross", Ss = ["typed", "matrix", "subtract", "multiply"], Ms = Y(Bn, Ss, (r) => {
  var { typed: e, matrix: t, subtract: a, multiply: n } = r;
  return e(Bn, { "Matrix, Matrix": function(D, c) {
    return t(u(D.toArray(), c.toArray()));
  }, "Matrix, Array": function(D, c) {
    return t(u(D.toArray(), c));
  }, "Array, Matrix": function(D, c) {
    return t(u(D, c.toArray()));
  }, "Array, Array": u });
  function u(f, D) {
    var c = Math.max(vr(f).length, vr(D).length);
    f = sn(f), D = sn(D);
    var l = vr(f), o = vr(D);
    if (l.length !== 1 || o.length !== 1 || l[0] !== 3 || o[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + l.join(", ") + "], B = [" + o.join(", ") + "])");
    var i = [a(n(f[1], D[2]), n(f[2], D[1])), a(n(f[2], D[0]), n(f[0], D[2])), a(n(f[0], D[1]), n(f[1], D[0]))];
    return c > 1 ? [i] : i;
  }
}), Sn = "diag", Ns = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], zs = Y(Sn, Ns, (r) => {
  var { typed: e, matrix: t, DenseMatrix: a, SparseMatrix: n } = r;
  return e(Sn, { Array: function(l) {
    return u(l, 0, vr(l), null);
  }, "Array, number": function(l, o) {
    return u(l, o, vr(l), null);
  }, "Array, BigNumber": function(l, o) {
    return u(l, o.toNumber(), vr(l), null);
  }, "Array, string": function(l, o) {
    return u(l, 0, vr(l), o);
  }, "Array, number, string": function(l, o, i) {
    return u(l, o, vr(l), i);
  }, "Array, BigNumber, string": function(l, o, i) {
    return u(l, o.toNumber(), vr(l), i);
  }, Matrix: function(l) {
    return u(l, 0, l.size(), l.storage());
  }, "Matrix, number": function(l, o) {
    return u(l, o, l.size(), l.storage());
  }, "Matrix, BigNumber": function(l, o) {
    return u(l, o.toNumber(), l.size(), l.storage());
  }, "Matrix, string": function(l, o) {
    return u(l, 0, l.size(), o);
  }, "Matrix, number, string": function(l, o, i) {
    return u(l, o, l.size(), i);
  }, "Matrix, BigNumber, string": function(l, o, i) {
    return u(l, o.toNumber(), l.size(), i);
  } });
  function u(c, l, o, i) {
    if (!Er(l)) throw new TypeError("Second parameter in function diag must be an integer");
    var p = l > 0 ? l : 0, v = l < 0 ? -l : 0;
    switch (o.length) {
      case 1:
        return f(c, l, i, o[0], v, p);
      case 2:
        return D(c, l, i, o, v, p);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function f(c, l, o, i, p, v) {
    var h = [i + p, i + v];
    if (o && o !== "sparse" && o !== "dense") throw new TypeError("Unknown matrix type ".concat(o, '"'));
    var s = o === "sparse" ? n.diagonal(h, c, l) : a.diagonal(h, c, l);
    return o !== null ? s : s.valueOf();
  }
  function D(c, l, o, i, p, v) {
    if (dr(c)) {
      var h = c.diagonal(l);
      return o !== null ? o !== h.storage() ? t(h, o) : h : h.valueOf();
    }
    for (var s = Math.min(i[0] - p, i[1] - v), m = [], d = 0; d < s; d++) m[d] = c[d + p][d + v];
    return o !== null ? t(m) : m;
  }
}), Mn = "flatten", Ts = ["typed"], $s = Y(Mn, Ts, (r) => {
  var { typed: e } = r;
  return e(Mn, { Array: function(a) {
    return Mt(a);
  }, Matrix: function(a) {
    return a.create(Mt(a.valueOf(), true), a.datatype());
  } });
}), Nn = "getMatrixDataType", Os = ["typed"], Is = Y(Nn, Os, (r) => {
  var { typed: e } = r;
  return e(Nn, { Array: function(a) {
    return gt(a, Qr);
  }, Matrix: function(a) {
    return a.getDataType();
  } });
}), zn = "identity", qs = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Us = Y(zn, qs, (r) => {
  var { typed: e, config: t, matrix: a, BigNumber: n, DenseMatrix: u, SparseMatrix: f } = r;
  return e(zn, { "": function() {
    return t.matrix === "Matrix" ? a([]) : [];
  }, string: function(o) {
    return a(o);
  }, "number | BigNumber": function(o) {
    return c(o, o, t.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(o, i) {
    return c(o, o, i);
  }, "number | BigNumber, number | BigNumber": function(o, i) {
    return c(o, i, t.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(o, i, p) {
    return c(o, i, p);
  }, Array: function(o) {
    return D(o);
  }, "Array, string": function(o, i) {
    return D(o, i);
  }, Matrix: function(o) {
    return D(o.valueOf(), o.storage());
  }, "Matrix, string": function(o, i) {
    return D(o.valueOf(), i);
  } });
  function D(l, o) {
    switch (l.length) {
      case 0:
        return o ? a(o) : [];
      case 1:
        return c(l[0], l[0], o);
      case 2:
        return c(l[0], l[1], o);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function c(l, o, i) {
    var p = Cr(l) || Cr(o) ? n : null;
    if (Cr(l) && (l = l.toNumber()), Cr(o) && (o = o.toNumber()), !Er(l) || l < 1) throw new Error("Parameters in function identity must be positive integers");
    if (!Er(o) || o < 1) throw new Error("Parameters in function identity must be positive integers");
    var v = p ? new n(1) : 1, h = p ? new p(0) : 0, s = [l, o];
    if (i) {
      if (i === "sparse") return f.diagonal(s, v, 0, h);
      if (i === "dense") return u.diagonal(s, v, 0, h);
      throw new TypeError('Unknown matrix type "'.concat(i, '"'));
    }
    for (var m = ut([], s, h), d = l < o ? l : o, E = 0; E < d; E++) m[E][E] = v;
    return m;
  }
}), Tn = "kron", Rs = ["typed", "matrix", "multiplyScalar"], Ps = Y(Tn, Rs, (r) => {
  var { typed: e, matrix: t, multiplyScalar: a } = r;
  return e(Tn, { "Matrix, Matrix": function(f, D) {
    return t(n(f.toArray(), D.toArray()));
  }, "Matrix, Array": function(f, D) {
    return t(n(f.toArray(), D));
  }, "Array, Matrix": function(f, D) {
    return t(n(f, D.toArray()));
  }, "Array, Array": n });
  function n(u, f) {
    if (vr(u).length === 1 && (u = [u]), vr(f).length === 1 && (f = [f]), vr(u).length > 2 || vr(f).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(u.length) + ", y = " + JSON.stringify(f.length) + ")");
    var D = [], c = [];
    return u.map(function(l) {
      return f.map(function(o) {
        return c = [], D.push(c), l.map(function(i) {
          return o.map(function(p) {
            return c.push(a(i, p));
          });
        });
      });
    }) && D;
  }
});
function ja() {
  throw new Error('No "bignumber" implementation available');
}
function Ls() {
  throw new Error('No "fraction" implementation available');
}
function ru() {
  throw new Error('No "matrix" implementation available');
}
var $n = "range", Qs = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], Vs = Y($n, Qs, (r) => {
  var { typed: e, config: t, matrix: a, bignumber: n, smaller: u, smallerEq: f, larger: D, largerEq: c, add: l, isPositive: o } = r;
  return e($n, { string: p, "string, boolean": p, number: function(m) {
    throw new TypeError("Too few arguments to function range(): ".concat(m));
  }, boolean: function(m) {
    throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(m, ", number|bigint|BigNumber|Fraction"));
  }, "number, number": function(m, d) {
    return i(v(m, d, 1, false));
  }, "number, number, number": function(m, d, E) {
    return i(v(m, d, E, false));
  }, "number, number, boolean": function(m, d, E) {
    return i(v(m, d, 1, E));
  }, "number, number, number, boolean": function(m, d, E, A) {
    return i(v(m, d, E, A));
  }, "bigint, bigint|number": function(m, d) {
    return i(v(m, d, 1n, false));
  }, "number, bigint": function(m, d) {
    return i(v(BigInt(m), d, 1n, false));
  }, "bigint, bigint|number, bigint|number": function(m, d, E) {
    return i(v(m, d, BigInt(E), false));
  }, "number, bigint, bigint|number": function(m, d, E) {
    return i(v(BigInt(m), d, BigInt(E), false));
  }, "bigint, bigint|number, boolean": function(m, d, E) {
    return i(v(m, d, 1n, E));
  }, "number, bigint, boolean": function(m, d, E) {
    return i(v(BigInt(m), d, 1n, E));
  }, "bigint, bigint|number, bigint|number, boolean": function(m, d, E, A) {
    return i(v(m, d, BigInt(E), A));
  }, "number, bigint, bigint|number, boolean": function(m, d, E, A) {
    return i(v(BigInt(m), d, BigInt(E), A));
  }, "BigNumber, BigNumber": function(m, d) {
    var E = m.constructor;
    return i(v(m, d, new E(1), false));
  }, "BigNumber, BigNumber, BigNumber": function(m, d, E) {
    return i(v(m, d, E, false));
  }, "BigNumber, BigNumber, boolean": function(m, d, E) {
    var A = m.constructor;
    return i(v(m, d, new A(1), E));
  }, "BigNumber, BigNumber, BigNumber, boolean": function(m, d, E, A) {
    return i(v(m, d, E, A));
  }, "Fraction, Fraction": function(m, d) {
    return i(v(m, d, 1, false));
  }, "Fraction, Fraction, Fraction": function(m, d, E) {
    return i(v(m, d, E, false));
  }, "Fraction, Fraction, boolean": function(m, d, E) {
    return i(v(m, d, 1, E));
  }, "Fraction, Fraction, Fraction, boolean": function(m, d, E, A) {
    return i(v(m, d, E, A));
  }, "Unit, Unit, Unit": function(m, d, E) {
    return i(v(m, d, E, false));
  }, "Unit, Unit, Unit, boolean": function(m, d, E, A) {
    return i(v(m, d, E, A));
  } });
  function i(s) {
    return t.matrix === "Matrix" ? a ? a(s) : ru() : s;
  }
  function p(s, m) {
    var d = h(s);
    if (!d) throw new SyntaxError('String "' + s + '" is no valid range');
    return t.number === "BigNumber" ? (n === void 0 && ja(), i(v(n(d.start), n(d.end), n(d.step)))) : i(v(d.start, d.end, d.step, m));
  }
  function v(s, m, d, E) {
    for (var A = [], b = o(d) ? E ? f : u : E ? c : D, F = s; b(F, m); ) A.push(F), F = l(F, d);
    return A;
  }
  function h(s) {
    var m = s.split(":"), d = m.map(function(A) {
      return Number(A);
    }), E = d.some(function(A) {
      return isNaN(A);
    });
    if (E) return null;
    switch (d.length) {
      case 2:
        return { start: d[0], end: d[1], step: 1 };
      case 3:
        return { start: d[0], end: d[2], step: d[1] };
      default:
        return null;
    }
  }
}), On = "reshape", Zs = ["typed", "isInteger", "matrix"], Xs = Y(On, Zs, (r) => {
  var { typed: e, isInteger: t } = r;
  return e(On, { "Matrix, Array": function(n, u) {
    return n.reshape(u, true);
  }, "Array, Array": function(n, u) {
    return u.forEach(function(f) {
      if (!t(f)) throw new TypeError("Invalid size for dimension: " + f);
    }), Ut(n, u);
  } });
}), In = "size", Js = ["typed", "config", "?matrix"], Gs = Y(In, Js, (r) => {
  var { typed: e, config: t, matrix: a } = r;
  return e(In, { Matrix: function(u) {
    return u.create(u.size(), "number");
  }, Array: vr, string: function(u) {
    return t.matrix === "Array" ? [u.length] : a([u.length], "dense", "number");
  }, "number | Complex | BigNumber | Unit | boolean | null": function(u) {
    return t.matrix === "Array" ? [] : a ? a([], "dense", "number") : ru();
  } });
}), qn = "subset", Ys = ["typed", "matrix", "zeros", "add"], Ks = Y(qn, Ys, (r) => {
  var { typed: e, matrix: t, zeros: a, add: n } = r;
  return e(qn, { "Matrix, Index": function(D, c) {
    return xe(c) ? t() : (at(D, c), D.subset(c));
  }, "Array, Index": e.referTo("Matrix, Index", function(f) {
    return function(D, c) {
      var l = f(t(D), c);
      return c.isScalar() ? l : l.valueOf();
    };
  }), "Object, Index": Hs, "string, Index": Ws, "Matrix, Index, any, any": function(D, c, l, o) {
    return xe(c) ? D : (at(D, c), D.clone().subset(c, u(l, c), o));
  }, "Array, Index, any, any": e.referTo("Matrix, Index, any, any", function(f) {
    return function(D, c, l, o) {
      var i = f(t(D), c, l, o);
      return i.isMatrix ? i.valueOf() : i;
    };
  }), "Array, Index, any": e.referTo("Matrix, Index, any, any", function(f) {
    return function(D, c, l) {
      return f(t(D), c, l, void 0).valueOf();
    };
  }), "Matrix, Index, any": e.referTo("Matrix, Index, any, any", function(f) {
    return function(D, c, l) {
      return f(D, c, l, void 0);
    };
  }), "string, Index, string": Un, "string, Index, string, string": Un, "Object, Index, any": ks });
  function u(f, D) {
    if (typeof f == "string") throw new Error("can't boradcast a string");
    if (D._isScalar) return f;
    var c = D.size();
    if (c.every((l) => l > 0)) try {
      return n(f, a(c));
    } catch {
      return f;
    }
    else return f;
  }
});
function Ws(r, e) {
  if (!ht(e)) throw new TypeError("Index expected");
  if (xe(e)) return "";
  if (at(Array.from(r), e), e.size().length !== 1) throw new lr(e.size().length, 1);
  var t = r.length;
  yr(e.min()[0], t), yr(e.max()[0], t);
  var a = e.dimension(0), n = "";
  return a.forEach(function(u) {
    n += r.charAt(u);
  }), n;
}
function Un(r, e, t, a) {
  if (!e || e.isIndex !== true) throw new TypeError("Index expected");
  if (xe(e)) return r;
  if (at(Array.from(r), e), e.size().length !== 1) throw new lr(e.size().length, 1);
  if (a !== void 0) {
    if (typeof a != "string" || a.length !== 1) throw new TypeError("Single character expected as defaultValue");
  } else a = " ";
  var n = e.dimension(0), u = n.size()[0];
  if (u !== t.length) throw new lr(n.size()[0], t.length);
  var f = r.length;
  yr(e.min()[0]), yr(e.max()[0]);
  for (var D = [], c = 0; c < f; c++) D[c] = r.charAt(c);
  if (n.forEach(function(i, p) {
    D[i] = t.charAt(p[0]);
  }), D.length > f) for (var l = f - 1, o = D.length; l < o; l++) D[l] || (D[l] = a);
  return D.join("");
}
function Hs(r, e) {
  if (!xe(e)) {
    if (e.size().length !== 1) throw new lr(e.size(), 1);
    var t = e.dimension(0);
    if (typeof t != "string") throw new TypeError("String expected as index to retrieve an object property");
    return Ea(r, t);
  }
}
function ks(r, e, t) {
  if (xe(e)) return r;
  if (e.size().length !== 1) throw new lr(e.size(), 1);
  var a = e.dimension(0);
  if (typeof a != "string") throw new TypeError("String expected as index to retrieve an object property");
  var n = pr(r);
  return wa(n, a, t), n;
}
var Rn = "transpose", js = ["typed", "matrix"], rf = Y(Rn, js, (r) => {
  var { typed: e, matrix: t } = r;
  return e(Rn, { Array: (f) => a(t(f)).valueOf(), Matrix: a, any: pr });
  function a(f) {
    var D = f.size(), c;
    switch (D.length) {
      case 1:
        c = f.clone();
        break;
      case 2:
        {
          var l = D[0], o = D[1];
          if (o === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + br(D) + ")");
          switch (f.storage()) {
            case "dense":
              c = n(f, l, o);
              break;
            case "sparse":
              c = u(f, l, o);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + br(D) + ")");
    }
    return c;
  }
  function n(f, D, c) {
    for (var l = f._data, o = [], i, p = 0; p < c; p++) {
      i = o[p] = [];
      for (var v = 0; v < D; v++) i[v] = pr(l[v][p]);
    }
    return f.createDenseMatrix({ data: o, size: [c, D], datatype: f._datatype });
  }
  function u(f, D, c) {
    for (var l = f._values, o = f._index, i = f._ptr, p = l ? [] : void 0, v = [], h = [], s = [], m = 0; m < D; m++) s[m] = 0;
    var d, E, A;
    for (d = 0, E = o.length; d < E; d++) s[o[d]]++;
    for (var b = 0, F = 0; F < D; F++) h.push(b), b += s[F], s[F] = h[F];
    for (h.push(b), A = 0; A < c; A++) for (var g = i[A], C = i[A + 1], w = g; w < C; w++) {
      var y = s[o[w]]++;
      v[y] = A, l && (p[y] = pr(l[w]));
    }
    return f.createSparseMatrix({ values: p, index: v, ptr: h, size: [c, D], datatype: f._datatype });
  }
}), Pn = "ctranspose", ef = ["typed", "transpose", "conj"], tf = Y(Pn, ef, (r) => {
  var { typed: e, transpose: t, conj: a } = r;
  return e(Pn, { any: function(u) {
    return a(t(u));
  } });
}), Ln = "zeros", nf = ["typed", "config", "matrix", "BigNumber"], af = Y(Ln, nf, (r) => {
  var { typed: e, config: t, matrix: a, BigNumber: n } = r;
  return e(Ln, { "": function() {
    return t.matrix === "Array" ? u([]) : u([], "default");
  }, "...number | BigNumber | string": function(l) {
    var o = l[l.length - 1];
    if (typeof o == "string") {
      var i = l.pop();
      return u(l, i);
    } else return t.matrix === "Array" ? u(l) : u(l, "default");
  }, Array: u, Matrix: function(l) {
    var o = l.storage();
    return u(l.valueOf(), o);
  }, "Array | Matrix, string": function(l, o) {
    return u(l.valueOf(), o);
  } });
  function u(c, l) {
    var o = f(c), i = o ? new n(0) : 0;
    if (D(c), l) {
      var p = a(l);
      return c.length > 0 ? p.resize(c, i) : p;
    } else {
      var v = [];
      return c.length > 0 ? ut(v, c, i) : v;
    }
  }
  function f(c) {
    var l = false;
    return c.forEach(function(o, i, p) {
      Cr(o) && (l = true, p[i] = o.toNumber());
    }), l;
  }
  function D(c) {
    c.forEach(function(l) {
      if (typeof l != "number" || !Er(l) || l < 0) throw new Error("Parameters in function zeros must be positive integers");
    });
  }
});
function Qn(r, e, t) {
  var a;
  return String(r).includes("Unexpected type") ? (a = arguments.length > 2 ? " (type: " + Qr(t) + ", value: " + JSON.stringify(t) + ")" : " (type: " + r.data.actual + ")", new TypeError("Cannot calculate " + e + ", unexpected type of argument" + a)) : String(r).includes("complex numbers") ? (a = arguments.length > 2 ? " (type: " + Qr(t) + ", value: " + JSON.stringify(t) + ")" : "", new TypeError("Cannot calculate " + e + ", no ordering relation is defined for complex numbers" + a)) : r;
}
var uf = "numeric", of = ["number", "?bignumber", "?fraction"], sf = Y(uf, of, (r) => {
  var { number: e, bignumber: t, fraction: a } = r, n = { string: true, number: true, BigNumber: true, Fraction: true }, u = { number: (f) => e(f), BigNumber: t ? (f) => t(f) : ja, bigint: (f) => BigInt(f), Fraction: a ? (f) => a(f) : Ls };
  return function(D) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", l = arguments.length > 2 ? arguments[2] : void 0;
    if (l !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
    var o = Qr(D);
    if (!(o in n)) throw new TypeError("Cannot convert " + D + ' of type "' + o + '"; valid input types are ' + Object.keys(n).join(", "));
    if (!(c in u)) throw new TypeError("Cannot convert " + D + ' to type "' + c + '"; valid output types are ' + Object.keys(u).join(", "));
    return c === o ? D : u[c](D);
  };
}), Vn = "divideScalar", ff = ["typed", "numeric"], cf = Y(Vn, ff, (r) => {
  var { typed: e, numeric: t } = r;
  return e(Vn, { "number, number": function(n, u) {
    return n / u;
  }, "Complex, Complex": function(n, u) {
    return n.div(u);
  }, "BigNumber, BigNumber": function(n, u) {
    return n.div(u);
  }, "bigint, bigint": function(n, u) {
    return n / u;
  }, "Fraction, Fraction": function(n, u) {
    return n.div(u);
  }, "Unit, number | Complex | Fraction | BigNumber | Unit": (a, n) => a.divide(n), "number | Fraction | Complex | BigNumber, Unit": (a, n) => n.divideInto(a) });
}), Zn = "pow", lf = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], vf = Y(Zn, lf, (r) => {
  var { typed: e, config: t, identity: a, multiply: n, matrix: u, inv: f, number: D, fraction: c, Complex: l } = r;
  return e(Zn, { "number, number": o, "Complex, Complex": function(h, s) {
    return h.pow(s);
  }, "BigNumber, BigNumber": function(h, s) {
    return s.isInteger() || h >= 0 || t.predictable ? h.pow(s) : new l(h.toNumber(), 0).pow(s.toNumber(), 0);
  }, "bigint, bigint": (v, h) => v ** h, "Fraction, Fraction": function(h, s) {
    var m = h.pow(s);
    if (m != null) return m;
    if (t.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
    return o(h.valueOf(), s.valueOf());
  }, "Array, number": i, "Array, BigNumber": function(h, s) {
    return i(h, s.toNumber());
  }, "Matrix, number": p, "Matrix, BigNumber": function(h, s) {
    return p(h, s.toNumber());
  }, "Unit, number | BigNumber": function(h, s) {
    return h.pow(s);
  } });
  function o(v, h) {
    if (t.predictable && !Er(h) && v < 0) try {
      var s = c(h), m = D(s);
      if ((h === m || Math.abs((h - m) / h) < 1e-14) && s.d % 2n === 1n) return (s.n % 2n === 0n ? 1 : -1) * Math.pow(-v, h);
    } catch {
    }
    return t.predictable && (v < -1 && h === 1 / 0 || v > -1 && v < 0 && h === -1 / 0) ? NaN : Er(h) || v >= 0 || t.predictable ? Ya(v, h) : v * v < 1 && h === 1 / 0 || v * v > 1 && h === -1 / 0 ? 0 : new l(v, 0).pow(h, 0);
  }
  function i(v, h) {
    if (!Er(h)) throw new TypeError("For A^b, b must be an integer (value is " + h + ")");
    var s = vr(v);
    if (s.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + s.length + " dimensions)");
    if (s[0] !== s[1]) throw new Error("For A^b, A must be square (size is " + s[0] + "x" + s[1] + ")");
    if (h < 0) try {
      return i(f(v), -h);
    } catch (E) {
      throw E.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + h + ")") : E;
    }
    for (var m = a(s[0]).valueOf(), d = v; h >= 1; ) (h & 1) === 1 && (m = n(d, m)), h >>= 1, d = n(d, d);
    return m;
  }
  function p(v, h) {
    return u(i(v.valueOf(), h));
  }
});
function At(r) {
  var { DenseMatrix: e } = r;
  return function(a, n, u) {
    var f = a.size();
    if (f.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + br(f) + ")");
    var D = f[0], c = f[1];
    if (D !== c) throw new RangeError("Matrix must be square (size: " + br(f) + ")");
    var l = [];
    if (dr(n)) {
      var o = n.size(), i = n._data;
      if (o.length === 1) {
        if (o[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var p = 0; p < D; p++) l[p] = [i[p]];
        return new e({ data: l, size: [D, 1], datatype: n._datatype });
      }
      if (o.length === 2) {
        if (o[0] !== D || o[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (Ca(n)) {
          if (u) {
            l = [];
            for (var v = 0; v < D; v++) l[v] = [i[v][0]];
            return new e({ data: l, size: [D, 1], datatype: n._datatype });
          }
          return n;
        }
        if (_a(n)) {
          for (var h = 0; h < D; h++) l[h] = [0];
          for (var s = n._values, m = n._index, d = n._ptr, E = d[1], A = d[0]; A < E; A++) {
            var b = m[A];
            l[b][0] = s[A];
          }
          return new e({ data: l, size: [D, 1], datatype: n._datatype });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Ar(n)) {
      var F = vr(n);
      if (F.length === 1) {
        if (F[0] !== D) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var g = 0; g < D; g++) l[g] = [n[g]];
        return new e({ data: l, size: [D, 1] });
      }
      if (F.length === 2) {
        if (F[0] !== D || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var C = 0; C < D; C++) l[C] = [n[C][0]];
        return new e({ data: l, size: [D, 1] });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var Xn = "lsolve", Df = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], pf = Y(Xn, Df, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtractScalar: u, equalScalar: f, DenseMatrix: D } = r, c = At({ DenseMatrix: D });
  return e(Xn, { "SparseMatrix, Array | Matrix": function(p, v) {
    return o(p, v);
  }, "DenseMatrix, Array | Matrix": function(p, v) {
    return l(p, v);
  }, "Array, Array | Matrix": function(p, v) {
    var h = t(p), s = l(h, v);
    return s.valueOf();
  } });
  function l(i, p) {
    p = c(i, p, true);
    for (var v = p._data, h = i._size[0], s = i._size[1], m = [], d = i._data, E = 0; E < s; E++) {
      var A = v[E][0] || 0, b = void 0;
      if (f(A, 0)) b = 0;
      else {
        var F = d[E][E];
        if (f(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        b = a(A, F);
        for (var g = E + 1; g < h; g++) v[g] = [u(v[g][0] || 0, n(b, d[g][E]))];
      }
      m[E] = [b];
    }
    return new D({ data: m, size: [h, 1] });
  }
  function o(i, p) {
    p = c(i, p, true);
    for (var v = p._data, h = i._size[0], s = i._size[1], m = i._values, d = i._index, E = i._ptr, A = [], b = 0; b < s; b++) {
      var F = v[b][0] || 0;
      if (f(F, 0)) A[b] = [0];
      else {
        for (var g = 0, C = [], w = [], y = E[b], _ = E[b + 1], x = y; x < _; x++) {
          var B = d[x];
          B === b ? g = m[x] : B > b && (C.push(m[x]), w.push(B));
        }
        if (f(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var T = a(F, g), N = 0, U = w.length; N < U; N++) {
          var z = w[N];
          v[z] = [u(v[z][0] || 0, n(T, C[N]))];
        }
        A[b] = [T];
      }
    }
    return new D({ data: A, size: [h, 1] });
  }
}), Jn = "usolve", hf = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], df = Y(Jn, hf, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtractScalar: u, equalScalar: f, DenseMatrix: D } = r, c = At({ DenseMatrix: D });
  return e(Jn, { "SparseMatrix, Array | Matrix": function(p, v) {
    return o(p, v);
  }, "DenseMatrix, Array | Matrix": function(p, v) {
    return l(p, v);
  }, "Array, Array | Matrix": function(p, v) {
    var h = t(p), s = l(h, v);
    return s.valueOf();
  } });
  function l(i, p) {
    p = c(i, p, true);
    for (var v = p._data, h = i._size[0], s = i._size[1], m = [], d = i._data, E = s - 1; E >= 0; E--) {
      var A = v[E][0] || 0, b = void 0;
      if (f(A, 0)) b = 0;
      else {
        var F = d[E][E];
        if (f(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        b = a(A, F);
        for (var g = E - 1; g >= 0; g--) v[g] = [u(v[g][0] || 0, n(b, d[g][E]))];
      }
      m[E] = [b];
    }
    return new D({ data: m, size: [h, 1] });
  }
  function o(i, p) {
    p = c(i, p, true);
    for (var v = p._data, h = i._size[0], s = i._size[1], m = i._values, d = i._index, E = i._ptr, A = [], b = s - 1; b >= 0; b--) {
      var F = v[b][0] || 0;
      if (f(F, 0)) A[b] = [0];
      else {
        for (var g = 0, C = [], w = [], y = E[b], _ = E[b + 1], x = _ - 1; x >= y; x--) {
          var B = d[x];
          B === b ? g = m[x] : B < b && (C.push(m[x]), w.push(B));
        }
        if (f(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
        for (var T = a(F, g), N = 0, U = w.length; N < U; N++) {
          var z = w[N];
          v[z] = [u(v[z][0], n(T, C[N]))];
        }
        A[b] = [T];
      }
    }
    return new D({ data: A, size: [h, 1] });
  }
}), Gn = "usolveAll", mf = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], gf = Y(Gn, mf, (r) => {
  var { typed: e, matrix: t, divideScalar: a, multiplyScalar: n, subtractScalar: u, equalScalar: f, DenseMatrix: D } = r, c = At({ DenseMatrix: D });
  return e(Gn, { "SparseMatrix, Array | Matrix": function(p, v) {
    return o(p, v);
  }, "DenseMatrix, Array | Matrix": function(p, v) {
    return l(p, v);
  }, "Array, Array | Matrix": function(p, v) {
    var h = t(p), s = l(h, v);
    return s.map((m) => m.valueOf());
  } });
  function l(i, p) {
    for (var v = [c(i, p, true)._data.map((w) => w[0])], h = i._data, s = i._size[0], m = i._size[1], d = m - 1; d >= 0; d--) for (var E = v.length, A = 0; A < E; A++) {
      var b = v[A];
      if (f(h[d][d], 0)) if (f(b[d], 0)) {
        if (A === 0) {
          var g = [...b];
          g[d] = 1;
          for (var C = d - 1; C >= 0; C--) g[C] = u(g[C], h[C][d]);
          v.push(g);
        }
      } else {
        if (A === 0) return [];
        v.splice(A, 1), A -= 1, E -= 1;
      }
      else {
        b[d] = a(b[d], h[d][d]);
        for (var F = d - 1; F >= 0; F--) b[F] = u(b[F], n(b[d], h[F][d]));
      }
    }
    return v.map((w) => new D({ data: w.map((y) => [y]), size: [s, 1] }));
  }
  function o(i, p) {
    for (var v = [c(i, p, true)._data.map((Q) => Q[0])], h = i._size[0], s = i._size[1], m = i._values, d = i._index, E = i._ptr, A = s - 1; A >= 0; A--) for (var b = v.length, F = 0; F < b; F++) {
      for (var g = v[F], C = [], w = [], y = E[A], _ = E[A + 1], x = 0, B = _ - 1; B >= y; B--) {
        var T = d[B];
        T === A ? x = m[B] : T < A && (C.push(m[B]), w.push(T));
      }
      if (f(x, 0)) if (f(g[A], 0)) {
        if (F === 0) {
          var O = [...g];
          O[A] = 1;
          for (var M = 0, S = w.length; M < S; M++) {
            var q = w[M];
            O[q] = u(O[q], C[M]);
          }
          v.push(O);
        }
      } else {
        if (F === 0) return [];
        v.splice(F, 1), F -= 1, b -= 1;
      }
      else {
        g[A] = a(g[A], x);
        for (var N = 0, U = w.length; N < U; N++) {
          var z = w[N];
          g[z] = u(g[z], n(g[A], C[N]));
        }
      }
    }
    return v.map((Q) => new D({ data: Q.map((R) => [R]), size: [h, 1] }));
  }
}), ft = "equal", yf = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat", "SparseMatrix"], Af = Y(ft, yf, (r) => {
  var { typed: e, matrix: t, equalScalar: a, DenseMatrix: n, concat: u, SparseMatrix: f } = r, D = Me({ typed: e }), c = Le({ typed: e, SparseMatrix: f }), l = Se({ typed: e, DenseMatrix: n }), o = Fe({ typed: e, matrix: t, concat: u });
  return e(ft, Ff({ typed: e, equalScalar: a }), o({ elop: a, SS: c, DS: D, Ss: l }));
}), Ff = Y(ft, ["typed", "equalScalar"], (r) => {
  var { typed: e, equalScalar: t } = r;
  return e(ft, { "any, any": function(n, u) {
    return n === null ? u === null : u === null ? n === null : n === void 0 ? u === void 0 : u === void 0 ? n === void 0 : t(n, u);
  } });
}), ct = "smaller", Ef = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], wf = Y(ct, Ef, (r) => {
  var { typed: e, config: t, bignumber: a, matrix: n, DenseMatrix: u, concat: f, SparseMatrix: D } = r, c = Me({ typed: e }), l = Le({ typed: e, SparseMatrix: D }), o = Se({ typed: e, DenseMatrix: u }), i = Fe({ typed: e, matrix: n, concat: f }), p = Pe({ typed: e });
  function v(h, s) {
    return h.lt(s) && !Be(h, s, t.relTol, t.absTol);
  }
  return e(ct, bf({ typed: e, config: t }), { "boolean, boolean": (h, s) => h < s, "BigNumber, BigNumber": v, "bigint, bigint": (h, s) => h < s, "Fraction, Fraction": (h, s) => h.compare(s) === -1, "Fraction, BigNumber": function(s, m) {
    return v(a(s), m);
  }, "BigNumber, Fraction": function(s, m) {
    return v(s, a(m));
  }, "Complex, Complex": function(s, m) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, p, i({ SS: l, DS: c, Ss: o }));
}), bf = Y(ct, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(ct, { "number, number": function(n, u) {
    return n < u && !fe(n, u, t.relTol, t.absTol);
  } });
}), lt = "smallerEq", Cf = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], _f = Y(lt, Cf, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: u, SparseMatrix: f } = r, D = Me({ typed: e }), c = Le({ typed: e, SparseMatrix: f }), l = Se({ typed: e, DenseMatrix: n }), o = Fe({ typed: e, matrix: a, concat: u }), i = Pe({ typed: e });
  return e(lt, xf({ typed: e, config: t }), { "boolean, boolean": (p, v) => p <= v, "BigNumber, BigNumber": function(v, h) {
    return v.lte(h) || Be(v, h, t.relTol, t.absTol);
  }, "bigint, bigint": (p, v) => p <= v, "Fraction, Fraction": (p, v) => p.compare(v) !== 1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, i, o({ SS: c, DS: D, Ss: l }));
}), xf = Y(lt, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(lt, { "number, number": function(n, u) {
    return n <= u || fe(n, u, t.relTol, t.absTol);
  } });
}), vt = "larger", Bf = ["typed", "config", "bignumber", "matrix", "DenseMatrix", "concat", "SparseMatrix"], Sf = Y(vt, Bf, (r) => {
  var { typed: e, config: t, bignumber: a, matrix: n, DenseMatrix: u, concat: f, SparseMatrix: D } = r, c = Me({ typed: e }), l = Le({ typed: e, SparseMatrix: D }), o = Se({ typed: e, DenseMatrix: u }), i = Fe({ typed: e, matrix: n, concat: f }), p = Pe({ typed: e });
  function v(h, s) {
    return h.gt(s) && !Be(h, s, t.relTol, t.absTol);
  }
  return e(vt, Mf({ typed: e, config: t }), { "boolean, boolean": (h, s) => h > s, "BigNumber, BigNumber": v, "bigint, bigint": (h, s) => h > s, "Fraction, Fraction": (h, s) => h.compare(s) === 1, "Fraction, BigNumber": function(s, m) {
    return v(a(s), m);
  }, "BigNumber, Fraction": function(s, m) {
    return v(s, a(m));
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, p, i({ SS: l, DS: c, Ss: o }));
}), Mf = Y(vt, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(vt, { "number, number": function(n, u) {
    return n > u && !fe(n, u, t.relTol, t.absTol);
  } });
}), Dt = "largerEq", Nf = ["typed", "config", "matrix", "DenseMatrix", "concat", "SparseMatrix"], zf = Y(Dt, Nf, (r) => {
  var { typed: e, config: t, matrix: a, DenseMatrix: n, concat: u, SparseMatrix: f } = r, D = Me({ typed: e }), c = Le({ typed: e, SparseMatrix: f }), l = Se({ typed: e, DenseMatrix: n }), o = Fe({ typed: e, matrix: a, concat: u }), i = Pe({ typed: e });
  return e(Dt, Tf({ typed: e, config: t }), { "boolean, boolean": (p, v) => p >= v, "BigNumber, BigNumber": function(v, h) {
    return v.gte(h) || Be(v, h, t.relTol, t.absTol);
  }, "bigint, bigint": function(v, h) {
    return v >= h;
  }, "Fraction, Fraction": (p, v) => p.compare(v) !== -1, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  } }, i, o({ SS: c, DS: D, Ss: l }));
}), Tf = Y(Dt, ["typed", "config"], (r) => {
  var { typed: e, config: t } = r;
  return e(Dt, { "number, number": function(n, u) {
    return n >= u || fe(n, u, t.relTol, t.absTol);
  } });
}), $f = "ImmutableDenseMatrix", Of = ["smaller", "DenseMatrix"], If = Y($f, Of, (r) => {
  var { smaller: e, DenseMatrix: t } = r;
  function a(n, u) {
    if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
    if (u && !Kr(u)) throw new Error("Invalid datatype: " + u);
    if (dr(n) || Ar(n)) {
      var f = new t(n, u);
      this._data = f._data, this._size = f._size, this._datatype = f._datatype, this._min = null, this._max = null;
    } else if (n && Ar(n.data) && Ar(n.size)) this._data = n.data, this._size = n.size, this._datatype = n.datatype, this._min = typeof n.min < "u" ? n.min : null, this._max = typeof n.max < "u" ? n.max : null;
    else {
      if (n) throw new TypeError("Unsupported type of data (" + Qr(n) + ")");
      this._data = [], this._size = [0], this._datatype = u, this._min = null, this._max = null;
    }
  }
  return a.prototype = new t(), a.prototype.type = "ImmutableDenseMatrix", a.prototype.isImmutableDenseMatrix = true, a.prototype.subset = function(n) {
    switch (arguments.length) {
      case 1: {
        var u = t.prototype.subset.call(this, n);
        return dr(u) ? new a({ data: u._data, size: u._size, datatype: u._datatype }) : u;
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
    return new a({ data: pr(this._data), size: pr(this._size), datatype: this._datatype });
  }, a.prototype.toJSON = function() {
    return { mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
  }, a.fromJSON = function(n) {
    return new a(n);
  }, a.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, a.prototype.min = function() {
    if (this._min === null) {
      var n = null;
      this.forEach(function(u) {
        (n === null || e(u, n)) && (n = u);
      }), this._min = n !== null ? n : void 0;
    }
    return this._min;
  }, a.prototype.max = function() {
    if (this._max === null) {
      var n = null;
      this.forEach(function(u) {
        (n === null || e(n, u)) && (n = u);
      }), this._max = n !== null ? n : void 0;
    }
    return this._max;
  }, a;
}, { isClass: true }), qf = "Index", Uf = ["ImmutableDenseMatrix", "getMatrixDataType"], Rf = Y(qf, Uf, (r) => {
  var { ImmutableDenseMatrix: e, getMatrixDataType: t } = r;
  function a(u) {
    if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = true;
    for (var f = 0, D = arguments.length; f < D; f++) {
      var c = arguments[f], l = Ar(c), o = dr(c), i = typeof c, p = null;
      if (xa(c)) this._dimensions.push(c), this._isScalar = false;
      else if (l || o) {
        var v = void 0;
        t(c) === "boolean" ? (l && (v = n(Yn(c).valueOf())), o && (v = n(Yn(c._data).valueOf())), p = c.valueOf().length) : v = n(c.valueOf()), this._dimensions.push(v);
        var h = v.size();
        (h.length !== 1 || h[0] !== 1 || p !== null) && (this._isScalar = false);
      } else if (i === "number") this._dimensions.push(n([c]));
      else if (i === "bigint") this._dimensions.push(n([Number(c)]));
      else if (i === "string") this._dimensions.push(c);
      else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
      this._sourceSize.push(p);
    }
  }
  a.prototype.type = "Index", a.prototype.isIndex = true;
  function n(u) {
    for (var f = 0, D = u.length; f < D; f++) if (typeof u[f] != "number" || !Er(u[f])) throw new TypeError("Index parameters must be positive integer numbers");
    return new e(u);
  }
  return a.prototype.clone = function() {
    var u = new a();
    return u._dimensions = pr(this._dimensions), u._isScalar = this._isScalar, u._sourceSize = this._sourceSize, u;
  }, a.create = function(u) {
    var f = new a();
    return a.apply(f, u), f;
  }, a.prototype.size = function() {
    for (var u = [], f = 0, D = this._dimensions.length; f < D; f++) {
      var c = this._dimensions[f];
      u[f] = typeof c == "string" ? 1 : c.size()[0];
    }
    return u;
  }, a.prototype.max = function() {
    for (var u = [], f = 0, D = this._dimensions.length; f < D; f++) {
      var c = this._dimensions[f];
      u[f] = typeof c == "string" ? c : c.max();
    }
    return u;
  }, a.prototype.min = function() {
    for (var u = [], f = 0, D = this._dimensions.length; f < D; f++) {
      var c = this._dimensions[f];
      u[f] = typeof c == "string" ? c : c.min();
    }
    return u;
  }, a.prototype.forEach = function(u) {
    for (var f = 0, D = this._dimensions.length; f < D; f++) u(this._dimensions[f], f, this);
  }, a.prototype.dimension = function(u) {
    return typeof u != "number" ? null : this._dimensions[u] || null;
  }, a.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, a.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, a.prototype.isScalar = function() {
    return this._isScalar;
  }, a.prototype.toArray = function() {
    for (var u = [], f = 0, D = this._dimensions.length; f < D; f++) {
      var c = this._dimensions[f];
      u.push(typeof c == "string" ? c : c.toArray());
    }
    return u;
  }, a.prototype.valueOf = a.prototype.toArray, a.prototype.toString = function() {
    for (var u = [], f = 0, D = this._dimensions.length; f < D; f++) {
      var c = this._dimensions[f];
      typeof c == "string" ? u.push(JSON.stringify(c)) : u.push(c.toString());
    }
    return "[" + u.join(", ") + "]";
  }, a.prototype.toJSON = function() {
    return { mathjs: "Index", dimensions: this._dimensions };
  }, a.fromJSON = function(u) {
    return a.create(u.dimensions);
  }, a;
}, { isClass: true });
function Yn(r) {
  var e = [];
  return r.forEach((t, a) => {
    t && e.push(a);
  }), e;
}
var Pf = "FibonacciHeap", Lf = ["smaller", "larger"], Qf = Y(Pf, Lf, (r) => {
  var { smaller: e, larger: t } = r, a = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function n() {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  n.prototype.type = "FibonacciHeap", n.prototype.isFibonacciHeap = true, n.prototype.insert = function(o, i) {
    var p = { key: o, value: i, degree: 0 };
    if (this._minimum) {
      var v = this._minimum;
      p.left = v, p.right = v.right, v.right = p, p.right.left = p, e(o, v.key) && (this._minimum = p);
    } else p.left = p, p.right = p, this._minimum = p;
    return this._size++, p;
  }, n.prototype.size = function() {
    return this._size;
  }, n.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, n.prototype.isEmpty = function() {
    return this._size === 0;
  }, n.prototype.extractMinimum = function() {
    var o = this._minimum;
    if (o === null) return o;
    for (var i = this._minimum, p = o.degree, v = o.child; p > 0; ) {
      var h = v.right;
      v.left.right = v.right, v.right.left = v.left, v.left = i, v.right = i.right, i.right = v, v.right.left = v, v.parent = null, v = h, p--;
    }
    return o.left.right = o.right, o.right.left = o.left, o === o.right ? i = null : (i = o.right, i = l(i, this._size)), this._size--, this._minimum = i, o;
  }, n.prototype.remove = function(o) {
    this._minimum = u(this._minimum, o, -1), this.extractMinimum();
  };
  function u(o, i, p) {
    i.key = p;
    var v = i.parent;
    return v && e(i.key, v.key) && (f(o, i, v), D(o, v)), e(i.key, o.key) && (o = i), o;
  }
  function f(o, i, p) {
    i.left.right = i.right, i.right.left = i.left, p.degree--, p.child === i && (p.child = i.right), p.degree === 0 && (p.child = null), i.left = o, i.right = o.right, o.right = i, i.right.left = i, i.parent = null, i.mark = false;
  }
  function D(o, i) {
    var p = i.parent;
    p && (i.mark ? (f(o, i, p), D(p)) : i.mark = true);
  }
  var c = function(i, p) {
    i.left.right = i.right, i.right.left = i.left, i.parent = p, p.child ? (i.left = p.child, i.right = p.child.right, p.child.right = i, i.right.left = i) : (p.child = i, i.right = i, i.left = i), p.degree++, i.mark = false;
  };
  function l(o, i) {
    var p = Math.floor(Math.log(i) * a) + 1, v = new Array(p), h = 0, s = o;
    if (s) for (h++, s = s.right; s !== o; ) h++, s = s.right;
    for (var m; h > 0; ) {
      for (var d = s.degree, E = s.right; m = v[d], !!m; ) {
        if (t(s.key, m.key)) {
          var A = m;
          m = s, s = A;
        }
        c(m, s), v[d] = null, d++;
      }
      v[d] = s, s = E, h--;
    }
    o = null;
    for (var b = 0; b < p; b++) m = v[b], m && (o ? (m.left.right = m.right, m.right.left = m.left, m.left = o, m.right = o.right, o.right = m, m.right.left = m, e(m.key, o.key) && (o = m)) : o = m);
    return o;
  }
  return n;
}, { isClass: true }), Vf = "Spa", Zf = ["addScalar", "equalScalar", "FibonacciHeap"], Xf = Y(Vf, Zf, (r) => {
  var { addScalar: e, equalScalar: t, FibonacciHeap: a } = r;
  function n() {
    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new a();
  }
  return n.prototype.type = "Spa", n.prototype.isSpa = true, n.prototype.set = function(u, f) {
    if (this._values[u]) this._values[u].value = f;
    else {
      var D = this._heap.insert(u, f);
      this._values[u] = D;
    }
  }, n.prototype.get = function(u) {
    var f = this._values[u];
    return f ? f.value : 0;
  }, n.prototype.accumulate = function(u, f) {
    var D = this._values[u];
    D ? D.value = e(D.value, f) : (D = this._heap.insert(u, f), this._values[u] = D);
  }, n.prototype.forEach = function(u, f, D) {
    var c = this._heap, l = this._values, o = [], i = c.extractMinimum();
    for (i && o.push(i); i && i.key <= f; ) i.key >= u && (t(i.value, 0) || D(i.key, i.value, this)), i = c.extractMinimum(), i && o.push(i);
    for (var p = 0; p < o.length; p++) {
      var v = o[p];
      i = c.insert(v.key, v.value), l[i.key] = i;
    }
  }, n.prototype.swap = function(u, f) {
    var D = this._values[u], c = this._values[f];
    if (!D && c) D = this._heap.insert(u, c.value), this._heap.remove(c), this._values[u] = D, this._values[f] = void 0;
    else if (D && !c) c = this._heap.insert(f, D.value), this._heap.remove(D), this._values[f] = c, this._values[u] = void 0;
    else if (D && c) {
      var l = D.value;
      D.value = c.value, c.value = l;
    }
  }, n;
}, { isClass: true }), Kn = "sparse", Jf = ["typed", "SparseMatrix"], Gf = Y(Kn, Jf, (r) => {
  var { typed: e, SparseMatrix: t } = r;
  return e(Kn, { "": function() {
    return new t([]);
  }, string: function(n) {
    return new t([], n);
  }, "Array | Matrix": function(n) {
    return new t(n);
  }, "Array | Matrix, string": function(n, u) {
    return new t(n, u);
  } });
}), Yf = "atan", Kf = ["typed"], Wf = Y(Yf, Kf, (r) => {
  var { typed: e } = r;
  return e("atan", { number: function(a) {
    return Math.atan(a);
  }, Complex: function(a) {
    return a.atan();
  }, BigNumber: function(a) {
    return a.atan();
  } });
}), eu = Y("trigUnit", ["typed"], (r) => {
  var { typed: e } = r;
  return { Unit: e.referToSelf((t) => (a) => {
    if (!a.hasBase(a.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
    return e.find(t, a.valueType())(a.value);
  }) };
}), Wn = "cos", Hf = ["typed"], kf = Y(Wn, Hf, (r) => {
  var { typed: e } = r, t = eu({ typed: e });
  return e(Wn, { number: Math.cos, "Complex | BigNumber": (a) => a.cos() }, t);
}), Hn = "sin", jf = ["typed"], rc = Y(Hn, jf, (r) => {
  var { typed: e } = r, t = eu({ typed: e });
  return e(Hn, { number: Math.sin, "Complex | BigNumber": (a) => a.sin() }, t);
}), kn = "add", ec = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], tc = Y(kn, ec, (r) => {
  var { typed: e, matrix: t, addScalar: a, equalScalar: n, DenseMatrix: u, SparseMatrix: f, concat: D } = r, c = Ha({ typed: e }), l = ts({ typed: e, equalScalar: n }), o = ka({ typed: e, DenseMatrix: u }), i = Fe({ typed: e, matrix: t, concat: D });
  return e(kn, { "any, any": a, "any, any, ...any": e.referToSelf((p) => (v, h, s) => {
    for (var m = p(v, h), d = 0; d < s.length; d++) m = p(m, s[d]);
    return m;
  }) }, i({ elop: a, DS: c, SS: l, Ss: o }));
}), jn = "norm", nc = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], ac = Y(jn, nc, (r) => {
  var { typed: e, abs: t, add: a, pow: n, conj: u, sqrt: f, multiply: D, equalScalar: c, larger: l, smaller: o, matrix: i, ctranspose: p, eigs: v } = r;
  return e(jn, { number: Math.abs, Complex: function(w) {
    return w.abs();
  }, BigNumber: function(w) {
    return w.abs();
  }, boolean: function(w) {
    return Math.abs(w);
  }, Array: function(w) {
    return g(i(w), 2);
  }, Matrix: function(w) {
    return g(w, 2);
  }, "Array, number | BigNumber | string": function(w, y) {
    return g(i(w), y);
  }, "Matrix, number | BigNumber | string": function(w, y) {
    return g(w, y);
  } });
  function h(C) {
    var w = 0;
    return C.forEach(function(y) {
      var _ = t(y);
      l(_, w) && (w = _);
    }, true), w;
  }
  function s(C) {
    var w;
    return C.forEach(function(y) {
      var _ = t(y);
      (!w || o(_, w)) && (w = _);
    }, true), w || 0;
  }
  function m(C, w) {
    if (w === Number.POSITIVE_INFINITY || w === "inf") return h(C);
    if (w === Number.NEGATIVE_INFINITY || w === "-inf") return s(C);
    if (w === "fro") return g(C, 2);
    if (typeof w == "number" && !isNaN(w)) {
      if (!c(w, 0)) {
        var y = 0;
        return C.forEach(function(_) {
          y = a(n(t(_), w), y);
        }, true), n(y, 1 / w);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function d(C) {
    var w = 0;
    return C.forEach(function(y, _) {
      w = a(w, D(y, u(y)));
    }), t(f(w));
  }
  function E(C) {
    var w = [], y = 0;
    return C.forEach(function(_, x) {
      var B = x[1], T = a(w[B] || 0, t(_));
      l(T, y) && (y = T), w[B] = T;
    }, true), y;
  }
  function A(C) {
    var w = C.size();
    if (w[0] !== w[1]) throw new RangeError("Invalid matrix dimensions");
    var y = p(C), _ = D(y, C), x = v(_).values.toArray(), B = x[x.length - 1];
    return t(f(B));
  }
  function b(C) {
    var w = [], y = 0;
    return C.forEach(function(_, x) {
      var B = x[0], T = a(w[B] || 0, t(_));
      l(T, y) && (y = T), w[B] = T;
    }, true), y;
  }
  function F(C, w) {
    if (w === 1) return E(C);
    if (w === Number.POSITIVE_INFINITY || w === "inf") return b(C);
    if (w === "fro") return d(C);
    if (w === 2) return A(C);
    throw new Error("Unsupported parameter value " + w);
  }
  function g(C, w) {
    var y = C.size();
    if (y.length === 1) return m(C, w);
    if (y.length === 2) {
      if (y[0] && y[1]) return F(C, w);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), ra = "dot", uc = ["typed", "addScalar", "multiplyScalar", "conj", "size"], ic = Y(ra, uc, (r) => {
  var { typed: e, addScalar: t, multiplyScalar: a, conj: n, size: u } = r;
  return e(ra, { "Array | DenseMatrix, Array | DenseMatrix": D, "SparseMatrix, SparseMatrix": c });
  function f(o, i) {
    var p = l(o), v = l(i), h, s;
    if (p.length === 1) h = p[0];
    else if (p.length === 2 && p[1] === 1) h = p[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
    if (v.length === 1) s = v[0];
    else if (v.length === 2 && v[1] === 1) s = v[0];
    else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
    if (h !== s) throw new RangeError("Vectors must have equal length (" + h + " != " + s + ")");
    if (h === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return h;
  }
  function D(o, i) {
    var p = f(o, i), v = dr(o) ? o._data : o, h = dr(o) ? o._datatype || o.getDataType() : void 0, s = dr(i) ? i._data : i, m = dr(i) ? i._datatype || i.getDataType() : void 0, d = l(o).length === 2, E = l(i).length === 2, A = t, b = a;
    if (h && m && h === m && typeof h == "string" && h !== "mixed") {
      var F = h;
      A = e.find(t, [F, F]), b = e.find(a, [F, F]);
    }
    if (!d && !E) {
      for (var g = b(n(v[0]), s[0]), C = 1; C < p; C++) g = A(g, b(n(v[C]), s[C]));
      return g;
    }
    if (!d && E) {
      for (var w = b(n(v[0]), s[0][0]), y = 1; y < p; y++) w = A(w, b(n(v[y]), s[y][0]));
      return w;
    }
    if (d && !E) {
      for (var _ = b(n(v[0][0]), s[0]), x = 1; x < p; x++) _ = A(_, b(n(v[x][0]), s[x]));
      return _;
    }
    if (d && E) {
      for (var B = b(n(v[0][0]), s[0][0]), T = 1; T < p; T++) B = A(B, b(n(v[T][0]), s[T][0]));
      return B;
    }
  }
  function c(o, i) {
    f(o, i);
    for (var p = o._index, v = o._values, h = i._index, s = i._values, m = 0, d = t, E = a, A = 0, b = 0; A < p.length && b < h.length; ) {
      var F = p[A], g = h[b];
      if (F < g) {
        A++;
        continue;
      }
      if (F > g) {
        b++;
        continue;
      }
      F === g && (m = d(m, E(v[A], s[b])), A++, b++);
    }
    return m;
  }
  function l(o) {
    return dr(o) ? o.size() : u(o);
  }
}), ea = "index", oc = ["typed", "Index"], sc = Y(ea, oc, (r) => {
  var { typed: e, Index: t } = r;
  return e(ea, { "...number | string | BigNumber | Range | Array | Matrix": function(n) {
    var u = n.map(function(D) {
      return Cr(D) ? D.toNumber() : Ar(D) || dr(D) ? D.map(function(c) {
        return Cr(c) ? c.toNumber() : c;
      }) : D;
    }), f = new t();
    return t.apply(f, u), f;
  } });
}), ta = "lup", fc = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], cc = Y(ta, fc, (r) => {
  var { typed: e, matrix: t, abs: a, addScalar: n, divideScalar: u, multiplyScalar: f, subtractScalar: D, larger: c, equalScalar: l, unaryMinus: o, DenseMatrix: i, SparseMatrix: p, Spa: v } = r;
  return e(ta, { DenseMatrix: function(d) {
    return h(d);
  }, SparseMatrix: function(d) {
    return s(d);
  }, Array: function(d) {
    var E = t(d), A = h(E);
    return { L: A.L.valueOf(), U: A.U.valueOf(), p: A.p };
  } });
  function h(m) {
    var d = m._size[0], E = m._size[1], A = Math.min(d, E), b = pr(m._data), F = [], g = [d, A], C = [], w = [A, E], y, _, x, B = [];
    for (y = 0; y < d; y++) B[y] = y;
    for (_ = 0; _ < E; _++) {
      if (_ > 0) for (y = 0; y < d; y++) {
        var T = Math.min(y, _), N = 0;
        for (x = 0; x < T; x++) N = n(N, f(b[y][x], b[x][_]));
        b[y][_] = D(b[y][_], N);
      }
      var U = _, z = 0, O = 0;
      for (y = _; y < d; y++) {
        var M = b[y][_], S = a(M);
        c(S, z) && (U = y, z = S, O = M);
      }
      if (_ !== U && (B[_] = [B[U], B[U] = B[_]][0], i._swapRows(_, U, b)), _ < d) for (y = _ + 1; y < d; y++) {
        var q = b[y][_];
        l(q, 0) || (b[y][_] = u(b[y][_], O));
      }
    }
    for (_ = 0; _ < E; _++) for (y = 0; y < d; y++) {
      if (_ === 0 && (y < E && (C[y] = []), F[y] = []), y < _) {
        y < E && (C[y][_] = b[y][_]), _ < d && (F[y][_] = 0);
        continue;
      }
      if (y === _) {
        y < E && (C[y][_] = b[y][_]), _ < d && (F[y][_] = 1);
        continue;
      }
      y < E && (C[y][_] = 0), _ < d && (F[y][_] = b[y][_]);
    }
    var Q = new i({ data: F, size: g }), R = new i({ data: C, size: w }), $ = [];
    for (y = 0, A = B.length; y < A; y++) $[B[y]] = y;
    return { L: Q, U: R, p: $, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
  function s(m) {
    var d = m._size[0], E = m._size[1], A = Math.min(d, E), b = m._values, F = m._index, g = m._ptr, C = [], w = [], y = [], _ = [d, A], x = [], B = [], T = [], N = [A, E], U, z, O, M = [], S = [];
    for (U = 0; U < d; U++) M[U] = U, S[U] = U;
    var q = function($, I) {
      var G = S[$], V = S[I];
      M[G] = I, M[V] = $, S[$] = V, S[I] = G;
    }, Q = function() {
      var $ = new v();
      z < d && (y.push(C.length), C.push(1), w.push(z)), T.push(x.length);
      var I = g[z], G = g[z + 1];
      for (O = I; O < G; O++) U = F[O], $.set(M[U], b[O]);
      z > 0 && $.forEach(0, z - 1, function(X, Z) {
        p._forEachRow(X, C, w, y, function(K, J) {
          K > X && $.accumulate(K, o(f(J, Z)));
        });
      });
      var V = z, P = $.get(z), L = a(P);
      $.forEach(z + 1, d - 1, function(X, Z) {
        var K = a(Z);
        c(K, L) && (V = X, L = K, P = Z);
      }), z !== V && (p._swapRows(z, V, _[1], C, w, y), p._swapRows(z, V, N[1], x, B, T), $.swap(z, V), q(z, V)), $.forEach(0, d - 1, function(X, Z) {
        X <= z ? (x.push(Z), B.push(X)) : (Z = u(Z, P), l(Z, 0) || (C.push(Z), w.push(X)));
      });
    };
    for (z = 0; z < E; z++) Q();
    return T.push(x.length), y.push(C.length), { L: new p({ values: C, index: w, ptr: y, size: _ }), U: new p({ values: x, index: B, ptr: T, size: N }), p: M, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
    } };
  }
}), na = "qr", lc = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], vc = Y(na, lc, (r) => {
  var { typed: e, matrix: t, zeros: a, identity: n, isZero: u, equal: f, sign: D, sqrt: c, conj: l, unaryMinus: o, addScalar: i, divideScalar: p, multiplyScalar: v, subtractScalar: h, complex: s } = r;
  return pt(e(na, { DenseMatrix: function(b) {
    return d(b);
  }, SparseMatrix: function(b) {
    return E();
  }, Array: function(b) {
    var F = t(b), g = d(F);
    return { Q: g.Q.valueOf(), R: g.R.valueOf() };
  } }), { _denseQRimpl: m });
  function m(A) {
    var b = A._size[0], F = A._size[1], g = n([b], "dense"), C = g._data, w = A.clone(), y = w._data, _, x, B, T = a([b], "");
    for (B = 0; B < Math.min(F, b); ++B) {
      var N = y[B][B], U = o(f(N, 0) ? 1 : D(N)), z = l(U), O = 0;
      for (_ = B; _ < b; _++) O = i(O, v(y[_][B], l(y[_][B])));
      var M = v(U, c(O));
      if (!u(M)) {
        var S = h(N, M);
        for (T[B] = 1, _ = B + 1; _ < b; _++) T[_] = p(y[_][B], S);
        var q = o(l(p(S, M))), Q = void 0;
        for (x = B; x < F; x++) {
          for (Q = 0, _ = B; _ < b; _++) Q = i(Q, v(l(T[_]), y[_][x]));
          for (Q = v(Q, q), _ = B; _ < b; _++) y[_][x] = v(h(y[_][x], v(T[_], Q)), z);
        }
        for (_ = 0; _ < b; _++) {
          for (Q = 0, x = B; x < b; x++) Q = i(Q, v(C[_][x], T[x]));
          for (Q = v(Q, q), x = B; x < b; ++x) C[_][x] = p(h(C[_][x], v(Q, l(T[x]))), z);
        }
      }
    }
    return { Q: g, R: w, toString: function() {
      return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
    } };
  }
  function d(A) {
    var b = m(A), F = b.R._data;
    if (A._data.length > 0) for (var g = F[0][0].type === "Complex" ? s(0) : 0, C = 0; C < F.length; ++C) for (var w = 0; w < C && w < (F[0] || []).length; ++w) F[C][w] = g;
    return b;
  }
  function E(A) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function Dc(r, e, t, a) {
  r._values;
  for (var n = r._index, u = r._ptr, f = r._size, D = r._datatype, c = f[0], l = f[1], o = null, i = [], p = [], v = 0, h = 0; h < l; h++) {
    p[h] = v;
    for (var s = t ? t[h] : h, m = u[s], d = u[s + 1], E = m; E < d; E++) {
      var A = n[E];
      i[v] = A, v++;
    }
  }
  return p[l] = v, r.createSparseMatrix({ values: o, index: i, ptr: p, size: [c, l], datatype: D });
}
function tu(r, e, t, a, n, u, f) {
  var D = 0;
  for (t[f] = r; D >= 0; ) {
    var c = t[f + D], l = t[a + c];
    l === -1 ? (D--, u[e++] = c) : (t[a + c] = t[n + l], ++D, t[f + D] = l);
  }
  return e;
}
function pc(r, e) {
  if (!r) return null;
  var t = 0, a, n = [], u = [], f = 0, D = e, c = 2 * e;
  for (a = 0; a < e; a++) u[f + a] = -1;
  for (a = e - 1; a >= 0; a--) r[a] !== -1 && (u[D + a] = u[f + r[a]], u[f + r[a]] = a);
  for (a = 0; a < e; a++) r[a] === -1 && (t = tu(a, t, u, f, D, n, c));
  return n;
}
function hc(r, e) {
  if (!r) return null;
  var t = r._index, a = r._ptr, n = r._size, u = n[0], f = n[1], D = [], c = [], l = 0, o = f, i, p;
  for (i = 0; i < u; i++) c[o + i] = -1;
  for (var v = 0; v < f; v++) {
    D[v] = -1, c[l + v] = -1;
    for (var h = a[v], s = a[v + 1], m = h; m < s; m++) {
      var d = t[m];
      for (i = c[o + d]; i !== -1 && i < v; i = p) p = c[l + i], c[l + i] = v, p === -1 && (D[i] = v);
      c[o + d] = v;
    }
  }
  return D;
}
function dc(r, e, t) {
  for (var a = r._values, n = r._index, u = r._ptr, f = r._size, D = f[1], c = 0, l = 0; l < D; l++) {
    var o = u[l];
    for (u[l] = c; o < u[l + 1]; o++) e(n[o], l, a ? a[o] : 1, t) && (n[c] = n[o], a && (a[c] = a[o]), c++);
  }
  return u[D] = c, n.splice(c, n.length - c), a && a.splice(c, a.length - c), c;
}
function De(r) {
  return -r - 2;
}
var mc = "csAmd", gc = ["add", "multiply", "transpose"], yc = Y(mc, gc, (r) => {
  var { add: e, multiply: t, transpose: a } = r;
  return function(o, i) {
    if (!i || o <= 0 || o > 3) return null;
    var p = i._size, v = p[0], h = p[1], s = 0, m = Math.max(16, 10 * Math.sqrt(h));
    m = Math.min(h - 2, m);
    var d = n(o, i, v, h, m);
    dc(d, c, null);
    for (var E = d._index, A = d._ptr, b = A[h], F = [], g = [], C = 0, w = h + 1, y = 2 * (h + 1), _ = 3 * (h + 1), x = 4 * (h + 1), B = 5 * (h + 1), T = 6 * (h + 1), N = 7 * (h + 1), U = F, z = u(h, A, g, C, _, U, y, N, w, T, x, B), O = f(h, A, g, B, x, T, m, w, _, U, y), M = 0, S, q, Q, R, $, I, G, V, P, L, X, Z, K, J, k, W; O < h; ) {
      for (Q = -1; M < h && (Q = g[_ + M]) === -1; M++) ;
      g[y + Q] !== -1 && (U[g[y + Q]] = -1), g[_ + M] = g[y + Q];
      var nr = g[x + Q], ar = g[w + Q];
      O += ar;
      var ir = 0;
      g[w + Q] = -ar;
      var er = A[Q], sr = nr === 0 ? er : b, fr = sr;
      for (R = 1; R <= nr + 1; R++) {
        for (R > nr ? (I = Q, G = er, V = g[C + Q] - nr) : (I = E[er++], G = A[I], V = g[C + I]), $ = 1; $ <= V; $++) S = E[G++], !((P = g[w + S]) <= 0) && (ir += P, g[w + S] = -P, E[fr++] = S, g[y + S] !== -1 && (U[g[y + S]] = U[S]), U[S] !== -1 ? g[y + U[S]] = g[y + S] : g[_ + g[B + S]] = g[y + S]);
        I !== Q && (A[I] = De(Q), g[T + I] = 0);
      }
      for (nr !== 0 && (b = fr), g[B + Q] = ir, A[Q] = sr, g[C + Q] = fr - sr, g[x + Q] = -2, z = D(z, s, g, T, h), L = sr; L < fr; L++) if (S = E[L], !((X = g[x + S]) <= 0)) {
        P = -g[w + S];
        var Dr = z - P;
        for (er = A[S], Z = A[S] + X - 1; er <= Z; er++) I = E[er], g[T + I] >= z ? g[T + I] -= P : g[T + I] !== 0 && (g[T + I] = g[B + I] + Dr);
      }
      for (L = sr; L < fr; L++) {
        for (S = E[L], Z = A[S], K = Z + g[x + S] - 1, J = Z, k = 0, W = 0, er = Z; er <= K; er++) if (I = E[er], g[T + I] !== 0) {
          var Br = g[T + I] - z;
          Br > 0 ? (W += Br, E[J++] = I, k += I) : (A[I] = De(Q), g[T + I] = 0);
        }
        g[x + S] = J - Z + 1;
        var _r = J, wr = Z + g[C + S];
        for (er = K + 1; er < wr; er++) {
          q = E[er];
          var Ur = g[w + q];
          Ur <= 0 || (W += Ur, E[J++] = q, k += q);
        }
        W === 0 ? (A[S] = De(Q), P = -g[w + S], ir -= P, ar += P, O += P, g[w + S] = 0, g[x + S] = -1) : (g[B + S] = Math.min(g[B + S], W), E[J] = E[_r], E[_r] = E[Z], E[Z] = Q, g[C + S] = J - Z + 1, k = (k < 0 ? -k : k) % h, g[y + S] = g[N + k], g[N + k] = S, U[S] = k);
      }
      for (g[B + Q] = ir, s = Math.max(s, ir), z = D(z + s, s, g, T, h), L = sr; L < fr; L++) if (S = E[L], !(g[w + S] >= 0)) for (k = U[S], S = g[N + k], g[N + k] = -1; S !== -1 && g[y + S] !== -1; S = g[y + S], z++) {
        for (V = g[C + S], X = g[x + S], er = A[S] + 1; er <= A[S] + V - 1; er++) g[T + E[er]] = z;
        var Mr = S;
        for (q = g[y + S]; q !== -1; ) {
          var Or = g[C + q] === V && g[x + q] === X;
          for (er = A[q] + 1; Or && er <= A[q] + V - 1; er++) g[T + E[er]] !== z && (Or = 0);
          Or ? (A[q] = De(S), g[w + S] += g[w + q], g[w + q] = 0, g[x + q] = -1, q = g[y + q], g[y + Mr] = q) : (Mr = q, q = g[y + q]);
        }
      }
      for (er = sr, L = sr; L < fr; L++) S = E[L], !((P = -g[w + S]) <= 0) && (g[w + S] = P, W = g[B + S] + ir - P, W = Math.min(W, h - O - P), g[_ + W] !== -1 && (U[g[_ + W]] = S), g[y + S] = g[_ + W], U[S] = -1, g[_ + W] = S, M = Math.min(M, W), g[B + S] = W, E[er++] = S);
      g[w + Q] = ar, (g[C + Q] = er - sr) === 0 && (A[Q] = -1, g[T + Q] = 0), nr !== 0 && (b = er);
    }
    for (S = 0; S < h; S++) A[S] = De(A[S]);
    for (q = 0; q <= h; q++) g[_ + q] = -1;
    for (q = h; q >= 0; q--) g[w + q] > 0 || (g[y + q] = g[_ + A[q]], g[_ + A[q]] = q);
    for (I = h; I >= 0; I--) g[w + I] <= 0 || A[I] !== -1 && (g[y + I] = g[_ + A[I]], g[_ + A[I]] = I);
    for (Q = 0, S = 0; S <= h; S++) A[S] === -1 && (Q = tu(S, Q, g, _, y, F, T));
    return F.splice(F.length - 1, 1), F;
  };
  function n(l, o, i, p, v) {
    var h = a(o);
    if (l === 1 && p === i) return e(o, h);
    if (l === 2) {
      for (var s = h._index, m = h._ptr, d = 0, E = 0; E < i; E++) {
        var A = m[E];
        if (m[E] = d, !(m[E + 1] - A > v)) for (var b = m[E + 1]; A < b; A++) s[d++] = s[A];
      }
      return m[i] = d, o = a(h), t(h, o);
    }
    return t(h, o);
  }
  function u(l, o, i, p, v, h, s, m, d, E, A, b) {
    for (var F = 0; F < l; F++) i[p + F] = o[F + 1] - o[F];
    i[p + l] = 0;
    for (var g = 0; g <= l; g++) i[v + g] = -1, h[g] = -1, i[s + g] = -1, i[m + g] = -1, i[d + g] = 1, i[E + g] = 1, i[A + g] = 0, i[b + g] = i[p + g];
    var C = D(0, 0, i, E, l);
    return i[A + l] = -2, o[l] = -1, i[E + l] = 0, C;
  }
  function f(l, o, i, p, v, h, s, m, d, E, A) {
    for (var b = 0, F = 0; F < l; F++) {
      var g = i[p + F];
      if (g === 0) i[v + F] = -2, b++, o[F] = -1, i[h + F] = 0;
      else if (g > s) i[m + F] = 0, i[v + F] = -1, b++, o[F] = De(l), i[m + l]++;
      else {
        var C = i[d + g];
        C !== -1 && (E[C] = F), i[A + F] = i[d + g], i[d + g] = F;
      }
    }
    return b;
  }
  function D(l, o, i, p, v) {
    if (l < 2 || l + o < 0) {
      for (var h = 0; h < v; h++) i[p + h] !== 0 && (i[p + h] = 1);
      l = 2;
    }
    return l;
  }
  function c(l, o) {
    return l !== o;
  }
});
function Ac(r, e, t, a, n, u, f) {
  var D, c, l = 0, o;
  if (r <= e || t[a + e] <= t[n + r]) return -1;
  t[n + r] = t[a + e];
  var i = t[u + r];
  if (t[u + r] = e, i === -1) l = 1, o = r;
  else {
    for (l = 2, o = i; o !== t[f + o]; o = t[f + o]) ;
    for (D = i; D !== o; D = c) c = t[f + D], t[f + D] = o;
  }
  return { jleaf: l, q: o };
}
var Fc = "csCounts", Ec = ["transpose"], wc = Y(Fc, Ec, (r) => {
  var { transpose: e } = r;
  return function(t, a, n, u) {
    if (!t || !a || !n) return null;
    var f = t._size, D = f[0], c = f[1], l, o, i, p, v, h, s, m = 4 * c + (u ? c + D + 1 : 0), d = [], E = 0, A = c, b = 2 * c, F = 3 * c, g = 4 * c, C = 5 * c + 1;
    for (i = 0; i < m; i++) d[i] = -1;
    var w = [], y = e(t), _ = y._index, x = y._ptr;
    for (i = 0; i < c; i++) for (o = n[i], w[o] = d[F + o] === -1 ? 1 : 0; o !== -1 && d[F + o] === -1; o = a[o]) d[F + o] = i;
    if (u) {
      for (i = 0; i < c; i++) d[n[i]] = i;
      for (l = 0; l < D; l++) {
        for (i = c, h = x[l], s = x[l + 1], v = h; v < s; v++) i = Math.min(i, d[_[v]]);
        d[C + l] = d[g + i], d[g + i] = l;
      }
    }
    for (l = 0; l < c; l++) d[E + l] = l;
    for (i = 0; i < c; i++) {
      for (o = n[i], a[o] !== -1 && w[a[o]]--, p = u ? d[g + i] : o; p !== -1; p = u ? d[C + p] : -1) for (v = x[p]; v < x[p + 1]; v++) {
        l = _[v];
        var B = Ac(l, o, d, F, A, b, E);
        B.jleaf >= 1 && w[o]++, B.jleaf === 2 && w[B.q]--;
      }
      a[o] !== -1 && (d[E + o] = a[o]);
    }
    for (o = 0; o < c; o++) a[o] !== -1 && (w[a[o]] += w[o]);
    return w;
  };
}), bc = "csSqr", Cc = ["add", "multiply", "transpose"], _c = Y(bc, Cc, (r) => {
  var { add: e, multiply: t, transpose: a } = r, n = yc({ add: e, multiply: t, transpose: a }), u = wc({ transpose: a });
  return function(c, l, o) {
    var i = l._ptr, p = l._size, v = p[1], h, s = {};
    if (s.q = n(c, l), c && !s.q) return null;
    if (o) {
      var m = c ? Dc(l, null, s.q) : l;
      s.parent = hc(m);
      var d = pc(s.parent, v);
      if (s.cp = u(m, s.parent, d, 1), m && s.parent && s.cp && f(m, s)) for (s.unz = 0, h = 0; h < v; h++) s.unz += s.cp[h];
    } else s.unz = 4 * i[v] + v, s.lnz = s.unz;
    return s;
  };
  function f(D, c) {
    var l = D._ptr, o = D._index, i = D._size, p = i[0], v = i[1];
    c.pinv = [], c.leftmost = [];
    var h = c.parent, s = c.pinv, m = c.leftmost, d = [], E = 0, A = p, b = p + v, F = p + 2 * v, g, C, w, y, _;
    for (C = 0; C < v; C++) d[A + C] = -1, d[b + C] = -1, d[F + C] = 0;
    for (g = 0; g < p; g++) m[g] = -1;
    for (C = v - 1; C >= 0; C--) for (y = l[C], _ = l[C + 1], w = y; w < _; w++) m[o[w]] = C;
    for (g = p - 1; g >= 0; g--) s[g] = -1, C = m[g], C !== -1 && (d[F + C]++ === 0 && (d[b + C] = g), d[E + g] = d[A + C], d[A + C] = g);
    for (c.lnz = 0, c.m2 = p, C = 0; C < v; C++) if (g = d[A + C], c.lnz++, g < 0 && (g = c.m2++), s[g] = C, !(--F[C] <= 0)) {
      c.lnz += d[F + C];
      var x = h[C];
      x !== -1 && (d[F + x] === 0 && (d[b + x] = d[b + C]), d[E + d[b + C]] = d[A + x], d[A + x] = d[E + g], d[F + x] += d[F + C]);
    }
    for (g = 0; g < p; g++) s[g] < 0 && (s[g] = C++);
    return true;
  }
});
function Tt(r, e) {
  return r[e] < 0;
}
function nu(r, e) {
  r[e] = De(r[e]);
}
function aa(r) {
  return r < 0 ? De(r) : r;
}
function xc(r, e, t, a, n) {
  var u = e._index, f = e._ptr, D = e._size, c = D[1], l, o, i, p = 0;
  for (a[0] = r; p >= 0; ) {
    r = a[p];
    var v = n ? n[r] : r;
    Tt(f, r) || (nu(f, r), a[c + p] = v < 0 ? 0 : aa(f[v]));
    var h = 1;
    for (o = a[c + p], i = v < 0 ? 0 : aa(f[v + 1]); o < i; o++) if (l = u[o], !Tt(f, l)) {
      a[c + p] = o, a[++p] = l, h = 0;
      break;
    }
    h && (p--, a[--t] = r);
  }
  return t;
}
function Bc(r, e, t, a, n) {
  var u = r._ptr, f = r._size, D = e._index, c = e._ptr, l = f[1], o, i, p, v = l;
  for (i = c[t], p = c[t + 1], o = i; o < p; o++) {
    var h = D[o];
    Tt(u, h) || (v = xc(h, r, v, a, n));
  }
  for (o = v; o < l; o++) nu(u, a[o]);
  return v;
}
var Sc = "csSpsolve", Mc = ["divideScalar", "multiply", "subtract"], Nc = Y(Sc, Mc, (r) => {
  var { divideScalar: e, multiply: t, subtract: a } = r;
  return function(u, f, D, c, l, o, i) {
    var p = u._values, v = u._index, h = u._ptr, s = u._size, m = s[1], d = f._values, E = f._index, A = f._ptr, b, F, g, C, w = Bc(u, f, D, c, o);
    for (b = w; b < m; b++) l[c[b]] = 0;
    for (F = A[D], g = A[D + 1], b = F; b < g; b++) l[E[b]] = d[b];
    for (var y = w; y < m; y++) {
      var _ = c[y], x = o ? o[_] : _;
      if (!(x < 0)) for (F = h[x], g = h[x + 1], l[_] = e(l[_], p[i ? F : g - 1]), b = i ? F + 1 : F, C = i ? g : g - 1; b < C; b++) {
        var B = v[b];
        l[B] = a(l[B], t(p[b], l[_]));
      }
    }
    return w;
  };
}), zc = "csLu", Tc = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], $c = Y(zc, Tc, (r) => {
  var { abs: e, divideScalar: t, multiply: a, subtract: n, larger: u, largerEq: f, SparseMatrix: D } = r, c = Nc({ divideScalar: t, multiply: a, subtract: n });
  return function(o, i, p) {
    if (!o) return null;
    var v = o._size, h = v[1], s, m = 100, d = 100;
    i && (s = i.q, m = i.lnz || m, d = i.unz || d);
    var E = [], A = [], b = [], F = new D({ values: E, index: A, ptr: b, size: [h, h] }), g = [], C = [], w = [], y = new D({ values: g, index: C, ptr: w, size: [h, h] }), _ = [], x, B, T = [], N = [];
    for (x = 0; x < h; x++) T[x] = 0, _[x] = -1, b[x + 1] = 0;
    m = 0, d = 0;
    for (var U = 0; U < h; U++) {
      b[U] = m, w[U] = d;
      var z = s ? s[U] : U, O = c(F, o, z, N, T, _, 1), M = -1, S = -1;
      for (B = O; B < h; B++) if (x = N[B], _[x] < 0) {
        var q = e(T[x]);
        u(q, S) && (S = q, M = x);
      } else C[d] = _[x], g[d++] = T[x];
      if (M === -1 || S <= 0) return null;
      _[z] < 0 && f(e(T[z]), a(S, p)) && (M = z);
      var Q = T[M];
      for (C[d] = U, g[d++] = Q, _[M] = U, A[m] = M, E[m++] = 1, B = O; B < h; B++) x = N[B], _[x] < 0 && (A[m] = x, E[m++] = t(T[x], Q)), T[x] = 0;
    }
    for (b[h] = m, w[h] = d, B = 0; B < m; B++) A[B] = _[A[B]];
    return E.splice(m, E.length - m), A.splice(m, A.length - m), g.splice(d, g.length - d), C.splice(d, C.length - d), { L: F, U: y, pinv: _ };
  };
}), ua = "slu", Oc = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], Ic = Y(ua, Oc, (r) => {
  var { typed: e, abs: t, add: a, multiply: n, transpose: u, divideScalar: f, subtract: D, larger: c, largerEq: l, SparseMatrix: o } = r, i = _c({ add: a, multiply: n, transpose: u }), p = $c({ abs: t, divideScalar: f, multiply: n, subtract: D, larger: c, largerEq: l, SparseMatrix: o });
  return e(ua, { "SparseMatrix, number, number": function(h, s, m) {
    if (!Er(s) || s < 0 || s > 3) throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
    if (m < 0 || m > 1) throw new Error("Partial pivoting threshold must be a number from 0 to 1");
    var d = i(s, h, false), E = p(h, d, m);
    return { L: E.L, U: E.U, p: E.pinv, q: d.q, toString: function() {
      return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
    } };
  } });
});
function ia(r, e) {
  var t, a = e.length, n = [];
  if (r) for (t = 0; t < a; t++) n[r[t]] = e[t];
  else for (t = 0; t < a; t++) n[t] = e[t];
  return n;
}
var oa = "lusolve", qc = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], Uc = Y(oa, qc, (r) => {
  var { typed: e, matrix: t, lup: a, slu: n, usolve: u, lsolve: f, DenseMatrix: D } = r, c = At({ DenseMatrix: D });
  return e(oa, { "Array, Array | Matrix": function(p, v) {
    p = t(p);
    var h = a(p), s = o(h.L, h.U, h.p, null, v);
    return s.valueOf();
  }, "DenseMatrix, Array | Matrix": function(p, v) {
    var h = a(p);
    return o(h.L, h.U, h.p, null, v);
  }, "SparseMatrix, Array | Matrix": function(p, v) {
    var h = a(p);
    return o(h.L, h.U, h.p, null, v);
  }, "SparseMatrix, Array | Matrix, number, number": function(p, v, h, s) {
    var m = n(p, h, s);
    return o(m.L, m.U, m.p, m.q, v);
  }, "Object, Array | Matrix": function(p, v) {
    return o(p.L, p.U, p.p, p.q, v);
  } });
  function l(i) {
    if (dr(i)) return i;
    if (Ar(i)) return t(i);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function o(i, p, v, h, s) {
    i = l(i), p = l(p), v && (s = c(i, s, true), s._data = ia(v, s._data));
    var m = f(i, s), d = u(p, m);
    return h && (d._data = ia(h, d._data)), d;
  }
}), sa = "det", Rc = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], Pc = Y(sa, Rc, (r) => {
  var { typed: e, matrix: t, subtractScalar: a, multiply: n, divideScalar: u, isZero: f, unaryMinus: D } = r;
  return e(sa, { any: function(o) {
    return pr(o);
  }, "Array | Matrix": function(o) {
    var i;
    switch (dr(o) ? i = o.size() : Array.isArray(o) ? (o = t(o), i = o.size()) : i = [], i.length) {
      case 0:
        return pr(o);
      case 1:
        if (i[0] === 1) return pr(o.valueOf()[0]);
        if (i[0] === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + br(i) + ")");
      case 2: {
        var p = i[0], v = i[1];
        if (p === v) return c(o.clone().valueOf(), p);
        if (v === 0) return 1;
        throw new RangeError("Matrix must be square (size: " + br(i) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + br(i) + ")");
    }
  } });
  function c(l, o, i) {
    if (o === 1) return pr(l[0][0]);
    if (o === 2) return a(n(l[0][0], l[1][1]), n(l[1][0], l[0][1]));
    for (var p = false, v = new Array(o).fill(0).map((C, w) => w), h = 0; h < o; h++) {
      var s = v[h];
      if (f(l[s][h])) {
        var m = void 0;
        for (m = h + 1; m < o; m++) if (!f(l[v[m]][h])) {
          s = v[m], v[m] = v[h], v[h] = s, p = !p;
          break;
        }
        if (m === o) return l[s][h];
      }
      for (var d = l[s][h], E = h === 0 ? 1 : l[v[h - 1]][h - 1], A = h + 1; A < o; A++) for (var b = v[A], F = h + 1; F < o; F++) l[b][F] = u(a(n(l[b][F], d), n(l[b][h], l[s][F])), E);
    }
    var g = l[v[o - 1]][o - 1];
    return p ? D(g) : g;
  }
}), fa = "inv", Lc = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], Qc = Y(fa, Lc, (r) => {
  var { typed: e, matrix: t, divideScalar: a, addScalar: n, multiply: u, unaryMinus: f, det: D, identity: c, abs: l } = r;
  return e(fa, { "Array | Matrix": function(p) {
    var v = dr(p) ? p.size() : vr(p);
    switch (v.length) {
      case 1:
        if (v[0] === 1) return dr(p) ? t([a(1, p.valueOf()[0])]) : [a(1, p[0])];
        throw new RangeError("Matrix must be square (size: " + br(v) + ")");
      case 2: {
        var h = v[0], s = v[1];
        if (h === s) return dr(p) ? t(o(p.valueOf(), h, s), p.storage()) : o(p, h, s);
        throw new RangeError("Matrix must be square (size: " + br(v) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + br(v) + ")");
    }
  }, any: function(p) {
    return a(1, p);
  } });
  function o(i, p, v) {
    var h, s, m, d, E;
    if (p === 1) {
      if (d = i[0][0], d === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(1, d)]];
    } else if (p === 2) {
      var A = D(i);
      if (A === 0) throw Error("Cannot calculate inverse, determinant is zero");
      return [[a(i[1][1], A), a(f(i[0][1]), A)], [a(f(i[1][0]), A), a(i[0][0], A)]];
    } else {
      var b = i.concat();
      for (h = 0; h < p; h++) b[h] = b[h].concat();
      for (var F = c(p).valueOf(), g = 0; g < v; g++) {
        var C = l(b[g][g]), w = g;
        for (h = g + 1; h < p; ) l(b[h][g]) > C && (C = l(b[h][g]), w = h), h++;
        if (C === 0) throw Error("Cannot calculate inverse, determinant is zero");
        h = w, h !== g && (E = b[g], b[g] = b[h], b[h] = E, E = F[g], F[g] = F[h], F[h] = E);
        var y = b[g], _ = F[g];
        for (h = 0; h < p; h++) {
          var x = b[h], B = F[h];
          if (h !== g) {
            if (x[g] !== 0) {
              for (m = a(f(x[g]), y[g]), s = g; s < v; s++) x[s] = n(x[s], u(m, y[s]));
              for (s = 0; s < v; s++) B[s] = n(B[s], u(m, _[s]));
            }
          } else {
            for (m = y[g], s = g; s < v; s++) x[s] = a(x[s], m);
            for (s = 0; s < v; s++) B[s] = a(B[s], m);
          }
        }
      }
      return F;
    }
  }
});
function Vc(r) {
  var { addScalar: e, subtract: t, flatten: a, multiply: n, multiplyScalar: u, divideScalar: f, sqrt: D, abs: c, bignumber: l, diag: o, size: i, reshape: p, inv: v, qr: h, usolve: s, usolveAll: m, equal: d, complex: E, larger: A, smaller: b, matrixFromColumns: F, dot: g } = r;
  function C(R, $, I, G) {
    var V = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, P = w(R, $, I, G, V);
    y(R, $, I, G, V, P);
    var { values: L, C: X } = _(R, $, I, G, V);
    if (V) {
      var Z = x(R, $, X, P, L, I, G);
      return { values: L, eigenvectors: Z };
    }
    return { values: L };
  }
  function w(R, $, I, G, V) {
    var P = G === "BigNumber", L = G === "Complex", X = P ? l(0) : 0, Z = P ? l(1) : L ? E(1) : 1, K = P ? l(1) : 1, J = P ? l(10) : 2, k = u(J, J), W;
    V && (W = Array($).fill(Z));
    for (var nr = false; !nr; ) {
      nr = true;
      for (var ar = 0; ar < $; ar++) {
        for (var ir = X, er = X, sr = 0; sr < $; sr++) ar !== sr && (ir = e(ir, c(R[sr][ar])), er = e(er, c(R[ar][sr])));
        if (!d(ir, 0) && !d(er, 0)) {
          for (var fr = K, Dr = ir, Br = f(er, J), _r = u(er, J); b(Dr, Br); ) Dr = u(Dr, k), fr = u(fr, J);
          for (; A(Dr, _r); ) Dr = f(Dr, k), fr = f(fr, J);
          var wr = b(f(e(Dr, er), fr), u(e(ir, er), 0.95));
          if (wr) {
            nr = false;
            for (var Ur = f(1, fr), Mr = 0; Mr < $; Mr++) ar !== Mr && (R[ar][Mr] = u(R[ar][Mr], Ur), R[Mr][ar] = u(R[Mr][ar], fr));
            V && (W[ar] = u(W[ar], Ur));
          }
        }
      }
    }
    return V ? o(W) : null;
  }
  function y(R, $, I, G, V, P) {
    var L = G === "BigNumber", X = G === "Complex", Z = L ? l(0) : X ? E(0) : 0;
    L && (I = l(I));
    for (var K = 0; K < $ - 2; K++) {
      for (var J = 0, k = Z, W = K + 1; W < $; W++) {
        var nr = R[W][K];
        b(c(k), c(nr)) && (k = nr, J = W);
      }
      if (!b(c(k), I)) {
        if (J !== K + 1) {
          var ar = R[J];
          R[J] = R[K + 1], R[K + 1] = ar;
          for (var ir = 0; ir < $; ir++) {
            var er = R[ir][J];
            R[ir][J] = R[ir][K + 1], R[ir][K + 1] = er;
          }
          if (V) {
            var sr = P[J];
            P[J] = P[K + 1], P[K + 1] = sr;
          }
        }
        for (var fr = K + 2; fr < $; fr++) {
          var Dr = f(R[fr][K], k);
          if (Dr !== 0) {
            for (var Br = 0; Br < $; Br++) R[fr][Br] = t(R[fr][Br], u(Dr, R[K + 1][Br]));
            for (var _r = 0; _r < $; _r++) R[_r][K + 1] = e(R[_r][K + 1], u(Dr, R[_r][fr]));
            if (V) for (var wr = 0; wr < $; wr++) P[fr][wr] = t(P[fr][wr], u(Dr, P[K + 1][wr]));
          }
        }
      }
    }
    return P;
  }
  function _(R, $, I, G, V) {
    var P = G === "BigNumber", L = G === "Complex", X = P ? l(1) : L ? E(1) : 1;
    P && (I = l(I));
    for (var Z = pr(R), K = [], J = $, k = [], W = V ? o(Array($).fill(X)) : void 0, nr = V ? o(Array(J).fill(X)) : void 0, ar = 0; ar <= 100; ) {
      ar += 1;
      for (var ir = Z[J - 1][J - 1], er = 0; er < J; er++) Z[er][er] = t(Z[er][er], ir);
      var { Q: sr, R: fr } = h(Z);
      Z = n(fr, sr);
      for (var Dr = 0; Dr < J; Dr++) Z[Dr][Dr] = e(Z[Dr][Dr], ir);
      if (V && (nr = n(nr, sr)), J === 1 || b(c(Z[J - 1][J - 2]), I)) {
        ar = 0, K.push(Z[J - 1][J - 1]), V && (k.unshift([[1]]), N(nr, $), W = n(W, nr), J > 1 && (nr = o(Array(J - 1).fill(X)))), J -= 1, Z.pop();
        for (var Br = 0; Br < J; Br++) Z[Br].pop();
      } else if (J === 2 || b(c(Z[J - 2][J - 3]), I)) {
        ar = 0;
        var _r = B(Z[J - 2][J - 2], Z[J - 2][J - 1], Z[J - 1][J - 2], Z[J - 1][J - 1]);
        K.push(..._r), V && (k.unshift(T(Z[J - 2][J - 2], Z[J - 2][J - 1], Z[J - 1][J - 2], Z[J - 1][J - 1], _r[0], _r[1], I, G)), N(nr, $), W = n(W, nr), J > 2 && (nr = o(Array(J - 2).fill(X)))), J -= 2, Z.pop(), Z.pop();
        for (var wr = 0; wr < J; wr++) Z[wr].pop(), Z[wr].pop();
      }
      if (J === 0) break;
    }
    if (K.sort((Or, zr) => +t(c(Or), c(zr))), ar > 100) {
      var Ur = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + K.join(", "));
      throw Ur.values = K, Ur.vectors = [], Ur;
    }
    var Mr = V ? n(W, U(k, $)) : void 0;
    return { values: K, C: Mr };
  }
  function x(R, $, I, G, V, P, L) {
    var X = v(I), Z = n(X, R, I), K = L === "BigNumber", J = L === "Complex", k = K ? l(0) : J ? E(0) : 0, W = K ? l(1) : J ? E(1) : 1, nr = [], ar = [];
    for (var ir of V) {
      var er = z(nr, ir, d);
      er === -1 ? (nr.push(ir), ar.push(1)) : ar[er] += 1;
    }
    for (var sr = [], fr = nr.length, Dr = Array($).fill(k), Br = o(Array($).fill(W)), _r = function() {
      var Mr = nr[wr], Or = t(Z, n(Mr, Br)), zr = m(Or, Dr);
      for (zr.shift(); zr.length < ar[wr]; ) {
        var Hr = O(Or, $, zr, P, L);
        if (Hr === null) break;
        zr.push(Hr);
      }
      var cr = n(v(G), I);
      zr = zr.map((ur) => n(cr, ur)), sr.push(...zr.map((ur) => ({ value: Mr, vector: a(ur) })));
    }, wr = 0; wr < fr; wr++) _r();
    return sr;
  }
  function B(R, $, I, G) {
    var V = e(R, G), P = t(u(R, G), u($, I)), L = u(V, 0.5), X = u(D(t(u(V, V), u(4, P))), 0.5);
    return [e(L, X), t(L, X)];
  }
  function T(R, $, I, G, V, P, L, X) {
    var Z = X === "BigNumber", K = X === "Complex", J = Z ? l(0) : K ? E(0) : 0, k = Z ? l(1) : K ? E(1) : 1;
    if (b(c(I), L)) return [[k, J], [J, k]];
    if (A(c(t(V, P)), L)) return [[t(V, G), t(P, G)], [I, I]];
    var W = t(R, V), nr = t(G, V);
    return b(c($), L) && b(c(nr), L) ? [[W, k], [I, J]] : [[$, J], [nr, k]];
  }
  function N(R, $) {
    for (var I = 0; I < R.length; I++) R[I].push(...Array($ - R[I].length).fill(0));
    for (var G = R.length; G < $; G++) R.push(Array($).fill(0)), R[G][G] = 1;
    return R;
  }
  function U(R, $) {
    for (var I = [], G = 0; G < $; G++) I[G] = Array($).fill(0);
    var V = 0;
    for (var P of R) {
      for (var L = P.length, X = 0; X < L; X++) for (var Z = 0; Z < L; Z++) I[V + X][V + Z] = P[X][Z];
      V += L;
    }
    return I;
  }
  function z(R, $, I) {
    for (var G = 0; G < R.length; G++) if (I(R[G], $)) return G;
    return -1;
  }
  function O(R, $, I, G, V) {
    for (var P = V === "BigNumber" ? l(1e3) : 1e3, L, X = 0; X < 5; ++X) {
      L = M($, I, V);
      try {
        L = s(R, L);
      } catch {
        continue;
      }
      if (A(q(L), P)) break;
    }
    if (X >= 5) return null;
    for (X = 0; ; ) {
      var Z = s(R, L);
      if (b(q(S(L, [Z])), G)) break;
      if (++X >= 10) return null;
      L = Q(Z);
    }
    return L;
  }
  function M(R, $, I) {
    var G = I === "BigNumber", V = I === "Complex", P = Array(R).fill(0).map((L) => 2 * Math.random() - 1);
    return G && (P = P.map((L) => l(L))), V && (P = P.map((L) => E(L))), P = S(P, $), Q(P, I);
  }
  function S(R, $) {
    var I = i(R);
    for (var G of $) G = p(G, I), R = t(R, n(f(g(G, R), g(G, G)), G));
    return R;
  }
  function q(R) {
    return c(D(g(R, R)));
  }
  function Q(R, $) {
    var I = $ === "BigNumber", G = $ === "Complex", V = I ? l(1) : G ? E(1) : 1;
    return n(f(V, q(R)), R);
  }
  return C;
}
function Zc(r) {
  var { config: e, addScalar: t, subtract: a, abs: n, atan: u, cos: f, sin: D, multiplyScalar: c, inv: l, bignumber: o, multiply: i, add: p } = r;
  function v(y, _) {
    var x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, B = arguments.length > 3 ? arguments[3] : void 0, T = arguments.length > 4 ? arguments[4] : void 0;
    if (B === "number") return h(y, x, T);
    if (B === "BigNumber") return s(y, x, T);
    throw TypeError("Unsupported data type: " + B);
  }
  function h(y, _, x) {
    var B = y.length, T = Math.abs(_ / B), N, U;
    if (x) {
      U = new Array(B);
      for (var z = 0; z < B; z++) U[z] = Array(B).fill(0), U[z][z] = 1;
    }
    for (var O = g(y); Math.abs(O[1]) >= Math.abs(T); ) {
      var M = O[0][0], S = O[0][1];
      N = m(y[M][M], y[S][S], y[M][S]), y = F(y, N, M, S), x && (U = E(U, N, M, S)), O = g(y);
    }
    for (var q = Array(B).fill(0), Q = 0; Q < B; Q++) q[Q] = y[Q][Q];
    return w(pr(q), U, x);
  }
  function s(y, _, x) {
    var B = y.length, T = n(_ / B), N, U;
    if (x) {
      U = new Array(B);
      for (var z = 0; z < B; z++) U[z] = Array(B).fill(0), U[z][z] = 1;
    }
    for (var O = C(y); n(O[1]) >= n(T); ) {
      var M = O[0][0], S = O[0][1];
      N = d(y[M][M], y[S][S], y[M][S]), y = b(y, N, M, S), x && (U = A(U, N, M, S)), O = C(y);
    }
    for (var q = Array(B).fill(0), Q = 0; Q < B; Q++) q[Q] = y[Q][Q];
    return w(pr(q), U, x);
  }
  function m(y, _, x) {
    var B = _ - y;
    return Math.abs(B) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * x / (_ - y));
  }
  function d(y, _, x) {
    var B = a(_, y);
    return n(B) <= e.relTol ? o(-1).acos().div(4) : c(0.5, u(i(2, x, l(B))));
  }
  function E(y, _, x, B) {
    for (var T = y.length, N = Math.cos(_), U = Math.sin(_), z = Array(T).fill(0), O = Array(T).fill(0), M = 0; M < T; M++) z[M] = N * y[M][x] - U * y[M][B], O[M] = U * y[M][x] + N * y[M][B];
    for (var S = 0; S < T; S++) y[S][x] = z[S], y[S][B] = O[S];
    return y;
  }
  function A(y, _, x, B) {
    for (var T = y.length, N = f(_), U = D(_), z = Array(T).fill(o(0)), O = Array(T).fill(o(0)), M = 0; M < T; M++) z[M] = a(c(N, y[M][x]), c(U, y[M][B])), O[M] = t(c(U, y[M][x]), c(N, y[M][B]));
    for (var S = 0; S < T; S++) y[S][x] = z[S], y[S][B] = O[S];
    return y;
  }
  function b(y, _, x, B) {
    for (var T = y.length, N = o(f(_)), U = o(D(_)), z = c(N, N), O = c(U, U), M = Array(T).fill(o(0)), S = Array(T).fill(o(0)), q = i(o(2), N, U, y[x][B]), Q = t(a(c(z, y[x][x]), q), c(O, y[B][B])), R = p(c(O, y[x][x]), q, c(z, y[B][B])), $ = 0; $ < T; $++) M[$] = a(c(N, y[x][$]), c(U, y[B][$])), S[$] = t(c(U, y[x][$]), c(N, y[B][$]));
    y[x][x] = Q, y[B][B] = R, y[x][B] = o(0), y[B][x] = o(0);
    for (var I = 0; I < T; I++) I !== x && I !== B && (y[x][I] = M[I], y[I][x] = M[I], y[B][I] = S[I], y[I][B] = S[I]);
    return y;
  }
  function F(y, _, x, B) {
    for (var T = y.length, N = Math.cos(_), U = Math.sin(_), z = N * N, O = U * U, M = Array(T).fill(0), S = Array(T).fill(0), q = z * y[x][x] - 2 * N * U * y[x][B] + O * y[B][B], Q = O * y[x][x] + 2 * N * U * y[x][B] + z * y[B][B], R = 0; R < T; R++) M[R] = N * y[x][R] - U * y[B][R], S[R] = U * y[x][R] + N * y[B][R];
    y[x][x] = q, y[B][B] = Q, y[x][B] = 0, y[B][x] = 0;
    for (var $ = 0; $ < T; $++) $ !== x && $ !== B && (y[x][$] = M[$], y[$][x] = M[$], y[B][$] = S[$], y[$][B] = S[$]);
    return y;
  }
  function g(y) {
    for (var _ = y.length, x = 0, B = [0, 1], T = 0; T < _; T++) for (var N = T + 1; N < _; N++) Math.abs(x) < Math.abs(y[T][N]) && (x = Math.abs(y[T][N]), B = [T, N]);
    return [B, x];
  }
  function C(y) {
    for (var _ = y.length, x = 0, B = [0, 1], T = 0; T < _; T++) for (var N = T + 1; N < _; N++) n(x) < n(y[T][N]) && (x = n(y[T][N]), B = [T, N]);
    return [B, x];
  }
  function w(y, _, x) {
    var B = y.length, T = Array(B), N;
    if (x) {
      N = Array(B);
      for (var U = 0; U < B; U++) N[U] = Array(B);
    }
    for (var z = 0; z < B; z++) {
      for (var O = 0, M = y[0], S = 0; S < y.length; S++) n(y[S]) < n(M) && (O = S, M = y[O]);
      if (T[z] = y.splice(O, 1)[0], x) for (var q = 0; q < B; q++) N[z][q] = _[q][O], _[q].splice(O, 1);
    }
    if (!x) return { values: T };
    var Q = N.map((R, $) => ({ value: T[$], vector: R }));
    return { values: T, eigenvectors: Q };
  }
  return v;
}
var Xc = "eigs", Jc = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], Gc = Y(Xc, Jc, (r) => {
  var { config: e, typed: t, matrix: a, addScalar: n, subtract: u, equal: f, abs: D, atan: c, cos: l, sin: o, multiplyScalar: i, divideScalar: p, inv: v, bignumber: h, multiply: s, add: m, larger: d, column: E, flatten: A, number: b, complex: F, sqrt: g, diag: C, size: w, reshape: y, qr: _, usolve: x, usolveAll: B, im: T, re: N, smaller: U, matrixFromColumns: z, dot: O } = r, M = Zc({ config: e, addScalar: n, subtract: u, abs: D, atan: c, cos: l, sin: o, multiplyScalar: i, inv: v, bignumber: h, multiply: s, add: m }), S = Vc({ addScalar: n, subtract: u, multiply: s, multiplyScalar: i, flatten: A, divideScalar: p, sqrt: g, abs: D, bignumber: h, diag: C, size: w, reshape: y, qr: _, inv: v, usolve: x, usolveAll: B, equal: f, complex: F, larger: d, smaller: U, matrixFromColumns: z, dot: O });
  return t("eigs", { Array: function(P) {
    return q(a(P));
  }, "Array, number|BigNumber": function(P, L) {
    return q(a(P), { precision: L });
  }, "Array, Object"(V, P) {
    return q(a(V), P);
  }, Matrix: function(P) {
    return q(P, { matricize: true });
  }, "Matrix, number|BigNumber": function(P, L) {
    return q(P, { precision: L, matricize: true });
  }, "Matrix, Object": function(P, L) {
    var X = { matricize: true };
    return pt(X, L), q(P, X);
  } });
  function q(V) {
    var P, L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, X = "eigenvectors" in L ? L.eigenvectors : true, Z = (P = L.precision) !== null && P !== void 0 ? P : e.relTol, K = Q(V, Z, X);
    return L.matricize && (K.values = a(K.values), X && (K.eigenvectors = K.eigenvectors.map((J) => {
      var { value: k, vector: W } = J;
      return { value: k, vector: a(W) };
    }))), X && Object.defineProperty(K, "vectors", { enumerable: false, get: () => {
      throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
    } }), K;
  }
  function Q(V, P, L) {
    var X = V.toArray(), Z = V.size();
    if (Z.length !== 2 || Z[0] !== Z[1]) throw new RangeError("Matrix must be square (size: ".concat(br(Z), ")"));
    var K = Z[0];
    if ($(X, K, P) && (I(X, K), R(X, K, P))) {
      var J = G(V, X, K);
      return M(X, K, P, J, L);
    }
    var k = G(V, X, K);
    return S(X, K, P, k, L);
  }
  function R(V, P, L) {
    for (var X = 0; X < P; X++) for (var Z = X; Z < P; Z++) if (d(h(D(u(V[X][Z], V[Z][X]))), L)) return false;
    return true;
  }
  function $(V, P, L) {
    for (var X = 0; X < P; X++) for (var Z = 0; Z < P; Z++) if (d(h(D(T(V[X][Z]))), L)) return false;
    return true;
  }
  function I(V, P) {
    for (var L = 0; L < P; L++) for (var X = 0; X < P; X++) V[L][X] = N(V[L][X]);
  }
  function G(V, P, L) {
    var X = V.datatype();
    if (X === "number" || X === "BigNumber" || X === "Complex") return X;
    for (var Z = false, K = false, J = false, k = 0; k < L; k++) for (var W = 0; W < L; W++) {
      var nr = P[k][W];
      if (Fr(nr) || Ot(nr)) Z = true;
      else if (Cr(nr)) K = true;
      else if ($t(nr)) J = true;
      else throw TypeError("Unsupported type in Matrix: " + Qr(nr));
    }
    if (K && J && console.warn("Complex BigNumbers not supported, this operation will lose precission."), J) {
      for (var ar = 0; ar < L; ar++) for (var ir = 0; ir < L; ir++) P[ar][ir] = F(P[ar][ir]);
      return "Complex";
    }
    if (K) {
      for (var er = 0; er < L; er++) for (var sr = 0; sr < L; sr++) P[er][sr] = h(P[er][sr]);
      return "BigNumber";
    }
    if (Z) {
      for (var fr = 0; fr < L; fr++) for (var Dr = 0; Dr < L; Dr++) P[fr][Dr] = b(P[fr][Dr]);
      return "number";
    } else throw TypeError("Matrix contains unsupported types only.");
  }
}), Yc = "divide", Kc = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], Wc = Y(Yc, Kc, (r) => {
  var { typed: e, matrix: t, multiply: a, equalScalar: n, divideScalar: u, inv: f } = r, D = Wa({ typed: e, equalScalar: n }), c = Lt({ typed: e });
  return e("divide", Ba({ "Array | Matrix, Array | Matrix": function(o, i) {
    return a(o, f(i));
  }, "DenseMatrix, any": function(o, i) {
    return c(o, i, u, false);
  }, "SparseMatrix, any": function(o, i) {
    return D(o, i, u, false);
  }, "Array, any": function(o, i) {
    return c(t(o), i, u, false).valueOf();
  }, "any, Array | Matrix": function(o, i) {
    return a(o, f(i));
  } }, u.signatures));
}), ca = "mean", Hc = ["typed", "add", "divide"], kc = Y(ca, Hc, (r) => {
  var { typed: e, add: t, divide: a } = r;
  return e(ca, { "Array | Matrix": u, "Array | Matrix, number | BigNumber": n, "...": function(D) {
    if (Ji(D)) throw new TypeError("Scalar values expected in function mean");
    return u(D);
  } });
  function n(f, D) {
    try {
      var c = Yi(f, D, t), l = Array.isArray(f) ? vr(f) : f.size();
      return a(c, l[D]);
    } catch (o) {
      throw Qn(o, "mean");
    }
  }
  function u(f) {
    var D, c = 0;
    if (Gi(f, function(l) {
      try {
        D = D === void 0 ? l : t(D, l), c++;
      } catch (o) {
        throw Qn(o, "mean", l);
      }
    }), c === 0) throw new Error("Cannot calculate the mean of an empty array");
    return a(D, c);
  }
}), Qe = hi({ config: Rr }), Ft = gi({}), Qt = Ci({}), Vt = Bi({}), qr = Zi({ Matrix: Vt }), rr = li({ BigNumber: Qe, Complex: Ft, DenseMatrix: qr, Fraction: Qt }), Ve = Mo({ typed: rr }), de = zo({ typed: rr }), jc = Wf({ typed: rr }), Zt = yo({ Complex: Ft, typed: rr }), Et = As({ typed: rr }), rl = kf({ typed: rr }), Zr = ao({ config: Rr, typed: rr }), au = $s({ typed: rr }), el = Is({ typed: rr }), tl = Es({ typed: rr }), uu = Wi({ typed: rr }), nl = ji({ config: Rr, typed: rr }), iu = eo({ equalScalar: Zr, typed: rr }), ce = os({ typed: rr }), Xt = vo({ typed: rr }), al = bs({ typed: rr }), ul = ls({ BigNumber: Qe, Fraction: Qt, complex: Zt, typed: rr }), il = rc({ typed: rr }), Wr = oo({ Matrix: Vt, equalScalar: Zr, typed: rr }), Ee = $o({ typed: rr }), Ze = ho({ BigNumber: Qe, typed: rr }), j = bo({ DenseMatrix: qr, Matrix: Vt, SparseMatrix: Wr, typed: rr }), ol = Xs({ isInteger: uu, matrix: j, typed: rr }), Rl = Gf({ SparseMatrix: Wr, typed: rr }), Jt = ps({ Complex: Ft, config: Rr, typed: rr }), ne = rf({ matrix: j, typed: rr }), mr = af({ BigNumber: Qe, config: Rr, matrix: j, typed: rr }), we = _s({ isInteger: uu, matrix: j, typed: rr }), sl = tf({ conj: Et, transpose: ne, typed: rr }), fl = zs({ DenseMatrix: qr, SparseMatrix: Wr, matrix: j, typed: rr }), ou = Af({ DenseMatrix: qr, SparseMatrix: Wr, concat: we, equalScalar: Zr, matrix: j, typed: rr }), su = Eo({ Fraction: Qt, typed: rr }), Xe = Us({ BigNumber: Qe, DenseMatrix: qr, SparseMatrix: Wr, config: Rr, matrix: j, typed: rr }), cl = Ps({ matrix: j, multiplyScalar: ce, typed: rr }), fu = zf({ DenseMatrix: qr, SparseMatrix: Wr, concat: we, config: Rr, matrix: j, typed: rr }), ll = sf({ bignumber: Ze, fraction: su, number: Xt }), Gt = Gs({ matrix: j, config: Rr, typed: rr }), Je = wf({ DenseMatrix: qr, SparseMatrix: Wr, bignumber: Ze, concat: we, config: Rr, matrix: j, typed: rr }), Ge = Bo({ typed: rr }), Lr = tc({ DenseMatrix: qr, SparseMatrix: Wr, addScalar: de, concat: we, equalScalar: Zr, matrix: j, typed: rr }), ae = cf({ numeric: ll, typed: rr }), vl = If({ DenseMatrix: qr, smaller: Je }), cu = Rf({ ImmutableDenseMatrix: vl, getMatrixDataType: el }), Ne = Sf({ DenseMatrix: qr, SparseMatrix: Wr, bignumber: Ze, concat: we, config: Rr, matrix: j, typed: rr }), Dl = pf({ DenseMatrix: qr, divideScalar: ae, equalScalar: Zr, matrix: j, multiplyScalar: ce, subtractScalar: Ee, typed: rr }), pl = _o({ flatten: au, matrix: j, size: Gt, typed: rr }), hl = vc({ addScalar: de, complex: Zt, conj: Et, divideScalar: ae, equal: ou, identity: Xe, isZero: iu, matrix: j, multiplyScalar: ce, sign: ul, sqrt: Jt, subtractScalar: Ee, typed: rr, unaryMinus: Ge, zeros: mr }), dl = _f({ DenseMatrix: qr, SparseMatrix: Wr, concat: we, config: Rr, matrix: j, typed: rr }), Pl = Ks({ add: Lr, matrix: j, typed: rr, zeros: mr }), Ye = ds({ DenseMatrix: qr, concat: we, equalScalar: Zr, matrix: j, subtractScalar: Ee, typed: rr, unaryMinus: Ge }), lu = df({ DenseMatrix: qr, divideScalar: ae, equalScalar: Zr, matrix: j, multiplyScalar: ce, subtractScalar: Ee, typed: rr }), Oe = ic({ addScalar: de, conj: Et, multiplyScalar: ce, size: Gt, typed: rr }), ml = Qf({ larger: Ne, smaller: Je }), Ll = sc({ Index: cu, typed: rr }), hr = fs({ addScalar: de, dot: Oe, equalScalar: Zr, matrix: j, multiplyScalar: ce, typed: rr }), gl = Vs({ bignumber: Ze, matrix: j, add: Lr, config: Rr, isPositive: nl, larger: Ne, largerEq: fu, smaller: Je, smallerEq: dl, typed: rr }), yl = Ic({ SparseMatrix: Wr, abs: Ve, add: Lr, divideScalar: ae, larger: Ne, largerEq: fu, multiply: hr, subtract: Ye, transpose: ne, typed: rr }), Al = gf({ DenseMatrix: qr, divideScalar: ae, equalScalar: Zr, matrix: j, multiplyScalar: ce, subtractScalar: Ee, typed: rr }), Fl = Bs({ Index: cu, matrix: j, range: gl, typed: rr }), la = Ms({ matrix: j, multiply: hr, subtract: Ye, typed: rr }), El = Pc({ divideScalar: ae, isZero: iu, matrix: j, multiply: hr, subtractScalar: Ee, typed: rr, unaryMinus: Ge }), Yt = Qc({ abs: Ve, addScalar: de, det: El, divideScalar: ae, identity: Xe, matrix: j, multiply: hr, typed: rr, unaryMinus: Ge }), wl = vf({ Complex: Ft, config: Rr, fraction: su, identity: Xe, inv: Yt, matrix: j, multiply: hr, number: Xt, typed: rr }), bl = Xf({ FibonacciHeap: ml, addScalar: de, equalScalar: Zr }), Cl = Wc({ divideScalar: ae, equalScalar: Zr, inv: Yt, matrix: j, multiply: hr, typed: rr }), _l = cc({ DenseMatrix: qr, Spa: bl, SparseMatrix: Wr, abs: Ve, addScalar: de, divideScalar: ae, equalScalar: Zr, larger: Ne, matrix: j, multiplyScalar: ce, subtractScalar: Ee, typed: rr, unaryMinus: Ge }), xl = Gc({ abs: Ve, add: Lr, addScalar: de, atan: jc, bignumber: Ze, column: Fl, complex: Zt, config: Rr, cos: rl, diag: fl, divideScalar: ae, dot: Oe, equal: ou, flatten: au, im: tl, inv: Yt, larger: Ne, matrix: j, matrixFromColumns: pl, multiply: hr, multiplyScalar: ce, number: Xt, qr: hl, re: al, reshape: ol, sin: il, size: Gt, smaller: Je, sqrt: Jt, subtract: Ye, typed: rr, usolve: lu, usolveAll: Al }), Ql = Uc({ DenseMatrix: qr, lsolve: Dl, lup: _l, matrix: j, slu: yl, typed: rr, usolve: lu }), Vl = kc({ add: Lr, divide: Cl, typed: rr }), Ie = ac({ abs: Ve, add: Lr, conj: Et, ctranspose: sl, eigs: xl, equalScalar: Zr, larger: Ne, matrix: j, multiply: hr, pow: wl, smaller: Je, sqrt: Jt, typed: rr });
function Zl(r) {
  if (r.length === 2) return Bl(r);
  if (r.length === 3) return Sl(r);
}
function Bl(r) {
  const e = Ye(r[1], r[0]), t = Ie(e), a = Oe(e, [1, 0, 0]) / t, n = Oe(e, [0, 1, 0]) / t, u = Oe(e, [0, 0, 1]) / t, f = Math.sqrt(a ** 2 + n ** 2);
  let D = [[a, n, u], [-n / f, a / f, 0], [-a * u / f, -n * u / f, f]];
  return u === 1 && (D = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]]), u === -1 && (D = [[0, 0, -1], [0, 1, 0], [1, 0, 0]]), cl(Xe(4), D).toArray();
}
function Sl(r) {
  const u = [r[0], r[1], r[2]], f = mr(3, 3).toArray();
  for (let F = 0; F < 3; F++) for (let g = 0; g < 3; g++) f[F][g] = u[g][F];
  const D = [-1, 1, 0], c = [-1, 0, 1], l = mr(3, 2).toArray();
  for (let F = 0; F < 3; F++) for (let g = 0; g < 3; g++) l[F][0] += f[F][g] * D[g], l[F][1] += f[F][g] * c[g];
  const o = l.map((F) => F[0]), i = l.map((F) => F[1]);
  let p = la(o, i), v = Ie(p);
  if (v === 0) return console.warn("Degenerate triangle: nodes are collinear or coincident."), mr(18, 18).toArray();
  p = p.map((F) => F / v);
  const h = [...p], s = Xe(3).toArray(), m = p[0];
  let d;
  if (Math.abs(m) > 1 - 1e-10) {
    const F = p[2];
    d = s.map((g, C) => g[2] - F * p[C]);
  } else d = s.map((F, g) => F[0] - m * p[g]);
  if (v = Ie(d), v === 0) return console.warn("Degenerate local X-axis detected."), mr(18, 18).toArray();
  d = d.map((F) => F / v);
  let E = la(h, d);
  if (v = Ie(E), v === 0) return console.warn("Degenerate local Y-axis detected."), mr(18, 18).toArray();
  E = E.map((F) => F / v);
  const A = [d, E, h], b = mr(18, 18).toArray();
  for (let F = 0; F < 3; F++) {
    const g = F * 6, C = g + 3;
    for (let w = 0; w < 3; w++) for (let y = 0; y < 3; y++) b[g + w][g + y] = A[w][y], b[C + w][C + y] = A[w][y];
  }
  return b;
}
const va = /* @__PURE__ */ new WeakMap();
function Xl(r, e, t) {
  if (r.length === 2) return Ml(r, e, t);
  if (r.length === 3) return Nl(r, e, t);
}
function Ml(r, e, t) {
  var _a2, _b, _c2, _d, _e2, _f2;
  const a = ((_a2 = e == null ? void 0 : e.momentsOfInertiaZ) == null ? void 0 : _a2.get(t)) ?? 0, n = ((_b = e == null ? void 0 : e.momentsOfInertiaY) == null ? void 0 : _b.get(t)) ?? 0, u = ((_c2 = e == null ? void 0 : e.elasticities) == null ? void 0 : _c2.get(t)) ?? 0, f = ((_d = e == null ? void 0 : e.areas) == null ? void 0 : _d.get(t)) ?? 0, D = ((_e2 = e == null ? void 0 : e.shearModuli) == null ? void 0 : _e2.get(t)) ?? 0, c = ((_f2 = e == null ? void 0 : e.torsionalConstants) == null ? void 0 : _f2.get(t)) ?? 0, l = Ie(Ye(r[0], r[1])), o = u * f / l, i = u * a / l ** 3, p = u * n / l ** 3, v = D * c / l;
  return [[o, 0, 0, 0, 0, 0, -o, 0, 0, 0, 0, 0], [0, 12 * i, 0, 0, 0, 6 * l * i, 0, -12 * i, 0, 0, 0, 6 * l * i], [0, 0, 12 * p, 0, -6 * l * p, 0, 0, 0, -12 * p, 0, -6 * l * p, 0], [0, 0, 0, v, 0, 0, 0, 0, 0, -v, 0, 0], [0, 0, -6 * l * p, 0, 4 * p * l ** 2, 0, 0, 0, 6 * l * p, 0, 2 * p * l ** 2, 0], [0, 6 * l * i, 0, 0, 0, 4 * i * l ** 2, 0, -6 * l * i, 0, 0, 0, 2 * i * l ** 2], [-o, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0], [0, -12 * i, 0, 0, 0, -6 * i * l, 0, 12 * i, 0, 0, 0, -6 * i * l], [0, 0, -12 * p, 0, 6 * l * p, 0, 0, 0, 12 * p, 0, 6 * l * p, 0], [0, 0, 0, -v, 0, 0, 0, 0, 0, v, 0, 0], [0, 0, -6 * l * p, 0, 2 * p * l ** 2, 0, 0, 0, 6 * l * p, 0, 4 * p * l ** 2, 0], [0, 6 * l * i, 0, 0, 0, 2 * i * l ** 2, 0, -6 * l * i, 0, 0, 0, 4 * i * l ** 2]];
}
function Nl(r, e, t) {
  var _a2, _b, _c2, _d, _e2, _f2;
  const a = (_a2 = e.cltLayups) == null ? void 0 : _a2.get(t), n = ((_b = e.elasticities) == null ? void 0 : _b.get(t)) ?? 0, u = ((_c2 = e.elasticitiesOrthogonal) == null ? void 0 : _c2.get(t)) ?? 0, f = ((_d = e.poissonsRatios) == null ? void 0 : _d.get(t)) ?? 0, D = ((_e2 = e.shearModuli) == null ? void 0 : _e2.get(t)) ?? 0;
  let c = ((_f2 = e.thicknesses) == null ? void 0 : _f2.get(t)) ?? 0, l, o, i;
  if (a) {
    const O = Tl(a);
    c = O.t, l = O.bendingStiffnessMatrix, o = O.shearStiffnessMatrix, i = O.inPlaneConstitutiveMatrix;
  } else {
    const O = u > 0;
    l = O ? x(n, u, D, f, c) : y(n, f, c), o = O ? B(D, c) : _(n, f, c), i = O ? ql(n, u, D, f) : Il(n, f);
  }
  const p = zl(r), v = p[1][0] - p[0][0], h = p[2][0] - p[0][0], s = p[0][1] - p[1][1], m = p[2][1] - p[0][1], d = 0.5 * (v * m - h * -s);
  if (Math.abs(d) < 1e-12) return console.warn("Degenerate triangle (zero area) detected in getLocalStiffnessMatrixShell. Returning zero matrix."), mr(18, 18).toArray();
  const E = T(p), A = U(p), b = z(p, i, c), F = hr(hr(ne(E), o), E), g = hr(hr(ne(A), l), A), C = mr(18, 18).toArray(), w = hr(Lr(F, g), d);
  Ol(C, b);
  for (let O = 0; O < 18; O++) for (let M = 0; M < 18; M++) C[O][M] = (C[O][M] ?? 0) + w.get([O, M]);
  return C;
  function y(O, M, S) {
    const q = O / (1 - M * M), Q = j([[q, q * M, 0], [q * M, q, 0], [0, 0, q * (1 - M) / 2]]);
    return hr(S ** 3 / 12, Q);
  }
  function _(O, M, S) {
    const q = 0.8333333333333334, Q = O / (2 * (1 + M)), R = q * Q * S;
    return j([[R, 0], [0, R]]);
  }
  function x(O, M, S, q, Q) {
    const R = M * q / O, $ = 1 - q * R, I = O / $, G = M / $, V = q * M / $, L = j([[I, V, 0], [V, G, 0], [0, 0, S]]);
    return hr(Q ** 3 / 12, L);
  }
  function B(O, M) {
    const q = 0.8333333333333334 * O * M;
    return j([[q, 0], [0, q]]);
  }
  function T(O) {
    const M = mr(2, 18).toArray(), [S, q] = O[0], [Q, R] = O[1], [$, I] = O[2], G = 0.5 * ((Q - S) * (I - q) - ($ - S) * -(q - R)), V = (S + Q + $) / 3, P = (q + R + I) / 3, L = [V, S, Q], X = [P, q, R], Z = [V, Q, $], K = [P, R, I], J = [V, $, S], k = [P, I, q], W = 1 / 3, [nr, ar, ir, er] = N(L, X), [sr, fr, Dr, Br] = N(Z, K), [_r, wr, Ur, Mr] = N(J, k), Or = mr(2, 18).toArray(), zr = mr(2, 18).toArray(), Hr = mr(2, 18).toArray();
    for (let cr = 0; cr < 2; cr++) for (let ur = 0; ur < 6; ur++) Or[cr][ur] = W * nr[cr][ur] + ar[cr][ur], Or[cr][ur + 6] = W * nr[cr][ur] + ir[cr][ur], Or[cr][ur + 12] = W * nr[cr][ur], zr[cr][ur] = W * sr[cr][ur], zr[cr][ur + 6] = W * sr[cr][ur] + fr[cr][ur], zr[cr][ur + 12] = W * sr[cr][ur] + Dr[cr][ur], Hr[cr][ur] = W * _r[cr][ur] + Ur[cr][ur], Hr[cr][ur + 6] = W * _r[cr][ur], Hr[cr][ur + 12] = W * _r[cr][ur] + wr[cr][ur];
    for (let cr = 0; cr < 2; cr++) for (let ur = 0; ur < 18; ur++) Or[cr][ur] *= er, zr[cr][ur] *= Br, Hr[cr][ur] *= Mr, M[cr][ur] = (Or[cr][ur] + zr[cr][ur] + Hr[cr][ur]) / G;
    return M;
  }
  function N(O, M) {
    const S = mr(2, 6).toArray(), q = mr(2, 6).toArray(), Q = mr(2, 6).toArray(), R = O[1] - O[0], $ = O[0] - O[2], I = M[2] - M[0], G = M[0] - M[1], V = O[2] - O[1], P = M[1] - M[2], L = 0.5 * (R * I - $ * G), X = 0.5 * G * $, Z = 0.5 * I * R, K = 0.5 * R * $, J = 0.5 * G * I;
    return S[0][2] = 0.5 * V / L, S[0][3] = -0.5, S[1][2] = 0.5 * P / L, S[1][4] = 0.5, q[0][2] = 0.5 * $ / L, q[0][3] = 0.5 * X / L, q[0][4] = 0.5 * K / L, q[1][2] = 0.5 * I / L, q[1][3] = 0.5 * J / L, q[1][4] = 0.5 * Z / L, Q[0][2] = 0.5 * R / L, Q[0][3] = -0.5 * Z / L, Q[0][4] = -0.5 * K / L, Q[1][2] = 0.5 * G / L, Q[1][3] = -0.5 * J / L, Q[1][4] = -0.5 * X / L, [S, q, Q, L];
  }
  function U(O) {
    const M = mr(3, 18).toArray(), [S, q] = O[0], [Q, R] = O[1], [$, I] = O[2], G = Q - S, V = $ - S, P = $ - Q, L = R - I, X = I - q, Z = q - R, K = 0.5 * (G * X - V * -Z), J = L / (2 * K), k = P / (2 * K), W = X / (2 * K), nr = -V / (2 * K), ar = Z / (2 * K), ir = G / (2 * K);
    return M[0][4] = J, M[0][10] = W, M[0][16] = ar, M[1][3] = -k, M[1][9] = -nr, M[1][15] = -ir, M[2][3] = -J, M[2][4] = k, M[2][9] = -W, M[2][10] = nr, M[2][15] = -ar, M[2][16] = ir, M;
  }
  function z(O, M, S) {
    let q = mr(9, 9).toArray(), Q = mr(9, 9).toArray(), R = mr(9, 9).toArray(), $ = mr(9, 3).toArray(), I = mr(3, 9).toArray(), G = mr(3, 3).toArray(), V = mr(3, 3).toArray(), P = mr(3, 3).toArray(), L = mr(3, 3).toArray(), X = mr(3, 3).toArray(), Z = mr(3, 3).toArray(), K = mr(3, 3).toArray(), J = mr(3, 3).toArray();
    const k = 1 / 8, W = k / 6, nr = k ** 2 / 4, ar = 1, ir = 2, er = 1, sr = 0, fr = 1, Dr = -1, Br = -1, _r = -1, wr = -2, Ur = O[0][0], Mr = O[0][1], Or = O[1][0], zr = O[1][1], Hr = O[2][0], cr = O[2][1], ur = Ur - Or, me = Or - Hr, le = Hr - Ur, ge = Mr - zr, be = zr - cr, ye = cr - Mr, jr = -ur, ue = -me, ie = -le, re = -ge, ee = -be, te = -ye, Ke = 0.5 * (jr * ye - le * -ge), vu = 2 * Ke, Nr = 4 * Ke, Sr = 0.5 * S, Kt = Ke * S, Xr = jr ** 2 + re ** 2, Jr = ue ** 2 + ee ** 2, Gr = ie ** 2 + te ** 2;
    $[0][0] = Sr * be, $[0][2] = Sr * ue, $[1][1] = Sr * ue, $[1][2] = Sr * be, $[2][0] = Sr * be * (te - re) * W, $[2][1] = Sr * ue * (le - ur) * W, $[2][2] = Sr * (le * te - ur * re) * 2 * W, $[3][0] = Sr * ye, $[3][2] = Sr * ie, $[4][1] = Sr * ie, $[4][2] = Sr * ye, $[5][0] = Sr * ye * (re - ee) * W, $[5][1] = Sr * ie * (ur - me) * W, $[5][2] = Sr * (ur * re - me * ee) * 2 * W, $[6][0] = Sr * ge, $[6][2] = Sr * jr, $[7][1] = Sr * jr, $[7][2] = Sr * ge, $[8][0] = Sr * ge * (ee - te) * W, $[8][1] = Sr * jr * (me - le) * W, $[8][2] = Sr * (me * ee - le * te) * 2 * W, R = hr(hr(j($), M), ne(j($))).toArray(), R = hr(j(R), 1 / Kt).toArray(), I[0][0] = ue / Nr, I[0][1] = ee / Nr, I[0][2] = 1, I[0][3] = ie / Nr, I[0][4] = te / Nr, I[0][6] = jr / Nr, I[0][7] = re / Nr, I[1][0] = ue / Nr, I[1][1] = ee / Nr, I[1][3] = ie / Nr, I[1][4] = te / Nr, I[1][5] = 1, I[1][6] = jr / Nr, I[1][7] = re / Nr, I[2][0] = ue / Nr, I[2][1] = ee / Nr, I[2][3] = ie / Nr, I[2][4] = te / Nr, I[2][6] = jr / Nr, I[2][7] = re / Nr, I[2][8] = 1;
    const oe = 1 / (Ke * Nr);
    G[0][0] = oe * be * te * Xr, G[0][1] = oe * ye * re * Jr, G[0][2] = oe * ge * ee * Gr, G[1][0] = oe * me * ie * Xr, G[1][1] = oe * le * jr * Jr, G[1][2] = oe * ur * ue * Gr, G[2][0] = oe * (be * le + ue * te) * Xr, G[2][1] = oe * (ye * ur + ie * re) * Jr, G[2][2] = oe * (ge * me + jr * ee) * Gr;
    const gr = vu / 3;
    V[0][0] = gr * ar / Xr, V[0][1] = gr * ir / Xr, V[0][2] = gr * er / Xr, V[1][0] = gr * sr / Jr, V[1][1] = gr * fr / Jr, V[1][2] = gr * Dr / Jr, V[2][0] = gr * Br / Gr, V[2][1] = gr * _r / Gr, V[2][2] = gr * wr / Gr, P[0][0] = gr * wr / Xr, P[0][1] = gr * Br / Xr, P[0][2] = gr * _r / Xr, P[1][0] = gr * er / Jr, P[1][1] = gr * ar / Jr, P[1][2] = gr * ir / Jr, P[2][0] = gr * Dr / Gr, P[2][1] = gr * sr / Gr, P[2][2] = gr * fr / Gr, L[0][0] = gr * fr / Xr, L[0][1] = gr * Dr / Xr, L[0][2] = gr * sr / Xr, L[1][0] = gr * _r / Jr, L[1][1] = gr * wr / Jr, L[1][2] = gr * Br / Jr, L[2][0] = gr * ir / Gr, L[2][1] = gr * er / Gr, L[2][2] = gr * ar / Gr, X = hr(Lr(j(V), j(P)), 0.5).toArray(), Z = hr(Lr(j(P), j(L)), 0.5).toArray(), K = hr(Lr(j(L), j(V)), 0.5).toArray();
    const wt = hr(hr(ne(j(G)), M), j(G));
    return J = Lr(Lr(hr(hr(ne(j(X)), wt), j(X)), hr(hr(ne(j(Z)), wt), j(Z))), hr(hr(ne(j(K)), wt), j(K))).toArray(), J = hr(j(J), 3 / 4 * nr * Kt).toArray(), Q = hr(hr(ne(j(I)), j(J)), j(I)).toArray(), q = Lr(j(R), j(Q)).toArray(), q;
  }
}
function zl(r) {
  const [e, t, a] = r, n = [t[0] - e[0], t[1] - e[1], t[2] - e[2]], u = [a[0] - e[0], a[1] - e[1], a[2] - e[2]], f = Da(n, u), D = _t(f);
  if (D < 1e-12) return [[0, 0], [0, 0], [0, 0]];
  const c = Te(f, 1 / D), l = [1, 0, 0], o = [0, 0, 1], i = $e(c, l);
  let p = Math.abs(i) > 1 - 1e-10 ? pa(o, Te(c, $e(c, o))) : pa(l, Te(c, i));
  const v = _t(p);
  if (v < 1e-12) return [[0, 0], [0, 0], [0, 0]];
  p = Te(p, 1 / v);
  let h = Da(c, p);
  const s = _t(h);
  return s < 1e-12 ? [[0, 0], [0, 0], [0, 0]] : (h = Te(h, 1 / s), r.map((m) => {
    const d = [m[0] - e[0], m[1] - e[1], m[2] - e[2]];
    return [$e(d, p), $e(d, h)];
  }));
}
function $e(r, e) {
  return r[0] * e[0] + r[1] * e[1] + r[2] * e[2];
}
function Da(r, e) {
  return [r[1] * e[2] - r[2] * e[1], r[2] * e[0] - r[0] * e[2], r[0] * e[1] - r[1] * e[0]];
}
function _t(r) {
  return Math.sqrt($e(r, r));
}
function Te(r, e) {
  return [r[0] * e, r[1] * e, r[2] * e];
}
function pa(r, e) {
  return [r[0] - e[0], r[1] - e[1], r[2] - e[2]];
}
function Tl(r) {
  const e = va.get(r);
  if (e) return e;
  const t = Du(r);
  $l(r, t.B, t.A, t.t);
  const a = { t: t.t, bendingStiffnessMatrix: j(t.D), shearStiffnessMatrix: j(t.S), inPlaneConstitutiveMatrix: hr(j(t.A), 1 / t.t) };
  return va.set(r, a), a;
}
function $l(r, e, t, a) {
  if (!(r.options.strictSymmetryForElement ?? true)) return;
  const u = r.options.symmetryTolerance ?? 1e-6, f = ha(e), D = Math.max(1e-12, ha(t) * a);
  if (f / D > u) throw new Error("Unsymmetric laminate requires A\u2013B\u2013D coupling; not supported yet.");
}
function Ol(r, e) {
  const t = [[0, 1, 5], [6, 7, 11], [12, 13, 17]];
  for (let a = 0; a < 3; a++) for (let n = 0; n < 3; n++) {
    const u = t[a][n];
    for (let f = 0; f < 3; f++) for (let D = 0; D < 3; D++) {
      const c = t[f][D];
      r[u][c] += e[a * 3 + n][f * 3 + D];
    }
  }
}
function ha(r) {
  let e = 0;
  for (let t = 0; t < r.length; t++) for (let a = 0; a < r[0].length; a++) e += r[t][a] ** 2;
  return Math.sqrt(e);
}
function Il(r, e) {
  const t = r / (1 - e * e);
  return j([[t, t * e, 0], [t * e, t, 0], [0, 0, t * (1 - e) / 2]]);
}
function ql(r, e, t, a) {
  const n = e * a / r, u = 1 - a * n, f = r / u, D = e / u, c = a * e / u;
  return j([[f, c, 0], [c, D, 0], [0, 0, t]]);
}
export {
  Zl as a,
  Rl as b,
  Ql as c,
  j as d,
  Vl as e,
  au as f,
  Xl as g,
  Du as h,
  Ll as i,
  ql as j,
  Il as k,
  _l as l,
  hr as m,
  Pl as s,
  ne as t
};
