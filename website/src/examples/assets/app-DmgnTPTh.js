import{w as v,b as g,c as E,d as m,e as z,k as A,L as M,B as I,f as D,a as k,F as B,v as L}from"./styles-Buip9zH3.js";function O(t,s,r,n){const a=document.createElement("div"),o={size:"120px",resizable:!1},e=new v({box:a,name:Z(t),selectType:"cell",show:{columnMenu:!1},columns:[{...o,field:"recid",text:"Index",size:"50px",style:"background-color: #f4f6f9"},...s.map(i=>({...o,...i}))],records:C(r),contextMenu:[{id:"delete",text:"Delete row",icon:"w2ui-icon-cross"},{id:"Insert",text:"Insert row",icon:"w2ui-icon-plus"}],onDelete:i=>i.preventDefault()});let c=e.records.length;return a.setAttribute("id","grid"),e.onChange=i=>{const u=s[i.detail.column-1].field;e.records[i.detail.index][u]=i.detail.value.new,n&&n({name:e.name,data:p(e.records,Array.isArray(r))})},e.onContextMenuClick=i=>{const u=i.detail.menuItem.id;u=="delete"&&(e.records=e.records.filter(x=>x.recid!=i.detail.recid)),u=="Insert"&&e.records.push({recid:c++}),e.refresh(),n&&n({name:e.name,data:p(e.records,Array.isArray(r))})},new ResizeObserver(()=>e.refresh()).observe(a),a}function C(t){if(Array.isArray(t))return t.map((r,n)=>({recid:n,...r}));const s=[];return t.forEach((r,n)=>s.push({recid:n,...r})),s}function p(t,s){if(s)return t.map(n=>{const{recid:a,w2ui:o,...e}=n;return Object.values(e)});const r=new Map;return t.forEach(n=>{const{recid:a,w2ui:o,...e}=n;r.set(a,e)}),r}function Z(t){return t.replace(/[^a-zA-Z0-9-_]/g,"")}function j(t,s){const r=document.createElement("div"),n=document.createElement("div"),a=({name:l,data:i})=>{s&&s({sheet:l,data:i})},o=[],e=new Map;t.forEach((l,i)=>{o.push({id:i,text:l.text}),e.set(i,O(i,l.columns,l.data,a))});const c=new g({box:n,name:"tabs",active:o[0].id,flow:"up",tabs:o});return r.id="sheets",n.id="tabs",r.append(e.values().next().value,n),c.onClick=l=>{r.firstChild.replaceWith(e.get(l.target)),E[l.target].refresh()},r}function F({topLeft:t,topRight:s,main:r,preview:n,right:a}){const o=document.createElement("div"),e="border: 1px solid #efefef",c=new m({name:"topLayout",panels:[...t?[{type:"left",size:"50%",html:d(t)}]:[],...s?[{type:"right",html:d(s)}]:[]]});return new m({box:o,name:"layout",panels:[...t||s?[{type:"top",size:60,style:e,html:c}]:[],{type:"main",style:e,html:d(r)},...n?[{type:"preview",size:"50%",resizable:!0,style:e,html:d(n)}]:[],...a?[{type:"right",size:"65%",resizable:!0,style:e,html:d(a)}]:[]]}),o.id="layout",o}function d(t){return{render:function(){this.box.append(t)}}}function G(t){const s=document.createElement("div"),r=A`<svg
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

    <h1>${t}</h1>`;return s.id="title",z(r,s),s}const h=[[0,0,0],[5,0,5],[10,0,0]],w=new M(new I,new D),f=L.state([w]),b=new Map;b.set("polyline",{text:"Polyline",data:h,columns:[{field:"0",text:"X-coordinate",editable:{type:"float"}},{field:"1",text:"Y-coordinate",editable:{type:"float"}},{field:"2",text:"Z-coordinate",editable:{type:"float"}}]});const y=({data:t})=>{w.geometry.setAttribute("position",new B(t.flat(),3)),f.val=[...f.rawVal]};y({data:h});document.body.append(F({topLeft:G("App Example"),main:j(b,y),right:k({objects3D:f})}));