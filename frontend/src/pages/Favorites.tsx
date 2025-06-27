import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import Unauthorized from "./Unauthorized";
import { PageHeader } from "@/components/PageHeader";
import MealCard from "@/components/MealCard";
import { Meal } from "@/lib/constants";

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

  if (!isSignedIn) {
    return <Unauthorized />;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <PageHeader user={user} title="Favorites" Cta="Create New Meal" />

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            className="py-12 text-center"
          >
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Star className="text-muted-foreground h-8 w-8" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">No Favorites Yet</h2>
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
            className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {favorites.map((fav, index) => (
              <motion.div
                key={fav._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mx-auto w-full max-w-md"
              >
                <MealCard
                  meal={{
                    ...fav.meal,
                    macros: fav.meal.macros || { protein: 0, fat: 0, carbs: 0 },
                    ingredients: fav.meal.ingredients || [],
                    isFavorite: true,
                  }}
                  saveFavoriteMeal={() => handleRemoveFavorites(fav._id)}
                  showNutritionDetails={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
