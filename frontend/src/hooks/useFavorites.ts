import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import {
  getFavoriteMeals,
  addToFavorites,
  removeFromFavorites,
  type Favorite,
} from "@/lib/favorites";
import { Meal } from "@/lib/constants";

// Query keys
export const favoriteKeys = {
  all: ["favorites"] as const,
  user: (userId: string) => [...favoriteKeys.all, "user", userId] as const,
};

// Hook to get favorite meals for a user
export const useFavoriteMeals = (userId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: favoriteKeys.user(userId),
    queryFn: () => getFavoriteMeals(getToken, userId),
    enabled: !!getToken && !!userId,
  });
};

// Hook to add a meal to favorites
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: ({ userId, meal }: { userId: string; meal: Meal }) =>
      addToFavorites(getToken, userId, meal),
    onSuccess: (data, variables) => {
      // Invalidate and refetch favorites
      queryClient.invalidateQueries({
        queryKey: favoriteKeys.user(variables.userId),
      });

      // Update the cache with the new favorite
      queryClient.setQueryData(
        favoriteKeys.user(variables.userId),
        (oldData: Favorite[] | undefined) => {
          if (!oldData) return [data];
          return [data, ...oldData];
        },
      );

      toast.success("Meal added to favorites");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to add to favorites");
    },
  });
};

// Hook to remove a meal from favorites
export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: ({
      favoriteId,
      // @ts-ignore
      userId,
    }: {
      favoriteId: string;
      userId: string;
    }) => removeFromFavorites(getToken, favoriteId),
    onSuccess: (_, variables) => {
      // Invalidate and refetch favorites
      queryClient.invalidateQueries({
        queryKey: favoriteKeys.user(variables.userId),
      });

      // Update the cache by removing the favorite
      queryClient.setQueryData(
        favoriteKeys.user(variables.userId),
        (oldData: Favorite[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((fav) => fav._id !== variables.favoriteId);
        },
      );

      toast.success("Meal removed from favorites");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "Failed to remove from favorites",
      );
    },
  });
};
