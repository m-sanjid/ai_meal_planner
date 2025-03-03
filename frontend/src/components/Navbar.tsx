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
import { useSubscription } from "@/context/SubscriptionContext";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const {subscription,tokens} = useSubscription()

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
    <nav className="bg-[#4B6746]/40 z-20 backdrop-blur p-4 top-0 sticky h-16">
      <div className="flex justify-between w-full mx-auto max-w-6xl items-center">
        <div className="text-2xl font-bold flex gap-2">
          <img className="w-8 h-8" src={isDarkMode?"/darkIcon.png":"/icon.png"} alt=""/>
          <a href="/home">
            Befit<span className="text-[#4B6746]">AI</span>
          </a>
        </div>

      {/* desktop Navbar  */}
      <div className="flex gap-2 items-center">
       <div className="hidden md:flex space-x-2">
        <div className="flex gap-2">
          <SignedIn>
            {navItems.map((item) => (
              <Button variant="ghost" key={item.title}>
                <a href={item.href}>{item.title}</a>
              </Button>
            ))}
            <div className="flex items-center">
              {subscription === "pro" ? 
                <div className="px-2 py-px rounded-3xl bg-amber-400/50 backdrop-blur-md border-amber-400 border text-xs font-medium">PRO</div> : 
                <div className="text-sm font-semibold  bg-black/10 backdrop-blur-md p-2 rounded-2xl">Tokens: <span className="text-red-500">{tokens}</span></div>}
            </div>
            <div className="px-6">
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            {outNavItems.map((item) => (
              <Button variant="ghost" key={item.title}>
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
                      <a href={item.href}>{item.title}</a>
                    </DropdownMenuItem>                  
                  ))}
                </SignedIn>
                <SignedOut>
                  {outNavItems.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <a href={item.href}>{item.title}</a>
                    </DropdownMenuItem>
                  ))}
                </SignedOut>
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
    </nav>
  );
};

export default Navbar;

const navItems = [
  { title: "Create", href: "/meal" },
  { title: "Pro", href: "/pricing" },
  { title: "Dashboard", href: "/dashboard" },
  { title: "Favorites", href: "/user/favorites" },
  { title: "Settings", href: "/settings" },
];

const outNavItems = [
  { title: "Pricing", href: "/pricing" },
  { title: "Preview", href: "/preview" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
];
