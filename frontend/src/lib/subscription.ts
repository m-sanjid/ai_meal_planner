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

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/sub/subscription-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const { subscription, subscriptionStatus, tokens, nextReset } = response.data;

    setSubscription?.(subscription);
    setStatus?.(subscriptionStatus);
    setTokens?.(tokens);
    setNextReset?.(nextReset ? new Date(nextReset) : null);
  } catch (error: any) {
    throw error;
  } finally {
    setLoading(false);
  }
};

export default fetchSubscriptionStatus;
