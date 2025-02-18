import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen max-w-5xl w-full py-20">
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <div className="bg-green-800/20 p-2 rounded-full">
          AI-Powered Meal Planning
        </div>
        <div className="text-5xl lg:text-6xl rounded-2xl font-bold p-6 my-10">
          Your Personal AI Chef for{" "}
          <span className="text-[#4B6746]">Healthy Living</span>
        </div>
        <div className="text-slate-700 font-light text-2xl mb-10 max-w-3xl">
          Create personalized meal plans tailored to your fitness goals, dietary
          preferences, and lifestyle. Let AI do the planning while you focus on
          achieving your health goals.
        </div>
        <button className="py-4 px-8 bg-[#4B6746] items-center rounded-4xl m-5 flex gap-2 text-white hover:shadow-xl hover:scale-x-105">
          Get Started for Free <ArrowRight size="20" strokeWidth={"light"} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
