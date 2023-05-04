import { Show, createSignal } from "solid-js";
import { A } from "solid-start";

export const Navbar = () => {
  let [mobileMenuOn, setMobileMenuOn] = createSignal(false);

  const toggleMobileMene = () => setMobileMenuOn(!mobileMenuOn());

  return (
    <nav class="flex justify-between items-center mt-4 mb-10">
      <div class="flex items-center">
        <A href="/">
          <img src="../logo.svg" alt="Awatif" class="w-12 h-12 mr-2" />
        </A>
        <A href="/" class="text-xl">
          Awatif
        </A>
      </div>

      <div>
        <div class="hidden space-x-4 md:block">
          <a href="https://app.awatif.co" target="_blank">
            App
          </a>
          <A href="/docs">Docs</A>
          <A href="/examples">Examples</A>
          <A href="/blog">Blog</A>
          <A href="/pricing">Pricing</A>
        </div>

        <button onclick={toggleMobileMene} class="text-3xl md:hidden">
          <Show when={mobileMenuOn()} fallback={<>☰</>}>
            x
          </Show>
        </button>

        <Show when={mobileMenuOn()}>
          <div class="md:hidden absolute flex flex-col items-center py-4 mt-5 space-y-4 bg-white left-6 right-6 drop-shadow-md">
            <a href="https://app.awatif.co" target="_blank">
              App
            </a>
            <A href="/docs" onclick={toggleMobileMene}>
              Docs
            </A>
            <A href="/examples" onclick={toggleMobileMene}>
              Examples
            </A>
            <A href="/blog" onclick={toggleMobileMene}>
              Blog
            </A>
            <A href="/pricing" onclick={toggleMobileMene}>
              Pricing
            </A>
          </div>
        </Show>
      </div>
    </nav>
  );
};
