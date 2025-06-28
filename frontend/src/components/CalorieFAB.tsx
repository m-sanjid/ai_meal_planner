import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus } from "lucide-react";
import { Progress } from "./ui/progress";
import { useState } from "react";
import { Link } from "react-router-dom";

const CalorieFAB = () => {
  const [isCalorieDropdownOpen, setIsCalorieDropdownOpen] = useState(false);
  const [calorieProgress] = useState(0);
  const [calories] = useState({
    consumed: 0,
    goal: 2000,
  });

  return (
    <DropdownMenu onOpenChange={setIsCalorieDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className="hover:border-border/50 h-auto gap-3 rounded-xl border border-transparent px-4 py-2.5 transition-all duration-300"
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-muted-foreground text-xs font-medium">
                Daily Progress
              </span>
              <div className="flex items-center gap-2">
                <div className="bg-muted h-1.5 w-8 overflow-hidden rounded-full">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      calorieProgress > 100
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : "bg-gradient-to-r from-green-500 to-blue-500",
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(calorieProgress, 100)}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-xs font-medium">
                  {Math.round(calorieProgress)}%
                </span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isCalorieDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-muted-foreground h-3.5 w-3.5" />
            </motion.div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-border/50 bg-background/95 w-72 border p-6 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-white/5"
        align="end"
      >
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Calorie Tracking</span>
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    calorieProgress < 80
                      ? "bg-green-500"
                      : calorieProgress < 100
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                />
                {calorieProgress < 80
                  ? "On Track"
                  : calorieProgress < 100
                    ? "Almost There"
                    : "Over Goal"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Consumed</span>
                <span className="font-medium">{calories.consumed} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Goal</span>
                <span className="font-medium">{calories.goal} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span
                  className={cn(
                    "font-medium",
                    calories.goal - calories.consumed < 0
                      ? "text-red-500"
                      : "text-green-500",
                  )}
                >
                  {calories.goal - calories.consumed} kcal
                </span>
              </div>
            </div>

            <div className="relative">
              <Progress value={calorieProgress} className="bg-muted h-3" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
              to="/calorie-tracker"
            >
              <Plus className="mr-2 h-4 w-4" />
              Track More Calories
            </Link>
          </motion.div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalorieFAB;
