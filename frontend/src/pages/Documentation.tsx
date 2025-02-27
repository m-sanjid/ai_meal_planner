import { useState } from "react";
import { Button } from "@/components/ui/button";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[250px,1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </Button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-8">
            {sections.map((section) => (
              activeSection === section.id && (
                <div key={section.id}>
                  <h1 className="text-3xl font-bold mb-6 dark:text-neutral-200">{section.title}</h1>
                  <div className="prose dark:prose-invert max-w-none">
                    {section.content}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <>
        <h2>Welcome to BefitAI</h2>
        <p>Learn how to get started with our AI-powered meal planning platform...</p>
        <h3>Quick Start Guide</h3>
        <ol>
          <li>Create your account</li>
          <li>Set up your dietary preferences</li>
          <li>Generate your first meal plan</li>
        </ol>
      </>
    ),
  },
  {
    id: "meal-planning",
    title: "Meal Planning",
    content: (
      <>
        <h2>Meal Planning Guide</h2>
        <p>Learn how to create and customize your meal plans...</p>
      </>
    ),
  },
  {
    id: "recipes",
    title: "Recipes",
    content: (
      <>
        <h2>Recipe Management</h2>
        <p>Discover how to browse, save, and organize your favorite recipes...</p>
      </>
    ),
  },
  {
    id: "shopping",
    title: "Shopping Lists",
    content: (
      <>
        <h2>Shopping List Guide</h2>
        <p>Learn how to generate and manage your shopping lists...</p>
      </>
    ),
  },
];

export default Documentation; 