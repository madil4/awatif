import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";

const stripe = Stripe(Deno.env.get("STRIPE_API_KEY_TEST"));

console.log(`Stripe-checkout-test function initialized`);

serve(async (request) => {
  const body = await request.formData();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: body.get("email"),
    line_items: [
      {
        price: body.get("price"),
        quantity: 1,
      },
    ],
    success_url: "http://localhost:4600",
    cancel_url: "http://localhost:4600",
  });

  console.log("checkout url created");

  return Response.redirect(session.url, 303);
});
