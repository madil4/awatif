import { v as e, g as y, a as z } from "./styles-aHt-Mdxa.js";
import { a as S } from "./analyze-dlO8fDC-.js";
import { d as O } from "./deform-Bjt4qPV-.js";
import { g as I } from "./getParameters-DjGKBsKO.js";
import "./pureFunctionsAny.generated-HP0TxL6F.js";
import "./complex-ViNjxWW9.js";
const n = { dx: { value: e.state(2), min: 1, max: 5, step: 0.1, label: "dx (m)" }, dy: { value: e.state(2), min: 1, max: 5, step: 0.1, label: "dy (m)" }, dz: { value: e.state(2), min: 1, max: 5, step: 0.1, label: "dz (m)" }, divisions: { value: e.state(4), min: 1, max: 10, step: 1 }, load: { value: e.state(30), min: 1, max: 50, step: 0.5, label: "load (kN)" } }, c = e.state([]), f = e.state([]), h = e.state({}), x = e.state({}), b = e.state({}), g = e.state({});
e.derive(() => {
  const d = n.dx.value.val, i = n.dy.value.val, o = n.dz.value.val, l = n.divisions.value.val;
  let s = [], a = [];
  for (let t = 0; t <= l; t++) s.push([0, 0, o * t], [d, 0, o * t], [d, i, o * t], [0, i, o * t]);
  s = s.map((t) => [6 + t[0], 6 + t[1], t[2]]);
  for (let t = 0; t < l * 4; ) t += 4, a.push([t, t + 1], [t + 1, t + 2], [t + 2, t + 3], [t + 3, t]), a.push([t, t + 2]);
  for (let t = 0; t < l * 4; t++) a.push([t, t + 4]);
  for (let t = 0; t < l * 4; t += 4) a.push([t, t + 5], [t + 3, t + 6]), a.push([t, t + 7], [t + 1, t + 6]);
  const m = [true, true, true, true, true, true], r = { supports: /* @__PURE__ */ new Map([[0, m], [1, m], [2, m], [3, m]]), loads: /* @__PURE__ */ new Map([[s.length - 2, [n.load.value.val, 0, 0, 0, 0, 0]]]) }, u = { elasticities: new Map(a.map((t, p) => [p, 100])), areas: new Map(a.map((t, p) => [p, 10])) }, v = O(s, a, r, u), w = S(s, a, u, v);
  c.val = s, f.val = a, h.val = r, x.val = u, b.val = v, g.val = w;
});
document.body.append(I(n), y({ mesh: { nodes: c, elements: f, nodeInputs: h, elementInputs: x, deformOutputs: b, analyzeOutputs: g }, settingsObj: { deformedShape: true, gridSize: 15 } }), z({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/3d-structure/main.ts", author: "https://www.linkedin.com/in/madil4/" }));
