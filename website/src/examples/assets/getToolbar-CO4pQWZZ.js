import{x as o,h as p}from"./styles-BT9ucHwM.js";function w({buttons:e,clickedButton:l,author:c,sourceCode:i}){const a=document.createElement("div"),s=o`
    <div class="buttons-container">
      ${e==null?void 0:e.map(t=>o`<button class="btn btn-text" @click=${d}>
            ${t}
          </button>`)}
      <button class="btn btn-icon" @click=${r}>
        ${m()}
      </button>
    </div>

    <div id="dropdown-menu" style="display: none;">
      <a
        href="${i||"https://github.com/madil4/awatif"}"
        class="dropdown-link"
        >Source Code</a
      >
      ${c?o`<a href="${c}" class="dropdown-link">Message Author</a>`:""}
      <a href="https://awatif.co/examples" class="dropdown-link"
        >More Examples</a
      >
    </div>
  `;a.id="toolbar",p(s,a);function d(t){const n=t.target;l.val="",setTimeout(()=>l.val=n.innerText)}function r(t){const n=document.getElementById("dropdown-menu");n.style.display=n.style.display==="block"?"none":"block"}return a}function m(){return o`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 35 35">
    <path
      d="M2,29.14l9.86-16.87c1.86,3.34,4.56,7.62,3.34,11.57a7.61,7.61,0,0,1-2.61,3.68,7.78,7.78,0,0,1-5,1.61c-1.48,0-3,0-4.47,0A4.5,4.5,0,0,0,2,29.14Z"
    ></path>
    <path
      d="M12.86,10.43l5.71-10L35.12,29.14H31a13.92,13.92,0,0,1-8.44-3.54,18.23,18.23,0,0,1-3.44-4.5c-.55-.92-1.08-1.85-1.61-2.79-1.25-2.21-2.56-4.39-3.85-6.58Z"
    ></path>
  </svg>`}export{w as g};
