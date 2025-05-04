import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Shield, User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Account = () => {
  const { user } = useUser();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card className="bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Account Information</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your personal account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="space-y-2"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="text-foreground">Full Name</label>
            <div className="p-2 bg-card rounded-md text-muted-foreground">
              {user?.firstName} {user?.lastName}
            </div>
          </motion.div>

          <motion.div
            className="space-y-2"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="text-foreground">Email Address</label>
            <div className="p-2 bg-card rounded-md text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
          </motion.div>

          <motion.div
            className="space-y-2"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="text-foreground">Account Created</label>
            <div className="p-2 bg-card rounded-md text-muted-foreground">
              {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </motion.div>

          <Separator className="my-4" />

          <div className="pt-4 flex flex-col gap-4">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/profile")}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Edit Profile
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/security")}
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> Security Settings
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Account;
