import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";

const stripe = Stripe(Deno.env.get("STRIPE_API_KEY"));
const cryptoProvider = Stripe.createSubtleCryptoProvider();

console.log(`Stripe function initialized`);

serve(async (request) => {
  const body = await request.text();
  let receivedEvent;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      request.headers.get("Stripe-Signature"),
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET"),
      undefined,
      cryptoProvider
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  return new Response(JSON.stringify(receivedEvent), { status: 200 });
});
