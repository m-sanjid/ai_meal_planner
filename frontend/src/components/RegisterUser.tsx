import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import axios from "axios";

const RegisterUser = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [registrationStatus, setRegistrationStatus] = useState({
    isRegistered: false,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      handleRegistration();
    }
  }, [isLoaded, isSignedIn, user]);

  const handleRegistration = async () => {
    if (!user?.id) return;

    setRegistrationStatus((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          name: user.fullName || "",
        },
      );
      console.log(response);

      setRegistrationStatus({
        isRegistered: true,
        isLoading: false,
        error: null,
      });

      localStorage.setItem("isUserRegistered", "true");
    } catch (error) {
      setRegistrationStatus({
        isRegistered: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Registration failed",
      });
    }
  };

  if (!isLoaded) {
    return <div className="text-center p-4">Loading authentication...</div>;
  }

  if (!isSignedIn) {
    return <div className="text-center p-4">Please sign in to continue</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      {registrationStatus.isLoading ? (
        <div className="text-center">
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      ) : registrationStatus.error ? (
        <div className="text-red-500 text-center">
          <p>Error: {registrationStatus.error}</p>
          <button
            onClick={handleRegistration}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry Registration
          </button>
        </div>
      ) : registrationStatus.isRegistered ? (
        <div className="text-center text-green-600">
          <p>Registration successful! Welcome {user.fullName}!</p>
        </div>
      ) : (
        <div className="text-center">
          <p>Initializing registration...</p>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
