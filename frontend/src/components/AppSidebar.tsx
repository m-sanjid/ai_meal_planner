import {
  LayoutDashboard,
  Settings,
  ShoppingBasket,
  Soup,
  Star,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar";
import { NavUser } from "./NavUser";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "motion/react";
import { IconLayoutSidebar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(2px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

const AppSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { user } = useUser();
  const userItem = {
    name: user?.firstName,
    email: user?.emailAddresses.toString(),
    avatar: user?.imageUrl,
  };

  const location = useLocation();

  useEffect(() => {
    const currentIndex = sidebarLinks.findIndex(
      (item) => item.href === location.pathname,
    );
    setActiveIndex(currentIndex);
  }, [location]);

  const isActive = (index: number) => activeIndex === index;

  return (
    <Sidebar className="pt-16" collapsible="icon">
      {/* Header with sidebar trigger */}
      <SidebarHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <SidebarTrigger>
                  <IconLayoutSidebar />
                </SidebarTrigger>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </motion.div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <SidebarGroupLabel>Application</SidebarGroupLabel>
          </motion.div>

          <SidebarGroupContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <SidebarMenu>
                {sidebarLinks.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="relative"
                    variants={itemVariants}
                    onHoverStart={() => setHoveredIndex(index)}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="my-1">
                        <Link
                          to={item.href}
                          className={cn(
                            "relative flex items-center px-2 py-1.5 transition",
                            isActive(index)
                              ? "text-primary-foreground"
                              : "text-primary",
                          )}
                        >
                          {/* Active border glow */}
                          <AnimatePresence>
                            {isActive(index) && (
                              <motion.div
                                layoutId="active-border"
                                className="bg-primary border-accent absolute inset-0 z-10 rounded-md border-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </AnimatePresence>

                          {/* Hover background */}
                          <AnimatePresence>
                            {hoveredIndex === index && (
                              <motion.div
                                layoutId="hover-bg"
                                className="bg-primary/10 absolute inset-0 z-0 rounded-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </AnimatePresence>

                          {/* Icon with hover scale */}
                          <motion.div
                            className="z-20 flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <item.icon className="size-4" strokeWidth={1.2} />
                          </motion.div>

                          {/* Text with hover shift */}
                          <motion.span
                            className="z-20 ml-3 font-medium"
                            animate={{
                              x: hoveredIndex === index ? 4 : 0,
                              opacity: 1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user */}
      <SidebarFooter>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <NavUser user={userItem} />
        </motion.div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;

const sidebarLinks = [
  { name: "Generate", href: "/meal", icon: Soup },
  { name: "Favorites", href: "/user/favorites", icon: Star },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Shopping", href: "/shopping", icon: ShoppingBasket },
  { name: "Calorie Tracker", href: "/calorie-tracker", icon: Settings },
  { name: "Settings", href: "/settings", icon: Settings },
];
