import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import Unauthorized from "./Unauthorized";
import { PageHeader } from "@/components/PageHeader";
import MealCard from "@/components/MealCard";
import { Helmet } from "react-helmet-async";
import { useFavoriteMeals, useRemoveFromFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const { user, isSignedIn } = useUser();

  // TanStack Query hooks
  const {
    data: favorites = [],
    isLoading,
    error,
  } = useFavoriteMeals(user?.id || "");
  const removeFromFavoritesMutation = useRemoveFromFavorites();

  const handleRemoveFavorites = (favoriteId: string) => {
    if (user?.id) {
      removeFromFavoritesMutation.mutate({ favoriteId, userId: user.id });
    }
  };

  if (!isSignedIn) {
    return <Unauthorized />;
  }

  return (
    <>
      <Helmet>
        <title>Favorites | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="View and manage your favorite meals on BefitAI. Save, remove, and revisit your top meal choices."
        />
      </Helmet>
      <main className="bg-background min-h-screen" aria-label="Favorites">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <PageHeader user={user} title="Favorites" Cta="Create New Meal" />

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-[200px] w-full" />
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-12 text-center"
            >
              <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Star className="h-8 w-8" />
              </div>
              <h1 className="mb-2 text-xl font-semibold">
                Error Loading Favorites
              </h1>
              <p className="text-muted-foreground mb-4">
                Failed to load your favorite meals. Please try again.
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && favorites.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-12 text-center"
            >
              <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Star className="text-muted-foreground h-8 w-8" />
              </div>
              <h1 className="mb-2 text-xl font-semibold">No Favorites Yet</h1>
              <p className="text-muted-foreground mb-4">
                Save your favorite meals to see them here
              </p>
              <Button asChild>
                <a href="/meal">Create Your First Meal</a>
              </Button>
            </motion.div>
          )}

          {/* Favorites List */}
          {!isLoading && !error && favorites.length > 0 && (
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
                      name: fav.meal.name || "Unknown Meal",
                      calories: fav.meal.calories || 0,
                      macros: {
                        protein: fav.meal.macros?.protein || 0,
                        fat: fav.meal.macros?.fat || 0,
                        carbs: fav.meal.macros?.carbs || 0,
                      },
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
      </main>
    </>
  );
};

export default Favorites;
