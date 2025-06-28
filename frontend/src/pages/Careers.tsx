import { Briefcase, MapPin, Send, Search, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "motion/react";
import SectionHeader from "@/components/SectionHeader";

const Careers = () => {
  return (
    <PageLayout>
      <div className="from-primary/10 to-background bg-gradient-to-b py-16">
        <motion.div
          className="mx-auto max-w-6xl px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Join Our Team"
            description="Help us revolutionize the way people plan and prepare their meals with AI technology"
          />

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
                disabled
                placeholder="Search positions..."
                className="border-border bg-background focus:ring-primary/50 w-full rounded-lg border py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="flex w-full items-center justify-center gap-2 md:w-auto md:justify-end">
              <div className="text-muted-foreground">Currently Not Hiring</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
              <Mail className="mr-2 h-4 w-4" />
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
