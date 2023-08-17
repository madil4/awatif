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
      <Viewer gridSize={10}>
        <Grid size={10} />

        <Node position={undefined} size={0.4} />
        <Node position={[5, 0]} size={0.4} />
        <Node position={[5, 0, "k"]} size={0.4} />
        <Node position={[5, , 0]} size={0.4} />

        <Node position={[5, 0, 0]} size={0.4} />

        <Element start={undefined} end={undefined} />
        <Element start={[0, 0]} end={[5, 0]} />
        <Element start={[0, 0, "k"]} end={[5, 0, "k"]} />
        <Element start={[0, , 0]} end={[5, , 0]} />

        <Element start={[0, 0, 0]} end={[5, 0, 0]} />

        <NodeSupport
          position={undefined}
          support={[true, false, false]}
          size={0.4}
        />
        <NodeSupport
          position={[0, 0]}
          support={[true, false, false]}
          size={0.4}
        />
        <NodeSupport
          position={[0, 0, "k"]}
          support={[true, false, false]}
          size={0.4}
        />
        <NodeSupport
          position={[0, , 0]}
          support={[true, false, false]}
          size={0.4}
        />

        <NodeSupport position={[0, 0, 0]} support={undefined} size={0.4} />
        <NodeSupport position={[0, 0, 0]} support={[true, false]} size={0.4} />
        <NodeSupport
          position={[0, 0, 0]}
          support={[true, true, "k"]}
          size={0.4}
        />
        <NodeSupport
          position={[0, 0, 0]}
          support={[true, , false]}
          size={0.4}
        />

        <NodeSupport
          position={[0, 0, 0]}
          support={[false, false, false]}
          size={0.4}
        />
        <NodeSupport
          position={[0, 0, 0]}
          support={[true, false, false]}
          size={0.4}
        />
        <NodeSupport
          position={[0, 0, 5]}
          support={[true, true, true]}
          size={0.4}
        />

        <NodeLoad position={undefined} load={[0, 0, 100]} size={0.8} />
        <NodeLoad position={[5, 0]} load={[0, 0, 100]} size={0.8} />
        <NodeLoad position={[5, 0, "k"]} load={[0, 0, 100]} size={0.8} />
        <NodeLoad position={[5, , 0]} load={[0, 0, 100]} size={0.8} />

        <NodeLoad position={[5, 0, 0]} load={undefined} size={0.8} />
        <NodeLoad position={[5, 0, 0]} load={[1, 2]} size={0.8} />
        <NodeLoad position={[5, 0, 0]} load={[1, 2, "k"]} size={0.8} />
        <NodeLoad position={[5, 0, 0]} load={[1, , 3]} size={0.8} />

        <NodeLoad position={[5, 0, 0]} load={[0, 0, 100]} size={0.8} />
        <NodeLoad position={[5, 0, 0]} load={[100, 0, -100]} size={0.8} />

        <ElementResult
          start={undefined}
          end={undefined}
          result={10}
          size={0.4}
        />
        <ElementResult start={[0, 0]} end={[5, 0]} result={10} size={0.8} />
        <ElementResult
          start={[0, 0, "k"]}
          end={[5, 0, "k"]}
          result={10}
          size={0.8}
        />
        <ElementResult start={[0, , 0]} end={[5, , 0]} result={10} size={0.8} />

        <ElementResult
          start={[0, 0, 0]}
          end={[-3, 0, 1]}
          result={undefined}
          size={0.8}
        />
        <ElementResult
          start={[0, 0, 0]}
          end={[-3, 0, 1]}
          result={true}
          size={0.8}
        />

        <ElementResult
          start={[-5, 0, 0]}
          end={[-2, 2, 2]}
          result={10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-2, 2, 2]} />
        <ElementResult
          start={[-5, 0, 0]}
          end={[-8, -2, 3]}
          result={-10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-8, -2, 3]} />
        <ElementResult
          start={[-5, 0, 0]}
          end={[-8, -1, -2]}
          result={10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-8, -1, -2]} />
        <ElementResult
          start={[-5, 0, 0]}
          end={[-4, 1, -3]}
          result={-10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-4, 1, -3]} />

        <ElementResult
          start={[-5, 0, 0]}
          end={[-2, 0.5, 0]}
          result={10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-2, 0.5, 0]} />
        <ElementResult
          start={[-5, 0, 0]}
          end={[-8, 0, 0]}
          result={-10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-8, 0, 0]} />
        <ElementResult
          start={[-5, 0, 0]}
          end={[-5, 0, 3]}
          result={10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-5, 0, 3]} />
        <ElementResult
          start={[-5, 0, 0]}
          end={[-5, 0, -3]}
          result={-10}
          size={0.8}
        />
        <Element start={[-5, 0, 0]} end={[-5, 0, -3]} />

        <NodeResult position={undefined} result={[0, 0, 100]} size={0.8} />
        <NodeResult position={[5, 0]} result={[0, 0, 100]} size={0.8} />
        <NodeResult position={[5, 0, "k"]} result={[0, 0, 100]} size={0.8} />
        <NodeResult position={[5, , 0]} result={[0, 0, 100]} size={0.8} />

        <NodeResult position={[5, 0, 0]} result={undefined} size={0.8} />
        <NodeResult position={[5, 0, 0]} result={[1, 2]} size={0.8} />
        <NodeResult position={[5, 0, 0]} result={[1, 2, "k"]} size={0.8} />
        <NodeResult position={[5, 0, 0]} result={[1, , 3]} size={0.8} />

        <NodeResult position={[0, 0, 0]} result={[-50, 0, 100]} size={0.8} />

        <Text text={undefined} position={[-8, 0, 5]} size={1} />
        <Text text={"here is text"} position={undefined} size={1} />

        <Text text={true} position={[-8, 0, 5]} size={0.5} />
        <Text text={"here is text"} position={["k", 0, 5]} size={0.5} />
        <Text text={"here is text"} position={[0, , 5]} size={0.5} />

        <Text text={"here is text"} position={[-5, 0, 5]} size={0.5} />
      </Viewer>
    </div>
  ),
} as Meta;
