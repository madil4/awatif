import { Viewer } from "./Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./objects/Grid";
import { Line } from "./objects/Line";
import { Point } from "./objects/Point";
import { Support } from "./objects/Support";
import { PointLoad } from "./objects/PointLoad";
import { Section } from "./objects/Section";
import { Material } from "./objects/Material";
import { BarResult } from "./objects/BarResult";

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

        <Support position={undefined} support={[true, false, false]} />
        <Support position={[0, 0]} support={[true, false, false]} />
        <Support position={[0, 0, "k"]} support={[true, false, false]} />

        <Support position={[0, 0, 0]} support={undefined} />
        <Support position={[0, 0, 0]} support={[true, false]} />
        <Support position={[0, 0, 0]} support={[true, true, "k"]} />

        <Support position={[0, 0, 0]} support={[false, false, false]} />
        <Support position={[0, 0, 0]} support={[true, false, false]} />
        <Support position={[0, 0, 5]} support={[true, true, true]} />

        <PointLoad position={undefined} load={[0, 0, 100]} />
        <PointLoad position={[5, 0]} load={[0, 0, 100]} />
        <PointLoad position={[5, 0, "k"]} load={[0, 0, 100]} />

        <PointLoad position={[5, 0, 0]} load={undefined} />
        <PointLoad position={[5, 0, 0]} load={[1, 2]} />
        <PointLoad position={[5, 0, 0]} load={[1, 2, "k"]} />

        <PointLoad position={[5, 0, 0]} load={[0, 0, 100]} />
        <PointLoad position={[5, 0, 0]} load={[100, , -100]} />

        <Section start={undefined} end={undefined} section={"r100x100"} />
        <Section start={[0, 0]} end={[5, 0]} section={"r100x100"} />
        <Section start={[0, 0, "k"]} end={[5, 0, "k"]} section={"r100x100"} />

        <Section start={[0, 0, 2]} end={[5, 0, 2]} section={undefined} />
        <Section start={[0, 0, 2]} end={[5, 0, 2]} section={"invalid"} />

        <Section start={[0, 0, 2]} end={[5, 0, 2]} section={"r200x500"} />
        <Section start={[0, 0, 4]} end={[5, 0, 4]} section={"r500x200"} />

        <Material start={undefined} end={undefined} />
        <Material start={[0, 0]} end={[5, 0]} />
        <Material start={[0, 0, "k"]} end={[5, 0, "k"]} />

        <Material start={[0, 0, 0]} end={[2.5, 0, 0]} />

        <BarResult start={undefined} end={undefined} result={10} />
        <BarResult start={[0, 0]} end={[5, 0]} result={10} />
        <BarResult start={[0, 0, "k"]} end={[5, 0, "k"]} result={10} />

        <BarResult start={[0, 0, 0]} end={[-3, 0, 1]} result={undefined} />
        <BarResult start={[0, 0, 0]} end={[-3, 0, 1]} result={true} />

        <BarResult start={[-5, 0, 0]} end={[-2, 2, 2]} result={10} />
        <Line start={[-5, 0, 0]} end={[-2, 2, 2]} />
        <BarResult start={[-5, 0, 0]} end={[-8, -2, 3]} result={-10} />
        <Line start={[-5, 0, 0]} end={[-8, -2, 3]} />
        <BarResult start={[-5, 0, 0]} end={[-8, -1, -2]} result={10} />
        <Line start={[-5, 0, 0]} end={[-8, -1, -2]} />
        <BarResult start={[-5, 0, 0]} end={[-4, 1, -3]} result={-10} />
        <Line start={[-5, 0, 0]} end={[-4, 1, -3]} />

        <BarResult start={[-5, 0, 0]} end={[-2, 0.5, 0]} result={10} />
        <Line start={[-5, 0, 0]} end={[-2, 0.5, 0]} />
        <BarResult start={[-5, 0, 0]} end={[-8, 0, 0]} result={-10} />
        <Line start={[-5, 0, 0]} end={[-8, 0, 0]} />
        <BarResult start={[-5, 0, 0]} end={[-5, 0, 3]} result={10} />
        <Line start={[-5, 0, 0]} end={[-5, 0, 3]} />
        <BarResult start={[-5, 0, 0]} end={[-5, 0, -3]} result={-10} />
        <Line start={[-5, 0, 0]} end={[-5, 0, -3]} />
      </Viewer>
    </div>
  ),
} as Meta;
