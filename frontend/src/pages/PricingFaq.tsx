import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconPlus } from "@tabler/icons-react";

const PricingFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 py-1">
      {pricingFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.015 }}
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="rounded-xl bg-black/5 p-6 backdrop-blur-lg transition-colors duration-300 dark:bg-white/5"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between text-left font-semibold text-black focus:outline-none dark:text-neutral-200"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <motion.span
                initial={false}
                animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <IconPlus className="h-5 w-5" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: {
                      opacity: 1,
                      height: "auto",
                      clipPath: "inset(0% 0% 0% 0%)",
                    },
                    collapsed: {
                      opacity: 0,
                      height: 0,
                      clipPath: "inset(0% 0% 100% 0%)",
                    },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="overflow-hidden"
                >
                  <motion.hr
                    className="my-3 border-t border-neutral-200 dark:border-neutral-700"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ originX: 0 }}
                  />
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

const pricingFaqs = [
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a 14-day money-back guarantee for all paid plans.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    question: "Do you offer team discounts?",
    answer:
      "Yes, contact our sales team for custom pricing for teams of 10 or more.",
  },
];

export default PricingFaq;
