import { Show } from "solid-js";
import { MyProjects } from "../Projects/MyProjects";
import { Upgrade } from "../Upgrade/Upgrade";

type EditorBarProps = {
  error?: string;
  userPlan?: string;
  showSave?: boolean;
  onSave?: () => void;
};

export function EditorBar(props: EditorBarProps) {
  return (
    <div class="tabs justify-between items-start">
      <div class="flex flex-row">
        <a class="tab tab-bordered tab-active">main.js</a>
        <Show when={props.showSave}>
          <div class="tooltip tooltip-bottom" data-tip="shortcut ctrl/cmd + s ">
            <button
              class="btn btn-xs btn-neutral mt-1 ml-2"
              onclick={props.onSave}
            >
              💾 save
            </button>
          </div>
        </Show>
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
        <Show when={props.error}>
          <div
            class="tooltip tooltip-bottom mt-[0.2rem]"
            data-tip={props.error}
          >
            ❌
          </div>
        </Show>
        <Show when={props.userPlan === "free"}>
          <Upgrade />
        </Show>
        <MyProjects />
      </div>
    </div>
  );
}
