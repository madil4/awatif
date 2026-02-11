import { v as a, g as N } from "./styles-Dc2qaz2G.js";
import { a as k } from "./analyze-Cqn-kN2k.js";
import { d as G, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as T, __tla as __tla_1 } from "./getMesh-DmUdekin.js";
import "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
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
  const { div: g } = a.tags, d = 7, f = 5, m = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({}),
    analyzeOutputs: a.state({})
  }, v = a.state("ULS"), y = {};
  let S;
  const h = a.state(0.36), x = a.state(4.335), L = a.state(1.589), M = a.state(0.8), A = E();
  a.derive(() => {
    h.val, x.val, L.val, M.val, w();
  });
  a.derive(() => {
    v.val, b();
  });
  U();
  function w() {
    const { nodes: e, elements: t } = T({
      points: [
        [
          0,
          0,
          0
        ],
        [
          d,
          0,
          0
        ],
        [
          d,
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
      maxMeshSize: h.val
    }), s = C(e);
    y.ULS = z({
      nodes: e,
      elements: t,
      supports: s,
      q: x.val,
      stiffnessReduction: 1
    }), y.SLS = z({
      nodes: e,
      elements: t,
      supports: s,
      q: L.val,
      stiffnessReduction: 1 + M.val
    }), S = s, m.nodes.val = e, m.elements.val = t, b();
  }
  function b() {
    const e = y[v.val];
    !e || !S || (m.nodeInputs.val = {
      supports: S,
      loads: e.loads
    }, m.elementInputs.val = e.elementInputs, m.deformOutputs.val = {
      deformations: e.deformations,
      reactions: e.reactions
    }, m.analyzeOutputs.val = e.analyze);
  }
  function z({ nodes: e, elements: t, supports: s, q: n, stiffnessReduction: o }) {
    const r = O(e, t), p = new Map(e.map((I, i) => [
      i,
      [
        0,
        0,
        -n * r[i],
        0,
        0,
        0
      ]
    ])), u = {
      cltLayups: new Map(t.map((I, i) => [
        i,
        q(A, o)
      ]))
    }, l = G(e, t, {
      supports: s,
      loads: p
    }, u), c = k(e, t, u, l);
    return {
      loads: p,
      elementInputs: u,
      deformations: l.deformations,
      reactions: l.reactions,
      analyze: c
    };
  }
  function E() {
    const s = [
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
      layers: s.map((o, r) => ({
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
  function q(e, t) {
    return t === 1 ? e : {
      ...e,
      layers: e.layers.map((s) => ({
        ...s,
        Ex: s.Ex / t,
        Ey: s.Ey / t,
        Gxy: s.Gxy / t,
        Gxz: s.Gxz / t,
        Gyz: s.Gyz / t
      }))
    };
  }
  function C(e) {
    return new Map(e.map((t, s) => ({
      node: t,
      i: s
    })).filter(({ node: t }) => Math.abs(t[0]) < 1e-6 || Math.abs(t[0] - d) < 1e-6 || Math.abs(t[1]) < 1e-6 || Math.abs(t[1] - f) < 1e-6).map(({ i: t }) => [
      t,
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
  function O(e, t) {
    const s = Array(e.length).fill(0);
    for (const n of t) {
      if (n.length !== 3) continue;
      const [o, r, p] = n.map((c) => e[c]), l = Math.abs((r[0] - o[0]) * (p[1] - o[1]) - (p[0] - o[0]) * (r[1] - o[1])) * 0.5 / 3;
      s[n[0]] += l, s[n[1]] += l, s[n[2]] += l;
    }
    return s;
  }
  function U() {
    const e = g({
      id: "page"
    });
    e.append(g({
      id: "viewer-wrap"
    }, N({
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
            state: v,
            options: {
              ULS: "ULS",
              SLS: "SLS"
            }
          }
        ],
        customNumbers: [
          {
            folder: "Analysis Model",
            label: "Max mesh size [m]",
            state: h,
            min: 0.01,
            max: 1.2,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "q ULS [kN/m2]",
            state: x,
            min: -50,
            max: 50,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "q SLS [kN/m2]",
            state: L,
            min: -50,
            max: 50,
            step: 0.01
          },
          {
            folder: "Analysis Inputs",
            label: "kdef",
            state: M,
            min: 0,
            step: 0.01
          }
        ]
      }
    }))), document.body.append(e);
  }
});
