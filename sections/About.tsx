"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Image cinematic reveal ---
      if (imageWrapRef.current && imageInnerRef.current) {
        gsap.set(imageWrapRef.current, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" });
        gsap.set(imageInnerRef.current, { scale: 1.4 });

        ScrollTrigger.create({
          trigger: imageWrapRef.current,
          start: "top 80%",
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(imageWrapRef.current!, {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              duration: 1.6,
              ease: "power4.inOut",
            }).to(
              imageInnerRef.current!,
              { scale: 1, duration: 2, ease: "power2.out" },
              "<0.2"
            );
          },
          once: true,
        });

        // Parallax on scroll
        gsap.to(imageInnerRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // --- Text column stagger ---
      if (textColRef.current) {
        const els = textColRef.current.querySelectorAll(".about-reveal");
        gsap.set(els, { y: 50, opacity: 0 });

        ScrollTrigger.create({
          trigger: textColRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to(els, {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
            });
          },
          once: true,
        });
      }

      // --- Animated counters ---
      counterRefs.current.forEach((el) => {
        if (!el) return;
        const target = parseInt(el.dataset.count || "0", 10);

        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { innerText: "0" },
              {
                innerText: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: function () {
                  el.textContent = Math.round(
                    parseFloat(el.textContent || "0")
                  ).toString();
                },
              }
            );
          },
          once: true,
        });
      });

      // --- Marquee infinite scroll ---
      if (marqueeRef.current) {
        const track = marqueeRef.current.querySelector(".marquee-track");
        if (track) {
          gsap.set(marqueeRef.current, { opacity: 0 });

          ScrollTrigger.create({
            trigger: marqueeRef.current,
            start: "top 90%",
            onEnter: () => {
              gsap.to(marqueeRef.current!, { opacity: 1, duration: 0.6 });
              gsap.to(track, {
                xPercent: -50,
                duration: 30,
                ease: "none",
                repeat: -1,
              });
            },
            once: true,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 12, suffix: "+", label: "Breakfast Items" },
    { value: 8, suffix: "+", label: "Deli Sandwiches" },
    { value: 4, suffix: ".2★", label: "Foodpanda Rating" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
    >
      {/* Marquee strip */}
      <div
        ref={marqueeRef}
        className="py-5 border-y border-primary/6 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/app-bg.png')" }}
      >
        <div className="marquee-track flex whitespace-nowrap gap-12">
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-primary/20 text-sm tracking-[0.3em] uppercase shrink-0"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span>Good Food</span>
              <span className="text-warm/40">✦</span>
              <span>Good People</span>
              <span className="text-warm/40">✦</span>
              <span>Good Vibes</span>
              <span className="text-warm/40">✦</span>
              <span>Fresh Ingredients</span>
              <span className="text-warm/40">✦</span>
              <span>Family Owned</span>
              <span className="text-warm/40">✦</span>
              <span>DHA Phase 5</span>
              <span className="text-warm/40">✦</span>
              <span>Lahore</span>
              <span className="text-warm/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        className="py-28 md:py-44 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/app-bg.png')" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — large image */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div ref={imageWrapRef} className="aspect-[3/4] overflow-hidden">
              <img
                ref={imageInnerRef}
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
                alt="The Cracking Kernel interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — text + stats */}
          <div ref={textColRef} className="lg:col-span-7 lg:pl-8 flex flex-col pt-4 lg:pt-12">
            <div className="about-reveal flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-warm" />
              <span
                className="text-xs tracking-[0.3em] uppercase text-warm"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Our Story
              </span>
            </div>

            <h2
              className="about-reveal text-4xl md:text-5xl lg:text-[3.5rem] text-primary leading-[1.1] mb-10"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
            >
              Your Friendly
              <br />
              Neighbourhood
              <br />
              <span className="text-warm italic font-normal">Cafe & Deli</span>
            </h2>

            <p className="about-reveal text-text-secondary text-[15px] leading-[1.9] mb-6 max-w-xl">
              The Cracking Kernel is a family-owned and family-run Cafe &
              Deli in the heart of DHA Phase 5, Lahore. Designed through
              countless trials, tribulations, brainstorming sessions and
              meetings — with one objective: to create a space that feels
              like home.
            </p>

            <p className="about-reveal text-text-secondary text-[15px] leading-[1.9] mb-14 max-w-xl">
              We offer comfort foods championing fresh and high-quality
              ingredients. Our goal is to become your go-to for Breakfast,
              Lunch and Dinner, alongside high-quality beverages and freshly
              baked products.
            </p>

            {/* Animated stats */}
            <div className="about-reveal grid grid-cols-3 gap-8 border-t border-primary/8 pt-10">
              {stats.map((stat, i) => (
                <div key={stat.label} className="group">
                  <div className="flex items-baseline gap-0.5 mb-2">
                    <span
                      ref={(el) => {
                        counterRefs.current[i] = el;
                      }}
                      data-count={stat.value}
                      className="text-4xl md:text-5xl text-primary"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      0
                    </span>
                    <span
                      className="text-xl md:text-2xl text-warm"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {stat.suffix}
                    </span>
                  </div>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-text-light">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
