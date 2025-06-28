import { features } from "@/lib/constants";
import { motion } from "motion/react";
import { useState } from "react";
import SectionHeader from "./SectionHeader";

export function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <section
      id="features"
      className="relative mx-auto max-w-6xl px-4 py-32 sm:px-8 md:px-16 lg:px-24"
      aria-label="Features"
    >
      <SectionHeader
        title="Designed for Speed & Simplicity"
        description="No fluff. Just the essential tools to help you eat better, faster."
        as="h2"
      />

      <div
        onMouseLeave={() => setHoveredCard(null)}
        className="mt-24 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            onMouseEnter={() => setHoveredCard(index)}
            key={feature.title}
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative z-10 rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-black transition-all group-hover:scale-105 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
              <feature.icon className="h-5 w-5 transition-all duration-200 ease-in-out group-hover:translate-x-1" />
            </div>
            <h3 className="z-10 mb-2 text-xl font-semibold text-black dark:text-white">
              {feature.title}
            </h3>
            <p className="z-10 text-sm leading-relaxed text-neutral-600 transition-all duration-200 ease-in-out group-hover:ml-1 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
              {feature.description}
            </p>
            {hoveredCard === index && (
              <motion.div
                layoutId="hovered-card"
                className="bg-primary/10 absolute -inset-2 z-0 rounded-2xl opacity-15"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Subtle animated background lines */}
      <div className="animate-bg-pan pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(135deg,_rgba(0,0,0,0.02)_0px,_rgba(0,0,0,0.02)_1px,_transparent_1px,_transparent_20px)] dark:bg-[repeating-linear-gradient(135deg,_rgba(255,255,255,0.03)_0px,_rgba(255,255,255,0.03)_1px,_transparent_1px,_transparent_20px)]" />
    </section>
  );
}
