"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    name: "Breakfast Classics",
    tagline: "Start your morning right",
    description:
      "From hearty full English platters to creamy Turkish eggs with garlic-herb yogurt — breakfasts made with love.",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Deli Sandwiches",
    tagline: "Stacked with care",
    description:
      "Fresh-baked bread, premium deli meats, artisanal cheeses, and house-made sauces. The sandwich done right.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Specialty Coffee",
    tagline: "Crafted to perfection",
    description:
      "High-quality beans, expertly pulled shots, and velvety steamed milk. Every cup is a small ritual.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Baked Fresh Daily",
    tagline: "From our oven to you",
    description:
      "Croissants, sourdough, pastries — everything baked in-house daily with care and the finest butter.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CoffeeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagePreviewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        const children = headingRef.current.querySelectorAll(":scope > *");
        gsap.set(children, { y: 40, opacity: 0 });

        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(children, {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          once: true,
        });
      }

      // Row reveals — staggered lines
      rowsRef.current.forEach((row, i) => {
        if (!row) return;

        gsap.set(row, { y: 30, opacity: 0 });

        ScrollTrigger.create({
          trigger: row,
          start: "top 88%",
          onEnter: () => {
            gsap.to(row, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: i * 0.08,
              ease: "power3.out",
            });
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover-driven image preview
  useEffect(() => {
    const preview = imagePreviewRef.current;
    if (!preview) return;

    if (activeIndex !== null) {
      gsap.to(preview, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(preview, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-44 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/assets/images/app-bg.png')" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-20 max-w-2xl">
          <SectionLabel text="What We Do" className="mb-8" />
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] text-primary leading-[1.1]"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            Good Food,
            <br />
            <span className="text-warm">Made Simply</span>
          </h2>
        </div>

        {/* Interactive rows + floating image */}
        <div className="relative">
          {/* Floating image preview — desktop only */}
          <div
            ref={imagePreviewRef}
            className="hidden lg:block fixed top-1/2 right-12 xl:right-20 -translate-y-1/2 w-[320px] h-[400px] z-30 pointer-events-none opacity-0"
            style={{ scale: 0.95 }}
          >
            {activeIndex !== null && (
              <div className="w-full h-full overflow-hidden shadow-2xl">
                <img
                  src={highlights[activeIndex].image}
                  alt={highlights[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Rows */}
          {highlights.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              className="group border-b border-primary/8 cursor-pointer"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all duration-500 group-hover:pl-4">
                {/* Number */}
                <span
                  className="text-warm/40 text-sm tabular-nums shrink-0 w-8"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  0{i + 1}
                </span>

                {/* Name */}
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl text-primary transition-colors duration-300 group-hover:text-warm flex-1"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}
                >
                  {item.name}
                </h3>

                {/* Tagline — slides in on hover */}
                <span className="text-xs tracking-[0.2em] uppercase text-text-light md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 shrink-0">
                  {item.tagline}
                </span>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-primary/10 group-hover:border-warm/40 group-hover:bg-warm/5 transition-all duration-300 shrink-0">
                  <svg
                    className="w-4 h-4 text-primary/30 group-hover:text-warm transition-colors duration-300 -rotate-45 group-hover:rotate-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </div>

              {/* Mobile image — visible on smaller screens */}
              <div className="lg:hidden overflow-hidden max-h-0 group-hover:max-h-[300px] transition-all duration-700 ease-in-out">
                <div className="pb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                  <p className="text-sm text-text-secondary leading-relaxed mt-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
