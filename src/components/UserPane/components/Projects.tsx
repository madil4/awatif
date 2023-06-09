import { Index } from "solid-js";

export type Project = {
  name: string;
};

type ProjectsProps = {
  projects: Project[];
};

export function Projects(props: ProjectsProps) {
  return (
    <>
      <p>Projects List</p>
      <div class="overflow-x-auto h-max-48">
        <table class="table table-sm">
          <tbody>
            <Index each={props.projects}>
              {(project) => (
                <tr class="hover">
                  <td>{project().name}</td>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
      </div>
    </>
  );
}
