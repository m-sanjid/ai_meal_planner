import { features } from "@/lib/constants"
import { motion } from "motion/react"
import { useState } from "react"



export function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  return (
    <section className="relative px-4 py-32 sm:px-8 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl z-10 font-semibold tracking-tight text-black dark:text-white md:text-5xl"
        >
          Designed for Speed & Simplicity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl z-10 text-muted-foreground text-lg md:text-xl"
        >
          No fluff. Just the essential tools to help you eat better, faster.
        </motion.p>
      </div>

      <div
        onMouseLeave={() => setHoveredCard(null)}
        className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            onMouseEnter={() => setHoveredCard(index)}
            key={feature.title}
            initial={{ opacity: 0, y: 20 ,filter: "blur(5px)"}}
            whileInView={{ opacity: 1, y: 0 ,filter: "blur(0px)"}}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="group relative rounded-xl border z-10 border-neutral-200 dark:border-neutral-800 p-6 transition-all hover:shadow-xl dark:bg-neutral-950 bg-white"
          >
            <div className="z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white transition-all group-hover:scale-105">
              <feature.icon className="h-5 w-5 group-hover:translate-x-1 transition-all duration-200 ease-in-out" />
            </div>
            <h3 className="z-10 text-xl font-semibold text-black dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="z-10 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:ml-1 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-all duration-200 ease-in-out">
              {feature.description}
            </p>
            {hoveredCard === index && (
              <motion.div
                layoutId="hovered-card"
                className="absolute -inset-2 z-0 rounded-2xl bg-primary/10 opacity-15"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Subtle animated background lines */}
      <div className="absolute inset-0 z-0 bg-[repeating-linear-gradient(135deg,_rgba(0,0,0,0.02)_0px,_rgba(0,0,0,0.02)_1px,_transparent_1px,_transparent_20px)] dark:bg-[repeating-linear-gradient(135deg,_rgba(255,255,255,0.03)_0px,_rgba(255,255,255,0.03)_1px,_transparent_1px,_transparent_20px)] animate-bg-pan pointer-events-none" />
    </section>
  )
}
