import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Plus, Star, StarOff, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

interface Meal {
  _id: string;
  name: string;
  calories: number;
  macros?: Macros;
  ingredients?: string[];
}

export interface Favorite {
  _id: string;
  meal: Meal;
  userId?: string;
}

const Favorites = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
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

  const handleRemoveFavorites = async (favoriteId: string) => {
    try {
      const token = await getToken();

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/meals/favorites/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
      toast.success("Meal removed from favorites");
    } catch (error) {
      console.error("Error removing favorite meal:", error);
      toast.error("Failed to remove meal from favorites");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl p-6 shadow-sm mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user?.hasImage ? (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    className="w-full h-full object-cover"
                    src={user?.imageUrl}
                    alt="user avatar"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border-2 border-primary">
                  <User className="w-6 h-6 text-primary" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-semibold">{user?.firstName}'s Favorites</h1>
                <p className="text-muted-foreground">Your saved meals</p>
              </div>
            </div>
            <Button asChild>
              <a href="/meal">
                <Plus className="h-4 w-4 mr-2" />
                Create New Meal
              </a>
            </Button>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-[200px] w-full" />
              </Card>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Star className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-4">
              Save your favorite meals to see them here
            </p>
            <Button asChild>
              <a href="/meal">Create Your First Meal</a>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {favorites.map((fav, index) => (
              <motion.div
                key={fav._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{fav.meal.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFavorites(fav._id)}
                      >
                        <StarOff className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Calories</p>
                          <p className="font-semibold">{fav.meal.calories} kcal</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Protein</p>
                          <p className="font-semibold">{fav.meal.macros?.protein}g</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Carbs</p>
                          <p className="font-semibold">{fav.meal.macros?.carbs}g</p>
                        </div>
                      </div>
                      {fav.meal.ingredients && fav.meal.ingredients.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Ingredients</h3>
                          <ul className="space-y-1">
                            {fav.meal.ingredients.map((ingredient, idx) => (
                              <li
                                key={`${fav._id}-ingredient-${idx}`}
                                className="text-sm text-muted-foreground flex items-center"
                              >
                                <span className="mr-2">•</span>
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
