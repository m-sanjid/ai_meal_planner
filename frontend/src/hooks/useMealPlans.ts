import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import {
  getMealPlans,
  getUserMealPlans,
  generateMealPlan,
  deleteMealPlan,
  type MealPlan,
} from "@/lib/mealPlans";

// Query keys
export const mealPlanKeys = {
  all: ["mealPlans"] as const,
  user: (userId: string) => [...mealPlanKeys.all, "user", userId] as const,
  list: () => [...mealPlanKeys.all, "list"] as const,
};

// Hook to get all meal plans
export const useMealPlans = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: mealPlanKeys.list(),
    queryFn: () => getMealPlans(getToken),
    enabled: !!getToken,
  });
};

// Hook to get meal plans for a specific user
export const useUserMealPlans = (userId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: mealPlanKeys.user(userId),
    queryFn: () => getUserMealPlans(getToken, userId),
    enabled: !!getToken && !!userId,
  });
};

// Hook to generate a new meal plan
export const useGenerateMealPlan = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (data: {
      goal: string;
      dietaryPreferences: string;
      userId: string;
      mealCount?: number;
      calorieTarget?: number;
      additionalNotes?: string;
      excludeIngredients?: string[];
      cookingTime?: string;
    }) => generateMealPlan(getToken, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch meal plans
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.list() });
      queryClient.invalidateQueries({
        queryKey: mealPlanKeys.user(variables.userId),
      });

      // Update the cache with the new meal plan
      queryClient.setQueryData(
        mealPlanKeys.list(),
        (oldData: MealPlan[] | undefined) => {
          if (!oldData) return [data];
          return [data, ...oldData];
        },
      );

      queryClient.setQueryData(
        mealPlanKeys.user(variables.userId),
        (oldData: MealPlan[] | undefined) => {
          if (!oldData) return [data];
          return [data, ...oldData];
        },
      );

      toast.success("Meal plan generated successfully!");
    },
    onError: (error: any) => {
      console.error("Error generating meal plan:", error);
      toast.error(
        error.response?.data?.error || "Failed to generate meal plan",
      );
    },
  });
};

// Hook to delete a meal plan
export const useDeleteMealPlan = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: ({
      mealPlanId,
      // @ts-ignore
      userId,
    }: {
      mealPlanId: string;
      userId: string;
    }) => deleteMealPlan(getToken, mealPlanId),
    onSuccess: (_, variables) => {
      // Invalidate and refetch meal plans
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.list() });
      queryClient.invalidateQueries({
        queryKey: mealPlanKeys.user(variables.userId),
      });

      // Update the cache by removing the meal plan
      queryClient.setQueryData(
        mealPlanKeys.list(),
        (oldData: MealPlan[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((plan) => plan._id !== variables.mealPlanId);
        },
      );

      queryClient.setQueryData(
        mealPlanKeys.user(variables.userId),
        (oldData: MealPlan[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((plan) => plan._id !== variables.mealPlanId);
        },
      );

      toast.success("Meal plan deleted successfully");
    },
    onError: (error: any) => {
      console.error("Error deleting meal plan:", error);
      toast.error(error.response?.data?.error || "Failed to delete meal plan");
    },
  });
};
