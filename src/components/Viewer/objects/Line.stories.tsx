import { Meta, StoryObj } from "@storybook/html";
import { DefaultViewer } from "../DefaultViewer";
import { Line } from "./Line";

export const Default: StoryObj = {};

export default {
  title: "Viewer/Line",
  render: () => (
    <div class="w-screen h-screen">
      <DefaultViewer>
        <Line start={[0, 0, 0]} end={[3, 0, 0]} />
        <Line start={[0, 0, 0]} end={[0, 3, 0]} />
        <Line start={[0, 0, 0]} end={[0, 0, 3]} />
      </DefaultViewer>
    </div>
  ),
} as Meta;
