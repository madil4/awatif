import { Session, createClient } from "@supabase/supabase-js";
import { Show, createSignal } from "solid-js";

export const UserPane = () => {
  const supabase = createClient(
    "https://cayyihbcbshvvffjtbky.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNheXlpaGJjYnNodnZmZmp0Ymt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU4MTg0OTIsImV4cCI6MjAwMTM5NDQ5Mn0.gN9iy2Gd2utQa7Ii5mp7hd81BRVqUKnLMX8wg3O6kgk"
  );

  const [session, setSession] = createSignal<Session | null>();
  const [active, setActive] = createSignal(true);
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const login = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: username(),
      password: password(),
    });

    if (data) setSession(data.session);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUsername("");
    setPassword("");
  };

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return (
    <>
      <div class="absolute top-0 right-10">
        <button
          class="w-20 h-6 bg-[#38383d] text-[#bbbcc4] float-right"
          onclick={() => setActive((v) => !v)}
        >
          User
        </button>
        <Show when={active()}>
          <Show
            when={session()}
            fallback={
              <div class="w-72 bg-[#29292e] mt-6 py-4 px-2">
                <input
                  type="text"
                  placeholder="Username"
                  class="bg-[#38383d] text-[#bbbcc4] block w-full mx-auto text-sm py-2 px-3 rounded"
                  onchange={(e: any) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  class="bg-[#38383d] text-[#bbbcc4] block w-full mx-auto text-sm py-2 px-3 rounded my-3"
                  onchange={(e: any) => setPassword(e.target.value)}
                />
                <button
                  onclick={login}
                  class=" text-[#28292e] bg-[#adafb8] rounded block mx-auto w-full"
                >
                  Login
                </button>
              </div>
            }
          >
            <div class="w-72 bg-[#29292e] mt-6 py-4 px-2">
              <p class=" text-[#bbbcc4]">Hi, {session()?.user.email}</p>
              <button
                onclick={logout}
                class=" text-[#28292e] bg-[#adafb8] rounded block mx-auto w-full mt-2"
              >
                Log out
              </button>
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
};
