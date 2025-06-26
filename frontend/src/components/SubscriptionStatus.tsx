import { useSubscription } from "@/context/SubscriptionContext";

const SubscriptionStatus = () => {
  const { subscription, status, tokens, nextReset, loading } =
    useSubscription();

  const calculateCountdown = () => {
    if (!nextReset) {
      return subscription === "pro" ? "Never resets (Unlimited)" : "N/A";
    }

    const resetDate = nextReset.getTime();
    const now = Date.now();
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
      ) : (
        <>
          <p>
            <strong>Plan:</strong> {subscription.toUpperCase()}
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
