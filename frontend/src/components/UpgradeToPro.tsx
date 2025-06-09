import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useSubscription } from "@/context/SubscriptionContext";
import { Link } from "react-router-dom";

const UpgradeToPro = () => {
  const { isPro } = useSubscription();
  return (
    <>
      {!isPro && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="from-primary/10 to-primary/20 mt-16 rounded-xl bg-gradient-to-r p-8 shadow-sm"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-bold">Upgrade to Pro</h3>
              <p className="text-muted-foreground max-w-md">
                Get unlimited meal plans, advanced nutrition insights, and
                weekly meal prep guides.
              </p>
            </div>
            <Link to="/pricing">
              <Button size="lg" className="px-8">
                Upgrade Now
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default UpgradeToPro;
