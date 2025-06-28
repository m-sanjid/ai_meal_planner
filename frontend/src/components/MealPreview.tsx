import { useUser } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useFavoriteMeals } from "@/hooks/useFavorites";
import { Meal } from "@/lib/constants";

interface MealPreviewProps {
  onClick: (meal: Meal) => void;
}

const MealPreview = ({ onClick }: MealPreviewProps) => {
  const { user } = useUser();

  // TanStack Query hook
  const {
    data: favorites = [],
    isLoading,
    error,
  } = useFavoriteMeals(user?.id || "");

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-destructive/10 text-destructive rounded-lg border p-4">
          <p className="text-sm">
            Failed to load favorite meals. Please try again.
          </p>
        </div>
      </motion.div>
    );
  }

  if (favorites.length === 0) {
    return (
      <motion.div
        className="p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-muted-foreground">
          No favorite meals found. Add some meals to your favorites first!
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key="favorites-grid"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {favorites.slice(0, 6).map((fav, index) => (
          <motion.div
            key={fav._id || index}
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
                    <h3 className="text-foreground mb-2 text-lg font-semibold">
                      {fav.meal.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <p className="text-muted-foreground text-sm">
                          Calories
                        </p>
                        <p className="text-foreground font-semibold">
                          {fav.meal.calories} kcal
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <p className="text-muted-foreground text-sm">Protein</p>
                        <p className="text-foreground font-semibold">
                          {fav.meal.macros?.protein}g
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <p className="text-muted-foreground text-sm">Carbs</p>
                        <p className="text-foreground font-semibold">
                          {fav.meal.macros?.carbs}g
                        </p>
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                        onClick={() => onClick(fav.meal)}
                      >
                        Add to Tracker
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
  );
};

export default MealPreview;
