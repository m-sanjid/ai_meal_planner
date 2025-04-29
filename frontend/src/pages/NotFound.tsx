import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Home, Utensils, Star, Layout, Settings } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-12">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl text-muted-foreground mb-8">Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-48">
                Quick Navigation
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/home" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="flex items-center">
                  <Layout className="mr-2 h-4 w-4" />
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
            <Link to="/home">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
