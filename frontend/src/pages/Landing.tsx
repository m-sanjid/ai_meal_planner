import Hero from "@/components/Hero";
import PricingComponent from "@/components/PricingComponent";
import NewsletterSection from "@/components/Newsletter";
import TestimonialsSection from "@/components/Testimonials";
import { FeaturesSection } from "@/components/Features";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>BefitAI - AI Meal Planner</title>
        <meta
          name="description"
          content="AI-powered meal planning for your health goals. Personalized, fast, and easy."
        />
      </Helmet>
      <main className="bg-background">
        <Hero />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingComponent />
        <NewsletterSection />
      </main>
    </>
  );
};

export default Landing;
