import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    href: "https://twitter.com/dev_sanjid",
    icon: IconBrandX,
    label: "Twitter",
    color: "hover:bg-blue-500",
  },
  {
    href: "https://instagram.com/dev_sanjid",
    icon: IconBrandInstagram,
    label: "Instagram",
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
  },
  {
    href: "https://linkedin.com/in/muhammedsanjid1",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    color: "hover:bg-blue-600",
  },
  {
    href: "https://github.com/m-sanjid",
    icon: IconBrandGithub,
    label: "GitHub",
    color: "hover:bg-neutral-600",
  },
];

const SocialShare = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <div
      onMouseLeave={() => setHoveredIdx(null)}
      className="my-4 flex items-center gap-3"
    >
      <AnimatePresence>
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, scale: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6 + index * 0.1,
                type: "spring",
                stiffness: 300,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-700/50 bg-neutral-800/80 text-neutral-300 transition-all duration-300 hover:border-neutral-600 hover:text-white ${social.color} hover:shadow-lg`}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onTouchStart={() => setHoveredIdx(index)}
                  onTouchEnd={() => setHoveredIdx(null)}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="sr-only">{social.label}</span>

                  {/* Tooltip */}
                  {hoveredIdx === index && (
                    <motion.div
                      className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 transform rounded-lg bg-black/90 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/90 dark:text-neutral-900"
                      layoutId="tooltip"
                    >
                      {social.label}
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SocialShare;
