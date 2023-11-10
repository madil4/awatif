import { Meta, StoryObj } from "@storybook/html";
import { Parameters } from "./Parameters";
import { ComponentProps } from "solid-js";

type Args = ComponentProps<typeof Parameters>;

export const Empty: StoryObj = {
  args: {
    parameters: {},
  },
};

export const Default: StoryObj = {
  args: {
    parameters: {
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
        label: "another height",
      },
    },
  },
};

export const WithFolders: StoryObj<Args> = {
  args: {
    parameters: {
      "folder-1/width": {
        value: 5,
        min: 1,
        max: 10,
        step: 1,
      },
      "folder-1/height": {
        value: 50,
        min: 0,
        max: 100,
        step: 5,
        label: "another height",
      },
      "folder-2/width": {
        value: 9,
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
};

export const WithFoldersAndWithout: StoryObj<Args> = {
  args: {
    parameters: {
      "folder-1/width": {
        value: 5,
        min: 1,
        max: 10,
        step: 1,
      },
      width: {
        value: 9,
        min: 1,
        max: 10,
        step: 1,
      },
      "folder-2/height": {
        value: 50,
        min: 0,
        max: 100,
        step: 5,
        label: "another height",
      },
    },
  },
};

export default {
  title: "Parameters",
  render: (props) => <Parameters {...props} />,
} as Meta<Args>;
