import { Editor } from "./Editor/Editor";
import { Layouter } from "./Layouter/Layouter";
import { Viewer } from "./Viewer/Viewer";

export const Default = {};

export default {
  title: "App",
  render: () => (
    <Layouter>
      <Editor text="Here is text as an example" />
      <Viewer />
    </Layouter>
  ),
};
