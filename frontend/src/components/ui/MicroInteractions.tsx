import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MicroInteractionProps {
  children: React.ReactNode;
  className?: string;
  type?: "hover" | "press" | "rotate" | "fade" | "slide" | "bounce";
  scale?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  whileHover?: object;
  whileTap?: object;
  initial?: object;
  animate?: object;
  exit?: object;
}

export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  className,
  type = "hover",
  scale = 1.05,
  rotate = 5,
  duration = 0.3,
  delay = 0,
  whileHover,
  whileTap,
  initial,
  animate,
  exit,
}) => {
  const getAnimationProps = () => {
    switch (type) {
      case "hover":
        return {
          whileHover: { scale, ...whileHover },
          whileTap: { scale: scale - 0.05, ...whileTap },
        };
      case "press":
        return {
          whileTap: { scale: scale - 0.05, ...whileTap },
        };
      case "rotate":
        return {
          whileHover: { rotate, ...whileHover },
        };
      case "fade":
        return {
          initial: { opacity: 0, ...initial },
          animate: { opacity: 1, ...animate },
          exit: { opacity: 0, ...exit },
        };
      case "slide":
        return {
          initial: { x: -20, ...initial },
          animate: { x: 0, ...animate },
          exit: { x: 20, ...exit },
        };
      case "bounce":
        return {
          whileHover: { y: -4, ...whileHover },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn("inline-block", className)}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
};

export const HoverCard: React.FC<{
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}> = ({ children, content, className }) => {
  return (
    <motion.div
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {children}
      <motion.div
        className="bg-background absolute z-50 hidden rounded-lg border p-4 shadow-lg group-hover:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
};

export const LoadingSpinner: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className }) => {
  return (
    <motion.div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="border-primary absolute inset-0 rounded-full border-2 border-t-transparent" />
    </motion.div>
  );
};

export const ProgressBar: React.FC<{
  progress: number;
  className?: string;
}> = ({ progress, className }) => {
  return (
    <motion.div
      className={cn("bg-muted h-2 overflow-hidden rounded-full", className)}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="bg-primary h-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export const AnimatedButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}> = ({
  children,
  className,
  onClick,
  disabled,
  variant = "default",
  size = "md",
}) => {
  const baseStyles = "font-medium rounded-lg transition-colors";
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export const AnimatedInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
}> = ({ value, onChange, placeholder, className, type = "text" }) => {
  return (
    <motion.input
      type={type}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      className={cn(
        "w-full rounded-lg border px-4 py-2",
        "bg-background text-foreground",
        "focus:ring-primary focus:ring-2 focus:outline-none",
        "transition-colors duration-200",
        className,
      )}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    />
  );
};
