import { lineMesh } from "./mesh/line-mesh/lineMesh";

// Todo: use a map with ids to make it possible to remove templates without reindexing
export const templates = new Map([["mesh", [lineMesh]]]);
