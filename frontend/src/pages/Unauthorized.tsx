import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

const Unauthorized = () => {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <div className="bg-card mx-auto max-w-md rounded-xl p-6 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold">Please Sign In</h1>
        <p className="text-muted-foreground mb-6">
          You need to be signed in to access meal planning features.
        </p>
        <Button className="w-full">
          <SignInButton />
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
