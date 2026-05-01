"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import AnimatedHeading from "@/components/AnimatedHeading";
import { menuCategories } from "@/lib/menuData";

gsap.registerPlugin(ScrollTrigger);

// Group images by category for the section-divided layout
const galleryByCategory = menuCategories.map((cat) => ({
  category: cat.category,
  images: cat.items.map((item, idx) => ({
    src: item.image,
    alt: item.name,
    caption: item.name,
    featured: idx === 0,
  })),
}));

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !track || !container) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - container.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="bg-primary overflow-hidden">
      <div ref={containerRef} className="h-screen flex flex-col justify-center">
        <div className="px-6 md:px-12 lg:px-24 mb-10">
          <SectionLabel text="Gallery" light className="mb-6" />
          <AnimatedHeading
            text="A Glimpse Inside"
            tag="h2"
            className="text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
          />
        </div>

        <div
          ref={trackRef}
          className="flex items-end gap-4 pl-6 md:pl-12 lg:pl-24"
          style={{ paddingRight: "30vw" }}
        >
          {galleryByCategory.map((group) => (
            <div key={group.category} className="flex items-end gap-4 shrink-0">
              {/* Category label card */}
              <div className="shrink-0 w-35 md:w-45 flex flex-col justify-end pb-4 self-end">
                <div className="w-8 h-px bg-warm mb-3" />
                <span
                  className="text-warm text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}
                >
                  {group.category}
                </span>
                <span className="text-white/30 text-[11px] mt-1">
                  {group.images.length} items
                </span>
              </div>

              {/* Images for this category */}
              {group.images.map((image, i) => {
                const isFeatured = image.featured;
                const isEven = i % 2 === 0;

                const widthClass = isFeatured
                  ? "w-[70vw] md:w-[35vw] lg:w-[26vw]"
                  : "w-[60vw] md:w-[30vw] lg:w-[20vw]";

                const aspectClass = isFeatured
                  ? "aspect-[3/4]"
                  : isEven
                    ? "aspect-[4/5]"
                    : "aspect-square";

                return (
                  <div
                    key={`${group.category}-${i}`}
                    className={`shrink-0 ${widthClass} group cursor-pointer`}
                  >
                    <div
                      className={`relative ${aspectClass} overflow-hidden`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ transform: "scale(1.02)" }}
                      />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span
                          className="text-white text-sm tracking-[0.15em] uppercase"
                          style={{ fontFamily: "Syne, sans-serif" }}
                        >
                          {image.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Spacer between categories */}
              <div className="shrink-0 w-4 md:w-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
