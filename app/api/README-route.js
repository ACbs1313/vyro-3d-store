// No payment provider is used in this version.
// Orders are created client-side for the no-Stripe starter.
// For production, move order creation to this server route and connect it to a real database.
export async function POST() {
  return Response.json({
    error: "No online payment provider is configured. Use the website checkout's manual payment flow."
  }, { status: 501 });
}
