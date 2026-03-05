import { v as s, g as q } from "./styles-I_-DKBYJ.js";
import { g as O, b as w } from "./oneWay-BO9bAq5d.js";
import { a as A } from "./analyze-safkwfFW.js";
import { d as C, __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { g as P, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
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
  const { div: l } = s.tags, R = 11e3, G = 1e3, M = {
    s361: {
      label: "3.6.1 Symmetrical 5-layer",
      lengthM: 6,
      widthM: 1,
      layers: [
        p(20, 0, 11e3, 0.1, 0, 650, 650, 50),
        p(40, 90, 11e3, 0.1, 0, 650, 650, 50),
        p(20, 0, 11e3, 0.1, 0, 650, 650, 50),
        p(40, 90, 11e3, 0.1, 0, 650, 650, 50),
        p(20, 0, 11e3, 0.1, 0, 650, 650, 50)
      ],
      refs: {
        zSmm: 70,
        iNetMm4: 146e6,
        wBottomMm3: 2086e3,
        wTopMm3: 2086e3,
        q3kNDeflectionMm: 33
      }
    },
    s362: {
      label: "3.6.2 Non-symmetrical 5-layer",
      lengthM: 6,
      widthM: 1,
      layers: [
        p(40, 0, 11e3, 0.1, 0, 650, 650, 50),
        p(30, 90, 8e3, 0.1, 0, 650, 650, 50),
        p(40, 0, 8e3, 0.1, 0, 650, 650, 50),
        p(30, 90, 8e3, 0.1, 0, 650, 650, 50),
        p(20, 0, 11e3, 0.1, 0, 650, 650, 50)
      ],
      refs: {
        zSmm: 72.1,
        iNetMm4: 2492e5,
        wBottomMm3: 3456e3,
        wTopMm3: 2835e3
      }
    }
  }, h = {
    nodes: s.state([]),
    elements: s.state([]),
    nodeInputs: s.state({}),
    elementInputs: s.state({}),
    deformOutputs: s.state({}),
    analyzeOutputs: s.state({})
  }, f = s.state("s361"), g = s.state(3), y = s.state(0.35), b = s.state(0), k = s.state(0), z = s.state(0), N = s.state(0), E = s.state(0), $ = s.state(0), F = s.state(0), D = s.state(0), T = s.state(0), B = s.state(0), L = s.state(0), I = s.state(0);
  s.derive(() => {
    f.val, g.val, y.val, K();
  });
  W();
  function K() {
    const e = M[f.val], { nodes: t, elements: a } = P({
      points: [
        [
          0,
          0,
          0
        ],
        [
          e.lengthM,
          0,
          0
        ],
        [
          e.lengthM,
          e.widthM,
          0
        ],
        [
          0,
          e.widthM,
          0
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3
      ],
      maxMeshSize: y.val
    }), m = X(t, e.lengthM), i = Y(t, a), c = new Map(t.map((S, v) => [
      v,
      [
        0,
        0,
        -g.val * i[v],
        0,
        0,
        0
      ]
    ])), d = Z(e.layers), x = {
      cltLayups: new Map(a.map((S, v) => [
        v,
        d
      ]))
    }, r = C(t, a, {
      supports: m,
      loads: c
    }, x), u = A(t, a, x, r), n = O(t, a, u, r.deformations, r.reactions, {
      xMin: 0,
      xMax: e.lengthM,
      slabWidth: e.widthM
    });
    h.nodes.val = t, h.elements.val = a, h.nodeInputs.val = {
      supports: m,
      loads: c
    }, h.elementInputs.val = x, h.deformOutputs.val = {
      deformations: r.deformations,
      reactions: r.reactions
    }, h.analyzeOutputs.val = u, b.val = n.maxDownwardDeflectionMm, k.val = n.specificSupportShearKnPerM, z.val = n.maxSpecificBendingMomentKnmPerM;
    const o = H(e.layers, R, G);
    N.val = o.zSmm, E.val = o.iNetMm4, $.val = o.wBottomMm3, F.val = o.wTopMm3, D.val = w(o.zSmm, e.refs.zSmm), T.val = w(o.iNetMm4, e.refs.iNetMm4), B.val = w(o.wBottomMm3, e.refs.wBottomMm3), L.val = w(o.wTopMm3, e.refs.wTopMm3), I.val = e.refs.q3kNDeflectionMm === void 0 ? 0 : w(n.maxDownwardDeflectionMm, e.refs.q3kNDeflectionMm);
  }
  function W() {
    const e = l({
      id: "page"
    });
    e.append(l({
      id: "viewer-wrap"
    }, q({
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
            folder: "Textbook Case",
            label: "Scenario",
            state: f,
            options: {
              s361: M.s361.label,
              s362: M.s362.label
            }
          }
        ],
        customNumbers: [
          {
            folder: "Textbook Case",
            label: "q [kN/m2]",
            state: g,
            min: -20,
            max: 20,
            step: 0.01
          },
          {
            folder: "Textbook Case",
            label: "Max mesh size [m]",
            state: y,
            min: 0.05,
            max: 1,
            step: 0.01
          }
        ]
      }
    })), l({
      id: "handbook-stats"
    }, l({
      class: "title"
    }, "CLT Handbook 3.6 Comparison"), l(() => `Scenario: ${M[f.val].label}`), l(() => `FE max deflection [mm]: ${b.val.toFixed(3)}`), l(() => `FE specific shear @ support [kN/m]: ${k.val.toFixed(3)}`), l(() => `FE max bending moment [kNm/m]: ${z.val.toFixed(3)}`), l({
      class: "section"
    }, "Section properties (longitudinal layers, transformed):"), l(() => `z_s [mm]: ${N.val.toFixed(2)} (ref ${M[f.val].refs.zSmm.toFixed(2)}, err ${D.val.toFixed(2)}%)`), l(() => `I_x,net [mm^4]: ${E.val.toExponential(4)} (ref ${M[f.val].refs.iNetMm4.toExponential(4)}, err ${T.val.toFixed(2)}%)`), l(() => `W_bottom [mm^3]: ${$.val.toExponential(4)} (ref ${M[f.val].refs.wBottomMm3.toExponential(4)}, err ${B.val.toFixed(2)}%)`), l(() => `W_top [mm^3]: ${F.val.toExponential(4)} (ref ${M[f.val].refs.wTopMm3.toExponential(4)}, err ${L.val.toFixed(2)}%)`), l(() => M[f.val].refs.q3kNDeflectionMm === void 0 ? "Deflection benchmark (q=3 kN/m2): n/a in shown table" : `Deflection benchmark (q=3 kN/m2): ref ${M[f.val].refs.q3kNDeflectionMm.toFixed(2)} mm, err ${I.val.toFixed(2)}%`))), document.body.append(e);
  }
  function p(e, t, a, m, i, c, d, x) {
    return {
      thicknessMm: e,
      thetaDeg: t,
      exMpa: a,
      eyMpa: m,
      nuXY: i,
      gxyMpa: c,
      gxzMpa: d,
      gyzMpa: x
    };
  }
  function Z(e) {
    return {
      layers: e.map((t) => ({
        thickness: t.thicknessMm / 1e3,
        thetaDeg: t.thetaDeg,
        Ex: t.exMpa * 1e3,
        Ey: t.eyMpa * 1e3,
        nuXY: t.nuXY,
        Gxy: t.gxyMpa * 1e3,
        Gxz: t.gxzMpa * 1e3,
        Gyz: t.gyzMpa * 1e3
      })),
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: false,
        strictSymmetryForElement: false
      }
    };
  }
  function H(e, t, a) {
    const m = e.reduce((n, o) => n + o.thicknessMm, 0);
    let i = 0;
    const c = e.map((n, o) => {
      const S = i;
      return i = i + n.thicknessMm, {
        index: o,
        layer: n,
        zLayerBottom: S,
        oMm: S + n.thicknessMm * 0.5
      };
    }).filter((n) => n.layer.thetaDeg === 0), d = c.reduce((n, o) => n + o.layer.exMpa / t * a * o.layer.thicknessMm, 0), r = c.reduce((n, o) => n + o.layer.exMpa / t * a * o.layer.thicknessMm * o.oMm, 0) / Math.max(1e-12, d), u = c.reduce((n, o) => {
      const S = o.layer.exMpa / t, v = o.layer.thicknessMm, _ = o.oMm - r;
      return n + S * (a * v ** 3 / 12 + a * v * _ ** 2);
    }, 0);
    return {
      hMm: m,
      zSmm: r,
      iNetMm4: u,
      wBottomMm3: u / Math.max(1e-12, r),
      wTopMm3: u / Math.max(1e-12, m - r)
    };
  }
  function X(e, t) {
    return new Map(e.map((a, m) => ({
      node: a,
      i: m
    })).filter(({ node: a }) => Math.abs(a[0]) < 1e-8 || Math.abs(a[0] - t) < 1e-8).map(({ i: a }) => [
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
  function Y(e, t) {
    const a = Array(e.length).fill(0);
    for (const m of t) {
      if (m.length !== 3) continue;
      const [i, c, d] = m.map((u) => e[u]), r = Math.abs((c[0] - i[0]) * (d[1] - i[1]) - (d[0] - i[0]) * (c[1] - i[1])) * 0.5 / 3;
      a[m[0]] += r, a[m[1]] += r, a[m[2]] += r;
    }
    return a;
  }
});
