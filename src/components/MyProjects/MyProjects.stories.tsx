import { Meta, StoryObj } from "@storybook/html";
import { MyProjects } from "./MyProjects";
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";

export const Default: StoryObj = {};

export default {
  title: "MyProjects",
  render: () => (
    <div>
      <MyProjects />
      <div class="dropdown-content card card-compact w-80 p-2 bg-base-100 text-primary-content">
        <div class="card-body">
          <Login onGoogleClick={() => {}} onAzureClick={() => {}} />
        </div>
      </div>
      <div class="dropdown-content card card-compact w-80 p-2 bg-base-100 text-primary-content mt-10">
        <div class="card-body">
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
      </div>
    </div>
  ),
} as Meta;
