import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

const AutoRegister = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const registerUser = async () => {
      if (!user?.id || !isSignedIn || !isLoaded) return;

      // Avoid duplicate registration
      if (localStorage.getItem("isUserRegistered") === "true") return;

      try {
        const token = await getToken();
        if (!token) throw new Error("Authentication token missing");

        await axios.post(
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

        localStorage.setItem("isUserRegistered", "true");
      } catch (error) {
        console.error("User registration failed:", error);
      }
    };

    registerUser();
  }, [user, isSignedIn, isLoaded, getToken]);

  return null;
};

export default AutoRegister;
