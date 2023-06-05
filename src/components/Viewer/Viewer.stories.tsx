import { Viewer } from "./Viewer";
import { Meta, StoryObj } from "@storybook/html";
import { Grid } from "./objects/Grid";
import { Element } from "./objects/Element";
import { Node } from "./objects/Node";
import { NodeSupport } from "./objects/NodeSupport";
import { NodeLoad } from "./objects/NodeLoad";
import { ElementResult } from "./objects/ElementResult";
import { Text } from "./objects/Text";
import { NodeResult } from "./objects/NodeResults";

export const Default: StoryObj = {};

export default {
  title: "Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer>
        <Grid />

        <Node position={undefined} />
        <Node position={[5, 0]} />
        <Node position={[5, 0, "k"]} />

        <Node position={[5, 0, 0]} />

        <Element start={undefined} end={undefined} />
        <Element start={[0, 0]} end={[5, 0]} />
        <Element start={[0, 0, "k"]} end={[5, 0, "k"]} />

        <Element start={[0, 0, 0]} end={[5, 0, 0]} />

        <NodeSupport position={undefined} support={[true, false, false]} />
        <NodeSupport position={[0, 0]} support={[true, false, false]} />
        <NodeSupport position={[0, 0, "k"]} support={[true, false, false]} />

        <NodeSupport position={[0, 0, 0]} support={undefined} />
        <NodeSupport position={[0, 0, 0]} support={[true, false]} />
        <NodeSupport position={[0, 0, 0]} support={[true, true, "k"]} />

        <NodeSupport position={[0, 0, 0]} support={[false, false, false]} />
        <NodeSupport position={[0, 0, 0]} support={[true, false, false]} />
        <NodeSupport position={[0, 0, 5]} support={[true, true, true]} />

        <NodeLoad position={undefined} load={[0, 0, 100]} />
        <NodeLoad position={[5, 0]} load={[0, 0, 100]} />
        <NodeLoad position={[5, 0, "k"]} load={[0, 0, 100]} />

        <NodeLoad position={[5, 0, 0]} load={undefined} />
        <NodeLoad position={[5, 0, 0]} load={[1, 2]} />
        <NodeLoad position={[5, 0, 0]} load={[1, 2, "k"]} />

        <NodeLoad position={[5, 0, 0]} load={[0, 0, 100]} />
        <NodeLoad position={[5, 0, 0]} load={[100, , -100]} />

        <ElementResult start={undefined} end={undefined} result={10} />
        <ElementResult start={[0, 0]} end={[5, 0]} result={10} />
        <ElementResult start={[0, 0, "k"]} end={[5, 0, "k"]} result={10} />

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

        <NodeResult position={undefined} result={[0, 0, 100]} />
        <NodeResult position={[5, 0]} result={[0, 0, 100]} />
        <NodeResult position={[5, 0, "k"]} result={[0, 0, 100]} />

        <NodeResult position={[5, 0, 0]} result={undefined} />
        <NodeResult position={[5, 0, 0]} result={[1, 2]} />
        <NodeResult position={[5, 0, 0]} result={[1, 2, "k"]} />

        <NodeResult position={[0, 0, 0]} result={[-50, 0, 100]} />

        <Text text={undefined} position={[-8, 0, 5]} size={1} />
        <Text text={"here is text"} position={undefined} size={1} />
        <Text text={"here is text"} position={[-8, 0, 5]} size={undefined} />

        <Text text={true} position={[-8, 0, 5]} size={0.5} />
        <Text text={"here is text"} position={["k", 0, 5]} size={0.5} />
        <Text text={"here is text"} position={[-8, 0, 5]} size={false} />

        <Text text={"here is text"} position={[-5, 0, 5]} size={0.5} />
      </Viewer>
    </div>
  ),
} as Meta;
