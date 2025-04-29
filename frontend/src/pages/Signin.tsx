import { SignIn } from "@clerk/clerk-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { notionShadows } from "@/lib/styles";

const Signin = () => {
  return (
    <PageLayout>
      <div 
        className="flex justify-center items-center min-h-[calc(100vh-4rem)]"
      >
        <div 
          className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-8"
          style={{ boxShadow: notionShadows.lg }}
        >
          <SignIn />
        </div>
      </div>
    </PageLayout>
  );
};

export default Signin;
