"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "react-hot-toast";
import { useCartStore } from "@/lib/store";
import { CustomerInfo } from "@/lib/types";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.getCartItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const deliveryFee = 200;
  const totalAmount = totalPrice + deliveryFee;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current && summaryRef.current) {
        gsap.set([formRef.current, summaryRef.current], {
          y: 30,
          opacity: 0,
        });

        gsap.to([formRef.current, summaryRef.current], {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Redirect to homepage if no items in cart
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      router.push("/");
    }
  }, [items.length, router, isLoading]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (formData.phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your delivery address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create order via API
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          deliveryAddress: formData.address,
          deliveryNotes: formData.notes,
          totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      // Clear cart and redirect to confirmation
      clearCart();
      router.push(`/checkout/confirmation?orderId=${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to process order. Please try again.");
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Your cart is empty
          </h1>
          <p className="text-text-light mb-8">
            Add items from our menu to get started
          </p>
          <Link
            href="/#menu"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-cream pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Checkout
          </h1>
          <p className="text-text-light">Complete your order in just a few steps</p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div ref={formRef} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              {/* Delivery Information */}
              <h2 className="text-2xl font-bold text-primary mb-6">
                Delivery Information
              </h2>

              <div className="space-y-5 mb-8">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, building, floor, apartment"
                    rows={3}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions? (e.g., ring doorbell twice)"
                    rows={2}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Order Items Section */}
              <h2 className="text-2xl font-bold text-primary mb-6 pt-8 border-t border-primary/10">
                Order Summary
              </h2>

              <div className="space-y-3 mb-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-primary/10"
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

              {/* Pricing */}
              <div className="space-y-3 mb-8 p-4 bg-cream rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-semibold text-primary">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Delivery Fee</span>
                  <span className="font-semibold text-primary">
                    Rs. {deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-primary">Total Amount</span>
                  <span className="font-bold text-warm">
                    Rs. {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary/90 disabled:bg-primary/50 transition-colors duration-300"
              >
                {isLoading ? "Processing..." : "Continue to Payment"}
              </button>

              {/* Back to Menu */}
              <Link
                href="/#menu"
                className="block text-center mt-4 text-primary hover:text-warm transition-colors underline"
              >
                Continue Shopping
              </Link>
            </form>
          </div>

          {/* Summary Section - Sticky on Desktop */}
          <div ref={summaryRef} className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold text-primary mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="py-3 border-b border-primary/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-sm text-primary">
                          {item.name}
                        </p>
                        <p className="text-xs text-text-light">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-sm text-primary">
                        Rs. {item.subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-primary/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-semibold">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Delivery</span>
                  <span className="font-semibold">
                    Rs. {deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-primary">Total</span>
                  <span className="font-bold text-warm text-xl">
                    Rs. {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Items count */}
              <p className="text-xs text-text-light mt-4 text-center">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items in order
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
