"use client";

import { toast } from "react-hot-toast";
import { useCartStore } from "@/lib/store";
import { MenuItem } from "@/lib/types";
import type { MenuItemData } from "@/lib/menuData";

interface MenuItemCardProps {
  item: MenuItemData;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    const cartItem: MenuItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      desc: item.desc,
      image: item.image,
    };
    addToCart(cartItem);
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      style: { background: "#1A312D", color: "#FFFFFF" },
    });
  };

  return (
    <div className="menu-card group rounded-xl border border-primary/8 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(26,49,45,0.12)] cursor-pointer">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-primary/85 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}
        >
          Rs. {item.price.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h4
          className="text-[15px] md:text-base text-primary leading-snug mb-1.5 transition-colors duration-300 group-hover:text-warm"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 500 }}
        >
          {item.name}
        </h4>
        <p className="text-[12px] md:text-[13px] text-text-light leading-relaxed line-clamp-2 mb-4">
          {item.desc}
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2.5 bg-primary text-white text-xs tracking-[0.08em] uppercase rounded-lg
                     transition-all duration-300 hover:bg-warm hover:text-primary
                     opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 500 }}
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
}
