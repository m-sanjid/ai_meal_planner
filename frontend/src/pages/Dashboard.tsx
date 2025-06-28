import Pagination from "@/components/Pagination";
import MealCard from "@/components/MealCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/lib/constants";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "@/components/PageHeader";
import Unauthorized from "./Unauthorized";
import { Meal } from "@/components/MealCard";
import { Helmet } from "react-helmet-async";
import { useMealPlans } from "@/hooks/useMealPlans";
import { useAddToFavorites as useAddToFavoritesHook } from "@/hooks/useFavorites";

const Dashboard = () => {
  const { user, isSignedIn } = useUser();
  const [currentPage, setCurrentPage] = useState(0);

  // TanStack Query hooks
  const { data: mealPlans = [], isLoading, error } = useMealPlans();
  const addToFavoritesMutation = useAddToFavoritesHook();

  const saveFavoriteMeal = (meal: Meal) => {
    if (user?.id) {
      addToFavoritesMutation.mutate({ userId: user.id, meal });
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
    <>
      <Helmet>
        <title>Dashboard | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="View and manage your AI-generated meal plans on your BefitAI dashboard. Track your nutrition and goals."
        />
      </Helmet>
      <main
        className="mx-auto mb-6 flex min-h-screen max-w-5xl justify-center"
        aria-label="Dashboard"
      >
        <div className="w-full p-4">
          <PageHeader
            user={user}
            title="Meal Plans"
            Cta="Create New Meal Plan"
          />
          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="my-5 py-4 text-center text-5xl font-bold text-neutral-800 dark:text-white"
            >
              Your Meal Plans
            </motion.h1>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingSkeleton key="loading" />
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <div className="bg-destructive/10 text-destructive rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      Error Loading Meal Plans
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Failed to load your meal plans. Please try again.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
                    >
                      Retry
                    </button>
                  </div>
                </motion.div>
              ) : mealPlans.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <div className="bg-muted/50 rounded-lg border p-8">
                    <h3 className="mb-2 text-lg font-semibold">
                      No Meal Plans Found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first meal plan to get started with your
                      nutrition journey.
                    </p>
                    <a
                      href="/meal"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-md px-4 py-2"
                    >
                      Create Meal Plan
                    </a>
                  </div>
                </motion.div>
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
                      className="mb-4 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-white/50 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-neutral-800/50"
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
                            showNutritionDetails={true}
                            key={index}
                            meal={meal}
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
          {!isLoading && !error && mealPlans.length > 0 && (
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
      </main>
    </>
  );
};

export default Dashboard;
