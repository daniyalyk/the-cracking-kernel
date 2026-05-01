"use client";

import { useCartStore } from "@/lib/store";
import { CartItem } from "@/lib/types";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCartStore();
  const cardRef = useRef<HTMLDivElement>(null);

  // Animate on mount
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          removeFromCart(item.id);
        },
      });
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div
      ref={cardRef}
      className="flex gap-4 py-4 border-b border-primary/10 hover:bg-primary/2 transition-colors duration-200 rounded px-2"
    >
      {/* Item image */}
      {item.image && (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-primary/5">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Item details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm md:text-base font-medium text-primary truncate">
          {item.name}
        </h3>
        <p className="text-xs md:text-sm text-text-light">
          Rs. {item.price.toLocaleString()}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-6 h-6 md:w-7 md:h-7 rounded-md border border-primary/20 text-primary hover:bg-primary/10 flex items-center justify-center transition-colors duration-200 text-xs"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-xs md:text-sm font-semibold text-primary w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-6 h-6 md:w-7 md:h-7 rounded-md border border-primary/20 text-primary hover:bg-primary/10 flex items-center justify-center transition-colors duration-200 text-xs"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal and remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={handleRemove}
          className="text-xs md:text-sm text-red-500 hover:text-red-600 transition-colors duration-200 mb-1"
          aria-label="Remove item"
        >
          Remove
        </button>
        <p className="text-sm md:text-base font-semibold text-primary">
          Rs. {item.subtotal.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
