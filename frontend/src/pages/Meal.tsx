import { useState, useEffect } from "react";
import axios from "axios";
import Options from "@/components/Options";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Star,
  Loader2,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Utensils,
  Bookmark,
  StarOff,
  List,
  ClipboardList,
  Tags,
  Target,
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import LoadingSkeleton from "@/components/meal/LoadingSkeleton";
import HelpSheet from "@/components/meal/HelpSheet";
import UpgradeToPro from "@/components/UpgradeToPro";

interface Meal {
  id?: string;
  name: string;
  calories: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
  ingredients: string[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: string;
  tags?: string[];
  isFavorite?: boolean;
}

const Meal = () => {
  const [goal, setGoal] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [mealCount, setMealCount] = useState(2);
  const [calorieTarget, setCalorieTarget] = useState(2000);
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavoriteMeals(response.data.favoriteMeals || []);
    } catch (error) {
      console.error("Error fetching favorite meals", error);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-card rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-6">
            You need to be signed in to access meal planning features.
          </p>
          <Button className="w-full">Sign In to Continue</Button>
        </div>
      </div>
    );
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
        }
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
          : "Failed to generate meal plan. Please try again."
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the meals array to mark this meal as favorite
      if (meals) {
        setMeals(
          meals.map((m) => (m.id === meal.id ? { ...m, isFavorite: true } : m))
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

  const toggleExpandMeal = (mealId: string) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
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
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (meal.tags &&
          meal.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Smart <span className="text-black dark:text-white">Meal Planner</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate personalized meal plans based on your goals, preferences,
            and dietary needs
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm rounded-xl p-8 shadow-sm mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <div className="flex justify-between items-center">
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
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1200</span>
                  <span>2500</span>
                  <span>4000</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
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
                <div className="flex justify-between text-xs text-muted-foreground">
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
                      <p className="text-sm text-muted-foreground">
                        Separate with commas
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cookingTime">Cooking Time</Label>
                      <RadioGroup
                        id="cookingTime"
                        value={cookingTime}
                        onValueChange={(
                          value: "any" | "quick" | "medium" | "slow"
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

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              disabled={!goal || !dietaryPreferences || loading}
              onClick={generateMealPlan}
              className={cn(
                "w-full sm:w-auto",
                loading && "opacity-50 cursor-not-allowed"
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
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Upgrade to Pro
              </Button>
            )}
          </div>

          {tokens !== undefined && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              You have {tokens} tokens remaining
            </p>
          )}
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-destructive/10 text-destructive p-4 rounded-lg mb-8"
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">Your Meal Plan</h2>
                  <Input
                    value={mealPlanName}
                    onChange={(e) => setMealPlanName(e.target.value)}
                    className="max-w-xs text-lg font-medium border-0 focus-visible:ring-0 p-0 h-auto focus-visible:bg-muted"
                  />
                </div>
                <p className="text-muted-foreground">
                  {meals.length} meals • {calorieTarget} kcal target •{" "}
                  {dietaryPreferences}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search meals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getFilteredMeals().map((meal, index) => (
                <motion.div
                  key={meal.id || index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                    <CardHeader className="bg-muted/40 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">
                          {meal.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => saveFavoriteMeal(meal)}
                                className={cn(
                                  "hover:bg-primary/10 transition-colors",
                                  meal.isFavorite && "text-primary"
                                )}
                              >
                                <Star
                                  className={cn(
                                    "h-4 w-4 transition-transform",
                                    meal.isFavorite && "scale-110"
                                  )}
                                  fill={
                                    meal.isFavorite ? "currentColor" : "none"
                                  }
                                />
                              </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {meal.tags?.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-background/50 hover:bg-primary/10 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Prep: {meal.prepTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                            <span>Cook: {meal.cookTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Serves: {meal.servings}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Calories
                            </span>
                            <span className="font-medium">
                              {meal.calories} kcal
                            </span>
                          </div>
                          <Progress
                            value={(meal.calories / calorieTarget) * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <p className="text-sm text-muted-foreground">
                              Protein
                            </p>
                            <p className="font-semibold">
                              {meal.macros.protein}g
                            </p>
                            {showNutritionDetails && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {Math.round(
                                  ((meal.macros.protein * 4) / meal.calories) *
                                    100
                                )}
                                % of calories
                              </p>
                            )}
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <p className="text-sm text-muted-foreground">Fat</p>
                            <p className="font-semibold">{meal.macros.fat}g</p>
                            {showNutritionDetails && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {Math.round(
                                  ((meal.macros.fat * 9) / meal.calories) * 100
                                )}
                                % of calories
                              </p>
                            )}
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <p className="text-sm text-muted-foreground">
                              Carbs
                            </p>
                            <p className="font-semibold">
                              {meal.macros.carbs}g
                            </p>
                            {showNutritionDetails && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {Math.round(
                                  ((meal.macros.carbs * 4) / meal.calories) *
                                    100
                                )}
                                % of calories
                              </p>
                            )}
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="ingredients">
                            <AccordionTrigger className="text-base font-medium py-2">
                              Ingredients
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {meal.ingredients.map((ingredient, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm flex items-center group"
                                  >
                                    <span className="mr-2 text-primary">•</span>
                                    {ingredient}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="instructions">
                            <AccordionTrigger className="text-base font-medium py-2">
                              Instructions
                            </AccordionTrigger>
                            <AccordionContent>
                              <ol className="space-y-2 list-decimal list-inside">
                                {meal.instructions?.map((instruction, idx) => (
                                  <li key={idx} className="text-sm">
                                    {instruction}
                                  </li>
                                ))}
                              </ol>
                            </AccordionContent>
                          </AccordionItem>

                          {showNutritionDetails && (
                            <AccordionItem value="nutrition">
                              <AccordionTrigger className="text-base font-medium py-2">
                                Detailed Nutrition
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Total Calories:</span>
                                      <span className="font-medium">
                                        {meal.calories} kcal
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Protein:</span>
                                      <span className="font-medium">
                                        {meal.macros.protein}g (
                                        {Math.round(
                                          ((meal.macros.protein * 4) /
                                            meal.calories) *
                                            100
                                        )}
                                        %)
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Carbohydrates:</span>
                                      <span className="font-medium">
                                        {meal.macros.carbs}g (
                                        {Math.round(
                                          ((meal.macros.carbs * 4) /
                                            meal.calories) *
                                            100
                                        )}
                                        %)
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Fat:</span>
                                      <span className="font-medium">
                                        {meal.macros.fat}g (
                                        {Math.round(
                                          ((meal.macros.fat * 9) /
                                            meal.calories) *
                                            100
                                        )}
                                        %)
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Fiber (est.):</span>
                                      <span className="font-medium">
                                        {Math.round(meal.macros.carbs * 0.15)}g
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Sugar (est.):</span>
                                      <span className="font-medium">
                                        {Math.round(meal.macros.carbs * 0.25)}g
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Saturated Fat (est.):</span>
                                      <span className="font-medium">
                                        {Math.round(meal.macros.fat * 0.3)}g
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Sodium (est.):</span>
                                      <span className="font-medium">
                                        {meal.calories * 0.5}mg
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                        </Accordion>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/10 flex justify-between items-center p-4">
                      <span className="text-sm font-medium">
                        {meal.difficulty}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpandMeal(meal.id!)}
                      >
                        {expandedMealId === meal.id ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" /> Collapse
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" /> Details
                          </>
                        )}
                      </Button>
                    </CardFooter>

                    <AnimatePresence>
                      {expandedMealId === meal.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 border-t">
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-lg font-medium mb-3">
                                  Cooking Instructions
                                </h3>
                                <ol className="space-y-3 list-decimal list-inside">
                                  {meal.instructions?.map(
                                    (instruction, idx) => (
                                      <li key={idx} className="text-sm">
                                        {instruction}
                                      </li>
                                    )
                                  )}
                                </ol>
                              </div>

                              <div>
                                <h3 className="text-lg font-medium mb-3">
                                  Health Benefits
                                </h3>
                                <ul className="space-y-2">
                                  <li className="text-sm flex items-start">
                                    <span className="mr-2 text-primary">•</span>
                                    Rich in essential nutrients and vitamins
                                  </li>
                                  <li className="text-sm flex items-start">
                                    <span className="mr-2 text-primary">•</span>
                                    Balanced macronutrient profile to support
                                    your {goal.toLowerCase()} goals
                                  </li>
                                  <li className="text-sm flex items-start">
                                    <span className="mr-2 text-primary">•</span>
                                    Contains antioxidants and anti-inflammatory
                                    compounds
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Time</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Prep: {selectedMeal?.prepTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cook: {selectedMeal?.cookTime}
                    </p>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Nutrition</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Calories: {selectedMeal?.calories} kcal
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Servings: {selectedMeal?.servings}
                    </p>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Macros</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Protein: {selectedMeal?.macros.protein}g
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Carbs: {selectedMeal?.macros.carbs}g
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fat: {selectedMeal?.macros.fat}g
                    </p>
                  </div>
                </Card>
              </div>

              {/* Ingredients */}
              {selectedMeal?.ingredients &&
                selectedMeal.ingredients.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <List className="h-5 w-5 text-primary" />
                      Ingredients
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedMeal.ingredients.map((ingredient, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
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
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      Instructions
                    </h3>
                    <div className="space-y-3">
                      {selectedMeal.instructions.map((instruction, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
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
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Tags className="h-5 w-5 text-primary" />
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
                    : "bg-primary hover:bg-primary/90"
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
