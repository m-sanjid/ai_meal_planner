import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import {
  getCalorieEntries,
  addMeal,
  deleteMeal,
  updateDailyGoal,
  getNutritionSummary,
  type AddMealData,
  type UpdateDailyGoalData,
  type CalorieEntry,
} from "@/lib/calorie";

// Query keys
export const calorieKeys = {
  all: ["calorie"] as const,
  entries: (date?: string) => [...calorieKeys.all, "entries", date] as const,
  summary: (startDate?: string, endDate?: string) =>
    [...calorieKeys.all, "summary", startDate, endDate] as const,
};

// Hook to get calorie entries
export const useCalorieEntries = (date?: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: calorieKeys.entries(date),
    queryFn: () => getCalorieEntries(getToken, date),
    enabled: !!getToken,
  });
};

// Hook to get nutrition summary
export const useNutritionSummary = (startDate?: string, endDate?: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: calorieKeys.summary(startDate, endDate),
    queryFn: () => getNutritionSummary(getToken, startDate, endDate),
    enabled: !!getToken,
  });
};

// Hook to add a meal
export const useAddMeal = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (mealData: AddMealData) => addMeal(getToken, mealData),
    onSuccess: (data) => {
      // Invalidate and refetch calorie entries
      queryClient.invalidateQueries({ queryKey: calorieKeys.entries() });
      queryClient.invalidateQueries({ queryKey: calorieKeys.summary() });

      // Update the cache with the new entry
      const date = new Date(data.date).toISOString().split("T")[0];
      queryClient.setQueryData(
        calorieKeys.entries(date),
        (oldData: CalorieEntry[] | undefined) => {
          if (!oldData) return [data];

          const existingIndex = oldData.findIndex(
            (entry) => entry._id === data._id,
          );
          if (existingIndex >= 0) {
            const updated = [...oldData];
            updated[existingIndex] = data;
            return updated;
          }
          return [data, ...oldData];
        },
      );

      toast.success("Meal added successfully");
    },
    onError: (error: any) => {
      console.error("Error adding meal:", error);
      toast.error(error.response?.data?.error || "Failed to add meal");
    },
  });
};

// Hook to delete a meal
export const useDeleteMeal = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: ({ entryId, mealId }: { entryId: string; mealId: string }) =>
      deleteMeal(getToken, entryId, mealId),
    onSuccess: (data) => {
      // Invalidate and refetch calorie entries
      queryClient.invalidateQueries({ queryKey: calorieKeys.entries() });
      queryClient.invalidateQueries({ queryKey: calorieKeys.summary() });

      // Update the cache with the updated entry
      const date = new Date(data.date).toISOString().split("T")[0];
      queryClient.setQueryData(
        calorieKeys.entries(date),
        (oldData: CalorieEntry[] | undefined) => {
          if (!oldData) return [data];

          const existingIndex = oldData.findIndex(
            (entry) => entry._id === data._id,
          );
          if (existingIndex >= 0) {
            const updated = [...oldData];
            updated[existingIndex] = data;
            return updated;
          }
          return [data, ...oldData];
        },
      );

      toast.success("Meal removed");
    },
    onError: (error: any) => {
      console.error("Error deleting meal:", error);
      toast.error(error.response?.data?.error || "Failed to delete meal");
    },
  });
};

// Hook to update daily goal
export const useUpdateDailyGoal = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (goalData: UpdateDailyGoalData) =>
      updateDailyGoal(getToken, goalData),
    onSuccess: (data) => {
      // Invalidate and refetch calorie entries
      queryClient.invalidateQueries({ queryKey: calorieKeys.entries() });

      // Update the cache with the updated entry
      const date = new Date(data.date).toISOString().split("T")[0];
      queryClient.setQueryData(
        calorieKeys.entries(date),
        (oldData: CalorieEntry[] | undefined) => {
          if (!oldData) return [data];

          const existingIndex = oldData.findIndex(
            (entry) => entry._id === data._id,
          );
          if (existingIndex >= 0) {
            const updated = [...oldData];
            updated[existingIndex] = data;
            return updated;
          }
          return [data, ...oldData];
        },
      );

      toast.success("Daily goal updated");
    },
    onError: (error: any) => {
      console.error("Error updating daily goal:", error);
      toast.error(error.response?.data?.error || "Failed to update daily goal");
    },
  });
};
