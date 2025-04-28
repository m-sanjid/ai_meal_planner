import React from "react";
import { MicroInteraction, AnimatedButton } from "@/components/ui/MicroInteractions";
import { motion } from "framer-motion";
import { team } from "@/lib/constants";

const About: React.FC = () => {
  const features = [
    {
      title: "AI-Powered",
      description: "Advanced artificial intelligence for personalized meal planning",
      icon: "🤖",
    },
    {
      title: "Nutrition Focused",
      description: "Detailed nutritional information and balanced meal suggestions",
      icon: "🥗",
    },
    {
      title: "Time-Saving",
      description: "Quick and efficient meal planning to save you time",
      icon: "⏰",
    },
    {
      title: "Customizable",
      description: "Flexible options to match your dietary preferences",
      icon: "🎯",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About AI Meal Planner
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Revolutionizing meal planning with artificial intelligence
            </p>
            <MicroInteraction type="bounce">
              <AnimatedButton size="lg">Get Started Today</AnimatedButton>
            </MicroInteraction>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground">
              Discover what makes our platform unique
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <MicroInteraction key={feature.title} type="hover">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-lg shadow-lg text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </MicroInteraction>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're on a mission to make healthy eating accessible and enjoyable for
                everyone. By leveraging artificial intelligence, we create
                personalized meal plans that fit your lifestyle, preferences, and
                nutritional needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The experts behind AI Meal Planner
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <MicroInteraction key={member.name} type="hover">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="h-48">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary mb-4">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              </MicroInteraction>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have transformed their eating habits with
              AI Meal Planner
            </p>
            <MicroInteraction type="bounce">
              <AnimatedButton size="lg">Start Your Journey</AnimatedButton>
            </MicroInteraction>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
