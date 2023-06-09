import { Index, createSignal } from "solid-js";
import { supabase } from "../UserPane";

export type Project = {
  name: string;
  id: number;
};

type ProjectsProps = {
  testingProjects?: Project[];
};

export function Projects(props: ProjectsProps) {
  const [projects, setProjects] = createSignal<Project[]>(
    props.testingProjects || []
  );
  const [projectName, setProjectName] = createSignal("");

  async function getProjects() {
    if (props.testingProjects) return;

    let { data, error } = await supabase.from("projects").select("*");
    if (data) {
      setProjects(data as Project[]);
    }
  }

  async function addProject(e: SubmitEvent) {
    e.preventDefault();

    if (props.testingProjects) return;

    if (projectName()) {
      const user = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("projects")
        .insert([{ name: projectName(), user_id: user.data.user?.id }]);
    }

    setProjectName("");
    getProjects();
  }

  async function deleteProject(id: number) {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", `${id}`);

    getProjects();
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  getProjects();

  return (
    <>
      <p>Projects List</p>
      <div class="overflow-x-auto max-h-44">
        <table class="table table-sm">
          <tbody>
            <Index each={projects()}>
              {(project) => (
                <tr class="group/item">
                  <td class="w-4/5">
                    <button class="btn btn-sm btn-neutral">
                      {project().name}
                    </button>
                  </td>
                  <td class="w-1/5">
                    <button
                      class="group-hover/item:visible btn btn-xs btn-error invisible"
                      onclick={() => deleteProject(project().id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between mt-3">
        <form onSubmit={addProject}>
          <input
            class="input input-sm input-bordered w-11/12"
            type="text"
            placeholder="Add new project"
            value={projectName()}
            onInput={(e) => setProjectName(e.currentTarget.value)}
          />
        </form>
        <button class="btn btn-sm btn-neutral" onclick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}
