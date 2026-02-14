"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "@/components/AnimatedHeading";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
  {
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        name: "The Full English",
        price: "1,650",
        desc: "Chicken & beef sausages, turkey bacon, fried eggs, hash browns, baked beans, grilled tomatoes, sautéed mushrooms",
      },
      {
        name: "Turkish Eggs (Çılbır)",
        price: "1,150",
        desc: "Creamy poached eggs in garlic-herb yogurt, Thai-bird chilli & chilli oil drizzle",
      },
      {
        name: "Shakshuka",
        price: "1,250",
        desc: "Fried eggs in spicy marinara with minced chicken, fresh parsley & green onion",
      },
      {
        name: "Avocado Toast",
        price: "1,050",
        desc: "Smashed avocado on sourdough, cherry tomatoes, feta & everything seasoning",
      },
    ],
  },
  {
    category: "Sandwiches",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        name: "Classic Club",
        price: "1,350",
        desc: "Triple-decker with chicken, turkey bacon, egg mayo, lettuce & tomato",
      },
      {
        name: "Smoked Chicken Panini",
        price: "1,250",
        desc: "Smoked chicken, mozzarella, sun-dried tomatoes, basil pesto on ciabatta",
      },
      {
        name: "Philly Cheesesteak",
        price: "1,450",
        desc: "Shaved beef, sautéed peppers & onions, melted provolone on a hoagie roll",
      },
      {
        name: "Falafel Wrap",
        price: "950",
        desc: "Crispy falafel, hummus, pickled vegetables, tahini in a warm tortilla",
      },
    ],
  },
  {
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        name: "Grilled Chicken Bowl",
        price: "1,550",
        desc: "Herb-marinated grilled chicken, quinoa, roasted vegetables, garlic yogurt",
      },
      {
        name: "Fish & Chips",
        price: "1,650",
        desc: "Beer-battered fish fillet, hand-cut fries, mushy peas, tartar sauce",
      },
      {
        name: "Pasta Arrabiata",
        price: "1,250",
        desc: "Penne in spicy tomato sauce with fresh basil, parmesan shavings",
      },
      {
        name: "Chicken Quesadilla",
        price: "1,150",
        desc: "Grilled chicken, bell peppers, cheddar & mozzarella, sour cream & salsa",
      },
    ],
  },
  {
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        name: "Espresso",
        price: "450",
        desc: "Double shot of our signature blend",
      },
      {
        name: "Flat White",
        price: "650",
        desc: "Velvety microfoam with double espresso",
      },
      {
        name: "European Hot Chocolate",
        price: "700",
        desc: "Rich, thick hot chocolate made with real Belgian chocolate",
      },
      {
        name: "Fresh Juices",
        price: "550",
        desc: "Seasonal fresh-pressed — orange, watermelon, or mixed berry",
      },
    ],
  },
];

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Initial scroll-triggered reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const children = headerRef.current.querySelectorAll(":scope > *");
        gsap.set(children, { y: 30, opacity: 0 });

        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
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

      if (tabsRef.current) {
        const btns = tabsRef.current.querySelectorAll("button");
        gsap.set(btns, { y: 20, opacity: 0 });

        ScrollTrigger.create({
          trigger: tabsRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(btns, {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.out",
            });
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate category image on tab change
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { clipPath: "inset(0 0 100% 0)", scale: 1.1 },
      {
        clipPath: "inset(0 0 0% 0)",
        scale: 1,
        duration: 0.8,
        ease: "power3.inOut",
      }
    );
  }, [activeTab]);

  // Animate menu items on tab change
  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll(".menu-item");
    gsap.fromTo(
      items,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="py-28 md:py-44 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/app-bg.png')" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <SectionLabel text="The Menu" className="justify-center mb-8" />
          <AnimatedHeading
            text="Comfort Food Done Right"
            tag="h2"
            className="text-3xl md:text-5xl lg:text-6xl text-primary leading-tight"
          />
          <p className="text-text-light text-sm mt-4 tracking-wide max-w-md mx-auto">
            Fresh & high-quality ingredients, always
          </p>
        </div>

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="flex justify-center gap-3 md:gap-6 mb-16 flex-wrap"
        >
          {menuCategories.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className={`text-[13px] tracking-[0.12em] uppercase px-5 py-2.5 rounded-full border transition-all duration-400 ${
                activeTab === i
                  ? "border-primary bg-primary text-white"
                  : "border-primary/12 text-text-light hover:border-primary/30 hover:text-text-secondary"
              }`}
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Content — image + items side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Category image */}
          <div className="lg:col-span-5">
            <div
              ref={imageRef}
              className="aspect-[4/5] overflow-hidden sticky top-28"
            >
              <img
                src={menuCategories[activeTab].image}
                alt={menuCategories[activeTab].category}
                className="w-full h-full object-cover"
              />
              {/* Category overlay label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/80 to-transparent">
                <span
                  className="text-white text-2xl md:text-3xl"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
                >
                  {menuCategories[activeTab].category}
                </span>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div ref={gridRef} className="lg:col-span-7 flex flex-col">
            {menuCategories[activeTab].items.map((item, i) => (
              <div
                key={item.name}
                className="menu-item group border-b border-primary/6 cursor-pointer"
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="py-6 md:py-7 flex items-start justify-between gap-4 transition-all duration-300 group-hover:pl-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4
                        className="text-[17px] md:text-lg text-primary transition-colors duration-300 group-hover:text-warm"
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </h4>
                      {/* Animated dot */}
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-warm transition-all duration-300 ${
                          hoveredItem === i
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-[13px] text-text-light leading-relaxed max-w-md transition-all duration-400 ${
                        hoveredItem === i
                          ? "opacity-100 max-h-20 mt-1"
                          : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <span
                    className="text-[15px] text-primary/70 group-hover:text-warm shrink-0 transition-colors duration-300 pt-0.5"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Rs. {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
