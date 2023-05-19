import { Index, createEffect, createSignal } from "solid-js";
import { Layouter } from "../Layouter/Layouter";
import { Editor } from "../Editor/Editor";
import { Viewer } from "../Viewer/Viewer";
import { Point } from "../Viewer/objects/Point";
import { Grid } from "../Viewer/objects/Grid";
import { Line } from "../Viewer/objects/Line";
import { Support } from "../Viewer/objects/Support";
import { PointLoad } from "../Viewer/objects/PointLoad";

type AppProps = {
  text?: string;
};

export function App(props: AppProps) {
  const [text, setText] =
    createSignal(`export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
  
export const assignments = [
  {
    node: 0,
    support : [true,true,true]
  },
  {
    node: 2,
    support : [true,true,true]
  },
  {
    node: 1,
    load : [0,0,-100]
  }
]`);
  const [nodes, setNodes] = createSignal([]);
  const [elements, setElements] = createSignal([]);
  const [supports, setSupports] = createSignal([]);
  const [pointLoads, setPointLoads] = createSignal([]);

  if (props.text) setText(props.text);

  // parsing effect
  createEffect(() => {
    import(createURL(text()))
      .then((module) => {
        setNodes(module.nodes ?? []);
        setElements(module.elements ?? []);

        if (module.assignments) {
          const supports: any = [];
          const pointLoads: any = [];
          (module.assignments as []).forEach((a) => {
            if ("support" in a) supports.push(a);
            if ("load" in a) pointLoads.push(a);
          });
          setSupports(supports);
          setPointLoads(pointLoads);
        } else {
          setSupports([]);
          setPointLoads([]);
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
            <Support
              position={nodes()[(support() as any).node]}
              support={(support() as any).support}
            />
          )}
        </Index>

        <Index each={pointLoads()}>
          {(pointLoad) => (
            <PointLoad
              position={nodes()[(pointLoad() as any).node]}
              load={(pointLoad() as any).load}
            />
          )}
        </Index>
      </Viewer>
    </Layouter>
  );
}

// helpers
const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
