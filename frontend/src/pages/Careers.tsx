import {
  Briefcase,
  Clock,
  MapPin,
  Send,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "motion/react";
import { useState } from "react";

const Careers = () => {
  const [filter, setFilter] = useState("All");
  const departments = ["All", "Engineering", "Design", "Marketing"];

  const filteredPositions =
    filter === "All"
      ? openPositions
      : openPositions.filter((position) => position.department === filter);

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              We're Hiring
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Join Our Team
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Help us revolutionize the way people plan and prepare their meals
              with AI technology
            </p>
          </motion.div>

          {/* Search and filter section */}
          <motion.div
            className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full md:w-auto md:flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search positions..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex gap-2 items-center w-full md:w-auto justify-center md:justify-end">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === dept
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              {filteredPositions.length}{" "}
              {filteredPositions.length === 1 ? "position" : "positions"}{" "}
              available
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.title}
                className="group bg-card border border-border hover:border-primary/30 rounded-xl p-8 transition-all duration-200 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                      {position.department}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border group-hover:bg-primary/10 transition-colors">
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <p className="mb-6 text-muted-foreground line-clamp-2">
                  {position.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />{" "}
                    {position.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" /> {position.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-primary" />{" "}
                    {position.department}
                  </span>
                </div>

                <Button className="w-full">Apply Now</Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="rounded-2xl bg-muted/50 border border-border p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
              Don't see a perfect fit?
            </h2>
            <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
              We're always looking for talented individuals. Send us your resume
              and we'll keep you in mind for future positions that match your
              skills and experience.
            </p>
            <Button size="lg" className="px-8">
              Send General Application
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="bg-primary/5 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Why Join Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Besides working on cutting-edge AI technology, we offer great
              benefits
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-card p-6 rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

const openPositions = [
  {
    title: "Senior Full Stack Developer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description:
      "We're looking for a senior developer to help build and scale our AI-powered meal planning platform. You'll work with modern technologies to create intuitive and performant web applications.",
  },
  {
    title: "AI/ML Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description:
      "Join us in developing cutting-edge AI models for personalized meal recommendations. You'll work on training and optimizing models that understand user preferences and dietary needs.",
  },
  {
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    department: "Design",
    description:
      "Help create intuitive and beautiful interfaces for our meal planning platform. You'll work on the entire design process from research to implementation in a collaborative environment.",
  },
  {
    title: "Content Marketing Manager",
    location: "Remote",
    type: "Full-time",
    department: "Marketing",
    description:
      "Create engaging content about healthy eating and meal planning. You'll develop strategies to reach our target audience and communicate the benefits of our AI-powered platform.",
  },
];

const benefits = [
  {
    title: "Remote-First Culture",
    icon: <MapPin className="h-6 w-6 text-primary" />,
    description:
      "Work from anywhere in the world with flexible hours that suit your lifestyle.",
  },
  {
    title: "Competitive Compensation",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    description:
      "We offer competitive salaries, equity options, and comprehensive benefits packages.",
  },
  {
    title: "Professional Growth",
    icon: <ChevronRight className="h-6 w-6 text-primary" />,
    description:
      "Continuous learning opportunities with budget for courses, conferences, and certifications.",
  },
];

export default Careers;