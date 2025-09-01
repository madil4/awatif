import { E as v, v as _, e as m, x as y } from "./styles-CHgmIz-C.js";
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const g = (t) => t.strings === void 0;
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const Y = { CHILD: 2 }, C = (t) => (...e) => ({ _$litDirective$: t, values: e });
class w {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, i) {
    this._$Ct = e, this._$AM = s, this._$Ci = i;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const l = (t, e) => {
  var _a;
  const s = t._$AN;
  if (s === void 0) return false;
  for (const i of s) (_a = i._$AO) == null ? void 0 : _a.call(i, e, false), l(i, e);
  return true;
}, c = (t) => {
  let e, s;
  do {
    if ((e = t._$AM) === void 0) break;
    s = e._$AN, s.delete(t), t = e;
  } while ((s == null ? void 0 : s.size) === 0);
}, p = (t) => {
  for (let e; e = t._$AM; t = e) {
    let s = e._$AN;
    if (s === void 0) e._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(t)) break;
    s.add(t), H(e);
  }
};
function z(t) {
  this._$AN !== void 0 ? (c(this), this._$AM = t, p(this)) : this._$AM = t;
}
function b(t, e = false, s = 0) {
  const i = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (e) if (Array.isArray(i)) for (let r = s; r < i.length; r++) l(i[r], false), c(i[r]);
  else i != null && (l(i, false), c(i));
  else l(this, t);
}
const H = (t) => {
  t.type == Y.CHILD && (t._$AP ?? (t._$AP = b), t._$AQ ?? (t._$AQ = z));
};
class M extends w {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, s, i) {
    super._$AT(e, s, i), p(this), this.isConnected = e._$AU;
  }
  _$AO(e, s = true) {
    var _a, _b;
    e !== this.isConnected && (this.isConnected = e, e ? (_a = this.reconnected) == null ? void 0 : _a.call(this) : (_b = this.disconnected) == null ? void 0 : _b.call(this)), s && (l(this, e), c(this));
  }
  setValue(e) {
    if (g(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const s = [...this._$Ct._$AH];
      s[this._$Ci] = e, this._$Ct._$AI(s, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const x = () => new E();
class E {
}
const d = /* @__PURE__ */ new WeakMap(), L = C(class extends M {
  render(t) {
    return v;
  }
  update(t, [e]) {
    var _a;
    const s = e !== this.Y;
    return s && this.Y !== void 0 && this.rt(void 0), (s || this.lt !== this.ct) && (this.Y = e, this.ht = (_a = t.options) == null ? void 0 : _a.host, this.rt(this.ct = t.element)), v;
  }
  rt(t) {
    if (this.isConnected || (t = void 0), typeof this.Y == "function") {
      const e = this.ht ?? globalThis;
      let s = d.get(e);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), d.set(e, s)), s.get(this.Y) !== void 0 && this.Y.call(this.ht, void 0), s.set(this.Y, t), t !== void 0 && this.Y.call(this.ht, t);
    } else this.Y.value = t;
  }
  get lt() {
    var _a, _b;
    return typeof this.Y == "function" ? (_a = d.get(this.ht ?? globalThis)) == null ? void 0 : _a.get(this.Y) : (_b = this.Y) == null ? void 0 : _b.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function D({ dialogBody: t }) {
  const e = document.createElement("div"), s = x();
  function i() {
    return y`
      <dialog ref=${L(s)}>
        <div class="dialog-header">
          <span class="close" @click=${o}>&times;</span>
        </div>

        <div class="dialog-body">${t.val}</div>

        <div class="resize-handle resize-handle-right"></div>
        <div class="resize-handle resize-handle-top"></div>
      </dialog>
    `;
  }
  e.id = "dialog", _.derive(() => {
    m(i(), e);
  }), _.derive(() => {
    var _a;
    t.val && ((_a = s.value) == null ? void 0 : _a.show());
  });
  function o() {
    var _a;
    (_a = s.value) == null ? void 0 : _a.close(), t.val = void 0;
  }
  return N(s.value), e;
}
function N(t) {
  if (!t) return;
  const e = t.querySelector(".resize-handle-right"), s = t.querySelector(".resize-handle-top");
  let i = false, o = 0, r = 0, a = 0, u = 0, $ = 0;
  e.addEventListener("mousedown", (n) => {
    i = true, o = n.clientX, a = t.offsetWidth, document.body.style.cursor = "ew-resize", n.preventDefault();
  }), s.addEventListener("mousedown", (n) => {
    i = true, r = n.clientY, u = t.offsetHeight, $ = parseFloat(getComputedStyle(t).top) || 0, document.body.style.cursor = "ns-resize", n.preventDefault();
  }), document.addEventListener("mousemove", (n) => {
    if (i) {
      if (document.body.style.cursor === "ew-resize") {
        const h = a + (n.clientX - o);
        t.style.width = `${h}px`;
      }
      if (document.body.style.cursor === "ns-resize") {
        const h = n.clientY - r, f = u - h, A = $ + h;
        f > 100 && (t.style.height = `${f}px`, t.style.top = `${A}px`);
      }
    }
  }), document.addEventListener("mouseup", () => {
    i = false, document.body.style.cursor = "default";
  });
}
export {
  D as g
};
