import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";

const Accessibility = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card className="bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Accessibility</CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize the application for better accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-0.5">
              <label className="text-foreground">High Contrast Mode</label>
              <p className="text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch onCheckedChange={() => {}} />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Accessibility;
