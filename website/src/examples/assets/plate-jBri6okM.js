import{v as t,g as w,a as b}from"./styles-CVhKyYX7.js";import{g as h}from"./getParameters-BO171xuA.js";import{d as g}from"./deform-D3jFwYyY.js";import{m as I}from"./mesh-CnAvVJ0J.js";import"./pureFunctionsAny.generated-BITz6FsS.js";import"./complex-i8qiIvCl.js";const m={xPosition:{value:t.state(15),min:5,max:20},load:{value:t.state(-50),min:-100,max:100,step:1}},r=t.state([]),u=t.state([]),i=t.state({}),d=t.state({}),v=t.state({});t.derive(()=>{const{nodes:s,elements:o,boundaryIndices:c}=I({points:t.state([[0,0,0],[15,0,0],[m.xPosition.value.val,10,0],[0,5,0]]),polygon:t.state([0,1,2,3]),maxMeshSize:2}),l={supports:new Map(c.val.map(a=>[a,[!0,!0,!0,!0,!0,!0]])),loads:new Map(s.val.map((a,e)=>[e,[0,0,m.load.value.val,0,0,0]]))},n=o.val,p={elasticities:new Map(n.map((a,e)=>[e,100])),thicknesses:new Map(n.map((a,e)=>[e,1])),poissonsRatios:new Map(n.map((a,e)=>[e,.3]))},f=g(s.val,o.val,l,p);r.val=s.val,u.val=o.val,i.val=l,d.val=p,v.val=f});document.body.append(h(m),w({structure:{nodes:r,elements:u,nodeInputs:i,elementInputs:d,deformOutputs:v},settingsObj:{deformedShape:!0,loads:!1}}),b({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",author:"https://www.linkedin.com/in/mahjoubmusaab/"}));
