import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cayyihbcbshvvffjtbky.supabase.co",
  import.meta.env.VITE_SUPABASE_KEY || "dummy-key"
);

export function Login() {
  const redirectTo =
    import.meta.env.MODE === "development"
      ? "http://localhost:4600/"
      : "https://app.awatif.co/";

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  async function signInWithAzure() {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo,
        scopes: "email",
      },
    });
  }

  return (
    <dialog id="LoginModal" class="modal">
      <form method="dialog" class="modal-box w-11/12 max-w-l">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>

        <h3 class="font-bold text-lg mb-5">Welcome back</h3>
        <div class="flex flex-col space-y-3 w-2/3 mx-auto">
          <a class="btn btn-neutral" onclick={signInWithGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="h-4 w-4"
              viewBox="0 0 256 256"
            >
              <path d="M128,228A100,100,0,1,1,198.71069,57.28906,12.0001,12.0001,0,1,1,181.74,74.25977,75.99547,75.99547,0,1,0,203.05371,140H128a12,12,0,0,1,0-24h88a12,12,0,0,1,12,12A100.11332,100.11332,0,0,1,128,228Z" />
            </svg>
            Continue with Google
          </a>
          <a class="btn btn-neutral" onclick={signInWithAzure}>
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
          </a>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button />
      </form>
    </dialog>
  );
}
