import { Session, createClient } from "@supabase/supabase-js";
import { Show, createSignal } from "solid-js";

export const UserPane = () => {
  const supabase = createClient(
    "https://cayyihbcbshvvffjtbky.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNheXlpaGJjYnNodnZmZmp0Ymt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU4MTg0OTIsImV4cCI6MjAwMTM5NDQ5Mn0.gN9iy2Gd2utQa7Ii5mp7hd81BRVqUKnLMX8wg3O6kgk"
  );

  const [session, setSession] = createSignal<Session | null>();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  const logout = async () => {
    await supabase.auth.signOut();
  };

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
            fallback={<Login onGoogleClick={signInWithGoogle} />}
          >
            <button class="btn btn-block btn-neutral" onclick={logout}>
              logout
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
};

const Login = (props: any) => {
  return (
    <>
      <p>Sign in to your account</p>
      <button
        class="btn btn-block btn-neutral mt-2"
        onclick={props.onGoogleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="h-4 w-4"
          viewBox="0 0 256 256"
        >
          <path d="M128,228A100,100,0,1,1,198.71069,57.28906,12.0001,12.0001,0,1,1,181.74,74.25977,75.99547,75.99547,0,1,0,203.05371,140H128a12,12,0,0,1,0-24h88a12,12,0,0,1,12,12A100.11332,100.11332,0,0,1,128,228Z" />
        </svg>
        Continue with Google
      </button>
      <button class="btn btn-block btn-neutral">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="h-4 w-4"
          viewBox="0 0 512 512"
        >
          <path d="M31.87,30.58H244.7V243.39H31.87Z" />
          <path d="M266.89,30.58H479.7V243.39H266.89Z" />
          <path d="M31.87,265.61H244.7v212.8H31.87Z" />
          <path d="M266.89,265.61H479.7v212.8H266.89Z" />
        </svg>
        Continue with Microsoft
      </button>
    </>
  );
};
