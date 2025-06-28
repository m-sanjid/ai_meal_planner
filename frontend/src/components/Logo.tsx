import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Logo = ({ asSpan = false }: { asSpan?: boolean }) => {
  const { isSignedIn } = useAuth();

  return (
    <Link
      to={isSignedIn ? "/dashboard" : "/"}
      className="group flex items-center gap-2 text-xl font-semibold tracking-tight"
    >
      <img className="h-8 w-8" src="/icon.png" alt="Logo" />
      {asSpan ? (
        <span className="text-muted-foreground hidden text-lg font-semibold md:text-xl lg:block">
          Befit
          <span className="text-black transition-colors duration-200 dark:text-white">
            AI
          </span>
        </span>
      ) : (
        <h1 className="text-muted-foreground hidden text-lg font-semibold md:text-xl lg:block">
          Befit
          <span className="text-black transition-colors duration-200 dark:text-white">
            AI
          </span>
        </h1>
      )}
    </Link>
  );
};

export default Logo;
