import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const Appearance = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme || systemTheme;
    setIsDarkMode(theme === "dark");
    root.classList.toggle("dark", theme === "dark");
  }, [systemTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode !== undefined) {
      const newTheme = isDarkMode ? "light" : "dark";
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle("dark", !isDarkMode);
      localStorage.setItem("theme", newTheme);
    }
  };

  return (
    <Card className="bg-card backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
      >
        <CardHeader>
          <CardTitle className="text-foreground">Appearance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize how the application looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <label className="text-foreground">Theme</label>
              <p className="text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default Appearance;
