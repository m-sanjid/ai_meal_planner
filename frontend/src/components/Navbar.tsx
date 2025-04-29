import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, Moon, Sun, Plus, ChevronDown} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useSubscription } from "@/context/SubscriptionContext";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
;

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState<number|null>(null);
  const { subscription, tokens } = useSubscription();
  const [calories, setCalories] = useState({ consumed: 1200, goal: 2000 });
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const currentTheme =
      localStorage.getItem("theme") ||
      (root.classList.contains("dark") ? "dark" : "light");
    setIsDarkMode(currentTheme === "dark");
    root.classList.toggle("dark", currentTheme === "dark");
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur" />
    );
  }

  const toggleTheme = () => {
    if (isDarkMode !== undefined) {
      const newTheme = isDarkMode ? "light" : "dark";
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle("dark", !isDarkMode);
      localStorage.setItem("theme", newTheme);
    }
  };

  const calorieProgress = (calories.consumed / calories.goal) * 100;

  return (
<nav
onMouseLeave={() => setIsHovered(null)}
      className={`sticky z-50 w-full transition-all duration-300 ${isScrolled
        ? "top-4 mx-auto max-w-5xl border rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        : "top-0 mx-auto max-w-6xl bg-background/95 backdrop-blur"
        }`}
    >
      <div className="max-w-6xl mx-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            className="w-8 h-8" 
            src={isDarkMode ? "/darkIcon.png" : "/icon.png"} 
            alt="Logo"
          />
          <a href="/home" className="text-xl text-muted-foreground font-semibold">
            Befit<span className="text-black dark:text-white">AI</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <SignedIn>
            {navItems.map((item,idx) => (
              <Link
              to={item.href}
             onMouseEnter={() => setIsHovered(idx)}
             className={`gap-2 relative px-4 py-2 flex items-center z-10 ${pathname === item.href
               ? "text-neutral-500"
               : "text-black dark:text-white"
               }`}
               >
             <span className="text-sm">{item.title}</span>
             {isHovered === idx && (
               <motion.div
                 layoutId="hover"
                 className="absolute inset-0 z-20 bg-black/10 dark:bg-white/10 h-full w-full rounded-lg"
               />
             )}
             </Link>
            ))}
            
            {/* Calorie Tracker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Calories</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Goal</span>
                      <span className="font-medium">{calories.goal} kcal</span>
                    </div>
                    <Progress 
                      value={calorieProgress} 
                      className={cn(
                        "h-2",
                        calorieProgress > 100 ? "bg-destructive" : "bg-primary"
                      )}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <a href="/calorie-tracker">
                      <Plus className="h-4 w-4 mr-2" />
                      Track Calories
                    </a>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
              {subscription === "pro" ? (
                <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  PRO
                </div>
              ) : (
                <div className="text-sm font-medium bg-muted px-3 py-1 rounded-full">
                  Tokens: <span className="text-primary">{tokens}</span>
                </div>
              )}
            </div>
            <UserButton />
          </SignedIn>

          <SignedOut>
            {outNavItems.map((item) => (
              <Button 
                key={item.title} 
                variant="ghost" 
                className="text-sm font-medium"
                asChild
              >
                <a href={item.href}>{item.title}</a>
              </Button>
            ))}
            <Button variant="default" className="ml-4">
              <SignInButton />
            </Button>
          </SignedOut>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <SignedIn>
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <a href={item.href}>
                      {item.title}
                    </a>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>
                  <a href="/calorie-tracker" className="w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Calories</span>
                      <span>{calories.consumed}/{calories.goal} kcal</span>
                    </div>
                    <Progress 
                      value={calorieProgress} 
                      className={cn(
                        "h-1",
                        calorieProgress > 100 ? "bg-destructive" : "bg-primary"
                      )}
                    />
                  </a>
                </DropdownMenuItem>
              </SignedIn>
              <SignedOut>
                {outNavItems.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <a href={item.href} className="w-full">{item.title}</a>
                  </DropdownMenuItem>
                ))}
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="ml-2"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

const navItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Create", href: "/meal" },
  { title: "Favorites", href: "/user/favorites"},
  { title: "Pro", href: "/pricing"},
  { title: "Settings", href: "/settings" },
];

const outNavItems = [
  { title: "Pricing", href: "/pricing" },
  { title: "Preview", href: "/preview" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
];
