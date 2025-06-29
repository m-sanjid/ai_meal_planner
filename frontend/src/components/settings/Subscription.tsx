import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PricingComponent from "../PricingComponent";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";
import SubscriptionStatus from "../SubscriptionStatus";
import { useEffect } from "react";
import { useSubscription } from "@/context/SubscriptionContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface UserSubscription {
  plan: string;
  status: string;
  renewalDate: string;
}

const Subscription = ({
  getToken,
}: {
  getToken: () => Promise<string | null>;
}) => {
  const { subscription, status, nextReset, setSubscription } =
    useSubscription();
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    plan: "free",
    status: "inactive",
    renewalDate: "N/A",
  });

  useEffect(() => {
    if (subscription) {
      setUserSubscription({
        plan: subscription,
        status: status || "inactive",
        renewalDate: nextReset
          ? new Date(nextReset).toLocaleDateString()
          : "N/A",
      });
    }
  }, [subscription, status, nextReset]);

  const handleCancelSubscription = async () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      try {
        const token = await getToken();

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/sub/cancel-subscription`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUserSubscription((prev) => ({
          ...prev,
          status: "cancelled",
        }));
        setSubscription("free");

        toast("Subscription cancelled successfully");
      } catch (error) {
        console.error("Error cancelling subscription:", error);
        toast.error("Failed to cancel subscription");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card className="bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Subscription</CardTitle>
          <CardDescription className="text-muted-foreground text-xs md:text-sm">
            Manage your subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-card rounded-lg p-4">
            <SubscriptionStatus />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              className="flex w-full items-center gap-2"
            >
              <CreditCard className="h-4 w-4" /> Manage Payment Methods
            </Button>
          </motion.div>

          {userSubscription.plan !== "free" &&
            userSubscription.status === "active" && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </motion.div>
            )}

          <Separator className="my-6" />

          <div>
            <motion.h3
              className="text-foreground mb-4"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Available Plans
            </motion.h3>
            <PricingComponent />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Subscription;
