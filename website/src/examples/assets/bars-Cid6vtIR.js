import{v as t,a as i,g as u}from"./styles-fAu9ATwT.js";import{a as m}from"./analyze-BUmtxk8b.js";import{d as v}from"./deform-zhDK5UXh.js";import{p}from"./parameters-BXCk-peK.js";const o={xPosition:{value:t.state(600),min:0,max:1e3},zPosition:{value:t.state(0),min:0,max:500}},a=t.state([]),e=t.state([]),r=t.state({}),s=t.state({}),n=t.state({}),l=t.state({});t.derive(()=>{a.val=[[250,0,0],[o.xPosition.value.val,0,o.zPosition.value.val],[250,0,400]],e.val=[[0,1],[1,2]],r.val={supports:new Map([[0,[!0,!0,!0,!0,!0,!0]],[2,[!0,!0,!0,!0,!0,!0]]]),loads:new Map([[1,[0,0,-1e3,0,0,0]]])},s.val={elasticities:new Map([[0,200],[1,200]]),areas:new Map([[0,100],[1,100]])},n.val=v(a.val,e.val,r.val,s.val),l.val=m(a.val,e.val,s.val,n.val)});document.body.append(p(o),i({structure:{nodes:a,elements:e,nodeInputs:r,elementInputs:s,deformOutputs:n,analyzeOutputs:l},settingsObj:{gridSize:1e3}}),u({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/1d-mesh/main.ts",author:"https://www.linkedin.com/in/madil4/"}));
