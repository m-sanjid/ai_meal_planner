import { Briefcase, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 dark:text-neutral-200">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Help us revolutionize the way people plan and prepare their meals with AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {openPositions.map((position) => (
            <div key={position.title} className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 dark:text-neutral-200">{position.title}</h3>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {position.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {position.type}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {position.department}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{position.description}</p>
              <Button variant="outline">Apply Now</Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 dark:text-neutral-200">Don't see a perfect fit?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future positions.
          </p>
          <Button>Send General Application</Button>
        </div>
      </div>
    </div>
  );
};

const openPositions = [
  {
    title: "Senior Full Stack Developer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description: "We're looking for a senior developer to help build and scale our AI-powered meal planning platform.",
  },
  {
    title: "AI/ML Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description: "Join us in developing cutting-edge AI models for personalized meal recommendations.",
  },
  {
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    department: "Design",
    description: "Help create intuitive and beautiful interfaces for our meal planning platform.",
  },
  {
    title: "Content Marketing Manager",
    location: "Remote",
    type: "Full-time",
    department: "Marketing",
    description: "Create engaging content about healthy eating and meal planning.",
  },
];

export default Careers; 