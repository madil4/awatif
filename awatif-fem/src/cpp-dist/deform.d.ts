export interface DeformCppModule extends EmscriptenModule {
  _deform(
    nodesPtr: number,
    nodesLen: number,
    elementsPtr: number,
    elementsLen: number
  ): void;
}

declare function createModule(): Promise<DeformCppModule>;

export default createModule;
