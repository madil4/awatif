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
import { Axes } from "./objects/Axes";

export const Default: StoryObj = {};
const gridSize = 100;

export default {
  title: "Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer gridSize={gridSize}>
        <Grid position={[0.5 * gridSize, 0.5 * gridSize, 0]} size={gridSize} />
        <Axes position={[0, 0, 0]} size={0.04 * gridSize} />

        <Node position={undefined} size={0.04 * gridSize} />
        <Node position={[50, 0]} size={0.04 * gridSize} />
        <Node position={[50, 0, "k"]} size={0.04 * gridSize} />
        <Node position={[50, , 0]} size={0.04 * gridSize} />

        <Node position={[80, 50, 0]} size={0.04 * gridSize} />

        <Element start={undefined} end={undefined} />
        <Element start={[50, 0]} end={[50, 0]} />
        <Element start={[50, 0, "k"]} end={[50, 0, "k"]} />
        <Element start={[50, , 0]} end={[50, , 0]} />

        <Element start={[50, 50, 0]} end={[80, 50, 0]} />

        <NodeSupport
          position={undefined}
          support={[true, false, false]}
          size={0.04 * gridSize}
        />
        <NodeSupport
          position={[0, 0]}
          support={[true, false, false]}
          size={0.04 * gridSize}
        />
        <NodeSupport
          position={[0, 0, "k"]}
          support={[true, false, false]}
          size={0.04 * gridSize}
        />
        <NodeSupport
          position={[0, , 0]}
          support={[true, false, false]}
          size={0.04 * gridSize}
        />

        <NodeSupport
          position={[0, 0, 0]}
          support={undefined}
          size={0.04 * gridSize}
        />
        <NodeSupport
          position={[0, 0, 0]}
          support={[true, false]}
          size={0.04 * gridSize}
        />
        <NodeSupport
          position={[0, 0, 0]}
          support={[true, true, "k"]}
          size={0.04 * gridSize}
        />
        <NodeSupport
          position={[0, 0, 0]}
          support={[true, , false]}
          size={0.04 * gridSize}
        />
        <NodeSupport
          position={[0, 0, 0]}
          support={[false, false, false]}
          size={0.04 * gridSize}
        />

        <NodeSupport
          position={[50, 50, 0]}
          support={[true, true, true]}
          size={0.04 * gridSize}
        />

        <NodeLoad position={undefined} load={[0, 0, 100]} size={1} />
        <NodeLoad position={[5, 0]} load={[0, 0, 100]} size={1} />
        <NodeLoad position={[5, 0, "k"]} load={[0, 0, 100]} size={1} />
        <NodeLoad position={[5, , 0]} load={[0, 0, 100]} size={1} />

        <NodeLoad position={[5, 0, 0]} load={undefined} size={1} />
        <NodeLoad position={[5, 0, 0]} load={[1, 2]} size={1} />
        <NodeLoad position={[5, 0, 0]} load={[1, 2, "k"]} size={1} />
        <NodeLoad position={[5, 0, 0]} load={[1, , 3]} size={1} />

        <NodeLoad
          position={[80, 50, 0]}
          load={[0, 0, 100]}
          size={0.07 * gridSize}
        />
        <NodeLoad
          position={[80, 50, 0]}
          load={[100, 0, -100]}
          size={0.07 * gridSize}
        />

        <ElementResult
          start={undefined}
          end={undefined}
          result={10}
          size={0.04 * gridSize}
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
          start={[0, 50, 0]}
          end={[20, 50, 20]}
          result={1}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[20, 50, 20]} />
        <ElementResult
          start={[0, 50, 0]}
          end={[20, 40, -20]}
          result={-2}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[20, 40, -20]} />
        <ElementResult
          start={[0, 50, 0]}
          end={[-20, 40, 20]}
          result={3}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[-20, 40, 20]} />
        <ElementResult
          start={[0, 50, 0]}
          end={[-20, 60, -20]}
          result={-4}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[-20, 60, -20]} />

        <ElementResult
          start={[0, 50, 0]}
          end={[20, 55, 0]}
          result={5}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[20, 55, 0]} />
        <ElementResult
          start={[0, 50, 0]}
          end={[-20, 50, 0]}
          result={-6}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[-20, 50, 0]} />
        <ElementResult
          start={[0, 50, 0]}
          end={[0, 50, 20]}
          result={7}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[0, 50, 20]} />
        <ElementResult
          start={[0, 50, 0]}
          end={[0, 50, -20]}
          result={-8}
          size={0.04 * gridSize}
        />
        <Element start={[0, 50, 0]} end={[0, 50, -20]} />

        <NodeResult position={undefined} result={[0, 0, 100]} size={0.8} />
        <NodeResult position={[5, 0]} result={[0, 0, 100]} size={0.8} />
        <NodeResult position={[5, 0, "k"]} result={[0, 0, 100]} size={0.8} />
        <NodeResult position={[5, , 0]} result={[0, 0, 100]} size={0.8} />

        <NodeResult position={[5, 0, 0]} result={undefined} size={0.8} />
        <NodeResult position={[5, 0, 0]} result={[1, 2]} size={0.8} />
        <NodeResult position={[5, 0, 0]} result={[1, 2, "k"]} size={0.8} />
        <NodeResult position={[5, 0, 0]} result={[1, , 3]} size={0.8} />

        <NodeResult
          position={[50, 50, 0]}
          result={[-50, 0, 100]}
          size={0.07 * gridSize}
        />

        <Text text={undefined} position={[-8, 0, 5]} size={1} />
        <Text text={"here is text"} position={undefined} size={1} />

        <Text text={true} position={[-8, 0, 5]} size={0.5} />
        <Text text={"here is text"} position={["k", 0, 5]} size={0.5} />
        <Text text={"here is text"} position={[0, , 5]} size={0.5} />

        <Text
          text={"here is text"}
          position={[0, 50, 30]}
          size={0.04 * gridSize}
        />
      </Viewer>
    </div>
  ),
} as Meta;
