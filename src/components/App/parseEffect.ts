import { createEffect } from "solid-js";
import { setElements, setNodes, setSupports, text } from "./store";

// a better approach is to validate the imported module using io-ts and remove the manual validation
export function parseEffect() {
  createEffect(() => {
    import(createURL(text()))
      .then((module) => {
        setNodes(module.nodes ?? []);
        setElements(module.elements ?? []);

        if (module.assignments) {
          const supports: any = [];
          (module.assignments as []).forEach((a) => {
            if ("supports" in a) supports.push(a);
          });
          setSupports(supports);
        }
      })
      .catch((error) => {
        console.warn("Error importing module:", error);
      });
  });
}

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
