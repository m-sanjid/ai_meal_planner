import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import {
  Loader2,
  Utensils,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import LoadingSkeleton from "@/components/meal/LoadingSkeleton";
import HelpSheet from "@/components/meal/HelpSheet";
import Unauthorized from "./Unauthorized";
import MealCard, { type Meal } from "@/components/MealCard";
import { useGenerateMealPlan } from "@/hooks/useMealGeneration";
import { useAddToFavorites } from "@/hooks/useFavorites";
import Options from "@/components/Options";

const Meal = () => {
  const [goal, setGoal] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [mealCount, setMealCount] = useState(2);
  const [calorieTarget, setCalorieTarget] = useState(2000);
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState<
    "any" | "quick" | "medium" | "slow"
  >("any");
  const [mealPlanName] = useState("My Meal Plan");
  const [savedMealPlans, setSavedMealPlans] = useState<
    { name: string; meals: Meal[] }[]
  >([]);
  const [showNutritionDetails, setShowNutritionDetails] = useState(false);

  const { user, isSignedIn } = useUser();
  const { tokens } = useSubscription();

  const generateMealPlanMutation = useGenerateMealPlan();
  const addToFavoritesMutation = useAddToFavorites();

  if (!isSignedIn) return <Unauthorized />;

  const generateMealPlan = async () => {
    if (!user) return toast.error("User not authenticated");

    try {
      const response = await generateMealPlanMutation.mutateAsync({
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
      });

      setMeals(response.meals || response);
    } catch (err: any) {
      const errorMessage =
        tokens === 0
          ? "No more tokens available. Upgrade to pro to continue."
          : err.message || "Failed to generate meal plan. Please try again.";
      toast.error(errorMessage);
    }
  };

  const saveFavoriteMeal = (meal: Meal) => {
    if (user?.id) {
      addToFavoritesMutation.mutate({ userId: user.id, meal });
      if (meals) {
        setMeals(
          meals.map((m) =>
            m.name === meal.name ? { ...m, isFavorite: true } : m,
          ),
        );
      }
    }
  };

  const saveMealPlan = () => {
    if (!meals || meals.length === 0) return toast.error("No meals to save");
    setSavedMealPlans([...savedMealPlans, { name: mealPlanName, meals }]);
    toast.success("Meal plan saved locally!");
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-foreground mb-1 text-4xl font-bold">
            AI Meal Planner 🍽️
          </h1>
          <p className="text-muted-foreground text-base">
            Generate personalized meal plans tailored to your goals and taste.
          </p>
        </div>

        <Card className="p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Options type="goal" onChange={setGoal} />
            <Options type="diet" onChange={setDietaryPreferences} />

            <div>
              <Label htmlFor="mealCount">Number of Meals</Label>
              <Slider
                value={[mealCount]}
                onValueChange={([val]) => setMealCount(val)}
                max={5}
                min={1}
                step={1}
                className="mt-2"
              />
              <p className="text-muted-foreground mt-1 text-sm">
                {mealCount} meal{mealCount > 1 ? "s" : ""}
              </p>
            </div>

            <div>
              <Label htmlFor="calorieTarget">Daily Calorie Target</Label>
              <Input
                id="calorieTarget"
                type="number"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(Number(e.target.value))}
                className="mt-2"
                placeholder="e.g. 2000"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            className="mt-4 text-sm"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            {showMoreOptions ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" /> Hide advanced options
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" /> Show advanced options
              </>
            )}
          </Button>

          {showMoreOptions && (
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. lactose-free, post-workout meals"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="excludeIngredients">Exclude Ingredients</Label>
                <Input
                  id="excludeIngredients"
                  value={excludeIngredients}
                  onChange={(e) => setExcludeIngredients(e.target.value)}
                  className="mt-2"
                  placeholder="e.g., nuts, dairy, gluten"
                />
              </div>

              <div className="md:col-span-2">
                <Label>Cooking Time Preference</Label>
                <RadioGroup
                  value={cookingTime}
                  onValueChange={(value) => setCookingTime(value as any)}
                  className="mt-2 flex flex-wrap gap-4"
                >
                  {[
                    { label: "Any", value: "any" },
                    { label: "Quick (15-30 min)", value: "quick" },
                    { label: "Medium (30-60 min)", value: "medium" },
                    { label: "Slow (60+ min)", value: "slow" },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.value}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={generateMealPlan}
              disabled={
                generateMealPlanMutation.isPending ||
                !goal ||
                !dietaryPreferences
              }
              className="w-full sm:w-auto"
            >
              {generateMealPlanMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Generating...
                </>
              ) : (
                "Generate Meal Plan"
              )}
            </Button>

            {meals && meals.length > 0 && (
              <Button
                onClick={saveMealPlan}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Save Meal Plan
              </Button>
            )}
          </div>
        </Card>

        <div className="mt-10 space-y-6">
          {generateMealPlanMutation.isPending && (
            <LoadingSkeleton mealCount={mealCount} />
          )}

          {meals && meals.length > 0 && !generateMealPlanMutation.isPending && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Generated Meals</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNutritionDetails((prev) => !prev)}
                >
                  <Target className="mr-2 h-4 w-4" />
                  {showNutritionDetails ? "Hide" : "Show"} Nutrition
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {meals.map((meal, index) => (
                  <MealCard
                    key={`${meal.name}-${index}`}
                    meal={meal}
                    saveFavoriteMeal={saveFavoriteMeal}
                    showNutritionDetails={showNutritionDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {!meals && !generateMealPlanMutation.isPending && (
            <div className="py-12 text-center">
              <Utensils className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">Ready to Generate</h3>
              <p className="text-muted-foreground">
                Fill in your preferences and click "Generate Meal Plan" to get
                started.
              </p>
            </div>
          )}

          {generateMealPlanMutation.error && (
            <div className="py-12 text-center">
              <div className="bg-destructive/10 text-destructive rounded-lg border p-4">
                <h3 className="mb-2 text-lg font-semibold">
                  Generation Failed
                </h3>
                <p className="text-muted-foreground mb-4">
                  {generateMealPlanMutation.error.message ||
                    "Failed to generate meal plan. Please try again."}
                </p>
                <Button onClick={() => generateMealPlanMutation.reset()}>
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>

        <HelpSheet />
      </div>
    </div>
  );
};

export default Meal;
