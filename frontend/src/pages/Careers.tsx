import { Briefcase, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { notionTypography, notionShadows, getThemeColor } from "@/lib/styles";
import { motion } from "framer-motion";

const Careers = () => {
  return (
    <PageLayout>
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 
            className="text-4xl font-bold mb-4 text-foreground"
            style={notionTypography.heading}
          >
            Join Our Team
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto text-muted-foreground"
            style={{ ...notionTypography.body }}
          >
            Help us revolutionize the way people plan and prepare their meals with AI technology
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {openPositions.map((position, index) => (
            <motion.div 
              key={position.title} 
              className="bg-card backdrop-blur-lg rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
              style={{ boxShadow: notionShadows.sm }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.h3 
                className="text-xl font-semibold mb-3 text-foreground"
                style={notionTypography.heading}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {position.title}
              </motion.h3>
              <motion.div 
                className="flex items-center gap-4 mb-4 text-muted-foreground"
                style={notionTypography.body}
              >
                <motion.span 
                  className="flex items-center gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="h-4 w-4" /> {position.location}
                </motion.span>
                <motion.span 
                  className="flex items-center gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Clock className="h-4 w-4" /> {position.type}
                </motion.span>
                <motion.span 
                  className="flex items-center gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Briefcase className="h-4 w-4" /> {position.department}
                </motion.span>
              </motion.div>
              <motion.p 
                className="mb-4 text-muted-foreground"
                style={notionTypography.body}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {position.description}
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button>Apply Now</Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.h2 
            className="text-2xl font-semibold mb-4 text-foreground"
            style={notionTypography.heading}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Don't see a perfect fit?
          </motion.h2>
          <motion.p 
            className="mb-6 text-muted-foreground"
            style={notionTypography.body}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future positions.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button>Send General Application</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageLayout>
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