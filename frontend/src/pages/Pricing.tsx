import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import Signin from "./Signin";
import { useSubscription } from "@/context/SubscriptionContext";
import { toast } from "sonner";
import PricingComponent from "@/components/PricingComponent";
import { PageLayout } from "@/components/layout/PageLayout";
import PricingFaq from "./PricingFaq";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const { isSignedIn, getToken } = useAuth();
  const { setSubscription } = useSubscription();

  const handleSubscribe = async (plan: string, planId: string) => {
    setLoading(true);
    try {
      if (!isSignedIn) return Signin();
      const token = await getToken();
      if (!token)
        throw new Error("Authentication failed. Please sign in again.");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sub/create-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            planId,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create subscription");

      if (data.subscriptionId && window.Razorpay) {
        const rzp = new window.Razorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          subscription_id: data.subscriptionId,
          name: "BefitAI",
          description: `${plan} Subscription`,
          handler: () => {
            setSubscription(plan.toLowerCase());
            toast.success("Payment successful!");
            window.location.href = "/dashboard";
          },
          theme: { color: "#4B6746" },
        });
        rzp.open();
      } else {
        throw new Error("Payment initialization failed");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to start subscription",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl py-8 lg:py-16">
        <div>
          <PricingComponent
            loading={loading}
            handleSubscribe={handleSubscribe}
          />
        </div>
        <div className="mt-12 text-center">
          <h2 className="mb-8 text-2xl font-semibold text-black dark:text-neutral-200">
            Frequently Asked Questions
          </h2>
          <PricingFaq />
        </div>
        <div className="flex items-center justify-center pt-20">
          <Link
            to={"/contact"}
            className="bg-accent rounded-md border px-6 py-2"
          >
            Contact
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pricing;
