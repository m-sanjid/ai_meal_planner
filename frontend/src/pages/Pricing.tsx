import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import Signin from "./Signin";
import { useSubscription } from "@/context/SubscriptionContext";
import { toast } from "sonner";
import PricingComponent from "@/components/PricingComponent";
import { PageLayout } from "@/components/layout/PageLayout";

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
        }
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
        error instanceof Error ? error.message : "Failed to start subscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        <div>
          <PricingComponent
            loading={loading}
            handleSubscribe={handleSubscribe}
          />
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-neutral-200">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pricingFaqs.map((faq, index) => (
              <div
                key={index}
                className="text-left bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <h3 className="font-semibold mb-2 text-black dark:text-neutral-200">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const pricingFaqs = [
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a 14-day money-back guarantee for all paid plans.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    question: "Do you offer team discounts?",
    answer:
      "Yes, contact our sales team for custom pricing for teams of 10 or more.",
  },
];

export default Pricing;
