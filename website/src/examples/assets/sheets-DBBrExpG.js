import{w as L,v as h,b as I,c as y,x as b,B as k,L as B,d as D,e as O,F as S,a as j,m as T}from"./mesh-Cs8aYJBQ.js";function x({fields:e,data:t,onChange:n}){const s=document.createElement("div"),r=new L({name:Math.random().toString().substring(2),box:s,selectType:"cell",recordHeight:26,show:{columnMenu:!1,lineNumbers:!0},columns:H(e),records:v(t.rawVal,e)});return s.setAttribute("id","grid"),new ResizeObserver(()=>r.refresh()).observe(s),r.onChange=i=>{if(!e[i.detail.column])return;const l=p[i.detail.column];r.records[i.detail.index][l]=i.detail.value.new,n&&n(w(r.records,e))},r.onDelete=i=>{i.detail.force=!0,i.onComplete=()=>{n&&n(w(r.records,e))}},r.onPaste=i=>{i.onComplete=()=>{r.mergeChanges(),n&&n(w(r.records,e))}},h.derive(()=>{r.records=v(t.val,e),r.refresh()}),s}const p="ABCDEFGHIJKLMNOPRST";function H(e){return p.split("").map(n=>({field:n,text:'<div style="text-align: center">'+n+"</div>",size:"90px",resizable:!0,sortable:!0,editable:{type:"text"}})).map(n=>{const s=e.find(r=>r.field===n.field);return s?{...n,...s}:n})}function v(e,t){const n=Array.isArray(e)?e:o(e,t),s=Array(50).fill(0).map((i,l)=>({recid:l})),r=p.split("");for(let i=0;i<n.length;i++)for(let l=0;l<n[i].length;l++)s[i][r[l]]=n[i][l];return s;function o(i,l){const a=new Map;return l.forEach(c=>a.set(c.field,c)),Object.keys(i).map(c=>[a.get(c).text,i[c]])}}function w(e,t){if(p.includes(t[0].field))return s(e,t);return r(e,t);function s(o,i){let l=[...Array(o.length)].map(()=>[...Array(i.length)]);const a=p.split("");for(let u=0;u<l.length;u++)for(let d=0;d<l[u].length;d++)l[u][d]=o[u][a[d]]??"";return l.slice(0,c(l)+1);function c(u){for(let d=u.length-1;d>=0;d--)if(u[d].some(M=>M!==""))return d}}function r(o,i){return Object.fromEntries(i.map(({field:l},a)=>[l,o[a].B]))}}function C({sheets:e,onChange:t}){const n=document.createElement("div"),s=document.createElement("div"),r=[],o=new Map;e.forEach((a,c)=>{r.push({id:c,text:a.text}),o.set(c,x({fields:a.fields,data:a.data,onChange:l}))});const i=new I({box:s,name:"tabs",active:r[0].id,flow:"up",tabs:r});n.id="sheets",s.id="tabs",n.append(o.values().next().value,s),i.onClick=a=>{n.firstChild.replaceWith(o.get(a.target))};function l(a){t&&t({sheet:i.active,data:a})}return n}function F({topLeft:e,topRight:t,main:n,preview:s,right:r}){const o=document.createElement("div"),i="border: 1px solid #efefef",l=new y({name:"topLayout",panels:[...e?[{type:"left",size:"50%",html:f(e.element)}]:[],...t?[{type:"right",size:"50%",html:f(t.element)}]:[]]});return new y({box:o,name:"layout",panels:[...e||t?[{type:"top",size:60,style:i,html:l}]:[],{type:"main",style:i,html:f(n.element),...n.title?{title:n.title}:{}},...s?[{type:"preview",size:"50%",resizable:!0,style:i,html:f(s.element),...s.title?{title:s.title}:{}}]:[],...r?[{type:"right",size:"65%",resizable:!0,style:i,html:f(r.element),...r.title?{title:r.title}:{}}]:[]]}),o.id="layout",o}function f(e){return{render:function(){this.box.append(e)}}}function V(e){const t=document.createElement("div"),n=b`<svg
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

    <h1>${e}</h1>`;return t.id="title",k(n,t),t}const m=h.state([[0,0,0],[5,0,5],[10,0,0]]),E=h.state([]),A=new B(new D,new O),g=h.state([A]),z=new Map;z.set("polyline",{text:"Polyline",fields:[{field:"A",text:"X-coordinate",min:"25",editable:{type:"float"}},{field:"B",text:"Y-coordinate",editable:{type:"float"}},{field:"C",text:"Z-coordinate",editable:{type:"float"}}],data:m});const G=({data:e})=>m.val=e;h.derive(()=>{A.geometry.setAttribute("position",new S(m.val.flat(),3)),g.val=[...g.rawVal]});h.derive(()=>{const e=[];for(let t=0;t<m.val.length-1;t++)e.push([N(m.rawVal[t],m.rawVal[t+1]).toFixed(2),`${t+1} - ${t+2}`]);E.val=e});document.body.append(F({topLeft:{element:V("Sheets Example")},topRight:{element:T({getStarted:P(),author:R()})},main:{element:C({sheets:z,onChange:G}),title:"Inputs"},preview:{element:x({fields:[{field:"A",text:"Line Length"},{field:"B",text:"Between"}],data:E}),title:"Outputs"},right:{element:j({objects3D:g})}}));function N(e,t){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)+Math.pow(t[2]-e[2],2))}function P(){return b`<p>In this video you will learn why we build this platform:</p>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/hHQiSyCfIeA?si=tD5DmVvki1uJxU4i"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>`}function R(){return b`<p style="line-height: 1.6">
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
      src="https://awatif.co/img/services/mohamed.jpg"
    /> `}
