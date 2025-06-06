import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export const MealCard = ({
  meal,
  index,
  saveFavoriteMeal,
}: {
  meal: any;
  index: number;
  saveFavoriteMeal: (meal: any) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    saveFavoriteMeal(meal);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden rounded-lg border bg-white/50 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-neutral-800/50 h-full">
        <CardHeader>
          <CardTitle className="text-start text-xl font-bold text-neutral-800 transition-colors duration-300 dark:text-white">
            {meal.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-start">
          <div className="flex items-center justify-between">
            <motion.p
              animate={{ scale: isHovered ? 1.05 : 1 }}
              className="text-neutral-700 dark:text-neutral-200"
            >
              Calories: <span className="font-bold">{meal.calories} kcal</span>
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleFavorite}
                variant={"secondary"}
                className={`transition-colors duration-300 ${
                  isFavorite ? "text-yellow-500" : "text-neutral-500"
                }`}
              >
                <Star className={isFavorite ? "fill-yellow-500" : ""} />
              </Button>
            </motion.div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              <span className="font-medium">Protein:</span>
              <span className="font-bold">{meal.macros.protein}g</span>
              <span className="mx-2">|</span>
              <span className="font-medium">Carbs:</span>
              <span className="font-bold">{meal.macros.carbs}g</span>
              <span className="mx-2">|</span>
              <span className="font-medium">Fat:</span>
              <span className="font-bold">{meal.macros.fat}g</span>
            </p>
          </div>
        </CardContent>
        <CardContent className="w-full bg-primary/5 p-4">
          <p className="pb-2 font-semibold text-neutral-800 dark:text-white">Ingredients:</p>
          <ul className="space-y-1.5 group-hover:translate-x-1 ease-in-out transition-transform duration-300">
            {meal.ingredients.map((item: string, idx: number) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors duration-200"
              >
                <span className="mr-2 text-neutral-600 dark:text-neutral-300">•</span>
                <span className="font-light italic">{item}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};
