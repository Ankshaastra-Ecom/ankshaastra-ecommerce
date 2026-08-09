# Payment Gateway + Webhook + Order Emails — Setup Guide

This document explains exactly what was added, and what YOU (or your Supabase
project owner) must configure before it goes live. None of these are things I
can set for you — they involve your own Razorpay account, your own Supabase
project's secret store, and your own Resend/email account.

## What was built

1. **Razorpay payment gateway** — when a customer selects UPI or Card at
   checkout, the Razorpay Checkout popup opens and they can pay via UPI, card,
   netbanking, wallets, etc. Cash on Delivery is unchanged.
2. **Razorpay Webhook** (`razorpay-webhook` function) — a server-to-server
   endpoint that Razorpay calls directly the moment a payment is captured or
   fails. This is the reliable source of truth (works even if the customer
   closes the browser tab right after paying), and it's what actually marks
   the order "paid" and fires the confirmation emails.
3. **Order confirmation emails** — `send-order-email` now sends TWO emails
   per order: one to the customer, and one internal copy to your admin/Zoho
   order mailbox, using Resend.

## New database columns (already included as a migration)

`orders` table gained: `razorpay_order_id`, `razorpay_payment_id`,
`razorpay_signature`, `payment_error`, `confirmation_email_sent`.
Run this migration on your Supabase project (via Supabase CLI
`supabase db push`, or paste the SQL file's contents into the Supabase SQL
Editor):
`supabase/migrations/20260809060000_add_razorpay_payment_fields.sql`

## Step 1 — Get Razorpay API keys

1. Sign up / log in at https://dashboard.razorpay.com
2. Go to **Settings → API Keys** → Generate Key (use **Test Mode** first to
   try everything safely, switch to **Live Mode** keys only when ready to
   accept real payments).
3. You'll get a **Key Id** (starts with `rzp_test_` or `rzp_live_`) and a
   **Key Secret**.

## Step 2 — Add secrets to Supabase Edge Functions

In your Supabase Dashboard → **Project Settings → Edge Functions → Secrets**
(or via CLI: `supabase secrets set KEY=value`), add:

| Secret name | Value |
|---|---|
| `RAZORPAY_KEY_ID` | your Razorpay Key Id |
| `RAZORPAY_KEY_SECRET` | your Razorpay Key Secret |
| `RAZORPAY_WEBHOOK_SECRET` | a secret string you create yourself in Step 3 |
| `RESEND_API_KEY` | your Resend API key (already required — should already be set since customer emails were already working) |
| `ADMIN_EMAIL` | the mailbox that should receive order notifications — put your **Zoho order-notifications email address** here (e.g. `orders@ankshaastra.com`) |
| `FROM_EMAIL` | optional — e.g. `Ankshaastra <orders@ankshaastra.com>`. See the Resend note below. |

## Step 3 — Create the Razorpay Webhook

1. In Razorpay Dashboard → **Settings → Webhooks → Add New Webhook**.
2. **Webhook URL**:
   `https://yscogbrwvkuqenssytsc.supabase.co/functions/v1/razorpay-webhook`
3. **Active events** — enable at least:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
4. Razorpay will ask you to set a **Webhook Secret** — type any strong
   random string, save it, and put the *same* string into the
   `RAZORPAY_WEBHOOK_SECRET` Supabase secret from Step 2. This is how the
   webhook function verifies the request really came from Razorpay.

## Step 4 — Deploy the edge functions

Using the Supabase CLI from the project root:

```
supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
supabase functions deploy razorpay-webhook
supabase functions deploy send-order-email
```

(Or deploy via your existing Lovable/GitHub → Supabase pipeline if that's how
this project is normally deployed — the `supabase/config.toml` already lists
all four functions with `verify_jwt = false`, which is required since
Razorpay's webhook and the payment flow are called before/without a logged-in
Supabase session.)

## Step 5 — Verify your sending domain in Resend (important)

The email code currently falls back to Resend's shared test address
(`onboarding@resend.dev`), which Resend restricts — it will NOT reliably
deliver to arbitrary customer inboxes or to your Zoho mailbox in production.

To send real order emails to customers and to your Zoho order mailbox:
1. In Resend Dashboard → **Domains** → Add your domain (e.g.
   `ankshaastra.com`) and add the DNS records they give you (SPF/DKIM).
2. Once verified, set the `FROM_EMAIL` secret to something like
   `Ankshaastra <orders@ankshaastra.com>`.

## Step 6 — Test end-to-end (use Razorpay Test Mode keys first)

1. Place an order on the site, choose **UPI** or **Card**.
2. Use a Razorpay test card (e.g. `4111 1111 1111 1111`, any future expiry,
   any CVV) or Razorpay's test UPI flow.
3. Confirm:
   - The order shows `payment_status = paid` in the `orders` table.
   - The customer received the confirmation email.
   - Your Zoho order mailbox (the `ADMIN_EMAIL` address) received the
     internal notification email.
   - In Razorpay Dashboard → Webhooks, the webhook shows a `200` response.
4. Only after this works end-to-end, switch `RAZORPAY_KEY_ID` /
   `RAZORPAY_KEY_SECRET` to your **Live Mode** keys and repeat the webhook
   setup (Step 3) for live mode (Razorpay keeps test/live webhooks separate).

## Notes / things worth knowing

- If a customer closes the browser right after paying (before the app can
  call `verify-razorpay-payment`), the order is still correctly marked paid
  and the emails still go out — because the Razorpay **webhook** independently
  confirms it. This is the whole point of using a webhook instead of relying
  only on the browser.
- Emails are never sent twice: both the instant verification path and the
  webhook path check the `confirmation_email_sent` column before sending.
- If a customer abandons payment (closes the Razorpay popup without paying),
  the order stays in the database with `payment_status = pending`. It is not
  auto-deleted — you'll see these in your Orders admin view as pending/
  unpaid orders, same as before.
