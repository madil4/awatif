import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";

const stripe = Stripe(Deno.env.get("STRIPE_API_KEY"));
const cryptoProvider = Stripe.createSubtleCryptoProvider();

console.log(`Stripe-checkout function initialized`);

serve(async (request) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: "price_1NO5QpJwIWdjwnrnn4NGJ6z0",
        quantity: 1,
      },
    ],
    success_url: "https://app.awatif.co/?success=ture",
    cancel_url: "https://app.awatif.co/?cancel=false",
  });

  return Response.redirect(session.url, 303);
});