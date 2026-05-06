"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { staggerContainer, VIEWPORT, EASE_OUT } from "@/animations";

const highlights = [
  {
    name: "Breakfast Classics",
    tagline: "Start your morning right",
    description: "From hearty full English platters to creamy Turkish eggs with garlic-herb yogurt — breakfasts made with love.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Deli Sandwiches",
    tagline: "Stacked with care",
    description: "Fresh-baked bread, premium deli meats, artisanal cheeses, and house-made sauces. The sandwich done right.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Specialty Coffee",
    tagline: "Crafted to perfection",
    description: "High-quality beans, expertly pulled shots, and velvety steamed milk. Every cup is a small ritual.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Baked Fresh Daily",
    tagline: "From our oven to you",
    description: "Croissants, sourdough, pastries — everything baked in-house daily with care and the finest butter.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
  },
];

const rowVariants = {
  hidden:  { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE_OUT },
  }),
};

export default function CoffeeShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="relative py-28 md:py-44 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/assets/images/app-bg.png')" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <SectionLabel text="What We Do" className="mb-8" />
          <motion.h2
            variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } } }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] text-primary leading-[1.1]"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            Good Food,<br />
            <span className="text-warm">Made Simply</span>
          </motion.h2>
        </motion.div>

        {/* Interactive rows + floating image preview */}
        <div className="relative">

          {/* Floating image preview — desktop only */}
          <motion.div
            className="hidden lg:block fixed top-1/2 right-12 xl:right-20 -translate-y-1/2 w-[320px] h-[400px] z-30 pointer-events-none"
            animate={{
              opacity: activeIndex !== null ? 1 : 0,
              scale:   activeIndex !== null ? 1 : 0.95,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: activeIndex !== null ? 0.5 : 0.4, ease: EASE_OUT }}
          >
            <AnimatePresence mode="wait">
              {activeIndex !== null && (
                <motion.div
                  key={activeIndex}
                  className="w-full h-full overflow-hidden shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={highlights[activeIndex].image}
                    alt={highlights[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Rows */}
          {highlights.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="group border-b border-primary/8 cursor-pointer"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all duration-500 group-hover:pl-4">
                <span className="text-warm/40 text-sm tabular-nums shrink-0 w-8" style={{ fontFamily: "Syne, sans-serif" }}>
                  0{i + 1}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl text-primary transition-colors duration-300 group-hover:text-warm flex-1" style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
                  {item.name}
                </h3>
                <span className="text-xs tracking-[0.2em] uppercase text-text-light md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 shrink-0">
                  {item.tagline}
                </span>
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-primary/10 group-hover:border-warm/40 group-hover:bg-warm/5 transition-all duration-300 shrink-0">
                  <svg className="w-4 h-4 text-primary/30 group-hover:text-warm transition-colors duration-300 -rotate-45 group-hover:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </div>

              {/* Mobile image */}
              <div className="lg:hidden overflow-hidden max-h-0 group-hover:max-h-[300px] transition-all duration-700 ease-in-out">
                <div className="pb-6">
                  <img src={item.image} alt={item.name} className="w-full h-48 md:h-64 object-cover" />
                  <p className="text-sm text-text-secondary leading-relaxed mt-4">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
