import { createEffect, createSignal } from "solid-js";
import { text } from "./Editor/Editor";

export const [nodes, setNodes] = createSignal([]);

export function Parse() {
  createEffect(() => {
    import(createURL(text()))
      .then((module) => {
        setNodes(module.nodes ? module.nodes.filter(nodeFilter) : []);
      })
      .catch((error) => {
        console.error("Error importing module:", error);
      });
  });
}

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));

const nodeFilter = (node: number[]) => node.length == 3;
