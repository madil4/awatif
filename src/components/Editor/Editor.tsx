import { Component, onMount } from "solid-js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type EditorProps = {
  text: string;
  onTextChange?: (text: string) => void;
};

export const Editor: Component<EditorProps> = (props) => {
  let container: HTMLDivElement;

  onMount(() => {
    const editor = monaco.editor.create(container, {
      value: props.text,
      automaticLayout: true,
      theme: "vs-dark",
      minimap: { enabled: false },
    });

    editor.onDidChangeModelContent(() => {
      if (props.onTextChange) props.onTextChange(editor.getValue());
    });
  });

  return (
    <>
      <div ref={container!} class="w-full h-full"></div>
    </>
  );
};
