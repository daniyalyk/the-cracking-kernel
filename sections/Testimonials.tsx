"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/AnimatedHeading";
import SectionLabel from "@/components/SectionLabel";
import { staggerContainer, VIEWPORT, EASE_OUT, EASE_BACK } from "@/animations";

const testimonials = [
  {
    quote: "The best breakfast spot in DHA. Their Turkish Eggs are unreal and the European hot chocolate is out of this world. Feels like home every time.",
    name: "Amna K.",
    role: "Regular",
  },
  {
    quote: "Finally a cafe in Lahore that gets it right — great food, cozy ambiance, and genuine hospitality. The Philly Cheesesteak is a must-try.",
    name: "Hassan R.",
    role: "Food Blogger",
  },
  {
    quote: "Family-run with so much heart. You can taste the quality in every dish. My kids love the pancakes and I'm addicted to the flat white.",
    name: "Sarah M.",
    role: "Patron",
  },
];

const cardVariants = {
  hidden:  { y: 50, opacity: 0, scale: 0.97 },
  visible: (i: number) => ({
    y: 0, opacity: 1, scale: 1,
    transition: { duration: 0.8, delay: i * 0.15, ease: EASE_OUT },
  }),
};

const quoteVariants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1, opacity: 1,
    transition: { duration: 0.6, delay: i * 0.15 + 0.3, ease: EASE_BACK },
  }),
};

const textChildVariants = {
  hidden:  { y: 20, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export default function Testimonials() {
  return (
    <section
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
            <motion.div
              key={testimonial.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group p-8 md:p-10 border border-primary/6 hover:border-warm/25 transition-colors duration-500 cursor-default"
            >
              <motion.span
                custom={i}
                variants={quoteVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="quote-mark block text-5xl text-warm/30 leading-none mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </motion.span>

              <motion.div
                className="testimonial-text"
                variants={staggerContainer(0.1, i * 0.15 + 0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p variants={textChildVariants} className="text-text-secondary leading-[1.8] mb-8 text-[14px] md:text-[15px]">
                  {testimonial.quote}
                </motion.p>
                <motion.div variants={textChildVariants} className="flex items-center gap-3">
                  <div className="w-8 h-px bg-warm" />
                  <div>
                    <span className="block text-sm text-primary" style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-text-light">{testimonial.role}</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
