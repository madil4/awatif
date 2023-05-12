import { createEffect } from "solid-js";
import { setElements, setNodes, text } from "../store";

export function parseEffect() {
  createEffect(() => {
    import(createURL(text()))
      .then((module) => {
        setNodes(module.nodes ?? []);
        setElements(module.elements ?? []);
      })
      .catch((error) => {
        console.warn("Error importing module:", error);
      });
  });
}

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
