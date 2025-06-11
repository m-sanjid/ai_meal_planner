import Pagination from "@/components/Pagination";
import { MealCard } from "@/components/MealCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/lib/constants";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "@/components/PageHeader";
import Unauthorized from "./Unauthorized";

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
  }, [isSignedIn, fetchMealPlans]);

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-[600px] w-full max-w-4xl flex-col gap-4 rounded-lg border bg-white/50 p-4 shadow-md backdrop-blur-sm dark:bg-neutral-800/50"
      >
        <Skeleton className="h-[80%] w-full rounded-lg" />
        <Skeleton className="h-[10%] w-full rounded-lg" />
      </motion.div>
    );
  };

  const totalMeals = mealPlans.length;
  const noOfPages = Math.ceil(totalMeals / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  if (!isSignedIn) {
    return <Unauthorized />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mb-6 flex min-h-screen max-w-5xl justify-center"
    >
      <div className="w-full p-4">
        <PageHeader user={user} title="Meal Plans" Cta="Create New Meal Plan" />
        <div className="flex flex-col gap-2">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="my-5 py-4 text-center text-5xl font-bold text-neutral-800 dark:text-white"
          >
            Your Meal Plans
          </motion.h2>
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingSkeleton key="loading" />
            ) : mealPlans.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-lg text-neutral-600 dark:text-neutral-300"
              >
                No meal plans found
              </motion.p>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                {mealPlans.slice(start, end).map((mealPlan) => (
                  <motion.div
                    key={mealPlan._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 overflow-hidden rounded-lg border bg-white/50 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-neutral-800/50"
                  >
                    <h3 className="py-4 text-2xl font-bold text-neutral-800 dark:text-white">
                      Goal: {mealPlan.goal}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      <strong>Created At:</strong>{" "}
                      {new Date(mealPlan.createdAt).toLocaleString()}
                    </p>
                    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
                      {mealPlan.meals.map((meal, index) => (
                        <MealCard
                          key={index}
                          meal={meal}
                          index={index}
                          saveFavoriteMeal={saveFavoriteMeal}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="my-4 flex justify-center"
          >
            <Pagination
              noOfPages={noOfPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
