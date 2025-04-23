import createModule from "./cpp-dist/deformCpp.js";

// @ts-ignore
const module = await createModule();

console.log("Add func: ", module._add(1, 2));

// convert to c++ and return to js
export function deformCpp() {}
