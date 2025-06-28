import { SignIn } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";

const Signin = () => {
  return (
    <>
      <Helmet>
        <title>Sign In | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="Sign in to your BefitAI account to access your personalized AI-powered meal plans."
        />
      </Helmet>
      <main
        className="flex min-h-[calc(100vh-4rem)] items-center justify-center"
        aria-label="Sign In"
      >
        <div className="rounded-xl bg-white/30 p-8 backdrop-blur-lg dark:bg-white/10">
          <SignIn />
        </div>
      </main>
    </>
  );
};

export default Signin;
