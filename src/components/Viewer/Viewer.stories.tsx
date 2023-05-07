import { Viewer } from "./Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./objects/Grid";
import { Line } from "./objects/Line";
import { Point } from "./objects/Point";

export const Default: StoryObj = {};

export default {
  title: "Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />
        <Line start={[0, 1, 0]} end={[1, 1, 0]} />
        <Point position={[1, 1, 1]} />
      </Viewer>
    </div>
  ),
} as Meta;
