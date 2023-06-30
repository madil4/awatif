import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";

const stripe = Stripe(Deno.env.get("STRIPE_API_KEY"));

console.log(`Stripe-checkout function initialized`);

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
    success_url: "https://app.awatif.co/?upgraded=ture",
    cancel_url: "https://app.awatif.co",
  });

  return Response.redirect(session.url, 303);
});
