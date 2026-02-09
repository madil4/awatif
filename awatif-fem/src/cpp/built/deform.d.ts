export interface DeformCppModule {
  // Supports legacy and CLT-extended wasm signatures.
  _deform(...args: number[]): void;

  _malloc(size: number): number;
  _free(ptr: number): void;

  HEAPU8: Uint8Array;
  HEAPU32: Uint32Array;
  HEAPF64: Float64Array;
}

declare function createModule(): Promise<DeformCppModule>;

export default createModule;
