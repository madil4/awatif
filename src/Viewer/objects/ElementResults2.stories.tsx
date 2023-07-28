import { Viewer } from "../Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./Grid";
import { Element } from "./Element";
import { ElementResult } from "./ElementResult";

export const Default: StoryObj = {};

export default {
  title: "ElementResults2",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />

        <ElementResult start={undefined} end={undefined} result={10} />
        <ElementResult start={[0, 0]} end={[5, 0]} result={10} />
        <ElementResult start={[0, 0, "k"]} end={[5, 0, "k"]} result={10} />
        <ElementResult start={[0, , 0]} end={[5, , 0]} result={10} />

        <ElementResult start={[0, 0, 0]} end={[-3, 0, 1]} result={undefined} />
        <ElementResult start={[0, 0, 0]} end={[-3, 0, 1]} result={true} />

        <ElementResult start={[-5, 0, 0]} end={[-2, 2, 2]} result={10} />
        <Element start={[-5, 0, 0]} end={[-2, 2, 2]} />
        <ElementResult start={[-5, 0, 0]} end={[-8, -2, 3]} result={-10} />
        <Element start={[-5, 0, 0]} end={[-8, -2, 3]} />
        <ElementResult start={[-5, 0, 0]} end={[-8, -1, -2]} result={10} />
        <Element start={[-5, 0, 0]} end={[-8, -1, -2]} />
        <ElementResult start={[-5, 0, 0]} end={[-4, 1, -3]} result={-10} />
        <Element start={[-5, 0, 0]} end={[-4, 1, -3]} />

        <ElementResult start={[-5, 0, 0]} end={[-2, 0.5, 0]} result={10} />
        <Element start={[-5, 0, 0]} end={[-2, 0.5, 0]} />
        <ElementResult start={[-5, 0, 0]} end={[-8, 0, 0]} result={-10} />
        <Element start={[-5, 0, 0]} end={[-8, 0, 0]} />
        <ElementResult start={[-5, 0, 0]} end={[-5, 0, 3]} result={10} />
        <Element start={[-5, 0, 0]} end={[-5, 0, 3]} />
        <ElementResult start={[-5, 0, 0]} end={[-5, 0, -3]} result={-10} />
        <Element start={[-5, 0, 0]} end={[-5, 0, -3]} />
      </Viewer>
    </div>
  ),
} as Meta;
