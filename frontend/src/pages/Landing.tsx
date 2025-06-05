import Hero from "@/components/Hero";
import PricingComponent from "@/components/PricingComponent";
import NewsletterSection from "@/components/Newsletter";
import TestimonialsSection from "@/components/Testimonials";
import { FeaturesSection } from "@/components/Features";

const Landing = () => {
  return (
    <div className="bg-background mx-auto min-h-screen max-w-6xl">
      <Hero />
      <FeaturesSection/>
      <TestimonialsSection />
      <PricingComponent />
      <NewsletterSection />
    </div>
  );
};

export default Landing;
