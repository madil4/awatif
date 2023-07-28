import { Meta, StoryObj } from "@storybook/html";
import { Login } from "./Login";

export const Default: StoryObj = {};

export default {
  title: "Login",
  // @ts-ignore
  play: () => LoginModal.showModal(),
  render: () => <Login />,
} as Meta;
