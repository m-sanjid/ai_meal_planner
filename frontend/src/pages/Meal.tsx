import { useState, useEffect } from "react";
import axios from "axios";
import Options from "@/components/Options";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Star,
  Loader2,
  Filter,
  Utensils,
  Bookmark,
  StarOff,
  List,
  ClipboardList,
  Tags,
  Target,
  Clock,
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import LoadingSkeleton from "@/components/meal/LoadingSkeleton";
import HelpSheet from "@/components/meal/HelpSheet";
import UpgradeToPro from "@/components/UpgradeToPro";
import Unauthorized from "./Unauthorized";
import { IconPencil } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import MealCard, { type Meal } from "@/components/MealCard";

const Meal = () => {
  const [goal, setGoal] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [mealCount, setMealCount] = useState(2);
  const [calorieTarget, setCalorieTarget] = useState(2000);
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState<
    "any" | "quick" | "medium" | "slow"
  >("any");
  const [mealPlanName, setMealPlanName] = useState("My Meal Plan");
  const [savedMealPlans, setSavedMealPlans] = useState<
    { name: string; meals: Meal[] }[]
  >([]);
  const [showNutritionDetails, setShowNutritionDetails] = useState(false);
  const [showMealDetails, setShowMealDetails] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { tokens, isPro } = useSubscription();

  // Fetch favorite meals on component mount
  useEffect(() => {
    if (isSignedIn && user) {
      fetchFavoriteMeals();
    }
  }, [isSignedIn, user]);

  const fetchFavoriteMeals = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/meals/favorites?userId=${
          user?.id
        }`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setFavoriteMeals(response.data.favoriteMeals || []);
    } catch (error) {
      console.error("Error fetching favorite meals", error);
    }
  };

  if (!isSignedIn) {
    return <Unauthorized />;
  }

  const generateMealPlan = async () => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMeals(null);

      const token = await getToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/meals/generate`,
        {
          goal,
          dietaryPreferences,
          userId: user.id,
          mealCount,
          calorieTarget,
          additionalNotes,
          excludeIngredients: excludeIngredients
            .split(",")
            .map((item) => item.trim()),
          cookingTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.data?.meals?.length) {
        throw new Error("AI did not return a valid meal plan.");
      }

      // Add unique IDs to meals
      const mealsWithIds = response.data.meals.map((meal: Meal) => ({
        ...meal,
        id: `meal-${Math.random().toString(36).substr(2, 9)}`,
        instructions: meal.instructions || generateMockInstructions(),
        prepTime: meal.prepTime || getRandomTime(),
        cookTime: meal.cookTime || getRandomTime(),
        servings: meal.servings || Math.floor(Math.random() * 4) + 2,
        difficulty: meal.difficulty || getRandomDifficulty(),
        tags: meal.tags || generateRandomTags(),
        isFavorite: false,
      }));

      setMeals(mealsWithIds);
      toast.success("Meal plan generated successfully!");
    } catch (err) {
      console.error("Error generating meal plan:", err);
      setError(
        tokens === 0
          ? "No more tokens available. Upgrade to pro to continue."
          : "Failed to generate meal plan. Please try again.",
      );
      toast.error("Failed to generate meal plan");
    } finally {
      setLoading(false);
    }
  };

  const saveFavoriteMeal = async (meal: Meal) => {
    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/meals/favorites`,
        { userId: user?.id, meal },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Update the meals array to mark this meal as favorite
      if (meals) {
        setMeals(
          meals.map((m) => (m.name === meal.name ? { ...m, isFavorite: true } : m)),
        );
      }

      // Add to favorites list
      setFavoriteMeals([...favoriteMeals, { ...meal, isFavorite: true }]);
      toast.success("Meal added to favorites");
    } catch (error) {
      console.error("Error saving favorite meal", error);
      toast.error("Failed to save meal to favorites");
    }
  };

  const saveMealPlan = () => {
    if (!meals || meals.length === 0) {
      toast.error("No meals to save");
      return;
    }

    const newPlan = {
      name: mealPlanName,
      meals: meals,
    };

    setSavedMealPlans([...savedMealPlans, newPlan]);
    toast.success("Meal plan saved successfully!");
  };

  // Helper functions to generate mock data
  const generateMockInstructions = () => {
    return [
      "Prepare all ingredients as listed.",
      "Heat a large pan over medium heat.",
      "Cook the main protein until done.",
      "Add vegetables and seasonings.",
      "Simmer until flavors combine.",
      "Serve hot and enjoy!",
    ];
  };

  const getRandomTime = () => {
    const times = ["10 min", "15 min", "20 min", "25 min", "30 min", "45 min"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const getRandomDifficulty = () => {
    const difficulties = ["Easy", "Medium", "Hard"];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  };

  const generateRandomTags = () => {
    const allTags = [
      "High Protein",
      "Low Carb",
      "Gluten Free",
      "Quick",
      "Budget Friendly",
      "Vegetarian",
      "Vegan",
      "Keto",
    ];
    return allTags.filter(() => Math.random() > 0.7);
  };

  const getFilteredMeals = () => {
    if (!meals) return [];
    if (!searchQuery) return meals;

    return meals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        (meal.tags &&
          meal.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          )),
    );
  };

  return (
    <div className="from-background to-muted/20 min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold">
            Smart{" "}
            <span className="text-black dark:text-white">Meal Planner</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Generate personalized meal plans based on your goals, preferences,
            and dietary needs
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 mb-8 rounded-xl p-8 shadow-sm backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="goal" className="text-sm font-medium">
                  Select your goal:
                </Label>
                <Options type="" onChange={(value) => setGoal(value)} />
              </div>

              <div className="space-y-3">
                <Label htmlFor="diet" className="text-sm font-medium">
                  Select your diet:
                </Label>
                <Options
                  type="diet"
                  onChange={(value) => setDietaryPreferences(value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="calories" className="text-sm font-medium">
                    Daily Calorie Target: {calorieTarget} kcal
                  </Label>
                </div>
                <Slider
                  id="calories"
                  min={1200}
                  max={4000}
                  step={100}
                  value={[calorieTarget]}
                  onValueChange={(value) => setCalorieTarget(value[0])}
                  className="w-full"
                />
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>1200</span>
                  <span>2500</span>
                  <span>4000</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mealCount" className="text-sm font-medium">
                    Number of Meals: {mealCount}
                  </Label>
                </div>
                <Slider
                  id="mealCount"
                  min={1}
                  max={6}
                  step={1}
                  value={[mealCount]}
                  onValueChange={(value) => setMealCount(value[0])}
                  className="w-full"
                />
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                </div>
              </div>

              {/* Advanced Options */}
              <Dialog
                open={filterDialogOpen}
                onOpenChange={setFilterDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" /> Advanced Options
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Advanced Meal Options</DialogTitle>
                    <DialogDescription>
                      Customize your meal plan with more specific preferences.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="excludeIngredients">
                        Exclude Ingredients
                      </Label>
                      <Input
                        id="excludeIngredients"
                        placeholder="e.g. nuts, shellfish, dairy"
                        value={excludeIngredients}
                        onChange={(e) => setExcludeIngredients(e.target.value)}
                      />
                      <p className="text-muted-foreground text-sm">
                        Separate with commas
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cookingTime">Cooking Time</Label>
                      <RadioGroup
                        id="cookingTime"
                        value={cookingTime}
                        onValueChange={(
                          value: "any" | "quick" | "medium" | "slow",
                        ) => setCookingTime(value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="any" />
                          <Label htmlFor="any">Any time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quick" id="quick" />
                          <Label htmlFor="quick">Quick (under 20 min)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">Medium (20-40 min)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="slow" id="slow" />
                          <Label htmlFor="slow">Slow (over 40 min)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                      <Textarea
                        id="additionalNotes"
                        placeholder="Any specific requests or preferences?"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setFilterDialogOpen(false)}>
                      Apply Filters
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="nutrition-details"
                    checked={showNutritionDetails}
                    onCheckedChange={setShowNutritionDetails}
                  />
                  <Label htmlFor="nutrition-details">
                    Show detailed nutrition facts
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              disabled={!goal || !dietaryPreferences || loading}
              onClick={generateMealPlan}
              className={cn(
                "w-full sm:w-auto",
                loading && "cursor-not-allowed opacity-50",
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Meal Plan"
              )}
            </Button>

            {!isPro && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link to="/pricing">Upgrade to Pro</Link>
              </Button>
            )}
          </div>

          {tokens !== undefined && (
            <p className="text-muted-foreground mt-4 text-center text-sm">
              You have {tokens} tokens remaining
            </p>
          )}
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-destructive/10 text-destructive mb-8 rounded-lg p-4"
          >
            {error}
          </motion.div>
        )}

        {loading && <LoadingSkeleton mealCount={mealCount} />}

        {meals && meals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-20">
                  <h2 className="text-xl font-semibold">Your Meal Plan</h2>
                  <div className="relative">
                    <IconPencil
                      strokeWidth={1}
                      className="absolute top-1/2 right-2 h-4 w-4 -translate-y-2"
                    />
                    <Input
                      value={mealPlanName}
                      onChange={(e) => setMealPlanName(e.target.value)}
                      className="focus-visible:bg-muted text-muted-foreground focus:text-primary h-auto max-w-xs border px-4 py-2 font-medium focus-visible:ring-0"
                    />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {meals.length} meals • {calorieTarget} kcal target •{" "}
                  {dietaryPreferences}
                </p>
              </div>

              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Search meals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
              {getFilteredMeals().map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mx-auto"
                >
                  <MealCard
                    meal={meal}
                    saveFavoriteMeal={saveFavoriteMeal}
                    setSelectedMeal={setSelectedMeal}
                    setShowMealDetails={setShowMealDetails}
                    calorieTarget={calorieTarget}
                    showNutritionDetails={showNutritionDetails}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button onClick={saveMealPlan} className="mr-4">
                <Bookmark className="mr-2 h-4 w-4" /> Save Meal Plan
              </Button>
              <Button variant="outline" onClick={generateMealPlan}>
                <Utensils className="mr-2 h-4 w-4" /> Generate New Plan
              </Button>
            </div>
          </motion.div>
        )}

        {/* Upgrade to Pro Banner */}
        <UpgradeToPro />

        {/* Help Sheet */}
        <HelpSheet />

        {/* Meal Details Dialog */}
        <Dialog open={showMealDetails} onOpenChange={setShowMealDetails}>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedMeal?.name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Detailed meal information and instructions
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Meal Overview */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="p-4 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <Clock className="text-primary h-4 w-4" />
                    <span className="text-sm font-medium">Time</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Prep: {selectedMeal?.prepTime}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Cook: {selectedMeal?.cookTime}
                    </p>
                  </div>
                </Card>

                <Card className="p-4 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="text-primary h-4 w-4" />
                    <span className="text-sm font-medium">Nutrition</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Calories: {selectedMeal?.calories} kcal
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Servings: {selectedMeal?.servings}
                    </p>
                  </div>
                </Card>

                <Card className="p-4 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <Utensils className="text-primary h-4 w-4" />
                    <span className="text-sm font-medium">Macros</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Protein: {selectedMeal?.macros.protein}g
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Carbs: {selectedMeal?.macros.carbs}g
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Fat: {selectedMeal?.macros.fat}g
                    </p>
                  </div>
                </Card>
              </div>

              {/* Ingredients */}
              {selectedMeal?.ingredients &&
                selectedMeal.ingredients.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <List className="text-primary h-5 w-5" />
                      Ingredients
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {selectedMeal.ingredients.map((ingredient, idx) => (
                        <div
                          key={idx}
                          className="bg-muted/30 hover:bg-muted/50 flex items-center gap-2 rounded-lg p-3 transition-colors"
                        >
                          <span className="text-primary">•</span>
                          <span className="text-sm">{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Instructions */}
              {selectedMeal?.instructions &&
                selectedMeal.instructions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <ClipboardList className="text-primary h-5 w-5" />
                      Instructions
                    </h3>
                    <div className="space-y-3">
                      {selectedMeal.instructions.map((instruction, idx) => (
                        <div
                          key={idx}
                          className="bg-muted/30 hover:bg-muted/50 flex gap-3 rounded-lg p-4 transition-colors"
                        >
                          <div className="bg-primary/10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                            <span className="text-primary text-sm font-medium">
                              {idx + 1}
                            </span>
                          </div>
                          <p className="text-sm">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Tags */}
              {selectedMeal?.tags && selectedMeal.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Tags className="text-primary h-5 w-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeal.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-background/50 hover:bg-primary/10 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowMealDetails(false)}
                className="hover:bg-muted"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  saveFavoriteMeal(selectedMeal!);
                }}
                className={cn(
                  "gap-2",
                  selectedMeal?.isFavorite
                    ? "bg-destructive hover:bg-destructive/90"
                    : "bg-primary hover:bg-primary/90",
                )}
              >
                {selectedMeal?.isFavorite ? (
                  <>
                    <StarOff className="h-4 w-4" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4" />
                    Add to Favorites
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Meal;
