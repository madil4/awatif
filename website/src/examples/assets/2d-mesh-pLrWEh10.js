import{v as e,g as n}from"./styles-CRQ6mFCx.js";import{g as r}from"./getParameters-DvaQSv0e.js";import{g as i}from"./getToolbar-BgBPgu-B.js";import{m as l}from"./mesh-DjY7hcX2.js";import"./complex-i8qiIvCl.js";const a={boundary:{value:e.state(5),min:1,max:10,step:.1,label:"Boundary point"}},t=e.state([]),o=e.state([]);e.derive(()=>{const{nodes:s,elements:m}=l({points:[[0,0,0],[5,0,0],[a.boundary.value.val,0,3],[8,0,7],[15,0,5],[15,0,0],[20,0,0],[20,0,10],[0,0,10],[0,0,0]],polygon:[0,1,2,3,4,5,6,7,8]});t.val=s.val,o.val=m.val});document.body.append(r(a),n({mesh:{nodes:t,elements:o}}),i({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/2d-mesh/main.ts",author:"https://www.linkedin.com/in/madil4/"}));
