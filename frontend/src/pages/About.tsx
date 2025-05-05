import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Clock, Target, Cpu } from "lucide-react";
import { team } from "@/lib/constants";
import { Link } from "react-router-dom";

type TabKey = "mission" | "vision" | "values";

const About = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("mission");

  const features = [
    {
      title: "AI-Powered",
      description:
        "Advanced artificial intelligence for personalized meal planning",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Nutrition Focused",
      description:
        "Detailed nutritional information and balanced meal suggestions",
      icon: <Star className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Time-Saving",
      description: "Quick and efficient meal planning to save you time",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Customizable",
      description: "Flexible options to match your dietary preferences",
      icon: <Target className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const tabContent: Record<
    TabKey,
    {
      title: string;
      content: string;
      image: string;
    }
  > = {
    mission: {
      title: "Our Mission",
      content:
        "We're on a mission to make healthy eating accessible and enjoyable for everyone. By leveraging artificial intelligence, we create personalized meal plans that fit your lifestyle, preferences, and nutritional needs.",
      image: "/api/placeholder/600/400",
    },
    vision: {
      title: "Our Vision",
      content:
        "We envision a world where everyone has access to personalized nutrition guidance that helps them live healthier, happier lives without the stress of meal planning.",
      image: "/api/placeholder/600/400",
    },
    values: {
      title: "Our Values",
      content:
        "Innovation, accessibility, and scientific accuracy form the foundation of everything we do. We believe technology should enhance your relationship with food, not complicate it.",
      image: "/api/placeholder/600/400",
    },
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black dark:text-neutral-200">
              About AI Meal Planner
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Revolutionizing meal planning with artificial intelligence that
              understands your unique needs.
            </p>
            <Link to="/login">
              <Button size="lg" className="group">
                Get Started Today
                <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what makes our platform the preferred choice for
              thousands of users worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-card hover:bg-card/80 p-6 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-border"
              >
                <div
                  className={`${feature.color} p-3 rounded-full inline-flex mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {Object.keys(tabContent).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab as TabKey)}
                  className="capitalize"
                >
                  {`Our ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">
                  {tabContent[activeTab].title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {tabContent[activeTab].content}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={tabContent[activeTab].image}
                    alt={tabContent[activeTab].title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The experts behind AI Meal Planner bringing you nutritional
              excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-4 text-white">
                      <p className="font-medium">
                        Connect with {member.name.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-black dark:text-neutral-200 mb-4">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Meal Planning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have simplified their nutrition
              journey with AI Meal Planner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="group">
                  Start Your Free Trial
                  <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
