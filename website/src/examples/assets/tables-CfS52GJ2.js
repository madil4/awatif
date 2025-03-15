import{w as T,v as f,b as A,L as B,B as D,c as M,F as O,g as j,a as C}from"./styles-DjWic7Oq.js";import{g as L}from"./getDialog-CcYNmxFb.js";function z({fields:r,data:s,onChange:t}){const o=document.createElement("div"),n=new T({name:Math.random().toString().substring(2),box:o,selectType:"cell",recordHeight:26,show:{columnMenu:!1,lineNumbers:!0},columns:F(r),records:v(s.rawVal,r)});return o.setAttribute("id","grid"),new ResizeObserver(()=>n.refresh()).observe(o),n.onChange=e=>{if(!r[e.detail.column])return;const i=m[e.detail.column];n.records[e.detail.index][i]=e.detail.value.new,t&&t(b(n.records,r))},n.onDelete=e=>{e.detail.force=!0,e.onComplete=()=>{t&&t(b(n.records,r))}},n.onPaste=e=>{e.onComplete=()=>{n.mergeChanges(),t&&t(b(n.records,r))}},f.derive(()=>{n.records=v(s.val,r),n.refresh()}),o}const m="ABCDEFGHIJKLMNOPRST";function F(r){return m.split("").map(t=>({field:t,text:'<div style="text-align: center">'+t+"</div>",size:"90px",resizable:!0,sortable:!0,editable:{type:"text"}})).map(t=>{const o=r.find(n=>n.field===t.field);return o?{...t,...o}:t})}function v(r,s){const t=Array.isArray(r)?r:l(r,s),o=Array(50).fill(0).map((e,i)=>({recid:i})),n=m.split("");for(let e=0;e<t.length;e++)for(let i=0;i<t[e].length;i++)o[e][n[i]]=t[e][i];return o;function l(e,i){const a=new Map;return i.forEach(c=>a.set(c.field,c)),Object.keys(e).map(c=>[a.get(c).text,e[c]])}}function b(r,s){if(m.includes(s[0].field))return o(r,s);return n(r,s);function o(l,e){let i=[...Array(l.length)].map(()=>[...Array(e.length)]);const a=m.split("");for(let u=0;u<i.length;u++)for(let d=0;d<i[u].length;d++)i[u][d]=l[u][a[d]]??"";return i.slice(0,c(i)+1);function c(u){for(let d=u.length-1;d>=0;d--)if(u[d].some(E=>E!==""))return d}}function n(l,e){return Object.fromEntries(e.map(({field:i},a)=>[i,l[a].B]))}}function G({tables:r,onChange:s}){const t=document.createElement("div"),o=document.createElement("div"),n=[],l=new Map;r.forEach((a,c)=>{n.push({id:c,text:a.text}),l.set(c,z({fields:a.fields,data:a.data,onChange:i}))});const e=new A({box:o,name:"tabs",active:n[0].id,flow:"up",tabs:n});t.id="tables",o.id="tabs",t.append(l.values().next().value,o),e.onClick=a=>{t.firstChild.replaceWith(l.get(a.target))};function i(a){s&&s({table:e.active,data:a})}return t}const g=f.state([[0,0,0],[5,0,5],[10,0,0]]),w=new B(new D,new M),p=f.state([w]),h=new Map;h.set("polyline",{text:"Polyline",fields:[{field:"A",text:"X-coordinate",min:"25",editable:{type:"float"}},{field:"B",text:"Y-coordinate",editable:{type:"float"}},{field:"C",text:"Z-coordinate",editable:{type:"float"}}],data:g});const I=({data:r})=>g.val=r;f.derive(()=>{w.geometry.setAttribute("position",new O(g.val.flat(),3)),p.val=[...p.rawVal]});const y=f.state(""),x=f.state(void 0);f.derive(()=>{y.val==="Tables"&&(x.val=G({tables:h,onChange:I}))});document.body.append(j({clickedButton:y,buttons:["Tables"],sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/tables/main.ts",author:"https://www.linkedin.com/in/madil4/"}),L({dialogBody:x}),C({objects3D:p}));
