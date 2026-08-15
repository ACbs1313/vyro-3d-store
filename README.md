# VYRO 3D Store — No Stripe Version

A bright, premium, made-to-order 3D-printing storefront with a custom order workflow.

## What changed

This version does **not use Stripe**.

Customers can place an order directly through the website and select a payment method:

- Bank Transfer
- Cash on Delivery / Pay on Delivery

The order is then shown in the private admin area where you can control:

- Payment status
- Production status
- Print queue
- Quality check
- Shipping
- Tracking number
- Internal notes

### Important production note

A truly custom card-payment system should NOT be written from scratch. Card processing requires a regulated payment provider.

This no-Stripe version is designed around manual payment methods, so you can control the entire order workflow yourself.

## Run locally

```bash
npm install
npm run dev
```

Open:

http://localhost:3000

## Deploy

You can deploy the Next.js project to Vercel.

## Important persistence note

The current starter stores orders in browser localStorage so you can test the complete workflow without paying for a database.

For a REAL multi-customer store, connect the order API to a database such as Supabase/Postgres. Otherwise, customers and your admin dashboard will not share order data across different browsers/devices.

## Recommended real setup

Free/low-cost setup:

- Website: Vercel
- Database + authentication: Supabase free tier
- Payments: manual bank transfer / cash on delivery

That lets you avoid Stripe while still having a real shared order database.
