"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedHeading from "@/components/AnimatedHeading";
import { menuCategories } from "@/lib/menuData";
import { EASE_OUT } from "@/animations";

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
  const trackRef  = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const [progress, setProgress] = useState(0);
  const [dragged,  setDragged]  = useState(false);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragged(false);
    startX.current   = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x    = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    if (Math.abs(walk) > 4) setDragged(true);
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    updateProgress();
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const onScroll = () => updateProgress();

  // Touch support
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current  = e.touches[0].pageX;
    scrollLeft.current  = trackRef.current?.scrollLeft ?? 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const walk = (touchStart.current - e.touches[0].pageX) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current + walk;
    updateProgress();
  };

  return (
    <section id="gallery" className="bg-primary py-24 md:py-36 overflow-hidden">

      {/* Header */}
      <motion.div
        className="px-6 md:px-12 lg:px-24 mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <SectionLabel text="Gallery" light className="mb-6" />
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <AnimatedHeading
            text="Eat With Your Eyes"
            tag="h2"
            className="text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
          />
          {/* Drag hint */}
          <span
            className="flex items-center gap-2 text-white/25 text-[11px] tracking-[0.2em] uppercase mb-1 shrink-0"
            style={{ fontFamily: "Whyte, sans-serif" }}
          >
            <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
              <path d="M1 6h26M20 1l6 5-6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Drag to explore
          </span>
        </div>
      </motion.div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex items-end gap-4 pl-6 md:pl-12 lg:pl-24 pr-[30vw] overflow-x-auto scrollbar-hide select-none"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {galleryByCategory.map((group) => (
          <div key={group.category} className="flex items-end gap-4 shrink-0">

            {/* Category label */}
            <div className="shrink-0 w-35 md:w-45 flex flex-col justify-end pb-4 self-end pointer-events-none">
              <div className="w-8 h-px bg-warm mb-3" />
              <span className="text-warm text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "Whyte, sans-serif", fontWeight: 600 }}>
                {group.category}
              </span>
              <span className="text-white/30 text-[11px] mt-1">{group.images.length} items</span>
            </div>

            {/* Images */}
            {group.images.map((image, i) => {
              const isFeatured  = image.featured;
              const isEven      = i % 2 === 0;
              const widthClass  = isFeatured ? "w-[70vw] md:w-[35vw] lg:w-[26vw]" : "w-[60vw] md:w-[30vw] lg:w-[20vw]";
              const aspectClass = isFeatured ? "aspect-[3/4]" : isEven ? "aspect-[4/5]" : "aspect-square";

              return (
                <div
                  key={`${group.category}-${i}`}
                  className={`shrink-0 ${widthClass} group`}
                  style={{ pointerEvents: dragged ? "none" : "auto" }}
                >
                  <div className={`relative ${aspectClass} overflow-hidden`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ transform: "scale(1.02)" }}
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span className="text-white text-sm tracking-[0.15em] uppercase" style={{ fontFamily: "Whyte, sans-serif" }}>
                        {image.caption}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="shrink-0 w-4 md:w-8" />
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="px-6 md:px-12 lg:px-24 mt-8">
        <div className="w-full h-px bg-white/10 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-warm"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "Whyte, sans-serif" }}>Start</span>
          <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "Whyte, sans-serif" }}>End</span>
        </div>
      </div>

    </section>
  );
}
