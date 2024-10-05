import{w as M,v as u,b as L,c as g,d as y,k as c,e as v,f as z,L as A,B as D,g as I,F as S,a as _}from"./styles-DN6OlRPm.js";function x(i,l,e){const o=document.createElement("div"),t=new M({name:Math.random().toString().substring(2),box:o,selectType:"cell",recordHeight:26,show:{columnMenu:!1,lineNumbers:!0},columns:H(i),records:b(l.rawVal)});return o.setAttribute("id","grid"),new ResizeObserver(()=>t.refresh()).observe(o),t.onChange=n=>{if(!i[n.detail.column])return;const r=i[n.detail.column].field;t.records[n.detail.index][r]=n.detail.value.new,e&&e(m(t.records,i.length))},t.onDelete=n=>{n.detail.force=!0,n.onComplete=()=>{e&&e(m(t.records,i.length))}},t.onPaste=n=>{n.onComplete=()=>{t.mergeChanges(),e&&e(m(t.records,i.length))}},u.derive(()=>{t.records=b(l.val),t.refresh()}),o}const w="ABCDEFGHIJKLMNOPRST";function b(i){const l=Array(50).fill(0).map((o,t)=>({recid:t})),e=w.split("");for(let o=0;o<i.length;o++)for(let t=0;t<i[o].length;t++)l[o][e[t]]=i[o][t];return l}function H(i){return w.split("").map(e=>({field:e,text:'<div style="text-align: center">'+e+"</div>",size:"90px",resizable:!0,sortable:!0,editable:{type:"text"}})).map(e=>{const o=i.find(t=>t.field===e.field);return o?{...e,...o}:e})}function m(i,l){let e=[...Array(i.length)].map(()=>[...Array(l)]);const o=w.split("");for(let a=0;a<e.length;a++)for(let n=0;n<e[a].length;n++)e[a][n]=i[a][o[n]]??"";return e=e.slice(0,t(e)+1),e=e.map(a=>a.map(n=>n===""?"":Number(n))),e;function t(a){for(let n=a.length-1;n>=0;n--)if(a[n].some(r=>r!==""))return n}}function B(i,l){const e=document.createElement("div"),o=document.createElement("div"),t=[],a=new Map;i.forEach((s,f)=>{t.push({id:f,text:s.text}),a.set(f,x(s.fields,s.data,r))});const n=new L({box:o,name:"tabs",active:t[0].id,flow:"up",tabs:t});e.id="sheets",o.id="tabs",e.append(a.values().next().value,o),n.onClick=s=>{e.firstChild.replaceWith(a.get(s.target))};function r(s){l&&l({sheet:n.active,data:s})}return e}function V({topLeft:i,topRight:l,main:e,preview:o,right:t}){const a=document.createElement("div"),n="border: 1px solid #efefef",r=new g({name:"topLayout",panels:[...i?[{type:"left",size:"50%",html:h(i.element)}]:[],...l?[{type:"right",size:"50%",html:h(l.element)}]:[]]});return new g({box:a,name:"layout",panels:[...i||l?[{type:"top",size:60,style:n,html:r}]:[],{type:"main",style:n,html:h(e.element),...e.title?{title:e.title}:{}},...o?[{type:"preview",size:"50%",resizable:!0,style:n,html:h(o.element),...o.title?{title:o.title}:{}}]:[],...t?[{type:"right",size:"65%",resizable:!0,style:n,html:h(t.element),...t.title?{title:t.title}:{}}]:[]]}),a.id="layout",a}function h(i){return{render:function(){this.box.append(i)}}}function G(i){const l=document.createElement("div"),e=c`<svg
      class="flex-shrink-0 size-7"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
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

    <h1>${i}</h1>`;return l.id="title",y(e,l),l}function N({getStarted:i,author:l}){const e=document.createElement("div"),o=c` <ul>
    <li>
      <div class="popup">
        <button>Get started</button>
        <div>${i}</div>
      </div>
    </li>
    <li>
      <div class="popup">
        <button>Author</button>
        <div>${l}</div>
      </div>
    </li>
    <li class="tooltip" data-tooltip="Awatif Newsletter">
      <a
        href="https://awatif.us19.list-manage.com/subscribe?u=80eec59eb329b1c9c00258524&id=95cfe71596"
        target="_blank"
        >${P}</a
      >
    </li>
    <li class="tooltip" data-tooltip="Awatif LinkedIn Page">
      <a href="https://www.linkedin.com/company/awatifsoftware" target="_blank"
        >${X}</a
      >
    </li>
    <li class="tooltip" data-tooltip="Awatif GitHub Project">
      <a href="https://github.com/madil4/awatif" target="_blank"
        >${$}</a
      >
    </li>
  </ul>`;return e.id="marketing",y(o,e),e.querySelectorAll(".tooltip").forEach((t,a)=>{t.addEventListener("mouseenter",()=>{v.show({html:t.getAttribute("data-tooltip"),name:"custom-"+a,anchor:t})}),t.addEventListener("mouseleave",()=>{v.hide("custom-"+a)})}),e.querySelectorAll(".popup").forEach(t=>{t.addEventListener("click",()=>{var a,n;z.open({title:(a=t.querySelector("button"))==null?void 0:a.textContent,body:(n=t.querySelector("div"))==null?void 0:n.outerHTML,width:600,height:450})})}),e}const X=c`<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  fill="#000000"
  version="1.1"
  id="Layer_1"
  viewBox="0 0 310 310"
  xml:space="preserve"
>
  <g id="XMLID_801_">
    <path
      id="XMLID_802_"
      d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73   C77.16,101.969,74.922,99.73,72.16,99.73z"
    />
    <path
      id="XMLID_803_"
      d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4   c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"
    />
    <path
      id="XMLID_804_"
      d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599   c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319   c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995   C310,145.43,300.549,94.761,230.454,94.761z"
    />
  </g>
</svg>`,$=c`<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 20 20"
  version="1.1"
>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g transform="translate(-140.000000, -7559.000000)" fill="#000000">
      <g id="icons" transform="translate(56.000000, 160.000000)">
        <path
          d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
          id="github-[#142]"
        ></path>
      </g>
    </g>
  </g>
</svg>`,P=c`<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="#000000"
  viewBox="0 0 20 20"
>
  <path
    d="M18 3H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM4 10h6v1H4v-1zm8 4H4v-1h8v1zm5-6h-3V5h3v3z"
  />
</svg>`,d=u.state([[0,0,0],[5,0,5],[10,0,0]]),C=u.state([]),k=new A(new D,new I),p=u.state([k]),E=new Map;E.set("polyline",{text:"Polyline",fields:[{field:"A",text:"X-coordinate",min:"25",editable:{type:"float"}},{field:"B",text:"Y-coordinate",editable:{type:"float"}},{field:"C",text:"Z-coordinate",editable:{type:"float"}}],data:d});const j=({data:i})=>d.val=i;u.derive(()=>{k.geometry.setAttribute("position",new S(d.val.flat(),3)),p.val=[...p.rawVal]});u.derive(()=>{const i=[];for(let l=0;l<d.val.length-1;l++)i.push([q(d.rawVal[l],d.rawVal[l+1]).toFixed(2),`${l} - ${l+1}`]);C.val=i});document.body.append(V({topLeft:{element:G("App Example")},topRight:{element:N({getStarted:F(),author:O()})},main:{element:B(E,j),title:"Inputs"},preview:{element:x([{field:"A",text:"Line Length"},{field:"B",text:"Between"}],C),title:"Outputs"},right:{element:_({objects3D:p})}}));function q(i,l){return Math.sqrt(Math.pow(l[0]-i[0],2)+Math.pow(l[1]-i[1],2)+Math.pow(l[2]-i[2],2))}function F(){return c`<p>
      In this short video you will learn why we build the app and how to use it:
    </p>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/SDsDUmGxNXo?si=37wdyNkapXZcaDsD"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>`}function O(){return c`<p style="line-height: 1.6">
      Hi, I'm Mohamed Adil, a passionate structural engineer and software
      developer based in Amsterdam, with extensive experience in both fields.
      While working on the design of high-rise buildings, I realized that the
      structural design process was inefficient, leading to wasted time and
      materials. This inspired me to focus on solving these challenges,
      resulting in the creation of Awatif, an open-source, web-based platform
      built with modern optimization and programming techniques to streamline
      structural design.
    </p>

    <p>
      If you'd like to chat about structural engineering, software development,
      or anything else, feel free to connect with me on LinkedIn:
      <a href="https://www.linkedin.com/in/madil4/" target="_blank"
        >https://www.linkedin.com/in/madil4/</a
      >
    </p>

    <img
      width="200"
      height="200"
      src="https://awatif.co/img/automate/mohamed.jpg"
    /> `}
