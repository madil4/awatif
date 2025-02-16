import{x as l,v as a,a as $}from"./styles-Bcw5rJ3w.js";import{d as f,a as w}from"./deform-2KtVZVFZ.js";import{p as g}from"./parameters-TCmgcs1U.js";import"./_commonjsHelpers-IkB594pC.js";function x({nodes:h,nodeInputs:m,elementInputs:u,deformOutputs:p,analyzeOutputs:b}){return l`
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
      ${h.val.map((e,t)=>l`
          <tr>
            <td><div class="custom-cell-content">${t}</div></td>
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
      ${[...m.val.supports].map(([e,t])=>l`
          <tr>
            <td><div class="custom-cell-content">${e}</div></td>
            <td>
              <div class="custom-cell-content">${t[0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[2]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[3]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[4]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[5]}</div>
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
      ${[...p.val.reactions].map(([e,t])=>l`
          <tr>
            <td><div class="custom-cell-content">${e}</div></td>
            <td>
              <div class="custom-cell-content">${t[0].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[1].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${t[2].toFixed(0)}</div>
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
      ${[...b.val.normals].map(([e,t])=>l`
          <tr>
            <td><div class="custom-cell-content">${e}</div></td>
            <td>
              <div class="custom-cell-content">
                ${u.val.areas.get(e)}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">${t[0].toFixed(0)}</div>
            </td>
          </tr>
        `)}
    </table>
    <br /><br /><br />
  `}const c={xPosition:{value:a.state(600),min:0,max:1e3},zPosition:{value:a.state(0),min:0,max:500}},s=a.state([]),o=a.state([]),i=a.state({}),d=a.state({}),n=a.state({}),v=a.state({}),r={nodes:s,elements:o,nodeInputs:i,elementInputs:d,deformOutputs:n,analyzeOutputs:v};a.derive(()=>{s.val=[[250,0,0],[c.xPosition.value.val,0,c.zPosition.value.val],[250,0,400]],o.val=[[0,1],[1,2]],i.val={supports:new Map([[0,[!0,!0,!0,!0,!0,!0]],[2,[!0,!0,!0,!0,!0,!0]]]),loads:new Map([[1,[0,0,-1e3,0,0,0]]])},d.val={elasticities:new Map([[0,200],[1,200]]),areas:new Map([[0,100],[1,100]])},n.val=f(s.val,o.val,i.val,d.val),v.val=w(s.val,o.val,d.val,n.val)});document.body.append(g(c),$({structure:r,settingsObj:{gridSize:1e3},reportObj:{template:x,data:r}}));
