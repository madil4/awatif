import{a as i,c}from"./A6KC6G5S-FYeZ4PPC.js";const d={length:{value:10,min:1,max:20},height:{value:10,min:1,max:10},xLoad:{value:10,min:0,max:10,folder:"Loads"},area:{value:10,min:1,max:10,folder:"Sections"}};function h(e){const n=e.length.value,a=e.height.value,u=e.xLoad.value,l=e.area.value,o=[[0,0,0],[0,0,a],[n,0,a],[n,0,0]],s=[[0,1],[1,2],[2,3]],t={element:0,area:l,elasticity:10,momentOfInertiaY:10,momentOfInertiaZ:10,shearModulus:10,torsionalConstant:10},r=[{node:0,support:[!0,!0,!0,!0,!0,!0]},{node:3,support:[!0,!0,!0,!0,!0,!0]},{node:2,load:[u,0,0,0,0,0]},{...t,element:0},{...t,element:1},{...t,element:2}],m=c(o,s,r);return{nodes:o,elements:s,assignments:r,analysisResults:m}}i({parameters:d,onParameterChange:h,settings:{deformedShape:!0}});