import { Viewer } from "./Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./objects/Grid";
import { Line } from "./objects/Line";
import { Point } from "./objects/Point";
import { Support } from "./objects/Support";

export const Default: StoryObj = {};

export default {
  title: "Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />

        <Point position={undefined} />
        <Point position={[5, 0]} />
        <Point position={[5, 0, "0"]} />
        <Point position={[5, 0, 0]} />

        <Line start={undefined} end={undefined} />
        <Line start={[0, 0]} end={[5, 0]} />
        <Line start={[0, 0, "0"]} end={[5, 0, "0"]} />
        <Line start={[0, 0, 0]} end={[5, 0, 0]} />

        <Support position={undefined} supports={undefined} />
        <Support position={[0, 0]} supports={[true, false]} />
        <Support position={[0, 0, "0"]} supports={[true, false, "true"]} />
        <Support position={[0, 0, 0]} supports={[false, false, false]} />
        <Support position={[0, 0, 0]} supports={[true, false, false]} />
        <Support position={[0, 0, 5]} supports={[true, true, true]} />
      </Viewer>
    </div>
  ),
} as Meta;
