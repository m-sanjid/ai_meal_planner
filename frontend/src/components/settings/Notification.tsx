import { Switch } from "@radix-ui/react-switch";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import { toast } from "sonner";

const Notification = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);

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

  const saveUserSetting = (setting: string) => {
    // Save the setting to the database or local storage
    toast(`${setting} updated successfully`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card className="bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Notifications</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-0.5">
              <label className="text-foreground">Push Notifications</label>
              <p className="text-muted-foreground">
                Receive notifications in your browser
              </p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={handleNotificationsToggle}
            />
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-0.5">
              <label className="text-foreground">Email Notifications</label>
              <p className="text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={emailNotificationsEnabled}
              onCheckedChange={handleEmailNotificationsToggle}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Notification;
