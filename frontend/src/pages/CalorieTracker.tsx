import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import MealPreview from "@/components/MealPreview";
import { useFavorites } from "@/lib/favorites";
import { useAuth, useUser } from "@clerk/clerk-react";
import Unauthorized from "./Unauthorized";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

const CalorieTracker = () => {
  const { user ,isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const progress = (totalCalories / dailyGoal) * 100;

  const favorites = useFavorites({
    userId: user?.id!,
    token: token ?? "",
  });

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
      toast.error("Please fill in at least the meal name and calories");
      return;
    }

    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      calories: Number(newMeal.calories),
      protein: Number(newMeal.protein) || 0,
      carbs: Number(newMeal.carbs) || 0,
      fat: Number(newMeal.fat) || 0,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMeals([...meals, meal]);
    setNewMeal({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });
    setShowAddMeal(false);
    toast.success("Meal added successfully");
  };

  const handleAddFromFavorite = (meal: Meal) => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein || 0,
      carbs: meal.carbs || 0,
      fat: meal.fat || 0,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMeals([...meals, newMeal]);
    toast.success("Meal added from favorites");
  };

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id));
    toast.success("Meal removed");
  };

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isSignedIn) {
    return <Unauthorized />;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Calorie Tracker</h1>
              <p className="text-muted-foreground">
                Track your daily nutrition
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={() => setShowAddMeal(!showAddMeal)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Meal
              </Button>
            </motion.div>
          </div>

          {/* Progress Card */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Calories</p>
                      <p className="text-2xl font-semibold">
                        {totalCalories} / {dailyGoal} kcal
                      </p>
                    </div>
                    <div className="w-48">
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Protein</p>
                      <p className="font-semibold">{totalProtein}g</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Carbs</p>
                      <p className="font-semibold">{totalCarbs}g</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Fat</p>
                      <p className="font-semibold">{totalFat}g</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Add Meal Form */}
          {showAddMeal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card border border-border rounded-lg p-4 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Add New Meal</h2>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddMeal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Meal Name</Label>
                  <Input
                    id="name"
                    value={newMeal.name}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, name: e.target.value })
                    }
                    placeholder="e.g., Chicken Salad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, calories: e.target.value })
                    }
                    placeholder="e.g., 500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, protein: e.target.value })
                    }
                    placeholder="e.g., 30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, carbs: e.target.value })
                    }
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, fat: e.target.value })
                    }
                    placeholder="e.g., 20"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleAddMeal}>Add Meal</Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Favorites Section */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle>Add from Favorites</CardTitle>
              </CardHeader>
              <CardContent>
                <MealPreview onClick={handleAddFromFavorite} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Meals List */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-4">
              {filteredMeals.map((meal) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-card border border-border rounded-lg p-4 transition-all duration-200"
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
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Calories</p>
                      <p className="font-semibold">{meal.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Protein</p>
                      <p className="font-semibold">{meal.protein}g</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Carbs</p>
                      <p className="font-semibold">{meal.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Fat</p>
                      <p className="font-semibold">{meal.fat}g</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalorieTracker;
