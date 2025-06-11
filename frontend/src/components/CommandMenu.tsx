import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IconArrowUpRight, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Create", href: "/meal" },
  { title: "Favorites", href: "/user/favorites" },
  { title: "Pro", href: "/pricing" },
  { title: "Settings", href: "/settings" },
  { title: "Shopping List", href: "/shopping-list" },
  { title: "Calorie Tracker", href: "/calorie-tracker" },
  { title: "Pricing", href: "/pricing" },
  { title: "Preview", href: "/preview" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "/careers" },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        className="text-muted-foreground border-muted flex cursor-pointer items-center gap-2 rounded-2xl border-2 px-2 md:px-4 py-2 text-sm"
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconSearch strokeWidth={2} size={16} />
        <kbd className="bg-muted hidden text-muted-foreground pointer-events-none md:inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navItems.map((item) => (
              <Link to={item.href}>
                <CommandItem key={item.title}>
                  <IconArrowUpRight size={12} strokeWidth={2} />
                  {item.title}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
