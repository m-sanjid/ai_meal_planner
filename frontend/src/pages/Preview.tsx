import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Preview = () => {
  return (
    <>
      <Helmet>
        <title>Preview | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="Preview BefitAI's AI-powered meal planning features. Try before you buy with a free interactive demo."
        />
      </Helmet>
      <main className="mx-auto max-w-6xl" aria-label="Preview">
        <SectionHeader
          title="Preview BefitAI"
          description="Experience the future of meal planning with our interactive preview"
        />
        <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Try Before You Buy</h2>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/signup">
              <Button className="flex items-center gap-2">
                Start for Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="h-full w-full">
            <img
              src="/preview.png"
              alt="BefitAI Preview - app interface screenshot"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {demoFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-accent rounded-xl p-6 backdrop-blur-lg transition-all duration-200 hover:shadow-lg"
            >
              <h2 className="mb-3 text-xl font-semibold">{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

const features = [
  "10 tokens per month for free, unlimited for pro",
  "Personalized meal generation",
  "Calorie tracking",
  "Shopping list generation",
  "Full access to all features",
];

const demoFeatures = [
  {
    title: "AI Meal Planning",
    description:
      "See how our AI creates personalized meal plans based on your preferences and dietary needs.",
  },
  {
    title: "Recipe Management",
    description:
      "Explore our extensive recipe database and see how easy it is to save and organize your favorites.",
  },
  {
    title: "Shopping Lists",
    description:
      "Experience automatic shopping list generation based on your meal plans.",
  },
];

export default Preview;
