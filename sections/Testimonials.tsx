"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "@/components/AnimatedHeading";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "The best breakfast spot in DHA. Their Turkish Eggs are unreal and the European hot chocolate is out of this world. Feels like home every time.",
    name: "Amna K.",
    role: "Regular",
  },
  {
    quote:
      "Finally a cafe in Lahore that gets it right — great food, cozy ambiance, and genuine hospitality. The Philly Cheesesteak is a must-try.",
    name: "Hassan R.",
    role: "Food Blogger",
  },
  {
    quote:
      "Family-run with so much heart. You can taste the quality in every dish. My kids love the pancakes and I'm addicted to the flat white.",
    name: "Sarah M.",
    role: "Patron",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.set(card, { y: 50, opacity: 0, scale: 0.97 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: "power3.out",
            });

            const quoteMark = card.querySelector(".quote-mark");
            if (quoteMark) {
              gsap.from(quoteMark, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.15 + 0.3,
                ease: "back.out(1.7)",
              });
            }

            const children = card.querySelectorAll(".testimonial-text > *");
            gsap.from(children, {
              y: 20,
              opacity: 0,
              stagger: 0.1,
              duration: 0.6,
              delay: i * 0.15 + 0.2,
              ease: "power3.out",
            });
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/app-bg.png')" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionLabel text="Reviews" className="justify-center mb-8" />
          <AnimatedHeading
            text="What People Say"
            tag="h2"
            className="text-3xl md:text-5xl lg:text-6xl text-primary leading-tight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group p-8 md:p-10 border border-primary/6 hover:border-warm/25 transition-colors duration-500 cursor-default"
            >
              <span className="quote-mark block text-5xl text-warm/30 leading-none mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>

              <div className="testimonial-text">
                <p className="text-text-secondary leading-[1.8] mb-8 text-[14px] md:text-[15px]">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-warm" />
                  <div>
                    <span
                      className="block text-sm text-primary"
                      style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}
                    >
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-text-light">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
