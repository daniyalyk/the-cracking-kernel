"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCartStore } from "@/lib/store";
import CartItemCard from "./CartItemCard";
import Link from "next/link";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const items = useCartStore((state) => state.getCartItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const deliveryFee = 200; // Fixed delivery fee in PKR

  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Animate drawer open/close
  useEffect(() => {
    if (overlayRef.current && drawerRef.current) {
      if (isOpen) {
        gsap.set([overlayRef.current, drawerRef.current], { display: "flex" });
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
        gsap.to(drawerRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(drawerRef.current, {
          x: 400,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          delay: 0.1,
          onComplete: () => {
            gsap.set([overlayRef.current, drawerRef.current], {
              display: "none",
            });
          },
        });
      }
    }
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    // Redirect to checkout
    window.location.href = "/checkout";
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-40 hidden"
        style={{ display: "none" }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-40 hidden flex-col"
        style={{ display: "none", transform: "translateX(400px)" }}
      >
        {/* Header */}
        <div className="border-b border-primary/10 p-4 md:p-6 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-lg md:text-xl font-bold text-primary">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary/10 rounded-lg transition-colors duration-200"
            aria-label="Close cart"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <svg
                className="w-16 h-16 text-primary/30 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-primary mb-1">
                Empty Cart
              </h3>
              <p className="text-sm text-text-light">
                Add items from the menu to get started
              </p>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer with summary and checkout */}
        {items.length > 0 && (
          <div className="border-t border-primary/10 p-4 md:p-6 bg-cream sticky bottom-0">
            {/* Summary */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-text-light">Subtotal:</span>
                <span className="font-semibold text-primary">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-text-light">Delivery Fee:</span>
                <span className="font-semibold text-primary">
                  Rs. {deliveryFee.toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-primary/10" />
              <div className="flex justify-between text-base md:text-lg">
                <span className="font-bold text-primary">Total:</span>
                <span className="font-bold text-warm">
                  Rs. {(totalPrice + deliveryFee).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mb-2 text-sm md:text-base"
            >
              Proceed to Checkout
            </button>

            {/* Continue shopping */}
            <button
              onClick={onClose}
              className="w-full border border-primary text-primary py-2 md:py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors duration-300 text-sm md:text-base"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
