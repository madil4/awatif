import { Session } from "@supabase/supabase-js";
import { Show, createSignal, onMount } from "solid-js";
import { supabase } from "../Login/Login";

export function Upgrade() {
  const [session, setSession] = createSignal<Session | null>();

  onMount(async () => {
    setSession((await supabase.auth.getSession()).data.session);
  });

  return (
    <>
      {/* @ts-ignore */}
      <button class="btn btn-xs btn-primary" onclick="UpgradeModal.showModal()">
        Upgrade
      </button>

      <dialog id="UpgradeModal" class="modal">
        <form method="dialog" class="modal-box w-11/12 max-w-2xl">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <Plans email={session()?.user.email || ""} />
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
            <li>✔️ Limit of 20 elements</li>
          </ul>
          <a class="btn btn-disabled btn-wide">Your current plan</a>
        </div>

        <div class="overflow-hidden border-2 border-gray-100 rounded-md p-5">
          <p class="mb-4 text-lg font-medium text-gray-500">PRO</p>
          <p class="text-4xl font-bold mb-5">
            {annual() ? <>€100/y</> : <>€10/m</>}
          </p>
          <ul class="text-left space-y-1 mb-5">
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
            <Show
              when={props.email}
              fallback={
                <a
                  class="btn btn-primary btn-wide"
                  onclick={() => {
                    // @ts-ignore
                    UpgradeModal.close();
                    // @ts-ignore
                    LoginModal.showModal();
                  }}
                >
                  Login first
                </a>
              }
            >
              <button class="btn btn-primary btn-wide" type="submit">
                Upgrade plan
              </button>
            </Show>
          </form>
        </div>
      </div>
    </>
  );
}
