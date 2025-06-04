import { SignIn } from "@clerk/clerk-react";
import { PageLayout } from "@/components/layout/PageLayout";

const Signin = () => {
  return (
    <PageLayout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="rounded-xl bg-white/30 p-8 backdrop-blur-lg dark:bg-white/10">
          <SignIn />
        </div>
      </div>
    </PageLayout>
  );
};

export default Signin;
