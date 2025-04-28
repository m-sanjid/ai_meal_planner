import { Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useSubscription } from "@/context/SubscriptionContext";
import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  loading?: boolean;
  handleSubscribe?: (
    plan: string,
    planId: string,
  ) => Promise<JSX.Element | undefined>;
};

const PricingComponent = ({ loading, handleSubscribe }: Props) => {
  const { subscription } = useSubscription();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const navigate = useNavigate();
  const current = subscription || "free";
  const path = window.location.pathname;

  return (
    <div
      className={`${path !== "/" ? "max-w-6xl py-10" : "max-w-4xl py-20"} mx-auto`}
    >
      {path !== "/settings" ? (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-neutral-200">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your meal planning needs
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-center mb-8">
        <Tabs
          defaultValue="monthly"
          value={billingPeriod}
          onValueChange={(value) =>
            setBillingPeriod(value as "monthly" | "yearly")
          }
        >
          <TabsList className="bg-black/10 dark:bg-white/10">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              current === plan.id ? "border-black dark:border-white border-2" : ""
            } ${plan.popular ? "shadow-lg" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-black dark:bg-white">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                ₹
                  {billingPeriod === "yearly"
                    ? (plan.price * 0.8).toFixed(2)
                    : plan.price}
                </span>
                <span className="text-muted-foreground">
                  /{billingPeriod === "yearly" ? "month" : "month"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 mr-2 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="flex-1">{feature.text}</span>
                    {feature.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>{feature.tooltip}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </li>
                ))}
              </ul>
              {path !== "/" ? (
                <Button
                  className="w-full"
                  variant={current === plan.id ? "outline" : "default"}
                  disabled={loading || current === plan.id}
                  onClick={() => handleSubscribe?.(plan.name, plan.planId)}
                >
                  {loading
                    ? "Processing..."
                    : current === plan.id
                      ? "Current Plan"
                      : `Get ${plan.name}`}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant={current === plan.id ? "outline" : "default"}
                  disabled={current === plan.id}
                  onClick={() => navigate("/pricing")}
                >
                  {current === plan.id ? "Current Plan" : `Get ${plan.name}`}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;

const plans = [
  {
    id: "free",
    name: "Basic",
    description: "Perfect for getting started",
    price: 0,
    planId: "plan_basic",
    features: [
      { text: "10 AI-generated meals per month", tooltip: "Resets monthly" },
      { text: "Basic recipe suggestions" },
      { text: "Shopping list generation" },
      { text: "Basic nutritional info" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For nutrition enthusiasts",
    price: 499,
    planId: "plan_Q1Srxoloblnvpy",
    popular: true,
    features: [
      { text: "Unlimited AI meal generations" },
      { text: "Advanced recipe customization" },
      {
        text: "Detailed nutrition tracking",
        tooltip: "Including macro and micronutrients",
      },
      { text: "Meal prep guides" },
      { text: "Priority support" },
    ],
  },
  {
    id: "family",
    name: "Family",
    description: "Perfect for families",
    price: 1299,
    planId: "plan_Q1Ssb9efvNYZlP",
    features: [
      { text: "All Pro features" },
      {
        text: "Up to 6 family profiles",
        tooltip: "Each with their own preferences",
      },
      { text: "Family meal planning" },
      { text: "Grocery cost optimization" },
      { text: "24/7 priority support" },
    ],
  },
];
