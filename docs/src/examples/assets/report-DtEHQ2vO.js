import { a as app } from "./app-Bgqhnn-W.js";
import { a as ab } from "./BHUODB6U-CCAgV7pX.js";
function design(nodes, elements, analysisInputs, analysisOutputs, designInputs, designFunctions) {
  const designOutputs = [];
  designFunctions.forEach((designFunction) => {
    designInputs.forEach((designInput) => {
      if (designFunction.name in designInput) {
        const element = designInput.element;
        const analysisInput = analysisInputs.find(
          (i2) => i2.element == element
        );
        const analysisOutput = analysisOutputs["default"].find(
          (i2) => i2.element == element
        );
        if (analysisInput && analysisOutput) {
          designOutputs.push(
            designFunction(analysisInput, analysisOutput, designInput)
          );
        }
      }
    });
  });
  return designOutputs;
}
function getKmod(serviceClass, loadDuration, material) {
  const kmodValues = {
    // Standard: EN 14081-1
    "Solid timber": {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.75,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9
      }
    },
    // Standard: EN 14080
    "Glued laminated timber": {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.75,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9
      }
    },
    // standard: EN 14374, EN 14279
    LVL: {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9
      }
    },
    // Standard: EN 636.
    // Type EN 636-1 for servie class 1
    // Type EN 363-2 for service class 2
    // Type EN 636-3 for service class 3
    Plywood: {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9
      }
    },
    // Standard: EN 300
    // OSB/2 for service class 1
    // OSB/3, OSB/4 for service class 2
    OSB: {
      "1": {
        permanent: 0.3,
        longTerm: 0.45,
        mediumTerm: 0.65,
        shortTerm: 0.85,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.3,
        longTerm: 0.4,
        mediumTerm: 0.55,
        shortTerm: 0.7,
        instantaneous: 0.9
      }
    },
    // Standard: EN 312
    // Type P4, Type P5 for service class 1
    // Type P5 for service class 2
    Particleboard: {
      "1": {
        permanent: 0.3,
        longTerm: 0.45,
        mediumTerm: 0.65,
        shortTerm: 0.85,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.2,
        longTerm: 0.3,
        mediumTerm: 0.45,
        shortTerm: 0.6,
        instantaneous: 0.8
      }
    },
    // Standard: EN 622-2
    // Type HB.LA, HB.HLA 1 or 2 for service class 1
    // Type HB.HLA1 or 2 for service class 2
    "Fibreboard, hard": {
      "1": {
        permanent: 0.3,
        longTerm: 0.45,
        mediumTerm: 0.65,
        shortTerm: 0.85,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.2,
        longTerm: 0.3,
        mediumTerm: 0.45,
        shortTerm: 0.6,
        instantaneous: 0.8
      }
    },
    // Standard: EN 622-3
    // MBH.LA1 or 2 for service class 1
    // MBH.HLS1 or 2 for service class 2
    "Fibreboard, medium": {
      "1": {
        permanent: 0.2,
        longTerm: 0.4,
        mediumTerm: 0.6,
        shortTerm: 0.8,
        instantaneous: 1.1
      },
      "2": {
        permanent: 0.2,
        longTerm: 0.4,
        mediumTerm: 0.6,
        shortTerm: 0.8,
        instantaneous: 1.1
      }
    },
    // Standard 622-5
    // MDF.LA, MDF.HLS for service class 1
    // MDF.HLS for service class 2
    "Fibreboard, MDF": {
      "1": {
        permanent: 0.2,
        longTerm: 0.4,
        mediumTerm: 0.6,
        shortTerm: 0.8,
        instantaneous: 1.1
      },
      "2": {
        permanent: 1,
        longTerm: 1,
        mediumTerm: 1,
        shortTerm: 0.45,
        instantaneous: 0.8
      }
    }
  };
  if (!kmodValues[material] || !kmodValues[material][serviceClass] || typeof kmodValues[material][serviceClass][loadDuration] !== "number") {
    throw new Error(
      "Invalid material type, service class, or load duration for kmod determination"
    );
  }
  let kmod = kmodValues[material][serviceClass][loadDuration];
  return kmod;
}
const frameTimberDesign = (analysisInput, analysisOutput, designInput) => {
  const i2 = designInput.frameTimberDesign;
  const tensileForcePermanent = analysisOutput.normal ? analysisOutput.normal[0] : 0;
  const appliedForce = tensileForcePermanent * i2.gammaG;
  const crossSectionalArea = analysisInput.area ?? 0;
  const appliedStress = appliedForce / crossSectionalArea;
  const kmod = getKmod(i2.serviceClass, i2.loadDuration, i2.material);
  const capacityStress = i2.tensileStrengthParallel * kmod / i2.gammaM;
  const utilizationRatio = appliedStress / capacityStress;
  return {
    element: designInput.element,
    frameTimberDesign: {
      appliedForce,
      appliedStress,
      kmod,
      capacityStress,
      utilizationRatio
    }
  };
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, i = t.trustedTypes, s = i ? i.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e = "$lit$", h = `lit$${(Math.random() + "").slice(9)}$`, o = "?" + h, n = `<${o}>`, r = document, l = () => r.createComment(""), c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u = (t2) => a(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = y(1), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r.createTreeWalker(r, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s ? s.createHTML(i2) : i2;
}
const P = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); )
      y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e + s3.slice(d2) + h + x2) : s3 + h + (-2 === d2 ? i3 : x2);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
