import{o as r}from"./styles-CRQ6mFCx.js";function f(o){const t=document.createElement("div"),n=new r({title:"Parameters",container:t}),d=i(o),s=new Map;return t.setAttribute("id","parameters"),s.set("root",n),Object.entries(o).forEach(([l,e])=>{var c;e.folder&&!s.get(e.folder)&&s.set(e.folder,n.addFolder({title:e.folder})),(c=s.get(e.folder??"root"))==null||c.addBinding(d,l,{min:e.min||0,max:e.max||50,step:e.step||.5,label:e.label||l})}),n.on("change",l=>{o[l.target.key].value.val=l.value}),t}const i=o=>Object.entries(o).reduce((t,[n,d])=>(t[n]=d.value.val,t),{});export{f as g};
