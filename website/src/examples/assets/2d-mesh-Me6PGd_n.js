import{v as e,g as n}from"./styles-BT9ucHwM.js";import{g as r}from"./getParameters-BYp-3p_e.js";import{g as i}from"./getToolbar-CO4pQWZZ.js";import{m as l}from"./mesh-loiMPpJK.js";import"./complex-i8qiIvCl.js";const t={boundary:{value:e.state(5),min:1,max:10,step:.1,label:"Boundary point"}},a=e.state([]),o=e.state([]);e.derive(()=>{const{nodes:s,elements:m}=l({points:[[0,0,0],[5,0,0],[t.boundary.value.val,0,3],[8,0,7],[15,0,5],[15,0,0],[20,0,0],[20,0,10],[0,0,10],[0,0,0]],polygon:[0,1,2,3,4,5,6,7,8]});a.val=s.val,o.val=m.val});document.body.append(r(t),n({structure:{nodes:a,elements:o}}),i({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/2d-mesh/main.ts",author:"https://www.linkedin.com/in/madil4/"}));
