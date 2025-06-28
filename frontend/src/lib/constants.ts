import {
  Sparkles,
  Timer,
  ChefHat,
  CalendarDays,
  BarChart3,
  BarChart2,
  LucideIcon,
} from "lucide-react";

export const PAGE_SIZE = 1;

export interface Meal {
  name: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: string[];
  isFavorite?: boolean;
}

export interface MealPlan {
  _id: string;
  createdAt: string;
  goal: string;
  meals: Meal[];
}

export const Testimonials = [
  {
    quote:
      "This platform completely changed how I approach meal planning. It's like having a personal nutritionist in my pocket.",
    author: "Sarah J.",
    role: "Busy professional",
  },
  {
    quote:
      "As someone with dietary restrictions, finding the right meal plan was always a challenge. AI Meal Planner made it effortless.",
    author: "Michael T.",
    role: "Fitness enthusiast",
  },
  {
    quote:
      "The personalized recommendations have helped me discover new healthy recipes that I actually enjoy cooking and eating.",
    author: "Elena R.",
    role: "Parent of three",
  },
];

export const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Effortless Planning",
    description:
      "Generate personalized weekly meal plans in seconds with zero effort.",
    icon: CalendarDays,
  },
  {
    title: "Time-Saving Recipes",
    description: "Quick, easy meals tailored to your schedule and preferences.",
    icon: Timer,
  },
  {
    title: "Smart Nutrition",
    description: "Balanced macros auto-adjusted to your goals and habits.",
    icon: BarChart3,
  },
  {
    title: "Intuitive Cooking Mode",
    description:
      "Step-by-step visuals with timers and voice guidance built in.",
    icon: ChefHat,
  },
  {
    title: "One-Click Grocery List",
    description:
      "Auto-generate smart shopping lists—grouped, sorted, and editable.",
    icon: Sparkles,
  },
  {
    title: "Calorie Tracking",
    description: "Track your daily nutrition and stay on top of your goals.",
    icon: BarChart2,
  },
];

export const plans = [
  {
    id: "free",
    name: "Basic",
    description: "Perfect for getting started",
    price: 0,
    planId: "plan_basic",
    features: [
      { text: "10 AI-generated meals per month", tooltip: "Renews monthly" },
      { text: "Basic recipe suggestions" },
      { text: "Shopping list generation" },
      { text: "Basic nutritional info" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For health-focused individuals",
    price: 499,
    planId: "plan_Q1Srxoloblnvpy",
    popular: true,
    features: [
      { text: "Unlimited AI meal generations" },
      { text: "Advanced recipe customization" },
      {
        text: "Detailed nutrition tracking",
        tooltip: "Includes macros, micros, and calories",
      },
      { text: "Meal prep automation" },
      { text: "Priority chat support" },
    ],
  },
  {
    id: "family",
    name: "Family",
    description: "Ideal for households and groups",
    price: 1299,
    planId: "plan_Q1Ssb9efvNYZlP",
    features: [
      { text: "All Pro features included" },
      {
        text: "Up to 6 profiles",
        tooltip: "Customize for each family member",
      },
      { text: "Family-wide planning dashboard" },
      { text: "Grocery list sharing & sync" },
      { text: "24/7 premium support" },
    ],
  },
];
