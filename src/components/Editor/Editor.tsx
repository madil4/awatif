import { Component, createSignal, onMount } from "solid-js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export const [text, setText] = createSignal("");

export const Editor: Component<{ text: string }> = (props) => {
  let container: HTMLDivElement;

  onMount(() => {
    const editor = monaco.editor.create(container, {
      value: props.text,
      automaticLayout: true,
      theme: "vs-dark",
      minimap: { enabled: false },
    });

    setText(props.text);

    editor.onDidChangeModelContent(() => {
      setText(editor.getValue());
    });
  });

  return (
    <>
      <div ref={container!} class="w-full h-full"></div>
    </>
  );
};
