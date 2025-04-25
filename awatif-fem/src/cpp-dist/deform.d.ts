export interface DeformCppModule extends EmscriptenModule {
  _add(a: number, b: number): number;
  _printArray(dataPtr: number, length: number): void;
  _printNestedArray(dataPtr: number, rows: number, cols: number): void;
}

declare function createModule(): Promise<DeformCppModule>;

export default createModule;
