"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { CartItem } from "@/lib/types";
import { EASE_OUT } from "@/animations";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0,   opacity: 1 }}
      exit={{    x: 100, opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="flex gap-4 py-4 border-b border-primary/10 hover:bg-primary/2 transition-colors duration-200 rounded px-2"
    >
      {item.image && (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-primary/5">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="text-sm md:text-base font-medium text-primary truncate">{item.name}</h3>
        <p className="text-xs md:text-sm text-text-light">Rs. {item.price.toLocaleString()}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 md:w-7 md:h-7 rounded-md border border-primary/20 text-primary hover:bg-primary/10 flex items-center justify-center transition-colors duration-200 text-xs"
            aria-label="Decrease quantity"
          >−</button>
          <span className="text-xs md:text-sm font-semibold text-primary w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 md:w-7 md:h-7 rounded-md border border-primary/20 text-primary hover:bg-primary/10 flex items-center justify-center transition-colors duration-200 text-xs"
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-xs md:text-sm text-red-500 hover:text-red-600 transition-colors duration-200 mb-1"
          aria-label="Remove item"
        >Remove</button>
        <p className="text-sm md:text-base font-semibold text-primary">Rs. {item.subtotal.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}
