export interface Module {
  _add(a: number, b: number): number;
}

declare function createModule(): Promise<Module>;

export default createModule;
