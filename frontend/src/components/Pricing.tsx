import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const Pricing = () => {
  return (
    <div className="max-w-4xl py-20">
      <div>
        <div className="text-center p-4 text-4xl lg:text-5xl font-bold">
          Choose Your Perfect Plan
        </div>
        <div className="text-center text-xl text-gray-600 mb-20 dark:text-neutral-400">
          Start free and upgrade as you grow. No credit card required.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-4 ">
          {plans.map((item) => (
            <div>
              <Card
                className={`relative dark:bg-[#4B6746]/10 dark:backdrop-blur-md ${item.popular ? "border border-[#4B6746]" : ""} hover:border-2 hover:border-[#4B6746]`}
              >
                {item.popular && (
                  <span className="absolute bg-[#4B6746] -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-medium text-white rounded-full">
                    Most Popular
                  </span>
                )}
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardTitle>
                    <div className="font-bold text-3xl">
                      <span>{item.price}</span>
                      {item.price !== "Free" && <span>/month</span>}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="py-2">{item.description}</p>
                  <ul className="space-y-3 mb-6">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#4B6746]" />
                        <span className="text-gray-600 dark:text-neutral-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      item.popular
                        ? "bg-[#4B6746]/90 hover:bg-[#4B6746]"
                        : "bg-[#4B6746]/30 text-sage-700 hover:bg-[#4B6746]"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started with meal planning",
    features: [
      "5 meal plans per month",
      "Basic recipe suggestions",
      "Simple macro tracking",
      "Shopping list generation",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    description: "Ideal for health enthusiasts and fitness lovers",
    features: [
      "Unlimited meal plans",
      "Advanced recipe customization",
      "Detailed macro tracking",
      "Shopping list with price estimates",
      "Integration with fitness apps",
      "Meal prep guides",
    ],
    popular: true,
  },
  {
    name: "Teams",
    price: "$29",
    description: "Perfect for trainers and nutritionists",
    features: [
      "Everything in Pro",
      "Client management",
      "Team collaboration",
      "Custom branding",
      "Analytics dashboard",
      "Priority support",
    ],
  },
];
