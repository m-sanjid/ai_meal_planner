import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, useUser } from "@clerk/clerk-react";
import { LogOut, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "motion/react";
import Privacy from "@/components/settings/Privacy";
import Subscription from "@/components/settings/Subscription";
import Notification from "@/components/settings/Notification";
import Appearance from "@/components/settings/Appearance";
import Account from "@/components/settings/Account";
import Accessibility from "@/components/settings/Accessibility";

const Settings = () => {
  const { user, isSignedIn } = useUser();
  const { getToken, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    window.location.href = "/";
  };

  if (!isSignedIn) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    return <div>Redirecting to login...</div>;
  }
  return (
    <PageLayout>
      <motion.div
        className="max-w-5xl mx-auto p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-card backdrop-blur-lg mb-10 rounded-xl p-6 transition-all duration-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user?.hasImage ? (
                <motion.div
                  className="border-2 rounded-xl border-primary/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    className="rounded-lg"
                    width={48}
                    height={48}
                    src={user?.imageUrl}
                    alt="user avatar"
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="p-2 rounded-lg border-2 border-primary/20 bg-primary/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="w-8 h-8" />
                </motion.div>
              )}
              <motion.div
                className="text-2xl font-semibold text-foreground"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {user?.firstName}'s Settings
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="privacy">Data & Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Account />
            </TabsContent>

            <TabsContent value="appearance">
              <Appearance />
            </TabsContent>

            <TabsContent value="notifications">
              <Notification />
            </TabsContent>

            <TabsContent value="subscription">
              <Subscription getToken={getToken} />
            </TabsContent>

            <TabsContent value="accessibility">
              <Accessibility />
            </TabsContent>

            <TabsContent value="privacy">
              <Privacy getToken={getToken} />
            </TabsContent>

          </Tabs>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Settings;
