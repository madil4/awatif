import createModule from "./cpp-dist/deform.js";

// @ts-ignore
const module = await createModule();

console.log("Add func: ", module._add(1, 2));

const ptr = module._malloc(2 * Float32Array.BYTES_PER_ELEMENT);

module.HEAPF32[ptr / 4] = 5;
module.HEAPF32[ptr / 4 + 1] = 9;

module._process_nodes(ptr, 2);

module._free(ptr);

// convert to c++ and return to js
export function deformCpp() {}
