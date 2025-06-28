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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open command menu"
        className="text-muted-foreground border-muted flex cursor-pointer items-center gap-2 rounded-2xl border-2 px-2 py-2 text-sm md:px-4"
        onClick={() => setOpen(true)}
      >
        <IconSearch strokeWidth={2} size={16} />
        <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none lg:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navItems.map((item) => (
              <CommandItem key={item.title} onSelect={() => handleSelect(item.href)}>
                <IconArrowUpRight size={12} strokeWidth={2} className="mr-2" />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
