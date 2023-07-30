import { Viewer } from "../Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./Grid";
import { Element } from "./Element";
import { ElementResult2 } from "./ElementResult2";

export const Default: StoryObj = {};

export default {
  title: "ElementResults2",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />

        <ElementResult2
          start={undefined}
          end={undefined}
          result={[10, 10]}
          degree={0}
        />
        <ElementResult2
          start={[0, 0]}
          end={[5, 0]}
          result={[10, 10]}
          degree={0}
        />
        <ElementResult2
          start={[0, 0, "k"]}
          end={[5, 0, "k"]}
          result={[10, 10]}
          degree={0}
        />
        <ElementResult2
          start={[0, , 0]}
          end={[5, , 0]}
          result={[10, 10]}
          degree={0}
        />
        <ElementResult2
          start={[0, 0, 0]}
          end={[-3, 0, 1]}
          result={["", 10]}
          degree={0}
        />
        <ElementResult2
          start={[0, 0, 0]}
          end={[-3, 0, 1]}
          result={[10, 10]}
          degree={""}
        />

        {/* constant  */}
        <ElementResult2
          start={[0, 0, 0]}
          end={[5, 0, 0]}
          result={[1, -1]}
          degree={0}
        />
        <Element start={[0, 0, 0]} end={[5, 0, 0]} />
        <ElementResult2
          start={[0, 0, 3]}
          end={[5, 0, 3]}
          result={[-1, 1]}
          degree={0}
        />
        <Element start={[0, 0, 3]} end={[5, 0, 3]} />

        {/* linear  */}
        <ElementResult2
          start={[-6, 0, 6]}
          end={[-1, 0, 6]}
          result={[0, -1]}
          degree={1}
        />
        <Element start={[-6, 0, 6]} end={[-1, 0, 6]} />
        <ElementResult2
          start={[-6, 0, 4]}
          end={[-1, 0, 4]}
          result={[-1, 0.5]}
          degree={1}
        />
        <Element start={[-6, 0, 4]} end={[-1, 0, 4]} />
        <ElementResult2
          start={[-6, 0, 2]}
          end={[-1, 0, 2]}
          result={[1, 1]}
          degree={1}
        />
        <Element start={[-6, 0, 2]} end={[-1, 0, 2]} />
        <ElementResult2
          start={[-6, 0, 0]}
          end={[-1, 0, 0]}
          result={[-1, -1]}
          degree={1}
        />
        <Element start={[-6, 0, 0]} end={[-1, 0, 0]} />
      </Viewer>
    </div>
  ),
} as Meta;
