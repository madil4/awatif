import { Show } from "solid-js";
import { MyProjects } from "../MyProjects/MyProjects";
import { Upgrade } from "../Upgrade/Upgrade";

type EditorBarProps = {
  error?: string;
};

export function EditorBar(props: EditorBarProps) {
  return (
    <div class="tabs justify-between items-start">
      <div class="flex flex-row">
        <a class="tab tab-bordered tab-active">main.js</a>
        <div class="badge badge-sm badge-neutral mt-2 ml-2">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc9k3Wv6jbPreGL39C7-0piytRyO9AoQlDvXoonI-sBf_M0EQ/viewform"
            target="_blank"
          >
            In Beta, Feedback?
          </a>
        </div>
      </div>
      <div class="flex flex-row space-x-2 mr-2 mt-[0.15rem]">
        {/* @ts-ignore */}
        <Show when={props.error?.message === "er"}>
          <div class="badge badge-sm badge-warning mt-[0.35rem]">
            Reached 20 free element limit. Upgrade to Pro
          </div>
        </Show>
        <div class="mt-[0.2rem]">
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
        <div>
          <Upgrade />
        </div>
        <div>
          <MyProjects />
        </div>
      </div>
    </div>
  );
}
