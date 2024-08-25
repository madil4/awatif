import{t as S}from"./template-G6waSV7m.js";import{a as z}from"./analyze-Cxe-sqbV.js";const b={dx:{value:2,min:1,max:5,step:.1,label:"dx (m)"},dy:{value:2,min:1,max:5,step:.1,label:"dy (m)"},dz:{value:2,min:1,max:5,step:.1,label:"dz (m)"},divisions:{value:4,min:1,max:10,step:1},load:{value:30,min:1,max:50,step:.5,label:"load (kN)"}};function g(o){var d,r,m,c,v;const p=o.dx.value,u=o.dy.value,n=o.dz.value,i=o.divisions.value;let a=[],s=[];for(let t=0;t<=i;t++)a.push([0,0,n*t],[p,0,n*t],[p,u,n*t],[0,u,n*t]);a=a.map(t=>[6+t[0],6+t[1],t[2]]);for(let t=0;t<i*4;)t+=4,s.push([t,t+1],[t+1,t+2],[t+2,t+3],[t+3,t]),s.push([t,t+2]);for(let t=0;t<i*4;t++)s.push([t,t+4]);for(let t=0;t<i*4;t+=4)s.push([t,t+5],[t+3,t+6]),s.push([t,t+7],[t+1,t+6]);const e={materials:new Map,sections:new Map,pointLoads:new Map,pointSupports:new Map};s.forEach((t,f)=>{var h,x;(h=e.materials)==null||h.set(f,{elasticity:100}),(x=e.sections)==null||x.set(f,{area:10})});const l=[!0,!0,!0,!0,!0,!0];(d=e.pointSupports)==null||d.set(0,l),(r=e.pointSupports)==null||r.set(1,l),(m=e.pointSupports)==null||m.set(2,l),(c=e.pointSupports)==null||c.set(3,l),(v=e.pointLoads)==null||v.set(a.length-2,[o.load.value,0,0,0,0,0]);const y=z(a,s,e);return{nodes:a,elements:s,analysisInputs:e,analysisOutputs:y}}S({parameters:b,onParameterChange:g,settings:{deformedShape:!0,gridSize:15}});
