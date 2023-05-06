import { Viewer } from "./Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./objects/Grid";

export const Default: StoryObj = {};

export default {
  title: "Viewer/Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />
      </Viewer>
    </div>
  ),
} as Meta;
