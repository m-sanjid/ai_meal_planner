import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Download, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const Privacy = ({ getToken }: { getToken: () => Promise<string | null> }) => {
  const handleDataExport = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/export-data`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data");
    }
  };

  const handleDataDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all your data? This action cannot be undone."
      )
    ) {
      try {
        const token = await getToken();
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/users/delete-data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Data deleted successfully");
      } catch (error) {
        console.error("Error deleting data:", error);
        toast.error("Failed to delete data");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card className="bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Data & Privacy</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleDataExport}
            >
              <Download className="w-4 h-4" /> Export My Data
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleDataDelete}
            >
              <Trash2 className="w-4 h-4" /> Delete My Data
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default Privacy;
