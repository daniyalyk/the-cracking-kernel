"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";
import { Order } from "@/lib/types";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<SVGSVGElement>(null);

  // Fetch order details
  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  // Animate checkmark
  useEffect(() => {
    if (checkmarkRef.current && !isLoading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          checkmarkRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out" }
        );

        // Animate checkmark path
        const path = checkmarkRef.current?.querySelector("path");
        if (path) {
          const length = (path as SVGPathElement).getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
          });
        }
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-32 pb-12 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <p className="mt-4 text-text-light">Loading order details...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen pt-32 pb-12 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-primary mb-4">Oops!</h1>
          <p className="text-text-light mb-8">{error || "Order not found"}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-cream pt-32 pb-12">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        {/* Success Checkmark */}
        <div className="flex justify-center mb-8">
          <svg
            ref={checkmarkRef}
            className="w-20 h-20 text-warm"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="11" strokeWidth="2" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 12l2 2 4-4"
            />
          </svg>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Order Confirmed!
          </h1>
          <p className="text-text-light text-lg">
            Thank you for your order. Your food is being prepared.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm mb-8">
          {/* Order Reference */}
          <div className="mb-8 pb-8 border-b border-primary/10 text-center">
            <p className="text-text-light text-sm mb-2">Order Reference Number</p>
            <p className="text-2xl md:text-3xl font-bold text-primary font-mono">
              {order.id.substring(0, 12).toUpperCase()}
            </p>
            <p className="text-xs text-text-light mt-2">
              Order Date: {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-primary/10">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3">
                Delivery To
              </h3>
              <p className="font-semibold text-primary mb-1">
                {order.customerInfo.name}
              </p>
              <p className="text-sm text-text-light mb-2">
                {order.customerInfo.email}
              </p>
              <p className="text-sm text-text-light mb-3">
                {order.customerInfo.phone}
              </p>
              <p className="text-sm text-text-light">
                <strong>Address:</strong> {order.deliveryAddress}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3">
                Estimated Delivery
              </h3>
              <p className="text-2xl font-bold text-warm mb-4">
                {order.estimatedDeliveryTime || "30-45 mins"}
              </p>
              <div className="bg-cream p-4 rounded-lg">
                <p className="text-xs text-text-light">
                  Your order is being prepared and will be dispatched shortly. You
                  will receive a notification when your order is on the way.
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8 pb-8 border-b border-primary/10">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-4">
              Items Ordered
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-xs text-text-light">
                      Qty: {item.quantity} × Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-bold text-primary">
                    Rs. {item.subtotal.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-3 p-4 bg-cream rounded-lg mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-text-light">Items Subtotal</span>
              <span className="font-semibold text-primary">
                Rs. {order.items
                  .reduce((sum, item) => sum + item.subtotal, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-light">Delivery Fee</span>
              <span className="font-semibold text-primary">
                Rs. {(order.totalAmount - order.items.reduce((sum, item) => sum + item.subtotal, 0)).toLocaleString()}
              </span>
            </div>
            <div className="h-px bg-primary/10" />
            <div className="flex justify-between text-lg">
              <span className="font-bold text-primary">Total Paid</span>
              <span className="font-bold text-warm">
                Rs. {order.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Status */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-8">
            <p className="text-sm text-green-800">
              <strong>Payment Status:</strong> {order.paymentStatus === "completed" ? "✓ Completed" : "Pending"}
            </p>
          </div>

          {/* Delivery Notes */}
          {order.deliveryNotes && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-8">
              <p className="text-sm text-blue-800">
                <strong>Delivery Notes:</strong> {order.deliveryNotes}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/#menu"
            className="flex-1 md:flex-none px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
          >
            Order More
          </Link>
          <Link
            href="/"
            className="flex-1 md:flex-none px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Support Info */}
        <div className="text-center mt-12 pt-8 border-t border-primary/10">
          <p className="text-text-light text-sm mb-2">Questions about your order?</p>
          <a
            href="mailto:support@tck.com"
            className="text-primary hover:text-warm transition-colors font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 pb-12 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <p className="mt-4 text-text-light">Loading...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
