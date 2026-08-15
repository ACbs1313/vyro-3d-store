"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/Nav";

export default function SuccessContent() {
  const params = useSearchParams();
  const order = params.get("order");

  return (
    <>
      <Nav />

      <main className="section">
        <div className="container">
          <div
            className="panel"
            style={{ textAlign: "center", padding: "70px 20px" }}
          >
            <span className="pill">Order received</span>

            <h1 className="h2" style={{ marginTop: 16 }}>
              Thanks for your order 🎉
            </h1>

            {order && (
              <p style={{ fontSize: 22, fontWeight: 800 }}>
                Order #{order}
              </p>
            )}

            <p
              className="lead"
              style={{ margin: "15px auto", maxWidth: 650 }}
            >
              Your order has been submitted. We'll prepare your print once the
              payment status has been confirmed.
            </p>

            <div
              className="notice"
              style={{
                maxWidth: 650,
                margin: "20px auto",
                textAlign: "left",
              }}
            >
              <strong>What happens next?</strong>
              <br />
              We receive your order → confirm payment → print your product →
              quality check → ship it.
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link className="primary" href="/shop">
                Continue Shopping
              </Link>

              <Link className="ghost-btn" href="/account">
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}