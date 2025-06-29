import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string;
  setSubscription?: Dispatch<SetStateAction<string>>;
  setTokens?: Dispatch<SetStateAction<number>>;
  setStatus?: Dispatch<SetStateAction<string>>;
  setNextReset?: Dispatch<SetStateAction<Date | null>>;
};

const fetchSubscriptionStatus = async ({
  setLoading,
  token,
  setSubscription,
  setTokens,
  setStatus,
  setNextReset,
}: Props) => {
  setLoading(true);

  const apiUrl = `${import.meta.env.VITE_API_URL}/api/sub/subscription-status`;
  console.log("Fetching subscription status from:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Subscription status response:", response.data);
    const { subscription, subscriptionStatus, tokens, nextReset } =
      response.data;

    setSubscription?.(subscription);
    setStatus?.(subscriptionStatus || "inactive");
    setTokens?.(tokens === "unlimited" ? "Unlimited" : (tokens ?? 0));
    setNextReset?.(nextReset ? new Date(nextReset) : null);
  } catch (error: any) {
    console.error("Failed to fetch subscription status:", error);
    console.error("Error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
    });
  } finally {
    setLoading(false);
  }
};

export default fetchSubscriptionStatus;
