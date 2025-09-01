import { v as s, Q as S, V as r, g as w, a as b } from "./styles-CHgmIz-C.js";
import { g as D } from "./getParameters-CL7Q-jKZ.js";
const n = { xSpan: { value: s.state(16), min: 1, max: 20, step: 0.1, label: "xSpan (m)" }, xDivisions: { value: s.state(14), min: 5, max: 20, step: 1 }, ySpan: { value: s.state(5), min: 1, max: 10, step: 0.1, label: "ySpan (m)" }, yDivisions: { value: s.state(3), min: 1, max: 5, step: 1 }, height: { value: s.state(9), min: 0, max: 15, step: 0.1, label: "height (m)" }, heightOffset: { value: s.state(0), min: -10, max: 10, step: 0.1, label: "height offset (m)" } }, p = s.state([]), m = s.state([]), v = s.state({});
s.derive(() => {
  const l = n.xSpan.value.val, a = n.xDivisions.value.val, c = n.ySpan.value.val, o = n.yDivisions.value.val, h = n.height.value.val, d = n.heightOffset.value.val, f = new S(new r(0, 0, 0), new r(0 + l / 2 + d, 0, h), new r(0 + l, 0, 0)), u = [], i = [];
  for (let e = 0; e <= o; e++) u.push(...f.getPoints(a).map((t) => (t.setY(0 + e * (c / o)), t.toArray())));
  for (let e = 0; e <= (o + 1) * a; e += a + 1) for (let t = 0; t < a; t++) i.push([e + t, e + t + 1]);
  for (let e = 0; e < o * (a + 1); e += a + 1) for (let t = 0; t < a + 1; t++) i.push([t + e, t + a + 1 + e]);
  const x = [...Array(o + 1).keys()].map((e) => (a + 1) * e), g = [...Array(o + 1).keys()].map((e) => (a + 1) * e + a), y = { supports: new Map([...x.map((e) => [e, [true, true, true, true, true, true]]), ...g.map((e) => [e, [true, true, true, true, true, true]])]) };
  p.val = u, m.val = i, v.val = y;
});
document.body.append(D(n), w({ mesh: { nodes: p, elements: m, nodeInputs: v } }), b({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/curves/main.ts", author: "https://www.linkedin.com/in/madil4/" }));
