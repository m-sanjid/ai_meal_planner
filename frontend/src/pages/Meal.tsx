import { useState } from "react";
import axios from "axios";
import Options from "@/components/Options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Star } from "lucide-react";

interface Meal {
  name: string;
  calories: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
  ingredients: [];
}

const Meal = () => {
  const [goal, setGoal] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  if (!isSignedIn) return <p> Not logged in</p>;

  const LoadingSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="p-4">
          <Skeleton className="h-[400px] w-full" />
        </Card>
        <Card className="p-4">
          <Skeleton className="h-[400px] w-full" />
        </Card>
      </div>
    );
  };

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
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (
        !response.data ||
        !response.data.meals ||
        response.data.meals.length === 0
      ) {
        throw new Error("AI did not return a valid meal plan.");
      }

      setMeals(response.data.meals);
    } catch (err) {
      console.error("Error generating meal plan:", err);
      setError("Failed to generate meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveFavoriteMeal = async (meal) => {
    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/meals/favorites`,
        { userId: user?.id, meal },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Meal added to favorites");
    } catch (error) {
      console.error("Error saving favorite meals", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr/increasing from-[#4B6746]/40 to-[#4B6746]/20 dark:from-neutral-900 dark:to-black">
      <div className="min-h-screen flex flex-col max-w-4xl w-full mx-auto p-6 mb-20">
        <div className="text-4xl font-bold pt-10 text-center">
          Create <span className="text-[#4B6746]">Meals</span>
        </div>
        <div className="my-20 bg-gray-200/50 dark:bg-white/10 backdrop-blur-lg rounded-2xl ">
          <div className=" gap-4 p-6  grid grid-cols-1 md:grid-cols-2">
            <label className="font-semibold text-xl">
              Select your goal:
              <Options type="" onChange={(value) => setGoal(value)} />
            </label>
            <label className="font-semibold text-xl">
              Select your diet:
              <Options
                type="diet"
                onChange={(value) => setDietaryPreferences(value)}
              />
            </label>
          </div>
          <div className="p-6 flex justify-center">
            <Button
              variant="secondary"
              disabled={goal.length === 0 || dietaryPreferences.length === 0}
              className="bg-[#4B6746]/80 w-1/2 py-5 transition duration-300"
              onClick={generateMealPlan}
            >
              {loading ? "Generating..." : "Generate Meal plan"}
            </Button>{" "}
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {loading && (
          <div>
            <LoadingSkeleton />
          </div>
        )}
        {meals && meals.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Your Meal Plan:</h2>
            <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {meals.map((meal, index) => (
                <Card key={index} className="border p-4 rounded-lg shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      <div>{meal.name}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p>
                        Calories:{" "}
                        <span className="font-bold">{meal.calories} kcal</span>
                      </p>
                      <Button
                        onClick={() => saveFavoriteMeal(meal)}
                        variant={"secondary"}
                      >
                        <Star />
                      </Button>
                    </div>
                    <p className="pt-2">
                      Protein:{" "}
                      <span className="font-bold">{meal.macros.protein}g</span>{" "}
                      | Carbs:{" "}
                      <span className="font-bold"> {meal.macros.carbs}g</span> |
                      Fat: <span className="font-bold">{meal.macros.fat}g</span>
                    </p>
                  </CardContent>
                  <CardContent>
                    <p className="font-bold pb-2">Ingredients:</p>
                    <ul className="space-y-3 mb-6">
                      {meal.ingredients.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="px-2">•</span>
                          <span className="italic font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meal;
