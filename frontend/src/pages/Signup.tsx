import { SignUp } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";

const Signup = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="Create your BefitAI account to start generating personalized AI-powered meal plans."
        />
      </Helmet>
      <main
        className="flex min-h-[calc(100vh-4rem)] items-center justify-center"
        aria-label="Sign Up"
      >
        <div className="rounded-xl bg-white/30 p-8 backdrop-blur-lg dark:bg-white/10">
          <SignUp />
        </div>
      </main>
    </>
  );
};

export default Signup;