class V {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
    if (this.el = V.createElement(f2, n2), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e)) {
              const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
              d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o)
          d2.push({ type: 2, index: c2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); )
            d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function N(t2, i2, s2 = t2, e2) {
  var _a, _b;
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e2 ? (_a = s2._$Co) == null ? void 0 : _a[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class S {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? r).importNode(i2, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n2 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n2];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class M {
  get _$AU() {
    var _a;
    return ((_a = this._$AM) == null ? void 0 : _a._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (((_a = this._$AH) == null ? void 0 : _a._$AD) === e2)
      this._$AH.p(i2);
    else {
      const t3 = new S(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2)
      e2 === i2.length ? i2.push(s2 = new M(this.S(l()), this.S(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var _a;
    for ((_a = this._$AP) == null ? void 0 : _a.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var _a;
    void 0 === this._$AM && (this._$Cv = t2, (_a = this._$AP) == null ? void 0 : _a.call(this, t2));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n2, r2;
      for (t2 = h2[0], n2 = 0; n2 < h2.length - 1; n2++)
        r2 = N(this, e3[s2 + n2], i2, n2), r2 === w && (r2 = this._$AH[n2]), o2 || (o2 = !c(r2) || r2 !== this._$AH[n2]), r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n2 + 1]), this._$AH[n2] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class H extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
}
class I extends R {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a;
    "function" == typeof this._$AH ? this._$AH.call(((_a = this.options) == null ? void 0 : _a.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const Z = t.litHtmlPolyfillSupport;
Z == null ? void 0 : Z(V, M), (t.litHtmlVersions ?? (t.litHtmlVersions = [])).push("3.1.2");
function frameTimberDesignReport(designInput, designOutput) {
  const i2 = designInput.frameTimberDesign;
  const o2 = designOutput.frameTimberDesign;
  return x`
    <h2>Design for Tension of Element ${designInput.element}</h2>

    <h3>Axial stress in element</h3>
    <p>N: ${o2.appliedForce.toFixed(5)} KN (from FEM analysis)</p>
    <p>Sigma: N/A ${o2.appliedStress.toFixed(3)} MPa</p>

    <h3>Axial stress capacity of element</h3>
    <p>Kmodmed: ${o2.kmod.toFixed(1)}</p>
    <p>Ft0k: ${i2.tensileStrengthParallel.toFixed(3)}</p>
    <p>gammaM: ${i2.gammaM.toFixed(1)}</p>
    <p>Ft0d (k * f/gammaM): ${o2.capacityStress.toFixed(3)} MPa</p>

    <h3>Element verification</h3>
    <p>(k * f/gammaM): ${o2.utilizationRatio.toFixed(3)} < 1</p>
    <p>
      ${Math.abs(o2.utilizationRatio) > 1 ? "section is not sufficient" : "section is sufficient"}
    </p>
  `;
}
const parameters = {
  xPosition: { value: 12, min: 1, max: 20 },
  zPosition: { value: 0, min: 1, max: 10 }
};
function onParameterChange(parameters2) {
  const nodes = [
    [5, 0, 0],
    [parameters2.xPosition.value, 0, parameters2.zPosition.value],
    [5, 0, 8]
  ];
  const elements = [
    [0, 1],
    [1, 2]
  ];
  const analysisInputs = [
    {
      node: 0,
      support: [true, true, true]
    },
    {
      node: 2,
      support: [true, true, true]
    },
    {
      node: 1,
      load: [0, 0, -10]
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200
    }
  ];
  const frameTimberDesignInput = {
    tensileStrengthParallel: 20,
    serviceClass: "1",
    loadDuration: "permanent",
    material: "Solid timber",
    gammaG: 1,
    gammaM: 1.3
  };
  const designInputs = [
    {
      element: 0,
      frameTimberDesign: frameTimberDesignInput
    },
    {
      element: 1,
      frameTimberDesign: frameTimberDesignInput
    }
  ];
  const analysisOutputs = ab(nodes, elements, analysisInputs);
  const designOutputs = design(
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    [frameTimberDesign]
  );
  return {
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    designOutputs
  };
}
app({ parameters, onParameterChange, reports: [frameTimberDesignReport] });
