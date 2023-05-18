import { Index, Show, createEffect } from "solid-js";
import { Layouter } from "../Layouter/Layouter";
import { Editor } from "../Editor/Editor";
import { Viewer } from "../Viewer/Viewer";
import { Point } from "../Viewer/objects/Point";
import { Grid } from "../Viewer/objects/Grid";
import { elements, nodes, setText, supports, text } from "./store";
import { parseEffect } from "./parseEffect";
import { Line } from "../Viewer/objects/Line";
import { Support } from "../Viewer/objects/Support";

type AppProps = {
  text?: string;
};

export function App(props: AppProps) {
  setText(
    props.text ||
      `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]

export const assignments = [
  {
    node: [0,2],
    supports : [true,true,true]
  }
]`
  );

  parseEffect();

  return (
    <Layouter>
      <Editor text={text()} onTextChange={(text) => setText(text)} />
      <Viewer>
        <Grid />

        <Index each={nodes()}>
          {(node) => <Point position={node()}></Point>}
        </Index>

        <Index each={elements()}>
          {(element) => (
            <>
              <Line
                start={nodes()[element()[0]]}
                end={nodes()[element()[1]]}
              ></Line>
            </>
          )}
        </Index>

        <Index each={supports()}>
          {(support) => (
            <Show
              when={Array.isArray((support() as any).node)}
              fallback={
                <Support
                  position={nodes()[(support() as any).node]}
                  supports={(support() as any).supports}
                />
              }
            >
              <Index each={(support() as any).node}>
                {(node) => (
                  <Support
                    position={nodes()[node()]}
                    supports={(support() as any).supports}
                  />
                )}
              </Index>
            </Show>
          )}
        </Index>
      </Viewer>
    </Layouter>
  );
}
