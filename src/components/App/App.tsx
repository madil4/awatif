import { Index, Show, batch, createEffect, createSignal } from "solid-js";
import { Layouter } from "../Layouter/Layouter";
import { Editor } from "../Editor/Editor";
import { Viewer } from "../Viewer/Viewer";
import { Point } from "../Viewer/objects/Point";
import { Grid } from "../Viewer/objects/Grid";
import { Line } from "../Viewer/objects/Line";
import { Support } from "../Viewer/objects/Support";
import { PointLoad } from "../Viewer/objects/PointLoad";
import { Section } from "../Viewer/objects/Section";
import { Material } from "../Viewer/objects/Material";

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
    support: [true,true,true]
  },
  {
    node: 2,
    support: [true,true,true]
  },
  {
    node: 1,
    load: [0,0,-100]
  },
  {
    element: 0,
    section: "r200x500",
    material: 7500
  },
  {
    element: 1,
    section: "r200x200",
    material: 7500
  }
]`);
  const [nodes, setNodes] = createSignal([]);
  const [elements, setElements] = createSignal([]);
  const [supports, setSupports] = createSignal([]);
  const [pointLoads, setPointLoads] = createSignal([]);
  const [sections, setSections] = createSignal([]);
  const [materials, setMaterials] = createSignal([]);

  if (props.text) setText(props.text);

  // parsing effect
  createEffect(() => {
    import(createURL(text()))
      .then((module) => {
        batch(() => {
          setNodes(module.nodes ?? []);
          setElements(module.elements ?? []);

          if (module.assignments) {
            const supports: any = [];
            const pointLoads: any = [];
            const sections: any = [];
            const materials: any = [];
            (module.assignments as []).forEach((a) => {
              if ("support" in a) supports.push(a);
              if ("load" in a) pointLoads.push(a);
              if ("section" in a) sections.push(a);
              if ("material" in a) materials.push(a);
            });
            setSupports(supports);
            setPointLoads(pointLoads);
            setSections(sections);
            setMaterials(materials);
          } else {
            setSupports([]);
            setPointLoads([]);
            setSections([]);
            setMaterials([]);
          }
        });
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

        <Index each={sections()}>
          {(section) => (
            <Show when={elements()[(section() as any).element]}>
              <Section
                start={nodes()[elements()[(section() as any).element][0]]}
                end={nodes()[elements()[(section() as any).element][1]]}
                section={(section() as any).section}
              />
            </Show>
          )}
        </Index>

        <Index each={materials()}>
          {(material) => (
            <Show when={elements()[(material() as any).element]}>
              <Material
                start={nodes()[elements()[(material() as any).element][0]]}
                end={nodes()[elements()[(material() as any).element][1]]}
              />
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
