import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, subDays, isToday, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@clerk/clerk-react";
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

interface DayMeals {
  date: Date;
  meals: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
  };
}

const MealCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekMeals, setWeekMeals] = useState<DayMeals[]>([]);
  const { getToken } = useAuth();

  // Generate week array
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  const handlePreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddMeal = async (mealType: "breakfast" | "lunch" | "dinner") => {
    try {
      const token = await getToken();
      const response = await fetch("/api/meals/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          goal: "balanced",
          dietaryPreferences: "none",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate meal");
      }

      const data = await response.json();
      const newMeal = data.meals[0];

      setWeekMeals((prev) => {
        const updated = [...prev];
        const dayIndex = updated.findIndex((day) =>
          isSameDay(day.date, selectedDate),
        );

        if (dayIndex === -1) {
          updated.push({
            date: selectedDate,
            meals: { [mealType]: newMeal },
          });
        } else {
          updated[dayIndex].meals[mealType] = newMeal;
        }

        return updated;
      });

      toast.success("Meal added successfully");
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Failed to add meal");
    }
  };

  const getMealForDate = (
    date: Date,
    mealType: "breakfast" | "lunch" | "dinner",
  ) => {
    const dayMeals = weekMeals.find((day) => isSameDay(day.date, date));
    return dayMeals?.meals[mealType];
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousWeek}
          className="hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextWeek}
          className="hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => (
          <div
            key={date.toISOString()}
            className={cn(
              "flex cursor-pointer flex-col items-center rounded-lg p-2 transition-colors",
              isSameDay(date, selectedDate)
                ? "bg-primary text-primary-foreground"
                : isToday(date)
                  ? "bg-muted"
                  : "hover:bg-muted/50",
            )}
            onClick={() => handleDateClick(date)}
          >
            <span className="text-sm font-medium">{format(date, "EEE")}</span>
            <span className="text-lg font-semibold">{format(date, "d")}</span>
          </div>
        ))}
      </div>

      {/* Selected Day Meals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {format(selectedDate, "EEEE, MMMM d")}
        </h3>
        <div className="grid gap-4">
          {(["breakfast", "lunch", "dinner"] as const).map((mealType) => {
            const meal = getMealForDate(selectedDate, mealType);
            return (
              <Card key={mealType}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="capitalize">{mealType}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddMeal(mealType)}
                    className="hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {meal ? (
                    <div className="space-y-2">
                      <h4 className="font-medium">{meal.name}</h4>
                      <div className="text-muted-foreground text-sm">
                        <p>Calories: {meal.calories}</p>
                        <p>Protein: {meal.macros.protein}g</p>
                        <p>Carbs: {meal.macros.carbs}g</p>
                        <p>Fat: {meal.macros.fat}g</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Ingredients:</p>
                        <ul className="list-inside list-disc">
                          {meal.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No meal planned
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MealCalendar;
