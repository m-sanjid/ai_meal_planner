import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "@/components/ui/progress";
import { Star, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";

interface MealTrackerProps {
  meals: any[];
  onRemoveMeal: (index: number) => void;
  onEditMeal?: (index: number) => void;
  onAddToFavorites?: (meal: any) => void;
  dailyCalorieGoal?: number;
}

const MealTracker = ({
  meals,
  onRemoveMeal,
  onEditMeal,
  onAddToFavorites,
  dailyCalorieGoal = 2000,
}: MealTrackerProps) => {
  const [selectedMeal, setSelectedMeal] = useState<number | null>(null);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce(
    (sum, meal) => sum + (meal.macros?.protein || 0),
    0,
  );
  const totalCarbs = meals.reduce(
    (sum, meal) => sum + (meal.macros?.carbs || 0),
    0,
  );
  const totalFat = meals.reduce(
    (sum, meal) => sum + (meal.macros?.fat || 0),
    0,
  );

  const calorieProgress = (totalCalories / dailyCalorieGoal) * 100;
  const proteinProgress = (totalProtein / 150) * 100; // Assuming 150g as protein goal
  const carbsProgress = (totalCarbs / 300) * 100; // Assuming 300g as carbs goal
  const fatProgress = (totalFat / 65) * 100; // Assuming 65g as fat goal

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        <motion.div
          key="meals-grid"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {meals.map((meal, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-card border-border hover:border-primary h-full transition-colors duration-200">
                <CardContent className="p-4">
                  <div className="flex h-full flex-col">
                    <div className="flex-1">
                      <motion.h3
                        className="text-foreground mb-2 text-lg font-semibold"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {meal.name}
                      </motion.h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Calories
                          </span>
                          <span className="font-semibold">
                            {meal.calories} kcal
                          </span>
                        </div>
                        <Progress
                          value={(meal.calories / dailyCalorieGoal) * 100}
                          className="h-2"
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="bg-muted/50 rounded-lg p-2 text-center"
                        >
                          <p className="text-muted-foreground text-sm">
                            Protein
                          </p>
                          <p className="text-foreground font-semibold">
                            {meal.macros?.protein}g
                          </p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="bg-muted/50 rounded-lg p-2 text-center"
                        >
                          <p className="text-muted-foreground text-sm">Carbs</p>
                          <p className="text-foreground font-semibold">
                            {meal.macros?.carbs}g
                          </p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="bg-muted/50 rounded-lg p-2 text-center"
                        >
                          <p className="text-muted-foreground text-sm">Fat</p>
                          <p className="text-foreground font-semibold">
                            {meal.macros?.fat}g
                          </p>
                        </motion.div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      {onAddToFavorites && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onAddToFavorites(meal)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                      {onEditMeal && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditMeal(index)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => onRemoveMeal(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {meals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <motion.h3
                className="text-foreground mb-4 text-lg font-semibold"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Daily Totals
              </motion.h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Calories
                    </span>
                    <span className="font-semibold">
                      {totalCalories} / {dailyCalorieGoal} kcal
                    </span>
                  </div>
                  <Progress value={calorieProgress} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Protein
                      </span>
                      <span className="font-semibold">{totalProtein}g</span>
                    </div>
                    <Progress value={proteinProgress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Carbs
                      </span>
                      <span className="font-semibold">{totalCarbs}g</span>
                    </div>
                    <Progress value={carbsProgress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Fat</span>
                      <span className="font-semibold">{totalFat}g</span>
                    </div>
                    <Progress value={fatProgress} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default MealTracker;
