import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import {
  Bell,
  CreditCard,
  LogOut,
  Moon,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useSubscription } from "@/context/SubscriptionContext";
import SubscriptionStatus from "@/components/SubscriptionStatus";
import PricingComponent from "@/components/PricingComponent";

// Updated interface to match what's expected from SubscriptionContext
interface UserSubscription {
  plan: string;
  status: string;
  renewalDate: string;
}

const Settings = () => {
  const { user, isSignedIn } = useUser();
  const { getToken, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  // Fixed how we use the subscription context
  const { subscription, status, nextReset, setSubscription } =
    useSubscription();
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    plan: "free",
    status: "inactive",
    renewalDate: "N/A",
  });

  useEffect(() => {
    if (isSignedIn) {
      fetchUserSettings();
    }
  }, [isSignedIn]);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme =
      localStorage.getItem("theme") ||
      (root.classList.contains("dark") ? "dark" : "light");
    setIsDarkMode(currentTheme === "dark");
    root.classList.toggle("dark", currentTheme === "dark");
  }, []);

  // Update userSubscription when subscription changes
  useEffect(() => {
    if (subscription) {
      setUserSubscription({
        plan: subscription,
        status: status || "inactive",
        renewalDate: nextReset
          ? new Date(nextReset).toLocaleDateString()
          : "N/A",
      });
    }
  }, [subscription, status, nextReset]);

  const toggleTheme = () => {
    if (isDarkMode !== undefined) {
      const newTheme = isDarkMode ? "light" : "dark";
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle("dark", !isDarkMode);
      localStorage.setItem("theme", newTheme);
    }
  };

  const fetchUserSettings = async () => {
    try {
      setLoading(true);
      // This is a mock implementation
      const response = {
        data: {
          notificationsEnabled: true,
          emailNotificationsEnabled: true,
        },
      };
      const settings = response.data;

      setNotificationsEnabled(settings.notificationsEnabled);
      setEmailNotificationsEnabled(settings.emailNotificationsEnabled);
    } catch (error) {
      console.error("Error fetching user settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationsToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    saveUserSetting("notificationsEnabled");
  };

  const handleEmailNotificationsToggle = () => {
    const newValue = !emailNotificationsEnabled;
    setEmailNotificationsEnabled(newValue);
    saveUserSetting("emailNotificationsEnabled");
  };

  const saveUserSetting = async (setting: string) => {
    try {
      // Mock success
      toast(`${setting} updated successfully`);
    } catch (error) {
      console.error(`Error updating ${setting}:`, error);
      toast.error(`Failed to update ${setting}`);
    }
  };

  const handleCancelSubscription = async () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      try {
        const token = await getToken();

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/sub/cancel-subscription`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUserSubscription((prev) => ({
          ...prev,
          status: "cancelled",
        }));
        setSubscription("free");

        toast("Subscription cancelled successfully");
      } catch (error) {
        console.error("Error cancelling subscription:", error);
        toast.error("Failed to cancel subscription");
      }
    }
  };

  const handleLogout = () => {
    signOut();
    window.location.href = "/";
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="h-full max-w-5xl mx-auto p-6">
      <div className="bg-[#4B6746]/20 backdrop-blur-lg mb-10 rounded-md">
        <div className="flex justify-between py-10 px-2 md:px-10">
          {user?.hasImage ? (
            <div className="md:border-4 rounded-xl border-[#4B6746]">
              <img
                className="rounded-lg"
                width={42}
                height={42}
                src={user?.imageUrl}
                alt="user avatar"
              />
            </div>
          ) : (
            <div className="p-2 rounded-lg md:border-4 border-[#4B6746] bg-[#4B6746]/30">
              <User className="w-8 h-8" />
            </div>
          )}

          <div className="text-xl md:text-4xl font-semibold text-[#4B6746] dark:text-white pr-4">
            {user?.firstName}'s Settings
          </div>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label>Full Name</label>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  {user?.firstName} {user?.lastName}
                </div>
              </div>

              <div className="space-y-2">
                <label>Email Address</label>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  {user?.primaryEmailAddress?.emailAddress}
                </div>
              </div>

              <div className="space-y-2">
                <label>Account Created</label>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="pt-4 flex flex-col gap-4">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/profile")}
                >
                  <User className="mr-2 h-4 w-4" /> Edit Profile
                </Button>

                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/security")}
                >
                  <Shield className="mr-2 h-4 w-4" /> Security Settings
                </Button>

                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label>Dark Mode</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark theme
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <label>Push Notifications</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={handleNotificationsToggle}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <label>Email Notifications</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={emailNotificationsEnabled}
                  onCheckedChange={handleEmailNotificationsToggle}
                />
              </div>

              <Separator />

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Bell className="mr-2 h-4 w-4" /> Manage Notification
                  Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>
                View and manage your current subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userSubscription && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#4B6746]/10 rounded-lg">
                    <SubscriptionStatus />
                  </div>

                  <Button variant="outline" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" /> Manage Payment
                    Methods
                  </Button>

                  {userSubscription.plan !== "free" &&
                    userSubscription.status === "active" && (
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleCancelSubscription}
                      >
                        Cancel Subscription
                      </Button>
                    )}
                </div>
              )}

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Available Plans</h3>
                <div className="">
                  <PricingComponent />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
