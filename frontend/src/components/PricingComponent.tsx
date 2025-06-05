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
import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import SectionHeader from "./SectionHeader";
import { plans } from "@/lib/constants";

type Props = {
  loading?: boolean;
  handleSubscribe?: (
    plan: string,
    planId: string,
  ) => Promise<JSX.Element | undefined>;
};

const   PricingComponent = ({ loading, handleSubscribe }: Props) => {
  const { subscription } = useSubscription();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const navigate = useNavigate();
  const current = subscription || "free";
  const path = window.location.pathname;

  return (
    <section
      className={`${
        path !== "/" ? "max-w-6xl py-16" : "max-w-5xl py-24"
      } mx-auto px-4`}
    >
      {path !== "/settings" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <SectionHeader title="Simple, Transparent Pricing" description="Find a plan that works for you — no hidden fees." />
        </motion.div>
      )}

      <div className="mb-14 flex justify-center">
        <Tabs
          defaultValue="monthly"
          value={billingPeriod}
          onValueChange={(value) =>
            setBillingPeriod(value as "monthly" | "yearly")
          }
        >
          <TabsList className="bg-muted border-border rounded-full border p-1 dark:border-neutral-800">
            <TabsTrigger
              value="monthly"
              className="rounded-full px-4 py-1 text-sm data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="rounded-full px-4 py-1 text-sm data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
            >
              Yearly
              <Badge className="ml-2 bg-neutral-200 text-xs text-black dark:bg-neutral-800 dark:text-white">
                Save 20%
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <motion.div
        className="grid gap-8 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card
              className={`group border-border relative h-full border transition-shadow duration-300 hover:shadow-md ${
                current === plan.id
                  ? "border-black dark:border-white"
                  : "border-neutral-200 dark:border-neutral-800"
              } ${plan.popular ? "bg-neutral-100 dark:bg-neutral-900" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-black px-3 py-1 text-xs text-white dark:bg-white dark:text-black">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4 text-3xl font-bold text-black dark:text-white">
                  ₹
                  {billingPeriod === "yearly"
                    ? (plan.price * 0.8).toFixed(0)
                    : plan.price}
                  <span className="text-muted-foreground text-base font-normal">
                    /mo
                  </span>
                </div>
              </CardHeader>

              <CardContent className="mt-4">
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-sm leading-5 text-neutral-800 dark:text-neutral-300">
                        <IconCheck className="text-muted-foreground bg-accent size-6 rounded p-1" />
                      </span>
                      <span className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">
                        {feature.text}
                      </span>
                      {feature.tooltip && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-sm">
                              {feature.tooltip}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={current === plan.id ? "outline" : "default"}
                  disabled={loading || current === plan.id}
                  onClick={() =>
                    path !== "/"
                      ? handleSubscribe?.(plan.name, plan.planId)
                      : navigate("/pricing")
                  }
                >
                  {loading
                    ? "Processing..."
                    : current === plan.id
                      ? "Current Plan"
                      : `Get ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PricingComponent;