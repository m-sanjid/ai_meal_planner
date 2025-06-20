import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const Preview = () => {
  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl">
          <SectionHeader title="Preview BefitAI" description="Experience the future of meal planning with our interactive preview" />

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
            <Button className="flex items-center gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-accent rounded-xl p-6 backdrop-blur-lg">
            <img
              src="/preview-mockup.png"
              alt="BefitAI Preview"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {demoFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-accent rounded-xl p-6 backdrop-blur-lg transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
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
