import { Component, onMount } from "solid-js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export const Editor: Component<{ text: string }> = (props) => {
  let container: HTMLDivElement;

  onMount(() => {
    monaco.editor.create(container, {
      value: props.text,
      automaticLayout: true,
      theme: "vs-dark",
      minimap: { enabled: false },
    });
  });

  return (
    <>
      <div ref={container!} style={{ width: "100", height: "600px" }}></div>
    </>
  );
};
