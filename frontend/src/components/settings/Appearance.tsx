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
import { useState } from "react";
import { useEffect } from "react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card className="bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Appearance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize how the application looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-0.5">
              <label className="text-foreground">Theme</label>
              <p className="text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
              <Moon className="w-4 h-4" />
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-0.5">
              <label className="text-foreground">Language</label>
              <p className="text-muted-foreground">
                Choose your preferred language
              </p>
            </div>
            <select className="bg-card rounded-md p-2 text-foreground">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Appearance;
