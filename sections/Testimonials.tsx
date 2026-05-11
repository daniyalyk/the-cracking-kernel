"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/AnimatedHeading";
import SectionLabel from "@/components/SectionLabel";
import { EASE_OUT } from "@/animations";

const testimonials = [
  {
    quote: "I had an outstanding experience from start to finish. The ambiance was warm and welcoming, the staff were incredibly polite, and the service was quick. Every dish was fresh, flavourful, and perfectly prepared — you can really tell they use high-quality ingredients. What impressed me the most was the attention to detail and the cleanliness of the place. It truly made the whole dining experience comfortable and enjoyable. Highly recommended for anyone looking for great food, great service, and great vibes. Definitely coming back! 🍽✨",
    name: "Mr. A.A.K",
    role: "Google Review",
    rotate: "-2deg",
    color: "#FFF9C4",
  },
  {
    quote: "It was my first visit and literally fell in love with the place. Their schnitzel sandwich is my new favourite and I just can't get enough of it. If you are in the area and looking for a great spot to grab a bite or do some freelance + lunch cracking kernel should be on your list. Will definitely visit again and I hope they maintain the quality and taste",
    name: "Mr. S.R",
    role: "Google Review",
    rotate: "1.5deg",
    color: "#C8E6C9",
  },
  {
    quote: "I had a wonderful experience at this restaurant! The food was absolutely delicious, and I was pleasantly surprised to see the Owner (Mr.Ali) on-site, assisting customers with their menu selections. He was incredibly professional and added a personal touch to our visit. The ambiance was warm and inviting, making it a truly friendly atmosphere. Highly recommend!",
    name: "Mr. T.E",
    role: "Google Review",
    rotate: "-1deg",
    color: "#FFDDD2",
  },
];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ y: 50, opacity: 0, rotate: testimonial.rotate }}
              whileInView={{ y: 0, opacity: 1, rotate: testimonial.rotate }}
              whileHover={{ y: -8, rotate: "0deg", scale: 1.02 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE_OUT }}
              className="relative cursor-default"
              style={{
                backgroundColor: testimonial.color,
                rotate: testimonial.rotate,
                boxShadow: "3px 4px 16px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.08)",
                padding: "2rem 1.75rem 1.75rem",
              }}
            >
              {/* Tape strip at top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 opacity-60"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              />

              {/* Quote mark */}
              <span
                className="block text-4xl leading-none mb-4 opacity-30"
                style={{ fontFamily: "Whyte, sans-serif", color: "#1A312D" }}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p
                className="text-[13.5px] leading-[1.85] mb-6"
                style={{ color: "#2a2a2a", fontFamily: "Whyte, sans-serif" }}
              >
                {testimonial.quote}
              </p>

              {/* Divider */}
              <div className="w-8 h-px mb-4" style={{ background: "rgba(26,49,45,0.25)" }} />

              {/* Author */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{ color: "#1A312D", fontFamily: "Whyte, sans-serif", fontWeight: 700, fontSize: "14px", lineHeight: 1.4, display: "block" }}
                >
                  {testimonial.name}
                </span>
                <span
                  style={{ color: "#1A312D", fontFamily: "Whyte, sans-serif", fontSize: "12px", lineHeight: 1.4, opacity: 0.5, display: "block" }}
                >
                  {testimonial.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
