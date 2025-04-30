import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import {
  CalendarDays,
  ChefHat,
  ClipboardList,
  Heart,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center my-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 dark:text-neutral-200">
          Smart Meal Planning with AI
        </h1>
        <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
          Plan your meals, generate shopping lists, and eat healthier with
          personalized AI recommendations
        </p>
        <Button size="lg">Generate New Meal</Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-300">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to={"/meal"}>
            <Button variant="outline">Generate Weekly Plan</Button>
          </Link>
          <Link to={"/dashboard"}>
            <Button variant="outline">Browse Recipes</Button>
          </Link>
          <Link to={"/shopping"}>
            <Button variant="outline">View Shopping List</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: <CalendarDays className="w-8 h-8" />,
    title: "Meal Calendar",
    description: "Plan your weekly meals with an interactive calendar",
    href: "/calendar",
  },
  {
    icon: <ChefHat className="w-8 h-8" />,
    title: "Recipe Explorer",
    description: "Discover AI-curated recipes based on your preferences",
    href: "/dashboard",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Favorites",
    description: "Meals that you marked as favorite",
    href: "/user/favorites",
  },
  {
    icon: <ClipboardList className="w-8 h-8" />,
    title: "Shopping Lists",
    description: "Auto-generated shopping lists for your meal plans",
    href: "/shopping-list",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Family Preferences",
    description: "Manage dietary restrictions and preferences",
    href: "/preferences",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Meal Settings",
    description: "Customize your meal planning experience",
    href: "/settings",
  },
];

const FeatureCard = ({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <div className="bg-white/30 dark:bg-neutral-900 backdrop-blur-lg space-y-4 rounded-xl p-6 transition-all duration-200 hover:shadow-lg border">
      <div className="flex p-2 justify-between items-center">
        <div>{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
      </div>
      <p className="mb-4">{description}</p>
      <Link to={href}>
        <Button className="group flex items-center gap-2">Learn More <span className="group-hover:translate-x-2 transition-all duration-300"><IconArrowRight className="w-5 h-5" stroke={"medium"}/></span></Button>
      </Link>
    </div>
  );
};

export default Home;
