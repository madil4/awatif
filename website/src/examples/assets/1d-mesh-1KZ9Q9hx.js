import{v as s,g as I,a as b}from"./styles-C_lYwh80.js";import{a as k}from"./analyze-DGxmRSWm.js";import{d as S}from"./deform-DOtEKqRG.js";import{g as A}from"./getParameters-C2iMw336.js";const p={meshDensity:{value:s.state(7),min:1,max:7,step:1,label:"mesh density"},span:{value:s.state(10),min:1,max:20},height:{value:s.state(10),min:1,max:10},load:{value:s.state(10),min:0,max:20}},h=s.state([]),c=s.state([]),v=s.state({}),y=s.state({}),g=s.state({}),w=s.state({});s.derive(()=>{const o=[],e=[],m=p.meshDensity.value.val,u=p.height.value.val,l=p.span.value.val,f=p.load.value.val;o.push(...[...Array(m+1).keys()].map(t=>[0,0,u/m*t])),e.push(...[...Array(m).keys()].map(t=>[t,t+1]));let n=o.length;o.push(...[...Array(m).keys()].map(t=>[l/m*(t+1),0,u])),e.push(...[...Array(m-1).keys()].map(t=>[n+t,n+t+1])),e.push([n-1,n]),n=o.length;const M=n-1;o.push(...[...Array(m).keys()].map(t=>[l,0,u-u/m*(t+1)])),e.push(...[...Array(m-1).keys()].map(t=>[n+t,n+t+1])),e.push([n-1,n]);const d={supports:new Map([[0,[!0,!0,!0,!0,!0,!0]],[o.length-1,[!0,!0,!0,!0,!0,!0]]]),loads:new Map([[M,[f,0,0,0,0,0]]])},r={elasticities:new Map(e.map((t,a)=>[a,10])),shearModuli:new Map(e.map((t,a)=>[a,10])),areas:new Map(e.map((t,a)=>[a,10])),torsionalConstants:new Map(e.map((t,a)=>[a,10])),momentsOfInertiaY:new Map(e.map((t,a)=>[a,10])),momentsOfInertiaZ:new Map(e.map((t,a)=>[a,10]))},i=S(o,e,d,r),O=k(o,e,r,i);h.val=o,c.val=e,v.val=d,y.val=r,g.val=i,w.val=O});document.body.append(A(p),I({structure:{nodes:h,elements:c,nodeInputs:v,elementInputs:y,deformOutputs:g,analyzeOutputs:w},settingsObj:{deformedShape:!0}}),b({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/1d-mesh/main.ts",author:"https://www.linkedin.com/in/madil4/"}));
