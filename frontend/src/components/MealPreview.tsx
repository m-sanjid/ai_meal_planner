import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Favorite } from "@/pages/Favorites";

interface MealPreviewProps {
  onClick: (meal: any) => void;
}

const MealPreview = ({ onClick }: MealPreviewProps) => {
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (isSignedIn) {
      getFavoriteMeals();
    }
  }, [isSignedIn]);

  const getFavoriteMeals = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await axios.get<Favorite[]>(
        `${import.meta.env.VITE_API_URL}/api/meals/favorites/${user?.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setFavorites(response.data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {favorites.slice(4).map((fav, index) => (
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
                      {fav.meal.name}
                    </motion.h3>
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
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
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