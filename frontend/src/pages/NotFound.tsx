import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <div className="text-7xl mb-20 relative">
        <div>
          4<span className="text-8xl px-2 text-[#4B6746]">0</span>
          <span className="text-9xl">4</span>
        </div>
        <div className="absolute font-light text-red-500 text-xl right-1/2 top-0">
          No Such Page
        </div>
      </div>
      <Link to={"/home"}>
        <Button> Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
