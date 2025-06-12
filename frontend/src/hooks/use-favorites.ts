// @ts-ignore
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * Custom hook for managing favorite meals
 * @returns {Object} Favorites data and functions
 */
const useFavorites = () => {
  const { getToken, isSignedIn, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<any>([]);
  const [stats, setStats] = useState({
    totalFavorites: 0,
    totalCalories: 0,
    averageCalories: 0,
    mostCommonGoal: "None",
  });

  /**
   * Calculate stats from favorites data
   * @param {Array} favoritesData - Array of favorite meals
   * @returns {Object} Stats object
   */
  const calculateStats = useCallback((favoritesData: any) => {
    if (!favoritesData || favoritesData.length === 0) {
      return {
        totalFavorites: 0,
        totalCalories: 0,
        averageCalories: 0,
        mostCommonGoal: "None",
      };
    }

    const totalCalories = favoritesData.reduce(
      (sum: any, fav: any) => sum + fav.meal.calories,
      0,
    );

    // Group by goals and find most common
    const goals = favoritesData.map((fav: any) => fav.meal.goal || "Unknown");
    const goalCounts = goals.reduce((acc: any, goal: any) => {
      acc[goal] = (acc[goal] || 0) + 1;
      return acc;
    }, {});

    // Sort goals by count in descending order
    const sortedGoals = Object.entries(goalCounts).sort((a: any, b: any) => b[1] - a[1]);
    const mostCommonGoal = sortedGoals[0]?.[0] || "None";

    return {
      totalFavorites: favoritesData.length,
      totalCalories,
      averageCalories: Math.round(totalCalories / favoritesData.length),
      mostCommonGoal: mostCommonGoal === "Unknown" ? "None" : mostCommonGoal,
    };
  }, []);

  /**
   * Fetch favorite meals from API
   */
  const getFavoriteMeals = useCallback(async () => {
    if (!isSignedIn || !userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/meals/favorites/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const favoritesData = response.data || [];
      setFavorites(favoritesData);
      setStats(calculateStats(favoritesData));
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
      toast.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, userId, getToken, calculateStats]);

  /**
   * Remove a favorite meal
   * @param {string} favoriteId - ID of favorite to remove
   */
  const removeFavorite = useCallback(
    async (favoriteId: any) => {
      try {
        const token = await getToken();

        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/meals/favorites/${favoriteId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        // Update state without refetching
        setFavorites((prev: any) => {
          const updated = prev.filter((fav: any) => fav._id !== favoriteId);
          setStats(calculateStats(updated));
          return updated;
        });

        toast.success("Meal removed from favorites");
      } catch (error) {
        console.error("Error removing favorite meal:", error);
        toast.error("Failed to remove meal from favorites");
      }
    },
    [getToken, calculateStats],
  );

  // Fetch favorites on component mount
  useEffect(() => {
    if (isSignedIn) {
      getFavoriteMeals();
    }
  }, [isSignedIn, getFavoriteMeals]);

  /**
   * Add a favorite meal
   * @param {Meal} meal - Meal object to add to favorites
   */
  const addFavorite = useCallback(
    async (meal: any) => {
      try {
        const token = await getToken();
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/meals/favorites`,
          { userId, meal },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const newFavorite = response.data;
        setFavorites((prev: any) => {
          const updated = [...prev, newFavorite];
          setStats(calculateStats(updated));
          return updated;
        });
        toast.success("Meal added to favorites");
      } catch (error) {
        console.error("Error adding favorite meal:", error);
        toast.error("Failed to add meal to favorites");
      }
    },
    [getToken, userId, calculateStats],
  );

  return {
    loading,
    favorites,
    stats,
    addFavorite,
    removeFavorite,
    refreshFavorites: getFavoriteMeals,
  };
};

export default useFavorites;
