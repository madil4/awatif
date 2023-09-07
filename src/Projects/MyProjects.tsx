import { Session } from "@supabase/supabase-js";
import { Show, createSignal, onMount } from "solid-js";
import { Projects } from "./Projects";
import { supabase } from "../Login/Login";

export const MyProjects = () => {
  const [session, setSession] = createSignal<Session | null>();

  onMount(async () => {
    setSession((await supabase.auth.getSession()).data.session);
  });

  return (
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-xs btn-neutral">
        <span>Projects</span>
        <svg
          width="8px"
          height="8px"
          class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </label>

      <div
        tabindex="0"
        class="z-50 dropdown-content card card-compact w-80 p-2 bg-base-100 "
      >
        <div class="card-body">
          <Show
            when={session()}
            fallback={
              <>
                <p>Login to manage your projects</p>
                <button
                  class="btn btn-sm btn-neutral"
                  // @ts-ignore
                  onclick="LoginModal.showModal()"
                >
                  Login
                </button>
              </>
            }
          >
            <Projects />
          </Show>
        </div>
      </div>
    </div>
  );
};
