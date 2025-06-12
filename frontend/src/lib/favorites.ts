import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

type UseFavoritesOptions = {
  userId: string;
  token: string;
  apiUrl?: string;
};

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

export function useFavorites<T = string>(options: UseFavoritesOptions) {
  const { userId, token, apiUrl = `${import.meta.env.VITE_API_URL}/api/favorites` } = options;

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
    const { getToken } = useAuth();

  useEffect(() => {
    if (!userId || !token) return;

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFavorites(res.data.favorites || []);
      } catch (err: any) {
        setError("Failed to load favorites");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, token, apiUrl]);

  const isFavorite = (item: Favorite) => favorites.includes(item);


  const saveFavoriteMeal = async (meal: Meal) => {
    

    try {
      const token = await getToken();
      await axios.post(
        apiUrl,
        { userId: user?.id, meal },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast("Meal added to favorites ");
    } catch (error) {
      console.error("Error saving favorite meals", error);
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

  const toggleFavorite = (item: Favorite) => {
    isFavorite(item) ? handleRemoveFavorites(item._id) : saveFavoriteMeal(item.meal);
  };

  return {
    favorites,
    loading,
    error,
    isFavorite,
      toggleFavorite,
    saveFavoriteMeal,
  };
}
