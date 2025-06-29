import fetchSubscriptionStatus from "@/lib/subscription";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type SubscriptionContextType = {
  subscription: string;
  status: string;
  tokens: number | "Unlimited";
  nextReset: Date | null;
  loading: boolean;
  setSubscription: Dispatch<SetStateAction<string>>;
  refreshSubscription: () => Promise<void>;
  isPro: boolean;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const [subscription, setSubscription] = useState("free");
  const [status, setStatus] = useState("inactive");
  const [tokens, setTokens] = useState(0);
  const [nextReset, setNextReset] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }
    
    try {
      const token = await getToken();
      if (token) {
        await fetchSubscriptionStatus({
          token,
          setLoading,
          setSubscription,
          setTokens,
          setStatus,
          setNextReset,
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
      setLoading(false);
    }
  }, [getToken, isSignedIn]);

  const refreshSubscription = useCallback(async () => {
    setLoading(true);
    try {
      await fetchStatus();
    } catch (error) {
      console.error("Failed to refresh subscription:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  useEffect(() => {
    fetchStatus();
  }, [isSignedIn, fetchStatus]);

  useEffect(() => {
    if (nextReset) {
      const timeUntilReset =
        new Date(nextReset).getTime() - new Date().getTime();
      const timeoutId = setTimeout(refreshSubscription, timeUntilReset);
      return () => clearTimeout(timeoutId);
    }
  }, [nextReset, refreshSubscription]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        status,
        tokens,
        nextReset,
        loading,
        setSubscription,
        refreshSubscription,
        isPro: subscription === "pro",
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }
  return context;
};
