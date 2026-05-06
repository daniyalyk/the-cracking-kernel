"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import CartItemCard from "./CartItemCard";
import Link from "next/link";
import { EASE_OUT, EASE_INOUT } from "@/animations";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const items        = useCartStore((state) => state.getCartItems());
  const totalPrice   = useCartStore((state) => state.getTotalPrice());
  const deliveryFee  = 200;

  const handleCheckout = () => {
    onClose();
    window.location.href = "/checkout";
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cart-overlay"
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cart-drawer"
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 flex flex-col"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0,      opacity: 1 }}
            exit={{    x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {/* Header */}
            <div className="border-b border-primary/10 p-4 md:p-6 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg md:text-xl font-bold text-primary">Shopping Cart</h2>
              <button onClick={onClose} className="p-1 hover:bg-primary/10 rounded-lg transition-colors duration-200" aria-label="Close cart">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <svg className="w-16 h-16 text-primary/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-primary mb-1">Empty Cart</h3>
                  <p className="text-sm text-text-light">Add items from the menu to get started</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItemCard key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary/10 p-4 md:p-6 bg-cream sticky bottom-0">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-text-light">Subtotal:</span>
                    <span className="font-semibold text-primary">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-text-light">Delivery Fee:</span>
                    <span className="font-semibold text-primary">Rs. {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-primary/10" />
                  <div className="flex justify-between text-base md:text-lg">
                    <span className="font-bold text-primary">Total:</span>
                    <span className="font-bold text-warm">Rs. {(totalPrice + deliveryFee).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={handleCheckout} className="w-full bg-primary text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mb-2 text-sm md:text-base">
                  Proceed to Checkout
                </button>
                <button onClick={onClose} className="w-full border border-primary text-primary py-2 md:py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors duration-300 text-sm md:text-base">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
