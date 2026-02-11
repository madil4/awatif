import { v as E, g as G } from "./styles-Dc2qaz2G.js";
import { c as Z } from "./coupling-CX7jvXLk.js";
import { d as j, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as B, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
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
  const P = 1e3, T = 1e3, _ = 1e-8, L = 1e-4, b = E.state(0.5), z = E.state(4.335), C = /* @__PURE__ */ new Map([
    [
      1,
      [
        0,
        0,
        0
      ]
    ],
    [
      2,
      [
        6,
        0,
        0
      ]
    ],
    [
      3,
      [
        10,
        0,
        0
      ]
    ],
    [
      4,
      [
        0,
        4,
        0
      ]
    ],
    [
      5,
      [
        6,
        4,
        0
      ]
    ],
    [
      6,
      [
        10,
        4,
        0
      ]
    ],
    [
      7,
      [
        0,
        0,
        3
      ]
    ],
    [
      8,
      [
        6,
        0,
        3
      ]
    ],
    [
      9,
      [
        10,
        0,
        3
      ]
    ],
    [
      10,
      [
        0,
        4,
        3
      ]
    ],
    [
      11,
      [
        6,
        4,
        3
      ]
    ],
    [
      12,
      [
        10,
        4,
        3
      ]
    ],
    [
      13,
      [
        0,
        0,
        6
      ]
    ],
    [
      14,
      [
        6,
        0,
        6
      ]
    ],
    [
      15,
      [
        10,
        0,
        6
      ]
    ],
    [
      16,
      [
        0,
        4,
        6
      ]
    ],
    [
      17,
      [
        6,
        4,
        6
      ]
    ],
    [
      18,
      [
        10,
        4,
        6
      ]
    ]
  ]), W = [
    {
      type: "wall",
      boundary_nodes: [
        1,
        2,
        8,
        7
      ],
      thickness: 0.2,
      openings: [
        {
          center: [
            3,
            0,
            1.5
          ],
          width: 2.5,
          height: 1.2
        }
      ]
    },
    {
      type: "wall",
      boundary_nodes: [
        7,
        8,
        14,
        13
      ],
      thickness: 0.2,
      openings: [
        {
          center: [
            3,
            0,
            4.5
          ],
          width: 2.5,
          height: 1.2
        }
      ]
    },
    {
      type: "wall",
      boundary_nodes: [
        4,
        1,
        7,
        10
      ],
      thickness: 0.2,
      openings: [
        {
          center: [
            0,
            2,
            1.5
          ],
          width: 1,
          height: 1
        }
      ]
    },
    {
      type: "wall",
      boundary_nodes: [
        10,
        7,
        13,
        16
      ],
      thickness: 0.2,
      openings: [
        {
          center: [
            0,
            2,
            4.5
          ],
          width: 1,
          height: 1
        }
      ]
    },
    {
      type: "wall",
      boundary_nodes: [
        5,
        4,
        10,
        11
      ],
      thickness: 0.2
    },
    {
      type: "wall",
      boundary_nodes: [
        11,
        10,
        16,
        17
      ],
      thickness: 0.2
    },
    {
      type: "wall",
      boundary_nodes: [
        2,
        5,
        11,
        8
      ],
      thickness: 0.2
    },
    {
      type: "wall",
      boundary_nodes: [
        8,
        11,
        17,
        14
      ],
      thickness: 0.2
    },
    {
      type: "floor",
      boundary_nodes: [
        7,
        9,
        12,
        10
      ],
      thickness: 0.25
    },
    {
      type: "roof",
      boundary_nodes: [
        13,
        15,
        18,
        16
      ],
      thickness: 0.25
    },
    {
      type: "wall",
      boundary_nodes: [
        3,
        6,
        18,
        15
      ],
      thickness: 0.2
    }
  ], X = [
    {
      start_node: 3,
      end_node: 15
    },
    {
      start_node: 6,
      end_node: 18
    }
  ], q = [
    3,
    6
  ], F = [
    [
      1,
      2
    ],
    [
      2,
      5
    ],
    [
      5,
      4
    ],
    [
      4,
      1
    ]
  ], H = [
    0.2,
    0.15,
    0.3,
    0.15,
    0.2
  ], K = [
    0,
    90,
    0,
    90,
    0
  ], U = [
    0.1,
    0.14,
    0.12,
    0.28,
    0.12,
    0.14,
    0.1
  ], V = [
    0,
    90,
    0,
    90,
    0,
    90,
    0
  ], x = /* @__PURE__ */ new Map(), S = {
    nodes: E.state([]),
    elements: E.state([]),
    nodeInputs: E.state({}),
    elementInputs: E.state({}),
    deformOutputs: E.state({}),
    analyzeOutputs: E.state({})
  };
  E.derive(() => {
    b.val, z.val, $();
  });
  document.body.append(G({
    mesh: S,
    settingsObj: {
      deformedShape: true,
      shellResults: "displacementZ",
      shellResultScales: {
        displacementX: P,
        displacementY: P,
        displacementZ: P
      },
      shellResultUnits: {
        displacementX: "mm",
        displacementY: "mm",
        displacementZ: "mm"
      },
      showFrameResults: false,
      nodes: false,
      nodesIndexes: false,
      elementsIndexes: false,
      orientations: false,
      customNumbers: [
        {
          folder: "Model",
          label: "mesh size [m]",
          state: b,
          min: 0.2,
          max: 1.2,
          step: 0.05
        },
        {
          folder: "Analysis Inputs",
          label: "q [kN/m2]",
          state: z,
          min: -20,
          max: 20,
          step: 0.1
        }
      ]
    }
  }));
  function $() {
    const t = Math.max(0.2, b.val), e = Z(L), n = /* @__PURE__ */ new Map(), c = [];
    W.forEach((d) => {
      var _a;
      const f = D(d.boundary_nodes), M = Q(d.thickness), m = d.type !== "wall";
      (((_a = d.openings) == null ? void 0 : _a.length) ? J(f, d.openings[0], e, t) : [
        Y(e, f, t)
      ]).forEach((h) => {
        h.elementMap.forEach((O) => n.set(O, M)), m && c.push(...h.elementMap);
      });
    });
    const s = e.getMesh(), r = [
      ...s.nodes
    ], i = [
      ...s.elements
    ], o = /* @__PURE__ */ new Map();
    C.forEach((d, f) => o.set(f, nt(r, d)));
    const u = [];
    X.forEach((d) => {
      const f = et(d.start_node, d.end_node);
      for (let M = 0; M < f.length - 1; M++) {
        const m = o.get(f[M]), k = o.get(f[M + 1]);
        m !== k && (u.push(i.length), i.push([
          m,
          k
        ]));
      }
    });
    const l = /* @__PURE__ */ new Map();
    q.forEach((d) => {
      const f = o.get(d);
      f !== void 0 && l.set(f, [
        true,
        true,
        true,
        true,
        true,
        true
      ]);
    }), F.forEach(([d, f]) => {
      const M = I(d), m = I(f);
      r.forEach((k, h) => {
        if (!st(k, M, m)) return;
        const O = l.get(h) ?? [
          false,
          false,
          false,
          false,
          false,
          false
        ];
        l.set(h, [
          true,
          true,
          true,
          O[3],
          O[4],
          O[5]
        ]);
      });
    });
    const p = /* @__PURE__ */ new Map();
    ot(r, i, c, z.val * T, [
      0,
      0,
      -1
    ], p);
    const a = ct(n);
    at(a, u, 0.15, 13e9, 8e8);
    const g = j(r, i, {
      supports: l,
      loads: p
    }, a, {
      includeReactions: true
    });
    S.nodes.val = r, S.elements.val = i, S.nodeInputs.val = {
      supports: l,
      loads: p
    }, S.elementInputs.val = a, S.deformOutputs.val = g, S.analyzeOutputs.val = {};
  }
  function Y(t, e, n) {
    const { nodes: c, elements: s } = B({
      points: e,
      polygon: e.map((r, i) => i),
      maxMeshSize: n
    });
    return t.appendPatch({
      nodes: c,
      elements: s
    });
  }
  function D(t) {
    const e = [], n = Array.from(C.entries());
    for (let c = 0; c < t.length; c++) {
      const s = t[c], r = t[(c + 1) % t.length], i = I(s), o = I(r), u = y(o, i), l = A(u, u);
      if (e.push(s), l < _) continue;
      const p = n.filter(([a]) => a !== s && a !== r).map(([a, g]) => {
        const d = y(g, i), f = A(d, u) / l, M = w(i, v(u, f));
        return {
          id: a,
          t: f,
          off: R(y(g, M))
        };
      }).filter((a) => a.t > _ && a.t < 1 - _ && a.off <= L).sort((a, g) => a.t - g.t).map((a) => a.id);
      e.push(...p);
    }
    return e.map((c) => I(c));
  }
  function J(t, e, n, c) {
    const s = t[0], r = t[1], i = t[3], o = y(r, s), u = y(i, s), l = R(o), p = R(u);
    if (l < _ || p < _) return [
      Y(n, t, c)
    ];
    const a = v(o, 1 / l), g = v(u, 1 / p), d = y(e.center, s), f = A(d, a), M = A(d, g), m = {
      u0: N(f - e.width / 2, 0, l),
      u1: N(f + e.width / 2, 0, l),
      v0: N(M - e.height / 2, 0, p),
      v1: N(M + e.height / 2, 0, p)
    };
    return [
      {
        u0: 0,
        u1: m.u0,
        v0: 0,
        v1: p
      },
      {
        u0: m.u1,
        u1: l,
        v0: 0,
        v1: p
      },
      {
        u0: m.u0,
        u1: m.u1,
        v0: 0,
        v1: m.v0
      },
      {
        u0: m.u0,
        u1: m.u1,
        v0: m.v1,
        v1: p
      }
    ].filter((h) => h.u1 - h.u0 > _ && h.v1 - h.v0 > _).map((h) => {
      const O = [
        w(s, w(v(a, h.u0), v(g, h.v0))),
        w(s, w(v(a, h.u1), v(g, h.v0))),
        w(s, w(v(a, h.u1), v(g, h.v1))),
        w(s, w(v(a, h.u0), v(g, h.v1)))
      ];
      return Y(n, O, c);
    });
  }
  function Q(t) {
    const e = Math.round(t * 1e6), n = x.get(e);
    if (n) return n;
    const c = t <= 0.2 ? H : U, s = t <= 0.2 ? K : V, r = {
      layers: c.map((i, o) => tt(t * i, s[o])),
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: false,
        strictSymmetryForElement: true
      }
    };
    return x.set(e, r), r;
  }
  function tt(t, e) {
    return {
      thickness: t,
      thetaDeg: e,
      Ex: 11e9,
      Ey: 37e7,
      nuXY: 0.2,
      Gxy: 69e7,
      Gxz: 69e7,
      Gyz: 69e6
    };
  }
  function et(t, e) {
    const n = I(t), c = I(e), s = y(c, n), r = A(s, s);
    return Array.from(C.entries()).map(([o, u]) => {
      const l = y(u, n), p = r < _ ? 0 : A(l, s) / r, a = w(n, v(s, p));
      return {
        id: o,
        t: p,
        off: R(y(u, a))
      };
    }).filter((o) => o.t >= -1e-4 && o.t <= 1 + L && o.off <= L).sort((o, u) => o.t - u.t).map((o) => o.id);
  }
  function nt(t, e) {
    for (let n = 0; n < t.length; n++) if (ut(t[n], e) <= L * L) return n;
    return t.push(e), t.length - 1;
  }
  function st(t, e, n) {
    const c = y(n, e), s = y(t, e), r = A(c, c);
    if (r < _) return R(y(t, e)) <= L;
    const i = N(A(s, c) / r, 0, 1), o = w(e, v(c, i));
    return R(y(t, o)) <= L;
  }
  function ot(t, e, n, c, s, r) {
    Math.abs(c) < _ || n.forEach((i) => {
      const o = e[i];
      if (!o || o.length !== 3) return;
      const u = rt(t[o[0]], t[o[1]], t[o[2]]), l = c * u / 3;
      o.forEach((p) => {
        const a = r.get(p) ?? [
          0,
          0,
          0,
          0,
          0,
          0
        ], g = [
          a[0] + l * s[0],
          a[1] + l * s[1],
          a[2] + l * s[2],
          a[3],
          a[4],
          a[5]
        ];
        r.set(p, g);
      });
    });
  }
  function ct(t) {
    return {
      cltLayups: t,
      elasticities: /* @__PURE__ */ new Map(),
      shearModuli: /* @__PURE__ */ new Map(),
      areas: /* @__PURE__ */ new Map(),
      momentsOfInertiaY: /* @__PURE__ */ new Map(),
      momentsOfInertiaZ: /* @__PURE__ */ new Map(),
      torsionalConstants: /* @__PURE__ */ new Map()
    };
  }
  function at(t, e, n, c, s) {
    const r = Math.PI * n * n, i = Math.PI * n ** 4 / 4, o = Math.PI * n ** 4 / 2;
    e.forEach((u) => {
      t.elasticities.set(u, c), t.shearModuli.set(u, s), t.areas.set(u, r), t.momentsOfInertiaY.set(u, i), t.momentsOfInertiaZ.set(u, i), t.torsionalConstants.set(u, o);
    });
  }
  function rt(t, e, n) {
    return 0.5 * R(it(y(e, t), y(n, t)));
  }
  function ut(t, e) {
    const n = t[0] - e[0], c = t[1] - e[1], s = t[2] - e[2];
    return n * n + c * c + s * s;
  }
  function w(t, e) {
    return [
      t[0] + e[0],
      t[1] + e[1],
      t[2] + e[2]
    ];
  }
  function y(t, e) {
    return [
      t[0] - e[0],
      t[1] - e[1],
      t[2] - e[2]
    ];
  }
  function v(t, e) {
    return [
      t[0] * e,
      t[1] * e,
      t[2] * e
    ];
  }
  function A(t, e) {
    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
  }
  function it(t, e) {
    return [
      t[1] * e[2] - t[2] * e[1],
      t[2] * e[0] - t[0] * e[2],
      t[0] * e[1] - t[1] * e[0]
    ];
  }
  function R(t) {
    return Math.hypot(t[0], t[1], t[2]);
  }
  function N(t, e, n) {
    return Math.max(e, Math.min(n, t));
  }
  function I(t) {
    const e = C.get(t);
    if (!e) throw new Error(`Missing model node ${t}`);
    return e;
  }
});
