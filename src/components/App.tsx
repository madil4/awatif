import { Editor } from "./Editor/Editor";
import { Layouter } from "./Layouter/Layouter";
import { Viewer } from "./Viewer/Viewer";

export function App() {
  return (
    <Layouter>
      <Editor text="Here is text as an example" />
      <Viewer />
    </Layouter>
  );
}
