import { v as Ur, C as Or, L as ue, M as Yn, b as Kn, B as Hn, c as kn, D as jn, F as st, U as ru, g as eu, a as tu } from "./styles-aHt-Mdxa.js";
import { g as nu } from "./getParameters-DjGKBsKO.js";
import { _ as Fe, t as le, D as ft, C as Fr, m as uu, __tla as __tla_0 } from "./mesh-BuuDAlH2.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function au(r, e = 8) {
    const n = document.createElement("div");
    n.id = "legend";
    const u = Array.from({
      length: e + 1
    }, (f, d) => d / e).reverse();
    let t, a;
    return u.forEach((f, d) => {
      t = document.createElement("div"), t.id = `marker-${d}`, t.className = "marker", t.style.marginTop = d == 0 ? "0px" : `calc(${50 / e}vh - 1px)`, a = document.createElement("p"), a.id = `marker-text-${d}`, t.append(a), n.append(t);
    }), setTimeout(() => {
      Ur.derive(() => {
        u.forEach((f, d) => {
          a = document.getElementById(`marker-text-${d}`), a.innerText = iu(r.val, f).toString();
        });
      });
    }), n;
  }
  function iu(r, e) {
    const n = Math.max(...r) - Math.min(...r);
    return (Math.min(...r) + e * n).toPrecision(3);
  }
  class ou {
    constructor(e, n = 32) {
      this.isLut = true, this.lut = [], this.map = [], this.n = 0, this.minV = 0, this.maxV = 1, this.setColorMap(e, n);
    }
    set(e) {
      return e.isLut === true && this.copy(e), this;
    }
    setMin(e) {
      return this.minV = e, this;
    }
    setMax(e) {
      return this.maxV = e, this;
    }
    setColorMap(e, n = 32) {
      this.map = Te[e] || Te.rainbow, this.n = n;
      const u = 1 / this.n, t = new Or(), a = new Or();
      this.lut.length = 0, this.lut.push(new Or(this.map[0][1]));
      for (let f = 1; f < n; f++) {
        const d = f * u;
        for (let l = 0; l < this.map.length - 1; l++) if (d > this.map[l][0] && d <= this.map[l + 1][0]) {
          const c = this.map[l][0], i = this.map[l + 1][0];
          t.setHex(this.map[l][1], ue), a.setHex(this.map[l + 1][1], ue);
          const s = new Or().lerpColors(t, a, (d - c) / (i - c));
          this.lut.push(s);
        }
      }
      return this.lut.push(new Or(this.map[this.map.length - 1][1])), this;
    }
    copy(e) {
      return this.lut = e.lut, this.map = e.map, this.n = e.n, this.minV = e.minV, this.maxV = e.maxV, this;
    }
    getColor(e) {
      e = Yn.clamp(e, this.minV, this.maxV), e = (e - this.minV) / (this.maxV - this.minV);
      const n = Math.round(e * this.n);
      return this.lut[n];
    }
    addColorMap(e, n) {
      return Te[e] = n, this;
    }
    createCanvas() {
      const e = document.createElement("canvas");
      return e.width = 1, e.height = this.n, this.updateCanvas(e), e;
    }
    updateCanvas(e) {
      const n = e.getContext("2d", {
        alpha: false
      }), u = n.getImageData(0, 0, 1, this.n), t = u.data;
      let a = 0;
      const f = 1 / this.n, d = new Or(), l = new Or(), c = new Or();
      for (let i = 1; i >= 0; i -= f) for (let s = this.map.length - 1; s >= 0; s--) if (i < this.map[s][0] && i >= this.map[s - 1][0]) {
        const p = this.map[s - 1][0], v = this.map[s][0];
        d.setHex(this.map[s - 1][1], ue), l.setHex(this.map[s][1], ue), c.lerpColors(d, l, (i - p) / (v - p)), t[a * 4] = Math.round(c.r * 255), t[a * 4 + 1] = Math.round(c.g * 255), t[a * 4 + 2] = Math.round(c.b * 255), t[a * 4 + 3] = 255, a += 1;
      }
      return n.putImageData(u, 0, 0), e;
    }
  }
  const Te = {
    rainbow: [
      [
        0,
        255
      ],
      [
        0.2,
        65535
      ],
      [
        0.5,
        65280
      ],
      [
        0.8,
        16776960
      ],
      [
        1,
        16711680
      ]
    ],
    cooltowarm: [
      [
        0,
        3952322
      ],
      [
        0.2,
        10206463
      ],
      [
        0.5,
        14474460
      ],
      [
        0.8,
        16163717
      ],
      [
        1,
        11797542
      ]
    ],
    blackbody: [
      [
        0,
        0
      ],
      [
        0.2,
        7864320
      ],
      [
        0.5,
        15086080
      ],
      [
        0.8,
        16776960
      ],
      [
        1,
        16777215
      ]
    ],
    grayscale: [
      [
        0,
        0
      ],
      [
        0.2,
        4210752
      ],
      [
        0.5,
        8355712
      ],
      [
        0.8,
        12566463
      ],
      [
        1,
        16777215
      ]
    ]
  };
  function su(r, e, n) {
    const u = new ou(), t = new Or(), a = new Kn(new Hn(), new kn({
      side: jn,
      vertexColors: true
    }));
    u.setColorMap("rainbow"), a.renderOrder = -1, a.geometry.setAttribute("position", new st(r.flat(), 3)), a.geometry.setIndex(new ru(e.flat(), 1)), a.geometry.setAttribute("color", new st(r.map(() => [
      0,
      0,
      0
    ]).flat(), 3)), u.setMax(Math.max(...n)), u.setMin(Math.min(...n));
    for (let f = 0; f < n.length; f++) t.copy(u.getColor(n[f])).convertSRGBToLinear(), t.multiplyScalar(0.6), a.geometry.attributes.color.setXYZ(f, t.r, t.g, t.b);
    return a;
  }
  var an = {
    relTol: 1e-12,
    absTol: 1e-15,
    matrix: "Matrix",
    number: "number",
    numberFallback: "number",
    precision: 64,
    predictable: false,
    randomSeed: null
  };
  function fu(r, e) {
    if (ce(r, e)) return r[e];
    throw typeof r[e] == "function" && cu(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
  }
  function lu(r, e, n) {
    if (ce(r, e)) return r[e] = n, n;
    throw new Error('No access to property "' + e + '"');
  }
  function ce(r, e) {
    return !vu(r) && !Array.isArray(r) ? false : Hr(Du, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function cu(r, e) {
    return r == null || typeof r[e] != "function" || Hr(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? false : Hr(pu, e) ? true : !(e in Object.prototype || e in Function.prototype);
  }
  function vu(r) {
    return typeof r == "object" && r && r.constructor === Object;
  }
  var Du = {
    length: true,
    name: true
  }, pu = {
    toString: true,
    valueOf: true,
    toLocaleString: true
  };
  class du {
    constructor(e) {
      this.wrappedObject = e, this[Symbol.iterator] = this.entries;
    }
    keys() {
      return Object.keys(this.wrappedObject).filter((e) => this.has(e)).values();
    }
    get(e) {
      return fu(this.wrappedObject, e);
    }
    set(e, n) {
      return lu(this.wrappedObject, e, n), this;
    }
    has(e) {
      return ce(this.wrappedObject, e) && e in this.wrappedObject;
    }
    entries() {
      return hu(this.keys(), (e) => [
        e,
        this.get(e)
      ]);
    }
    forEach(e) {
      for (var n of this.keys()) e(this.get(n), n, this);
    }
    delete(e) {
      ce(this.wrappedObject, e) && delete this.wrappedObject[e];
    }
    clear() {
      for (var e of this.keys()) this.delete(e);
    }
    get size() {
      return Object.keys(this.wrappedObject).length;
    }
  }
  function hu(r, e) {
    return {
      next: () => {
        var n = r.next();
        return n.done ? n : {
          value: e(n.value),
          done: false
        };
      }
    };
  }
  function or(r) {
    return typeof r == "number";
  }
  function gr(r) {
    return !r || typeof r != "object" || typeof r.constructor != "function" ? false : r.isBigNumber === true && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === true || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === true;
  }
  function mu(r) {
    return typeof r == "bigint";
  }
  function Le(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === true || false;
  }
  function Ze(r) {
    return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === true || false;
  }
  function on(r) {
    return r && r.constructor.prototype.isUnit === true || false;
  }
  function Mr(r) {
    return typeof r == "string";
  }
  var vr = Array.isArray;
  function lr(r) {
    return r && r.constructor.prototype.isMatrix === true || false;
  }
  function ve(r) {
    return Array.isArray(r) || lr(r);
  }
  function sn(r) {
    return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function fn(r) {
    return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === true || false;
  }
  function ln(r) {
    return r && r.constructor.prototype.isRange === true || false;
  }
  function Je(r) {
    return r && r.constructor.prototype.isIndex === true || false;
  }
  function gu(r) {
    return typeof r == "boolean";
  }
  function yu(r) {
    return r && r.constructor.prototype.isResultSet === true || false;
  }
  function Au(r) {
    return r && r.constructor.prototype.isHelp === true || false;
  }
  function Fu(r) {
    return typeof r == "function";
  }
  function Eu(r) {
    return r instanceof Date;
  }
  function Cu(r) {
    return r instanceof RegExp;
  }
  function We(r) {
    return !!(r && typeof r == "object" && r.constructor === Object && !Le(r) && !Ze(r));
  }
  function wu(r) {
    return r ? r instanceof Map || r instanceof du || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : false;
  }
  function bu(r) {
    return r === null;
  }
  function Bu(r) {
    return r === void 0;
  }
  function _u(r) {
    return r && r.isAccessorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function xu(r) {
    return r && r.isArrayNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Su(r) {
    return r && r.isAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Mu(r) {
    return r && r.isBlockNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Nu(r) {
    return r && r.isConditionalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Tu(r) {
    return r && r.isConstantNode === true && r.constructor.prototype.isNode === true || false;
  }
  function zu(r) {
    return r && r.isFunctionAssignmentNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ou(r) {
    return r && r.isFunctionNode === true && r.constructor.prototype.isNode === true || false;
  }
  function $u(r) {
    return r && r.isIndexNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Iu(r) {
    return r && r.isNode === true && r.constructor.prototype.isNode === true || false;
  }
  function qu(r) {
    return r && r.isObjectNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Ru(r) {
    return r && r.isOperatorNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Uu(r) {
    return r && r.isParenthesisNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Pu(r) {
    return r && r.isRangeNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Vu(r) {
    return r && r.isRelationalNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Lu(r) {
    return r && r.isSymbolNode === true && r.constructor.prototype.isNode === true || false;
  }
  function Zu(r) {
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
    if (We(r)) return Ju(r, tr);
    throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
  }
  function Ju(r, e) {
    var n = {};
    for (var u in r) Hr(r, u) && (n[u] = e(r[u]));
    return n;
  }
  function Wu(r, e) {
    for (var n in e) Hr(e, n) && (r[n] = e[n]);
    return r;
  }
  function qr(r, e) {
    var n, u, t;
    if (Array.isArray(r)) {
      if (!Array.isArray(e) || r.length !== e.length) return false;
      for (u = 0, t = r.length; u < t; u++) if (!qr(r[u], e[u])) return false;
      return true;
    } else {
      if (typeof r == "function") return r === e;
      if (r instanceof Object) {
        if (Array.isArray(e) || !(e instanceof Object)) return false;
        for (n in r) if (!(n in e) || !qr(r[n], e[n])) return false;
        for (n in e) if (!(n in r)) return false;
        return true;
      } else return r === e;
    }
  }
  function Hr(r, e) {
    return r && Object.hasOwnProperty.call(r, e);
  }
  function Qu(r, e) {
    for (var n = {}, u = 0; u < e.length; u++) {
      var t = e[u], a = r[t];
      a !== void 0 && (n[t] = a);
    }
    return n;
  }
  var Gu = [
    "Matrix",
    "Array"
  ], Xu = [
    "number",
    "BigNumber",
    "Fraction"
  ], Cr = function(e) {
    if (e) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
    return Object.freeze(an);
  };
  Fe(Cr, an, {
    MATRIX_OPTIONS: Gu,
    NUMBER_OPTIONS: Xu
  });
  function J(r, e, n, u) {
    function t(a) {
      var f = Qu(a, e.map(Hu));
      return Yu(r, e, a), n(f);
    }
    return t.isFactory = true, t.fn = r, t.dependencies = e.slice().sort(), u && (t.meta = u), t;
  }
  function Yu(r, e, n) {
    var u = e.filter((a) => !Ku(a)).every((a) => n[a] !== void 0);
    if (!u) {
      var t = e.filter((a) => n[a] === void 0);
      throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
    }
  }
  function Ku(r) {
    return r && r[0] === "?";
  }
  function Hu(r) {
    return r && r[0] === "?" ? r.slice(1) : r;
  }
  function fr(r) {
    return typeof r == "boolean" ? true : isFinite(r) ? r === Math.round(r) : false;
  }
  var ku = Math.sign || function(r) {
    return r > 0 ? 1 : r < 0 ? -1 : 0;
  };
  function ze(r, e, n) {
    var u = {
      2: "0b",
      8: "0o",
      16: "0x"
    }, t = u[e], a = "";
    if (n) {
      if (n < 1) throw new Error("size must be in greater than 0");
      if (!fr(n)) throw new Error("size must be an integer");
      if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1))) throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
      if (!fr(r)) throw new Error("Value must be an integer");
      r < 0 && (r = r + 2 ** n), a = "i".concat(n);
    }
    var f = "";
    return r < 0 && (r = -r, f = "-"), "".concat(f).concat(t).concat(r.toString(e)).concat(a);
  }
  function $e(r, e) {
    if (typeof e == "function") return e(r);
    if (r === 1 / 0) return "Infinity";
    if (r === -1 / 0) return "-Infinity";
    if (isNaN(r)) return "NaN";
    var { notation: n, precision: u, wordSize: t } = cn(e);
    switch (n) {
      case "fixed":
        return ra(r, u);
      case "exponential":
        return vn(r, u);
      case "engineering":
        return ju(r, u);
      case "bin":
        return ze(r, 2, t);
      case "oct":
        return ze(r, 8, t);
      case "hex":
        return ze(r, 16, t);
      case "auto":
        return ea(r, u, e).replace(/((\.\d*?)(0+))($|e)/, function() {
          var a = arguments[2], f = arguments[4];
          return a !== "." ? a + f : f;
        });
      default:
        throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function cn(r) {
    var e = "auto", n, u;
    if (r !== void 0) if (or(r)) n = r;
    else if (gr(r)) n = r.toNumber();
    else if (We(r)) r.precision !== void 0 && (n = lt(r.precision, () => {
      throw new Error('Option "precision" must be a number or BigNumber');
    })), r.wordSize !== void 0 && (u = lt(r.wordSize, () => {
      throw new Error('Option "wordSize" must be a number or BigNumber');
    })), r.notation && (e = r.notation);
    else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
    return {
      notation: e,
      precision: n,
      wordSize: u
    };
  }
  function Ee(r) {
    var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
    if (!e) throw new SyntaxError("Invalid number " + r);
    var n = e[1], u = e[2], t = parseFloat(e[4] || "0"), a = u.indexOf(".");
    t += a !== -1 ? a - 1 : u.length - 1;
    var f = u.replace(".", "").replace(/^0*/, function(d) {
      return t -= d.length, "";
    }).replace(/0*$/, "").split("").map(function(d) {
      return parseInt(d);
    });
    return f.length === 0 && (f.push(0), t++), {
      sign: n,
      coefficients: f,
      exponent: t
    };
  }
  function ju(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = Ee(r), u = Ce(n, e), t = u.exponent, a = u.coefficients, f = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
    if (or(e)) for (; e > a.length || t - f + 1 > a.length; ) a.push(0);
    else for (var d = Math.abs(t - f) - (a.length - 1), l = 0; l < d; l++) a.push(0);
    for (var c = Math.abs(t - f), i = 1; c > 0; ) i++, c--;
    var s = a.slice(i).join(""), p = or(e) && s.length || s.match(/[1-9]/) ? "." + s : "", v = a.slice(0, i).join("") + p + "e" + (t >= 0 ? "+" : "") + f.toString();
    return u.sign + v;
  }
  function ra(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = Ee(r), u = typeof e == "number" ? Ce(n, n.exponent + 1 + e) : n, t = u.coefficients, a = u.exponent + 1, f = a + (e || 0);
    return t.length < f && (t = t.concat(Jr(f - t.length))), a < 0 && (t = Jr(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), u.sign + t.join("");
  }
  function vn(r, e) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var n = Ee(r), u = e ? Ce(n, e) : n, t = u.coefficients, a = u.exponent;
    t.length < e && (t = t.concat(Jr(e - t.length)));
    var f = t.shift();
    return u.sign + f + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
  }
  function ea(r, e, n) {
    if (isNaN(r) || !isFinite(r)) return String(r);
    var u = ct(n == null ? void 0 : n.lowerExp, -3), t = ct(n == null ? void 0 : n.upperExp, 5), a = Ee(r), f = e ? Ce(a, e) : a;
    if (f.exponent < u || f.exponent >= t) return vn(r, e);
    var d = f.coefficients, l = f.exponent;
    d.length < e && (d = d.concat(Jr(e - d.length))), d = d.concat(Jr(l - d.length + 1 + (d.length < e ? e - d.length : 0))), d = Jr(-l).concat(d);
    var c = l > 0 ? l : 0;
    return c < d.length - 1 && d.splice(c + 1, 0, "."), f.sign + d.join("");
  }
  function Ce(r, e) {
    for (var n = {
      sign: r.sign,
      coefficients: r.coefficients,
      exponent: r.exponent
    }, u = n.coefficients; e <= 0; ) u.unshift(0), n.exponent++, e++;
    if (u.length > e) {
      var t = u.splice(e, u.length - e);
      if (t[0] >= 5) {
        var a = e - 1;
        for (u[a]++; u[a] === 10; ) u.pop(), a === 0 && (u.unshift(0), n.exponent++, a++), a--, u[a]++;
      }
    }
    return n;
  }
  function Jr(r) {
    for (var e = [], n = 0; n < r; n++) e.push(0);
    return e;
  }
  function ta(r) {
    return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
  }
  function $r(r, e) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (u < 0) throw new Error("Absolute tolerance must be at least 0");
    return isNaN(r) || isNaN(e) ? false : !isFinite(r) || !isFinite(e) ? r === e : r === e ? true : Math.abs(r - e) <= Math.max(n * Math.max(Math.abs(r), Math.abs(e)), u);
  }
  function lt(r, e) {
    if (or(r)) return r;
    if (gr(r)) return r.toNumber();
    e();
  }
  function ct(r, e) {
    return or(r) ? r : gr(r) ? r.toNumber() : e;
  }
  var Dn = function() {
    return Dn = le.create, le;
  }, na = [
    "?BigNumber",
    "?Complex",
    "?DenseMatrix",
    "?Fraction"
  ], ua = J("typed", na, function(e) {
    var { BigNumber: n, Complex: u, DenseMatrix: t, Fraction: a } = e, f = Dn();
    return f.clear(), f.addTypes([
      {
        name: "number",
        test: or
      },
      {
        name: "Complex",
        test: Le
      },
      {
        name: "BigNumber",
        test: gr
      },
      {
        name: "bigint",
        test: mu
      },
      {
        name: "Fraction",
        test: Ze
      },
      {
        name: "Unit",
        test: on
      },
      {
        name: "identifier",
        test: (d) => Mr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(d)
      },
      {
        name: "string",
        test: Mr
      },
      {
        name: "Chain",
        test: Zu
      },
      {
        name: "Array",
        test: vr
      },
      {
        name: "Matrix",
        test: lr
      },
      {
        name: "DenseMatrix",
        test: sn
      },
      {
        name: "SparseMatrix",
        test: fn
      },
      {
        name: "Range",
        test: ln
      },
      {
        name: "Index",
        test: Je
      },
      {
        name: "boolean",
        test: gu
      },
      {
        name: "ResultSet",
        test: yu
      },
      {
        name: "Help",
        test: Au
      },
      {
        name: "function",
        test: Fu
      },
      {
        name: "Date",
        test: Eu
      },
      {
        name: "RegExp",
        test: Cu
      },
      {
        name: "null",
        test: bu
      },
      {
        name: "undefined",
        test: Bu
      },
      {
        name: "AccessorNode",
        test: _u
      },
      {
        name: "ArrayNode",
        test: xu
      },
      {
        name: "AssignmentNode",
        test: Su
      },
      {
        name: "BlockNode",
        test: Mu
      },
      {
        name: "ConditionalNode",
        test: Nu
      },
      {
        name: "ConstantNode",
        test: Tu
      },
      {
        name: "FunctionNode",
        test: Ou
      },
      {
        name: "FunctionAssignmentNode",
        test: zu
      },
      {
        name: "IndexNode",
        test: $u
      },
      {
        name: "Node",
        test: Iu
      },
      {
        name: "ObjectNode",
        test: qu
      },
      {
        name: "OperatorNode",
        test: Ru
      },
      {
        name: "ParenthesisNode",
        test: Uu
      },
      {
        name: "RangeNode",
        test: Pu
      },
      {
        name: "RelationalNode",
        test: Vu
      },
      {
        name: "SymbolNode",
        test: Lu
      },
      {
        name: "Map",
        test: wu
      },
      {
        name: "Object",
        test: We
      }
    ]), f.addConversions([
      {
        from: "number",
        to: "BigNumber",
        convert: function(l) {
          if (n || ae(l), ta(l) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + l + "). Use function bignumber(x) to convert to BigNumber.");
          return new n(l);
        }
      },
      {
        from: "number",
        to: "Complex",
        convert: function(l) {
          return u || ie(l), new u(l, 0);
        }
      },
      {
        from: "BigNumber",
        to: "Complex",
        convert: function(l) {
          return u || ie(l), new u(l.toNumber(), 0);
        }
      },
      {
        from: "bigint",
        to: "number",
        convert: function(l) {
          if (l > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + l + ")");
          return Number(l);
        }
      },
      {
        from: "bigint",
        to: "BigNumber",
        convert: function(l) {
          return n || ae(l), new n(l.toString());
        }
      },
      {
        from: "bigint",
        to: "Fraction",
        convert: function(l) {
          return a || oe(l), new a(l.toString());
        }
      },
      {
        from: "Fraction",
        to: "BigNumber",
        convert: function(l) {
          throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
        }
      },
      {
        from: "Fraction",
        to: "Complex",
        convert: function(l) {
          return u || ie(l), new u(l.valueOf(), 0);
        }
      },
      {
        from: "number",
        to: "Fraction",
        convert: function(l) {
          a || oe(l);
          var c = new a(l);
          if (c.valueOf() !== l) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + l + "). Use function fraction(x) to convert to Fraction.");
          return c;
        }
      },
      {
        from: "string",
        to: "number",
        convert: function(l) {
          var c = Number(l);
          if (isNaN(c)) throw new Error('Cannot convert "' + l + '" to a number');
          return c;
        }
      },
      {
        from: "string",
        to: "BigNumber",
        convert: function(l) {
          n || ae(l);
          try {
            return new n(l);
          } catch {
            throw new Error('Cannot convert "' + l + '" to BigNumber');
          }
        }
      },
      {
        from: "string",
        to: "bigint",
        convert: function(l) {
          try {
            return BigInt(l);
          } catch {
            throw new Error('Cannot convert "' + l + '" to BigInt');
          }
        }
      },
      {
        from: "string",
        to: "Fraction",
        convert: function(l) {
          a || oe(l);
          try {
            return new a(l);
          } catch {
            throw new Error('Cannot convert "' + l + '" to Fraction');
          }
        }
      },
      {
        from: "string",
        to: "Complex",
        convert: function(l) {
          u || ie(l);
          try {
            return new u(l);
          } catch {
            throw new Error('Cannot convert "' + l + '" to Complex');
          }
        }
      },
      {
        from: "boolean",
        to: "number",
        convert: function(l) {
          return +l;
        }
      },
      {
        from: "boolean",
        to: "BigNumber",
        convert: function(l) {
          return n || ae(l), new n(+l);
        }
      },
      {
        from: "boolean",
        to: "bigint",
        convert: function(l) {
          return BigInt(+l);
        }
      },
      {
        from: "boolean",
        to: "Fraction",
        convert: function(l) {
          return a || oe(l), new a(+l);
        }
      },
      {
        from: "boolean",
        to: "string",
        convert: function(l) {
          return String(l);
        }
      },
      {
        from: "Array",
        to: "Matrix",
        convert: function(l) {
          return t || aa(), new t(l);
        }
      },
      {
        from: "Matrix",
        to: "Array",
        convert: function(l) {
          return l.valueOf();
        }
      }
    ]), f.onMismatch = (d, l, c) => {
      var i = f.createError(d, l, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(i.data.category) && l.length === 1 && ve(l[0]) && c.some((p) => !p.params.includes(","))) {
        var s = new TypeError("Function '".concat(d, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(d, ")'."));
        throw s.data = i.data, s;
      }
      throw i;
    }, f.onMismatch = (d, l, c) => {
      var i = f.createError(d, l, c);
      if ([
        "wrongType",
        "mismatch"
      ].includes(i.data.category) && l.length === 1 && ve(l[0]) && c.some((p) => !p.params.includes(","))) {
        var s = new TypeError("Function '".concat(d, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(d, ")'."));
        throw s.data = i.data, s;
      }
      throw i;
    }, f;
  });
  function ae(r) {
    throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
  }
  function ie(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
  }
  function aa() {
    throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
  }
  function oe(r) {
    throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
  }
  var ia = "BigNumber", oa = [
    "?on",
    "config"
  ], sa = J(ia, oa, (r) => {
    var { on: e, config: n } = r, u = ft.clone({
      precision: n.precision,
      modulo: ft.EUCLID
    });
    return u.prototype = Object.create(u.prototype), u.prototype.type = "BigNumber", u.prototype.isBigNumber = true, u.prototype.toJSON = function() {
      return {
        mathjs: "BigNumber",
        value: this.toString()
      };
    }, u.fromJSON = function(t) {
      return new u(t.value);
    }, e && e("config", function(t, a) {
      t.precision !== a.precision && u.config({
        precision: t.precision
      });
    }), u;
  }, {
    isClass: true
  }), fa = "Complex", la = [], ca = J(fa, la, () => (Object.defineProperty(Fr, "name", {
    value: "Complex"
  }), Fr.prototype.constructor = Fr, Fr.prototype.type = "Complex", Fr.prototype.isComplex = true, Fr.prototype.toJSON = function() {
    return {
      mathjs: "Complex",
      re: this.re,
      im: this.im
    };
  }, Fr.prototype.toPolar = function() {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  }, Fr.prototype.format = function(r) {
    var e = "", n = this.im, u = this.re, t = $e(this.re, r), a = $e(this.im, r), f = or(r) ? r : r ? r.precision : null;
    if (f !== null) {
      var d = Math.pow(10, -f);
      Math.abs(u / n) < d && (u = 0), Math.abs(n / u) < d && (n = 0);
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
        if (or(n)) {
          if (on(u) && u.hasBase("ANGLE") && (u = u.toNumber("rad")), or(u)) return new Fr({
            r: n,
            phi: u
          });
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
  }, Fr), {
    isClass: true
  });
  var va = 2e3, K = {
    s: 1,
    n: 0,
    d: 1
  };
  function zr(r, e) {
    if (isNaN(r = parseInt(r, 10))) throw se();
    return r * e;
  }
  function dr(r, e) {
    if (e === 0) throw Qe();
    var n = Object.create(Er.prototype);
    n.s = r < 0 ? -1 : 1, r = r < 0 ? -r : r;
    var u = Zr(r, e);
    return n.n = r / u, n.d = e / u, n;
  }
  function vt(r) {
    for (var e = {}, n = r, u = 2, t = 4; t <= n; ) {
      for (; n % u === 0; ) n /= u, e[u] = (e[u] || 0) + 1;
      t += 1 + 2 * u++;
    }
    return n !== r ? n > 1 && (e[n] = (e[n] || 0) + 1) : e[r] = (e[r] || 0) + 1, e;
  }
  var xr = function(r, e) {
    var n = 0, u = 1, t = 1, a = 0, f = 0, d = 0, l = 1, c = 1, i = 0, s = 1, p = 1, v = 1, D = 1e7, o;
    if (r != null) if (e !== void 0) {
      if (n = r, u = e, t = n * u, n % 1 !== 0 || u % 1 !== 0) throw ha();
    } else switch (typeof r) {
      case "object": {
        if ("d" in r && "n" in r) n = r.n, u = r.d, "s" in r && (n *= r.s);
        else if (0 in r) n = r[0], 1 in r && (u = r[1]);
        else throw se();
        t = n * u;
        break;
      }
      case "number": {
        if (r < 0 && (t = r, r = -r), r % 1 === 0) n = r;
        else if (r > 0) {
          for (r >= 1 && (c = Math.pow(10, Math.floor(1 + Math.log(r) / Math.LN10)), r /= c); s <= D && v <= D; ) if (o = (i + p) / (s + v), r === o) {
            s + v <= D ? (n = i + p, u = s + v) : v > s ? (n = p, u = v) : (n = i, u = s);
            break;
          } else r > o ? (i += p, s += v) : (p += i, v += s), s > D ? (n = p, u = v) : (n = i, u = s);
          n *= c;
        } else (isNaN(r) || isNaN(e)) && (u = n = NaN);
        break;
      }
      case "string": {
        if (s = r.match(/\d+|./g), s === null) throw se();
        if (s[i] === "-" ? (t = -1, i++) : s[i] === "+" && i++, s.length === i + 1 ? f = zr(s[i++], t) : s[i + 1] === "." || s[i] === "." ? (s[i] !== "." && (a = zr(s[i++], t)), i++, (i + 1 === s.length || s[i + 1] === "(" && s[i + 3] === ")" || s[i + 1] === "'" && s[i + 3] === "'") && (f = zr(s[i], t), l = Math.pow(10, s[i].length), i++), (s[i] === "(" && s[i + 2] === ")" || s[i] === "'" && s[i + 2] === "'") && (d = zr(s[i + 1], t), c = Math.pow(10, s[i + 1].length) - 1, i += 3)) : s[i + 1] === "/" || s[i + 1] === ":" ? (f = zr(s[i], t), l = zr(s[i + 2], 1), i += 3) : s[i + 3] === "/" && s[i + 1] === " " && (a = zr(s[i], t), f = zr(s[i + 2], t), l = zr(s[i + 4], 1), i += 5), s.length <= i) {
          u = l * c, t = n = d + u * a + c * f;
          break;
        }
      }
      default:
        throw se();
    }
    if (u === 0) throw Qe();
    K.s = t < 0 ? -1 : 1, K.n = Math.abs(n), K.d = Math.abs(u);
  };
  function Da(r, e, n) {
    for (var u = 1; e > 0; r = r * r % n, e >>= 1) e & 1 && (u = u * r % n);
    return u;
  }
  function pa(r, e) {
    for (; e % 2 === 0; e /= 2) ;
    for (; e % 5 === 0; e /= 5) ;
    if (e === 1) return 0;
    for (var n = 10 % e, u = 1; n !== 1; u++) if (n = n * 10 % e, u > va) return 0;
    return u;
  }
  function da(r, e, n) {
    for (var u = 1, t = Da(10, n, e), a = 0; a < 300; a++) {
      if (u === t) return a;
      u = u * 10 % e, t = t * 10 % e;
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
  function Er(r, e) {
    if (xr(r, e), this instanceof Er) r = Zr(K.d, K.n), this.s = K.s, this.n = K.n / r, this.d = K.d / r;
    else return dr(K.s * K.n, K.d);
  }
  var Qe = function() {
    return new Error("Division by Zero");
  }, se = function() {
    return new Error("Invalid argument");
  }, ha = function() {
    return new Error("Parameters must be integer");
  };
  Er.prototype = {
    s: 1,
    n: 0,
    d: 1,
    abs: function() {
      return dr(this.n, this.d);
    },
    neg: function() {
      return dr(-this.s * this.n, this.d);
    },
    add: function(r, e) {
      return xr(r, e), dr(this.s * this.n * K.d + K.s * this.d * K.n, this.d * K.d);
    },
    sub: function(r, e) {
      return xr(r, e), dr(this.s * this.n * K.d - K.s * this.d * K.n, this.d * K.d);
    },
    mul: function(r, e) {
      return xr(r, e), dr(this.s * K.s * this.n * K.n, this.d * K.d);
    },
    div: function(r, e) {
      return xr(r, e), dr(this.s * K.s * this.n * K.d, this.d * K.n);
    },
    clone: function() {
      return dr(this.s * this.n, this.d);
    },
    mod: function(r, e) {
      if (isNaN(this.n) || isNaN(this.d)) return new Er(NaN);
      if (r === void 0) return dr(this.s * this.n % this.d, 1);
      if (xr(r, e), K.n === 0 && this.d === 0) throw Qe();
      return dr(this.s * (K.d * this.n) % (K.n * this.d), K.d * this.d);
    },
    gcd: function(r, e) {
      return xr(r, e), dr(Zr(K.n, this.n) * Zr(K.d, this.d), K.d * this.d);
    },
    lcm: function(r, e) {
      return xr(r, e), K.n === 0 && this.n === 0 ? dr(0, 1) : dr(K.n * this.n, Zr(K.n, this.n) * Zr(K.d, this.d));
    },
    ceil: function(r) {
      return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new Er(NaN) : dr(Math.ceil(r * this.s * this.n / this.d), r);
    },
    floor: function(r) {
      return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new Er(NaN) : dr(Math.floor(r * this.s * this.n / this.d), r);
    },
    round: function(r) {
      return r = Math.pow(10, r || 0), isNaN(this.n) || isNaN(this.d) ? new Er(NaN) : dr(Math.round(r * this.s * this.n / this.d), r);
    },
    roundTo: function(r, e) {
      return xr(r, e), dr(this.s * Math.round(this.n * K.d / (this.d * K.n)) * K.n, K.d);
    },
    inverse: function() {
      return dr(this.s * this.d, this.n);
    },
    pow: function(r, e) {
      if (xr(r, e), K.d === 1) return K.s < 0 ? dr(Math.pow(this.s * this.d, K.n), Math.pow(this.n, K.n)) : dr(Math.pow(this.s * this.n, K.n), Math.pow(this.d, K.n));
      if (this.s < 0) return null;
      var n = vt(this.n), u = vt(this.d), t = 1, a = 1;
      for (var f in n) if (f !== "1") {
        if (f === "0") {
          t = 0;
          break;
        }
        if (n[f] *= K.n, n[f] % K.d === 0) n[f] /= K.d;
        else return null;
        t *= Math.pow(f, n[f]);
      }
      for (var f in u) if (f !== "1") {
        if (u[f] *= K.n, u[f] % K.d === 0) u[f] /= K.d;
        else return null;
        a *= Math.pow(f, u[f]);
      }
      return K.s < 0 ? dr(a, t) : dr(t, a);
    },
    equals: function(r, e) {
      return xr(r, e), this.s * this.n * K.d === K.s * K.n * this.d;
    },
    compare: function(r, e) {
      xr(r, e);
      var n = this.s * this.n * K.d - K.s * K.n * this.d;
      return (0 < n) - (n < 0);
    },
    simplify: function(r) {
      if (isNaN(this.n) || isNaN(this.d)) return this;
      r = r || 1e-3;
      for (var e = this.abs(), n = e.toContinued(), u = 1; u < n.length; u++) {
        for (var t = dr(n[u - 1], 1), a = u - 2; a >= 0; a--) t = t.inverse().add(n[a]);
        if (Math.abs(t.sub(e).valueOf()) < r) return t.mul(this.s);
      }
      return this;
    },
    divisible: function(r, e) {
      return xr(r, e), !(!(K.n * this.d) || this.n * K.d % (K.n * this.d));
    },
    valueOf: function() {
      return this.s * this.n / this.d;
    },
    toFraction: function(r) {
      var e, n = "", u = this.n, t = this.d;
      return this.s < 0 && (n += "-"), t === 1 ? n += u : (r && (e = Math.floor(u / t)) > 0 && (n += e, n += " ", u %= t), n += u, n += "/", n += t), n;
    },
    toLatex: function(r) {
      var e, n = "", u = this.n, t = this.d;
      return this.s < 0 && (n += "-"), t === 1 ? n += u : (r && (e = Math.floor(u / t)) > 0 && (n += e, u %= t), n += "\\frac{", n += u, n += "}{", n += t, n += "}"), n;
    },
    toContinued: function() {
      var r, e = this.n, n = this.d, u = [];
      if (isNaN(e) || isNaN(n)) return u;
      do
        u.push(Math.floor(e / n)), r = e % n, e = n, n = r;
      while (e !== 1);
      return u;
    },
    toString: function(r) {
      var e = this.n, n = this.d;
      if (isNaN(e) || isNaN(n)) return "NaN";
      r = r || 15;
      var u = pa(e, n), t = da(e, n, u), a = this.s < 0 ? "-" : "";
      if (a += e / n | 0, e %= n, e *= 10, e && (a += "."), u) {
        for (var f = t; f--; ) a += e / n | 0, e %= n, e *= 10;
        a += "(";
        for (var f = u; f--; ) a += e / n | 0, e %= n, e *= 10;
        a += ")";
      } else for (var f = r; e && f--; ) a += e / n | 0, e %= n, e *= 10;
      return a;
    }
  };
  var ma = "Fraction", ga = [], ya = J(ma, ga, () => (Object.defineProperty(Er, "name", {
    value: "Fraction"
  }), Er.prototype.constructor = Er, Er.prototype.type = "Fraction", Er.prototype.isFraction = true, Er.prototype.toJSON = function() {
    return {
      mathjs: "Fraction",
      n: this.s * this.n,
      d: this.d
    };
  }, Er.fromJSON = function(r) {
    return new Er(r);
  }, Er), {
    isClass: true
  }), Aa = "Matrix", Fa = [], Ea = J(Aa, Fa, () => {
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
  }, {
    isClass: true
  });
  function Oe(r, e, n) {
    var u = r.constructor, t = new u(2), a = "";
    if (n) {
      if (n < 1) throw new Error("size must be in greater than 0");
      if (!fr(n)) throw new Error("size must be an integer");
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
  function Ca(r, e) {
    if (typeof e == "function") return e(r);
    if (!r.isFinite()) return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
    var { notation: n, precision: u, wordSize: t } = cn(e);
    switch (n) {
      case "fixed":
        return ba(r, u);
      case "exponential":
        return Dt(r, u);
      case "engineering":
        return wa(r, u);
      case "bin":
        return Oe(r, 2, t);
      case "oct":
        return Oe(r, 8, t);
      case "hex":
        return Oe(r, 16, t);
      case "auto": {
        var a = pt(e == null ? void 0 : e.lowerExp, -3), f = pt(e == null ? void 0 : e.upperExp, 5);
        if (r.isZero()) return "0";
        var d, l = r.toSignificantDigits(u), c = l.e;
        return c >= a && c < f ? d = l.toFixed() : d = Dt(r, u), d.replace(/((\.\d*?)(0+))($|e)/, function() {
          var i = arguments[2], s = arguments[4];
          return i !== "." ? i + s : s;
        });
      }
      default:
        throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function wa(r, e) {
    var n = r.e, u = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -u)), a = t.toPrecision(e);
    if (a.includes("e")) {
      var f = r.constructor;
      a = new f(a).toFixed();
    }
    return a + "e" + (n >= 0 ? "+" : "") + u.toString();
  }
  function Dt(r, e) {
    return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
  }
  function ba(r, e) {
    return r.toFixed(e);
  }
  function pt(r, e) {
    return or(r) ? r : gr(r) ? r.toNumber() : e;
  }
  function Dr(r, e) {
    var n = Ba(r, e);
    return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
  }
  function Ba(r, e) {
    if (typeof r == "number") return $e(r, e);
    if (gr(r)) return Ca(r, e);
    if (_a(r)) return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
    if (Array.isArray(r)) return pn(r, e);
    if (Mr(r)) return dt(r);
    if (typeof r == "function") return r.syntax ? String(r.syntax) : "function";
    if (r && typeof r == "object") {
      if (typeof r.format == "function") return r.format(e);
      if (r && r.toString(e) !== {}.toString()) return r.toString(e);
      var n = Object.keys(r).map((u) => dt(u) + ": " + Dr(r[u], e));
      return "{" + n.join(", ") + "}";
    }
    return String(r);
  }
  function dt(r) {
    for (var e = String(r), n = "", u = 0; u < e.length; ) {
      var t = e.charAt(u);
      n += t in ht ? ht[t] : t, u++;
    }
    return '"' + n + '"';
  }
  var ht = {
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t"
  };
  function pn(r, e) {
    if (Array.isArray(r)) {
      for (var n = "[", u = r.length, t = 0; t < u; t++) t !== 0 && (n += ", "), n += pn(r[t], e);
      return n += "]", n;
    } else return Dr(r, e);
  }
  function _a(r) {
    return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || false;
  }
  function nr(r, e, n) {
    if (!(this instanceof nr)) throw new SyntaxError("Constructor must be called with the new operator");
    this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
  }
  nr.prototype = new RangeError();
  nr.prototype.constructor = RangeError;
  nr.prototype.name = "DimensionError";
  nr.prototype.isDimensionError = true;
  function Pr(r, e, n) {
    if (!(this instanceof Pr)) throw new SyntaxError("Constructor must be called with the new operator");
    this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
  }
  Pr.prototype = new RangeError();
  Pr.prototype.constructor = RangeError;
  Pr.prototype.name = "IndexError";
  Pr.prototype.isIndexError = true;
  function mr(r) {
    for (var e = []; Array.isArray(r); ) e.push(r.length), r = r[0];
    return e;
  }
  function dn(r, e, n) {
    var u, t = r.length;
    if (t !== e[n]) throw new nr(t, e[n]);
    if (n < e.length - 1) {
      var a = n + 1;
      for (u = 0; u < t; u++) {
        var f = r[u];
        if (!Array.isArray(f)) throw new nr(e.length - 1, e.length, "<");
        dn(r[u], e, a);
      }
    } else for (u = 0; u < t; u++) if (Array.isArray(r[u])) throw new nr(e.length + 1, e.length, ">");
  }
  function mt(r, e) {
    var n = e.length === 0;
    if (n) {
      if (Array.isArray(r)) throw new nr(r.length, 0);
    } else dn(r, e, 0);
  }
  function hr(r, e) {
    if (r !== void 0) {
      if (!or(r) || !fr(r)) throw new TypeError("Index must be an integer (value: " + r + ")");
      if (r < 0 || typeof e == "number" && r >= e) throw new Pr(r, e);
    }
  }
  function De(r, e, n) {
    if (!Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new Error("Resizing to scalar is not supported");
    e.forEach(function(t) {
      if (!or(t) || !fr(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Dr(e) + ")");
    }), (or(r) || gr(r)) && (r = [
      r
    ]);
    var u = n !== void 0 ? n : 0;
    return Ie(r, e, 0, u), r;
  }
  function Ie(r, e, n, u) {
    var t, a, f = r.length, d = e[n], l = Math.min(f, d);
    if (r.length = d, n < e.length - 1) {
      var c = n + 1;
      for (t = 0; t < l; t++) a = r[t], Array.isArray(a) || (a = [
        a
      ], r[t] = a), Ie(a, e, c, u);
      for (t = l; t < d; t++) a = [], r[t] = a, Ie(a, e, c, u);
    } else {
      for (t = 0; t < l; t++) for (; Array.isArray(r[t]); ) r[t] = r[t][0];
      for (t = l; t < d; t++) r[t] = u;
    }
  }
  function Ge(r, e) {
    var n = qe(r), u = n.length;
    if (!Array.isArray(r) || !Array.isArray(e)) throw new TypeError("Array expected");
    if (e.length === 0) throw new nr(0, u, "!=");
    e = Xe(e, u);
    var t = hn(e);
    if (u !== t) throw new nr(t, u, "!=");
    try {
      return xa(n, e);
    } catch (a) {
      throw a instanceof nr ? new nr(t, u, "!=") : a;
    }
  }
  function Xe(r, e) {
    var n = hn(r), u = r.slice(), t = -1, a = r.indexOf(t), f = r.indexOf(t, a + 1) >= 0;
    if (f) throw new Error("More than one wildcard in sizes");
    var d = a >= 0, l = e % n === 0;
    if (d) if (l) u[a] = -e / n;
    else throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
    return u;
  }
  function hn(r) {
    return r.reduce((e, n) => e * n, 1);
  }
  function xa(r, e) {
    for (var n = r, u, t = e.length - 1; t > 0; t--) {
      var a = e[t];
      u = [];
      for (var f = n.length / a, d = 0; d < f; d++) u.push(n.slice(d * a, (d + 1) * a));
      n = u;
    }
    return n;
  }
  function mn(r, e, n, u) {
    var t = u || mr(r);
    if (n) for (var a = 0; a < n; a++) r = [
      r
    ], t.unshift(1);
    for (r = gn(r, e, 0); t.length < e; ) t.push(1);
    return r;
  }
  function gn(r, e, n) {
    var u, t;
    if (Array.isArray(r)) {
      var a = n + 1;
      for (u = 0, t = r.length; u < t; u++) r[u] = gn(r[u], e, a);
    } else for (var f = n; f < e; f++) r = [
      r
    ];
    return r;
  }
  function qe(r) {
    if (!Array.isArray(r)) return r;
    var e = [];
    return r.forEach(function n(u) {
      Array.isArray(u) ? u.forEach(n) : e.push(u);
    }), e;
  }
  function we(r, e) {
    for (var n, u = 0, t = 0; t < r.length; t++) {
      var a = r[t], f = Array.isArray(a);
      if (t === 0 && f && (u = a.length), f && a.length !== u) return;
      var d = f ? we(a, e) : e(a);
      if (n === void 0) n = d;
      else if (n !== d) return "mixed";
    }
    return n;
  }
  function yn(r, e, n, u) {
    if (u < n) {
      if (r.length !== e.length) throw new nr(r.length, e.length);
      for (var t = [], a = 0; a < r.length; a++) t[a] = yn(r[a], e[a], n, u + 1);
      return t;
    } else return r.concat(e);
  }
  function An() {
    var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
    if (r.length === 1) return r[0];
    if (r.length > 1) return r.slice(1).reduce(function(n, u) {
      return yn(n, u, e, 0);
    }, r[0]);
    throw new Error("Wrong number of arguments in function concat");
  }
  function Fn() {
    for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
    for (var u = e.map((p) => p.length), t = Math.max(...u), a = new Array(t).fill(null), f = 0; f < e.length; f++) for (var d = e[f], l = u[f], c = 0; c < l; c++) {
      var i = t - l + c;
      d[c] > a[i] && (a[i] = d[c]);
    }
    for (var s = 0; s < e.length; s++) En(e[s], a);
    return a;
  }
  function En(r, e) {
    for (var n = e.length, u = r.length, t = 0; t < u; t++) {
      var a = n - u + t;
      if (r[t] < e[a] && r[t] > 1 || r[t] > e[a]) throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(u, " with size ").concat(r[t], " to size ").concat(e[a]));
    }
  }
  function Re(r, e) {
    var n = mr(r);
    if (qr(n, e)) return r;
    En(n, e);
    var u = Fn(n, e), t = u.length, a = [
      ...Array(t - n.length).fill(1),
      ...n
    ], f = Ma(r);
    n.length < t && (f = Ge(f, a), n = mr(f));
    for (var d = 0; d < t; d++) n[d] < u[d] && (f = Sa(f, u[d], d), n = mr(f));
    return f;
  }
  function Sa(r, e, n) {
    return An(...Array(e).fill(r), n);
  }
  function Cn(r, e) {
    if (!Array.isArray(r)) throw new Error("Array expected");
    var n = mr(r);
    if (e.length !== n.length) throw new nr(e.length, n.length);
    for (var u = 0; u < e.length; u++) hr(e[u], n[u]);
    return e.reduce((t, a) => t[a], r);
  }
  function Ma(r) {
    return Fe([], r);
  }
  function pe(r, e, n) {
    if (le.isTypedFunction(r)) {
      var u = (e.isMatrix ? e.size() : mr(e)).map(() => 0), t = e.isMatrix ? e.get(u) : Cn(e, u), a = Object.keys(r.signatures).length === 1, f = Na(r, t, u, e), d = a ? Object.values(r.signatures)[0] : r;
      return f >= 1 && f <= 3 ? function() {
        for (var l = arguments.length, c = new Array(l), i = 0; i < l; i++) c[i] = arguments[i];
        return gt(d, c.slice(0, f), n, r.name);
      } : function() {
        for (var l = arguments.length, c = new Array(l), i = 0; i < l; i++) c[i] = arguments[i];
        return gt(d, c, n, r.name);
      };
    }
    return r;
  }
  function Na(r, e, n, u) {
    for (var t = [
      e,
      n,
      u
    ], a = 3; a > 0; a--) {
      var f = t.slice(0, a);
      if (le.resolve(r, f) !== null) return a;
    }
  }
  function gt(r, e, n, u) {
    try {
      return r(...e);
    } catch (t) {
      Ta(t, e, n, u);
    }
  }
  function Ta(r, e, n, u) {
    var t;
    if (r instanceof TypeError && ((t = r.data) === null || t === void 0 ? void 0 : t.category) === "wrongType") {
      var a = [];
      throw a.push("value: ".concat(Nr(e[0]))), e.length >= 2 && a.push("index: ".concat(Nr(e[1]))), e.length >= 3 && a.push("array: ".concat(Nr(e[2]))), new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "".concat(u, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(e[1])));
    } else throw new TypeError("Function ".concat(n, " cannot apply callback arguments ") + "to function ".concat(u, ": ").concat(r.message));
  }
  var za = "DenseMatrix", Oa = [
    "Matrix"
  ], $a = J(za, Oa, (r) => {
    var { Matrix: e } = r;
    function n(i, s) {
      if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
      if (s && !Mr(s)) throw new Error("Invalid datatype: " + s);
      if (lr(i)) i.type === "DenseMatrix" ? (this._data = tr(i._data), this._size = tr(i._size), this._datatype = s || i._datatype) : (this._data = i.toArray(), this._size = i.size(), this._datatype = s || i._datatype);
      else if (i && vr(i.data) && vr(i.size)) this._data = i.data, this._size = i.size, mt(this._data, this._size), this._datatype = s || i.datatype;
      else if (vr(i)) this._data = c(i), this._size = mr(this._data), mt(this._data, this._size), this._datatype = s;
      else {
        if (i) throw new TypeError("Unsupported type of data (" + Nr(i) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = s;
      }
    }
    n.prototype = new e(), n.prototype.createDenseMatrix = function(i, s) {
      return new n(i, s);
    }, Object.defineProperty(n, "name", {
      value: "DenseMatrix"
    }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = true, n.prototype.getDataType = function() {
      return we(this._data, Nr);
    }, n.prototype.storage = function() {
      return "dense";
    }, n.prototype.datatype = function() {
      return this._datatype;
    }, n.prototype.create = function(i, s) {
      return new n(i, s);
    }, n.prototype.subset = function(i, s, p) {
      switch (arguments.length) {
        case 1:
          return u(this, i);
        case 2:
        case 3:
          return a(this, i, s, p);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    }, n.prototype.get = function(i) {
      return Cn(this._data, i);
    }, n.prototype.set = function(i, s, p) {
      if (!vr(i)) throw new TypeError("Array expected");
      if (i.length < this._size.length) throw new nr(i.length, this._size.length, "<");
      var v, D, o, h = i.map(function(C) {
        return C + 1;
      });
      l(this, h, p);
      var g = this._data;
      for (v = 0, D = i.length - 1; v < D; v++) o = i[v], hr(o, g.length), g = g[o];
      return o = i[i.length - 1], hr(o, g.length), g[o] = s, this;
    };
    function u(i, s) {
      if (!Je(s)) throw new TypeError("Invalid index");
      var p = s.isScalar();
      if (p) return i.get(s.min());
      var v = s.size();
      if (v.length !== i._size.length) throw new nr(v.length, i._size.length);
      for (var D = s.min(), o = s.max(), h = 0, g = i._size.length; h < g; h++) hr(D[h], i._size[h]), hr(o[h], i._size[h]);
      return new n(t(i._data, s, v.length, 0), i._datatype);
    }
    function t(i, s, p, v) {
      var D = v === p - 1, o = s.dimension(v);
      return D ? o.map(function(h) {
        return hr(h, i.length), i[h];
      }).valueOf() : o.map(function(h) {
        hr(h, i.length);
        var g = i[h];
        return t(g, s, p, v + 1);
      }).valueOf();
    }
    function a(i, s, p, v) {
      if (!s || s.isIndex !== true) throw new TypeError("Invalid index");
      var D = s.size(), o = s.isScalar(), h;
      if (lr(p) ? (h = p.size(), p = p.valueOf()) : h = mr(p), o) {
        if (h.length !== 0) throw new TypeError("Scalar expected");
        i.set(s.min(), p, v);
      } else {
        if (!qr(h, D)) try {
          h.length === 0 ? p = Re([
            p
          ], D) : p = Re(p, D), h = mr(p);
        } catch {
        }
        if (D.length < i._size.length) throw new nr(D.length, i._size.length, "<");
        if (h.length < D.length) {
          for (var g = 0, C = 0; D[g] === 1 && h[g] === 1; ) g++;
          for (; D[g] === 1; ) C++, g++;
          p = mn(p, D.length, C, h);
        }
        if (!qr(D, h)) throw new nr(D, h, ">");
        var y = s.max().map(function(A) {
          return A + 1;
        });
        l(i, y, v);
        var b = D.length, F = 0;
        f(i._data, s, p, b, F);
      }
      return i;
    }
    function f(i, s, p, v, D) {
      var o = D === v - 1, h = s.dimension(D);
      o ? h.forEach(function(g, C) {
        hr(g), i[g] = p[C[0]];
      }) : h.forEach(function(g, C) {
        hr(g), f(i[g], s, p[C[0]], v, D + 1);
      });
    }
    n.prototype.resize = function(i, s, p) {
      if (!ve(i)) throw new TypeError("Array or Matrix expected");
      var v = i.valueOf().map((o) => Array.isArray(o) && o.length === 1 ? o[0] : o), D = p ? this.clone() : this;
      return d(D, v, s);
    };
    function d(i, s, p) {
      if (s.length === 0) {
        for (var v = i._data; vr(v); ) v = v[0];
        return v;
      }
      return i._size = s.slice(0), i._data = De(i._data, i._size, p), i;
    }
    n.prototype.reshape = function(i, s) {
      var p = s ? this.clone() : this;
      p._data = Ge(p._data, i);
      var v = p._size.reduce((D, o) => D * o);
      return p._size = Xe(i, v), p;
    };
    function l(i, s, p) {
      for (var v = i._size.slice(0), D = false; v.length < s.length; ) v.push(0), D = true;
      for (var o = 0, h = s.length; o < h; o++) s[o] > v[o] && (v[o] = s[o], D = true);
      D && d(i, v, p);
    }
    n.prototype.clone = function() {
      var i = new n({
        data: tr(this._data),
        size: tr(this._size),
        datatype: this._datatype
      });
      return i;
    }, n.prototype.size = function() {
      return this._size.slice(0);
    }, n.prototype._forEach = function(i) {
      var s = this, p = s.size();
      if (p.length === 1) {
        for (var v = 0; v < p[0]; v++) i(s._data, v, [
          v
        ]);
        return;
      }
      var D = Array(p.length).fill(0), o = Array(p.length - 1), h = o.length - 1;
      o[0] = s._data[0];
      for (var g = 0; g < h; g++) o[g + 1] = o[g][0];
      for (D[h] = -1; ; ) {
        var C = void 0;
        for (C = h; C >= 0; C--) {
          if (D[C]++, D[C] === p[C]) {
            D[C] = 0;
            continue;
          }
          o[C] = C === 0 ? s._data[D[C]] : o[C - 1][D[C]];
          for (var y = C; y < h; y++) o[y + 1] = o[y][0];
          for (var b = 0; b < p[o.length]; b++) D[o.length] = b, i(o[h], b, D.slice(0));
          break;
        }
        if (C === -1) break;
      }
    }, n.prototype.map = function(i) {
      var s = this, p = new n(s), v = pe(i, s._data, "map");
      return p._forEach(function(D, o, h) {
        D[o] = v(D[o], h, s);
      }), p;
    }, n.prototype.forEach = function(i) {
      var s = this, p = pe(i, s._data, "map");
      s._forEach(function(v, D, o) {
        p(v[D], o, s);
      });
    }, n.prototype[Symbol.iterator] = function* () {
      var i = function* (p, v) {
        if (vr(p)) for (var D = 0; D < p.length; D++) yield* i(p[D], v.concat(D));
        else yield {
          value: p,
          index: v
        };
      };
      yield* i(this._data, []);
    }, n.prototype.rows = function() {
      var i = [], s = this.size();
      if (s.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      var p = this._data;
      for (var v of p) i.push(new n([
        v
      ], this._datatype));
      return i;
    }, n.prototype.columns = function() {
      var i = this, s = [], p = this.size();
      if (p.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
      for (var v = this._data, D = function(g) {
        var C = v.map((y) => [
          y[g]
        ]);
        s.push(new n(C, i._datatype));
      }, o = 0; o < p[1]; o++) D(o);
      return s;
    }, n.prototype.toArray = function() {
      return tr(this._data);
    }, n.prototype.valueOf = function() {
      return this._data;
    }, n.prototype.format = function(i) {
      return Dr(this._data, i);
    }, n.prototype.toString = function() {
      return Dr(this._data);
    }, n.prototype.toJSON = function() {
      return {
        mathjs: "DenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    }, n.prototype.diagonal = function(i) {
      if (i) {
        if (gr(i) && (i = i.toNumber()), !or(i) || !fr(i)) throw new TypeError("The parameter k must be an integer number");
      } else i = 0;
      for (var s = i > 0 ? i : 0, p = i < 0 ? -i : 0, v = this._size[0], D = this._size[1], o = Math.min(v - p, D - s), h = [], g = 0; g < o; g++) h[g] = this._data[g + p][g + s];
      return new n({
        data: h,
        size: [
          o
        ],
        datatype: this._datatype
      });
    }, n.diagonal = function(i, s, p, v) {
      if (!vr(i)) throw new TypeError("Array expected, size parameter");
      if (i.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (i = i.map(function(w) {
        if (gr(w) && (w = w.toNumber()), !or(w) || !fr(w) || w < 1) throw new Error("Size values must be positive integers");
        return w;
      }), p) {
        if (gr(p) && (p = p.toNumber()), !or(p) || !fr(p)) throw new TypeError("The parameter k must be an integer number");
      } else p = 0;
      var D = p > 0 ? p : 0, o = p < 0 ? -p : 0, h = i[0], g = i[1], C = Math.min(h - o, g - D), y;
      if (vr(s)) {
        if (s.length !== C) throw new Error("Invalid value array length");
        y = function(E) {
          return s[E];
        };
      } else if (lr(s)) {
        var b = s.size();
        if (b.length !== 1 || b[0] !== C) throw new Error("Invalid matrix length");
        y = function(E) {
          return s.get([
            E
          ]);
        };
      } else y = function() {
        return s;
      };
      v || (v = gr(y(0)) ? y(0).mul(0) : 0);
      var F = [];
      if (i.length > 0) {
        F = De(F, i, v);
        for (var A = 0; A < C; A++) F[A + o][A + D] = y(A);
      }
      return new n({
        data: F,
        size: [
          h,
          g
        ]
      });
    }, n.fromJSON = function(i) {
      return new n(i);
    }, n.prototype.swapRows = function(i, s) {
      if (!or(i) || !fr(i) || !or(s) || !fr(s)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return hr(i, this._size[0]), hr(s, this._size[0]), n._swapRows(i, s, this._data), this;
    }, n._swapRows = function(i, s, p) {
      var v = p[i];
      p[i] = p[s], p[s] = v;
    };
    function c(i) {
      return lr(i) ? c(i.valueOf()) : vr(i) ? i.map(c) : i;
    }
    return n;
  }, {
    isClass: true
  });
  function wr(r, e, n) {
    return r && typeof r.map == "function" ? r.map(function(u) {
      return wr(u, e);
    }) : e(r);
  }
  var yt = "isInteger", Ia = [
    "typed"
  ], qa = J(yt, Ia, (r) => {
    var { typed: e } = r;
    return e(yt, {
      number: fr,
      BigNumber: function(u) {
        return u.isInt();
      },
      bigint: function(u) {
        return true;
      },
      Fraction: function(u) {
        return u.d === 1 && isFinite(u.n);
      },
      "Array | Matrix": e.referToSelf((n) => (u) => wr(u, n))
    });
  }), Ye = "number", be = "number, number";
  function wn(r) {
    return Math.abs(r);
  }
  wn.signature = Ye;
  function bn(r, e) {
    return r + e;
  }
  bn.signature = be;
  function Bn(r, e) {
    return r - e;
  }
  Bn.signature = be;
  function _n(r, e) {
    return r * e;
  }
  _n.signature = be;
  function xn(r) {
    return -r;
  }
  xn.signature = Ye;
  function Ue(r) {
    return ku(r);
  }
  Ue.signature = Ye;
  function Sn(r, e) {
    return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
  }
  Sn.signature = be;
  var Ra = "number";
  function Mn(r) {
    return r > 0;
  }
  Mn.signature = Ra;
  function Wr(r, e) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (n <= 0) throw new Error("Relative tolerance must be greater than 0");
    if (u < 0) throw new Error("Absolute tolerance must be at least 0");
    return r.isNaN() || e.isNaN() ? false : !r.isFinite() || !e.isFinite() ? r.eq(e) : r.eq(e) ? true : r.minus(e).abs().lte(r.constructor.max(r.constructor.max(r.abs(), e.abs()).mul(n), u));
  }
  var At = "isPositive", Ua = [
    "typed",
    "config"
  ], Pa = J(At, Ua, (r) => {
    var { typed: e, config: n } = r;
    return e(At, {
      number: (u) => $r(u, 0, n.relTol, n.absTol) ? false : Mn(u),
      BigNumber: (u) => Wr(u, new u.constructor(0), n.relTol, n.absTol) ? false : !u.isNeg() && !u.isZero() && !u.isNaN(),
      bigint: (u) => u > 0n,
      Fraction: (u) => u.s > 0 && u.n > 0,
      Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)),
      "Array | Matrix": e.referToSelf((u) => (t) => wr(t, u))
    });
  }), Ft = "isZero", Va = [
    "typed",
    "equalScalar"
  ], La = J(Ft, Va, (r) => {
    var { typed: e, equalScalar: n } = r;
    return e(Ft, {
      "number | BigNumber | Complex | Fraction": (u) => n(u, 0),
      bigint: (u) => u === 0n,
      Unit: e.referToSelf((u) => (t) => e.find(u, t.valueType())(t.value)),
      "Array | Matrix": e.referToSelf((u) => (t) => wr(t, u))
    });
  });
  function Za(r, e, n, u) {
    return $r(r.re, e.re, n, u) && $r(r.im, e.im, n, u);
  }
  var kr = J("compareUnits", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      "Unit, Unit": e.referToSelf((n) => (u, t) => {
        if (!u.equalBase(t)) throw new Error("Cannot compare units with different base");
        return e.find(n, [
          u.valueType(),
          t.valueType()
        ])(u.value, t.value);
      })
    };
  }), de = "equalScalar", Ja = [
    "typed",
    "config"
  ], Wa = J(de, Ja, (r) => {
    var { typed: e, config: n } = r, u = kr({
      typed: e
    });
    return e(de, {
      "boolean, boolean": function(a, f) {
        return a === f;
      },
      "number, number": function(a, f) {
        return $r(a, f, n.relTol, n.absTol);
      },
      "BigNumber, BigNumber": function(a, f) {
        return a.eq(f) || Wr(a, f, n.relTol, n.absTol);
      },
      "bigint, bigint": function(a, f) {
        return a === f;
      },
      "Fraction, Fraction": function(a, f) {
        return a.equals(f);
      },
      "Complex, Complex": function(a, f) {
        return Za(a, f, n.relTol, n.absTol);
      }
    }, u);
  });
  J(de, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(de, {
      "number, number": function(t, a) {
        return $r(t, a, n.relTol, n.absTol);
      }
    });
  });
  var Qa = "SparseMatrix", Ga = [
    "typed",
    "equalScalar",
    "Matrix"
  ], Xa = J(Qa, Ga, (r) => {
    var { typed: e, equalScalar: n, Matrix: u } = r;
    function t(o, h) {
      if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
      if (h && !Mr(h)) throw new Error("Invalid datatype: " + h);
      if (lr(o)) a(this, o, h);
      else if (o && vr(o.index) && vr(o.ptr) && vr(o.size)) this._values = o.values, this._index = o.index, this._ptr = o.ptr, this._size = o.size, this._datatype = h || o.datatype;
      else if (vr(o)) f(this, o, h);
      else {
        if (o) throw new TypeError("Unsupported type of data (" + Nr(o) + ")");
        this._values = [], this._index = [], this._ptr = [
          0
        ], this._size = [
          0,
          0
        ], this._datatype = h;
      }
    }
    function a(o, h, g) {
      h.type === "SparseMatrix" ? (o._values = h._values ? tr(h._values) : void 0, o._index = tr(h._index), o._ptr = tr(h._ptr), o._size = tr(h._size), o._datatype = g || h._datatype) : f(o, h.valueOf(), g || h._datatype);
    }
    function f(o, h, g) {
      o._values = [], o._index = [], o._ptr = [], o._datatype = g;
      var C = h.length, y = 0, b = n, F = 0;
      if (Mr(g) && (b = e.find(n, [
        g,
        g
      ]) || n, F = e.convert(0, g)), C > 0) {
        var A = 0;
        do {
          o._ptr.push(o._index.length);
          for (var w = 0; w < C; w++) {
            var E = h[w];
            if (vr(E)) {
              if (A === 0 && y < E.length && (y = E.length), A < E.length) {
                var m = E[A];
                b(m, F) || (o._values.push(m), o._index.push(w));
              }
            } else A === 0 && y < 1 && (y = 1), b(E, F) || (o._values.push(E), o._index.push(w));
          }
          A++;
        } while (A < y);
      }
      o._ptr.push(o._index.length), o._size = [
        C,
        y
      ];
    }
    t.prototype = new u(), t.prototype.createSparseMatrix = function(o, h) {
      return new t(o, h);
    }, Object.defineProperty(t, "name", {
      value: "SparseMatrix"
    }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = true, t.prototype.getDataType = function() {
      return we(this._values, Nr);
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
          return d(this, o);
        case 2:
        case 3:
          return l(this, o, h, g);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    };
    function d(o, h) {
      if (!Je(h)) throw new TypeError("Invalid index");
      var g = h.isScalar();
      if (g) return o.get(h.min());
      var C = h.size();
      if (C.length !== o._size.length) throw new nr(C.length, o._size.length);
      var y, b, F, A, w = h.min(), E = h.max();
      for (y = 0, b = o._size.length; y < b; y++) hr(w[y], o._size[y]), hr(E[y], o._size[y]);
      var m = o._values, B = o._index, _ = o._ptr, x = h.dimension(0), N = h.dimension(1), S = [], O = [];
      x.forEach(function($, Q) {
        O[$] = Q[0], S[$] = true;
      });
      var M = m ? [] : void 0, R = [], T = [];
      return N.forEach(function($) {
        for (T.push(R.length), F = _[$], A = _[$ + 1]; F < A; F++) y = B[F], S[y] === true && (R.push(O[y]), M && M.push(m[F]));
      }), T.push(R.length), new t({
        values: M,
        index: R,
        ptr: T,
        size: C,
        datatype: o._datatype
      });
    }
    function l(o, h, g, C) {
      if (!h || h.isIndex !== true) throw new TypeError("Invalid index");
      var y = h.size(), b = h.isScalar(), F;
      if (lr(g) ? (F = g.size(), g = g.toArray()) : F = mr(g), b) {
        if (F.length !== 0) throw new TypeError("Scalar expected");
        o.set(h.min(), g, C);
      } else {
        if (y.length !== 1 && y.length !== 2) throw new nr(y.length, o._size.length, "<");
        if (F.length < y.length) {
          for (var A = 0, w = 0; y[A] === 1 && F[A] === 1; ) A++;
          for (; y[A] === 1; ) w++, A++;
          g = mn(g, y.length, w, F);
        }
        if (!qr(y, F)) throw new nr(y, F, ">");
        if (y.length === 1) {
          var E = h.dimension(0);
          E.forEach(function(_, x) {
            hr(_), o.set([
              _,
              0
            ], g[x[0]], C);
          });
        } else {
          var m = h.dimension(0), B = h.dimension(1);
          m.forEach(function(_, x) {
            hr(_), B.forEach(function(N, S) {
              hr(N), o.set([
                _,
                N
              ], g[x[0]][S[0]], C);
            });
          });
        }
      }
      return o;
    }
    t.prototype.get = function(o) {
      if (!vr(o)) throw new TypeError("Array expected");
      if (o.length !== this._size.length) throw new nr(o.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
      var h = o[0], g = o[1];
      hr(h, this._size[0]), hr(g, this._size[1]);
      var C = c(h, this._ptr[g], this._ptr[g + 1], this._index);
      return C < this._ptr[g + 1] && this._index[C] === h ? this._values[C] : 0;
    }, t.prototype.set = function(o, h, g) {
      if (!vr(o)) throw new TypeError("Array expected");
      if (o.length !== this._size.length) throw new nr(o.length, this._size.length);
      if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
      var C = o[0], y = o[1], b = this._size[0], F = this._size[1], A = n, w = 0;
      Mr(this._datatype) && (A = e.find(n, [
        this._datatype,
        this._datatype
      ]) || n, w = e.convert(0, this._datatype)), (C > b - 1 || y > F - 1) && (p(this, Math.max(C + 1, b), Math.max(y + 1, F), g), b = this._size[0], F = this._size[1]), hr(C, b), hr(y, F);
      var E = c(C, this._ptr[y], this._ptr[y + 1], this._index);
      return E < this._ptr[y + 1] && this._index[E] === C ? A(h, w) ? i(E, y, this._values, this._index, this._ptr) : this._values[E] = h : A(h, w) || s(E, C, y, h, this._values, this._index, this._ptr), this;
    };
    function c(o, h, g, C) {
      if (g - h === 0) return g;
      for (var y = h; y < g; y++) if (C[y] === o) return y;
      return h;
    }
    function i(o, h, g, C, y) {
      g.splice(o, 1), C.splice(o, 1);
      for (var b = h + 1; b < y.length; b++) y[b]--;
    }
    function s(o, h, g, C, y, b, F) {
      y.splice(o, 0, C), b.splice(o, 0, h);
      for (var A = g + 1; A < F.length; A++) F[A]++;
    }
    t.prototype.resize = function(o, h, g) {
      if (!ve(o)) throw new TypeError("Array or Matrix expected");
      var C = o.valueOf().map((b) => Array.isArray(b) && b.length === 1 ? b[0] : b);
      if (C.length !== 2) throw new Error("Only two dimensions matrix are supported");
      C.forEach(function(b) {
        if (!or(b) || !fr(b) || b < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + Dr(C) + ")");
      });
      var y = g ? this.clone() : this;
      return p(y, C[0], C[1], h);
    };
    function p(o, h, g, C) {
      var y = C || 0, b = n, F = 0;
      Mr(o._datatype) && (b = e.find(n, [
        o._datatype,
        o._datatype
      ]) || n, F = e.convert(0, o._datatype), y = e.convert(y, o._datatype));
      var A = !b(y, F), w = o._size[0], E = o._size[1], m, B, _;
      if (g > E) {
        for (B = E; B < g; B++) if (o._ptr[B] = o._values.length, A) for (m = 0; m < w; m++) o._values.push(y), o._index.push(m);
        o._ptr[g] = o._values.length;
      } else g < E && (o._ptr.splice(g + 1, E - g), o._values.splice(o._ptr[g], o._values.length), o._index.splice(o._ptr[g], o._index.length));
      if (E = g, h > w) {
        if (A) {
          var x = 0;
          for (B = 0; B < E; B++) {
            o._ptr[B] = o._ptr[B] + x, _ = o._ptr[B + 1] + x;
            var N = 0;
            for (m = w; m < h; m++, N++) o._values.splice(_ + N, 0, y), o._index.splice(_ + N, 0, m), x++;
          }
          o._ptr[E] = o._values.length;
        }
      } else if (h < w) {
        var S = 0;
        for (B = 0; B < E; B++) {
          o._ptr[B] = o._ptr[B] - S;
          var O = o._ptr[B], M = o._ptr[B + 1] - S;
          for (_ = O; _ < M; _++) m = o._index[_], m > h - 1 && (o._values.splice(_, 1), o._index.splice(_, 1), S++);
        }
        o._ptr[B] = o._values.length;
      }
      return o._size[0] = h, o._size[1] = g, o;
    }
    t.prototype.reshape = function(o, h) {
      if (!vr(o)) throw new TypeError("Array expected");
      if (o.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
      o.forEach(function($) {
        if (!or($) || !fr($) || $ <= -2 || $ === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Dr(o) + ")");
      });
      var g = this._size[0] * this._size[1];
      o = Xe(o, g);
      var C = o[0] * o[1];
      if (g !== C) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
      var y = h ? this.clone() : this;
      if (this._size[0] === o[0] && this._size[1] === o[1]) return y;
      for (var b = [], F = 0; F < y._ptr.length; F++) for (var A = 0; A < y._ptr[F + 1] - y._ptr[F]; A++) b.push(F);
      for (var w = y._values.slice(), E = y._index.slice(), m = 0; m < y._index.length; m++) {
        var B = E[m], _ = b[m], x = B * y._size[1] + _;
        b[m] = x % o[1], E[m] = Math.floor(x / o[1]);
      }
      y._values.length = 0, y._index.length = 0, y._ptr.length = o[1] + 1, y._size = o.slice();
      for (var N = 0; N < y._ptr.length; N++) y._ptr[N] = 0;
      for (var S = 0; S < w.length; S++) {
        var O = E[S], M = b[S], R = w[S], T = c(O, y._ptr[M], y._ptr[M + 1], y._index);
        s(T, O, M, R, y._values, y._index, y._ptr);
      }
      return y;
    }, t.prototype.clone = function() {
      var o = new t({
        values: this._values ? tr(this._values) : void 0,
        index: tr(this._index),
        ptr: tr(this._ptr),
        size: tr(this._size),
        datatype: this._datatype
      });
      return o;
    }, t.prototype.size = function() {
      return this._size.slice(0);
    }, t.prototype.map = function(o, h) {
      if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
      var g = this, C = this._size[0], y = this._size[1], b = pe(o, g, "map"), F = function(w, E, m) {
        return b(w, [
          E,
          m
        ], g);
      };
      return v(this, 0, C - 1, 0, y - 1, F, h);
    };
    function v(o, h, g, C, y, b, F) {
      var A = [], w = [], E = [], m = n, B = 0;
      Mr(o._datatype) && (m = e.find(n, [
        o._datatype,
        o._datatype
      ]) || n, B = e.convert(0, o._datatype));
      for (var _ = function(I, W, G) {
        var L = b(I, W, G);
        m(L, B) || (A.push(L), w.push(W));
      }, x = C; x <= y; x++) {
        E.push(A.length);
        var N = o._ptr[x], S = o._ptr[x + 1];
        if (F) for (var O = N; O < S; O++) {
          var M = o._index[O];
          M >= h && M <= g && _(o._values[O], M - h, x - C);
        }
        else {
          for (var R = {}, T = N; T < S; T++) {
            var $ = o._index[T];
            R[$] = o._values[T];
          }
          for (var Q = h; Q <= g; Q++) {
            var X = Q in R ? R[Q] : 0;
            _(X, Q - h, x - C);
          }
        }
      }
      return E.push(A.length), new t({
        values: A,
        index: w,
        ptr: E,
        size: [
          g - h + 1,
          y - C + 1
        ]
      });
    }
    t.prototype.forEach = function(o, h) {
      if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
      for (var g = this, C = this._size[0], y = this._size[1], b = pe(o, g, "forEach"), F = 0; F < y; F++) {
        var A = this._ptr[F], w = this._ptr[F + 1];
        if (h) for (var E = A; E < w; E++) {
          var m = this._index[E];
          b(this._values[E], [
            m,
            F
          ], g);
        }
        else {
          for (var B = {}, _ = A; _ < w; _++) {
            var x = this._index[_];
            B[x] = this._values[_];
          }
          for (var N = 0; N < C; N++) {
            var S = N in B ? B[N] : 0;
            b(S, [
              N,
              F
            ], g);
          }
        }
      }
    }, t.prototype[Symbol.iterator] = function* () {
      if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
      for (var o = this._size[1], h = 0; h < o; h++) for (var g = this._ptr[h], C = this._ptr[h + 1], y = g; y < C; y++) {
        var b = this._index[y];
        yield {
          value: this._values[y],
          index: [
            b,
            h
          ]
        };
      }
    }, t.prototype.toArray = function() {
      return D(this._values, this._index, this._ptr, this._size, true);
    }, t.prototype.valueOf = function() {
      return D(this._values, this._index, this._ptr, this._size, false);
    };
    function D(o, h, g, C, y) {
      var b = C[0], F = C[1], A = [], w, E;
      for (w = 0; w < b; w++) for (A[w] = [], E = 0; E < F; E++) A[w][E] = 0;
      for (E = 0; E < F; E++) for (var m = g[E], B = g[E + 1], _ = m; _ < B; _++) w = h[_], A[w][E] = o ? y ? tr(o[_]) : o[_] : 1;
      return A;
    }
    return t.prototype.format = function(o) {
      for (var h = this._size[0], g = this._size[1], C = this.density(), y = "Sparse Matrix [" + Dr(h, o) + " x " + Dr(g, o) + "] density: " + Dr(C, o) + `
`, b = 0; b < g; b++) for (var F = this._ptr[b], A = this._ptr[b + 1], w = F; w < A; w++) {
        var E = this._index[w];
        y += `
    (` + Dr(E, o) + ", " + Dr(b, o) + ") ==> " + (this._values ? Dr(this._values[w], o) : "X");
      }
      return y;
    }, t.prototype.toString = function() {
      return Dr(this.toArray());
    }, t.prototype.toJSON = function() {
      return {
        mathjs: "SparseMatrix",
        values: this._values,
        index: this._index,
        ptr: this._ptr,
        size: this._size,
        datatype: this._datatype
      };
    }, t.prototype.diagonal = function(o) {
      if (o) {
        if (gr(o) && (o = o.toNumber()), !or(o) || !fr(o)) throw new TypeError("The parameter k must be an integer number");
      } else o = 0;
      var h = o > 0 ? o : 0, g = o < 0 ? -o : 0, C = this._size[0], y = this._size[1], b = Math.min(C - g, y - h), F = [], A = [], w = [];
      w[0] = 0;
      for (var E = h; E < y && F.length < b; E++) for (var m = this._ptr[E], B = this._ptr[E + 1], _ = m; _ < B; _++) {
        var x = this._index[_];
        if (x === E - h + g) {
          F.push(this._values[_]), A[F.length - 1] = x - g;
          break;
        }
      }
      return w.push(F.length), new t({
        values: F,
        index: A,
        ptr: w,
        size: [
          b,
          1
        ]
      });
    }, t.fromJSON = function(o) {
      return new t(o);
    }, t.diagonal = function(o, h, g, C, y) {
      if (!vr(o)) throw new TypeError("Array expected, size parameter");
      if (o.length !== 2) throw new Error("Only two dimensions matrix are supported");
      if (o = o.map(function($) {
        if (gr($) && ($ = $.toNumber()), !or($) || !fr($) || $ < 1) throw new Error("Size values must be positive integers");
        return $;
      }), g) {
        if (gr(g) && (g = g.toNumber()), !or(g) || !fr(g)) throw new TypeError("The parameter k must be an integer number");
      } else g = 0;
      var b = n, F = 0;
      Mr(y) && (b = e.find(n, [
        y,
        y
      ]) || n, F = e.convert(0, y));
      var A = g > 0 ? g : 0, w = g < 0 ? -g : 0, E = o[0], m = o[1], B = Math.min(E - w, m - A), _;
      if (vr(h)) {
        if (h.length !== B) throw new Error("Invalid value array length");
        _ = function(Q) {
          return h[Q];
        };
      } else if (lr(h)) {
        var x = h.size();
        if (x.length !== 1 || x[0] !== B) throw new Error("Invalid matrix length");
        _ = function(Q) {
          return h.get([
            Q
          ]);
        };
      } else _ = function() {
        return h;
      };
      for (var N = [], S = [], O = [], M = 0; M < m; M++) {
        O.push(N.length);
        var R = M - A;
        if (R >= 0 && R < B) {
          var T = _(R);
          b(T, F) || (S.push(R + w), N.push(T));
        }
      }
      return O.push(N.length), new t({
        values: N,
        index: S,
        ptr: O,
        size: [
          E,
          m
        ]
      });
    }, t.prototype.swapRows = function(o, h) {
      if (!or(o) || !fr(o) || !or(h) || !fr(h)) throw new Error("Row index must be positive integers");
      if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
      return hr(o, this._size[0]), hr(h, this._size[0]), t._swapRows(o, h, this._size[1], this._values, this._index, this._ptr), this;
    }, t._forEachRow = function(o, h, g, C, y) {
      for (var b = C[o], F = C[o + 1], A = b; A < F; A++) y(g[A], h[A]);
    }, t._swapRows = function(o, h, g, C, y, b) {
      for (var F = 0; F < g; F++) {
        var A = b[F], w = b[F + 1], E = c(o, A, w, y), m = c(h, A, w, y);
        if (E < w && m < w && y[E] === o && y[m] === h) {
          if (C) {
            var B = C[E];
            C[E] = C[m], C[m] = B;
          }
          continue;
        }
        if (E < w && y[E] === o && (m >= w || y[m] !== h)) {
          var _ = C ? C[E] : void 0;
          y.splice(m, 0, h), C && C.splice(m, 0, _), y.splice(m <= E ? E + 1 : E, 1), C && C.splice(m <= E ? E + 1 : E, 1);
          continue;
        }
        if (m < w && y[m] === h && (E >= w || y[E] !== o)) {
          var x = C ? C[m] : void 0;
          y.splice(E, 0, o), C && C.splice(E, 0, x), y.splice(E <= m ? m + 1 : m, 1), C && C.splice(E <= m ? m + 1 : m, 1);
        }
      }
    }, t;
  }, {
    isClass: true
  }), Ya = "number", Ka = [
    "typed"
  ];
  function Ha(r) {
    var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
    if (e) {
      var n = {
        "0b": 2,
        "0o": 8,
        "0x": 16
      }[e[1]], u = e[2], t = e[3];
      return {
        input: r,
        radix: n,
        integerPart: u,
        fractionalPart: t
      };
    } else return null;
  }
  function ka(r) {
    for (var e = parseInt(r.integerPart, r.radix), n = 0, u = 0; u < r.fractionalPart.length; u++) {
      var t = parseInt(r.fractionalPart[u], r.radix);
      n += t / Math.pow(r.radix, u + 1);
    }
    var a = e + n;
    if (isNaN(a)) throw new SyntaxError('String "' + r.input + '" is not a valid number');
    return a;
  }
  var ja = J(Ya, Ka, (r) => {
    var { typed: e } = r, n = e("number", {
      "": function() {
        return 0;
      },
      number: function(t) {
        return t;
      },
      string: function(t) {
        if (t === "NaN") return NaN;
        var a = Ha(t);
        if (a) return ka(a);
        var f = 0, d = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        d && (f = Number(d[2]), t = d[1]);
        var l = Number(t);
        if (isNaN(l)) throw new SyntaxError('String "' + t + '" is not a valid number');
        if (d) {
          if (l > 2 ** f - 1) throw new SyntaxError('String "'.concat(t, '" is out of range'));
          l >= 2 ** (f - 1) && (l = l - 2 ** f);
        }
        return l;
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
      Unit: e.referToSelf((u) => (t) => {
        var a = t.clone();
        return a.value = u(t.value), a;
      }),
      null: function(t) {
        return 0;
      },
      "Unit, string | Unit": function(t, a) {
        return t.toNumber(a);
      },
      "Array | Matrix": e.referToSelf((u) => (t) => wr(t, u))
    });
    return n.fromJSON = function(u) {
      return parseFloat(u.value);
    }, n;
  }), ri = "bignumber", ei = [
    "typed",
    "BigNumber"
  ], ti = J(ri, ei, (r) => {
    var { typed: e, BigNumber: n } = r;
    return e("bignumber", {
      "": function() {
        return new n(0);
      },
      number: function(t) {
        return new n(t + "");
      },
      string: function(t) {
        var a = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        if (a) {
          var f = a[2], d = n(a[1]), l = new n(2).pow(Number(f));
          if (d.gt(l.sub(1))) throw new SyntaxError('String "'.concat(t, '" is out of range'));
          var c = new n(2).pow(Number(f) - 1);
          return d.gte(c) ? d.sub(l) : d;
        }
        return new n(t);
      },
      BigNumber: function(t) {
        return t;
      },
      bigint: function(t) {
        return new n(t.toString());
      },
      Unit: e.referToSelf((u) => (t) => {
        var a = t.clone();
        return a.value = u(t.value), a;
      }),
      Fraction: function(t) {
        return new n(t.n).div(t.d).times(t.s);
      },
      null: function(t) {
        return new n(0);
      },
      "Array | Matrix": e.referToSelf((u) => (t) => wr(t, u))
    });
  }), ni = "complex", ui = [
    "typed",
    "Complex"
  ], ai = J(ni, ui, (r) => {
    var { typed: e, Complex: n } = r;
    return e("complex", {
      "": function() {
        return n.ZERO;
      },
      number: function(t) {
        return new n(t, 0);
      },
      "number, number": function(t, a) {
        return new n(t, a);
      },
      "BigNumber, BigNumber": function(t, a) {
        return new n(t.toNumber(), a.toNumber());
      },
      Fraction: function(t) {
        return new n(t.valueOf(), 0);
      },
      Complex: function(t) {
        return t.clone();
      },
      string: function(t) {
        return n(t);
      },
      null: function(t) {
        return n(0);
      },
      Object: function(t) {
        if ("re" in t && "im" in t) return new n(t.re, t.im);
        if ("r" in t && "phi" in t || "abs" in t && "arg" in t) return new n(t);
        throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
      },
      "Array | Matrix": e.referToSelf((u) => (t) => wr(t, u))
    });
  }), ii = "fraction", oi = [
    "typed",
    "Fraction"
  ], si = J(ii, oi, (r) => {
    var { typed: e, Fraction: n } = r;
    return e("fraction", {
      number: function(t) {
        if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");
        return new n(t);
      },
      string: function(t) {
        return new n(t);
      },
      "number, number": function(t, a) {
        return new n(t, a);
      },
      null: function(t) {
        return new n(0);
      },
      BigNumber: function(t) {
        return new n(t.toString());
      },
      bigint: function(t) {
        return new n(t.toString());
      },
      Fraction: function(t) {
        return t;
      },
      Unit: e.referToSelf((u) => (t) => {
        var a = t.clone();
        return a.value = u(t.value), a;
      }),
      Object: function(t) {
        return new n(t);
      },
      "Array | Matrix": e.referToSelf((u) => (t) => wr(t, u))
    });
  }), Et = "matrix", fi = [
    "typed",
    "Matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], li = J(Et, fi, (r) => {
    var { typed: e, Matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
    return e(Et, {
      "": function() {
        return a([]);
      },
      string: function(d) {
        return a([], d);
      },
      "string, string": function(d, l) {
        return a([], d, l);
      },
      Array: function(d) {
        return a(d);
      },
      Matrix: function(d) {
        return a(d, d.storage());
      },
      "Array | Matrix, string": a,
      "Array | Matrix, string, string": a
    });
    function a(f, d, l) {
      if (d === "dense" || d === "default" || d === void 0) return new u(f, l);
      if (d === "sparse") return new t(f, l);
      throw new TypeError("Unknown matrix type " + JSON.stringify(d) + ".");
    }
  }), Ct = "matrixFromColumns", ci = [
    "typed",
    "matrix",
    "flatten",
    "size"
  ], vi = J(Ct, ci, (r) => {
    var { typed: e, matrix: n, flatten: u, size: t } = r;
    return e(Ct, {
      "...Array": function(l) {
        return a(l);
      },
      "...Matrix": function(l) {
        return n(a(l.map((c) => c.toArray())));
      }
    });
    function a(d) {
      if (d.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
      for (var l = f(d[0]), c = [], i = 0; i < l; i++) c[i] = [];
      for (var s of d) {
        var p = f(s);
        if (p !== l) throw new TypeError("The vectors had different length: " + (l | 0) + " \u2260 " + (p | 0));
        for (var v = u(s), D = 0; D < l; D++) c[D].push(v[D]);
      }
      return c;
    }
    function f(d) {
      var l = t(d);
      if (l.length === 1) return l[0];
      if (l.length === 2) {
        if (l[0] === 1) return l[1];
        if (l[1] === 1) return l[0];
        throw new TypeError("At least one of the arguments is not a vector.");
      } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
    }
  }), wt = "unaryMinus", Di = [
    "typed"
  ], pi = J(wt, Di, (r) => {
    var { typed: e } = r;
    return e(wt, {
      number: xn,
      "Complex | BigNumber | Fraction": (n) => n.neg(),
      bigint: (n) => -n,
      Unit: e.referToSelf((n) => (u) => {
        var t = u.clone();
        return t.value = e.find(n, t.valueType())(u.value), t;
      }),
      "Array | Matrix": e.referToSelf((n) => (u) => wr(u, n))
    });
  }), bt = "abs", di = [
    "typed"
  ], hi = J(bt, di, (r) => {
    var { typed: e } = r;
    return e(bt, {
      number: wn,
      "Complex | BigNumber | Fraction | Unit": (n) => n.abs(),
      bigint: (n) => n < 0n ? -n : n,
      "Array | Matrix": e.referToSelf((n) => (u) => wr(u, n))
    });
  }), Bt = "addScalar", mi = [
    "typed"
  ], gi = J(Bt, mi, (r) => {
    var { typed: e } = r;
    return e(Bt, {
      "number, number": bn,
      "Complex, Complex": function(u, t) {
        return u.add(t);
      },
      "BigNumber, BigNumber": function(u, t) {
        return u.plus(t);
      },
      "bigint, bigint": function(u, t) {
        return u + t;
      },
      "Fraction, Fraction": function(u, t) {
        return u.add(t);
      },
      "Unit, Unit": e.referToSelf((n) => (u, t) => {
        if (u.value === null || u.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!u.equalBase(t)) throw new Error("Units do not match");
        var a = u.clone();
        return a.value = e.find(n, [
          a.valueType(),
          t.valueType()
        ])(a.value, t.value), a.fixPrefix = false, a;
      })
    });
  }), _t = "subtractScalar", yi = [
    "typed"
  ], Ai = J(_t, yi, (r) => {
    var { typed: e } = r;
    return e(_t, {
      "number, number": Bn,
      "Complex, Complex": function(u, t) {
        return u.sub(t);
      },
      "BigNumber, BigNumber": function(u, t) {
        return u.minus(t);
      },
      "bigint, bigint": function(u, t) {
        return u - t;
      },
      "Fraction, Fraction": function(u, t) {
        return u.sub(t);
      },
      "Unit, Unit": e.referToSelf((n) => (u, t) => {
        if (u.value === null || u.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (t.value === null || t.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!u.equalBase(t)) throw new Error("Units do not match");
        var a = u.clone();
        return a.value = e.find(n, [
          a.valueType(),
          t.valueType()
        ])(a.value, t.value), a.fixPrefix = false, a;
      })
    });
  }), Fi = "matAlgo11xS0s", Ei = [
    "typed",
    "equalScalar"
  ], Ci = J(Fi, Ei, (r) => {
    var { typed: e, equalScalar: n } = r;
    return function(t, a, f, d) {
      var l = t._values, c = t._index, i = t._ptr, s = t._size, p = t._datatype;
      if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = s[0], D = s[1], o, h = n, g = 0, C = f;
      typeof p == "string" && (o = p, h = e.find(n, [
        o,
        o
      ]), g = e.convert(0, o), a = e.convert(a, o), C = e.find(f, [
        o,
        o
      ]));
      for (var y = [], b = [], F = [], A = 0; A < D; A++) {
        F[A] = b.length;
        for (var w = i[A], E = i[A + 1], m = w; m < E; m++) {
          var B = c[m], _ = d ? C(a, l[m]) : C(l[m], a);
          h(_, g) || (b.push(B), y.push(_));
        }
      }
      return F[D] = b.length, t.createSparseMatrix({
        values: y,
        index: b,
        ptr: F,
        size: [
          v,
          D
        ],
        datatype: o
      });
    };
  }), wi = "matAlgo12xSfs", bi = [
    "typed",
    "DenseMatrix"
  ], Qr = J(wi, bi, (r) => {
    var { typed: e, DenseMatrix: n } = r;
    return function(t, a, f, d) {
      var l = t._values, c = t._index, i = t._ptr, s = t._size, p = t._datatype;
      if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = s[0], D = s[1], o, h = f;
      typeof p == "string" && (o = p, a = e.convert(a, o), h = e.find(f, [
        o,
        o
      ]));
      for (var g = [], C = [], y = [], b = 0; b < D; b++) {
        for (var F = b + 1, A = i[b], w = i[b + 1], E = A; E < w; E++) {
          var m = c[E];
          C[m] = l[E], y[m] = F;
        }
        for (var B = 0; B < v; B++) b === 0 && (g[B] = []), y[B] === F ? g[B][b] = d ? h(a, C[B]) : h(C[B], a) : g[B][b] = d ? h(a, 0) : h(0, a);
      }
      return new n({
        data: g,
        size: [
          v,
          D
        ],
        datatype: o
      });
    };
  }), Bi = "matAlgo14xDs", _i = [
    "typed"
  ], Nn = J(Bi, _i, (r) => {
    var { typed: e } = r;
    return function(t, a, f, d) {
      var l = t._data, c = t._size, i = t._datatype, s, p = f;
      typeof i == "string" && (s = i, a = e.convert(a, s), p = e.find(f, [
        s,
        s
      ]));
      var v = c.length > 0 ? n(p, 0, c, c[0], l, a, d) : [];
      return t.createDenseMatrix({
        data: v,
        size: tr(c),
        datatype: s
      });
    };
    function n(u, t, a, f, d, l, c) {
      var i = [];
      if (t === a.length - 1) for (var s = 0; s < f; s++) i[s] = c ? u(l, d[s]) : u(d[s], l);
      else for (var p = 0; p < f; p++) i[p] = n(u, t + 1, a, a[t + 1], d[p], l, c);
      return i;
    }
  }), xi = "matAlgo03xDSf", Si = [
    "typed"
  ], Gr = J(xi, Si, (r) => {
    var { typed: e } = r;
    return function(u, t, a, f) {
      var d = u._data, l = u._size, c = u._datatype || u.getDataType(), i = t._values, s = t._index, p = t._ptr, v = t._size, D = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
      if (l.length !== v.length) throw new nr(l.length, v.length);
      if (l[0] !== v[0] || l[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + v + ")");
      if (!i) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var o = l[0], h = l[1], g, C = 0, y = a;
      typeof c == "string" && c === D && c !== "mixed" && (g = c, C = e.convert(0, g), y = e.find(a, [
        g,
        g
      ]));
      for (var b = [], F = 0; F < o; F++) b[F] = [];
      for (var A = [], w = [], E = 0; E < h; E++) {
        for (var m = E + 1, B = p[E], _ = p[E + 1], x = B; x < _; x++) {
          var N = s[x];
          A[N] = f ? y(i[x], d[N][E]) : y(d[N][E], i[x]), w[N] = m;
        }
        for (var S = 0; S < o; S++) w[S] === m ? b[S][E] = A[S] : b[S][E] = f ? y(C, d[S][E]) : y(d[S][E], C);
      }
      return u.createDenseMatrix({
        data: b,
        size: [
          o,
          h
        ],
        datatype: c === u._datatype && D === t._datatype ? g : void 0
      });
    };
  }), Mi = "matAlgo05xSfSf", Ni = [
    "typed",
    "equalScalar"
  ], Ti = J(Mi, Ni, (r) => {
    var { typed: e, equalScalar: n } = r;
    return function(t, a, f) {
      var d = t._values, l = t._index, c = t._ptr, i = t._size, s = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), p = a._values, v = a._index, D = a._ptr, o = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
      if (i.length !== o.length) throw new nr(i.length, o.length);
      if (i[0] !== o[0] || i[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + i + ") must match Matrix B (" + o + ")");
      var g = i[0], C = i[1], y, b = n, F = 0, A = f;
      typeof s == "string" && s === h && s !== "mixed" && (y = s, b = e.find(n, [
        y,
        y
      ]), F = e.convert(0, y), A = e.find(f, [
        y,
        y
      ]));
      var w = d && p ? [] : void 0, E = [], m = [], B = w ? [] : void 0, _ = w ? [] : void 0, x = [], N = [], S, O, M, R;
      for (O = 0; O < C; O++) {
        m[O] = E.length;
        var T = O + 1;
        for (M = c[O], R = c[O + 1]; M < R; M++) S = l[M], E.push(S), x[S] = T, B && (B[S] = d[M]);
        for (M = D[O], R = D[O + 1]; M < R; M++) S = v[M], x[S] !== T && E.push(S), N[S] = T, _ && (_[S] = p[M]);
        if (w) for (M = m[O]; M < E.length; ) {
          S = E[M];
          var $ = x[S], Q = N[S];
          if ($ === T || Q === T) {
            var X = $ === T ? B[S] : F, z = Q === T ? _[S] : F, I = A(X, z);
            b(I, F) ? E.splice(M, 1) : (w.push(I), M++);
          }
        }
      }
      return m[C] = E.length, t.createSparseMatrix({
        values: w,
        index: E,
        ptr: m,
        size: [
          g,
          C
        ],
        datatype: s === t._datatype && h === a._datatype ? y : void 0
      });
    };
  }), zi = "matAlgo13xDD", Oi = [
    "typed"
  ], $i = J(zi, Oi, (r) => {
    var { typed: e } = r;
    return function(t, a, f) {
      var d = t._data, l = t._size, c = t._datatype, i = a._data, s = a._size, p = a._datatype, v = [];
      if (l.length !== s.length) throw new nr(l.length, s.length);
      for (var D = 0; D < l.length; D++) {
        if (l[D] !== s[D]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + s + ")");
        v[D] = l[D];
      }
      var o, h = f;
      typeof c == "string" && c === p && (o = c, h = e.find(f, [
        o,
        o
      ]));
      var g = v.length > 0 ? n(h, 0, v, v[0], d, i) : [];
      return t.createDenseMatrix({
        data: g,
        size: v,
        datatype: o
      });
    };
    function n(u, t, a, f, d, l) {
      var c = [];
      if (t === a.length - 1) for (var i = 0; i < f; i++) c[i] = u(d[i], l[i]);
      else for (var s = 0; s < f; s++) c[s] = n(u, t + 1, a, a[t + 1], d[s], l[s]);
      return c;
    }
  });
  function yr(r, e) {
    if (qr(r.size(), e.size())) return [
      r,
      e
    ];
    var n = Fn(r.size(), e.size());
    return [
      r,
      e
    ].map((u) => Ii(u, n));
  }
  function Ii(r, e) {
    return qr(r.size(), e) ? r : r.create(Re(r.valueOf(), e), r.datatype());
  }
  var qi = "matrixAlgorithmSuite", Ri = [
    "typed",
    "matrix"
  ], Vr = J(qi, Ri, (r) => {
    var { typed: e, matrix: n } = r, u = $i({
      typed: e
    }), t = Nn({
      typed: e
    });
    return function(f) {
      var d = f.elop, l = f.SD || f.DS, c;
      d ? (c = {
        "DenseMatrix, DenseMatrix": (v, D) => u(...yr(v, D), d),
        "Array, Array": (v, D) => u(...yr(n(v), n(D)), d).valueOf(),
        "Array, DenseMatrix": (v, D) => u(...yr(n(v), D), d),
        "DenseMatrix, Array": (v, D) => u(...yr(v, n(D)), d)
      }, f.SS && (c["SparseMatrix, SparseMatrix"] = (v, D) => f.SS(...yr(v, D), d, false)), f.DS && (c["DenseMatrix, SparseMatrix"] = (v, D) => f.DS(...yr(v, D), d, false), c["Array, SparseMatrix"] = (v, D) => f.DS(...yr(n(v), D), d, false)), l && (c["SparseMatrix, DenseMatrix"] = (v, D) => l(...yr(D, v), d, true), c["SparseMatrix, Array"] = (v, D) => l(...yr(n(D), v), d, true))) : (c = {
        "DenseMatrix, DenseMatrix": e.referToSelf((v) => (D, o) => u(...yr(D, o), v)),
        "Array, Array": e.referToSelf((v) => (D, o) => u(...yr(n(D), n(o)), v).valueOf()),
        "Array, DenseMatrix": e.referToSelf((v) => (D, o) => u(...yr(n(D), o), v)),
        "DenseMatrix, Array": e.referToSelf((v) => (D, o) => u(...yr(D, n(o)), v))
      }, f.SS && (c["SparseMatrix, SparseMatrix"] = e.referToSelf((v) => (D, o) => f.SS(...yr(D, o), v, false))), f.DS && (c["DenseMatrix, SparseMatrix"] = e.referToSelf((v) => (D, o) => f.DS(...yr(D, o), v, false)), c["Array, SparseMatrix"] = e.referToSelf((v) => (D, o) => f.DS(...yr(n(D), o), v, false))), l && (c["SparseMatrix, DenseMatrix"] = e.referToSelf((v) => (D, o) => l(...yr(o, D), v, true)), c["SparseMatrix, Array"] = e.referToSelf((v) => (D, o) => l(...yr(n(o), D), v, true))));
      var i = f.scalar || "any", s = f.Ds || f.Ss;
      s && (d ? (c["DenseMatrix," + i] = (v, D) => t(v, D, d, false), c[i + ", DenseMatrix"] = (v, D) => t(D, v, d, true), c["Array," + i] = (v, D) => t(n(v), D, d, false).valueOf(), c[i + ", Array"] = (v, D) => t(n(D), v, d, true).valueOf()) : (c["DenseMatrix," + i] = e.referToSelf((v) => (D, o) => t(D, o, v, false)), c[i + ", DenseMatrix"] = e.referToSelf((v) => (D, o) => t(o, D, v, true)), c["Array," + i] = e.referToSelf((v) => (D, o) => t(n(D), o, v, false).valueOf()), c[i + ", Array"] = e.referToSelf((v) => (D, o) => t(n(o), D, v, true).valueOf())));
      var p = f.sS !== void 0 ? f.sS : f.Ss;
      return d ? (f.Ss && (c["SparseMatrix," + i] = (v, D) => f.Ss(v, D, d, false)), p && (c[i + ", SparseMatrix"] = (v, D) => p(D, v, d, true))) : (f.Ss && (c["SparseMatrix," + i] = e.referToSelf((v) => (D, o) => f.Ss(D, o, v, false))), p && (c[i + ", SparseMatrix"] = e.referToSelf((v) => (D, o) => p(o, D, v, true)))), d && d.signatures && Wu(c, d.signatures), c;
    };
  }), Ui = "matAlgo01xDSid", Pi = [
    "typed"
  ], Tn = J(Ui, Pi, (r) => {
    var { typed: e } = r;
    return function(u, t, a, f) {
      var d = u._data, l = u._size, c = u._datatype || u.getDataType(), i = t._values, s = t._index, p = t._ptr, v = t._size, D = t._datatype || t._data === void 0 ? t._datatype : t.getDataType();
      if (l.length !== v.length) throw new nr(l.length, v.length);
      if (l[0] !== v[0] || l[1] !== v[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + v + ")");
      if (!i) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      var o = l[0], h = l[1], g = typeof c == "string" && c !== "mixed" && c === D ? c : void 0, C = g ? e.find(a, [
        g,
        g
      ]) : a, y, b, F = [];
      for (y = 0; y < o; y++) F[y] = [];
      var A = [], w = [];
      for (b = 0; b < h; b++) {
        for (var E = b + 1, m = p[b], B = p[b + 1], _ = m; _ < B; _++) y = s[_], A[y] = f ? C(i[_], d[y][b]) : C(d[y][b], i[_]), w[y] = E;
        for (y = 0; y < o; y++) w[y] === E ? F[y][b] = A[y] : F[y][b] = d[y][b];
      }
      return u.createDenseMatrix({
        data: F,
        size: [
          o,
          h
        ],
        datatype: c === u._datatype && D === t._datatype ? g : void 0
      });
    };
  }), Vi = "matAlgo04xSidSid", Li = [
    "typed",
    "equalScalar"
  ], Zi = J(Vi, Li, (r) => {
    var { typed: e, equalScalar: n } = r;
    return function(t, a, f) {
      var d = t._values, l = t._index, c = t._ptr, i = t._size, s = t._datatype || t._data === void 0 ? t._datatype : t.getDataType(), p = a._values, v = a._index, D = a._ptr, o = a._size, h = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
      if (i.length !== o.length) throw new nr(i.length, o.length);
      if (i[0] !== o[0] || i[1] !== o[1]) throw new RangeError("Dimension mismatch. Matrix A (" + i + ") must match Matrix B (" + o + ")");
      var g = i[0], C = i[1], y, b = n, F = 0, A = f;
      typeof s == "string" && s === h && s !== "mixed" && (y = s, b = e.find(n, [
        y,
        y
      ]), F = e.convert(0, y), A = e.find(f, [
        y,
        y
      ]));
      var w = d && p ? [] : void 0, E = [], m = [], B = d && p ? [] : void 0, _ = d && p ? [] : void 0, x = [], N = [], S, O, M, R, T;
      for (O = 0; O < C; O++) {
        m[O] = E.length;
        var $ = O + 1;
        for (R = c[O], T = c[O + 1], M = R; M < T; M++) S = l[M], E.push(S), x[S] = $, B && (B[S] = d[M]);
        for (R = D[O], T = D[O + 1], M = R; M < T; M++) if (S = v[M], x[S] === $) {
          if (B) {
            var Q = A(B[S], p[M]);
            b(Q, F) ? x[S] = null : B[S] = Q;
          }
        } else E.push(S), N[S] = $, _ && (_[S] = p[M]);
        if (B && _) for (M = m[O]; M < E.length; ) S = E[M], x[S] === $ ? (w[M] = B[S], M++) : N[S] === $ ? (w[M] = _[S], M++) : E.splice(M, 1);
      }
      return m[C] = E.length, t.createSparseMatrix({
        values: w,
        index: E,
        ptr: m,
        size: [
          g,
          C
        ],
        datatype: s === t._datatype && h === a._datatype ? y : void 0
      });
    };
  }), Ji = "matAlgo10xSids", Wi = [
    "typed",
    "DenseMatrix"
  ], zn = J(Ji, Wi, (r) => {
    var { typed: e, DenseMatrix: n } = r;
    return function(t, a, f, d) {
      var l = t._values, c = t._index, i = t._ptr, s = t._size, p = t._datatype;
      if (!l) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      var v = s[0], D = s[1], o, h = f;
      typeof p == "string" && (o = p, a = e.convert(a, o), h = e.find(f, [
        o,
        o
      ]));
      for (var g = [], C = [], y = [], b = 0; b < D; b++) {
        for (var F = b + 1, A = i[b], w = i[b + 1], E = A; E < w; E++) {
          var m = c[E];
          C[m] = l[E], y[m] = F;
        }
        for (var B = 0; B < v; B++) b === 0 && (g[B] = []), y[B] === F ? g[B][b] = d ? h(a, C[B]) : h(C[B], a) : g[B][b] = a;
      }
      return new n({
        data: g,
        size: [
          v,
          D
        ],
        datatype: o
      });
    };
  }), Qi = "multiplyScalar", Gi = [
    "typed"
  ], Xi = J(Qi, Gi, (r) => {
    var { typed: e } = r;
    return e("multiplyScalar", {
      "number, number": _n,
      "Complex, Complex": function(u, t) {
        return u.mul(t);
      },
      "BigNumber, BigNumber": function(u, t) {
        return u.times(t);
      },
      "bigint, bigint": function(u, t) {
        return u * t;
      },
      "Fraction, Fraction": function(u, t) {
        return u.mul(t);
      },
      "number | Fraction | BigNumber | Complex, Unit": (n, u) => u.multiply(n),
      "Unit, number | Fraction | BigNumber | Complex | Unit": (n, u) => n.multiply(u)
    });
  }), xt = "multiply", Yi = [
    "typed",
    "matrix",
    "addScalar",
    "multiplyScalar",
    "equalScalar",
    "dot"
  ], Ki = J(xt, Yi, (r) => {
    var { typed: e, matrix: n, addScalar: u, multiplyScalar: t, equalScalar: a, dot: f } = r, d = Ci({
      typed: e,
      equalScalar: a
    }), l = Nn({
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
    function i(F, A, w) {
      if (w === 0) throw new Error("Cannot multiply two empty vectors");
      return f(F, A);
    }
    function s(F, A) {
      if (A.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
      return p(F, A);
    }
    function p(F, A) {
      var w = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._data, _ = A._size, x = A._datatype || A.getDataType(), N = E[0], S = _[1], O, M = u, R = t;
      m && x && m === x && typeof m == "string" && m !== "mixed" && (O = m, M = e.find(u, [
        O,
        O
      ]), R = e.find(t, [
        O,
        O
      ]));
      for (var T = [], $ = 0; $ < S; $++) {
        for (var Q = R(w[0], B[0][$]), X = 1; X < N; X++) Q = M(Q, R(w[X], B[X][$]));
        T[$] = Q;
      }
      return F.createDenseMatrix({
        data: T,
        size: [
          S
        ],
        datatype: m === F._datatype && x === A._datatype ? O : void 0
      });
    }
    var v = e("_multiplyMatrixVector", {
      "DenseMatrix, any": o,
      "SparseMatrix, any": C
    }), D = e("_multiplyMatrixMatrix", {
      "DenseMatrix, DenseMatrix": h,
      "DenseMatrix, SparseMatrix": g,
      "SparseMatrix, DenseMatrix": y,
      "SparseMatrix, SparseMatrix": b
    });
    function o(F, A) {
      var w = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._data, _ = A._datatype || A.getDataType(), x = E[0], N = E[1], S, O = u, M = t;
      m && _ && m === _ && typeof m == "string" && m !== "mixed" && (S = m, O = e.find(u, [
        S,
        S
      ]), M = e.find(t, [
        S,
        S
      ]));
      for (var R = [], T = 0; T < x; T++) {
        for (var $ = w[T], Q = M($[0], B[0]), X = 1; X < N; X++) Q = O(Q, M($[X], B[X]));
        R[T] = Q;
      }
      return F.createDenseMatrix({
        data: R,
        size: [
          x
        ],
        datatype: m === F._datatype && _ === A._datatype ? S : void 0
      });
    }
    function h(F, A) {
      var w = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._data, _ = A._size, x = A._datatype || A.getDataType(), N = E[0], S = E[1], O = _[1], M, R = u, T = t;
      m && x && m === x && typeof m == "string" && m !== "mixed" && m !== "mixed" && (M = m, R = e.find(u, [
        M,
        M
      ]), T = e.find(t, [
        M,
        M
      ]));
      for (var $ = [], Q = 0; Q < N; Q++) {
        var X = w[Q];
        $[Q] = [];
        for (var z = 0; z < O; z++) {
          for (var I = T(X[0], B[0][z]), W = 1; W < S; W++) I = R(I, T(X[W], B[W][z]));
          $[Q][z] = I;
        }
      }
      return F.createDenseMatrix({
        data: $,
        size: [
          N,
          O
        ],
        datatype: m === F._datatype && x === A._datatype ? M : void 0
      });
    }
    function g(F, A) {
      var w = F._data, E = F._size, m = F._datatype || F.getDataType(), B = A._values, _ = A._index, x = A._ptr, N = A._size, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType();
      if (!B) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
      var O = E[0], M = N[1], R, T = u, $ = t, Q = a, X = 0;
      m && S && m === S && typeof m == "string" && m !== "mixed" && (R = m, T = e.find(u, [
        R,
        R
      ]), $ = e.find(t, [
        R,
        R
      ]), Q = e.find(a, [
        R,
        R
      ]), X = e.convert(0, R));
      for (var z = [], I = [], W = [], G = A.createSparseMatrix({
        values: z,
        index: I,
        ptr: W,
        size: [
          O,
          M
        ],
        datatype: m === F._datatype && S === A._datatype ? R : void 0
      }), L = 0; L < M; L++) {
        W[L] = I.length;
        var q = x[L], Z = x[L + 1];
        if (Z > q) for (var P = 0, U = 0; U < O; U++) {
          for (var Y = U + 1, V = void 0, k = q; k < Z; k++) {
            var j = _[k];
            P !== Y ? (V = $(w[U][j], B[k]), P = Y) : V = T(V, $(w[U][j], B[k]));
          }
          P === Y && !Q(V, X) && (I.push(U), z.push(V));
        }
      }
      return W[M] = I.length, G;
    }
    function C(F, A) {
      var w = F._values, E = F._index, m = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
      if (!w) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var _ = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], O = [], M = [], R = [], T, $ = u, Q = t, X = a, z = 0;
      B && x && B === x && typeof B == "string" && B !== "mixed" && (T = B, $ = e.find(u, [
        T,
        T
      ]), Q = e.find(t, [
        T,
        T
      ]), X = e.find(a, [
        T,
        T
      ]), z = e.convert(0, T));
      var I = [], W = [];
      R[0] = 0;
      for (var G = 0; G < S; G++) {
        var L = _[G];
        if (!X(L, z)) for (var q = m[G], Z = m[G + 1], P = q; P < Z; P++) {
          var U = E[P];
          W[U] ? I[U] = $(I[U], Q(L, w[P])) : (W[U] = true, M.push(U), I[U] = Q(L, w[P]));
        }
      }
      for (var Y = M.length, V = 0; V < Y; V++) {
        var k = M[V];
        O[V] = I[k];
      }
      return R[1] = M.length, F.createSparseMatrix({
        values: O,
        index: M,
        ptr: R,
        size: [
          N,
          1
        ],
        datatype: B === F._datatype && x === A._datatype ? T : void 0
      });
    }
    function y(F, A) {
      var w = F._values, E = F._index, m = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
      if (!w) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
      var _ = A._data, x = A._datatype || A.getDataType(), N = F._size[0], S = A._size[0], O = A._size[1], M, R = u, T = t, $ = a, Q = 0;
      B && x && B === x && typeof B == "string" && B !== "mixed" && (M = B, R = e.find(u, [
        M,
        M
      ]), T = e.find(t, [
        M,
        M
      ]), $ = e.find(a, [
        M,
        M
      ]), Q = e.convert(0, M));
      for (var X = [], z = [], I = [], W = F.createSparseMatrix({
        values: X,
        index: z,
        ptr: I,
        size: [
          N,
          O
        ],
        datatype: B === F._datatype && x === A._datatype ? M : void 0
      }), G = [], L = [], q = 0; q < O; q++) {
        I[q] = z.length;
        for (var Z = q + 1, P = 0; P < S; P++) {
          var U = _[P][q];
          if (!$(U, Q)) for (var Y = m[P], V = m[P + 1], k = Y; k < V; k++) {
            var j = E[k];
            L[j] !== Z ? (L[j] = Z, z.push(j), G[j] = T(U, w[k])) : G[j] = R(G[j], T(U, w[k]));
          }
        }
        for (var rr = I[q], er = z.length, ur = rr; ur < er; ur++) {
          var ar = z[ur];
          X[ur] = G[ar];
        }
      }
      return I[O] = z.length, W;
    }
    function b(F, A) {
      var w = F._values, E = F._index, m = F._ptr, B = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), _ = A._values, x = A._index, N = A._ptr, S = A._datatype || A._data === void 0 ? A._datatype : A.getDataType(), O = F._size[0], M = A._size[1], R = w && _, T, $ = u, Q = t;
      B && S && B === S && typeof B == "string" && B !== "mixed" && (T = B, $ = e.find(u, [
        T,
        T
      ]), Q = e.find(t, [
        T,
        T
      ]));
      for (var X = R ? [] : void 0, z = [], I = [], W = F.createSparseMatrix({
        values: X,
        index: z,
        ptr: I,
        size: [
          O,
          M
        ],
        datatype: B === F._datatype && S === A._datatype ? T : void 0
      }), G = R ? [] : void 0, L = [], q, Z, P, U, Y, V, k, j, rr = 0; rr < M; rr++) {
        I[rr] = z.length;
        var er = rr + 1;
        for (Y = N[rr], V = N[rr + 1], U = Y; U < V; U++) if (j = x[U], R) for (Z = m[j], P = m[j + 1], q = Z; q < P; q++) k = E[q], L[k] !== er ? (L[k] = er, z.push(k), G[k] = Q(_[U], w[q])) : G[k] = $(G[k], Q(_[U], w[q]));
        else for (Z = m[j], P = m[j + 1], q = Z; q < P; q++) k = E[q], L[k] !== er && (L[k] = er, z.push(k));
        if (R) for (var ur = I[rr], ar = z.length, pr = ur; pr < ar; pr++) {
          var ir = z[pr];
          X[pr] = G[ir];
        }
      }
      return I[M] = z.length, W;
    }
    return e(xt, t, {
      "Array, Array": e.referTo("Matrix, Matrix", (F) => (A, w) => {
        c(mr(A), mr(w));
        var E = F(n(A), n(w));
        return lr(E) ? E.valueOf() : E;
      }),
      "Matrix, Matrix": function(A, w) {
        var E = A.size(), m = w.size();
        return c(E, m), E.length === 1 ? m.length === 1 ? i(A, w, E[0]) : s(A, w) : m.length === 1 ? v(A, w) : D(A, w);
      },
      "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (A, w) => F(A, n(w))),
      "Array, Matrix": e.referToSelf((F) => (A, w) => F(n(A, w.storage()), w)),
      "SparseMatrix, any": function(A, w) {
        return d(A, w, t, false);
      },
      "DenseMatrix, any": function(A, w) {
        return l(A, w, t, false);
      },
      "any, SparseMatrix": function(A, w) {
        return d(w, A, t, true);
      },
      "any, DenseMatrix": function(A, w) {
        return l(w, A, t, true);
      },
      "Array, any": function(A, w) {
        return l(n(A), w, t, false).valueOf();
      },
      "any, Array": function(A, w) {
        return l(n(w), A, t, true).valueOf();
      },
      "any, any": t,
      "any, any, ...any": e.referToSelf((F) => (A, w, E) => {
        for (var m = F(A, w), B = 0; B < E.length; B++) m = F(m, E[B]);
        return m;
      })
    });
  }), St = "sign", Hi = [
    "typed",
    "BigNumber",
    "Fraction",
    "complex"
  ], ki = J(St, Hi, (r) => {
    var { typed: e, BigNumber: n, complex: u, Fraction: t } = r;
    return e(St, {
      number: Ue,
      Complex: function(f) {
        return f.im === 0 ? u(Ue(f.re)) : f.sign();
      },
      BigNumber: function(f) {
        return new n(f.cmp(0));
      },
      bigint: function(f) {
        return f > 0n ? 1n : f < 0n ? -1n : 0n;
      },
      Fraction: function(f) {
        return new t(f.s, 1);
      },
      "Array | Matrix": e.referToSelf((a) => (f) => wr(f, a)),
      Unit: e.referToSelf((a) => (f) => {
        if (!f._isDerived() && f.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
        return e.find(a, f.valueType())(f.value);
      })
    });
  }), ji = "sqrt", ro = [
    "config",
    "typed",
    "Complex"
  ], eo = J(ji, ro, (r) => {
    var { config: e, typed: n, Complex: u } = r;
    return n("sqrt", {
      number: t,
      Complex: function(f) {
        return f.sqrt();
      },
      BigNumber: function(f) {
        return !f.isNegative() || e.predictable ? f.sqrt() : t(f.toNumber());
      },
      Unit: function(f) {
        return f.pow(0.5);
      }
    });
    function t(a) {
      return isNaN(a) ? NaN : a >= 0 || e.predictable ? Math.sqrt(a) : new u(a, 0).sqrt();
    }
  }), Mt = "subtract", to = [
    "typed",
    "matrix",
    "equalScalar",
    "subtractScalar",
    "unaryMinus",
    "DenseMatrix",
    "concat"
  ], no = J(Mt, to, (r) => {
    var { typed: e, matrix: n, equalScalar: u, subtractScalar: t, unaryMinus: a, DenseMatrix: f, concat: d } = r, l = Tn({
      typed: e
    }), c = Gr({
      typed: e
    }), i = Ti({
      typed: e,
      equalScalar: u
    }), s = zn({
      typed: e,
      DenseMatrix: f
    }), p = Qr({
      typed: e,
      DenseMatrix: f
    }), v = Vr({
      typed: e,
      matrix: n,
      concat: d
    });
    return e(Mt, {
      "any, any": t
    }, v({
      elop: t,
      SS: i,
      DS: l,
      SD: c,
      Ss: p,
      sS: s
    }));
  }), uo = "matAlgo07xSSf", ao = [
    "typed",
    "DenseMatrix"
  ], jr = J(uo, ao, (r) => {
    var { typed: e, DenseMatrix: n } = r;
    return function(a, f, d) {
      var l = a._size, c = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), i = f._size, s = f._datatype || f._data === void 0 ? f._datatype : f.getDataType();
      if (l.length !== i.length) throw new nr(l.length, i.length);
      if (l[0] !== i[0] || l[1] !== i[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + i + ")");
      var p = l[0], v = l[1], D, o = 0, h = d;
      typeof c == "string" && c === s && c !== "mixed" && (D = c, o = e.convert(0, D), h = e.find(d, [
        D,
        D
      ]));
      var g, C, y = [];
      for (g = 0; g < p; g++) y[g] = [];
      var b = [], F = [], A = [], w = [];
      for (C = 0; C < v; C++) {
        var E = C + 1;
        for (u(a, C, A, b, E), u(f, C, w, F, E), g = 0; g < p; g++) {
          var m = A[g] === E ? b[g] : o, B = w[g] === E ? F[g] : o;
          y[g][C] = h(m, B);
        }
      }
      return new n({
        data: y,
        size: [
          p,
          v
        ],
        datatype: c === a._datatype && s === f._datatype ? D : void 0
      });
    };
    function u(t, a, f, d, l) {
      for (var c = t._values, i = t._index, s = t._ptr, p = s[a], v = s[a + 1]; p < v; p++) {
        var D = i[p];
        f[D] = l, d[D] = c[p];
      }
    }
  }), Nt = "conj", io = [
    "typed"
  ], oo = J(Nt, io, (r) => {
    var { typed: e } = r;
    return e(Nt, {
      "number | BigNumber | Fraction": (n) => n,
      Complex: (n) => n.conjugate(),
      "Array | Matrix": e.referToSelf((n) => (u) => wr(u, n))
    });
  }), Tt = "im", so = [
    "typed"
  ], fo = J(Tt, so, (r) => {
    var { typed: e } = r;
    return e(Tt, {
      number: () => 0,
      "BigNumber | Fraction": (n) => n.mul(0),
      Complex: (n) => n.im,
      "Array | Matrix": e.referToSelf((n) => (u) => wr(u, n))
    });
  }), zt = "re", lo = [
    "typed"
  ], co = J(zt, lo, (r) => {
    var { typed: e } = r;
    return e(zt, {
      "number | BigNumber | Fraction": (n) => n,
      Complex: (n) => n.re,
      "Array | Matrix": e.referToSelf((n) => (u) => wr(u, n))
    });
  }), Ot = "concat", vo = [
    "typed",
    "matrix",
    "isInteger"
  ], Do = J(Ot, vo, (r) => {
    var { typed: e, matrix: n, isInteger: u } = r;
    return e(Ot, {
      "...Array | Matrix | number | BigNumber": function(a) {
        var f, d = a.length, l = -1, c, i = false, s = [];
        for (f = 0; f < d; f++) {
          var p = a[f];
          if (lr(p) && (i = true), or(p) || gr(p)) {
            if (f !== d - 1) throw new Error("Dimension must be specified as last argument");
            if (c = l, l = p.valueOf(), !u(l)) throw new TypeError("Integer number expected for dimension");
            if (l < 0 || f > 0 && l > c) throw new Pr(l, c + 1);
          } else {
            var v = tr(p).valueOf(), D = mr(v);
            if (s[f] = v, c = l, l = D.length - 1, f > 0 && l !== c) throw new nr(c + 1, l + 1);
          }
        }
        if (s.length === 0) throw new SyntaxError("At least one matrix expected");
        for (var o = s.shift(); s.length; ) o = An(o, s.shift(), l);
        return i ? n(o) : o;
      },
      "...string": function(a) {
        return a.join("");
      }
    });
  }), $t = "column", po = [
    "typed",
    "Index",
    "matrix",
    "range"
  ], ho = J($t, po, (r) => {
    var { typed: e, Index: n, matrix: u, range: t } = r;
    return e($t, {
      "Matrix, number": a,
      "Array, number": function(d, l) {
        return a(u(tr(d)), l).valueOf();
      }
    });
    function a(f, d) {
      if (f.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
      hr(d, f.size()[1]);
      var l = t(0, f.size()[0]), c = new n(l, d), i = f.subset(c);
      return lr(i) ? i : u([
        [
          i
        ]
      ]);
    }
  }), It = "diag", mo = [
    "typed",
    "matrix",
    "DenseMatrix",
    "SparseMatrix"
  ], go = J(It, mo, (r) => {
    var { typed: e, matrix: n, DenseMatrix: u, SparseMatrix: t } = r;
    return e(It, {
      Array: function(c) {
        return a(c, 0, mr(c), null);
      },
      "Array, number": function(c, i) {
        return a(c, i, mr(c), null);
      },
      "Array, BigNumber": function(c, i) {
        return a(c, i.toNumber(), mr(c), null);
      },
      "Array, string": function(c, i) {
        return a(c, 0, mr(c), i);
      },
      "Array, number, string": function(c, i, s) {
        return a(c, i, mr(c), s);
      },
      "Array, BigNumber, string": function(c, i, s) {
        return a(c, i.toNumber(), mr(c), s);
      },
      Matrix: function(c) {
        return a(c, 0, c.size(), c.storage());
      },
      "Matrix, number": function(c, i) {
        return a(c, i, c.size(), c.storage());
      },
      "Matrix, BigNumber": function(c, i) {
        return a(c, i.toNumber(), c.size(), c.storage());
      },
      "Matrix, string": function(c, i) {
        return a(c, 0, c.size(), i);
      },
      "Matrix, number, string": function(c, i, s) {
        return a(c, i, c.size(), s);
      },
      "Matrix, BigNumber, string": function(c, i, s) {
        return a(c, i.toNumber(), c.size(), s);
      }
    });
    function a(l, c, i, s) {
      if (!fr(c)) throw new TypeError("Second parameter in function diag must be an integer");
      var p = c > 0 ? c : 0, v = c < 0 ? -c : 0;
      switch (i.length) {
        case 1:
          return f(l, c, s, i[0], v, p);
        case 2:
          return d(l, c, s, i, v, p);
      }
      throw new RangeError("Matrix for function diag must be 2 dimensional");
    }
    function f(l, c, i, s, p, v) {
      var D = [
        s + p,
        s + v
      ];
      if (i && i !== "sparse" && i !== "dense") throw new TypeError("Unknown matrix type ".concat(i, '"'));
      var o = i === "sparse" ? t.diagonal(D, l, c) : u.diagonal(D, l, c);
      return i !== null ? o : o.valueOf();
    }
    function d(l, c, i, s, p, v) {
      if (lr(l)) {
        var D = l.diagonal(c);
        return i !== null ? i !== D.storage() ? n(D, i) : D : D.valueOf();
      }
      for (var o = Math.min(s[0] - p, s[1] - v), h = [], g = 0; g < o; g++) h[g] = l[g + p][g + v];
      return i !== null ? n(h) : h;
    }
  }), qt = "flatten", yo = [
    "typed"
  ], Ao = J(qt, yo, (r) => {
    var { typed: e } = r;
    return e(qt, {
      Array: function(u) {
        return qe(u);
      },
      Matrix: function(u) {
        return u.create(qe(u.toArray()), u.datatype());
      }
    });
  }), Rt = "getMatrixDataType", Fo = [
    "typed"
  ], Eo = J(Rt, Fo, (r) => {
    var { typed: e } = r;
    return e(Rt, {
      Array: function(u) {
        return we(u, Nr);
      },
      Matrix: function(u) {
        return u.getDataType();
      }
    });
  }), Ut = "identity", Co = [
    "typed",
    "config",
    "matrix",
    "BigNumber",
    "DenseMatrix",
    "SparseMatrix"
  ], wo = J(Ut, Co, (r) => {
    var { typed: e, config: n, matrix: u, BigNumber: t, DenseMatrix: a, SparseMatrix: f } = r;
    return e(Ut, {
      "": function() {
        return n.matrix === "Matrix" ? u([]) : [];
      },
      string: function(i) {
        return u(i);
      },
      "number | BigNumber": function(i) {
        return l(i, i, n.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, string": function(i, s) {
        return l(i, i, s);
      },
      "number | BigNumber, number | BigNumber": function(i, s) {
        return l(i, s, n.matrix === "Matrix" ? "dense" : void 0);
      },
      "number | BigNumber, number | BigNumber, string": function(i, s, p) {
        return l(i, s, p);
      },
      Array: function(i) {
        return d(i);
      },
      "Array, string": function(i, s) {
        return d(i, s);
      },
      Matrix: function(i) {
        return d(i.valueOf(), i.storage());
      },
      "Matrix, string": function(i, s) {
        return d(i.valueOf(), s);
      }
    });
    function d(c, i) {
      switch (c.length) {
        case 0:
          return i ? u(i) : [];
        case 1:
          return l(c[0], c[0], i);
        case 2:
          return l(c[0], c[1], i);
        default:
          throw new Error("Vector containing two values expected");
      }
    }
    function l(c, i, s) {
      var p = gr(c) || gr(i) ? t : null;
      if (gr(c) && (c = c.toNumber()), gr(i) && (i = i.toNumber()), !fr(c) || c < 1) throw new Error("Parameters in function identity must be positive integers");
      if (!fr(i) || i < 1) throw new Error("Parameters in function identity must be positive integers");
      var v = p ? new t(1) : 1, D = p ? new p(0) : 0, o = [
        c,
        i
      ];
      if (s) {
        if (s === "sparse") return f.diagonal(o, v, 0, D);
        if (s === "dense") return a.diagonal(o, v, 0, D);
        throw new TypeError('Unknown matrix type "'.concat(s, '"'));
      }
      for (var h = De([], o, D), g = c < i ? c : i, C = 0; C < g; C++) h[C][C] = v;
      return h;
    }
  });
  function On() {
    throw new Error('No "bignumber" implementation available');
  }
  function bo() {
    throw new Error('No "fraction" implementation available');
  }
  function $n() {
    throw new Error('No "matrix" implementation available');
  }
  var Pt = "range", Bo = [
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
  ], _o = J(Pt, Bo, (r) => {
    var { typed: e, config: n, matrix: u, bignumber: t, smaller: a, smallerEq: f, larger: d, largerEq: l, add: c, isPositive: i } = r;
    return e(Pt, {
      string: p,
      "string, boolean": p,
      "number, number": function(h, g) {
        return s(v(h, g, 1, false));
      },
      "number, number, number": function(h, g, C) {
        return s(v(h, g, C, false));
      },
      "number, number, boolean": function(h, g, C) {
        return s(v(h, g, 1, C));
      },
      "number, number, number, boolean": function(h, g, C, y) {
        return s(v(h, g, C, y));
      },
      "BigNumber, BigNumber": function(h, g) {
        var C = h.constructor;
        return s(v(h, g, new C(1), false));
      },
      "BigNumber, BigNumber, BigNumber": function(h, g, C) {
        return s(v(h, g, C, false));
      },
      "BigNumber, BigNumber, boolean": function(h, g, C) {
        var y = h.constructor;
        return s(v(h, g, new y(1), C));
      },
      "BigNumber, BigNumber, BigNumber, boolean": function(h, g, C, y) {
        return s(v(h, g, C, y));
      },
      "Unit, Unit, Unit": function(h, g, C) {
        return s(v(h, g, C, false));
      },
      "Unit, Unit, Unit, boolean": function(h, g, C, y) {
        return s(v(h, g, C, y));
      }
    });
    function s(o) {
      return n.matrix === "Matrix" ? u ? u(o) : $n() : o;
    }
    function p(o, h) {
      var g = D(o);
      if (!g) throw new SyntaxError('String "' + o + '" is no valid range');
      return n.number === "BigNumber" ? (t === void 0 && On(), s(v(t(g.start), t(g.end), t(g.step)))) : s(v(g.start, g.end, g.step, h));
    }
    function v(o, h, g, C) {
      for (var y = [], b = i(g) ? C ? f : a : C ? l : d, F = o; b(F, h); ) y.push(F), F = c(F, g);
      return y;
    }
    function D(o) {
      var h = o.split(":"), g = h.map(function(y) {
        return Number(y);
      }), C = g.some(function(y) {
        return isNaN(y);
      });
      if (C) return null;
      switch (g.length) {
        case 2:
          return {
            start: g[0],
            end: g[1],
            step: 1
          };
        case 3:
          return {
            start: g[0],
            end: g[2],
            step: g[1]
          };
        default:
          return null;
      }
    }
  }), Vt = "reshape", xo = [
    "typed",
    "isInteger",
    "matrix"
  ], So = J(Vt, xo, (r) => {
    var { typed: e, isInteger: n } = r;
    return e(Vt, {
      "Matrix, Array": function(t, a) {
        return t.reshape(a, true);
      },
      "Array, Array": function(t, a) {
        return a.forEach(function(f) {
          if (!n(f)) throw new TypeError("Invalid size for dimension: " + f);
        }), Ge(t, a);
      }
    });
  }), Lt = "size", Mo = [
    "typed",
    "config",
    "?matrix"
  ], No = J(Lt, Mo, (r) => {
    var { typed: e, config: n, matrix: u } = r;
    return e(Lt, {
      Matrix: function(a) {
        return a.create(a.size(), "number");
      },
      Array: mr,
      string: function(a) {
        return n.matrix === "Array" ? [
          a.length
        ] : u([
          a.length
        ], "dense", "number");
      },
      "number | Complex | BigNumber | Unit | boolean | null": function(a) {
        return n.matrix === "Array" ? [] : u ? u([], "dense", "number") : $n();
      }
    });
  }), Zt = "transpose", To = [
    "typed",
    "matrix"
  ], zo = J(Zt, To, (r) => {
    var { typed: e, matrix: n } = r;
    return e(Zt, {
      Array: (f) => u(n(f)).valueOf(),
      Matrix: u,
      any: tr
    });
    function u(f) {
      var d = f.size(), l;
      switch (d.length) {
        case 1:
          l = f.clone();
          break;
        case 2:
          {
            var c = d[0], i = d[1];
            if (i === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Dr(d) + ")");
            switch (f.storage()) {
              case "dense":
                l = t(f, c, i);
                break;
              case "sparse":
                l = a(f, c, i);
                break;
            }
          }
          break;
        default:
          throw new RangeError("Matrix must be a vector or two dimensional (size: " + Dr(d) + ")");
      }
      return l;
    }
    function t(f, d, l) {
      for (var c = f._data, i = [], s, p = 0; p < l; p++) {
        s = i[p] = [];
        for (var v = 0; v < d; v++) s[v] = tr(c[v][p]);
      }
      return f.createDenseMatrix({
        data: i,
        size: [
          l,
          d
        ],
        datatype: f._datatype
      });
    }
    function a(f, d, l) {
      for (var c = f._values, i = f._index, s = f._ptr, p = c ? [] : void 0, v = [], D = [], o = [], h = 0; h < d; h++) o[h] = 0;
      var g, C, y;
      for (g = 0, C = i.length; g < C; g++) o[i[g]]++;
      for (var b = 0, F = 0; F < d; F++) D.push(b), b += o[F], o[F] = D[F];
      for (D.push(b), y = 0; y < l; y++) for (var A = s[y], w = s[y + 1], E = A; E < w; E++) {
        var m = o[i[E]]++;
        v[m] = y, c && (p[m] = tr(c[E]));
      }
      return f.createSparseMatrix({
        values: p,
        index: v,
        ptr: D,
        size: [
          l,
          d
        ],
        datatype: f._datatype
      });
    }
  }), Jt = "ctranspose", Oo = [
    "typed",
    "transpose",
    "conj"
  ], $o = J(Jt, Oo, (r) => {
    var { typed: e, transpose: n, conj: u } = r;
    return e(Jt, {
      any: function(a) {
        return u(n(a));
      }
    });
  }), Wt = "zeros", Io = [
    "typed",
    "config",
    "matrix",
    "BigNumber"
  ], qo = J(Wt, Io, (r) => {
    var { typed: e, config: n, matrix: u, BigNumber: t } = r;
    return e(Wt, {
      "": function() {
        return n.matrix === "Array" ? a([]) : a([], "default");
      },
      "...number | BigNumber | string": function(c) {
        var i = c[c.length - 1];
        if (typeof i == "string") {
          var s = c.pop();
          return a(c, s);
        } else return n.matrix === "Array" ? a(c) : a(c, "default");
      },
      Array: a,
      Matrix: function(c) {
        var i = c.storage();
        return a(c.valueOf(), i);
      },
      "Array | Matrix, string": function(c, i) {
        return a(c.valueOf(), i);
      }
    });
    function a(l, c) {
      var i = f(l), s = i ? new t(0) : 0;
      if (d(l), c) {
        var p = u(c);
        return l.length > 0 ? p.resize(l, s) : p;
      } else {
        var v = [];
        return l.length > 0 ? De(v, l, s) : v;
      }
    }
    function f(l) {
      var c = false;
      return l.forEach(function(i, s, p) {
        gr(i) && (c = true, p[s] = i.toNumber());
      }), c;
    }
    function d(l) {
      l.forEach(function(c) {
        if (typeof c != "number" || !fr(c) || c < 0) throw new Error("Parameters in function zeros must be positive integers");
      });
    }
  }), Ro = "numeric", Uo = [
    "number",
    "?bignumber",
    "?fraction"
  ], Po = J(Ro, Uo, (r) => {
    var { number: e, bignumber: n, fraction: u } = r, t = {
      string: true,
      number: true,
      BigNumber: true,
      Fraction: true
    }, a = {
      number: (f) => e(f),
      BigNumber: n ? (f) => n(f) : On,
      bigint: (f) => BigInt(f),
      Fraction: u ? (f) => u(f) : bo
    };
    return function(d) {
      var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", c = arguments.length > 2 ? arguments[2] : void 0;
      if (c !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
      var i = Nr(d);
      if (!(i in t)) throw new TypeError("Cannot convert " + d + ' of type "' + i + '"; valid input types are ' + Object.keys(t).join(", "));
      if (!(l in a)) throw new TypeError("Cannot convert " + d + ' to type "' + l + '"; valid output types are ' + Object.keys(a).join(", "));
      return l === i ? d : a[l](d);
    };
  }), Qt = "divideScalar", Vo = [
    "typed",
    "numeric"
  ], Lo = J(Qt, Vo, (r) => {
    var { typed: e, numeric: n } = r;
    return e(Qt, {
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
      "Unit, number | Complex | Fraction | BigNumber | Unit": (u, t) => u.divide(t),
      "number | Fraction | Complex | BigNumber, Unit": (u, t) => t.divideInto(u)
    });
  }), Gt = "pow", Zo = [
    "typed",
    "config",
    "identity",
    "multiply",
    "matrix",
    "inv",
    "fraction",
    "number",
    "Complex"
  ], Jo = J(Gt, Zo, (r) => {
    var { typed: e, config: n, identity: u, multiply: t, matrix: a, inv: f, number: d, fraction: l, Complex: c } = r;
    return e(Gt, {
      "number, number": i,
      "Complex, Complex": function(D, o) {
        return D.pow(o);
      },
      "BigNumber, BigNumber": function(D, o) {
        return o.isInteger() || D >= 0 || n.predictable ? D.pow(o) : new c(D.toNumber(), 0).pow(o.toNumber(), 0);
      },
      "bigint, bigint": (v, D) => v ** D,
      "Fraction, Fraction": function(D, o) {
        var h = D.pow(o);
        if (h != null) return h;
        if (n.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
        return i(D.valueOf(), o.valueOf());
      },
      "Array, number": s,
      "Array, BigNumber": function(D, o) {
        return s(D, o.toNumber());
      },
      "Matrix, number": p,
      "Matrix, BigNumber": function(D, o) {
        return p(D, o.toNumber());
      },
      "Unit, number | BigNumber": function(D, o) {
        return D.pow(o);
      }
    });
    function i(v, D) {
      if (n.predictable && !fr(D) && v < 0) try {
        var o = l(D), h = d(o);
        if ((D === h || Math.abs((D - h) / D) < 1e-14) && o.d % 2 === 1) return (o.n % 2 === 0 ? 1 : -1) * Math.pow(-v, D);
      } catch {
      }
      return n.predictable && (v < -1 && D === 1 / 0 || v > -1 && v < 0 && D === -1 / 0) ? NaN : fr(D) || v >= 0 || n.predictable ? Sn(v, D) : v * v < 1 && D === 1 / 0 || v * v > 1 && D === -1 / 0 ? 0 : new c(v, 0).pow(D, 0);
    }
    function s(v, D) {
      if (!fr(D)) throw new TypeError("For A^b, b must be an integer (value is " + D + ")");
      var o = mr(v);
      if (o.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + o.length + " dimensions)");
      if (o[0] !== o[1]) throw new Error("For A^b, A must be square (size is " + o[0] + "x" + o[1] + ")");
      if (D < 0) try {
        return s(f(v), -D);
      } catch (C) {
        throw C.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + D + ")") : C;
      }
      for (var h = u(o[0]).valueOf(), g = v; D >= 1; ) (D & 1) === 1 && (h = t(g, h)), D >>= 1, g = t(g, g);
      return h;
    }
    function p(v, D) {
      return a(s(v.valueOf(), D));
    }
  });
  function In(r) {
    var { DenseMatrix: e } = r;
    return function(u, t, a) {
      var f = u.size();
      if (f.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + Dr(f) + ")");
      var d = f[0], l = f[1];
      if (d !== l) throw new RangeError("Matrix must be square (size: " + Dr(f) + ")");
      var c = [];
      if (lr(t)) {
        var i = t.size(), s = t._data;
        if (i.length === 1) {
          if (i[0] !== d) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var p = 0; p < d; p++) c[p] = [
            s[p]
          ];
          return new e({
            data: c,
            size: [
              d,
              1
            ],
            datatype: t._datatype
          });
        }
        if (i.length === 2) {
          if (i[0] !== d || i[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          if (sn(t)) {
            if (a) {
              c = [];
              for (var v = 0; v < d; v++) c[v] = [
                s[v][0]
              ];
              return new e({
                data: c,
                size: [
                  d,
                  1
                ],
                datatype: t._datatype
              });
            }
            return t;
          }
          if (fn(t)) {
            for (var D = 0; D < d; D++) c[D] = [
              0
            ];
            for (var o = t._values, h = t._index, g = t._ptr, C = g[1], y = g[0]; y < C; y++) {
              var b = h[y];
              c[b][0] = o[y];
            }
            return new e({
              data: c,
              size: [
                d,
                1
              ],
              datatype: t._datatype
            });
          }
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
      if (vr(t)) {
        var F = mr(t);
        if (F.length === 1) {
          if (F[0] !== d) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var A = 0; A < d; A++) c[A] = [
            t[A]
          ];
          return new e({
            data: c,
            size: [
              d,
              1
            ]
          });
        }
        if (F.length === 2) {
          if (F[0] !== d || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
          for (var w = 0; w < d; w++) c[w] = [
            t[w][0]
          ];
          return new e({
            data: c,
            size: [
              d,
              1
            ]
          });
        }
        throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
      }
    };
  }
  var Xt = "usolve", Wo = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], Qo = J(Xt, Wo, (r) => {
    var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: f, DenseMatrix: d } = r, l = In({
      DenseMatrix: d
    });
    return e(Xt, {
      "SparseMatrix, Array | Matrix": function(p, v) {
        return i(p, v);
      },
      "DenseMatrix, Array | Matrix": function(p, v) {
        return c(p, v);
      },
      "Array, Array | Matrix": function(p, v) {
        var D = n(p), o = c(D, v);
        return o.valueOf();
      }
    });
    function c(s, p) {
      p = l(s, p, true);
      for (var v = p._data, D = s._size[0], o = s._size[1], h = [], g = s._data, C = o - 1; C >= 0; C--) {
        var y = v[C][0] || 0, b = void 0;
        if (f(y, 0)) b = 0;
        else {
          var F = g[C][C];
          if (f(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          b = u(y, F);
          for (var A = C - 1; A >= 0; A--) v[A] = [
            a(v[A][0] || 0, t(b, g[A][C]))
          ];
        }
        h[C] = [
          b
        ];
      }
      return new d({
        data: h,
        size: [
          D,
          1
        ]
      });
    }
    function i(s, p) {
      p = l(s, p, true);
      for (var v = p._data, D = s._size[0], o = s._size[1], h = s._values, g = s._index, C = s._ptr, y = [], b = o - 1; b >= 0; b--) {
        var F = v[b][0] || 0;
        if (f(F, 0)) y[b] = [
          0
        ];
        else {
          for (var A = 0, w = [], E = [], m = C[b], B = C[b + 1], _ = B - 1; _ >= m; _--) {
            var x = g[_];
            x === b ? A = h[_] : x < b && (w.push(h[_]), E.push(x));
          }
          if (f(A, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
          for (var N = u(F, A), S = 0, O = E.length; S < O; S++) {
            var M = E[S];
            v[M] = [
              a(v[M][0], t(N, w[S]))
            ];
          }
          y[b] = [
            N
          ];
        }
      }
      return new d({
        data: y,
        size: [
          D,
          1
        ]
      });
    }
  }), Yt = "usolveAll", Go = [
    "typed",
    "matrix",
    "divideScalar",
    "multiplyScalar",
    "subtractScalar",
    "equalScalar",
    "DenseMatrix"
  ], Xo = J(Yt, Go, (r) => {
    var { typed: e, matrix: n, divideScalar: u, multiplyScalar: t, subtractScalar: a, equalScalar: f, DenseMatrix: d } = r, l = In({
      DenseMatrix: d
    });
    return e(Yt, {
      "SparseMatrix, Array | Matrix": function(p, v) {
        return i(p, v);
      },
      "DenseMatrix, Array | Matrix": function(p, v) {
        return c(p, v);
      },
      "Array, Array | Matrix": function(p, v) {
        var D = n(p), o = c(D, v);
        return o.map((h) => h.valueOf());
      }
    });
    function c(s, p) {
      for (var v = [
        l(s, p, true)._data.map((E) => E[0])
      ], D = s._data, o = s._size[0], h = s._size[1], g = h - 1; g >= 0; g--) for (var C = v.length, y = 0; y < C; y++) {
        var b = v[y];
        if (f(D[g][g], 0)) if (f(b[g], 0)) {
          if (y === 0) {
            var A = [
              ...b
            ];
            A[g] = 1;
            for (var w = g - 1; w >= 0; w--) A[w] = a(A[w], D[w][g]);
            v.push(A);
          }
        } else {
          if (y === 0) return [];
          v.splice(y, 1), y -= 1, C -= 1;
        }
        else {
          b[g] = u(b[g], D[g][g]);
          for (var F = g - 1; F >= 0; F--) b[F] = a(b[F], t(b[g], D[F][g]));
        }
      }
      return v.map((E) => new d({
        data: E.map((m) => [
          m
        ]),
        size: [
          o,
          1
        ]
      }));
    }
    function i(s, p) {
      for (var v = [
        l(s, p, true)._data.map((X) => X[0])
      ], D = s._size[0], o = s._size[1], h = s._values, g = s._index, C = s._ptr, y = o - 1; y >= 0; y--) for (var b = v.length, F = 0; F < b; F++) {
        for (var A = v[F], w = [], E = [], m = C[y], B = C[y + 1], _ = 0, x = B - 1; x >= m; x--) {
          var N = g[x];
          N === y ? _ = h[x] : N < y && (w.push(h[x]), E.push(N));
        }
        if (f(_, 0)) if (f(A[y], 0)) {
          if (F === 0) {
            var R = [
              ...A
            ];
            R[y] = 1;
            for (var T = 0, $ = E.length; T < $; T++) {
              var Q = E[T];
              R[Q] = a(R[Q], w[T]);
            }
            v.push(R);
          }
        } else {
          if (F === 0) return [];
          v.splice(F, 1), F -= 1, b -= 1;
        }
        else {
          A[y] = u(A[y], _);
          for (var S = 0, O = E.length; S < O; S++) {
            var M = E[S];
            A[M] = a(A[M], t(A[y], w[S]));
          }
        }
      }
      return v.map((X) => new d({
        data: X.map((z) => [
          z
        ]),
        size: [
          D,
          1
        ]
      }));
    }
  }), he = "equal", Yo = [
    "typed",
    "matrix",
    "equalScalar",
    "DenseMatrix",
    "concat"
  ], Ko = J(he, Yo, (r) => {
    var { typed: e, matrix: n, equalScalar: u, DenseMatrix: t, concat: a } = r, f = Gr({
      typed: e
    }), d = jr({
      typed: e,
      DenseMatrix: t
    }), l = Qr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: n,
      concat: a
    });
    return e(he, Ho({
      typed: e,
      equalScalar: u
    }), c({
      elop: u,
      SS: d,
      DS: f,
      Ss: l
    }));
  }), Ho = J(he, [
    "typed",
    "equalScalar"
  ], (r) => {
    var { typed: e, equalScalar: n } = r;
    return e(he, {
      "any, any": function(t, a) {
        return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
      }
    });
  }), me = "smaller", ko = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], jo = J(me, ko, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, f = Gr({
      typed: e
    }), d = jr({
      typed: e,
      DenseMatrix: t
    }), l = Qr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = kr({
      typed: e
    });
    return e(me, rs({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, p) => s < p,
      "BigNumber, BigNumber": function(p, v) {
        return p.lt(v) && !Wr(p, v, n.relTol, n.absTol);
      },
      "bigint, bigint": (s, p) => s < p,
      "Fraction, Fraction": (s, p) => s.compare(p) === -1,
      "Complex, Complex": function(p, v) {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: d,
      DS: f,
      Ss: l
    }));
  }), rs = J(me, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(me, {
      "number, number": function(t, a) {
        return t < a && !$r(t, a, n.relTol, n.absTol);
      }
    });
  }), ge = "smallerEq", es = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], ts = J(ge, es, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, f = Gr({
      typed: e
    }), d = jr({
      typed: e,
      DenseMatrix: t
    }), l = Qr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = kr({
      typed: e
    });
    return e(ge, ns({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, p) => s <= p,
      "BigNumber, BigNumber": function(p, v) {
        return p.lte(v) || Wr(p, v, n.relTol, n.absTol);
      },
      "bigint, bigint": (s, p) => s <= p,
      "Fraction, Fraction": (s, p) => s.compare(p) !== 1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: d,
      DS: f,
      Ss: l
    }));
  }), ns = J(ge, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(ge, {
      "number, number": function(t, a) {
        return t <= a || $r(t, a, n.relTol, n.absTol);
      }
    });
  }), ye = "larger", us = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], as = J(ye, us, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, f = Gr({
      typed: e
    }), d = jr({
      typed: e,
      DenseMatrix: t
    }), l = Qr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = kr({
      typed: e
    });
    return e(ye, is({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, p) => s > p,
      "BigNumber, BigNumber": function(p, v) {
        return p.gt(v) && !Wr(p, v, n.relTol, n.absTol);
      },
      "bigint, bigint": (s, p) => s > p,
      "Fraction, Fraction": (s, p) => s.compare(p) === 1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: d,
      DS: f,
      Ss: l
    }));
  }), is = J(ye, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(ye, {
      "number, number": function(t, a) {
        return t > a && !$r(t, a, n.relTol, n.absTol);
      }
    });
  }), Ae = "largerEq", os = [
    "typed",
    "config",
    "matrix",
    "DenseMatrix",
    "concat"
  ], ss = J(Ae, os, (r) => {
    var { typed: e, config: n, matrix: u, DenseMatrix: t, concat: a } = r, f = Gr({
      typed: e
    }), d = jr({
      typed: e,
      DenseMatrix: t
    }), l = Qr({
      typed: e,
      DenseMatrix: t
    }), c = Vr({
      typed: e,
      matrix: u,
      concat: a
    }), i = kr({
      typed: e
    });
    return e(Ae, fs({
      typed: e,
      config: n
    }), {
      "boolean, boolean": (s, p) => s >= p,
      "BigNumber, BigNumber": function(p, v) {
        return p.gte(v) || Wr(p, v, n.relTol, n.absTol);
      },
      "bigint, bigint": function(p, v) {
        return p >= v;
      },
      "Fraction, Fraction": (s, p) => s.compare(p) !== -1,
      "Complex, Complex": function() {
        throw new TypeError("No ordering relation is defined for complex numbers");
      }
    }, i, c({
      SS: d,
      DS: f,
      Ss: l
    }));
  }), fs = J(Ae, [
    "typed",
    "config"
  ], (r) => {
    var { typed: e, config: n } = r;
    return e(Ae, {
      "number, number": function(t, a) {
        return t >= a || $r(t, a, n.relTol, n.absTol);
      }
    });
  }), ls = "ImmutableDenseMatrix", cs = [
    "smaller",
    "DenseMatrix"
  ], vs = J(ls, cs, (r) => {
    var { smaller: e, DenseMatrix: n } = r;
    function u(t, a) {
      if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
      if (a && !Mr(a)) throw new Error("Invalid datatype: " + a);
      if (lr(t) || vr(t)) {
        var f = new n(t, a);
        this._data = f._data, this._size = f._size, this._datatype = f._datatype, this._min = null, this._max = null;
      } else if (t && vr(t.data) && vr(t.size)) this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
      else {
        if (t) throw new TypeError("Unsupported type of data (" + Nr(t) + ")");
        this._data = [], this._size = [
          0
        ], this._datatype = a, this._min = null, this._max = null;
      }
    }
    return u.prototype = new n(), u.prototype.type = "ImmutableDenseMatrix", u.prototype.isImmutableDenseMatrix = true, u.prototype.subset = function(t) {
      switch (arguments.length) {
        case 1: {
          var a = n.prototype.subset.call(this, t);
          return lr(a) ? new u({
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
    }, u.prototype.set = function() {
      throw new Error("Cannot invoke set on an Immutable Matrix instance");
    }, u.prototype.resize = function() {
      throw new Error("Cannot invoke resize on an Immutable Matrix instance");
    }, u.prototype.reshape = function() {
      throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
    }, u.prototype.clone = function() {
      return new u({
        data: tr(this._data),
        size: tr(this._size),
        datatype: this._datatype
      });
    }, u.prototype.toJSON = function() {
      return {
        mathjs: "ImmutableDenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
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
  }, {
    isClass: true
  }), Ds = "Index", ps = [
    "ImmutableDenseMatrix",
    "getMatrixDataType"
  ], ds = J(Ds, ps, (r) => {
    var { ImmutableDenseMatrix: e, getMatrixDataType: n } = r;
    function u(a) {
      if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
      this._dimensions = [], this._sourceSize = [], this._isScalar = true;
      for (var f = 0, d = arguments.length; f < d; f++) {
        var l = arguments[f], c = vr(l), i = lr(l), s = null;
        if (ln(l)) this._dimensions.push(l), this._isScalar = false;
        else if (c || i) {
          var p = void 0;
          n(l) === "boolean" ? (c && (p = t(Kt(l).valueOf())), i && (p = t(Kt(l._data).valueOf())), s = l.valueOf().length) : p = t(l.valueOf()), this._dimensions.push(p);
          var v = p.size();
          (v.length !== 1 || v[0] !== 1 || s !== null) && (this._isScalar = false);
        } else if (typeof l == "number") this._dimensions.push(t([
          l
        ]));
        else if (typeof l == "string") this._dimensions.push(l);
        else throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
        this._sourceSize.push(s);
      }
    }
    u.prototype.type = "Index", u.prototype.isIndex = true;
    function t(a) {
      for (var f = 0, d = a.length; f < d; f++) if (typeof a[f] != "number" || !fr(a[f])) throw new TypeError("Index parameters must be positive integer numbers");
      return new e(a);
    }
    return u.prototype.clone = function() {
      var a = new u();
      return a._dimensions = tr(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
    }, u.create = function(a) {
      var f = new u();
      return u.apply(f, a), f;
    }, u.prototype.size = function() {
      for (var a = [], f = 0, d = this._dimensions.length; f < d; f++) {
        var l = this._dimensions[f];
        a[f] = typeof l == "string" ? 1 : l.size()[0];
      }
      return a;
    }, u.prototype.max = function() {
      for (var a = [], f = 0, d = this._dimensions.length; f < d; f++) {
        var l = this._dimensions[f];
        a[f] = typeof l == "string" ? l : l.max();
      }
      return a;
    }, u.prototype.min = function() {
      for (var a = [], f = 0, d = this._dimensions.length; f < d; f++) {
        var l = this._dimensions[f];
        a[f] = typeof l == "string" ? l : l.min();
      }
      return a;
    }, u.prototype.forEach = function(a) {
      for (var f = 0, d = this._dimensions.length; f < d; f++) a(this._dimensions[f], f, this);
    }, u.prototype.dimension = function(a) {
      return this._dimensions[a] || null;
    }, u.prototype.isObjectProperty = function() {
      return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
    }, u.prototype.getObjectProperty = function() {
      return this.isObjectProperty() ? this._dimensions[0] : null;
    }, u.prototype.isScalar = function() {
      return this._isScalar;
    }, u.prototype.toArray = function() {
      for (var a = [], f = 0, d = this._dimensions.length; f < d; f++) {
        var l = this._dimensions[f];
        a.push(typeof l == "string" ? l : l.toArray());
      }
      return a;
    }, u.prototype.valueOf = u.prototype.toArray, u.prototype.toString = function() {
      for (var a = [], f = 0, d = this._dimensions.length; f < d; f++) {
        var l = this._dimensions[f];
        typeof l == "string" ? a.push(JSON.stringify(l)) : a.push(l.toString());
      }
      return "[" + a.join(", ") + "]";
    }, u.prototype.toJSON = function() {
      return {
        mathjs: "Index",
        dimensions: this._dimensions
      };
    }, u.fromJSON = function(a) {
      return u.create(a.dimensions);
    }, u;
  }, {
    isClass: true
  });
  function Kt(r) {
    var e = [];
    return r.forEach((n, u) => {
      n && e.push(u);
    }), e;
  }
  var hs = "atan", ms = [
    "typed"
  ], gs = J(hs, ms, (r) => {
    var { typed: e } = r;
    return e("atan", {
      number: function(u) {
        return Math.atan(u);
      },
      Complex: function(u) {
        return u.atan();
      },
      BigNumber: function(u) {
        return u.atan();
      }
    });
  }), qn = J("trigUnit", [
    "typed"
  ], (r) => {
    var { typed: e } = r;
    return {
      Unit: e.referToSelf((n) => (u) => {
        if (!u.hasBase(u.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
        return e.find(n, u.valueType())(u.value);
      })
    };
  }), Ht = "cos", ys = [
    "typed"
  ], As = J(Ht, ys, (r) => {
    var { typed: e } = r, n = qn({
      typed: e
    });
    return e(Ht, {
      number: Math.cos,
      "Complex | BigNumber": (u) => u.cos()
    }, n);
  }), kt = "sin", Fs = [
    "typed"
  ], Es = J(kt, Fs, (r) => {
    var { typed: e } = r, n = qn({
      typed: e
    });
    return e(kt, {
      number: Math.sin,
      "Complex | BigNumber": (u) => u.sin()
    }, n);
  }), jt = "add", Cs = [
    "typed",
    "matrix",
    "addScalar",
    "equalScalar",
    "DenseMatrix",
    "SparseMatrix",
    "concat"
  ], ws = J(jt, Cs, (r) => {
    var { typed: e, matrix: n, addScalar: u, equalScalar: t, DenseMatrix: a, SparseMatrix: f, concat: d } = r, l = Tn({
      typed: e
    }), c = Zi({
      typed: e,
      equalScalar: t
    }), i = zn({
      typed: e,
      DenseMatrix: a
    }), s = Vr({
      typed: e,
      matrix: n,
      concat: d
    });
    return e(jt, {
      "any, any": u,
      "any, any, ...any": e.referToSelf((p) => (v, D, o) => {
        for (var h = p(v, D), g = 0; g < o.length; g++) h = p(h, o[g]);
        return h;
      })
    }, s({
      elop: u,
      DS: l,
      SS: c,
      Ss: i
    }));
  }), rn = "norm", bs = [
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
  ], Bs = J(rn, bs, (r) => {
    var { typed: e, abs: n, add: u, pow: t, conj: a, sqrt: f, multiply: d, equalScalar: l, larger: c, smaller: i, matrix: s, ctranspose: p, eigs: v } = r;
    return e(rn, {
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
        return A(s(E), 2);
      },
      Matrix: function(E) {
        return A(E, 2);
      },
      "Array, number | BigNumber | string": function(E, m) {
        return A(s(E), m);
      },
      "Matrix, number | BigNumber | string": function(E, m) {
        return A(E, m);
      }
    });
    function D(w) {
      var E = 0;
      return w.forEach(function(m) {
        var B = n(m);
        c(B, E) && (E = B);
      }, true), E;
    }
    function o(w) {
      var E;
      return w.forEach(function(m) {
        var B = n(m);
        (!E || i(B, E)) && (E = B);
      }, true), E || 0;
    }
    function h(w, E) {
      if (E === Number.POSITIVE_INFINITY || E === "inf") return D(w);
      if (E === Number.NEGATIVE_INFINITY || E === "-inf") return o(w);
      if (E === "fro") return A(w, 2);
      if (typeof E == "number" && !isNaN(E)) {
        if (!l(E, 0)) {
          var m = 0;
          return w.forEach(function(B) {
            m = u(t(n(B), E), m);
          }, true), t(m, 1 / E);
        }
        return Number.POSITIVE_INFINITY;
      }
      throw new Error("Unsupported parameter value");
    }
    function g(w) {
      var E = 0;
      return w.forEach(function(m, B) {
        E = u(E, d(m, a(m)));
      }), n(f(E));
    }
    function C(w) {
      var E = [], m = 0;
      return w.forEach(function(B, _) {
        var x = _[1], N = u(E[x] || 0, n(B));
        c(N, m) && (m = N), E[x] = N;
      }, true), m;
    }
    function y(w) {
      var E = w.size();
      if (E[0] !== E[1]) throw new RangeError("Invalid matrix dimensions");
      var m = p(w), B = d(m, w), _ = v(B).values.toArray(), x = _[_.length - 1];
      return n(f(x));
    }
    function b(w) {
      var E = [], m = 0;
      return w.forEach(function(B, _) {
        var x = _[0], N = u(E[x] || 0, n(B));
        c(N, m) && (m = N), E[x] = N;
      }, true), m;
    }
    function F(w, E) {
      if (E === 1) return C(w);
      if (E === Number.POSITIVE_INFINITY || E === "inf") return b(w);
      if (E === "fro") return g(w);
      if (E === 2) return y(w);
      throw new Error("Unsupported parameter value " + E);
    }
    function A(w, E) {
      var m = w.size();
      if (m.length === 1) return h(w, E);
      if (m.length === 2) {
        if (m[0] && m[1]) return F(w, E);
        throw new RangeError("Invalid matrix dimensions");
      }
    }
  }), en = "dot", _s = [
    "typed",
    "addScalar",
    "multiplyScalar",
    "conj",
    "size"
  ], xs = J(en, _s, (r) => {
    var { typed: e, addScalar: n, multiplyScalar: u, conj: t, size: a } = r;
    return e(en, {
      "Array | DenseMatrix, Array | DenseMatrix": d,
      "SparseMatrix, SparseMatrix": l
    });
    function f(i, s) {
      var p = c(i), v = c(s), D, o;
      if (p.length === 1) D = p[0];
      else if (p.length === 2 && p[1] === 1) D = p[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
      if (v.length === 1) o = v[0];
      else if (v.length === 2 && v[1] === 1) o = v[0];
      else throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
      if (D !== o) throw new RangeError("Vectors must have equal length (" + D + " != " + o + ")");
      if (D === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
      return D;
    }
    function d(i, s) {
      var p = f(i, s), v = lr(i) ? i._data : i, D = lr(i) ? i._datatype || i.getDataType() : void 0, o = lr(s) ? s._data : s, h = lr(s) ? s._datatype || s.getDataType() : void 0, g = c(i).length === 2, C = c(s).length === 2, y = n, b = u;
      if (D && h && D === h && typeof D == "string" && D !== "mixed") {
        var F = D;
        y = e.find(n, [
          F,
          F
        ]), b = e.find(u, [
          F,
          F
        ]);
      }
      if (!g && !C) {
        for (var A = b(t(v[0]), o[0]), w = 1; w < p; w++) A = y(A, b(t(v[w]), o[w]));
        return A;
      }
      if (!g && C) {
        for (var E = b(t(v[0]), o[0][0]), m = 1; m < p; m++) E = y(E, b(t(v[m]), o[m][0]));
        return E;
      }
      if (g && !C) {
        for (var B = b(t(v[0][0]), o[0]), _ = 1; _ < p; _++) B = y(B, b(t(v[_][0]), o[_]));
        return B;
      }
      if (g && C) {
        for (var x = b(t(v[0][0]), o[0][0]), N = 1; N < p; N++) x = y(x, b(t(v[N][0]), o[N][0]));
        return x;
      }
    }
    function l(i, s) {
      f(i, s);
      for (var p = i._index, v = i._values, D = s._index, o = s._values, h = 0, g = n, C = u, y = 0, b = 0; y < p.length && b < D.length; ) {
        var F = p[y], A = D[b];
        if (F < A) {
          y++;
          continue;
        }
        if (F > A) {
          b++;
          continue;
        }
        F === A && (h = g(h, C(v[y], o[b])), y++, b++);
      }
      return h;
    }
    function c(i) {
      return lr(i) ? i.size() : a(i);
    }
  }), tn = "qr", Ss = [
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
  ], Ms = J(tn, Ss, (r) => {
    var { typed: e, matrix: n, zeros: u, identity: t, isZero: a, equal: f, sign: d, sqrt: l, conj: c, unaryMinus: i, addScalar: s, divideScalar: p, multiplyScalar: v, subtractScalar: D, complex: o } = r;
    return Fe(e(tn, {
      DenseMatrix: function(b) {
        return g(b);
      },
      SparseMatrix: function(b) {
        return C();
      },
      Array: function(b) {
        var F = n(b), A = g(F);
        return {
          Q: A.Q.valueOf(),
          R: A.R.valueOf()
        };
      }
    }), {
      _denseQRimpl: h
    });
    function h(y) {
      var b = y._size[0], F = y._size[1], A = t([
        b
      ], "dense"), w = A._data, E = y.clone(), m = E._data, B, _, x, N = u([
        b
      ], "");
      for (x = 0; x < Math.min(F, b); ++x) {
        var S = m[x][x], O = i(f(S, 0) ? 1 : d(S)), M = c(O), R = 0;
        for (B = x; B < b; B++) R = s(R, v(m[B][x], c(m[B][x])));
        var T = v(O, l(R));
        if (!a(T)) {
          var $ = D(S, T);
          for (N[x] = 1, B = x + 1; B < b; B++) N[B] = p(m[B][x], $);
          var Q = i(c(p($, T))), X = void 0;
          for (_ = x; _ < F; _++) {
            for (X = 0, B = x; B < b; B++) X = s(X, v(c(N[B]), m[B][_]));
            for (X = v(X, Q), B = x; B < b; B++) m[B][_] = v(D(m[B][_], v(N[B], X)), M);
          }
          for (B = 0; B < b; B++) {
            for (X = 0, _ = x; _ < b; _++) X = s(X, v(w[B][_], N[_]));
            for (X = v(X, Q), _ = x; _ < b; ++_) w[B][_] = p(D(w[B][_], v(X, c(N[_]))), M);
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
    function g(y) {
      var b = h(y), F = b.R._data;
      if (y._data.length > 0) for (var A = F[0][0].type === "Complex" ? o(0) : 0, w = 0; w < F.length; ++w) for (var E = 0; E < w && E < (F[0] || []).length; ++E) F[w][E] = A;
      return b;
    }
    function C(y) {
      throw new Error("qr not implemented for sparse matrices yet");
    }
  }), nn = "det", Ns = [
    "typed",
    "matrix",
    "subtractScalar",
    "multiply",
    "divideScalar",
    "isZero",
    "unaryMinus"
  ], Ts = J(nn, Ns, (r) => {
    var { typed: e, matrix: n, subtractScalar: u, multiply: t, divideScalar: a, isZero: f, unaryMinus: d } = r;
    return e(nn, {
      any: function(i) {
        return tr(i);
      },
      "Array | Matrix": function(i) {
        var s;
        switch (lr(i) ? s = i.size() : Array.isArray(i) ? (i = n(i), s = i.size()) : s = [], s.length) {
          case 0:
            return tr(i);
          case 1:
            if (s[0] === 1) return tr(i.valueOf()[0]);
            if (s[0] === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Dr(s) + ")");
          case 2: {
            var p = s[0], v = s[1];
            if (p === v) return l(i.clone().valueOf(), p);
            if (v === 0) return 1;
            throw new RangeError("Matrix must be square (size: " + Dr(s) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Dr(s) + ")");
        }
      }
    });
    function l(c, i, s) {
      if (i === 1) return tr(c[0][0]);
      if (i === 2) return u(t(c[0][0], c[1][1]), t(c[1][0], c[0][1]));
      for (var p = false, v = new Array(i).fill(0).map((w, E) => E), D = 0; D < i; D++) {
        var o = v[D];
        if (f(c[o][D])) {
          var h = void 0;
          for (h = D + 1; h < i; h++) if (!f(c[v[h]][D])) {
            o = v[h], v[h] = v[D], v[D] = o, p = !p;
            break;
          }
          if (h === i) return c[o][D];
        }
        for (var g = c[o][D], C = D === 0 ? 1 : c[v[D - 1]][D - 1], y = D + 1; y < i; y++) for (var b = v[y], F = D + 1; F < i; F++) c[b][F] = a(u(t(c[b][F], g), t(c[b][D], c[o][F])), C);
      }
      var A = c[v[i - 1]][i - 1];
      return p ? d(A) : A;
    }
  }), un = "inv", zs = [
    "typed",
    "matrix",
    "divideScalar",
    "addScalar",
    "multiply",
    "unaryMinus",
    "det",
    "identity",
    "abs"
  ], Os = J(un, zs, (r) => {
    var { typed: e, matrix: n, divideScalar: u, addScalar: t, multiply: a, unaryMinus: f, det: d, identity: l, abs: c } = r;
    return e(un, {
      "Array | Matrix": function(p) {
        var v = lr(p) ? p.size() : mr(p);
        switch (v.length) {
          case 1:
            if (v[0] === 1) return lr(p) ? n([
              u(1, p.valueOf()[0])
            ]) : [
              u(1, p[0])
            ];
            throw new RangeError("Matrix must be square (size: " + Dr(v) + ")");
          case 2: {
            var D = v[0], o = v[1];
            if (D === o) return lr(p) ? n(i(p.valueOf(), D, o), p.storage()) : i(p, D, o);
            throw new RangeError("Matrix must be square (size: " + Dr(v) + ")");
          }
          default:
            throw new RangeError("Matrix must be two dimensional (size: " + Dr(v) + ")");
        }
      },
      any: function(p) {
        return u(1, p);
      }
    });
    function i(s, p, v) {
      var D, o, h, g, C;
      if (p === 1) {
        if (g = s[0][0], g === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            u(1, g)
          ]
        ];
      } else if (p === 2) {
        var y = d(s);
        if (y === 0) throw Error("Cannot calculate inverse, determinant is zero");
        return [
          [
            u(s[1][1], y),
            u(f(s[0][1]), y)
          ],
          [
            u(f(s[1][0]), y),
            u(s[0][0], y)
          ]
        ];
      } else {
        var b = s.concat();
        for (D = 0; D < p; D++) b[D] = b[D].concat();
        for (var F = l(p).valueOf(), A = 0; A < v; A++) {
          var w = c(b[A][A]), E = A;
          for (D = A + 1; D < p; ) c(b[D][A]) > w && (w = c(b[D][A]), E = D), D++;
          if (w === 0) throw Error("Cannot calculate inverse, determinant is zero");
          D = E, D !== A && (C = b[A], b[A] = b[D], b[D] = C, C = F[A], F[A] = F[D], F[D] = C);
          var m = b[A], B = F[A];
          for (D = 0; D < p; D++) {
            var _ = b[D], x = F[D];
            if (D !== A) {
              if (_[A] !== 0) {
                for (h = u(f(_[A]), m[A]), o = A; o < v; o++) _[o] = t(_[o], a(h, m[o]));
                for (o = 0; o < v; o++) x[o] = t(x[o], a(h, B[o]));
              }
            } else {
              for (h = m[A], o = A; o < v; o++) _[o] = u(_[o], h);
              for (o = 0; o < v; o++) x[o] = u(x[o], h);
            }
          }
        }
        return F;
      }
    }
  });
  function $s(r) {
    var { addScalar: e, subtract: n, flatten: u, multiply: t, multiplyScalar: a, divideScalar: f, sqrt: d, abs: l, bignumber: c, diag: i, size: s, reshape: p, inv: v, qr: D, usolve: o, usolveAll: h, equal: g, complex: C, larger: y, smaller: b, matrixFromColumns: F, dot: A } = r;
    function w(z, I, W, G) {
      var L = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, q = E(z, I, W, G, L);
      m(z, I, W, G, L, q);
      var { values: Z, C: P } = B(z, I, W, G, L);
      if (L) {
        var U = _(z, I, P, q, Z, W, G);
        return {
          values: Z,
          eigenvectors: U
        };
      }
      return {
        values: Z
      };
    }
    function E(z, I, W, G, L) {
      var q = G === "BigNumber", Z = G === "Complex", P = q ? c(0) : 0, U = q ? c(1) : Z ? C(1) : 1, Y = q ? c(1) : 1, V = q ? c(10) : 2, k = a(V, V), j;
      L && (j = Array(I).fill(U));
      for (var rr = false; !rr; ) {
        rr = true;
        for (var er = 0; er < I; er++) {
          for (var ur = P, ar = P, pr = 0; pr < I; pr++) er !== pr && (ur = e(ur, l(z[pr][er])), ar = e(ar, l(z[er][pr])));
          if (!g(ur, 0) && !g(ar, 0)) {
            for (var ir = Y, sr = ur, Br = f(ar, V), _r = a(ar, V); b(sr, Br); ) sr = a(sr, k), ir = a(ir, V);
            for (; y(sr, _r); ) sr = f(sr, k), ir = f(ir, V);
            var Ar = b(f(e(sr, ar), ir), a(e(ur, ar), 0.95));
            if (Ar) {
              rr = false;
              for (var Rr = f(1, ir), Sr = 0; Sr < I; Sr++) er !== Sr && (z[er][Sr] = a(z[er][Sr], Rr), z[Sr][er] = a(z[Sr][er], ir));
              L && (j[er] = a(j[er], Rr));
            }
          }
        }
      }
      return L ? i(j) : null;
    }
    function m(z, I, W, G, L, q) {
      var Z = G === "BigNumber", P = G === "Complex", U = Z ? c(0) : P ? C(0) : 0;
      Z && (W = c(W));
      for (var Y = 0; Y < I - 2; Y++) {
        for (var V = 0, k = U, j = Y + 1; j < I; j++) {
          var rr = z[j][Y];
          b(l(k), l(rr)) && (k = rr, V = j);
        }
        if (!b(l(k), W)) {
          if (V !== Y + 1) {
            var er = z[V];
            z[V] = z[Y + 1], z[Y + 1] = er;
            for (var ur = 0; ur < I; ur++) {
              var ar = z[ur][V];
              z[ur][V] = z[ur][Y + 1], z[ur][Y + 1] = ar;
            }
            if (L) {
              var pr = q[V];
              q[V] = q[Y + 1], q[Y + 1] = pr;
            }
          }
          for (var ir = Y + 2; ir < I; ir++) {
            var sr = f(z[ir][Y], k);
            if (sr !== 0) {
              for (var Br = 0; Br < I; Br++) z[ir][Br] = n(z[ir][Br], a(sr, z[Y + 1][Br]));
              for (var _r = 0; _r < I; _r++) z[_r][Y + 1] = e(z[_r][Y + 1], a(sr, z[_r][ir]));
              if (L) for (var Ar = 0; Ar < I; Ar++) q[ir][Ar] = n(q[ir][Ar], a(sr, q[Y + 1][Ar]));
            }
          }
        }
      }
      return q;
    }
    function B(z, I, W, G, L) {
      var q = G === "BigNumber", Z = G === "Complex", P = q ? c(1) : Z ? C(1) : 1;
      q && (W = c(W));
      for (var U = tr(z), Y = [], V = I, k = [], j = L ? i(Array(I).fill(P)) : void 0, rr = L ? i(Array(V).fill(P)) : void 0, er = 0; er <= 100; ) {
        er += 1;
        for (var ur = U[V - 1][V - 1], ar = 0; ar < V; ar++) U[ar][ar] = n(U[ar][ar], ur);
        var { Q: pr, R: ir } = D(U);
        U = t(ir, pr);
        for (var sr = 0; sr < V; sr++) U[sr][sr] = e(U[sr][sr], ur);
        if (L && (rr = t(rr, pr)), V === 1 || b(l(U[V - 1][V - 2]), W)) {
          er = 0, Y.push(U[V - 1][V - 1]), L && (k.unshift([
            [
              1
            ]
          ]), S(rr, I), j = t(j, rr), V > 1 && (rr = i(Array(V - 1).fill(P)))), V -= 1, U.pop();
          for (var Br = 0; Br < V; Br++) U[Br].pop();
        } else if (V === 2 || b(l(U[V - 2][V - 3]), W)) {
          er = 0;
          var _r = x(U[V - 2][V - 2], U[V - 2][V - 1], U[V - 1][V - 2], U[V - 1][V - 1]);
          Y.push(..._r), L && (k.unshift(N(U[V - 2][V - 2], U[V - 2][V - 1], U[V - 1][V - 2], U[V - 1][V - 1], _r[0], _r[1], W, G)), S(rr, I), j = t(j, rr), V > 2 && (rr = i(Array(V - 2).fill(P)))), V -= 2, U.pop(), U.pop();
          for (var Ar = 0; Ar < V; Ar++) U[Ar].pop(), U[Ar].pop();
        }
        if (V === 0) break;
      }
      if (Y.sort((ne, Tr) => +n(l(ne), l(Tr))), er > 100) {
        var Rr = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + Y.join(", "));
        throw Rr.values = Y, Rr.vectors = [], Rr;
      }
      var Sr = L ? t(j, O(k, I)) : void 0;
      return {
        values: Y,
        C: Sr
      };
    }
    function _(z, I, W, G, L, q, Z) {
      var P = v(W), U = t(P, z, W), Y = Z === "BigNumber", V = Z === "Complex", k = Y ? c(0) : V ? C(0) : 0, j = Y ? c(1) : V ? C(1) : 1, rr = [], er = [];
      for (var ur of L) {
        var ar = M(rr, ur, g);
        ar === -1 ? (rr.push(ur), er.push(1)) : er[ar] += 1;
      }
      for (var pr = [], ir = rr.length, sr = Array(I).fill(k), Br = i(Array(I).fill(j)), _r = function() {
        var Sr = rr[Ar], ne = n(U, t(Sr, Br)), Tr = h(ne, sr);
        for (Tr.shift(); Tr.length < er[Ar]; ) {
          var ot = R(ne, I, Tr, q, Z);
          if (ot === null) break;
          Tr.push(ot);
        }
        var Xn = t(v(G), W);
        Tr = Tr.map((Ne) => t(Xn, Ne)), pr.push(...Tr.map((Ne) => ({
          value: Sr,
          vector: u(Ne)
        })));
      }, Ar = 0; Ar < ir; Ar++) _r();
      return pr;
    }
    function x(z, I, W, G) {
      var L = e(z, G), q = n(a(z, G), a(I, W)), Z = a(L, 0.5), P = a(d(n(a(L, L), a(4, q))), 0.5);
      return [
        e(Z, P),
        n(Z, P)
      ];
    }
    function N(z, I, W, G, L, q, Z, P) {
      var U = P === "BigNumber", Y = P === "Complex", V = U ? c(0) : Y ? C(0) : 0, k = U ? c(1) : Y ? C(1) : 1;
      if (b(l(W), Z)) return [
        [
          k,
          V
        ],
        [
          V,
          k
        ]
      ];
      if (y(l(n(L, q)), Z)) return [
        [
          n(L, G),
          n(q, G)
        ],
        [
          W,
          W
        ]
      ];
      var j = n(z, L), rr = n(G, L);
      return b(l(I), Z) && b(l(rr), Z) ? [
        [
          j,
          k
        ],
        [
          W,
          V
        ]
      ] : [
        [
          I,
          V
        ],
        [
          rr,
          k
        ]
      ];
    }
    function S(z, I) {
      for (var W = 0; W < z.length; W++) z[W].push(...Array(I - z[W].length).fill(0));
      for (var G = z.length; G < I; G++) z.push(Array(I).fill(0)), z[G][G] = 1;
      return z;
    }
    function O(z, I) {
      for (var W = [], G = 0; G < I; G++) W[G] = Array(I).fill(0);
      var L = 0;
      for (var q of z) {
        for (var Z = q.length, P = 0; P < Z; P++) for (var U = 0; U < Z; U++) W[L + P][L + U] = q[P][U];
        L += Z;
      }
      return W;
    }
    function M(z, I, W) {
      for (var G = 0; G < z.length; G++) if (W(z[G], I)) return G;
      return -1;
    }
    function R(z, I, W, G, L) {
      for (var q = L === "BigNumber" ? c(1e3) : 1e3, Z, P = 0; P < 5; ++P) {
        Z = T(I, W, L);
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
        if (b(Q($(Z, [
          U
        ])), G)) break;
        if (++P >= 10) return null;
        Z = X(U);
      }
      return Z;
    }
    function T(z, I, W) {
      var G = W === "BigNumber", L = W === "Complex", q = Array(z).fill(0).map((Z) => 2 * Math.random() - 1);
      return G && (q = q.map((Z) => c(Z))), L && (q = q.map((Z) => C(Z))), q = $(q, I), X(q, W);
    }
    function $(z, I) {
      var W = s(z);
      for (var G of I) G = p(G, W), z = n(z, t(f(A(G, z), A(G, G)), G));
      return z;
    }
    function Q(z) {
      return l(d(A(z, z)));
    }
    function X(z, I) {
      var W = I === "BigNumber", G = I === "Complex", L = W ? c(1) : G ? C(1) : 1;
      return t(f(L, Q(z)), z);
    }
    return w;
  }
  function Is(r) {
    var { config: e, addScalar: n, subtract: u, abs: t, atan: a, cos: f, sin: d, multiplyScalar: l, inv: c, bignumber: i, multiply: s, add: p } = r;
    function v(m, B) {
      var _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.relTol, x = arguments.length > 3 ? arguments[3] : void 0, N = arguments.length > 4 ? arguments[4] : void 0;
      if (x === "number") return D(m, _, N);
      if (x === "BigNumber") return o(m, _, N);
      throw TypeError("Unsupported data type: " + x);
    }
    function D(m, B, _) {
      var x = m.length, N = Math.abs(B / x), S, O;
      if (_) {
        O = new Array(x);
        for (var M = 0; M < x; M++) O[M] = Array(x).fill(0), O[M][M] = 1;
      }
      for (var R = A(m); Math.abs(R[1]) >= Math.abs(N); ) {
        var T = R[0][0], $ = R[0][1];
        S = h(m[T][T], m[$][$], m[T][$]), m = F(m, S, T, $), _ && (O = C(O, S, T, $)), R = A(m);
      }
      for (var Q = Array(x).fill(0), X = 0; X < x; X++) Q[X] = m[X][X];
      return E(tr(Q), O, _);
    }
    function o(m, B, _) {
      var x = m.length, N = t(B / x), S, O;
      if (_) {
        O = new Array(x);
        for (var M = 0; M < x; M++) O[M] = Array(x).fill(0), O[M][M] = 1;
      }
      for (var R = w(m); t(R[1]) >= t(N); ) {
        var T = R[0][0], $ = R[0][1];
        S = g(m[T][T], m[$][$], m[T][$]), m = b(m, S, T, $), _ && (O = y(O, S, T, $)), R = w(m);
      }
      for (var Q = Array(x).fill(0), X = 0; X < x; X++) Q[X] = m[X][X];
      return E(tr(Q), O, _);
    }
    function h(m, B, _) {
      var x = B - m;
      return Math.abs(x) <= e.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * _ / (B - m));
    }
    function g(m, B, _) {
      var x = u(B, m);
      return t(x) <= e.relTol ? i(-1).acos().div(4) : l(0.5, a(s(2, _, c(x))));
    }
    function C(m, B, _, x) {
      for (var N = m.length, S = Math.cos(B), O = Math.sin(B), M = Array(N).fill(0), R = Array(N).fill(0), T = 0; T < N; T++) M[T] = S * m[T][_] - O * m[T][x], R[T] = O * m[T][_] + S * m[T][x];
      for (var $ = 0; $ < N; $++) m[$][_] = M[$], m[$][x] = R[$];
      return m;
    }
    function y(m, B, _, x) {
      for (var N = m.length, S = f(B), O = d(B), M = Array(N).fill(i(0)), R = Array(N).fill(i(0)), T = 0; T < N; T++) M[T] = u(l(S, m[T][_]), l(O, m[T][x])), R[T] = n(l(O, m[T][_]), l(S, m[T][x]));
      for (var $ = 0; $ < N; $++) m[$][_] = M[$], m[$][x] = R[$];
      return m;
    }
    function b(m, B, _, x) {
      for (var N = m.length, S = i(f(B)), O = i(d(B)), M = l(S, S), R = l(O, O), T = Array(N).fill(i(0)), $ = Array(N).fill(i(0)), Q = s(i(2), S, O, m[_][x]), X = n(u(l(M, m[_][_]), Q), l(R, m[x][x])), z = p(l(R, m[_][_]), Q, l(M, m[x][x])), I = 0; I < N; I++) T[I] = u(l(S, m[_][I]), l(O, m[x][I])), $[I] = n(l(O, m[_][I]), l(S, m[x][I]));
      m[_][_] = X, m[x][x] = z, m[_][x] = i(0), m[x][_] = i(0);
      for (var W = 0; W < N; W++) W !== _ && W !== x && (m[_][W] = T[W], m[W][_] = T[W], m[x][W] = $[W], m[W][x] = $[W]);
      return m;
    }
    function F(m, B, _, x) {
      for (var N = m.length, S = Math.cos(B), O = Math.sin(B), M = S * S, R = O * O, T = Array(N).fill(0), $ = Array(N).fill(0), Q = M * m[_][_] - 2 * S * O * m[_][x] + R * m[x][x], X = R * m[_][_] + 2 * S * O * m[_][x] + M * m[x][x], z = 0; z < N; z++) T[z] = S * m[_][z] - O * m[x][z], $[z] = O * m[_][z] + S * m[x][z];
      m[_][_] = Q, m[x][x] = X, m[_][x] = 0, m[x][_] = 0;
      for (var I = 0; I < N; I++) I !== _ && I !== x && (m[_][I] = T[I], m[I][_] = T[I], m[x][I] = $[I], m[I][x] = $[I]);
      return m;
    }
    function A(m) {
      for (var B = m.length, _ = 0, x = [
        0,
        1
      ], N = 0; N < B; N++) for (var S = N + 1; S < B; S++) Math.abs(_) < Math.abs(m[N][S]) && (_ = Math.abs(m[N][S]), x = [
        N,
        S
      ]);
      return [
        x,
        _
      ];
    }
    function w(m) {
      for (var B = m.length, _ = 0, x = [
        0,
        1
      ], N = 0; N < B; N++) for (var S = N + 1; S < B; S++) t(_) < t(m[N][S]) && (_ = t(m[N][S]), x = [
        N,
        S
      ]);
      return [
        x,
        _
      ];
    }
    function E(m, B, _) {
      var x = m.length, N = Array(x), S;
      if (_) {
        S = Array(x);
        for (var O = 0; O < x; O++) S[O] = Array(x);
      }
      for (var M = 0; M < x; M++) {
        for (var R = 0, T = m[0], $ = 0; $ < m.length; $++) t(m[$]) < t(T) && (R = $, T = m[R]);
        if (N[M] = m.splice(R, 1)[0], _) for (var Q = 0; Q < x; Q++) S[M][Q] = B[Q][R], B[Q].splice(R, 1);
      }
      if (!_) return {
        values: N
      };
      var X = S.map((z, I) => ({
        value: N[I],
        vector: z
      }));
      return {
        values: N,
        eigenvectors: X
      };
    }
    return v;
  }
  var qs = "eigs", Rs = [
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
  ], Us = J(qs, Rs, (r) => {
    var { config: e, typed: n, matrix: u, addScalar: t, subtract: a, equal: f, abs: d, atan: l, cos: c, sin: i, multiplyScalar: s, divideScalar: p, inv: v, bignumber: D, multiply: o, add: h, larger: g, column: C, flatten: y, number: b, complex: F, sqrt: A, diag: w, size: E, reshape: m, qr: B, usolve: _, usolveAll: x, im: N, re: S, smaller: O, matrixFromColumns: M, dot: R } = r, T = Is({
      config: e,
      addScalar: t,
      subtract: a,
      abs: d,
      atan: l,
      cos: c,
      sin: i,
      multiplyScalar: s,
      inv: v,
      bignumber: D,
      multiply: o,
      add: h
    }), $ = $s({
      addScalar: t,
      subtract: a,
      multiply: o,
      multiplyScalar: s,
      flatten: y,
      divideScalar: p,
      sqrt: A,
      abs: d,
      bignumber: D,
      diag: w,
      size: E,
      reshape: m,
      qr: B,
      inv: v,
      usolve: _,
      usolveAll: x,
      equal: f,
      complex: F,
      larger: g,
      smaller: O,
      matrixFromColumns: M,
      dot: R
    });
    return n("eigs", {
      Array: function(q) {
        return Q(u(q));
      },
      "Array, number|BigNumber": function(q, Z) {
        return Q(u(q), {
          precision: Z
        });
      },
      "Array, Object"(L, q) {
        return Q(u(L), q);
      },
      Matrix: function(q) {
        return Q(q, {
          matricize: true
        });
      },
      "Matrix, number|BigNumber": function(q, Z) {
        return Q(q, {
          precision: Z,
          matricize: true
        });
      },
      "Matrix, Object": function(q, Z) {
        var P = {
          matricize: true
        };
        return Fe(P, Z), Q(q, P);
      }
    });
    function Q(L) {
      var q, Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, P = "eigenvectors" in Z ? Z.eigenvectors : true, U = (q = Z.precision) !== null && q !== void 0 ? q : e.relTol, Y = X(L, U, P);
      return Z.matricize && (Y.values = u(Y.values), P && (Y.eigenvectors = Y.eigenvectors.map((V) => {
        var { value: k, vector: j } = V;
        return {
          value: k,
          vector: u(j)
        };
      }))), P && Object.defineProperty(Y, "vectors", {
        enumerable: false,
        get: () => {
          throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
        }
      }), Y;
    }
    function X(L, q, Z) {
      var P = L.toArray(), U = L.size();
      if (U.length !== 2 || U[0] !== U[1]) throw new RangeError("Matrix must be square (size: ".concat(Dr(U), ")"));
      var Y = U[0];
      if (I(P, Y, q) && (W(P, Y), z(P, Y, q))) {
        var V = G(L, P, Y);
        return T(P, Y, q, V, Z);
      }
      var k = G(L, P, Y);
      return $(P, Y, q, k, Z);
    }
    function z(L, q, Z) {
      for (var P = 0; P < q; P++) for (var U = P; U < q; U++) if (g(D(d(a(L[P][U], L[U][P]))), Z)) return false;
      return true;
    }
    function I(L, q, Z) {
      for (var P = 0; P < q; P++) for (var U = 0; U < q; U++) if (g(D(d(N(L[P][U]))), Z)) return false;
      return true;
    }
    function W(L, q) {
      for (var Z = 0; Z < q; Z++) for (var P = 0; P < q; P++) L[Z][P] = S(L[Z][P]);
    }
    function G(L, q, Z) {
      var P = L.datatype();
      if (P === "number" || P === "BigNumber" || P === "Complex") return P;
      for (var U = false, Y = false, V = false, k = 0; k < Z; k++) for (var j = 0; j < Z; j++) {
        var rr = q[k][j];
        if (or(rr) || Ze(rr)) U = true;
        else if (gr(rr)) Y = true;
        else if (Le(rr)) V = true;
        else throw TypeError("Unsupported type in Matrix: " + Nr(rr));
      }
      if (Y && V && console.warn("Complex BigNumbers not supported, this operation will lose precission."), V) {
        for (var er = 0; er < Z; er++) for (var ur = 0; ur < Z; ur++) q[er][ur] = F(q[er][ur]);
        return "Complex";
      }
      if (Y) {
        for (var ar = 0; ar < Z; ar++) for (var pr = 0; pr < Z; pr++) q[ar][pr] = D(q[ar][pr]);
        return "BigNumber";
      }
      if (U) {
        for (var ir = 0; ir < Z; ir++) for (var sr = 0; sr < Z; sr++) q[ir][sr] = b(q[ir][sr]);
        return "number";
      } else throw TypeError("Matrix contains unsupported types only.");
    }
  }), re = sa({
    config: Cr
  }), Be = ca({}), Ke = ya({}), He = Ea({}), br = $a({
    Matrix: He
  }), H = ua({
    BigNumber: re,
    Complex: Be,
    DenseMatrix: br,
    Fraction: Ke
  }), ke = hi({
    typed: H
  }), Xr = gi({
    typed: H
  }), Ps = gs({
    typed: H
  }), je = ai({
    Complex: Be,
    typed: H
  }), _e = oo({
    typed: H
  }), Vs = As({
    typed: H
  }), Ir = Wa({
    config: Cr,
    typed: H
  }), Rn = Ao({
    typed: H
  }), Ls = Eo({
    typed: H
  }), Zs = fo({
    typed: H
  }), Un = qa({
    typed: H
  }), Js = Pa({
    config: Cr,
    typed: H
  }), Pn = La({
    equalScalar: Ir,
    typed: H
  }), Yr = Xi({
    typed: H
  }), rt = ja({
    typed: H
  }), Ws = co({
    typed: H
  }), Qs = ki({
    BigNumber: re,
    Fraction: Ke,
    complex: je,
    typed: H
  }), Gs = Es({
    typed: H
  }), xe = Xa({
    Matrix: He,
    equalScalar: Ir,
    typed: H
  }), ee = Ai({
    typed: H
  }), et = ti({
    BigNumber: re,
    typed: H
  }), tt = eo({
    Complex: Be,
    config: Cr,
    typed: H
  }), Se = pi({
    typed: H
  }), Vn = si({
    Fraction: Ke,
    typed: H
  }), cr = li({
    DenseMatrix: br,
    Matrix: He,
    SparseMatrix: xe,
    typed: H
  }), Xs = Po({
    bignumber: et,
    fraction: Vn,
    number: rt
  }), Ys = So({
    isInteger: Un,
    matrix: cr,
    typed: H
  }), nt = No({
    matrix: cr,
    config: Cr,
    typed: H
  }), Ks = zo({
    matrix: cr,
    typed: H
  }), Hs = qo({
    BigNumber: re,
    config: Cr,
    matrix: cr,
    typed: H
  }), Lr = Do({
    isInteger: Un,
    matrix: cr,
    typed: H
  }), ks = $o({
    conj: _e,
    transpose: Ks,
    typed: H
  }), js = go({
    DenseMatrix: br,
    SparseMatrix: xe,
    matrix: cr,
    typed: H
  }), Kr = Lo({
    numeric: Xs,
    typed: H
  }), Ln = Ko({
    DenseMatrix: br,
    concat: Lr,
    equalScalar: Ir,
    matrix: cr,
    typed: H
  }), ut = wo({
    BigNumber: re,
    DenseMatrix: br,
    SparseMatrix: xe,
    config: Cr,
    matrix: cr,
    typed: H
  }), rf = ss({
    DenseMatrix: br,
    concat: Lr,
    config: Cr,
    matrix: cr,
    typed: H
  }), ef = vi({
    flatten: Rn,
    matrix: cr,
    size: nt,
    typed: H
  }), tf = Ms({
    addScalar: Xr,
    complex: je,
    conj: _e,
    divideScalar: Kr,
    equal: Ln,
    identity: ut,
    isZero: Pn,
    matrix: cr,
    multiplyScalar: Yr,
    sign: Qs,
    sqrt: tt,
    subtractScalar: ee,
    typed: H,
    unaryMinus: Se,
    zeros: Hs
  }), Me = jo({
    DenseMatrix: br,
    concat: Lr,
    config: Cr,
    matrix: cr,
    typed: H
  }), Zn = no({
    DenseMatrix: br,
    concat: Lr,
    equalScalar: Ir,
    matrix: cr,
    subtractScalar: ee,
    typed: H,
    unaryMinus: Se
  }), nf = Qo({
    DenseMatrix: br,
    divideScalar: Kr,
    equalScalar: Ir,
    matrix: cr,
    multiplyScalar: Yr,
    subtractScalar: ee,
    typed: H
  }), at = ws({
    DenseMatrix: br,
    SparseMatrix: xe,
    addScalar: Xr,
    concat: Lr,
    equalScalar: Ir,
    matrix: cr,
    typed: H
  }), Jn = xs({
    addScalar: Xr,
    conj: _e,
    multiplyScalar: Yr,
    size: nt,
    typed: H
  }), uf = vs({
    DenseMatrix: br,
    smaller: Me
  }), af = ds({
    ImmutableDenseMatrix: uf,
    getMatrixDataType: Ls
  }), it = as({
    DenseMatrix: br,
    concat: Lr,
    config: Cr,
    matrix: cr,
    typed: H
  }), te = Ki({
    addScalar: Xr,
    dot: Jn,
    equalScalar: Ir,
    matrix: cr,
    multiplyScalar: Yr,
    typed: H
  }), of = Xo({
    DenseMatrix: br,
    divideScalar: Kr,
    equalScalar: Ir,
    matrix: cr,
    multiplyScalar: Yr,
    subtractScalar: ee,
    typed: H
  }), sf = Ts({
    divideScalar: Kr,
    isZero: Pn,
    matrix: cr,
    multiply: te,
    subtractScalar: ee,
    typed: H,
    unaryMinus: Se
  }), ff = ts({
    DenseMatrix: br,
    concat: Lr,
    config: Cr,
    matrix: cr,
    typed: H
  }), lf = _o({
    bignumber: et,
    matrix: cr,
    add: at,
    config: Cr,
    isPositive: Js,
    larger: it,
    largerEq: rf,
    smaller: Me,
    smallerEq: ff,
    typed: H
  }), cf = ho({
    Index: af,
    matrix: cr,
    range: lf,
    typed: H
  }), Wn = Os({
    abs: ke,
    addScalar: Xr,
    det: sf,
    divideScalar: Kr,
    identity: ut,
    matrix: cr,
    multiply: te,
    typed: H,
    unaryMinus: Se
  }), vf = Jo({
    Complex: Be,
    config: Cr,
    fraction: Vn,
    identity: ut,
    inv: Wn,
    matrix: cr,
    multiply: te,
    number: rt,
    typed: H
  }), Df = Us({
    abs: ke,
    add: at,
    addScalar: Xr,
    atan: Ps,
    bignumber: et,
    column: cf,
    complex: je,
    config: Cr,
    cos: Vs,
    diag: js,
    divideScalar: Kr,
    dot: Jn,
    equal: Ln,
    flatten: Rn,
    im: Zs,
    inv: Wn,
    larger: it,
    matrix: cr,
    matrixFromColumns: ef,
    multiply: te,
    multiplyScalar: Yr,
    number: rt,
    qr: tf,
    re: Ws,
    reshape: Ys,
    sin: Gs,
    size: nt,
    smaller: Me,
    sqrt: tt,
    subtract: Zn,
    typed: H,
    usolve: nf,
    usolveAll: of
  }), pf = Bs({
    abs: ke,
    add: at,
    conj: _e,
    ctranspose: ks,
    eigs: Df,
    equalScalar: Ir,
    larger: it,
    matrix: cr,
    multiply: te,
    pow: vf,
    smaller: Me,
    sqrt: tt,
    typed: H
  });
  const Qn = {
    boundary: {
      value: Ur.state(10),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Boundary point"
    }
  }, fe = Ur.state([]), Pe = Ur.state([]), Gn = Ur.state([]), Ve = Ur.state([]);
  Ur.derive(() => {
    const r = [
      Qn.boundary.value.val,
      0,
      3
    ], { nodes: e, elements: n } = uu({
      points: [
        [
          0,
          0,
          0
        ],
        [
          5,
          0,
          0
        ],
        r,
        [
          8,
          0,
          7
        ],
        [
          15,
          0,
          5
        ],
        [
          15,
          0,
          0
        ],
        [
          20,
          0,
          0
        ],
        [
          20,
          0,
          10
        ],
        [
          0,
          0,
          10
        ],
        [
          0,
          0,
          0
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      maxMeshSize: 1
    });
    fe.val = e, Pe.val = n, Ve.val = df(r, fe.val), Gn.val = [
      su(fe.val, Pe.val, Ve.val)
    ];
  });
  document.body.append(nu(Qn), eu({
    mesh: {
      nodes: fe,
      elements: Pe
    },
    objects3D: Gn
  }), au(Ve), tu({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/color-map/main.ts",
    author: "https://www.linkedin.com/in/siu-kai-cheung/"
  }));
  function df(r, e) {
    return e.map((n) => pf(Zn(n, r)));
  }
});
