import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Plus, Star, StarOff, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

interface Favorite {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // Update local state by removing the deleted favorite
      setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
      toast("Meal removed from favorites");
    } catch (error) {
      console.error("Error removing favorite meal:", error);
    }
  };

  return (
    <div className="h-full max-w-5xl mx-auto p-6">
      <div className="bg-[#4B6746]/20 backdrop-blur-lg mb-10 rounded-md">
        <div className="flex justify-between py-10 px-2 md:px-10">
          {user?.hasImage ? (
            <div className="md:border-4 rounded-xl border-[#4B6746]">
              <img
                className="rounded-lg"
                width={42}
                height={42}
                src={user?.imageUrl}
                alt="user avatar"
              />
            </div>
          ) : (
            <div className="p-2 rounded-lg md:border-4 border-[#4B6746] bg-[#4B6746]/30">
              <User className="w-8 h-8" />
            </div>
          )}

          <div className="text-xl md:text-4xl font-semibold text-[#4B6746] dark:text-white pr-4">
            {user?.firstName}
          </div>
          <a href="/meal">
            <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center p-1 dark:bg-white/40">
              <Plus height={30} width={30} stroke="#4B6746" />
            </div>
          </a>
        </div>
        <div className="flex justify-center gap-3 text-3xl font-bold py-5">
          <Star size={36} fill="gold" strokeWidth={1} /> Favorite Meals
        </div>
      </div>

      {loading ? (
        <Skeleton className="w-full h-[200px]" />
      ) : favorites.length === 0 ? (
        <div className="text-center text-lg">No favorites found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites?.map((fav) => (
            <Card key={fav._id} className="border p-4 rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex justify-between">
                  {fav.meal.name}
                  <Button
                    variant="secondary"
                    onClick={() => handleRemoveFavorites(fav._id)}
                  >
                    <StarOff />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {fav.meal.calories} Calories
                </p>
                <div className="text-sm">
                  <span>Protein: {fav.meal.macros?.protein}g | </span>
                  <span>Carbs: {fav.meal.macros?.carbs}g | </span>
                  <span>Fats: {fav.meal.macros?.fat}g</span>
                </div>
                <p className="font-semibold mt-2">Ingredients:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {fav.meal.ingredients?.map(
                    (ingredient: string, idx: number) => (
                      <li key={`${fav._id}-ingredient-${idx}`}>{ingredient}</li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
