"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { EASE_BACK } from "@/animations";

interface CartIconProps {
  onClick?: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <button
      onClick={onClick}
      className="relative p-2 md:p-3 hover:bg-primary/5 rounded-lg transition-colors duration-300 group"
      aria-label="Shopping cart"
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-warm transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key={totalItems}
            className="absolute -top-1 -right-1 bg-warm text-primary rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[11px] md:text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: [1.25, 1] }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.35, ease: EASE_BACK }}
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
