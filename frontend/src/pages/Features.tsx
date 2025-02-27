import { Check } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 dark:text-neutral-200">
          Features
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-neutral-200">
                {feature.title}
              </h3>
              <ul className="space-y-3">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-[#4B6746]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
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