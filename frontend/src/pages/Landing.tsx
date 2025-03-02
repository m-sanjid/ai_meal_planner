import Features from "@/components/Features";
import Hero from "../components/Hero";
import PricingComponent from "@/components/PricingComponent";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-neutral-900">
      <section className="flex justify-center bg-linear-to-tr/increasing from-[#4B6746]/40 to-[#4B6746]/20 dark:to-black">
        <Hero />
      </section>
      <section className="flex justify-center bg-linear-to-br/increasing from-[#4B6746]/40 to-[#4B6746]/20 dark:to-black">
        <Features />
      </section>
      <section className="flex justify-center bg-linear-to-tr/increasing from-[#4B6746]/40 to-[#4B6746]/20 dark:to-black">
        <PricingComponent />
      </section>
    </div>
  );
};

export default Landing;
