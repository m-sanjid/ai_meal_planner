import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const AutoRegister = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  // Utility function to clear registration flag (useful for testing)
  const clearRegistrationFlag = () => {
    localStorage.removeItem("isUserRegistered");
  };

  useEffect(() => {
    const registerUser = async () => {
      if (!user?.id || !isSignedIn || !isLoaded) return;

      // Avoid duplicate registration attempts
      if (localStorage.getItem("isUserRegistered") === "true") return;

      try {
        const token = await getToken();
        if (!token) throw new Error("Authentication token missing");

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

        // If user already exists, that's fine - mark as registered
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("isUserRegistered", "true");
          console.log("User registration successful");
        }
      } catch (error: any) {
        console.error("Registration error:", error);
        
        // Handle specific error cases
        if (error.response?.status === 409) {
          // User already exists or email taken - mark as registered
          localStorage.setItem("isUserRegistered", "true");
          console.log("User already registered");
          return;
        }
        
        if (error.response?.status === 400) {
          console.error("Invalid registration data:", error.response.data);
          return;
        }
        
        // Only show error toast for actual failures
        if (error.response?.status >= 500) {
          toast.error("Failed to register user. Please try again later.");
        }
      }
    };

    registerUser();
  }, [user, isSignedIn, isLoaded, getToken]);

  // Expose clear function for debugging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    (window as any).clearRegistrationFlag = clearRegistrationFlag;
  }

  return null;
};

export default AutoRegister;
