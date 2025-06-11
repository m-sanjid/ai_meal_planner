import { Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

const Features = () => {
  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center text-4xl font-bold">Features</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-accent-foreground rounded-xl border p-6 backdrop-blur-sm transition-all duration-200 hover:shadow-sm"
            >
              <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="h-5 w-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

const features = [
  {
    title: "AI-Powered Meal Planning",
    items: [
      "Personalized meal recommendations",
      "Automatic nutritional balancing",
      "Dietary restriction handling",
      "Smart recipe substitutions",
    ],
  },
  {
    title: "Shopping & Preparation",
    items: [
      "Automated shopping lists",
      "Ingredient optimization",
      "Pantry management",
      "Cost-effective suggestions",
    ],
  },
  {
    title: "Health & Nutrition",
    items: [
      "Detailed nutritional analysis",
      "Health goal tracking",
      "Dietary compliance monitoring",
      "Allergen alerts",
    ],
  },
  {
    title: "User Experience",
    items: [
      "Recipe favorites and ratings",
      "Meal calendar integration",
      "Family preference management",
      "Mobile-friendly interface",
    ],
  },
];

export default Features;
