import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInButton, useAuth, useUser } from "@clerk/clerk-react";
import { LogOut, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "motion/react";
import Subscription from "@/components/settings/Subscription";
import Appearance from "@/components/settings/Appearance";
import Account from "@/components/settings/Account";

const Settings = () => {
  const { user, isSignedIn } = useUser();
  const { getToken, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    window.location.href = "/";
  };

  return (
    <PageLayout>
      <motion.div
        className="mx-auto max-w-5xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-card mb-10 rounded-xl p-6 backdrop-blur-lg transition-all duration-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user?.hasImage ? (
                <motion.div
                  className="border-primary/20 hidden rounded-xl border-2 md:block"
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
                  className="border-primary/20 bg-primary/10 rounded-lg border-2 p-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="h-8 w-8" />
                </motion.div>
              )}
              <motion.div
                className="text-foreground md:text-2xl md:font-semibold"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {user?.firstName}'s Settings
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isSignedIn ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              ) : (
                <SignInButton />
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="account" className="mb-10 h-40 w-full">
            <TabsList className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
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
      </motion.div>
    </PageLayout>
  );
};

export default Settings;
