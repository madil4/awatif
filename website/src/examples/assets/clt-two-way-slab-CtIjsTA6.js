import { v as s, g as D } from "./styles-I_-DKBYJ.js";
import { s as F, a as U, g as w, b as R, c as H, r as W, d as _ } from "./probes-CBc8oaXE.js";
import { a as j } from "./analyze-safkwfFW.js";
import { d as V, __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { g as B, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
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
  const { div: l } = s.tags, p = 7, f = 5, m = {
    nodes: s.state([]),
    elements: s.state([]),
    nodeInputs: s.state({}),
    elementInputs: s.state({}),
    deformOutputs: s.state({}),
    analyzeOutputs: s.state({})
  }, S = s.state("ULS"), b = {};
  let P;
  const I = s.state(0.36), L = s.state(4.335), A = s.state(1.589), z = s.state(0.8), y = s.state(3), c = s.state("sigma1"), g = s.state("top"), d = s.state("tauYZ"), M = s.state("mid"), $ = s.state(0), N = s.state(0), O = s.state(0), G = s.state(0), E = s.state(0), k = K();
  s.derive(() => {
    I.val, L.val, A.val, z.val, J();
  });
  s.derive(() => {
    S.val, y.val, c.val, g.val, d.val, M.val, Y();
  });
  nt();
  function J() {
    const { nodes: t, elements: e } = B({
      points: [
        [
          0,
          0,
          0
        ],
        [
          p,
          0,
          0
        ],
        [
          p,
          f,
          0
        ],
        [
          0,
          f,
          0
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3
      ],
      maxMeshSize: I.val
    }), a = tt(t);
    b.ULS = C({
      nodes: t,
      elements: e,
      supports: a,
      q: L.val,
      stiffnessReduction: 1
    }), b.SLS = C({
      nodes: t,
      elements: e,
      supports: a,
      q: A.val,
      stiffnessReduction: 1 + z.val
    }), P = a, m.nodes.val = t, m.elements.val = e, Y();
  }
  function Y() {
    const t = b[S.val];
    if (!t || !P) return;
    m.nodeInputs.val = {
      supports: P,
      loads: t.loads
    }, m.elementInputs.val = t.elementInputs, m.deformOutputs.val = {
      deformations: t.deformations,
      reactions: t.reactions
    }, m.analyzeOutputs.val = t.analyze, $.val = at(t.deformations);
    const e = T();
    y.val !== e && (y.val = e);
    const a = m.nodes.val, n = m.elements.val;
    N.val = F(a, n, t.inPlaneProfiles, [
      p / 2,
      f / 2
    ], e, g.val, c.val) ?? 0;
    const o = U(a, n, t.inPlaneProfiles, [
      p / 2,
      f / 2
    ], c.val);
    G.val = (o == null ? void 0 : o.length) ? w(o).maxAbs : 0, O.val = R(a, n, t.transverseProfiles, [
      p / 2,
      0
    ], e, M.val, d.val, {
      weightX: 1,
      weightY: 10
    }) ?? 0;
    const r = H(a, n, t.transverseProfiles, [
      p / 2,
      0
    ], d.val, {
      weightX: 1,
      weightY: 10
    });
    E.val = (r == null ? void 0 : r.length) ? w(r).maxAbs : 0;
  }
  function C({ nodes: t, elements: e, supports: a, q: n, stiffnessReduction: o }) {
    const r = et(t, e), v = new Map(t.map((q, h) => [
      h,
      [
        0,
        0,
        -n * r[h],
        0,
        0,
        0
      ]
    ])), u = {
      cltLayups: new Map(e.map((q, h) => [
        h,
        Q(k, o)
      ]))
    }, i = V(t, e, {
      supports: a,
      loads: v
    }, u), x = j(t, e, u, i), X = W(t, e, u, i, {
      mode: "coupled"
    }), Z = _(t, e, u, i, {
      mode: "coupled"
    });
    return {
      loads: v,
      elementInputs: u,
      deformations: i.deformations,
      reactions: i.reactions,
      analyze: x,
      inPlaneProfiles: X,
      transverseProfiles: Z
    };
  }
  function K() {
    const a = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], n = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: a.map((o, r) => ({
        thickness: o * 1e-3,
        thetaDeg: n[r],
        Ex: 11e3 * 1e3,
        Ey: 370 * 1e3,
        nuXY: 0.2,
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
  function Q(t, e) {
    return e === 1 ? t : {
      ...t,
      layers: t.layers.map((a) => ({
        ...a,
        Ex: a.Ex / e,
        Ey: a.Ey / e,
        Gxy: a.Gxy / e,
        Gxz: a.Gxz / e,
        Gyz: a.Gyz / e
      }))
    };
  }
  function tt(t) {
    return new Map(t.map((e, a) => ({
      node: e,
      i: a
    })).filter(({ node: e }) => Math.abs(e[0]) < 1e-6 || Math.abs(e[0] - p) < 1e-6 || Math.abs(e[1]) < 1e-6 || Math.abs(e[1] - f) < 1e-6).map(({ i: e }) => [
      e,
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
  function et(t, e) {
    const a = Array(t.length).fill(0);
    for (const n of e) {
      if (n.length !== 3) continue;
      const [o, r, v] = n.map((x) => t[x]), i = Math.abs((r[0] - o[0]) * (v[1] - o[1]) - (v[0] - o[0]) * (r[1] - o[1])) * 0.5 / 3;
      a[n[0]] += i, a[n[1]] += i, a[n[2]] += i;
    }
    return a;
  }
  function at(t) {
    if (!(t == null ? void 0 : t.size)) return 0;
    let e = 0;
    return t.forEach((a) => {
      e = Math.min(e, a[2] ?? 0);
    }), -e * 1e3;
  }
  function T() {
    return st(Math.round(y.val), 0, k.layers.length - 1);
  }
  function st(t, e, a) {
    return Math.max(e, Math.min(a, t));
  }
  function nt() {
    const t = l({
      id: "page"
    });
    t.append(l({
      id: "viewer-wrap"
    }, D({
      mesh: m,
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
            state: S,
            options: {
              ULS: "ULS",
              SLS: "SLS"
            }
          },
          {
            folder: "Analysis Outputs",
            label: "In-plane component",
            state: c,
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
            state: g,
            options: {
              top: "top",
              mid: "mid",
              bottom: "bottom"
            }
          },
          {
            folder: "Analysis Outputs",
            label: "Transverse component",
            state: d,
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
            state: M,
            options: {
              top: "top",
              mid: "mid",
              bottom: "bottom"
            }
          }
        ],
        customNumbers: [
          {
            folder: "Analysis Model",
            label: "Max mesh size [m]",
            state: I,
            min: 0.01,
            max: 1.2,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "q ULS [kN/m2]",
            state: L,
            min: -50,
            max: 50,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "q SLS [kN/m2]",
            state: A,
            min: -50,
            max: 50,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "kdef",
            state: z,
            min: 0,
            step: 0.01
          },
          {
            folder: "Analysis Outputs",
            label: "Layer index",
            state: y,
            min: 0,
            max: k.layers.length - 1,
            step: 1
          }
        ]
      }
    })), l({
      id: "clt-stats"
    }, l({
      class: "title"
    }, "CLT two-way slab"), l(() => `Load case: ${S.val}`), l(() => `Max deflection [mm]: ${$.val.toFixed(3)}`), l(() => `${c.val} @ ${g.val}, layer ${T()} [MPa]: ${N.val.toFixed(3)}`), l(() => `${c.val} through-thickness |max| [MPa]: ${G.val.toFixed(3)}`), l(() => `${d.val} @ ${M.val}, layer ${T()} [MPa]: ${O.val.toFixed(4)}`), l(() => `${d.val} through-thickness |max| [MPa]: ${E.val.toFixed(4)}`))), document.body.append(t);
  }
});
