import{v as t,m as w,a as b,g as h}from"./styles-fAu9ATwT.js";import{p as I}from"./parameters-BXCk-peK.js";import{d as S}from"./deform-zhDK5UXh.js";const m={xPosition:{value:t.state(15),min:5,max:20},load:{value:t.state(-50),min:-100,max:100,step:1}},u=t.state([]),r=t.state([]),i=t.state({}),d=t.state({}),v=t.state({});t.derive(()=>{const{nodes:s,elements:o,boundaryIndices:c}=w({points:t.state([[0,0,0],[15,0,0],[m.xPosition.value.val,10,0],[0,5,0]]),polygon:t.state([0,1,2,3]),maxMeshSize:2}),l={supports:new Map(c.val.map(a=>[a,[!0,!0,!0,!0,!0,!0]])),loads:new Map(s.val.map((a,e)=>[e,[0,0,m.load.value.val,0,0,0]]))},n=o.val,p={elasticities:new Map(n.map((a,e)=>[e,100])),thicknesses:new Map(n.map((a,e)=>[e,1])),poissonsRatios:new Map(n.map((a,e)=>[e,.3]))},f=S(s.val,o.val,l,p);u.val=s.val,r.val=o.val,i.val=l,d.val=p,v.val=f});document.body.append(I(m),b({structure:{nodes:u,elements:r,nodeInputs:i,elementInputs:d,deformOutputs:v},settingsObj:{deformedShape:!0,loads:!1}}),h({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",author:"https://www.linkedin.com/in/mahjoubmusaab/"}));
