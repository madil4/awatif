import { Index, Show, createEffect, createSignal } from "solid-js";
import { Layouter } from "../Layouter/Layouter";
import { Editor } from "../Editor/Editor";
import { Viewer } from "../Viewer/Viewer";
import { Point } from "../Viewer/objects/Point";
import { Grid } from "../Viewer/objects/Grid";
import { Line } from "../Viewer/objects/Line";
import { Support } from "../Viewer/objects/Support";

type AppProps = {
  text?: string;
};

export function App(props: AppProps) {
  const [text, setText] =
    createSignal(`export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
  
export const assignments = [
  {
    node: [0,2],
    supports : [true,true,true]
  }
]`);
  const [nodes, setNodes] = createSignal([]);
  const [elements, setElements] = createSignal([]);
  const [supports, setSupports] = createSignal([]);

  if (props.text) setText(props.text);

  // parsing effect
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
        } else {
          setSupports([]);
        }
      })
      .catch((error) => {
        console.warn("Error importing module:", error);
      });
  });

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

// helpers
const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
