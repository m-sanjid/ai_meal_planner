import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Search, Lightbulb, Settings, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[280px,1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documentation..."
                className="pl-10 bg-white dark:bg-[#2a2a2a] border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className={`w-full justify-start group ${
                    activeSection === section.id ? "bg-primary/10 text-primary" : ""
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                    <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow-sm p-8"
          >
            {sections.map((section) => (
              activeSection === section.id && (
                <div key={section.id}>
                  <h1 className="text-3xl font-bold mb-6 dark:text-white">{section.title}</h1>
                  <div className="prose dark:prose-invert max-w-none">
                    {section.content}
                  </div>
                </div>
              )
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <BookOpen className="h-4 w-4" />,
    content: (
      <>
        <h2 className="text-2xl font-semibold mb-4">Welcome to BefitAI</h2>
        <p className="text-lg mb-6">Your AI-powered meal planning companion that helps you achieve your health and fitness goals through personalized nutrition.</p>
        
        <h3 className="text-xl font-semibold mb-3">Quick Start Guide</h3>
        <ol className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center">1</span>
            <div>
              <h4 className="font-medium">Create Your Account</h4>
              <p className="text-muted-foreground">Sign up and set up your profile with basic information about yourself.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center">2</span>
            <div>
              <h4 className="font-medium">Set Your Preferences</h4>
              <p className="text-muted-foreground">Configure your dietary restrictions, allergies, and food preferences.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center">3</span>
            <div>
              <h4 className="font-medium">Generate Your First Plan</h4>
              <p className="text-muted-foreground">Let our AI create a personalized meal plan based on your goals and preferences.</p>
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
        <h2 className="text-2xl font-semibold mb-4">Meal Planning Guide</h2>
        <p className="text-lg mb-6">Learn how to create and customize your meal plans to match your lifestyle and goals.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Smart Meal Generation</h3>
            <p className="text-muted-foreground">Our AI analyzes your preferences and goals to create balanced, nutritious meal plans.</p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Customization Options</h3>
            <p className="text-muted-foreground">Adjust portion sizes, swap ingredients, and modify recipes to suit your taste.</p>
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
        <h2 className="text-2xl font-semibold mb-4">Recipe Management</h2>
        <p className="text-lg mb-6">Discover, save, and organize your favorite recipes with our intuitive recipe management system.</p>
        
        <div className="space-y-4">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Recipe Library</h3>
            <p className="text-muted-foreground">Access thousands of curated recipes with detailed nutritional information.</p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Smart Search</h3>
            <p className="text-muted-foreground">Find recipes based on ingredients, dietary restrictions, or cooking time.</p>
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
        <h2 className="text-2xl font-semibold mb-4">Shopping List Guide</h2>
        <p className="text-lg mb-6">Generate and manage your shopping lists efficiently with our smart shopping features.</p>
        
        <div className="space-y-4">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Auto-Generated Lists</h3>
            <p className="text-muted-foreground">Shopping lists are automatically created based on your meal plans.</p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Smart Organization</h3>
            <p className="text-muted-foreground">Items are categorized by department for efficient shopping.</p>
          </div>
        </div>
      </>
    ),
  },
];

export default Documentation; 