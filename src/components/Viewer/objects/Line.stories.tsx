import { Meta, StoryObj } from "@storybook/html";
import { Line } from "./Line";
import { Viewer } from "../Viewer";
import { Grid } from "./Grid";

export const Default: StoryObj = {};

export default {
  title: "Viewer/Line",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Line start={[0, 0, 0]} end={[3, 0, 0]} />
        <Line start={[0, 0, 0]} end={[0, 3, 0]} />
        <Line start={[0, 0, 0]} end={[0, 0, 3]} />
        <Grid />
      </Viewer>
    </div>
  ),
} as Meta;
