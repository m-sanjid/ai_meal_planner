import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  BookOpen,
  Search,
  Lightbulb,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageLayout>
      <SectionHeader title="Documentation" />
      <div className="grid gap-8 md:grid-cols-[280px,1fr]">
        {/* Sidebar Navigation */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-neutral-400" />
            <Input
              placeholder="Search documentation..."
              className="border-none bg-white pl-10 dark:bg-[#2a2a2a]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {sections.map((section) => (
              <Button
                variant={"ghost"}
                key={section.id}
                className={`group w-full justify-start ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                  <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg bg-white p-8 shadow-sm dark:bg-[#2a2a2a]"
        >
          {sections.map(
            (section) =>
              activeSection === section.id && (
                <div key={section.id}>
                  <h1 className="mb-6 text-3xl font-bold dark:text-white">
                    {section.title}
                  </h1>
                  <div className="prose dark:prose-invert max-w-none">
                    {section.content}
                  </div>
                </div>
              ),
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
};

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <BookOpen className="h-4 w-4" />,
    content: (
      <>
        <h2 className="mb-4 text-2xl font-semibold">Welcome to BefitAI</h2>
        <p className="mb-6 text-lg">
          Your AI-powered meal planning companion that helps you achieve your
          health and fitness goals through personalized nutrition.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Quick Start Guide</h3>
        <ol className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="bg-primary/10 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
              1
            </span>
            <div>
              <h4 className="font-medium">Create Your Account</h4>
              <p className="text-muted-foreground">
                Sign up and set up your profile with basic information about
                yourself.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary/10 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
              2
            </span>
            <div>
              <h4 className="font-medium">Set Your Preferences</h4>
              <p className="text-muted-foreground">
                Configure your dietary restrictions, allergies, and food
                preferences.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary/10 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
              3
            </span>
            <div>
              <h4 className="font-medium">Generate Your First Plan</h4>
              <p className="text-muted-foreground">
                Let our AI create a personalized meal plan based on your goals
                and preferences.
              </p>
            </div>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "meal-planning",
    title: "Meal Planning",
    icon: <Lightbulb className="h-4 w-4" />,
    content: (
      <>
        <h2 className="mb-4 text-2xl font-semibold">Meal Planning Guide</h2>
        <p className="mb-6 text-lg">
          Learn how to create and customize your meal plans to match your
          lifestyle and goals.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="mb-2 font-semibold">Smart Meal Generation</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your preferences and goals to create balanced,
              nutritious meal plans.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="mb-2 font-semibold">Customization Options</h3>
            <p className="text-muted-foreground">
              Adjust portion sizes, swap ingredients, and modify recipes to suit
              your taste.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "recipes",
    title: "Recipes",
    icon: <Settings className="h-4 w-4" />,
    content: (
      <>
        <h2 className="mb-4 text-2xl font-semibold">Recipe Management</h2>
        <p className="mb-6 text-lg">
          Discover, save, and organize your favorite recipes with our intuitive
          recipe management system.
        </p>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="mb-2 font-semibold">Recipe Library</h3>
            <p className="text-muted-foreground">
              Access thousands of curated recipes with detailed nutritional
              information.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="mb-2 font-semibold">Smart Search</h3>
            <p className="text-muted-foreground">
              Find recipes based on ingredients, dietary restrictions, or
              cooking time.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "shopping",
    title: "Shopping Lists",
    icon: <HelpCircle className="h-4 w-4" />,
    content: (
      <>
        <h2 className="mb-4 text-2xl font-semibold">Shopping List Guide</h2>
        <p className="mb-6 text-lg">
          Generate and manage your shopping lists efficiently with our smart
          shopping features.
        </p>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="mb-2 font-semibold">Auto-Generated Lists</h3>
            <p className="text-muted-foreground">
              Shopping lists are automatically created based on your meal plans.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="mb-2 font-semibold">Smart Organization</h3>
            <p className="text-muted-foreground">
              Items are categorized by department for efficient shopping.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

export default Documentation;
