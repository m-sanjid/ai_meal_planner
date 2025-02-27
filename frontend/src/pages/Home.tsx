import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8 md:p-20">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
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
          <FeatureCard
            icon={<CalendarDays className="w-8 h-8" />}
            title="Meal Calendar"
            description="Plan your weekly meals with an interactive calendar"
            href="/calendar"
          />

          <FeatureCard
            icon={<ChefHat className="w-8 h-8" />}
            title="Recipe Explorer"
            description="Discover AI-curated recipes based on your preferences"
            href="/dashboard"
          />

          <FeatureCard
            icon={<Heart className="w-8 h-8" />}
            title="Favorites"
            description="Meals that you marked as favorite"
            href="/user/favorites"
          />

          <FeatureCard
            icon={<ClipboardList className="w-8 h-8" />}
            title="Shopping Lists"
            description="Auto-generated shopping lists for your meal plans"
            href="/shopping-list"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Family Preferences"
            description="Manage dietary restrictions and preferences"
            href="/preferences"
          />

          <FeatureCard
            icon={<Settings className="w-8 h-8" />}
            title="Meal Settings"
            description="Customize your meal planning experience"
            href="/settings"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-300">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={"/meal"}>
              <Button variant="outline" className="border-[#4B6745]">
                Generate Weekly Plan
              </Button>
            </Link>
            <Link to={"/dashboard"}>
              <Button variant="outline" className="border-[#4B6745]">
                Browse Recipes
              </Button>
            </Link>
            <Link to={"/user/shopping-list"}>
              <Button variant="outline" className="border-[#4B6745]">
                View Shopping List
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-[#4B6746] mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <Link to={href}>
        <Button variant="link" className="p-0 dark:text-[#4B6748]">
          Learn More →
        </Button>
      </Link>
    </div>
  );
};

export default Home;
