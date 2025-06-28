import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Home, Utensils, Star, Settings } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found | BefitAI Meal Planner</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist or has been moved. Return to the dashboard or use quick navigation."
        />
      </Helmet>
      <main
        className="bg-background flex min-h-screen flex-col items-center justify-center"
        aria-label="404 Not Found"
      >
        <div className="w-full max-w-2xl px-4">
          <div className="mb-12 text-center">
            <h1 className="text-primary mb-4 text-8xl font-bold">404</h1>
            <p className="text-muted-foreground mb-8 text-2xl">
              Page not found
            </p>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-48"
                  aria-label="Quick Navigation"
                >
                  Quick Navigation
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/meal" className="flex items-center">
                    <Utensils className="mr-2 h-4 w-4" />
                    Create Meal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/user/favorites" className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
