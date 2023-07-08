import { Meta, StoryObj } from "@storybook/html";
import { Projects } from "./Projects";

export const Default: StoryObj = {};

export default {
  title: "Projects",
  render: () => (
    <div class="w-1/4 p-5 bg-base-200">
      <Projects
        testingProjects={[
          {
            title: "first project",
            id: -1,
            user_id: "123",
            slug: "first-project",
          },
          {
            title: "second project",
            id: -2,
            user_id: "123",
            slug: "first-project",
          },
        ]}
      />
    </div>
  ),
} as Meta;
