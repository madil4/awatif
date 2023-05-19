import { Viewer } from "./Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./objects/Grid";
import { Line } from "./objects/Line";
import { Point } from "./objects/Point";
import { Support } from "./objects/Support";
import { PointLoad } from "./objects/PointLoad";

export const Default: StoryObj = {};

export default {
  title: "Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />

        <Point position={undefined} />
        <Point position={[5, 0]} />
        <Point position={[5, 0, "k"]} />
        <Point position={[5, 0, 0]} />

        <Line start={undefined} end={undefined} />
        <Line start={[0, 0]} end={[5, 0]} />
        <Line start={[0, 0, "k"]} end={[5, 0, "k"]} />
        <Line start={[0, 0, 0]} end={[5, 0, 0]} />

        <Support position={undefined} support={undefined} />
        <Support position={[0, 0]} support={[true, false]} />
        <Support position={[0, 0, "k"]} support={[true, true, "k"]} />
        <Support position={[0, 0, 0]} support={[false, false, false]} />
        <Support position={[0, 0, 0]} support={[true, false, false]} />
        <Support position={[0, 0, 5]} support={[true, true, true]} />

        <PointLoad position={undefined} load={undefined} />
        <PointLoad position={[5, 0]} load={[1, 2]} />
        <PointLoad position={[5, 0, "k"]} load={[1, 2, "k"]} />
        <PointLoad position={[5, 0, 0]} load={[0, 0, 100]} />
        <PointLoad position={[5, 0, 0]} load={[100, , -100]} />
      </Viewer>
    </div>
  ),
} as Meta;
