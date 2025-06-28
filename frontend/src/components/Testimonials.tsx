import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Testimonials } from "@/lib/constants";
import SectionHeader from "./SectionHeader";
import Marquee from "react-fast-marquee";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="testimonials"
      className="py-20"
      ref={ref}
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Testimonials */}
        <motion.div
          className="space-y-24"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader
            title="Testimonials"
            description="What our users say about our AI-powered meal plans"
            as="h2"
          />
          <Marquee
            pauseOnHover={true}
            gradient={false}
            className="rounded-2xl border [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] p-4"
          >
            {Testimonials.map((testimonial, index) => (
              <motion.article
                key={index}
                className="group bg-accent/30 mx-2 h-full max-w-xl rounded-3xl border p-6"
                variants={fadeUpVariants}
              >
                <motion.blockquote
                  className="mb-8 h-[200px] text-xl leading-relaxed font-light md:text-3xl"
                  whileHover={{
                    x: 4,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  &quot;{testimonial.quote}&quot;
                </motion.blockquote>

                <motion.footer
                  className="border-muted-foreground flex items-center justify-between border-t pt-6"
                  whileHover={{ borderColor: "#a1a1aa" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-1">
                    <motion.div className="font-medium">
                      {testimonial.author}
                    </motion.div>
                    <motion.div className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </motion.div>
                  </div>
                </motion.footer>
              </motion.article>
            ))}
          </Marquee>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="mt-32 h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
