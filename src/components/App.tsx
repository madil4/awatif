import { Index } from "solid-js";
import { Editor } from "./Editor/Editor";
import { Layouter } from "./Layouter/Layouter";
import { Parse, nodes } from "./Parse";
import { Viewer } from "./Viewer/Viewer";
import { Grid } from "./Viewer/objects/Grid";
import { Point } from "./Viewer/objects/Point";

export function App() {
  Parse();

  return (
    <Layouter>
      <Editor text="export const nodes=[[0,0,0],[1,0,0]];" />
      <Viewer>
        <Index each={nodes()}>
          {(node) => <Point position={node()}></Point>}
        </Index>
        <Grid />
      </Viewer>
    </Layouter>
  );
}
