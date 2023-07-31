import { Show } from "solid-js";
import { MyProjects } from "../Projects/MyProjects";
import { Upgrade } from "../Upgrade/Upgrade";
import { staging } from "../App/App";

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
        <Show when={staging}>
          <Export />
        </Show>
        <MyProjects />
        <Help />
      </div>
    </div>
  );
}

function Help() {
  return (
    <div class="dropdown dropdown-end">
      <a tabindex="0" class="btn btn-xs btn-neutral">
        <span>Help</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </a>

      <div
        tabindex="0"
        class="z-50 dropdown-content card card-compact w-80 p-2 bg-base-100 "
      >
        <div class="card-body">
          <a
            class="btn btn-sm btn-neutral"
            href="https://awatif.co/examples"
            target="_blank"
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m13.429 8-4.681 2.702-4.681 2.703V2.594l4.68 2.703 4.682 2.702Z"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-linejoin="bevel"
              ></path>
            </svg>
            <span class="capitalize">Examples</span>
          </a>
          <a
            class="btn btn-sm btn-neutral"
            href="https://mohamedadil.notion.site/Getting-started-a8565ccbdea641b7b4793a6f42d983af?pvs=4"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span class="capitalize">Documentation</span>
          </a>
          <a
            class="btn btn-sm btn-neutral"
            href="https://awatif.co/blog"
            target="_blank"
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 12V5l-.009-3H3v10.5m0 0A1.5 1.5 0 0 0 4.5 14H13v-1.65L12.991 11H4.5A1.5 1.5 0 0 0 3 12.5ZM5.005 2v4l1.5-1.695L8.005 6V2h-3Z"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-linejoin="bevel"
              ></path>
            </svg>
            <span class="capitalize">Blog</span>
          </a>
          <a
            class="btn btn-sm btn-neutral"
            href="https://docs.google.com/forms/d/e/1FAIpQLSc9k3Wv6jbPreGL39C7-0piytRyO9AoQlDvXoonI-sBf_M0EQ/viewform"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span class="capitalize">Feedback</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Export() {
  return <button class="btn btn-xs btn-neutral">Export</button>;
}
