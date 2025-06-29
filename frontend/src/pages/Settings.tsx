import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, useUser } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import { motion } from "motion/react";
import Subscription from "@/components/settings/Subscription";
import Appearance from "@/components/settings/Appearance";
import Account from "@/components/settings/Account";
import Unauthorized from "./Unauthorized";
import { PageHeader } from "@/components/PageHeader";
import { Helmet } from "react-helmet-async";

const Settings = () => {
  const { user, isSignedIn } = useUser();
  const { getToken, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    window.location.href = "/";
  };

  if (!isSignedIn) {
    return <Unauthorized />;
  }

  return (
    <>
      <Helmet>
        <title>Settings | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="Manage your BefitAI account, appearance, and subscription settings."
        />
      </Helmet>
      <main className="mx-auto max-w-5xl min-h-screen p-6" aria-label="Settings">
        <PageHeader
          user={user}
          title="Settings"
          Cta="Logout"
          nolink
          onClick={handleLogout}
          icon={<LogOut className="h-4 w-4" />}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="account" className="mb-10 h-40 w-full text-xs md:text-sm">
            <TabsList className="mb-8">
              <TabsTrigger value="account" className="text-xs md:text-sm">Account</TabsTrigger>
              <TabsTrigger value="appearance" className="text-xs md:text-sm">Appearance</TabsTrigger>
              <TabsTrigger value="subscription" className="text-xs md:text-sm">Subscription</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Account />
            </TabsContent>
            <TabsContent value="appearance">
              <Appearance />
            </TabsContent>
            <TabsContent value="subscription">
              <Subscription getToken={getToken} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </>
  );
};

export default Settings;
