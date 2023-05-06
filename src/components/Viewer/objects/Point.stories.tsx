import { Meta, StoryObj } from "@storybook/html";
import { DefaultViewer } from "../DefaultViewer";
import { Point } from "./Point";

export const Default: StoryObj = {};

export default {
  title: "Viewer/Point",
  render: () => (
    <div class="w-screen h-screen">
      <DefaultViewer>
        <Point position={[0, 0, 0]} />
        <Point position={[3, 0, 0]} />
        <Point position={[0, 3, 0]} />
        <Point position={[0, 0, 3]} />
      </DefaultViewer>
    </div>
  ),
} as Meta;
