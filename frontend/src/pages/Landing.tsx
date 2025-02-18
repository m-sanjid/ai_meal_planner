import Features from "@/components/Features";
import Hero from "../components/Hero";
import Pricing from "@/components/Pricing";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-b from-white to-gray-50 flex justify-center">
        <Hero />
      </section>
      <section className="bg-gradient-to-b from-white to-gray-50 flex justify-center">
        <Features />
      </section>
      <section className="flex justify-center">
        <Pricing />
      </section>
    </div>
  );
};

export default Landing;
