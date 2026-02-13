import { w as F, x as u } from "./styles-I_-DKBYJ.js";
function N({ onToolbarClick: r, onClearPoints: t }) {
  const a = document.createElement("div");
  return a.id = "drawing-toolbar", new F({ name: "toolbar", box: a, items: [{ type: "radio", id: "1st-floor", text: "Columns", checked: true, tooltip: "Create Columns" }, { type: "radio", id: "2nd-floor", text: "Slab", tooltip: "Create Slab" }, { type: "break" }, { type: "button", id: "clear-points", text: "Clear Points", tooltip: "Remove all points of selected level", icon: "w2ui-icon-cross" }], onClick(o) {
    o.target === "clear-points" ? t() : r(o.target);
  } }), a;
}
function _() {
  const r = document.createElement("div"), t = navigator.userAgent.includes("Macintosh");
  r.className = "snap-tip", r.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${t ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, r.classList.add("show"), document.addEventListener("keydown", (o) => {
    (o.ctrlKey || o.metaKey) && r.classList.remove("show");
  });
  const a = document.createElement("style");
  return a.textContent = `
  @media (max-width: 600px) {
    .snap-tip {
      display: none;
    }
  }
`, document.head.appendChild(a), r;
}
function E(r, t, a, o, y, w) {
  const c = a - 1, m = t * a + o * c, d = Array.from({ length: a + c }, (e, n) => n % 2 === 0 ? t : o);
  let h = [0], p = 0;
  for (let e of d) p += e, h.push(p);
  const i = h.map((e) => e - m / 2);
  let s = 0, b = [];
  const g = 1e3;
  for (let e = 0; e < d.length; e++) {
    let n = d[e], S = g * n ** 3 / 12, $ = g * n, L = i[e + 1], v = S + $ * L ** 2;
    b.push(v), s += v;
  }
  const l = i.map((e) => Number((y * 1e6 * e / s).toFixed(2))), C = Math.max(...l), x = r.f_mk * w, f = l.map((e) => Number((e / x).toFixed(2))), M = Math.max(...f);
  return { slabHeight: m, thicknesses: d, zCordsFromMid: i, inertiaList: b, inertia: s, bendingStresses: l, bendingStressMax: C, f_md: x, eta: f, etaMax: M };
}
const T = "" + new URL("awatif-logo-DnnuEFJ2.png", import.meta.url).href, k = "" + new URL("clt-bending-stress-DvR3Ux1R.png", import.meta.url).href, z = ({ designMomentInput: r, designOutputs: t }) => u`
    <div id="report">
      <header class="header">
        <div class="header-left">
          <p class="header-title">Report</p>
          <a href="https://awatif.co" class="header-link" target="_blank"
            >https://awatif.co</a
          >
        </div>
        <div class="header-right">
          <img src="${T}" id="headerLogo" />
        </div>
      </header>

      <br />
      <h1>Cross-Laminated Timber (CLT)</h1>
      <p class="caption">EN 1995-1-1: 2004</p>

      <br />
      <h2>Bending Design</h2>
      <p class="caption">EN 1995-1-1: 2004</p>
      <p class="p1">The following shows the results of the maximum node.</p>

      <h3>Summary Table</h3>
      <table>
        <tr>
          <th>Property</th>
          <th>Value</th>
          <th>Unit</th>
        </tr>
        <tr>
          <td>Slab Height</td>
          <td>${t.val.slabHeight}</td>
          <td>mm</td>
        </tr>
        <tr>
          <td>Moment of Inertia</td>
          <td>${t.val.inertia.toFixed(0)}</td>
          <td>mm⁴</td>
        </tr>
        <tr>
          <td>Bending Moment</td>
          <td>${r.val.toFixed(1)}</td>
          <td>kNm</td>
        </tr>
        <tr>
          <td>Bending Stress</td>
          <td>${t.val.bendingStressMax.toFixed(1)}</td>
          <td>N/mm²</td>
        </tr>
        <tr>
          <td>Bending Resistance</td>
          <td>${t.val.f_md.toFixed(1)}</td>
          <td>N/mm²</td>
        </tr>
        <tr>
          <td>Maximum Utilization Ratio</td>
          <td>${(t.val.etaMax * 100).toFixed(0)}</td>
          <td>%</td>
        </tr>
      </table>

      <br />

      <h3>Bending Stress Layout Table</h3>
      <table>
        <tr>
          <th>Layer</th>
          <th>z-Coordinate</th>
          <th>Bending Stress</th>
          <th>Utilization Ratio</th>
        </tr>
        <tbody id="stressTable">
          ${t.val.bendingStresses.map((a, o) => u`
              <tr>
                <td>Layer ${o + 1}</td>
                <td>${t.val.zCordsFromMid[o]} mm</td>
                <td>${a.toFixed(2)} N/mm²</td>
                <td>${(t.val.eta[o] * 100).toFixed(0)}%</td>
              </tr>
            `)}
        </tbody>
      </table>

      <br /><br />

      <h3>Structural Sketch</h3>
      <img
        id="threeCanvas"
        width="600"
        height="400"
        style="border:1px solid #ccc;"
        src=${k}
      />

      <br /><br />
    </div>
  `;
export {
  z as a,
  _ as b,
  N as c,
  E as g
};
