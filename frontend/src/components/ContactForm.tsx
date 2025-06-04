import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/contact";

const ContactForm = () => {
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "subject":
        if (!value.trim()) {
          error = "Subject is required";
        } else if (value.trim().length < 3) {
          error = "Subject must be at least 3 characters";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
    }

    return error;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof typeof formData;
      const error = validateField(typedKey, formData[typedKey]);
      if (error) {
        newErrors[typedKey] = error;
      }
    });
    setIsSubmitting(true);
    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await sendContactEmail(
        formData.name,
        formData.email,
        formData.subject,
        formData.message,
      );
      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(response.message || "Something went wrong.");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});

      // Success notification
      toast.success("Message sent successfully!");
    } catch (error) {
      setErrors({
        submit: "Failed to send message. Please try again.",
        error: error as string,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (fieldName: string) => {
    setIsFocused(null);
    // Validate field on blur
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const shouldLabelBeFloated = (fieldName: string) => {
    return isFocused === fieldName || formData[fieldName].length > 0;
  };

  const labelVariants = {
    default: {
      y: 30,
      x: 20,
      scale: 1,
    },
    focused: {
      y: -4,
      x: 0,
      scale: 0.85,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    loading: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  const spinnerVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl rounded-[2px] border p-6"
    >
      <motion.div variants={itemVariants} className="space-y-6">
        {/* Name Field */}
        <motion.div variants={itemVariants} className="relative">
          <motion.label
            htmlFor="name"
            variants={labelVariants}
            animate={shouldLabelBeFloated("name") ? "focused" : "default"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`pointer-events-none absolute text-sm font-medium ${
              errors.name
                ? "text-red-500"
                : shouldLabelBeFloated("name")
                  ? "text-primary"
                  : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Name
          </motion.label>
          <motion.input
            type="text"
            id="name"
            name="name"
            onFocus={() => setIsFocused("name")}
            onBlur={() => handleBlur("name")}
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`mt-6 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none dark:bg-neutral-800 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary border-gray-200 dark:border-neutral-700"
            }`}
          />
          <AnimatePresence mode="wait">
            {errors.name && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-1 text-sm text-red-500"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants} className="relative">
          <motion.label
            htmlFor="email"
            variants={labelVariants}
            animate={shouldLabelBeFloated("email") ? "focused" : "default"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`pointer-events-none absolute text-sm font-medium ${
              errors.email
                ? "text-red-500"
                : shouldLabelBeFloated("email")
                  ? "text-primary"
                  : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Email
          </motion.label>
          <motion.input
            type="email"
            id="email"
            name="email"
            onFocus={() => setIsFocused("email")}
            onBlur={() => handleBlur("email")}
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`mt-6 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none dark:bg-neutral-800 ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary border-gray-200 dark:border-neutral-700"
            }`}
          />
          <AnimatePresence mode="wait">
            {errors.email && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-1 text-sm text-red-500"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subject Field */}
        <motion.div variants={itemVariants} className="relative">
          <motion.label
            htmlFor="subject"
            variants={labelVariants}
            animate={shouldLabelBeFloated("subject") ? "focused" : "default"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`pointer-events-none absolute text-sm font-medium ${
              errors.subject
                ? "text-red-500"
                : shouldLabelBeFloated("subject")
                  ? "text-primary"
                  : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Subject
          </motion.label>
          <motion.input
            type="text"
            id="subject"
            name="subject"
            onFocus={() => setIsFocused("subject")}
            onBlur={() => handleBlur("subject")}
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`mt-6 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none dark:bg-neutral-800 ${
              errors.subject
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary border-gray-200 dark:border-neutral-700"
            }`}
          />
          <AnimatePresence mode="wait">
            {errors.subject && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-1 text-sm text-red-500"
              >
                {errors.subject}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message Field */}
        <motion.div variants={itemVariants} className="relative">
          <motion.label
            htmlFor="message"
            variants={labelVariants}
            animate={shouldLabelBeFloated("message") ? "focused" : "default"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`pointer-events-none absolute text-sm font-medium ${
              errors.message
                ? "text-red-500"
                : shouldLabelBeFloated("message")
                  ? "text-primary"
                  : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Message
          </motion.label>
          <motion.textarea
            id="message"
            name="message"
            onFocus={() => setIsFocused("message")}
            onBlur={() => handleBlur("message")}
            value={formData.message}
            onChange={handleChange}
            rows={4}
            disabled={isSubmitting}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`resize-vertical mt-6 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none dark:bg-neutral-800 ${
              errors.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary border-gray-200 dark:border-neutral-700"
            }`}
          />
          <AnimatePresence mode="wait">
            {errors.message && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-1 text-sm text-red-500"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Error */}
        <AnimatePresence mode="wait">
          {errors.submit && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center text-sm text-red-500"
            >
              {errors.submit}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          variants={buttonVariants}
          initial="idle"
          whileTap={!isSubmitting ? "tap" : "loading"}
          animate={isSubmitting ? "loading" : "idle"}
          className={`text-primary-foreground w-full rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-300 ${
            isSubmitting
              ? "cursor-not-allowed bg-gray-400"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          <AnimatePresence mode="wait">
            {isSubmitting || status === "Sending..." ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center"
              >
                <motion.div
                  variants={spinnerVariants}
                  animate="spin"
                  className="mr-3 h-5 w-5 rounded-full border-2 border-transparent border-t-white"
                />
                Sending...
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
