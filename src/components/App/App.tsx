import { Index } from "solid-js";
import { Layouter } from "../Layouter/Layouter";
import { Editor } from "../Editor/Editor";
import { Viewer } from "../Viewer/Viewer";
import { Point } from "../Viewer/objects/Point";
import { Grid } from "../Viewer/objects/Grid";
import { elements, nodes, setText, text } from "./store";
import { ParseEffect } from "./ParseEffects/ParseEffect";
import { Line } from "../Viewer/objects/Line";

type AppProps = {
  text?: string;
};

export function App(props: AppProps) {
  setText(props.text || "export const nodes=[[0,0,0],[1,0,0]];");

  ParseEffect();

  return (
    <Layouter>
      <Editor text={text()} onTextChange={(text) => setText(text)} />
      <Viewer>
        <Index each={nodes()}>
          {(node) => <Point position={node()}></Point>}
        </Index>
        <Index each={elements()}>
          {(element) => (
            <Line
              start={nodes()[element()[0]] ?? []}
              end={nodes()[element()[1]] ?? []}
            ></Line>
          )}
        </Index>
        <Grid />
      </Viewer>
    </Layouter>
  );
}
