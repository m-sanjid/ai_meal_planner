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
      <div className="from-primary/10 to-background bg-gradient-to-b py-16">
        <motion.div
          className="mx-auto max-w-6xl px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-12 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium">
              We're Hiring
            </span>
            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Join Our Team
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Help us revolutionize the way people plan and prepare their meals
              with AI technology
            </p>
          </motion.div>

          {/* Search and filter section */}
          <motion.div
            className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full max-w-md md:w-auto md:flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="text-muted-foreground h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search positions..."
                className="border-border bg-background focus:ring-primary/50 w-full rounded-lg border py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="flex w-full items-center justify-center gap-2 md:w-auto md:justify-end">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
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

      <div className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-foreground mb-2 text-2xl font-bold">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              {filteredPositions.length}{" "}
              {filteredPositions.length === 1 ? "position" : "positions"}{" "}
              available
            </p>
          </motion.div>

          <motion.div
            className="mb-16 grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.title}
                className="group bg-card border-border hover:border-primary/30 rounded-xl border p-8 transition-all duration-200 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <span className="bg-primary/10 text-primary mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium">
                      {position.department}
                    </span>
                    <h3 className="text-foreground group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                      {position.title}
                    </h3>
                  </div>
                  <div className="bg-background border-border group-hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {position.description}
                </p>

                <div className="text-muted-foreground mb-6 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="text-primary h-4 w-4" />{" "}
                    {position.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="text-primary h-4 w-4" /> {position.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="text-primary h-4 w-4" />{" "}
                    {position.department}
                  </span>
                </div>

                <Button className="w-full">Apply Now</Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-muted/50 border-border rounded-2xl border p-8 text-center md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <Send className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-foreground mb-4 text-2xl font-semibold md:text-3xl">
              Don't see a perfect fit?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl">
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
              Why Join Us?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Besides working on cutting-edge AI technology, we offer great
              benefits
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-card border-border rounded-xl border p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-foreground mb-2 text-lg font-medium">
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
    icon: <MapPin className="text-primary h-6 w-6" />,
    description:
      "Work from anywhere in the world with flexible hours that suit your lifestyle.",
  },
  {
    title: "Competitive Compensation",
    icon: <Briefcase className="text-primary h-6 w-6" />,
    description:
      "We offer competitive salaries, equity options, and comprehensive benefits packages.",
  },
  {
    title: "Professional Growth",
    icon: <ChevronRight className="text-primary h-6 w-6" />,
    description:
      "Continuous learning opportunities with budget for courses, conferences, and certifications.",
  },
];

export default Careers;
