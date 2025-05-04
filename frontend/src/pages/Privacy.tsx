import { PageLayout } from "@/components/layout/PageLayout";

const Privacy = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8 lg:py-16">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-neutral-200">
          Privacy Policy
        </h1>
        {sections.map((section) => (
          <section key={section.title} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-neutral-100">
              {section.title}
            </h2>
            <div className="prose dark:prose-invert">
              <p className="text-muted-foreground">{section.content}</p>
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
};

const sections = [
  {
    title: "Information We Collect",
    content: "We collect information that you provide directly to us, including your name, email address, and dietary preferences. We also collect data about your meal planning habits and recipe interactions to improve our service.",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to provide and improve our services, personalize your experience, and communicate with you about updates and recommendations.",
  },
  {
    title: "Data Security",
    content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal information. You can also object to processing and request data portability.",
  },
];

export default Privacy;