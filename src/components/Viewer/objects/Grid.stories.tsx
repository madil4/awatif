import { Meta, StoryObj } from "@storybook/html";
import { Viewer } from "../Viewer";
import { Grid } from "./Grid";

export const Default: StoryObj = {};

export default {
  title: "Viewer/Grid",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />
      </Viewer>
    </div>
  ),
} as Meta;
