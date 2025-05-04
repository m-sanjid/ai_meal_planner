import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconPlus } from "@tabler/icons-react";

const PricingFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="grid grid-cols-1 gap-4 py-1 max-w-4xl mx-auto">
      {pricingFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-black/5 dark:bg-white/5 backdrop-blur-lg rounded-xl p-6 transition-colors duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="flex items-center justify-between w-full text-left text-black dark:text-neutral-200 font-semibold focus:outline-none"
              aria-expanded={isOpen}
            >
              {faq.question}
              <motion.span
                initial={false}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <IconPlus className="w-5 h-5" />
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
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-gray-600 dark:text-gray-400 flex items-start">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
