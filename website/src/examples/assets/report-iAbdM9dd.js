import{x as r,P as T,n as x,h as z,B as k,v as o,a as F}from"./mesh-C5fwTkzS.js";import{a as B}from"./analyze-DePZ1cOi.js";import{d as L}from"./deform-Chmj3czJ.js";import{p as R}from"./parameters--FWeuLCN.js";const C=({nodes:t,elements:n,nodeInputs:l,elementInputs:a,deformOutputs:d,analyzeOutputs:i})=>r`
    <br />
    <header class="header">
      <div class="header-left">
        <h6>Report</h6>
        <p class="bold">
          <a href="https://awatif.co" target="_blank">Awatif.co</a>
        </p>
        <p class="normal" id="reportDate">
          ${new Date().toLocaleDateString("en-US",{day:"numeric",month:"long",year:"numeric"})}
        </p>
      </div>
      <div class="header-right">
        <svg
          class="flex-shrink-0 size-7"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 -3 35 35"
          fill="#015f73"
        >
          <path
            d="M2,29.14l9.86-16.87c1.86,3.34,4.56,7.62,3.34,11.57a7.61,7.61,0,0,1-2.61,3.68,7.78,7.78,0,0,1-5,1.61c-1.48,0-3,0-4.47,0A4.5,4.5,0,0,0,2,29.14Z"
          ></path>
          <path
            d="M12.86,10.43l5.71-10L35.12,29.14H31a13.92,13.92,0,0,1-8.44-3.54,18.23,18.23,0,0,1-3.44-4.5c-.55-.92-1.08-1.85-1.61-2.79-1.25-2.21-2.56-4.39-3.85-6.58Z"
          ></path>
        </svg>
      </div>
    </header>

    <br />
    <h1>Bars</h1>

    <br />
    <h2>Nodes</h2>
    <p class="text">
      The following table gives an overview of the node coordinates.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>xCoord</th>
        <th>yCoord</th>
        <th>zCoord</th>
      </tr>
      ${t.val.map((e,s)=>r`
          <tr>
            <td><div class="custom-cell-content">${s}</div></td>
            <td>
              <div class="custom-cell-content">${e[0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${e[1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${e[2]}</div>
            </td>
          </tr>
        `)}
    </table>

    <br />
    <h2>Supports</h2>
    <p class="text">
      The following table gives an overview of the support conditions.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>ux</th>
        <th>uy</th>
        <th>uz</th>
        <th>mx</th>
        <th>my</th>
        <th>mz</th>
      </tr>
      ${[...l.val.supports].map(([e,s])=>r`
          <tr>
            <td><div class="custom-cell-content">${e}</div></td>
            <td>
              <div class="custom-cell-content">${s[0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${s[1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${s[2]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${s[3]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${s[4]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${s[5]}</div>
            </td>
          </tr>
        `)}
    </table>

    <br />
    <h2>Reactions</h2>
    <p class="text">
      The following table gives an overview of the reaction forces.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>Fx</th>
        <th>Fy</th>
        <th>Fz</th>
      </tr>
      ${[...d.val.reactions].map(([e,s])=>r`
          <tr>
            <td><div class="custom-cell-content">${e}</div></td>
            <td>
              <div class="custom-cell-content">${s[0].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${s[1].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${s[2].toFixed(0)}</div>
            </td>
          </tr>
        `)}
    </table>

    <br />
    <h2>Elements</h2>
    <p class="text">
      The following table gives an overview of the element results.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Bar</th>
        <th>Area</th>
        <th>Normal</th>
      </tr>
      ${[...i.val.normals].map(([e,s])=>r`
          <tr>
            <td><div class="custom-cell-content">${e}</div></td>
            <td>
              <div class="custom-cell-content">
                ${a.val.areas.get(e)}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">${s[0].toFixed(0)}</div>
            </td>
          </tr>
        `)}
    </table>
    <br /><br /><br />
  `;function H(t){const n=new T({expanded:!0}),l=n.addFolder({title:"awatif.co",expanded:!1}),a=l.addButton({title:"github"}),d=l.addButton({title:"linkedIn"}),i=l.addButton({title:"newsletter"});a.on("click",()=>{window.open("https://github.com/madil4/awatif","_blank")}),d.on("click",()=>{window.open("https://www.linkedin.com/company/awatifsoftware","_blank")}),i.on("click",()=>{window.open("https://awatif.us19.list-manage.com/subscribe?u=80eec59eb329b1c9c00258524&id=95cfe71596","_blank")});const e=n.addFolder({title:"design",expanded:!0});return t.map(v=>e.addButton({title:v}))}function M({template:t,data:n}){const l=document.createElement("div");let a=z(),d=z();const i=r`
      <dialog open class="dialog-input" ref=${x(a)}>
        <div class="resize-handle resize-handle-right"></div>
        <div class="resize-handle resize-handle-top"></div>
        <div class="dialog-header">
          <span class="close" @click=${()=>{var e;return(e=a.value)==null?void 0:e.close()}}>&times;</span>
        </div>
        <div class="dialog-body" ref=${x(d)}>
          <div class="input-content">
            <!-- Content generated from the template -->
          </div>
        </div>
      </dialog>
    `;return k(i,l),N(a.value),o.derive(()=>{k(t(n),d.value)}),l}function N(t){if(!t)return;const n=t.querySelector(".resize-handle-right"),l=t.querySelector(".resize-handle-top");let a=!1,d=0,i=0,e=0,s=0,v=0;n.addEventListener("mousedown",c=>{a=!0,d=c.clientX,e=t.offsetWidth,document.body.style.cursor="ew-resize",c.preventDefault()}),l.addEventListener("mousedown",c=>{a=!0,i=c.clientY,s=t.offsetHeight,v=parseFloat(getComputedStyle(t).top)||0,document.body.style.cursor="ns-resize",c.preventDefault()}),document.addEventListener("mousemove",c=>{if(a){if(document.body.style.cursor==="ew-resize"){const h=e+(c.clientX-d);t.style.width=`${h}px`}if(document.body.style.cursor==="ns-resize"){const h=c.clientY-i,$=s-h,S=v+h;$>100&&(t.style.height=`${$}px`,t.style.top=`${S}px`)}}}),document.addEventListener("mouseup",()=>{a=!1,document.body.style.cursor="default"})}const f={xPosition:{value:o.state(600),min:0,max:1e3},zPosition:{value:o.state(0),min:0,max:500}},u=o.state([]),m=o.state([]),w=o.state({}),p=o.state({}),g=o.state({}),E=o.state({});o.derive(()=>{u.val=[[250,0,0],[f.xPosition.value.val,0,f.zPosition.value.val],[250,0,400]],m.val=[[0,1],[1,2]],w.val={supports:new Map([[0,[!0,!0,!0,!0,!0,!0]],[2,[!0,!0,!0,!0,!0,!0]]]),loads:new Map([[1,[0,0,-1e3,0,0,0]]])},p.val={elasticities:new Map([[0,200],[1,200]]),areas:new Map([[0,100],[1,100]])},g.val=L(u.val,m.val,w.val,p.val),E.val=B(u.val,m.val,p.val,g.val)});let y={nodes:u,elements:m,nodeInputs:w,elementInputs:p,deformOutputs:g,analyzeOutputs:E};const b=H(["report"]);for(let t=0;t<b.length;t+=1)b[t].title==="report"&&b[t].on("click",()=>{console.log("Report button clicked");const n=M({template:()=>C(y)});console.log(y),document.body.appendChild(n)});document.body.append(R(f),F({structure:y,settingsObj:{gridSize:1e3}}));
