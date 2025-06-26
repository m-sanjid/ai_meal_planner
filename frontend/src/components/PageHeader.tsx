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
      className="bg-card my-8 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          {user?.hasImage ? (
            <div className="border-primary ring-primary/20 h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border-2 ring-2">
              <img
                className="h-full w-full object-cover"
                src={user?.imageUrl}
                alt="user avatar"
              />
            </div>
          ) : (
            <div className="bg-muted border-primary ring-primary/20 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 ring-2">
              <User className="text-primary h-6 w-6" />
            </div>
          )}
          <div>
            <h1 className="text-lg font-medium md:text-xl">
              {user?.firstName}'s 
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
            {title}
            </p>
          </div>
        </div>
        <Button
          asChild
          className="bg-primary group hover:bg-primary/90 transition-all"
        >
          <Link to="/meal" className="text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
            {Cta}
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};
