import { v as o, g as Tt } from "./styles-I_-DKBYJ.js";
import { g as kt, a as wt, b as ct } from "./oneWay-BO9bAq5d.js";
import { s as H, a as Ct, g as mt, b as O, c as Lt, r as Nt, d as Xt } from "./probes-CBc8oaXE.js";
import { a as At } from "./analyze-safkwfFW.js";
import { d as $t, __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { g as It, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
import "./getLocalStiffnessMatrix-BSrjxkfr.js";
import "./complex-i8qiIvCl.js";
import "./__vite-browser-external-D7Ct-6yo.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  function pt(t = {}) {
    const a = Et(t);
    return {
      element: a.details,
      update: (s) => Ot(a.canvas, s, t),
      setTitle: (s) => {
        a.summary.textContent = s;
      }
    };
  }
  function Et(t) {
    const a = document.createElement("details");
    a.className = "tt-stress-dropdown", a.open = t.defaultOpen ?? false;
    const s = document.createElement("summary");
    s.className = "tt-stress-dropdown__summary", s.textContent = t.title ?? "Through-thickness stress profile", a.append(s);
    const e = document.createElement("div");
    e.className = "tt-stress-dropdown__unit", e.textContent = `[${t.unitLabel ?? "N/mm\xB2"}]`, a.append(e);
    const n = document.createElement("canvas");
    return n.className = "tt-stress-dropdown__canvas", n.width = t.width ?? 980, n.height = t.height ?? 500, a.append(n), {
      details: a,
      summary: s,
      canvas: n
    };
  }
  function Ot(t, a, s) {
    const e = t.getContext("2d");
    if (!e) return;
    const n = t.width, c = t.height;
    if (e.clearRect(0, 0, n, c), !a.length) return;
    const r = 14, m = 120, i = 16, g = 14, u = r, y = n - m, S = i, f = c - g, N = y - u, X = f - S, M = u + N * 0.5, G = N * 0.5 - 10, ot = a.reduce((p, x) => p + x.thickness, 0), K = Math.max(1e-6, ...a.flatMap((p) => [
      Math.abs(p.topMpa),
      Math.abs(p.midMpa ?? 0),
      Math.abs(p.bottomMpa)
    ]));
    e.fillStyle = "#f6efea", e.fillRect(u, S, N, X), e.strokeStyle = "#e5a274", e.lineWidth = 1, e.strokeRect(u, S, N, X), e.strokeStyle = "#e5a274", e.beginPath(), e.moveTo(M, S), e.lineTo(M, f), e.stroke();
    let B = 0;
    for (const p of a) {
      const x = S + B / ot * X;
      B += p.thickness;
      const A = S + B / ot * X, $ = q(p.topMpa, s.signConvention), I = q(p.bottomMpa, s.signConvention), b = p.midMpa === void 0 ? void 0 : q(p.midMpa, s.signConvention), _ = M + $ / K * G, U = M + I / K * G, E = b === void 0 ? void 0 : M + b / K * G, rt = 0.5 * (x + A), lt = (b === void 0 ? 0.5 * ($ + I) : ($ + b + I) / 3) >= 0, it = E === void 0 ? [
        _,
        U
      ] : [
        _,
        E,
        U
      ], Pt = lt ? Math.max(...it) : Math.min(...it), k = e.createLinearGradient(M, 0, Pt, 0);
      lt ? (k.addColorStop(0, "rgba(255, 93, 110, 0.95)"), k.addColorStop(1, "rgba(205, 92, 104, 0.82)")) : (k.addColorStop(0, "rgba(91, 108, 255, 0.95)"), k.addColorStop(1, "rgba(81, 95, 215, 0.82)")), e.fillStyle = k, e.beginPath(), e.moveTo(M, x), e.lineTo(_, x), E !== void 0 && e.lineTo(E, rt), e.lineTo(U, A), e.lineTo(M, A), e.closePath(), e.fill(), e.strokeStyle = "rgba(229, 162, 116, 0.32)", e.beginPath(), e.moveTo(u, x), e.lineTo(y, x), e.stroke(), e.fillStyle = "#d36015", e.font = "15px 'Courier New', monospace", e.textAlign = "right", e.fillText(W($, s.valueDigits), n - 8, x + 14), s.showMidLabels && b !== void 0 && e.fillText(W(b, s.valueDigits), n - 8, rt + 5), e.fillText(W(I, s.valueDigits), n - 8, A - 4);
    }
    e.strokeStyle = "rgba(229, 162, 116, 0.32)", e.beginPath(), e.moveTo(u, f), e.lineTo(y, f), e.stroke();
  }
  function q(t, a = "raw") {
    return a === "flip" ? -t : t;
  }
  function W(t, a = 3) {
    const s = Math.abs(t);
    return s > 0 && s < 1e-3 ? t.toExponential(Math.min(3, a)) : t.toFixed(a);
  }
  const { div: l } = o.tags, v = 10, d = 2.45, zt = 1, h = {
    nodes: o.state([]),
    elements: o.state([]),
    nodeInputs: o.state({}),
    elementInputs: o.state({}),
    deformOutputs: o.state({}),
    analyzeOutputs: o.state({})
  }, w = o.state("SLS"), V = {};
  let j;
  const at = o.state(0.36), F = o.state(4.335), Z = o.state(1.589), st = o.state(0.8), C = o.state(3), P = o.state("sigma1"), z = o.state("top"), T = o.state("tauXZ"), R = o.state("tauXZ"), D = o.state("mid"), ut = o.state(0), ft = o.state(0), ht = o.state(0), vt = o.state(0), gt = o.state(0), J = o.state(0), Q = o.state(0), St = o.state(0), Mt = o.state(0), xt = o.state(0), yt = o.state(0);
  let tt, Y;
  const L = Dt();
  o.derive(() => {
    at.val, F.val, Z.val, st.val, Rt();
  });
  o.derive(() => {
    w.val, C.val, P.val, z.val, T.val, R.val, D.val, nt();
  });
  _t();
  function Rt() {
    const { nodes: t, elements: a } = It({
      points: [
        [
          0,
          0,
          0
        ],
        [
          v,
          0,
          0
        ],
        [
          v,
          d,
          0
        ],
        [
          0,
          d,
          0
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3
      ],
      maxMeshSize: at.val
    }), s = Ft(t);
    V.ULS = dt({
      nodes: t,
      elements: a,
      supports: s,
      q: F.val,
      stiffnessReduction: 1
    }), V.SLS = dt({
      nodes: t,
      elements: a,
      supports: s,
      q: Z.val,
      stiffnessReduction: 1 + st.val
    }), j = s, h.nodes.val = t, h.elements.val = a, nt();
  }
  function nt() {
    const t = V[w.val];
    if (!t || !j) return;
    h.nodeInputs.val = {
      supports: j,
      loads: t.loads
    }, h.elementInputs.val = t.elementInputs, h.deformOutputs.val = {
      deformations: t.deformations,
      reactions: t.reactions
    }, h.analyzeOutputs.val = t.analyze;
    const a = et();
    C.val !== a && (C.val = a);
    const s = h.nodes.val, e = h.elements.val, n = kt(s, e, t.analyze, t.deformations, t.reactions);
    J.val = n.specificSupportShearKnPerM, Q.val = n.maxSpecificBendingMomentKnmPerM, ut.val = n.maxDownwardDeflectionMm;
    const c = w.val === "ULS" ? F.val : Z.val, r = wt(c, v);
    St.val = r.specificSupportShearKnPerM, Mt.val = r.maxSpecificBendingMomentKnmPerM, xt.val = ct(J.val, r.specificSupportShearKnPerM), yt.val = ct(Q.val, r.maxSpecificBendingMomentKnmPerM);
    const m = Bt();
    ft.val = H(s, e, t.inPlaneProfiles, [
      v / 2,
      d / 2
    ], a, z.val, P.val) ?? 0;
    const i = Ct(s, e, t.inPlaneProfiles, [
      v / 2,
      d / 2
    ], P.val);
    vt.val = (i == null ? void 0 : i.length) ? mt(i).maxAbs : 0, ht.val = O(s, e, t.transverseProfiles, [
      m,
      d / 2
    ], a, D.val, T.val, {
      weightX: 2,
      weightY: 1
    }) ?? 0;
    const g = Lt(s, e, t.transverseProfiles, [
      m,
      d / 2
    ], T.val, {
      weightX: 2,
      weightY: 1
    });
    gt.val = (g == null ? void 0 : g.length) ? mt(g).maxAbs : 0;
    const u = Gt(s, e, t.inPlaneProfiles);
    tt == null ? void 0 : tt.update(u);
    const y = Kt(s, e, t.transverseProfiles, R.val, m);
    Y == null ? void 0 : Y.setTitle(`\u03C4${R.val.slice(3).toLowerCase()} Through-Thickness Profile (next to support)`), Y == null ? void 0 : Y.update(y);
  }
  function dt({ nodes: t, elements: a, supports: s, q: e, stiffnessReduction: n }) {
    const c = Zt(t, a), r = new Map(t.map((S, f) => [
      f,
      [
        0,
        0,
        -e * c[f],
        0,
        0,
        0
      ]
    ])), m = {
      cltLayups: new Map(a.map((S, f) => [
        f,
        Yt(L, n)
      ]))
    }, i = $t(t, a, {
      supports: s,
      loads: r
    }, m), g = At(t, a, m, i), u = Nt(t, a, m, i, {
      mode: "coupled"
    }), y = Xt(t, a, m, i, {
      mode: "coupled"
    });
    return {
      loads: r,
      elementInputs: m,
      deformations: i.deformations,
      reactions: i.reactions,
      analyze: g,
      inPlaneProfiles: u,
      transverseProfiles: y
    };
  }
  function Dt() {
    const s = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], e = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: s.map((n, c) => ({
        thickness: n * 1e-3,
        thetaDeg: e[c],
        Ex: 11e3 * 1e3,
        Ey: 0.1 * 1e3,
        nuXY: 0,
        Gxy: 690 * 1e3,
        Gxz: 690 * 1e3,
        Gyz: 69 * 1e3
      })),
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: false,
        strictSymmetryForElement: true
      }
    };
  }
  function Yt(t, a) {
    return a === 1 ? t : {
      ...t,
      layers: t.layers.map((s) => ({
        ...s,
        Ex: s.Ex / a,
        Ey: s.Ey / a,
        Gxy: s.Gxy / a,
        Gxz: s.Gxz / a,
        Gyz: s.Gyz / a
      }))
    };
  }
  function Ft(t) {
    return new Map(t.map((a, s) => ({
      node: a,
      i: s
    })).filter(({ node: a }) => Math.abs(a[0]) < 1e-6 || Math.abs(a[0] - v) < 1e-6).map(({ i: a }) => [
      a,
      [
        true,
        true,
        true,
        false,
        false,
        false
      ]
    ]));
  }
  function Zt(t, a) {
    const s = Array(t.length).fill(0);
    for (const e of a) {
      if (e.length !== 3) continue;
      const [n, c, r] = e.map((g) => t[g]), i = Math.abs((c[0] - n[0]) * (r[1] - n[1]) - (r[0] - n[0]) * (c[1] - n[1])) * 0.5 / 3;
      s[e[0]] += i, s[e[1]] += i, s[e[2]] += i;
    }
    return s;
  }
  function et() {
    return bt(Math.round(C.val), 0, L.layers.length - 1);
  }
  function bt(t, a, s) {
    return Math.max(a, Math.min(s, t));
  }
  function Gt(t, a, s) {
    return L.layers.map((e, n) => ({
      thickness: e.thickness,
      topMpa: H(t, a, s, [
        v / 2,
        d / 2
      ], n, "top", "sigmaX") ?? 0,
      bottomMpa: H(t, a, s, [
        v / 2,
        d / 2
      ], n, "bottom", "sigmaX") ?? 0
    }));
  }
  function Kt(t, a, s, e, n) {
    return L.layers.map((c, r) => ({
      thickness: c.thickness,
      topMpa: O(t, a, s, [
        n,
        d / 2
      ], r, "top", e, {
        weightX: 2,
        weightY: 1
      }) ?? 0,
      midMpa: O(t, a, s, [
        n,
        d / 2
      ], r, "mid", e, {
        weightX: 2,
        weightY: 1
      }) ?? 0,
      bottomMpa: O(t, a, s, [
        n,
        d / 2
      ], r, "bottom", e, {
        weightX: 2,
        weightY: 1
      }) ?? 0
    }));
  }
  function Bt() {
    return bt(zt, 0, v);
  }
  function _t() {
    const t = l({
      id: "page"
    });
    tt = pt({
      title: "\u03C3x Through-Thickness Profile",
      unitLabel: "N/mm\xB2",
      signConvention: "flip",
      width: 720,
      height: 360,
      valueDigits: 3,
      defaultOpen: false
    }), Y = pt({
      title: "\u03C4xz Through-Thickness Profile (next to support)",
      unitLabel: "N/mm\xB2",
      signConvention: "raw",
      width: 720,
      height: 360,
      valueDigits: 5,
      defaultOpen: false
    }), t.append(l({
      id: "viewer-wrap"
    }, Tt({
      mesh: h,
      settingsObj: {
        deformedShape: true,
        shellResults: "displacementZ",
        shellResultScales: {
          displacementZ: 1e3
        },
        shellResultUnits: {
          displacementZ: "mm"
        },
        showFrameResults: false,
        nodes: false,
        nodesIndexes: false,
        elementsIndexes: false,
        loads: true,
        supports: true,
        displayScale: -3,
        customSelects: [
          {
            folder: "Analysis Inputs",
            label: "Load case",
            state: w,
            options: {
              ULS: "ULS",
              SLS: "SLS"
            }
          },
          {
            folder: "Analysis Outputs",
            label: "In-plane component",
            state: P,
            options: {
              sigmaX: "sigmaX",
              sigmaY: "sigmaY",
              tauXY: "tauXY",
              sigma1: "sigma1",
              sigma2: "sigma2",
              tau12: "tau12"
            }
          },
          {
            folder: "Analysis Outputs",
            label: "In-plane point",
            state: z,
            options: {
              top: "top",
              mid: "mid",
              bottom: "bottom"
            }
          },
          {
            folder: "Analysis Outputs",
            label: "Transverse component",
            state: T,
            options: {
              tauXZ: "tauXZ",
              tauYZ: "tauYZ",
              tau13: "tau13",
              tau23: "tau23"
            }
          },
          {
            folder: "Analysis Outputs",
            label: "Transverse point",
            state: D,
            options: {
              top: "top",
              mid: "mid",
              bottom: "bottom"
            }
          },
          {
            folder: "Analysis Outputs",
            label: "\u03C4 profile component",
            state: R,
            options: {
              tauXZ: "tauXZ",
              tauYZ: "tauYZ"
            }
          }
        ],
        customNumbers: [
          {
            folder: "Analysis Model",
            label: "Max mesh size [m]",
            state: at,
            min: 0.01,
            max: 1.5,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "q ULS [kN/m2]",
            state: F,
            min: -50,
            max: 50,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "q SLS [kN/m2]",
            state: Z,
            min: -50,
            max: 50,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "kdef",
            state: st,
            min: 0,
            step: 0.01
          },
          {
            folder: "Analysis Outputs",
            label: "Layer index",
            state: C,
            min: 0,
            max: L.layers.length - 1,
            step: 1
          }
        ]
      }
    })), l({
      id: "clt-stats"
    }, l({
      class: "title"
    }, "CLT plate"), l(() => `Load case: ${w.val}`), l(() => `Max deflection [mm]: ${ut.val.toFixed(3)}`), l(() => `Specific shear @ support [kN/m]: ${J.val.toFixed(3)}`), l(() => `Beam reference shear [kN/m]: ${St.val.toFixed(3)} (${xt.val.toFixed(2)}% err)`), l(() => `Max specific bending moment [kNm/m]: ${Q.val.toFixed(3)}`), l(() => `Beam reference moment [kNm/m]: ${Mt.val.toFixed(3)} (${yt.val.toFixed(2)}% err)`), l(() => `${P.val} @ ${z.val}, layer ${et()} [MPa]: ${ft.val.toFixed(3)}`), l(() => `${P.val} through-thickness |max| [MPa]: ${vt.val.toFixed(3)}`), l(() => `${T.val} @ ${D.val}, layer ${et()} [MPa]: ${ht.val.toFixed(4)}`), l(() => `${T.val} through-thickness |max| [MPa]: ${gt.val.toFixed(4)}`)), l({
      id: "stress-profiles"
    }, tt.element, Y.element)), document.body.append(t), nt();
  }
});
