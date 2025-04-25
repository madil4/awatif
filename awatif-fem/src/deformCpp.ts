import createModule from "./cpp-dist/deform.js";

// @ts-ignore
const module = await createModule();

// Call functions
console.log("Add func: ", module._add(1, 2));

// Pass array
// Prepare data
const array = new Float32Array([5, 9]);

// Allocate memory
const arrayPtr = module._malloc(array.length * array.BYTES_PER_ELEMENT);

// Copy data to heap
module.HEAPF32.set(array, arrayPtr / array.BYTES_PER_ELEMENT);

// Call function
module._printArray(arrayPtr, array.length);

// Free memory
module._free(arrayPtr);

// Pass nested array

// Prepare data
const rows = 10;
const cols = 5;
var data = new Float32Array(rows * cols);
for (var i = 0; i < rows * cols; i++) {
  data[i] = i;
}

// Allocate memory
const nestedArrayPtr = module._malloc(data.length * data.BYTES_PER_ELEMENT);

// Copy data to heap
module.HEAPF32.set(data, nestedArrayPtr / data.BYTES_PER_ELEMENT);

// Prepare rows pointers data
const rowsPtrs = new Uint32Array(rows);
for (let i = 0; i < rows; i++) {
  rowsPtrs[i] = nestedArrayPtr + i * data.BYTES_PER_ELEMENT * cols;
}

// Allocate memory
const rowPtrsPtr = module._malloc(rowsPtrs.length * rowsPtrs.BYTES_PER_ELEMENT);

// Copy rowsPtrs to heap
module.HEAPU32.set(rowsPtrs, rowPtrsPtr / rowsPtrs.BYTES_PER_ELEMENT);

module._printNestedArray(rowPtrsPtr, rows, cols);

// Free memory
module._free(nestedArrayPtr);
module._free(rowPtrsPtr);

// convert to c++ and return to js
export function deformCpp() {}
