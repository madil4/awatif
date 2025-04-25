import {
  Node,
  Element,
  ElementInputs,
  NodeInputs,
  DeformOutputs,
} from "./data-model.js";
import createModule from "./cpp-dist/deform.js";

// @ts-ignore, load wasm
const module = await createModule();

export function deformCpp(nodes: Node[], elements: Element[]): DeformOutputs {
  // Prepare data for c++
  const nodeData = getMemoryData(
    nodes.flat(),
    nodes.length,
    3,
    Float64Array,
    module.HEAPF64
  );
  const elementData = getMemoryData(
    elements.map((e) => [e[0], e[1], e[2]]).flat(),
    elements.length,
    3,
    Uint32Array,
    module.HEAPU32
  );

  // Call C++ function
  module._deform(
    nodeData.pointersPtr,
    nodes.length,
    elementData.pointersPtr,
    elements.length
  );

  // Convert result to js types

  // Free memory
  module._free(nodeData.pointersPtr);
  module._free(nodeData.dataPtr);
  module._free(elementData.pointersPtr);
  module._free(elementData.dataPtr);

  return {};
}

deformCpp(
  [
    [0, 1, 2],
    [3, 4, 5],
  ],
  [
    [0, 1],
    [2, 3],
  ]
);

// Utils
type TypedArrayConstructor =
  | Int8ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Int16ArrayConstructor
  | Uint16ArrayConstructor
  | Int32ArrayConstructor
  | Uint32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor;

function getMemoryData<T extends TypedArrayConstructor>(
  data: any[], // the flatten matrix,
  rows: number,
  cols: number,
  TypedArrayCtor: T,
  heapTypedArray: InstanceType<T>
): {
  pointersPtr: number; // Pointer to the array of pointers
  dataPtr: number; // Pointer to flatten data
} {
  /* 1. Prepare main data buffer */
  const dataBuf = new TypedArrayCtor(data);
  const bytesPerElement = dataBuf.BYTES_PER_ELEMENT;
  const dataByteLength = dataBuf.length * dataBuf.BYTES_PER_ELEMENT;

  /* 2. Allocate memory for main data */
  const dataPtr = module._malloc(dataByteLength);

  /* 3. Prepare pointers array buffer */
  const pointersBuf = new Uint32Array(rows);

  for (let i = 0; i < rows; i++) {
    pointersBuf[i] = dataPtr + i * cols * bytesPerElement;
  }

  /* 4. Allocate memory for pointers array */
  const pointersByteLength = pointersBuf.length * pointersBuf.BYTES_PER_ELEMENT;
  const pointersPtr = module._malloc(pointersByteLength);

  /* 5. Copy data to WASM heap */
  heapTypedArray.set(dataBuf, dataPtr / bytesPerElement); // Offset is in elements, not bytes
  module.HEAPU32.set(pointersBuf, pointersPtr / pointersBuf.BYTES_PER_ELEMENT);

  return {
    dataPtr,
    pointersPtr,
  };
}
