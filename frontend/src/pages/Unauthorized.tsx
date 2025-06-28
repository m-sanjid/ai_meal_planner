import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";

const Unauthorized = () => {
  return (
    <>
      <Helmet>
        <title>Unauthorized | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="You must be signed in to access this page. Sign in to use BefitAI's meal planning features."
        />
      </Helmet>
      <main
        className="flex min-h-[calc(100vh-6rem)] items-center justify-center"
        aria-label="Unauthorized"
      >
        <div className="bg-card mx-auto max-w-md rounded-xl p-6 text-center shadow-lg">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            Please Sign In
          </h1>
          <p className="text-muted-foreground mb-6 text-xs md:text-sm">
            You need to be signed in to access meal planning features.
          </p>
          <Button className="w-full">
            <SignInButton />
          </Button>
        </div>
      </main>
    </>
  );
};

export default Unauthorized;
