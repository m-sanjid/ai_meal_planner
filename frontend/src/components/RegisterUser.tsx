import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const AutoRegister = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  const registerUser = async () => {
    if (!user || !isSignedIn) return;

    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          name: user.fullName || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("isUserRegistered", "true");
        
        if (response.data?.existingAccount) {
          toast.success("Welcome back! Using your existing account.");
        }
      }
    } catch (error: any) {
      if (error.response?.data?.existingAccount) {
        localStorage.setItem("isUserRegistered", "true");
        toast.success("Welcome back! Using your existing account.");
        return;
      }

      if (error.response?.status !== 409) {
        toast.error("Failed to complete registration. Please try again.");
      } else {
        localStorage.setItem("isUserRegistered", "true");
      }
    }
  };

  useEffect(() => {
    if (
      isLoaded &&
      isSignedIn &&
      user &&
      localStorage.getItem("isUserRegistered") !== "true"
    ) {
      registerUser();
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  return null;
};

export default AutoRegister;
