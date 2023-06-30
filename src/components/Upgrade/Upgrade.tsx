import { Session, createClient } from "@supabase/supabase-js";
import { Show, createSignal, onMount } from "solid-js";

export const supabase = createClient(
  "https://cayyihbcbshvvffjtbky.supabase.co",
  import.meta.env.VITE_SUPABASE_KEY || "dummy-key"
);

export function Upgrade() {
  const redirectTo =
    import.meta.env.MODE === "development"
      ? "http://localhost:4600/"
      : "https://app.awatif.co/";

  const [session, setSession] = createSignal<Session | null>();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  async function signInWithAzure() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo,
        scopes: "email",
      },
    });
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return (
    <>
      {/* @ts-ignore */}
      <button class="btn btn-xs btn-primary" onclick="my_modal_2.showModal()">
        Upgrade to Pro
      </button>

      <dialog id="my_modal_2" class="modal">
        <form method="dialog" class="modal-box w-11/12 max-w-2xl">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <Show
            when={session()}
            fallback={
              <Login
                onGoogleClick={signInWithGoogle}
                onAzureClick={signInWithAzure}
              />
            }
          >
            <Plans email={session()?.user.email || ""} />
          </Show>
        </form>
        <form method="dialog" class="modal-backdrop">
          <button />
        </form>
      </dialog>
    </>
  );
}

function Plans(props: { email: string }) {
  const checkoutURL =
    import.meta.env.MODE === "development"
      ? "https://cayyihbcbshvvffjtbky.supabase.co/functions/v1/stripe-checkout-test"
      : "https://cayyihbcbshvvffjtbky.supabase.co/functions/v1/stripe-checkout";
  const prices: { monthly: string; annually: string } =
    import.meta.env.MODE === "development"
      ? {
          monthly: "price_1NOiZwJwIWdjwnrnNgZRoxv6",
          annually: "price_1NOiamJwIWdjwnrn6VVlu1DA",
        }
      : {
          monthly: "price_1NMd3SJwIWdjwnrnd1wxUXjf",
          annually: "price_1NOj4nJwIWdjwnrnPMXi0Ozo",
        };

  const [annual, setAnnual] = createSignal(false);

  const toggleAnnual = () => {
    setAnnual((v) => !v);
  };

  return (
    <>
      <div class="flex flex-row justify-between">
        <h3 class="font-bold text-lg mb-5">Your plan</h3>
        <div class="form-control mr-2">
          <label class="label cursor-pointer">
            <span class="label-text mr-2">Annual Plan</span>
            <input type="checkbox" class="toggle" onclick={toggleAnnual} />
          </label>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 mx-auto text-center md:grid-cols-2">
        <div class="overflow-hidden border-2 border-gray-100 rounded-md p-5">
          <p class="mb-4 text-lg font-medium text-gray-500">Free</p>
          <p class="text-4xl font-bold mb-5">Free</p>
          <ul class="text-left space-y-1 mb-5">
            <li>✔️ Limit of 10 projects</li>
            <li>✔️ Limit of 20 elements</li>
          </ul>
          <a class="btn btn-disabled btn-wide">Your current plan</a>
        </div>

        <div class="overflow-hidden border-2 border-gray-100 rounded-md p-5">
          <p class="mb-4 text-lg font-medium text-gray-500">PRO</p>
          <p class="text-4xl font-bold mb-5">
            {annual() ? <>$250/y</> : <>$25/m</>}
          </p>
          <ul class="text-left space-y-1 mb-5">
            <li>✅ Unlimited projects</li>
            <li>✅ Unlimited elements</li>
          </ul>
          <form
            action={checkoutURL}
            // @ts-ignore
            method="POST"
          >
            <input type="hidden" name="email" value={props.email} />
            <input
              type="hidden"
              name="price"
              value={annual() ? prices.annually : prices.monthly}
            />
            <button class="btn btn-primary btn-wide" type="submit">
              Upgrade plan
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function Login(props: { onGoogleClick: () => void; onAzureClick: () => void }) {
  return (
    <>
      <h3 class="font-bold text-lg mb-5">Login First</h3>
      <div class="flex flex-col space-y-3 w-2/3 mx-auto">
        <a class="btn btn-neutral" onclick={props.onGoogleClick}>
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
        <a class="btn btn-neutral" onclick={props.onAzureClick}>
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
    </>
  );
}
