export interface DeformCppModule extends EmscriptenModule {
  _add(a: number, b: number): number;
  _process_nodes(dataPtr: number, length: number): void;
}

declare function createModule(): Promise<DeformCppModule>;

export default createModule;
