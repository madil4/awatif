import { Index, createSignal } from "solid-js";
import { supabase } from "../UserPane";

export type Project = {
  name: string;
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
      const { data, error } = await supabase
        .from("projects")
        .insert([{ name: projectName() }]);
    }

    setProjectName("");
    getProjects();
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
                <tr class="hover">
                  <td>{project().name}</td>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
      </div>
      <form onSubmit={addProject}>
        <input
          class="input input-sm mt-3 input-bordered"
          type="text"
          placeholder="Add new project"
          value={projectName()}
          onInput={(e) => setProjectName(e.currentTarget.value)}
        />
      </form>
    </>
  );
}
