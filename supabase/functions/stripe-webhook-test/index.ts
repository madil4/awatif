import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = Stripe(Deno.env.get("STRIPE_API_KEY_TEST"));
const cryptoProvider = Stripe.createSubtleCryptoProvider();

console.log(`Stripe-webhook-test function initialized`);

serve(async (req) => {
  const body = await req.text();
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      req.headers.get("Stripe-Signature"),
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET_TEST"),
      undefined,
      cryptoProvider
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const customer = await stripe.customers.retrieve(event.data.object.customer);
  switch (event.type) {
    case "customer.subscription.created":
      console.log("subscription created");
      await supabase
        .from("users")
        .update({ phone: customer.id })
        .eq("email", customer.email);
      break;
    case "customer.subscription.updated":
      console.log("subscription updated");
      await supabase
        .from("users")
        .update({ phone: customer.id })
        .eq("email", customer.email);
      break;
    case "customer.subscription.deleted":
      console.log("subscription deleted");
      await supabase
        .from("users")
        .update({ phone: null })
        .eq("email", customer.email);
      break;
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
