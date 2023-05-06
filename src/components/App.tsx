import { Editor } from "./Editor/Editor";
import { Layouter } from "./Layouter/Layouter";
import { DefaultViewer } from "./Viewer/DefaultViewer";

export function App() {
  return (
    <Layouter>
      <Editor text="Here is text as an example" />
      <DefaultViewer />
    </Layouter>
  );
}
