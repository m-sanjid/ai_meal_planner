import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const currentTheme =
      localStorage.getItem("theme") ||
      (root.classList.contains("dark") ? "dark" : "light");
    setIsDarkMode(currentTheme === "dark");
    root.classList.toggle("dark", currentTheme === "dark");
  }, []);
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

  return (
    <div className="bg-[#4B6746]/40 z-20 backdrop-blur p-4 top-0 sticky h-16">
      <div className="flex justify-between w-full mx-auto max-w-7xl items-center">
        <div className="text-2xl font-bold">
          <a href="/">
            Befit<span className="text-[#4B6746]">AI</span>
          </a>
        </div>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Button variant="ghost">
              <a href={item.href}>{item.title}</a>
            </Button>
          ))}
          <div className="ml-10 p-1">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const navItems = [
  { title: "Create", href: "/meal" },
  { title: "Add", href: "/add" },
  { title: "Dashboard", href: "/dashboard" },
];

// const outNavItems = [
//   { title: "Pricing", href: "/pricing" },
//   { title: "Preview", href: "/preview" },
//   { title: "Contact", href: "/contact" },
//   { title: "About Us", href: "/about" },
//   { title: "Blog", href: "/blog" },
// ];
