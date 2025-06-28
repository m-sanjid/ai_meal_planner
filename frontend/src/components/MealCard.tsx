import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Utensils } from "lucide-react";

export interface Meal {
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

const MealCard = ({
  meal,
  saveFavoriteMeal,
  setSelectedMeal,
  setShowMealDetails,
  calorieTarget,
  showNutritionDetails,
}: {
  meal: Meal;
  saveFavoriteMeal: (meal: Meal) => void;
  setSelectedMeal?: (meal: Meal) => void;
  setShowMealDetails?: (show: boolean) => void;
  calorieTarget?: number;
  showNutritionDetails?: boolean;
}) => {
  return (
    <Card
      className="group mx-auto w-full max-w-md overflow-hidden transition-shadow duration-200 hover:shadow-lg"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${meal.name}`}
      onClick={() => {
        setSelectedMeal?.(meal);
        setShowMealDetails?.(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSelectedMeal?.(meal);
          setShowMealDetails?.(true);
        }
      }}
    >
      <CardHeader className="bg-muted/40 pb-4">
        <div className="flex w-full items-start justify-between">
          <CardTitle className="group-hover:text-primary text-start text-lg transition-colors md:text-xl">
            {meal.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                saveFavoriteMeal(meal);
              }}
              className={cn(
                "hover:bg-primary/10 cursor-pointer transition-colors",
                meal.isFavorite && "text-primary",
              )}
              aria-label={
                meal.isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Star
                className={cn(
                  "h-4 w-4 transition-transform",
                  meal.isFavorite && "scale-110",
                )}
                fill={meal.isFavorite ? "currentColor" : "none"}
              />
            </Button>
            {setSelectedMeal && setShowMealDetails && (
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMeal?.(meal);
                  setShowMealDetails?.(true);
                }}
                className="ml-1"
                aria-label="Show meal details"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {meal.tags?.map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="bg-background/50 hover:bg-primary/10 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          <div className="text-muted-foreground text-sm">
            Total Calories:{" "}
            <span className="text-primary text-base font-medium">
              {meal.calories} kcal
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {meal.prepTime && meal.cookTime && meal.servings && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <span>Prep: {meal.prepTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="text-muted-foreground h-4 w-4" />
                <span>Cook: {meal.cookTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span>Serves: {meal.servings}</span>
              </div>
            </div>
          )}
          {calorieTarget && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Calories</span>
                <span className="font-medium">{meal.calories} kcal</span>
              </div>
              <Progress
                value={(meal.calories / (calorieTarget || 0)) * 100}
                className="h-2"
              />
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/30 hover:bg-muted/50 rounded-lg p-3 text-center transition-colors">
              <p className="text-muted-foreground text-sm">Protein</p>
              <p className="font-semibold">{meal.macros.protein || 0}g</p>
              {showNutritionDetails && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {meal.calories && meal.calories > 0
                    ? Math.round(
                        (((meal.macros.protein || 0) * 4) / meal.calories) *
                          100,
                      )
                    : 0}
                  % of calories
                </p>
              )}
            </div>
            <div className="bg-muted/30 hover:bg-muted/50 rounded-lg p-3 text-center transition-colors">
              <p className="text-muted-foreground text-sm">Fat</p>
              <p className="font-semibold">{meal.macros.fat || 0}g</p>
              {showNutritionDetails && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {meal.calories && meal.calories > 0
                    ? Math.round(
                        (((meal.macros.fat || 0) * 9) / meal.calories) * 100,
                      )
                    : 0}
                  % of calories
                </p>
              )}
            </div>
            <div className="bg-muted/30 hover:bg-muted/50 rounded-lg p-3 text-center transition-colors">
              <p className="text-muted-foreground text-sm">Carbs</p>
              <p className="font-semibold">{meal.macros.carbs || 0}g</p>
              {showNutritionDetails && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {meal.calories && meal.calories > 0
                    ? Math.round(
                        (((meal.macros.carbs || 0) * 4) / meal.calories) * 100,
                      )
                    : 0}
                  % of calories
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Ingredients</h3>
            <ul className="space-y-1">
              {meal.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-center text-sm">
                  <span className="text-primary mr-2">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          {meal.instructions && meal.instructions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-base font-semibold md:text-lg">
                Instructions
              </h3>
              <ol className="list-inside list-decimal space-y-1 text-xs md:text-sm">
                {meal.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
          {meal.tags && meal.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-base font-semibold md:text-lg">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {meal.tags.map((tag, idx) => (
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
          <div className="space-y-2">
            <h3 className="text-base font-semibold md:text-lg">
              Detailed Nutrition
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Total Calories:</span>
                <span className="text-primary font-medium">
                  {meal.calories || 0} kcal
                </span>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Protein:</span>
                <span className="text-primary font-medium">
                  {meal.macros.protein || 0}g (
                  {meal.calories && meal.calories > 0
                    ? Math.round(
                        (((meal.macros.protein || 0) * 4) / meal.calories) *
                          100,
                      )
                    : 0}
                  %)
                </span>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Carbohydrates:</span>
                <span className="text-primary font-medium">
                  {meal.macros.carbs || 0}g (
                  {meal.calories && meal.calories > 0
                    ? Math.round(
                        (((meal.macros.carbs || 0) * 4) / meal.calories) * 100,
                      )
                    : 0}
                  %)
                </span>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Fat:</span>
                <span className="text-primary font-medium">
                  {meal.macros.fat || 0}g (
                  {meal.calories && meal.calories > 0
                    ? Math.round(
                        (((meal.macros.fat || 0) * 9) / meal.calories) * 100,
                      )
                    : 0}
                  %)
                </span>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Fiber (est.):</span>
                <span className="text-primary font-medium">
                  {Math.round((meal.macros.carbs || 0) * 0.15)}g
                </span>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Sugar (est.):</span>
                <span className="text-primary font-medium">
                  {Math.round((meal.macros.carbs || 0) * 0.25)}g
                </span>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Saturated Fat (est.):</span>
                <span className="text-primary font-medium">
                  {Math.round((meal.macros.fat || 0) * 0.3)}g
                </span>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>Sodium (est.):</span>
                <span className="text-primary font-medium">
                  {Math.round((meal.calories || 0) * 0.5)}mg
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 flex items-center justify-between p-4">
        <span className="text-sm font-medium">{meal.difficulty}</span>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
