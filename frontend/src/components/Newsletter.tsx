import { useState } from "react";
import { MailCheck, Send, CheckCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { motion } from "motion/react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/lib/contact";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    setTimeout(async () => {
      setIsSubmitting(false);
      try {
        const response = await subscribeToNewsletter(email);

        if (!response) {
          throw new Error("Failed to subscribe to newsletter");
        }
      } catch (error) {
        toast.error(
          "Failed to subscribe to newsletter. Please try again later.",
        );
        throw error;
      }
      setIsSuccess(true);
      setEmail("");
      toast.success("You have successfully subscribed to our newsletter!");
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleSubmit(e);
  };

  return (
    <section
      className="relative isolate mx-auto max-w-6xl overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      aria-label="Newsletter"
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group hover:shadow-3xl relative rounded-3xl border border-white/20 bg-white/70 shadow-2xl shadow-black/5 backdrop-blur-xl transition-all duration-700 hover:shadow-black/10 dark:border-white/10 dark:bg-black/40 dark:shadow-white/5 dark:hover:shadow-white/10"
        >
          {/* Animated border glow */}
          <div className="from-primary/20 via-primary/5 to-accent/20 absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative p-8 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-4 flex flex-col items-center"
            >
              <MailCheck className="group-hover:text-muted-foreground relative z-10 h-10 w-10 transition-all duration-300 group-hover:scale-110" />

              <SectionHeader
                title="Stay Updated"
                description="Subscribe for the latest features and AI-powered tips"
              />
            </motion.div>

            {/* Enhanced Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <div className="group/input relative flex-1">
                {/* Input field with enhanced styling */}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isSubmitting || isSuccess}
                  onKeyDown={handleKeyPress}
                  className="focus:border-primary/50 focus:ring-primary/10 dark:focus:border-primary/50 dark:focus:ring-primary/10 h-14 w-full rounded-2xl border border-neutral-200/50 bg-white/50 px-6 text-neutral-900 placeholder-neutral-500 backdrop-blur-sm transition-all duration-300 group-hover/input:border-neutral-300/50 focus:bg-white/80 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700/50 dark:bg-black/30 dark:text-neutral-100 dark:placeholder-neutral-400 dark:group-hover/input:border-neutral-600/50 dark:focus:bg-black/50"
                />

                {/* Floating label effect */}
                <div className="from-primary/5 via-primary/5 to-primary/5 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-focus-within/input:opacity-100" />

                {/* Input glow effect */}
                <div className="from-primary/10 via-primary/10 to-primary/10 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-sm transition-opacity duration-300 group-focus-within/input:opacity-100" />
              </div>

              <div className="group/button relative">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess || !email.trim()}
                  className="text-secondary shadow-primary/25 hover:shadow-secondary/40 relative h-14 w-full overflow-hidden rounded-2xl bg-black px-8 font-semibold shadow-lg transition-all duration-300 group-hover/button:from-neutral-500 group-hover/button:to-neutral-600 hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg sm:w-auto dark:bg-white"
                >
                  {/* Button content with state transitions */}
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        <span>Subscribing...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="h-5 w-5 animate-bounce" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </div>

                  {/* Button shine effect */}
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full" />

                  {/* Success state overlay */}
                  {isSuccess && (
                    <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500" />
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
