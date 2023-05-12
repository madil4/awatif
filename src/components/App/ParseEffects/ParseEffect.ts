import { createEffect } from "solid-js";
import { setElements, setNodes, text } from "../store";

export function ParseEffect() {
  createEffect(() => {
    import(createURL(text()))
      .then((module) => {
        setNodes(module.nodes ? module.nodes.filter(nodeFilter) : []);
        setElements(
          module.elements ? module.elements.filter(elementsFilter) : []
        );
      })
      .catch((error) => {
        setNodes([]);
        setElements([]);
        console.warn("Error importing module:", error);
      });
  });
}

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));

const nodeFilter = (node: number[]) => node.length == 3;
const elementsFilter = (element: number[]) => element.length == 2;
