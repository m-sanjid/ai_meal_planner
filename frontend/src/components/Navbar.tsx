import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

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

      {/* desktop Navbar  */}
       <div className="hidden md:flex space-x-2">
        <div className="flex gap-2">
          <SignedIn>
            {navItems.map((item) => (
              <Button variant="ghost" key={item.title}>
                <a href={item.href}>{item.title}</a>
              </Button>
            ))}
            <div className="px-6 scale-125 ">
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            {outNavItems.map((item) => (
              <Button variant="ghost">
                <a href={item.href}>{item.title}</a>
              </Button>
            ))}
            <Button variant={"secondary"} className="px-6 ml-10">
              <SignInButton />
            </Button>
          </SignedOut>
       </div>
        </div>
          {/* Mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
	              <Button variant="ghost" size="icon">
								  <Menu className="h-5 w-5" />
							  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <SignedIn>
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <Button variant="ghost" key={item.title}>
                        <a href={item.href}>{item.title}</a>
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </SignedIn>
                <SignInButton>
                  {outNavItems.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <Button variant="ghost" key={item.title}>
                        <a href={item.href}>{item.title}</a>
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </SignInButton>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          <div className="ml-4 p-1">
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
  );
};

export default Navbar;

const navItems = [
  { title: "Create", href: "/meal" },
  { title: "Add", href: "/add" },
  { title: "Dashboard", href: "/dashboard" },
  { title: "Favorites", href: "/user/favorites" },
];

const outNavItems = [
  { title: "Pricing", href: "/pricing" },
  { title: "Preview", href: "/preview" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
];
