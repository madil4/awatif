import { Meta, StoryObj } from "@storybook/html";
import { UserPane } from "./UserPane";
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";

export const Default: StoryObj = {};

export default {
  title: "UserPane",
  render: () => (
    <div>
      <UserPane />
      <div class="dropdown-content card card-compact w-80 p-2 bg-base-100 text-primary-content">
        <div class="card-body">
          <Login onGoogleClick={() => {}} onAzureClick={() => {}} />
        </div>
      </div>
      <div class="dropdown-content card card-compact w-80 p-2 bg-base-100 text-primary-content mt-10">
        <div class="card-body">
          <Projects
            testingProjects={[
              { name: "first project" },
              { name: "second project" },
            ]}
          />
        </div>
      </div>
    </div>
  ),
} as Meta;
