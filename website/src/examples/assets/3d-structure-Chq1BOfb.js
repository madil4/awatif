import{v as e,g as y}from"./styles-CRQ6mFCx.js";import{a as z}from"./analyze-CrVriBdi.js";import{d as S}from"./deform-BAYIOx97.js";import{g as O}from"./getParameters-DvaQSv0e.js";import{g as I}from"./getToolbar-BgBPgu-B.js";import"./pureFunctionsAny.generated-CUnD8y8X.js";import"./complex-i8qiIvCl.js";const o={dx:{value:e.state(2),min:1,max:5,step:.1,label:"dx (m)"},dy:{value:e.state(2),min:1,max:5,step:.1,label:"dy (m)"},dz:{value:e.state(2),min:1,max:5,step:.1,label:"dz (m)"},divisions:{value:e.state(4),min:1,max:10,step:1},load:{value:e.state(30),min:1,max:50,step:.5,label:"load (kN)"}},c=e.state([]),f=e.state([]),h=e.state({}),x=e.state({}),b=e.state({}),g=e.state({});e.derive(()=>{const d=o.dx.value.val,i=o.dy.value.val,n=o.dz.value.val,l=o.divisions.value.val;let s=[],a=[];for(let t=0;t<=l;t++)s.push([0,0,n*t],[d,0,n*t],[d,i,n*t],[0,i,n*t]);s=s.map(t=>[6+t[0],6+t[1],t[2]]);for(let t=0;t<l*4;)t+=4,a.push([t,t+1],[t+1,t+2],[t+2,t+3],[t+3,t]),a.push([t,t+2]);for(let t=0;t<l*4;t++)a.push([t,t+4]);for(let t=0;t<l*4;t+=4)a.push([t,t+5],[t+3,t+6]),a.push([t,t+7],[t+1,t+6]);const m=[!0,!0,!0,!0,!0,!0],r={supports:new Map([[0,m],[1,m],[2,m],[3,m]]),loads:new Map([[s.length-2,[o.load.value.val,0,0,0,0,0]]])},u={elasticities:new Map(a.map((t,p)=>[p,100])),areas:new Map(a.map((t,p)=>[p,10]))},v=S(s,a,r,u),w=z(s,a,u,v);c.val=s,f.val=a,h.val=r,x.val=u,b.val=v,g.val=w});document.body.append(O(o),y({mesh:{nodes:c,elements:f,nodeInputs:h,elementInputs:x,deformOutputs:b,analyzeOutputs:g},settingsObj:{deformedShape:!0,gridSize:15}}),I({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/3d-structure/main.ts",author:"https://www.linkedin.com/in/madil4/"}));
