import { Calendar, Heart, Link, List, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Features = () => {
  return (
    <div className="min-h-screen max-w-4xl w-full py-20">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl p-4 font-semibold">
          Everything You Need for Your Nutrition Journey
        </h1>
        <p className="text-xl font-thin">
          Powerful features to help you achieve your health and fitness goals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 p-4">
          {featureItems.map((item) => (
            <div>
              <Card
                key={item.title}
                className="p-2 border border-gray-100 dark:border-[#4B6746] dark:bg-[#4B6746]/30 dark:backdrop-blur-md hover:outline hover:outline-[#4B6746] transition-all duration-300 animate-fadeIn hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="py-2">{item.icon}</CardTitle>
                  <CardTitle className="text-2xl dark:text-neutral-200">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[145px]">{item.desc}</CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

const featureItems = [
  {
    icon: (
      <Scale className="bg-[#E3EDE1] text-[#4B6746] p-3 h-14 w-14 rounded-xl " />
    ),
    title: "Custom Meal Plans",
    desc: "Personalized meal plans based on your fitness goals - whether it's weight loss, muscle gain, or maintaining a healthy lifestyle",
  },
  {
    icon: (
      <Heart className="bg-[#E3EDE1] text-[#4B6746] p-3 h-14 w-14 rounded-xl" />
    ),
    title: "Dietary Preferances",
    desc: "Tailored recipes for any diet - vegan, keto, paleo, and more. Your preferences, your way.",
  },
  {
    icon: (
      <Calendar className="bg-[#E3EDE1] text-[#4B6746] p-3 h-14 w-14 rounded-xl " />
    ),
    title: "Macro Tracking",
    desc: "Track proteins, carbs, fats, and calories for every meal. Stay on top of your nutrition goals effortlessly.",
  },
  {
    icon: (
      <Link className="bg-[#E3EDE1] text-[#4B6746] p-3 h-14 w-14 rounded-xl " />
    ),
    title: "Fitness App Sync",
    desc: "Seamlessly sync with your favorite fitness apps like Fitbit and MyFitnessPal for comprehensive progress tracking.",
  },
  {
    icon: (
      <List className="bg-[#E3EDE1] text-[#4B6746] p-3 h-14 w-14 rounded-xl " />
    ),
    title: "Shopping Lists",
    desc: "Auto-generated grocery lists and meal prep tips to make your healthy eating journey easier.",
  },
];
