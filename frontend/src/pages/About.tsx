import { useState, useEffect } from "react";
import { ChevronRight, Star, Clock, Target, Cpu, ArrowUp } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

type TabKey = "mission" | "vision" | "values";

const About = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("mission");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      title: "AI-Powered",
      description:
        "Advanced artificial intelligence for personalized meal planning",
      icon: <Cpu className="h-6 w-6" />,
      delay: "0ms",
    },
    {
      title: "Nutrition Focused",
      description:
        "Detailed nutritional information and balanced meal suggestions",
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: "Time-Saving",
      description: "Quick and efficient meal planning to save you time",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Customizable",
      description: "Flexible options to match your dietary preferences",
      icon: <Target className="h-6 w-6" />,
    },
  ];

  const tabContent: Record<
    TabKey,
    { title: string; content: string; image: string }
  > = {
    mission: {
      title: "Our Mission",
      content:
        "We're on a mission to make healthy eating accessible and enjoyable for everyone. By leveraging artificial intelligence, we create personalized meal plans that fit your lifestyle, preferences, and nutritional needs.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    },
    vision: {
      title: "Our Vision",
      content:
        "We envision a world where everyone has access to personalized nutrition guidance that helps them live healthier, happier lives without the stress of meal planning.",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
    },
    values: {
      title: "Our Values",
      content:
        "Innovation, accessibility, and scientific accuracy form the foundation of everything we do. We believe technology should enhance your relationship with food, not complicate it.",
      image:
        "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=600&h=400&fit=crop",
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-24 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              title="About AI Meal Planner"
              description="Revolutionizing meal planning with artificial intelligence that understands your unique needs."
            />
            <Link
              to="/pricing"
              className="group animate-in fade-in slide-in-from-bottom-4 rounded-full bg-neutral-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 duration-1000 hover:scale-105 hover:shadow-lg active:scale-95 dark:bg-white dark:text-neutral-900"
            >
              Get Started Today
              <ChevronRight className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="animate-in fade-in slide-in-from-bottom-4 mb-4 text-3xl font-bold duration-700">
              Why Choose Us?
            </h2>
            <p
              className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-2xl text-xl text-neutral-600 duration-700 dark:text-neutral-300"
              style={{ animationDelay: "100ms" }}
            >
              Discover what makes our platform the preferred choice for
              thousands of users worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                key={feature.title}
                className="group animate-in fade-in slide-in-from-bottom-4 cursor-pointer rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-500 duration-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-200/20 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:shadow-neutral-800/20"
              >
                <div className="mb-4 inline-flex rounded-full bg-neutral-900 p-3 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-white dark:text-neutral-900">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border py-20">
        <div className="container mx-auto p-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabKey)}
                  className={`rounded-full px-6 py-3 font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? "scale-105 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "bg-white text-neutral-900 hover:scale-105 hover:bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  }`}
                >
                  {`Our ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
                </button>
              ))}
            </div>

            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="animate-in fade-in slide-in-from-left-8 order-2 duration-700 md:order-1">
                <h2 className="mb-6 text-3xl font-bold">
                  {tabContent[activeTab].title}
                </h2>
                <p className="text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {tabContent[activeTab].content}
                </p>
              </div>
              <div className="animate-in fade-in slide-in-from-right-8 order-1 duration-700 md:order-2">
                <div className="group overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={tabContent[activeTab].image}
                    alt={tabContent[activeTab].title}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent relative overflow-hidden border py-24">
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <SectionHeader
              title="Ready to Transform Your Meal Planning?"
              description="Join thousands of users who have simplified their nutrition journey with AI Meal Planner"
            />
            <Link
              to="/pricing"
              className="group animate-in fade-in slide-in-from-bottom-4 rounded-full bg-neutral-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 duration-1000 hover:scale-105 hover:shadow-lg active:scale-95 dark:bg-white dark:text-neutral-900"
            >
              Start Your Free Trial
              <ChevronRight className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {scrollY > 500 && (
        <button
          onClick={scrollToTop}
          className="animate-in fade-in slide-in-from-bottom-4 fixed right-8 bottom-8 z-50 rounded-full bg-neutral-900 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 dark:bg-white dark:text-neutral-900"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </PageLayout>
  );
};

export default About;
