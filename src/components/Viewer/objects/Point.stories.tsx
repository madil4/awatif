import { Meta, StoryObj } from "@storybook/html";
import { Point } from "./Point";
import { Viewer } from "../Viewer";
import { Grid } from "./Grid";

export const Default: StoryObj = {};

export default {
  title: "Viewer/Point",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Point position={[0, 0, 0]} />
        <Point position={[3, 0, 0]} />
        <Point position={[0, 3, 0]} />
        <Point position={[0, 0, 3]} />
        <Grid />
      </Viewer>
    </div>
  ),
} as Meta;
