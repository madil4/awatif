import { Session, createClient } from "@supabase/supabase-js";
import { Show, createSignal } from "solid-js";
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";

export const supabase = createClient(
  "https://cayyihbcbshvvffjtbky.supabase.co",
  import.meta.env.VITE_API_KEY || "dummy-key"
);

export const UserPane = () => {
  const [session, setSession] = createSignal<Session | null>();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function signInWithAzure() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email",
      },
    });
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return (
    <div class="absolute top-2 right-2 dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-xs">
        <div class="avatar">
          <div class="w-7 rounded-full">
            <img src="./avatar.jpg" />
          </div>
        </div>
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
        class="dropdown-content card card-compact w-80 p-2 bg-base-100 text-primary-content"
      >
        <div class="card-body">
          <Show
            when={session()}
            fallback={
              <Login
                onGoogleClick={signInWithGoogle}
                onAzureClick={signInWithAzure}
              />
            }
          >
            <Projects />
          </Show>
        </div>
      </div>
    </div>
  );
};
