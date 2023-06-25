import { MyProjects } from "../MyProjects/MyProjects";

type EditorBarProps = {
  error?: string;
};

export function EditorBar(props: EditorBarProps) {
  return (
    <div class="tabs">
      <a class="tab tab-bordered tab-active">main.js</a>
      <div class="badge badge-sm badge-neutral mb-auto mt-2 ml-3">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc9k3Wv6jbPreGL39C7-0piytRyO9AoQlDvXoonI-sBf_M0EQ/viewform"
          target="_blank"
        >
          📢 Feedback?
        </a>
      </div>
      <div class="text-l ml-auto mr-1 mb-[0.2rem]">
        {props.error ? (
          <>
            <div class="tooltip tooltip-bottom" data-tip={props.error}>
              ❌
            </div>
          </>
        ) : (
          <>👌</>
        )}
      </div>
      <div class="mb-auto mt-[0.15rem] mr-1">
        <MyProjects />
      </div>
    </div>
  );
}
