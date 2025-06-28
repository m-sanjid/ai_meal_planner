import SectionHeader from "@/components/SectionHeader";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | BefitAI Meal Planner</title>
        <meta name="description" content="Read the terms of service for using BefitAI's AI-powered meal planning platform." />
      </Helmet>
      <main className="mx-auto max-w-4xl" aria-label="Terms of Service">
        <SectionHeader title="Terms of Service" as="h1" />

        {terms.map((term) => (
          <section key={term.title} className="mb-8">
            <h2 className="mb-4 text-xl font-semibold md:text-2xl">
              {term.title}
            </h2>
            <div className="prose dark:prose-invert text-sm md:text-base">
              <p>{term.content}</p>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

const terms = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using BefitAI, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
  },
  {
    title: "User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    title: "Service Usage",
    content:
      "Our service provides AI-powered meal planning recommendations. While we strive for accuracy, we cannot guarantee that all recommendations will be perfect for your specific needs.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content and functionality on BefitAI, including but not limited to text, graphics, logos, and software, is the property of BefitAI or its licensors.",
  },
];

export default Terms;
