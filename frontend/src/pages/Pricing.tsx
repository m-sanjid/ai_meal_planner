import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 dark:text-neutral-200">
          Simple, Transparent Pricing
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2 dark:text-neutral-200">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6 dark:text-neutral-300">${plan.price}/mo</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-[#4B6746]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">{plan.buttonText}</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const plans = [
  {
    name: "Basic",
    price: "0",
    buttonText: "Get Started",
    features: [
      "Basic meal planning",
      "5 recipes per week",
      "Shopping list generation",
      "Basic nutritional info",
    ],
  },
  {
    name: "Pro",
    price: "9.99",
    buttonText: "Try Pro",
    features: [
      "Advanced meal planning",
      "Unlimited recipes",
      "Custom meal preferences",
      "Detailed nutrition tracking",
      "Family meal planning",
    ],
  },
  {
    name: "Enterprise",
    price: "29.99",
    buttonText: "Contact Sales",
    features: [
      "All Pro features",
      "API access",
      "Custom integrations",
      "Priority support",
      "Team management",
    ],
  },
];

export default Pricing; 