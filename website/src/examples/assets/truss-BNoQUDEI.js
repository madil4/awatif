import{v as a,a as O}from"./styles-C0RwJedA.js";import{a as E}from"./analyze-D-xiAgwW.js";import{p as I}from"./parameters-CX96VOnA.js";import"./_commonjsHelpers-C932wzq6.js";const l={span:{value:a.state(15),min:5,max:20,step:1,label:"span (m)"},divisions:{value:a.state(5),min:2,max:5,step:1},height:{value:a.state(2),min:1,max:5,step:.1,label:"height (m)"},elasticity:{value:a.state(10),min:1,max:250,step:1,label:"Elasticity (gpa)"},area:{value:a.state(10),min:1,max:300,step:1,label:"area (cm2)"},load:{value:a.state(250),min:1,max:500,step:1,label:"load (kN)"}},d=a.state([]),h=a.state([]),f=a.state({}),y=a.state({});a.derive(()=>{var m,c;const b=l.span.value.val,e=l.divisions.value.val,S=l.height.value.val,x=l.elasticity.value.val*1e6,g=l.area.value.val*1e-4,w=l.load.value.val,p=[],s=[],u=b/e,r=[];for(let t=0;t<=e;t++){const o=[u*t,0,0];p.push(o),r.push(o)}for(let t=0;t<=e;t++)p.push([u*t,0,S]);for(let t=0;t<e;t++)s.push([t,t+1]);for(let t=0;t<e;t++)s.push([e+1+t,e+1+t+1]);for(let t=0;t<=e;t++)s.push([t,e+1+t]);for(let t=0;t<e;t++)t<e/2?s.push([t,e+1+t+1]):s.push([e+1+t,t+1]);const n={sections:new Map,materials:new Map,pointSupports:new Map,pointLoads:new Map};s.forEach((t,o)=>{var i,v;(i=n.materials)==null||i.set(o,{elasticity:x}),(v=n.sections)==null||v.set(o,{area:g})}),(m=n.pointSupports)==null||m.set(0,[!0,!0,!0,!0,!0,!0]),(c=n.pointSupports)==null||c.set(e,[!0,!0,!0,!0,!0,!0]),r.forEach((t,o)=>{var i;return(i=n.pointLoads)==null?void 0:i.set(o,[0,0,-w,0,0,0])});const M=E(p,s,n);d.val=p,h.val=s,f.val=n,y.val=M});document.body.append(I(l),O({structure:{nodes:d,elements:h,analysisInputs:f,analysisOutputs:y},settingsObj:{deformedShape:!0}}));
