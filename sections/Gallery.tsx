"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import AnimatedHeading from "@/components/AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    alt: "Cafe interior",
    caption: "Our Space",
  },
  {
    src: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
    alt: "Breakfast spread",
    caption: "Morning Ritual",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop",
    alt: "Latte art",
    caption: "The Craft",
  },
  {
    src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop",
    alt: "Deli sandwich",
    caption: "Stacked Fresh",
  },
  {
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop",
    alt: "Cafe ambiance",
    caption: "Good Vibes",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    alt: "Coffee cup",
    caption: "Daily Ritual",
  },
];

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
          className="flex gap-5 pl-6 md:pl-12 lg:pl-24 pr-24"
        >
          {galleryImages.map((image, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[75vw] md:w-[40vw] lg:w-[28vw] group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
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
          ))}
        </div>
      </div>
    </section>
  );
}
