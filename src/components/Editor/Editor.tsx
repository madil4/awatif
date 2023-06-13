import { Component, createEffect, onMount } from "solid-js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "./useWorker";

type EditorProps = {
  text: string;
  onTextChange?: (text: string) => void;
};

export const Editor: Component<EditorProps> = (props) => {
  let container: HTMLDivElement;

  createEffect(() => {
    if (props.text) {
      const editor = monaco.editor.create(container, {
        value: props.text,
        automaticLayout: true,
        minimap: { enabled: false },
        theme: "vs-dark",
        language: "typescript",
        scrollbar: { useShadows: false },
      });

      editor.onDidChangeModelContent(() => {
        if (props.onTextChange) props.onTextChange(editor.getValue());
      });
    }
  });

  return (
    <>
      <div ref={container!} class="w-full h-full"></div>
    </>
  );
};
