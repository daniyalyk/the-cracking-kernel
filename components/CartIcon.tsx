"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCartStore } from "@/lib/store";

interface CartIconProps {
  onClick?: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const badgeRef = useRef<HTMLDivElement>(null);

  // Animate badge when item count changes
  useEffect(() => {
    if (badgeRef.current && totalItems > 0) {
      gsap.to(badgeRef.current, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "back.out",
      });
    }
  }, [totalItems]);

  return (
    <button
      onClick={onClick}
      className="relative p-2 md:p-3 hover:bg-primary/5 rounded-lg transition-colors duration-300 group"
      aria-label="Shopping cart"
    >
      {/* Cart Icon */}
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-warm transition-colors duration-300"
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

      {/* Badge with item count */}
      {totalItems > 0 && (
        <div
          ref={badgeRef}
          className="absolute -top-1 -right-1 bg-warm text-primary rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[11px] md:text-xs font-bold"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </div>
      )}
    </button>
  );
}
