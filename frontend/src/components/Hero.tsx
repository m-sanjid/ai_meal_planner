"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContainerTextFlip } from "./ui/container-text-flip";
import { Spotlight } from "./ui/spotlight";

const Hero = () => {
  const words = ["in Seconds", "for you", "Ai Generated", "Personalized"];

  return (
    <section className="relative isolate overflow-hidden px-4 py-32 text-center">
      {/* Background Glow */}
      <motion.div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-transparent to-neutral-900 opacity-20 blur-3xl dark:from-white/5 dark:to-white/5" />
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60 dark:hidden"
        fill="black"
      />
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60 dark:block"
        fill="white"
      />
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ amount: 0.5, once: true }}
        transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
        className="mx-auto max-w-4xl"
      >
        {/* Title */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-bold md:text-5xl lg:text-7xl">
            {"Healthy Meal Plans".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ amount: 0.5, once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <span className="flex h-24 items-center justify-center transition-all duration-200 md:h-36">
            <ContainerTextFlip words={words} interval={2000} />
          </span>
        </div>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground mb-12 text-lg md:text-2xl"
        >
          Crush your health goals with AI-powered meal plans built for your body
          and your schedule.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/meal"
            className="group bg-primary text-primary-foreground flex h-12 items-center justify-center gap-2 rounded-md border px-8"
          >
            Get Started{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/pricing"
            className="bg-accent hover:bg-primary hover:text-primary-foreground flex h-12 items-center justify-center gap-2 rounded-md border px-8 transition-colors duration-200"
          >
            View Pricing
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
