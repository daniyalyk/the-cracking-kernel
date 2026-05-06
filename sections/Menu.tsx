"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import AnimatedHeading from "@/components/AnimatedHeading";
import SectionLabel from "@/components/SectionLabel";
import { useCartStore } from "@/lib/store";
import { MenuItem } from "@/lib/types";
import { menuCategories } from "@/lib/menuData";
import { staggerContainer, VIEWPORT, EASE_OUT, EASE_INOUT } from "@/animations";

const isOnlinePayment = process.env.NEXT_PUBLIC_ONLINE_PAYMENT === "true";

const headerChildVariants = {
  hidden:  { y: 30, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

const tabVariants = {
  hidden:  { y: 20, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

const itemVariants = {
  hidden:  { y: 25, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export default function Menu() {
  const [activeTab,    setActiveTab]    = useState(0);
  const [hoveredItem,  setHoveredItem]  = useState<number | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const showCart  = isOnlinePayment;

  const handleAddToCart = (item: (typeof menuCategories)[0]["items"][0]) => {
    const cartItem: MenuItem = {
      id: item.id, name: item.name, price: item.price,
      category: item.category, desc: item.desc, image: item.image,
    };
    addToCart(cartItem);
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      style: { background: "#1A312D", color: "#FFFFFF" },
    });
  };

  return (
    <section
      id="menu"
      className="py-28 md:py-44 bg-primary"
    >

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.div variants={headerChildVariants}>
              <SectionLabel light text="The Menu" className="justify-center mb-8" />
            </motion.div>
            <motion.div variants={headerChildVariants}>
              <AnimatedHeading
                text="Comfort Food Done Right"
                tag="h2"
                className="text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
              />
            </motion.div>
            <motion.p variants={headerChildVariants} className="text-text-light text-sm mt-4 tracking-wide max-w-md mx-auto">
              Fresh & high-quality ingredients, always
            </motion.p>
          </motion.div>
        </div>
      </div>
      <SectionLabel light text="" className="justify-center mb-8" />

      {/* Sticky tabs */}
      <div className="sticky top-[72px] md:top-[80px] z-40 bg-primary border-b border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-6 max-w-[300px] mx-auto md:max-w-none"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {menuCategories.map((cat, i) => (
              <motion.button
                key={cat.slug}
                variants={tabVariants}
                onClick={() => setActiveTab(i)}
                className={`text-[13px] tracking-[0.12em] uppercase px-5 py-2.5 rounded-full border transition-all duration-400 ${
                  activeTab === i
                    ? "border-warm bg-warm text-primary"
                    : "border-white/20 text-white/55 hover:border-white/40 hover:text-white"
                }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {cat.category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat py-28 md:py-44 " style={{ backgroundImage: "url('/assets/images/app-bg.png')" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Category image with clip-path reveal on tab change */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] overflow-hidden sticky top-[30%] relative">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeTab}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.1 }}
                    animate={{ clipPath: "inset(0 0 0% 0)",   scale: 1   }}
                    exit={{    clipPath: "inset(100% 0 0% 0)", scale: 1   }}
                    transition={{ duration: 0.8, ease: EASE_INOUT }}
                  >
                    <a
                      href={menuCategories[activeTab].heroImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                    <img
                      src={menuCategories[activeTab].heroImage}
                      alt={menuCategories[activeTab].category}
                      className="w-full h-full object-contain object-center"
                      />
                      </a>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-primary/80 to-transparent">
                      <span className="text-white text-2xl md:text-3xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                        {menuCategories[activeTab].category}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Menu items — re-animate on tab change via key */}
            <div className="lg:col-span-7 flex flex-col">
              <motion.div
                key={activeTab}
                variants={staggerContainer(0.06)}
                initial="hidden"
                animate="visible"
              >
                {menuCategories[activeTab].items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="group border-b border-primary/6"
                    onMouseEnter={() => setHoveredItem(i)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="py-6 md:py-7 flex items-start justify-between gap-4 transition-all duration-300 group-hover:pl-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h4 className="text-[17px] md:text-lg text-primary transition-colors duration-300 group-hover:text-warm" style={{ fontFamily: "Syne, sans-serif", fontWeight: 500 }}>
                            {item.name}
                          </h4>
                          <div className={`w-1.5 h-1.5 rounded-full bg-warm transition-all duration-300 ${hoveredItem === i ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
                        </div>
                        <p className={`text-[13px] text-text-light leading-relaxed max-w-md transition-all duration-400 opacity-100 max-h-20 mt-1`}>
                          {item.desc}
                        </p>
                        {showCart && (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className={`mt-3 px-3 py-1.5 bg-primary text-white text-xs md:text-sm rounded transition-all duration-300 hover:bg-primary/90 ${hoveredItem === i ? "opacity-100 visible" : "opacity-0 invisible md:visible md:opacity-100"}`}
                          >
                            + Add to Cart
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-[15px] text-primary/70 group-hover:text-warm shrink-0 transition-colors duration-300 pt-0.5" style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
                          Rs. {item.price.toLocaleString()}
                        </span>
                        {showCart && (
                          <button onClick={() => handleAddToCart(item)} className="hidden md:block px-4 py-2 bg-warm text-primary text-xs font-semibold rounded hover:bg-warm/90 transition-colors duration-300">
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
