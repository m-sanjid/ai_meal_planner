import { motion } from "motion/react";
import Logo from "./Logo";
import SocialShare from "./SocialShare";

const Footer = () => {
  return (
    <footer className="bg-accent/55 relative border-t border-neutral-200/50 backdrop-blur-sm dark:border-neutral-800/50">
      {/* Subtle gradient overlay */}
      <div className="dark:via-primary/10 dark:to-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/20" />
      <div className="group relative mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Logo and Copyright */}
          <div className="group flex flex-col items-center md:items-start md:gap-4">
            <div className="relative mb-3 overflow-hidden">
              <Logo />
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </div>
            <p className="text-sm text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300">
              © {new Date().getFullYear()} BefitAI. All rights reserved.
            </p>
            <SocialShare />
          </div>
          <div className="mb-16 ml-[10%] grid w-[80%] grid-cols-2 gap-12 md:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                className="group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <h3 className="mb-6 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{once:true}}
                      transition={{ duration: 0.4, delay: linkIndex * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="group/link relative inline-block text-neutral-600 transition-all duration-300 hover:translate-x-1 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                      >
                        <span className="relative z-10">{link.name}</span>
                        {/* Hover background effect */}
                        <span className="absolute inset-0 -right-2 -left-2 origin-left scale-x-0 rounded-md bg-neutral-100/50 transition-transform duration-300 group-hover/link:scale-x-100 dark:bg-neutral-800/50" />
                        {/* Subtle dot indicator */}
                        <span className="absolute top-1/2 -left-4 h-1 w-1 -translate-y-1/2 rounded-full bg-neutral-400 opacity-0 transition-all duration-300 group-hover/link:opacity-100 dark:bg-neutral-600" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Preview", href: "/preview" },
  ],
  resources: [
    { name: "Documentation", href: "/documentation" },
    { name: "Blog", href: "/blog" },
    { name: "Support", href: "/support" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};
