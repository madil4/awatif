import{a as v}from"./app-Cy1Y1HDw.js";import{a as d}from"./analyze-Bs8plY_w.js";const g={meshDensity:{value:7,min:1,max:7,step:1,label:"mesh density"},span:{value:10,min:1,max:20},height:{value:10,min:1,max:10},load:{value:10,min:0,max:20}};function f(a){var p,r,l;const n=[],u=[],s=a.meshDensity.value;n.push(...[...Array(s+1).keys()].map(e=>[0,0,a.height.value/s*e])),u.push(...[...Array(s).keys()].map(e=>[e,e+1]));let t=n.length;n.push(...[...Array(s).keys()].map(e=>[a.span.value/s*(e+1),0,a.height.value])),u.push(...[...Array(s-1).keys()].map(e=>[t+e,t+e+1])),u.push([t-1,t]),t=n.length;const y=t-1;n.push(...[...Array(s).keys()].map(e=>[a.span.value,0,a.height.value-a.height.value/s*(e+1)])),u.push(...[...Array(s-1).keys()].map(e=>[t+e,t+e+1])),u.push([t-1,t]);const o={sections:new Map,materials:new Map,pointSupports:new Map,pointLoads:new Map};u.forEach((e,h)=>{var i,m;(i=o.materials)==null||i.set(h,{elasticity:10,shearModulus:10}),(m=o.sections)==null||m.set(h,{area:10,torsionalConstant:10,momentOfInertiaY:10,momentOfInertiaZ:10})}),(p=o.pointSupports)==null||p.set(0,[!0,!0,!0,!0,!0,!0]),(r=o.pointSupports)==null||r.set(n.length-1,[!0,!0,!0,!0,!0,!0]),(l=o.pointLoads)==null||l.set(y,[a.load.value,0,0,0,0,0]);const c=d(n,u,o);return{nodes:n,elements:u,analysisInputs:o,analysisOutputs:c}}v({parameters:g,onParameterChange:f,settings:{deformedShape:!0}});
