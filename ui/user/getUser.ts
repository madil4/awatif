import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";
import { supabase } from "../backend/supabase";
import type { User, Session } from "@supabase/supabase-js";

import "./styles.css";

export function getUser({
  user,
}: {
  user: State<User | null>;
}): HTMLDivElement {
  const container = document.createElement("div");
  const modalRef = createRef<HTMLDialogElement>();

  type ProviderId = "google" | "azure";
  const PROVIDERS = [
    {
      id: "google" as const,
      label: "Continue with Google",
      iconClass: "google",
    },
    {
      id: "azure" as const,
      label: "Continue with Microsoft",
      iconClass: "microsoft",
      scopes: "email",
    },
  ];

  const signingInProvider = van.state<ProviderId | null>(null);
  const signingIn = van.state(false);
  const signingOut = van.state(false);

  if (window.location.hash.includes("access_token")) signingIn.val = true;

  // Events
  if (window.location.pathname === "/signin") {
    requestAnimationFrame(() => {
      modalRef.value?.showModal();
      window.history.replaceState(null, "", "/");
    });
  }

  const handleSignIn = async (provider: ProviderId) => {
    signingInProvider.val = provider;

    const providerConfig = PROVIDERS.find((p) => p.id === provider);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
          window.location.origin +
          window.location.pathname +
          window.location.search,
        ...(providerConfig?.scopes && { scopes: providerConfig.scopes }),
      },
    });
  };

  const handleSignOut = async () => {
    signingOut.val = true;
    await supabase.auth.signOut();
    signingOut.val = false;
  };

  const handleModalClick = (e: MouseEvent) => {
    const modal = e.target as HTMLDialogElement;
    const rect = modal.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      modalRef.value?.close();
      signingIn.val = false;
    }
  };

  supabase.auth.onAuthStateChange((_event, session: Session | null) => {
    user.val = session?.user ?? null;

    // Remove access token from URL
    if (user.rawVal && window.location.hash.includes("access_token")) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    if (user.rawVal) signingIn.val = false;
  });

  const template = () => html`
    <div id="auth-button">
      ${user.val
        ? html`
            <button @click=${handleSignOut}>
              ${signingOut.val
                ? html`<span class="spinner"></span>`
                : "Sign Out"}
            </button>
          `
        : html`
            <button
              @click=${() => {
                modalRef.value?.showModal();
                signingIn.val = true;
              }}
            >
              ${signingIn.val ? html`<span class="spinner"></span>` : "Sign In"}
            </button>
          `}
    </div>

    <dialog id="auth-modal" ${ref(modalRef)} @click=${handleModalClick}>
      <button class="modal-close" @click=${() => modalRef.value?.close()}>
        ×
      </button>

      <div class="modal-header">
        <h2 class="modal-title">Log in or sign up</h2>
      </div>

      <div class="providers-container">
        ${PROVIDERS.map(
          (provider) => html`
            <button
              class="provider-btn"
              @click=${() => handleSignIn(provider.id)}
              ?disabled=${signingInProvider.val === provider.id}
            >
              ${signingInProvider.val === provider.id
                ? html`<span class="spinner"></span>`
                : html`<span
                    class="provider-icon ${provider.iconClass}"
                  ></span>`}
              ${provider.label}
            </button>
          `
        )}
      </div>

      <div class="help-section">
        <p class="help-text">
          Having trouble signing in? DM me on
          <a
            href="https://www.linkedin.com/in/madil4/"
            target="_blank"
            class="help-link"
            >LinkedIn</a
          >
        </p>
      </div>
    </dialog>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container;
}
