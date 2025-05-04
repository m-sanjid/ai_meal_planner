import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

const Preview = () => {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Preview BefitAI</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Experience the future of meal planning with our interactive preview
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
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
            <Button className="flex items-center gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-accent-foreground backdrop-blur-lg rounded-xl p-6">
            <img
              src="/preview-mockup.png"
              alt="BefitAI Preview"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {demoFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-accent-foreground backdrop-blur-lg rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

const features = [
  "14-day free trial",
  "No credit card required",
  "Full access to all features",
  "Personalized meal recommendations",
  "Shopping list generation",
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
