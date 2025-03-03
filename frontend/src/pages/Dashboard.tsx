import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/lib/constants";
import { SignInButton, useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Plus, Star, User } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface Meal {
  name: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: string[];
}

interface MealPlan {
  _id: string;
  createdAt: string;
  goal: string;
  meals: Meal[];
}

const Dashboard = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMealPlans = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/meals/`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMealPlans(response.data);
    } catch (error) {
      console.error("Error fetching meal plans", error);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (isSignedIn) {
      fetchMealPlans();
    }
  }, [isSignedIn, fetchMealPlans])

  const saveFavoriteMeal = async (meal: Meal) => {
    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/meals/favorites`,
        { userId: user?.id, meal },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast("Meal added to favorites ");
    } catch (error) {
      console.error("Error saving favorite meals", error);
    }
  };

  const LoadingSkeleton = () => {
    return (
      <div className="w-full max-w-4xl border h-[600px] p-4 flex flex-col gap-4">
        <Skeleton className="w-full h-[80%]" />
        <Skeleton className="w-full h-[10%]" />
      </div>
    );
  };

  const totalMeals = mealPlans.length;
  const noOfPages = Math.ceil(totalMeals / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return (
    <div className="min-h-screen flex justify-center max-w-5xl mx-auto mb-6">
      {isSignedIn ? (
        <div className="w-full p-4">
          <div className="p-4 bg-[#4B6746]/20 backdrop-blur-md py-10 rounded-lg shadow-lg dark:bg-white/10">
            <div className="flex justify-between items-center">
              {user?.hasImage ? (
                <div className="border-4 rounded-xl border-[#4B6746]">
                  <img
                    className="rounded-lg"
                    width={42}
                    height={42}
                    src={user?.imageUrl}
                    alt="img"
                  />
                </div>
              ) : (
                <div className="p-2 rounded-lg border-4 border-[#4B6746] bg-[#4B6746]/30">
                  <User className="w-8 h-8" />
                </div>
              )}

              <div className="text-4xl font-semibold text-[#4B6746] dark:text-white pr-4">
                {" "}
                {user?.firstName}
              </div>
              <a href="/meal">
                <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center p-1 dark:bg-white/40">
                  <Plus size={32} stroke="#4B6746" />
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="py-4 text-center font-bold text-5xl my-5">
              Your Meal Plans
            </h2>
            {loading ? (
              <LoadingSkeleton />
            ) : mealPlans.length === 0 ? (
              <p>No meal Plans found</p>
            ) : (
              <div className="text-center">
                {mealPlans.slice(start, end).map((mealPlan) => (
                  <div key={mealPlan._id} className="border p-4 mb-4">
                    <h3 className="text-2xl py-4 font-bold">
                      Goal: {mealPlan.goal}
                    </h3>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(mealPlan.createdAt).toLocaleString()}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {mealPlan.meals.map((meal, index) => (
                        <Card
                          key={index}
                          className="border p-4 rounded-lg shadow-md"
                        >
                          <CardHeader>
                            <CardTitle className="text-xl text-start font-bold">
                              {meal.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-start">
                            <div className="flex justify-between items-center">
                              <p>
                                Calories:{" "}
                                <span className="font-bold">
                                  {meal.calories} kcal
                                </span>
                              </p>
                              <Button
                                onClick={() => saveFavoriteMeal(meal)}
                                variant={"secondary"}
                              >
                                <Star />
                              </Button>
                            </div>

                            <p className="pt-2 text-xs flex gap-1">
                              Protein: <strong>{meal.macros.protein}g</strong>|
                              Carbs: <strong>{meal.macros.carbs}g</strong> |
                              Fat: <strong>{meal.macros.fat}g</strong>
                            </p>
                          </CardContent>
                          <CardContent>
                            <p className="font-semibold pb-1">Ingredients:</p>
                            <ul className="space-y-1">
                              {meal.ingredients.map((item) => (
                                <li
                                  key={item}
                                  className="text text-xs text-start"
                                >
                                  <span className="px-1">•</span>
                                  <span className="italic font-light">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {!loading && (
            <div className="flex justify-center my-4">
              <Pagination
                noOfPages={noOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="text-2xl text-red-500">Please Login to continue</div>
          <Button variant={"default"}>
            <SignInButton />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;