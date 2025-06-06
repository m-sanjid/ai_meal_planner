import { motion } from "motion/react";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const PageHeader = ({
  user,
  title,
  Cta,
}: {
  user: any;
  title: string;
  Cta: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card mb-8 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user?.hasImage ? (
            <div className="border-primary ring-primary/20 h-12 w-12 overflow-hidden rounded-full border-2 ring-2">
              <img
                className="h-full w-full object-cover"
                src={user?.imageUrl}
                alt="user avatar"
              />
            </div>
          ) : (
            <div className="bg-muted border-primary ring-primary/20 flex h-12 w-12 items-center justify-center rounded-full border-2 ring-2">
              <User className="text-primary h-6 w-6" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold">
              {user?.firstName}'s {title}
            </h1>
            <p className="text-muted-foreground">Your saved meals</p>
          </div>
        </div>
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 transition-all"
        >
          <Link to="/meal">
            <Plus className="mr-2 h-4 w-4" />
            {Cta}
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};
