import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-select";
import { UserButton, useUser } from "@clerk/clerk-react";

const Account = () => {
  const { user } = useUser();
  return (
    <Card className="bg-card text-sm backdrop-blur-lg md:text-base">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
      >
        <CardHeader>
          <CardTitle className="text-foreground">Account Information</CardTitle>
          <CardDescription className="text-muted-foreground text-xs md:text-sm">
            Manage your personal account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-xs md:text-sm">
          <div className="space-y-2">
            <label className="text-foreground">Full Name</label>
            <div className="bg-card text-muted-foreground rounded-md p-2">
              {user?.firstName} {user?.lastName}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-foreground">Email Address</label>
            <div className="bg-card text-muted-foreground rounded-md p-2">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-foreground">Account Created</label>
            <div className="bg-card text-muted-foreground rounded-md p-2">
              {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </div>

          <Separator className="my-4" />

          <UserButton />
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default Account;
