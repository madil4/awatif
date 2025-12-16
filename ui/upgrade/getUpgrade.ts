import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";
import { supabase } from "../backend/supabase";
import type { User } from "@supabase/supabase-js";

import "./styles.css";

export function getUpgrade({
  user,
}: {
  user: State<User | null>;
}): HTMLDivElement {
  const container = document.createElement("div");
  const modalRef = createRef<HTMLDialogElement>();

  const showUpgrade = van.state(false);
  const isLoading = van.state(false);
  const isSuccess = van.state(false);
  const error = van.state<string | null>(null);

  // Events
  van.derive(async () => {
    if (user.val === undefined) return;

    if (user.val) showUpgrade.val = !(await isUpgraded(user.val));
    else showUpgrade.val = true;
  });

  if (window.location.pathname === "/success") {
    requestAnimationFrame(() => {
      isSuccess.val = true;
      modalRef.value?.showModal();
      window.history.replaceState(null, "", "/");
    });
  }

  async function handlePayment() {
    try {
      isLoading.val = true;
      error.val = null;

      window.location.href = await getCheckoutSession(user.rawVal!);
    } catch (e: any) {
      error.val = e.message || "An error occurred";
      isLoading.val = false;
    }
  }

  function openModal() {
    error.val = null;
    isLoading.val = false;
    modalRef?.value?.showModal();
  }

  function closeModal() {
    isSuccess.val = false;
    modalRef?.value?.close();
  }

  function handleModalClick(e: MouseEvent) {
    const dialog = e.currentTarget as HTMLDialogElement;
    const rect = dialog.getBoundingClientRect();

    const isInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInside) {
      closeModal();
    }
  }

  const template = () => html`
    ${showUpgrade.val
      ? html`<div id="upgrade-button">
          <button @click=${openModal}>Upgrade</button>
        </div>`
      : ""}

    <dialog id="upgrade-modal" ${ref(modalRef)} @click=${handleModalClick}>
      <button class="modal-close" @click=${closeModal}>×</button>

      ${!isSuccess.val
        ? html`
            <div class="modal-content">
              <div class="modal-left">
                <h2 class="deal-title">
                  Early Supporter Lifetime Pass
                  <span class="deal-subtitle"
                    >(Limited to first 100 users)
                  </span>
                </h2>
                <div class="price-section">
                  <span class="price">€100</span>
                  <span class="price-label">Single Payment</span>
                </div>

                <div class="included-section">
                  <h3 class="included-title">What's included?</h3>
                  <ul class="features-list">
                    <li class="feature-item">
                      <span class="check-icon">✅</span>
                      <span>Unlimited Elements</span>
                    </li>
                    <li class="feature-item">
                      <span class="check-icon">✅</span>
                      <span>Beam Elements</span>
                    </li>
                    <li class="feature-item">
                      <span class="check-icon not-included">❌</span>
                      <span>Shell Elements (coming soon)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="modal-right">
                <div class="payment-section">
                  <h2 class="payment-title">Secure Payment</h2>
                  <p class="payment-description">
                    Complete your purchase securely with Stripe. You'll be
                    redirected to a secure checkout page.
                  </p>

                  ${error.val
                    ? html`<div class="error-message">${error.val}</div>`
                    : ""}
                  ${!user.val
                    ? html`
                        <button
                          class="pay-button"
                          @click=${() => (window.location.href = "/signin")}
                        >
                          Sign In to Continue →
                        </button>
                      `
                    : html`
                        <button
                          class="pay-button"
                          @click=${handlePayment}
                          ?disabled=${isLoading.val}
                        >
                          ${isLoading.val
                            ? html`<span class="spinner"></span>`
                            : "Continue to Payment →"}
                        </button>
                      `}

                  <div class="payment-footer">
                    <div class="powered-by">🔒 Secured by Stripe</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="help-section">
              <p class="help-text">
                Having trouble upgrading? DM me on
                <a
                  href="https://www.linkedin.com/in/madil4/"
                  target="_blank"
                  class="help-link"
                  >LinkedIn</a
                >
              </p>
            </div>
          `
        : html`
            <div class="modal-content success-content">
              <div class="success-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" fill="#4A9BA6" opacity="0.1" />
                  <circle cx="40" cy="40" r="32" fill="#4A9BA6" opacity="0.2" />
                  <path
                    d="M25 40L35 50L55 30"
                    stroke="#4A9BA6"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <h1 class="success-title">Payment Successful!</h1>

              <p class="success-message">
                Thank you for your purchase. Your lifetime access to Awatif has
                been activated.
              </p>

              <div class="success-details">
                <div class="detail-item">
                  <span class="detail-label">Deal</span>
                  <span class="detail-value">€100 Lifetime</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Receipt</span>
                  <span class="detail-value">Sent to your email</span>
                </div>
              </div>
            </div>
          `}
    </dialog>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container;
}

// Utils
async function getCheckoutSession(user: User): Promise<string> {
  const baseUrl = new URL(window.location.origin);
  const response = await supabase.functions.invoke("create-checkout-session", {
    body: {
      successUrl: new URL("/success", baseUrl).href,
      cancelUrl: new URL("/", baseUrl).href,
    },
  });

  if (response.error) {
    const errorMessage =
      response.data?.error || response.error.message || "Edge function failed";
    throw new Error(errorMessage);
  }

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  if (!response.data?.url) {
    throw new Error("No checkout URL received");
  }

  return response.data.url;
}

async function isUpgraded(user: User): Promise<boolean> {
  const { data } = await supabase
    .from("upgrade")
    .select("lifetime")
    .eq("user_id", user.id)
    .maybeSingle();

  return data?.lifetime === true;
}
