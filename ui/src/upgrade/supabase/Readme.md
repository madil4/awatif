## Supabase Edge Functions

```bash
cd awatif/ui/src/upgrade/
```

### Deploy

```bash
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook --no-verify-jwt
```

### Set Stripe Secrets

Use test secretes to test then swap to production, also update price_id

```bash
supabase secrets set STRIPE_SECRET_KEY=...
supabase secrets set STRIPE_WEBHOOK_SIGNING_SECRET=...
```

### Configure Stripe Webhook

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
4. Select event: `checkout.session.completed`
5. Copy the signing secret (starts with `whsec_`) and set it above
