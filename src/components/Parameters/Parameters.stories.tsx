import { Meta, StoryObj } from "@storybook/html";
import { Parameters } from "./Parameters";

export const Default: StoryObj = {};

export default {
  title: "Parameters",
  render: () => (
    <Parameters
      parameters={{
        width: {
          value: 5,
          min: 1,
          max: 10,
          step: 1,
        },
        height: {
          value: 50,
          min: 0,
          max: 100,
          step: 5,
        },
      }}
    />
  ),
} as Meta;
