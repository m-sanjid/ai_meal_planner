import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, Sparkles } from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSubscription } from "@/context/SubscriptionContext";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import CommandMenu from "./CommandMenu";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { subscription, tokens } = useSubscription();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useAuth();

  const pathname = useLocation().pathname;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onMouseLeave={() => setIsHovered(null)}
        className={cn(
          "sticky z-50 w-full transition-all duration-700 ease-out",
          isScrolled
            ? "top-6 mx-auto max-w-4xl px-4"
            : "top-0 mx-auto max-w-6xl px-4",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center justify-between transition-all duration-700 ease-out",
            isScrolled
              ? "border-border/20 bg-background/60 rounded-2xl border px-6 shadow-lg shadow-black/5 backdrop-blur-2xl dark:shadow-white/5"
              : "bg-background/80 border-border/20 border-b px-2 backdrop-blur-xl",
          )}
        >
          {/* Logo Section */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <nav className="hidden items-center md:flex">
              <div
                onMouseLeave={() => setIsHovered(null)}
                className="flex items-center gap-1 rounded-xl border border-neutral-200/50 bg-neutral-100/70 p-1 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/70"
              >
                {(isSignedIn ? navItems : outNavItems).map((item, idx) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="group relative rounded-lg px-4 py-2 text-sm font-medium"
                    onMouseEnter={() => setIsHovered(idx)}
                  >
                    <motion.span
                      className={`relative z-10 transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-neutral-900 dark:text-neutral-100"
                          : "text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100"
                      }`}
                    >
                      {item.title}
                    </motion.span>

                    {isHovered === idx && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg border border-neutral-200/50 bg-white shadow-sm dark:border-neutral-600/50 dark:bg-neutral-900 dark:shadow-lg"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    {/* Active tab background */}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg border border-neutral-200/50 bg-white shadow-sm dark:border-neutral-600/50 dark:bg-neutral-900"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </nav>
            {isSignedIn && (
              <>
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  {subscription === "pro" ? (
                    <motion.div
                      className="flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="h-3 w-3" />
                      PRO
                    </motion.div>
                  ) : (
                    <motion.div
                      className="bg-muted/50 border-border/30 hover:bg-muted/70 hover:border-border/50 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-muted-foreground">Tokens:</span>{" "}
                      <span className="text-foreground font-semibold">
                        {tokens}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted/50 rounded-xl transition-all duration-300"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-border/50 bg-background/95 w-64 border shadow-2xl backdrop-blur-xl"
              >
                {(isSignedIn ? navItems : outNavItems).map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="mx-1 rounded-lg"
                  >
                    <Link to={item.href} className="w-full text-left">
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <CommandMenu />
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Button className="bg-primary hover:shadow-primary/25 ml-4 rounded-xl transition-all duration-300 hover:shadow-lg">
                <SignInButton />
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;

const navItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Create", href: "/meal" },
  { title: "Favorites", href: "/user/favorites" },
  { title: "Pro", href: "/pricing" },
  { title: "Settings", href: "/settings" },
];

const outNavItems = [
  { title: "Pricing", href: "/pricing" },
  { title: "Preview", href: "/preview" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
];
