import{a as f}from"./app-Cy1Y1HDw.js";import{a as g}from"./analyze-Bs8plY_w.js";const v={length:{value:10,min:1,max:20},height:{value:10,min:1,max:10},xLoad:{value:10,min:0,max:10,folder:"Loads"},area:{value:10,min:1,max:10,folder:"Sections"}};function x(e){var r,u,i;const n=e.length.value,o=e.height.value,c=e.xLoad.value,h=e.area.value,s=[[0,0,0],[0,0,o],[n,0,o],[n,0,0]],a=[[0,1],[1,2],[2,3]],t={materials:new Map,sections:new Map,pointSupports:new Map,pointLoads:new Map};(r=t.pointSupports)==null||r.set(0,[!0,!0,!0,!0,!0,!0]),(u=t.pointSupports)==null||u.set(3,[!0,!0,!0,!0,!0,!0]),(i=t.pointLoads)==null||i.set(2,[c,0,0,0,0,0]),a.forEach((L,l)=>{var p,m;(p=t.materials)==null||p.set(l,{elasticity:10,shearModulus:10}),(m=t.sections)==null||m.set(l,{area:h,momentOfInertiaY:10,momentOfInertiaZ:10,torsionalConstant:10})});const d=g(s,a,t);return{nodes:s,elements:a,analysisInputs:t,analysisOutputs:d}}f({parameters:v,onParameterChange:x,settings:{deformedShape:!0}});
