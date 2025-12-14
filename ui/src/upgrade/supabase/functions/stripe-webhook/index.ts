import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const STRIPE_WEBHOOK_SIGNING_SECRET = Deno.env.get(
  "STRIPE_WEBHOOK_SIGNING_SECRET"
)!;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "stripe-signature, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  console.log("🔔 Webhook received");
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("❌ No signature header");
    return new Response("Webhook Error: Missing signature", {
      status: 400,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SIGNING_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const userId = event.data.object.client_reference_id;
      const customerId = event.data.object.customer;

      console.log("💳 Payment for Lifetime completed:", {
        userId,
        customerId,
      });

      const { error: dbError } = await supabase.from("upgrade").upsert({
        user_id: userId,
        stripe_customer_id: customerId,
        lifetime: true,
      });

      if (dbError) {
        console.error("❌ Database error:", dbError);
        throw dbError;
      }

      console.log("✅ Database updated successfully");
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Webhook error:", errorMessage);

    return new Response(`Webhook Error: ${errorMessage}`, {
      status: 400,
      headers: corsHeaders,
    });
  }
});
