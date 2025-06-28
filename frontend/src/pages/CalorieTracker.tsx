"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import MealPreview from "@/components/MealPreview";
import { useUser } from "@clerk/clerk-react";
import Unauthorized from "./Unauthorized";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import UpgradeToPro from "@/components/UpgradeToPro";
import { useSubscription } from "@/context/SubscriptionContext";
import { Helmet } from "react-helmet-async";
import {
  useCalorieEntries,
  useAddMeal,
  useDeleteMeal,
  useUpdateDailyGoal,
} from "@/hooks/useCalorieTracking";
import { format } from "date-fns";

const CalorieTracker = () => {
  const { user, isSignedIn } = useUser();
  const { isPro } = useSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });
  const [dailyGoal, setDailyGoal] = useState(2000);

  // TanStack Query hooks
  const {
    data: calorieEntries,
    isLoading,
    error,
  } = useCalorieEntries(selectedDate);
  const addMealMutation = useAddMeal();
  const deleteMealMutation = useDeleteMeal();
  const updateDailyGoalMutation = useUpdateDailyGoal();

  // Get today's entry or create empty data
  const todayEntry = useMemo(() => {
    if (!calorieEntries || calorieEntries.length === 0) {
      return {
        _id: "",
        userId: user?.id || "",
        date: selectedDate,
        meals: [],
        dailyGoal: dailyGoal,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    return calorieEntries[0];
  }, [calorieEntries, selectedDate, dailyGoal, user?.id]);

  const meals = todayEntry.meals || [];
  const currentDailyGoal = todayEntry.dailyGoal || dailyGoal;

  // Calculate totals
  const totals = useMemo(() => {
    return meals.reduce(
      (acc, meal) => {
        acc.calories += Number.isFinite(meal.calories) ? meal.calories : 0;
        acc.protein += Number.isFinite(meal.protein) ? meal.protein : 0;
        acc.carbs += Number.isFinite(meal.carbs) ? meal.carbs : 0;
        acc.fat += Number.isFinite(meal.fat) ? meal.fat : 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }, [meals]);

  const progress =
    currentDailyGoal > 0
      ? Math.min((totals.calories / currentDailyGoal) * 100, 100)
      : 0;

  const filteredMeals = useMemo(
    () =>
      meals.filter((meal) =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [meals, searchQuery],
  );

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
      toast.error("Please fill in at least the meal name and calories");
      return;
    }

    const mealData = {
      name: newMeal.name.trim(),
      calories: parseFloat(newMeal.calories) || 0,
      protein: parseFloat(newMeal.protein) || 0,
      carbs: parseFloat(newMeal.carbs) || 0,
      fat: parseFloat(newMeal.fat) || 0,
      date: selectedDate,
    };

    addMealMutation.mutate(mealData);
    setNewMeal({ name: "", calories: "", protein: "", carbs: "", fat: "" });
    setShowAddMeal(false);
  };

  const handleAddFromFavorite = (meal: any) => {
    const mealData = {
      name: meal.name,
      calories: meal.calories || 0,
      protein: meal.macros?.protein || 0,
      carbs: meal.macros?.carbs || 0,
      fat: meal.macros?.fat || 0,
      date: selectedDate,
    };

    addMealMutation.mutate(mealData);
  };

  const handleDeleteMeal = (mealId: string) => {
    if (todayEntry._id) {
      deleteMealMutation.mutate({ entryId: todayEntry._id, mealId });
    }
  };

  const handleUpdateDailyGoal = () => {
    updateDailyGoalMutation.mutate({
      dailyGoal: dailyGoal,
      date: selectedDate,
    });
  };

  if (!isSignedIn) return <Unauthorized />;
  if (!isPro)
    return (
      <PageLayout>
        <div className="space-y-8 py-20 text-center">
          <h2 className="text-2xl font-bold">Available for Pro Users Only</h2>
          <UpgradeToPro />
        </div>
      </PageLayout>
    );

  return (
    <>
      <Helmet>
        <title>Calorie Tracker | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="Track your daily calories and macros with BefitAI's Calorie Tracker. Add meals, monitor progress, and reach your nutrition goals."
        />
      </Helmet>
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <PageHeader user={user} title="Calorie Tracker" Cta="Add Meal" />
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button onClick={() => setShowAddMeal(true)}>Add Meal</Button>
            </div>
          </div>

          {/* Date Selector */}
          <div className="flex items-center gap-4">
            <Label htmlFor="date">Date:</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            <span className="text-muted-foreground text-sm">
              {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
            </span>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-border bg-card space-y-4 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Daily Goal Settings</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dailyGoal">Daily Calorie Goal:</Label>
                    <Input
                      id="dailyGoal"
                      type="number"
                      value={dailyGoal}
                      onChange={(e) =>
                        setDailyGoal(parseInt(e.target.value) || 2000)
                      }
                      placeholder="2000"
                    />
                  </div>
                  <Button
                    onClick={handleUpdateDailyGoal}
                    disabled={updateDailyGoalMutation.isPending}
                  >
                    {updateDailyGoalMutation.isPending
                      ? "Updating..."
                      : "Update Goal"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress */}
          <MotionCard title="Daily Progress">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Calories</p>
                  <motion.p
                    key={totals.calories}
                    initial={{ opacity: 0.6, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-semibold"
                  >
                    {totals.calories} / {currentDailyGoal} kcal
                  </motion.p>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="h-2 w-48 overflow-hidden rounded-full bg-neutral-200 dark:bg-zinc-800"
                >
                  <div className="bg-primary h-full" />
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["Protein", "Carbs", "Fat"].map((label, i) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-sm">{label}</p>
                    <p className="font-semibold">
                      {[totals.protein, totals.carbs, totals.fat][i]}g
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionCard>

          {/* Add Meal Form */}
          <AnimatePresence>
            {showAddMeal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-border bg-card space-y-4 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Add New Meal</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddMeal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["name", "calories", "protein", "carbs", "fat"].map(
                    (field) => (
                      <div key={field} className="space-y-2">
                        <Label htmlFor={field}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Label>
                        <Input
                          id={field}
                          type={field === "name" ? "text" : "number"}
                          value={newMeal[field as keyof typeof newMeal]}
                          onChange={(e) =>
                            setNewMeal((prev) => ({
                              ...prev,
                              [field]: e.target.value,
                            }))
                          }
                          placeholder={`e.g., ${
                            field === "name" ? "Chicken Salad" : "50"
                          }`}
                        />
                      </div>
                    ),
                  )}
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddMeal}
                    disabled={addMealMutation.isPending}
                  >
                    {addMealMutation.isPending ? "Adding..." : "Add Meal"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Favorites */}
          <MotionCard title="Add from Favorites">
            <MealPreview onClick={handleAddFromFavorite} />
          </MotionCard>

          {/* Search */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-border bg-card animate-pulse space-y-2 rounded-lg border p-4"
                >
                  <div className="bg-muted h-4 w-1/3 rounded" />
                  <div className="bg-muted h-3 w-1/4 rounded" />
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="bg-muted h-8 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="border-border bg-destructive/10 text-destructive rounded-lg border p-4 text-center">
              Failed to load calorie data. Please try again.
            </div>
          )}

          {/* Meals List */}
          {!isLoading && !error && (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredMeals.map((meal) => (
                  <motion.div
                    layout
                    key={meal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="border-border bg-card space-y-2 rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{meal.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {meal.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMeal(meal.id)}
                        disabled={deleteMealMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {["Calories", "Protein", "Carbs", "Fat"].map(
                        (label, i) => (
                          <div key={label}>
                            <p className="text-muted-foreground text-sm">
                              {label}
                            </p>
                            <p className="font-semibold">
                              {
                                [
                                  meal.calories,
                                  meal.protein,
                                  meal.carbs,
                                  meal.fat,
                                ][i]
                              }
                              {label === "Calories" ? " kcal" : "g"}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredMeals.length === 0 && !isLoading && (
                <div className="text-muted-foreground py-8 text-center">
                  {searchQuery
                    ? "No meals found matching your search."
                    : "No meals added yet. Add your first meal!"}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
};

const MotionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    className="transition-shadow hover:shadow-md"
  >
    <Card className="border-border bg-card border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  </motion.div>
);

export default CalorieTracker;
