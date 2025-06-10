import { useState } from "react";
import { useSubscription } from "@/context/SubscriptionContext";

const SubscriptionStatus = () => {
  const [error] = useState<string | null>(null);

  const { subscription, nextReset, tokens, status, loading } =
    useSubscription();
  const calculateCountdown = () => {
    if (!nextReset) {
      return subscription === "pro" ? "Never resets (Unlimited)" : "N/A";
    }

    const resetDate = new Date(nextReset).getTime();
    const now = new Date().getTime();
    const distance = resetDate - now;

    if (distance <= 0) return "Resetting soon...";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    return `${days} days, ${hours} hours`;
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="mb-4 text-xl font-bold">Subscription Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p>
            <strong>Current Plan:</strong> {subscription.toUpperCase()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                status === "active" ? "text-green-500" : "text-red-500"
              }
            >
              {status}
            </span>
          </p>
          <p>
            <strong>Tokens Left:</strong> {tokens}
          </p>
          <p>
            <strong>Next Reset:</strong> {calculateCountdown()}
          </p>
        </>
      )}
    </div>
  );
};

export default SubscriptionStatus;
