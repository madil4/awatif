import { v as u, C as l, L as d, M as v, b as B, B as V, c as E, D as k, F as w, U as D, g as L, a as S } from "./styles-aHt-Mdxa.js";
import { g as A } from "./getParameters-DjGKBsKO.js";
import { m as T, __tla as __tla_0 } from "./mesh-7kUITnI2.js";
import { n as H, s as N } from "./pureFunctionsAny.generated-pdW0xjir.js";
import "./complex-ViNjxWW9.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function R(o, t = 8) {
    const e = document.createElement("div");
    e.id = "legend";
    const i = Array.from({
      length: t + 1
    }, (n, r) => r / t).reverse();
    let a, s;
    return i.forEach((n, r) => {
      a = document.createElement("div"), a.id = `marker-${r}`, a.className = "marker", a.style.marginTop = r == 0 ? "0px" : `calc(${50 / t}vh - 1px)`, s = document.createElement("p"), s.id = `marker-text-${r}`, a.append(s), e.append(a);
    }), setTimeout(() => {
      u.derive(() => {
        i.forEach((n, r) => {
          s = document.getElementById(`marker-text-${r}`), s.innerText = $(o.val, n).toString();
        });
      });
    }), e;
  }
  function $(o, t) {
    const e = Math.max(...o) - Math.min(...o);
    return (Math.min(...o) + t * e).toPrecision(3);
  }
  class j {
    constructor(t, e = 32) {
      this.isLut = true, this.lut = [], this.map = [], this.n = 0, this.minV = 0, this.maxV = 1, this.setColorMap(t, e);
    }
    set(t) {
      return t.isLut === true && this.copy(t), this;
    }
    setMin(t) {
      return this.minV = t, this;
    }
    setMax(t) {
      return this.maxV = t, this;
    }
    setColorMap(t, e = 32) {
      this.map = F[t] || F.rainbow, this.n = e;
      const i = 1 / this.n, a = new l(), s = new l();
      this.lut.length = 0, this.lut.push(new l(this.map[0][1]));
      for (let n = 1; n < e; n++) {
        const r = n * i;
        for (let m = 0; m < this.map.length - 1; m++) if (r > this.map[m][0] && r <= this.map[m + 1][0]) {
          const c = this.map[m][0], p = this.map[m + 1][0];
          a.setHex(this.map[m][1], d), s.setHex(this.map[m + 1][1], d);
          const h = new l().lerpColors(a, s, (r - c) / (p - c));
          this.lut.push(h);
        }
      }
      return this.lut.push(new l(this.map[this.map.length - 1][1])), this;
    }
    copy(t) {
      return this.lut = t.lut, this.map = t.map, this.n = t.n, this.minV = t.minV, this.maxV = t.maxV, this;
    }
    getColor(t) {
      t = v.clamp(t, this.minV, this.maxV), t = (t - this.minV) / (this.maxV - this.minV);
      const e = Math.round(t * this.n);
      return this.lut[e];
    }
    addColorMap(t, e) {
      return F[t] = e, this;
    }
    createCanvas() {
      const t = document.createElement("canvas");
      return t.width = 1, t.height = this.n, this.updateCanvas(t), t;
    }
    updateCanvas(t) {
      const e = t.getContext("2d", {
        alpha: false
      }), i = e.getImageData(0, 0, 1, this.n), a = i.data;
      let s = 0;
      const n = 1 / this.n, r = new l(), m = new l(), c = new l();
      for (let p = 1; p >= 0; p -= n) for (let h = this.map.length - 1; h >= 0; h--) if (p < this.map[h][0] && p >= this.map[h - 1][0]) {
        const C = this.map[h - 1][0], y = this.map[h][0];
        r.setHex(this.map[h - 1][1], d), m.setHex(this.map[h][1], d), c.lerpColors(r, m, (p - C) / (y - C)), a[s * 4] = Math.round(c.r * 255), a[s * 4 + 1] = Math.round(c.g * 255), a[s * 4 + 2] = Math.round(c.b * 255), a[s * 4 + 3] = 255, s += 1;
      }
      return e.putImageData(i, 0, 0), t;
    }
  }
  const F = {
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
  function G(o, t, e) {
    const i = new j(), a = new l(), s = new B(new V(), new E({
      side: k,
      vertexColors: true
    }));
    i.setColorMap("rainbow"), s.renderOrder = -1, s.geometry.setAttribute("position", new w(o.flat(), 3)), s.geometry.setIndex(new D(t.flat(), 1)), s.geometry.setAttribute("color", new w(o.map(() => [
      0,
      0,
      0
    ]).flat(), 3)), i.setMax(Math.max(...e)), i.setMin(Math.min(...e));
    for (let n = 0; n < e.length; n++) a.copy(i.getColor(e[n])).convertSRGBToLinear(), a.multiplyScalar(0.6), s.geometry.attributes.color.setXYZ(n, a.r, a.g, a.b);
    return s;
  }
  const b = {
    boundary: {
      value: u.state(10),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Boundary point"
    }
  }, x = u.state([]), g = u.state([]), M = u.state([]), f = u.state([]);
  u.derive(() => {
    const o = [
      b.boundary.value.val,
      0,
      3
    ], { nodes: t, elements: e } = T({
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
        o,
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
    x.val = t, g.val = e, f.val = P(o, x.val), M.val = [
      G(x.val, g.val, f.val)
    ];
  });
  document.body.append(A(b), L({
    mesh: {
      nodes: x,
      elements: g
    },
    objects3D: M
  }), R(f), S({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/color-map/main.ts",
    author: "https://www.linkedin.com/in/siu-kai-cheung/"
  }));
  function P(o, t) {
    return t.map((e) => H(N(e, o)));
  }
});
